import{n as s,t as r}from"./chunk-Ch7qlBDL.js";import{$r as y,$t as _t,Bn as iC,Br as uu,En as fb,Et as Um,Fn as hb,Gt as ZC,H as KV,Hr as vb,Ht as Yb,Ir as tt,Kt as ZV,M as Hv,P as Ib,R as Jr,T as GE,Vn as ib,Z as Nm,Zr as xm,_t as S,ct as QV,d as BV,dt as Qw,en as aC,er as l_,fn as cv,fr as nv,gn as de,gr as of,jr as sf,kn as gb,kt as Ve,li as zw,lr as ni$1,lt as Qm,ni as yf,nn as aT,o as Ab,oi as ze$1,on as as,ot as Pm,pt as Rd,q as ME,qn as jm,rn as a_,sn as av,st as QC,ti as yb,vr as ou,wr as py,wt as Ub,yn as e_,yt as Sm,z as Js,zn as hy}from"./chunk-pBuaMo-Y.js";import{i as G,o as T}from"./chunk-CoM6zAUm.js";import{i as Do,p as an}from"./chunk-BtHu-i3Z.js";import{m as Xs,v as he,y as ht}from"./chunk-Dqo3kqtz.js";import{t as e}from"./chunk-Cb1KwH4S.js";import{O as zs,S as rr,h as eo,i as J,l as Xa,n as Fe,r as Ir,u as Xr,v as js,w as si$1}from"./chunk-cKRrpx5v.js";import{A as $t$1,C as m,K as De,M as n,P as a,R as o,S as lt,_ as y$1,a as k,b as T$1,c as O,i as mt,j as H,q as pe,t as wt,z as t}from"./main-WYDHGXTP.js";import{t as K}from"./chunk-BqQ5pVIq.js";import{a as Ke,g as zt,m as ee,n as Gt$1,p as Zt$1,r as Ht$1,s as T$2,u as Vt$1}from"./chunk-Cn68dnOU.js";import{n as Pe$1}from"./chunk-0-k78IeS.js";import{t as Qt}from"./chunk-BUc1AAc7.js";var z=(function(n){return n.CV=`cv`,n.STATEMENT=`statement`,n.IMAGE=`image`,n.DOSSIER=`dossier`,n})(z||{});var ki=[`online`,`spain`,`usa`,`germany`,`mexico`,`italy`];var Ie={solo:`cv.shows.title`,collective:`cv.collectiveShows.title`,award:`cv.awards.title`,conference:`cv.conferences.title`,education:`cv.education.title`};function Ut(n,o){return n?(o===`es`?n.es:void 0)??n.en:``}function fe(n,o){let e=[];for(let i of Object.keys(Ie)){let t=n.filter(a=>a.kind===i).map(a=>ti(a,o));t.length&&e.push({kind:i,title:Ie[i],items:t})}return e}function ei(n){let o=n.title.en.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,48);return`${n.year}-${o}`}function ti(n,o){let e=Ut(n.venue,o);return s(r(r(r(r({id:n.id,anchor:ei(n),year:n.year,title:Ut(n.title,o)},n.titleUrl?{titleUrl:n.titleUrl}:{}),e?{venue:e}:{}),n.venueUrl?{venueUrl:n.venueUrl}:{}),n.city?{city:n.city}:{}),{countryKey:`cv.countries.${n.country}`})}var Ht=[{id:`4790ab4546bf78fb`,kind:`solo`,year:2024,title:{en:`El valle inquietante`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`069fd81d0cccbbc8`,kind:`solo`,year:2021,title:{en:`El sueño de los robots`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`ab3d09a718504872`,kind:`solo`,year:2019,title:{en:`33. El desengaño`},venue:{en:`La 13 dada trouch Gallery`},city:`Huelva`,country:`spain`},{id:`e2d006becf81f950`,kind:`solo`,year:2017,title:{en:`#blessed`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`b37386b8cd2eedd1`,kind:`solo`,year:2017,title:{en:`I was there`},venue:{en:`La silla eléctrica`},city:`Sevilla`,country:`spain`},{id:`62266b50fc6ab279`,kind:`solo`,year:2016,title:{en:`Never Gone Forever`},venue:{en:`Gallo Rojo`},city:`Sevilla`,country:`spain`},{id:`5dfbf4e1d333f63b`,kind:`solo`,year:2014,title:{en:`Pintura Aumentada`},venue:{en:`Red House`},city:`Sevilla`,country:`spain`},{id:`38dc378c84cc92dd`,kind:`solo`,year:2013,title:{en:`Historias aparentemente inconexas`},venue:{en:`Aula Magna de Capuchinos`},city:`Alcalá la Real`,country:`spain`},{id:`8f6f6f3da32a1586`,kind:`solo`,year:2012,title:{en:`Juanma Moreno`},venue:{en:`No-Lugar`},city:`Sevilla`,country:`spain`},{id:`22449c295542bd10`,kind:`solo`,year:2008,title:{en:`Transeúntes`},venue:{en:`Harz Mensa`},city:`Halle Saale`,country:`germany`},{id:`1c6b1a0396dd55e5`,kind:`collective`,year:2024,title:{en:`Outsiders. Vol. 1`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`569775435cb39ae2`,kind:`collective`,year:2024,title:{en:`Anna Jonsson & Juanma Moreno`},venue:{en:`El Estudio de Ignacio del Río`},city:`Villanueva del Rosario`,country:`spain`},{id:`c45534b738716510`,kind:`collective`,year:2023,title:{en:`Pintores pensando la pintura`},venue:{en:`Espacio 75 Art Gallery`},city:`Madrid`,country:`spain`,venueUrl:`https://www.espacio75.com/`},{id:`a5f32ad8a66500b3`,kind:`collective`,year:2023,title:{en:`Nocturnos`},venue:{en:`Sala Pescadería Vieja / CAC Vélez-Málaga`},city:`Jerez de la Frontera / Vélez-Málaga`,country:`spain`},{id:`cf3e6d8f3a2b26f5`,kind:`collective`,year:2023,title:{en:`Los únicos que saben de arte son los artistas`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`6b3530832ba03756`,kind:`collective`,year:2022,title:{en:`Discovery Art Fair Cologne`},city:`Cologne`,country:`germany`,titleUrl:`https://discoveryartfair.com/fairs/koeln/`},{id:`9dd6662d24b96d31`,kind:`collective`,year:2021,title:{en:`Lucca Art Fair`},country:`online`,titleUrl:`https://www.luccaartfair.com/`},{id:`b30ad80ca6893f41`,kind:`collective`,year:2021,title:{en:`Figuración Fantástica Sevillana`},venue:{en:`Galería Impulso`},city:`Querétaro`,country:`mexico`,venueUrl:`https://impulsogaleria.com/en/home/`},{id:`914b9e1a7c8ac6cd`,kind:`collective`,year:2020,title:{en:`Interpaisajes`},venue:{en:`Eldevenir & Zunino Gallery`},country:`online`,venueUrl:`https://www.eldevenirartgallery.com/`},{id:`fdc3ccc88436e541`,kind:`collective`,year:2019,title:{en:`72 horas`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`a9114df8e5260755`,kind:`collective`,year:2019,title:{en:`Homenaje a Dolores Montijano`},venue:{en:`Aula Magna de Capuchinos`},city:`Alcalá la Real`,country:`spain`},{id:`99009cdeb333423c`,kind:`collective`,year:2019,title:{en:`Redes de fe`},venue:{en:`Galería Renace Art`},city:`Jaen`,country:`spain`,venueUrl:`https://renace.art/`},{id:`ce090999a3275899`,kind:`collective`,year:2018,title:{en:`Todo encaja`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`df6d0387fe24922f`,kind:`collective`,year:2017,title:{en:`Lodo`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`7b037cec06674222`,kind:`collective`,year:2015,title:{en:`Escozor`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`e34e5fd749f45d4e`,kind:`collective`,year:2015,title:{en:`A paloma muerta`},venue:{en:`Estudio22`},city:`Logroño`,country:`spain`,venueUrl:`http://estudio22photo.es`},{id:`843aef3ba369776d`,kind:`collective`,year:2015,title:{en:`Nemoart festival, digital art`},venue:{en:`Casa Museo Niceto Alcalá Zamora`},city:`Priego de Córdoba`,country:`spain`},{id:`ff786c2209fc2396`,kind:`collective`,year:2015,title:{en:`Promoción equis`},venue:{en:`Cienfuegos`},city:`Málaga`,country:`spain`},{id:`8bd6f86416fff5e1`,kind:`collective`,year:2015,title:{en:`En azúcar de sandía`},venue:{en:`Suricatta Gallery`},city:`Jerez de la Frontera`,country:`spain`},{id:`2cd55ee718ff78c7`,kind:`collective`,year:2014,title:{en:`El tamaño no importa`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`14135e1bc3b528c4`,kind:`collective`,year:2014,title:{en:`MULTI/TUTTI/FEST`},venue:{en:`Cienfuegos`},city:`Málaga`,country:`spain`},{id:`201762d23308702b`,kind:`collective`,year:2013,title:{en:`Plato del día`},venue:{en:`Red House`},city:`Sevilla`,country:`spain`},{id:`84302a3a85a36dbf`,kind:`collective`,year:2013,title:{en:`Lo mejorcito de cada casa`},venue:{en:`No-Lugar`},city:`Sevilla`,country:`spain`},{id:`b3c985d47cd09ae1`,kind:`collective`,year:2011,title:{en:`Weisser TV`},venue:{en:`129 Gallery`},city:`Berlin`,country:`germany`,venueUrl:`https://www.129gallery.com/`},{id:`c711555116950f0e`,kind:`collective`,year:2011,title:{en:`Mehr Licht, tributo a Chema Alvargonzalez`},venue:{en:`GlogauAIR Project Space`},city:`Berlin`,country:`germany`,venueUrl:`https://glogauair.net/`},{id:`52a410152fecfa68`,kind:`collective`,year:2011,title:{en:`Modern Classic, influence of the past in today's art`},venue:{en:`Your Mum`},city:`Berlin`,country:`germany`},{id:`9e88fbd95cf01e1c`,kind:`collective`,year:2010,title:{en:`The Mac Gyver Problem`},venue:{en:`Galerie im Regierungsviertel/The Forgotten Bar`},city:`Berlin`,country:`germany`},{id:`e1e9774529367700`,kind:`collective`,year:2009,title:{en:`XXL-Art, nuevas tendencias de la figuración en gran formato`},venue:{en:`Damián Bayón Art Center`},city:`Santa Fe`,country:`spain`},{id:`74fb42dad98e9fd9`,kind:`collective`,year:2009,title:{en:`La más elegante del invernadero III`},venue:{en:`Galería Jesús Puerto`},city:`Granada`,country:`spain`},{id:`5a950bf5bd6ff563`,kind:`award`,year:2014,title:{en:`The Pollock-Krasner Foundation award`},city:`New York`,country:`usa`,titleUrl:`http://www.pkf.org/`},{id:`3462becaf15896df`,kind:`award`,year:2012,title:{en:`Antonio Gala Foundation Residence Program`,es:`Fundación Antonio Gala para jóvenes creadores`},city:`Córdoba`,country:`spain`,titleUrl:`http://www.fundacionantoniogala.org/`},{id:`0eb0bef9af46c8f3`,kind:`award`,year:2010,title:{en:`GlogauAIR Residence Program`},city:`Berlín`,country:`germany`,titleUrl:`http://www.glogauair.net/`},{id:`d58024d99289fbd0`,kind:`award`,year:2006,title:{en:`Lefranc&Bourgueois art award`,es:`Becas Lefranc&Bourgueois`},city:`Granada`,country:`spain`},{id:`090493feed6a82de`,kind:`conference`,year:2025,title:{en:`Towards a New AI Winter`,es:`¿Hacia un nuevo invierno de la IA?`},venue:{en:`International University of Andalucia`,es:`Universidad Internacional de Andalucía`},city:`Baeza`,country:`spain`,titleUrl:`https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas`,venueUrl:`https://www.unia.es/`},{id:`8fd481e74a1e6942`,kind:`education`,year:2009,title:{en:`Bachelor on arts degree`,es:`Licenciado en Bellas Artes`},venue:{en:`University of Granada`,es:`Universidad de Granada`},city:`Granada`,country:`spain`,venueUrl:`http://bellasartes.ugr.es/`},{id:`5b24c76e7cb1538f`,kind:`education`,year:2008,title:{en:`LLP Erasmus Scholarship`,es:`Beca LLP Erasmus`},venue:{en:`Burg Giebichenstein, Hochschule für Kunst und Design`},city:`Halle Saale`,country:`germany`,venueUrl:`http://www.burg-halle.de/`}];var ve=(()=>{class n{constructor(){this.http=y(an),this.auth=y(O),this.isBrowser=Do(y(ME)),this.known=ze$1(Ht),this.asked=null,this.entries=_t(()=>this.known())}async refresh(){if(this.isBrowser)return this.asked??=this.ask(),this.asked}async create(e$1){await hy(this.http.post(`${e.backendUrl}cv/entries`,e$1,this.asHim())),await this.reread()}async update(e$2,i){await hy(this.http.put(`${e.backendUrl}cv/entries/${e$2}`,i,this.asHim())),await this.reread()}async remove(e$3){await hy(this.http.delete(`${e.backendUrl}cv/entries/${e$3}`,this.asHim())),await this.reread()}async reread(){return this.asked=this.ask(),this.asked}asHim(){let e=this.auth.bearerToken();return{headers:e?{Authorization:`Bearer ${e}`}:{}}}async ask(){try{let i=(await hy(this.http.get(`${e.backendUrl}cv/entries`)))?.data?.entries;Array.isArray(i)&&i.length&&this.known.set(i)}catch{}}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵprov=de({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var xe={introduction:{content:`statement.introduction.content`},sections:[{title:`statement.painting.title`,content:[`statement.painting.limits`,`statement.painting.recontextualising`,`statement.painting.rule`]},{title:`statement.images.title`,content:[`statement.images.found`,`statement.images.accident`]},{title:`statement.failure.title`,content:[`statement.failure.content`]}]};var ii=[`switch`];var ni=[`*`];function ai(n,o){n&1&&(as(0,`span`,11),yf(),as(1,`svg`,13),xm(2,`path`,14),ou(),as(3,`svg`,15),xm(4,`path`,16),ou()())}var oi=new S(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var be=class{source;checked;constructor(o,e){this.source=o,this.checked=e}};var Pe=(()=>{class n{_elementRef=y(Jr);_focusMonitor=y(ht);_changeDetectorRef=y(QV);defaults=y(oi);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new be(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Xs();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new tt;toggleChange=new tt;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){y(T).load(pe);let e=y(new Hv(`tabindex`),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||`accent`,this.id=this._uniqueId=y(he).getId(`mat-mdc-slide-toggle-`),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new be(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(i){return new(i||n)};static ɵcmp=QC({type:n,selectors:[[`mat-slide-toggle`]],viewQuery:function(i,t){if(i&1&&Um(ii,5),i&2){let a;vb(a=yb())&&(t._switchElement=a.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(i,t){i&2&&(Pm(`id`,t.id),Sm(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),Ab(t.color?`mat-`+t.color:``),Qm(`mat-mdc-slide-toggle-focused`,t._focused)(`mat-mdc-slide-toggle-checked`,t.checked)(`mat-slide-toggle-full-width`,t.fullWidth)(`_mat-animation-noopable`,t._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,ZV],color:`color`,disabled:[2,`disabled`,`disabled`,ZV],fullWidth:[2,`fullWidth`,`fullWidth`,ZV],disableRipple:[2,`disableRipple`,`disableRipple`,ZV],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:KV(e)],checked:[2,`checked`,`checked`,ZV],hideIcon:[2,`hideIcon`,`hideIcon`,ZV],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,ZV]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[e_([{provide:Fe,useExisting:ni$1(()=>n),multi:!0},{provide:J,useExisting:n,multi:!0}]),GE],ngContentSelectors:ni,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(i,t){if(i&1&&(hb(),as(0,`div`,1)(1,`button`,2,0),jm(`click`,function(){return t._handleClick()}),xm(3,`div`,3)(4,`span`,4),as(5,`span`,5)(6,`span`,6)(7,`span`,7),xm(8,`span`,8),ou(),as(9,`span`,9),xm(10,`span`,10),ou(),zw(11,ai,5,0,`span`,11),ou()()(),as(12,`label`,12),jm(`click`,function(r){return r.stopPropagation()}),gb(13),ou()()),i&2){let a=Ib(2);Nm(`labelPosition`,t.labelPosition),aT(),Qm(`mdc-switch--selected`,t.checked)(`mdc-switch--unselected`,!t.checked)(`mdc-switch--checked`,t.checked)(`mdc-switch--disabled`,t.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,t.disabledInteractive),Nm(`tabIndex`,t.disabled&&!t.disabledInteractive?-1:t.tabIndex)(`disabled`,t.disabled&&!t.disabledInteractive),Sm(`id`,t.buttonId)(`name`,t.name)(`aria-label`,t.ariaLabel)(`aria-labelledby`,t._getAriaLabelledBy())(`aria-describedby`,t.ariaDescribedby)(`aria-required`,t.required||null)(`aria-checked`,t.checked)(`aria-disabled`,t.disabled&&t.disabledInteractive?`true`:null),aT(9),Nm(`matRippleTrigger`,a)(`matRippleDisabled`,t.disableRipple||t.disabled)(`matRippleCentered`,!0),aT(),Qw(t.hideIcon?-1:11),aT(),Nm(`for`,t.buttonId),Sm(`id`,t._labelId)}},dependencies:[De,m],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--%NS%mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--%NS%mat-slide-toggle-track-height, 32px);
  border-radius: var(--%NS%mat-slide-toggle-track-shape, var(--%NS%mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--%NS%mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--%NS%mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-track-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-color, var(--%NS%mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--%NS%mat-slide-toggle-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-hover-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-focus-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-track-color, var(--%NS%mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--%NS%mat-slide-toggle-selected-track-color, var(--%NS%mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-track-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-track-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--%NS%mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--%NS%mat-slide-toggle-handle-width);
  height: var(--%NS%mat-slide-toggle-handle-height);
  border-radius: var(--%NS%mat-slide-toggle-handle-shape, var(--%NS%mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--%NS%mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--%NS%mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--%NS%selected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-handle-color, var(--%NS%mat-sys-on-primary));
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-handle-color, var(--%NS%mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-handle-color, var(--%NS%mat-sys-surface));
}
.mdc-switch--%NS%unselected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-handle-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--%NS%unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-handle-color, var(--%NS%mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--%NS%mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
  height: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--%NS%unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-selected-icon-color, var(--%NS%mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--%NS%mat-slide-toggle-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-slide-toggle-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-slide-toggle-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-slide-toggle-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-slide-toggle-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-slide-toggle-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--%NS%mat-slide-toggle-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-slide-toggle-full-width {
  width: 100%;
}
.mat-slide-toggle-full-width .mat-internal-form-field {
  width: 100%;
  justify-content: space-between;
}
.mat-slide-toggle-full-width .mat-internal-form-field label {
  margin: 0;
  flex-grow: 1;
  text-align: end;
}
.mat-slide-toggle-full-width .mdc-form-field--align-end label {
  text-align: start;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})}return n})();var tn=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=ZC({type:n});static ɵinj=Rd({imports:[Pe,G]})}return n})();function ri(n){let o=String(n??``).toLowerCase();return[`watercolor`,`watercolour`,`drawing`,`gouache`,`ink`,`pencil`,`charcoal`].some(i=>o.includes(i))?`paper`:`painting`}function Gt(n){let o=Number.parseFloat(String(n??``).replace(`,`,`.`));return Number.isFinite(o)?o:NaN}function ye(n){return Number.isFinite(n)&&n>0}function Vt(n,o,e){let i=Gt(n.height),t=Gt(n.width);if(!Number.isFinite(i)||!Number.isFinite(t))return null;let a=e[ri(o)];return ye(a)?Math.round((i+t)*a):null}function jt(n){return`${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,`\xA0`)} \u20AC`}function si(n,o){if(n&1){let e=ib();as(0,`div`,4)(1,`mat-form-field`,7)(2,`mat-label`),Ub(3),a_(4,`translate`),ou(),as(5,`input`,8),cv(`ngModelChange`,function(t){of(e);let a=fb();return Yb(a.contactName,t)||(a.contactName=t),sf(t)}),ou(),iC(),ou()()}if(n&2){let e=fb();aT(3),nv(l_(4,3,`dossier.contactName`)),aT(2),av(`ngModel`,e.contactName),Nm(`placeholder`,e.defaultName),aC()}}function ci(n,o){if(n&1){let e=ib();as(0,`mat-slide-toggle`,13),cv(`ngModelChange`,function(t){of(e);let a=fb();return Yb(a.cvAsProse,t)||(a.cvAsProse=t),sf(t)}),Ub(1),a_(2,`translate`),ou(),iC()}if(n&2)av(`ngModel`,fb().cvAsProse),aC(),aT(),uu(` `,l_(2,2,`cv.proseInDossier`),` `)}function li(n,o){n&1&&(as(0,`p`,16),Ub(1),a_(2,`translate`),ou()),n&2&&(aT(),uu(` `,l_(2,1,`dossier.multiplierProblem`),` `))}function di(n,o){if(n&1){let e=ib();as(0,`div`,6)(1,`mat-form-field`,7)(2,`mat-label`),Ub(3),a_(4,`translate`),ou(),as(5,`input`,14),cv(`ngModelChange`,function(t){of(e);let a=fb();return Yb(a.paintingMultiplier,t)||(a.paintingMultiplier=t),sf(t)}),ou(),iC(),ou(),as(6,`mat-form-field`,7)(7,`mat-label`),Ub(8),a_(9,`translate`),ou(),as(10,`input`,14),cv(`ngModelChange`,function(t){of(e);let a=fb();return Yb(a.paperMultiplier,t)||(a.paperMultiplier=t),sf(t)}),ou(),iC(),ou(),as(11,`p`,15),Ub(12),a_(13,`translate`),ou(),zw(14,li,3,3,`p`,16),ou()}if(n&2){let e=fb();aT(3),nv(l_(4,6,`dossier.paintingMultiplier`)),aT(2),av(`ngModel`,e.paintingMultiplier),aC(),aT(3),nv(l_(9,8,`dossier.paperMultiplier`)),aT(2),av(`ngModel`,e.paperMultiplier),aC(),aT(2),nv(l_(13,10,`dossier.multiplierHint`)),aT(2),Qw(e.multipliersUsable?-1:14)}}var qt=(()=>{class n{constructor(){this.customTitle=``,this.customText=``,this.includeContact=!1,this.contactName=``,this.defaultName=Zt$1,this.includeCv=!1,this.cvAsProse=!1,this.includeStatement=!1,this.isSubmitting=!1,this.includePrices=!1,this.paintingMultiplier=11,this.paperMultiplier=11,this.dialogRef=y(T$2),this.data=y(Ke,{optional:!0})??{proseAvailable:!1}}get multipliersUsable(){return ye(Number(this.paintingMultiplier))&&ye(Number(this.paperMultiplier))}get canSubmit(){return!this.isSubmitting&&(!this.includePrices||this.multipliersUsable)}submit(){this.isSubmitting=!0;let e={contactName:this.contactName.trim()||`Juanma Moreno Sánchez`,customTitle:this.customTitle,customText:this.customText,includeContact:this.includeContact,includeCv:this.includeCv,cvAsProse:this.cvAsProse,includeStatement:this.includeStatement,prices:this.includePrices?{painting:Number(this.paintingMultiplier),paper:Number(this.paperMultiplier)}:null};this.dialogRef.close(e)}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵcmp=QC({type:n,selectors:[[`app-dossier-options-modal`]],decls:47,vars:49,consts:[[`mat-dialog-title`,``],[1,`form-group`],[1,`pdf-options-group`],[3,`ngModelChange`,`ngModel`],[1,`pdf-options-nested`],[1,`pdf-options-nested`,3,`ngModel`],[1,`pdf-options-nested`,`pdf-multipliers`],[`appearance`,`outline`],[`matInput`,``,3,`ngModelChange`,`ngModel`,`placeholder`],[`matInput`,``,`rows`,`4`,3,`ngModelChange`,`ngModel`,`placeholder`],[`align`,`end`],[`mat-button`,``,`mat-dialog-close`,``],[`mat-raised-button`,``,`color`,`primary`,3,`click`,`disabled`],[1,`pdf-options-nested`,3,`ngModelChange`,`ngModel`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`0.1`,3,`ngModelChange`,`ngModel`],[1,`pdf-options-hint`],[`role`,`alert`,1,`pdf-options-problem`]],template:function(i,t){i&1&&(as(0,`h2`,0),Ub(1),a_(2,`translate`),ou(),as(3,`mat-dialog-content`)(4,`div`,1)(5,`div`,2)(6,`mat-slide-toggle`,3),cv(`ngModelChange`,function(r){return Yb(t.includeContact,r)||(t.includeContact=r),r}),Ub(7),a_(8,`translate`),ou(),iC(),zw(9,si,6,5,`div`,4),ou(),as(10,`div`,2)(11,`mat-slide-toggle`,3),cv(`ngModelChange`,function(r){return Yb(t.includeCv,r)||(t.includeCv=r),r}),Ub(12),a_(13,`translate`),ou(),iC(),zw(14,ci,3,4,`mat-slide-toggle`,5),ou(),as(15,`div`,2)(16,`mat-slide-toggle`,3),cv(`ngModelChange`,function(r){return Yb(t.includeStatement,r)||(t.includeStatement=r),r}),Ub(17),a_(18,`translate`),ou(),iC(),ou(),as(19,`div`,2)(20,`mat-slide-toggle`,3),cv(`ngModelChange`,function(r){return Yb(t.includePrices,r)||(t.includePrices=r),r}),Ub(21),a_(22,`translate`),ou(),iC(),zw(23,di,15,12,`div`,6),ou(),as(24,`div`,2)(25,`mat-form-field`,7)(26,`mat-label`),Ub(27),a_(28,`translate`),ou(),as(29,`input`,8),a_(30,`translate`),cv(`ngModelChange`,function(r){return Yb(t.customTitle,r)||(t.customTitle=r),r}),ou(),iC(),ou()(),as(31,`div`,2)(32,`mat-form-field`,7)(33,`mat-label`),Ub(34),a_(35,`translate`),ou(),as(36,`textarea`,9),a_(37,`translate`),cv(`ngModelChange`,function(r){return Yb(t.customText,r)||(t.customText=r),r}),ou(),iC(),ou()()()(),as(38,`mat-dialog-actions`,10)(39,`button`,11),a_(40,`translate`),Ub(41),a_(42,`translate`),ou(),as(43,`button`,12),a_(44,`translate`),jm(`click`,function(){return t.submit()}),Ub(45),a_(46,`translate`),ou()()),i&2&&(aT(),nv(l_(2,23,`dossier.title`)),aT(5),av(`ngModel`,t.includeContact),aC(),aT(),uu(` `,l_(8,25,`dossier.includeContact`),` `),aT(2),Qw(t.includeContact?9:-1),aT(2),av(`ngModel`,t.includeCv),aC(),aT(),nv(l_(13,27,`dossier.includeCv`)),aT(2),Qw(t.includeCv&&t.data.proseAvailable?14:-1),aT(2),av(`ngModel`,t.includeStatement),aC(),aT(),uu(` `,l_(18,29,`dossier.includeStatement`),` `),aT(3),av(`ngModel`,t.includePrices),aC(),aT(),uu(` `,l_(22,31,`dossier.includePrices`),` `),aT(2),Qw(t.includePrices?23:-1),aT(4),nv(l_(28,33,`dossier.customTitle`)),aT(2),av(`ngModel`,t.customTitle),Nm(`placeholder`,l_(30,35,`dossier.customTitlePlaceholder`)),aC(),aT(5),nv(l_(35,37,`dossier.customText`)),aT(2),av(`ngModel`,t.customText),Nm(`placeholder`,l_(37,39,`dossier.customTextPlaceholder`)),aC(),aT(3),Sm(`aria-label`,l_(40,41,`cancel`)),aT(2),uu(` `,l_(42,43,`cancel`),` `),aT(2),Nm(`disabled`,!t.canSubmit),Sm(`aria-label`,l_(44,45,`download.portfolio`)),aT(2),uu(` `,l_(46,47,`download.portfolio`),` `))},dependencies:[zt,Gt$1,Pe,zs,si$1,eo,js,Ir,Xr,Xa,rr,Pe$1,Ht$1,lt,Vt$1,$t$1],styles:[`.pdf-options-group[_ngcontent-%COMP%]{margin-bottom:1em;width:100%}.pdf-multipliers[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.75rem}.pdf-multipliers[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 8rem;min-width:0}.pdf-options-hint[_ngcontent-%COMP%], .pdf-options-problem[_ngcontent-%COMP%]{flex-basis:100%;margin:0;font-size:.75rem;line-height:1.4}.pdf-options-hint[_ngcontent-%COMP%]{opacity:.7}.pdf-options-problem[_ngcontent-%COMP%]{color:#b3261e}`]})}}return n})();var Zt=(()=>{class n{constructor(){this.http=y(an),this.translate=y(H),this.auth=y(O),this.cv=y(ve)}read(e$4){return hy(this.http.get(`${e.backendUrl}cv/prose/${e$4}`).pipe(Ve(i=>i?.data??null),Js(()=>py(null))))}write(e$5){let i=this.auth.bearerToken();return hy(this.http.post(`${e.backendUrl}cv/prose`,{lang:e$5,list:this.asList()},{headers:i?{Authorization:`Bearer ${i}`}:{}}).pipe(Ve(t=>t.data)))}asList(){let e=this.translate.currentLang()?.startsWith(`es`)?`es`:`en`;return fe(this.cv.entries(),e).map(i=>{let t=i.items.map(a=>{let r=[a.venue,a.city,this.translate.instant(a.countryKey)].filter(Boolean).join(`, `);return`${a.year} \u2014 ${a.title}${r?`, ${r}`:``}`});return`${this.translate.instant(i.title)}
${t.join(`
`)}`}).join(`

`)}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵprov=de({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var Ee=11.811023622047244;function mi(n){return new Promise((o,e)=>{let i=new Image;i.crossOrigin=`anonymous`,i.src=n,i.onload=()=>o(i),i.onerror=()=>e(new Error(`Could not load image: ${n}`))})}async function _e(n){for(let o of n)try{return await mi(o)}catch{}throw new Error(`No image source could be loaded.`)}function hi(n,o,e){let i=n.width/n.height,t=Math.min(n.width,o*Ee),a=t/i;return a>e*Ee&&(a=e*Ee,t=a*i),{width:t,height:a}}function Ae(n,o,e,i=.8){let{width:t,height:a}=hi(n,o,e);return pi(n,t,a).toDataURL(`image/jpeg`,i)}function Jt(n,o=1200,e=2.2){let i=Math.min(n.width,n.height)/e,t=(n.width-i)*Math.random(),a=(n.height-i)*Math.random(),r=document.createElement(`canvas`);r.width=o,r.height=o;let u=r.getContext(`2d`);u.drawImage(n,t,a,i,i,0,0,o,o);let p=u.getImageData(0,0,o,o),h=p.data;for(let v=0;v<h.length;v+=4){let w=.299*h[v]+.587*h[v+1]+.114*h[v+2];h[v]=h[v+1]=h[v+2]=w}return u.putImageData(p,0,0),r.toDataURL(`image/jpeg`,.82)}function pi(n,o,e){let i=document.createElement(`canvas`);return i.width=o,i.height=e,i.getContext(`2d`).drawImage(n,0,0,o,e),i}var B={format:[210,210],a4:[210,297],margin:24};var f={ink:`#1f1f1f`,soft:`#6e6e6e`,faint:`#a3a3a3`,white:`#ffffff`,accent:`#cf2525`};var c={font:`helvetica`,size:{coverTitle:27,coverArtist:10,heading:11,title:11,body:9.5,caption:8.5,small:7.5},lineHeight:{body:5.4,caption:4.4,heading:7},wideCharSpace:1.6};var we=class n{constructor(o,e=B.format){this.doc=new o({unit:`mm`,format:e}),this.y=B.margin}get margin(){return B.margin}get pageWidth(){return this.doc.internal.pageSize.getWidth()}get pageHeight(){return this.doc.internal.pageSize.getHeight()}get contentWidth(){return this.pageWidth-2*this.margin}get centerX(){return this.pageWidth/2}newPage(){this.doc.addPage(),this.y=this.margin}ensureRoom(o){this.y+o>this.pageHeight-this.margin&&this.newPage()}space(o){this.y+=o}paragraph(o,e={}){let{charSpace:i=0,lineHeight:t=c.lineHeight.body,align:a=`left`,maxWidth:r=this.contentWidth}=e;this.applyStyle(e);let u=e.x??(a===`center`?this.centerX:this.margin),p=this.doc.splitTextToSize(n.stripHtml(o),r);for(let h of p)this.ensureRoom(t),this.drawLine(h,u,this.y,a,i),this.y+=t}heading(o,e={}){this.paragraph(o.toUpperCase(),r({size:c.size.heading,color:f.soft,charSpace:c.wideCharSpace,lineHeight:c.lineHeight.heading},e))}textAt(o,e,i,t={}){this.applyStyle(t),this.drawLine(n.stripHtml(o),e,i,t.align??`left`,t.charSpace??0)}textWidth(o,e={}){this.applyStyle(e);let i=n.stripHtml(o);return this.doc.getTextWidth(i)+(e.charSpace??0)*Math.max(i.length-1,0)}addPageNumbers(o=!0){let e=this.doc.getNumberOfPages();for(let i=o?2:1;i<=e;i++)this.doc.setPage(i),this.applyStyle({size:c.size.small,color:f.faint}),this.doc.text(String(i-(o?1:0)),this.centerX,this.pageHeight-9,{align:`center`});this.doc.setPage(e)}applyStyle({size:o=c.size.body,style:e=`normal`,color:i=f.ink}){this.doc.setFont(c.font,e),this.doc.setFontSize(o),this.doc.setTextColor(i)}drawLine(o,e,i,t,a){if(t===`center`&&a>0){let r=this.doc.getTextWidth(o)+a*Math.max(o.length-1,0);this.doc.text(o,e-r/2,i,{charSpace:a})}else this.doc.text(o,e,i,{align:t,charSpace:a})}static stripHtml(o){return o.replace(/<[^>]*(>|$)/g,``).trim()}};var gi=16;var ze=5;var Se=.4;var $t=130;var ui=.92;var ae=140;var fi=70;var F=7;var Kt=3;var vi=12;var Yt=(()=>{class n$1{constructor(){this.artworkService=y(n),this.translateService=y(H),this.availability=y(k),this.cv=y(ve)}async loadJspdf(){return this.jspdf??=await import(`./chunk-C2P1SpvC.js`)}async newWriter(e){let{jsPDF:i}=await this.loadJspdf();return new we(i,e)}async createTechnicalSheet(e){let i=await this.newWriter(B.a4);return await this.addArtworkPage(i,e),i.doc}async createCertificate(e,i){let t=await this.newWriter(B.a4),{doc:a$1,pageWidth:r,contentWidth:u}=t,p=(J,ee)=>this.translateService.instant(J,ee),h=i?this.certificateDate(i.mintedAt):null,v=h?p(`certificate.recordedOn`,{date:h}):p(`certificate.recorded`),w=p(`certificate.onlyAuthorship`),g=this.getTraitsAsText(e),N=[[p(`certificate.token`),`#${e.tokenId}`],[p(`certificate.contract`),o],...i?[[p(`certificate.transaction`),i.txHash]]:[]],oe=this.heightOf(t,e.name??``,c.size.title,u)+this.heightOf(t,g,c.size.caption,u)+F+this.heightOf(t,v,c.size.body,ae)+F+N.length*(c.lineHeight.caption*2+Kt)+F+this.heightOf(t,w,c.size.small,ae)+vi,T=t.pageHeight-2*t.margin-c.lineHeight.heading-F-F,q=Math.max(fi,T-oe);t.heading(p(`certificate.pdfHeading`),{align:`center`}),t.space(F);let re=Ae(await _e(this.artworkService.getNftFetchableUrls(e.image)),u,q,ui),{width:Y,height:Z}=a$1.getImageProperties(re),me=Y/Z,Q=u,G=Q/me;G>q&&(G=q,Q=G*me),a$1.addImage(re,`JPEG`,(r-Q)/2,t.y,Q,G),t.space(G+F),t.paragraph(e.name??``,{size:c.size.title,style:`italic`,align:`center`}),t.paragraph(g,{size:c.size.caption,color:f.soft,align:`center`,charSpace:Se}),t.space(F),t.paragraph(v,{size:c.size.body,maxWidth:ae,x:(r-ae)/2}),t.space(F);for(let[J,ee]of N)this.certificateFact(t,J,ee);return t.space(F),t.paragraph(w,{size:c.size.small,color:f.soft,maxWidth:ae,x:(r-ae)/2}),t.textAt(`${a}/${e.tokenId}`,t.centerX,t.pageHeight-t.margin,{size:c.size.small,color:f.faint,align:`center`}),t.doc}heightOf(e,i,t,a){e.doc.setFontSize(t);let r=e.doc.splitTextToSize(i,a),u=t>=c.size.body?c.lineHeight.body:c.lineHeight.caption;return r.length*u}certificateFact(e,i,t){e.paragraph(i.toUpperCase(),{size:c.size.small,color:f.faint,charSpace:c.wideCharSpace,align:`center`}),e.paragraph(t,{size:c.size.caption,color:f.ink,align:`center`}),e.space(Kt)}certificateDate(e){let i=this.translateService.currentLang()?.startsWith(`es`);return new Intl.DateTimeFormat(i?`es-ES`:`en-GB`,{day:`numeric`,month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(e))}async createDossier(e,i,t,a,r,u,p,h,v,w=Zt$1){t&&await this.cv.refresh();let g=await this.newWriter(),N=1+(u?1:0)+(a?1:0)+e.length+(t?1:0)+(i?1:0),oe=0,T=()=>p?.(++oe/N);await this.addCover(g,e,r),T(),u&&(g.newPage(),this.addCustomText(g,u),T()),a&&(g.newPage(),this.addStatement(g),T());for(let q of e)g.newPage(),await this.addArtworkPage(g,q,v??null),T();return t&&(g.newPage(),h?this.addCvProse(g,h):this.addCv(g),T()),i&&(g.newPage(),this.addContact(g,w),T()),g.addPageNumbers(),g.doc}async createStatement(){let e=await this.newWriter(B.a4);return this.addStatement(e),e.doc}async createCV(){await this.cv.refresh();let e=await this.newWriter(B.a4);return e.paragraph(Zt$1,{size:c.size.coverArtist,style:`bold`}),e.space(2),e.paragraph(this.translateService.instant(`cv.placeLine`),{size:c.size.body,color:f.soft}),e.space(8),this.addCv(e),e.doc}async createCvProse(e){let i=await this.newWriter(B.a4);return i.paragraph(Zt$1,{size:c.size.coverArtist,style:`bold`}),i.space(8),this.addCvProse(i,e),i.doc}addCvProse(e,i){this.beginTextColumn(e);for(let t of i.split(/\n{2,}/).filter(a=>a.trim()))e.paragraph(t.trim(),this.textColumnStyle(e)),e.space(3)}async addCover(e,i,t){let{GState:a}=await this.loadJspdf(),r=i[Math.floor(Math.random()*i.length)],p=Jt(await _e(this.artworkService.getNftFetchableUrls(r.image))),{doc:h,pageWidth:v,pageHeight:w,margin:g}=e;h.addImage(p,`JPEG`,0,0,v,w),h.saveGraphicsState(),h.setGState(new a({opacity:.35})),h.setFillColor(`#000000`),h.rect(0,w-72,v,72,`F`),h.restoreGraphicsState(),e.textAt(`JUANMA MORENO SÁNCHEZ`,g,g,{size:c.size.coverArtist,color:f.white,charSpace:c.wideCharSpace}),e.textAt(t||`Portfolio`,g,w-g-10,{size:c.size.coverTitle,color:f.white}),e.textAt(String(new Date().getFullYear()),g,w-g,{size:c.size.caption,color:f.white,charSpace:c.wideCharSpace})}async addArtworkPage(e,i,t$1=null){let{doc:a,pageWidth:r,pageHeight:u,margin:p,contentWidth:h}=e,v=this.availability.isSold(i.tokenId),w=t$1&&!v?Vt({height:this.artworkService.getTraitValue(i,t.HEIGHT),width:this.artworkService.getTraitValue(i,t.WIDTH)},this.artworkService.getTraitValue(i,t.MEDIUM),t$1):null,g=gi+(w===null?0:ze),N=u-2*p-g,T=Ae(await _e(this.artworkService.getNftFetchableUrls(i.image)),h,N),{width:q,height:Ce}=a.getImageProperties(T),re=q/Ce,Y=h,Z=Y/re;Z>N&&(Z=N,Y=Z*re);let me=(r-Y)/2,Q=p+(N-Z)/2;a.addImage(T,`JPEG`,me,Q,Y,Z);let G=u-p-6-(w===null?0:ze),J=G+5;e.textAt(i.name??``,e.centerX,G,{size:c.size.title,style:`italic`,align:`center`});let ee=this.getTraitsAsText(i);if(e.textAt(ee,e.centerX,J,{size:c.size.caption,color:f.soft,align:`center`,charSpace:Se}),v){let Qt=e.textWidth(ee,{size:c.size.caption,charSpace:Se});a.setFillColor(f.accent),a.circle(e.centerX+Qt/2+4,J-1,1.2,`F`);return}w!==null&&e.textAt(jt(w),e.centerX,J+ze,{size:c.size.caption,align:`center`,charSpace:Se})}addCustomText(e,i){this.beginTextColumn(e),e.paragraph(i,this.textColumnStyle(e))}addStatement(e){let i=this.textColumnStyle(e);this.beginTextColumn(e),e.paragraph(this.translateService.instant(xe.introduction.content),i),e.space(8),xe.sections.forEach(t=>{e.ensureRoom(24),e.heading(this.translateService.instant(t.title),{x:i.x}),e.space(2),t.content?.forEach(a=>{e.paragraph(this.translateService.instant(a),i),e.space(3)}),t.items?.forEach(a=>{e.ensureRoom(14),e.paragraph(this.translateService.instant(a.subtitle),s(r({},i),{style:`italic`})),e.paragraph(this.translateService.instant(a.content),s(r({},i),{color:f.soft})),e.space(4)}),e.space(6)})}addCv(e){let t=e.margin+18,a=e.contentWidth-18,r=this.translateService.currentLang()?.startsWith(`es`)?`es`:`en`;fe(this.cv.entries(),r).forEach(u=>{e.ensureRoom(26),e.heading(this.translateService.instant(u.title)),e.space(3),u.items.forEach(p=>{e.ensureRoom(12),e.textAt(String(p.year),e.margin,e.y,{size:c.size.caption,color:f.faint}),e.paragraph(p.title,{x:t,maxWidth:a,style:`italic`,lineHeight:4.8});let h=[p.venue,p.city,this.translateService.instant(p.countryKey)].filter(Boolean).join(`, `);e.paragraph(h,{x:t,maxWidth:a,size:c.size.caption,color:f.soft,lineHeight:4.4}),e.space(3)}),e.space(9)})}addContact(e,i){e.y=70;let t={align:`center`,lineHeight:6};e.heading(this.translateService.instant(`contact.title`),{align:`center`}),e.space(6),e.paragraph(i,t),e.paragraph(`(+34) 635820462`,s(r({},t),{color:f.soft})),e.paragraph(`morenosanchezjuanma@gmail.com`,s(r({},t),{color:f.soft})),e.paragraph(`juanmamoreno.com`,s(r({},t),{color:f.soft})),e.space(14),e.paragraph(this.translateService.instant(`contact.representedBy`),s(r({},t),{size:c.size.caption,color:f.faint})),e.space(2),e.paragraph(`(+34) 606780084`,s(r({},t),{color:f.soft})),e.paragraph(`galeriazunino@gmail.com`,s(r({},t),{color:f.soft})),e.paragraph(`www.galeriazunino.com`,s(r({},t),{color:f.soft}))}beginTextColumn(e){e.space(6)}textColumnStyle(e){return{x:(e.pageWidth-$t)/2,maxWidth:$t,lineHeight:c.lineHeight.body}}getTraitsAsText(e){let i=r=>this.artworkService.getTraitValue(e,r),t$2=this.translateService.instant(i(t.MEDIUM)),a=`${i(t.HEIGHT)} \xD7 ${i(t.WIDTH)} ${i(t.UNIT)}`;return`${i(t.YEAR)} \xB7 ${t$2} \xB7 ${a}`}static{this.ɵfac=function(i){return new(i||n$1)}}static{this.ɵprov=de({token:n$1,factory:n$1.ɵfac,providedIn:`root`})}}return n$1})();function yi(n,o){n&1&&(as(0,`mat-icon`),Ub(1,`assignment`),ou())}function _i(n,o){if(n&1&&xm(0,`mat-progress-spinner`,1),n&2)Nm(`value`,fb().progressPercent())}function wi(n,o){n&1&&xm(0,`mat-progress-spinner`,2)}function Si(n,o){if(n&1&&(as(0,`span`,3),Ub(1),ou()),n&2){let e=fb();aT(),uu(``,e.progressPercent(),`%`)}}var da=(()=>{class n{constructor(){this.translateService=y(H),this.pdfService=y(Yt),this.dialog=y(ee),this.cvProse=y(Zt),this.language=y(y$1),this.snackBar=y(Qt),this.nfts=BV([]),this.downloadFileType=BV(z.IMAGE),this.isCreating=ze$1(!1),this.progress=ze$1(0),this.progressPercent=_t(()=>Math.round(this.progress()*100))}getTooltip(){switch(this.downloadFileType()){case z.CV:return this.translateService.instant(`download.cv`);case z.STATEMENT:return this.translateService.instant(`download.statement`);case z.DOSSIER:return this.translateService.instant(`download.portfolio`);case z.IMAGE:default:return this.translateService.instant(`download.sheet`)}}createPDF(){switch(this.isCreating.set(!0),this.progress.set(0),this.downloadFileType()){case z.CV:this.saveDocument(this.pdfService.createCV(),`cv-juanmamoreno.pdf`);break;case z.STATEMENT:this.saveDocument(this.pdfService.createStatement(),`statement-juanmamoreno.pdf`);break;case z.DOSSIER:this.openDossierDialog();break;case z.IMAGE:default:{let e=this.nfts()[0];this.saveDocument(this.pdfService.createTechnicalSheet(e),`${e.name||`juanmamoreno`}.pdf`);break}}}async openDossierDialog(){let e=(await this.cvProse.read(this.language.inSpanish()?`es`:`en`))?.body??null;this.dialog.open(qt,{data:{includeContact:!0,includeCv:!0,includeStatement:!0,customTitle:``,customText:``,proseAvailable:!!e}}).afterClosed().subscribe(t=>{if(t){let{includeContact:a,includeCv:r,cvAsProse:u,includeStatement:p,customTitle:h,customText:v,prices:w,contactName:g}=t;this.saveDocument(this.pdfService.createDossier(this.nfts(),a,r,p,h,v,N=>this.progress.set(N),u?e:null,w??null,g),`dossier-juanmamoreno.pdf`)}else this.isCreating.set(!1)})}saveDocument(e,i){e.then(t=>{t.save(i),this.showToast(`download.success`)}).catch(()=>this.showToast(`download.error`)).finally(()=>this.isCreating.set(!1))}showToast(e){this.snackBar.open(this.translateService.instant(e),`Ok!`,{duration:3e3,verticalPosition:`top`})}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵcmp=QC({type:n,selectors:[[`app-pdf-button`]],inputs:{nfts:[1,`nfts`],downloadFileType:[1,`downloadFileType`]},decls:5,vars:5,consts:[[`mat-icon-button`,``,`matTooltipPosition`,`below`,3,`click`,`disabled`,`matTooltip`],[`diameter`,`24`,`mode`,`determinate`,3,`value`],[`diameter`,`24`,`mode`,`indeterminate`],[1,`pdf-progress-label`]],template:function(i,t){i&1&&(as(0,`button`,0),jm(`click`,function(){return t.createPDF()}),zw(1,yi,2,0,`mat-icon`)(2,_i,1,1,`mat-progress-spinner`,1)(3,wi,1,0,`mat-progress-spinner`,2),ou(),zw(4,Si,2,1,`span`,3)),i&2&&(Nm(`disabled`,t.isCreating())(`matTooltip`,t.getTooltip()),Sm(`aria-label`,t.getTooltip()),aT(),Qw(t.isCreating()?t.progress()>0?2:3:1),aT(3),Qw(t.isCreating()&&t.progress()>0?4:-1))},dependencies:[T$1,mt,wt,K],styles:[`[_nghost-%COMP%]{display:inline-flex;align-items:center}.pdf-progress-label[_ngcontent-%COMP%]{margin-left:.25rem;font-variant-numeric:tabular-nums}`]})}}return n})();export{da as a,ki as c,xe as d,z as f,Yt as i,tn as l,Pe as n,ei as o,Ut as r,fe as s,Ie as t,ve as u};