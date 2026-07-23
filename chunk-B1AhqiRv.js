import {b as bt,J as Jt}from'./chunk-CwRBRLNG.js';import {T,aI as Tr,aO as ue,aP as x,aQ as Ld,aR as yn$1,aJ as pt,aS as le,aT as Li,aU as be,aV as ir,aW as CI,aX as gt,aY as Ki$1,aK as _e,aZ as ne,a_ as Rg,a$ as Yn,b0 as Ye$1,b1 as hr,b2 as pr,aM as S,w,b3 as Wf,b4 as De,b5 as CE,N as Nt,h as NF,F as Fe,d as dt,I as IE,a as Ia,c as Mt,e as wi$1,y as ih,Z as ZE,H as Hc,J as Jp,$ as Kp,g as Hv,Y as YE,b6 as Gr,q as rr,b7 as LF,u as Gp,b8 as Uu,X as Xp,b9 as Wu,ag as nh,ah as gD,A as hh,ba as _D,D as gh,E as lh,K as fD,O as pD,bb as kF,aC as Bc,bc as sh,a2 as FD,aE as $c,aa as Dh,bd as lr,R as Rt,o as C,av as At,be as x$1,n as nt$1,r as re,bf as ut,bg as Ig,B as Bl,bh as Is,bi as wr,bj as Wu$1,bk as Po,bl as Hu,bm as Cs,bn as wa,bo as Mn,al as xu,i as iu,f as bh,bp as xI,V as KD,C as Ch,bq as RI,_ as XD,a9 as qc,a7 as aD,br as Rs,bs as fr,bt as It,bu as se,bv as Je,bw as yr,bx as ae,by as On,bz as Xt,bA as Dg,bB as qe,bC as ey,bD as wm,bE as Wp,bF as rh,bG as K,bH as yo,bI as Fh,bJ as Xc,bK as Pt,bL as Pm,bM as PF,s as lD,af as uD,aL as zD,bN as To,bO as Ue,bP as Eo,bQ as $e,bR as Vr,bS as Hi$1,bT as yr$1,x as tw,bU as NE,ax as $D,bV as As}from'./main-DJGIKSCT.js';var Ni=["determinateSpinner"];function Fi(n,o){if(n&1&&(Uu(),wi$1(0,"svg",11),Xp(1,"circle",12),Hc()),n&2){let e=aD();Kp("viewBox",e._viewBox()),Hv(),hh("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),Kp("r",e._circleRadius());}}var zi=new S("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:li})}),li=100,Bi=10,ci=(()=>{class n{_elementRef=T(Tr);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=T(zi),t=Gr(),i=this._elementRef.nativeElement;this._noopAnimations=t==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=i.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&t==="reduced-motion"&&i.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth));}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0));}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0;}_diameter=li;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0;}_strokeWidth;_circleRadius(){return (this.diameter-Bi)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return `0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(t,i){if(t&1&&lh(Ni,5),t&2){let a;fD(a=pD())&&(i._determinateCircle=a.first);}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(t,i){t&2&&(Kp("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",i.mode==="determinate"?i.value:null)("mode",i.mode),_D("mat-"+i.color),hh("width",i.diameter,"px")("height",i.diameter,"px")("--mat-progress-spinner-size",i.diameter+"px")("--mat-progress-spinner-active-indicator-width",i.diameter+"px"),gh("_mat-animation-noopable",i._noopAnimations)("mdc-circular-progress--indeterminate",i.mode==="indeterminate"));},inputs:{color:"color",mode:"mode",value:[2,"value","value",LF],diameter:[2,"diameter","diameter",LF],strokeWidth:[2,"strokeWidth","strokeWidth",LF]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(t,i){if(t&1&&(Gp(0,Fi,2,8,"ng-template",null,0,tw),wi$1(2,"div",2,1),Uu(),wi$1(4,"svg",3),Xp(5,"circle",4),Hc()(),Wu(),wi$1(6,"div",5)(7,"div",6)(8,"div",7),nh(9,8),Hc(),wi$1(10,"div",9),nh(11,8),Hc(),wi$1(12,"div",10),nh(13,8),Hc()()()),t&2){let a=gD(1);Hv(4),Kp("viewBox",i._viewBox()),Hv(),hh("stroke-dasharray",i._strokeCircumference(),"px")("stroke-dashoffset",i._strokeDashOffset(),"px")("stroke-width",i._circleStrokeWidth(),"%"),Kp("r",i._circleRadius()),Hv(4),Jp("ngTemplateOutlet",a),Hv(2),Jp("ngTemplateOutlet",a),Hv(2),Jp("ngTemplateOutlet",a);}},dependencies:[rr],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
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
  --mat-progress-spinner-animation-multiplier: 1.25;
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
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
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
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
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
`],encapsulation:2})}return n})();var ji=["tooltip"],Hi=20;var Gi=new S("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let n=T(le);return ()=>lr(n,{scrollThrottle:Hi})}}),Vi=new S("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var di="tooltip-panel",Wi={passive:true},Xi=8,Yi=8,Ui=24,qi=200,et=(()=>{class n{_elementRef=T(Tr);_ngZone=T(ue);_platform=T(x);_ariaDescriber=T(Ld);_focusMonitor=T(yn$1);_dir=T(pt);_injector=T(le);_viewContainerRef=T(Li);_mediaMatcher=T(be);_document=T(ir);_renderer=T(CI);_animationsDisabled=gt();_defaultOptions=T(Vi,{optional:true});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=false;_disabled=false;_tooltipClass;_viewInitialized=false;_pointerExitEventsInitialized=false;_tooltipComponent=mi;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=false;_dirSubscribed=false;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()));}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Ki$1(e),this._detach(),this._overlayRef=null;}get disabled(){return this._disabled}set disabled(e){let t=Ki$1(e);this._disabled!==t&&(this._disabled=t,t?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message));}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=_e(e);}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=_e(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay);}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let t=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(t);}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass);}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new ne;_isDestroyed=false;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=Xi;}ngAfterViewInit(){this._viewInitialized=true,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(Rg(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0));});}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(t=>t()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=true,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e);}show(e=this.showDelay,t){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let i=this._createOverlay(t);this._detach(),this._portal=this._portal||new Yn(this._tooltipComponent,this._viewContainerRef);let a=this._tooltipInstance=i.attach(this._portal).instance;a._triggerElement=this._elementRef.nativeElement,a._mouseLeaveHideDelay=this._hideDelay,a.afterHidden().pipe(Rg(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),a.show(e);}hide(e=this.hideDelay){let t=this._tooltipInstance;t&&(t.isVisible()?t.hide(e):(t._cancelPendingAnimations(),this._detach()));}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e);}_isTooltipVisible(){return !!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof Tr)return this._overlayRef;this._detach();}let t=this._injector.get(Ye$1).getAncestorScrollContainers(this._elementRef),i=`${this._cssClassPrefix}-${di}`,a=hr(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(t).withPopoverLocation("global");return a.positionChanges.pipe(Rg(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0));}),this._overlayRef=pr(this._injector,{direction:this._dir,positionStrategy:a,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,i]:i,scrollStrategy:this._injector.get(Gi)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(Rg(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(Rg(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(Rg(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0));}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=true,this._dir.change.pipe(Rg(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef);})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null;}_updatePosition(e){let t=e.getConfig().positionStrategy,i=this._getOrigin(),a=this._getOverlayPosition();t.withPositions([this._addOffset(w(w({},i.main),a.main)),this._addOffset(w(w({},i.fallback),a.fallback))]);}_addOffset(e){let t=Yi,i=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-t:e.originY==="bottom"?e.offsetY=t:e.originX==="start"?e.offsetX=i?-t:t:e.originX==="end"&&(e.offsetX=i?t:-t),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",t=this.position,i;t=="above"||t=="below"?i={originX:"center",originY:t=="above"?"top":"bottom"}:t=="before"||t=="left"&&e||t=="right"&&!e?i={originX:"start",originY:"center"}:(t=="after"||t=="right"&&e||t=="left"&&!e)&&(i={originX:"end",originY:"center"});let{x:a,y:s}=this._invertPosition(i.originX,i.originY);return {main:i,fallback:{originX:a,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",t=this.position,i;t=="above"?i={overlayX:"center",overlayY:"bottom"}:t=="below"?i={overlayX:"center",overlayY:"top"}:t=="before"||t=="left"&&e||t=="right"&&!e?i={overlayX:"end",overlayY:"center"}:(t=="after"||t=="right"&&e||t=="left"&&!e)&&(i={overlayX:"start",overlayY:"center"});let{x:a,y:s}=this._invertPosition(i.overlayX,i.overlayY);return {main:i,fallback:{overlayX:a,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),Wf(()=>{this._tooltipInstance&&this._overlayRef.updatePosition();},{injector:this._injector}));}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck());}_invertPosition(e,t){return this.position==="above"||this.position==="below"?t==="top"?t="bottom":t==="bottom"&&(t="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:t}}_updateCurrentPositionClass(e){let{overlayY:t,originX:i,originY:a}=e,s;if(t==="center"?this._dir&&this._dir.value==="rtl"?s=i==="end"?"left":"right":s=i==="start"?"left":"right":s=t==="bottom"&&a==="top"?"above":"below",s!==this._currentPosition){let l=this._overlayRef;if(l){let d=`${this._cssClassPrefix}-${di}-`;l.removePanelClass(d+this._currentPosition),l.addPanelClass(d+s);}this._currentPosition=s;}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let t=e.targetTouches?.[0],i=t?{x:t.clientX,y:t.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let a=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,i);},this._defaultOptions?.touchLongPressShowDelay??a);})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let t;e.x!==void 0&&e.y!==void 0&&(t=e),this.show(void 0,t);}));}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=true,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let t=e.relatedTarget;(!t||!this._overlayRef?.overlayElement.contains(t))&&this.hide();}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let t=this._document.elementFromPoint(e.clientX,e.clientY),i=this._elementRef.nativeElement;t!==i&&!i.contains(t)&&this.hide();}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay);};this._addListener("touchend",e),this._addListener("touchcancel",e);}}}_addListener(e,t){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,t,Wi));}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?true:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:false}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let t=this._elementRef.nativeElement,i=t.style;(e==="on"||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA")&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect="none"),(e==="on"||!t.draggable)&&(i.webkitUserDrag="none"),i.touchAction="none",i.webkitTapHighlightColor="transparent";}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=true,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||Wf({write:()=>{this._ariaDescriptionPending=false,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip");}},{injector:this._injector}));}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!De(e):true;static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(t,i){t&2&&gh("mat-mdc-tooltip-disabled",i.disabled);},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return n})(),mi=(()=>{class n{_changeDetectorRef=T(kF);_elementRef=T(Tr);_isMultiline=false;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=gt();_tooltip;_closeOnInteraction=false;_isVisible=false;_onHide=new ne;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(true),this._showTimeoutId=void 0;},e);}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(false),this._hideTimeoutId=void 0;},e);}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null;}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0);}_markForCheck(){this._changeDetectorRef.markForCheck();}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(false));}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck();}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>Ui&&e.width>=qi}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation);}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0;}_finalizeAnimation(e){e?this._closeOnInteraction=true:this.isVisible()||this._onHide.next();}_toggleVisibility(e){let t=this._tooltip.nativeElement,i=this._showAnimation,a=this._hideAnimation;if(t.classList.remove(e?a:i),t.classList.add(e?i:a),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(t);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=true);}e&&this._onShow(),this._animationsDisabled&&(t.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e));}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(t,i){if(t&1&&lh(ji,7),t&2){let a;fD(a=pD())&&(i._tooltip=a.first);}},hostAttrs:["aria-hidden","true"],hostBindings:function(t,i){t&1&&ih("mouseleave",function(s){return i._handleMouseLeave(s)});},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(t,i){t&1&&(Bc(0,"div",1,0),sh("animationend",function(s){return i._handleAnimationEnd(s)}),Bc(2,"div",2),FD(3),$c()()),t&2&&(_D(i.tooltipClass),gh("mdc-tooltip--multiline",i._isMultiline),Hv(3),Dh(i.message));},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));
  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));
  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));
  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));
  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));
  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2})}return n})();var c=(function(n){return n.ONLINE="cv.countries.online",n.SPAIN="cv.countries.spain",n.USA="cv.countries.usa",n.GERMANY="cv.countries.germany",n.MEXICO="cv.countries.mexico",n.ITALY="cv.countries.italy",n})(c||{}),O=(function(n){return n.CV="cv",n.STATEMENT="statement",n.IMAGE="image",n})(O||{}),hi=[{title:"cv.shows.title",items:[{title:"El valle inquietante",venue:"cv.zunino",city:"Sevilla",country:c.SPAIN,year:2024},{title:"El sue\xF1o de los robots",venue:"cv.zunino",city:"Sevilla",country:c.SPAIN,year:2021},{title:"33. El desenga\xF1o",venue:"La 13 dada trouch Gallery",city:"Huelva",country:c.SPAIN,year:2019},{title:"#blessed",venue:"Un gato en bicicleta",city:"Sevilla",country:c.SPAIN,year:2017},{title:"I was there",venue:"La silla el\xE9ctrica",city:"Sevilla",country:c.SPAIN,year:2017},{title:"Never Gone Forever",venue:"Gallo Rojo",city:"Sevilla",country:c.SPAIN,year:2016},{title:"Pintura Aumentada",venue:"Red House",city:"Sevilla",country:c.SPAIN,year:2014},{title:"Historias aparentemente inconexas",venue:"Aula Magna de Capuchinos",city:"Alcal\xE1 la Real",country:c.SPAIN,year:2013},{title:"Juanma Moreno",venue:"No-Lugar",city:"Sevilla",country:c.SPAIN,year:2012},{title:"Transe\xFAntes",venue:"Harz Mensa",city:"Halle Saale",country:c.GERMANY,year:2008}]},{title:"cv.collectiveShows.title",items:[{title:"Outsiders. Vol. 1",venue:"cv.zunino",city:"Sevilla",country:c.SPAIN,year:2024},{title:"Anna Jonsson & Juanma Moreno",venue:"El Estudio de Ignacio del R\xEDo",city:"Villanueva del Rosario",country:c.SPAIN,year:2024},{title:"Pintores pensando la pintura",venue:"<a href='https://www.espacio75.com/' target='_blank'>Espacio 75 Art Gallery</a>",city:"Madrid",country:c.SPAIN,year:2023},{title:"Nocturnos",venue:"Sala Pescader\xEDa Vieja / CAC V\xE9lez-M\xE1laga",city:"Jerez de la Frontera / V\xE9lez-M\xE1laga",country:c.SPAIN,year:2023},{title:"Los \xFAnicos que saben de arte son los artistas",venue:"cv.zunino",city:"Sevilla",country:c.SPAIN,year:2023},{title:"<a href='https://discoveryartfair.com/fairs/koeln/' target='_blank'> Discovery Art Fair Cologne</a>",city:"Cologne",country:c.GERMANY,year:2022},{title:"<a href='https://www.luccaartfair.com/' target='_blank'> Lucca Art Fair</a>",country:c.ONLINE,year:2021},{title:"Figuraci\xF3n Fant\xE1stica Sevillana",venue:"<a href='https://impulsogaleria.com/en/home/' target='_blank'>Galer\xEDa Impulso</a>",city:"Quer\xE9taro",country:c.MEXICO,year:2021},{title:"Interpaisajes",venue:"<a href='https://www.eldevenirartgallery.com/'>Eldevenir</a> & <a href='https://www.galeriazunino.com'>Zunino Gallery</a>",country:c.ONLINE,year:2020},{title:"72 horas",venue:"cv.zunino",city:"Sevilla",country:c.SPAIN,year:2019},{title:"Homenaje a Dolores Montijano",venue:"Aula Magna de Capuchinos",city:"Alcal\xE1 la Real",country:c.SPAIN,year:2019},{title:"Redes de fe",venue:"<a href='https://renace.art/' target='_blank'>Galer\xEDa Renace Art</a>",city:"Jaen",country:c.SPAIN,year:2019},{title:"Todo encaja",venue:"cv.zunino",city:"Sevilla",country:c.SPAIN,year:2018},{title:"Lodo",venue:"Un gato en bicicleta",city:"Sevilla",country:c.SPAIN,year:2017},{title:"Escozor",venue:"Un gato en bicicleta",city:"Sevilla",country:c.SPAIN,year:2015},{title:"A paloma muerta",venue:"<a href='http://estudio22photo.es' target='blank'>Estudio22 </a>",city:"Logro\xF1o",country:c.SPAIN,year:2015},{title:"Nemoart festival, digital art",venue:"Casa Museo Niceto Alcal\xE1 Zamora",city:"Priego de C\xF3rdoba",country:c.SPAIN,year:2015},{title:"Promoci\xF3n equis",venue:"Cienfuegos",city:"M\xE1laga",country:c.SPAIN,year:2015},{title:"En az\xFAcar de sand\xEDa",venue:"Suricatta Gallery",city:"Jerez de la Frontera",country:c.SPAIN,year:2015},{title:"El tama\xF1o no importa",venue:"Un gato en bicicleta",city:"Sevilla",country:c.SPAIN,year:2014},{title:"MULTI/TUTTI/FEST",venue:"Cienfuegos",city:"M\xE1laga",country:c.SPAIN,year:2014},{title:"Plato del d\xEDa",venue:"Red House",city:"Sevilla",country:c.SPAIN,year:2013},{title:"Lo mejorcito de cada casa",venue:"No-Lugar",city:"Sevilla",country:c.SPAIN,year:2013},{title:"Weisser TV",venue:"<a href='https://www.129gallery.com/' target='blank'>129 Gallery</a>",city:"Berlin",country:c.GERMANY,year:2011},{title:"Mehr Licht, tributo a Chema Alvargonzalez",venue:"<a href='https://glogauair.net/' target='blank'>GlogauAIR Project Space</a>",city:"Berlin",country:c.GERMANY,year:2011},{title:"Modern Classic, influence of the past in today's art",venue:"Your Mum",city:"Berlin",country:c.GERMANY,year:2011},{title:"The Mac Gyver Problem",venue:"Galerie im Regierungsviertel/The Forgotten Bar",city:"Berlin",country:c.GERMANY,year:2010},{title:"XXL-Art, nuevas tendencias de la figuraci\xF3n en gran formato",venue:"Dami\xE1n Bay\xF3n Art Center",city:"Santa Fe",country:c.SPAIN,year:2009},{title:"La m\xE1s elegante del invernadero III",venue:"Galer\xEDa Jes\xFAs Puerto",city:"Granada",country:c.SPAIN,year:2009}]},{title:"cv.awards.title",items:[{title:"<a href='http://www.pkf.org/' target='blank'>The Pollock-Krasner Foundation award</a>",city:"New York",country:c.USA,year:2014},{title:"cv.awards.fag",city:"C\xF3rdoba",country:c.SPAIN,year:2012},{title:"<a href='http://www.glogauair.net/' target='blank'>GlogauAIR Residence Program</a>",city:"Berl\xEDn",country:c.GERMANY,year:2010},{title:"cv.awards.lefranc",city:"Granada",country:c.SPAIN,year:2006}]},{title:"cv.conferences.title",items:[{title:"cv.conferences.invierno-ia",venue:"cv.conferences.unia",city:"Baeza",country:c.SPAIN,year:2025}]},{title:"cv.education.title",items:[{title:"cv.education.degree",venue:"cv.education.ugr",city:"Granada",country:c.SPAIN,year:2009},{title:"cv.education.erasmus",venue:"cv.education.burg",city:"Halle Saale",country:c.GERMANY,year:2008}]}];var tt={introduction:{image:{src:"assets/images/abstract_landscape.jpg",alt:"Juanma Moreno S\xE1nchez detail of a landscape painting"},content:"statement.introduction.content"},sections:[{title:"statement.painting.title",content:["statement.painting.distance","statement.painting.outOfNoise","statement.painting.anacronism"]},{title:"statement.art.title",content:["statement.art.arts"]},{title:"statement.constants.title",items:[{subtitle:"statement.constants.items.first.title",content:"statement.constants.items.first.content"},{subtitle:"statement.constants.items.second.title",content:"statement.constants.items.second.content"},{subtitle:"statement.constants.items.third.title",content:"statement.constants.items.third.content"},{subtitle:"statement.constants.items.fourth.title",content:"statement.constants.items.fourth.content"}]},{title:"statement.variables.title",items:[{subtitle:"statement.variables.items.first.title",content:"statement.variables.items.first.content"},{subtitle:"statement.variables.items.second.title",content:"statement.variables.items.second.content"}]}]};function Zi(n,o){}var H=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=true;backdropClass="";disableClose=false;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=false;autoFocus="first-tabbable";restoreFocus=true;scrollStrategy;closeOnNavigation=true;closeOnDestroy=true;closeOnOverlayDetachments=true;disableAnimations=false;providers;container;templateContext;bindings};var nt=(()=>{class n extends $e{_elementRef=T(Tr);_focusTrapFactory=T(Vr);_config;_interactivityChecker=T(Hi$1);_ngZone=T(ue);_focusMonitor=T(yn$1);_renderer=T(CI);_changeDetectorRef=T(kF);_injector=T(le);_platform=T(x);_document=T(ir);_portalOutlet;_focusTrapped=new ne;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=false;constructor(){super(),this._config=T(H,{optional:true})||new H,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy);}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck();}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck());}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus();}_captureInitialFocus(){this._trapFocus();}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=true,this._restoreFocus();}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus();}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{a(),s(),e.removeAttribute("tabindex");},a=this._renderer.listen(e,"blur",i),s=this._renderer.listen(e,"mousedown",i);})),e.focus(t);}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,t);}_trapFocus(e){this._isDestroyed||Wf(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case  false:case "dialog":this._containsFocus()||t.focus(e);break;case  true:case "first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next();},{injector:this._injector});}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let i=yr$1(),a=this._elementRef.nativeElement;(!i||i===this._document.body||i===a||a.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus());}this._focusTrap&&this._focusTrap.destroy();}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e);}_containsFocus(){let e=this._elementRef.nativeElement,t=yr$1();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=yr$1()));}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["cdk-dialog-container"]],viewQuery:function(t,i){if(t&1&&lh(wm,7),t&2){let a;fD(a=pD())&&(i._portalOutlet=a.first);}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,i){t&2&&Kp("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null);},features:[Wp],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,i){t&1&&Gp(0,Zi,0,0,"ng-template",0);},dependencies:[wm],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})}return n})(),ve=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new ne;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(o,e){this.overlayRef=o,this.config=e,this.disableClose=e.disableClose,this.backdropClick=o.backdropClick(),this.keydownEvents=o.keydownEvents(),this.outsidePointerEvents=o.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!De(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}));}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.();}),this._detachSubscription=o.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==false&&this.close();});}close(o,e){if(this._canClose(o)){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(o),t.complete(),this.componentInstance=this.containerInstance=null;}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(o="",e=""){return this.overlayRef.updateSize({width:o,height:e}),this}addPanelClass(o){return this.overlayRef.addPanelClass(o),this}removePanelClass(o){return this.overlayRef.removePanelClass(o),this}_canClose(o){let e=this.config;return !!this.containerInstance&&(!e.closePredicate||e.closePredicate(o,e,this.componentInstance))}},$i=new S("DialogScrollStrategy",{providedIn:"root",factory:()=>{let n=T(le);return ()=>Rs(n)}}),Ki=new S("DialogData"),en=new S("DefaultDialogConfig");function tn(n){let o=Fe(n),e=new qe;return {valueSignal:o,get value(){return o()},change:e,ngOnDestroy(){e.complete();}}}var pi=(()=>{class n{_injector=T(le);_defaultOptions=T(en,{optional:true});_parentDialog=T(n,{optional:true,skipSelf:true});_overlayContainer=T(fr);_idGenerator=T(ut);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new ne;_afterOpenedAtThisLevel=new ne;_ariaHiddenElements=new Map;_scrollStrategy=T($i);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=Ig(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Bl(void 0)));open(e,t){let i=this._defaultOptions||new H;t=w(w({},i),t),t.id=t.id||this._idGenerator.getId("cdk-dialog-"),t.id&&this.getDialogById(t.id);let a=this._getOverlayConfig(t),s=pr(this._injector,a),l=new ve(s,t),d=this._attachContainer(s,l,t);if(l.containerInstance=d,!this.openDialogs.length){let p=this._overlayContainer.getContainerElement();d._focusTrapped?d._focusTrapped.pipe(It(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(p);}):this._hideNonDialogContentFromAssistiveTechnology(p);}return this._attachDialogContent(e,l,d,t),this.openDialogs.push(l),l.closed.subscribe(()=>this._removeOpenDialog(l,true)),this.afterOpened.next(l),l}closeAll(){it(this.openDialogs,e=>e.close());}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){it(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===false&&this._removeOpenDialog(e,false);}),it(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[];}_getOverlayConfig(e){let t=new se({positionStrategy:e.positionStrategy||Is().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,i){let a=i.injector||i.viewContainerRef?.injector,s=[{provide:H,useValue:i},{provide:ve,useValue:t},{provide:Je,useValue:e}],l;i.container?typeof i.container=="function"?l=i.container:(l=i.container.type,s.push(...i.container.providers(i))):l=nt;let d=new Yn(l,i.viewContainerRef,le.create({parent:a||this._injector,providers:s}));return e.attach(d).instance}_attachDialogContent(e,t,i,a){if(e instanceof yr){let s=this._createInjector(a,t,i,void 0),l={$implicit:a.data,dialogRef:t};a.templateContext&&(l=w(w({},l),typeof a.templateContext=="function"?a.templateContext():a.templateContext)),i.attachTemplatePortal(new ae(e,null,l,s));}else {let s=this._createInjector(a,t,i,this._injector),l=i.attachComponentPortal(new Yn(e,a.viewContainerRef,s,null,a.bindings));t.componentRef=l,t.componentInstance=l.instance;}}_createInjector(e,t,i,a){let s=e.injector||e.viewContainerRef?.injector,l=[{provide:Ki,useValue:e.data},{provide:ve,useValue:t}];return e.providers&&(typeof e.providers=="function"?l.push(...e.providers(t,e,i)):l.push(...e.providers)),e.direction&&(!s||!s.get(pt,null,{optional:true}))&&l.push({provide:pt,useValue:tn(e.direction)}),le.create({parent:s||a,providers:l})}_removeOpenDialog(e,t){let i=this.openDialogs.indexOf(e);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((a,s)=>{a?s.setAttribute("aria-hidden",a):s.removeAttribute("aria-hidden");}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()));}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let t=e.parentElement.children;for(let i=t.length-1;i>-1;i--){let a=t[i];a!==e&&a.nodeName!=="SCRIPT"&&a.nodeName!=="STYLE"&&!a.hasAttribute("aria-live")&&!a.hasAttribute("popover")&&(this._ariaHiddenElements.set(a,a.getAttribute("aria-hidden")),a.setAttribute("aria-hidden","true"));}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr({token:n,factory:n.\u0275fac})}return n})();function it(n,o){let e=n.length;for(;e--;)o(n[e]);}function nn(n,o){}var Ge=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=true;backdropClass="";disableClose=false;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=false;autoFocus="first-tabbable";restoreFocus=true;delayFocusTrap=true;scrollStrategy;closeOnNavigation=true;enterAnimationDuration;exitAnimationDuration;bindings},at="mdc-dialog--open",ui="mdc-dialog--opening",gi="mdc-dialog--closing",an=150,on=75,sn=(()=>{class n extends nt{_animationStateChanged=new qe;_animationsEnabled=!gt();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?_i(this._config.enterAnimationDuration)??an:0;_exitAnimationDuration=this._animationsEnabled?_i(this._config.exitAnimationDuration)??on:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation();}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(fi,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(ui,at)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(at),Promise.resolve().then(()=>this._finishDialogOpen()));}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(at),this._animationsEnabled?(this._hostElement.style.setProperty(fi,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(gi)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose());}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck();}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration);};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration});};_clearAnimationClasses(){this._hostElement.classList.remove(ui,gi);}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e);}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e();});}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus();}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e});}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer);}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),t}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(n)))(i||n)}})();static \u0275cmp=IE({type:n,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(t,i){t&2&&(rh("id",i._config.id),Kp("aria-modal",i._config.ariaModal)("role",i._config.role)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null),gh("_mat-animation-noopable",!i._animationsEnabled)("mat-mdc-dialog-container-with-actions",i._actionSectionCount>0));},features:[Wp],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(t,i){t&1&&(wi$1(0,"div",0)(1,"div",1),Gp(2,nn,0,0,"ng-template",2),Hc()());},dependencies:[wm],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})}return n})(),fi="--mat-dialog-transition-duration";function _i(n){return n==null?null:typeof n=="number"?n:n.endsWith("ms")?_e(n.substring(0,n.length-2)):n.endsWith("s")?_e(n.substring(0,n.length-1))*1e3:n==="0"?0:null}var He=(function(n){return n[n.OPEN=0]="OPEN",n[n.CLOSING=1]="CLOSING",n[n.CLOSED=2]="CLOSED",n})(He||{}),Y=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new On(1);_beforeClosed=new On(1);_result;_closeFallbackTimeout;_state=He.OPEN;_closeInteractionType;constructor(o,e,t){this._ref=o,this._config=e,this._containerInstance=t,this.disableClose=e.disableClose,this.id=o.id,o.addPanelClass("mat-mdc-dialog-panel"),t._animationStateChanged.pipe(Xt(i=>i.state==="opened"),It(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete();}),t._animationStateChanged.pipe(Xt(i=>i.state==="closed"),It(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose();}),o.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose();}),Dg(this.backdropClick(),this.keydownEvents().pipe(Xt(i=>i.keyCode===27&&!this.disableClose&&!De(i)))).subscribe(i=>{this.disableClose||(i.preventDefault(),vi(this,i.type==="keydown"?"keyboard":"mouse"));});}close(o){let e=this._config.closePredicate;e&&!e(o,this._config,this.componentInstance)||(this._result=o,this._containerInstance._animationStateChanged.pipe(Xt(t=>t.state==="closing"),It(1)).subscribe(t=>{this._beforeClosed.next(o),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100);}),this._state=He.CLOSING,this._containerInstance._startExitAnimation());}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(o){let e=this._ref.config.positionStrategy;return o&&(o.left||o.right)?o.left?e.left(o.left):e.right(o.right):e.centerHorizontally(),o&&(o.top||o.bottom)?o.top?e.top(o.top):e.bottom(o.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(o="",e=""){return this._ref.updateSize(o,e),this}addPanelClass(o){return this._ref.addPanelClass(o),this}removePanelClass(o){return this._ref.removePanelClass(o),this}getState(){return this._state}_finishDialogClose(){this._state=He.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null;}};function vi(n,o,e){return n._closeInteractionType=o,n.close(e)}var rn=new S("MatMdcDialogData"),ln=new S("mat-mdc-dialog-default-options"),cn=new S("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let n=T(le);return ()=>Rs(n)}}),Ve=(()=>{class n{_defaultOptions=T(ln,{optional:true});_scrollStrategy=T(cn);_parentDialog=T(n,{optional:true,skipSelf:true});_idGenerator=T(ut);_injector=T(le);_dialog=T(pi);_animationsDisabled=gt();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new ne;_afterOpenedAtThisLevel=new ne;dialogConfigClass=Ge;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=Ig(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Bl(void 0)));constructor(){this._dialogRefConstructor=Y,this._dialogContainerType=sn,this._dialogDataToken=rn;}open(e,t){let i;t=w(w({},this._defaultOptions||new Ge),t),t.id=t.id||this._idGenerator.getId("mat-mdc-dialog-"),t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let a=this._dialog.open(e,x$1(w({},t),{positionStrategy:Is(this._injector).centerHorizontally().centerVertically(),disableClose:true,closePredicate:void 0,closeOnDestroy:false,closeOnOverlayDetachments:false,disableAnimations:this._animationsDisabled||t.enterAnimationDuration?.toLocaleString()==="0"||t.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:H,useValue:t}]},templateContext:()=>({dialogRef:i}),providers:(s,l,d)=>(i=new this._dialogRefConstructor(s,t,d),i.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:d},{provide:this._dialogDataToken,useValue:l.data},{provide:this._dialogRefConstructor,useValue:i}])}));return i.componentRef=a.componentRef,i.componentInstance=a.componentInstance,this.openDialogs.push(i),this.afterOpened.next(i),i.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(i);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next());}),i}closeAll(){this._closeDialogs(this.openDialogs);}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete();}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close();}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr({token:n,factory:n.\u0275fac})}return n})(),yi=(()=>{class n{dialogRef=T(Y,{optional:true});_elementRef=T(Tr);_dialog=T(Ve);ariaLabel;type="button";dialogResult;_matDialogClose;ngOnInit(){this.dialogRef||(this.dialogRef=Ti(this._elementRef,this._dialog.openDialogs));}ngOnChanges(e){let t=e._matDialogClose;t&&(this.dialogResult=t.currentValue);}_onButtonClick(e){this._elementRef.nativeElement.getAttribute("aria-disabled")!=="true"&&vi(this.dialogRef,e.screenX===0&&e.screenY===0?"keyboard":"mouse",this.dialogResult);}static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(t,i){t&1&&ih("click",function(s){return i._onButtonClick(s)}),t&2&&Kp("aria-label",i.ariaLabel||null)("type",i.type);},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",dialogResult:[0,"mat-dialog-close","dialogResult"],_matDialogClose:[0,"matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[Pm]})}return n})(),bi=(()=>{class n{_dialogRef=T(Y,{optional:true});_elementRef=T(Tr);_dialog=T(Ve);ngOnInit(){this._dialogRef||(this._dialogRef=Ti(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd();});}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove();});}static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n})}return n})(),wi=(()=>{class n extends bi{id=T(ut).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id);}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id);}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(n)))(i||n)}})();static \u0275dir=CE({type:n,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(t,i){t&2&&rh("id",i.id);},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[Wp]})}return n})(),Ci=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[NE([As])]})}return n})(),Di=(()=>{class n extends bi{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1);}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1);}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(n)))(i||n)}})();static \u0275dir=CE({type:n,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(t,i){t&2&&gh("mat-mdc-dialog-actions-align-start",i.align==="start")("mat-mdc-dialog-actions-align-center",i.align==="center")("mat-mdc-dialog-actions-align-end",i.align==="end");},inputs:{align:"align"},features:[Wp]})}return n})();function Ti(n,o){let e=n.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?o.find(t=>t.id===e.id):null}var dn=["switch"],mn=["*"];function hn(n,o){n&1&&(wi$1(0,"span",11),Uu(),wi$1(1,"svg",13),Xp(2,"path",14),Hc(),wi$1(3,"svg",15),Xp(4,"path",16),Hc()());}var pn=new S("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:false,hideIcon:false,disabledInteractive:false})}),We=class{source;checked;constructor(o,e){this.source=o,this.checked=e;}},Si=(()=>{class n{_elementRef=T(Tr);_focusMonitor=T(yn$1);_changeDetectorRef=T(kF);defaults=T(pn);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=false;_createChangeEvent(e){return new We(this,e)}_labelId;get buttonId(){return `${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus();}_noopAnimations=gt();_focused=false;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=false;color;disabled=false;disableRipple=false;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck();}hideIcon;disabledInteractive;change=new qe;toggleChange=new qe;get inputId(){return `${this.id||this._uniqueId}-input`}constructor(){T(K).load(yo);let e=T(new Fh("tabindex"),{optional:true}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||"accent",this.id=this._uniqueId=T(ut).getId("mat-mdc-slide-toggle-"),this.hideIcon=t.hideIcon??false,this.disabledInteractive=t.disabledInteractive??false,this._labelId=this._uniqueId+"-label";}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,true).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=true,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=false,this._onTouched(),this._changeDetectorRef.markForCheck();});});}ngOnChanges(e){e.required&&this._validatorOnChange();}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef);}writeValue(e){this.checked=!!e;}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}validate(e){return this.required&&e.value!==true?{required:true}:null}registerOnValidatorChange(e){this._validatorOnChange=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck();}toggle(){this.checked=!this.checked,this._onChange(this.checked);}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked));}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new We(this,this.checked))));}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["mat-slide-toggle"]],viewQuery:function(t,i){if(t&1&&lh(dn,5),t&2){let a;fD(a=pD())&&(i._switchElement=a.first);}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(t,i){t&2&&(rh("id",i.id),Kp("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),_D(i.color?"mat-"+i.color:""),gh("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations));},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",PF],color:"color",disabled:[2,"disabled","disabled",PF],disableRipple:[2,"disableRipple","disableRipple",PF],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:LF(e)],checked:[2,"checked","checked",PF],hideIcon:[2,"hideIcon","hideIcon",PF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",PF]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[zD([{provide:To,useExisting:Eo(()=>n),multi:true},{provide:Ue,useExisting:n,multi:true}]),Pm],ngContentSelectors:mn,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,i){if(t&1&&(lD(),wi$1(0,"div",1)(1,"button",2,0),ih("click",function(){return i._handleClick()}),Xp(3,"div",3)(4,"span",4),wi$1(5,"span",5)(6,"span",6)(7,"span",7),Xp(8,"span",8),Hc(),wi$1(9,"span",9),Xp(10,"span",10),Hc(),ZE(11,hn,5,0,"span",11),Hc()()(),wi$1(12,"label",12),ih("click",function(s){return s.stopPropagation()}),uD(13),Hc()()),t&2){let a=gD(2);Jp("labelPosition",i.labelPosition),Hv(),gh("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled)("mat-mdc-slide-toggle-disabled-interactive",i.disabledInteractive),Jp("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("disabled",i.disabled&&!i.disabledInteractive),Kp("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),Hv(9),Jp("matRippleTrigger",a)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",true),Hv(),YE(i.hideIcon?-1:11),Hv(),Jp("for",i.buttonId),Kp("id",i._labelId);}},dependencies:[Xc,Pt],styles:[`.mdc-switch {
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
  width: var(--mat-slide-toggle-track-width, 52px);
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
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
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
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
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
  width: calc(100% - var(--mat-slide-toggle-handle-width));
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
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
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
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
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
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
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
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
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
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
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
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
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
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
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
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})}return n})();var Ai=(()=>{class n{constructor(){this.customTitle="",this.customText="",this.includeContact=false,this.includeCv=false,this.includeStatement=false,this.isSubmitting=false,this.dialogRef=T(Y);}submit(){this.isSubmitting=true;let e={customTitle:this.customTitle,customText:this.customText,includeContact:this.includeContact,includeCv:this.includeCv,includeStatement:this.includeStatement};this.dialogRef.close(e);}static{this.\u0275fac=function(t){return new(t||n)};}static{this.\u0275cmp=IE({type:n,selectors:[["app-dossier-options-modal"]],decls:32,vars:18,consts:[["mat-dialog-title",""],[1,"form-group"],[1,"pdf-options-group"],[3,"ngModelChange","ngModel"],["appearance","outline"],["matInput","","placeholder","Enter a title",3,"ngModelChange","ngModel"],["matInput","","rows","4","placeholder","Add custom text",3,"ngModelChange","ngModel"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(t,i){t&1&&(wi$1(0,"h2",0),FD(1,"Dossier Options"),Hc(),wi$1(2,"mat-dialog-content")(3,"div",1)(4,"div",2)(5,"mat-slide-toggle",3),bh("ngModelChange",function(s){return $D(i.includeContact,s)||(i.includeContact=s),s}),FD(6,"Include contact info"),Hc(),xI(),Hc(),wi$1(7,"div",2)(8,"mat-slide-toggle",3),bh("ngModelChange",function(s){return $D(i.includeCv,s)||(i.includeCv=s),s}),FD(9,"Include CV"),Hc(),xI(),Hc(),wi$1(10,"div",2)(11,"mat-slide-toggle",3),bh("ngModelChange",function(s){return $D(i.includeStatement,s)||(i.includeStatement=s),s}),FD(12,"Include Statement"),Hc(),xI(),Hc(),wi$1(13,"div",2)(14,"mat-form-field",4)(15,"mat-label"),FD(16,"Custom Title"),Hc(),wi$1(17,"input",5),bh("ngModelChange",function(s){return $D(i.customTitle,s)||(i.customTitle=s),s}),Hc(),xI(),Hc()(),wi$1(18,"div",2)(19,"mat-form-field",4)(20,"mat-label"),FD(21,"Custom Text"),Hc(),wi$1(22,"textarea",6),bh("ngModelChange",function(s){return $D(i.customText,s)||(i.customText=s),s}),Hc(),xI(),Hc()()()(),wi$1(23,"mat-dialog-actions",7)(24,"button",8),KD(25,"translate"),FD(26),KD(27,"translate"),Hc(),wi$1(28,"button",9),KD(29,"translate"),ih("click",function(){return i.submit()}),FD(30),KD(31,"translate"),Hc()()),t&2&&(Hv(5),Ch("ngModel",i.includeContact),RI(),Hv(3),Ch("ngModel",i.includeCv),RI(),Hv(3),Ch("ngModel",i.includeStatement),RI(),Hv(6),Ch("ngModel",i.customTitle),RI(),Hv(5),Ch("ngModel",i.customText),RI(),Hv(2),Kp("aria-label",XD(25,10,"cancel")),Hv(2),qc(" ",XD(27,12,"cancel")," "),Hv(2),Jp("disabled",i.isSubmitting),Kp("aria-label",XD(29,14,"download.portfolio")),Hv(2),qc(" ",XD(31,16,"download.portfolio")," "));},dependencies:[wi,Ci,Si,Wu$1,Po,Hu,Cs,wa,Mn,Jt,Di,xu,yi,iu],styles:[".pdf-options-group[_ngcontent-%COMP%]{margin-bottom:1em;width:100%}"]});}}return n})();function un(n){return new Promise((o,e)=>{let t=new Image;t.crossOrigin="anonymous",t.src=n,t.onload=()=>o(t),t.onerror=()=>e(new Error(`Could not load image: ${n}`));})}function ot(n){return C(this,null,function*(){for(let o of n)try{return yield un(o)}catch(e){}throw new Error("No image source could be loaded.")})}function ki(n,o,e){let t=n.width/n.height,i=Math.min(n.width,o*4),a=i/t;return a>e*4&&(a=e*4,i=a*t),gn(n,i,a).toDataURL("image/jpeg",.8)}function Ii(n,o=1200,e=2.2){let t=Math.min(n.width,n.height)/e,i=(n.width-t)*Math.random(),a=(n.height-t)*Math.random(),s=document.createElement("canvas");s.width=o,s.height=o;let l=s.getContext("2d");l.drawImage(n,i,a,t,t,0,0,o,o);let d=l.getImageData(0,0,o,o),p=d.data;for(let w=0;w<p.length;w+=4){let x=.299*p[w]+.587*p[w+1]+.114*p[w+2];p[w]=p[w+1]=p[w+2]=x;}return l.putImageData(d,0,0),s.toDataURL("image/jpeg",.82)}function gn(n,o,e){let t=document.createElement("canvas");return t.width=o,t.height=e,t.getContext("2d").drawImage(n,0,0,o,e),t}var Xe={format:[210,210],margin:24},v={ink:"#1f1f1f",soft:"#6e6e6e",faint:"#a3a3a3",white:"#ffffff",accent:"#cf2525"},f={font:"helvetica",size:{coverTitle:27,coverArtist:10,heading:11,title:11,body:9.5,caption:8.5,small:7.5},lineHeight:{body:5.4,heading:7},wideCharSpace:1.6};var Ye=class n{constructor(o){this.doc=new o({unit:"mm",format:Xe.format}),this.y=Xe.margin;}get margin(){return Xe.margin}get pageWidth(){return this.doc.internal.pageSize.getWidth()}get pageHeight(){return this.doc.internal.pageSize.getHeight()}get contentWidth(){return this.pageWidth-2*this.margin}get centerX(){return this.pageWidth/2}newPage(){this.doc.addPage(),this.y=this.margin;}ensureRoom(o){this.y+o>this.pageHeight-this.margin&&this.newPage();}space(o){this.y+=o;}paragraph(o,e={}){let{charSpace:t=0,lineHeight:i=f.lineHeight.body,align:a="left",maxWidth:s=this.contentWidth}=e;this.applyStyle(e);let l=e.x??(a==="center"?this.centerX:this.margin),d=this.doc.splitTextToSize(n.stripHtml(o),s);for(let p of d)this.ensureRoom(i),this.drawLine(p,l,this.y,a,t),this.y+=i;}heading(o,e={}){this.paragraph(o.toUpperCase(),w({size:f.size.heading,color:v.soft,charSpace:f.wideCharSpace,lineHeight:f.lineHeight.heading},e));}textAt(o,e,t,i={}){this.applyStyle(i),this.drawLine(n.stripHtml(o),e,t,i.align??"left",i.charSpace??0);}textWidth(o,e={}){this.applyStyle(e);let t=n.stripHtml(o);return this.doc.getTextWidth(t)+(e.charSpace??0)*Math.max(t.length-1,0)}addPageNumbers(o=true){let e=this.doc.getNumberOfPages();for(let t=o?2:1;t<=e;t++)this.doc.setPage(t),this.applyStyle({size:f.size.small,color:v.faint}),this.doc.text(String(t-(o?1:0)),this.centerX,this.pageHeight-9,{align:"center"});this.doc.setPage(e);}applyStyle({size:o=f.size.body,style:e="normal",color:t=v.ink}){this.doc.setFont(f.font,e),this.doc.setFontSize(o),this.doc.setTextColor(t);}drawLine(o,e,t,i,a){if(i==="center"&&a>0){let s=this.doc.getTextWidth(o)+a*Math.max(o.length-1,0);this.doc.text(o,e-s/2,t,{charSpace:a});}else this.doc.text(o,e,t,{align:i,charSpace:a});}static stripHtml(o){return o.replace(/<[^>]*(>|$)/g,"").trim()}};var fn=16,Pi=.4,Mi=130,Ei=(()=>{class n{constructor(){this.artworkService=T(Rt),this.translateService=T(Nt);}loadJspdf(){return C(this,null,function*(){return this.jspdf??=yield import('./chunk-Bx_UZkb2.js').then(function(n){return n.c})})}newWriter(){return C(this,null,function*(){let{jsPDF:e}=yield this.loadJspdf();return new Ye(e)})}createTechnicalSheet(e){return C(this,null,function*(){let t=yield this.newWriter();return yield this.addArtworkPage(t,e),t.doc})}createDossier(e,t,i,a,s,l){return C(this,null,function*(){let d=yield this.newWriter();yield this.addCover(d,e,s),l&&(d.newPage(),this.addCustomText(d,l)),a&&(d.newPage(),this.addStatement(d));for(let p of e)d.newPage(),yield this.addArtworkPage(d,p);return i&&(d.newPage(),this.addCv(d)),t&&(d.newPage(),this.addContact(d)),d.addPageNumbers(),d.doc})}createStatement(){return C(this,null,function*(){let e=yield this.newWriter();return this.addStatement(e),e.doc})}createCV(){return C(this,null,function*(){let e=yield this.newWriter();return this.addCv(e),e.doc})}addCover(e,t,i){return C(this,null,function*(){let{GState:a}=yield this.loadJspdf(),s=t[Math.floor(Math.random()*t.length)],l=yield ot(this.artworkService.getNftFetchableUrls(s.image)),d=Ii(l),{doc:p,pageWidth:w,pageHeight:x,margin:R}=e;p.addImage(d,"JPEG",0,0,w,x),p.saveGraphicsState(),p.setGState(new a({opacity:.35})),p.setFillColor("#000000"),p.rect(0,x-72,w,72,"F"),p.restoreGraphicsState(),e.textAt("JUANMA MORENO S\xC1NCHEZ",R,R,{size:f.size.coverArtist,color:v.white,charSpace:f.wideCharSpace}),e.textAt(i||"Portfolio",R,x-R-10,{size:f.size.coverTitle,color:v.white}),e.textAt(String(new Date().getFullYear()),R,x-R,{size:f.size.caption,color:v.white,charSpace:f.wideCharSpace});})}addArtworkPage(e,t){return C(this,null,function*(){let{doc:i,pageWidth:a,pageHeight:s,margin:l,contentWidth:d}=e,p=s-2*l-fn,w=yield ot(this.artworkService.getNftFetchableUrls(t.image)),x=ki(w,d,p),{width:R,height:xi}=i.getImageProperties(x),st=R/xi,ye=d,le=ye/st;le>p&&(le=p,ye=le*st);let Oi=(a-ye)/2,Ri=l+(p-le)/2;i.addImage(x,"JPEG",Oi,Ri,ye,le);let rt=s-l-6,lt=rt+5;e.textAt(t.name??"",e.centerX,rt,{size:f.size.title,style:"italic",align:"center"});let ct=this.getTraitsAsText(t);if(e.textAt(ct,e.centerX,lt,{size:f.size.caption,color:v.soft,align:"center",charSpace:Pi}),At.includes(t.tokenId)){let Li=e.textWidth(ct,{size:f.size.caption,charSpace:Pi});i.setFillColor(v.accent),i.circle(e.centerX+Li/2+4,lt-1,1.2,"F");}})}addCustomText(e,t){this.beginTextColumn(e),e.paragraph(t,this.textColumnStyle(e));}addStatement(e){let t=this.textColumnStyle(e);this.beginTextColumn(e),e.paragraph(this.translateService.instant(tt.introduction.content),t),e.space(8),tt.sections.forEach(i=>{e.ensureRoom(24),e.heading(this.translateService.instant(i.title),{x:t.x}),e.space(2),i.content?.forEach(a=>{e.paragraph(this.translateService.instant(a),t),e.space(3);}),i.items?.forEach(a=>{e.ensureRoom(14),e.paragraph(this.translateService.instant(a.subtitle),x$1(w({},t),{style:"italic"})),e.paragraph(this.translateService.instant(a.content),x$1(w({},t),{color:v.soft})),e.space(4);}),e.space(6);});}addCv(e){let i=e.margin+18,a=e.contentWidth-18;hi.forEach(s=>{e.ensureRoom(26),e.heading(this.translateService.instant(s.title)),e.space(3),s.items.forEach(l=>{e.ensureRoom(12),e.textAt(String(l.year),e.margin,e.y,{size:f.size.caption,color:v.faint}),e.paragraph(this.translateService.instant(l.title),{x:i,maxWidth:a,style:"italic",lineHeight:4.8});let d=[l.venue&&this.translateService.instant(l.venue),l.city,this.translateService.instant(l.country)].filter(Boolean).join(", ");e.paragraph(d,{x:i,maxWidth:a,size:f.size.caption,color:v.soft,lineHeight:4.4}),e.space(3);}),e.space(9);});}addContact(e){e.y=70;let t={align:"center",lineHeight:6};e.heading(this.translateService.instant("contact.title"),{align:"center"}),e.space(6),e.paragraph("Juanma Moreno S\xE1nchez",t),e.paragraph("(+34) 635820462",x$1(w({},t),{color:v.soft})),e.paragraph("morenosanchezjuanma@gmail.com",x$1(w({},t),{color:v.soft})),e.paragraph("www.juanmamoreno.com",x$1(w({},t),{color:v.soft})),e.space(14),e.paragraph(this.translateService.instant("contact.representedBy"),x$1(w({},t),{size:f.size.caption,color:v.faint})),e.space(2),e.paragraph("(+34) 606780084",x$1(w({},t),{color:v.soft})),e.paragraph("galeriazunino@gmail.com",x$1(w({},t),{color:v.soft})),e.paragraph("www.galeriazunino.com",x$1(w({},t),{color:v.soft}));}beginTextColumn(e){e.space(6);}textColumnStyle(e){return {x:(e.pageWidth-Mi)/2,maxWidth:Mi,lineHeight:f.lineHeight.body}}getTraitsAsText(e){let t=s=>this.artworkService.getTraitValue(e,s),i=this.translateService.instant(t(nt$1.MEDIUM)),a=`${t(nt$1.HEIGHT)} \xD7 ${t(nt$1.WIDTH)} ${t(nt$1.UNIT)}`;return `${t(nt$1.YEAR)} \xB7 ${i} \xB7 ${a}`}static{this.\u0275fac=function(t){return new(t||n)};}static{this.\u0275prov=re({token:n,factory:n.\u0275fac,providedIn:"root"});}}return n})();function vn(n,o){n&1&&(wi$1(0,"mat-icon"),FD(1,"assignment"),Hc());}function yn(n,o){n&1&&Xp(0,"mat-progress-spinner",1);}var Wo=(()=>{class n{constructor(){this.translateService=T(Nt),this.pdfService=T(Ei),this.dialog=T(Ve),this.snackBar=T(bt),this.nfts=NF([]),this.downloadFileType=NF(O.IMAGE),this.isCreating=Fe(false),this.isSingleArtPage=dt(()=>this.nfts().length<=1);}getTooltip(){switch(this.downloadFileType()){case O.CV:return this.translateService.instant("download.cv");case O.STATEMENT:return this.translateService.instant("download.statement");case O.IMAGE:default:return this.isSingleArtPage()?this.translateService.instant("download.sheet"):this.translateService.instant("download.portfolio")}}createPDF(){switch(this.isCreating.set(true),this.downloadFileType()){case O.CV:this.saveDocument(this.pdfService.createCV(),"cv-juanmamoreno.pdf");break;case O.STATEMENT:this.saveDocument(this.pdfService.createStatement(),"statement-juanmamoreno.pdf");break;case O.IMAGE:default:if(this.isSingleArtPage()){let e=this.nfts()[0];this.saveDocument(this.pdfService.createTechnicalSheet(e),`${e.name||"juanmamoreno"}.pdf`);}else this.openDossierDialog();break}}openDossierDialog(){this.dialog.open(Ai,{data:{includeContact:true,includeCv:true,includeStatement:true,customTitle:"",customText:""}}).afterClosed().subscribe(t=>{if(t){let{includeContact:i,includeCv:a,includeStatement:s,customTitle:l,customText:d}=t;this.saveDocument(this.pdfService.createDossier(this.nfts(),i,a,s,l,d),"dossier-juanmamoreno.pdf");}else this.isCreating.set(false);});}saveDocument(e,t){e.then(i=>{i.save(t),this.showToast("download.success");}).catch(()=>this.showToast("download.error")).finally(()=>this.isCreating.set(false));}showToast(e){this.snackBar.open(this.translateService.instant(e),"Ok!",{duration:3e3,verticalPosition:"top"});}static{this.\u0275fac=function(t){return new(t||n)};}static{this.\u0275cmp=IE({type:n,selectors:[["app-pdf-button"]],inputs:{nfts:[1,"nfts"],downloadFileType:[1,"downloadFileType"]},decls:3,vars:4,consts:[["mat-icon-button","","matTooltipPosition","below",3,"click","disabled","matTooltip"],["diameter","24","mode","indeterminate"]],template:function(t,i){t&1&&(wi$1(0,"button",0),ih("click",function(){return i.createPDF()}),ZE(1,vn,2,0,"mat-icon")(2,yn,1,0,"mat-progress-spinner",1),Hc()),t&2&&(Jp("disabled",i.isCreating())("matTooltip",i.getTooltip()),Kp("aria-label",i.getTooltip()),Hv(),YE(i.isCreating()?2:1));},dependencies:[Ia,et,Mt,ci],encapsulation:2});}}return n})();export{Ci as C,Di as D,O,Ve as V,Wo as W,Y,ci as c,et as e,hi as h,rn as r,tt as t,wi as w};