/* Interactive dot-grid background.
   - Dots near the cursor brighten and get gently pushed away, then spring back.
   - Sections marked .section-light get a light background painted on this same
     canvas, fading softly into the dark sections above and below; dots turn
     dark inside the light zone so the grid continues across both modes.
   Vanilla JS + canvas, no deps. */
(function () {
  const canvas = document.getElementById('dotGrid');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');

  const SPACING = 28;          // px between dots
  const DOT_RADIUS = 1;        // base dot size
  const INFLUENCE = 150;       // cursor influence radius (px)
  const PUSH = 14;             // max displacement away from cursor (px)
  const BASE_ALPHA = 0.16;
  const HOT_ALPHA = 0.75;
  const EASE = 0.12;           // spring-back speed
  const LIGHT_RGB = [244, 244, 245];  // light section background
  const FADE = 180;            // px of soft transition into dark sections

  let dots = [];
  let width = 0, height = 0, dpr = 1;
  let mouse = { x: -9999, y: -9999 };
  let raf = null;
  let lightSections = [];

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dots = [];
    for (let y = SPACING / 2; y < height; y += SPACING) {
      for (let x = SPACING / 2; x < width; x += SPACING) {
        dots.push({ ox: x, oy: y, x: x, y: y, glow: 0 });
      }
    }
    lightSections = Array.from(document.querySelectorAll('.section-light'));
    render(true);
  }

  // 0 = dark zone, 1 = fully inside a light section (smooth ramp across FADE px)
  function lightness(y, rects) {
    let t = 0;
    for (const r of rects) {
      if (y < r.top - FADE || y > r.bottom + FADE) continue;
      const inTop = (y - (r.top - FADE)) / FADE;
      const inBottom = ((r.bottom + FADE) - y) / FADE;
      t = Math.max(t, Math.min(1, inTop, inBottom));
    }
    return t;
  }

  function paintLightZones(rects) {
    for (const r of rects) {
      const top = r.top - FADE, bottom = r.bottom + FADE;
      if (bottom < 0 || top > height) continue;
      const g = ctx.createLinearGradient(0, top, 0, bottom);
      const span = bottom - top;
      const f = Math.min(FADE / span, 0.49);
      g.addColorStop(0, 'rgba(244,244,245,0)');
      g.addColorStop(f, 'rgba(244,244,245,1)');
      g.addColorStop(1 - f, 'rgba(244,244,245,1)');
      g.addColorStop(1, 'rgba(244,244,245,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, Math.max(top, 0), width, Math.min(bottom, height) - Math.max(top, 0));
    }
  }

  function render(staticPass) {
    ctx.clearRect(0, 0, width, height);
    const rects = lightSections.map(el => el.getBoundingClientRect());
    paintLightZones(rects);

    let active = false;
    for (const d of dots) {
      if (!staticPass && !reduceMotion) {
        const dx = d.ox - mouse.x;
        const dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);

        let tx = d.ox, ty = d.oy, tg = 0;
        if (dist < INFLUENCE) {
          const force = 1 - dist / INFLUENCE;
          const angle = Math.atan2(dy, dx);
          tx = d.ox + Math.cos(angle) * force * PUSH;
          ty = d.oy + Math.sin(angle) * force * PUSH;
          tg = force;
        }
        d.x += (tx - d.x) * EASE;
        d.y += (ty - d.y) * EASE;
        d.glow += (tg - d.glow) * EASE;
        if (Math.abs(d.x - d.ox) > 0.1 || d.glow > 0.01) active = true;
      }

      const t = lightness(d.y, rects);
      const alpha = BASE_ALPHA + (HOT_ALPHA - BASE_ALPHA) * d.glow;
      // white dots in dark zones, dark dots in light zones
      const c = Math.round(255 * (1 - t) + 23 * t);
      ctx.fillStyle = 'rgba(' + c + ',' + c + ',' + (c + (t > 0.5 ? 3 : 0)) + ',' + alpha.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
    return active;
  }

  function frame() {
    const active = render(false);
    raf = active ? requestAnimationFrame(frame) : null;
  }

  function wake() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  build();

  if (!reduceMotion) {
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
  }

  // the light zones live in page coordinates, so repaint while scrolling
  window.addEventListener('scroll', () => {
    if (raf) return;
    render(true);
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });
})();
