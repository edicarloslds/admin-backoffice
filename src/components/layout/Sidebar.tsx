"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Package,
  Warehouse,
  Users,
  Handshake,
  Receipt,
  Ticket,
  CreditCard,
  Megaphone,
  UtensilsCrossed,
  ChevronDown,
  Settings,
  Download,
  Trophy,
  UsersRound,
  ChevronLeft,
  X,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: "red" | "green" | "amber";
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

const navigation: NavCategory[] = [
  {
    name: "Operações",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Painel de Pedidos", href: "/dashboard/pedidos", icon: ShoppingCart },
      { name: "Caixa", href: "/dashboard/caixa", icon: CreditCard },
      { name: "Mesas", href: "/dashboard/mesas", icon: UtensilsCrossed },
    ],
  },
  {
    name: "Pedidos & Entregas",
    items: [
      { name: "Meus Pedidos", href: "/dashboard/pedidos", icon: ClipboardList },
      { name: "Pagamento Online", href: "/dashboard/pagamentos", icon: Receipt },
    ],
  },
  {
    name: "Catálogo",
    items: [
      { name: "Produtos", href: "/dashboard/produtos", icon: Package },
      { name: "Estoque", href: "/dashboard/estoque", icon: Warehouse, badge: 9, badgeColor: "red" },
    ],
  },
  {
    name: "Clientes & Parceiros",
    items: [
      { name: "Clientes", href: "/dashboard/clientes", icon: Users },
      { name: "Parceiros", href: "/dashboard/parceiros", icon: Handshake },
      { name: "Colaboradores", href: "/dashboard/colaboradores", icon: UsersRound, badge: "Novo", badgeColor: "green" },
    ],
  },
  {
    name: "Marketing & Promoções",
    items: [
      { name: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
      { name: "Cupons", href: "/dashboard/cupons", icon: Ticket },
      { name: "Ranking", href: "/dashboard/ranking", icon: Trophy },
    ],
  },
  {
    name: "Financeiro",
    items: [
      { name: "Faturas", href: "/dashboard/faturas", icon: Receipt },
    ],
  },
  {
    name: "Sistema",
    items: [
      { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
      { name: "Downloads", href: "/dashboard/downloads", icon: Download },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onMobileClose?: () => void;
}

export function Sidebar({ collapsed, onCollapse, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    navigation.map((cat) => cat.name)
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const getBadgeClass = (color?: "red" | "green" | "amber") => {
    switch (color) {
      case "red":
        return "bg-red-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      case "amber":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <aside
      className={`h-screen border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={`flex h-16 items-center justify-between px-4 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </div>
            <span
              className={`whitespace-nowrap font-semibold text-gray-900 transition-all duration-300 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Del Match
            </span>
          </div>
          {/* Botão fechar - apenas mobile */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Botão flutuante de collapse - apenas desktop */}
        <button
          onClick={() => onCollapse(!collapsed)}
          className="hidden md:flex absolute -right-3 top-[20px] z-50 h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <ChevronLeft
            className={`h-3.5 w-3.5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
        {/* Border with inline padding */}
        <div className="mx-3 border-b border-gray-100" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-4">
            {navigation.map((category) => (
              <div key={category.name}>
                {/* Category Header */}
                {!collapsed && (
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="flex w-full cursor-pointer items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600"
                  >
                    {category.name}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        expandedCategories.includes(category.name)
                          ? ""
                          : "-rotate-90"
                      }`}
                    />
                  </button>
                )}

                {/* Category Items */}
                {(collapsed || expandedCategories.includes(category.name)) && (
                  <ul className="mt-1 space-y-0.5">
                    {category.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;

                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                              isActive
                                ? "bg-amber-50 text-amber-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            } ${collapsed ? "justify-center" : ""}`}
                            title={collapsed ? item.name : undefined}
                          >
                            <Icon
                              className={`h-4 w-4 flex-shrink-0 ${
                                isActive ? "text-amber-600" : ""
                              }`}
                            />
                            {!collapsed && (
                              <>
                                <span className="flex-1">{item.name}</span>
                                {item.badge && (
                                  <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${getBadgeClass(
                                      item.badgeColor
                                    )}`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
