/* Radiografía de la ficha de Google: puntuación y mensaje de WhatsApp */
(function(){
  var form = document.getElementById('diag');
  if(!form) return;
  var checks = Array.prototype.slice.call(form.querySelectorAll('.check'));
  var $ = function(id){ return document.getElementById(id); };

  function run(){
    var score = 0, answered = 0, missing = [];
    checks.forEach(function(c, i){
      var picked = c.querySelector('input:checked');
      c.classList.toggle('no', !!picked && picked.value === '0');
      if(!picked) return;
      answered++;
      if(picked.value === '1') score += +c.getAttribute('data-w');
      else missing.push(i + 1);
    });
    $('d-score').textContent = score;
    $('d-answered').textContent = answered;
    var g = $('d-gauge');
    g.style.width = score + '%';
    g.style.background = score >= 80 ? 'var(--paid)' : score >= 50 ? 'var(--sun)' : 'var(--alert)';
    var verdict;
    if(answered === 0) verdict = 'Responde las preguntas para ver tu resultado.';
    else if(score >= 80) verdict = 'Bien posicionada. Ahora toca convertir esas visitas en pedidos por WhatsApp.';
    else if(score >= 50) verdict = 'Te encuentran, pero te saltan. Con los ajustes marcados compites de verdad.';
    else verdict = 'Casi invisible. Hoy la mayoría de quienes te buscan terminan en otro negocio.';
    $('d-verdict').textContent = verdict;

    var rubro = ($('d-rubro').value || '___').trim();
    var msg = 'Hola, hice la radiografía de mi ficha de Google: ' + score + '/100 (' + answered + ' de 10 respondidas).' +
      (missing.length ? ' Me falta: puntos ' + missing.join(', ') + '.' : '') +
      ' Rubro: ' + rubro + '. Ciudad: ' + $('d-city').value + '. Quiero que lo arreglen en 7 días hábiles.';
    $('d-cta').setAttribute('data-wa', msg);
    if(window.OP) window.OP.paint($('d-cta').parentNode);
  }
  form.addEventListener('change', run);
  $('d-city').addEventListener('change', run);
  $('d-rubro').addEventListener('input', run);
  run();
})();
