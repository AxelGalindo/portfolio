/* Chromatic-glitch hero. Reads the ascii video live into a low-res buffer and
   splits the R/B channels near the cursor (RGB shift) for a digital glitch
   that intensifies where the mouse is. Vanilla JS + canvas, no deps. */
(function () {
  const video = document.getElementById('heroVideo');
  const canvas = document.getElementById('heroChroma');
  if (!video || !canvas) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  const src = document.createElement('canvas');
  const sctx = src.getContext('2d', { willReadFrequently: true });
  sctx.imageSmoothingEnabled = false;   // crisp nearest-neighbour downsample
  const out = document.createElement('canvas');
  const octx = out.getContext('2d');

  const CELL = 5;        // display pixel size
  const MAXOFF = 6;      // max channel shift (cells) at the cursor
  const BASE = 0.6;      // subtle constant aberration everywhere
  const R = 20;          // cursor influence radius (cells)

  let W, H, cols, rows, raf = null;
  const mouse = { x: -1e4, y: -1e4, on: false };

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    canvas.width = W; canvas.height = H;
    cols = Math.ceil(W / CELL); rows = Math.ceil(H / CELL);
    src.width = cols; src.height = rows;
    out.width = cols; out.height = rows;
  }

  function drawFrame() {
    if (video.readyState >= 2 && video.videoWidth) {
      const vw = video.videoWidth, vh = video.videoHeight;
      const scale = Math.max(cols / vw, rows / vh);   // cover-fit
      const dw = vw * scale, dh = vh * scale;
      sctx.drawImage(video, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const sd = sctx.getImageData(0, 0, cols, rows).data;
      const od = octx.createImageData(cols, rows), d = od.data;
      const mx = mouse.x / CELL, my = mouse.y / CELL;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          let off = BASE;
          if (mouse.on) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < R) off += (1 - dist / R) * (1 - dist / R) * MAXOFF;
          }
          const o = off | 0;
          const xr = x + o < cols ? x + o : cols - 1;
          const xb = x - o >= 0 ? x - o : 0;
          d[i]     = sd[(y * cols + xr) * 4];       // R shifted right
          d[i + 1] = sd[(y * cols + x) * 4 + 1];    // G centred
          d[i + 2] = sd[(y * cols + xb) * 4 + 2];   // B shifted left
          d[i + 3] = 255;
        }
      }
      octx.putImageData(od, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(out, 0, 0, cols, rows, 0, 0, W, H);
    }
    raf = requestAnimationFrame(drawFrame);
  }

  resize();
  const start = () => { if (!raf) raf = requestAnimationFrame(drawFrame); };
  video.addEventListener('loadeddata', start);
  video.addEventListener('play', start);
  if (video.readyState >= 2) start();

  if (!reduce) {
    const hero = canvas.closest('section');
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse.on = false; });
  }

  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
})();
