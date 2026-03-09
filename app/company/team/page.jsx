"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "안태건",
    role: "대표이사",
    englishName: "Ahn Tae Gun",
    image: "/증명사진_대표님.png",
    desc: "고객의 가치를 최우선으로 생각하는 경영 철학"
  },
  {
    name: "이민재",
    role: "본사본부장",
    englishName: "Lee Min Jae",
    image: "/증명사진_이민재.png",
    desc: "탁월한 리더십과 금융 전문성 보유"
  },
  {
    name: "전재영",
    role: "BS사업부장",
    englishName: "Jeon Jae Young",
    image: "/증명사진_전재영.png",
    desc: "고객 맞춤형 자산 관리 솔루션 제공"
  },
  {
    name: "장승호",
    role: "서울지사장",
    englishName: "Jang Seung Ho",
    image: "/증명사진_장승호.png",
    desc: "심도 있는 재무 분석 및 컨설팅"
  },
  {
    name: "심현용",
    role: "대구지사장",
    englishName: "Sim Hyun Yong",
    image: "/증명사진_심현용.png",
    desc: "신뢰를 바탕으로 한 지속적인 파트너십"
  },
  {
    name: "구미숙",
    role: "광주지사장",
    englishName: "Ku Mi Sook",
    image: "/증명사진_구미숙.png",
    desc: "최적화된 포트폴리오 전략 수립"
  },
  {
    name: "김수철",
    role: "광주지사장",
    englishName: "Kim Soo Chul",
    image: "/증명사진_김수철.png",
    desc: "고객 맞춤형 재무 솔루션 제공"
  },
    {
    name: "박요한",
    role: "팀장",
    englishName: "Park Yo Han",
    image: "/증명사진_박요한.png",
    desc: "개인 및 기업 맞춤형 재무 솔루션 제공"
  },
  {
    name: "김원우",
    role: "팀장",
    englishName: "Kim Won Woo",
    image: "/증명사진_김원우.jpeg",
    desc: "체계적인 위험 관리 및 자산 보호"
  },
  {
    name: "강지훈",
    role: "팀장",
    englishName: "Kang Ji Hoon",
    image: "/증명사진_강지훈.png",
    desc: "고객 생애주기 맞춤 재무 설계"
  },
  {
    name: "박규하",
    role: "팀장",
    englishName: "Park Kyu Ha",
    image: "/증명사진_박규하.jpeg",
    desc: "기업 및 개인 세무 컨설팅 전문"
  },
  {
    name: "조규상",
    role: "팀장",
    englishName: "Cho Kyu Sang",
    image: "/증명사진_조규상.jpeg",
    desc: "성공적인 자산 증식을 위한 비전 제시"
  },
  {
    name: "박상수",
    role: "팀장",
    englishName: "Park Sang Soo",
    image: "/증명사진_박상수.jpeg",
    desc: "안정적인 현금흐름 창출 전략 제공"
  },
];

export default function TeamPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-black">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" 
                alt="Team Hero" 
                className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center">
            <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                OUR TEAM<span className="text-[#ff3333]">.</span>
            </motion.h1>
             <motion.div 
                className="mt-6 w-16 h-1 bg-[#ff3333] mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Intro Text */}
        <div className="text-center mb-24">
             <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                각 분야 최고의 전문가들이 모여 고객의 성공을 위한<br className="hidden md:block"/> 최적의 솔루션을 제시합니다.
            </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {teamMembers.map((member, index) => (
                <TeamCard key={index} member={member} index={index} />
            ))}
        </div>

      </div>
    </div>
  );
}

function TeamCard({ member, index }) {
    return (
        <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Image Container - Clean & Sharp */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-103"
                />
                
                {/* Minimal Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
            </div>

            {/* Typography - Sensual & Modern */}
            <div className="space-y-1 relative px-2">
                <div className="flex justify-between items-baseline border-b border-gray-100 pb-4 group-hover:border-black transition-colors duration-500">
                    <h3 className="text-2xl font-bold font-serif text-gray-900">{member.name}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#ff3333] transition-colors">{member.role}</p>
                </div>
                
                <div className="pt-4 overflow-hidden">
                    <p className="text-gray-500 text-sm font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        {member.desc}
                    </p>
                    <p className="text-xs text-gray-300 mt-2 font-serif italic group-hover:text-gray-400 transition-colors">
                        {member.englishName}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
