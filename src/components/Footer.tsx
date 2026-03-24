"use client";
import Link from "next/link";
import { dispatchContactModal } from "./ContactModal";

export default function Footer({ dict }: { dict: any }) {
  return (
    <footer className="border-t border-black/[0.06] pt-14 md:pt-16" id="about">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 px-6 md:px-16 max-w-[1200px] mx-auto">
        <div className="md:col-span-2">
          <div className="text-[17px] font-bold flex items-center gap-2.5 mb-3 text-[#1a1a1a]">
            <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
            OrionCAF
          </div>
          <div className="text-[13px] text-[#999] leading-[1.7] max-w-[240px]">
            {dict.tagline}
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[12px] font-bold text-[#555] uppercase tracking-[.06em] mb-4">{dict.solutions}</h4>
          {dict.solutionLinks.map((label: string, i: number) => (
            <FooterLink key={i} href="#solutions">{label}</FooterLink>
          ))}
        </div>
        <div className="flex flex-col">
          <h4 className="text-[12px] font-bold text-[#555] uppercase tracking-[.06em] mb-4">{dict.company}</h4>
          <FooterLink href="#about">{dict.about}</FooterLink>
          <FooterLink href="#projects">{dict.projects}</FooterLink>
          <FooterLink href="#research">{dict.research}</FooterLink>
          <FooterLink href="https://huggingface.co/OrionCAF">{dict.opensource}</FooterLink>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[12px] font-bold text-[#555] uppercase tracking-[.06em] mb-4">{dict.connect}</h4>
          <FooterLink href="https://www.linkedin.com/company/107349213">LinkedIn</FooterLink>
          <FooterLink href="https://huggingface.co/OrionCAF">Hugging Face</FooterLink>
          <FooterContactLink>{dict.contact}</FooterContactLink>
        </div>
      </div>
      <div className="border-t border-black/[0.06] mt-12 py-5 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center text-center gap-2 md:gap-0 max-w-[1200px] mx-auto">
        <p className="text-[12px] text-[#aaa]">{dict.copyright}</p>
        <p className="text-[12px] text-[#aaa]">{dict.builtMsg}</p>
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
      className="block text-[13px] text-[#999] no-underline mb-3 transition-colors duration-200 hover:text-[#555]"
    >
      {children}
    </Link>
  );
}

function FooterContactLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={dispatchContactModal}
      className="block text-[13px] text-[#999] mb-3 transition-colors duration-200 hover:text-[#555] bg-transparent border-none cursor-pointer p-0 text-left font-sans"
    >
      {children}
    </button>
  );
}
