import{n as s,t as r}from"./chunk-Ch7qlBDL.js";import{$t as au,A as Fm,An as h_,Ct as VV,Gr as vu,H as Kw,Hr as vb,I as Ib,In as i_,Ir as tv,J as Mm,Jt as _t,Lt as Xw,Nr as tb,Or as sf,P as Hm,Sr as qb,Un as jV,Wt as Zw,Z as Nm,Zt as af,an as cs,dt as S,ei as y,er as lD,fn as eb,ft as Sm,g as Db,gn as f_,in as cb,kr as su,ln as du,mn as eo,ni as yb,r as $h,tr as lT,ui as ze,wn as gb,zn as iu,zt as ZC}from"./chunk-C7UY2Bi7.js";import{v as q}from"./chunk-DjDfg46u.js";import"./chunk-CfknJ_U-.js";import"./chunk-DfH0utfV.js";import{n as C}from"./chunk-DHInQJec.js";import{A as Vn,V as x,_ as wn,at as ie$1,bt as $t$1,et as Zt$1,f as En,i as O,pt as te$1,u as y$1,v as wt}from"./main-G2BPLPUZ.js";import{m as jn,p as ft,r as La,v as st,y as za}from"./chunk-DsR8Bs5g.js";import"./chunk-hbSrjW_f.js";import{n as j,r as vi,t as Si}from"./chunk-DvSRDHQm.js";import"./chunk-B8VqljpV.js";import"./chunk-93P7l3rj.js";import{n as yt,t as wt$1}from"./chunk-Dpy_xN3j.js";import"./chunk-BX1mzfrR.js";import{i as Li,n as Ee,o as Pe,p as za$1,r as Ge,s as R$1}from"./chunk-Ce9gQRYN.js";var R=class{tracker;columnIndex=0;rowIndex=0;get rowCount(){return this.rowIndex+1}get rowspan(){let i=Math.max(...this.tracker);return i>1?this.rowCount+i-1:this.rowCount}positions;update(i,t){this.columnIndex=0,this.rowIndex=0,this.tracker=new Array(i),this.tracker.fill(0,0,this.tracker.length),this.positions=t.map(r=>this._trackTile(r))}_trackTile(i){let t=this._findMatchingGap(i.colspan);return this._markTilePosition(t,i),this.columnIndex=t+i.colspan,new tt(this.rowIndex,t)}_findMatchingGap(i){if(i>this.tracker.length)throw Error(`mat-grid-list: tile with colspan ${i} is wider than grid with cols="${this.tracker.length}".`);let t=-1,r=-1;do{if(this.columnIndex+i>this.tracker.length){this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),r=this._findGapEndIndex(t);continue}if(t=this.tracker.indexOf(0,this.columnIndex),t==-1){this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),r=this._findGapEndIndex(t);continue}r=this._findGapEndIndex(t),this.columnIndex=t+1}while(r-t<i||r==0);return Math.max(t,0)}_nextRow(){this.columnIndex=0,this.rowIndex++;for(let i=0;i<this.tracker.length;i++)this.tracker[i]=Math.max(0,this.tracker[i]-1)}_findGapEndIndex(i){for(let t=i+1;t<this.tracker.length;t++)if(this.tracker[t]!=0)return t;return this.tracker.length}_markTilePosition(i,t){for(let r=0;r<t.colspan;r++)this.tracker[i+r]=t.rowspan}};var tt=class{row;col;constructor(i,t){this.row=i,this.col=t}};var Bt=[`*`];var Rt=`.mat-grid-list {
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
`;var $t=new S(`MAT_GRID_LIST`);var rt=(()=>{class e{_element=y(eo);_gridList=y($t,{optional:!0});_rowspan=1;_colspan=1;get rowspan(){return this._rowspan}set rowspan(t){this._rowspan=Math.round(ie$1(t))}get colspan(){return this._colspan}set colspan(t){this._colspan=Math.round(ie$1(t))}_setStyle(t,r){this._element.nativeElement.style[t]=r}static ɵfac=function(r){return new(r||e)};static ɵcmp=ZC({type:e,selectors:[[`mat-grid-tile`]],hostAttrs:[1,`mat-grid-tile`],hostVars:2,hostBindings:function(r,n){r&2&&Mm(`rowspan`,n.rowspan)(`colspan`,n.colspan)},inputs:{rowspan:`rowspan`,colspan:`colspan`},exportAs:[`matGridTile`],ngContentSelectors:Bt,decls:2,vars:0,consts:[[1,`mat-grid-tile-content`]],template:function(r,n){r&1&&(vb(),su(0,`div`,0),yb(1),au())},styles:[`.mat-grid-list {
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
`],encapsulation:2})}return e})();var Lt=/^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;var B=class{_gutterSize;_rows=0;_rowspan=0;_cols;_direction;init(i,t,r,n){this._gutterSize=Nt(i),this._rows=t.rowCount,this._rowspan=t.rowspan,this._cols=r,this._direction=n}getBaseTileSize(i,t){return`(${i}% - (${this._gutterSize} * ${t}))`}getTilePosition(i,t){return t===0?`0`:E(`(${i} + ${this._gutterSize}) * ${t}`)}getTileSize(i,t){return`(${i} * ${t}) + (${t-1} * ${this._gutterSize})`}setStyle(i,t,r){let n=100/this._cols,s=(this._cols-1)/this._cols;this.setColStyles(i,r,n,s),this.setRowStyles(i,t,n,s)}setColStyles(i,t,r,n){let s=this.getBaseTileSize(r,n),p=this._direction===`rtl`?`right`:`left`;i._setStyle(p,this.getTilePosition(s,t)),i._setStyle(`width`,E(this.getTileSize(s,i.colspan)))}getGutterSpan(){return`${this._gutterSize} * (${this._rowspan} - 1)`}getTileSpan(i){return`${this._rowspan} * ${this.getTileSize(i,1)}`}getComputedHeight(){return null}};var et=class extends B{fixedRowHeight;constructor(i){super(),this.fixedRowHeight=i}init(i,t,r,n){super.init(i,t,r,n),this.fixedRowHeight=Nt(this.fixedRowHeight),Lt.test(this.fixedRowHeight)}setRowStyles(i,t){i._setStyle(`top`,this.getTilePosition(this.fixedRowHeight,t)),i._setStyle(`height`,E(this.getTileSize(this.fixedRowHeight,i.rowspan)))}getComputedHeight(){return[`height`,E(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)]}reset(i){i._setListStyle([`height`,null]),i._tiles&&i._tiles.forEach(t=>{t._setStyle(`top`,null),t._setStyle(`height`,null)})}};var it=class extends B{rowHeightRatio;baseTileHeight;constructor(i){super(),this._parseRatio(i)}setRowStyles(i,t,r,n){let s=r/this.rowHeightRatio;this.baseTileHeight=this.getBaseTileSize(s,n),i._setStyle(`marginTop`,this.getTilePosition(this.baseTileHeight,t)),i._setStyle(`paddingTop`,E(this.getTileSize(this.baseTileHeight,i.rowspan)))}getComputedHeight(){return[`paddingBottom`,E(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)]}reset(i){i._setListStyle([`paddingBottom`,null]),i._tiles.forEach(t=>{t._setStyle(`marginTop`,null),t._setStyle(`paddingTop`,null)})}_parseRatio(i){let t=i.split(`:`);t.length,this.rowHeightRatio=parseFloat(t[0])/parseFloat(t[1])}};var nt=class extends B{setRowStyles(i,t){let r=100/this._rowspan,n=(this._rows-1)/this._rows,s=this.getBaseTileSize(r,n);i._setStyle(`top`,this.getTilePosition(s,t)),i._setStyle(`height`,E(this.getTileSize(s,i.rowspan)))}reset(i){i._tiles&&i._tiles.forEach(t=>{t._setStyle(`top`,null),t._setStyle(`height`,null)})}};function E(e){return`calc(${e})`}function Nt(e){return e.match(/([A-Za-z%]+)$/)?e:`${e}px`}var At=`fit`;var Ot=(()=>{class e{_element=y(eo);_dir=y(C,{optional:!0});_cols;_tileCoordinator;_rowHeight;_gutter=`1px`;_tileStyler;_tiles;get cols(){return this._cols}set cols(t){this._cols=Math.max(1,Math.round(ie$1(t)))}get gutterSize(){return this._gutter}set gutterSize(t){this._gutter=`${t??``}`}get rowHeight(){return this._rowHeight}set rowHeight(t){let r=`${t??``}`;r!==this._rowHeight&&(this._rowHeight=r,this._setTileStyler(this._rowHeight))}ngOnInit(){this._checkCols(),this._checkRowHeight()}ngAfterContentChecked(){this._layoutTiles()}_checkCols(){this.cols}_checkRowHeight(){this._rowHeight||this._setTileStyler(`1:1`)}_setTileStyler(t){this._tileStyler&&this._tileStyler.reset(this),t===At?this._tileStyler=new nt:t&&t.indexOf(`:`)>-1?this._tileStyler=new it(t):this._tileStyler=new et(t)}_layoutTiles(){this._tileCoordinator||(this._tileCoordinator=new R);let t=this._tileCoordinator,r=this._tiles.filter(s=>!s._gridList||s._gridList===this),n=this._dir?this._dir.value:`ltr`;this._tileCoordinator.update(this.cols,r),this._tileStyler.init(this.gutterSize,t,this.cols,n),r.forEach((s,p)=>{let H=t.positions[p];this._tileStyler.setStyle(s,H.row,H.col)}),this._setListStyle(this._tileStyler.getComputedHeight())}_setListStyle(t){t&&(this._element.nativeElement.style[t[0]]=t[1])}static ɵfac=function(r){return new(r||e)};static ɵcmp=ZC({type:e,selectors:[[`mat-grid-list`]],contentQueries:function(r,n,s){if(r&1&&Hm(s,rt,5),r&2){let p;Ib(p=Db())&&(n._tiles=p)}},hostAttrs:[1,`mat-grid-list`],hostVars:1,hostBindings:function(r,n){r&2&&Mm(`cols`,n.cols)},inputs:{cols:`cols`,gutterSize:`gutterSize`,rowHeight:`rowHeight`},exportAs:[`matGridList`],features:[i_([{provide:$t,useExisting:e}])],ngContentSelectors:Bt,decls:2,vars:0,template:function(r,n){r&1&&(vb(),su(0,`div`),yb(1),au())},styles:[Rt],encapsulation:2})}return e})();function Vt(e,i){if(e&1&&(cs(0,`mat-option`,3),qb(1),f_(2,`translate`),iu()),e&2){let t=i.$implicit,r=gb();Sm(`value`,t),lT(),tv(h_(2,2,r.headings[t]))}}function jt(e,i){if(e&1&&(cs(0,`mat-option`,3),qb(1),f_(2,`translate`),iu()),e&2){let t=i.$implicit;Sm(`value`,t),lT(),tv(h_(2,2,`cv.countries.`+t))}}function Yt(e,i){if(e&1){let t=cb();cs(0,`button`,17),Fm(`click`,function(){sf(t);return af(gb().remove())}),qb(1),f_(2,`translate`),iu()}if(e&2)Sm(`disabled`,gb().saving()),lT(),du(` `,h_(2,2,`cv.delete`),` `)}function Qt(e,i){if(e&1&&(cs(0,`p`,16),qb(1),f_(2,`translate`),iu()),e&2){let t=gb();lT(),tv(h_(2,1,t.failed()))}}var Gt=(()=>{class e{constructor(){this.cv=y(Ee),this.kind=VV.required(),this.entry=VV(null),this.done=jV(),this.kinds=Object.keys(Ge),this.headings=Ge,this.countries=Li,this.draft=vu(()=>Wt(this.entry(),this.kind())),this.saving=ze(!1),this.failed=ze(``),this.correcting=_t(()=>this.entry()!==null),this.ready=_t(()=>{let t=this.draft();return!!t.year&&!!t.titleEn.trim()&&!!t.country})}set(t,r$1){this.draft.update(n=>s(r({},n),{[t]:r$1}))}async save(){if(!(!this.ready()||this.saving())){this.saving.set(!0),this.failed.set(``);try{let t=qt(this.draft()),r=this.entry();r?await this.cv.update(r.id,t):await this.cv.create(t),this.done.emit()}catch(t){this.failed.set(Pt(t,`cv.saveFailed`))}finally{this.saving.set(!1)}}}async remove(){let t=this.entry();if(!(!t||this.saving())){this.saving.set(!0),this.failed.set(``);try{await this.cv.remove(t.id),this.done.emit()}catch(r){this.failed.set(Pt(r,`cv.deleteFailed`))}finally{this.saving.set(!1)}}}static{this.ɵfac=function(r){return new(r||e)}}static{this.ɵcmp=ZC({type:e,selectors:[[`app-cv-entry-form`]],inputs:{kind:[1,`kind`],entry:[1,`entry`]},outputs:{done:`done`},decls:64,vars:60,consts:[[1,`cv-form`],[`appearance`,`outline`,1,`cv-kind`],[3,`valueChange`,`value`,`disabled`],[3,`value`],[`appearance`,`outline`,1,`cv-year`],[`matInput`,``,`type`,`number`,3,`input`,`value`,`disabled`],[`appearance`,`outline`,1,`cv-country`],[`appearance`,`outline`,1,`cv-title`],[`matInput`,``,3,`input`,`value`,`disabled`],[`appearance`,`outline`],[`appearance`,`outline`,1,`cv-url`],[`matInput`,``,`type`,`url`,3,`input`,`value`,`disabled`],[1,`cv-actions`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`disabled`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`],[`mat-button`,``,`type`,`button`,1,`cv-delete`,3,`disabled`],[`role`,`alert`,1,`cv-failed`],[`mat-button`,``,`type`,`button`,1,`cv-delete`,3,`click`,`disabled`]],template:function(r,n){r&1&&(cs(0,`div`,0)(1,`mat-form-field`,1)(2,`mat-label`),qb(3),f_(4,`translate`),iu(),cs(5,`mat-select`,2),Fm(`valueChange`,function(p){return n.set(`kind`,p)}),eb(6,Vt,3,4,`mat-option`,3,Xw),iu()(),cs(8,`mat-form-field`,4)(9,`mat-label`),qb(10),f_(11,`translate`),iu(),cs(12,`input`,5),Fm(`input`,function(p){return n.set(`year`,p.target.valueAsNumber)}),iu()(),cs(13,`mat-form-field`,6)(14,`mat-label`),qb(15),f_(16,`translate`),iu(),cs(17,`mat-select`,2),Fm(`valueChange`,function(p){return n.set(`country`,p)}),eb(18,jt,3,4,`mat-option`,3,Xw),iu()(),cs(20,`mat-form-field`,7)(21,`mat-label`),qb(22),f_(23,`translate`),iu(),cs(24,`input`,8),Fm(`input`,function(p){return n.set(`titleEn`,p.target.value)}),iu()(),cs(25,`mat-form-field`,7)(26,`mat-label`),qb(27),f_(28,`translate`),iu(),cs(29,`input`,8),Fm(`input`,function(p){return n.set(`titleEs`,p.target.value)}),iu()(),cs(30,`mat-form-field`,9)(31,`mat-label`),qb(32),f_(33,`translate`),iu(),cs(34,`input`,8),Fm(`input`,function(p){return n.set(`venueEn`,p.target.value)}),iu()(),cs(35,`mat-form-field`,9)(36,`mat-label`),qb(37),f_(38,`translate`),iu(),cs(39,`input`,8),Fm(`input`,function(p){return n.set(`venueEs`,p.target.value)}),iu()(),cs(40,`mat-form-field`,9)(41,`mat-label`),qb(42),f_(43,`translate`),iu(),cs(44,`input`,8),Fm(`input`,function(p){return n.set(`city`,p.target.value)}),iu()(),cs(45,`mat-form-field`,10)(46,`mat-label`),qb(47),f_(48,`translate`),iu(),cs(49,`input`,11),Fm(`input`,function(p){return n.set(`titleUrl`,p.target.value)}),iu()(),cs(50,`mat-form-field`,10)(51,`mat-label`),qb(52),f_(53,`translate`),iu(),cs(54,`input`,11),Fm(`input`,function(p){return n.set(`venueUrl`,p.target.value)}),iu()(),cs(55,`div`,12)(56,`button`,13),Fm(`click`,function(){return n.save()}),qb(57),f_(58,`translate`),iu(),cs(59,`button`,14),Fm(`click`,function(){return n.done.emit()}),qb(60),f_(61,`translate`),iu(),Zw(62,Yt,3,4,`button`,15),iu(),Zw(63,Qt,3,3,`p`,16),iu()),r&2&&(lT(3),tv(h_(4,36,`cv.kind`)),lT(2),Sm(`value`,n.draft().kind)(`disabled`,n.saving()),lT(),tb(n.kinds),lT(4),tv(h_(11,38,`cv.year`)),lT(2),Sm(`value`,n.draft().year)(`disabled`,n.saving()),lT(3),tv(h_(16,40,`cv.country`)),lT(2),Sm(`value`,n.draft().country)(`disabled`,n.saving()),lT(),tb(n.countries),lT(4),tv(h_(23,42,`cv.titleEn`)),lT(2),Sm(`value`,n.draft().titleEn)(`disabled`,n.saving()),lT(3),tv(h_(28,44,`cv.titleEs`)),lT(2),Sm(`value`,n.draft().titleEs)(`disabled`,n.saving()),lT(3),tv(h_(33,46,`cv.venueEn`)),lT(2),Sm(`value`,n.draft().venueEn)(`disabled`,n.saving()),lT(3),tv(h_(38,48,`cv.venueEs`)),lT(2),Sm(`value`,n.draft().venueEs)(`disabled`,n.saving()),lT(3),tv(h_(43,50,`cv.city`)),lT(2),Sm(`value`,n.draft().city)(`disabled`,n.saving()),lT(3),tv(h_(48,52,`cv.titleUrl`)),lT(2),Sm(`value`,n.draft().titleUrl)(`disabled`,n.saving()),lT(3),tv(h_(53,54,`cv.venueUrl`)),lT(2),Sm(`value`,n.draft().venueUrl)(`disabled`,n.saving()),lT(2),Sm(`disabled`,!n.ready()||n.saving()),lT(),du(` `,h_(58,56,`cv.save`),` `),lT(2),Sm(`disabled`,n.saving()),lT(),du(` `,h_(61,58,`cancel`),` `),lT(2),Kw(n.correcting()?62:-1),lT(),Kw(n.failed()?63:-1))},dependencies:[Vn,En,wn,ft,jn,st,yt,za,La,Si,vi,j,$t$1],styles:[`.cv-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.75rem;margin:1rem 0 2rem}.cv-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 11rem;min-width:0}.cv-kind[_ngcontent-%COMP%]{flex:1 1 13rem!important}.cv-year[_ngcontent-%COMP%]{flex:0 1 7rem!important}.cv-country[_ngcontent-%COMP%]{flex:0 1 9rem!important}.cv-title[_ngcontent-%COMP%]{flex:1 1 16rem!important}.cv-url[_ngcontent-%COMP%]{flex:1 1 100%!important}.cv-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;flex:1 1 100%}.cv-delete[_ngcontent-%COMP%]{margin-left:auto;color:var(--%NS%mat-sys-error, #b3261e)}.cv-failed[_ngcontent-%COMP%]{flex:1 1 100%;margin:0;color:var(--%NS%mat-sys-error, #b3261e);font-size:.85rem}`]})}}return e})();function Wt(e,i){return{kind:e?.kind??i,year:e?.year??new Date().getFullYear(),titleEn:e?.title.en??``,titleEs:e?.title.es??``,venueEn:e?.venue?.en??``,venueEs:e?.venue?.es??``,city:e?.city??``,country:e?.country??`spain`,titleUrl:e?.titleUrl??``,venueUrl:e?.venueUrl??``}}function qt(e){let i=e.titleEn.trim(),t=e.titleEs.trim(),r$2=e.venueEn.trim(),n=e.venueEs.trim(),s$1=e.city.trim(),p=e.titleUrl.trim(),H=e.venueUrl.trim();return r(r(s(r(r({kind:e.kind,year:Number(e.year),title:r({en:i},t&&t!==i?{es:t}:{})},r$2?{venue:r({en:r$2},n&&n!==r$2?{es:n}:{})}:{}),s$1?{city:s$1}:{}),{country:e.country}),p?{titleUrl:p}:{}),H?{venueUrl:H}:{})}function Pt(e,i){let r=(e instanceof q?e.error:null)?.message;return typeof r==`string`&&e instanceof q&&e.status<500?r:i}var Kt=(e,i)=>i.title;var Zt=(e,i)=>i.id;function Jt(e,i){if(e&1){let t=cb();cs(0,`button`,13),f_(1,`translate`),Fm(`click`,function(){sf(t);let n=gb().$implicit;return af(gb().add(n.kind))}),cs(2,`mat-icon`),qb(3,`add`),iu()()}e&2&&Mm(`aria-label`,h_(1,1,`cv.add`))}function Xt(e,i){if(e&1&&(cs(0,`mat-grid-tile`,14)(1,`h4`,16),qb(2),iu()()),e&2){let t=gb().$implicit,r=gb().$implicit,n=gb();Sm(`colspan`,n.yearColSpan)(`rowspan`,n.numberOfItemsInYear(r.items,t)),lT(2),tv(t.year)}}function te(e,i){if(e&1&&(cs(0,`i`)(1,`a`,17),qb(2),iu()(),qb(3,`, `)),e&2){let t=gb().$implicit;lT(),Sm(`href`,t.titleUrl,$h),lT(),tv(t.title)}}function ee(e,i){if(e&1&&(cs(0,`i`),qb(1),iu(),qb(2,`, `)),e&2){let t=gb().$implicit;lT(),tv(t.title)}}function ie(e,i){if(e&1&&(cs(0,`span`)(1,`a`,17),qb(2),iu(),qb(3,`, `),iu()),e&2){let t=gb(2).$implicit;lT(),Sm(`href`,t.venueUrl,$h),lT(),tv(t.venue)}}function ne(e,i){if(e&1&&(cs(0,`span`),qb(1),iu()),e&2){let t=gb(2).$implicit;lT(),du(``,t.venue,`, `)}}function re(e,i){if(e&1&&Zw(0,ie,4,2,`span`)(1,ne,2,1,`span`),e&2){let t=gb().$implicit;Kw(t.venueUrl?0:1)}}function ae(e,i){if(e&1&&(cs(0,`span`),qb(1),iu()),e&2){let t=gb().$implicit;lT(),du(` `,t.city,`, `)}}function oe(e,i){if(e&1){let t=cb();cs(0,`button`,13),f_(1,`translate`),Fm(`click`,function(){sf(t);let n=gb().$implicit;return af(gb(2).correct(n.id))}),cs(2,`mat-icon`),qb(3,`edit`),iu()()}e&2&&Mm(`aria-label`,h_(1,1,`cv.edit`))}function le(e,i){if(e&1&&(cs(0,`div`),Zw(1,Xt,3,3,`mat-grid-tile`,14),cs(2,`mat-grid-tile`,9)(3,`p`,15),Zw(4,te,4,2)(5,ee,3,1),cs(6,`small`),Zw(7,re,2,1),Zw(8,ae,2,1,`span`),cs(9,`span`),qb(10),f_(11,`translate`),iu()(),Zw(12,oe,4,3,`button`,10),iu()()()),e&2){let t=i.$implicit,r=gb().$implicit,n=gb();lT(),Kw(n.displayYearLabel(r.items,t)?1:-1),lT(),Sm(`colspan`,n.descColSpan),lT(),Sm(`id`,t.anchor),lT(),Kw(t.titleUrl?4:5),lT(3),Kw(t.venue?7:-1),lT(),Kw(t.city?8:-1),lT(2),du(`(`,h_(11,8,t.countryKey),`)`),lT(2),Kw(n.mine()?12:-1)}}function se(e,i){if(e&1){let t=cb();cs(0,`app-cv-entry-form`,18),Fm(`done`,function(){sf(t);return af(gb(2).closeForm())}),iu()}if(e&2){let t=gb().$implicit,r=gb();Sm(`kind`,r.formKind(t.kind))(`entry`,r.correcting())}}function de(e,i){if(e&1&&(Nm(0,`mat-divider`,7),cs(1,`mat-grid-list`,8),Nm(2,`mat-grid-tile`,3),cs(3,`mat-grid-tile`,9)(4,`h3`,4),qb(5),f_(6,`translate`),iu(),Zw(7,Jt,4,3,`button`,10),iu()(),cs(8,`mat-grid-list`,11),eb(9,le,13,10,`div`,null,Zt),iu(),Zw(11,se,1,2,`app-cv-entry-form`,12)),e&2){let t=i.$implicit,r=gb();lT(),Sm(`cols`,r.totalCols),lT(),Sm(`colspan`,r.yearColSpan),lT(),Sm(`colspan`,r.descColSpan),lT(2),tv(h_(6,7,t.title)),lT(2),Kw(r.mine()?7:-1),lT(),Sm(`cols`,r.totalCols),lT(),tb(t.items),lT(2),Kw(r.mine()&&r.formOpenIn(t.kind)?11:-1)}}var ai=(()=>{class e{constructor(){this.breakpointObserver=y(te$1),this.cv=y(Ee),this.auth=y(O),this.language=y(y$1),this.totalCols=14,this.smallScreenYearColSpan=2,this.bigScreenYearColSpan=1,this.downloadType=R$1.CV,this.sections=_t(()=>Pe(this.cv.entries(),this.language.contentLanguage())),this.mine=_t(()=>this.auth.isAdmin()),this.adding=ze(null),this.editing=ze(null),this.correcting=_t(()=>this.cv.entries().find(t=>t.id===this.editing())??null),this.yearColSpan=this.bigScreenYearColSpan,this.descColSpan=this.totalCols-this.yearColSpan,this.isSmallScreen=!1,this.listenToScreenSize(),this.cv.refresh()}formOpenIn(t){return this.adding()===t||this.correcting()?.kind===t}formKind(t){return this.correcting()?.kind??t}add(t){this.editing.set(null),this.adding.set(t)}correct(t){this.adding.set(null),this.editing.set(t)}closeForm(){this.adding.set(null),this.editing.set(null)}numberOfItemsInYear(t,r){return t.filter(n=>n.year===r.year).length}displayYearLabel(t,r){return t.find(n=>n.year===r.year)?.id===r.id}listenToScreenSize(){this.breakpointObserver.observe([Zt$1.HandsetLandscape,Zt$1.HandsetPortrait]).subscribe(t=>{t.breakpoints[`(max-width: 599.98px) and (orientation: portrait)`]?this.isSmallScreen=!0:this.isSmallScreen=!1,this.yearColSpan=this.isSmallScreen?this.smallScreenYearColSpan:this.bigScreenYearColSpan,this.descColSpan=this.totalCols-this.yearColSpan})}static{this.ɵfac=function(r){return new(r||e)}}static{this.ɵcmp=ZC({type:e,selectors:[[`app-cv`]],decls:15,vars:12,consts:[[1,`container`,`margin-top`],[`rowHeight`,`2.8rem`,3,`cols`],[`rowspan`,`3`,3,`colspan`],[3,`colspan`],[1,`catalog-heading`],[3,`downloadFileType`],[3,`innerHtml`],[1,`breathe-space`],[`rowHeight`,`5rem`,`role`,`list`,3,`cols`],[`role`,`listitem`,3,`colspan`],[`mat-icon-button`,``,`type`,`button`,1,`cv-admin-button`],[`rowHeight`,`2.7rem`,`role`,`list`,3,`cols`],[3,`kind`,`entry`],[`mat-icon-button`,``,`type`,`button`,1,`cv-admin-button`,3,`click`],[3,`colspan`,`rowspan`],[3,`id`],[1,`catalog-caption`],[`target`,`_blank`,`rel`,`noopener noreferrer`,3,`href`],[3,`done`,`kind`,`entry`]],template:function(r,n){r&1&&(cs(0,`div`,0)(1,`mat-grid-list`,1),Nm(2,`mat-grid-tile`,2),cs(3,`mat-grid-tile`,3)(4,`h2`,4),qb(5,` CV `),Nm(6,`app-pdf-button`,5),iu()(),cs(7,`mat-grid-tile`,3),Nm(8,`p`,6),f_(9,`translate`),iu(),cs(10,`mat-grid-tile`,3),Nm(11,`p`,6),f_(12,`translate`),iu()(),eb(13,de,12,9,null,null,Kt),iu()),r&2&&(lT(),Sm(`cols`,n.totalCols),lT(),Sm(`colspan`,n.yearColSpan),lT(),Sm(`colspan`,n.descColSpan),lT(3),Sm(`downloadFileType`,n.downloadType),lT(),Sm(`colspan`,n.descColSpan),lT(),Sm(`innerHtml`,h_(9,8,`cv.shortBio`),lD),lT(2),Sm(`colspan`,n.descColSpan),lT(),Sm(`innerHtml`,h_(12,10,`contact.representedBy`),lD),lT(2),tb(n.sections()))},dependencies:[En,wt,Ot,rt,yt,wt$1,za$1,Gt,x,$t$1],styles:[`@charset "UTF-8";.breathe-space[_ngcontent-%COMP%]{margin-top:2em;margin-bottom:2em}h2.catalog-heading[_ngcontent-%COMP%]{margin:0;display:flex;align-items:center;gap:.5rem}.cv-admin-button[_ngcontent-%COMP%]{flex:0 0 auto;margin-left:.25rem;width:1.75rem!important;height:1.75rem!important;padding:0!important;line-height:1.75rem!important}.cv-admin-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.1rem;width:1.1rem;height:1.1rem;line-height:1.1rem}`]})}}return e})();export{ai as CvComponent};