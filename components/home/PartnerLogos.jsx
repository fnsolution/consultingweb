"use client";

import Image from "next/image";

export default function PartnerLogos() {
  return (
    <section className="bg-white py-24 md:py-32 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center gap-6 md:gap-8">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black">
              금융보국(金融報國)
           </h2>
           <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 break-keep">
              금융으로 국가와 국민에게 기여한다
           </p>
           <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-500 mt-4 tracking-wide">
              We Make Your Value Visible<span className="text-[#ff3333]">.</span>
           </p>
        </div>
      </div>
    </section>
  );
}
