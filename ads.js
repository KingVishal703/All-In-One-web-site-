const ADS = {
homeInterstitial:true,
verifyInterstitial:true,
reward:true,
autoInterval:600000 // 10 min
};

/* ===== YOUR BLOCK IDS ===== */
const IDS = {
home:"int-22046",
verify:"int-22056",
reward:"22055"
};

let homeAd=null;
let verifyAd=null;
let rewardAd=null;

/* ============================= */
/* WAIT UNTIL ADSGRAM LOADS */
/* ============================= */

function waitForAdsgram(callback){
let tries=0;

let timer=setInterval(()=>{
tries++;

if(window.Adsgram){
clearInterval(timer);
callback();
}

if(tries>20){
clearInterval(timer);
console.log("Adsgram failed to load");
}
},300);
}

/* ============================= */
/* INIT ADS SAFELY */
/* ============================= */

function initAds(){

function safe(id){
try{
return window.Adsgram.init({blockId:id});
}catch(e){
console.log("Ad init error:",id,e);
return null;
}
}

homeAd = safe(IDS.home);
verifyAd = safe(IDS.verify);
rewardAd = safe(IDS.reward);

console.log("Ads initialized");
}

/* start waiting */
waitForAdsgram(initAds);

/* ============================= */
/* HOME INTERSTITIAL */
/* ============================= */

function runHomeAd(){
if(!ADS.homeInterstitial || !homeAd) return;

homeAd.show()
.then(()=>console.log("Home ad done"))
.catch(()=>console.log("Home ad error"));
}

/* ============================= */
/* VERIFY INTERSTITIAL */
/* ============================= */

function runVerifyAd(){
if(!ADS.verifyInterstitial || !verifyAd) return;

verifyAd.show()
.then(()=>console.log("Verify ad done"))
.catch(()=>console.log("Verify ad error"));
}

/* ============================= */
/* REWARD AD */
/* ============================= */

function runReward(callback){
if(!ADS.reward || !rewardAd){
callback();
return;
}

rewardAd.show()
.then(()=>{
console.log("Reward success");
callback();
})
.catch(()=>{
console.log("Reward error");
callback();
});
}

/* ============================= */
/* AUTO LOOP */
/* ============================= */

function startAutoHomeAds(){
if(!ADS.homeInterstitial) return;

setInterval(()=>{
runHomeAd();
},ADS.autoInterval);
}
