const CONFIG={
 rewards:{zombies:{kills:30,coins:10},players:{kills:15,coins:10}},
 kits:[
  {id:"kit-base",name:"KIT BASE",class:"base",price:1200,desc:"Tudo que você precisa para começar sua base!",items:["3x Caixa de Prego","2x Martelo","2x Serrote","2x Machado Pequeno","6x Esmeril","50x Tábuas","50x Madeira (Troco)","1x Corda"]},
  {id:"kit-medio",name:"KIT MÉDIO",class:"medium",price:650,desc:"Mais recursos para expandir sua base!",items:["5x Caixa de Prego","3x Martelo","3x Serrote","3x Machado Pequeno","10x Esmeril","100x Tábuas","100x Madeira (Troco)","2x Corda"]},
  {id:"kit-avancado",name:"KIT AVANÇADO",class:"advanced",price:3500,desc:"Para bases fortificadas e bem equipadas!",items:["8x Caixa de Prego","5x Martelo","4x Serrote","4x Machado Pequeno","15x Esmeril","200x Tábuas","200x Madeira (Troco)","4x Corda"]}
 ],
 items:[
  {id:"nails",name:"Caixa de Pregos",price:180,img:"nails.jpg"},
  {id:"hammer",name:"Martelo",price:120,img:"hammer.jpg"},
  {id:"saw",name:"Serrote",price:150,img:"handsaw.jpg"},
  {id:"hatchet",name:"Machado Pequeno",price:180,img:"hatchet.jpg"},
  {id:"stone",name:"Pedra de Amolar",price:220,img:"sharpening_stone.jpg"},
  {id:"planks",name:"Pack 10 Tábuas",price:250,img:"planks.jpg"},
  {id:"wire",name:"Arame",price:180,img:"wire.jpg"},
  {id:"codelock",name:"CodeLock",price:900,img:"codlock.jpg"}
 ],
 cars:[
  {id:"sarka",name:"Sarka 120",price:2800,img:"sarka.jpg"},
  {id:"olga",name:"Olga 24",price:3200,img:"olga.jpg"},
  {id:"gunter",name:"Gunter 2",price:3800,img:"gunter.jpg"},
  {id:"ada",name:"Ada 4x4",price:4500,img:"ada.jpg"},
  {id:"m3s",name:"M3S",price:7000,img:"m3s.jpg"}
 ],
 mmg:[
  {id:"metal",name:"Metal Crate",price:1200,img:"metal_crate.jpg",slots:120},
  {id:"weapon",name:"Weapon Crate",price:1800,img:"weapon_crate.jpg",slots:150},
  {id:"grenade",name:"Grenade Case",price:1000,img:"grenade_case.jpg",slots:60},
  {id:"equipment",name:"Equipment Locker",price:2500,img:"equipment_locker.jpg",slots:200},
  {id:"ta50",name:"TA50-Locker",price:3500,img:"ta50.jpg",slots:300},
  {id:"rack",name:"Lockable Gun Rack",price:2200,img:"gun_rack.jpg",slots:100}
 ]
};
let balance=125, cart=[];
const products=document.getElementById("products");
function coin(n){return n.toLocaleString("pt-BR")}
function renderKits(){products.innerHTML=CONFIG.kits.map(k=>`<article class="product ${k.class}"><div class="img"><div class="kit-visual">▣</div></div><div class="body"><h3>${k.name}</h3><div class="sub">${k.desc}</div><div class="items-list">${k.items.map(x=>`<div><b>${x.split("x")[0]}x</b>${x.substring(x.indexOf("x")+1)}</div>`).join("")}</div><div class="coin-price ${k.class==="medium"?"blue":k.class==="advanced"?"purple":""}">${coin(k.price)} BS</div><button onclick="add('${k.id}','${k.name}',${k.price})">COMPRAR</button></div></article>`).join("")}
function renderGeneric(arr){products.innerHTML=arr.map(p=>`<article class="product"><div class="img"><img src="${p.img}" alt="${p.name}"></div><div class="body"><h3>${p.name}</h3>${p.slots?`<div class="sub">${p.slots} slots</div>`:""}<div class="coin-price">${coin(p.price)} BS</div><button onclick="add('${p.id}','${p.name}',${p.price})">ADICIONAR</button></div></article>`).join("")}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");({kits:renderKits,items:()=>renderGeneric(CONFIG.items),cars:()=>renderGeneric(CONFIG.cars),mmg:()=>renderGeneric(CONFIG.mmg)})[b.dataset.tab]()});
function add(id,name,price){let f=cart.find(x=>x.id===id);if(f)f.qty++;else cart.push({id,name,price,qty:1});drawCart();location.hash="#orders"}
function drawCart(){const c=document.getElementById("cart"),empty=document.getElementById("cartEmpty");empty.style.display=cart.length?"none":"block";c.innerHTML=cart.map((x,i)=>`<div class="cart-item"><span>${x.qty}x ${x.name}</span><b>${coin(x.price*x.qty)} BS</b><button onclick="removeItem(${i})">×</button></div>`).join("");document.getElementById("cartTotal").textContent=coin(cart.reduce((s,x)=>s+x.price*x.qty,0))}
function removeItem(i){cart.splice(i,1);drawCart()}
document.getElementById("buyBtn").onclick=()=>{const total=cart.reduce((s,x)=>s+x.price*x.qty,0);if(!cart.length)return alert("Seu pedido está vazio.");if(total>balance)return alert("Saldo demo insuficiente. Na versão integrada, o saldo virá da conta real da loja.");alert("Demonstração V6: pedido de "+coin(total)+" BS Coins. A compra real será ativada quando conectarmos o backend/mod.");};
document.getElementById("historyBtn").onclick=()=>alert("Extrato será conectado ao saldo real da conta na próxima etapa.");
renderKits();drawCart();