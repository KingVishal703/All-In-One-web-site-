const ADS = {
homeInterstitial:true,
verifyInterstitial:true,
reward:true,
autoInterval:600000 // 10 min
};

/* ===== PASTE YOUR BLOCK IDS HERE ===== */
const IDS = {
home:"int-22046",      // int-XXXXX
verify:"int-22056",    // int-XXXXX
reward:"22055"     // XXXXX
};

let homeAd=null;
let verifyAd=null;
let rewardAd=null;

function safeInit(id){
if(!id || id.trim()==="") return null;
try{
return window.Adsgram.init({blockId:id});
}catch(e){
console.log("Ad init failed:",e);
return null;
}
}

window.addEventListener("load",()=>{

if(window.Adsgram){
homeAd = safeInit(IDS.home);
verifyAd = safeInit(IDS.verify);
rewardAd = safeInit(IDS.reward);
}

});

/* ===== HOME INTERSTITIAL ===== */
function runHomeAd(){
if(!ADS.homeInterstitial || !homeAd) return;
homeAd.show().catch(()=>{});
}

/* ===== VERIFY INTERSTITAL ===== */
function runVerifyAd(){
if(!ADS.verifyInterstitial || !verifyAd) return;
verifyAd.show().catch(()=>{});
}

/* ===== REWARD AD ===== */
function runReward(callback){
if(!ADS.reward || !rewardAd){
callback();
return;
}

rewardAd.show()
.then(()=>callback())
.catch(()=>callback());
}

/* ===== AUTO LOOP ===== */
function startAutoHomeAds(){
if(!ADS.homeInterstitial) return;

setInterval(()=>{
runHomeAd();
},ADS.autoInterval);
}
