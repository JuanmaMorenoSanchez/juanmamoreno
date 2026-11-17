import{Bt as Ud,Hr as vC,Lr as tn,Rr as to,T as E$1,_n as ce,an as _t,ci as ze,d as CH,or as me,pt as Q,rr as mC,wt as S,zr as tt}from"./chunk-DvM41yqF.js";var s=new WeakMap;var x=(()=>{class e{_appRef;_injector=E$1(ce);_environmentInjector=E$1(me);load(n){let t=this._appRef=this._appRef||this._injector.get(_t),i=s.get(t);i||(i={loaders:new Set,refs:[]},s.set(t,i),t.onDestroy(()=>{s.get(t)?.refs.forEach(S=>S.destroy()),s.delete(t)})),i.loaders.has(n)||(i.loaders.add(n),i.refs.push(CH(n,{environmentInjector:this._environmentInjector})))}static ɵfac=function(t){return new(t||e)};static ɵprov=to({token:e,factory:e.ɵfac})}return e})();var V=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵcmp=mC({type:e,selectors:[[`ng-component`]],exportAs:[`cdkVisuallyHidden`],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2})}return e})();var l;function E(){if(l===void 0&&(l=null,typeof window<`u`)){let e=window;if(e.trustedTypes!==void 0)try{l=e.trustedTypes.createPolicy(`angular#components`,{createHTML:r=>r})}catch(r){console.error(r)}}return l}function k(e){return E()?.createHTML(e)||e}function O(e,r,n){e.innerHTML=k(n.sanitize(Q.HTML,r)||``)}var I=new S(`cdk-dir-doc`,{providedIn:`root`,factory:()=>E$1(tn)});var L=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function C(e){let r=e?.toLowerCase()||``;return r===`auto`&&typeof navigator<`u`&&navigator?.language?L.test(navigator.language)?`rtl`:`ltr`:r===`rtl`?`rtl`:`ltr`}var T=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ze(`ltr`);change=new tt;constructor(){let n=E$1(I,{optional:!0});if(n){let t=n.body?n.body.dir:null,i=n.documentElement?n.documentElement.dir:null;this.valueSignal.set(C(t||i||`ltr`))}}ngOnDestroy(){this.change.complete()}static ɵfac=function(t){return new(t||e)};static ɵprov=to({token:e,factory:e.ɵfac})}return e})();var J=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵmod=vC({type:e});static ɵinj=Ud({})}return e})();export{k as a,V as i,O as n,x as o,T as r,J as t};