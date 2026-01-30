const ADS = {
popup:true,
verifyInterstitial:true,
reward:true,
auto:true,
autoInterval:600000 // edit time here
};

/* ========= PASTE ADSGRAM CODE BELOW ========= */

// POPUP AD
function runPopupAd(){
if(!ADS.popup) return;
/* paste popup ad here */
}

// VERIFY INTERSTITIAL
function runVerifyInterstitial(){
if(!ADS.verifyInterstitial) return;
/* paste verify ad here */
}

// REWARD AD
function runRewardAd(callback){
if(!ADS.reward){
callback();
return;
}
/* paste reward ad here */
setTimeout(callback,3000);
}

// AUTO AD
function startAutoAds(){
if(!ADS.auto) return;
setInterval(()=>{
/* paste auto ad here */
},ADS.autoInterval);
}
