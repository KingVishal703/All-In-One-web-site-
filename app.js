const SUB={
anime:["All","Series","Movies","OVA"],
movies:["All","Hollywood","Bollywood","Tollywood"],
adult:["All","Desi","English","Cosplay","Japanese"]
};

let DB=[];
let current=[];
let activeCategory="anime";
let activeSub="All";

fetch("data.json")
.then(r=>r.json())
.then(d=>{
DB=d;
loadCategory("anime",document.querySelector(".tabs button"));
startAutoAds();
checkDeepLink();
});

function checkDeepLink(){
let params=new URLSearchParams(location.search);
let id=params.get("id");
if(!id) return;
let index=DB.findIndex(x=>x.id==id);
if(index!==-1){
current=[DB[index]];
openDetails(0);
}
}

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
history.pushState({modal:true},"");

details.innerHTML=`
<div class="modal-box">

<div class="topbar">
<div class="topbtn" onclick="closeDetails()">← Back</div>
<div class="topbtn" onclick="shareItem('${d.id}')">Share</div>
</div>

<img src="${d.image}">
<h2 style="padding:10px">${d.title}</h2>

<p style="padding:0 10px">🌐 Season - ${d.season}</p>
<p style="padding:0 10px">📀 Total Episode - ${d.episodes}</p>
<p style="padding:0 10px">⭐ Quality - ${d.quality}</p>
<p style="padding:0 10px">🎧 Language - ${d.language}</p>
<p style="padding:0 10px">⚡ Genre - ${d.genre}</p>

<div class="button" onclick="verify('${encodeURIComponent(d.token)}')">Watch Now</div>
<div class="cancel" onclick="closeDetails()">Back</div>

</div>
`;

details.style.display="block";
}

function closeDetails(){
details.style.display="none";
history.back();
}

function shareItem(id){
let link=location.origin+location.pathname+"?id="+id;
navigator.clipboard.writeText(link);
showToast("Share link copied!");
}

function showToast(msg){
toast.innerText=msg;
toast.style.display="block";
setTimeout(()=>toast.style.display="none",2000);
}

function verify(link){
runVerifyInterstitial();
window.location="verify.html?link="+link;
}

function searchContent(){
let q=search.value.toLowerCase();
let f=DB.filter(x=>x.title.toLowerCase().includes(q));
current=f;
render(f);
}

window.onpopstate=function(){
if(details.style.display==="block"){
details.style.display="none";
}
};
