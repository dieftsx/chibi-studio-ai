import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export const PLANS = {
  FREE: {
    id: "free",
    name: "Gratuito",
    price: 0,
    conversions: 3,
    features: ["3 conversões por mês", "Qualidade padrão", "Suporte por email"],
  },
  PRO: {
    id: "pro",
    name: "Pro",
    price: 1990, // R$ 19,90 em centavos
    conversions: 100,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: [
      "100 conversões por mês",
      "Qualidade HD",
      "Suporte prioritário",
      "Sem marca d'água",
    ],
  },
  UNLIMITED: {
    id: "unlimited",
    name: "Ilimitado",
    price: 4990, // R$ 49,90 em centavos
    conversions: -1, // Ilimitado
    stripePriceId: process.env.STRIPE_UNLIMITED_PRICE_ID!,
    features: [
      "Conversões ilimitadas",
      "Qualidade HD",
      "Suporte prioritário",
      "API access",
      "Sem marca d'água",
    ],
  },
};
