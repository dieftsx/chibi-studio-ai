import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chibi Emote Studio - Converta Fotos em Emotes Chibi com IA",
  description:
    "Transforme suas fotos em emotes estilo chibi usando inteligência artificial. Perfeito para streamers do Twitch, Discord e outras plataformas.",
  keywords:
    "emotes, chibi, twitch, discord, streaming, IA, conversão de imagem",
  authors: [{ name: "Chibi Emote Studio" }],
  openGraph: {
    title: "Chibi Emote Studio",
    description: "Transforme suas fotos em emotes estilo chibi com IA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
