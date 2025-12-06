"use client";

import { useState } from "react";
import {
  Globe,
  Download,
  Send,
  DollarSign,
  ShoppingCart,
  Star,
  User,
  Trophy,
  Link2,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  Truck,
  Store,
  ShoppingBag,
  Cake,
  Award,
  Plus,
  Copy,
  Smartphone,
  Share2,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";

// Componente de Card de Estatística
interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "highlight" | "success" | "warning";
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "highlight":
        return "border-l-amber-500 bg-amber-50/50";
      case "success":
        return "border-l-emerald-500 bg-emerald-50/50";
      case "warning":
        return "border-l-orange-500 bg-orange-50/50";
      default:
        return "border-l-gray-200 bg-white";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "highlight":
        return "bg-amber-100 text-amber-600";
      case "success":
        return "bg-emerald-100 text-emerald-600";
      case "warning":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className={`rounded-xl border border-gray-100 border-l-4 p-5 transition-all hover:shadow-md ${getVariantStyles()}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs font-medium text-gray-400">{subtitle}</p>}
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${getIconStyles()}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 border-t border-gray-100 pt-3">
          {trend.isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-xs font-medium text-gray-400">vs período anterior</span>
        </div>
      )}
    </div>
  );
}

// Componente de Card Compacto
interface CompactCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  iconColor?: string;
}

function CompactCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-gray-500",
}: CompactCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs font-medium text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}

// Componente de Funil - Design estilo Blocos Separados (Referência Cliente)
function FunnelChart() {
  const funnelData = [
    { 
      label: "VISITAS", 
      value: 82, 
      bgColor: "bg-indigo-300", // Mais claro
      width: "w-full",
      clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)"
    },
    { 
      label: "ADIÇÕES NO CARRINHO", 
      value: 1, 
      bgColor: "bg-indigo-500", // Médio
      width: "w-[85%]",
      clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)"
    },
    { 
      label: "TOTAL DE PEDIDOS", 
      value: 0, 
      bgColor: "bg-indigo-700", // Escuro (Ação)
      width: "w-[70%]",
      clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)"
    },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-gray-900">
          Funil de Conversão
        </h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Delivery: <span className="font-medium text-gray-700">0</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Store className="h-3.5 w-3.5 text-rose-500" />
            <span>Retirada: <span className="font-medium text-gray-700">0</span></span>
          </div>
        </div>
      </div>
      
      {/* Funil com Blocos Separados */}
      <div className="flex flex-col items-center gap-2 py-2">
        {funnelData.map((item, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center justify-center text-white transition-opacity hover:opacity-90 cursor-pointer ${item.bgColor}`}
            style={{
              height: '80px',
              width: index === 0 ? '100%' : index === 1 ? '85%' : '70%',
              clipPath: 'polygon(2% 0, 98% 0, 92% 100%, 8% 100%)', // Ajuste geral para formato trapézio proporcional
            }}
          >
            <span className="text-2xl font-bold tracking-tight">{item.value}</span>
            <span className="text-xs font-semibold tracking-wider uppercase opacity-90 mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Indicadores laterais (opcional, para decorar como na ref) */}
      <div className="mt-8 flex justify-center gap-8 border-t border-gray-100 pt-6">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Conversão Total</p>
          <p className="text-xl font-bold text-gray-900">0%</p>
        </div>
        <div className="w-px bg-gray-200 h-10" />
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Taxa de Rejeição</p>
          <p className="text-xl font-bold text-gray-900">0%</p>
        </div>
      </div>
    </div>
  );
}

// Componente de Totais por Tipo
function TotalsByType() {
  const channels = [
    { name: "Facebook", value: "R$ 0,00", quantity: 0 },
    { name: "Instagram", value: "R$ 0,00", quantity: 0 },
    { name: "Link", value: "R$ 0,00", quantity: 0 },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-2xl font-bold text-gray-900">R$ 0,00</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Delivery */}
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Delivery
            </span>
          </div>
          <p className="mb-3 text-xl font-bold text-gray-900">R$ 0,00</p>
          <div className="space-y-1.5">
            {channels.map((channel) => (
              <div
                key={`delivery-${channel.name}`}
                className="flex items-center justify-between text-xs text-gray-500"
              >
                <span>{channel.name}</span>
                <span>
                  {channel.quantity} ({channel.value})
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-emerald-100 pt-3">
            <p className="text-xs font-medium text-gray-400">Economia de R$ 0,00</p>
          </div>
        </div>

        {/* Retirada */}
        <div className="rounded-lg border border-rose-100 bg-rose-50/30 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Store className="h-4 w-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">Retirada</span>
          </div>
          <p className="mb-3 text-xl font-bold text-gray-900">R$ 0,00</p>
          <div className="space-y-1.5">
            {channels.map((channel) => (
              <div
                key={`retirada-${channel.name}`}
                className="flex items-center justify-between text-xs text-gray-500"
              >
                <span>{channel.name}</span>
                <span>
                  {channel.quantity} ({channel.value})
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-rose-100 pt-3">
            <p className="text-xs font-medium text-gray-400">Economia de R$ 0,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Gráfico de Clientes (Placeholder)
function ClientsChart() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Clientes Novos e Recorrentes
      </h3>
      <div className="flex h-40 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-sm text-gray-400">Sem dados no período</p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-xs text-gray-500">Novos Clientes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="text-xs text-gray-500">Clientes Recorrentes</span>
        </div>
      </div>
    </div>
  );
}

// Componente de Pedidos por Clientes (Placeholder)
function OrdersByClients() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Pedidos por Clientes
      </h3>
      <div className="flex h-40 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-sm text-gray-400">Sem dados no período</p>
      </div>
    </div>
  );
}

// Componente de Card de Conversão
interface ConversionCardProps {
  title: string;
  value: string;
  orders: number;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
}

function ConversionCard({
  title,
  value,
  orders,
  icon: Icon,
  iconBgColor,
  iconColor,
}: ConversionCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${iconBgColor}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs font-medium text-gray-400">Pedidos: {orders}</p>
      </div>
      <button className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
        <Plus className="h-3 w-3" />
        Incentivo
      </button>
    </div>
  );
}

// Componente de QR Code
function QrCodeCard({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-between rounded-xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
      <div className="mb-4 text-center">
        <h4 className="font-bold text-gray-900">{title}</h4>
        {subtitle && <p className="text-xs font-medium text-gray-400">{subtitle}</p>}
      </div>
      
      {/* Simulação Visual de QR Code Moderno */}
      <div className="relative mb-6 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-gray-900 bg-white p-2">
        {/* Cantos do QR Code */}
        <div className="absolute left-2 top-2 h-8 w-8 border-l-4 border-t-4 border-gray-900"></div>
        <div className="absolute right-2 top-2 h-8 w-8 border-r-4 border-t-4 border-gray-900"></div>
        <div className="absolute bottom-2 left-2 h-8 w-8 border-b-4 border-l-4 border-gray-900"></div>
        
        {/* Padrão interno simulado com SVG */}
        <svg className="h-full w-full text-gray-900" viewBox="0 0 100 100" fill="currentColor">
          <path d="M15 15h20v20h-20z M65 15h20v20h-20z M15 65h20v20h-20z" />
          <path d="M40 15h5v5h-5z M50 15h5v5h-5z M60 15h5v5h-5z" opacity="0.8" />
          <path d="M40 25h5v5h-5z M50 25h5v5h-5z M60 25h5v5h-5z" opacity="0.6" />
          <path d="M40 35h5v5h-5z M50 35h5v5h-5z M60 35h5v5h-5z" opacity="0.8" />
          <path d="M15 40h20v5h-20z M40 40h5v5h-5z M50 40h20v20h-20z" />
          <path d="M70 40h15v5h-15z M85 40h5v25h-5z M70 50h10v10h-10z" />
          <path d="M40 50h5v15h-5z M45 60h15v5h-15z M15 50h20v10h-20z" opacity="0.7" />
          <path d="M40 70h25v5h-25z M70 70h15v15h-15z M40 80h25v5h-25z" />
        </svg>

        {/* Logo Central (Simulada com ícone da loja) */}
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm">
          <Camera className="h-6 w-6" />
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
        <Download className="h-4 w-4" />
        Baixar QR Code
      </button>
    </div>
  );
}

// Componente de Sugestão de Resposta
function ResponseCard() {
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const responses = [
    {
      id: 1,
      text: "👋 Olá! 📲 Faça seu pedido em nosso cardápio online 👉 https://lojaexemplo.delmatch.com.br é muito rápido e simples! Não precisa fazer cadastro. Aguardamos seu pedido! 💙",
      display: (
        <>
          👋 Olá! 📲 Faça seu pedido em nosso cardápio online 👉 <span className="text-blue-500 font-medium">link.loja</span> é muito rápido e simples! Não precisa fazer cadastro.
          <br /><br />
          Qualquer dúvida estamos por aqui, aguardamos o seu pedido 💙
        </>
      )
    },
    {
      id: 2,
      text: "🍕 Hoje é dia de Pizza! Aproveite nossa promoção especial de entrega grátis para pedidos acima de R$ 50,00. Confira no cardápio: https://lojaexemplo.delmatch.com.br 🛵",
      display: (
        <>
          🍕 Hoje é dia de Pizza! Aproveite nossa promoção especial de entrega grátis para pedidos acima de R$ 50,00.
          <br /><br />
          Confira no cardápio: <span className="text-blue-500 font-medium">link.loja</span> 🛵
        </>
      )
    },
    {
      id: 3,
      text: "⏰ Seu pedido está quase pronto! Acabamos de colocar no forno e em breve o entregador sairá para levar até você. Obrigado pela preferência! 😋",
      display: (
        <>
          ⏰ Seu pedido está quase pronto! Acabamos de colocar no forno e em breve o entregador sairá para levar até você.
          <br /><br />
          Obrigado pela preferência! 😋
        </>
      )
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(responses[currentIndex].text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextResponse = () => {
    setCurrentIndex((prev) => (prev + 1) % responses.length);
    setCopied(false);
  };

  const prevResponse = () => {
    setCurrentIndex((prev) => (prev - 1 + responses.length) % responses.length);
    setCopied(false);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Respostas Automáticas</h4>
            <p className="text-xs text-gray-500">Sugestão para enviar aos clientes</p>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className={`group flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-all shadow-sm ${
            copied 
            ? "border-emerald-200 bg-emerald-100 text-emerald-700" 
            : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300"
          }`}
        >
          {copied ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copiar
            </>
          )}
        </button>
      </div>

      <div className="relative flex-1 rounded-xl bg-gray-50 p-4">
        {/* Navegação e Balão */}
        <div className="flex items-center gap-2">
          <button 
            onClick={prevResponse}
            className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex-1 rounded-2xl rounded-tl-none bg-white p-4 shadow-sm border border-gray-100 min-h-[120px] flex items-center">
            <p className="text-sm leading-relaxed text-gray-600 w-full">
              {responses[currentIndex].display}
            </p>
          </div>

          <button 
            onClick={nextResponse}
            className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        {/* Indicadores de slide */}
        <div className="mt-4 flex justify-center gap-1.5">
          {responses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-emerald-500 w-4" : "bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("06/12/2024 - 06/12/2025");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [performanceDateRange, setPerformanceDateRange] = useState("06/12/2024 - 06/12/2025");
  const [showPerformanceDatePicker, setShowPerformanceDatePicker] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header com seletor de data */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Visão geral do seu negócio</p>
        </div>

        {/* Seletor de período */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{dateRange}</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                showDatePicker ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDatePicker && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDatePicker(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                <div className="space-y-2">
                  {[
                    "Hoje",
                    "Últimos 7 dias",
                    "Últimos 30 dias",
                    "Este mês",
                    "Último mês",
                    "Este ano",
                  ].map((period) => (
                    <button
                      key={period}
                      onClick={() => {
                        setDateRange(period);
                        setShowDatePicker(false);
                      }}
                      className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Cards principais - primeira linha */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total de Acessos"
          value="2.708"
          subtitle="Com base no filtro"
          icon={Globe}
          trend={{ value: 12.5, isPositive: true }}
          variant="highlight"
        />
        <StatCard
          title="Adicionou Atalho"
          value="7"
          subtitle="Android"
          icon={Download}
          variant="default"
        />
        <StatCard
          title="Clientes Recuperados"
          value="R$ 0,00"
          subtitle="0 pedidos"
          icon={Send}
          variant="default"
        />
      </div>

      {/* Cards financeiros - segunda linha */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Economia em Comissões"
          value="R$ 107,17"
          subtitle="Você já economizou"
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Total de Pedidos"
          value="R$ 927,32"
          subtitle="16 pedidos"
          icon={ShoppingCart}
          trend={{ value: 15.3, isPositive: true }}
          variant="highlight"
        />
        <StatCard
          title="Pedidos do Dia"
          value="R$ 0,00"
          subtitle="0 pedidos"
          icon={ShoppingCart}
          variant="default"
        />
      </div>

      {/* Seção de destaques */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Destaques</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CompactCard
            title="Melhor Parceiro"
            value="Nenhum parceiro"
            subtitle="R$ 0,00 · 0 pedidos"
            icon={Star}
            iconColor="text-amber-500"
          />
          <CompactCard
            title="Melhor Cliente"
            value="Guilherme"
            subtitle="R$ 518,69 · 5 pedidos"
            icon={User}
            iconColor="text-blue-500"
          />
          <CompactCard
            title="Produto Mais Vendido"
            value="Chiclets Adams"
            subtitle="Tutti-Frutti 2,8g · 4 pedidos"
            icon={Trophy}
            iconColor="text-emerald-500"
          />
        </div>
      </div>

      {/* Seção por canal */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Pedidos por Canal
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CompactCard
            title="Facebook"
            value="R$ 0,00"
            subtitle="0 pedidos"
            icon={() => (
              <svg
                className="h-5 w-5 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            )}
          />
          <CompactCard
            title="Instagram"
            value="R$ 0,00"
            subtitle="0 pedidos"
            icon={() => (
              <svg
                className="h-5 w-5 text-[#E4405F]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            )}
          />
          <CompactCard
            title="Link Direto"
            value="R$ 927,32"
            subtitle="16 pedidos"
            icon={Link2}
            iconColor="text-violet-500"
          />
        </div>
      </div>

      {/* Funil e Totais */}
      <div className="mt-12 border-t border-gray-100 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Performance de Vendas e Conversão
          </h2>
          <div className="relative">
            <button
              onClick={() => setShowPerformanceDatePicker(!showPerformanceDatePicker)}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
            >
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{performanceDateRange}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  showPerformanceDatePicker ? "rotate-180" : ""
                }`}
              />
            </button>

            {showPerformanceDatePicker && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowPerformanceDatePicker(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="space-y-2">
                    {[
                      "Hoje",
                      "Últimos 7 dias",
                      "Últimos 30 dias",
                      "Este mês",
                      "Último mês",
                      "Este ano",
                    ].map((period) => (
                      <button
                        key={period}
                        onClick={() => {
                          setPerformanceDateRange(period);
                          setShowPerformanceDatePicker(false);
                        }}
                        className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <FunnelChart />
          <TotalsByType />
        </div>
      </div>

      {/* Gráficos de Clientes */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ClientsChart />
        <OrdersByClients />
      </div>

      {/* Conversões */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Conversões</h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          <ConversionCard
            title="Carrinho Abandonado"
            value="R$ 0,00"
            orders={0}
            icon={ShoppingBag}
            iconBgColor="bg-cyan-100"
            iconColor="text-cyan-600"
          />
          <ConversionCard
            title="Aniversariantes"
            value="R$ 0,00"
            orders={0}
            icon={Cake}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <ConversionCard
            title="Pontos de Fidelidade"
            value="R$ 0,00"
            orders={0}
            icon={Award}
            iconBgColor="bg-sky-100"
            iconColor="text-sky-600"
          />
        </div>
      </div>

      {/* Seção de Divulgação (QR Codes e Respostas) */}
      <div className="mt-12">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Ferramentas de Divulgação
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="grid gap-6 sm:grid-cols-2">
              <QrCodeCard 
                title="QR Code Delivery" 
                subtitle="Direciona para o cardápio principal"
              />
              <QrCodeCard 
                title="Visualização do Cardápio" 
                subtitle="Apenas modo visualização (sem checkout)"
              />
            </div>
          </div>
          <div>
            <ResponseCard />
          </div>
        </div>
      </div>
    </div>
  );
}
