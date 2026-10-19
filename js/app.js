/* MatsuTalk · js/app.js */
"use strict";
/* Events */
document.addEventListener('click',function(e){
  var el=e.target.closest('[data-act],[data-nav]');if(!el||el.disabled)return;
  var a=el.dataset.act,id=el.dataset.id;
  if(S.drawer&&el.closest('#drawer')&&a!=='toggleTopics'&&a!=='closeDrawer')closeDrawer();
  if(el.dataset.nav){go(el.dataset.nav);return}
  if(extraClick(a,id,el))return;
  if(a==='enter'){store.set('seen','1');S.mode='ask';go('home')}
  else if(a==='enterAnswer'){store.set('seen','1');enterAnswer()}
  else if(a==='toAnswer'){enterAnswer()}
  else if(a==='toAsk'){S.mode='ask';go('home')}
  else if(a==='switchMode'){if(S.mode==='answer'){S.mode='ask';go('home')}else enterAnswer()}
  else if(a==='compose'){S.qid=id;S.compose={text:'',shop:''};go('answer')}
  else if(a==='orig'){S.showOrig[id]=!S.showOrig[id];render()}
  else if(a==='onlymine'){S.onlyMine=!S.onlyMine;render()}
  else if(a==='ncat'){var ci=S.ans.cats.indexOf(id);if(ci>-1)S.ans.cats.splice(ci,1);else S.ans.cats.push(id);render()}
  else if(a==='rwtab'){S.rwtab=id;render()}
  else if(a==='exchange'){S.confirm=id;render()}
  else if(a==='confirmEx'){doExchange(id)}
  else if(a==='coupon'){S.cid=id;go('coupon')}
  else if(a==='scan'){var cp=couponById(id);if(cp&&!cp.used){cp.used=true;render();toast(t('usedN'))}}
  else if(a==='lang'){S.lang=id;store.set('lang',id);render()}
  else if(a==='open'){S.qid=id;go('detail')}
  else if(a==='back'){goBack()}
  else if(a==='pick'){S.shopId=id;go('pick')}
  else if(a==='topic'){S.topic=id;render()}
  else if(a==='ptab'){S.ptab=id;render()}
  else if(a==='ja'){S.showJa[id]=!S.showJa[id];render()}
  else if(a==='helpful'){S.helpful[id]=!S.helpful[id];render()}
  else if(a==='thank'){S.thanked[id]=!S.thanked[id];render();if(S.thanked[id])toast(t('thanked'))}
  else if(a==='visit'){S.visit.shop=id;go('visit')}
});
document.addEventListener('input',function(e){
  var id=e.target.id;
  if(extraInput(id,e.target))return;
  if(id==='search'){S.q=e.target.value;$('#board').innerHTML=boardHTML()}
  else if(id==='qtext'){S.ask.text=e.target.value;var er=$('#qerr');if(er)er.hidden=true}
  else if(id==='vmsg')S.visit.msg=e.target.value;
  else if(id==='atext'){S.compose.text=e.target.value;$('#easy').innerHTML=easyMsg(e.target.value);var ae=$('#aerr');if(ae)ae.hidden=true}
});
document.addEventListener('change',function(e){
  var el=e.target,id=el.id;
  if(extraChange(id,el))return;
  if(el.classList.contains('lang-select')){S.lang=el.value;store.set('lang',el.value);render()}
  else if(id==='acat'){S.ask.cat=el.value;$('#referral').hidden=!(el.value==='hospital'||el.value==='procedures')}
  else if(id==='topicSel'){S.topic=el.value;$('#board').innerHTML=boardHTML()}
  else if(id==='atopicSel'){S.atopic=el.value;$('#board').innerHTML=aBoardHTML()}
  else if(id==='ashop')S.compose.shop=el.value;
  else if(id==='sagree')S.signup.agree=el.checked;
  else if(id==='acheck')S.ask.check=el.checked;
  else if(id==='vshop')S.visit.shop=el.value;
  else if(id==='vphoto'&&el.files&&el.files[0]){
    var r=new FileReader();r.onload=function(){S.photo=r.result;var b=$('#photoBox');if(b)b.innerHTML=photoInner()};r.readAsDataURL(el.files[0]);
  }
});
document.addEventListener('submit',function(e){
  e.preventDefault();
  if(extraSubmit(e.target.id))return;
  if(e.target.id==='askForm'){
    var f=S.ask;
    if(f.text.trim().length<8){var er=$('#qerr');er.textContent=t('tooShort');er.hidden=false;$('#qtext').focus();return}
    var qa='any',qp=null;
    if(f.place.indexOf('area:')===0)qa=f.place.slice(5);
    else if(f.place.indexOf('shop:')===0){var qs=shopById(f.place.slice(5));if(qs){qp=qs.id;qa=qs.area}}
    var qtext=f.text.trim();
    var q={id:'m'+Date.now(),cat:f.cat,area:qa,place:qp,lang:S.lang,ago:'Just now',text:qtext,answers:[],mine:1,check:(f.check&&S.lang!=='ja')?1:0,referral:(f.cat==='hospital'||f.cat==='procedures')?1:0};
    if(S.lang==='ja'){q.ja=qtext;q.jaChecked=true}
    QUESTIONS.unshift(q);S.ask={text:'',cat:'garbage',place:'any',check:false};S.qid=q.id;S.hist=[{view:'home',qid:null,shopId:S.shopId}];go('detail',false);toast(t('posted'));
  }else if(e.target.id==='visitForm'){
    var s=shopById(S.visit.shop);
    VISITS.unshift({shop:s.name,shopId:s.id,msg:S.visit.msg.trim(),photo:S.photo,when:'Just now'});
    S.visit={shop:S.visit.shop,msg:''};S.photo=null;go('profile');toast(t('saved'));
  }else if(e.target.id==='signupForm'){
    var sf=S.signup;
    if(!S.profile.name.trim()){showErr('serr',t('nameErr'));return}
    if(!sf.agree){showErr('serr',t('agreeErr'));return}
    S.joined=true;S.pts=WELCOME_PTS;go('qhome');toast(t('bonus').replace(/[\[\]]/g,''));
  }else if(e.target.id==='composeForm'){
    var cq=qById(S.qid),txt=S.compose.text.trim();
    if(!cq)return;
    if(txt.length<6){showErr('aerr',t('ansTooShort'));$('#atext').focus();return}
    var earned=myCount()+1>=TITLE_AT;
    var ans={id:'my'+Date.now(),mine:1,title:earned?1:0,status:'draft',pending:1,ja:txt,en:txt,shop:S.compose.shop||undefined};
    cq.answers.push(ans);S.myAnswers.push({qid:cq.id,aid:ans.id});S.pts+=PTS_PER;
    var sh=ans.shop?shopById(ans.shop):null;if(sh)sh.n+=1;
    go('qhome');toast(earned&&myCount()===TITLE_AT?t('titleEarned'):t('posted2').replace(/[\[\]]/g,''));
  }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&S.drawer){closeDrawer();var mb=document.querySelector('[data-act="openDrawer"]');if(mb&&mb.focus)mb.focus()}
});
initDb();
render();
