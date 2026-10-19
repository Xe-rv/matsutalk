/* MatsuTalk · js/core.js */
"use strict";
var $=function(s){return document.querySelector(s)};
var store={get:function(k){try{return localStorage.getItem('mt_'+k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem('mt_'+k,v)}catch(e){}}};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var fmt=function(s){return esc(s).replace(/\[([^\]]+)\]/g,'<span class="sample">[$1]</span>')};

/* Seigaiha wave pattern, drawn once and reused by every hero */
(function(){
  var rows=[[-10,[20]],[0,[0,40]],[10,[20]],[20,[0,40]],[30,[20]]],g='';
  rows.forEach(function(r){r[1].forEach(function(cx){[20,15,10,5].forEach(function(rad){
    g+='<circle cx="'+cx+'" cy="'+r[0]+'" r="'+rad+'" style="fill:var(--hero-1);stroke:rgba(255,255,255,.16)" stroke-width="1"/>';});});});
  $('#defs').innerHTML='<defs><pattern id="sg" width="40" height="20" patternUnits="userSpaceOnUse">'+g+'</pattern></defs>';
})();

