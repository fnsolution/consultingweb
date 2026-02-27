"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion";

const stats = [
  { 
    number: 10, 
    label: "Years", 
    suffix: "+" 
  },
  { 
    number: 200, 
    label: "Specialists", 
    suffix: "+" 
  },
  { 
    number: 30000, 
    label: "Consulting", 
    suffix: "+" 
  },
];

const historyData = [
  { year: "2025", title: "재무·경영 컨설팅 전문위원 1000명 배출", description: "지속적인 특화 교육과 인력 양성을 통해 체계적인 전문 컨설팅 네트워크를 전국 규모로 확장하며, 명실공히 대한민국 최고의 컨설팅 그룹으로 도약했습니다." },
  { year: "2024", title: "안동지사, 부산지사 설립", description: "전국 각지에 핵심 네트워크 거점을 순차적으로 확보하며 기업별 맞춤형 밀착 컨설팅 라인을 견고하게 구축, 현장 중심의 서비스를 강화했습니다." },
  { year: "2023", title: "전사적 디지털 전환 (DT)", description: "경영 분석 모델 및 내부 컨설팅 프로세스에 첨단 데이터 솔루션을 대거 도입하여, 복잡다단한 경영 리스크를 오차 없이 진단하는 디지털 워크플로우를 확립했습니다." },
  { 
    year: "2019", 
    events: [
      { title: "경영컨설팅 전문기업화", description: "재무컨설팅 전문회사에서 중소기업 및 소상공인을 위한 경영컨설팅 체제를 도입하였고, 수준 높은 전문인력을 리크루팅 및 양성하기 위해 별도 조직을 구성하였습니다." },
      { title: "BS사업부 및 중소기업지원센터 설립", description: "현장 일선에 있는 중소기업들의 실질적인 애로사항을 면밀히 분석하고 원스톱으로 지원할 수 있는 특화 센터를 출범하여, 동반 성장의 가치를 실현하고 있습니다." }
    ]
  },
  { year: "2017", title: "자사 브랜드 상표등록", description: "기업의 고유철학과 컨설팅 방법론을 결합한 브랜드 가치를 공식적으로 인정받고, 파트너사와 고객들에게 높은 전문성을 각인시키는 계기를 마련했습니다." },
  { year: "2016", title: "금융보국의 이념으로 회사 설립", description: "'금융으로 국가와 국민에게 지대하게 기여한다'는 굳건한 사명감을 바탕으로, 기업들의 지속적인 생존과 성장을 위한 신개념 컨설팅을 제공하고자 첫발을 내디뎠습니다." },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const rounded = useTransform(springValue, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
}

export default function StatsBoard() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="bg-white text-black overflow-hidden relative font-sans">
      
      {/* 1. Stats Section with Building on Right */}
      <div className="relative w-full py-20 overflow-hidden bg-white">
         
         {/* Building Image - Right Side Only (Reduced Width) */}
         <div className="absolute right-0 top-0 bottom-0 w-2/5 z-0 hidden lg:block">
            <motion.img 
               src="/building2.avif" 
               alt="Background" 
               className="w-full h-full object-cover object-right"
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: "easeOut" }}
            />
         </div>

         <div className="relative z-10 pl-8 sm:pl-12 lg:pl-16">
            
            {/* Headline - Parallax Effect */}
            <motion.div 
              className="mb-16 max-w-2xl"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1, 
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
              }}
            >
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
                 The beginning of <br />
                 the FN solution <br />
                 evolution.
               </h2>
            </motion.div>

            {/* Stacked Stats with Wave/Stagger Effect */}
            <div className="flex flex-col space-y-6">
               {stats.map((stat, index) => (
                 <motion.div 
                   key={index} 
                   className="flex items-baseline"
                   initial={{ opacity: 0, x: -100, rotate: -3 }}
                   whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ 
                     duration: 0.8, 
                     delay: index * 0.15,
                     type: "spring",
                     stiffness: 100,
                     damping: 15
                   }}
                   whileHover={{ 
                     scale: 1.05, 
                     x: 10,
                     transition: { duration: 0.3 }
                   }}
                 >
                    <div className="flex items-baseline">
                       {/* Huge Number with Bounce */}
                       <motion.span 
                         className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none"
                         initial={{ scale: 0.5, opacity: 0 }}
                         whileInView={{ scale: 1, opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ 
                           duration: 0.6, 
                           delay: index * 0.15 + 0.2,
                           type: "spring",
                           stiffness: 200,
                           damping: 10
                         }}
                       >
                          <Counter value={stat.number} suffix="" />
                       </motion.span>
                       
                       {/* Plus Sign & Label group with Slide */}
                       <motion.div 
                         className="ml-6 flex items-baseline"
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ 
                           duration: 0.5, 
                           delay: index * 0.15 + 0.4 
                         }}
                       >
                          <span className="text-4xl md:text-5xl font-black text-black mr-4">
                             {stat.suffix}
                          </span>
                          <span className="text-lg md:text-xl text-gray-500 font-medium">
                             {stat.label}
                          </span>
                       </motion.div>
                    </div>
                 </motion.div>
               ))}
            </div>

         </div>
      </div>

      {/* 2. History / Timeline Section */}
      <div className="relative py-32 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            
            {/* Background Building Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="w-full h-full"
                >
                    <img 
                     src="/building.avif" 
                     alt="FN solution Building" 
                     className="w-full h-full object-cover grayscale opacity-70"
                   />
                </motion.div>
                {/* Lighter Gradient Overlay for Better Image Visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-white/95"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h3 className="text-3xl font-bold tracking-tight uppercase">History of FN solution</h3>
                    <div className="w-12 h-1 bg-black mx-auto mt-6"></div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Center Line */}
                    <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gray-300 transform lg:-translate-x-1/2"></div>

                    {historyData.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative flex flex-col lg:flex-row items-stretch justify-between mb-24 last:mb-0 w-full"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-black border-4 border-white shadow-lg transform -translate-x-1/2 mt-2 lg:mt-0 lg:top-1/2 lg:-translate-y-1/2 z-10"></div>

                            {/* Mobile Layout (Visible only on small screens) */}
                            <div className="lg:hidden w-full pl-24 flex flex-col pb-8 pt-1">
                                <span className="text-5xl font-bold text-gray-800 font-sans mb-2 tracking-tighter block">{item.year}</span>
                                {item.events ? (
                                    <div className="flex flex-col gap-6 mt-1">
                                        {item.events.map((event, i) => (
                                            <div key={i}>
                                                <h4 className="text-xl font-bold text-black mb-3 break-keep">{event.title}</h4>
                                                {event.description && <p className="text-gray-800 text-sm font-medium leading-relaxed break-keep">{event.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <h4 className="text-xl font-bold text-black mb-3 break-keep">{item.title}</h4>
                                        {item.description && <p className="text-gray-800 text-sm font-medium leading-relaxed break-keep">{item.description}</p>}
                                    </>
                                )}
                            </div>

                            {/* Desktop Left Content (Visible only on even indexes) */}
                            <div className="hidden lg:flex w-[45%] pr-16 text-right flex-col items-end justify-center">
                                {index % 2 === 0 && (
                                    <>
                                        <span className="text-6xl font-bold text-gray-800 font-sans mb-4 tracking-tighter block">{item.year}</span>
                                        {item.events ? (
                                            <div className="flex flex-col gap-6 items-end mt-2">
                                                {item.events.map((event, i) => (
                                                    <div key={i} className="flex flex-col items-end">
                                                        <h4 className="text-2xl font-bold text-black mb-3 break-keep">{event.title}</h4>
                                                        {event.description && <p className="text-gray-800 font-medium leading-relaxed break-keep">{event.description}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <h4 className="text-2xl font-bold text-black mb-3 break-keep">{item.title}</h4>
                                                {item.description && <p className="text-gray-800 font-medium leading-relaxed break-keep">{item.description}</p>}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            
                            {/* Desktop Center Gap (10% width) */}
                            <div className="hidden lg:block lg:w-[10%] shrink-0"></div>

                            {/* Desktop Right Content (Visible only on odd indexes) */}
                            <div className="hidden lg:flex w-[45%] pl-16 text-left flex-col items-start justify-center">
                                {index % 2 !== 0 && (
                                    <>
                                        <span className="text-6xl font-bold text-gray-800 font-sans mb-4 tracking-tighter block">{item.year}</span>
                                        {item.events ? (
                                            <div className="flex flex-col gap-6 items-start mt-2">
                                                {item.events.map((event, i) => (
                                                    <div key={i} className="flex flex-col items-start">
                                                        <h4 className="text-2xl font-bold text-black mb-3 break-keep">{event.title}</h4>
                                                        {event.description && <p className="text-gray-800 font-medium leading-relaxed break-keep">{event.description}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <h4 className="text-2xl font-bold text-black mb-3 break-keep">{item.title}</h4>
                                                {item.description && <p className="text-gray-800 font-medium leading-relaxed break-keep">{item.description}</p>}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

      {/* RE-ADD THE ENDING TAGS CORRECTLY IF NEEDED, BUT JUST REMOVING THE EXTRA DIV IS LIKELY THE FIX */}
      {/* Actually, line 187 is closing the `div` from line 61 that wrapped the OLD grid. 
          But since we replaced the top section with a new full-width text-white section (lines 64-123), 
          we need to make sure the nesting is correct.
          
          However, looking at the previous patch:
          The previous patch replaced the TOP part of the component but left the BOTTOM part (History).
          The BOTTOM part (History) starts at line 125 (in the NEW file) or so.
          
          The error is likely that I closed the main `section` too early or have an extra div.
          
          Let's just look at lines 185-190.
          185 is closing the `div` for the History section mask?
          187 is closing... what?
          
          Let's just remove 187 if it has no opener.
          
          Wait, the history section is:
          <div className="relative py-32 ..."> (Line 125 approx)
             ...
          </div> (Line 185)
          
          And the `StatsBoard` returns:
          <section ...> (Line 61)
             <div ...> (Stats Section - lines 64-123) </div>
             <div ...> (History Section - lines 125-185) </div>
          </section> (Line 188)
          
          So we need to make sure there isn't an extra div.
          
          The `view_file` shows:
          185:         </div>
          186: 
          187:       </div>
          188:     </section>
          
          If line 185 closes the History Section div, then line 187 closes... ? 
          The History section is a direct child of `section` now?
          
          In the previous `StatsBoard`:
          <section>
             <div className="max-w-7xl relative z-10"> (Opened at start)
                <Headline />
                <StatsGrid />
                <HistorySection />
             </div>
          </section>
          
          BUT in my last edit, I replaced the top part.
          I replaced `max-w-7xl ...` (line 67) with `div className="relative w-full py-32..."`.
          This new div CLOSES itself at line 123.
          
          So now we have:
          <section>
             <div (Stats) ...> ... </div>
             <div (History) ...> ... </div>
             </div> (Line 187 - THIS IS THE EXTRA ONE FROM THE OLD `max-w-7xl` wrapper)
          </section>
          
          So yes, I need to remove line 187.
      */}
    </section>
  );
}
