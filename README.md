# outperform.business

Sitio estático de Outperform Partners. Se construye con `python3 build.py` (sin dependencias) y se despliega solo al hacer push a `main`.

- `src/*.html`: páginas (comentario JSON de metadatos + contenido del `<main>`).
- `src/blog/<rubro>/<slug>.html`: posts del blog (ver `research/BRIEF_REDACCION.md`).
- `src/_partials/`: fragmentos reutilizables (`{{include:nombre}}`).
- `assets/`: CSS, JS e imágenes.
- `dist/`: salida para producción (generada, no se versiona).
- `research/`: investigación por rubro y brief de redacción.
- `AUDIT.md`: notas de cada versión.
