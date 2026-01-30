const SUB={
anime:["All","Series","Movies","OVA"],
movies:["All","Hollywood","Bollywood","Tollywood"],
adult:["All","Desi","English","Cosplay","Japanese"]
};

const SECOND_POPUP_DELAY=2*60*60*1000;

let DB=[];
let current=[];
let activeCategory="anime";
let activeSub="All";

fetch("data.json")
.then(r=>r.json())
.then(d=>{
DB=d;
loadCategory("anime",document.querySelector(".tabs button"));
checkPopup();
});

// category
function loadCategory(cat,btn){
activeCategory=cat;
activeSub="All";

document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

renderSubTabs();
filterData();
}

// subtabs
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

// filter
function filterData(){
current=DB.filter(x=>{
return x.category===activeCategory &&
(activeSub==="All" || x.sub===activeSub);
});
render(current);
}

// render
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

// details
function openDetails(i){
let d=current[i];

history.pushState({modal:true},"");

details.innerHTML=`
<div class="modal-box">
<div class="back-btn" onclick="closeDetails()">←</div>
<img src="${d.image}">
<h2>${d.title}</h2>

<p>🌐 Season - ${d.season}</p>
<p>📀 Total Episode - ${d.episodes}</p>
<p>⭐ Quality - ${d.quality}</p>
<p>🎧 Language - ${d.language}</p>
<p>⚡ Genre - ${d.genre}</p>

<div class="button" onclick="verify('${encodeURIComponent(d.token)}')">Watch Now</div>
<div class="cancel" onclick="closeDetails()">Back</div>
</div>
`;

details.style.display="block";
}

// close modal
function closeDetails(){
details.style.display="none";
history.back();
}

// verify
function verify(link){
window.location="verify.html?link="+link;
}

// GLOBAL SEARCH
function searchContent(){
let q=search.value.toLowerCase();

let f=DB.filter(x=>x.title.toLowerCase().includes(q));
current=f;
render(f);
}

// popup logic
function today(){return new Date().toDateString();}

function checkPopup(){
let data=JSON.parse(localStorage.getItem("popupData")||"{}");
let now=Date.now();

if(data.day!==today()){
data={day:today(),count:0,last:0};
}

if(data.count===0 || (data.count===1 && now-data.last>SECOND_POPUP_DELAY)){
popup.style.display="flex";
data.count++;
data.last=now;
localStorage.setItem("popupData",JSON.stringify(data));
}
}

function watchAd(){
popup.innerHTML="<h2>Watching Ad...</h2>";
setTimeout(()=>popup.style.display="none",5000);
}

// BACK FIX
window.onpopstate=function(){
if(details.style.display==="block"){
details.style.display="none";
}
};
