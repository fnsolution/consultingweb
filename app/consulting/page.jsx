"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

function TabUpdater({ setActiveTab }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (tab && ['build', 'grow', 'protect'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [tab, setActiveTab]);

  return null;
}

export default function ConsultingPage() {
  const [activeTab, setActiveTab] = useState("build");

  const sections = [
    {
      id: "build",
      title: "역량강화",
      subtitle: "역량강화",
      description: "기업 인증 및 운영 시스템 구축",
      items: [
        "지식재산권",
        "기업부설연구소/전담부서",
        "벤처기업 확인",
        "이노비즈 인증",
        "메인비즈 인증",
        "ISO 인증",
        "정관/취업규칙 컨설팅",
        "인사/노무 컨설팅",
        "구조개선 컨설팅",
      ]
    },
    {
      id: "grow",
      title: "성장지원",
      subtitle: "성장지원",
      description: "기업 성장 및 자본 조달 전략",
      items: [
        "정부지원 정책자금",
        "정부지원 보증/융자",
        "정부지원 시설융자",
        "지역별 특별자금",
        "창업지원 융자",
        "R&D지원 컨설팅",
        "사업화지원 컨설팅",
        "바우처지원 컨설팅",
        "창업지원 컨설팅",
        "소상공인지원 컨설팅",
      ]
    },
    {
      id: "protect",
      title: "자산관리",
      subtitle: "자산관리",
      description: "재무 최적화 및 자산 승계 관리",
      items: [
        "기업 재무/회계 컨설팅",
        "보장자산 컨설팅",
        "은퇴자산 컨설팅",
        "투자자산 컨설팅",
        "가업승계 컨설팅",
        "상속/증여 컨설팅",
        "법인세/종합소득세 컨설팅",
        "가지급금 해결",
        "미처분이익잉여금 해결",
      ]
    }
  ];

  const activeSection = sections.find(s => s.id === activeTab);

  return (
    <div className="bg-white min-h-screen text-black font-sans">
      <Suspense fallback={null}>
        <TabUpdater setActiveTab={setActiveTab} />
      </Suspense>
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
             <img 
                src="https://static.wixstatic.com/media/06807f543ae74ede885ea9d5f2c32ac0.jpg/v1/crop/x_0,y_207,w_3500,h_1920/fill/w_3500,h_824,al_c,q_90,enc_avif,quality_auto/%ED%98%84%EB%8C%80%20%EA%B5%AC%EC%A1%B0%20.jpg" 
                alt="Consulting Hero" 
                className="w-full h-full object-cover opacity-80 grayscale-[10%]"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center mt-6 md:mt-12">
            <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                CONSULTING<span className="text-[#ff3333]">.</span>
            </motion.h1>
             <motion.div 
                className="mt-6 w-16 h-1 bg-[#ff3333] mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
        </div>
      </section>

      {/* Consulting Sections with Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center border-b border-gray-200 mb-16 gap-4 sm:gap-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`
                pb-4 px-2 text-2xl md:text-3xl font-black transition-all relative
                ${activeTab === section.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'}
              `}
            >
              {section.title}
              {activeTab === section.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-black"
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                  {activeSection.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-[#ff3333] font-medium tracking-wide">
                  {activeSection.description}
                </p>
              </div>

              {/* Compact Grid List */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-20">
                {activeSection.items.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                    className="bg-gray-50 border border-gray-100 hover:border-black hover:bg-black group px-4 py-8 flex items-center justify-center text-center transition-all duration-300"
                  >
                    <span className="text-sm md:text-base font-bold text-gray-800 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Contact CTA Button - Matching Hero Section Main Contact Style */}
              <div className="w-full flex justify-center border-t border-gray-100 pt-16 mt-auto">
                 <Link href="/contact" className="w-full sm:w-auto">
                   {/* Styled precisely like the hero contact button but adapted for light mode */}
                   <button className="bg-black text-white px-10 py-4 text-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group w-full">
                     상담신청
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </button>
                 </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
