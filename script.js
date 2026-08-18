// BRASIL SURVIVALZ V8.4 PRO
const SUPABASE_URL="https://itoxohdbwcxmrlxqfkct.supabase.co";
const SUPABASE_KEY="sb_publishable_Enj8kwWvvtHNUCBva-uPHg_incNY4jK";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const PIX_KEY="brasilsuvivalzbrasilsuvivalz@gmail.com",PIX_NAME="GUSTAVO DE PAULA BARBOSA",PIX_CITY="RIO BRANCO";
const DATA={
vip:[
{id:"vip30",name:"VIP Prioridade — 30 dias",tag:"VIP",img:"vip.jpg",brl:35,bs:5000,desc:"Prioridade na fila por 30 dias • benefícios da comunidade BRASIL SURVIVALZ.",featured:true}
],
kits:[
{id:"kitbase",name:"Kit Base",tag:"KIT DE CONSTRUÇÃO",img:"kit_base.jpg",brl:null,bs:1200,desc:"Kit inicial para construção.",items:["3x Caixa de Pregos","2x Martelo","2x Serrote","2x Machado Pequeno","6x Pedra de Amolar","50x Tábuas","50x Madeira","1x Corda"]},
{id:"kitmedio",name:"Kit Médio",tag:"KIT DE CONSTRUÇÃO",img:"kit_medio.jpg",brl:null,bs:2200,desc:"Kit intermediário para ampliar a base.",items:["5x Caixa de Pregos","3x Martelo","3x Serrote","3x Machado Pequeno","10x Pedra de Amolar","100x Tábuas","100x Madeira","2x Cordas"]},
{id:"kitavancado",name:"Kit Avançado",tag:"KIT DE CONSTRUÇÃO",img:"kit_avancado.jpg",brl:null,bs:3500,desc:"Kit avançado para uma base maior.",items:["8x Caixa de Pregos","5x Martelo","4x Serrote","4x Machado Pequeno","15x Pedra de Amolar","200x Tábuas","200x Madeira","4x Cordas"]}
],
items:[
{id:"nails",name:"Caixa de Pregos",tag:"CONSTRUÇÃO VANILLA",img:"nails.jpg",brl:2,bs:180},
{id:"hammer",name:"Martelo",tag:"FERRAMENTA",img:"hammer.jpg",brl:2,bs:150},
{id:"saw",name:"Serrote",tag:"FERRAMENTA",img:"handsaw.jpg",brl:2,bs:180},
{id:"hatchet",name:"Machado Pequeno",tag:"FERRAMENTA",img:"hatchet.jpg",brl:2,bs:200},
{id:"stone",name:"Pedra de Amolar",tag:"FERRAMENTA",img:"sharpening_stone.jpg",brl:2,bs:250},
{id:"planks",name:"Pack 10 Tábuas",tag:"CONSTRUÇÃO VANILLA",img:"planks.jpg",brl:2,bs:300},
{id:"wire",name:"Arame x2",tag:"CONSTRUÇÃO VANILLA",img:"wire.jpg",brl:2,bs:220},
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
{id:"metal",name:"Metal Crate",tag:"MMG BASE STORAGE",img:"metal_crate.jpg",brl:5,bs:1300,desc:"170 slots • entregue vazio"},
{id:"weapon",name:"Weapon Crate",tag:"MMG BASE STORAGE",img:"weapon_crate.jpg",brl:7,bs:1900,desc:"150 slots + espaço para 2 armas • entregue vazio"},
{id:"grenade",name:"Grenade Case",tag:"MMG BASE STORAGE",img:"grenade_case.jpg",brl:5,bs:1100,desc:"Capacidade para 10 granadas • entregue vazio"},
{id:"equipment",name:"Equipment Locker",tag:"MMG BASE STORAGE",img:"equipment_locker.jpg",brl:10,bs:2600,desc:"100 slots + espaços de equipamento/armas • entregue vazio"},
{id:"ta50",name:"TA-50 Locker",tag:"MMG BASE STORAGE",img:"ta50.jpg",brl:10,bs:3600,desc:"100 slots + espaços de equipamento/armas • entregue vazio"},
{id:"rack",name:"Lockable Gun Rack",tag:"MMG BASE STORAGE",img:"gun_rack.jpg",brl:12,bs:2300,desc:"Capacidade para 10 armas • entregue vazio"}
]};
let cart=[];try{cart=JSON.parse(localStorage.getItem("bsz_cart")||"[]")}catch(e){}
const all=[...DATA.vip,...DATA.kits,...DATA.items,...DATA.cars,...DATA.mmg],brl=n=>n==null?"—":n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),bs=n=>n.toLocaleString("pt-BR")+" BS";
function card(p){return `<article class="product"><div class="product-img"><img src="${p.img}" alt="${p.name}" style="object-position:${p.imgPos||'center'}" loading="lazy" onerror="this.onerror=null;this.src='v5_preview.jpg'"></div><div class="product-body"><h4>${p.tag}</h4><h3>${p.name}</h3><p>${p.desc||""}</p>${p.items?`<div class="kit-list">${p.items.map(x=>`<div>${x}</div>`).join("")}</div>`:""}<div class="prices"><div class="price-box"><small>PIX</small><b>${brl(p.brl)}</b></div><div class="price-box"><small>BS COINS</small><b>${bs(p.bs)}</b></div></div><button data-add="${p.id}">ADICIONAR AO CARRINHO</button></div></article>`}
function render(){vipProducts.innerHTML=DATA.vip.map(card).join("");kitProducts.innerHTML=DATA.kits.map(card).join("");itemProducts.innerHTML=DATA.items.map(card).join("");carProducts.innerHTML=DATA.cars.map(card).join("");mmgProducts.innerHTML=DATA.mmg.map(card).join("");document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(b.dataset.add));draw()}
function add(id){let r=cart.find(x=>x.id===id);r?r.qty++:cart.push({id,qty:1});save();openCart()}
function change(id,d){let r=cart.find(x=>x.id===id);if(!r)return;r.qty+=d;if(r.qty<=0)cart=cart.filter(x=>x.id!==id);save()}
function save(){localStorage.setItem("bsz_cart",JSON.stringify(cart));draw()}
function totals(){let totalBRL=0,totalBS=0;cart.forEach(r=>{let p=all.find(x=>x.id===r.id);if(p){if(p.brl!=null)totalBRL+=p.brl*r.qty;totalBS+=p.bs*r.qty}});return{totalBRL,totalBS}}
function draw(){cartCount.textContent=cart.reduce((a,b)=>a+b.qty,0);cartEmpty.style.display=cart.length?"none":"block";cartItems.innerHTML=cart.map(r=>{let p=all.find(x=>x.id===r.id);return `<div class="cart-item"><div><b>${p.name}</b><br><small>${r.qty}x</small></div><div class="qty"><button data-d="${p.id}">−</button>${r.qty}<button data-i="${p.id}">+</button></div></div>`}).join("");document.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>change(b.dataset.d,-1));document.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>change(b.dataset.i,1));let t=totals();totalBRL.textContent=brl(t.totalBRL);totalBS.textContent=bs(t.totalBS)}
function openCart(){cartDrawer.classList.add("open");drawerBackdrop.classList.add("show")}function closeCartFn(){cartDrawer.classList.remove("open");drawerBackdrop.classList.remove("show")}openCart.onclick=openCart;closeCart.onclick=closeCartFn;drawerBackdrop.onclick=closeCartFn;clearCart.onclick=()=>{cart=[];save()};goCheckout.onclick=()=>{closeCartFn();location.hash="#checkout"};
function validSteam(v){return /^\d{17}$/.test(v)}
function steamMessage(v){
  if(!v) return "Digite seu SteamID64 (17 números).";
  if(v.length<17) return `Faltam ${17-v.length} número${17-v.length===1?"":"s"}. Você digitou ${v.length}/17.`;
  return "✓ SteamID64 válido.";
}
function bind(i,s){
  i.setAttribute("inputmode","numeric"); i.setAttribute("pattern","[0-9]*");
  i.oninput=()=>{
    i.value=i.value.replace(/\D/g,"").slice(0,17);
    s.className=validSteam(i.value)?"status ok":"status bad";
    s.textContent=steamMessage(i.value);
  };
}bind(demoSteam,steamStatus);bind(steamId,checkoutSteamStatus);bind(regSteam,regSteamStatus);
function showModal(t,b){modalTitle.textContent=t;modalBody.textContent=b;modal.classList.add("show")}modalClose.onclick=()=>modal.classList.remove("show");
copyServerInfo.onclick=async()=>{await navigator.clipboard.writeText("BRASIL SURVIVALZ | PVP | LOOT+ | Chernarus");showModal("Servidor copiado","Nome do servidor copiado.")};steamHelp.onclick=()=>showModal("SteamID64","Abra seu perfil Steam e copie o SteamID64 de 17 números.");
function f(id,v){return id+String(v.length).padStart(2,"0")+v}function crc(s){let c=65535;for(let x=0;x<s.length;x++){c^=s.charCodeAt(x)<<8;for(let i=0;i<8;i++)c=(c&32768)?((c<<1)^4129):(c<<1),c&=65535}return c.toString(16).toUpperCase().padStart(4,"0")}function clean(s,m){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z0-9 .-]/gi,"").toUpperCase().slice(0,m)}function pixPayload(a,tx){let mai=f("26",f("00","BR.GOV.BCB.PIX")+f("01",PIX_KEY)),ad=f("62",f("05",tx));let p=f("00","01")+mai+f("52","0000")+f("53","986")+f("54",a.toFixed(2))+f("58","BR")+f("59",clean(PIX_NAME,25))+f("60",clean(PIX_CITY,15))+ad+"6304";return p+crc(p)}
makePix.onclick=()=>{let t=totals(),sid=steamId.value;if(!cart.length)return showModal("Carrinho vazio","Adicione produtos.");if(!playerName.value.trim())return showModal("Nome obrigatório","Informe seu nome no DayZ.");if(!validSteam(sid))return showModal("SteamID64 inválido",steamMessage(sid));if(t.totalBRL<=0)return showModal("BS Coins","Este carrinho não possui valor em PIX.");let tx=("BSZ"+Date.now().toString().slice(-12)).slice(0,25),code=pixPayload(t.totalBRL,tx);pixArea.classList.remove("hidden");pixCode.value=code;pixAmount.textContent="PIX "+brl(t.totalBRL);qrcode.innerHTML="";new QRCode(qrcode,{text:code,width:210,height:210})};copyPix.onclick=()=>navigator.clipboard.writeText(pixCode.value);
openAccount.onclick=()=>{authModal.classList.add("show");refreshAccountUI()};authClose.onclick=()=>authModal.classList.remove("show");document.querySelectorAll("[data-auth]").forEach(b=>b.onclick=()=>{loginForm.classList.toggle("hidden",b.dataset.auth!=="login");registerForm.classList.toggle("hidden",b.dataset.auth!=="register");accountPanel.classList.add("hidden")});
async function getProfile(id){let {data,error}=await supabaseClient.from("profiles").select("id,player_name,steam_id,bs_coins").eq("id",id).maybeSingle();if(error)throw error;return data}
async function refreshAccountUI(){let {data:{session}}=await supabaseClient.auth.getSession();if(!session){accountPanel.classList.add("hidden");return}let p=await getProfile(session.user.id);loginForm.classList.add("hidden");registerForm.classList.add("hidden");accountPanel.classList.remove("hidden");accountName.textContent=p?.player_name||session.user.email;accountSteam.textContent=p?.steam_id||"";accountCoins.textContent=Number(p?.bs_coins||0).toLocaleString("pt-BR")+" BS";openAccount.textContent="👤 "+(p?.player_name||"CONTA");if(p?.steam_id){steamId.value=demoSteam.value=p.steam_id}if(p?.player_name)playerName.value=p.player_name}
registerForm.onsubmit=async e=>{e.preventDefault();if(!validSteam(regSteam.value))return showModal("SteamID64 inválido",steamMessage(regSteam.value));if(regPassword.value!==regConfirm.value)return showModal("Senhas diferentes","As duas senhas precisam ser iguais.");let {data,error}=await supabaseClient.auth.signUp({email:regEmail.value.trim(),password:regPassword.value,options:{data:{player_name:regPlayer.value.trim(),steam_id:regSteam.value}}});if(error)return showModal("Erro no cadastro",error.message);showModal("Cadastro criado","Confira seu e-mail para confirmar a conta. Depois faça login.")};
loginForm.onsubmit=async e=>{e.preventDefault();let {error}=await supabaseClient.auth.signInWithPassword({email:loginEmail.value.trim(),password:loginPassword.value});if(error)return showModal("Erro ao entrar",error.message);await refreshAccountUI();showModal("Conta conectada","Login realizado.")};logoutBtn.onclick=async()=>{await supabaseClient.auth.signOut();location.reload()};supabaseClient.auth.onAuthStateChange(()=>setTimeout(refreshAccountUI,0));render();refreshAccountUI();

// V8.5: se uma imagem falhar, mantém o card e mostra identidade visual em vez de ícone quebrado.
document.addEventListener("error",function(e){
  if(e.target && e.target.tagName==="IMG"){
    e.target.style.display="none";
    const box=e.target.parentElement;
    if(box && !box.querySelector(".image-fallback")){
      const f=document.createElement("div");
      f.className="image-fallback";
      f.innerHTML="<b>BRASIL SURVIVALZ</b><small>IMAGEM DO ITEM</small>";
      f.style.cssText="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#79ef2d;gap:6px;background:radial-gradient(circle,#162713,#071008 70%)";
      box.appendChild(f);
    }
  }
},true);
