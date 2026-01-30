// SUB CATEGORY CONFIG
const SUB = {
anime:["All","Series","Movies","OVA"],
movies:["All","Hollywood","Bollywood","Tollywood"],
adult:["All","Desi","English","Cosplay","Japanese"]
};

let DB=[];
let current=[];
let activeCategory="anime";
let activeSub="All";

// load database
fetch("data.json")
.then(r=>r.json())
.then(d=>{
DB=d;
loadCategory("anime",document.querySelector(".tabs button"));
});

// main category
function loadCategory(cat,btn){
activeCategory=cat;
activeSub="All";

document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

renderSubTabs();
filterData();
}

// create sub buttons
function renderSubTabs(){
let html="";
SUB[activeCategory].forEach(name=>{
html+=`<button onclick="setSub('${name}',this)" ${name==="All"?'class="active"':''}>${name}</button>`;
});
subtabs.innerHTML=html;
}

// sub filter
function setSub(name,btn){
activeSub=name;
document.querySelectorAll(".subtabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
filterData();
}

// filter database
function filterData(){
current=DB.filter(x=>{
return x.category===activeCategory &&
(activeSub==="All" || x.sub===activeSub);
});
render(current);
}

// render grid
function render(list){
let html="";
list.forEach((item,i)=>{
html+=`
<div class="card">
<img src="${item.image}" onclick="openDetails(${i})">
<h3>${item.title}</h3>
<div class="button" onclick="verify('${encodeURIComponent(item.token)}')">
Watch Now
</div>
</div>`;
});
grid.innerHTML=html;
}

// details modal
function openDetails(i){
let d=current[i];

history.pushState({modal:true},"");

details.innerHTML=`
<div class="modal-box">
<img src="${d.image}">
<h2>${d.title}</h2>

<p>🌐 Season - ${d.season}</p>
<p>📀 Total Episode - ${d.episodes}</p>
<p>⭐ Quality - ${d.quality}</p>
<p>🎧 Language - ${d.language}</p>
<p>⚡ Genre - ${d.genre}</p>

<div class="button" onclick="verify('${encodeURIComponent(d.token)}')">
Watch Now
</div>

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

// search
function searchContent(){
let q=search.value.toLowerCase();
let f=current.filter(x=>x.title.toLowerCase().includes(q));
render(f);
}

// BACK BUTTON FIX
window.onpopstate=function(e){
if(details.style.display==="block"){
details.style.display="none";
}
};
