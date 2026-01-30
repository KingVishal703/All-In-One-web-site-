let DB=[];
let current=[];
let unlocked=false;

fetch("data.json")
.then(r=>r.json())
.then(d=>{
DB=d;
load("anime",document.querySelector(".tabs button"));
setTimeout(showPopup,5000);
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
<div class="card" onclick="openDetails(${i})">
<img src="${item.image}">
<h3>${item.title}</h3>
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

function showPopup(){
if(unlocked) return;

popup.style.display="flex";
}

function watchAd(){
popup.innerHTML="<h2>Watching Ad...</h2>";
setTimeout(()=>{
popup.style.display="none";
unlocked=true;
},5000);
}
