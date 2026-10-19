/* Demo v2: tú compras dentro del teléfono; a la derecha ves lo que ve el negocio */
(function(){
  var C = window.OPChat; if(!C) return;
  var RUBROS = {
    restaurante:{flow:{title:"De «tengo hambre» a «pedido pagado», sin app de delivery.",src:[["Google Maps","«pizzería cerca» · 23:40"],["Instagram y TikTok","el video del horno"],["Anuncios","Meta · a WhatsApp directo"]],hub:["Tu página web","menú con precios y botón de pedir"],wa:["WhatsApp","pedido armado por el asistente"],out:[["Pago QR","entra cobrado"],["Reseña","placa en caja"]],back:"el que ya pidió vuelve directo al chat, sin pasar por la app",money:[["0 % de comisión","Cada pedido que antes entraba por una app ahora es tuyo completo."],["Pedidos de noche","El asistente toma pedidos a las 23:40, cuando tú ya cerraste la caja."],["Ticket más alto","Sugiere bebida y postre en cada pedido, siempre, sin olvidarse."]]},web:{theme:"pizza",url:"pizzerialaesquina.bo",top:"Pedidos: +591 7 000 0000 · Abierto hasta las 23:30",nav:["Menú","Promos","Dónde estamos"],eyebrow:"Horno de leña desde 2014",tag:"La mejor pizza de Santa Cruz, en tu puerta en 25 minutos.",sub:"Masa madre, horno de leña y delivery propio sin comisión de apps. Pide por WhatsApp y paga con QR.",cta:"Pedir por WhatsApp",ghost:"Ver el menú",hero:"/assets/demo/rest-hero.webp",photos:["/assets/demo/rest-1.webp","/assets/demo/rest-2.webp","/assets/demo/rest-3.webp"],itemsTitle:"Lo más pedido",badge:"4,9 ★ · 212 reseñas en Google"},verbo:"Pedido",entrega:"Entrega",av:"LE",nombre:"Pizzería La Esquina",desc:"Pizzas al horno de leña · Santa Cruz",saludo:"Hola. Este es el menú de hoy. Toca una categoría o agrega directo.",cierre:"Sale en 25 minutos.",comision:true,
      delivery:[{n:"Retiro en local",c:0},{n:"Delivery Centro",c:5},{n:"Delivery fuera del centro",c:10}],
      CAT:[{sku:"PZ-001",n:"Pizza Margarita",d:"Mozzarella, tomate, albahaca",c:"Pizzas",p:55,v:["Mediana","Familiar"],s:30},{sku:"PZ-002",n:"Pizza Tarijeña",d:"Jamón serrano local, queso, aceitunas",c:"Pizzas",p:72,po:65,v:["Mediana","Familiar"],s:30},{sku:"PZ-003",n:"Pizza 4 quesos",d:"",c:"Pizzas",p:68,s:0},{sku:"PA-001",n:"Lasaña de carne",d:"Porción individual",c:"Pastas",p:48,s:20},{sku:"PA-002",n:"Ravioles de ricota",d:"Salsa a elección",c:"Pastas",p:45,v:["Boloñesa","Alfredo","Pomodoro"],s:20},{sku:"EN-001",n:"Pan de ajo",d:"6 unidades",c:"Entradas",p:18,s:50},{sku:"BE-001",n:"Gaseosa 2 L",d:"",c:"Bebidas",p:15,s:40},{sku:"BE-002",n:"Vino tinto de la casa",d:"Valle de Tarija · 750 ml",c:"Bebidas",p:85,s:12},{sku:"PO-001",n:"Tiramisú",d:"",c:"Postres",p:22,s:15}]},
    vinoteca:{flow:{title:"De «quiero un buen vino» a «despachado», desde cualquier ciudad.",src:[["Google","«vinos de Tarija envío»"],["Instagram","la foto de la etiqueta"],["Regalos corporativos","empresas que buscan canastas"]],hub:["Tu página web","catálogo con stock y precios"],wa:["WhatsApp","asesoría y pedido armado"],out:[["Pago QR","antes de despachar"],["Recompra","aviso de nueva cosecha"]],back:"cada cliente queda en tu base: le avisas de la próxima añada por WhatsApp",money:[["Vendes fuera de Tarija","Santa Cruz y La Paz compran sin pisar la tienda."],["Sin capturas falsas","El pago entra por QR y se concilia solo antes de despachar."],["Canastas de empresa","Un catálogo para regalos corporativos trae pedidos de 20 a 50 unidades."]]},web:{theme:"wine",url:"vinotecavallealto.bo",top:"Envíos a todo Bolivia · Retiro en tienda en Tarija · Pago con QR",nav:["Tintos","Blancos","Singanis","Regalos"],eyebrow:"Valle Central de Tarija · 1.850 m",tag:"Vinos de altura, elegidos a mano, en tu puerta.",sub:"Catálogo con stock real, asesoría por WhatsApp y despacho en 24 a 48 horas a cualquier ciudad de Bolivia.",cta:"Pedir por WhatsApp",ghost:"Ver la carta",ranges:[["Vinos","Tannat, Cabernet, blends de altura"],["Singanis","Blancos de Moscatel, edición de bodega"],["Regalos","Canastas y estuches para empresas"]],hero:"/assets/demo/vino-hero.webp",photos:["/assets/demo/vino-1.webp","/assets/demo/vino-2.webp","/assets/demo/vino-3.webp"],itemsTitle:"Selección de la semana",badge:"4,8 ★ en Google"},verbo:"Pedido",entrega:"Envío",av:"VA",nombre:"Vinoteca Valle Alto",desc:"Vinos y singanis de Tarija",saludo:"Hola. Esto es lo que tenemos esta semana. ¿Qué te enviamos?",cierre:"Lo despachamos hoy mismo.",
      delivery:[{n:"Retiro en tienda",c:0},{n:"Envío en Tarija",c:10},{n:"Envío a otra ciudad (24 a 48 h)",c:35}],
      CAT:[{sku:"TI-001",n:"Tannat Reserva 2022",d:"Valle Central · 750 ml",c:"Tintos",p:120,s:24},{sku:"TI-002",n:"Malbec Roble 2023",d:"750 ml",c:"Tintos",p:95,po:85,s:30},{sku:"TI-003",n:"Blend Gran Reserva",d:"Edición limitada",c:"Tintos",p:260,s:6},{sku:"BL-001",n:"Torrontés 2024",d:"Fresco, aromático",c:"Blancos",p:80,s:18},{sku:"SI-001",n:"Singani de altura",d:"750 ml",c:"Singanis",p:110,v:["Clásico","Gran Singani"],s:20},{sku:"PK-001",n:"Pack Vendimia",d:"3 tintos + 1 blanco + sacacorchos",c:"Packs",p:390,po:340,s:10},{sku:"PK-002",n:"Caja regalo",d:"1 botella a elección, caja de madera",c:"Packs",p:60,v:["Tannat Reserva","Malbec Roble","Torrontés"],s:15}]},
    clinica:{flow:{title:"De «me duele una muela» a «cita confirmada», con recordatorio automático.",src:[["Google Maps","«dentista cerca» · urgencia"],["Recomendación","un paciente comparte tu web"],["Anuncios","Meta · blanqueamiento"]],hub:["Tu página web","tratamientos, precios desde, doctores"],wa:["WhatsApp","cita agendada en un minuto"],out:[["Recordatorio","día anterior y 2 h antes"],["Reseña","al salir de consulta"]],back:"los recordatorios bajan las ausencias; el control semestral se agenda solo",money:[["Menos sillas vacías","Cada ausencia es una hora de consultorio perdida; el recordatorio la recupera."],["Anticipo opcional por QR","Quien paga el anticipo, llega. Sin perseguir a nadie."],["Más blanqueamientos","Los tratamientos estéticos se venden desde la web, con fotos y precio desde."]]},web:{theme:"dental",url:"clinicasonrie.bo",nav:["Tratamientos","Doctores","Precios","Contacto"],eyebrow:"Sin juicios, sin esperas",tag:"Volver al dentista puede ser algo que esperas con ganas.",sub:"Hayan pasado seis meses o seis años, agendas por WhatsApp en un minuto y te recordamos la cita el día anterior.",cta:"Agendar por WhatsApp",ghost:"Llamar · 7 000 0000",chips:["Limpieza","Blanqueamiento","Ortodoncia invisible","Implantes","Urgencias","Niños"],checks:["Agenda por WhatsApp en 1 minuto","Recordatorio el día anterior","Anticipo opcional por QR","Horario extendido y sábados","Precios desde, publicados","Financiamiento en cuotas"],quote:["Pensé que iba a doler y que me iban a regañar. Nada de eso. Salí con cita de control y hasta con ganas de volver.","Mariana Q. · Equipetrol"],hero:"/assets/demo/clin-hero.webp",photos:["/assets/demo/clin-1.webp","/assets/demo/clin-2.webp","/assets/demo/clin-3.webp"],itemsTitle:"Tratamientos",badge:"4,9 ★ · 180 reseñas",info:[["Agendar","Lun a Sáb · respuesta en minutos"],["Urgencias","+591 7 000 0000"],["Horario","08:30 a 19:30"]]},verbo:"Cita",entrega:"Cómo confirmas",av:"CS",nombre:"Clínica Dental Sonríe",desc:"Odontología general y estética",saludo:"Hola. ¿Qué tratamiento necesitas? Te confirmo la cita con el anticipo.",cierre:"Te esperamos. Te llega un recordatorio por WhatsApp el día anterior y otro 2 horas antes.",
      delivery:[{n:"Confirmo mi cita (sin anticipo)",c:0},{n:"Confirmo con anticipo del 20 %",c:0},{n:"Pago total anticipado (5 % menos)",c:0}],
      CAT:[{sku:"CO-001",n:"Consulta de valoración",d:"30 min · incluye diagnóstico",c:"Consultas",p:80,s:99},{sku:"CO-002",n:"Limpieza dental",d:"Profilaxis completa",c:"Consultas",p:180,s:99},{sku:"ES-001",n:"Blanqueamiento",d:"Sesión en consultorio",c:"Estética",p:850,po:750,s:99},{sku:"ES-002",n:"Carillas de porcelana",d:"Por pieza",c:"Estética",p:1800,s:99},{sku:"OR-001",n:"Ortodoncia · valoración",d:"Plan de tratamiento",c:"Ortodoncia",p:120,s:99},{sku:"HO-001",n:"Horario",d:"Elige tu bloque",c:"Horario",p:0,v:["Mañana 8:30 a 12:00","Tarde 14:00 a 19:00","Sábado 9:00 a 13:00"],s:99}]},
    hotel:{flow:{title:"De «¿tienen disponibilidad?» a «reserva pagada», sin comisión de intermediarios.",src:[["Google Maps","«hotel en Tarija» · 4,8 ★"],["Instagram","la foto de la vista"],["Portales","el huésped te busca directo después de verte ahí"]],hub:["Tu página web","habitaciones, tarifas en Bs y US$, reserva"],wa:["WhatsApp","reserva confirmada en el chat"],out:[["Anticipo QR","o tarjeta internacional"],["Reseña","al hacer check-out"]],back:"el huésped que ya vino reserva directo la próxima vez: cero comisión",money:[["Reserva directa","Lo que hoy paga a un portal por reserva se queda en tu caja."],["Anticipo que asegura","El 30 % por QR convierte una consulta en una noche vendida."],["Ocupación entre semana","Promos por WhatsApp a quienes ya se hospedaron llenan los días flojos."]]},web:{theme:"hotel",url:"hotelcasadelvalle.bo",nav:["Habitaciones","Experiencias","Cómo llegar"],eyebrow:"Hotel boutique · Tarija",tag:"Tu próxima escapada al valle empieza aquí.",sub:"Doce habitaciones con vista, desayuno incluido y reserva directa sin comisión.",cta:"Consultar por WhatsApp",ghost:"Ver habitaciones",hero:"/assets/demo/hotel-hero.webp",photos:["/assets/demo/hotel-1.webp","/assets/demo/hotel-2.webp","/assets/demo/hotel-3.webp"],itemsTitle:"Habitaciones",badge:"4,8 ★ en Google",booking:true},verbo:"Reserva",entrega:"Cómo confirmas",av:"CV",nombre:"Hotel Casa del Valle",desc:"Hotel boutique · 12 habitaciones · Tarija",saludo:"Hola. Tenemos disponibilidad. ¿Qué habitación y cuántas noches?",cierre:"Reserva confirmada. Te esperamos.",
      delivery:[{n:"Reservo con anticipo del 30 % por QR",c:0},{n:"Reservo con tarjeta internacional (turista)",c:0},{n:"Pago total anticipado (10 % menos)",c:0}],
      CAT:[{sku:"HA-001",n:"Habitación Estándar",d:"Por noche · desayuno incluido",c:"Habitaciones",p:280,v:["1 noche","2 noches","3 noches"],s:6},{sku:"HA-002",n:"Habitación Superior",d:"Por noche · vista al valle",c:"Habitaciones",p:380,po:340,v:["1 noche","2 noches","3 noches"],s:4},{sku:"HA-003",n:"Suite Casa del Valle",d:"Terraza privada · hasta 4 personas",c:"Habitaciones",p:620,v:["1 noche","2 noches"],s:1},{sku:"EX-001",n:"Tour del vino",d:"Medio día · 3 bodegas · con guía",c:"Experiencias",p:180,v:["Mañana","Tarde"],s:12},{sku:"EX-002",n:"Cena maridaje",d:"5 tiempos · por persona",c:"Experiencias",p:220,s:10},{sku:"TR-001",n:"Traslado aeropuerto",d:"Por trayecto · hasta 3 personas",c:"Traslados",p:60,v:["Llegada","Salida","Ida y vuelta"],s:99}]},
    estudio:{flow:{title:"De «necesito un abogado» a «consulta agendada y pagada», el mismo día.",src:[["Google","«abogado laboral Santa Cruz»"],["Referidos","un cliente comparte tu web"],["LinkedIn","empresas que buscan asesoría"]],hub:["Tu página web","áreas, equipo, honorarios claros"],wa:["WhatsApp","consulta agendada con el abogado del área"],out:[["Honorarios QR","cobrados al agendar"],["Reseña","y nuevo referido"]],back:"cada caso cerrado deja una reseña que trae el siguiente",money:[["Consultas que se cobran","El honorario de la primera consulta entra por QR al agendar, no después."],["Menos llamadas perdidas","Quien escribe a las 21:00 recibe respuesta y agenda; antes llamaba a otro."],["Clientes empresa","Una web seria con áreas claras abre la puerta a asesorías mensuales."]]},web:{theme:"law",url:"rojasasociados.bo",nav:["Áreas","Equipo","Casos","Contacto"],eyebrow:"Rojas & Asociados · Santa Cruz de la Sierra",tag:"Representación firme. Consejo honesto.",sub:"Quince años en laboral, civil y empresarial. Primera consulta presencial o por videollamada, agendada y confirmada por WhatsApp el mismo día.",cta:"Consultar por WhatsApp",ghost:"Ver resultados",results:[["Reincorporación","trabajador despedido sin causa, con salarios caídos"],["Contrato anulado","cláusulas abusivas en alquiler comercial"],["Sociedad constituida","en 9 días hábiles, FUNDEMPRESA y NIT"]],creds:["Colegio de Abogados de Santa Cruz","Universidad Gabriel René Moreno","Cámara de Comercio CAINCO","Registro Público de Abogados"],hero:"/assets/demo/est-hero.webp",photos:["/assets/demo/est-1.webp","/assets/demo/est-2.webp","/assets/demo/est-3.webp"],itemsTitle:"Servicios",badge:"4,9 ★ en Google",stats:[["15+","años de ejercicio"],["480+","casos atendidos"],["4,9","calificación en Google"],["24 h","respuesta máxima"]]},verbo:"Solicitud",entrega:"Cómo agendas",av:"RA",nombre:"Rojas & Asociados",desc:"Estudio jurídico · laboral, civil y empresarial",saludo:"Hola. Cuéntame qué necesitas y te agendo con el abogado del área.",cierre:"Agendado. Te llega la confirmación y el enlace de la reunión.",
      delivery:[{n:"Consulta presencial en el estudio",c:0},{n:"Consulta por videollamada",c:0}],
      CAT:[{sku:"CS-001",n:"Primera consulta",d:"45 min · orientación y pasos a seguir",c:"Consultas",p:150,v:["Mañana 9:00 a 12:00","Tarde 14:30 a 18:30"],s:99},{sku:"CS-002",n:"Revisión de contrato",d:"Hasta 10 páginas · informe en 48 h",c:"Consultas",p:350,s:99},{sku:"EM-001",n:"Constitución de empresa",d:"S.R.L. o unipersonal · trámite completo",c:"Empresas",p:2200,po:1900,s:99},{sku:"EM-002",n:"Registro de marca",d:"Búsqueda + solicitud ante SENAPI",c:"Empresas",p:1400,s:99},{sku:"LA-001",n:"Asesoría laboral mensual",d:"Contratos, finiquitos y consultas",c:"Laboral",p:900,s:99},{sku:"CI-001",n:"Redacción de contrato",d:"Alquiler, compraventa o servicios",c:"Civil",p:400,v:["Alquiler","Compraventa","Servicios"],s:99}]}
  };
  var $ = function(id){ return document.getElementById(id); };
  var ROOT = (function(){ var l = document.querySelector('link[href$="site.css"]'); return l ? l.getAttribute('href').replace(/assets\/site\.css$/, '') : '/'; })();
  function asset(u){ return u ? ROOT + String(u).replace(/^\//, '') : ''; }
  var esc = C.esc, fmt = C.fmt;
  var phoneEl = document.querySelector('.phone[data-mode="live"]');
  var chat = new C.Chat(phoneEl);
  var key = 'restaurante', R, cart, orderId, paid = false, summaryBub = null, carouselBub = null, caja = {n: 0, total: 0};
  try{ var q = new URLSearchParams(location.search).get('rubro'); if(RUBROS[q]) key = q; }catch(e){}

  function now(){ var d = new Date(); return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(); }
  function cats(){ var s = []; R.CAT.forEach(function(i){ if(s.indexOf(i.c) < 0) s.push(i.c); }); return s; }
  function tintsFor(items){ return items.map(function(i){ return C.TINTS[cats().indexOf(i.c) % C.TINTS.length]; }); }

  function showCategory(c){
    var items = R.CAT.filter(function(i){ return i.c === c; });
    var html = C.chipsHTML(cats(), c) + C.carouselHTML(items, tintsFor(items));
    if(carouselBub && carouselBub.parentNode){ carouselBub.innerHTML = html + '<span class="time">' + now() + '</span>'; chat.scroll(); }
    else carouselBub = chat.add('them', html, now());
  }

  var WA_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>';
  function renderWeb(){
    var el = $('mocksite'); if(!el) return; var W = R.web || {};
    var items = R.CAT.slice(0, 3);
    el.className = 'mocksite ms-' + (W.theme || 'pizza');
    if($('m-url')) $('m-url').textContent = W.url || '';
    var nav = '<header class="ms-nav"><b class="ms-logo">' + esc(R.nombre) + '</b><nav>' + (W.nav || []).map(function(n){ return '<span>' + esc(n) + '</span>'; }).join('') + '</nav><span class="ms-btn">' + esc(W.cta || 'WhatsApp') + '</span></header>';
    var top = W.top ? '<div class="ms-top">' + esc(W.top) + '</div>' : '';
    var copy = '<div class="ms-copy"><small>' + esc(W.eyebrow || '') + '</small><h3>' + esc(W.tag || '') + '</h3><p>' + esc(W.sub || '') + '</p>' +
      '<div class="ms-row"><button type="button" class="mcta" data-web-cta>' + WA_SVG + esc(W.cta || 'Pedir por WhatsApp') + '</button><span class="ms-ghost">' + esc(W.ghost || 'Ver más') + '</span></div>' +
      '<span class="ms-badge">' + esc(W.badge || '') + '</span></div>';
    var extra = '';
    if(W.booking) extra = '<div class="ms-book"><div><small>Llegada</small><b>Vie 24 oct</b></div><div><small>Salida</small><b>Dom 26 oct</b></div><div><small>Huéspedes</small><b>2 adultos</b></div><button type="button" class="mcta ms-book-cta" data-web-cta>Consultar disponibilidad</button></div>';
    if(W.stats) extra = '<div class="ms-stats">' + W.stats.map(function(st){ return '<div><b>' + esc(st[0]) + '</b><span>' + esc(st[1]) + '</span></div>'; }).join('') + '</div>';
    if(W.info) extra = '<div class="ms-info">' + W.info.map(function(i){ return '<div><b>' + esc(i[0]) + '</b><span>' + esc(i[1]) + '</span></div>'; }).join('') + '</div>';
    if(W.chips) extra = '<div class="ms-chips">' + W.chips.map(function(c){ return '<span>' + esc(c) + '</span>'; }).join('') + '</div>';
    if(W.results) extra = '<div class="ms-results">' + W.results.map(function(r){ return '<div><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></div>'; }).join('') + '</div>';
    var hero = '<section class="ms-hero" style="--hero:url(' + asset(W.hero) + ')"><div class="ms-hero-img" aria-hidden="true"></div>' + copy + extra + '</section>';
    var th = W.theme || 'pizza';
    var tags = ['10 % hoy', 'Nuevo', 'Favorito'];
    var cards = '<section class="ms-items"><div class="ms-items-hd"><h4>' + esc(W.itemsTitle || 'Destacados') + '</h4><span>Pide o reserva por WhatsApp y paga con QR</span></div><div class="ms-grid">' +
      items.map(function(i, k){
        var ph = '<div class="ms-ph" style="background-image:url(' + asset((W.photos || [])[k]) + ')">' + (th === 'wine' ? '<i class="ms-tag">' + tags[k] + '</i>' : '') + (th === 'dental' ? '<i class="ms-num">[0' + (k + 1) + ']</i>' : '') + '</div>';
        var pills = th === 'dental' ? '<div class="ms-pills"><span>' + esc(i.c) + '</span><span>' + (i.v ? esc(i.v[0]) : 'Sin anticipo') + '</span></div>' : '';
        return '<article class="ms-card">' + ph + '<div class="ms-card-b"><b>' + esc(i.n) + '</b><span>' + esc(i.d || '') + '</span>' + pills + '<em>' + fmt(i.po || i.p) + (R.verbo === 'Reserva' ? ' / noche' : '') + '</em></div></article>';
      }).join('') + '</div></section>';
    var more = '';
    if(th === 'pizza') more = '<section class="ms-split"><div class="ms-split-copy"><small>Sobre nosotros</small><h4>Horno de leña, masa de 48 horas y delivery propio.</h4><p>Sin comisiones de apps: lo que pagas va a la pizza, no a un intermediario.</p><ul class="ms-contact"><li>Av. Monseñor Rivero 123, Santa Cruz</li><li>Lun a Dom · 18:00 a 23:30</li></ul><div class="ms-row"><button type="button" class="mcta" data-web-cta>Pedir por WhatsApp</button><span class="ms-ghost">Reservar mesa</span></div></div><div class="ms-split-img" style="background-image:url(' + asset('/assets/demo/rest-2.webp') + ')"></div></section>';
    if(th === 'law') more = '<div class="ms-creds"><small>01 · Credenciales</small>' + W.creds.map(function(c){ return '<span>' + esc(c) + '</span>'; }).join('') + '</div><section class="ms-areas"><div class="ms-areas-hd"><small>02 · Áreas de práctica</small><h4>Un abogado para cada tema, un solo canal para hablar.</h4></div><div class="ms-areas-grid">' + [['Laboral','Despidos, finiquitos, contratos'],['Civil','Contratos, alquileres, cobros'],['Empresarial','Constitución de empresas, FUNDEMPRESA'],['Familia','Divorcios, asistencia familiar'],['Tributario','RC-IVA, SIAT, descargos'],['Penal','Defensa y querellas']].map(function(a){ return '<div><b>' + a[0] + '</b><span>' + a[1] + '</span></div>'; }).join('') + '</div></section><section class="ms-band"><div><small>Primera consulta</small><h4>Cuéntanos tu caso hoy. Te respondemos en menos de 24 horas.</h4></div><button type="button" class="mcta" data-web-cta>Consultar por WhatsApp</button></section>';
    if(th === 'hotel') more = '<section class="ms-feats"><div class="ms-items-hd"><h4>Por qué reservar directo</h4><span>Sin intermediarios, mejor precio</span></div><div class="ms-feats-grid">' + [['Mejor precio garantizado', W.photos[0]],['Desayuno y vista incluidos', W.photos[1]],['Cancelación flexible', W.photos[2]]].map(function(f, k){ return '<div class="ms-feat" style="background-image:url(' + asset(f[1]) + ')"><i>//0' + (k + 1) + '</i><b>' + f[0] + '</b></div>'; }).join('') + '</div></section><section class="ms-band hotel" style="background-image:url(' + asset(W.hero) + ')"><div><small>Fin de semana largo</small><h4>Tercera noche al 50 % reservando por WhatsApp.</h4></div><button type="button" class="mcta" data-web-cta>Reservar ahora</button></section>';
    if(th === 'dental') more = '<section class="ms-why"><div class="ms-why-copy"><small>Por qué Sonríe</small><h4>Odontología moderna, con un trato más suave.</h4><p>Más de 180 reseñas de cinco estrellas en Google.</p><ul class="ms-checks">' + W.checks.map(function(c){ return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div><div class="ms-quote"><p>«' + esc(W.quote[0]) + '»</p><span>★★★★★</span><b>' + esc(W.quote[1]) + '</b></div></section>';
    if(false) more = '<section class="ms-stats2"><div class="ms-items-hd"><h4>Lo que dicen los pacientes</h4><span>Datos de la clínica, actualizados cada mes</span></div><div class="ms-stats2-grid">' + [['92 %','vuelve a su control semestral', W.photos[0]],['7 min','de espera promedio', W.photos[1]],['4,9 ★','en más de 180 reseñas de Google', W.photos[2]]].map(function(f){ return '<div class="ms-stat2" style="background-image:url(' + asset(f[2]) + ')"><b>' + f[0] + '</b><span>' + f[1] + '</span></div>'; }).join('') + '</div></section>';
    if(th === 'wine') more = '<section class="ms-ranges"><h4>Nuestra selección</h4><div class="ms-ranges-grid">' + W.ranges.map(function(r, k){ return '<div><div class="ms-ph" style="background-image:url(' + asset(W.photos[k]) + ')"></div><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span><em>Ver selección</em></div>'; }).join('') + '</div></section><div class="ms-marq"><span>Tannat · Singani · Moscatel de Alejandría · Cabernet · Vinos de altura · Tannat · Singani · Moscatel de Alejandría · Cabernet · Vinos de altura · </span></div><section class="ms-split wine"><div class="ms-split-img" style="background-image:url(' + asset(W.photos[2]) + ')"></div><div class="ms-split-copy"><small>Envíos a todo Bolivia</small><h4>Pide hoy, brinda mañana.</h4><ul class="ms-bullets"><li>Despacho en 24 a 48 horas a cualquier ciudad</li><li>Embalaje anti golpes y seguimiento por WhatsApp</li><li>Pago con QR al confirmar, sin capturas</li></ul><button type="button" class="mcta" data-web-cta>Pedir por WhatsApp</button></div></section>';
    cards += more;
    el.innerHTML = top + nav + hero + cards;
  }
  function fromWeb(){
    var stage = document.querySelector('.demo-stage');
    if(stage) stage.scrollIntoView({behavior: 'smooth', block: 'start'});
    chat.add('me', 'Hola, vengo de la web. ¿Tienen disponible?', now());
    var tb = chat.typing();
    setTimeout(function(){ chat.replaceTyping(tb, esc(R.saludo), now()); carouselBub = null; showCategory(cats()[0]); }, 650);
    if(phoneEl){ phoneEl.classList.remove('nudge'); void phoneEl.offsetWidth; phoneEl.classList.add('nudge'); }
  }

  function renderFlow(){
    var box = $('flowdemo'); if(!box) return; var F = R.flow; if(!F){ box.innerHTML = ''; return; }
    if($('f-title')) $('f-title').textContent = F.title;
    function node(cls, x, y, w, h, t, sub, center){
      var cx = center ? w / 2 : 44, anchor = center ? ' c' : '';
      var dot = center ? '<circle class="pulse big" cx="' + (w / 2) + '" cy="38" r="8"/><circle class="dot" cx="' + (w / 2) + '" cy="38" r="8"/>' : '<circle class="pulse" cx="22" cy="40" r="6"/><circle class="dot" cx="22" cy="40" r="6"/>';
      var ty = center ? 76 : 36, sy = center ? 98 : 58;
      if(cls === 'out'){ dot = ''; ty = 30; sy = 52; }
      return '<g class="node ' + cls + '" transform="translate(' + x + ',' + y + ')"><rect width="' + w + '" height="' + h + '" rx="' + (cls === 'hub' || cls === 'hub wa' ? 18 : 14) + '"/>' + dot +
        '<text x="' + cx + '" y="' + ty + '" class="t' + anchor + '">' + esc(t) + '</text><text x="' + cx + '" y="' + sy + '" class="s' + anchor + '">' + esc(sub) + '</text></g>';
    }
    var svg = '<div class="flowmap-wrap"><svg class="flowmap" viewBox="0 0 1200 440" role="img" aria-label="' + esc(F.title) + '">' +
      '<defs><path id="q1" d="M250 90 C 360 90, 380 220, 490 220"/><path id="q2" d="M250 220 L 490 220"/><path id="q3" d="M250 350 C 360 350, 380 220, 490 220"/><path id="q4" d="M710 220 L 870 220"/><path id="q5" d="M1010 220 C 1060 220, 1060 130, 1110 130"/><path id="q6" d="M1010 220 C 1060 220, 1060 310, 1110 310"/><path id="qback" d="M1150 345 C 1150 420, 600 430, 600 300"/></defs>' +
      '<g class="wires"><use href="#q1"/><use href="#q2"/><use href="#q3"/><use href="#q4"/><use href="#q5"/><use href="#q6"/><use href="#qback" class="dashed"/></g>' +
      '<g class="movers">' + [['q1','3.2s','0s',''],['q2','2.6s','0.8s',''],['q3','3.4s','1.6s',''],['q4','2.2s','0.4s',''],['q4','2.2s','1.9s',''],['q5','2s','1.2s','paid'],['q6','2.4s','2.4s','star'],['qback','5s','3s','back']].map(function(m){ return '<circle r="' + (m[3] === 'back' ? 4 : 5) + '" cx="-40" cy="-40" class="' + m[3] + '"><animateMotion dur="' + m[1] + '" begin="' + m[2] + '" repeatCount="indefinite"><mpath href="#' + m[0] + '"/></animateMotion></circle>'; }).join('') + '</g>' +
      node('src', 40, 50, 210, 80, F.src[0][0], F.src[0][1]) + node('src', 40, 180, 210, 80, F.src[1][0], F.src[1][1]) + node('src', 40, 310, 210, 80, F.src[2][0], F.src[2][1]) +
      node('hub', 490, 160, 220, 120, F.hub[0], F.hub[1], true) + node('hub wa', 870, 160, 140, 120, F.wa[0], F.wa[1], true) +
      node('out', 1110, 95, 80, 70, F.out[0][0], F.out[0][1], true) + node('out', 1110, 275, 80, 70, F.out[1][0], F.out[1][1], true) +
      '<text x="600" y="420" class="s c back-label">' + esc(F.back) + '</text></svg></div>';
    box.innerHTML = svg;
    var m = $('f-money'); if(m) m.innerHTML = '<p class="eyebrow">Dónde aparece el dinero</p><div class="money-grid">' + F.money.map(function(x, i){ return '<div><span class="mn">' + (i + 1) + '</span><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div>';
  }
  function load(k){
    key = k; R = RUBROS[k]; cart = {}; paid = false; summaryBub = null; carouselBub = null;
    orderId = String(Date.now()).slice(-6);
    document.querySelectorAll('[data-rubro]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-rubro') === k ? 'true' : 'false'); });
    $('d-name').textContent = R.nombre; $('d-av').textContent = R.av;
    $('o-biz').textContent = R.nombre; $('o-desc').textContent = R.desc;
    $('d-deliv-label').textContent = R.entrega; caja = {n: 0, total: 0}; $('o-n').textContent = '0'; $('o-total').textContent = '0 Bs'; pendingRow = null; $('o-live').innerHTML = '<p class="o-empty">Cuando tu cliente pague, el pedido aparece aquí. Sin preguntar, sin revisar comprobantes.</p>'; updateCommission();
    $('d-deliv').innerHTML = R.delivery.map(function(d){ return '<option>' + esc(d.n) + (d.c ? ' (+' + d.c + ' Bs)' : '') + '</option>'; }).join('');
    try{ var u = new URL(location.href); u.searchParams.set('rubro', k); history.replaceState(null, '', u); }catch(e){}
    renderWeb(); renderFlow();
    chat.clear();
    chat.add('me', 'Hola, ¿tienen disponible?', now());
    var tb = chat.typing();
    setTimeout(function(){ chat.replaceTyping(tb, esc(R.saludo), now()); showCategory(cats()[0]); }, 650);
    updateSend();
  }
  function deliv(){ return R.delivery[$('d-deliv').selectedIndex] || R.delivery[0]; }
  function lines(){ return Object.keys(cart).map(function(k){ var l = cart[k]; return {q: l.q, n: l.i.n + (l.v ? ' (' + l.v + ')' : ''), t: (l.i.po || l.i.p) * l.q}; }); }
  function total(){ var t = 0; lines().forEach(function(l){ t += l.t; }); return t + deliv().c; }
  function summarize(){
    var ls = lines(); if(!ls.length) return;
    var html = C.summaryHTML(ls, deliv(), total(), '<button type="button" class="act" data-pay>Pagar con QR · ' + fmt(total()) + '</button>');
    if(summaryBub && summaryBub.parentNode){ summaryBub.innerHTML = html + '<span class="time">' + now() + '</span>'; chat.scroll(); }
    else { var tb = chat.typing(); summaryBub = tb; setTimeout(function(){ chat.replaceTyping(tb, html, now()); }, 500); }
    // el resumen siempre al final: si el carrusel quedó debajo, lo movemos arriba
    if(carouselBub && summaryBub && carouselBub.compareDocumentPosition(summaryBub) & Node.DOCUMENT_POSITION_PRECEDING){ chat.list.insertBefore(carouselBub, summaryBub); }
  }
  function add(sku, selEl){
    if(paid) return;
    var i = R.CAT.filter(function(x){ return x.sku === sku; })[0]; if(!i || i.s === 0) return;
    var sel = selEl || (carouselBub && carouselBub.querySelector('select[data-for="' + sku + '"]')), v = sel ? sel.value : '', k = sku + (v ? ' · ' + v : '');
    cart[k] = cart[k] || {i: i, v: v, q: 0}; cart[k].q++;
    chat.add('me', esc((cart[k].q > 1 ? cart[k].q + ' × ' : '') + i.n + (v ? ' (' + v + ')' : '')), now());
    if(summaryBub){ summaryBub.remove(); summaryBub = null; }
    summarize(); updateSend(); ownerPending();
  }
  var pendingRow = null;
  function ownerPending(){
    var live = $('o-live'), empty = live.querySelector('.o-empty'); if(empty) empty.remove();
    if(!pendingRow || !pendingRow.parentNode){ pendingRow = document.createElement('div'); pendingRow.className = 'o-row pending'; live.insertBefore(pendingRow, live.firstChild); }
    pendingRow.innerHTML = '<span class="o-dot"></span><div><b>' + esc(R.verbo) + ' en curso · #' + orderId + '</b><small>' + lines().map(function(l){ return l.q + ' × ' + esc(l.n); }).join(', ') + '</small></div><span class="o-amt num">' + fmt(total()) + '</span>';
  }
  function pay(){
    if(paid || !Object.keys(cart).length){ toast('Agrega algo primero.'); return; }
    paid = true;
    var t = total(), id = orderId, ls = lines(), d = deliv();
    var tb = chat.typing();
    setTimeout(function(){ chat.replaceTyping(tb, '<div>Escanea para pagar <b>' + fmt(t) + '</b></div>' + C.qrHTML(t) + '<div style="font-size:.74rem;color:var(--ink-3)">Vence en 10 min</div>', now()); }, 500);
    setTimeout(function(){ chat.add('me', 'Listo, pagué', now()); }, 2400);
    setTimeout(function(){
      var tb2 = chat.typing();
      setTimeout(function(){ chat.replaceTyping(tb2, C.paidHTML(t, id) + '<div style="margin-top:.3rem">' + esc(R.cierre) + '</div>', now()); }, 600);
      // lado del negocio
      caja.n++; caja.total += t;
      var live = $('o-live');
      if(pendingRow && pendingRow.parentNode) pendingRow.remove(); pendingRow = null;
      var row = document.createElement('div'); row.className = 'o-row new';
      row.innerHTML = '<span class="o-dot ok"></span><div><b>' + esc(R.verbo) + ' #' + id + ' · ' + esc(d.n) + '</b><small>' + ls.map(function(l){ return l.q + ' × ' + esc(l.n); }).join(', ') + '</small></div><span class="o-amt num paid-amt">' + fmt(t) + '</span>';
      live.insertBefore(row, live.firstChild);
      $('o-n').textContent = caja.n; $('o-total').textContent = fmt(caja.total); $('o-zero').textContent = '0'; updateCommission();
      // nuevo pedido listo para seguir
      setTimeout(function(){ cart = {}; paid = false; summaryBub = null; orderId = String(Date.now()).slice(-6); var tb3 = chat.typing(); setTimeout(function(){ chat.replaceTyping(tb3, '¿Algo más? Puedes seguir pidiendo.', now()); carouselBub = null; showCategory(cats()[0]); updateSend(); }, 500); }, 2600);
    }, 3100);
  }
  function message(){
    var ls = lines(), d = deliv();
    return '*' + R.verbo + ' · ' + R.nombre + '* (demo)\n' + (ls.map(function(l){ return '• ' + l.q + ' × ' + l.n + ': ' + fmt(l.t); }).join('\n') || '(sin productos)') +
      '\n' + R.entrega + ': ' + d.n + (d.c ? ' (+' + fmt(d.c) + ')' : '') + '\n*Total: ' + fmt(total()) + '*\n' + R.verbo + ' #' + orderId;
  }
  function updateSend(){ $('d-send').href = window.OP ? window.OP.waHref(message()) : 'https://wa.me/59171868545?text=' + encodeURIComponent(message()); }
  function updateCommission(){
    var box = $('o-com'); if(!box) return;
    box.hidden = !R.comision;
    if(!R.comision) return;
    var pct = Math.max(0, Math.min(60, +$('o-pct').value || 0));
    $('o-saved').textContent = fmt(Math.round(caja.total * pct / 100));
  }
  function toast(msg){ var n = document.createElement('div'); n.className = 'toast'; n.textContent = msg; document.body.appendChild(n); setTimeout(function(){ n.remove(); }, 2200); }

  document.addEventListener('click', function(e){
    var t = e.target.closest('button'); if(!t) return;
    if(t.hasAttribute('data-rubro')) load(t.getAttribute('data-rubro'));
    else if(t.hasAttribute('data-web-cta')) fromWeb();
    else if(t.hasAttribute('data-cat') && phoneEl.contains(t)) showCategory(t.getAttribute('data-cat'));
    else if(t.hasAttribute('data-add')){ var card = t.closest('.card'); add(t.getAttribute('data-add'), card && card.querySelector('select')); }
    else if(t.hasAttribute('data-pay') || t.id === 'd-pay') pay();
    else if(t.id === 'd-reset') load(key);
  });
  if($('o-pct')) $('o-pct').addEventListener('input', updateCommission);
  $('d-deliv').addEventListener('change', function(){ if(summaryBub && !paid) summarize(); updateSend(); });
  $('d-send').addEventListener('click', function(e){ if(!Object.keys(cart).length){ e.preventDefault(); toast('Agrega algo primero.'); } });
  load(key);
})();
