"use client";
import { motion } from "framer-motion";

const branches = [
  {
    name: "대구지사",
    manager: "심현용 지사장",
    address: "대구 중구 태평로 160 5층",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-2 h-[300px] md:h-full", // Tall vertical
  },
  {
    name: "광주1지사",
    manager: "구미숙 지사장",
    address: "광주 동구 중앙로 358 2층",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    className: "md:col-span-2 h-[300px] md:h-full", // Wide horizontal
  },
  {
    name: "광주2지사",
    manager: "김수철 지사장",
    address: "광주 광산구 왕버들로 11 2층",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    className: "md:col-span-1 h-[300px] md:h-full", // Standard square
  },
  {
    name: "당진지사",
    manager: "이종혁 지사장",
    address: "충남 당진시 무수동로 256 2층",
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2074&auto=format&fit=crop",
    className: "md:col-span-1 h-[300px] md:h-full", // Standard square
  },
];

export default function BranchIntro() {
  return (
    <section className="bg-white py-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Section Header */}
      <div className="w-full max-w-6xl px-4 md:px-0 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
           <span className="block text-sm font-bold tracking-[0.2em] text-gray-500 mb-4 ml-1">LOCATIONS</span>
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black font-sans">
            OFFICE BRANCHES
           </h2>
        </motion.div>
        
        <motion.p 
            className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            전국 각 지사에서 최고의 전문가들이 함께합니다.<br/>
            가까운 지사를 통해 전문적인 컨설팅을 경험해보세요.
        </motion.p>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-6xl px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px]">
        {branches.map((branch, index) => (
          <motion.div
            key={index}
            className={`group relative overflow-hidden bg-gray-100 cursor-pointer ${branch.className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Background Image with Zoom Effect */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${branch.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <span className="inline-block px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-medium tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black text-white transition-all duration-300">
                        <svg className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-1">{branch.name}</h3>
                    
                    <div className={`overflow-hidden transition-all duration-500 opacity-80 group-hover:opacity-100`}>
                        <div className="pt-2 space-y-1 mt-2 border-t border-white/20">
                            <p className="text-white/90 text-sm font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                {branch.manager}
                            </p>
                            <p className="text-white/70 text-xs pl-3.5 leading-relaxed truncate">
                                {branch.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
