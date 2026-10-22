"""Reemplazo de marca Outperform -> Mezzita (una sola vez, 2026-10-22)."""
import pathlib, re, sys

root = pathlib.Path(sys.argv[1])
pairs = [
    ("Equipo Outperform Partners", "Equipo Mezzita"),
    ("outperform.business", "mezzita.com"),
    ("checklist-outperform.pdf", "checklist-mezzita.pdf"),
    ("contrato-modelo-outperform.pdf", "contrato-modelo-mezzita.pdf"),
    ("/home/user/outperform-site", "mezzita-site"),
    ("/outperform-site", "/mezzita-site"),
    ("Outperform Partners", "Mezzita"),
    ("OUTPERFORM", "MEZZITA"),
    ("Outperform", "Mezzita"),
]
exts = {".html", ".js", ".css", ".md", ".webmanifest", ".json"}
targets = [p for d in ("src", "assets", "research") for p in (root / d).rglob("*") if p.suffix in exts]
targets += [root / f for f in ("build.py", "README.md", "deploy.env", "research_demand.md")]
total = 0
for p in targets:
    if not p.is_file():
        continue
    s = p.read_text(encoding="utf-8")
    o = s
    for a, b in pairs:
        s = s.replace(a, b)
    if s != o:
        total += sum(o.count(a) for a, _ in pairs)
        p.write_text(s, encoding="utf-8")
print("replacements", total)
print("left:", [str(p) for p in targets if p.is_file() and re.search("outperform", p.read_text(encoding="utf-8"), re.I)])
