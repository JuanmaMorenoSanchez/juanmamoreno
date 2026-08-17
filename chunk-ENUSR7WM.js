import{a as pt,b as ut}from"./chunk-WV7WCGVJ.js";import{a as ft,b as gt,l as ht}from"./chunk-RBAF5KFB.js";import{b as ot,c as dt,d as mt}from"./chunk-PCQ7W5MZ.js";import{a as ct}from"./chunk-EBJ3PXTE.js";import{a as C}from"./chunk-TCUJPVBP.js";import{b as it,e as at,f as nt}from"./chunk-2GQXB67H.js";import{a as st,d as b,e as lt}from"./chunk-BDH6MHEV.js";import{d as Z,f as tt}from"./chunk-GKHDUJJB.js";import{a as et,c as N,f as rt}from"./chunk-46WZBZOZ.js";import{Cb as W,Db as X,Dc as P,Fb as p,Gb as u,Ha as A,Ib as k,Jb as E,Kb as f,Lb as s,Lc as Q,Mb as l,Mc as y,Nb as w,Ub as F,Wa as U,Wb as S,Yb as d,Zb as Y,_ as V,_b as H,aa as m,cb as o,fa as h,ga as v,hc as G,ic as q,kc as x,lc as L,ma as j,mc as O,nc as J,oa as z,p as R,qb as T,sa as M,sb as _,va as $,vc as K,wc as D,xc as I}from"./chunk-ZVUPVOEX.js";var Ct=["*"];var bt=new V("MAT_CARD_CONFIG"),vt=(()=>{class i{appearance;constructor(){let t=m(bt,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=T({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,a){e&2&&q("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:Ct,decls:1,vars:0,template:function(e,a){e&1&&(Y(),H(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var _t=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=_({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-mdc-card-image","mdc-card__media"]})}return i})();var xt=(()=>{class i{constructor(){this.el=m(A),this.isBrowser=tt(m($)),this.visible=new z,this.isBrowser&&(this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275dir=_({type:i,selectors:[["","appLazyLoad",""]],outputs:{visible:"visible"}})}}return i})();var Mt=3,yt=(()=>{class i{constructor(){this.el=m(A),this.maxShiftPercent=y(Mt),this.rafId=0,this.onPointerMove=t=>{if(this.rafId)return;let{clientX:e,clientY:a}=t;this.rafId=requestAnimationFrame(()=>{this.rafId=0,this.apply(e,a)})},!(typeof document>"u")&&document.addEventListener("pointermove",this.onPointerMove,{passive:!0})}ngOnDestroy(){typeof document>"u"||(document.removeEventListener("pointermove",this.onPointerMove),this.rafId&&cancelAnimationFrame(this.rafId))}apply(t,e){let a=this.clamp((t-window.innerWidth/2)/(window.innerWidth/2)),n=this.clamp((e-window.innerHeight/2)/(window.innerHeight/2)),c=this.maxShiftPercent(),g=this.el.nativeElement.style;g.setProperty("--parallax-x",`${(a*c).toFixed(2)}%`),g.setProperty("--parallax-y",`${(n*c).toFixed(2)}%`)}clamp(t){return Math.min(1,Math.max(-1,t))}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275dir=_({type:i,selectors:[["","appParallaxTilt",""]],inputs:{maxShiftPercent:[1,"maxShiftPercent"]}})}}return i})();var wt=i=>({container:i});function St(i,r){return this.methodTracking(r)}var Dt=(i,r)=>r.tokenId;function It(i,r){if(i&1&&(s(0,"mat-icon"),x(1),l()),i&2){let t=d(3);o(),O(" ",t.sortOrder()==="asc"?"arrow_upward":"arrow_downward"," ")}}function Pt(i,r){if(i&1){let t=F();s(0,"mat-chip",6),D(1,"translate"),S("click",function(){let a=h(t).$implicit,n=d(2);return v(n.changeSortMethod(a))}),s(2,"span",3),x(3),D(4,"translate"),l(),s(5,"mat-icon"),x(6),l(),p(7,It,2,1,"mat-icon"),l()}if(i&2){let t=r.$implicit,e=d(2);f("matTooltip",`${I(1,5,"sortBy")} ${t}`),o(3),J("",I(4,7,"sortBy")," ",t),o(3),O(" ",t==="year"?"calendar_today":t==="medium"?"palette":"crop_free"," "),o(),u(e.activeSortMethod()===t?7:-1)}}function At(i,r){if(i&1&&(s(0,"mat-chip"),w(1,"app-pdf-button",7),l()),i&2){let t=d(2);o(),f("nfts",t.selectedNfts())}}function Tt(i,r){if(i&1&&(s(0,"h1",3),x(1),D(2,"translate"),l(),s(3,"div",4)(4,"mat-chip-set"),k(5,Pt,8,9,"mat-chip",5,St,!0),p(7,At,2,1,"mat-chip"),l()()),i&2){let t=d();o(),L(I(2,2,"seo.paintings.title")),o(4),E(t.sortMethods),o(2),u(t.selectedNfts().length?7:-1)}}function kt(i,r){if(i&1&&(s(0,"div",12)(1,"span",15),x(2),l()()),i&2){let t=d().$implicit,e=d(2);o(2),L(e.getOrderNumber(t))}}function Et(i,r){if(i&1&&w(0,"img",13),i&2){let t=d().$implicit;f("src",r,U)("alt",t.name+" \u2014 painting by Juanma Moreno S\xE1nchez")}}function Ft(i,r){i&1&&w(0,"span",14)}function Lt(i,r){if(i&1){let t=F();s(0,"mat-grid-tile",9),X(function(){let a=h(t).$index,n=d(2);return v(n.tileEnterClass(a))}),S("contextmenu",function(a){let n=h(t).$implicit,c=d(2);return v(c.toggleNftSelection(a,n))}),s(1,"a",10),D(2,"translate"),S("click",function(){let a=h(t).$implicit,n=d(2);return v(n.handleArtPieceClick(a.tokenId))}),s(3,"mat-card",11),S("visible",function(){let a=h(t).$implicit,n=d(2);return v(n.onImageVisible(a.tokenId))}),p(4,kt,3,1,"div",12),p(5,Et,1,2,"img",13),p(6,Ft,1,0,"span",14),l()()()}if(i&2){let t,e=r.$implicit,a=r.$index,n=d(2);G("animation-delay",n.tileEnterDelay(a),"ms"),o(),f("routerLink",n.artworkLink(e.tokenId)),W("aria-label",n.isSold(e)?e.name+", "+I(2,7,"sold"):e.name),o(3),u(n.isSelected(e)?4:-1),o(),u((t=n.imgThumbUrls().get(e.tokenId)??e.image.thumbnailUrl)?5:-1,t),o(),u(n.isSold(e)?6:-1)}}function Ot(i,r){if(i&1&&(s(0,"mat-grid-list",1),k(1,Lt,7,9,"mat-grid-tile",8,Dt),l()),i&2){let t=d();f("cols",t.numberOfCols()),o(),E(t.sortedArtPieces())}}function Nt(i,r){i&1&&w(0,"mat-progress-spinner",2)}var be=(()=>{class i{constructor(){this.artworkService=m(st),this.router=m(at),this.activatedroute=m(it),this.responsiveService=m(mt),this.destroyRef=m(j),this.sortMethods=Object.values(b),this.inSpanish=this.router.url==="/es"||this.router.url.startsWith("/es/"),this.loadStarted=new Set,this.numberOfCols=y(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=y(!1),this.nftFilters=y({}),this.selectedTokenId=Q(),this.yearParamSignal=N(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=M(new Map),this.artPieces=N(this.artworkService.getArtPiecesObservable()),this.dataReady=P(()=>!!this.artPieces()?.length),this.filteredArtPieces=P(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],c=this.frontalViewByToken();return(t??[]).filter(g=>!this.artworkService.isExcludedByYear(g,n)&&!this.isExcludedById(g)&&(c.get(g.tokenId)??!1))}),this.frontalViewByToken=P(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let c=e.get(n.name);c?c.push(n):e.set(n.name,[n])}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=M(b.YEAR),this.sortOrder=M(C.DESC),this.sortedArtPieces=P(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case b.SIZE:return this.artworkService.sortBySize(e,t);case b.MEDIUM:return this.artworkService.sortByMedium(e,t);case b.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=M([])}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e)}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe(et(this.destroyRef)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n})}))}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(c=>c.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else{let c=[...a];c.splice(n,1),this.selectedNfts.set(c)}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}isSold(t){return lt.includes(t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===C.ASC?C.DESC:C.ASC)}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(C.ASC))}handleArtPieceClick(t){this.selectedTokenId.emit(t)}artworkLink(t){return this.inSpanish?["/es","artwork",t]:["/artwork",t]}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(t){return t<i.MAX_ANIMATED_TILES?"tile-enter":""}tileEnterDelay(t){return Math.min(t,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(R(t=>{let e=t.get("years");return e?e.split(","):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):!1}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275cmp=T({type:i,selectors:[["app-art-pieces-list"]],inputs:{numberOfCols:[1,"numberOfCols"],viewAsWidget:[1,"viewAsWidget"],nftFilters:[1,"nftFilters"]},outputs:{selectedTokenId:"selectedTokenId"},decls:4,vars:5,consts:[[3,"ngClass"],["appParallaxTilt","","gutterSize","10","rowHeight","1:1","role","list","aria-label","Art Pieces",3,"cols"],["diameter","48","mode","indeterminate","aria-label","Loading art pieces"],[1,"visually-hidden"],[1,"sort-group"],["color","primary","role","button",3,"matTooltip"],["color","primary","role","button",3,"click","matTooltip"],[3,"nfts"],["role","listitem",3,"animation-delay"],["role","listitem",3,"contextmenu"],[1,"tile-link",3,"click","routerLink"],["appLazyLoad","",3,"visible"],[1,"overlay"],["mat-card-image","","decoding","async",1,"front-image",3,"src","alt"],["aria-hidden","true",1,"sold-dot"],[1,"order-number"]],template:function(e,a){e&1&&(s(0,"div",0),p(1,Tt,8,4),p(2,Ot,3,1,"mat-grid-list",1)(3,Nt,1,0,"mat-progress-spinner",2),l()),e&2&&(f("ngClass",K(3,wt,!a.viewAsWidget())),o(),u(a.viewAsWidget()?-1:1),o(),u(a.dataReady()?2:3))},dependencies:[Z,dt,ot,ct,gt,ht,ut,pt,vt,ft,_t,xt,yt,nt,rt],styles:["mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.tile-link[_ngcontent-%COMP%]{display:block;width:100%;height:100%;color:inherit;text-decoration:none}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--mdc-elevated-card-container-color: var(--catalog-frame-bg);background-color:var(--catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--parallax-x, 0%),var(--parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}"]})}}return i})();export{be as a};
