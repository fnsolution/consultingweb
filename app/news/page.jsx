"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const categories = ["FN 공지", "추천사이트", "CEO 추천도서"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("FN 공지");
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllNews(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredNews = allNews.filter(item => item.category === selectedCategory);

  if (loading) {
      return <div className="min-h-screen bg-white flex items-center justify-center font-bold">Loading...</div>;
  }

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
                INFO<span className="text-[#ff3333]">.</span>
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
        <div className="w-full max-w-5xl mx-auto px-6 md:px-0 flex flex-col gap-16 md:gap-[1px]">
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
            {/* Image Section - Fixed Aspect Ratio (16:9) to prevent vertical stretching */}
            <Link href={`/news/${news.id}`} className="w-full md:w-7/12 relative aspect-[16/9] md:aspect-auto overflow-hidden block bg-gray-100">
                <img 
                    src={news.image} 
                    alt={news.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                 {/* Mobile Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </Link>

            {/* Content Section - Narrower (5/12) */}
            <div className="w-full md:w-5/12 flex flex-col justify-center items-start text-left p-8 md:p-12 bg-white relative z-10">
                
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">
                    {news.date.replace(/\./g, " / ")}
                </span>

                <Link href={`/news/${news.id}`}>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4 text-black group-hover:text-[#ff3333] transition-colors duration-300">
                        {news.title}
                    </h3>
                </Link>
                
                <div className="w-8 h-[2px] bg-black mb-4 group-hover:w-16 group-hover:bg-[#ff3333] transition-all duration-500"></div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.desc}
                </p>

                <div className="mt-auto">
                    <Link href={`/news/${news.id}`} className="inline-flex cursor-pointer items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black border-b border-transparent group-hover:border-black transition-all duration-300">
                        Read Story
                        <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
