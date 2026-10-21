#!/usr/bin/env python3
"""Arma el sitio de Outperform.

Cada archivo en src/ empieza con un comentario JSON de metadatos y contiene solo el <main>.
Salidas:
  dist/     URLs limpias (/planes/) para subir a cualquier hosting estático.
  preview/  enlaces relativos a .../index.html para la vista previa.
"""
import json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC, ASSETS = os.path.join(ROOT, "src"), os.path.join(ROOT, "assets")
SITE = os.environ.get("SITE_URL", "https://outperform.business").rstrip("/")
BASE = os.environ.get("SITE_BASE", "").rstrip("/")  # p. ej. /outperform-site cuando se sirve en GitHub Pages sin dominio propio

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,500..800'
         '&family=Instrument+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap">')

LOGO = ('<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" stroke-width="1.5"/>'
        '<path d="M8 15.5c3-4.5 6-4.5 9 0 1.2 1.8 2.4 1.8 3.5 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
        '<circle cx="18.6" cy="12.1" r="1.1" fill="currentColor"/></svg>')

NAV = [("servicios", "/servicios/", "Servicios"), ("planes", "/planes/", "Planes"),
       ("demo", "/demo/", "Demo"), ("casos", "/casos/", "Casos"), ("diagnostico", "/diagnostico/", "Radiografía gratis")]

WA_ICON = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>')

WA_DEFAULT = "Hola, vengo de la web de Outperform y quiero hablar con alguien del equipo."


def layout(meta, body):
    nav = "".join(
        '<a class="pill" href="%s"%s>%s</a>' % (href, ' aria-current="page"' if meta.get("nav") == key else "", label)
        for key, href, label in NAV)
    mnav = "".join(
        '<a href="%s"%s>%s</a>' % (href, ' aria-current="page"' if meta.get("nav") == key else "", label)
        for key, href, label in NAV) + '<a href="/blog/">Blog</a>'
    scripts = "".join('<script src="/assets/%s" defer></script>' % s for s in meta.get("scripts", []))
    canonical = SITE + BASE + meta["path"]
    robots = '<meta name="robots" content="noindex">' if meta.get("noindex") else ""
    theme = "#F4F3EE"
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{meta["title"]}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="{meta["desc"]}">
<link rel="canonical" href="{canonical}">
{robots}
<meta property="og:title" content="{meta["title"]}">
<meta property="og:description" content="{meta["desc"]}">
<meta property="og:locale" content="es_BO">
<meta property="og:type" content="{meta.get("og_type","website")}">
<meta property="og:url" content="{canonical}">
<meta name="theme-color" content="{theme}">
<meta property="og:site_name" content="Outperform Partners">
<meta property="og:image" content="{SITE}{BASE}/assets/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Outperform Partners: los clientes están ahí. Google Maps, página web y pedidos por WhatsApp en Bolivia.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{meta["title"]}">
<meta name="twitter:description" content="{meta["desc"]}">
<meta name="twitter:image" content="{SITE}{BASE}/assets/og.jpg">
<link rel="icon" href="/assets/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/assets/site.webmanifest">
{FONTS}
<link rel="stylesheet" href="/assets/site.css">
{meta.get("head","")}
</head>
<body>
<div class="progress" aria-hidden="true"><i id="progress"></i></div>
<div id="backdrop" aria-hidden="true"><canvas></canvas></div>
<header class="hd" id="hd"><div class="wrap hd-row">
<a class="logo" href="/" aria-label="Outperform, inicio">{LOGO}<span>Outperform <small>Partners</small></span></a>
<div class="capsule" data-nav-capsule><div class="glass-layer" aria-hidden="true"></div>
<nav class="nav" aria-label="Principal"><span class="nav-lens" data-nav-lens aria-hidden="true"></span>{nav}</nav></div>
<a class="btn btn-primary hd-cta" data-wa="{WA_DEFAULT}" href="https://wa.me/59171868545">Hablar por WhatsApp</a>
<button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Abrir menú"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><path d="M1 1h18M1 7h18M1 13h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
</div>
<nav class="mnav" id="mnav" aria-label="Menú móvil" hidden>{mnav}<a class="btn btn-primary" data-wa="{WA_DEFAULT}" href="https://wa.me/59171868545">Hablar por WhatsApp</a></nav>
</header>
<main id="main">
{body}
</main>
<footer class="ft"><div class="wrap">
<div><a class="logo" href="/">{LOGO}<span>Outperform <small>Partners</small></span></a>
<p style="margin-top:.8rem;max-width:22rem">Pedidos en mesa y delivery, cobrados por QR, para restaurantes, pizzerías, bares, cafés y heladerías de Bolivia. Del equipo detrás de Levisoft.</p></div>
<div><h4>Sitio</h4><a href="/servicios/">Servicios</a><a href="/planes/">Planes y precios</a><a href="/demo/">Demo de pedidos</a><a href="/casos/">Casos</a><a href="/diagnostico/">Radiografía de tu ficha</a><a href="/calculadora/">Calculadora de pérdida</a><a href="/empezar/">Qué necesitas entregar</a><a href="/blog/">Blog</a></div>
<div><h4>Legal</h4><a href="/terminos/">Términos del servicio</a><a href="/privacidad/">Privacidad</a><a href="/cookies/">Cookies</a><a href="/garantias/">Garantías</a><a href="/assets/docs/contrato-modelo-outperform.pdf" target="_blank" rel="noopener">Contrato modelo (PDF)</a></div>
<div><h4>Hablemos</h4><a data-wa="Hola, quiero hablar con alguien del equipo de Outperform." href="https://wa.me/59171868545">WhatsApp +591 71868545</a><p class="muted" style="margin-top:.4rem">Tarija, Santa Cruz, La Paz, Cochabamba, Sucre, Potosí, Oruro, Beni y Pando.</p></div>
<div><h4>Socios</h4><p class="muted">Cobros y facturación con CUCU.</p><a class="ft-levi" href="https://levisoft.pro" target="_blank" rel="noopener"><span class="muted">Ingeniería de</span><img src="/assets/logos/levisoft-logo-light.webp" alt="Levisoft" width="1825" height="393" loading="lazy"></a></div>
<p class="legal">© <span data-year>2026</span> Outperform Partners · NIT en trámite de publicación · Tarija, Bolivia. Los resultados dependen de cada negocio, su rubro y su ciudad. Las garantías aplican según las condiciones escritas en tu contrato.</p>
</div></footer>
<a class="wa-float" data-wa="Hola, vengo de la web de Outperform." href="https://wa.me/59171868545" aria-label="Escribir por WhatsApp">{WA_ICON}<span>Escríbenos por WhatsApp</span></a>
<div class="mbar"><a class="btn" data-wa="{WA_DEFAULT}" href="https://wa.me/59171868545">Hablar por WhatsApp</a><span class="mbar-sub">Te responde una persona · sin compromiso</span></div>
<script src="/assets/site.js" defer></script>
<script src="/assets/backdrop.js" defer></script>
{scripts}
</body>
</html>
"""


PARTIALS = os.path.join(SRC, "_partials")


def include(html):
    """Sustituye {{include:nombre}} por src/_partials/nombre.html (una pasada basta)."""
    def rep(m):
        f = os.path.join(PARTIALS, m.group(1) + ".html")
        if not os.path.exists(f):
            sys.exit(f"partial no encontrado: {m.group(1)}")
        return open(f, encoding="utf8").read()
    html = re.sub(r"\{\{include:([a-z0-9_-]+)\}\}", rep, html)
    return re.sub(r"\{\{icon:([a-z]+)\}\}", lambda m: icon_svg(m.group(1)), html)


BLOG = os.path.join(SRC, "blog")
RUBROS = {
    "restaurantes": ("Restaurantes, bares y cafés", "restaurante", "Pedidos en mesa y delivery, cobrados por QR", "/demo/?rubro=restaurante"),
    "general": ("Para todo negocio de comida", "", "Tu ficha de Google, revisada gratis", "/diagnostico/"),
}
RUBRO_ICON = {
    "restaurantes": '<path d="M7 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M9 3v18"/><path d="M17 3c-2 2-2 6-2 8h4V3z"/><path d="M17 11v10"/>',
    "general": '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.3"/>',
}
# iconos de comida para {{icon:nombre}} (trazo, 24x24)
ICONS = {
    "pizza": '<path d="M12 3l9 16H3z"/><path d="M5.6 15.5c4-2.4 8.8-2.4 12.8 0"/><circle cx="12" cy="10" r="1.2"/><circle cx="9.5" cy="14" r="1.2"/><circle cx="14.5" cy="14" r="1.2"/>',
    "helado": '<path d="M7.5 10a4.5 4.5 0 1 1 9 0"/><path d="M6.5 10h11l-5.5 11z"/><path d="M9 13l3 6M15 13l-3 6"/>',
    "plato": '<path d="M3 17h18"/><path d="M5 17a7 7 0 0 1 14 0"/><path d="M12 8V6"/><path d="M4 20h16"/>',
    "copa": '<path d="M8 3h8l-1 7a3 3 0 0 1-6 0z"/><path d="M12 13v7M8 21h8"/><path d="M8.3 6h7.4"/>',
    "burger": '<path d="M4 10h16a8 8 0 0 0-16 0z"/><path d="M3 13h18"/><path d="M4 16h16l-1.5 4h-13z"/><path d="M8 7h.01M12 6h.01M16 7h.01"/>',
    "cafe": '<path d="M4 8h12v6a5 5 0 0 1-10 0z"/><path d="M16 9h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M4 21h14"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/>',
    "qr": '<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z"/><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1"/>',
    "mesa": '<path d="M3 8h18"/><path d="M5 8l-1 11M19 8l1 11"/><path d="M12 8v11"/><path d="M8 19h8"/><path d="M9 5h6"/>',
    "cocina": '<path d="M4 7h16v3H4z"/><path d="M6 10v10h12V10"/><path d="M9 14h6"/><path d="M8 4c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3M16 4c0 1.5 1 1.5 1 3"/>',
    "moto": '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h6l3-7h3"/><path d="M12 17l-2-6H7"/><path d="M14 10h4l2 4"/>',
    "campana": '<path d="M4 17h16"/><path d="M5 17a7 7 0 0 1 14 0"/><path d="M12 10V8"/><path d="M11 8h2"/>',
    "tenedor": '<path d="M7 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M9 3v18"/><path d="M17 3c-2 2-2 6-2 8h4V3z"/><path d="M17 11v10"/>',
    "estrella": '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z"/>',
    "whatsapp": '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1a4 4 0 0 1-2.5-2.5l1-1-1-2z"/>',
    "sucursales": '<path d="M3 21h18"/><path d="M4 21V9l4-4h8l4 4v12"/><path d="M9 21v-5h6v5"/><path d="M8 12h2M14 12h2"/>',
}


def icon_svg(name):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[name]}</svg>'


MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]


def icon(rubro):
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
            + RUBRO_ICON.get(rubro, RUBRO_ICON["general"]) + "</svg>")


def fecha(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} de {MONTHS[int(m) - 1]} de {y}"


def esc(t):
    return (t or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def jsonld(obj):
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False) + "</script>"


def read_posts():
    posts = []
    if not os.path.isdir(BLOG):
        return posts
    for rubro in sorted(os.listdir(BLOG)):
        d = os.path.join(BLOG, rubro)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            if not name.endswith(".html"):
                continue
            raw = open(os.path.join(d, name), encoding="utf8").read()
            m = re.match(r"\s*<!--(\{.*?\})-->\s*", raw, re.S)
            if not m:
                sys.exit(f"blog/{rubro}/{name}: falta el comentario de metadatos")
            try:
                meta = json.loads(m.group(1))
            except json.JSONDecodeError as e:
                sys.exit(f"blog/{rubro}/{name}: metadatos inválidos ({e})")
            slug = name[:-5]
            meta.setdefault("rubro", rubro)
            meta.setdefault("path", f"/blog/{rubro}/{slug}/")
            meta.setdefault("nav", "blog")
            meta.setdefault("date", "2026-10-20")
            body = m.end() and raw[m.end():]
            if re.search(r"(^|[\s(>])#[A-Za-z]", re.sub(r"<[^>]+>", " ", body)):
                sys.exit(f"blog/{rubro}/{name}: hay un '#' suelto en el texto")
            words = len(re.sub(r"<[^>]+>", " ", body).split())
            meta.setdefault("read", max(3, round(words / 220)))
            meta["_words"] = words
            posts.append((meta, body))
    posts.sort(key=lambda p: p[0]["date"], reverse=True)
    return posts


def post_card(meta):
    r = meta["rubro"]
    return (f'<a class="pcardb" href="{meta["path"]}"><span class="cover r-{r}" aria-hidden="true">{icon(r)}</span>'
            f'<span class="eyebrow">{fecha(meta["date"])} · {esc(RUBROS[r][0])} · {meta["read"]} min</span>'
            f'<h3>{esc(meta.get("h1") or meta["title"].split(" | ")[0])}</h3><p>{esc(meta["desc"])}</p></a>')


def render_post(meta, body, all_posts):
    r = meta["rubro"]
    label, demo_key, cta_label, cta_href = RUBROS[r]
    h1 = meta.get("h1") or meta["title"].split(" | ")[0]
    faq = meta.get("faq") or []
    sources = meta.get("sources") or []
    related = [p for p in all_posts if p["rubro"] == r and p["path"] != meta["path"]][:3]
    if len(related) < 3:
        related += [p for p in all_posts if p["rubro"] != r and p["path"] != meta["path"]][:3 - len(related)]
    faq_html = ""
    if faq:
        faq_html = '<section class="faq-block"><h2>Preguntas frecuentes</h2>' + "".join(
            f'<details><summary>{esc(q["q"])}</summary><p>{esc(q["a"])}</p></details>' for q in faq) + "</section>"
    src_html = ""
    if sources:
        src_html = '<section class="sources"><h2>Fuentes</h2><ol>' + "".join(
            f'<li><a href="{esc(s["u"])}" target="_blank" rel="noopener nofollow">{esc(s["t"])}</a></li>' for s in sources) + "</ol></section>"
    rel_html = '<section class="related"><p class="eyebrow">Sigue leyendo</p><div class="pgrid">' + "".join(post_card(p) for p in related) + "</div></section>"
    cta_msg = f"Hola, leí «{h1}» en el blog de Outperform y quiero saber cómo aplicarlo a mi negocio. Rubro: ___ Ciudad: ___"
    cta_html = (f'<aside class="post-cta night-card"><div><p class="eyebrow">{esc(cta_label)}</p>'
                f'<h2>Tu carta en un QR, en 7 días hábiles.</h2>'
                f'<p>Menú web, QR en cada mesa, pedidos a cocina por WhatsApp y cobro por QR. 400 Bs al mes y 5 % solo sobre lo que cobras por QR. Si no estás en línea en 7 días hábiles, tu primer mes es gratis.</p></div>'
                f'<div class="cta-row"><a class="btn btn-sun" data-wa="{esc(cta_msg)}" href="https://wa.me/59171868545">Hablar por WhatsApp</a>'
                f'<a class="link-dark" href="{cta_href}">{"Probar la demo" if demo_key else "Revisar mi ficha gratis"}</a></div></aside>')
    toc = re.findall(r"<h2(?: id=\"([^\"]*)\")?>(.*?)</h2>", body)
    # ids a los h2 para el índice
    def add_id(m):
        txt = re.sub(r"<[^>]+>", "", m.group(2))
        slug = re.sub(r"[^a-z0-9]+", "-", txt.lower().translate(str.maketrans("áéíóúüñ", "aeiouun"))).strip("-")[:60]
        return f'<h2 id="{slug}">{m.group(2)}</h2>'
    body = re.sub(r"<h2(?: id=\"[^\"]*\")?>(.*?)</h2>", lambda m: add_id(type("M", (), {"group": lambda self, i: (None, None, m.group(1))[i]})()), body)
    heads = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)
    toc_html = ""
    if len(heads) >= 4:
        toc_html = '<nav class="toc" aria-label="Contenido"><p class="eyebrow">En esta guía</p><ol>' + "".join(
            f'<li><a href="#{i}">{re.sub(r"<[^>]+>", "", t)}</a></li>' for i, t in heads) + "</ol></nav>"
    ld = [
        {"@context": "https://schema.org", "@type": "Article", "headline": h1, "description": meta["desc"],
         "datePublished": meta["date"], "dateModified": meta.get("updated", meta["date"]), "inLanguage": "es-BO",
         "mainEntityOfPage": SITE + meta["path"], "wordCount": meta.get("_words", 0),
         "author": {"@type": "Organization", "name": "Outperform Partners", "url": SITE},
         "publisher": {"@type": "Organization", "name": "Outperform Partners", "url": SITE,
                       "logo": {"@type": "ImageObject", "url": SITE + "/assets/favicon.svg"}},
         "about": label, "keywords": ", ".join(meta.get("tags", []))},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Blog", "item": SITE + "/blog/"},
            {"@type": "ListItem", "position": 2, "name": label, "item": SITE + f"/blog/{r}/"},
            {"@type": "ListItem", "position": 3, "name": h1, "item": SITE + meta["path"]}]},
    ]
    if faq:
        ld.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q["q"], "acceptedAnswer": {"@type": "Answer", "text": q["a"]}} for q in faq]})
    meta["head"] = "".join(jsonld(o) for o in ld)
    meta["og_type"] = "article"
    tags = "".join(f'<span class="pill">{esc(t)}</span>' for t in meta.get("tags", []))
    html = (f'<article class="article"><div class="wrap narrow">'
            f'<p class="meta"><a href="/blog/">Blog</a> · <a href="/blog/{r}/">{esc(label)}</a> · {fecha(meta["date"])} · {meta["read"]} min de lectura</p>'
            f'<h1>{esc(h1)}</h1><p class="lede" style="margin-bottom:1.6rem">{esc(meta.get("lede") or meta["desc"])}</p>'
            f'<div class="tags">{tags}</div>{toc_html}<div class="prose">{body}</div>{faq_html}{src_html}'
            f'<p class="author"><span class="av-org">{LOGO}</span><span><b>Equipo Outperform Partners</b><br>Ingeniería de Levisoft, más de diez años construyendo sitios y sistemas para empresas de México, Estados Unidos y Latinoamérica. Ahora, para negocios de Bolivia.</span></p>'
            f'{cta_html}{rel_html}</div></article>')
    return html


def render_blog_index(posts):
    tabs = '<a class="pill" href="/blog/" aria-current="page">Todo</a>' + "".join(
        f'<a class="pill" href="/blog/{k}/">{esc(v[0])}</a>' for k, v in RUBROS.items() if any(p["rubro"] == k for p in posts))
    cards = "".join(post_card(p) for p in posts)
    body = (f'<section class="page-head" style="padding-bottom:1rem"><div class="wrap"><div class="hero-copy" style="max-width:52rem">'
            f'<p class="eyebrow">Blog · {len(posts)} guías</p><h1>Guías para que te encuentren y te <span class="sticker">compren.</span></h1>'
            f'<p class="lede">Lo que hacemos para nuestros clientes en Bolivia, explicado paso a paso para que puedas hacerlo tú. Por rubro, con datos locales y fuentes.</p></div>'
            f'<nav class="rubro-tabs" aria-label="Rubros">{tabs}</nav></div></section>'
            f'<section class="sec" style="padding-top:1.5rem"><div class="wrap"><div class="pgrid">{cards}</div>'
            f'<aside class="post-cta"><p class="eyebrow">Herramienta gratis</p><h2 style="font-size:var(--step-2)">¿Cómo está tu ficha de Google hoy? Revísala en 2 minutos.</h2>'
            f'<div class="cta-row"><a class="btn btn-primary" href="/diagnostico/">Hacer mi radiografía</a></div></aside></div></section>')
    meta = {"title": "Blog · Guías para negocios en Bolivia | Outperform", "desc": "Guías prácticas para que tu restaurante, pizzería, heladería o bar en Bolivia aparezca en Google Maps, cobre por QR y venda por WhatsApp sin comisión de apps. Para restaurantes, pizzerías, heladerías, bares y cafés.", "path": "/blog/", "nav": "blog"}
    return meta, body


def render_rubro_index(rubro, posts):
    label, demo_key, cta_label, cta_href = RUBROS[rubro]
    mine = [p for p in posts if p["rubro"] == rubro]
    tabs = '<a class="pill" href="/blog/">Todo</a>' + "".join(
        f'<a class="pill" href="/blog/{k}/"{" aria-current=\"page\"" if k == rubro else ""}>{esc(v[0])}</a>' for k, v in RUBROS.items() if any(p["rubro"] == k for p in posts))
    body = (f'<section class="page-head" style="padding-bottom:1rem"><div class="wrap"><div class="hero-copy" style="max-width:52rem">'
            f'<p class="eyebrow">Blog · {label}</p><h1>{esc(label)}: guías para Bolivia.</h1>'
            f'<p class="lede">{len(mine)} guías escritas para dueños de {label.lower()} en Bolivia: cómo aparecer en Google, qué debe tener tu web y cómo vender por WhatsApp sin perder margen.</p></div>'
            f'<nav class="rubro-tabs" aria-label="Rubros">{tabs}</nav></div></section>'
            f'<section class="sec" style="padding-top:1.5rem"><div class="wrap"><div class="pgrid">{"".join(post_card(p) for p in mine)}</div>'
            f'<aside class="post-cta night-card"><div><p class="eyebrow">{esc(cta_label)}</p><h2>Esto, hecho para tu negocio, en 7 días hábiles.</h2></div>'
            f'<div class="cta-row"><a class="btn btn-sun" href="{cta_href}">{"Probar la demo" if demo_key else "Revisar mi ficha gratis"}</a><a class="link-dark" href="/planes/">Ver planes</a></div></aside></div></section>')
    meta = {"title": f"Guías para {label.lower()} en Bolivia | Blog Outperform", "desc": f"Guías prácticas para {label.lower()} en Bolivia: Google Maps, página web, WhatsApp, cobros por QR y reseñas. Con datos locales y fuentes.", "path": f"/blog/{rubro}/", "nav": "blog",
            "head": jsonld({"@context": "https://schema.org", "@type": "CollectionPage", "name": f"Guías para {label.lower()} en Bolivia", "url": SITE + f"/blog/{rubro}/", "inLanguage": "es-BO"})}
    return meta, body


def read_pages():
    pages = []
    for name in sorted(os.listdir(SRC)):
        if not name.endswith(".html"):
            continue
        raw = open(os.path.join(SRC, name), encoding="utf8").read()
        m = re.match(r"\s*<!--(\{.*?\})-->\s*", raw, re.S)
        if not m:
            sys.exit(f"{name}: falta el comentario de metadatos")
        meta = json.loads(m.group(1))
        pages.append((meta, include(raw[m.end():])))
    return pages


def out_file(path):
    return "404.html" if path == "/404.html" else path.strip("/") + ("/" if path != "/" else "") + "index.html"


def relativize(html, page_path):
    """Convierte enlaces /x/ en rutas relativas a archivos para la vista previa."""
    depth = 0 if page_path in ("/", "/404.html") else page_path.strip("/").count("/") + 1
    up = "../" * depth

    def fix(m):
        attr, url = m.group(1), m.group(2)
        if url.startswith("//") or not url.startswith("/"):
            return m.group(0)
        path, _, rest = url.partition("?")
        path, _, frag = path.partition("#")
        target = path.lstrip("/")
        if target == "" or target.endswith("/"):
            target += "index.html"
        new = up + target + (("?" + rest) if rest else "") + (("#" + frag) if frag else "")
        return f'{attr}="{new}"'
    return re.sub(r'(href|src)="([^"]*)"', fix, html)


def build():
    pages = read_pages()
    raw_posts = read_posts()
    if raw_posts:
        metas = [m for m, _ in raw_posts]
        pages = [p for p in pages if p[0]["path"] != "/blog/"]
        pages.append(render_blog_index(metas))
        for r in RUBROS:
            if any(m["rubro"] == r for m in metas):
                pages.append(render_rubro_index(r, metas))
        for m, b in raw_posts:
            pages.append((m, include(render_post(m, b, metas))))
    for target in ("dist", "preview"):
        d = os.path.join(ROOT, target)
        shutil.rmtree(d, ignore_errors=True)
        shutil.copytree(ASSETS, os.path.join(d, "assets"))
        if target == "dist" and BASE:
            mf = os.path.join(d, "assets", "site.webmanifest")
            txt = open(mf, encoding="utf8").read()
            open(mf, "w", encoding="utf8").write(txt.replace('"/assets/', f'"{BASE}/assets/').replace('"start_url":"/"', f'"start_url":"{BASE}/"'))
        for meta, body in pages:
            body = re.sub(r"<table(?![^>]*class=\"nowrap\")", '<div class="tscroll"><table', body).replace("</table>", "</table></div>")
            html = layout(meta, body)
            if target == "dist" and BASE:
                html = re.sub(r'(href|src|content)="/(?!/)', lambda m: f'{m.group(1)}="{BASE}/', html)
                html = re.sub(r'url\(/(?!/)', f'url({BASE}/', html)
                html = html.replace(f'{SITE}{BASE}{BASE}/', f'{SITE}{BASE}/')
            if target == "preview":
                html = relativize(html, meta["path"])
                if meta["path"] == "/":
                    # la página principal de la vista previa se publica sin esqueleto propio
                    html = re.sub(r'<!doctype html>|</?html[^>]*>|</?head>|</?body>|<meta charset="utf-8">|<meta name="viewport"[^>]*>', "", html)
            f = os.path.join(d, out_file(meta["path"]))
            os.makedirs(os.path.dirname(f), exist_ok=True)
            open(f, "w", encoding="utf8").write(html)
    urls = "".join(f"<url><loc>{SITE}{BASE}{m['path']}</loc></url>" for m, _ in pages if not m.get("noindex"))
    open(os.path.join(ROOT, "dist", "sitemap.xml"), "w").write(
        f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>')
    open(os.path.join(ROOT, "dist", "robots.txt"), "w").write(f"User-agent: *\nAllow: /\nSitemap: {SITE}{BASE}/sitemap.xml\n")
    print("ok:", ", ".join(m["path"] for m, _ in pages))


if __name__ == "__main__":
    build()
