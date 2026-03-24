import {
  animate, createTimeline, createAnimatable,
  stagger, onScroll, spring, engine
} from 'https://cdn.jsdelivr.net/npm/animejs/dist/anime.esm.min.js';

/* ══════════════════════════════════════════════════════════
   UTILITY: splitChars — wraps each character in an inline-block span
   Handles plain text nodes AND <em> children inside h1
══════════════════════════════════════════════════════════ */
function splitChars(el) {
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
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const children = [...node.childNodes];
      children.forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
  return spans;
}

/* ══════════════════════════════════════════════════════════
   BG-A: HERO FLOATING ORB BLOBS
   Two blurred radial gradient divs that slowly drift in opposite phases.
   Gives the hero section a modern "AI product" ambient glow feel.
══════════════════════════════════════════════════════════ */
(function heroOrbs() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.style.position = 'relative';
  const base = 'position:absolute;border-radius:50%;filter:blur(72px);pointer-events:none;z-index:0;';
  const orb1 = Object.assign(document.createElement('div'), {
    style: base + 'width:480px;height:480px;background:radial-gradient(circle,rgba(79,70,229,0.13) 0%,transparent 68%);top:-120px;left:-80px;'
  });
  const orb2 = Object.assign(document.createElement('div'), {
    style: base + 'width:340px;height:340px;background:radial-gradient(circle,rgba(124,58,237,0.10) 0%,transparent 70%);bottom:-70px;right:-50px;'
  });
  hero.insertBefore(orb2, hero.firstChild);
  hero.insertBefore(orb1, hero.firstChild);

  // Ensure all hero children (except orbs) sit above
  [...hero.children].forEach(child => {
    if (child !== orb1 && child !== orb2) {
      child.style.position = 'relative';
      child.style.zIndex   = '1';
    }
  });

  animate(orb1, { translateX: [0,32,-18,0], translateY: [0,-28,16,0], ease:'inOutSine', duration:10000, loop:true });
  animate(orb2, { translateX: [0,-24,14,0], translateY: [0,22,-14,0], ease:'inOutSine', duration:13000, loop:true });
})();

/* ══════════════════════════════════════════════════════════
   BG-B: HERO CANVAS — Animated sine-wave dot grid with connections
   Uses anime.js engine.add() to tie into anime's own rAF loop.
   Dots float in slow sine patterns; nearby dots are joined by faint lines.
══════════════════════════════════════════════════════════ */
(function heroCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const cvs = document.createElement('canvas');
  cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.5;';
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
      r:     Math.random() * 1.4 + 0.8,
      ph:    Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.25 + 0.08,
      amp:   Math.random() * 11 + 4
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
      // connections
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(79,70,229,${(1 - d/DIST) * 0.11})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
      // dots
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,70,229,0.30)';
        ctx.fill();
      });
    }
  });
})();

/* ══════════════════════════════════════════════════════════
   BG-C: NAV SHADOW — Adds a subtle box-shadow when page is scrolled
   Uses createAnimatable for smooth, physics-inspired transitions
══════════════════════════════════════════════════════════ */
(function navShadow() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const a = createAnimatable(nav, { boxShadow: { ease: 'outQuad', duration: 300 } });
  let was = false;
  window.addEventListener('scroll', () => {
    const now = window.scrollY > 40;
    if (now === was) return;
    was = now;
    a.boxShadow(now ? '0 2px 24px rgba(0,0,0,0.07)' : '0 0px 0px rgba(0,0,0,0)');
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════
   BG-D: NAV LOGO DOT — Subtle continuous scale breathing
══════════════════════════════════════════════════════════ */
(function logoDot() {
  const dot = document.querySelector('.nav-logo-dot');
  if (!dot) return;
  animate(dot, { scale:[1, 1.4, 1], ease:'inOutSine', duration:2800, loop:true });
})();

/* ══════════════════════════════════════════════════════════
   BG-E: HERO BADGE DOT — Radial ping pulse ring
   A span grows and fades out like a "radar ping" behind the dot
══════════════════════════════════════════════════════════ */
(function badgePing() {
  const dot = document.querySelector('.hero-badge-dot');
  if (!dot) return;
  dot.style.position = 'relative';
  const ring = Object.assign(document.createElement('span'), {
    style: 'position:absolute;border-radius:50%;background:rgba(79,70,229,0.4);width:6px;height:6px;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;'
  });
  dot.appendChild(ring);
  animate(ring, { scale:[1,3.2], opacity:[0.55,0], ease:'outExpo', duration:1700, loop:true, delay:600 });
})();

/* ══════════════════════════════════════════════════════════
   1. HERO H1 — Character-by-character stagger reveal
══════════════════════════════════════════════════════════ */
const heroH1 = document.querySelector('.hero h1');
if (heroH1) {
  const chars = splitChars(heroH1);
  animate(chars, { opacity:0, translateY:'1.2em' }, { duration:0 });
  animate(chars, { opacity:[0,1], translateY:['1.2em','0em'], ease:'outExpo', duration:700, delay:stagger(35) });
}

/* ══════════════════════════════════════════════════════════
   HERO PARAGRAPH — Fade up after H1
══════════════════════════════════════════════════════════ */
const heroPara = document.querySelector('.hero p');
if (heroPara) {
  animate(heroPara, { opacity:0, translateY:14 }, { duration:0 });
  animate(heroPara, { opacity:[0,1], translateY:[14,0], ease:'outExpo', duration:600, delay:560 });
}

/* ══════════════════════════════════════════════════════════
   2. HERO BUTTONS — Fade + Slide In with stagger
══════════════════════════════════════════════════════════ */
const heroBtns = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary');
if (heroBtns.length) {
  animate(heroBtns, { opacity:0, translateY:15 }, { duration:0 });
  animate(heroBtns, { opacity:[0,1], translateY:[15,0], ease:'outQuad', duration:500, delay:stagger(80, { start:720 }) });
}

/* ══════════════════════════════════════════════════════════
   3. METRICS COUNTERS — Scroll-triggered count-up from 0
══════════════════════════════════════════════════════════ */
document.querySelectorAll('.metric-num span').forEach(span => {
  const target = parseInt(span.textContent.replace(/\D/g, ''), 10);
  if (isNaN(target)) return;
  let done = false;
  onScroll({ target:span, sync:true, enter:'top 90%',
    onEnter() {
      if (done) return; done = true;
      const o = { v: 0 };
      animate(o, { v:target, ease:'outExpo', duration:1400, onUpdate() { span.textContent = Math.round(o.v).toString(); } });
    }
  });
});

/* ══════════════════════════════════════════════════════════
   NEW: SECTION TITLES, TAGS & SUBS — Scroll fade-up
══════════════════════════════════════════════════════════ */
document.querySelectorAll('.section-title, .section-tag, .section-sub').forEach(el => {
  animate(el, { opacity:0, translateY:18 }, { duration:0 });
  let done = false;
  onScroll({ target:el, sync:true, enter:'top 88%',
    onEnter() { if(done) return; done=true; animate(el, { opacity:[0,1], translateY:[18,0], ease:'outExpo', duration:620 }); }
  });
});

/* ══════════════════════════════════════════════════════════
   4. SERVICE CARDS — Scroll reveal with grid stagger
══════════════════════════════════════════════════════════ */
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length) {
  animate(serviceCards, { opacity:0, scale:0.92, translateY:16 }, { duration:0 });
  let done = false;
  onScroll({ target:serviceCards[0], sync:true, enter:'top 85%',
    onEnter() {
      if (done) return; done = true;
      animate(serviceCards, { opacity:[0,1], scale:[0.92,1], translateY:[16,0],
        ease:'outBack(1.2)', duration:550, delay:stagger(60, { grid:[3,3], from:'center' }) });
    }
  });
}

/* ══════════════════════════════════════════════════════════
   5. SERVICE CARDS — Spring hover with createAnimatable
══════════════════════════════════════════════════════════ */
serviceCards.forEach(card => {
  const a = createAnimatable(card, {
    translateY: { unit:'px', ease:spring({ stiffness:300, damping:18 }) },
    boxShadow:  { ease:'outQuad', duration:250 }
  });
  card.addEventListener('mouseenter', () => { a.translateY(-5); a.boxShadow('0 14px 36px rgba(79,70,229,0.13)'); });
  card.addEventListener('mouseleave', () => { a.translateY(0);  a.boxShadow('0 0px 0px rgba(79,70,229,0)'); });
});

/* ══════════════════════════════════════════════════════════
   6. FEATURE ROWS — Left / Right slide-in via scroll
══════════════════════════════════════════════════════════ */
document.querySelectorAll('.feature-row').forEach(row => {
  const rev = row.classList.contains('reverse');
  const tc = row.querySelector('.feature-text');
  const vc = row.querySelector('.feature-visual');
  const tx = rev ?  40 : -40, vx = rev ? -40 :  40;
  if (tc) animate(tc, { opacity:0, translateX:tx }, { duration:0 });
  if (vc) animate(vc, { opacity:0, translateX:vx }, { duration:0 });
  let done = false;
  onScroll({ target:row, sync:true, enter:'top 80%',
    onEnter() {
      if (done) return; done = true;
      if (tc) animate(tc, { opacity:[0,1], translateX:[tx,0], ease:'outExpo', duration:700 });
      if (vc) animate(vc, { opacity:[0,1], translateX:[vx,0], ease:'outExpo', duration:700, delay:120 });
    }
  });
});

/* ══════════════════════════════════════════════════════════
   7. PROJECT CARDS — Scroll stagger + Magnetic mouse hover
   createAnimatable tracks mouse position within each card
   for a subtle "magnetic" pull toward the cursor
══════════════════════════════════════════════════════════ */
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
  animate(projectCards, { opacity:0, translateY:20, scale:0.95 }, { duration:0 });
  let done = false;
  onScroll({ target:projectCards[0], sync:true, enter:'top 85%',
    onEnter() {
      if (done) return; done = true;
      animate(projectCards, { opacity:[0,1], translateY:[20,0], scale:[0.95,1],
        ease:'outExpo', duration:600, delay:stagger(50, { grid:[3,3], from:'first' }) });
    }
  });

  // Magnetic hover
  projectCards.forEach(card => {
    const a = createAnimatable(card, {
      translateX: { ease:spring({ stiffness:200, damping:20 }) },
      translateY: { ease:spring({ stiffness:200, damping:20 }) },
      boxShadow:  { ease:'outQuad', duration:250 }
    });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      a.translateX((e.clientX - (r.left + r.width/2))  * 0.11);
      a.translateY((e.clientY - (r.top  + r.height/2)) * 0.09);
      a.boxShadow('0 10px 30px rgba(0,0,0,0.09)');
    });
    card.addEventListener('mouseleave', () => { a.translateX(0); a.translateY(0); a.boxShadow('0 0px 0px rgba(0,0,0,0)'); });
  });
}

/* ══════════════════════════════════════════════════════════
   8. CTA BANNER — createTimeline: reveal → looping button pulse
══════════════════════════════════════════════════════════ */
const ctaBanner = document.querySelector('.cta-banner');
const ctaBtn    = document.querySelector('.btn-cta-white');
if (ctaBanner && ctaBtn) {
  animate(ctaBanner, { opacity:0, scale:0.97 }, { duration:0 });
  let done = false;
  onScroll({ target:ctaBanner, sync:true, enter:'top 85%',
    onEnter() {
      if (done) return; done = true;
      const tl = createTimeline();
      tl.add(ctaBanner, { opacity:[0,1], scale:[0.97,1], ease:'outExpo', duration:600 });
      tl.add(ctaBtn,    { scale:[1,1.05,1], ease:'inOutSine', duration:2200, loop:true, alternate:true }, 700);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   NEW: PUBLICATION CARD — Scroll fade + slide up
══════════════════════════════════════════════════════════ */
const pubCard = document.querySelector('.pub-card');
if (pubCard) {
  animate(pubCard, { opacity:0, translateY:20 }, { duration:0 });
  let done = false;
  onScroll({ target:pubCard, sync:true, enter:'top 85%',
    onEnter() { if(done) return; done=true; animate(pubCard, { opacity:[0,1], translateY:[20,0], ease:'outExpo', duration:700 }); }
  });
}

/* ══════════════════════════════════════════════════════════
   NEW: FOOTER LINKS — Stagger fade-in on scroll
══════════════════════════════════════════════════════════ */
const footerLinks = document.querySelectorAll('.footer-col a');
if (footerLinks.length) {
  animate(footerLinks, { opacity:0, translateX:-8 }, { duration:0 });
  let done = false;
  onScroll({ target:footerLinks[0], sync:true, enter:'top 95%',
    onEnter() {
      if(done) return; done=true;
      animate(footerLinks, { opacity:[0,1], translateX:[-8,0], ease:'outExpo', duration:450, delay:stagger(28) });
    }
  });
}
