# Outperform → Mezzita · sitio y oferta — Handoff · 2026-10-22

> Este hilo construyó y pivotó el sitio de ventas de Outperform Partners (Bolivia, equipo detrás de Levisoft; socios Alex/Alditz y Alejandro). Hoy el sitio vende UN producto para negocios de comida: «Pedidos con QR» (menú web propio donde el cliente pide y paga en el navegador, QR por mesa, delivery y recojo, Panel de pedidos y caja). Está en producción en GitHub Pages y verificado. La decisión más reciente: **renombrar la marca a Mezzita (mezzita.com, ya registrándose)**. El siguiente paso es ejecutar ese cambio de marca en todo el sitio y los activos.

## Goal
Tener un sitio que venda solo el producto de pedidos con QR a pizzerías, heladerías, restaurantes, bares y cafés y franquicias en Bolivia, con copy tipo Hormozi, demos interactivas premium y blog de captación; luego conectar el dominio propio. Ricardo (usuario) quiere un sparring partner: que le marquen puntos ciegos, con datos reales y fuentes, nunca cifras inventadas.

## Where we are now
- Producción: https://cardona-rb.github.io/outperform-site/ (repo `cardona-rb/outperform-site`, rama `main`, deploy por GitHub Actions a `gh-pages`). Último commit: «Demos: aviso de pantalla interactiva; flujos paso a paso como línea de tiempo numerada». Sin cambios pendientes.
- Vista previa artifact: https://claude.ai/artifact/GSVafRZBikgQmmtDH6ispU (v23).
- Dominio: outperform.business queda descartado. mezzita.com en registro. Aún no hay CNAME configurado (`deploy.env` → `CUSTOM_DOMAIN=` vacío). DNS para Pages: A 185.199.108.153/109/110/111, CNAME www → cardona-rb.github.io.
- Verificación: script Playwright recorre las 95 URLs del sitemap a 1440 y 390 px (status, errores de consola, desborde horizontal, imágenes rotas) y prueba los 5 demos de punta a punta. Último resultado: 0 problemas.

## Oferta aprobada (fuente de verdad del copy)
- Producto único «Pedidos con QR»: menú web propio con dominio, QR por mesa en PDF (el cliente lo imprime), pedido en mesa / delivery con zonas / recojo, cobro por QR bancario con CUCU en el navegador (nada entra a cocina sin pagar; en mesa el dueño puede permitir pago al final con el mesero), **Panel de pedidos y caja** incluido (celular, tablet o PC; estados; cierre del día; CSV y API propia; conectores a POS/contabilidad se cotizan aparte; **no hay integración a medida incluida**), ficha de Google Maps + placa QR/NFC de reseñas, reporte mensual, cambios de carta incluidos, soporte con una persona.
- Precio: instalación **2.900 Bs**; lanzamiento **2.000 Bs para los primeros 50 locales** (topado). **400 Bs/mes**. **5 % solo sobre lo cobrado por QR; 0 % sobre lo que cobra el mesero** (efectivo o QR del propio local). **Devolución: 50 % de la comisión se descuenta de la factura siguiente hasta recuperar la instalación, durante 12 meses; si no se recuperó, desde el mes 13 el 100 % hasta recuperarla.** Anual: pagas 10 meses, tienes 12.
- Tier 2 **«Con avisos por WhatsApp»: 600 Bs/mes + 5 % QR**: avisos de estado a clientes de delivery/recojo que lo autorizan y promociones a la base con permiso (hasta 4 campañas/mes). Reemplazó al módulo «Vuelven solos».
- Downsell «Solo delivery y recojo»: 0 Bs/mes, 8 % por pedido QR, misma instalación.
- Garantía «7 Días o No Pagas el Mes» (menú, QR, panel y cobro activos en 7 días hábiles o primer mes gratis). Sucursal adicional: 50 % de instalación + mensualidad propia (regla que puse yo; revisable).
- WhatsApp NO es canal de pedido ni de cocina. Solo: contacto con Outperform, avisos con permiso, promos con permiso. Consentimiento con casilla no marcada al terminar el pedido. Reseñas se piden a todos (no filtrar: política de Google).
- Pendiente de dato: comisión propia de CUCU (se declara «aparte, se informa antes de firmar»).

## Key decisions (con el porqué)
- **Solo comida** — foco en un ICP con dolor claro (comisión de apps 20-30 %, meseros, capturas falsas); se eliminaron hoteles, clínicas, estudios y vinotecas del sitio y del blog.
- **El pedido vive en el menú web, no en WhatsApp** — es más simple para el cliente y justifica los 2.900 Bs de instalación (la web es el centro). La demo y el teléfono del inicio muestran el navegador.
- **Un solo producto y un precio por escrito** — el análisis Hormozi previo mostró que los tres planes anteriores (1.300/5.070/11.050 Bs) fallaban la prueba de recuperación en 30 días; el modelo actual se financia con la comisión y la devolución alinea incentivos.
- **Paleta rojo intenso (#DA291C) + amarillo (#FFC72C)** estilo McDonald's, iconos de comida, patrón `.foodbg`.
- **Flujos como línea de tiempo numerada** (no diagrama de cajas): más legible en móvil; etiquetas Tu cliente / El sistema / Tu local / WhatsApp con permiso; decisiones con dos opciones y la comisión visible.
- **Mezzita como marca** — suena a «mesita» (QR en la mesa), corta, .com libre, memorable en el pie «Pedidos por Mezzita» de cada carta (canal de captación principal). Riesgo conocido: Mezzetta (marca de alimentos EE.UU.) fonéticamente igual; bajo riesgo legal en Bolivia por clases distintas, pero Google puede autocorregir al inicio. Menuzzito descartado (largo, describe solo el menú, suena a parodia). Razón social puede seguir siendo Outperform Partners.

## Done (en este hilo)
- Pivote completo del sitio: inicio, planes, servicios, demo, calculadora, empezar, garantías, términos, PDFs (checklist y contrato modelo), OG e iconos en rojo.
- Demo: 5 rubros con web mock premium cada uno (pizza estilo Pizza Planet, helado pastel, restaurante editorial, bar ámbar, franquicia rojo/amarillo), pantalla de pedidos interactiva dentro del teléfono (`assets/order.js`), panel del dueño con comisión/devolución/efectivo y comparador contra apps, flujos por modo, etiqueta «Demo interactiva».
- Blog: 76 guías (restaurantes 15, pizzerías 15, heladerías 15, bares y cafés 15, franquicias 15, general 1), escritas por subagentes Sonnet con brief; pasada posterior para alinear al producto web (41 posts). Cifras solo con fuente; lo no verificado quedó fuera.
- Investigación en `research/` (precios competencia, capacidad de pago, red de comisiones, análisis de oferta).

## Next / open
- **Next action: cambio de marca a Mezzita.** Checklist:
  1. Nombre y logotipo tipográfico «Mezzita» (proponer 2-3 versiones), favicon, apple-touch-icon, icon-192/512, OG (`scratchpad/og.html` → regenerar), portadas LinkedIn.
  2. Buscar y reemplazar en `src/`, `src/_partials/`, `build.py` (título, footer, JSON-LD, autor del blog), `assets/site.webmanifest`, PDFs (`pdf/checklist.html`, `pdf/contrato.html` → regenerar), `research/BRIEF_REDACCION.md`, los 76 posts (menciones de Outperform y CTA), demo (`demo.js`: pie «Pedidos con QR por Outperform»), CTAs de WhatsApp (data-wa).
  3. Mantener «del equipo detrás de Levisoft» y la sección de credenciales.
  4. `deploy.env` → `CUSTOM_DOMAIN=mezzita.com`, CNAME en dist, DNS (registros arriba), HTTPS en Pages. Decidir si el repo se renombra (`mezzita-site`); las URLs de Pages cambian si se renombra.
  5. Build, Playwright (95 URLs), commit, push, republicar artifact.
- **Open:** comisión de CUCU; handles @mezzita (Instagram, TikTok, Facebook) y búsqueda SENAPI clases 9/35/42 antes de anunciar; regla de sucursal adicional; si el post de eventos de bar debe reservar desde el menú web en vez de WhatsApp manual.
- **Parked:** zip para Alex (se generó antes del pivote; regenerar si lo pide); integración ERP descartada; dato real de comisiones PedidosYa/Yango para el blog.

## How we work together
- Ricardo escribe en español; responder en **español neutro**, voz «tú» en el sitio, sin modismos argentinos, **sin guiones largos** en copy, sin emojis.
- **Sparring partner**: marcar puntos ciegos y argumentos débiles, citar expertos/fuentes reales, nunca inventar datos; si un dato no está verificado, decirlo.
- Autonomía: «push to prod cuando esté listo, sin revisar conmigo». Cuidar tokens: **subagentes en Sonnet** para redacción masiva; el trabajo de diseño/código lo hace el modelo principal.
- Commits como `Outperform Partners <cardona-rb@users.noreply.github.com>` (email privado de GitHub); no mencionar modelo en commits.
- Antes de empujar: `python3 build.py` y el check de Playwright. Build falla si hay JSON inválido o un `#` suelto en prosa.
- Sus gustos: elementos premium (vidrio entintado, stickers, sellos), botones de WhatsApp en verde #25D366, QR por mesa como gancho visual, ticket «Mesa 12 · #482193» en el hero, comparativa «Hoy / En 7 días hábiles».

## Key files & pointers
- `build.py` — generador estático; `RUBROS` (blog), `ICONS` (`{{icon:nombre}}`), partials `{{include:x}}`, `SITE_BASE`/`deploy.env`.
- `src/01-index.html`, `02-planes.html`, `04-demo.html`, `10-servicios.html`, `15-calculadora.html`, `16-empezar.html`, `14-garantias.html`, `11-terminos.html`.
- `src/_partials/flows.html` (línea de tiempo mesa/delivery), `flowmap.html` (SVG animado), `seal.html`, `credenciales-levisoft.html`, `logoband.html`, `cta-empezar.html`.
- `assets/order.js` (pantalla de pedidos; modo auto en inicio, live en demo), `assets/demo.js` (RUBROS, webs mock, panel del dueño), `assets/calculadora.js`, `assets/site.js`, `assets/site.css` (v4→v23, ~1.5k líneas), `assets/demo/*.webp` (fotos Unsplash por tema), `assets/docs/*.pdf`.
- `src/blog/<rubro>/<slug>.html` — 76 posts; `research/BRIEF_REDACCION.md` (reglas de redacción), `research/PLAN_BLOGS_COMIDA.md`, `research/restaurantes.md` (datos con fuente), `research/ANALISIS_OFERTA_2026-10.html`.
- `AUDIT.md` — bitácora de versiones.
- Scripts de verificación (recrear en local si hace falta): Playwright `check.js` (sitemap × 2 viewports + demos), `gen.js` (PDFs vía `pdf/*.html`, OG vía `og.html`, iconos vía `favicon.svg`). Servir `dist/` con `python3 -m http.server 8765 --directory dist`.
- Skills usadas: `anthropic-skills:handoff` (este documento); Artifact para la vista previa; subagentes Sonnet para el blog; marcos Hormozi (ecuación de valor, adquisición financiada por el cliente, garantía y devolución) para la oferta.

## Resume in a new thread
«Lee `HANDOFF-2026-10-22-mezzita.md` en la raíz del repo `outperform-site` y continúa con el cambio de marca a Mezzita (checklist del Next action). Mismo estilo: sparring partner, español neutro, push a main cuando esté verificado.»
