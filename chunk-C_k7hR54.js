import{n as s,t as r$1}from"./chunk-Ch7qlBDL.js";import{Ar as si$1,At as Sw,B as Js,Bt as Ud,Cr as qm,D as E_,E as EH,Et as Sb,Fn as fe$1,Hr as vC,Ht as Ve,Mn as fH,Nn as f_,Nt as TH,Pr as t_,R as Iy,Rn as fy,T as E,Tt as ST,Ur as vb,Ut as WE,Vt as Vb,Wn as hf,Wt as Wb,Xn as jb,ar as mb,at as Nw,b as DH,br as pu,bt as R_,ci as ze$1,dr as no,f as C_,fr as ny,gt as Qm,hn as by,hr as ov,i as A_,in as _f,it as Nt,jn as ey,jr as sy,k as Eu,kr as sI,l as Bb,li as zm,lt as Pb,on as _y,rr as mC,s as Av,ti as xv,vr as pf,wn as ds,wt as S,zr as tt,zt as Ub}from"./chunk-DvM41yqF.js";import{o as x,t as J}from"./chunk-DykW0a3M.js";import{p as gs,v as un}from"./chunk-cufinNjd.js";import{C as lt,D as qs,w as me}from"./chunk-BEXVzxAU.js";import{t as e}from"./chunk-CLYsrNE-.js";import{E as vi$1,S as po,c as Yl,f as cr,i as Pe$1,r as Oa,s as Wr,t as Ia,u as ae,y as mo}from"./chunk-BITWdu-0.js";import{B as n$1,F as n,H as r$2,I as E$1,N as $t$1,P as U,T as g,X as de,Y as De,a as k,c as B$1,i as _t,n as wt,w as st,x as V,y as j}from"./main-7QFMPXQH.js";import{d as je,h as ze$2,m as w,n as Ge,o as Ue,p as tt$1,s as Ve$1,u as Zt$1}from"./chunk-cmB3rfBX.js";import{t as Ht$1}from"./chunk-utGvTanL.js";import{t as Le}from"./chunk-TQWV-Nwm.js";import{t as K}from"./chunk-Bf3gSOGK.js";var N;(function(a){a.CV=`cv`,a.STATEMENT=`statement`,a.IMAGE=`image`,a.DOSSIER=`dossier`})(N||(N={}));var yi=[`online`,`spain`,`usa`,`germany`,`mexico`,`italy`,`netherlands`];var Te={solo:`cv.shows.title`,collective:`cv.collectiveShows.title`,award:`cv.awards.title`,conference:`cv.conferences.title`,education:`cv.education.title`};function Ut(a,s){return a?(s===`es`?a.es:void 0)??a.en:``}function fe(a,s){let e=[];for(let t of Object.keys(Te)){let i=a.filter(n=>n.kind===t).map(n=>ti(n,s));i.length&&e.push({kind:t,title:Te[t],items:i})}return e}function ei(a){let s=a.title.en.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,48);return`${a.year}-${s}`}function ti(a,s$1){let e=Ut(a.venue,s$1);return s(r$1(r$1(r$1(r$1({id:a.id,anchor:ei(a),year:a.year,title:Ut(a.title,s$1)},a.titleUrl?{titleUrl:a.titleUrl}:{}),e?{venue:e}:{}),a.venueUrl?{venueUrl:a.venueUrl}:{}),a.city?{city:a.city}:{}),{countryKey:`cv.countries.${a.country}`})}var Ht=[{id:`4790ab4546bf78fb`,kind:`solo`,year:2024,title:{en:`El valle inquietante`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`069fd81d0cccbbc8`,kind:`solo`,year:2021,title:{en:`El sueño de los robots`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`ab3d09a718504872`,kind:`solo`,year:2019,title:{en:`33. El desengaño`},venue:{en:`La 13 dada trouch Gallery`},city:`Huelva`,country:`spain`},{id:`e2d006becf81f950`,kind:`solo`,year:2018,title:{en:`#blessed`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`b37386b8cd2eedd1`,kind:`solo`,year:2017,title:{en:`I was there`},venue:{en:`La silla eléctrica`},city:`Sevilla`,country:`spain`},{id:`62266b50fc6ab279`,kind:`solo`,year:2016,title:{en:`Never Gone Forever`},venue:{en:`Gallo Rojo`},city:`Sevilla`,country:`spain`},{id:`5dfbf4e1d333f63b`,kind:`solo`,year:2014,title:{en:`Pintura Aumentada`},venue:{en:`Red House`},city:`Sevilla`,country:`spain`},{id:`38dc378c84cc92dd`,kind:`solo`,year:2013,title:{en:`Historias aparentemente inconexas`},venue:{en:`Aula Magna de Capuchinos`},city:`Alcalá la Real`,country:`spain`},{id:`8f6f6f3da32a1586`,kind:`solo`,year:2013,title:{en:`Juanma Moreno`},venue:{en:`No-Lugar`},city:`Sevilla`,country:`spain`},{id:`22449c295542bd10`,kind:`solo`,year:2008,title:{en:`Transeúntes`},venue:{en:`Harz Mensa`},city:`Halle Saale`,country:`germany`},{id:`8c14c79b08f38bce`,kind:`collective`,year:2026,title:{en:`Outsiders Vol. 3`},venue:{en:`Zunino Gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`},{id:`d65a223cc30814d5`,kind:`collective`,year:2026,title:{en:`Intercambios/Exchanges`},venue:{en:`Instituto Cervantes`},city:`Utrecht`,country:`netherlands`},{id:`e522aa4bc418dd99`,kind:`collective`,year:2025,title:{en:`Outsiders Vol. 2`},venue:{en:`Zunino Gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`},{id:`1c6b1a0396dd55e5`,kind:`collective`,year:2024,title:{en:`Outsiders. Vol. 1`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`569775435cb39ae2`,kind:`collective`,year:2024,title:{en:`Anna Jonsson & Juanma Moreno`},venue:{en:`El Estudio de Ignacio del Río`},city:`Villanueva del Rosario`,country:`spain`},{id:`c45534b738716510`,kind:`collective`,year:2023,title:{en:`Pintores pensando la pintura`},venue:{en:`Espacio 75 Art Gallery`},city:`Madrid`,country:`spain`,venueUrl:`https://www.espacio75.com/`},{id:`a5f32ad8a66500b3`,kind:`collective`,year:2023,title:{en:`Nocturnos`},venue:{en:`Sala Pescadería Vieja / CAC Vélez-Málaga`},city:`Jerez de la Frontera / Vélez-Málaga`,country:`spain`},{id:`cf3e6d8f3a2b26f5`,kind:`collective`,year:2023,title:{en:`Los únicos que saben de arte son los artistas`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`6b3530832ba03756`,kind:`collective`,year:2022,title:{en:`Discovery Art Fair Cologne`},city:`Cologne`,country:`germany`,titleUrl:`https://discoveryartfair.com/fairs/koeln/`},{id:`9dd6662d24b96d31`,kind:`collective`,year:2021,title:{en:`Lucca Art Fair`},country:`online`,titleUrl:`https://www.luccaartfair.com/`},{id:`b30ad80ca6893f41`,kind:`collective`,year:2021,title:{en:`Figuración Fantástica Sevillana`},venue:{en:`Galería Impulso`},city:`Querétaro`,country:`mexico`,venueUrl:`https://impulsogaleria.com/en/home/`},{id:`914b9e1a7c8ac6cd`,kind:`collective`,year:2020,title:{en:`Interpaisajes`},venue:{en:`Eldevenir & Zunino Gallery`},country:`online`,venueUrl:`https://www.eldevenirartgallery.com/`},{id:`fdc3ccc88436e541`,kind:`collective`,year:2019,title:{en:`72 horas`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`a9114df8e5260755`,kind:`collective`,year:2019,title:{en:`Homenaje a Dolores Montijano`},venue:{en:`Aula Magna de Capuchinos`},city:`Alcalá la Real`,country:`spain`},{id:`99009cdeb333423c`,kind:`collective`,year:2019,title:{en:`Redes de fe`},venue:{en:`Galería Renace Art`},city:`Jaen`,country:`spain`},{id:`ce090999a3275899`,kind:`collective`,year:2018,title:{en:`Todo encaja`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`df6d0387fe24922f`,kind:`collective`,year:2017,title:{en:`Lodo`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`7b037cec06674222`,kind:`collective`,year:2015,title:{en:`Escozor`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`e34e5fd749f45d4e`,kind:`collective`,year:2015,title:{en:`A paloma muerta`},venue:{en:`Estudio22`},city:`Logroño`,country:`spain`,venueUrl:`http://estudio22photo.es`},{id:`843aef3ba369776d`,kind:`collective`,year:2015,title:{en:`Nemoart festival, digital art`},venue:{en:`Casa Museo Niceto Alcalá Zamora`},city:`Priego de Córdoba`,country:`spain`},{id:`ff786c2209fc2396`,kind:`collective`,year:2015,title:{en:`Promoción equis`},venue:{en:`Cienfuegos`},city:`Málaga`,country:`spain`},{id:`8bd6f86416fff5e1`,kind:`collective`,year:2015,title:{en:`En azúcar de sandía`},venue:{en:`Suricatta Gallery`},city:`Jerez de la Frontera`,country:`spain`},{id:`2cd55ee718ff78c7`,kind:`collective`,year:2014,title:{en:`El tamaño no importa`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`14135e1bc3b528c4`,kind:`collective`,year:2014,title:{en:`MULTI/TUTTI/FEST`},venue:{en:`Cienfuegos`},city:`Málaga`,country:`spain`},{id:`201762d23308702b`,kind:`collective`,year:2013,title:{en:`Plato del día`},venue:{en:`Red House`},city:`Sevilla`,country:`spain`},{id:`84302a3a85a36dbf`,kind:`collective`,year:2013,title:{en:`Lo mejorcito de cada casa`},venue:{en:`No-Lugar`},city:`Sevilla`,country:`spain`},{id:`b3c985d47cd09ae1`,kind:`collective`,year:2011,title:{en:`Weisser TV`},venue:{en:`129 Gallery`},city:`Berlin`,country:`germany`,venueUrl:`https://www.129gallery.com/`},{id:`c711555116950f0e`,kind:`collective`,year:2011,title:{en:`Mehr Licht, tributo a Chema Alvargonzalez`},venue:{en:`GlogauAIR Project Space`},city:`Berlin`,country:`germany`,venueUrl:`https://glogauair.net/`},{id:`52a410152fecfa68`,kind:`collective`,year:2011,title:{en:`Modern Classic, influence of the past in today's art`},venue:{en:`Your Mum`},city:`Berlin`,country:`germany`},{id:`9e88fbd95cf01e1c`,kind:`collective`,year:2010,title:{en:`The Mac Gyver Problem`},venue:{en:`Galerie im Regierungsviertel/The Forgotten Bar`},city:`Berlin`,country:`germany`},{id:`e1e9774529367700`,kind:`collective`,year:2009,title:{en:`XXL-Art, nuevas tendencias de la figuración en gran formato`},venue:{en:`Damián Bayón Art Center`},city:`Santa Fe`,country:`spain`},{id:`74fb42dad98e9fd9`,kind:`collective`,year:2009,title:{en:`La más elegante del invernadero III`},venue:{en:`Galería Jesús Puerto`},city:`Granada`,country:`spain`},{id:`5a950bf5bd6ff563`,kind:`award`,year:2014,title:{en:`The Pollock-Krasner Foundation award`},city:`New York`,country:`usa`,titleUrl:`http://www.pkf.org/`},{id:`3462becaf15896df`,kind:`award`,year:2012,title:{en:`Antonio Gala Foundation Residence Program`,es:`Fundación Antonio Gala para jóvenes creadores`},city:`Córdoba`,country:`spain`,titleUrl:`http://www.fundacionantoniogala.org/`},{id:`0eb0bef9af46c8f3`,kind:`award`,year:2010,title:{en:`GlogauAIR Residence Program`},city:`Berlín`,country:`germany`,titleUrl:`http://www.glogauair.net/`},{id:`d58024d99289fbd0`,kind:`award`,year:2006,title:{en:`Lefranc&Bourgueois art award`,es:`Becas Lefranc&Bourgueois`},city:`Granada`,country:`spain`},{id:`090493feed6a82de`,kind:`conference`,year:2025,title:{en:`Towards a New AI Winter`,es:`¿Hacia un nuevo invierno de la IA?`},venue:{en:`International University of Andalucia`,es:`Universidad Internacional de Andalucía`},city:`Baeza`,country:`spain`,titleUrl:`https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas`,venueUrl:`https://www.unia.es/`},{id:`8fd481e74a1e6942`,kind:`education`,year:2009,title:{en:`Bachelor on arts degree`,es:`Licenciado en Bellas Artes`},venue:{en:`University of Granada`,es:`Universidad de Granada`},city:`Granada`,country:`spain`,venueUrl:`http://bellasartes.ugr.es/`},{id:`5b24c76e7cb1538f`,kind:`education`,year:2008,title:{en:`LLP Erasmus Scholarship`,es:`Beca LLP Erasmus`},venue:{en:`Burg Giebichenstein, Hochschule für Kunst und Design`},city:`Halle Saale`,country:`germany`,venueUrl:`http://www.burg-halle.de/`}];var ve=(()=>{class a{constructor(){this.http=E(un),this.auth=E(B$1),this.isBrowser=gs(E(WE)),this.known=ze$1(Ht),this.asked=null,this.entries=Nt(()=>this.known())}async refresh(){if(this.isBrowser)return this.asked??=this.ask(),this.asked}async create(e$1){await Av(this.http.post(`${e.backendUrl}cv/entries`,e$1,this.asHim())),await this.reread()}async update(e$2,t){await Av(this.http.put(`${e.backendUrl}cv/entries/${e$2}`,t,this.asHim())),await this.reread()}async remove(e$3){await Av(this.http.delete(`${e.backendUrl}cv/entries/${e$3}`,this.asHim())),await this.reread()}async reread(){return this.asked=this.ask(),this.asked}asHim(){let e=this.auth.bearerToken();return{headers:e?{Authorization:`Bearer ${e}`}:{}}}async ask(){try{let t=(await Av(this.http.get(`${e.backendUrl}cv/entries`)))?.data?.entries;Array.isArray(t)&&t.length&&this.known.set(t)}catch{}}static{this.ɵfac=function(t){return new(t||a)}}static{this.ɵprov=fe$1({token:a,factory:a.ɵfac,providedIn:`root`})}}return a})();var Ie={introduction:{content:`statement.introduction.content`},sections:[{title:`statement.painting.title`,content:[`statement.painting.limits`,`statement.painting.recontextualising`,`statement.painting.rule`]},{title:`statement.images.title`,content:[`statement.images.found`,`statement.images.accident`]},{title:`statement.failure.title`,content:[`statement.failure.content`]}]};var ii=new S(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var be=class{source;checked;constructor(s,e){this.source=s,this.checked=e}};var ze=(()=>{class a{_elementRef=E(no);_focusMonitor=E(lt);_changeDetectorRef=E(EH);defaults=E(ii);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new be(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=qs();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new tt;toggleChange=new tt;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){E(x).load(de);let e=E(new ov(`tabindex`),{optional:!0}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||`accent`,this.id=this._uniqueId=E(me).getId(`mat-mdc-slide-toggle-`),this.hideIcon=t.hideIcon??!1,this.disabledInteractive=t.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new be(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(t){return new(t||a)};static ɵcmp=(function(){let e=[`switch`],t=[`*`];function i(n,o){n&1&&(ds(0,`span`,11),_f(),ds(1,`svg`,13),Qm(2,`path`,14),pu(),ds(3,`svg`,15),Qm(4,`path`,16),pu()())}return mC({type:a,selectors:[[`mat-slide-toggle`]],viewQuery:function(o,c){if(o&1&&sy(e,5),o&2){let m;Bb(m=Ub())&&(c._switchElement=m.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(o,c){o&2&&(ey(`id`,c.id),qm(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),t_(c.color?`mat-`+c.color:``),fy(`mat-mdc-slide-toggle-focused`,c._focused)(`mat-mdc-slide-toggle-checked`,c.checked)(`mat-slide-toggle-full-width`,c.fullWidth)(`_mat-animation-noopable`,c._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,DH],color:`color`,disabled:[2,`disabled`,`disabled`,DH],fullWidth:[2,`fullWidth`,`fullWidth`,DH],disableRipple:[2,`disableRipple`,`disableRipple`,DH],tabIndex:[2,`tabIndex`,`tabIndex`,n=>n==null?0:TH(n)],checked:[2,`checked`,`checked`,DH],hideIcon:[2,`hideIcon`,`hideIcon`,DH],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,DH]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[C_([{provide:Pe$1,useExisting:si$1(()=>a),multi:!0},{provide:ae,useExisting:a,multi:!0}]),sI],ngContentSelectors:t,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(o,c){if(o&1&&(jb(),ds(0,`div`,1)(1,`button`,2,0),ny(`click`,function(){return c._handleClick()}),Qm(3,`div`,3)(4,`span`,4),ds(5,`span`,5)(6,`span`,6)(7,`span`,7),Qm(8,`span`,8),pu(),ds(9,`span`,9),Qm(10,`span`,10),pu(),mb(11,i,5,0,`span`,11),pu()()(),ds(12,`label`,12),ny(`click`,function(p){return p.stopPropagation()}),Vb(13),pu()()),o&2){let m=Wb(2);zm(`labelPosition`,c.labelPosition),ST(),fy(`mdc-switch--selected`,c.checked)(`mdc-switch--unselected`,!c.checked)(`mdc-switch--checked`,c.checked)(`mdc-switch--disabled`,c.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,c.disabledInteractive),zm(`tabIndex`,c.disabled&&!c.disabledInteractive?-1:c.tabIndex)(`disabled`,c.disabled&&!c.disabledInteractive),qm(`id`,c.buttonId)(`name`,c.name)(`aria-label`,c.ariaLabel)(`aria-labelledby`,c._getAriaLabelledBy())(`aria-describedby`,c.ariaDescribedby)(`aria-required`,c.required||null)(`aria-checked`,c.checked)(`aria-disabled`,c.disabled&&c.disabledInteractive?`true`:null),ST(9),zm(`matRippleTrigger`,m)(`matRippleDisabled`,c.disableRipple||c.disabled)(`matRippleCentered`,!0),ST(),vb(c.hideIcon?-1:11),ST(),zm(`for`,c.buttonId),qm(`id`,c._labelId)}},dependencies:[De,g],styles:[`.mdc-switch {
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
`],encapsulation:2})})()}return a})();var Qi=(()=>{class a{static ɵfac=function(t){return new(t||a)};static ɵmod=vC({type:a});static ɵinj=Ud({imports:[ze,J]})}return a})();function ai(a){let s=String(a??``).toLowerCase();return[`watercolor`,`watercolour`,`drawing`,`gouache`,`ink`,`pencil`,`charcoal`].some(t=>s.includes(t))?`paper`:`painting`}function Gt(a){let s=Number.parseFloat(String(a??``).replace(`,`,`.`));return Number.isFinite(s)?s:NaN}function we(a){return Number.isFinite(a)&&a>0}function Vt(a,s,e){let t=Gt(a.height),i=Gt(a.width);if(!Number.isFinite(t)||!Number.isFinite(i))return null;let n=e[ai(s)];return we(n)?Math.round((t+i)*n):null}function jt(a){return`${String(Math.round(a)).replace(/\B(?=(\d{3})+(?!\d))/g,`\xA0`)} \u20AC`}function ni(a,s){if(a&1){let e=Sb();ds(0,`div`,4)(1,`mat-form-field`,7)(2,`mat-label`),f_(3),A_(4,`translate`),pu(),ds(5,`input`,8),Nw(),_y(`ngModelChange`,function(i){pf(e);let n=Pb();return E_(n.contactName,i)||(n.contactName=i),hf(i)}),pu()()()}if(a&2){let e=Pb();ST(3),Iy(R_(4,3,`dossier.contactName`)),ST(2),by(`ngModel`,e.contactName),zm(`placeholder`,e.defaultName),Sw()}}function si(a,s){if(a&1){let e=Sb();ds(0,`mat-slide-toggle`,13),Nw(),_y(`ngModelChange`,function(i){pf(e);let n=Pb();return E_(n.cvAsProse,i)||(n.cvAsProse=i),hf(i)}),f_(1),A_(2,`translate`),pu()}if(a&2){let e=Pb();by(`ngModel`,e.cvAsProse),Sw(),ST(),Eu(` `,R_(2,2,`cv.proseInDossier`),` `)}}function oi(a,s){a&1&&(ds(0,`p`,16),f_(1),A_(2,`translate`),pu()),a&2&&(ST(),Eu(` `,R_(2,1,`dossier.multiplierProblem`),` `))}function ci(a,s){if(a&1){let e=Sb();ds(0,`div`,6)(1,`mat-form-field`,7)(2,`mat-label`),f_(3),A_(4,`translate`),pu(),ds(5,`input`,14),Nw(),_y(`ngModelChange`,function(i){pf(e);let n=Pb();return E_(n.paintingMultiplier,i)||(n.paintingMultiplier=i),hf(i)}),pu()(),ds(6,`mat-form-field`,7)(7,`mat-label`),f_(8),A_(9,`translate`),pu(),ds(10,`input`,14),Nw(),_y(`ngModelChange`,function(i){pf(e);let n=Pb();return E_(n.paperMultiplier,i)||(n.paperMultiplier=i),hf(i)}),pu()(),ds(11,`p`,15),f_(12),A_(13,`translate`),pu(),mb(14,oi,3,3,`p`,16),pu()}if(a&2){let e=Pb();ST(3),Iy(R_(4,6,`dossier.paintingMultiplier`)),ST(2),by(`ngModel`,e.paintingMultiplier),Sw(),ST(3),Iy(R_(9,8,`dossier.paperMultiplier`)),ST(2),by(`ngModel`,e.paperMultiplier),Sw(),ST(2),Iy(R_(13,10,`dossier.multiplierHint`)),ST(2),vb(e.multipliersUsable?-1:14)}}var Zt=(()=>{class a{constructor(){this.customTitle=``,this.customText=``,this.includeContact=!1,this.contactName=``,this.defaultName=Ue,this.includeCv=!1,this.cvAsProse=!1,this.includeStatement=!1,this.isSubmitting=!1,this.includePrices=!1,this.paintingMultiplier=11,this.paperMultiplier=11,this.dialogRef=E(w),this.data=E(Zt$1,{optional:!0})??{proseAvailable:!1}}get multipliersUsable(){return we(Number(this.paintingMultiplier))&&we(Number(this.paperMultiplier))}get canSubmit(){return!this.isSubmitting&&(!this.includePrices||this.multipliersUsable)}submit(){this.isSubmitting=!0;let e={contactName:this.contactName.trim()||`Juanma Moreno Sánchez`,customTitle:this.customTitle,customText:this.customText,includeContact:this.includeContact,includeCv:this.includeCv,cvAsProse:this.cvAsProse,includeStatement:this.includeStatement,prices:this.includePrices?{painting:Number(this.paintingMultiplier),paper:Number(this.paperMultiplier)}:null};this.dialogRef.close(e)}static{this.ɵfac=function(t){return new(t||a)}}static{this.ɵcmp=mC({type:a,selectors:[[`app-dossier-options-modal`]],decls:47,vars:49,consts:[[`mat-dialog-title`,``],[1,`form-group`],[1,`pdf-options-group`],[3,`ngModelChange`,`ngModel`],[1,`pdf-options-nested`],[1,`pdf-options-nested`,3,`ngModel`],[1,`pdf-options-nested`,`pdf-multipliers`],[`appearance`,`outline`],[`matInput`,``,3,`ngModelChange`,`ngModel`,`placeholder`],[`matInput`,``,`rows`,`4`,3,`ngModelChange`,`ngModel`,`placeholder`],[`align`,`end`],[`mat-button`,``,`mat-dialog-close`,``],[`mat-raised-button`,``,`color`,`primary`,3,`click`,`disabled`],[1,`pdf-options-nested`,3,`ngModelChange`,`ngModel`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`0.1`,3,`ngModelChange`,`ngModel`],[1,`pdf-options-hint`],[`role`,`alert`,1,`pdf-options-problem`]],template:function(t,i){t&1&&(ds(0,`h2`,0),f_(1),A_(2,`translate`),pu(),ds(3,`mat-dialog-content`)(4,`div`,1)(5,`div`,2)(6,`mat-slide-toggle`,3),Nw(),_y(`ngModelChange`,function(o){return E_(i.includeContact,o)||(i.includeContact=o),o}),f_(7),A_(8,`translate`),pu(),mb(9,ni,6,5,`div`,4),pu(),ds(10,`div`,2)(11,`mat-slide-toggle`,3),Nw(),_y(`ngModelChange`,function(o){return E_(i.includeCv,o)||(i.includeCv=o),o}),f_(12),A_(13,`translate`),pu(),mb(14,si,3,4,`mat-slide-toggle`,5),pu(),ds(15,`div`,2)(16,`mat-slide-toggle`,3),Nw(),_y(`ngModelChange`,function(o){return E_(i.includeStatement,o)||(i.includeStatement=o),o}),f_(17),A_(18,`translate`),pu()(),ds(19,`div`,2)(20,`mat-slide-toggle`,3),Nw(),_y(`ngModelChange`,function(o){return E_(i.includePrices,o)||(i.includePrices=o),o}),f_(21),A_(22,`translate`),pu(),mb(23,ci,15,12,`div`,6),pu(),ds(24,`div`,2)(25,`mat-form-field`,7)(26,`mat-label`),f_(27),A_(28,`translate`),pu(),ds(29,`input`,8),A_(30,`translate`),Nw(),_y(`ngModelChange`,function(o){return E_(i.customTitle,o)||(i.customTitle=o),o}),pu()()(),ds(31,`div`,2)(32,`mat-form-field`,7)(33,`mat-label`),f_(34),A_(35,`translate`),pu(),ds(36,`textarea`,9),A_(37,`translate`),Nw(),_y(`ngModelChange`,function(o){return E_(i.customText,o)||(i.customText=o),o}),pu()()()()(),ds(38,`mat-dialog-actions`,10)(39,`button`,11),A_(40,`translate`),f_(41),A_(42,`translate`),pu(),ds(43,`button`,12),A_(44,`translate`),ny(`click`,function(){return i.submit()}),f_(45),A_(46,`translate`),pu()()),t&2&&(ST(),Iy(R_(2,23,`dossier.title`)),ST(5),by(`ngModel`,i.includeContact),Sw(),ST(),Eu(` `,R_(8,25,`dossier.includeContact`),` `),ST(2),vb(i.includeContact?9:-1),ST(2),by(`ngModel`,i.includeCv),Sw(),ST(),Iy(R_(13,27,`dossier.includeCv`)),ST(2),vb(i.includeCv&&i.data.proseAvailable?14:-1),ST(2),by(`ngModel`,i.includeStatement),Sw(),ST(),Eu(` `,R_(18,29,`dossier.includeStatement`),` `),ST(3),by(`ngModel`,i.includePrices),Sw(),ST(),Eu(` `,R_(22,31,`dossier.includePrices`),` `),ST(2),vb(i.includePrices?23:-1),ST(4),Iy(R_(28,33,`dossier.customTitle`)),ST(2),by(`ngModel`,i.customTitle),zm(`placeholder`,R_(30,35,`dossier.customTitlePlaceholder`)),Sw(),ST(5),Iy(R_(35,37,`dossier.customText`)),ST(2),by(`ngModel`,i.customText),zm(`placeholder`,R_(37,39,`dossier.customTextPlaceholder`)),Sw(),ST(3),qm(`aria-label`,R_(40,41,`cancel`)),ST(2),Eu(` `,R_(42,43,`cancel`),` `),ST(2),zm(`disabled`,!i.canSubmit),qm(`aria-label`,R_(44,45,`download.portfolio`)),ST(2),Eu(` `,R_(46,47,`download.portfolio`),` `))},dependencies:[ze$2,Ve$1,ze,Oa,vi$1,po,Ia,Wr,mo,Yl,cr,Le,Ge,st,je,$t$1],styles:[`.pdf-options-group[_ngcontent-%COMP%]{margin-bottom:1em;width:100%}.pdf-multipliers[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.75rem}.pdf-multipliers[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 8rem;min-width:0}.pdf-options-hint[_ngcontent-%COMP%], .pdf-options-problem[_ngcontent-%COMP%]{flex-basis:100%;margin:0;font-size:.75rem;line-height:1.4}.pdf-options-hint[_ngcontent-%COMP%]{color:var(--%NS%catalog-soft)}.pdf-options-problem[_ngcontent-%COMP%]{color:#b3261e}`]})}}return a})();var qt=(()=>{class a{constructor(){this.http=E(un),this.translate=E(U),this.auth=E(B$1),this.cv=E(ve)}read(e$4){return Av(this.http.get(`${e.backendUrl}cv/prose/${e$4}`).pipe(Ve(t=>t?.data??null),Js(()=>xv(null))))}write(e$5){let t=this.auth.bearerToken();return Av(this.http.post(`${e.backendUrl}cv/prose`,{lang:e$5,list:this.asList()},{headers:t?{Authorization:`Bearer ${t}`}:{}}).pipe(Ve(i=>i.data)))}asList(){let e=this.translate.currentLang()?.startsWith(`es`)?`es`:`en`;return fe(this.cv.entries(),e).map(t=>{let i=t.items.map(n=>{let o=[n.venue,n.city,this.translate.instant(n.countryKey)].filter(Boolean).join(`, `);return`${n.year} \u2014 ${n.title}${o?`, ${o}`:``}`});return`${this.translate.instant(t.title)}
${i.join(`
`)}`}).join(`

`)}static{this.ɵfac=function(t){return new(t||a)}}static{this.ɵprov=fe$1({token:a,factory:a.ɵfac,providedIn:`root`})}}return a})();var Ae=11.811023622047244;function ri(a){return new Promise((s,e)=>{let t=new Image;t.crossOrigin=`anonymous`,t.src=a,t.onload=()=>s(t),t.onerror=()=>e(new Error(`Could not load image: ${a}`))})}async function _e(a){for(let s of a)try{return await ri(s)}catch{}throw new Error(`No image source could be loaded.`)}function li(a,s,e){let t=a.width/a.height,i=Math.min(a.width,s*Ae),n=i/t;return n>e*Ae&&(n=e*Ae,i=n*t),{width:i,height:n}}function Pe(a,s,e,t=.8){let{width:i,height:n}=li(a,s,e);return di(a,i,n).toDataURL(`image/jpeg`,t)}function $t(a,s=1200,e=2.2){let t=Math.min(a.width,a.height)/e,i=(a.width-t)*Math.random(),n=(a.height-t)*Math.random(),o=document.createElement(`canvas`);o.width=s,o.height=s;let c=o.getContext(`2d`);c.drawImage(a,i,n,t,t,0,0,s,s);let m=c.getImageData(0,0,s,s),p=m.data;for(let v=0;v<p.length;v+=4){let y=.299*p[v]+.587*p[v+1]+.114*p[v+2];p[v]=p[v+1]=p[v+2]=y}return c.putImageData(m,0,0),o.toDataURL(`image/jpeg`,.82)}function di(a,s,e){let t=document.createElement(`canvas`);return t.width=s,t.height=e,t.getContext(`2d`).drawImage(a,0,0,s,e),t}var B={format:[210,210],a4:[210,297],margin:24};var f={ink:`#1f1f1f`,soft:`#6e6e6e`,faint:`#a3a3a3`,white:`#ffffff`,accent:`#cf2525`};var r={font:`helvetica`,size:{coverTitle:27,coverArtist:10,heading:11,title:11,body:9.5,caption:8.5,small:7.5},lineHeight:{body:5.4,caption:4.4,heading:7},wideCharSpace:1.6};var ye=class a{constructor(s,e=B.format){this.doc=new s({unit:`mm`,format:e}),this.y=B.margin}get margin(){return B.margin}get pageWidth(){return this.doc.internal.pageSize.getWidth()}get pageHeight(){return this.doc.internal.pageSize.getHeight()}get contentWidth(){return this.pageWidth-2*this.margin}get centerX(){return this.pageWidth/2}newPage(){this.doc.addPage(),this.y=this.margin}ensureRoom(s){this.y+s>this.pageHeight-this.margin&&this.newPage()}space(s){this.y+=s}paragraph(s,e={}){let{charSpace:t=0,lineHeight:i=r.lineHeight.body,align:n=`left`,maxWidth:o=this.contentWidth}=e;this.applyStyle(e);let c=e.x??(n===`center`?this.centerX:this.margin),m=this.doc.splitTextToSize(a.stripHtml(s),o);for(let p of m)this.ensureRoom(i),this.drawLine(p,c,this.y,n,t),this.y+=i}heading(s,e={}){this.paragraph(s.toUpperCase(),r$1({size:r.size.heading,color:f.soft,charSpace:r.wideCharSpace,lineHeight:r.lineHeight.heading},e))}textAt(s,e,t,i={}){this.applyStyle(i),this.drawLine(a.stripHtml(s),e,t,i.align??`left`,i.charSpace??0)}textWidth(s,e={}){this.applyStyle(e);let t=a.stripHtml(s);return this.doc.getTextWidth(t)+(e.charSpace??0)*Math.max(t.length-1,0)}addPageNumbers(s=!0){let e=this.doc.getNumberOfPages();for(let t=s?2:1;t<=e;t++)this.doc.setPage(t),this.applyStyle({size:r.size.small,color:f.faint}),this.doc.text(String(t-(s?1:0)),this.centerX,this.pageHeight-9,{align:`center`});this.doc.setPage(e)}applyStyle({size:s=r.size.body,style:e=`normal`,color:t=f.ink}){this.doc.setFont(r.font,e),this.doc.setFontSize(s),this.doc.setTextColor(t)}drawLine(s,e,t,i,n){if(i===`center`&&n>0){let o=this.doc.getTextWidth(s)+n*Math.max(s.length-1,0);this.doc.text(s,e-o/2,t,{charSpace:n})}else this.doc.text(s,e,t,{align:i,charSpace:n})}static stripHtml(s){return s.replace(/<[^>]*(>|$)/g,``).trim()}};var mi=16;var Ee=5;var Se=.4;var Jt=130;var hi=.92;var ne=140;var gi=70;var O=7;var Yt=3;var pi=12;var Kt=(()=>{class a{constructor(){this.artworkService=E(n),this.translateService=E(U),this.availability=E(k),this.cv=E(ve)}async loadJspdf(){return this.jspdf??=await import(`./chunk-D91YYmWj.js`).then(n=>n.t)}async newWriter(e){let{jsPDF:t}=await this.loadJspdf();return new ye(t,e)}async createTechnicalSheet(e){let t=await this.newWriter(B.a4);return await this.addArtworkPage(t,e),t.doc}async createCertificate(e,t){let i=await this.newWriter(B.a4),{doc:n,pageWidth:o,contentWidth:c}=i,m=($,ee)=>this.translateService.instant($,ee),p=t?this.certificateDate(t.mintedAt):null,v=p?m(`certificate.recordedOn`,{date:p}):m(`certificate.recorded`),y=m(`certificate.onlyAuthorship`),u=this.getTraitsAsText(e),x=[[m(`certificate.token`),`#${e.tokenId}`],[m(`certificate.contract`),n$1],...t?[[m(`certificate.transaction`),t.txHash]]:[]],se=this.heightOf(i,e.name??``,r.size.title,c)+this.heightOf(i,u,r.size.caption,c)+O+this.heightOf(i,v,r.size.body,ne)+O+x.length*(r.lineHeight.caption*2+Yt)+O+this.heightOf(i,y,r.size.small,ne)+pi,M=i.pageHeight-2*i.margin-r.lineHeight.heading-O-O,Z=Math.max(gi,M-se);i.heading(m(`certificate.pdfHeading`),{align:`center`}),i.space(O);let oe=Pe(await _e(this.artworkService.getNftFetchableUrls(e.image)),c,Z,hi),{width:K,height:q}=n.getImageProperties(oe),me=K/q,Q=c,G=Q/me;G>Z&&(G=Z,Q=G*me),n.addImage(oe,`JPEG`,(o-Q)/2,i.y,Q,G),i.space(G+O),i.paragraph(e.name??``,{size:r.size.title,style:`italic`,align:`center`}),i.paragraph(u,{size:r.size.caption,color:f.soft,align:`center`,charSpace:Se}),i.space(O),i.paragraph(v,{size:r.size.body,maxWidth:ne,x:(o-ne)/2}),i.space(O);for(let[$,ee]of x)this.certificateFact(i,$,ee);return i.space(O),i.paragraph(y,{size:r.size.small,color:f.soft,maxWidth:ne,x:(o-ne)/2}),i.textAt(`${E$1}/${e.tokenId}`,i.centerX,i.pageHeight-i.margin,{size:r.size.small,color:f.faint,align:`center`}),i.doc}heightOf(e,t,i,n){e.doc.setFontSize(i);let o=e.doc.splitTextToSize(t,n),c=i>=r.size.body?r.lineHeight.body:r.lineHeight.caption;return o.length*c}certificateFact(e,t,i){e.paragraph(t.toUpperCase(),{size:r.size.small,color:f.faint,charSpace:r.wideCharSpace,align:`center`}),e.paragraph(i,{size:r.size.caption,color:f.ink,align:`center`}),e.space(Yt)}certificateDate(e){let t=this.translateService.currentLang()?.startsWith(`es`);return new Intl.DateTimeFormat(t?`es-ES`:`en-GB`,{day:`numeric`,month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(e))}async createDossier(e,t,i,n,o,c,m,p,v,y=Ue){i&&await this.cv.refresh();let u=await this.newWriter(),x=1+(c?1:0)+(n?1:0)+e.length+(i?1:0)+(t?1:0),se=0,M=()=>m?.(++se/x);await this.addCover(u,e,o),M(),c&&(u.newPage(),this.addCustomText(u,c),M()),n&&(u.newPage(),this.addStatement(u),M());for(let Z of e)u.newPage(),await this.addArtworkPage(u,Z,v??null),M();return i&&(u.newPage(),p?this.addCvProse(u,p):this.addCv(u),M()),t&&(u.newPage(),this.addContact(u,y),M()),u.addPageNumbers(),u.doc}async createStatement(){let e=await this.newWriter(B.a4);return this.addStatement(e),e.doc}async createCV(){await this.cv.refresh();let e=await this.newWriter(B.a4);return e.paragraph(Ue,{size:r.size.coverArtist,style:`bold`}),e.space(2),e.paragraph(this.translateService.instant(`cv.placeLine`),{size:r.size.body,color:f.soft}),e.space(8),this.addCv(e),e.doc}async createCvProse(e){let t=await this.newWriter(B.a4);return t.paragraph(Ue,{size:r.size.coverArtist,style:`bold`}),t.space(8),this.addCvProse(t,e),t.doc}addCvProse(e,t){this.beginTextColumn(e);for(let i of t.split(/\n{2,}/).filter(n=>n.trim()))e.paragraph(i.trim(),this.textColumnStyle(e)),e.space(3)}async addCover(e,t,i){let{GState:n}=await this.loadJspdf(),o=t[Math.floor(Math.random()*t.length)],m=$t(await _e(this.artworkService.getNftFetchableUrls(o.image))),{doc:p,pageWidth:v,pageHeight:y,margin:u}=e;p.addImage(m,`JPEG`,0,0,v,y),p.saveGraphicsState(),p.setGState(new n({opacity:.35})),p.setFillColor(`#000000`),p.rect(0,y-72,v,72,`F`),p.restoreGraphicsState(),e.textAt(`JUANMA MORENO SÁNCHEZ`,u,u,{size:r.size.coverArtist,color:f.white,charSpace:r.wideCharSpace}),e.textAt(i||`Portfolio`,u,y-u-10,{size:r.size.coverTitle,color:f.white}),e.textAt(String(new Date().getFullYear()),u,y-u,{size:r.size.caption,color:f.white,charSpace:r.wideCharSpace})}async addArtworkPage(e,t,i=null){let{doc:n,pageWidth:o,pageHeight:c,margin:m,contentWidth:p}=e,v=this.availability.isSold(t.tokenId),y=i&&!v?Vt({height:this.artworkService.getTraitValue(t,r$2.HEIGHT),width:this.artworkService.getTraitValue(t,r$2.WIDTH)},this.artworkService.getTraitValue(t,r$2.MEDIUM),i):null,u=mi+(y===null?0:Ee),x=c-2*m-u,M=Pe(await _e(this.artworkService.getNftFetchableUrls(t.image)),p,x),{width:Z,height:ke}=n.getImageProperties(M),oe=Z/ke,K=p,q=K/oe;q>x&&(q=x,K=q*oe);let me=(o-K)/2,Q=m+(x-q)/2;n.addImage(M,`JPEG`,me,Q,K,q);let G=c-m-6-(y===null?0:Ee),$=G+5;e.textAt(t.name??``,e.centerX,G,{size:r.size.title,style:`italic`,align:`center`});let ee=this.getTraitsAsText(t);if(e.textAt(ee,e.centerX,$,{size:r.size.caption,color:f.soft,align:`center`,charSpace:Se}),v){let Qt=e.textWidth(ee,{size:r.size.caption,charSpace:Se});n.setFillColor(f.accent),n.circle(e.centerX+Qt/2+4,$-1,1.2,`F`);return}y!==null&&e.textAt(jt(y),e.centerX,$+Ee,{size:r.size.caption,align:`center`,charSpace:Se})}addCustomText(e,t){this.beginTextColumn(e),e.paragraph(t,this.textColumnStyle(e))}addStatement(e){let t=this.textColumnStyle(e);this.beginTextColumn(e),e.paragraph(this.translateService.instant(Ie.introduction.content),t),e.space(8),Ie.sections.forEach(i=>{e.ensureRoom(24),e.heading(this.translateService.instant(i.title),{x:t.x}),e.space(2),i.content?.forEach(n=>{e.paragraph(this.translateService.instant(n),t),e.space(3)}),i.items?.forEach(n=>{e.ensureRoom(14),e.paragraph(this.translateService.instant(n.subtitle),s(r$1({},t),{style:`italic`})),e.paragraph(this.translateService.instant(n.content),s(r$1({},t),{color:f.soft})),e.space(4)}),e.space(6)})}addCv(e){let i=e.margin+18,n=e.contentWidth-18,o=this.translateService.currentLang()?.startsWith(`es`)?`es`:`en`;fe(this.cv.entries(),o).forEach(c=>{e.ensureRoom(26),e.heading(this.translateService.instant(c.title)),e.space(3),c.items.forEach(m=>{e.ensureRoom(12),e.textAt(String(m.year),e.margin,e.y,{size:r.size.caption,color:f.faint}),e.paragraph(m.title,{x:i,maxWidth:n,style:`italic`,lineHeight:4.8});let p=[m.venue,m.city,this.translateService.instant(m.countryKey)].filter(Boolean).join(`, `);e.paragraph(p,{x:i,maxWidth:n,size:r.size.caption,color:f.soft,lineHeight:4.4}),e.space(3)}),e.space(9)})}addContact(e,t){e.y=70;let i={align:`center`,lineHeight:6};e.heading(this.translateService.instant(`contact.title`),{align:`center`}),e.space(6),e.paragraph(t,i),e.paragraph(`(+34) 635820462`,s(r$1({},i),{color:f.soft})),e.paragraph(`morenosanchezjuanma@gmail.com`,s(r$1({},i),{color:f.soft})),e.paragraph(`juanmamoreno.com`,s(r$1({},i),{color:f.soft})),e.space(14),e.paragraph(this.translateService.instant(`contact.representedBy`),s(r$1({},i),{size:r.size.caption,color:f.faint})),e.space(2),e.paragraph(`(+34) 606780084`,s(r$1({},i),{color:f.soft})),e.paragraph(`galeriazunino@gmail.com`,s(r$1({},i),{color:f.soft})),e.paragraph(`www.galeriazunino.com`,s(r$1({},i),{color:f.soft}))}beginTextColumn(e){e.space(6)}textColumnStyle(e){return{x:(e.pageWidth-Jt)/2,maxWidth:Jt,lineHeight:r.lineHeight.body}}getTraitsAsText(e){let t=o=>this.artworkService.getTraitValue(e,o),i=this.translateService.instant(t(r$2.MEDIUM)),n=`${t(r$2.HEIGHT)} \xD7 ${t(r$2.WIDTH)} ${t(r$2.UNIT)}`;return`${t(r$2.YEAR)} \xB7 ${i} \xB7 ${n}`}static{this.ɵfac=function(t){return new(t||a)}}static{this.ɵprov=fe$1({token:a,factory:a.ɵfac,providedIn:`root`})}}return a})();function fi(a,s){a&1&&(ds(0,`mat-icon`),f_(1,`assignment`),pu())}function vi(a,s){if(a&1&&Qm(0,`mat-progress-spinner`,1),a&2){let e=Pb();zm(`value`,e.progressPercent())}}function bi(a,s){a&1&&Qm(0,`mat-progress-spinner`,2)}function wi(a,s){if(a&1&&(ds(0,`span`,3),f_(1),pu()),a&2){let e=Pb();ST(),Eu(``,e.progressPercent(),`%`)}}var rn=(()=>{class a{constructor(){this.translateService=E(U),this.pdfService=E(Kt),this.dialog=E(tt$1),this.cvProse=E(qt),this.language=E(j),this.snackBar=E(Ht$1),this.nfts=fH([]),this.downloadFileType=fH(N.IMAGE),this.isCreating=ze$1(!1),this.progress=ze$1(0),this.progressPercent=Nt(()=>Math.round(this.progress()*100))}getTooltip(){switch(this.downloadFileType()){case N.CV:return this.translateService.instant(`download.cv`);case N.STATEMENT:return this.translateService.instant(`download.statement`);case N.DOSSIER:return this.translateService.instant(`download.portfolio`);case N.IMAGE:default:return this.translateService.instant(`download.sheet`)}}createPDF(){switch(this.isCreating.set(!0),this.progress.set(0),this.downloadFileType()){case N.CV:this.saveDocument(this.pdfService.createCV(),`cv-juanmamoreno.pdf`);break;case N.STATEMENT:this.saveDocument(this.pdfService.createStatement(),`statement-juanmamoreno.pdf`);break;case N.DOSSIER:this.openDossierDialog();break;case N.IMAGE:default:{let e=this.nfts()[0];this.saveDocument(this.pdfService.createTechnicalSheet(e),`${e.name||`juanmamoreno`}.pdf`);break}}}async openDossierDialog(){let e=(await this.cvProse.read(this.language.inSpanish()?`es`:`en`))?.body??null;this.dialog.open(Zt,{data:{includeContact:!0,includeCv:!0,includeStatement:!0,customTitle:``,customText:``,proseAvailable:!!e}}).afterClosed().subscribe(i=>{if(i){let{includeContact:n,includeCv:o,cvAsProse:c,includeStatement:m,customTitle:p,customText:v,prices:y,contactName:u}=i;this.saveDocument(this.pdfService.createDossier(this.nfts(),n,o,m,p,v,x=>this.progress.set(x),c?e:null,y??null,u),`dossier-juanmamoreno.pdf`)}else this.isCreating.set(!1)})}saveDocument(e,t){e.then(i=>{i.save(t),this.showToast(`download.success`)}).catch(()=>this.showToast(`download.error`)).finally(()=>this.isCreating.set(!1))}showToast(e){this.snackBar.open(this.translateService.instant(e),`Ok!`,{duration:3e3,verticalPosition:`top`})}static{this.ɵfac=function(t){return new(t||a)}}static{this.ɵcmp=mC({type:a,selectors:[[`app-pdf-button`]],inputs:{nfts:[1,`nfts`],downloadFileType:[1,`downloadFileType`]},decls:5,vars:5,consts:[[`mat-icon-button`,``,`matTooltipPosition`,`below`,3,`click`,`disabled`,`matTooltip`],[`diameter`,`24`,`mode`,`determinate`,3,`value`],[`diameter`,`24`,`mode`,`indeterminate`],[1,`pdf-progress-label`]],template:function(t,i){t&1&&(ds(0,`button`,0),ny(`click`,function(){return i.createPDF()}),mb(1,fi,2,0,`mat-icon`)(2,vi,1,1,`mat-progress-spinner`,1)(3,bi,1,0,`mat-progress-spinner`,2),pu(),mb(4,wi,2,1,`span`,3)),t&2&&(zm(`disabled`,i.isCreating())(`matTooltip`,i.getTooltip()),qm(`aria-label`,i.getTooltip()),ST(),vb(i.isCreating()?i.progress()>0?2:3:1),ST(3),vb(i.isCreating()&&i.progress()>0?4:-1))},dependencies:[V,_t,wt,K],styles:[`[_nghost-%COMP%]{display:inline-flex;align-items:center}.pdf-progress-label[_ngcontent-%COMP%]{margin-left:.25rem;font-variant-numeric:tabular-nums}`]})}}return a})();export{Te as a,fe as c,yi as d,ze as f,Qi as i,rn as l,Kt as n,Ut as o,N as r,ei as s,Ie as t,ve as u};