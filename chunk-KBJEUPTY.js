import{C as N,E as D,F as B,W as L,X as P,_ as V,d as c,da as z,f as y,g as u,h as b,k as F,l as H,pa as O,qa as j}from"./chunk-HVEPLDJT.js";import{Ac as v,Ca as _,Da as I,Eb as k,Ec as S,Hb as w,Ub as T,Vb as g,_ as E,ba as m,ea as s,f as d,fb as C,gb as f,i as x,la as M,ob as A,oc as R,qb as p,ya as h}from"./chunk-T2HLDYJB.js";var G=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275cmp=A({type:r,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:["textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}"],encapsulation:2,changeDetection:0})}return r})(),$={passive:!0},q=(()=>{class r{_platform=s(u);_ngZone=s(h);_renderer=s(C).createRenderer(null,null);_styleLoader=s(H);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return x;this._styleLoader.load(G);let t=y(e),i=this._monitoredElements.get(t);if(i)return i.subject;let n=new d,a="cdk-text-field-autofilled",o=l=>{l.animationName==="cdk-text-field-autofill-start"&&!t.classList.contains(a)?(t.classList.add(a),this._ngZone.run(()=>n.next({target:l.target,isAutofilled:!0}))):l.animationName==="cdk-text-field-autofill-end"&&t.classList.contains(a)&&(t.classList.remove(a),this._ngZone.run(()=>n.next({target:l.target,isAutofilled:!1})))},W=this._ngZone.runOutsideAngular(()=>(t.classList.add("cdk-text-field-autofill-monitored"),F(this._renderer,t,"animationstart",o,$)));return this._monitoredElements.set(t,{subject:n,unlisten:W}),n}stopMonitoring(e){let t=y(e),i=this._monitoredElements.get(t);i&&(i.unlisten(),i.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}static \u0275fac=function(t){return new(t||r)};static \u0275prov=E({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();var Y=new m("MAT_INPUT_VALUE_ACCESSOR"),X=["button","checkbox","file","hidden","image","radio","range","reset","submit"],J=new m("MAT_INPUT_CONFIG"),Re=(()=>{class r{_elementRef=s(_);_platform=s(u);ngControl=s(P,{optional:!0,self:!0});_autofillMonitor=s(q);_ngZone=s(h);_formField=s(j,{optional:!0});_renderer=s(f);_uid=s(N).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder;_errorStateTracker;_config=s(J,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_formFieldDescribedBy;_isServer;_isNativeSelect;_isTextarea;_isInFormField;focused=!1;stateChanges=new d;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=c(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(L.required)??!1}set required(e){this._required=c(e)}_required;get type(){return this._type}set type(e){let t=this._type;this._type=e||"text",this._validateType(),!this._isTextarea&&b().has(this._type)&&(this._elementRef.nativeElement.type=this._type),this._type!==t&&this._ensureWheelDefaultBehavior()}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=c(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>b().has(e));constructor(){let e=s(V,{optional:!0}),t=s(z,{optional:!0}),i=s(B),n=s(Y,{optional:!0,self:!0}),a=this._elementRef.nativeElement,o=a.nodeName.toLowerCase();n?I(n.value)?this._signalBasedValueAccessor=n:this._inputValueAccessor=n:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new D(i,this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=o==="select",this._isTextarea=o==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&S(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let t=this._elementRef.nativeElement;t.type==="number"?(t.type="text",t.setSelectionRange(0,0),t.type="number"):t.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute("placeholder",e):t.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){X.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused&&!this.disabled||!this.empty}setDescribedByIds(e){let t=this._elementRef.nativeElement,i=t.getAttribute("aria-describedby"),n;if(i){let a=this._formFieldDescribedBy||e;n=e.concat(i.split(" ").filter(o=>o&&!a.includes(o)))}else n=e;this._formFieldDescribedBy=e,n.length?t.setAttribute("aria-describedby",n.join(" ")):t.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let t=e.target;!t.value&&t.selectionStart===0&&t.selectionEnd===0&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0))};_webkitBlinkWheelListener=()=>{};_ensureWheelDefaultBehavior(){this._cleanupWebkitWheel?.(),this._type==="number"&&(this._platform.BLINK||this._platform.WEBKIT)&&(this._cleanupWebkitWheel=this._renderer.listen(this._elementRef.nativeElement,"wheel",this._webkitBlinkWheelListener))}_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(t){return new(t||r)};static \u0275dir=p({type:r,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(t,i){t&1&&g("focus",function(){return i._focusChanged(!0)})("blur",function(){return i._focusChanged(!1)})("input",function(){return i._onInput()}),t&2&&(T("id",i.id)("disabled",i.disabled&&!i.disabledInteractive)("required",i.required),k("name",i.name||null)("readonly",i._getReadonlyAttribute())("aria-disabled",i.disabled&&i.disabledInteractive?"true":null)("aria-invalid",i.empty&&i.required?null:i.errorState)("aria-required",i.required)("id",i.id),w("mat-input-server",i._isServer)("mat-mdc-form-field-textarea-control",i._isInFormField&&i._isTextarea)("mat-mdc-form-field-input-control",i._isInFormField)("mat-mdc-input-disabled-interactive",i.disabledInteractive)("mdc-text-field__input",i._isInFormField)("mat-mdc-native-select-inline",i._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",v]},exportAs:["matInput"],features:[R([{provide:O,useExisting:r}]),M]})}return r})();export{Re as a};
