const ADS = {
popup:true,
verifyInterstitial:true,
reward:true,
auto:true,
autoInterval:600000
};

// POPUP AD
function runPopupAd(){
if(!ADS.popup) return;

const id = "int-22034";
console.log("Popup ad:", id);

/* paste Adsgram popup SDK call here */
}

// VERIFY INTERSTITIAL
function runVerifyInterstitial(){
if(!ADS.verifyInterstitial) return;

const id = "int-22035";
console.log("Verify ad:", id);

/* paste Adsgram verify SDK call here */
}

// REWARD AD
function runRewardAd(callback){
if(!ADS.reward){
callback();
return;
}

const id = "22036";
console.log("Reward ad:", id);

/* paste Adsgram reward SDK here */

setTimeout(callback,3000);
}

// AUTO AD
function startAutoAds(){
if(!ADS.auto) return;

setInterval(()=>{
const id = "int-22037";
console.log("Auto ad:", id);

/* paste auto SDK here */

},ADS.autoInterval);
}
