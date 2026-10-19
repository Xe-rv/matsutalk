/* MatsuTalk · js/views/answerer.js */
"use strict";
/* ---------- Answerer side ---------- */
var REWARDS=[
 {id:'r1',type:'meal',shop:'[Mikan Kitchen]',title:'10% off lunch',ja:'ランチ10％引き',cost:100},
 {id:'r2',type:'meal',shop:'[Cafe Nami]',title:'Free drink upgrade',ja:'ドリンクのグレードアップ無料',cost:80},
 {id:'r3',type:'onsen',shop:'[Yu no Machi Bathhouse]',title:'Bath ticket',ja:'入浴券',cost:150},
 {id:'r4',type:'meal',shop:'[Seto Sweets]',title:'Mikan sweets set',ja:'みかんスイーツセット',cost:120},
 {id:'r5',type:'exp',shop:'[Tobe Pottery Studio]',title:'Hands-on class discount',ja:'体験教室の割引',cost:200},
 {id:'r6',type:'give',shop:'',title:'Donate to a local community group',ja:'地域の団体に寄付する',cost:50},
 {id:'r7',type:'give',shop:'',title:'Volunteer certificate (PDF), useful for job hunting',ja:'ボランティア証明書（PDF）。就職活動に使えます',cost:300}
];
var RWTABS=['all','meal','onsen','exp','give'];
var TITLE_AT=5,WELCOME_PTS=100,PTS_PER=10,TR_PTS=5,PLACE_PTS=20;
function myCount(){return S.myAnswers.length}
function rwText(r){return S.lang==='ja'?r.ja:r.title}
function rewardById(id){return REWARDS.filter(function(r){return r.id===id})[0]}
function couponById(id){return S.coupons.filter(function(c){return c.id===id})[0]}
function qJa(q){return q.ja||q.text}
function sm(n){return '<span class="sample">['+n+']</span>'}
function showErr(id,msg){var el=$('#'+id);if(el){el.textContent=msg;el.hidden=false}}
function enterAnswer(){S.mode='answer';go(S.joined?'qhome':'asignup')}
function easyMsg(txt){
  if(!txt.trim())return '';
  var tooLong=txt.split(/[。！？!?\n]+/).some(function(s){return s.trim().length>40});
  return tooLong?'<span class="warn">'+esc(t('longSentence'))+'</span>':'<span class="ok">'+esc(t('easyOk'))+'</span>';
}
function rulesList(){return '<ol class="rules">'+[1,2,3,4,5].map(function(i){return '<li>'+esc(t('rule'+i))+'</li>'}).join('')+'</ol>'}
function progressHTML(n){
  var c=Math.min(n,TITLE_AT),pct=Math.round(c/TITLE_AT*100);
  return '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="'+TITLE_AT+'" aria-valuenow="'+c+'"><i style="width:'+pct+'%"></i></div><span class="muted" style="font-size:var(--fs-sm)">'+c+' / '+sm(TITLE_AT)+'</span>';
}
function asideAnswer(){
  return '<section class="card"><h2>'+esc(t('yourPoints'))+'</h2><div class="points"><b>'+S.pts+'</b><span>'+esc(t('pts'))+'</span></div><div><button class="link" data-nav="rewards">'+esc(t('nav_rewards'))+'</button></div></section>'+
   '<section class="card"><h2>'+esc(t('titleProg'))+'</h2>'+progressHTML(myCount())+'</section>';
}
/* Sample QR look-alike. It is not a scannable code. */
function sampleQR(code){
  var n=25,seed=0,i,x,y,d='';
  for(i=0;i<code.length;i++)seed=(seed*31+code.charCodeAt(i))>>>0;
  function rnd(){seed=(seed+0x6D2B79F5)>>>0;var z=seed;z=Math.imul(z^(z>>>15),z|1);z^=z+Math.imul(z^(z>>>7),z|61);return((z^(z>>>14))>>>0)/4294967296}
  for(y=0;y<n;y++)for(x=0;x<n;x++){
    if((x<8&&y<8)||(x>=n-8&&y<8)||(x<8&&y>=n-8))continue;
    if(rnd()<.5)d+='M'+(x+2)+' '+(y+2)+'h1v1h-1z';
  }
  function finder(ox,oy){return '<rect x="'+(ox+2)+'" y="'+(oy+2)+'" width="7" height="7" fill="#0C2A3D"/><rect x="'+(ox+3)+'" y="'+(oy+3)+'" width="5" height="5" fill="#fff"/><rect x="'+(ox+4)+'" y="'+(oy+4)+'" width="3" height="3" fill="#0C2A3D"/>'}
  return '<svg class="qr" viewBox="0 0 29 29" role="img" aria-label="Sample QR code"><rect width="29" height="29" fill="#fff"/><path d="'+d+'" fill="#0C2A3D"/>'+finder(0,0)+finder(n-7,0)+finder(0,n-7)+'</svg>';
}
function signupView(){
  var f=S.signup;
  return hero('<span class="eyebrow">Matsuyama · Ehime</span><h1>'+esc(t('signupTitle'))+'</h1><p style="max-width:46ch">'+esc(t('signupLead'))+'</p>')+
  '<form class="form" id="signupForm" novalidate>'+
   '<div class="field"><label class="lbl" for="sname">'+esc(t('nameLbl'))+'</label><input type="text" id="sname" maxlength="30" value="'+esc(S.profile.name)+'" placeholder="[Yuki]" autocomplete="off"></div>'+
   '<div class="field"><label class="lbl" for="srole">'+esc(t('roleLbl'))+'</label><select id="srole"><option value="local"'+(S.profile.role==='local'?' selected':'')+'>'+esc(t('localRes'))+'</option><option value="shop"'+(S.profile.role==='shop'?' selected':'')+'>'+esc(t('shopStaff'))+'</option></select></div>'+
   '<section class="card"><h2>'+esc(t('rulesTitle'))+'</h2>'+rulesList()+'</section>'+
   '<label class="switch" for="sagree"><input type="checkbox" id="sagree"'+(f.agree?' checked':'')+'><span class="track"></span><span><strong>'+esc(t('agree'))+'</strong><small>'+fmt(t('bonus'))+'</small></span></label>'+
   '<div class="err" id="serr" role="alert" hidden></div>'+
   '<button class="btn btn-primary btn-lg" type="submit">'+esc(t('startAnswering'))+'</button></form>';
}
function aBoardHTML(){
  var list=QUESTIONS.filter(function(q){
    if(S.atopic!=='all'&&q.cat!==S.atopic)return false;
    if(S.onlyMine&&S.ans.cats.indexOf(q.cat)<0)return false;
    return true;
  }).sort(function(a,b){return (a.answers.length?1:0)-(b.answers.length?1:0)});
  return list.length?list.map(function(q){
    var n=q.answers.length;
    return '<button class="qcard" data-act="compose" data-id="'+q.id+'"><span class="qmeta"><span class="cat"><i></i>'+esc(t('c_'+q.cat))+'</span>'+qPlaceTag(q)+'</span>'+
     '<span class="qtext" lang="ja">'+fmt(qJa(q))+'</span><span class="qfoot"><span class="muted">'+esc(t('askedIn',{lang:langLabel(q.lang)}))+' · '+fmt(q.ago)+'</span>'+
     (n?'<span class="pill pill-sea">'+esc(t('answersN',{n:n}))+'</span>':'<span class="pill pill-wait">'+esc(t('waiting'))+'</span>')+'</span></button>';
  }).join(''):'<div class="empty">'+esc(t('none'))+'</div>';
}
function qhomeView(){
  var sel='<label class="inline-sel" for="atopicSel"><span>'+esc(t('topic'))+'</span><select class="select" id="atopicSel"><option value="all"'+(S.atopic==='all'?' selected':'')+'>'+esc(t('all'))+'</option>'+CATS.map(function(c){return '<option value="'+c+'"'+(S.atopic===c?' selected':'')+'>'+esc(t('c_'+c))+'</option>'}).join('')+'</select></label>';
  return hero('<span class="eyebrow">Matsuyama · Ehime</span><h1>'+esc(t('aHello'))+'</h1><p style="max-width:44ch">'+esc(t('aHelloSub'))+'</p><span class="pill" style="align-self:flex-start;background:rgba(255,255,255,.18);color:#fff">'+S.pts+' '+esc(t('pts'))+'</span>')+
  '<section class="stack" id="boardsec"><div class="sec-head"><h2>'+esc(t('board'))+'</h2>'+sel+'</div>'+
   '<div class="chips"><button class="chip" data-act="onlymine" aria-pressed="'+S.onlyMine+'">'+esc(t('onlyMine'))+'</button></div>'+
   '<div class="stack" id="board">'+aBoardHTML()+'</div></section>'+
  '<section class="card"><h2>'+esc(t('addPlaceCard'))+'</h2><p class="muted">'+fmt(t('addPlaceCardSub'))+'</p><div><button class="btn btn-outline" data-act="addplace">'+ic('plus')+esc(t('addPlace'))+'</button></div></section>';
}
function composeView(){
  var q=qById(S.qid)||QUESTIONS[0],f=S.compose,orig=!!S.showOrig[q.id];
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<section class="qbig"><span class="qmeta"><span class="cat"><i></i>'+esc(t('c_'+q.cat))+'</span>'+qPlaceTag(q)+'</span>'+
   '<p lang="ja">'+fmt(qJa(q))+'</p>'+qStatus(q)+
   (orig?'<div class="ja"><span class="ja-label">'+esc(t('origIn',{lang:langLabel(q.lang)}))+'</span><p>'+fmt(q.text)+'</p></div>':'')+
   '<div><button class="link" data-act="orig" data-id="'+q.id+'" aria-expanded="'+orig+'">'+esc(t(orig?'hideOrig':'showOrig'))+'</button></div></section>'+
  (q.referral?'<div class="notice">'+ic('info')+'<span>'+esc(t('rule4'))+'</span></div>':'')+
  (q.answers.length?'<section class="stack"><h2 style="font-size:var(--fs-lg)">'+esc(t('answersSoFar'))+'</h2>'+q.answers.map(function(a){
     return '<div class="ans"><div class="ans-head"><strong>'+(a.mine?esc(myName()):fmt(a.name))+'</strong><span class="badge'+(ansRole(a)==='shop'?' badge-shop':'')+'">'+esc(t(ansRole(a)==='shop'?'shopStaff':'localRes'))+'</span></div><p class="ans-body" lang="ja">'+fmt(a.ja)+'</p></div>'}).join('')+'</section>':'')+
  '<form class="form" id="composeForm" novalidate>'+
   '<div class="field"><label class="lbl" for="atext">'+esc(t('composeTitle'))+'</label><p class="muted" style="font-size:var(--fs-sm)">'+esc(t('composeHint'))+'</p>'+
   '<textarea id="atext" rows="5" lang="ja" placeholder="'+esc(t('ansPh'))+'">'+esc(f.text)+'</textarea><div class="easy" id="easy" aria-live="polite">'+easyMsg(f.text)+'</div><div class="err" id="aerr" role="alert" hidden></div></div>'+
   '<div class="field"><label class="lbl" for="ashop">'+esc(t('recShop'))+'</label><select id="ashop">'+shopOpts(f.shop,t('noShop'))+'</select><button type="button" class="link" data-act="addplace" style="align-self:flex-start">'+ic('plus')+esc(t('addPlace'))+'</button></div>'+
   '<p class="muted" style="font-size:var(--fs-sm)">'+fmt(t('pointsFor'))+'</p>'+
   '<button class="btn btn-primary btn-lg" type="submit">'+esc(t('postAnswer'))+'</button></form>';
}
function rewardCard(r){
  var can=S.pts>=r.cost,sure=S.confirm===r.id,btn;
  if(!can)btn='<span class="pill pill-wait">'+esc(t('needMore',{n:r.cost-S.pts}))+'</span>';
  else if(sure)btn='<button class="btn btn-primary" data-act="confirmEx" data-id="'+r.id+'">'+esc(t('confirmEx'))+'</button>';
  else btn='<button class="btn btn-outline" data-act="exchange" data-id="'+r.id+'">'+esc(t('exchange'))+'</button>';
  return '<article class="reward"><div class="reward-main"><span class="tag">'+esc(t('rw_'+r.type))+'</span><strong>'+(r.shop?fmt(r.shop)+' · ':'')+esc(rwText(r))+'</strong></div>'+
   '<div class="reward-act"><span class="cost">'+sm(r.cost)+' '+esc(t('pts'))+'</span>'+btn+'</div></article>';
}
function rewardsView(){
  var list=REWARDS.filter(function(r){return S.rwtab==='all'||r.type===S.rwtab});
  return hero('<span class="eyebrow">'+esc(t('yourPoints'))+'</span><div class="points"><b>'+S.pts+'</b><span>'+esc(t('pts'))+'</span></div><p style="max-width:46ch">'+esc(t('rwSub'))+'</p>')+
  '<div class="chips">'+RWTABS.map(function(p){return '<button class="chip" data-act="rwtab" data-id="'+p+'" aria-pressed="'+(S.rwtab===p)+'">'+esc(t(p==='all'?'all':'rw_'+p))+'</button>'}).join('')+'</div>'+
  '<div class="stack">'+list.map(rewardCard).join('')+'</div>'+
  '<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('myCoupons'))+'</h2>'+(S.coupons.length?S.coupons.map(function(c){
    var r=rewardById(c.rid);
    return '<button class="qlink" data-act="coupon" data-id="'+c.id+'"><span><small>'+esc(t(c.used?'usedN':'unused'))+'</small><strong>'+(r.shop?fmt(r.shop)+' · ':'')+esc(rwText(r))+'</strong></span>'+ic('arrow')+'</button>'}).join(''):'<div class="empty">'+esc(t('noCoupons'))+'</div>')+'</section>'+
  '<p class="foot">'+esc(t('rwNote'))+'</p>';
}
function couponView(){
  var c=couponById(S.cid)||S.coupons[0];
  if(!c)return '<div class="empty">'+esc(t('noCoupons'))+'</div>';
  var r=rewardById(c.rid);
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<section class="card coupon"><span class="status '+(c.used?'draft':'ok')+'">'+ic(c.used?'dot':'check')+esc(t(c.used?'usedN':'unused'))+'</span>'+
   '<h1 style="font-size:var(--fs-xl);font-weight:800">'+(r.shop?fmt(r.shop)+' · ':'')+esc(rwText(r))+'</h1>'+
   (c.kind==='qr'?'<p class="muted">'+esc(t('showAtShop'))+'</p>'+sampleQR(c.code)+'<div class="codebox">'+esc(c.code)+'</div>'+
     '<button class="btn btn-outline" data-act="scan" data-id="'+c.id+'"'+(c.used?' disabled':'')+'>'+esc(t('simScan'))+'</button><p class="foot">'+esc(t('sampleCoupon'))+'</p>':'<p class="muted">'+esc(t('certNote'))+'</p>')+'</section>';
}
function activityView(){
  var n=myCount(),shopIds={};
  var mine=S.myAnswers.map(function(m){var q=qById(m.qid),a=q&&q.answers.filter(function(x){return x.id===m.aid})[0];return q&&a?{q:q,a:a}:null}).filter(Boolean);
  mine.forEach(function(m){if(m.a.shop)shopIds[m.a.shop]=1});
  var thanks=mine.filter(function(m){return S.thanked[m.a.id]}).map(function(m){return '<div class="thanks-item">'+ic('heart')+'<span lang="ja">'+esc(t('thankedYou',{q:qJa(m.q).slice(0,24)+'…'}))+'</span></div>'});
  var visits=VISITS.filter(function(v){return v.shopId&&shopIds[v.shopId]}).map(function(v){
    return '<div class="thanks-item">'+(v.photo?'<img src="'+v.photo+'" alt="" style="width:56px;height:56px;border-radius:12px;object-fit:cover;flex:none">':ic('cam'))+'<span><strong>'+esc(t('visitedYou',{shop:v.shop.replace(/[\[\]]/g,'')}))+'</strong><br>'+fmt(v.msg||'')+'</span></div>'});
  var items=thanks.concat(visits);
  return '<div class="page-head"><h1>'+esc(t('actTitle'))+'</h1></div>'+
  '<section class="card"><div class="sec-head"><h2>'+esc(t('titleProg'))+'</h2>'+(n>=TITLE_AT?'<span class="status ok">'+ic('check')+esc(t('earned'))+'</span>':'')+'</div>'+progressHTML(n)+'<p class="muted">'+fmt(t('titleDesc'))+'</p></section>'+
  '<section class="card"><h2>'+esc(t('actTrans'))+'</h2><div class="points" style="color:var(--ink)"><b style="font-size:2rem">'+S.trDone+'</b></div><div><button class="link" data-nav="translate">'+esc(t('nav_translate'))+'</button></div></section>'+
  '<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('thanksH'))+'</h2>'+(items.length?items.join(''):'<div class="empty">'+esc(t('noThanks'))+'</div>')+'</section>'+
  '<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('myAnswersH'))+'</h2>'+(mine.length?mine.map(function(m){
    return '<article class="ans"><span class="muted" style="font-size:var(--fs-sm)" lang="ja">'+fmt(qJa(m.q))+'</span><p class="ans-body" lang="ja">'+fmt(m.a.ja)+'</p><span class="status draft" style="align-self:flex-start">'+ic('dot')+esc(t('draft'))+'</span></article>'}).join(''):
    '<div class="empty">'+esc(t('noAns'))+'<br><button class="link" data-nav="qhome">'+esc(t('goAnswer'))+'</button></div>')+'</section>';
}
function doExchange(id){
  var r=rewardById(id);if(!r||S.pts<r.cost)return;
  S.pts-=r.cost;S.confirm=null;
  S.coupons.unshift({id:'c'+Date.now(),rid:r.id,code:'MT-'+Math.random().toString(36).slice(2,6).toUpperCase(),used:false,kind:r.type==='give'?'note':'qr'});
  render();toast(t('exchanged'));
}

