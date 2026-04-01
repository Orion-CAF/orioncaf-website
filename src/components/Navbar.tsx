"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import { MegaMenu } from "./ui/mega-menu";
import type { MegaMenuItem } from "./ui/mega-menu";
import { RainbowButton } from "./ui/rainbow-button";
import {
  Cpu, Globe, Mic, BookOpen, BrainCircuit, Smartphone, Server,
  FileText, Newspaper, Users, Rocket, Search, Shield, Box, Palette
} from "lucide-react";

const solutionIcons = [Cpu, Mic, BrainCircuit, BookOpen, Shield, Smartphone, Server];
const projectIcons = [Globe, FileText, Rocket, Search, Newspaper, Mic, Box, Palette];

export default function Navbar({ dict, lang, contactDict }: { dict: any; lang: string; contactDict: any }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleSolutionClick = (productName: string) => {
    setSelectedProduct(productName);
    setIsContactOpen(true);
    setIsMobileOpen(false);
  };

  const navItems: MegaMenuItem[] = [
    {
      id: 1,
      label: dict.solutions,
      subMenus: [{
        title: dict.solutions,
        items: (dict.solutionsMenu || []).map((item: string, i: number) => ({
          label: item, description: "",
          icon: solutionIcons[i % solutionIcons.length],
          onClick: () => handleSolutionClick(item),
        })),
      }],
    },
    {
      id: 2,
      label: dict.projects,
      subMenus: [{
        title: dict.projects,
        items: (dict.projectsMenu || []).map((item: any, i: number) => {
          let href = `/${lang}/projects/${item.slug}`;
          if (item.slug?.toLowerCase() === 'lawbuddy') {
            href = "https://caturan.github.io/lawbuddy-website/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn0w_DBmtL4WkaU_-ZIvKVbr_6G_XI96srZOAgx_lA7eqU_tugtdUV4l7coUg_aem_zV25pT99Ae-wYT74xAnTzA";
          } else if (item.slug?.toLowerCase() === 'ai-pulse' || item.slug?.toLowerCase() === 'aipulse') {
            href = "https://aipulse-seven.vercel.app";
          }
          return {
            label: item.label, description: "",
            icon: projectIcons[i % projectIcons.length],
            href,
          };
        }),
      }],
    },
    {
      id: 3,
      label: dict.research,
      subMenus: [{
        title: dict.research,
        items: (dict.researchMenu || []).map((item: any) => ({
          label: item.label, description: "",
          icon: BookOpen,
          href: `/${lang}${item.href}`,
        })),
      }],
    },
    {
      id: 4,
      label: dict.about,
      subMenus: [{
        title: dict.about,
        items: (dict.aboutMenu || []).map((item: any) => ({
          label: item.label, description: "",
          icon: Users,
          href: `/${lang}${item.href}`,
        })),
      }],
    },
    {
      id: 5,
      label: dict.pricing,
      onClick: () => { window.location.href = `/${lang}/pricing`; },
    },
  ];

  return (
    <>
      <nav className={`fixed w-full top-0 z-[100] flex items-center justify-between px-6 md:px-16 h-[72px] bg-[#FFF7ED]/95 backdrop-blur-lg border-b border-black/[0.06] transition-all duration-300 ${scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.06)]' : ''}`}>
        <Link href={`/${lang}`} className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-[#1a1a1a] no-underline">
          <Image src="/logo.png" alt="OrionCAF" width={120} height={40} className="object-contain" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-0 h-full">
          <MegaMenu items={navItems} />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
<Link href={lang === 'tr' ? '/en' : '/tr'} className="text-[13px] font-semibold text-[#555] hover:text-[#1a1a1a] cursor-pointer uppercase transition-colors duration-200">
            {lang === 'tr' ? 'EN' : 'TR'}
          </Link>
          <div className="hidden md:block">
            <RainbowButton className="text-[13px] font-semibold h-9 px-4" onClick={() => { setSelectedProduct(""); setIsContactOpen(true); }}>
              {dict.contact}
            </RainbowButton>
          </div>

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

      {/* MOBILE NAV OVERLAY */}
      <div
        className={`fixed inset-0 z-[98] bg-black/25 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div className={`fixed top-[72px] right-0 z-[99] w-[300px] h-[calc(100dvh-72px)] bg-[#FFF7ED] border-l border-black/[0.06] shadow-2xl transition-transform duration-300 ease-out md:hidden overflow-y-auto ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col px-7 pt-8 pb-8">
          <div className="flex flex-col gap-6">
            <MobileAccordion label={dict.solutions}>
              {dict.solutionsMenu?.map((item: string, i: number) => (
                <button key={i} onClick={() => handleSolutionClick(item)} className="mobile-sublink">{item}</button>
              ))}
            </MobileAccordion>

            <MobileAccordion label={dict.projects}>
              {dict.projectsMenu?.map((item: any, i: number) => {
                let href = `/${lang}/projects/${item.slug}`;
                if (item.slug?.toLowerCase() === 'lawbuddy') {
                  href = "https://caturan.github.io/lawbuddy-website/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn0w_DBmtL4WkaU_-ZIvKVbr_6G_XI96srZOAgx_lA7eqU_tugtdUV4l7coUg_aem_zV25pT99Ae-wYT74xAnTzA";
                } else if (item.slug?.toLowerCase() === 'ai-pulse' || item.slug?.toLowerCase() === 'aipulse') {
                  href = "https://aipulse-seven.vercel.app";
                }
                return (
                  <Link key={i} href={href} className="mobile-sublink" onClick={() => setIsMobileOpen(false)}>{item.label}</Link>
                );
              })}
            </MobileAccordion>
            
            <MobileAccordion label={dict.research}>
              {dict.researchMenu?.map((item: any, i: number) => (
                <Link key={i} href={`/${lang}${item.href}`} className="mobile-sublink" onClick={() => setIsMobileOpen(false)}>{item.label}</Link>
              ))}
            </MobileAccordion>

            <Link href={`/${lang}/pricing`} onClick={() => setIsMobileOpen(false)} className="text-[16px] font-bold text-[#1a1a1a] py-2 border-b border-black/5">
              {dict.pricing}
            </Link>
          </div>
          <div className="mt-8 pt-6">
            <RainbowButton onClick={() => { setIsMobileOpen(false); setSelectedProduct(""); setIsContactOpen(true); }} className="w-full text-[13px] font-semibold h-11">
              {dict.contact}
            </RainbowButton>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} dict={contactDict} initialProduct={selectedProduct} />
    </>
  );
}

function MobileAccordion({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-black/5">
      <div className="text-[16px] font-bold text-[#1a1a1a]">{label}</div>
      <div className="flex flex-col gap-2 pl-3 border-l-2 border-black/5">
        {children}
      </div>
    </div>
  );
}
