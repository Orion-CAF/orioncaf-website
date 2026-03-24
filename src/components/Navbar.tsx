"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import ContactModal from "./ContactModal";

const sections = ["solutions", "projects", "research", "about"] as const;

export default function Navbar({ dict, lang, contactDict }: { dict: any; lang: string; contactDict: any }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateActive = useCallback(() => {
    const offset = 120;
    let current = "";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const close = () => setIsMobileOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [isMobileOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const labels: Record<string, string> = {
    solutions: dict.solutions,
    projects: dict.projects,
    research: dict.research,
    about: dict.about,
  };

  return (
    <>
      <nav className={`sticky top-0 z-[100] flex items-center justify-between px-6 md:px-16 h-[72px] bg-[#FFF7ED]/95 backdrop-blur-lg border-b border-black/[0.06] transition-all duration-300 ${scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.06)]' : ''}`}>
        <Link href={`/${lang}`} className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-[#1a1a1a] no-underline">
          <svg className="orion-logo-svg" viewBox="0 0 160 30" width="120" height="22">
            <g transform="translate(0, 20)">
              <text className="logo-text-outline" x="0" y="0" fontFamily="inherit" fontWeight="bold" fontSize="22" fill="transparent" stroke="#1a1a1a" strokeWidth="0.8">
                OrionCAF
              </text>
              <text className="logo-text-fill opacity-0" x="0" y="0" fontFamily="inherit" fontWeight="bold" fontSize="22" fill="#1a1a1a">
                OrionCAF
              </text>
            </g>
          </svg>
          <span style={{fontSize:'10px',fontWeight:500,color:'var(--color-accent)',background:'#EEF2FF',padding:'2px 8px',borderRadius:'99px',letterSpacing:'0.05em', whiteSpace: 'nowrap'}}>AI Engineering</span>
        </Link>


        <div className="hidden md:flex gap-8">
          {sections.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`text-[14px] transition-all duration-200 no-underline ${
                activeSection === id
                  ? 'text-accent font-semibold'
                  : 'text-[#555] hover:text-[#1a1a1a]'
              }`}
            >
              {labels[id]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link href={lang === 'tr' ? '/en' : '/tr'} className="text-[13px] font-semibold text-[#555] hover:text-[#1a1a1a] cursor-pointer uppercase transition-colors duration-200">
            {lang === 'tr' ? 'EN' : 'TR'}
          </Link>
          <button onClick={() => setIsContactOpen(true)} className="hidden md:inline-flex text-[13px] font-semibold px-5 py-2.5 rounded-full border-none bg-accent text-white hover:bg-accent-hover font-sans transition-all duration-200 cursor-pointer hover:shadow-[0_4px_12px_rgba(73,125,21,0.25)]">
            {dict.contact}
          </button>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] bg-transparent border-none cursor-pointer p-0"
            aria-label="Toggle menu"
          >
            <span className={`block w-[18px] h-[1.5px] bg-[#1a1a1a] rounded-full transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-[18px] h-[1.5px] bg-[#1a1a1a] rounded-full transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[18px] h-[1.5px] bg-[#1a1a1a] rounded-full transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[99] bg-black/25 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div className={`fixed top-[72px] right-0 z-[99] w-[300px] h-[calc(100dvh-72px)] bg-[#FFF7ED] border-l border-black/[0.06] shadow-2xl transition-transform duration-300 ease-out md:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col px-7 pt-8 pb-8 h-full">
          <div className="flex flex-col gap-1">
            {sections.map((id) => (
              <MobileNavLink
                key={id}
                href={`#${id}`}
                active={activeSection === id}
                onClick={() => setIsMobileOpen(false)}
              >
                {labels[id]}
              </MobileNavLink>
            ))}
          </div>
          <div className="border-t border-black/[0.06] mt-6 pt-6">
            <button
              onClick={() => { setIsMobileOpen(false); setIsContactOpen(true); }}
              className="w-full text-[14px] font-semibold py-3.5 rounded-full border-none bg-accent text-white hover:bg-accent-hover font-sans transition-all duration-200 cursor-pointer"
            >
              {dict.contact}
            </button>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} dict={contactDict} />
    </>
  );
}

function MobileNavLink({ href, active, onClick, children }: { href: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-[16px] font-medium px-4 py-3.5 rounded-xl transition-all duration-200 no-underline ${
        active
          ? 'text-accent bg-green-50'
          : 'text-[#444] hover:text-accent hover:bg-green-50'
      }`}
    >
      {children}
    </a>
  );
}
