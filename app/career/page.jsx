"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, TrendingUp, Handshake, ChevronDown } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthdate: "",
    region: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        type: "career_application",
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
    <div className="font-sans flex flex-col lg:flex-row min-h-screen bg-white">
      
      {/* LEFT COLUMN: Sticky Application Form */}
      <div className="w-full lg:w-[45%] lg:h-screen lg:sticky lg:top-0 bg-white text-black flex flex-col justify-center px-8 md:px-12 lg:px-16 py-32 lg:py-10 overflow-y-auto border-r border-gray-100 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.03)] relative">
         <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto w-full relative z-10"
         >
            <div className="mb-12">
               <h2 className="text-xs font-bold tracking-[0.3em] text-[#ff3333] uppercase mb-4">Join Us</h2>
               <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tighter text-black mb-6 uppercase leading-none">
                  Career<span className="text-[#ff3333]">.</span>
               </h1>
               <p className="text-gray-500 font-light leading-relaxed break-keep text-[15px]">
                  최고의 전문가들과 함께 새로운 금융의 미래를 만들어갈 당신을 기다립니다.<br className="hidden md:block"/>
                  에프앤솔루션과 함께 성장할 열정적인 인재들의 지원을 환영합니다.
               </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">성함 (Name) *</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-200 bg-transparent py-2.5 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">연락처 (Phone) *</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-200 bg-transparent py-2.5 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder-gray-300"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">생년월일 (Birthdate) *</label>
                        <input 
                            type="text" 
                            name="birthdate"
                            placeholder="YYYY-MM-DD"
                            value={formData.birthdate}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-200 bg-transparent py-2.5 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder-gray-300"
                        />
                    </div>
                    
                    <div className="space-y-2 relative">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">지원 지사 (Region) *</label>
                        <select 
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-200 bg-transparent py-2.5 text-base text-black focus:outline-none focus:border-black transition-colors rounded-none appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-gray-500">지사 선택</option>
                            <option value="서울 본사" className="text-black">서울 본사</option>
                            <option value="대구 지사" className="text-black">대구 지사</option>
                            <option value="당진 지사" className="text-black">당진 지사</option>
                            <option value="광주 1지사" className="text-black">광주 1지사</option>
                            <option value="광주 2지사" className="text-black">광주 2지사</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center text-gray-400">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="accent-[#ff3333] w-4 h-4" required />
                        <span className="text-[12px] font-medium text-gray-500 tracking-wide group-hover:text-black transition-colors">
                            개인정보 수집 및 이용에 동의합니다. (필수)
                        </span>
                    </label>
                </div>

                <button 
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-black text-white px-12 py-4.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#ff3333] transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed mt-6 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                >
                    {status === "submitting" ? "지원 처리 중..." : "지원하기"}
                </button>

                {status === "success" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2 mt-4">
                        입사지원이 성공적으로 완료되었습니다.
                    </motion.div>
                )}
                {status === "error" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2 mt-4">
                        지원 중 오류가 발생했습니다. 다시 시도해주세요.
                    </motion.div>
                )}
            </form>
         </motion.div>
      </div>

      {/* RIGHT COLUMN: HR System Content (Scrollable) */}
      <div className="w-full lg:w-[55%] flex flex-col bg-gray-50 z-10">
          {/* Header Image for the content side */}
          <div className="relative h-[30vh] lg:h-[40vh] min-h-[300px]">
              <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                 alt="HR System Hero" 
                 className="w-full h-full object-cover grayscale-[10%]"
              />
          </div>

          <div className="py-20 lg:py-28 px-8 md:px-16 xl:px-24">
              <motion.div 
                  className="mb-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
              >
                  <h2 className="text-xs font-bold tracking-[0.3em] text-[#ff3333] uppercase mb-4">Our System</h2>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
                      에프앤솔루션<br/>인사제도
                  </h3>
              </motion.div>

              <div className="space-y-28">
                  {/* Motivation & Comp */}
                  <motion.div 
                      className="flex flex-col gap-10"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                  >
                      <div>
                          <div className="border-l-4 border-[#ff3333] pl-6 mb-10">
                              <h4 className="text-2xl md:text-3xl font-bold text-black mb-4">동기부여 및 보상</h4>
                              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed break-keep">
                                  FNsolution은 PB를 회사의 얼굴이자 첫번째 자산으로 여기며, 개인의 역량향상을 위해 적극적으로 지원하고 업무성과에 따라 공정하고 투명한 보상을 제공합니다.
                              </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-[1px] bg-gray-200 border border-gray-200">
                              <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                  <TrendingUp className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                  <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep text-sm md:text-base">능력위주 승진</h5>
                              </div>
                              <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                  <Handshake className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                  <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep text-sm md:text-base">안정적 수입</h5>
                              </div>
                              <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                  <Award className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                  <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep text-sm md:text-base">성과보상제</h5>
                              </div>
                              <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-black transition-colors duration-300">
                                  <BookOpen className="w-8 h-8 text-[#ff3333] mb-4 group-hover:text-white transition-colors" />
                                  <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors break-keep text-sm md:text-base">멘토 오버라이드</h5>
                              </div>
                          </div>
                      </div>

                      <div className="rounded-none overflow-hidden h-[300px] md:h-[400px] relative group">
                          <img 
                              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop" 
                              alt="Motivation and Compensation"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                      </div>
                  </motion.div>

                  {/* Education System */}
                  <motion.div 
                      className="flex flex-col gap-10"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                  >
                      <div>
                          <div className="border-l-4 border-black pl-6 mb-10 mt-4">
                              <h4 className="text-2xl md:text-3xl font-bold text-black mb-4">교육제도</h4>
                              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed break-keep">
                                  우리는 지속적이고 체계적인 교육을 통해 항상 준비된 인재를 등용합니다. 이를 통해 고객님에게로 하여금 바른 선택을 도와드리고 있습니다. 가장 앞선 정보를 나누어 드리고 그에 대응할 수 있는 방법을 알려드리는 것이 우리의 목표이고, 사명입니다.
                              </p>
                          </div>

                          <div className="bg-black text-white p-8 md:p-12 relative group rounded-none shadow-xl">
                              <h5 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-3">
                                  <span className="w-1.5 h-6 bg-[#ff3333] inline-block"></span> 전문인력 교육지원 시스템
                              </h5>
                              <p className="text-gray-300 text-[15px] leading-relaxed font-light break-keep">
                                  FN solution은 금융권 지식을 습득하는 특별화된 과정별 교육으로 개개인의 전문성 강화 및 차별화된 교육 프로세스를 제공합니다.
                              </p>
                          </div>
                      </div>

                      <div className="rounded-none overflow-hidden h-[300px] md:h-[400px] relative group">
                          <img 
                              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                              alt="Education System"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[10%]"
                          />
                      </div>
                  </motion.div>
                  
                  {/* Closing remarks or additional banner */}
                  <div className="pt-20 pb-4 border-t border-gray-200 text-center">
                     <p className="text-xl md:text-2xl font-extrabold text-black mb-4 tracking-tight">혁신적인 파트너, 에프앤솔루션</p>
                     <p className="text-gray-500 font-light text-[15px] break-keep">
                        개인의 역량이 곧 회사의 자산입니다. 여러분의 무한한 가능성을 에프앤솔루션에서 펼쳐보세요.
                     </p>
                  </div>

              </div>
          </div>
      </div>
    </div>
  );
}
