import{i as u$3,n as s$1,r as t,t as r$2}from"./chunk-Ch7qlBDL.js";import{$ as OM,$t as ao$3,An as h_,At as Vm,B as Jw,Bn as iu,Br as vb,Ct as Ub,D as Gm,Dr as sf,Dt as V$4,E as GV,En as gm,Er as sC,Et as Uy,F as J$4,Fr as uI,Ft as XV,G as Ky,Gn as jy,Gr as wn$1,H as KV,Hn as jV,Hr as vm,I as JV,In as hy,It as Xl,J as Ly,Jn as ky,Jr as xe$1,Kr as x$2,Kt as Ze$2,L as Jr$2,Lr as um,M as Hy,Mn as hd,Mr as tt$6,N as Ib,Nn as he$2,Nr as tw,O as Gp,On as gy,Or as sr$2,Ot as VV,P as Iu,Pr as uD,Pt as Wr$2,Q as Ns$1,Qn as li$2,Qt as ac,R as Js$1,Rn as ib,Rr as uo$2,Rt as Xu,S as Ey,Sn as fd,Sr as rn$3,Tn as gd,Tr as ry,Tt as Um,U as Kr$2,Un as je$1,Ur as vr$3,V as KC,Vr as ve$1,W as Kw,Wn as jm,Wt as ZV,X as Nl,Xr as xy,Xt as _t$5,Y as NE,Yn as l_,Yr as xm,Z as Nm,Zn as ld,Zr as y$3,Zt as a_,_ as Dt$3,_n as eu,_t as Sm,a as AM,ai as z$3,ar as nn$3,at as Pm,bn as f_,bt as Te$1,c as Ar$2,ci as zm,cn as cd,cr as o_,ct as Qn$1,d as Bi$2,dr as ou,dt as Rd,ei as yb,en as as$2,er as me$2,f as Bm,fn as dd,ft as Rm,g as De$1,gn as ea,gr as pd,gt as SE,h as Ce$1,hn as e_,hr as p_,ht as S$2,i as $m,in as cC,ir as ni$3,j as Hi$2,jn as hb,jr as tn$3,jt as Vy,k as Gr$2,kn as hC,kr as su,kt as Ve$3,l as Ay,li as zw,lr as of,lt as Qw,m as By,mn as di$2,mt as Ry,n as $e$3,ni as ym,nn as bn$3,nr as my,nt as Ow,o as Ab,oi as ze$1,on as cT,or as nr$2,ot as QV,p as Bv,pn as de$3,pt as Rt$2,q as Lt$4,qn as kt$2,qr as xE,qt as Zw,r as $h,rn as bt$4,rr as ne$2,rt as Oy,s as Am,si as zi$2,sr as nv,st as Qm,t as $V,ti as yf,tr as mu,u as BV,ur as or$2,v as Dv,vn as ew,vr as qE,vt as Sy,wn as gb,wr as rw,wt as Uc,xn as fb,xr as ra,xt as Tt$6,y as Eb,yt as T$3,z as Ju,zn as it$6,zr as uu,zt as YC}from"./chunk-DyYb3Cbq.js";import{_ as xi$4,c as Tn$1,d as it$7,f as ne$3,h as re$2,m as qt$4,o as Sn$3,s as St$2,u as _n$3}from"./chunk-BPnDgTYp.js";import{a as it$8,i as cn$3,n as Q$5,o as ln$3,r as an$3,s as sn$3,t as Je$1}from"./chunk-Bcoe1H46.js";import{A as ni$4,B as z$4,C as ai$2,D as ii$2,E as fi$4,I as vi$3,L as x$3,M as p$1,N as pt$5,O as kt$3,P as rn$4,R as y$4,S as aa,T as ar$2,V as zn$1,_ as X$4,a as Ct$2,b as Z$5,d as Ot$4,f as Pn$1,g as W$3,h as Ut$3,i as Ce$2,j as nn$4,k as mt$4,l as Le$1,m as Sn$4,n as $o$3,o as Di$3,p as Rt$3,r as At$2,s as I$4,t as $e$4,u as Mt$3,v as Y$4,x as Za,y as Ye$1,z as yn$3}from"./chunk-v-WN8rat.js";import{r as P$3,t as $$3}from"./chunk-CBpfFXcC.js";var qt$3=20;var U$4=(()=>{class o{_ngZone=y$3(Ce$1);_platform=y$3(p$1);_renderer=y$3(Wr$2).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new ne$2;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let i=this.scrollContainers.get(t);i&&(i.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=qt$3){return this._platform.isBrowser?new x$2(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen(`document`,`scroll`,()=>this._scrolled.next())));let n=t>0?this._scrolled.pipe(Ry(t)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{n.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):hy()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(t,i){let n=this.getAncestorScrollContainers(t);return this.scrolled(i).pipe(bn$3(s=>!s||n.indexOf(s)>-1))}getAncestorScrollContainers(t){let i=[];return this.scrollContainers.forEach((n,s)=>{this._targetContainsElement(s,t)&&i.push(s)}),i}_targetContainsElement(t,i){let n=x$3(i),s=t.getElementRef().nativeElement;do if(n==s)return!0;while(n=n.parentElement);return!1}static ɵfac=function(i){return new(i||o)};static ɵprov=Kr$2({token:o,factory:o.ɵfac})}return o})();var Qt$3=(()=>{class o{elementRef=y$3(Jr$2);scrollDispatcher=y$3(U$4);ngZone=y$3(Ce$1);dir=y$3(zn$1,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new ne$2;_renderer=y$3(Uc);_cleanupScroll;_elementScrolled=new ne$2;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,`scroll`,t=>this._elementScrolled.next(t))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(t){let i=this.elementRef.nativeElement,n=this.dir&&this.dir.value==`rtl`;t.left??=n?t.end:t.start,t.right??=n?t.start:t.end,t.bottom!=null&&(t.top=i.scrollHeight-i.clientHeight-t.bottom),n&&ai$2()!=Y$4.NORMAL?(t.left!=null&&(t.right=i.scrollWidth-i.clientWidth-t.left),ai$2()==Y$4.INVERTED?t.left=t.right:ai$2()==Y$4.NEGATED&&(t.left=t.right?-t.right:t.right)):t.right!=null&&(t.left=i.scrollWidth-i.clientWidth-t.right),this._applyScrollToOptions(t)}_applyScrollToOptions(t){let i=this.elementRef.nativeElement;ni$4()?i.scrollTo(t):(t.top!=null&&(i.scrollTop=t.top),t.left!=null&&(i.scrollLeft=t.left))}measureScrollOffset(t){let i=`left`,n=`right`,s=this.elementRef.nativeElement;if(t==`top`)return s.scrollTop;if(t==`bottom`)return s.scrollHeight-s.clientHeight-s.scrollTop;let r=this.dir&&this.dir.value==`rtl`;return t==`start`?t=r?n:i:t==`end`&&(t=r?i:n),r&&ai$2()==Y$4.INVERTED?t==i?s.scrollWidth-s.clientWidth-s.scrollLeft:s.scrollLeft:r&&ai$2()==Y$4.NEGATED?t==i?s.scrollLeft+s.scrollWidth-s.clientWidth:-s.scrollLeft:t==i?s.scrollLeft:s.scrollWidth-s.clientWidth-s.scrollLeft}static ɵfac=function(i){return new(i||o)};static ɵdir=ew({type:o,selectors:[[``,`cdk-scrollable`,``],[``,`cdkScrollable`,``]]})}return o})();var Jt$2=20;var T$2=(()=>{class o{_platform=y$3(p$1);_listeners;_viewportSize=null;_change=new ne$2;_document=y$3(tn$3);constructor(){let t=y$3(Ce$1),i=y$3(Wr$2).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let n=s=>this._change.next(s);this._listeners=[i.listen(`window`,`resize`,n),i.listen(`window`,`orientationchange`,n)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:i,height:n}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+n,right:t.left+i,height:n,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,i=this._getWindow(),n=t.documentElement,s=n.getBoundingClientRect();return{top:-s.top||t.body?.scrollTop||i.scrollY||n.scrollTop||0,left:-s.left||t.body?.scrollLeft||i.scrollX||n.scrollLeft||0}}change(t=Jt$2){return t>0?this._change.pipe(Ry(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}static ɵfac=function(i){return new(i||o)};static ɵprov=Kr$2({token:o,factory:o.ɵfac})}return o})();var L$4=class{_attachedHost=null;attach(e){return this._attachedHost=e,e.attach(this)}detach(){let e=this._attachedHost;e!=null&&(this._attachedHost=null,e.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(e){this._attachedHost=e}};var pt$4=class extends L$4{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(e,t,i,n,s,r){super(),this.component=e,this.viewContainerRef=t,this.injector=i,this.projectableNodes=n,this.bindings=s||null,this.directives=r||null}};var N$3=class extends L$4{templateRef;viewContainerRef;context;injector;constructor(e,t,i,n){super(),this.templateRef=e,this.viewContainerRef=t,this.context=i,this.injector=n}get origin(){return this.templateRef.elementRef}attach(e,t=this.context){return this.context=t,super.attach(e)}detach(){return this.context=void 0,super.detach()}};var _t$4=class extends L$4{element;constructor(e){super(),this.element=e instanceof Jr$2?e.nativeElement:e}};var G$6=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(e){if(e instanceof pt$4)return this._attachedPortal=e,this.attachComponentPortal(e);if(e instanceof N$3)return this._attachedPortal=e,this.attachTemplatePortal(e);if(this.attachDomPortal&&e instanceof _t$4)return this._attachedPortal=e,this.attachDomPortal(e)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(e){this._disposeFn=e}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var $$2=class extends G$6{outletElement;_appRef;_defaultInjector;constructor(e,t,i){super(),this.outletElement=e,this._appRef=t,this._defaultInjector=i}attachComponentPortal(e){let t;if(e.viewContainerRef){let i=e.injector||e.viewContainerRef.injector,n=i.get(Qn$1,null,{optional:!0})||void 0;t=e.viewContainerRef.createComponent(e.component,{index:e.viewContainerRef.length,injector:i,ngModuleRef:n,projectableNodes:e.projectableNodes||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0}),this.setDisposeFn(()=>t.destroy())}else{let i=this._appRef,n=e.injector||this._defaultInjector||ve$1.NULL,s=n.get(me$2,i.injector);t=XV(e.component,{elementInjector:n,environmentInjector:s,projectableNodes:e.projectableNodes||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0}),i.attachView(t.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(t.hostView),t.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(t)),this._attachedPortal=e,t}attachTemplatePortal(e){let t=e.viewContainerRef,i=t.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return i.rootNodes.forEach(n=>this.outletElement.appendChild(n)),i.detectChanges(),this.setDisposeFn(()=>{let n=t.indexOf(i);n!==-1&&t.remove(n)}),this._attachedPortal=e,i}attachDomPortal=e=>{let t=e.element;t.parentNode;let i=this.outletElement.ownerDocument.createComment(`dom-portal`);t.parentNode.insertBefore(i,t),this.outletElement.appendChild(t),this._attachedPortal=e,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(t,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(e){return e.hostView.rootNodes[0]}};var ni$2=(()=>{class o extends G$6{_moduleRef=y$3(Qn$1,{optional:!0});_document=y$3(tn$3);_viewContainerRef=y$3(Ns$1);_isInitialized=!1;_attachedRef=null;get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null)}attached=new tt$6;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(t){t.setAttachedHost(this);let i=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,n=i.createComponent(t.component,{index:i.length,injector:t.injector||i.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(n.hostView.rootNodes[0]),super.setDisposeFn(()=>n.destroy()),this._attachedPortal=t,this._attachedRef=n,this.attached.emit(n),n}attachTemplatePortal(t){t.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=t=>{let i=t.element;i.parentNode;let n=this._document.createComment(`dom-portal`);t.setAttachedHost(this),i.parentNode.insertBefore(n,i),this._getRootNode().appendChild(i),this._attachedPortal=t,super.setDisposeFn(()=>{n.parentNode&&n.parentNode.replaceChild(i,n)})};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static ɵfac=(()=>{let t;return function(n){return(t||(t=uI(o)))(n||o)}})();static ɵdir=ew({type:o,selectors:[[``,`cdkPortalOutlet`,``]],inputs:{portal:[0,`cdkPortalOutlet`,`portal`]},outputs:{attached:`attached`},exportAs:[`cdkPortalOutlet`],features:[gm]})}return o})();var Ft$2=ni$4();function te(o){return new K$2(o.get(T$2),o.get(tn$3))}var K$2=class{_viewportRuler;_previousHTMLStyles={top:``,left:``};_previousScrollPosition;_isEnabled=!1;_document;constructor(e,t){this._viewportRuler=e,this._document=t}attach(){}enable(){if(this._canBeEnabled()){let e=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=e.style.left||``,this._previousHTMLStyles.top=e.style.top||``,e.style.left=fi$4(-this._previousScrollPosition.left),e.style.top=fi$4(-this._previousScrollPosition.top),e.classList.add(`cdk-global-scrollblock`),this._isEnabled=!0}}disable(){if(this._isEnabled){let e=this._document.documentElement,t=this._document.body,i=e.style,n=t.style,s=i.scrollBehavior||``,r=n.scrollBehavior||``;this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,e.classList.remove(`cdk-global-scrollblock`),Ft$2&&(i.scrollBehavior=n.scrollBehavior=`auto`),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Ft$2&&(i.scrollBehavior=s,n.scrollBehavior=r)}}_canBeEnabled(){if(this._document.documentElement.classList.contains(`cdk-global-scrollblock`)||this._isEnabled)return!1;let t=this._document.documentElement,i=this._viewportRuler.getViewportSize();return t.scrollHeight>i.height||t.scrollWidth>i.width}};var q$3=class{enable(){}disable(){}attach(){}};function gt$5(o,e){return e.some(t=>{let i=o.bottom<t.top,n=o.top>t.bottom,s=o.right<t.left,r=o.left>t.right;return i||n||s||r})}function Tt$5(o,e){return e.some(t=>{let i=o.top<t.top,n=o.bottom>t.bottom,s=o.left<t.left,r=o.right>t.right;return i||n||s||r})}function Yt$3(o,e){return new Q$4(o.get(U$4),o.get(T$2),o.get(Ce$1),e)}var Q$4=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(e,t,i,n){this._scrollDispatcher=e,this._viewportRuler=t,this._ngZone=i,this._config=n}attach(e){this._overlayRef,this._overlayRef=e}enable(){if(!this._scrollSubscription){let e=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(e).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let t=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:n}=this._viewportRuler.getViewportSize();gt$5(t,[{width:i,height:n,bottom:n,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}};var z$2=class{positionStrategy;scrollStrategy=new q$3;panelClass=``;hasBackdrop=!1;backdropClass=`cdk-overlay-dark-backdrop`;disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(e){if(e){let t=Object.keys(e);for(let i of t)e[i]!==void 0&&(this[i]=e[i])}}};var J$3=class{connectionPair;scrollableViewProperties;constructor(e,t){this.connectionPair=e,this.scrollableViewProperties=t}};var Ht$3=(()=>{class o{_attachedOverlays=[];_document=y$3(tn$3);_isAttached=!1;ngOnDestroy(){this.detach()}add(t){this.remove(t),this._attachedOverlays.push(t)}remove(t){let i=this._attachedOverlays.indexOf(t);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(t,i,n){return n.observers.length<1?!1:t.eventPredicate?t.eventPredicate(i):!0}static ɵfac=function(i){return new(i||o)};static ɵprov=Kr$2({token:o,factory:o.ɵfac})}return o})();var Xt$3=(()=>{class o extends Ht$3{_ngZone=y$3(Ce$1);_renderer=y$3(Wr$2).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen(`body`,`keydown`,this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=t=>{let i=this._attachedOverlays;for(let n=i.length-1;n>-1;n--){let s=i[n];if(this.canReceiveEvent(s,t,s._keydownEvents)){this._ngZone.run(()=>s._keydownEvents.next(t));break}}};static ɵfac=function(i){return new(i||o)};static ɵprov=Kr$2({token:o,factory:o.ɵfac})}return o})();var jt$3=(()=>{class o extends Ht$3{_platform=y$3(p$1);_ngZone=y$3(Ce$1);_renderer=y$3(Wr$2).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let i=this._document.body,n={capture:!0},s=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[s.listen(i,`pointerdown`,this._pointerDownListener,n),s.listen(i,`click`,this._clickListener,n),s.listen(i,`auxclick`,this._clickListener,n),s.listen(i,`contextmenu`,this._clickListener,n)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor=`pointer`,this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=t=>{this._pointerDownEventTarget=y$4(t)};_clickListener=t=>{let i=y$4(t),n=t.type===`click`&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let s=this._attachedOverlays.slice();for(let r=s.length-1;r>-1;r--){let a=s[r],h=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,t,h))){if(Lt$3(a.overlayElement,i)||Lt$3(a.overlayElement,n))break;this._ngZone?this._ngZone.run(()=>h.next(t)):h.next(t)}}};static ɵfac=function(i){return new(i||o)};static ɵprov=Kr$2({token:o,factory:o.ɵfac})}return o})();function Lt$3(o,e){let t=typeof ShadowRoot<`u`&&ShadowRoot,i=e;for(;i;){if(i===o)return!0;i=t&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var Zt$3=(()=>{class o{static ɵfac=function(i){return new(i||o)};static ɵcmp=YC({type:o,selectors:[[`ng-component`]],hostAttrs:[`cdk-overlay-style-loader`,``],decls:0,vars:0,template:function(i,n){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return o})();var Ut$2=(()=>{class o{_platform=y$3(p$1);_containerElement;_document=y$3(tn$3);_styleLoader=y$3(I$4);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t=`cdk-overlay-container`;if(this._platform.isBrowser||ii$2()){let n=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let s=0;s<n.length;s++)n[s].remove()}let i=this._document.createElement(`div`);i.classList.add(t),ii$2()?i.setAttribute(`platform`,`test`):this._platform.isBrowser||i.setAttribute(`platform`,`server`),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(Zt$3)}static ɵfac=function(i){return new(i||o)};static ɵprov=Kr$2({token:o,factory:o.ɵfac})}return o})();var mt$3=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(e,t,i,n){this._renderer=t,this._ngZone=i,this.element=e.createElement(`div`),this.element.classList.add(`cdk-overlay-backdrop`),this._cleanupClick=t.listen(this.element,`click`,n)}detach(){this._ngZone.runOutsideAngular(()=>{let e=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(e,`transitionend`,this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),e.style.pointerEvents=`none`,e.classList.remove(`cdk-overlay-backdrop-showing`)})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function yt$3(o){return o&&o.nodeType===1}var tt$5=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new ne$2;_attachments=new ne$2;_detachments=new ne$2;_positionStrategy;_scrollStrategy;_locationChanges=J$4.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new ne$2;_outsidePointerEvents=new ne$2;_afterNextRenderRef;constructor(e,t,i,n,s,r,a,h,f,l=!1,d,p){this._portalOutlet=e,this._host=t,this._pane=i,this._config=n,this._ngZone=s,this._keyboardDispatcher=r,this._document=a,this._location=h,this._outsideClickDispatcher=f,this._animationsDisabled=l,this._injector=d,this._renderer=p,n.scrollStrategy&&(this._scrollStrategy=n.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=n.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(e){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(e);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Nl(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof t?.onDestroy==`function`&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let e=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),e}dispose(){if(this._disposed)return;let e=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,e&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(e){e!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=e,this.hasAttached()&&(e.attach(this),this.updatePosition()))}updateSize(e){this._config=r$2(r$2({},this._config),e),this._updateElementSize()}setDirection(e){this._config=s$1(r$2({},this._config),{direction:e}),this._updateElementDirection()}addPanelClass(e){this._pane&&this._toggleClasses(this._pane,e,!0)}removePanelClass(e){this._pane&&this._toggleClasses(this._pane,e,!1)}getDirection(){let e=this._config.direction;return e?typeof e==`string`?e:e.value:`ltr`}updateScrollStrategy(e){e!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=e,this.hasAttached()&&(e.attach(this),e.enable()))}_updateElementDirection(){this._host.setAttribute(`dir`,this.getDirection())}_updateElementSize(){if(!this._pane)return;let e=this._pane.style;e.width=fi$4(this._config.width),e.height=fi$4(this._config.height),e.minWidth=fi$4(this._config.minWidth),e.minHeight=fi$4(this._config.minHeight),e.maxWidth=fi$4(this._config.maxWidth),e.maxHeight=fi$4(this._config.maxHeight)}_togglePointerEvents(e){this._pane.style.pointerEvents=e?``:`none`}_attachHost(){if(!this._host.parentElement){let e=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;yt$3(e)?e.after(this._host):e?.type===`parent`?e.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let e=`cdk-overlay-backdrop-showing`;this._backdropRef?.dispose(),this._backdropRef=new mt$3(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t)}),this._animationsDisabled&&this._backdropRef.element.classList.add(`cdk-overlay-backdrop-noop-animation`),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<`u`?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(e))}):this._backdropRef.element.classList.add(e)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(e,t,i){let n=At$2(t||[]).filter(s=>!!s);n.length&&(i?e.classList.add(...n):e.classList.remove(...n))}_detachContentWhenEmpty(){let e=!1;try{this._detachContentAfterRenderRef=Nl(()=>{e=!0,this._detachContent()},{injector:this._injector})}catch(t){if(e)throw t;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let e=this._scrollStrategy;e?.disable(),e?.detach?.()}};var Nt$2=`cdk-overlay-connected-position-bounding-box`;var ee$1=/([A-Za-z%]+)$/;function Gt$4(o,e){return new et$5(e,o.get(T$2),o.get(tn$3),o.get(p$1),o.get(Ut$2))}var et$5=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new ne$2;_resizeSubscription=J$4.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation=`global`;positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(e,t,i,n,s){this._viewportRuler=t,this._document=i,this._platform=n,this._overlayContainer=s,this.setOrigin(e)}attach(e){this._overlayRef&&this._overlayRef,this._validatePositions(),e.hostElement.classList.add(Nt$2),this._overlayRef=e,this._boundingBox=e.hostElement,this._pane=e.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let e=this._originRect,t=this._overlayRect,i=this._viewportRect,n=this._containerRect,s=[],r;for(let a of this._preferredPositions){let h=this._getOriginPoint(e,n,a),f=this._getOverlayPoint(h,t,a),l=this._getOverlayFit(f,t,i,a);if(l.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,h);return}if(this._canFitWithFlexibleDimensions(l,f,i)){s.push({position:a,origin:h,overlayRect:t,boundingBoxRect:this._calculateBoundingBoxRect(h,a)});continue}(!r||r.overlayFit.visibleArea<l.visibleArea)&&(r={overlayFit:l,overlayPoint:f,originPoint:h,position:a,overlayRect:t})}if(s.length){let a=null,h=-1;for(let f of s){let l=f.boundingBoxRect.width*f.boundingBoxRect.height*(f.position.weight||1);l>h&&(h=l,a=f)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(r.position,r.originPoint);return}this._applyPosition(r.position,r.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&P$2(this._boundingBox.style,{top:``,left:``,right:``,bottom:``,height:``,width:``,alignItems:``,justifyContent:``}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(Nt$2),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let e=this._lastPosition;e?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(e,this._getOriginPoint(this._originRect,this._containerRect,e))):this.apply()}withScrollableContainers(e){return this._scrollables=e,this}withPositions(e){return this._preferredPositions=e,e.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(e){return this._viewportMargin=e,this}withFlexibleDimensions(e=!0){return this._hasFlexibleDimensions=e,this}withGrowAfterOpen(e=!0){return this._growAfterOpen=e,this}withPush(e=!0){return this._canPush=e,this}withLockedPosition(e=!0){return this._positionLocked=e,this}setOrigin(e){return this._origin=e,this}withDefaultOffsetX(e){return this._offsetX=e,this}withDefaultOffsetY(e){return this._offsetY=e,this}withTransformOriginOn(e){return this._transformOriginSelector=e,this}withPopoverLocation(e){return this._popoverLocation=e,this}getPopoverInsertionPoint(){return this._popoverLocation===`global`?null:this._popoverLocation!==`inline`?this._popoverLocation:this._origin instanceof Jr$2?this._origin.nativeElement:yt$3(this._origin)?this._origin:null}_getOriginPoint(e,t,i){let n;if(i.originX==`center`)n=e.left+e.width/2;else{let r=this._isRtl()?e.right:e.left,a=this._isRtl()?e.left:e.right;n=i.originX==`start`?r:a}t.left<0&&(n-=t.left);let s;return i.originY==`center`?s=e.top+e.height/2:s=i.originY==`top`?e.top:e.bottom,t.top<0&&(s-=t.top),{x:n,y:s}}_getOverlayPoint(e,t,i){let n;i.overlayX==`center`?n=-t.width/2:i.overlayX===`start`?n=this._isRtl()?-t.width:0:n=this._isRtl()?0:-t.width;let s;return i.overlayY==`center`?s=-t.height/2:s=i.overlayY==`top`?0:-t.height,{x:e.x+n,y:e.y+s}}_getOverlayFit(e,t,i,n){let s=It$3(t),{x:r,y:a}=e,h=this._getOffset(n,`x`),f=this._getOffset(n,`y`);h&&(r+=h),f&&(a+=f);let l=0-r,d=r+s.width-i.width,p=0-a,g=a+s.height-i.height,_=this._subtractOverflows(s.width,l,d),v=this._subtractOverflows(s.height,p,g),bt=_*v;return{visibleArea:bt,isCompletelyWithinViewport:s.width*s.height===bt,fitsInViewportVertically:v===s.height,fitsInViewportHorizontally:_==s.width}}_canFitWithFlexibleDimensions(e,t,i){if(this._hasFlexibleDimensions){let n=i.bottom-t.y,s=i.right-t.x,r=zt$1(this._overlayRef.getConfig().minHeight),a=zt$1(this._overlayRef.getConfig().minWidth),h=e.fitsInViewportVertically||r!=null&&r<=n,f=e.fitsInViewportHorizontally||a!=null&&a<=s;return h&&f}return!1}_pushOverlayOnScreen(e,t,i){if(this._previousPushAmount&&this._positionLocked)return{x:e.x+this._previousPushAmount.x,y:e.y+this._previousPushAmount.y};let n=It$3(t),s=this._viewportRect,r=Math.max(e.x+n.width-s.width,0),a=Math.max(e.y+n.height-s.height,0),h=Math.max(s.top-i.top-e.y,0),f=Math.max(s.left-i.left-e.x,0),l=0,d=0;return n.width<=s.width?l=f||-r:l=e.x<this._getViewportMarginStart()?s.left-i.left-e.x:0,n.height<=s.height?d=h||-a:d=e.y<this._getViewportMarginTop()?s.top-i.top-e.y:0,this._previousPushAmount={x:l,y:d},{x:e.x+l,y:e.y+d}}_applyPosition(e,t){if(this._setTransformOrigin(e),this._setOverlayElementStyles(t,e),this._setBoundingBoxStyles(t,e),e.panelClass&&this._addPanelClasses(e.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(e!==this._lastPosition||!this._lastScrollVisibility||!ie$1(this._lastScrollVisibility,i)){let n=new J$3(e,i);this._positionChanges.next(n)}this._lastScrollVisibility=i}this._lastPosition=e,this._isInitialRender=!1}_setTransformOrigin(e){if(!this._transformOriginSelector)return;let t=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,n=e.overlayY;e.overlayX===`center`?i=`center`:this._isRtl()?i=e.overlayX===`start`?`right`:`left`:i=e.overlayX===`start`?`left`:`right`;for(let s=0;s<t.length;s++)t[s].style.transformOrigin=`${i} ${n}`}_calculateBoundingBoxRect(e,t){let i=this._viewportRect,n=this._isRtl(),s,r,a;if(t.overlayY===`top`)r=e.y,s=i.height-r+this._getViewportMarginBottom();else if(t.overlayY===`bottom`)a=i.height-e.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),s=i.height-a+this._getViewportMarginTop();else{let g=Math.min(i.bottom-e.y+i.top,e.y),_=this._lastBoundingBoxSize.height;s=g*2,r=e.y-g,s>_&&!this._isInitialRender&&!this._growAfterOpen&&(r=e.y-_/2)}let h=t.overlayX===`start`&&!n||t.overlayX===`end`&&n,f=t.overlayX===`end`&&!n||t.overlayX===`start`&&n,l,d,p;if(f)p=i.width-e.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),l=e.x-this._getViewportMarginStart();else if(h)d=e.x,l=i.right-e.x-this._getViewportMarginEnd();else{let g=Math.min(i.right-e.x+i.left,e.x),_=this._lastBoundingBoxSize.width;l=g*2,d=e.x-g,l>_&&!this._isInitialRender&&!this._growAfterOpen&&(d=e.x-_/2)}return{top:r,left:d,bottom:a,right:p,width:l,height:s}}_setBoundingBoxStyles(e,t){let i=this._calculateBoundingBoxRect(e,t);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let n={};if(this._hasExactPosition())n.top=n.left=`0`,n.bottom=n.right=`auto`,n.maxHeight=n.maxWidth=``,n.width=n.height=`100%`;else{let s=this._overlayRef.getConfig().maxHeight,r=this._overlayRef.getConfig().maxWidth;n.width=fi$4(i.width),n.height=fi$4(i.height),n.top=fi$4(i.top)||`auto`,n.bottom=fi$4(i.bottom)||`auto`,n.left=fi$4(i.left)||`auto`,n.right=fi$4(i.right)||`auto`,t.overlayX===`center`?n.alignItems=`center`:n.alignItems=t.overlayX===`end`?`flex-end`:`flex-start`,t.overlayY===`center`?n.justifyContent=`center`:n.justifyContent=t.overlayY===`bottom`?`flex-end`:`flex-start`,s&&(n.maxHeight=fi$4(s)),r&&(n.maxWidth=fi$4(r))}this._lastBoundingBoxSize=i,P$2(this._boundingBox.style,n)}_resetBoundingBoxStyles(){P$2(this._boundingBox.style,{top:`0`,left:`0`,right:`0`,bottom:`0`,height:``,width:``,alignItems:``,justifyContent:``})}_resetOverlayElementStyles(){P$2(this._pane.style,{top:``,left:``,bottom:``,right:``,position:``,transform:``})}_setOverlayElementStyles(e,t){let i={},n=this._hasExactPosition(),s=this._hasFlexibleDimensions,r=this._overlayRef.getConfig();if(n){let l=this._viewportRuler.getViewportScrollPosition();P$2(i,this._getExactOverlayY(t,e,l)),P$2(i,this._getExactOverlayX(t,e,l))}else i.position=`static`;let a=``,h=this._getOffset(t,`x`),f=this._getOffset(t,`y`);h&&(a+=`translateX(${h}px) `),f&&(a+=`translateY(${f}px)`),i.transform=a.trim(),r.maxHeight&&(n?i.maxHeight=fi$4(r.maxHeight):s&&(i.maxHeight=``)),r.maxWidth&&(n?i.maxWidth=fi$4(r.maxWidth):s&&(i.maxWidth=``)),P$2(this._pane.style,i)}_getExactOverlayY(e,t,i){let n={top:``,bottom:``},s=this._getOverlayPoint(t,this._overlayRect,e);if(this._isPushed&&(s=this._pushOverlayOnScreen(s,this._overlayRect,i)),e.overlayY===`bottom`)n.bottom=`${this._document.documentElement.clientHeight-(s.y+this._overlayRect.height)}px`;else n.top=fi$4(s.y);return n}_getExactOverlayX(e,t,i){let n={left:``,right:``},s=this._getOverlayPoint(t,this._overlayRect,e);this._isPushed&&(s=this._pushOverlayOnScreen(s,this._overlayRect,i));let r;if(this._isRtl()?r=e.overlayX===`end`?`left`:`right`:r=e.overlayX===`end`?`right`:`left`,r===`right`)n.right=`${this._document.documentElement.clientWidth-(s.x+this._overlayRect.width)}px`;else n.left=fi$4(s.x);return n}_getScrollVisibility(){let e=this._getOriginRect(),t=this._pane.getBoundingClientRect(),i=this._scrollables.map(n=>n.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:Tt$5(e,i),isOriginOutsideView:gt$5(e,i),isOverlayClipped:Tt$5(t,i),isOverlayOutsideView:gt$5(t,i)}}_subtractOverflows(e,...t){return t.reduce((i,n)=>i-Math.max(n,0),e)}_getNarrowedViewportRect(){let e=this._document.documentElement.clientWidth,t=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+e-this._getViewportMarginEnd(),bottom:i.top+t-this._getViewportMarginBottom(),width:e-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:t-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()===`rtl`}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(e,t){return t===`x`?e.offsetX==null?this._offsetX:e.offsetX:e.offsetY==null?this._offsetY:e.offsetY}_validatePositions(){}_addPanelClasses(e){this._pane&&At$2(e).forEach(t=>{t!==``&&this._appliedPanelClasses.indexOf(t)===-1&&(this._appliedPanelClasses.push(t),this._pane.classList.add(t))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(e=>{this._pane.classList.remove(e)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let e=this._origin;if(e instanceof Jr$2)return e.nativeElement.getBoundingClientRect();if(e instanceof Element)return e.getBoundingClientRect();let t=e.width||0,i=e.height||0;return{top:e.y,bottom:e.y+i,left:e.x,right:e.x+t,height:i,width:t}}_getContainerRect(){let e=this._overlayRef.getConfig().usePopover&&this._popoverLocation!==`global`,t=this._overlayContainer.getContainerElement();e&&(t.style.display=`block`);let i=t.getBoundingClientRect();return e&&(t.style.display=``),i}};function P$2(o,e){for(let t in e)e.hasOwnProperty(t)&&(o[t]=e[t]);return o}function zt$1(o){if(typeof o!=`number`&&o!=null){let[e,t]=o.split(ee$1);return!t||t===`px`?parseFloat(e):null}return o||null}function It$3(o){return{top:Math.floor(o.top),right:Math.floor(o.right),bottom:Math.floor(o.bottom),left:Math.floor(o.left),width:Math.floor(o.width),height:Math.floor(o.height)}}function ie$1(o,e){return o===e?!0:o.isOriginClipped===e.isOriginClipped&&o.isOriginOutsideView===e.isOriginOutsideView&&o.isOverlayClipped===e.isOverlayClipped&&o.isOverlayOutsideView===e.isOverlayOutsideView}var Wt$3=`cdk-global-overlay-wrapper`;function ne$1(o){return new it$5}var it$5=class{_overlayRef;_cssPosition=`static`;_topOffset=``;_bottomOffset=``;_alignItems=``;_xPosition=``;_xOffset=``;_width=``;_height=``;_isDisposed=!1;attach(e){let t=e.getConfig();this._overlayRef=e,this._width&&!t.width&&e.updateSize({width:this._width}),this._height&&!t.height&&e.updateSize({height:this._height}),e.hostElement.classList.add(Wt$3),this._isDisposed=!1}top(e=``){return this._bottomOffset=``,this._topOffset=e,this._alignItems=`flex-start`,this}left(e=``){return this._xOffset=e,this._xPosition=`left`,this}bottom(e=``){return this._topOffset=``,this._bottomOffset=e,this._alignItems=`flex-end`,this}right(e=``){return this._xOffset=e,this._xPosition=`right`,this}start(e=``){return this._xOffset=e,this._xPosition=`start`,this}end(e=``){return this._xOffset=e,this._xPosition=`end`,this}width(e=``){return this._overlayRef?this._overlayRef.updateSize({width:e}):this._width=e,this}height(e=``){return this._overlayRef?this._overlayRef.updateSize({height:e}):this._height=e,this}centerHorizontally(e=``){return this.left(e),this._xPosition=`center`,this}centerVertically(e=``){return this.top(e),this._alignItems=`center`,this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let e=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,{width:n,height:s,maxWidth:r,maxHeight:a}=this._overlayRef.getConfig(),h=(n===`100%`||n===`100vw`)&&(!r||r===`100%`||r===`100vw`),f=(s===`100%`||s===`100vh`)&&(!a||a===`100%`||a===`100vh`),l=this._xPosition,d=this._xOffset,p=this._overlayRef.getConfig().direction===`rtl`,g=``,_=``,v=``;h?v=`flex-start`:l===`center`?(v=`center`,p?_=d:g=d):p?l===`left`||l===`end`?(v=`flex-end`,g=d):(l===`right`||l===`start`)&&(v=`flex-start`,_=d):l===`left`||l===`start`?(v=`flex-start`,g=d):(l===`right`||l===`end`)&&(v=`flex-end`,_=d),e.position=this._cssPosition,e.marginLeft=h?`0`:g,e.marginTop=f?`0`:this._topOffset,e.marginBottom=this._bottomOffset,e.marginRight=h?`0`:_,t.justifyContent=v,t.alignItems=f?`flex-start`:this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let e=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,i=t.style;t.classList.remove(Wt$3),i.justifyContent=i.alignItems=e.marginTop=e.marginBottom=e.marginLeft=e.marginRight=e.position=``,this._overlayRef=null,this._isDisposed=!0}};var wt$3=new S$2(`OVERLAY_DEFAULT_CONFIG`);function $t$3(o,e){o.get(I$4).load(Zt$3);let t=o.get(Ut$2),i=o.get(tn$3),n=o.get(Rt$3),s=o.get(bt$4),r=o.get(zn$1),a=o.get(Uc,null,{optional:!0})||o.get(Wr$2).createRenderer(null,null),h=new z$2(e),f=o.get(wt$3,null,{optional:!0})?.usePopover??!0;h.direction=h.direction||r.value,!i.body||!(`showPopover`in i.body)?h.usePopover=!1:h.usePopover=e?.usePopover??f;let l=i.createElement(`div`),d=i.createElement(`div`);l.id=n.getId(`cdk-overlay-`),l.classList.add(`cdk-overlay-pane`),d.appendChild(l),h.usePopover&&(d.setAttribute(`popover`,`manual`),d.classList.add(`cdk-overlay-popover`));let p=h.usePopover?h.positionStrategy?.getPopoverInsertionPoint?.():null;return yt$3(p)?p.after(d):p?.type===`parent`?p.element.appendChild(d):t.getContainerElement().appendChild(d),new tt$5(new $$2(l,s,o),d,l,h,o.get(Ce$1),o.get(Xt$3),i,o.get(it$7),o.get(jt$3),e?.disableAnimations??o.get(NE,null,{optional:!0})===`NoopAnimations`,o.get(me$2),a)}var oe$2=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`}];var se$2=new S$2(`cdk-connected-overlay-scroll-strategy`,{providedIn:`root`,factory:()=>{let o=y$3(ve$1);return()=>Yt$3(o)}});var vt$3=(()=>{class o{elementRef=y$3(Jr$2);static ɵfac=function(i){return new(i||o)};static ɵdir=ew({type:o,selectors:[[``,`cdk-overlay-origin`,``],[``,`overlay-origin`,``],[``,`cdkOverlayOrigin`,``]],exportAs:[`cdkOverlayOrigin`]})}return o})();var Kt$3=new S$2(`cdk-connected-overlay-default-config`);var re$1=(()=>{class o{_dir=y$3(zn$1,{optional:!0});_injector=y$3(ve$1);_overlayRef;_templatePortal;_backdropSubscription=J$4.EMPTY;_attachSubscription=J$4.EMPTY;_detachSubscription=J$4.EMPTY;_positionSubscription=J$4.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=y$3(se$2);_ngZone=y$3(Ce$1);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(t){this._offsetX=t,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(t){this._offsetY=t,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(t){typeof t!=`string`&&this._assignConfig(t)}backdropClick=new tt$6;positionChange=new tt$6;attach=new tt$6;detach=new tt$6;overlayKeydown=new tt$6;overlayOutsideClick=new tt$6;constructor(){let t=y$3(Gr$2),i=y$3(Ns$1),n=y$3(Kt$3,{optional:!0}),s=y$3(wt$3,{optional:!0});this.usePopover=s?.usePopover===!1?null:`global`,this._templatePortal=new N$3(t,i),this.scrollStrategy=this._scrollStrategyFactory(),n&&this._assignConfig(n)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:`ltr`}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(t){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),t.origin&&this.open&&this._position.apply()),t.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=oe$2);let t=this._overlayRef=$t$3(this._injector,this._buildConfig());this._attachSubscription=t.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=t.detachments().subscribe(()=>this.detach.emit()),t.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!Le$1(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let n=this._getOriginElement(),s=y$4(i);(!n||n!==s&&!n.contains(s))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let t=this._position=this.positionStrategy||this._createPositionStrategy(),i=new z$2({direction:this._dir||`ltr`,positionStrategy:t,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(t){let i=this.positions.map(n=>({originX:n.originX,originY:n.originY,overlayX:n.overlayX,overlayY:n.overlayY,offsetX:n.offsetX||this.offsetX,offsetY:n.offsetY||this.offsetY,panelClass:n.panelClass||void 0}));return t.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?`global`:this.usePopover)}_createPositionStrategy(){let t=Gt$4(this._injector,this._getOrigin());return this._updatePositionStrategy(t),t}_getOrigin(){return this.origin instanceof vt$3?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof vt$3?this.origin.elementRef.nativeElement:this.origin instanceof Jr$2?this.origin.nativeElement:typeof Element<`u`&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let t=this._overlayRef;t.getConfig().hasBackdrop=this.hasBackdrop,t.updateSize({width:this._getWidth()}),t.hasAttached()||t.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=t.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(Uy(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(t){this.origin=t.origin??this.origin,this.positions=t.positions??this.positions,this.positionStrategy=t.positionStrategy??this.positionStrategy,this.offsetX=t.offsetX??this.offsetX,this.offsetY=t.offsetY??this.offsetY,this.width=t.width??this.width,this.height=t.height??this.height,this.minWidth=t.minWidth??this.minWidth,this.minHeight=t.minHeight??this.minHeight,this.backdropClass=t.backdropClass??this.backdropClass,this.panelClass=t.panelClass??this.panelClass,this.viewportMargin=t.viewportMargin??this.viewportMargin,this.scrollStrategy=t.scrollStrategy??this.scrollStrategy,this.disableClose=t.disableClose??this.disableClose,this.transformOriginSelector=t.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=t.hasBackdrop??this.hasBackdrop,this.lockPosition=t.lockPosition??this.lockPosition,this.flexibleDimensions=t.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=t.growAfterOpen??this.growAfterOpen,this.push=t.push??this.push,this.disposeOnNavigation=t.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=t.usePopover??this.usePopover,this.matchWidth=t.matchWidth??this.matchWidth}static ɵfac=function(i){return new(i||o)};static ɵdir=ew({type:o,selectors:[[``,`cdk-connected-overlay`,``],[``,`connected-overlay`,``],[``,`cdkConnectedOverlay`,``]],inputs:{origin:[0,`cdkConnectedOverlayOrigin`,`origin`],positions:[0,`cdkConnectedOverlayPositions`,`positions`],positionStrategy:[0,`cdkConnectedOverlayPositionStrategy`,`positionStrategy`],offsetX:[0,`cdkConnectedOverlayOffsetX`,`offsetX`],offsetY:[0,`cdkConnectedOverlayOffsetY`,`offsetY`],width:[0,`cdkConnectedOverlayWidth`,`width`],height:[0,`cdkConnectedOverlayHeight`,`height`],minWidth:[0,`cdkConnectedOverlayMinWidth`,`minWidth`],minHeight:[0,`cdkConnectedOverlayMinHeight`,`minHeight`],backdropClass:[0,`cdkConnectedOverlayBackdropClass`,`backdropClass`],panelClass:[0,`cdkConnectedOverlayPanelClass`,`panelClass`],viewportMargin:[0,`cdkConnectedOverlayViewportMargin`,`viewportMargin`],scrollStrategy:[0,`cdkConnectedOverlayScrollStrategy`,`scrollStrategy`],open:[0,`cdkConnectedOverlayOpen`,`open`],disableClose:[0,`cdkConnectedOverlayDisableClose`,`disableClose`],transformOriginSelector:[0,`cdkConnectedOverlayTransformOriginOn`,`transformOriginSelector`],hasBackdrop:[2,`cdkConnectedOverlayHasBackdrop`,`hasBackdrop`,ZV],lockPosition:[2,`cdkConnectedOverlayLockPosition`,`lockPosition`,ZV],flexibleDimensions:[2,`cdkConnectedOverlayFlexibleDimensions`,`flexibleDimensions`,ZV],growAfterOpen:[2,`cdkConnectedOverlayGrowAfterOpen`,`growAfterOpen`,ZV],push:[2,`cdkConnectedOverlayPush`,`push`,ZV],disposeOnNavigation:[2,`cdkConnectedOverlayDisposeOnNavigation`,`disposeOnNavigation`,ZV],usePopover:[0,`cdkConnectedOverlayUsePopover`,`usePopover`],matchWidth:[2,`cdkConnectedOverlayMatchWidth`,`matchWidth`,ZV],_config:[0,`cdkConnectedOverlay`,`_config`]},outputs:{backdropClick:`backdropClick`,positionChange:`positionChange`,attach:`attach`,detach:`detach`,overlayKeydown:`overlayKeydown`,overlayOutsideClick:`overlayOutsideClick`},exportAs:[`cdkConnectedOverlay`],features:[qE]})}return o})();var Ue$2=[[[`mat-icon`],[``,`matMenuItemIcon`,``]],`*`];var Ge$1=[`mat-icon, [matMenuItemIcon]`,`*`];function qe$2(a,r){a&1&&(yf(),as$2(0,`svg`,2),xm(1,`polygon`,3),ou())}var Ze$1=[`*`];function $e$2(a,r){if(a&1){let e=ib();iu(0,`div`,0),Vm(`click`,function(){of(e);return sf(fb().closed.emit(`click`))})(`animationstart`,function(n){of(e);return sf(fb()._onAnimationStart(n.animationName))})(`animationend`,function(n){of(e);return sf(fb()._onAnimationDone(n.animationName))})(`animationcancel`,function(n){of(e);return sf(fb()._onAnimationDone(n.animationName))}),iu(1,`div`,1),gb(2),su()()}if(a&2){let e=fb();Ab(e._classList),Qm(`mat-menu-panel-animations-disabled`,e._animationsDisabled)(`mat-menu-panel-exit-animation`,e._panelAnimationState===`void`)(`mat-menu-panel-animating`,e._isAnimating()),Pm(`id`,e.panelId),Sm(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e.ariaLabelledby||null)(`aria-describedby`,e.ariaDescribedby||null)}}var Z$4=new S$2(`MAT_MENU_PANEL`);var q$2=(()=>{class a{_elementRef=y$3(Jr$2);_document=y$3(tn$3);_focusMonitor=y$3(kt$3);_parentMenu=y$3(Z$4,{optional:!0});_changeDetectorRef=y$3(QV);role=`menuitem`;disabled=!1;disableRipple=!1;_hovered=new ne$2;_focused=new ne$2;_highlighted=!1;_triggersSubmenu=!1;constructor(){y$3(I$4).load(Ye$1),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll(`mat-icon, .material-icons`);for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||``}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static ɵfac=function(t){return new(t||a)};static ɵcmp=YC({type:a,selectors:[[``,`mat-menu-item`,``]],hostAttrs:[1,`mat-mdc-menu-item`,`mat-focus-indicator`],hostVars:8,hostBindings:function(t,n){t&1&&jm(`click`,function(s){return n._checkDisabled(s)})(`mouseenter`,function(){return n._handleMouseEnter()}),t&2&&(Sm(`role`,n.role)(`tabindex`,n._getTabIndex())(`aria-disabled`,n.disabled)(`disabled`,n.disabled||null),Qm(`mat-mdc-menu-item-highlighted`,n._highlighted)(`mat-mdc-menu-item-submenu-trigger`,n._triggersSubmenu))},inputs:{role:`role`,disabled:[2,`disabled`,`disabled`,ZV],disableRipple:[2,`disableRipple`,`disableRipple`,ZV]},exportAs:[`matMenuItem`],ngContentSelectors:Ge$1,decls:5,vars:3,consts:[[1,`mat-mdc-menu-item-text`],[`matRipple`,``,1,`mat-mdc-menu-ripple`,3,`matRippleDisabled`,`matRippleTrigger`],[`viewBox`,`0 0 5 10`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-mdc-menu-submenu-icon`],[`points`,`0,0 5,5 0,10`]],template:function(t,n){t&1&&(hb(Ue$2),gb(0),as$2(1,`span`,0),gb(2,1),ou(),xm(3,`div`,1),zw(4,qe$2,2,0,`:svg:svg`,2)),t&2&&(cT(3),Nm(`matRippleDisabled`,n.disableRipple||n.disabled)(`matRippleTrigger`,n._getHostElement()),cT(),Qw(n._triggersSubmenu?4:-1))},dependencies:[Di$3],encapsulation:2})}return a})();var Je=new S$2(`MatMenuContent`);var et$4=new S$2(`mat-menu-default-options`,{providedIn:`root`,factory:()=>({overlapTrigger:!1,xPosition:`after`,yPosition:`below`,backdropClass:`cdk-overlay-transparent-backdrop`})});var G$5=`_mat-menu-enter`;var I$3=`_mat-menu-exit`;var P$1=(()=>{class a{_elementRef=y$3(Jr$2);_changeDetectorRef=y$3(QV);_injector=y$3(ve$1);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=z$4();_allItems;_directDescendantItems=new zi$2;_classList={};_panelAnimationState=`void`;_animationDone=new ne$2;_isAnimating=ze$1(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,n=r$2({},this._classList);t&&t.length&&t.split(` `).forEach(i=>{n[i]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(` `).forEach(i=>{n[i]=!0}),this._elementRef.nativeElement.className=``),this._classList=n}_previousPanelClass=``;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new tt$6;close=this.closed;panelId=y$3(Rt$3).getId(`mat-menu-panel-`);constructor(){let e=y$3(et$4);this.overlayPanelClass=e.overlayPanelClass||``,this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Ot$4(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit(`tab`)),this._directDescendantItems.changes.pipe(hd(this._directDescendantItems),Xu(e=>Oy(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState===`enter`&&t.activeItem?._hasFocus()){let n=e.toArray(),i=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[i]&&!n[i].disabled?t.setActiveItem(i):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(hd(this._directDescendantItems),Xu(t=>Oy(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:Le$1(e)||(e.preventDefault(),this.closed.emit(`keydown`));break;case 37:this.parentMenu&&this.direction===`ltr`&&this.closed.emit(`keydown`);break;case 39:this.parentMenu&&this.direction===`rtl`&&this.closed.emit(`keydown`);break;default:(t===38||t===40)&&n.setFocusOrigin(`keyboard`),n.onKeydown(e);return}}focusFirstItem(e=`program`){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Nl(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=s$1(r$2({},this._classList),{"mat-menu-before":e===`before`,"mat-menu-after":e===`after`,"mat-menu-above":t===`above`,"mat-menu-below":t===`below`}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===I$3;(t||e===G$5)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?`void`:`enter`),this._isAnimating.set(!1))}_onAnimationStart(e){(e===G$5||e===I$3)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?`enter`:`void`,e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(I$3),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?G$5:I$3)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(hd(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest(`[role="menu"]`)),e}static ɵfac=function(t){return new(t||a)};static ɵcmp=YC({type:a,selectors:[[`mat-menu`]],contentQueries:function(t,n,i){if(t&1&&Bm(i,Je,5)(i,q$2,5)(i,q$2,4),t&2){let s;vb(s=yb())&&(n.lazyContent=s.first),vb(s=yb())&&(n._allItems=s),vb(s=yb())&&(n.items=s)}},viewQuery:function(t,n){if(t&1&&Um(Gr$2,5),t&2){let i;vb(i=yb())&&(n.templateRef=i.first)}},hostVars:3,hostBindings:function(t,n){t&2&&Sm(`aria-label`,null)(`aria-labelledby`,null)(`aria-describedby`,null)},inputs:{backdropClass:`backdropClass`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],xPosition:`xPosition`,yPosition:`yPosition`,overlapTrigger:[2,`overlapTrigger`,`overlapTrigger`,ZV],hasBackdrop:[2,`hasBackdrop`,`hasBackdrop`,e=>e==null?null:ZV(e)],panelClass:[0,`class`,`panelClass`],classList:`classList`},outputs:{closed:`closed`,close:`close`},exportAs:[`matMenu`],features:[e_([{provide:Z$4,useExisting:a}])],ngContentSelectors:Ze$1,decls:1,vars:0,consts:[[`tabindex`,`-1`,`role`,`menu`,1,`mat-mdc-menu-panel`,3,`click`,`animationstart`,`animationend`,`animationcancel`,`id`],[1,`mat-mdc-menu-content`]],template:function(t,n){t&1&&(hb(),ym(0,$e$2,3,12,`ng-template`))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--%NS%mat-menu-item-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-menu-item-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-menu-item-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-menu-item-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-menu-item-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--%NS%mat-menu-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-menu-container-color, var(--%NS%mat-sys-surface-container));
  box-shadow: var(--%NS%mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--%NS%mat-menu-divider-color, var(--%NS%mat-sys-surface-variant));
  margin-bottom: var(--%NS%mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--%NS%mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--%NS%mat-menu-item-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--%NS%mat-menu-item-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--%NS%mat-menu-item-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--%NS%mat-menu-item-spacing, 12px);
  height: var(--%NS%mat-menu-item-icon-size, 24px);
  width: var(--%NS%mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--%NS%mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--%NS%mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--%NS%mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--%NS%mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--%NS%mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--%NS%mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2})}return a})();var tt$4=new S$2(`mat-menu-scroll-strategy`,{providedIn:`root`,factory:()=>{let a=y$3(ve$1);return()=>Yt$3(a)}});var c$4=new WeakMap;var nt$5=(()=>{class a{_canHaveBackdrop;_element=y$3(Jr$2);_viewContainerRef=y$3(Ns$1);_menuItemInstance=y$3(q$2,{optional:!0,self:!0});_dir=y$3(zn$1,{optional:!0});_focusMonitor=y$3(kt$3);_ngZone=y$3(Ce$1);_injector=y$3(ve$1);_scrollStrategy=y$3(tt$4);_changeDetectorRef=y$3(QV);_animationsDisabled=z$4();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=J$4.EMPTY;_menuCloseSubscription=J$4.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t===`click`||t===`tab`)&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=y$3(Z$4,{optional:!0});this._parentMaterialMenu=t instanceof P$1?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&c$4.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=c$4.get(t);c$4.set(t,this),n&&n!==this&&n._closeMenu();let i=this._createOverlay(t),s=i.getConfig(),l=s.positionStrategy;this._setPosition(t,l),this._canHaveBackdrop?s.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:s.hasBackdrop=t.hasBackdrop??!1,i.hasAttached()||(i.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||`program`),this._setIsMenuOpen(!0),t instanceof P$1&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(By(t.close)).subscribe(()=>{l.withLockedPosition(!1).reapplyLastPosition(),l.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof P$1&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(Lt$4(1)).subscribe(()=>{t.detach(),c$4.has(n)||n.lazyContent?.detach()}),n._setIsOpen(!1)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&c$4.delete(n),this.restoreFocus&&(e===`keydown`||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=$t$3(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof P$1&&this._menu._handleKeydown(n)})}return this._overlayRef}_getOverlayConfig(e){return new z$2({positionStrategy:Gt$4(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(`.mat-menu-panel, .mat-mdc-menu-panel`),backdropClass:e.backdropClass||`cdk-overlay-transparent-backdrop`,panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||`ltr`,disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let i=n.connectionPair.overlayX===`start`?`after`:`before`,s=n.connectionPair.overlayY===`top`?`below`:`above`;e.setPositionClasses(i,s)})})}_setPosition(e,t){let[n,i]=e.xPosition===`before`?[`end`,`start`]:[`start`,`end`],[s,l]=e.yPosition===`above`?[`bottom`,`top`]:[`top`,`bottom`],[R,T]=[s,l],[E,N]=[n,i],d=0;if(this._triggersSubmenu()){if(N=n=e.xPosition===`before`?`start`:`end`,i=E=n===`end`?`start`:`end`,this._parentMaterialMenu){if(this._parentInnerPadding==null){let $=this._parentMaterialMenu.items.first;this._parentInnerPadding=$?$._getHostElement().offsetTop:0}d=s===`bottom`?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(R=s===`top`?`bottom`:`top`,T=l===`top`?`bottom`:`top`);t.withPositions([{originX:n,originY:R,overlayX:E,overlayY:s,offsetY:d},{originX:i,originY:R,overlayX:N,overlayY:s,offsetY:d},{originX:n,originY:T,overlayX:E,overlayY:l,offsetY:-d},{originX:i,originY:T,overlayX:N,overlayY:l,offsetY:-d}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments();return Oy(e,this._parentMaterialMenu?this._parentMaterialMenu.closed:hy(),this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(bn$3(s=>this._menuOpen&&s!==this._menuItemInstance)):hy(),t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new N$3(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return c$4.get(e)===this}_triggerIsAriaDisabled(){return ZV(this._element.nativeElement.getAttribute(`aria-disabled`))}static ɵfac=function(t){hC()};static ɵdir=ew({type:a})}return a})();var Ot$3=(()=>{class a extends nt$5{_cleanupTouchstart;_hoverSubscription=J$4.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new tt$6;onMenuOpen=this.menuOpened;menuClosed=new tt$6;onMenuClose=this.menuClosed;constructor(){super(!0);let e=y$3(Uc);this._cleanupTouchstart=e.listen(this._element.nativeElement,`touchstart`,t=>{Z$5(t)||(this._openedBy=`touch`)},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){W$3(e)||(this._openedBy=e.button===0?`mouse`:void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy=`keyboard`),this.triggersSubmenu()&&(t===39&&this.dir===`ltr`||t===37&&this.dir===`rtl`)&&(this._openedBy=`keyboard`,this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!==`void`&&(this._openedBy=`mouse`,this._openMenu(!1))}))}static ɵfac=function(t){return new(t||a)};static ɵdir=ew({type:a,selectors:[[``,`mat-menu-trigger-for`,``],[``,`matMenuTriggerFor`,``]],hostAttrs:[1,`mat-mdc-menu-trigger`],hostVars:3,hostBindings:function(t,n){t&1&&jm(`click`,function(s){return n._handleClick(s)})(`mousedown`,function(s){return n._handleMousedown(s)})(`keydown`,function(s){return n._handleKeydown(s)}),t&2&&Sm(`aria-haspopup`,n.menu?`menu`:null)(`aria-expanded`,n.menuOpen)(`aria-controls`,n.menuOpen?n.menu?.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,`mat-menu-trigger-for`,`_deprecatedMatMenuTriggerFor`],menu:[0,`matMenuTriggerFor`,`menu`],menuData:[0,`matMenuTriggerData`,`menuData`],restoreFocus:[0,`matMenuTriggerRestoreFocus`,`restoreFocus`]},outputs:{menuOpened:`menuOpened`,onMenuOpen:`onMenuOpen`,menuClosed:`menuClosed`,onMenuClose:`onMenuClose`},exportAs:[`matMenuTrigger`],features:[gm]})}return a})();var Ve$2=class{static scrollToTop(){window.scroll({top:0,left:0,behavior:`smooth`})}static isElementDisplayed(r){let e=document.getElementById(r);return e?window.getComputedStyle(e).display!==`none`:(console.warn(`Element with id "${r}" not found.`),!1)}static composeImgSrc(r){return`data:image/jpeg;base64,${r}`}static imageExtensionFor(r){return r.type===`image/png`?`png`:`jpg`}};var Ii$2=[`*`,[[`mat-chip-avatar`],[``,`matChipAvatar`,``]],[[`mat-chip-trailing-icon`],[``,`matChipRemove`,``],[``,`matChipTrailingIcon`,``]]];var xi$3=[`*`,`mat-chip-avatar, [matChipAvatar]`,`mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]`];function ki$3(n,p){n&1&&(as$2(0,`span`,3),gb(1,1),ou())}function Ei$3(n,p){n&1&&(as$2(0,`span`,6),gb(1,2),ou())}var Mi$2=[`*`];var pi$3=new S$2(`MatChipAvatar`);var mi$2=new S$2(`MatChipTrailingIcon`);var ui$3=new S$2(`MatChipEdit`);var z$1=new S$2(`MatChipRemove`);var _i$2=new S$2(`MatChip`);var gi$3=(()=>{class n{_elementRef=y$3(Jr$2);_parentChip=y$3(_i$2);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(i){this._disabled=i}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?``:null}constructor(){y$3(I$4).load(Ye$1),this._elementRef.nativeElement.nodeName===`BUTTON`&&this._elementRef.nativeElement.setAttribute(`type`,`button`)}focus(){this._elementRef.nativeElement.focus()}static ɵfac=function(e){return new(e||n)};static ɵdir=ew({type:n,selectors:[[``,`matChipContent`,``]],hostAttrs:[1,`mat-mdc-chip-action`,`mdc-evolution-chip__action`,`mdc-evolution-chip__action--presentational`],hostVars:8,hostBindings:function(e,t){e&2&&(Sm(`disabled`,t._getDisabledAttribute())(`aria-disabled`,t.disabled),Qm(`mdc-evolution-chip__action--primary`,t._isPrimary)(`mdc-evolution-chip__action--secondary`,!t._isPrimary)(`mdc-evolution-chip__action--trailing`,!t._isPrimary&&!t._isLeading))},inputs:{disabled:[2,`disabled`,`disabled`,ZV],tabIndex:[2,`tabIndex`,`tabIndex`,i=>i==null?-1:KV(i)],_allowFocusWhenDisabled:`_allowFocusWhenDisabled`}})}return n})();var fi$3=(()=>{class n extends gi$3{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(i){!this.disabled&&this._isPrimary&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static ɵfac=(()=>{let i;return function(t){return(i||(i=uI(n)))(t||n)}})();static ɵdir=ew({type:n,selectors:[[``,`matChipAction`,``]],hostVars:3,hostBindings:function(e,t){e&1&&jm(`click`,function(a){return t._handleClick(a)})(`keydown`,function(a){return t._handleKeydown(a)}),e&2&&(Sm(`tabindex`,t._getTabindex()),Qm(`mdc-evolution-chip__action--presentational`,!1))},features:[gm]})}return n})();var st$5=(()=>{class n extends fi$3{_isPrimary=!1;_handleClick(i){this.disabled||(i.stopPropagation(),i.preventDefault(),this._parentChip.remove())}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&(i.stopPropagation(),i.preventDefault(),this._parentChip.remove())}static ɵfac=(()=>{let i;return function(t){return(i||(i=uI(n)))(t||n)}})();static ɵdir=ew({type:n,selectors:[[``,`matChipRemove`,``]],hostAttrs:[`role`,`button`,1,`mat-mdc-chip-remove`,`mat-mdc-chip-trailing-icon`,`mat-focus-indicator`,`mdc-evolution-chip__icon`,`mdc-evolution-chip__icon--trailing`],hostVars:1,hostBindings:function(e,t){e&2&&Sm(`aria-hidden`,null)},features:[e_([{provide:z$1,useExisting:n}]),gm]})}return n})();var Di$2=(()=>{class n{_changeDetectorRef=y$3(QV);_elementRef=y$3(Jr$2);_tagName=y$3(jV);_ngZone=y$3(Ce$1);_focusMonitor=y$3(kt$3);_globalRippleOptions=y$3(Ut$3,{optional:!0});_document=y$3(tn$3);_onFocus=new ne$2;_onBlur=new ne$2;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=z$4();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=y$3(Rt$3).getId(`mat-mdc-chip-`);ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(i){this._value=i}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(i){this._disabled=i}_disabled=!1;removed=new tt$6;destroyed=new tt$6;basicChipAttrName=`mat-basic-chip`;leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=y$3($e$4);_injector=y$3(ve$1);constructor(){let i=y$3(I$4);i.load(Ye$1),i.load(pt$5),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:`mat-mdc-chip-ripple`,disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(`.mat-mdc-chip-action-label`),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=Oy(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(i){(i.keyCode===8&&!i.repeat||i.keyCode===46)&&(i.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(i){return this._getActions().find(e=>{let t=e._elementRef.nativeElement;return t===i||t.contains(i)})}_getActions(){let i=[];return this.editIcon&&i.push(this.editIcon),this.primaryAction&&i.push(this.primaryAction),this.removeIcon&&i.push(this.removeIcon),i}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(i){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(i=>{let e=i!==null;e!==this._hasFocusInternal&&(this._hasFocusInternal=e,e?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static ɵfac=function(e){return new(e||n)};static ɵcmp=YC({type:n,selectors:[[`mat-basic-chip`],[``,`mat-basic-chip`,``],[`mat-chip`],[``,`mat-chip`,``]],contentQueries:function(e,t,c){if(e&1&&Bm(c,pi$3,5)(c,ui$3,5)(c,mi$2,5)(c,z$1,5)(c,pi$3,5)(c,mi$2,5)(c,ui$3,5)(c,z$1,5),e&2){let a;vb(a=yb())&&(t.leadingIcon=a.first),vb(a=yb())&&(t.editIcon=a.first),vb(a=yb())&&(t.trailingIcon=a.first),vb(a=yb())&&(t.removeIcon=a.first),vb(a=yb())&&(t._allLeadingIcons=a),vb(a=yb())&&(t._allTrailingIcons=a),vb(a=yb())&&(t._allEditIcons=a),vb(a=yb())&&(t._allRemoveIcons=a)}},viewQuery:function(e,t){if(e&1&&Um(fi$3,5),e&2){let c;vb(c=yb())&&(t.primaryAction=c.first)}},hostAttrs:[1,`mat-mdc-chip`],hostVars:31,hostBindings:function(e,t){e&1&&jm(`keydown`,function(a){return t._handleKeydown(a)}),e&2&&(Pm(`id`,t.id),Sm(`role`,t.role)(`aria-label`,t.ariaLabel),Ab(`mat-`+(t.color||`primary`)),Qm(`mdc-evolution-chip`,!t._isBasicChip)(`mdc-evolution-chip--disabled`,t.disabled)(`mdc-evolution-chip--with-trailing-action`,t._hasTrailingIcon())(`mdc-evolution-chip--with-primary-graphic`,t.leadingIcon)(`mdc-evolution-chip--with-primary-icon`,t.leadingIcon)(`mdc-evolution-chip--with-avatar`,t.leadingIcon)(`mat-mdc-chip-with-avatar`,t.leadingIcon)(`mat-mdc-chip-highlighted`,t.highlighted)(`mat-mdc-chip-disabled`,t.disabled)(`mat-mdc-basic-chip`,t._isBasicChip)(`mat-mdc-standard-chip`,!t._isBasicChip)(`mat-mdc-chip-with-trailing-icon`,t._hasTrailingIcon())(`_mat-animation-noopable`,t._animationsDisabled))},inputs:{role:`role`,id:`id`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaDescription:[0,`aria-description`,`ariaDescription`],value:`value`,color:`color`,removable:[2,`removable`,`removable`,ZV],highlighted:[2,`highlighted`,`highlighted`,ZV],disableRipple:[2,`disableRipple`,`disableRipple`,ZV],disabled:[2,`disabled`,`disabled`,ZV]},outputs:{removed:`removed`,destroyed:`destroyed`},exportAs:[`matChip`],features:[e_([{provide:_i$2,useExisting:n}])],ngContentSelectors:xi$3,decls:8,vars:2,consts:[[1,`mat-mdc-chip-focus-overlay`],[1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--primary`],[`matChipContent`,``],[1,`mdc-evolution-chip__graphic`,`mat-mdc-chip-graphic`],[1,`mdc-evolution-chip__text-label`,`mat-mdc-chip-action-label`],[1,`mat-mdc-chip-primary-focus-indicator`,`mat-focus-indicator`],[1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--trailing`]],template:function(e,t){e&1&&(hb(Ii$2),xm(0,`span`,0),as$2(1,`span`,1)(2,`span`,2),zw(3,ki$3,2,0,`span`,3),as$2(4,`span`,4),gb(5),xm(6,`span`,5),ou()()(),zw(7,Ei$3,2,0,`span`,6)),e&2&&(cT(3),Qw(t.leadingIcon?3:-1),cT(4),Qw(t._hasTrailingIcon()?7:-1))},dependencies:[gi$3],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-outline-width, 1px);
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-evolution-chip__action--%NS%primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--%NS%mat-chip-focus-outline-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--%NS%mat-chip-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-chip-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-chip-label-text-size, var(--%NS%mat-sys-label-large-size));
  font-weight: var(--%NS%mat-chip-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-chip-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  height: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--%NS%selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--%NS%mat-chip-trailing-action-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--%NS%mat-chip-trailing-action-focus-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  height: var(--%NS%mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--%NS%mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  height: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  font-size: var(--%NS%mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --%NS%mat-chip-with-icon-icon-color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-elevated-container-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
  --%NS%mat-chip-label-text-color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-outline-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-hover-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-hover-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--%NS%mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--%NS%mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-trailing-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--%NS%mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--%NS%mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-trailing-action-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-selected-trailing-action-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--%NS%mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--%NS%mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})}return n})();var lt$4=(()=>{class n{_elementRef=y$3(Jr$2);_changeDetectorRef=y$3(QV);_dir=y$3(zn$1,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new ne$2;_defaultRole=`presentation`;get chipFocusChanges(){return this._getChipStream(i=>i._onFocus)}get chipDestroyedChanges(){return this._getChipStream(i=>i.destroyed)}get chipRemovedChanges(){return this._getChipStream(i=>i.removed)}get disabled(){return this._disabled}set disabled(i){this._disabled=i,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(i){this._explicitRole=i}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new zi$2;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(i=>i._hasFocus())}_syncChipsState(){this._chips?.forEach(i=>{i._chipListDisabled=this._disabled,i._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(i){this._originatesFromChip(i)&&this._keyManager.onKeydown(i)}_isValidIndex(i){return i>=0&&i<this._chips.length}_allowFocusEscape(){let i=this._elementRef.nativeElement.tabIndex;i!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=i))}_getChipStream(i){return this._chips.changes.pipe(hd(null),Xu(()=>Oy(...this._chips.map(i))))}_originatesFromChip(i){let e=i.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains(`mat-mdc-chip`))return!0;e=e.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(hd(this._chips)).subscribe(i=>{let e=[];i.forEach(t=>t._getActions().forEach(c=>e.push(c))),this._chipActions.reset(e),this._chipActions.notifyOnChanges()}),this._keyManager=new Ot$4(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:`ltr`).withHomeAndEnd().skipPredicate(i=>this._skipPredicate(i)),this.chipFocusChanges.pipe(By(this._destroyed)).subscribe(({chip:i})=>{let e=i._getSourceAction(document.activeElement);e&&this._keyManager.updateActiveItem(e)}),this._dir?.change.pipe(By(this._destroyed)).subscribe(i=>this._keyManager.withHorizontalOrientation(i))}_skipPredicate(i){return i.disabled}_trackChipSetChanges(){this._chips.changes.pipe(hd(null),By(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(By(this._destroyed)).subscribe(i=>{let t=this._chips.toArray().indexOf(i.chip),c=i.chip._hasFocus(),a=i.chip._hadFocusOnRemove&&this._keyManager.activeItem&&i.chip._getActions().includes(this._keyManager.activeItem),wi=c||a;this._isValidIndex(t)&&wi&&(this._lastDestroyedFocusedChipIndex=t)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let i=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),e=this._chips.toArray()[i];e.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():e.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static ɵfac=function(e){return new(e||n)};static ɵcmp=YC({type:n,selectors:[[`mat-chip-set`]],contentQueries:function(e,t,c){if(e&1&&Bm(c,Di$2,5),e&2){let a;vb(a=yb())&&(t._chips=a)}},hostAttrs:[1,`mat-mdc-chip-set`,`mdc-evolution-chip-set`],hostVars:1,hostBindings:function(e,t){e&1&&jm(`keydown`,function(a){return t._handleKeydown(a)}),e&2&&Sm(`role`,t.role)},inputs:{disabled:[2,`disabled`,`disabled`,ZV],role:`role`,tabIndex:[2,`tabIndex`,`tabIndex`,i=>i==null?0:KV(i)]},ngContentSelectors:Mi$2,decls:2,vars:0,consts:[[`role`,`presentation`,1,`mdc-evolution-chip-set__chips`]],template:function(e,t){e&1&&(hb(),iu(0,`div`,0),gb(1),su())},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2})}return n})();var yi$2=`juanmamoreno.`;var V$3={THEME:`theme`,SORT_METHOD:`catalogue.sort`,SORT_ORDER:`catalogue.order`,AVAILABILITY:`catalogue.availability`};function bi$3(n,p){try{let i=window.localStorage.getItem(yi$2+n);return p.includes(i)?i:null}catch{return null}}function Si$3(n,p){try{window.localStorage.setItem(yi$2+n,p)}catch{}}var Ai$3=[`both`,`sold`,`available`];var _t$3=(()=>{class n{constructor(){this.chosen=ze$1(bi$3(V$3.AVAILABILITY,Ai$3)??`both`),this.availability=this.chosen.asReadonly()}set(i){this.chosen.set(i),Si$3(V$3.AVAILABILITY,i)}clear(){this.set(`both`)}static{this.ɵfac=function(e){return new(e||n)}}static{this.ɵprov=de$3({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var wt$2=(()=>{class n{constructor(){this.responsive=y$3(nn$4),this.displayMobileLayout=new nr$2(!1),this.responsive.observe([aa.XSmall]).pipe(ld()).subscribe(i=>{this.displayMobileLayout.next(!i.matches)})}static{this.ɵfac=function(e){return new(e||n)}}static{this.ɵprov=de$3({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var x$1=(h,t,s,e,i)=>e+(h-t)/(s-t)*(i-e);var g$1=(h,t,s)=>Math.min(s,Math.max(t,h));var r$1=(h,t)=>h+Math.random()*(t-h);var F$1=(h,t)=>Math.floor(r$1(h,t+1));var Q$3={minIntervalSeconds:6,maxIntervalSeconds:14,durationSeconds:3,peakAlpha:.4,colorRgb:`255,235,205`,radiusFraction:.6};var y$2=class{constructor(t={}){this.shineStartedAt=null,this.originX=.5,this.originY=.5,this.options=r$2(r$2({},Q$3),t),this.nextShineAt=r$1(this.options.minIntervalSeconds,this.options.maxIntervalSeconds)}update(t){if(this.shineStartedAt===null){t>=this.nextShineAt&&(this.shineStartedAt=t,this.originX=r$1(.25,.75),this.originY=r$1(.25,.75));return}t-this.shineStartedAt>=this.options.durationSeconds&&(this.shineStartedAt=null,this.nextShineAt=t+r$1(this.options.minIntervalSeconds,this.options.maxIntervalSeconds))}draw(t,s,e,i){if(this.shineStartedAt===null)return;let o=(i-this.shineStartedAt)/this.options.durationSeconds,a=Math.sin(Math.PI*o);if(a<=0)return;let l=Math.min(s,e)*this.options.radiusFraction,n=s*this.originX,c=e*this.originY,d=t.createRadialGradient(n,c,0,n,c,l);d.addColorStop(0,`rgba(${this.options.colorRgb}, ${this.options.peakAlpha*a})`),d.addColorStop(1,`rgba(${this.options.colorRgb}, 0)`),t.save(),t.globalCompositeOperation=`lighter`,t.fillStyle=d,t.fillRect(0,0,s,e),t.restore()}};var m$3=class{constructor(t,s,e=1){this.depth=t,this.maxShift=s,this.ease=e,this.currentX=0,this.currentY=0}update(t,s){let e=t*this.depth*this.maxShift,i=s*this.depth*this.maxShift;this.currentX+=(e-this.currentX)*this.ease,this.currentY+=(i-this.currentY)*this.ease}get x(){return this.currentX}get y(){return this.currentY}reset(){this.currentX=0,this.currentY=0}};function Z$3(h){return new Promise((t,s)=>{let e=new Image,i=0,o=()=>{e.src=i===0?h:`${h}?retry=${i}`};e.onload=()=>t(e),e.onerror=()=>{i<3?(i++,setTimeout(o,200*i)):s(new Error(`Failed to load image: ${h}`))},o()})}async function w$2(h){let t=Object.entries(h),s=await Promise.all(t.map(([,e])=>Z$3(e)));return Object.fromEntries(t.map(([e],i)=>[e,s[i]]))}var b$1=`assets/images/canvases/`;var M=Math.PI*2;var J$2=.0015;var tt$3=`#241d18`;var st$4=`rgba(36, 29, 24, 0.035)`;var et$3=.6180339887*M;var I$2=class{constructor(){this.width=0,this.height=0,this.angle=0,this.prayerNumber=1,this.prayerCount=4,this.headParallax=new m$3(1,16,.03),this.bodyParallax=new m$3(.4,26,.02),this.lightShine=new y$2,this.prayers=[]}async setup(t,s,e){this.width=s,this.height=e;let i=await w$2({head:`${b$1}cabeza.png`,p1:`${b$1}pryer1.png`,p2:`${b$1}pryer2.png`,p3:`${b$1}pryer3.png`,p4:`${b$1}pryer4.png`});this.head=i.head,this.prayers=[i.p1,i.p2,i.p3,i.p4],this.paintBase(t),this.reseed()}resize(t,s,e){this.width=s,this.height=e,this.paintBase(t)}pointerDown(){this.reseed()}draw(t,s){let{width:e,height:i}=this;if(!this.head)return;t.fillStyle=st$4,t.fillRect(0,0,e,i);let o=s.pointer.active?s.pointer.x:e/2,a=s.pointer.active?s.pointer.y:i/2,l=x$1(o,0,e,20,260),n=x$1(a,0,i,20,260),c=s.pointer.active?g$1((o-e/2)/(e/2),-1,1):0,d=s.pointer.active?g$1((a-i/2)/(i/2),-1,1):0;this.headParallax.update(c,d),this.bodyParallax.update(c,d),t.drawImage(this.head,e/2-this.head.width/2+this.headParallax.x,i/2-this.head.height/2+this.headParallax.y),t.save(),t.translate(e/2+this.bodyParallax.x,i/2+this.bodyParallax.y),t.rotate(this.angle);for(let p=0;p<this.prayerCount;p++){t.save(),t.rotate(p*M/this.prayerCount),t.translate(0,l*1.5);for(let f=0;f<this.prayerCount;f++){t.save(),t.rotate(f*M/this.prayerCount),t.translate(0,n);for(let A=0;A<this.prayerCount;A++)t.save(),t.rotate(A*M/this.prayerCount),t.translate(0,n),this.drawPrayer(t,s.t,p,f,A),t.restore();t.restore()}t.restore()}t.restore(),this.lightShine.update(s.t),this.lightShine.draw(t,e,i,s.t),this.angle+=J$2}drawPrayer(t,s,e,i,o){let a=this.prayers[this.prayerNumber-1]??this.prayers[0],n=((e*this.prayerCount+i)*this.prayerCount+o)*et$3%M,c=1+.14*Math.sin(s*.5+n),d=.5+.35*(.5+.5*Math.sin(s*.35+n*1.7));t.save(),t.globalAlpha=d,t.scale(c,c),t.drawImage(a,-30,-45,60,90),t.restore()}paintBase(t){t.fillStyle=tt$3,t.fillRect(0,0,this.width,this.height)}reseed(){this.prayerNumber=F$1(1,4),this.prayerCount=F$1(3,5)}};var _$3=class{constructor(t,s=4){this.bpm=t,this.beatsPerBar=s,this.beatPeriod=60/t}beatIndex(t){return Math.floor(t/this.beatPeriod)}phase(t){let s=t/this.beatPeriod%1;return s<0?s+1:s}envelope(t,s=3){return Math.pow(1-this.phase(t),s)}barBeat(t){return(this.beatIndex(t)%this.beatsPerBar+this.beatsPerBar)%this.beatsPerBar}isDownbeat(t){return this.barBeat(t)===0}};var E$2=class{constructor(t){this.frames=t,this.totalMs=t.reduce((s,e)=>s+Math.max(0,e.ms),0)}get durationMs(){return this.totalMs}indexAt(t){if(this.frames.length===0)return 0;if(this.totalMs<=0)return this.frames[0].index;let s=(t*1e3%this.totalMs+this.totalMs)%this.totalMs;for(let e of this.frames){if(s<e.ms)return e.index;s-=e.ms}return this.frames[this.frames.length-1].index}};var u$2=24;var it$4=12e-5;var at$5=40;var ot$5=220;var nt$4=.5;var rt$4=6;var ht$4=120;var lt$3=260;var dt$3=.4;var O$1=class h{constructor(t,s,e=90){this.width=t,this.height=s,this.count=e,this.motes=[],this.seed()}static forArea(t,s,e=it$4){let i=Math.round(g$1(t*s*e,at$5,ot$5));return new h(t,s,i)}get list(){return this.motes}resize(t,s){this.width=t,this.height=s}seed(){this.motes=[];for(let t=0;t<this.count;t++){let s=r$1(.12,1);this.motes.push({x:r$1(0,this.width),y:r$1(0,this.height),depth:s,radius:.6+s*2.2,baseVx:r$1(-4,9)*s,baseVy:r$1(-7,2)*s,wanderAmp:r$1(3,12),wanderFreqX:r$1(.05,.25),wanderFreqY:r$1(.05,.25),phase:r$1(0,Math.PI*2),twinkleFreq:r$1(.3,1.2),vx:0,vy:0})}}update(t,s){let e=this.width,i=this.height,o=Math.pow(.12,t);for(let a of this.motes){let l=Math.cos(s*a.wanderFreqX+a.phase)*a.wanderAmp,n=Math.sin(s*a.wanderFreqY+a.phase)*a.wanderAmp;a.x+=(a.baseVx+l+a.vx)*t,a.y+=(a.baseVy+n+a.vy)*t,a.vx*=o,a.vy*=o,a.x<-u$2?a.x=e+u$2:a.x>e+u$2&&(a.x=-u$2),a.y<-u$2?a.y=i+u$2:a.y>i+u$2&&(a.y=-u$2)}}gust(t,s,e,i){let o=i*i;for(let a of this.motes){let l=a.x-t,n=a.y-s,c=l*l+n*n;if(c>o||c===0)continue;let d=g$1(1-c/o,0,1),p=Math.sqrt(c);a.vx+=l/p*e*d*a.depth,a.vy+=n/p*e*d*a.depth}}stir(t,s,e){e<=nt$4||this.gust(t,s,e*rt$4,ht$4)}puff(t,s){this.gust(t,s,lt$3,Math.max(this.width,this.height)*dt$3)}};var X$3=h=>h*h*(3-2*h);var C$2=class{constructor(t,s,e,i=.18,o=.3){this.gapMinS=t,this.gapMaxS=s,this.durationS=e,this.fadeIn=i,this.fadeOut=o,this.nextAt=0,this.startT=-1,this.id=0}sample(t){if(this.nextAt===0&&(this.nextAt=t+r$1(this.gapMinS,this.gapMaxS)),this.startT<0){if(t<this.nextAt)return null;this.startT=t,this.id++}let s=(t-this.startT)/this.durationS;return s>=1?(this.startT=-1,this.nextAt=t+r$1(this.gapMinS,this.gapMaxS),null):{sweep:s,intensity:this.intensityAt(s),id:this.id}}intensityAt(t){return t<this.fadeIn?X$3(t/this.fadeIn):t>1-this.fadeOut?X$3((1-t)/this.fadeOut):1}};var ct$2=6;var k$4=16;var pt$3=400;var ft$4=800;var gt$4=1400;var ut$3=3600;var mt$2=400;var At$1=900;var G$4=70;var R$3=.06;var N$2=h=>h*h*(3-2*h);var T$1=class{constructor(t,s,e=6){this.width=t,this.height=s,this.count=e,this.watchers=[];for(let i=0;i<e;i++)this.watchers.push({x:0,y:0,scale:1,tilt:0,openness:0,bornAt:-1,nextAt:r$1(0,k$4),fadeInMs:0,holdMs:0,fadeOutMs:0,blinkAtMs:0})}get list(){return this.watchers}resize(t,s){this.width=t,this.height=s}update(t,s){for(let e of this.watchers){if(e.bornAt<0)if(t>=e.nextAt)this.spawn(e,t,s);else{e.openness=0;continue}let i=e.fadeInMs+e.holdMs+e.fadeOutMs,o=(t-e.bornAt)*1e3;if(o>=i){e.bornAt=-1,e.openness=0,e.nextAt=t+r$1(ct$2,k$4);continue}e.openness=this.opennessAt(e,o)}}opennessAt(t,s){if(s<t.fadeInMs)return N$2(s/t.fadeInMs);let e=s-t.fadeInMs;if(e<t.holdMs){let o=Math.abs(e-t.blinkAtMs);return o<G$4?N$2(o/G$4):1}return N$2(1-(e-t.holdMs)/t.fadeOutMs)}spawn(t,s,e){let i=this.width/2,o=this.height/2,a=i,l=o;for(let n=0;n<12&&(a=r$1(this.width*R$3,this.width*(1-R$3)),l=r$1(this.height*R$3,this.height*(1-R$3)),!(Math.hypot(a-i,l-o)>=e));n++);t.x=a,t.y=l,t.scale=r$1(.75,1.5),t.tilt=r$1(-.35,.35),t.bornAt=s,t.openness=0,t.fadeInMs=r$1(pt$3,ft$4),t.holdMs=r$1(gt$4,ut$3),t.fadeOutMs=r$1(mt$2,At$1),t.blinkAtMs=r$1(t.holdMs*.3,t.holdMs*.7)}};var D$1=`assets/images/canvases/`;var H$3=Math.PI*2;var bt$3=`#070a0f`;var Mt$2=`rgba(7, 10, 15, 0.22)`;var $$1=`255, 244, 214`;var St$1=.5;var Y$3=.84;var yt$2=5;var wt$1=.02;var It$2=.55;var L$3=`255, 236, 200`;var _t$2=14;var Et$2=34;var Ot$2=5.5;var Ct$1=1.15;var Rt$1=.18;var Tt$4=.7;var Pt$2=.5;var vt$2=`#bcd2ff`;var Bt$2=[{index:2,ms:90},{index:1,ms:130},{index:2,ms:90}];var U$3=3;var W$2=8;var xt=172;var P=[`255, 45, 149`,`45, 160, 255`,`150, 90, 255`,`255, 120, 40`];var Ft$1=.12;var Nt$1=.02;var Dt$2=1.2;var Lt$2=.02;var Xt$2=.5;var kt$1=.05;var v$2=class{constructor(){this.width=0,this.height=0,this.frames=[],this.beat=new _$3(xt),this.beam=new C$2(_t$2,Et$2,Ot$2),this.beamBuffer=document.createElement(`canvas`),this.beamId=-1,this.beamOriginX=.5,this.beamDir=1,this.blinkMotion=new E$2(Bt$2),this.nextBlinkAt=0,this.blinkStartT=-1,this.headParallax=new m$3(1,22,.04),this.headBuffer=document.createElement(`canvas`)}async setup(t,s,e){this.width=s,this.height=e,this.field=O$1.forArea(s,e,16e-5),this.watchers=new T$1(s,e,yt$2),this.buildBeamBuffer();let i=await w$2({f1:`${D$1}escondete1.png`,f2:`${D$1}escondete2.png`,f3:`${D$1}escondete3.png`});this.frames=[i.f1,i.f2,i.f3],this.paintBase(t)}resize(t,s,e){this.width=s,this.height=e,this.field.resize(s,e),this.watchers.resize(s,e),this.paintBase(t)}pointerDown(t,s){this.field.puff(t,s)}draw(t,s){let{width:e,height:i}=this,o=s.pointer;o.active&&this.field.stir(o.x,o.y,Math.hypot(o.vx,o.vy)),this.field.update(s.dt,s.t);let a=Math.min(e,i)*Y$3;this.watchers.update(s.t,a*It$2),t.fillStyle=Mt$2,t.fillRect(0,0,e,i),t.save(),t.globalCompositeOperation=`lighter`;for(let n of this.field.list){let d=(.35+.65*(.5+.5*Math.sin(s.t*n.twinkleFreq+n.phase)))*(.25+n.depth*.55)*St$1,p=n.radius*(2+n.depth*3),f=t.createRadialGradient(n.x,n.y,0,n.x,n.y,p);f.addColorStop(0,`rgba(${$$1}, ${d})`),f.addColorStop(1,`rgba(${$$1}, 0)`),t.fillStyle=f,t.beginPath(),t.arc(n.x,n.y,p,0,H$3),t.fill()}t.restore();let l=this.beam.sample(s.t);l&&this.drawBeam(t,l),this.drawStageLights(t,s),this.drawWatchers(t),this.drawHead(t,s)}drawBeam(t,s){s.id!==this.beamId&&(this.beamId=s.id,this.beamOriginX=r$1(.2,.8),this.beamDir=Math.random()<.5?-1:1);let{width:e,height:i}=this,o=e*this.beamOriginX,a=-i*.15,l=this.beamDir>=0?s.sweep:1-s.sweep,n=Math.PI/2+(l-.5)*Ct$1,c=Math.max(e,i)*Tt$4,d=Math.min(e,i)*Rt$1;t.save(),t.globalCompositeOperation=`lighter`,t.globalAlpha=s.intensity*Pt$2,t.translate(o,a),t.rotate(n),t.drawImage(this.beamBuffer,0,-d/2,c,d),t.restore()}buildBeamBuffer(){this.beamBuffer.width=1024,this.beamBuffer.height=256;let e=this.beamBuffer.getContext(`2d`);if(!e)return;e.clearRect(0,0,1024,256),e.globalCompositeOperation=`source-over`,e.fillStyle=vt$2,e.fillRect(0,0,1024,256),e.globalCompositeOperation=`destination-in`;let i=e.createLinearGradient(0,0,0,256);i.addColorStop(0,`rgba(0, 0, 0, 0)`),i.addColorStop(.5,`rgba(0, 0, 0, 1)`),i.addColorStop(1,`rgba(0, 0, 0, 0)`),e.fillStyle=i,e.fillRect(0,0,1024,256);let o=e.createLinearGradient(0,0,1024,0);o.addColorStop(0,`rgba(0, 0, 0, 0.9)`),o.addColorStop(.55,`rgba(0, 0, 0, 0.5)`),o.addColorStop(1,`rgba(0, 0, 0, 0)`),e.fillStyle=o,e.fillRect(0,0,1024,256),e.globalCompositeOperation=`source-over`}drawWatchers(t){let s=Math.min(this.width,this.height)*wt$1;t.save(),t.globalCompositeOperation=`lighter`;for(let e of this.watchers.list)e.openness>.02&&this.drawEyes(t,e,s);t.restore()}drawEyes(t,s,e){let i=e*s.scale,o=i*.62,a=i*1.5,l=Math.sign(this.width/2-s.x)*i*.22,n=Math.sign(this.height/2-s.y)*o*.2;t.save(),t.translate(s.x,s.y),t.rotate(s.tilt);for(let c of[-1,1]){t.save(),t.translate(c*a,0),t.scale(1,s.openness),t.beginPath(),t.ellipse(0,0,i,o,0,0,H$3),t.clip();let d=t.createRadialGradient(l,n,0,l,n,i);d.addColorStop(0,`rgba(${L$3}, 0)`),d.addColorStop(.42,`rgba(${L$3}, ${.95*s.openness})`),d.addColorStop(1,`rgba(${L$3}, 0)`),t.fillStyle=d,t.fillRect(-i,-o,i*2,o*2),t.restore()}t.restore()}drawStageLights(t,s){let e=this.beat.envelope(s.t,2);if(e<.03)return;let{width:i,height:o}=this,a=this.beat.beatIndex(s.t),l=P[a%P.length],n=P[(a+2)%P.length],c=Math.sin(s.t*.7),d=Math.max(i,o)*.9;t.save(),t.globalCompositeOperation=`lighter`,t.globalAlpha=e*Ft$1,this.washLight(t,i*(.28+.16*c),o*.02,d,l),this.washLight(t,i*(.72-.16*c),o*.02,d,n),t.restore()}washLight(t,s,e,i,o){let a=t.createRadialGradient(s,e,0,s,e,i);a.addColorStop(0,`rgba(${o}, 0.9)`),a.addColorStop(1,`rgba(${o}, 0)`),t.fillStyle=a,t.fillRect(0,0,this.width,this.height)}blinkFrameIndex(t){if(this.nextBlinkAt===0&&(this.nextBlinkAt=t+r$1(U$3,W$2)),this.blinkStartT<0){if(t<this.nextBlinkAt)return 0;this.blinkStartT=t}let s=t-this.blinkStartT;return s*1e3>=this.blinkMotion.durationMs?(this.blinkStartT=-1,this.nextBlinkAt=t+r$1(U$3,W$2),0):this.blinkMotion.indexAt(s)}drawHead(t,s){let e=this.frames[this.blinkFrameIndex(s.t)];if(!e)return;let{width:i,height:o}=this,a=s.t,l=s.pointer,n=l.active?g$1((l.x-i/2)/(i/2),-1,1):0,c=l.active?g$1((l.y-o/2)/(o/2),-1,1):0;this.headParallax.update(n,c);let d=Math.min(i,o)*Y$3,p=this.featherHead(e,d);if(!p)return;let f=d*Nt$1,A=(Math.sin(a*.37)+.5*Math.sin(a*.91+1.3))*f,z=(Math.sin(a*.29+2.1)+.5*Math.sin(a*.83))*f,q=1+Math.sin(a*Dt$2)*Lt$2,K=Math.sin(a*Xt$2)*kt$1,j=i/2+A+this.headParallax.x,V=o/2+z+this.headParallax.y,S=d*q;t.save(),t.translate(j,V),t.rotate(K),t.drawImage(p,-S/2,-S/2,S,S),t.restore()}featherHead(t,s){let e=this.headBuffer,i=Math.max(1,Math.ceil(s));(e.width!==i||e.height!==i)&&(e.width=i,e.height=i);let o=e.getContext(`2d`);if(!o)return null;o.clearRect(0,0,i,i),o.globalCompositeOperation=`source-over`,o.drawImage(t,0,0,i,i);let a=i/2;o.globalCompositeOperation=`destination-in`;let l=o.createRadialGradient(a,a,a*.86,a,a,a*1.18);return l.addColorStop(0,`rgba(0, 0, 0, 1)`),l.addColorStop(1,`rgba(0, 0, 0, 0)`),o.fillStyle=l,o.fillRect(0,0,i,i),o.globalCompositeOperation=`source-over`,e}paintBase(t){t.fillStyle=bt$3,t.fillRect(0,0,this.width,this.height)}};var Gt$3={believe:{label:`Believe`,factory:()=>new I$2},hide:{label:`Hide until everybody is dead`,factory:()=>new v$2}};var As$1=Object.entries(Gt$3).map(([h,t])=>({id:h,label:t.label}));var r=(function(t){return t.MEDIUM=`Medium`,t.HEIGHT=`Height`,t.WIDTH=`Width`,t.UNIT=`Unit`,t.YEAR=`Year`,t.IMAGETYPE=`Image Type`,t.ARTIST=`Artist`,t.PROJECT=`Project`,t.DESC_AUTHOR=`Description Author`,t.DESC_LANG=`Description language`,t.VERSION=`Version`,t})(r||{});var e$1=(function(t){return t.FRONTAL=`Frontal view`,t.PROGRESS=`Work in progress`,t.DETAIL=`Detail`,t})(e$1||{});var n$2=(function(t){return t.YEAR=`year`,t.SIZE=`size`,t.MEDIUM=`medium`,t})(n$2||{});var o=`0x6E8b1D55B3fb934149b1125964a9c01a87995548`;var E$1=`https://juanmamoreno.com/artwork`;var i=`https://etherscan.io`;function a$1(t){return`${i}/nft/${o}/${t}`}var c$3=[`23`,`24`,`25`,`26`,`30`,`34`,`37`,`58`,`59`,`61`,`64`,`66`,`70`,`71`,`72`,`74`,`75`,`77`,`94`,`97`,`112`,`114`,`115`,`118`,`117`,`126`,`136`,`159`,`161`,`163`,`165`];var f=`primary`;var Be=Symbol(`RouteTitle`);var Vt$1=class{params;constructor(n){this.params=n||{}}has(n){return Object.hasOwn(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function se$1(t){return new Vt$1(t)}function qt$2(t,n,e){for(let r=0;r<t.length;r++){let i=t[r],o=n[r];if(i[0]===`:`)e[i.substring(1)]=o;else if(i!==o.path)return!1}return!0}function an$2(t,n,e){let r=e.path.split(`/`),i=r.indexOf(`**`);if(i===-1){if(r.length>t.length||e.pathMatch===`full`&&(n.hasChildren()||r.length<t.length))return null;let a={},u=t.slice(0,r.length);return qt$2(r,u,a)?{consumed:u,posParams:a}:null}if(i!==r.lastIndexOf(`**`))return null;let o=r.slice(0,i),s=r.slice(i+1);if(o.length+s.length>t.length||e.pathMatch===`full`&&n.hasChildren()&&e.path!==`**`)return null;let c={};return!qt$2(o,t.slice(0,o.length),c)||!qt$2(s,t.slice(t.length-s.length),c)?null:{consumed:t,posParams:c}}function ut$2(t){return new Promise((n,e)=>{t.pipe(jy()).subscribe({next:r=>n(r),error:r=>e(r)})})}function ti$1(t,n){if(t.length!==n.length)return!1;for(let e=0;e<t.length;++e)if(!H$2(t[e],n[e]))return!1;return!0}function H$2(t,n){let e=t?Gt$2(t):void 0,r=n?Gt$2(n):void 0;if(!e||!r||e.length!=r.length)return!1;let i;for(let o=0;o<e.length;o++)if(i=e[o],!cn$2(t[i],n[i]))return!1;return!0}function Gt$2(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function cn$2(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return!1;let e=[...t].sort(),r=[...n].sort();return e.every((i,o)=>r[o]===i)}else return t===n}function ri$1(t){return t.length>0?t[t.length-1]:null}function ue$1(t){return my(t)?t:Xl(t)?je$1(Promise.resolve(t)):hy(t)}function un$2(t){return my(t)?ut$2(t):Promise.resolve(t)}var ni$1={exact:dn$2,subset:hn$2};var ln$2={exact:ii$1,subset:oi$1,ignored:()=>!0};var ar$1={paths:`exact`,fragment:`ignored`,matrixParams:`ignored`,queryParams:`exact`};var pe={paths:`subset`,fragment:`ignored`,matrixParams:`ignored`,queryParams:`subset`};function cr$1(t,n,e){let r=t instanceof A$1?t:n.parseUrl(t);return _t$5(()=>Wt$2(n.lastSuccessfulNavigation()?.finalUrl??new A$1,r,r$2(r$2({},pe),e)))}function Wt$2(t,n,e){return ni$1[e.paths](t.root,n.root,e.matrixParams)&&ln$2[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment===`exact`&&t.fragment!==n.fragment)}function ii$1(t,n){return H$2(t,n)}function dn$2(t,n,e){if(!oe$1(t.segments,n.segments)||!st$3(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return!1;for(let r in n.children)if(!t.children[r]||!dn$2(t.children[r],n.children[r],e))return!1;return!0}function oi$1(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>cn$2(t[e],n[e]))}function hn$2(t,n,e){return fn$2(t,n,n.segments,e)}function fn$2(t,n,e,r){if(t.segments.length>e.length){let i=t.segments.slice(0,e.length);return!(!oe$1(i,e)||n.hasChildren()||!st$3(i,e,r))}else if(t.segments.length===e.length){if(!oe$1(t.segments,e)||!st$3(t.segments,e,r))return!1;for(let i in n.children)if(!t.children[i]||!hn$2(t.children[i],n.children[i],r))return!1;return!0}else{let i=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return!oe$1(t.segments,i)||!st$3(t.segments,i,r)||!t.children[f]?!1:fn$2(t.children[f],n,o,r)}}function st$3(t,n,e){return n.every((r,i)=>ln$2[e](t[i].parameters,r.parameters))}var A$1=class{root;queryParams;fragment;_queryParamMap;constructor(n=new m$2([],{}),e={},r=null){this.root=n,this.queryParams=e,this.fragment=r}get queryParamMap(){return this._queryParamMap??=se$1(this.queryParams),this._queryParamMap}toString(){return ci$1.serialize(this)}};var m$2=class{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return at$4(this)}};var Z$2=class{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e}get parameterMap(){return this._parameterMap??=se$1(this.parameters),this._parameterMap}toString(){return gn$2(this)}};function si$1(t,n){return oe$1(t,n)&&t.every((e,r)=>H$2(e.parameters,n[r].parameters))}function oe$1(t,n){return t.length!==n.length?!1:t.every((e,r)=>e.path===n[r].path)}function ai$1(t,n){let e=[];return Object.entries(t.children).forEach(([r,i])=>{r===f&&(e=e.concat(n(i,r)))}),Object.entries(t.children).forEach(([r,i])=>{r!==f&&(e=e.concat(n(i,r)))}),e}var Se$2=(()=>{class t{static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:()=>new J$1})}return t})();var J$1=class{parse(n){let e=new Kt$2(n);return new A$1(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){return`${`/${_e$1(n.root,!0)}`}${di$1(n.queryParams)}${typeof n.fragment==`string`?`#${ui$2(n.fragment)}`:``}`}};var ci$1=new J$1;function at$4(t){return t.segments.map(n=>gn$2(n)).join(`/`)}function _e$1(t,n){if(!t.hasChildren())return at$4(t);if(n){let e=t.children[f]?_e$1(t.children[f],!1):``,r=[];return Object.entries(t.children).forEach(([i,o])=>{i!==f&&r.push(`${i}:${_e$1(o,!1)}`)}),r.length>0?`${e}(${r.join(`//`)})`:e}else{let e=ai$1(t,(r,i)=>i===f?[_e$1(t.children[f],!1)]:[`${i}:${_e$1(r,!1)}`]);return Object.keys(t.children).length===1&&t.children[f]!=null?`${at$4(t)}/${e[0]}`:`${at$4(t)}/(${e.join(`//`)})`}}function pn$2(t){return encodeURIComponent(t).replace(/%40/g,`@`).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`)}function it$3(t){return pn$2(t).replace(/%3B/gi,`;`)}function ui$2(t){return encodeURI(t)}function Qt$2(t){return pn$2(t).replace(/\(/g,`%28`).replace(/\)/g,`%29`).replace(/%26/gi,`&`)}function ct$1(t){return decodeURIComponent(t)}function en$2(t){return ct$1(t.replace(/\+/g,`%20`))}function gn$2(t){return`${Qt$2(t.path)}${li$1(t.parameters)}`}function li$1(t){return Object.entries(t).map(([n,e])=>`;${Qt$2(n)}=${Qt$2(e)}`).join(``)}function di$1(t){let n=Object.entries(t).map(([e,r])=>Array.isArray(r)?r.map(i=>`${it$3(e)}=${it$3(i)}`).join(`&`):`${it$3(e)}=${it$3(r)}`).filter(e=>e);return n.length?`?${n.join(`&`)}`:``}var hi$2=/^[^\/()?;#]+/;function Ft(t){let n=t.match(hi$2);return n?n[0]:``}var fi$2=/^[^\/()?;=#]+/;function pi$2(t){let n=t.match(fi$2);return n?n[0]:``}var gi$2=/^[^=?&#]+/;function vi$2(t){let n=t.match(gi$2);return n?n[0]:``}var mi$1=/^[^&#]+/;function yi$1(t){let n=t.match(mi$1);return n?n[0]:``}var Kt$2=class{url;remaining;constructor(n){this.url=n,this.remaining=n}parseRootSegment(){for(;this.consumeOptional(`/`););return this.remaining===``||this.peekStartsWith(`?`)||this.peekStartsWith(`#`)?new m$2([],{}):new m$2([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional(`?`))do this.parseQueryParam(n);while(this.consumeOptional(`&`));return n}parseFragment(){return this.consumeOptional(`#`)?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new T$3(4010,!1);if(this.remaining===``)return{};this.consumeOptional(`/`);let e=[];for(this.peekStartsWith(`(`)||e.push(this.parseSegment());this.peekStartsWith(`/`)&&!this.peekStartsWith(`//`)&&!this.peekStartsWith(`/(`);)this.capture(`/`),e.push(this.parseSegment());let r={};this.peekStartsWith(`/(`)&&(this.capture(`/`),r=this.parseParens(!0,n));let i={};return this.peekStartsWith(`(`)&&(i=this.parseParens(!1,n)),(e.length>0||Object.keys(r).length>0)&&(i[f]=new m$2(e,r)),i}parseSegment(){let n=Ft(this.remaining);if(n===``&&this.peekStartsWith(`;`))throw new T$3(4009,!1);return this.capture(n),new Z$2(ct$1(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(`;`);)this.parseParam(n);return n}parseParam(n){let e=pi$2(this.remaining);if(!e)return;this.capture(e);let r=``;if(this.consumeOptional(`=`)){let i=Ft(this.remaining);i&&(r=i,this.capture(r))}n[ct$1(e)]=ct$1(r)}parseQueryParam(n){let e=vi$2(this.remaining);if(!e)return;this.capture(e);let r=``;if(this.consumeOptional(`=`)){let s=yi$1(this.remaining);s&&(r=s,this.capture(r))}let i=en$2(e),o=en$2(r);if(Object.hasOwn(n,i)){let s=n[i];Array.isArray(s)||(s=[s],n[i]=s),s.push(o)}else n[i]=o}parseParens(n,e){let r=Object.create(null);for(this.capture(`(`);!this.consumeOptional(`)`)&&this.remaining.length>0;){let i=Ft(this.remaining),o=this.remaining[i.length];if(o!==`/`&&o!==`)`&&o!==`;`)throw new T$3(4010,!1);let s;i.indexOf(`:`)>-1?(s=i.slice(0,i.indexOf(`:`)),this.capture(s),this.capture(`:`)):n&&(s=f);let c=this.parseChildren(e+1);r[s??f]=Object.keys(c).length===1&&c[f]?c[f]:new m$2([],c),this.consumeOptional(`//`)}return r}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),!0):!1}capture(n){if(!this.consumeOptional(n))throw new T$3(4011,!1)}};function vn$1(t){return t.segments.length>0?new m$2([],{[f]:t}):t}function mn$2(t){let n=Object.create(null);for(let[r,i]of Object.entries(t.children)){let o=mn$2(i);if(r===f&&o.segments.length===0&&o.hasChildren())for(let[s,c]of Object.entries(o.children))n[s]=c;else(o.segments.length>0||o.hasChildren())&&(n[r]=o)}return Ri$1(new m$2(t.segments,n))}function Ri$1(t){if(t.numberOfChildren===1&&t.children[f]){let n=t.children[f];return new m$2(t.segments.concat(n.segments),n.children)}return t}function X$2(t){return t instanceof A$1}function yn$2(t,n,e=null,r=null,i=new J$1){return Sn$2(Rn(t),n,e,r,i)}function Rn(t){let n;function e(o){let s={};for(let a of o.children){let u=e(a);s[a.outlet]=u}let c=new m$2(o.url,s);return o===t&&(n=c),c}let i=vn$1(e(t.root));return n??i}function Sn$2(t,n,e,r,i){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return Ht$2(o,o,o,e,r,i);let s=Si$2(n);if(s.toRoot())return Ht$2(o,o,new m$2([],{}),e,r,i);let c=Ci$2(s,o,t),a=c.processChildren?Oe$1(c.segmentGroup,c.index,s.commands):wn(c.segmentGroup,c.index,s.commands);return Ht$2(o,c.segmentGroup,a,e,r,i)}function lt$2(t){return typeof t==`object`&&t!=null&&!t.outlets&&!t.segmentPath}function je(t){return typeof t==`object`&&t!=null&&t.outlets}function tn$2(t,n,e){t||=`ɵ`;let r=new A$1;return r.queryParams={[t]:n},e.parse(e.serialize(r)).queryParams[t]}function Ht$2(t,n,e,r,i,o){let s={};for(let[u,d]of Object.entries(r??{}))s[u]=Array.isArray(d)?d.map(v=>tn$2(u,v,o)):tn$2(u,d,o);let c;t===n?c=e:c=Cn$2(t,n,e);return new A$1(vn$1(mn$2(c)),s,i)}function Cn$2(t,n,e){let r=Object.create(null);return Object.entries(t.children).forEach(([i,o])=>{o===n?r[i]=e:r[i]=Cn$2(o,n,e)}),new m$2(t.segments,r)}var dt$2=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,r){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=r,n&&r.length>0&&lt$2(r[0]))throw new T$3(4003,!1);let i=r.find(je);if(i&&i!==ri$1(r))throw new T$3(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]==`/`}};function Si$2(t){if(typeof t[0]==`string`&&t.length===1&&t[0]===`/`)return new dt$2(!0,0,t);let n=0,e=!1,r=t.reduce((i,o,s)=>{if(typeof o==`object`&&o!=null){if(o.outlets){let c={};return Object.entries(o.outlets).forEach(([a,u])=>{c[a]=typeof u==`string`?u.split(`/`):u}),[...i,{outlets:c}]}if(o.segmentPath)return[...i,o.segmentPath]}return typeof o!=`string`?[...i,o]:s===0?(o.split(`/`).forEach((c,a)=>{a==0&&c===`.`||(a==0&&c===``?e=!0:c===`..`?n++:c!=``&&i.push(c))}),i):[...i,o]},[]);return new dt$2(e,n,r)}var he$1=class{segmentGroup;processChildren;index;constructor(n,e,r){this.segmentGroup=n,this.processChildren=e,this.index=r}};function Ci$2(t,n,e){if(t.isAbsolute)return new he$1(n,!0,0);if(!e)return new he$1(n,!1,NaN);if(e.parent===null)return new he$1(e,!0,0);let r=lt$2(t.commands[0])?0:1;return wi$1(e,e.segments.length-1+r,t.numberOfDoubleDots)}function wi$1(t,n,e){let r=t,i=n,o=e;for(;o>i;){if(o-=i,r=r.parent,!r)throw new T$3(4005,!1);i=r.segments.length}return new he$1(r,!1,i-o)}function bi$2(t){return je(t[0])?t[0].outlets:{[f]:t}}function wn(t,n,e){if(t??=new m$2([],{}),t.segments.length===0&&t.hasChildren())return Oe$1(t,n,e);let r=Ii$1(t,n,e),i=e.slice(r.commandIndex);if(r.match&&r.pathIndex<t.segments.length){let o=new m$2(t.segments.slice(0,r.pathIndex),{});return o.children[f]=new m$2(t.segments.slice(r.pathIndex),t.children),Oe$1(o,0,i)}else return r.match&&i.length===0?new m$2(t.segments,{}):r.match&&!t.hasChildren()?Yt$2(t,n,e):r.match?Oe$1(t,0,i):Yt$2(t,n,e)}function Oe$1(t,n,e){if(e.length===0)return new m$2(t.segments,{});{let r=bi$2(e),i=Object.create(null);if(Object.keys(r).some(o=>o!==f)&&t.children[f]&&t.numberOfChildren===1&&t.children[f].segments.length===0){let o=Oe$1(t.children[f],n,e);return new m$2(t.segments,o.children)}return Object.entries(r).forEach(([o,s])=>{typeof s==`string`&&(s=[s]),s!==null&&(i[o]=wn(t.children[o],n,s))}),Object.entries(t.children).forEach(([o,s])=>{r[o]===void 0&&(i[o]=s)}),new m$2(t.segments,i)}}function Ii$1(t,n,e){let r=0,i=n,o={match:!1,pathIndex:0,commandIndex:0};for(;i<t.segments.length;){if(r>=e.length)return o;let s=t.segments[i],c=e[r];if(je(c))break;let a=`${c}`,u=r<e.length-1?e[r+1]:null;if(i>0&&a===void 0)break;if(a&&u&&typeof u==`object`&&u.outlets===void 0){if(!nn$2(a,u,s))return o;r+=2}else{if(!nn$2(a,{},s))return o;r++}i++}return{match:!0,pathIndex:i,commandIndex:r}}function Yt$2(t,n,e){let r=t.segments.slice(0,n),i=0;for(;i<e.length;){let o=e[i];if(je(o))return new m$2(r,Ei$2(o.outlets));if(i===0&&lt$2(e[0])){let a=t.segments[n];r.push(new Z$2(a.path,rn$2(e[0]))),i++;continue}let s=je(o)?o.outlets[f]:`${o}`,c=i<e.length-1?e[i+1]:null;s&&c&&lt$2(c)?(r.push(new Z$2(s,rn$2(c))),i+=2):(r.push(new Z$2(s,{})),i++)}return new m$2(r,{})}function Ei$2(t){let n={};return Object.entries(t).forEach(([e,r])=>{typeof r==`string`&&(r=[r]),r!==null&&(n[e]=Yt$2(new m$2([],{}),0,r))}),n}function rn$2(t){let n={};return Object.entries(t).forEach(([e,r])=>n[e]=`${r}`),n}function nn$2(t,n,e){return t==e.path&&H$2(n,e.parameters)}var Pe=`imperative`;var S$1=(function(t){return t[t.NavigationStart=0]=`NavigationStart`,t[t.NavigationEnd=1]=`NavigationEnd`,t[t.NavigationCancel=2]=`NavigationCancel`,t[t.NavigationError=3]=`NavigationError`,t[t.RoutesRecognized=4]=`RoutesRecognized`,t[t.ResolveStart=5]=`ResolveStart`,t[t.ResolveEnd=6]=`ResolveEnd`,t[t.GuardsCheckStart=7]=`GuardsCheckStart`,t[t.GuardsCheckEnd=8]=`GuardsCheckEnd`,t[t.RouteConfigLoadStart=9]=`RouteConfigLoadStart`,t[t.RouteConfigLoadEnd=10]=`RouteConfigLoadEnd`,t[t.ChildActivationStart=11]=`ChildActivationStart`,t[t.ChildActivationEnd=12]=`ChildActivationEnd`,t[t.ActivationStart=13]=`ActivationStart`,t[t.ActivationEnd=14]=`ActivationEnd`,t[t.Scroll=15]=`Scroll`,t[t.NavigationSkipped=16]=`NavigationSkipped`,t})(S$1||{});var U$2=class{id;url;constructor(n,e){this.id=n,this.url=e}};var ae$1=class extends U$2{type=S$1.NavigationStart;navigationTrigger;restoredState;constructor(n,e,r=`imperative`,i=null){super(n,e),this.navigationTrigger=r,this.restoredState=i}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}};var j$2=class extends U$2{urlAfterRedirects;type=S$1.NavigationEnd;constructor(n,e,r){super(n,e),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}};var b=(function(t){return t[t.Redirect=0]=`Redirect`,t[t.SupersededByNewNavigation=1]=`SupersededByNewNavigation`,t[t.NoDataFromResolver=2]=`NoDataFromResolver`,t[t.GuardRejected=3]=`GuardRejected`,t[t.Aborted=4]=`Aborted`,t})(b||{});var xe=(function(t){return t[t.IgnoredSameUrlNavigation=0]=`IgnoredSameUrlNavigation`,t[t.IgnoredByUrlHandlingStrategy=1]=`IgnoredByUrlHandlingStrategy`,t})(xe||{});var L$2=class extends U$2{reason;code;type=S$1.NavigationCancel;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function bn$2(t){return t instanceof L$2&&(t.code===b.Redirect||t.code===b.SupersededByNewNavigation)}var G$3=class extends U$2{reason;code;type=S$1.NavigationSkipped;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i}};var ce$1=class extends U$2{error;target;type=S$1.NavigationError;constructor(n,e,r,i){super(n,e),this.error=r,this.target=i}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}};var ke=class extends U$2{urlAfterRedirects;state;type=S$1.RoutesRecognized;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}};var ht$3=class extends U$2{urlAfterRedirects;state;type=S$1.GuardsCheckStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}};var ft$3=class extends U$2{urlAfterRedirects;state;shouldActivate;type=S$1.GuardsCheckEnd;constructor(n,e,r,i,o){super(n,e),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}};var pt$2=class extends U$2{urlAfterRedirects;state;type=S$1.ResolveStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}};var gt$3=class extends U$2{urlAfterRedirects;state;type=S$1.ResolveEnd;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}};var vt$1=class{route;type=S$1.RouteConfigLoadStart;constructor(n){this.route=n}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}};var mt$1=class{route;type=S$1.RouteConfigLoadEnd;constructor(n){this.route=n}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}};var yt$1=class{snapshot;type=S$1.ChildActivationStart;constructor(n){this.snapshot=n}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||``}')`}};var Rt=class{snapshot;type=S$1.ChildActivationEnd;constructor(n){this.snapshot=n}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||``}')`}};var St=class{snapshot;type=S$1.ActivationStart;constructor(n){this.snapshot=n}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||``}')`}};var Ct=class{snapshot;type=S$1.ActivationEnd;constructor(n){this.snapshot=n}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||``}')`}};var ge=class{};var $e$1=class{};var ve=class{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e}};function Mi$1(t){return!(t instanceof ge)&&!(t instanceof ve)&&!(t instanceof $e$1)}var wt=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new Ce(this.rootInjector)}};var Ce=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,r){let i=this.getOrCreateContext(e);i.outlet=r,this.contexts.set(e,i)}onChildOutletDestroyed(e){let r=this.getContext(e);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let r=this.getContext(e);return r||(r=new wt(this.rootInjector),this.contexts.set(e,r)),r}getContext(e){return this.contexts.get(e)||null}static ɵfac=function(r){return new(r||t)($e$3(me$2))};static ɵprov=de$3({token:t,factory:t.ɵfac,providedIn:`root`})}return t})();var bt$2=class{_root;constructor(n){this._root=n}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=Zt$2(n,this._root);return e?e.children.map(r=>r.value):[]}firstChild(n){let e=Zt$2(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=Jt$1(n,this._root);return e.length<2?[]:e[e.length-2].children.map(i=>i.value).filter(i=>i!==n)}pathFromRoot(n){return Jt$1(n,this._root).map(e=>e.value)}};function Zt$2(t,n){if(t===n.value)return n;for(let e of n.children){let r=Zt$2(t,e);if(r)return r}return null}function Jt$1(t,n){if(t===n.value)return[n];for(let e of n.children){let r=Jt$1(t,e);if(r.length)return r.unshift(n),r}return[]}var _$2=class{value;children;constructor(n,e){this.value=n,this.children=e}toString(){return`TreeNode(${this.value})`}};function de$2(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var ze=class extends bt$2{snapshot;constructor(n,e){super(n),this.snapshot=e,lr$1(this,n)}toString(){return this.snapshot.toString()}};function In(t,n){let e=Ai$2(t,n),r=new nr$2([new Z$2(``,{})]),i=new nr$2({}),o=new nr$2({}),a=new W$1(r,i,new nr$2({}),new nr$2(``),o,f,t,e.root);return a.snapshot=e.root,new ze(new _$2(a,[]),e)}function Ai$2(t,n){return new qe$1(``,new _$2(new me$1([],{},{},``,{},f,t,null,{},n),[]))}var W$1=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;resources;_localInjector;pending;paramsSignal;queryParamsSignal;paramMapSignal;queryParamMapSignal;fragmentSignal;dataSignal;constructor(n,e,r,i,o,s,c,a){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=s,this.component=c,this._futureSnapshot=a,this.title=this.dataSubject?.pipe(Ve$3(u=>u[Be]))??hy(void 0),this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(Ve$3(n=>se$1(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(Ve$3(n=>se$1(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}_setPending(n){this._futureSnapshot=n,this.pending?.set(!0)}};var Ni$2=`always`;function ur$1(t,n,e){let r,{routeConfig:i}=t;return n!==null&&(e===`always`||i?.path===``||!n.component&&!n.routeConfig?.loadComponent)?r={params:r$2(r$2({},n.params),t.params),data:r$2(r$2({},n.data),t.data),resolve:r$2(r$2(r$2(r$2({},t.data),n.data),i?.data),t._resolvedData)}:r={params:r$2({},t.params),data:r$2({},t.data),resolve:r$2(r$2({},t.data),t._resolvedData??{})},i&&Mn$1(i)&&(r.resolve[Be]=i.title),r}var me$1=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;resources;get title(){return this.data?.[Be]}constructor(n,e,r,i,o,s,c,a,u,d){this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=s,this.component=c,this.routeConfig=a,this._resolve=u,this._environmentInjector=d}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=se$1(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=se$1(this.queryParams),this._queryParamMap}toString(){return`Route(url:'${this.url.map(r=>r.toString()).join(`/`)}', path:'${this.routeConfig?this.routeConfig.path:``}')`}};var qe$1=class extends bt$2{url;constructor(n,e){super(e),this.url=n,lr$1(this,e)}toString(){return En$1(this._root)}};function lr$1(t,n){n.value._routerState=t,n.children.forEach(e=>lr$1(t,e))}function En$1(t){let n=t.children.length>0?` { ${t.children.map(En$1).join(`, `)} } `:``;return`${t.value}${n}`}function Bt$1(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,H$2(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),H$2(n.params,e.params)||t.paramsSubject.next(e.params),ti$1(n.url,e.url)||t.urlSubject.next(e.url),H$2(n.data,e.data)||t.dataSubject.next(e.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function Xt$1(t,n){let e=H$2(t.params,n.params)&&si$1(t.url,n.url),r=!t.parent!=!n.parent;return e&&!r&&(!t.parent||Xt$1(t.parent,n.parent))}function Mn$1(t){return typeof t.title==`string`||t.title===null}var An$1=new S$2(``);var dr$1=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=f;activateEvents=new tt$6;deactivateEvents=new tt$6;attachEvents=new tt$6;detachEvents=new tt$6;routerOutletData=BV();parentContexts=y$3(Ce);location=y$3(Ns$1);changeDetector=y$3(QV);inputBinder=y$3(At,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:r,previousValue:i}=e.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new T$3(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new T$3(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new T$3(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,r){this.activated=e,this._activatedRoute=r,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this,this.location.injector),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,r){if(this.isActivated)throw new T$3(4013,!1);this._activatedRoute=e;let i=this.location,s=e.snapshot.component,c=this.parentContexts.getOrCreateContext(this.name).children,a=new er$1(e,c,i.injector,this.routerOutletData);this.activated=i.createComponent(s,{index:i.length,injector:a,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this,this.location.injector),this.activateEvents.emit(this.activated.instance)}static ɵfac=function(r){return new(r||t)};static ɵdir=ew({type:t,selectors:[[`router-outlet`]],inputs:{name:`name`,routerOutletData:[1,`routerOutletData`]},outputs:{activateEvents:`activate`,deactivateEvents:`deactivate`,attachEvents:`attach`,detachEvents:`detach`},exportAs:[`outlet`],features:[qE]})}return t})();var er$1=class{route;childContexts;parent;outletData;constructor(n,e,r,i){this.route=n,this.childContexts=e,this.parent=r,this.outletData=i}get(n,e){return n===W$1?this.route:n===Ce?this.childContexts:n===An$1?this.outletData:this.parent.get(n,e)}};var At=new S$2(``);var hr$1=(()=>{class t{static ɵfac=function(r){return new(r||t)};static ɵcmp=YC({type:t,selectors:[[`ng-component`]],exportAs:[`emptyRouterOutlet`],decls:1,vars:0,template:function(r,i){r&1&&xm(0,`router-outlet`)},dependencies:[dr$1],encapsulation:2,changeDetection:1})}return t})();function fr(t){let n=t.children&&t.children.map(fr),e=n?s$1(r$2({},t),{children:n}):r$2({},t);return!e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==f&&(e.component=hr$1),e}function Ti$1(t,n,e){let r=new Set;return{newlyCreatedRoutes:r,state:new ze(Fe$1(t,n._root,e?e._root:void 0,r),n)}}function Fe$1(t,n,e,r){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let i=e.value;i._setPending(n.value);return new _$2(i,Di$1(t,n,e,r))}else{if(t.shouldAttach(n.value)){let s=t.retrieve(n.value);if(s!==null){let c=s.route;return c.value._setPending(n.value),c.children=n.children.map(a=>Fe$1(t,a,void 0,r)),c}}let i=_i$1(n.value);i._setPending(n.value),r.add(i);return new _$2(i,n.children.map(s=>Fe$1(t,s,void 0,r)))}}function Di$1(t,n,e,r){return n.children.map(i=>{for(let o of e.children)if(t.shouldReuseRoute(i.value,o.value.snapshot))return Fe$1(t,i,o,r);return Fe$1(t,i,void 0,r)})}function _i$1(t){return new W$1(new nr$2(t.url),new nr$2(t.params),new nr$2(t.queryParams),new nr$2(t.fragment),new nr$2(t.data),t.outlet,t.component,t)}var ye=class{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e}};var Nn$1=`ngNavigationCancelingError`;function It$1(t,n){let{redirectTo:e,navigationBehaviorOptions:r}=X$2(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,i=Tn(!1,b.Redirect);return i.url=e,i.navigationBehaviorOptions=r,i}function Tn(t,n){let e=new Error(`NavigationCancelingError: ${t||``}`);return e[Nn$1]=!0,e.cancellationCode=n,e}function Ui$1(t){return Dn(t)&&X$2(t.url)}function Dn(t){return!!t&&t[Nn$1]}var tr$1=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,r,i,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o}activate(n){let e=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,r,n),Bt$1(this.futureState.root),this.activateChildRoutes(e,r,n)}deactivateChildRoutes(n,e,r){let i=de$2(e);n.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,i[s],r),delete i[s]}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r)})}deactivateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(i===o)if(i.component){let s=r.getContext(i.outlet);s&&this.deactivateChildRoutes(n,e,s.children)}else this.deactivateChildRoutes(n,e,r);else o&&this.deactivateRouteAndItsChildren(e,r)}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e)}detachAndStoreRouteSubtree(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=de$2(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);if(r&&r.outlet){let s=r.outlet.detach(),c=r.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:s,route:n,contexts:c})}}deactivateRouteAndOutlet(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=de$2(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null),n.value._localInjector?.destroy()}activateChildRoutes(n,e,r){let i=de$2(e);n.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new Ct(o.value.snapshot))}),n.children.length&&this.forwardEvent(new Rt(n.value.snapshot))}activateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(Bt$1(i),i===o)if(i.component){let s=r.getOrCreateContext(i.outlet);this.activateChildRoutes(n,e,s.children)}else this.activateChildRoutes(n,e,r);else if(i.component){let s=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let c=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),s.children.onOutletReAttached(c.contexts),s.attachRef=c.componentRef,s.route=c.route.value,s.outlet&&s.outlet.attach(c.componentRef,c.route.value),Bt$1(c.route.value),this.activateChildRoutes(n,null,s.children)}else s.attachRef=null,s.route=i,s.outlet&&s.outlet.activateWith(i,s.injector),this.activateChildRoutes(n,null,s.children)}else this.activateChildRoutes(n,null,r)}};var Et$1=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1]}};var fe$1=class{component;route;constructor(n,e){this.component=n,this.route=e}};function Oi$1(t,n,e){let r=t._root;return Ue$1(r,n?n._root:null,e,[r.value])}function Pi$1(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return!n||n.length===0?null:{node:t,guards:n}}function we$1(t,n){let e=Symbol(),r=n.get(t,e);return r===e?typeof t==`function`&&!Ky(t)?t:n.get(t):r}function Ue$1(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=de$2(n);return t.children.forEach(s=>{Li$1(s,o[s.value.outlet],e,r.concat([s.value]),i),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,c])=>Le(c,e.getContext(s),e,i)),i}function Li$1(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=n?n.value:null,c=e?e.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let a=ji$1(s,o,o.routeConfig.runGuardsAndResolvers);a?i.canActivateChecks.push(new Et$1(r)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Ue$1(t,n,c?c.children:null,r,i):Ue$1(t,n,e,r,i),a&&c&&c.outlet&&c.outlet.isActivated&&i.canDeactivateChecks.push(new fe$1(c.outlet.component,s))}else s&&Le(n,c,e,i),i.canActivateChecks.push(new Et$1(r)),o.component?Ue$1(t,null,c?c.children:null,r,i):Ue$1(t,null,e,r,i);return i}function ji$1(t,n,e){if(typeof e==`function`)return di$2(n._environmentInjector,()=>e(t,n));switch(e){case`pathParamsChange`:return!oe$1(t.url,n.url);case`pathParamsOrQueryParamsChange`:return!oe$1(t.url,n.url)||!H$2(t.queryParams,n.queryParams);case`always`:return!0;case`paramsOrQueryParamsChange`:return!Xt$1(t,n)||!H$2(t.queryParams,n.queryParams);default:return!Xt$1(t,n)}}function Le(t,n,e,r){let i=de$2(t),o=t.value;Object.entries(i).forEach(([s,c])=>{o.component?n?Le(c,n.children.getContext(s),n.children,r):Le(c,null,null,r):Le(c,e?e.getContext(s):null,e,r)}),o.component?n&&n.outlet&&n.outlet.isActivated?r.canDeactivateChecks.push(new fe$1(n.outlet.component,o)):r.canDeactivateChecks.push(new fe$1(null,o)):r.canDeactivateChecks.push(new fe$1(null,o))}function Ve$1(t){return typeof t==`function`}function xi$2(t){return typeof t==`boolean`}function ki$2(t){return t&&Ve$1(t.canLoad)}function $i$2(t){return t&&Ve$1(t.canActivate)}function zi$1(t){return t&&Ve$1(t.canActivateChild)}function qi$1(t){return t&&Ve$1(t.canDeactivate)}function Fi$1(t){return t&&Ve$1(t.canMatch)}function _n$2(t){return t instanceof kt$2||t?.name===`EmptyError`}var ot$4=Symbol(`INITIAL_VALUE`);function Re$1(){return Xu(t=>Sy(t.map(n=>n.pipe(Lt$4(1),hd(ot$4)))).pipe(Ve$3(n=>{for(let e of n)if(e!==!0){if(e===ot$4)return ot$4;if(e===!1||Hi$1(e))return e}return!0}),bn$3(n=>n!==ot$4),Lt$4(1)))}function Hi$1(t){return X$2(t)||t instanceof ye}function Un(t){return t.aborted?hy(void 0).pipe(Lt$4(1)):new x$2(n=>{let e=()=>{n.next(),n.complete()};return t.addEventListener(`abort`,e),()=>t.removeEventListener(`abort`,e)})}function On(t){return By(Un(t))}function Bi$1(t){return Ze$2(n=>{let{targetSnapshot:e,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=n;return o.length===0&&i.length===0?hy(s$1(r$2({},n),{guardsResult:!0})):Vi$1(o,e,r).pipe(Ze$2(s=>s&&xi$2(s)?Gi$2(e,i,t):hy(s)),Ve$3(s=>s$1(r$2({},n),{guardsResult:s})))})}function Vi$1(t,n,e){return je$1(t).pipe(Ze$2(r=>Zi$2(r.component,r.route,e,n)),jy(r=>r!==!0,!0))}function Gi$2(t,n,e){return je$1(n).pipe(ky(r=>wn$1(Qi$2(r.route.parent,e),Wi$2(r.route,e),Yi$2(t,r.path),Ki$2(t,r.route))),jy(r=>r!==!0,!0))}function Wi$2(t,n){return t!==null&&n&&n(new St(t)),hy(!0)}function Qi$2(t,n){return t!==null&&n&&n(new yt$1(t)),hy(!0)}function Ki$2(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return hy(!0);return hy(e.map(i=>xy(()=>{let o=n._environmentInjector,s=we$1(i,o);return ue$1($i$2(s)?s.canActivate(n,t):di$2(o,()=>s(n,t))).pipe(jy())}))).pipe(Re$1())}function Yi$2(t,n){let e=n[n.length-1];return hy(n.slice(0,n.length-1).reverse().map(o=>Pi$1(o)).filter(o=>o!==null).map(o=>xy(()=>{return hy(o.guards.map(c=>{let a=o.node._environmentInjector,u=we$1(c,a);return ue$1(zi$1(u)?u.canActivateChild(e,t):di$2(a,()=>u(e,t))).pipe(jy())})).pipe(Re$1())}))).pipe(Re$1())}function Zi$2(t,n,e,r){let i=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!i||i.length===0)return hy(!0);return hy(i.map(s=>{let c=n._environmentInjector,a=we$1(s,c);return ue$1(qi$1(a)?a.canDeactivate(t,n,e,r):di$2(c,()=>a(t,n,e,r))).pipe(jy())})).pipe(Re$1())}function Ji$2(t,n,e,r,i){let o=n.canLoad;if(o===void 0||o.length===0)return hy(!0);return hy(o.map(c=>{let a=we$1(c,t),d=ue$1(ki$2(a)?a.canLoad(n,e):di$2(t,()=>a(n,e)));return i?d.pipe(On(i)):d})).pipe(Re$1(),Pn(r))}function Pn(t){return ry(gd(n=>{if(typeof n!=`boolean`)throw It$1(t,n)}),Ve$3(n=>n===!0))}function Xi$2(t,n,e,r,i,o){let s=n.canMatch;if(!s||s.length===0)return hy(!0);return hy(s.map(a=>{let u=we$1(a,t);return ue$1(Fi$1(u)?u.canMatch(n,e,i):di$2(t,()=>u(n,e,i))).pipe(On(o))})).pipe(Re$1(),Pn(r))}var V$2=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype)}};var He$1=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype)}};function eo$2(t){throw new T$3(4e3,!1)}function to$2(t){throw Tn(!1,b.GuardRejected)}var rr$1=class{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e}async lineralizeSegments(n,e){let r=[],i=e.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[f])throw eo$2(`${n.redirectTo}`);i=i.children[f]}}async applyRedirectCommands(n,e,r,i,o){let s=await ro$2(e,i,o);if(s instanceof A$1)throw new He$1(s);let c=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),n,r);if(s[0]===`/`)throw new He$1(c);return c}applyRedirectCreateUrlTree(n,e,r,i){return new A$1(this.createSegmentGroup(n,e.root,r,i),this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let r={};return Object.entries(n).forEach(([i,o])=>{if(typeof o==`string`&&o[0]===`:`){let c=o.substring(1);r[i]=e[c]}else r[i]=o}),r}createSegmentGroup(n,e,r,i){let o=this.createSegments(n,e.segments,r,i),s=Object.create(null);return Object.entries(e.children).forEach(([c,a])=>{s[c]=this.createSegmentGroup(n,a,r,i)}),new m$2(o,s)}createSegments(n,e,r,i){return e.map(o=>o.path[0]===`:`?this.findPosParam(n,o,i):this.findOrReturn(o,r))}findPosParam(n,e,r){let i=r[e.path.substring(1)];if(!i)throw new T$3(4001,!1);return i}findOrReturn(n,e){let r=0;for(let i of e){if(i.path===n.path)return e.splice(r),i;r++}return n}};function ro$2(t,n,e){if(typeof t==`string`)return Promise.resolve(t);let r=t;return ut$2(ue$1(di$2(e,()=>r(n))))}function no$2(t,n){return t.providers&&!t._injector&&(t._injector=eu(t.providers,n,`Route: ${t.path}`)),t._injector??n}function z(t){return t.outlet||f}function io$2(t,n){let e=t.filter(r=>z(r)===n);return e.push(...t.filter(r=>z(r)!==n)),e}var nr$1={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function Ln(t){return{routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function oo$2(t,n,e,r,i,o,s){let c=jn(t,n,e);if(!c.matched)return hy(c);let a=Ln(o(c));return r=no$2(n,r),Xi$2(r,n,e,i,a,s).pipe(Ve$3(u=>u===!0?c:r$2({},nr$1)))}function jn(t,n,e){if(n.path===``)return n.pathMatch===`full`&&(t.hasChildren()||e.length>0)?r$2({},nr$1):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let i=(n.matcher||an$2)(e,t,n);if(!i)return r$2({},nr$1);let o={};Object.entries(i.posParams??{}).forEach(([c,a])=>{o[c]=a.path});let s=i.consumed.length>0?r$2(r$2({},o),i.consumed[i.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:i.consumed,remainingSegments:e.slice(i.consumed.length),parameters:s,positionalParamSegments:i.posParams??{}}}function on$2(t,n,e,r,i){return e.length>0&&co$2(t,e,r,i)?{segmentGroup:new m$2(n,ao$2(r,new m$2(e,t.children))),slicedSegments:[]}:e.length===0&&uo$1(t,e,r)?{segmentGroup:new m$2(t.segments,so$2(t,e,r,t.children)),slicedSegments:e}:{segmentGroup:new m$2(t.segments,t.children),slicedSegments:e}}function so$2(t,n,e,r){let i={};for(let o of e)if(Nt(t,n,o)&&!r[z(o)]){let s=new m$2([],{});i[z(o)]=s}return r$2(r$2({},r),i)}function ao$2(t,n){let e={};e[f]=n;for(let r of t)if(r.path===``&&z(r)!==f){let i=new m$2([],{});e[z(r)]=i}return e}function co$2(t,n,e,r){return e.some(i=>!Nt(t,n,i)||!(z(i)!==f)?!1:!(r!==void 0&&z(i)===r))}function uo$1(t,n,e){return e.some(r=>Nt(t,n,r))}function Nt(t,n,e){return(t.hasChildren()||n.length>0)&&e.pathMatch===`full`?!1:e.path===``}function lo$2(t,n,e){return n.length===0&&!t.children[e]}var ir$1=class{};async function ho$2(t,n,e,r,i,o,s,c){return new or$1(t,n,e,r,i,s,o,c).recognize()}var fo$2=31;var or$1=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(n,e,r,i,o,s,c,a){this.injector=n,this.configLoader=e,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=c,this.abortSignal=a,this.applyRedirects=new rr$1(this.urlSerializer,this.urlTree)}noMatchError(n){return new T$3(4002,`'${n.segmentGroup}'`)}async recognize(){let n=on$2(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:r}=await this.match(n),o=new qe$1(``,new _$2(r,e)),s=yn$2(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(n){let e=new me$1([],Object.freeze({}),Object.freeze(r$2({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),f,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,n,f,e),rootSnapshot:e}}catch(r){if(r instanceof He$1)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof V$2?this.noMatchError(r):r}}async processSegmentGroup(n,e,r,i,o){if(r.segments.length===0&&r.hasChildren())return this.processChildren(n,e,r,o);let s=await this.processSegment(n,e,r,r.segments,i,!0,o);return s instanceof _$2?[s]:[]}async processChildren(n,e,r,i){let o=[];for(let a of Object.keys(r.children))a===`primary`?o.unshift(a):o.push(a);let s=[];for(let a of o){let u=r.children[a],d=io$2(e,a),v=await this.processSegmentGroup(n,d,u,a,i);s.push(...v)}let c=xn$1(s);return po$2(c),c}async processSegment(n,e,r,i,o,s,c){for(let a of e)try{return await this.processSegmentAgainstRoute(a._injector??n,e,a,r,i,o,s,c)}catch(u){if(u instanceof V$2||_n$2(u))continue;throw u}if(lo$2(r,i,o))return new ir$1;throw new V$2(r)}async processSegmentAgainstRoute(n,e,r,i,o,s,c,a){if(z(r)!==s&&(s===f||!Nt(i,o,r)))throw new V$2(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,i,r,o,s,a);if(this.allowRedirects&&c)return this.expandSegmentAgainstRouteUsingRedirect(n,i,e,r,o,s,a);throw new V$2(i)}async expandSegmentAgainstRouteUsingRedirect(n,e,r,i,o,s,c){let{matched:a,parameters:u,consumedSegments:d,positionalParamSegments:v,remainingSegments:g}=jn(e,i,o);if(!a)throw new V$2(e);typeof i.redirectTo==`string`&&i.redirectTo[0]===`/`&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>fo$2&&(this.allowRedirects=!1));let N=this.createSnapshot(n,i,o,u,c);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let x=await this.applyRedirects.applyRedirectCommands(d,i.redirectTo,v,Ln(N),n),te=await this.applyRedirects.lineralizeSegments(i,x);return this.processSegment(n,r,e,te.concat(g),s,!1,c)}createSnapshot(n,e,r,i,o){let s=new me$1(r,i,Object.freeze(r$2({},this.urlTree.queryParams)),this.urlTree.fragment,vo$2(e),z(e),e.component??e._loadedComponent??null,e,mo$2(e),n),c=ur$1(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(c.params),s.data=Object.freeze(c.data),s}async matchSegmentAgainstRoute(n,e,r,i,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let c=re=>this.createSnapshot(n,r,re.consumedSegments,re.parameters,s),a=await ut$2(oo$2(e,r,i,n,this.urlSerializer,c,this.abortSignal));if(r.path===`**`&&(e.children={}),!a?.matched)throw new V$2(e);n=r._injector??n;let{routes:u}=await this.getChildConfig(n,r,i),d=r._loadedInjector??n,{parameters:v,consumedSegments:g,remainingSegments:N}=a,x=this.createSnapshot(n,r,g,v,s),{segmentGroup:te,slicedSegments:Ie}=on$2(e,g,N,u,o);if(Ie.length===0&&te.hasChildren())return new _$2(x,await this.processChildren(d,u,te,x));if(u.length===0&&Ie.length===0)return new _$2(x,[]);let Ut=z(r)===o,Qe=await this.processSegment(d,u,te,Ie,Ut?f:o,!0,x);return new _$2(x,Qe instanceof _$2?[Qe]:[])}async getChildConfig(n,e,r){if(e.children)return{routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await ut$2(Ji$2(n,e,r,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw to$2(e)}return{routes:[],injector:n}}};function po$2(t){t.sort((n,e)=>n.value.outlet===f?-1:e.value.outlet===f?1:n.value.outlet.localeCompare(e.value.outlet))}function go$1(t){let n=t.value.routeConfig;return n&&n.path===``}function xn$1(t){let n=[],e=new Set;for(let r of t){if(!go$1(r)){n.push(r);continue}let i=n.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),e.add(i)):n.push(r)}for(let r of e){let i=xn$1(r.children);n.push(new _$2(r.value,i))}return n.filter(r=>!e.has(r))}function vo$2(t){return t.data||{}}function mo$2(t){return t.resolve||{}}function yo$1(t,n,e,r,i,o,s){return Ze$2(async c=>{let{state:a,tree:u}=await ho$2(t,n,e,r,c.extractedUrl,i,o,s);return s$1(r$2({},c),{targetSnapshot:a,urlAfterRedirects:u})})}function Ro$2(t){return Ze$2(n=>{let{targetSnapshot:e,guards:{canActivateChecks:r}}=n;if(!r.length)return hy(n);let i=new Set(r.map(c=>c.route)),o=new Set;for(let c of i)if(!o.has(c))for(let a of kn$1(c))o.add(a);let s=0;return je$1(o).pipe(ky(c=>i.has(c)?So$1(c,e,t):(c.data=ur$1(c,c.parent,t).resolve,hy(void 0))),gd(()=>s++),Ju(1),Ze$2(c=>s===o.size?hy(n):Rt$2))})}function kn$1(t){return[t,...t.children.map(e=>kn$1(e)).flat()]}function So$1(t,n,e){let r=t.routeConfig,i=t._resolve;return r?.title!==void 0&&!Mn$1(r)&&(i[Be]=r.title),xy(()=>(t.data=ur$1(t,t.parent,e).resolve,Co$2(i,t,n).pipe(Ve$3(o=>(t._resolvedData=o,t.data=r$2(r$2({},t.data),o),null)))))}function Co$2(t,n,e){let r=Gt$2(t);if(r.length===0)return hy({});let i={};return je$1(r).pipe(Ze$2(o=>wo$1(t[o],n,e).pipe(jy(),gd(s=>{if(s instanceof ye)throw It$1(new J$1,s);i[o]=s}))),Ju(1),Ve$3(()=>i),Js$1(o=>_n$2(o)?Rt$2:gy(o)))}function wo$1(t,n,e){let r=n._environmentInjector,i=we$1(t,r);return ue$1(i.resolve?i.resolve(n,e):di$2(r,()=>i(n,e)))}var $n=new S$2(``);function sr$1(t){return Xu(n=>{let e=t(n);return e?je$1(e).pipe(Ve$3(()=>n)):hy(n)})}var pr$1=(()=>{class t{buildTitle(e){let r,i=e.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===f);return r}getResolvedTitleForRoute(e){return e.data[Be]}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:()=>y$3(zn)})}return t})();var zn=(()=>{class t extends pr$1{title;constructor(e){super(),this.title=e}updateTitle(e){let r=this.buildTitle(e);r!==void 0&&this.title.setTitle(r)}static ɵfac=function(r){return new(r||t)($e$3(an$3))};static ɵprov=de$3({token:t,factory:t.ɵfac,providedIn:`root`})}return t})();var be=new S$2(``,{factory:()=>({})});var Ge=new S$2(``);var gr$1=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=y$3(h_);async loadComponent(e,r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let s=await Fn(VV(await un$2(di$2(e,()=>r.loadComponent()))));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s,s}finally{this.componentLoaders.delete(r)}})();return this.componentLoaders.set(r,i),i}loadChildren(e,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=(async()=>{try{let o=await qn(r,this.compiler,e,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r)}})();return this.childrenLoaders.set(r,i),i}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();async function qn(t,n,e,r){let o=await Fn(VV(await un$2(di$2(e,()=>t.loadChildren())))),s;o instanceof um||Array.isArray(o)?s=o:s=await n.compileModuleAsync(o),r&&r(t);let c,a,d;return Array.isArray(s)?a=s:(c=s.create(e).injector,d=s,a=c.get(Ge,[],{optional:!0,self:!0}).flat()),{routes:a.map(fr),injector:c,factory:d}}async function Fn(t){return t}var Tt$3=(()=>{class t{static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:()=>y$3(bo$1)})}return t})();var bo$1=(()=>{class t{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,r){return e}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();var vr$2=new S$2(``);var mr$1=new S$2(``);function Hn(t,n,e){let r=t.get(mr$1),i=t.get(tn$3);if(!i.startViewTransition||r.skipNextTransition)return r.skipNextTransition=!1,new Promise(u=>setTimeout(u));let o,s=new Promise(u=>{o=u}),c=i.startViewTransition(()=>(o(),Io$2(t)));c.updateCallbackDone.catch(u=>{}),c.ready.catch(u=>{}),c.finished.catch(u=>{});let{onViewTransitionCreated:a}=r;return a&&di$2(t,()=>a({transition:c,from:n,to:e})),s}function Io$2(t){return new Promise(n=>{Nl({read:()=>setTimeout(n)},{injector:t})})}var Eo$2=()=>{};var Bn=new S$2(``);var Vn=(()=>{class t{currentNavigation=ze$1(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=ze$1(null);events=new ne$2;transitionAbortWithErrorSubject=new ne$2;configLoader=y$3(gr$1);environmentInjector=y$3(me$2);destroyRef=y$3(Te$1);urlSerializer=y$3(Se$2);rootContexts=y$3(Ce);location=y$3(it$7);inputBindingEnabled=y$3(At,{optional:!0})!==null;titleStrategy=y$3(pr$1);options=y$3(be,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||Ni$2;urlHandlingStrategy=y$3(Tt$3);createViewTransition=y$3(vr$2,{optional:!0});navigationErrorHandler=y$3(Bn,{optional:!0});routerResourcesFeature=y$3($n,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>hy(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=i=>this.events.next(new vt$1(i)),r=i=>this.events.next(new mt$1(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let r=++this.navigationId;he$2(()=>{this.transitions?.next(s$1(r$2({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new nr$2(null),this.transitions.pipe(bn$3(r=>r!==null),Xu(r=>{let i=!0,o=!1,s=new AbortController,c=()=>!o&&this.currentTransition?.id===r.id;return hy(r).pipe(Xu(a=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,``,b.SupersededByNewNavigation),Rt$2;this.currentTransition=r;let u=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl==`string`?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:u?s$1(r$2({},u),{previousNavigation:null}):null,abort:()=>s.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let d=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),v=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!d&&v!==`reload`)return this.events.next(new G$3(a.id,this.urlSerializer.serialize(a.rawUrl),``,xe.IgnoredSameUrlNavigation)),a.resolve(!1),Rt$2;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return hy(a).pipe(Xu(g=>(this.events.next(new ae$1(g.id,this.urlSerializer.serialize(g.extractedUrl),g.source,g.restoredState)),g.id!==this.navigationId?Rt$2:Promise.resolve(g))),yo$1(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,s.signal),gd(g=>{r.targetSnapshot=g.targetSnapshot,r.urlAfterRedirects=g.urlAfterRedirects,this.currentNavigation.update(N=>(N.finalUrl=g.urlAfterRedirects,N)),this.events.next(new $e$1)}),Xu(g=>je$1(r.routesRecognizeHandler.deferredHandle??hy(void 0)).pipe(Ve$3(()=>g))),gd(()=>{let g=new ke(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(g)}));if(d&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:g,extractedUrl:N,source:x,restoredState:te,extras:Ie}=a,Ut=new ae$1(g,this.urlSerializer.serialize(N),x,te);this.events.next(Ut);let Qe=In(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=s$1(r$2({},a),{targetSnapshot:Qe,urlAfterRedirects:N,extras:s$1(r$2({},Ie),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(re=>(re.finalUrl=N,re)),hy(r)}else return this.events.next(new G$3(a.id,this.urlSerializer.serialize(a.extractedUrl),``,xe.IgnoredByUrlHandlingStrategy)),a.resolve(!1),Rt$2}),Ve$3(a=>{let u=new ht$3(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(u),this.currentTransition=r=s$1(r$2({},a),{guards:Oi$1(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),r}),Bi$1(a=>this.events.next(a)),Xu(a=>{if(r.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!=`boolean`)throw It$1(this.urlSerializer,a.guardsResult);let u=new ft$3(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(u),!c())return Rt$2;if(!a.guardsResult)return this.cancelNavigationTransition(a,``,b.GuardRejected),Rt$2;if(a.guards.canActivateChecks.length===0)return hy(a);let d=new pt$2(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(d),!c())return Rt$2;let v=!1;return hy(a).pipe(Ro$2(this.paramsInheritanceStrategy),gd({next:()=>{v=!0;let g=new gt$3(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(g)},complete:()=>{v||this.cancelNavigationTransition(a,``,b.NoDataFromResolver)}}))}),sr$1(a=>{let u=v=>{let g=[];if(v.routeConfig?._loadedComponent)v.component=v.routeConfig?._loadedComponent;else if(v.routeConfig?.loadComponent){let N=v._environmentInjector;g.push(this.configLoader.loadComponent(N,v.routeConfig).then(x=>{v.component=x}))}for(let N of v.children)g.push(...u(N));return g},d=u(a.targetSnapshot.root);return d.length===0?hy(a):je$1(Promise.all(d).then(()=>a))}),Xu(a=>{let{newlyCreatedRoutes:u,state:d}=Ti$1(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);return this.currentTransition=r=a=s$1(r$2({},a),{targetRouterState:d,newlyCreatedRoutes:u}),this.currentNavigation.update(v=>(v.targetRouterState=d,v)),hy(a)}),this.routerResourcesFeature?.setupAndRunResources(s.signal)??(a=>a),sr$1(()=>this.afterPreactivation()),Xu(()=>{let{currentSnapshot:a,targetSnapshot:u}=r,d=this.createViewTransition?.(this.environmentInjector,a.root,u.root);return d?je$1(d).pipe(Ve$3(()=>r)):hy(r)}),Lt$4(1),Xu(a=>{i=!1,this.events.next(new ge);let u=r.beforeActivateHandler.deferredHandle;return u?je$1(u.then(()=>a)):hy(a)}),gd(a=>{new tr$1(e.routeReuseStrategy,r.targetRouterState,r.currentRouterState,u=>this.events.next(u),this.inputBindingEnabled).activate(this.rootContexts),a.newlyCreatedRoutes?.clear(),c()&&(Gn(a.targetRouterState),o=!0,this.currentNavigation.update(u=>(u.abort=Eo$2,u)),this.lastSuccessfulNavigation.set(he$2(this.currentNavigation)),this.events.next(new j$2(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),By(Un(s.signal).pipe(bn$3(()=>!o&&i),gd(()=>{this.cancelNavigationTransition(r,s.signal.reason+``,b.Aborted)}))),gd({complete:()=>{o=!0}}),By(this.transitionAbortWithErrorSubject.pipe(gd(a=>{throw a}))),dd(()=>{s.abort(),o||this.cancelNavigationTransition(r,``,b.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Js$1(a=>{if(o=!0,sn$2(r),this.destroyed)return r.resolve(!1),Rt$2;if(Dn(a))this.events.next(new L$2(r.id,this.urlSerializer.serialize(r.extractedUrl),a.message,a.cancellationCode)),Ui$1(a)?this.events.next(new ve(a.url,a.navigationBehaviorOptions)):r.resolve(!1);else{let u=new ce$1(r.id,this.urlSerializer.serialize(r.extractedUrl),a,r.targetSnapshot??void 0);try{let d=di$2(this.environmentInjector,()=>this.navigationErrorHandler?.(u));if(d instanceof ye){let{message:v,cancellationCode:g}=It$1(this.urlSerializer,d);this.events.next(new L$2(r.id,this.urlSerializer.serialize(r.extractedUrl),v,g)),this.events.next(new ve(d.redirectTo,d.navigationBehaviorOptions))}else throw this.events.next(u),a}catch(d){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(d)}}return Rt$2}))}))}cancelNavigationTransition(e,r,i){sn$2(e);let o=new L$2(e.id,this.urlSerializer.serialize(e.extractedUrl),r,i);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=he$2(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return e.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();function Mo$1(t){return t!==Pe}function sn$2(t){for(let n of t.newlyCreatedRoutes??[])n._localInjector?.destroy(),n._localInjector=void 0;Gn(t.targetRouterState)}function Gn(t){if(!t)return;let n=e=>{e.value.pending?.set(!1),e.children.forEach(n)};n(t._root)}var Wn=new S$2(``);var Qn=(()=>{class t{static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:()=>y$3(Ao$2)})}return t})();var Mt$1=class{shouldDetach(n){return!1}store(n,e){}shouldAttach(n){return!1}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return!0}};var Ao$2=(()=>{class t extends Mt$1{static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();var Dt$1=(()=>{class t{urlSerializer=y$3(Se$2);options=y$3(be,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||`replace`;location=y$3(it$7);urlHandlingStrategy=y$3(Tt$3);urlUpdateStrategy=this.options.urlUpdateStrategy||`deferred`;currentUrlTree=new A$1;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:r,targetBrowserUrl:i}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,r):r,s=i??o;return s instanceof A$1?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{ɵrouterUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:r,initialUrl:i}){r&&e?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=e):this.rawUrlTree=i}routerState=In(null,y$3(me$2));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:()=>y$3(No$1)})}return t})();var No$1=(()=>{class t extends Dt$1{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!==`computed`?this.currentPageId:this.restoredState()?.ɵrouterPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(r=>{r.type===`popstate`&&setTimeout(()=>{e(r.url,r.state,`popstate`,{replaceUrl:!0})})})}handleRouterEvent(e,r){e instanceof ae$1?this.updateStateMemento():e instanceof G$3?this.commitTransition(r):e instanceof ke?this.urlUpdateStrategy===`eager`&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof ge?(this.commitTransition(r),this.urlUpdateStrategy===`deferred`&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof L$2&&!bn$2(e)?this.restoreHistory(r):e instanceof ce$1?this.restoreHistory(r,!0):e instanceof j$2&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,r){let{extras:i,id:o}=r,{replaceUrl:s,state:c}=i;if(this.location.isCurrentPathEqualTo(e)||s){let a=this.browserPageId,u=r$2(r$2({},c),this.generateNgRouterState(o,a,r));this.location.replaceState(e,``,u)}else{let a=r$2(r$2({},c),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(e,``,a)}}restoreHistory(e,r=!1){if(this.canceledNavigationResolution===`computed`){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution===`replace`&&(r&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),``,this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,r,i){return this.canceledNavigationResolution===`computed`?r$2({navigationId:e,ɵrouterPageId:r},this.routerUrlState(i)):r$2({navigationId:e},this.routerUrlState(i))}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();function yr$2(t,n){t.events.pipe(bn$3(e=>e instanceof j$2||e instanceof L$2||e instanceof ce$1||e instanceof G$3),Ve$3(e=>e instanceof j$2||e instanceof G$3?0:(e instanceof L$2?e.code===b.Redirect||e.code===b.SupersededByNewNavigation:!1)?2:1),bn$3(e=>e!==2),Lt$4(1)).subscribe(()=>{n()})}var ee=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=y$3(Ow);stateManager=y$3(Dt$1);options=y$3(be,{optional:!0})||{};pendingTasks=y$3(Dt$3);urlUpdateStrategy=this.options.urlUpdateStrategy||`deferred`;navigationTransitions=y$3(Vn);urlSerializer=y$3(Se$2);location=y$3(it$7);urlHandlingStrategy=y$3(Tt$3);injector=y$3(me$2);_events=new ne$2;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=y$3(Qn);injectorCleanup=y$3(Wn,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||`ignore`;config=y$3(Ge,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!y$3(At,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new J$4;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=he$2(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof L$2&&r.code!==b.Redirect&&r.code!==b.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof j$2)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof ve){let s=r.navigationBehaviorOptions,c=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),a=r$2({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy===`eager`||Mo$1(i.source)},s);this.scheduleNavigation(c,Pe,null,a,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}Mi$1(r)&&this._events.next(r)}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Pe,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,r,i,o)=>{this.navigateToSyncWithBrowser(e,i,r,o)})}navigateToSyncWithBrowser(e,r,i,o){let s=i?.navigationId?i:null,c=i?.ɵrouterUrl??e;if(i?.ɵrouterUrl&&(o=s$1(r$2({},o),{browserUrl:e})),i){let u=r$2({},i);delete u.navigationId,delete u.ɵrouterPageId,delete u.ɵrouterUrl,Object.keys(u).length!==0&&(o.state=u)}let a=this.parseUrl(c);this.scheduleNavigation(a,r,s,o).catch(u=>{this.disposed||this.injector.get(nn$3)(u)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return he$2(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(fr),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,r={}){let{relativeTo:i,queryParams:o,fragment:s,queryParamsHandling:c,preserveFragment:a}=r,u=a?this.currentUrlTree.fragment:s,d=null;switch(c??this.options.defaultQueryParamsHandling){case`merge`:d=r$2(r$2({},this.currentUrlTree.queryParams),o);break;case`preserve`:d=this.currentUrlTree.queryParams;break;default:d=o||null}d!==null&&(d=this.removeEmptyProps(d));let v;try{v=Rn(i?i.snapshot:this.routerState.snapshot.root)}catch{(typeof e[0]!=`string`||e[0][0]!==`/`)&&(e=[]),v=this.currentUrlTree.root}return Sn$2(v,e,d,u??null,this.urlSerializer)}navigateByUrl(e,r={skipLocationChange:!1}){let i=X$2(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,Pe,null,r)}navigate(e,r={skipLocationChange:!1}){return To$1(e),this.navigateByUrl(this.createUrlTree(e,r),r)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(vr$3(4018,!1)),this.urlSerializer.parse(`/`)}}isActive(e,r){let i;if(r===!0?i=r$2({},ar$1):r===!1?i=r$2({},pe):i=r$2(r$2({},pe),r),X$2(e))return Wt$2(this.currentUrlTree,e,i);let o=this.parseUrl(e);return Wt$2(this.currentUrlTree,o,i)}removeEmptyProps(e){return Object.entries(e).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(e,r,i,o,s){if(this.disposed)return Promise.resolve(!1);let c,a,u;s?(c=s.resolve,a=s.reject,u=s.promise):u=new Promise((v,g)=>{c=v,a=g});let d=this.pendingTasks.add();return yr$2(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:c,reject:a,promise:u,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),u.catch(Promise.reject.bind(Promise))}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();function To$1(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new T$3(4008,!1)}var _o$1=(()=>{class t{router=y$3(ee);stateManager=y$3(Dt$1);fragment=ze$1(``);queryParams=ze$1({});path=ze$1(``);serializer=y$3(Se$2);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof j$2&&this.updateState()})}updateState(){let{fragment:e,root:r,queryParams:i}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(i),this.path.set(this.serializer.serialize(new A$1(r)))}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();var _t$1=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=y$3(new Bv(`href`),{optional:!0});reactiveHref=mu(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return he$2(this.reactiveHref)}set href(e){this.reactiveHref.set(e)}set target(e){this._target.set(e)}get target(){return he$2(this._target)}_target=ze$1(void 0);set queryParams(e){this._queryParams.set(e)}get queryParams(){return he$2(this._queryParams)}_queryParams=ze$1(void 0,{equal:()=>!1});set fragment(e){this._fragment.set(e)}get fragment(){return he$2(this._fragment)}_fragment=ze$1(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e)}get queryParamsHandling(){return he$2(this._queryParamsHandling)}_queryParamsHandling=ze$1(void 0);set state(e){this._state.set(e)}get state(){return he$2(this._state)}_state=ze$1(void 0,{equal:()=>!1});set info(e){this._info.set(e)}get info(){return he$2(this._info)}_info=ze$1(void 0,{equal:()=>!1});set relativeTo(e){this._relativeTo.set(e)}get relativeTo(){return he$2(this._relativeTo)}_relativeTo=ze$1(void 0);set preserveFragment(e){this._preserveFragment.set(e)}get preserveFragment(){return he$2(this._preserveFragment)}_preserveFragment=ze$1(!1);set skipLocationChange(e){this._skipLocationChange.set(e)}get skipLocationChange(){return he$2(this._skipLocationChange)}_skipLocationChange=ze$1(!1);set replaceUrl(e){this._replaceUrl.set(e)}get replaceUrl(){return he$2(this._replaceUrl)}_replaceUrl=ze$1(!1);browserUrl=BV(void 0);isAnchorElement;onChanges=new ne$2;applicationErrorHandler=y$3(nn$3);options=y$3(be,{optional:!0});reactiveRouterState=y$3(_o$1);constructor(e,r,i,o,s,c){this.router=e,this.route=r,this.tabIndexAttribute=i,this.renderer=o,this.el=s,this.locationStrategy=c;let a=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=a===`a`||a===`area`||!!(typeof customElements==`object`&&customElements.get(a)?.observedAttributes?.includes?.(`href`))}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue(`tabindex`,e)}ngOnChanges(e){this.onChanges.next(this)}routerLinkInput=ze$1(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(X$2(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl(`0`))}onClick(e,r,i,o,s){let c=this._urlTree();if(c===null||this.isAnchorElement&&(e!==0||r||i||o||s||typeof this.target==`string`&&this.target!=`_self`))return!0;let a=this.browserUrl(),u=r$2({skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info},a!==void 0&&{browserUrl:a});return this.router.navigateByUrl(c,u)?.catch(d=>{this.applicationErrorHandler(d)}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,r){let i=this.renderer,o=this.el.nativeElement;r!==null?i.setAttribute(o,e,r):i.removeAttribute(o,e)}_urlTree=_t$5(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=i=>i===`preserve`||i===`merge`;(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let r=this.routerLinkInput();return r===null||!this.router.createUrlTree?null:X$2(r)?r:this.router.createUrlTree(r,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,r)=>this.computeHref(e)===this.computeHref(r)});get urlTree(){return he$2(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??``:null}static ɵfac=function(r){return new(r||t)(ao$3(ee),ao$3(W$1),Gp(`tabindex`),ao$3(Uc),ao$3(Jr$2),ao$3(re$2))};static ɵdir=ew({type:t,selectors:[[``,`routerLink`,``]],hostVars:2,hostBindings:function(r,i){r&1&&jm(`click`,function(s){return i.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),r&2&&Sm(`href`,i.reactiveHref(),uD)(`target`,i._target())},inputs:{target:`target`,queryParams:`queryParams`,fragment:`fragment`,queryParamsHandling:`queryParamsHandling`,state:`state`,info:`info`,relativeTo:`relativeTo`,preserveFragment:[2,`preserveFragment`,`preserveFragment`,ZV],skipLocationChange:[2,`skipLocationChange`,`skipLocationChange`,ZV],replaceUrl:[2,`replaceUrl`,`replaceUrl`,ZV],browserUrl:[1,`browserUrl`],routerLink:`routerLink`},features:[qE]})}return t})();var Uo$1=(()=>{class t{router;element;renderer;cdr;links;classes=[];routerEventsSubscription;linkInputChangesSubscription;_isActive=!1;get isActive(){return this._isActive}routerLinkActiveOptions={exact:!1};ariaCurrentWhenActive;isActiveChange=new tt$6;link=y$3(_t$1,{optional:!0});constructor(e,r,i,o){this.router=e,this.element=r,this.renderer=i,this.cdr=o,this.routerEventsSubscription=e.events.subscribe(s=>{s instanceof j$2&&this.update()})}ngAfterContentInit(){hy(this.links.changes,hy(null)).pipe(sr$2()).subscribe(e=>{this.update(),this.subscribeToEachLinkOnChanges()})}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let e=[...this.links.toArray(),this.link].filter(r=>!!r).map(r=>r.onChanges);this.linkInputChangesSubscription=je$1(e).pipe(sr$2()).subscribe(r=>{this._isActive!==this.isLinkActive(this.router)(r)&&this.update()})}set routerLinkActive(e){if(e==null){this.classes=[];return}let r=Array.isArray(e)?e:e.split(` `);this.classes=r.filter(i=>!!i)}ngOnChanges(e){this.update()}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe()}update(){!this.links||!this.router.navigated||this.routerLinkActiveOptions===null&&!this._isActive||queueMicrotask(()=>{let e=this.hasActiveLinks();this.classes.forEach(r=>{e?this.renderer.addClass(this.element.nativeElement,r):this.renderer.removeClass(this.element.nativeElement,r)}),e&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,`aria-current`,this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,`aria-current`),this._isActive!==e&&(this._isActive=e,this.cdr.markForCheck(),this.isActiveChange.emit(e))})}isLinkActive(e){let r=this.routerLinkActiveOptions;if(r===null)return()=>!1;let i;return r===void 0?i=r$2({},pe):Oo$1(r)?i=r:r.exact??!1?i=r$2({},ar$1):i=r$2({},pe),o=>{let s=o.urlTree;return s?he$2(cr$1(s,e,i)):!1}}hasActiveLinks(){let e=this.isLinkActive(this.router);return this.link&&e(this.link)||this.links.some(e)}static ɵfac=function(r){return new(r||t)(ao$3(ee),ao$3(Jr$2),ao$3(Uc),ao$3(QV))};static ɵdir=ew({type:t,selectors:[[``,`routerLinkActive`,``]],contentQueries:function(r,i,o){if(r&1&&Bm(o,_t$1,5),r&2){let s;vb(s=yb())&&(i.links=s)}},inputs:{routerLinkActiveOptions:`routerLinkActiveOptions`,ariaCurrentWhenActive:`ariaCurrentWhenActive`,routerLinkActive:`routerLinkActive`},outputs:{isActiveChange:`isActiveChange`},exportAs:[`routerLinkActive`],features:[qE]})}return t})();function Oo$1(t){let n=t;return!!(n.paths||n.matrixParams||n.queryParams||n.fragment)}var We$1=class{};var Po$1=(()=>{class t{preload(e,r){return r().pipe(Js$1(()=>hy(null)))}static ɵfac=function(r){return new(r||t)};static ɵprov=Kr$2({token:t,factory:t.ɵfac})}return t})();var Kn=(()=>{class t{router;injector;preloadingStrategy;loader;subscription;constructor(e,r,i,o){this.router=e,this.injector=r,this.preloadingStrategy=i,this.loader=o}setUpPreloading(){this.subscription=this.router.events.pipe(bn$3(e=>e instanceof j$2),ky(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe()}processRoutes(e,r){let i=[];for(let o of r){o.providers&&!o._injector&&(o._injector=eu(o.providers,e,``));let s=o._injector??e;o._loadedNgModuleFactory&&!o._loadedInjector&&(o._loadedInjector=o._loadedNgModuleFactory.create(s).injector);let c=o._loadedInjector??s;(o.loadChildren&&!o._loadedRoutes&&o.canLoad===void 0||o.loadComponent&&!o._loadedComponent)&&i.push(this.preloadConfig(s,o)),(o.children||o._loadedRoutes)&&i.push(this.processRoutes(c,o.children??o._loadedRoutes))}return je$1(i).pipe(sr$2())}preloadConfig(e,r){return this.preloadingStrategy.preload(r,()=>{if(e.destroyed)return hy(null);let i;r.loadChildren&&r.canLoad===void 0?i=je$1(this.loader.loadChildren(e,r)):i=hy(null);let o=i.pipe(Ze$2(s=>s===null?hy(void 0):(r._loadedRoutes=s.routes,r._loadedInjector=s.injector,r._loadedNgModuleFactory=s.factory,this.processRoutes(s.injector??e,s.routes))));if(r.loadComponent&&!r._loadedComponent)return je$1([o,this.loader.loadComponent(e,r)]).pipe(sr$2());else return o})}static ɵfac=function(r){return new(r||t)($e$3(ee),$e$3(me$2),$e$3(We$1),$e$3(gr$1))};static ɵprov=de$3({token:t,factory:t.ɵfac,providedIn:`root`})}return t})();var Lo$2=new S$2(``);function jo$1(t,...n){return li$2([{provide:Ge,multi:!0,useValue:t},{provide:W$1,useFactory:xo$1},{provide:uo$2,multi:!0,useFactory:ko$1},n.map(e=>e.ɵproviders)])}function xo$1(){return y$3(ee).routerState.root}function Yn(t,n){return{ɵkind:t,ɵproviders:n}}function ko$1(){let t=y$3(ve$1);return n=>{let e=t.get(bt$4);if(n!==e.components[0])return;let r=t.get(ee),i=t.get($o$2);t.get(zo$2)===1&&r.initialNavigation(),t.get(Zn$1,null,{optional:!0})?.setUpPreloading(),t.get(Lo$2,null,{optional:!0})?.init(),r.resetRootComponentType(e.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe())}}var $o$2=new S$2(``,{factory:()=>new ne$2});var zo$2=new S$2(``,{factory:()=>1});var Zn$1=new S$2(``);function qo$1(t){return Yn(0,[{provide:Zn$1,useExisting:Kn},{provide:We$1,useExisting:t}])}function Fo$2(t){De$1(`NgRouterViewTransitions`);return Yn(9,[{provide:vr$2,useValue:Hn},{provide:mr$1,useValue:r$2({skipNextTransition:!!t?.skipInitialTransition},t)}])}function nt$3(n,s){let t={};for(let e of Object.keys(n))e!==s&&(t[e]=n[e]);return t}var V$1=class{state=ze$1({});hasAny=_t$5(()=>Object.keys(this.state()).length>0);isLoading(s){return this.state()[s]!==void 0}get(s){return this.state()[s]}set(s,t){this.state.update(e=>s$1(r$2({},e),{[s]:t}))}clear(s){this.state.update(t=>nt$3(t,s))}clearIfOwner(s,t){this.state.update(e=>e[s]===t?nt$3(e,s):e)}};var _$1=class{};var ht$2=(()=>{class n{handle(t){return t.key}static ɵfac=function(e){return new(e||n)};static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var y$1=class{};var ft$2=(()=>{class n extends y$1{compile(t,e){return t}compileTranslations(t,e){return t}static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var v$1=class{};var gt$2=(()=>{class n extends v$1{getTranslation(t){return hy({})}static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();function U$1(n,s){if(n===s)return!0;if(n===null||s===null)return!1;if(n!==n&&s!==s)return!0;let t=typeof n,e=typeof s,r;if(t==e&&t==`object`)if(Array.isArray(n)){if(!Array.isArray(s))return!1;if((r=n.length)==s.length){for(let a=0;a<r;a++)if(!U$1(n[a],s[a]))return!1;return!0}}else{if(Array.isArray(s))return!1;if(u$1(n)&&u$1(s)){let a=Object.create(null);for(let i in n){if(!U$1(n[i],s[i]))return!1;a[i]=!0}for(let i in s)if(!(i in a)&&typeof s[i]<`u`)return!1;return!0}}return!1}function c$2(n){return typeof n<`u`&&n!==null}function rt$3(n){return n!==void 0}function u$1(n){return w$1(n)&&!L$1(n)&&n!==null}function w$1(n){return typeof n==`object`&&n!==null}function L$1(n){return Array.isArray(n)}function k$3(n){return typeof n==`string`}function dt$1(n){return typeof n==`function`}function A(n){if(L$1(n))return n.map(s=>A(s));if(u$1(n)){let s={};return Object.keys(n).forEach(t=>{s[t]=A(n[t])}),s}else return n}function B$1(n,s){if(!w$1(n))return A(s);let t=A(n);return w$1(t)&&w$1(s)&&Object.keys(s).forEach(e=>{u$1(s[e])?e in n?t[e]=B$1(n[e],s[e]):Object.assign(t,{[e]:s[e]}):Object.assign(t,{[e]:s[e]})}),t}function at$3(n,s){let t=s.split(`.`);s=``;do{s+=t.shift();let e=!t.length;if(c$2(n)){if(u$1(n)&&rt$3(n[s])&&(u$1(n[s])||L$1(n[s])||e)){n=n[s],s=``;continue}if(L$1(n)){if(s===`length`&&e){n=n.length,s=``;continue}if(/^\d+$/.test(s)){let r=parseInt(s,10);if(rt$3(n[r])&&(u$1(n[r])||L$1(n[r])||e)){n=n[r],s=``;continue}}}}if(e){n=void 0;continue}s+=`.`}while(t.length);return n}function pt$1(n,s,t){return B$1(n,Lt$1(s,t))}function Lt$1(n,s){return n.split(`.`).reduceRight((t,e)=>({[e]:t}),s)}var R$2=class{};var bt$1=(()=>{class n extends R$2{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(t,e){if(k$3(t))return this.interpolateString(t,e);if(dt$1(t))return this.interpolateFunction(t,e)}interpolateFunction(t,e){return t(e)}interpolateString(t,e){return e?t.replace(this.templateMatcher,(r,a)=>{let i=this.getInterpolationReplacement(e,a);return i!==void 0?i:r}):t}getInterpolationReplacement(t,e){return this.formatValue(at$3(t,e))}formatValue(t){if(k$3(t))return t;if(typeof t==`number`||typeof t==`boolean`)return t.toString();if(t===null)return`null`;if(L$1(t))return t.join(`, `);if(w$1(t))return typeof t.toString==`function`&&t.toString!==Object.prototype.toString?t.toString():JSON.stringify(t)}static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var it$2=(()=>{class n{_translations=ze$1({});translations=this._translations.asReadonly();_languages=ze$1([]);languages=this._languages.asReadonly();_lastTranslationChange=ze$1(null);lastTranslationChange=this._lastTranslationChange.asReadonly();_translationChange$=new ne$2;translationChange$=this._translationChange$.asObservable();constructor(){y$3(Te$1).onDestroy(()=>{this._translationChange$.complete()})}getTranslations(t){return this.translations()[t]}setTranslations(t,e,r){this._translations.update(i=>s$1(r$2({},i),{[t]:r&&this.hasTranslationFor(t)?B$1(i[t],e):e})),this.addLanguages([t]);let a={lang:t,translations:this.getTranslations(t)};this._lastTranslationChange.set(a),this._translationChange$.next(a)}getLanguages(){return this.languages()}addLanguages(t){this._languages.update(e=>Array.from(new Set([...e,...t])))}hasTranslationFor(t){return typeof this.translations()[t]<`u`}deleteTranslations(t$2){this._translations.update(e=>{let i=e,{[t$2]:r}=i;return u$3(i,[t(t$2)])})}getTranslationValue(t,e){return at$3(this.getTranslations(t),e)}static ɵfac=function(e){return new(e||n)};static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var ot$3=new S$2(`TRANSLATE_CONFIG`);var C$1=n=>my(n)?n:hy(n);var H$1=(()=>{class n{loadingTranslations=new V$1;lastUseLanguage=null;currentLoader=y$3(v$1);compiler=y$3(y$1);parser=y$3(R$2);missingTranslationHandler=y$3(_$1);store=y$3(it$2);destroyRef=y$3(Te$1);parent;get isRoot(){return this.parent===null}_onLangChange=new ne$2;_onFallbackLangChange=new ne$2;_currentLang=ze$1(null);_fallbackLang=ze$1(null);_onTranslationRefresh=null;_isLoading=_t$5(()=>this.loadingTranslations.hasAny()||(this.parent?.isLoading()??!1));getRoot(){let t=this;for(;t.parent;)t=t.parent;return t}getParent(){return this.parent}getActiveRequestedLang(){return this.getRoot().lastUseLanguage}hasTranslationInChain(t){for(let e=this;e;e=e.parent)if(e.store.hasTranslationFor(t))return!0;return!1}chainTranslationChange$(){let t=[];for(let e=this;e;e=e.parent)t.push(e.store.translationChange$);return t.length===1?t[0]:Oy(...t)}get onTranslationChange(){return this.store.translationChange$}get onLangChange(){return this.isRoot?this._onLangChange.asObservable():this.parent?this.parent.onLangChange:Rt$2}get onFallbackLangChange(){return this.isRoot?this._onFallbackLangChange.asObservable():this.parent?this.parent.onFallbackLangChange:Rt$2}get onTranslationRefresh(){if(!this._onTranslationRefresh){let t=Oy(this.onTranslationChange.pipe(bn$3(e=>e.lang===this.getCurrentLang()||e.lang===this.getFallbackLang())),this.onLangChange,this.onFallbackLangChange).pipe(Ve$3(()=>{}));this.isRoot?this._onTranslationRefresh=t:this._onTranslationRefresh=this.parent?Oy(t,this.parent.onTranslationRefresh):t}return this._onTranslationRefresh}constructor(){let t=r$2({isRoot:!0,fallbackLang:null},y$3(ot$3,{optional:!0}));this.parent=t.isRoot?null:y$3(n,{optional:!0,skipSelf:!0});let e=y$3(Te$1);if(this.isRoot)t.lang&&this.use(t.lang),t.fallbackLang&&this.setFallbackLang(t.fallbackLang);else{let r=this.getCurrentLang();r&&this.loadOrExtendLanguage(r)?.pipe($$3(e)).subscribe({error:i=>{console.warn(`@ngx-translate/core: child failed to load "${r}". Cause:`,i)}});let a=this.getFallbackLang();a&&a!==r&&this.loadOrExtendLanguage(a)?.pipe($$3(e)).subscribe({error:i=>{console.warn(`@ngx-translate/core: child failed to load "${a}". Cause:`,i)}})}this.onLangChange.pipe($$3(e)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe($$3(e)).subscribe({error:a=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,a)}})}),this.onFallbackLangChange.pipe($$3(e)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe($$3(e)).subscribe({error:a=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,a)}})}),e.onDestroy(()=>{this._onLangChange.complete(),this._onFallbackLangChange.complete()})}setFallbackLang(t){if(!this.isRoot)return this.parent.setFallbackLang(t);this._fallbackLang()||this._fallbackLang.set(t);let e=this.loadOrExtendLanguage(t);return my(e)?(e.pipe(Lt$4(1)).subscribe({next:()=>{this._fallbackLang.set(t),this._onFallbackLangChange.next({lang:t,translations:this.store.getTranslations(t)})},error:r=>{console.warn(`@ngx-translate/core: failed to load fallback "${t}". Cause:`,r)}}),e):(this._fallbackLang.set(t),this._onFallbackLangChange.next({lang:t,translations:this.store.getTranslations(t)}),hy(this.store.getTranslations(t)))}get isLoading(){return this._isLoading}use(t){if(!this.isRoot)return this.parent.use(t);let e=this._currentLang(),r=this.lastUseLanguage;this.lastUseLanguage=t,this._currentLang()||this._currentLang.set(t);let a=this.loadOrExtendLanguage(t);return my(a)?(a.pipe(Lt$4(1)).subscribe({next:()=>{this.changeLang(t)},error:i=>{this.lastUseLanguage===t&&(this._currentLang.set(e),this.lastUseLanguage=r),console.warn(`@ngx-translate/core: failed to load "${t}". currentLang was NOT changed; remains "${e??`null`}". Cause:`,i)}}),a):(this.changeLang(t),hy(this.store.getTranslations(t)))}loadOrExtendLanguage(t){return this.store.hasTranslationFor(t)?hy(this.store.getTranslations(t)):this.loadAndCompileTranslations(t)}getTranslations(t){return this.store.getTranslations(t)}changeLang(t){t===this.lastUseLanguage&&(this._currentLang.set(t),this._onLangChange.next({lang:t,translations:this.store.getTranslations(t)}))}getCurrentLang(){return this.isRoot?this._currentLang():this.parent?.getCurrentLang()??null}loadAndCompileTranslations(t){let e=this.loadingTranslations.get(t);if(e)return e;let r=this.currentLoader.getTranslation(t).pipe(Ve$3(a=>this.compiler.compileTranslations(a,t)),gd(a=>{this.store.setTranslations(t,a,!1),this.loadingTranslations.clearIfOwner(t,r)}),dd(()=>this.loadingTranslations.clearIfOwner(t,r)),fd({bufferSize:1,refCount:!0}));return this.loadingTranslations.set(t,r),r.pipe($$3(this.destroyRef)).subscribe({error:()=>{}}),r}setTranslation(t,e,r=!1){let a=this.compiler.compileTranslations(e,t);this.store.setTranslations(t,a,r)}setCompiledTranslation(t,e,r=!1){this.store.setTranslations(t,e,r)}getLangs(){return this.store.getLanguages()}addLangs(t){this.store.addLanguages(t)}getParsedResultForKey(t,e,r){let a=this.getTextToInterpolate(t,r);if(c$2(a))return this.runInterpolation(a,e);let l=this.getMissingTranslationHandler().handle(r$2({key:t,translateService:this},e!==void 0&&{interpolateParams:e}));return l!==void 0?l:t}getMissingTranslationHandler(){return this.missingTranslationHandler}getFallbackLang(){return this.isRoot?this._fallbackLang():this.parent?.getFallbackLang()??null}getTextToInterpolate(t,e){if(e){let l=this.store.getTranslationValue(e,t);return l!==void 0?l:this.parent?.getTextToInterpolate(t,e)}let r=this.getCurrentLang(),a=this.getFallbackLang(),i;return r&&(i=this.store.getTranslationValue(r,t)),!c$2(i)&&a&&a!==r&&(i=this.store.getTranslationValue(a,t)),i!==void 0?i:this.parent?.getTextToInterpolate(t)}runInterpolation(t,e){if(c$2(t))return L$1(t)?this.runInterpolationOnArray(t,e):u$1(t)?this.runInterpolationOnDict(t,e):this.parser.interpolate(t,e)}runInterpolationOnArray(t,e){return t.map(r=>this.runInterpolation(r,e))}runInterpolationOnDict(t,e){let r={};for(let a in t){let i=this.runInterpolation(t[a],e);i!==void 0&&(r[a]=i)}return r}getParsedResult(t,e,r){return t instanceof Array?this.getParsedResultForArray(t,e,r):this.getParsedResultForKey(t,e,r)}getParsedResultForArray(t,e,r){let a={},i=!1;for(let g of t)a[g]=this.getParsedResultForKey(g,e,r),i=i||my(a[g]);if(!i)return a;return Ay(t.map(g=>C$1(a[g]))).pipe(Ve$3(g=>{let J={};return g.forEach((ct,ut)=>{J[t[ut]]=ct}),J}))}get(t,e,r){if(!c$2(t)||!t.length)return hy(``);let a=r??this.getActiveRequestedLang()??this.getCurrentLang(),i=a?this.loadingTranslations.get(a):void 0;return i?i.pipe(ky(()=>C$1(this.getParsedResult(t,e,r)))):C$1(this.getParsedResult(t,e,r))}getStreamOnTranslationChange(t,e,r){if(!c$2(t)||!t.length)throw new Error(`Parameter "key" is required and cannot be empty`);return wn$1(xy(()=>this.get(t,e,r)),this.onTranslationChange.pipe(Xu(()=>{return C$1(this.getParsedResult(t,e,r))})))}stream(t,e,r){if(!c$2(t)||!t.length)throw new Error(`Parameter "key" required`);let a=r?Oy(this.onLangChange,this.chainTranslationChange$().pipe(bn$3(i=>i.lang===r))):this.onLangChange;return wn$1(xy(()=>this.get(t,e,r)),a.pipe(Xu(()=>{return C$1(this.getParsedResult(t,e,r))})))}instant(t,e,r){if(!c$2(t)||t.length===0)return``;r&&!this.hasTranslationInChain(r)&&this.warnUnloadedInstantLang(r);let a=this.getParsedResult(t,e,r);return my(a)?this.keyToObject(t):a}warnedUnloadedInstantLangs=new Set;warnUnloadedInstantLang(t){let e=this.getRoot();if(e!==this){e.warnUnloadedInstantLang(t);return}this.warnedUnloadedInstantLangs.has(t)||he$2(()=>{this.warnedUnloadedInstantLangs.add(t),console.warn(`@ngx-translate/core: instant() called with lang="${t}" but no translations are loaded for that language. Returning the key as fallback. Load with use("${t}") or setTranslation("${t}", ...) first.`)})}translate(t,e,r){return _t$5(()=>{let a=typeof t==`function`?t():t,i=typeof e==`function`?e():e,l=typeof r==`function`?r():r;return this.instant(a,i,l)})}keyToObject(t){return Array.isArray(t)?t.reduce((e,r)=>(e[r]=r,e),{}):t}set(t,e,r=this.getCurrentLang()){this.store.setTranslations(r,pt$1(this.store.getTranslations(r),t,k$3(e)?this.compiler.compile(e,r):this.compiler.compileTranslations(e,r)),!1)}reloadLang(t){return this.resetLang(t),this.loadAndCompileTranslations(t)}resetLang(t){this.loadingTranslations.clear(t),this.store.deleteTranslations(t)}static getBrowserLang(){if(typeof window>`u`||!window.navigator)return;let t=this.getBrowserCultureLang();return t?t.split(/[-_]/)[0]:void 0}static getBrowserCultureLang(){if(!(typeof window>`u`||typeof window.navigator>`u`))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}getBrowserLang(){return n.getBrowserLang()}getBrowserCultureLang(){return n.getBrowserCultureLang()}get currentLang(){return this.isRoot?this._currentLang.asReadonly():this.parent.currentLang}get fallbackLang(){return this.isRoot?this._fallbackLang.asReadonly():this.parent.fallbackLang}static ɵfac=function(e){return new(e||n)};static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var $t$2=(()=>{class n{translateService=y$3(H$1);cachedSignal=null;lastKey=null;lastParams;transform(t,...e){if(!t||!t.length)return t;let r=this.parseArgs(e);return(t!==this.lastKey||!U$1(r,this.lastParams))&&(this.cachedSignal=this.translateService.translate(t,r),this.lastKey=t,this.lastParams=r),this.cachedSignal()}parseArgs(t){if(!(!c$2(t[0])||!t.length)){if(k$3(t[0])&&t[0].length){let e=t[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,`"$2":`).replace(/:(\s)?(')(.*?)(')/g,`:"$3"`);try{return JSON.parse(e)}catch(r){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${t[0]}`)}}if(u$1(t[0]))return t[0]}}static ɵfac=function(e){return new(e||n)};static ɵpipe=tw({name:`translate`,type:n,pure:!1});static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();function lt$1(n){return/^class\s/.test(Function.prototype.toString.call(n))}function st$2(n,s){return lt$1(s)?{provide:n,useClass:s}:{provide:n,useFactory:s}}function jt$2(n={}){return Tt$2(s$1(r$2({},n),{isRoot:!0}))}function x(n,s,t,e,r){if(s===void 0)return st$2(n,t);if(typeof s==`function`){if(lt$1(s)){let a=s.name||`YourClass`;console.warn(`@ngx-translate/core: "${e}" received a bare class (${a}); auto-wrapping with ${r}(). For clarity, prefer ${e}: ${r}(${a}).`)}return st$2(n,s)}return s}function Tt$2(n){let s=[],t=x(v$1,n.loader,gt$2,`loader`,`provideTranslateLoader`),e=x(y$1,n.compiler,ft$2,`compiler`,`provideTranslateCompiler`),r=x(R$2,n.parser,bt$1,`parser`,`provideTranslateParser`),a=x(_$1,n.missingTranslationHandler,ht$2,`missingTranslationHandler`,`provideMissingTranslationHandler`);s.push(t,e,r,a),s.push(it$2);let i={fallbackLang:n.fallbackLang??null,lang:n.lang,isRoot:n.isRoot};return s.push({provide:ot$3,useValue:i}),s.push({provide:H$1,useClass:H$1}),s}var l=`Juanma Moreno Sánchez`;var s=`https://juanmamoreno.com`;var O=`seo.default.description`;var D=`artwork-structured-data`;var _=`breadcrumb-structured-data`;var k$2=`essay-structured-data`;var j$1=(()=>{class c extends pr$1{constructor(){super(...arguments),this.title=y$3(an$3),this.meta=y$3(sn$3),this.document=y$3(tn$3),this.translate=y$3(H$1)}updateTitle(t){let i=this.buildTitle(t),e=i?this.translate.instant(i):``,a=e?`${e} \xB7 ${l}`:`${l} \u2014 artist`,r=this.deepestDescription(t.root)??O,o=this.translate.instant(r),n=this.absoluteUrl(t.url);this.title.setTitle(a),this.meta.updateTag({name:`description`,content:o}),this.meta.updateTag({property:`og:title`,content:a}),this.meta.updateTag({property:`og:description`,content:o}),this.meta.updateTag({property:`og:url`,content:n}),this.meta.updateTag({name:`twitter:title`,content:a}),this.meta.updateTag({name:`twitter:description`,content:o}),this.setCanonical(n),this.setLanguageAlternates(t.url),this.setLocale(t.url),this.meta.updateTag({property:`og:type`,content:`website`}),this.setRobots(this.deepestData(t.root,`noindex`)===!0),this.clearArtworkStructuredData()}setLocale(t){let i=t.split(`?`)[0].split(`#`)[0].replace(/^\/+|\/+$/g,``),e=i===`es`||i.startsWith(`es/`);this.meta.updateTag({property:`og:locale`,content:e?`es_ES`:`en_GB`}),this.meta.updateTag({property:`og:locale:alternate`,content:e?`en_GB`:`es_ES`})}setLanguageAlternates(t){let i=t.split(`?`)[0].split(`#`)[0].replace(/^\/+|\/+$/g,``),e=i===`es`?``:i.replace(/^es\//,``),a=[[`en`,this.absoluteUrl(e)],[`es`,this.absoluteUrl(`es/${e}`)],[`x-default`,this.absoluteUrl(e)]];this.document.head.querySelectorAll(`link[rel="alternate"][hreflang]`).forEach(r=>r.remove());for(let[r,o]of a){let n=this.document.createElement(`link`);n.setAttribute(`rel`,`alternate`),n.setAttribute(`hreflang`,r),n.setAttribute(`href`,o),this.document.head.appendChild(n)}}setArtworkStructuredData(t){let{name:i,url:e,image:a,description:r,year:o$1,medium:n,width:I,height:L,unit:u,sold:P,tokenId:p}=t,m=f=>f&&u?{"@type":`Distance`,name:`${f} ${u}`}:void 0,h=e.includes(`/es/`),g=h?`${s}/es`:s,v={"@context":`https://schema.org`,"@type":`VisualArtwork`,name:i,url:e,image:a,description:r||void 0,artform:`Painting`,artMedium:n||void 0,dateCreated:o$1||void 0,width:m(I),height:m(L),creator:{"@type":`Person`,name:l,url:s},identifier:{"@type":`PropertyValue`,propertyID:`Ethereum ERC-721`,value:`${o}:${p}`},sameAs:a$1(p),isPartOf:{"@type":`Collection`,"@id":`${g}/artworks#catalogue`,name:h?`Pinturas`:`Paintings`,url:`${g}/artworks/`},offers:{"@type":`Offer`,availability:P?`https://schema.org/SoldOut`:`https://schema.org/InStock`,url:e,seller:{"@type":`Person`,name:l,url:s}}};this.writeJsonLd(D,v),this.writeJsonLd(_,this.breadcrumbTrail(i,e))}breadcrumbTrail(t,i){let e=i.includes(`/es/`),a=e?`${s}/es`:s;return{"@context":`https://schema.org`,"@type":`BreadcrumbList`,itemListElement:[{name:e?`Inicio`:`Home`,item:`${a}/`},{name:e?`Pinturas`:`Paintings`,item:`${a}/artworks/`},{name:t,item:i}].map((o,n)=>({"@type":`ListItem`,position:n+1,name:o.name,item:o.item}))}}writeJsonLd(t,i){let e=this.document.head.querySelector(`#${t}`);e||(e=this.document.createElement(`script`),e.setAttribute(`type`,`application/ld+json`),e.setAttribute(`id`,t),this.document.head.appendChild(e)),e.textContent=JSON.stringify(i)}setEssayStructuredData(t){this.writeJsonLd(k$2,{"@context":`https://schema.org`,"@type":`Article`,headline:t.headline,inLanguage:t.language,url:t.url,mainEntityOfPage:t.url,datePublished:t.published||void 0,dateModified:t.modified||t.published||void 0,about:{"@type":`VisualArtwork`,name:t.artworkName,url:t.url},author:{"@type":`Person`,name:l,url:s},publisher:{"@type":`Person`,name:l,url:s}}),t.modified&&this.meta.updateTag({property:`article:modified_time`,content:t.modified}),t.published&&this.meta.updateTag({property:`article:published_time`,content:t.published})}clearArtworkStructuredData(){this.document.head.querySelector(`#${D}`)?.remove(),this.document.head.querySelector(`#${_}`)?.remove(),this.document.head.querySelector(`#${k$2}`)?.remove(),this.meta.removeTag(`property='article:modified_time'`),this.meta.removeTag(`property='article:published_time'`)}setPageTitle(t,i,e,a){let r=`${t} \xB7 ${l}`;this.title.setTitle(r),this.meta.updateTag({property:`og:title`,content:r}),this.meta.updateTag({name:`twitter:title`,content:r}),i&&(this.meta.updateTag({name:`description`,content:i}),this.meta.updateTag({property:`og:description`,content:i}),this.meta.updateTag({name:`twitter:description`,content:i})),e&&(this.meta.updateTag({property:`og:image`,content:e}),this.meta.updateTag({name:`twitter:image`,content:e})),a&&this.meta.updateTag({property:`og:type`,content:a})}deepestDescription(t){let i,e=t;for(;e;){let a=e.data.description;typeof a==`string`&&(i=a),e=e.firstChild}return i}pointCanonicalAt(t){let i=t.replace(/^\/+|\/+$/g,``),e=this.absoluteUrl(i);this.meta.updateTag({property:`og:url`,content:e}),this.setCanonical(e),this.setLanguageAlternates(i)}absoluteUrl(t){let e=t.split(`?`)[0].split(`#`)[0].replace(/^\/+|\/+$/g,``);return e?`${s}/${e}/`:`${s}/`}setRobots(t){t?this.meta.updateTag({name:`robots`,content:`noindex, nofollow`}):this.meta.removeTag(`name='robots'`)}deepestData(t,i){let e,a=t;for(;a;)a.data[i]!==void 0&&(e=a.data[i]),a=a.firstChild;return e}setCanonical(t){let i=this.document.head.querySelector(`link[rel="canonical"]`);i||(i=this.document.createElement(`link`),i.setAttribute(`rel`,`canonical`),this.document.head.appendChild(i)),i.setAttribute(`href`,t)}static{this.ɵfac=(()=>{let t;return function(e){return(t||(t=uI(c)))(e||c)}})()}static{this.ɵprov=de$3({token:c,factory:c.ɵfac,providedIn:`root`})}}return c})();var m$1=(()=>{class e{get vertical(){return this._vertical}set vertical(t){this._vertical=vi$3(t)}_vertical=!1;get inset(){return this._inset}set inset(t){this._inset=vi$3(t)}_inset=!1;static ɵfac=function(r){return new(r||e)};static ɵcmp=YC({type:e,selectors:[[`mat-divider`]],hostAttrs:[`role`,`separator`,1,`mat-divider`],hostVars:7,hostBindings:function(r,i){r&2&&(Sm(`aria-orientation`,i.vertical?`vertical`:`horizontal`),Qm(`mat-divider-vertical`,i.vertical)(`mat-divider-horizontal`,!i.vertical)(`mat-divider-inset`,i.inset))},inputs:{vertical:`vertical`,inset:`inset`},decls:0,vars:0,template:function(r,i){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--%NS%mat-divider-color, var(--%NS%mat-sys-outline-variant));
  border-top-width: var(--%NS%mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--%NS%mat-divider-color, var(--%NS%mat-sys-outline-variant));
  border-right-width: var(--%NS%mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2})}return e})();var d$1=[`*`];var m=(()=>{class i{labelPosition=`after`;static ɵfac=function(n){return new(n||i)};static ɵcmp=YC({type:i,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(n,t){n&2&&Qm(`mdc-form-field--align-end`,t.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:d$1,decls:1,vars:0,template:function(n,t){n&1&&(hb(),gb(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})}return i})();var K$1=[`tooltip`];var J=20;var tt$2=new S$2(`mat-tooltip-scroll-strategy`,{providedIn:`root`,factory:()=>{let a=y$3(ve$1);return()=>Yt$3(a,{scrollThrottle:J})}});var et$2=new S$2(`mat-tooltip-default-options`,{providedIn:`root`,factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var Q$2=`tooltip-panel`;var it$1={passive:!0};var ot$2=8;var st$1=8;var nt$2=24;var at$2=200;var rt$2=(()=>{class a{_elementRef=y$3(Jr$2);_ngZone=y$3(Ce$1);_platform=y$3(p$1);_ariaDescriber=y$3($o$3);_focusMonitor=y$3(kt$3);_dir=y$3(zn$1);_injector=y$3(ve$1);_viewContainerRef=y$3(Ns$1);_mediaMatcher=y$3(mt$4);_document=y$3(tn$3);_renderer=y$3(Uc);_animationsDisabled=z$4();_defaultOptions=y$3(et$2,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position=`below`;_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=W;_viewportMargin=8;_currentPosition;_cssClassPrefix=`mat-mdc`;_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(t){t!==this._position&&(this._position=t,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(t){this._positionAtOrigin=vi$3(t),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(t){let e=vi$3(t);this._disabled!==e&&(this._disabled=e,e?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(t){this._showDelay=Mt$3(t)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(t){this._hideDelay=Mt$3(t),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures=`auto`;get message(){return this._message}set message(t){let e=this._message;this._message=t!=null?String(t).trim():``,!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(e)}_message=``;get tooltipClass(){return this._tooltipClass}set tooltipClass(t){this._tooltipClass=t,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new ne$2;_isDestroyed=!1;constructor(){let t=this._defaultOptions;t&&(this._showDelay=t.showDelay,this._hideDelay=t.hideDelay,t.position&&(this.position=t.position),t.positionAtOrigin&&(this.positionAtOrigin=t.positionAtOrigin),t.touchGestures&&(this.touchGestures=t.touchGestures),t.tooltipClass&&(this.tooltipClass=t.tooltipClass)),this._viewportMargin=ot$2}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(By(this._destroyed)).subscribe(t=>{t?t===`keyboard`&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let t=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(e=>e()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(t,this.message,`tooltip`),this._focusMonitor.stopMonitoring(t)}show(t=this.showDelay,e){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let i=this._createOverlay(e);this._detach(),this._portal=this._portal||new pt$4(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=i.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(By(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(t)}hide(t=this.hideDelay){let e=this._tooltipInstance;e&&(e.isVisible()?e.hide(t):(e._cancelPendingAnimations(),this._detach()))}toggle(t){this._isTooltipVisible()?this.hide():this.show(void 0,t)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(t){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!t)&&s._origin instanceof Jr$2)return this._overlayRef;this._detach()}let e=this._injector.get(U$4).getAncestorScrollContainers(this._elementRef),i=`${this._cssClassPrefix}-${Q$2}`,o=Gt$4(this._injector,this.positionAtOrigin?t||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(e).withPopoverLocation(`global`);return o.positionChanges.pipe(By(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=$t$3(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,i]:i,scrollStrategy:this._injector.get(tt$2)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(By(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(By(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(By(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(By(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(t){let e=t.getConfig().positionStrategy,i=this._getOrigin(),o=this._getOverlayPosition();e.withPositions([this._addOffset(r$2(r$2({},i.main),o.main)),this._addOffset(r$2(r$2({},i.fallback),o.fallback))])}_addOffset(t){let e=st$1,i=!this._dir||this._dir.value==`ltr`;return t.originY===`top`?t.offsetY=-e:t.originY===`bottom`?t.offsetY=e:t.originX===`start`?t.offsetX=i?-e:e:t.originX===`end`&&(t.offsetX=i?e:-e),t}_getOrigin(){let t=!this._dir||this._dir.value==`ltr`,e=this.position,i;e==`above`||e==`below`?i={originX:`center`,originY:e==`above`?`top`:`bottom`}:e==`before`||e==`left`&&t||e==`right`&&!t?i={originX:`start`,originY:`center`}:(e==`after`||e==`right`&&t||e==`left`&&!t)&&(i={originX:`end`,originY:`center`});let{x:o,y:s}=this._invertPosition(i.originX,i.originY);return{main:i,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let t=!this._dir||this._dir.value==`ltr`,e=this.position,i;e==`above`?i={overlayX:`center`,overlayY:`bottom`}:e==`below`?i={overlayX:`center`,overlayY:`top`}:e==`before`||e==`left`&&t||e==`right`&&!t?i={overlayX:`end`,overlayY:`center`}:(e==`after`||e==`right`&&t||e==`left`&&!t)&&(i={overlayX:`start`,overlayY:`center`});let{x:o,y:s}=this._invertPosition(i.overlayX,i.overlayY);return{main:i,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),Nl(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(t){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=t instanceof Set?Array.from(t):t,this._tooltipInstance._markForCheck())}_invertPosition(t,e){return this.position===`above`||this.position===`below`?e===`top`?e=`bottom`:e===`bottom`&&(e=`top`):t===`end`?t=`start`:t===`start`&&(t=`end`),{x:t,y:e}}_updateCurrentPositionClass(t){let{overlayY:e,originX:i,originY:o}=t,s;if(e===`center`?this._dir&&this._dir.value===`rtl`?s=i===`end`?`left`:`right`:s=i===`start`?`left`:`right`:s=e===`bottom`&&o===`top`?`above`:`below`,s!==this._currentPosition){let d=this._overlayRef;if(d){let b=`${this._cssClassPrefix}-${Q$2}-`;d.removePanelClass(b+this._currentPosition),d.addPanelClass(b+s)}this._currentPosition=s}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!==`off`&&(this._disableNativeGesturesIfNecessary(),this._addListener(`touchstart`,t=>{let e=t.targetTouches?.[0],i=e?{x:e.clientX,y:e.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,i)},this._defaultOptions?.touchLongPressShowDelay??o)})):this._addListener(`mouseenter`,t=>{this._setupPointerExitEventsIfNeeded();let e;t.x!==void 0&&t.y!==void 0&&(e=t),this.show(void 0,e)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener(`mouseleave`,t=>{let e=t.relatedTarget;(!e||!this._overlayRef?.overlayElement.contains(e))&&this.hide()}),this._addListener(`wheel`,t=>{if(this._isTooltipVisible()){let e=this._document.elementFromPoint(t.clientX,t.clientY),i=this._elementRef.nativeElement;e!==i&&!i.contains(e)&&this.hide()}});else if(this.touchGestures!==`off`){this._disableNativeGesturesIfNecessary();let t=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener(`touchend`,t),this._addListener(`touchcancel`,t)}}}_addListener(t,e){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,t,e,it$1))}_isTouchPlatform(){let t=this._defaultOptions?.detectHoverCapability;return typeof t==`function`?!t():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!t&&this._mediaMatcher.matchMedia(`(any-hover: none)`).matches:!1}_disableNativeGesturesIfNecessary(){let t=this.touchGestures;if(t!==`off`){let e=this._elementRef.nativeElement,i=e.style;(t===`on`||e.nodeName!==`INPUT`&&e.nodeName!==`TEXTAREA`)&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect=`none`),(t===`on`||!e.draggable)&&(i.webkitUserDrag=`none`),i.touchAction=`none`,i.webkitTapHighlightColor=`transparent`}}_syncAriaDescription(t){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,t,`tooltip`),this._isDestroyed||Nl({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,`tooltip`)}},{injector:this._injector}))}_overlayEventPredicate=t=>t.type===`keydown`?this._isTooltipVisible()&&t.keyCode===27&&!Le$1(t):!0;static ɵfac=function(e){return new(e||a)};static ɵdir=ew({type:a,selectors:[[``,`matTooltip`,``]],hostAttrs:[1,`mat-mdc-tooltip-trigger`],hostVars:2,hostBindings:function(e,i){e&2&&Qm(`mat-mdc-tooltip-disabled`,i.disabled)},inputs:{position:[0,`matTooltipPosition`,`position`],positionAtOrigin:[0,`matTooltipPositionAtOrigin`,`positionAtOrigin`],disabled:[0,`matTooltipDisabled`,`disabled`],showDelay:[0,`matTooltipShowDelay`,`showDelay`],hideDelay:[0,`matTooltipHideDelay`,`hideDelay`],touchGestures:[0,`matTooltipTouchGestures`,`touchGestures`],message:[0,`matTooltip`,`message`],tooltipClass:[0,`matTooltipClass`,`tooltipClass`]},exportAs:[`matTooltip`]})}return a})();var W=(()=>{class a{_changeDetectorRef=y$3(QV);_elementRef=y$3(Jr$2);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=z$4();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new ne$2;_showAnimation=`mat-mdc-tooltip-show`;_hideAnimation=`mat-mdc-tooltip-hide`;show(t){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},t)}hide(t){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},t)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:t}){(!t||!this._triggerElement.contains(t))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let t=this._elementRef.nativeElement.getBoundingClientRect();return t.height>nt$2&&t.width>=at$2}_handleAnimationEnd({animationName:t}){(t===this._showAnimation||t===this._hideAnimation)&&this._finalizeAnimation(t===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(t){t?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(t){let e=this._tooltip.nativeElement,i=this._showAnimation,o=this._hideAnimation;if(e.classList.remove(t?o:i),e.classList.add(t?i:o),this._isVisible!==t&&(this._isVisible=t,this._changeDetectorRef.markForCheck()),t&&!this._animationsDisabled&&typeof getComputedStyle==`function`){let s=getComputedStyle(e);(s.getPropertyValue(`animation-duration`)===`0s`||s.getPropertyValue(`animation-name`)===`none`)&&(this._animationsDisabled=!0)}t&&this._onShow(),this._animationsDisabled&&(e.classList.add(`_mat-animation-noopable`),this._finalizeAnimation(t))}static ɵfac=function(e){return new(e||a)};static ɵcmp=YC({type:a,selectors:[[`mat-tooltip-component`]],viewQuery:function(e,i){if(e&1&&Um(K$1,7),e&2){let o;vb(o=yb())&&(i._tooltip=o.first)}},hostAttrs:[`aria-hidden`,`true`],hostBindings:function(e,i){e&1&&jm(`mouseleave`,function(s){return i._handleMouseLeave(s)})},decls:4,vars:5,consts:[[`tooltip`,``],[1,`mdc-tooltip`,`mat-mdc-tooltip`,3,`animationend`],[1,`mat-mdc-tooltip-surface`,`mdc-tooltip__surface`]],template:function(e,i){e&1&&(iu(0,`div`,1,0),Vm(`animationend`,function(s){return i._handleAnimationEnd(s)}),iu(2,`div`,2),Ub(3),su()()),e&2&&(Ab(i.tooltipClass),Qm(`mdc-tooltip--multiline`,i._isMultiline),cT(3),nv(i.message))},styles:[`.mat-mdc-tooltip {
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
  background-color: var(--%NS%mat-tooltip-container-color, var(--%NS%mat-sys-inverse-surface));
  color: var(--%NS%mat-tooltip-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-tooltip-container-shape, var(--%NS%mat-sys-corner-extra-small));
  font-family: var(--%NS%mat-tooltip-supporting-text-font, var(--%NS%mat-sys-body-small-font));
  font-size: var(--%NS%mat-tooltip-supporting-text-size, var(--%NS%mat-sys-body-small-size));
  font-weight: var(--%NS%mat-tooltip-supporting-text-weight, var(--%NS%mat-sys-body-small-weight));
  line-height: var(--%NS%mat-tooltip-supporting-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  letter-spacing: var(--%NS%mat-tooltip-supporting-text-tracking, var(--%NS%mat-sys-body-small-tracking));
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
`],encapsulation:2})}return a})();var e={production:!1,homeTokenId:`2`,adminAdress:`0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9`,backendUrl:`https://backend.juanmamoreno.com/`,adminEmail:`morenosanchezjuanma@gmail.com`,googleClientId:`164035848667-t6fv2d02rfhojassdhh3cv0q3qk44mde.apps.googleusercontent.com`,backendUrlFallback:`https://juanmamoreno-backend-164035848667.europe-west1.run.app/`};var y=`https://accounts.google.com/gsi/client`;var g=(()=>{class n{constructor(){this.loading=null}load(){if(this.loading)return this.loading;let e=window.google;return e?(this.loading=Promise.resolve(e),this.loading):(this.loading=new Promise((t,i)=>{let o=document.createElement(`script`);o.src=y,o.async=!0,o.onload=()=>{let s=window.google;s?t(s):i(new Error(`Google identity did not load`))},o.onerror=()=>i(new Error(`Google identity did not load`)),document.head.appendChild(o)}),this.loading.catch(()=>this.loading=null),this.loading)}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵprov=de$3({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var u=`juanmamoreno.adminToken`;var w=`juanmamoreno.adminKnown`;var v=300*1e3;var I$1=[`accounts.google.com`,`https://accounts.google.com`];var N$1=(()=>{class n{constructor(){this.isBrowser=xi$4(y$3(SE)),this.google=y$3(g),this.token=ze$1(this.readStoredToken()),this.knownHere=ze$1(this.readKnown()),this.renewing=null,this.renewalTimer=null,this.identity=_t$5(()=>{let e=this.token();return e?this.verify(e):null}),this.isAdmin=_t$5(()=>this.identity()!==null),this.bearerToken=_t$5(()=>this.identity()?this.token():null)}signIn(e){return this.verify(e)?(this.token.set(e),this.store(e),this.rememberKnown(),this.scheduleRenewal(),!0):!1}signOut(){this.token.set(null),this.store(null),this.renewalTimer&&clearTimeout(this.renewalTimer),this.renewalTimer=null}keepAlive(){if(!(!this.isBrowser||!this.knownHere())){if(this.identity()){this.scheduleRenewal();return}this.renew()}}renew(){return this.renewing?this.renewing:e.googleClientId?(this.renewing=this.google.load().then(e$5=>new Promise(t=>{e$5.accounts.id.initialize({client_id:e.googleClientId,callback:i=>t(this.signIn(i.credential)),auto_select:!0,cancel_on_tap_outside:!1}),e$5.accounts.id.prompt()})).catch(()=>!1).finally(()=>this.renewing=null),this.renewing):Promise.resolve(!1)}scheduleRenewal(){if(!this.isBrowser)return;this.renewalTimer&&clearTimeout(this.renewalTimer);let e=this.identity();if(!e)return;let t=e.exp*1e3-Date.now()-v;t<=0||t>2**31-1||(this.renewalTimer=setTimeout(()=>{this.renew()},t))}readKnown(){if(!this.isBrowser)return!1;try{return window.localStorage.getItem(w)===`yes`}catch{return!1}}rememberKnown(){this.knownHere.set(!0);try{window.localStorage.setItem(w,`yes`)}catch{}}verify(e$6){let t=this.decode(e$6);if(!t)return null;let i=t.exp*1e3>Date.now(),o=I$1.includes(t.iss),s=t.aud===e.googleClientId,f=t.email_verified===!0&&t.email?.toLowerCase()===e.adminEmail.toLowerCase();return i&&o&&s&&f?t:null}decode(e){try{let t=e.split(`.`)[1],i=atob(t.replace(/-/g,`+`).replace(/_/g,`/`));return JSON.parse(decodeURIComponent(escape(i)))}catch{return null}}readStoredToken(){if(!this.isBrowser)return null;try{return window.localStorage.getItem(u)}catch{return null}}store(e){if(this.isBrowser)try{e?window.localStorage.setItem(u,e):window.localStorage.removeItem(u)}catch{}}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵprov=de$3({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();function $(i){return Error(`Unable to find icon with the name "${i}"`)}function K(){return Error(`Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.`)}function j(i){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`)}function B(i){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`)}var a=class{url;svgText;options;svgElement=null;constructor(l,t,e){this.url=l,this.svgText=t,this.options=e}};var q$1=(()=>{class i{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=[`material-icons`,`mat-ligature-font`];constructor(t,e,n,o){this._httpClient=t,this._sanitizer=e,this._errorHandler=o,this._document=n}addSvgIcon(t,e,n){return this.addSvgIconInNamespace(``,t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace(``,t,e,n)}addSvgIconInNamespace(t,e,n,o){return this._addSvgIconConfig(t,e,new a(n,null,o))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,o){let r=this._sanitizer.sanitize(z$3.HTML,n);if(!r)throw B(n);let s=rn$4(r);return this._addSvgIconConfig(t,e,new a(``,s,o))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace(``,t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace(``,t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new a(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){let o=this._sanitizer.sanitize(z$3.HTML,e);if(!o)throw B(e);let r=rn$4(o);return this._addSvgIconSetConfig(t,new a(``,r,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let e=this._sanitizer.sanitize(z$3.RESOURCE_URL,t);if(!e)throw j(t);let n=this._cachedIconsByUrl.get(e);return n?hy(C(n)):this._loadSvgIconFromConfig(new a(t,null)).pipe(gd(o=>this._cachedIconsByUrl.set(e,o)),Ve$3(o=>C(o)))}getNamedSvgIcon(t,e=``){let n=V(e,t),o=this._svgIconConfigs.get(n);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(e,t),o)return this._svgIconConfigs.set(n,o),this._getSvgFromConfig(o);let r=this._iconSetConfigs.get(e);return r?this._getSvgFromIconSetConfigs(t,r):gy($(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?hy(C(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(Ve$3(e=>C(e)))}_getSvgFromIconSetConfigs(t,e){let n=this._extractIconWithNameFromAnySet(t,e);if(n)return hy(n);return Ay(e.filter(r=>!r.svgText).map(r=>this._loadSvgIconSetFromConfig(r).pipe(Js$1(s=>{let f=`Loading icon set URL: ${this._sanitizer.sanitize(z$3.RESOURCE_URL,r.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(f)),hy(null)})))).pipe(Ve$3(()=>{let r=this._extractIconWithNameFromAnySet(t,e);if(!r)throw $(t);return r}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){let o=e[n];if(o.svgText&&o.svgText.toString().indexOf(t)>-1){let r=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(r,t,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(gd(e=>t.svgText=e),Ve$3(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?hy(null):this._fetchIcon(t).pipe(gd(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){let o=t.querySelector(`[id="${e}"]`);if(!o)return null;let r=o.cloneNode(!0);if(r.removeAttribute(`id`),r.nodeName.toLowerCase()===`svg`)return this._setSvgAttributes(r,n);if(r.nodeName.toLowerCase()===`symbol`)return this._setSvgAttributes(this._toSvgElement(r),n);let s=this._svgElementFromString(rn$4(`<svg></svg>`));return s.appendChild(r),this._setSvgAttributes(s,n)}_svgElementFromString(t){let e=this._document.createElement(`DIV`);e.innerHTML=t;let n=e.querySelector(`svg`);if(!n)throw Error(`<svg> tag not found`);return n}_toSvgElement(t){let e=this._svgElementFromString(rn$4(`<svg></svg>`)),n=t.attributes;for(let o=0;o<n.length;o++){let{name:r,value:s}=n[o];r!==`id`&&e.setAttribute(r,s)}for(let o=0;o<t.childNodes.length;o++)t.childNodes[o].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[o].cloneNode(!0));return e}_setSvgAttributes(t,e){return t.setAttribute(`fit`,``),t.setAttribute(`height`,`100%`),t.setAttribute(`width`,`100%`),t.setAttribute(`preserveAspectRatio`,`xMidYMid meet`),t.setAttribute(`focusable`,`false`),e&&e.viewBox&&t.setAttribute(`viewBox`,e.viewBox),t}_fetchIcon(t){let{url:e,options:n}=t,o=n?.withCredentials??!1;if(!this._httpClient)throw K();if(e==null)throw Error(`Cannot fetch icon from URL "${e}".`);let r=this._sanitizer.sanitize(z$3.RESOURCE_URL,e);if(!r)throw j(e);let s=this._inProgressUrlFetches.get(r);if(s)return s;let h=this._httpClient.get(r,{responseType:`text`,withCredentials:o}).pipe(Ve$3(f=>rn$4(f)),dd(()=>this._inProgressUrlFetches.delete(r)),ra());return this._inProgressUrlFetches.set(r,h),h}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(V(t,e),n),this}_addSvgIconSetConfig(t,e){let n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){let e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){let o=this._resolvers[n](e,t);if(o)return G$2(o)?new a(o.url,null,o.options):new a(o,null)}}static ɵfac=function(e){return new(e||i)($e$3(St$2,8),$e$3(it$8),$e$3(tn$3,8),$e$3(it$6))};static ɵprov=de$3({token:i,factory:i.ɵfac,providedIn:`root`})}return i})();function C(i){return i.cloneNode(!0)}function V(i,l){return i+`:`+l}function G$2(i){return!!(i.url&&i.options)}var Q$1=[`*`];var X$1=new S$2(`MAT_ICON_DEFAULT_OPTIONS`);var Z$1=new S$2(`mat-icon-location`,{providedIn:`root`,factory:()=>{let i=y$3(tn$3),l=i?i.location:null;return{getPathname:()=>l?l.pathname+l.search:``}}});var Y$2=[`clip-path`,`color-profile`,`src`,`cursor`,`fill`,`filter`,`marker`,`marker-start`,`marker-mid`,`marker-end`,`mask`,`stroke`];var tt$1=Y$2.map(i=>`[${i}]`).join(`, `);var et$1=/^url\(['"]?#(.*?)['"]?\)$/;var Et=(()=>{class i{_elementRef=y$3(Jr$2);_iconRegistry=y$3(q$1);_location=y$3(Z$1);_errorHandler=y$3(it$6);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=J$4.EMPTY;constructor(){let t=y$3(new Bv(`aria-hidden`),{optional:!0}),e=y$3(X$1,{optional:!0});e&&(e.color&&(this.color=this._defaultColor=e.color),e.fontSet&&(this.fontSet=e.fontSet)),t||this._elementRef.nativeElement.setAttribute(`aria-hidden`,`true`)}_splitIconName(t){if(!t)return[``,``];let e=t.split(`:`);switch(e.length){case 1:return[``,e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){let n=t.childNodes[e];(n.nodeType!==1||n.nodeName.toLowerCase()===`svg`)&&n.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes(`mat-ligature-font`)&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t==`string`?t.trim().split(` `)[0]:t}_prependPathToReferences(t){let e=this._elementsWithExternalReferences;e&&e.forEach((n,o)=>{n.forEach(r=>{o.setAttribute(r.name,`url('${t}#${r.value}')`)})})}_cacheChildrenWithExternalReferences(t){let e=t.querySelectorAll(tt$1),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<e.length;o++)Y$2.forEach(r=>{let s=e[o],h=s.getAttribute(r),f=h?h.match(et$1):null;if(f){let p=n.get(s);p||(p=[],n.set(s,p)),p.push({name:r,value:f[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe(Lt$4(1)).subscribe(o=>this._setSvgElement(o),o=>{let r=`Error retrieving icon ${e}:${n}! ${o.message}`;this._errorHandler.handleError(new Error(r))})}}static ɵfac=function(e){return new(e||i)};static ɵcmp=YC({type:i,selectors:[[`mat-icon`]],hostAttrs:[`role`,`img`,1,`mat-icon`,`notranslate`],hostVars:10,hostBindings:function(e,n){e&2&&(Sm(`data-mat-icon-type`,n._usingFontIcon()?`font`:`svg`)(`data-mat-icon-name`,n._svgName||n.fontIcon)(`data-mat-icon-namespace`,n._svgNamespace||n.fontSet)(`fontIcon`,n._usingFontIcon()?n.fontIcon:null),Ab(n.color?`mat-`+n.color:``),Qm(`mat-icon-inline`,n.inline)(`mat-icon-no-color`,n.color!==`primary`&&n.color!==`accent`&&n.color!==`warn`))},inputs:{color:`color`,inline:[2,`inline`,`inline`,ZV],svgIcon:`svgIcon`,fontSet:`fontSet`,fontIcon:`fontIcon`},exportAs:[`matIcon`],ngContentSelectors:Q$1,decls:1,vars:0,template:function(e,n){e&1&&(hb(),gb(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--%NS%mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2})}return i})();var si=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,i){this._renderer=t,this._elementRef=i}setProperty(t,i){this._renderer.setProperty(this._elementRef.nativeElement,t,i)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty(`disabled`,t)}static ɵfac=function(i){return new(i||n)(ao$3(Uc),ao$3(Jr$2))};static ɵdir=ew({type:n})}return n})();var mr=(()=>{class n extends si{static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵdir=ew({type:n,features:[gm]})}return n})();var et=new S$2(``);var hr={provide:et,useExisting:ni$3(()=>ai),multi:!0};function pr(){let n=ne$3()?ne$3().getUserAgent():``;return/android (\d+)/.test(n.toLowerCase())}var gr=new S$2(``);var ai=(()=>{class n extends si{_compositionMode;_composing=!1;constructor(t,i,r){super(t,i),this._compositionMode=r,this._compositionMode??=!pr()}writeValue(t){let i=t??``;this.setProperty(`value`,i)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static ɵfac=function(i){return new(i||n)(ao$3(Uc),ao$3(Jr$2),ao$3(gr,8))};static ɵdir=ew({type:n,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(i,r){i&1&&jm(`input`,function(s){return r._handleInput(s.target.value)})(`blur`,function(){return r.onTouched()})(`compositionstart`,function(){return r._compositionStart()})(`compositionend`,function(s){return r._compositionEnd(s.target.value)})},standalone:!1,features:[e_([hr]),gm]})}return n})();function kt(n){return n==null||Lt(n)===0}function Lt(n){return n==null?null:Array.isArray(n)||typeof n==`string`?n.length:n instanceof Set?n.size:null}var ae=new S$2(``);var jt$1=new S$2(``);var vr$1=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;var re=class{static min(e){return _r(e)}static max(e){return yr$1(e)}static required(e){return li(e)}static requiredTrue(e){return br(e)}static email(e){return Cr$1(e)}static minLength(e){return xr$1(e)}static maxLength(e){return Sr$1(e)}static pattern(e){return Nr$1(e)}static nullValidator(e){return We()}static compose(e){return hi$1(e)}static composeAsync(e){return pi$1(e)}};function _r(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return!isNaN(t)&&t<n?{min:{min:n,actual:e.value}}:null}}function yr$1(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return!isNaN(t)&&t>n?{max:{max:n,actual:e.value}}:null}}function li(n){return kt(n.value)?{required:!0}:null}function br(n){return n.value===!0?null:{required:!0}}function Cr$1(n){return kt(n.value)||vr$1.test(n.value)?null:{email:!0}}function xr$1(n){return e=>{let t=e.value?.length??Lt(e.value);return t===null||t===0?null:t<n?{minlength:{requiredLength:n,actualLength:t}}:null}}function Sr$1(n){return e=>{let t=e.value?.length??Lt(e.value);return t!==null&&t>n?{maxlength:{requiredLength:n,actualLength:t}}:null}}function Nr$1(n){if(!n)return We;let e,t;return typeof n==`string`?(t=``,n.charAt(0)!==`^`&&(t+=`^`),t+=n,n.charAt(n.length-1)!==`$`&&(t+=`$`),e=new RegExp(t)):(t=n.toString(),e=n),i=>{if(kt(i.value))return null;let r=i.value;return e.test(r)?null:{pattern:{requiredPattern:t,actualValue:r}}}}function We(n){return null}function di(n){return n!=null}function ci(n){return Xl(n)?je$1(n):n}function ui$1(n){let e={};return n.forEach(t=>{e=t!=null?r$2(r$2({},e),t):e}),Object.keys(e).length===0?null:e}function fi$1(n,e){return e.map(t=>t(n))}function Mr$1(n){return!n.validate}function mi(n){return n.map(e=>Mr$1(e)?e:t=>e.validate(t))}function hi$1(n){if(!n)return null;let e=n.filter(di);return e.length==0?null:function(t){return ui$1(fi$1(t,e))}}function Bt(n){return n!=null?hi$1(mi(n)):null}function pi$1(n){if(!n)return null;let e=n.filter(di);return e.length==0?null:function(t){return Ay(fi$1(t,e).map(ci)).pipe(Ve$3(ui$1))}}function zt(n){return n!=null?pi$1(mi(n)):null}function Zn(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function gi$1(n){return n._rawValidators}function vi$1(n){return n._rawAsyncValidators}function Ot$1(n){return n?Array.isArray(n)?n:[n]:[]}function $e(n,e){return Array.isArray(n)?n.includes(e):n===e}function Jn(n,e){let t=Ot$1(e);return Ot$1(n).forEach(r=>{$e(t,r)||t.push(r)}),t}function ei(n,e){return Ot$1(e).filter(t=>!$e(n,t))}var Ke=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Bt(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=zt(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control?.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}};var Y$1=class extends Ke{name;get formDirective(){return null}get path(){return null}};var Se$1=`VALID`;var qe=`INVALID`;var ne=`PENDING`;var Ne=`DISABLED`;var G$1=class{};var Qe$1=class extends G$1{value;source;constructor(e,t){super(),this.value=e,this.source=t}};var De=class extends G$1{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}};var we=class extends G$1{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}};var ie=class extends G$1{status;source;constructor(e,t){super(),this.status=e,this.source=t}};var Ye=class extends G$1{source;constructor(e){super(),this.source=e}};var oe=class extends G$1{source;constructor(e){super(),this.source=e}};function _i(n){return(tt(n)?n.validators:n)||null}function Dr$1(n){return Array.isArray(n)?Bt(n):n||null}function yi(n,e){return(tt(e)?e.asyncValidators:n)||null}function wr$1(n){return Array.isArray(n)?zt(n):n||null}function tt(n){return n!=null&&!Array.isArray(n)&&typeof n==`object`}function Er$1(n,e,t){let i=n.controls;if(!(e?Object.keys(i):i).length)throw new T$3(1e3,``);if(!bi$1(i,t))throw new T$3(1001,``)}function Fr$1(n,e,t){n._forEachChild((i,r)=>{if(t[r]===void 0)throw new T$3(-1002,``)})}var se=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=ze$1(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return he$2(this.statusReactive)}set status(e){he$2(()=>this.statusReactive.set(e))}_status=_t$5(()=>this.statusReactive());statusReactive=ze$1(void 0);get valid(){return this.status===Se$1}get invalid(){return this.status===qe}get pending(){return this.status===ne}get disabled(){return this.status===Ne}get enabled(){return this.status!==Ne}errors;get pristine(){return he$2(this.pristineReactive)}set pristine(e){he$2(()=>this.pristineReactive.set(e))}_pristine=_t$5(()=>this.pristineReactive());pristineReactive=ze$1(!0);get dirty(){return!this.pristine}get touched(){return he$2(this.touchedReactive)}set touched(e){he$2(()=>this.touchedReactive.set(e))}_touched=_t$5(()=>this.touchedReactive());touchedReactive=ze$1(!1);get untouched(){return!this.touched}_events=new ne$2;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(Jn(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(Jn(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(ei(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(ei(e,this._rawAsyncValidators))}hasValidator(e){return $e(this._rawValidators,e)}hasAsyncValidator(e){return $e(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let i=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched(s$1(r$2({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new we(!0,i))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:i})}),e.onlySelf||this._parent?._updateTouched(e,i),t&&e.emitEvent!==!1&&this._events.next(new we(!1,i))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let i=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty(s$1(r$2({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new De(!1,i))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),e.onlySelf||this._parent?._updatePristine(e,i),t&&e.emitEvent!==!1&&this._events.next(new De(!0,i))}markAsPending(e={}){this.status=ne;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new ie(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending(s$1(r$2({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Ne,this.errors=null,this._forEachChild(r=>{r.disable(s$1(r$2({},e),{onlySelf:!0}))}),this._updateValue();let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Qe$1(this.value,i)),this._events.next(new ie(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(s$1(r$2({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Se$1,this._forEachChild(i=>{i.enable(s$1(r$2({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(s$1(r$2({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Se$1||this.status===ne)&&this._runAsyncValidator(i,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Qe$1(this.value,t)),this._events.next(new ie(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity(s$1(r$2({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ne:Se$1}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=ne,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let i=ci(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(`.`)),t.length===0)?null:t.reduce((i,r)=>i&&i._find(r),this)}getError(e,t){let i=t?this.get(t):this;return i?.errors?i.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,i){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||i)&&this._events.next(new ie(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,i)}_initObservables(){this.valueChanges=new tt$6,this.statusChanges=new tt$6}_calculateStatus(){return this._allControlsDisabled()?Ne:this.errors?qe:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(ne)?ne:this._anyControlsHaveStatus(qe)?qe:Se$1}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,e.onlySelf||this._parent?._updatePristine(e,t),r&&this._events.next(new De(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new we(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){tt(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){return!e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Dr$1(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=wr$1(this._rawAsyncValidators)}_updateHasRequiredValidator(){he$2(()=>this._hasRequired.set(this.hasValidator(re.required)))}};function bi$1(n,e){return Object.hasOwn(n,e)}function Gt$1(n){return n.tagName===`INPUT`||n.tagName===`SELECT`||n.tagName===`TEXTAREA`}function Ci$1(n){if(n.tagName!==`INPUT`)return!1;let e=n.type;return e===`number`||e===`range`||e===`date`||e===`month`}function xi$1(n){return n.tagName===`INPUT`||n.tagName===`TEXTAREA`}function Fe(n,e,t,i){switch(t){case`name`:n.setAttribute(e,t,i);break;case`disabled`:case`readonly`:case`required`:i?n.setAttribute(e,t,``):n.removeAttribute(e,t);break;case`max`:case`min`:case`minLength`:case`maxLength`:i!==void 0?n.setAttribute(e,t,i.toString()):n.removeAttribute(e,t);break}}var Tt$1=class{kind;context;control;message;constructor({kind:e,context:t,control:i}){this.kind=e,this.context=t,this.control=i}};var Ar$1=(()=>{class n{_validator=We;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let i=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):We,this._onChange?.()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,features:[qE]})}return n})();var Vr={provide:ae,useExisting:ni$3(()=>Si$1),multi:!0};var Si$1=(()=>{class n extends Ar$1{required;inputName=`required`;normalizeInput=ZV;createValidator=t=>li;enabled(t){return t}static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵdir=ew({type:n,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(i,r){i&2&&Sm(`required`,r._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[e_([Vr]),gm]})}return n})();var Ht$1=new S$2(``);var nt$1=new S$2(``,{factory:()=>Ut$1});var Ut$1=`always`;function Rr(n,e){return[...e.path,n]}function ti(n,e,t=Ut$1){qt$1(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t===`always`)&&e.valueAccessor.setDisabledState?.(n.disabled),Or$1(n,e),Pr$1(n,e),Tr$1(n,e),Ir$1(n,e)}function ni(n,e,t=!0){let i=()=>{};e?.valueAccessor?.registerOnChange(i),e?.valueAccessor?.registerOnTouched(i),Ze(n,e),n&&(e._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function Xe(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function Ir$1(n,e){if(e.valueAccessor.setDisabledState){let t=i=>{e.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function qt$1(n,e){let t=gi$1(n);e.validator!==null?n.setValidators(Zn(t,e.validator)):typeof t==`function`&&n.setValidators([t]);let i=vi$1(n);e.asyncValidator!==null?n.setAsyncValidators(Zn(i,e.asyncValidator)):typeof i==`function`&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();Xe(e._rawValidators,r),Xe(e._rawAsyncValidators,r)}function Ze(n,e){let t=!1;if(n!==null){if(e.validator!==null){let r=gi$1(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==e.validator);o.length!==r.length&&(t=!0,n.setValidators(o))}}if(e.asyncValidator!==null){let r=vi$1(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==e.asyncValidator);o.length!==r.length&&(t=!0,n.setAsyncValidators(o))}}}let i=()=>{};return Xe(e._rawValidators,i),Xe(e._rawAsyncValidators,i),t}function Or$1(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn===`change`&&Ni$1(n,e)})}function Tr$1(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn===`blur`&&n._pendingChange&&Ni$1(n,e),n.updateOn!==`submit`&&n.markAsTouched()})}function Ni$1(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function Pr$1(n,e){let t=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function Mi(n,e){qt$1(n,e)}function kr$1(n,e){return Ze(n,e)}function Lr(n,e){if(!Object.hasOwn(n,`model`))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function jr$1(n){return Object.getPrototypeOf(n.constructor)===mr}function Di(n,e){n._syncPendingControls(),e.forEach(t=>{let i=t.control;i.updateOn===`submit`&&i._pendingChange&&(t.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function Wt$1(n,e){if(!e)return null;let t,i,r;return e.forEach(o=>{o.constructor===ai?t=o:jr$1(o)?i=o:r=o}),r||i||t||null}function Br$1(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}var zr={provide:Ht$1,useFactory:()=>{let n=y$3(H,{self:!0});return{setParseErrors:e=>{n.setParseErrorSource(e)},set onReset(e){n.onReset=e}}}};var H=class extends Ke{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(e){this.userOnReset=e,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof oe&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Wt$1(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(e,t,i){super(),this.injector=e,this.renderer=t,this.rawValueAccessors=i,this.injector?.get(Te$1)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let e=this.injector?.get(QV);if(!this.control||!e)return;let t=e.markForCheck.bind(e);this.subscription=new J$4,this.subscription.add(this.control.valueChanges.subscribe(t)),this.subscription.add(this.control.statusChanges.subscribe(t)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(i=>{i instanceof oe&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(e){!e.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!e.customControl||(this.isCustomControlBased=!0,e.listenToCustomControlModel(r=>{this.control?.setValue(r,{emitModelToViewChange:!1}),this.control?.markAsDirty(),this.viewToModelUpdate(r)}),e.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=Gt$1(e.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof Si$1))}ngControlUpdate(e,t){if(!this.isCustomControlBased)return;let i=this.control,r=this.customControlBindings;Object.is(r.value,i.value)||(r.value=i.value,e.setCustomControlModelInput(i.value)),this.bindControlProperty(e,r,`touched`,i.touched),this.bindControlProperty(e,r,`dirty`,i.dirty),this.bindControlProperty(e,r,`valid`,i.valid),this.bindControlProperty(e,r,`invalid`,i.invalid),this.bindControlProperty(e,r,`pending`,i.pending),this.bindControlProperty(e,r,`disabled`,i.disabled),this.shouldBindRequired&&this.bindControlProperty(e,r,`required`,this.isRequired);let o=i.errors;if(r.errors!==o){r.errors=o;let s=this._convertErrors(o);e.setInputOnDirectives(`errors`,s)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(e,t,i,r){if(t[i]===r)return;t[i]=r;let o=e.setInputOnDirectives(i,r);this.isNativeFormElement&&!o&&(i===`disabled`||i===`required`)&&this.renderer&&Fe(this.renderer,e.nativeElement,i,r)}_convertErrors(e){if(e===null)return[];let t=this.control;return Object.entries(e).map(([i,r])=>new Tt$1({context:r,kind:i,control:t}))}setParseErrorSource(e){if(e===void 0)return;let t=null,i=_t$5(()=>{let r=e();return r.length===0?null:r.reduce((o,s)=>(o[s.kind]=s,o),{})});this.parseErrorsValidator=(()=>t).bind(this),ac(()=>{t=i(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(e){this.parseErrorsValidator&&(e?.removeValidators(this.parseErrorsValidator),e?.updateValueAndValidity({emitEvent:!1}))}};var Pt$1=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Ps$1=(()=>{class n extends Pt$1{constructor(t){super(t)}static ɵfac=function(i){return new(i||n)(ao$3(H,2))};static ɵdir=ew({type:n,selectors:[[``,`formControlName`,``],[``,`ngModel`,``],[``,`formControl`,``]],hostVars:14,hostBindings:function(i,r){i&2&&Qm(`ng-untouched`,r.isUntouched)(`ng-touched`,r.isTouched)(`ng-pristine`,r.isPristine)(`ng-dirty`,r.isDirty)(`ng-valid`,r.isValid)(`ng-invalid`,r.isInvalid)(`ng-pending`,r.isPending)},standalone:!1,features:[gm]})}return n})();var Ee=class extends se{constructor(e,t,i){super(_i(t),yi(i,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(e,t){return this._find(e)||(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,i={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(e,t={}){let i=this._find(e);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(e,t,i={}){let r=this._find(e);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(e){return this._find(e)?.enabled===!0}setValue(e,t={}){he$2(()=>{Fr$1(this,!0,e),Object.keys(e).forEach(i=>{Er$1(this,!0,i),this.controls[i].setValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)})}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(i=>{let r=this._find(i);r&&r.patchValue(e[i],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e={},t={}){this._forEachChild((i,r)=>{i.reset(e?e[r]:null,s$1(r$2({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new oe(this))}getRawValue(){return this._reduceChildren({},(e,t,i)=>(e[i]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(t,i)=>i._syncPendingControls()?!0:t);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let i=this.controls[t];i&&e(i,t)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[t,i]of Object.entries(this.controls))if(this.contains(t)&&e(i))return!0;return!1}_reduceValue(){return this._reduceChildren({},(t,i,r)=>((i.enabled||this.disabled)&&(t[r]=i.value),t))}_reduceChildren(e,t){let i=e;return this._forEachChild((r,o)=>{i=t(i,r,o)}),i}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return bi$1(this.controls,e)?this.controls[e]:null}};var Gr$1={provide:Y$1,useExisting:ni$3(()=>Hr$1)};var Me$1=Promise.resolve();var Hr$1=(()=>{class n extends Y$1{callSetDisabledState;get submitted(){return he$2(this.submittedReactive)}_submitted=_t$5(()=>this.submittedReactive());submittedReactive=ze$1(!1);_directives=new Set;form;ngSubmit=new tt$6;options;constructor(t,i,r){super(),this.callSetDisabledState=r,this.form=new Ee({},Bt(t),zt(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){Me$1.then(()=>{t.control=this._findContainer(t.path).registerControl(t.name,t.control),t._setupWithForm(this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){Me$1.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){Me$1.then(()=>{let i=this._findContainer(t.path),r=new Ee({});Mi(r,t),i.registerControl(t.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){Me$1.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,i){Me$1.then(()=>{this.form.get(t.path).setValue(i)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),Di(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new Ye(this.control)),t?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static ɵfac=function(i){return new(i||n)(ao$3(ae,10),ao$3(jt$1,10),ao$3(nt$1,8))};static ɵdir=ew({type:n,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(i,r){i&1&&jm(`submit`,function(s){return r.onSubmit(s)})(`reset`,function(){return r.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[e_([Gr$1]),gm]})}return n})();function ii(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function ri(n){return typeof n==`object`&&n!==null&&Object.keys(n).length===2&&`value`in n&&`disabled`in n}var wi=class extends se{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,i){super(_i(t),yi(i,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),tt(t)&&(t.nonNullable||t.initialValueIsDefault)&&(ri(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){he$2(()=>{this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)})}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new oe(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){ii(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){ii(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){ri(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var Ur$1=n=>n instanceof wi;var qr$1=(()=>{class n extends Y$1{callSetDisabledState;get submitted(){return he$2(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=_t$5(()=>this._submittedReactive());_submittedReactive=ze$1(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,i,r){super(),this.callSetDisabledState=r,this._setValidators(t),this._setAsyncValidators(i)}ngOnChanges(t){this.onChanges(t)}ngOnDestroy(){this.onDestroy()}onChanges(t){this._checkFormPresent(),Object.hasOwn(t,`form`)&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Ze(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(t){let i=this.form.get(t.path);return t._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),i}getControl(t){return this.form.get(t.path)}removeControl(t){ni(t.control||null,t,!1),Br$1(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}updateModel(t,i){this.form.get(t.path).setValue(i)}onReset(){this.resetForm()}resetForm(t=void 0,i={}){this.form.reset(t,i),this._submittedReactive.set(!1)}onSubmit(t){return this.submitted=!0,Di(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new Ye(this.control)),t?.target?.method===`dialog`}_updateDomValue(){this.directives.forEach(t=>{let i=t.control,r=this.form.get(t.path);i!==r&&(ni(i||null,t),Ur$1(r)&&t._setupWithForm(r,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let i=this.form.get(t.path);Mi(i,t),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){let i=this.form?.get(t.path);i&&kr$1(i,t)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){qt$1(this.form,this),this._oldForm&&Ze(this._oldForm,this)}_checkFormPresent(){this.form}static ɵfac=function(i){return new(i||n)(ao$3(ae,10),ao$3(jt$1,10),ao$3(nt$1,8))};static ɵdir=ew({type:n,features:[gm,qE]})}return n})();var Wr$1={provide:Y$1,useExisting:ni$3(()=>$r$1)};var $r$1=(()=>{class n extends qr$1{form=null;ngSubmit=new tt$6;get control(){return this.form}static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵdir=ew({type:n,selectors:[[``,`formGroup`,``]],hostBindings:function(i,r){i&1&&jm(`submit`,function(s){return r.onSubmit(s)})(`reset`,function(){return r.onReset()})},inputs:{form:[0,`formGroup`,`form`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[e_([Wr$1]),gm]})}return n})();var Kr$1={provide:H,useExisting:ni$3(()=>Qr$1)};var oi=Promise.resolve();var Qr$1=(()=>{class n extends H{_changeDetectorRef;callSetDisabledState;control=new wi;static ngAcceptInputType_isDisabled;_registered=!1;_ngModelInjector;viewModel;name=``;isDisabled;model;options;update=new tt$6;constructor(t,i,r,o,s,l,c,f){super(c,f,o),this._changeDetectorRef=s,this.callSetDisabledState=l,this._parent=t,this._setValidators(i),this._setAsyncValidators(r)}ngOnChanges(t){if(this._registered,this._checkForErrors(),!this._registered||`name`in t){if(this._registered&&(this._checkName(),this.formDirective)){let i=t.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}`isDisabled`in t&&this._updateDisabled(t),Lr(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}ɵngControlCreate(t){super.ngControlCreate(t)}ɵngControlUpdate(t){super.ngControlUpdate(t,!1)}get shouldBindRequired(){return!1}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,ti(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:!1})}_setupWithForm(t){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,ti(this.control,this,t))}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){oi.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let i=t.isDisabled.currentValue,r=i!==0&&ZV(i);oi.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?Rr(t,this._parent):[t]}static ɵfac=function(i){return new(i||n)(ao$3(Y$1,9),ao$3(ae,10),ao$3(jt$1,10),ao$3(et,10),ao$3(QV,8),ao$3(nt$1,8),ao$3(ve$1,8),ao$3(Uc,8))};static ɵdir=ew({type:n,selectors:[[``,`ngModel`,``,3,`formControlName`,``,3,`formControl`,``]],inputs:{name:`name`,isDisabled:[0,`disabled`,`isDisabled`],model:[0,`ngModel`,`model`],options:[0,`ngModelOptions`,`options`]},outputs:{update:`ngModelChange`},exportAs:[`ngModel`],standalone:!1,features:[e_([Kr$1,zr]),gm,qE,rw(null)]})}return n})();var Yr$1=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=KC({type:n});static ɵinj=Rd({})}return n})();var Ls=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:nt$1,useValue:t.callSetDisabledState??Ut$1}]}}static ɵfac=function(i){return new(i||n)};static ɵmod=KC({type:n});static ɵinj=Rd({imports:[Yr$1]})}return n})();var Ri=Symbol(`FIELD_TREE`);var $t$1=0;function Xr$1(){return $t$1}function U(n,e){return(...t)=>{try{return $t$1=e,n(...t)}finally{$t$1=0}}}function Zr$1(n){return!n}function Ei$1(n){return n}function R$1(n){return Array.isArray(n)}function rt$1(n){return(typeof n==`object`||typeof n==`function`)&&n!=null}var X=Symbol();var ft$1=Symbol();var Ve=class{predicates;fns=[];constructor(e){this.predicates=e}push(e){this.fns.push(Fi(this.predicates,e))}mergeIn(e){let t=this.predicates?e.fns.map(i=>Fi(this.predicates,i)):e.fns;this.fns.push(...t)}hasRules(){return this.fns.length>0}};var ot$1=class extends Ve{get defaultValue(){return!1}compute(e){return this.fns.some(t=>{let i=t(e);return i&&i!==ft$1})}};var de$1=class n extends Ve{ignore;static ignoreNull(e){return new n(e,t=>t===null)}constructor(e,t){super(e),this.ignore=t}get defaultValue(){return[]}compute(e){return this.fns.reduce((t,i)=>{let r=i(e);return r===void 0||r===ft$1?t:R$1(r)?[...t,...this.ignore?r.filter(o=>!this.ignore(o)):r]:this.ignore&&this.ignore(r)?t:[...t,r]},[])}};var Kt$1=class extends de$1{constructor(e){super(e,void 0)}};var Qt$1=class extends Ve{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(e,t){super(e),this.key=t}compute(e){if(this.fns.length===0)return this.key.reducer.getInitial();let t=this.key.reducer.getInitial();for(let i=0;i<this.fns.length;i++){let r=this.fns[i](e);r!==ft$1&&(t=this.key.reducer.reduce(t,r))}return t}};function Fi(n,e){return n.length===0?e:t=>{for(let i of n){let r=t.stateOf(i.path),o=he$2(r.structure.pathKeys).length-i.depth;for(let s=0;s<o;s++)r=r.structure.parent;if(!i.fn(r.context))return ft$1}return e(t)}}var ce=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(e){this.predicates=e,this.hidden=new ot$1(e),this.disabledReasons=new Kt$1(e),this.readonly=new ot$1(e),this.syncErrors=de$1.ignoreNull(e),this.syncTreeErrors=de$1.ignoreNull(e),this.asyncErrors=de$1.ignoreNull(e)}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(e){return this.metadata.has(e)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(e){return this.metadata.has(e)||this.metadata.set(e,new Qt$1(this.predicates,e)),this.metadata.get(e)}mergeIn(e){this.hidden.mergeIn(e.hidden),this.disabledReasons.mergeIn(e.disabledReasons),this.readonly.mergeIn(e.readonly),this.syncErrors.mergeIn(e.syncErrors),this.syncTreeErrors.mergeIn(e.syncTreeErrors),this.asyncErrors.mergeIn(e.asyncErrors);for(let t of e.getMetadataKeys()){let i=e.metadata.get(t);this.getMetadata(t).mergeIn(i)}}};var st=class{depth;constructor(e){this.depth=e}build(){return new at$1(this,[],0)}};var ue=class n extends st{constructor(e){super(e)}current;all=[];addHiddenRule(e){this.getCurrent().addHiddenRule(e)}addDisabledReasonRule(e){this.getCurrent().addDisabledReasonRule(e)}addReadonlyRule(e){this.getCurrent().addReadonlyRule(e)}addSyncErrorRule(e){this.getCurrent().addSyncErrorRule(e)}addSyncTreeErrorRule(e){this.getCurrent().addSyncTreeErrorRule(e)}addAsyncErrorRule(e){this.getCurrent().addAsyncErrorRule(e)}addMetadataRule(e,t){this.getCurrent().addMetadataRule(e,t)}getChild(e){if(e===X){let t=this.getCurrent().children;t.size>(t.has(X)?1:0)&&(this.current=void 0)}return this.getCurrent().getChild(e)}hasLogic(e){return this===e?!0:this.all.some(({builder:t})=>t.hasLogic(e))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:e})=>e.anyChildHasLogic())}mergeIn(e,t){t?this.all.push({builder:e,predicate:{fn:U(t.fn,this.depth),path:t.path}}):this.all.push({builder:e}),this.current=void 0}getCurrent(){return this.current===void 0&&(this.current=new Re(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new n(0)}};var Re=class extends st{logic=new ce([]);children=new Map;constructor(e){super(e)}addHiddenRule(e){this.logic.hidden.push(U(e,this.depth))}addDisabledReasonRule(e){this.logic.disabledReasons.push(U(e,this.depth))}addReadonlyRule(e){this.logic.readonly.push(U(e,this.depth))}addSyncErrorRule(e){this.logic.syncErrors.push(U(e,this.depth))}addSyncTreeErrorRule(e){this.logic.syncTreeErrors.push(U(e,this.depth))}addAsyncErrorRule(e){this.logic.asyncErrors.push(U(e,this.depth))}addMetadataRule(e,t){this.logic.getMetadata(e).push(U(t,this.depth))}getChild(e){return this.children.has(e)||this.children.set(e,new ue(this.depth+1)),this.children.get(e)}hasLogic(e){return this===e}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let e of this.children.values())if(e.hasRules())return!0;return!1}};var at$1=class n{builder;predicates;depth;logic;constructor(e,t,i){this.builder=e,this.predicates=t,this.depth=i,this.logic=e?Jr$1(e,t,i):new ce([])}getChild(e){let t=this.builder?Ii(this.builder,e):[];if(t.length===0)return new n(void 0,[],this.depth+1);if(t.length===1){let{builder:i,predicates:r}=t[0];return new n(i,[...this.predicates,...r.map(o=>Xt(o,this.depth))],this.depth+1)}else return new Yt$1(t.map(({builder:r,predicates:o})=>new n(r,[...this.predicates,...o.map(s=>Xt(s,this.depth))],this.depth+1)))}hasLogic(e){return this.builder?this.builder.hasLogic(e):!1}hasRules(){return this.builder?this.builder.hasRules():!1}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():!1}};var Yt$1=class n{all;logic;constructor(e){this.all=e,this.logic=new ce([]);for(let t of e)this.logic.mergeIn(t.logic)}getChild(e){return new n(this.all.flatMap(t=>t.getChild(e)))}hasLogic(e){return this.all.some(t=>t.hasLogic(e))}hasRules(){return this.all.some(e=>e.hasRules())}anyChildHasLogic(){return this.all.some(e=>e.anyChildHasLogic())}};function Ii(n,e){if(n instanceof ue)return n.all.flatMap(({builder:t,predicate:i})=>{let r=Ii(t,e);return i?r.map(({builder:o,predicates:s})=>({builder:o,predicates:[...s,i]})):r});if(n instanceof Re)return[...e!==X&&n.children.has(X)?[{builder:n.getChild(X),predicates:[]}]:[],...n.children.has(e)?[{builder:n.getChild(e),predicates:[]}]:[]];throw new T$3(1909,!1)}function Jr$1(n,e,t){let i=new ce(e);if(n instanceof ue){let r=n.all.map(({builder:o,predicate:s})=>new at$1(o,s?[...e,Xt(s,t)]:e,t));for(let o of r)i.mergeIn(o.logic)}else if(n instanceof Re)i.mergeIn(n.logic);else throw new T$3(1909,!1);return i}function Xt(n,e){return s$1(r$2({},n),{depth:e})}var Oi=Symbol(`PATH`);var I=class n{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,eo$1);logicBuilder;constructor(e,t,i,r){this.keys=e,this.parent=i,this.keyInParent=r,this.root=t??this,i||(this.logicBuilder=ue.newRoot())}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(e){return this.children.has(e)||this.children.set(e,new n([...this.keys,e],this.root,this,e)),this.children.get(e)}mergeIn(e,t){let i=e.compile();this.builder.mergeIn(i.builder,t)}static unwrapFieldPath(e){return e[Oi]}static newRoot(){return new n([],void 0,void 0,void 0)}};var eo$1={get(n,e){return e===Oi?n:n.getChild(e).fieldPathProxy}};var it;var Ae=new Map;var lt=class n{schemaFn;constructor(e){this.schemaFn=e}compile(){if(Ae.has(this))return Ae.get(this);let e=I.newRoot();Ae.set(this,e);let t=it;try{it=e,this.schemaFn(e.fieldPathProxy)}finally{it=t}return e}static create(e){return e instanceof n?e:new n(e)}static rootCompile(e){try{return Ae.clear(),e===void 0?I.newRoot():e instanceof n?e.compile():new n(e).compile()}finally{Ae.clear()}}};function to$1(n){return n instanceof lt||typeof n==`function`}function mt(n){if(it!==I.unwrapFieldPath(n).root)throw new T$3(1908,!1)}function Oe(n,e,t){return mt(n),I.unwrapFieldPath(n).builder.addMetadataRule(e,t),e}var fe={list(){return{reduce:(n,e)=>e===void 0?n:[...n,e],getInitial:()=>[]}},min(){return{reduce:(n,e)=>n===void 0||e===void 0?n??e:e<n?e:n,getInitial:()=>{}}},max(){return{reduce:(n,e)=>n===void 0||e===void 0?n??e:e>n?e:n,getInitial:()=>{}}},or(){return{reduce:(n,e)=>n||e,getInitial:()=>!1}},and(){return{reduce:(n,e)=>n&&e,getInitial:()=>!0}},override:no$1};function no$1(n){return{reduce:(e,t)=>t,getInitial:()=>n?.()}}var dn$1=Symbol(`IS_ASYNC_VALIDATION_RESOURCE`);var dt=class{reducer;create;brand;[dn$1];constructor(e,t){this.reducer=e,this.create=t}};function k$1(n){return new dt(n??fe.override())}function cn$1(){return k$1()}var un$1=k$1(fe.or());var Ti=cn$1();var Pi=cn$1();var ki$1=k$1(fe.max());var fn$1=k$1(fe.min());var Li=k$1(fe.list());function E(n,e){if(n===e)return!0;if(!n||!e||n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(!Object.is(n[t],e[t]))return!1;return!0}function io$1(n){return n.errors().length>0?`invalid`:n.pending()?`unknown`:`valid`}var Zt$1=class{node;constructor(e){this.node=e}rawSyncTreeErrors=_t$5(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:E});syncErrors=_t$5(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),...ro$1(this.node.submitState.submissionErrors())],{equal:E});syncValid=_t$5(()=>this.shouldSkipValidation()?!0:this.node.structure.reduceChildren(this.syncErrors().length===0,(e,t)=>t&&e.validationState.syncValid(),Zr$1));syncTreeErrors=_t$5(()=>this.rawSyncTreeErrors().filter(e=>e.fieldTree===this.node.fieldTree),{equal:E});rawAsyncErrors=_t$5(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:E});asyncErrors=_t$5(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(e=>e===`pending`||e.fieldTree===this.node.fieldTree),{equal:E});parseErrors=_t$5(()=>this.node.formFieldBindings().flatMap(e=>e.parseErrors()),{equal:E});errors=_t$5(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(e=>e!==`pending`)],{equal:E});errorSummary=_t$5(()=>{let e=this.node.structure.reduceChildren(this.errors(),(t,i)=>[...i,...t.errorSummary()]);return he$2(()=>e.sort(oo$1)),e},{equal:E});pending=_t$5(()=>this.node.structure.reduceChildren(this.asyncErrors().includes(`pending`),(e,t)=>t||e.validationState.pending()));status=_t$5(()=>{if(this.shouldSkipValidation())return`valid`;let e=io$1(this);return this.node.structure.reduceChildren(e,(t,i)=>i===`invalid`||t.validationState.status()===`invalid`?`invalid`:i===`unknown`||t.validationState.status()===`unknown`?`unknown`:`valid`,t=>t===`invalid`)});valid=_t$5(()=>this.status()===`valid`);invalid=_t$5(()=>this.status()===`invalid`);shouldSkipValidation=_t$5(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function ro$1(n){return n===void 0?[]:R$1(n)?n:[n]}function mn$1(n,e){if(R$1(n))for(let t of n)t.fieldTree??=e;else n&&(n.fieldTree??=e);return n}function Ai$1(n){return n.formField?n.formField.element:n.fieldTree().formFieldBindings().reduce((e,t)=>!e||!t.element?e??t.element:e.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t.element:e,void 0)}function oo$1(n,e){let t=Ai$1(n),i=Ai$1(e);return t===i?0:t===void 0||i===void 0?t===void 0?1:-1:t.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var Jt=k$1();var en$1=class{node;cache=new WeakMap;constructor(e){this.node=e,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this)}resolve(e){if(!this.cache.has(e)){let t=_t$5(()=>{let i=I.unwrapFieldPath(e),r=this.node,o=Xr$1();for(;o>0||!r.structure.logic.hasLogic(i.root.builder);)if(o--,r=r.structure.parent,r===void 0)throw new T$3(1900,!1);for(let s of i.keys)if(r=r.structure.getChild(s),r===void 0)throw new T$3(1901,!1);return r.fieldTree});this.cache.set(e,t)}return this.cache.get(e)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=_t$5(()=>{let e=this.key();if(!R$1(he$2(this.node.structure.parent.value)))throw new T$3(1906,!1);return Number(e)});fieldTreeOf(e){return this.resolve(e)}stateOf(e){return this.resolve(e)()}valueOf=e=>{let t=this.resolve(e)().value();if(t instanceof se)throw new T$3(1907,!1);return t}};var tn$1=class{node;metadata=new Map;constructor(e){this.node=e}runMetadataCreateLifecycle(){if(!this.node.logicNode.logic.hasMetadataKeys())return;let e=Dv();e&&Iu(!1);try{he$2(()=>di$2(this.node.structure.injector,()=>{for(let t of this.node.logicNode.logic.getMetadataKeys())if(t.create){let i=this.node.logicNode.logic.getMetadata(t),r=t.create(this.node,_t$5(()=>i.compute(this.node.context)));this.metadata.set(t,r)}}))}finally{e&&Iu(!0)}}get(e){if(this.has(e)&&!this.metadata.has(e)){if(e.create)throw new T$3(1912,!1);let t=this.node.logicNode.logic.getMetadata(e);this.metadata.set(e,_t$5(()=>t.compute(this.node.context)))}return this.metadata.get(e)}has(e){return this.node.logicNode.logic.hasMetadata(e)}};var so$1={get(n,e,t){if(e===Ri)return!0;let i=n(),r=i.structure.getChild(e);if(r!==void 0)return r.fieldTree;let o=he$2(i.value);if(R$1(o)){if(e===`length`)return i.value().length;if(e===Symbol.iterator)return()=>(i.value(),Array.prototype[Symbol.iterator].apply(i.fieldTree))}if(rt$1(o)&&e===Symbol.iterator)return function*(){for(let s in t)yield[s,t[s]]}},getOwnPropertyDescriptor(n,e){let t=he$2(n().value),i=Reflect.getOwnPropertyDescriptor(t,e);return i&&!i.configurable&&(i.configurable=!0),i},ownKeys(n){let e=he$2(n().value);return typeof e==`object`&&e!==null?Reflect.ownKeys(e):[]}};function ao$1(n,e){let t=_t$5(()=>n()[e()]);return t[V$4]=n[V$4],t.set=i=>{Object.is(he$2(t),i)||n.update(r=>lo$1(r,i,e()))},t.update=i=>{t.set(i(he$2(t)))},t.asReadonly=()=>t,t}function lo$1(n,e,t){if(R$1(n)){let i=[...n];return i[t]=e,i}else return s$1(r$2({},n),{[t]:e})}var le=Symbol(``);var ji=_t$5(()=>!1);var ct=class{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=ve$1.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(e,t,i){this.logic=e,this.node=t,this.createChildNode=i}children(){this.ensureChildrenMap();let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>he$2(t.reader))}materializedChildren(){let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>t.node)}_areChildrenMaterialized(){return he$2(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||he$2(()=>{this.childrenMap.update(e=>this.computeChildrenMap(this.value(),e,!0))})}getChild(e){this.ensureChildrenMap();let t=e.toString(),i=he$2(this.childrenMap)?.byPropertyKey.get(t)?.reader;return i||(i=this.createReader(t)),i()}reduceChildren(e,t,i){let r=this.childrenMap();if(!r)return e;let o=e;for(let s of r.byPropertyKey.values()){if(i?.(o))break;o=t(he$2(s.reader),o)}return o}destroy(){this.injector.destroy()}createKeyOrOrphanSignals(e,t,i){if(e===`root`)return{keyInParent:Bi,isOrphaned:ji};let r=this.parent,o=i,s=_t$5(()=>{if(r.structure.isOrphaned())return le;let f=r.structure.childrenMap();if(!f)return le;let w=f.byPropertyKey.get(o);if(w&&w.node===this.node)return o;if(t===void 0)return le;for(let[pe,O]of f.byPropertyKey)if(O.node===this.node)return o=pe;return le}),l=_t$5(()=>s()===le);return{keyInParent:_t$5(()=>{let f=s();if(f===le)throw t===void 0?new T$3(-1902,!1):new T$3(1904,!1);return f}),isOrphaned:l}}createChildrenMap(){return mu({source:this.value,computation:(e,t)=>this.computeChildrenMap(e,t?.value,!1)})}computeChildrenMap(e,t,i){if(!rt$1(e)||!i&&t===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;t??={byPropertyKey:new Map};let r,o=R$1(e);t!==void 0&&(o?r=uo(t,e,this.identitySymbol):r=fo$1(t,e));for(let s of Object.keys(e)){let l,c=e[s];if(c===void 0){t.byPropertyKey.has(s)&&(r??=r$2({},t),r.byPropertyKey.delete(s));continue}o&&rt$1(c)&&!R$1(c)&&(l=c[this.identitySymbol]??=Symbol(``));let f;l&&(t.byTrackingKey?.has(l)||(r??=r$2({},t),r.byTrackingKey??=new Map,r.byTrackingKey.set(l,this.createChildNode(s,l,o))),f=(r??t).byTrackingKey.get(l));let w=t.byPropertyKey.get(s);w===void 0?(r??=r$2({},t),r.byPropertyKey.set(s,{reader:this.createReader(s),node:f??this.createChildNode(s,l,o)})):f&&f!==w.node&&(r??=r$2({},t),w.node=f)}return r??t}createReader(e){return _t$5(()=>this.childrenMap()?.byPropertyKey.get(e)?.node)}};var nn$1=class extends ct{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return co$1}get keyInParent(){return Bi}isOrphaned=ji;childrenMap;constructor(e,t,i,r,o){super(t,e,o),this.fieldManager=i,this.value=r,this.childrenMap=this.createChildrenMap()}};var rn$1=class extends ct{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(e,t,i,r,o,s){super(t,e,s),this.logic=t,this.parent=i,this.root=this.parent.structure.root;let l=this.createKeyOrOrphanSignals(`child`,r,o);this.isOrphaned=l.isOrphaned,this.keyInParent=l.keyInParent,this.pathKeys=_t$5(()=>[...i.structure.pathKeys(),this.keyInParent()]),this.value=ao$1(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this)}};var co$1=_t$5(()=>[]);var Bi=_t$5(()=>{throw new T$3(1905,!1)});function uo(n,e,t){let i,r=new Set(n.byPropertyKey.keys()),o=n.byTrackingKey&&new Set(n.byTrackingKey.keys());for(let s=0;s<e.length;s++){let l=e[s];r.delete(s.toString()),o&&rt$1(l)&&Object.hasOwn(l,t)&&o.delete(l[t])}if(r.size>0){i??=r$2({},n);for(let s of r)i.byPropertyKey.delete(s)}if(o&&o.size>0){i??=r$2({},n);for(let s of o)i.byTrackingKey.delete(s)}return i}function fo$1(n,e){let t;for(let i of n.byPropertyKey.keys())Object.hasOwn(e,i)||(t??=r$2({},n),t.byPropertyKey.delete(i));return t}var on$1=class{node;selfSubmitting=ze$1(!1);submissionErrors;constructor(e){this.node=e,this.submissionErrors=mu({source:this.node.structure.value,computation:()=>[]})}submitting=_t$5(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??!1))};var Ie$1=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new en$1(this)}fieldProxy=new Proxy(()=>this,so$1);pathNode;constructor(e){this.pathNode=e.pathNode,this.fieldAdapter=e.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,e),this.validationState=this.fieldAdapter.createValidationState(this,e),this.nodeState=this.fieldAdapter.createNodeState(this,e),this.metadataState=new tn$1(this),this.submitState=new on$1(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle()}focusBoundControl(e){this.getBindingForFocus()?.focus(e)}getBindingForFocus(){return this.formFieldBindings().filter(t=>t.focus!==void 0).reduce(Vi,void 0)||this.structure.children().map(t=>t.getBindingForFocus()).reduce(Vi,void 0)}pendingSync=mu({source:()=>this.value(),computation:(e,t)=>{t?.value?.abort()}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let e=this.metadata(Pi)?.();return e?this.metadata(e):void 0}get maxLength(){return this.metadata(fn$1)}get min(){let e=this.metadata(Ti)?.();return e?this.metadata(e):void 0}get minLength(){return this.metadata(ki$1)}get pattern(){return this.metadata(Li)??mo$1}get required(){return this.metadata(un$1)??ho$1}metadata(e){return this.metadataState.get(e)}getError(e){return this.errors().find(t=>t.kind===e)}hasMetadata(e){return this.metadataState.has(e)}markAsTouched(e){this.structure.isOrphaned()||he$2(()=>{this.markAsTouchedInternal(e),this.flushSync()})}markAsTouchedInternal(e){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!e?.skipDescendants))for(let t of this.structure.children())t.markAsTouchedInternal()}markAsDirty(){this.nodeState.markAsDirty()}markAsPristine(){this.nodeState.markAsPristine()}markAsUntouched(){this.nodeState.markAsUntouched()}reset(e){he$2(()=>this._reset(e))}_reset(e){this.pendingSync()?.abort(),e!==void 0&&this.value.set(e),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let t of this.formFieldBindings())t.reset();for(let t of this.structure.materializedChildren())t._reset()}reloadValidation(){he$2(()=>this._reloadValidation())}_reloadValidation(){let e=this.logicNode.logic.getMetadataKeys();for(let t of e)t[dn$1]&&this.metadata(t).reload?.();for(let t of this.structure.children())t._reloadValidation()}controlValueSignal(){let e=mu(this.value);e.rawSet=e.set,e.set=i=>{e.rawSet(i),this.markAsDirty(),this.debounceSync()};let t=e.update;return e.update=i=>{t(i),this.markAsDirty(),this.debounceSync()},e}sync(){this.value.set(this.controlValue())}flushSync(){let e=this.pendingSync();e&&!e.signal.aborted&&(e.abort(),this.sync())}async debounceSync(){let e=he$2(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(e){let t=new AbortController,i=e(t.signal);if(i&&(this.pendingSync.set(t),await i,t.signal.aborted))return}this.structure.isOrphaned()||this.sync()}static newRoot(e,t,i,r){return r.newRoot(e,t,i,r)}createStructure(e){return e.kind===`root`?new nn$1(this,e.logic,e.fieldManager,e.value,this.newChild.bind(this)):new rn$1(this,e.logic,e.parent,e.identityInParent,e.initialKeyInParent,this.newChild.bind(this))}newChild(e,t,i){let r,o;return i?(r=this.pathNode.getChild(X),o=this.structure.logic.getChild(X)):(r=this.pathNode.getChild(e),o=this.structure.logic.getChild(e)),this.fieldAdapter.newChild({kind:`child`,parent:this,pathNode:r,logic:o,initialKeyInParent:e,identityInParent:t,fieldAdapter:this.fieldAdapter})}};var mo$1=_t$5(()=>[]);var ho$1=_t$5(()=>!1);function Vi(n,e){return n?e&&n.element.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e:n:e}var sn$1=class{node;selfTouched=ze$1(!1);selfDirty=ze$1(!1);markAsTouched(){this.selfTouched.set(!0)}markAsDirty(){this.selfDirty.set(!0)}markAsPristine(){this.selfDirty.set(!1)}markAsUntouched(){this.selfTouched.set(!1)}formFieldBindings=ze$1([]);constructor(e){this.node=e}dirty=_t$5(()=>{let e=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,i)=>i||t.nodeState.dirty(),Ei$1)});touched=_t$5(()=>{let e=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,i)=>i||t.nodeState.touched(),Ei$1)});disabledReasons=_t$5(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:E});disabled=_t$5(()=>!!this.disabledReasons().length);readonly=_t$5(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??!1);hidden=_t$5(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??!1);name=_t$5(()=>{let e=this.node.structure.parent;return e?`${e.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=_t$5(()=>{if(this.node.logicNode.logic.hasMetadata(Jt)){let t=this.node.logicNode.logic.getMetadata(Jt).compute(this.node.context);if(t)return i=>t(this.node.context,i)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=_t$5(()=>this.hidden()||this.disabled()||this.readonly())};var an$1=class{newRoot(e,t,i,r){return new Ie$1({kind:`root`,fieldManager:e,value:t,pathNode:i,logic:i.builder.build(),fieldAdapter:r})}newChild(e){return new Ie$1(e)}createNodeState(e){return new sn$1(e)}createValidationState(e){return new Zt$1(e)}createStructure(e,t){return e.createStructure(t)}};var ln$1=class{injector;rootName;submitOptions;constructor(e,t,i){this.injector=e,this.rootName=t??`${this.injector.get(Tt$6)}.form${po$1++}`,this.submitOptions=i}structures=new Set;createFieldManagementEffect(e){ac(()=>{let t=new Set;this.markStructuresLive(e,t);for(let i of this.structures)t.has(i)||(this.structures.delete(i),he$2(()=>i.destroy()))},{injector:this.injector})}markStructuresLive(e,t){t.add(e);for(let i of e.children())this.markStructuresLive(i.structure,t)}};var po$1=0;var zi=new S$2(``);function go(n){let e,t,i;return n.length===3?[e,t,i]=n:n.length===2?to$1(n[1])?[e,t]=n:[e,i]=n:[e]=n,[e,t,i]}function vo$1(...n){let[e,t,i]=go(n),r=i?.injector??y$3(ve$1),o=di$2(r,()=>lt.rootCompile(t)),s=new ln$1(r,i?.name,i?.submission),l=i?.adapter??new an$1,c=Ie$1.newRoot(s,e,o,l);s.createFieldManagementEffect(c.structure);let{experimentalWebMcpTool:f}=i??{};if(f){let w=di$2(r,()=>y$3(zi,{optional:!0}));w&&di$2(r,()=>w(c.fieldTree,{name:f.name,description:f.description}))}return c.fieldTree}async function Gi$1(n,e){let t=he$2(n);if(he$2(t.submitState.submitting))return!1;let i=e===void 0?t.structure.root.fieldProxy:n,r={root:t.structure.root.fieldProxy,submitted:n};e=typeof e==`function`?{action:e}:e??t.structure.fieldManager.submitOptions;let o=e?.action;if(!o)throw new T$3(1915,!1);t.markAsTouched();let s=e?.onInvalid,l=_o(t,e?.ignoreValidators);try{if(l){t.submitState.selfSubmitting.set(!0);let c=await he$2(()=>o?.(i,r));return c&&yo(t,c),!c||R$1(c)&&c.length===0}else he$2(()=>s?.(i,r));return!1}finally{t.submitState.selfSubmitting.set(!1)}}function _o(n,e){switch(e){case`all`:return!0;case`none`:return he$2(n.valid);default:return!he$2(n.invalid)}}function yo(n,e){R$1(e)||(e=[e]);let t=new Map;for(let i of e){let r=mn$1(i,n.fieldTree),o=r.fieldTree(),s=t.get(o);s||(s=[],t.set(o,s)),s.push(r)}for(let[i,r]of t)i.submitState.submissionErrors.set(r)}var ut$1=class{kind=`compat`;control;fieldTree;context;message;constructor({context:e,kind:t,control:i}){this.context=e,this.kind=t,this.control=i}};function Hi(n){if(n.length===0)return null;let e={};for(let t of n)e[t.kind]=t instanceof ut$1?t.context:t;return e}function Ui(n,e){return n===null?[]:Object.entries(n).map(([t,i])=>new ut$1({context:i,kind:t,control:e}))}var bo=new S$2(``);function ga(n,e){mt(n);let t=I.unwrapFieldPath(n),i;typeof e==`function`||typeof e==`string`?i=e:i=e?.when,t.builder.addDisabledReasonRule(r=>{let o=!0;return typeof i==`string`?o=i:i&&(o=i(r)),typeof o==`string`?{fieldTree:r.fieldTree,message:o}:o?{fieldTree:r.fieldTree}:void 0})}function Co$1(n){let e=n;return typeof e.length==`number`?e.length:e.size}function me(n,e){return n instanceof Function?n(e):n}function yn$1(n){return typeof n==`number`?isNaN(n):n===``||n===!1||n==null}function qi(n){return n===void 0?[]:Array.isArray(n)?n:[n]}function bn$1(n,e){mt(n),I.unwrapFieldPath(n).builder.addSyncErrorRule(i=>mn$1(e(i),i.fieldTree))}function xo(n){return new hn$1(n)}function So(n,e){return new pn$1(n,e)}function No(n){return new gn$1(n)}var he=class{__brand=void 0;kind=``;fieldTree;message;constructor(e){e&&Object.assign(this,e)}};var hn$1=class extends he{kind=`required`};var pn$1=class extends he{maxLength;kind=`maxLength`;constructor(e,t){super(t),this.maxLength=e}};var gn$1=class extends he{kind=`email`};var ht$1=class extends he{kind=`parse`};var Mo=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;function va(n,e){bn$1(n,t=>{if(!(e?.when&&!e.when(t))&&!yn$1(t.value())&&!Mo.test(t.value()))return e?.error?me(e.error,t):No({message:me(e?.message,t)})})}function _a(n,e,t){let i=Oe(n,k$1(),r=>{if(!(t?.when&&!t.when(r)))return typeof e==`number`?e:e(r)});Oe(n,fn$1,({state:r})=>r.metadata(i)()),bn$1(n,r=>{if(yn$1(r.value()))return;let o=r.state.metadata(i)();if(o!==void 0&&Co$1(r.value())>o)return t?.error?me(t.error,r):So(o,{message:me(t?.message,r)})})}function ya(n,e){let t=Oe(n,k$1(),i=>e?.when?e.when(i):!0);Oe(n,un$1,({state:i})=>i.metadata(t)()),bn$1(n,i=>{if(i.state.metadata(t)()&&yn$1(i.value()))return e?.error?me(e.error,i):xo({message:me(e?.message,i)})})}function Do$1(n,e,t){let i=mu({source:n,computation:()=>[],equal:E}),r=s=>{let l=t(s);i.set(qi(l.error)),l.value!==void 0&&e(l.value),i.set(qi(l.error))},o=()=>{i.set([])};return{errors:i.asReadonly(),setRawValue:r,reset:o}}var vn=class{field;constructor(e){this.field=e}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return!this.field().disabled()}get errors(){return Hi(this.field().errors())}get pristine(){return!this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return!this.field().touched()}get status(){if(this.field().disabled())return`DISABLED`;if(this.field().valid())return`VALID`;if(this.field().invalid())return`INVALID`;if(this.field().pending())return`PENDING`;throw new T$3(1910,!1)}valueAccessor=null;hasValidator(e){return e===re.required?this.field().required():!1}updateValueAndValidity(){}};var _n$1={disabled:`disabled`,disabledReasons:`disabledReasons`,dirty:`dirty`,errors:`errors`,hidden:`hidden`,invalid:`invalid`,max:`max`,maxLength:`maxLength`,min:`min`,minLength:`minLength`,name:`name`,pattern:`pattern`,pending:`pending`,readonly:`readonly`,required:`required`,touched:`touched`};var wo=(()=>{let n={};for(let e of Object.keys(_n$1))n[_n$1[e]]=e;return n})();function Cn$1(n,e){return n[wo[e]]?.()}var xn=Object.values(_n$1);function pt(){return{}}function q(n,e,t){return n[e]!==t?(n[e]=t,!0):!1}function Eo$1(n,e,t){let i;if(Qi$1(n)&&t.isBadInput(n))return{error:new ht$1};switch(n.type){case`checkbox`:return{value:n.checked};case`number`:case`range`:case`datetime-local`:if(i=he$2(e),typeof i==`number`||i===null)return{value:n.value===``?null:n.valueAsNumber};break;case`date`:case`month`:case`time`:case`week`:if(i=he$2(e),i===null||i instanceof Date)return{value:n.valueAsDate};if(typeof i==`number`)return{value:n.valueAsNumber};break}if(n.tagName===`INPUT`&&n.type===`text`&&(i??=he$2(e),typeof i==`number`||i===null)){if(n.value===``)return{value:null};let r=Number(n.value);return Number.isNaN(r)?{error:new ht$1}:{value:r}}return{value:n.value}}function Wi$1(n,e){switch(n.type){case`checkbox`:n.checked=e;return;case`radio`:n.checked=e===n.value;return;case`number`:case`range`:case`datetime-local`:if(typeof e==`number`){$i$1(n,e);return}else if(e===null){n.value=``;return}break;case`date`:case`month`:case`time`:case`week`:if(e===null||e instanceof Date){n.valueAsDate=e;return}else if(typeof e==`number`){$i$1(n,e);return}}if(n.tagName===`INPUT`&&n.type===`text`){if(typeof e==`number`){n.value=isNaN(e)?``:String(e);return}if(e===null){n.value=``;return}}n.value=e}function $i$1(n,e){isNaN(e)?n.value=``:n.valueAsNumber=e}function Qi$1(n){return n.tagName===`INPUT`}function Fo$1(n){return n.type===`date`||n.type===`datetime-local`||n.type===`month`||n.type===`time`||n.type===`week`}function Ao$1(n,e){let t=n.getUTCFullYear(),i=String(n.getUTCMonth()+1).padStart(2,`0`);if(e===`month`)return`${t}-${i}`;return`${t}-${i}-${String(n.getUTCDate()).padStart(2,`0`)}`}function Yi$1(n,e,t){return e instanceof Date&&(n===`min`||n===`max`)&&(t===`date`||t===`month`)?Ao$1(e,t):e}function Vo$1(n,e){n.listenToCustomControlModel(i=>e.state().controlValue.set(i)),n.listenToCustomControlOutput(`touch`,()=>e.state().markAsTouched()),e.registerAsBinding(n.customControl);let t=pt();return()=>{let i=e.state(),r=i.controlValue();q(t,`controlValue`,r)&&n.setCustomControlModelInput(r);for(let o of xn){let s;if(o===`errors`?s=e.errors():s=Cn$1(i,o),q(t,o,s)&&(n.setInputOnDirectives(o,s),e.elementAcceptsNativeProperty(o)&&!n.customControlHasInput(o))){let l=Yi$1(o,s,e.nativeFormElement.type);Fe(e.renderer,e.nativeFormElement,o,l)}}}}function Ro$1(n){return typeof n==`object`&&n!==null}function Io$1(n,e){let t=pt();e.controlValueAccessor.registerOnChange(r=>{t.controlValue=r,e.state().controlValue.set(r)}),e.controlValueAccessor.registerOnTouched(()=>e.state().markAsTouched());let i=e.injector.get(ae,null,{optional:!0,self:!0});if(i){let r;for(let c of i)Ro$1(c)&&c.registerOnValidatorChange&&(r??=ze$1(0),c.registerOnValidatorChange(()=>{r.update(f=>f+1)}));let o=i.map(c=>typeof c==`function`?c:c.validate.bind(c)),s=re.compose(o),l=_t$5(()=>{r?.();return Ui(s?s(e.interopNgControl.control):null,e.interopNgControl.control)});e.parseErrorsSource.set(l)}return e.registerAsBinding({reset:()=>{let r=e.state().value();t.controlValue=r,he$2(()=>e.controlValueAccessor.writeValue(r))}}),()=>{let r=e.state(),o=r.controlValue();q(t,`controlValue`,o)&&he$2(()=>e.controlValueAccessor.writeValue(o));for(let s of xn){let l=Cn$1(r,s);if(q(t,s,l)){let c=n.setInputOnDirectives(s,l);s===`disabled`&&e.controlValueAccessor.setDisabledState?he$2(()=>e.controlValueAccessor.setDisabledState(l)):!c&&e.elementAcceptsNativeProperty(s)&&Fe(e.renderer,e.nativeFormElement,s,l)}}}}function Oo(n,e,t){if(typeof MutationObserver!=`function`)return;let i=new MutationObserver(r=>{r.some(o=>To(o))&&e()});i.observe(n,{attributes:!0,attributeFilter:[`value`],characterData:!0,childList:!0,subtree:!0}),t.onDestroy(()=>i.disconnect())}function To(n){if(n.type===`childList`||n.type===`characterData`){if(n.target instanceof Comment)return!1;for(let e of n.addedNodes)if(!(e instanceof Comment))return!0;for(let e of n.removedNodes)if(!(e instanceof Comment))return!0;return!1}return n.type===`attributes`&&n.target instanceof HTMLOptionElement}function Po(n,e,t,i){let r=!1,o=e.nativeFormElement,s=Do$1(()=>e.state().value(),c=>e.state().controlValue.set(c),c=>Eo$1(o,e.state().value,i));t.set(s.errors),e.onReset=()=>{s.reset();let c=e.state().value();l.controlValue=c,Wi$1(o,c)},n.listenToDom(`input`,()=>s.setRawValue(void 0)),n.listenToDom(`blur`,()=>e.state().markAsTouched()),Qi$1(o)&&Fo$1(o)&&i.watchValidity(e.destroyRef,o,()=>s.setRawValue(void 0)),e.registerAsBinding(),o.tagName===`SELECT`&&Oo(o,()=>{r&&(o.value=e.state().controlValue())},e.destroyRef);let l=pt();return()=>{let c=e.state();for(let O of xn){let ge=Cn$1(c,O);if(q(l,O,ge)&&(n.setInputOnDirectives(O,ge),e.elementAcceptsNativeProperty(O))){let vt=Yi$1(O,ge,o.type);Fe(e.renderer,o,O,vt)}}let f=c.controlValue(),w=q(l,`controlValue`,f),pe=o.type===`radio`&&q(l,`radioValue`,o.value);(w||pe)&&Wi$1(o,f),r=!0}}var Xi$1=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵprov=de$3({token:n,factory:t=>ko.ɵfac(t),providedIn:`root`})}return n})();var ko=(()=>{class n extends Xi$1{document=y$3(tn$3);cspNonce=y$3(xE,{optional:!0});injectedStyles=new WeakMap;watchValidity(t,i,r){let o=i.getRootNode();this.injectedStyles.has(o)||this.injectedStyles.set(o,this.createTransitionStyle(o));let s=l=>{let c=l;(c.animationName===`ng-valid`||c.animationName===`ng-invalid`)&&r()};i.addEventListener(`animationstart`,s),t.onDestroy(()=>{i.removeEventListener(`animationstart`,s)})}isBadInput(t){return t.validity?.badInput??!1}createTransitionStyle(t){let i=this.document.createElement(`style`);return this.cspNonce&&(i.nonce=this.cspNonce),i.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,t.nodeType===9?t.head?.appendChild(i):t.appendChild(i),i}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove()}static ɵfac=(()=>{let t;return function(r){return(t||(t=uI(n)))(r||n)}})();static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var Lo$1=Symbol();var Ki$1=new S$2(``);var ba=(()=>{class n{field=BV.required({alias:`formField`});state=_t$5(()=>this.field()());renderer=y$3(Uc);destroyRef=y$3(Te$1);injector=y$3(ve$1);element=y$3(Jr$2).nativeElement;elementIsNativeFormElement=Gt$1(this.element);elementAcceptsTextualValues=xi$1(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=t=>this.element.focus(t);controlValueAccessors=y$3(et,{optional:!0,self:!0});config=y$3(bo,{optional:!0});validityMonitor=y$3(Xi$1);parseErrorsSource=ze$1(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new vn(this.state)}parseErrors=_t$5(()=>this.parseErrorsSource()?.().map(t=>s$1(r$2({},t),{fieldTree:he$2(this.state).fieldTree,formField:this}))??[],{equal:E});errors=_t$5(()=>this.state().errors().filter(t=>!t.formField||t.formField===this),{equal:E});isFieldBinding=!1;resetter=()=>{};parseErrorsResetCallback;setParseErrors(t){this.parseErrorsSource.set(t)}set onReset(t){this.parseErrorsResetCallback=t}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return!this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:Wt$1(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let t=Object.entries(this.config?.classes??{}).map(([r,o])=>[r,_t$5(()=>o(this))]);if(t.length===0)return;let i=pt();JV({write:()=>{for(let[r,o]of t){let s=o();q(i,r,s)&&(s?this.renderer.addClass(this.element,r):this.renderer.removeClass(this.element,r))}}},{injector:this.injector})}focus(t){this.focuser(t)}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value())}registerAsBinding(t){if(this.isFieldBinding)throw new T$3(1913,!1);this.isFieldBinding=!0,this.installClassBindingEffect(),t?.focus&&(this.focuser=i=>t.focus(i)),t?.reset&&(this.resetter=()=>t.reset()),ac(i=>{let r=this.state();r.nodeState.formFieldBindings.update(o=>[...o,this]),i(()=>{r.nodeState.formFieldBindings.update(o=>o.filter(s=>s!==this))})},{injector:this.injector})}[Lo$1];ɵngControlCreate(t){if(!t.hasPassThrough)if(this.controlValueAccessor)this.ɵngControlUpdate=Io$1(t,this);else if(t.customControl)this.ɵngControlUpdate=Vo$1(t,this);else if(this.elementIsNativeFormElement)this.ɵngControlUpdate=Po(t,this,this.parseErrorsSource,this.validityMonitor);else throw new T$3(1914,!1)}ɵngControlUpdate;elementAcceptsNativeProperty(t){if(!this.elementIsNativeFormElement)return!1;switch(t){case`min`:case`max`:return this._elementAcceptsMinMax??=Ci$1(this.element);case`minLength`:case`maxLength`:return this.elementAcceptsTextualValues;case`disabled`:case`required`:case`readonly`:case`name`:return!0;default:return!1}}static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[``,`formField`,``]],inputs:{field:[1,`formField`,`field`]},exportAs:[`formField`],features:[e_([{provide:Ki$1,useExisting:n},{provide:H,useFactory:()=>y$3(n).interopNgControl},{provide:Ht$1,useFactory:()=>y$3(Ki$1,{self:!0})}]),rw(`formField`)]})}return n})();var Ca=(()=>{class n{fieldTree=BV.required({alias:`formRoot`});onSubmit(t){t.preventDefault(),he$2(()=>{let i=this.fieldTree();i().structure.fieldManager.submitOptions&&Gi$1(i)})}static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[`form`,`formRoot`,``]],hostAttrs:[`novalidate`,``],hostBindings:function(i,r){i&1&&jm(`submit`,function(s){return r.onSubmit(s)})},inputs:{fieldTree:[1,`formRoot`,`fieldTree`]}})}return n})();var Sn$1=class{_box;_destroyed=new ne$2;_resizeSubject=new ne$2;_resizeObserver;_elementObservables=new Map;constructor(e){this._box=e,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(e){return this._elementObservables.has(e)||this._elementObservables.set(e,new x$2(t=>{let i=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(e,{box:this._box}),()=>{this._resizeObserver?.unobserve(e),i.unsubscribe(),this._elementObservables.delete(e)}}).pipe(bn$3(t=>t.some(i=>i.target===e)),fd({bufferSize:1,refCount:!0}),By(this._destroyed))),this._elementObservables.get(e)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var Zi$1=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=y$3(Ce$1);constructor(){}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,i){let r=i?.box||`content-box`;return this._observers.has(r)||this._observers.set(r,new Sn$1(r)),this._observers.get(r).observe(t)}static ɵfac=function(i){return new(i||n)};static ɵprov=Kr$2({token:n,factory:n.ɵfac})}return n})();var jo=[`notch`];var Bo$1=[`*`];var Ji$1=[`iconPrefixContainer`];var er=[`textPrefixContainer`];var tr=[`iconSuffixContainer`];var nr=[`textSuffixContainer`];var zo$1=[`textField`];var Go$1=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]];var Ho=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function Uo(n,e){n&1&&xm(0,`span`,21)}function qo(n,e){if(n&1&&(as$2(0,`label`,20),gb(1,1),zw(2,Uo,1,0,`span`,21),ou()),n&2){let t=fb(2);Nm(`floating`,t._shouldLabelFloat())(`monitorResize`,t._hasOutline())(`id`,t._labelId),Sm(`for`,t._control.disableAutomaticLabeling?null:t._control.id),cT(2),Qw(!t.hideRequiredMarker&&t._control.required?2:-1)}}function Wo$1(n,e){if(n&1&&zw(0,qo,3,5,`label`,20),n&2)Qw(fb()._hasFloatingLabel()?0:-1)}function $o$1(n,e){n&1&&xm(0,`div`,7)}function Ko$1(n,e){}function Qo(n,e){if(n&1&&vm(0,Ko$1,0,0,`ng-template`,13),n&2){fb(2);Nm(`ngTemplateOutlet`,Ib(1))}}function Yo$1(n,e){if(n&1&&(as$2(0,`div`,9),zw(1,Qo,1,1,null,13),ou()),n&2){let t=fb();Nm(`matFormFieldNotchedOutlineOpen`,t._shouldLabelFloat()),cT(),Qw(t._forceDisplayInfixLabel()?-1:1)}}function Xo$1(n,e){n&1&&(as$2(0,`div`,10,2),gb(2,2),ou())}function Zo$1(n,e){n&1&&(as$2(0,`div`,11,3),gb(2,3),ou())}function Jo$1(n,e){}function es$1(n,e){if(n&1&&vm(0,Jo$1,0,0,`ng-template`,13),n&2){fb();Nm(`ngTemplateOutlet`,Ib(1))}}function ts$1(n,e){n&1&&(as$2(0,`div`,14,4),gb(2,4),ou())}function ns$1(n,e){n&1&&(as$2(0,`div`,15,5),gb(2,5),ou())}function is$1(n,e){n&1&&xm(0,`div`,16)}function rs$1(n,e){n&1&&(as$2(0,`div`,18),gb(1,6),ou())}function os$1(n,e){if(n&1&&(as$2(0,`mat-hint`,22),Ub(1),ou()),n&2){let t=fb(2);Nm(`id`,t._hintLabelId),cT(),nv(t.hintLabel)}}function ss$1(n,e){if(n&1&&(as$2(0,`div`,19),zw(1,os$1,2,2,`mat-hint`,22),gb(2,7),xm(3,`div`,23),gb(4,8),ou()),n&2){let t=fb();cT(),Qw(t.hintLabel?1:-1)}}var Nn=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[`mat-label`]]})}return n})();var dr=new S$2(`MatError`);var as$1=(()=>{class n{id=y$3(Rt$3).getId(`mat-mdc-error-`);static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[`mat-error`],[``,`matError`,``]],hostAttrs:[1,`mat-mdc-form-field-error`,`mat-mdc-form-field-bottom-align`],hostVars:1,hostBindings:function(i,r){i&2&&Pm(`id`,r.id)},inputs:{id:`id`},features:[e_([{provide:dr,useExisting:n}])]})}return n})();var Mn=(()=>{class n{align=`start`;id=y$3(Rt$3).getId(`mat-mdc-hint-`);static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(i,r){i&2&&(Pm(`id`,r.id),Sm(`align`,null),Qm(`mat-mdc-form-field-hint-end`,r.align===`end`))},inputs:{align:`align`,id:`id`}})}return n})();var ls$1=new S$2(`MatPrefix`);var ds$1=new S$2(`MatSuffix`);var cr=new S$2(`FloatingLabelParent`);var ir=(()=>{class n{_elementRef=y$3(Jr$2);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=y$3(Zi$1);_ngZone=y$3(Ce$1);_parent=y$3(cr);_resizeSubscription=new J$4;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return cs$1(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(i,r){i&2&&Qm(`mdc-floating-label--float-above`,r.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return n})();function cs$1(n){let e=n;if(e.offsetParent!==null)return e.scrollWidth;let t=e.cloneNode(!0);t.style.setProperty(`position`,`absolute`),t.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(t);let i=t.scrollWidth;return t.remove(),i}var rr=`mdc-line-ripple--active`;var gt$1=`mdc-line-ripple--deactivating`;var or=(()=>{class n{_elementRef=y$3(Jr$2);_cleanupTransitionEnd;constructor(){let t=y$3(Ce$1),i=y$3(Uc);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let t=this._elementRef.nativeElement.classList;t.remove(gt$1),t.add(rr)}deactivate(){this._elementRef.nativeElement.classList.add(gt$1)}_handleTransitionEnd=t=>{let i=this._elementRef.nativeElement.classList,r=i.contains(gt$1);t.propertyName===`opacity`&&r&&i.remove(rr,gt$1)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return n})();var sr=(()=>{class n{_elementRef=y$3(Jr$2);_ngZone=y$3(Ce$1);open=!1;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,i=t.querySelector(`.mdc-floating-label`);i?(t.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(i.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration=``)}))):t.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(t){let i=this._notch.nativeElement;!this.open||!t?i.style.width=``:i.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(t){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${t}px)`)}static ɵfac=function(i){return new(i||n)};static ɵcmp=YC({type:n,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(i,r){if(i&1&&Um(jo,5),i&2){let o;vb(o=yb())&&(r._notch=o.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(i,r){i&2&&Qm(`mdc-notched-outline--notched`,r.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:Bo$1,decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(i,r){i&1&&(hb(),Am(0,`div`,1),iu(1,`div`,2,0),gb(3),su(),Am(4,`div`,3))},encapsulation:2})}return n})();var us$1=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static ɵfac=function(i){return new(i||n)};static ɵdir=ew({type:n})}return n})();var fs$1=new S$2(`MatFormField`);var ms$1=new S$2(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var ar=`fill`;var hs$1=`auto`;var lr=`fixed`;var ps$1=`translateY(-50%)`;var gs$1=(()=>{class n{_elementRef=y$3(Jr$2);_changeDetectorRef=y$3(QV);_platform=y$3(p$1);_idGenerator=y$3(Rt$3);_ngZone=y$3(Ce$1);_defaults=y$3(ms$1,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=$V(`iconPrefixContainer`);_textPrefixContainerSignal=$V(`textPrefixContainer`);_iconSuffixContainerSignal=$V(`iconSuffixContainer`);_textSuffixContainerSignal=$V(`textSuffixContainer`);_prefixSuffixContainers=_t$5(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=GV(Nn);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=vi$3(t)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||hs$1}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let i=t||this._defaults?.appearance||ar;this._appearanceSignal.set(i)}_appearanceSignal=ze$1(ar);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||lr}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||lr}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t}_destroyed=new ne$2;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=z$4();constructor(){let t=this._defaults,i=y$3(zn$1);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),ac(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=_t$5(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(t){let i=this._control,r=`mat-mdc-form-field-type-`;t&&this._elementRef.nativeElement.classList.remove(r+t.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(hd([void 0,void 0]),Ve$3(()=>[i.errorState,i.userAriaDescribedBy]),Vy(),bn$3(([[o,s],[l,c]])=>o!==l||s!==c)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(By(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Oy(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let t=this._control.focused;t&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,t),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,t)}_syncOutlineLabelOffset(){JV({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=_t$5(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(t){let i=this._control?this._control.ngControl:null;return i&&i[t]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&t.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let o=this._hintChildren?this._hintChildren.find(l=>l.align===`start`):null,s=this._hintChildren?this._hintChildren.find(l=>l.align===`end`):null;o?t.push(o.id):this._hintLabel&&t.push(this._hintLabelId),s&&t.push(s.id)}else this._errorChildren&&t.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||t;r=t.concat(i.filter(s=>s&&!o.includes(s)))}else r=t;this._control.setDescribedByIds(r),this._describedByIds=t}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=t?.getBoundingClientRect().width??0,l=i?.getBoundingClientRect().width??0,c=r?.getBoundingClientRect().width??0,f=o?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${ps$1} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${s+l}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,s+l+c+f]}_writeOutlinedLabelStyles(t){if(t!==null){let[i,r]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let i=t.getRootNode();return i&&i!==t}return document.documentElement.contains(t)}static ɵfac=function(i){return new(i||n)};static ɵcmp=YC({type:n,selectors:[[`mat-form-field`]],contentQueries:function(i,r,o){if(i&1&&($m(o,r._labelChild,Nn,5),Bm(o,us$1,5)(o,ls$1,5)(o,ds$1,5)(o,dr,5)(o,Mn,5)),i&2){Eb();let s;vb(s=yb())&&(r._formFieldControl=s.first),vb(s=yb())&&(r._prefixChildren=s),vb(s=yb())&&(r._suffixChildren=s),vb(s=yb())&&(r._errorChildren=s),vb(s=yb())&&(r._hintChildren=s)}},viewQuery:function(i,r){if(i&1&&(Gm(r._iconPrefixContainerSignal,Ji$1,5)(r._textPrefixContainerSignal,er,5)(r._iconSuffixContainerSignal,tr,5)(r._textSuffixContainerSignal,nr,5),Um(zo$1,5)(Ji$1,5)(er,5)(tr,5)(nr,5)(ir,5)(sr,5)(or,5)),i&2){Eb(4);let o;vb(o=yb())&&(r._textField=o.first),vb(o=yb())&&(r._iconPrefixContainer=o.first),vb(o=yb())&&(r._textPrefixContainer=o.first),vb(o=yb())&&(r._iconSuffixContainer=o.first),vb(o=yb())&&(r._textSuffixContainer=o.first),vb(o=yb())&&(r._floatingLabel=o.first),vb(o=yb())&&(r._notchedOutline=o.first),vb(o=yb())&&(r._lineRipple=o.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(i,r){i&2&&Qm(`mat-mdc-form-field-label-always-float`,r._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,r._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,r._hasIconSuffix)(`mat-form-field-invalid`,r._control.errorState)(`mat-form-field-disabled`,r._control.disabled)(`mat-form-field-autofilled`,r._control.autofilled)(`mat-form-field-appearance-fill`,r.appearance==`fill`)(`mat-form-field-appearance-outline`,r.appearance==`outline`)(`mat-form-field-hide-placeholder`,r._hasFloatingLabel()&&!r._shouldLabelFloat())(`mat-primary`,r.color!==`accent`&&r.color!==`warn`)(`mat-accent`,r.color===`accent`)(`mat-warn`,r.color===`warn`)(`ng-untouched`,r._shouldForward(`untouched`))(`ng-touched`,r._shouldForward(`touched`))(`ng-pristine`,r._shouldForward(`pristine`))(`ng-dirty`,r._shouldForward(`dirty`))(`ng-valid`,r._shouldForward(`valid`))(`ng-invalid`,r._shouldForward(`invalid`))(`ng-pending`,r._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[e_([{provide:fs$1,useExisting:n},{provide:cr,useExisting:n}])],ngContentSelectors:Ho,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(i,r){if(i&1&&(hb(Go$1),vm(0,Wo$1,1,1,`ng-template`,null,0,f_),as$2(2,`div`,6,1),jm(`click`,function(s){return r._control.onContainerClick(s)}),zw(4,$o$1,1,0,`div`,7),as$2(5,`div`,8),zw(6,Yo$1,2,2,`div`,9),zw(7,Xo$1,3,0,`div`,10),zw(8,Zo$1,3,0,`div`,11),as$2(9,`div`,12),zw(10,es$1,1,1,null,13),gb(11),ou(),zw(12,ts$1,3,0,`div`,14),zw(13,ns$1,3,0,`div`,15),ou(),zw(14,is$1,1,0,`div`,16),ou(),as$2(15,`div`,17),zw(16,rs$1,2,0,`div`,18)(17,ss$1,5,1,`div`,19),ou()),i&2){let o;cT(2),Qm(`mdc-text-field--filled`,!r._hasOutline())(`mdc-text-field--outlined`,r._hasOutline())(`mdc-text-field--no-label`,!r._hasFloatingLabel())(`mdc-text-field--disabled`,r._control.disabled)(`mdc-text-field--invalid`,r._control.errorState),cT(2),Qw(!r._hasOutline()&&!r._control.disabled?4:-1),cT(2),Qw(r._hasOutline()?6:-1),cT(),Qw(r._hasIconPrefix?7:-1),cT(),Qw(r._hasTextPrefix?8:-1),cT(2),Qw(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),cT(2),Qw(r._hasTextSuffix?12:-1),cT(),Qw(r._hasIconSuffix?13:-1),cT(),Qw(r._hasOutline()?-1:14),cT(),Qm(`mat-mdc-form-field-subscript-dynamic-size`,r.subscriptSizing===`dynamic`);let s=r._getSubscriptMessageType();cT(),Qw((o=s)===`error`?16:o===`hint`?17:-1)}},dependencies:[ir,sr,qt$4,or,Mn],styles:[`.mdc-text-field {
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
`],encapsulation:2})}return n})();var Ja=(()=>{class n{isErrorState(t,i){return!!(t&&t.invalid&&(t.touched||i&&i.submitted))}isSignalErrorState(t){if(!t)return!1;let i=t().invalid(),r=t().touched();return i&&r}static ɵfac=function(i){return new(i||n)};static ɵprov=Kr$2({token:n,factory:n.ɵfac})}return n})();var ur=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(e,t,i,r,o){this._defaultMatcher=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o,t?Ar$2(t.field)&&!t.updateValueAndValidity?(this.formField=t,this.ngControl=null):(this.formField=null,this.ngControl=t):this.ngControl=this.formField=null}updateErrorState(){let e=this.errorState,t=this._getCurrentErrorState(this.matcher||this._defaultMatcher);t!==e&&(this.errorState=t,this._stateChanges.next())}_getCurrentErrorState(e){if(this.formField&&e?.isSignalErrorState)return e.isSignalErrorState(this.formField.field())??!1;let t=this._parentFormGroup||this._parentForm,i=this.ngControl?this.ngControl.control:null;return e?.isErrorState(i,t)??!1}};var c$1=(()=>{class t{constructor(){this.visible=ze$1(!1)}static{this.ɵfac=function(o){return new(o||t)}}static{this.ɵprov=de$3({token:t,factory:t.ɵfac,providedIn:`root`})}}return t})();var c=(function(r){return r.ASC=`asc`,r.DESC=`desc`,r})(c||{});var n$1=new S$2(`ARTWORK_PORT`);var n=(function(e){return e.SPANISH=`es-ES`,e.ENGLISH=`en-EN`,e})(n||{});var h=[`studio`,`door`];function p(e){let f=e.split(`?`)[0].split(`#`)[0].replace(/^\/+/,``).split(`/`)[0];return h.includes(f)}var d=`juanmamoreno.language`;function S(e){try{window.localStorage.setItem(d,e)}catch{}}function L(){try{let e=window.localStorage.getItem(d);return Object.values(n).includes(e)?e:null}catch{return null}}function N(){if(typeof window>`u`)return n.ENGLISH;let e=window.navigator.language||window.navigator.languages?.[0]||n.ENGLISH;return Object.values(n).includes(e)?e:n.ENGLISH}var G=(()=>{class e{constructor(){this.router=y$3(ee),this.url=P$3(this.router.events.pipe(bn$3(t=>t instanceof j$2),Ve$3(()=>this.router.url)),{initialValue:this.router.url}),this.carriesLanguage=_t$5(()=>!p(this.url())),this.inSpanish=_t$5(()=>{let t=this.url().split(`?`)[0].split(`#`)[0];return t===`/es`||t.startsWith(`/es/`)}),this.contentLanguage=_t$5(()=>this.inSpanish()?`es`:`en`)}link(t=``){let o=t.replace(/^\/+|\/+$/g,``);return`${this.inSpanish()?`/es`:``}/${o}`.replace(/\/+$/,``)||`/`}static{this.ɵfac=function(o){return new(o||e)}}static{this.ɵprov=de$3({token:e,factory:e.ɵfac,providedIn:`root`})}}return e})();var ht={type:null,entityIds:null,skip:!1,payload:null};var Qi=!1;function Wi(){Qi=!1}function de(n,i,e){Y(n,i,e),Qi=!0}function Y(n,i,e){Qi===!1&&(ht.type=n,ht.entityIds=i,ht.payload=e)}function Gi(n=!0){ht.skip=n}function $i(n,i){return function(e,t,a){let r=a.value;return a.value=function(...o){return de(n,i),r.apply(this,o)},a}}function Me(n,i){return n.hasOwnProperty(i)}function _e(n){return Array.isArray(n)}function Vt(n){return n.hasOwnProperty(`active`)}function hi(n){return _e(n)}function jt({active:n,ids:i,entities:e}){return hi(n)?yr(n,i):Me(e,n)===!1?null:n}function yr(n,i){let e=n.filter(t=>i.indexOf(t)>-1);return e.length===n.length?n:e}function Ki({state:n,entities:i,idKey:e,options:t={},preAddEntity:a}){let r={},o=[],l=!1;for(let p of i)if(Me(n.entities,p[e])===!1){let f=a(p),H=f[e];r[H]=f,t.prepend?o.unshift(H):o.push(H),l=!0}return l?{newState:s$1(r$2({},n),{entities:r$2(r$2({},n.entities),r),ids:t.prepend?[...o,...n.ids]:[...n.ids,...o]}),newIds:o}:null}function Z(n){return n==null}function Q(n){return Z(n)?[]:Array.isArray(n)?n:[n]}function Te(n){return _e(n)?n.length===0:!1}function k(n){return typeof n==`function`}function Ie(n){let i=typeof n;return n!=null&&(i==`object`||i==`function`)}var vr={resettable:!1,ttl:null,producerFn:void 0};function Mt(){return vr}function xr(){return vr.producerFn}function nt(n){return Z(n)===!1}var qt=new ne$2;var ut=new or$2(50,5e3);var Yi=new ne$2;function wr(n){qt.next(n)}function kr(n){ut.next(n)}function Sr(n,i){Yi.next({storeName:n,action:i})}var ft=typeof window<`u`;var Ut=!ft;var Zi=()=>{try{return typeof localStorage<`u`}catch{return!1}};var Cr=()=>{try{return typeof sessionStorage<`u`}catch{return!1}};var F={};var Ji={};ft&&(window.$$stores=F,window.$$queries=Ji);function Xi(n){return n&&n.charAt(0).toUpperCase()+n.slice(1)}var Tt=[];function en(n,i={}){if(Ut||!window.__REDUX_DEVTOOLS_EXTENSION__)return;Tt.length&&Tt.forEach(f=>{f.unsubscribe?f.unsubscribe():f&&f()}),n&&n.run||(n=n||{},n.run=f=>f(),i=n);let a=Object.assign({},{name:`Akita`,shallow:!0,storesWhitelist:[]},i),r=a.storesWhitelist,o=window.__REDUX_DEVTOOLS_EXTENSION__.connect(a),l={},p=f=>r.length?r.indexOf(f)>-1:!0;Tt.push(ut.subscribe(f=>{p(f)!==!1&&(l=s$1(r$2({},l),{[f]:F[f]._value()}),o.send({type:`[${Xi(f)}] - @@INIT`},l))})),Tt.push(qt.subscribe(f=>{p(f)!==!1&&(delete l[f],o.send({type:`[${f}] - Delete Store`},l))})),Tt.push(Yi.subscribe(({storeName:f,action:H})=>{if(p(f)===!1)return;let Lt=H,{type:D,entityIds:N,skip:C}=Lt,te=u$3(Lt,[`type`,`entityIds`,`skip`]).payload;if(C){Gi(!1);return}let me=F[f];if(!me||i.shallow===!1&&l[f]&&JSON.stringify(me._value())===JSON.stringify(l[f]))return;l=s$1(r$2({},l),{[f]:me._value()});let ye=Xi(f),ie=nt(N)?`[${ye}] - ${D} (ids: ${N})`:`[${ye}] - ${D}`;if(i.logTrace&&(console.group(ie),console.trace(),console.groupEnd()),i.sortAlphabetically){let xt=Object.keys(l).sort().reduce((wt,Ft)=>(wt[Ft]=l[Ft],wt),{});o.send(r$2({type:ie},te),xt);return}o.send(r$2({type:ie},te),l)})),Tt.push(o.subscribe(f=>{if(f.type===`DISPATCH`){if(f.payload.type===`COMMIT`){o.init(l);return}if(f.state){let D=JSON.parse(f.state);for(let N=0,C=Object.keys(D);N<C.length;N++){let B=C[N];F[B]&&n.run(()=>{F[B]._setState(()=>D[B],!1)})}}}}))}var at=(function(n){return n.Set=`Set`,n.Add=`Add`,n.Update=`Update`,n.Remove=`Remove`,n})(at||{});var Ht=!0;function tn(){Ht=!1,ft&&(delete window.$$stores,delete window.$$queries)}function R(){return Ht}function nn(n,i,e){let t;if(_e(n))t=n;else if(Ie(n)){if(Z(e))return;n=Object.assign({wrap:!0},n);let a=i.indexOf(e);if(n.prev){let r=a===0;if(r&&!n.wrap)return;t=r?i[i.length-1]:i[a-1]}else if(n.next){let r=i.length===a+1;if(r&&!n.wrap)return;t=r?i[0]:i[a+1]}}else{if(n===e)return;t=n}return t}var an=()=>({entities:{},ids:[],loading:!0,error:null});function Se(n){return n===void 0}function rn({state:n,ids:i}){if(Z(i))return Ar(n);let e=n.entities,t={};for(let r of n.ids)i.includes(r)===!1&&(t[r]=e[r]);let a=s$1(r$2({},n),{entities:t,ids:n.ids.filter(r=>i.includes(r)===!1)});return Vt(n)&&(a.active=jt(a)),a}function Ar(n){return s$1(r$2({},n),{entities:{},ids:[],active:hi(n.active)?[]:null})}function on(n,i,e){let t={entities:{},ids:[]};for(let a of n){let r=e(a);t.entities[r[i]]=r,t.ids.push(r[i])}return t}function Nr(n){return n.entities&&n.ids}function Er(n,i){let e={};for(let t of Object.keys(n))e[t]=i(n[t]);return e}function sn({state:n,entities:i,idKey:e,preAddEntity:t,isNativePreAdd:a}){let r,o;if(_e(i)){let p=on(i,e,t);r=p.entities,o=p.ids}else Nr(i)?(r=a?i.entities:Er(i.entities,t),o=i.ids):(r=a?i:Er(i,t),o=Object.keys(r).map(p=>isNaN(p)?p:Number(p)));let l=s$1(r$2({},n),{entities:r,ids:o,loading:!1});return Vt(n)&&(l.active=jt(l)),l}function ln(n){Object.freeze(n);let i=typeof n==`function`,e=Object.prototype.hasOwnProperty;return Object.getOwnPropertyNames(n).forEach(function(t){e.call(n,t)&&(!i||t!==`caller`&&t!==`callee`&&t!==`arguments`)&&n[t]!==null&&(typeof n[t]==`object`||typeof n[t]==`function`)&&!Object.isFrozen(n[t])&&ln(n[t])}),n}function Mr(n,i){n||console.error(`@StoreConfig({ name }) is missing in ${i}`)}function Ue(n){return n!=null&&`${n}`!=`false`}function It(n){return Ue(n)&&n.constructor.name===`Object`}var gt=`akitaConfig`;function cn(n){return function(i){i[gt]={idKey:`id`};for(let e=0,t=Object.keys(n);e<t.length;e++){let a=t[e];a===`name`?i[gt].storeName=n[a]:i[gt][a]=n[a]}}}var vo=new ne$2;var Tr=new nr$2(!1);var He={activeTransactions:0,batchTransaction:null};function Ir(){pi()||(He.batchTransaction=new ne$2),He.activeTransactions++,Tr.next(!0)}function Dr(){--He.activeTransactions===0&&(He.batchTransaction.next(!0),He.batchTransaction.complete(),Tr.next(!1),vo.next(!0))}function pi(){return He.activeTransactions>0}function dn(){return He.batchTransaction?He.batchTransaction.asObservable():hy(!0)}function Qt(n,i=void 0){Ir();try{return n.apply(i)}finally{de(`@Transaction`),Dr()}}function ui(){return function(n,i,e){let t=e.value;return e.value=function(...a){return Qt(()=>t.apply(this,a),this)},e}}var rt=class{constructor(i,e={}){this.options=e,this.inTransaction=!1,this.cache={active:new nr$2(!1),ttl:null},this.onInit(i)}setLoading(i=!1){i!==this._value().loading&&(R()&&Y(`Set Loading`),this._setState(e=>s$1(r$2({},e),{loading:i})))}setHasCache(i,e={restartTTL:!1}){if(i!==this.cache.active.value&&this.cache.active.next(i),e.restartTTL){let t=this.getCacheTTL();t&&(this.cache.ttl!==null&&clearTimeout(this.cache.ttl),this.cache.ttl=setTimeout(()=>this.setHasCache(!1),t))}}getValue(){return this.storeValue}setError(i){i!==this._value().error&&(R()&&Y(`Set Error`),this._setState(e=>s$1(r$2({},e),{error:i})))}_select(i){return this.store.asObservable().pipe(Ve$3(e=>i(e.state)),ld())}_value(){return this.storeValue}_cache(){return this.cache.active}get config(){return this.constructor[gt]||{}}get storeName(){return this.config.storeName||this.options.storeName||this.options.name}get deepFreeze(){return this.config.deepFreezeFn||this.options.deepFreezeFn||ln}get cacheConfig(){return this.config.cache||this.options.cache}get _producerFn(){return this.config.producerFn||this.options.producerFn||xr()}get resettable(){return nt(this.config.resettable)?this.config.resettable:this.options.resettable}_setState(i,e=!0){if(k(i)){let t=i(this._value());this.storeValue=Ht?this.deepFreeze(t):t}else this.storeValue=i;if(!this.store){this.store=new nr$2({state:this.storeValue}),R()&&this.store.subscribe(({action:t})=>{t&&Sr(this.storeName,t)});return}if(pi()){this.handleTransaction();return}this.dispatch(this.storeValue,e)}reset(){this.isResettable()&&(R()&&Y(`Reset`),this._setState(()=>Object.assign({},this._initialState)),this.setHasCache(!1))}update(i){R()&&Y(`Update`);let e,t=this._value();k(i)?e=k(this._producerFn)?this._producerFn(t,i):i(t):e=i;let a=this.akitaPreUpdate(t,r$2(r$2({},t),e)),r=It(t)?a:new t.constructor(a);this._setState(r)}updateStoreConfig(i){this.options=r$2(r$2({},this.options),i)}akitaPreUpdate(i,e){return e}destroy(){!(ft&&window.hmrEnabled)&&this===F[this.storeName]&&(delete F[this.storeName],wr(this.storeName),this.setHasCache(!1),this.cache.active.complete(),this.store.complete())}onInit(i){F[this.storeName]=this,this._setState(()=>i),kr(this.storeName),this.isResettable()&&(this._initialState=i),R()&&Mr(this.storeName,this.constructor.name)}dispatch(i,e=!0){let t;e&&(t=ht,Wi()),this.store.next({state:i,action:t})}watchTransaction(){dn().subscribe(()=>{this.inTransaction=!1,this.dispatch(this._value())})}isResettable(){return this.resettable===!1?!1:this.resettable||Mt().resettable}handleTransaction(){this.inTransaction||(this.watchTransaction(),this.inTransaction=!0)}getCacheTTL(){return this.cacheConfig&&this.cacheConfig.ttl||Mt().ttl}};function mn({state:n,ids:i,idKey:e,newStateOrFn:t$1,preUpdateEntity:a,producerFn:r,onEntityIdChanges:o}){let l={},p=!1,f;for(let C of i){if(Me(n.entities,C)===!1)continue;let B=n.entities[C],te;k(t$1)?te=k(r)?r(B,t$1):t$1(B):te=t$1;let me=te.hasOwnProperty(e)&&te[e]!==B[e],ye;f=C,me&&(p=!0,f=te[e]);let ie=r$2(r$2({},B),te);It(B)?ye=ie:It(te)?ye=new B.constructor(ie):ye=new te.constructor(ie),l[f]=a(B,ye)}let H=n.ids,D=n.entities;if(p){let[C]=i,N=n.entities,{[C]:B}=N;D=u$3(N,[t(C)]),H=n.ids.map(me=>me===C?f:me),o(C,f)}return s$1(r$2({},n),{entities:r$2(r$2({},D),l),ids:H})}var Pr;var bt=class n extends rt{constructor(i={},e={}){super(r$2(r$2({},an()),i),e),this.options=e,this.entityActions=new ne$2,this.entityIdChanges=new ne$2}get selectEntityAction$(){return this.entityActions.asObservable()}get selectEntityIdChanges$(){return this.entityIdChanges.asObservable()}get idKey(){return this.config.idKey||this.options.idKey||`id`}set(i,e={}){if(Z(i))return;R()&&Y(`Set Entity`);let t=this.akitaPreAddEntity===n.prototype.akitaPreAddEntity;this.setHasCache(!0,{restartTTL:!0}),this._setState(a=>{let r=sn({state:a,entities:i,idKey:this.idKey,preAddEntity:this.akitaPreAddEntity.bind(this),isNativePreAdd:t});return Se(e.activeId)===!1&&(r.active=e.activeId),r}),this.hasInitialUIState()&&this.handleUICreation(),this.entityActions.next({type:at.Set,ids:this.ids})}add(i,e={loading:!1}){let t=Q(i);if(Te(t))return;let a=Ki({state:this._value(),preAddEntity:this.akitaPreAddEntity.bind(this),entities:t,idKey:this.idKey,options:e});a&&(R()&&Y(`Add Entity`),a.newState.loading=e.loading,this._setState(()=>a.newState),this.hasInitialUIState()&&this.handleUICreation(!0),this.entityActions.next({type:at.Add,ids:a.newIds}))}update(i,e){if(Se(e)){super.update(i);return}let t=[];if(k(i)?t=this.ids.filter(r=>i(this.entities[r])):t=Z(i)?this.ids:Q(i),Te(t))return;R()&&Y(`Update Entity`,t);let a;this._setState(r=>mn({idKey:this.idKey,ids:t,preUpdateEntity:this.akitaPreUpdateEntity.bind(this),state:r,newStateOrFn:e,producerFn:this._producerFn,onEntityIdChanges:(o,l)=>{a={oldId:o,newId:l},this.entityIdChanges.next(s$1(r$2({},a),{pending:!0}))}})),a&&this.entityIdChanges.next(s$1(r$2({},a),{pending:!1})),this.entityActions.next({type:at.Update,ids:t})}upsert(i,e,t,a={}){let r=Q(i),o=D=>N=>Me(this.entities,N)===D,l=k(t)?a.baseClass:t?t.baseClass:void 0,p=k(l),f=r.filter(o(!0)),H=r.filter(o(!1)).map(D=>{let N=typeof e==`function`?e({}):e,B=s$1(r$2({},k(t)?t(D,N):N),{[this.idKey]:D});return p?new l(B):B});this.update(f,e),this.add(H),R()&&de(`Upsert Entity`)}upsertMany(i,e={}){let t=[],a=[],r={};for(let o of i){let l=this.akitaPreCheckEntity(o),p=l[this.idKey];if(Me(this.entities,p)){let f=this._value().entities[p],H=r$2(r$2({},this._value().entities[p]),l),D=e.baseClass?new e.baseClass(H):H,N=this.akitaPreUpdateEntity(f,D),C=N[this.idKey];r[C]=N,a.push(C)}else{let f=e.baseClass?new e.baseClass(l):l,H=this.akitaPreAddEntity(f),D=H[this.idKey];t.push(D),r[D]=H}}R()&&de(`Upsert Many`),this._setState(o=>s$1(r$2({},o),{ids:t.length?[...o.ids,...t]:o.ids,entities:r$2(r$2({},o.entities),r),loading:!!e.loading})),a.length&&this.entityActions.next({type:at.Update,ids:a}),t.length&&this.entityActions.next({type:at.Add,ids:t}),t.length&&this.hasUIStore()&&this.handleUICreation(!0)}replace(i,e){let t=Q(i);if(Te(t))return;let a={};for(let r of t)a[r]=s$1(r$2({},e),{[this.idKey]:r});R()&&Y(`Replace Entity`,i),this._setState(r=>s$1(r$2({},r),{entities:r$2(r$2({},r.entities),a)}))}move(i,e){let t=this.ids.slice();t.splice(e<0?t.length+e:e,0,t.splice(i,1)[0]),R()&&Y(`Move Entity`),this._setState(a=>s$1(r$2({},a),{entities:r$2({},a.entities),ids:t}))}remove(i){if(Te(this.ids))return;let e=nt(i),t=[];k(i)?t=this.ids.filter(a=>i(this.entities[a])):t=e?Q(i):this.ids,!Te(t)&&(R()&&Y(`Remove Entity`,t),this._setState(a=>rn({state:a,ids:t})),e||this.setHasCache(!1),this.handleUIRemove(t),this.entityActions.next({type:at.Remove,ids:t}))}updateActive(i){let e=Q(this.active);R()&&Y(`Update Active`,e),this.update(e,i)}setActive(i){let e=nn(i,this.ids,this.active);e!==void 0&&(R()&&Y(`Set Active`,e),this._setActive(e))}addActive(i){let e=Q(i);Te(e)||e.every(a=>this.active.indexOf(a)>-1)||(R()&&Y(`Add Active`,i),this._setState(a=>{let r=Array.from(new Set([...a.active,...e]));return s$1(r$2({},a),{active:r})}))}removeActive(i){let e=Q(i);Te(e)||!e.some(a=>this.active.indexOf(a)>-1)||(R()&&Y(`Remove Active`,i),this._setState(a=>s$1(r$2({},a),{active:Array.isArray(a.active)?a.active.filter(r=>e.indexOf(r)===-1):null})))}toggleActive(i){let e=Q(i),t=o=>l=>this.active.includes(l)===o,a=e.filter(t(!0)),r=e.filter(t(!1));this.removeActive(a),this.addActive(r),R()&&de(`Toggle Active`)}createUIStore(i={},e={}){let t={name:`UI/${this.storeName}`,idKey:this.idKey};return this.ui=new Wt(i,r$2(r$2({},t),e)),this.ui}destroy(){super.destroy(),this.ui instanceof n&&this.ui.destroy(),this.entityActions.complete()}akitaPreUpdateEntity(i,e){return e}akitaPreAddEntity(i){return i}akitaPreCheckEntity(i){return i}get ids(){return this._value().ids}get entities(){return this._value().entities}get active(){return this._value().active}_setActive(i){this._setState(e=>s$1(r$2({},e),{active:i}))}handleUICreation(i=!1){let e=this.ids,t=k(this.ui._akitaCreateEntityFn),a,r=o=>{let l=this.entities[o],p=t?this.ui._akitaCreateEntityFn(l):this.ui._akitaCreateEntityFn;return r$2({[this.idKey]:l[this.idKey]},p)};i?a=this.ids.filter(o=>Se(this.ui.entities[o])).map(r):a=e.map(r),i?this.ui.add(a):this.ui.set(a)}hasInitialUIState(){return this.hasUIStore()&&Se(this.ui._akitaCreateEntityFn)===!1}handleUIRemove(i){this.hasUIStore()&&this.ui.remove(i)}hasUIStore(){return this.ui instanceof Wt}};AM([ui(),OM(`design:type`,Function),OM(`design:paramtypes`,[Object,Object,Object,Object]),OM(`design:returntype`,void 0)],bt.prototype,`upsert`,null);AM([ui(),OM(`design:type`,Function),OM(`design:paramtypes`,[typeof(Pr=typeof T<`u`&&T)==`function`?Pr:Object]),OM(`design:returntype`,void 0)],bt.prototype,`toggleActive`,null);var Wt=class extends bt{constructor(i={},e={}){super(i,e)}setInitialEntityState(i){this._akitaCreateEntityFn=i}};function hn(){return bn$3(n=>n!=null)}function Or(n){return function(i,e){let t=k(n[0]);return n.some(a=>t?a(i)!==a(e):i[a]!==e[a])===!1}}function _t(n){return typeof n==`string`}var pn=`akitaQueryConfig`;var yt=class{constructor(i){this.store=i,this.__store__=i,R()&&(Ji[i.storeName]=this)}select(i){let e;if(k(i))e=i;else if(_t(i))e=t=>t[i];else{if(Array.isArray(i))return this.store._select(t=>t).pipe(ld(Or(i)),Ve$3(t=>k(i[0])?i.map(a=>a(t)):i.reduce((a,r)=>(a[r]=t[r],a),{})));e=t=>t}return this.store._select(e)}selectLoading(){return this.select(i=>i.loading)}selectError(){return this.select(i=>i.error)}getValue(){return this.store._value()}selectHasCache(){return this.store._cache().asObservable()}getHasCache(){return this.store._cache().value}get config(){return this.constructor[pn]}};function vt(n,i){return i.split(`.`).length===1?n:i.split(`.`).slice(1).join(`.`).split(`.`).reduce((t,a)=>t&&t[a],n)}function Dt(n,i,e,t=!1){let a=i.split(`.`);if(a.length===1)return r$2(r$2({},n),e);n=r$2({},n);let r=a.length-2;return i.split(`.`).slice(1).reduce((l,p,f)=>f!==r?(l[p]=r$2({},l[p]),l&&l[p]):(l[p]=t||Array.isArray(l[p])||!Ie(l[p])?e:r$2(r$2({},l[p]),e),l&&l[p]),n),n}var Fr=!1;var Co=new or$2(1);function un(n){Fr=n}function Ao(){return Fr}function Eo(n){return n&&k(n.then)}function Gt(n){return Eo(n)||my(n)?je$1(n):hy(n)}function fn(n){let i={key:`AkitaStores`,enableInNonBrowser:!1,storage:Zi()?localStorage:n.storage,deserialize:JSON.parse,serialize:JSON.stringify,include:[],select:[],persistOnDestroy:!1,preStorageUpdate:function(A,S){return S},preStoreUpdate:function(A,S){return S},skipStorageUpdate:Ao,preStorageUpdateOperator:()=>A=>A},{storage:e,enableInNonBrowser:t,deserialize:a,serialize:r,include:o,select:l,key:p,preStorageUpdate:f,persistOnDestroy:H,preStorageUpdateOperator:D,preStoreUpdate:N,skipStorageUpdate:C}=Object.assign({},i,n);if(Ut&&!t||!e)return;let B=o.length>0,te=l.length>0,me,ye;B&&(me=o.reduce((A,S)=>{if(k(S))A.fns.push(S);else{let De=S.split(`.`)[0];A[De]=S}return A},{fns:[]})),te&&(ye=l.reduce((A,S)=>(A[S.storeName]=S,A),{}));let ie={},Lt={},xt=[],wt=[];function Ft(A){Gt(A).subscribe(()=>{let S=wt.shift();S&&Ft(S)})}let go=Zi()&&e===localStorage||Cr()&&e===sessionStorage;return Gt(e.getItem(p)).subscribe(A=>{let S=Ie(A)?A:a(A||`{}`);function De(y){S.$cache=r$2(r$2({},S.$cache||{}),y),S=Object.assign({},S,Lt),wt.push(e.setItem(p,go?r(S):S)),Ft(wt.shift())}function kt(y,St){ie[y]=F[y]._select(le=>vt(le,St)).pipe(pd(1),Ve$3(le=>te&&ye[y]?ye[y](le):le),bn$3(()=>C()===!1),D()).subscribe(le=>{Lt[y]=f(y,le),Promise.resolve().then(()=>De({[y]:F[y]._cache().getValue()}))})}function Mi(y,St,le){if(y in S){Y(`@PersistState`),St._setState(Jt=>Dt(Jt,le,N(y,S[y],Jt)));let Nn=S.$cache?S.$cache[y]:!1;F[y].setHasCache(Nn,{restartTTL:!0})}}xt.push(qt.subscribe(y=>{ie[y]&&(H===!1&&De({[y]:!1}),ie[y].unsubscribe(),delete ie[y])})),xt.push(ut.subscribe(y=>{if(y===`router`)return;let St=F[y];if(B){let le=me[y];if(!le)if(me.fns.some(Jt=>Jt(y)))le=y;else return;Mi(y,St,le),kt(y,le)}else Mi(y,St,y),kt(y,y)})),Co.next(!0)}),{destroy(){xt.forEach(A=>A.unsubscribe());for(let A=0,S=Object.keys(ie);A<S.length;A++){let De=S[A];ie[De].unsubscribe()}ie={}},clear(){e.clear()},clearStore(A){if(Z(A)){Gt(e.setItem(p,`{}`)).subscribe();return}Gt(e.getItem(p)).subscribe(De=>{let kt=a(De||`{}`);kt[A]&&(delete kt[A],Gt(e.setItem(p,r(kt))).subscribe())})}}}var ot=class{constructor(i,e){this.query=i,e&&e.resetFn&&Mt().resettable&&this.onReset(e.resetFn)}getQuery(){return this.query}getStore(){return this.getQuery().__store__}isEntityBased(i){return Ue(i)}selectSource(i,e){return this.isEntityBased(i)?this.getQuery().selectEntity(i).pipe(hn()):e?this.getQuery().select(t=>vt(t,this.withStoreName(e))):this.getQuery().select()}getSource(i,e){if(this.isEntityBased(i))return this.getQuery().getEntity(i);let t=this.getQuery().getValue();return e?vt(t,this.withStoreName(e)):t}withStoreName(i){return`${this.storeName}.${i}`}get storeName(){return this.getStore().storeName}updateStore(i,e,t,a=!1){if(this.isEntityBased(e)){let r=this.getStore();a?r.replace(e,i):r.update(e,i)}else{if(t){this.getStore()._setState(o=>Dt(o,this.withStoreName(t),i,!0));return}let r=a?i:o=>r$2(r$2({},o),i);this.getStore()._setState(r)}}onReset(i){let e=this.getStore().reset;this.getStore().reset=(...t)=>{setTimeout(()=>{e.apply(this.getStore(),t),i()})}}};var Io={pagesControls:!1,range:!1,startWith:1,cacheTimeout:void 0,clearStoreWithCache:!0};var fi=class extends ot{constructor(i,e={}){super(i,{resetFn:()=>{this.initial=!1,this.destroy({clearCache:!0,currentPage:1})}}),this.query=i,this.config=e,this.metadata=new Map,this.pages=new Map,this.pagination={currentPage:1,perPage:0,total:0,lastPage:0,data:[]},this.initial=!0,this.isLoading$=this.query.selectLoading().pipe(cd(0)),this.config=r$2(r$2({},Io),e);let{startWith:t,cacheTimeout:a}=this.config;this.page=new nr$2(t),my(a)&&(this.clearCacheSubscription=a.subscribe(()=>this.clearCache()))}get pageChanges(){return this.page.asObservable()}get currentPage(){return this.pagination.currentPage}get isFirst(){return this.currentPage===1}get isLast(){return this.currentPage===this.pagination.lastPage}withControls(){return this.config.pagesControls=!0,this}withRange(){return this.config.range=!0,this}setLoading(i=!0){this.getStore().setLoading(i)}update(i){this.pagination=i,this.addPage(i.data)}addPage(i){this.pages.set(this.currentPage,{ids:i.map(e=>e[this.getStore().idKey])}),this.getStore().upsertMany(i)}clearCache(i={}){this.initial||(de(`@Pagination - Clear Cache`),i.clearStore!==!1&&(this.config.clearStoreWithCache||i.clearStore)&&this.getStore().remove(),this.pages=new Map,this.metadata=new Map),this.initial=!1}clearPage(i){this.pages.delete(i)}destroy({clearCache:i,currentPage:e}={}){this.clearCacheSubscription&&this.clearCacheSubscription.unsubscribe(),i&&this.clearCache(),Se(e)||this.setPage(e),this.initial=!0}isPageActive(i){return this.currentPage===i}setPage(i){(i!==this.currentPage||!this.hasPage(i))&&this.page.next(this.pagination.currentPage=i)}nextPage(){this.currentPage!==this.pagination.lastPage&&this.setPage(this.pagination.currentPage+1)}prevPage(){this.pagination.currentPage>1&&this.setPage(this.pagination.currentPage-1)}setLastPage(){this.setPage(this.pagination.lastPage)}setFirstPage(){this.setPage(1)}hasPage(i){return this.pages.has(i)}getPage(i){let e=this.pagination.currentPage;return this.hasPage(e)?this.selectPage(e):(this.setLoading(!0),je$1(i()).pipe(Xu(t=>(e=t.currentPage,Qt(()=>{this.setLoading(!1),this.update(t)}),this.selectPage(e)))))}getQuery(){return this.query}refreshCurrentPage(){Z(this.currentPage)===!1&&(this.clearPage(this.currentPage),this.setPage(this.currentPage))}getFrom(){return this.isFirst?1:(this.currentPage-1)*this.pagination.perPage+1}getTo(){return this.isLast?this.pagination.total:this.currentPage*this.pagination.perPage}selectPage(i){return this.query.selectAll({asObject:!0}).pipe(Lt$4(1),Ve$3(e=>{let t=s$1(r$2({},this.pagination),{data:this.pages.get(i).ids.map(o=>e[o])}),{range:a,pagesControls:r}=this.config;return isNaN(this.pagination.total)&&(t.lastPage===1?t.total=t.data?t.data.length:0:t.total=t.perPage*t.lastPage,this.pagination.total=t.total),a&&(t.from=this.getFrom(),t.to=this.getTo()),r&&(t.pageControls=Do(this.pagination.total,this.pagination.perPage)),t}))}};AM([$i(`@Pagination - New Page`),OM(`design:type`,Function),OM(`design:paramtypes`,[Object]),OM(`design:returntype`,void 0)],fi.prototype,`update`,null);function Do(n,i){let e=Math.ceil(n/i),t=[];for(let a=0;a<e;a++)t.push(a+1);return t}var gn=(function(n){return n.Update=`UPDATE`,n})(gn||{});gn.Update;var Qe=(function(n){return n.Update=`UPDATE`,n.AddEntities=`ADD_ENTITIES`,n.SetEntities=`SET_ENTITIES`,n.UpdateEntities=`UPDATE_ENTITIES`,n.RemoveEntities=`REMOVE_ENTITIES`,n.UpsertEntities=`UPSERT_ENTITIES`,n.UpsertManyEntities=`UPSERT_MANY_ENTITIES`,n})(Qe||{});Qe.Update,Qe.AddEntities,Qe.SetEntities,Qe.UpdateEntities,Qe.RemoveEntities,Qe.UpsertEntities,Qe.UpsertManyEntities;var gi=class{getStoresSnapshot(i=[]){let e={},a=i.length>0?i:Object.keys(F);for(let r=0;r<a.length;r++){let o=a[r];o!==`router`&&(e[o]=F[o]._value())}return e}setStoresSnapshot(i,e){let t=r$2({skipStorageUpdate:!1,lazy:!1},e);t.skipStorageUpdate&&un(!0);let a=i;_t(i)&&(a=JSON.parse(a));let r=Object.keys(a).length;if(t.lazy)ut.pipe(bn$3(o=>a.hasOwnProperty(o)),Lt$4(r)).subscribe(o=>F[o]._setState(()=>a[o]));else for(let o=0,l=Object.keys(a);o<l.length;o++){let p=l[o];F[p]&&F[p]._setState(()=>a[p])}t.skipStorageUpdate&&un(!1)}};new gi;var Br=(()=>{class n{_animationsDisabled=z$4();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(t){return new(t||n)};static ɵcmp=YC({type:n,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(t,a){t&2&&Qm(`mat-pseudo-checkbox-indeterminate`,a.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,a.state===`checked`)(`mat-pseudo-checkbox-disabled`,a.disabled)(`mat-pseudo-checkbox-minimal`,a.appearance===`minimal`)(`mat-pseudo-checkbox-full`,a.appearance===`full`)(`_mat-animation-noopable`,a._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(t,a){},styles:[`.mat-pseudo-checkbox {
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
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
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
`],encapsulation:2})}return n})();var Lo=[`text`];var Fo=[[[`mat-icon`]],`*`];var Ro=[`mat-icon`,`*`];function Bo(n,i){if(n&1&&xm(0,`mat-pseudo-checkbox`,1),n&2){let e=fb();Nm(`disabled`,e.disabled)(`state`,e.selected?`checked`:`unchecked`)}}function zo(n,i){if(n&1&&xm(0,`mat-pseudo-checkbox`,3),n&2)Nm(`disabled`,fb().disabled)}function Vo(n,i){if(n&1&&(as$2(0,`span`,4),Ub(1),ou()),n&2){let e=fb();cT(),uu(`(`,e.group.label,`)`)}}var vi=new S$2(`MAT_OPTION_PARENT_COMPONENT`);var xi=new S$2(`MatOptgroup`);var bi=class{source;isUserInput;constructor(i,e=!1){this.source=i,this.isUserInput=e}};var $t=(()=>{class n{_element=y$3(Jr$2);_changeDetectorRef=y$3(QV);_parent=y$3(vi,{optional:!0});group=y$3(xi,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue=``;get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=y$3(Rt$3).getId(`mat-option-`);get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=ze$1(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new tt$6;_text;_stateChanges=new ne$2;constructor(){let e=y$3(I$4);e.load(Ye$1),e.load(pt$5),this._signalDisableRipple=!!this._parent&&Ar$2(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||``).trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let a=this._getHostElement();typeof a.focus==`function`&&a.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Le$1(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new bi(this,e))}static ɵfac=function(t){return new(t||n)};static ɵcmp=YC({type:n,selectors:[[`mat-option`]],viewQuery:function(t,a){if(t&1&&Um(Lo,7),t&2){let r;vb(r=yb())&&(a._text=r.first)}},hostAttrs:[`role`,`option`,1,`mat-mdc-option`,`mdc-list-item`],hostVars:11,hostBindings:function(t,a){t&1&&jm(`click`,function(){return a._selectViaInteraction()})(`keydown`,function(o){return a._handleKeydown(o)}),t&2&&(Pm(`id`,a.id),Sm(`aria-selected`,a.selected)(`aria-disabled`,a.disabled.toString()),Qm(`mdc-list-item--selected`,a.selected)(`mat-mdc-option-multiple`,a.multiple)(`mat-mdc-option-active`,a.active)(`mdc-list-item--disabled`,a.disabled))},inputs:{value:`value`,id:`id`,disabled:[2,`disabled`,`disabled`,ZV]},outputs:{onSelectionChange:`onSelectionChange`},exportAs:[`matOption`],ngContentSelectors:Ro,decls:8,vars:5,consts:[[`text`,``],[`aria-hidden`,`true`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`,`state`],[1,`mdc-list-item__primary-text`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`],[1,`cdk-visually-hidden`],[`aria-hidden`,`true`,`mat-ripple`,``,1,`mat-mdc-option-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`]],template:function(t,a){t&1&&(hb(Fo),zw(0,Bo,1,2,`mat-pseudo-checkbox`,1),gb(1),as$2(2,`span`,2,0),gb(4,1),ou(),zw(5,zo,1,1,`mat-pseudo-checkbox`,3),zw(6,Vo,2,1,`span`,4),xm(7,`div`,5)),t&2&&(Qw(a.multiple?0:-1),cT(5),Qw(!a.multiple&&a.selected&&!a.hideSingleSelectionIndicator?5:-1),cT(),Qw(a.group&&a.group._inert?6:-1),cT(),Nm(`matRippleTrigger`,a._getHostElement())(`matRippleDisabled`,a.disabled||a.disableRipple))},dependencies:[Br,Di$3],styles:[`.mat-mdc-option {
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
  color: var(--%NS%mat-option-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-option-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-option-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-option-label-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-option-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-option-label-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--%NS%mat-option-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--%NS%mat-option-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--%NS%mat-option-selected-state-layer-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
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
  .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
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
  [dir=rtl] .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --%NS%mat-list-list-item-selected-container-color: var(--%NS%mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return n})();function bn(n,i,e){if(e.length){let t=i.toArray(),a=e.toArray(),r=0;for(let o=0;o<n+1;o++)t[o].group&&t[o].group===a[r]&&r++;return r}return 0}function _n(n,i,e,t){return n<e?n:n+i>e+t?Math.max(0,n-t+i):e}var Kt=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new ne$2;bulk={select:i=>this._select(i),deselect:i=>this._deselect(i),setSelection:i=>this._setSelection(i)};constructor(i=!1,e,t=!0,a){this._multiple=i,this._emitChanges=t,this.compareWith=a,e&&e.length&&(i?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...i){return this._select(i)}deselect(...i){return this._deselect(i)}setSelection(...i){return this._setSelection(i)}toggle(i){return this.isSelected(i)?this.deselect(i):this.select(i)}clear(i=!0){this._unmarkAll();let e=this._hasQueuedChanges();return i&&this._emitChangeEvent(),e}isSelected(i){return this._selection.has(this._getConcreteValue(i))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(i){this._multiple&&this.selected&&this._selected.sort(i)}isMultipleSelection(){return this._multiple}_select(i){this._verifyValueAssignment(i),i.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(i){this._verifyValueAssignment(i),i.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(i){this._verifyValueAssignment(i);let e=this.selected,t=new Set(i.map(r=>this._getConcreteValue(r)));i.forEach(r=>this._markSelected(r)),e.filter(r=>!t.has(this._getConcreteValue(r,t))).forEach(r=>this._unmarkSelected(r));let a=this._hasQueuedChanges();return this._emitChangeEvent(),a}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(i){i=this._getConcreteValue(i),this.isSelected(i)||(this._multiple||this._unmarkAll(),this.isSelected(i)||this._selection.add(i),this._emitChanges&&this._selectedToEmit.push(i))}_unmarkSelected(i){i=this._getConcreteValue(i),this.isSelected(i)&&(this._selection.delete(i),this._emitChanges&&this._deselectedToEmit.push(i))}_unmarkAll(){this.isEmpty()||this._selection.forEach(i=>this._unmarkSelected(i))}_verifyValueAssignment(i){i.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(i,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(i,t))return t;return i}else return i}};var Wo=[`trigger`];var Go=[`panel`];var $o=[[[`mat-select-trigger`]],`*`];var Ko=[`mat-select-trigger`,`*`];function Yo(n,i){if(n&1&&(as$2(0,`span`,4),Ub(1),ou()),n&2){let e=fb();cT(),nv(e.placeholder)}}function Zo(n,i){n&1&&gb(0)}function Jo(n,i){if(n&1&&(as$2(0,`span`,11),Ub(1),ou()),n&2){let e=fb(2);cT(),nv(e.triggerValue)}}function Xo(n,i){if(n&1&&(as$2(0,`span`,5),zw(1,Zo,1,0)(2,Jo,2,1,`span`,11),ou()),n&2){let e=fb();cT(),Qw(e.customTrigger?1:2)}}function es(n,i){if(n&1){let e=ib();as$2(0,`div`,12,1),jm(`keydown`,function(a){of(e);return sf(fb()._handleKeydown(a))}),gb(2,1),ou()}if(n&2){let e=fb();Ab(e.panelClass),Qm(`mat-select-panel-animations-enabled`,!e._animationsDisabled)(`mat-primary`,e._parentFormField?.color===`primary`)(`mat-accent`,e._parentFormField?.color===`accent`)(`mat-warn`,e._parentFormField?.color===`warn`)(`mat-undefined`,!e._parentFormField?.color),Sm(`id`,e.id+`-panel`)(`aria-multiselectable`,e.multiple)(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e._getPanelAriaLabelledby())}}var ts=new S$2(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=y$3(ve$1);return()=>Yt$3(n)}});var is=new S$2(`MAT_SELECT_CONFIG`);var ns=new S$2(`MatSelectTrigger`);var yn=class{source;value;constructor(i,e){this.source=i,this.value=e}};var jr=(()=>{class n{_viewportRuler=y$3(T$2);_changeDetectorRef=y$3(QV);_elementRef=y$3(Jr$2);_dir=y$3(zn$1,{optional:!0});_idGenerator=y$3(Rt$3);_renderer=y$3(Uc);_parentFormField=y$3(fs$1,{optional:!0});ngControl=y$3(H,{self:!0,optional:!0});_liveAnnouncer=y$3(Sn$4);_defaultOptions=y$3(is,{optional:!0});_animationsDisabled=z$4();_popoverLocation;_initialized=new ne$2;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let a=this.panel.nativeElement,r=bn(e,this.options,this.optionGroups),o=t._getHostElement();e===0&&r===1?a.scrollTop=0:a.scrollTop=_n(o.offsetTop,o.offsetHeight,a.scrollTop,a.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new yn(this,e)}_scrollStrategyFactory=y$3(ts);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new ne$2;_errorStateTracker;stateChanges=new ne$2;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=ze$1(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(re.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=xy(()=>{let e=this.options;return e?e.changes.pipe(hd(e),Xu(()=>Oy(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Xu(()=>this.optionSelectionChanges))});openedChange=new tt$6;_openedStream=this.openedChange.pipe(bn$3(e=>e),Ve$3(()=>{}));_closedStream=this.openedChange.pipe(bn$3(e=>!e),Ve$3(()=>{}));selectionChange=new tt$6;valueChange=new tt$6;constructor(){let e=y$3(Ja),t=y$3(Hr$1,{optional:!0}),a=y$3($r$1,{optional:!0}),r=y$3(new Bv(`tabindex`),{optional:!0}),o=y$3(wt$3,{optional:!0}),l=y$3(Ki$1,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new ur(e,l||this.ngControl,a,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=r==null?0:parseInt(r)||0,this._popoverLocation=o?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new Kt(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(By(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(By(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(hd(null),By(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let a=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?a.setAttribute(`aria-labelledby`,e):a.removeAttribute(`aria-labelledby`)}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(Lt$4(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(a),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,`animationend`,r=>{r.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),a=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,a=t===40||t===38||t===37||t===39,r=t===13||t===32,o=this._keyManager;if(!o.isTyping()&&r&&!Le$1(e)||(this.multiple||e.altKey)&&a)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;o.onKeydown(e);let p=this.selected;p&&l!==p&&this._liveAnnouncer.announce(p.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,a=e.keyCode,r=a===40||a===38,o=t.isTyping();if(r&&e.altKey)e.preventDefault(),this.close();else if(!o&&(a===13||a===32)&&t.activeItem&&!Le$1(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!o&&this._multiple&&a===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(p=>!p.disabled&&!p.selected);this.options.forEach(p=>{p.disabled||(l?p.select():p.deselect())})}else{let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&r&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!Le$1(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(a=>{if(this._selectionModel.isSelected(a))return!1;try{return(a.value!=null||this.canSelectNullableOptions)&&this._compareWith(a.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof vt$3?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Ct$2(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Oy(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(By(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Oy(...this.options.map(t=>t._stateChanges)).pipe(By(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let a=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(a!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),a!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,a)=>this.sortComparator?this.sortComparator(t,a,e):e.indexOf(t)-e.indexOf(a)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(a=>a.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(e){let t=y$4(e);t&&(t.tagName===`MAT-OPTION`||t.classList.contains(`cdk-overlay-backdrop`)||t.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(t){return new(t||n)};static ɵcmp=YC({type:n,selectors:[[`mat-select`]],contentQueries:function(t,a,r){if(t&1&&Bm(r,ns,5)(r,$t,5)(r,xi,5),t&2){let o;vb(o=yb())&&(a.customTrigger=o.first),vb(o=yb())&&(a.options=o),vb(o=yb())&&(a.optionGroups=o)}},viewQuery:function(t,a){if(t&1&&Um(Wo,5)(Go,5)(re$1,5),t&2){let r;vb(r=yb())&&(a.trigger=r.first),vb(r=yb())&&(a.panel=r.first),vb(r=yb())&&(a._overlayDir=r.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(t,a){t&1&&jm(`keydown`,function(o){return a._handleKeydown(o)})(`focus`,function(){return a._onFocus()})(`blur`,function(){return a._onBlur()}),t&2&&(Sm(`id`,a.id)(`tabindex`,a.disabled?-1:a.tabIndex)(`aria-controls`,a.panelOpen?a.id+`-panel`:null)(`aria-expanded`,a.panelOpen)(`aria-label`,a.ariaLabel||null)(`aria-required`,a.required.toString())(`aria-disabled`,a.disabled.toString())(`aria-invalid`,a.errorState)(`aria-activedescendant`,a._getAriaActiveDescendant()),Qm(`mat-mdc-select-disabled`,a.disabled)(`mat-mdc-select-invalid`,a.errorState)(`mat-mdc-select-required`,a.required)(`mat-mdc-select-empty`,a.empty)(`mat-mdc-select-multiple`,a.multiple)(`mat-select-open`,a.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,ZV],disableRipple:[2,`disableRipple`,`disableRipple`,ZV],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:KV(e)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,ZV],placeholder:`placeholder`,required:[2,`required`,`required`,ZV],multiple:[2,`multiple`,`multiple`,ZV],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,ZV],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,KV],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,ZV]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[e_([{provide:us$1,useExisting:n},{provide:vi,useExisting:n}]),qE],ngContentSelectors:Ko,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(t,a){if(t&1&&(hb($o),as$2(0,`div`,2,0),jm(`click`,function(){return a.open()}),as$2(3,`div`,3),zw(4,Yo,2,1,`span`,4)(5,Xo,3,1,`span`,5),ou(),as$2(6,`div`,6)(7,`div`,7),yf(),as$2(8,`svg`,8),xm(9,`path`,9),ou()()()(),vm(10,es,3,16,`ng-template`,10),jm(`detach`,function(){return a.close()})(`backdropClick`,function(){return a.close()})(`overlayKeydown`,function(o){return a._handleOverlayKeydown(o)})),t&2){let r=Ib(1);cT(3),Sm(`id`,a._valueId),cT(),Qw(a.empty?4:5),cT(6),Nm(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,a._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,a._scrollStrategy)(`cdkConnectedOverlayOrigin`,a._preferredOverlayOrigin||r)(`cdkConnectedOverlayPositions`,a._positions)(`cdkConnectedOverlayWidth`,a._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,a._popoverLocation)}},dependencies:[vt$3,re$1],styles:[`@keyframes _mat-select-enter {
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
  color: var(--%NS%mat-select-enabled-trigger-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-select-trigger-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-select-trigger-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-select-trigger-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-select-trigger-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-select-trigger-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--%NS%mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
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
  color: var(--%NS%mat-select-invalid-arrow-color, var(--%NS%mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--%NS%mat-select-enabled-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-focused-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-disabled-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
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
  background-color: var(--%NS%mat-select-panel-background-color, var(--%NS%mat-sys-surface-container));
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
  color: var(--%NS%mat-select-placeholder-text-color, var(--%NS%mat-sys-on-surface-variant));
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
  transform: var(--%NS%mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})}return n})();function as(){return{artPieces:[],lastArtPiecesUpdate:void 0,imageCache:[]}}var Pt=class wi extends rt{constructor(){super(as())}static{this.ɵfac=function(e){return new(e||wi)}}static{this.ɵprov=de$3({token:wi,factory:wi.ɵfac,providedIn:`root`})}};Pt=AM([cn({name:`session`})],Pt);var ki=(()=>{class n extends yt{constructor(){super(y$3(Pt)),this.getArtPiecesObservable=this.select(({artPieces:e})=>[...e])}get selectArtPieces(){return this.getValue().artPieces}get selectLastArtPiecesUpdate(){return this.getValue().lastArtPiecesUpdate}getThumbnailByTokenId(e){return this.getValue().imageCache.find(t=>t?.tokenId===e)}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵprov=de$3({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var qr=(n,i)=>i.label;function rs(n,i){if(n&1&&(as$2(0,`mat-chip`,1)(1,`a`,9),Ub(2),ou()()),n&2){let e=i.$implicit;cT(),Nm(`routerLink`,e.url)(`queryParams`,e.queryParams),Sm(`aria-label`,e.label),cT(),uu(` `,e.label,` `)}}function os(n,i){if(n&1&&(as$2(0,`mat-option`,5),Ub(1),ou()),n&2){let e=i.$implicit;Nm(`value`,e),cT(),uu(` `,e,` `)}}function ss(n,i){if(n&1&&(as$2(0,`mat-option`,5),Ub(1),a_(2,`translate`),ou()),n&2){let e=i.$implicit;Nm(`value`,e),cT(),uu(` `,l_(2,2,`availability.`+e),` `)}}function ls(n,i){if(n&1){let e=ib();as$2(0,`mat-chip`,10),Bi$2(`year-chip-leave`),Hi$2(`year-chip-enter`),jm(`removed`,function(){let a=of(e).$implicit;return sf(fb(2).removeYearFilter(a.label))}),as$2(1,`a`,9),Ub(2),ou(),as$2(3,`button`,11)(4,`mat-icon`),Ub(5,`cancel`),ou()()()}if(n&2){let e=i.$implicit;Nm(`removable`,!0),cT(),Nm(`routerLink`,e.url)(`queryParams`,e.queryParams),Sm(`aria-label`,e.label),cT(),uu(` `,e.label,` `),cT(),Sm(`aria-label`,`Remove year `+e.label)}}function cs(n,i){if(n&1){let e=ib();as$2(0,`mat-chip`,10),Bi$2(`year-chip-leave`),Hi$2(`year-chip-enter`),jm(`removed`,function(){of(e);return sf(fb(2).clearAvailability())}),as$2(1,`span`,12),Ub(2),a_(3,`translate`),ou(),as$2(4,`button`,11),a_(5,`translate`),as$2(6,`mat-icon`),Ub(7,`cancel`),ou()()()}if(n&2){let e=fb(2);Nm(`removable`,!0),cT(2),nv(l_(3,3,`availability.`+e.availability())),cT(2),Sm(`aria-label`,l_(5,5,`availability.remove`))}}function ds(n,i){if(n&1){let e=ib();as$2(0,`nav`,0)(1,`mat-chip-set`)(2,`mat-chip`,1)(3,`a`,2)(4,`mat-icon`),Ub(5,`home`),ou()()(),Kw(6,rs,3,4,`mat-chip`,1,qr),as$2(8,`mat-form-field`,3)(9,`mat-label`),Ub(10),a_(11,`translate`),ou(),as$2(12,`mat-select`,4),a_(13,`translate`),Kw(14,os,2,2,`mat-option`,5,Zw),ou(),sC(),ou(),as$2(16,`mat-form-field`,6)(17,`mat-label`),Ub(18),a_(19,`translate`),ou(),as$2(20,`mat-select`,7),jm(`selectionChange`,function(a){of(e);return sf(fb().setAvailability(a.value))}),Kw(21,ss,3,4,`mat-option`,5,Zw),ou()(),Kw(23,ls,6,6,`mat-chip`,8,qr),zw(25,cs,8,7,`mat-chip`,8),ou()()}if(n&2){let e=fb();cT(6),Jw(e.routeBreadcrumbs()),cT(4),nv(l_(11,6,`year.label`)),cT(2),Nm(`formField`,e.yearPickerForm.newYear)(`placeholder`,e.yearBreadcrumbs().length?``:l_(13,8,`year.all`)),cC(),cT(2),Jw(e.validYears),cT(4),nv(l_(19,10,`availability.label`)),cT(2),Nm(`value`,e.availability()),cT(),Jw(e.availabilityChoices),cT(2),Jw(e.yearBreadcrumbs()),cT(2),Qw(e.availability()!==`both`?25:-1)}}var Ur=(()=>{class n{setAvailability(e){this.availabilityFilter.set(e)}clearAvailability(){this.availabilityFilter.clear()}constructor(){this.artworkService=y$3(n$1),this.router=y$3(ee),this.activatedRoute=y$3(W$1),this.translateService=y$3(H$1),this.sessionQuery=y$3(ki),this.selectedYears=[],this.routeBreadcrumbs=_t$5(()=>this.breadcrumbs().filter(e=>!e.isYear)),this.yearBreadcrumbs=_t$5(()=>this.breadcrumbs().filter(e=>!!e.isYear)),this.yearPickerModel=ze$1({newYear:null}),this.yearPickerForm=vo$1(this.yearPickerModel),this.availabilityFilter=y$3(_t$3),this.availabilityChoices=Ai$3,this.availability=this.availabilityFilter.availability,this.breadcrumbs=ze$1(this.buildBreadCrumb(this.activatedRoute.root)),ac(()=>{let e=this.yearPickerForm.newYear().value();e!==null&&he$2(()=>this.handleYearChange(e))})}ngOnInit(){this.router.events.pipe(bn$3(e=>e instanceof j$2),ld()).subscribe(()=>{this.selectedYears=this.extractSelectedYears(),this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute.root))})}handleYearChange(e){this.validYears.includes(e)&&!this.selectedYears.includes(e)&&(this.selectedYears.push(e),this.updateQueryParams()),setTimeout(()=>this.yearPickerModel.set({newYear:null}))}removeYearFilter(e){this.selectedYears=this.selectedYears.filter(t=>t!==Number(e)),this.updateQueryParams()}get validYears(){return[...this.artworkService.getAvailableYears()].filter(e=>!this.selectedYears.includes(e))}updateQueryParams(){let e={years:this.selectedYears.length?this.selectedYears.join(`,`):null};this.router.navigate([],{queryParams:e})}extractSelectedYears(){let e=this.activatedRoute.snapshot.queryParamMap.get(`years`);return e?e.split(`,`).map(t=>Number(t)):[]}buildBreadCrumb(e,t=``,a=[]){let r=e.routeConfig&&e.routeConfig.data?e.routeConfig.data.breadcrumb:``,o=e.routeConfig?e.routeConfig.path:``,l=o?o.split(`/`).pop():``;if(l.startsWith(`:`)&&e.snapshot){let N=l.split(`:`)[1],C=e.snapshot.params[N];o=o.replace(l,C),N===`id`?r=this.extractNameFromId(C)||C:r=C}let f=o?`${t}/${o}`:t,H={label:r?this.translateService.instant(r.toLowerCase()):``,url:f,queryParams:{years:[]}},D=r?[...a,H]:[...a];if(e.firstChild)return this.buildBreadCrumb(e.firstChild,f,D);{let N=e.snapshot.queryParamMap.get(`years`);N&&N.split(`,`).forEach(B=>{D.push({label:B,url:f,queryParams:{years:B},isYear:!0})})}return D}extractNameFromId(e){return this.artworkService.getNftById(e,this.sessionQuery.selectArtPieces)?.name||null}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵcmp=YC({type:n,selectors:[[`app-breadcrumb`]],decls:1,vars:1,consts:[[`aria-label`,`Breadcrumb`,1,`container`],[`color`,`primary`],[`routerLink`,`/`,`routerLinkActive`,`router-link-active`,`aria-label`,`Home`,`matLine`,``,1,`link-as-text`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`,`floatLabel`,`always`,1,`small-input`],[`aria-label`,`Select year`,3,`formField`,`placeholder`],[3,`value`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`,1,`small-input`],[`aria-label`,`Select availability`,3,`selectionChange`,`value`],[`color`,`primary`,3,`removable`],[`routerLinkActive`,`router-link-active`,`matLine`,``,1,`link-as-text`,3,`routerLink`,`queryParams`],[`color`,`primary`,3,`removed`,`removable`],[`matChipRemove`,``],[1,`link-as-text`]],template:function(t,a){t&1&&zw(0,ds,26,12,`nav`,0),t&2&&Qw(a.breadcrumbs().length?0:-1)},dependencies:[lt$4,Di$2,st$5,_t$1,Uo$1,Et,gs$1,jr,ba,$t,Nn,$t$2],styles:[`.small-input[_ngcontent-%COMP%]{width:8.75rem;margin-left:.8rem;align-self:flex-start;margin-top:.25rem}.link-as-text[_ngcontent-%COMP%]{all:unset;display:flex;align-items:center;color:inherit;text-decoration:none;cursor:text}@keyframes _ngcontent-%COMP%_year-chip-enter-anim{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}@keyframes _ngcontent-%COMP%_year-chip-leave-anim{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85)}}.year-chip-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-enter-anim .18s ease-out}.year-chip-leave[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-leave-anim .15s ease-in}`]})}}return n})();var Hr=(()=>{class n{constructor(){this.lang=y$3(G),this.instagram=`https://www.instagram.com/juanmamorenosanchez/`}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵcmp=YC({type:n,selectors:[[`app-footer`]],decls:14,vars:16,consts:[[`role`,`contentinfo`,1,`site-footer`],[1,`footer-links`],[`target`,`_blank`,`rel`,`me noopener noreferrer`,1,`footer-link`,3,`href`],[1,`footer-link`,3,`routerLink`]],template:function(t,a){t&1&&(as$2(0,`footer`,0)(1,`nav`,1),a_(2,`translate`),as$2(3,`a`,2),Ub(4,` Instagram `),ou(),as$2(5,`a`,3),Ub(6),a_(7,`translate`),ou(),as$2(8,`a`,3),Ub(9),a_(10,`translate`),ou(),as$2(11,`a`,3),Ub(12),a_(13,`translate`),ou()()()),t&2&&(cT(),Sm(`aria-label`,l_(2,8,`footer.label`)),cT(2),Nm(`href`,a.instagram,$h),cT(2),Nm(`routerLink`,a.lang.link(`contact`)),cT(),nv(l_(7,10,`menu.contact`)),cT(2),Nm(`routerLink`,a.lang.link(`privacy`)),cT(),nv(l_(10,12,`privacy.title`)),cT(2),Nm(`routerLink`,a.lang.link(`terms`)),cT(),nv(l_(13,14,`footer.terms`)))},dependencies:[_t$1,$t$2],styles:[`.site-footer[_ngcontent-%COMP%]{margin-top:4rem;padding:2rem 2vw 2.5rem;border-top:1px solid var(--%NS%catalog-frame-bg)}.footer-links[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem 1.5rem}.footer-link[_ngcontent-%COMP%]{color:var(--%NS%catalog-soft);font-size:.8125rem;letter-spacing:.04em;text-decoration:none}.footer-link[_ngcontent-%COMP%]:hover, .footer-link[_ngcontent-%COMP%]:focus-visible{color:var(--%NS%catalog-ink)}`]})}}return n})();var Qr=[`*`];var ms=[`content`];var hs=[[[`mat-drawer`],[`mat-sidenav`]],[[`mat-drawer-content`],[`mat-sidenav-content`]],`*`];var ps=[`mat-drawer, mat-sidenav`,`mat-drawer-content, mat-sidenav-content`,`*`];function us(n,i){if(n&1){let e=ib();as$2(0,`div`,1),jm(`click`,function(){of(e);return sf(fb()._onBackdropClicked())}),ou()}if(n&2)Qm(`mat-drawer-shown`,fb()._isShowingBackdrop())}function fs(n,i){n&1&&(as$2(0,`mat-drawer-content`),gb(1,2),ou())}var gs=new S$2(`MAT_DRAWER_DEFAULT_AUTOSIZE`,{providedIn:`root`,factory:()=>!1});var Wr=new S$2(`MAT_DRAWER_CONTAINER`);var Yt=(()=>{class n extends Qt$3{_platform=y$3(p$1);_changeDetectorRef=y$3(QV);_element=y$3(Jr$2);_ngZone=y$3(Ce$1);_isInert=!1;_container=y$3(Sn);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck())}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(cd(50),Lt$4(1)).subscribe(()=>this._updateInert())}):this._updateInert()}_drawerModeChanged(){this._updateInert()}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let t=this._element.nativeElement;this._isInert=e,e?t.setAttribute(`inert`,`true`):t.removeAttribute(`inert`)}}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:t}=this._container;return e!=null&&e.mode!==`over`&&e.opened||t!=null&&t.mode!==`over`&&t.opened}static ɵfac=(()=>{let e;return function(a){return(e||(e=uI(n)))(a||n)}})();static ɵcmp=YC({type:n,selectors:[[`mat-drawer-content`]],hostAttrs:[1,`mat-drawer-content`],hostVars:6,hostBindings:function(t,a){t&2&&(zm(`margin-left`,a._container._contentMargins.left,`px`)(`margin-right`,a._container._contentMargins.right,`px`),Qm(`mat-drawer-content-hidden`,a._shouldBeHidden()))},features:[e_([{provide:Qt$3,useExisting:n}]),gm],ngContentSelectors:Qr,decls:1,vars:0,template:function(t,a){t&1&&(hb(),gb(0))},encapsulation:2})}return n})();var kn=(()=>{class n{_elementRef=y$3(Jr$2);_focusTrapFactory=y$3(yn$3);_focusMonitor=y$3(kt$3);_platform=y$3(p$1);_ngZone=y$3(Ce$1);_renderer=y$3(Uc);_interactivityChecker=y$3(Ce$2);_doc=y$3(tn$3);_isAnimating=!1;_container=y$3(Wr,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e===`end`?`end`:`start`,e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position=`start`;get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next(),this._getContent()?._drawerModeChanged()}_mode=`over`;get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=vi$3(e)}_disableClose=!1;get autoFocus(){return this._autoFocus??(this.mode===`side`?`dialog`:`first-tabbable`)}set autoFocus(e){(e===`true`||e===`false`||e==null)&&(e=vi$3(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(vi$3(e))}_opened=ze$1(!1);_openedVia=null;_animationStarted=new ne$2;_animationEnd=new ne$2;openedChange=new tt$6(!0);_openedStream=this.openedChange.pipe(bn$3(e=>e),Ve$3(()=>{}));openedStart=this._animationStarted.pipe(bn$3(()=>this.opened),ea(void 0));_closedStream=this.openedChange.pipe(bn$3(e=>!e),Ve$3(()=>{}));closedStart=this._animationStarted.pipe(bn$3(()=>!this.opened),ea(void 0));_destroyed=new ne$2;onPositionChanged=new tt$6;_content;_modeChanged=new ne$2;_injector=y$3(ve$1);_changeDetectorRef=y$3(QV);constructor(){this.openedChange.pipe(By(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||`program`)}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return[e.listen(t,`keydown`,a=>{a.keyCode===27&&!this.disableClose&&!Le$1(a)&&this._ngZone.run(()=>{this.close(),a.stopPropagation(),a.preventDefault()})}),e.listen(t,`transitionend`,this._handleTransitionEvent),e.listen(t,`transitioncancel`,this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_focusByCssSelector(e,t){let a=this._elementRef.nativeElement.querySelector(e);a&&(this._interactivityChecker.isFocusable(a)||(a.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),l(),a.removeAttribute(`tabindex`)},o=this._renderer.listen(a,`blur`,r),l=this._renderer.listen(a,`mousedown`,r)})),a.focus(t))}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case`dialog`:return;case!0:case`first-tabbable`:Nl(()=>{let t=this._isAnimating?{preventScroll:!0}:void 0;!this._focusTrap.focusInitialElement(t)&&typeof e.focus==`function`&&e.focus(t)},{injector:this._injector});break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`);break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!==`dialog`&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position===`end`&&this._updatePositionInParent(`end`),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,`mouse`)}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let a=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||`program`);return e||(this._openedVia=null),a}_setOpen(e,t,a){return e===this.opened?Promise.resolve(e?`open`:`close`):(this._opened.set(e),this._getContent()?._drawerToggled(this),this._container?._transitionsEnabled?this._isAnimating?(this._setIsAnimating(!1),this._simulateAnimation()):(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):this._simulateAnimation(),this._elementRef.nativeElement.classList.toggle(`mat-drawer-opened`,e),!e&&t&&this._restoreFocus(a),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(r=>{this.openedChange.pipe(Lt$4(1)).subscribe(o=>r(o?`open`:`close`))}))}_getContent(){return this._container?._content||this._container?._userContent}_setIsAnimating(e){e!==this._isAnimating&&(this._isAnimating=e,this._elementRef.nativeElement.classList.toggle(`mat-drawer-animating`,e))}_simulateAnimation(){setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()})}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,a=t.parentNode;e===`end`?(this._anchor||(this._anchor=this._doc.createComment(`mat-drawer-anchor`),a.insertBefore(this._anchor,t)),a.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor)}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type===`transitionend`&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static ɵfac=function(t){return new(t||n)};static ɵcmp=YC({type:n,selectors:[[`mat-drawer`]],viewQuery:function(t,a){if(t&1&&Um(ms,5),t&2){let r;vb(r=yb())&&(a._content=r.first)}},hostAttrs:[1,`mat-drawer`],hostVars:12,hostBindings:function(t,a){t&2&&(Sm(`align`,null)(`tabIndex`,a.mode!==`side`?`-1`:null),zm(`visibility`,!a._container&&!a.opened?`hidden`:null),Qm(`mat-drawer-end`,a.position===`end`)(`mat-drawer-over`,a.mode===`over`)(`mat-drawer-push`,a.mode===`push`)(`mat-drawer-side`,a.mode===`side`))},inputs:{position:`position`,mode:`mode`,disableClose:`disableClose`,autoFocus:`autoFocus`,opened:`opened`},outputs:{openedChange:`openedChange`,_openedStream:`opened`,openedStart:`openedStart`,_closedStream:`closed`,closedStart:`closedStart`,onPositionChanged:`positionChanged`},exportAs:[`matDrawer`],ngContentSelectors:Qr,decls:3,vars:0,consts:[[`content`,``],[`cdkScrollable`,``,1,`mat-drawer-inner-container`]],template:function(t,a){t&1&&(hb(),as$2(0,`div`,1,0),gb(2),ou())},dependencies:[Qt$3],encapsulation:2})}return n})();var Sn=(()=>{class n{_dir=y$3(zn$1,{optional:!0});_element=y$3(Jr$2);_ngZone=y$3(Ce$1);_changeDetectorRef=y$3(QV);_animationDisabled=z$4();_transitionsEnabled=!1;_allDrawers;_drawers=new zi$2;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=vi$3(e)}_autosize=y$3(gs);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:vi$3(e)}_backdropOverride=null;backdropClick=new tt$6;_start=null;_end=null;_left=null;_right=null;_destroyed=new ne$2;_doCheckSubject=new ne$2;_contentMargins={left:null,right:null};_contentMarginChanges=new ne$2;get scrollable(){return this._userContent||this._content}_injector=y$3(ve$1);constructor(){let e=y$3(p$1),t=y$3(T$2);this._dir?.change.pipe(By(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),t.change().pipe(By(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add(`mat-drawer-transition`),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(hd(this._allDrawers),By(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(hd(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Ly(10),By(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode==`side`)e+=this._left._getWidth();else if(this._left.mode==`push`){let a=this._left._getWidth();e+=a,t-=a}}if(this._right&&this._right.opened){if(this._right.mode==`side`)t+=this._right._getWidth();else if(this._right.mode==`push`){let a=this._right._getWidth();t+=a,e-=a}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(By(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!==`side`&&e.openedChange.pipe(By(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(By(this._drawers.changes)).subscribe(()=>{Nl({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(By(Oy(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let t=this._element.nativeElement.classList,a=`mat-drawer-container-has-open`;e?t.add(a):t.remove(a)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position==`end`?(this._end,this._end=e):(this._start,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value===`rtl`?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!=`over`||this._isDrawerOpen(this._end)&&this._end.mode!=`over`}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!==`side`:this._backdropOverride}static ɵfac=function(t){return new(t||n)};static ɵcmp=YC({type:n,selectors:[[`mat-drawer-container`]],contentQueries:function(t,a,r){if(t&1&&Bm(r,Yt,5)(r,kn,5),t&2){let o;vb(o=yb())&&(a._content=o.first),vb(o=yb())&&(a._allDrawers=o)}},viewQuery:function(t,a){if(t&1&&Um(Yt,5),t&2){let r;vb(r=yb())&&(a._userContent=r.first)}},hostAttrs:[1,`mat-drawer-container`],hostVars:2,hostBindings:function(t,a){t&2&&Qm(`mat-drawer-container-explicit-backdrop`,a._backdropOverride)},inputs:{autosize:`autosize`,hasBackdrop:`hasBackdrop`},outputs:{backdropClick:`backdropClick`},exportAs:[`matDrawerContainer`],features:[e_([{provide:Wr,useExisting:n}])],ngContentSelectors:ps,decls:4,vars:2,consts:[[1,`mat-drawer-backdrop`,3,`mat-drawer-shown`],[1,`mat-drawer-backdrop`,3,`click`]],template:function(t,a){t&1&&(hb(hs),zw(0,us,1,2,`div`,0),gb(1),gb(2,1),zw(3,fs,2,0,`mat-drawer-content`)),t&2&&(Qw(a.hasBackdrop?0:-1),cT(3),Qw(a._content?-1:3))},dependencies:[Yt],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--%NS%mat-sidenav-content-text-color, var(--%NS%mat-sys-on-background));
  background-color: var(--%NS%mat-sidenav-content-background-color, var(--%NS%mat-sys-background));
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
  background-color: var(--%NS%mat-sidenav-scrim-color, color-mix(in srgb, var(--%NS%mat-sys-neutral-variant20) 40%, transparent));
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
  color: var(--%NS%mat-sidenav-container-text-color, var(--%NS%mat-sys-on-surface-variant));
  box-shadow: var(--%NS%mat-sidenav-container-elevation-shadow, none);
  background-color: var(--%NS%mat-sidenav-container-background-color, var(--%NS%mat-sys-surface));
  border-top-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  width: var(--%NS%mat-sidenav-container-width, 360px);
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
  border-top-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
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
  border-right-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
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
`],encapsulation:2})}return n})();var bs=[`*`,[[`mat-toolbar-row`]]];var _s=[`*`,`mat-toolbar-row`];var Cn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,selectors:[[`mat-toolbar-row`]],hostAttrs:[1,`mat-toolbar-row`],exportAs:[`matToolbarRow`]})}return n})();var Gr=(()=>{class n{_elementRef=y$3(Jr$2);_platform=y$3(p$1);_document=y$3(tn$3);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static ɵfac=function(t){return new(t||n)};static ɵcmp=YC({type:n,selectors:[[`mat-toolbar`]],contentQueries:function(t,a,r){if(t&1&&Bm(r,Cn,5),t&2){let o;vb(o=yb())&&(a._toolbarRows=o)}},hostAttrs:[1,`mat-toolbar`],hostVars:6,hostBindings:function(t,a){t&2&&(Ab(a.color?`mat-`+a.color:``),Qm(`mat-toolbar-multiple-rows`,a._toolbarRows.length>0)(`mat-toolbar-single-row`,a._toolbarRows.length===0))},inputs:{color:`color`},exportAs:[`matToolbar`],ngContentSelectors:_s,decls:2,vars:0,template:function(t,a){t&1&&(hb(bs),gb(0),gb(1,1))},styles:[`.mat-toolbar {
  background: var(--%NS%mat-toolbar-container-background-color, var(--%NS%mat-sys-surface));
  color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--%NS%mat-toolbar-title-text-font, var(--%NS%mat-sys-title-large-font));
  font-size: var(--%NS%mat-toolbar-title-text-size, var(--%NS%mat-sys-title-large-size));
  line-height: var(--%NS%mat-toolbar-title-text-line-height, var(--%NS%mat-sys-title-large-line-height));
  font-weight: var(--%NS%mat-toolbar-title-text-weight, var(--%NS%mat-sys-title-large-weight));
  letter-spacing: var(--%NS%mat-toolbar-title-text-tracking, var(--%NS%mat-sys-title-large-tracking));
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
  --%NS%mat-button-text-label-text-color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
  --%NS%mat-button-outlined-label-text-color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--%NS%mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--%NS%mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--%NS%mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--%NS%mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2})}return n})();var ys=[`light`,`dark`];var $r=(()=>{class n{constructor(){if(this.chosen=ze$1(bi$3(V$3.THEME,ys)),this.systemPrefersDark=ze$1(!1),this.theme=_t$5(()=>this.chosen()??(this.systemPrefersDark()?`dark`:`light`)),this.isDark=_t$5(()=>this.theme()===`dark`),typeof window>`u`||!window.matchMedia)return;let e=window.matchMedia(`(prefers-color-scheme: dark)`);this.systemPrefersDark.set(e.matches),e.addEventListener(`change`,t=>this.systemPrefersDark.set(t.matches))}toggle(){let e=this.isDark()?`light`:`dark`;this.chosen.set(e),Si$3(V$3.THEME,e),typeof document<`u`&&(document.documentElement.dataset.theme=e)}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵprov=de$3({token:n,factory:n.ɵfac,providedIn:`root`})}}return n})();var vs=n=>({years:n});var xs=(n,i)=>i.id;var ws=(n,i)=>i.code;function ks(n,i){n&1&&Rm(0)}function Ss(n,i){if(n&1&&(as$2(0,`button`,11)(1,`p`,24),Ub(2,`Juanma Moreno Sánchez`),ou()()),n&2)Nm(`routerLink`,fb().lang.link())}function Cs(n,i){if(n&1){let e=ib();as$2(0,`button`,25),jm(`click`,function(){of(e),fb();return sf(Ib(2).toggle())}),as$2(1,`mat-icon`),Ub(2,`menu`),ou()()}}function As(n,i){n&1&&Rm(0)}function Es(n,i){if(n&1&&vm(0,As,1,0,`ng-container`,9),n&2){fb();Nm(`ngTemplateOutlet`,Ib(13))}}function Ns(n,i){if(n&1&&(as$2(0,`button`,27),a_(1,`translate`),Ub(2),a_(3,`translate`),ou()),n&2){fb(2);Nm(`matMenuTriggerFor`,Ib(41)),Sm(`aria-label`,l_(1,3,`menu.generative`)),cT(2),uu(` `,l_(3,5,`menu.generative`),` `)}}function Ms(n,i){if(n&1&&(as$2(0,`button`,32)(1,`mat-icon`),Ub(2,`construction`),ou()()),n&2){fb(2);Nm(`matMenuTriggerFor`,Ib(15))}}function Ts(n,i){n&1&&(as$2(0,`a`,33),a_(1,`translate`),a_(2,`translate`),as$2(3,`mat-icon`),Ub(4,`person`),ou()()),n&2&&(Nm(`matTooltip`,l_(1,2,`menu.signIn`)),Sm(`aria-label`,l_(2,4,`menu.signIn`)))}function Is(n,i){if(n&1){let e=ib();as$2(0,`button`,26),Ub(1),a_(2,`translate`),ou(),zw(3,Ns,4,7,`button`,27),as$2(4,`button`,28),a_(5,`translate`),Ub(6),a_(7,`translate`),ou(),as$2(8,`button`,29),Ub(9,`CV`),ou(),as$2(10,`button`,28),a_(11,`translate`),Ub(12),a_(13,`translate`),ou(),as$2(14,`button`,28),a_(15,`translate`),Ub(16),a_(17,`translate`),ou(),as$2(18,`button`,30),a_(19,`translate`),a_(20,`translate`),jm(`click`,function(){of(e);return sf(fb().theme.toggle())}),as$2(21,`mat-icon`),Ub(22),ou()(),as$2(23,`button`,31),a_(24,`translate`),a_(25,`translate`),as$2(26,`mat-icon`),Ub(27,`language`),ou()(),zw(28,Ms,3,1,`button`,32)(29,Ts,5,6,`a`,33)}if(n&2){let e=fb(),t=Ib(27),a=Ib(45);Nm(`matMenuTriggerFor`,t),cT(),uu(` `,l_(2,21,`paintings`),` `),cT(2),Qw(e.generativePieces.length?3:-1),cT(),Nm(`routerLink`,e.lang.link(`about`)),Sm(`aria-label`,l_(5,23,`menu.about`)),cT(2),uu(` `,l_(7,25,`menu.about`),` `),cT(2),Nm(`routerLink`,e.lang.link(`cv`)),cT(2),Nm(`routerLink`,e.lang.link(`texts`)),Sm(`aria-label`,l_(11,27,`menu.texts`)),cT(2),uu(` `,l_(13,29,`menu.texts`),` `),cT(2),Nm(`routerLink`,e.lang.link(`contact`)),Sm(`aria-label`,l_(15,31,`menu.contact`)),cT(2),uu(` `,l_(17,33,`menu.contact`),` `),cT(2),Nm(`matTooltip`,l_(19,35,e.theme.isDark()?`theme.toLight`:`theme.toDark`)),Sm(`aria-label`,l_(20,37,e.theme.isDark()?`theme.toLight`:`theme.toDark`))(`aria-pressed`,e.theme.isDark()),cT(4),nv(e.theme.isDark()?`light_mode`:`dark_mode`),cT(),Nm(`matMenuTriggerFor`,a)(`matTooltip`,l_(24,39,`menu.language`)),Sm(`aria-label`,l_(25,41,`menu.language`)),cT(5),Qw(e.signedIn()?28:29)}}function Ds(n,i){if(n&1&&(as$2(0,`button`,22),Ub(1),ou()),n&2){let e=i.$implicit;Nm(`routerLink`,fb().lang.link(`artworks`))(`queryParams`,o_(4,vs,e)),Sm(`aria-label`,e),cT(),uu(` `,e,` `)}}function Ps(n,i){if(n&1&&(as$2(0,`button`,19),Ub(1),ou()),n&2){let e=i.$implicit;Nm(`routerLink`,fb().lang.link(`generative/`+e.id)),Sm(`aria-label`,e.label),cT(),uu(` `,e.label,` `)}}function Os(n,i){if(n&1){let e=ib();as$2(0,`button`,34),jm(`click`,function(){let a=of(e).$implicit;return sf(fb().selectLanguage(a.code))}),Ub(1),ou()}if(n&2){let e=i.$implicit,t=fb();Nm(`disabled`,e.code===t.activeLanguage),Sm(`aria-current`,e.code===t.activeLanguage?`true`:null),cT(),uu(` `,e.label,` `)}}var Kr=(()=>{class n$3{constructor(){this.artworkService=y$3(n$1),this.responsiveService=y$3(wt$2),this.translateService=y$3(H$1),this.router=y$3(ee),this.lang=y$3(G),this.auth=y$3(N$1),this.signedIn=_t$5(()=>this.auth.isAdmin()),this.theme=y$3($r),this.mobileMenu=P$3(this.responsiveService.displayMobileLayout),this.heroTitleVisible=y$3(c$1).visible,this.generativePieces=As$1,this.languages=[{code:n.SPANISH,label:`Espanol`},{code:n.ENGLISH,label:`English`}]}signOut(){this.auth.signOut()}get years(){return this.artworkService.getAvailableYears()}get activeLanguage(){return this.lang.carriesLanguage()?this.lang.inSpanish()?n.SPANISH:n.ENGLISH:this.translateService.currentLang()===n.SPANISH?n.SPANISH:n.ENGLISH}selectLanguage(e){if(e===this.activeLanguage)return;let t=this.router.url.split(`?`)[0].split(`#`)[0].replace(/^\/+|\/+$/g,``),a=t===`es`||t.startsWith(`es/`)?t.replace(/^es\/?/,``):t;if(S(e),!this.lang.carriesLanguage()){this.translateService.use(e);return}let r=e===n.SPANISH?`/es`:``;this.router.navigateByUrl(`${r}/${a}`.replace(/\/+$/,``)||`/`)}static{this.ɵfac=function(t){return new(t||n$3)}}static{this.ɵcmp=YC({type:n$3,selectors:[[`app-top-menu`]],decls:48,vars:17,consts:[[`drawer`,``],[`menuButtons`,``],[`adminMenu`,`matMenu`],[`paintingMenu`,`matMenu`],[`yearsMenu`,`matMenu`],[`generativeMenu`,`matMenu`],[`languageMenu`,`matMenu`],[`mode`,`over`,`position`,`end`,1,`drawer`],[1,`drawer-content`],[4,`ngTemplateOutlet`],[`color`,`primary`],[`aria-label`,`Juanma Moreno Sánchez`,`mat-button`,``,3,`routerLink`],[1,`spacer`],[`aria-expanded`,`false`,`aria-controls`,`menu`,`mat-icon-button`,``,`aria-label`,`Toggle menu`],[`mat-menu-item`,``,`routerLink`,`/studio`],[`mat-menu-item`,``,`routerLink`,`/publish`],[`mat-menu-item`,``,`routerLink`,`/pendingmint`],[`mat-menu-item`,``,`routerLink`,`/latest`],[`mat-menu-item`,``,`type`,`button`,3,`click`],[`mat-menu-item`,``,3,`routerLink`],[`mat-menu-item`,``,3,`matMenuTriggerFor`],[1,`years-menu`],[`mat-menu-item`,``,3,`routerLink`,`queryParams`],[`mat-menu-item`,``,3,`disabled`],[1,`catalog-heading`,`brand`],[`aria-expanded`,`false`,`aria-controls`,`menu`,`mat-icon-button`,``,`aria-label`,`Toggle menu`,3,`click`],[`x`,``,`mat-button`,``,3,`matMenuTriggerFor`],[`mat-button`,``,3,`matMenuTriggerFor`],[`mat-button`,``,3,`routerLink`],[`aria-label`,`CV`,`mat-button`,``,3,`routerLink`],[`mat-icon-button`,``,`type`,`button`,1,`bar-setting`,`theme-toggle`,3,`click`,`matTooltip`],[`mat-icon-button`,``,1,`bar-setting`,`language-menu`,3,`matMenuTriggerFor`,`matTooltip`],[`mat-icon-button`,``,`matTooltip`,`Admin`,`aria-label`,`Admin`,1,`bar-setting`,`studio-session`,3,`matMenuTriggerFor`],[`mat-icon-button`,``,`routerLink`,`/door`,1,`bar-setting`,`studio-session`,3,`matTooltip`],[`mat-menu-item`,``,3,`click`,`disabled`]],template:function(t,a){if(t&1&&(as$2(0,`mat-drawer-container`)(1,`mat-drawer`,7,0)(3,`div`,8),vm(4,ks,1,0,`ng-container`,9),ou()(),as$2(5,`mat-drawer-content`)(6,`mat-toolbar`,10)(7,`mat-toolbar-row`),zw(8,Ss,3,1,`button`,11),xm(9,`span`,12),zw(10,Cs,3,0,`button`,13)(11,Es,1,1,`ng-container`),ou()()()(),vm(12,Is,30,43,`ng-template`,null,1,f_),as$2(14,`mat-menu`,null,2)(16,`a`,14),Ub(17,`Studio`),ou(),as$2(18,`a`,15),Ub(19,`Reels waiting`),ou(),as$2(20,`a`,16),Ub(21,`Certificates waiting`),ou(),as$2(22,`a`,17),Ub(23,`Latest IG posts`),ou(),as$2(24,`button`,18),jm(`click`,function(){return a.signOut()}),Ub(25,`Sign out`),ou()(),as$2(26,`mat-menu`,null,3)(28,`button`,19),a_(29,`translate`),Ub(30),a_(31,`translate`),ou(),as$2(32,`button`,20),a_(33,`translate`),Ub(34),a_(35,`translate`),ou()(),as$2(36,`mat-menu`,21,4),Kw(38,Ds,2,6,`button`,22,Zw),ou(),as$2(40,`mat-menu`,null,5),Kw(42,Ps,2,3,`button`,19,xs),ou(),as$2(44,`mat-menu`,null,6),Kw(46,Os,2,3,`button`,23,ws),ou()),t&2){let r=Ib(13),o=Ib(37);cT(4),Nm(`ngTemplateOutlet`,r),cT(4),Qw(a.heroTitleVisible()?-1:8),cT(2),Qw(a.mobileMenu()?11:10),cT(18),Nm(`routerLink`,a.lang.link(`artworks`)),Sm(`aria-label`,l_(29,9,`menu.allPaintings`)),cT(2),uu(` `,l_(31,11,`menu.allPaintings`),` `),cT(2),Nm(`matMenuTriggerFor`,o),Sm(`aria-label`,l_(33,13,`menu.byYear`)),cT(2),uu(` `,l_(35,15,`menu.byYear`),` `),cT(4),Jw(a.years),cT(4),Jw(a.generativePieces),cT(4),Jw(a.languages)}},dependencies:[Gr,Cn,ar$2,_t$1,Pn$1,Et,qt$4,Sn,Yt,kn,Ot$3,P$1,q$2,rt$2,$t$2],styles:[`mat-toolbar-row[_ngcontent-%COMP%]{flex-wrap:wrap;height:auto;min-height:var(--%NS%mat-toolbar-standard-height, 4rem);row-gap:.25rem;padding-top:.5rem;padding-bottom:.5rem}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.brand[_ngcontent-%COMP%]{color:inherit;font-size:1.1rem;font-weight:400;margin:0}.drawer[_ngcontent-%COMP%]{position:fixed!important;top:0;right:0;bottom:0;height:100vh;width:min(40vw,200px);z-index:500}  .mat-drawer-backdrop{position:fixed!important;inset:0;z-index:499}.drawer-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1rem 0;gap:.25rem}.drawer-content[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]{justify-content:flex-start;width:100%;padding-left:1.5rem;padding-right:1.5rem}.drawer-content[_ngcontent-%COMP%]   .theme-toggle[_ngcontent-%COMP%]{align-self:flex-start;margin-left:.9rem}.bar-setting[_ngcontent-%COMP%]{width:36px;height:36px;padding:6px}.bar-setting[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px;line-height:20px}`]})}}return n$3})();var Yr=`https://juanmamoreno.com`;var Zr=(()=>{class n{#e=y$3(tn$3);#t=y$3(ee);init(){this.#t.events.pipe(bn$3(e=>e instanceof j$2)).subscribe(e=>this.#i(e.urlAfterRedirects))}#i(e){let t=e.split(/[?#]/)[0],a=`${Yr}${t===`/`?``:t.replace(/\/$/,``)}`||Yr,r=this.#e.head.querySelector(`link[rel="canonical"]`);r||(r=this.#e.createElement(`link`),r.setAttribute(`rel`,`canonical`),this.#e.head.appendChild(r)),r.setAttribute(`href`,a)}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵprov=Kr$2({token:n,factory:n.ɵfac})}}return n})();var Jr={"Oil on wood":`Oil on wood`,"Oil on canvas":`Oil on canvas`,"Watercolor on paper":`Watercolor on paper`,sold:`Art piece sold`,soldLegend:`A red dot marks a piece that has been sold.`,nothingMatched:`No paintings match the filters above.`,moreOn:`More on`,year:{label:`Year`,all:`All`},availability:{label:`Availability`,both:`All`,sold:`Sold`,available:`Available`,remove:`Remove the availability filter`},paintings:`Paintings`,submit:`Submit`,close:`Close`,cancel:`Cancel`,back:`Back`,next:`Next`,footer:{label:`Elsewhere and small print`,terms:`Terms`},generative:{notFound:`This generative piece was not found.`},home:{tagline:`Contemporary painting and software`},menu:{allPaintings:`All paintings`,generative:`Generative`,about:`Statement`,contact:`Contact`,byYear:`By Year`,texts:`Texts`,language:`Language`,signIn:`Sign in`},traits:{medium:`Medium`,keight:`Height`,width:`Width`,unit:`Unit`,year:`Year`,imgTypr:`Image Type`,artist:`Artist`,project:`Project`,descAuthor:`Description Author`,descLang:`Description language`},viewTypes:{frontal:`Frontal view`,progreso:`Work in progress`,detail:`Detail view`},skipToContent:`Skip to content`,sortBy:`Sort by`,sortMethod:{year:`Year`,size:`Size`,medium:`Medium`},theme:{toDark:`Switch to dark`,toLight:`Switch to light`},contact:{title:`Contact`,representedBy:`Currently represented by <a href='https://galeriazunino.com/' target='_blank'>Zunino Gallery</a> (Sevilla)`,contactText:`If you want to contact me, use the form bellow and I will get back to you soon. You can also follow me on <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a> to stay on the loop.`,name:`Name`,email:`Email`,emailPlaceholder:`email@example.com`,message:`Message`,messagePlaceholder:`I'm interested in...`},quote:{askPrice:`Ask price`,askInfo:`Ask about this piece`,priceTitle:`Request a price`,infoTitle:`Ask about this piece`,priceIntro:`Interested in this piece? Leave your email and I'll get back to you with the price and details.`,infoIntro:`This piece isn't available, but I may be able to tell you where it is, how to see it, or who you can buy it from. Leave your email and I'll get back to you.`,messageLabel:`Message (optional)`,messagePlaceholder:`Anything you'd like to add...`,success:`Thanks! I'll get back to you soon.`},share:{share:`Share this painting`,copyLink:`Copy link to this painting`,copied:`Link copied`},viewer:{previous:`Previous`,next:`Next`,fullscreen:`Fullscreen`,exitFullscreen:`Exit fullscreen`,hintArrows:`← → to move between views`,hintFullscreen:`Double-click for fullscreen, Esc to leave`},dossier:{title:`Dossier options`,includeContact:`Include contact info`,includeCv:`Include CV`,includeStatement:`Include Statement`,customTitle:`Custom title`,customTitlePlaceholder:`Enter a title`,customText:`Custom text`,customTextPlaceholder:`Add custom text`},error:{noValue:`You must enter a value`,invalidEmail:`Not a valid email`,tooLong:`Too long`,submissionFailed:`Something went wrong sending your message. Please try again later.`},cv:{shortBio:`Alcalá la Real (Jaén, Spain), 1986. Based in Madrid (Spain)`,shows:{title:`Solo shows`},collectiveShows:{title:`Collective exhibitions (selection)`},awards:{title:`Artistic awards and residencies (selection)`,lefranc:`Lefranc&Bourgueois art award`,fag:`<a href='http://www.fundacionantoniogala.org/' target='blank'>Antonio Gala Foundation Residence Program</a>`},conferences:{title:`Conferences`,unia:`<a href='https://www.unia.es/' target='blank'>International University of Andalucia</a>`,"invierno-ia":`<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>Towards a New AI Winter</a>`},education:{title:`Education`,degree:`Bachelor on arts degree`,ugr:`<a href='http://bellasartes.ugr.es/' target='blank'>University of Granada`,erasmus:`LLP Erasmus Scholarship`,burg:`<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule für Kunst und Design</a>`},zunino:`<a href='https://galeriazunino.com/' target='_blank'>Zunino gallery</a>`,countries:{online:`Online`,spain:`Spain`,usa:`USA`,germany:`Germany`,mexico:`Mexico`,italy:`Italy`},placeLine:`Alcalá la Real (Jaén), 1986. Lives in Madrid. Represented by Galería Zunino (Seville).`,proseDownload:`Download the biography`,proseWrite:`Write the biography`,proseRewrite:`Write it again`,proseWritten:`The biography has been written.`,proseFailed:`The biography could not be written.`,proseInDossier:`Biography instead of the list`},statement:{title:`Statement`,introduction:{content:`Nearly all my paintings begin on a screen and end on canvas. There is a reason for that: I belong to the last generation, the millennials, that studied without screens, with paper and pen, and then had to make its way in a digital environment. The same doubleness runs through my working life. I divide my time between the craft of art and the design and development of software, the most ethereal of the crafts.`},painting:{title:`Painting`,limits:`Painting is a practice as old as humanity itself. And a painter can work a surface as much as he wants; painting’s only limits are space and time. In theory those are infinite resources, but from a human point of view they are finite: the space we can take in, and the time of one life.`,recontextualising:`Giving time and space to an image that originally had neither (a scroll is not a physical place, and the time given to an image there is minimal) changes its meaning completely. In giving it that time, that importance, you recontextualise the image, and open up the chance of finding new meanings in it. The craft itself does the same work: a casual moment fixed in oil takes on another dimension.`,rule:`As a general rule, the larger the work and the more time given to it, the better.`},images:{title:`Decontextualised images`,found:`For years I found them by chance on the internet, which was already a more or less infinite visual world before generative AI arrived. Between 2019 and 2023 I began using neural networks (StyleGAN, BigBiGAN) while they still “failed” considerably. That margin of error, the so-called “loss”, produced monsters no human could have come up with. My interest in painting them comes out of that fascination. Those tools have since reached a formal competence that interests me a good deal less: because they get it right too often. AI since 2023 is boring for being predictable, in the same way a predictable conversation or a predictable book is boring. The better it gets, the worse. The so-called “AI slop” floods our daily lives with images that are all alike and have no character whatsoever.`,accident:`“No mistakes, just happy accidents”, as Bob Ross used to say. What serves an artist is the accident, the singular. The software that deforms an image until it aberrates. Failure is working material.`},failure:{title:`Failure`,content:`“I have done many things because I have failed at all of them. I start from failure as one of the Fine Arts.” The line is from the multifaceted Pepín Tre, and it explains fairly well why I end up in such different techniques and registers. Genius and inspiration are comfortable clichés long past their sell-by date; what actually pushes you to try something else is the last thing having failed. Success, real or perceived, is paralysing. Or so I want to believe.`}},download:{cv:`Generate and download CV`,statement:`Generate and download Statement`,sheet:`Generate and download technical sheet`,portfolio:`Generate and download portfolio`,hd:`Download high resolution image`,success:`Download ready`,error:`Could not generate the file`,full:`Full resolution`,medium:`Medium resolution`},links:{view:`View where this artwork appears on the Internet`,title:`Appearances of the artwork on the Internet`},critic:{edited:`edited`,notEdited:`not edited`,edit:`Edit this text`,editingTitle:`The heading, as it appears above the essay.`,editing:`The essay, in markdown. Saved as written.`,save:`Save`,saving:`Saving…`,cancel:`Cancel`,saveFailed:`That could not be saved. What you wrote is still here.`},seo:{default:{description:`Contemporary art — oil painting, watercolour, drawings and generative art — by the artist Juanma Moreno Sánchez.`},paintings:{title:`Paintings`,description:`Oil paintings, watercolours and works on paper by the artist Juanma Moreno Sánchez.`},artwork:{title:`Artwork`},artworkBy:`Original artwork by Juanma Moreno Sánchez.`,generative:{title:`Generative`,description:`Interactive generative artwork by Juanma Moreno Sánchez, drawn live in the browser.`},cv:{title:`CV`,description:`Exhibitions, awards, residencies and biography of the artist Juanma Moreno Sánchez.`},about:{title:`Statement`,description:`Artist statement — the ideas and themes behind the work of Juanma Moreno Sánchez.`},contact:{title:`Contact`,description:`Get in touch with the artist Juanma Moreno Sánchez.`},terms:{title:`Terms of Service`,description:`Terms of service for juanmamoreno.com.`},privacy:{title:`Privacy Policy`,description:`Privacy policy for juanmamoreno.com — no cookies, no third-party trackers.`},notFound:{title:`Page not found`},texts:{title:`Texts`,description:`Criticism, interviews and press about the painter Juanma Moreno Sánchez.`},project:{title:`Owning this product`,description:`How a two-repository product is specified, decided and kept honest: 147 requirements, each with a proof, and a build that fails when one stops being true.`}},privacy:{title:`Privacy`,noBanner:`No cookie banner here — you know why? Because we don't use any.`,noTracking:`We honestly don't care about tracking you: not what you click, not where you go, not how long you stay.`,noThirdParty:`No third-party cookies, no analytics, no ad networks — nothing following you around the web.`,localOnly:`The only thing we keep on your device is a local copy of the gallery so it loads faster next time. It never leaves your browser and identifies no one.`,contactUse:`If you write to us through the contact form, we use your message for one thing only: to reply.`},terms:{title:`Terms of Service`,intro:`By using this site, you agree to the following:`,portfolio:`This is simply the artist's portfolio site: it shows the work and lets you get in touch.`,noData:`We do not collect or store any personal information.`,publicContent:`All content shown here is public.`,ownRisk:`Use of this site is at your own risk. We are not responsible for any misuse of the content.`,changes:`We may update these terms at any time without notice.`},notFound:{title:`404 — Page not found`,message:`Oops! The page you are looking for does not exist. Try one of these instead:`},texts:`Texts`,latest:`Latest`,latestPage:{intro:`The paintings most recently shown on Instagram, newest first. Each one leads to its own page — the other views of it, its size, what has been written about it.`,onInstagram:`See the post`,nothingYet:`Nothing has been posted yet.`},textsPage:{intro:`Writing about the work, published elsewhere. Each entry links to the original: these pieces belong to the people who wrote them and the outlets that ran them.`,kind:{essay:`Curatorial text`,press:`Press`,interview:`Interview`,review:`Review`},salanova:{note:`The curatorial text for El Valle Inquietante at Zunino Gallery.`},abc:{note:`A column on artists who were working with artificial intelligence years before it became common.`},selfie:{note:`An interview on painting, the internet and the images a generation makes of itself.`},achtung:{note:`A review of the Zunino show of fifteen paintings from a decade of work, on how the artist treats the gestures and viral images of social media as modern rituals — somewhere between the mystical and the absurd.`}},certificate:{title:`Certificate of authenticity`,recordedOn:`The artist irreversibly recorded this painting on Ethereum on {{date}}: its title, medium, size, year and a photograph are written into the chain itself and not linked from it, so the record outlives this website, the painting, and the artist himself.`,recorded:`The artist irreversibly recorded this painting on Ethereum: its title, medium, size, year and a photograph are written into the chain itself and not linked from it, so the record outlives this website, the painting, and the artist himself.`,token:`Certificate`,contract:`Contract`,transaction:`Transaction`,view:`View on Etherscan`,download:`Download the certificate`,pdfHeading:`Certificate of authenticity`},project:{title:`Owning this product`,lead:`I am a developer, tech lead and designer who moved to the side of the table where the decisions are made. This is the product I own: a working painter’s public catalogue, and the private pipeline that feeds it. Every requirement in it says why it exists and what proves it still works — and the build fails when a proof stops being true.`,figures:{requirements:`requirements, each with a reason and a proof`,releases:`releases, one line each, newest first`,unproven:`of them honest about having no automated proof`,operator:`person operates the whole thing`},product:{title:`What the product is`,a:`A catalogue of 192 paintings, written out as 400 static pages in English and Spanish, so every one of them is readable with no JavaScript at all. Behind it, a service prepares photographs, drafts and translates an essay for each painting, renders video for social networks, and records each work on Ethereum.`,b:`One person operates it. That constraint decides everything on this page: there is no team to absorb a bad call, no QA to catch a regression, and nothing may require a human at three in the morning.`},rot:{title:`Requirements that cannot quietly rot`,a:`A changelog is a record of the past and cannot become false. A requirements document is a claim about the present, and it can — quietly, and usually does.`,b:`So every entry names the thing that proves it. A script reads the file before each deploy and refuses the build if a number is used twice, if an entry has no proof, if a proof names a file that has been deleted, or if it quotes a test that has since been renamed.`,c:`It exists because four requirements spent fifteen releases marked “met · proven by” test specs that had been deleted several versions earlier. Nobody lied. Nobody noticed. That is the failure a requirements document is supposed to prevent and the one it is worst at preventing.`,d:`It also reports — without failing the build — the requirements whose only proof is prose. Twenty-five of the site’s hundred and one are on that list. This page says so because the tool says so.`},decisions:{title:`Decisions, with what they cost`,chose:`Chose`,instead:`Instead of`,cost:`Which costs`,prices:{name:`Publish no prices at all`,chose:`An enquiry, answered by the artist`,instead:`A public price list, or a figure on request`,cost:`Friction for a buyer who wants a number now. A published price is also an anchor far easier to set than to move. There is a test that fails if a price ever appears in the markup.`},model:{name:`The cheaper model writes the essays`,chose:`The model that costs about a fifth as much per essay`,instead:`The better writer, measured at three to four times the price`,cost:`Prose that needs more editing. The better path and its fallback were kept, so reversing the decision is one variable rather than a rewrite.`},reel:{name:`A video every night — which solved the wrong end`,chose:`Doubling how often a video is produced`,instead:`Looking at what happened to the ones already made`,cost:`Nothing, and that is the point: six finished videos were waiting on a human and exactly one had ever been published. The constraint was downstream the whole time. Worth more on this page than a decision that went well.`},freeze:{name:`Nothing irreversible happens without being asked`,chose:`Asking every time, and reading silence as no`,instead:`A setting, or a confirmation people learn to click through`,cost:`A question the operator will answer hundreds of times. Some records on this product cannot be unmade; a prompt is cheaper than any of them.`},key:{name:`No signing key on the server`,chose:`Signing each record by hand, on a phone`,instead:`Automatic signing, which the pipeline could do unattended`,cost:`A manual step per record, and a queue that waits for it. A server that cannot sign cannot be made to sign by anyone who reaches it.`}},measured:{title:`Measured, not argued`,a:`The brief for the essays was rewritten this month from evidence rather than taste. Twenty-two essays had been rewritten by hand before publishing; a hundred and thirty-six had not. Measured against each other, the edited ones ran 188 to 633 words, median 442. The untouched ones ran 613 to 874, median 748. The ranges barely overlap — and nothing else about them differed: the same sentence length, the same structure, the same argument. The brief had been asking for 650 to 900 words. It now asks for 380 to 560.`,b:`An earlier decision was corrected the same way. A search feature re-ran on every read, so a build of 186 pages was 186 billed calls to a paid API, and a few days of building came to roughly ninety euros before anyone read the meter. The feature stopped doing that, and a check now fails any build that reaches a paid API at all — the cost cannot recur by accident.`},constraint:{title:`Finding the real constraint`,a:`157 essays written. 20 reviewed. Only a reviewed essay can be published, so everything upstream is automated and producing while everything downstream waits on one human step — and the work had been going into making the upstream faster.`,b:`Noticing that, and saying it out loud instead of shipping the next feature, is the job.`},open:{title:`What is still open`,a:`The review queue that would unblock all of it is designed and not built.`,b:`137 finished essays are unread, which means unpublished.`,c:`Twenty-five requirements have no automated proof and are listed on every build.`},how:{title:`How this is built, plainly`,a:`Most of the code here is written by an AI agent, working to a specification I write and a review I do. That is the point rather than a footnote.`,b:`An agent will happily let a requirement rot, an abstraction spread, a cost run or a feature arrive that nobody asked for. The requirements file, the named proofs and the checks that fail a build are what make working this way safe. My part is deciding what gets built, why, in what order, and what is not worth doing — and being able to show the reasoning afterwards.`},links:{title:`The evidence`,repo:`The source, public`,requirements:`The requirements file`,changelog:`The changelog`,site:`The product itself`,note:`The service behind the catalogue is in a private repository and is deliberately not linked or described here.`}}};var Xr={"Oil on wood":`Óleo sobre madera`,"Oil on canvas":`Óleo sobre tela`,"Watercolor on paper":`Acuarela sobre papel`,sold:`Pieza vendida`,soldLegend:`El punto rojo señala una pieza vendida.`,nothingMatched:`Ninguna pieza coincide con los filtros de arriba.`,moreOn:`Más de`,year:{label:`Año`,all:`Todos`},availability:{label:`Disponibilidad`,both:`Todas`,sold:`Vendidas`,available:`Disponibles`,remove:`Quitar el filtro de disponibilidad`},paintings:`Pinturas`,submit:`Enviar`,close:`Cerrar`,cancel:`Cancelar`,back:`Volver`,next:`Siguiente`,footer:{label:`En otros sitios y letra pequeña`,terms:`Términos`},generative:{notFound:`No se encontró esta pieza generativa.`},home:{tagline:`Pintura contemporánea y software`},menu:{allPaintings:`Todas las pinturas`,generative:`Generativo`,about:`Statement`,contact:`Contacto`,byYear:`Por año`,texts:`Textos`,language:`Idioma`,signIn:`Entrar`},traits:{medium:`Técnica`,keight:`Altura`,width:`Ancho`,unit:`Unidad`,year:`Año`,imgTypr:`Tipo de imagen`,artist:`Artista`,project:`Proyecto`,descAuthor:`Autor de la descripción`,descLang:`Lenguage de la descripción`},viewTypes:{frontal:`Vista frontal`,progreso:`En progreso`,detail:`Vista de detalle`},skipToContent:`Ir al contenido`,sortBy:`Ordenar por`,sortMethod:{year:`Año`,size:`Tamaño`,medium:`Técnica`},theme:{toDark:`Cambiar a modo oscuro`,toLight:`Cambiar a modo claro`},contact:{title:`Contacto`,representedBy:`Representado por la <a href='https://galeriazunino.com/' target='_blank'>Galería Zunino </a> (Sevilla)`,contactText:`Si quieres contactar conmigo, usa el formulario debajo. También puedes seguirme en <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a>.`,name:`Nombre`,email:`Email`,emailPlaceholder:`email@ejemplo.com`,message:`Mensaje`,messagePlaceholder:`Me interesa...`},quote:{askPrice:`Preguntar precio`,askInfo:`Preguntar por esta obra`,priceTitle:`Solicitar precio`,infoTitle:`Preguntar por esta obra`,priceIntro:`¿Te interesa esta obra? Déjame tu email y te responderé con el precio y los detalles.`,infoIntro:`Esta obra no está disponible, pero quizá pueda decirte dónde está, cómo verla o a quién comprársela. Déjame tu email y te responderé.`,messageLabel:`Mensaje (opcional)`,messagePlaceholder:`Lo que quieras añadir...`,success:`¡Gracias! Te responderé pronto.`},share:{share:`Compartir esta pieza`,copyLink:`Copiar el enlace a esta pieza`,copied:`Enlace copiado`},viewer:{previous:`Anterior`,next:`Siguiente`,fullscreen:`Pantalla completa`,exitFullscreen:`Salir de pantalla completa`,hintArrows:`← → para pasar entre vistas`,hintFullscreen:`Doble clic para pantalla completa, Esc para salir`},dossier:{title:`Opciones del dossier`,includeContact:`Incluir datos de contacto`,includeCv:`Incluir CV`,includeStatement:`Incluir statement`,customTitle:`Título personalizado`,customTitlePlaceholder:`Escribe un título`,customText:`Texto personalizado`,customTextPlaceholder:`Añade un texto personalizado`},error:{noValue:`Debes escribir algo`,invalidEmail:`Email inválido`,tooLong:`Demasiado largo`,submissionFailed:`Algo salió mal al enviar tu mensaje. Inténtalo de nuevo más tarde.`},cv:{shortBio:`Alcalá la Real (Jaén), 1986. Reside en Madrid.`,shows:{title:`Exposiciones individuales`},collectiveShows:{title:`Exposiciones colectivas (selección)`},conferences:{title:`Conferencias`,unia:`<a href='https://www.unia.es/' target='blank'>Universidad Internacional de Andalucía</a>`,"invierno-ia":`<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>¿Hacia un nuevo invierno de la IA?</a>`},awards:{title:`Premios y becas (selección)`,lefranc:`Becas Lefranc&Bourgueois`,fag:`<a href='http://www.fundacionantoniogala.org/' target='blank'>Fundación Antonio Gala para jóvenes creadores</a>`},education:{title:`Educacion`,degree:`Licenciado en Bellas Artes`,ugr:`<a href='http://bellasartes.ugr.es/' target='blank'>Universidad de Granada`,erasmus:`Beca LLP Erasmus`,burg:`<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule für Kunst und Design</a>`},zunino:`<a href='https://galeriazunino.com/' target='_blank'>Galería Zunino</a>`,countries:{online:`Online`,spain:`España`,usa:`USA`,germany:`Alemania`,mexico:`México`,italy:`Italia`},placeLine:`Alcalá la Real (Jaén), 1986. Reside en Madrid. Representado por la Galería Zunino (Sevilla).`,proseDownload:`Descargar la biografía`,proseWrite:`Escribir la biografía`,proseRewrite:`Escribirla de nuevo`,proseWritten:`La biografía ya está escrita.`,proseFailed:`No se ha podido escribir la biografía.`,proseInDossier:`Biografía en vez de la lista`},statement:{title:`Statement`,introduction:{content:`Casi todas mis pinturas empiezan en una pantalla y terminan en un lienzo, por algo soy de la última generación (la milenial) que estudió sin pantallas, con papel y bolígrafo, aunque luego haya tenido que buscarse la vida en un entorno digital. Esta dualidad también se da en lo laboral; reparto el tiempo entre la artesanía del arte y el diseño y desarrollo de software, la más etérea de las artesanías.`},painting:{title:`La pintura`,limits:`La pintura es una práctica tan vieja como la propia humanidad. Y un pintor puede trabajar una superficie tanto como quiera; los únicos límites de la pintura son el espacio y el tiempo. Estos son recursos infinitos en teoría pero finitos desde el punto de vista humano (el espacio que podemos abarcar y el tiempo de una vida).`,recontextualising:`Dedicar tiempo y espacio a una imagen que originalmente no lo tiene (un scroll no es un lugar físico, y el tiempo que se le dedica es mínimo) cambia su significado por completo. Al darle ese tiempo, esa importancia, estás recontextualizando la imagen, dando la oportunidad de encontrar nuevos significados. La propia artesanía hace ese mismo trabajo: un momento casual fijado al óleo toma otra dimensión.`,rule:`Como norma general, cuanto más grande la obra y más tiempo se le dedique, tanto mejor.`},images:{title:`Las imágenes descontextualizadas`,found:`Durante años las encontraba por casualidad en internet, que ya era un mundo visual prácticamente infinito antes de que llegaran las IAs generativas. Entre 2019 y 2023 empecé a usar redes neuronales (StyleGAN, BigBiGAN) cuando todavía “fallaban” considerablemente. Ese margen de error, el llamado “loss”, producía monstruos que no se le podrían haber ocurrido a ningún humano. Fruto de esa fascinación viene mi interés por pintarlas. Hoy esas herramientas han alcanzado una suficiencia formal que me interesa bastante menos: porque aciertan demasiado. La IA desde 2023 es aburrida por lo predecible, del mismo modo que es aburrida una conversación predecible o un libro predecible. Cuanto mejor, peor. El llamado “AI slop” inunda nuestra vida diaria de imágenes uniformes y carentes de toda personalidad.`,accident:`“No mistakes, just happy accidents”, que decía Bob Ross. Lo que sirve al artista es el accidente, lo singular. El software que deforma una imagen hasta que aberra. El fallo es material de trabajo.`},failure:{title:`El fracaso`,content:`«He hecho muchas cosas porque he fracasado en todas ellas. Parto del fracaso como una de las Bellas Artes.» La cita es del polifacético Pepín Tre y explica bastante bien por qué acabo metido en técnicas y registros tan distintos. El genio y la inspiración son clichés cómodos y caducadísimos; lo que de verdad empuja a probar otra cosa es que la anterior fracase. El éxito, real o percibido, paraliza. O eso quiero creer yo.`}},download:{cv:`Generar y descargar CV`,statement:`Generar y descargar statement`,sheet:`Generar y descargar ficha técnica`,portfolio:`Generar y descargar dossier`,hd:`Descargar imagen en alta resolución`,success:`Descarga lista`,error:`No se pudo generar el archivo`,full:`Resolución completa`,medium:`Resolución media`},links:{view:`Ver repercusión de la pieza en Internet`,title:`Apariciones de la pieza en Internet`},critic:{edited:`editada`,notEdited:`sin editar`,edit:`Editar este texto`,editingTitle:`El título, tal y como aparece sobre el texto.`,editing:`El ensayo, en markdown. Se guarda tal cual.`,save:`Guardar`,saving:`Guardando…`,cancel:`Cancelar`,saveFailed:`No se ha podido guardar. Lo que has escrito sigue aquí.`},seo:{default:{description:`Arte contemporáneo — pintura al óleo, acuarela, dibujo y arte generativo — del artista Juanma Moreno Sánchez.`},paintings:{title:`Pinturas`,description:`Pinturas al óleo, acuarelas y obra sobre papel del artista Juanma Moreno Sánchez.`},artwork:{title:`Obra`},artworkBy:`Obra original de Juanma Moreno Sánchez.`,generative:{title:`Generativo`,description:`Arte generativo interactivo de Juanma Moreno Sánchez, generado en el navegador.`},cv:{title:`CV`,description:`Exposiciones, premios, residencias y biografía del artista Juanma Moreno Sánchez.`},about:{title:`Statement`,description:`Statement del artista — las ideas y los temas detrás de la obra de Juanma Moreno Sánchez.`},contact:{title:`Contacto`,description:`Ponte en contacto con el artista Juanma Moreno Sánchez.`},terms:{title:`Términos del servicio`,description:`Términos del servicio de juanmamoreno.com.`},privacy:{title:`Privacidad`,description:`Política de privacidad de juanmamoreno.com — sin cookies ni rastreadores de terceros.`},notFound:{title:`Página no encontrada`},texts:{title:`Textos`,description:`Crítica, entrevistas y prensa sobre el pintor Juanma Moreno Sánchez.`},project:{title:`Cómo dirijo este producto`,description:`Cómo se especifica, se decide y se mantiene honesto un producto de dos repositorios: 147 requisitos, cada uno con su prueba, y una compilación que falla cuando una deja de ser cierta.`}},privacy:{title:`Privacidad`,noBanner:`Aquí no hay banner de cookies, ¿sabes por qué? Porque no usamos ninguna.`,noTracking:`De verdad que no nos importa rastrearte: ni lo que clicas, ni por dónde te mueves, ni cuánto te quedas.`,noThirdParty:`Sin cookies de terceros, sin analíticas, sin redes de anuncios — nada que te siga por la web.`,localOnly:`Lo único que guardamos en tu dispositivo es una copia local de la galería para que cargue más rápido la próxima vez. Nunca sale de tu navegador y no identifica a nadie.`,contactUse:`Si nos escribes desde el formulario de contacto, usamos tu mensaje para una sola cosa: responderte.`},terms:{title:`Términos del servicio`,intro:`Al usar este sitio, aceptas lo siguiente:`,portfolio:`Esto es simplemente el portfolio del artista: muestra la obra y te permite ponerte en contacto.`,noData:`No recopilamos ni almacenamos ningún dato personal.`,publicContent:`Todo el contenido que se muestra aquí es público.`,ownRisk:`El uso de este sitio es bajo tu propia responsabilidad. No nos hacemos responsables de un mal uso del contenido.`,changes:`Podemos actualizar estos términos en cualquier momento sin previo aviso.`},notFound:{title:`404 — Página no encontrada`,message:`¡Vaya! La página que buscas no existe. Prueba con una de estas:`},texts:`Textos`,latest:`Lo último`,latestPage:{intro:`Las piezas más recientes publicadas en Instagram, de la más nueva a la más antigua. Cada una lleva a su propia página: las otras vistas, el tamaño, lo que se ha escrito sobre ella.`,onInstagram:`Ver la publicación`,nothingYet:`Todavía no se ha publicado nada.`},textsPage:{intro:`Textos sobre la obra, publicados en otros medios. Cada entrada enlaza al original: son de quienes los escribieron y de los medios que los publicaron.`,kind:{essay:`Texto curatorial`,press:`Prensa`,interview:`Entrevista`,review:`Reseña`},salanova:{note:`El texto curatorial de la exposición El Valle Inquietante, en la Galería Zunino.`},abc:{note:`Una columna sobre artistas que trabajaban con inteligencia artificial años antes de que se generalizara.`},selfie:{note:`Una entrevista sobre pintura, internet y las imágenes que una generación hace de sí misma.`},achtung:{note:`Una reseña de la exposición en Zunino, quince cuadros de una década de trabajo, sobre cómo el artista trata los gestos y las imágenes virales de las redes como rituales contemporáneos, entre lo místico y lo absurdo.`}},certificate:{title:`Certificado de autenticidad`,recordedOn:`El artista registró esta pintura de forma irreversible en Ethereum el {{date}}: su título, técnica, medidas, año y una fotografía, están escritos dentro de la propia cadena y no enlazados desde ella, de modo que el registro sobrevive a esta web, a la pintura y al propio artista.`,recorded:`El artista registró esta pintura de forma irreversible en Ethereum: su título, técnica, medidas, año y una fotografía, están escritos dentro de la propia cadena y no enlazados desde ella, de modo que el registro sobrevive a esta web, a la pintura y al propio artista.`,token:`Certificado`,contract:`Contrato`,transaction:`Transacción`,view:`Ver en Etherscan`,download:`Descargar el certificado`,pdfHeading:`Certificado de autenticidad`},project:{title:`Cómo dirijo este producto`,lead:`Soy desarrollador, tech lead y diseñador, y me he movido al lado de la mesa donde se toman las decisiones. Este es el producto que dirijo: el catálogo público de un pintor en activo y la tubería privada que lo alimenta. Cada requisito dice por qué existe y qué demuestra que sigue funcionando, y la compilación falla cuando una de esas pruebas deja de ser cierta.`,figures:{requirements:`requisitos, cada uno con un motivo y una prueba`,releases:`versiones publicadas, una línea cada una`,unproven:`de ellos admiten no tener prueba automática`,operator:`persona opera todo el sistema`},product:{title:`Qué es el producto`,a:`Un catálogo de 192 pinturas, escrito como 400 páginas estáticas en inglés y español, de modo que todas se leen sin una sola línea de JavaScript. Detrás, un servicio prepara las fotografías, redacta y traduce un ensayo para cada cuadro, renderiza vídeo para las redes y registra cada obra en Ethereum.`,b:`Lo opera una sola persona. Esa restricción decide todo lo que hay en esta página: no hay equipo que absorba una mala decisión, ni QA que atrape una regresión, y nada puede exigir a un humano a las tres de la mañana.`},rot:{title:`Requisitos que no pueden pudrirse en silencio`,a:`Un changelog es un registro del pasado y no puede volverse falso. Un documento de requisitos es una afirmación sobre el presente, y sí puede: en silencio, y casi siempre lo hace.`,b:`Por eso cada entrada nombra aquello que la demuestra. Un script lee el archivo antes de cada despliegue y rechaza la compilación si un número se usa dos veces, si una entrada no tiene prueba, si una prueba nombra un archivo borrado o si cita un test que se ha renombrado.`,c:`Existe porque cuatro requisitos pasaron quince versiones marcados como «cumplido · demostrado por» unas pruebas borradas varias versiones antes. Nadie mintió. Nadie se dio cuenta. Ese es exactamente el fallo que un documento de requisitos debería impedir y el que peor impide.`,d:`También informa —sin tumbar la compilación— de los requisitos cuya única prueba es prosa. Veinticinco de los ciento uno del sitio están en esa lista. Esta página lo dice porque la herramienta lo dice.`},decisions:{title:`Decisiones, y lo que cuestan`,chose:`Elegí`,instead:`En vez de`,cost:`Lo que cuesta`,prices:{name:`No publicar ningún precio`,chose:`Una consulta, que responde el artista`,instead:`Una lista de precios pública, o una cifra bajo petición`,cost:`Fricción para quien quiere un número ya. Un precio publicado es además un ancla mucho más fácil de poner que de mover. Hay un test que falla si un precio aparece alguna vez en el marcado.`},model:{name:`Los ensayos los escribe el modelo más barato`,chose:`El modelo que cuesta una quinta parte por ensayo`,instead:`El que escribe mejor, medido entre tres y cuatro veces más caro`,cost:`Una prosa que exige más edición. El camino bueno y su plan B se conservaron, así que revertir la decisión es cambiar una variable y no reescribir nada.`},reel:{name:`Un vídeo cada noche: resolví el extremo equivocado`,chose:`Duplicar la frecuencia con que se produce un vídeo`,instead:`Mirar qué pasaba con los que ya estaban hechos`,cost:`Nada, y ese es el asunto: seis vídeos terminados esperaban a un humano y solo uno se había publicado nunca. El cuello de botella estaba aguas abajo todo el tiempo. Vale más en esta página que una decisión que salió bien.`},freeze:{name:`Nada irreversible ocurre sin preguntar`,chose:`Preguntar siempre, y entender el silencio como un no`,instead:`Un ajuste, o una confirmación que se aprende a saltar`,cost:`Una pregunta que el operador responderá cientos de veces. Algunos registros de este producto no se pueden deshacer; una pregunta es más barata que cualquiera de ellos.`},key:{name:`Ninguna clave de firma en el servidor`,chose:`Firmar cada registro a mano, desde el móvil`,instead:`Firma automática, que la tubería podría hacer sola`,cost:`Un paso manual por registro y una cola que lo espera. Un servidor que no puede firmar no puede ser obligado a firmar por quien llegue hasta él.`}},measured:{title:`Medido, no discutido`,a:`Las instrucciones para los ensayos se reescribieron este mes a partir de datos y no de gusto. Veintidós ensayos se habían reescrito a mano antes de publicarlos; ciento treinta y seis no. Comparados entre sí, los editados iban de 188 a 633 palabras, mediana 442. Los intactos iban de 613 a 874, mediana 748. Los dos rangos apenas se solapan, y no se diferenciaban en nada más: misma longitud de frase, misma estructura, mismo argumento. Las instrucciones pedían entre 650 y 900 palabras. Ahora piden entre 380 y 560.`,b:`Una decisión anterior se corrigió igual. Una búsqueda se relanzaba en cada lectura, así que compilar 186 páginas eran 186 llamadas facturadas a una API de pago, y unos días de compilaciones sumaron unos noventa euros antes de que nadie mirara el contador. Aquello dejó de hacerse, y ahora una comprobación tumba cualquier compilación que llame a una API de pago: el gasto ya no puede repetirse por accidente.`},constraint:{title:`Encontrar el cuello de botella real`,a:`157 ensayos escritos. 20 revisados. Solo un ensayo revisado puede publicarse, así que todo lo anterior está automatizado y produciendo mientras todo lo posterior espera a un único paso humano, y el trabajo se había estado yendo en hacer más rápido lo anterior.`,b:`Darse cuenta de eso, y decirlo en voz alta en lugar de sacar la siguiente funcionalidad, es el trabajo.`},open:{title:`Lo que sigue abierto`,a:`La cola de revisión que lo desbloquearía está diseñada y sin construir.`,b:`137 ensayos terminados están sin leer, y por tanto sin publicar.`,c:`Veinticinco requisitos no tienen prueba automática y salen listados en cada compilación.`},how:{title:`Cómo está hecho esto, sin rodeos`,a:`Casi todo el código lo escribe un agente de IA, a partir de una especificación que escribo yo y una revisión que hago yo. Eso es lo importante, no una nota al pie.`,b:`Un agente deja encantado que un requisito se pudra, que una abstracción se extienda, que un coste se dispare o que aparezca una funcionalidad que nadie pidió. El archivo de requisitos, las pruebas nombradas y las comprobaciones que tumban una compilación son lo que hace que trabajar así sea seguro. Mi parte es decidir qué se construye, por qué, en qué orden y qué no merece la pena, y poder enseñar el razonamiento después.`},links:{title:`Las pruebas`,repo:`El código, público`,requirements:`El archivo de requisitos`,changelog:`El changelog`,site:`El producto en sí`,note:`El servicio que hay detrás del catálogo vive en un repositorio privado y, deliberadamente, ni se enlaza ni se describe aquí.`}}};function Rs(n,i){n&1&&xm(0,`app-breadcrumb`)}function Bs(n,i){n&1&&xm(0,`app-footer`)}var eo=(()=>{class n$4{constructor(){this.translateService=y$3(H$1),this.canonicalService=y$3(Zr),this.router=y$3(ee),this.auth=y$3(N$1),this.lang=y$3(G),this.hideBreadcrumb=ze$1(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root)),this.canonicalService.init(),this.auth.keepAlive(),this.translateService.setTranslation(n.ENGLISH,Jr),this.translateService.setTranslation(n.SPANISH,Xr),this.translateService.use(n.ENGLISH),this.router.events.pipe(bn$3(e=>e instanceof j$2),$$3()).subscribe(()=>{this.hideBreadcrumb.set(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root))})}skipToContent(e){e.preventDefault(),document.getElementById(`main-content`)?.focus()}deepestHideBreadcrumb(e){let t=e,a=!1;for(;t;)t.data.hideBreadcrumb&&(a=!0),t=t.firstChild;return a}static{this.ɵfac=function(t){return new(t||n$4)}}static{this.ɵcmp=YC({type:n$4,selectors:[[`app-root`]],decls:9,vars:7,consts:[[`href`,`#main-content`,1,`skip-link`,3,`click`],[`role`,`banner`],[`id`,`main-content`,`tabindex`,`-1`,`role`,`main`]],template:function(t,a){t&1&&(as$2(0,`a`,0),jm(`click`,function(o){return a.skipToContent(o)}),Ub(1),a_(2,`translate`),ou(),as$2(3,`header`,1),xm(4,`app-top-menu`),ou(),as$2(5,`main`,2),zw(6,Rs,1,0,`app-breadcrumb`),xm(7,`router-outlet`),ou(),zw(8,Bs,1,0,`app-footer`)),t&2&&(cT(),uu(` `,l_(2,5,`skipToContent`),`
`),cT(4),Qm(`no-chrome`,a.hideBreadcrumb()),cT(),Qw(a.hideBreadcrumb()?-1:6),cT(2),Qw(a.lang.carriesLanguage()?8:-1))},dependencies:[Kr,Hr,Ur,dr$1,$t$2],styles:[`main[_ngcontent-%COMP%]{display:block;padding-bottom:3rem}main.no-chrome[_ngcontent-%COMP%]{padding-bottom:0}.skip-link[_ngcontent-%COMP%]{position:fixed;top:0;left:-100vw;z-index:1001;padding:.65rem 1.1rem;background-color:var(--%NS%catalog-ink);color:var(--%NS%catalog-bg);font-size:.875rem;text-decoration:none}.skip-link[_ngcontent-%COMP%]:focus{left:.5rem;top:.5rem}main[_ngcontent-%COMP%]:focus{outline:none}`]})}}return n$4})();var zs=`@`;var Vs=(()=>{class n{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=y$3(ve$1);loadingSchedulerFn=y$3(js,{optional:!0});_engine;constructor(e,t,a,r,o){this.doc=e,this.delegate=t,this.zone=a,this.animationType=r,this.moduleImpl=o}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import(`./chunk-Be7vgmzG.js`).then(a=>a),t;return this.loadingSchedulerFn?t=this.loadingSchedulerFn(e):t=e(),t.catch(a=>{throw new T$3(5300,!1)}).then(({ɵcreateEngine:a,ɵAnimationRendererFactory:r})=>{this._engine=a(this.animationType,this.doc);let o=new r(this.delegate,this._engine,this.zone);return this.delegate=o,o})}createRenderer(e,t){let a=this.delegate.createRenderer(e,t);if(a.ɵtype===0)return a;typeof a.throwOnSyntheticProps==`boolean`&&(a.throwOnSyntheticProps=!1);let r=new An(a);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(o=>{let l=o.createRenderer(e,t);r.use(l),this.scheduler??=this.injector.get(xe$1,null,{optional:!0}),this.scheduler?.notify(10)}).catch(o=>{r.use(a)}),r}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(e){this._engine?.flush(),this.delegate.componentReplaced?.(e)}static ɵfac=function(t){hC()};static ɵprov=de$3({token:n,factory:n.ɵfac})}return n})();var An=class{delegate;replay=[];ɵtype=1;constructor(i){this.delegate=i}use(i){if(this.delegate=i,this.replay!==null){for(let e of this.replay)e(i);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(i,e){return this.delegate.createElement(i,e)}createComment(i){return this.delegate.createComment(i)}createText(i){return this.delegate.createText(i)}get destroyNode(){return this.delegate.destroyNode}appendChild(i,e){this.delegate.appendChild(i,e)}insertBefore(i,e,t,a){this.delegate.insertBefore(i,e,t,a)}removeChild(i,e,t,a){this.delegate.removeChild(i,e,t,a)}selectRootElement(i,e){return this.delegate.selectRootElement(i,e)}parentNode(i){return this.delegate.parentNode(i)}nextSibling(i){return this.delegate.nextSibling(i)}setAttribute(i,e,t,a){this.delegate.setAttribute(i,e,t,a)}removeAttribute(i,e,t){this.delegate.removeAttribute(i,e,t)}addClass(i,e){this.delegate.addClass(i,e)}removeClass(i,e){this.delegate.removeClass(i,e)}setStyle(i,e,t,a){this.delegate.setStyle(i,e,t,a)}removeStyle(i,e,t){this.delegate.removeStyle(i,e,t)}setProperty(i,e,t){this.shouldReplay(e)&&this.replay.push(a=>a.setProperty(i,e,t)),this.delegate.setProperty(i,e,t)}setValue(i,e){this.delegate.setValue(i,e)}listen(i,e,t,a){return this.shouldReplay(e)&&this.replay.push(r=>r.listen(i,e,t,a)),this.delegate.listen(i,e,t,a)}shouldReplay(i){return this.replay!==null&&i.startsWith(zs)}};var js=new S$2(``);function to(n=`animations`){return De$1(`NgAsyncAnimations`),li$2([{provide:Wr$2,useFactory:()=>new Vs(y$3(tn$3),y$3(Q$5),y$3(Ce$1),n)},{provide:NE,useValue:n===`noop`?`NoopAnimations`:`BrowserAnimations`}])}var qs=n=>n>=192&&n<=207&&n!==196&&n!==200&&n!==204;function Us(n){if(n.length<4||n[0]!==255||n[1]!==216)return null;let i=2;for(;i<n.length-9;){if(n[i]!==255){i+=1;continue}let e=n[i+1];if(qs(e)){let a=n[i+5]<<8|n[i+6],r=n[i+7]<<8|n[i+8];return r>0&&a>0?{width:r,height:a}:null}let t=n[i+2]<<8|n[i+3];if(t<2)return null;i+=2+t}return null}function Hs(n){let i=n.indexOf(`,`);if(!n.startsWith(`data:`)||i<0||!n.slice(0,i).includes(`;base64`))return null;try{let e=atob(n.slice(i+1)),t=new Uint8Array(e.length);for(let a=0;a<e.length;a+=1)t[a]=e.charCodeAt(a);return t}catch{return null}}function io(n){if(!n)return null;let i=Hs(n);if(!i)return null;let e=Us(i);return e?e.width/e.height:null}var no=.8;var Si=class{getTraitValue(i,e){try{return i.raw.metadata.attributes.find(t=>t.trait_type===e)?.value??``}catch{switch(e){case r.VERSION:return``;case r.MEDIUM:return`Error getting medium`;case r.HEIGHT:return`XX`;case r.WIDTH:return`XX`;case r.UNIT:return`cm`;case r.YEAR:return`XXXX`;case r.IMAGETYPE:return``;default:return`Error getting data`}}}getYears(i){let e=(i??[]).map(t=>Number(this.getTraitValue(t,r.YEAR))).filter(t=>!Number.isNaN(t)).sort((t,a)=>a-t);return new Set(e)}sortByYear(i,e=c.ASC){let t=a=>{let r$3=Number(this.getTraitValue(a,r.YEAR));return Number.isNaN(r$3)?0:r$3};return[...i].sort((a,r)=>{let o=t(a),l=t(r);return e===c.ASC?o-l:l-o})}sortByMedium(i,e=c.ASC){let t=[`oil`,`watercolor`],a=r$4=>{let o=this.getTraitValue(r$4,r.MEDIUM).toLowerCase(),l=t.findIndex(p=>o.includes(p));return l===-1?t.length:l};return[...i].sort((r,o)=>{let l=a(r)-a(o);return e===c.ASC?l:-l})}sortBySize(i,e=c.ASC){return[...i].sort((t,a)=>{let r=this.getSize(t)-this.getSize(a);return e===c.ASC?r:-r})}sortByName(i,e=c.ASC){return[...i].sort((t,a)=>{let r=t.name?.toLowerCase()||``,o=a.name?.toLowerCase()||``,l=r.localeCompare(o);return e===c.ASC?l:-l})}getSize(i){let e=t=>{let a=Number.parseInt(this.getTraitValue(i,t),10);return Number.isNaN(a)?0:a};return e(r.HEIGHT)+e(r.WIDTH)}getAspectRatio(i){if(!i)return no;let e=io(i.image?.thumbnailUrl??i.raw?.metadata?.image);if(e)return e;let t=parseFloat(this.getTraitValue(i,r.WIDTH)),a=parseFloat(this.getTraitValue(i,r.HEIGHT));return t>0&&a>0?t/a:no}getNftById(i,e){return e.find(({tokenId:t})=>i===t)||null}getArtByTitle(i,e){return e.filter(({name:t})=>t===i)}countArtworksInYear(i,e){return e.filter(t=>this.getTraitValue(t,r.YEAR)===i).length}isFrontalView(i,e){let t=this.filterFrontalArtworks(e);return t.length?t.length===1?t[0].tokenId===i.tokenId:this.getLatestVersion(t)?.tokenId===i.tokenId:!1}filterFrontalArtworks(i){return i.filter(e=>this.getTraitValue(e,r.IMAGETYPE)===e$1.FRONTAL)}isExcludedByYear(i,e=[]){if(e?.length){let t=this.getTraitValue(i,r.YEAR);return!e.includes(t)}else return!1}getLatestVersion(i){return i.length?i.reduce((e,t)=>{let a=parseInt(this.getTraitValue(e,r.VERSION))||0;return(parseInt(this.getTraitValue(t,r.VERSION))||0)>a?t:e}):null}getLatestVersionIndex(i){let e=this.getLatestVersion(i);return i.findIndex(t=>e&&t.tokenId===e.tokenId)}getNftQualityUrls(i){return this.collectUrls(i,[`originalUrl`,`cachedUrl`,`thumbnailUrl`])}getNftFetchableUrls(i){return this.collectUrls(i,[`originalUrl`,`pngUrl`,`thumbnailUrl`])}getNftQualityUrl(i){return this.getNftQualityUrls(i)[0]||``}getNftOptimalUrl(i){return this.collectUrls(i,[`thumbnailUrl`,`cachedUrl`,`originalUrl`])[0]||``}collectUrls(i,e){let t=e.map(a=>i?.[a]);return[...new Set(t.filter(a=>typeof a==`string`&&!!a))]}};var Ci=class{static olderThanNDays(i,e){let a=Math.abs(new Date().getTime()-new Date(i).getTime());return Math.ceil(a/(1e3*3600*24))>e}};var Ei=(function(n){return n[n.NFT_THUMBNAIL=1]=`NFT_THUMBNAIL`,n[n.BACKEND_THUMBNAIL=2]=`BACKEND_THUMBNAIL`,n[n.NFT_CACHED=3]=`NFT_CACHED`,n})(Ei||{});var Ai=`artPieces`;var Qs=8e3;var ao=null;var Ni=class extends Si{constructor(){super(...arguments),this.http=y$3(St$2),this.sessionStore=y$3(Pt),this.sessionQuery=y$3(ki),this.isBrowser=xi$4(y$3(SE)),this.transferState=y$3(rn$3),this.router=y$3(ee)}getArtPiecesObservable(){let i=this.takeTransferredArtPieces();if(i)return this.saveNftsLocally(i),hy(i);if(!this.shouldRefetchCatalogue())return this.sessionQuery.getArtPiecesObservable;let e$2=this.http.get(`${e.backendUrl}nfts-snapshot`).pipe(this.extractData([]),gd(t=>{this.saveNftsLocally(t),this.transferArtPieces(t)}),Js$1(()=>this.sessionQuery.getArtPiecesObservable));return this.isBrowser?this.sessionQuery.selectArtPieces.length?e$2.pipe(hd(this.sessionQuery.selectArtPieces)):this.getFallbackArtworks().pipe(gd(t=>this.sessionStore.update({artPieces:t})),Xu(t=>e$2.pipe(hd(t)))):(ao??=e$2.pipe(fd({bufferSize:1,refCount:!1})),ao)}transferArtPieces(i){if(this.isBrowser||!i.length)return;let e=this.router.url.split(`?`)[0].replace(/\/+$/,``);e!==`/artworks`&&e!==`/es/artworks`||this.transferState.set(Ai,i)}takeTransferredArtPieces(){if(!this.isBrowser||!this.transferState.hasKey(Ai))return null;let i=this.transferState.get(Ai,[]);return this.transferState.remove(Ai),i.length?i:null}getFallbackArtworks(){return je$1(import(`./chunk-BBAUUtVM.js`)).pipe(Ve$3(i=>i.FALLBACK_ARTWORKS_API_CALL.data??[]))}getArtPieceDescriptions(i){return this.http.get(`${e.backendUrl}descriptions/${i}`).pipe(this.extractData(null),this.giveUpDuringBuild(),Js$1(()=>hy(null)))}getArtPieceCritic(i){return this.http.get(`${e.backendUrl}critics/${i}`).pipe(this.extractData(null),this.giveUpDuringBuild(),Js$1(()=>hy(null)))}getArtPieceCriticWithEdits(i,e$3){return this.http.get(`${e.backendUrl}critics/${i}/edits`,{headers:{Authorization:`Bearer ${e$3}`}}).pipe(this.extractData(null),Js$1(()=>hy(null)))}editArtPieceCritic(i,e$4,t,a){return this.http.patch(`${e.backendUrl}critics/${i}`,{lang:e$4,body:t},{headers:{Authorization:`Bearer ${a}`}}).pipe(this.extractData(null))}giveUpDuringBuild(){return i=>this.isBrowser?i:i.pipe(Ey(Qs))}extractData(i){return Ve$3(e=>e.success&&e.data?e.data:i)}getNftByIdObservable(i){return this.sessionQuery.getArtPiecesObservable.pipe(Ve$3(e=>this.getNftById(i,e)))}getArtworkViewsObservable(i){return this.getNftByIdObservable(i).pipe(Xu(e=>e?hy(this.getArtByTitle(e.name,this.sessionQuery.selectArtPieces)):this.getArtPiecesObservable().pipe(Xu(t=>{let a=this.getNftById(i,t);return a?.name?hy(this.getArtByTitle(a.name,t)):hy([])}))))}countCatalogueArtworksInYear(i){return this.countArtworksInYear(i,this.sessionQuery.selectArtPieces)}getAvailableOptimalUrl(i){return this.getLocalCachedThumbnail(i.tokenId).pipe(Xu(e=>e?hy(e):this.fetchRemoteThumbnail(i.tokenId).pipe(Js$1(()=>hy(null)),Ve$3(t=>t||i.image.thumbnailUrl||i.image.originalUrl))))}getProgressiveImageUrls(i,e=!1){let r=[this.getLocalCachedThumbnail(i.tokenId).pipe(Xu(o=>o?hy(o):this.fetchRemoteThumbnail(i.tokenId)),Js$1(()=>hy(null)),Ve$3(o=>({url:o,quality:Ei.BACKEND_THUMBNAIL}))),this.preloadImage(i.image?.thumbnailUrl).pipe(Ve$3(o=>({url:o,quality:Ei.NFT_THUMBNAIL})))];if(!e){let o=this.preloadImage(i.image?.cachedUrl).pipe(Ve$3(l=>({url:l,quality:Ei.NFT_CACHED})));r.push(o)}return Oy(...r).pipe(Hy((o,l)=>l.url&&l.quality>o.quality?l:o,{url:null,quality:0}),Ve$3(({url:o})=>o),bn$3(o=>!!o),ld())}preloadImage(i){return!i||typeof Image>`u`?Rt$2:new x$2(e=>{let t=new Image,a=!1;return t.src=i,t.decode().then(()=>{a||(e.next(i),e.complete())}).catch(()=>{a||e.complete()}),()=>{a=!0,t.complete||(t.src=``)}})}getLinks(i){return this.isBrowser?this.http.get(e.backendUrl+`vision/search/`+i).pipe(this.extractData([]),Js$1(()=>hy([]))):hy([])}getEditedCritics(i){return this.http.get(`${e.backendUrl}critics/edits`,{headers:{Authorization:`Bearer ${i}`}}).pipe(this.extractData([]),Ve$3(e=>new Map(e.map(t=>[t.tokenId,t.edited]))),Js$1(()=>hy(new Map)))}getAvailableYears(){return this.getYears(this.sessionQuery.selectArtPieces)}saveNftsLocally(i){this.sessionStore.update({artPieces:i,lastArtPiecesUpdate:new Date})}getLocalCachedThumbnail(i){let e=this.sessionQuery.getThumbnailByTokenId(i);return hy(e?Ve$2.composeImgSrc(e.thumbnail):null)}fetchRemoteThumbnail(i){return this.http.get(`${e.backendUrl}nft-thumbnails/${i}`).pipe(gd(e=>{if(e.success&&e.data){let t=this.sessionQuery.getValue().imageCache;this.sessionStore.update({imageCache:[...t,e.data]})}}),Ve$3(e=>e.data?Ve$2.composeImgSrc(e.data?.thumbnail):null))}shouldRefetchCatalogue(){return!this.sessionQuery.selectArtPieces.length||!this.sessionQuery.selectLastArtPiecesUpdate||Ci.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate,7)}};var Ws=[`*`];var Gs=`.mdc-list {
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
  background-color: var(--%NS%mat-list-list-item-container-color, transparent);
  border-radius: var(--%NS%mat-list-list-item-container-shape, var(--%NS%mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--%NS%mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--%NS%mat-list-list-item-one-line-container-height, 48px);
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
  height: var(--%NS%mat-list-list-item-two-line-container-height, 64px);
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
  height: var(--%NS%mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--%NS%selected::before, .mdc-list-item.mdc-list-item--%NS%selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
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
  color: var(--%NS%mat-list-list-item-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
  width: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
  height: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--%NS%with-leading-icon:hover .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--%NS%mat-list-list-item-leading-avatar-size, 40px);
  height: var(--%NS%mat-list-list-item-leading-avatar-size, 40px);
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
  font-family: var(--%NS%mat-list-list-item-trailing-supporting-text-font, var(--%NS%mat-sys-label-small-font));
  line-height: var(--%NS%mat-list-list-item-trailing-supporting-text-line-height, var(--%NS%mat-sys-label-small-line-height));
  font-size: var(--%NS%mat-list-list-item-trailing-supporting-text-size, var(--%NS%mat-sys-label-small-size));
  font-weight: var(--%NS%mat-list-list-item-trailing-supporting-text-weight, var(--%NS%mat-sys-label-small-weight));
  letter-spacing: var(--%NS%mat-list-list-item-trailing-supporting-text-tracking, var(--%NS%mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
  width: var(--%NS%mat-list-list-item-trailing-icon-size, 24px);
  height: var(--%NS%mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--%NS%with-trailing-icon:hover .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-trailing-supporting-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-selected-trailing-icon-color, var(--%NS%mat-sys-primary));
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
  color: var(--%NS%mat-list-list-item-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-list-list-item-label-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-list-list-item-label-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-list-list-item-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-list-list-item-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-list-list-item-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-focus-label-text-color, var(--%NS%mat-sys-on-surface));
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
  color: var(--%NS%mat-list-list-item-supporting-text-color, var(--%NS%mat-sys-on-surface-variant));
  font-family: var(--%NS%mat-list-list-item-supporting-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-list-list-item-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-list-list-item-supporting-text-size, var(--%NS%mat-sys-body-medium-size));
  font-weight: var(--%NS%mat-list-list-item-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  letter-spacing: var(--%NS%mat-list-list-item-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
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
  opacity: var(--%NS%mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-disabled-leading-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--%NS%mat-list-list-item-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--%NS%disabled::before {
  background-color: var(--%NS%mat-list-list-item-disabled-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--%NS%mat-list-list-item-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--%NS%mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--%NS%mat-list-list-item-leading-avatar-shape, var(--%NS%mat-sys-corner-full));
  background-color: var(--%NS%mat-list-list-item-leading-avatar-color, var(--%NS%mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--%NS%activated::after {
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
  margin-inline-start: var(--%NS%mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--%NS%mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--%NS%mat-list-active-indicator-shape, var(--%NS%mat-sys-corner-full));
  --%NS%mat-focus-indicator-border-radius: var(--%NS%mat-list-active-indicator-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--%NS%mat-list-active-indicator-color, var(--%NS%mat-sys-secondary-container));
}
`;var $s=[`unscopedContent`];var Ks=[`text`];var Ys=[[[``,`matListItemAvatar`,``],[``,`matListItemIcon`,``]],[[``,`matListItemTitle`,``]],[[``,`matListItemLine`,``]],`*`,[[``,`matListItemMeta`,``]],[[`mat-divider`]]];var Zs=[`[matListItemAvatar],[matListItemIcon]`,`[matListItemTitle]`,`[matListItemLine]`,`*`,`[matListItemMeta]`,`mat-divider`];var Js=new S$2(`ListOption`);var Xs=(()=>{class n{_elementRef=y$3(Jr$2);static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,selectors:[[``,`matListItemTitle`,``]],hostAttrs:[1,`mat-mdc-list-item-title`,`mdc-list-item__primary-text`]})}return n})();var el=(()=>{class n{_elementRef=y$3(Jr$2);static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,selectors:[[``,`matListItemLine`,``]],hostAttrs:[1,`mat-mdc-list-item-line`,`mdc-list-item__secondary-text`]})}return n})();var tl=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,selectors:[[``,`matListItemMeta`,``]],hostAttrs:[1,`mat-mdc-list-item-meta`,`mdc-list-item__end`]})}return n})();var ro=(()=>{class n{_listOption=y$3(Js,{optional:!0});_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()===`after`}static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,hostVars:4,hostBindings:function(t,a){t&2&&Qm(`mdc-list-item__start`,a._isAlignedAtStart())(`mdc-list-item__end`,!a._isAlignedAtStart())}})}return n})();var il=(()=>{class n extends ro{static ɵfac=(()=>{let e;return function(a){return(e||(e=uI(n)))(a||n)}})();static ɵdir=ew({type:n,selectors:[[``,`matListItemAvatar`,``]],hostAttrs:[1,`mat-mdc-list-item-avatar`],features:[gm]})}return n})();var nl=(()=>{class n extends ro{static ɵfac=(()=>{let e;return function(a){return(e||(e=uI(n)))(a||n)}})();static ɵdir=ew({type:n,selectors:[[``,`matListItemIcon`,``]],hostAttrs:[1,`mat-mdc-list-item-icon`],features:[gm]})}return n})();var al=new S$2(`MAT_LIST_CONFIG`);var En=(()=>{class n{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=vi$3(e)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(vi$3(e))}_disabled=ze$1(!1);_defaultOptions=y$3(al,{optional:!0});static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,hostVars:1,hostBindings:function(t,a){t&2&&Sm(`aria-disabled`,a.disabled)},inputs:{disableRipple:`disableRipple`,disabled:`disabled`}})}return n})();var rl=(()=>{class n{_elementRef=y$3(Jr$2);_ngZone=y$3(Ce$1);_listBase=y$3(En,{optional:!0});_platform=y$3(p$1);_hostElement;_isButtonElement;_noopAnimations=z$4();_avatars;_icons;set lines(e){this._explicitLines=Mt$3(e,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(e){this._disableRipple=vi$3(e)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(e){this._disabled.set(vi$3(e))}_disabled=ze$1(!1);_subscriptions=new J$4;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){y$3(I$4).load(Ye$1);let e=y$3(Ut$3,{optional:!0});this.rippleConfig=e||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()===`button`,this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute(`type`)&&this._hostElement.setAttribute(`type`,`button`)}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add(`mat-mdc-list-item-interactive`),this._rippleRenderer=new X$4(this,this._ngZone,this._hostElement,this._platform,y$3(ve$1)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Oy(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(e){if(!this._lines||!this._titles||!this._unscopedContent)return;e&&this._checkDomForUnscopedTextContent();let t=this._explicitLines??this._inferLinesFromContent(),a=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle(`mat-mdc-list-item-single-line`,t<=1),this._hostElement.classList.toggle(`mdc-list-item--with-one-line`,t<=1),this._hostElement.classList.toggle(`mdc-list-item--with-two-lines`,t===2),this._hostElement.classList.toggle(`mdc-list-item--with-three-lines`,t===3),this._hasUnscopedTextContent){let r=this._titles.length===0&&t===1;a.classList.toggle(`mdc-list-item__primary-text`,r),a.classList.toggle(`mdc-list-item__secondary-text`,!r)}else a.classList.remove(`mdc-list-item__primary-text`),a.classList.remove(`mdc-list-item__secondary-text`)}_inferLinesFromContent(){let e=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(e+=1),e}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(e=>e.nodeType!==e.COMMENT_NODE).some(e=>!!(e.textContent&&e.textContent.trim()))}static ɵfac=function(t){return new(t||n)};static ɵdir=ew({type:n,contentQueries:function(t,a,r){if(t&1&&Bm(r,il,4)(r,nl,4),t&2){let o;vb(o=yb())&&(a._avatars=o),vb(o=yb())&&(a._icons=o)}},hostVars:4,hostBindings:function(t,a){t&2&&(Sm(`aria-disabled`,a.disabled)(`disabled`,a._isButtonElement&&a.disabled||null),Qm(`mdc-list-item--disabled`,a.disabled))},inputs:{lines:`lines`,disableRipple:`disableRipple`,disabled:`disabled`}})}return n})();var oo=(()=>{class n extends En{static ɵfac=(()=>{let e;return function(a){return(e||(e=uI(n)))(a||n)}})();static ɵcmp=YC({type:n,selectors:[[`mat-list`]],hostAttrs:[1,`mat-mdc-list`,`mat-mdc-list-base`,`mdc-list`],exportAs:[`matList`],features:[e_([{provide:En,useExisting:n}]),gm],ngContentSelectors:Ws,decls:1,vars:0,template:function(t,a){t&1&&(hb(),gb(0))},styles:[Gs],encapsulation:2})}return n})();var so=(()=>{class n extends rl{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(e){this._activated=vi$3(e)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName===`A`&&this._activated?`page`:null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static ɵfac=(()=>{let e;return function(a){return(e||(e=uI(n)))(a||n)}})();static ɵcmp=YC({type:n,selectors:[[`mat-list-item`],[`a`,`mat-list-item`,``],[`button`,`mat-list-item`,``]],contentQueries:function(t,a,r){if(t&1&&Bm(r,el,5)(r,Xs,5)(r,tl,5),t&2){let o;vb(o=yb())&&(a._lines=o),vb(o=yb())&&(a._titles=o),vb(o=yb())&&(a._meta=o)}},viewQuery:function(t,a){if(t&1&&Um($s,5)(Ks,5),t&2){let r;vb(r=yb())&&(a._unscopedContent=r.first),vb(r=yb())&&(a._itemText=r.first)}},hostAttrs:[1,`mat-mdc-list-item`,`mdc-list-item`],hostVars:13,hostBindings:function(t,a){t&2&&(Sm(`aria-current`,a._getAriaCurrent()),Qm(`mdc-list-item--activated`,a.activated)(`mdc-list-item--with-leading-avatar`,a._avatars.length!==0)(`mdc-list-item--with-leading-icon`,a._icons.length!==0)(`mdc-list-item--with-trailing-meta`,a._meta.length!==0)(`mat-mdc-list-item-both-leading-and-trailing`,a._hasBothLeadingAndTrailing())(`_mat-animation-noopable`,a._noopAnimations))},inputs:{activated:`activated`},exportAs:[`matListItem`],features:[gm],ngContentSelectors:Zs,decls:10,vars:0,consts:[[`unscopedContent`,``],[1,`mdc-list-item__content`],[1,`mat-mdc-list-item-unscoped-content`,3,`cdkObserveContent`],[1,`mat-focus-indicator`]],template:function(t,a){t&1&&(hb(Ys),gb(0),as$2(1,`span`,1),gb(2,1),gb(3,2),as$2(4,`span`,2,0),jm(`cdkObserveContent`,function(){return a._updateItemLines(!0)}),gb(6,3),ou()(),gb(7,4),gb(8,5),xm(9,`div`,3))},dependencies:[Za],encapsulation:2})}return n})();var lo=(()=>{class n{constructor(){this.lang=y$3(G)}static{this.ɵfac=function(t){return new(t||n)}}static{this.ɵcmp=YC({type:n,selectors:[[`app-not-found`]],decls:23,vars:19,consts:[[1,`container`,`center`],[1,`catalog-heading`],[`role`,`list`],[`mat-button`,``,`color`,`primary`,3,`routerLink`]],template:function(t,a){t&1&&(as$2(0,`div`,0)(1,`h2`,1),Ub(2),a_(3,`translate`),ou(),as$2(4,`p`),Ub(5),a_(6,`translate`),ou(),as$2(7,`mat-list`,2)(8,`mat-list-item`)(9,`a`,3),Ub(10),a_(11,`translate`),ou()(),as$2(12,`mat-list-item`)(13,`a`,3),Ub(14),a_(15,`translate`),ou()(),as$2(16,`mat-list-item`)(17,`a`,3),Ub(18,`CV`),ou()(),as$2(19,`mat-list-item`)(20,`a`,3),Ub(21),a_(22,`translate`),ou()()()()),t&2&&(cT(2),nv(l_(3,9,`notFound.title`)),cT(3),nv(l_(6,11,`notFound.message`)),cT(4),Nm(`routerLink`,a.lang.link(`artworks`)),cT(),uu(` `,l_(11,13,`paintings`),` `),cT(3),Nm(`routerLink`,a.lang.link(`about`)),cT(),uu(` `,l_(15,15,`statement.title`),` `),cT(3),Nm(`routerLink`,a.lang.link(`cv`)),cT(3),Nm(`routerLink`,a.lang.link(`contact`)),cT(),uu(` `,l_(22,17,`menu.contact`),` `))},dependencies:[oo,so,ar$2,_t$1,$t$2],styles:[`.center[_ngcontent-%COMP%]{text-align:center}`]})}}return n})();var Zt=()=>y$3(N$1).isAdmin()||y$3(ee).parseUrl(`/door`);var co=()=>(y$3(H$1).use(n.SPANISH),!0);var mo=(n$5,i)=>sl()?y$3(ee).parseUrl(`/es${ol(i.url)}`):(y$3(H$1).use(n.ENGLISH),!0);function ol(n){return n.replace(/^\/(?=$|[?#])/,``)}var Ot=()=>(y$3(H$1).use(ho()),!0);function sl(){return typeof window>`u`?!1:ho()===n.SPANISH}function ho(){return typeof window>`u`?n.ENGLISH:L()??N()}var po=[{path:``,pathMatch:`full`,loadComponent:()=>import(`./chunk-CUygOgLC.js`).then(n=>n.HomeComponent),data:{description:`seo.default.description`,hideBreadcrumb:!0}},{path:`artworks`,loadComponent:()=>import(`./chunk-BRIdco0K.js`).then(n=>n.ArtPiecesListComponent),title:`seo.paintings.title`,data:{breadcrumb:`Paintings`,description:`seo.paintings.description`}},{path:`artwork/:id`,loadComponent:()=>import(`./chunk-BGBNZvDW2.js`).then(n=>n.ArtPieceComponent),title:`seo.artwork.title`,data:{description:`seo.paintings.description`,hideBreadcrumb:!0}},{path:`generative/:id`,loadComponent:()=>import(`./chunk-BudvXSUQ2.js`).then(n=>n.GenerativePieceComponent),title:`seo.generative.title`,data:{description:`seo.generative.description`,hideBreadcrumb:!0}},{path:`about-certificates-project`,loadComponent:()=>import(`./chunk-DXMlrHt2.js`).then(n=>n.ProjectComponent),title:`seo.project.title`,data:{description:`seo.project.description`,hideBreadcrumb:!0}},{path:`cv`,loadComponent:()=>import(`./chunk-BFzdMl2U.js`).then(n=>n.CvComponent),title:`seo.cv.title`,data:{description:`seo.cv.description`}},{path:`texts`,loadComponent:()=>import(`./chunk-B1xZDBCz.js`).then(n=>n.TextsComponent),title:`seo.texts.title`,data:{description:`seo.texts.description`,hideBreadcrumb:!0}},{path:`about`,loadComponent:()=>import(`./chunk-Bs8p4IgY.js`).then(n=>n.AboutComponent),title:`seo.about.title`,data:{description:`seo.about.description`}},{path:`contact`,loadComponent:()=>import(`./chunk-D6I_Esc1.js`).then(n=>n.ContactComponent),title:`seo.contact.title`,data:{description:`seo.contact.description`}},{path:`terms`,loadComponent:()=>import(`./chunk-fK4up1JW.js`).then(n=>n.TermsComponent),title:`seo.terms.title`,data:{description:`seo.terms.description`}},{path:`privacy`,loadComponent:()=>import(`./chunk-CIBmPgOj2.js`).then(n=>n.PrivacyComponent),title:`seo.privacy.title`,data:{description:`seo.privacy.description`}}];var fo={providers:[jo$1([{path:`es/studio`,redirectTo:`/studio`},{path:`es/door`,redirectTo:`/door`},{path:`es/publish`,redirectTo:`/publish`},{path:`door`,canActivate:[Ot],loadComponent:()=>import(`./chunk-DgrebUEu.js`).then(n=>n.DoorComponent),data:{title:`Door`,hideBreadcrumb:!0,noindex:!0}},{path:`studio`,canActivate:[Ot,Zt],loadComponent:()=>import(`./chunk-B3myawkd.js`).then(n=>n.StudioComponent),data:{title:`Studio`,hideBreadcrumb:!0,noindex:!0}},{path:`publish`,canActivate:[Ot,Zt],loadComponent:()=>import(`./chunk-Cbuswmff2.js`).then(n=>n.PublishComponent),data:{title:`Publish`,hideBreadcrumb:!0,noindex:!0}},{path:`pendingmint`,canActivate:[Ot,Zt],loadComponent:()=>import(`./chunk-D8l83Ikq.js`).then(n=>n.PendingMintComponent),data:{title:`Pending mints`,hideBreadcrumb:!0,noindex:!0}},{path:`es/pendingmint`,redirectTo:`/pendingmint`},{path:`latest`,canActivate:[Ot,Zt],loadComponent:()=>import(`./chunk-CBbykTeW.js`).then(n=>n.LatestComponent),data:{title:`Latest IG posts`,hideBreadcrumb:!0,noindex:!0}},{path:`es/latest`,redirectTo:`/latest`},{path:`es`,canActivate:[co],children:po},{path:``,canActivate:[mo],children:po},{path:`**`,component:lo,title:`seo.notFound.title`}],qo$1(Po$1),Fo$2({skipInitialTransition:!0})),jt$2({fallbackLang:n.ENGLISH}),{provide:n$1,useClass:Ni},p_(),ln$3(cn$3({filter:({url:n})=>![`nfts-snapshot`,`nft-thumbnails`,`critics`,`posts/`,`vision/`].some(i=>n.includes(i))&&!n.endsWith(`/version`)})),Sn$3(Tn$1(),_n$3()),to(),{provide:pr$1,useExisting:j$1}]};fn({preStorageUpdate:(n,i)=>n===`session`&&!i.lastArtPiecesUpdate?s$1(r$2({},i),{artPieces:[]}):i});e.production?tn():en();Je$1(eo,fo).catch(n=>console.error(n));export{Si$3 as $,ya as A,W$1 as B,ga as C,us$1 as D,ur as E,m as F,c$3 as G,ee as H,m$1 as I,n$2 as J,e$1 as K,j$1 as L,N$1 as M,e as N,va as O,rt$2 as P,Di$2 as Q,$t$2 as R,fs$1 as S,re as T,E$1 as U,_t$1 as V,a$1 as W,r as X,o as Y,Gt$3 as Z,ae as _,te as _t,$r$1 as a,Ot$3 as at,ba as b,Hr$1 as c,q$2 as ct,Ls as d,N$3 as dt,V$3 as et,Mn as f,Qt$3 as ft,_a as g,pt$4 as gt,Qr$1 as h,ni$2 as ht,c$1 as i,wt$2 as it,Et as j,vo$1 as k,Ja as l,$t$3 as lt,Ps$1 as m,ne$1 as mt,n$1 as n,bi$3 as nt,Ca as o,P$1 as ot,Nn as p,Ut$2 as pt,i as q,c as r,lt$4 as rt,H as s,Ve$2 as st,G as t,_t$3 as tt,Ki$1 as u,G$6 as ut,ai as v,tt$5 as vt,gs$1 as w,et as x,as$1 as y,z$2 as yt,H$1 as z};