const products=[
{id:"p1",name:"Vintage Acid Wash Denim Pants",cat:"pants",price:89,old:115,sale:true,new:true,upcoming:false,image:"images/shirt-model-1.png",desc:"Relaxed straight-leg denim with premium heavyweight cotton."},
{id:"p2",name:"Tailored Purple Accent Trousers",cat:"pants",price:110,old:110,sale:false,new:true,upcoming:false,image:"images/kurta-model-2.png",desc:"Clean pleated trousers for a sleek modern silhouette."},
{id:"p3",name:"Minimalist Cargo Track Pants",cat:"pants",price:75,old:95,sale:true,new:false,upcoming:true,image:"images/shirt-model-3.png",desc:"Utility-pocket relaxed joggers with adjustable ankle toggles."},
{id:"s1",name:"Oversized Oxford Shirt",cat:"shirts",price:68,old:85,sale:true,new:true,image:"images/jersey-model-4.png",desc:"Crisp organic cotton button-up with dropped shoulders."},
{id:"s2",name:"Silk Blend Evening Cuban Shirt",cat:"shirts",price:125,old:125,sale:false,new:true,upcoming:false,image:"images/printed-shirt-model-5.png",desc:"Fluid Cuban-collar shirt in a deep plum finish."},
{id:"t1",name:"Heavyweight Purple Glow Tee",cat:"tshirts",price:45,old:60,sale:true,new:true,image:"images/kurta-model-6.png",desc:"280 GSM boxy-fit t-shirt with bold graphic styling."},
{id:"t2",name:"Essential White Luxe Crew Tee",cat:"tshirts",price:38,old:38,sale:false,new:false,upcoming:true,image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80",desc:"Soft everyday crew neck made for clean styling."},
{id:"t3",name:"Distressed Vintage Wash Tee",cat:"tshirts",price:42,old:55,sale:true,new:false,upcoming:false,image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",desc:"Washed oversized tee with subtle distressed detailing."}
];
let cart=JSON.parse(localStorage.getItem("sajid_cart")||"[]");
let orders=JSON.parse(localStorage.getItem("sajid_orders")||"[]");
let logged=localStorage.getItem("sajid_logged")==="true";
function save(){localStorage.setItem("sajid_cart",JSON.stringify(cart));localStorage.setItem("sajid_orders",JSON.stringify(orders));}
function money(n){return "$"+n.toFixed(2)}
function renderProducts(list=products){
 document.getElementById("productsGrid").innerHTML=list.map(p=>`<article class="product" data-name="${p.name.toLowerCase()} ${p.cat}"><div class="product-image" data-preview="true"><img src="${p.image}" alt="${p.name}">${p.new?'<span class="tag">NEW</span>':''}${p.sale?'<span class="tag sale" style="top:45px">SALE</span>':''}${p.upcoming?'<span class="tag upcoming-tag" style="top:75px">UPCOMING</span>':''}</div><div class="product-body"><span class="cat">${p.cat}</span><h3>${p.name}</h3><p class="desc">${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span>${p.sale?`<span class="old">${money(p.old)}</span>`:""}</div><div class="product-actions"><button class="bag-add" onclick="addToCart('${p.id}')">＋ Add Bag</button><button class="buy-now" onclick="buyNow('${p.id}')">Buy Now</button></div></div></article>`).join("");
}
function goHome(){
  showSection("shop");
  const allBtn = document.querySelector(".chip");
  if(allBtn) filterCategory("all", allBtn);
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));
  document.getElementById("homeBtn").classList.add("active");
}
function showCollection(){
  showSection("shop");
  const allBtn = document.querySelector(".chip");
  if(allBtn) filterCategory("all", allBtn);
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));
  const collectionBtn = document.querySelectorAll(".nav-btn")[1];
  if(collectionBtn) collectionBtn.classList.add("active");
  setTimeout(scrollToProducts, 50);
}
function filterCategory(cat,btn){
 document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active");
 let list=products;
 if(cat==="pants"||cat==="shirts"||cat==="tshirts") list=products.filter(p=>p.cat===cat);
 else if(cat==="discount") list=products.filter(p=>p.sale);
 else if(cat==="new") list=products.filter(p=>p.new);
 else if(cat==="upcoming") list=products.filter(p=>p.upcoming);
 renderProducts(list);
}
function searchProducts(){const q=document.getElementById("search").value.toLowerCase().trim();renderProducts(products.filter(p=>(p.name+" "+p.cat+" "+p.desc).toLowerCase().includes(q)))}
function scrollToProducts(){document.querySelector(".content").scrollIntoView({behavior:"smooth"})}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;const row=cart.find(x=>x.id===id);if(row)row.qty++;else cart.push({id,qty:1});save();renderCart();toast("Added to your bag.");}
function buyNow(id){
 const p=products.find(x=>x.id===id);
 if(!p)return;
 addToCart(id);
 showBuyPreview(p);
 document.getElementById("cartDrawer").classList.remove("hidden");
}
function renderCart(){
 const el=document.getElementById("cartItems"),count=cart.reduce((a,x)=>a+x.qty,0);document.getElementById("cartCount").textContent=count;
 if(!cart.length){el.innerHTML='<div style="text-align:center;color:#999;padding:60px 10px;font-size:12px">Your bag is empty.</div>';document.getElementById("cartTotal").textContent="$0.00";return}
 let total=0;el.innerHTML=cart.map(row=>{const p=products.find(x=>x.id===row.id);total+=p.price*row.qty;return`<div class="cart-row"><img src="${p.image}"><div class="cart-row-main"><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><b>${row.qty}</b><button onclick="changeQty('${p.id}',1)">＋</button></div></div><button class="remove" onclick="removeItem('${p.id}')">Remove</button></div>`}).join("");document.getElementById("cartTotal").textContent=money(total);
}
function changeQty(id,n){const r=cart.find(x=>x.id===id);if(!r)return;r.qty+=n;if(r.qty<=0)cart=cart.filter(x=>x.id!==id);save();renderCart()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function toggleCart() {document.getElementById("cartDrawer").classList.toggle("hidden")}
function showBuyPreview(p){
 const wrap=document.getElementById("buyPreview");
 document.getElementById("buyPreviewImage").src=p.image;
 document.getElementById("buyPreviewImage").alt=p.name;
 document.getElementById("buyPreviewName").textContent=p.name;
 document.getElementById("buyPreviewPrice").textContent=money(p.price);
 wrap.classList.remove("hidden");
}
function checkout(){if(!cart.length){toast("Your bag is empty.");return}if(!logged){openAuth();return}let total=cart.reduce((sum,r)=>sum+products.find(p=>p.id===r.id).price*r.qty,0);orders.unshift({id:"ORD-"+Math.floor(10000+Math.random()*90000),date:new Date().toLocaleDateString(),total,items:cart.map(r=>({name:products.find(p=>p.id===r.id).name,qty:r.qty,price:products.find(p=>p.id===r.id).price})),status:"Processing"});cart=[];save();renderCart();toggleCart();renderOrders();showSection("orders");toast("Order placed successfully!")}
function renderOrders(){const el=document.getElementById("ordersList");if(!orders.length){el.innerHTML='<div class="order-card" style="text-align:center;color:#999">No orders yet.</div>';return}el.className="orders-list";el.innerHTML=orders.map(o=>`<article class="order-card"><div class="order-top"><div><div class="order-id">${o.id}</div><small>${o.date}</small></div><b>${money(o.total)}</b></div><div class="order-products">${o.items.map(i=>`<div>${i.qty}× ${i.name} — ${money(i.price*i.qty)}</div>`).join("")}</div><div class="status">● ${o.status}</div></article>`).join("")}
function showSection(id){document.querySelectorAll("main .section").forEach(x=>x.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));const buttons=[...document.querySelectorAll(".nav-btn")];const map={shop:0,lookbooks:1,orders:2};if(map[id]!==undefined)buttons[map[id]].classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function openAuth(){document.getElementById("authModal").classList.remove("hidden");showLogin()}
function closeAuth(){document.getElementById("authModal").classList.add("hidden")}
function showLogin(){document.getElementById("loginForm").classList.remove("hidden");document.getElementById("registerForm").classList.add("hidden")}
function showRegister(){document.getElementById("loginForm").classList.add("hidden");document.getElementById("registerForm").classList.remove("hidden")}
function login(){const u=document.getElementById("loginUser").value.trim(),p=document.getElementById("loginPass").value;if(!u||!p){alert("Enter username/Gmail and password.");return}logged=true;localStorage.setItem("sajid_logged","true");localStorage.setItem("sajid_user",u);updateProfile();closeAuth();toast("Signed in successfully.");}
function register(){const u=document.getElementById("regUser").value.trim(),e=document.getElementById("regEmail").value.trim(),p=document.getElementById("regPass").value,c=document.getElementById("regConfirm").value;if(!u||!e||!p||!c){alert("Please fill in all fields.");return}if(p!==c){alert("Passwords do not match.");return}logged=true;localStorage.setItem("sajid_logged","true");localStorage.setItem("sajid_user",u);localStorage.setItem("sajid_email",e);updateProfile();closeAuth();toast("Account created.");}
function logout(){logged=false;localStorage.removeItem("sajid_logged");localStorage.removeItem("sajid_user");localStorage.removeItem("sajid_email");document.getElementById("profileMenu").classList.add("hidden");updateProfile();toast("Signed out.")}
function toggleProfile(){document.getElementById("profileMenu").classList.toggle("hidden");}
function updateProfile(){const u=localStorage.getItem("sajid_user")||"Sign In",email=localStorage.getItem("sajid_email")||"Not signed in";document.getElementById("profileName").textContent=logged?u:"Sign In";document.getElementById("avatar").textContent=logged?u[0].toUpperCase():"S";document.getElementById("menuUser").textContent=logged?u:"Guest";document.getElementById("menuEmail").textContent=logged?email:"Not signed in"}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),2500)}
renderProducts();renderCart();renderOrders();updateProfile();goHome();

let viewerScale=1;
let viewerX=0, viewerY=0;
let viewerDragging=false;
let viewerDragStartX=0, viewerDragStartY=0;
let pinchStartDistance=0;
let pinchStartScale=1;

function openImageViewer(src,name){
  viewerScale=1; viewerX=0; viewerY=0;
  const modal=document.getElementById("imageViewer");
  const img=document.getElementById("viewerImage");
  img.src=src; img.alt=name;
  document.getElementById("viewerName").textContent=name;
  modal.classList.remove("hidden");
  document.body.style.overflow="hidden";
  updateImageZoom();
}
function closeImageViewer(){
  document.getElementById("imageViewer").classList.add("hidden");
  document.body.style.overflow="";
  document.getElementById("viewerImage").src="";
}
function zoomImage(delta){
  viewerScale=Math.min(4,Math.max(.6,viewerScale+delta));
  if(viewerScale<=1){viewerX=0;viewerY=0;}
  updateImageZoom();
}
function resetImageZoom(){viewerScale=1;viewerX=0;viewerY=0;updateImageZoom()}
function updateImageZoom(){
  document.getElementById("viewerImage").style.transform=`translate(${viewerX}px,${viewerY}px) scale(${viewerScale})`;
  document.getElementById("zoomLabel").textContent=Math.round(viewerScale*100)+"%";
}

document.getElementById("productsGrid").addEventListener("click",e=>{
  const preview=e.target.closest(".product-image[data-preview=\"true\"]");
  if(!preview) return;
  const img=preview.querySelector("img");
  if(img) openImageViewer(img.src,img.alt);
});

document.getElementById("imageViewer").addEventListener("click",e=>{
  if(e.target.id==="imageViewer") closeImageViewer();
});

document.getElementById("viewerImage").addEventListener("wheel",e=>{
  e.preventDefault();
  zoomImage(e.deltaY<0?0.15:-0.15);
},{passive:false});

const viewerImage=document.getElementById("viewerImage");
viewerImage.addEventListener("mousedown",e=>{
  if(viewerScale<=1)return;
  viewerDragging=true;
  viewerDragStartX=e.clientX-viewerX;
  viewerDragStartY=e.clientY-viewerY;
  e.preventDefault();
});
document.addEventListener("mousemove",e=>{
  if(!viewerDragging)return;
  viewerX=e.clientX-viewerDragStartX;
  viewerY=e.clientY-viewerDragStartY;
  updateImageZoom();
});
document.addEventListener("mouseup",()=>viewerDragging=false);

function touchDistance(a,b){
  const dx=a.clientX-b.clientX,dy=a.clientY-b.clientY;
  return Math.hypot(dx,dy);
}
function touchMidpoint(a,b){
  return {x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2};
}
viewerImage.addEventListener("touchstart",e=>{
  if(e.touches.length===2){
    pinchStartDistance=touchDistance(e.touches[0],e.touches[1]);
    pinchStartScale=viewerScale;
    viewerDragging=false;
    return;
  }
  if(e.touches.length===1 && viewerScale>1){
    viewerDragging=true;
    viewerDragStartX=e.touches[0].clientX-viewerX;
    viewerDragStartY=e.touches[0].clientY-viewerY;
  }
},{passive:true});
viewerImage.addEventListener("touchmove",e=>{
  e.preventDefault();
  if(e.touches.length===2){
    const ratio=touchDistance(e.touches[0],e.touches[1])/Math.max(1,pinchStartDistance);
    viewerScale=Math.min(4,Math.max(.6,pinchStartScale*ratio));
    if(viewerScale<=1){viewerX=0;viewerY=0;}
    updateImageZoom();
    return;
  }
  if(e.touches.length===1 && viewerDragging){
    viewerX=e.touches[0].clientX-viewerDragStartX;
    viewerY=e.touches[0].clientY-viewerDragStartY;
    updateImageZoom();
  }
},{passive:false});
viewerImage.addEventListener("touchend",e=>{
  if(e.touches.length===0){viewerDragging=false;pinchStartDistance=0;}
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeImageViewer();
  if(document.getElementById("imageViewer").classList.contains("hidden"))return;
  if(e.key==="+")zoomImage(0.15);
  if(e.key==="-")zoomImage(-0.15);
  if(e.key==="0")resetImageZoom();
});
