/* Outperform · el teléfono.
   Renderiza una conversación de WhatsApp dentro del marco. En el inicio reproduce una venta
   completa en bucle. En la demo, la conversación la manejas tú desde el propio chat. */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var fmt = function(n){ return n.toLocaleString('es-BO') + ' Bs'; };
  var TINTS = ['#C9B38A','#9DB0A8','#8EA3B5','#C4A7A0','#A9B48C','#B6A3C4'];

  function qrHTML(seed){
    var cells = '', s = (seed || 7) * 9301 + 49297;
    for(var i = 0; i < 81; i++){
      var r = Math.floor(i / 9), c = i % 9, on;
      var inEye = function(r0, c0){ return r >= r0 && r < r0 + 3 && c >= c0 && c < c0 + 3; };
      if(inEye(0,0) || inEye(0,6) || inEye(6,0)){ var rr = r % 3, cc = c % 3; on = !((rr === 1 && cc === 1) ? false : (rr === 1 || cc === 1)); if(rr === 1 && cc === 1) on = true; }
      else { s = (s * 1103515245 + 12345) & 0x7fffffff; on = (s >> 16) % 5 < 2; }
      cells += '<i class="' + (on ? '' : 'o') + '"></i>';
    }
    return '<div class="qr" aria-hidden="true">' + cells + '</div>';
  }

  function Chat(el){ this.el = el; this.list = el.querySelector('.chat'); }
  Chat.prototype.clear = function(){ this.list.innerHTML = '<span class="day">Hoy</span>'; };
  Chat.prototype.scroll = function(){ var l = this.list; l.scrollTop = l.scrollHeight; };
  Chat.prototype.add = function(side, html, time){
    var b = document.createElement('div'); b.className = 'bub ' + side;
    b.innerHTML = html + (time ? '<span class="time">' + esc(time) + '</span>' : '');
    this.list.appendChild(b);
    if(this.el.dataset.mode === 'auto'){ while(this.list.children.length > 7) this.list.removeChild(this.list.children[1]); } else this.scroll();
    return b;
  };
  Chat.prototype.typing = function(){ return this.add('them', '<span class="typing"><i></i><i></i><i></i></span>'); };
  Chat.prototype.replaceTyping = function(bub, html, time){ bub.innerHTML = html + (time ? '<span class="time">' + esc(time) + '</span>' : ''); if(this.el.dataset.mode !== 'auto') this.scroll(); };

  function cardHTML(item, tint, withButton){
    return '<div class="card"><div class="ph" style="--tint:' + tint + '"></div><div class="row"><b>' + esc(item.n) + '</b><span class="pr">' + (item.p ? fmt(item.po || item.p) : 'Sin costo') + '</span></div>' +
      (item.d ? '<div class="row" style="color:var(--ink-3);font-size:.74rem">' + esc(item.d) + '</div>' : '') +
      (item.v ? '<select class="opt" data-for="' + esc(item.sku) + '" aria-label="Opción">' + item.v.map(function(x){ return '<option>' + esc(x) + '</option>'; }).join('') + '</select>' : '') +
      (withButton ? '<button type="button" data-add="' + esc(item.sku) + '"' + (item.s === 0 ? ' disabled' : '') + '>' + (item.s === 0 ? 'Agotado' : 'Agregar') + '</button>' : '') + '</div>';
  }
  function carouselHTML(items, tints){ return '<div class="carousel">' + items.map(function(it, i){ return cardHTML(it, tints[i % tints.length], true); }).join('') + '</div>'; }
  function chipsHTML(labels, active){ return '<div class="chips">' + labels.map(function(l){ return '<button type="button" data-cat="' + esc(l) + '" aria-pressed="' + (l === active) + '">' + esc(l) + '</button>'; }).join('') + '</div>'; }
  function summaryHTML(lines, deliv, total, cta){
    return '<div>Tu pedido:</div><div class="lines">' + lines.map(function(l){ return '<div><span>' + esc(l.q + ' × ' + l.n) + '</span><span>' + l.t + '</span></div>'; }).join('') +
      (deliv ? '<div><span>' + esc(deliv.n) + '</span><span>' + deliv.c + '</span></div>' : '') + '<div class="tot"><span>Total</span><span>' + fmt(total) + '</span></div></div>' + (cta || '');
  }
  function paidHTML(total, id){ return '<div>Pago recibido · <b>' + fmt(total) + '</b></div><div class="lines"><div><span>Pedido</span><span>#' + id + '</span></div><div><span>Pago</span><span>QR bancario</span></div></div><span class="paid">✓ PAGADO</span>'; }

  window.OPChat = {Chat: Chat, cardHTML: cardHTML, carouselHTML: carouselHTML, chipsHTML: chipsHTML, summaryHTML: summaryHTML, paidHTML: paidHTML, qrHTML: qrHTML, fmt: fmt, esc: esc, TINTS: TINTS};

  /* modo automático (inicio) */
  document.querySelectorAll('.phone[data-mode="auto"]').forEach(function(el){
    var chat = new Chat(el);
    var SCRIPT = [
      ['me', 'Hola, ¿tienen delivery a Equipetrol?', '23:41'],
      ['them', 'Hola. Sí, 5 Bs a Equipetrol y Centro. Este es el menú de hoy:', '23:41'],
      ['them', cardHTML({n:'Pizza Tarijeña', d:'Jamón serrano, queso, aceitunas · familiar', p:65}, TINTS[0]), '23:41'],
      ['me', 'Una Tarijeña familiar y un pan de ajo', '23:43'],
      ['them', summaryHTML([{q:1,n:'Pizza Tarijeña (familiar)',t:65},{q:1,n:'Pan de ajo',t:18}], {n:'Delivery Equipetrol', c:5}, 88, '<button type="button" class="act" tabindex="-1">Pagar con QR</button>'), '23:43'],
      ['them', '<div>Escanea para pagar <b>88 Bs</b></div>' + qrHTML(88) + '<div style="font-size:.74rem;color:var(--ink-3)">Vence en 10 min</div>', '23:44'],
      ['them', paidHTML(88, '482193') + '<div style="margin-top:.3rem">Sale en 25 minutos. Gracias, Carla.</div>', '23:47']
    ];
    var i = 0, timer, started = false;
    function next(){
      if(i >= SCRIPT.length){ i = 0; timer = setTimeout(function(){ chat.clear(); next(); }, 5200); return; }
      var s = SCRIPT[i++];
      if(s[0] === 'them'){ var tb = chat.typing(); timer = setTimeout(function(){ chat.replaceTyping(tb, s[1], s[2]); timer = setTimeout(next, 1500 + Math.min(1800, s[1].length * 4)); }, 900); }
      else { chat.add('me', s[1], s[2]); timer = setTimeout(next, 1100); }
      document.dispatchEvent(new CustomEvent('op:autostep', {detail: {i: i, n: SCRIPT.length}}));
    }
    chat.clear();
    if(reduce){ SCRIPT.forEach(function(s){ chat.add(s[0], s[1], s[2]); }); return; }
    function start(){ if(started) return; started = true; timer = setTimeout(next, 600); }
    if('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) start(); }); }, {threshold: .2}).observe(el); else start();
    document.addEventListener('visibilitychange', function(){ if(document.hidden) clearTimeout(timer); else if(started){ clearTimeout(timer); timer = setTimeout(next, 800); } });
  });

  /* la ficha de Google del inicio alterna "Hoy" y "En 7 días" */
  var flip = document.querySelector('[data-flip]');
  if(flip && !reduce){
    var state = 1;
    setInterval(function(){ state = 1 - state; flip.setAttribute('data-state', state ? 'after' : 'before'); }, 4200);
  }
})();
