import{$n as nT,A as Hh,Ar as t_,B as Km,Cr as ru,E as Gw,Et as Vi,Fn as jb,Fr as tt,Ft as Xb,Gt as Zu,Ht as ZC,In as je,Kn as lu,Mr as tb,P as Jm,Pr as tf,Rr as ub,Sr as r_,V as Kr,Yr as wm,an as cb,ct as RV,er as nf,et as OV,ft as S,g as Cm,gr as qC,i as $w,ii as zw,kr as ss,kt as We,ln as db,lt as Rm,n as $m,ni as y,nn as bm,p as CE,qn as ly,qt as _t,st as Qw,vt as Te,wt as Um}from"./chunk-CDYgws-d.js";import{c as fs,f as rr}from"./chunk-DZVQ6PgG.js";import{A as lt,C as N,D as V,E as Si,O as _t$1,T as Di,_ as b,a as Et$1,b as _t$2,j as wt,k as bi,l as s,m as Pe,n,p as Ne,r as c,s as f,v as rt,x as ee,y as W}from"./main-2BE7R4JV.js";import{t as g}from"./chunk-ChfpUoEh.js";import{l as di,o as Xo,u as nt}from"./chunk-CsmyIvhC.js";import{n as Y,t as $}from"./chunk-A9S-CF4O.js";var It=[`*`];var Et=new S(`MAT_CARD_CONFIG`);var Dt=(()=>{class e{appearance;constructor(){let t=y(Et,{optional:!0});this.appearance=t?.appearance||`raised`}static ɵfac=function(i){return new(i||e)};static ɵcmp=qC({type:e,selectors:[[`mat-card`]],hostAttrs:[1,`mat-mdc-card`,`mdc-card`],hostVars:8,hostBindings:function(i,a){i&2&&$m(`mat-mdc-card-outlined`,a.appearance===`outlined`)(`mdc-card--outlined`,a.appearance===`outlined`)(`mat-mdc-card-filled`,a.appearance===`filled`)(`mdc-card--filled`,a.appearance===`filled`)},inputs:{appearance:`appearance`},exportAs:[`matCard`],ngContentSelectors:It,decls:1,vars:0,template:function(i,a){i&1&&(ub(),db(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--%NS%mat-card-elevated-container-color, var(--%NS%mat-sys-surface-container-low));
  border-color: var(--%NS%mat-card-elevated-container-color, var(--%NS%mat-sys-surface-container-low));
  border-radius: var(--%NS%mat-card-elevated-container-shape, var(--%NS%mat-sys-corner-medium));
  box-shadow: var(--%NS%mat-card-elevated-container-elevation, var(--%NS%mat-sys-level1));
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
  border-radius: var(--%NS%mat-card-elevated-container-shape, var(--%NS%mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--%NS%mat-card-outlined-container-color, var(--%NS%mat-sys-surface));
  border-radius: var(--%NS%mat-card-outlined-container-shape, var(--%NS%mat-sys-corner-medium));
  border-width: var(--%NS%mat-card-outlined-outline-width, 1px);
  border-color: var(--%NS%mat-card-outlined-outline-color, var(--%NS%mat-sys-outline-variant));
  box-shadow: var(--%NS%mat-card-outlined-container-elevation, var(--%NS%mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--%NS%mat-card-filled-container-color, var(--%NS%mat-sys-surface-container-highest));
  border-radius: var(--%NS%mat-card-filled-container-shape, var(--%NS%mat-sys-corner-medium));
  box-shadow: var(--%NS%mat-card-filled-container-elevation, var(--%NS%mat-sys-level0));
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
  font-family: var(--%NS%mat-card-title-text-font, var(--%NS%mat-sys-title-large-font));
  line-height: var(--%NS%mat-card-title-text-line-height, var(--%NS%mat-sys-title-large-line-height));
  font-size: var(--%NS%mat-card-title-text-size, var(--%NS%mat-sys-title-large-size));
  letter-spacing: var(--%NS%mat-card-title-text-tracking, var(--%NS%mat-sys-title-large-tracking));
  font-weight: var(--%NS%mat-card-title-text-weight, var(--%NS%mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--%NS%mat-card-subtitle-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-card-subtitle-text-font, var(--%NS%mat-sys-title-medium-font));
  line-height: var(--%NS%mat-card-subtitle-text-line-height, var(--%NS%mat-sys-title-medium-line-height));
  font-size: var(--%NS%mat-card-subtitle-text-size, var(--%NS%mat-sys-title-medium-size));
  letter-spacing: var(--%NS%mat-card-subtitle-text-tracking, var(--%NS%mat-sys-title-medium-tracking));
  font-weight: var(--%NS%mat-card-subtitle-text-weight, var(--%NS%mat-sys-title-medium-weight));
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
`],encapsulation:2})}return e})();var kt=(()=>{class e{static ɵfac=function(i){return new(i||e)};static ɵdir=ZC({type:e,selectors:[[``,`mat-card-image`,``],[``,`matCardImage`,``]],hostAttrs:[1,`mat-mdc-card-image`,`mdc-card__media`]})}return e})();var Tt=(()=>{class e{constructor(){this.el=y(Kr),this.isBrowser=fs(y(CE)),this.visible=new tt,this.isBrowser&&(this.observer=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.ɵfac=function(i){return new(i||e)}}static{this.ɵdir=ZC({type:e,selectors:[[``,`appLazyLoad`,``]],outputs:{visible:`visible`}})}}return e})();var Ot=e=>({container:e});function Ft(e,r){return this.methodTracking(r)}var Lt=(e,r)=>r.value;var Rt=(e,r)=>r.tokenId;function Bt(e,r){if(e&1&&(ss(0,`mat-icon`),jb(1),ru()),e&2){let t=cb(3);nT(),lu(` `,t.sortOrder()===`asc`?`arrow_upward`:`arrow_downward`,` `)}}function Vt(e,r){if(e&1){let t=tb();ss(0,`mat-chip`,7),t_(1,`translate`),Rm(`click`,function(){let a=tf(t).$implicit;return nf(cb(2).changeSortMethod(a))}),ss(2,`span`,2),jb(3),t_(4,`translate`),ru(),ss(5,`mat-icon`),jb(6),ru(),$w(7,Bt,2,1,`mat-icon`),ru()}if(e&2){let t=r.$implicit,i=cb(2);wm(`matTooltip`,`${r_(1,5,`sortBy`)} ${t}`),nT(3),Jm(``,r_(4,7,`sortBy`),` `,t),nT(3),lu(` `,t===`year`?`calendar_today`:t===`medium`?`palette`:`crop_free`,` `),nT(),Gw(i.activeSortMethod()===t?7:-1)}}function zt(e,r){if(e&1&&(ss(0,`mat-chip`),bm(1,`app-pdf-button`,8),ru()),e&2){let t=cb(2);nT(),wm(`nfts`,t.selectedNfts())}}function jt(e,r){e&1&&(ss(0,`p`,5),bm(1,`span`,9),jb(2),t_(3,`translate`),ru()),e&2&&(nT(2),lu(` `,r_(3,1,`soldLegend`),` `))}function $t(e,r){if(e&1){let t=tb();ss(0,`button`,12),Rm(`click`,function(){let a=tf(t).$implicit;return nf(cb(3).setCriticFilter(a.value))}),jb(1),ru()}if(e&2){let t=r.$implicit,i=cb(3);$m(`is-on`,i.criticFilter()===t.value),Cm(`aria-pressed`,i.criticFilter()===t.value),nT(),lu(` `,t.label,` `)}}function Ut(e,r){if(e&1&&(ss(0,`div`,6),zw(1,$t,2,4,`button`,10,Lt),ss(3,`span`,11),jb(4),ru()()),e&2){let t=cb(2);nT(),Qw(t.criticFilters),nT(3),lu(``,t.editedCount(),` edited`)}}function Wt(e,r){if(e&1&&(ss(0,`h1`,2),jb(1),t_(2,`translate`),ru(),ss(3,`div`,3)(4,`mat-chip-set`),zw(5,Vt,8,9,`mat-chip`,4,Ft,!0),$w(7,zt,2,1,`mat-chip`),ru()(),$w(8,jt,4,3,`p`,5),$w(9,Ut,5,1,`div`,6)),e&2){let t=cb();nT(),Km(r_(2,4,`seo.paintings.title`)),nT(4),Qw(t.sortMethods),nT(2),Gw(t.selectedNfts().length?7:-1),nT(),Gw(t.hasSoldOnDisplay()?8:-1),nT(),Gw(t.isArtist()?9:-1)}}function Yt(e,r){if(e&1&&(ss(0,`div`,19)(1,`span`,22),jb(2),ru()()),e&2){let t=cb().$implicit,i=cb(3);nT(2),Km(i.getOrderNumber(t))}}function Ht(e,r){if(e&1&&bm(0,`img`,20),e&2){let t=cb().$implicit;wm(`src`,r,Hh)(`alt`,t.name+` — painting by Juanma Moreno Sánchez`)}}function Xt(e,r){e&1&&bm(0,`span`,21)}function Gt(e,r){if(e&1){let t=tb();ss(0,`mat-grid-tile`,16),Vi(function(){let a=tf(t).$index;return nf(cb(3).tileEnterClass(a))}),Rm(`contextmenu`,function(a){let n=tf(t).$implicit;return nf(cb(3).toggleNftSelection(a,n))}),ss(1,`a`,17),t_(2,`translate`),Rm(`click`,function(){let a=tf(t).$implicit;return nf(cb(3).handleArtPieceClick(a.tokenId))}),ss(3,`mat-card`,18),Rm(`visible`,function(){let a=tf(t).$implicit;return nf(cb(3).onImageVisible(a.tokenId))}),$w(4,Yt,3,1,`div`,19),$w(5,Ht,1,2,`img`,20),$w(6,Xt,1,0,`span`,21),ru()()()}if(e&2){let t,i=r.$implicit,a=r.$index,n=cb(3);Um(`animation-delay`,n.tileEnterDelay(a),`ms`),nT(),wm(`routerLink`,n.artworkLink(i.tokenId)),Cm(`aria-label`,n.isSold(i)?i.name+`, `+r_(2,7,`sold`):i.name),nT(3),Gw(n.isSelected(i)?4:-1),nT(),Gw((t=n.imgThumbUrls().get(i.tokenId)??i.image.thumbnailUrl)?5:-1,t),nT(),Gw(n.isSold(i)?6:-1)}}function qt(e,r){if(e&1&&(ss(0,`mat-grid-list`,13),zw(1,Gt,7,9,`mat-grid-tile`,15,Rt),ru()),e&2){let t=cb(2);wm(`cols`,t.numberOfCols()),nT(),Qw(t.sortedArtPieces())}}function Kt(e,r){e&1&&(ss(0,`p`,14),jb(1),t_(2,`translate`),ru()),e&2&&(nT(),lu(` `,r_(2,1,`nothingMatched`),` `))}function Jt(e,r){if(e&1&&$w(0,qt,3,1,`mat-grid-list`,13)(1,Kt,3,3,`p`,14),e&2){let t=cb();Gw(t.sortedArtPieces().length?0:t.viewAsWidget()?-1:1)}}function Qt(e,r){e&1&&bm(0,`mat-progress-spinner`,1)}var Be=(()=>{class e{constructor(){this.artworkService=y(n),this.router=y(ee),this.activatedroute=y(W),this.responsiveService=y(wt),this.destroyRef=y(Te),this.sortMethods=Object.values(f),this.inSpanish=this.router.url===`/es`||this.router.url.startsWith(`/es/`),this.loadStarted=new Set,this.numberOfCols=RV(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=RV(!1),this.nftFilters=RV({}),this.selectedTokenId=OV(),this.yearParamSignal=Pe(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=We(new Map),this.artPieces=Pe(this.artworkService.getArtPiecesObservable()),this.dataReady=_t(()=>!!this.artPieces()?.length),this.auth=y(N),this.isArtist=_t(()=>this.auth.isAdmin()),this.criticFilter=We(`all`),this.editedByToken=Pe(Ne(_t(()=>this.auth.bearerToken())).pipe(Zu(t=>t?this.artworkService.getEditedCritics(t):ly(new Map))),{initialValue:new Map}),this.criticFilters=[{value:`all`,label:`All`},{value:`edited`,label:`Edited`},{value:`untouched`,label:`Not yet`}],this.editedCount=_t(()=>{let t=this.editedByToken();return(this.artPieces()??[]).filter(i=>t.get(i.tokenId)===!0).length}),this.availability=y(_t$1).availability,this.filteredArtPieces=_t(()=>{let t=this.artPieces(),i=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:i??[],m=this.frontalViewByToken(),z=this.criticFilter(),Pt=this.editedByToken(),j=this.viewAsWidget()?`both`:this.availability();return(t??[]).filter(D=>!this.artworkService.isExcludedByYear(D,n)&&!this.isExcludedById(D)&&(m.get(D.tokenId)??!1)&&(z===`all`||Pt.get(D.tokenId)===!0==(z===`edited`))&&(j===`both`||this.isSold(D)===(j===`sold`)))}),this.hasSoldOnDisplay=_t(()=>this.filteredArtPieces().some(t=>this.isSold(t))),this.frontalViewByToken=_t(()=>{let t=this.artPieces()??[],i=new Map;for(let n of t){let m=i.get(n.name);m?m.push(n):i.set(n.name,[n])}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,i.get(n.name)??[]));return a}),this.activeSortMethod=We(bi(V.SORT_METHOD,this.sortMethods)??f.YEAR),this.sortOrder=We(bi(V.SORT_ORDER,[c.ASC,c.DESC])??c.DESC),this.sortedArtPieces=_t(()=>{let t=this.sortOrder(),i=this.filteredArtPieces();switch(this.activeSortMethod()){case f.SIZE:return this.artworkService.sortBySize(i,t);case f.MEDIUM:return this.artworkService.sortByMedium(i,t);case f.YEAR:return this.artworkService.sortByYear(i,t)}}),this.selectedNfts=We([])}setCriticFilter(t){this.criticFilter.set(t)}onImageVisible(t){let i=this.artPieces()?.find(a=>a.tokenId===t);i&&this.loadImgThumbUrl(i)}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe(b(this.destroyRef)).subscribe(i=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,i),n})}))}toggleNftSelection(t,i){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(m=>m.tokenId===i.tokenId);if(n===-1)this.selectedNfts.set([...a,i]);else{let m=[...a];m.splice(n,1),this.selectedNfts.set(m)}}isSelected(t){return this.selectedNfts().some(i=>i.tokenId===t.tokenId)}isSold(t){return s.includes(t.tokenId)}getOrderNumber(t){let i=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return i!==-1?i+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===c.ASC?c.DESC:c.ASC),this.remember(V.SORT_ORDER,this.sortOrder())}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(c.ASC),this.remember(V.SORT_METHOD,t),this.remember(V.SORT_ORDER,c.ASC))}remember(t,i){this.viewAsWidget()||Si(t,i)}handleArtPieceClick(t){this.selectedTokenId.emit(t)}artworkLink(t){return this.inSpanish?[`/es`,`artwork`,t]:[`/artwork`,t]}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(t){return t<e.MAX_ANIMATED_TILES?`tile-enter`:``}tileEnterDelay(t){return Math.min(t,e.MAX_ANIMATED_TILES)*e.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(je(t=>{let i=t.get(`years`);return i?i.split(`,`):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):!1}static{this.ɵfac=function(i){return new(i||e)}}static{this.ɵcmp=qC({type:e,selectors:[[`app-art-pieces-list`]],inputs:{numberOfCols:[1,`numberOfCols`],viewAsWidget:[1,`viewAsWidget`],nftFilters:[1,`nftFilters`]},outputs:{selectedTokenId:`selectedTokenId`},decls:4,vars:5,consts:[[3,`ngClass`],[`diameter`,`48`,`mode`,`indeterminate`,`aria-label`,`Loading art pieces`],[1,`visually-hidden`],[1,`sort-group`],[`color`,`primary`,`role`,`button`,3,`matTooltip`],[1,`sold-legend`],[`role`,`group`,`aria-label`,`Filter by edited essay`,1,`edited-filter`],[`color`,`primary`,`role`,`button`,3,`click`,`matTooltip`],[3,`nfts`],[`aria-hidden`,`true`,1,`legend-dot`],[`type`,`button`,1,`edited-filter-choice`,3,`is-on`],[1,`edited-filter-count`],[`type`,`button`,1,`edited-filter-choice`,3,`click`],[`appParallaxTilt`,``,`gutterSize`,`10`,`rowHeight`,`1:1`,`role`,`list`,`aria-label`,`Art Pieces`,3,`cols`],[`role`,`status`,1,`nothing-matched`],[`role`,`listitem`,3,`animation-delay`],[`role`,`listitem`,3,`contextmenu`],[`draggable`,`false`,1,`tile-link`,3,`click`,`routerLink`],[`appLazyLoad`,``,3,`visible`],[1,`overlay`],[`mat-card-image`,``,`decoding`,`async`,`draggable`,`false`,1,`front-image`,3,`src`,`alt`],[`aria-hidden`,`true`,1,`sold-dot`],[1,`order-number`]],template:function(i,a){i&1&&(ss(0,`div`,0),$w(1,Wt,10,6),$w(2,Jt,2,1)(3,Qt,1,0,`mat-progress-spinner`,1),ru()),i&2&&(wm(`ngClass`,Xb(3,Ot,!a.viewAsWidget())),nT(),Gw(a.viewAsWidget()?-1:1),nT(),Gw(a.dataReady()?2:3))},dependencies:[rr,lt,Di,Et$1,nt,Xo,Y,$,Dt,di,kt,Tt,g,_t$2,rt],styles:[`mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.tile-link[_ngcontent-%COMP%]{display:block;width:100%;height:100%;color:inherit;text-decoration:none;-webkit-user-drag:none;user-drag:none}.tile-link[_ngcontent-%COMP%]:focus-visible{outline-offset:-3px}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--%NS%mdc-elevated-card-container-color: var(--%NS%catalog-frame-bg);background-color:var(--%NS%catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--%NS%parallax-x, 0%),var(--%NS%parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sold-legend[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin:.2rem 0 0;font-size:.75rem;line-height:1.4;color:var(--%NS%catalog-soft)}.legend-dot[_ngcontent-%COMP%]{height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;flex:none}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}.edited-filter[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-top:1.5rem;margin-bottom:.75rem;font-size:.75rem}.edited-filter-choice[_ngcontent-%COMP%]{padding:.15rem .6rem;border:1px solid var(--%NS%catalog-faint);border-radius:999px;background:transparent;font:inherit;color:var(--%NS%catalog-soft);cursor:pointer}.edited-filter-choice.is-on[_ngcontent-%COMP%]{border-color:var(--%NS%catalog-accent);color:var(--%NS%catalog-accent)}.edited-filter-count[_ngcontent-%COMP%]{margin-left:.2rem;color:var(--%NS%catalog-faint)}.nothing-matched[_ngcontent-%COMP%]{margin:3rem 0;text-align:center;color:var(--%NS%catalog-soft);font-size:.9375rem}`]})}}return e})();export{Be as t};