"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const experts = [
  {
    name: "안태건",
    englishName: "Ahn Tae Gun",
    position: "대표이사",
    image: "/증명사진_대표님.png",
  },
  {
    name: "이민재",
    englishName: "Lee Min Jae",
    position: "본사본부장",
    image: "/증명사진_이민재.png",
  },
  {
    name: "전재영",
    englishName: "Jeon Jae Young",
    position: "BS사업부장",
    image: "/증명사진_전재영.png",
  },
  {
    name: "장승호",
    englishName: "Jang Seung Ho",
    position: "전문위원",
    image: "/증명사진_장승호.png",
  },
  {
    name: "박요한",
    englishName: "Park Yo Han",
    position: "전문위원",
    image: "/증명사진_박요한.png",
  },
  {
    name: "김원우",
    englishName: "Kim Won Woo",
    position: "책임전문위원",
    image: "/증명사진_김원우.jpeg",
  },
  {
    name: "박규하",
    englishName: "Park Kyu Ha",
    position: "책임전문위원",
    image: "/증명사진_박규하.jpeg",
  },
  {
    name: "구미숙",
    englishName: "Ku Mi Sook",
    position: "전문위원",
    image: "/증명사진_구미숙.png",
  },
  {
    name: "강지훈",
    englishName: "Kang Ji Hoon",
    position: "전문위원",
    image: "/증명사진_강지훈.png",
  },
  {
    name: "조규상",
    englishName: "Cho Kyu Sang",
    position: "전문위원",
    image: "/증명사진_조규상.jpeg",
  },
  {
    name: "박상수",
    englishName: "Park Sang Soo",
    position: "전문위원",
    image: "/증명사진_박상수.jpeg",
  },
];

export default function ExpertSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experts.length);
    }, 3000); // Slower interval for better readability
    return () => clearInterval(timer);
  }, []);

  const nextIndex = (currentIndex + 1) % experts.length;

  return (
    <section 
        className="relative py-20 flex flex-col items-center justify-center overflow-hidden w-full"
        style={{
            background: 'linear-gradient(115deg, #16171A 40%, #202125 40%)'
        }}
    >
      
      {/* Section Header - Slide Up + Scale */}
      <motion.div 
        className="w-full max-w-6xl px-4 md:px-0 mb-8 flex items-center justify-between"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white font-sans">OUR EXPERTS</h2>
        <div className="h-[1px] w-24 bg-white/50"></div>
      </motion.div>

      {/* Main Container - Full Width Content but Aligned */}
      <motion.div 
        className="relative w-full max-w-6xl h-[600px] md:h-[450px] overflow-visible"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >

        <AnimatePresence mode="popLayout">
          {experts.map((expert, index) => (
            index === currentIndex && (
              <div key={index} className="absolute inset-0 w-full h-full">
                
                {/* Background Large Number (Layer 0) - Horizontal Slide */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-2 md:top-[5%] left-12 md:left-[-2%] z-0 select-none pointer-events-none"
                >
                  <span className="text-[100px] md:text-[120px] font-serif font-bold text-white/[0.2] leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>

                {/* Content Grid (Layer 10) */}
                <div className="absolute inset-0 flex flex-col md:grid md:grid-cols-12 h-full w-full pointer-events-none pt-12 md:pt-0">
                    
                    {/* Left Content: Text - Top to Bottom */}
                    <div className="w-full md:col-span-5 relative h-auto md:h-full flex flex-col justify-center pl-8 md:pl-0 z-20 pointer-events-auto mb-8 md:mb-0">
                       <motion.div
                         initial={{ opacity: 0, y: -30 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 30 }}
                         transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                       >
                          <h3 className="text-sm font-bold tracking-[0.1em] text-[#ff3333] mb-2 md:mb-3 font-sans mt-2 md:mt-0">
                            {expert.position}
                          </h3>
                          
                          {/* Korean Name Only - Sans Serif (Pretendard) */}
                          <h2 className="text-4xl md:text-6xl font-bold text-white font-sans leading-tight mb-4 md:mb-6 break-keep">
                            {expert.name}
                          </h2>
                          
                          <div className="flex items-center gap-4">
                              <Link href="/company/team" className="text-xs font-bold uppercase tracking-widest text-white/80 border-b border-white/50 pb-1 hover:text-white hover:border-white transition-all duration-300 font-sans mt-2 md:mt-0">
                                 View Profile
                              </Link>
                          </div>
                       </motion.div>
                    </div>

                    {/* Middle Content: Main Image - Horizontal Slide */}
                    <div className="flex-1 md:h-full md:col-span-4 relative flex items-start md:items-center justify-center z-10 w-full px-4 md:px-0">
                       <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="relative w-[230px] h-[310px] sm:w-[260px] sm:h-[350px] md:w-[280px] md:h-[380px] shadow-2xl pointer-events-auto mx-auto mt-2 md:mt-0"
                       >
                          <img 
                            src={expert.image} 
                            alt={expert.name} 
                            className="w-full h-full object-cover object-top filter grayscale-[20%] contrast-110"
                          />
                          {/* Inner Shadow for depth */}
                          <div className="absolute inset-0 ring-1 ring-white/10"></div>
                       </motion.div>
                    </div>

                    {/* Right Content: Next Image Preview */}
                    <div className="hidden md:block col-span-3 relative h-full z-0 overflow-visible">
                       <div className="absolute top-1/2 left-10 transform -translate-y-1/2 w-[220px] h-[300px] opacity-30 grayscale pointer-events-none scale-90">
                          <img 
                             src={experts[nextIndex].image} 
                             alt="Next" 
                             className="w-full h-full object-cover object-top" 
                          />
                          <div className="absolute inset-0 bg-black/50"></div>
                       </div>
                    </div>
                </div>

                {/* Progress Indicator - Align with Left Text */}
                <div className="absolute bottom-4 left-8 md:left-0 z-30 pointer-events-auto text-white/80 font-bold tracking-widest text-sm font-sans">
                   <span className="text-white">{currentIndex + 1}</span> <span className="text-white/40 mx-1">/</span> {experts.length}
                </div>

              </div>
            )
          ))}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
