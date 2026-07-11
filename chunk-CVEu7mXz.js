import {T,c3 as Ad,aG as ae,ax as ld,aM as x,aL as He$1,w,aR as Jr,bo as fr,bp as mn,ay as gg,aQ as ig,bm as pn,b9 as ku,aU as dl,ba as yr,aA as vr,aC as O,c4 as Ue$1,aB as Ne,c5 as lu,aK as Gv,b7 as Re,aP as ee,aN as wa,bR as vr$1,c6 as C_,c7 as qc,bZ as od,c8 as Gv$1,c9 as or,ca as Za,e as ta,aX as GI,bE as lm,bF as tF,bG as dD,cb as au,F as Rp,bx as xp,a0 as Cp,$ as $p,B as BI,ak as zv,i as fi,a3 as tD,N as Nc,p as pE,k as cv,a7 as kc,q as hE,bK as wi,b1 as XL,aJ as nr,aV as jy,O as Oh,bv as _y,bw as yp,I as Ip,j as _p,L as Lp,H as xE,U as AE,cc as pr,bz as he,cd as mt,ce as fe,ad as TE,a6 as bE,aq as yu,ar as vu}from'./main-Q6CGMMBB.js';function Oe(n,h){if(n&1){let e=TE();fi(0,"div",1)(1,"button",2),Rp("click",function(){yu(e);let i=bE();return vu(i.action())}),tD(2),Nc()();}if(n&2){let e=bE();cv(2),kc(" ",e.data.action," ");}}var Le=["label"];function Ve(n,h){}var ze=Math.pow(2,31)-1,M=class{_overlayRef;instance;containerInstance;_afterDismissed=new ee;_afterOpened=new ee;_onAction=new ee;_durationTimeoutId;_dismissedByAction=false;constructor(h,e){this._overlayRef=e,this.containerInstance=h,h._onExit.subscribe(()=>this._finishDismiss());}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId);}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=true,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId);}closeWithAction(){this.dismissWithAction();}_dismissAfter(h){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(h,ze));}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete());}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=false;}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},Fe=new x("MatSnackBarData"),b=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},je=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=GI({type:n,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return n})(),qe=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=GI({type:n,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return n})(),Ze=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=GI({type:n,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return n})(),Ue=(()=>{class n{snackBarRef=T(M);data=T(Fe);action(){this.snackBarRef.dismissWithAction();}get hasAction(){return !!this.data.action}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=BI({type:n,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(t,i){t&1&&(fi(0,"div",0),tD(1),Nc(),pE(2,Oe,3,1,"div",1)),t&2&&(cv(),kc(" ",i.data.message,`
`),cv(),hE(i.hasAction?2:-1));},dependencies:[zv,je,qe,Ze],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})}return n})(),U="_mat-snack-bar-enter",G="_mat-snack-bar-exit",Ge=(()=>{class n extends wi{_ngZone=T(Ne);_elementRef=T(vr);_changeDetectorRef=T(XL);_platform=T(O);_animationsDisabled=He$1();snackBarConfig=T(b);_document=T(nr);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=T(ae);_announceDelay=150;_announceTimeoutId;_destroyed=false;_portalOutlet;_onAnnounce=new ee;_onExit=new ee;_onEnter=new ee;_animationState="void";_live;_label;_role;_liveElementId=T(Re).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"));}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}attachDomPortal=e=>{this._assertNotAttached();let t=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),t};onAnimationEnd(e){e===G?this._completeExit():e===U&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete();}));}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?jy(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(U)));},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(U);},200)));}exit(){return this._destroyed?Oh(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?jy(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(G)));},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(G),200));}),this._onExit)}ngOnDestroy(){this._destroyed=true,this._clearFromModals(),this._completeExit();}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete();});}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(r=>e.classList.add(r)):e.classList.add(t)),this._exposeToModals();let i=this._label.nativeElement,a="mdc-snackbar__label";i.classList.toggle(a,!i.querySelector(`.${a}`));}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let i=0;i<t.length;i++){let a=t[i],r=a.getAttribute("aria-owns");this._trackedModals.add(a),r?r.indexOf(e)===-1&&a.setAttribute("aria-owns",r+" "+e):a.setAttribute("aria-owns",e);}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute("aria-owns");if(t){let i=t.replace(this._liveElementId,"").trim();i.length>0?e.setAttribute("aria-owns",i):e.removeAttribute("aria-owns");}}),this._trackedModals.clear();}_assertNotAttached(){this._portalOutlet.hasAttached();}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,t=e.querySelector("[aria-hidden]"),i=e.querySelector("[aria-live]");if(t&&i){let a=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(a=document.activeElement),t.removeAttribute("aria-hidden"),i.appendChild(t),a?.focus(),this._onAnnounce.next(),this._onAnnounce.complete();}},this._announceDelay);});}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=BI({type:n,selectors:[["mat-snack-bar-container"]],viewQuery:function(t,i){if(t&1&&Lp(_y,7)(Le,7),t&2){let a;xE(a=AE())&&(i._portalOutlet=a.first),xE(a=AE())&&(i._label=a.first);}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(t,i){t&1&&Rp("animationend",function(r){return i.onAnimationEnd(r.animationName)})("animationcancel",function(r){return i.onAnimationEnd(r.animationName)}),t&2&&$p("mat-snack-bar-container-enter",i._animationState==="visible")("mat-snack-bar-container-exit",i._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!i._animationsDisabled);},features:[yp],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(t,i){t&1&&(fi(0,"div",1)(1,"div",2,0)(3,"div",3),Ip(4,Ve,0,0,"ng-template",4),Nc(),_p(5,"div"),Nc()()),t&2&&(cv(5),Cp("aria-live",i._live)("role",i._role)("id",i._liveElementId));},dependencies:[_y],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2,changeDetection:1})}return n})(),Ke=new x("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new b}),bt=(()=>{class n{_live=T(Ad);_injector=T(ae);_breakpointObserver=T(ld);_parentSnackBar=T(n,{optional:true,skipSelf:true});_defaultConfig=T(Ke);_animationsDisabled=He$1();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=Ue;snackBarContainerComponent=Ge;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e;}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t="",i){let a=w(w({},this._defaultConfig),i);return a.data={message:e,action:t},a.announcementMessage===e&&(a.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,a)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss();}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss();}_attachSnackBarContainer(e,t){let i=t&&t.viewContainerRef&&t.viewContainerRef.injector,a=ae.create({parent:i||this._injector,providers:[{provide:b,useValue:t}]}),r=new Jr(this.snackBarContainerComponent,t.viewContainerRef,a),o=e.attach(r);return o.instance.snackBarConfig=t,o.instance}_attach(e,t){let i=w(w(w({},new b),this._defaultConfig),t),a=this._createOverlay(i),r=this._attachSnackBarContainer(a,i),o=new M(r,a);if(e instanceof fr){let c=new mn(e,null,{$implicit:i.data,snackBarRef:o});o.instance=r.attachTemplatePortal(c);}else {let c=this._createInjector(i,o),u=new Jr(e,void 0,c),Ne=r.attachComponentPortal(u);o.instance=Ne.instance;}return this._breakpointObserver.observe(gg.HandsetPortrait).pipe(ig(a.detachments())).subscribe(c=>{a.overlayElement.classList.toggle(this.handsetCssClass,c.matches);}),i.announcementMessage&&r._onAnnounce.subscribe(()=>{this._live.announce(i.announcementMessage,i.politeness);}),this._animateSnackBar(o,i),this._openedSnackBarRef=o,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear();}),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter();}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter();}_createOverlay(e){let t=new pn;t.direction=e.direction;let i=ku(this._injector),a=e.direction==="rtl",r=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!a||e.horizontalPosition==="end"&&a,o=!r&&e.horizontalPosition!=="center";return r?i.left("0"):o?i.right("0"):i.centerHorizontally(),e.verticalPosition==="top"?i.top("0"):i.bottom("0"),t.positionStrategy=i,t.disableAnimations=this._animationsDisabled,dl(this._injector,t)}_createInjector(e,t){let i=e&&e.viewContainerRef&&e.viewContainerRef.injector;return ae.create({parent:i||this._injector,providers:[{provide:M,useValue:t},{provide:Fe,useValue:e.data}]})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=yr({token:n,factory:n.\u0275fac})}return n})();var We=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=BI({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return n})(),$e={passive:true},Pe=(()=>{class n{_platform=T(O);_ngZone=T(Ne);_renderer=T(pr).createRenderer(null,null);_styleLoader=T(he);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return mt;this._styleLoader.load(We);let t=fe(e),i=this._monitoredElements.get(t);if(i)return i.subject;let a=new ee,r="cdk-text-field-autofilled",o=u=>{u.animationName==="cdk-text-field-autofill-start"&&!t.classList.contains(r)?(t.classList.add(r),this._ngZone.run(()=>a.next({target:u.target,isAutofilled:true}))):u.animationName==="cdk-text-field-autofill-end"&&t.classList.contains(r)&&(t.classList.remove(r),this._ngZone.run(()=>a.next({target:u.target,isAutofilled:false})));},c=this._ngZone.runOutsideAngular(()=>(t.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(t,"animationstart",o,$e)));return this._monitoredElements.set(t,{subject:a,unlisten:c}),a}stopMonitoring(e){let t=fe(e),i=this._monitoredElements.get(t);i&&(i.unlisten(),i.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t));}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t));}static \u0275fac=function(t){return new(t||n)};static \u0275prov=yr({token:n,factory:n.\u0275fac})}return n})();var He=new x("MAT_INPUT_VALUE_ACCESSOR");var Qe=["button","checkbox","file","hidden","image","radio","range","reset","submit"],Xe=new x("MAT_INPUT_CONFIG"),Jt=(()=>{class n{_elementRef=T(vr);_platform=T(O);ngControl=T(Ue$1,{optional:true,self:true});_autofillMonitor=T(Pe);_ngZone=T(Ne);_formField=T(lu,{optional:true});_renderer=T(Gv);_uid=T(Re).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=T(Xe,{optional:true});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=false;_isNativeSelect=false;_isTextarea=false;_isInFormField=false;focused=false;stateChanges=new ee;controlType="mat-input";autofilled=false;get disabled(){return this._disabled}set disabled(e){this._disabled=wa(e),this.focused&&(this.focused=false,this.stateChanges.next());}_disabled=false;get id(){return this._id}set id(e){this._id=e||this._uid;}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(vr$1.required)??false}set required(e){this._required=wa(e);}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&C_().has(this._type)&&(this._elementRef.nativeElement.type=this._type);}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next());}get readonly(){return this._readonly}set readonly(e){this._readonly=wa(e);}_readonly=false;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>C_().has(e));constructor(){let e=T(qc,{optional:true}),t=T(od,{optional:true}),i=T(Gv$1),a=T(He,{optional:true,self:true}),r=this._elementRef.nativeElement,o=r.nodeName.toLowerCase();a?or(a.value)?this._signalBasedValueAccessor=a:this._inputValueAccessor=a:this._inputValueAccessor=r,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(r,"keyup",this._iOSKeyupListener);}),this._errorStateTracker=new Za(i,this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=o==="select",this._isTextarea=o==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||false,this._isNativeSelect&&(this.controlType=r.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&ta(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next();});}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next();});}ngOnChanges(){this.stateChanges.next();}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.();}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder();}focus(e){this._elementRef.nativeElement.focus(e);}updateErrorState(){this._errorStateTracker.updateErrorState();}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let t=this._elementRef.nativeElement;t.type==="number"?(t.type="text",t.setSelectionRange(0,0),t.type="number"):t.setSelectionRange(0,0);}this.focused=e,this.stateChanges.next();}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next());}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute("placeholder",e):t.removeAttribute("placeholder");}}_getPlaceholder(){return this.placeholder||null}_validateType(){Qe.indexOf(this._type)>-1;}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return !this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby");}onContainerClick(){this.focused||this.focus();}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let t=e.target;!t.value&&t.selectionStart===0&&t.selectionEnd===0&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0));};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(t){return new(t||n)};static \u0275dir=GI({type:n,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(t,i){t&1&&Rp("focus",function(){return i._focusChanged(true)})("blur",function(){return i._focusChanged(false)})("input",function(){return i._onInput()}),t&2&&(xp("id",i.id)("disabled",i.disabled&&!i.disabledInteractive)("required",i.required),Cp("name",i.name||null)("readonly",i._getReadonlyAttribute())("aria-disabled",i.disabled&&i.disabledInteractive?"true":null)("aria-invalid",i.empty&&i.required?null:i.errorState)("aria-required",i.required)("id",i.id),$p("mat-input-server",i._isServer)("mat-mdc-form-field-textarea-control",i._isInFormField&&i._isTextarea)("mat-mdc-form-field-input-control",i._isInFormField)("mat-mdc-input-disabled-interactive",i.disabledInteractive)("mdc-text-field__input",i._isInFormField)("mat-mdc-native-select-inline",i._isInlineSelect()));},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",tF]},exportAs:["matInput"],features:[dD([{provide:au,useExisting:n}]),lm]})}return n})();export{Jt as J,bt as b};