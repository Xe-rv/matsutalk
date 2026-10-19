/* MatsuTalk · js/router.js */
"use strict";
var VIEWS={welcome:welcomeView,home:homeView,ask:askView,detail:detailView,picks:picksView,pick:pickView,visit:visitView,profile:profileView,translation:transView,
  asignup:signupView,qhome:qhomeView,answer:composeView,rewards:rewardsView,coupon:couponView,activity:activityView,
  translate:translateView,trtask:trtaskView,addplace:addPlaceView};

function render(){
  renderChrome();
  $('#main').innerHTML=VIEWS[S.view]();
  if(S.view==='welcome')$('#main').style.maxWidth='none',$('#main').style.padding='0';
  else $('#main').removeAttribute('style');
}
var SUB=['detail','visit','translation','pick','answer','coupon','addplace','trtask'];
function go(v,keepHist){
  if(SUB.indexOf(v)>-1){if(keepHist!==false)S.hist.push({view:S.view,qid:S.qid,shopId:S.shopId})}
  else S.hist=[];
  S.view=v;render();window.scrollTo(0,0);
}
function goBack(){
  var p=S.hist.pop();
  if(!p){go('home');return}
  S.qid=p.qid;S.shopId=p.shopId;S.view=p.view;render();window.scrollTo(0,0);
}
var tt;function toast(m){var el=$('#toast');el.textContent=m;el.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){el.classList.remove('show')},2600)}

