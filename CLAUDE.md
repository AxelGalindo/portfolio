# Portfolio de Axel Galindo — Contexto del proyecto

## Qué es esto
Portfolio profesional de Axel Galindo Dalaisón (UX/UI Designer & Design Lead, Rosario, Argentina). Sitio estático en HTML + Tailwind CSS (vía CDN) + un CSS compartido. Sin frameworks, sin build step. Ya está en producción: GitHub → Vercel con auto-deploy.

## Estructura
- `index.html` — Landing principal: Hero, Selected Work (3 cards), Design Process, Experience, Skills, About, Contact.
- `qira-pagos.html` — Case study: billetera fintech del agro argentino (dinero + granos), rol UX/UI Designer, 2024, mobile iOS/Android.
- `helios.html` — Case study estrella: plataforma de reclutamiento con IA (Bubble.io + OpenAI). Axel fue UX/UI Designer y luego Design Lead. Incluye el brand system real de Helios.
- `radium-rocket.html` — Página de experiencia (no case study): 2+ años como UX/UI Designer en agencia. Los proyectos están bajo NDA — nunca inventar clientes ni screens.
- `styles.css` — Design system compartido por todas las páginas. Cualquier cambio de tokens/estilos globales va acá, NO duplicado en los HTML. Se referencia con `?v=N` (cache busting): al cambiarlo, subir el número en las 4 páginas.
- `dots.js` — Fondo interactivo de puntitos (canvas) + pintado de secciones claras con transición gradiente.
- `ui.js` — Botón flotante "back to top" + nav adaptativo sobre secciones claras.
- `i18n.js` — Toggle de idioma EN/ES (botón en el header, persiste en localStorage). El inglés vive en el HTML; el español en los diccionarios RICH/TEXT de este archivo. El index está traducido completo; los case studies (helios, qira, radium) todavía NO tienen diccionario.
- `assets/` — `logo.png` (logo circular "A"), `axel-cat.png` (avatar 3D del About). Screenshots de proyectos siguen pendientes (placeholders con gradientes).

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
- Idioma del sitio: inglés por defecto (audiencia: reclutadores internacionales), con toggle a español vía i18n.js. Axel habla en español en el chat.
- Email de contacto: axelgalindo1998@gmail.com
- Tono: profesional, directo, sin inflar.

## Deploy y flujo de trabajo
- **GitHub → Vercel auto-deploy.** Cada push a `main` publica en producción automáticamente (~30 seg).
- **Flujo acordado con Axel:** trabajar cambios en una rama `dev` → Vercel genera preview URL automática → Axel revisa y confirma → recién ahí merge a `main`. **Nunca pushear directo a `main` sin confirmación explícita de Axel.**
- Commits: mensajes cortos y descriptivos en inglés (ej: `Add Qira screenshots`, `Fix mobile nav spacing`).

## Pendientes conocidos
1. Screenshots: ~~Qira~~ hecho (4 pantallas reales de Behance en `assets/qira-*.jpg` + `qira-cover.jpg`). Tapas de work cards (Qira/Helios/Radium) hechas. Helios case study cover hecho (brand book). PENDIENTE: las 4 pantallas internas de la app Helios (coach dashboard, open positions, CV analysis, position detail) siguen en "Coming soon" — están detrás del login, Axel las tiene que pasar.
2. ~~Reemplazar el círculo "AG" del About~~ Hecho: avatar 3D de Axel con gato (`assets/axel-cat.png`, PNG transparente).
3. Agregar Open Graph tags + favicon + sitemap.xml.
4. ~~Comprar y conectar dominio~~ Hecho (2026-07-09): producción en https://www.axelgalindo.com (Namecheap + Vercel, el apex redirige a www).
5. A futuro: case study público de Helios más profundo cuando el producto lo permita.

## Qué NO hacer
- No agregar frameworks, bundlers ni dependencias — el valor es la simpleza (HTML + CSS + JS vanilla).
- No cambiar tipografías ni paleta sin que Axel lo pida.
- No tocar fechas, roles ni datos de experiencia (son datos reales de CV).
- No publicar a producción (`main`) sin confirmación explícita de Axel.
