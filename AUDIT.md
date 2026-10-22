# Auditoría · v20 (21 oct 2026) · pivote a solo comida

- Producto único: «Pedidos con QR por Outperform». Instalación 2.900 Bs (2.000 Bs lanzamiento, 50 cupos), 400 Bs/mes, 5 % solo sobre pagos por QR, 0 % efectivo. Devolución del 50 % de la comisión hasta recuperar la instalación (12 meses; desde el mes 13, 100 %). Anual: 10 meses por 12 + módulo «Vuelven solos» gratis. Downsell: solo delivery y recojo, 8 %. Upsell: «Vuelven solos» +400 Bs/mes.
- Paleta: rojo intenso (#DA291C) + amarillo (#FFC72C). Iconos de comida en `build.py` (`{{icon:nombre}}`), patrón de fondo `.foodbg`.
- Demo: pizzería, heladería, restaurante, bar y café, franquicia. Flujo mesa (QR, pago QR o efectivo en caja), delivery y recojo. Panel del dueño muestra comisión, devolución y efectivo sin comisión.
- Blog: solo `restaurantes` (15) y `general` (1). Hoteles, clínicas, estudios y vinotecas eliminados.
- Calculadora: costo del sistema, devolución y meses para recuperar la instalación.
- PDFs regenerados (checklist, contrato modelo). OG e iconos regenerados en rojo.
- Verificación Playwright: 31 URLs × 2 viewports sin errores de consola, sin desbordes, sin imágenes rotas.
- Pendiente de confirmar: comisión propia de CUCU (se declara «aparte» en planes y contrato).
- Blog ampliado a 76 guías: restaurantes 15, pizzerías 15, heladerías 15, bares y cafés 15, franquicias 15, general 1. Plan en research/PLAN_BLOGS_COMIDA.md. Verificación Playwright: 95 URLs × 2 viewports sin problemas.
- v21 (21 oct): el pedido y el pago ocurren en el menú web (order.js reemplaza al chat); «Panel de pedidos y caja» incluido (CSV + API; conectores a medida se cotizan); plan «Con avisos por WhatsApp» 600 Bs (seguimiento y promos con permiso); diagramas de flujo mesa / delivery-recojo en inicio, demo y servicios; 41 posts corregidos. Playwright: 95 URLs sin problemas.
- v24 (22 oct): marca Mezzita en todo el sitio (logo mesita con plato, iconos, OG, portadas, PDF); despliegue por Cloudflare Pages en mezzita.com. Página /experiencia/ (antes /casos/, redirección 301): hero con capturas reales, dos casos de Tarija, el sistema propio, galería de 20 sitios filtrable por rubro, celulares, credenciales de Levisoft, sistemas bajo confidencialidad y testimonios. Inicio sin portafolio ni credenciales, «+10 años» con logo de Levisoft. Playwright: 95 URLs × 2 viewports sin problemas.
