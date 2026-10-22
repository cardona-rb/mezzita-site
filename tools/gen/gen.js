// Genera iconos, imagen OG, portadas de LinkedIn y PDFs de Mezzita.
// Uso: cd tools && node gen/gen.js
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const A = (f) => path.join(ROOT, "assets", f);
const MARK = fs.readFileSync(A("favicon.svg"), "utf8");
const CSS = fs.readFileSync(path.join(__dirname, "brand.css"), "utf8");
const page = (body, extra = "") => `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}${extra}</style></head><body>${body}</body></html>`;
const brand = (size) => `<div class="brand" style="font-size:${size}px">${MARK}<span>mezzita</span></div>`;

const QR = (() => {
  // patrón fijo tipo QR con los tres marcadores de esquina
  const n = 21, on = new Set();
  const finder = (x, y) => { for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) if (i == 0 || j == 0 || i == 6 || j == 6 || (i > 1 && i < 5 && j > 1 && j < 5)) on.add(`${x + i},${y + j}`); };
  finder(0, 0); finder(14, 0); finder(0, 14);
  let s = 7;
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) {
    if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) continue;
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    if (s % 100 < 46) on.add(`${x},${y}`);
  }
  return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges">${[...on].map((k) => { const [x, y] = k.split(","); return `<rect x="${x}" y="${y}" width="1" height="1"/>`; }).join("")}</svg>`;
})();

const OG = page(`
<div class="grid-bg" style="width:1200px;height:630px;padding:64px 72px;display:grid;grid-template-columns:1fr 330px;gap:56px;align-items:center;position:relative">
  <div>
    ${brand(34)}
    <h1 class="d" style="font-size:76px;margin-top:44px">Tu carta en un <span class="hl">QR.</span><br>Tu cliente pide y paga solo.</h1>
    <p style="font-size:25px;line-height:1.35;color:var(--ink-2);margin-top:26px;max-width:640px">Menú web propio para pizzerías, heladerías, restaurantes, bares y franquicias de Bolivia. Pide en la mesa, delivery o recojo, y paga en el navegador.</p>
  </div>
  <div style="position:relative">
    <div style="position:absolute;inset:18px -18px -18px 18px;background:var(--red);border-radius:28px"></div>
    <div style="position:relative;background:#fff;border:3px solid var(--ink);border-radius:28px;padding:30px;display:grid;gap:22px;justify-items:center">
      <div style="width:230px;height:230px">${QR}</div>
      <div class="pill" style="background:var(--sun);color:var(--ink);font-weight:700;font-size:26px;border:3px solid var(--ink)">Mesa 12</div>
    </div>
  </div>
  <div style="position:absolute;left:72px;right:72px;bottom:44px;display:flex;justify-content:space-between;font-size:21px;font-weight:600">
    <span>mezzita.com</span><span style="color:var(--ink-2)">400 Bs al mes · 5 % solo sobre QR · 7 días hábiles</span>
  </div>
</div>`);

const chips = (size) => [["#0F7A4B", "Pedido en mesa, delivery y recojo"], ["#DA291C", "Cobro por QR en el navegador"], ["#FFC72C", "Panel de pedidos y caja"]]
  .map(([c, t], i) => `<div style="display:flex;align-items:center;gap:.55em;background:#fff;border:2px solid var(--ink);box-shadow:5px 5px 0 var(--ink);border-radius:14px;padding:.55em 1em;font-weight:600;font-size:${size}px;margin-right:${[0, 60, 20][i]}px"><i style="width:.75em;height:.75em;border-radius:50%;background:${c};border:2px solid var(--ink)"></i>${t}</div>`).join("");

const LI_PERFIL = page(`
<div class="grid-bg" style="width:1584px;height:396px;padding:34px 48px 30px 360px;display:grid;grid-template-columns:1fr auto;gap:40px;position:relative">
  <div style="display:flex;flex-direction:column;justify-content:space-between">
    ${brand(36)}
    <h1 class="d" style="font-size:78px">Tu restaurante vende <span class="hl">solo.</span></h1>
    <p style="font-size:24px;color:var(--ink-2);max-width:640px;line-height:1.3">El cliente pide y paga desde su celular, en tu propio menú web. Sin app de delivery que se quede con el 25 %.</p>
    <p class="mono" style="font-size:14px;letter-spacing:.14em;color:var(--ink-3);text-transform:uppercase">mezzita.com · del equipo detrás de Levisoft · en línea en 7 días hábiles</p>
  </div>
  <div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:18px">${chips(22)}</div>
</div>`);

const LI_EMPRESA = page(`
<div class="grid-bg" style="width:1128px;height:191px;padding:0 40px 0 200px;display:flex;align-items:center;justify-content:space-between;gap:24px">
  <div style="display:grid;gap:12px">
    <h1 class="d" style="font-size:46px">Tu carta en un <span class="hl">QR.</span> Tu cliente pide y paga solo.</h1>
    <p class="mono" style="font-size:12px;letter-spacing:.14em;color:var(--ink-3);text-transform:uppercase">mezzita.com · pedidos con QR para negocios de comida en Bolivia</p>
  </div>
  ${brand(30)}
</div>`);

const DOC_CSS = `@page{size:A4;margin:16mm 18mm}body{background:#fff;font-size:10.5pt;line-height:1.55;color:var(--ink-2)}
.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--ink);padding-bottom:10px;margin-bottom:18px}.hd .brand{font-size:19px;color:var(--ink)}.hd small{color:var(--ink-3);font-size:9.5pt}
h1{font-family:"Bricolage Grotesque";font-weight:800;letter-spacing:-.03em;color:var(--ink);line-height:1.1}
h2{color:var(--red);font-size:11pt;letter-spacing:.06em;text-transform:uppercase;margin:16px 0 6px;font-weight:700}
b,strong{color:var(--ink)}ul{padding-left:18px}li{margin:3px 0}
table td,table th{padding:7px 9px;vertical-align:top}
.eyebrow{font-family:"Geist Mono";color:var(--red);font-size:9pt;letter-spacing:.14em;font-weight:700;text-transform:uppercase}
.ft{border-top:1px solid var(--line);margin-top:18px;padding-top:10px;font-size:9pt;color:var(--ink-3);display:flex;justify-content:space-between;gap:16px}`;

const item = (n, t, d, m, tag = "OBLIGATORIO") => `<div style="display:grid;grid-template-columns:26px 1fr auto;gap:14px;padding:12px 0;border-bottom:1px solid var(--line);break-inside:avoid">
<i style="width:20px;height:20px;border:2px solid var(--ink);border-radius:5px;margin-top:2px"></i>
<div><b style="font-size:11.5pt">${n}. ${t}</b><p>${d}</p><p style="font-size:9pt;color:var(--ink-3)">${m}</p></div>
<span class="mono" style="align-self:start;background:${tag == "SI APLICA" ? "var(--sun)" : "var(--ink)"};color:${tag == "SI APLICA" ? "var(--ink)" : "#fff"};border-radius:999px;padding:2px 9px;font-size:8pt;font-weight:700;letter-spacing:.06em">${tag}</span></div>`;

const CHECKLIST = page(`
<div class="hd">${brand(19)}<small>Pedidos con QR · Checklist de inicio · v3 · octubre 2026</small></div>
<p class="eyebrow">Qué necesitas entregar</p>
<h1 style="font-size:26pt;margin:6px 0 8px">Seis cosas. Veinte minutos. Todo por WhatsApp.</h1>
<p style="font-size:11pt">Nos mandas esto al +591 71868545 y desde ese momento corren los 7 días hábiles de la garantía «7 Días o No Pagas el Mes». No vamos a tu local: no hace falta.</p>
<div style="margin-top:12px">
${item(1, "Datos del local", "Nombre comercial exacto, dirección con referencia, horarios con feriados conocidos y cuántas mesas tienes.", "Un mensaje de texto alcanza · 3 min")}
${item(2, "Tu carta con precios", "Foto de la carta, planilla, captura de Instagram o audio. Con variantes («mediana, familiar») y lo que se pide sin algo («sin cebolla»). Nosotros la ordenamos.", "Si cambia, nos mandas la nueva y la actualizamos sin costo · 5 min")}
${item(3, "Diez fotos reales", "Tus platos más pedidos, la fachada y el interior. Con el celular, luz natural, sin filtros.", "Las mandas tal cual por WhatsApp · 5 min")}
${item(4, "Dónde verás los pedidos", "El Panel de pedidos y caja funciona en cualquier celular, tablet o computadora. Dinos cuál usarás y un correo para la cuenta. Si haces delivery, tus zonas y costos de envío. Si tus mesas pagarán al final con el mesero, dínoslo.", "Un correo y una lista de zonas · 2 min")}
${item(5, "Documentos para cobrar por QR", "Para abrir o vincular tu cuenta de cobros con CUCU: NIT o carnet del titular y cuenta bancaria donde recibes el dinero. Te guiamos por videollamada.", "Es el único trámite · 5 min de tu parte")}
${item(6, "Acceso a lo que ya existe", "Ficha de Google, dominio o página anterior: nos agregas como administradores o nos pasas los accesos. Si no hay nada, lo creamos a tu nombre.", "Solo si aplica · 3 min", "SI APLICA")}
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;break-inside:avoid">
<div style="border:2px dashed var(--ink);border-radius:12px;padding:14px 16px"><p class="eyebrow" style="font-family:'Instrument Sans'">Lo que no necesitas</p><ul style="margin-top:6px">
<li>Impresoras térmicas ni cables: el panel usa el celular o la tablet que ya tienes.</li><li>Logo profesional: armamos uno tipográfico sin costo.</li><li>Textos: los escribimos con lo que nos cuentes por audio.</li><li>Saber de dominios, hosting o Google.</li><li>Computadora: todo funciona desde tu celular.</li></ul></div>
<div style="border:2px dashed var(--ink);border-radius:12px;padding:14px 16px"><p class="eyebrow" style="font-family:'Instrument Sans'">Qué pasa después</p><ul style="margin-top:6px">
<li><b>Día 1:</b> cargamos tu carta, iniciamos tu cuenta de cobros y reclamamos tu ficha de Google.</li><li><b>Días 1 a 5:</b> armamos tu menú web, zonas de delivery y tu Panel de pedidos y caja. Apruebas.</li><li><b>Día 7 hábil:</b> todo en línea. Te mandamos el PDF con el QR de cada mesa.</li><li><b>Desde el día 8:</b> las mesas piden solas. Te devolvemos la mitad de la comisión.</li></ul></div>
</div>
<div style="background:var(--red);color:#fff;border-radius:12px;padding:14px 18px;margin-top:16px;break-inside:avoid">
<p style="font-weight:700;font-size:13pt;line-height:1.35">2.900 Bs de instalación (2.000 Bs de lanzamiento, primeros 50 locales) · 400 Bs al mes · 5 % solo sobre lo cobrado por QR</p>
<p style="font-size:9.5pt;margin-top:4px">Lo que cobra el mesero, 0 %. La mitad de la comisión vuelve a ti hasta recuperar la instalación. Con avisos y promociones por WhatsApp: 600 Bs al mes. En línea en 7 días hábiles o tu primer mes es gratis.</p></div>
<div class="ft"><span>mezzita.com · WhatsApp +591 71868545</span><span>Mezzita · del equipo detrás de Levisoft · Bolivia</span></div>`, DOC_CSS);

const blank = (w) => `<span style="display:inline-block;width:${w}px;border-bottom:1.5px solid var(--ink)"></span>`;
const CONTRATO = page(`
<div class="hd">${brand(19)}<small>Contrato modelo · Pedidos con QR · v3 · octubre 2026</small></div>
<h1 style="font-size:21pt;margin-bottom:12px">Contrato de servicio «Pedidos con QR por Mezzita»</h1>
<p style="background:#FFF6D6;border-left:4px solid var(--sun);padding:10px 14px;font-size:9.5pt">Este es el modelo que firmamos con cada local. Los datos entre líneas se completan con los tuyos. Si algo no está escrito aquí o en la página de precio y condiciones del día de tu contratación, no está incluido. Léelo con calma: lo escribimos para que se entienda sin abogado.</p>
<h2>1. Partes</h2>
<p><b>El proveedor:</b> Mezzita, razón social ${blank(170)}, NIT ${blank(110)}, WhatsApp +591 71868545, mezzita.com.</p>
<p style="margin-top:8px"><b>El cliente:</b> ${blank(170)}, con NIT o CI ${blank(150)}, titular del local ${blank(150)}, en la ciudad de ${blank(150)}, con ${blank(50)} mesas.</p>
<h2>2. Objeto</h2>
<p>Mezzita entrega y mantiene para el local un sistema de pedidos con QR compuesto por:</p>
<ul><li>Menú web propio con fotos, variantes, notas y promociones, en un dominio del cliente o provisto por Mezzita, donde el cliente final arma su pedido y paga en el navegador.</li>
<li>Un código QR por mesa, en PDF, con el número de mesa cargado, para que el cliente final pida desde su celular.</li>
<li>Flujos de pedido en mesa, delivery con zonas y costos de envío, y recojo en local.</li>
<li>Cobro por QR bancario en el navegador a través de CUCU, y opción, en mesa, de pagar al final con el personal del local.</li>
<li>Panel de pedidos y caja: recepción de pedidos con mesa o dirección, productos, notas y estado del pago; estados «en preparación» y «listo»; cierre del día; exportación a CSV y API propia. Funciona en celular, tablet o computadora del cliente.</li>
<li>Ficha de Google Maps reclamada o creada, verificada y completa, con el menú web enlazado, y placa QR + NFC de reseñas.</li>
<li>Cambios de carta, precios y horarios sin costo adicional, y reporte mensual de una página.</li>
<li>Soporte por WhatsApp en horario del local.</li></ul>
<p><b>Opción «Solo delivery y recojo»:</b> mismo sistema sin QR de mesas, sin mensualidad y con comisión del 8 %. <b>Plan «Con avisos por WhatsApp»:</b> 600 Bs al mes; añade avisos de estado al cliente final de delivery y recojo que lo autorice, y hasta 4 campañas de promociones al mes a los clientes finales que dieron permiso, por la API oficial de WhatsApp. Conectores a sistemas contables o POS del cliente se cotizan por separado.</p>
<h2>3. Precio</h2>
<table style="width:100%;border-collapse:collapse;font-size:9.5pt" border="1" cellpadding="8">
<tr style="background:var(--paper)"><th align="left">Concepto</th><th align="left">Monto</th><th align="left">Cuándo</th></tr>
<tr><td>Instalación (pago único)</td><td>2.900 Bs. Precio de lanzamiento: 2.000 Bs para los primeros 50 locales contratados en Bolivia.</td><td>Al firmar. Desde el pago corren los 7 días hábiles.</td></tr>
<tr><td>Mensualidad</td><td>400 Bs por local (600 Bs en el plan Con avisos). Plan anual: 10 mensualidades por 12 meses de servicio.</td><td>Por adelantado, cada mes o al inicio del año.</td></tr>
<tr><td>Comisión</td><td>5 % sobre el monto de los pagos realizados por QR a través del sistema (8 % en «Solo delivery y recojo»). 0 % sobre pagos cobrados por el personal del local en efectivo o con el QR del propio local.</td><td>Liquidada en la factura del mes siguiente.</td></tr>
<tr><td>Sucursales adicionales</td><td>50 % de la instalación por cada sucursal adicional; mensualidad completa por sucursal.</td><td>Al activar cada sucursal.</td></tr></table>
<p style="margin-top:6px">Los precios son en bolivianos e incluyen los impuestos aplicables. La comisión propia de CUCU por procesar cada pago es independiente de este contrato y se informa al cliente antes de la firma.</p>
<h2>4. Devolución de la instalación</h2>
<ul><li>Cada mes, el 50 % de la comisión cobrada por Mezzita se descuenta de la siguiente factura del cliente, hasta que la suma de esos descuentos iguale la instalación pagada.</li>
<li>Este descuento aplica durante los primeros 12 meses de servicio continuo.</li>
<li>Si al cumplirse el mes 12 la instalación no se ha recuperado completa, desde el mes 13 el descuento pasa al 100 % de la comisión mensual, hasta recuperarla.</li>
<li>La devolución es un descuento sobre facturas futuras; no se paga en efectivo ni se transfiere. Requiere estar al día. Si el cliente cancela, el saldo pendiente se extingue. Los pagos anulados o reembolsados revierten su devolución en la factura siguiente.</li></ul>
<h2>5. Garantía «7 Días o No Pagas el Mes»</h2>
<p>Mezzita se obliga a dejar en línea el menú web con la carta cargada, entregar el PDF con los QR por mesa, dejar activo el Panel de pedidos y caja y habilitar el cobro por QR (o dejar iniciado el proceso ante CUCU) en 7 días hábiles desde la recepción completa de la información básica (sección 6) y del pago de instalación. Si no cumple, descuenta el 100 % de la primera mensualidad en el siguiente cobro, sin reclamo previo. El cliente puede optar por cancelar y recibir la devolución de la instalación pagada. No cubre demoras por información incompleta o aprobaciones pendientes del cliente (el plazo se pausa), trámites que dependen del titular ante Google, CUCU o el registrador del dominio una vez iniciados, ni fuerza mayor.</p>
<h2>6. Obligaciones del cliente</h2>
<ul><li>Entregar la información básica: datos del local, carta con precios y variantes, al menos 10 fotos reales, correo para la cuenta del panel, zonas y costos de delivery si aplica, documentos para la cuenta de cobros y accesos a ficha o dominio existentes.</li>
<li>Aprobar el menú web en un plazo razonable (máximo 2 días hábiles por revisión).</li>
<li>Imprimir y colocar los QR en las mesas, y atender los pedidos que entren.</li>
<li>Mantener la cuenta de cobros activa y pagar la mensualidad por adelantado.</li>
<li>Ofrecer en su carta solo productos cuya venta esté permitida.</li></ul>
<h2>7. Duración y cancelación</h2>
<p>El contrato es mes a mes, sin permanencia mínima. Cualquiera de las partes puede cancelar con 30 días de aviso por escrito (WhatsApp o correo). El plan anual se paga por adelantado y no es reembolsable, salvo aplicación de la garantía de la sección 5. Al cancelar, el cliente conserva la propiedad de su dominio, su ficha de Google, sus fotos y su base de clientes, que Mezzita entrega en formato exportable dentro de los 10 días hábiles siguientes.</p>
<h2>8. Datos y propiedad</h2>
<p>Los datos de los clientes finales (nombre, teléfono, pedidos) son del cliente y se tratan según la política de privacidad publicada en mezzita.com/privacidad/. Mezzita los usa solo para operar el servicio y, en el plan Con avisos, para enviar avisos y campañas únicamente a los clientes finales que dieron su consentimiento al pedir. El software del sistema es de Mezzita y se licencia al cliente mientras el contrato esté vigente. El menú web lleva la mención «Pedidos con QR por Mezzita» en el pie.</p>
<h2>9. Responsabilidad</h2>
<p>Mezzita responde por el funcionamiento del sistema y por los plazos de la sección 5. No responde por la calidad de los productos, por los tiempos de preparación y entrega, por decisiones de Google, Meta, WhatsApp o CUCU sobre sus plataformas, ni por pérdidas de venta que no deriven de una falla del sistema. La responsabilidad total de Mezzita se limita al monto pagado por el cliente en los 3 meses anteriores al reclamo.</p>
<h2>10. Ley y conflictos</h2>
<p>Este contrato se rige por las leyes del Estado Plurinacional de Bolivia. Las partes intentarán resolver cualquier diferencia por conversación directa en un plazo de 15 días; de no lograrlo, se someten a los tribunales de la ciudad del cliente.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;break-inside:avoid">
<div style="border-top:1.5px solid var(--ink);padding-top:8px;font-size:9.5pt">Por Mezzita<br>Nombre, firma y fecha</div>
<div style="border-top:1.5px solid var(--ink);padding-top:8px;font-size:9.5pt">Por el cliente<br>Nombre, firma y fecha</div></div>
<div class="ft"><span>Modelo publicado en mezzita.com/garantias/ · Las condiciones vigentes son las publicadas en mezzita.com/planes/ en la fecha de contratación.</span></div>`, DOC_CSS);

// ICO con un PNG embebido (formato válido desde Windows Vista y en todos los navegadores)
function ico(png) {
  const h = Buffer.alloc(22);
  h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4);
  h.writeUInt8(48, 6); h.writeUInt8(48, 7); h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12);
  h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18);
  return Buffer.concat([h, png]);
}

(async () => {
  const b = await chromium.launch();
  const shot = async (html, w, h, out, opts = {}) => {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: opts.scale || 1 });
    await p.setContent(html, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    const buf = await p.screenshot({ type: opts.type || "png", quality: opts.type == "jpeg" ? 88 : undefined, omitBackground: !!opts.transparent });
    if (out) fs.writeFileSync(out, buf);
    await p.close();
    return buf;
  };
  const icon = (pad) => page(`<div style="width:100vw;height:100vh;display:grid;place-items:center;background:${pad ? "#DA291C" : "transparent"}">${MARK.replace("<svg ", '<svg style="width:100%;height:100%" ')}</div>`, "html,body{background:transparent}");
  await shot(icon(false), 512, 512, A("icon-512.png"), { transparent: true });
  await shot(icon(false), 192, 192, A("icon-192.png"), { transparent: true });
  await shot(icon(true), 180, 180, A("apple-touch-icon.png"));
  fs.writeFileSync(A("favicon.ico"), ico(await shot(icon(false), 48, 48, null, { transparent: true })));
  await shot(OG, 1200, 630, A("og.png"));
  await shot(OG, 1200, 630, A("og.jpg"), { type: "jpeg" });
  await shot(LI_PERFIL, 1584, 396, A("linkedin-portada-perfil-1584x396.png"), { scale: 2 });
  await shot(LI_EMPRESA, 1128, 191, A("linkedin-portada-empresa-1128x191.png"), { scale: 2 });
  for (const [html, f] of [[CHECKLIST, "checklist-mezzita.pdf"], [CONTRATO, "contrato-modelo-mezzita.pdf"]]) {
    const p = await b.newPage();
    await p.setContent(html, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: A("docs/" + f), preferCSSPageSize: true, printBackground: true });
    await p.close();
  }
  await b.close();
  console.log("ok");
})();
