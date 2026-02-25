"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Award, BookOpen, TrendingUp, Handshake } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthdate: "",
    region: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await addDoc(collection(db, "inquiries"), { // Storing in 'inquiries' for now based on previous pages
        ...formData,
        type: "career_application", // Mark as career application
        createdAt: serverTimestamp(),
        status: "new",
        isRead: false
      });
      setStatus("success");
      setFormData({ name: "", phone: "", birthdate: "", region: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    }
  };

  return (
    <div className="font-sans">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Career Hero" 
                className="w-full h-full object-cover opacity-70"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center">
            <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                CAREER<span className="text-[#ff3333]">.</span>
            </motion.h1>
             <motion.div 
                className="mt-6 w-16 h-1 bg-[#ff3333] mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
        </div>
      </section>

      {/* HR SYSTEM SECTION */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="text-center mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-sm font-bold tracking-[0.2em] text-[#ff3333] uppercase mb-4">HR System</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight mb-6">
                    에프앤솔루션 인사제도
                </h3>
            </motion.div>

            <div className="space-y-32">
                {/* Motivation & Comp */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="order-2 lg:order-1 flex flex-col justify-between py-2">
                        <div className="border-l-4 border-[#ff3333] pl-6 mb-10">
                            <h4 className="text-3xl font-bold text-black mb-5">동기부여 및 보상</h4>
                            <p className="text-gray-600 text-lg leading-relaxed break-keep">
                                FNsolution은 PB를 회사의 얼굴이자 첫번째 자산으로 여기며, 개인의 역량향상을 위해 적극적으로 지원하고 업무성과에 따라 공정하고 투명한 보상을 제공합니다.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-[1px] bg-gray-200 border border-gray-200 mt-auto">
                            <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                <TrendingUp className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep">능력위주 승진</h5>
                            </div>
                            <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                <Handshake className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep">안정적 수입</h5>
                            </div>
                            <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                <Award className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep">성과보상제</h5>
                            </div>
                            <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                <BookOpen className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep">멘토 오버라이드</h5>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-none overflow-hidden shadow-2xl h-full min-h-[400px] relative group order-1 lg:order-2">
                        <img 
                            src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop" 
                            alt="Motivation and Compensation"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </motion.div>

                {/* Education System */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="rounded-none overflow-hidden shadow-2xl h-full min-h-[400px] relative group">
                        <img 
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                            alt="Education System"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    
                    <div className="flex flex-col justify-between py-2 border-t border-b border-transparent">
                        <div className="border-l-4 border-black pl-6 mb-10 mt-4">
                            <h4 className="text-3xl font-bold text-black mb-5">교육제도</h4>
                            <p className="text-gray-600 text-lg leading-relaxed break-keep">
                                우리는 지속적이고 체계적인 교육을 통해 항상 준비된 인재를 등용합니다. 이를 통해 고객님에게로 하여금 바른 선택을 도와드리고 있습니다. 가장 앞선 정보를 나누어 드리고 그에 대응할 수 있는 방법을 알려드리는 것이 우리의 목표이고, 사명입니다.
                            </p>
                        </div>

                        <div className="bg-black text-white p-10 md:p-12 relative group rounded-none shadow-xl mt-auto">
                            <h5 className="text-2xl md:text-3xl font-bold text-white mb-5 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-[#ff3333] inline-block"></span> 전문인력 교육지원 시스템
                            </h5>
                            <p className="text-white text-lg leading-relaxed font-light break-keep">
                                FN solution은 금융권 지식을 습득하는 특별화된 과정별 교육으로 개개인의 전문성 강화 및 차별화된 교육 프로세스를 제공합니다.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* APPLICATION SECTION (Split Layout) */}
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        
        {/* LEFT COLUMN: Apply Form (White) */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center px-8 md:px-20 py-32 order-2 lg:order-1 border-t border-gray-200">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-black uppercase tracking-tight mb-4">
                        입사 지원하기
                    </h2>
                    <p className="text-gray-500">
                        에프앤솔루션과 함께 성장할 열정적인 인재를 기다립니다.
                    </p>
                </div>

                <form className="space-y-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">성함 (Name) *</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">연락처 (Phone) *</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">생년월일 (Birthdate) *</label>
                            <input 
                                type="text" 
                                name="birthdate"
                                placeholder="YYYY-MM-DD"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        
                        <div className="space-y-2 relative">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">지원 지사 (Region) *</label>
                            <select 
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-300 bg-transparent py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none appearance-none cursor-pointer"
                            >
                                <option value="" disabled>지사 선택</option>
                                <option value="서울 본사">서울 본사</option>
                                <option value="대구 지사">대구 지사</option>
                                <option value="당진 지사">당진 지사</option>
                                <option value="광주 1지사">광주 1지사</option>
                                <option value="광주 2지사">광주 2지사</option>
                            </select>
                            {/* Custom dropdown arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 pt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <label className="text-xs font-bold text-gray-500 tracking-wide cursor-pointer flex items-start gap-3">
                                <input type="checkbox" className="accent-black w-4 h-4 mt-0.5" required />
                                <span>개인정보 수집 및 이용에 동의합니다. (필수)</span>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={status === "submitting"}
                        className="bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#ff3333] transition-colors duration-300 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                        {status === "submitting" ? "지원 처리 중..." : "지원하기"}
                    </button>

                    {status === "success" && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-bold flex items-center gap-2">
                             <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
                            입사지원이 성공적으로 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                        </div>
                    )}
                    {status === "error" && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold flex items-center gap-2">
                            <span className="block w-2 h-2 bg-red-500 rounded-full"></span>
                            지원 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                        </div>
                    )}
                </form>
            </motion.div>
        </div>

        {/* RIGHT COLUMN: Info & Image (Dark with Overlay) */}
        <div className="w-full lg:w-1/2 relative min-h-[600px] bg-black order-1 lg:order-2 border-t border-black">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
                    alt="Career Office" 
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <motion.div 
                className="absolute inset-0 flex flex-col justify-center items-center p-12 md:p-24 text-white text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div>
                    <h3 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                        We are looking for <br/> <span className="text-[#ff3333]">Professionals</span>
                    </h3>
                    <p className="text-xl font-light text-gray-300 max-w-md mx-auto leading-relaxed">
                        최고의 전문가들과 함께<br/>새로운 금융의 미래를 만들어갈 당신을 기다립니다.
                    </p>
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
}
