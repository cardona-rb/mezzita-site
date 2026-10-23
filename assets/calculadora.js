/* Calculadora Mezzita (oferta v2): todo ocurre en el navegador, no se envía nada.
   Compara lo que se queda la app de delivery con lo que pagarías a Mezzita por los mismos pedidos. */
(function(){
  /* Planes v2. del: comisión en delivery y recojo con cobro verificado. mesa: cobro verificado en mesa (opcional; null = no aplica).
     Cobro con tu QR o en efectivo: 0 %. La comisión es sobre la comida, nunca sobre el envío. */
  var PLANS = {
    esencial: {n: 'Arranca', mes: 400, del: 0.06, mesa: null, perSuc: true},
    salon: {n: 'Crece', mes: 600, del: 0.05, mesa: 0.045, perSuc: true},
    cadena: {n: 'Escala', mes: 900, del: 0.04, mesa: 0.035, perSuc: false}
  };
  var SETUP = 2900, MAX_SUC_CADENA = 3;
  /* Costo de un plan. v: {ped, ticket, com, mesa, suc}. Devuelve null si el plan no sirve para esos números. */
  function cost(k, v){
    var P = PLANS[k], suc = Math.max(1, v.suc || 1), mesaBs = v.mesa || 0;
    if(mesaBs > 0 && P.mesa === null) return null;
    if(!P.perSuc && suc > MAX_SUC_CADENA) return null;
    var ventas = v.ped * v.ticket, mensual = P.mes * (P.perSuc ? suc : 1);
    var comDel = ventas * P.del, comMesa = mesaBs * (P.mesa || 0);
    return {k: k, n: P.n, mensual: mensual, ventas: ventas, comDel: comDel, comMesa: comMesa, total: mensual + comDel + comMesa, delivery: mensual + comDel};
  }
  function calc(v, plan){
    var app = v.ped * v.ticket * ((v.com || 0) / 100);
    var opts = Object.keys(PLANS).map(function(k){ return cost(k, v); }).filter(Boolean);
    var best = opts.reduce(function(a, b){ return b.total < a.total ? b : a; });
    var pick = plan && plan !== 'auto' ? cost(plan, v) : best;
    var suc = Math.max(1, v.suc || 1), setup = SETUP * (1 + 0.5 * (suc - 1));
    var res = {app: app, best: best, pick: pick, setup: setup};
    if(pick){ res.diff = app - pick.delivery; res.months = res.diff > 0 ? Math.ceil(setup / res.diff) : null; }
    return res;
  }
  if(typeof module !== 'undefined' && module.exports){ module.exports = {calc: calc, cost: cost, PLANS: PLANS}; return; }

  var $ = function(id){ return document.getElementById(id); };
  var fmt = function(n){ return Math.round(n).toLocaleString('es-BO') + ' Bs'; };
  var base = {
    ped: ['ped', 'Pedidos de delivery y recojo al mes (los de la app y los que hoy tomas por WhatsApp o teléfono)', 0, 3000, 300, 10, ''],
    ticket: ['ticket', 'Ticket promedio por pedido, solo la comida (sin el costo de envío)', 10, 300, 70, 5, ' Bs'],
    com: ['com', 'Comisión que te cobra la app (estimación: entre 20 y 30 % según la región; pon la de tu liquidación)', 0, 40, 25, 1, ' %'],
    mesa: ['mesa', 'Opcional: ventas en mesa al mes que quieres cobrar con cobro verificado (déjalo en 0 si en mesa cobras con tu QR o en efectivo)', 0, 150000, 0, 1000, ' Bs'],
    suc: ['suc', 'Sucursales', 1, 6, 1, 1, '']
  };
  function F(){ return Array.prototype.slice.call(arguments).map(function(k){ return base[k]; }); }
  var R = {
    pizzeria: {intro: 'Piensa en un mes normal: viernes fuertes y martes flojos. Cuenta todo lo que sale para delivery o recojo.', note: 'Lo que cobras en el local con tu QR o en efectivo no lleva comisión, por eso no entra en la cuenta.',
      fields: F('ped', 'ticket', 'com', 'mesa'), d: {ped: 300, ticket: 85}},
    heladeria: {intro: 'Cuenta los pedidos para llevar y de delivery: conos, vasos, tortas y combos.', note: 'Si no haces delivery por app, deja la comisión de la app en 0 y mira solo lo que nos pagarías.',
      fields: F('ped', 'ticket', 'com', 'mesa'), d: {ped: 150, ticket: 45}},
    restaurante: {intro: 'Piensa en los almuerzos para llevar y las cenas de delivery de un mes normal.', note: 'Si quieres cobro verificado en mesa (sin capturas falsas y con la mesa que se cierra sola), pon esas ventas en el último control: necesita Crece o Escala.',
      fields: F('ped', 'ticket', 'com', 'mesa'), d: {ped: 200, ticket: 60}},
    bar: {intro: 'Un bar vende sobre todo en mesa. Cuenta solo lo que sale para llevar o por delivery.', note: 'En mesa, si cobras con tu QR o en efectivo, la comisión es 0 %. El cobro verificado en mesa es opcional.',
      fields: F('ped', 'ticket', 'com', 'mesa'), d: {ped: 40, ticket: 70}},
    franquicia: {intro: 'Pon el total de todas tus sucursales y cuántas son.', note: 'Escala cubre hasta 3 sucursales con una sola mensualidad. En Arranca y Crece cada sucursal paga su propia mensualidad. En todos los planes, cada sucursal extra paga el 50 % de la instalación.',
      fields: F('ped', 'ticket', 'com', 'mesa', 'suc'), d: {ped: 900, ticket: 55, suc: 3}}
  };
  var key = 'pizzeria', plan = 'auto', vals = {};
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
  function setPlan(p){
    plan = p;
    document.querySelectorAll('[data-cplan]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-cplan') === p ? 'true' : 'false'); });
    update();
  }
  function pct(x){ return (Math.round(x * 1000) / 10).toLocaleString('es-BO') + ' %'; }
  function update(){
    var D = R[key]; vals = {suc: 1, mesa: 0};
    D.fields.forEach(function(f){ var el = $('f-' + f[0]); vals[f[0]] = +el.value; $('o-' + f[0]).textContent = (+el.value).toLocaleString('es-BO') + f[6]; });
    var r = calc(vals, plan), p = r.pick, v = vals;
    $('c-total').textContent = fmt(r.app); $('c-year').textContent = fmt(r.app * 12);
    if(!p){
      var P = PLANS[plan];
      $('c-break').innerHTML = '<div><span>' + P.n + ' no sirve para estos números</span><b class="num">-</b><small>' + (P.mesa === null ? 'El cobro verificado en mesa es de Crece y Escala. En Arranca, la mesa paga con tu QR o en efectivo, al 0 %.' : 'Escala cubre hasta 3 sucursales.') + '</small></div>';
      ['c-cost', 'c-net', 'c-months'].forEach(function(id){ $(id).textContent = '-'; });
      $('c-plan').textContent = P.n; $('c-plan-d').textContent = 'elige otro plan o «El que más me conviene»'; $('c-cost-d').textContent = ''; $('c-net').style.color = '#fff';
      return;
    }
    var PL = PLANS[p.k], suc = Math.max(1, v.suc || 1);
    var rows = [
      ['Mensualidad ' + p.n, p.mensual, PL.perSuc && suc > 1 ? PL.mes.toLocaleString('es-BO') + ' Bs por ' + suc + ' sucursales' : (p.k === 'cadena' && suc > 1 ? 'una sola mensualidad para ' + suc + ' sucursales' : 'pago fijo, con IVA incluido')],
      ['Comisión en delivery y recojo', p.comDel, pct(PL.del) + ' sobre ' + fmt(p.ventas) + ' de comida, con cobro verificado. El envío no paga comisión.']
    ];
    if(v.mesa > 0) rows.push(['Cobro verificado en mesa', p.comMesa, pct(PL.mesa) + ' sobre ' + fmt(v.mesa) + '. Es opcional: con tu QR o en efectivo, 0 %.']);
    else rows.push(['En el local con tu QR o en efectivo', 0, 'sin comisión, en todos los planes']);
    $('c-break').innerHTML = rows.map(function(x){ return '<div><span>' + x[0] + '</span><b class="num">' + fmt(x[1]) + '</b><small>' + x[2] + '</small></div>'; }).join('');
    $('c-cost').textContent = fmt(p.total);
    $('c-cost-d').textContent = fmt(p.mensual) + ' + ' + fmt(p.comDel + p.comMesa) + ' de comisión';
    $('c-plan').textContent = p.n;
    $('c-plan-d').textContent = plan === 'auto' ? 'el más barato para tus números' : (r.best.k === p.k ? 'el que elegiste, y también el más barato' : 'el que elegiste; con ' + r.best.n + ' pagarías ' + fmt(r.best.total));
    var net = r.diff;
    $('c-net').textContent = (net < 0 ? '−' : '') + fmt(Math.abs(net));
    $('c-net').style.color = net < 0 ? 'var(--sun)' : '#fff';
    $('c-net-d').textContent = v.com > 0 ? (net < 0 ? 'con estos números, la app te cuesta menos que nosotros' : 'lo que se queda la app menos lo que nos pagarías por esos mismos pedidos') : 'pon la comisión de tu app para comparar';
    $('c-months').textContent = r.months ? r.months + (r.months === 1 ? ' mes' : ' meses') : '-';
    $('c-months-d').textContent = 'con ' + fmt(r.setup) + ' de instalación' + (suc > 1 ? ' para ' + suc + ' sucursales' : '') + ' (lanzamiento hasta el 30 de noviembre)';
    var msg = 'Hola, usé la calculadora de Mezzita para mi ' + key + '. Con ' + v.ped + ' pedidos de delivery y recojo al mes y ticket de ' + fmt(v.ticket) + ', la app se quedaría con unos ' + fmt(r.app) + ' al mes y con el plan ' + p.n + ' les pagaría ' + fmt(p.total) + '. Quiero verlo con mis números. Ciudad: ___ Mesas: ___';
    $('c-wa').setAttribute('data-wa', msg);
    $('c-wa').href = window.OP ? window.OP.waHref(msg) : 'https://wa.me/59162506518?text=' + encodeURIComponent(msg);
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-crubro]'); if(t){ load(t.getAttribute('data-crubro')); return; }
    var p = e.target.closest('[data-cplan]'); if(p) setPlan(p.getAttribute('data-cplan'));
  });
  document.addEventListener('input', function(e){ if(e.target.matches('.c-field input')) update(); });
  load(key);
})();
