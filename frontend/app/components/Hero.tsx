"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden bg-slate-900">
      
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
        }}
      >
        {/* Black Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 pt-20">
        {/* Badge */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-5 py-2 mb-6 text-sm font-bold tracking-widest text-emerald-400 uppercase border border-emerald-400/30 bg-emerald-400/10 rounded-full backdrop-blur-md"
        >
          ශ්‍රී ලංකාවේ වී ගොවීන් සඳහාම
        </motion.span>
        
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.2] tracking-tight"
        >
          ඔබේ අස්වැන්න රකින්න <br />
          <span className="text-emerald-500">තාක්ෂණයෙන් එක්වන්න</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-slate-200 text-lg md:text-2xl font-medium mb-12 leading-relaxed px-4"
        >
          වී වගාවේ රෝග හඳුනා ගැනීම, wee gowithana pilibada danuma haa කෘෂිකාර්මික නිලධාරීන්ගේ සහය ලබා ගැනීමට ඇති නවීනතම පද්ධතිය.
        </motion.p>
      </div>

      {/* Decorative Gradient for extra depth */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-[1]"></div>
    </section>
  );
}