"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
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
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "new", // new, contacted, closed
        isRead: false
      });
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    }
  };
  return (
    <div className="font-sans">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        {/* Background - Worm's Eye View of Buildings */}
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Contact Hero" 
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

      {/* SPLIT LAYOUT SECTION - Increased vertical height (py-32, min-h-[800px]) */}
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        
        {/* LEFT COLUMN: Contact Form (White) */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 md:px-20 py-32 order-2 lg:order-1">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-black uppercase tracking-tight mb-4">
                        Send a Message
                    </h2>
                    <p className="text-gray-500">
                        전문가와의 상담이 필요하시다면 언제든 문의주세요.
                    </p>
                </div>

                <form className="space-y-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name *</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-200 py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name *</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-200 py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email *</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-200 py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone *</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-200 py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</label>
                        <input 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border-b border-gray-200 py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border-b border-gray-200 py-3 text-lg text-black focus:outline-none focus:border-black transition-colors rounded-none resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-2 pt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">I agree to receive communications</label>
                            <input type="checkbox" className="accent-black w-4 h-4" required />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={status === "submitting"}
                        className="bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#ff3333] transition-colors duration-300 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* RIGHT COLUMN: Info & Image (Dark with Overlay) */}
        <div className="w-full lg:w-1/2 relative min-h-[1000px] bg-black order-1 lg:order-2">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="/building.avif" 
                    alt="Office Building" 
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="mb-16">
                    <h3 className="text-5xl font-extrabold mb-3 text-[#ff3333] tracking-tight">Seoul</h3>
                    <p className="text-3xl font-bold text-white">Headquarters</p>
                </div>

                <div className="space-y-8 text-xl font-medium text-gray-100">
                    <div className="flex items-start gap-6">
                        <MapPin className="w-6 h-6 mt-1 text-white" />
                        <p className="leading-relaxed drop-shadow-md">
                            서울특별시 강남구 테헤란로 123<br/>
                            에프앤솔루션 빌딩 10층
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Phone className="w-6 h-6 text-white" />
                        <p className="drop-shadow-md">+82 2-1234-5678</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Mail className="w-6 h-6 text-white" />
                        <p className="drop-shadow-md">contact@fnsolution.com</p>
                    </div>
                </div>

                <div className="mt-16 pt-10 border-t border-white/30">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-widest hover:text-[#ff3333] transition-colors group text-white">
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
  );
}
