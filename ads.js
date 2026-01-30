const ADS = {
homeInterstitial:true,
verifyInterstitial:true,
reward:true,
autoInterval:600000 // 10 min
};

let homeAd=null;
let verifyAd=null;
let rewardAd=null;

window.addEventListener("load",()=>{

if(window.Adsgram){
homeAd=window.Adsgram.init({blockId:"int-22046"});
verifyAd=window.Adsgram.init({blockId:""});
rewardAd=window.Adsgram.init({blockId:""});
}

});

// home interstitial
function runHomeAd(){
if(!ADS.homeInterstitial||!homeAd) return;
homeAd.show().catch(()=>{});
}

// verify interstitial
function runVerifyAd(){
if(!ADS.verifyInterstitial||!verifyAd) return;
verifyAd.show().catch(()=>{});
}

// reward ad
function runReward(callback){
if(!ADS.reward||!rewardAd){
callback();
return;
}

rewardAd.show()
.then(()=>callback())
.catch(()=>callback());
}

// auto loop
function startAutoHomeAds(){
if(!ADS.homeInterstitial) return;

setInterval(()=>{
runHomeAd();
},ADS.autoInterval);
}
