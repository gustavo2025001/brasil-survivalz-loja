const PIX_KEY="brasilsuvivalzbrasilsuvivalz@gmail.com";
const PIX_NAME="GUSTAVO DE PAULA BARBOSA";
const PIX_CITY="RIO BRANCO";

const DATA={
 vip:[{id:"vip30",name:"VIP Prioridade — 30 dias",tag:"VIP",img:"vip.jpg",brl:35,bs:5000,desc:"Prioridade na fila por 30 dias.",featured:true}],
 kits:[
  {id:"kitbase",name:"Kit Base",tag:"KIT DE CONSTRUÇÃO",img:"kit_base.jpg",brl:null,bs:1200,desc:"Kit para começar uma base.",items:["3x Caixa de Pregos","2x Martelo","2x Serrote","2x Machado Pequeno","6x Esmeril","50x Tábuas","50x Madeira","1x Corda"]},
  {id:"kitmedio",name:"Kit Médio",tag:"KIT DE CONSTRUÇÃO",img:"kit_medio.jpg",brl:null,bs:650,desc:"Mais recursos para evolução.",items:["5x Caixa de Pregos","3x Martelo","3x Serrote","3x Machado Pequeno","10x Esmeril","100x Tábuas","100x Madeira","2x Cordas"]},
  {id:"kitavancado",name:"Kit Avançado",tag:"KIT DE CONSTRUÇÃO",img:"kit_avancado.jpg",brl:null,bs:3500,desc:"Pacote grande para base fortificada.",items:["8x Caixa de Pregos","5x Martelo","4x Serrote","4x Machado Pequeno","15x Esmeril","200x Tábuas","200x Madeira","4x Cordas"]}
 ],
 items:[
  {id:"nails",name:"Caixa de Pregos",tag:"VANILLA",img:"nails.jpg",brl:2,bs:180},
  {id:"hammer",name:"Martelo",tag:"VANILLA",img:"hammer.jpg",brl:2,bs:150},
  {id:"saw",name:"Serrote",tag:"VANILLA",img:"handsaw.jpg",brl:2,bs:180},
  {id:"hatchet",name:"Machado Pequeno",tag:"VANILLA",img:"hatchet.jpg",brl:2,bs:200},
  {id:"stone",name:"Pedra de Amolar",tag:"VANILLA",img:"sharpening_stone.jpg",brl:2,bs:250},
  {id:"planks",name:"Pack 10 Tábuas",tag:"VANILLA",img:"planks.jpg",brl:2,bs:300},
  {id:"wire",name:"Arame x2",tag:"VANILLA",img:"wire.jpg",brl:2,bs:220},
  {id:"codelock",name:"CodeLock",tag:"SEGURANÇA",img:"codlock.jpg",brl:5,bs:900}
 ],
 cars:[
  {id:"sarka",name:"Sarka 120",tag:"VEÍCULO VANILLA",img:"sarka.jpg",brl:15,bs:3000},
  {id:"olga",name:"Olga 24",tag:"VEÍCULO VANILLA",img:"olga.jpg",brl:15,bs:3400},
  {id:"gunter",name:"Gunter 2",tag:"VEÍCULO VANILLA",img:"gunter.jpg",brl:18,bs:4000},
  {id:"ada",name:"Ada 4x4",tag:"VEÍCULO VANILLA",img:"ada.jpg",brl:20,bs:4800},
  {id:"m3s",name:"M3S",tag:"VEÍCULO VANILLA",img:"m3s.jpg",brl:30,bs:7500}
 ],
 mmg:[
  {id:"metal",name:"Metal Crate",tag:"MMG STORAGE",img:"metal_crate.jpg",brl:5,bs:1300,desc:"120 slots • entregue vazio"},
  {id:"weapon",name:"Weapon Crate",tag:"MMG STORAGE",img:"weapon_crate.jpg",brl:7,bs:1900,desc:"150 slots • entregue vazio"},
  {id:"grenade",name:"Grenade Case",tag:"MMG STORAGE",img:"grenade_case.jpg",brl:5,bs:1100,desc:"60 slots • entregue vazio"},
  {id:"equipment",name:"Equipment Locker",tag:"MMG STORAGE",img:"equipment_locker.jpg",brl:10,bs:2600,desc:"200 slots • entregue vazio"},
  {id:"ta50",name:"TA50-Locker",tag:"MMG STORAGE",img:"ta50.jpg",brl:10,bs:3600,desc:"300 slots • entregue vazio"},
  {id:"rack",name:"Lockable Gun Rack",tag:"MMG STORAGE",img:"gun_rack.jpg",brl:12,bs:2300,desc:"100 slots • entregue vazio"}
 ]
};

let cart=[];
try{cart=JSON.parse(localStorage.getItem("bsz_cart")||"[]")}catch(e){cart=[]}

const brl=n=>n==null?"—":n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const bs=n=>n==null?"—":n.toLocaleString("pt-BR")+" BS";
const allProducts=[...DATA.vip,...DATA.kits,...DATA.items,...DATA.cars,...DATA.mmg];

function card(p){
 const list=p.items?`<div class="kit-list">${p.items.map(x=>`<div>${x}</div>`).join("")}</div>`:"";
 const brlBox=p.brl!=null?`<div class="price-box"><small>PIX</small><b>${brl(p.brl)}</b></div>`:`<div class="price-box"><small>PIX</small><b>—</b></div>`;
 return `<article class="product ${p.featured?"featured":""}">
   <div class="product-img"><img src="${p.img}" alt="${p.name}" onerror="this.style.opacity='.15';this.alt='Imagem não encontrada'"></div>
   <div class="product-body">
     <div class="product-tag">${p.tag}</div><h3>${p.name}</h3>
     <div class="product-desc">${p.desc||""}</div>${list}
     <div class="prices">${brlBox}<div class="price-box price-bs"><small>BS COINS</small><b>${bs(p.bs)}</b></div></div>
     <button data-add="${p.id}">ADICIONAR AO CARRINHO</button>
   </div></article>`;
}
function render(){
 document.getElementById("vipProducts").innerHTML=DATA.vip.map(card).join("");
 document.getElementById("kitProducts").innerHTML=DATA.kits.map(card).join("");
 document.getElementById("itemProducts").innerHTML=DATA.items.map(card).join("");
 document.getElementById("carProducts").innerHTML=DATA.cars.map(card).join("");
 document.getElementById("mmgProducts").innerHTML=DATA.mmg.map(card).join("");
 document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>add(b.dataset.add)));
 drawCart();
}
function add(id){
 const p=allProducts.find(x=>x.id===id); if(!p)return;
 const row=cart.find(x=>x.id===id);
 if(row)row.qty++; else cart.push({id,qty:1});
 saveCart();openCart();
}
function change(id,d){
 const row=cart.find(x=>x.id===id);if(!row)return;
 row.qty+=d;if(row.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();
}
function saveCart(){localStorage.setItem("bsz_cart",JSON.stringify(cart));drawCart()}
function totals(){
 let totalBRL=0,totalBS=0;
 for(const r of cart){const p=allProducts.find(x=>x.id===r.id);if(!p)continue;if(p.brl!=null)totalBRL+=p.brl*r.qty;if(p.bs!=null)totalBS+=p.bs*r.qty}
 return {totalBRL,totalBS};
}
function drawCart(){
 const items=document.getElementById("cartItems");
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.getElementById("cartEmpty").style.display=cart.length?"none":"block";
 items.innerHTML=cart.map(r=>{const p=allProducts.find(x=>x.id===r.id);if(!p)return"";return `<div class="cart-item"><div><b>${p.name}</b><small>${p.brl!=null?brl(p.brl*r.qty)+" • ":""}${bs(p.bs*r.qty)}</small></div><div class="qty"><button data-dec="${p.id}">−</button><span>${r.qty}</span><button data-inc="${p.id}">+</button></div></div>`}).join("");
 items.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>change(b.dataset.dec,-1));
 items.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>change(b.dataset.inc,1));
 const t=totals();document.getElementById("totalBRL").textContent=brl(t.totalBRL);document.getElementById("totalBS").textContent=bs(t.totalBS);
}
const drawer=document.getElementById("cartDrawer"),backdrop=document.getElementById("drawerBackdrop");
function openCart(){drawer.classList.add("open");backdrop.classList.add("show");drawer.setAttribute("aria-hidden","false")}
function closeCart(){drawer.classList.remove("open");backdrop.classList.remove("show");drawer.setAttribute("aria-hidden","true")}
document.getElementById("openCart").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;backdrop.onclick=closeCart;
document.getElementById("clearCart").onclick=()=>{cart=[];saveCart()};
document.getElementById("goCheckout").onclick=()=>{closeCart();location.hash="#checkout"};

function validSteam(v){return /^\d{17}$/.test(v)&&BigInt(v)>=76561197960265728n}
function bindSteam(inputId,statusId){
 const inp=document.getElementById(inputId),st=document.getElementById(statusId);
 inp.addEventListener("input",()=>{inp.value=inp.value.replace(/\D/g,"").slice(0,17);if(!inp.value){st.className="status";st.textContent="Informe seu SteamID64."}else if(validSteam(inp.value)){st.className="status ok";st.textContent="✓ Formato SteamID64 válido."}else{st.className="status bad";st.textContent="✕ SteamID64 inválido."}});
}
bindSteam("demoSteam","steamStatus");bindSteam("steamId","checkoutSteamStatus");

function f(id,v){return id+String(v.length).padStart(2,"0")+v}
function crc(s){let c=0xffff;for(let x=0;x<s.length;x++){c^=s.charCodeAt(x)<<8;for(let i=0;i<8;i++)c=(c&0x8000)?((c<<1)^0x1021):(c<<1),c&=0xffff}return c.toString(16).toUpperCase().padStart(4,"0")}
function clean(s,m){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z0-9 .-]/gi,"").toUpperCase().slice(0,m)}
function pixPayload(a,tx){let mai=f("26",f("00","BR.GOV.BCB.PIX")+f("01",PIX_KEY)),add=f("62",f("05",tx));let p=f("00","01")+mai+f("52","0000")+f("53","986")+f("54",a.toFixed(2))+f("58","BR")+f("59",clean(PIX_NAME,25))+f("60",clean(PIX_CITY,15))+add+"6304";return p+crc(p)}

document.getElementById("makePix").onclick=()=>{
 const name=document.getElementById("playerName").value.trim(),sid=document.getElementById("steamId").value.trim(),t=totals();
 if(!cart.length)return showModal("Carrinho vazio","Adicione pelo menos um produto ao carrinho.");
 if(!name)return showModal("Nome obrigatório","Informe o nome usado no DayZ.");
 if(!validSteam(sid))return showModal("SteamID64 inválido","Use o SteamID64 de 17 números.");
 if(t.totalBRL<=0)return showModal("Compra em BS Coins","Este carrinho não possui itens com preço em PIX. A compra real em BS Coins será ativada quando integrarmos o saldo da conta.");
 const tx=("BSZ"+Date.now().toString().slice(-12)).slice(0,25),code=pixPayload(t.totalBRL,tx);
 document.getElementById("pixArea").classList.remove("hidden");document.getElementById("pixCode").value=code;document.getElementById("pixAmount").textContent=`PIX ${brl(t.totalBRL)} • ${tx}`;
 const qr=document.getElementById("qrcode");qr.innerHTML="";
 if(window.QRCode){new QRCode(qr,{text:code,width:210,height:210,correctLevel:QRCode.CorrectLevel.M})}
 else{qr.innerHTML="<div style='color:#111;padding:15px'>QR indisponível neste navegador. Use o PIX Copia e Cola.</div>"}
};
document.getElementById("copyPix").onclick=async()=>{const v=document.getElementById("pixCode").value;if(v){await navigator.clipboard.writeText(v);showModal("PIX copiado","O código PIX Copia e Cola foi copiado.")}};
document.getElementById("copyServerInfo").onclick=async()=>{await navigator.clipboard.writeText("BRASIL SURVIVALZ | PVP | LOOT+ | Chernarus");showModal("Servidor copiado","Nome do servidor copiado.")};
document.getElementById("steamHelp").onclick=()=>showModal("Como encontrar o SteamID64","Abra seu perfil Steam e copie o identificador SteamID64 de 17 números. Ele normalmente começa com 7656119.");

const modal=document.getElementById("modal");
function showModal(title,body){document.getElementById("modalTitle").textContent=title;document.getElementById("modalBody").innerHTML=`<p>${body}</p>`;modal.classList.add("show")}
document.getElementById("modalClose").onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};

render();
