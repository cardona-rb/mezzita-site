# Brief de redacción · blog Mezzita (leer completo antes de escribir)

## Qué es cada post
Un archivo HTML en `src/blog/<rubro>/<slug>.html`. El sistema de build agrega solo: h1, lede, índice, FAQ, fuentes, autor, CTA, relacionados y JSON-LD. Tú escribes SOLO el comentario JSON de metadatos y el cuerpo (prosa HTML). Nada de `<html>`, `<article>`, `<h1>` ni `<div class="prose">`.

## Formato exacto del archivo
```
<!--{"title":"Título SEO con Bolivia o ciudad | Mezzita","desc":"Meta description de 140 a 160 caracteres, con la keyword, en tú.","h1":"Título visible (puede ser más largo que el title, sin Mezzita)","lede":"Una o dos frases que prometen el resultado concreto de leer la guía.","date":"2026-10-21","tags":["Tag uno","Tag dos","Tag tres"],"faq":[{"q":"¿Pregunta real que la gente busca?","a":"Respuesta directa de 40 a 70 palabras, sin HTML."},{"q":"...","a":"..."},{"q":"...","a":"..."}],"sources":[{"t":"Nombre de la fuente, año","u":"https://..."},{"t":"...","u":"https://..."}]}-->
<p>Párrafo de apertura...</p>
<h2>Primer H2</h2>
...
```
- El JSON debe ser válido (comillas dobles, sin comas finales). Sin saltos de línea dentro de los valores.
- `title` ≤ 60 caracteres antes de " | Mezzita" (ese sufijo lo pones tú, cuenta aparte). Incluye "Bolivia" o una ciudad boliviana.
- `desc` 140 a 160 caracteres.
- `date`: usa la fecha que te asignen para cada post (escalonadas).
- `faq`: 3 a 5 preguntas reales (las que Google muestra como "Otras preguntas"). Van también al JSON-LD FAQPage, así que deben ser respuestas completas y veraces.
- `sources`: 3 a 6 URLs REALES. Tómalas de `research/restaurantes.md` o encuéntralas con WebSearch (BCB, INE, ASFI, SIN/SIAT, prensa boliviana como El Deber, Los Tiempos, La Razón, Opinión, EJU, Unitel, Red Uno; estudios de Statista, Rappi/PedidosYa solo si la URL es real y la viste en un resultado de búsqueda). No inventes URLs ni cifras. Si una cifra está marcada UNVERIFIED/VERIFICAR en la investigación, NO la uses como número: escribe "según estimaciones del sector" o pide el dato al lector, sin cifra.

## Cuerpo (prosa HTML)
- 1.100 a 1.600 palabras. Español neutro (nada de "vos", "laburo", "plata" en sentido argentino; se dice "dinero", "trabajo", "celular", "negocio").
- Voz "tú". Frases cortas. Una idea por frase. Sin guiones largos (—). Sin emojis. Sin palabras de relleno tipo "en el mundo actual".
- Etiquetas permitidas: `<p> <h2> <h3> <ul> <ol> <li> <strong> <em> <a> <table> <thead> <tbody> <tr> <th> <td> <blockquote> <aside class="dato"> <p class="nota">`.
- 6 a 9 `<h2>` siguiendo el outline de la investigación. Los H2 deben contener palabras que la gente busca, no títulos ingeniosos.
- Un `<aside class="dato"><b>Dato Bolivia</b> ...</aside>` con el hecho local más fuerte del post, con su fuente nombrada en el texto ("según el BCB", "según el INE").
- Una `<table>` cuando compares opciones, costos o pasos (al menos en los posts de comparación).
- Una `<p class="nota">` cuando el tema sea legal o tributario: "Esto es una guía práctica, no asesoría legal/contable. Confírmalo con tu abogado/contador."
- Enlaces internos obligatorios, integrados en frases naturales (no "haz clic aquí"):
  - 1 a `/diagnostico/` (la radiografía gratis de la ficha de Google),
  - 1 a la demo del rubro (`/demo/?rubro=pizzeria|heladeria|restaurante|bar|franquicia`),
  - 1 a `/planes/`,
  - 2 a otros posts del mismo rubro usando la ruta `/blog/<rubro>/<slug>/` con los slugs del plan de investigación (escribe el enlace aunque ese post lo escriba otro redactor).
- Enlaces externos solo a las fuentes (van en `sources`, y puedes repetir 1 o 2 en el cuerpo con `rel="noopener nofollow"`).
- PROHIBIDO escribir un `#` suelto en el texto (Obsidian/Markdown lo lee como etiqueta). Si necesitas "número", escribe "número" o "N.º". El build falla si lo encuentra.
- Mezzita vende UN producto: «Pedidos con QR»: menú web con un QR por mesa, pedidos en mesa, delivery y recojo, cobro por QR bancario (CUCU), comandas a la cocina por WhatsApp, ficha de Google y placa de reseñas. Precio: 400 Bs al mes y 5 % solo sobre lo cobrado por QR (0 % en efectivo); instalación 2.900 Bs (2.000 Bs de lanzamiento). Menciónalo como máximo una vez por post, en una frase, y solo si viene al caso. No prometas posiciones en Google.
- Específico de Bolivia en cada sección: ciudades, moneda (Bs), QR bancario, SIAT/SIN, bloqueos, turistas, etc. Si un dato es de otro país, dilo ("en México, según…").
- Cierra con un H2 de conclusión corto ("Qué hacer esta semana" o similar) con 3 a 5 pasos accionables. No pongas CTA de venta al final: el sistema lo agrega.

## Calidad que buscamos
Que un dueño de negocio en Santa Cruz lo lea y piense "esto lo escribió alguien que conoce Bolivia". Mejor un dato real con fuente que tres adjetivos. Si la investigación no trae un dato, no lo inventes.

## Nombres de archivo
`src/blog/<rubro>/<slug>.html` con el slug exacto del plan (ascii, guiones). Rubros válidos: `restaurantes`, `pizzerias`, `heladerias`, `bares`, `franquicias`, `general`. Para enlaces internos a otros posts puedes usar también los 15 posts existentes en `/blog/restaurantes/` (mira `ls src/blog/restaurantes`).

## Al terminar
Ejecuta `cd mezzita-site && python3 build.py` y corrige cualquier error que señale (JSON inválido, `#` suelto). Reporta: lista de slugs escritos, palabras por post, y qué datos quedaron fuera por no estar verificados.
