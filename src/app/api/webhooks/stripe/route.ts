import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";
import { PLANS } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServerClient();

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Buscar usuário pelo customer_id
        const { data: existingSubscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (existingSubscription) {
          // Determinar o plano baseado no price_id
          let planId = "free";
          let conversionsLimit = 3;

          if (
            subscription.items.data[0]?.price.id === PLANS.PRO.stripePriceId
          ) {
            planId = "pro";
            conversionsLimit = 100;
          } else if (
            subscription.items.data[0]?.price.id ===
            PLANS.UNLIMITED.stripePriceId
          ) {
            planId = "unlimited";
            conversionsLimit = -1;
          }

          // Atualizar assinatura
          await supabase
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscription.id,
              status: subscription.status,
              plan_id: planId,
              current_period_start: new Date(
                subscription.current_period_start * 1000,
              ).toISOString(),
              current_period_end: new Date(
                subscription.current_period_end * 1000,
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);

          // Atualizar limites de uso
          await supabase
            .from("usage_tracking")
            .update({
              conversions_limit: conversionsLimit,
              conversions_used: 0,
              reset_date: new Date(
                subscription.current_period_end * 1000,
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", existingSubscription.user_id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Buscar usuário pelo customer_id
        const { data: existingSubscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (existingSubscription) {
          // Voltar para plano gratuito
          await supabase
            .from("subscriptions")
            .update({
              status: "canceled",
              plan_id: "free",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);

          // Resetar limites para plano gratuito
          await supabase
            .from("usage_tracking")
            .update({
              conversions_limit: 3,
              conversions_used: 0,
              reset_date: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000,
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", existingSubscription.user_id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
