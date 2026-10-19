/* Outperform · comportamiento compartido.
   Movimiento con una sola regla: rápido, con salida suave, y solo donde ayuda a entender. */
(function(){
  'use strict';
  document.documentElement.classList.add('js');
  var WA_NUMBER = '59171868545';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = !window.matchMedia || window.matchMedia('(hover: hover)').matches;

  /* ---------------------------------------------------------- Código de socio */
  var refCode = '';
  try{
    var q = new URLSearchParams(location.search), c = q.get('s') || q.get('ref');
    if(c){ c = c.toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,12); if(c) localStorage.setItem('op_ref', JSON.stringify({c:c, t:Date.now()})); }
    var st = JSON.parse(localStorage.getItem('op_ref') || 'null');
    if(st && Date.now() - st.t < 90*864e5) refCode = st.c;
  }catch(e){}
  function waHref(text){
    var t = text + (refCode ? '\n\nCódigo socio: ' + refCode : '');
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(t);
  }
  function paint(root){
    (root || document).querySelectorAll('[data-wa]').forEach(function(a){
      a.href = waHref(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener';
      if(a.classList.contains('btn') && !a.querySelector('.wa-ic')){
        a.insertAdjacentHTML('afterbegin', '<svg class="wa-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>');
      }
    });
  }
  window.OP = { waHref: waHref, refCode: refCode, paint: paint };
  paint();
  if(refCode){
    document.querySelectorAll('a[href*="demo/"]').forEach(function(a){
      try{ var u = new URL(a.getAttribute('href'), location.href); u.searchParams.set('s', refCode); a.href = u.href; }catch(e){}
    });
  }

  /* ---------------------------------------------------------- Revelado al scroll */
  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin: '0px 0px -8% 0px', threshold: .08});
    document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------------------------------------------------------- Barra de vidrio */
  function setupHeader(){
    var header = document.getElementById('hd');
    if(!header) return;
    var capsule = header.querySelector('[data-nav-capsule]');
    var burger = header.querySelector('.burger');
    var sheet = document.getElementById('mnav');
    var bar = document.getElementById('progress');
    var condensed = null;
    function onScroll(){
      var want = window.scrollY > 24;
      if(want !== condensed){ condensed = want; header.classList.toggle('is-condensed', want); }
      if(bar){ var max = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + '%'; }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    if(burger && sheet){
      function setOpen(open){ sheet.hidden = !open; burger.setAttribute('aria-expanded', open ? 'true' : 'false'); burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); }
      burger.addEventListener('click', function(){ setOpen(sheet.hidden); });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && !sheet.hidden){ setOpen(false); burger.focus(); } });
      document.addEventListener('click', function(e){ if(!sheet.hidden && !header.contains(e.target)) setOpen(false); });
      window.addEventListener('resize', function(){ if(window.innerWidth > 980 && !sheet.hidden) setOpen(false); }, {passive:true});
    }
    if(!capsule || reduce || !canHover) return;
    var raf = null;
    header.addEventListener('mousemove', function(e){
      var r = capsule.getBoundingClientRect(); if(!r.width) return;
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      if(!raf) raf = requestAnimationFrame(function(){ raf = null; capsule.style.setProperty('--mx', (px * 100).toFixed(1) + '%'); capsule.style.setProperty('--my', (py * 100).toFixed(1) + '%'); });
    }, {passive:true});
    var nav = capsule.querySelector('nav'), lens = capsule.querySelector('[data-nav-lens]');
    if(!nav || !lens) return;
    nav.classList.add('has-lens');
    var shown = false;
    function place(pill){ var n = nav.getBoundingClientRect(), p = pill.getBoundingClientRect(); lens.style.width = p.width + 'px'; lens.style.transform = 'translateX(' + (p.left - n.left) + 'px)'; }
    nav.querySelectorAll('.pill').forEach(function(pill){
      pill.addEventListener('mouseenter', function(){
        if(!shown){ lens.style.transition = 'none'; place(pill); void lens.offsetWidth; lens.style.transition = ''; } else place(pill);
        lens.style.opacity = '1'; shown = true;
      });
    });
    nav.addEventListener('mouseleave', function(){ lens.style.opacity = '0'; shown = false; });
  }

  /* ---------------------------------------------------------- Calculadora */
  function setupCalc(){
    var calc = document.getElementById('calc'); if(!calc) return;
    var fmt = function(n){ return Math.round(n).toLocaleString('es-BO') + ' Bs'; };
    var run = function(){
      var ticket = Math.max(0, +document.getElementById('c-ticket').value || 0);
      var lost = Math.max(0, +document.getElementById('c-lost').value || 0);
      document.getElementById('c-out').textContent = fmt(ticket * lost * 4.3);
      var need = ticket > 0 ? Math.ceil(650 / ticket) : 0;
      document.getElementById('c-vs').textContent = ticket > 0 ? 'El plan Visible cuesta 650 Bs al mes. Se paga con ' + need + (need === 1 ? ' cliente nuevo' : ' clientes nuevos') + ' al mes.' : 'Escribe cuánto deja en promedio un cliente.';
    };
    calc.addEventListener('input', run); run();
  }

  document.querySelectorAll('[data-year]').forEach(function(n){ n.textContent = new Date().getFullYear(); });
  setupHeader();
  setupCalc();
})();
