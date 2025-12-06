"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UtensilsCrossed } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula um delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Brand */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 lg:block">
        {/* Elementos decorativos */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-yellow-400/20 blur-3xl" />

        {/* Padrão de pontos decorativo */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          {/* Logo no topo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Del Match</span>
          </div>

          {/* Conteúdo central */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Gerencie seu<br />restaurante com<br />facilidade
            </h2>
            <p className="max-w-sm text-lg text-white/80">
              Controle pedidos, estoque e atendimentos em um só lugar.
            </p>

            {/* Cards de features */}
            <div className="flex gap-3 pt-4">
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">+500</p>
                <p className="text-sm text-white/70">Restaurantes</p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-white/70">Satisfação</p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-white/70">Suporte</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/60">
            © 2024 Del Match Delivery. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex w-full items-center justify-center bg-amber-50/30 px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/25">
              <UtensilsCrossed className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Del Match</h1>
              <p className="text-sm text-amber-700">Delivery</p>
            </div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              Bem-vindo de volta
            </h2>
            <p className="text-gray-500">
              Entre com suas credenciais para acessar o painel
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="login"
                className="text-sm font-medium text-gray-700"
              >
                Login
              </label>
              <div className="relative">
                <input
                  id="login"
                  type="text"
                  placeholder="Usuário..."
                  className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  @delmatch.com
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-amber-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Link mobile para contexto */}
          <p className="text-center text-sm text-gray-500 lg:hidden">
            Sistema de gestão para restaurantes
          </p>
        </div>
      </div>
    </div>
  );
}
