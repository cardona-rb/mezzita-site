/* Calculadora de pérdida: todo ocurre en el navegador, no se envía nada */
(function(){
  var $ = function(id){ return document.getElementById(id); };
  var fmt = function(n){ return Math.round(n).toLocaleString('es-BO') + ' Bs'; };
  var PLANES = { visible: ['Visible en 7 Días', 650], vende: ['Vende y Cobra 24/7', 1560], acel: ['Acelerador de Clientes', 3185] };
  var R = {
    restaurante: {
      intro: 'Piensa en una semana normal. Si no sabes un dato exacto, deja el valor aproximado.',
      note: 'La comisión de las apps de delivery no está publicada en Bolivia: pon la que ves en tu liquidación.',
      fields: [
        ['pedApp', 'Pedidos por día que entran por apps de delivery', 0, 80, 12, 1, ''],
        ['ticket', 'Ticket promedio', 20, 300, 75, 5, ' Bs'],
        ['com', 'Comisión que te cobra la app', 0, 40, 25, 1, ' %'],
        ['msgs', 'Mensajes de WhatsApp por día que quedan sin responder a tiempo (noche, hora pico)', 0, 40, 6, 1, ''],
        ['perd', 'De esos, cuántos se van a otro lado', 0, 100, 50, 5, ' %']
      ],
      calc: function(v){
        return [
          ['Comisión de apps', v.pedApp * v.ticket * (v.com / 100) * 30, 'lo que se queda la app cada mes'],
          ['Pedidos no respondidos', v.msgs * (v.perd / 100) * v.ticket * 30, 'clientes que escribieron y pidieron en otro lado']
        ];
      },
      plan: 'vende', demo: 'restaurante'
    },
    hotel: {
      intro: 'Piensa en un mes promedio, no en temporada alta ni en un mes de bloqueos.',
      note: 'La comisión de los portales varía por contrato; pon la que figura en tu extranet.',
      fields: [
        ['noches', 'Noches por mes que entran por portales (Booking, Expedia, Airbnb)', 0, 300, 60, 5, ''],
        ['tarifa', 'Tarifa promedio por noche', 80, 1200, 280, 10, ' Bs'],
        ['com', 'Comisión del portal', 0, 30, 15, 1, ' %'],
        ['cons', 'Consultas por WhatsApp por semana sin respuesta en menos de una hora', 0, 60, 8, 1, ''],
        ['perd', 'De esas, cuántas reservan en otro hotel', 0, 100, 40, 5, ' %'],
        ['estad', 'Noches promedio por reserva', 1, 7, 2, 1, '']
      ],
      calc: function(v){
        return [
          ['Comisión de portales', v.noches * v.tarifa * (v.com / 100), 'reservas que podrían ser directas'],
          ['Consultas perdidas', v.cons * 4.3 * (v.perd / 100) * v.tarifa * v.estad, 'huéspedes que preguntaron y no esperaron']
        ];
      },
      plan: 'vende', demo: 'hotel'
    },
    clinica: {
      intro: 'Cuenta pacientes agendados, no los que llegan. La diferencia es justamente lo que calculamos.',
      note: 'La tasa de ausencias la conoces mejor que nadie: cuántas sillas quedan vacías por semana.',
      fields: [
        ['citas', 'Citas agendadas por día', 2, 40, 14, 1, ''],
        ['dias', 'Días de atención por mes', 10, 26, 22, 1, ''],
        ['ticket', 'Valor promedio de una consulta o sesión', 50, 1500, 180, 10, ' Bs'],
        ['aus', 'Pacientes que no llegan ni avisan', 0, 50, 20, 1, ' %'],
        ['recup', 'Cuántas de esas ausencias se evitarían con recordatorio y confirmación', 0, 100, 60, 5, ' %'],
        ['msgs', 'Consultas por WhatsApp por día sin respuesta a tiempo', 0, 30, 4, 1, '']
      ],
      calc: function(v){
        return [
          ['Sillas vacías recuperables', v.citas * v.dias * (v.aus / 100) * (v.recup / 100) * v.ticket, 'ausencias que un recordatorio habría evitado'],
          ['Pacientes no atendidos', v.msgs * 0.4 * v.ticket * v.dias, 'de cada 10 que escriben y no reciben respuesta, 4 agendan en otra clínica']
        ];
      },
      plan: 'vende', demo: 'clinica'
    },
    estudio: {
      intro: 'Piensa en consultas nuevas, no en clientes que ya tienes.',
      note: 'El honorario de primera consulta es el tuyo, no un arancel de referencia.',
      fields: [
        ['cons', 'Consultas nuevas por mes que llegan por WhatsApp, llamada o web', 2, 120, 25, 1, ''],
        ['hon', 'Honorario de la primera consulta', 50, 1500, 200, 10, ' Bs'],
        ['perd', 'Cuántas no se concretan por responder tarde o por no agendar en el momento', 0, 100, 30, 5, ' %'],
        ['caso', 'De las consultas que sí se concretan, cuántas se vuelven caso', 0, 100, 35, 5, ' %'],
        ['valor', 'Honorario promedio de un caso', 500, 30000, 4000, 100, ' Bs']
      ],
      calc: function(v){
        var perdidas = v.cons * (v.perd / 100);
        return [
          ['Consultas no concretadas', perdidas * v.hon, 'personas que escribieron y contrataron a otro'],
          ['Casos que no llegaron', perdidas * (v.caso / 100) * v.valor, 'los casos que esas consultas habrían generado']
        ];
      },
      plan: 'vende', demo: 'estudio'
    },
    vinoteca: {
      intro: 'Piensa en una semana normal de ventas, en tienda y por WhatsApp.',
      note: 'Si hoy no vendes a otras ciudades, pon cuántos pedidos crees que llegarían con envío.',
      fields: [
        ['msgs', 'Consultas por WhatsApp o Instagram por semana que no terminan en venta', 0, 80, 15, 1, ''],
        ['perd', 'Cuántas se pierden por demora o por no tener catálogo con precios', 0, 100, 40, 5, ' %'],
        ['ticket', 'Ticket promedio', 50, 1500, 180, 10, ' Bs'],
        ['fuera', 'Pedidos por semana de otras ciudades que hoy no puedes atender', 0, 40, 5, 1, ''],
        ['corp', 'Pedidos corporativos (canastas, regalos) por mes que no llegan por falta de catálogo', 0, 20, 2, 1, ''],
        ['corpv', 'Valor promedio de un pedido corporativo', 500, 20000, 2500, 100, ' Bs']
      ],
      calc: function(v){
        return [
          ['Consultas sin cerrar', v.msgs * (v.perd / 100) * v.ticket * 4.3, 'clientes que preguntaron y no compraron'],
          ['Ventas a otras ciudades', v.fuera * v.ticket * 4.3, 'pedidos con envío que hoy no tomas'],
          ['Pedidos corporativos', v.corp * v.corpv, 'canastas y regalos de empresa']
        ];
      },
      plan: 'vende', demo: 'vinoteca'
    }
  };
  var key = 'restaurante', vals = {};
  try{ var q = new URLSearchParams(location.search).get('rubro'); if(R[q]) key = q; }catch(e){}

  function field(f){
    return '<label class="c-field"><span class="c-label">' + f[1] + '</span><span class="c-row"><input type="range" id="f-' + f[0] + '" min="' + f[2] + '" max="' + f[3] + '" step="' + f[5] + '" value="' + f[4] + '"><output class="num" id="o-' + f[0] + '">' + f[4] + f[6] + '</output></span></label>';
  }
  function load(k){
    key = k; var D = R[k];
    document.querySelectorAll('[data-crubro]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-crubro') === k ? 'true' : 'false'); });
    $('c-intro').textContent = D.intro; $('c-note').textContent = D.note;
    $('c-fields').innerHTML = D.fields.map(field).join('');
    $('c-demo').href = '/demo/?rubro=' + D.demo;
    try{ var u = new URL(location.href); u.searchParams.set('rubro', k); history.replaceState(null, '', u); }catch(e){}
    update();
  }
  function update(){
    var D = R[key]; vals = {};
    D.fields.forEach(function(f){ var el = $('f-' + f[0]); vals[f[0]] = +el.value; $('o-' + f[0]).textContent = (+el.value).toLocaleString('es-BO') + f[6]; });
    var rows = D.calc(vals), total = 0;
    rows.forEach(function(r){ total += r[1]; });
    $('c-total').textContent = fmt(total);
    $('c-year').textContent = fmt(total * 12);
    $('c-break').innerHTML = rows.map(function(r){ return '<div><span>' + r[0] + '</span><b class="num">' + fmt(r[1]) + '</b><small>' + r[2] + '</small></div>'; }).join('');
    var plan = PLANES[D.plan]; $('c-plan').textContent = plan[0]; $('c-plan-cost').textContent = fmt(plan[1]) + ' al mes';
    var days = total > 0 ? Math.ceil(plan[1] / (total / 30)) : 0;
    $('c-days').textContent = total > 0 ? (days > 90 ? 'más de 90 días' : days + ' días') : '—';
    if(total > 0 && total < plan[1]) $('c-days').textContent = 'todavía no conviene';
    var msg = 'Hola, usé la calculadora de Outperform para mi ' + key + '. Pierdo unos ' + fmt(total) + ' al mes (' + rows.map(function(r){ return r[0].toLowerCase() + ': ' + fmt(r[1]); }).join(', ') + '). Quiero ver cómo recuperarlo. Ciudad: ___';
    $('c-wa').href = window.OP ? window.OP.waHref(msg) : 'https://wa.me/59171868545?text=' + encodeURIComponent(msg);
  }
  document.addEventListener('click', function(e){ var t = e.target.closest('[data-crubro]'); if(t) load(t.getAttribute('data-crubro')); });
  document.addEventListener('input', function(e){ if(e.target.matches('.c-field input')) update(); });
  load(key);
})();
