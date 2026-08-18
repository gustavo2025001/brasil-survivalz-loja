const CONFIG={
kits:[
{id:"base",name:"KIT BASE",cls:"base",price:1200,img:"kit_base.jpg",desc:"Tudo que você precisa para começar sua base!",items:["3x Caixa de Prego","2x Martelo","2x Serrote","2x Machado Pequeno","6x Esmeril","50x Tábuas","50x Madeira (Troco)","1x Corda"]},
{id:"medio",name:"KIT MÉDIO",cls:"medium",price:650,img:"kit_medio.jpg",desc:"Mais recursos para expandir sua base!",items:["5x Caixa de Prego","3x Martelo","3x Serrote","3x Machado Pequeno","10x Esmeril","100x Tábuas","100x Madeira (Troco)","2x Corda"]},
{id:"avancado",name:"KIT AVANÇADO",cls:"advanced",price:3500,img:"kit_avancado.jpg",desc:"Para bases fortificadas e bem equipadas!",items:["8x Caixa de Prego","5x Martelo","4x Serrote","4x Machado Pequeno","15x Esmeril","200x Tábuas","200x Madeira (Troco)","4x Corda"]}],
items:[
{id:"nails",name:"Caixa de Pregos",price:180,img:"nails.jpg"},{id:"hammer",name:"Martelo",price:120,img:"hammer.jpg"},{id:"saw",name:"Serrote",price:150,img:"handsaw.jpg"},{id:"hatchet",name:"Machado Pequeno",price:180,img:"hatchet.jpg"},{id:"stone",name:"Pedra de Amolar",price:220,img:"sharpening_stone.jpg"},{id:"planks",name:"Pack 10 Tábuas",price:250,img:"planks.jpg"},{id:"wire",name:"Arame",price:180,img:"wire.jpg"},{id:"codelock",name:"CodeLock",price:900,img:"codlock.jpg"}],
cars:[{id:"sarka",name:"Sarka 120",price:2800,img:"sarka.jpg"},{id:"olga",name:"Olga 24",price:3200,img:"olga.jpg"},{id:"gunter",name:"Gunter 2",price:3800,img:"gunter.jpg"},{id:"ada",name:"Ada 4x4",price:4500,img:"ada.jpg"},{id:"m3s",name:"M3S",price:7000,img:"m3s.jpg"}],
mmg:[{id:"metal",name:"Metal Crate",price:1200,img:"metal_crate.jpg",sub:"120 slots"},{id:"weapon",name:"Weapon Crate",price:1800,img:"weapon_crate.jpg",sub:"150 slots"},{id:"grenade",name:"Grenade Case",price:1000,img:"grenade_case.jpg",sub:"60 slots"},{id:"equipment",name:"Equipment Locker",price:2500,img:"equipment_locker.jpg",sub:"200 slots"},{id:"ta50",name:"TA50-Locker",price:3500,img:"ta50.jpg",sub:"300 slots"},{id:"rack",name:"Lockable Gun Rack",price:2200,img:"gun_rack.jpg",sub:"100 slots"}]
};
let cart=[];
const fmt=n=>n.toLocaleString("pt-BR");
function productCard(p,isKit=false){return `<article class="product ${p.cls||""}"><div class="img"><img src="${p.img}" alt="${p.name}" onerror="this.style.opacity=.15;this.alt='Imagem não carregou'"></div><div class="body"><h3>${p.name}</h3><div class="sub">${p.desc||p.sub||""}</div>${isKit?`<div class="items-list">${p.items.map(x=>`<div>${x}</div>`).join("")}</div>`:""}<div class="coin-price">${fmt(p.price)} BS</div><button data-add="${p.id}">ADICIONAR</button></div></article>`}
function render(type){const arr=CONFIG[type];document.getElementById("products").innerHTML=arr.map(p=>productCard(p,type==="kits")).join("");document.querySelectorAll("[data-add]").forEach(btn=>btn.onclick=()=>add(type,btn.dataset.add));}
function add(type,id){const p=CONFIG[type].find(x=>x.id===id);let row=cart.find(x=>x.type===type&&x.id===id);if(row)row.qty++;else cart.push({type,id,name:p.name,price:p.price,qty:1});drawCart();}
function change(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);drawCart();}
function drawCart(){const el=document.getElementById("cart");document.getElementById("cartEmpty").style.display=cart.length?"none":"block";el.innerHTML=cart.map((x,i)=>`<div class="cart-item"><span>${x.name}</span><button onclick="change(${i},-1)">−</button><b>${x.qty}x</b><button onclick="change(${i},1)">+</button><strong>${fmt(x.price*x.qty)} BS</strong></div>`).join("");const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);document.getElementById("sideCount").textContent=count;document.getElementById("cartTotal").textContent=fmt(total);}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.tab);});
document.getElementById("clearBtn").onclick=()=>{cart=[];drawCart();};
const modal=document.getElementById("modal");
function showModal(title,html){document.getElementById("modalTitle").textContent=title;document.getElementById("modalBody").innerHTML=html;modal.classList.add("show");}
document.getElementById("modalClose").onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
document.getElementById("historyBtn").onclick=()=>showModal("EXTRATO BS COINS","<p>O extrato real será mostrado aqui quando conectarmos a conta do site ao servidor.</p><p><b>Regras planejadas:</b><br>30 zumbis = +10 BS<br>15 jogadores = +10 BS</p>");
document.getElementById("accountBtn").onclick=()=>showModal("MINHA CONTA","<p>Jogador: GUSTAVO</p><p>SteamID64: 7656119XXXXXXXXXX</p><p>Saldo mostrado nesta versão: <b>125 BS (demonstração)</b>.</p>");
document.getElementById("accountSide").onclick=document.getElementById("accountBtn").onclick;
document.getElementById("walletSide").onclick=document.getElementById("historyBtn").onclick;
document.getElementById("buyBtn").onclick=()=>{if(!cart.length)return showModal("PEDIDO","<p>Adicione pelo menos um item.</p>");const total=cart.reduce((s,x)=>s+x.price*x.qty,0);showModal("PEDIDO CRIADO",`<p>Seu pedido soma <b>${fmt(total)} BS Coins</b>.</p><p>Nesta versão de teste ele ainda não desconta saldo real. Depois conectaremos o site à conta por SteamID64.</p>`);}
render("kits");drawCart();