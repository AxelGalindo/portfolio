/* Shared UI behaviors. Currently: floating "back to top" button,
   shown after scrolling well past the first screen. Vanilla JS, no deps. */
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  const THRESHOLD = () => window.innerHeight * 1.5;

  function toggle() {
    btn.classList.toggle('visible', window.scrollY > THRESHOLD());
  }

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  // Nav adapts when floating over a light section (dark ink on light glass).
  const nav = document.getElementById('nav');
  const lightSections = document.querySelectorAll('.section-light');
  const INSET = 80; // only flip once the nav is well inside the light zone

  function navLightCheck() {
    if (!nav || !lightSections.length) return;
    const nr = nav.getBoundingClientRect();
    let over = false;
    for (const s of lightSections) {
      const r = s.getBoundingClientRect();
      if (r.top + INSET < nr.bottom && r.bottom - INSET > nr.top) { over = true; break; }
    }
    nav.classList.toggle('over-light', over);
  }

  window.addEventListener('scroll', navLightCheck, { passive: true });
  navLightCheck();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
