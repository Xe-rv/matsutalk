/* MatsuTalk · js/icons.js */
"use strict";
/* Icons */
var I={
  home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  dot:'<circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  pin:'<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  tr:'<path d="M4 5h9M8.5 3v2M6 5c.6 3 3 6 6 7M12 5c-.6 3-3 6-6 8"/><path d="M13 21l4-9 4 9M14.5 18h5"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  arrow:'<path d="M9 5l7 7-7 7"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/>',
  gift:'<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>',
  list:'<path d="M4 6h16M4 12h16M4 18h10"/>',
  sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  chev:'<path d="M6 9l6 6 6-6"/>',
  tag:'<path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="8.5" cy="8.5" r="1.4"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>'
};
var ic=function(n,c){return '<svg class="ic '+(c||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+I[n]+'</svg>'};
var MARK='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="23" r="15" fill="#F28A1B"/><path d="M20 23V9M20 23L9 16M20 23l11-7M20 23l-8 12M20 23l8 12" stroke="rgba(255,255,255,.6)" stroke-width="1.6" stroke-linecap="round"/><path d="M20 9c0-4 3-6.5 8-5.5-1 4.3-4 6.3-8 5.5z" fill="#3E9B63"/></svg>';
var LOGO='<span class="logo">'+MARK+'<span>Matsu<b>Talk</b></span></span>';

