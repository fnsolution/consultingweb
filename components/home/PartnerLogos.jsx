"use client";

import Image from "next/image";

export default function PartnerLogos() {
  const topPartners = [
    { name: "삼성생명", src: "/삼성생명.jpeg" },
    { name: "교보생명", src: "/교보생명.jpg", scale: "scale-[1.2] -mt-2 sm:-mt-3" },
    { name: "신한라이프", src: "/신한라이프.png" },
  ];

  const bottomPartners = [
    { name: "메리츠화재", src: "/메리츠화재.svg" },
    { name: "KB손해보험", src: "/kb손해.jpg" },
    { name: "DB손해보험", src: "/db손해.jpg" },
    { name: "한화손해보험", src: "/한화손해.jpg" },
    { name: "삼성화재", src: "/삼성화재.jpg", scale: "scale-[1.15]" },
    { name: "현대해상", src: "/현대해상.jpg", scale: "scale-90" },
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-extrabold text-black uppercase tracking-wide leading-tight">
            Strategic Partnerships <br /> with Global Leading Groups
          </h3>
        </div>
        
        <div className="flex flex-col items-center gap-8 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20 w-full mb-4">
            {topPartners.map((partner, index) => (
              <div key={`top-${index}`} className="relative w-32 h-14 md:w-40 md:h-16 lg:w-48 lg:h-16 xl:w-56 xl:h-16 flex items-center justify-center">
                <Image 
                  src={partner.src} 
                  alt={partner.name} 
                  fill
                  sizes="(max-width: 768px) 33vw, 20vw"
                  className={`object-contain transition-transform duration-300 ${partner.scale || ""}`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-6 xl:gap-8 w-full">
            {bottomPartners.map((partner, index) => (
              <div key={`bottom-${index}`} className="relative w-32 h-14 md:w-40 md:h-16 lg:w-32 lg:h-14 xl:w-40 xl:h-16 flex items-center justify-center">
                <Image 
                  src={partner.src} 
                  alt={partner.name} 
                  fill
                  sizes="(max-width: 768px) 33vw, 15vw"
                  className={`object-contain transition-transform duration-300 ${partner.scale || ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
