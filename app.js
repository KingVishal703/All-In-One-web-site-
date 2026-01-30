const AD_ENABLED = true;
const DAILY_LIMIT = 2;

let DB=[];
let current=[];

fetch("data.json")
.then(r=>r.json())
.then(d=>{
DB=d;
load("anime",document.querySelector(".tabs button"));
checkAdPopup();
});

function load(type,btn){
document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

current=DB.filter(x=>x.category===type);
render(current);
}

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

function openDetails(i){
let d=current[i];

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

<div class="cancel" onclick="closeDetails()">Cancel</div>
</div>
`;

details.style.display="flex";
}

function closeDetails(){
details.style.display="none";
}

function verify(link){
window.location="verify.html?link="+link;
}

function searchContent(){
let q=search.value.toLowerCase();
let f=current.filter(x=>x.title.toLowerCase().includes(q));
render(f);
}

function getToday(){
return new Date().toISOString().split("T")[0];
}

function checkAdPopup(){
if(!AD_ENABLED) return;

let data=JSON.parse(localStorage.getItem("adData")||"{}");
let today=getToday();

if(data.date!==today){
data={date:today,count:0};
}

if(data.count<DAILY_LIMIT){
popup.style.display="flex";
data.count++;
localStorage.setItem("adData",JSON.stringify(data));
}
}

function watchAd(){
popup.innerHTML="<h2>Watching Ad...</h2>";
setTimeout(()=>popup.style.display="none",5000);
}
