/* Localized chromatic glitch. The hero video shows crisp underneath; this
   canvas overlay is transparent except for a soft patch around the cursor,
   where the video's RGB channels are split for a digital glitch. The patch
   fades at its edges so it blends into the crisp video. Vanilla JS, no deps. */
(function () {
  const video = document.getElementById('heroVideo');
  const canvas = document.getElementById('heroChroma');
  if (!video || !canvas) return;

  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ctx = canvas.getContext('2d');

  const patch = document.createElement('canvas');
  const pctx = patch.getContext('2d', { willReadFrequently: true });
  const mask = document.createElement('canvas');
  const mctx = mask.getContext('2d');

  const R = 170;         // patch radius on screen (px)
  const MAXSHIFT = 9;    // max RGB shift (px) at the patch centre

  let W, H, dpr = 1, outImg = null;
  const mouse = { x: -1e4, y: -1e4, on: false };
  let raf = null;

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = 1; // overlay is soft; device-pixel scaling not needed and keeps it cheap
    W = Math.round(r.width); H = Math.round(r.height);
    canvas.width = W; canvas.height = H;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const d = R * 2;
    patch.width = d; patch.height = d;
    mask.width = d; mask.height = d;
    outImg = pctx.createImageData(d, d);
    // radial alpha mask (opaque centre → transparent edge)
    const g = mctx.createRadialGradient(R, R, 0, R, R, R);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.62, 'rgba(0,0,0,1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    mctx.clearRect(0, 0, d, d);
    mctx.fillStyle = g;
    mctx.fillRect(0, 0, d, d);
  }

  // map a hero-space point to video source coords (object-fit: cover)
  function coverMap(hx, hy) {
    const vw = video.videoWidth, vh = video.videoHeight;
    const scale = Math.max(W / vw, H / vh);
    const offX = (W - vw * scale) / 2, offY = (H - vh * scale) / 2;
    return { sx: (hx - offX) / scale, sy: (hy - offY) / scale, scale };
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    if (mouse.on && video.readyState >= 2 && video.videoWidth) {
      const d = R * 2;
      const cx = mouse.x, cy = mouse.y;
      const m = coverMap(cx - R, cy - R);
      const srcW = d / m.scale;
      // draw the video region under the patch into the patch buffer
      pctx.clearRect(0, 0, d, d);
      pctx.drawImage(video, m.sx, m.sy, srcW, srcW, 0, 0, d, d);
      const a = pctx.getImageData(0, 0, d, d).data;
      const b = outImg.data;
      const R2 = R * R;
      for (let y = 0; y < d; y++) {
        const dy = y - R;
        const rowBase = y * d;
        for (let x = 0; x < d; x++) {
          const dx = x - R;
          const d2 = dx * dx + dy * dy;
          const i = (rowBase + x) * 4;
          if (d2 >= R2) { b[i + 3] = 0; continue; }
          const sh = ((1 - Math.sqrt(d2) / R) * MAXSHIFT) | 0;
          const xr = x + sh < d ? x + sh : d - 1;
          const xb = x - sh >= 0 ? x - sh : 0;
          b[i]     = a[(rowBase + xr) * 4];
          b[i + 1] = a[i + 1];
          b[i + 2] = a[(rowBase + xb) * 4 + 2];
          b[i + 3] = 255;
        }
      }
      pctx.putImageData(outImg, 0, 0);
      // fade the patch edges with the radial mask
      pctx.globalCompositeOperation = 'destination-in';
      pctx.drawImage(mask, 0, 0);
      pctx.globalCompositeOperation = 'source-over';
      // place it over the crisp video
      ctx.drawImage(patch, cx - R, cy - R, d, d);
    }
    raf = mouse.on ? requestAnimationFrame(frame) : null;
  }
  function wake() { if (!raf) raf = requestAnimationFrame(frame); }

  resize();

  const hero = canvas.closest('section');
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || reduceMQ.matches) return;
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.on = true;
    wake();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { mouse.on = false; });

  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
})();
