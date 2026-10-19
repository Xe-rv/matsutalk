/* MatsuTalk · js/chrome.js */
"use strict";
/* Chrome */
var NAV_ASK=[['home','home'],['ask','plus'],['picks','star'],['profile','user']];
var NAV_ANS=[['qhome','chat'],['translate','tr'],['rewards','gift'],['activity','list'],['profile','user']];
function navActive(){
  var v=S.view,map={detail:'home',visit:'picks',pick:'picks',translation:'',answer:'qhome',coupon:'rewards',asignup:'',trtask:'translate',addplace:''};
  return map.hasOwnProperty(v)?map[v]:v;
}
function langSelect(){return '<select class="lang-select" aria-label="Language">'+LANGS.map(function(l){return '<option value="'+l[0]+'"'+(l[0]===S.lang?' selected':'')+'>'+l[1]+'</option>'}).join('')+'</select>'}
function myName(){return S.profile.name.trim()||t('guestName')}
function initialOf(n){var a=Array.from(n.trim());return a.length?a[0].toUpperCase():''}
function avatarHTML(sz){
  var p=S.profile,inner=p.photo?'<img src="'+esc(p.photo)+'" alt="">':(p.name.trim()?esc(initialOf(p.name)):ic('user'));
  return '<span class="avatar av-'+esc(p.color)+'" style="--sz:'+sz+'px" aria-hidden="true">'+inner+'</span>';
}
function nativeLang(c){var m=LANGS.filter(function(l){return l[0]===c})[0];return m?m[1]:c}
function topicCount(c){return QUESTIONS.filter(function(q){return c==='all'||q.cat===c}).length}
function curTopic(){return S.mode==='answer'?S.atopic:S.topic}
function topicsMenu(where){
  var open=!!S.topicsOpen[where],cur=(S.view==='home'||S.view==='qhome')?curTopic():null;
  var items=['all'].concat(CATS).map(function(c){
    return '<button class="topic-item" data-act="gotopic" data-id="'+c+'"'+(cur===c?' aria-current="true"':'')+'><span>'+esc(t(c==='all'?'allTopics':'c_'+c))+'</span><span class="count">'+topicCount(c)+'</span></button>'}).join('');
  return '<div class="topics"><button class="nav-topics" data-act="toggleTopics" data-id="'+where+'" aria-expanded="'+open+'" aria-controls="topics-'+where+'">'+ic('tag')+'<span>'+esc(t('topicsMenu'))+'</span>'+ic('chev','chev')+'</button>'+
   '<div class="topiclist" id="topics-'+where+'"'+(open?'':' hidden')+'>'+items+'</div></div>';
}
function drawerHTML(homeId){
  var ans=S.mode==='answer';
  return '<div class="scrim" data-act="closeDrawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="'+esc(t('menu'))+'">'+
   '<div class="drawer-head"><button data-nav="'+homeId+'" aria-label="MatsuTalk home">'+LOGO+'</button><button class="icon-btn" id="drawerClose" data-act="closeDrawer" aria-label="'+esc(t('close'))+'">'+ic('x')+'</button></div>'+
   '<button class="drawer-me" data-nav="profile">'+avatarHTML(44)+'<span><strong>'+esc(myName())+'</strong><small>'+esc(t('nav_profile'))+'</small></span></button>'+
   topicsMenu('drawer')+
   '<div class="drawer-foot"><button class="btn btn-outline" data-act="switchMode">'+esc(t(ans?'switchAsk':'switchAnswer'))+'</button>'+langSelect()+'<span class="pill-proto">'+esc(t('proto'))+'</span></div></aside>';
}
function openDrawer(){
  S.drawer=true;if(document.body)document.body.style.overflow='hidden';renderChrome();
  setTimeout(function(){var b=$('#drawerClose');if(b&&b.focus)b.focus()},30);
}
function closeDrawer(){S.drawer=false;if(document.body)document.body.style.overflow='';renderChrome()}
function renderChrome(){
  var act=navActive(),ans=S.mode==='answer',homeId=ans?'qhome':'home',nav=ans?NAV_ANS:NAV_ASK;
  var items=nav.map(function(n){var id=n[0];
    var icon=id==='ask'?'<span class="nav-plus">'+ic(n[1])+'</span>':id==='profile'?'<span class="nav-av">'+avatarHTML(26)+'</span>':ic(n[1]);
    return '<button class="nav-item'+(id==='ask'?' nav-ask':'')+'" data-nav="'+id+'"'+(act===id?' aria-current="page"':'')+'>'+icon+'<span>'+esc(t('nav_'+id))+'</span></button>'}).join('');
  var tb=$('#tabbar');tb.innerHTML=items;if(tb.style&&tb.style.setProperty)tb.style.setProperty('--tabs',String(nav.length));
  $('#topbar').innerHTML='<div class="topbar-l"><button class="icon-btn" data-act="openDrawer" aria-label="'+esc(t('menu'))+'" aria-haspopup="dialog" aria-expanded="'+S.drawer+'">'+ic('menu')+'</button><button data-nav="'+homeId+'" aria-label="MatsuTalk home">'+LOGO+'</button></div>'+langSelect();
  $('#rail').innerHTML='<button data-nav="'+homeId+'" aria-label="MatsuTalk home">'+LOGO+'</button><nav aria-label="Main">'+items+'</nav>'+topicsMenu('rail')+
    '<div class="rail-foot"><button class="btn btn-outline" data-act="switchMode">'+esc(t(ans?'switchAsk':'switchAnswer'))+'</button>'+langSelect()+'<span class="pill-proto">'+esc(t('proto'))+'</span><p class="rail-note">'+esc(t(ans?'railNoteA':'railNote'))+'</p></div>';
  var top=ranked().slice(0,3).map(function(s,i){return '<button class="mini" data-act="pick" data-id="'+esc(s.id)+'"><span class="rank">'+(i+1)+'</span><span class="pick-body"><strong>'+fmt(s.name)+'</strong><span class="tag">'+ic('pin')+esc(areaName(s.area))+'</span></span></button>'}).join('');
  $('#aside').innerHTML=ans?asideAnswer():'<section class="card"><div class="sec-head"><h2>'+esc(t('picksHead'))+'</h2><button class="link" data-nav="picks">'+esc(t('seeAll'))+'</button></div><div>'+top+'</div></section>'+
    '<section class="card"><h2>'+esc(t('howTrans'))+'</h2><div class="stack"><span class="status draft">'+ic('dot')+esc(t('draft'))+'</span><span class="status ok">'+ic('check')+esc(t('checked'))+'</span></div><button class="link" data-nav="translation">'+esc(t('howTrans'))+'</button></section>';
  var dr=$('#drawer');dr.hidden=!S.drawer;dr.innerHTML=S.drawer?drawerHTML(homeId):'';
  $('#shell').dataset.mode=S.view==='welcome'?'welcome':'app';
  document.documentElement.lang=S.lang==='zh'?'zh-Hans':S.lang;
}

