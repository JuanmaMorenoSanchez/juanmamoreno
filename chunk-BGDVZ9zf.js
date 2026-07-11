import {e as et,W as Wo,c as ci}from'./chunk-BUeBwIVV.js';import {Y,$}from'./chunk-CgN1aLe-.js';import {T,R as Rt,u as ut$1,r as rt,h,ch as it,Q as QL,ci as zL,_ as _p,P as Pe,d as dt,cj as Vo,bl as yt$1,c as we,B as BI,ck as _l,cl as qo,cm as Vi,M as Mt$1,g as Rp,i as fi,p as pE,N as Nc,l as bp,aa as pD,k as cv,q as hE,aM as x,E as ME,ae as NE,$ as $p,aX as GI,aA as vr,bt as Be,al as mE,a6 as bE,an as yE,cn as dE,j as _p$1,ad as TE,X as gD,F as Rp$1,a3 as tD,Y as yD,a0 as Cp,a7 as kc,aq as yu,ar as vu,a8 as Qp,aw as gf}from'./main-Q6CGMMBB.js';import'./chunk-CVEu7mXz.js';var ut=["*"];var gt=new x("MAT_CARD_CONFIG"),mt=(()=>{class i{appearance;constructor(){let t=T(gt,{optional:true});this.appearance=t?.appearance||"raised";}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=BI({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,a){e&2&&$p("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled");},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:ut,decls:1,vars:0,template:function(e,a){e&1&&(ME(),NE(0));},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var lt=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=GI({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-mdc-card-image","mdc-card__media"]})}return i})();var pt=(()=>{class i{constructor(){this.el=T(vr),this.visible=new Be,this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer.unobserve(this.el.nativeElement));});},{threshold:.1});}ngOnInit(){this.observer.observe(this.el.nativeElement);}ngOnDestroy(){this.observer.disconnect();}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275dir=GI({type:i,selectors:[["","appLazyLoad",""]],outputs:{visible:"visible"}});}}return i})();var ft=i=>({container:i});function vt(i,o){return this.methodTracking(o)}function ht(i,o){if(i&1&&(fi(0,"mat-icon"),tD(1),Nc()),i&2){let t=bE(3);cv(),kc(" ",t.sortOrder()==="asc"?"arrow_upward":"arrow_downward"," ");}}function _t(i,o){if(i&1){let t=TE();fi(0,"mat-chip",6),gD(1,"translate"),gD(2,"translate"),Rp$1("click",function(){let a=yu(t).$implicit,n=bE(2);return vu(n.changeSortMethod(a))}),fi(3,"mat-icon"),tD(4),Nc(),pE(5,ht,2,1,"mat-icon"),Nc();}if(i&2){let t=o.$implicit,e=bE(2);bp("matTooltip",`${yD(1,4,"sortBy")} ${t}`),Cp("aria-label",`${yD(2,6,"sortBy")} ${t}`),cv(4),kc(" ",t==="year"?"calendar_today":t==="medium"?"palette":"crop_free"," "),cv(),hE(e.activeSortMethod()===t?5:-1);}}function bt(i,o){if(i&1&&(fi(0,"mat-chip",5),gD(1,"translate"),_p$1(2,"app-pdf-button",7),Nc()),i&2){let t=bE(2);Cp("aria-label",yD(1,2,"download.portfolio")),cv(2),bp("nfts",t.selectedNfts());}}function Ct(i,o){if(i&1&&(fi(0,"div",1)(1,"mat-chip-listbox"),mE(2,_t,6,8,"mat-chip",4,vt,true),pE(4,bt,3,4,"mat-chip",5),Nc()()),i&2){let t=bE();cv(2),yE(t.sortMethods),cv(2),hE(t.selectedNfts().length?4:-1);}}function xt(i,o){if(i&1&&(fi(0,"div",11)(1,"span",13),tD(2),Nc()()),i&2){let t=bE().$implicit,e=bE(2);cv(2),Qp(e.getOrderNumber(t));}}function yt(i,o){if(i&1){let t=TE();fi(0,"img",14),Rp$1("load",function(){yu(t);let a=bE().$implicit,n=bE(2);return vu(n.onImageLoaded(a.tokenId))}),Nc();}if(i&2){let t=bE().$implicit,e=bE(2);$p("loaded",e.loadedImages.has(t.tokenId)),bp("src",o,gf)("alt","Artwork "+t.name);}}function Mt(i,o){if(i&1){let t=TE();fi(0,"mat-grid-tile",9),Rp$1("contextmenu",function(a){let n=yu(t).$implicit,s=bE(2);return vu(s.toggleNftSelection(a,n))})("click",function(){let a=yu(t).$implicit,n=bE(2);return vu(n.handleArtPieceClick(a.tokenId))}),fi(1,"mat-card",10),Rp$1("visible",function(){let a=yu(t).$implicit,n=bE(2);return vu(n.onImageVisible(a.tokenId))}),pE(2,xt,3,1,"div",11),pE(3,yt,1,4,"img",12),Nc()();}if(i&2){let t,e=o.$implicit,a=bE(2);Cp("aria-label",e.name),cv(2),hE(a.isSelected(e)?2:-1),cv(),hE((t=a.imgThumbUrls().get(e.tokenId))?3:-1,t);}}function wt(i,o){if(i&1&&(fi(0,"mat-grid-list",2),mE(1,Mt,4,3,"mat-grid-tile",8,dE().listTracking,true),Nc()),i&2){let t=bE();bp("cols",t.numberOfCols()),cv(),yE(t.sortedArtPieces());}}function It(i,o){i&1&&_p$1(0,"mat-progress-spinner",3);}var oe=(()=>{class i{constructor(){this.artworkService=T(Rt),this.router=T(ut$1),this.activatedroute=T(rt),this.responsiveService=T(h),this.loadedImages=new Set,this.sortMethods=Object.values(it),this.numberOfCols=QL(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=QL(false),this.nftFilters=QL({}),this.selectedTokenId=zL(),this.yearParamSignal=_p(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=Pe(new Map),this.artPieces=_p(this.artworkService.getArtPiecesObservable()),this.dataReady=dt(()=>!!this.artPieces()?.length),this.filteredArtPieces=dt(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],s=this.frontalViewByToken();return (t??[]).filter(T=>!this.artworkService.isExcludedByYear(T,n)&&!this.isExcludedById(T)&&(s.get(T.tokenId)??false))}),this.frontalViewByToken=dt(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let s=e.get(n.name);s?s.push(n):e.set(n.name,[n]);}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=Pe(it.YEAR),this.sortOrder=Pe(Vo.DESC),this.sortedArtPieces=dt(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case it.SIZE:return this.artworkService.sortBySize(e,t);case it.MEDIUM:return this.artworkService.sortByMedium(e,t);case it.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=Pe([]);}onImageLoaded(t){this.loadedImages.add(t);}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e);}loadImgThumbUrl(t){this.imgThumbUrls().has(t.tokenId)||this.artworkService.getAvailableOptimalUrl(t).pipe(yt$1(1)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n});});}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(s=>s.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else {let s=[...a];s.splice(n,1),this.selectedNfts.set(s);}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===Vo.ASC?Vo.DESC:Vo.ASC);}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(Vo.ASC));}handleArtPieceClick(t){this.selectedTokenId.emit(t),this.router.navigate(["/artwork",t]);}listTracking(t,e){return e}methodTracking(t){return t}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(we(t=>{let e=t.get("years");return e?e.split(","):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):false}static{this.\u0275fac=function(e){return new(e||i)};}static{this.\u0275cmp=BI({type:i,selectors:[["app-art-pieces-list"]],inputs:{numberOfCols:[1,"numberOfCols"],viewAsWidget:[1,"viewAsWidget"],nftFilters:[1,"nftFilters"]},outputs:{selectedTokenId:"selectedTokenId"},decls:4,vars:5,consts:[[3,"ngClass"],[1,"sort-group"],["gutterSize","10","rowHeight","1:1","role","list","aria-label","Art Pieces",3,"cols"],["diameter","48","mode","indeterminate","aria-label","Loading art pieces"],["color","primary","role","button",3,"matTooltip"],["role","button"],["color","primary","role","button",3,"click","matTooltip"],[3,"nfts"],["role","listitem"],["role","listitem",3,"contextmenu","click"],["appLazyLoad","",3,"visible"],[1,"overlay"],["mat-card-image","",1,"front-image",3,"loaded","src","alt"],[1,"order-number"],["mat-card-image","",1,"front-image",3,"load","src","alt"]],template:function(e,a){e&1&&(fi(0,"div",0),pE(1,Ct,5,1,"div",1),pE(2,wt,3,1,"mat-grid-list",2)(3,It,1,0,"mat-progress-spinner",3),Nc()),e&2&&(bp("ngClass",pD(3,ft,!a.viewAsWidget())),cv(),hE(a.viewAsWidget()?-1:1),cv(),hE(a.dataReady()?2:3));},dependencies:[_l,qo,Vi,Mt$1,et,Wo,Y,$,mt,ci,lt,pt,Rp],styles:["mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;--mdc-elevated-card-container-color: #ebebe9;background-color:#ebebe9}.front-image[_ngcontent-%COMP%]{opacity:0;transition:opacity .35s ease-in}.front-image.loaded[_ngcontent-%COMP%]{opacity:1}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}"]});}}return i})();export{oe as ArtPiecesListComponent};