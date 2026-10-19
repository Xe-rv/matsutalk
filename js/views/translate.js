/* MatsuTalk · js/views/translate.js */
"use strict";
/* Translation volunteers */
function trTasks(){
  var out=[];
  QUESTIONS.forEach(function(q){
    if(q.lang==='ja')return;
    if(q.check&&!q.jaChecked)out.push({id:'q:'+q.id,kind:'q',q:q,lang:q.lang});
    q.answers.forEach(function(a){if(a.status==='draft')out.push({id:'a:'+a.id,kind:'a',q:q,a:a,lang:q.lang})});
  });
  return out;
}
function taskById(id){return trTasks().filter(function(x){return x.id===id})[0]}
function trVisible(){
  return trTasks().filter(function(x){
    if(S.trTab==='q'&&x.kind!=='q')return false;
    if(S.trTab==='a'&&x.kind!=='a')return false;
    return S.trAll||S.profile.tlangs.indexOf(x.lang)>-1;
  });
}
function trDefault(task){return task.kind==='q'?(task.q.ja||''):(task.a.pending?'':(task.a.en||''))}
function trCurrent(task){return S.trDraft.hasOwnProperty(task.id)?S.trDraft[task.id]:trDefault(task)}
function finishTr(task,text){
  if(task.kind==='q'){task.q.ja=text;task.q.jaChecked=true;task.q.check=0}
  else{task.a.en=text;task.a.status='checked';task.a.pending=false}
  S.pts+=TR_PTS;S.trDone++;delete S.trDraft[task.id];
  goBack();toast(t('trThanks').replace(/[\[\]]/g,''));
}
function taskCard(x){
  var isQ=x.kind==='q',has=isQ?!!x.q.ja:!x.a.pending;
  return '<button class="qcard" data-act="trtask" data-id="'+esc(x.id)+'"><span class="qmeta"><span class="cat"><i></i>'+esc(t(isQ?'trKindQ':'trKindA'))+'</span><span class="tag">'+ic('tr')+esc(t('trAsker',{lang:langLabel(x.lang)}))+'</span></span>'+
   '<span class="qtext"'+(isQ?'':' lang="ja"')+'>'+fmt(isQ?x.q.text:x.a.ja)+'</span><span class="qfoot"><span class="muted">'+fmt(x.q.ago)+'</span>'+
   (has?'<span class="status draft">'+ic('dot')+esc(t('draft'))+'</span>':'<span class="pill pill-wait">'+esc(t('trNeeds'))+'</span>')+'</span></button>';
}
function translateView(){
  var list=trVisible(),langs=S.profile.tlangs.map(nativeLang).join(', ')||'-';
  return '<div class="page-head"><h1>'+esc(t('trTitle'))+'</h1><p class="lead">'+fmt(t('trLead'))+'</p><p class="tag">'+ic('check')+esc(t('trDoneN',{n:S.trDone}))+'</p></div>'+
  '<div class="chips">'+[['all','trAll'],['q','trQs'],['a','trAs']].map(function(p){return '<button class="chip" data-act="trtab" data-id="'+p[0]+'" aria-pressed="'+(S.trTab===p[0])+'">'+esc(t(p[1]))+'</button>'}).join('')+'</div>'+
  '<p class="muted" style="font-size:var(--fs-sm)">'+esc(S.trAll?t('trAllNote'):t('trNote',{langs:langs}))+' <button class="link" data-act="trall">'+esc(t(S.trAll?'trOnlyMine':'trShowAll'))+'</button> <button class="link" data-nav="profile">'+esc(t('trChange'))+'</button></p>'+
  '<div class="stack">'+(list.length?list.map(taskCard).join(''):'<div class="empty">'+esc(t(trTasks().length?'trEmptyLang':'trEmpty'))+'</div>')+'</div>';
}
function trtaskView(){
  var task=taskById(S.trId),back='<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>';
  if(!task)return back+'<div class="empty">'+esc(t('trEmpty'))+'</div>';
  var q=task.q,isQ=task.kind==='q',L=langLabel(task.lang),cur=trCurrent(task),def=trDefault(task);
  return back+
  '<section class="qbig"><span class="qmeta"><span class="cat"><i></i>'+esc(t(isQ?'trKindQ':'trKindA'))+'</span><span class="tag">'+ic('tr')+esc(t('trAsker',{lang:L}))+'</span></span>'+
   '<div class="ja"><span class="ja-label">'+esc(isQ?t('trSourceQ',{lang:L}):t('trSourceJa'))+'</span><span lang="'+(isQ?esc(q.lang):'ja')+'" style="font-size:var(--fs-lg);font-weight:500">'+fmt(isQ?q.text:task.a.ja)+'</span></div>'+
   (isQ?'':'<span class="muted" style="font-size:var(--fs-sm)">'+esc(t('trContext'))+': '+fmt(q.text)+'</span>')+'</section>'+
  '<form class="form" id="trForm" novalidate><div class="field"><label class="lbl" for="trtext">'+esc(isQ?t('trJaOfQ'):t('trIntoLang',{lang:L}))+'</label>'+
   (def?'<span class="status draft" style="align-self:flex-start">'+ic('dot')+esc(t('draft'))+'</span>':'')+
   '<textarea id="trtext" rows="5"'+(isQ?' lang="ja"':'')+'>'+esc(cur)+'</textarea><div class="err" id="trerr" role="alert" hidden></div></div>'+
   '<div class="chips"><button class="btn btn-primary btn-lg" type="submit">'+esc(t('trSubmit'))+' · +'+TR_PTS+' '+esc(t('pts'))+'</button>'+
   (def?'<button type="button" class="btn btn-outline btn-lg" data-act="trok">'+ic('check')+esc(t('trLooks'))+'</button>':'')+'</div></form>';
}

