/* MatsuTalk · js/views/places.js */
"use strict";
/* ---------- Places, translation volunteers, profile ---------- */
var PLACE_CATS=['eat','cafe','onsen','shop'];
var TAG_OPTS=['Picture menu','Takes cards','Wi-Fi','Quiet','English OK','Take-out','Easy ordering','Towel rental','Gift boxes','Hands-on class'];
var TLANGS=['en','zh','ko','vi','id'];
var DB={ref:null};

function addArea(a){if(a&&AREAS.indexOf(a)<0)AREAS.push(a)}
function ranked(){return SHOPS.map(function(s,i){return {s:s,i:i}}).sort(function(a,b){return (b.s.n-a.s.n)||(a.i-b.i)}).map(function(x){return x.s})}
function rankOf(s){return ranked().indexOf(s)+1}
function shopOpts(sel,blank){
  return (blank!==undefined?'<option value="">'+esc(blank)+'</option>':'')+SHOPS.map(function(s){return '<option value="'+esc(s.id)+'"'+(sel===s.id?' selected':'')+'>'+esc(s.name)+' · '+esc(areaName(s.area))+'</option>'}).join('');
}
function placeOpts(sel){
  return '<option value="any"'+(sel==='any'?' selected':'')+'>'+esc(t('anywhere'))+'</option>'+
   '<optgroup label="'+esc(t('areasGroup'))+'">'+AREAS.map(function(a){var v='area:'+a;return '<option value="'+esc(v)+'"'+(sel===v?' selected':'')+'>'+esc(areaName(a))+'</option>'}).join('')+'</optgroup>'+
   '<optgroup label="'+esc(t('placesGroup'))+'">'+SHOPS.map(function(s){var v='shop:'+s.id;return '<option value="'+esc(v)+'"'+(sel===v?' selected':'')+'>'+esc(s.name)+' · '+esc(areaName(s.area))+'</option>'}).join('')+'</optgroup>';
}
function qPlaceTag(q){
  var s=q.place?shopById(q.place):null;
  if(s)return '<span class="tag">'+ic('pin')+fmt(s.name)+' · '+esc(areaName(s.area))+'</span>';
  return q.area!=='any'?'<span class="tag">'+ic('pin')+esc(areaName(q.area))+'</span>':'';
}
function qStatus(q){
  return q.jaChecked?'<span class="status ok" style="align-self:flex-start">'+ic('check')+esc(t('checked'))+'</span>':
   '<span class="status draft" style="align-self:flex-start">'+ic('dot')+esc(t(q.ja?'qMT':'qNotTr'))+'</span>';
}
function ansName(a){return a.mine?myName():a.name}
function ansRole(a){return a.mine?S.profile.role:a.role}
function hideErr(id){var e=$('#'+id);if(e)e.hidden=true}
function saveProfile(){store.set(PROF_KEY,JSON.stringify(S.profile))}
function refreshProfileHead(){var a=$('#profAv'),n=$('#profName');if(a)a.innerHTML=avatarHTML(96);if(n)n.textContent=myName()}
function readPhoto(file,cb){
  if(!file||!/^image\//.test(file.type)){cb(null);return}
  var r=new FileReader();
  r.onload=function(){
    var img=new Image();
    img.onload=function(){
      try{
        var s=192,c=document.createElement('canvas');c.width=s;c.height=s;
        var m=Math.min(img.width,img.height),sx=(img.width-m)/2,sy=(img.height-m)/2;
        c.getContext('2d').drawImage(img,sx,sy,m,m,0,0,s,s);
        cb(c.toDataURL('image/jpeg',.82));
      }catch(e){cb(null)}
    };
    img.onerror=function(){cb(null)};
    img.src=r.result;
  };
  r.onerror=function(){cb(null)};
  r.readAsDataURL(file);
}

/* Shared places list (db capability). Without it the page still works for this visit. */
function shopFromDoc(id,d){
  return {id:id,name:String(d.name||'').slice(0,60),cat:PLACE_CATS.indexOf(d.cat)>-1?d.cat:'eat',area:String(d.area||'Matsuyama').slice(0,40),n:0,
    tags:Array.isArray(d.tags)?d.tags.slice(0,10).map(function(x){return String(x).slice(0,40)}):[],note:String(d.note||'').slice(0,160),by:String(d.by||'').slice(0,30),added:true,fromDb:true};
}
function applyPlaces(snap){
  var seen={};
  snap.docs.forEach(function(d){
    var x=d.data();if(!x||!x.name)return;
    seen[d.id]=1;
    var s=shopFromDoc(d.id,x),ex=shopById(d.id);
    addArea(s.area);
    if(ex){s.n=ex.n;SHOPS[SHOPS.indexOf(ex)]=s}else SHOPS.push(s);
  });
  for(var i=SHOPS.length-1;i>=0;i--)if(SHOPS[i].fromDb&&!seen[SHOPS[i].id])SHOPS.splice(i,1);
  placesChanged();
}
function refreshPlaceSelects(){
  var a=$('#aplace'),b=$('#ashop'),c=$('#vshop');
  if(a&&S.view==='ask')a.innerHTML=placeOpts(S.ask.place);
  if(b&&S.view==='answer')b.innerHTML=shopOpts(S.compose.shop,t('noShop'));
  if(c&&S.view==='visit')c.innerHTML=shopOpts(S.visit.shop);
}
function placesChanged(){
  if(S.view==='picks'||S.view==='pick')render();
  else{renderChrome();refreshPlaceSelects()}
}
function savePlace(s){
  if(!DB.ref)return;
  DB.ref.doc(s.id).set({name:s.name,cat:s.cat,area:s.area,tags:s.tags,note:s.note,by:s.by,at:Date.now()})
    .then(function(){s.local=false}).catch(function(){toast(t('placeLocal'))});
}
function initDb(){
  try{
    if(!(window.claude&&typeof window.claude.use==='function'))return;
    window.claude.use('db').then(function(db){
      if(!db)return;
      DB.ref=db.collection('places');
      DB.ref.onSnapshot(applyPlaces,function(){});
    }).catch(function(){});
  }catch(e){}
}

function addPlaceView(){
  var f=S.np,other=f.area==='__other';
  return '<button class="back" data-act="back">'+ic('back')+esc(t('back'))+'</button>'+
  '<div class="page-head"><h1>'+esc(t('addPlace'))+'</h1><p class="lead">'+esc(t('addPlaceSub'))+'</p></div>'+
  '<form class="form" id="placeForm" novalidate>'+
   '<div class="field"><label class="lbl" for="npName">'+esc(t('placeName'))+'</label><input type="text" id="npName" maxlength="60" value="'+esc(f.name)+'" placeholder="'+esc(t('placeNamePh'))+'" autocomplete="off"></div>'+
   '<div class="row2"><div class="field"><label class="lbl" for="npCat">'+esc(t('placeType'))+'</label><select id="npCat">'+PLACE_CATS.map(function(c){return '<option value="'+c+'"'+(f.cat===c?' selected':'')+'>'+esc(t('pt_'+c))+'</option>'}).join('')+'</select></div>'+
   '<div class="field"><label class="lbl" for="npArea">'+esc(t('placeArea'))+'</label><select id="npArea">'+AREAS.map(function(a){return '<option value="'+esc(a)+'"'+(f.area===a?' selected':'')+'>'+esc(areaName(a))+'</option>'}).join('')+'<option value="__other"'+(other?' selected':'')+'>'+esc(t('otherArea'))+'</option></select></div></div>'+
   '<div class="field" id="npOtherWrap"'+(other?'':' hidden')+'><label class="lbl" for="npOther">'+esc(t('otherArea'))+'</label><input type="text" id="npOther" maxlength="40" value="'+esc(f.other)+'" placeholder="'+esc(t('otherAreaPh'))+'" autocomplete="off"></div>'+
   '<div class="field"><span class="lbl" style="font-weight:700;font-size:var(--fs-sm)">'+esc(t('features'))+'</span><div class="chips">'+TAG_OPTS.map(function(x){return '<button type="button" class="chip" data-act="nptag" data-id="'+esc(x)+'" aria-pressed="'+(f.tags.indexOf(x)>-1)+'">'+esc(x)+'</button>'}).join('')+'</div></div>'+
   '<div class="field"><label class="lbl" for="npNote">'+esc(t('placeNote'))+'</label><textarea id="npNote" rows="3" maxlength="160" style="min-height:88px" placeholder="'+esc(t('placeNotePh'))+'">'+esc(f.note)+'</textarea></div>'+
   '<div class="err" id="nperr" role="alert" hidden></div>'+
   '<p class="foot">'+esc(t(DB.ref?'placeShared':'placeLocalNote'))+'</p>'+
   '<button class="btn btn-primary btn-lg" type="submit">'+esc(t('savePlace'))+(S.mode==='answer'&&S.joined?' · +'+PLACE_PTS+' '+esc(t('pts')):'')+'</button></form>';
}

