/* Interactive hero name (mauriciojuba.com-style).
   Each letter of the name is wrapped in its own span; as the cursor moves,
   nearby letters GROW — they scale up in size and gain weight (Manrope 'wght'
   axis) — with a smooth distance falloff, easing back to rest as the cursor
   leaves. Letter centres are measured from layout metrics (offsetLeft/Top),
   which ignore the live scale transform, so the growth never feeds back into
   the distance maths. Vanilla JS, no deps. */
(function () {
  const names = document.querySelectorAll('[data-hero-name]');
  if (!names.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BASE = 340;      // resting weight
  const MAX = 780;       // Manrope's heaviest (near 800)
  const SCALE_MAX = 0.32; // extra scale at the cursor centre (1.0 -> 1.32)
  const RADIUS = 190;    // px of cursor influence
  const EASE = 0.2;

  const chars = [];

  names.forEach((name) => {
    const text = name.textContent;
    name.textContent = '';
    name.setAttribute('aria-label', text);
    for (const c of text) {
      const span = document.createElement('span');
      span.className = 'hero-ch';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = c === ' ' ? ' ' : c;
      span.style.display = 'inline-block';
      span.style.transformOrigin = '50% 60%';
      span.style.fontVariationSettings = `'wght' ${BASE}`;
      span.style.willChange = 'transform, font-variation-settings';
      name.appendChild(span);
      if (c !== ' ') chars.push({ el: span, w: BASE, s: 0 });
    }
  });

  if (reduceMotion) return;

  // Layout centre in viewport coords — unaffected by the span's own transform.
  function centre(el) {
    let x = 0, y = 0, node = el;
    while (node) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent; }
    return {
      x: x + el.offsetWidth / 2 - window.scrollX,
      y: y + el.offsetHeight / 2 - window.scrollY,
    };
  }

  const mouse = { x: -9999, y: -9999 };
  let raf = null;

  function frame() {
    let active = false;
    for (const ch of chars) {
      const c = centre(ch.el);
      const dist = Math.hypot(c.x - mouse.x, c.y - mouse.y);
      const f = dist < RADIUS ? 1 - dist / RADIUS : 0;
      const e = f * f; // ease-in falloff so only close letters really pop
      const targetW = BASE + (MAX - BASE) * e;
      const targetS = SCALE_MAX * e;
      ch.w += (targetW - ch.w) * EASE;
      ch.s += (targetS - ch.s) * EASE;
      if (Math.abs(targetW - ch.w) > 0.4 || Math.abs(targetS - ch.s) > 0.001) active = true;
      ch.el.style.fontVariationSettings = `'wght' ${Math.round(ch.w)}`;
      ch.el.style.transform = `scale(${(1 + ch.s).toFixed(3)})`;
      ch.el.style.zIndex = ch.s > 0.02 ? '1' : '';
    }
    raf = active ? requestAnimationFrame(frame) : null;
  }

  function wake() { if (!raf) raf = requestAnimationFrame(frame); }

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    wake();
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.x = -9999; mouse.y = -9999;
    wake();
  });
})();
