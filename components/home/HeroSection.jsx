"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
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
               {/* Company Name */}
               <h1 className="text-5xl md:text-6xl lg:text-[76px] font-black mb-8 leading-tight">
                  (주)에프엔솔루션
               </h1>

               {/* Korean Tagline */}
               <div className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 space-y-2">
                  <p>비즈니스 컨설팅 | 해외 진출 | 서비스 개발 | 리더십</p>
               </div>

               {/* Slogan with Red Dot */}
               <p className="text-2xl md:text-3xl lg:text-[32px] font-medium leading-relaxed">
                  We Make Your Value Visible<span className="text-red-500">.</span>
               </p>
            </motion.div>

            {/* Right Side: Newsletter Subscription */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex items-center justify-center lg:justify-end"
            >
               <div className="w-full max-w-md">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-8">
                     Subscribe to our Mailing List
                  </h3>
                  
                  <form onSubmit={handleSubscribe} className="space-y-5">
                     <div>
                        <label className="text-gray-400 text-base mb-2 block">
                           Enter your email here *
                        </label>
                        <input 
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Email Address"
                           required
                           className="w-full bg-transparent border border-white/30 text-white text-lg px-5 py-4 focus:outline-none focus:border-white transition-colors"
                        />
                     </div>

                     <div className="flex items-start gap-2 text-base text-gray-400">
                        <input 
                           type="checkbox" 
                           id="newsletter-consent"
                           className="mt-1"
                        />
                        <label htmlFor="newsletter-consent">
                           Yes, subscribe me to your newsletter.
                        </label>
                     </div>

                     <button 
                        type="submit"
                        className="bg-white text-black px-10 py-4 text-lg font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto"
                     >
                        {subscribed ? "Subscribed!" : "Subscribe"}
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
