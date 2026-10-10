const L={'中央':'中央政府','地方':'地方政府','媒體':'中央社'},TABS=['首頁','中央','地方','媒體'];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const N=[...NEWS].sort((a,b)=>(b.date||'').localeCompare(a.date||''));let cat='首頁',unit='',shown=20;
const W='日一二三四五六',d=new Date();$('#today').textContent=`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 星期${W[d.getDay()]}`;$('#upd').textContent='資料更新：'+UPDATED;
const dt=n=>n.date||'日期待確認',tag=n=>`<span class="tag t-${n.category}">${L[n.category]||n.category}</span>`;
const link=(n,t)=>`<a href="${esc(n.url)}" target="_blank" rel="noopener">${t}</a>`;
const meta=n=>`<div class="meta">${tag(n)}<span class="unit">${esc(n.unit)}</span><time>${dt(n)}</time></div>`;
const card=(n,cls='card')=>`<article class="${cls}">${meta(n)}<h3>${link(n,esc(n.title))}</h3><p class="sum">${esc(n.summary)}</p><button class="tog">展開摘要 ▾</button><a class="src" href="${esc(n.url)}" target="_blank" rel="noopener">原始連結 ↗</a></article>`;
$('#tabs').innerHTML=TABS.map(c=>`<button data-c="${c}">${c=='首頁'?'首頁':L[c]}</button>`).join('');
function side(){const units={};N.forEach(n=>{(units[n.category]=units[n.category]||{})[n.unit]=((units[n.category]||{})[n.unit]||0)+1});
 let h='<div class="box"><h4>來源單位</h4>'+['中央','地方','媒體'].filter(c=>units[c]).map(c=>`<p class="grp">${L[c]}</p><ul class="units">`+Object.entries(units[c]).sort((a,b)=>b[1]-a[1]).map(([u,k])=>`<li><a data-c="${c}" data-u="${esc(u)}" class="${u==unit?'on':''}">${esc(u)}<em>${k}</em></a></li>`).join('')+'</ul>').join('')+'</div>';
 h+='<div class="box"><h4>最新新聞</h4><ol class="latest">'+N.slice(0,8).map(n=>`<li>${link(n,esc(n.title))}<time>${dt(n)}｜${esc(n.unit)}</time></li>`).join('')+'</ol></div>';$$('.side').forEach(s=>s.innerHTML=h)}
function home(){const [l,...r]=N;if(!l)return;$('#lead').innerHTML=`<article class="lead">${meta(l)}<h2>${link(l,esc(l.title))}</h2><p class="sum">${esc(l.summary)}</p><button class="tog">展開摘要 ▾</button><a class="src" href="${esc(l.url)}" target="_blank" rel="noopener">閱讀原文 ↗</a></article>`;
 $('#subs').innerHTML='<h4 class="kicker">焦點新聞</h4>'+r.slice(0,4).map(n=>`<article class="subh">${meta(n)}<h3>${link(n,esc(n.title))}</h3></article>`).join('');
 $$('.block').forEach(b=>{const a=N.filter(n=>n.category==b.dataset.cat).slice(0,6);b.hidden=!a.length;b.querySelector('.grid').innerHTML=a.map(n=>card(n)).join('')})}
function catv(){const a=N.filter(n=>n.category==cat&&(!unit||n.unit==unit));$('#ctitle').textContent=L[cat]+(unit?'｜'+unit:'');$('#cmeta').innerHTML=`共 ${a.length} 則`+(unit?' ・ <a data-c="'+cat+'" data-u="">顯示全部單位</a>':'');
 $('#clist').innerHTML=a.slice(0,shown).map(n=>card(n,'card row')).join('');$('#more').style.display=a.length>shown?'':'none'}
function go(c,u=''){cat=c;unit=u;shown=20;$$('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.c==cat));$('#home').hidden=cat!='首頁';$('#catview').hidden=cat=='首頁';cat=='首頁'?home():catv();side();folds();if(location.hash!='#'+(cat=='首頁'?'':cat))history.replaceState(null,'',cat=='首頁'?location.pathname:'#'+cat);scrollTo(0,0)}
function folds(){$$('.sum').forEach(p=>{const b=p.nextElementSibling;if(b&&b.classList.contains('tog'))b.hidden=!(p.scrollHeight>p.clientHeight+2)&&!p.classList.contains('open')})}
document.addEventListener('click',e=>{const t=e.target.closest('[data-c],[data-go],.tog');if(!t)return;
 if(t.classList.contains('tog')){const p=t.previousElementSibling,o=p.classList.toggle('open');t.textContent=o?'收合摘要 ▴':'展開摘要 ▾';return}
 e.preventDefault();go(t.dataset.go||t.dataset.c,t.dataset.u||'')});
$('#more').onclick=()=>{shown+=20;catv();folds()};addEventListener('resize',folds);
go(L[location.hash.slice(1)]?location.hash.slice(1):'首頁');
