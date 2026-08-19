const SUPABASE_URL="https://itoxohdbwcxmrlxqfkct.supabase.co";
const SUPABASE_KEY="sb_publishable_Enj8kwWvvtHNUCBva-uPHg_incNY4jK";
const sb=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);
const PIX_KEY="brasilsuvivalzbrasilsuvivalz@gmail.com",PIX_NAME="GUSTAVO DE PAULA BARBOSA",PIX_CITY="RIO BRANCO";
const $=id=>document.getElementById(id);
const DATA={
items:[
{id:"nails",name:"Caixa de Pregos",tag:"CONSTRUÇÃO VANILLA",img:"nails.jpg",brl:2,bs:180},
{id:"wire",name:"Arame x2",tag:"CONSTRUÇÃO VANILLA",img:"wire.jpg",brl:2,bs:220},
{id:"hammer",name:"Martelo",tag:"FERRAMENTA",img:"hammer.jpg",brl:2,bs:150},
{id:"hatchet",name:"Machado Pequeno",tag:"FERRAMENTA",img:"hatchet.jpg",brl:2,bs:200},
{id:"saw",name:"Serrote",tag:"FERRAMENTA",img:"handsaw.jpg",brl:2,bs:180},
{id:"stone",name:"Pedra de Amolar",tag:"FERRAMENTA",img:"sharpening_stone.jpg",brl:2,bs:250},
{id:"planks",name:"Pack 10 Tábuas",tag:"CONSTRUÇÃO VANILLA",img:"planks.jpg",brl:2,bs:300},
{id:"codelock",name:"CodeLock",tag:"SEGURANÇA",img:"codlock.jpg",brl:5,bs:900}],
cars:[
{id:"sarka",name:"Sarka 120",tag:"VEÍCULO VANILLA",img:"sarka.jpg",brl:15,bs:3000},
{id:"olga",name:"Olga 24",tag:"VEÍCULO VANILLA",img:"olga.jpg",brl:15,bs:3400},
{id:"gunter",name:"Gunter 2",tag:"VEÍCULO VANILLA",img:"gunter.jpg",brl:18,bs:4000},
{id:"ada",name:"Ada 4x4",tag:"VEÍCULO VANILLA",img:"ada.jpg",brl:20,bs:4800},
{id:"m3s",name:"M3S",tag:"VEÍCULO VANILLA",img:"m3s.jpg",brl:30,bs:7500}],
kits:[
{id:"kitbase",name:"Kit Base — 20 itens",tag:"KIT DE CONSTRUÇÃO",img:"kit_base.jpg",brl:null,bs:1200,desc:"Para começar sua base.",items:["3x Caixa de Pregos","2x Martelo","2x Serrote","2x Machado Pequeno","6x Pedra de Amolar","50x Tábuas","50x Madeira","1x Corda"]},
{id:"kitmedio",name:"Kit Médio — 30 itens",tag:"KIT DE CONSTRUÇÃO",img:"kit_medio.jpg",brl:null,bs:2200,desc:"Mais recursos para expansão.",items:["5x Caixa de Pregos","3x Martelo","3x Serrote","3x Machado Pequeno","10x Pedra de Amolar","100x Tábuas","100x Madeira","2x Cordas"]},
{id:"kitavancado",name:"Kit Avançado — 50 itens",tag:"KIT DE CONSTRUÇÃO",img:"kit_avancado.jpg",brl:null,bs:3500,desc:"Pacote grande para base fortificada.",items:["8x Caixa de Pregos","5x Martelo","4x Serrote","4x Machado Pequeno","15x Pedra de Amolar","200x Tábuas","200x Madeira","4x Cordas"]}],
vip:[{id:"vip30",name:"VIP Prioridade — 30 dias",tag:"VIP",img:"vip.jpg",brl:35,bs:5000,desc:"Fila prioritária • Kit construção • Carros Vanilla • Itens selecionados"}],
mmg:[
{id:"metal",name:"Metal Crate",tag:"MMG STORAGE",img:"metal_crate.jpg",brl:5,bs:1300,desc:"170 slots • entregue vazio"},
{id:"weapon",name:"Weapon Crate",tag:"MMG STORAGE",img:"weapon_crate.jpg",brl:7,bs:1900,desc:"150 slots + 2 armas • entregue vazio"},
{id:"grenade",name:"Grenade Case",tag:"MMG STORAGE",img:"grenade_case.jpg",brl:5,bs:1100,desc:"10 granadas • entregue vazio"},
{id:"equipment",name:"Equipment Locker",tag:"MMG STORAGE",img:"equipment_locker.jpg",brl:10,bs:2600,desc:"100 slots + 5 armas + loadout • lockable"},
{id:"ta50",name:"TA50-Locker",tag:"MMG STORAGE",img:"ta50.jpg",brl:10,bs:3600,desc:"100 slots + 5 armas + loadout • lockable"},
{id:"rack",name:"Lockable Gun Rack",tag:"MMG STORAGE",img:"gun_rack.jpg",brl:12,bs:2300,desc:"10 armas • lockable"}]};
const all=[...DATA.items,...DATA.cars,...DATA.kits,...DATA.vip,...DATA.mmg];
let cart=[];try{cart=JSON.parse(localStorage.getItem("bsz_cart_v9")||"[]")}catch{}
const brl=n=>n==null?"—":n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const bs=n=>`${Number(n||0).toLocaleString("pt-BR")} BS`;
function card(p,extra=""){const kit=p.items?`<div class="kitList">${p.items.map(x=>`<div>• ${x}</div>`).join("")}</div>`:"";return `<article class="product ${extra}"><div class="productImg"><img src="${p.img}" alt="${p.name}" loading="lazy"></div><div class="productBody"><div class="tag">${p.tag}</div><h3>${p.name}</h3><div class="desc">${p.desc||""}</div>${kit}<div class="prices"><div class="price"><small>PIX</small><b>${brl(p.brl)}</b></div><div class="price bs"><small>BS COINS</small><b>${bs(p.bs)}</b></div></div><button data-add="${p.id}">🛒 ADICIONAR</button></div></article>`}
function render(){ $("itemProducts").innerHTML=DATA.items.map(card).join("");$("carProducts").innerHTML=DATA.cars.map(card).join("");$("kitProducts").innerHTML=DATA.kits.map(card).join("");$("vipProducts").innerHTML=DATA.vip.map(p=>card(p,"vipCard")).join("");$("mmgProducts").innerHTML=DATA.mmg.map(card).join("");document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(b.dataset.add));drawCart() }
function add(id){const r=cart.find(x=>x.id===id);r?r.qty++:cart.push({id,qty:1});saveCart();openDrawer()}
function change(id,d){const r=cart.find(x=>x.id===id);if(!r)return;r.qty+=d;if(r.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart()}
function saveCart(){localStorage.setItem("bsz_cart_v9",JSON.stringify(cart));drawCart()}
function totals(){let totalBRL=0,totalBS=0;cart.forEach(r=>{const p=all.find(x=>x.id===r.id);if(!p)return;if(p.brl!=null)totalBRL+=p.brl*r.qty;totalBS+=p.bs*r.qty});return{totalBRL,totalBS}}
function drawCart(){const count=cart.reduce((s,x)=>s+x.qty,0);$("cartCount").textContent=count;$("cartEmpty").style.display=count?"none":"block";$("sideCartText").textContent=count?`${count} item(ns) no carrinho.`:"Seu carrinho está vazio.";$("cartItems").innerHTML=cart.map(r=>{const p=all.find(x=>x.id===r.id);return p?`<div class="cartRow"><div><b>${p.name}</b><small>${p.brl!=null?brl(p.brl*r.qty)+" • ":""}${bs(p.bs*r.qty)}</small></div><div class="qty"><button data-dec="${p.id}">−</button><span>${r.qty}</span><button data-inc="${p.id}">+</button></div></div>`:""}).join("");document.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>change(b.dataset.dec,-1));document.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>change(b.dataset.inc,1));const t=totals();$("totalBRL").textContent=brl(t.totalBRL);$("totalBS").textContent=bs(t.totalBS)}
function openDrawer(){$("cartDrawer").classList.add("open");$("drawerBackdrop").classList.add("show")}function closeDrawer(){$("cartDrawer").classList.remove("open");$("drawerBackdrop").classList.remove("show")}
$("openCart").onclick=$("sideCartBtn").onclick=openDrawer;$("closeCart").onclick=$("drawerBackdrop").onclick=closeDrawer;$("clearCart").onclick=()=>{cart=[];saveCart()};
function validSteam(v){return /^7656119\d{10}$/.test(String(v).trim())}
function bindSteam(inp,status){inp.addEventListener("input",()=>{inp.value=inp.value.replace(/\D/g,"").slice(0,17);const n=inp.value.length;if(!n){status.className="status";status.textContent="Digite exatamente 17 números."}else if(validSteam(inp.value)){status.className="status ok";status.textContent="✓ SteamID64 válido (17/17)."}else{status.className="status bad";status.textContent=n<17?`Faltam ${17-n} número(s) — ${n}/17`:`SteamID64 inválido. Deve começar com 7656119.`}})}
bindSteam($("regSteam"),$("regSteamStatus"));bindSteam($("steamId"),$("checkoutSteamStatus"));
function show(id){$(id).classList.add("show")}function hide(id){$(id).classList.remove("show")}document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>hide(b.dataset.close));
function message(t,b){$("messageTitle").textContent=t;$("messageBody").textContent=b;show("messageModal")}
function openAuth(){show("authModal");refreshAccountUI()}$("openAccount").onclick=$("sideLogin").onclick=$("sideAccount").onclick=$("coinsAccountBtn").onclick=openAuth;
document.querySelectorAll("[data-auth]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-auth]").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("loginForm").classList.toggle("hidden",b.dataset.auth!=="login");$("registerForm").classList.toggle("hidden",b.dataset.auth!=="register");$("accountPanel").classList.add("hidden")});
async function getProfile(uid){if(!sb)return null;const{data,error}=await sb.from("profiles").select("user_id,player_name,steam_id,bs_coins").eq("user_id",uid).maybeSingle();if(error)throw error;return data}
async function refreshAccountUI(){if(!sb)return;const{data:{session}}=await sb.auth.getSession();if(!session){$("accountPanel").classList.add("hidden");$("loginForm").classList.remove("hidden");$("sideLoggedOut").classList.remove("hidden");$("sideLoggedIn").classList.add("hidden");return}try{const p=await getProfile(session.user.id);$("loginForm").classList.add("hidden");$("registerForm").classList.add("hidden");$("accountPanel").classList.remove("hidden");$("accountName").textContent=p?.player_name||session.user.email;$("accountSteam").textContent=p?.steam_id||"Não informado";$("accountBalance").textContent=bs(p?.bs_coins||0);$("sideBalance").textContent=bs(p?.bs_coins||0);$("sidePlayer").textContent=p?.player_name||session.user.email;$("sideLoggedOut").classList.add("hidden");$("sideLoggedIn").classList.remove("hidden");if(p?.player_name)$("playerName").value=p.player_name;if(p?.steam_id)$("steamId").value=p.steam_id}catch(e){message("Erro ao carregar conta",e.message)}}
$("registerForm").onsubmit=async e=>{e.preventDefault();if(!sb)return message("Supabase indisponível","A biblioteca não carregou.");const player=$("regPlayer").value.trim(),steam=$("regSteam").value.trim(),email=$("regEmail").value.trim().toLowerCase(),pw=$("regPassword").value;if(!validSteam(steam))return message("SteamID64 inválido","Use exatamente 17 números e confirme seu SteamID64.");if(pw!==$("regConfirm").value)return message("Senhas diferentes","A confirmação precisa ser igual à senha.");const{error}=await sb.auth.signUp({email,password:pw,options:{data:{player_name:player,steam_id:steam}}});if(error)return message("Erro no cadastro",error.message);message("Conta criada","Cadastro concluído. Você já pode entrar na conta.");setTimeout(refreshAccountUI,300)};
$("loginForm").onsubmit=async e=>{e.preventDefault();if(!sb)return;const{error}=await sb.auth.signInWithPassword({email:$("loginEmail").value.trim().toLowerCase(),password:$("loginPassword").value});if(error)return message("Não foi possível entrar","Confira e-mail e senha.");await refreshAccountUI();hide("authModal")};
$("logoutBtn").onclick=async()=>{await sb.auth.signOut();await refreshAccountUI()};if(sb)sb.auth.onAuthStateChange(()=>setTimeout(refreshAccountUI,0));
function f(id,v){return id+String(v.length).padStart(2,"0")+v}function crc(s){let c=0xffff;for(let x=0;x<s.length;x++){c^=s.charCodeAt(x)<<8;for(let i=0;i<8;i++)c=(c&0x8000)?((c<<1)^0x1021):(c<<1),c&=0xffff}return c.toString(16).toUpperCase().padStart(4,"0")}function clean(s,m){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z0-9 .-]/gi,"").toUpperCase().slice(0,m)}function pixPayload(a,tx){const mai=f("26",f("00","BR.GOV.BCB.PIX")+f("01",PIX_KEY)),add=f("62",f("05",tx));let p=f("00","01")+mai+f("52","0000")+f("53","986")+f("54",a.toFixed(2))+f("58","BR")+f("59",clean(PIX_NAME,25))+f("60",clean(PIX_CITY,15))+add+"6304";return p+crc(p)}
$("checkoutPix").onclick=()=>{if(!cart.length)return message("Carrinho vazio","Adicione produtos primeiro.");closeDrawer();show("checkoutModal")};
$("makePix").onclick=()=>{const t=totals(),name=$("playerName").value.trim(),sid=$("steamId").value.trim();if(!name)return message("Nome obrigatório","Informe seu nome no DayZ.");if(!validSteam(sid))return message("SteamID64 inválido","Digite exatamente 17 números.");if(t.totalBRL<=0)return message("Somente BS Coins","Este carrinho não possui valor em PIX.");const tx=("BSZ"+Date.now().toString().slice(-12)).slice(0,25),code=pixPayload(t.totalBRL,tx);$("pixArea").classList.remove("hidden");$("pixCode").value=code;$("pixAmount").textContent=`PIX ${brl(t.totalBRL)} • ${tx}`;$("qrcode").innerHTML="";if(window.QRCode)new QRCode($("qrcode"),{text:code,width:210,height:210});};$("copyPix").onclick=()=>navigator.clipboard.writeText($("pixCode").value);
$("checkoutBs").onclick=async()=>{if(!cart.length)return message("Carrinho vazio","Adicione produtos primeiro.");if(!sb)return message("Conta indisponível","Supabase não carregou.");const{data:{session}}=await sb.auth.getSession();if(!session)return openAuth();const items=cart.map(r=>({id:r.id,qty:r.qty}));const{data,error}=await sb.rpc("place_bs_order",{p_items:items});if(error)return message("Compra não concluída",error.message);cart=[];saveCart();closeDrawer();await refreshAccountUI();message("Compra aprovada",`Pedido #${data?.order_id||""} criado com BS Coins.`)};
render();refreshAccountUI();
