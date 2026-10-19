/* MatsuTalk · js/handlers.js */
"use strict";
/* Extra event handlers (called first from the main listeners) */
function extraClick(a,id,el){
  switch(a){
   case 'openDrawer':openDrawer();return true;
   case 'closeDrawer':closeDrawer();{var mb=document.querySelector('[data-act="openDrawer"]');if(mb&&mb.focus)mb.focus()}return true;
   case 'toggleTopics':{
     S.topicsOpen[id]=!S.topicsOpen[id];el.setAttribute('aria-expanded',String(S.topicsOpen[id]));
     var lst=$('#topics-'+id);if(lst)lst.hidden=!S.topicsOpen[id];return true}
   case 'gotopic':{
     if(S.mode==='answer'){S.atopic=id;S.onlyMine=false;go('qhome')}else{S.topic=id;S.q='';go('home')}
     var bs=$('#boardsec');if(bs&&bs.scrollIntoView)bs.scrollIntoView({block:'start'});
     return true}
   case 'addplace':go('addplace');return true;
   case 'nptag':{
     var i=S.np.tags.indexOf(id);if(i>-1)S.np.tags.splice(i,1);else S.np.tags.push(id);
     el.setAttribute('aria-pressed',String(S.np.tags.indexOf(id)>-1));return true}
   case 'trtab':S.trTab=id;render();return true;
   case 'trall':S.trAll=!S.trAll;render();return true;
   case 'trtask':S.trId=id;go('trtask');return true;
   case 'trok':{var tk=taskById(S.trId);if(tk&&trDefault(tk))finishTr(tk,trDefault(tk));return true}
   case 'pcolor':{
     S.profile.color=id;saveProfile();render();
     var sw=document.querySelector('[data-act="pcolor"][data-id="'+id+'"]');if(sw&&sw.focus)sw.focus();return true}
   case 'rmphoto':S.profile.photo=null;saveProfile();render();return true;
   case 'tlang':{
     var j=S.profile.tlangs.indexOf(id);if(j>-1)S.profile.tlangs.splice(j,1);else S.profile.tlangs.push(id);
     saveProfile();el.setAttribute('aria-pressed',String(S.profile.tlangs.indexOf(id)>-1));return true}
  }
  return false;
}
function extraInput(id,el){
  switch(id){
   case 'sname':case 'pname':S.profile.name=el.value;saveProfile();refreshProfileHead();renderChrome();return true;
   case 'pbio':S.profile.bio=el.value;saveProfile();return true;
   case 'npName':S.np.name=el.value;hideErr('nperr');return true;
   case 'npOther':S.np.other=el.value;hideErr('nperr');return true;
   case 'npNote':S.np.note=el.value;return true;
   case 'trtext':S.trDraft[S.trId]=el.value;hideErr('trerr');return true;
  }
  return false;
}
function extraChange(id,el){
  switch(id){
   case 'aplace':S.ask.place=el.value;return true;
   case 'npCat':S.np.cat=el.value;return true;
   case 'npArea':{S.np.area=el.value;var w=$('#npOtherWrap');if(w)w.hidden=el.value!=='__other';return true}
   case 'phome':S.profile.home=el.value;saveProfile();return true;
   case 'srole':S.profile.role=el.value;saveProfile();return true;
   case 'prole':S.profile.role=el.value;saveProfile();render();return true;
   case 'pphoto':
     if(el.files&&el.files[0])readPhoto(el.files[0],function(d){
       if(!d){showErr('pphotoerr',t('profPhotoErr'));return}
       S.profile.photo=d;saveProfile();render();
     });
     return true;
  }
  return false;
}
function extraSubmit(id){
  if(id==='placeForm'){
    var f=S.np,name=f.name.trim();
    if(name.length<2){showErr('nperr',t('placeNameErr'));var ne=$('#npName');if(ne&&ne.focus)ne.focus();return true}
    var area=f.area==='__other'?f.other.trim():f.area;
    if(!area){showErr('nperr',t('placeAreaErr'));return true}
    var key=name.toLowerCase();
    if(SHOPS.some(function(x){return x.name.replace(/[\[\]]/g,'').trim().toLowerCase()===key})){showErr('nperr',t('placeDupe'));return true}
    addArea(area);
    var s={id:'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:name,cat:f.cat,area:area,n:0,tags:f.tags.slice(),note:f.note.trim(),by:S.profile.name.trim(),added:true,local:true};
    SHOPS.push(s);savePlace(s);
    var pts=S.mode==='answer'&&S.joined?PLACE_PTS:0;S.pts+=pts;
    S.np={name:'',cat:'eat',area:AREAS[0],other:'',tags:[],note:''};
    var prev=S.hist.length?S.hist[S.hist.length-1].view:null;
    if(prev==='ask'){S.ask.place='shop:'+s.id;goBack()}
    else if(prev==='answer'){S.compose.shop=s.id;goBack()}
    else{S.shopId=s.id;go('pick',false)}
    toast(DB.ref?t(pts?'placeAddedPts':'placeAddedN').replace(/[\[\]]/g,''):t('placeLocal'));
    return true;
  }
  if(id==='trForm'){
    var task=taskById(S.trId);
    if(!task){goBack();return true}
    var text=trCurrent(task).trim();
    if(text.length<2){showErr('trerr',t('trEmptyErr'));return true}
    finishTr(task,text);
    return true;
  }
  return false;
}

