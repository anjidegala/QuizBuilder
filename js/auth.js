function role(r){
  window.loginRole=r;
  const userTab=document.getElementById("ut"), adminTab=document.getElementById("at");
  if(userTab) userTab.classList.toggle("on",r==="user");
  if(adminTab) adminTab.classList.toggle("on",r==="admin");
  const demo=document.getElementById("demo");
  if(demo) demo.innerHTML=r==="user"?'Demo User: <b>student</b> / <b>1234</b>':'Demo Admin: <b>admin</b> / <b>admin123</b>';
}
function login(e){
  e.preventDefault();
  const u=document.getElementById("u").value.trim();
  const p=document.getElementById("p").value;
  const r=window.loginRole||"user";
  let ok=false;
  if(r==="admin") ok=(u==="admin" && p==="admin123");
  else {
    ok=(u==="student" && p==="1234");
    const saved=JSON.parse(localStorage.getItem("quizUsers")||"[]");
    ok=ok || saved.some(x=>x.username===u && x.password===p);
  }
  const err=document.getElementById("err");
  if(!ok){ if(err) err.textContent="Invalid username or password"; return; }
  localStorage.setItem("logged","yes");
  localStorage.setItem("role",r);
  localStorage.setItem("currentUser",u);
  location.href=r==="admin"?"admin-dashboard.html":"user-dashboard.html";
}
function signup(e){
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const username=document.getElementById("su").value.trim();
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("sp").value;
  const confirm=document.getElementById("cp").value;
  const msg=document.getElementById("signupMsg");
  if(password!==confirm){msg.textContent="Passwords do not match.";msg.className="error-msg";return;}
  const users=JSON.parse(localStorage.getItem("quizUsers")||"[]");
  if(users.some(x=>x.username.toLowerCase()===username.toLowerCase())){
    msg.textContent="Username already exists. Please choose another.";
    msg.className="error-msg"; return;
  }
  users.push({name,username,email,password,createdAt:new Date().toISOString()});
  localStorage.setItem("quizUsers",JSON.stringify(users));
  msg.textContent="Account created successfully! Redirecting to login...";
  msg.className="success-msg";
  setTimeout(()=>location.href="login.html",900);
}
function guard(r){
  if(localStorage.getItem("logged")!=="yes" || localStorage.getItem("role")!==r) location.href="login.html";
}
function logout(){
  localStorage.removeItem("logged");
  localStorage.removeItem("role");
  localStorage.removeItem("currentUser");
  location.href="login.html";
}
window.loginRole="user";
