import {Y,$}from'./chunk-D9pmGb8L.js';import {a as at$1,Y as Yo,d as di}from'./chunk--Nbl6FWQ.js';import {T,E,C as te,D as Q,G as lt,L as Le,cn as i$1,a1 as SF,co as NF,P as Pe,F as Fe,d as dt,x as c,O as b,aO as p,M as Me,I as IE,cp as sn,cq as at,cr as ki,V as Et$1,e as rt,f as wi,Q as QE,H as Hc,X as Xp,l as QD,h as Hv,Z as ZE,a9 as cD,ao as lD,v as mh,bk as CE,aV as Tr,bM as qe,au as KE,s as sD,aw as JE,o as eh,a$ as S,q as oD,Y as YD,t as sh,g as LD,J as JD,aK as Th,af as qc,cs as Xo,A as Au,R as Ru,n as gh,m as Jp,i as wh,B as Rf}from'./main-TRZEF44Z.js';import'./chunk-B9F8FU63.js';var _t=["*"];var xt=new S("MAT_CARD_CONFIG"),gt=(()=>{class i{appearance;constructor(){let t=T(xt,{optional:true});this.appearance=t?.appearance||"raised";}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=IE({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,a){e&2&&mh("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled");},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:_t,decls:1,vars:0,template:function(e,a){e&1&&(cD(),lD(0));},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var ft=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=CE({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-mdc-card-image","mdc-card__media"]})}return i})();var ht=(()=>{class i{constructor(){this.el=T(Tr),this.visible=new qe,this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer.unobserve(this.el.nativeElement));});},{threshold:.1});}ngOnInit(){this.observer.observe(this.el.nativeElement);}ngOnDestroy(){this.observer.disconnect();}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275dir=CE({type:i,selectors:[["","appLazyLoad",""]],outputs:{visible:"visible"}});}}return i})();var Ct=3,vt=(()=>{class i{constructor(){this.el=T(Tr),this.maxShiftPercent=SF(Ct),this.rafId=0,this.onPointerMove=t=>{if(this.rafId)return;let{clientX:e,clientY:a}=t;this.rafId=requestAnimationFrame(()=>{this.rafId=0,this.apply(e,a);});},document.addEventListener("pointermove",this.onPointerMove,{passive:true});}ngOnDestroy(){document.removeEventListener("pointermove",this.onPointerMove),this.rafId&&cancelAnimationFrame(this.rafId);}apply(t,e){let a=this.clamp((t-window.innerWidth/2)/(window.innerWidth/2)),n=this.clamp((e-window.innerHeight/2)/(window.innerHeight/2)),c=this.maxShiftPercent(),h=this.el.nativeElement.style;h.setProperty("--parallax-x",`${(a*c).toFixed(2)}%`),h.setProperty("--parallax-y",`${(n*c).toFixed(2)}%`);}clamp(t){return Math.min(1,Math.max(-1,t))}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275dir=CE({type:i,selectors:[["","appParallaxTilt",""]],inputs:{maxShiftPercent:[1,"maxShiftPercent"]}});}}return i})();var yt=i=>({container:i});function bt(i,o){return this.methodTracking(o)}var Mt=(i,o)=>o.tokenId;function wt(i,o){if(i&1&&(wi(0,"mat-icon"),LD(1),Hc()),i&2){let t=sD(3);Hv(),qc(" ",t.sortOrder()==="asc"?"arrow_upward":"arrow_downward"," ");}}function It(i,o){if(i&1){let t=oD();wi(0,"mat-chip",5),YD(1,"translate"),sh("click",function(){let a=Au(t).$implicit,n=sD(2);return Ru(n.changeSortMethod(a))}),wi(2,"span",6),LD(3),YD(4,"translate"),Hc(),wi(5,"mat-icon"),LD(6),Hc(),QE(7,wt,2,1,"mat-icon"),Hc();}if(i&2){let t=o.$implicit,e=sD(2);Xp("matTooltip",`${JD(1,5,"sortBy")} ${t}`),Hv(3),Th("",JD(4,7,"sortBy")," ",t),Hv(3),qc(" ",t==="year"?"calendar_today":t==="medium"?"palette":"crop_free"," "),Hv(),ZE(e.activeSortMethod()===t?7:-1);}}function St(i,o){if(i&1&&(wi(0,"mat-chip"),eh(1,"app-pdf-button",7),Hc()),i&2){let t=sD(2);Hv(),Xp("nfts",t.selectedNfts());}}function Dt(i,o){if(i&1&&(wi(0,"div",1)(1,"mat-chip-set"),KE(2,It,8,9,"mat-chip",4,bt,true),QE(4,St,2,1,"mat-chip"),Hc()()),i&2){let t=sD();Hv(2),JE(t.sortMethods),Hv(2),ZE(t.selectedNfts().length?4:-1);}}function Pt(i,o){if(i&1&&(wi(0,"div",11)(1,"span",14),LD(2),Hc()()),i&2){let t=sD().$implicit,e=sD(2);Hv(2),wh(e.getOrderNumber(t));}}function At(i,o){if(i&1){let t=oD();wi(0,"img",15),sh("load",function(){Au(t);let a=sD().$implicit,n=sD(2);return Ru(n.onImageLoaded(a.tokenId))}),Hc();}if(i&2){let t=sD().$implicit,e=sD(2);mh("loaded",e.loadedImages.has(t.tokenId)),Xp("src",o,Rf)("alt","Artwork "+t.name);}}function Tt(i,o){i&1&&eh(0,"span",13);}function kt(i,o){if(i&1){let t=oD();wi(0,"mat-grid-tile",9),YD(1,"translate"),Xo(function(){let a=Au(t).$index,n=sD(2);return Ru(n.tileEnterClass(a))}),sh("contextmenu",function(a){let n=Au(t).$implicit,c=sD(2);return Ru(c.toggleNftSelection(a,n))})("click",function(){let a=Au(t).$implicit,n=sD(2);return Ru(n.handleArtPieceClick(a.tokenId))}),wi(2,"mat-card",10),sh("visible",function(){let a=Au(t).$implicit,n=sD(2);return Ru(n.onImageVisible(a.tokenId))}),QE(3,Pt,3,1,"div",11),QE(4,At,1,4,"img",12),QE(5,Tt,1,0,"span",13),Hc()();}if(i&2){let t,e=o.$implicit,a=o.$index,n=sD(2);gh("animation-delay",n.tileEnterDelay(a),"ms"),Jp("aria-label",n.isSold(e)?e.name+", "+JD(1,6,"sold"):e.name),Hv(3),ZE(n.isSelected(e)?3:-1),Hv(),ZE((t=n.imgThumbUrls().get(e.tokenId))?4:-1,t),Hv(),ZE(n.isSold(e)?5:-1);}}function Et(i,o){if(i&1&&(wi(0,"mat-grid-list",2),KE(1,kt,6,8,"mat-grid-tile",8,Mt),Hc()),i&2){let t=sD();Xp("cols",t.numberOfCols()),Hv(),JE(t.sortedArtPieces());}}function Ft(i,o){i&1&&eh(0,"mat-progress-spinner",3);}var _e=(()=>{class i{constructor(){this.artworkService=T(E),this.router=T(te),this.activatedroute=T(Q),this.responsiveService=T(lt),this.destroyRef=T(Le),this.loadedImages=new Set,this.sortMethods=Object.values(i$1),this.loadStarted=new Set,this.numberOfCols=SF(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=SF(false),this.nftFilters=SF({}),this.selectedTokenId=NF(),this.yearParamSignal=Pe(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=Fe(new Map),this.artPieces=Pe(this.artworkService.getArtPiecesObservable()),this.dataReady=dt(()=>!!this.artPieces()?.length),this.filteredArtPieces=dt(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],c=this.frontalViewByToken();return (t??[]).filter(h=>!this.artworkService.isExcludedByYear(h,n)&&!this.isExcludedById(h)&&(c.get(h.tokenId)??false))}),this.frontalViewByToken=dt(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let c=e.get(n.name);c?c.push(n):e.set(n.name,[n]);}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=Fe(i$1.YEAR),this.sortOrder=Fe(c.DESC),this.sortedArtPieces=dt(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case i$1.SIZE:return this.artworkService.sortBySize(e,t);case i$1.MEDIUM:return this.artworkService.sortByMedium(e,t);case i$1.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=Fe([]);}onImageLoaded(t){this.loadedImages.add(t);}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e);}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe(b(this.destroyRef)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n});}));}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(c=>c.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else {let c=[...a];c.splice(n,1),this.selectedNfts.set(c);}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}isSold(t){return p.includes(t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===c.ASC?c.DESC:c.ASC);}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(c.ASC));}handleArtPieceClick(t){this.selectedTokenId.emit(t),this.router.navigate(["/artwork",t]);}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20;}static{this.TILE_DELAY_STEP_MS=30;}tileEnterClass(t){return t<i.MAX_ANIMATED_TILES?"tile-enter":""}tileEnterDelay(t){return Math.min(t,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(Me(t=>{let e=t.get("years");return e?e.split(","):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):false}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275cmp=IE({type:i,selectors:[["app-art-pieces-list"]],inputs:{numberOfCols:[1,"numberOfCols"],viewAsWidget:[1,"viewAsWidget"],nftFilters:[1,"nftFilters"]},outputs:{selectedTokenId:"selectedTokenId"},decls:4,vars:5,consts:[[3,"ngClass"],[1,"sort-group"],["appParallaxTilt","","gutterSize","10","rowHeight","1:1","role","list","aria-label","Art Pieces",3,"cols"],["diameter","48","mode","indeterminate","aria-label","Loading art pieces"],["color","primary","role","button",3,"matTooltip"],["color","primary","role","button",3,"click","matTooltip"],[1,"visually-hidden"],[3,"nfts"],["role","listitem",3,"animation-delay"],["role","listitem",3,"contextmenu","click"],["appLazyLoad","",3,"visible"],[1,"overlay"],["mat-card-image","","decoding","async",1,"front-image",3,"loaded","src","alt"],["aria-hidden","true",1,"sold-dot"],[1,"order-number"],["mat-card-image","","decoding","async",1,"front-image",3,"load","src","alt"]],template:function(e,a){e&1&&(wi(0,"div",0),QE(1,Dt,5,1,"div",1),QE(2,Et,3,1,"mat-grid-list",2)(3,Ft,1,0,"mat-progress-spinner",3),Hc()),e&2&&(Xp("ngClass",QD(3,yt,!a.viewAsWidget())),Hv(),ZE(a.viewAsWidget()?-1:1),Hv(),ZE(a.dataReady()?2:3));},dependencies:[sn,at,ki,Et$1,at$1,Yo,Y,$,gt,di,ft,ht,vt,rt],styles:["mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--mdc-elevated-card-container-color: var(--catalog-frame-bg);background-color:var(--catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{opacity:0;transform:translate(var(--parallax-x, 0%),var(--parallax-y, 0%)) scale(1.1);transition:opacity .35s ease-in,transform .2s ease-out}.front-image.loaded[_ngcontent-%COMP%]{opacity:1}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}"]});}}return i})();export{_e as ArtPiecesListComponent};