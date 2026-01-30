const ADS = {
popup:true,
verifyInterstitial:true,
reward:true,
auto:true,
autoInterval:600000
};

// load SDK once
let popupAd = null;
let verifyAd = null;
let rewardAd = null;
let autoAd = null;

window.addEventListener("load", () => {

if(window.Adsgram){

popupAd = window.Adsgram.init({ blockId: "int-22034" });
verifyAd = window.Adsgram.init({ blockId: "int-22035" });
rewardAd = window.Adsgram.init({ blockId: "22036" });
autoAd = window.Adsgram.init({ blockId: "int-22037" });

}

});

// POPUP
function runPopupAd(){
if(!ADS.popup || !popupAd) return;

popupAd.show().catch(()=>{});
}

// VERIFY
function runVerifyInterstitial(){
if(!ADS.verifyInterstitial || !verifyAd) return;

verifyAd.show().catch(()=>{});
}

// REWARD
function runRewardAd(callback){
if(!ADS.reward || !rewardAd){
callback();
return;
}

rewardAd.show()
.then(()=>callback())
.catch(()=>callback());
}

// AUTO
function startAutoAds(){
if(!ADS.auto || !autoAd) return;

setInterval(()=>{
autoAd.show().catch(()=>{});
},ADS.autoInterval);
}
