"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
        if (!id) return;
        try {
            const docRef = doc(db, "news", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setNews({ id: docSnap.id, ...docSnap.data() });
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchNews();
  }, [id]);

  if (loading) {
      return <div className="min-h-screen bg-white flex items-center justify-center font-bold">Loading...</div>;
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link href="/news" className="text-[#ff3333] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#ff3333] selection:text-white">
      {/* Dynamic HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end justify-start overflow-hidden bg-black pb-20 pt-32">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Blurred Background Layer to fill empty space */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl"
            style={{ backgroundImage: `url('${news.image}')` }}
          />
          {/* Actual Contained Image */}
          <img 
            src={news.image} 
            alt={news.title} 
            className="relative w-full h-full object-contain z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
        </motion.div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-xs font-bold tracking-widest text-white uppercase mb-6 backdrop-blur-sm">
              {news.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {news.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 text-sm font-medium tracking-widest uppercase">
              <span>{news.date.replace(/\./g, " / ")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-white py-20 px-6 md:px-0">
        <div className="w-full max-w-4xl mx-auto">
          
          <motion.div 
            className="prose prose-lg prose-gray max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed mb-12 italic border-l-4 border-[#ff3333] pl-6 py-2">
              {news.desc}
            </p>
            
            <div className="text-gray-800 leading-loose space-y-8">
              {/* If actual content formatting exists, it would be injected here.  */}
              <p className="whitespace-pre-wrap">
                {news.content || "상세 내용이 준비 중입니다."}
              </p>
              
              <p>
                에프앤솔루션은 앞으로도 기업의 가치 창출과 혁신 성장을 위해서 최고의 전문성과 맞춤형 솔루션을 지원할 것을 약속드립니다. 변화하는 환경 속에서 항상 고객의 입장에 서서 생각하며, 더 나은 내일을 만들어 나가는 든든한 파트너가 되겠습니다.
              </p>

              <p>
                자세한 사항이나 상담이 필요하신 경우 당사의 고객센터 혹은 컨설팅 문의 페이지를 통해 문의를 남겨주시면, 담당 전문가가 친절하게 안내해 드리겠습니다.
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-200 my-16"></div>

          {/* BACK TO NEWS BUTTON */}
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/news" 
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black hover:text-[#ff3333] transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#ff3333] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              Back to List
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
