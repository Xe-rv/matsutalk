/* MatsuTalk · js/views/asker.js */
"use strict";
/* Views */
function hero(inner){return '<section class="hero"><svg class="hero-wave" aria-hidden="true"><rect width="100%" height="100%" fill="url(#sg)"/></svg>'+inner+'</section>'}
function qCard(q){
  var n=q.answers.length;
  return '<button class="qcard" data-act="open" data-id="'+q.id+'"><span class="qmeta"><span class="cat"><i></i>'+esc(t('c_'+q.cat))+'</span>'+qPlaceTag(q)+'</span>'+
   '<span class="qtext">'+fmt(q.text)+'</span><span class="qfoot"><span class="muted">'+esc(t('askedIn',{lang:langLabel(q.lang)}))+' · '+fmt(q.ago)+'</span>'+
   (n?'<span class="pill pill-sea">'+esc(t('answersN',{n:n}))+'</span>':'<span class="pill pill-wait">'+esc(t('waiting'))+'</span>')+'</span></button>';
}
function boardHTML(){
  var q=S.q.trim().toLowerCase();
  var list=QUESTIONS.filter(function(x){
    if(S.topic!=='all'&&x.cat!==S.topic)return false;
    if(!q)return true;
    return (x.text+' '+t('c_'+x.cat)+' '+x.area).toLowerCase().indexOf(q)>-1;});
  return list.length?list.map(qCard).join(''):'<div class="empty">'+esc(t('none'))+'</div>';
}
function picksTeaser(){
  return '<section class="stack only-narrow"><div class="sec-head"><h2>'+esc(t('picksHead'))+'</h2><button class="link" data-nav="picks">'+esc(t('seeAll'))+'</button></div>'+
   '<div class="stack">'+ranked().slice(0,3).map(function(s,i){return '<div class="pick"><span class="rank">'+(i+1)+'</span><div class="pick-body"><h3><button class="pick-link" data-act="pick" data-id="'+esc(s.id)+'">'+fmt(s.name)+'</button></h3><span class="tag">'+ic('pin')+esc(areaName(s.area))+'</span></div></div>'}).join('')+'</div></section>';
}
function homeView(){
  var topicSel='<label class="inline-sel" for="topicSel"><span>'+esc(t('topic'))+'</span><select class="select" id="topicSel"><option value="all"'+(S.topic==='all'?' selected':'')+'>'+esc(t('all'))+'</option>'+CATS.map(function(c){return '<option value="'+c+'"'+(S.topic===c?' selected':'')+'>'+esc(t('c_'+c))+'</option>'}).join('')+'</select></label>';
  return hero('<span class="eyebrow">Matsuyama · Ehime</span><h1>'+esc(t('hello'))+'</h1>'+
    '<label class="searchbox">'+ic('search')+'<input id="search" type="search" placeholder="'+esc(t('search'))+'" value="'+esc(S.q)+'" aria-label="'+esc(t('search'))+'"></label>'+
    '<button class="btn btn-primary btn-lg" data-nav="ask">'+ic('plus')+esc(t('askCta'))+'</button>')+
  '<section class="stack" id="boardsec"><div class="sec-head"><h2>'+esc(t('board'))+'</h2>'+topicSel+'</div><div class="stack" id="board">'+boardHTML()+'</div></section>'+picksTeaser()+
  '<p class="foot">'+fmt(t('sampleNote'))+'</p>';
}
function askView(){
  var f=S.ask;
  return '<div class="page-head"><h1>'+esc(t('askTitle'))+'</h1><p class="lead">'+esc(t('askHint'))+'</p><p class="tag">'+ic('tr')+esc(t('writingIn'))+': '+esc(langLabel(S.lang))+'</p></div>'+
  '<form class="form" id="askForm" novalidate>'+
   '<div class="field"><label class="lbl" for="qtext">'+esc(t('yourQ'))+'</label><textarea id="qtext" rows="5" placeholder="'+esc(t('qPh'))+'">'+esc(f.text)+'</textarea><div class="err" id="qerr" role="alert" hidden></div></div>'+
   '<div class="row2"><div class="field"><label class="lbl" for="acat">'+esc(t('topic'))+'</label><select id="acat">'+CATS.map(function(c){return '<option value="'+c+'"'+(f.cat===c?' selected':'')+'>'+esc(t('c_'+c))+'</option>'}).join('')+'</select></div>'+
   '<div class="field"><label class="lbl" for="aplace">'+esc(t('place'))+'</label><select id="aplace">'+placeOpts(f.place)+'</select></div></div>'+
   '<button type="button" class="link" data-act="addplace" style="align-self:flex-start">'+ic('plus')+esc(t('cantFind'))+'</button>'+
   '<div class="notice" id="referral"'+(f.cat==='hospital'||f.cat==='procedures'?'':' hidden')+'>'+ic('info')+'<span>'+esc(t('referral'))+'</span></div>'+
   '<label class="switch" for="acheck"><input type="checkbox" id="acheck"'+(f.check?' checked':'')+'><span class="track"></span><span><strong>'+esc(t('checkReq'))+'</strong><small>'+fmt(t('checkReqSub'))+'</small></span></label>'+
   '<button class="btn btn-primary btn-lg" type="submit">'+esc(t('post'))+'</button></form>'+
  '<button class="link" data-nav="translation">'+ic('tr')+esc(t('howTrans'))+'</button>';
}
function ansCard(a,hideVisit){
  var shop=ansRole(a)==='shop',ok=a.status==='checked',ja=!!S.showJa[a.id];
  return '<article class="ans"><header class="ans-head">'+(a.mine?avatarHTML(40):'<span class="avatar'+(shop?' avatar-shop':'')+'" aria-hidden="true">'+esc(a.name.replace(/[\[\]]/g,'').charAt(0))+'</span>')+
   '<div class="ans-who"><strong>'+(a.mine?esc(myName()):fmt(a.name))+'</strong><span class="badges"><span class="badge'+(shop?' badge-shop':'')+'">'+esc(t(shop?'shopStaff':'localRes'))+'</span>'+((a.title||(a.mine&&myCount()>=TITLE_AT))?'<span class="badge badge-guide">'+esc(t('guide'))+'</span>':'')+'</span></div>'+
   '<span class="status '+(ok?'ok':'draft')+'">'+ic(ok?'check':'dot')+esc(t(ok?'checked':'draft'))+'</span></header>'+
   (a.pending?'<p class="ans-body" lang="ja">'+fmt(a.ja)+'</p><p class="muted" style="font-size:var(--fs-sm)">'+esc(t('transNote'))+'</p>':'<p class="ans-body">'+fmt(a.en)+'</p>')+
   (ja?'<div class="ja" lang="ja"><span class="ja-label">'+esc(t('easyJa'))+'</span><p>'+fmt(a.ja)+'</p></div>':'')+
   '<footer class="ans-actions"><button class="link" data-act="ja" data-id="'+a.id+'" aria-expanded="'+ja+'">'+esc(t(ja?'hideJa':'showJa'))+'</button>'+
   '<button class="btn-ghost" data-act="helpful" data-id="'+a.id+'" aria-pressed="'+!!S.helpful[a.id]+'">'+ic('check')+esc(t('helpful'))+'</button>'+
   '<button class="btn-ghost" data-act="thank" data-id="'+a.id+'" aria-pressed="'+!!S.thanked[a.id]+'">'+ic('heart')+esc(t(S.thanked[a.id]?'thanked':'thank'))+'</button>'+
   (a.shop&&!hideVisit?'<button class="btn-soft" data-act="visit" data-id="'+a.shop+'">'+ic('pin')+esc(t('iWentBtn'))+'</button>':'')+'</footer></article>';
}
function detailView(){
  var q=qById(S.qid)||QUESTIONS[0];
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<section class="qbig"><span class="qmeta"><span class="cat"><i></i>'+esc(t('c_'+q.cat))+'</span>'+qPlaceTag(q)+'</span><p>'+fmt(q.text)+'</p>'+
   '<span class="muted" style="font-size:var(--fs-sm)">'+esc(t('askedIn',{lang:langLabel(q.lang)}))+' · '+fmt(q.ago)+'</span></section>'+
  (q.referral?'<div class="notice">'+ic('info')+'<span>'+esc(t('referral'))+'</span></div>':'')+
  '<section class="stack"><div class="sec-head"><h2>'+esc(t('answers'))+'</h2><button class="link" data-nav="translation">'+ic('tr')+esc(t('howTrans'))+'</button></div>'+
  (q.answers.length?q.answers.map(function(a){return ansCard(a)}).join(''):'<div class="empty">'+fmt(t('noAnswers'))+'</div>')+'</section>';
}
function recText(s){return esc(t('recIn',{n:'['+s.n+']'})).replace(/\[(\d+)\]/,'<span class="sample">[$1]</span>')}
function pickRank(s){return s.n>0?'<span class="rank">'+rankOf(s)+'</span>':'<span class="rank rank-new">'+esc(t('newPlace'))+'</span>'}
function pickCard(s){
  return '<article class="pick">'+pickRank(s)+'<div class="pick-body"><h3><button class="pick-link" data-act="pick" data-id="'+esc(s.id)+'">'+fmt(s.name)+'</button></h3><span class="tag">'+ic('pin')+esc(areaName(s.area))+'</span>'+
    '<div class="tags">'+s.tags.map(function(x){return '<span class="tagchip">'+esc(x)+'</span>'}).join('')+'</div>'+
    (s.n>0?'<span class="muted" style="font-size:var(--fs-sm)">'+recText(s)+'</span>':'')+
    '<div><button class="btn-soft" data-act="visit" data-id="'+esc(s.id)+'">'+ic('cam')+esc(t('iWentBtn'))+'</button></div></div></article>';
}
function picksView(){
  var list=ranked().filter(function(s){return S.ptab==='all'||s.cat===S.ptab});
  return '<div class="page-head"><h1>'+esc(t('picksTitle'))+'</h1><p class="lead">'+esc(t('picksSub'))+'</p></div>'+
  '<div><button class="btn btn-soft" data-act="addplace">'+ic('plus')+esc(t('addPlace'))+'</button></div>'+
  '<div class="chips">'+PICKTABS.map(function(p){return '<button class="chip" data-act="ptab" data-id="'+p+'" aria-pressed="'+(S.ptab===p)+'">'+esc(t(p==='all'?'all':'pt_'+p))+'</button>'}).join('')+'</div>'+
  '<div class="stack">'+(list.length?list.map(pickCard).join(''):'<div class="empty">'+esc(t('noPicks'))+'</div>')+'</div>'+
  '<p class="foot">'+fmt(t('sampleNote'))+'</p>';
}
function pickView(){
  var s=shopById(S.shopId)||SHOPS[0],rel=answersForShop(s.id),asked=QUESTIONS.filter(function(q){return q.place===s.id});
  var q=encodeURIComponent((s.added?s.name+' ':'')+s.area+', Matsuyama, Ehime, Japan');
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<section class="qbig"><span class="qmeta"><span class="cat"><i></i>'+esc(t('pt_'+s.cat))+'</span><span class="tag">'+ic('pin')+esc(areaName(s.area))+'</span></span>'+
   '<h1 style="font-size:var(--fs-2xl);font-weight:800;overflow-wrap:anywhere">'+fmt(s.name)+'</h1>'+
   (s.tags.length?'<div class="tags">'+s.tags.map(function(x){return '<span class="tagchip">'+esc(x)+'</span>'}).join('')+'</div>':'')+
   (s.note?'<p style="font-family:var(--font-body);font-size:var(--fs-md);font-weight:400">'+esc(s.note)+'</p>':'')+
   '<span class="muted" style="font-size:var(--fs-sm)">'+(s.n>0?'#'+rankOf(s)+' · '+recText(s):esc(t('newPlace')))+(s.by?' · '+esc(t('addedBy',{name:s.by})):'')+'</span>'+
   '<div><button class="btn btn-primary" data-act="visit" data-id="'+esc(s.id)+'">'+ic('cam')+esc(t('iWentBtn'))+'</button></div></section>'+
  '<section class="card"><h2>'+ic('pin')+' '+esc(areaName(s.area))+'</h2>'+
   '<div class="maplinks"><a class="btn btn-outline" href="https://www.google.com/maps/search/?api=1&amp;query='+q+'" target="_blank" rel="noopener noreferrer">'+ic('pin')+esc(t('openMaps'))+'</a>'+
   '<a class="btn btn-outline" href="https://www.google.com/maps/dir/?api=1&amp;destination='+q+'" target="_blank" rel="noopener noreferrer">'+ic('arrow')+esc(t('directions'))+'</a></div>'+
   '</section>'+
  (asked.length?'<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('placeQs'))+'</h2>'+asked.map(function(x){return '<button class="qlink" data-act="open" data-id="'+esc(x.id)+'"><span><small>'+esc(t('quest'))+'</small><strong>'+fmt(x.text)+'</strong></span>'+ic('arrow')+'</button>'}).join('')+'</section>':'')+
  '<section class="stack"><h2 style="font-size:var(--fs-xl)">'+esc(t('relAnswers'))+'</h2>'+
   (rel.length?rel.map(function(r){return '<div class="rel"><button class="qlink" data-act="open" data-id="'+r.q.id+'"><span><small>'+esc(t('quest'))+'</small><strong>'+fmt(r.q.text)+'</strong></span>'+ic('arrow')+'</button>'+ansCard(r.a,true)+'</div>'}).join(''):'<div class="empty">'+esc(t('noRel'))+'</div>')+'</section>'+
  '<p class="foot">'+fmt(t('sampleNote'))+'</p>';
}
function visitView(){
  var f=S.visit;
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<div class="page-head"><h1>'+esc(t('visitTitle'))+'</h1><p class="lead">'+esc(t('visitSub'))+'</p></div>'+
  '<form class="form" id="visitForm" novalidate>'+
   '<div class="field"><label class="lbl" for="vshop">'+esc(t('shop'))+'</label><select id="vshop">'+shopOpts(f.shop)+'</select></div>'+
   '<div class="field"><span class="lbl" style="font-weight:700;font-size:var(--fs-sm)">'+esc(t('photo'))+'</span><div class="photo-wrap"><label class="photo-drop" for="vphoto" id="photoBox">'+photoInner()+'</label><input id="vphoto" type="file" accept="image/*" style="position:absolute;opacity:0;width:1px;height:1px;inset:auto"></div></div>'+
   '<div class="field"><label class="lbl" for="vmsg">'+esc(t('msg'))+'</label><textarea id="vmsg" rows="4" placeholder="'+esc(t('msgPh'))+'">'+esc(f.msg)+'</textarea></div>'+
   '<button class="btn btn-primary btn-lg" type="submit">'+esc(t('send'))+'</button></form>';
}
function photoInner(){return S.photo?'<img src="'+S.photo+'" alt="Your photo">':ic('cam')+'<span>'+esc(t('addPhoto'))+'</span>'}
function transView(){
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<div class="page-head"><h1>'+esc(t('transTitle'))+'</h1><p class="lead">'+esc(t('transLead'))+'</p></div>'+
  '<div class="steps"><section class="card"><span class="status draft" style="align-self:flex-start">'+ic('dot')+esc(t('draft'))+'</span><h2>'+esc(t('tr1t'))+'</h2><p class="muted">'+esc(t('tr1d'))+'</p></section>'+
  '<section class="card"><span class="status ok" style="align-self:flex-start">'+ic('check')+esc(t('checked'))+'</span><h2>'+esc(t('tr2t'))+'</h2><p class="muted">'+esc(t('tr2d'))+'</p></section></div>'+
  '<section class="card"><h2>'+esc(t('trEx'))+'</h2><div class="compare">'+
   '<div class="cmp-row" lang="ja"><span class="ja-label">'+esc(t('easyJa'))+'</span><span>ゴミは、[8時]までに出してください。</span></div>'+
   '<div class="cmp-row"><span class="status draft" style="align-self:flex-start">'+ic('dot')+esc(t('draft'))+'</span><span>Please put out the garbage until [8 o\'clock].</span></div>'+
   '<div class="cmp-row"><span class="status ok" style="align-self:flex-start">'+ic('check')+esc(t('checked'))+'</span><span>Please put your garbage out by [8 a.m.]</span></div></div></section>'+
  '<section class="card"><h2>'+esc(t('trTipT'))+'</h2><p class="muted">'+esc(t('trTipD'))+'</p></section>';
}
function welcomeView(){
  return '<div class="welcome"><div class="welcome-card">'+hero('<span class="eyebrow jp">松山 · MATSUYAMA</span><div class="wordmark">Matsu<b>Talk</b></div><p style="max-width:34ch;font-size:var(--fs-lg)">'+esc(t('tagline'))+'</p>')+
   '<section class="stack"><h2 style="font-size:var(--fs-lg)">'+esc(t('pickLang'))+'</h2><div class="lang-grid">'+LANGS.map(function(l){return '<button class="chip" data-act="lang" data-id="'+l[0]+'" aria-pressed="'+(S.lang===l[0])+'">'+l[1]+'</button>'}).join('')+'</div></section>'+
   '<div class="role-grid"><button class="role go" data-act="enter">'+ic('plus')+esc(t('iAsk'))+'</button><button class="role" data-act="enterAnswer">'+ic('chat')+esc(t('iAnswer'))+'</button></div></div></div>';
}

