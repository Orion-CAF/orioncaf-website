"use client";
import { dispatchContactModal } from "./ContactModal";

export default function CtaBanner({ dict }: { dict: any }) {
  return (
    <div className="cta-banner rounded-3xl p-12 md:py-16 md:px-16 text-center mx-6 md:mx-16 mb-24 max-w-[1200px] xl:mx-auto">
      {/* Decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-white/[0.06]" />
      <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full bg-white/[0.04]" />

      <h2 className="text-[30px] md:text-[38px] font-bold text-white tracking-[-0.8px] mb-4 relative">
        {dict.title}
      </h2>
      <p className="text-[16px] text-white/75 max-w-[480px] mx-auto mb-10 leading-[1.7] relative">
        {dict.desc}
      </p>
      <div className="flex flex-wrap justify-center gap-3.5 relative">
        <button onClick={dispatchContactModal} className="text-[14px] font-bold px-7 py-3.5 rounded-full bg-white text-accent border-none cursor-pointer font-sans transition-all duration-200 hover:shadow-[0_6px_24px_rgba(255,255,255,0.3)] active:scale-[0.97]">
          {dict.start}
        </button>
        <a href="#solutions" className="text-[14px] font-semibold px-7 py-3.5 rounded-full bg-transparent text-white/90 border border-white/30 cursor-pointer font-sans transition-all duration-200 hover:bg-white/10 active:scale-[0.97] no-underline inline-block">
          {dict.explore}
        </a>
      </div>
    </div>
  );
}
