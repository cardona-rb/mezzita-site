/* Recomendador de plan */
(function(){
  var form = document.getElementById('quiz');
  if(!form) return;
  var PLANS = {
    visible: ['Visible en 7 Días', 'Primero necesitas que te encuentren. Empieza por tu ficha, tu web y tus reseñas. Cuando te escriban más de lo que puedes atender, subes con crédito.'],
    vende: ['Vende y Cobra 24/7', 'Ya tienes demanda y se te escapa en WhatsApp. Necesitas pedidos que lleguen armados y cobrados, también de noche.'],
    acelerador: ['Acelerador de Clientes', 'Quieres más clientes nuevos cada día. Sumamos anuncios que llevan a tu WhatsApp y un vendedor con IA que los atiende.'],
    empresa: ['Empresa a Medida', 'Con varias sucursales o facturación electrónica conviene empezar con un diagnóstico para conectar CUCU y SIAT con tu inventario.']
  };
  function val(n){ var i = form.querySelector('input[name="' + n + '"]:checked'); return i ? i.value : ''; }
  function run(){
    var key = 'visible';
    if(val('q4') === 'si') key = 'empresa';
    else if(val('q3') === 'si' || val('q1') === 'crecer') key = 'acelerador';
    else if(val('q2') !== 'no' || val('q1') === 'pierdo') key = 'vende';
    document.getElementById('quiz-plan').textContent = PLANS[key][0];
    document.getElementById('quiz-why').textContent = PLANS[key][1];
    var cta = document.getElementById('quiz-cta');
    cta.setAttribute('data-wa', 'Hola, el recomendador de la web me sugirió el plan ' + PLANS[key][0] + '. Mi rubro: ___ Mi ciudad: ___');
    if(window.OP) window.OP.paint(form);
  }
  form.addEventListener('change', run); run();
})();
