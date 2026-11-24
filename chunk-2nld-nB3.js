import{n as s,t as r}from"./chunk-Ch7qlBDL.js";import{$r as x,Ar as si$1,Bn as gu,Bt as Ud,Cr as qm,E as EH,Fn as fe$1,Fr as te,Gn as hi$1,Hr as vC,Ht as Ve$1,Jn as iy,Jr as wd,K as Lm,Kn as hu,Lr as tn$1,Mn as fH,Mr as tE,N as H,Nn as f_,Pn as fc,Qn as jy,R as Iy,Rn as fy,Rr as to$1,S as Dd,St as Rm,T as E,Tr as rE,Tt as ST,Un as he$1,Ur as vb,Vn as hH,Vt as Vb,Wt as Wb,Xn as jb,Xt as Ym,Yr as we,Zn as je$1,Zr as wt$1,_n as ce,ar as mb,b as DH,bn as cy,br as pu,ci as ze$1,cn as au,ct as P_,dr as no$1,f as C_,fn as bI,fr as ny,gt as Qm,h as Cn$1,it as Nt$1,jn as ey,jr as sy,jt as T$1,kr as sI,kt as Su,l as Bb,li as zm,ln as ay,lt as Pb,m as Ce$1,mn as bu,mr as oe$1,q as Lr$1,qr as wH,rr as mC,si as zc,t as $b,ui as zv,un as bC,vt as Qv,wn as ds,wt as S,xr as qE,y as DC,yr as po$1,zn as gH,zr as tt,zt as Ub}from"./chunk-DvM41yqF.js";import{r as T$2}from"./chunk-DykW0a3M.js";import{l as Zn,n as De}from"./chunk-D0si6b2l.js";import{D as qs,l as Vs,v as h,w as me$1}from"./chunk-CPWJm3Ph.js";var pi=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,i){this._renderer=t,this._elementRef=i}setProperty(t,i){this._renderer.setProperty(this._elementRef.nativeElement,t,i)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty(`disabled`,t)}static ɵfac=function(i){return new(i||n)(po$1(zc),po$1(no$1))};static ɵdir=DC({type:n})}return n})();var gi=(()=>{class n extends pi{static ɵfac=(()=>{let t;return function(r){return(t||(t=bI(n)))(r||n)}})();static ɵdir=DC({type:n,features:[Rm]})}return n})();var Pe=new S(``);var Ar={provide:Pe,useExisting:si$1(()=>vi),multi:!0};function Vr(){let n=De()?De().getUserAgent():``;return/android (\d+)/.test(n.toLowerCase())}var Ir=new S(``);var vi=(()=>{class n extends pi{_compositionMode;_composing=!1;constructor(t,i,r){super(t,i),this._compositionMode=r,this._compositionMode??=!Vr()}writeValue(t){let i=t??``;this.setProperty(`value`,i)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static ɵfac=function(i){return new(i||n)(po$1(zc),po$1(no$1),po$1(Ir,8))};static ɵdir=DC({type:n,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(i,r){i&1&&ny(`input`,function(a){return r._handleInput(a.target.value)})(`blur`,function(){return r.onTouched()})(`compositionstart`,function(){return r._compositionStart()})(`compositionend`,function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[C_([Ar]),Rm]})}return n})();function Kt(n){return n==null||Yt(n)===0}function Yt(n){return n==null?null:Array.isArray(n)||typeof n==`string`?n.length:n instanceof Set?n.size:null}var ae=new S(``);var Xt=new S(``);var Rr=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;var he=class{static min(e){return yi(e)}static max(e){return Or(e)}static required(e){return bi(e)}static requiredTrue(e){return Tr(e)}static email(e){return kr(e)}static minLength(e){return Pr(e)}static maxLength(e){return Lr(e)}static pattern(e){return jr(e)}static nullValidator(e){return it()}static compose(e){return Mi(e)}static composeAsync(e){return wi(e)}};function yi(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return!isNaN(t)&&t<n?{min:{min:n,actual:e.value}}:null}}function Or(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return!isNaN(t)&&t>n?{max:{max:n,actual:e.value}}:null}}function bi(n){return Kt(n.value)?{required:!0}:null}function Tr(n){return n.value===!0?null:{required:!0}}function kr(n){return Kt(n.value)||Rr.test(n.value)?null:{email:!0}}function Pr(n){return e=>{let t=e.value?.length??Yt(e.value);return t===null||t===0?null:t<n?{minlength:{requiredLength:n,actualLength:t}}:null}}function Lr(n){return e=>{let t=e.value?.length??Yt(e.value);return t!==null&&t>n?{maxlength:{requiredLength:n,actualLength:t}}:null}}function jr(n){if(!n)return it;let e,t;return typeof n==`string`?(t=``,n.charAt(0)!==`^`&&(t+=`^`),t+=n,n.charAt(n.length-1)!==`$`&&(t+=`$`),e=new RegExp(t)):(t=n.toString(),e=n),i=>{if(Kt(i.value))return null;let r=i.value;return e.test(r)?null:{pattern:{requiredPattern:t,actualValue:r}}}}function it(n){return null}function _i(n){return n!=null}function xi(n){return au(n)?je$1(n):n}function Ci(n){let e={};return n.forEach(t=>{e=t!=null?r(r({},e),t):e}),Object.keys(e).length===0?null:e}function Si(n,e){return e.map(t=>t(n))}function zr(n){return!n.validate}function Ni(n){return n.map(e=>zr(e)?e:t=>e.validate(t))}function Mi(n){if(!n)return null;let e=n.filter(_i);return e.length==0?null:function(t){return Ci(Si(t,e))}}function Qt(n){return n!=null?Mi(Ni(n)):null}function wi(n){if(!n)return null;let e=n.filter(_i);return e.length==0?null:function(t){let i=Si(t,e).map(xi);return zv(i).pipe(Ve$1(Ci))}}function Zt(n){return n!=null?wi(Ni(n)):null}function li(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function Di(n){return n._rawValidators}function Ei(n){return n._rawAsyncValidators}function qt(n){return n?Array.isArray(n)?n:[n]:[]}function rt(n,e){return Array.isArray(n)?n.includes(e):n===e}function si(n,e){let t=qt(e);return qt(n).forEach(r=>{rt(t,r)||t.push(r)}),t}function di(n,e){return qt(e).filter(t=>!rt(n,t))}var ot=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Qt(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Zt(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control?.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}};var oe=class extends ot{name;get formDirective(){return null}get path(){return null}};var Ve=`VALID`;var nt=`INVALID`;var fe=`PENDING`;var Ie=`DISABLED`;var X=class{};var at=class extends X{value;source;constructor(e,t){super(),this.value=e,this.source=t}};var Oe=class extends X{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}};var Te=class extends X{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}};var me=class extends X{status;source;constructor(e,t){super(),this.status=e,this.source=t}};var lt=class extends X{source;constructor(e){super(),this.source=e}};var pe=class extends X{source;constructor(e){super(),this.source=e}};function Fi(n){return(ft(n)?n.validators:n)||null}function Br(n){return Array.isArray(n)?Qt(n):n||null}function Ai(n,e){return(ft(e)?e.asyncValidators:n)||null}function Gr(n){return Array.isArray(n)?Zt(n):n||null}function ft(n){return n!=null&&!Array.isArray(n)&&typeof n==`object`}function Hr(n,e,t){let i=n.controls;if(!(e?Object.keys(i):i).length)throw new T$1(1e3,``);if(!Vi(i,t))throw new T$1(1001,``)}function Ur(n,e,t){n._forEachChild((i,r)=>{if(t[r]===void 0)throw new T$1(-1002,``)})}var ge=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=ze$1(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return he$1(this.statusReactive)}set status(e){he$1(()=>this.statusReactive.set(e))}_status=Nt$1(()=>this.statusReactive());statusReactive=ze$1(void 0);get valid(){return this.status===Ve}get invalid(){return this.status===nt}get pending(){return this.status===fe}get disabled(){return this.status===Ie}get enabled(){return this.status!==Ie}errors;get pristine(){return he$1(this.pristineReactive)}set pristine(e){he$1(()=>this.pristineReactive.set(e))}_pristine=Nt$1(()=>this.pristineReactive());pristineReactive=ze$1(!0);get dirty(){return!this.pristine}get touched(){return he$1(this.touchedReactive)}set touched(e){he$1(()=>this.touchedReactive.set(e))}_touched=Nt$1(()=>this.touchedReactive());touchedReactive=ze$1(!1);get untouched(){return!this.touched}_events=new oe$1;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(si(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(si(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(di(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(di(e,this._rawAsyncValidators))}hasValidator(e){return rt(this._rawValidators,e)}hasAsyncValidator(e){return rt(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let i=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched(s(r({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new Te(!0,i))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:i})}),e.onlySelf||this._parent?._updateTouched(e,i),t&&e.emitEvent!==!1&&this._events.next(new Te(!1,i))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let i=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty(s(r({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new Oe(!1,i))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),e.onlySelf||this._parent?._updatePristine(e,i),t&&e.emitEvent!==!1&&this._events.next(new Oe(!0,i))}markAsPending(e={}){this.status=fe;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new me(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending(s(r({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Ie,this.errors=null,this._forEachChild(r$1=>{r$1.disable(s(r({},e),{onlySelf:!0}))}),this._updateValue();let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new at(this.value,i)),this._events.next(new me(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(s(r({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Ve,this._forEachChild(i=>{i.enable(s(r({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(s(r({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Ve||this.status===fe)&&this._runAsyncValidator(i,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new at(this.value,t)),this._events.next(new me(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity(s(r({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ie:Ve}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=fe,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let i=xi(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(`.`)),t.length===0)?null:t.reduce((i,r)=>i&&i._find(r),this)}getError(e,t){let i=t?this.get(t):this;return i?.errors?i.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,i){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||i)&&this._events.next(new me(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,i)}_initObservables(){this.valueChanges=new tt,this.statusChanges=new tt}_calculateStatus(){return this._allControlsDisabled()?Ie:this.errors?nt:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(fe)?fe:this._anyControlsHaveStatus(nt)?nt:Ve}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,e.onlySelf||this._parent?._updatePristine(e,t),r&&this._events.next(new Oe(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new Te(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){ft(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){return!e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Br(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=Gr(this._rawAsyncValidators)}_updateHasRequiredValidator(){he$1(()=>this._hasRequired.set(this.hasValidator(he.required)))}};function Vi(n,e){return Object.hasOwn(n,e)}function Jt(n){return n.tagName===`INPUT`||n.tagName===`SELECT`||n.tagName===`TEXTAREA`}function Ii(n){if(n.tagName!==`INPUT`)return!1;let e=n.type;return e===`number`||e===`range`||e===`date`||e===`month`}function Ri(n){return n.tagName===`INPUT`||n.tagName===`TEXTAREA`}function Le(n,e,t,i){switch(t){case`name`:n.setAttribute(e,t,i);break;case`disabled`:case`readonly`:case`required`:i?n.setAttribute(e,t,``):n.removeAttribute(e,t);break;case`max`:case`min`:case`minLength`:case`maxLength`:i!==void 0?n.setAttribute(e,t,i.toString()):n.removeAttribute(e,t)}}var $t=class{kind;context;control;message;constructor({kind:e,context:t,control:i}){this.kind=e,this.context=t,this.control=i}};function qr(n){return typeof n==`number`?n:parseFloat(n)}var Oi=(()=>{class n{_validator=it;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let i=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):it,this._onChange?.()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,features:[sI]})}return n})();var $r={provide:ae,useExisting:si$1(()=>Wr),multi:!0};var Wr=(()=>{class n extends Oi{min;inputName=`min`;normalizeInput=t=>qr(t);createValidator=t=>yi(t);static ɵfac=(()=>{let t;return function(r){return(t||(t=bI(n)))(r||n)}})();static ɵdir=DC({type:n,selectors:[[`input`,`type`,`number`,`min`,``,`formControlName`,``],[`input`,`type`,`number`,`min`,``,`formControl`,``],[`input`,`type`,`number`,`min`,``,`ngModel`,``]],hostVars:1,hostBindings:function(i,r){i&2&&qm(`min`,r._enabled?r.min:null)},inputs:{min:`min`},standalone:!1,features:[C_([$r]),Rm]})}return n})();var Kr={provide:ae,useExisting:si$1(()=>Ti),multi:!0};var Ti=(()=>{class n extends Oi{required;inputName=`required`;normalizeInput=DH;createValidator=t=>bi;enabled(t){return t}static ɵfac=(()=>{let t;return function(r){return(t||(t=bI(n)))(r||n)}})();static ɵdir=DC({type:n,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(i,r){i&2&&qm(`required`,r._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[C_([Kr]),Rm]})}return n})();var en=new S(``);var mt=new S(``,{factory:()=>tn});var tn=`always`;function Yr(n,e){return[...e.path,n]}function ci(n,e,t=tn){nn(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t===`always`)&&e.valueAccessor.setDisabledState?.(n.disabled),Qr(n,e),Jr(n,e),Zr(n,e),Xr(n,e)}function ui(n,e,t=!0){let i=()=>{};e?.valueAccessor?.registerOnChange(i),e?.valueAccessor?.registerOnTouched(i),dt(n,e),n&&(e._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function st(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function Xr(n,e){if(e.valueAccessor.setDisabledState){let t=i=>{e.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function nn(n,e){let t=Di(n);e.validator!==null?n.setValidators(li(t,e.validator)):typeof t==`function`&&n.setValidators([t]);let i=Ei(n);e.asyncValidator!==null?n.setAsyncValidators(li(i,e.asyncValidator)):typeof i==`function`&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();st(e._rawValidators,r),st(e._rawAsyncValidators,r)}function dt(n,e){let t=!1;if(n!==null){if(e.validator!==null){let r=Di(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==e.validator);o.length!==r.length&&(t=!0,n.setValidators(o))}}if(e.asyncValidator!==null){let r=Ei(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==e.asyncValidator);o.length!==r.length&&(t=!0,n.setAsyncValidators(o))}}}let i=()=>{};return st(e._rawValidators,i),st(e._rawAsyncValidators,i),t}function Qr(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn===`change`&&ki(n,e)})}function Zr(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn===`blur`&&n._pendingChange&&ki(n,e),n.updateOn!==`submit`&&n.markAsTouched()})}function ki(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function Jr(n,e){let t=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function Pi(n,e){nn(n,e)}function eo(n,e){return dt(n,e)}function to(n,e){if(!Object.hasOwn(n,`model`))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function no(n){return Object.getPrototypeOf(n.constructor)===gi}function Li(n,e){n._syncPendingControls(),e.forEach(t=>{let i=t.control;i.updateOn===`submit`&&i._pendingChange&&(t.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function rn(n,e){if(!e)return null;let t,i,r;return e.forEach(o=>{o.constructor===vi?t=o:no(o)?i=o:r=o}),r||i||t||null}function io(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}var ro={provide:en,useFactory:()=>{let n=E(Q,{self:!0});return{setParseErrors:e=>{n.setParseErrorSource(e)},set onReset(e){n.onReset=e}}}};var Q=class extends ot{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(e){this.userOnReset=e,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof pe&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=rn(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(e,t,i){super(),this.injector=e,this.renderer=t,this.rawValueAccessors=i,this.injector?.get(we)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let e=this.injector?.get(EH);if(!this.control||!e)return;let t=e.markForCheck.bind(e);this.subscription=new te,this.subscription.add(this.control.valueChanges.subscribe(t)),this.subscription.add(this.control.statusChanges.subscribe(t)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(i=>{i instanceof pe&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(e){!e.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!e.customControl||(this.isCustomControlBased=!0,e.listenToCustomControlModel(r=>{this.control?.markAsDirty(),this.control?.setValue(r,{emitModelToViewChange:!1}),this.viewToModelUpdate(r)}),e.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=Jt(e.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof Ti))}ngControlUpdate(e,t){if(!this.isCustomControlBased)return;let i=this.control,r=this.customControlBindings;Object.is(r.value,i.value)||(r.value=i.value,e.setCustomControlModelInput(i.value)),this.bindControlProperty(e,r,`touched`,i.touched),this.bindControlProperty(e,r,`dirty`,i.dirty),this.bindControlProperty(e,r,`valid`,i.valid),this.bindControlProperty(e,r,`invalid`,i.invalid),this.bindControlProperty(e,r,`pending`,i.pending),this.bindControlProperty(e,r,`disabled`,i.disabled),this.shouldBindRequired&&this.bindControlProperty(e,r,`required`,this.isRequired);let o=i.errors;if(r.errors!==o){r.errors=o;let a=this._convertErrors(o);e.setInputOnDirectives(`errors`,a)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(e,t,i,r){if(t[i]===r)return;t[i]=r;let o=e.setInputOnDirectives(i,r);this.isNativeFormElement&&!o&&(i===`disabled`||i===`required`)&&this.renderer&&Le(this.renderer,e.nativeElement,i,r)}_convertErrors(e){if(e===null)return[];let t=this.control;return Object.entries(e).map(([i,r])=>new $t({context:r,kind:i,control:t}))}setParseErrorSource(e){if(e===void 0)return;let t=null,i=Nt$1(()=>{let r=e();return r.length===0?null:r.reduce((o,a)=>(o[a.kind]=a,o),{})});this.parseErrorsValidator=(()=>t).bind(this),fc(()=>{t=i(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(e){this.parseErrorsValidator&&(e?.removeValidators(this.parseErrorsValidator),e?.updateValueAndValidity({emitEvent:!1}))}};var Wt=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Ia=(()=>{class n extends Wt{constructor(t){super(t)}static ɵfac=function(i){return new(i||n)(po$1(Q,2))};static ɵdir=DC({type:n,selectors:[[``,`formControlName`,``],[``,`ngModel`,``],[``,`formControl`,``]],hostVars:14,hostBindings:function(i,r){i&2&&fy(`ng-untouched`,r.isUntouched)(`ng-touched`,r.isTouched)(`ng-pristine`,r.isPristine)(`ng-dirty`,r.isDirty)(`ng-valid`,r.isValid)(`ng-invalid`,r.isInvalid)(`ng-pending`,r.isPending)},standalone:!1,features:[Rm]})}return n})();var ke=class extends ge{constructor(e,t,i){super(Fi(t),Ai(i,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(e,t){return this._find(e)||(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,i={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(e,t={}){let i=this._find(e);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(e,t,i={}){let r=this._find(e);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(e){return this._find(e)?.enabled===!0}setValue(e,t={}){he$1(()=>{Ur(this,!0,e),Object.keys(e).forEach(i=>{Hr(this,!0,i),this.controls[i].setValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)})}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(i=>{let r=this._find(i);r&&r.patchValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e={},t={}){this._forEachChild((i,r$2)=>{i.reset(e?e[r$2]:null,s(r({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new pe(this))}getRawValue(){return this._reduceChildren({},(e,t,i)=>(e[i]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(t,i)=>i._syncPendingControls()?!0:t);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let i=this.controls[t];i&&e(i,t)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[t,i]of Object.entries(this.controls))if(this.contains(t)&&e(i))return!0;return!1}_reduceValue(){return this._reduceChildren({},(t,i,r)=>((i.enabled||this.disabled)&&(t[r]=i.value),t))}_reduceChildren(e,t){let i=e;return this._forEachChild((r,o)=>{i=t(i,r,o)}),i}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return Vi(this.controls,e)?this.controls[e]:null}};var oo={provide:oe,useExisting:si$1(()=>ao)};var Re=Promise.resolve();var ao=(()=>{class n extends oe{callSetDisabledState;get submitted(){return he$1(this.submittedReactive)}_submitted=Nt$1(()=>this.submittedReactive());submittedReactive=ze$1(!1);_directives=new Set;form;ngSubmit=new tt;options;constructor(t,i,r){super(),this.callSetDisabledState=r,this.form=new ke({},Qt(t),Zt(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){Re.then(()=>{t.control=this._findContainer(t.path).registerControl(t.name,t.control),t._setupWithForm(this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){Re.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){Re.then(()=>{let i=this._findContainer(t.path),r=new ke({});Pi(r,t),i.registerControl(t.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){Re.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,i){Re.then(()=>{this.form.get(t.path).setValue(i)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),Li(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new lt(this.control)),t?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static ɵfac=function(i){return new(i||n)(po$1(ae,10),po$1(Xt,10),po$1(mt,8))};static ɵdir=DC({type:n,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(i,r){i&1&&ny(`submit`,function(a){return r.onSubmit(a)})(`reset`,function(){return r.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[C_([oo]),Rm]})}return n})();function fi(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function mi(n){return typeof n==`object`&&n!==null&&Object.keys(n).length===2&&`value`in n&&`disabled`in n}var ji=class extends ge{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,i){super(Fi(t),Ai(i,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),ft(t)&&(t.nonNullable||t.initialValueIsDefault)&&(mi(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){he$1(()=>{this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)})}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new pe(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){fi(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){fi(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){mi(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var lo=n=>n instanceof ji;var so=(()=>{class n extends oe{callSetDisabledState;get submitted(){return he$1(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=Nt$1(()=>this._submittedReactive());_submittedReactive=ze$1(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,i,r){super(),this.callSetDisabledState=r,this._setValidators(t),this._setAsyncValidators(i)}ngOnChanges(t){this.onChanges(t)}ngOnDestroy(){this.onDestroy()}onChanges(t){if(!this.form)throw new T$1(1052,!1);Object.hasOwn(t,`form`)&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(dt(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(t){let i=this.form.get(t.path);return t._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),i}getControl(t){return this.form.get(t.path)}removeControl(t){ui(t.control||null,t,!1),io(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}updateModel(t,i){this.form.get(t.path).setValue(i)}onReset(){this.resetForm()}resetForm(t=void 0,i={}){this.form.reset(t,i),this._submittedReactive.set(!1)}onSubmit(t){return this.submitted=!0,Li(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new lt(this.control)),t?.target?.method===`dialog`}_updateDomValue(){this.directives.forEach(t=>{let i=t.control,r=this.form.get(t.path);i!==r&&(ui(i||null,t),lo(r)&&t._setupWithForm(r,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let i=this.form.get(t.path);Pi(i,t),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){let i=this.form?.get(t.path);i&&eo(i,t)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){nn(this.form,this),this._oldForm&&dt(this._oldForm,this)}static ɵfac=function(i){return new(i||n)(po$1(ae,10),po$1(Xt,10),po$1(mt,8))};static ɵdir=DC({type:n,features:[Rm,sI]})}return n})();var co={provide:oe,useExisting:si$1(()=>uo)};var uo=(()=>{class n extends so{form=null;ngSubmit=new tt;get control(){return this.form}static ɵfac=(()=>{let t;return function(r){return(t||(t=bI(n)))(r||n)}})();static ɵdir=DC({type:n,selectors:[[``,`formGroup`,``]],hostBindings:function(i,r){i&1&&ny(`submit`,function(a){return r.onSubmit(a)})(`reset`,function(){return r.onReset()})},inputs:{form:[0,`formGroup`,`form`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[C_([co]),Rm]})}return n})();var fo={provide:Q,useExisting:si$1(()=>mo)};var hi=Promise.resolve();var mo=(()=>{class n extends Q{_changeDetectorRef;callSetDisabledState;control=new ji;static ngAcceptInputType_isDisabled;_registered=!1;_ngModelInjector;viewModel;name=``;isDisabled;model;options;update=new tt;constructor(t,i,r,o,a,s,u,h){super(u,h,o),this._changeDetectorRef=a,this.callSetDisabledState=s,this._parent=t,this._setValidators(i),this._setAsyncValidators(r)}ngOnChanges(t){if(this._registered,this._checkForErrors(),!this._registered||`name`in t){if(this._registered&&(this._checkName(),this.formDirective)){let i=t.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}`isDisabled`in t&&this._updateDisabled(t),to(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}ɵngControlCreate(t){super.ngControlCreate(t)}ɵngControlUpdate(t){super.ngControlUpdate(t,!1)}get shouldBindRequired(){return!1}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,ci(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:!1})}_setupWithForm(t){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,ci(this.control,this,t))}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){hi.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let i=t.isDisabled.currentValue,r=i!==0&&DH(i);hi.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?Yr(t,this._parent):[t]}static ɵfac=function(i){return new(i||n)(po$1(oe,9),po$1(ae,10),po$1(Xt,10),po$1(Pe,10),po$1(EH,8),po$1(mt,8),po$1(ce,8),po$1(zc,8))};static ɵdir=DC({type:n,selectors:[[``,`ngModel`,``,3,`formControlName`,``,3,`formControl`,``]],inputs:{name:`name`,isDisabled:[0,`disabled`,`isDisabled`],model:[0,`ngModel`,`model`],options:[0,`ngModelOptions`,`options`]},outputs:{update:`ngModelChange`},exportAs:[`ngModel`],standalone:!1,features:[C_([fo,ro]),Rm,sI,bC(null)]})}return n})();var ho={provide:Pe,useExisting:si$1(()=>po),multi:!0};var po=(()=>{class n extends gi{writeValue(t){let i=t??``;this.setProperty(`value`,i)}registerOnChange(t){this.onChange=i=>{t(i==``?null:parseFloat(i))}}static ɵfac=(()=>{let t;return function(r){return(t||(t=bI(n)))(r||n)}})();static ɵdir=DC({type:n,selectors:[[`input`,`type`,`number`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(i,r){i&1&&ny(`input`,function(a){return r.onChange(a.target.value)})(`blur`,function(){return r.onTouched()})},standalone:!1,features:[C_([ho]),Rm]})}return n})();var go=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=vC({type:n});static ɵinj=Ud({})}return n})();var Oa=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:mt,useValue:t.callSetDisabledState??tn}]}}static ɵfac=function(i){return new(i||n)};static ɵmod=vC({type:n});static ɵinj=Ud({imports:[go]})}return n})();var _n=Symbol(`FIELD_TREE`);var on=0;function vo(){return on}function Z(n,e){return(...t)=>{try{return on=e,n(...t)}finally{on=0}}}function yo(n){return!n}function zi(n){return n}function z(n){return Array.isArray(n)}function pt(n){return(typeof n==`object`||typeof n==`function`)&&n!=null}var le=Symbol();var St=Symbol();var ze=class{predicates;fns=[];constructor(e){this.predicates=e}push(e){this.fns.push(Bi(this.predicates,e))}mergeIn(e){let t=this.predicates?e.fns.map(i=>Bi(this.predicates,i)):e.fns;this.fns.push(...t)}hasRules(){return this.fns.length>0}};var gt=class extends ze{get defaultValue(){return!1}compute(e){return this.fns.some(t=>{let i=t(e);return i&&i!==St})}};var ye=class n extends ze{ignore;static ignoreNull(e){return new n(e,t=>t===null)}constructor(e,t){super(e),this.ignore=t}get defaultValue(){return[]}compute(e){return this.fns.reduce((t,i)=>{let r=i(e);return r===void 0||r===St?t:z(r)?[...t,...this.ignore?r.filter(o=>!this.ignore(o)):r]:this.ignore&&this.ignore(r)?t:[...t,r]},[])}};var an=class extends ye{constructor(e){super(e,void 0)}};var ln=class extends ze{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(e,t){super(e),this.key=t}compute(e){if(this.fns.length===0)return this.key.reducer.getInitial();let t=this.key.reducer.getInitial();for(let i=0;i<this.fns.length;i++){let r=this.fns[i](e);r!==St&&(t=this.key.reducer.reduce(t,r))}return t}};function Bi(n,e){return n.length===0?e:t=>{for(let i of n){let r=t.stateOf(i.path),o=he$1(r.structure.pathKeys).length-i.depth;for(let a=0;a<o;a++)r=r.structure.parent;if(!i.fn(r.context))return St}return e(t)}}var be=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(e){this.predicates=e,this.hidden=new gt(e),this.disabledReasons=new an(e),this.readonly=new gt(e),this.syncErrors=ye.ignoreNull(e),this.syncTreeErrors=ye.ignoreNull(e),this.asyncErrors=ye.ignoreNull(e)}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(e){return this.metadata.has(e)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(e){return this.metadata.has(e)||this.metadata.set(e,new ln(this.predicates,e)),this.metadata.get(e)}mergeIn(e){this.hidden.mergeIn(e.hidden),this.disabledReasons.mergeIn(e.disabledReasons),this.readonly.mergeIn(e.readonly),this.syncErrors.mergeIn(e.syncErrors),this.syncTreeErrors.mergeIn(e.syncTreeErrors),this.asyncErrors.mergeIn(e.asyncErrors);for(let t of e.getMetadataKeys()){let i=e.metadata.get(t);this.getMetadata(t).mergeIn(i)}}};var vt=class{depth;constructor(e){this.depth=e}build(){return new yt(this,[],0)}};var _e=class n extends vt{constructor(e){super(e)}current;all=[];addHiddenRule(e){this.getCurrent().addHiddenRule(e)}addDisabledReasonRule(e){this.getCurrent().addDisabledReasonRule(e)}addReadonlyRule(e){this.getCurrent().addReadonlyRule(e)}addSyncErrorRule(e){this.getCurrent().addSyncErrorRule(e)}addSyncTreeErrorRule(e){this.getCurrent().addSyncTreeErrorRule(e)}addAsyncErrorRule(e){this.getCurrent().addAsyncErrorRule(e)}addMetadataRule(e,t){this.getCurrent().addMetadataRule(e,t)}getChild(e){if(e===le){let t=this.getCurrent().children;t.size>(t.has(le)?1:0)&&(this.current=void 0)}return this.getCurrent().getChild(e)}hasLogic(e){return this===e?!0:this.all.some(({builder:t})=>t.hasLogic(e))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:e})=>e.anyChildHasLogic())}mergeIn(e,t){t?this.all.push({builder:e,predicate:{fn:Z(t.fn,this.depth),path:t.path}}):this.all.push({builder:e}),this.current=void 0}getCurrent(){return this.current===void 0&&(this.current=new Be(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new n(0)}};var Be=class extends vt{logic=new be([]);children=new Map;constructor(e){super(e)}addHiddenRule(e){this.logic.hidden.push(Z(e,this.depth))}addDisabledReasonRule(e){this.logic.disabledReasons.push(Z(e,this.depth))}addReadonlyRule(e){this.logic.readonly.push(Z(e,this.depth))}addSyncErrorRule(e){this.logic.syncErrors.push(Z(e,this.depth))}addSyncTreeErrorRule(e){this.logic.syncTreeErrors.push(Z(e,this.depth))}addAsyncErrorRule(e){this.logic.asyncErrors.push(Z(e,this.depth))}addMetadataRule(e,t){this.logic.getMetadata(e).push(Z(t,this.depth))}getChild(e){return this.children.has(e)||this.children.set(e,new _e(this.depth+1)),this.children.get(e)}hasLogic(e){return this===e}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let e of this.children.values())if(e.hasRules())return!0;return!1}};var yt=class n{builder;predicates;depth;logic;constructor(e,t,i){this.builder=e,this.predicates=t,this.depth=i,this.logic=e?bo(e,t,i):new be([])}getChild(e){let t=this.builder?Ui(this.builder,e):[];if(t.length===0)return new n(void 0,[],this.depth+1);if(t.length===1){let{builder:i,predicates:r}=t[0];return new n(i,[...this.predicates,...r.map(o=>dn(o,this.depth))],this.depth+1)}else return new sn(t.map(({builder:r,predicates:o})=>new n(r,[...this.predicates,...o.map(a=>dn(a,this.depth))],this.depth+1)))}hasLogic(e){return this.builder?this.builder.hasLogic(e):!1}hasRules(){return this.builder?this.builder.hasRules():!1}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():!1}};var sn=class n{all;logic;constructor(e){this.all=e,this.logic=new be([]);for(let t of e)this.logic.mergeIn(t.logic)}getChild(e){return new n(this.all.flatMap(t=>t.getChild(e)))}hasLogic(e){return this.all.some(t=>t.hasLogic(e))}hasRules(){return this.all.some(e=>e.hasRules())}anyChildHasLogic(){return this.all.some(e=>e.anyChildHasLogic())}};function Ui(n,e){if(n instanceof _e)return n.all.flatMap(({builder:t,predicate:i})=>{let r=Ui(t,e);return i?r.map(({builder:o,predicates:a})=>({builder:o,predicates:[...a,i]})):r});if(n instanceof Be)return[...e!==le&&n.children.has(le)?[{builder:n.getChild(le),predicates:[]}]:[],...n.children.has(e)?[{builder:n.getChild(e),predicates:[]}]:[]];throw new T$1(1909,!1)}function bo(n,e,t){let i=new be(e);if(n instanceof _e){let r=n.all.map(({builder:o,predicate:a})=>new yt(o,a?[...e,dn(a,t)]:e,t));for(let o of r)i.mergeIn(o.logic)}else if(n instanceof Be)i.mergeIn(n.logic);else throw new T$1(1909,!1);return i}function dn(n,e){return s(r({},n),{depth:e})}var qi=Symbol(`PATH`);var B=class n{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,_o);logicBuilder;constructor(e,t,i,r){this.keys=e,this.parent=i,this.keyInParent=r,this.root=t??this,i||(this.logicBuilder=_e.newRoot())}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(e){return this.children.has(e)||this.children.set(e,new n([...this.keys,e],this.root,this,e)),this.children.get(e)}mergeIn(e,t){let i=e.compile();this.builder.mergeIn(i.builder,t)}static unwrapFieldPath(e){return e[qi]}static newRoot(){return new n([],void 0,void 0,void 0)}};var _o={get(n,e){return e===qi?n:n.getChild(e).fieldPathProxy}};var ht;var je=new Map;var bt=class n{schemaFn;constructor(e){this.schemaFn=e}compile(){if(je.has(this))return je.get(this);let e=B.newRoot();je.set(this,e);let t=ht;try{ht=e,this.schemaFn(e.fieldPathProxy)}finally{ht=t}return e}static create(e){return e instanceof n?e:new n(e)}static rootCompile(e){try{return je.clear(),e===void 0?B.newRoot():e instanceof n?e.compile():new n(e).compile()}finally{je.clear()}}};function xo(n){return n instanceof bt||typeof n==`function`}function Nt(n){if(ht!==B.unwrapFieldPath(n).root)throw new T$1(1908,!1)}function He(n,e,t){return Nt(n),B.unwrapFieldPath(n).builder.addMetadataRule(e,t),e}var xe={list(){return{reduce:(n,e)=>e===void 0?n:[...n,e],getInitial:()=>[]}},min(){return{reduce:(n,e)=>n===void 0||e===void 0?n??e:e<n?e:n,getInitial:()=>{}}},max(){return{reduce:(n,e)=>n===void 0||e===void 0?n??e:e>n?e:n,getInitial:()=>{}}},or(){return{reduce:(n,e)=>n||e,getInitial:()=>!1}},and(){return{reduce:(n,e)=>n&&e,getInitial:()=>!0}},override:Co};function Co(n){return{reduce:(e,t)=>t,getInitial:()=>n?.()}}var xn=Symbol(`IS_ASYNC_VALIDATION_RESOURCE`);var _t=class{reducer;create;brand;[xn];constructor(e,t){this.reducer=e,this.create=t}};function q(n){return new _t(n??xe.override())}function Cn(){return q()}var Sn=q(xe.or());var $i=Cn();var Wi=Cn();var Ki=q(xe.max());var Nn=q(xe.min());var Yi=q(xe.list());function T(n,e){if(n===e)return!0;if(!n||!e||n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(!Object.is(n[t],e[t]))return!1;return!0}function So(n){return n.errors().length>0?`invalid`:n.pending()?`unknown`:`valid`}var cn=class{node;constructor(e){this.node=e}rawSyncTreeErrors=Nt$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:T});syncErrors=Nt$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),...No(this.node.submitState.submissionErrors())],{equal:T});syncValid=Nt$1(()=>this.shouldSkipValidation()?!0:this.node.structure.reduceChildren(this.syncErrors().length===0,(e,t)=>t&&e.validationState.syncValid(),yo));syncTreeErrors=Nt$1(()=>this.rawSyncTreeErrors().filter(e=>e.fieldTree===this.node.fieldTree),{equal:T});rawAsyncErrors=Nt$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:T});asyncErrors=Nt$1(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(e=>e===`pending`||e.fieldTree===this.node.fieldTree),{equal:T});parseErrors=Nt$1(()=>this.node.formFieldBindings().flatMap(e=>e.parseErrors()),{equal:T});errors=Nt$1(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(e=>e!==`pending`)],{equal:T});errorSummary=Nt$1(()=>{let e=this.node.structure.reduceChildren(this.errors(),(t,i)=>[...i,...t.errorSummary()]);return he$1(()=>e.sort(Mo)),e},{equal:T});pending=Nt$1(()=>this.node.structure.reduceChildren(this.asyncErrors().includes(`pending`),(e,t)=>t||e.validationState.pending()));status=Nt$1(()=>{if(this.shouldSkipValidation())return`valid`;let e=So(this);return this.node.structure.reduceChildren(e,(t,i)=>i===`invalid`||t.validationState.status()===`invalid`?`invalid`:i===`unknown`||t.validationState.status()===`unknown`?`unknown`:`valid`,t=>t===`invalid`)});valid=Nt$1(()=>this.status()===`valid`);invalid=Nt$1(()=>this.status()===`invalid`);shouldSkipValidation=Nt$1(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function No(n){return n===void 0?[]:z(n)?n:[n]}function Mn(n,e){if(z(n))for(let t of n)t.fieldTree??=e;else n&&(n.fieldTree??=e);return n}function Gi(n){return n.formField?n.formField.element:n.fieldTree().formFieldBindings().reduce((e,t)=>!e||!t.element?e??t.element:e.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t.element:e,void 0)}function Mo(n,e){let t=Gi(n),i=Gi(e);return t===i?0:t===void 0||i===void 0?t===void 0?1:-1:t.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var un=q();var fn=class{node;cache=new WeakMap;constructor(e){this.node=e,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this)}resolve(e){if(!this.cache.has(e)){let t=Nt$1(()=>{let i=B.unwrapFieldPath(e),r=this.node,o=vo();for(;o>0||!r.structure.logic.hasLogic(i.root.builder);)if(o--,r=r.structure.parent,r===void 0)throw new T$1(1900,!1);for(let a of i.keys)if(r=r.structure.getChild(a),r===void 0)throw new T$1(1901,!1);return r.fieldTree});this.cache.set(e,t)}return this.cache.get(e)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=Nt$1(()=>{let e=this.key();if(!z(he$1(this.node.structure.parent.value)))throw new T$1(1906,!1);return Number(e)});fieldTreeOf(e){return this.resolve(e)}stateOf(e){return this.resolve(e)()}valueOf=e=>{let t=this.resolve(e)().value();if(t instanceof ge)throw new T$1(1907,!1);return t}};var mn=class{node;metadata=new Map;constructor(e){this.node=e}runMetadataCreateLifecycle(){if(!this.node.logicNode.logic.hasMetadataKeys())return;let e=jy();e&&Su(!1);try{he$1(()=>hi$1(this.node.structure.injector,()=>{for(let t of this.node.logicNode.logic.getMetadataKeys())if(t.create){let i=this.node.logicNode.logic.getMetadata(t),r=t.create(this.node,Nt$1(()=>i.compute(this.node.context)));this.metadata.set(t,r)}}))}finally{e&&Su(!0)}}get(e){if(this.has(e)&&!this.metadata.has(e)){if(e.create)throw new T$1(1912,!1);let t=this.node.logicNode.logic.getMetadata(e);this.metadata.set(e,Nt$1(()=>t.compute(this.node.context)))}return this.metadata.get(e)}has(e){return this.node.logicNode.logic.hasMetadata(e)}};var wo={get(n,e,t){if(e===_n)return!0;let i=n(),r=i.structure.getChild(e);if(r!==void 0)return r.fieldTree;let o=he$1(i.value);if(z(o)){if(e===`length`)return i.value().length;if(e===Symbol.iterator)return()=>(i.value(),Array.prototype[Symbol.iterator].apply(i.fieldTree))}if(pt(o)&&e===Symbol.iterator)return function*(){for(let a in t)yield[a,t[a]]}},getOwnPropertyDescriptor(n,e){let t=he$1(n().value),i=Reflect.getOwnPropertyDescriptor(t,e);return i&&!i.configurable&&(i.configurable=!0),i},ownKeys(n){let e=he$1(n().value);return typeof e==`object`&&e!==null?Reflect.ownKeys(e):[]}};function Do(n,e){let t=Nt$1(()=>n()[e()]);return t[H]=n[H],t.set=i=>{Object.is(he$1(t),i)||n.update(r=>Eo(r,i,e()))},t.update=i=>{t.set(i(he$1(t)))},t.asReadonly=()=>t,t}function Eo(n,e,t){if(z(n)){let i=[...n];return i[t]=e,i}else return s(r({},n),{[t]:e})}var ve=Symbol(``);var Xi=Nt$1(()=>!1);var xt=class{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=ce.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(e,t,i){this.logic=e,this.node=t,this.createChildNode=i}children(){this.ensureChildrenMap();let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>he$1(t.reader))}materializedChildren(){let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>t.node)}_areChildrenMaterialized(){return he$1(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||he$1(()=>{this.childrenMap.update(e=>this.computeChildrenMap(this.value(),e,!0))})}getChild(e){this.ensureChildrenMap();let t=e.toString(),i=he$1(this.childrenMap)?.byPropertyKey.get(t)?.reader;return i||(i=this.createReader(t)),i()}reduceChildren(e,t,i){let r=this.childrenMap();if(!r)return e;let o=e;for(let a of r.byPropertyKey.values()){if(i?.(o))break;o=t(he$1(a.reader),o)}return o}destroy(){this.injector.destroy()}createKeyOrOrphanSignals(e,t,i){if(e===`root`)return{keyInParent:Qi,isOrphaned:Xi};let r=this.parent,o=i,a=Nt$1(()=>{if(r.structure.isOrphaned())return ve;let h=r.structure.childrenMap();if(!h)return ve;let C=h.byPropertyKey.get(o);if(C&&C.node===this.node)return o;if(t===void 0)return ve;for(let[F,ee]of h.byPropertyKey)if(ee.node===this.node)return o=F;return ve}),s=Nt$1(()=>a()===ve);return{keyInParent:Nt$1(()=>{let h=a();if(h===ve)throw t===void 0?new T$1(-1902,!1):new T$1(1904,!1);return h}),isOrphaned:s}}createChildrenMap(){return bu({source:this.value,computation:(e,t)=>this.computeChildrenMap(e,t?.value,!1)})}computeChildrenMap(e,t,i){if(!pt(e)||!i&&t===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;t??={byPropertyKey:new Map};let r$3,o=z(e);t!==void 0&&(o?r$3=Ao(t,e,this.identitySymbol):r$3=Vo(t,e));for(let a of Object.keys(e)){let s,u=e[a];if(u===void 0){t.byPropertyKey.has(a)&&(r$3??=r({},t),r$3.byPropertyKey.delete(a));continue}o&&pt(u)&&!z(u)&&(s=u[this.identitySymbol]??=Symbol(``));let h;s&&(t.byTrackingKey?.has(s)||(r$3??=r({},t),r$3.byTrackingKey??=new Map,r$3.byTrackingKey.set(s,this.createChildNode(a,s,o))),h=(r$3??t).byTrackingKey.get(s));let C=t.byPropertyKey.get(a);C===void 0?(r$3??=r({},t),r$3.byPropertyKey.set(a,{reader:this.createReader(a),node:h??this.createChildNode(a,s,o)})):h&&h!==C.node&&(r$3??=r({},t),C.node=h)}return r$3??t}createReader(e){return Nt$1(()=>this.childrenMap()?.byPropertyKey.get(e)?.node)}};var hn=class extends xt{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return Fo}get keyInParent(){return Qi}isOrphaned=Xi;childrenMap;constructor(e,t,i,r,o){super(t,e,o),this.fieldManager=i,this.value=r,this.childrenMap=this.createChildrenMap()}};var pn=class extends xt{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(e,t,i,r,o,a){super(t,e,a),this.logic=t,this.parent=i,this.root=this.parent.structure.root;let s=this.createKeyOrOrphanSignals(`child`,r,o);this.isOrphaned=s.isOrphaned,this.keyInParent=s.keyInParent,this.pathKeys=Nt$1(()=>[...i.structure.pathKeys(),this.keyInParent()]),this.value=Do(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this)}};var Fo=Nt$1(()=>[]);var Qi=Nt$1(()=>{throw new T$1(1905,!1)});function Ao(n,e,t){let i,r$4=new Set(n.byPropertyKey.keys()),o=n.byTrackingKey&&new Set(n.byTrackingKey.keys());for(let a=0;a<e.length;a++){let s=e[a];r$4.delete(a.toString()),o&&pt(s)&&Object.hasOwn(s,t)&&o.delete(s[t])}if(r$4.size>0){i??=r({},n);for(let a of r$4)i.byPropertyKey.delete(a)}if(o&&o.size>0){i??=r({},n);for(let a of o)i.byTrackingKey.delete(a)}return i}function Vo(n,e){let t;for(let i of n.byPropertyKey.keys())Object.hasOwn(e,i)||(t??=r({},n),t.byPropertyKey.delete(i));return t}var gn=class{node;selfSubmitting=ze$1(!1);submissionErrors;constructor(e){this.node=e,this.submissionErrors=bu({source:this.node.structure.value,computation:()=>[]})}submitting=Nt$1(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??!1))};var Ge=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new fn(this)}fieldProxy=new Proxy(()=>this,wo);pathNode;constructor(e){this.pathNode=e.pathNode,this.fieldAdapter=e.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,e),this.validationState=this.fieldAdapter.createValidationState(this,e),this.nodeState=this.fieldAdapter.createNodeState(this,e),this.metadataState=new mn(this),this.submitState=new gn(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle()}focusBoundControl(e){this.getBindingForFocus()?.focus(e)}getBindingForFocus(){return this.formFieldBindings().filter(t=>t.focus!==void 0).reduce(Hi,void 0)||this.structure.children().map(t=>t.getBindingForFocus()).reduce(Hi,void 0)}pendingSync=bu({source:()=>this.value(),computation:(e,t)=>{t?.value?.abort()}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let e=this.metadata(Wi)?.();return e?this.metadata(e):void 0}get maxLength(){return this.metadata(Nn)}get min(){let e=this.metadata($i)?.();return e?this.metadata(e):void 0}get minLength(){return this.metadata(Ki)}get pattern(){return this.metadata(Yi)??Io}get required(){return this.metadata(Sn)??Ro}metadata(e){return this.metadataState.get(e)}getError(e){return this.errors().find(t=>t.kind===e)}hasMetadata(e){return this.metadataState.has(e)}markAsTouched(e){this.structure.isOrphaned()||he$1(()=>{this.markAsTouchedInternal(e),this.flushSync()})}markAsTouchedInternal(e){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!e?.skipDescendants))for(let t of this.structure.children())t.markAsTouchedInternal()}markAsDirty(){this.nodeState.markAsDirty()}markAsPristine(){this.nodeState.markAsPristine()}markAsUntouched(){this.nodeState.markAsUntouched()}reset(e){he$1(()=>this._reset(e))}_reset(e){this.pendingSync()?.abort(),e!==void 0&&this.value.set(e),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let t of this.formFieldBindings())t.reset();for(let t of this.structure.materializedChildren())t._reset()}reloadValidation(){he$1(()=>this._reloadValidation())}_reloadValidation(){let e=this.logicNode.logic.getMetadataKeys();for(let t of e)t[xn]&&this.metadata(t).reload?.();for(let t of this.structure.children())t._reloadValidation()}controlValueSignal(){let e=bu(this.value);e.rawSet=e.set,e.set=i=>{e.rawSet(i),this.markAsDirty(),this.debounceSync()};let t=e.update;return e.update=i=>{t(i),this.markAsDirty(),this.debounceSync()},e}sync(){this.value.set(this.controlValue())}flushSync(){let e=this.pendingSync();e&&!e.signal.aborted&&(e.abort(),this.sync())}async debounceSync(){let e=he$1(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(e){let t=new AbortController,i=e(t.signal);if(i&&(this.pendingSync.set(t),await i,t.signal.aborted))return}this.structure.isOrphaned()||this.sync()}static newRoot(e,t,i,r){return r.newRoot(e,t,i,r)}createStructure(e){return e.kind===`root`?new hn(this,e.logic,e.fieldManager,e.value,this.newChild.bind(this)):new pn(this,e.logic,e.parent,e.identityInParent,e.initialKeyInParent,this.newChild.bind(this))}newChild(e,t,i){let r,o;return i?(r=this.pathNode.getChild(le),o=this.structure.logic.getChild(le)):(r=this.pathNode.getChild(e),o=this.structure.logic.getChild(e)),this.fieldAdapter.newChild({kind:`child`,parent:this,pathNode:r,logic:o,initialKeyInParent:e,identityInParent:t,fieldAdapter:this.fieldAdapter})}};var Io=Nt$1(()=>[]);var Ro=Nt$1(()=>!1);function Hi(n,e){return n?e&&n.element.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e:n:e}var vn=class{node;selfTouched=ze$1(!1);selfDirty=ze$1(!1);markAsTouched(){this.selfTouched.set(!0)}markAsDirty(){this.selfDirty.set(!0)}markAsPristine(){this.selfDirty.set(!1)}markAsUntouched(){this.selfTouched.set(!1)}formFieldBindings=ze$1([]);constructor(e){this.node=e}dirty=Nt$1(()=>{let e=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,i)=>i||t.nodeState.dirty(),zi)});touched=Nt$1(()=>{let e=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,i)=>i||t.nodeState.touched(),zi)});disabledReasons=Nt$1(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:T});disabled=Nt$1(()=>!!this.disabledReasons().length);readonly=Nt$1(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??!1);hidden=Nt$1(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??!1);name=Nt$1(()=>{let e=this.node.structure.parent;return e?`${e.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=Nt$1(()=>{if(this.node.logicNode.logic.hasMetadata(un)){let t=this.node.logicNode.logic.getMetadata(un).compute(this.node.context);if(t)return i=>t(this.node.context,i)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=Nt$1(()=>this.hidden()||this.disabled()||this.readonly())};var yn=class{newRoot(e,t,i,r){return new Ge({kind:`root`,fieldManager:e,value:t,pathNode:i,logic:i.builder.build(),fieldAdapter:r})}newChild(e){return new Ge(e)}createNodeState(e){return new vn(e)}createValidationState(e){return new cn(e)}createStructure(e,t){return e.createStructure(t)}};var bn=class{injector;rootName;submitOptions;constructor(e,t,i){this.injector=e,this.rootName=t??`${this.injector.get(wt$1)}.form${Oo++}`,this.submitOptions=i}structures=new Set;createFieldManagementEffect(e){fc(()=>{let t=new Set;this.markStructuresLive(e,t);for(let i of this.structures)t.has(i)||(this.structures.delete(i),he$1(()=>i.destroy()))},{injector:this.injector})}markStructuresLive(e,t){t.add(e);for(let i of e.children())this.markStructuresLive(i.structure,t)}};var Oo=0;var Zi=new S(``);function To(n){let e,t,i;return n.length===3?[e,t,i]=n:n.length===2?xo(n[1])?[e,t]=n:[e,i]=n:[e]=n,[e,t,i]}function ko(...n){let[e,t,i]=To(n),r=i?.injector??E(ce),o=hi$1(r,()=>bt.rootCompile(t)),a=new bn(r,i?.name,i?.submission),s=i?.adapter??new yn,u=Ge.newRoot(a,e,o,s);a.createFieldManagementEffect(u.structure);let{experimentalWebMcpTool:h}=i??{};if(h){let C=hi$1(r,()=>E(Zi,{optional:!0}));C&&hi$1(r,()=>C(u.fieldTree,{name:h.name,description:h.description,annotations:h.annotations}))}return u.fieldTree}async function Ji(n,e){let t=he$1(n);if(he$1(t.submitState.submitting))return!1;let i=e===void 0?t.structure.root.fieldProxy:n,r={root:t.structure.root.fieldProxy,submitted:n};e=typeof e==`function`?{action:e}:e??t.structure.fieldManager.submitOptions;let o=e?.action;if(!o)throw new T$1(1915,!1);t.markAsTouched();let a=e?.onInvalid,s=Po(t,e?.ignoreValidators);try{if(s){t.submitState.selfSubmitting.set(!0);let u=await he$1(()=>o?.(i,r));return u&&Lo(t,u),!u||z(u)&&u.length===0}else he$1(()=>a?.(i,r));return!1}finally{t.submitState.selfSubmitting.set(!1)}}function Po(n,e){switch(e){case`all`:return!0;case`none`:return he$1(n.valid);default:return!he$1(n.invalid)}}function Lo(n,e){z(e)||(e=[e]);let t=new Map;for(let i of e){let r=Mn(i,n.fieldTree),o=r.fieldTree(),a=t.get(o);a||(a=[],t.set(o,a)),a.push(r)}for(let[i,r]of t)i.submitState.submissionErrors.set(r)}var Ct=class{kind=`compat`;control;fieldTree;context;message;constructor({context:e,kind:t,control:i}){this.context=e,this.kind=t,this.control=i}};function er(n){if(n.length===0)return null;let e={};for(let t of n)e[t.kind]=t instanceof Ct?t.context:t;return e}function tr(n,e){return n===null?[]:Object.entries(n).map(([t,i])=>new Ct({context:i,kind:t,control:e}))}function Ue(n){return typeof n==`function`&&n[_n]===!0}var jo=new S(``);function ml(n,e){Nt(n);let t=B.unwrapFieldPath(n),i;typeof e==`function`||typeof e==`string`?i=e:i=e?.when,t.builder.addDisabledReasonRule(r=>{let o=!0;return typeof i==`string`?o=i:i&&(o=i(r)),typeof o==`string`?{fieldTree:r.fieldTree,message:o}:o?{fieldTree:r.fieldTree}:void 0})}function zo(n){let e=n;return typeof e.length==`number`?e.length:e.size}function Ce(n,e){return n instanceof Function?n(e):n}function Vn(n){return typeof n==`number`?isNaN(n):n===``||n===!1||n==null}function nr(n){return n===void 0?[]:Array.isArray(n)?n:[n]}function In(n,e){Nt(n),B.unwrapFieldPath(n).builder.addSyncErrorRule(i=>Mn(e(i),i.fieldTree))}function Bo(n){return new wn(n)}function Go(n,e){return new Dn(n,e)}function Ho(n){return new En(n)}var Se=class{__brand=void 0;kind=``;fieldTree;message;constructor(e){e&&Object.assign(this,e)}};var wn=class extends Se{kind=`required`};var Dn=class extends Se{maxLength;kind=`maxLength`;constructor(e,t){super(t),this.maxLength=e}};var En=class extends Se{kind=`email`};var Mt=class extends Se{kind=`parse`};var Uo=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;function hl(n,e){In(n,t=>{if(!(e?.when&&!e.when(t))&&!Vn(t.value())&&!Uo.test(t.value()))return e?.error?Ce(e.error,t):Ho({message:Ce(e?.message,t)})})}function pl(n,e,t){let i=He(n,q(),r=>{if(!(t?.when&&!t.when(r)))return typeof e==`number`?e:e(r)});He(n,Nn,({state:r})=>r.metadata(i)()),In(n,r=>{if(Vn(r.value()))return;let o=r.state.metadata(i)();if(o!==void 0&&zo(r.value())>o)return t?.error?Ce(t.error,r):Go(o,{message:Ce(t?.message,r)})})}function gl(n,e){let t=He(n,q(),i=>e?.when?e.when(i):!0);He(n,Sn,({state:i})=>i.metadata(t)()),In(n,i=>{if(i.state.metadata(t)()&&Vn(i.value()))return e?.error?Ce(e.error,i):Bo({message:Ce(e?.message,i)})})}function qo(n,e,t){let i=bu({source:n,computation:()=>[],equal:T}),r=a=>{let s=t(a);i.set(nr(s.error)),s.value!==void 0&&e(s.value),i.set(nr(s.error))},o=()=>{i.set([])};return{errors:i.asReadonly(),setRawValue:r,reset:o}}var Fn=class{field;constructor(e){this.field=e}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return!this.field().disabled()}get errors(){return er(this.field().errors())}get pristine(){return!this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return!this.field().touched()}get status(){if(this.field().disabled())return`DISABLED`;if(this.field().valid())return`VALID`;if(this.field().invalid())return`INVALID`;if(this.field().pending())return`PENDING`;throw new T$1(1910,!1)}valueAccessor=null;hasValidator(e){return e===he.required?this.field().required():!1}updateValueAndValidity(){}};var An={disabled:`disabled`,disabledReasons:`disabledReasons`,dirty:`dirty`,errors:`errors`,hidden:`hidden`,invalid:`invalid`,max:`max`,maxLength:`maxLength`,min:`min`,minLength:`minLength`,name:`name`,pattern:`pattern`,pending:`pending`,readonly:`readonly`,required:`required`,touched:`touched`};var $o=(()=>{let n={};for(let e of Object.keys(An))n[An[e]]=e;return n})();function Rn(n,e){return n[$o[e]]?.()}var On=Object.values(An);function wt(){return{}}function J(n,e,t){return Object.is(n[e],t)?!1:(n[e]=t,!0)}function Wo(n,e,t){let i;if(ar(n)&&t.isBadInput(n))return{error:new Mt};switch(n.type){case`checkbox`:return{value:n.checked};case`number`:case`range`:case`datetime-local`:if(i=he$1(e),typeof i==`number`||i===null)return{value:n.value===``?null:n.valueAsNumber};break;case`date`:case`month`:case`time`:case`week`:if(i=he$1(e),i===null||i instanceof Date)return{value:n.valueAsDate};if(typeof i==`number`)return{value:n.valueAsNumber}}if(n.tagName===`INPUT`&&n.type===`text`&&(i??=he$1(e),typeof i==`number`||i===null)){if(n.value===``)return{value:null};let r=Number(n.value);return Number.isNaN(r)?{error:new Mt}:{value:r}}return{value:n.value}}function ir(n,e){switch(n.type){case`checkbox`:n.checked=e;return;case`radio`:n.checked=e===n.value;return;case`number`:case`range`:case`datetime-local`:if(typeof e==`number`){rr(n,e);return}else if(e===null){n.value=``;return}break;case`date`:case`month`:case`time`:case`week`:if(e===null||e instanceof Date){n.valueAsDate=e;return}else if(typeof e==`number`){rr(n,e);return}}if(n.tagName===`INPUT`&&n.type===`text`){if(typeof e==`number`){n.value=isNaN(e)?``:String(e);return}if(e===null){n.value=``;return}}n.value=e}function rr(n,e){isNaN(e)?n.value=``:n.valueAsNumber=e}function ar(n){return n.tagName===`INPUT`}function Ko(n){return n.type===`date`||n.type===`datetime-local`||n.type===`month`||n.type===`time`||n.type===`week`}function Yo(n,e){let t=n.getUTCFullYear(),i=String(n.getUTCMonth()+1).padStart(2,`0`);if(e===`month`)return`${t}-${i}`;return`${t}-${i}-${String(n.getUTCDate()).padStart(2,`0`)}`}function lr(n,e,t){return e instanceof Date&&(n===`min`||n===`max`)&&(t===`date`||t===`month`)?Yo(e,t):e}function Xo(n,e){n.listenToCustomControlModel(i=>e.state().controlValue.set(i)),n.listenToCustomControlOutput(`touch`,()=>e.state().markAsTouched()),e.registerAsBinding(n.customControl);let t=wt();return()=>{let i=e.state(),r=i.controlValue();J(t,`controlValue`,r)&&n.setCustomControlModelInput(r);for(let o of On){let a;if(o===`errors`?a=e.errors():a=Rn(i,o),J(t,o,a)&&(n.setInputOnDirectives(o,a),e.elementAcceptsNativeProperty(o)&&!n.customControlHasInput(o))){let s=lr(o,a,e.nativeFormElement.type);Le(e.renderer,e.nativeFormElement,o,s)}}}}function Qo(n){return typeof n==`object`&&n!==null}function Zo(n,e){let t=wt();e.controlValueAccessor.registerOnChange(r=>{t.controlValue=r,e.state().controlValue.set(r)}),e.controlValueAccessor.registerOnTouched(()=>e.state().markAsTouched());let i=e.injector.get(ae,null,{optional:!0,self:!0});if(i){let r;for(let u of i)Qo(u)&&u.registerOnValidatorChange&&(r??=ze$1(0),u.registerOnValidatorChange(()=>{r.update(h=>h+1)}));let o=i.map(u=>typeof u==`function`?u:u.validate.bind(u)),a=he.compose(o),s=Nt$1(()=>{r?.();return tr(a?a(e.interopNgControl.control):null,e.interopNgControl.control)});e.parseErrorsSource.set(s)}return e.registerAsBinding({reset:()=>{let r=e.state().value();t.controlValue=r,he$1(()=>e.controlValueAccessor.writeValue(r))}}),()=>{let r=e.state(),o=r.controlValue();J(t,`controlValue`,o)&&he$1(()=>e.controlValueAccessor.writeValue(o));for(let a of On){let s=Rn(r,a);if(J(t,a,s)){let u=n.setInputOnDirectives(a,s,a===`name`?Jo:void 0);a===`disabled`&&e.controlValueAccessor.setDisabledState?he$1(()=>e.controlValueAccessor.setDisabledState(s)):!u&&e.elementAcceptsNativeProperty(a)&&Le(e.renderer,e.nativeFormElement,a,s)}}}}function Jo(n){return n==null}function ea(n,e,t){if(typeof MutationObserver!=`function`)return;let i=new MutationObserver(r=>{r.some(o=>ta(o))&&e()});i.observe(n,{attributes:!0,attributeFilter:[`value`],characterData:!0,childList:!0,subtree:!0}),t.onDestroy(()=>i.disconnect())}function ta(n){if(n.type===`childList`||n.type===`characterData`){if(n.target instanceof Comment)return!1;for(let e of n.addedNodes)if(!(e instanceof Comment))return!0;for(let e of n.removedNodes)if(!(e instanceof Comment))return!0;return!1}return n.type===`attributes`&&n.target instanceof HTMLOptionElement}function na(n,e,t,i){let r=!1,o=e.nativeFormElement,a=qo(()=>e.state().value(),F=>e.state().controlValue.set(F),F=>Wo(o,e.state().value,i));t.set(a.errors),e.onReset=()=>{a.reset();let F=e.state().value();C.controlValue=F,ir(o,F)};let s=n.nativeElement,u=()=>a.setRawValue(void 0);s.addEventListener(`input`,u);let h=()=>e.state().markAsTouched();s.addEventListener(`blur`,h),e.destroyRef.onDestroy(()=>{s.removeEventListener(`input`,u),s.removeEventListener(`blur`,h)}),ar(o)&&Ko(o)&&i.watchValidity(e.destroyRef,o,()=>a.setRawValue(void 0)),e.registerAsBinding(),o.tagName===`SELECT`&&ea(o,()=>{r&&(o.value=e.state().controlValue())},e.destroyRef);let C=wt();return()=>{let F=e.state();for(let L of On){let we=Rn(F,L);if(J(C,L,we)&&(n.setInputOnDirectives(L,we),e.elementAcceptsNativeProperty(L))){let Et=lr(L,we,o.type);Le(e.renderer,o,L,Et)}}let ee=F.controlValue(),Ne=J(C,`controlValue`,ee),Me=o.type===`radio`&&J(C,`radioValue`,o.value);(Ne||Me)&&ir(o,ee),r=!0}}var sr=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵprov=fe$1({token:n,factory:t=>ia.ɵfac(t),providedIn:`root`})}return n})();var ia=(()=>{class n extends sr{document=E(tn$1);cspNonce=E(qE,{optional:!0});injectedStyles=new WeakMap;watchValidity(t,i,r){let o=i.getRootNode();this.injectedStyles.has(o)||this.injectedStyles.set(o,this.createTransitionStyle(o));let a=s=>{let u=s;(u.animationName===`ng-valid`||u.animationName===`ng-invalid`)&&r()};i.addEventListener(`animationstart`,a),t.onDestroy(()=>{i.removeEventListener(`animationstart`,a)})}isBadInput(t){return t.validity?.badInput??!1}createTransitionStyle(t){let i=this.document.createElement(`style`);return this.cspNonce&&(i.nonce=this.cspNonce),i.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,t.nodeType===9?t.head?.appendChild(i):t.appendChild(i),i}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove()}static ɵfac=(()=>{let t;return function(r){return(t||(t=bI(n)))(r||n)}})();static ɵprov=fe$1({token:n,factory:n.ɵfac})}return n})();var ra=Symbol();var or=new S(``);var vl=(()=>{class n{field=fH.required({alias:`formField`});state=Nt$1(()=>this.field()());renderer=E(zc);destroyRef=E(we);injector=E(ce);element=E(no$1).nativeElement;elementIsNativeFormElement=Jt(this.element);elementAcceptsTextualValues=Ri(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=t=>this.element.focus(t);controlValueAccessors=E(Pe,{optional:!0,self:!0});config=E(jo,{optional:!0});validityMonitor=E(sr);parseErrorsSource=ze$1(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new Fn(this.state)}parseErrors=Nt$1(()=>this.parseErrorsSource()?.().map(t=>s(r({},t),{fieldTree:he$1(this.state).fieldTree,formField:this}))??[],{equal:T});errors=Nt$1(()=>this.state().errors().filter(t=>!t.formField||t.formField===this),{equal:T});isFieldBinding=!1;resetter=()=>{};parseErrorsResetCallback;setParseErrors(t){this.parseErrorsSource.set(t)}set onReset(t){this.parseErrorsResetCallback=t}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return!this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:rn(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let t=Object.entries(this.config?.classes??{}).map(([r,o])=>[r,Nt$1(()=>o(this))]);if(t.length===0)return;let i=wt();wH({write:()=>{if(!this.state().structure.isOrphaned())for(let[r,o]of t){let a=o();J(i,r,a)&&(a?this.renderer.addClass(this.element,r):this.renderer.removeClass(this.element,r))}}},{injector:this.injector})}focus(t){this.focuser(t)}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value())}registerAsBinding(t){if(this.isFieldBinding)throw new T$1(1913,!1);this.isFieldBinding=!0,this.installClassBindingEffect(),t?.focus&&(this.focuser=i=>t.focus(i)),t?.reset&&(this.resetter=()=>t.reset()),fc(i=>{let r=this.state();r.nodeState.formFieldBindings.update(o=>[...o,this]),i(()=>{let o=r.nodeState.formFieldBindings().filter(a=>a!==this);r.nodeState.formFieldBindings.set(o),o.length===0&&!r.structure.isOrphaned()&&r.flushSync()})},{injector:this.injector})}[ra];ɵngControlCreate(t){if(!t.hasPassThrough)if(this.controlValueAccessor)this.ɵngControlUpdate=Zo(t,this);else if(t.customControl)this.ɵngControlUpdate=Xo(t,this);else if(this.elementIsNativeFormElement)this.ɵngControlUpdate=na(t,this,this.parseErrorsSource,this.validityMonitor);else throw new T$1(1914,!1)}ɵngControlUpdate;elementAcceptsNativeProperty(t){if(!this.elementIsNativeFormElement)return!1;switch(t){case`min`:case`max`:return this._elementAcceptsMinMax??=Ii(this.element);case`minLength`:case`maxLength`:return this.elementAcceptsTextualValues;case`disabled`:case`required`:case`readonly`:case`name`:return!0;default:return!1}}static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[``,`formField`,``]],inputs:{field:[1,`formField`,`field`]},exportAs:[`formField`],features:[C_([{provide:or,useExisting:n},{provide:Q,useFactory:()=>E(n).interopNgControl},{provide:en,useFactory:()=>E(or,{self:!0})}]),bC(`formField`)]})}return n})();var yl=(()=>{class n{fieldTree=fH.required({alias:`formRoot`});onSubmit(t){t.preventDefault(),he$1(()=>{let i=this.fieldTree();i().structure.fieldManager.submitOptions&&Ji(i)})}static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[`form`,`formRoot`,``]],hostAttrs:[`novalidate`,``],hostBindings:function(i,r){i&1&&ny(`submit`,function(a){return r.onSubmit(a)})},inputs:{fieldTree:[1,`formRoot`,`fieldTree`]}})}return n})();var Tn=class{_box;_destroyed=new oe$1;_resizeSubject=new oe$1;_resizeObserver;_elementObservables=new Map;constructor(e){this._box=e,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(e){return this._elementObservables.has(e)||this._elementObservables.set(e,new x(t=>{let i=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(e,{box:this._box}),()=>{this._resizeObserver?.unobserve(e),i.unsubscribe(),this._elementObservables.delete(e)}}).pipe(Cn$1(t=>t.some(i=>i.target===e)),Dd({bufferSize:1,refCount:!0}),rE(this._destroyed))),this._elementObservables.get(e)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var dr=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=E(Ce$1);constructor(){}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,i){let r=i?.box||`content-box`;return this._observers.has(r)||this._observers.set(r,new Tn(r)),this._observers.get(r).observe(t)}static ɵfac=function(i){return new(i||n)};static ɵprov=to$1({token:n,factory:n.ɵfac})}return n})();var cr=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[`mat-label`]]})}return n})();var yr=new S(`MatError`);var Kl=(()=>{class n{id=E(me$1).getId(`mat-mdc-error-`);static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[`mat-error`],[``,`matError`,``]],hostAttrs:[1,`mat-mdc-form-field-error`,`mat-mdc-form-field-bottom-align`],hostVars:1,hostBindings:function(i,r){i&2&&ey(`id`,r.id)},inputs:{id:`id`},features:[C_([{provide:yr,useExisting:n}])]})}return n})();var ur=(()=>{class n{align=`start`;id=E(me$1).getId(`mat-mdc-hint-`);static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(i,r){i&2&&(ey(`id`,r.id),qm(`align`,null),fy(`mat-mdc-form-field-hint-end`,r.align===`end`))},inputs:{align:`align`,id:`id`}})}return n})();var oa=new S(`MatPrefix`);var aa=new S(`MatSuffix`);var br=new S(`FloatingLabelParent`);var fr=(()=>{class n{_elementRef=E(no$1);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=E(dr);_ngZone=E(Ce$1);_parent=E(br);_resizeSubscription=new te;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return la(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(i,r){i&2&&fy(`mdc-floating-label--float-above`,r.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return n})();function la(n){let e=n;if(e.offsetParent!==null)return e.scrollWidth;let t=e.cloneNode(!0);t.style.setProperty(`position`,`absolute`),t.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(t);let i=t.scrollWidth;return t.remove(),i}var mr=`mdc-line-ripple--active`;var Dt=`mdc-line-ripple--deactivating`;var hr=(()=>{class n{_elementRef=E(no$1);_cleanupTransitionEnd;constructor(){let t=E(Ce$1),i=E(zc);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let t=this._elementRef.nativeElement.classList;t.remove(Dt),t.add(mr)}deactivate(){this._elementRef.nativeElement.classList.add(Dt)}_handleTransitionEnd=t=>{let i=this._elementRef.nativeElement.classList,r=i.contains(Dt);t.propertyName===`opacity`&&r&&i.remove(mr,Dt)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return n})();var pr=(()=>{class n{_elementRef=E(no$1);_ngZone=E(Ce$1);open=!1;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,i=t.querySelector(`.mdc-floating-label`);i?(t.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(i.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration=``)}))):t.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(t){let i=this._notch.nativeElement;!this.open||!t?i.style.width=``:i.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(t){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${t}px)`)}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){let t=[`notch`];return mC({type:n,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(o,a){if(o&1&&sy(t,5),o&2){let s;Bb(s=Ub())&&(a._notch=s.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(o,a){o&2&&fy(`mdc-notched-outline--notched`,a.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:[`*`],decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(o,a){o&1&&(jb(),Ym(0,`div`,1),hu(1,`div`,2,0),Vb(3),gu(),Ym(4,`div`,3))},encapsulation:2})})()}return n})();var sa=(()=>{class n{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static ɵfac=function(i){return new(i||n)};static ɵdir=DC({type:n})}return n})();var da=new S(`MatFormField`);var ca=new S(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var gr=`fill`;var ua=`auto`;var vr=`fixed`;var fa=`translateY(-50%)`;var Yl=(()=>{class n{_elementRef=E(no$1);_changeDetectorRef=E(EH);_platform=E(h);_idGenerator=E(me$1);_ngZone=E(Ce$1);_defaults=E(ca,{optional:!0});_currentDirection;_unwrapMaybeSignal(t){return Lr$1(t)?t():t}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=hH(`iconPrefixContainer`);_textPrefixContainerSignal=hH(`textPrefixContainer`);_iconSuffixContainerSignal=hH(`iconSuffixContainer`);_textSuffixContainerSignal=hH(`textSuffixContainer`);_prefixSuffixContainers=Nt$1(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=gH(cr);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=Vs(t)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||ua}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let i=t||this._defaults?.appearance||gr;this._appearanceSignal.set(i)}_appearanceSignal=ze$1(gr);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||vr}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||vr}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t}_destroyed=new oe$1;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=qs();constructor(){let t=this._defaults,i=E(T$2);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),fc(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=Ue(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!Ue(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Nt$1(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(t){let i=this._control,r=`mat-mdc-form-field-type-`;t&&this._elementRef.nativeElement.classList.remove(r+t.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges?.pipe(wd([void 0,void 0]),Ve$1(()=>[this._unwrapMaybeSignal(i.errorState),i.userAriaDescribedBy]),tE(),Cn$1(([[o,a],[s,u]])=>o!==s||a!==u)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&!Ue(i.ngField)&&(this._valueChanges=i.ngControl.valueChanges.pipe(rE(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Qv(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let t=this._unwrapMaybeSignal(this._control.focused);t&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,t),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,t)}_syncOutlineLabelOffset(){wH({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Nt$1(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(t){let i=this._control?.ngField||this._control?.ngControl;if(!i)return!1;if(Ue(i)){let r=i();return t===`valid`?r.valid():t===`dirty`?r.dirty():t===`touched`?r.touched():t===`pending`?r.pending():t===`untouched`?!r.touched():t===`pristine`?!r.dirty():t===`invalid`?!r.valid():!1}else{let r=i;return t===`valid`?r.valid:t===`dirty`?r.dirty:t===`touched`?r.touched:t===`pending`?r.pending:t===`untouched`?r.untouched:t===`pristine`?r.pristine:t===`invalid`?r.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&t.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let o=this._hintChildren?this._hintChildren.find(s=>s.align===`start`):null,a=this._hintChildren?this._hintChildren.find(s=>s.align===`end`):null;o?t.push(o.id):this._hintLabel&&t.push(this._hintLabelId),a&&t.push(a.id)}else this._errorChildren&&t.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||t;r=t.concat(i.filter(a=>a&&!o.includes(a)))}else r=t;this._control.setDescribedByIds(r),this._describedByIds=t}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=t?.getBoundingClientRect().width??0,s=i?.getBoundingClientRect().width??0,u=r?.getBoundingClientRect().width??0,h=o?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${fa} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${a+s}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,a+s+u+h]}_writeOutlinedLabelStyles(t){if(t!==null){let[i,r]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let i=t.getRootNode();return i&&i!==t}return document.documentElement.contains(t)}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){let t=[`iconPrefixContainer`],i=[`textPrefixContainer`],r=[`iconSuffixContainer`],o=[`textSuffixContainer`],a=[`textField`],s=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]],u=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function h(f,p){f&1&&Qm(0,`span`,21)}function C(f,p){if(f&1&&(ds(0,`label`,20),Vb(1,1),mb(2,h,1,0,`span`,21),pu()),f&2){let l=Pb(2);zm(`floating`,l._shouldLabelFloat())(`monitorResize`,l._hasOutline())(`id`,l._labelId),qm(`for`,l._control.disableAutomaticLabeling?null:l._control.id),ST(2),vb(!l.hideRequiredMarker&&l._unwrapMaybeSignal(l._control.required)?2:-1)}}function F(f,p){if(f&1&&mb(0,C,3,5,`label`,20),f&2){let l=Pb();vb(l._hasFloatingLabel()?0:-1)}}function ee(f,p){f&1&&Qm(0,`div`,7)}function Ne(f,p){}function Me(f,p){if(f&1&&Lm(0,Ne,0,0,`ng-template`,13),f&2){Pb(2);let l=Wb(1);zm(`ngTemplateOutlet`,l)}}function L(f,p){if(f&1&&(ds(0,`div`,9),mb(1,Me,1,1,null,13),pu()),f&2){let l=Pb();zm(`matFormFieldNotchedOutlineOpen`,l._shouldLabelFloat()),ST(),vb(l._forceDisplayInfixLabel()?-1:1)}}function we(f,p){f&1&&(ds(0,`div`,10,2),Vb(2,2),pu())}function Et(f,p){f&1&&(ds(0,`div`,11,3),Vb(2,3),pu())}function xr(f,p){}function Cr(f,p){if(f&1&&Lm(0,xr,0,0,`ng-template`,13),f&2){Pb();let l=Wb(1);zm(`ngTemplateOutlet`,l)}}function Sr(f,p){f&1&&(ds(0,`div`,14,4),Vb(2,4),pu())}function Nr(f,p){f&1&&(ds(0,`div`,15,5),Vb(2,5),pu())}function Mr(f,p){f&1&&Qm(0,`div`,16)}function wr(f,p){f&1&&(ds(0,`div`,18),Vb(1,6),pu())}function Dr(f,p){if(f&1&&(ds(0,`mat-hint`,22),f_(1),pu()),f&2){let l=Pb(2);zm(`id`,l._hintLabelId),ST(),Iy(l.hintLabel)}}function Er(f,p){if(f&1&&(ds(0,`div`,19),mb(1,Dr,2,2,`mat-hint`,22),Vb(2,7),Qm(3,`div`,23),Vb(4,8),pu()),f&2){let l=Pb();ST(),vb(l.hintLabel?1:-1)}}return mC({type:n,selectors:[[`mat-form-field`]],contentQueries:function(p,l,g){if(p&1&&(ay(g,l._labelChild,cr,5),iy(g,sa,5)(g,oa,5)(g,aa,5)(g,yr,5)(g,ur,5)),p&2){$b();let M;Bb(M=Ub())&&(l._formFieldControl=M.first),Bb(M=Ub())&&(l._prefixChildren=M),Bb(M=Ub())&&(l._suffixChildren=M),Bb(M=Ub())&&(l._errorChildren=M),Bb(M=Ub())&&(l._hintChildren=M)}},viewQuery:function(p,l){if(p&1&&(cy(l._iconPrefixContainerSignal,t,5)(l._textPrefixContainerSignal,i,5)(l._iconSuffixContainerSignal,r,5)(l._textSuffixContainerSignal,o,5),sy(a,5)(t,5)(i,5)(r,5)(o,5)(fr,5)(pr,5)(hr,5)),p&2){$b(4);let g;Bb(g=Ub())&&(l._textField=g.first),Bb(g=Ub())&&(l._iconPrefixContainer=g.first),Bb(g=Ub())&&(l._textPrefixContainer=g.first),Bb(g=Ub())&&(l._iconSuffixContainer=g.first),Bb(g=Ub())&&(l._textSuffixContainer=g.first),Bb(g=Ub())&&(l._floatingLabel=g.first),Bb(g=Ub())&&(l._notchedOutline=g.first),Bb(g=Ub())&&(l._lineRipple=g.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(p,l){p&2&&fy(`mat-mdc-form-field-label-always-float`,l._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,l._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,l._hasIconSuffix)(`mat-form-field-invalid`,l._unwrapMaybeSignal(l._control.errorState))(`mat-form-field-disabled`,l._unwrapMaybeSignal(l._control.disabled))(`mat-form-field-autofilled`,l._unwrapMaybeSignal(l._control.autofilled))(`mat-form-field-appearance-fill`,l.appearance==`fill`)(`mat-form-field-appearance-outline`,l.appearance==`outline`)(`mat-form-field-hide-placeholder`,l._hasFloatingLabel()&&!l._shouldLabelFloat())(`mat-primary`,l.color!==`accent`&&l.color!==`warn`)(`mat-accent`,l.color===`accent`)(`mat-warn`,l.color===`warn`)(`ng-untouched`,l._shouldForward(`untouched`))(`ng-touched`,l._shouldForward(`touched`))(`ng-pristine`,l._shouldForward(`pristine`))(`ng-dirty`,l._shouldForward(`dirty`))(`ng-valid`,l._shouldForward(`valid`))(`ng-invalid`,l._shouldForward(`invalid`))(`ng-pending`,l._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[C_([{provide:da,useExisting:n},{provide:br,useExisting:n}])],ngContentSelectors:u,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(p,l){if(p&1&&(jb(s),Lm(0,F,1,1,`ng-template`,null,0,P_),ds(2,`div`,6,1),ny(`click`,function(M){return l._control.onContainerClick(M)}),mb(4,ee,1,0,`div`,7),ds(5,`div`,8),mb(6,L,2,2,`div`,9),mb(7,we,3,0,`div`,10),mb(8,Et,3,0,`div`,11),ds(9,`div`,12),mb(10,Cr,1,1,null,13),Vb(11),pu(),mb(12,Sr,3,0,`div`,14),mb(13,Nr,3,0,`div`,15),pu(),mb(14,Mr,1,0,`div`,16),pu(),ds(15,`div`,17),mb(16,wr,2,0,`div`,18)(17,Er,5,1,`div`,19),pu()),p&2){let g,M=l._unwrapMaybeSignal(l._control.disabled);ST(2),fy(`mdc-text-field--filled`,!l._hasOutline())(`mdc-text-field--outlined`,l._hasOutline())(`mdc-text-field--no-label`,!l._hasFloatingLabel())(`mdc-text-field--disabled`,M)(`mdc-text-field--invalid`,l._unwrapMaybeSignal(l._control.errorState)),ST(2),vb(!l._hasOutline()&&!M?4:-1),ST(2),vb(l._hasOutline()?6:-1),ST(),vb(l._hasIconPrefix?7:-1),ST(),vb(l._hasTextPrefix?8:-1),ST(2),vb(!l._hasOutline()||l._forceDisplayInfixLabel()?10:-1),ST(2),vb(l._hasTextSuffix?12:-1),ST(),vb(l._hasIconSuffix?13:-1),ST(),vb(l._hasOutline()?-1:14),ST(),fy(`mat-mdc-form-field-subscript-dynamic-size`,l.subscriptSizing===`dynamic`);let Fr=l._getSubscriptMessageType();ST(),vb((g=Fr)===`error`?16:g===`hint`?17:-1)}},dependencies:[fr,pr,Zn,hr,ur],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {
  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));
  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));
}

.mdc-line-ripple--%NS%active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--%NS%deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --%NS%mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--%NS%mat-form-field-container-height, 56px);
  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--%NS%mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--%NS%mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));
  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));
  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})})()}return n})();var Ql=(()=>{class n{isErrorState(t,i){return!!(t&&t.invalid&&(t.touched||i&&i.submitted))}isSignalErrorState(t){if(!t)return!1;let i=t().invalid(),r=t().touched();return i&&r}static ɵfac=function(i){return new(i||n)};static ɵprov=to$1({token:n,factory:n.ɵfac})}return n})();var _r=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(e,t,i,r,o){this._defaultMatcher=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o,t?Lr$1(t.field)&&!t.updateValueAndValidity?(this.formField=t,this.ngControl=null):(this.formField=null,this.ngControl=t):this.ngControl=this.formField=null}updateErrorState(){let e=this.errorState,t=this._getCurrentErrorState(this.matcher||this._defaultMatcher);t!==e&&(this.errorState=t,this._stateChanges.next())}_getCurrentErrorState(e){if(this.formField&&e?.isSignalErrorState)return e.isSignalErrorState(this.formField.field())??!1;let t=this._parentFormGroup||this._parentForm,i=this.ngControl?this.ngControl.control:null;return e?.isErrorState(i,t)??!1}};export{sa as C,vl as D,vi as E,yl as O,po as S,ur as T,ko as _,Q as a,or as b,Yl as c,ao as d,cr as f,hl as g,he as h,Pe as i,_r as l,gl as m,Kl as n,Ql as o,da as p,Oa as r,Wr as s,Ia as t,ae as u,ml as v,uo as w,pl as x,mo as y};