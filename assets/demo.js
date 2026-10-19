/* Demo v2: tú compras dentro del teléfono; a la derecha ves lo que ve el negocio */
(function(){
  var C = window.OPChat; if(!C) return;
  var RUBROS = {
    restaurante:{web:{theme:"pizza",url:"pizzerialaesquina.bo",top:"Pedidos: +591 7 000 0000 · Abierto hasta las 23:30",nav:["Menú","Promos","Dónde estamos"],eyebrow:"Horno de leña desde 2014",tag:"La mejor pizza de Santa Cruz, en tu puerta en 25 minutos.",sub:"Masa madre, horno de leña y delivery propio sin comisión de apps. Pide por WhatsApp y paga con QR.",cta:"Pedir por WhatsApp",ghost:"Ver el menú",hero:"/assets/demo/rest-hero.webp",photos:["/assets/demo/rest-1.webp","/assets/demo/rest-2.webp","/assets/demo/rest-3.webp"],itemsTitle:"Lo más pedido",badge:"4,9 ★ · 212 reseñas en Google"},verbo:"Pedido",entrega:"Entrega",av:"LE",nombre:"Pizzería La Esquina",desc:"Pizzas al horno de leña · Santa Cruz",saludo:"Hola. Este es el menú de hoy. Toca una categoría o agrega directo.",cierre:"Sale en 25 minutos.",comision:true,
      delivery:[{n:"Retiro en local",c:0},{n:"Delivery Centro",c:5},{n:"Delivery fuera del centro",c:10}],
      CAT:[{sku:"PZ-001",n:"Pizza Margarita",d:"Mozzarella, tomate, albahaca",c:"Pizzas",p:55,v:["Mediana","Familiar"],s:30},{sku:"PZ-002",n:"Pizza Tarijeña",d:"Jamón serrano local, queso, aceitunas",c:"Pizzas",p:72,po:65,v:["Mediana","Familiar"],s:30},{sku:"PZ-003",n:"Pizza 4 quesos",d:"",c:"Pizzas",p:68,s:0},{sku:"PA-001",n:"Lasaña de carne",d:"Porción individual",c:"Pastas",p:48,s:20},{sku:"PA-002",n:"Ravioles de ricota",d:"Salsa a elección",c:"Pastas",p:45,v:["Boloñesa","Alfredo","Pomodoro"],s:20},{sku:"EN-001",n:"Pan de ajo",d:"6 unidades",c:"Entradas",p:18,s:50},{sku:"BE-001",n:"Gaseosa 2 L",d:"",c:"Bebidas",p:15,s:40},{sku:"BE-002",n:"Vino tinto de la casa",d:"Valle de Tarija · 750 ml",c:"Bebidas",p:85,s:12},{sku:"PO-001",n:"Tiramisú",d:"",c:"Postres",p:22,s:15}]},
    vinoteca:{web:{theme:"wine",url:"vinotecavallealto.bo",top:"Envíos a todo Bolivia · Retiro en tienda en Tarija · Pago con QR",nav:["Tintos","Blancos","Singanis","Regalos"],eyebrow:"Del Valle Central de Tarija",tag:"Vinos y singanis elegidos a mano, enviados a tu puerta.",sub:"Catálogo con stock real, asesoría por WhatsApp y despacho en 24 a 48 horas a cualquier ciudad.",cta:"Pedir por WhatsApp",ghost:"Ver la carta",hero:"/assets/demo/vino-hero.webp",photos:["/assets/demo/vino-1.webp","/assets/demo/vino-2.webp","/assets/demo/vino-3.webp"],itemsTitle:"Selección de la semana",badge:"4,8 ★ en Google"},verbo:"Pedido",entrega:"Envío",av:"VA",nombre:"Vinoteca Valle Alto",desc:"Vinos y singanis de Tarija",saludo:"Hola. Esto es lo que tenemos esta semana. ¿Qué te enviamos?",cierre:"Lo despachamos hoy mismo.",
      delivery:[{n:"Retiro en tienda",c:0},{n:"Envío en Tarija",c:10},{n:"Envío a otra ciudad (24 a 48 h)",c:35}],
      CAT:[{sku:"TI-001",n:"Tannat Reserva 2022",d:"Valle Central · 750 ml",c:"Tintos",p:120,s:24},{sku:"TI-002",n:"Malbec Roble 2023",d:"750 ml",c:"Tintos",p:95,po:85,s:30},{sku:"TI-003",n:"Blend Gran Reserva",d:"Edición limitada",c:"Tintos",p:260,s:6},{sku:"BL-001",n:"Torrontés 2024",d:"Fresco, aromático",c:"Blancos",p:80,s:18},{sku:"SI-001",n:"Singani de altura",d:"750 ml",c:"Singanis",p:110,v:["Clásico","Gran Singani"],s:20},{sku:"PK-001",n:"Pack Vendimia",d:"3 tintos + 1 blanco + sacacorchos",c:"Packs",p:390,po:340,s:10},{sku:"PK-002",n:"Caja regalo",d:"1 botella a elección, caja de madera",c:"Packs",p:60,v:["Tannat Reserva","Malbec Roble","Torrontés"],s:15}]},
    clinica:{web:{theme:"dental",url:"clinicasonrie.bo",nav:["Tratamientos","Doctores","Precios","Contacto"],eyebrow:"Odontología general y estética",tag:"Tu cita dental confirmada en un minuto, sin llamar.",sub:"Agenda por WhatsApp, recibe recordatorio el día anterior y paga el anticipo con QR si lo prefieres.",cta:"Agendar por WhatsApp",ghost:"Ver tratamientos",hero:"/assets/demo/clin-hero.webp",photos:["/assets/demo/clin-1.webp","/assets/demo/clin-2.webp","/assets/demo/clin-3.webp"],itemsTitle:"Tratamientos",badge:"4,9 ★ · 180 reseñas",info:[["Agendar","Lun a Sáb · respuesta en minutos"],["Urgencias","+591 7 000 0000"],["Horario","08:30 a 19:30"]]},verbo:"Cita",entrega:"Cómo confirmas",av:"CS",nombre:"Clínica Dental Sonríe",desc:"Odontología general y estética",saludo:"Hola. ¿Qué tratamiento necesitas? Te confirmo la cita con el anticipo.",cierre:"Te esperamos. Te llega un recordatorio por WhatsApp el día anterior y otro 2 horas antes.",
      delivery:[{n:"Confirmo mi cita (sin anticipo)",c:0},{n:"Confirmo con anticipo del 20 %",c:0},{n:"Pago total anticipado (5 % menos)",c:0}],
      CAT:[{sku:"CO-001",n:"Consulta de valoración",d:"30 min · incluye diagnóstico",c:"Consultas",p:80,s:99},{sku:"CO-002",n:"Limpieza dental",d:"Profilaxis completa",c:"Consultas",p:180,s:99},{sku:"ES-001",n:"Blanqueamiento",d:"Sesión en consultorio",c:"Estética",p:850,po:750,s:99},{sku:"ES-002",n:"Carillas de porcelana",d:"Por pieza",c:"Estética",p:1800,s:99},{sku:"OR-001",n:"Ortodoncia · valoración",d:"Plan de tratamiento",c:"Ortodoncia",p:120,s:99},{sku:"HO-001",n:"Horario",d:"Elige tu bloque",c:"Horario",p:0,v:["Mañana 8:30 a 12:00","Tarde 14:00 a 19:00","Sábado 9:00 a 13:00"],s:99}]},
    hotel:{web:{theme:"hotel",url:"hotelcasadelvalle.bo",nav:["Habitaciones","Experiencias","Cómo llegar"],eyebrow:"Hotel boutique · Tarija",tag:"Tu próxima escapada al valle empieza aquí.",sub:"Doce habitaciones con vista, desayuno incluido y reserva directa sin comisión.",cta:"Consultar por WhatsApp",ghost:"Ver habitaciones",hero:"/assets/demo/hotel-hero.webp",photos:["/assets/demo/hotel-1.webp","/assets/demo/hotel-2.webp","/assets/demo/hotel-3.webp"],itemsTitle:"Habitaciones",badge:"4,8 ★ en Google",booking:true},verbo:"Reserva",entrega:"Cómo confirmas",av:"CV",nombre:"Hotel Casa del Valle",desc:"Hotel boutique · 12 habitaciones · Tarija",saludo:"Hola. Tenemos disponibilidad. ¿Qué habitación y cuántas noches?",cierre:"Reserva confirmada. Te esperamos.",
      delivery:[{n:"Reservo con anticipo del 30 % por QR",c:0},{n:"Reservo con tarjeta internacional (turista)",c:0},{n:"Pago total anticipado (10 % menos)",c:0}],
      CAT:[{sku:"HA-001",n:"Habitación Estándar",d:"Por noche · desayuno incluido",c:"Habitaciones",p:280,v:["1 noche","2 noches","3 noches"],s:6},{sku:"HA-002",n:"Habitación Superior",d:"Por noche · vista al valle",c:"Habitaciones",p:380,po:340,v:["1 noche","2 noches","3 noches"],s:4},{sku:"HA-003",n:"Suite Casa del Valle",d:"Terraza privada · hasta 4 personas",c:"Habitaciones",p:620,v:["1 noche","2 noches"],s:1},{sku:"EX-001",n:"Tour del vino",d:"Medio día · 3 bodegas · con guía",c:"Experiencias",p:180,v:["Mañana","Tarde"],s:12},{sku:"EX-002",n:"Cena maridaje",d:"5 tiempos · por persona",c:"Experiencias",p:220,s:10},{sku:"TR-001",n:"Traslado aeropuerto",d:"Por trayecto · hasta 3 personas",c:"Traslados",p:60,v:["Llegada","Salida","Ida y vuelta"],s:99}]},
    estudio:{web:{theme:"law",url:"rojasasociados.bo",nav:["Áreas","Equipo","Casos","Contacto"],eyebrow:"Estudio jurídico · Santa Cruz",tag:"Asesoría legal clara, con respuesta el mismo día.",sub:"Laboral, civil y empresarial. Primera consulta presencial o por videollamada, agendada por WhatsApp.",cta:"Consultar por WhatsApp",ghost:"Ver áreas",hero:"/assets/demo/est-hero.webp",photos:["/assets/demo/est-1.webp","/assets/demo/est-2.webp","/assets/demo/est-3.webp"],itemsTitle:"Servicios",badge:"4,9 ★ en Google",stats:[["15+","años de ejercicio"],["480+","casos atendidos"],["4,9","calificación en Google"],["24 h","respuesta máxima"]]},verbo:"Solicitud",entrega:"Cómo agendas",av:"RA",nombre:"Rojas & Asociados",desc:"Estudio jurídico · laboral, civil y empresarial",saludo:"Hola. Cuéntame qué necesitas y te agendo con el abogado del área.",cierre:"Agendado. Te llega la confirmación y el enlace de la reunión.",
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
    var hero = '<section class="ms-hero" style="--hero:url(' + asset(W.hero) + ')"><div class="ms-hero-img" aria-hidden="true"></div>' + copy + extra + '</section>';
    var cards = '<section class="ms-items"><div class="ms-items-hd"><h4>' + esc(W.itemsTitle || 'Destacados') + '</h4><span>Pide o reserva por WhatsApp y paga con QR</span></div><div class="ms-grid">' +
      items.map(function(i, k){ return '<article class="ms-card"><div class="ms-ph" style="background-image:url(' + asset((W.photos || [])[k]) + ')"></div><div class="ms-card-b"><b>' + esc(i.n) + '</b><span>' + esc(i.d || '') + '</span><em>' + fmt(i.po || i.p) + (R.verbo === 'Reserva' ? ' / noche' : '') + '</em></div></article>'; }).join('') + '</div></section>';
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
  function load(k){
    key = k; R = RUBROS[k]; cart = {}; paid = false; summaryBub = null; carouselBub = null;
    orderId = String(Date.now()).slice(-6);
    document.querySelectorAll('[data-rubro]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-rubro') === k ? 'true' : 'false'); });
    $('d-name').textContent = R.nombre; $('d-av').textContent = R.av;
    $('o-biz').textContent = R.nombre; $('o-desc').textContent = R.desc;
    $('d-deliv-label').textContent = R.entrega; caja = {n: 0, total: 0}; $('o-n').textContent = '0'; $('o-total').textContent = '0 Bs'; pendingRow = null; $('o-live').innerHTML = '<p class="o-empty">Cuando tu cliente pague, el pedido aparece aquí. Sin preguntar, sin revisar comprobantes.</p>'; updateCommission();
    $('d-deliv').innerHTML = R.delivery.map(function(d){ return '<option>' + esc(d.n) + (d.c ? ' (+' + d.c + ' Bs)' : '') + '</option>'; }).join('');
    try{ var u = new URL(location.href); u.searchParams.set('rubro', k); history.replaceState(null, '', u); }catch(e){}
    renderWeb();
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
