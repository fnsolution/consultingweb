"use client";

import { motion } from "framer-motion";

export default function CompanyPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-black min-h-screen font-sans">
      
      {/* 1. CEO Greeting - Black Background Section */}
      <section className="relative py-32 bg-black text-white overflow-hidden text-center md:text-left">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Image Side */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border border-white/10">
                        <img 
                            src="/증명사진_대표님.png" 
                            alt="CEO Ahn Tae Gun" 
                            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                        />
                        
                        <div className="absolute bottom-8 left-8 text-white drop-shadow-md">
                            <h3 className="text-3xl font-bold">안 태 건</h3>
                            <p className="text-gray-300 text-sm tracking-widest mt-1 uppercase">CEO & Founder</p>
                        </div>
                    </div>
                </motion.div>

                {/* Text Side - White Text on Black Background */}
                <motion.div className="space-y-8" {...fadeIn}>
                    <div>
                        <span className="text-[#ff3333] font-bold tracking-widest text-xs uppercase mb-2 block">CEO Message</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            신뢰와 전문성으로<br/> 
                            <span className="text-gray-500">고객의 미래를 설계합니다.</span>
                        </h2>
                    </div>
                    
                    <div className="text-gray-400 leading-loose space-y-6 text-lg">
                        <p>
                            안녕하십니까? 당사에 관심을 가져주셔서 진심으로 감사드립니다.
                        </p>
                        <p>
                            당사는 <strong className="text-white font-medium">선진화된 재무 설계</strong>를 통한 사회 기여를 설립 목적으로 하며, 
                            자율성과 상호 배려 속에서 인간존중의 가치를 실현하고자 합니다. 
                            개인 및 중소기업에게 종합 컨설팅을 제공하며, 사회의 안전성 향상과 지속 가능한 상호 발전을 중점으로 하고 있습니다.
                        </p>
                        <p>
                            저금리의 지속과 정보의 홍수 속에서 자산을 지키기가 점점 어려워지고 있습니다. 
                            전문지식 없는 투자는 결국 자산 손실을 불러옵니다. 당사는 엄선된 정보와 객관적인 사실에 기초하여 
                            고객님의 상황에 맞춘 체계적인 솔루션을 제공하겠습니다.
                        </p>
                        <p>
                             뉴 노멀 시대의 리스크 매니지먼트와 과감한 도전을 통해 새로운 성장 기회를 찾아가겠습니다.
                             고객 여러분의 성공과 행복한 미래를 끝까지 지원하는 든든한 파트너가 되겠습니다.
                        </p>
                    </div>

                    <div className="pt-8 flex items-center gap-4 justify-center md:justify-start">
                        <span className="text-sm text-gray-500 tracking-widest uppercase font-bold">FN solution Co., Ltd.</span>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 2. Philosophy Section - Parallax Background */}
      <section className="relative py-32 overflow-hidden text-white">
        {/* Parallax Background */}
        <div 
            className="absolute inset-0 bg-cover bg-fixed bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop')" }}
        >
            {/* Reduced overlay opacity (80% -> 50%) */}
            <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <motion.div className="mb-20 text-center" {...fadeIn}>
                <span className="text-[#ff3333] font-bold tracking-widest text-sm uppercase">Our Philosophy</span>
                <h2 className="text-5xl md:text-6xl font-bold mt-4">금융보국 <span className="text-2xl text-gray-300 font-light ml-2">金融報國</span></h2>
                <p className="mt-6 text-xl text-gray-200 font-light">‘금융으로 국가와 국민에게 기여한다’</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
                 {/* Main Value Box */}
                 <motion.div 
                    className="md:col-span-2 md:row-span-2 bg-black/60 backdrop-blur-md border border-white/20 p-12 flex flex-col justify-between group hover:bg-black/70 transition-all duration-300 rounded-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                 >
                    <div>
                        <span className="text-7xl font-bold text-white/10 absolute top-8 right-8">01</span>
                        <h3 className="text-3xl font-bold text-white mt-2 relative z-10">고객 이익 최우선</h3>
                        <p className="mt-6 text-gray-300 leading-relaxed text-lg relative z-10">
                            회사는 고객에게 맞춤별 자산관리와 경영컨설팅으로 최선의 이익을 달성하도록 돕습니다.
                            <br/><br/>
                            고객의 이익이 곧 회사의 이익이라는 신념으로, 모든 의사결정의 기준을 고객에게 둡니다.
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mt-8 self-end transition-transform duration-500 group-hover:rotate-45 text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                 </motion.div>

                 {/* Value 2 */}
                 <motion.div 
                    className="md:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 p-10 flex flex-col justify-center hover:bg-white/20 transition-all duration-300 rounded-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                 >
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">생애주기 자금 관리</h3>
                        <span className="text-4xl font-bold text-white/30">02</span>
                     </div>
                     <p className="text-gray-200">회사는 고객이 생애주기에 맞춰 돈이 필요할 때 돈이 부족하지 않도록 체계적인 설계를 지원합니다.</p>
                 </motion.div>

                 {/* Value 3 */}
                 <motion.div 
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-10 flex flex-col justify-center hover:bg-white/20 transition-all duration-300 rounded-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                 >
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">나눔과 봉사</h3>
                        <span className="text-4xl font-bold text-white/30">03</span>
                     </div>
                     <p className="text-gray-200">회사는 사회적 책임을 다하며 나눔과 봉사정신을 실현합니다.</p>
                 </motion.div>

                 {/* Value 4 - Highlight */}
                 <motion.div 
                    className="bg-[#ff3333] p-10 flex flex-col justify-center hover:bg-[#e62e2e] transition-colors duration-300 rounded-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                 >
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">최고의 신뢰</h3>
                        <span className="text-4xl font-bold text-white/30">04</span>
                     </div>
                     <p className="text-white/90">우리나라에서 가장 신뢰받고 믿음직한 최고의 자산관리 회사가 되는 것을 목표로 합니다.</p>
                 </motion.div>
            </div>
        </div>
      </section>

      {/* 3. Corporate Culture - White Background */}
      <section className="relative py-32 bg-white text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <motion.div className="mb-20" {...fadeIn}>
                 <h2 className="text-4xl font-bold mb-6 text-black">Corporate Culture</h2>
                 <p className="text-xl text-gray-600 max-w-2xl">
                    에프앤솔루션 구성원들은 14가지의 핵심 가치를 공유하며 함께 성장합니다.
                 </p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                {[
                    { title: "신용의 문화", desc: "약속 시간 준수는 기본이며, 신용은 한 번 잃으면 되돌릴 수 없습니다." },
                    { title: "자산관리 전문성", desc: "재무, 세금, 보험, 은퇴, 투자 등 전 분야에 능통한 전문가를 지향합니다." },
                    { title: "주도적 조직문화", desc: "자신만의 조직을 자유롭게 구축하며 책임 있는 리더로 성장합니다." },
                    { title: "기업경영 컨설팅", desc: "실무 이론과 정책 자금에 대한 깊은 이해로 차별화된 노하우를 제공합니다." },
                    { title: "R&D 중시", desc: "현실에 안주하지 않고 끊임없이 연구하고 학습하는 문화를 지향합니다." },
                    { title: "상호작용", desc: "선후배 간 서로 가르치고 배우며 함께 성장하는 시너지를 만듭니다." },
                    { title: "수평적 소통", desc: "간단한 보고나 회의는 상급자가 하급자의 자리로 찾아가 이야기 나눕니다." },
                    { title: "수직적 책임", desc: "결정에 대한 책임은 실행한 사람이 아닌 결정한 리더가 집니다." },
                    { title: "자유로운 소통", desc: "동료에게 피해를 주지 않는 선에서 자유로운 대화와 잡담은 경쟁력입니다." },
                    { title: "분석과 해결", desc: "활동량, 프로세스, 습관 순으로 근본적인 문제점을 분석하고 해결책을 찾습니다." },
                    { title: "센스있는 태도", desc: "눈치 보는 사람이 아닌, 상황에 맞게 센스 있게 행동하는 사람이 됩니다." },
                    { title: "밝은 인사", desc: "눈을 맞추고 미소를 띄며 인사하는 것이 서로에 대한 존중의 시작입니다." },
                    { title: "정중한 메시지", desc: "단답형이 아닌, 감정과 예의가 담긴 메시지로 오해 없는 소통을 합니다." },
                    { title: "결단력", desc: "이끌거나, 따르거나, 떠나거나! 명확한 태도로 조직과 함께합니다." },
                ].map((item, index) => (
                    <motion.div 
                        key={index} 
                        variants={itemFade} 
                        className="group bg-gray-50 border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 rounded-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                           <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ff3333]/10 text-[#ff3333] text-xs font-bold ring-1 ring-[#ff3333]/20">
                               {(index + 1).toString().padStart(2, '0')}
                           </span>
                           <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">{item.title}</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.div 
                className="mt-24 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                 <p className="text-2xl md:text-3xl font-bold italic text-gray-400">
                    "사업은 망해도 다시 일어설 수 있지만<br/> 
                    <span className="text-black not-italic font-black mt-2 block">신용은 잃으면 다시 일어날 수 없다."</span>
                 </p>
            </motion.div>
        </div>
      </section>

    </div>
  );
}
