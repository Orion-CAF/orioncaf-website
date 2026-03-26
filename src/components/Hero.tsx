"use client";
import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { dispatchContactModal } from "./ContactModal";
import ThreeHeroCanvas from "./ThreeHeroCanvas";
import { RainbowButton } from "./ui/rainbow-button";

export default function Hero({ dict, lang }: { dict: any; lang?: string }) {
  const pathname = usePathname();

  const runAnimations = useCallback(() => {
    if (typeof window === "undefined") return;
    const items = document.querySelectorAll(".hero-stagger-item");
    items.forEach(el => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
    });

    const tryAnimate = () => {
      if ((window as any).anime) {
        (window as any).anime.remove(".hero-stagger-item");
        (window as any).anime({
          targets: ".hero-stagger-item",
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 800,
          delay: (window as any).anime.stagger(150, { start: 300 }),
          easing: "easeOutExpo"
        });
      } else {
        items.forEach(el => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "translateY(0)";
        });
      }
    };
    setTimeout(tryAnimate, 100);
  }, []);

  useEffect(() => {
    runAnimations();
  }, [dict, runAnimations]);

  return (
    <section className="relative text-center px-6 md:px-16 pt-20 md:pt-28 pb-16 md:pb-24 min-h-[85vh] flex flex-col items-center justify-center w-full overflow-hidden">
      <ThreeHeroCanvas key={`${lang}-${pathname}`} langKey={lang} />

      <div className="relative z-10 flex flex-col items-center w-full mt-[10vh]">
        <div className="relative z-10">
          <div className="text-bg-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse,rgba(73,125,21,0.08),transparent_60%)] -z-10 pointer-events-none rounded-[100%] blur-[20px]"></div>
          <h1 className="hero-stagger-item text-[32px] md:text-[42px] font-bold leading-[1.2] tracking-[-1px] text-[#1a1a1a] mb-6 drop-shadow-sm mt-48">
            {dict.title1}<br />
            {dict.title2}<em className="not-italic text-[#497D15] font-extrabold">{dict.titleHighlight}</em>
          </h1>
        </div>

        <p className="hero-stagger-item text-[16px] md:text-[19px] text-[#555] leading-[1.7] max-w-[650px] mx-auto mb-10 font-medium">
          {dict.desc}
        </p>

        <div className="hero-stagger-item flex flex-wrap gap-4 justify-center">
          <RainbowButton onClick={dispatchContactModal}>
            {dict.start}
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}
