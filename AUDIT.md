# outperform.business: v9 notes (Oct 19, 2026)

## 0000. v9
- Portfolio screenshots replaced by the 14 images the live site uses (`/portfolio/*.webp`, 800x500) → `assets/work/*.webp`. Tarija Tech Week, Tarija Wine Tower and the six phone captures keep the Playwright captures (the live site has no image for them).
- "La Transformación Digital llegó a Bolivia": pill above the hero headline and eyebrow of the final CTA card.
- Client logo band: always in colour, on a dark rounded panel (white marks like NAOS, Flowing and Wash Cycle are back).
- WhatsApp float: 16px radius (squarer), pulsing blue dot moved to the top-left corner.
- Demo mock websites rebuilt as five themed templates modelled on the references (Pizza Planet → red/yellow uppercase with circular photo; TNC Advocator → navy gradient, gold accent, stats bar; Staylo → full-photo hero, serif, booking bar; Smilifye → deep teal hero, white pill CTA, info bar; Vinsor → black bar, cream body, gold serif uppercase). Photos are Unsplash (free licence) resized to webp in `assets/demo/` (692 KB total); fonts Rubik, Gilda Display, Sora and Cormorant Garamond load only on /demo/.
- Verification: Playwright over all 94 URLs at 1440 and 390 px: status 200, no console errors, no horizontal overflow, every image decoded. Each of the five demo themes captured at both widths.


## 000. v8: 75 guías por rubro, páginas legales, credenciales heredadas

### Research (research/*.md, one per rubro + BRIEF_REDACCION.md)
Five Sonnet researchers searched Bolivian SERPs per niche. Consistent finding: for almost every commercial query ("página web para hotel Bolivia", "comisión PedidosYa Bolivia", "marketing dental Bolivia", "cómo conseguir clientes abogado", "vender vino por WhatsApp") the results are Spanish, Mexican, Argentine or vendor pages. No Bolivian site owns these topics. The gaps turned into 75 plans (6 problem guides, 4 cost/comparison, 3 local how-tos, 2 data posts per rubro).
Known limits: WebFetch failed on Bolivian domains (DNS), so facts come from search snippets and must be checked at source before paid promotion; SERP positions are inferred (no Ahrefs/Search Console). Each research file ends with a verification list.

### Writing rules enforced (research/BRIEF_REDACCION.md)
1.100-1.600 words, tú, neutral Spanish, 6-9 H2, one "Dato Bolivia" aside, a table on comparison posts, a legal/tax disclaimer where relevant, 3-5 FAQs (also emitted as FAQPage JSON-LD), 3-6 real sources from the research, links to /diagnostico/, the rubro demo, /planes/ and two sibling posts. Anything marked UNVERIFIED in research is not stated as a number: delivery-app commissions, Booking's Bolivian rate, SIAT dates for groups 9-12, lawyer counts, implant prices, courier rates, Ley 259 ad hours.

### Build system
`src/blog/<rubro>/<slug>.html` = JSON meta + prose only. build.py adds h1, lede, tags, table of contents, FAQ, sources, author box, per-rubro CTA, 3 related posts, Article + BreadcrumbList + FAQPage JSON-LD, hub pages `/blog/<rubro>/` (CollectionPage), the blog index with rubro tabs, and a sitemap of 94 URLs. It fails the build on invalid JSON or a stray `#` in body text. Tables are wrapped for horizontal scroll on phones.

### Legal pages
/terminos/, /privacidad/, /cookies/, /garantias/ (linked in the footer). Written for the actual offer (setup + monthly, 12-month agreement, rollover credit, 30-day cancellation, data export, ownership of Google profile/domain/WhatsApp by the client, Bolivian law and Tarija jurisdiction). They cite CPE arts. 21 and 130, Ley 164 and DS 1793 in general terms. A Bolivian lawyer should review before production; the footer line "NIT en trámite de publicación" is a placeholder to replace with the real NIT.

### Audit of the live outperform.business, what was carried over
- Partner badges (Microsoft, AWS, Google Cloud, Oracle NetSuite, SAP, Shopify, Webflow, MongoDB) → `assets/badges/`, shown in the home flow section and on /casos/.
- Ratings (5/5 Goodfirms, Google, TechReviewer; 4,9 G2/Capterra), MIT certification, "18+ proyectos de consultoría" → credentials cards on /casos/.
- Levisoft logo → /casos/ headline, home "Ingeniería de Levisoft" pill, footer.
- Method (costos predecibles, cobertura completa, sin microgestión, flujo sin fricción), three NDA cases, industries list → /casos/.
- The four Google-listing photos used on the live site → the hero listing flip (before/after) and the restaurant mock website in the demo.
Not carried over on purpose: plan 4 "Dominio Corporativo Total" at 24.050 Bs (replaced by "Empresa a Medida" quote), the tech-logo wall (23 logos add nothing for a restaurant owner), the voice-AI QR, the two chat assistants, and the "tienda/ferretería" demo (not one of the five rubros).

### Deploy status
Not pushed. The live site is static HTML behind Cloudflare with no repository or hosting credentials available in this session. See the final message for the two things needed.


## 00. v7: what changed
- **Client logo band** (`src/_partials/logoband.html`): real logos from outperform.business/levisoft (Ibero Puebla, UJET, Gasolineras Gemma, Inmerso, Ideabitat, NAOS), normalized to ink silhouettes. Flowing and Wash Cycle were dropped: their marks do not survive a one-color treatment. On home and on /casos/.
- **Client-flow diagram** (`src/_partials/flowmap.html`): SVG with SMIL movers (pulsing dots) running Google Maps / Anuncios / Redes → Tu página web → WhatsApp → Pago QR / Reseña, plus a dashed return path. Replaces the five-step text flow on home; also opens /servicios/. Horizontal scroll on phones; movers hidden under reduced motion.
- **Guarantee seal** (`src/_partials/seal.html`, `seal60.html`): rosette with slow spin, "7 / DÍAS HÁBILES / O NO PAGAS EL MES" and a ribbon. The 60-day version (blue) sits on the second guarantee in /planes/.
- **Portfolio**: home now uses a 6-tile bento (one tile is a real mobile capture of ujet.com in a phone frame) with hover overlays. /casos/ adds a strip of six phone captures at 390 px and overlays on every tile.
- **WhatsApp float**: glass capsule with a pinging blue dot on the corner.
- **Demo**: a browser frame with a per-rubro mock website (name, hook, rating, three products, "Pedir por WhatsApp") above the two screens. Clicking the site CTA scrolls to the phone and posts "Hola, vengo de la web", so the Web → WhatsApp step is lived, not described.
- **Copy**: "página web para celular" → "página web" everywhere (planes, servicios, home).
- Visual aids elsewhere: listing flip card on /diagnostico/, group icons on /servicios/, cover tiles on /blog/.


## 0. v6: visual language from the Subscription X reference, plus four diagrams
Taken from the reference (adapted, not copied): highlighted words as rotated "sticker" labels in headlines; dark sections as large-radius rounded blocks floating on the paper; a faint grid on the paper; hand-drawn arrow doodle pointing from the CTA to the product; cards with thick ink borders and offset solid shadows; numbered process; a pill marquee of services; a framed CTA card with corner markers; a benefits trio with boxed icons. Not taken: 3D illustrations, lorem copy, the two-tone pricing cards.

Diagrams added so the offer is understood without reading:
1. **Hoy vs En 7 días hábiles** (compare): the four pains on the left, the four fixes on the right, dark card with yellow offset shadow.
2. **El camino del cliente** (flow): five numbered steps from "busca en Google" to "vuelve", each tagged with the door it belongs to. Collapses to a vertical rail on phones.
3. **Tu parte / Nuestra parte** (lanes): a two-lane timeline over Hoy, Días 1-5, Día 7 hábil, Desde el día 8. The effort split is the Hormozi lever most owners worry about; now it is one glance.
4. **Escalera de planes** (stack): three stepped blocks with the credit arrow (1.300 Bs carried up). Also on /planes/, replacing the text ladder.

## v5 notes

## 1. What v5 changed
- **Bug fixed:** the scroll-reveal hid every section at opacity 0 until an observer fired. In full-page captures the dark bands and the plans rendered empty, and a visitor with a flaky observer would have seen the same. Content is now visible at rest; only a 10px settle remains.
- **Background:** four options, switchable live in the preview (bottom-left pill, preview only) or with `?bg=`: `sonar` (dot grid that gathers toward the pointer, default), `dots` (fish as particle silhouettes), `code` (the glyph fish), `water` (caustics), `none`. Production ships whatever `data-bg` default is set in `backdrop.js`.
- **Hero stage:** the Google listing now flips between "Hoy" (2.0★, no hours, one 2019 photo, unanswered question) and "En 7 días hábiles". Listing and receipt are glass; the KPI block is dark glass.
- **Three doors:** line-art vignettes (map pin, chat with QR, NFC plate with star) so the dark section isn't text only.
- **Demo v2 (two screens, one sale):** left, the customer's phone: categories as WhatsApp quick-reply chips, products as a swipeable carousel of cards inside the chat, order summary, QR, PAGADO. Right, the owner's panel (dark glass): live "cobrado hoy", paid orders count, "capturas revisadas: 0", each paid order dropping in as a row. Restaurant has a commission comparator: the owner types the rate their delivery app charges and sees what those orders would have cost.
- **Research-driven demo edits:** dental default is "confirm without deposit" with reminders stressed; hotel adds "tarjeta internacional (turista)"; QR leads everywhere, card is secondary.
- Mobile overflow on the demo fixed (`min-width:0` on the grid chain).

## 2. Market research (sourced report: `research_demand.md`)
Strongest evidence is QR: 891M transactions in 2025 worth USD 51.3B (+131%), 88% under Bs 500, cash share down from 85% to 64%. Only 12.6% hold a credit card; online card use re-enabled Feb 2026. Macro is bad (IMF: contraction 2026-27, 20%+ inflation, blockades cut hotel occupancy), so buyers want cost cuts and recovered revenue, not brand spend.

| Demo | Demand | Site action taken |
|---|---|---|
| Restaurant orders | High | Lead demo; commission comparator added (owner enters their own rate; Bolivian rates are unpublished) |
| Wine shop | Medium | Kept; emphasize pick-up, gifts, shipping zones |
| Dental | Medium (reminders High, deposit Low) | Reminders in the closing line; deposit optional |
| Hotel | Medium | Foreign-card option added; QR deposit for domestic guests |
| Law firm | Low | Kept last; no evidence of demand in Bolivia |

Under-sold on the site: SIAT e-invoicing (compliance deadline passed 1 Oct 2026 for groups 9-12, demand is non-discretionary), WhatsApp reminders/confirmations, commission-saving own ordering. Over-sold: autonomous AI/voice agents (chatbots are commoditized at USD 15-35/month in Bolivia), card-in-chat, and NFC plates/loyalty cards as headline items.

Pricing check: Bolivian one-time websites run Bs 1,650-7,550, so the 1,300 Bs setup is cheap; 650 Bs/month is plausible only as a bundle (Peru/Colombia retainers are far higher, chatbots far lower). Everything marked UNVERIFIED in the report needs about 20 prospect interviews.

## 3. Remaining audit items (not done, ordered by value)
1. **Per-niche landing pages** (`/hoteles/`, `/clinicas/`, ...) with the matching demo script and one niche-specific number. Needed before any paid traffic.
2. **A SIAT line in Vende y Cobra** or a dedicated extra with a clear price. It is the one service with a legal deadline behind it.
3. **Reposition AI agent and NFC plate** from plan bullets to "incluido sin costo" footnotes.
4. **Real Bolivian proof.** Still zero local testimonials. Three local before/afters would do more than any effect.
5. **Owner-side demo for hotel/clinic:** show the reminder message and the calendar slot, not just the receipt.
6. **WebP the screenshots** (4 MB → ~2 MB).
7. Contracts/NDAs for the 14 portfolio names; blog in *tú*; privacy and terms pages; domain decision.

## 4. How to run
```
python3 build.py
```
`src/*.html` copy · `assets/site.css` · `assets/backdrop.js` (set default mode) · `assets/chat.js` + `assets/demo.js`.
