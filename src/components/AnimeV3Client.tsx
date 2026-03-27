"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnimeV3Client() {
  const pathname = usePathname();
  const animationsReadyRef = useRef(false);

  // Run all logo + hero animations — callable on every route change
  function runAnimations(anime: any) {
    // --- SVG LOGO ANIMATION ---
    // Strip any leftover anime state
    anime.remove('.logo-text-outline');
    anime.remove('.logo-text-fill');

    const svgOutline = document.querySelector('.logo-text-outline') as SVGTextElement | null;
    const svgFill    = document.querySelector('.logo-text-fill')    as SVGTextElement | null;

    if (svgOutline && svgFill) {
      // Reset to starting state every time
      svgOutline.style.strokeDasharray  = "400";
      svgOutline.style.strokeDashoffset = "400";
      svgFill.style.opacity             = "0";

      anime({
        targets:          '.logo-text-outline',
        strokeDashoffset: [400, 0],
        easing:           'easeInOutSine',
        duration:         2000,
        delay:            150,
        complete() {
          anime({
            targets:  '.logo-text-fill',
            opacity:  [0, 1],
            easing:   'linear',
            duration: 400,
          });
        },
      });
    }

    // --- MAGNETIC HOVER CARDS ---
    document.querySelectorAll('.card-hover').forEach((card) => {
      if (!card.classList.contains('magnetic-initialized')) {
        card.classList.add('magnetic-initialized');
        card.addEventListener('mousemove', (e: any) => {
          const r = card.getBoundingClientRect();
          anime({
            targets:    card,
            translateX: (e.clientX - (r.left + r.width / 2)) * 0.08,
            translateY: (e.clientY - (r.top  + r.height / 2)) * 0.08 - 4,
            scale:      1.01,
            easing:     'easeOutElastic(1, .5)',
            duration:   800,
          });
        });
        card.addEventListener('mouseleave', () => {
          anime({ targets: card, translateX: 0, translateY: 0, scale: 1, easing: 'easeOutElastic(1,.5)', duration: 800 });
        });
      }
    });

    // --- AMBIENT ORB ---
    const bgOrb = document.querySelector('.text-bg-anim');
    if (bgOrb) {
      anime({ targets: bgOrb, scale: [0.85, 1.15], opacity: [0.4, 0.9], easing: 'easeInOutSine', duration: 3500, direction: 'alternate', loop: true });
    }
  }

  // ── MAIN EFFECT — fires on every route change ──────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const anime = (window as any).anime;

    if (anime) {
      // Library already loaded — just re-run animations
      runAnimations(anime);
      return;
    }

    // First load: inject the script once
    if (document.getElementById('anime-js-script')) return;

    const script = document.createElement('script');
    script.id  = 'anime-js-script';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js';
    script.onload = () => {
      const a = (window as any).anime;
      if (typeof a !== 'function') return;
      animationsReadyRef.current = true;
      runAnimations(a);
    };
    document.body.appendChild(script);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

