"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop - sempre visível em md+ */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:block">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onCollapse={setSidebarCollapsed}
        />
      </div>

      {/* Sidebar Mobile - overlay quando aberto */}
      <div className="md:hidden">
        {/* Overlay escuro */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar com animação slide */}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar 
            collapsed={false} 
            onCollapse={() => {}}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
