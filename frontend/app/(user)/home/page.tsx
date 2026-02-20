"use client";

import { Camera, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    /* h-screen වෙනුවට min-h-screen දාන්න. overflow-hidden අයින් කරන්න */
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      


      {/* 2. Hero Section */}
      <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
            ශ්‍රී ලංකාවේ වී ගොවීන් සඳහාම
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mt-6 leading-tight">
            ඔබේ අස්වැන්න රකින්න <br /> 
            <span className="text-green-600">තාක්ෂණයෙන් එක්වන්න</span>
          </h1>
          <p className="text-slate-600 mt-6 text-lg leading-relaxed max-w-xl">
            වී වගාවේ රෝග හඳුනා ගැනීමට සහ කෘෂිකාර්මික නිලධාරීන්ගේ සහය ලබා ගැනීමට ඇති නවීනතම පද්ධතිය.
          </p>
          <div className="mt-10">
            <Link href="/diseases" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-100">
              <Camera size={20} />
              දැන්ම පරීක්ෂා කරන්න
            </Link>
          </div>
        </div>
        
        <div className="flex-1 w-full h-[300px] md:h-[500px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl">
           <img 
              src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1000&auto=format&fit=crop" 
              alt="Paddy Field"
              className="w-full h-full object-cover"
            />
        </div>
      </section>
      

      {/* 3. Steps Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">භාවිතා කරන්නේ කෙසේද?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: "01", t: "පින්තූරයක් ගන්න", d: "වී පත්‍රයේ පැහැදිලි ඡායාරූපයක් ගන්න." },
              { n: "02", t: "විශ්ලේෂණය කරන්න", d: "AI මගින් රෝගය හඳුනාගනී." },
              { n: "03", t: "උපදෙස් ලබාගන්න", d: "නිසි පිළියම් සහ සහය ලබාගන්න." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-xl shadow-green-100">
                  {step.n}
                </div>
                <h3 className="text-xl font-bold mb-2 font-sans">{step.t}</h3>
                <p className="text-slate-500 text-sm max-w-[200px] font-sans">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Horizontal Scroll Section */}
      <section className="px-6 py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">අලුත්ම තොරතුරු</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
            {[
              { title: "නව පොහොර සහනාධාරය", date: "2026 Feb 15", img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=500" },
              { title: "අස්වනු නෙලීමේ නව යන්ත්‍ර", date: "2026 Feb 12", img: "https://images.unsplash.com/photo-1594488311306-69666f77348e?q=80&w=500" },
              { title: "වී මිල තීරණය කිරීම", date: "2026 Feb 10", img: "https://images.unsplash.com/photo-1536633390841-39a105c49e21?q=80&w=500" },
              { title: "ජල කළමනාකරණය", date: "2026 Feb 08", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500" }
            ].map((item, index) => (
              <div key={index} className="min-w-[280px] md:min-w-[350px] bg-slate-800 rounded-[2.5rem] overflow-hidden snap-center border border-slate-700">
                <img src={item.img} className="w-full h-48 object-cover" alt="" />
                <div className="p-7">
                  <p className="text-green-400 text-[10px] font-bold mb-2 uppercase tracking-widest">{item.date}</p>
                  <h3 className="text-white font-bold text-lg mb-4">{item.title}</h3>
                  <span className="text-slate-400 text-sm font-semibold flex items-center gap-1">
                    වැඩිදුර කියවන්න <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-900 py-12 px-6 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">© 2026 AgriConnect. සියලුම හිමිකම් ඇවිරිණි.</p>
      </footer>
    </div>
  );
}