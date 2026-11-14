import{n as s,t as r}from"./chunk-Ch7qlBDL.js";import{$n as lC,A as Fm,An as h_,Ar as sv,Ct as VV,Dt as WV,Et as WE,Fn as hy,Fr as tt,Ft as Xs,H as Kw,Hr as vb,I as Ib,In as i_,Ir as tv,J as Mm,Jn as kd,Jt as _t,L as JC,On as gy,Or as sf,Q as Om,R as Jb,Rt as YV,S as Ef,Sr as qb,Vr as v_,W as Lm,Wt as Zw,Y as NE,Yt as aC,Z as Nm,Zt as af,an as cs,cr as mm,d as Bv,di as zm,dt as S,ei as y,en as av,ft as Sm,g as Db,gn as f_,hr as oi$1,ii as yf,in as cb,kt as Wm,ln as du,m as Cb,mn as eo,ni as yb,qn as kb,rt as QV,tr as lT,u as Bm,ui as ze$1,wn as gb,wt as Ve$1,yn as fe,zn as iu,zt as ZC}from"./chunk-C7UY2Bi7.js";import{t as e}from"./chunk-Cb1KwH4S.js";import{i as Do,p as an,u as Xn}from"./chunk-DjDfg46u.js";import{i as G,o as T}from"./chunk-DHInQJec.js";import{$ as Zs,A as Vn,D as O$2,I as yn,L as zt,N as oe,O as Pe$1,Ot as o,St as n,W as Ft,_ as wn,b as At,bt as $t$2,ct as lt,g as St,i as O$1,kt as t,m as Kt$1,st as le,t as k,u as y$1,v as wt,wt as a,xt as H,y as $t$1}from"./main-G2BPLPUZ.js";import{m as jn,r as La,v as st}from"./chunk-DsR8Bs5g.js";import{a as Ke,g as zt$1,m as ee,n as Gt,p as Zt$1,r as Ht,s as T$1,u as Vt}from"./chunk-B8VqljpV.js";import{n as mt}from"./chunk-93P7l3rj.js";import{t as wt$1}from"./chunk-Dpy_xN3j.js";import{t as Qt$1}from"./chunk-BX1mzfrR.js";var R=(function(n){return n.CV=`cv`,n.STATEMENT=`statement`,n.IMAGE=`image`,n.DOSSIER=`dossier`,n})(R||{});var Li=[`online`,`spain`,`usa`,`germany`,`mexico`,`italy`];var Ge={solo:`cv.shows.title`,collective:`cv.collectiveShows.title`,award:`cv.awards.title`,conference:`cv.conferences.title`,education:`cv.education.title`};function Xt(n,r){return n?(r===`es`?n.es:void 0)??n.en:``}function Pe(n,r){let e=[];for(let i of Object.keys(Ge)){let t=n.filter(a=>a.kind===i).map(a=>li(a,r));t.length&&e.push({kind:i,title:Ge[i],items:t})}return e}function ci(n){let r=n.title.en.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,48);return`${n.year}-${r}`}function li(n,r$1){let e=Xt(n.venue,r$1);return s(r(r(r(r({id:n.id,anchor:ci(n),year:n.year,title:Xt(n.title,r$1)},n.titleUrl?{titleUrl:n.titleUrl}:{}),e?{venue:e}:{}),n.venueUrl?{venueUrl:n.venueUrl}:{}),n.city?{city:n.city}:{}),{countryKey:`cv.countries.${n.country}`})}var qt=[{id:`4790ab4546bf78fb`,kind:`solo`,year:2024,title:{en:`El valle inquietante`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`069fd81d0cccbbc8`,kind:`solo`,year:2021,title:{en:`El sueño de los robots`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`ab3d09a718504872`,kind:`solo`,year:2019,title:{en:`33. El desengaño`},venue:{en:`La 13 dada trouch Gallery`},city:`Huelva`,country:`spain`},{id:`e2d006becf81f950`,kind:`solo`,year:2018,title:{en:`#blessed`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`b37386b8cd2eedd1`,kind:`solo`,year:2017,title:{en:`I was there`},venue:{en:`La silla eléctrica`},city:`Sevilla`,country:`spain`},{id:`62266b50fc6ab279`,kind:`solo`,year:2016,title:{en:`Never Gone Forever`},venue:{en:`Gallo Rojo`},city:`Sevilla`,country:`spain`},{id:`5dfbf4e1d333f63b`,kind:`solo`,year:2014,title:{en:`Pintura Aumentada`},venue:{en:`Red House`},city:`Sevilla`,country:`spain`},{id:`38dc378c84cc92dd`,kind:`solo`,year:2013,title:{en:`Historias aparentemente inconexas`},venue:{en:`Aula Magna de Capuchinos`},city:`Alcalá la Real`,country:`spain`},{id:`8f6f6f3da32a1586`,kind:`solo`,year:2013,title:{en:`Juanma Moreno`},venue:{en:`No-Lugar`},city:`Sevilla`,country:`spain`},{id:`22449c295542bd10`,kind:`solo`,year:2008,title:{en:`Transeúntes`},venue:{en:`Harz Mensa`},city:`Halle Saale`,country:`germany`},{id:`1c6b1a0396dd55e5`,kind:`collective`,year:2024,title:{en:`Outsiders. Vol. 1`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`569775435cb39ae2`,kind:`collective`,year:2024,title:{en:`Anna Jonsson & Juanma Moreno`},venue:{en:`El Estudio de Ignacio del Río`},city:`Villanueva del Rosario`,country:`spain`},{id:`c45534b738716510`,kind:`collective`,year:2023,title:{en:`Pintores pensando la pintura`},venue:{en:`Espacio 75 Art Gallery`},city:`Madrid`,country:`spain`,venueUrl:`https://www.espacio75.com/`},{id:`a5f32ad8a66500b3`,kind:`collective`,year:2023,title:{en:`Nocturnos`},venue:{en:`Sala Pescadería Vieja / CAC Vélez-Málaga`},city:`Jerez de la Frontera / Vélez-Málaga`,country:`spain`},{id:`cf3e6d8f3a2b26f5`,kind:`collective`,year:2023,title:{en:`Los únicos que saben de arte son los artistas`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`6b3530832ba03756`,kind:`collective`,year:2022,title:{en:`Discovery Art Fair Cologne`},city:`Cologne`,country:`germany`,titleUrl:`https://discoveryartfair.com/fairs/koeln/`},{id:`9dd6662d24b96d31`,kind:`collective`,year:2021,title:{en:`Lucca Art Fair`},country:`online`,titleUrl:`https://www.luccaartfair.com/`},{id:`b30ad80ca6893f41`,kind:`collective`,year:2021,title:{en:`Figuración Fantástica Sevillana`},venue:{en:`Galería Impulso`},city:`Querétaro`,country:`mexico`,venueUrl:`https://impulsogaleria.com/en/home/`},{id:`914b9e1a7c8ac6cd`,kind:`collective`,year:2020,title:{en:`Interpaisajes`},venue:{en:`Eldevenir & Zunino Gallery`},country:`online`,venueUrl:`https://www.eldevenirartgallery.com/`},{id:`fdc3ccc88436e541`,kind:`collective`,year:2019,title:{en:`72 horas`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`a9114df8e5260755`,kind:`collective`,year:2019,title:{en:`Homenaje a Dolores Montijano`},venue:{en:`Aula Magna de Capuchinos`},city:`Alcalá la Real`,country:`spain`},{id:`99009cdeb333423c`,kind:`collective`,year:2019,title:{en:`Redes de fe`},venue:{en:`Galería Renace Art`},city:`Jaen`,country:`spain`,venueUrl:`https://renace.art/`},{id:`ce090999a3275899`,kind:`collective`,year:2018,title:{en:`Todo encaja`},venue:{en:`Zunino gallery`,es:`Galería Zunino`},city:`Sevilla`,country:`spain`,venueUrl:`https://galeriazunino.com/`},{id:`df6d0387fe24922f`,kind:`collective`,year:2017,title:{en:`Lodo`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`7b037cec06674222`,kind:`collective`,year:2015,title:{en:`Escozor`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`e34e5fd749f45d4e`,kind:`collective`,year:2015,title:{en:`A paloma muerta`},venue:{en:`Estudio22`},city:`Logroño`,country:`spain`,venueUrl:`http://estudio22photo.es`},{id:`843aef3ba369776d`,kind:`collective`,year:2015,title:{en:`Nemoart festival, digital art`},venue:{en:`Casa Museo Niceto Alcalá Zamora`},city:`Priego de Córdoba`,country:`spain`},{id:`ff786c2209fc2396`,kind:`collective`,year:2015,title:{en:`Promoción equis`},venue:{en:`Cienfuegos`},city:`Málaga`,country:`spain`},{id:`8bd6f86416fff5e1`,kind:`collective`,year:2015,title:{en:`En azúcar de sandía`},venue:{en:`Suricatta Gallery`},city:`Jerez de la Frontera`,country:`spain`},{id:`2cd55ee718ff78c7`,kind:`collective`,year:2014,title:{en:`El tamaño no importa`},venue:{en:`Un gato en bicicleta`},city:`Sevilla`,country:`spain`},{id:`14135e1bc3b528c4`,kind:`collective`,year:2014,title:{en:`MULTI/TUTTI/FEST`},venue:{en:`Cienfuegos`},city:`Málaga`,country:`spain`},{id:`201762d23308702b`,kind:`collective`,year:2013,title:{en:`Plato del día`},venue:{en:`Red House`},city:`Sevilla`,country:`spain`},{id:`84302a3a85a36dbf`,kind:`collective`,year:2013,title:{en:`Lo mejorcito de cada casa`},venue:{en:`No-Lugar`},city:`Sevilla`,country:`spain`},{id:`b3c985d47cd09ae1`,kind:`collective`,year:2011,title:{en:`Weisser TV`},venue:{en:`129 Gallery`},city:`Berlin`,country:`germany`,venueUrl:`https://www.129gallery.com/`},{id:`c711555116950f0e`,kind:`collective`,year:2011,title:{en:`Mehr Licht, tributo a Chema Alvargonzalez`},venue:{en:`GlogauAIR Project Space`},city:`Berlin`,country:`germany`,venueUrl:`https://glogauair.net/`},{id:`52a410152fecfa68`,kind:`collective`,year:2011,title:{en:`Modern Classic, influence of the past in today's art`},venue:{en:`Your Mum`},city:`Berlin`,country:`germany`},{id:`9e88fbd95cf01e1c`,kind:`collective`,year:2010,title:{en:`The Mac Gyver Problem`},venue:{en:`Galerie im Regierungsviertel/The Forgotten Bar`},city:`Berlin`,country:`germany`},{id:`e1e9774529367700`,kind:`collective`,year:2009,title:{en:`XXL-Art, nuevas tendencias de la figuración en gran formato`},venue:{en:`Damián Bayón Art Center`},city:`Santa Fe`,country:`spain`},{id:`74fb42dad98e9fd9`,kind:`collective`,year:2009,title:{en:`La más elegante del invernadero III`},venue:{en:`Galería Jesús Puerto`},city:`Granada`,country:`spain`},{id:`5a950bf5bd6ff563`,kind:`award`,year:2014,title:{en:`The Pollock-Krasner Foundation award`},city:`New York`,country:`usa`,titleUrl:`http://www.pkf.org/`},{id:`3462becaf15896df`,kind:`award`,year:2012,title:{en:`Antonio Gala Foundation Residence Program`,es:`Fundación Antonio Gala para jóvenes creadores`},city:`Córdoba`,country:`spain`,titleUrl:`http://www.fundacionantoniogala.org/`},{id:`0eb0bef9af46c8f3`,kind:`award`,year:2010,title:{en:`GlogauAIR Residence Program`},city:`Berlín`,country:`germany`,titleUrl:`http://www.glogauair.net/`},{id:`d58024d99289fbd0`,kind:`award`,year:2006,title:{en:`Lefranc&Bourgueois art award`,es:`Becas Lefranc&Bourgueois`},city:`Granada`,country:`spain`},{id:`090493feed6a82de`,kind:`conference`,year:2025,title:{en:`Towards a New AI Winter`,es:`¿Hacia un nuevo invierno de la IA?`},venue:{en:`International University of Andalucia`,es:`Universidad Internacional de Andalucía`},city:`Baeza`,country:`spain`,titleUrl:`https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas`,venueUrl:`https://www.unia.es/`},{id:`8fd481e74a1e6942`,kind:`education`,year:2009,title:{en:`Bachelor on arts degree`,es:`Licenciado en Bellas Artes`},venue:{en:`University of Granada`,es:`Universidad de Granada`},city:`Granada`,country:`spain`,venueUrl:`http://bellasartes.ugr.es/`},{id:`5b24c76e7cb1538f`,kind:`education`,year:2008,title:{en:`LLP Erasmus Scholarship`,es:`Beca LLP Erasmus`},venue:{en:`Burg Giebichenstein, Hochschule für Kunst und Design`},city:`Halle Saale`,country:`germany`,venueUrl:`http://www.burg-halle.de/`}];var Ee=(()=>{class n{constructor(){this.http=y(an),this.auth=y(O$1),this.isBrowser=Do(y(NE)),this.known=ze$1(qt),this.asked=null,this.entries=_t(()=>this.known())}async refresh(){if(this.isBrowser)return this.asked??=this.ask(),this.asked}async create(e$1){await gy(this.http.post(`${e.backendUrl}cv/entries`,e$1,this.asHim())),await this.reread()}async update(e$2,i){await gy(this.http.put(`${e.backendUrl}cv/entries/${e$2}`,i,this.asHim())),await this.reread()}async remove(e$3){await gy(this.http.delete(`${e.backendUrl}cv/entries/${e$3}`,this.asHim())),await this.reread()}async reread(){return this.asked=this.ask(),this.asked}asHim(){let e=this.auth.bearerToken();return{headers:e?{Authorization:`Bearer ${e}`}:{}}}async ask(){try{let i=(await gy(this.http.get(`${e.backendUrl}cv/entries`)))?.data?.entries;Array.isArray(i)&&i.length&&this.known.set(i)}catch{}}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵprov=fe({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var Ve={introduction:{content:`statement.introduction.content`},sections:[{title:`statement.painting.title`,content:[`statement.painting.limits`,`statement.painting.recontextualising`,`statement.painting.rule`]},{title:`statement.images.title`,content:[`statement.images.found`,`statement.images.accident`]},{title:`statement.failure.title`,content:[`statement.failure.content`]}]};var di=[`determinateSpinner`];function mi(n,r){if(n&1&&(yf(),cs(0,`svg`,11),Nm(1,`circle`,12),iu()),n&2){let e=gb();Mm(`viewBox`,e._viewBox()),lT(),Wm(`stroke-dasharray`,e._strokeCircumference(),`px`)(`stroke-dashoffset`,e._strokeCircumference()/2,`px`)(`stroke-width`,e._circleStrokeWidth(),`%`),Mm(`r`,e._circleRadius())}}var pi=new S(`mat-progress-spinner-default-options`,{providedIn:`root`,factory:()=>({diameter:Zt})});var Zt=100;var hi=10;var $t=(()=>{class n{_elementRef=y(eo);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;_determinateCircle;constructor(){let e=y(pi),i=Ft(),t=this._elementRef.nativeElement;this._noopAnimations=i===`di-disabled`&&!!e&&!e._forceAnimations,this.mode=t.nodeName.toLowerCase()===`mat-spinner`?`indeterminate`:`determinate`,!this._noopAnimations&&i===`reduced-motion`&&t.classList.add(`mat-progress-spinner-reduced-motion`),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}mode;get value(){return this.mode===`determinate`?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}_diameter=Zt;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_strokeWidth;_circleRadius(){return(this.diameter-hi)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode===`determinate`?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static ɵfac=function(i){return new(i||n)};static ɵcmp=ZC({type:n,selectors:[[`mat-progress-spinner`],[`mat-spinner`]],viewQuery:function(i,t){if(i&1&&Bm(di,5),i&2){let a;Ib(a=Db())&&(t._determinateCircle=a.first)}},hostAttrs:[`role`,`progressbar`,`tabindex`,`-1`,1,`mat-mdc-progress-spinner`,`mdc-circular-progress`],hostVars:18,hostBindings:function(i,t){i&2&&(Mm(`aria-valuemin`,0)(`aria-valuemax`,100)(`aria-valuenow`,t.mode===`determinate`?t.value:null)(`mode`,t.mode),kb(`mat-`+t.color),Wm(`width`,t.diameter,`px`)(`height`,t.diameter,`px`)(`--%NS%mat-progress-spinner-size`,t.diameter+`px`)(`--%NS%mat-progress-spinner-active-indicator-width`,t.diameter+`px`),zm(`_mat-animation-noopable`,t._noopAnimations)(`mdc-circular-progress--indeterminate`,t.mode===`indeterminate`))},inputs:{color:`color`,mode:`mode`,value:[2,`value`,`value`,YV],diameter:[2,`diameter`,`diameter`,YV],strokeWidth:[2,`strokeWidth`,`strokeWidth`,YV]},exportAs:[`matProgressSpinner`],decls:14,vars:11,consts:[[`circle`,``],[`determinateSpinner`,``],[`aria-hidden`,`true`,1,`mdc-circular-progress__determinate-container`],[`xmlns`,`http://www.w3.org/2000/svg`,`focusable`,`false`,1,`mdc-circular-progress__determinate-circle-graphic`],[`cx`,`50%`,`cy`,`50%`,1,`mdc-circular-progress__determinate-circle`],[`aria-hidden`,`true`,1,`mdc-circular-progress__indeterminate-container`],[1,`mdc-circular-progress__spinner-layer`],[1,`mdc-circular-progress__circle-clipper`,`mdc-circular-progress__circle-left`],[3,`ngTemplateOutlet`],[1,`mdc-circular-progress__gap-patch`],[1,`mdc-circular-progress__circle-clipper`,`mdc-circular-progress__circle-right`],[`xmlns`,`http://www.w3.org/2000/svg`,`focusable`,`false`,1,`mdc-circular-progress__indeterminate-circle-graphic`],[`cx`,`50%`,`cy`,`50%`]],template:function(i,t){if(i&1&&(mm(0,mi,2,8,`ng-template`,null,0,v_),cs(2,`div`,2,1),yf(),cs(4,`svg`,3),Nm(5,`circle`,4),iu()(),Ef(),cs(6,`div`,5)(7,`div`,6)(8,`div`,7),Om(9,8),iu(),cs(10,`div`,9),Om(11,8),iu(),cs(12,`div`,10),Om(13,8),iu()()()),i&2){let a=Cb(1);lT(4),Mm(`viewBox`,t._viewBox()),lT(),Wm(`stroke-dasharray`,t._strokeCircumference(),`px`)(`stroke-dashoffset`,t._strokeDashOffset(),`px`)(`stroke-width`,t._circleStrokeWidth(),`%`),Mm(`r`,t._circleRadius()),lT(4),Sm(`ngTemplateOutlet`,a),lT(2),Sm(`ngTemplateOutlet`,a),lT(2),Sm(`ngTemplateOutlet`,a)}},dependencies:[Xn],styles:[`.mat-mdc-progress-spinner {
  --%NS%mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--%NS%mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --%NS%mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--%NS%mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--%NS%mat-progress-spinner-active-indicator-color, var(--%NS%mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--%NS%mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--%NS%mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--%NS%mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2})}return n})();var gi=[`*`];var Jt=(()=>{class n{labelPosition=`after`;static ɵfac=function(i){return new(i||n)};static ɵcmp=ZC({type:n,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(i,t){i&2&&zm(`mdc-form-field--align-end`,t.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:gi,decls:1,vars:0,template:function(i,t){i&1&&(vb(),yb(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label, .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label, [dir=rtl] .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label, .mdc-form-field--align-end > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label, [dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})}return n})();var ui=[`switch`];var fi=[`*`];function vi(n,r){n&1&&(cs(0,`span`,11),yf(),cs(1,`svg`,13),Nm(2,`path`,14),iu(),cs(3,`svg`,15),Nm(4,`path`,16),iu()())}var _i=new S(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var Ae=class{source;checked;constructor(r,e){this.source=r,this.checked=e}};var je=(()=>{class n{_elementRef=y(eo);_focusMonitor=y(lt);_changeDetectorRef=y(WV);defaults=y(_i);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Ae(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Zs();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new tt;toggleChange=new tt;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){y(T).load(St);let e=y(new Bv(`tabindex`),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||`accent`,this.id=this._uniqueId=y(le).getId(`mat-mdc-slide-toggle-`),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Ae(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(i){return new(i||n)};static ɵcmp=ZC({type:n,selectors:[[`mat-slide-toggle`]],viewQuery:function(i,t){if(i&1&&Bm(ui,5),i&2){let a;Ib(a=Db())&&(t._switchElement=a.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(i,t){i&2&&(Lm(`id`,t.id),Mm(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),kb(t.color?`mat-`+t.color:``),zm(`mat-mdc-slide-toggle-focused`,t._focused)(`mat-mdc-slide-toggle-checked`,t.checked)(`mat-slide-toggle-full-width`,t.fullWidth)(`_mat-animation-noopable`,t._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,QV],color:`color`,disabled:[2,`disabled`,`disabled`,QV],fullWidth:[2,`fullWidth`,`fullWidth`,QV],disableRipple:[2,`disableRipple`,`disableRipple`,QV],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:YV(e)],checked:[2,`checked`,`checked`,QV],hideIcon:[2,`hideIcon`,`hideIcon`,QV],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,QV]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[i_([{provide:oe,useExisting:oi$1(()=>n),multi:!0},{provide:O$2,useExisting:n,multi:!0}]),WE],ngContentSelectors:fi,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(i,t){if(i&1&&(vb(),cs(0,`div`,1)(1,`button`,2,0),Fm(`click`,function(){return t._handleClick()}),Nm(3,`div`,3)(4,`span`,4),cs(5,`span`,5)(6,`span`,6)(7,`span`,7),Nm(8,`span`,8),iu(),cs(9,`span`,9),Nm(10,`span`,10),iu(),Zw(11,vi,5,0,`span`,11),iu()()(),cs(12,`label`,12),Fm(`click`,function(o){return o.stopPropagation()}),yb(13),iu()()),i&2){let a=Cb(2);Sm(`labelPosition`,t.labelPosition),lT(),zm(`mdc-switch--selected`,t.checked)(`mdc-switch--unselected`,!t.checked)(`mdc-switch--checked`,t.checked)(`mdc-switch--disabled`,t.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,t.disabledInteractive),Sm(`tabIndex`,t.disabled&&!t.disabledInteractive?-1:t.tabIndex)(`disabled`,t.disabled&&!t.disabledInteractive),Mm(`id`,t.buttonId)(`name`,t.name)(`aria-label`,t.ariaLabel)(`aria-labelledby`,t._getAriaLabelledBy())(`aria-describedby`,t.ariaDescribedby)(`aria-required`,t.required||null)(`aria-checked`,t.checked)(`aria-disabled`,t.disabled&&t.disabledInteractive?`true`:null),lT(9),Sm(`matRippleTrigger`,a)(`matRippleDisabled`,t.disableRipple||t.disabled)(`matRippleCentered`,!0),lT(),Kw(t.hideIcon?-1:11),lT(),Sm(`for`,t.buttonId),Mm(`id`,t._labelId)}},dependencies:[Kt$1,Jt],styles:[`.mdc-switch {
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
`],encapsulation:2})}return n})();var Nn=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=JC({type:n});static ɵinj=kd({imports:[je,G]})}return n})();function bi(n){let r=String(n??``).toLowerCase();return[`watercolor`,`watercolour`,`drawing`,`gouache`,`ink`,`pencil`,`charcoal`].some(i=>r.includes(i))?`paper`:`painting`}function Kt(n){let r=Number.parseFloat(String(n??``).replace(`,`,`.`));return Number.isFinite(r)?r:NaN}function ze(n){return Number.isFinite(n)&&n>0}function Qt(n,r,e){let i=Kt(n.height),t=Kt(n.width);if(!Number.isFinite(i)||!Number.isFinite(t))return null;let a=e[bi(r)];return ze(a)?Math.round((i+t)*a):null}function Yt(n){return`${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,`\xA0`)} \u20AC`}function yi(n,r){if(n&1){let e=cb();cs(0,`div`,4)(1,`mat-form-field`,7)(2,`mat-label`),qb(3),f_(4,`translate`),iu(),cs(5,`input`,8),av(`ngModelChange`,function(t){sf(e);let a=gb();return Jb(a.contactName,t)||(a.contactName=t),af(t)}),iu(),aC(),iu()()}if(n&2){let e=gb();lT(3),tv(h_(4,3,`dossier.contactName`)),lT(2),sv(`ngModel`,e.contactName),Sm(`placeholder`,e.defaultName),lC()}}function wi(n,r){if(n&1){let e=cb();cs(0,`mat-slide-toggle`,13),av(`ngModelChange`,function(t){sf(e);let a=gb();return Jb(a.cvAsProse,t)||(a.cvAsProse=t),af(t)}),qb(1),f_(2,`translate`),iu(),aC()}if(n&2)sv(`ngModel`,gb().cvAsProse),lC(),lT(),du(` `,h_(2,2,`cv.proseInDossier`),` `)}function Si(n,r){n&1&&(cs(0,`p`,16),qb(1),f_(2,`translate`),iu()),n&2&&(lT(),du(` `,h_(2,1,`dossier.multiplierProblem`),` `))}function ki(n,r){if(n&1){let e=cb();cs(0,`div`,6)(1,`mat-form-field`,7)(2,`mat-label`),qb(3),f_(4,`translate`),iu(),cs(5,`input`,14),av(`ngModelChange`,function(t){sf(e);let a=gb();return Jb(a.paintingMultiplier,t)||(a.paintingMultiplier=t),af(t)}),iu(),aC(),iu(),cs(6,`mat-form-field`,7)(7,`mat-label`),qb(8),f_(9,`translate`),iu(),cs(10,`input`,14),av(`ngModelChange`,function(t){sf(e);let a=gb();return Jb(a.paperMultiplier,t)||(a.paperMultiplier=t),af(t)}),iu(),aC(),iu(),cs(11,`p`,15),qb(12),f_(13,`translate`),iu(),Zw(14,Si,3,3,`p`,16),iu()}if(n&2){let e=gb();lT(3),tv(h_(4,6,`dossier.paintingMultiplier`)),lT(2),sv(`ngModel`,e.paintingMultiplier),lC(),lT(3),tv(h_(9,8,`dossier.paperMultiplier`)),lT(2),sv(`ngModel`,e.paperMultiplier),lC(),lT(2),tv(h_(13,10,`dossier.multiplierHint`)),lT(2),Kw(e.multipliersUsable?-1:14)}}var ti=(()=>{class n{constructor(){this.customTitle=``,this.customText=``,this.includeContact=!1,this.contactName=``,this.defaultName=Zt$1,this.includeCv=!1,this.cvAsProse=!1,this.includeStatement=!1,this.isSubmitting=!1,this.includePrices=!1,this.paintingMultiplier=11,this.paperMultiplier=11,this.dialogRef=y(T$1),this.data=y(Ke,{optional:!0})??{proseAvailable:!1}}get multipliersUsable(){return ze(Number(this.paintingMultiplier))&&ze(Number(this.paperMultiplier))}get canSubmit(){return!this.isSubmitting&&(!this.includePrices||this.multipliersUsable)}submit(){this.isSubmitting=!0;let e={contactName:this.contactName.trim()||`Juanma Moreno Sánchez`,customTitle:this.customTitle,customText:this.customText,includeContact:this.includeContact,includeCv:this.includeCv,cvAsProse:this.cvAsProse,includeStatement:this.includeStatement,prices:this.includePrices?{painting:Number(this.paintingMultiplier),paper:Number(this.paperMultiplier)}:null};this.dialogRef.close(e)}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵcmp=ZC({type:n,selectors:[[`app-dossier-options-modal`]],decls:47,vars:49,consts:[[`mat-dialog-title`,``],[1,`form-group`],[1,`pdf-options-group`],[3,`ngModelChange`,`ngModel`],[1,`pdf-options-nested`],[1,`pdf-options-nested`,3,`ngModel`],[1,`pdf-options-nested`,`pdf-multipliers`],[`appearance`,`outline`],[`matInput`,``,3,`ngModelChange`,`ngModel`,`placeholder`],[`matInput`,``,`rows`,`4`,3,`ngModelChange`,`ngModel`,`placeholder`],[`align`,`end`],[`mat-button`,``,`mat-dialog-close`,``],[`mat-raised-button`,``,`color`,`primary`,3,`click`,`disabled`],[1,`pdf-options-nested`,3,`ngModelChange`,`ngModel`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`0.1`,3,`ngModelChange`,`ngModel`],[1,`pdf-options-hint`],[`role`,`alert`,1,`pdf-options-problem`]],template:function(i,t){i&1&&(cs(0,`h2`,0),qb(1),f_(2,`translate`),iu(),cs(3,`mat-dialog-content`)(4,`div`,1)(5,`div`,2)(6,`mat-slide-toggle`,3),av(`ngModelChange`,function(o){return Jb(t.includeContact,o)||(t.includeContact=o),o}),qb(7),f_(8,`translate`),iu(),aC(),Zw(9,yi,6,5,`div`,4),iu(),cs(10,`div`,2)(11,`mat-slide-toggle`,3),av(`ngModelChange`,function(o){return Jb(t.includeCv,o)||(t.includeCv=o),o}),qb(12),f_(13,`translate`),iu(),aC(),Zw(14,wi,3,4,`mat-slide-toggle`,5),iu(),cs(15,`div`,2)(16,`mat-slide-toggle`,3),av(`ngModelChange`,function(o){return Jb(t.includeStatement,o)||(t.includeStatement=o),o}),qb(17),f_(18,`translate`),iu(),aC(),iu(),cs(19,`div`,2)(20,`mat-slide-toggle`,3),av(`ngModelChange`,function(o){return Jb(t.includePrices,o)||(t.includePrices=o),o}),qb(21),f_(22,`translate`),iu(),aC(),Zw(23,ki,15,12,`div`,6),iu(),cs(24,`div`,2)(25,`mat-form-field`,7)(26,`mat-label`),qb(27),f_(28,`translate`),iu(),cs(29,`input`,8),f_(30,`translate`),av(`ngModelChange`,function(o){return Jb(t.customTitle,o)||(t.customTitle=o),o}),iu(),aC(),iu()(),cs(31,`div`,2)(32,`mat-form-field`,7)(33,`mat-label`),qb(34),f_(35,`translate`),iu(),cs(36,`textarea`,9),f_(37,`translate`),av(`ngModelChange`,function(o){return Jb(t.customText,o)||(t.customText=o),o}),iu(),aC(),iu()()()(),cs(38,`mat-dialog-actions`,10)(39,`button`,11),f_(40,`translate`),qb(41),f_(42,`translate`),iu(),cs(43,`button`,12),f_(44,`translate`),Fm(`click`,function(){return t.submit()}),qb(45),f_(46,`translate`),iu()()),i&2&&(lT(),tv(h_(2,23,`dossier.title`)),lT(5),sv(`ngModel`,t.includeContact),lC(),lT(),du(` `,h_(8,25,`dossier.includeContact`),` `),lT(2),Kw(t.includeContact?9:-1),lT(2),sv(`ngModel`,t.includeCv),lC(),lT(),tv(h_(13,27,`dossier.includeCv`)),lT(2),Kw(t.includeCv&&t.data.proseAvailable?14:-1),lT(2),sv(`ngModel`,t.includeStatement),lC(),lT(),du(` `,h_(18,29,`dossier.includeStatement`),` `),lT(3),sv(`ngModel`,t.includePrices),lC(),lT(),du(` `,h_(22,31,`dossier.includePrices`),` `),lT(2),Kw(t.includePrices?23:-1),lT(4),tv(h_(28,33,`dossier.customTitle`)),lT(2),sv(`ngModel`,t.customTitle),Sm(`placeholder`,h_(30,35,`dossier.customTitlePlaceholder`)),lC(),lT(5),tv(h_(35,37,`dossier.customText`)),lT(2),sv(`ngModel`,t.customText),Sm(`placeholder`,h_(37,39,`dossier.customTextPlaceholder`)),lC(),lT(3),Mm(`aria-label`,h_(40,41,`cancel`)),lT(2),du(` `,h_(42,43,`cancel`),` `),lT(2),Sm(`disabled`,!t.canSubmit),Mm(`aria-label`,h_(44,45,`download.portfolio`)),lT(2),du(` `,h_(46,47,`download.portfolio`),` `))},dependencies:[zt$1,Gt,je,Vn,Pe$1,zt,yn,At,$t$1,jn,st,La,Ht,wn,Vt,$t$2],styles:[`.pdf-options-group[_ngcontent-%COMP%]{margin-bottom:1em;width:100%}.pdf-multipliers[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.75rem}.pdf-multipliers[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 8rem;min-width:0}.pdf-options-hint[_ngcontent-%COMP%], .pdf-options-problem[_ngcontent-%COMP%]{flex-basis:100%;margin:0;font-size:.75rem;line-height:1.4}.pdf-options-hint[_ngcontent-%COMP%]{color:var(--%NS%catalog-soft)}.pdf-options-problem[_ngcontent-%COMP%]{color:#b3261e}`]})}}return n})();var ii=(()=>{class n{constructor(){this.http=y(an),this.translate=y(H),this.auth=y(O$1),this.cv=y(Ee)}read(e$4){return gy(this.http.get(`${e.backendUrl}cv/prose/${e$4}`).pipe(Ve$1(i=>i?.data??null),Xs(()=>hy(null))))}write(e$5){let i=this.auth.bearerToken();return gy(this.http.post(`${e.backendUrl}cv/prose`,{lang:e$5,list:this.asList()},{headers:i?{Authorization:`Bearer ${i}`}:{}}).pipe(Ve$1(t=>t.data)))}asList(){let e=this.translate.currentLang()?.startsWith(`es`)?`es`:`en`;return Pe(this.cv.entries(),e).map(i=>{let t=i.items.map(a=>{let o=[a.venue,a.city,this.translate.instant(a.countryKey)].filter(Boolean).join(`, `);return`${a.year} \u2014 ${a.title}${o?`, ${o}`:``}`});return`${this.translate.instant(i.title)}
${t.join(`
`)}`}).join(`

`)}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵprov=fe({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var Xe=11.811023622047244;function Ci(n){return new Promise((r,e)=>{let i=new Image;i.crossOrigin=`anonymous`,i.src=n,i.onload=()=>r(i),i.onerror=()=>e(new Error(`Could not load image: ${n}`))})}async function De(n){for(let r of n)try{return await Ci(r)}catch{}throw new Error(`No image source could be loaded.`)}function Ni(n,r,e){let i=n.width/n.height,t=Math.min(n.width,r*Xe),a=t/i;return a>e*Xe&&(a=e*Xe,t=a*i),{width:t,height:a}}function qe(n,r,e,i=.8){let{width:t,height:a}=Ni(n,r,e);return Mi(n,t,a).toDataURL(`image/jpeg`,i)}function ni(n,r=1200,e=2.2){let i=Math.min(n.width,n.height)/e,t=(n.width-i)*Math.random(),a=(n.height-i)*Math.random(),o=document.createElement(`canvas`);o.width=r,o.height=r;let u=o.getContext(`2d`);u.drawImage(n,t,a,i,i,0,0,r,r);let h=u.getImageData(0,0,r,r),p=h.data;for(let v=0;v<p.length;v+=4){let w=.299*p[v]+.587*p[v+1]+.114*p[v+2];p[v]=p[v+1]=p[v+2]=w}return u.putImageData(h,0,0),o.toDataURL(`image/jpeg`,.82)}function Mi(n,r,e){let i=document.createElement(`canvas`);return i.width=r,i.height=e,i.getContext(`2d`).drawImage(n,0,0,r,e),i}var O={format:[210,210],a4:[210,297],margin:24};var f={ink:`#1f1f1f`,soft:`#6e6e6e`,faint:`#a3a3a3`,white:`#ffffff`,accent:`#cf2525`};var l={font:`helvetica`,size:{coverTitle:27,coverArtist:10,heading:11,title:11,body:9.5,caption:8.5,small:7.5},lineHeight:{body:5.4,caption:4.4,heading:7},wideCharSpace:1.6};var Re=class n{constructor(r,e=O.format){this.doc=new r({unit:`mm`,format:e}),this.y=O.margin}get margin(){return O.margin}get pageWidth(){return this.doc.internal.pageSize.getWidth()}get pageHeight(){return this.doc.internal.pageSize.getHeight()}get contentWidth(){return this.pageWidth-2*this.margin}get centerX(){return this.pageWidth/2}newPage(){this.doc.addPage(),this.y=this.margin}ensureRoom(r){this.y+r>this.pageHeight-this.margin&&this.newPage()}space(r){this.y+=r}paragraph(r,e={}){let{charSpace:i=0,lineHeight:t=l.lineHeight.body,align:a=`left`,maxWidth:o=this.contentWidth}=e;this.applyStyle(e);let u=e.x??(a===`center`?this.centerX:this.margin),h=this.doc.splitTextToSize(n.stripHtml(r),o);for(let p of h)this.ensureRoom(t),this.drawLine(p,u,this.y,a,i),this.y+=t}heading(r$2,e={}){this.paragraph(r$2.toUpperCase(),r({size:l.size.heading,color:f.soft,charSpace:l.wideCharSpace,lineHeight:l.lineHeight.heading},e))}textAt(r,e,i,t={}){this.applyStyle(t),this.drawLine(n.stripHtml(r),e,i,t.align??`left`,t.charSpace??0)}textWidth(r,e={}){this.applyStyle(e);let i=n.stripHtml(r);return this.doc.getTextWidth(i)+(e.charSpace??0)*Math.max(i.length-1,0)}addPageNumbers(r=!0){let e=this.doc.getNumberOfPages();for(let i=r?2:1;i<=e;i++)this.doc.setPage(i),this.applyStyle({size:l.size.small,color:f.faint}),this.doc.text(String(i-(r?1:0)),this.centerX,this.pageHeight-9,{align:`center`});this.doc.setPage(e)}applyStyle({size:r=l.size.body,style:e=`normal`,color:i=f.ink}){this.doc.setFont(l.font,e),this.doc.setFontSize(r),this.doc.setTextColor(i)}drawLine(r,e,i,t,a){if(t===`center`&&a>0){let o=this.doc.getTextWidth(r)+a*Math.max(r.length-1,0);this.doc.text(r,e-o/2,i,{charSpace:a})}else this.doc.text(r,e,i,{align:t,charSpace:a})}static stripHtml(r){return r.replace(/<[^>]*(>|$)/g,``).trim()}};var Ti=16;var Ze=5;var Be=.4;var ai=130;var xi=.92;var se=140;var Ii=70;var U=7;var ri=3;var Pi=12;var oi=(()=>{class n$1{constructor(){this.artworkService=y(n),this.translateService=y(H),this.availability=y(k),this.cv=y(Ee)}async loadJspdf(){return this.jspdf??=await import(`./chunk-C2P1SpvC.js`)}async newWriter(e){let{jsPDF:i}=await this.loadJspdf();return new Re(i,e)}async createTechnicalSheet(e){let i=await this.newWriter(O.a4);return await this.addArtworkPage(i,e),i.doc}async createCertificate(e,i){let t=await this.newWriter(O.a4),{doc:a$1,pageWidth:o$1,contentWidth:u}=t,h=(J,ne)=>this.translateService.instant(J,ne),p=i?this.certificateDate(i.mintedAt):null,v=p?h(`certificate.recordedOn`,{date:p}):h(`certificate.recorded`),w=h(`certificate.onlyAuthorship`),g=this.getTraitsAsText(e),x=[[h(`certificate.token`),`#${e.tokenId}`],[h(`certificate.contract`),o],...i?[[h(`certificate.transaction`),i.txHash]]:[]],ce=this.heightOf(t,e.name??``,l.size.title,u)+this.heightOf(t,g,l.size.caption,u)+U+this.heightOf(t,v,l.size.body,se)+U+x.length*(l.lineHeight.caption*2+ri)+U+this.heightOf(t,w,l.size.small,se)+Pi,I=t.pageHeight-2*t.margin-l.lineHeight.heading-U-U,Z=Math.max(Ii,I-ce);t.heading(h(`certificate.pdfHeading`),{align:`center`}),t.space(U);let le=qe(await De(this.artworkService.getNftFetchableUrls(e.image)),u,Z,xi),{width:te,height:$}=a$1.getImageProperties(le),ge=te/$,ie=u,V=ie/ge;V>Z&&(V=Z,ie=V*ge),a$1.addImage(le,`JPEG`,(o$1-ie)/2,t.y,ie,V),t.space(V+U),t.paragraph(e.name??``,{size:l.size.title,style:`italic`,align:`center`}),t.paragraph(g,{size:l.size.caption,color:f.soft,align:`center`,charSpace:Be}),t.space(U),t.paragraph(v,{size:l.size.body,maxWidth:se,x:(o$1-se)/2}),t.space(U);for(let[J,ne]of x)this.certificateFact(t,J,ne);return t.space(U),t.paragraph(w,{size:l.size.small,color:f.soft,maxWidth:se,x:(o$1-se)/2}),t.textAt(`${a}/${e.tokenId}`,t.centerX,t.pageHeight-t.margin,{size:l.size.small,color:f.faint,align:`center`}),t.doc}heightOf(e,i,t,a){e.doc.setFontSize(t);let o=e.doc.splitTextToSize(i,a),u=t>=l.size.body?l.lineHeight.body:l.lineHeight.caption;return o.length*u}certificateFact(e,i,t){e.paragraph(i.toUpperCase(),{size:l.size.small,color:f.faint,charSpace:l.wideCharSpace,align:`center`}),e.paragraph(t,{size:l.size.caption,color:f.ink,align:`center`}),e.space(ri)}certificateDate(e){let i=this.translateService.currentLang()?.startsWith(`es`);return new Intl.DateTimeFormat(i?`es-ES`:`en-GB`,{day:`numeric`,month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(e))}async createDossier(e,i,t,a,o,u,h,p,v,w=Zt$1){t&&await this.cv.refresh();let g=await this.newWriter(),x=1+(u?1:0)+(a?1:0)+e.length+(t?1:0)+(i?1:0),ce=0,I=()=>h?.(++ce/x);await this.addCover(g,e,o),I(),u&&(g.newPage(),this.addCustomText(g,u),I()),a&&(g.newPage(),this.addStatement(g),I());for(let Z of e)g.newPage(),await this.addArtworkPage(g,Z,v??null),I();return t&&(g.newPage(),p?this.addCvProse(g,p):this.addCv(g),I()),i&&(g.newPage(),this.addContact(g,w),I()),g.addPageNumbers(),g.doc}async createStatement(){let e=await this.newWriter(O.a4);return this.addStatement(e),e.doc}async createCV(){await this.cv.refresh();let e=await this.newWriter(O.a4);return e.paragraph(Zt$1,{size:l.size.coverArtist,style:`bold`}),e.space(2),e.paragraph(this.translateService.instant(`cv.placeLine`),{size:l.size.body,color:f.soft}),e.space(8),this.addCv(e),e.doc}async createCvProse(e){let i=await this.newWriter(O.a4);return i.paragraph(Zt$1,{size:l.size.coverArtist,style:`bold`}),i.space(8),this.addCvProse(i,e),i.doc}addCvProse(e,i){this.beginTextColumn(e);for(let t of i.split(/\n{2,}/).filter(a=>a.trim()))e.paragraph(t.trim(),this.textColumnStyle(e)),e.space(3)}async addCover(e,i,t){let{GState:a}=await this.loadJspdf(),o=i[Math.floor(Math.random()*i.length)],h=ni(await De(this.artworkService.getNftFetchableUrls(o.image))),{doc:p,pageWidth:v,pageHeight:w,margin:g}=e;p.addImage(h,`JPEG`,0,0,v,w),p.saveGraphicsState(),p.setGState(new a({opacity:.35})),p.setFillColor(`#000000`),p.rect(0,w-72,v,72,`F`),p.restoreGraphicsState(),e.textAt(`JUANMA MORENO SÁNCHEZ`,g,g,{size:l.size.coverArtist,color:f.white,charSpace:l.wideCharSpace}),e.textAt(t||`Portfolio`,g,w-g-10,{size:l.size.coverTitle,color:f.white}),e.textAt(String(new Date().getFullYear()),g,w-g,{size:l.size.caption,color:f.white,charSpace:l.wideCharSpace})}async addArtworkPage(e,i,t$1=null){let{doc:a,pageWidth:o,pageHeight:u,margin:h,contentWidth:p}=e,v=this.availability.isSold(i.tokenId),w=t$1&&!v?Qt({height:this.artworkService.getTraitValue(i,t.HEIGHT),width:this.artworkService.getTraitValue(i,t.WIDTH)},this.artworkService.getTraitValue(i,t.MEDIUM),t$1):null,g=Ti+(w===null?0:Ze),x=u-2*h-g,I=qe(await De(this.artworkService.getNftFetchableUrls(i.image)),p,x),{width:Z,height:Le}=a.getImageProperties(I),le=Z/Le,te=p,$=te/le;$>x&&($=x,te=$*le);let ge=(o-te)/2,ie=h+(x-$)/2;a.addImage(I,`JPEG`,ge,ie,te,$);let V=u-h-6-(w===null?0:Ze),J=V+5;e.textAt(i.name??``,e.centerX,V,{size:l.size.title,style:`italic`,align:`center`});let ne=this.getTraitsAsText(i);if(e.textAt(ne,e.centerX,J,{size:l.size.caption,color:f.soft,align:`center`,charSpace:Be}),v){let si=e.textWidth(ne,{size:l.size.caption,charSpace:Be});a.setFillColor(f.accent),a.circle(e.centerX+si/2+4,J-1,1.2,`F`);return}w!==null&&e.textAt(Yt(w),e.centerX,J+Ze,{size:l.size.caption,align:`center`,charSpace:Be})}addCustomText(e,i){this.beginTextColumn(e),e.paragraph(i,this.textColumnStyle(e))}addStatement(e){let i=this.textColumnStyle(e);this.beginTextColumn(e),e.paragraph(this.translateService.instant(Ve.introduction.content),i),e.space(8),Ve.sections.forEach(t=>{e.ensureRoom(24),e.heading(this.translateService.instant(t.title),{x:i.x}),e.space(2),t.content?.forEach(a=>{e.paragraph(this.translateService.instant(a),i),e.space(3)}),t.items?.forEach(a=>{e.ensureRoom(14),e.paragraph(this.translateService.instant(a.subtitle),s(r({},i),{style:`italic`})),e.paragraph(this.translateService.instant(a.content),s(r({},i),{color:f.soft})),e.space(4)}),e.space(6)})}addCv(e){let t=e.margin+18,a=e.contentWidth-18,o=this.translateService.currentLang()?.startsWith(`es`)?`es`:`en`;Pe(this.cv.entries(),o).forEach(u=>{e.ensureRoom(26),e.heading(this.translateService.instant(u.title)),e.space(3),u.items.forEach(h=>{e.ensureRoom(12),e.textAt(String(h.year),e.margin,e.y,{size:l.size.caption,color:f.faint}),e.paragraph(h.title,{x:t,maxWidth:a,style:`italic`,lineHeight:4.8});let p=[h.venue,h.city,this.translateService.instant(h.countryKey)].filter(Boolean).join(`, `);e.paragraph(p,{x:t,maxWidth:a,size:l.size.caption,color:f.soft,lineHeight:4.4}),e.space(3)}),e.space(9)})}addContact(e,i){e.y=70;let t={align:`center`,lineHeight:6};e.heading(this.translateService.instant(`contact.title`),{align:`center`}),e.space(6),e.paragraph(i,t),e.paragraph(`(+34) 635820462`,s(r({},t),{color:f.soft})),e.paragraph(`morenosanchezjuanma@gmail.com`,s(r({},t),{color:f.soft})),e.paragraph(`juanmamoreno.com`,s(r({},t),{color:f.soft})),e.space(14),e.paragraph(this.translateService.instant(`contact.representedBy`),s(r({},t),{size:l.size.caption,color:f.faint})),e.space(2),e.paragraph(`(+34) 606780084`,s(r({},t),{color:f.soft})),e.paragraph(`galeriazunino@gmail.com`,s(r({},t),{color:f.soft})),e.paragraph(`www.galeriazunino.com`,s(r({},t),{color:f.soft}))}beginTextColumn(e){e.space(6)}textColumnStyle(e){return{x:(e.pageWidth-ai)/2,maxWidth:ai,lineHeight:l.lineHeight.body}}getTraitsAsText(e){let i=o=>this.artworkService.getTraitValue(e,o),t$2=this.translateService.instant(i(t.MEDIUM)),a=`${i(t.HEIGHT)} \xD7 ${i(t.WIDTH)} ${i(t.UNIT)}`;return`${i(t.YEAR)} \xB7 ${t$2} \xB7 ${a}`}static{this.ɵfac=function(i){return new(i||n$1)}}static{this.ɵprov=fe({token:n$1,factory:n$1.ɵfac,providedIn:`root`})}}return n$1})();function Ai(n,r){n&1&&(cs(0,`mat-icon`),qb(1,`assignment`),iu())}function zi(n,r){if(n&1&&Nm(0,`mat-progress-spinner`,1),n&2)Sm(`value`,gb().progressPercent())}function Di(n,r){n&1&&Nm(0,`mat-progress-spinner`,2)}function Ri(n,r){if(n&1&&(cs(0,`span`,3),qb(1),iu()),n&2){let e=gb();lT(),du(``,e.progressPercent(),`%`)}}var za=(()=>{class n{constructor(){this.translateService=y(H),this.pdfService=y(oi),this.dialog=y(ee),this.cvProse=y(ii),this.language=y(y$1),this.snackBar=y(Qt$1),this.nfts=VV([]),this.downloadFileType=VV(R.IMAGE),this.isCreating=ze$1(!1),this.progress=ze$1(0),this.progressPercent=_t(()=>Math.round(this.progress()*100))}getTooltip(){switch(this.downloadFileType()){case R.CV:return this.translateService.instant(`download.cv`);case R.STATEMENT:return this.translateService.instant(`download.statement`);case R.DOSSIER:return this.translateService.instant(`download.portfolio`);case R.IMAGE:default:return this.translateService.instant(`download.sheet`)}}createPDF(){switch(this.isCreating.set(!0),this.progress.set(0),this.downloadFileType()){case R.CV:this.saveDocument(this.pdfService.createCV(),`cv-juanmamoreno.pdf`);break;case R.STATEMENT:this.saveDocument(this.pdfService.createStatement(),`statement-juanmamoreno.pdf`);break;case R.DOSSIER:this.openDossierDialog();break;case R.IMAGE:default:{let e=this.nfts()[0];this.saveDocument(this.pdfService.createTechnicalSheet(e),`${e.name||`juanmamoreno`}.pdf`);break}}}async openDossierDialog(){let e=(await this.cvProse.read(this.language.inSpanish()?`es`:`en`))?.body??null;this.dialog.open(ti,{data:{includeContact:!0,includeCv:!0,includeStatement:!0,customTitle:``,customText:``,proseAvailable:!!e}}).afterClosed().subscribe(t=>{if(t){let{includeContact:a,includeCv:o,cvAsProse:u,includeStatement:h,customTitle:p,customText:v,prices:w,contactName:g}=t;this.saveDocument(this.pdfService.createDossier(this.nfts(),a,o,h,p,v,x=>this.progress.set(x),u?e:null,w??null,g),`dossier-juanmamoreno.pdf`)}else this.isCreating.set(!1)})}saveDocument(e,i){e.then(t=>{t.save(i),this.showToast(`download.success`)}).catch(()=>this.showToast(`download.error`)).finally(()=>this.isCreating.set(!1))}showToast(e){this.snackBar.open(this.translateService.instant(e),`Ok!`,{duration:3e3,verticalPosition:`top`})}static{this.ɵfac=function(i){return new(i||n)}}static{this.ɵcmp=ZC({type:n,selectors:[[`app-pdf-button`]],inputs:{nfts:[1,`nfts`],downloadFileType:[1,`downloadFileType`]},decls:5,vars:5,consts:[[`mat-icon-button`,``,`matTooltipPosition`,`below`,3,`click`,`disabled`,`matTooltip`],[`diameter`,`24`,`mode`,`determinate`,3,`value`],[`diameter`,`24`,`mode`,`indeterminate`],[1,`pdf-progress-label`]],template:function(i,t){i&1&&(cs(0,`button`,0),Fm(`click`,function(){return t.createPDF()}),Zw(1,Ai,2,0,`mat-icon`)(2,zi,1,1,`mat-progress-spinner`,1)(3,Di,1,0,`mat-progress-spinner`,2),iu(),Zw(4,Ri,2,1,`span`,3)),i&2&&(Sm(`disabled`,t.isCreating())(`matTooltip`,t.getTooltip()),Mm(`aria-label`,t.getTooltip()),lT(),Kw(t.isCreating()?t.progress()>0?2:3:1),lT(3),Kw(t.isCreating()&&t.progress()>0?4:-1))},dependencies:[wt,mt,wt$1,$t],styles:[`[_nghost-%COMP%]{display:inline-flex;align-items:center}.pdf-progress-label[_ngcontent-%COMP%]{margin-left:.25rem;font-variant-numeric:tabular-nums}`]})}}return n})();export{Nn as a,Ve as c,je as d,oi as f,Li as i,Xt as l,Ee as n,Pe as o,za as p,Ge as r,R as s,$t as t,ci as u};