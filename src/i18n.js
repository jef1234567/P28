/* ============ LANGUES (i18n) ============
   Le français est la langue source. Les dictionnaires src/i18n/<langue>.json (texte français exact -> traduction)
   sont injectés au build. La traduction se fait à l'affichage : chaque nœud texte et les attributs
   placeholder / title / aria-label / alt sont traduits par recherche exacte (nombres remplacés par {n}).
   Les valeurs saisies et enregistrées restent inchangées : changer de langue ne touche pas aux travaux. */
const LANGS={fr:"Français",en:"English",it:"Italiano",es:"Español",ar:"العربية",de:"Deutsch"};
const LANG_KEY="app28-esorsem-lang";
const I18N=/*__I18N__*/{};
let LANG=(()=>{try{const l=localStorage.getItem(LANG_KEY);return LANGS[l]?l:"fr";}catch(e){return "fr";}})();
if(LANG!=="fr"&&!I18N[LANG])LANG="fr";
document.documentElement.lang=LANG;if(LANG==="ar")document.documentElement.classList.add("rtl");
function tr(s){
  if(LANG==="fr"||typeof s!=="string")return s;
  const D=I18N[LANG],m=s.match(/^(\s*)([\s\S]*?)(\s*)$/),core=m[2];
  if(!core)return s;
  let r=D[core];
  if(r==null){const nums=[];const k=core.replace(/\d+(?:[.,]\d+)?/g,x=>{nums.push(x);return "{n}";});
    if(nums.length&&D[k]!=null){let i=0;r=D[k].replace(/\{n\}/g,()=>nums[i++]??"");}}
  if(r==null)r=trParts(core);
  return r==null?s:m[1]+r+m[3];
}
/* Textes composés à l'affichage (« 3. question », « Phase 2 – titre · référence ») : traduction par morceaux */
const TR_SEPS=[" · "," – "," → "," ; "," : "];
function trParts(c){
  const D=I18N[LANG];const one=x=>{if(!x.trim()||!/[A-Za-zÀ-ÿ]/.test(x))return x;if(D[x]!=null)return D[x];
    const nums=[];const k=x.replace(/\d+(?:[.,]\d+)?/g,y=>{nums.push(y);return "{n}";});if(nums.length&&D[k]!=null){let i=0;return D[k].replace(/\{n\}/g,()=>nums[i++]??"");}return null;};
  const p=c.match(/^([\d.()]+\s+|[★▶✓✗•]\s*)([\s\S]+)$/);if(p){const r=one(p[2])??trParts(p[2]);if(r!=null)return p[1]+r;}
  for(const sp of TR_SEPS){if(!c.includes(sp))continue;const parts=c.split(sp);let hit=0;
    const out=parts.map(x=>{const r=one(x)??trParts(x);if(r!=null&&r!==x)hit++;return r??x;});if(hit)return out.join(sp);}
  return null;
}
const TR_ATTRS=["placeholder","title","aria-label","alt","data-l"],TR_SET=new WeakMap();
function trEl(el){for(const a of TR_ATTRS){const v=el.getAttribute&&el.getAttribute(a);if(v){const t=tr(v);if(t!==v)el.setAttribute(a,t);}}}
function trNode(root){
  if(LANG==="fr"||!root)return;
  if(root.nodeType===3){const v=root.nodeValue;if(v.trim()&&TR_SET.get(root)!==v){const p=root.parentNode;if(p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName))return;const t=tr(v);if(t!==v){TR_SET.set(root,t);root.nodeValue=t;}}return;}
  if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
  if(root.nodeType===1){if(/^(SCRIPT|STYLE|TEXTAREA)$/.test(root.nodeName))return;trEl(root);}
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while((n=w.nextNode()))L.push(n);L.forEach(trNode);
  if(root.querySelectorAll)root.querySelectorAll("[placeholder],[title],[aria-label],[alt],[data-l]").forEach(trEl);
}
function trHTML(h){if(LANG==="fr")return h;const d=new DOMParser().parseFromString(h,"text/html");trNode(d.body);if(d.title)d.title=tr(d.title);return "<!DOCTYPE html>"+d.documentElement.outerHTML;}
if(LANG!=="fr"){
  new MutationObserver(ms=>{for(const m of ms){
    if(m.type==="childList")m.addedNodes.forEach(trNode);
    else if(m.type==="characterData")trNode(m.target);
    else if(m.type==="attributes")trEl(m.target);}})
  .observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:TR_ATTRS});
  addEventListener("DOMContentLoaded",()=>{trNode(document.body);document.title=tr(document.title);});
}
function setLang(l){try{localStorage.setItem(LANG_KEY,l);}catch(e){}location.reload();}
function openSettings(){
  const opts=Object.entries(LANGS).filter(([k])=>k==="fr"||I18N[k]).map(([k,v])=>`<option value="${k}" ${k===LANG?"selected":""}>${v}</option>`).join("");
  openModal(`<h2>Paramètres</h2><div class="field"><label for="langSel">Langue / Language</label><select id="langSel" onchange="setLang(this.value)">${opts}</select></div>`+
  `<p class="ref">Traduction en cours de relecture : la terminologie doctrinale peut différer des documents officiels, qui seuls font foi. Tes travaux enregistrés ne changent pas de langue.</p>`);
}
