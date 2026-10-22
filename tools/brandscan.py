"""Busca la marca anterior en el sitio publicado: páginas del sitemap, assets enlazados (JS, CSS, manifest) y texto de los PDF.
Uso: python3 tools/brandscan.py [https://mezzita.com]"""
import re, sys, zlib, urllib.request
from urllib.parse import urljoin

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://mezzita.com").rstrip("/")
OLD = re.compile(rb"outperform", re.I)
NEW = re.compile(rb"mezzita", re.I)

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "brandscan"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

def pdf_text(data):
    out = [data]
    for m in re.finditer(rb"stream\r?\n(.*?)\r?\nendstream", data, re.S):
        try:
            out.append(zlib.decompress(m.group(1)))
        except zlib.error:
            pass
    return b"\n".join(out)

pages = [BASE + re.sub(r"^https?://[^/]+", "", u) for u in re.findall(r"<loc>([^<]+)</loc>", get(BASE + "/sitemap.xml").decode())]
pages += [BASE + "/404.html", BASE + "/sitemap.xml", BASE + "/robots.txt"]
assets, hits, no_brand = set(), [], []
for url in pages:
    html = get(url)
    if OLD.search(html):
        hits.append(url)
    if url.endswith("/") and not NEW.search(html):
        no_brand.append(url)
    for ref in re.findall(rb'(?:src|href)="(/[^"#?]+\.(?:js|css|webmanifest|pdf|svg))"', html):
        assets.add(urljoin(BASE, ref.decode()))
for url in sorted(assets):
    data = get(url)
    if url.endswith(".pdf"):
        data = pdf_text(data)
    if OLD.search(data):
        hits.append(url)
print(f"{len(pages)} páginas, {len(assets)} assets revisados")
print("con 'Outperform':", hits or "ninguno")
print("páginas sin 'Mezzita':", no_brand or "ninguna")
