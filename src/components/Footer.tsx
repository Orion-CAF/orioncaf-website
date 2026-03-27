"use client";
import Link from "next/link";
import { dispatchContactModal } from "./ContactModal";

export default function Footer({ dict }: { dict: any }) {
  return (
    <footer className="bg-white border-t border-black/[0.06] pt-20 pb-10" id="about">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 px-6 md:px-16 max-w-[1200px] mx-auto mb-16">
        
        {/* Brand & Contact Info */}
        <div className="md:col-span-2 flex flex-col">
          <div className="text-[20px] font-bold flex items-center gap-2.5 mb-5 text-[#1a1a1a]">
            <div className="w-3 h-3 rounded-full bg-accent footer-brand-dot shadow-[0_0_12px_rgba(73,125,21,0.5)]"></div>
            OrionCAF
          </div>
          <p className="text-[14px] text-[#666] leading-[1.7] max-w-[280px] mb-8">
            {dict.tagline}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[13px] text-[#555]">
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              +90 (236) XXX XX XX
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#555]">
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@orioncaf.com
            </div>
            <div className="flex items-start gap-3 text-[13px] text-[#555]">
              <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Manisa Celal Bayar Üniversitesi<br />Teknokent, Manisa / Türkiye
            </div>
          </div>
        </div>

        {/* Links: Capabilities */}
        <div className="flex flex-col md:col-span-1">
          <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-6">{dict.solutions}</h4>
          {dict.solutionLinks.map((label: string, i: number) => (
            <FooterLink key={i} href="#solutions">{label}</FooterLink>
          ))}
        </div>

        {/* Links: Company */}
        <div className="flex flex-col md:col-span-1">
          <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-6">{dict.company}</h4>
          <FooterLink href="#about">{dict.about}</FooterLink>
          <FooterLink href="#projects">{dict.projects}</FooterLink>
          <FooterLink href="#research">{dict.research}</FooterLink>
          <FooterLink href="https://huggingface.co/OrionCAF">{dict.opensource}</FooterLink>
        </div>

        {/* Connect & CTA */}
        <div className="flex flex-col md:col-span-2">
          <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-6">{dict.connect}</h4>
          
          <button 
            onClick={dispatchContactModal} 
            className="w-full sm:w-auto text-left sm:text-center text-[14px] font-bold px-6 py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(73,125,21,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer font-sans border-none mb-8"
          >
            {dict.contact} →
          </button>

          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/107349213" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#555] hover:text-[#0077B5] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://twitter.com/OrionCAF" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#555] hover:text-[#1DA1F2] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://huggingface.co/OrionCAF" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#555] hover:text-[#1a1a1a] flex items-center justify-center transition-colors">
              <span className="text-[18px]">🤗</span>
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-black/[0.06] pt-8 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center text-center gap-4 max-w-[1200px] mx-auto">
        <p className="text-[13px] text-[#aaa]">{dict.copyright}</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
          <p className="text-[13px] text-[#aaa]">{dict.builtMsg}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block text-[14px] text-[#666] no-underline mb-3.5 transition-colors duration-200 hover:text-accent font-medium inline-block max-w-max"
    >
      {children}
    </Link>
  );
}
