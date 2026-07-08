# Portfolio de Axel Galindo — Contexto del proyecto

## Qué es esto
Portfolio profesional de Axel Galindo Dalaisón (UX/UI Designer & Technical Lead, Rosario, Argentina). Sitio estático en HTML + Tailwind CSS (vía CDN) + un CSS compartido. Sin frameworks, sin build step. Ya está en producción: GitHub → Vercel con auto-deploy.

## Estructura
- `index.html` — Landing principal: Hero, Selected Work (3 cards), Design Process, Experience, Skills, About, Contact.
- `qira-pagos.html` — Case study: billetera fintech del agro argentino (dinero + granos), rol UX/UI Designer, 2024, mobile iOS/Android.
- `helios.html` — Case study estrella: plataforma de reclutamiento con IA (Bubble.io + OpenAI). Axel fue UX/UI Designer y luego Technical Lead. Incluye el brand system real de Helios.
- `radium-rocket.html` — Página de experiencia (no case study): 2+ años como UX/UI Designer en agencia. Los proyectos están bajo NDA — nunca inventar clientes ni screens.
- `styles.css` — Design system compartido por todas las páginas. Cualquier cambio de tokens/estilos globales va acá, NO duplicado en los HTML.
- `assets/` — Imágenes (screenshots de proyectos, foto de Axel). Hoy hay placeholders en el código con comentarios `REPLACE WITH SCREENSHOT` indicando el `<img>` exacto.

## Design system (respetar siempre)
- **Modo:** dark only. Fondo `#0a0a0b`.
- **Tipografías:** Manrope (display 600 con tracking -0.04em + body), Fraunces *italic* (weight 450, optical sizing auto) solo para palabras acento dentro de headlines (clase `.italic-serif`), Manrope 700 uppercase para eyebrows (clase `.eyebrow`), JetBrains Mono para meta (clase `.mono`).
- **Tokens CSS** (en `:root` de styles.css): `--bg`, `--ink`, `--ink-muted`, `--ink-faint`, `--border`, `--border-strong`, `--accent: #8b5cf6` (violeta), `--accent-2: #22d3ee` (cyan). Los acentos de color se usan con mucha mesura.
- **Colores de marca Helios** (solo en helios.html): navy `#001F5E`, azure `#00378E`, cyan `#2CD2FF`, verde `#64F495`, violeta IA `#796CF9`.
- **Componentes:** `.btn-primary` / `.btn-ghost`, `.chip`, `.project-card`, `.screenshot-frame`, `.metric-card`, `.reveal` (scroll animations con IntersectionObserver), `.orb` (blobs de gradiente animados).
- Estética: Stripe/Linear/Vercel en dark mode. Minimalista, mucho espacio negativo, animaciones sutiles.

## Reglas de contenido
- **Nunca inventar información.** Todo sale del CV real de Axel, su LinkedIn (linkedin.com/in/axel-galindo-dalaison) y Behance (behance.net/axel-galindo).
- Radium Rocket: proyectos bajo NDA, mantener la nota de confidencialidad.
- Idioma del sitio: inglés (audiencia: reclutadores internacionales). Axel habla en español en el chat.
- Email de contacto: axelgalindo1998@gmail.com
- Tono: profesional, directo, sin inflar.

## Deploy y flujo de trabajo
- **GitHub → Vercel auto-deploy.** Cada push a `main` publica en producción automáticamente (~30 seg).
- **Flujo acordado con Axel:** trabajar cambios en una rama `dev` → Vercel genera preview URL automática → Axel revisa y confirma → recién ahí merge a `main`. **Nunca pushear directo a `main` sin confirmación explícita de Axel.**
- Commits: mensajes cortos y descriptivos en inglés (ej: `Add Qira screenshots`, `Fix mobile nav spacing`).

## Pendientes conocidos
1. Reemplazar placeholders de screenshots (Qira: formato 9:16 mobile; Helios: 16:10 web) — Axel tiene capturas de ambos.
2. ~~Reemplazar el círculo "AG" del About~~ Hecho: avatar 3D de Axel con gato (`assets/axel-cat.png`, PNG transparente).
3. Agregar Open Graph tags + favicon + sitemap.xml.
4. Comprar y conectar dominio (candidato: axelgalindo.com) — lo hace Axel manualmente, no automatizar.
5. A futuro: case study público de Helios más profundo cuando el producto lo permita.

## Qué NO hacer
- No agregar frameworks, bundlers ni dependencias — el valor es la simpleza (HTML + CSS + JS vanilla).
- No cambiar tipografías ni paleta sin que Axel lo pida.
- No tocar fechas, roles ni datos de experiencia (son datos reales de CV).
- No publicar a producción (`main`) sin confirmación explícita de Axel.
