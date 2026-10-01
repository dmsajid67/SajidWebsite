const wallpapers=[
{name:"Sunset Nature",cat:"nature",type:"4K",image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=82",file:"sunset.svg"},
{name:"Deep Forest",cat:"nature",type:"HD",image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=82",file:"forest.svg"},
{name:"Blue Ocean",cat:"ocean",type:"4K",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82",file:"ocean.svg"},
{name:"Mountain View",cat:"mountain",type:"4K",image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=82",file:"mountain.svg"}];
const files=[{name:"Welcome File",type:"TXT",desc:"Text document",file:"welcome.txt"},{name:"Sample Guide",type:"PDF",desc:"PDF document",file:"guide.pdf"},{name:"File Pack",type:"ZIP",desc:"ZIP archive",file:"file-pack.zip"}];
let loggedIn=localStorage.getItem("sajid_logged_in")==="true",pendingFile=null;
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function wallpaperCard(x){return `<article class="card searchable" data-name="${esc(x.name)} ${esc(x.cat)}"><div class="thumb"><img src="${x.image}" alt="${esc(x.name)}"><span class="badge">${x.type}</span></div><div class="card-body"><h3>${esc(x.name)}</h3><p>${esc(x.cat)} wallpaper</p><button class="download-btn" onclick="downloadFile('${x.file}')">↓ Download</button></div></article>`}
function renderWallpapers(list=wallpapers){document.getElementById("wallpaperGrid").innerHTML=list.map(wallpaperCard).join("");document.getElementById("featuredGrid").innerHTML=wallpapers.map(wallpaperCard).join("")}
function renderFiles(){document.getElementById("fileGrid").innerHTML=files.map(x=>`<article class="file-card searchable" data-name="${esc(x.name)} ${esc(x.type)}"><div class="file-icon ${x.type.toLowerCase()}">${x.type}</div><div class="file-info"><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p></div><button class="file-download" onclick="downloadFile('${x.file}')">Download</button></article>`).join("")}
function switchTab(t){document.querySelectorAll(".tab").forEach(x=>x.classList.add("hidden"));document.getElementById("tab-"+t).classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"})}
function filterWallpapers(cat,btn){document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");renderWallpapers(cat==="all"?wallpapers:wallpapers.filter(x=>x.cat===cat))}
function handleSearch(){const q=document.getElementById("searchInput").value.toLowerCase().trim();document.querySelectorAll(".searchable").forEach(x=>x.style.display=x.dataset.name.toLowerCase().includes(q)?"":"none")}
function syncSearch(v){document.getElementById("searchInput").value=v;handleSearch();if(v.trim())switchTab("wallpapers")}
function openAuth(){document.getElementById("authModal").classList.remove("hidden");showLogin()}
function closeAuth(){document.getElementById("authModal").classList.add("hidden");pendingFile=null}
function showLogin(){document.getElementById("loginBox").classList.remove("hidden");document.getElementById("registerBox").classList.add("hidden")}
function showRegister(){document.getElementById("loginBox").classList.add("hidden");document.getElementById("registerBox").classList.remove("hidden")}
function updateAccount(){document.getElementById("accountLabel").textContent=loggedIn?(localStorage.getItem("sajid_user")||"Account"):"Sign In"}
function downloadFile(file){if(loggedIn){startDownload(file);return}pendingFile=file;openAuth()}
function startDownload(file){const a=document.createElement("a");a.href=file;a.download="";document.body.appendChild(a);a.click();a.remove()}
function login(){const u=document.getElementById("loginUser").value.trim(),p=document.getElementById("loginPassword").value;if(!u||!p){alert("Please enter username/Gmail and password.");return}localStorage.setItem("sajid_logged_in","true");localStorage.setItem("sajid_user",u);loggedIn=true;const f=pendingFile;pendingFile=null;closeAuth();updateAccount();alert("Login successful!");if(f)startDownload(f)}
function register(){const u=document.getElementById("registerUsername").value.trim(),e=document.getElementById("registerEmail").value.trim(),p=document.getElementById("registerPassword").value,c=document.getElementById("registerConfirm").value;if(!u||!e||!p||!c){alert("Please fill in all fields.");return}if(p!==c){alert("Passwords do not match!");return}localStorage.setItem("sajid_logged_in","true");localStorage.setItem("sajid_user",u);loggedIn=true;const f=pendingFile;pendingFile=null;closeAuth();updateAccount();alert("Account created!");if(f)startDownload(f)}
document.getElementById("authModal").addEventListener("click",e=>{if(e.target.id==="authModal")closeAuth()});
renderWallpapers();renderFiles();updateAccount();
