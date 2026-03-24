import {
  animate, createTimeline, createAnimatable,
  stagger, onScroll, spring, engine
} from 'https://cdn.jsdelivr.net/npm/animejs/dist/anime.esm.min.js';

function splitChars(el) {
  if (!el) return [];
  el.style.overflow = 'hidden';
  const spans = [];
  const walk = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach(ch => {
        const s = document.createElement('span');
        s.style.cssText = `display:inline-block;white-space:${ch === ' ' ? 'pre' : 'normal'}`;
        s.textContent = ch;
        frag.appendChild(s);
        spans.push(s);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      const children = [...node.childNodes];
      children.forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
  return spans;
}

// Ensure DOM is ready (Next.js loads lazy scripts dynamically)
setTimeout(() => {
  const hero = document.querySelector('section'); // first section is hero
  
  // 1. BG CANVAS — Animated sine-wave dot grid (GREEN THEME)
  if (hero) {
    const cvs = document.createElement('canvas');
    cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.35;';
    hero.insertBefore(cvs, hero.firstChild);
    const ctx = cvs.getContext('2d');
    const COLS = 13, ROWS = 7, DIST = 95;
    let W, H, dots = [];

    function resize() {
      W = cvs.width  = hero.offsetWidth;
      H = cvs.height = hero.offsetHeight;
      dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
        bx: ((i % COLS) / (COLS - 1)) * W,
        by: (Math.floor(i / COLS) / (ROWS - 1)) * H,
        x: 0, y: 0,
        r: Math.random() * 1.4 + 0.8,
        ph: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.25 + 0.08,
        amp: Math.random() * 11 + 4
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    engine.add({
      update(ts) {
        const t = ts * 0.001;
        ctx.clearRect(0, 0, W, H);
        dots.forEach(d => {
          d.x = d.bx + Math.sin(t * d.spd + d.ph) * d.amp;
          d.y = d.by + Math.cos(t * d.spd * 0.65 + d.ph) * d.amp * 0.55;
        });
        for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            // Green lines for the green theme --color-accent #497D15 -> rgb(73,125,21)
            ctx.strokeStyle = `rgba(73,125,21,${(1 - d/DIST) * 0.15})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
        dots.forEach(d => {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(73,125,21,0.40)';
          ctx.fill();
        });
      }
    });
  }

  // 2. HERO H1 — Character stagger reveal
  const heroH1 = document.querySelector('h1');
  if (heroH1) {
    const chars = splitChars(heroH1);
    animate(chars, { opacity:0, translateY:'1em' }, { duration:0 });
    animate(chars, { opacity:[0,1], translateY:['1em','0em'], ease:'outExpo', duration:800, delay:stagger(28) });
  }

  // 3. MAGNETIC HOVER — Cards
  const hoverCards = document.querySelectorAll('.card-hover');
  hoverCards.forEach(card => {
    // We already have CSS transform for translateY, let's inject spring physics
    const a = createAnimatable(card, {
      translateX: { ease:spring({ stiffness:200, damping:20 }) },
      translateY: { ease:spring({ stiffness:200, damping:20 }) }
    });
    // Add magnetic pull logic but keep Next.js style intact
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      // slight magnetic attraction towards mouse
      a.translateX((e.clientX - (r.left + r.width/2))  * 0.08);
      a.translateY((e.clientY - (r.top  + r.height/2)) * 0.08);
    });
    card.addEventListener('mouseleave', () => { 
      a.translateX(0); a.translateY(0); 
    });
  });

}, 500);
