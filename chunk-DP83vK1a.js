import{$n as nT,A as Hh,Ar as t_,B as Km,Cr as ru,E as Gw,Et as Vi,Fn as jb,Fr as tt,Ft as Xb,Gt as Zu,Ht as ZC,In as je$1,Kn as lu,Mr as tb,Mt as Ww,Pr as tf,Rr as ub,Sr as r_,V as Kr,Yr as wm,an as cb,ct as RV,er as nf,et as OV,ft as S,g as Cm,gr as qC,i as $w,ii as zw,kr as ss,kt as We$1,ln as db,lt as Rm,n as $m,ni as y,nn as bm,p as CE,qn as ly,qt as _t,st as Qw,vt as Te$1,wt as Um}from"./chunk-CDYgws-d.js";import{c as fs,f as rr}from"./chunk-DZVQ6PgG.js";import{A as ut,C as N,D as ct,E as _t$1,O as ht,T as Ii,_ as b,a as Et,b as _t$2,j as vt,k as mt,l as s,m as Pe$1,n,o as d,p as Ne$1,r as c,s as f,v as rt,x as ee,y as W}from"./main-M4TFURRS.js";import{l as di,o as Xo}from"./chunk-CWdXQeGR.js";import{n as Y,t as $}from"./chunk-D4fSjvxa.js";var Ee=[`*`];var Fe=new S(`MAT_CARD_CONFIG`);var Ae=(()=>{class i{appearance;constructor(){let e=y(Fe,{optional:!0});this.appearance=e?.appearance||`raised`}static ɵfac=function(t){return new(t||i)};static ɵcmp=qC({type:i,selectors:[[`mat-card`]],hostAttrs:[1,`mat-mdc-card`,`mdc-card`],hostVars:8,hostBindings:function(t,n){t&2&&$m(`mat-mdc-card-outlined`,n.appearance===`outlined`)(`mdc-card--outlined`,n.appearance===`outlined`)(`mat-mdc-card-filled`,n.appearance===`filled`)(`mdc-card--filled`,n.appearance===`filled`)},inputs:{appearance:`appearance`},exportAs:[`matCard`],ngContentSelectors:Ee,decls:1,vars:0,template:function(t,n){t&1&&(ub(),db(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2})}return i})();var Pe=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵdir=ZC({type:i,selectors:[[``,`mat-card-image`,``],[``,`matCardImage`,``]],hostAttrs:[1,`mat-mdc-card-image`,`mdc-card__media`]})}return i})();var ke=(()=>{class i{constructor(){this.el=y(Kr),this.isBrowser=fs(y(CE)),this.visible=new tt,this.isBrowser&&(this.observer=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(this.visible.emit(),this.observer?.unobserve(this.el.nativeElement))})},{threshold:.1}))}ngOnInit(){this.observer?.observe(this.el.nativeElement)}ngOnDestroy(){this.observer?.disconnect()}static{this.ɵfac=function(t){return new(t||i)}}static{this.ɵdir=ZC({type:i,selectors:[[``,`appLazyLoad`,``]],outputs:{visible:`visible`}})}}return i})();var Le=3;var Ne=(()=>{class i{constructor(){this.el=y(Kr),this.maxShiftPercent=RV(Le),this.rafId=0,this.onPointerMove=e=>{if(this.rafId)return;let{clientX:t,clientY:n}=e;this.rafId=requestAnimationFrame(()=>{this.rafId=0,this.apply(t,n)})},!(typeof document>`u`)&&(window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches||document.addEventListener(`pointermove`,this.onPointerMove,{passive:!0}))}ngOnDestroy(){typeof document>`u`||(document.removeEventListener(`pointermove`,this.onPointerMove),this.rafId&&cancelAnimationFrame(this.rafId))}apply(e,t){let n=this.clamp((e-window.innerWidth/2)/(window.innerWidth/2)),a=this.clamp((t-window.innerHeight/2)/(window.innerHeight/2)),d=this.maxShiftPercent(),x=this.el.nativeElement.style;x.setProperty(`--parallax-x`,`${(n*d).toFixed(2)}%`),x.setProperty(`--parallax-y`,`${(a*d).toFixed(2)}%`)}clamp(e){return Math.min(1,Math.max(-1,e))}static{this.ɵfac=function(t){return new(t||i)}}static{this.ɵdir=ZC({type:i,selectors:[[``,`appParallaxTilt`,``]],inputs:{maxShiftPercent:[1,`maxShiftPercent`]}})}}return i})();var Oe=i=>({container:i});function Ve(i,c){return this.methodTracking(c)}var Te=(i,c)=>c.value;var Re=(i,c)=>c.tokenId;function Be(i,c){if(i&1){let e=tb();ss(0,`button`,16),Rm(`click`,function(){let n=tf(e).$implicit;return nf(cb(3).setCriticFilter(n.value))}),jb(1),ru()}if(i&2){let e=c.$implicit,t=cb(3);$m(`is-on`,t.criticFilter()===e.value),Cm(`aria-pressed`,t.criticFilter()===e.value),nT(),lu(` `,e.label,` `)}}function $e(i,c){if(i&1&&(ss(0,`div`,4),zw(1,Be,2,4,`button`,14,Te),ss(3,`span`,15),jb(4),ru()()),i&2){let e=cb(2);nT(),Qw(e.criticFilters),nT(3),lu(``,e.editedCount(),` edited`)}}function ze(i,c){if(i&1&&(ss(0,`mat-icon`),jb(1),ru()),i&2){let e=cb(3);nT(),lu(` `,e.sortOrder()===`asc`?`arrow_upward`:`arrow_downward`,` `)}}function je(i,c){if(i&1){let e=tb();ss(0,`mat-chip`,17),Rm(`click`,function(){let n=tf(e).$implicit;return nf(cb(2).changeSortMethod(n))})(`keydown.enter`,function(){let n=tf(e).$implicit;return nf(cb(2).changeSortMethod(n))})(`keydown.space`,function(n){let a=tf(e).$implicit,d=cb(2);return n.preventDefault(),nf(d.changeSortMethod(a))}),jb(1),t_(2,`translate`),$w(3,ze,2,1,`mat-icon`),ru()}if(i&2){let e=c.$implicit,t=cb(2);$m(`is-on`,t.activeSortMethod()===e),Cm(`aria-pressed`,t.activeSortMethod()===e),nT(),lu(` `,r_(2,5,`sortMethod.`+e),` `),nT(2),Gw(t.activeSortMethod()===e?3:-1)}}function Ye(i,c){if(i&1&&(ss(0,`mat-chip`),bm(1,`app-pdf-button`,18),ru()),i&2){let e=cb(2);nT(),wm(`nfts`,e.selectedNfts())}}function Ue(i,c){if(i&1){let e=tb();ss(0,`mat-chip`,21),Rm(`click`,function(){let n=tf(e).$implicit;return nf(cb(3).setMedium(n.value))})(`keydown.enter`,function(){let n=tf(e).$implicit;return nf(cb(3).setMedium(n.value))})(`keydown.space`,function(n){let a=tf(e).$implicit,d=cb(3);return n.preventDefault(),nf(d.setMedium(a.value))}),jb(1),t_(2,`translate`),ru()}if(i&2){let e=c.$implicit,t=cb(3);$m(`is-on`,t.mediumFilter()===e.value),Cm(`aria-pressed`,t.mediumFilter()===e.value),nT(),lu(` `,r_(2,4,e.label),` `)}}function We(i,c){if(i&1){let e=tb();ss(0,`div`,6)(1,`span`,19),jb(2),t_(3,`translate`),ru(),ss(4,`mat-chip-set`,20)(5,`mat-chip`,21),Rm(`click`,function(){tf(e);let n=cb(2);return nf(n.setMedium(n.ANY))})(`keydown.enter`,function(){tf(e);let n=cb(2);return nf(n.setMedium(n.ANY))})(`keydown.space`,function(n){tf(e);let a=cb(2);return n.preventDefault(),nf(a.setMedium(a.ANY))}),jb(6),t_(7,`translate`),ru(),zw(8,Ue,3,6,`mat-chip`,12,Te),ru()()}if(i&2){let e=cb(2);nT(2),Km(r_(3,5,`filter.medium`)),nT(3),$m(`is-on`,e.mediumFilter()===e.ANY),Cm(`aria-pressed`,e.mediumFilter()===e.ANY),nT(),lu(` `,r_(7,7,`filter.any`),` `),nT(2),Qw(e.mediums())}}function He(i,c){if(i&1){let e=tb();ss(0,`mat-chip`,21),Rm(`click`,function(){let n=tf(e).$implicit;return nf(cb(2).setAvailability(n))})(`keydown.enter`,function(){let n=tf(e).$implicit;return nf(cb(2).setAvailability(n))})(`keydown.space`,function(n){let a=tf(e).$implicit,d=cb(2);return n.preventDefault(),nf(d.setAvailability(a))}),jb(1),t_(2,`translate`),ru()}if(i&2){let e=c.$implicit,t=cb(2);$m(`is-on`,t.availabilityFilter()===e),Cm(`aria-pressed`,t.availabilityFilter()===e),nT(),lu(` `,r_(2,4,`filter.`+e),` `)}}function Xe(i,c){i&1&&(ss(0,`p`,13),bm(1,`span`,22),jb(2),t_(3,`translate`),ru()),i&2&&(nT(2),lu(` `,r_(3,1,`filter.soldLegend`),` `))}function Ge(i,c){if(i&1&&(ss(0,`h1`,3),jb(1),t_(2,`translate`),ru(),$w(3,$e,5,1,`div`,4),ss(4,`div`,5)(5,`div`,6)(6,`span`,7),jb(7),t_(8,`translate`),ru(),ss(9,`mat-chip-set`,8),zw(10,je,4,7,`mat-chip`,9,Ve,!0),$w(12,Ye,2,1,`mat-chip`),ru()(),$w(13,We,10,9,`div`,6),ss(14,`div`,6)(15,`span`,10),jb(16),t_(17,`translate`),ru(),ss(18,`mat-chip-set`,11),zw(19,He,3,6,`mat-chip`,12,Ww),ru()(),$w(21,Xe,4,3,`p`,13),ru()),i&2){let e=cb();nT(),Km(r_(2,7,`seo.paintings.title`)),nT(2),Gw(e.isArtist()?3:-1),nT(4),Km(r_(8,9,`sortBy`)),nT(3),Qw(e.sortMethods),nT(2),Gw(e.selectedNfts().length?12:-1),nT(),Gw(e.mediums().length>1?13:-1),nT(3),lu(` `,r_(17,11,`filter.availability`),` `),nT(3),Qw(e.availabilityChoices),nT(2),Gw(e.hasSoldOnDisplay()?21:-1)}}function qe(i,c){if(i&1&&(ss(0,`div`,27)(1,`span`,30),jb(2),ru()()),i&2){let e=cb().$implicit,t=cb(2);nT(2),Km(t.getOrderNumber(e))}}function Ke(i,c){if(i&1&&bm(0,`img`,28),i&2){let e=cb().$implicit;wm(`src`,c,Hh)(`alt`,e.name+` — painting by Juanma Moreno Sánchez`)}}function Je(i,c){i&1&&bm(0,`span`,29)}function Qe(i,c){if(i&1){let e=tb();ss(0,`mat-grid-tile`,24),Vi(function(){let n=tf(e).$index;return nf(cb(2).tileEnterClass(n))}),Rm(`contextmenu`,function(n){let a=tf(e).$implicit;return nf(cb(2).toggleNftSelection(n,a))}),ss(1,`a`,25),t_(2,`translate`),Rm(`click`,function(){let n=tf(e).$implicit;return nf(cb(2).handleArtPieceClick(n.tokenId))}),ss(3,`mat-card`,26),Rm(`visible`,function(){let n=tf(e).$implicit;return nf(cb(2).onImageVisible(n.tokenId))}),$w(4,qe,3,1,`div`,27),$w(5,Ke,1,2,`img`,28),$w(6,Je,1,0,`span`,29),ru()()()}if(i&2){let e,t=c.$implicit,n=c.$index,a=cb(2);Um(`animation-delay`,a.tileEnterDelay(n),`ms`),nT(),wm(`routerLink`,a.artworkLink(t.tokenId)),Cm(`aria-label`,a.isSold(t)?t.name+`, `+r_(2,7,`sold`):t.name),nT(3),Gw(a.isSelected(t)?4:-1),nT(),Gw((e=a.imgThumbUrls().get(t.tokenId)??t.image.thumbnailUrl)?5:-1,e),nT(),Gw(a.isSold(t)?6:-1)}}function Ze(i,c){if(i&1&&(ss(0,`mat-grid-list`,1),zw(1,Qe,7,9,`mat-grid-tile`,23,Re),ru()),i&2){let e=cb();wm(`cols`,e.numberOfCols()),nT(),Qw(e.sortedArtPieces())}}function et(i,c){i&1&&bm(0,`mat-progress-spinner`,2)}var O=`any`;var Ie=[`drawing`,`oil`,`watercolor`];var De=[`any`,`available`,`sold`];var zt=(()=>{class i{constructor(){this.artworkService=y(n),this.router=y(ee),this.activatedroute=y(W),this.responsiveService=y(ht),this.destroyRef=y(Te$1),this.sortMethods=Object.values(f),this.inSpanish=this.router.url===`/es`||this.router.url.startsWith(`/es/`),this.loadStarted=new Set,this.numberOfCols=RV(this.responsiveService.displayMobileLayout.value?3:2),this.viewAsWidget=RV(!1),this.nftFilters=RV({}),this.selectedTokenId=OV(),this.yearParamSignal=Pe$1(this.queryParamsObservable(),{initialValue:[]}),this.imgThumbUrls=We$1(new Map),this.artPieces=Pe$1(this.artworkService.getArtPiecesObservable()),this.dataReady=_t(()=>!!this.artPieces()?.length),this.auth=y(N),this.isArtist=_t(()=>this.auth.isAdmin()),this.criticFilter=We$1(`all`),this.editedByToken=Pe$1(Ne$1(_t(()=>this.auth.bearerToken())).pipe(Zu(e=>e?this.artworkService.getEditedCritics(e):ly(new Map))),{initialValue:new Map}),this.criticFilters=[{value:`all`,label:`All`},{value:`edited`,label:`Edited`},{value:`untouched`,label:`Not yet`}],this.editedCount=_t(()=>{let e=this.editedByToken();return(this.artPieces()??[]).filter(t=>e.get(t.tokenId)===!0).length}),this.visiblePieces=_t(()=>{let e=this.artPieces(),t=this.yearParamSignal(),n=this.nftFilters()?.years,a=n?.length?n:t??[],d=this.frontalViewByToken();return(e??[]).filter(x=>!this.artworkService.isExcludedByYear(x,a)&&!this.isExcludedById(x)&&(d.get(x.tokenId)??!1))}),this.ANY=O,this.availabilityChoices=De,this.mediumChoice=We$1(vt(mt.MEDIUM)??O),this.availabilityFilter=We$1(ut(mt.AVAILABILITY,De)??O),this.mediumFilter=_t(()=>this.mediums().some(e=>e.value===this.mediumChoice())?this.mediumChoice():O),this.mediums=_t(()=>{let e=new Set;for(let t of this.visiblePieces()){let n=this.mediumFamilyOf(t);n&&e.add(n)}return[...e].sort().map(t=>({value:t,label:this.mediumLabel(t)}))}),this.hasSoldOnDisplay=_t(()=>this.visiblePieces().some(e=>this.isSold(e))),this.filteredArtPieces=_t(()=>{let e=this.criticFilter(),t=this.editedByToken(),n=this.viewAsWidget(),a=this.mediumFilter(),d=this.availabilityFilter();return this.visiblePieces().filter(x=>(e===`all`||t.get(x.tokenId)===!0==(e===`edited`))&&(n||a===O||this.mediumFamilyOf(x)===a)&&(n||d===O||this.isSold(x)===(d===`sold`)))}),this.frontalViewByToken=_t(()=>{let e=this.artPieces()??[],t=new Map;for(let a of e){let d=t.get(a.name);d?d.push(a):t.set(a.name,[a])}let n=new Map;for(let a of e)n.set(a.tokenId,this.artworkService.isFrontalView(a,t.get(a.name)??[]));return n}),this.activeSortMethod=We$1(ut(mt.SORT_METHOD,this.sortMethods)??f.YEAR),this.sortOrder=We$1(ut(mt.SORT_ORDER,[c.ASC,c.DESC])??c.DESC),this.sortedArtPieces=_t(()=>{let e=this.sortOrder(),t=this.filteredArtPieces();switch(this.activeSortMethod()){case f.SIZE:return this.artworkService.sortBySize(t,e);case f.MEDIUM:return this.artworkService.sortByMedium(t,e);case f.YEAR:return this.artworkService.sortByYear(t,e)}}),this.selectedNfts=We$1([])}setCriticFilter(e){this.criticFilter.set(e)}onImageVisible(e){let t=this.artPieces()?.find(n=>n.tokenId===e);t&&this.loadImgThumbUrl(t)}loadImgThumbUrl(e){this.loadStarted.has(e.tokenId)||(this.loadStarted.add(e.tokenId),this.artworkService.getProgressiveImageUrls(e).pipe(b(this.destroyRef)).subscribe(t=>{this.imgThumbUrls.update(n=>{let a=new Map(n);return a.set(e.tokenId,t),a})}))}toggleNftSelection(e,t){e.preventDefault();let n=this.selectedNfts(),a=n.findIndex(d=>d.tokenId===t.tokenId);if(a===-1)this.selectedNfts.set([...n,t]);else{let d=[...n];d.splice(a,1),this.selectedNfts.set(d)}}isSelected(e){return this.selectedNfts().some(t=>t.tokenId===e.tokenId)}isSold(e){return s.includes(e.tokenId)}getOrderNumber(e){let t=this.selectedNfts().findIndex(n=>n.tokenId===e.tokenId);return t!==-1?t+1:null}toggleSortOrder(){this.sortOrder.set(this.sortOrder()===c.ASC?c.DESC:c.ASC),this.remember(mt.SORT_ORDER,this.sortOrder())}changeSortMethod(e){this.activeSortMethod()===e?this.toggleSortOrder():(this.activeSortMethod.set(e),this.sortOrder.set(c.ASC),this.remember(mt.SORT_METHOD,e),this.remember(mt.SORT_ORDER,c.ASC))}setMedium(e){this.mediumChoice.set(e),this.remember(mt.MEDIUM,e)}setAvailability(e){this.availabilityFilter.set(e),this.remember(mt.AVAILABILITY,e)}mediumOf(e){let t=this.artworkService.getTraitValue(e,d.MEDIUM);return t.startsWith(`Error`)?``:t}mediumFamilyOf(e){let t=this.mediumOf(e);return Ie.find(a=>t.toLowerCase().includes(a))??t}mediumLabel(e){return Ie.includes(e)?`filter.family.${e}`:e}remember(e,t){this.viewAsWidget()||_t$1(e,t)}handleArtPieceClick(e){this.selectedTokenId.emit(e)}artworkLink(e){return this.inSpanish?[`/es`,`artwork`,e]:[`/artwork`,e]}methodTracking(e){return e}static{this.MAX_ANIMATED_TILES=20}static{this.TILE_DELAY_STEP_MS=30}tileEnterClass(e){return e<i.MAX_ANIMATED_TILES?`tile-enter`:``}tileEnterDelay(e){return Math.min(e,i.MAX_ANIMATED_TILES)*i.TILE_DELAY_STEP_MS}queryParamsObservable(){return this.activatedroute.queryParamMap.pipe(je$1(e=>{let t=e.get(`years`);return t?t.split(`,`):[]}))}isExcludedById(e){return this.nftFilters()?.idsToExclude?.length?this.nftFilters().idsToExclude.includes(e.tokenId):!1}static{this.ɵfac=function(t){return new(t||i)}}static{this.ɵcmp=qC({type:i,selectors:[[`app-art-pieces-list`]],inputs:{numberOfCols:[1,`numberOfCols`],viewAsWidget:[1,`viewAsWidget`],nftFilters:[1,`nftFilters`]},outputs:{selectedTokenId:`selectedTokenId`},decls:4,vars:5,consts:[[3,`ngClass`],[`appParallaxTilt`,``,`gutterSize`,`10`,`rowHeight`,`1:1`,`role`,`list`,`aria-label`,`Art Pieces`,3,`cols`],[`diameter`,`48`,`mode`,`indeterminate`,`aria-label`,`Loading art pieces`],[1,`visually-hidden`],[`role`,`group`,`aria-label`,`Filter by edited essay`,1,`edited-filter`],[1,`catalogue-controls`],[1,`control-row`],[`id`,`sort-label`,1,`control-label`],[`aria-labelledby`,`sort-label`],[`color`,`primary`,`role`,`button`,`tabindex`,`0`,3,`is-on`],[`id`,`availability-label`,1,`control-label`],[`aria-labelledby`,`availability-label`],[`role`,`button`,`tabindex`,`0`,3,`is-on`],[1,`sold-legend`],[`type`,`button`,1,`edited-filter-choice`,3,`is-on`],[1,`edited-filter-count`],[`type`,`button`,1,`edited-filter-choice`,3,`click`],[`color`,`primary`,`role`,`button`,`tabindex`,`0`,3,`click`,`keydown.enter`,`keydown.space`],[3,`nfts`],[`id`,`medium-label`,1,`control-label`],[`aria-labelledby`,`medium-label`],[`role`,`button`,`tabindex`,`0`,3,`click`,`keydown.enter`,`keydown.space`],[`aria-hidden`,`true`,1,`legend-dot`],[`role`,`listitem`,3,`animation-delay`],[`role`,`listitem`,3,`contextmenu`],[`draggable`,`false`,1,`tile-link`,3,`click`,`routerLink`],[`appLazyLoad`,``,3,`visible`],[1,`overlay`],[`mat-card-image`,``,`decoding`,`async`,`draggable`,`false`,1,`front-image`,3,`src`,`alt`],[`aria-hidden`,`true`,1,`sold-dot`],[1,`order-number`]],template:function(t,n){t&1&&(ss(0,`div`,0),$w(1,Ge,22,13),$w(2,Ze,3,1,`mat-grid-list`,1)(3,et,1,0,`mat-progress-spinner`,2),ru()),t&2&&(wm(`ngClass`,Xb(3,Oe,!n.viewAsWidget())),nT(),Gw(n.viewAsWidget()?-1:1),nT(),Gw(n.dataReady()?2:3))},dependencies:[rr,ct,Ii,Et,Xo,Y,$,Ae,di,Pe,ke,Ne,_t$2,rt],styles:[`mat-grid-tile[_ngcontent-%COMP%]{cursor:pointer}.tile-link[_ngcontent-%COMP%]{display:block;width:100%;height:100%;color:inherit;text-decoration:none;-webkit-user-drag:none;user-drag:none}.tile-link[_ngcontent-%COMP%]:focus-visible{outline-offset:-3px}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}@keyframes _ngcontent-%COMP%_tile-enter-anim{0%{opacity:0;transform:translateY(.75rem) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.tile-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tile-enter-anim .32s ease-out both}mat-card[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden;--%NS%mdc-elevated-card-container-color: var(--%NS%catalog-frame-bg);background-color:var(--%NS%catalog-frame-bg)}.front-image[_ngcontent-%COMP%]{transform:translate(var(--%NS%parallax-x, 0%),var(--%NS%parallax-y, 0%)) scale(1.1);transition:transform .2s ease-out}.container[_ngcontent-%COMP%]{margin-top:0}.catalogue-controls[_ngcontent-%COMP%]{margin-bottom:2em;display:flex;flex-direction:column;gap:.4rem}.control-row[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:.5rem}.control-label[_ngcontent-%COMP%]{font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;color:var(--%NS%catalog-soft);min-width:5.5rem}mat-chip.is-on[_ngcontent-%COMP%]{--%NS%mdc-chip-outline-color: var(--%NS%catalog-accent);--%NS%mdc-chip-outline-width: 1px;--%NS%mdc-chip-label-text-color: var(--%NS%catalog-accent);--%NS%mdc-chip-with-icon-icon-color: var(--%NS%catalog-accent)}.sold-legend[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin:.2rem 0 0;font-size:.75rem;line-height:1.4;color:var(--%NS%catalog-soft)}.legend-dot[_ngcontent-%COMP%]{height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;flex:none}.sort-desc[_ngcontent-%COMP%]{margin-left:2em;align-items:center;display:flex}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5em;z-index:1;pointer-events:none}.order-number[_ngcontent-%COMP%]{font-weight:700}.sold-dot[_ngcontent-%COMP%]{position:absolute;right:.6rem;bottom:.6rem;height:.5rem;width:.5rem;border-radius:50%;background-color:var(--%NS%catalog-accent);opacity:.65;box-shadow:0 0 0 1px #ffffff73;z-index:2;pointer-events:none}.edited-filter[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-bottom:.75rem;font-size:.75rem}.edited-filter-choice[_ngcontent-%COMP%]{padding:.15rem .6rem;border:1px solid var(--%NS%catalog-faint);border-radius:999px;background:transparent;font:inherit;color:var(--%NS%catalog-soft);cursor:pointer}.edited-filter-choice.is-on[_ngcontent-%COMP%]{border-color:var(--%NS%catalog-accent);color:var(--%NS%catalog-accent)}.edited-filter-count[_ngcontent-%COMP%]{margin-left:.2rem;color:var(--%NS%catalog-faint)}`]})}}return i})();export{zt as t};