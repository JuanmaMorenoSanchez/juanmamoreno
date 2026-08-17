import{a as lt,b as pt}from"./chunk-WV7WCGVJ.js";import{a as ut,b as ft,l as gt}from"./chunk-RBAF5KFB.js";import{b as rt,c as ot,d as st}from"./chunk-PCQ7W5MZ.js";import{a as dt}from"./chunk-EBJ3PXTE.js";import{a as y}from"./chunk-TCUJPVBP.js";import{b as it,e as at}from"./chunk-2GQXB67H.js";import{a as ct,d as C,e as mt}from"./chunk-BDH6MHEV.js";import{d as J,f as tt}from"./chunk-GKHDUJJB.js";import{a as et,c as L,f as nt}from"./chunk-46WZBZOZ.js";import{Cb as U,Db as X,Dc as S,Fb as p,Gb as u,Ha as D,Ib as k,Jb as E,Kb as _,Lb as m,Lc as Z,Mb as l,Mc as x,Nb as M,Ub as F,Wa as $,Wb as A,Yb as d,Zb as Y,_ as B,_b as W,aa as s,cb as o,fa as g,ga as h,hc as H,ic as G,kc as w,lc as q,ma as R,mc as O,nc as K,oa as j,p as V,qb as I,sa as b,sb as v,va as z,vc as Q,wc as P,xc as T}from"./chunk-ZVUPVOEX.js";var yt=["*"];var Ct=new B("MAT_CARD_CONFIG"),ht=(()=>{class i{appearance;constructor(){let t=s(Ct,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=I({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,a){e&2&&G("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:yt,decls:1,vars:0,template:function(e,a){e&1&&(Y(),W(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var vt=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=v({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-mdc-card-image","mdc-card__media"]})}return i})();var _t=(()=>{class i{constructor(){this.el=s(D),this.isBrowser=tt(s(z)),this.visible=new j,this.isBrowser&&(this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275dir=v({type:i,selectors:[["","appLazyLoad",""]],outputs:{visible:"visible"}})}}return i})();var bt=3,xt=(()=>{class i{constructor(){this.el=s(D),this.maxShiftPercent=x(bt),this.rafId=0,this.onPointerMove=t=>{if(this.rafId)return;let{clientX:e,clientY:a}=t;this.rafId=requestAnimationFrame(()=>{this.rafId=0,this.apply(e,a)})},!(typeof document>"u")&&document.addEventListener("pointermove",this.onPointerMove,{passive:!0})}ngOnDestroy(){typeof document>"u"||(document.removeEventListener("pointermove",this.onPointerMove),this.rafId&&cancelAnimationFrame(this.rafId))}apply(t,e){let a=this.clamp((t-window.innerWidth/2)/(window.innerWidth/2)),n=this.clamp((e-window.innerHeight/2)/(window.innerHeight/2)),c=this.maxShiftPercent(),f=this.el.nativeElement.style;f.setProperty("--parallax-x",`${(a*c).toFixed(2)}%`),f.setProperty("--parallax-y",`${(n*c).toFixed(2)}%`)}clamp(t){return Math.min(1,Math.max(-1,t))}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275dir=v({type:i,selectors:[["","appParallaxTilt",""]],inputs:{maxShiftPercent:[1,"maxShiftPercent"]}})}}return i})();var Mt=i=>({container:i});function wt(i,r){return this.methodTracking(r)}var St=(i,r)=>r.tokenId;function Dt(i,r){if(i&1&&(m(0,"mat-icon"),w(1),l()),i&2){let t=d(3);o(),O(" ",t.sortOrder()==="asc"?"arrow_upward":"arrow_downward"," ")}}function It(i,r){if(i&1){let t=F();m(0,"mat-chip",5),P(1,"translate"),A("click",function(){let a=g(t).$implicit,n=d(2);return h(n.changeSortMethod(a))}),m(2,"span",6),w(3),P(4,"translate"),l(),m(5,"mat-icon"),w(6),l(),p(7,Dt,2,1,"mat-icon"),l()}if(i&2){let t=r.$implicit,e=d(2);_("matTooltip",`${T(1,5,"sortBy")} ${t}`),o(3),K("",T(4,7,"sortBy")," ",t),o(3),O(" ",t==="year"?"calendar_today":t==="medium"?"palette":"crop_free"," "),o(),u(e.activeSortMethod()===t?7:-1)}}function At(i,r){if(i&1&&(m(0,"mat-chip"),M(1,"app-pdf-button",7),l()),i&2){let t=d(2);o(),_("nfts",t.selectedNfts())}}function Pt(i,r){if(i&1&&(m(0,"div",1)(1,"mat-chip-set"),k(2,It,8,9,"mat-chip",4,wt,!0),p(4,At,2,1,"mat-chip"),l()()),i&2){let t=d();o(2),E(t.sortMethods),o(2),u(t.selectedNfts().length?4:-1)}}function Tt(i,r){if(i&1&&(m(0,"div",11)(1,"span",14),w(2),l()()),i&2){let t=d().$implicit,e=d(2);o(2),q(e.getOrderNumber(t))}}function kt(i,r){if(i&1&&M(0,"img",12),i&2){let t=d().$implicit;_("src",r,$)("alt","Artwork "+t.name)}}function Et(i,r){i&1&&M(0,"span",13)}function Ft(i,r){if(i&1){let t=F();m(0,"mat-grid-tile",9),P(1,"translate"),X(function(){let a=g(t).$index,n=d(2);return h(n.tileEnterClass(a))}),A("contextmenu",function(a){let n=g(t).$implicit,c=d(2);return h(c.toggleNftSelection(a,n))})("click",function(){let a=g(t).$implicit,n=d(2);return h(n.handleArtPieceClick(a.tokenId))}),m(2,"mat-card",10),A("visible",function(){let a=g(t).$implicit,n=d(2);return h(n.onImageVisible(a.tokenId))}),p(3,Tt,3,1,"div",11),p(4,kt,1,2,"img",12),p(5,Et,1,0,"span",13),l()()}if(i&2){let t,e=r.$implicit,a=r.$index,n=d(2);H("animation-delay",n.tileEnterDelay(a),"ms"),U("aria-label",n.isSold(e)?e.name+", "+T(1,6,"sold"):e.name),o(3),u(n.isSelected(e)?3:-1),o(),u((t=n.imgThumbUrls().get(e.tokenId)??e.image.thumbnailUrl)?4:-1,t),o(),u(n.isSold(e)?5:-1)}}function Ot(i,r){if(i&1&&(m(0,"mat-grid-list",2),k(1,Ft,6,8,"mat-grid-tile",8,St),l()),i&2){let t=d();_("cols",t.numberOfCols()),o(),E(t.sortedArtPieces())}}function Lt(i,r){i&1&&M(0,"mat-progress-spinner",3)}var Ce=(()=>{class i{constructor(){this.artworkService=s(ct),this.router=s(at),this.activatedroute=s(it),this.responsiveService=s(st),this.destroyRef=s(R),this.sortMethods=Object.values(C),this.loadStarted=new Set,this.numberOfCols=x(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=x(!1),this.nftFilters=x({}),this.selectedTokenId=Z(),this.yearParamSignal=L(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=b(new Map),this.artPieces=L(this.artworkService.getArtPiecesObservable()),this.dataReady=S(()=>!!this.artPieces()?.length),this.filteredArtPieces=S(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],c=this.frontalViewByToken();return(t??[]).filter(f=>!this.artworkService.isExcludedByYear(f,n)&&!this.isExcludedById(f)&&(c.get(f.tokenId)??!1))}),this.frontalViewByToken=S(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let c=e.get(n.name);c?c.push(n):e.set(n.name,[n])}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=b(C.YEAR),this.sortOrder=b(y.DESC),this.sortedArtPieces=S(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case C.SIZE:return this.artworkService.sortBySize(e,t);case C.MEDIUM:return this.artworkService.sortByMedium(e,t);case C.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=b([])}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e)}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe(et(this.destroyRef)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n})}))}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(c=>c.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else{let c=[...a];c.splice(n,1),this.selectedNfts.set(c)}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}isSold(t){return mt.includes(t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===y.ASC?y.DESC:y.ASC)}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(y.ASC))}handleArtPieceClick(t){this.selectedTokenId.emit(t),this.router.navigate(["/artwork",t])}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(t){return t<i.MAX_ANIMATED_TILES?"tile-enter":""}tileEnterDelay(t){return Math.min(t,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(V(t=>{let e=t.get("years");return e?e.split(","):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):!1}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275cmp=I({type:i,selectors:[["app-art-pieces-list"]],inputs:{numberOfCols:[1,"numberOfCols"],viewAsWidget:[1,"viewAsWidget"],nftFilters:[1,"nftFilters"]},outputs:{selectedTokenId:"selectedTokenId"},decls:4,vars:5,consts:[[3,"ngClass"],[1,"sort-group"],["appParallaxTilt","","gutterSize","10","rowHeight","1:1","role","list","aria-label","Art Pieces",3,"cols"],["diameter","48","mode","indeterminate","aria-label","Loading art pieces"],["color","primary","role","button",3,"matTooltip"],["color","primary","role","button",3,"click","matTooltip"],[1,"visually-hidden"],[3,"nfts"],["role","listitem",3,"animation-delay"],["role","listitem",3,"contextmenu","click"],["appLazyLoad","",3,"visible"],[1,"overlay"],["mat-card-image","","decoding","async",1,"front-image",3,"src","alt"],["aria-hidden","true",1,"sold-dot"],[1,"order-number"]],template:function(e,a){e&1&&(m(0,"div",0),p(1,Pt,5,1,"div",1),p(2,Ot,3,1,"mat-grid-list",2)(3,Lt,1,0,"mat-progress-spinner",3),l()),e&2&&(_("ngClass",Q(3,Mt,!a.viewAsWidget())),o(),u(a.viewAsWidget()?-1:1),o(),u(a.dataReady()?2:3))},dependencies:[J,ot,rt,dt,ft,gt,pt,lt,ht,ut,vt,_t,xt,nt],styles:["mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--mdc-elevated-card-container-color: var(--catalog-frame-bg);background-color:var(--catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--parallax-x, 0%),var(--parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}"]})}}return i})();export{Ce as a};
