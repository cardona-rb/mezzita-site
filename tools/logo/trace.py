import numpy as np, subprocess, re, sys
from PIL import Image
from collections import deque
im = np.asarray(Image.open("logo-src.jpg").convert("RGB")).astype(int)
H, W, _ = im.shape
r, g, b = im[...,0], im[...,1], im[...,2]
lum = .299*r + .587*g + .114*b
sat = im.max(axis=2) - im.min(axis=2)
red0 = (r > 140) & (r - g > 90) & (b < 110)
dark = (lum < 120) & (sat < 70) & ~red0
red = (r > 140) & (r - g > 90) & (b < 110)
yellow = (r > 200) & (g > 140) & (g - b > 70) & ~red
peach = (r > 225) & (r - b > 45) & (g > 175) & ~yellow & ~red
light = ~(dark | red | yellow | peach)
# relleno blanco del gorro: zonas claras encerradas (no alcanzables desde el borde), solo dentro del área del gorro
seen = np.zeros((H, W), bool); q = deque()
for x in range(W):
    for y in (0, H-1):
        if light[y, x]: seen[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W-1):
        if light[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y+dy, x+dx
        if 0 <= ny < H and 0 <= nx < W and light[ny, nx] and not seen[ny, nx]:
            seen[ny, nx] = True; q.append((ny, nx))
hatfill = light & ~seen
hatfill[:, 600:] = False; hatfill[520:, :] = False
cols = {}
for name, m in (("dark", dark), ("red", red), ("yellow", yellow), ("peach", peach)):
    px = im[m]; cols[name] = "#%02X%02X%02X" % tuple(np.median(px, axis=0).astype(int)) if len(px) else None
cols["hat"] = "#FFF8EC"
print(cols, file=sys.stderr)
def trace(mask, name):
    Image.fromarray((~mask).astype(np.uint8)*255).convert("1").save(f"m-{name}.pbm")
    subprocess.run(["potrace", f"m-{name}.pbm", "-b", "svg", "--flat", "-t", "6", "-a", "1.0", "-O", "0.3", "-o", f"m-{name}.svg"], check=True)
    s = open(f"m-{name}.svg").read()
    tr = re.search(r'<g transform="([^"]+)"', s).group(1)
    d = " ".join(re.findall(r'<path d="([^"]+)"', s))
    return tr, d
region = np.zeros((H, W), bool); region[:, :688] = True; region[:470, :760] = True
def build(reg, key):
    out = []
    for name, m in (("hat", hatfill), ("peach", peach), ("red", red), ("yellow", yellow), ("dark", dark)):
        tr, d = trace(m & reg, name + key)
        if d.strip(): out.append((name, tr, d))
    ys, xs = np.where((~light | hatfill) & reg)
    pad = 8; bx0, bx1, by0, by1 = xs.min()-pad, xs.max()+pad, ys.min()-pad, ys.max()+pad
    body = "".join(f'<path fill="{cols[n]}" transform="{tr}" d="{d}"/>' for n, tr, d in out)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{bx0} {by0} {bx1-bx0} {by1-by0}">{body}</svg>'
open("logo.svg","w").write(build(np.ones((H, W), bool), "-all"))
open("logo-mark.svg","w").write(build(region, "-mark"))
print("done")
