/* Hero spotlight: the pixel field is gently dimmed, and a soft light follows
   the cursor — brightening the video under it and letting the rest sink into
   the dark. Vanilla JS, no deps. */
(function () {
  const hero = document.querySelector('section[aria-labelledby="hero-heading"]');
  const dim = document.getElementById('heroSpotDim');
  const glow = document.getElementById('heroSpotGlow');
  if (!hero || !dim || !glow) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let tx = window.innerWidth * 0.72, ty = window.innerHeight * 0.42;
  let cx = tx, cy = ty, on = false, raf = null;

  function paint() {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    const r = hero.getBoundingClientRect();
    const x = Math.round(cx - r.left);
    const y = Math.round(cy - r.top);
    const edge = on ? 0.62 : 0.34;   // darkness at the edges
    dim.style.background =
      `radial-gradient(circle 260px at ${x}px ${y}px, rgba(10,10,11,0) 0%, rgba(10,10,11,0.14) 42%, rgba(10,10,11,${edge}) 100%)`;
    glow.style.background =
      `radial-gradient(circle 150px at ${x}px ${y}px, rgba(190,170,255,${on ? 0.10 : 0}) 0%, rgba(190,170,255,0) 72%)`;

    if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) raf = requestAnimationFrame(paint);
    else raf = null;
  }
  function wake() { if (!raf) raf = requestAnimationFrame(paint); }

  paint(); // initial resting vignette

  if (reduce) return;

  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    tx = e.clientX; ty = e.clientY; on = true; wake();
  }, { passive: true });

  hero.addEventListener('pointerleave', () => { on = false; wake(); });

  window.addEventListener('resize', wake);
  window.addEventListener('scroll', wake, { passive: true });
})();
