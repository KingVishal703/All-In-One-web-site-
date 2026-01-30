let DB = [];
let current = [];

fetch("data.json")
.then(res=>res.json())
.then(data=>{
  DB=data;
  load("anime");
});

function load(type){
current = DB.filter(x=>x.category===type);
render(current);
}

function render(list){
let html="";
list.forEach(item=>{
html+=`
<div class="card">
<img src="${item.image}">
<h3>${item.title}</h3>
<div class="button" onclick="verify('${item.token}')">
Verify & Unlock
</div>
</div>`;
});
document.getElementById("grid").innerHTML=html;
}

function verify(token){
window.location="verify.html?token="+token;
}

function searchContent(){
let q=document.getElementById("search").value.toLowerCase();
let filtered=current.filter(x=>x.title.toLowerCase().includes(q));
render(filtered);
}
