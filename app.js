const AD_ENABLED = true;
const SECOND_POPUP_DELAY = 2 * 60 * 60 * 1000; // 2 hours

let DB=[];
let current=[];
let activeCategory="anime";

fetch("data.json")
.then(r=>r.json())
.then(d=>{
DB=d;
loadCategory("anime",document.querySelector(".tabs button"));
checkPopup();
});

function loadCategory(cat,btn){
activeCategory=cat;
document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

current=DB.filter(x=>x.category===cat);
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

details.style.display="block";
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

function today(){
return new Date().toDateString();
}

function checkPopup(){
if(!AD_ENABLED) return;

let data=JSON.parse(localStorage.getItem("popupData")||"{}");
let now=Date.now();

if(data.day!==today()){
data={day:today(),count:0,last:0};
}

if(data.count===0){
showPopup(data);
}
else if(data.count===1 && now-data.last>SECOND_POPUP_DELAY){
showPopup(data);
}

localStorage.setItem("popupData",JSON.stringify(data));
}

function showPopup(data){
popup.style.display="flex";
data.count++;
data.last=Date.now();
localStorage.setItem("popupData",JSON.stringify(data));
}

function watchAd(){
popup.innerHTML="<h2>Watching Ad...</h2>";
setTimeout(()=>popup.style.display="none",5000);
}
