"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    contact: "",
    region: "",
    industry: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const regions = ["본사", "대구지사", "광주1지사", "광주2지사", "당진지사"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isExpanded) {
      if (formData.email) {
        setIsExpanded(true);
      }
      return;
    }

    try {
      await addDoc(collection(db, "inquiries"), {
        email: formData.email,
        company: formData.companyName,
        phone: formData.contact,
        region: formData.region,
        industry: formData.industry,
        message: `[메인 홈 상담신청] 지역: ${formData.region} / 업종: ${formData.industry}`,
        firstName: "메인홈",
        lastName: "상담",
        status: "new",
        createdAt: serverTimestamp(),
      });
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsExpanded(false);
        setFormData({
          email: "",
          companyName: "",
          contact: "",
          region: "",
          industry: "",
        });
      }, 3000);
    } catch (error) {
      console.error("오류 발생:", error);
      alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
         <img 
            src="/building2.avif" 
            alt="Background" 
            className="w-full h-full object-cover"
         />
         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-20 h-full flex items-center px-4 sm:px-6 lg:px-26 mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full items-center">
            
            {/* Left Side: Company Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white"
            >
               {/* Title */}
               <h1 className="text-5xl md:text-6xl lg:text-[76px] font-black mb-8 leading-tight break-keep">
                  금융보국(金融報國)
               </h1>

               {/* Korean Tagline */}
               <div className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 space-y-2 break-keep">
                  <p>금융으로 국가와 국민에게 기여한다</p>
               </div>

               {/* Slogan with Red Dot */}
               <p className="text-2xl md:text-3xl lg:text-[32px] font-medium leading-relaxed">
                  We Make Your Value Visible<span className="text-red-500">.</span>
               </p>
            </motion.div>

            {/* Right Side: Consultation Request */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex items-center justify-center lg:justify-end"
            >
               <div className="w-full max-w-md">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-8">
                     상담 신청
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="text-gray-400 text-base mb-2 block">
                           이메일을 입력해주세요 *
                        </label>
                        <input 
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           placeholder="Email Address"
                           required
                           className="w-full bg-transparent border border-white/30 text-white text-lg px-5 py-4 focus:outline-none focus:border-white transition-colors"
                        />
                     </div>

                     <AnimatePresence>
                        {isExpanded && (
                           <motion.div
                              initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                              animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
                              exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                           >
                              <div className="space-y-4 pt-1 pb-1">
                                 <div>
                                    <input 
                                       type="text"
                                       name="companyName"
                                       value={formData.companyName}
                                       onChange={handleChange}
                                       placeholder="기업명 *"
                                       required={isExpanded}
                                       className="w-full bg-transparent border border-white/30 text-white text-lg px-5 py-3 focus:outline-none focus:border-white transition-colors"
                                    />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <input 
                                           type="text"
                                           name="contact"
                                           value={formData.contact}
                                           onChange={handleChange}
                                           placeholder="연락처 *"
                                           required={isExpanded}
                                           className="w-full bg-transparent border border-white/30 text-white text-lg px-5 py-3 focus:outline-none focus:border-white transition-colors"
                                        />
                                     </div>
                                     <div className="relative">
                                        <div 
                                           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                           className={`w-full bg-transparent border border-white/30 text-lg px-5 py-3 cursor-pointer flex justify-between items-center transition-colors ${formData.region === "" ? "text-gray-400" : "text-white"} ${isDropdownOpen ? "border-white" : ""}`}
                                        >
                                           <span className="truncate">{formData.region || "지역(지사) 선택 *"}</span>
                                           <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? "rotate-180 text-white" : ""}`} />
                                        </div>
                                        
                                        <AnimatePresence>
                                           {isDropdownOpen && (
                                              <motion.div
                                                 initial={{ opacity: 0, y: -5 }}
                                                 animate={{ opacity: 1, y: 0 }}
                                                 exit={{ opacity: 0, y: -5 }}
                                                 transition={{ duration: 0.2 }}
                                                 className="absolute z-50 w-full mt-1 bg-black border border-white/30 shadow-2xl max-h-60 overflow-y-auto"
                                              >
                                                 {regions.map((region) => (
                                                    <div
                                                       key={region}
                                                       onClick={() => {
                                                          setFormData(prev => ({ ...prev, region }));
                                                          setIsDropdownOpen(false);
                                                       }}
                                                       className="px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
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
                                           required={isExpanded}
                                           className="opacity-0 absolute w-0 h-0 pointer-events-none"
                                           tabIndex={-1}
                                        />
                                     </div>
                                 </div>
                                 <div>
                                    <input 
                                       type="text"
                                       name="industry"
                                       value={formData.industry}
                                       onChange={handleChange}
                                       placeholder="업종 *"
                                       required={isExpanded}
                                       className="w-full bg-transparent border border-white/30 text-white text-lg px-5 py-3 focus:outline-none focus:border-white transition-colors"
                                    />
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>

                     <div className="flex items-start gap-2 text-base text-gray-400 pt-2">
                        <input 
                           type="checkbox" 
                           id="privacy-consent"
                           required
                           className="mt-1"
                        />
                        <label htmlFor="privacy-consent">
                           개인정보 수집 및 이용에 동의합니다.
                        </label>
                     </div>

                     <button 
                        type="submit"
                        className="bg-white text-black px-10 py-4 text-lg font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto mt-2"
                     >
                        {submitted ? "신청되었습니다!" : (isExpanded ? "제출하기" : "상담신청")}
                     </button>
                  </form>
               </div>
            </motion.div>

         </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 0.8 }}
         className="absolute bottom-12 left-8 sm:left-12 lg:left-16 z-30"
      >
         <div className="flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white transition-colors">
            <ChevronDown className="w-6 h-6 animate-bounce" />
         </div>
      </motion.div>
    </div>
  );
}
