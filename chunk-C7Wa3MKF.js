import{n as s,t as r}from"./chunk-Ch7qlBDL.js";import{$r as xm,$t as aD,B as Kw,Bt as Xw,D as HV,Ir as t_,J as Nm,Jr as vu,Kn as jm,L as Jw,Lt as Xr,Mr as sf,Pr as su,T as Gh,Ut as Yw,Vn as iu,Zt as _t,_n as du,_t as S,br as pb,cn as c_,dr as nv,en as aT,in as au,jr as sb,kn as gb,l as Bm,n as $b,ni as yb,nn as af,oi as ze,ot as QC,rn as as,rr as mb,s as BV,ti as y,ut as Qw,v as Eb,yt as Sm,zr as u_}from"./chunk-C5xO2IlF.js";import{n as C}from"./chunk-D3sDk7BX.js";import{v as q}from"./chunk-CjLpSiPt.js";import"./chunk-DWSEDTAi.js";import{D as se$1,b as ie$1,h as Zt$1}from"./chunk-B1MtWy4U.js";import"./chunk-B6SZkjOu.js";import{O as zs,S as rr,l as Xa}from"./chunk-Cm26zM-h.js";import{C as Ai,D as E$1,E as Ri,T as Q,b as bt,c as O,g as y$1,k as $t$1,n as yt,t as wt,w as Mt,x as lt,y as T}from"./main-AANXUAMQ.js";import"./chunk-CL2bGClr.js";import{n as Pe,t as Be}from"./chunk-BgWNBeRb.js";import"./chunk-CXO9E3AK.js";import"./chunk-BQDgnbpK.js";import{a as da,c as ki,f as z,s as fe,t as Ie,u as ve}from"./chunk-EaYpeUnc.js";var R=class{tracker;columnIndex=0;rowIndex=0;get rowCount(){return this.rowIndex+1}get rowspan(){let i=Math.max(...this.tracker);return i>1?this.rowCount+i-1:this.rowCount}positions;update(i,t){this.columnIndex=0,this.rowIndex=0,this.tracker=new Array(i),this.tracker.fill(0,0,this.tracker.length),this.positions=t.map(r=>this._trackTile(r))}_trackTile(i){let t=this._findMatchingGap(i.colspan);return this._markTilePosition(t,i),this.columnIndex=t+i.colspan,new tt(this.rowIndex,t)}_findMatchingGap(i){if(i>this.tracker.length)throw Error(`mat-grid-list: tile with colspan ${i} is wider than grid with cols="${this.tracker.length}".`);let t=-1,r=-1;do{if(this.columnIndex+i>this.tracker.length){this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),r=this._findGapEndIndex(t);continue}if(t=this.tracker.indexOf(0,this.columnIndex),t==-1){this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),r=this._findGapEndIndex(t);continue}r=this._findGapEndIndex(t),this.columnIndex=t+1}while(r-t<i||r==0);return Math.max(t,0)}_nextRow(){this.columnIndex=0,this.rowIndex++;for(let i=0;i<this.tracker.length;i++)this.tracker[i]=Math.max(0,this.tracker[i]-1)}_findGapEndIndex(i){for(let t=i+1;t<this.tracker.length;t++)if(this.tracker[t]!=0)return t;return this.tracker.length}_markTilePosition(i,t){for(let r=0;r<t.colspan;r++)this.tracker[i+r]=t.rowspan}};var tt=class{row;col;constructor(i,t){this.row=i,this.col=t}};var Bt=[`*`];var Rt=`.mat-grid-list {
  display: block;
  position: relative;
}

.mat-grid-tile {
  display: block;
  position: absolute;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-tile-header,
.mat-grid-tile .mat-grid-tile-footer {
  display: flex;
  align-items: center;
  height: 48px;
  color: #fff;
  background: rgba(0, 0, 0, 0.38);
  overflow: hidden;
  padding: 0 16px;
  position: absolute;
  left: 0;
  right: 0;
}
.mat-grid-tile .mat-grid-tile-header > *,
.mat-grid-tile .mat-grid-tile-footer > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-tile-header.mat-2-line,
.mat-grid-tile .mat-grid-tile-footer.mat-2-line {
  height: 68px;
}
.mat-grid-tile .mat-grid-list-text {
  display: flex;
  flex-direction: column;
  flex: auto;
  box-sizing: border-box;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-list-text > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-list-text:empty {
  display: none;
}
.mat-grid-tile .mat-grid-tile-header {
  top: 0;
}
.mat-grid-tile .mat-grid-tile-footer {
  bottom: 0;
}
.mat-grid-tile .mat-grid-avatar {
  padding-right: 16px;
}
[dir=rtl] .mat-grid-tile .mat-grid-avatar {
  padding-right: 0;
  padding-left: 16px;
}
.mat-grid-tile .mat-grid-avatar:empty {
  display: none;
}

.mat-grid-tile-header {
  font-size: var(--%NS%mat-grid-list-tile-header-primary-text-size, var(--%NS%mat-sys-body-large));
}
.mat-grid-tile-header .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-header .mat-line:nth-child(n+2) {
  font-size: var(--%NS%mat-grid-list-tile-header-secondary-text-size, var(--%NS%mat-sys-body-medium));
}

.mat-grid-tile-footer {
  font-size: var(--%NS%mat-grid-list-tile-footer-primary-text-size, var(--%NS%mat-sys-body-large));
}
.mat-grid-tile-footer .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-footer .mat-line:nth-child(n+2) {
  font-size: var(--%NS%mat-grid-list-tile-footer-secondary-text-size, var(--%NS%mat-sys-body-medium));
}

.mat-grid-tile-content {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
}
`;var $t=new S(`MAT_GRID_LIST`);var rt=(()=>{class e{_element=y(Xr);_gridList=y($t,{optional:!0});_rowspan=1;_colspan=1;get rowspan(){return this._rowspan}set rowspan(t){this._rowspan=Math.round(se$1(t))}get colspan(){return this._colspan}set colspan(t){this._colspan=Math.round(se$1(t))}_setStyle(t,r){this._element.nativeElement.style[t]=r}static ɵfac=function(r){return new(r||e)};static ɵcmp=QC({type:e,selectors:[[`mat-grid-tile`]],hostAttrs:[1,`mat-grid-tile`],hostVars:2,hostBindings:function(r,n){r&2&&Sm(`rowspan`,n.rowspan)(`colspan`,n.colspan)},inputs:{rowspan:`rowspan`,colspan:`colspan`},exportAs:[`matGridTile`],ngContentSelectors:Bt,decls:2,vars:0,consts:[[1,`mat-grid-tile-content`]],template:function(r,n){r&1&&(gb(),su(0,`div`,0),mb(1),au())},styles:[`.mat-grid-list {
  display: block;
  position: relative;
}

.mat-grid-tile {
  display: block;
  position: absolute;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-tile-header,
.mat-grid-tile .mat-grid-tile-footer {
  display: flex;
  align-items: center;
  height: 48px;
  color: #fff;
  background: rgba(0, 0, 0, 0.38);
  overflow: hidden;
  padding: 0 16px;
  position: absolute;
  left: 0;
  right: 0;
}
.mat-grid-tile .mat-grid-tile-header > *,
.mat-grid-tile .mat-grid-tile-footer > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-tile-header.mat-2-line,
.mat-grid-tile .mat-grid-tile-footer.mat-2-line {
  height: 68px;
}
.mat-grid-tile .mat-grid-list-text {
  display: flex;
  flex-direction: column;
  flex: auto;
  box-sizing: border-box;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-list-text > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-list-text:empty {
  display: none;
}
.mat-grid-tile .mat-grid-tile-header {
  top: 0;
}
.mat-grid-tile .mat-grid-tile-footer {
  bottom: 0;
}
.mat-grid-tile .mat-grid-avatar {
  padding-right: 16px;
}
[dir=rtl] .mat-grid-tile .mat-grid-avatar {
  padding-right: 0;
  padding-left: 16px;
}
.mat-grid-tile .mat-grid-avatar:empty {
  display: none;
}

.mat-grid-tile-header {
  font-size: var(--%NS%mat-grid-list-tile-header-primary-text-size, var(--%NS%mat-sys-body-large));
}
.mat-grid-tile-header .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-header .mat-line:nth-child(n+2) {
  font-size: var(--%NS%mat-grid-list-tile-header-secondary-text-size, var(--%NS%mat-sys-body-medium));
}

.mat-grid-tile-footer {
  font-size: var(--%NS%mat-grid-list-tile-footer-primary-text-size, var(--%NS%mat-sys-body-large));
}
.mat-grid-tile-footer .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-footer .mat-line:nth-child(n+2) {
  font-size: var(--%NS%mat-grid-list-tile-footer-secondary-text-size, var(--%NS%mat-sys-body-medium));
}

.mat-grid-tile-content {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
}
`],encapsulation:2})}return e})();var Lt=/^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;var B=class{_gutterSize;_rows=0;_rowspan=0;_cols;_direction;init(i,t,r,n){this._gutterSize=Nt(i),this._rows=t.rowCount,this._rowspan=t.rowspan,this._cols=r,this._direction=n}getBaseTileSize(i,t){return`(${i}% - (${this._gutterSize} * ${t}))`}getTilePosition(i,t){return t===0?`0`:E(`(${i} + ${this._gutterSize}) * ${t}`)}getTileSize(i,t){return`(${i} * ${t}) + (${t-1} * ${this._gutterSize})`}setStyle(i,t,r){let n=100/this._cols,s=(this._cols-1)/this._cols;this.setColStyles(i,r,n,s),this.setRowStyles(i,t,n,s)}setColStyles(i,t,r,n){let s=this.getBaseTileSize(r,n),p=this._direction===`rtl`?`right`:`left`;i._setStyle(p,this.getTilePosition(s,t)),i._setStyle(`width`,E(this.getTileSize(s,i.colspan)))}getGutterSpan(){return`${this._gutterSize} * (${this._rowspan} - 1)`}getTileSpan(i){return`${this._rowspan} * ${this.getTileSize(i,1)}`}getComputedHeight(){return null}};var et=class extends B{fixedRowHeight;constructor(i){super(),this.fixedRowHeight=i}init(i,t,r,n){super.init(i,t,r,n),this.fixedRowHeight=Nt(this.fixedRowHeight),Lt.test(this.fixedRowHeight)}setRowStyles(i,t){i._setStyle(`top`,this.getTilePosition(this.fixedRowHeight,t)),i._setStyle(`height`,E(this.getTileSize(this.fixedRowHeight,i.rowspan)))}getComputedHeight(){return[`height`,E(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)]}reset(i){i._setListStyle([`height`,null]),i._tiles&&i._tiles.forEach(t=>{t._setStyle(`top`,null),t._setStyle(`height`,null)})}};var it=class extends B{rowHeightRatio;baseTileHeight;constructor(i){super(),this._parseRatio(i)}setRowStyles(i,t,r,n){let s=r/this.rowHeightRatio;this.baseTileHeight=this.getBaseTileSize(s,n),i._setStyle(`marginTop`,this.getTilePosition(this.baseTileHeight,t)),i._setStyle(`paddingTop`,E(this.getTileSize(this.baseTileHeight,i.rowspan)))}getComputedHeight(){return[`paddingBottom`,E(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)]}reset(i){i._setListStyle([`paddingBottom`,null]),i._tiles.forEach(t=>{t._setStyle(`marginTop`,null),t._setStyle(`paddingTop`,null)})}_parseRatio(i){let t=i.split(`:`);t.length,this.rowHeightRatio=parseFloat(t[0])/parseFloat(t[1])}};var nt=class extends B{setRowStyles(i,t){let r=100/this._rowspan,n=(this._rows-1)/this._rows,s=this.getBaseTileSize(r,n);i._setStyle(`top`,this.getTilePosition(s,t)),i._setStyle(`height`,E(this.getTileSize(s,i.rowspan)))}reset(i){i._tiles&&i._tiles.forEach(t=>{t._setStyle(`top`,null),t._setStyle(`height`,null)})}};function E(e){return`calc(${e})`}function Nt(e){return e.match(/([A-Za-z%]+)$/)?e:`${e}px`}var At=`fit`;var Ot=(()=>{class e{_element=y(Xr);_dir=y(C,{optional:!0});_cols;_tileCoordinator;_rowHeight;_gutter=`1px`;_tileStyler;_tiles;get cols(){return this._cols}set cols(t){this._cols=Math.max(1,Math.round(se$1(t)))}get gutterSize(){return this._gutter}set gutterSize(t){this._gutter=`${t??``}`}get rowHeight(){return this._rowHeight}set rowHeight(t){let r=`${t??``}`;r!==this._rowHeight&&(this._rowHeight=r,this._setTileStyler(this._rowHeight))}ngOnInit(){this._checkCols(),this._checkRowHeight()}ngAfterContentChecked(){this._layoutTiles()}_checkCols(){this.cols}_checkRowHeight(){this._rowHeight||this._setTileStyler(`1:1`)}_setTileStyler(t){this._tileStyler&&this._tileStyler.reset(this),t===At?this._tileStyler=new nt:t&&t.indexOf(`:`)>-1?this._tileStyler=new it(t):this._tileStyler=new et(t)}_layoutTiles(){this._tileCoordinator||(this._tileCoordinator=new R);let t=this._tileCoordinator,r=this._tiles.filter(s=>!s._gridList||s._gridList===this),n=this._dir?this._dir.value:`ltr`;this._tileCoordinator.update(this.cols,r),this._tileStyler.init(this.gutterSize,t,this.cols,n),r.forEach((s,p)=>{let H=t.positions[p];this._tileStyler.setStyle(s,H.row,H.col)}),this._setListStyle(this._tileStyler.getComputedHeight())}_setListStyle(t){t&&(this._element.nativeElement.style[t[0]]=t[1])}static ɵfac=function(r){return new(r||e)};static ɵcmp=QC({type:e,selectors:[[`mat-grid-list`]],contentQueries:function(r,n,s){if(r&1&&Bm(s,rt,5),r&2){let p;yb(p=Eb())&&(n._tiles=p)}},hostAttrs:[1,`mat-grid-list`],hostVars:1,hostBindings:function(r,n){r&2&&Sm(`cols`,n.cols)},inputs:{cols:`cols`,gutterSize:`gutterSize`,rowHeight:`rowHeight`},exportAs:[`matGridList`],features:[t_([{provide:$t,useExisting:e}])],ngContentSelectors:Bt,decls:2,vars:0,template:function(r,n){r&1&&(gb(),su(0,`div`),mb(1),au())},styles:[Rt],encapsulation:2})}return e})();function Vt(e,i){if(e&1&&(as(0,`mat-option`,3),$b(1),c_(2,`translate`),iu()),e&2){let t=i.$implicit,r=pb();Nm(`value`,t),aT(),nv(u_(2,2,r.headings[t]))}}function jt(e,i){if(e&1&&(as(0,`mat-option`,3),$b(1),c_(2,`translate`),iu()),e&2){let t=i.$implicit;Nm(`value`,t),aT(),nv(u_(2,2,`cv.countries.`+t))}}function Yt(e,i){if(e&1){let t=sb();as(0,`button`,17),jm(`click`,function(){sf(t);return af(pb().remove())}),$b(1),c_(2,`translate`),iu()}if(e&2)Nm(`disabled`,pb().saving()),aT(),du(` `,u_(2,2,`cv.delete`),` `)}function Qt(e,i){if(e&1&&(as(0,`p`,16),$b(1),c_(2,`translate`),iu()),e&2){let t=pb();aT(),nv(u_(2,1,t.failed()))}}var Gt=(()=>{class e{constructor(){this.cv=y(ve),this.kind=BV.required(),this.entry=BV(null),this.done=HV(),this.kinds=Object.keys(Ie),this.headings=Ie,this.countries=ki,this.draft=vu(()=>Wt(this.entry(),this.kind())),this.saving=ze(!1),this.failed=ze(``),this.correcting=_t(()=>this.entry()!==null),this.ready=_t(()=>{let t=this.draft();return!!t.year&&!!t.titleEn.trim()&&!!t.country})}set(t,r$1){this.draft.update(n=>s(r({},n),{[t]:r$1}))}async save(){if(!(!this.ready()||this.saving())){this.saving.set(!0),this.failed.set(``);try{let t=qt(this.draft()),r=this.entry();r?await this.cv.update(r.id,t):await this.cv.create(t),this.done.emit()}catch(t){this.failed.set(Pt(t,`cv.saveFailed`))}finally{this.saving.set(!1)}}}async remove(){let t=this.entry();if(!(!t||this.saving())){this.saving.set(!0),this.failed.set(``);try{await this.cv.remove(t.id),this.done.emit()}catch(r){this.failed.set(Pt(r,`cv.deleteFailed`))}finally{this.saving.set(!1)}}}static{this.ɵfac=function(r){return new(r||e)}}static{this.ɵcmp=QC({type:e,selectors:[[`app-cv-entry-form`]],inputs:{kind:[1,`kind`],entry:[1,`entry`]},outputs:{done:`done`},decls:64,vars:60,consts:[[1,`cv-form`],[`appearance`,`outline`,1,`cv-kind`],[3,`valueChange`,`value`,`disabled`],[3,`value`],[`appearance`,`outline`,1,`cv-year`],[`matInput`,``,`type`,`number`,3,`input`,`value`,`disabled`],[`appearance`,`outline`,1,`cv-country`],[`appearance`,`outline`,1,`cv-title`],[`matInput`,``,3,`input`,`value`,`disabled`],[`appearance`,`outline`],[`appearance`,`outline`,1,`cv-url`],[`matInput`,``,`type`,`url`,3,`input`,`value`,`disabled`],[1,`cv-actions`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`disabled`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`],[`mat-button`,``,`type`,`button`,1,`cv-delete`,3,`disabled`],[`role`,`alert`,1,`cv-failed`],[`mat-button`,``,`type`,`button`,1,`cv-delete`,3,`click`,`disabled`]],template:function(r,n){r&1&&(as(0,`div`,0)(1,`mat-form-field`,1)(2,`mat-label`),$b(3),c_(4,`translate`),iu(),as(5,`mat-select`,2),jm(`valueChange`,function(p){return n.set(`kind`,p)}),Jw(6,Vt,3,4,`mat-option`,3,Kw),iu()(),as(8,`mat-form-field`,4)(9,`mat-label`),$b(10),c_(11,`translate`),iu(),as(12,`input`,5),jm(`input`,function(p){return n.set(`year`,p.target.valueAsNumber)}),iu()(),as(13,`mat-form-field`,6)(14,`mat-label`),$b(15),c_(16,`translate`),iu(),as(17,`mat-select`,2),jm(`valueChange`,function(p){return n.set(`country`,p)}),Jw(18,jt,3,4,`mat-option`,3,Kw),iu()(),as(20,`mat-form-field`,7)(21,`mat-label`),$b(22),c_(23,`translate`),iu(),as(24,`input`,8),jm(`input`,function(p){return n.set(`titleEn`,p.target.value)}),iu()(),as(25,`mat-form-field`,7)(26,`mat-label`),$b(27),c_(28,`translate`),iu(),as(29,`input`,8),jm(`input`,function(p){return n.set(`titleEs`,p.target.value)}),iu()(),as(30,`mat-form-field`,9)(31,`mat-label`),$b(32),c_(33,`translate`),iu(),as(34,`input`,8),jm(`input`,function(p){return n.set(`venueEn`,p.target.value)}),iu()(),as(35,`mat-form-field`,9)(36,`mat-label`),$b(37),c_(38,`translate`),iu(),as(39,`input`,8),jm(`input`,function(p){return n.set(`venueEs`,p.target.value)}),iu()(),as(40,`mat-form-field`,9)(41,`mat-label`),$b(42),c_(43,`translate`),iu(),as(44,`input`,8),jm(`input`,function(p){return n.set(`city`,p.target.value)}),iu()(),as(45,`mat-form-field`,10)(46,`mat-label`),$b(47),c_(48,`translate`),iu(),as(49,`input`,11),jm(`input`,function(p){return n.set(`titleUrl`,p.target.value)}),iu()(),as(50,`mat-form-field`,10)(51,`mat-label`),$b(52),c_(53,`translate`),iu(),as(54,`input`,11),jm(`input`,function(p){return n.set(`venueUrl`,p.target.value)}),iu()(),as(55,`div`,12)(56,`button`,13),jm(`click`,function(){return n.save()}),$b(57),c_(58,`translate`),iu(),as(59,`button`,14),jm(`click`,function(){return n.done.emit()}),$b(60),c_(61,`translate`),iu(),Qw(62,Yt,3,4,`button`,15),iu(),Qw(63,Qt,3,3,`p`,16),iu()),r&2&&(aT(3),nv(u_(4,36,`cv.kind`)),aT(2),Nm(`value`,n.draft().kind)(`disabled`,n.saving()),aT(),Xw(n.kinds),aT(4),nv(u_(11,38,`cv.year`)),aT(2),Nm(`value`,n.draft().year)(`disabled`,n.saving()),aT(3),nv(u_(16,40,`cv.country`)),aT(2),Nm(`value`,n.draft().country)(`disabled`,n.saving()),aT(),Xw(n.countries),aT(4),nv(u_(23,42,`cv.titleEn`)),aT(2),Nm(`value`,n.draft().titleEn)(`disabled`,n.saving()),aT(3),nv(u_(28,44,`cv.titleEs`)),aT(2),Nm(`value`,n.draft().titleEs)(`disabled`,n.saving()),aT(3),nv(u_(33,46,`cv.venueEn`)),aT(2),Nm(`value`,n.draft().venueEn)(`disabled`,n.saving()),aT(3),nv(u_(38,48,`cv.venueEs`)),aT(2),Nm(`value`,n.draft().venueEs)(`disabled`,n.saving()),aT(3),nv(u_(43,50,`cv.city`)),aT(2),Nm(`value`,n.draft().city)(`disabled`,n.saving()),aT(3),nv(u_(48,52,`cv.titleUrl`)),aT(2),Nm(`value`,n.draft().titleUrl)(`disabled`,n.saving()),aT(3),nv(u_(53,54,`cv.venueUrl`)),aT(2),Nm(`value`,n.draft().venueUrl)(`disabled`,n.saving()),aT(2),Nm(`disabled`,!n.ready()||n.saving()),aT(),du(` `,u_(58,56,`cv.save`),` `),aT(2),Nm(`disabled`,n.saving()),aT(),du(` `,u_(61,58,`cancel`),` `),aT(2),Yw(n.correcting()?62:-1),aT(),Yw(n.failed()?63:-1))},dependencies:[zs,bt,lt,E$1,Xa,rr,yt,Be,Pe,Ri,Ai,Q,$t$1],styles:[`.cv-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.75rem;margin:1rem 0 2rem}.cv-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 11rem;min-width:0}.cv-kind[_ngcontent-%COMP%]{flex:1 1 13rem!important}.cv-year[_ngcontent-%COMP%]{flex:0 1 7rem!important}.cv-country[_ngcontent-%COMP%]{flex:0 1 9rem!important}.cv-title[_ngcontent-%COMP%]{flex:1 1 16rem!important}.cv-url[_ngcontent-%COMP%]{flex:1 1 100%!important}.cv-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;flex:1 1 100%}.cv-delete[_ngcontent-%COMP%]{margin-left:auto;color:var(--%NS%mat-sys-error, #b3261e)}.cv-failed[_ngcontent-%COMP%]{flex:1 1 100%;margin:0;color:var(--%NS%mat-sys-error, #b3261e);font-size:.85rem}`]})}}return e})();function Wt(e,i){return{kind:e?.kind??i,year:e?.year??new Date().getFullYear(),titleEn:e?.title.en??``,titleEs:e?.title.es??``,venueEn:e?.venue?.en??``,venueEs:e?.venue?.es??``,city:e?.city??``,country:e?.country??`spain`,titleUrl:e?.titleUrl??``,venueUrl:e?.venueUrl??``}}function qt(e){let i=e.titleEn.trim(),t=e.titleEs.trim(),r$2=e.venueEn.trim(),n=e.venueEs.trim(),s$1=e.city.trim(),p=e.titleUrl.trim(),H=e.venueUrl.trim();return r(r(s(r(r({kind:e.kind,year:Number(e.year),title:r({en:i},t&&t!==i?{es:t}:{})},r$2?{venue:r({en:r$2},n&&n!==r$2?{es:n}:{})}:{}),s$1?{city:s$1}:{}),{country:e.country}),p?{titleUrl:p}:{}),H?{venueUrl:H}:{})}function Pt(e,i){let r=(e instanceof q?e.error:null)?.message;return typeof r==`string`&&e instanceof q&&e.status<500?r:i}var Kt=(e,i)=>i.title;var Zt=(e,i)=>i.id;function Jt(e,i){if(e&1){let t=sb();as(0,`button`,13),c_(1,`translate`),jm(`click`,function(){sf(t);let n=pb().$implicit;return af(pb().add(n.kind))}),as(2,`mat-icon`),$b(3,`add`),iu()()}e&2&&Sm(`aria-label`,u_(1,1,`cv.add`))}function Xt(e,i){if(e&1&&(as(0,`mat-grid-tile`,14)(1,`h4`,16),$b(2),iu()()),e&2){let t=pb().$implicit,r=pb().$implicit,n=pb();Nm(`colspan`,n.yearColSpan)(`rowspan`,n.numberOfItemsInYear(r.items,t)),aT(2),nv(t.year)}}function te(e,i){if(e&1&&(as(0,`i`)(1,`a`,17),$b(2),iu()(),$b(3,`, `)),e&2){let t=pb().$implicit;aT(),Nm(`href`,t.titleUrl,Gh),aT(),nv(t.title)}}function ee(e,i){if(e&1&&(as(0,`i`),$b(1),iu(),$b(2,`, `)),e&2){let t=pb().$implicit;aT(),nv(t.title)}}function ie(e,i){if(e&1&&(as(0,`span`)(1,`a`,17),$b(2),iu(),$b(3,`, `),iu()),e&2){let t=pb(2).$implicit;aT(),Nm(`href`,t.venueUrl,Gh),aT(),nv(t.venue)}}function ne(e,i){if(e&1&&(as(0,`span`),$b(1),iu()),e&2){let t=pb(2).$implicit;aT(),du(``,t.venue,`, `)}}function re(e,i){if(e&1&&Qw(0,ie,4,2,`span`)(1,ne,2,1,`span`),e&2){let t=pb().$implicit;Yw(t.venueUrl?0:1)}}function ae(e,i){if(e&1&&(as(0,`span`),$b(1),iu()),e&2){let t=pb().$implicit;aT(),du(` `,t.city,`, `)}}function oe(e,i){if(e&1){let t=sb();as(0,`button`,13),c_(1,`translate`),jm(`click`,function(){sf(t);let n=pb().$implicit;return af(pb(2).correct(n.id))}),as(2,`mat-icon`),$b(3,`edit`),iu()()}e&2&&Sm(`aria-label`,u_(1,1,`cv.edit`))}function le(e,i){if(e&1&&(as(0,`div`),Qw(1,Xt,3,3,`mat-grid-tile`,14),as(2,`mat-grid-tile`,9)(3,`p`,15),Qw(4,te,4,2)(5,ee,3,1),as(6,`small`),Qw(7,re,2,1),Qw(8,ae,2,1,`span`),as(9,`span`),$b(10),c_(11,`translate`),iu()(),Qw(12,oe,4,3,`button`,10),iu()()()),e&2){let t=i.$implicit,r=pb().$implicit,n=pb();aT(),Yw(n.displayYearLabel(r.items,t)?1:-1),aT(),Nm(`colspan`,n.descColSpan),aT(),Nm(`id`,t.anchor),aT(),Yw(t.titleUrl?4:5),aT(3),Yw(t.venue?7:-1),aT(),Yw(t.city?8:-1),aT(2),du(`(`,u_(11,8,t.countryKey),`)`),aT(2),Yw(n.mine()?12:-1)}}function se(e,i){if(e&1){let t=sb();as(0,`app-cv-entry-form`,18),jm(`done`,function(){sf(t);return af(pb(2).closeForm())}),iu()}if(e&2){let t=pb().$implicit,r=pb();Nm(`kind`,r.formKind(t.kind))(`entry`,r.correcting())}}function de(e,i){if(e&1&&(xm(0,`mat-divider`,7),as(1,`mat-grid-list`,8),xm(2,`mat-grid-tile`,3),as(3,`mat-grid-tile`,9)(4,`h3`,4),$b(5),c_(6,`translate`),iu(),Qw(7,Jt,4,3,`button`,10),iu()(),as(8,`mat-grid-list`,11),Jw(9,le,13,10,`div`,null,Zt),iu(),Qw(11,se,1,2,`app-cv-entry-form`,12)),e&2){let t=i.$implicit,r=pb();aT(),Nm(`cols`,r.totalCols),aT(),Nm(`colspan`,r.yearColSpan),aT(),Nm(`colspan`,r.descColSpan),aT(2),nv(u_(6,7,t.title)),aT(2),Yw(r.mine()?7:-1),aT(),Nm(`cols`,r.totalCols),aT(),Xw(t.items),aT(2),Yw(r.mine()&&r.formOpenIn(t.kind)?11:-1)}}var ai=(()=>{class e{constructor(){this.breakpointObserver=y(ie$1),this.cv=y(ve),this.auth=y(O),this.language=y(y$1),this.totalCols=14,this.smallScreenYearColSpan=2,this.bigScreenYearColSpan=1,this.downloadType=z.CV,this.sections=_t(()=>fe(this.cv.entries(),this.language.contentLanguage())),this.mine=_t(()=>this.auth.isAdmin()),this.adding=ze(null),this.editing=ze(null),this.correcting=_t(()=>this.cv.entries().find(t=>t.id===this.editing())??null),this.yearColSpan=this.bigScreenYearColSpan,this.descColSpan=this.totalCols-this.yearColSpan,this.isSmallScreen=!1,this.listenToScreenSize(),this.cv.refresh()}formOpenIn(t){return this.adding()===t||this.correcting()?.kind===t}formKind(t){return this.correcting()?.kind??t}add(t){this.editing.set(null),this.adding.set(t)}correct(t){this.adding.set(null),this.editing.set(t)}closeForm(){this.adding.set(null),this.editing.set(null)}numberOfItemsInYear(t,r){return t.filter(n=>n.year===r.year).length}displayYearLabel(t,r){return t.find(n=>n.year===r.year)?.id===r.id}listenToScreenSize(){this.breakpointObserver.observe([Zt$1.HandsetLandscape,Zt$1.HandsetPortrait]).subscribe(t=>{t.breakpoints[`(max-width: 599.98px) and (orientation: portrait)`]?this.isSmallScreen=!0:this.isSmallScreen=!1,this.yearColSpan=this.isSmallScreen?this.smallScreenYearColSpan:this.bigScreenYearColSpan,this.descColSpan=this.totalCols-this.yearColSpan})}static{this.ɵfac=function(r){return new(r||e)}}static{this.ɵcmp=QC({type:e,selectors:[[`app-cv`]],decls:15,vars:12,consts:[[1,`container`,`margin-top`],[`rowHeight`,`2.8rem`,3,`cols`],[`rowspan`,`3`,3,`colspan`],[3,`colspan`],[1,`catalog-heading`],[3,`downloadFileType`],[3,`innerHtml`],[1,`breathe-space`],[`rowHeight`,`5rem`,`role`,`list`,3,`cols`],[`role`,`listitem`,3,`colspan`],[`mat-icon-button`,``,`type`,`button`,1,`cv-admin-button`],[`rowHeight`,`2.7rem`,`role`,`list`,3,`cols`],[3,`kind`,`entry`],[`mat-icon-button`,``,`type`,`button`,1,`cv-admin-button`,3,`click`],[3,`colspan`,`rowspan`],[3,`id`],[1,`catalog-caption`],[`target`,`_blank`,`rel`,`noopener noreferrer`,3,`href`],[3,`done`,`kind`,`entry`]],template:function(r,n){r&1&&(as(0,`div`,0)(1,`mat-grid-list`,1),xm(2,`mat-grid-tile`,2),as(3,`mat-grid-tile`,3)(4,`h2`,4),$b(5,` CV `),xm(6,`app-pdf-button`,5),iu()(),as(7,`mat-grid-tile`,3),xm(8,`p`,6),c_(9,`translate`),iu(),as(10,`mat-grid-tile`,3),xm(11,`p`,6),c_(12,`translate`),iu()(),Jw(13,de,12,9,null,null,Kt),iu()),r&2&&(aT(),Nm(`cols`,n.totalCols),aT(),Nm(`colspan`,n.yearColSpan),aT(),Nm(`colspan`,n.descColSpan),aT(3),Nm(`downloadFileType`,n.downloadType),aT(),Nm(`colspan`,n.descColSpan),aT(),Nm(`innerHtml`,u_(9,8,`cv.shortBio`),aD),aT(2),Nm(`colspan`,n.descColSpan),aT(),Nm(`innerHtml`,u_(12,10,`contact.representedBy`),aD),aT(2),Xw(n.sections()))},dependencies:[bt,T,Ot,rt,yt,wt,da,Gt,Mt,$t$1],styles:[`@charset "UTF-8";.breathe-space[_ngcontent-%COMP%]{margin-top:2em;margin-bottom:2em}h2.catalog-heading[_ngcontent-%COMP%]{margin:0;display:flex;align-items:center;gap:.5rem}.cv-admin-button[_ngcontent-%COMP%]{flex:0 0 auto;margin-left:.25rem;width:1.75rem!important;height:1.75rem!important;padding:0!important;line-height:1.75rem!important}.cv-admin-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.1rem;width:1.1rem;height:1.1rem;line-height:1.1rem}`]})}}return e})();export{ai as CvComponent};