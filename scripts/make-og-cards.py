#!/usr/bin/env python3
"""Render the 1200x630 social share cards from HTML via headless Chrome."""
import base64, pathlib, subprocess, sys

ROOT = pathlib.Path("/Users/Zach/Github_Projects/entergreat313")
SCRATCH = pathlib.Path(__file__).parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

font = (ROOT / "node_modules/@fontsource-variable/libre-franklin/files"
        "/libre-franklin-latin-wght-normal.woff2").read_bytes()
FONT_B64 = base64.b64encode(font).decode()

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{
  font-family: 'Libre Franklin';
  src: url(data:font/woff2;base64,{font}) format('woff2-variations');
  font-weight: 100 900;
}}
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{
  width:1200px; height:630px; background:#022c22;
  font-family:'Libre Franklin', system-ui, sans-serif;
  display:flex; flex-direction:column; justify-content:space-between;
  padding:66px 72px; overflow:hidden; position:relative;
}}
/* thin accent rule along the top, matching the site's emerald border language */
body::before {{
  content:''; position:absolute; top:0; left:0; right:0; height:10px;
  background:#6ee7b7;
}}
.wordmark {{ font-size:30px; font-weight:800; color:#ffffff; letter-spacing:-0.01em; }}
.wordmark span {{ color:#6ee7b7; }}
h1 {{
  font-size:{size}px; font-weight:800; color:#ffffff;
  line-height:1.06; letter-spacing:-0.028em; max-width:1010px;
}}
p {{
  margin-top:26px; font-size:33px; font-weight:400; color:#a7f3d0;
  line-height:1.36; max-width:900px;
}}
.foot {{ font-size:25px; font-weight:600; color:#6ee7b7; }}
</style></head><body>
  <div class="wordmark">Enter-Great <span>313</span></div>
  <div>
    <h1>{headline}</h1>
    <p>{sub}</p>
  </div>
  <div class="foot">enter-great.org</div>
</body></html>"""

CARDS = [
    ("og-resume.png", 92,
     "Build your&nbsp;resume.",
     "The work you did inside counts. Free, private, and nothing you type leaves your phone."),
    ("og-letters.png", 82,
     "Write a letter that gets&nbsp;read.",
     "Parole boards discount form letters. This one is yours, in your own words."),
]

for name, size, headline, sub in CARDS:
    html_path = SCRATCH / name.replace(".png", ".html")
    html_path.write_text(TEMPLATE.format(font=FONT_B64, size=size, headline=headline, sub=sub))
    out = ROOT / "public" / name
    subprocess.run([
        CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
        "--force-device-scale-factor=1", "--window-size=1200,630",
        f"--screenshot={out}", f"file://{html_path}",
    ], check=True, capture_output=True)
    print(f"wrote {out}")
