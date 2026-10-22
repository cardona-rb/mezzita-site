/* Mezzita · fondo.
   Cuatro variantes, elegibles con ?bg= (o la clase del <html> que pone build.py):
     dots   · cardumen de peces hechos de puntos, apenas visibles, que se acercan al puntero
     code   · los mismos peces, escritos con glifos de "código de negocio"
     sonar  · una retícula de puntos que se ilumina y se acerca donde está el puntero
     water  · cáusticas de luz sobre el papel, lentas, sin figura
     none   · papel liso
   Con movimiento reducido todo se dibuja una vez y se queda quieto. */
(function(){
  'use strict';
  var host = document.getElementById('backdrop');
  var canvas = host && host.querySelector('canvas');
  if(!canvas || !canvas.getContext) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = !window.matchMedia || window.matchMedia('(hover: hover)').matches;
  var mode = 'sonar';
  try{
    var q = new URLSearchParams(location.search).get('bg');
    var saved = localStorage.getItem('op_bg');
    mode = q || saved || (document.documentElement.getAttribute('data-bg')) || 'sonar';
    if(q) localStorage.setItem('op_bg', q);
  }catch(e){}
  if(['dots','code','sonar','water','none'].indexOf(mode) < 0) mode = 'sonar';
  document.documentElement.setAttribute('data-bg', mode);
  if(mode === 'none') return;

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, dpr = 1, pointer = null, last = 0, t0 = performance.now(), tick = 0;
  var INK = [21,23,28], BLUE = [31,79,224], PAID = [15,122,75];
  function rgba(c, a){ return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  function size(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = host.clientWidth; H = host.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if(impl.size) impl.size();
    if(reduce) impl.draw(0, 0);
  }

  /* ------------------------------------------------------------ peces (dots / code) */
  var SOURCE = "pedido.confirmar({ total: 103, pago: 'QR' }) reseña ★★★★★ ficha.google.verificada = true cita.agendar('Lun 9:00') cobro.ok() reserva.anticipo(30%) factura.siat.emitir() horario: 'Abierto ahora' cliente.vuelve++ catalogo.actualizar() stock: 24 delivery: 'Centro' sello 7/8 placa.nfc.toque() → reseña envio('Santa Cruz') total: 520 Bs PAGADO";
  var GLYPHS = SOURCE.replace(/\s+/g, ' ').split('');
  var LAYERS = [
    {size: 9,  alpha: 0.05, speed: 12, len: 130, h: 22, dot: 1.1},
    {size: 11, alpha: 0.08, speed: 19, len: 190, h: 32, dot: 1.4},
    {size: 14, alpha: 0.12, speed: 28, len: 260, h: 44, dot: 1.8}
  ];
  function half(u, Hh){
    if(u < 0.70){ var c = (u - 0.35) / 0.35; return Hh * Math.sqrt(Math.max(0, 1 - c * c)) * 0.95 + Hh * 0.04; }
    if(u < 0.78) return Hh * 0.13;
    return Hh * 0.62 * ((u - 0.78) / 0.22) + Hh * 0.08;
  }
  function makeFish(i){
    var L = LAYERS[Math.random() < 0.45 ? 0 : Math.random() < 0.7 ? 1 : 2];
    var cw = mode === 'code' ? L.size * 0.62 : L.size * 0.55, ch = mode === 'code' ? L.size * 1.15 : L.size * 0.7;
    var cols = Math.ceil(L.len / cw), rows = Math.ceil((L.h * 2) / ch), cells = [], g = i * 37;
    for(var r = 0; r < rows; r++) for(var c = 0; c < cols; c++){
      var u = (c + 0.5) / cols, y = (r + 0.5) * ch - L.h;
      if(Math.abs(y) <= half(u, L.h)){
        var chr = GLYPHS[(g++) % GLYPHS.length]; if(chr === ' ') continue;
        var edge = Math.abs(y) > half(u, L.h) * 0.72;
        cells.push({x: (c + 0.5) * cw, y: y, u: u, ch: chr, k: /[★0-9]/.test(chr) ? 1 : 0, edge: edge});
      }
    }
    cells.push({x: cw * 1.6, y: -L.h * 0.28, u: 0.08, ch: '◦', k: 2, eye: true});
    return {L: L, cells: cells, x: Math.random() * W, y: 80 + Math.random() * Math.max(100, H - 160), dir: Math.random() < 0.5 ? 1 : -1, face: 0, vy: 0, phase: Math.random() * 6.28, wob: 0.6 + Math.random() * 0.5, speed: L.speed * (0.8 + Math.random() * 0.5)};
  }
  var fishImpl = {
    fish: [],
    size: function(){ var n = W < 700 ? 5 : W < 1100 ? 8 : 11; this.fish = []; for(var i = 0; i < n; i++){ var f = makeFish(i); f.face = f.dir; this.fish.push(f); } },
    step: function(dt, t){
      this.fish.forEach(function(f){
        var td = f.dir, tvy = Math.sin(t * 0.3 * f.wob + f.phase) * 6;
        if(pointer){ var dx = pointer.x - f.x, dy = pointer.y - f.y, d = Math.sqrt(dx * dx + dy * dy); if(d < 520 && d > 70){ td = dx > 0 ? 1 : -1; tvy = dy * 0.08; } else if(d <= 70) tvy = -dy * 0.3; }
        f.dir = td; f.face += (f.dir - f.face) * Math.min(1, dt * 3.2); f.vy += (tvy - f.vy) * Math.min(1, dt * 1.5);
        f.x += f.speed * f.face * (0.5 + 0.5 * Math.abs(f.face)) * dt; f.y += f.vy * dt;
        if(f.y < 40) f.y = 40; if(f.y > H - 40) f.y = H - 40;
        if(f.x < -f.L.len * 1.5){ f.x = W + f.L.len; f.y = 80 + Math.random() * Math.max(100, H - 160); }
        if(f.x > W + f.L.len * 1.5){ f.x = -f.L.len; f.y = 80 + Math.random() * Math.max(100, H - 160); }
      });
    },
    draw: function(t){
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
      var self = this;
      LAYERS.forEach(function(L){
        if(mode === 'code') ctx.font = '500 ' + L.size + 'px "Geist Mono", ui-monospace, Menlo, monospace';
        self.fish.forEach(function(f){
          if(f.L !== L) return;
          var A = L.h * 0.22, w = 7 * f.wob;
          ctx.save(); ctx.translate(f.x, f.y); ctx.scale(Math.max(0.08, Math.abs(f.face)) * (f.face < 0 ? -1 : 1), 1);
          for(var i = 0; i < f.cells.length; i++){
            var c = f.cells[i], wave = A * Math.sin(2.2 * c.u * 6.28 - t * w + f.phase) * (0.15 + c.u * 0.85);
            var a = L.alpha * (c.eye ? 2.2 : c.edge ? 1.35 : c.u > 0.78 ? 0.8 : 1);
            var col = c.k === 2 ? BLUE : c.k === 1 ? PAID : INK;
            if(mode === 'code'){ ctx.globalAlpha = Math.min(0.45, a); ctx.fillStyle = rgba(col, 1); ctx.fillText(c.ch, -L.len / 2 + c.x, c.y + wave); }
            else { ctx.fillStyle = rgba(col, Math.min(0.55, a)); ctx.beginPath(); ctx.arc(-L.len / 2 + c.x, c.y + wave, c.eye ? L.dot * 1.4 : L.dot, 0, 6.28); ctx.fill(); }
          }
          ctx.restore();
        });
      });
      ctx.globalAlpha = 1;
    }
  };

  /* ------------------------------------------------------------ sonar */
  var sonarImpl = {
    pts: [], gap: 34,
    size: function(){ this.pts = []; var g = this.gap; for(var y = g / 2; y < H; y += g) for(var x = g / 2; x < W; x += g) this.pts.push({x0: x, y0: y, x: x, y: y, a: 0}); },
    step: function(dt, t){
      var g = this.gap;
      this.pts.forEach(function(p){
        var tx = p.x0, ty = p.y0, ta = 0;
        if(pointer){ var dx = pointer.x - p.x0, dy = pointer.y - p.y0, d = Math.sqrt(dx * dx + dy * dy); if(d < 260){ var k = 1 - d / 260; tx = p.x0 + dx * k * 0.35; ty = p.y0 + dy * k * 0.35; ta = k; } }
        p.x += (tx - p.x) * Math.min(1, dt * 4); p.y += (ty - p.y) * Math.min(1, dt * 4); p.a += (ta - p.a) * Math.min(1, dt * 3);
      });
    },
    draw: function(t){
      ctx.clearRect(0, 0, W, H);
      var ring = pointer ? ((t * 90) % 260) : -1;
      this.pts.forEach(function(p){
        var a = 0.09 + p.a * 0.55, r = 1 + p.a * 1.6;
        if(pointer){ var d = Math.sqrt((p.x0 - pointer.x) * (p.x0 - pointer.x) + (p.y0 - pointer.y) * (p.y0 - pointer.y)); if(Math.abs(d - ring) < 14) a += 0.25 * (1 - ring / 260); }
        ctx.fillStyle = rgba(p.a > 0.5 ? BLUE : INK, Math.min(0.8, a)); ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.28); ctx.fill();
      });
    }
  };

  /* ------------------------------------------------------------ agua (cáusticas) */
  var waterImpl = {
    off: null, octx: null, w: 0, h: 0, img: null,
    size: function(){ this.w = Math.ceil(W / 10); this.h = Math.ceil(H / 10); this.off = document.createElement('canvas'); this.off.width = this.w; this.off.height = this.h; this.octx = this.off.getContext('2d'); this.img = this.octx.createImageData(this.w, this.h); canvas.style.filter = 'blur(14px)'; },
    step: function(){},
    draw: function(t){
      var d = this.img.data, w = this.w, h = this.h, px = pointer ? pointer.x / 10 : w * 0.7, py = pointer ? pointer.y / 10 : h * 0.3, i = 0;
      for(var y = 0; y < h; y++) for(var x = 0; x < w; x++, i += 4){
        var v = Math.sin(x * 0.19 + t * 0.6) + Math.sin(y * 0.23 - t * 0.5) + Math.sin((x + y) * 0.11 + t * 0.35) + Math.sin(Math.sqrt((x - px) * (x - px) + (y - py) * (y - py)) * 0.35 - t * 1.4) * 0.8;
        var c = Math.max(0, v - 1.6) * 0.5;              // solo las crestas brillan
        d[i] = 31; d[i + 1] = 79; d[i + 2] = 224; d[i + 3] = Math.min(255, c * 70);
      }
      this.octx.putImageData(this.img, 0, 0);
      ctx.clearRect(0, 0, W, H); ctx.imageSmoothingEnabled = true; ctx.drawImage(this.off, 0, 0, W, H);
    }
  };

  var impl = mode === 'sonar' ? sonarImpl : mode === 'water' ? waterImpl : fishImpl;

  function frame(now){
    requestAnimationFrame(frame);
    if(document.hidden) return;
    tick++;
    if(!pointer && (tick & 1)) return;
    var dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    var t = (now - t0) / 1000;
    impl.step(dt, t); impl.draw(t);
  }
  size();
  window.addEventListener('resize', size, {passive: true});
  document.addEventListener('visibilitychange', function(){ if(document.hidden) last = 0; });
  if(reduce) return;
  requestAnimationFrame(frame);
  if(canHover){
    window.addEventListener('pointermove', function(e){ if(e.pointerType !== 'touch') pointer = {x: e.clientX, y: e.clientY}; }, {passive: true});
    window.addEventListener('pointerleave', function(){ pointer = null; });
    window.addEventListener('blur', function(){ pointer = null; });
  }

  /* selector de fondo: solo existe en la vista previa */
  var pick = document.querySelector('.bgpick');
  if(pick){
    pick.querySelectorAll('button').forEach(function(b){
      b.setAttribute('aria-pressed', b.dataset.bg === mode ? 'true' : 'false');
      b.addEventListener('click', function(){ try{ localStorage.setItem('op_bg', b.dataset.bg); }catch(e){} var u = new URL(location.href); u.searchParams.set('bg', b.dataset.bg); location.href = u.href; });
    });
  }
})();
