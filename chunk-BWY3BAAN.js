import{a as vt,b as _t}from"./chunk-SULYDG7R.js";import{a as xt,b as Ct,l as bt}from"./chunk-7ON4YTJ4.js";import{b as lt,c as mt,d as ft}from"./chunk-Z4KNTH4L.js";import{a as ht}from"./chunk-F6GE6JFC.js";import{d as w,e as gt}from"./chunk-O3DSHUXK.js";import{a as pt}from"./chunk-BH76UZ2N.js";import{a as M}from"./chunk-TCUJPVBP.js";import{a as ut}from"./chunk-BZ3I23QH.js";import{b as ot,e as dt,f as ct}from"./chunk-U7DEF6XU.js";import{d as it,g as at}from"./chunk-5HKUA4MP.js";import{a as nt,b as rt,c as V,f as st}from"./chunk-OQ37HH7Q.js";import{$ as W,Ac as tt,Bc as A,Cc as D,Db as B,Eb as q,Gb as p,Hb as u,Ia as T,Jc as g,Kb as F,Lb as L,Mb as _,Nb as c,Ob as m,Pb as I,R as U,Rc as et,Sc as y,Wb as O,Xa as G,_b as b,ac as d,ba as l,bc as J,cc as K,db as o,ga as h,ha as v,l as z,lc as Q,mc as N,na as X,oc as f,pa as Y,pc as R,q as $,qc as P,rb as E,rc as Z,ta as x,tb as C,wa as H}from"./chunk-XWY5YJUZ.js";var Pt=["*"];var At=new W("MAT_CARD_CONFIG"),yt=(()=>{class i{appearance;constructor(){let t=l(At,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=E({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,a){e&2&&N("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:Pt,decls:1,vars:0,template:function(e,a){e&1&&(J(),K(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2})}return i})();var Mt=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=C({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-mdc-card-image","mdc-card__media"]})}return i})();var wt=(()=>{class i{constructor(){this.el=l(T),this.isBrowser=at(l(H)),this.visible=new Y,this.isBrowser&&(this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275dir=C({type:i,selectors:[["","appLazyLoad",""]],outputs:{visible:"visible"}})}}return i})();var Dt=3,St=(()=>{class i{constructor(){this.el=l(T),this.maxShiftPercent=y(Dt),this.rafId=0,this.onPointerMove=t=>{if(this.rafId)return;let{clientX:e,clientY:a}=t;this.rafId=requestAnimationFrame(()=>{this.rafId=0,this.apply(e,a)})},!(typeof document>"u")&&document.addEventListener("pointermove",this.onPointerMove,{passive:!0})}ngOnDestroy(){typeof document>"u"||(document.removeEventListener("pointermove",this.onPointerMove),this.rafId&&cancelAnimationFrame(this.rafId))}apply(t,e){let a=this.clamp((t-window.innerWidth/2)/(window.innerWidth/2)),n=this.clamp((e-window.innerHeight/2)/(window.innerHeight/2)),s=this.maxShiftPercent(),S=this.el.nativeElement.style;S.setProperty("--parallax-x",`${(a*s).toFixed(2)}%`),S.setProperty("--parallax-y",`${(n*s).toFixed(2)}%`)}clamp(t){return Math.min(1,Math.max(-1,t))}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275dir=C({type:i,selectors:[["","appParallaxTilt",""]],inputs:{maxShiftPercent:[1,"maxShiftPercent"]}})}}return i})();var kt=i=>({container:i});function Tt(i,r){return this.methodTracking(r)}var Et=(i,r)=>r.value,Ft=(i,r)=>r.tokenId;function Lt(i,r){if(i&1){let t=O();c(0,"button",9),b("click",function(){let a=h(t).$implicit,n=d(3);return v(n.setCriticFilter(a.value))}),f(1),m()}if(i&2){let t=r.$implicit,e=d(3);N("is-on",e.criticFilter()===t.value),B("aria-pressed",e.criticFilter()===t.value),o(),P(" ",t.label," ")}}function Ot(i,r){if(i&1&&(c(0,"div",4),F(1,Lt,2,4,"button",7,Et),c(3,"span",8),f(4),m()()),i&2){let t=d(2);o(),L(t.criticFilters),o(3),P("",t.editedCount()," edited")}}function Nt(i,r){if(i&1&&(c(0,"mat-icon"),f(1),m()),i&2){let t=d(3);o(),P(" ",t.sortOrder()==="asc"?"arrow_upward":"arrow_downward"," ")}}function Vt(i,r){if(i&1){let t=O();c(0,"mat-chip",10),A(1,"translate"),b("click",function(){let a=h(t).$implicit,n=d(2);return v(n.changeSortMethod(a))}),c(2,"span",3),f(3),A(4,"translate"),m(),c(5,"mat-icon"),f(6),m(),p(7,Nt,2,1,"mat-icon"),m()}if(i&2){let t=r.$implicit,e=d(2);_("matTooltip",`${D(1,5,"sortBy")} ${t}`),o(3),Z("",D(4,7,"sortBy")," ",t),o(3),P(" ",t==="year"?"calendar_today":t==="medium"?"palette":"crop_free"," "),o(),u(e.activeSortMethod()===t?7:-1)}}function Bt(i,r){if(i&1&&(c(0,"mat-chip"),I(1,"app-pdf-button",11),m()),i&2){let t=d(2);o(),_("nfts",t.selectedNfts())}}function Rt(i,r){if(i&1&&(c(0,"h1",3),f(1),A(2,"translate"),m(),p(3,Ot,5,1,"div",4),c(4,"div",5)(5,"mat-chip-set"),F(6,Vt,8,9,"mat-chip",6,Tt,!0),p(8,Bt,2,1,"mat-chip"),m()()),i&2){let t=d();o(),R(D(2,3,"seo.paintings.title")),o(2),u(t.isArtist()?3:-1),o(3),L(t.sortMethods),o(2),u(t.selectedNfts().length?8:-1)}}function jt(i,r){if(i&1&&(c(0,"div",16)(1,"span",19),f(2),m()()),i&2){let t=d().$implicit,e=d(2);o(2),R(e.getOrderNumber(t))}}function zt(i,r){if(i&1&&I(0,"img",17),i&2){let t=d().$implicit;_("src",r,G)("alt",t.name+" \u2014 painting by Juanma Moreno S\xE1nchez")}}function $t(i,r){i&1&&I(0,"span",18)}function Ut(i,r){if(i&1){let t=O();c(0,"mat-grid-tile",13),q(function(){let a=h(t).$index,n=d(2);return v(n.tileEnterClass(a))}),b("contextmenu",function(a){let n=h(t).$implicit,s=d(2);return v(s.toggleNftSelection(a,n))}),c(1,"a",14),A(2,"translate"),b("click",function(){let a=h(t).$implicit,n=d(2);return v(n.handleArtPieceClick(a.tokenId))}),c(3,"mat-card",15),b("visible",function(){let a=h(t).$implicit,n=d(2);return v(n.onImageVisible(a.tokenId))}),p(4,jt,3,1,"div",16),p(5,zt,1,2,"img",17),p(6,$t,1,0,"span",18),m()()()}if(i&2){let t,e=r.$implicit,a=r.$index,n=d(2);Q("animation-delay",n.tileEnterDelay(a),"ms"),o(),_("routerLink",n.artworkLink(e.tokenId)),B("aria-label",n.isSold(e)?e.name+", "+D(2,7,"sold"):e.name),o(3),u(n.isSelected(e)?4:-1),o(),u((t=n.imgThumbUrls().get(e.tokenId)??e.image.thumbnailUrl)?5:-1,t),o(),u(n.isSold(e)?6:-1)}}function Wt(i,r){if(i&1&&(c(0,"mat-grid-list",1),F(1,Ut,7,9,"mat-grid-tile",12,Ft),m()),i&2){let t=d();_("cols",t.numberOfCols()),o(),L(t.sortedArtPieces())}}function Xt(i,r){i&1&&I(0,"mat-progress-spinner",2)}var Ee=(()=>{class i{constructor(){this.artworkService=l(ut),this.router=l(dt),this.activatedroute=l(ot),this.responsiveService=l(ft),this.destroyRef=l(X),this.sortMethods=Object.values(w),this.inSpanish=this.router.url==="/es"||this.router.url.startsWith("/es/"),this.loadStarted=new Set,this.numberOfCols=y(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=y(!1),this.nftFilters=y({}),this.selectedTokenId=et(),this.yearParamSignal=V(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=x(new Map),this.artPieces=V(this.artworkService.getArtPiecesObservable()),this.dataReady=g(()=>!!this.artPieces()?.length),this.auth=l(ht),this.isArtist=g(()=>this.auth.isAdmin()),this.criticFilter=x("all"),this.editedByToken=V(rt(g(()=>this.auth.bearerToken())).pipe(U(t=>t?this.artworkService.getEditedCritics(t):z(new Map))),{initialValue:new Map}),this.criticFilters=[{value:"all",label:"All"},{value:"edited",label:"Edited"},{value:"untouched",label:"Not yet"}],this.editedCount=g(()=>{let t=this.editedByToken();return(this.artPieces()??[]).filter(e=>t.get(e.tokenId)===!0).length}),this.filteredArtPieces=g(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],s=this.frontalViewByToken(),S=this.criticFilter(),It=this.editedByToken();return(t??[]).filter(k=>!this.artworkService.isExcludedByYear(k,n)&&!this.isExcludedById(k)&&(s.get(k.tokenId)??!1)&&(S==="all"||It.get(k.tokenId)===!0==(S==="edited")))}),this.frontalViewByToken=g(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let s=e.get(n.name);s?s.push(n):e.set(n.name,[n])}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=x(w.YEAR),this.sortOrder=x(M.DESC),this.sortedArtPieces=g(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case w.SIZE:return this.artworkService.sortBySize(e,t);case w.MEDIUM:return this.artworkService.sortByMedium(e,t);case w.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=x([])}setCriticFilter(t){this.criticFilter.set(t)}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e)}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe(nt(this.destroyRef)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n})}))}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(s=>s.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else{let s=[...a];s.splice(n,1),this.selectedNfts.set(s)}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}isSold(t){return gt.includes(t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===M.ASC?M.DESC:M.ASC)}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(M.ASC))}handleArtPieceClick(t){this.selectedTokenId.emit(t)}artworkLink(t){return this.inSpanish?["/es","artwork",t]:["/artwork",t]}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(t){return t<i.MAX_ANIMATED_TILES?"tile-enter":""}tileEnterDelay(t){return Math.min(t,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe($(t=>{let e=t.get("years");return e?e.split(","):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):!1}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275cmp=E({type:i,selectors:[["app-art-pieces-list"]],inputs:{numberOfCols:[1,"numberOfCols"],viewAsWidget:[1,"viewAsWidget"],nftFilters:[1,"nftFilters"]},outputs:{selectedTokenId:"selectedTokenId"},decls:4,vars:5,consts:[[3,"ngClass"],["appParallaxTilt","","gutterSize","10","rowHeight","1:1","role","list","aria-label","Art Pieces",3,"cols"],["diameter","48","mode","indeterminate","aria-label","Loading art pieces"],[1,"visually-hidden"],["role","group","aria-label","Filter by edited essay",1,"edited-filter"],[1,"sort-group"],["color","primary","role","button",3,"matTooltip"],["type","button",1,"edited-filter-choice",3,"is-on"],[1,"edited-filter-count"],["type","button",1,"edited-filter-choice",3,"click"],["color","primary","role","button",3,"click","matTooltip"],[3,"nfts"],["role","listitem",3,"animation-delay"],["role","listitem",3,"contextmenu"],["draggable","false",1,"tile-link",3,"click","routerLink"],["appLazyLoad","",3,"visible"],[1,"overlay"],["mat-card-image","","decoding","async","draggable","false",1,"front-image",3,"src","alt"],["aria-hidden","true",1,"sold-dot"],[1,"order-number"]],template:function(e,a){e&1&&(c(0,"div",0),p(1,Rt,9,5),p(2,Wt,3,1,"mat-grid-list",1)(3,Xt,1,0,"mat-progress-spinner",2),m()),e&2&&(_("ngClass",tt(3,kt,!a.viewAsWidget())),o(),u(a.viewAsWidget()?-1:1),o(),u(a.dataReady()?2:3))},dependencies:[it,mt,lt,pt,Ct,bt,_t,vt,yt,xt,Mt,wt,St,ct,st],styles:["mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.tile-link[_ngcontent-%COMP%]{display:block;width:100%;height:100%;color:inherit;text-decoration:none;-webkit-user-drag:none;user-drag:none}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--mdc-elevated-card-container-color: var(--catalog-frame-bg);background-color:var(--catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--parallax-x, 0%),var(--parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}.edited-filter[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-bottom:.75rem;font-size:.75rem}.edited-filter-choice[_ngcontent-%COMP%]{padding:.15rem .6rem;border:1px solid var(--catalog-faint);border-radius:999px;background:transparent;font:inherit;color:var(--catalog-soft);cursor:pointer}.edited-filter-choice.is-on[_ngcontent-%COMP%]{border-color:var(--catalog-accent);color:var(--catalog-accent)}.edited-filter-count[_ngcontent-%COMP%]{margin-left:.2rem;color:var(--catalog-faint)}"]})}}return i})();export{Ee as a};
