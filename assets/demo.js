/* Demo v3 · solo comida: pizzería, heladería, restaurante, bar y café, franquicia.
   A la izquierda eres el cliente (en la mesa, por delivery o recojo). A la derecha eres el dueño. */
(function(){
  var C = window.OPChat; if(!C) return;
  var PH = {pizza:['/assets/demo/pizza-hero.webp','/assets/demo/pizza-1.webp','/assets/demo/pizza-2.webp','/assets/demo/pizza-3.webp','/assets/demo/pizza-4.webp'],
            helado:['/assets/demo/helado-hero.webp','/assets/demo/helado-1.webp','/assets/demo/helado-2.webp','/assets/demo/helado-3.webp','/assets/demo/helado-4.webp'],
            rest:['/assets/demo/rest2-hero.webp','/assets/demo/rest-4.webp','/assets/demo/rest-5.webp','/assets/demo/rest-6.webp'],
            bar:['/assets/demo/bar-hero.webp','/assets/demo/bar-1.webp','/assets/demo/bar-2.webp','/assets/demo/bar-3.webp','/assets/demo/bar-4.webp','/assets/demo/bar-5.webp'],
            franq:['/assets/demo/franq-hero.webp','/assets/demo/franq-1.webp','/assets/demo/franq-2.webp','/assets/demo/franq-3.webp']};
  var MESA = [{n:"Mesa 12 · pago con QR ahora",c:0,mesa:true},{n:"Mesa 12 · pago en efectivo en caja",c:0,mesa:true,cash:true}];
  var RUBROS = {
    pizzeria:{flow:{title:"De «¿qué pedimos?» a «ya está en el horno», sin mesero y sin app.",src:[["QR en la mesa","escanea y ve la carta"],["Google Maps","«pizzería cerca» · 21:10"],["Instagram","el video del horno"]],hub:["Tu menú web","fotos, precios y botón de pedir"],wa:["Cocina","pedido armado"],out:[["Pago QR","entra cobrado"],["Reseña","al terminar"]],back:"el que ya pidió vuelve directo al chat: sin app, sin comisión de terceros",money:[["Sin comisión de app","Un pedido de 90 Bs por app te deja 67. Por tu QR te deja 85,50 y con la devolución, 87,75."],["Mesas que piden solas","Un viernes con 2 meseros atiende 14 mesas sin que nadie espere por la carta."],["Ticket más alto","El menú sugiere bebida y postre en cada pedido. El mesero, cuando se acuerda."]]},
      web:{theme:"pizza",url:"pizzerialaesquina.bo",top:"Pedidos: +591 7 000 0000 · Abierto hasta las 23:30 · Delivery propio",nav:["Menú","Promos","Dónde estamos"],eyebrow:"Horno de leña desde 2014",tag:"La mejor pizza de Santa Cruz, en tu mesa o en tu puerta.",sub:"Masa madre, horno de leña y delivery propio sin comisión de apps. Escanea el QR de tu mesa o pide por WhatsApp y paga con QR.",cta:"Pedir por WhatsApp",ghost:"Ver el menú",ph:PH.pizza,itemsTitle:"Lo más pedido",badge:"4,9 ★ · 212 reseñas en Google",split:["Sobre nosotros","Horno de leña, masa de 48 horas y delivery propio.","Sin comisiones de apps: lo que pagas va a la pizza, no a un intermediario.",["Av. Monseñor Rivero 123, Santa Cruz","Lun a Dom · 18:00 a 23:30"]]},
      verbo:"Pedido",av:"LE",nombre:"Pizzería La Esquina",desc:"Pizzas al horno de leña · Santa Cruz",saludo:"Hola. Este es el menú de hoy. Toca una categoría o agrega directo.",cierre:"Sale en 15 minutos.",
      delivery:MESA.concat([{n:"Recojo en local",c:0},{n:"Delivery Centro",c:5},{n:"Delivery fuera del centro",c:10}]),
      CAT:[{sku:"PZ-001",n:"Pizza Margarita",d:"Mozzarella, tomate, albahaca",c:"Pizzas",p:55,v:["Mediana","Familiar"],s:30},{sku:"PZ-002",n:"Pizza Tarijeña",d:"Jamón serrano local, queso, aceitunas",c:"Pizzas",p:72,po:65,v:["Mediana","Familiar"],s:30},{sku:"PZ-003",n:"Pizza 4 quesos",d:"",c:"Pizzas",p:68,s:0},{sku:"PA-001",n:"Lasaña de carne",d:"Porción individual",c:"Pastas",p:48,s:20},{sku:"EN-001",n:"Pan de ajo",d:"6 unidades",c:"Entradas",p:18,s:50},{sku:"BE-001",n:"Limonada con hierbabuena",d:"Jarra 1 L",c:"Bebidas",p:25,s:40},{sku:"BE-002",n:"Vino tinto de la casa",d:"Valle de Tarija · 750 ml",c:"Bebidas",p:85,s:12},{sku:"PO-001",n:"Tiramisú",d:"",c:"Postres",p:22,s:15}]},
    heladeria:{flow:{title:"De «quiero algo dulce» a «pedido listo», con cola corta y caja que suma sola.",src:[["QR en la mesa","o en el mostrador"],["Google Maps","«heladería cerca» · 17:30"],["TikTok","el sabor del mes"]],hub:["Tu menú web","sabores, tamaños y promos"],wa:["Mostrador","pedido armado"],out:[["Pago QR","sin vuelto"],["Reseña","con sello"]],back:"cada cliente que paga por QR queda en tu base: le avisas del sabor nuevo",money:[["Cola corta","El cliente arma su pedido en la mesa o en la fila. Al mostrador llega a pagar, no a decidir."],["Más de un sabor por ticket","El menú muestra combos y toppings con foto. El ticket promedio sube solo."],["Domingos sin caos","Pedidos para recoger pagados antes de llegar: cero colas de 20 minutos."]]},
      web:{theme:"helado",url:"heladeriafrida.bo",top:"Artesanal · Hecho hoy · Delivery en Equipetrol y Centro",nav:["Sabores","Combos","Tortas","Dónde estamos"],eyebrow:"Heladería artesanal",tag:"Sabores de verdad, hechos hoy, listos en 3 minutos.",sub:"Escanea el QR de tu mesa, elige sabores y tamaño, paga con QR y te llamamos por tu nombre. Para llevar, pides antes y recoges sin fila.",cta:"Pedir por WhatsApp",ghost:"Ver los sabores de hoy",ph:PH.helado,itemsTitle:"Sabores de hoy",badge:"4,8 ★ · 340 reseñas en Google",flavors:["Chocolate 70 %","Maracuyá","Dulce de leche","Pistacho","Frutilla","Coco","Café","Mango"]},
      verbo:"Pedido",av:"FR",nombre:"Heladería Frida",desc:"Helado artesanal · 2 sucursales · Santa Cruz",saludo:"Hola. Estos son los sabores de hoy. Elige tamaño y sabores.",cierre:"Te lo preparamos ahora. Te llamamos por tu nombre.",
      delivery:MESA.concat([{n:"Recojo en mostrador",c:0},{n:"Delivery Equipetrol",c:8}]),
      CAT:[{sku:"HE-001",n:"Cono simple",d:"1 sabor",c:"Helados",p:12,s:99},{sku:"HE-002",n:"Vaso doble",d:"2 sabores",c:"Helados",p:20,po:18,s:99},{sku:"HE-003",n:"Copa Frida",d:"3 sabores, crema, salsa y topping",c:"Helados",p:35,v:["Chocolate","Frutos rojos","Caramelo"],s:99},{sku:"CO-001",n:"Combo familiar",d:"1 litro + 4 conos + 2 salsas",c:"Combos",p:95,po:85,s:20},{sku:"TO-001",n:"Torta helada",d:"Para 10 personas · encargo 24 h",c:"Tortas",p:180,v:["Chocolate","Frutilla","Tres leches"],s:6},{sku:"BE-001",n:"Milkshake",d:"500 ml",c:"Bebidas",p:28,v:["Chocolate","Frutilla","Oreo"],s:99},{sku:"BE-002",n:"Café espresso",d:"",c:"Bebidas",p:12,s:99}]},
    restaurante:{flow:{title:"De «¿me trae la carta?» a «cuenta pagada», sin esperar al mesero.",src:[["QR en la mesa","carta al instante"],["Google Maps","«almuerzo cerca» · 12:40"],["Instagram","el plato del día"]],hub:["Tu menú web","carta del día con fotos"],wa:["Cocina","comanda armada"],out:[["Pago QR","cuenta pagada"],["Reseña","al salir"]],back:"el cliente que pagó por QR recibe el menú del día siguiente por WhatsApp",money:[["Más rotación al mediodía","Cada mesa pide al sentarse y paga sin pedir la cuenta: 15 minutos menos por mesa."],["Menos meseros en hora pico","Dos personas atienden lo que antes necesitaba tres. La nómina lo nota."],["Cero errores de comanda","El pedido llega escrito a cocina, con las notas del cliente. Sin «yo pedí sin cebolla»."]]},
      web:{theme:"rest",url:"lacasonadelvalle.bo",top:"Almuerzo de lunes a sábado · Menú del día 35 Bs · Reservas por WhatsApp",nav:["Carta","Menú del día","Reservas","Cómo llegar"],eyebrow:"Cocina de mercado · Cochabamba",tag:"Comida de verdad, servida rápido, pagada sin esperar.",sub:"Escanea el QR de tu mesa, pide lo que quieras y paga con QR cuando termines. O reserva y pide antes de llegar.",cta:"Pedir por WhatsApp",ghost:"Ver la carta de hoy",ph:PH.rest,itemsTitle:"Platos de la semana",badge:"4,7 ★ · 520 reseñas en Google",menu:[["Lunes","Sopa de maní · Silpancho"],["Martes","Chairo · Pique macho"],["Miércoles","Sopa de quinua · Milanesa napolitana"],["Jueves","Lawa · Pollo al horno"],["Viernes","Sopa de pollo · Trucha a la plancha"],["Sábado","Fricasé · Parrillada"]]},
      verbo:"Comanda",av:"CV",nombre:"La Casona del Valle",desc:"Cocina de mercado · 18 mesas · Cochabamba",saludo:"Hola. Esta es la carta de hoy. Toca una categoría o agrega directo.",cierre:"Ya está en cocina. Sale en 20 minutos.",
      delivery:MESA.concat([{n:"Recojo en local",c:0},{n:"Delivery zona Norte",c:8},{n:"Delivery zona Sur",c:12}]),
      CAT:[{sku:"MD-001",n:"Menú del día",d:"Sopa + segundo + refresco",c:"Menú del día",p:35,s:60},{sku:"PL-001",n:"Pique macho",d:"Para 2 personas",c:"Platos",p:95,po:85,s:20},{sku:"PL-002",n:"Silpancho",d:"Con huevo y ensalada",c:"Platos",p:48,s:30},{sku:"PL-003",n:"Trucha a la plancha",d:"Con arroz y ensalada",c:"Platos",p:72,s:12},{sku:"EN-001",n:"Sopa de maní",d:"Porción",c:"Entradas",p:22,s:40},{sku:"BE-001",n:"Refresco de mocochinchi",d:"Jarra",c:"Bebidas",p:18,s:99},{sku:"BE-002",n:"Cerveza Huari",d:"620 ml",c:"Bebidas",p:22,s:48},{sku:"PO-001",n:"Helado de canela",d:"",c:"Postres",p:12,s:30}]},
    bar:{flow:{title:"De «otra ronda» a «ronda pagada», sin perseguir al mozo entre la gente.",src:[["QR en la mesa","pide sin levantarte"],["Google Maps","«bar cerca» · 22:30"],["Instagram","la promo del jueves"]],hub:["Tu menú web","tragos, promos y happy hour"],wa:["Barra","ronda armada"],out:[["Pago QR","cada ronda"],["Reseña","al cerrar"]],back:"cada cliente que pagó por QR recibe la promo del jueves por WhatsApp",money:[["Rondas que no se pierden","A las 23:00 nadie encuentra al mozo. Con el QR la mesa pide sola y la barra recibe la ronda."],["Cuentas que no se escapan","Cada ronda se paga al pedir. Se acabó «la mesa 8 se fue sin pagar»."],["Happy hour que se llena","Promos por WhatsApp a quienes ya vinieron: los jueves flojos se llenan solos."]]},
      web:{theme:"bar",url:"barlaterraza.bo",top:"Jue a Sáb desde las 19:00 · Happy hour 19 a 21 · Mayores de 18",nav:["Tragos","Picar","Happy hour","Eventos"],eyebrow:"Bar y café · Zona Sur, La Paz",tag:"Pide desde tu mesa. Nadie tiene que levantarse.",sub:"Escanea el QR de tu mesa, arma la ronda y paga con QR. La barra recibe el pedido al instante. De día, café y brunch con el mismo QR.",cta:"Pedir por WhatsApp",ghost:"Ver la carta",ph:PH.bar,itemsTitle:"Esta noche",badge:"4,6 ★ · 410 reseñas en Google",hours:[["Café y brunch","Mar a Dom · 9:00 a 14:00"],["Happy hour","2 × 1 en tragos de autor · 19:00 a 21:00"],["Música en vivo","Viernes y sábados · 22:00"]]},
      verbo:"Ronda",av:"LT",nombre:"Bar La Terraza",desc:"Bar y café · 24 mesas · La Paz",saludo:"Hola. Esta es la carta de esta noche. ¿Qué te servimos?",cierre:"Sale de la barra en 5 minutos. Salud.",
      delivery:MESA.concat([{n:"Recojo en barra",c:0}]),
      CAT:[{sku:"TR-001",n:"Chuflay de la casa",d:"Singani, ginger ale y limón",c:"Tragos",p:35,s:99},{sku:"TR-002",n:"Gin tonic de autor",d:"Elige tu botánico",c:"Tragos",p:55,po:45,v:["Pepino y pimienta","Pomelo","Romero"],s:99},{sku:"TR-003",n:"Jarra de sangría",d:"1,5 L · para compartir",c:"Tragos",p:120,s:20},{sku:"CE-001",n:"Cerveza artesanal",d:"IPA o Lager · 500 ml",c:"Cervezas",p:30,v:["IPA","Lager","Stout"],s:99},{sku:"PI-001",n:"Tabla de quesos y jamones",d:"Para 2 a 3 personas",c:"Para picar",p:85,s:15},{sku:"PI-002",n:"Papas con queso y tocino",d:"",c:"Para picar",p:38,s:99},{sku:"CA-001",n:"Capuccino",d:"Brunch de día",c:"Café",p:18,s:99},{sku:"CA-002",n:"Brunch La Terraza",d:"Huevos, pan, fruta y café",c:"Café",p:55,s:30}]},
    franquicia:{flow:{title:"Un menú, cuatro sucursales, una sola caja que suma en tiempo real.",src:[["QR en cada mesa","de las 4 sucursales"],["Google Maps","una ficha por sucursal"],["Anuncios","Meta · al menú web"]],hub:["Tu menú web","el mismo en todas las sucursales"],wa:["Cocina de cada sucursal","pedido enrutado solo"],out:[["Pago QR","entra cobrado"],["Reseña","por sucursal"]],back:"el cliente de la sucursal Norte recibe la promo de la sucursal más cercana a su casa",money:[["Un cambio, todas las sucursales","Subes el precio del combo una vez y cambia en los 4 locales al instante. Sin reimprimir cartas."],["Caja consolidada","Ves qué sucursal vendió qué, pagado por QR, sin esperar el cierre de cada gerente."],["Promos que viajan","Una campaña por WhatsApp a toda la base, con el QR de la sucursal que le toca a cada cliente."]]},
      web:{theme:"franq",url:"burgerhub.bo",top:"4 sucursales · Santa Cruz y Cochabamba · Delivery propio y recojo",nav:["Menú","Combos","Sucursales","Franquicias"],eyebrow:"Burger Hub · desde 2019",tag:"La misma hamburguesa en las 4 sucursales. El mismo QR para pedirla.",sub:"Escanea el QR de tu mesa o elige la sucursal más cercana. Pides, pagas con QR y la cocina de esa sucursal recibe tu pedido.",cta:"Pedir por WhatsApp",ghost:"Ver sucursales",ph:PH.franq,itemsTitle:"Combos",badge:"4,7 ★ · 1.900 reseñas en Google",stores:[["Equipetrol","Santa Cruz · 11:00 a 23:00"],["Plan 3000","Santa Cruz · 11:00 a 22:00"],["Centro","Cochabamba · 11:00 a 23:00"],["Norte","Cochabamba · 12:00 a 22:00"]]},
      verbo:"Pedido",av:"BH",nombre:"Burger Hub",desc:"Franquicia · 4 sucursales · 96 mesas",saludo:"Hola. Estás en la sucursal Equipetrol. Este es el menú:",cierre:"Sale en 10 minutos. Sucursal Equipetrol.",
      delivery:MESA.concat([{n:"Recojo · sucursal Equipetrol",c:0},{n:"Delivery · sucursal más cercana",c:7}]),
      CAT:[{sku:"CB-001",n:"Combo clásico",d:"Hamburguesa + papas + gaseosa",c:"Combos",p:45,s:99},{sku:"CB-002",n:"Combo doble",d:"Doble carne + papas + gaseosa",c:"Combos",p:62,po:55,s:99},{sku:"CB-003",n:"Combo familiar",d:"4 hamburguesas + 2 papas grandes + 1,5 L",c:"Combos",p:180,po:165,s:40},{sku:"HB-001",n:"Hamburguesa simple",d:"Carne 150 g, queso, lechuga, tomate",c:"Hamburguesas",p:32,v:["Con tocino","Sin cebolla","Picante"],s:99},{sku:"HB-002",n:"Pollo crispy",d:"",c:"Hamburguesas",p:35,s:99},{sku:"PA-001",n:"Papas grandes",d:"",c:"Acompañamientos",p:18,s:99},{sku:"PA-002",n:"Aros de cebolla",d:"8 unidades",c:"Acompañamientos",p:20,s:60},{sku:"BE-001",n:"Gaseosa 500 ml",d:"",c:"Bebidas",p:10,s:99},{sku:"PO-001",n:"Sundae",d:"Chocolate o frutilla",c:"Postres",p:14,v:["Chocolate","Frutilla"],s:99}]}
  };
  var $ = function(id){ return document.getElementById(id); };
  var ROOT = (function(){ var l = document.querySelector('link[href$="site.css"]'); return l ? l.getAttribute('href').replace(/assets\/site\.css$/, '') : '/'; })();
  function asset(u){ return u ? ROOT + String(u).replace(/^\//, '') : ''; }
  var esc = C.esc, fmt = C.fmt;
  var phoneEl = document.querySelector('.phone[data-mode="live"]');
  var chat = new C.Chat(phoneEl);
  var key = 'pizzeria', R, cart, orderId, paid = false, summaryBub = null, carouselBub = null, caja = {n: 0, total: 0, qr: 0, cash: 0};
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
  var QR_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1"/></svg>';
  function renderWeb(){
    var el = $('mocksite'); if(!el) return; var W = R.web || {};
    var items = R.CAT.slice(0, 3), th = W.theme || 'pizza', P = W.ph || PH.pizza;
    el.className = 'mocksite ms-' + th;
    if($('m-url')) $('m-url').textContent = W.url || '';
    var nav = '<header class="ms-nav"><b class="ms-logo">' + esc(R.nombre) + '</b><nav>' + (W.nav || []).map(function(n){ return '<span>' + esc(n) + '</span>'; }).join('') + '</nav><span class="ms-btn">' + esc(W.cta || 'WhatsApp') + '</span></header>';
    var top = W.top ? '<div class="ms-top">' + esc(W.top) + '</div>' : '';
    var copy = '<div class="ms-copy"><small>' + esc(W.eyebrow || '') + '</small><h3>' + esc(W.tag || '') + '</h3><p>' + esc(W.sub || '') + '</p>' +
      '<div class="ms-row"><button type="button" class="mcta" data-web-cta>' + WA_SVG + esc(W.cta || 'Pedir por WhatsApp') + '</button><button type="button" class="mcta ms-qr" data-web-cta data-mesa>' + QR_SVG + 'Estoy en una mesa</button><span class="ms-ghost">' + esc(W.ghost || 'Ver más') + '</span></div>' +
      '<span class="ms-badge">' + esc(W.badge || '') + '</span></div>';
    var hero = '<section class="ms-hero" style="--hero:url(' + asset(P[0]) + ')"><div class="ms-hero-img" aria-hidden="true"></div>' + copy + '</section>';
    var cards = '<section class="ms-items"><div class="ms-items-hd"><h4>' + esc(W.itemsTitle || 'Destacados') + '</h4><span>Pide desde tu mesa o por WhatsApp y paga con QR</span></div><div class="ms-grid">' +
      items.map(function(i, k){
        var ph = '<div class="ms-ph" style="background-image:url(' + asset(P[k + 1]) + ')">' + (i.po ? '<i class="ms-tag">Promo</i>' : '') + '</div>';
        return '<article class="ms-card">' + ph + '<div class="ms-card-b"><b>' + esc(i.n) + '</b><span>' + esc(i.d || '') + '</span><em>' + fmt(i.po || i.p) + (i.po ? ' <s>' + fmt(i.p) + '</s>' : '') + '</em></div></article>';
      }).join('') + '</div></section>';
    var more = '';
    if(th === 'pizza' && W.split) more = '<section class="ms-split"><div class="ms-split-copy"><small>' + esc(W.split[0]) + '</small><h4>' + esc(W.split[1]) + '</h4><p>' + esc(W.split[2]) + '</p><ul class="ms-contact">' + W.split[3].map(function(l){ return '<li>' + esc(l) + '</li>'; }).join('') + '</ul><div class="ms-row"><button type="button" class="mcta" data-web-cta>Pedir por WhatsApp</button><span class="ms-ghost">Reservar mesa</span></div></div><div class="ms-split-img" style="background-image:url(' + asset(P[4]) + ')"></div></section>';
    if(th === 'helado') more = '<section class="ms-flavors"><div class="ms-items-hd"><h4>Sabores de hoy</h4><span>Cambian cada día. Los ves desde el QR de tu mesa.</span></div><div class="ms-flavor-grid">' + W.flavors.map(function(f, k){ return '<span class="fl fl-' + (k % 6) + '">' + esc(f) + '</span>'; }).join('') + '</div></section><section class="ms-split helado"><div class="ms-split-img" style="background-image:url(' + asset(P[4]) + ')"></div><div class="ms-split-copy"><small>Para llevar</small><h4>Pide antes, recoge sin fila.</h4><p>Eliges, pagas con QR y cuando llegas tu pedido ya tiene tu nombre. Los domingos a las 18:00 se nota.</p><button type="button" class="mcta" data-web-cta>Pedir para recoger</button></div></section>';
    if(th === 'rest') more = '<section class="ms-menu"><div class="ms-items-hd"><h4>Menú del día · 35 Bs</h4><span>Sopa, segundo y refresco · hasta agotar</span></div><div class="ms-menu-grid">' + W.menu.map(function(m){ return '<div><b>' + esc(m[0]) + '</b><span>' + esc(m[1]) + '</span></div>'; }).join('') + '</div></section><section class="ms-band rest" style="background-image:url(' + asset(P[0]) + ')"><div><small>Grupos y reservas</small><h4>Reserva por WhatsApp y pide antes de llegar. La mesa te espera servida.</h4></div><button type="button" class="mcta" data-web-cta>Reservar por WhatsApp</button></section>';
    if(th === 'bar') more = '<section class="ms-hours"><div class="ms-hours-grid">' + W.hours.map(function(h, k){ return '<div class="ms-hour" style="background-image:url(' + asset([P[0], P[4], P[5]][k]) + ')"><b>' + esc(h[0]) + '</b><span>' + esc(h[1]) + '</span></div>'; }).join('') + '</div></section><section class="ms-band bar"><div><small>Jueves de happy hour</small><h4>2 × 1 en tragos de autor de 19:00 a 21:00. Pide desde tu mesa.</h4></div><button type="button" class="mcta" data-web-cta>Ver la carta</button></section>';
    if(th === 'franq') more = '<section class="ms-stores"><div class="ms-items-hd"><h4>Sucursales</h4><span>El mismo menú, el mismo precio, el mismo QR</span></div><div class="ms-stores-grid">' + W.stores.map(function(s, k){ return '<div><i>0' + (k + 1) + '</i><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>'; }).join('') + '</div></section><section class="ms-band franq"><div><small>¿Quieres una sucursal?</small><h4>Franquicia Burger Hub: el sistema de pedidos ya viene incluido.</h4></div><button type="button" class="mcta" data-web-cta>Hablar por WhatsApp</button></section>';
    el.innerHTML = top + nav + hero + cards + more;
  }
  function fromWeb(mesa){
    var stage = document.querySelector('.demo-stage');
    if(stage) stage.scrollIntoView({behavior: 'smooth', block: 'start'});
    var sel = $('d-deliv'); if(sel){ sel.selectedIndex = mesa ? 0 : (R.delivery.length > 2 ? 2 : 0); }
    chat.add('me', mesa ? 'Hola, escaneé el QR de la mesa 12' : 'Hola, vengo de la web. ¿Tienen disponible?', now());
    var tb = chat.typing();
    setTimeout(function(){ chat.replaceTyping(tb, esc(mesa ? 'Hola, mesa 12. ' + R.saludo : R.saludo), now()); carouselBub = null; showCategory(cats()[0]); }, 650);
    if(phoneEl){ phoneEl.classList.remove('nudge'); void phoneEl.offsetWidth; phoneEl.classList.add('nudge'); }
    updateSend();
  }

  function renderFlow(){
    var box = $('flowdemo'); if(!box) return; var F = R.flow; if(!F){ box.innerHTML = ''; return; }
    if($('f-title')) $('f-title').textContent = F.title;
    if($('f-calc')) $('f-calc').href = ROOT + 'calculadora/?rubro=' + key;
    function node(cls, x, y, w, h, t, sub, center){
      var cx = center ? w / 2 : 44, anchor = center ? ' c' : '';
      var dot = center ? '<circle class="pulse big" cx="' + (w / 2) + '" cy="38" r="8"/><circle class="dot" cx="' + (w / 2) + '" cy="38" r="8"/>' : '<circle class="pulse" cx="22" cy="40" r="6"/><circle class="dot" cx="22" cy="40" r="6"/>';
      var ty = center ? 76 : 36, sy = center ? 98 : 58;
      if(cls === 'out'){ dot = ''; ty = 30; sy = 52; }
      return '<g class="node ' + cls + '" transform="translate(' + x + ',' + y + ')"><rect width="' + w + '" height="' + h + '" rx="' + (cls === 'hub' || cls === 'hub wa' ? 18 : 14) + '"/>' + dot +
        '<text x="' + cx + '" y="' + ty + '" class="t' + anchor + '">' + esc(t) + '</text><text x="' + cx + '" y="' + sy + '" class="s' + anchor + '">' + esc(sub) + '</text></g>';
    }
    var svg = '<p class="flowmap-hint" aria-hidden="true">Desliza para ver el recorrido completo →</p><div class="flowmap-wrap"><svg class="flowmap" viewBox="0 0 1200 440" role="img" aria-label="' + esc(F.title) + '">' +
      '<defs><path id="q1" d="M250 90 C 360 90, 380 220, 490 220"/><path id="q2" d="M250 220 L 490 220"/><path id="q3" d="M250 350 C 360 350, 380 220, 490 220"/><path id="q4" d="M710 220 L 870 220"/><path id="q5" d="M1010 220 C 1060 220, 1060 130, 1110 130"/><path id="q6" d="M1010 220 C 1060 220, 1060 310, 1110 310"/><path id="qback" d="M1150 345 C 1150 420, 600 430, 600 300"/></defs>' +
      '<g class="wires"><use href="#q1"/><use href="#q2"/><use href="#q3"/><use href="#q4"/><use href="#q5"/><use href="#q6"/><use href="#qback" class="dashed"/></g>' +
      '<g class="movers">' + [['q1','3.2s','1.1s',''],['q2','2.6s','0.8s',''],['q3','3.4s','1.6s',''],['q4','2.2s','0.4s',''],['q4','2.2s','1.9s',''],['q5','2s','1.2s','paid'],['q6','2.4s','2.4s','star'],['qback','5s','3s','back']].map(function(m){ return '<circle r="' + (m[3] === 'back' ? 4 : 5) + '" class="' + m[3] + '"><animateMotion dur="' + m[1] + '" begin="-' + m[2] + '" repeatCount="indefinite"><mpath href="#' + m[0] + '"/></animateMotion></circle>'; }).join('') + '</g>' +
      node('src', 40, 50, 210, 80, F.src[0][0], F.src[0][1]) + node('src', 40, 180, 210, 80, F.src[1][0], F.src[1][1]) + node('src', 40, 310, 210, 80, F.src[2][0], F.src[2][1]) +
      node('hub', 490, 160, 220, 120, F.hub[0], F.hub[1], true) + node('hub wa', 870, 160, 140, 120, F.wa[0], F.wa[1], true) +
      node('out', 1110, 95, 80, 70, F.out[0][0], F.out[0][1], true) + node('out', 1110, 275, 80, 70, F.out[1][0], F.out[1][1], true) +
      '<text x="600" y="420" class="s c back-label">' + esc(F.back) + '</text></svg></div>';
    box.innerHTML = svg;
    var m = $('f-money'); if(m) m.innerHTML = '<p class="eyebrow">Dónde aparece el dinero</p><div class="money-grid">' + F.money.map(function(x, i){ return '<div><span class="mn">' + (i + 1) + '</span><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div>';
  }
  function load(k){
    key = k; R = RUBROS[k]; cart = {}; paid = false; summaryBub = null; carouselBub = null;
    orderId = String(Date.now()).slice(-6);
    document.querySelectorAll('[data-rubro]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-rubro') === k ? 'true' : 'false'); });
    $('d-name').textContent = R.nombre; $('d-av').textContent = R.av;
    $('o-biz').textContent = R.nombre; $('o-desc').textContent = R.desc;
    caja = {n: 0, total: 0, qr: 0, cash: 0}; $('o-n').textContent = '0'; $('o-total').textContent = '0 Bs'; pendingRow = null; $('o-live').innerHTML = '<p class="o-empty">Cuando tu cliente pague, el pedido aparece aquí con su mesa o su dirección. Sin preguntar, sin revisar comprobantes.</p>'; updateCommission();
    $('d-deliv').innerHTML = R.delivery.map(function(d){ return '<option>' + esc(d.n) + (d.c ? ' (+' + d.c + ' Bs)' : '') + '</option>'; }).join('');
    try{ var u = new URL(location.href); u.searchParams.set('rubro', k); history.replaceState(null, '', u); }catch(e){}
    renderWeb(); renderFlow();
    chat.clear();
    chat.add('me', 'Hola, escaneé el QR de la mesa 12', now());
    var tb = chat.typing();
    setTimeout(function(){ chat.replaceTyping(tb, esc('Hola, mesa 12. ' + R.saludo), now()); showCategory(cats()[0]); }, 650);
    updateSend();
  }
  function deliv(){ return R.delivery[$('d-deliv').selectedIndex] || R.delivery[0]; }
  function lines(){ return Object.keys(cart).map(function(k){ var l = cart[k]; return {q: l.q, n: l.i.n + (l.v ? ' (' + l.v + ')' : ''), t: (l.i.po || l.i.p) * l.q}; }); }
  function total(){ var t = 0; lines().forEach(function(l){ t += l.t; }); return t + deliv().c; }
  function summarize(){
    var ls = lines(); if(!ls.length) return;
    var d = deliv();
    var btn = d.cash ? '<button type="button" class="act" data-pay>Enviar a cocina · pago en caja</button>' : '<button type="button" class="act" data-pay>Pagar con QR · ' + fmt(total()) + '</button>';
    var html = C.summaryHTML(ls, d, total(), btn);
    if(summaryBub && summaryBub.parentNode){ summaryBub.innerHTML = html + '<span class="time">' + now() + '</span>'; chat.scroll(); }
    else { var tb = chat.typing(); summaryBub = tb; setTimeout(function(){ chat.replaceTyping(tb, html, now()); }, 500); }
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
    pendingRow.innerHTML = '<span class="o-dot"></span><div><b>' + esc(R.verbo) + ' en curso · ' + esc(deliv().mesa ? 'Mesa 12' : deliv().n) + '</b><small>' + lines().map(function(l){ return l.q + ' × ' + esc(l.n); }).join(', ') + '</small></div><span class="o-amt num">' + fmt(total()) + '</span>';
  }
  function pay(){
    if(paid || !Object.keys(cart).length){ toast('Agrega algo primero.'); return; }
    paid = true;
    var t = total(), id = orderId, ls = lines(), d = deliv(), cash = !!d.cash;
    var tb = chat.typing();
    if(cash){
      setTimeout(function(){ chat.replaceTyping(tb, '<div>Listo. Tu pedido <b>#' + id + '</b> ya está en cocina.</div><div class="lines"><div><span>Mesa</span><span>12</span></div><div><span>Pago</span><span>En caja, al salir</span></div></div><span class="paid">✓ EN COCINA</span><div style="margin-top:.3rem">' + esc(R.cierre) + '</div>', now()); }, 600);
    } else {
      setTimeout(function(){ chat.replaceTyping(tb, '<div>Escanea para pagar <b>' + fmt(t) + '</b></div>' + C.qrHTML(t) + '<div style="font-size:.74rem;color:var(--ink-3)">Vence en 10 min</div>', now()); }, 500);
      setTimeout(function(){ chat.add('me', 'Listo, pagué', now()); }, 2400);
    }
    setTimeout(function(){
      if(!cash){ var tb2 = chat.typing(); setTimeout(function(){ chat.replaceTyping(tb2, C.paidHTML(t, id) + '<div style="margin-top:.3rem">' + esc(R.cierre) + '</div>', now()); }, 600); }
      caja.n++; caja.total += t; if(cash) caja.cash += t; else caja.qr += t;
      var live = $('o-live');
      if(pendingRow && pendingRow.parentNode) pendingRow.remove(); pendingRow = null;
      var row = document.createElement('div'); row.className = 'o-row new';
      row.innerHTML = '<span class="o-dot ' + (cash ? 'cash' : 'ok') + '"></span><div><b>' + esc(R.verbo) + ' #' + id + ' · ' + esc(d.mesa ? 'Mesa 12' : d.n) + '</b><small>' + ls.map(function(l){ return l.q + ' × ' + esc(l.n); }).join(', ') + (cash ? ' · <em>efectivo en caja · 0 % comisión</em>' : ' · <em>pagado por QR</em>') + '</small></div><span class="o-amt num ' + (cash ? 'cash-amt' : 'paid-amt') + '">' + fmt(t) + '</span>';
      live.insertBefore(row, live.firstChild);
      $('o-n').textContent = caja.n; $('o-total').textContent = fmt(caja.total); $('o-zero').textContent = '0'; updateCommission();
      setTimeout(function(){ cart = {}; paid = false; summaryBub = null; orderId = String(Date.now()).slice(-6); var tb3 = chat.typing(); setTimeout(function(){ chat.replaceTyping(tb3, '¿Algo más? Puedes seguir pidiendo desde la mesa.', now()); carouselBub = null; showCategory(cats()[0]); updateSend(); }, 500); }, 2600);
    }, cash ? 900 : 3100);
  }
  function message(){
    var ls = lines(), d = deliv();
    return '*' + R.verbo + ' · ' + R.nombre + '* (demo)\n' + (ls.map(function(l){ return '• ' + l.q + ' × ' + l.n + ': ' + fmt(l.t); }).join('\n') || '(sin productos)') +
      '\n' + (d.mesa ? 'Mesa 12' : d.n) + (d.c ? ' (+' + fmt(d.c) + ')' : '') + '\n*Total: ' + fmt(total()) + '*\n' + R.verbo + ' #' + orderId;
  }
  function updateSend(){ $('d-send').href = window.OP ? window.OP.waHref(message()) : 'https://wa.me/59171868545?text=' + encodeURIComponent(message()); }
  function updateCommission(){
    var box = $('o-com'); if(!box) return;
    var pct = Math.max(0, Math.min(60, +$('o-pct').value || 0));
    $('o-saved').textContent = fmt(Math.round(caja.total * pct / 100));
    var ours = Math.round(caja.qr * 0.05);
    $('o-ours').textContent = fmt(ours);
    $('o-back').textContent = fmt(Math.round(ours / 2));
    $('o-cash').textContent = fmt(caja.cash);
  }
  function toast(msg){ var n = document.createElement('div'); n.className = 'toast'; n.textContent = msg; document.body.appendChild(n); setTimeout(function(){ n.remove(); }, 2200); }

  document.addEventListener('click', function(e){
    var t = e.target.closest('button'); if(!t) return;
    if(t.hasAttribute('data-rubro')) load(t.getAttribute('data-rubro'));
    else if(t.hasAttribute('data-web-cta')) fromWeb(t.hasAttribute('data-mesa'));
    else if(t.hasAttribute('data-cat') && phoneEl.contains(t)) showCategory(t.getAttribute('data-cat'));
    else if(t.hasAttribute('data-add')){ var card = t.closest('.card'); add(t.getAttribute('data-add'), card && card.querySelector('select')); }
    else if(t.hasAttribute('data-pay') || t.id === 'd-pay') pay();
    else if(t.id === 'd-reset') load(key);
  });
  if($('o-pct')) $('o-pct').addEventListener('input', updateCommission);
  $('d-deliv').addEventListener('change', function(){ if(summaryBub && !paid) summarize(); if(pendingRow && pendingRow.parentNode) ownerPending(); updateSend(); var b = $('d-pay'); if(b) b.textContent = deliv().cash ? 'Enviar a cocina' : 'Cobrar con QR'; });
  $('d-send').addEventListener('click', function(e){ if(!Object.keys(cart).length){ e.preventDefault(); toast('Agrega algo primero.'); } });
  load(key);
})();
