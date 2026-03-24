"use client";
import { dispatchContactModal } from "./ContactModal";

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="relative text-center px-6 md:px-16 pt-20 md:pt-28 pb-16 md:pb-24 max-w-[860px] mx-auto overflow-hidden">
      {/* Animated floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orb absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(73,125,21,0.10),transparent_70%)] top-[-80px] left-[-100px] animate-[float1_14s_ease-in-out_infinite]" />
        <div className="hero-orb absolute w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(45,90,14,0.08),transparent_70%)] top-[10px] right-[-80px] animate-[float2_18s_ease-in-out_infinite]" />
        <div className="hero-orb absolute w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(73,125,21,0.06),transparent_70%)] bottom-[-50px] left-[30%] animate-[float3_16s_ease-in-out_infinite]" />
      </div>
      {/* Dot grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.3] bg-[radial-gradient(circle,rgba(73,125,21,0.15)_1px,transparent_1px)] bg-[size:28px_28px]"></div>

      <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent px-4 py-1.5 rounded-full mb-8 shadow-sm" style={{background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)'}}>
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
        {dict.badge}
      </div>

      <div className="relative z-10">
        {/* Dynamic Text Background Animation Orb */}
        <div className="text-bg-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse,rgba(73,125,21,0.08),transparent_60%)] -z-10 pointer-events-none rounded-[100%] blur-[20px]"></div>
        
        <h1 className="text-[38px] md:text-[56px] font-bold leading-[1.08] tracking-[-2px] text-[#1a1a1a] mb-6">
          {dict.title1}<br />
          {dict.title2} <em className="not-italic text-[#497D15] drop-shadow-sm">{dict.titleHighlight}</em>
        </h1>
      </div>

      <p className="text-[16px] md:text-[18px] text-[#666] leading-[1.7] max-w-[600px] mx-auto mb-10">
        {dict.desc}
      </p>
      <div className="flex flex-wrap gap-3.5 justify-center">
        <button onClick={dispatchContactModal} className="text-[14px] font-semibold px-7 py-3.5 rounded-full bg-accent text-white hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(73,125,21,0.3)] active:scale-[0.97] transition-all duration-200 cursor-pointer font-sans border-none">
          {dict.start}
        </button>
        <a href="#projects" className="text-[14px] font-semibold px-7 py-3.5 rounded-full bg-transparent text-[#1a1a1a] border border-black/15 hover:bg-white hover:border-black/25 hover:shadow-sm active:scale-[0.97] transition-all duration-200 cursor-pointer font-sans no-underline inline-block">
          {dict.work}
        </a>
      </div>
      <div className="hero-social-proof" style={{marginTop:'28px',fontSize:'12px',color:'var(--color-border-md)',display:'flex',alignItems:'center',gap:'16px',justifyContent:'center'}}>
        <span style={{color: '#888', fontWeight: 500}}>🤗 Hugging Face</span>
        <span style={{color:'var(--color-border-md)'}}>·</span>
        <span style={{color: '#888', fontWeight: 500}}>🏛 TUSAŞ</span>
        <span style={{color:'var(--color-border-md)'}}>·</span>
        <span style={{color: '#888', fontWeight: 500}}>📄 Veri Bilimi 2025</span>
      </div>
    </section>
  );
}
