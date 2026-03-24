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

    // --- HERO H1 STAGGER (only once per mount, not on every lang switch) ---
    setTimeout(() => {
      const heroH1 = document.querySelector('h1');
      if (heroH1 && !heroH1.classList.contains('anime-initialized')) {
        heroH1.classList.add('anime-initialized');
        heroH1.style.overflow = 'hidden';
        const chars = splitChars(heroH1);
        anime.set(chars, { opacity: 0, translateY: '1em' });
        anime({
          targets:     chars,
          opacity:     [0, 1],
          translateY:  ['1em', '0em'],
          easing:      'easeOutExpo',
          duration:    800,
          delay:       anime.stagger(28),
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
    }, 300);

    // --- AMBIENT ORB ---
    const bgOrb = document.querySelector('.text-bg-anim');
    if (bgOrb) {
      anime({ targets: bgOrb, scale: [0.85, 1.15], opacity: [0.4, 0.9], easing: 'easeInOutSine', duration: 3500, direction: 'alternate', loop: true });
    }
  }

  // Inject canvas dots once (they persist across routes)
  function initCanvas(anime: any) {
    const hero = document.querySelector('section');
    if (!hero || document.querySelector('canvas.anime-bg')) return;

    const cvs = document.createElement('canvas');
    cvs.className = 'anime-bg';
    cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.35;';
    hero.insertBefore(cvs, hero.firstChild);

    const ctx = cvs.getContext('2d');
    const COLS = 13, ROWS = 7, DIST = 95;
    let W = 0, H = 0, dots: any[] = [];

    function resize() {
      if (!hero) return;
      W = cvs.width  = hero.offsetWidth;
      H = cvs.height = hero.offsetHeight;
      const fx = W / Math.max(COLS - 1, 1);
      const fy = H / Math.max(ROWS - 1, 1);
      dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
        bx: (i % COLS) * fx, by: Math.floor(i / COLS) * fy,
        x: 0, y: 0,
        r:   Math.random() * 1.4 + 0.8,
        ph:  Math.random() * Math.PI * 2,
        spd: Math.random() * 0.25 + 0.08,
        amp: Math.random() * 11 + 4,
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    (function render(ts: number) {
      if (!ctx) return;
      const t = ts * 0.001;
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x = d.bx + Math.sin(t * d.spd + d.ph) * d.amp;
        d.y = d.by + Math.cos(t * d.spd * 0.65 + d.ph) * d.amp * 0.55;
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(73,125,21,${(1 - d / DIST) * 0.15})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(73,125,21,0.40)';
        ctx.fill();
      });
      requestAnimationFrame(render);
    })(0);
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
      initCanvas(a);
      runAnimations(a);
    };
    document.body.appendChild(script);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function splitChars(el: Element): Element[] {
  const spans: Element[] = [];
  const walk = (node: ChildNode) => {
    if (node.nodeType === 3) {
      const text  = node.textContent ?? '';
      const frag  = document.createDocumentFragment();
      const tokens = text.split(/(\s+)/);
      tokens.forEach(token => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          const sp = document.createElement('span');
          sp.textContent  = token;
          sp.style.whiteSpace = 'pre';
          frag.appendChild(sp);
        } else {
          const word = document.createElement('span');
          word.style.cssText = 'display:inline-block;white-space:nowrap;';
          [...token].forEach(ch => {
            const s = document.createElement('span');
            s.style.cssText = 'display:inline-block;';
            s.textContent   = ch;
            word.appendChild(s);
            spans.push(s);
          });
          frag.appendChild(word);
        }
      });
      node.replaceWith(frag);
    } else if (node.nodeType === 1 && (node as Element).tagName !== 'SCRIPT') {
      [...node.childNodes].forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
  return spans;
}
