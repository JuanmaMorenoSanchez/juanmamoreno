import{Ft as XV,Mr as tt,U as Kr,V as KC,Vr as ve,Zr as y,ai as z,dt as Rd,er as me,ht as S,jr as tn,oi as ze,rn as bt,zt as YC}from"./chunk-BPeFBJTQ.js";var s=new WeakMap;var T=(()=>{class e{_appRef;_injector=y(ve);_environmentInjector=y(me);load(n){let t=this._appRef=this._appRef||this._injector.get(bt),i=s.get(t);i||(i={loaders:new Set,refs:[]},s.set(t,i),t.onDestroy(()=>{s.get(t)?.refs.forEach(S=>S.destroy()),s.delete(t)})),i.loaders.has(n)||(i.loaders.add(n),i.refs.push(XV(n,{environmentInjector:this._environmentInjector})))}static ɵfac=function(t){return new(t||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var A=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵcmp=YC({type:e,selectors:[[`ng-component`]],exportAs:[`cdkVisuallyHidden`],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2})}return e})();var d;function E(){if(d===void 0&&(d=null,typeof window<`u`)){let e=window;if(e.trustedTypes!==void 0)try{d=e.trustedTypes.createPolicy(`angular#components`,{createHTML:r=>r})}catch(r){console.error(r)}}return d}function I(e){return E()?.createHTML(e)||e}function F(e,r,n){e.innerHTML=I(n.sanitize(z.HTML,r)||``)}var L=new S(`cdk-dir-doc`,{providedIn:`root`,factory:()=>y(tn)});var x=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function _(e){let r=e?.toLowerCase()||``;return r===`auto`&&typeof navigator<`u`&&navigator?.language?x.test(navigator.language)?`rtl`:`ltr`:r===`rtl`?`rtl`:`ltr`}var C=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ze(`ltr`);change=new tt;constructor(){let n=y(L,{optional:!0});if(n){let t=n.body?n.body.dir:null,i=n.documentElement?n.documentElement.dir:null;this.valueSignal.set(_(t||i||`ltr`))}}ngOnDestroy(){this.change.complete()}static ɵfac=function(t){return new(t||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var G=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵmod=KC({type:e});static ɵinj=Rd({})}return e})();export{I as a,G as i,C as n,T as o,F as r,A as t};