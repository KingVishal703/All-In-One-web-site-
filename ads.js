const ADS = {
popup:true,
verifyInterstitial:true,
reward:true,
auto:true,
autoInterval:600000 // 10 min (edit here)
};

/* ===========================
   🔥 PASTE AD CODES BELOW
=========================== */

// POPUP AD
function runPopupAd(){
if(!ADS.popup) return;

/* paste popup ad code */

}

// VERIFY INTERSTITIAL
function runVerifyInterstitial(){
if(!ADS.verifyInterstitial) return;

/* paste verify interstitial code */

}

// REWARD AD
function runRewardAd(callback){
if(!ADS.reward){
callback();
return;
}

/* paste reward ad code */

setTimeout(callback,3000); // fallback
}

// AUTO INTERSTITIAL
function startAutoAds(){
if(!ADS.auto) return;

setInterval(()=>{
/* paste auto ad code */
},ADS.autoInterval);
}
