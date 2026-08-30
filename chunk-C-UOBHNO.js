import{t as r}from"./chunk-Ch7qlBDL.js";import{$n as nT,Bt as Yb,Cr as ru,D as HE,E as Gw,Fn as jb,Ht as ZC,I as Jt,Kn as lu,Mr as tb,Nr as te,O as HV,Pr as tf,S as Fm,St as UV,V as Kr,Vr as um,Wt as Zr,Yn as me,an as cb,at as Py,er as nf,ft as S$1,g as Cm,gr as qC,i as $w,k as Hc,kn as ic,kr as ss,lr as pb,lt as Rm,m as Ce,n as $m,ni as y,nn as bm,q as Ml,qn as ly,r as $r,s as Am,ti as xr,ut as Rt,vn as fm,wn as hb,yr as qr}from"./chunk-CDYgws-d.js";import{L as ur,M as rn,N as sa,O as p,R as w,T as li,a as H,c as Ni,i as Ft,v as T,z as wn}from"./chunk-C7e3BebA.js";import{I as Fa,J as Yt,M as $d,W as Qo,X as ba,Y as at,Z as bo,et as fn,ft as st,gt as ya,it as jr,lt as re,rt as is,st as pd,ut as ro,z as Me}from"./main-JKFZXU5F.js";function Le(n,h){if(n&1){let e=tb();ss(0,`div`,1)(1,`button`,2),Rm(`click`,function(){tf(e);return nf(cb().action())}),jb(2),ru()()}if(n&2){let e=cb();nT(2),lu(` `,e.data.action,` `)}}var Ve=[`label`];function ze(n,h){}var je=Math.pow(2,31)-1;var S=class{_overlayRef;instance;containerInstance;_afterDismissed=new te;_afterOpened=new te;_onAction=new te;_durationTimeoutId;_dismissedByAction=!1;constructor(h,e){this._overlayRef=e,this.containerInstance=h,h._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(h){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(h,je))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}};var Ne=new S$1(`MatSnackBarData`);var b=class{politeness=`polite`;announcementMessage=``;viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition=`center`;verticalPosition=`bottom`};var qe=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ZC({type:n,selectors:[[``,`matSnackBarLabel`,``]],hostAttrs:[1,`mat-mdc-snack-bar-label`,`mdc-snackbar__label`]})}return n})();var Ze=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ZC({type:n,selectors:[[``,`matSnackBarActions`,``]],hostAttrs:[1,`mat-mdc-snack-bar-actions`,`mdc-snackbar__actions`]})}return n})();var Ue=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ZC({type:n,selectors:[[``,`matSnackBarAction`,``]],hostAttrs:[1,`mat-mdc-snack-bar-action`,`mdc-snackbar__action`]})}return n})();var Ge=(()=>{class n{snackBarRef=y(S);data=y(Ne);action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static ɵfac=function(t){return new(t||n)};static ɵcmp=qC({type:n,selectors:[[`simple-snack-bar`]],hostAttrs:[1,`mat-mdc-simple-snack-bar`],exportAs:[`matSnackBar`],decls:3,vars:2,consts:[[`matSnackBarLabel`,``],[`matSnackBarActions`,``],[`matButton`,``,`matSnackBarAction`,``,3,`click`]],template:function(t,i){t&1&&(ss(0,`div`,0),jb(1),ru(),$w(2,Le,3,1,`div`,1)),t&2&&(nT(),lu(` `,i.data.message,`
`),nT(),Gw(i.hasAction?2:-1))},dependencies:[ur,qe,Ze,Ue],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})}return n})();var U=`_mat-snack-bar-enter`;var G=`_mat-snack-bar-exit`;var Ke=(()=>{class n extends Yt{_ngZone=y(Ce);_elementRef=y(Kr);_changeDetectorRef=y(HV);_platform=y(p);_animationsDisabled=H();snackBarConfig=y(b);_document=y(Jt);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=y(me);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new te;_onExit=new te;_onEnter=new te;_animationState=`void`;_live;_label;_role;_liveElementId=y(Ft).getId(`mat-snack-bar-container-live-`);constructor(){super();let e=this.snackBarConfig;e.politeness===`assertive`&&!e.announcementMessage?this._live=`assertive`:e.politeness===`off`?this._live=`off`:this._live=`polite`,this._platform.FIREFOX&&(this._live===`polite`&&(this._role=`status`),this._live===`assertive`&&(this._role=`alert`))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}attachDomPortal=e=>{this._assertNotAttached();let t=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),t};onAnimationEnd(e){e===G?this._completeExit():e===U&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState=`visible`,this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Ml(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(U)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-snack-bar-fallback-visible`),this.onAnimationEnd(U)},200)))}exit(){return this._destroyed?ly(void 0):(this._ngZone.run(()=>{this._animationState=`hidden`,this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute(`mat-exit`,``),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Ml(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(G)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(G),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(r=>e.classList.add(r)):e.classList.add(t)),this._exposeToModals();let i=this._label.nativeElement,a=`mdc-snackbar__label`;i.classList.toggle(a,!i.querySelector(`.${a}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let i=0;i<t.length;i++){let a=t[i],r=a.getAttribute(`aria-owns`);this._trackedModals.add(a),r?r.indexOf(e)===-1&&a.setAttribute(`aria-owns`,r+` `+e):a.setAttribute(`aria-owns`,e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute(`aria-owns`);if(t){let i=t.replace(this._liveElementId,``).trim();i.length>0?e.setAttribute(`aria-owns`,i):e.removeAttribute(`aria-owns`)}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,t=e.querySelector(`[aria-hidden]`),i=e.querySelector(`[aria-live]`);if(t&&i){let a=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(a=document.activeElement),t.removeAttribute(`aria-hidden`),i.appendChild(t),a?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static ɵfac=function(t){return new(t||n)};static ɵcmp=qC({type:n,selectors:[[`mat-snack-bar-container`]],viewQuery:function(t,i){if(t&1&&Fm($d,7)(Ve,7),t&2){let a;pb(a=hb())&&(i._portalOutlet=a.first),pb(a=hb())&&(i._label=a.first)}},hostAttrs:[1,`mdc-snackbar`,`mat-mdc-snack-bar-container`],hostVars:6,hostBindings:function(t,i){t&1&&Rm(`animationend`,function(r){return i.onAnimationEnd(r.animationName)})(`animationcancel`,function(r){return i.onAnimationEnd(r.animationName)}),t&2&&$m(`mat-snack-bar-container-enter`,i._animationState===`visible`)(`mat-snack-bar-container-exit`,i._animationState===`hidden`)(`mat-snack-bar-container-animations-enabled`,!i._animationsDisabled)},features:[um],decls:6,vars:3,consts:[[`label`,``],[1,`mdc-snackbar__surface`,`mat-mdc-snackbar-surface`],[1,`mat-mdc-snack-bar-label`],[`aria-hidden`,`true`],[`cdkPortalOutlet`,``]],template:function(t,i){t&1&&(ss(0,`div`,1)(1,`div`,2,0)(3,`div`,3),fm(4,ze,0,0,`ng-template`,4),ru(),bm(5,`div`),ru()()),t&2&&(nT(5),Cm(`aria-live`,i._live)(`role`,i._role)(`id`,i._liveElementId))},dependencies:[$d],styles:[`@keyframes _mat-snack-bar-enter {
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
  color: var(--%NS%mat-snack-bar-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-snack-bar-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-snack-bar-container-color, var(--%NS%mat-sys-inverse-surface));
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
  font-family: var(--%NS%mat-snack-bar-supporting-text-font, var(--%NS%mat-sys-body-medium-font));
  font-size: var(--%NS%mat-snack-bar-supporting-text-size, var(--%NS%mat-sys-body-medium-size));
  font-weight: var(--%NS%mat-snack-bar-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  line-height: var(--%NS%mat-snack-bar-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
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
  color: var(--%NS%mat-snack-bar-button-color, var(--%NS%mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --%NS%mat-button-text-state-layer-color: currentColor;
  --%NS%mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2,changeDetection:1})}return n})();var We=new S$1(`mat-snack-bar-default-options`,{providedIn:`root`,factory:()=>new b});var vt=(()=>{class n{_live=y(wn);_injector=y(me);_breakpointObserver=y(rn);_parentSnackBar=y(n,{optional:!0,skipSelf:!0});_defaultConfig=y(We);_animationsDisabled=H();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=Ge;snackBarContainerComponent=Ke;handsetCssClass=`mat-mdc-snack-bar-handset`;get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t=``,i){let a=r(r({},this._defaultConfig),i);return a.data={message:e,action:t},a.announcementMessage===e&&(a.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,a)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let i=t&&t.viewContainerRef&&t.viewContainerRef.injector,a=me.create({parent:i||this._injector,providers:[{provide:b,useValue:t}]}),r=new fn(this.snackBarContainerComponent,t.viewContainerRef,a),o=e.attach(r);return o.instance.snackBarConfig=t,o.instance}_attach(e,t){let i=r(r(r({},new b),this._defaultConfig),t),a=this._createOverlay(i),r$1=this._attachSnackBarContainer(a,i),o=new S(r$1,a);if(e instanceof $r){let c=new st(e,null,{$implicit:i.data,snackBarRef:o});o.instance=r$1.attachTemplatePortal(c)}else{let u=new fn(e,void 0,this._createInjector(i,o));o.instance=r$1.attachComponentPortal(u).instance}return this._breakpointObserver.observe(sa.HandsetPortrait).pipe(Py(a.detachments())).subscribe(c=>{a.overlayElement.classList.toggle(this.handsetCssClass,c.matches)}),i.announcementMessage&&r$1._onAnnounce.subscribe(()=>{this._live.announce(i.announcementMessage,i.politeness)}),this._animateSnackBar(o,i),this._openedSnackBarRef=o,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let t=new at;t.direction=e.direction;let i=Fa(this._injector),a=e.direction===`rtl`,r=e.horizontalPosition===`left`||e.horizontalPosition===`start`&&!a||e.horizontalPosition===`end`&&a,o=!r&&e.horizontalPosition!==`center`;return r?i.left(`0`):o?i.right(`0`):i.centerHorizontally(),e.verticalPosition===`top`?i.top(`0`):i.bottom(`0`),t.positionStrategy=i,t.disableAnimations=this._animationsDisabled,bo(this._injector,t)}_createInjector(e,t){let i=e&&e.viewContainerRef&&e.viewContainerRef.injector;return me.create({parent:i||this._injector,providers:[{provide:S,useValue:t},{provide:Ne,useValue:e.data}]})}static ɵfac=function(t){return new(t||n)};static ɵprov=Zr({token:n,factory:n.ɵfac})}return n})();var $e=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=qC({type:n,selectors:[[`ng-component`]],hostAttrs:[`cdk-text-field-style-loader`,``],decls:0,vars:0,template:function(t,i){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2})}return n})();var Qe={passive:!0};var Pe=(()=>{class n{_platform=y(p);_ngZone=y(Ce);_renderer=y(qr).createRenderer(null,null);_styleLoader=y(T);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return Rt;this._styleLoader.load($e);let t=w(e),i=this._monitoredElements.get(t);if(i)return i.subject;let a=new te,r=`cdk-text-field-autofilled`,o=u=>{u.animationName===`cdk-text-field-autofill-start`&&!t.classList.contains(r)?(t.classList.add(r),this._ngZone.run(()=>a.next({target:u.target,isAutofilled:!0}))):u.animationName===`cdk-text-field-autofill-end`&&t.classList.contains(r)&&(t.classList.remove(r),this._ngZone.run(()=>a.next({target:u.target,isAutofilled:!1})))},c=this._ngZone.runOutsideAngular(()=>(t.classList.add(`cdk-text-field-autofill-monitored`),this._renderer.listen(t,`animationstart`,o,Qe)));return this._monitoredElements.set(t,{subject:a,unlisten:c}),a}stopMonitoring(e){let t=w(e),i=this._monitoredElements.get(t);i&&(i.unlisten(),i.subject.complete(),t.classList.remove(`cdk-text-field-autofill-monitored`),t.classList.remove(`cdk-text-field-autofilled`),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}static ɵfac=function(t){return new(t||n)};static ɵprov=Zr({token:n,factory:n.ɵfac})}return n})();var He=new S$1(`MAT_INPUT_VALUE_ACCESSOR`);var Xe=[`button`,`checkbox`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`];var Ye=new S$1(`MAT_INPUT_CONFIG`);var ti=(()=>{class n{_elementRef=y(Kr);_platform=y(p);ngControl=y(re,{optional:!0,self:!0});_autofillMonitor=y(Pe);_ngZone=y(Ce);_formField=y(ba,{optional:!0});_renderer=y(Hc);_uid=y(Ft).getId(`mat-input-`);_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=y(Ye,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new te;controlType=`mat-input`;autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=Ni(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Me.required)??!1}set required(e){this._required=Ni(e)}_required;get type(){return this._type}set type(e){this._type=e||`text`,this._validateType(),!this._isTextarea&&li().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type=`text`;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=Ni(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=[`date`,`datetime`,`datetime-local`,`month`,`time`,`week`].filter(e=>li().has(e));constructor(){let e=y(Qo,{optional:!0}),t=y(is,{optional:!0}),i=y(pd),a=y(He,{optional:!0,self:!0}),r=y(jr,{optional:!0,self:!0}),o=this._elementRef.nativeElement,c=o.nodeName.toLowerCase();a?xr(a.value)?this._signalBasedValueAccessor=a:this._inputValueAccessor=a:this._inputValueAccessor=o,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(o,`keyup`,this._iOSKeyupListener)}),this._errorStateTracker=new ro(i,r||this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=c===`select`,this._isTextarea=c===`textarea`,this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=o.multiple?`mat-native-select-multiple`:`mat-native-select`),this._signalBasedValueAccessor&&ic(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let t=this._elementRef.nativeElement;t.type===`number`?(t.type=`text`,t.setSelectionRange(0,0),t.type=`number`):t.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute(`placeholder`,e):t.removeAttribute(`placeholder`)}}_getPlaceholder(){return this.placeholder||null}_validateType(){Xe.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let t=e.target;!t.value&&t.selectionStart===0&&t.selectionEnd===0&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?`true`:null}static ɵfac=function(t){return new(t||n)};static ɵdir=ZC({type:n,selectors:[[`input`,`matInput`,``],[`textarea`,`matInput`,``],[`select`,`matNativeControl`,``],[`input`,`matNativeControl`,``],[`textarea`,`matNativeControl`,``]],hostAttrs:[1,`mat-mdc-input-element`],hostVars:21,hostBindings:function(t,i){t&1&&Rm(`focus`,function(){return i._focusChanged(!0)})(`blur`,function(){return i._focusChanged(!1)})(`input`,function(){return i._onInput()}),t&2&&(Am(`id`,i.id)(`disabled`,i.disabled&&!i.disabledInteractive)(`required`,i.required),Cm(`name`,i.name||null)(`readonly`,i._getReadonlyAttribute())(`aria-disabled`,i.disabled&&i.disabledInteractive?`true`:null)(`aria-invalid`,i.empty&&i.required?null:i.errorState)(`aria-required`,i.required)(`id`,i.id),$m(`mat-input-server`,i._isServer)(`mat-mdc-form-field-textarea-control`,i._isInFormField&&i._isTextarea)(`mat-mdc-form-field-input-control`,i._isInFormField)(`mat-mdc-input-disabled-interactive`,i.disabledInteractive)(`mdc-text-field__input`,i._isInFormField)(`mat-mdc-native-select-inline`,i._isInlineSelect()))},inputs:{disabled:`disabled`,id:`id`,placeholder:`placeholder`,name:`name`,required:`required`,type:`type`,errorStateMatcher:`errorStateMatcher`,userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],value:`value`,readonly:`readonly`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,UV]},exportAs:[`matInput`],features:[Yb([{provide:ya,useExisting:n}]),HE]})}return n})();export{vt as n,ti as t};