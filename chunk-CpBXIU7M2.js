import{A as HV,B as Jw,Cr as rv,Ct as Ub,Dr as sf,In as hy,L as Jr,Mr as tt,Rn as ib,Rt as Xu,W as Kw,Wn as jm,Xt as _t,Yn as l_,Yr as xm,Z as Nm,Zr as y,Zt as a_,_t as Sm,bt as Te,ci as zm,cr as o_,dr as ou,en as as,gt as SE,ht as S,j as Hi,jn as hb,kt as Ve,li as zw,lr as of,lt as Qw,oi as ze,on as cT,r as $h,sr as nv,st as Qm,u as BV,vn as ew,wn as gb,xn as fb,zr as uu,zt as YC}from"./chunk-DyYb3Cbq.js";import{_ as xi,n as Jt}from"./chunk-BPnDgTYp.js";import{n as A,r as P,t as $}from"./chunk-CBpfFXcC.js";import{$ as $t$1,B as V,H as bi,L as N,N as mt,P as k,R as Di,U as lt,V as _t$1,W as wt,ct as n$1,j as Et$1,n as c,nt as _t$2,rt as ee,t as n,tt as W,z as Si}from"./main-NOSCJY7G.js";import{t as K}from"./chunk-CWq7V4Yv.js";import{t as g}from"./chunk-XNUwfySK.js";import{n as Y,t as $$1}from"./chunk-ZLOYCT0B.js";var Nt=[`*`];var It=new S(`MAT_CARD_CONFIG`);var Dt=(()=>{class e{appearance;constructor(){let t=y(It,{optional:!0});this.appearance=t?.appearance||`raised`}static ɵfac=function(i){return new(i||e)};static ɵcmp=YC({type:e,selectors:[[`mat-card`]],hostAttrs:[1,`mat-mdc-card`,`mdc-card`],hostVars:8,hostBindings:function(i,a){i&2&&Qm(`mat-mdc-card-outlined`,a.appearance===`outlined`)(`mdc-card--outlined`,a.appearance===`outlined`)(`mat-mdc-card-filled`,a.appearance===`filled`)(`mdc-card--filled`,a.appearance===`filled`)},inputs:{appearance:`appearance`},exportAs:[`matCard`],ngContentSelectors:Nt,decls:1,vars:0,template:function(i,a){i&1&&(hb(),gb(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return e})();var Tt=(()=>{class e{static ɵfac=function(i){return new(i||e)};static ɵdir=ew({type:e,selectors:[[``,`mat-card-image`,``],[``,`matCardImage`,``]],hostAttrs:[1,`mat-mdc-card-image`,`mdc-card__media`]})}return e})();var Pt=(()=>{class e{constructor(){this.el=y(Jr),this.isBrowser=xi(y(SE)),this.visible=new tt,this.isBrowser&&(this.observer=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.ɵfac=function(i){return new(i||e)}}static{this.ɵdir=ew({type:e,selectors:[[``,`appLazyLoad`,``]],outputs:{visible:`visible`}})}}return e})();var Et=e=>({container:e});function Ot(e,n){return this.methodTracking(n)}var Ft=(e,n)=>n.value;var Lt=(e,n)=>n.tokenId;function Rt(e,n){if(e&1&&(as(0,`mat-icon`),Ub(1),ou()),e&2){let t=fb(3);cT(),uu(` `,t.sortOrder()===`asc`?`arrow_upward`:`arrow_downward`,` `)}}function Bt(e,n){if(e&1){let t=ib();as(0,`mat-chip`,7),a_(1,`translate`),jm(`click`,function(){let a=of(t).$implicit;return sf(fb(2).changeSortMethod(a))}),as(2,`span`,2),Ub(3),a_(4,`translate`),ou(),as(5,`mat-icon`),Ub(6),ou(),zw(7,Rt,2,1,`mat-icon`),ou()}if(e&2){let t=n.$implicit,i=fb(2);Nm(`matTooltip`,`${l_(1,5,`sortBy`)} ${t}`),cT(3),rv(``,l_(4,7,`sortBy`),` `,t),cT(3),uu(` `,t===`year`?`calendar_today`:t===`medium`?`palette`:`crop_free`,` `),cT(),Qw(i.activeSortMethod()===t?7:-1)}}function Vt(e,n){e&1&&(as(0,`p`,5),xm(1,`span`,8),Ub(2),a_(3,`translate`),ou()),e&2&&(cT(2),uu(` `,l_(3,1,`soldLegend`),` `))}function zt(e,n){if(e&1){let t=ib();as(0,`button`,11),jm(`click`,function(){let a=of(t).$implicit;return sf(fb(3).setCriticFilter(a.value))}),Ub(1),ou()}if(e&2){let t=n.$implicit,i=fb(3);Qm(`is-on`,i.criticFilter()===t.value),Sm(`aria-pressed`,i.criticFilter()===t.value),cT(),uu(` `,t.label,` `)}}function jt(e,n){if(e&1&&(as(0,`div`,6),Kw(1,zt,2,4,`button`,9,Ft),as(3,`span`,10),Ub(4),ou()()),e&2){let t=fb(2);cT(),Jw(t.criticFilters),cT(3),uu(``,t.editedCount(),` edited`)}}function $t(e,n){if(e&1&&(as(0,`h1`,2),Ub(1),a_(2,`translate`),ou(),as(3,`div`,3)(4,`mat-chip-set`),Kw(5,Bt,8,9,`mat-chip`,4,Ot,!0),ou()(),zw(7,Vt,4,3,`p`,5),zw(8,jt,5,1,`div`,6)),e&2){let t=fb();cT(),nv(l_(2,3,`seo.paintings.title`)),cT(4),Jw(t.sortMethods),cT(2),Qw(t.hasSoldOnDisplay()?7:-1),cT(),Qw(t.isArtist()?8:-1)}}function Ut(e,n){if(e&1&&xm(0,`img`,20),e&2){let t=n,i=fb().$implicit;Qm(`awaiting-sharper`,t===i.image.thumbnailUrl),Nm(`src`,t,$h)(`alt`,i.name+` — painting by Juanma Moreno Sánchez`)}}function Wt(e,n){e&1&&xm(0,`span`,19)}function Yt(e,n){if(e&1){let t=ib();as(0,`mat-grid-tile`,15),Hi(function(){let a=of(t).$index;return sf(fb(3).tileEnterClass(a))}),as(1,`a`,16),a_(2,`translate`),jm(`click`,function(){let a=of(t).$implicit;return sf(fb(3).handleArtPieceClick(a.tokenId))}),as(3,`mat-card`,17),jm(`visible`,function(){let a=of(t).$implicit;return sf(fb(3).onImageVisible(a.tokenId))}),zw(4,Ut,1,4,`img`,18),zw(5,Wt,1,0,`span`,19),ou()()()}if(e&2){let t,i=n.$implicit,a=n.$index,r=fb(3);zm(`animation-delay`,r.tileEnterDelay(a),`ms`),cT(),Nm(`routerLink`,r.artworkLink(i.tokenId)),Sm(`aria-label`,r.isSold(i)?i.name+`, `+l_(2,6,`sold`):i.name),cT(3),Qw((t=r.imgThumbUrls().get(i.tokenId)??i.image.thumbnailUrl)?4:-1,t),cT(),Qw(r.isSold(i)?5:-1)}}function Ht(e,n){if(e&1&&(as(0,`mat-grid-list`,12),Kw(1,Yt,6,8,`mat-grid-tile`,14,Lt),ou()),e&2){let t=fb(2);Nm(`cols`,t.numberOfCols()),cT(),Jw(t.sortedArtPieces())}}function Xt(e,n){e&1&&(as(0,`p`,13),Ub(1),a_(2,`translate`),ou()),e&2&&(cT(),uu(` `,l_(2,1,`nothingMatched`),` `))}function Gt(e,n){if(e&1&&zw(0,Ht,3,1,`mat-grid-list`,12)(1,Xt,3,3,`p`,13),e&2){let t=fb();Qw(t.sortedArtPieces().length?0:t.viewAsWidget()?-1:1)}}function qt(e,n){e&1&&xm(0,`mat-progress-spinner`,1)}var Fe=(()=>{class e{constructor(){this.artworkService=y(n),this.router=y(ee),this.activatedroute=y(W),this.responsiveService=y(wt),this.destroyRef=y(Te),this.sortMethods=Object.values(n$1),this.inSpanish=this.router.url===`/es`||this.router.url.startsWith(`/es/`),this.loadStarted=new Set,this.numberOfCols=BV(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=BV(!1),this.nftFilters=BV({}),this.selectedTokenId=HV(),this.yearParamSignal=P(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=ze(new Map),this.artPieces=P(this.artworkService.getArtPiecesObservable()),this.dataReady=_t(()=>!!this.artPieces()?.length),this.auth=y(N),this.isArtist=_t(()=>this.auth.isAdmin()),this.criticFilter=ze(`all`),this.editedByToken=P(A(_t(()=>this.auth.bearerToken())).pipe(Xu(t=>t?this.artworkService.getEditedCritics(t):hy(new Map))),{initialValue:new Map}),this.criticFilters=[{value:`all`,label:`All`},{value:`edited`,label:`Edited`},{value:`untouched`,label:`Not yet`}],this.editedCount=_t(()=>{let t=this.editedByToken();return(this.artPieces()??[]).filter(i=>t.get(i.tokenId)===!0).length}),this.availability=y(_t$1).availability,this.whatIsSold=y(k),this.filteredArtPieces=_t(()=>{let t=this.artPieces(),i=this.yearParamSignal(),a=this.nftFilters()?.years,r=a?.length?a:i??[],P=this.frontalViewByToken(),V=this.criticFilter(),kt=this.editedByToken(),z=this.viewAsWidget()?`both`:this.availability();return(t??[]).filter(M=>!this.artworkService.isExcludedByYear(M,r)&&!this.isExcludedById(M)&&(P.get(M.tokenId)??!1)&&(V===`all`||kt.get(M.tokenId)===!0==(V===`edited`))&&(z===`both`||this.isSold(M)===(z===`sold`)))}),this.hasSoldOnDisplay=_t(()=>this.filteredArtPieces().some(t=>this.isSold(t))),this.frontalViewByToken=_t(()=>{let t=this.artPieces()??[],i=new Map;for(let r of t){let P=i.get(r.name);P?P.push(r):i.set(r.name,[r])}let a=new Map;for(let r of t)a.set(r.tokenId,this.artworkService.isFrontalView(r,i.get(r.name)??[]));return a}),this.activeSortMethod=ze(bi(V.SORT_METHOD,this.sortMethods)??n$1.YEAR),this.sortOrder=ze(bi(V.SORT_ORDER,[c.ASC,c.DESC])??c.DESC),this.sortedArtPieces=_t(()=>{let t=this.sortOrder(),i=this.filteredArtPieces();switch(this.activeSortMethod()){case n$1.SIZE:return this.artworkService.sortBySize(i,t);case n$1.MEDIUM:return this.artworkService.sortByMedium(i,t);case n$1.YEAR:return this.artworkService.sortByYear(i,t)}})}setCriticFilter(t){this.criticFilter.set(t)}onImageVisible(t){let i=this.artPieces()?.find(a=>a.tokenId===t);i&&this.loadImgThumbUrl(i)}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe($(this.destroyRef)).subscribe(i=>{this.imgThumbUrls.update(a=>{let r=new Map(a);return r.set(t.tokenId,i),r})}))}isSold(t){return this.whatIsSold.isSold(t.tokenId)}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===c.ASC?c.DESC:c.ASC),this.remember(V.SORT_ORDER,this.sortOrder())}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(c.ASC),this.remember(V.SORT_METHOD,t),this.remember(V.SORT_ORDER,c.ASC))}remember(t,i){this.viewAsWidget()||Si(t,i)}handleArtPieceClick(t){this.selectedTokenId.emit(t)}artworkLink(t){return this.inSpanish?[`/es`,`artwork`,t]:[`/artwork`,t]}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(t){return t<e.MAX_ANIMATED_TILES?`tile-enter`:``}tileEnterDelay(t){return Math.min(t,e.MAX_ANIMATED_TILES)*e.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(Ve(t=>{let i=t.get(`years`);return i?i.split(`,`):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):!1}static{this.ɵfac=function(i){return new(i||e)}}static{this.ɵcmp=YC({type:e,selectors:[[`app-art-pieces-list`]],inputs:{numberOfCols:[1,`numberOfCols`],viewAsWidget:[1,`viewAsWidget`],nftFilters:[1,`nftFilters`]},outputs:{selectedTokenId:`selectedTokenId`},decls:4,vars:5,consts:[[3,`ngClass`],[`diameter`,`48`,`mode`,`indeterminate`,`aria-label`,`Loading art pieces`],[1,`visually-hidden`],[1,`sort-group`],[`color`,`primary`,`role`,`button`,3,`matTooltip`],[1,`sold-legend`],[`role`,`group`,`aria-label`,`Filter by edited essay`,1,`edited-filter`],[`color`,`primary`,`role`,`button`,3,`click`,`matTooltip`],[`aria-hidden`,`true`,1,`legend-dot`],[`type`,`button`,1,`edited-filter-choice`,3,`is-on`],[1,`edited-filter-count`],[`type`,`button`,1,`edited-filter-choice`,3,`click`],[`appParallaxTilt`,``,`gutterSize`,`10`,`rowHeight`,`1:1`,`role`,`list`,`aria-label`,`Art Pieces`,3,`cols`],[`role`,`status`,1,`nothing-matched`],[`role`,`listitem`,3,`animation-delay`],[`role`,`listitem`],[`draggable`,`false`,1,`tile-link`,3,`click`,`routerLink`],[`appLazyLoad`,``,3,`visible`],[`mat-card-image`,``,`decoding`,`async`,`draggable`,`false`,1,`front-image`,3,`awaiting-sharper`,`src`,`alt`],[`aria-hidden`,`true`,1,`sold-dot`],[`mat-card-image`,``,`decoding`,`async`,`draggable`,`false`,1,`front-image`,3,`src`,`alt`]],template:function(i,a){i&1&&(as(0,`div`,0),zw(1,$t,9,5),zw(2,Gt,2,1)(3,qt,1,0,`mat-progress-spinner`,1),ou()),i&2&&(Nm(`ngClass`,o_(3,Et,!a.viewAsWidget())),cT(),Qw(a.viewAsWidget()?-1:1),cT(),Qw(a.dataReady()?2:3))},dependencies:[Jt,lt,Di,Et$1,mt,Y,$$1,Dt,K,Tt,Pt,g,_t$2,$t$1],styles:[`mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.tile-link[_ngcontent-%COMP%]{display:block;width:100%;height:100%;color:inherit;text-decoration:none;-webkit-user-drag:none;user-drag:none}.tile-link[_ngcontent-%COMP%]:focus-visible{outline-offset:-3px}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--%NS%mdc-elevated-card-container-color: var(--%NS%catalog-frame-bg);background-color:var(--%NS%catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--%NS%parallax-x, 0%),var(--%NS%parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out,filter .45s ease}.front-image.awaiting-sharper[_ngcontent-%COMP%]{filter:blur(6px)}@media(prefers-reduced-motion:reduce){.front-image[_ngcontent-%COMP%]{transition:none}}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sold-legend[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin:.2rem 0 0;font-size:.75rem;line-height:1.4;color:var(--%NS%catalog-soft)}.legend-dot[_ngcontent-%COMP%]{height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;flex:none}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}.edited-filter[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-top:1.5rem;margin-bottom:.75rem;font-size:.75rem}.edited-filter-choice[_ngcontent-%COMP%]{padding:.15rem .6rem;border:1px solid var(--%NS%catalog-faint);border-radius:999px;background:transparent;font:inherit;color:var(--%NS%catalog-soft);cursor:pointer}.edited-filter-choice.is-on[_ngcontent-%COMP%]{border-color:var(--%NS%catalog-accent);color:var(--%NS%catalog-accent)}.edited-filter-count[_ngcontent-%COMP%]{margin-left:.2rem;color:var(--%NS%catalog-faint)}.nothing-matched[_ngcontent-%COMP%]{margin:3rem 0;text-align:center;color:var(--%NS%catalog-soft);font-size:.9375rem}`]})}}return e})();export{Fe as t};