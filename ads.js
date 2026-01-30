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
if(!ADS.popup) return;int-22034
/* paste popup ad here */
}

// VERIFY INTERSTITIAL
function runVerifyInterstitial(){
if(!ADS.verifyInterstitial) return;int-22035
/* paste verify ad here */
}

// REWARD AD
function runRewardAd(callback){
if(!ADS.reward){
callback();
return;
}
  22036
/* paste reward ad here */
setTimeout(callback,3000);
}

// AUTO AD
function startAutoAds(){
if(!ADS.auto) return;
setInterval(()=>{
  int-22037
/* paste auto ad here */
},ADS.autoInterval);
}
