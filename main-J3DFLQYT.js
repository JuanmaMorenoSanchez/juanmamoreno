import{a as Jr,b as Zr,c as Xr,d as Bi}from"./chunk-Q5LP6EF7.js";import{a as ca}from"./chunk-EUZ4Y3ML.js";import{a as Hr,b as Qr,c as Gr,d as oa}from"./chunk-5USAYU5R.js";import{b as ea}from"./chunk-3DVNJWNZ.js";import{a as la}from"./chunk-TL4QSMBI.js";import"./chunk-MN4PR4S4.js";import{b as $,c as sa}from"./chunk-TVJKV4LD.js";import{a as Ct}from"./chunk-U3JP5CW6.js";import{a as Sr,f as Ar,h as W,i as ta,j as ia,k as na,l as ra}from"./chunk-K6NIEZUH.js";import{A as ri,B as ai,H as Wr,N as $r,P as Li,Q as Ri,d as xr,l as wr,n as kr,p as Cr,r as Nr,s as Vr,t as zr,w as Ur,x as jr,y as qr}from"./chunk-HY3WFVXS.js";import{E as pe,H as Je,I as Lr,J as Rr,K as Br,M as ni,N as Kr,O as oi,P as Yr,a as Ke,e as Er,f as Ye,g as Fi,i as Mr,j as ei,k as Ir,p as Tr,q as Dr,r as Pr,s as Or,t as Fr,v as ti,x as ii}from"./chunk-PBEZ3NI3.js";import{a as aa}from"./chunk-BGT7SY5H.js";import{a as Be}from"./chunk-TCUJPVBP.js";import{a as St}from"./chunk-MLISIJIN.js";import{a as Se}from"./chunk-RCFNFHSB.js";import{a as wt,b as hr,c as pr,d as ur,e as X,f as Xt,g as fr,h as gr,i as _r,j as br,k as yr}from"./chunk-DF3EF2WL.js";import{e as er,g as tr,h as ir,i as nr,j as rr,k as ar,l as or,m as sr,p as lr,q as cr}from"./chunk-S7YAOHSK.js";import{a as dr,c as mr,e as Ae,f as kt,g as vr}from"./chunk-WH6SFUZP.js";import{$ as ie,$c as Oi,Aa as Bn,Ac as Yn,B as Ue,Ba as Nn,Bc as M,Ca as Vn,Cc as I,D as In,Db as b,E as De,Ea as Ei,Eb as Wn,Ec as Di,F as Si,Fa as rt,Fb as $n,Fc as Jn,G as Yt,Gb as q,H as je,Ha as zn,Hb as H,Ia as ae,Ja as Un,Jb as Jt,Jc as Pi,Kb as Qe,Kc as Zn,Lb as Ge,M as Tn,Mb as x,Nb as m,Ob as h,Oc as Xn,P as Dn,Pb as ne,Q as Pe,R as _e,S as Z,U as Ot,V as Pn,Vb as Ii,Wb as xe,Xb as Kn,Y as xt,Yc as Re,_b as N,_c as Ce,ac as w,b as Cn,ba as s,bb as jn,bc as le,ca as On,cb as Mi,cc as V,d as Sn,db as d,dc as Fe,e as S,ec as Le,f as it,fb as qn,fc as O,g as $t,ga as be,gb as Ft,gc as F,h as An,ha as ye,hb as Hn,i as nt,ia as Ai,ib as Qn,j as ge,k as vt,kc as he,l as J,la as Oe,lb as Gn,lc as Ti,ma as qe,mc as G,n as Kt,nc as Zt,oc as f,p as En,pa as ve,pc as We,q as P,qa as He,qc as U,rb as E,ta as re,tb as me,v as Mn,wa as Fn,xa as Ln,xb as at,y as ke,yb as ot,yc as $e,z,za as Rn}from"./chunk-6HSBDXZL.js";import{a as c,b as _,c as kn,d as Wt}from"./chunk-YNC7RVHT.js";var st={type:null,entityIds:null,skip:!1,payload:null},Ni=!1;function Vi(){Ni=!1}function ce(n,i,e){K(n,i,e),Ni=!0}function K(n,i,e){Ni===!1&&(st.type=n,st.entityIds=i,st.payload=e)}function zi(n=!0){st.skip=n}function Ui(n,i){return function(e,t,r){let a=r.value;return r.value=function(...o){return ce(n,i),a.apply(this,o)},r}}function Ee(n,i){return n.hasOwnProperty(i)}function ue(n){return Array.isArray(n)}function Lt(n){return n.hasOwnProperty("active")}function si(n){return ue(n)}function Rt({active:n,ids:i,entities:e}){return si(n)?da(n,i):Ee(e,n)===!1?null:n}function da(n,i){let e=n.filter(t=>i.indexOf(t)>-1);return e.length===n.length?n:e}function ji({state:n,entities:i,idKey:e,options:t={},preAddEntity:r}){let a={},o=[],l=!1;for(let p of i)if(Ee(n.entities,p[e])===!1){let u=r(p),j=u[e];a[j]=u,t.prepend?o.unshift(j):o.push(j),l=!0}return l?{newState:_(c({},n),{entities:c(c({},n.entities),a),ids:t.prepend?[...o,...n.ids]:[...n.ids,...o]}),newIds:o}:null}function Y(n){return n==null}function Q(n){return Y(n)?[]:Array.isArray(n)?n:[n]}function Me(n){return ue(n)?n.length===0:!1}function y(n){return typeof n=="function"}function Ie(n){let i=typeof n;return n!=null&&(i=="object"||i=="function")}var ma={resettable:!1,ttl:null,producerFn:void 0};function At(){return ma}function ha(){return ma.producerFn}function Ze(n){return Y(n)===!1}var Bt=new S,ct=new $t(50,5e3),qi=new S;function pa(n){Bt.next(n)}function ua(n){ct.next(n)}function fa(n,i){qi.next({storeName:n,action:i})}var dt=typeof window<"u",Nt=!dt,Hi=()=>{try{return typeof localStorage<"u"}catch{return!1}},ga=()=>{try{return typeof sessionStorage<"u"}catch{return!1}};var L={},Qi={};dt&&(window.$$stores=L,window.$$queries=Qi);function Gi(n){return n&&n.charAt(0).toUpperCase()+n.slice(1)}var Et=[];function Wi(n,i={}){if(Nt||!window.__REDUX_DEVTOOLS_EXTENSION__)return;Et.length&&Et.forEach(u=>{u.unsubscribe?u.unsubscribe():u&&u()}),n&&n.run||(n=n||{},n.run=u=>u(),i=n);let r=Object.assign({},{name:"Akita",shallow:!0,storesWhitelist:[]},i),a=r.storesWhitelist,o=window.__REDUX_DEVTOOLS_EXTENSION__.connect(r),l={},p=u=>a.length?a.indexOf(u)>-1:!0;Et.push(ct.subscribe(u=>{p(u)!==!1&&(l=_(c({},l),{[u]:L[u]._value()}),o.send({type:`[${Gi(u)}] - @@INIT`},l))})),Et.push(Bt.subscribe(u=>{p(u)!==!1&&(delete l[u],o.send({type:`[${u}] - Delete Store`},l))})),Et.push(qi.subscribe(({storeName:u,action:j})=>{if(p(u)===!1)return;let Dt=j,{type:D,entityIds:A,skip:k}=Dt,ee=Wt(Dt,["type","entityIds","skip"]).payload;if(k){zi(!1);return}let de=L[u];if(!de||i.shallow===!1&&l[u]&&JSON.stringify(de._value())===JSON.stringify(l[u]))return;l=_(c({},l),{[u]:de._value()});let fe=Gi(u),te=Ze(A)?`[${fe}] - ${D} (ids: ${A})`:`[${fe}] - ${D}`;if(i.logTrace&&(console.group(te),console.trace(),console.groupEnd()),i.sortAlphabetically){let gt=Object.keys(l).sort().reduce((_t,Pt)=>(_t[Pt]=l[Pt],_t),{});o.send(c({type:te},ee),gt);return}o.send(c({type:te},ee),l)})),Et.push(o.subscribe(u=>{if(u.type==="DISPATCH"){if(u.payload.type==="COMMIT"){o.init(l);return}if(u.state){let D=JSON.parse(u.state);for(let A=0,k=Object.keys(D);A<k.length;A++){let B=k[A];L[B]&&n.run(()=>{L[B]._setState(()=>D[B],!1)})}}}}))}var Xe=(function(n){return n.Set="Set",n.Add="Add",n.Update="Update",n.Remove="Remove",n})(Xe||{});var Vt=!0;function $i(){Vt=!1,dt&&(delete window.$$stores,delete window.$$queries)}function R(){return Vt}function Ki(n,i,e){let t;if(ue(n))t=n;else if(Ie(n)){if(Y(e))return;n=Object.assign({wrap:!0},n);let r=i.indexOf(e);if(n.prev){let a=r===0;if(a&&!n.wrap)return;t=a?i[i.length-1]:i[r-1]}else if(n.next){let a=i.length===r+1;if(a&&!n.wrap)return;t=a?i[0]:i[r+1]}}else{if(n===e)return;t=n}return t}var Yi=()=>({entities:{},ids:[],loading:!0,error:null});function we(n){return n===void 0}function Ji({state:n,ids:i}){if(Y(i))return _a(n);let e=n.entities,t={};for(let a of n.ids)i.includes(a)===!1&&(t[a]=e[a]);let r=_(c({},n),{entities:t,ids:n.ids.filter(a=>i.includes(a)===!1)});return Lt(n)&&(r.active=Rt(r)),r}function _a(n){return _(c({},n),{entities:{},ids:[],active:si(n.active)?[]:null})}function Zi(n,i,e){let t={entities:{},ids:[]};for(let r of n){let a=e(r);t.entities[a[i]]=a,t.ids.push(a[i])}return t}function ya(n){return n.entities&&n.ids}function ba(n,i){let e={};for(let t of Object.keys(n))e[t]=i(n[t]);return e}function Xi({state:n,entities:i,idKey:e,preAddEntity:t,isNativePreAdd:r}){let a,o;if(ue(i)){let p=Zi(i,e,t);a=p.entities,o=p.ids}else ya(i)?(a=r?i.entities:ba(i.entities,t),o=i.ids):(a=r?i:ba(i,t),o=Object.keys(a).map(p=>isNaN(p)?p:Number(p)));let l=_(c({},n),{entities:a,ids:o,loading:!1});return Lt(n)&&(l.active=Rt(l)),l}function en(n){Object.freeze(n);let i=typeof n=="function",e=Object.prototype.hasOwnProperty;return Object.getOwnPropertyNames(n).forEach(function(t){e.call(n,t)&&(!i||t!=="caller"&&t!=="callee"&&t!=="arguments")&&n[t]!==null&&(typeof n[t]=="object"||typeof n[t]=="function")&&!Object.isFrozen(n[t])&&en(n[t])}),n}function va(n,i){n||console.error(`@StoreConfig({ name }) is missing in ${i}`)}function Ne(n){return n!=null&&`${n}`!="false"}function Mt(n){return Ne(n)&&n.constructor.name==="Object"}var mt="akitaConfig";function tn(n){return function(i){i[mt]={idKey:"id"};for(let e=0,t=Object.keys(n);e<t.length;e++){let r=t[e];r==="name"?i[mt].storeName=n[r]:i[mt][r]=n[r]}}}var lo=new S,xa=new it(!1),Ve={activeTransactions:0,batchTransaction:null};function wa(){li()||(Ve.batchTransaction=new S),Ve.activeTransactions++,xa.next(!0)}function ka(){--Ve.activeTransactions===0&&(Ve.batchTransaction.next(!0),Ve.batchTransaction.complete(),xa.next(!1),lo.next(!0))}function li(){return Ve.activeTransactions>0}function nn(){return Ve.batchTransaction?Ve.batchTransaction.asObservable():J(!0)}function zt(n,i=void 0){wa();try{return n.apply(i)}finally{ce("@Transaction"),ka()}}function ci(){return function(n,i,e){let t=e.value;return e.value=function(...r){return zt(()=>t.apply(this,r),this)},e}}var et=class{constructor(i,e={}){this.options=e,this.inTransaction=!1,this.cache={active:new it(!1),ttl:null},this.onInit(i)}setLoading(i=!1){i!==this._value().loading&&(R()&&K("Set Loading"),this._setState(e=>_(c({},e),{loading:i})))}setHasCache(i,e={restartTTL:!1}){if(i!==this.cache.active.value&&this.cache.active.next(i),e.restartTTL){let t=this.getCacheTTL();t&&(this.cache.ttl!==null&&clearTimeout(this.cache.ttl),this.cache.ttl=setTimeout(()=>this.setHasCache(!1),t))}}getValue(){return this.storeValue}setError(i){i!==this._value().error&&(R()&&K("Set Error"),this._setState(e=>_(c({},e),{error:i})))}_select(i){return this.store.asObservable().pipe(P(e=>i(e.state)),je())}_value(){return this.storeValue}_cache(){return this.cache.active}get config(){return this.constructor[mt]||{}}get storeName(){return this.config.storeName||this.options.storeName||this.options.name}get deepFreeze(){return this.config.deepFreezeFn||this.options.deepFreezeFn||en}get cacheConfig(){return this.config.cache||this.options.cache}get _producerFn(){return this.config.producerFn||this.options.producerFn||ha()}get resettable(){return Ze(this.config.resettable)?this.config.resettable:this.options.resettable}_setState(i,e=!0){if(y(i)){let t=i(this._value());this.storeValue=Vt?this.deepFreeze(t):t}else this.storeValue=i;if(!this.store){this.store=new it({state:this.storeValue}),R()&&this.store.subscribe(({action:t})=>{t&&fa(this.storeName,t)});return}if(li()){this.handleTransaction();return}this.dispatch(this.storeValue,e)}reset(){this.isResettable()&&(R()&&K("Reset"),this._setState(()=>Object.assign({},this._initialState)),this.setHasCache(!1))}update(i){R()&&K("Update");let e,t=this._value();y(i)?e=y(this._producerFn)?this._producerFn(t,i):i(t):e=i;let r=this.akitaPreUpdate(t,c(c({},t),e)),a=Mt(t)?r:new t.constructor(r);this._setState(a)}updateStoreConfig(i){this.options=c(c({},this.options),i)}akitaPreUpdate(i,e){return e}destroy(){!(dt&&window.hmrEnabled)&&this===L[this.storeName]&&(delete L[this.storeName],pa(this.storeName),this.setHasCache(!1),this.cache.active.complete(),this.store.complete())}onInit(i){L[this.storeName]=this,this._setState(()=>i),ua(this.storeName),this.isResettable()&&(this._initialState=i),R()&&va(this.storeName,this.constructor.name)}dispatch(i,e=!0){let t;e&&(t=st,Vi()),this.store.next({state:i,action:t})}watchTransaction(){nn().subscribe(()=>{this.inTransaction=!1,this.dispatch(this._value())})}isResettable(){return this.resettable===!1?!1:this.resettable||At().resettable}handleTransaction(){this.inTransaction||(this.watchTransaction(),this.inTransaction=!0)}getCacheTTL(){return this.cacheConfig&&this.cacheConfig.ttl||At().ttl}};function rn({state:n,ids:i,idKey:e,newStateOrFn:t,preUpdateEntity:r,producerFn:a,onEntityIdChanges:o}){let l={},p=!1,u;for(let k of i){if(Ee(n.entities,k)===!1)continue;let B=n.entities[k],ee;y(t)?ee=y(a)?a(B,t):t(B):ee=t;let de=ee.hasOwnProperty(e)&&ee[e]!==B[e],fe;u=k,de&&(p=!0,u=ee[e]);let te=c(c({},B),ee);Mt(B)?fe=te:Mt(ee)?fe=new B.constructor(te):fe=new ee.constructor(te),l[u]=r(B,fe)}let j=n.ids,D=n.entities;if(p){let[k]=i,A=n.entities,{[k]:B}=A;D=Wt(A,[kn(k)]),j=n.ids.map(de=>de===k?u:de),o(k,u)}return _(c({},n),{entities:c(c({},D),l),ids:j})}var Ca,ht=class n extends et{constructor(i={},e={}){super(c(c({},Yi()),i),e),this.options=e,this.entityActions=new S,this.entityIdChanges=new S}get selectEntityAction$(){return this.entityActions.asObservable()}get selectEntityIdChanges$(){return this.entityIdChanges.asObservable()}get idKey(){return this.config.idKey||this.options.idKey||"id"}set(i,e={}){if(Y(i))return;R()&&K("Set Entity");let t=this.akitaPreAddEntity===n.prototype.akitaPreAddEntity;this.setHasCache(!0,{restartTTL:!0}),this._setState(r=>{let a=Xi({state:r,entities:i,idKey:this.idKey,preAddEntity:this.akitaPreAddEntity.bind(this),isNativePreAdd:t});return we(e.activeId)===!1&&(a.active=e.activeId),a}),this.hasInitialUIState()&&this.handleUICreation(),this.entityActions.next({type:Xe.Set,ids:this.ids})}add(i,e={loading:!1}){let t=Q(i);if(Me(t))return;let r=ji({state:this._value(),preAddEntity:this.akitaPreAddEntity.bind(this),entities:t,idKey:this.idKey,options:e});r&&(R()&&K("Add Entity"),r.newState.loading=e.loading,this._setState(()=>r.newState),this.hasInitialUIState()&&this.handleUICreation(!0),this.entityActions.next({type:Xe.Add,ids:r.newIds}))}update(i,e){if(we(e)){super.update(i);return}let t=[];if(y(i)?t=this.ids.filter(a=>i(this.entities[a])):t=Y(i)?this.ids:Q(i),Me(t))return;R()&&K("Update Entity",t);let r;this._setState(a=>rn({idKey:this.idKey,ids:t,preUpdateEntity:this.akitaPreUpdateEntity.bind(this),state:a,newStateOrFn:e,producerFn:this._producerFn,onEntityIdChanges:(o,l)=>{r={oldId:o,newId:l},this.entityIdChanges.next(_(c({},r),{pending:!0}))}})),r&&this.entityIdChanges.next(_(c({},r),{pending:!1})),this.entityActions.next({type:Xe.Update,ids:t})}upsert(i,e,t,r={}){let a=Q(i),o=D=>A=>Ee(this.entities,A)===D,l=y(t)?r.baseClass:t?t.baseClass:void 0,p=y(l),u=a.filter(o(!0)),j=a.filter(o(!1)).map(D=>{let A=typeof e=="function"?e({}):e,k=y(t)?t(D,A):A,B=_(c({},k),{[this.idKey]:D});return p?new l(B):B});this.update(u,e),this.add(j),R()&&ce("Upsert Entity")}upsertMany(i,e={}){let t=[],r=[],a={};for(let o of i){let l=this.akitaPreCheckEntity(o),p=l[this.idKey];if(Ee(this.entities,p)){let u=this._value().entities[p],j=c(c({},this._value().entities[p]),l),D=e.baseClass?new e.baseClass(j):j,A=this.akitaPreUpdateEntity(u,D),k=A[this.idKey];a[k]=A,r.push(k)}else{let u=e.baseClass?new e.baseClass(l):l,j=this.akitaPreAddEntity(u),D=j[this.idKey];t.push(D),a[D]=j}}R()&&ce("Upsert Many"),this._setState(o=>_(c({},o),{ids:t.length?[...o.ids,...t]:o.ids,entities:c(c({},o.entities),a),loading:!!e.loading})),r.length&&this.entityActions.next({type:Xe.Update,ids:r}),t.length&&this.entityActions.next({type:Xe.Add,ids:t}),t.length&&this.hasUIStore()&&this.handleUICreation(!0)}replace(i,e){let t=Q(i);if(Me(t))return;let r={};for(let a of t)r[a]=_(c({},e),{[this.idKey]:a});R()&&K("Replace Entity",i),this._setState(a=>_(c({},a),{entities:c(c({},a.entities),r)}))}move(i,e){let t=this.ids.slice();t.splice(e<0?t.length+e:e,0,t.splice(i,1)[0]),R()&&K("Move Entity"),this._setState(r=>_(c({},r),{entities:c({},r.entities),ids:t}))}remove(i){if(Me(this.ids))return;let e=Ze(i),t=[];y(i)?t=this.ids.filter(r=>i(this.entities[r])):t=e?Q(i):this.ids,!Me(t)&&(R()&&K("Remove Entity",t),this._setState(r=>Ji({state:r,ids:t})),e||this.setHasCache(!1),this.handleUIRemove(t),this.entityActions.next({type:Xe.Remove,ids:t}))}updateActive(i){let e=Q(this.active);R()&&K("Update Active",e),this.update(e,i)}setActive(i){let e=Ki(i,this.ids,this.active);e!==void 0&&(R()&&K("Set Active",e),this._setActive(e))}addActive(i){let e=Q(i);Me(e)||e.every(r=>this.active.indexOf(r)>-1)||(R()&&K("Add Active",i),this._setState(r=>{let a=Array.from(new Set([...r.active,...e]));return _(c({},r),{active:a})}))}removeActive(i){let e=Q(i);Me(e)||!e.some(r=>this.active.indexOf(r)>-1)||(R()&&K("Remove Active",i),this._setState(r=>_(c({},r),{active:Array.isArray(r.active)?r.active.filter(a=>e.indexOf(a)===-1):null})))}toggleActive(i){let e=Q(i),t=o=>l=>this.active.includes(l)===o,r=e.filter(t(!0)),a=e.filter(t(!1));this.removeActive(r),this.addActive(a),R()&&ce("Toggle Active")}createUIStore(i={},e={}){let t={name:`UI/${this.storeName}`,idKey:this.idKey};return this.ui=new Ut(i,c(c({},t),e)),this.ui}destroy(){super.destroy(),this.ui instanceof n&&this.ui.destroy(),this.entityActions.complete()}akitaPreUpdateEntity(i,e){return e}akitaPreAddEntity(i){return i}akitaPreCheckEntity(i){return i}get ids(){return this._value().ids}get entities(){return this._value().entities}get active(){return this._value().active}_setActive(i){this._setState(e=>_(c({},e),{active:i}))}handleUICreation(i=!1){let e=this.ids,t=y(this.ui._akitaCreateEntityFn),r,a=o=>{let l=this.entities[o],p=t?this.ui._akitaCreateEntityFn(l):this.ui._akitaCreateEntityFn;return c({[this.idKey]:l[this.idKey]},p)};i?r=this.ids.filter(o=>we(this.ui.entities[o])).map(a):r=e.map(a),i?this.ui.add(r):this.ui.set(r)}hasInitialUIState(){return this.hasUIStore()&&we(this.ui._akitaCreateEntityFn)===!1}handleUIRemove(i){this.hasUIStore()&&this.ui.remove(i)}hasUIStore(){return this.ui instanceof Ut}};nt([ci(),ge("design:type",Function),ge("design:paramtypes",[Object,Object,Object,Object]),ge("design:returntype",void 0)],ht.prototype,"upsert",null);nt([ci(),ge("design:type",Function),ge("design:paramtypes",[typeof(Ca=typeof T<"u"&&T)=="function"?Ca:Object]),ge("design:returntype",void 0)],ht.prototype,"toggleActive",null);var Ut=class extends ht{constructor(i={},e={}){super(i,e)}setInitialEntityState(i){this._akitaCreateEntityFn=i}};function an(){return z(n=>n!=null)}function Sa(n){return function(i,e){let t=y(n[0]);return n.some(r=>t?r(i)!==r(e):i[r]!==e[r])===!1}}function pt(n){return typeof n=="string"}var on="akitaQueryConfig";var ut=class{constructor(i){this.store=i,this.__store__=i,R()&&(Qi[i.storeName]=this)}select(i){let e;if(y(i))e=i;else if(pt(i))e=t=>t[i];else{if(Array.isArray(i))return this.store._select(t=>t).pipe(je(Sa(i)),P(t=>y(i[0])?i.map(r=>r(t)):i.reduce((r,a)=>(r[a]=t[a],r),{})));e=t=>t}return this.store._select(e)}selectLoading(){return this.select(i=>i.loading)}selectError(){return this.select(i=>i.error)}getValue(){return this.store._value()}selectHasCache(){return this.store._cache().asObservable()}getHasCache(){return this.store._cache().value}get config(){return this.constructor[on]}};function ft(n,i){return i.split(".").length===1?n:i.split(".").slice(1).join(".").split(".").reduce((t,r)=>t&&t[r],n)}function It(n,i,e,t=!1){let r=i.split(".");if(r.length===1)return c(c({},n),e);n=c({},n);let a=r.length-2;return i.split(".").slice(1).reduce((l,p,u)=>u!==a?(l[p]=c({},l[p]),l&&l[p]):(l[p]=t||Array.isArray(l[p])||!Ie(l[p])?e:c(c({},l[p]),e),l&&l[p]),n),n}var Ea=!1,uo=new $t(1);function sn(n){Ea=n}function fo(){return Ea}function go(n){return n&&y(n.then)}function jt(n){return go(n)||Kt(n)?vt(n):J(n)}function ln(n){let i={key:"AkitaStores",enableInNonBrowser:!1,storage:Hi()?localStorage:n.storage,deserialize:JSON.parse,serialize:JSON.stringify,include:[],select:[],persistOnDestroy:!1,preStorageUpdate:function(C,v){return v},preStoreUpdate:function(C,v){return v},skipStorageUpdate:fo,preStorageUpdateOperator:()=>C=>C},{storage:e,enableInNonBrowser:t,deserialize:r,serialize:a,include:o,select:l,key:p,preStorageUpdate:u,persistOnDestroy:j,preStorageUpdateOperator:D,preStoreUpdate:A,skipStorageUpdate:k}=Object.assign({},i,n);if(Nt&&!t||!e)return;let B=o.length>0,ee=l.length>0,de,fe;B&&(de=o.reduce((C,v)=>{if(y(v))C.fns.push(v);else{let Te=v.split(".")[0];C[Te]=v}return C},{fns:[]})),ee&&(fe=l.reduce((C,v)=>(C[v.storeName]=v,C),{}));let te={},Dt={},gt=[],_t=[];function Pt(C){jt(C).subscribe(()=>{let v=_t.shift();v&&Pt(v)})}let ro=Hi()&&e===localStorage||ga()&&e===sessionStorage;return jt(e.getItem(p)).subscribe(C=>{let v=Ie(C)?C:r(C||"{}");function Te(g){v.$cache=c(c({},v.$cache||{}),g),v=Object.assign({},v,Dt),_t.push(e.setItem(p,ro?a(v):v)),Pt(_t.shift())}function bt(g,yt){te[g]=L[g]._select(se=>ft(se,yt)).pipe(Dn(1),P(se=>ee&&fe[g]?fe[g](se):se),z(()=>k()===!1),D()).subscribe(se=>{Dt[g]=u(g,se),Promise.resolve().then(()=>Te({[g]:L[g]._cache().getValue()}))})}function Ci(g,yt,se){if(g in v){K("@PersistState"),yt._setState(Gt=>It(Gt,se,A(g,v[g],Gt)));let wn=v.$cache?v.$cache[g]:!1;L[g].setHasCache(wn,{restartTTL:!0})}}gt.push(Bt.subscribe(g=>{te[g]&&(j===!1&&Te({[g]:!1}),te[g].unsubscribe(),delete te[g])})),gt.push(ct.subscribe(g=>{if(g==="router")return;let yt=L[g];if(B){let se=de[g];if(!se)if(de.fns.some(Gt=>Gt(g)))se=g;else return;Ci(g,yt,se),bt(g,se)}else Ci(g,yt,g),bt(g,g)})),uo.next(!0)}),{destroy(){gt.forEach(C=>C.unsubscribe());for(let C=0,v=Object.keys(te);C<v.length;C++){let Te=v[C];te[Te].unsubscribe()}te={}},clear(){e.clear()},clearStore(C){if(Y(C)){jt(e.setItem(p,"{}")).subscribe();return}let v=e.getItem(p);jt(v).subscribe(Te=>{let bt=r(Te||"{}");bt[C]&&(delete bt[C],jt(e.setItem(p,a(bt))).subscribe())})}}}var tt=class{constructor(i,e){this.query=i,e&&e.resetFn&&At().resettable&&this.onReset(e.resetFn)}getQuery(){return this.query}getStore(){return this.getQuery().__store__}isEntityBased(i){return Ne(i)}selectSource(i,e){return this.isEntityBased(i)?this.getQuery().selectEntity(i).pipe(an()):e?this.getQuery().select(t=>ft(t,this.withStoreName(e))):this.getQuery().select()}getSource(i,e){if(this.isEntityBased(i))return this.getQuery().getEntity(i);let t=this.getQuery().getValue();return e?ft(t,this.withStoreName(e)):t}withStoreName(i){return`${this.storeName}.${i}`}get storeName(){return this.getStore().storeName}updateStore(i,e,t,r=!1){if(this.isEntityBased(e)){let a=this.getStore();r?a.replace(e,i):a.update(e,i)}else{if(t){this.getStore()._setState(o=>It(o,this.withStoreName(t),i,!0));return}let a=r?i:o=>c(c({},o),i);this.getStore()._setState(a)}}onReset(i){let e=this.getStore().reset;this.getStore().reset=(...t)=>{setTimeout(()=>{e.apply(this.getStore(),t),i()})}}};var vo={pagesControls:!1,range:!1,startWith:1,cacheTimeout:void 0,clearStoreWithCache:!0},di=class extends tt{constructor(i,e={}){super(i,{resetFn:()=>{this.initial=!1,this.destroy({clearCache:!0,currentPage:1})}}),this.query=i,this.config=e,this.metadata=new Map,this.pages=new Map,this.pagination={currentPage:1,perPage:0,total:0,lastPage:0,data:[]},this.initial=!0,this.isLoading$=this.query.selectLoading().pipe(Yt(0)),this.config=c(c({},vo),e);let{startWith:t,cacheTimeout:r}=this.config;this.page=new it(t),Kt(r)&&(this.clearCacheSubscription=r.subscribe(()=>this.clearCache()))}get pageChanges(){return this.page.asObservable()}get currentPage(){return this.pagination.currentPage}get isFirst(){return this.currentPage===1}get isLast(){return this.currentPage===this.pagination.lastPage}withControls(){return this.config.pagesControls=!0,this}withRange(){return this.config.range=!0,this}setLoading(i=!0){this.getStore().setLoading(i)}update(i){this.pagination=i,this.addPage(i.data)}addPage(i){this.pages.set(this.currentPage,{ids:i.map(e=>e[this.getStore().idKey])}),this.getStore().upsertMany(i)}clearCache(i={}){this.initial||(ce("@Pagination - Clear Cache"),i.clearStore!==!1&&(this.config.clearStoreWithCache||i.clearStore)&&this.getStore().remove(),this.pages=new Map,this.metadata=new Map),this.initial=!1}clearPage(i){this.pages.delete(i)}destroy({clearCache:i,currentPage:e}={}){this.clearCacheSubscription&&this.clearCacheSubscription.unsubscribe(),i&&this.clearCache(),we(e)||this.setPage(e),this.initial=!0}isPageActive(i){return this.currentPage===i}setPage(i){(i!==this.currentPage||!this.hasPage(i))&&this.page.next(this.pagination.currentPage=i)}nextPage(){this.currentPage!==this.pagination.lastPage&&this.setPage(this.pagination.currentPage+1)}prevPage(){this.pagination.currentPage>1&&this.setPage(this.pagination.currentPage-1)}setLastPage(){this.setPage(this.pagination.lastPage)}setFirstPage(){this.setPage(1)}hasPage(i){return this.pages.has(i)}getPage(i){let e=this.pagination.currentPage;return this.hasPage(e)?this.selectPage(e):(this.setLoading(!0),vt(i()).pipe(_e(t=>(e=t.currentPage,zt(()=>{this.setLoading(!1),this.update(t)}),this.selectPage(e)))))}getQuery(){return this.query}refreshCurrentPage(){Y(this.currentPage)===!1&&(this.clearPage(this.currentPage),this.setPage(this.currentPage))}getFrom(){return this.isFirst?1:(this.currentPage-1)*this.pagination.perPage+1}getTo(){return this.isLast?this.pagination.total:this.currentPage*this.pagination.perPage}selectPage(i){return this.query.selectAll({asObject:!0}).pipe(De(1),P(e=>{let t=_(c({},this.pagination),{data:this.pages.get(i).ids.map(o=>e[o])}),{range:r,pagesControls:a}=this.config;return isNaN(this.pagination.total)&&(t.lastPage===1?t.total=t.data?t.data.length:0:t.total=t.perPage*t.lastPage,this.pagination.total=t.total),r&&(t.from=this.getFrom(),t.to=this.getTo()),a&&(t.pageControls=xo(this.pagination.total,this.pagination.perPage)),t}))}};nt([Ui("@Pagination - New Page"),ge("design:type",Function),ge("design:paramtypes",[Object]),ge("design:returntype",void 0)],di.prototype,"update",null);function xo(n,i){let e=Math.ceil(n/i),t=[];for(let r=0;r<e;r++)t.push(r+1);return t}var cn=(function(n){return n.Update="UPDATE",n})(cn||{}),Bh={[cn.Update]:"update"},ze=(function(n){return n.Update="UPDATE",n.AddEntities="ADD_ENTITIES",n.SetEntities="SET_ENTITIES",n.UpdateEntities="UPDATE_ENTITIES",n.RemoveEntities="REMOVE_ENTITIES",n.UpsertEntities="UPSERT_ENTITIES",n.UpsertManyEntities="UPSERT_MANY_ENTITIES",n})(ze||{}),Nh={[ze.Update]:"update",[ze.AddEntities]:"add",[ze.SetEntities]:"set",[ze.UpdateEntities]:"update",[ze.RemoveEntities]:"remove",[ze.UpsertEntities]:"upsert",[ze.UpsertManyEntities]:"upsertMany"};var mi=class{getStoresSnapshot(i=[]){let e={},r=i.length>0?i:Object.keys(L);for(let a=0;a<r.length;a++){let o=r[a];o!=="router"&&(e[o]=L[o]._value())}return e}setStoresSnapshot(i,e){let t=c({skipStorageUpdate:!1,lazy:!1},e);t.skipStorageUpdate&&sn(!0);let r=i;pt(i)&&(r=JSON.parse(r));let a=Object.keys(r).length;if(t.lazy)ct.pipe(z(o=>r.hasOwnProperty(o)),De(a)).subscribe(o=>L[o]._setState(()=>r[o]));else for(let o=0,l=Object.keys(r);o<l.length;o++){let p=l[o];L[p]&&L[p]._setState(()=>r[p])}t.skipStorageUpdate&&sn(!1)}},ko=new mi;var Ia=(()=>{class n{_animationsDisabled=Je();state="unchecked";disabled=!1;appearance="full";static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,r){t&2&&G("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return n})();var Co=["text"],So=[[["mat-icon"]],"*"],Ao=["mat-icon","*"];function Eo(n,i){if(n&1&&ne(0,"mat-pseudo-checkbox",1),n&2){let e=w();x("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function Mo(n,i){if(n&1&&ne(0,"mat-pseudo-checkbox",3),n&2){let e=w();x("disabled",e.disabled)}}function Io(n,i){if(n&1&&(m(0,"span",4),f(1),h()),n&2){let e=w();d(),U("(",e.group.label,")")}}var fi=new ie("MAT_OPTION_PARENT_COMPONENT"),gi=new ie("MatOptgroup");var hi=class{source;isUserInput;constructor(i,e=!1){this.source=i,this.isUserInput=e}},qt=(()=>{class n{_element=s(ae);_changeDetectorRef=s(Re);_parent=s(fi,{optional:!0});group=s(gi,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=s(ti).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=re(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new ve;_text;_stateChanges=new S;constructor(){let e=s(ei);e.load(ii),e.load(Ir),this._signalDisableRipple=!!this._parent&&Vn(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Ke(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new hi(this,e))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["mat-option"]],viewQuery:function(t,r){if(t&1&&Le(Co,7),t&2){let a;O(a=F())&&(r._text=a.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(t,r){t&1&&N("click",function(){return r._selectViaInteraction()})("keydown",function(o){return r._handleKeydown(o)}),t&2&&(Kn("id",r.id),b("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),G("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",Ce]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:Ao,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(t,r){t&1&&(le(So),q(0,Eo,1,2,"mat-pseudo-checkbox",1),V(1),m(2,"span",2,0),V(4,1),h(),q(5,Mo,1,1,"mat-pseudo-checkbox",3),q(6,Io,2,1,"span",4),ne(7,"div",5)),t&2&&(H(r.multiple?0:-1),d(5),H(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),d(),H(r.group&&r.group._inert?6:-1),d(),x("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[Ia,Br],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return n})();function dn(n,i,e){if(e.length){let t=i.toArray(),r=e.toArray(),a=0;for(let o=0;o<n+1;o++)t[o].group&&t[o].group===r[a]&&a++;return a}return 0}function mn(n,i,e,t){return n<e?n:n+i>e+t?Math.max(0,n-t+i):e}var Ht=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new S;constructor(i=!1,e,t=!0,r){this._multiple=i,this._emitChanges=t,this.compareWith=r,e&&e.length&&(i?e.forEach(a=>this._markSelected(a)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...i){this._verifyValueAssignment(i),i.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...i){this._verifyValueAssignment(i),i.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...i){this._verifyValueAssignment(i);let e=this.selected,t=new Set(i.map(a=>this._getConcreteValue(a)));i.forEach(a=>this._markSelected(a)),e.filter(a=>!t.has(this._getConcreteValue(a,t))).forEach(a=>this._unmarkSelected(a));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(i){return this.isSelected(i)?this.deselect(i):this.select(i)}clear(i=!0){this._unmarkAll();let e=this._hasQueuedChanges();return i&&this._emitChangeEvent(),e}isSelected(i){return this._selection.has(this._getConcreteValue(i))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(i){this._multiple&&this.selected&&this._selected.sort(i)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(i){i=this._getConcreteValue(i),this.isSelected(i)||(this._multiple||this._unmarkAll(),this.isSelected(i)||this._selection.add(i),this._emitChanges&&this._selectedToEmit.push(i))}_unmarkSelected(i){i=this._getConcreteValue(i),this.isSelected(i)&&(this._selection.delete(i),this._emitChanges&&this._deselectedToEmit.push(i))}_unmarkAll(){this.isEmpty()||this._selection.forEach(i=>this._unmarkSelected(i))}_verifyValueAssignment(i){i.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(i,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(i,t))return t;return i}else return i}};var Lo=["trigger"],Ro=["panel"],Bo=[[["mat-select-trigger"]],"*"],No=["mat-select-trigger","*"];function Vo(n,i){if(n&1&&(m(0,"span",4),f(1),h()),n&2){let e=w();d(),We(e.placeholder)}}function zo(n,i){n&1&&V(0)}function Uo(n,i){if(n&1&&(m(0,"span",11),f(1),h()),n&2){let e=w(2);d(),We(e.triggerValue)}}function jo(n,i){if(n&1&&(m(0,"span",5),q(1,zo,1,0)(2,Uo,2,1,"span",11),h()),n&2){let e=w();d(),H(e.customTrigger?1:2)}}function qo(n,i){if(n&1){let e=xe();m(0,"div",12,1),N("keydown",function(r){be(e);let a=w();return ye(a._handleKeydown(r))}),V(2,1),h()}if(n&2){let e=w();Zt(e.panelClass),G("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._parentFormField?.color==="primary")("mat-accent",e._parentFormField?.color==="accent")("mat-warn",e._parentFormField?.color==="warn")("mat-undefined",!e._parentFormField?.color),b("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var Ho=new ie("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let n=s(Oe);return()=>Wr(n)}}),Qo=new ie("MAT_SELECT_CONFIG"),Go=new ie("MatSelectTrigger"),hn=class{source;value;constructor(i,e){this.source=i,this.value=e}},Pa=(()=>{class n{_viewportRuler=s(ai);_changeDetectorRef=s(Re);_elementRef=s(ae);_dir=s(ni,{optional:!0});_idGenerator=s(ti);_renderer=s(Ft);_parentFormField=s(jr,{optional:!0});ngControl=s(wr,{self:!0,optional:!0});_liveAnnouncer=s(Or);_defaultOptions=s(Qo,{optional:!0});_animationsDisabled=Je();_popoverLocation;_initialized=new S;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let r=this.panel.nativeElement,a=dn(e,this.options,this.optionGroups),o=t._getHostElement();e===0&&a===1?r.scrollTop=0:r.scrollTop=mn(o.offsetTop,o.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new hn(this,e)}_scrollStrategyFactory=s(Ho);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new S;_errorStateTracker;stateChanges=new S;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=re(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(xr.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=Mn(()=>{let e=this.options;return e?e.changes.pipe(Pe(e),_e(()=>ke(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(_e(()=>this.optionSelectionChanges))});openedChange=new ve;_openedStream=this.openedChange.pipe(z(e=>e),P(()=>{}));_closedStream=this.openedChange.pipe(z(e=>!e),P(()=>{}));selectionChange=new ve;valueChange=new ve;constructor(){let e=s(Nr),t=s(kr,{optional:!0}),r=s(Cr,{optional:!0}),a=s(new Xn("tabindex"),{optional:!0}),o=s($r,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Vr(e,this.ngControl,r,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=o?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new Ht(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Z(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Z(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(Pe(null),Z(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(De(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",a=>{a.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,r=t===40||t===38||t===37||t===39,a=t===13||t===32,o=this._keyManager;if(!o.isTyping()&&a&&!Ke(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;o.onKeydown(e);let p=this.selected;p&&l!==p&&this._liveAnnouncer.announce(p.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,r=e.keyCode,a=r===40||r===38,o=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!o&&(r===13||r===32)&&t.activeItem&&!Ke(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!o&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(p=>!p.disabled&&!p.selected);this.options.forEach(p=>{p.disabled||(l?p.select():p.deselect())})}else{let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!Ke(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Li?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Fr(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=ke(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Z(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),ke(...this.options.map(t=>t._stateChanges)).pipe(Z(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,r)=>this.sortComparator?this.sortComparator(t,r,e):e.indexOf(t)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(r=>r.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby")}onContainerClick(e){let t=Er(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["mat-select"]],contentQueries:function(t,r,a){if(t&1&&Fe(a,Go,5)(a,qt,5)(a,gi,5),t&2){let o;O(o=F())&&(r.customTrigger=o.first),O(o=F())&&(r.options=o),O(o=F())&&(r.optionGroups=o)}},viewQuery:function(t,r){if(t&1&&Le(Lo,5)(Ro,5)(Ri,5),t&2){let a;O(a=F())&&(r.trigger=a.first),O(a=F())&&(r.panel=a.first),O(a=F())&&(r._overlayDir=a.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,r){t&1&&N("keydown",function(o){return r._handleKeydown(o)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),t&2&&(b("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),G("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",Ce],disableRipple:[2,"disableRipple","disableRipple",Ce],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Oi(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",Ce],placeholder:"placeholder",required:[2,"required","required",Ce],multiple:[2,"multiple","multiple",Ce],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",Ce],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",Oi],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",Ce]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[$e([{provide:Ur,useExisting:n},{provide:fi,useExisting:n}]),Ei],ngContentSelectors:No,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,r){if(t&1&&(le(Bo),m(0,"div",2,0),N("click",function(){return r.open()}),m(3,"div",3),q(4,Vo,2,1,"span",4)(5,jo,3,1,"span",5),h(),m(6,"div",6)(7,"div",7),Ai(),m(8,"svg",8),ne(9,"path",9),h()()()(),ot(10,qo,3,16,"ng-template",10),N("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(o){return r._handleOverlayKeydown(o)})),t&2){let a=he(1);d(3),b("id",r._valueId),d(),H(r.empty?4:5),d(6),x("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||a)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[Li,Ri],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})}return n})();function Wo(){return{artPieces:[],lastArtPiecesUpdate:void 0,imageCache:[]}}var Tt=class _i extends et{constructor(){super(Wo())}static{this.\u0275fac=function(e){return new(e||_i)}}static{this.\u0275prov=xt({token:_i,factory:_i.\u0275fac,providedIn:"root"})}};Tt=nt([tn({name:"session"})],Tt);var bi=(()=>{class n extends ut{constructor(){super(s(Tt)),this.getArtPiecesObservable=this.select(({artPieces:e})=>[...e])}get selectArtPieces(){return this.getValue().artPieces}get selectLastArtPiecesUpdate(){return this.getValue().lastArtPiecesUpdate}getThumbnailByTokenId(e){return this.getValue().imageCache.find(t=>t?.tokenId===e)}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=xt({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var Oa=(n,i)=>i.label;function $o(n,i){if(n&1&&(m(0,"mat-chip",1)(1,"a",7),f(2),h()()),n&2){let e=i.$implicit;d(),x("routerLink",e.url)("queryParams",e.queryParams),b("aria-label",e.label),d(),U(" ",e.label," ")}}function Ko(n,i){if(n&1&&(m(0,"mat-option",5),f(1),h()),n&2){let e=i.$implicit;x("value",e),d(),U(" ",e," ")}}function Yo(n,i){if(n&1){let e=xe();m(0,"mat-chip",8),$n("year-chip-leave"),Wn("year-chip-enter"),N("removed",function(){let r=be(e).$implicit,a=w(2);return ye(a.removeYearFilter(r.label))}),m(1,"a",7),f(2),h(),m(3,"button",9)(4,"mat-icon"),f(5,"cancel"),h()()()}if(n&2){let e=i.$implicit;x("removable",!0),d(),x("routerLink",e.url)("queryParams",e.queryParams),b("aria-label",e.label),d(),U(" ",e.label," "),d(),b("aria-label","Remove year "+e.label)}}function Jo(n,i){if(n&1&&(m(0,"nav",0)(1,"mat-chip-set")(2,"mat-chip",1)(3,"a",2)(4,"mat-icon"),f(5,"home"),h()()(),Qe(6,$o,3,4,"mat-chip",1,Oa),m(8,"mat-form-field",3)(9,"mat-label"),f(10),M(11,"translate"),h(),m(12,"mat-select",4),Qe(13,Ko,2,2,"mat-option",5,Jt),h(),Hn(),h(),Qe(15,Yo,6,6,"mat-chip",6,Oa),h()()),n&2){let e=w();d(6),Ge(e.routeBreadcrumbs()),d(4),We(I(11,2,"selectYear")),d(2),x("formField",e.yearPickerForm.newYear),Qn(),d(),Ge(e.validYears),d(2),Ge(e.yearBreadcrumbs())}}var Fa=(()=>{class n{constructor(){this.artworkService=s(St),this.router=s(X),this.activatedRoute=s(hr),this.translateService=s(Ae),this.sessionQuery=s(bi),this.selectedYears=[],this.routeBreadcrumbs=Pi(()=>this.breadcrumbs().filter(e=>!e.isYear)),this.yearBreadcrumbs=Pi(()=>this.breadcrumbs().filter(e=>!!e.isYear)),this.yearPickerModel=re({newYear:null}),this.yearPickerForm=Sr(this.yearPickerModel),this.breadcrumbs=re(this.buildBreadCrumb(this.activatedRoute.root)),Nn(()=>{let e=this.yearPickerForm.newYear().value();e!==null&&Zn(()=>this.handleYearChange(e))})}ngOnInit(){this.router.events.pipe(z(e=>e instanceof wt),je()).subscribe(()=>{this.selectedYears=this.extractSelectedYears(),this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute.root))})}handleYearChange(e){this.validYears.includes(e)&&!this.selectedYears.includes(e)&&(this.selectedYears.push(e),this.updateQueryParams()),setTimeout(()=>this.yearPickerModel.set({newYear:null}))}removeYearFilter(e){this.selectedYears=this.selectedYears.filter(t=>t!==Number(e)),this.updateQueryParams()}get validYears(){return[...this.artworkService.getAvailableYears()].filter(e=>!this.selectedYears.includes(e))}updateQueryParams(){let e={years:this.selectedYears.length?this.selectedYears.join(","):null};this.router.navigate([],{queryParams:e})}extractSelectedYears(){let e=this.activatedRoute.snapshot.queryParamMap.get("years");return e?e.split(",").map(t=>Number(t)):[]}buildBreadCrumb(e,t="",r=[]){let a=e.routeConfig&&e.routeConfig.data?e.routeConfig.data.breadcrumb:"",o=e.routeConfig?e.routeConfig.path:"",l=o?o.split("/").pop():"";if(l.startsWith(":")&&e.snapshot){let A=l.split(":")[1],k=e.snapshot.params[A];o=o.replace(l,k),A==="id"?a=this.extractNameFromId(k)||k:a=k}let u=o?`${t}/${o}`:t,j={label:a?this.translateService.instant(a.toLowerCase()):"",url:u,queryParams:{years:[]}},D=a?[...r,j]:[...r];if(e.firstChild)return this.buildBreadCrumb(e.firstChild,u,D);{let A=e.snapshot.queryParamMap.get("years");A&&A.split(",").forEach(B=>{D.push({label:B,url:u,queryParams:{years:B},isYear:!0})})}return D}extractNameFromId(e){return this.artworkService.getNftById(e,this.sessionQuery.selectArtPieces)?.name||null}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=E({type:n,selectors:[["app-breadcrumb"]],decls:1,vars:1,consts:[["aria-label","Breadcrumb",1,"container"],["color","primary"],["routerLink","/","routerLinkActive","router-link-active","aria-label","Home","matLine","",1,"link-as-text"],["appearance","outline","subscriptSizing","dynamic",1,"small-input"],["aria-label","Select year",3,"formField"],[3,"value"],["color","primary",3,"removable"],["routerLinkActive","router-link-active","matLine","",1,"link-as-text",3,"routerLink","queryParams"],["color","primary",3,"removed","removable"],["matChipRemove",""]],template:function(t,r){t&1&&q(0,Jo,17,4,"nav",0),t&2&&H(r.breadcrumbs().length?0:-1)},dependencies:[Gr,Qr,Hr,Xt,fr,Ct,qr,Pa,Ar,qt,zr,kt],styles:[".small-input[_ngcontent-%COMP%]{width:10.8rem;margin-left:.8rem;align-self:flex-start;margin-top:.25rem}.link-as-text[_ngcontent-%COMP%]{all:unset;display:flex;align-items:center;color:inherit;text-decoration:none;cursor:text}@keyframes _ngcontent-%COMP%_year-chip-enter-anim{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}@keyframes _ngcontent-%COMP%_year-chip-leave-anim{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85)}}.year-chip-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-enter-anim .18s ease-out}.year-chip-leave[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-leave-anim .15s ease-in}"]})}}return n})();function Zo(n,i){if(n&1){let e=xe();m(0,"button",1),N("click",function(){be(e);let r=w();return ye(r.handleClick())}),m(1,"mat-icon"),f(2,"share"),h()()}}var La=(()=>{class n{constructor(){this.canShare=typeof navigator.share=="function"}handleClick(){if(this.canShare){let e={title:"Juanma Moreno S\xE1nchez",text:"Contemporary Art",url:window.location.href};navigator.share(e)}}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=E({type:n,selectors:[["app-share-button"]],decls:1,vars:1,consts:[["aria-label","share","mat-mini-fab","","color","primary",1,"share-button"],["aria-label","share","mat-mini-fab","","color","primary",1,"share-button",3,"click"]],template:function(t,r){t&1&&q(0,Zo,3,0,"button",0),t&2&&H(r.canShare?0:-1)},dependencies:[Yr,Ct],styles:[".share-button[_ngcontent-%COMP%]{position:fixed;bottom:1.25rem;left:.25rem;z-index:9999}"]})}}return n})();var Ra=["*"],Xo=["content"],es=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],ts=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function is(n,i){if(n&1){let e=xe();m(0,"div",1),N("click",function(){be(e);let r=w();return ye(r._onBackdropClicked())}),h()}if(n&2){let e=w();G("mat-drawer-shown",e._isShowingBackdrop())}}function ns(n,i){n&1&&(m(0,"mat-drawer-content"),V(1,2),h())}var rs=new ie("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),Ba=new ie("MAT_DRAWER_CONTAINER"),Qt=(()=>{class n extends ri{_platform=s(Ye);_changeDetectorRef=s(Re);_element=s(ae);_ngZone=s(He);_isInert=!1;_container=s(_n);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck())}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(Yt(50),De(1)).subscribe(()=>this._updateInert())}):this._updateInert()}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let t=this._element.nativeElement;this._isInert=e,e?t.setAttribute("inert","true"):t.removeAttribute("inert")}}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=(()=>{let e;return function(r){return(e||(e=rt(n)))(r||n)}})();static \u0275cmp=E({type:n,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,r){t&2&&(Ti("margin-left",r._container._contentMargins.left,"px")("margin-right",r._container._contentMargins.right,"px"),G("mat-drawer-content-hidden",r._shouldBeHidden()))},features:[$e([{provide:ri,useExisting:n}]),at],ngContentSelectors:Ra,decls:1,vars:0,template:function(t,r){t&1&&(le(),V(0))},encapsulation:2})}return n})(),gn=(()=>{class n{_elementRef=s(ae);_focusTrapFactory=s(Pr);_focusMonitor=s(Mr);_platform=s(Ye);_ngZone=s(He);_renderer=s(Ft);_interactivityChecker=s(Dr);_doc=s(qe);_container=s(Ba,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=pe(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=pe(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(pe(e))}_opened=re(!1);_openedVia=null;_animationStarted=new S;_animationEnd=new S;openedChange=new ve(!0);_openedStream=this.openedChange.pipe(z(e=>e),P(()=>{}));openedStart=this._animationStarted.pipe(z(()=>this.opened),Si(void 0));_closedStream=this.openedChange.pipe(z(e=>!e),P(()=>{}));closedStart=this._animationStarted.pipe(z(()=>!this.opened),Si(void 0));_destroyed=new S;onPositionChanged=new ve;_content;_modeChanged=new S;_injector=s(Oe);_changeDetectorRef=s(Re);constructor(){this.openedChange.pipe(Z(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return[e.listen(t,"keydown",r=>{r.keyCode===27&&!this.disableClose&&!Ke(r)&&this._ngZone.run(()=>{this.close(),r.stopPropagation(),r.preventDefault()})}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_focusByCssSelector(e,t){let r=this._elementRef.nativeElement.querySelector(e);r&&(this._interactivityChecker.isFocusable(r)||(r.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let a=()=>{o(),l(),r.removeAttribute("tabindex")},o=this._renderer.listen(r,"blur",a),l=this._renderer.listen(r,"mousedown",a)})),r.focus(t))}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":Mi(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let r=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),r}_setOpen(e,t,r){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),(this._container?._content||this._container?._userContent)?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(r),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(a=>{this.openedChange.pipe(De(1)).subscribe(o=>a(o?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,r=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),r.insertBefore(this._anchor,t)),r.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor)}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["mat-drawer"]],viewQuery:function(t,r){if(t&1&&Le(Xo,5),t&2){let a;O(a=F())&&(r._content=a.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,r){t&2&&(b("align",null)("tabIndex",r.mode!=="side"?"-1":null),Ti("visibility",!r._container&&!r.opened?"hidden":null),G("mat-drawer-end",r.position==="end")("mat-drawer-over",r.mode==="over")("mat-drawer-push",r.mode==="push")("mat-drawer-side",r.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Ra,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,r){t&1&&(le(),m(0,"div",1,0),V(2),h())},dependencies:[ri],encapsulation:2})}return n})(),_n=(()=>{class n{_dir=s(ni,{optional:!0});_element=s(ae);_ngZone=s(He);_changeDetectorRef=s(Re);_animationDisabled=Je();_transitionsEnabled=!1;_allDrawers;_drawers=new Un;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=pe(e)}_autosize=s(rs);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:pe(e)}_backdropOverride=null;backdropClick=new ve;_start=null;_end=null;_left=null;_right=null;_destroyed=new S;_doCheckSubject=new S;_contentMargins={left:null,right:null};_contentMarginChanges=new S;get scrollable(){return this._userContent||this._content}_injector=s(Oe);constructor(){let e=s(Ye),t=s(ai);this._dir?.change.pipe(Z(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),t.change().pipe(Z(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(Pe(this._allDrawers),Z(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(Pe(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(In(10),Z(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let r=this._left._getWidth();e+=r,t-=r}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let r=this._right._getWidth();t+=r,e-=r}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(Z(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(Z(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(Z(this._drawers.changes)).subscribe(()=>{Mi({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(Z(ke(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let t=this._element.nativeElement.classList,r="mat-drawer-container-has-open";e?t.add(r):t.remove(r)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["mat-drawer-container"]],contentQueries:function(t,r,a){if(t&1&&Fe(a,Qt,5)(a,gn,5),t&2){let o;O(o=F())&&(r._content=o.first),O(o=F())&&(r._allDrawers=o)}},viewQuery:function(t,r){if(t&1&&Le(Qt,5),t&2){let a;O(a=F())&&(r._userContent=a.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,r){t&2&&G("mat-drawer-container-explicit-backdrop",r._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[$e([{provide:Ba,useExisting:n}])],ngContentSelectors:ts,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,r){t&1&&(le(es),q(0,is,1,2,"div",0),V(1),V(2,1),q(3,ns,2,0,"mat-drawer-content")),t&2&&(H(r.hasBackdrop?0:-1),d(3),H(r._content?-1:3))},dependencies:[Qt],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2})}return n})();var as=["*",[["mat-toolbar-row"]]],os=["*","mat-toolbar-row"],bn=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return n})(),Na=(()=>{class n{_elementRef=s(ae);_platform=s(Ye);_document=s(qe);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=E({type:n,selectors:[["mat-toolbar"]],contentQueries:function(t,r,a){if(t&1&&Fe(a,bn,5),t&2){let o;O(o=F())&&(r._toolbarRows=o)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,r){t&2&&(Zt(r.color?"mat-"+r.color:""),G("mat-toolbar-multiple-rows",r._toolbarRows.length>0)("mat-toolbar-single-row",r._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:os,decls:2,vars:0,template:function(t,r){t&1&&(le(as),V(0),V(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2})}return n})();var ss=n=>({years:n}),ls=(n,i)=>i.id,cs=(n,i)=>i.code;function ds(n,i){n&1&&Ii(0)}function ms(n,i){if(n&1&&(m(0,"button",11)(1,"p",18),f(2,"Juanma Moreno S\xE1nchez"),h()()),n&2){let e=w();x("routerLink",e.lang.link())}}function hs(n,i){if(n&1){let e=xe();m(0,"button",19),N("click",function(){be(e),w();let r=he(2);return ye(r.toggle())}),m(1,"mat-icon"),f(2,"menu"),h()()}}function ps(n,i){n&1&&Ii(0)}function us(n,i){if(n&1&&ot(0,ps,1,0,"ng-container",9),n&2){w();let e=he(13);x("ngTemplateOutlet",e)}}function fs(n,i){if(n&1&&(m(0,"button",21),M(1,"translate"),f(2),M(3,"translate"),h()),n&2){w(2);let e=he(29);x("matMenuTriggerFor",e),b("aria-label",I(1,3,"menu.generative")),d(2),U(" ",I(3,5,"menu.generative")," ")}}function gs(n,i){if(n&1&&(m(0,"button",20),f(1),M(2,"translate"),h(),q(3,fs,4,7,"button",21),m(4,"button",22),M(5,"translate"),f(6),M(7,"translate"),h(),m(8,"button",23),f(9,"CV"),h(),m(10,"button",22),M(11,"translate"),f(12),M(13,"translate"),h(),m(14,"button",22),M(15,"translate"),f(16),M(17,"translate"),h(),m(18,"button",24,6),f(20),m(21,"mat-icon"),f(22,"arrow_drop_down"),h()()),n&2){let e=he(19),t=w(),r=he(15),a=he(33);x("matMenuTriggerFor",r),d(),U(" ",I(2,16,"paintings")," "),d(2),H(t.generativePieces.length?3:-1),d(),x("routerLink",t.lang.link("about")),b("aria-label",I(5,18,"menu.about")),d(2),U(" ",I(7,20,"menu.about")," "),d(2),x("routerLink",t.lang.link("cv")),d(2),x("routerLink",t.lang.link("texts")),b("aria-label",I(11,22,"menu.texts")),d(2),U(" ",I(13,24,"menu.texts")," "),d(2),x("routerLink",t.lang.link("contact")),b("aria-label",I(15,26,"menu.contact")),d(2),U(" ",I(17,28,"menu.contact")," "),d(2),x("matMenuTriggerFor",a),b("aria-expanded",e.menuOpen),d(2),U(" ",t.currentLangLabel," ")}}function _s(n,i){if(n&1&&(m(0,"button",16),f(1),h()),n&2){let e=i.$implicit,t=w();x("routerLink",t.lang.link("artworks"))("queryParams",Yn(4,ss,e)),b("aria-label",e),d(),U(" ",e," ")}}function bs(n,i){if(n&1&&(m(0,"button",14),f(1),h()),n&2){let e=i.$implicit,t=w();x("routerLink",t.lang.link("generative/"+e.id)),b("aria-label",e.label),d(),U(" ",e.label," ")}}function ys(n,i){if(n&1){let e=xe();m(0,"button",25),N("click",function(){let r=be(e).$implicit,a=w();return ye(a.selectLanguage(r.code))}),f(1),h()}if(n&2){let e=i.$implicit,t=w();x("disabled",e.code===t.activeLanguage),b("aria-current",e.code===t.activeLanguage?"true":null),d(),U(" ",e.label," ")}}var Va=(()=>{class n{constructor(){this.artworkService=s(St),this.responsiveService=s(oa),this.translateService=s(Ae),this.router=s(X),this.lang=s(ra),this.mobileMenu=mr(this.responsiveService.displayMobileLayout),this.heroTitleVisible=s(aa).visible,this.generativePieces=ea,this.languages=[{code:W.SPANISH,label:"Espanol"},{code:W.ENGLISH,label:"English"}]}get years(){return this.artworkService.getAvailableYears()}get activeLanguage(){return this.lang.carriesLanguage()?this.lang.inSpanish()?W.SPANISH:W.ENGLISH:this.translateService.currentLang()===W.SPANISH?W.SPANISH:W.ENGLISH}get currentLangLabel(){return this.activeLanguage.slice(0,2).toUpperCase()}selectLanguage(e){if(e===this.activeLanguage)return;let t=this.router.url.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g,""),r=t==="es"||t.startsWith("es/")?t.replace(/^es\/?/,""):t;if(ta(e),!this.lang.carriesLanguage()){this.translateService.use(e);return}let a=e===W.SPANISH?"/es":"";this.router.navigateByUrl(`${a}/${r}`.replace(/\/+$/,"")||"/")}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=E({type:n,selectors:[["app-top-menu"]],decls:36,vars:17,consts:[["drawer",""],["menuButtons",""],["paintingMenu","matMenu"],["yearsMenu","matMenu"],["generativeMenu","matMenu"],["languageMenu","matMenu"],["languageTrigger","matMenuTrigger"],["mode","over","position","end",1,"drawer"],[1,"drawer-content"],[4,"ngTemplateOutlet"],["color","primary"],["aria-label","Juanma Moreno S\xE1nchez","mat-button","",3,"routerLink"],[1,"spacer"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu"],["mat-menu-item","",3,"routerLink"],["mat-menu-item","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"routerLink","queryParams"],["mat-menu-item","",3,"disabled"],[1,"catalog-heading","brand"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu",3,"click"],["x","","mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"routerLink"],["aria-label","CV","mat-button","",3,"routerLink"],["aria-label","Language switcher","mat-button","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"click","disabled"]],template:function(t,r){if(t&1&&(m(0,"mat-drawer-container")(1,"mat-drawer",7,0)(3,"div",8),ot(4,ds,1,0,"ng-container",9),h()(),m(5,"mat-drawer-content")(6,"mat-toolbar",10)(7,"mat-toolbar-row"),q(8,ms,3,1,"button",11),ne(9,"span",12),q(10,hs,3,0,"button",13)(11,us,1,1,"ng-container"),h()()()(),ot(12,gs,23,30,"ng-template",null,1,Di),m(14,"mat-menu",null,2)(16,"button",14),M(17,"translate"),f(18),M(19,"translate"),h(),m(20,"button",15),M(21,"translate"),f(22),M(23,"translate"),h()(),m(24,"mat-menu",null,3),Qe(26,_s,2,6,"button",16,Jt),h(),m(28,"mat-menu",null,4),Qe(30,bs,2,3,"button",14,ls),h(),m(32,"mat-menu",null,5),Qe(34,ys,2,3,"button",17,cs),h()),t&2){let a=he(13),o=he(25);d(4),x("ngTemplateOutlet",a),d(4),H(r.heroTitleVisible()?-1:8),d(2),H(r.mobileMenu()?11:10),d(6),x("routerLink",r.lang.link("artworks")),b("aria-label",I(17,9,"menu.allPaintings")),d(2),U(" ",I(19,11,"menu.allPaintings")," "),d(2),x("matMenuTriggerFor",o),b("aria-label",I(21,13,"menu.byYear")),d(2),U(" ",I(23,15,"menu.byYear")," "),d(4),Ge(r.years),d(4),Ge(r.generativePieces),d(4),Ge(r.languages)}},dependencies:[Na,bn,oi,Xt,Kr,Ct,er,_n,Qt,gn,Xr,Zr,Jr,kt],styles:["mat-toolbar-row[_ngcontent-%COMP%]{flex-wrap:wrap;height:auto;min-height:var(--mat-toolbar-standard-height, 4rem);row-gap:.25rem;padding-top:.5rem;padding-bottom:.5rem}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.brand[_ngcontent-%COMP%]{color:inherit;font-size:1.1rem;font-weight:400;margin:0}.drawer[_ngcontent-%COMP%]{position:fixed!important;top:0;right:0;bottom:0;height:100vh;width:min(40vw,200px);z-index:500}  .mat-drawer-backdrop{position:fixed!important;inset:0;z-index:499}.drawer-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1rem 0;gap:.25rem}.drawer-content[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]{justify-content:flex-start;width:100%;padding-left:1.5rem;padding-right:1.5rem}"]})}}return n})();var za="https://juanmamoreno.com",Ua=(()=>{class n{#e=s(qe);#t=s(X);init(){this.#t.events.pipe(z(e=>e instanceof wt)).subscribe(e=>this.#i(e.urlAfterRedirects))}#i(e){let t=e.split(/[?#]/)[0],r=`${za}${t==="/"?"":t.replace(/\/$/,"")}`||za,a=this.#e.head.querySelector('link[rel="canonical"]');a||(a=this.#e.createElement("link"),a.setAttribute("rel","canonical"),this.#e.head.appendChild(a)),a.setAttribute("href",r)}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=zn({token:n,factory:n.\u0275fac})}}return n})();var ja={"Oil on wood":"Oil on wood","Oil on canvas":"Oil on canvas","Watercolor on paper":"Watercolor on paper",sold:"Art piece sold",moreOn:"More on",selectYear:"Select a year",paintings:"Paintings",submit:"Submit",close:"Close",cancel:"Cancel",back:"Back",next:"Next",generative:{notFound:"This generative piece was not found."},home:{tagline:"Contemporary painting and software"},menu:{allPaintings:"All paintings",generative:"Generative",about:"About",contact:"Contact",byYear:"By Year",texts:"Texts"},traits:{medium:"Medium",keight:"Height",width:"Width",unit:"Unit",year:"Year",imgTypr:"Image Type",artist:"Artist",project:"Project",descAuthor:"Description Author",descLang:"Description language"},viewTypes:{frontal:"Frontal view",progreso:"Work in progress",detail:"Detail view"},sortBy:"Sort by ",sortMethod:{year:"Year",size:"Size",medium:"Medium"},contact:{title:"Contact",representedBy:"Currently represented by <a href='https://galeriazunino.com/' target='_blank'>Zunino Gallery</a> (Sevilla)",contactText:"If you want to contact me, use the form bellow and I will get back to you soon. You can also follow me on <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a> to stay on the loop.",name:"Name",email:"Email",emailPlaceholder:"email@example.com",message:"Message",messagePlaceholder:"I'm interested in..."},quote:{askPrice:"Ask price",askInfo:"Ask about this piece",priceTitle:"Request a price",infoTitle:"Ask about this piece",priceIntro:"Interested in this piece? Leave your email and I'll get back to you with the price and details.",infoIntro:"This piece isn't available, but I may be able to tell you where it is, how to see it, or who you can buy it from. Leave your email and I'll get back to you.",messageLabel:"Message (optional)",messagePlaceholder:"Anything you'd like to add...",success:"Thanks! I'll get back to you soon."},viewer:{previous:"Previous",next:"Next",fullscreen:"Fullscreen",exitFullscreen:"Exit fullscreen"},dossier:{title:"Dossier options",includeContact:"Include contact info",includeCv:"Include CV",includeStatement:"Include Statement",customTitle:"Custom title",customTitlePlaceholder:"Enter a title",customText:"Custom text",customTextPlaceholder:"Add custom text"},error:{noValue:"You must enter a value",invalidEmail:"Not a valid email",tooLong:"Too long",submissionFailed:"Something went wrong sending your message. Please try again later."},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n, Spain), 1986. Based in Madrid (Spain)",shows:{title:"Solo shows"},collectiveShows:{title:"Collective exhibitions (selection)"},awards:{title:"Artistic awards and residencies (selection)",lefranc:"Lefranc&Bourgueois art award",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Antonio Gala Foundation Residence Program</a>"},conferences:{title:"Conferences",unia:"<a href='https://www.unia.es/' target='blank'>International University of Andalucia</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>Towards a New AI Winter</a>"},education:{title:"Education",degree:"Bachelor on arts degree",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>University of Granada",erasmus:"LLP Erasmus Scholarship",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Zunino gallery</a>",countries:{online:"Online",spain:"Spain",usa:"USA",germany:"Germany",mexico:"Mexico",italy:"Italy"}},statement:{title:"Statement",introduction:{content:"My artistic work is profoundly analog, even though its creation usually originates in the digital. This is the great contradiction of <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'>the millennial generation, to which I belong</a>. We are the last generation to have been educated using pen and paper that has had to navigate life in a digital environment. It is the intersection between two worlds, a collision I do not try to hide. In fact, I split my labor between the artistic production I need to be happy and the software development I need in order to eat."},painting:{title:"Painting",distance:"In painting is where, throughout my entire life, I have found refuge. Painting is important. Painting is useful. Painting is home.",outOfNoise:"This distance involves spending time outside the automatism of routine, a necessary condition to be able to observe, analyze, and finally build.",anacronism:"Painting is an ancient craft that allows working on a surface as much or as little as the artist wishes, with the only limits being space and time. <strong>Painting is a precious anachronism.</strong> Simultaneously, painting is always relevant because it is an infinite field of knowledge. Each artist, over the years, gradually discovers small findings that together end up forming something unique and unrepeatable."},art:{title:"Art",arts:"My refuge in painting, sculpture, generative art, or digital art has yielded different fruits over time. There are fruits that have never been documented, and there are also those that have not even been seen by anyone other than myself. In any case, there are peculiarities in my art that are constant and cut across production, and there are others that are variable; obsessions that come and go over time:"},constants:{title:"Constants",items:{first:{title:"Internet",content:"Representing technology artistically in painting and making technology by hand are ways of trying to reconcile our physical self and our avatar. Most of the images I use in my creative process originate from the Internet, specifically from chance encounters with random images. Even before the emergence of AIs, the Internet was already a virtually infinite visual world."},second:{title:"Disturbing Element",content:"In a hypothetical painting, a character looks at or interacts with something. But we don't know who they are, what they are doing, or why they are doing it. Even if it's something indeterminate, the action introduces narrative and invites spending time contemplating the image. The idea is for the image to propose an open premise, something beyond the pose, and for the viewer to complete it. The disturbing as a starting point."},third:{title:"Tradition",content:"Cultural heritage is the DNA of any cultural identity. Great authors and the great themes of art history have had, have, and will have a tremendously gravitational effect. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., have created great masterpieces in which the great themes of the history of art have been developed yesterday and today. Themes that are inherently human and are transversal and universal: love, death, fear..."},fourth:{title:"Failure as one of the Fine Arts",content:"'I have done many things because I have failed at all of them. I start from failure as one of the Fine Arts.' This quote from the multifaceted Pep\xEDn Tre perfectly illustrates the reason for multidisciplinarity. Genius, divine enlightenment, or inspiration are nothing but mythological clich\xE9s. Reality, as always, is much more prosaic: it is failure (real or perceived) that moves an artist to investigate, try new techniques, new ways of reaching the public, etc. On the contrary, I am convinced that success (real or perceived) has a paralyzing capacity and ends up producing artists bored with their own art and therefore with themselves. Failure frustrates, but it also stimulates, or so I want to believe."}}},variables:{title:"Variables",items:{first:{title:"Artificial Intelligence",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>In 2019, a minimal advance guard of creators, like Juanma Moreno, already experimented with the old Artificial Intelligence of that time</em></a>, as Javier Villuendas says in his column in ABC Cultural. In 2019, few of us intuited the creative potential of the AI of the time. Old neural networks like StyleGan or Bigbigan stimulated our imagination by creating very interesting monsters. Nowadays, AI-generated art is commonplace and has reached new levels of formal sufficiency. But at that time, the margin of error (loss) was much wider, and accidents produced unheard-of and highly interesting monsters. From 2019 to 2023, the primary source of inspiration for my work shifted from images found on the internet to images that Artificial Intelligences are capable of generating."},second:{title:"Software",content:"Software doesn't have to be an ultra-rational and efficient solution to an engineering problem. Software can also satisfy an artist's curiosity, be flexible, organic, mutate, be random, disorganized, and unpredictable. Once again, we must value error. It is in the brushstroke that goes slightly beyond the contour, the accident that causes software to distort an image until it aberrates, where the value and originality lie."}}}},download:{cv:"Generate and download CV",statement:"Generate and download Statement",sheet:"Generate and download technical sheet",portfolio:"Generate and download portfolio",hd:"Download high resolution image",success:"Download ready",error:"Could not generate the file",full:"Full resolution",medium:"Medium resolution"},links:{view:"View where this artwork appears on the Internet",title:"Appearances of the artwork on the Internet"},critic:{generating:"Generating critic",edited:"edited",notEdited:"not edited",edit:"Edit this text",editing:"The essay, in markdown. Saved as written.",save:"Save",saving:"Saving\u2026",cancel:"Cancel",saveFailed:"That could not be saved. What you wrote is still here."},seo:{default:{description:"Contemporary art \u2014 oil painting, watercolour, drawings and generative art \u2014 by the artist Juanma Moreno S\xE1nchez."},paintings:{title:"Paintings",description:"Oil paintings, watercolours and works on paper by the artist Juanma Moreno S\xE1nchez."},artwork:{title:"Artwork"},artworkBy:"Original artwork by Juanma Moreno S\xE1nchez.",generative:{title:"Generative",description:"Interactive generative artwork by Juanma Moreno S\xE1nchez, drawn live in the browser."},cv:{title:"CV",description:"Exhibitions, awards, residencies and biography of the artist Juanma Moreno S\xE1nchez."},about:{title:"Statement",description:"Artist statement \u2014 the ideas and themes behind the work of Juanma Moreno S\xE1nchez."},contact:{title:"Contact",description:"Get in touch with the artist Juanma Moreno S\xE1nchez."},terms:{title:"Terms of Service",description:"Terms of service for juanmamoreno.com."},privacy:{title:"Privacy Policy",description:"Privacy policy for juanmamoreno.com \u2014 no cookies, no third-party trackers."},notFound:{title:"Page not found"},texts:{title:"Texts",description:"Criticism, interviews and press about the painter Juanma Moreno S\xE1nchez."}},privacy:{title:"Privacy",noBanner:"No cookie banner here \u2014 you know why? Because we don't use any.",noTracking:"We honestly don't care about tracking you: not what you click, not where you go, not how long you stay.",noThirdParty:"No third-party cookies, no analytics, no ad networks \u2014 nothing following you around the web.",localOnly:"The only thing we keep on your device is a local copy of the gallery so it loads faster next time. It never leaves your browser and identifies no one.",contactUse:"If you write to us through the contact form, we use your message for one thing only: to reply."},terms:{title:"Terms of Service",intro:"By using this site, you agree to the following:",portfolio:"This is simply the artist's portfolio site: it shows the work and lets you get in touch.",noData:"We do not collect or store any personal information.",publicContent:"All content shown here is public.",ownRisk:"Use of this site is at your own risk. We are not responsible for any misuse of the content.",changes:"We may update these terms at any time without notice."},notFound:{title:"404 \u2014 Page not found",message:"Oops! The page you are looking for does not exist. Try one of these instead:"},texts:"Texts",textsPage:{intro:"Writing about the work, published elsewhere. Each entry links to the original: these pieces belong to the people who wrote them and the outlets that ran them.",kind:{essay:"Curatorial text",press:"Press",interview:"Interview",review:"Review"},salanova:{note:"The curatorial text for El Valle Inquietante at Zunino Gallery."},abc:{note:"A column on artists who were working with artificial intelligence years before it became common."},selfie:{note:"An interview on painting, the internet and the images a generation makes of itself."},achtung:{note:"A review of the Zunino show of fifteen paintings from a decade of work, on how the artist treats the gestures and viral images of social media as modern rituals \u2014 somewhere between the mystical and the absurd."}}};var qa={"Oil on wood":"\xD3leo sobre madera","Oil on canvas":"\xD3leo sobre tela","Watercolor on paper":"Acuarela sobre papel",sold:"Pieza vendida",moreOn:"M\xE1s de",selectYear:"Selecciona un a\xF1o",paintings:"Pinturas",submit:"Enviar",close:"Cerrar",cancel:"Cancelar",back:"Volver",next:"Siguiente",generative:{notFound:"No se encontr\xF3 esta pieza generativa."},home:{tagline:"Pintura contempor\xE1nea y software"},menu:{allPaintings:"Todas las pinturas",generative:"Generativo",about:"Acerca de",contact:"Contacto",byYear:"Por a\xF1o",texts:"Textos"},traits:{medium:"T\xE9cnica",keight:"Altura",width:"Ancho",unit:"Unidad",year:"A\xF1o",imgTypr:"Tipo de imagen",artist:"Artista",project:"Proyecto",descAuthor:"Autor de la descripci\xF3n",descLang:"Lenguage de la descripci\xF3n"},viewTypes:{frontal:"Vista frontal",progreso:"En progreso",detail:"Vista de detalle"},sortBy:"Ordenar por ",sortMethod:{year:"A\xF1o",size:"Tama\xF1o",medium:"T\xE9cnica"},contact:{title:"Contacto",representedBy:"Representado por la <a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino </a> (Sevilla)",contactText:"Si quieres contactar conmigo, usa el formulario debajo. Tambi\xE9n puedes seguirme en <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a>.",name:"Nombre",email:"Email",emailPlaceholder:"email@ejemplo.com",message:"Mensaje",messagePlaceholder:"Me interesa..."},quote:{askPrice:"Preguntar precio",askInfo:"Preguntar por esta obra",priceTitle:"Solicitar precio",infoTitle:"Preguntar por esta obra",priceIntro:"\xBFTe interesa esta obra? D\xE9jame tu email y te responder\xE9 con el precio y los detalles.",infoIntro:"Esta obra no est\xE1 disponible, pero quiz\xE1 pueda decirte d\xF3nde est\xE1, c\xF3mo verla o a qui\xE9n compr\xE1rsela. D\xE9jame tu email y te responder\xE9.",messageLabel:"Mensaje (opcional)",messagePlaceholder:"Lo que quieras a\xF1adir...",success:"\xA1Gracias! Te responder\xE9 pronto."},viewer:{previous:"Anterior",next:"Siguiente",fullscreen:"Pantalla completa",exitFullscreen:"Salir de pantalla completa"},dossier:{title:"Opciones del dossier",includeContact:"Incluir datos de contacto",includeCv:"Incluir CV",includeStatement:"Incluir statement",customTitle:"T\xEDtulo personalizado",customTitlePlaceholder:"Escribe un t\xEDtulo",customText:"Texto personalizado",customTextPlaceholder:"A\xF1ade un texto personalizado"},error:{noValue:"Debes escribir algo",invalidEmail:"Email inv\xE1lido",tooLong:"Demasiado largo",submissionFailed:"Algo sali\xF3 mal al enviar tu mensaje. Int\xE9ntalo de nuevo m\xE1s tarde."},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n), 1986. Reside en Madrid.",shows:{title:"Exposiciones individuales"},collectiveShows:{title:"Exposiciones colectivas (selecci\xF3n)"},conferences:{title:"Conferencias",unia:"<a href='https://www.unia.es/' target='blank'>Universidad Internacional de Andaluc\xEDa</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>\xBFHacia un nuevo invierno de la IA?</a>"},awards:{title:"Premios y becas (selecci\xF3n)",lefranc:"Becas Lefranc&Bourgueois",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Fundaci\xF3n Antonio Gala para j\xF3venes creadores</a>"},education:{title:"Educacion",degree:"Licenciado en Bellas Artes",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>Universidad de Granada",erasmus:"Beca LLP Erasmus",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino</a>",countries:{online:"Online",spain:"Espa\xF1a",usa:"USA",germany:"Alemania",mexico:"M\xE9xico",italy:"Italia"}},statement:{title:"Statement",introduction:{content:"Mi obra art\xEDstica es profundamente anal\xF3gica, si bien la creaci\xF3n suele tener su origen en lo digital. Esta es la gran contradicci\xF3n de <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'>la generaci\xF3n milenial, a la que pertenezco</a>. Somos la \xFAltima generaci\xF3n que se ha formado usando papel y l\xE1piz que ha tenido que buscarse la vida en un ambiente digital. Es la intersecci\xF3n entre dos mundos, una colisi\xF3n que no intento disimular. De hecho, divido mi fuerza de trabajo entre la producci\xF3n art\xEDstica que necesito para ser feliz y la programaci\xF3n de software que necesito para poder comer."},painting:{title:"Pintura",distance:"En la pintura es donde, a lo largo de toda mi vida, he encontrado refugio. La pintura es importante. La pintura es \xFAtil. La pintura es casa.",outOfNoise:"Esta distancia implica pasar tiempo fuera del automatismo de la rutina, una condici\xF3n necesaria para poder observar, analizar y finalmente construir.",anacronism:"La pintura es un oficio ancestral que permite trabajar en una superficie tanto o tan poco como el artista quiera, teniendo como \xFAnicos l\xEDmites el espacio y el tiempo. <strong>La pintura es un anacronismo precioso.</strong> Al mismo tiempo, la pintura es siempre relevante porque es un campo infinito de conocimiento. Cada artista, a lo largo de los a\xF1os, va descubriendo peque\xF1os hallazgos, que en su conjunto acaban por formar algo \xFAnico e irrepetible."},art:{title:"Arte",arts:"Mi refugio en la pintura, la escultura, el arte generativo o el arte digital ha dado frutos diferentes a lo largo del tiempo. Hay frutos que nunca han sido documentados, y tambi\xE9n los hay que ni siquiera han sido vistos por otra persona m\xE1s que yo mismo. En cualquier caso, hay peculiaridades en mi arte que son constantes y atraviesan la producci\xF3n, y hay otras que son variables; obsesiones que van y vienen con el tiempo:"},constants:{title:"Constantes",items:{first:{title:"Internet",content:"Representar a la tecnolog\xEDa en la pintura y crear tecnolog\xEDa artesanalmente son formas de intentar reconciliar nuestro yo f\xEDsico y nuestro avatar.La mayor\xEDa de las im\xE1genes que uso en mi proceso creativo provienen de Internet, espec\xEDficamente de encuentros fortuitos con im\xE1genes aleatorias. Incluso antes de la aparici\xF3n de las IA, Internet ya era un mundo visual virtualmente infinito."},second:{title:"Elemento inquietante",content:"En una pintura hipot\xE9tica, un personaje mira o interact\xFAa con algo. Pero no sabemos qui\xE9n es, qu\xE9 est\xE1 haciendo o por qu\xE9 lo est\xE1 haciendo. Incluso si es algo indeterminado, la acci\xF3n introduce una narrativa e invita a pasar tiempo contemplando la imagen. La idea es que la imagen proponga una premisa abierta, algo m\xE1s all\xE1 de la pose, y que el espectador la complete. Lo inquietante como punto de partida."},third:{title:"Tradici\xF3n",content:"El patrimonio cultural est\xE1 en el ADN de cualquier identidad. Los grandes autores y los grandes temas de la historia del arte han tenido, tienen y tendr\xE1n un efecto tremendamente gravitacional. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., han creado grandes obras maestras en las que se han desarrollado los grandes temas de la historia del arte, ayer y hoy. Temas intr\xEDnsecamente humanos, transversales y universales: el amor, la muerte, el miedo..."},fourth:{title:"El fracaso como una de las Bellas Artes",content:"'He hecho muchas cosas porque he fracasado en todas ellas. Parto del fracaso como una de las Bellas Artes.' Esta cita del polifac\xE9tico Pep\xEDn Tre ilustra perfectamente la raz\xF3n de la multidisciplinariedad. El genio, la iluminaci\xF3n divina o la inspiraci\xF3n no son m\xE1s que clich\xE9s mitol\xF3gicos. La realidad, como siempre, es mucho m\xE1s prosaica: es el fracaso (real o percibido) lo que mueve a un artista a investigar, probar nuevas t\xE9cnicas, nuevas formas de llegar al p\xFAblico, etc. Por el contrario, estoy convencido de que el \xE9xito (real o percibido) tiene una capacidad paralizante y termina produciendo artistas aburridos de su propio arte y por tanto de s\xED mismos. El fracaso frustra, pero tambi\xE9n estimula, o eso quiero creer yo."}}},variables:{title:"Variables",items:{first:{title:"Inteligencia Artificial",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>En 2019, una m\xEDnima vanguardia de creadores, como Juanma Moreno, ya experimentaba con la vieja Inteligencia Artificial de esa \xE9poca</em></a>, como dice Javier Villuendas en su columna en ABC Cultural. En 2019, pocos intu\xEDamos el potencial creativo de la IA de entonces. Las viejas redes neuronales como StyleGan o Bigbigan estimulaban nuestra imaginaci\xF3n creando monstruos muy interesantes. Hoy en d\xEDa, el arte generado por IA es algo com\xFAn y ha alcanzado nuevos niveles de suficiencia formal. Pero en aquel entonces, el margen de error (la p\xE9rdida) era mucho mayor, y los accidentes produc\xEDan monstruos inauditos y altamente interesantes. De 2019 a 2023, la principal fuente de inspiraci\xF3n para mi trabajo pas\xF3 de ser im\xE1genes encontradas en Internet a im\xE1genes que las Inteligencias Artificiales son capaces de generar."},second:{title:"Software",content:"El software no tiene que ser una soluci\xF3n ultra-racional y eficiente a un problema de ingenier\xEDa. El software tambi\xE9n puede satisfacer la curiosidad de un artista, ser flexible, org\xE1nico, mutar, ser aleatorio, desordenado e impredecible. Una vez m\xE1s, debemos valorar el error. Es en la pincelada que va ligeramente m\xE1s all\xE1 del contorno, en el accidente que hace que el software distorsione una imagen hasta aberrarla, donde reside el valor y la originalidad."}}}},download:{cv:"Generar y descargar CV",statement:"Generar y descargar statement",sheet:"Generar y descargar ficha t\xE9cnica",portfolio:"Generar y descargar dossier",hd:"Descargar imagen en alta resoluci\xF3n",success:"Descarga lista",error:"No se pudo generar el archivo",full:"Resoluci\xF3n completa",medium:"Resoluci\xF3n media"},links:{view:"Ver repercusi\xF3n de la pieza en Internet",title:"Apariciones de la pieza en Internet"},critic:{generating:"Generando la cr\xEDtica",edited:"editada",notEdited:"sin editar",edit:"Editar este texto",editing:"El ensayo, en markdown. Se guarda tal cual.",save:"Guardar",saving:"Guardando\u2026",cancel:"Cancelar",saveFailed:"No se ha podido guardar. Lo que has escrito sigue aqu\xED."},seo:{default:{description:"Arte contempor\xE1neo \u2014 pintura al \xF3leo, acuarela, dibujo y arte generativo \u2014 del artista Juanma Moreno S\xE1nchez."},paintings:{title:"Pinturas",description:"Pinturas al \xF3leo, acuarelas y obra sobre papel del artista Juanma Moreno S\xE1nchez."},artwork:{title:"Obra"},artworkBy:"Obra original de Juanma Moreno S\xE1nchez.",generative:{title:"Generativo",description:"Arte generativo interactivo de Juanma Moreno S\xE1nchez, generado en el navegador."},cv:{title:"CV",description:"Exposiciones, premios, residencias y biograf\xEDa del artista Juanma Moreno S\xE1nchez."},about:{title:"Statement",description:"Statement del artista \u2014 las ideas y los temas detr\xE1s de la obra de Juanma Moreno S\xE1nchez."},contact:{title:"Contacto",description:"Ponte en contacto con el artista Juanma Moreno S\xE1nchez."},terms:{title:"T\xE9rminos del servicio",description:"T\xE9rminos del servicio de juanmamoreno.com."},privacy:{title:"Privacidad",description:"Pol\xEDtica de privacidad de juanmamoreno.com \u2014 sin cookies ni rastreadores de terceros."},notFound:{title:"P\xE1gina no encontrada"},texts:{title:"Textos",description:"Cr\xEDtica, entrevistas y prensa sobre el pintor Juanma Moreno S\xE1nchez."}},privacy:{title:"Privacidad",noBanner:"Aqu\xED no hay banner de cookies, \xBFsabes por qu\xE9? Porque no usamos ninguna.",noTracking:"De verdad que no nos importa rastrearte: ni lo que clicas, ni por d\xF3nde te mueves, ni cu\xE1nto te quedas.",noThirdParty:"Sin cookies de terceros, sin anal\xEDticas, sin redes de anuncios \u2014 nada que te siga por la web.",localOnly:"Lo \xFAnico que guardamos en tu dispositivo es una copia local de la galer\xEDa para que cargue m\xE1s r\xE1pido la pr\xF3xima vez. Nunca sale de tu navegador y no identifica a nadie.",contactUse:"Si nos escribes desde el formulario de contacto, usamos tu mensaje para una sola cosa: responderte."},terms:{title:"T\xE9rminos del servicio",intro:"Al usar este sitio, aceptas lo siguiente:",portfolio:"Esto es simplemente el portfolio del artista: muestra la obra y te permite ponerte en contacto.",noData:"No recopilamos ni almacenamos ning\xFAn dato personal.",publicContent:"Todo el contenido que se muestra aqu\xED es p\xFAblico.",ownRisk:"El uso de este sitio es bajo tu propia responsabilidad. No nos hacemos responsables de un mal uso del contenido.",changes:"Podemos actualizar estos t\xE9rminos en cualquier momento sin previo aviso."},notFound:{title:"404 \u2014 P\xE1gina no encontrada",message:"\xA1Vaya! La p\xE1gina que buscas no existe. Prueba con una de estas:"},texts:"Textos",textsPage:{intro:"Textos sobre la obra, publicados en otros medios. Cada entrada enlaza al original: son de quienes los escribieron y de los medios que los publicaron.",kind:{essay:"Texto curatorial",press:"Prensa",interview:"Entrevista",review:"Rese\xF1a"},salanova:{note:"El texto curatorial de la exposici\xF3n El Valle Inquietante, en la Galer\xEDa Zunino."},abc:{note:"Una columna sobre artistas que trabajaban con inteligencia artificial a\xF1os antes de que se generalizara."},selfie:{note:"Una entrevista sobre pintura, internet y las im\xE1genes que una generaci\xF3n hace de s\xED misma."},achtung:{note:"Una rese\xF1a de la exposici\xF3n en Zunino, quince cuadros de una d\xE9cada de trabajo, sobre c\xF3mo el artista trata los gestos y las im\xE1genes virales de las redes como rituales contempor\xE1neos, entre lo m\xEDstico y lo absurdo."}}};function ws(n,i){n&1&&ne(0,"app-breadcrumb")}var Ha=(()=>{class n{constructor(){this.translateService=s(Ae),this.canonicalService=s(Ua),this.router=s(X),this.hideBreadcrumb=re(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root)),this.canonicalService.init(),this.translateService.setTranslation(W.ENGLISH,ja),this.translateService.setTranslation(W.SPANISH,qa),this.translateService.use(W.ENGLISH),this.router.events.pipe(z(e=>e instanceof wt),dr()).subscribe(()=>{this.hideBreadcrumb.set(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root))})}deepestHideBreadcrumb(e){let t=e,r=!1;for(;t;)t.data.hideBreadcrumb&&(r=!0),t=t.firstChild;return r}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=E({type:n,selectors:[["app-root"]],decls:6,vars:3,consts:[["role","banner"],["role","main"]],template:function(t,r){t&1&&(ne(0,"app-share-button"),m(1,"header",0),ne(2,"app-top-menu"),h(),m(3,"main",1),q(4,ws,1,0,"app-breadcrumb"),ne(5,"router-outlet"),h()),t&2&&(d(3),G("no-chrome",r.hideBreadcrumb()),d(),H(r.hideBreadcrumb()?-1:4))},dependencies:[Va,La,Fa,pr],styles:["main[_ngcontent-%COMP%]{display:block;padding-bottom:3rem}main.no-chrome[_ngcontent-%COMP%]{padding-bottom:0}"]})}}return n})();var ks="@",Cs=(()=>{class n{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=s(Oe);loadingSchedulerFn=s(Ss,{optional:!0});_engine;constructor(e,t,r,a,o){this.doc=e,this.delegate=t,this.zone=r,this.animationType=a,this.moduleImpl=o}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-I2XGEIF6.js").then(r=>r),t;return this.loadingSchedulerFn?t=this.loadingSchedulerFn(e):t=e(),t.catch(r=>{throw new Pn(5300,!1)}).then(({\u0275createEngine:r,\u0275AnimationRendererFactory:a})=>{this._engine=r(this.animationType,this.doc);let o=new a(this.delegate,this._engine,this.zone);return this.delegate=o,o})}createRenderer(e,t){let r=this.delegate.createRenderer(e,t);if(r.\u0275type===0)return r;typeof r.throwOnSyntheticProps=="boolean"&&(r.throwOnSyntheticProps=!1);let a=new yn(r);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(o=>{let l=o.createRenderer(e,t);a.use(l),this.scheduler??=this.injector.get(Bn,null,{optional:!0}),this.scheduler?.notify(10)}).catch(o=>{a.use(r)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(e){this._engine?.flush(),this.delegate.componentReplaced?.(e)}static \u0275fac=function(t){Gn()};static \u0275prov=xt({token:n,factory:n.\u0275fac})}return n})(),yn=class{delegate;replay=[];\u0275type=1;constructor(i){this.delegate=i}use(i){if(this.delegate=i,this.replay!==null){for(let e of this.replay)e(i);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(i,e){return this.delegate.createElement(i,e)}createComment(i){return this.delegate.createComment(i)}createText(i){return this.delegate.createText(i)}get destroyNode(){return this.delegate.destroyNode}appendChild(i,e){this.delegate.appendChild(i,e)}insertBefore(i,e,t,r){this.delegate.insertBefore(i,e,t,r)}removeChild(i,e,t,r){this.delegate.removeChild(i,e,t,r)}selectRootElement(i,e){return this.delegate.selectRootElement(i,e)}parentNode(i){return this.delegate.parentNode(i)}nextSibling(i){return this.delegate.nextSibling(i)}setAttribute(i,e,t,r){this.delegate.setAttribute(i,e,t,r)}removeAttribute(i,e,t){this.delegate.removeAttribute(i,e,t)}addClass(i,e){this.delegate.addClass(i,e)}removeClass(i,e){this.delegate.removeClass(i,e)}setStyle(i,e,t,r){this.delegate.setStyle(i,e,t,r)}removeStyle(i,e,t){this.delegate.removeStyle(i,e,t)}setProperty(i,e,t){this.shouldReplay(e)&&this.replay.push(r=>r.setProperty(i,e,t)),this.delegate.setProperty(i,e,t)}setValue(i,e){this.delegate.setValue(i,e)}listen(i,e,t,r){return this.shouldReplay(e)&&this.replay.push(a=>a.listen(i,e,t,r)),this.delegate.listen(i,e,t,r)}shouldReplay(i){return this.replay!==null&&i.startsWith(ks)}},Ss=new ie("");function Qa(n="animations"){return jn("NgAsyncAnimations"),On([{provide:qn,useFactory:()=>new Cs(s(qe),s(ir),s(He),n)},{provide:Ln,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Ga=.8,yi=class{getTraitValue(i,e){try{return i.raw.metadata.attributes.find(t=>t.trait_type===e)?.value??""}catch{switch(e){case $.VERSION:return"";case $.MEDIUM:return"Error getting medium";case $.HEIGHT:return"XX";case $.WIDTH:return"XX";case $.UNIT:return"cm";case $.YEAR:return"XXXX";case $.IMAGETYPE:return"";default:return"Error getting data"}}}getYears(i){let e=(i??[]).map(t=>Number(this.getTraitValue(t,$.YEAR))).filter(t=>!Number.isNaN(t)).sort((t,r)=>r-t);return new Set(e)}sortByYear(i,e=Be.ASC){let t=r=>{let a=Number(this.getTraitValue(r,$.YEAR));return Number.isNaN(a)?0:a};return[...i].sort((r,a)=>{let o=t(r),l=t(a);return e===Be.ASC?o-l:l-o})}sortByMedium(i,e=Be.ASC){let t=["oil","watercolor"],r=a=>{let o=this.getTraitValue(a,$.MEDIUM).toLowerCase(),l=t.findIndex(p=>o.includes(p));return l===-1?t.length:l};return[...i].sort((a,o)=>{let l=r(a)-r(o);return e===Be.ASC?l:-l})}sortBySize(i,e=Be.ASC){return[...i].sort((t,r)=>{let a=this.getSize(t)-this.getSize(r);return e===Be.ASC?a:-a})}sortByName(i,e=Be.ASC){return[...i].sort((t,r)=>{let a=t.name?.toLowerCase()||"",o=r.name?.toLowerCase()||"",l=a.localeCompare(o);return e===Be.ASC?l:-l})}getSize(i){let e=t=>{let r=Number.parseInt(this.getTraitValue(i,t),10);return Number.isNaN(r)?0:r};return e($.HEIGHT)+e($.WIDTH)}getAspectRatio(i){if(!i)return Ga;let e=parseFloat(this.getTraitValue(i,$.WIDTH)),t=parseFloat(this.getTraitValue(i,$.HEIGHT));return e>0&&t>0?e/t:Ga}getNftById(i,e){return e.find(({tokenId:t})=>i===t)||null}getArtByTitle(i,e){return e.filter(({name:t})=>t===i)}countArtworksInYear(i,e){return e.filter(t=>this.getTraitValue(t,$.YEAR)===i).length}isFrontalView(i,e){let t=this.filterFrontalArtworks(e);return t.length?t.length===1?t[0].tokenId===i.tokenId:this.getLatestVersion(t)?.tokenId===i.tokenId:!1}filterFrontalArtworks(i){return i.filter(e=>this.getTraitValue(e,$.IMAGETYPE)===sa.FRONTAL)}isExcludedByYear(i,e=[]){if(e?.length){let t=this.getTraitValue(i,$.YEAR);return!e.includes(t)}else return!1}getLatestVersion(i){return i.length?i.reduce((e,t)=>{let r=parseInt(this.getTraitValue(e,$.VERSION))||0;return(parseInt(this.getTraitValue(t,$.VERSION))||0)>r?t:e}):null}getLatestVersionIndex(i){let e=this.getLatestVersion(i);return i.findIndex(t=>e&&t.tokenId===e.tokenId)}getNftQualityUrls(i){return this.collectUrls(i,["originalUrl","cachedUrl","thumbnailUrl"])}getNftFetchableUrls(i){return this.collectUrls(i,["originalUrl","pngUrl","thumbnailUrl"])}getNftQualityUrl(i){return this.getNftQualityUrls(i)[0]||""}getNftOptimalUrl(i){return this.collectUrls(i,["thumbnailUrl","cachedUrl","originalUrl"])[0]||""}collectUrls(i,e){let t=e.map(r=>i?.[r]);return[...new Set(t.filter(r=>typeof r=="string"&&!!r))]}};var vi=class{static olderThanNDays(i,e){let r=Math.abs(new Date().getTime()-new Date(i).getTime());return Math.ceil(r/(1e3*3600*24))>e}};var wi=(function(n){return n[n.BACKEND_THUMBNAIL=1]="BACKEND_THUMBNAIL",n[n.NFT_THUMBNAIL=2]="NFT_THUMBNAIL",n[n.NFT_CACHED=3]="NFT_CACHED",n})(wi||{}),xi="artPieces",As=8e3,ki=class extends yi{constructor(){super(...arguments),this.http=s(rr),this.sessionStore=s(Tt),this.sessionQuery=s(bi),this.isBrowser=tr(s(Fn)),this.transferState=s(Rn),this.router=s(X)}getArtPiecesObservable(){let i=this.takeTransferredArtPieces();if(i)return this.saveNftsLocally(i),J(i);if(!this.shouldRefetchCatalogue())return this.sessionQuery.getArtPiecesObservable;let e=this.http.get(`${Se.backendUrl}nfts-snapshot`).pipe(this.extractData([]),Ot(t=>{this.saveNftsLocally(t),this.transferArtPieces(t)}),Ue(()=>this.sessionQuery.getArtPiecesObservable));return this.isBrowser?this.sessionQuery.selectArtPieces.length?e.pipe(Pe(this.sessionQuery.selectArtPieces)):this.getFallbackArtworks().pipe(Ot(t=>this.sessionStore.update({artPieces:t})),_e(t=>e.pipe(Pe(t)))):e}transferArtPieces(i){if(this.isBrowser||!i.length)return;let e=this.router.url.split("?")[0].replace(/\/+$/,"");e!=="/artworks"&&e!=="/es/artworks"||this.transferState.set(xi,i)}takeTransferredArtPieces(){if(!this.isBrowser||!this.transferState.hasKey(xi))return null;let i=this.transferState.get(xi,[]);return this.transferState.remove(xi),i.length?i:null}getFallbackArtworks(){return vt(import("./chunk-A4L456P2.js")).pipe(P(i=>i.FALLBACK_ARTWORKS_API_CALL.data??[]))}getArtPieceDescriptions(i){return this.http.get(`${Se.backendUrl}descriptions/${i}`).pipe(this.extractData(null),this.giveUpDuringBuild(),Ue(()=>J(null)))}getArtPieceCritic(i){let e=this.isBrowser?{}:{params:{generate:"false"}};return this.http.get(`${Se.backendUrl}critics/${i}`,e).pipe(this.extractData(null),this.giveUpDuringBuild(),Ue(()=>J(null)))}getArtPieceCriticWithEdits(i,e){return this.http.get(`${Se.backendUrl}critics/${i}/edits`,{headers:{Authorization:`Bearer ${e}`}}).pipe(this.extractData(null),Ue(()=>J(null)))}editArtPieceCritic(i,e,t,r){return this.http.patch(`${Se.backendUrl}critics/${i}`,{lang:e,body:t},{headers:{Authorization:`Bearer ${r}`}}).pipe(this.extractData(null))}giveUpDuringBuild(){return i=>this.isBrowser?i:i.pipe(En(As))}extractData(i){return P(e=>e.success&&e.data?e.data:i)}getNftByIdObservable(i){return this.sessionQuery.getArtPiecesObservable.pipe(P(e=>this.getNftById(i,e)))}getArtworkViewsObservable(i){return this.getNftByIdObservable(i).pipe(_e(e=>e?J(this.getArtByTitle(e.name,this.sessionQuery.selectArtPieces)):this.getArtPiecesObservable().pipe(_e(t=>{let r=this.getNftById(i,t);return r?.name?J(this.getArtByTitle(r.name,t)):J([])}))))}countCatalogueArtworksInYear(i){return this.countArtworksInYear(i,this.sessionQuery.selectArtPieces)}getAvailableOptimalUrl(i){return this.getLocalCachedThumbnail(i.tokenId).pipe(_e(e=>e?J(e):this.fetchRemoteThumbnail(i.tokenId).pipe(Ue(()=>J(null)),P(t=>t||i.image.thumbnailUrl||i.image.originalUrl))))}getProgressiveImageUrls(i,e=!1){let t=this.getLocalCachedThumbnail(i.tokenId).pipe(_e(o=>o?J(o):this.fetchRemoteThumbnail(i.tokenId)),Ue(()=>J(null)),P(o=>({url:o,quality:wi.BACKEND_THUMBNAIL}))),r=this.preloadImage(i.image?.thumbnailUrl).pipe(P(o=>({url:o,quality:wi.NFT_THUMBNAIL}))),a=[t,r];if(!e){let o=this.preloadImage(i.image?.cachedUrl).pipe(P(l=>({url:l,quality:wi.NFT_CACHED})));a.push(o)}return ke(...a).pipe(Tn((o,l)=>l.url&&l.quality>o.quality?l:o,{url:null,quality:0}),P(({url:o})=>o),z(o=>!!o),je())}preloadImage(i){return!i||typeof Image>"u"?An:new Sn(e=>{let t=new Image,r=!1;return t.src=i,t.decode().then(()=>{r||(e.next(i),e.complete())}).catch(()=>{r||e.complete()}),()=>{r=!0,t.complete||(t.src="")}})}getLinks(i){return this.http.get(Se.backendUrl+"vision/search/"+i).pipe(this.extractData([]),Ue(()=>J([])))}getAvailableYears(){return this.getYears(this.sessionQuery.selectArtPieces)}saveNftsLocally(i){this.sessionStore.update({artPieces:i,lastArtPiecesUpdate:new Date})}getLocalCachedThumbnail(i){let e=this.sessionQuery.getThumbnailByTokenId(i);return J(e?Bi.composeImgSrc(e.thumbnail):null)}fetchRemoteThumbnail(i){return this.http.get(`${Se.backendUrl}nft-thumbnails/${i}`).pipe(Ot(e=>{if(e.success&&e.data){let t=this.sessionQuery.getValue().imageCache;this.sessionStore.update({imageCache:[...t,e.data]})}}),P(e=>e.data?Bi.composeImgSrc(e.data?.thumbnail):null))}shouldRefetchCatalogue(){return!this.sessionQuery.selectArtPieces.length||!this.sessionQuery.selectLastArtPiecesUpdate||vi.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate,7)}};var Es=["*"],Ms=`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--mat-list-list-item-container-color, transparent);
  border-radius: var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--selected::before, .mdc-list-item.mdc-list-item--selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-leading-icon-size, 24px);
  height: var(--mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--with-leading-icon:hover .mdc-list-item__start {
  color: var(--mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--mat-list-list-item-leading-avatar-size, 40px);
  height: var(--mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));
  line-height: var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));
  font-size: var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));
  font-weight: var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));
  letter-spacing: var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-trailing-icon-size, 24px);
  height: var(--mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end {
  color: var(--mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));
  font-family: var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--disabled::before {
  background-color: var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));
  background-color: var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
  --mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container));
}
`,Is=["unscopedContent"],Ts=["text"],Ds=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Ps=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var Os=new ie("ListOption"),Fs=(()=>{class n{_elementRef=s(ae);static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return n})(),Ls=(()=>{class n{_elementRef=s(ae);static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return n})(),Rs=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return n})(),Wa=(()=>{class n{_listOption=s(Os,{optional:!0});_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,hostVars:4,hostBindings:function(t,r){t&2&&G("mdc-list-item__start",r._isAlignedAtStart())("mdc-list-item__end",!r._isAlignedAtStart())}})}return n})(),Bs=(()=>{class n extends Wa{static \u0275fac=(()=>{let e;return function(r){return(e||(e=rt(n)))(r||n)}})();static \u0275dir=me({type:n,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[at]})}return n})(),Ns=(()=>{class n extends Wa{static \u0275fac=(()=>{let e;return function(r){return(e||(e=rt(n)))(r||n)}})();static \u0275dir=me({type:n,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[at]})}return n})(),Vs=new ie("MAT_LIST_CONFIG"),vn=(()=>{class n{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=pe(e)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(pe(e))}_disabled=re(!1);_defaultOptions=s(Vs,{optional:!0});static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,hostVars:1,hostBindings:function(t,r){t&2&&b("aria-disabled",r.disabled)},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return n})(),zs=(()=>{class n{_elementRef=s(ae);_ngZone=s(He);_listBase=s(vn,{optional:!0});_platform=s(Ye);_hostElement;_isButtonElement;_noopAnimations=Je();_avatars;_icons;set lines(e){this._explicitLines=Fi(e,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(e){this._disableRipple=pe(e)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(e){this._disabled.set(pe(e))}_disabled=re(!1);_subscriptions=new Cn;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){s(ei).load(ii);let e=s(Rr,{optional:!0});this.rippleConfig=e||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button")}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new Lr(this,this._ngZone,this._hostElement,this._platform,s(Oe)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(ke(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(e){if(!this._lines||!this._titles||!this._unscopedContent)return;e&&this._checkDomForUnscopedTextContent();let t=this._explicitLines??this._inferLinesFromContent(),r=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",t<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",t<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",t===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",t===3),this._hasUnscopedTextContent){let a=this._titles.length===0&&t===1;r.classList.toggle("mdc-list-item__primary-text",a),r.classList.toggle("mdc-list-item__secondary-text",!a)}else r.classList.remove("mdc-list-item__primary-text"),r.classList.remove("mdc-list-item__secondary-text")}_inferLinesFromContent(){let e=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(e+=1),e}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(e=>e.nodeType!==e.COMMENT_NODE).some(e=>!!(e.textContent&&e.textContent.trim()))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=me({type:n,contentQueries:function(t,r,a){if(t&1&&Fe(a,Bs,4)(a,Ns,4),t&2){let o;O(o=F())&&(r._avatars=o),O(o=F())&&(r._icons=o)}},hostVars:4,hostBindings:function(t,r){t&2&&(b("aria-disabled",r.disabled)("disabled",r._isButtonElement&&r.disabled||null),G("mdc-list-item--disabled",r.disabled))},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return n})();var $a=(()=>{class n extends vn{static \u0275fac=(()=>{let e;return function(r){return(e||(e=rt(n)))(r||n)}})();static \u0275cmp=E({type:n,selectors:[["mat-list"]],hostAttrs:[1,"mat-mdc-list","mat-mdc-list-base","mdc-list"],exportAs:["matList"],features:[$e([{provide:vn,useExisting:n}]),at],ngContentSelectors:Es,decls:1,vars:0,template:function(t,r){t&1&&(le(),V(0))},styles:[Ms],encapsulation:2})}return n})(),Ka=(()=>{class n extends zs{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(e){this._activated=pe(e)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=rt(n)))(r||n)}})();static \u0275cmp=E({type:n,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(t,r,a){if(t&1&&Fe(a,Ls,5)(a,Fs,5)(a,Rs,5),t&2){let o;O(o=F())&&(r._lines=o),O(o=F())&&(r._titles=o),O(o=F())&&(r._meta=o)}},viewQuery:function(t,r){if(t&1&&Le(Is,5)(Ts,5),t&2){let a;O(a=F())&&(r._unscopedContent=a.first),O(a=F())&&(r._itemText=a.first)}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(t,r){t&2&&(b("aria-current",r._getAriaCurrent()),G("mdc-list-item--activated",r.activated)("mdc-list-item--with-leading-avatar",r._avatars.length!==0)("mdc-list-item--with-leading-icon",r._icons.length!==0)("mdc-list-item--with-trailing-meta",r._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",r._hasBothLeadingAndTrailing())("_mat-animation-noopable",r._noopAnimations))},inputs:{activated:"activated"},exportAs:["matListItem"],features:[at],ngContentSelectors:Ps,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(t,r){t&1&&(le(Ds),V(0),m(1,"span",1),V(2,1),V(3,2),m(4,"span",2,0),N("cdkObserveContent",function(){return r._updateItemLines(!0)}),V(6,3),h()(),V(7,4),V(8,5),ne(9,"div",3))},dependencies:[Tr],encapsulation:2})}return n})();var Ya=(()=>{class n{constructor(){this.router=s(X)}navigateTo(e){this.router.navigate([e])}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=E({type:n,selectors:[["app-not-found"]],decls:26,vars:24,consts:[[1,"container","center"],[1,"catalog-heading"],["role","list"],["mat-button","","color","primary",3,"click"],["aria-label","cv","mat-button","","color","primary",3,"click"]],template:function(t,r){t&1&&(m(0,"div",0)(1,"h2",1),f(2),M(3,"translate"),h(),m(4,"p"),f(5),M(6,"translate"),h(),m(7,"mat-list",2)(8,"mat-list-item")(9,"button",3),M(10,"translate"),N("click",function(){return r.navigateTo("/artworks")}),f(11),M(12,"translate"),h()(),m(13,"mat-list-item")(14,"button",3),M(15,"translate"),N("click",function(){return r.navigateTo("/about")}),f(16),M(17,"translate"),h()(),m(18,"mat-list-item")(19,"button",4),N("click",function(){return r.navigateTo("/cv")}),f(20,"CV"),h()(),m(21,"mat-list-item")(22,"button",3),M(23,"translate"),N("click",function(){return r.navigateTo("/contact")}),f(24),M(25,"translate"),h()()()()),t&2&&(d(2),We(I(3,8,"notFound.title")),d(3),We(I(6,10,"notFound.message")),d(4),b("aria-label",I(10,12,"paintings")),d(2),U(" ",I(12,14,"paintings")," "),d(3),b("aria-label",I(15,16,"statement.title")),d(2),U(" ",I(17,18,"statement.title")," "),d(6),b("aria-label",I(23,20,"menu.contact")),d(2),U(" ",I(25,22,"menu.contact")," "))},dependencies:[$a,Ka,oi,kt],styles:[".center[_ngcontent-%COMP%]{text-align:center}"]})}}return n})();var Ja=()=>s(ca).isAdmin()||s(X).parseUrl("/door");var Za=()=>(s(Ae).use(W.SPANISH),!0),Xa=(n,i)=>Us()?s(X).parseUrl(`/es${i.url==="/"?"":i.url}`):(s(Ae).use(W.ENGLISH),!0),xn=()=>(s(Ae).use(eo()),!0);function Us(){return typeof window>"u"?!1:eo()===W.SPANISH}function eo(){return typeof window>"u"?W.ENGLISH:ia()??na()}var to=[{path:"",pathMatch:"full",loadComponent:()=>import("./chunk-OEKXAY3Z.js").then(n=>n.HomeComponent),data:{description:"seo.default.description",hideBreadcrumb:!0}},{path:"artworks",loadComponent:()=>import("./chunk-NTHEKZS5.js").then(n=>n.ArtPiecesListComponent),title:"seo.paintings.title",data:{breadcrumb:"Paintings",description:"seo.paintings.description"}},{path:"artwork/:id",loadComponent:()=>import("./chunk-Q2EQ4CRV.js").then(n=>n.ArtPieceComponent),title:"seo.artwork.title",data:{description:"seo.paintings.description",hideBreadcrumb:!0}},{path:"generative/:id",loadComponent:()=>import("./chunk-5T4QPD52.js").then(n=>n.GenerativePieceComponent),title:"seo.generative.title",data:{description:"seo.generative.description",hideBreadcrumb:!0}},{path:"cv",loadComponent:()=>import("./chunk-RLFVAYS5.js").then(n=>n.CvComponent),title:"seo.cv.title",data:{description:"seo.cv.description"}},{path:"texts",loadComponent:()=>import("./chunk-RVSFGCHQ.js").then(n=>n.TextsComponent),title:"seo.texts.title",data:{description:"seo.texts.description",hideBreadcrumb:!0}},{path:"about",loadComponent:()=>import("./chunk-HMKVASNQ.js").then(n=>n.AboutComponent),title:"seo.about.title",data:{description:"seo.about.description"}},{path:"contact",loadComponent:()=>import("./chunk-25MC63ZF.js").then(n=>n.ContactComponent),title:"seo.contact.title",data:{description:"seo.contact.description"}},{path:"terms",loadComponent:()=>import("./chunk-2SOYINI5.js").then(n=>n.TermsComponent),title:"seo.terms.title",data:{description:"seo.terms.description"}},{path:"privacy",loadComponent:()=>import("./chunk-L2VF3LIE.js").then(n=>n.PrivacyComponent),title:"seo.privacy.title",data:{description:"seo.privacy.description"}}],io=[{path:"es/studio",redirectTo:"/studio"},{path:"es/door",redirectTo:"/door"},{path:"door",canActivate:[xn],loadComponent:()=>import("./chunk-2DLHD7MP.js").then(n=>n.DoorComponent),data:{title:"Door",hideBreadcrumb:!0,noindex:!0}},{path:"studio",canActivate:[xn,Ja],loadComponent:()=>import("./chunk-25T3JBL6.js").then(n=>n.StudioComponent),data:{title:"Studio",hideBreadcrumb:!0,noindex:!0}},{path:"es",canActivate:[Za],children:to},{path:"",canActivate:[Xa],children:to},{path:"**",component:Ya,title:"seo.notFound.title"}];var no={providers:[_r(io,br(gr),yr({skipInitialTransition:!0})),vr({fallbackLang:W.ENGLISH}),{provide:St,useClass:ki},Jn(),cr(lr({filter:({url:n})=>!["nfts-snapshot","nft-thumbnails","critics"].some(i=>n.includes(i))&&!n.endsWith("/version")})),ar(sr(),or()),Qa(),{provide:ur,useExisting:la}]};ln({preStorageUpdate:(n,i)=>n==="session"&&!i.lastArtPiecesUpdate?_(c({},i),{artPieces:[]}):i});Se.production?$i():Wi();nr(Ha,no).catch(n=>console.error(n));
