"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const institutes = [
  { name: "බතලගොඩ වී පර්යේෂණ ආයතනය", location: "කුරුණෑගල", coordinates: "top-[42%] left-[43%]" },
  { name: "බෝම්බුවල වී පර්යේෂණ මධ්‍යස්ථානය", location: "කළුතර", coordinates: "bottom-[30%] left-[38%]" },
  { name: "අම්බලන්තොට පර්යේෂණ මධ්‍යස්ථානය", location: "ဟම්බන්තොට", coordinates: "bottom-[20%] right-[44%]" },
  { name: "ලබුදූව වී පර්යේෂණ මධ්‍යස්ථානය", location: "ගාල්ල", coordinates: "bottom-[24%] left-[40%]" },
  { name: "පරන්තන් වී පර්යේෂණ මධ්‍යස්ථානය", location: "කිලිනොච්චිය", coordinates: "top-[15%] left-[50%]" },
  { name: "මුරුන්කන් වී පර්යේෂණ මධ්‍යස්ථානය", location: "මන්නාරම", coordinates: "top-[28%] left-[42%]" },
  { name: "සමන්තුරේ වී පර්යේෂණ මධ්‍යස්ථානය", location: "අම්පාර", coordinates: "bottom-[42%] right-[32%]" },
  { name: "බෙන්තොට වී පර්යේෂණ මධ්‍යස්ථානය", location: "බෙන්තොට", coordinates: "bottom-[29%] left-[38%]" }
];

export default function MapSection() {
  return (
    <section className="h-screen w-full bg-slate-50 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full px-6 flex flex-col lg:flex-row items-center gap-10 py-12">
        
        {/* 1. Visual Map Area (Detailed Sri Lanka SVG) */}
        <div className="relative w-full lg:w-1/2 h-[55vh] lg:h-[85vh] bg-white rounded-[3rem] shadow-xl flex items-center justify-center p-8 shrink-0 border border-slate-100">
          
          <svg
            viewBox="0 0 350 600"
            className="h-full w-auto text-emerald-600/10 fill-current drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ශ්‍රී ලංකා සිතියමේ දල සටහන (SVG Path) */}
            <path d="M164.7,1.1c-5.7,2.1-13,9.5-15.3,15.6c-2.8,7.3-1.8,11.2,5.2,19.3c5.3,6.2,6.5,8.8,6.5,14.6c0,11.7-8,24-21.6,33.1 c-14.1,9.5-22.1,23.5-22.5,39.3c-0.3,10.6,1.4,14.9,9.4,24.1c11.9,13.8,11.5,21.9-1.3,34.8c-12,12.1-15.1,17.2-15.1,25.4 c0,6.1,2.8,13.1,6.5,16.2c3.2,2.7,4,6,4,16.1c0,10.1-0.8,13.4-4,16.1c-3.7,3.1-6.5,10-6.5,16.1c0,11.8,7.9,24.1,21.5,33.2 c14.1,9.5,22.1,23.5,22.5,39.3c0.3,10.6-1.4,14.9-9.4,24.1c-11.9,13.8-11.5,21.9,1.3,34.8c12,12.1,15.1,17.2,15.1,25.4 c0,8.2-3.1,13.4-15.1,25.4c-12.8,12.9-13.2,21-1.3,34.8c8,9.2,9.7,13.5,9.4,24.1c-0.4,15.8-8.4,29.8-22.5,39.3 c-13.6,9.1-21.5,21.4-21.5,33.2c0,6.1,2.8,13.1,6.5,16.1c3.2,2.7,4,6,4,16.1c0,8.1-1,14.3-3.6,19.1c-2.9,5.5-2.8,11,0.2,14.4 c3.2,3.6,10.1,4.7,18.8,3.1c16.3-3,37.3-18.4,50.7-37.3c9.7-13.6,22.5-19.6,40.9-19.2c19,0.4,32.2,6.3,47.2,21c16.8,16.4,26.7,21.3,42.2,21c13.7-0.2,19.6-3.2,27-14.1c5.9-8.7,6.8-12.7,6.8-31.5c0-16.1-1.1-23.7-5.1-34.9c-4.4-12.3-4.1-20.2,1-32.6 c4.4-10.7,4.3-11.7-1.1-20.4c-5.5-8.9-5.5-10.4,0.1-18c5.4-7.4,6.4-11.9,5.6-25.1c-1-17.7-6.2-28-21.7-43 c-10-9.6-13.5-16.1-14.7-26.6c-2.1-18.4,2.2-31.4,13.9-42.5c10.8-10.3,12.4-14.1,12.4-29.2c0-13-2-19.7-8.1-27.1 c-10-12.2-11.5-21-6.9-40.4c4.1-17.3,1.9-28.7-8-41.2c-7.9-10-13.6-14-23.3-16.3c-15.1-3.6-18.7-7-23.1-22.1 c-2.9-10.1-7.1-16.8-13.9-22.4c-8.9-7.3-12.5-14.4-12.5-24.9c0-11,2.8-16.1,12.3-22.5c11.5-7.7,13.3-12.2,11.3-27.5 c-1.5-11.5-6.9-18.3-21.5-27.3c-12.7-7.8-17.1-13.6-18.6-24.3c-1.3-9-3.9-14-10.5-19.9c-7.1-6.4-10-7.8-16.3-7.8 C173.3,0,169.5,0.4,164.7,1.1z" />
          </svg>

          {/* Interactive Pins */}
          <div className="absolute inset-0">
            {institutes.map((inst, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className={`absolute ${inst.coordinates} group/pin z-20`}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <MapPin size={24} className="text-emerald-600 fill-white group-hover/pin:text-emerald-800 transition-colors shadow-md cursor-pointer" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg opacity-0 group-hover/pin:opacity-100 transition-all scale-75 group-hover/pin:scale-100 whitespace-nowrap z-50">
                    {inst.name}
                  </div>
                  
                  {/* Animation */}
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Text & List Area */}
        <div className="flex flex-col w-full lg:w-1/2 h-full max-h-[85vh]">
          <div className="mb-8 shrink-0">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
              ප්‍රධාන වී පර්යේෂණ <br /> 
              <span className="text-emerald-600">මධ්‍යස්ථාන</span>
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              දිවයින පුරා පිහිටි වී පර්යේෂණ ආයතන සහ ඒවායේ පිහිටීම.
            </p>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
            {institutes.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all cursor-pointer hover:bg-emerald-50 hover:border-emerald-200"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base">{item.name}</h4>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
    </section>
  );
}