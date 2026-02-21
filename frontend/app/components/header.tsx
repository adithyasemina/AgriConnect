"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Leaf, LogOut, ChevronRight, 
  Home, ShoppingBag, BookOpen, Users, LayoutDashboard, User
} from "lucide-react";
import toast from "react-hot-toast";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; isAdmin: boolean } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    if (window.confirm("ඔබට පද්ධතියෙන් ඉවත් වීමට අවශ්‍යද?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsOpen(false);
      setIsProfileOpen(false);
      toast.success("සාර්ථකව ඉවත් විය!");
      router.push("/signin");
    }
  };

  const navLinks = [
    { name: "මුල් පිටුව", href: "/", icon: <Home size={20} /> },
    { name: "වෙළඳපොළ", href: "/market", icon: <ShoppingBag size={20} /> },
    { name: "වී වගා දැනුම", href: "/resources", icon: <BookOpen size={20} /> },
    { name: "ගොවි ප්‍රජාව", href: "/community", icon: <Users size={20} /> },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
        isScrolled 
          ? "bg-white shadow-md border-b border-emerald-50" 
          : "bg-transparent border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className={isScrolled ? "text-emerald-600" : "text-emerald-400"} size={28} />
            <span className={`text-xl font-black tracking-tight ${
              isScrolled ? "text-emerald-900" : "text-white"
            }`}>AgriConnect</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-bold transition-colors ${
                  isScrolled ? "text-emerald-900/70 hover:text-emerald-600" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-all shadow-sm ${
                    isScrolled 
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                      : "bg-white/20 text-white border-white/30 backdrop-blur-md"
                  }`}
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-emerald-50 p-2 z-[100]"
                    >
                      <div className="px-4 py-3 border-b border-emerald-50 mb-1">
                        <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">මගේ ගිණුම</p>
                        <p className="text-sm font-bold text-emerald-900 truncate">{user.name}</p>
                      </div>
                      
                      <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors">
                        <User size={18} className="text-emerald-600" /> මගේ තොරතුරු
                      </Link>

                      {user.isAdmin && (
                        <Link href="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors">
                          <LayoutDashboard size={18} className="text-emerald-600" /> පරිපාලන පුවරුව
                        </Link>
                      )}

                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mt-1 border-t border-red-50 pt-2">
                        <LogOut size={18} /> ඉවත් වන්න
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/signin" className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg active:scale-95 ${
                isScrolled 
                  ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                  : "bg-white text-emerald-900 hover:bg-emerald-50"
              }`}>
                එක්වන්න
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(true)} className={`md:hidden p-2 rounded-lg ${
            isScrolled ? "text-emerald-900 hover:bg-emerald-50" : "text-white hover:bg-white/10"
          }`}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-emerald-50">
              <span className="font-bold text-emerald-900 uppercase text-xs tracking-widest">මෙනුව</span>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-emerald-50 rounded-full text-emerald-900">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {user ? (
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-bold text-emerald-900 truncate">{user.name}</p>
                      <p className="text-xs text-emerald-600 font-medium">සාමාජිකයෙක්</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg text-sm font-bold text-emerald-700 border border-emerald-100">
                    පැතිකඩ බලන්න <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <Link href="/signin" onClick={() => setIsOpen(false)} className="flex items-center justify-center bg-emerald-600 text-white p-4 rounded-2xl font-bold shadow-lg">
                    පටන් ගනිමු
                </Link>
              )}
            </div>

            <div className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-4 py-4 rounded-xl text-emerald-900 hover:bg-emerald-50 font-semibold transition-colors">
                  <span className="text-emerald-500">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>

            {user && (
              <div className="p-6 border-t border-emerald-50">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-bold hover:bg-red-50 transition-colors">
                  <LogOut size={20} /> ගිණුමෙන් ඉවත් වන්න
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}