/* Calculadora Pedidos con QR: todo ocurre en el navegador, no se envía nada */
(function(){
  var $ = function(id){ return document.getElementById(id); };
  var fmt = function(n){ return Math.round(n).toLocaleString('es-BO') + ' Bs'; };
  var MENSUAL = 400, COM = 0.05, SETUP = 2000;
  var base = {
    pedidos: ['pedidos', 'Pedidos por día (mesa, delivery y recojo, todos)', 10, 600, 80, 5, ''],
    ticket: ['ticket', 'Ticket promedio por pedido', 10, 400, 70, 5, ' Bs'],
    qr: ['qr', 'De tus clientes, cuántos pagarían por QR si pudieran (hoy en Bolivia casi la mitad del valor de las compras ya va por QR)', 0, 100, 40, 5, ' %'],
    app: ['app', 'Pedidos por día que hoy entran por apps de delivery', 0, 200, 15, 1, ''],
    com: ['com', 'Comisión que te cobra la app', 0, 40, 25, 1, ' %'],
    msgs: ['msgs', 'Mensajes de WhatsApp por día que quedan sin responder a tiempo', 0, 40, 5, 1, ''],
    perd: ['perd', 'De esos, cuántos piden en otro lado', 0, 100, 50, 5, ' %'],
    mesas: ['mesas', 'Mesas que en hora pico esperan más de 10 minutos por el mesero', 0, 30, 4, 1, ''],
    dias: ['dias', 'Días de atención por mes', 10, 30, 26, 1, '']
  };
  function F(){ return Array.prototype.slice.call(arguments).map(function(k){ return base[k]; }); }
  var R = {
    pizzeria: {intro: 'Piensa en una semana normal: un viernes fuerte y un martes flojo.', note: 'La comisión de las apps de delivery no está publicada en Bolivia: pon la que ves en tu liquidación.',
      fields: F('pedidos', 'ticket', 'qr', 'app', 'com', 'msgs', 'perd', 'mesas', 'dias'), d: {pedidos: 60, ticket: 75, app: 15, com: 25, mesas: 3}},
    heladeria: {intro: 'Cuenta todos los pedidos: conos, vasos, tortas y delivery.', note: 'Si no haces delivery por app, deja esos controles en cero.',
      fields: F('pedidos', 'ticket', 'qr', 'app', 'com', 'msgs', 'perd', 'mesas', 'dias'), d: {pedidos: 150, ticket: 25, app: 5, com: 25, mesas: 2, msgs: 2}},
    restaurante: {intro: 'Piensa en el almuerzo de un día normal y en una cena de fin de semana.', note: 'Las mesas que esperan son las que, con QR, piden al sentarse y rotan antes.',
      fields: F('pedidos', 'ticket', 'qr', 'app', 'com', 'msgs', 'perd', 'mesas', 'dias'), d: {pedidos: 90, ticket: 60, app: 8, com: 25, mesas: 5}},
    bar: {intro: 'Cuenta rondas, no personas: cada ronda es un pedido.', note: 'Un bar casi no usa apps de delivery: deja esos controles en cero si es tu caso.',
      fields: F('pedidos', 'ticket', 'qr', 'app', 'com', 'msgs', 'perd', 'mesas', 'dias'), d: {pedidos: 120, ticket: 45, app: 0, com: 0, mesas: 6, dias: 16}},
    franquicia: {intro: 'Pon los números de una sola sucursal. La cuenta se repite por cada una.', note: 'Cada sucursal adicional paga la mitad de la instalación y su propia mensualidad.',
      fields: F('pedidos', 'ticket', 'qr', 'app', 'com', 'msgs', 'perd', 'mesas', 'dias'), d: {pedidos: 200, ticket: 50, app: 40, com: 25, mesas: 6}}
  };
  var key = 'pizzeria', vals = {};
  try{ var q = new URLSearchParams(location.search).get('rubro'); if(R[q]) key = q; }catch(e){}

  function field(f, D){
    var v = (D.d && D.d[f[0]] !== undefined) ? D.d[f[0]] : f[4];
    return '<label class="c-field"><span class="c-label">' + f[1] + '</span><span class="c-row"><input type="range" id="f-' + f[0] + '" min="' + f[2] + '" max="' + f[3] + '" step="' + f[5] + '" value="' + v + '"><output class="num" id="o-' + f[0] + '">' + v.toLocaleString('es-BO') + f[6] + '</output></span></label>';
  }
  function load(k){
    key = k; var D = R[k];
    document.querySelectorAll('[data-crubro]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-crubro') === k ? 'true' : 'false'); });
    $('c-intro').textContent = D.intro; $('c-note').textContent = D.note;
    $('c-fields').innerHTML = D.fields.map(function(f){ return field(f, D); }).join('');
    $('c-demo').href = '/demo/?rubro=' + k;
    try{ var u = new URL(location.href); u.searchParams.set('rubro', k); history.replaceState(null, '', u); }catch(e){}
    update();
  }
  function update(){
    var D = R[key]; vals = {};
    D.fields.forEach(function(f){ var el = $('f-' + f[0]); vals[f[0]] = +el.value; $('o-' + f[0]).textContent = (+el.value).toLocaleString('es-BO') + f[6]; });
    var v = vals, dias = v.dias;
    var rows = [
      ['Comisión de apps', v.app * v.ticket * (v.com / 100) * dias, 'lo que se queda la app cada mes'],
      ['Mesas que esperan', v.mesas * v.ticket * dias * 0.5, 'la mitad de esas mesas serían una rotación más, con QR'],
      ['Pedidos no respondidos', v.msgs * (v.perd / 100) * v.ticket * dias, 'clientes que escribieron y pidieron en otro lado']
    ];
    var total = 0; rows.forEach(function(r){ total += r[1]; });
    $('c-total').textContent = fmt(total); $('c-year').textContent = fmt(total * 12);
    $('c-break').innerHTML = rows.map(function(r){ return '<div><span>' + r[0] + '</span><b class="num">' + fmt(r[1]) + '</b><small>' + r[2] + '</small></div>'; }).join('');
    var ventas = v.pedidos * v.ticket * dias, porQR = ventas * (v.qr / 100), com = porQR * COM, back = com / 2;
    $('c-cost').textContent = fmt(MENSUAL + com); $('c-cost-d').textContent = '400 Bs + ' + fmt(com) + ' de comisión sobre ' + fmt(porQR) + ' cobrados por QR';
    $('c-back').textContent = fmt(back);
    var months;
    if(back <= 0) months = '—';
    else if(back * 12 >= SETUP) months = Math.ceil(SETUP / back) + ' meses';
    else { var rest = SETUP - back * 12; months = (12 + Math.ceil(rest / com)) + ' meses'; }
    $('c-months').textContent = months;
    $('c-months-d').textContent = back * 12 >= SETUP || back <= 0 ? 'con 2.000 Bs de lanzamiento, devolviéndote el 50 %' : 'con 2.000 Bs: 12 meses al 50 % y desde el mes 13 al 100 %';
    var net = total - (MENSUAL + com - back);
    $('c-net').textContent = (net < 0 ? '−' : '') + fmt(Math.abs(net));
    $('c-net').style.color = net < 0 ? 'var(--sun)' : '#fff';
    var msg = 'Hola, usé la calculadora de Mezzita para mi ' + key + '. Hoy pierdo unos ' + fmt(total) + ' al mes. Con ' + v.pedidos + ' pedidos por día y ticket de ' + fmt(v.ticket) + ', el sistema me costaría ' + fmt(MENSUAL + com) + ' y me devolverían ' + fmt(back) + ' al mes. Quiero verlo con mis números. Ciudad: ___ Mesas: ___';
    $('c-wa').setAttribute('data-wa', msg);
    $('c-wa').href = window.OP ? window.OP.waHref(msg) : 'https://wa.me/59171868545?text=' + encodeURIComponent(msg);
  }
  document.addEventListener('click', function(e){ var t = e.target.closest('[data-crubro]'); if(t) load(t.getAttribute('data-crubro')); });
  document.addEventListener('input', function(e){ if(e.target.matches('.c-field input')) update(); });
  load(key);
})();
