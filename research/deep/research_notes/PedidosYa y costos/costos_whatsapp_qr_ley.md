# Mezzita: WhatsApp costs, QR payment fees, Bolivian consumer law
Researched 2026-10-23 via WebSearch/WebFetch. Labels: [V] = read on a fetched page; [S] = search-engine summary only; [U] = unverified/not found. No figure invented.

## 1. WhatsApp Business Platform (Cloud API) to +591

### Model
- Per-delivered-message pricing since 2025-07-01 (replaced conversation-based). Charged by category (marketing / utility / authentication / service) and by RECIPIENT market. [V] https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing (fetched 2026-10-23)
- Bolivia (+591) has NO standalone rate; it is in "Rest of Latin America" (15 markets: Bolivia, Costa Rica, Dominican Rep., Ecuador, El Salvador, Guatemala, Haiti, Honduras, Jamaica, Nicaragua, Panama, Paraguay, Puerto Rico, Uruguay, Venezuela). [V] same Meta page.
- Rate changes only on Jan 1 / Apr 1 / Jul 1 / Oct 1. Rate card effective 2026-10-01 is current. [V] Meta page.
- Volume tiers: only utility and authentication, per market+category, aggregated across portfolio, monthly reset, marginal. Marketing has no tiers. Thresholds and discounted rates for Rest of LatAm NOT found. [V] Meta page + https://www.flowcall.co/blog/whatsapp-business-api-pricing (third party)
- Free-in-window: from 2025-07-01 until 2026-09-30, utility templates inside an open 24h customer-service window were free. From 2026-10-01 they are CHARGED at the utility rate (per Meta page and flowcall). Service (free-form reply) messages: 1,000 free per business phone number per month, then charged at utility rate (per flowcall; Meta page summary agrees on 1,000). Click-to-WhatsApp ad "free entry point": all categories free for up to 7 days after a user messages from the ad (Meta page summary; older docs said 72h, so verify). [V] Meta page; [V] flowcall. NOTE: this contradicts the common belief that in-window utility is free; it was true only through Sept 2026.
- Numeric rates are not in the Meta HTML (they sit in linked CSV/PDF rate cards, not retrieved). Numbers below are from third parties.

### Rates, Rest of Latin America, USD per delivered message
| Category | Source A (use as base) | Source B (conflict) |
|---|---|---|
| Marketing | 0.0740 | 0.0851 |
| Utility | 0.0113 | 0.0130 |
| Authentication | 0.0113 | not given |
| Service (after 1,000 free) | 0.0113 | - |
- A: flowcall (card effective 2026-10-01) https://www.flowcall.co/blog/whatsapp-business-api-pricing [V]; same figures also reported by Volga AI, whatsetter calculator, Gupshup Oct-2025 sheet https://www.gupshup.ai/resources/wp-content/uploads/2025/10/USD_Oct2025.pdf [S].
- B: ManyChat and SleekFlow list 0.0851 / 0.0130 (SleekFlow says that was valid until 2026-09-30; ManyChat says effective 2026-10-01) [S]. Also a stray guide at 0.0925 / 0.0142, likely an older card [S].
- Status: A most consistent with the Oct-2026 card, but [U] until someone reads Meta's USD CSV. Action: download the rate card from developers.facebook.com and read the "Rest of Latin America" row.
- BSP (Twilio, 360dialog, Gupshup, etc.) markups and platform subscription fees not included; IVA on Meta invoice not researched [U].

### Computations (USD, source A rate 0.074 marketing / 0.0113 utility)
Bs at three FX: 6.96 (official), 10, 12. Source-B in parentheses at 0.0851/0.0130, USD.

| Scenario | Msgs | USD | Bs @6.96 | Bs @10 | Bs @12 |
|---|---|---|---|---|---|
| 1 campaign, 300 customers | 300 | 22.20 (25.53) | 154.51 | 222.00 | 266.40 |
| 1 campaign, 1,000 | 1,000 | 74.00 (85.10) | 515.04 | 740.00 | 888.00 |
| 1 campaign, 3,000 | 3,000 | 222.00 (255.30) | 1,545.12 | 2,220.00 | 2,664.00 |
| 4 campaigns/mo x 1,000 | 4,000 | 296.00 (340.40) | 2,060.16 | 2,960.00 | 3,552.00 |
| 500 "order ready" utility notices/mo | 500 | 5.65 (6.50) | 39.32 | 56.50 | 67.80 |
(Source-B Bs @6.96: 177.69 / 592.30 / 1,776.89 / 2,369.18 / 45.24; @12: 306.36 / 1,021.20 / 3,063.60 / 4,084.80 / 78.00.)
- Assumes every message delivered and charged; marketing messages are charged only on delivery. Per recipient per campaign = 0.074 USD = ~0.51 Bs (6.96) to ~0.89 Bs (12).
- Utility notices after 2026-10-01 cost even inside the window; if the customer messaged via a Click-to-WhatsApp ad within 7 days, free. Otherwise 500 notices ~ 5.65 USD/month, trivial vs marketing (marketing is 6.5x utility).
- Official 6.96 vs market 10-12 Bs/USD are the owner's stated ranges; the market rate was not independently verified [U].

## 2. QR payments in Bolivia (merchant fees)

### Findings
- I could NOT find published per-transaction % or fixed fees for Libelula, PagosNet, Tigo Money, BNB/BCP/Mercantil QR APIs, or CUCU. Searches returned none; these are usually quote-based. [U] Ask each for a written quote. Do not use any number as fact.
- Regulation: BCB Reglamento de Servicios de Pago (Res. Directorio 079/2022) regulates payment gateways; Libelula exec says gateways must be affiliated/backed by a financial entity. https://www.bcb.gob.bo/webdocs/11_comunicados/cp_pasarelas_pago.pdf [S]; https://dplnews.com/bolivia-norma-acerca-a-paypal-pero-aun-no-asegura-su-arribo/ [S]. Libelula has dynamic QR box with Banco Union and online gateway with 600+ merchants (LinkedIn, social post, weak) [S].
- State gateway (AGETIC) accepts cards and QR; no fees seen. https://agetic.gob.bo/?p=2842 [S]
- ASFI Res. 216/2025 (Mar 2025): no commissions on online/foreign card transactions up to USD 100. Covers cards/foreign purchases, NOT mentioned for QR; payer not specified. https://www.lostiempos.com/actualidad/economia/20250328/asfi-exime-cobro-comisiones-transacciones-100-dolares [V]. Not applicable to Mezzita QR conclusions.
- Plain static bank QR (each bank's merchant QR): merchant fee not found [U]. BCB/ASFI describe QR as "bajo costo operativo" https://asfi.gob.bo/sites/default/files/2025-07/El%20uso%20del%20QR%20ha%20dinamizado%20el%20sistema%20de%20pagos%20en%20Bolivia.pdf [S]. Interoperable QR adoption: 36% of payments in 2025 vs 15% in 2020; ~1.5M merchants (BCB, 2026-06-14) https://www.lostiempos.com/actualidad/economia/20260614/banco-central-bolivia-resalta-uso-del-qr-28-veces-segundo-pais [S].

### Yape in Bolivia
- Yape operates in Bolivia: it is BCP's wallet; BCP Bolivia rebranded/transitioned its app in 2023; ~1M users claimed in the first month (article dated 2023-10-13; same article says ~260k users at end of Aug, so the 1M figure is inconsistent/headline). "Sin comisiones para el usuario." No merchant fee in it. https://www.peru-retail.com/la-billetera-movil-yape-llego-al-millon-de-usuarios-en-bolivia/ [V]
- "Yape Comercios" launched in Bolivia (~2026-07-21, per URL date) described as a "solucion gratuita" for small businesses; no fees mentioned; the "first year" language in a search summary is an adoption projection, not a free-period term. https://www.descubre.vc/noticia/yape-lanza-yape-comercios-para-digitalizar-la-gesti-n-de-peque-os-negocios-en-bolivia-2026-07-21 [V]. Fee after launch period [U].
- Peru contrast: Yape Empresa charges 2.95% on daily income (Panamericana, 2024) https://panamericana.pe/tecnologia/408113-atencion-yape-cobrara-comision-negocios-aplicara-medida [S]. Peru only; do not assume for Bolivia.
- Whether Yape Bolivia QR is interoperable with other banks' QR: not verified [U].

## 3. Consumer-protection law (Ley 453, 4 Dec 2013; DS 2130, 25 Sep 2014)
Sources: Ley text via https://www.lexivox.org/norms/BO-L-N453.html (read through summarizer, article numbers need legal confirmation); Reglamento https://www.lexivox.org/norms/BO-RE-DSN2130.html [V]. The official PDF (observatoriolgbt) could not be text-extracted.
- Ley 453 Art. 5: usuario/consumidor = persona natural O JURIDICA that acquires, uses or enjoys products/services as FINAL recipient; proveedor = entity that produces, imports, distributes or sells. Art. 5(8): publicidad engañosa = wholly/partly false information inducing error. Art. 25: prohibits misleading/abusive advertising, incl. omissions on price, quality, warranties; fraud-level cases go to criminal law. Art. 13: right to truthful, complete information. Art. 14(4): total price incl. taxes; 14(9): offers/discounts/promotions clearly described. Art. 23(1): abusive practices. [S-level summary, mark "confirm article numbers"]
- DS 2130 Reglamento: Art. 14.2 final price visible; 14.3 if several prices are marked, the LOWEST applies; Art. 16 must honor offer as advertised; Art. 18 promotions must state conditions, start/end dates, claims point; Art. 20 authority orders immediate withdrawal of misleading advertising, plus sanction; Arts. 38-40 sanctions by Ministerio de Justicia or sector regulators, fines go to a consumer-protection fund. No specific article on discounts/"precio anterior" crossed-out prices; closest are 14.2/14.3, 16, 18, and Ley Art. 25. Fine amounts not found [U].
- Application to a crossed-out "before" price never charged, or fake "limited time": not named expressly; it falls within the general misleading-advertising ban (false information inducing error about price) and promotion-conditions rules (a "limited time" promo must state end date, Art. 18). This is interpretation, not a quoted rule. Confirm with a Bolivian lawyer.
- Authority: Ministerio de Justicia y Transparencia Institucional, Viceministerio de Defensa de los Derechos del Usuario y del Consumidor for non-regulated sectors; sector regulators (ASFI, ATT, etc.) for regulated ones (Reglamento Art. 4, Art. 30). Viceministerio location per DS 29894 art. 79 as modified by DS 2114 (2014) [S]. Municipal consumer offices exist for local price control (e.g., Sucre) [S].
- B2B: the Ley defines consumers as natural or legal persons acquiring as FINAL recipients. So a restaurant buying Mezzita is a legal person and could qualify if it is the end user of the software (not reselling it). The Reglamento does not mention resale/commercial-use exclusions [S]. No source found stating that business buyers are expressly excluded or included in practice; [U] whether Viceministerio treats B2B complaints. Practical read: do not rely on "B2B exemption"; show honest prices.
- Safe practice for Mezzita: show a crossed-out price only if it was actually charged for a meaningful recent period; give dates for time-limited offers and honor them; show final price with taxes.

## Open items
1. Read Meta's official USD rate card CSV (0.074 vs 0.0851).
2. Written quotes from Libelula / PagosNet / Tigo Money / bank QR APIs; bank merchant fee schedules; Yape Comercios terms.
3. Lawyer review of Ley 453 Arts. 5, 13, 14, 25 text and Viceministerio B2B practice.
