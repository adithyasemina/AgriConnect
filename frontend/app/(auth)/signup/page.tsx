// "use client";

// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { UserPlus, Eye, EyeOff, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function SignupPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     isAdmin: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     toast.dismiss();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     setLoading(true);
//     const toastId = toast.loading("Creating your account...");

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const response = await axios.post(`${API_BASE_URL}/users/signup`, {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         isAdmin: formData.isAdmin,
//       });

//       if (response.status === 201) {
//         toast.success("Registration Successful! Please sign in.", {
//           id: toastId,
//           icon: <UserPlus size={20} className="text-green-600" />,
//         });
//         router.push("/signin");
//       }
//     } catch (err: unknown) {
//       const error = err as AxiosError<{ message?: string }>;
//       const message = error.response?.data?.message || "Registration failed. Try again.";
//       toast.error(message, { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-[100dvh] w-full flex bg-white font-sans overflow-hidden">
//       <motion.div 
//         initial={{ opacity: 0, y: -50 }} 
//         animate={{ opacity: 1, y: 0 }}    
//         transition={{ duration: 0.6, ease: "easeOut" }}   
//         className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto no-scrollbar"
//       >
//         <div className="w-full max-w-[400px] mx-auto py-8 md:py-0">
//           <div className="mb-6 md:mb-8">
//             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
//             <p className="text-slate-500 mt-2 text-sm font-medium">Join AgriConnect 🌱 and start managing your farm today.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="group">
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Full Name</label>
//               <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all duration-200 bg-slate-50/50 text-sm" />
//             </div>

//             <div className="group">
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Email Address</label>
//               <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all duration-200 bg-slate-50/50 text-sm" />
//             </div>

//             <div className="group">
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Password</label>
//               <div className="relative">
//                 <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="At least 8 characters" className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all duration-200 bg-slate-50/50 text-sm" />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
//               </div>
//             </div>

//             <div className="group">
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Confirm Password</label>
//               <div className="relative">
//                 <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all duration-200 bg-slate-50/50 text-sm" />
//                 <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-200 active:scale-[0.99] shadow-xl shadow-slate-200 flex items-center justify-center gap-2 disabled:bg-slate-400 mt-2">
//               {loading ? "Creating Account..." : "Create Account"}
//               {!loading && <ArrowRight size={18} />}
//             </button>
//           </form>

//           <p className="mt-8 text-center text-slate-500 text-sm font-medium">
//             Already have an account? 
//             <Link href="/signin" className="text-blue-600 font-bold hover:underline ml-1.5"> Log in here </Link>
//           </p>
//         </div>
//       </motion.div>

//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="hidden md:block flex-1 p-6 lg:p-8 bg-slate-50"
//       >
//         <div 
//           className="w-full h-full rounded-[2.5rem] bg-cover bg-center shadow-inner relative overflow-hidden flex items-end p-12 group" 
//           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1502472545332-e24172e7009a?q=80&w=1600&auto=format&fit=crop')` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
//           <div className="relative z-10 max-w-lg">
//             <h2 className="text-white text-4xl font-bold leading-tight">Empowering the next <br /> <span className="text-green-400">Green Revolution.</span></h2>
//             <p className="text-slate-300 mt-4 text-lg font-medium leading-relaxed">Join a community of smart farmers and take your agriculture business to the next level.</p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserPlus, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await axios.post(`${API_BASE_URL}/users/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        isAdmin: formData.isAdmin,
      });

      if (response.status === 201) {
        toast.success("Registration Successful! Please sign in.", {
          id: toastId,
          icon: <UserPlus size={20} className="text-emerald-600" />,
        });
        router.push("/signin");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full flex bg-white font-sans overflow-hidden">
      
      {/* වම් පැත්ත - Signup Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }}    
        transition={{ duration: 0.6 }}   
        className="w-full md:w-[50%] lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-20 overflow-y-auto no-scrollbar"
      >
        <div className="w-full max-w-[420px] mx-auto py-10">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100">
              <Leaf className="text-white" size={22} />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tight">AgriConnect</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Join Sri Lanka's leading smart farming community 🌱</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full px-5 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium" />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full px-5 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors">{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
            </div>

            <button 
              type="submit" disabled={loading} 
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 disabled:bg-slate-300 mt-4"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 text-sm font-medium">
            Already have an account? 
            <Link href="/signin" className="text-emerald-600 font-black hover:underline ml-1.5 transition-all"> 
              Sign in instead 
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
          style={{ backgroundImage: `url('/hero2.png')` }} //
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 max-w-lg text-left">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Grow Smarter with <br /> <span className="text-emerald-400 italic">Advanced Analytics.</span>
              </h2>
              <p className="text-slate-200 mt-6 text-lg font-medium leading-relaxed">
                Connect with agricultural experts and manage your paddy fields with precision technology.
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