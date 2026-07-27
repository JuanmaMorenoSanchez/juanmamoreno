import {Y,$}from'./chunk-B7Mj5fWX.js';import {t as tt,W as Wo,c as ci}from'./chunk-pExAKueD.js';import {T,c,t as te,Q,S as St$1,aO as Le,cl as s,N as NF,cm as MF,P as Pe,F as Fe,d as dt,at as Vi,a as b,ar as h,M as Me,I as IE,aT as S,bk as CE,aU as Tr,bB as qe,V as cD,aA as lD,a3 as gh,cn as vi,co as zi,cp as q,E as Et$1,o as rt,q as wi,G as QE,H as Hc,y as Jp,aG as QD,O as Hv,R as ZE,ab as KE,ay as sD,ae as JE,a1 as Xp,az as oD,u as YD,x as ih,L as LD,D as JD,K as Kp,af as qc,cq as Xo,aJ as xu,aK as Au,a2 as hh,ad as Dh,aN as Af}from'./main-PZQQMVWH.js';import'./chunk-BAN_D8cT.js';var vt=["*"];var _t=new S("MAT_CARD_CONFIG"),ut=(()=>{class i{appearance;constructor(){let t=T(_t,{optional:true});this.appearance=t?.appearance||"raised";}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=IE({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,a){e&2&&gh("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled");},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:vt,decls:1,vars:0,template:function(e,a){e&1&&(cD(),lD(0));},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var ft=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=CE({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-mdc-card-image","mdc-card__media"]})}return i})();var gt=(()=>{class i{constructor(){this.el=T(Tr),this.visible=new qe,this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer.unobserve(this.el.nativeElement));});},{threshold:.1});}ngOnInit(){this.observer.observe(this.el.nativeElement);}ngOnDestroy(){this.observer.disconnect();}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275dir=CE({type:i,selectors:[["","appLazyLoad",""]],outputs:{visible:"visible"}});}}return i})();var xt=3,ht=(()=>{class i{constructor(){this.el=T(Tr),this.maxShiftPercent=NF(xt),this.rafId=0,this.onPointerMove=t=>{if(this.rafId)return;let{clientX:e,clientY:a}=t;this.rafId=requestAnimationFrame(()=>{this.rafId=0,this.apply(e,a);});},document.addEventListener("pointermove",this.onPointerMove,{passive:true});}ngOnDestroy(){document.removeEventListener("pointermove",this.onPointerMove),this.rafId&&cancelAnimationFrame(this.rafId);}apply(t,e){let a=this.clamp((t-window.innerWidth/2)/(window.innerWidth/2)),n=this.clamp((e-window.innerHeight/2)/(window.innerHeight/2)),d=this.maxShiftPercent(),h=this.el.nativeElement.style;h.setProperty("--parallax-x",`${(a*d).toFixed(2)}%`),h.setProperty("--parallax-y",`${(n*d).toFixed(2)}%`);}clamp(t){return Math.min(1,Math.max(-1,t))}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275dir=CE({type:i,selectors:[["","appParallaxTilt",""]],inputs:{maxShiftPercent:[1,"maxShiftPercent"]}});}}return i})();var Ct=i=>({container:i});function yt(i,o){return this.methodTracking(o)}var bt=(i,o)=>o.tokenId;function Mt(i,o){if(i&1&&(wi(0,"mat-icon"),LD(1),Hc()),i&2){let t=sD(3);Hv(),qc(" ",t.sortOrder()==="asc"?"arrow_upward":"arrow_downward"," ");}}function wt(i,o){if(i&1){let t=oD();wi(0,"mat-chip",6),YD(1,"translate"),YD(2,"translate"),ih("click",function(){let a=xu(t).$implicit,n=sD(2);return Au(n.changeSortMethod(a))}),wi(3,"mat-icon"),LD(4),Hc(),QE(5,Mt,2,1,"mat-icon"),Hc();}if(i&2){let t=o.$implicit,e=sD(2);Jp("matTooltip",`${JD(1,4,"sortBy")} ${t}`),Kp("aria-label",`${JD(2,6,"sortBy")} ${t}`),Hv(4),qc(" ",t==="year"?"calendar_today":t==="medium"?"palette":"crop_free"," "),Hv(),ZE(e.activeSortMethod()===t?5:-1);}}function It(i,o){if(i&1&&(wi(0,"mat-chip",5),YD(1,"translate"),Xp(2,"app-pdf-button",7),Hc()),i&2){let t=sD(2);Kp("aria-label",JD(1,2,"download.portfolio")),Hv(2),Jp("nfts",t.selectedNfts());}}function St(i,o){if(i&1&&(wi(0,"div",1)(1,"mat-chip-listbox"),KE(2,wt,6,8,"mat-chip",4,yt,true),QE(4,It,3,4,"mat-chip",5),Hc()()),i&2){let t=sD();Hv(2),JE(t.sortMethods),Hv(2),ZE(t.selectedNfts().length?4:-1);}}function Dt(i,o){if(i&1&&(wi(0,"div",11)(1,"span",14),LD(2),Hc()()),i&2){let t=sD().$implicit,e=sD(2);Hv(2),Dh(e.getOrderNumber(t));}}function Pt(i,o){if(i&1){let t=oD();wi(0,"img",15),ih("load",function(){xu(t);let a=sD().$implicit,n=sD(2);return Au(n.onImageLoaded(a.tokenId))}),Hc();}if(i&2){let t=sD().$implicit,e=sD(2);gh("loaded",e.loadedImages.has(t.tokenId)),Jp("src",o,Af)("alt","Artwork "+t.name);}}function At(i,o){i&1&&Xp(0,"span",13);}function Tt(i,o){if(i&1){let t=oD();wi(0,"mat-grid-tile",9),YD(1,"translate"),Xo(function(){let a=xu(t).$index,n=sD(2);return Au(n.tileEnterClass(a))}),ih("contextmenu",function(a){let n=xu(t).$implicit,d=sD(2);return Au(d.toggleNftSelection(a,n))})("click",function(){let a=xu(t).$implicit,n=sD(2);return Au(n.handleArtPieceClick(a.tokenId))}),wi(2,"mat-card",10),ih("visible",function(){let a=xu(t).$implicit,n=sD(2);return Au(n.onImageVisible(a.tokenId))}),QE(3,Dt,3,1,"div",11),QE(4,Pt,1,4,"img",12),QE(5,At,1,0,"span",13),Hc()();}if(i&2){let t,e=o.$implicit,a=o.$index,n=sD(2);hh("animation-delay",n.tileEnterDelay(a),"ms"),Kp("aria-label",n.isSold(e)?e.name+", "+JD(1,6,"sold"):e.name),Hv(3),ZE(n.isSelected(e)?3:-1),Hv(),ZE((t=n.imgThumbUrls().get(e.tokenId))?4:-1,t),Hv(),ZE(n.isSold(e)?5:-1);}}function kt(i,o){if(i&1&&(wi(0,"mat-grid-list",2),KE(1,Tt,6,8,"mat-grid-tile",8,bt),Hc()),i&2){let t=sD();Jp("cols",t.numberOfCols()),Hv(),JE(t.sortedArtPieces());}}function Et(i,o){i&1&&Xp(0,"mat-progress-spinner",3);}var ve=(()=>{class i{constructor(){this.artworkService=T(c),this.router=T(te),this.activatedroute=T(Q),this.responsiveService=T(St$1),this.destroyRef=T(Le),this.loadedImages=new Set,this.sortMethods=Object.values(s),this.loadStarted=new Set,this.numberOfCols=NF(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=NF(false),this.nftFilters=NF({}),this.selectedTokenId=MF(),this.yearParamSignal=Pe(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=Fe(new Map),this.artPieces=Pe(this.artworkService.getArtPiecesObservable()),this.dataReady=dt(()=>!!this.artPieces()?.length),this.filteredArtPieces=dt(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],d=this.frontalViewByToken();return (t??[]).filter(h=>!this.artworkService.isExcludedByYear(h,n)&&!this.isExcludedById(h)&&(d.get(h.tokenId)??false))}),this.frontalViewByToken=dt(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let d=e.get(n.name);d?d.push(n):e.set(n.name,[n]);}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=Fe(s.YEAR),this.sortOrder=Fe(Vi.DESC),this.sortedArtPieces=dt(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case s.SIZE:return this.artworkService.sortBySize(e,t);case s.MEDIUM:return this.artworkService.sortByMedium(e,t);case s.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=Fe([]);}onImageLoaded(t){this.loadedImages.add(t);}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e);}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe(b(this.destroyRef)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n});}));}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(d=>d.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else {let d=[...a];d.splice(n,1),this.selectedNfts.set(d);}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}isSold(t){return h.includes(t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===Vi.ASC?Vi.DESC:Vi.ASC);}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(Vi.ASC));}handleArtPieceClick(t){this.selectedTokenId.emit(t),this.router.navigate(["/artwork",t]);}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20;}static{this.TILE_DELAY_STEP_MS=30;}tileEnterClass(t){return t<i.MAX_ANIMATED_TILES?"tile-enter":""}tileEnterDelay(t){return Math.min(t,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(Me(t=>{let e=t.get("years");return e?e.split(","):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):false}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275cmp=IE({type:i,selectors:[["app-art-pieces-list"]],inputs:{numberOfCols:[1,"numberOfCols"],viewAsWidget:[1,"viewAsWidget"],nftFilters:[1,"nftFilters"]},outputs:{selectedTokenId:"selectedTokenId"},decls:4,vars:5,consts:[[3,"ngClass"],[1,"sort-group"],["appParallaxTilt","","gutterSize","10","rowHeight","1:1","role","list","aria-label","Art Pieces",3,"cols"],["diameter","48","mode","indeterminate","aria-label","Loading art pieces"],["color","primary","role","button",3,"matTooltip"],["role","button"],["color","primary","role","button",3,"click","matTooltip"],[3,"nfts"],["role","listitem",3,"animation-delay"],["role","listitem",3,"contextmenu","click"],["appLazyLoad","",3,"visible"],[1,"overlay"],["mat-card-image","","decoding","async",1,"front-image",3,"loaded","src","alt"],["aria-hidden","true",1,"sold-dot"],[1,"order-number"],["mat-card-image","","decoding","async",1,"front-image",3,"load","src","alt"]],template:function(e,a){e&1&&(wi(0,"div",0),QE(1,St,5,1,"div",1),QE(2,kt,3,1,"mat-grid-list",2)(3,Et,1,0,"mat-progress-spinner",3),Hc()),e&2&&(Jp("ngClass",QD(3,Ct,!a.viewAsWidget())),Hv(),ZE(a.viewAsWidget()?-1:1),Hv(),ZE(a.dataReady()?2:3));},dependencies:[vi,zi,q,Et$1,tt,Wo,Y,$,ut,ci,ft,gt,ht,rt],styles:["mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--mdc-elevated-card-container-color: var(--catalog-frame-bg);background-color:var(--catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{opacity:0;transform:translate(var(--parallax-x, 0%),var(--parallax-y, 0%)) scale(1.1);transition:opacity .35s ease-in,transform .2s ease-out}.front-image.loaded[_ngcontent-%COMP%]{opacity:1}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}"]});}}return i})();export{ve as ArtPiecesListComponent};