"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Store,
  Utensils,
  X,
  Package,
  Phone,
  User,
  CreditCard,
  Trash2,
  ChevronDown,
  Check,
  Clock,
} from "lucide-react";

// Tipos
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  image?: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Categorias
const categories = [
  { id: "all", name: "Todos" },
  { id: "pizzas", name: "Pizzas" },
  { id: "burgers", name: "Hambúrgueres" },
  { id: "marmitex", name: "Marmitex" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
  { id: "acompanhamentos", name: "Acompanhamentos" },
  { id: "combos", name: "Combos" },
];

// Produtos mock
const mockProducts: Product[] = [
  { id: "1", name: "Pizza Margherita Grande", sku: "#829257", price: 45.90, category: "pizzas" },
  { id: "2", name: "Pizza Calabresa Grande", sku: "#829258", price: 48.90, category: "pizzas" },
  { id: "3", name: "Pizza 4 Queijos Grande", sku: "#829259", price: 52.90, category: "pizzas" },
  { id: "4", name: "Hambúrguer Artesanal", sku: "#831768", price: 32.00, category: "burgers" },
  { id: "5", name: "Hambúrguer Duplo Bacon", sku: "#831769", price: 42.00, category: "burgers" },
  { id: "6", name: "Hambúrguer Vegano", sku: "#831770", price: 35.00, category: "burgers" },
  { id: "7", name: "Refrigerante 2L", sku: "#831774", price: 12.00, category: "bebidas" },
  { id: "8", name: "Suco Natural 500ml", sku: "#831775", price: 8.00, category: "bebidas" },
  { id: "9", name: "Água Mineral 500ml", sku: "#831776", price: 4.00, category: "bebidas" },
  { id: "10", name: "Cerveja Artesanal 600ml", sku: "#831777", price: 18.00, category: "bebidas" },
  { id: "11", name: "Batata Frita Grande", sku: "#831780", price: 18.00, category: "acompanhamentos" },
  { id: "12", name: "Onion Rings", sku: "#831781", price: 15.00, category: "acompanhamentos" },
  { id: "13", name: "Marmitex Executivo", sku: "#831790", price: 25.00, category: "marmitex" },
  { id: "14", name: "Marmitex Família", sku: "#831791", price: 45.00, category: "marmitex" },
  { id: "15", name: "Pudim de Leite", sku: "#831800", price: 12.00, category: "sobremesas" },
  { id: "16", name: "Brownie com Sorvete", sku: "#831801", price: 18.00, category: "sobremesas" },
  { id: "17", name: "Combo Família", sku: "#831810", price: 89.90, category: "combos" },
  { id: "18", name: "Combo Casal", sku: "#831811", price: 65.00, category: "combos" },
];

// Componente de Linha de Produto (layout de lista)
function ProductRow({
  product,
  onAdd,
  quantity,
  onUpdateQuantity,
}: {
  product: Product;
  onAdd: () => void;
  quantity: number;
  onUpdateQuantity: (qty: number) => void;
}) {
  const categoryLabels: Record<string, string> = {
    pizzas: "Pizzas",
    burgers: "Hambúrgueres", 
    marmitex: "Marmitex",
    bebidas: "Bebidas",
    sobremesas: "Sobremesas",
    acompanhamentos: "Acompanhamentos",
    combos: "Combos",
  };

  return (
    <div className={`flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:shadow-md ${
      quantity > 0 ? "border-amber-300 bg-amber-50/30" : "border-gray-200 hover:border-amber-200"
    }`}>
      {/* Image placeholder */}
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50">
        <Package className="h-6 w-6 text-gray-300" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-400">
          {categoryLabels[product.category] || product.category} • {product.sku}
        </p>
      </div>

      {/* Status badge - mostrar quando tem no carrinho */}
      {quantity > 0 && (
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          <Check className="h-3 w-3" />
          Adicionado
        </div>
      )}

      {/* Price */}
      <div className="text-right">
        <span className="text-sm font-bold text-gray-900">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => onUpdateQuantity(quantity - 1)}
            disabled={quantity === 0}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-500 transition-colors hover:text-amber-600 disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-gray-900">
            {quantity}
          </span>
          <button
            onClick={() => quantity === 0 ? onAdd() : onUpdateQuantity(quantity + 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-500 transition-colors hover:text-amber-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de Item do Carrinho
function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
        <Package className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-xs text-gray-500">R$ {item.price.toFixed(2).replace(".", ",")}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center text-gray-500 hover:text-amber-600"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-6 text-center text-sm font-medium text-gray-900">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center text-gray-500 hover:text-amber-600"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <span className="w-16 text-right text-sm font-semibold text-gray-900">
          R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
        </span>
        <button
          onClick={onRemove}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Página Principal
export default function NovoPedidoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup" | "dine-in">("delivery");
  const [markAsDelivered, setMarkAsDelivered] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  // Filtrar produtos
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Funções do carrinho
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const getQuantity = (productId: string) => {
    return cart.find((item) => item.id === productId)?.quantity || 0;
  };

  // Cálculos
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryType === "delivery" ? 5.0 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] sm:h-[calc(100vh-theme(spacing.16))] gap-4">
      {/* Lado Esquerdo - Catálogo de Produtos */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Novo Pedido</h1>
          <p className="text-sm text-gray-500">Selecione os produtos para adicionar ao pedido</p>
        </div>

        {/* Busca e Filtro */}
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produto por nome ou código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        {/* Categorias */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onAdd={() => addToCart(product)}
                quantity={getQuantity(product.id)}
                onUpdateQuantity={(qty) => updateCartQuantity(product.id, qty)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Package className="h-16 w-16 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Nenhum produto encontrado
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Tente buscar por outro termo ou categoria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lado Direito - Carrinho */}
      <div className="hidden md:flex w-96 flex-col rounded-2xl border border-gray-200 bg-white">
        {/* Header do Carrinho */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Carrinho</h2>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
              {cart.length}
            </span>
          </div>
        </div>

        {/* Cliente */}
        <div className="border-b border-gray-100 p-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Celular ou nome do cliente..."
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Tipo de Entrega */}
        <div className="border-b border-gray-100 p-4">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Tipo de Pedido
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "delivery", label: "Delivery", icon: Truck },
              { id: "pickup", label: "Retirada", icon: Store },
              { id: "dine-in", label: "Local", icon: Utensils },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setDeliveryType(type.id as typeof deliveryType)}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl p-3 text-xs font-medium transition-all ${
                  deliveryType === type.id
                    ? "bg-amber-50 text-amber-700 border-2 border-amber-500"
                    : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
                }`}
              >
                <type.icon className="h-5 w-5" />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Itens do Carrinho */}
        <div className="flex-1 overflow-auto p-4">
          {cart.length > 0 ? (
            <div className="space-y-2">
              {cart.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(qty) => updateCartQuantity(item.id, qty)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                Carrinho vazio
              </h3>
              <p className="mt-1 text-center text-xs text-gray-500">
                Adicione produtos para começar
              </p>
            </div>
          )}
        </div>

        {/* Totais */}
        <div className="border-t border-gray-100 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            {deliveryType === "delivery" && (
              <div className="flex justify-between text-gray-600">
                <span>Taxa de Entrega</span>
                <span>R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>

        {/* Checkbox e Botão */}
        <div className="border-t border-gray-100 p-4">
          <label className="mb-4 flex cursor-pointer items-center gap-2">
            <div
              onClick={() => setMarkAsDelivered(!markAsDelivered)}
              className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                markAsDelivered
                  ? "border-amber-500 bg-amber-500"
                  : "border-gray-300 bg-white"
              }`}
            >
              {markAsDelivered && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className="text-sm text-gray-700">Marcar como entregue</span>
          </label>

          <button
            disabled={cart.length === 0}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/30 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <span className="flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" />
              Escolher Forma de Pagamento
            </span>
          </button>
        </div>
      </div>

      {/* Carrinho Mobile (FAB) */}
      <div className="md:hidden fixed bottom-20 right-4">
        <button 
          onClick={() => setShowMobileCart(true)}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl shadow-orange-500/30"
        >
          <ShoppingCart className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Modal Carrinho Mobile */}
      {showMobileCart && (
        <>
          <div 
            className="md:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowMobileCart(false)}
          />
          <div className="md:hidden fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-auto rounded-t-2xl bg-white">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white p-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">Carrinho</h2>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                  {cart.length}
                </span>
              </div>
              <button 
                onClick={() => setShowMobileCart(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cliente */}
            <div className="border-b border-gray-100 p-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Cliente</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Celular ou nome do cliente..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            {/* Tipo de Entrega */}
            <div className="border-b border-gray-100 p-4">
              <label className="mb-3 block text-sm font-medium text-gray-700">Tipo de Pedido</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "delivery", label: "Delivery", icon: Truck },
                  { id: "pickup", label: "Retirada", icon: Store },
                  { id: "dine-in", label: "Local", icon: Utensils },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setDeliveryType(type.id as typeof deliveryType)}
                    className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl p-3 text-xs font-medium transition-all ${
                      deliveryType === type.id
                        ? "bg-amber-50 text-amber-700 border-2 border-amber-500"
                        : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <type.icon className="h-5 w-5" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Itens */}
            <div className="p-4">
              {cart.length > 0 ? (
                <div className="space-y-2">
                  {cart.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQuantity={(qty) => updateCartQuantity(item.id, qty)}
                      onRemove={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">Carrinho vazio</p>
                </div>
              )}
            </div>

            {/* Totais e Botão */}
            <div className="sticky bottom-0 border-t border-gray-100 bg-white p-4">
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {deliveryType === "delivery" && (
                  <div className="flex justify-between text-gray-600">
                    <span>Taxa de Entrega</span>
                    <span>R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
              <button
                disabled={cart.length === 0}
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/30 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Escolher Forma de Pagamento
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
