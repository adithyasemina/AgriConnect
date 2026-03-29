"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, UserCheck, ArrowRight, Leaf } from "lucide-react"; 
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss(); 
    setLoading(true);
    const toastId = toast.loading("Verifying access...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // ටිකක් smooth වෙන්න delay එකක්
      const response = await axios.post(`${API_BASE_URL}/users/signin`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, name, email, isAdmin, _id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ _id, name, email, isAdmin }));

      toast.success(`Welcome back, ${name || "User"}!`, { 
        id: toastId, 
        icon: <UserCheck size={20} className="text-emerald-600" />
      });

      router.push(isAdmin ? "/admin" : "/");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message || "Invalid email or password.";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full flex bg-white font-sans overflow-hidden">
      
      {/* වම් පැත්ත - Form එක */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[50%] lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-20 overflow-y-auto no-scrollbar"
      >
        <div className="w-full max-w-[400px] mx-auto py-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tight">AgriConnect</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back!</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-2 ml-1">Email Address</label>
              <input 
                type="email" name="email" required 
                value={formData.email} onChange={handleChange} 
                placeholder="email@example.com" 
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Password</label>
                <Link href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} name="password" required 
                  value={formData.password} onChange={handleChange} 
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" disabled={loading} 
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none mt-4"
            >
              {loading ? "Verifying Access..." : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black"><span className="bg-white px-4 text-slate-400">Secure Access</span></div>
          </div>

          <p className="text-center text-slate-500 text-sm font-medium">
            Don't have an account? 
            <Link href="/signup" className="text-emerald-600 font-black hover:underline ml-1.5 transition-all">
              Join AgriConnect
            </Link>
          </p>
        </div>
      </motion.div>

      {/* දකුණු පැත්ත - Hero Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:block flex-1 p-6 lg:p-8 "
      >
        <div 
          className="w-full h-full rounded-[2.5rem] bg-cover bg-center shadow-2xl relative overflow-hidden flex items-end p-12 group transition-transform duration-700" 
          style={{ backgroundImage: `url('/hero4.jpg')` }} //
        >
          {/* අඳුරු Overlay එක */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 max-w-lg text-left">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Empowering the <br /> <span className="text-emerald-400 italic">Paddy Farmers</span> of Sri Lanka.
              </h2>
              <p className="text-slate-200 mt-6 text-lg font-medium leading-relaxed max-w-md">
                Experience the next generation of smart agriculture management with real-time analytics and professional support.
              </p>
            </motion.div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-10 right-10 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400/20"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}