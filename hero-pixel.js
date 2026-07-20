/* Dithered pixel portrait for the hero (mauriciojuba.com-style).
   Renders assets/hero-portrait.png as chunky ordered-dither pixels with
   drifting noise "clouds" and a brightening halo around the cursor.
   Vanilla JS + canvas, no deps. To swap the photo, replace the asset. */
(function () {
  const canvas = document.getElementById('heroPixel');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');

  const CELL = 5;              // px per dither cell
  const IMG_SRC = 'assets/hero-portrait.png?v=2';
  const CLOUDS = 0.5;          // how much the noise clouds add/remove
  const MOUSE_RADIUS = 30;     // in cells
  const MOUSE_BOOST = 0.35;

  const off = document.createElement('canvas');
  const octx = off.getContext('2d');

  let W = 0, H = 0, cols = 0, rows = 0;
  let lum = null, alph = null;
  let mouse = { x: -1e4, y: -1e4 };
  let running = false, raf = null, t = Math.random() * 100;

  const img = new Image();
  img.src = IMG_SRC;

  function build() {
    const r = canvas.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);
    canvas.width = W;
    canvas.height = H;
    cols = Math.ceil(W / CELL);
    rows = Math.ceil(H / CELL);
    off.width = cols;
    off.height = rows;
    if (img.complete && img.naturalWidth) sample();
    render();
  }

  // Sample the portrait into per-cell luminance/alpha.
  // Zoomed out a touch and anchored to the bottom-right of the hero.
  function sample() {
    const c = document.createElement('canvas');
    c.width = cols; c.height = rows;
    const cx = c.getContext('2d');
    const s = (rows / img.height) * 0.82;   // 0.82 = slightly zoomed out
    const dw = img.width * s, dh = img.height * s;
    cx.drawImage(img, cols - dw, rows - dh, dw, dh);
    const d = cx.getImageData(0, 0, cols, rows).data;
    lum = new Float32Array(cols * rows);
    alph = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) {
      lum[i] = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;
      alph[i] = d[i * 4 + 3] / 255;
    }
  }

  // Cheap tiling value noise
  const GN = 64;
  const grid = new Float32Array(GN * GN);
  for (let i = 0; i < GN * GN; i++) grid[i] = Math.random();
  function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const g = (a, b) => grid[((b & 63) * GN) + (a & 63)];
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    return g(xi, yi) * (1 - u) * (1 - v) + g(xi + 1, yi) * u * (1 - v) +
           g(xi, yi + 1) * (1 - u) * v + g(xi + 1, yi + 1) * u * v;
  }

  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  function render() {
    if (!cols) return;
    const id = octx.createImageData(cols, rows);
    const d = id.data;
    const rct = canvas.getBoundingClientRect();
    const mx = (mouse.x - rct.left) / CELL;
    const my = (mouse.y - rct.top) / CELL;
    const dimL = cols * 0.42;    // clouds stay subtle behind the headline

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        const cloud = noise(x * 0.045 + t * 3, y * 0.045 + t * 1.6) * 0.55 +
                      noise(x * 0.014 - t * 2, y * 0.014 + t * 0.6) * 0.45;
        // ambient dark cloud everywhere; the portrait adds brightness on top
        let v = (cloud - 0.5) * CLOUDS + 0.06;
        if (lum) v += lum[i] * 0.9 * alph[i];

        const dx = x - mx, dy = y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
          v += (1 - Math.sqrt(d2) / MOUSE_RADIUS) * MOUSE_BOOST;
        }

        if (x < dimL) v *= 0.5 + 0.5 * (x / dimL);

        // ordered-dither texture, then map to a dark palette.
        // Every cell is drawn (opaque) so the page background never shows.
        v += ((BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16 - 0.5) * 0.14;
        const vv = v < 0 ? 0 : v > 1 ? 1 : v;
        const g = Math.round(12 + vv * 150);   // floor 12, max ~162 (no bright whites)
        d[i * 4] = g; d[i * 4 + 1] = g; d[i * 4 + 2] = g + 4; d[i * 4 + 3] = 255;
      }
    }
    octx.putImageData(id, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(off, 0, 0, cols, rows, 0, 0, cols * CELL, rows * CELL);
  }

  function frame() {
    t += 0.0016;
    render();
    raf = running ? requestAnimationFrame(frame) : null;
  }

  function start() {
    if (reduceMotion || running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  img.addEventListener('load', () => { sample(); render(); });
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mouse.x = e.clientX; mouse.y = e.clientY;
  }, { passive: true });

  // only animate while the hero is on screen
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => en.isIntersecting ? start() : stop());
  }, { threshold: 0.05 });
  io.observe(canvas);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });

  build();
})();
