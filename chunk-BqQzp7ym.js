import{$n as nv,Ar as ss,At as Wm,C as Fm,Dr as sf,F as Ju,Fr as tt,G as Mm,Ir as tv,Kn as lu,Ln as kV,Mn as jb,Mr as tb,Nn as je,Nt as Xb,O as Gw,Ot as We,R as Kr,Rr as ub,Rt as ZC,Tt as Vi,Ur as wE,Wt as _t,Xr as y,Y as Nm,Zn as n_,_t as Te,a as $w,at as Qw,en as cb,ft as Sm,ir as of,n as $h,nr as o_,on as dy,pr as qC,ri as zw,rn as db,st as RV,ti as zm,ut as S,xr as ru,yr as rT}from"./chunk-BG1S0eb7.js";import{_ as xi,n as Jt$1}from"./chunk-Dw4Agz1y.js";import{n as A,r as P,t as $}from"./chunk-5D1riOem.js";import{C as V,D as wt,E as lt,S as Si,T as bi,_ as ee,a as Et$1,g as _t$2,h as W,l as s,n,p as $t$1,r as c,s as f,w as _t$1,x as Di,y as N}from"./main-OFPJ3G3U.js";import{n as Y,t as $$1}from"./chunk-hsb7cVt7.js";import{l as di,o as Xo,u as nt}from"./chunk-BYfZqjU7.js";import{t as g}from"./chunk-3KHkX6UY.js";var It=[`*`];var Et=new S(`MAT_CARD_CONFIG`);var Dt=(()=>{class i{appearance;constructor(){let t=y(Et,{optional:!0});this.appearance=t?.appearance||`raised`}static ɵfac=function(e){return new(e||i)};static ɵcmp=qC({type:i,selectors:[[`mat-card`]],hostAttrs:[1,`mat-mdc-card`,`mdc-card`],hostVars:8,hostBindings:function(e,a){e&2&&zm(`mat-mdc-card-outlined`,a.appearance===`outlined`)(`mdc-card--outlined`,a.appearance===`outlined`)(`mat-mdc-card-filled`,a.appearance===`filled`)(`mdc-card--filled`,a.appearance===`filled`)},inputs:{appearance:`appearance`},exportAs:[`matCard`],ngContentSelectors:It,decls:1,vars:0,template:function(e,a){e&1&&(ub(),db(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var Pt=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵdir=ZC({type:i,selectors:[[``,`mat-card-image`,``],[``,`matCardImage`,``]],hostAttrs:[1,`mat-mdc-card-image`,`mdc-card__media`]})}return i})();var kt=(()=>{class i{constructor(){this.el=y(Kr),this.isBrowser=xi(y(wE)),this.visible=new tt,this.isBrowser&&(this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.ɵfac=function(e){return new(e||i)}}static{this.ɵdir=ZC({type:i,selectors:[[``,`appLazyLoad`,``]],outputs:{visible:`visible`}})}}return i})();var Ot=i=>({container:i});function Ft(i,r){return this.methodTracking(r)}var Lt=(i,r)=>r.value;var Rt=(i,r)=>r.tokenId;function Bt(i,r){if(i&1&&(ss(0,`mat-icon`),jb(1),ru()),i&2){let t=cb(3);rT(),lu(` `,t.sortOrder()===`asc`?`arrow_upward`:`arrow_downward`,` `)}}function Vt(i,r){if(i&1){let t=tb();ss(0,`mat-chip`,7),n_(1,`translate`),Fm(`click`,function(){let a=of(t).$implicit;return sf(cb(2).changeSortMethod(a))}),ss(2,`span`,2),jb(3),n_(4,`translate`),ru(),ss(5,`mat-icon`),jb(6),ru(),$w(7,Bt,2,1,`mat-icon`),ru()}if(i&2){let t=r.$implicit,e=cb(2);Sm(`matTooltip`,`${o_(1,5,`sortBy`)} ${t}`),rT(3),nv(``,o_(4,7,`sortBy`),` `,t),rT(3),lu(` `,t===`year`?`calendar_today`:t===`medium`?`palette`:`crop_free`,` `),rT(),Gw(e.activeSortMethod()===t?7:-1)}}function zt(i,r){if(i&1&&(ss(0,`mat-chip`),Nm(1,`app-pdf-button`,8),ru()),i&2){let t=cb(2);rT(),Sm(`nfts`,t.selectedNfts())}}function jt(i,r){i&1&&(ss(0,`p`,5),Nm(1,`span`,9),jb(2),n_(3,`translate`),ru()),i&2&&(rT(2),lu(` `,o_(3,1,`soldLegend`),` `))}function $t(i,r){if(i&1){let t=tb();ss(0,`button`,12),Fm(`click`,function(){let a=of(t).$implicit;return sf(cb(3).setCriticFilter(a.value))}),jb(1),ru()}if(i&2){let t=r.$implicit,e=cb(3);zm(`is-on`,e.criticFilter()===t.value),Mm(`aria-pressed`,e.criticFilter()===t.value),rT(),lu(` `,t.label,` `)}}function Ut(i,r){if(i&1&&(ss(0,`div`,6),zw(1,$t,2,4,`button`,10,Lt),ss(3,`span`,11),jb(4),ru()()),i&2){let t=cb(2);rT(),Qw(t.criticFilters),rT(3),lu(``,t.editedCount(),` edited`)}}function Wt(i,r){if(i&1&&(ss(0,`h1`,2),jb(1),n_(2,`translate`),ru(),ss(3,`div`,3)(4,`mat-chip-set`),zw(5,Vt,8,9,`mat-chip`,4,Ft,!0),$w(7,zt,2,1,`mat-chip`),ru()(),$w(8,jt,4,3,`p`,5),$w(9,Ut,5,1,`div`,6)),i&2){let t=cb();rT(),tv(o_(2,4,`seo.paintings.title`)),rT(4),Qw(t.sortMethods),rT(2),Gw(t.selectedNfts().length?7:-1),rT(),Gw(t.hasSoldOnDisplay()?8:-1),rT(),Gw(t.isArtist()?9:-1)}}function Yt(i,r){if(i&1&&(ss(0,`div`,19)(1,`span`,22),jb(2),ru()()),i&2){let t=cb().$implicit,e=cb(3);rT(2),tv(e.getOrderNumber(t))}}function Ht(i,r){if(i&1&&Nm(0,`img`,23),i&2){let t=r,e=cb().$implicit;zm(`awaiting-sharper`,t===e.image.thumbnailUrl),Sm(`src`,t,$h)(`alt`,e.name+` — painting by Juanma Moreno Sánchez`)}}function Xt(i,r){i&1&&Nm(0,`span`,21)}function Gt(i,r){if(i&1){let t=tb();ss(0,`mat-grid-tile`,16),Vi(function(){let a=of(t).$index;return sf(cb(3).tileEnterClass(a))}),Fm(`contextmenu`,function(a){let n=of(t).$implicit;return sf(cb(3).toggleNftSelection(a,n))}),ss(1,`a`,17),n_(2,`translate`),Fm(`click`,function(){let a=of(t).$implicit;return sf(cb(3).handleArtPieceClick(a.tokenId))}),ss(3,`mat-card`,18),Fm(`visible`,function(){let a=of(t).$implicit;return sf(cb(3).onImageVisible(a.tokenId))}),$w(4,Yt,3,1,`div`,19),$w(5,Ht,1,4,`img`,20),$w(6,Xt,1,0,`span`,21),ru()()()}if(i&2){let t,e=r.$implicit,a=r.$index,n=cb(3);Wm(`animation-delay`,n.tileEnterDelay(a),`ms`),rT(),Sm(`routerLink`,n.artworkLink(e.tokenId)),Mm(`aria-label`,n.isSold(e)?e.name+`, `+o_(2,7,`sold`):e.name),rT(3),Gw(n.isSelected(e)?4:-1),rT(),Gw((t=n.imgThumbUrls().get(e.tokenId)??e.image.thumbnailUrl)?5:-1,t),rT(),Gw(n.isSold(e)?6:-1)}}function qt(i,r){if(i&1&&(ss(0,`mat-grid-list`,13),zw(1,Gt,7,9,`mat-grid-tile`,15,Rt),ru()),i&2){let t=cb(2);Sm(`cols`,t.numberOfCols()),rT(),Qw(t.sortedArtPieces())}}function Kt(i,r){i&1&&(ss(0,`p`,14),jb(1),n_(2,`translate`),ru()),i&2&&(rT(),lu(` `,o_(2,1,`nothingMatched`),` `))}function Jt(i,r){if(i&1&&$w(0,qt,3,1,`mat-grid-list`,13)(1,Kt,3,3,`p`,14),i&2){let t=cb();Gw(t.sortedArtPieces().length?0:t.viewAsWidget()?-1:1)}}function Qt(i,r){i&1&&Nm(0,`mat-progress-spinner`,1)}var Be=(()=>{class i{constructor(){this.artworkService=y(n),this.router=y(ee),this.activatedroute=y(W),this.responsiveService=y(wt),this.destroyRef=y(Te),this.sortMethods=Object.values(f),this.inSpanish=this.router.url===`/es`||this.router.url.startsWith(`/es/`),this.loadStarted=new Set,this.numberOfCols=kV(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=kV(!1),this.nftFilters=kV({}),this.selectedTokenId=RV(),this.yearParamSignal=P(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=We(new Map),this.artPieces=P(this.artworkService.getArtPiecesObservable()),this.dataReady=_t(()=>!!this.artPieces()?.length),this.auth=y(N),this.isArtist=_t(()=>this.auth.isAdmin()),this.criticFilter=We(`all`),this.editedByToken=P(A(_t(()=>this.auth.bearerToken())).pipe(Ju(t=>t?this.artworkService.getEditedCritics(t):dy(new Map))),{initialValue:new Map}),this.criticFilters=[{value:`all`,label:`All`},{value:`edited`,label:`Edited`},{value:`untouched`,label:`Not yet`}],this.editedCount=_t(()=>{let t=this.editedByToken();return(this.artPieces()??[]).filter(e=>t.get(e.tokenId)===!0).length}),this.availability=y(_t$1).availability,this.filteredArtPieces=_t(()=>{let t=this.artPieces(),e=this.yearParamSignal(),a=this.nftFilters()?.years,n=a?.length?a:e??[],m=this.frontalViewByToken(),z=this.criticFilter(),Tt=this.editedByToken(),j=this.viewAsWidget()?`both`:this.availability();return(t??[]).filter(D=>!this.artworkService.isExcludedByYear(D,n)&&!this.isExcludedById(D)&&(m.get(D.tokenId)??!1)&&(z===`all`||Tt.get(D.tokenId)===!0==(z===`edited`))&&(j===`both`||this.isSold(D)===(j===`sold`)))}),this.hasSoldOnDisplay=_t(()=>this.filteredArtPieces().some(t=>this.isSold(t))),this.frontalViewByToken=_t(()=>{let t=this.artPieces()??[],e=new Map;for(let n of t){let m=e.get(n.name);m?m.push(n):e.set(n.name,[n])}let a=new Map;for(let n of t)a.set(n.tokenId,this.artworkService.isFrontalView(n,e.get(n.name)??[]));return a}),this.activeSortMethod=We(bi(V.SORT_METHOD,this.sortMethods)??f.YEAR),this.sortOrder=We(bi(V.SORT_ORDER,[c.ASC,c.DESC])??c.DESC),this.sortedArtPieces=_t(()=>{let t=this.sortOrder(),e=this.filteredArtPieces();switch(this.activeSortMethod()){case f.SIZE:return this.artworkService.sortBySize(e,t);case f.MEDIUM:return this.artworkService.sortByMedium(e,t);case f.YEAR:return this.artworkService.sortByYear(e,t)}}),this.selectedNfts=We([])}setCriticFilter(t){this.criticFilter.set(t)}onImageVisible(t){let e=this.artPieces()?.find(a=>a.tokenId===t);e&&this.loadImgThumbUrl(e)}loadImgThumbUrl(t){this.loadStarted.has(t.tokenId)||(this.loadStarted.add(t.tokenId),this.artworkService.getProgressiveImageUrls(t).pipe($(this.destroyRef)).subscribe(e=>{this.imgThumbUrls.update(a=>{let n=new Map(a);return n.set(t.tokenId,e),n})}))}toggleNftSelection(t,e){t.preventDefault();let a=this.selectedNfts(),n=a.findIndex(m=>m.tokenId===e.tokenId);if(n===-1)this.selectedNfts.set([...a,e]);else{let m=[...a];m.splice(n,1),this.selectedNfts.set(m)}}isSelected(t){return this.selectedNfts().some(e=>e.tokenId===t.tokenId)}isSold(t){return s.includes(t.tokenId)}getOrderNumber(t){let e=this.selectedNfts().findIndex(a=>a.tokenId===t.tokenId);return e!==-1?e+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===c.ASC?c.DESC:c.ASC),this.remember(V.SORT_ORDER,this.sortOrder())}changeSortMethod(t){this.activeSortMethod()===t?this.toggleSortOrder():(this.activeSortMethod.set(t),this.sortOrder.set(c.ASC),this.remember(V.SORT_METHOD,t),this.remember(V.SORT_ORDER,c.ASC))}remember(t,e){this.viewAsWidget()||Si(t,e)}handleArtPieceClick(t){this.selectedTokenId.emit(t)}artworkLink(t){return this.inSpanish?[`/es`,`artwork`,t]:[`/artwork`,t]}methodTracking(t){return t}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(t){return t<i.MAX_ANIMATED_TILES?`tile-enter`:``}tileEnterDelay(t){return Math.min(t,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(je(t=>{let e=t.get(`years`);return e?e.split(`,`):[]}))}isExcludedById(t){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(t.tokenId):!1}static{this.ɵfac=function(e){return new(e||i)}}static{this.ɵcmp=qC({type:i,selectors:[[`app-art-pieces-list`]],inputs:{numberOfCols:[1,`numberOfCols`],viewAsWidget:[1,`viewAsWidget`],nftFilters:[1,`nftFilters`]},outputs:{selectedTokenId:`selectedTokenId`},decls:4,vars:5,consts:[[3,`ngClass`],[`diameter`,`48`,`mode`,`indeterminate`,`aria-label`,`Loading art pieces`],[1,`visually-hidden`],[1,`sort-group`],[`color`,`primary`,`role`,`button`,3,`matTooltip`],[1,`sold-legend`],[`role`,`group`,`aria-label`,`Filter by edited essay`,1,`edited-filter`],[`color`,`primary`,`role`,`button`,3,`click`,`matTooltip`],[3,`nfts`],[`aria-hidden`,`true`,1,`legend-dot`],[`type`,`button`,1,`edited-filter-choice`,3,`is-on`],[1,`edited-filter-count`],[`type`,`button`,1,`edited-filter-choice`,3,`click`],[`appParallaxTilt`,``,`gutterSize`,`10`,`rowHeight`,`1:1`,`role`,`list`,`aria-label`,`Art Pieces`,3,`cols`],[`role`,`status`,1,`nothing-matched`],[`role`,`listitem`,3,`animation-delay`],[`role`,`listitem`,3,`contextmenu`],[`draggable`,`false`,1,`tile-link`,3,`click`,`routerLink`],[`appLazyLoad`,``,3,`visible`],[1,`overlay`],[`mat-card-image`,``,`decoding`,`async`,`draggable`,`false`,1,`front-image`,3,`awaiting-sharper`,`src`,`alt`],[`aria-hidden`,`true`,1,`sold-dot`],[1,`order-number`],[`mat-card-image`,``,`decoding`,`async`,`draggable`,`false`,1,`front-image`,3,`src`,`alt`]],template:function(e,a){e&1&&(ss(0,`div`,0),$w(1,Wt,10,6),$w(2,Jt,2,1)(3,Qt,1,0,`mat-progress-spinner`,1),ru()),e&2&&(Sm(`ngClass`,Xb(3,Ot,!a.viewAsWidget())),rT(),Gw(a.viewAsWidget()?-1:1),rT(),Gw(a.dataReady()?2:3))},dependencies:[Jt$1,lt,Di,Et$1,nt,Xo,Y,$$1,Dt,di,Pt,kt,g,_t$2,$t$1],styles:[`mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.tile-link[_ngcontent-%COMP%]{display:block;width:100%;height:100%;color:inherit;text-decoration:none;-webkit-user-drag:none;user-drag:none}.tile-link[_ngcontent-%COMP%]:focus-visible{outline-offset:-3px}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--%NS%mdc-elevated-card-container-color: var(--%NS%catalog-frame-bg);background-color:var(--%NS%catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--%NS%parallax-x, 0%),var(--%NS%parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out,filter .45s ease}.front-image.awaiting-sharper[_ngcontent-%COMP%]{filter:blur(6px)}@media(prefers-reduced-motion:reduce){.front-image[_ngcontent-%COMP%]{transition:none}}.container[_ngcontent-%COMP%]{margin-top:0}.sort-group[_ngcontent-%COMP%]{margin-bottom:2em}.sold-legend[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin:.2rem 0 0;font-size:.75rem;line-height:1.4;color:var(--%NS%catalog-soft)}.legend-dot[_ngcontent-%COMP%]{height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;flex:none}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}.edited-filter[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-top:1.5rem;margin-bottom:.75rem;font-size:.75rem}.edited-filter-choice[_ngcontent-%COMP%]{padding:.15rem .6rem;border:1px solid var(--%NS%catalog-faint);border-radius:999px;background:transparent;font:inherit;color:var(--%NS%catalog-soft);cursor:pointer}.edited-filter-choice.is-on[_ngcontent-%COMP%]{border-color:var(--%NS%catalog-accent);color:var(--%NS%catalog-accent)}.edited-filter-count[_ngcontent-%COMP%]{margin-left:.2rem;color:var(--%NS%catalog-faint)}.nothing-matched[_ngcontent-%COMP%]{margin:3rem 0;text-align:center;color:var(--%NS%catalog-soft);font-size:.9375rem}`]})}}return i})();export{Be as t};