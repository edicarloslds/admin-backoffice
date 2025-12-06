"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Clock,
  ShoppingBag,
  Ban,
} from "lucide-react";

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDeliverySettings, setShowDeliverySettings] = useState(false);

  // Estados das configurações de entrega
  const [tempoEntrega, setTempoEntrega] = useState("12:22");
  const [tempoRetirada, setTempoRetirada] = useState("00:20");
  const [gratisAcima, setGratisAcima] = useState("150,00");
  const [estabelecimentoFechado, setEstabelecimentoFechado] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Lado esquerdo - Status do estabelecimento */}
        <div className="flex items-center">
          {estabelecimentoFechado ? (
            <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Estabelecimento fechado
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Recebendo pedidos
            </span>
          )}
        </div>

        {/* Lado direito */}
        <div className="flex items-center gap-2">
          {/* Configurações de Entrega */}
          <div className="relative">
            <button
              onClick={() => setShowDeliverySettings(!showDeliverySettings)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                showDeliverySettings
                  ? "bg-amber-50 text-amber-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Configurações de Entrega</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showDeliverySettings ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown de Configurações de Entrega */}
            {showDeliverySettings && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDeliverySettings(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Truck className="h-4 w-4 text-amber-600" />
                    Configurações de Entrega
                  </h3>

                  <div className="space-y-4">
                    {/* Tempo para Entrega */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Clock className="h-3.5 w-3.5" />
                        Tempo para entrega
                      </label>
                      <input
                        type="text"
                        value={tempoEntrega}
                        onChange={(e) => setTempoEntrega(e.target.value)}
                        placeholder="00:00"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>

                    {/* Tempo para Retirada */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Tempo para retirada
                      </label>
                      <input
                        type="text"
                        value={tempoRetirada}
                        onChange={(e) => setTempoRetirada(e.target.value)}
                        placeholder="00:00"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>

                    {/* Grátis acima de */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <span className="flex h-3.5 w-3.5 items-center justify-center text-xs font-bold">
                          R$
                        </span>
                        Frete grátis acima de
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                          R$
                        </span>
                        <input
                          type="text"
                          value={gratisAcima}
                          onChange={(e) => setGratisAcima(e.target.value)}
                          placeholder="0,00"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>

                    {/* Divisor */}
                    <div className="border-t border-gray-100 pt-4">
                      {/* Toggle Fechar Estabelecimento */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                              estabelecimentoFechado
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <Ban className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Fechar estabelecimento
                            </p>
                            <p className="text-xs text-gray-500">
                              {estabelecimentoFechado
                                ? "Estabelecimento fechado"
                                : "Recebendo pedidos normalmente"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setEstabelecimentoFechado(!estabelecimentoFechado)
                          }
                          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                            estabelecimentoFechado ? "bg-red-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                              estabelecimentoFechado
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botão Salvar */}
                  <button
                    onClick={() => setShowDeliverySettings(false)}
                    className="mt-4 w-full cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                  >
                    Salvar alterações
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Busca */}
          <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <Search className="h-5 w-5" />
          </button>

          {/* Notificações */}
          <button className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Divisor */}
          <div className="mx-2 h-6 w-px bg-gray-200" />

          {/* Perfil do usuário */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <span className="text-sm font-semibold text-white">S</span>
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:block">
                Shazzad
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    Meu Perfil
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Configurações
                  </Link>
                  <div className="my-1 border-t border-gray-100" />
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
