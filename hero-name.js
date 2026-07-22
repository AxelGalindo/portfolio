/* Variable-weight hero name (mauriciojuba.com-style).
   Each letter of the name is wrapped in its own span; as the cursor moves,
   nearby letters grow HEAVIER only, easing back to the base weight. No
   size/scale change — the letters get bolder, never bigger.

   Weight is driven through the standard `font-weight` property (Manrope is a
   variable font, so any value 1-1000 maps to its 'wght' axis). This is more
   widely/reliably repainted than the low-level `font-variation-settings`,
   which some Chromium-based browsers (e.g. Opera GX) fail to redraw when the
   element is promoted with `will-change`. Vanilla JS, no deps. */
(function () {
  const names = document.querySelectorAll('[data-hero-name]');
  if (!names.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BASE = 340;      // resting weight
  const MAX = 800;       // Manrope's heaviest
  const RADIUS = 170;    // px of cursor influence
  const EASE = 0.18;

  const chars = [];

  names.forEach((name) => {
    const text = name.textContent;
    name.textContent = '';
    name.setAttribute('aria-label', text);
    for (const c of text) {
      const span = document.createElement('span');
      span.className = 'hero-ch';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = c === ' ' ? ' ' : c;
      span.style.display = 'inline-block';
      span.style.fontWeight = String(BASE);
      name.appendChild(span);
      if (c !== ' ') chars.push({ el: span, w: BASE });
    }
  });

  if (reduceMotion) return;

  const mouse = { x: -9999, y: -9999 };
  let raf = null;

  function frame() {
    let active = false;
    for (const ch of chars) {
      const r = ch.el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(cx - mouse.x, cy - mouse.y);
      const f = dist < RADIUS ? 1 - dist / RADIUS : 0;
      const target = BASE + (MAX - BASE) * (f * f);
      ch.w += (target - ch.w) * EASE;
      if (Math.abs(target - ch.w) > 0.5) active = true;
      ch.el.style.fontWeight = String(Math.round(ch.w));
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
