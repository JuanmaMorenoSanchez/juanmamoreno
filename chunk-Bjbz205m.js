import{$r as z,Dr as tt,F as JV,Fr as ve,H as Kr,_t as S$1,ei as zC,fn as en,qn as me,qr as y,ri as ze,tn as bt}from"./chunk-C-HDQMac.js";var s=new WeakMap;var _=(()=>{class e{_appRef;_injector=y(ve);_environmentInjector=y(me);load(n){let t=this._appRef=this._appRef||this._injector.get(bt),i=s.get(t);i||(i={loaders:new Set,refs:[]},s.set(t,i),t.onDestroy(()=>{s.get(t)?.refs.forEach(M=>M.destroy()),s.delete(t)})),i.loaders.has(n)||(i.loaders.add(n),i.refs.push(JV(n,{environmentInjector:this._environmentInjector})))}static ɵfac=function(t){return new(t||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var R=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵcmp=zC({type:e,selectors:[[`ng-component`]],exportAs:[`cdkVisuallyHidden`],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2})}return e})();var d;function S(){if(d===void 0&&(d=null,typeof window<`u`)){let e=window;if(e.trustedTypes!==void 0)try{d=e.trustedTypes.createPolicy(`angular#components`,{createHTML:r=>r})}catch(r){console.error(r)}}return d}function T(e){return S()?.createHTML(e)||e}function N(e,r,n){e.innerHTML=T(n.sanitize(z.HTML,r)||``)}var E=new S$1(`cdk-dir-doc`,{providedIn:`root`,factory:()=>y(en)});var I=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function w(e){let r=e?.toLowerCase()||``;return r===`auto`&&typeof navigator<`u`&&navigator?.language?I.test(navigator.language)?`rtl`:`ltr`:r===`rtl`?`rtl`:`ltr`}var L=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ze(`ltr`);change=new tt;constructor(){let n=y(E,{optional:!0});if(n){let t=n.body?n.body.dir:null,i=n.documentElement?n.documentElement.dir:null;this.valueSignal.set(w(t||i||`ltr`))}}ngOnDestroy(){this.change.complete()}static ɵfac=function(t){return new(t||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();export{_ as a,T as i,N as n,R as r,L as t};