let DB=[];

fetch("data.json")
.then(r=>r.json())
.then(d=>DB=d);

function loadCategory(cat){
let items=DB.filter(x=>x.category===cat);

let html="";
items.forEach(item=>{
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
