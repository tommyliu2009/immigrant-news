const CATS=['全部','中央','地方','媒體'],L={'中央':'中央政府','地方':'地方政府','媒體':'媒體'};let cat='全部',shown=30;
const $=s=>document.querySelector(s),esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#yr').textContent=new Date().getFullYear();
$('#tabs').innerHTML=CATS.map(c=>`<button data-c="${c}" class="${c==cat?'on':''}">${L[c]||c}</button>`).join('');
$('#tabs').onclick=e=>{if(!e.target.dataset.c)return;cat=e.target.dataset.c;shown=30;document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.c==cat));fillUnits();render()};
function fillUnits(){const u=[...new Set(NEWS.filter(n=>cat=='全部'||n.category==cat).map(n=>n.unit))].sort();$('#unit').innerHTML='<option value="">全部單位</option>'+u.map(x=>`<option>${esc(x)}</option>`).join('')}
function render(){const u=$('#unit').value;let a=NEWS.filter(n=>(cat=='全部'||n.category==cat)&&(!u||n.unit==u));
a.sort((x,y)=>$('#sort').value=='asc'?x.date.localeCompare(y.date):y.date.localeCompare(x.date));
$('#meta').textContent=`共 ${a.length} 則｜資料更新：${UPDATED}`;
$('#list').innerHTML=a.slice(0,shown).map(n=>`<li><div class="tags"><span class="c c-${n.category}">${L[n.category]}</span><span class="u">${esc(n.unit)}</span><time>${n.date||"日期待確認"}</time></div>
<a class="t" href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.title)}</a><p class="sum">${esc(n.summary)}</p><button class="tog" hidden>展開摘要 ▾</button>
<a class="src" href="${esc(n.url)}" target="_blank" rel="noopener">原始連結 ↗</a></li>`).join('');$('#more').style.display=a.length>shown?'':'none';
document.querySelectorAll('#list li').forEach(li=>{const p=li.querySelector('.sum'),b=li.querySelector('.tog');if(p.scrollHeight>p.clientHeight+2)b.hidden=false})}
$('#list').addEventListener('click',e=>{const b=e.target.closest('.tog');if(!b)return;const p=b.previousElementSibling,o=p.classList.toggle('open');b.textContent=o?'收合摘要 ▴':'展開摘要 ▾'});
['unit','sort'].forEach(i=>$('#'+i).addEventListener('input',()=>{shown=30;render()}));$('#more').onclick=()=>{shown+=30;render()};fillUnits();render();
