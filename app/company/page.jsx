"use client";

import { motion } from "framer-motion";

export default function CompanyPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const philosophyItems = [
    { title: "고객 이익 최우선", desc: "고객의 이익이 최우선이라는 신념으로\n의사결정의 기준을 항상 고객에게 둡니다." },
    { title: "생애주기 자금 관리", desc: "고객이 생애주기에 맞춰 돈이 필요할 때\n부족함이 없도록 체계적인 설계를 지원합니다." },
    { title: "나눔과 봉사", desc: "단순 수익 창출을 넘어 사회적 책임을 다하며\n나눔과 봉사정신을 함께 실현합니다." },
    { title: "최고의 신뢰", desc: "가장 신뢰받고 믿음직한 최고의\n자산관리 회사가 되는 것을 목표로 합니다." }
  ];

  const cultureItems = [
    { title: "신용의 문화", desc: "신용은 한 번 잃으면 되돌릴 수 없습니다." },
    { title: "자산관리 전문성", desc: "전 분야에 능통한 전문가를 지향합니다." },
    { title: "주도적 조직문화", desc: "스스로 책임 있는 리더로 성장합니다." },
    { title: "기업경영 컨설팅", desc: "차별화된 컨설팅 노하우를 제공합니다." },
    { title: "R&D 중시", desc: "끊임없이 연구하고 학습하는 문화" },
    { title: "상호작용", desc: "서로 통하고 배우며 시너지를 창출합니다." },
    { title: "수평적 소통", desc: "직급을 허무는 원활하고 자유로운 소통" },
    { title: "수직적 책임", desc: "결정에 대한 책임은 리더가 집니다." },
    { title: "자유로운 소통", desc: "자유로운 담화는 우리의 강력한 경쟁력입니다." },
    { title: "분석과 해결", desc: "근본적인 원인을 분석하고 해결책을 도출합니다." },
    { title: "센스있는 태도", desc: "상황에 맞는 유연하고 센스 있는 행동" },
    { title: "밝은 인사", desc: "미소 띈 밝은 인사가 상호 존중의 시작입니다." },
    { title: "정중한 메시지", desc: "감정과 예의가 담긴 정중한 소통 방식" },
    { title: "결단력", desc: "명확하고 단호한 태도로 조직과 함께합니다." },
  ];

  return (
    <div className="font-sans bg-white pb-0">
      
      {/* 1. Hero & CEO Message Section (Black Background) */}
      <section className="bg-[#0a0a0a] text-white pt-32 pb-32">
        {/* Hero Title */}
        <div className="text-center mb-12">
            <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                ABOUT US
            </motion.h1>
        </div>

        {/* Hero Image (Flush full width, NO gradient blur) */}
        <motion.div 
            className="w-full h-[30vh] md:h-[45vh] min-h-[300px] mb-32 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
             <img 
                src="https://static.wixstatic.com/media/06807f543ae74ede885ea9d5f2c32ac0.jpg/v1/crop/x_0,y_207,w_3500,h_1920/fill/w_3500,h_824,al_c,q_90,enc_avif,quality_auto/%ED%98%84%EB%8C%80%20%EA%B5%AC%EC%A1%B0%20.jpg" 
                alt="Company Architecture Hero" 
                className="w-full h-full object-cover opacity-100"
             />
        </motion.div>

        {/* CEO Message Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
             <motion.h2 
                 className="text-3xl md:text-4xl font-black mb-12 tracking-wide uppercase"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
             >
               CEO MESSAGE<span className="text-[#ff3333]">.</span>
             </motion.h2>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                
                {/* Left Side: CEO Profile */}
                <motion.div 
                   className="lg:col-span-6 flex flex-col items-start w-full"
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                >
                   <div className="w-full aspect-[3/4] lg:aspect-[2/3] overflow-hidden mb-6 bg-gray-900 border border-white/10 shadow-2xl relative group">
                      <img 
                          src="/증명사진_대표님.png" 
                          alt="CEO Ahn Tae Gun" 
                          className="w-full h-full object-contain" 
                      />
                   </div>
                   <div className="w-full flex flex-col pt-4 border-t border-white/20">
                         <h3 className="text-xl md:text-2xl font-bold mt-2 text-white flex flex-col gap-1">
                            <span className="text-gray-400 text-sm md:text-base font-medium">(주)에프앤솔루션</span> 
                            <span className="tracking-widest">대표이사 안 태 건</span>
                         </h3>
                   </div>
                </motion.div>

                {/* Right Side: Message Text */}
                <motion.div 
                   className="lg:col-span-6 space-y-10"
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                >                  
                  <div className="text-gray-300 leading-relaxed md:leading-[1.9] space-y-6 text-[15px] font-light md:text-[16px] xl:text-[17px] tracking-wide break-keep">
                    <p>
                      당사는 <strong className="text-white font-medium">선진화된 재무 설계</strong>를 통한 사회 기여를 설립 목적으로 하며 일관된 <strong className="text-white font-medium">자율성과 상호 배려</strong> 속에서 인간존중의 가치를 실현하고자 합니다. 당사는 개인 및 중소기업에게 종합 컨설팅을 제공하고 있으며, 개인 재무설계 및 은퇴설계, 기업 재무 설계 및 위험 설계를 통한 <strong className="text-white font-medium">사회의 안전성 향상과 지속 가능한 상호 발전</strong>을 중점으로 하고 있습니다.
                    </p>
                    <p>
                      당사는 자산관리전문가들이 상품판매만을 목적에 두지 않고 <strong className="text-white font-medium">엄선된 정보와 객관적인 사실</strong>에 기초하여 고객님의 특별한 개별상황에 맞추어 포트폴리오 <strong className="text-white font-medium">수정, 계획, 실행, 모니터링</strong>에 도움을 드릴 것입니다.
                    </p>
                    <p>
                      이러한 자산관리시스템은 미국과 유럽 등 금융선진국들은 이미 십수년전부터 진행되어온 금융선진시스템이며 우리나라도 점차 확산될 것으로 기대되고 있습니다.
                    </p>
                    <p>
                      자산관리의 필요성은 현재 그 중요성이 어느 때보다 대두되고 있습니다. 저금리의 지속과 정보의 홍수속, 고세율 정책에서 자산을 지키기가 점점 어려워지고 있기 때문입니다. 특히 금융정보가 쏟아져 나오는 정보홍수의 시대에 <strong className="text-white font-medium">전문지식 없는 투자는 결국 고객님들의 자산손실</strong>을 불러오고 있습니다. 당사는 고객별 성향에 따른 맞춤식 재무설계로 고객님의 <strong className="text-white font-medium">목적자금을 달성</strong>하는데 큰 기여를 할 것입니다.
                    </p>
                    <p>
                      현재 당사는 고객과 임직원분들을 돕는 자산관리회사로서 힘찬 도약을 하고 있습니다. 뉴 노멀로 불리는 장기 저성장 시대의 문턱에서 <strong className="text-white font-medium">리스크 매니지먼트와 과감한 도전</strong>을 통해 새로운 성장 기회를 찾아가고 있습니다.
                    </p>
                    <p className="pt-4 text-white font-medium text-lg">
                      앞으로도 최선을 다하는 기업으로서 고객의 성공과 행복한 미래를 지원하겠습니다.
                    </p>
                    <p className="pt-2 text-white">
                      감사합니다.
                    </p>
                  </div>
                </motion.div>
             </div>
        </div>
      </section>

      {/* 2. Philosophy Section (Parallax Background Image & Left/Right Layout) */}
      <section className="relative py-32 lg:py-40 overflow-hidden flex items-start bg-black">
         {/* Parallax Background Image - NEW IMAGE FOR PHILOSOPHY (As requested) */}
         <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed grayscale-[10%]"
            style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
         ></div>
         {/* Darkened Overlay to ensure text readability */}
         <div className="absolute inset-0 bg-black/70"></div>

         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">
               
               {/* Left: Titles with Slogan */}
               <motion.div 
                 className="lg:-mt-16"
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
               >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-tight break-keep">
                    금융보국<br/>
                    <span className="text-gray-200 font-black text-4xl md:text-5xl lg:text-6xl block mt-4 tracking-widest">(金融報國)</span>
                  </h2>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-100 break-keep leading-snug mt-12">
                    금융으로 국가와<br/>국민에게 기여한다<span className="text-[#ff3333] font-black">.</span>
                  </p>
               </motion.div>

               {/* Right: Philosophy Details */}
               <motion.div 
                 className="space-y-12 lg:pl-16 lg:mt-64"
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.3 }}
               >
                  {philosophyItems.map((item, idx) => (
                     <div key={idx} className="flex flex-col gap-2 group">
                        <h3 className="text-xl font-bold text-white">
                           {item.title}
                        </h3>
                        <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed whitespace-pre-line">
                           {item.desc}
                        </p>
                     </div>
                  ))}
               </motion.div>
            </div>
         </div>
      </section>

      {/* 3. Corporate Culture Section (Ultra Compact Text Layout) */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <motion.div className="mb-12 text-center" {...fadeIn}>
               <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-black uppercase">
                 Corporate Culture<span className="text-[#ff3333]">.</span>
               </h2>
               <p className="text-sm text-gray-500 font-light mt-2">에프앤솔루션 구성원들의 14가지 핵심 가치</p>
            </motion.div>

            {/* Ultra Compact Grid: No backgrounds, tight spacing, text focused */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-8">
              {cultureItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                >
                   <span className="text-[#ff3333] font-black text-2xl leading-none mt-1">
                     {(idx + 1).toString().padStart(2, '0')}
                   </span>
                   <div className="flex flex-col">
                       <h3 className="text-[15px] font-bold text-black mb-1 break-keep">{item.title}</h3>
                       <p className="text-gray-500 text-[13px] leading-relaxed font-light break-keep">
                         {item.desc}
                       </p>
                   </div>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* 4. Bottom Quote Section (Dark Background with Image) */}
      <section className="relative py-48 overflow-hidden bg-black flex items-center justify-center text-center">
        {/* Background Image - 항공뷰.png */}
        <div className="absolute inset-0 pointer-events-none">
            <img 
               src="/항공뷰1.png"
               alt="Background resilience"
               className="w-full h-full object-cover grayscale-[10%] opacity-70"
            />
        </div>
        {/* Simple dark overlay to ensure text stands out slightly over the image */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <motion.div 
          className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
           <div className="w-12 h-1 bg-[#ff3333] mx-auto mb-16 shadow-[0_0_15px_rgba(255,51,51,0.5)]"></div>
           <p className="text-3xl md:text-5xl font-light text-white leading-[1.6] break-keep">
              "사업은 망해도 다시 일어설 수 있지만<br/> 
              <span className="text-white font-black mt-6 block tracking-wide">신용은 잃으면 다시 일어날 수 없다."</span>
           </p>
        </motion.div>
      </section>

    </div>
  );
}
