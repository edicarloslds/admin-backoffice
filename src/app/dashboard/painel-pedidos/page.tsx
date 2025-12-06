"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  Clock,
  MapPin,
  Phone,
  User,
  Package,
  Truck,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Printer,
  ChevronRight,
  Utensils,
  AlertCircle,
  Timer,
  DollarSign,
  Users,
  X,
} from "lucide-react";

// Tipos
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

interface Order {
  id: string;
  number: string;
  customer: {
    name: string;
    phone: string;
    address?: string;
  };
  type: "delivery" | "pickup" | "table";
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
  tableNumber?: string;
}

// Dados mock
const mockOrders: Order[] = [
  {
    id: "1",
    number: "#1234",
    customer: {
      name: "João Silva",
      phone: "(11) 99999-1234",
      address: "Rua das Flores, 123 - Centro",
    },
    type: "delivery",
    status: "pending",
    items: [
      { id: "1", name: "Pizza Margherita Grande", quantity: 1, price: 45.9 },
      { id: "2", name: "Refrigerante 2L", quantity: 1, price: 12.0 },
      { id: "3", name: "Borda Recheada Catupiry", quantity: 1, price: 8.0, notes: "Bem recheada" },
    ],
    subtotal: 65.9,
    deliveryFee: 5.0,
    discount: 0,
    total: 70.9,
    createdAt: "12:45",
  },
  {
    id: "2",
    number: "#1233",
    customer: {
      name: "Maria Santos",
      phone: "(11) 98888-5678",
    },
    type: "pickup",
    status: "preparing",
    items: [
      { id: "1", name: "Hambúrguer Artesanal", quantity: 2, price: 32.0 },
      { id: "2", name: "Batata Frita Grande", quantity: 1, price: 18.0 },
    ],
    subtotal: 82.0,
    deliveryFee: 0,
    discount: 8.2,
    total: 73.8,
    createdAt: "12:30",
  },
  {
    id: "3",
    number: "#1232",
    customer: {
      name: "Carlos Oliveira",
      phone: "(11) 97777-9999",
      address: "Av. Brasil, 456 - Jardins",
    },
    type: "delivery",
    status: "ready",
    items: [
      { id: "1", name: "Combo Família", quantity: 1, price: 89.9 },
    ],
    subtotal: 89.9,
    deliveryFee: 7.0,
    discount: 0,
    total: 96.9,
    createdAt: "12:15",
  },
  {
    id: "4",
    number: "#1231",
    customer: {
      name: "Ana Paula",
      phone: "(11) 96666-4321",
    },
    type: "table",
    status: "delivered",
    tableNumber: "Mesa 5",
    items: [
      { id: "1", name: "Porção de Picanha", quantity: 1, price: 75.0 },
      { id: "2", name: "Cerveja Artesanal", quantity: 4, price: 15.0 },
    ],
    subtotal: 135.0,
    deliveryFee: 0,
    discount: 0,
    total: 135.0,
    createdAt: "11:45",
  },
];

// Componente de Status Badge
function StatusBadge({ status }: { status: Order["status"] }) {
  const config = {
    pending: { label: "Pendente", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    preparing: { label: "Preparando", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
    ready: { label: "Pronto", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
    delivered: { label: "Entregue", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
    cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
  };

  const { label, color, dot } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot} ${status === "pending" || status === "preparing" ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}

// Componente de Type Badge
function TypeBadge({ type }: { type: Order["type"] }) {
  const config = {
    delivery: { label: "Delivery", icon: Truck, color: "text-amber-600" },
    pickup: { label: "Retirada", icon: ShoppingBag, color: "text-purple-600" },
    table: { label: "Mesa", icon: Utensils, color: "text-blue-600" },
  };

  const { label, icon: Icon, color } = config[type];

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

// Componente de Card de Pedido
function OrderCard({
  order,
  isSelected,
  onClick,
}: {
  order: Order;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
        isSelected
          ? "border-amber-500 bg-amber-50 shadow-md shadow-amber-500/10"
          : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{order.number}</span>
            <TypeBadge type={order.type} />
          </div>
          <p className="mt-1 truncate text-sm text-gray-600">{order.customer.name}</p>
          {order.tableNumber && (
            <p className="mt-0.5 text-xs text-blue-600 font-medium">{order.tableNumber}</p>
          )}
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="flex items-center gap-1">
            <Package className="h-3.5 w-3.5" />
            {order.items.length} {order.items.length === 1 ? "item" : "itens"}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {order.createdAt}
          </span>
        </div>
        <span className="font-semibold text-gray-900">
          R$ {order.total.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </button>
  );
}

// Componente de Detalhes do Pedido
function OrderDetails({ order }: { order: Order | null }) {
  if (!order) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Nenhum pedido selecionado</h3>
        <p className="mt-1 text-center text-sm text-gray-500">
          Selecione um pedido da lista para ver os detalhes
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Pedido {order.number}</h2>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <TypeBadge type={order.type} />
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Recebido às {order.createdAt}
              </span>
            </div>
          </div>
          <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <Printer className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="border-b border-gray-100 p-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Informações do Cliente</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4 text-gray-400" />
            {order.customer.name}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            {order.customer.phone}
          </div>
          {order.customer.address && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
              {order.customer.address}
            </div>
          )}
          {order.tableNumber && (
            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
              <Utensils className="h-4 w-4" />
              {order.tableNumber}
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto p-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Itens do Pedido</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-xs font-semibold text-amber-700">
                    {item.quantity}x
                  </span>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                {item.notes && (
                  <p className="mt-1 ml-8 text-xs text-gray-500 italic">Obs: {item.notes}</p>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900">
                R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-gray-100 p-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>R$ {order.subtotal.toFixed(2).replace(".", ",")}</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Taxa de entrega</span>
              <span>R$ {order.deliveryFee.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto</span>
              <span>- R$ {order.discount.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-100 pt-2 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>R$ {order.total.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 p-6">
        <div className="flex flex-wrap gap-2">
          {order.status === "pending" && (
            <>
              <button className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:brightness-105">
                <CheckCircle2 className="h-4 w-4" />
                Aceitar Pedido
              </button>
              <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-100">
                <XCircle className="h-4 w-4" />
                Recusar
              </button>
            </>
          )}
          {order.status === "preparing" && (
            <button className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/30 hover:brightness-105">
              <CheckCircle2 className="h-4 w-4" />
              Marcar como Pronto
            </button>
          )}
          {order.status === "ready" && order.type === "delivery" && (
            <button className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:brightness-105">
              <Truck className="h-4 w-4" />
              Enviar para Entrega
            </button>
          )}
          {order.status === "ready" && order.type !== "delivery" && (
            <button className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/30 hover:brightness-105">
              <CheckCircle2 className="h-4 w-4" />
              Finalizar Pedido
            </button>
          )}
          {order.status === "delivered" && (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500">
              <CheckCircle2 className="h-4 w-4" />
              Pedido Finalizado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de Empty State
function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100">
        <ShoppingBag className="h-10 w-10 text-amber-600" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-gray-900">Nenhum pedido no momento</h3>
      <p className="mt-2 text-center text-sm text-gray-500 max-w-sm">
        Quando novos pedidos chegarem, eles aparecerão aqui. Fique de olho!
      </p>
    </div>
  );
}

// Modal de Nova Mesa
function NewTableModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tableName, setTableName] = useState("");

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Nova Mesa</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="tableName" className="block text-sm font-medium text-gray-700 mb-2">
              Nome ou Número da Mesa
            </label>
            <input
              id="tableName"
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Ex: Mesa 1, VIP, Varanda..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              // Criar mesa
              onClose();
            }}
            className="flex-1 cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:brightness-105"
          >
            Criar Mesa
          </button>
        </div>
      </div>
    </>
  );
}

// Página Principal
export default function PedidosPage() {
  const [activeTab, setActiveTab] = useState<"all" | "delivery" | "pickup" | "table">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(mockOrders[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showNewTableModal, setShowNewTableModal] = useState(false);

  // Filtrar pedidos
  const filteredOrders = mockOrders.filter((order) => {
    // Filtro por tipo
    if (activeTab !== "all" && order.type !== activeTab) return false;
    
    // Filtro por status
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    
    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.number.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.phone.includes(query)
      );
    }
    
    return true;
  });

  // Stats
  const totalToday = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = mockOrders.filter((o) => o.status === "pending").length;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] sm:h-[calc(100vh-theme(spacing.16))] flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Painel de Pedidos</h1>
          <p className="text-sm text-gray-500">Gerencie todos os seus pedidos em um só lugar</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNewTableModal(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Mesa</span>
          </button>
          <Link
            href="/dashboard/novo-pedido"
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:brightness-105"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Pedido</span>
          </Link>
        </div>
      </div>

      {/* Tabs e Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        {/* Tabs */}
        <div className="flex rounded-xl bg-gray-100 p-1">
          {[
            { id: "all", label: "Todos" },
            { id: "delivery", label: "Delivery" },
            { id: "pickup", label: "Retirada" },
            { id: "table", label: "Mesa" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search e Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="preparing">Preparando</option>
              <option value="ready">Prontos</option>
              <option value="delivered">Entregues</option>
            </select>
            <Filter className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Lista de Pedidos */}
        <div className="w-full sm:w-1/3 overflow-auto">
          {filteredOrders.length > 0 ? (
            <div className="space-y-3 pr-2">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isSelected={selectedOrder?.id === order.id}
                  onClick={() => setSelectedOrder(order)}
                />
              ))}
            </div>
          ) : (
            <EmptyOrders />
          )}
        </div>

        {/* Detalhes do Pedido */}
        <div className="hidden sm:flex flex-1">
          <OrderDetails order={selectedOrder} />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
            <DollarSign className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Hoje</p>
            <p className="text-sm font-bold text-white">R$ {totalToday.toFixed(2).replace(".", ",")}</p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-700" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
            <Timer className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Pendentes</p>
            <p className="text-sm font-bold text-white">{pendingCount} pedidos</p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-700" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Clientes Online</p>
            <p className="flex items-center gap-1.5 text-sm font-bold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              3 online
            </p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-700" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
            <Package className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Pedidos Hoje</p>
            <p className="text-sm font-bold text-white">{mockOrders.length} pedidos</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewTableModal isOpen={showNewTableModal} onClose={() => setShowNewTableModal(false)} />
    </div>
  );
}
