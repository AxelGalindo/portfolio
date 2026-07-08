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
     'Construyamos <br> algo <span class="italic-serif">juntos</span>.'],

    // ---- qira-pagos.html ----
    ['The only digital wallet in Argentina where you can hold accounts in both <span style="color: var(--ink);">money</span> and <span class="italic-serif" style="color: var(--ink);">grains</span>.',
     'La única billetera digital de Argentina donde podés tener cuentas en <span style="color: var(--ink);">dinero</span> y en <span class="italic-serif" style="color: var(--ink);">granos</span>.'],
    ['A wallet <span class="italic-serif">purpose-built</span><br> for the Argentine agribusiness.',
     'Una billetera <span class="italic-serif">hecha a medida</span><br> para el agro argentino.'],
    ['Qira Pagos is a mobile-first digital wallet designed for Argentina\'s agricultural ecosystem, connecting <span style="color: var(--ink);">producers, distributors, grain operators, aggregators, exporters and businesses</span> around a single, simple product.',
     'Qira Pagos es una billetera digital mobile-first diseñada para el ecosistema agropecuario argentino, conectando <span style="color: var(--ink);">productores, distribuidores, operadores de granos, acopiadores, exportadores y comercios</span> alrededor de un producto único y simple.'],
    ['Unlike traditional wallets, Qira Pagos lets users transact in <span class="italic-serif" style="color: var(--ink);">two currencies</span> at once: pesos and grain volume. Users can pay, charge, transfer or exchange grains for money seamlessly, all inside a familiar mobile app, all connected to the broader QIRA agro platform.',
     'A diferencia de las billeteras tradicionales, Qira Pagos permite operar en <span class="italic-serif" style="color: var(--ink);">dos monedas</span> a la vez: pesos y volumen de granos. Los usuarios pueden pagar, cobrar, transferir o canjear granos por dinero sin fricción, todo dentro de una app mobile familiar, todo conectado a la plataforma agro QIRA.'],
    ['Designing a <span class="italic-serif">dual-currency</span> experience.',
     'Diseñar una experiencia <span class="italic-serif">bimonetaria</span>.'],
    ['The agricultural sector is deeply traditional but increasingly digital. Users range from young operators comfortable with mobile banking to seasoned producers who grew up with physical grain receipts. The wallet had to <span style="color: var(--ink);">feel familiar to both</span>.',
     'El sector agropecuario es profundamente tradicional pero cada vez más digital. Los usuarios van desde operadores jóvenes acostumbrados al banking móvil hasta productores criados con recibos de granos en papel. La billetera tenía que <span style="color: var(--ink);">resultar familiar para ambos</span>.'],
    ['Key <span class="italic-serif">screens</span>.',
     'Pantallas <span class="italic-serif">clave</span>.'],
    ['UX/UI <span class="italic-serif">end to end</span>.',
     'UX/UI <span class="italic-serif">de punta a punta</span>.'],
    ['Live on <span class="italic-serif">iOS &amp; Android</span>,<br> powering an ecosystem.',
     'En producción en <span class="italic-serif">iOS y Android</span>,<br> impulsando un ecosistema.'],
    ['Qira Pagos is live on both app stores and integrated into the broader <a href="https://www.qiraglobal.com" target="_blank" rel="noopener noreferrer" class="underline hover:text-white transition-colors" style="color: var(--ink);">QIRA global ecosystem</a>, giving agricultural users a single wallet that speaks their language: money and grains, side by side.',
     'Qira Pagos está disponible en ambas tiendas e integrada al <a href="https://www.qiraglobal.com" target="_blank" rel="noopener noreferrer" class="underline hover:text-white transition-colors" style="color: var(--ink);">ecosistema QIRA global</a>, dándole a los usuarios del agro una billetera que habla su idioma: dinero y granos, lado a lado.'],
    ['Want to <span class="italic-serif">talk</span> about a project?',
     '¿Querés <span class="italic-serif">hablar</span> sobre un proyecto?'],

    // ---- helios.html ----
    ['An <span class="italic-serif" style="color: var(--ink);">AI-powered</span> recruitment platform: designed, architected and built end to end.',
     'Una plataforma de reclutamiento <span class="italic-serif" style="color: var(--ink);">con IA</span>: diseñada, arquitecturada y construida de punta a punta.'],
    ['One person, <span class="italic-serif">two hats</span>:<br> designer and builder.',
     'Una persona, <span class="italic-serif">dos sombreros</span>:<br> diseñador y constructor.'],
    ['I joined as <span style="color: var(--ink);">UX/UI Designer</span> to shape the product from research to interface, and grew into the <span style="color: var(--ink);">Technical Lead</span> role, owning the platform architecture and building it hands-on in Bubble.io with OpenAI integrations. This case reflects that dual journey: the same person who drew the wireframes shipped the working product.',
     'Entré como <span style="color: var(--ink);">UX/UI Designer</span> para darle forma al producto desde la investigación hasta la interfaz, y crecí al rol de <span style="color: var(--ink);">Technical Lead</span>, haciéndome cargo de la arquitectura de la plataforma y construyéndola hands-on en Bubble.io con integraciones de OpenAI. Este caso refleja ese doble recorrido: la misma persona que dibujó los wireframes lanzó el producto funcionando.'],
    ['From zero to a working <span class="italic-serif">MVP</span>.',
     'De cero a un <span class="italic-serif">MVP</span> funcionando.'],
    ['Early-stage startups don\'t have the luxury of separate design and engineering tracks. Helios needed someone who could <span style="color: var(--ink);">design the experience and build it</span>: fast, without sacrificing craft.',
     'Las startups en etapa temprana no tienen el lujo de separar diseño e ingeniería. Helios necesitaba a alguien que pudiera <span style="color: var(--ink);">diseñar la experiencia y construirla</span>: rápido, sin sacrificar calidad.'],
    ['A brand system built<br>for <span class="italic-serif">trust and clarity</span>.',
     'Un sistema de marca construido<br>para <span class="italic-serif">confianza y claridad</span>.'],
    ['Designed <span class="italic-serif">and</span> shipped.',
     'Diseñado <span class="italic-serif">y</span> lanzado.'],
    ['A validated MVP,<br>built to <span class="italic-serif">keep evolving</span>.',
     'Un MVP validado,<br>construido para <span class="italic-serif">seguir evolucionando</span>.'],

    // ---- radium-rocket.html ----
    ['Two-plus years designing web and mobile products at an <span style="color: var(--ink);">engineering-driven</span> software agency.',
     'Más de dos años diseñando productos web y mobile en una agencia de software <span style="color: var(--ink);">con foco en ingeniería</span>.'],
    ['An extension of<br>the client\'s <span class="italic-serif">own team</span>.',
     'Una extensión del<br><span class="italic-serif">propio equipo</span> del cliente.'],
    ['As UX/UI Designer, I worked embedded in that model: designing for <span style="color: var(--ink);">multiple clients and products</span>, collaborating daily with product managers, developers and stakeholders across different industries and codebases.',
     'Como UX/UI Designer trabajé embebido en ese modelo: diseñando para <span style="color: var(--ink);">múltiples clientes y productos</span>, colaborando a diario con product managers, desarrolladores y stakeholders de distintas industrias y bases de código.'],
    ['<span style="color: var(--ink);">A note on confidentiality:</span> client projects at Radium Rocket are covered by NDAs, so I can\'t share screens publicly. I\'m happy to walk through selected work, process artifacts and outcomes in a conversation. Just ask.',
     '<span style="color: var(--ink);">Una nota sobre confidencialidad:</span> los proyectos de clientes en Radium Rocket están cubiertos por acuerdos de confidencialidad (NDA), así que no puedo compartir pantallas públicamente. Con gusto repaso trabajos seleccionados, artefactos de proceso y resultados en una conversación. Solo pedilo.'],
    ['Concept to <span class="italic-serif">implementation</span>.',
     'Del concepto a la <span class="italic-serif">implementación</span>.'],
    ['What the agency<br>years <span class="italic-serif">taught me</span>.',
     'Lo que los años de<br>agencia <span class="italic-serif">me enseñaron</span>.']
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
     'Diseñado y construido en Rosario, AR. Todos los derechos reservados. © 2026 · AXEL GALINDO DALAISÓN'],

    // ---- shared case-study chrome ----
    ['Case Study · 01', 'Caso de estudio · 01'],
    ['Case Study · 02', 'Caso de estudio · 02'],
    ['Experience · 03', 'Experiencia · 03'],
    ['Role', 'Rol'],
    ['Platform', 'Plataforma'],
    ['Industry', 'Industria'],
    ['Year', 'Año'],
    ['Type', 'Tipo'],
    ['Location', 'Ubicación'],
    ['Period', 'Período'],
    ['Overview', 'Resumen'],
    ['Context', 'Contexto'],
    ['The Challenge', 'El desafío'],
    ['My Role', 'Mi rol'],
    ['Outcome', 'Resultado'],
    ['Scope', 'Alcance'],
    ['Growth', 'Crecimiento'],
    ['Visual Language', 'Lenguaje visual'],
    ['Responsibilities', 'Responsabilidades'],
    ['Takeaways', 'Aprendizajes'],
    ['Screenshot placeholder', 'Captura pendiente'],
    ['Back', 'Volver'],
    ['Back to top', 'Volver a arriba'],
    ['All projects', 'Todos los proyectos'],
    ['Return to portfolio', 'Volver al portfolio'],
    ['Next case', 'Siguiente caso'],
    ['Previous case', 'Caso anterior'],
    ['Agro fintech wallet', 'Billetera fintech del agro'],
    ['AI-powered recruitment platform', 'Plataforma de reclutamiento con IA'],
    ['Agency client work', 'Trabajo para clientes en agencia'],

    // ---- qira-pagos.html ----
    ['Two currencies, one flow', 'Dos monedas, un solo flujo'],
    ['Present money and grain balances with equal clarity, without cognitive overload.',
     'Presentar saldos en dinero y en granos con la misma claridad, sin sobrecarga cognitiva.'],
    ['Diverse user base', 'Base de usuarios diversa'],
    ['One product that serves individual producers, large exporters and everything in between.',
     'Un producto que sirve a productores individuales, grandes exportadores y todo lo que hay en el medio.'],
    ['Trust in every screen', 'Confianza en cada pantalla'],
    ['Financial products live and die by trust: every state, error and confirmation had to reinforce it.',
     'Los productos financieros viven y mueren por la confianza: cada estado, error y confirmación tenía que reforzarla.'],
    ['Ecosystem integration', 'Integración con el ecosistema'],
    ['The wallet had to plug into the broader QIRA platform and its network of affiliated businesses.',
     'La billetera tenía que conectarse con la plataforma QIRA y su red de comercios adheridos.'],
    ['Full case study available on request. Includes flows, wireframes and design system.',
     'Case study completo disponible a pedido. Incluye flujos, wireframes y design system.'],
    ['I led the UX/UI design for Qira Pagos, working closely with product and engineering to translate a complex financial domain into a mobile experience that felt straightforward and trustworthy.',
     'Lideré el diseño UX/UI de Qira Pagos, trabajando codo a codo con producto e ingeniería para traducir un dominio financiero complejo en una experiencia mobile simple y confiable.'],
    ['User interviews with producers and operators to understand real transaction patterns.',
     'Entrevistas con productores y operadores para entender patrones reales de transacción.'],
    ['Mapping dual-currency flows: payments, transfers, grain exchange and history.',
     'Mapeo de flujos bimonetarios: pagos, transferencias, canje de granos e historial.'],
    ['Visual system, mobile screens and components for both iOS and Android.',
     'Sistema visual, pantallas mobile y componentes para iOS y Android.'],
    ['Prototyping', 'Prototipado'],
    ['Interactive prototypes to validate flows and reduce friction before build.',
     'Prototipos interactivos para validar flujos y reducir fricción antes del desarrollo.'],
    ['Currencies · money & grains', 'Monedas · dinero y granos'],
    ['Available on both stores', 'Disponible en ambas tiendas'],
    ['1 network', '1 red'],
    ['Integrated with the QIRA platform', 'Integrada con la plataforma QIRA'],

    // ---- helios.html ----
    ['Helios is an early-stage recruitment platform that uses AI to connect candidates and companies: analyzing CVs, generating structured feedback, and matching talent to open positions intelligently.',
     'Helios es una plataforma de reclutamiento en etapa temprana que usa IA para conectar candidatos y empresas: analiza CVs, genera feedback estructurado y hace matching inteligente de talento con posiciones abiertas.'],
    ['Three user roles, one platform', 'Tres roles de usuario, una plataforma'],
    ['Candidates, companies and recruiters/coaches, each with distinct flows, dashboards and permissions.',
     'Candidatos, empresas y reclutadores/coaches, cada uno con sus propios flujos, dashboards y permisos.'],
    ['AI as a core feature, not a gimmick', 'IA como funcionalidad central, no como truco'],
    ['CV analysis, feedback generation and intelligent matching needed careful prompt design and clear UX around AI outputs.',
     'El análisis de CVs, la generación de feedback y el matching inteligente requerían prompts cuidados y una UX clara alrededor de las salidas de la IA.'],
    ['No-code at production quality', 'No-code con calidad de producción'],
    ['Bubble.io architecture that stays maintainable as the product scales: data types, workflows, reusable elements and API connections.',
     'Arquitectura en Bubble.io que se mantiene sostenible a medida que el producto escala: tipos de datos, workflows, elementos reutilizables y conexiones API.'],
    ['Leading while building', 'Liderar mientras se construye'],
    ['Defining standards, documenting decisions, estimating roadmaps and onboarding teammates on no-code best practices.',
     'Definir estándares, documentar decisiones, estimar roadmaps y acompañar al equipo en buenas prácticas no-code.'],
    ["I defined Helios' visual identity: a deep navy foundation that communicates professionalism, energized by cyan and green for action and success states, and a dedicated violet reserved exclusively for AI-powered features, so users always know when the machine is speaking.",
     'Definí la identidad visual de Helios: una base navy profunda que comunica profesionalismo, energizada por cyan y verde para estados de acción y éxito, y un violeta dedicado exclusivamente a las funcionalidades con IA, para que los usuarios siempre sepan cuándo habla la máquina.'],
    ['Deep Navy · Core', 'Navy profundo · Base'],
    ['Azure · Primary', 'Azul · Primario'],
    ['Cyan · Action', 'Cyan · Acción'],
    ['Green · Success', 'Verde · Éxito'],
    ['Violet · AI Features', 'Violeta · Funciones IA'],
    ['Typeface: Manrope', 'Tipografía: Manrope'],
    ['Professional yet approachable', 'Profesional pero cercana'],
    ['Digitally native voice', 'Voz digitalmente nativa'],
    ['CV analysis & matching', 'Análisis de CVs y matching'],
    ['OpenAI integration for parsing CVs, generating candidate feedback and matching talent to positions: prompts, models and analysis flows.',
     'Integración con OpenAI para procesar CVs, generar feedback para candidatos y hacer matching de talento con posiciones: prompts, modelos y flujos de análisis.'],
    ['Multi-role dashboards', 'Dashboards multi-rol'],
    ['Wireframes and final UI for candidate, company and coach views: open positions, position detail and progress tracking.',
     'Wireframes y UI final para las vistas de candidato, empresa y coach: posiciones abiertas, detalle de posición y seguimiento de progreso.'],
    ['CV rendering engine', 'Motor de renderizado de CVs'],
    ['Dynamic CV display and download inside Bubble using structured data, custom delimiters and JavaScript parsing.',
     'Visualización y descarga dinámica de CVs dentro de Bubble usando datos estructurados, delimitadores custom y parsing con JavaScript.'],
    ['Notification system', 'Sistema de notificaciones'],
    ['Floating notification panel in the platform header with conditional data loading and bulk mark-as-read workflows.',
     'Panel flotante de notificaciones en el header de la plataforma, con carga condicional de datos y marcado masivo como leídas.'],
    ['Job description editor', 'Editor de descripciones de puesto'],
    ['Two-panel editor with live preview: companies write postings and see the final layout render in real time.',
     'Editor de dos paneles con vista previa en vivo: las empresas escriben la publicación y ven el layout final renderizarse en tiempo real.'],
    ['Premium landing page', 'Landing premium'],
    ['Conversion-focused landing for the premium service targeting company users, on-brand and structured for clarity.',
     'Landing enfocada en conversión para el servicio premium dirigido a empresas, alineada a la marca y estructurada para la claridad.'],
    ['Platform in active development. Screens shown reflect the MVP stage.',
     'Plataforma en desarrollo activo. Las pantallas reflejan la etapa de MVP.'],
    ['User roles · candidate, company, coach', 'Roles de usuario · candidato, empresa, coach'],
    ['Design → Build', 'Diseño → Desarrollo'],
    ['Full ownership, research to production', 'Ownership total, de la investigación a producción'],
    ['AI-native', 'Nativa en IA'],
    ['OpenAI at the core of the product', 'OpenAI en el corazón del producto'],
    ["Helios is in continuous validation: testing features, gathering feedback and refining the platform ahead of scale. As Technical Lead I keep translating business needs into clear tasks, estimations and roadmaps, while supporting the team's growth in no-code development.",
     'Helios está en validación continua: probando funcionalidades, recolectando feedback y refinando la plataforma antes de escalar. Como Technical Lead sigo traduciendo necesidades de negocio en tareas claras, estimaciones y roadmaps, mientras acompaño el crecimiento del equipo en desarrollo no-code.'],

    // ---- radium-rocket.html ----
    ['Software Agency', 'Agencia de software'],
    ["Radium Rocket is a software professional services company that builds engineering teams developing leading mobile and web products. It operates as a true extension of its clients' teams: identifying challenges, designing the product and building innovative software with agile engineering.",
     'Radium Rocket es una empresa de servicios profesionales de software que arma equipos de ingeniería para desarrollar productos mobile y web de primer nivel. Opera como una verdadera extensión de los equipos de sus clientes: identificando desafíos, diseñando el producto y construyendo software innovador con ingeniería ágil.'],
    ['Interface design for web & mobile', 'Diseño de interfaces para web y mobile'],
    ['Creating intuitive, impactful user interfaces aligned with business goals and user needs across client products.',
     'Crear interfaces intuitivas y de impacto, alineadas con los objetivos de negocio y las necesidades de los usuarios en los productos de los clientes.'],
    ['User research & usability testing', 'Investigación de usuarios y tests de usabilidad'],
    ['Gathering insights into user behaviors, preferences and pain points, and integrating findings into design solutions.',
     'Relevar comportamientos, preferencias y puntos de dolor de los usuarios, e integrar los hallazgos en las soluciones de diseño.'],
    ['End-to-end design process', 'Proceso de diseño de punta a punta'],
    ['Driving from concept through wireframes, prototyping and iteration to deliver high-quality experiences.',
     'Conducir desde el concepto, pasando por wireframes, prototipado e iteración, hasta entregar experiencias de alta calidad.'],
    ['Cross-functional collaboration', 'Colaboración interdisciplinaria'],
    ['Working closely with product managers, developers and stakeholders to define and prioritize UX initiatives.',
     'Trabajar de cerca con product managers, desarrolladores y stakeholders para definir y priorizar iniciativas de UX.'],
    ['Design standards & systems', 'Estándares y sistemas de diseño'],
    ['Collaborating with design leadership to establish and maintain standards, processes and methodologies across the organization.',
     'Colaborar con el liderazgo de diseño para establecer y mantener estándares, procesos y metodologías en toda la organización.'],
    ['User-centered methodologies', 'Metodologías centradas en el usuario'],
    ['Product building through design thinking, staying current on trends and advocating for best practices in the design process.',
     'Construcción de producto a través de design thinking, manteniéndome al día con tendencias e impulsando buenas prácticas en el proceso de diseño.'],
    ['Range across industries', 'Rango entre industrias'],
    ["Agency work means switching contexts constantly: different clients, users and constraints. It builds a designer's most underrated muscle: adapting fast without losing rigor.",
     'El trabajo de agencia implica cambiar de contexto constantemente: distintos clientes, usuarios y restricciones. Desarrolla el músculo más subestimado de un diseñador: adaptarse rápido sin perder rigor.'],
    ['Designing with engineers', 'Diseñar con ingenieros'],
    ['At an engineering-driven company, design earns its seat by shipping. I learned to design with implementation in mind, a mindset that later became my Technical Lead foundation.',
     'En una empresa con foco en ingeniería, el diseño se gana su lugar lanzando. Aprendí a diseñar con la implementación en mente, una mentalidad que después fue la base de mi rol de Technical Lead.'],
    ['Process as a product', 'El proceso como producto'],
    ['Contributing to org-wide design standards showed me that how a team designs matters as much as what it designs.',
     'Contribuir a los estándares de diseño de toda la organización me mostró que cómo diseña un equipo importa tanto como qué diseña.']
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
