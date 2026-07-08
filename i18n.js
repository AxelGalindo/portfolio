/* EN <-> ES language toggle. No deps.
   Two dictionaries:
   - RICH: matched against a whole element's innerHTML (headlines with inline spans).
   - TEXT: matched against individual text nodes anywhere in the page.
   English lives in the HTML; Spanish lives here. Originals are stored in
   WeakMaps so switching back to EN is a pure restore. */
(function () {
  const RICH = [
    ['Designing digital products where <span class="italic-serif text-white">experience</span>, <span class="italic-serif text-white">logic</span> &amp; <span class="italic-serif text-white">craft</span> converge.',
     'Diseño productos digitales donde <span class="italic-serif text-white">experiencia</span>, <span class="italic-serif text-white">lógica</span> y <span class="italic-serif text-white">oficio</span> convergen.'],
    ['I\'m <span style="color: var(--ink);">Axel Galindo</span>, UX/UI Designer and Technical Lead. I design with Figma, build with Bubble.io, and integrate AI. One profile, the whole product.',
     'Soy <span style="color: var(--ink);">Axel Galindo</span>, UX/UI Designer y Technical Lead. Diseño con Figma, construyo con Bubble.io e integro IA. Un solo perfil, el producto completo.'],
    ['Recent <span class="italic-serif">projects</span>.',
     'Proyectos <span class="italic-serif">recientes</span>.'],
    ['From research <br>to a working <span class="italic-serif">product</span>.',
     'De la investigación <br>a un <span class="italic-serif">producto</span> funcionando.'],
    ['A <span class="italic-serif">decade</span> of<br>design &amp; building.',
     'Una <span class="italic-serif">década</span> de<br>diseño y construcción.'],
    ['A hybrid <span class="italic-serif">toolkit</span>.',
     'Un <span class="italic-serif">toolkit</span> híbrido.'],
    ['I like building <span class="italic-serif">useful</span>, <span class="italic-serif">thoughtful</span> products.',
     'Me gusta construir productos <span class="italic-serif">útiles</span> y <span class="italic-serif">pensados</span>.'],
    ['Let\'s build <br> something <span class="italic-serif">together</span>.',
     'Construyamos <br> algo <span class="italic-serif">juntos</span>.']
  ];

  const TEXT = [
    ['Work', 'Trabajos'],
    ['Process', 'Proceso'],
    ['Experience', 'Experiencia'],
    ['About', 'Sobre mí'],
    ['Contact', 'Contacto'],
    ['Back to portfolio', 'Volver al portfolio'],
    ['View selected work', 'Ver trabajos seleccionados'],
    ['Get in touch', 'Escribime'],
    ['Currently', 'Actualmente'],
    ['Previously', 'Antes'],
    ['Selected Work', 'Trabajos seleccionados'],
    ["A curated selection of interfaces and products I've designed and shipped between 2022 and 2025.",
     'Una selección curada de interfaces y productos que diseñé y lancé entre 2022 y 2025.'],
    ['Fintech · Mobile App', 'Fintech · App móvil'],
    ['AI SaaS · Web Platform', 'SaaS con IA · Plataforma web'],
    ['Agency · Web & Mobile', 'Agencia · Web y móvil'],
    ["UX/UI design for Argentina's agro fintech wallet: the only digital wallet with accounts in both money and grains.",
     'Diseño UX/UI para la billetera fintech del agro argentino: la única billetera digital con cuentas en dinero y en granos.'],
    ['Technical lead & UX/UI designer for an AI-powered recruitment platform built on Bubble.io with OpenAI integrations.',
     'Technical lead y diseñador UX/UI de una plataforma de reclutamiento con IA construida en Bubble.io con integraciones de OpenAI.'],
    ['Client Work @ Radium Rocket', 'Trabajo para clientes @ Radium Rocket'],
    ['Two years and three months as UX/UI Designer at an engineering-driven software agency in Rosario. Interfaces for web and mobile, user research, usability testing, and design system contributions.',
     'Dos años y tres meses como UX/UI Designer en una agencia de software con foco en ingeniería en Rosario. Interfaces web y mobile, investigación de usuarios, tests de usabilidad y aportes al design system.'],
    ['Read case study', 'Leer case study'],
    ['Read more', 'Leer más'],
    ['View full archive on Behance', 'Ver archivo completo en Behance'],
    ['Design Process', 'Proceso de diseño'],
    ['A pragmatic, iterative process. Less about rigid phases, more about moving between discovery, design and delivery with intent.',
     'Un proceso pragmático e iterativo. Menos fases rígidas y más movimiento entre descubrimiento, diseño y entrega con intención.'],
    ['STEP', 'PASO'],
    ['Research', 'Investigación'],
    ['User interviews, analytics review and stakeholder alignment to understand the real problem before touching the canvas.',
     'Entrevistas con usuarios, análisis de métricas y alineación con stakeholders para entender el problema real antes de tocar el lienzo.'],
    ['Strategy', 'Estrategia'],
    ['Translating business and user needs into clear priorities, success criteria and a plan the team can actually execute.',
     'Traducir las necesidades del negocio y de los usuarios en prioridades claras, criterios de éxito y un plan que el equipo realmente pueda ejecutar.'],
    ['UX Flows', 'Flujos UX'],
    ['Mapping user journeys, information architecture and interaction logic before any pixel decisions.',
     'Mapear recorridos de usuario, arquitectura de información y lógica de interacción antes de cualquier decisión de píxeles.'],
    ['Low-fidelity structure to validate flow, hierarchy and scope early: fast feedback, cheap changes.',
     'Estructura de baja fidelidad para validar flujo, jerarquía y alcance temprano: feedback rápido, cambios baratos.'],
    ['UI Design', 'Diseño UI'],
    ['Crafting visual systems, components and final interfaces with attention to hierarchy, type and motion.',
     'Crear sistemas visuales, componentes e interfaces finales con atención a la jerarquía, la tipografía y el movimiento.'],
    ['Prototype & Iterate', 'Prototipar e iterar'],
    ['Interactive prototypes, usability testing and build iteration, refining the product until it works for the people using it.',
     'Prototipos interactivos, tests de usabilidad e iteración sobre el build, refinando el producto hasta que funciona para quienes lo usan.'],
    ['Timeline', 'Recorrido'],
    ['Leading the technical build of an AI-powered MVP: defining architecture, integrating OpenAI APIs for CV analysis and intelligent matching, building the platform in Bubble.io, and supporting the team on no-code best practices.',
     'Liderando la construcción técnica de un MVP con IA: definiendo la arquitectura, integrando APIs de OpenAI para análisis de CVs y matching inteligente, construyendo la plataforma en Bubble.io y acompañando al equipo en buenas prácticas no-code.'],
    ['User research, UX flows, wireframes, UI design, usability testing and design systems. Close collaboration with product and development to ship each iteration of the MVP.',
     'Investigación de usuarios, flujos UX, wireframes, diseño UI, tests de usabilidad y design systems. Colaboración estrecha con producto y desarrollo para lanzar cada iteración del MVP.'],
    ['Designed intuitive interfaces for web and mobile at an engineering-driven agency. Ran user research and usability tests, drove the process from concept to implementation, and contributed to design standards across the organization.',
     'Diseñé interfaces intuitivas para web y mobile en una agencia con foco en ingeniería. Llevé adelante investigación de usuarios y tests de usabilidad, conduje el proceso de concepto a implementación y contribuí a los estándares de diseño de la organización.'],
    ['Freelance Designer', 'Diseñador freelance'],
    ['Graphic design for social media, brand identity work, and web design projects, including Comercial CAB (content creation and Mercado Libre operations, 2020–2022) and Novo Ratio (web + brand redesign, 2020–2021).',
     'Diseño gráfico para redes sociales, identidad de marca y proyectos de diseño web, incluyendo Comercial CAB (creación de contenido y operación de Mercado Libre, 2020–2022) y Novo Ratio (rediseño web y de marca, 2020–2021).'],
    ['Skills & Tools', 'Habilidades y herramientas'],
    ["Designing and building isn't separate. The tools reflect that.",
     'Diseñar y construir no van por separado. Las herramientas lo reflejan.'],
    ['Design', 'Diseño'],
    ['Build', 'Desarrollo'],
    ['AI & Product', 'IA y producto'],
    ["I'm Axel, a UX/UI designer and Technical Lead based in Rosario. I combine UX/UI, technical judgment and strategic thinking to connect real needs with practical solutions.",
     'Soy Axel, diseñador UX/UI y Technical Lead en Rosario. Combino UX/UI, criterio técnico y pensamiento estratégico para conectar necesidades reales con soluciones prácticas.'],
    ["Over the last few years I designed interfaces at Radium Rocket, and today I'm leading the technical build of Helios, an MVP on Bubble.io with OpenAI integrations. I enjoy supporting teams, organizing processes and finding the simplest way to solve complex problems.",
     'En los últimos años diseñé interfaces en Radium Rocket, y hoy lidero la construcción técnica de Helios, un MVP en Bubble.io con integraciones de OpenAI. Disfruto acompañar equipos, ordenar procesos y encontrar la forma más simple de resolver problemas complejos.'],
    ["Outside of work, I'm usually playing video games, watching movies, or wandering around the city on weekends. I'm also a big food lover: always up for discovering the next good meal.",
     'Fuera del trabajo, seguramente esté jugando videojuegos, mirando películas o caminando por la ciudad los fines de semana. También soy muy fan de la comida: siempre listo para descubrir la próxima buena comida.'],
    ['Full-time, freelance or a quick chat. Drop a line.',
     'Full-time, freelance o una charla rápida. Escribime.'],
    ['Copy', 'Copiar'],
    ['Designed & built in Rosario, AR. All rights reserved. © 2026 · AXEL GALINDO DALAISÓN',
     'Diseñado y construido en Rosario, AR. Todos los derechos reservados. © 2026 · AXEL GALINDO DALAISÓN']
  ];

  const norm = s => s.replace(/\s+/g, ' ').trim();
  const richToEs = new Map(RICH.map(([en, es]) => [norm(en), es]));
  const textToEs = new Map(TEXT.map(([en, es]) => [norm(en), es]));

  const savedRich = new WeakMap();  // element -> original EN innerHTML
  const savedText = new WeakMap();  // text node -> original EN nodeValue
  const touchedRich = new Set();
  const touchedText = new Set();

  function toSpanish() {
    document.querySelectorAll('h1, h2, h3, p, span[data-i18n]').forEach(el => {
      const key = norm(el.innerHTML);
      const es = richToEs.get(key);
      if (es) {
        savedRich.set(el, el.innerHTML);
        touchedRich.add(el);
        el.innerHTML = es;
      }
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement && ['SCRIPT', 'STYLE'].includes(n.parentElement.tagName))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let n;
    while ((n = walker.nextNode())) {
      const es = textToEs.get(norm(n.nodeValue));
      if (es) {
        savedText.set(n, n.nodeValue);
        touchedText.add(n);
        n.nodeValue = es;
      }
    }
  }

  function toEnglish() {
    touchedRich.forEach(el => { if (savedRich.has(el)) el.innerHTML = savedRich.get(el); });
    touchedText.forEach(nd => { if (savedText.has(nd)) nd.nodeValue = savedText.get(nd); });
    touchedRich.clear();
    touchedText.clear();
  }

  let lang = localStorage.getItem('lang') || 'en';
  const btn = document.getElementById('langToggle');

  function render() {
    document.documentElement.lang = lang;
    if (btn) {
      btn.textContent = lang === 'en' ? 'ES' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar idioma a español' : 'Switch language to English');
    }
  }

  function setLang(next) {
    if (next === lang) return;
    if (next === 'es') toSpanish(); else toEnglish();
    lang = next;
    localStorage.setItem('lang', lang);
    render();
  }

  btn?.addEventListener('click', () => setLang(lang === 'en' ? 'es' : 'en'));

  if (lang === 'es') toSpanish();
  render();
})();
