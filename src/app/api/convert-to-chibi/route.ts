import { openai } from "@ai-sdk/openai";
import { experimental_generateImage } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";


export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Faça login para continuar" }, { status: 401 })
    }
    const supabase = createServerClient()
    // Verificar limites de uso
    const { data: usage } = await supabase
      .from("usage_tracking")
      .select("conversions_used, conversions_limit, reset_date")
      .eq("user_id", user.id)
      .single()

    if (!usage) {
      return NextResponse.json({ error: "Erro ao verificar limite de uso" }, { status: 500 })
    }
    //Verificar se precisar resetar o contador mensal
    const now = new Date()
    const resetDate = new Date(usage.reset_date)
    if (now > resetDate) {
      await supabase
        .from("usage_tracking")
        .update({
          conversions_used: 0,
          reset_date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq("user_id", user.id)
      usage.conversions_used = 0
      // Verificar se ainda tem conversões disponíveis
      if (usage.conversions_limit !== -1 && usage.conversions_used >= usage.conversions_limit) {
        return NextResponse.json(
          {
            error: "Limite de conversões atingido. Faça upgrade do seu plano para continuar.",
            needsUpgrade: true,
          },
          { status: 403 },
        )
      }
      const formData = await request.formData()
      const imageFile = formData.get("image") as File

      if (!imageFile) {
        return NextResponse.json({ error: "Nenhuma imagem foi enviada" }, { status: 400 })
      }
      //Validações de arquivo
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json({ error: "Arquivo deve ser uma imagem" }, { status: 400 })
      }
      if (imageFile.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Imagem muito grande. Máximo 10MB." }, { status: 400 })
      }

      //Converter arquivo para Base64
      const bytes = await imageFile.arrayBuffer()
      const base64 = Buffer.from(bytes).toString("base64")
      const imageDataUrl = `data:${imageFile.type};base64,${base64}`

      //Gerar prompt para conversão chibi
      const prompt = `Transform this photo into a cute chibi-style cartoon emote suitable for live streaming. The character should have:
    - Large expressive eyes
    - Simplified facial features
    - Cute and rounded proportions
    - Bright, vibrant colors
    - Clean cartoon style
    - Suitable for use as a Twitch/Discord emote
    - 128x128 pixel resolution
    - Transparent or simple background
    - Kawaii/anime aesthetic
    
    Make it adorable and perfect for expressing emotions in chat!`


      // Gerar imagem usando OpenAI DALL-E
      const { image } = await experimental_generateImage({
        model: openai.image("dall-e-3"),
        prompt: prompt,
        size: "1024x1024",
        quality: "hd",
      })

      // Salvar no Histórico
      await supabase.from("conversion_history").insert({
        user_id: user.id,
        original_image_url: imageDataUrl,
        converted_image_url: `data:image/png;base64, ${image.base64}`,
        file_name: imageFile.name,
        file_size: imageFile.size,
        status: "completed",
      })
      //Incrementar contador de uso
      await supabase
        .from("usage_tracking")
        .update({
          conversions_used: usage.conversions_used + 1,
        })
        .eq("user_id", user.id)

      return NextResponse.json({
        success: true,
        originalImage: imageDataUrl,
        chibifieldImage: image.base64,
        message: "Imagem convertida com sucesso!",
        remainingConversions: usage.conversions_limit === -1 : usage.conversions_limit - usage.conversions_used - 1,
      })
    } catch (error: any) {
      console.error("Erro na conversão:", error)

      if (error.message?.includes("content_policy_violation")) {
        return NextResponse.json(
          { error: "Imagem rejeitada por políticas de conteúdo. Tente uma imagem diferente." },
          { status: 400 },
        )
      }

      if (error.message?.includes("rate_limit")) {
        return NextResponse.json({ error: "Muitas solicitações. Tente novamente em alguns minutos." }, { status: 429 })
      }

      return NextResponse.json({ error: "Erro interno do servidor. Tente novamente." }, { status: 500 })
    }
  }

