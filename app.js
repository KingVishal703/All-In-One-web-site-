let DB=[];
let current=[];

fetch("data.json")
.then(r=>r.json())
.then(d=>{
  DB=d;
  load("anime");
});

function load(type){
current=DB.filter(x=>x.category===type);
render(current);
}

function render(list){
let html="";
list.forEach(item=>{
html+=`
<div class="card">
<img src="${item.image}">
<h3>${item.title}</h3>
<div class="button" onclick="verify('${encodeURIComponent(item.token)}')">
Verify & Unlock
</div>
</div>`;
});
grid.innerHTML=html;
}

function verify(link){
window.location="verify.html?link="+link;
}

function searchContent(){
let q=search.value.toLowerCase();
let f=current.filter(x=>x.title.toLowerCase().includes(q));
render(f);
}
