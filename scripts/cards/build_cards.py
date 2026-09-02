#!/usr/bin/env python3
"""
Monday Morning digital business cards.

Generates a static, on-brand mobile card per staff member into
`public/card/<slug>/` (index.html + card.vcf + qr.png), so each lives at
mondaymorning-af.com/card/<slug> and ships with the site (no separate host).

Edit CARDS below and re-run:  python3 scripts/cards/build_cards.py
Only dependency: Pillow + qrcode  ->  pip3 install qrcode pillow
"""
import os, html, qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(REPO, "public", "card")
LOGO = os.path.join(REPO, "public", "logo.png")
BASE = "https://mondaymorning-af.com/card"
LOGO_URL = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files/monday-morning-email-signature-logo.png"

FOREST = (42, 84, 63); CREAM = (255, 246, 229)

# One entry per person. `mobile` is the personal cell (omit -> Call/Text use the
# shop line). `shop` is always the Google shop number.
CARDS = [
    {
        "slug": "zane", "name": "Zane Curtis", "title": "Founder & CEO",
        "email": "zane@mondaymorning-af.com", "mobile": "+16198218779",
        "shop": "+18584123253", "web": "mondaymorning-af.com",
    },
    {
        "slug": "matt", "name": "Matt Brown", "title": "Sales Manager",
        "email": "sales@mondaymorning-af.com", "mobile": None,
        "shop": "+18584123253", "web": "mondaymorning-af.com",
    },
]

def pretty(tel: str) -> str:
    d = "".join(c for c in tel if c.isdigit())[-10:]
    return f"({d[0:3]}) {d[3:6]}-{d[6:]}" if len(d) == 10 else tel

def vcard(c) -> str:
    first, *rest = c["name"].split(" ")
    last = " ".join(rest)
    lines = [
        "BEGIN:VCARD", "VERSION:3.0",
        f"N:{last};{first};;;", f"FN:{c['name']}",
        "ORG:Monday Morning", f"TITLE:{c['title']}",
    ]
    if c.get("mobile"):
        lines.append(f"TEL;TYPE=CELL,VOICE:{c['mobile']}")
    lines.append(f"TEL;TYPE=WORK,VOICE:{c['shop']}")
    lines += [f"EMAIL;TYPE=INTERNET,WORK:{c['email']}", f"URL:https://{c['web']}", "END:VCARD"]
    return "\r\n".join(lines) + "\r\n"

def qr_png(url: str, path: str):
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=28, border=3)
    qr.add_data(url); qr.make(fit=True)
    img = qr.make_image(fill_color=FOREST, back_color=CREAM).convert("RGBA")
    W = img.size[0]
    logo = Image.open(LOGO).convert("RGBA")
    lw, lh = logo.size
    bbox = logo.crop((0, 0, lw, int(lh * 0.52))).getbbox()
    sun = logo.crop(bbox)
    t = int(W * 0.20)
    sun = sun.resize((t, int(t * sun.height / sun.width)), Image.LANCZOS)
    plate = int(W * 0.28)
    pl = Image.new("RGBA", (plate, plate), (0, 0, 0, 0))
    ImageDraw.Draw(pl).rounded_rectangle([0, 0, plate - 1, plate - 1], radius=int(plate * 0.22), fill=CREAM + (255,))
    pl.alpha_composite(sun, ((plate - sun.width) // 2, (plate - sun.height) // 2))
    img.alpha_composite(pl, ((W - plate) // 2, (W - plate) // 2))
    img.convert("RGB").save(path, "PNG")

def call_target(c):
    return (c["mobile"] or c["shop"])

def page(c) -> str:
    e = html.escape
    tel = call_target(c)
    call_disp = pretty(tel)
    email_short = c["email"].split("@")[0] + "@…af.com"
    show_shop = bool(c.get("mobile"))  # only a separate shop line when Call uses a cell
    shop_block = f"""
        <a class="btn wide" href="tel:{c['shop']}">
          <span class="ico">&#127978;</span>
          <span class="col"><span class="lbl">Bottle shop</span><span class="val">{pretty(c['shop'])}</span></span>
        </a>""" if show_shop else ""
    return f"""<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{e(c['name'])} · Monday Morning</title>
<meta name="description" content="{e(c['name'])}, {e(c['title'])} at Monday Morning. Save my contact." />
<meta name="theme-color" content="#2A543F" />
<meta property="og:title" content="{e(c['name'])} · Monday Morning" />
<meta property="og:description" content="{e(c['title'])}. Tap to save my contact." />
<meta property="og:image" content="{LOGO_URL}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
<style>
  :root {{ --forest:#2A543F; --forest-deep:#173527; --cream:#FFF6E5; --sand:#E8DECF; --gold:#E2A325; --ink:#173527; }}
  * {{ box-sizing:border-box; -webkit-tap-highlight-color:transparent; }}
  html,body {{ margin:0; }}
  body {{ font-family:"DM Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif; color:var(--ink);
    background:radial-gradient(120% 60% at 50% -10%, #35664c 0%, var(--forest) 42%, var(--forest-deep) 100%);
    min-height:100svh; display:flex; align-items:flex-start; justify-content:center;
    padding:max(20px,env(safe-area-inset-top)) 16px calc(28px + env(safe-area-inset-bottom)); }}
  .card {{ width:100%; max-width:430px; margin-top:6vh; background:var(--cream); border-radius:26px;
    box-shadow:0 24px 60px rgba(0,0,0,.28),0 2px 0 rgba(255,255,255,.15) inset; overflow:hidden; }}
  .top {{ background:var(--forest); padding:30px 24px 26px; text-align:center; }}
  .top img {{ height:40px; width:auto; filter:brightness(0) invert(1); opacity:.96; }}
  .name {{ font-family:"DM Serif Display",Georgia,serif; color:var(--cream); font-size:34px; line-height:1.05; margin:16px 0 6px; }}
  .title {{ color:#d9e6dd; font-size:13.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; }}
  .org {{ color:var(--gold); font-size:13.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; margin-top:3px; }}
  .tag {{ font-family:"DM Serif Display",Georgia,serif; font-style:italic; color:#cfe0d4; font-size:15px; margin-top:14px; }}
  .body {{ padding:20px 18px 24px; }}
  .save {{ display:flex; align-items:center; justify-content:center; gap:10px; width:100%; border:0; cursor:pointer;
    background:var(--forest); color:var(--cream); font-family:inherit; font-size:16px; font-weight:700;
    padding:16px; border-radius:15px; text-decoration:none; box-shadow:0 8px 20px rgba(42,84,63,.28); }}
  .save:active {{ transform:translateY(1px); }}
  .grid {{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:12px; }}
  .btn {{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; text-decoration:none;
    color:var(--ink); background:#fff; border:1.5px solid rgba(42,84,63,.16); border-radius:15px; padding:15px 8px; min-height:76px; }}
  .btn:active {{ background:var(--sand); border-color:rgba(42,84,63,.4); }}
  .btn .ico {{ font-size:21px; line-height:1; }}
  .btn .lbl {{ font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:#46614f; }}
  .btn .val {{ font-size:12.5px; color:#6b7d70; margin-top:-2px; }}
  .wide {{ grid-column:1/-1; flex-direction:row; gap:10px; min-height:58px; }}
  .wide .col {{ display:flex; flex-direction:column; align-items:flex-start; }}
  .wide .val {{ margin-top:0; }}
  .qrbtn {{ display:block; width:100%; margin-top:12px; background:none; border:0; cursor:pointer;
    color:#46614f; font-family:inherit; font-size:13px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:8px; }}
  .foot {{ text-align:center; color:#7c8a80; font-size:11px; letter-spacing:.14em; text-transform:uppercase; margin-top:16px; }}
  .sheet {{ position:fixed; inset:0; background:rgba(23,53,39,.94); display:none; align-items:center; justify-content:center;
    flex-direction:column; gap:22px; padding:24px; z-index:9; }}
  .sheet.on {{ display:flex; }}
  .sheet img {{ width:min(74vw,320px); height:auto; border-radius:20px; background:var(--cream); padding:14px; }}
  .sheet .who {{ font-family:"DM Serif Display",Georgia,serif; color:var(--cream); font-size:22px; }}
  .sheet .x {{ color:#cfe0d4; font-size:13px; letter-spacing:.1em; text-transform:uppercase; }}
</style>
</head>
<body>
  <main class="card">
    <div class="top">
      <img src="{LOGO_URL}" alt="Monday Morning" />
      <h1 class="name">{e(c['name'])}</h1>
      <div class="title">{e(c['title'])}</div>
      <div class="org">Monday Morning</div>
      <div class="tag">Drink Differently. Live Free AF.</div>
    </div>
    <div class="body">
      <a class="save" href="/card/{c['slug']}/card.vcf" download="{e(c['name'].replace(' ','-'))}.vcf"><span class="ico">&#128229;</span> Save my contact</a>
      <div class="grid">
        <a class="btn" href="tel:{tel}"><span class="ico">&#128222;</span><span class="lbl">Call</span><span class="val">{call_disp}</span></a>
        <a class="btn" href="sms:{tel}"><span class="ico">&#128172;</span><span class="lbl">Text</span><span class="val">{call_disp}</span></a>
        <a class="btn" href="mailto:{c['email']}"><span class="ico">&#9993;&#65039;</span><span class="lbl">Email</span><span class="val">{e(email_short)}</span></a>
        <a class="btn" href="https://{c['web']}" target="_blank" rel="noopener"><span class="ico">&#127760;</span><span class="lbl">Website</span><span class="val">{e(c['web'])}</span></a>{shop_block}
      </div>
      <button class="qrbtn" onclick="document.getElementById('qr').classList.add('on')">&#9633; Show my QR</button>
      <div class="foot">Bottle Shops · Hospitality · Brewing</div>
    </div>
  </main>
  <div class="sheet" id="qr" onclick="this.classList.remove('on')">
    <div class="who">{e(c['name'])}</div>
    <img src="/card/{c['slug']}/qr.png" alt="Scan to open this card" />
    <div class="x">Tap anywhere to close</div>
  </div>
</body></html>
"""

def main():
    for c in CARDS:
        d = os.path.join(OUT, c["slug"]); os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w") as f: f.write(page(c))
        with open(os.path.join(d, "card.vcf"), "w", newline="") as f: f.write(vcard(c))
        qr_png(f"{BASE}/{c['slug']}/", os.path.join(d, "qr.png"))
        print("built", f"{BASE}/{c['slug']}/")

if __name__ == "__main__":
    main()
