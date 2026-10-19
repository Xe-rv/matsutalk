/* MatsuTalk · js/views/profile.js */
"use strict";
/* Profile (one page for both sides) */
function profileView(){
  var p=S.profile,ans=S.mode==='answer',guide=myCount()>=TITLE_AT;
  var badges=(ans?'<span class="badge'+(p.role==='shop'?' badge-shop':'')+'">'+esc(t(p.role==='shop'?'shopStaff':'localRes'))+'</span>':'')+(guide?'<span class="badge badge-guide">'+esc(t('guide'))+'</span>':'');
  var h='<div class="page-head"><h1>'+esc(t('profTitle'))+'</h1></div>'+
  '<section class="card"><div class="prof-head"><span id="profAv">'+avatarHTML(96)+'</span><div class="who"><h2 id="profName" style="font-size:var(--fs-xl)">'+esc(myName())+'</h2>'+
   (badges?'<div class="badges">'+badges+'</div>':'')+
   '<div class="photo-btns"><label class="btn btn-outline filebtn">'+ic('cam')+esc(t(p.photo?'profChange':'addPhoto'))+'<input type="file" id="pphoto" accept="image/*"></label>'+
   (p.photo?'<button class="btn-ghost" data-act="rmphoto">'+esc(t('profRemove'))+'</button>':'')+'</div>'+
   '<div class="err" id="pphotoerr" role="alert" hidden></div></div></div></section>'+
  '<section class="card"><h2>'+esc(t('profile'))+'</h2><div class="form">'+
   '<div class="field"><label class="lbl" for="pname">'+esc(t('nameLbl'))+'</label><input type="text" id="pname" maxlength="30" value="'+esc(p.name)+'" placeholder="'+esc(t('profNamePh'))+'" autocomplete="off"></div>'+
   '<div class="field"><label class="lbl" for="pbio">'+esc(t('profAbout'))+'</label><textarea id="pbio" rows="3" maxlength="140" style="min-height:88px" placeholder="'+esc(t('profAboutPh'))+'">'+esc(p.bio)+'</textarea></div>'+
   '<div class="row2"><div class="field"><label class="lbl" for="phome">'+esc(t('profHome'))+'</label><select id="phome"><option value="any">'+esc(t('profNone'))+'</option>'+AREAS.map(function(a){return '<option value="'+esc(a)+'"'+(p.home===a?' selected':'')+'>'+esc(areaName(a))+'</option>'}).join('')+'</select></div>'+
   '<div class="field"><label class="lbl" for="plang">'+esc(t('profLang'))+'</label>'+langSelect().replace('<select class="lang-select"','<select class="lang-select" id="plang"')+'</div></div>'+
   '<div class="field"><span class="lbl" id="pcolorlbl" style="font-weight:700;font-size:var(--fs-sm)">'+esc(t('profColor'))+'</span><div class="swatches" role="group" aria-labelledby="pcolorlbl">'+
    COLORS.map(function(c){return '<button type="button" class="swatch av-'+c+'" data-act="pcolor" data-id="'+c+'" aria-pressed="'+(p.color===c)+'" aria-label="'+esc(t('col_'+c))+'">'+(p.color===c?ic('check'):'')+'</button>'}).join('')+'</div></div>'+
   '<p class="foot">'+esc(t('profAuto'))+'</p></div></section>';
  if(ans){
    h+='<section class="card"><h2>'+esc(t('profAnswerH'))+'</h2><div class="form">'+
     '<div class="field"><label class="lbl" for="prole">'+esc(t('roleLbl'))+'</label><select id="prole"><option value="local"'+(p.role==='local'?' selected':'')+'>'+esc(t('localRes'))+'</option><option value="shop"'+(p.role==='shop'?' selected':'')+'>'+esc(t('shopStaff'))+'</option></select></div>'+
     '<div class="field"><span class="lbl" style="font-weight:700;font-size:var(--fs-sm)">'+esc(t('profTLangs'))+'</span><p class="muted" style="font-size:var(--fs-sm)">'+esc(t('profTLangsSub'))+'</p><div class="chips">'+
      TLANGS.map(function(c){return '<button type="button" class="chip" data-act="tlang" data-id="'+c+'" aria-pressed="'+(p.tlangs.indexOf(c)>-1)+'">'+esc(nativeLang(c))+'</button>'}).join('')+'</div></div></div></section>'+
     '<section class="card"><h2>'+esc(t('notifTitle'))+'</h2><p class="muted">'+esc(t('notifSub'))+'</p><div class="chips">'+CATS.map(function(c){return '<button type="button" class="chip" data-act="ncat" data-id="'+c+'" aria-pressed="'+(S.ans.cats.indexOf(c)>-1)+'">'+esc(t('c_'+c))+'</button>'}).join('')+'</div></section>'+
     '<details class="card"><summary>'+esc(t('rulesTitle'))+'</summary>'+rulesList()+'</details>'+
     '<div><button class="btn btn-outline" data-act="toAsk">'+esc(t('switchAsk'))+'</button></div>';
  }else{
    var mine=QUESTIONS.filter(function(q){return q.mine});
    h+='<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('myQs'))+'</h2>'+(mine.length?mine.map(qCard).join(''):'<div class="empty">'+esc(t('noneYet'))+'</div>')+'</section>'+
     '<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('myVisits'))+'</h2>'+(VISITS.length?VISITS.map(function(v){
      return '<article class="pick">'+(v.photo?'<img src="'+v.photo+'" alt="" style="width:72px;height:72px;border-radius:14px;object-fit:cover;flex:none">':'<span class="avatar avatar-shop" aria-hidden="true">'+ic('cam')+'</span>')+
      '<div class="pick-body"><h3>'+fmt(v.shop)+'</h3><p>'+fmt(v.msg||'')+'</p><span class="muted" style="font-size:var(--fs-sm)">'+fmt(v.when)+'</span></div></article>'}).join(''):'<div class="empty">'+esc(t('noneYet'))+'</div>')+'</section>'+
     '<section class="card"><h2>'+esc(t('iAnswer'))+'</h2><p class="muted">'+esc(t('switchAnswerHint'))+'</p><div><button class="btn btn-primary" data-act="toAnswer">'+ic('chat')+esc(t('switchAnswer'))+'</button></div></section>'+
     '<p class="foot">'+fmt(t('sampleNote'))+'</p>';
  }
  return h;
}

