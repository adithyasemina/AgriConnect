"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Users, ShoppingBag, 
  FileText, MessageSquare, Settings, Menu, X, Leaf 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminName, setAdminName] = useState(""); // ලොග් වූ පරිශීලකයාගේ නම සඳහා

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/signin");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.isAdmin) {
      setIsAuthorized(true);
      setAdminName(user.name); // නම ලබා ගැනීම
    } else {
      router.push("/");
    }
    setIsMobileMenuOpen(false);
  }, [pathname, router]);

  if (!isAuthorized) return null;

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Users", icon: <Users size={20} />, href: "/admin/users" },
    { name: "Marketplace", icon: <ShoppingBag size={20} />, href: "/admin/market" },
    { name: "Reports", icon: <FileText size={20} />, href: "/admin/reports" },
    { name: "Messages", icon: <MessageSquare size={20} />, href: "/admin/messages" },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Mobile Menu Overlay & Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Leaf className="text-emerald-600" size={28} />
                  <span className="font-black text-xl text-slate-900 tracking-tight">AgriConnect</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-bold ${pathname === item.href ? "bg-emerald-600 text-white shadow-lg" : "text-slate-600 hover:bg-emerald-50"}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. Desktop Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} hidden md:flex flex-col sticky top-0 h-screen`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 h-20 shrink-0">
          <Leaf className="text-emerald-600 shrink-0" size={28} />
          {isSidebarOpen && <span className="font-black text-xl text-slate-900 tracking-tight">AgriConnect</span>}
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-semibold ${pathname === item.href ? "bg-emerald-600 text-white shadow-lg" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header - අනුව සකසා ඇත */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-4">
            {/* Hamburger Button (Mobile & Desktop Toggle) */}
            <button 
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileMenuOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }} 
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* User Profile Section - */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-tight">{adminName || "Admin User"}</p>
              <p className="text-[11px] text-slate-500 font-medium">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-emerald-200 uppercase">
              {adminName ? adminName[0] : "A"}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content with Independent Scroll */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}