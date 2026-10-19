/* MatsuTalk · js/data.js */
"use strict";
/* Sample data. Names and numbers in [ ] are examples. */
var SHOPS=[
 {id:'s1',name:'[Mikan Kitchen]',cat:'eat',area:'Dogo Onsen',n:14,tags:['Picture menu','Easy ordering']},
 {id:'s6',name:'[Yu no Machi Bathhouse]',cat:'onsen',area:'Dogo Onsen',n:12,tags:['Towel rental','Good for first visit']},
 {id:'s4',name:'[Cafe Nami]',cat:'cafe',area:'Ichiban-cho',n:11,tags:['Wi-Fi','Quiet']},
 {id:'s2',name:'[Dogo Soba Hanaya]',cat:'eat',area:'Dogo Onsen',n:9,tags:['Takes cards','Quiet']},
 {id:'s8',name:'[Seto Sweets]',cat:'shop',area:'Okaido',n:8,tags:['Mikan sweets','Gift boxes']},
 {id:'s3',name:'[Okaido Ramen Ichi]',cat:'eat',area:'Okaido',n:7,tags:['Ticket machine with photos']},
 {id:'s5',name:'[Botchan Bakery]',cat:'cafe',area:'Matsuyama Station',n:6,tags:['Take-out','Early opening']},
 {id:'s7',name:'[Tobe Pottery Studio]',cat:'shop',area:'Tobe',n:5,tags:['Hands-on class','Ships abroad']}
];
var PICKTABS=['all','eat','cafe','onsen','shop'];
var QUESTIONS=[
 {id:'q1',ja:'松山駅の近くに引っ越してきました。燃えるごみは何曜日に収集されますか？どの袋を使えばいいですか？',cat:'garbage',area:'Matsuyama Station',lang:'vi',ago:'[3h] ago',text:'I just moved near Matsuyama Station. What day do they collect burnable garbage, and which bag do I use?',answers:[
  {id:'a1',name:'[Yuki]',role:'local',title:1,status:'checked',en:'Burnable garbage goes out by [8 a.m.] on [Mondays and Thursdays]. Put it in the bag the city designates.',ja:'もえるゴミは、[月曜日と木曜日]の朝[8時]までに出します。ゴミは、市がきめた袋に入れます。'},
  {id:'a2',name:'[Kenji]',role:'local',status:'draft',en:"The day depends on your district. Please look at the city's garbage calendar. There is also a smartphone app.",ja:'地区によって、日がちがいます。市のゴミカレンダーを見てください。スマホのアプリもあります。'}]},
 {id:'q2',ja:'熱があって、今日は日曜日です。開いているクリニックはどこで見つかりますか？',cat:'hospital',area:'any',lang:'en',ago:'[5h] ago',referral:1,text:'I have a fever and it is Sunday. Where can I find a clinic that is open?',answers:[
  {id:'a3',name:'[Mari]',role:'local',status:'checked',en:"Many clinics are closed on Sundays. Please look up the city's [holiday on-duty clinic] list. If it is serious, call 119.",ja:'日曜日は、休みの病院が多いです。市の[休日当番医]をしらべてください。ひどいときは、119番に電話してください。'}]},
 {id:'q3',ja:'市電のお金は、クレジットカードではらえますか？それとも小銭が必要ですか？',cat:'transit',area:'Matsuyama City Station',lang:'zh',ago:'[1d] ago',text:'Can I pay for the tram with a credit card, or do I need coins?',answers:[
  {id:'a4',name:'[Taro]',role:'local',status:'checked',en:'You can use an [IC card] on the Iyotetsu tram. If you do not have one, pay with coins.',ja:'伊予鉄の電車は、[ICカード]が使えます。ICカードがないときは、小銭ではらいます。'}]},
 {id:'q4',ja:'道後温泉の近くで、注文が簡単なランチのお店はありますか？日本語が読めません。',cat:'food',area:'Dogo Onsen',lang:'en',ago:'[1d] ago',text:'Is there a place for lunch near Dogo Onsen where ordering is easy? I cannot read Japanese.',answers:[
  {id:'a5',name:'[Sayaka]',role:'local',title:1,status:'checked',shop:'s1',en:'[Mikan Kitchen] has a picture menu. You can order by pointing.',ja:'[ミカンキッチン]は、写真のメニューがあります。ゆびさしで注文できます。'},
  {id:'a6',name:'[Mikan Kitchen]',role:'shop',status:'draft',shop:'s1',en:'Lunch is from [11 a.m.] to [2 p.m.]. We look forward to seeing you.',ja:'ランチは、[11時]から[14時]までです。おまちしています。'}]},
 {id:'q5',check:1,ja:'冬用の安い布団はどこで買えますか？',cat:'shopping',area:'Ichiban-cho',lang:'ko',ago:'[2d] ago',text:'Where can I buy a cheap futon for winter?',answers:[
  {id:'a7',name:'[Haruto]',role:'local',status:'draft',en:'You can buy one at a [home center]. You can also buy one online.',ja:'[ホームセンター]で買えます。ネットでも買えます。'}]},
 {id:'q6',ja:'引っ越しました。在留カードの住所を変更するには、どの市の窓口に行けばいいですか？',cat:'procedures',area:'any',lang:'id',ago:'[2d] ago',referral:1,text:'I moved to a new apartment. Which city office do I go to to update the address on my residence card?',answers:[
  {id:'a8',name:'[Aya]',role:'local',status:'checked',en:'After you move, go to the city hall within [14 days]. Please ask the city hall staff for details.',ja:'引っこしたら、[14日]いないに、市役所に行きます。くわしいことは、市役所の人にきいてください。'}]},
 {id:'q7',ja:'市の近くで紅葉が見られるところはどこですか？',cat:'fun',area:'Matsuyama Castle',lang:'en',ago:'[3d] ago',text:'Where can I see autumn leaves close to the city?',answers:[
  {id:'a9',name:'[Daisuke]',role:'local',status:'checked',en:'The area around [Matsuyama Castle] is beautiful too. The ropeway gives a great view.',ja:'[松山城]のまわりも、きれいです。ロープウェイにのると、けしきがよく見えます。'}]},
 {id:'q8',ja:'愛媛のみかんで、あまいのはどれですか？どうやって食べるのがいいですか？',cat:'food',area:'any',lang:'zh',ago:'[4d] ago',text:'Which Ehime mikan are sweet? How should I eat them?',answers:[
  {id:'a10',name:'[Emi]',role:'local',title:1,status:'checked',shop:'s8',en:'[Benimadonna] is sweet and soft. Early winter is the best time to eat it. [Seto Sweets] sells it in gift boxes.',ja:'[紅まどんな]は、あまくて、やわらかいです。冬のはじめが、おいしい時期です。[セトスイーツ]では、ギフトの箱でも売っています。'}]},
 {id:'q9',ja:'スーパーにマイバッグを持って行ってもいいですか？レジ袋はお金がかかりますか？',cat:'life',area:'Okaido',lang:'en',ago:'[10m] ago',mine:1,text:'Can I bring my own bag to the supermarket? Do plastic bags cost money?',answers:[]},
 {id:'q10',ja:'はじめて日本の公衆浴場に行ってみたいです。道後で、初心者にやさしい場所はどこですか？',cat:'fun',area:'Dogo Onsen',lang:'ko',ago:'[5d] ago',text:'I want to try a Japanese public bath for the first time. Which place in Dogo is easy for beginners?',answers:[
  {id:'a11',name:'[Hiroshi]',role:'local',title:1,status:'checked',shop:'s6',en:'[Yu no Machi Bathhouse] is easy for a first visit. You can rent a towel, and the staff explain the rules at the entrance.',ja:'[湯の町の湯]は、はじめてでも安心です。タオルをかりられます。入り口で、スタッフがルールを教えてくれます。'}]},
 {id:'q11',check:1,ja:'コーヒーとWi-Fiがあって、数時間座れる場所はどこですか？静かに勉強できる場所がほしいです。',cat:'food',area:'Ichiban-cho',lang:'vi',ago:'[6d] ago',text:'Where can I sit for a few hours with coffee and Wi-Fi? I need a quiet place to study.',answers:[
  {id:'a12',name:'[Nana]',role:'local',status:'checked',shop:'s4',en:'[Cafe Nami] is quiet and has Wi-Fi. The seats by the window are the best.',ja:'[カフェ・ナミ]は、しずかで、Wi-Fiがあります。まどぎわの席が、おすすめです。'}]},
 {id:'q12',ja:'道後温泉の近くのそば屋で、クレジットカードは使えますか？',cat:'food',area:'Dogo Onsen',lang:'zh',ago:'[1w] ago',text:'Can I pay by credit card at a soba restaurant near Dogo Onsen?',answers:[
  {id:'a13',name:'[Ryo]',role:'local',status:'draft',shop:'s2',en:'[Dogo Soba Hanaya] takes cards. It is a quiet place, so it is good for a calm lunch.',ja:'[道後そば華屋]は、カードが使えます。しずかなお店なので、ゆっくりランチができます。'}]},
 {id:'q13',ja:'大街道の近くでラーメンが食べたいですが、日本語が話せません。注文が簡単なお店はありますか？',cat:'food',area:'Okaido',lang:'en',ago:'[1w] ago',text:'I want ramen near Okaido, but I cannot speak Japanese. Is there a shop where ordering is simple?',answers:[
  {id:'a14',name:'[Kaito]',role:'local',status:'checked',shop:'s3',en:'[Okaido Ramen Ichi] has a ticket machine with photos. Push the button for the ramen you want, then give the ticket to the staff.',ja:'[大街道らーめん一]は、写真つきの券売機があります。たべたいラーメンのボタンをおして、チケットをスタッフにわたします。'}]},
 {id:'q14',ja:'松山駅の近くで、朝ごはん用のパンはどこで買えますか？',cat:'food',area:'Matsuyama Station',lang:'id',ago:'[1w] ago',text:'Where can I buy bread for breakfast near Matsuyama Station?',answers:[
  {id:'a15',name:'[Mio]',role:'local',status:'checked',shop:'s5',en:'[Botchan Bakery] opens early, and you can take the bread out. It is good for a quick breakfast.',ja:'[坊っちゃんベーカリー]は、朝早くあいています。持ち帰りもできます。かんたんな朝ごはんにぴったりです。'}]},
 {id:'q15',ja:'陶芸を体験して、海外の家族に贈り物を送りたいです。愛媛でできますか？',cat:'shopping',area:'Tobe',lang:'en',ago:'[2w] ago',text:'I want to make pottery and send a gift to my family abroad. Is that possible in Ehime?',answers:[
  {id:'a16',name:'[Satoshi]',role:'local',title:1,status:'checked',shop:'s7',en:'[Tobe Pottery Studio] has a hands-on class. The shop can also ship your pottery abroad.',ja:'[砥部やきの工房]では、体験教室があります。海外におくることもできます。'}]}
];
var VISITS=[{shop:'[Cafe Nami]',msg:'Great coffee. Thank you for the tip, [Emi]!',photo:null,when:'[Yesterday]'}];

var COLORS=['sea','mikan','leaf','ink'],PROF_KEY='profile';
function loadProfile(){
  var d={name:'',photo:null,color:'sea',bio:'',home:'any',role:'local',tlangs:['en','zh','ko','vi','id']};
  try{
    var r=JSON.parse(store.get(PROF_KEY)||'null');
    if(r&&typeof r==='object'){
      if(typeof r.name==='string')d.name=r.name.slice(0,30);
      if(typeof r.photo==='string'&&r.photo.indexOf('data:image/')===0)d.photo=r.photo;
      if(COLORS.indexOf(r.color)>-1)d.color=r.color;
      if(typeof r.bio==='string')d.bio=r.bio.slice(0,140);
      if(typeof r.home==='string')d.home=r.home;
      if(r.role==='local'||r.role==='shop')d.role=r.role;
      if(Array.isArray(r.tlangs))d.tlangs=r.tlangs.filter(function(c){return ['en','zh','ko','vi','id'].indexOf(c)>-1});
    }
  }catch(e){}
  return d;
}
var S={lang:store.get('lang')||'en',view:store.get('seen')?'home':'welcome',hist:[],qid:null,shopId:'s1',mode:'ask',joined:false,signup:{agree:false},profile:loadProfile(),
  topicsOpen:{rail:false,drawer:true},drawer:false,pts:0,myAnswers:[],coupons:[],atopic:'all',onlyMine:false,ans:{cats:CATS.slice()},compose:{text:'',shop:''},showOrig:{},rwtab:'all',confirm:null,cid:null,topic:'all',q:'',ptab:'all',
  showJa:{},thanked:{},helpful:{},photo:null,
  ask:{text:'',cat:'garbage',place:'any',check:false},visit:{shop:'s1',msg:''},
  trTab:'all',trAll:false,trId:null,trDraft:{},trDone:0,
  np:{name:'',cat:'eat',area:'Dogo Onsen',other:'',tags:[],note:''}};
if(!T[S.lang])S.lang='en';

function t(k,v){var s=(T[S.lang]&&T[S.lang][k])||T.en[k]||k;if(v)for(var x in v)s=s.replace('{'+x+'}',v[x]);return s}
function shopById(id){return SHOPS.filter(function(s){return s.id===id})[0]}
function qById(id){return QUESTIONS.filter(function(q){return q.id===id})[0]}
function areaName(a){return S.lang==='ja'&&AREAJA[a]?AREAJA[a]:a}
function langLabel(c){
  if(S.lang==='en')return LANGNAME[c];
  if(S.lang==='ja')return JANAMES[c];
  var m=LANGS.filter(function(l){return l[0]===c})[0];return m?m[1]:c;
}
function answersForShop(id){var out=[];QUESTIONS.forEach(function(q){q.answers.forEach(function(a){if(a.shop===id)out.push({q:q,a:a})})});return out}



