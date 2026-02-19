"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Mock Data
const allNews = [
  {
    id: 1,
    category: "Press Release",
    title: "에프앤솔루션, 2025년 중소기업 경영컨설팅 우수기업 선정",
    date: "2025.10.24",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    desc: "당사는 중소벤처기업부가 주관하는 2025년 경영컨설팅 우수기업으로 선정되어 그 성과를 인정받았습니다. 이번 선정은 지속적인 혁신과 고객 만족을 위한 노력의 결실입니다."
  },
  {
    id: 2,
    category: "Success Stories",
    title: "A제조업체, 기업부설연구소 설립 후 법인세 25% 절감 성공",
    date: "2025.09.15",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop",
    desc: "체계적인 R&D 기획과 연구소 설립을 통해 세제 혜택과 기술 경쟁력을 동시에 확보한 성공 사례입니다. 맞춤형 컨설팅을 통해 기업의 잠재력을 극대화했습니다."
  },
  {
    id: 3,
    category: "Insights",
    title: "2026년 개정 세법, CEO가 반드시 알아야 할 5가지 포인트",
    date: "2025.08.30",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    desc: "내년부터 변경되는 주요 세법 이슈와 이에 대한 기업의 대응 전략을 심층 분석했습니다. 변화하는 환경 속에서 기업의 지속 가능한 성장을 위한 필수 가이드입니다."
  },
  {
    id: 4,
    category: "Press Release",
    title: "글로벌 투자 전략 세미나 성황리 개최",
    date: "2025.08.12",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop",
    desc: "불확실한 시장 환경 속에서의 자산 관리 전략을 주제로 한 세미나가 많은 관심 속에 마무리되었습니다. 전문가들의 인사이트를 통해 투자 방향성을 제시했습니다."
  },
  {
    id: 5,
    category: "Success Stories",
    title: "B유통사, 가업승계 증여세 과세특례 활용 솔루션",
    date: "2025.07.20",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop",
    desc: "복잡한 가업승계 절차를 사전에 준비하여 세금 부담을 최소화하고 안정적인 경영 승계를 지원했습니다. 100년 기업으로 나아가기 위한 초석을 다졌습니다."
  },
  {
    id: 6,
    category: "Insights",
    title: "ESG 경영 도입, 선택이 아닌 필수",
    date: "2025.06.05",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop",
    desc: "중소기업도 피해갈 수 없는 ESG 경영 트렌드와 실질적인 도입 방안에 대해 알아봅니다. 지속 가능한 미래를 위한 기업의 책임과 기회를 모색합니다."
  }
];

const categories = ["All", "Press Release", "Success Stories", "Insights"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews = selectedCategory === "All" 
    ? allNews 
    : allNews.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop" 
                alt="News Hero" 
                className="w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center">
            <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                NEWSROOM<span className="text-[#ff3333]">.</span>
            </motion.h1>
             <motion.div 
                className="mt-6 w-16 h-1 bg-[#ff3333] mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-white">
        
        {/* Categories Tab */}
        <div className="flex flex-wrap justify-center gap-4 py-20">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                        selectedCategory === cat 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* News List - Zigzag Layout */}
        <div className="w-full max-w-5xl mx-auto px-6 md:px-0 flex flex-col gap-[1px]">
            <AnimatePresence mode="wait">
                {filteredNews.map((news, index) => (
                    <NewsRow key={news.id} news={news} index={index} />
                ))}
            </AnimatePresence>
        </div>

        {/* Load More Button (Placeholder) */}
        <div className="py-16 text-center">
             <button className="cursor-pointer inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-1">
                Load More
             </button>
        </div>

      </section>

    </div>
  );
}

function NewsRow({ news, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row w-full min-h-[350px] overflow-hidden group ${
                isEven ? "" : "md:flex-row-reverse"
            }`}
        >
            {/* Image Section - Wider (7/12) */}
            <div className="w-full md:w-7/12 relative h-[300px] md:h-auto overflow-hidden">
                <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                 {/* Mobile Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>

            {/* Content Section - Narrower (5/12) */}
            <div className="w-full md:w-5/12 flex flex-col justify-center items-start text-left p-8 md:p-12 bg-white relative z-10">
                
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">
                    {news.date.replace(/\./g, " / ")}
                </span>

                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4 text-black group-hover:text-[#ff3333] transition-colors duration-300">
                    {news.title}
                </h3>
                
                <div className="w-8 h-[2px] bg-black mb-4 group-hover:w-16 group-hover:bg-[#ff3333] transition-all duration-500"></div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.desc}
                </p>

                <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black border-b border-transparent group-hover:border-black transition-all duration-300">
                        Read Story
                        <ArrowUpRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
