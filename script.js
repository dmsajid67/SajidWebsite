let loggedIn = localStorage.getItem("loggedIn") === "true";
let pendingFile = null;

function openLogin(){document.getElementById("authModal").classList.remove("hidden");showLogin()}
function closeAuth(){document.getElementById("authModal").classList.add("hidden");pendingFile=null}
function outsideClose(e){if(e.target.id==="authModal")closeAuth()}
function showLogin(){document.getElementById("loginForm").classList.remove("hidden");document.getElementById("registerForm").classList.add("hidden")}
function showRegister(){document.getElementById("loginForm").classList.add("hidden");document.getElementById("registerForm").classList.remove("hidden")}

function downloadFile(path){
  if(loggedIn){startDownload(path);return}
  pendingFile=path;
  openLogin();
}

function startDownload(path){
  const a=document.createElement("a");
  a.href=path;
  a.download="";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function login(){
  const user=document.getElementById("loginUser").value.trim();
  const password=document.getElementById("loginPassword").value;
  if(!user||!password){alert("Please enter username/Gmail and password.");return}
  localStorage.setItem("loggedIn","true");
  localStorage.setItem("username",user);
  loggedIn=true;
  const file=pendingFile;
  pendingFile=null;
  closeAuth();
  updateUI();
  alert("Login successful!");
  if(file)startDownload(file);
}

function register(){
  const username=document.getElementById("registerUsername").value.trim();
  const email=document.getElementById("registerEmail").value.trim();
  const password=document.getElementById("registerPassword").value;
  const confirm=document.getElementById("registerConfirm").value;
  if(!username||!email||!password||!confirm){alert("Please fill in all fields.");return}
  if(password!==confirm){alert("Passwords do not match!");return}
  localStorage.setItem("loggedIn","true");
  localStorage.setItem("username",username);
  localStorage.setItem("email",email);
  loggedIn=true;
  const file=pendingFile;
  pendingFile=null;
  closeAuth();
  updateUI();
  alert("Account created successfully!");
  if(file)startDownload(file);
}

function logout(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  loggedIn=false;
  updateUI();
  alert("You have been logged out.");
}

function updateUI(){
  document.getElementById("loginNavBtn").classList.toggle("hidden",loggedIn);
  document.getElementById("logoutNavBtn").classList.toggle("hidden",!loggedIn);
}

function searchItems(){
  const q=document.getElementById("searchInput").value.toLowerCase().trim();
  document.querySelectorAll(".searchable").forEach(item=>{
    item.style.display=item.dataset.name.toLowerCase().includes(q)?"":"none";
  });
}

updateUI();
