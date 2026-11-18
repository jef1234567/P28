"""Assemble index.html (single file, offline) from src/app.html + src/logo.webp."""
import base64, pathlib
root = pathlib.Path(__file__).parent
logo = base64.b64encode((root/"src/logo.webp").read_bytes()).decode()
html = (root/"src/app.html").read_text(encoding="utf-8").replace("__LOGO__", logo)
import json
I = {}
for jf in sorted((root/"src/i18n").glob("*.json")):
    I[jf.stem] = json.loads(jf.read_text(encoding="utf-8"))
i18n = (root/"src/i18n.js").read_text(encoding="utf-8").replace("/*__I18N__*/{}", json.dumps(I, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/"))
html = html.replace("/*__i18n.js__*/", i18n)
for f in ["demo.js", "app28.js"]:
    p = root/"src"/f
    if p.exists():
        html = html.replace(f"/*__{f}__*/", p.read_text(encoding="utf-8"))
(root/"index.html").write_text(html, encoding="utf-8")
print("index.html", len(html), "octets")
