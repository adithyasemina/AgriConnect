"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios"; // AxiosError එක් කළා
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, UserCheck, ArrowRight } from "lucide-react"; 
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.post(`${API_BASE_URL}/users/signin`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, name, email, isAdmin, _id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ _id, name, email, isAdmin }));

      toast.success(`Welcome back, ${name || "User"}!`, { 
        id: toastId, 
        icon: <UserCheck size={20} className="text-green-600" />
      });

      router.push(isAdmin ? "/" : "/");
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
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto no-scrollbar"
      >
        <div className="w-full max-w-[400px] mx-auto py-8 md:py-0">
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign In</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="group">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all duration-200 bg-slate-50/50 text-sm" />
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all duration-200 bg-slate-50/50 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-200 active:scale-[0.99] shadow-xl shadow-slate-200 flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:shadow-none">
              {loading ? "Verifying..." : "Continue"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative my-8 md:my-10">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold"><span className="bg-white px-4 text-slate-400 italic">Security Verified</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-slate-200 py-3.5 rounded-2xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-4" alt="G" /> Sign in with Google
          </button>

          <p className="mt-8 md:mt-10 text-center text-slate-500 text-sm font-medium">
            New here? 
            <Link href="/signup" className="text-blue-600 font-bold hover:underline ml-1.5">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block flex-1 p-6 lg:p-8 bg-slate-50"
      >
        <div className="w-full h-full rounded-[2.5rem] bg-cover bg-center shadow-inner relative overflow-hidden flex items-end p-12 group" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 max-w-lg text-left">
            <h2 className="text-white text-4xl font-bold leading-tight">Manage your projects with <br /> <span className="text-blue-400">precision.</span></h2>
            <p className="text-slate-300 mt-4 text-lg font-medium leading-relaxed">Experience the next generation of project management tools designed for modern teams.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}