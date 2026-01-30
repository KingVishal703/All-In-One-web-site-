const SUB={
anime:["All","Series","Movies","OVA"],
movies:["All","Hollywood","Bollywood","Tollywood"],
adult:["All","Desi","English","Cosplay","Japanese"]
};

let DB=[];
let current=[];
let activeCategory="anime";
let activeSub="All";

// fallback data (so app never blank)
const FALLBACK=[
{
id:"demo1",
title:"Demo Content",
image:"https://via.placeholder.com/300x400?text=Demo",
category:"anime",
sub:"All",
season:"1",
token:"#"
}
];

fetch("data.json")
.then(r=>{
if(!r.ok) throw "missing";
return r.json();
})
.then(d=>{
DB=d;
startApp();
})
.catch(()=>{
console.log("data.json missing — using fallback");
DB=FALLBACK;
startApp();
});

function startApp(){
loadCategory("anime",document.querySelector(".tabs button"));
runHomeAd();
startAutoHomeAds();
}

// ----------------------------

function loadCategory(cat,btn){
activeCategory=cat;
activeSub="All";

document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

renderSubTabs();
filterData();
}

function renderSubTabs(){
let html="";
SUB[activeCategory].forEach(name=>{
html+=`<button onclick="setSub('${name}',this)" ${name==="All"?'class="active"':''}>${name}</button>`;
});
subtabs.innerHTML=html;
}

function setSub(name,btn){
activeSub=name;
document.querySelectorAll(".subtabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
filterData();
}

function filterData(){
current=DB.filter(x=>{
return x.category===activeCategory &&
(activeSub==="All" || x.sub===activeSub);
});
render(current);
}

function render(list){
if(!list.length){
grid.innerHTML=`<h3 style="padding:20px;color:#777">No content</h3>`;
return;
}

let html="";
list.forEach((item,i)=>{
html+=`
<div class="card">
<img src="${item.image}" onclick="openDetails(${i})">
<h3>${item.title}</h3>
<div class="button" onclick="verify('${encodeURIComponent(item.token)}')">Watch Now</div>
</div>`;
});
grid.innerHTML=html;
}

function openDetails(i){
let d=current[i];

details.innerHTML=`
<div class="modal-box">
<div class="topbar">
<div class="topbtn" onclick="closeDetails()">← Back</div>
</div>

<img src="${d.image}">
<h2 style="padding:10px">${d.title}</h2>

<div class="button" onclick="verify('${encodeURIComponent(d.token)}')">Watch Now</div>
</div>
`;

details.style.display="block";
}

function closeDetails(){
details.style.display="none";
}

function verify(link){
window.location="verify.html?link="+link;
}
