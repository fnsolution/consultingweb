"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ChevronDown, Printer } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    region: "",
    industry: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const regions = ["본사", "대구지사", "광주1지사", "광주2지사", "당진지사"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await addDoc(collection(db, "inquiries"), {
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        region: formData.region,
        industry: formData.industry,
        name: formData.name,
        message: `[Contact Us 상담신청] 지역: ${formData.region} / 업종: ${formData.industry} / 성함: ${formData.name}`,
        firstName: "ContactUs",
        lastName: formData.name,
        createdAt: serverTimestamp(),
        status: "new",
        isRead: false
      });
      setStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", region: "", industry: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    }
  };
  return (
    <div className="font-sans relative bg-black">
      
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Global Contact Background" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
         />
         <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col">
        {/* HERO SECTION */}
        <section className="relative flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          
        <div className="relative z-10 text-center">
            <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                CONTACT US<span className="text-[#ff3333]">.</span>
            </motion.h1>
             <motion.div 
                className="mt-6 w-16 h-1 bg-[#ff3333] mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
        </div>
      </section>

      {/* SUBTLE DIVIDER */}
      <div className="w-full h-px bg-white/20"></div>

      {/* SPLIT LAYOUT SECTION */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto">
        
        {/* LEFT COLUMN: Contact Form (White) */}
        <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm flex flex-col justify-center px-6 md:px-12 py-12 md:py-16 order-2 lg:order-1">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight mb-2">
                        Send a Message
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                        전문가와의 상담이 필요하시다면 언제든 문의주세요.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">성함 *</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="홍길동"
                                className="w-full border-b border-gray-200 py-2 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">기업명 *</label>
                            <input 
                                type="text" 
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                placeholder="(주)기업명"
                                className="w-full border-b border-gray-200 py-2 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">이메일 *</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="example@email.com"
                                className="w-full border-b border-gray-200 py-2 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">연락처 *</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="010-0000-0000"
                                className="w-full border-b border-gray-200 py-2 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1 relative">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">지사 선택 *</label>
                            <div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full border-b py-3 text-lg cursor-pointer flex justify-between items-center transition-colors ${formData.region === "" ? "text-gray-400 border-gray-200" : "text-black border-black"} ${isDropdownOpen ? "border-black" : ""}`}
                            >
                                <span className="truncate">{formData.region || "지역(지사) 선택"}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? "rotate-180 text-black" : ""}`} />
                            </div>
                            
                            <AnimatePresence>
                               {isDropdownOpen && (
                                  <motion.div
                                     initial={{ opacity: 0, y: -5 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     exit={{ opacity: 0, y: -5 }}
                                     transition={{ duration: 0.2 }}
                                     className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto"
                                  >
                                     {regions.map((region) => (
                                        <div
                                           key={region}
                                           onClick={() => {
                                              setFormData(prev => ({ ...prev, region }));
                                              setIsDropdownOpen(false);
                                           }}
                                           className="px-5 py-3.5 text-black hover:bg-gray-100 cursor-pointer transition-colors"
                                        >
                                           {region}
                                        </div>
                                     ))}
                                  </motion.div>
                               )}
                            </AnimatePresence>
                            
                            {/* 필수 입력 처리를 위한 숨김 입력창 */}
                            <input 
                               type="text" 
                               name="region" 
                               value={formData.region}
                               onChange={handleChange}
                               required
                               className="opacity-0 absolute w-0 h-0 pointer-events-none"
                               tabIndex={-1}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">업종 *</label>
                            <input 
                                type="text" 
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                placeholder="IT, 제조, 서비스 등"
                                className="w-full border-b border-gray-200 py-2 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1 pt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">I agree to receive communications</label>
                            <input type="checkbox" className="accent-black w-3.5 h-3.5" required />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={status === "submitting"}
                        className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#ff3333] transition-colors duration-300 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto mt-2"
                    >
                        {status === "submitting" ? "Sending..." : "Submit"}
                    </button>

                    {status === "success" && (
                        <div className="p-4 bg-green-50 text-green-700 text-sm font-bold">
                            Thank you! Your message has been sent successfully.
                        </div>
                    )}
                    {status === "error" && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm font-bold">
                            Something went wrong. Please try again later.
                        </div>
                    )}
                </form>
            </motion.div>
        </div>

        {/* RIGHT COLUMN: Info & Image (Transparent Background) */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] order-1 lg:order-2 flex flex-col justify-end">
            
            {/* Content Overlay */}
            <motion.div 
                className="w-full flex flex-col justify-end p-8 md:p-16 text-white pb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="mb-10">
                    <h3 className="text-4xl font-extrabold mb-2 text-[#ff3333] tracking-tight">Seoul</h3>
                    <p className="text-2xl font-bold text-white">Headquarters</p>
                </div>

                <div className="space-y-8 text-xl font-medium text-gray-100">
                    <div className="flex items-start gap-6">
                        <MapPin className="w-6 h-6 mt-1 text-white" />
                        <p className="leading-relaxed drop-shadow-md">
                            서울특별시 금천구 가산디지털1로 145<br/>
                            에이스하이엔드타워3차 903호
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Phone className="w-6 h-6 text-white" />
                        <p className="drop-shadow-md">02-6746-0143</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Printer className="w-6 h-6 text-white" />
                        <p className="drop-shadow-md">02-6746-0190</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Mail className="w-6 h-6 text-white" />
                        <p className="drop-shadow-md">contact@fnsolution.com</p>
                    </div>
                </div>

                <div className="mt-16 pt-10 border-t border-white/30">
                    <a href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B8%88%EC%B2%9C%EA%B5%AC%20%EA%B0%80%EC%82%B0%EB%94%94%EC%A7%80%ED%84%B81%EB%A1%9C%20145" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-widest hover:text-[#ff3333] transition-colors group text-white">
                        <div className="p-2 border-2 border-white/50 rounded-full group-hover:border-[#ff3333] transition-colors">
                            <MapPin className="w-4 h-4" />
                        </div>
                        View Location on Map
                    </a>
                </div>
            </motion.div>
        </div>

      </div>
      </div>
    </div>
  );
}
