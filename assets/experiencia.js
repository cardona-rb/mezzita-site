/* Experiencia: abanico del hero y filtro del portafolio por rubro. */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // El abanico ya se ve abierto sin JS; con JS se cierra y se abre una sola vez al cargar.
  var fan = document.querySelector('.exp-fan');
  if (fan && !reduce) {
    fan.classList.add('is-closed');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ fan.classList.remove('is-closed'); }); });
  }

  var chips = document.querySelectorAll('.pf-chip');
  var items = document.querySelectorAll('.pf-item');
  var status = document.querySelector('[data-pf-status]');
  var grid = document.getElementById('pf-grid');
  var more = document.querySelector('.pf-more');
  // En el celular se muestran 6; el botón abre la lista completa. Filtrar también la abre.
  if (more) more.addEventListener('click', function(){ grid.classList.add('is-open'); more.setAttribute('aria-expanded', 'true'); });
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      var f = chip.getAttribute('data-filter'), shown = 0;
      if (grid && f !== 'todos') { grid.classList.add('is-open'); if (more) more.setAttribute('aria-expanded', 'true'); }
      chips.forEach(function(c){ c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      items.forEach(function(it){
        var on = f === 'todos' || it.getAttribute('data-cat') === f;
        it.hidden = !on;
        if (on) shown++;
      });
      if (status) status.textContent = 'Mostrando ' + shown + (shown === 1 ? ' sitio' : ' sitios');
    });
  });
})();
