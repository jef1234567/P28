#!/usr/bin/env node
/* Test de fumée de la webapp P28 (index.html, monofichier) – Playwright (Node), Chromium, file://.
   Parcourt tous les modules et onglets, en français et en anglais, sans puis avec l'exemple VIENNE,
   en PC (1366x768) et smartphone (390x844) ; vérifie l'absence d'erreur JavaScript, le calcul de la
   matrice de décision et l'absence de texte français non traduit en anglais (hors exemple VIENNE).
   Exécution : node tests/test_app.js   (code retour 0 si tout est OK) */
const {chromium}=require("playwright");const path=require("path");
const URL="file://"+path.resolve(__dirname,"..","index.html");const FR=/[éèàùâêîôûç]/;
(async()=>{const fails=new Set();const b=await chromium.launch();
for(const lang of ["fr","en"])for(const vp of [{width:1366,height:768},{width:390,height:844}]){
 const ctx=await b.newContext({viewport:vp});await ctx.addInitScript(l=>{try{localStorage.setItem("app28-esorsem-lang",l)}catch(e){}},lang);
 const p=await ctx.newPage();p.on("pageerror",e=>fails.add(`${lang} ${vp.width}px: ${e.message}`));await p.goto(URL);
 const ids=await p.evaluate(()=>M.map(m=>m.id));
 for(const demo of [false,true]){if(demo)await p.evaluate(()=>setDemo(true));
  for(const i of ids)for(const t of ["c","e","a"]){await p.evaluate(([i,t])=>go(i,t),[i,t]);
   if(lang==="en"&&!demo){const bad=(await p.innerText("#main")).split("\n").filter(l=>FR.test(l)&&!/French/.test(l));if(bad.length)fails.add(`${lang} ${i}/${t}: non traduit : ${bad[0].slice(0,80)}`);}}}
 await p.evaluate(()=>go("s5","a"));if(!(await p.innerText("[data-chart=dm]")).includes("◀"))fails.add(`${lang}: matrice de décision sans résultat`);
 await ctx.close();}
await b.close();[...fails].sort().forEach(f=>console.log("ÉCHEC",f));console.log(fails.size?`${fails.size} échec(s)`:"OK");process.exit(fails.size?1:0);})();
