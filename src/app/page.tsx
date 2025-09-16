import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Star, Users, Zap, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/lib/stripe";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Chibi Studio
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforme suas fotos em{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                emotes chibi
              </span>{" "}
              com IA
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Crie emotes únicos e adoráveis para suas lives no Twitch, Discord
              e outras plataformas. Powered by OpenAI DALL-E 3 para resultados
              profissionais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Começar Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/converter">
              <Button size="lg" variant="outline">
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Emotes Criados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600">Streamers Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Por que escolher o Chibi Studio?
            </h2>
            <p className="text-xl text-gray-600">
              A melhor ferramenta para criar emotes profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <Zap className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>IA Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Powered by OpenAI DALL-E 3, a mais avançada IA de geração de
                  imagens do mundo.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <Star className="w-12 h-12 mx-auto text-pink-600 mb-4" />
                <CardTitle>Qualidade Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Emotes em alta resolução, perfeitos para Twitch, Discord e
                  outras plataformas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Fácil de Usar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Interface intuitiva. Faça upload, clique em converter e baixe
                  seu emote em segundos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Planos para todos os streamers
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(PLANS).map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${plan.id === "pro" ? "border-purple-500 border-2" : ""}`}
              >
                {plan.id === "pro" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold">
                    {plan.price === 0
                      ? "Grátis"
                      : `R$ ${(plan.price / 100).toFixed(2)}`}
                    {plan.price > 0 && (
                      <span className="text-lg font-normal text-gray-600">
                        /mês
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.id === "free" ? "/auth/signup" : "/auth/signin"}
                  >
                    <Button
                      className={`w-full ${
                        plan.id === "pro"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          : ""
                      }`}
                      variant={plan.id === "free" ? "outline" : "default"}
                    >
                      {plan.id === "free" ? "Começar Grátis" : "Assinar Agora"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para criar emotes incríveis?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de streamers que já usam o Chibi Studio
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Começar Grátis Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <span className="text-xl font-bold">Chibi Studio</span>
              </div>
              <p className="text-gray-400">
                A melhor ferramenta para criar emotes chibi com IA.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/converter" className="hover:text-white">
                    Converter
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Chibi Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
