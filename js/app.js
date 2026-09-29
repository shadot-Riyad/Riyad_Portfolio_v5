/* =====================================================================
   ⚙️ SITE LOGIC — এই ফাইলে সাধারণত হাত দিতে হবে না
   ✅ পরিবর্তন করবে: লেখা/লিংক/ছবি সব js/data.js এ
   🚫 এই ফাইল edit করবে না, যদি না কোডের কাজ বদলাতে চাও
   ===================================================================== */

/* ===== 1. HELPERS (ছোট সাহায্যকারী ফাংশন) ===== */
const $=s=>document.querySelector(s);
// ✅ esc: লেখার ভেতরের < > & " ' কে নিরাপদ করে (সাইট ভাঙা/XSS আটকাতে)
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// নিচে ছোট বার্তা (toast) দেখায়
const toast=m=>{const t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display="none",2800)};

/* ===== 2. RENDER (data.js থেকে পেজ সাজানো) ===== */
// ✅ Navbar ও footer এর <Riyad/> লোগো (লিংক index.html এ #home দেওয়া আছে)
$("#logo").textContent="<"+D.name+"/>";$("#flogo").textContent="<"+D.name+"/>";
$("#hname").textContent=D.name;$("#tag").textContent=D.tagline;$("#bio").textContent=D.bio;
$("#foot").textContent="© "+new Date().getFullYear()+" "+D.name+" • Quality assured with 💜✨";
// ছবি থাকলে ছবি, না থাকলে fallback (emoji/অক্ষর)
const img=(s,f)=>s?`<img src="${esc(s)}" alt="${esc(D.name)}">`:f;
$("#pic").innerHTML=img(D.photo,D.name[0]);
$("#story").innerHTML=D.story.map((x,i)=>`<div class="ab rv"><div class="im">${img(x.img,x.e)}</div><div><span class="n">0${i+1}</span><h3 class="g">${esc(x.h)}</h3><p class="mut">${esc(x.p)}</p></div></div>`).join("");

/* Quote (দিন অনুযায়ী auto বদলায়) */
const showQ=q=>{["dq","aq"].forEach(k=>{$("#"+k+"t").textContent="“"+q[0]+"”";$("#"+k+"a").textContent=q[1]?"— "+q[1]:""})};
showQ(D.quoteOfDay?[D.quoteOfDay,""]:D.quotes[Math.floor(Date.now()/864e5)%D.quotes.length]);
$("#nq").onclick=()=>showQ(D.quotes[Math.floor(Math.random()*D.quotes.length)]);

/* Demo projects — hide:true দেওয়া গুলো লুকানো থাকবে, b (badge) থাকলে ছোট ট্যাগ দেখাবে */
$("#dlist").innerHTML=D.demos.filter(d=>!d.hide).map(d=>`<a class="card demo" href="${esc(d.u)}" target="_blank" rel="noopener">${d.b?`<span class="dbadge">${esc(d.b)}</span>`:""}<span class="em">${d.e}</span><b>${esc(d.t)}</b><span class="mut">${esc(d.d)}</span><p style="color:var(--pri);font-weight:700;margin-top:8px">Open Demo ↗</p></a>`).join("");

/* Certificates */
$("#certs").innerHTML=D.certs.map(c=>`<div class="card cert"><div class="ci">${img(c.img,"🏆")}</div><h3>${esc(c.t)}</h3><p class="g" style="font-weight:700">${esc(c.o)}</p><small class="mut">${esc(c.d)}</small>${c.link?`<p><a href="${esc(c.link)}" target="_blank" rel="noopener" style="color:var(--pri)">Verify →</a></p>`:""}</div>`).join("");
$("#ftag").textContent=D.tagline;$("#fmail").textContent=D.email;$("#fmail").href="mailto:"+D.email;

/* ===== 3. SOCIAL ICONS (SVG; currentColor = সাইটের রঙের সাথে মিলে যায়) ===== */
const IC={
 linkedin:'<text x="12" y="17" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">in</text><rect x="2.5" y="2.5" width="19" height="19" rx="5"/>',
 facebook:'<text x="12.5" y="19" text-anchor="middle" font-size="19" font-weight="800" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">f</text><rect x="2.5" y="2.5" width="19" height="19" rx="5"/>',
 x:'<path d="M5 4l14 16M19 4L5 20" stroke-width="2.4"/>',
 // 🐙 GitHub: আসল Octocat লোগো (সব জায়গায় — hero, contact, footer, project modal)
 github:'<g transform="translate(2 2) scale(1.25)" fill="currentColor" stroke="none"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></g>',
 youtube:'<rect x="2" y="5" width="20" height="14" rx="5"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
 instagram:'<rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>',
 telegram:'<path d="M21 4L3 11l6 2 2 6 3-4 5 4z" stroke-linejoin="round"/><path d="M9 13l12-9"/>',
 whatsapp:'<path d="M4 20l1.5-4.5A8.5 8.5 0 1 1 8.5 18.5z"/><path d="M9 8c0 4 3 7 7 7l1-2.5-2.5-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2.5z" fill="currentColor" stroke="none"/>',
 email:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
 web:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
};
const ik=n=>/linkedin/i.test(n)?"linkedin":/github/i.test(n)?"github":/facebook/i.test(n)?"facebook":/twitter|^x$|^x\b/i.test(n)?"x":/youtube/i.test(n)?"youtube":/insta/i.test(n)?"instagram":/telegram/i.test(n)?"telegram":/whats/i.test(n)?"whatsapp":/mail/i.test(n)?"email":"web";
const svg=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[ik(n)]}</svg>`;
const sl=(l,lab)=>l.map(([n,u])=>`<a href="${esc(u)}" ${u.startsWith("mailto")?"":'target="_blank" rel="noopener"'} title="${esc(n)}" aria-label="${esc(n)}">${svg(n)}${lab?esc(n):""}</a>`).join("");
$("#soc1").innerHTML=sl(D.socials,1);$("#soc2").innerHTML=sl(D.socials,1);
$("#soc3").innerHTML=sl([...D.socials,["Email","mailto:"+D.email]],0);

/* Stats ও Skills */
$("#stats").innerHTML=D.stats.map(([n,l])=>`<div class="card stat"><b class="g">${esc(n)}</b><span class="mut">${esc(l)}</span></div>`).join("");
$("#skills").innerHTML=D.skills.map(([n,v])=>{v=Math.max(0,Math.min(100,+v||0));return `<div class="card"><b>${esc(n)}</b> <span class="mut">${v}%</span><div class="bar"><i style="width:${v}%"></i></div></div>`}).join("");

/* ===== 4. TIMELINE (Experience / Course / Education) =====
   ✅ প্রতিটা card এর ডানপাশে ছবির জায়গা থাকে। img দিলে ছবি, না দিলে (বা ছবি load না হলে) emoji দেখায়।
   ✅ link দিলে ছবিতে ক্লিক করলে ওই সাইটে যাবে। nopic:true দিলে ওই card এ ছবির জায়গা থাকবে না। */
const tl=(a,def)=>a.map(x=>{
  let pic="";
  if(!x.nopic){
    const im=x.img?`<img src="${esc(x.img)}" alt="${esc(x.o)}" loading="lazy" onerror="this.remove()">`:"";
    const inner=`<span class="pe">${x.e||def}</span>${im}<span class="go">${x.link?"Visit ↗":""}</span>`;
    pic=x.link?`<a class="tp" href="${esc(x.link)}" target="_blank" rel="noopener" title="Visit ${esc(x.o)}" aria-label="Visit ${esc(x.o)} website">${inner}</a>`:`<div class="tp">${inner}</div>`;
  }
  return `<div class="card${x.nopic?"":" has-pic"}"><div class="tb"><h3>${esc(x.t)}</h3><p class="g" style="font-weight:700">${esc(x.o)}</p><small class="mut">${esc(x.d)}</small><p class="mut">${esc(x.p)}</p></div>${pic}</div>`;
}).join("");
$("#exp").innerHTML=tl(D.exp,"💼");$("#edu").innerHTML=tl(D.edu,"🎓");$("#course").innerHTML=tl(D.course,"📚");

/* ===== 4.1 TO-DO LIST (About পেজ, "What next" এর নিচে) =====
   অগ্রগতি: done = 100%, doing = p (না দিলে 50%), todo = 0% — সবার গড় দিয়ে উপরের বার চলে */
(()=>{
  const L=D.todo||[];if(!L.length)return;
  const lab={done:"Done",doing:"In progress",todo:"Planned"};
  const pct=x=>x.s=="done"?100:x.s=="doing"?Math.max(0,Math.min(100,+x.p||50)):0;
  const done=L.filter(x=>x.s=="done").length,all=Math.round(L.reduce((n,x)=>n+pct(x),0)/L.length);
  const tick='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  $("#todo").innerHTML=`<div class="card todo"><div class="thead"><h3><span class="te">🎯</span> <span class="g">My To-Do List</span></h3><span class="tcount">${done}/${L.length} done</span></div><div class="bar tbar" title="${all}% overall"><i style="width:${all}%"></i></div><ul>${L.map((x,i)=>{const s=lab[x.s]?x.s:"todo";return `<li class="ti s-${s}" style="--d:${.25+i*.12}s"><span class="chk">${s=="done"?tick:""}</span><div class="tt"><b>${esc(x.t)}</b>${x.note?`<small class="mut">${esc(x.note)}</small>`:""}${s=="doing"?`<div class="bar mini"><i style="width:${pct(x)}%"></i></div>`:""}</div><span class="st">${lab[s]}${s=="doing"?" · "+pct(x)+"%":""}</span></li>`}).join("")}</ul></div>`;
})();

/* ===== 4.2 CONTACT INFO CARD (Address / Phone / Email + ছোট ছবি) =====
   মান ফাঁকা থাকলে সারি দেখায় না; photo ফাঁকা থাকলে ছবি লুকায় — layout নিজে adjust হয় */
(()=>{
  const C=D.contact||{},items=(C.items||[]).filter(r=>r&&r[2]);
  if(!items.length&&!C.photo)return;
  const href=r=>{const v=String(r[2]).trim();return r[3]||(v.includes("@")?"mailto:"+v:/^\+?[\d\s()-]{7,}$/.test(v)?"tel:"+v.replace(/[^\d+]/g,""):/^https?:/.test(v)?v:"")};
  const row=r=>{const u=href(r),b=`<span class="ie">${r[0]}</span><span class="it"><small>${esc(r[1])}</small><b>${esc(r[2])}</b></span>`;return u?`<a class="ci" href="${esc(u)}" ${u.startsWith("http")?'target="_blank" rel="noopener"':""}>${b}</a>`:`<div class="ci">${b}</div>`};
  const photo=C.photo?`<div class="cph"><img src="${esc(C.photo)}" alt="${esc(D.name)}" onerror="this.closest('.cph').remove()"></div>`:"";
  $("#cinfo").innerHTML=`<div class="card cinfo">${photo}<div class="cbody"><h3 class="g">${esc(D.name)}</h3><p class="mut">${esc(D.role[0]||"")}</p><div class="cirows">${items.map(row).join("")}</div></div></div>`;
})();

/* ===== 5. QA PROJECTS + MODAL ===== */
$("#plist").innerHTML=D.projects.map((p,i)=>`<div class="card" style="cursor:pointer" data-p="${i}"><h3>${esc(p.title)}</h3><p class="mut">${esc(p.desc)}</p>${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}<p style="margin-top:12px;color:var(--pri);font-weight:700">View QA Artifacts →</p></div>`).join("");

function openP(i){
  const p=D.projects[i];
  // 🐙 GitHub বাটনে এখন আসল GitHub আইকন
  const lk=(p.drive?`<a class="btn o" href="${esc(p.drive)}" target="_blank" rel="noopener">📁 Google Drive</a>`:"")+(p.github?`<a class="btn o gh" href="${esc(p.github)}" target="_blank" rel="noopener">${svg("GitHub")} GitHub</a>`:"");
  const T={
    "Test Plan":()=>`<pre>${esc(p.plan)}</pre>`,
    "Test Cases":()=>`<div class="tw"><table><tr><th>ID</th><th>Title</th><th>Status</th></tr>${p.cases.map(c=>`<tr><td>${esc(c[0])}</td><td>${esc(c[1])}</td><td><span class="pill ${c[2]=="Fail"?"bad":""}">${esc(c[2])}</span></td></tr>`).join("")}</table></div>`,
    "Bug Reports":()=>`<div class="tw"><table><tr><th>ID</th><th>Title</th><th>Severity</th><th>Status</th></tr>${p.bugs.map(b=>`<tr><td>${esc(b[0])}</td><td>${esc(b[1])}</td><td><span class="pill bad">${esc(b[2])}</span></td><td>${esc(b[3])}</td></tr>`).join("")}</table></div>`,
    "Screenshots":()=>`<div class="shots">${(p.shots||[]).map(x=>`<div class="shot"><div class="sc">${x[0]?`<img src="${esc(x[0])}" alt="${esc(x[1])}" onclick="window.open(this.src)" onerror="this.parentNode.textContent='🖼️'">`:"🖼️"}</div><small>${esc(x[1])}</small></div>`).join("")}</div>`,
    "Automation":()=>`<pre>${esc(p.auto)}</pre>`,
    "API Testing":()=>`<pre>${esc(p.api)}</pre>`
  };
  $("#pb").innerHTML=`<div style="display:flex;justify-content:space-between"><h3>${esc(p.title)}</h3><button class="ic" data-close aria-label="Close">✕</button></div><div class="row" style="margin:10px 0 0">${lk}</div><div class="tabs">${Object.keys(T).map((k,j)=>`<button class="${j?"":"on"}">${k}</button>`).join("")}</div><div id="tc">${T["Test Plan"]()}</div>`;
  $("#pb .tabs").onclick=e=>{if(e.target.tagName!="BUTTON")return;[...e.currentTarget.children].forEach(b=>b.classList.remove("on"));e.target.classList.add("on");$("#tc").innerHTML=T[e.target.textContent]()};
  $("#pm").classList.add("on");
}
$("#plist").onclick=e=>{const c=e.target.closest("[data-p]");if(c)openP(c.dataset.p)};
// modal বন্ধ করা (✕ বা বাইরে ক্লিক)
document.addEventListener("click",e=>{if(e.target.hasAttribute("data-close")||e.target.classList.contains("modal"))document.querySelectorAll(".modal").forEach(m=>m.classList.remove("on"))});
addEventListener("keydown",e=>{if(e.key=="Escape")document.querySelectorAll(".modal").forEach(m=>m.classList.remove("on"))});

/* ===== 6. FORMS =====
   📬 Message + CV request  → Formspree (D.formspree)
   📊 Suggestion            → Google Sheet (D.sheetUrl); ফাঁকা থাকলে Formspree এ fallback */
// Formspree এ পাঠায়; সফল না হলে error throw করে
async function toFormspree(fd,subject){
  fd.append("_subject",subject);
  const r=await fetch(D.formspree,{method:"POST",body:fd,headers:{Accept:"application/json"}});
  if(!r.ok)throw new Error("Formspree "+r.status);
}
// Google Apps Script এ পাঠায় (no-cors, তাই response পড়া যায় না; error না হলেই সফল ধরা হয়)
async function toSheet(fd){
  const o=new URLSearchParams();fd.forEach((v,k)=>{if(k!="_gotcha")o.append(k,v)});
  o.append("page",location.href);
  await fetch(D.sheetUrl,{method:"POST",mode:"no-cors",body:o});
}
// সাধারণ submit হ্যান্ডলার: loading → success/error
function wire(formId,doneId,send,okMsg){
  const f=$("#"+formId),d=doneId&&$("#"+doneId);
  f.addEventListener("submit",async e=>{
    e.preventDefault();
    const fd=new FormData(f);
    if(fd.get("_gotcha"))return;                 // 🚫 bot ধরা পড়লে চুপচাপ থামাও
    const b=f.querySelector("button.btn:not(.o)"),t=b.querySelector(".bt")||b,old=t.textContent;
    b.disabled=true;b.classList.add("busy");t.textContent="Sending…";
    try{
      await send(fd);
      f.reset();f.querySelectorAll("textarea").forEach(x=>x.dispatchEvent(new Event("input")));
      if(d){f.hidden=true;d.hidden=false}else{toast(okMsg);document.querySelectorAll(".modal").forEach(m=>m.classList.remove("on"))}
    }catch(err){
      console.error(err);
      toast("⚠️ Couldn't send. Please try again or email "+D.email);
    }finally{b.disabled=false;b.classList.remove("busy");t.textContent=old}
  });
}
wire("cf","cdone",fd=>toFormspree(fd,"Portfolio message from "+fd.get("name")));
wire("sf","sdone",fd=>D.sheetUrl?toSheet(fd):toFormspree(fd,"Portfolio Suggestion: "+fd.get("type")));
wire("cvf",null,fd=>toFormspree(fd,"CV Request from "+fd.get("name")),"✅ Request sent! I'll email you the CV soon.");
// "Send another" বাটন: ফর্ম আবার দেখায়
document.querySelectorAll("[data-again]").forEach(b=>b.onclick=()=>{const f=$("#"+b.dataset.again);f.hidden=false;b.closest(".done").hidden=true});
// suggestion box এর অক্ষর গণনা
const sm=$("#sm");sm.addEventListener("input",()=>$("#cnt").textContent=sm.value.length+"/500");

/* CV request বাটন: CV link থাকলে সরাসরি download, নাহলে ফর্ম */
$("#cvBtn").onclick=()=>{D.cv&&confirm("CV direct download korben? Cancel dile request form ashbe.")?window.open(D.cv):$("#cvm").classList.add("on")};

/* ===== 7. THEME (dark/light) ===== */
const root=document.documentElement;
function setT(t){root.dataset.theme=t;$("#theme").textContent=t=="dark"?"☀️":"🌙";try{localStorage.setItem("th",t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem("th")}catch(e){}
setT(saved||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
$("#theme").onclick=()=>setT(root.dataset.theme=="dark"?"light":"dark");

/* ===== 8. SCROLL ANIMATION (প্রতি পেজে আবার চলে) ===== */
document.querySelectorAll(".grid>*,.ph2,.quote,.tl>.card,.fg>div,.cbox,.pnote,.todo,.cinfo").forEach(el=>{el.classList.add("rv");el.style.setProperty("--d",[...el.parentNode.children].indexOf(el)%8*.09+"s")});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});
document.querySelectorAll(".rv").forEach(x=>io.observe(x));

/* ===== 9. SITE COLOR (🎨 বাটন) ===== */
function setC(c){
  if(c[0]=="#"){root.dataset.color="custom";root.style.setProperty("--pri",c);root.style.setProperty("--pri2","color-mix(in srgb,"+c+" 55%,white)")}
  else{root.dataset.color=c;root.style.removeProperty("--pri");root.style.removeProperty("--pri2")}
  try{localStorage.setItem("col",c)}catch(e){}
}
let sc=null;try{sc=localStorage.getItem("col")}catch(e){}
setC(sc||D.color||"sea");
$("#pbtn").onclick=e=>{e.stopPropagation();$("#pal").classList.toggle("on")};
$("#pal").onclick=e=>{e.stopPropagation();if(e.target.dataset.c)setC(e.target.dataset.c)};
$("#cc").oninput=e=>setC(e.target.value);
document.addEventListener("click",()=>$("#pal").classList.remove("on"));

/* ===== 10. SCROLL PROGRESS + 3D TILT ===== */
addEventListener("scroll",()=>{const h=document.documentElement;$("#prog").style.width=h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100+"%"});
if(matchMedia("(hover:hover)").matches)document.addEventListener("mousemove",e=>{
  const c=e.target.closest&&e.target.closest("#plist .card,.cert,.demo,.ab .im");
  document.querySelectorAll(".tilting").forEach(x=>{if(x!==c){x.style.transform="";x.classList.remove("tilting")}});
  if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.classList.add("tilting");c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`;
});

/* ===== 11. ROUTER (#home, #projects ... পেজ বদল) ===== */
function route(){
  let h=(location.hash||"#home").slice(1);
  if(!document.getElementById(h)||!document.getElementById(h).classList.contains("page"))h="home";   // ভুল লিংক হলে Home
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("on",p.id==h));
  document.querySelectorAll("#links a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+h));
  $("#links").classList.remove("open");scrollTo(0,0);
  document.getElementById(h).querySelectorAll(".rv").forEach(x=>{x.classList.remove("in");io.unobserve(x);io.observe(x)});
}
addEventListener("hashchange",route);route();
$("#burger").onclick=()=>$("#links").classList.toggle("open");
// ✅ <Riyad/> লোগো: ইতিমধ্যে Home এ থাকলেও ক্লিকে উপরে স্ক্রল করবে
document.querySelectorAll("a.logo").forEach(a=>a.addEventListener("click",e=>{
  if((location.hash||"#home")=="#home"){e.preventDefault();scrollTo({top:0,behavior:"smooth"})}
}));

/* ===== 12. TYPING EFFECT (Home এর role লেখা) ===== */
let ri=0,ci=0,del=false;
(function type(){
  const w=D.role[ri];$("#typed").textContent=w.slice(0,ci);
  if(!del&&ci==w.length){del=true;return setTimeout(type,1400)}
  if(del&&ci==0){del=false;ri=(ri+1)%D.role.length}
  ci+=del?-1:1;setTimeout(type,del?45:90);
})();
