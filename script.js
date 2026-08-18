const products=[
["vip","🎫 VIP","Prioridade na fila - 30 dias",35],
["construcao","🔨 CONSTRUÇÃO","Caixa de pregos",2],
["construcao","🔨 CONSTRUÇÃO","Arame x2",2],
["construcao","🔨 CONSTRUÇÃO","Martelo",2],
["construcao","🔨 CONSTRUÇÃO","Machado",2],
["construcao","🔨 CONSTRUÇÃO","Serrote",2],
["construcao","🔨 CONSTRUÇÃO","Cadeado",3],
["construcao","🔨 CONSTRUÇÃO","Pack 10 tábuas",2],
["veiculos","🚗 VEÍCULOS","Sarka 120",15],
["veiculos","🚗 VEÍCULOS","Olga 24",15],
["veiculos","🚗 VEÍCULOS","Gunter 2",18],
["veiculos","🚙 VEÍCULOS","Ada 4x4",20],
["veiculos","🚚 VEÍCULOS","M3S",30],
["mmg","📦 MMG STORAGE","Metal Crate",5],
["mmg","📦 MMG STORAGE","Weapon Crate",7],
["mmg","📦 MMG STORAGE","Grenade Case",5],
["mmg","📦 MMG STORAGE","Equipment Locker",10],
["mmg","📦 MMG STORAGE","TA50-Locker",10],
["mmg","📦 MMG STORAGE","Lockable Gun Rack",12]
];
const cart={};const brl=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const names={vip:["APOIE O SERVIDOR","🎫 VIP & PRIORIDADE"],construcao:["MONTE SUA BASE","🔨 CONSTRUÇÃO VANILLA"],veiculos:["ESCOLHA SEU VEÍCULO","🚗 VEÍCULOS VANILLA"],mmg:["ORGANIZE SUA BASE","📦 MMG BASE STORAGE"]};
function catalog(){let html="";Object.keys(names).forEach(cat=>{html+=`<section class="section" id="${cat}"><div class="section-head"><span>${names[cat][0]}</span><h2>${names[cat][1]}</h2></div><div class="grid">`;products.forEach((p,i)=>{if(p[0]===cat)html+=`<article class="card"><div class="tag">${p[1]}</div><h3>${p[2]}</h3><div class="price">${brl(p[3])}</div><button onclick="add(${i})">ADICIONAR AO CARRINHO</button></article>`});html+="</div></section>"});document.getElementById("catalog").innerHTML=html}
function add(i){cart[i]=(cart[i]||0)+1;draw()}
function qty(i,d){cart[i]=(cart[i]||0)+d;if(cart[i]<=0)delete cart[i];draw()}
function draw(){const e=Object.entries(cart);document.getElementById("empty").style.display=e.length?"none":"block";document.getElementById("cartItems").innerHTML=e.map(([i,q])=>{const p=products[i];return `<div class="cart-row"><div><b>${p[2]}</b><br><small>${brl(p[3])} cada</small></div><div class="controls"><button onclick="qty(${i},-1)">−</button><span>${q}</span><button onclick="qty(${i},1)">+</button><b>${brl(p[3]*q)}</b></div></div>`}).join("");document.getElementById("total").textContent=brl(e.reduce((s,[i,q])=>s+products[i][3]*q,0))}
document.getElementById("generate").onclick=()=>{const n=document.getElementById("name").value.trim(),s=document.getElementById("steam").value.trim(),e=Object.entries(cart);if(!n||!s||!e.length){alert("Preencha o Nome, Steam ID e adicione produtos.");return}let total=e.reduce((a,[i,q])=>a+products[i][3]*q,0);let t=`PEDIDO - BRASIL SURVIVALZ\n\nJogador: ${n}\nSteam ID: ${s}\n\nITENS:\n`;e.forEach(([i,q])=>t+=`• ${q}x ${products[i][2]} — ${brl(products[i][3]*q)}\n`);t+=`\nTOTAL: ${brl(total)}\n\nPagamento via PIX. Enviar comprovante no Discord.`;document.getElementById("output").value=t}
document.getElementById("copy").onclick=async()=>{const t=document.getElementById("output").value;if(!t)return;await navigator.clipboard.writeText(t);alert("Pedido copiado!")};catalog();draw();