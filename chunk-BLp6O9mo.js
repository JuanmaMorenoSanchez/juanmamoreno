import{t as r}from"./chunk-Ch7qlBDL.js";import{Bn as iu,En as gm,F as J$1,Ft as XV,Gr as wn$1,H as KV,In as hy,J as Ly,Kr as x,L as Jr,Mn as hd,Mr as tt$1,Pt as Wr,Qt as ac,Tn as gd,U as Kr,V as KC,Vr as ve,Wt as ZV,X as Nl,Y as NE,Zn as ld,Zr as y$1,_t as Sm,ai as z$1,c as Ar,dt as Rd,er as me,gr as pd,gt as SE,h as Ce$1,ht as S,jn as hb,jr as tn$1,kr as su,kt as Ve$1,li as zw,lt as Qw,m as By,nn as bn$1,o as Ab,oi as ze$1,on as cT,or as nr,q as Lt$1,qr as xE,rn as bt$1,rr as ne,s as Am,si as zi,st as Qm,u as BV,vn as ew,vt as Sy,wn as gb,wt as Uc,xt as Tt,zt as YC}from"./chunk-DyYb3Cbq.js";import{_ as xi$1}from"./chunk-BPnDgTYp.js";import{a as it}from"./chunk-Bcoe1H46.js";var Dt;try{Dt=typeof Intl<`u`&&Intl.v8BreakIterator}catch{Dt=!1}var p=(()=>{class e{_platformId=y$1(SE);isBrowser=this._platformId?xi$1(this._platformId):typeof document==`object`&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Dt)&&typeof CSS<`u`&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!(`MSStream`in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();function kt(e){return Array.isArray(e)?e:[e]}var Ee=new Set;var F;var bt=(()=>{class e{_platform=y$1(p);_nonce=y$1(xE,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):bn}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&un(t,this._nonce),this._matchMedia(t)}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();function un(e,o){if(!Ee.has(e))try{F||(F=document.createElement(`style`),o&&F.setAttribute(`nonce`,o),F.setAttribute(`type`,`text/css`),document.head.appendChild(F)),F.sheet&&(F.sheet.insertRule(`@media ${e.replace(/[{}]/g,``)} {body{ }}`,0),Ee.add(e))}catch(t){console.error(t)}}function bn(e){return{matches:e===`all`||e===``,media:e,addListener:()=>{},removeListener:()=>{}}}var Ct=(()=>{class e{_mediaMatcher=y$1(bt);_zone=y$1(Ce$1);_queries=new Map;_destroySubject=new ne;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(t){return we(kt(t)).some(a=>this._registerQuery(a).mql.matches)}observe(t){let i=Sy(we(kt(t)).map(s=>this._registerQuery(s).observable));return i=wn$1(i.pipe(Lt$1(1)),i.pipe(pd(1),Ly(0))),i.pipe(Ve$1(s=>{let c={matches:!1,breakpoints:{}};return s.forEach(({matches:f,query:A})=>{c.matches=c.matches||f,c.breakpoints[A]=f}),c}))}_registerQuery(t){if(this._queries.has(t))return this._queries.get(t);let n=this._mediaMatcher.matchMedia(t),i={observable:new x(s=>{let c=f=>this._zone.run(()=>s.next(f));return n.addListener(c),()=>{n.removeListener(c)}}).pipe(hd(n),Ve$1(({matches:s})=>({query:t,matches:s})),By(this._destroySubject)),mql:n};return this._queries.set(t,i),i}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();function we(e){return e.map(o=>o.split(`,`)).reduce((o,t)=>o.concat(t)).map(o=>o.trim())}var bo={XSmall:`(max-width: 599.98px)`,Small:`(min-width: 600px) and (max-width: 959.98px)`,Medium:`(min-width: 960px) and (max-width: 1279.98px)`,Large:`(min-width: 1280px) and (max-width: 1919.98px)`,XLarge:`(min-width: 1920px)`,Handset:`(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)`,Tablet:`(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)`,Web:`(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)`,HandsetPortrait:`(max-width: 599.98px) and (orientation: portrait)`,TabletPortrait:`(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)`,WebPortrait:`(min-width: 840px) and (orientation: portrait)`,HandsetLandscape:`(max-width: 959.98px) and (orientation: landscape)`,TabletLandscape:`(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)`,WebLandscape:`(min-width: 1280px) and (orientation: landscape)`};function $(e){return e.buttons===0||e.detail===0}function Y(e){let o=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!o&&o.identifier===-1&&(o.radiusX==null||o.radiusX===1)&&(o.radiusY==null||o.radiusY===1)}var Ot;function Ae(){if(Ot==null){let e=typeof document<`u`?document.head:null;Ot=!!(e&&(e.createShadowRoot||e.attachShadow))}return Ot}function Rt(e){if(Ae()){let o=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<`u`&&ShadowRoot&&o instanceof ShadowRoot)return o}return null}function pn(){let e=typeof document<`u`&&document?document.activeElement:null;for(;e&&e.shadowRoot;){let o=e.shadowRoot.activeElement;if(o===e)break;e=o}return e}function y(e){if(e.composedPath)try{return e.composedPath()[0]}catch{}return e.target}var Q;function Ie(){if(Q==null&&typeof window<`u`)try{window.addEventListener(`test`,null,Object.defineProperty({},"passive",{get:()=>Q=!0}))}finally{Q=Q||!1}return Q}function z(e){return Ie()?e:!!e.capture}function Ft(e,o=0){return Te(e)?Number(e):arguments.length===2?o:0}function Te(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}function w(e){return e instanceof Jr?e.nativeElement:e}var Me=new S(`cdk-input-modality-detector-options`);var De={ignoreKeys:[18,17,224,91,16]};var ke=650;var Lt={passive:!0,capture:!0};var Ce=(()=>{class e{_platform=y$1(p);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new nr(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(n=>n===t.keyCode)||(this._modality.next(`keyboard`),this._mostRecentTarget=y(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<ke||(this._modality.next($(t)?`keyboard`:`mouse`),this._mostRecentTarget=y(t))};_onTouchstart=t=>{if(Y(t)){this._modality.next(`keyboard`);return}this._lastTouchMs=Date.now(),this._modality.next(`touch`),this._mostRecentTarget=y(t)};constructor(){let t=y$1(Ce$1),n=y$1(tn$1),a=y$1(Me,{optional:!0});if(this._options=r(r({},De),a),this.modalityDetected=this._modality.pipe(pd(1)),this.modalityChanged=this.modalityDetected.pipe(ld()),this._platform.isBrowser){let i=y$1(Wr).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[i.listen(n,`keydown`,this._onKeydown,Lt),i.listen(n,`mousedown`,this._onMousedown,Lt),i.listen(n,`touchstart`,this._onTouchstart,Lt)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var X=(function(e){return e[e.IMMEDIATE=0]=`IMMEDIATE`,e[e.EVENTUAL=1]=`EVENTUAL`,e})(X||{});var Oe=new S(`cdk-focus-monitor-default-options`);var pt=z({passive:!0,capture:!0});var Pt=(()=>{class e{_ngZone=y$1(Ce$1);_platform=y$1(p);_inputModalityDetector=y$1(Ce);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=y$1(tn$1);_stopInputModalityDetector=new ne;constructor(){let t=y$1(Oe,{optional:!0});this._detectionMode=t?.detectionMode||X.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let n=y(t);for(let a=n;a;a=a.parentElement)t.type===`focus`?this._onFocus(t,a):this._onBlur(t,a)};monitor(t,n=!1){let a=w(t);if(!this._platform.isBrowser||a.nodeType!==1)return hy();let i=Rt(a)||this._document,s=this._elementInfo.get(a);if(s)return n&&(s.checkChildren=!0),s.subject;let c={checkChildren:n,subject:new ne,rootNode:i};return this._elementInfo.set(a,c),this._registerGlobalListeners(c),c.subject}stopMonitoring(t){let n=w(t),a=this._elementInfo.get(n);a&&(a.subject.complete(),this._setClasses(n),this._elementInfo.delete(n),this._removeGlobalListeners(a))}focusVia(t,n,a){let i=w(t);i===this._document.activeElement?this._getClosestElementsInfo(i).forEach(([c,f])=>this._originChanged(c,n,f)):(this._setOrigin(n),typeof i.focus==`function`&&i.focus(a))}ngOnDestroy(){this._elementInfo.forEach((t,n)=>this.stopMonitoring(n))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?`touch`:`program`:this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?`mouse`:`program`}_shouldBeAttributedToTouch(t){return this._detectionMode===X.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,n){t.classList.toggle(`cdk-focused`,!!n),t.classList.toggle(`cdk-touch-focused`,n===`touch`),t.classList.toggle(`cdk-keyboard-focused`,n===`keyboard`),t.classList.toggle(`cdk-mouse-focused`,n===`mouse`),t.classList.toggle(`cdk-program-focused`,n===`program`)}_setOrigin(t,n=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t===`touch`&&n,this._detectionMode===X.IMMEDIATE){clearTimeout(this._originTimeoutId);let a=this._originFromTouchInteraction?ke:1;this._originTimeoutId=setTimeout(()=>this._origin=null,a)}})}_onFocus(t,n){let a=this._elementInfo.get(n),i=y(t);!a||!a.checkChildren&&n!==i||this._originChanged(n,this._getFocusOrigin(i),a)}_onBlur(t,n){let a=this._elementInfo.get(n);!a||a.checkChildren&&t.relatedTarget instanceof Node&&n.contains(t.relatedTarget)||(this._setClasses(n),this._emitOrigin(a,null))}_emitOrigin(t,n){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(n))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let n=t.rootNode,a=this._rootNodeFocusListenerCount.get(n)||0;a||this._ngZone.runOutsideAngular(()=>{n.addEventListener(`focus`,this._rootNodeFocusAndBlurListener,pt),n.addEventListener(`blur`,this._rootNodeFocusAndBlurListener,pt)}),this._rootNodeFocusListenerCount.set(n,a+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener(`focus`,this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(By(this._stopInputModalityDetector)).subscribe(i=>{this._setOrigin(i,!0)}))}_removeGlobalListeners(t){let n=t.rootNode;if(this._rootNodeFocusListenerCount.has(n)){let a=this._rootNodeFocusListenerCount.get(n);a>1?this._rootNodeFocusListenerCount.set(n,a-1):(n.removeEventListener(`focus`,this._rootNodeFocusAndBlurListener,pt),n.removeEventListener(`blur`,this._rootNodeFocusAndBlurListener,pt),this._rootNodeFocusListenerCount.delete(n))}--this._monitoredElementCount||(this._getWindow().removeEventListener(`focus`,this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,n,a){this._setClasses(t,n),this._emitOrigin(a,n),this._lastFocusOrigin=n}_getClosestElementsInfo(t){let n=[];return this._elementInfo.forEach((a,i)=>{(i===t||a.checkChildren&&i.contains(t))&&n.push([i,a])}),n}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:n,mostRecentModality:a}=this._inputModalityDetector;if(a!==`mouse`||!n||n===t||t.nodeName!==`INPUT`&&t.nodeName!==`TEXTAREA`||t.disabled)return!1;let i=t.labels;if(i){for(let s=0;s<i.length;s++)if(i[s].contains(n))return!0}return!1}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var ft=new WeakMap;var D=(()=>{class e{_appRef;_injector=y$1(ve);_environmentInjector=y$1(me);load(t){let n=this._appRef=this._appRef||this._injector.get(bt$1),a=ft.get(n);a||(a={loaders:new Set,refs:[]},ft.set(n,a),n.onDestroy(()=>{ft.get(n)?.refs.forEach(i=>i.destroy()),ft.delete(n)})),a.loaders.has(t)||(a.loaders.add(t),a.refs.push(XV(t,{environmentInjector:this._environmentInjector})))}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var vt=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵcmp=YC({type:e,selectors:[[`ng-component`]],exportAs:[`cdkVisuallyHidden`],decls:0,vars:0,template:function(n,a){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2})}return e})();var ht;function fn(){if(ht===void 0&&(ht=null,typeof window<`u`)){let e=window;if(e.trustedTypes!==void 0)try{ht=e.trustedTypes.createPolicy(`angular#components`,{createHTML:o=>o})}catch(o){console.error(o)}}return ht}function hn(e){return fn()?.createHTML(e)||e}function Re(e,o,t){e.innerHTML=hn(t.sanitize(z$1.HTML,o)||``)}function vn(e){if(e.type===`characterData`&&e.target instanceof Comment)return!0;if(e.type===`childList`){for(let o=0;o<e.addedNodes.length;o++)if(!(e.addedNodes[o]instanceof Comment))return!1;for(let o=0;o<e.removedNodes.length;o++)if(!(e.removedNodes[o]instanceof Comment))return!1;return!0}return!1}var Fe=(()=>{class e{create(t){return typeof MutationObserver>`u`?null:new MutationObserver(t)}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var Le=(()=>{class e{_mutationObserverFactory=y$1(Fe);_observedElements=new Map;_ngZone=y$1(Ce$1);ngOnDestroy(){this._observedElements.forEach((t,n)=>this._cleanupObserver(n))}observe(t){let n=w(t);return new x(a=>{let s=this._observeElement(n).pipe(Ve$1(c=>c.filter(f=>!vn(f))),bn$1(c=>!!c.length)).subscribe(c=>{this._ngZone.run(()=>{a.next(c)})});return()=>{s.unsubscribe(),this._unobserveElement(n)}})}_observeElement(t){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(t))this._observedElements.get(t).count++;else{let n=new ne,a=this._mutationObserverFactory.create(i=>n.next(i));a&&a.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(t,{observer:a,stream:n,count:1})}return this._observedElements.get(t).stream})}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t))}_cleanupObserver(t){if(this._observedElements.has(t)){let{observer:n,stream:a}=this._observedElements.get(t);n&&n.disconnect(),a.complete(),this._observedElements.delete(t)}}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var na=(()=>{class e{_contentObserver=y$1(Le);_elementRef=y$1(Jr);event=new tt$1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(t){this._debounce=Ft(t),this._subscribe()}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let t=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?t.pipe(Ly(this.debounce)):t).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static ɵfac=function(n){return new(n||e)};static ɵdir=ew({type:e,selectors:[[``,`cdkObserveContent`,``]],inputs:{disabled:[2,`cdkObserveContentDisabled`,`disabled`,ZV],debounce:`debounce`},outputs:{event:`cdkObserveContent`},exportAs:[`cdkObserveContent`]})}return e})();var Pe=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=KC({type:e});static ɵinj=Rd({providers:[Fe]})}return e})();var je=(()=>{class e{_platform=y$1(p);isDisabled(t){return t.hasAttribute(`disabled`)}isVisible(t){return _n(t)&&getComputedStyle(t).visibility===`visible`}isTabbable(t){if(!this._platform.isBrowser)return!1;let n=gn(In(t));if(n&&(Be(n)===-1||!this.isVisible(n)))return!1;let a=t.nodeName.toLowerCase(),i=Be(t);return t.hasAttribute(`contenteditable`)?i!==-1:a===`iframe`||a===`object`||this._platform.WEBKIT&&this._platform.IOS&&!wn(t)?!1:a===`audio`?t.hasAttribute(`controls`)?i!==-1:!1:a===`video`?i===-1?!1:i!==null?!0:this._platform.FIREFOX||t.hasAttribute(`controls`):t.tabIndex>=0}isFocusable(t,n){return An(t)&&!this.isDisabled(t)&&(n?.ignoreVisibility||this.isVisible(t))}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();function gn(e){try{return e.frameElement}catch{return null}}function _n(e){return!!(e.offsetWidth||e.offsetHeight||typeof e.getClientRects==`function`&&e.getClientRects().length)}function yn(e){let o=e.nodeName.toLowerCase();return o===`input`||o===`select`||o===`button`||o===`textarea`}function Nn(e){return xn(e)&&e.type==`hidden`}function Sn(e){return En(e)&&e.hasAttribute(`href`)}function xn(e){return e.nodeName.toLowerCase()==`input`}function En(e){return e.nodeName.toLowerCase()==`a`}function He(e){if(!e.hasAttribute(`tabindex`)||e.tabIndex===void 0)return!1;let o=e.getAttribute(`tabindex`);return!!(o&&!isNaN(parseInt(o,10)))}function Be(e){if(!He(e))return null;let o=parseInt(e.getAttribute(`tabindex`)||``,10);return isNaN(o)?-1:o}function wn(e){let o=e.nodeName.toLowerCase(),t=o===`input`&&e.type;return t===`text`||t===`password`||o===`select`||o===`textarea`}function An(e){return Nn(e)?!1:yn(e)||Sn(e)||e.hasAttribute(`contenteditable`)||He(e)}function In(e){return e.ownerDocument&&e.ownerDocument.defaultView||window}var gt=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>{!this.focusLastTabbableElement()&&this._checker.isFocusable(this._element)&&this._element.focus()};endAnchorListener=()=>{!this.focusFirstTabbableElement()&&this._checker.isFocusable(this._element)&&this._element.focus()};get enabled(){return this._enabled}set enabled(o){this._enabled=o,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(o,this._startAnchor),this._toggleAnchorTabIndex(o,this._endAnchor))}_enabled=!0;constructor(o,t,n,a,i=!1,s){this._element=o,this._checker=t,this._ngZone=n,this._document=a,this._injector=s,i||this.attachAnchors()}destroy(){let o=this._startAnchor,t=this._endAnchor;o&&(o.removeEventListener(`focus`,this.startAnchorListener),o.remove()),t&&(t.removeEventListener(`focus`,this.endAnchorListener),t.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener(`focus`,this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener(`focus`,this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(o){return new Promise(t=>{this._executeOnStable(()=>t(this.focusInitialElement(o)))})}focusFirstTabbableElementWhenReady(o){return new Promise(t=>{this._executeOnStable(()=>t(this.focusFirstTabbableElement(o)))})}focusLastTabbableElementWhenReady(o){return new Promise(t=>{this._executeOnStable(()=>t(this.focusLastTabbableElement(o)))})}_getRegionBoundary(o){let t=this._element.querySelectorAll(`[cdk-focus-region-${o}], [cdkFocusRegion${o}], [cdk-focus-${o}]`);return o==`start`?t.length?t[0]:this._getFirstTabbableElement(this._element):t.length?t[t.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(o){let t=this._element.querySelector(`[cdk-focus-initial], [cdkFocusInitial]`);if(t){if(!this._checker.isFocusable(t)){let n=this._getFirstTabbableElement(t);return n?.focus(o),!!n}return t.focus(o),!0}return this.focusFirstTabbableElement(o)}focusFirstTabbableElement(o){let t=this._getRegionBoundary(`start`);return t&&t.focus(o),!!t}focusLastTabbableElement(o){let t=this._getRegionBoundary(`end`);return t&&t.focus(o),!!t}hasAttached(){return this._hasAttached}_getFirstTabbableElement(o){if(this._checker.isFocusable(o)&&this._checker.isTabbable(o))return o;let t=o.children;for(let n=0;n<t.length;n++){let a=t[n].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(t[n]):null;if(a)return a}return null}_getLastTabbableElement(o){if(this._checker.isFocusable(o)&&this._checker.isTabbable(o))return o;let t=o.children;for(let n=t.length-1;n>=0;n--){let a=t[n].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(t[n]):null;if(a)return a}return null}_createAnchor(){let o=this._document.createElement(`div`);return this._toggleAnchorTabIndex(this._enabled,o),o.classList.add(`cdk-visually-hidden`),o.classList.add(`cdk-focus-trap-anchor`),o.setAttribute(`aria-hidden`,`true`),o}_toggleAnchorTabIndex(o,t){o?t.setAttribute(`tabindex`,`0`):t.removeAttribute(`tabindex`)}toggleAnchors(o){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(o,this._startAnchor),this._toggleAnchorTabIndex(o,this._endAnchor))}_executeOnStable(o){Nl(o,{injector:this._injector})}};var Tn=(()=>{class e{_checker=y$1(je);_ngZone=y$1(Ce$1);_document=y$1(tn$1);_injector=y$1(ve);constructor(){y$1(D).load(vt)}create(t,n=!1){return new gt(t,this._checker,this._ngZone,this._document,n,this._injector)}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var Ke=new S(`liveAnnouncerElement`,{providedIn:`root`,factory:()=>null});var Ve=new S(`LIVE_ANNOUNCER_DEFAULT_OPTIONS`);var Mn=0;var Dn=(()=>{class e{_ngZone=y$1(Ce$1);_defaultOptions=y$1(Ve,{optional:!0});_liveElement;_document=y$1(tn$1);_sanitizer=y$1(it);_previousTimeout;_currentPromise;_currentResolve;constructor(){let t=y$1(Ke,{optional:!0});this._liveElement=t||this._createLiveElement()}announce(t,...n){let a=this._defaultOptions,i,s;return n.length===1&&typeof n[0]==`number`?s=n[0]:[i,s]=n,this.clear(),clearTimeout(this._previousTimeout),i||(i=a&&a.politeness?a.politeness:`polite`),s==null&&a&&(s=a.duration),this._liveElement.setAttribute(`aria-live`,i),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(c=>this._currentResolve=c)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!t||typeof t==`string`?this._liveElement.textContent=t:Re(this._liveElement,t,this._sanitizer),typeof s==`number`&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent=``)}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let t=`cdk-live-announcer-element`,n=this._document.getElementsByClassName(t),a=this._document.createElement(`div`);for(let i=0;i<n.length;i++)n[i].remove();return a.classList.add(t),a.classList.add(`cdk-visually-hidden`),a.setAttribute(`aria-atomic`,`true`),a.setAttribute(`aria-live`,`polite`),a.id=`cdk-live-announcer-${Mn++}`,this._document.body.appendChild(a),a}_exposeAnnouncerToModals(t){let n=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let a=0;a<n.length;a++){let i=n[a],s=i.getAttribute(`aria-owns`);s?s.indexOf(t)===-1&&i.setAttribute(`aria-owns`,s+` `+t):i.setAttribute(`aria-owns`,t)}}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var C=(function(e){return e[e.NONE=0]=`NONE`,e[e.BLACK_ON_WHITE=1]=`BLACK_ON_WHITE`,e[e.WHITE_ON_BLACK=2]=`WHITE_ON_BLACK`,e})(C||{});var Ue=`cdk-high-contrast-black-on-white`;var ze=`cdk-high-contrast-white-on-black`;var Bt=`cdk-high-contrast-active`;var We=(()=>{class e{_platform=y$1(p);_hasCheckedHighContrastMode=!1;_document=y$1(tn$1);_breakpointSubscription;constructor(){this._breakpointSubscription=y$1(Ct).observe(`(forced-colors: active)`).subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return C.NONE;let t=this._document.createElement(`div`);t.style.backgroundColor=`rgb(1,2,3)`,t.style.position=`absolute`,this._document.body.appendChild(t);let n=this._document.defaultView||window,a=n&&n.getComputedStyle?n.getComputedStyle(t):null,i=(a&&a.backgroundColor||``).replace(/ /g,``);switch(t.remove(),i){case`rgb(0,0,0)`:case`rgb(45,50,54)`:case`rgb(32,32,32)`:return C.WHITE_ON_BLACK;case`rgb(255,255,255)`:case`rgb(255,250,239)`:return C.BLACK_ON_WHITE}return C.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let t=this._document.body.classList;t.remove(Bt,Ue,ze),this._hasCheckedHighContrastMode=!0;let n=this.getHighContrastMode();n===C.BLACK_ON_WHITE?t.add(Bt,Ue):n===C.WHITE_ON_BLACK&&t.add(Bt,ze)}}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var kn=(()=>{class e{constructor(){y$1(We)._applyBodyHighContrastModeCssClasses()}static ɵfac=function(n){return new(n||e)};static ɵmod=KC({type:e});static ɵinj=Rd({imports:[Pe]})}return e})();var Cn=200;var _t=class{_letterKeyStream=new ne;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new ne;selectedItem=this._selectedItem;constructor(o,t){let n=typeof t?.debounceInterval==`number`?t.debounceInterval:Cn;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(o),this._setupKeyHandler(n)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(o){this._selectedItemIndex=o}setItems(o){this._items=o}handleKey(o){let t=o.keyCode;o.key&&o.key.length===1?this._letterKeyStream.next(o.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(o){this._letterKeyStream.pipe(gd(t=>this._pressedLetters.push(t)),Ly(o),bn$1(()=>this._pressedLetters.length>0),Ve$1(()=>this._pressedLetters.join(``).toLocaleUpperCase())).subscribe(t=>{for(let n=1;n<this._items.length+1;n++){let a=(this._selectedItemIndex+n)%this._items.length,i=this._items[a];if(!this._skipPredicateFn?.(i)&&i.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(i);break}}this._pressedLetters=[]})}};function Ze(e,...o){return o.length?o.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var j=class{_items;_activeItemIndex=ze$1(-1);_activeItem=ze$1(null);_wrap=!1;_typeaheadSubscription=J$1.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=o=>o.disabled;constructor(o,t){this._items=o,o instanceof zi?this._itemChangesSubscription=o.changes.subscribe(n=>this._itemsChanged(n.toArray())):Ar(o)&&(this._effectRef=ac(()=>this._itemsChanged(o()),{injector:t}))}tabOut=new ne;change=new ne;skipPredicate(o){return this._skipPredicateFn=o,this}withWrap(o=!0){return this._wrap=o,this}withVerticalOrientation(o=!0){return this._vertical=o,this}withHorizontalOrientation(o){return this._horizontal=o,this}withAllowedModifierKeys(o){return this._allowedModifierKeys=o,this}withTypeAhead(o=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new _t(t,{debounceInterval:typeof o==`number`?o:void 0,skipPredicate:n=>this._skipPredicateFn(n)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(n=>{this.setActiveItem(n)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(o=!0){return this._homeAndEnd=o,this}withPageUpDown(o=!0,t=10){return this._pageUpAndDown={enabled:o,delta:t},this}setActiveItem(o){let t=this._activeItem();this.updateActiveItem(o),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(o){let t=o.keyCode,a=[`altKey`,`ctrlKey`,`metaKey`,`shiftKey`].every(i=>!o[i]||this._allowedModifierKeys.indexOf(i)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&a){this.setNextItemActive();break}else return;case 38:if(this._vertical&&a){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&a){this._horizontal===`rtl`?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&a){this._horizontal===`rtl`?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&a){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&a){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&a){let i=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(i>0?i:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&a){let i=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(i<s?i:s-1,-1);break}else return;default:(a||Ze(o,`shiftKey`))&&this._typeahead?.handleKey(o);return}this._typeahead?.reset(),o.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(o){let t=this._getItemsArray(),n=typeof o==`number`?o:t.indexOf(o),a=t[n];this._activeItem.set(a??null),this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(o){this._wrap?this._setActiveInWrapMode(o):this._setActiveInDefaultMode(o)}_setActiveInWrapMode(o){let t=this._getItemsArray();for(let n=1;n<=t.length;n++){let a=(this._activeItemIndex()+o*n+t.length)%t.length,i=t[a];if(!this._skipPredicateFn(i)){this.setActiveItem(a);return}}}_setActiveInDefaultMode(o){this._setActiveItemByIndex(this._activeItemIndex()+o,o)}_setActiveItemByIndex(o,t){let n=this._getItemsArray();if(n[o]){for(;this._skipPredicateFn(n[o]);)if(o+=t,!n[o])return;this.setActiveItem(o)}}_getItemsArray(){return Ar(this._items)?this._items():this._items instanceof zi?this._items.toArray():this._items}_itemsChanged(o){this._typeahead?.setItems(o);let t=this._activeItem();if(t){let n=o.indexOf(t);n>-1&&n!==this._activeItemIndex()&&(this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n))}}};var Ut=class extends j{setActiveItem(o){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(o),this.activeItem&&this.activeItem.setActiveStyles()}};var zt=class extends j{_origin=`program`;setFocusOrigin(o){return this._origin=o,this}setActiveItem(o){super.setActiveItem(o),this.activeItem&&this.activeItem.focus(this._origin)}};var Ge=new Map;var jt=class e{_appId=y$1(Tt);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(o,t=!1){this._appId!==`ng`&&(o+=this._appId);let n=Ge.get(o);return n===void 0?n=0:n++,Ge.set(o,n),`${o}${t?e._infix+`-`:``}${n}`}static ɵfac=function(t){return new(t||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})};var Ye=` `;function On(e,o,t){let n=Nt(e,o);t=t.trim(),!n.some(a=>a.trim()===t)&&(n.push(t),e.setAttribute(o,n.join(Ye)))}function Rn(e,o,t){let n=Nt(e,o);t=t.trim();let a=n.filter(i=>i!==t);a.length?e.setAttribute(o,a.join(Ye)):e.removeAttribute(o)}function Nt(e,o){return e.getAttribute(o)?.match(/\S+/g)??[]}var Qe=`cdk-describedby-message`;var yt=`cdk-describedby-host`;var Kt=0;var ni=(()=>{class e{_platform=y$1(p);_document=y$1(tn$1);_messageRegistry=new Map;_messagesContainer=null;_id=`${Kt++}`;constructor(){y$1(D).load(vt),this._id=y$1(Tt)+`-`+Kt++}describe(t,n,a){if(!this._canBeDescribed(t,n))return;let i=Ht(n,a);typeof n!=`string`?($e(n,this._id),this._messageRegistry.set(i,{messageElement:n,referenceCount:0})):this._messageRegistry.has(i)||this._createMessageElement(n,a),this._isElementDescribedByMessage(t,i)||this._addMessageReference(t,i)}removeDescription(t,n,a){if(!n||!this._isElementNode(t))return;let i=Ht(n,a);if(this._isElementDescribedByMessage(t,i)&&this._removeMessageReference(t,i),typeof n==`string`){let s=this._messageRegistry.get(i);s&&s.referenceCount===0&&this._deleteMessageElement(i)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let t=this._document.querySelectorAll(`[${yt}="${this._id}"]`);for(let n=0;n<t.length;n++)this._removeCdkDescribedByReferenceIds(t[n]),t[n].removeAttribute(yt);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(t,n){let a=this._document.createElement(`div`);$e(a,this._id),a.textContent=t,n&&a.setAttribute(`role`,n),this._createMessagesContainer(),this._messagesContainer.appendChild(a),this._messageRegistry.set(Ht(t,n),{messageElement:a,referenceCount:0})}_deleteMessageElement(t){this._messageRegistry.get(t)?.messageElement?.remove(),this._messageRegistry.delete(t)}_createMessagesContainer(){if(this._messagesContainer)return;let t=`cdk-describedby-message-container`,n=this._document.querySelectorAll(`.${t}[platform="server"]`);for(let i=0;i<n.length;i++)n[i].remove();let a=this._document.createElement(`div`);a.style.visibility=`hidden`,a.classList.add(t),a.classList.add(`cdk-visually-hidden`),this._platform.isBrowser||a.setAttribute(`platform`,`server`),this._document.body.appendChild(a),this._messagesContainer=a}_removeCdkDescribedByReferenceIds(t){let n=Nt(t,`aria-describedby`).filter(a=>a.indexOf(Qe)!=0);t.setAttribute(`aria-describedby`,n.join(` `))}_addMessageReference(t,n){let a=this._messageRegistry.get(n);On(t,`aria-describedby`,a.messageElement.id),t.setAttribute(yt,this._id),a.referenceCount++}_removeMessageReference(t,n){let a=this._messageRegistry.get(n);a.referenceCount--,Rn(t,`aria-describedby`,a.messageElement.id),t.removeAttribute(yt)}_isElementDescribedByMessage(t,n){let a=Nt(t,`aria-describedby`),i=this._messageRegistry.get(n),s=i&&i.messageElement.id;return!!s&&a.indexOf(s)!=-1}_canBeDescribed(t,n){if(!this._isElementNode(t))return!1;if(n&&typeof n==`object`)return!0;let a=n==null?``:`${n}`.trim(),i=t.getAttribute(`aria-label`);return a?!i||i.trim()!==a:!1}_isElementNode(t){return t.nodeType===this._document.ELEMENT_NODE}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();function Ht(e,o){return typeof e==`string`?`${o||``}/${e}`:e}function $e(e,o){e.id||(e.id=`${Qe}-${o}-${Kt++}`)}var q=(function(e){return e[e.NORMAL=0]=`NORMAL`,e[e.NEGATED=1]=`NEGATED`,e[e.INVERTED=2]=`INVERTED`,e})(q||{});var St;var L;function mi(){if(L==null){if(typeof document!=`object`||!document||typeof Element!=`function`||!Element)return L=!1,L;if(document.documentElement?.style&&`scrollBehavior`in document.documentElement.style)L=!0;else{let e=Element.prototype.scrollTo;e?L=!/\{\s*\[native code\]\s*\}/.test(e.toString()):L=!1}}return L}function li(){if(typeof document!=`object`||!document)return q.NORMAL;if(St==null){let e=document.createElement(`div`),o=e.style;e.dir=`rtl`,o.width=`1px`,o.overflow=`auto`,o.visibility=`hidden`,o.pointerEvents=`none`,o.position=`absolute`;let t=document.createElement(`div`),n=t.style;n.width=`2px`,n.height=`1px`,e.appendChild(t),document.body.appendChild(e),St=q.NORMAL,e.scrollLeft===0&&(e.scrollLeft=1,St=e.scrollLeft===0?q.NEGATED:q.INVERTED),e.remove()}return St}function bi(){return typeof __karma__<`u`&&!!__karma__||typeof jasmine<`u`&&!!jasmine||typeof jest<`u`&&!!jest||typeof Mocha<`u`&&!!Mocha}var H;var Xe=[`color`,`button`,`checkbox`,`date`,`datetime-local`,`email`,`file`,`hidden`,`image`,`month`,`number`,`password`,`radio`,`range`,`reset`,`search`,`submit`,`tel`,`text`,`time`,`url`,`week`];function fi(){if(H)return H;if(typeof document!=`object`||!document)return H=new Set(Xe),H;let e=document.createElement(`input`);return H=new Set(Xe.filter(o=>(e.setAttribute(`type`,o),e.type===o))),H}var Fn=new S(`MATERIAL_ANIMATIONS`);var qe=null;function Ln(){return y$1(Fn,{optional:!0})?.animationsDisabled||y$1(NE,{optional:!0})===`NoopAnimations`?`di-disabled`:(qe??=y$1(bt).matchMedia(`(prefers-reduced-motion)`).matches,qe?`reduced-motion`:`enabled`)}function K(){return Ln()!==`enabled`}function xi(e){return e==null?``:typeof e==`string`?e:`${e}px`}function wi(e){return e!=null&&`${e}`!=`false`}var _=(function(e){return e[e.FADING_IN=0]=`FADING_IN`,e[e.VISIBLE=1]=`VISIBLE`,e[e.FADING_OUT=2]=`FADING_OUT`,e[e.HIDDEN=3]=`HIDDEN`,e})(_||{});var Vt=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=_.HIDDEN;constructor(o,t,n,a=!1){this._renderer=o,this.element=t,this.config=n,this._animationForciblyDisabledThroughCss=a}fadeOut(){this._renderer.fadeOutRipple(this)}};var Je=z({passive:!0,capture:!0});var Wt=class{_events=new Map;addHandler(o,t,n,a){let i=this._events.get(t);if(i){let s=i.get(n);s?s.add(a):i.set(n,new Set([a]))}else this._events.set(t,new Map([[n,new Set([a])]])),o.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,Je)})}removeHandler(o,t,n){let a=this._events.get(o);if(!a)return;let i=a.get(t);i&&(i.delete(n),i.size===0&&a.delete(t),a.size===0&&(this._events.delete(o),document.removeEventListener(o,this._delegateEventHandler,Je)))}_delegateEventHandler=o=>{let t=y(o);t&&this._events.get(o.type)?.forEach((n,a)=>{(a===t||a.contains(t))&&n.forEach(i=>i.handleEvent(o))})}};var J={enterDuration:225,exitDuration:150};var Pn=800;var tn=z({passive:!0,capture:!0});var en=[`mousedown`,`touchstart`];var nn=[`mouseup`,`mouseleave`,`touchend`,`touchcancel`];var Bn=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵcmp=YC({type:e,selectors:[[`ng-component`]],hostAttrs:[`mat-ripple-style-loader`,``],decls:0,vars:0,template:function(n,a){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return e})();var tt=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Wt;constructor(o,t,n,a,i){this._target=o,this._ngZone=t,this._platform=a,a.isBrowser&&(this._containerElement=w(n)),i&&i.get(D).load(Bn)}fadeInRipple(o,t,n={}){let a=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),i=r(r({},J),n.animation);n.centered&&(o=a.left+a.width/2,t=a.top+a.height/2);let s=n.radius||Un(o,t,a),c=o-a.left,f=t-a.top,A=i.enterDuration,h=document.createElement(`div`);h.classList.add(`mat-ripple-element`),h.style.left=`${c-s}px`,h.style.top=`${f-s}px`,h.style.height=`${s*2}px`,h.style.width=`${s*2}px`,n.color!=null&&(h.style.backgroundColor=n.color),h.style.transitionDuration=`${A}ms`,this._containerElement.appendChild(h);let Qt=window.getComputedStyle(h),ln=Qt.transitionProperty,Xt=Qt.transitionDuration,wt=ln===`none`||Xt===`0s`||Xt===`0s, 0s`||a.width===0&&a.height===0,O=new Vt(this,h,n,wt);h.style.transform=`scale3d(1, 1, 1)`,O.state=_.FADING_IN,n.persistent||(this._mostRecentTransientRipple=O);let et=null;return!wt&&(A||i.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let qt=()=>{et&&(et.fallbackTimer=null),clearTimeout(Jt),this._finishRippleTransition(O)},At=()=>this._destroyRipple(O),Jt=setTimeout(At,A+100);h.addEventListener(`transitionend`,qt),h.addEventListener(`transitioncancel`,At),et={onTransitionEnd:qt,onTransitionCancel:At,fallbackTimer:Jt}}),this._activeRipples.set(O,et),(wt||!A)&&this._finishRippleTransition(O),O}fadeOutRipple(o){if(o.state===_.FADING_OUT||o.state===_.HIDDEN)return;let t=o.element,n=r(r({},J),o.config.animation);t.style.transitionDuration=`${n.exitDuration}ms`,t.style.opacity=`0`,o.state=_.FADING_OUT,(o._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(o)}fadeOutAll(){this._getActiveRipples().forEach(o=>o.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(o=>{o.config.persistent||o.fadeOut()})}setupTriggerEvents(o){let t=w(o);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,en.forEach(n=>{e._eventManager.addHandler(this._ngZone,n,t,this)}))}handleEvent(o){o.type===`mousedown`?this._onMousedown(o):o.type===`touchstart`?this._onTouchStart(o):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{nn.forEach(t=>{this._triggerElement.addEventListener(t,this,tn)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(o){o.state===_.FADING_IN?this._startFadeOutTransition(o):o.state===_.FADING_OUT&&this._destroyRipple(o)}_startFadeOutTransition(o){let t=o===this._mostRecentTransientRipple,{persistent:n}=o.config;o.state=_.VISIBLE,!n&&(!t||!this._isPointerDown)&&o.fadeOut()}_destroyRipple(o){let t=this._activeRipples.get(o)??null;this._activeRipples.delete(o),this._activeRipples.size||(this._containerRect=null),o===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),o.state=_.HIDDEN,t!==null&&(o.element.removeEventListener(`transitionend`,t.onTransitionEnd),o.element.removeEventListener(`transitioncancel`,t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),o.element.remove()}_onMousedown(o){let t=$(o),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Pn;!this._target.rippleDisabled&&!t&&!n&&(this._isPointerDown=!0,this.fadeInRipple(o.clientX,o.clientY,this._target.rippleConfig))}_onTouchStart(o){if(!this._target.rippleDisabled&&!Y(o)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=o.changedTouches;if(t)for(let n=0;n<t.length;n++)this.fadeInRipple(t[n].clientX,t[n].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(o=>{let t=o.state===_.VISIBLE||o.config.terminateOnPointerUp&&o.state===_.FADING_IN;!o.config.persistent&&t&&o.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let o=this._triggerElement;o&&(en.forEach(t=>e._eventManager.removeHandler(t,o,this)),this._pointerUpEventsRegistered&&(nn.forEach(t=>o.removeEventListener(t,this,tn)),this._pointerUpEventsRegistered=!1))}};function Un(e,o,t){let n=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),a=Math.max(Math.abs(o-t.top),Math.abs(o-t.bottom));return Math.sqrt(n*n+a*a)}var Zt=new S(`mat-ripple-global-options`);var Bi=(()=>{class e{_elementRef=y$1(Jr);_animationsDisabled=K();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=y$1(Ce$1),n=y$1(p),a=y$1(Zt,{optional:!0}),i=y$1(ve);this._globalOptions=a||{},this._rippleRenderer=new tt(this,t,this._elementRef,n,i)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:r(r(r({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,n=0,a){return typeof t==`number`?this._rippleRenderer.fadeInRipple(t,n,r(r({},this.rippleConfig),a)):this._rippleRenderer.fadeInRipple(0,0,r(r({},this.rippleConfig),t))}static ɵfac=function(n){return new(n||e)};static ɵdir=ew({type:e,selectors:[[``,`mat-ripple`,``],[``,`matRipple`,``]],hostAttrs:[1,`mat-ripple`],hostVars:2,hostBindings:function(n,a){n&2&&Qm(`mat-ripple-unbounded`,a.unbounded)},inputs:{color:[0,`matRippleColor`,`color`],unbounded:[0,`matRippleUnbounded`,`unbounded`],centered:[0,`matRippleCentered`,`centered`],radius:[0,`matRippleRadius`,`radius`],animation:[0,`matRippleAnimation`,`animation`],disabled:[0,`matRippleDisabled`,`disabled`],trigger:[0,`matRippleTrigger`,`trigger`]},exportAs:[`matRipple`]})}return e})();var zn={capture:!0};var jn=[`focus`,`mousedown`,`mouseenter`,`touchstart`];var Gt=`mat-ripple-loader-uninitialized`;var $t=`mat-ripple-loader-class-name`;var on=`mat-ripple-loader-centered`;var xt=`mat-ripple-loader-disabled`;var an=(()=>{class e{_document=y$1(tn$1);_animationsDisabled=K();_globalRippleOptions=y$1(Zt,{optional:!0});_platform=y$1(p);_ngZone=y$1(Ce$1);_injector=y$1(ve);_eventCleanups;_hosts=new Map;constructor(){let t=y$1(Wr).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>jn.map(n=>t.listen(this._document,n,this._onInteraction,zn)))}ngOnDestroy(){let t=this._hosts.keys();for(let n of t)this.destroyRipple(n);this._eventCleanups.forEach(n=>n())}configureRipple(t,n){t.setAttribute(Gt,this._globalRippleOptions?.namespace??``),(n.className||!t.hasAttribute($t))&&t.setAttribute($t,n.className||``),n.centered&&t.setAttribute(on,``),n.disabled&&t.setAttribute(xt,``)}setDisabled(t,n){let a=this._hosts.get(t);a?(a.target.rippleDisabled=n,!n&&!a.hasSetUpEvents&&(a.hasSetUpEvents=!0,a.renderer.setupTriggerEvents(t))):n?t.setAttribute(xt,``):t.removeAttribute(xt)}_onInteraction=t=>{let n=y(t);if(n instanceof HTMLElement){let a=n.closest(`[${Gt}="${this._globalRippleOptions?.namespace??``}"]`);a&&this._createRipple(a)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(`.mat-ripple`)?.remove();let n=this._document.createElement(`span`);n.classList.add(`mat-ripple`,t.getAttribute($t)),t.append(n);let a=this._globalRippleOptions,i=this._animationsDisabled?0:a?.animation?.enterDuration??J.enterDuration,s=this._animationsDisabled?0:a?.animation?.exitDuration??J.exitDuration,c={rippleDisabled:this._animationsDisabled||a?.disabled||t.hasAttribute(xt),rippleConfig:{centered:t.hasAttribute(on),terminateOnPointerUp:a?.terminateOnPointerUp,animation:{enterDuration:i,exitDuration:s}}},f=new tt(c,this._ngZone,n,this._platform,this._injector),A=!c.rippleDisabled;A&&f.setupTriggerEvents(t),this._hosts.set(t,{target:c,renderer:f,hasSetUpEvents:A}),t.removeAttribute(Gt)}destroyRipple(t){let n=this._hosts.get(t);n&&(n.renderer._removeTriggerEvents(),this._hosts.delete(t))}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var rn=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵcmp=YC({type:e,selectors:[[`structural-styles`]],decls:0,vars:0,template:function(n,a){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--%NS%mat-focus-indicator-display, none);
  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);
  border-style: var(--%NS%mat-focus-indicator-border-style, solid);
  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);
  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --%NS%mat-focus-indicator-display: block;
    --%NS%mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return e})();var Hn=[`*`,[[``,`progressIndicator`,``]]];var Kn=[`*`,`[progressIndicator]`];function Vn(e,o){e&1&&(iu(0,`div`,1),gb(1,1),su())}var Wn=new S(`MAT_BUTTON_CONFIG`);function sn(e){return e==null?void 0:KV(e)}var Yt=(()=>{class e{_elementRef=y$1(Jr);_ngZone=y$1(Ce$1);_animationsDisabled=K();_config=y$1(Wn,{optional:!0});_focusMonitor=y$1(Pt);_cleanupClick;_renderer=y$1(Uc);_rippleLoader=y$1(an);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}showProgress=BV(!1,{transform:ZV});constructor(){y$1(D).load(rn);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName===`A`,this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:`mat-mdc-button-ripple`})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t=`program`,n){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,n):this._elementRef.nativeElement.focus(n)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,`click`,t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static ɵfac=function(n){return new(n||e)};static ɵdir=ew({type:e,hostAttrs:[1,`mat-mdc-button-base`],hostVars:15,hostBindings:function(n,a){n&2&&(Sm(`disabled`,a._getDisabledAttribute())(`aria-disabled`,a._getAriaDisabled())(`tabindex`,a._getTabIndex()),Ab(a.color?`mat-`+a.color:``),Qm(`mat-mdc-button-progress-indicator-shown`,a.showProgress())(`mat-mdc-button-disabled`,a.disabled)(`mat-mdc-button-disabled-interactive`,a.disabledInteractive)(`mat-unthemed`,!a.color)(`_mat-animation-noopable`,a._animationsDisabled))},inputs:{color:`color`,disableRipple:[2,`disableRipple`,`disableRipple`,ZV],disabled:[2,`disabled`,`disabled`,ZV],ariaDisabled:[2,`aria-disabled`,`ariaDisabled`,ZV],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,ZV],tabIndex:[2,`tabIndex`,`tabIndex`,sn],_tabindex:[2,`tabindex`,`_tabindex`,sn],showProgress:[1,`showProgress`]}})}return e})();var Zn=(()=>{class e extends Yt{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static ɵfac=function(n){return new(n||e)};static ɵcmp=YC({type:e,selectors:[[`button`,`mat-icon-button`,``],[`a`,`mat-icon-button`,``],[`button`,`matIconButton`,``],[`a`,`matIconButton`,``]],hostAttrs:[1,`mdc-icon-button`,`mat-mdc-icon-button`],exportAs:[`matButton`,`matAnchor`],features:[gm],ngContentSelectors:Kn,decls:5,vars:1,consts:[[1,`mat-mdc-button-persistent-ripple`,`mdc-icon-button__ripple`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(n,a){n&1&&(hb(Hn),Am(0,`span`,0),gb(1),zw(2,Vn,2,0,`div`,1),Am(3,`span`,2)(4,`span`,3)),n&2&&(cT(2),Qw(a.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--%NS%mat-icon-button-state-layer-size, 40px);
  height: var(--%NS%mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--%NS%mat-icon-button-icon-size, 24px);
  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-icon-button-touch-target-size, 48px);
  display: var(--%NS%mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--%NS%mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--%NS%mat-icon-button-icon-size, 24px);
  height: var(--%NS%mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return e})();var Gn=new S(`cdk-dir-doc`,{providedIn:`root`,factory:()=>y$1(tn$1)});var $n=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function cn(e){let o=e?.toLowerCase()||``;return o===`auto`&&typeof navigator<`u`&&navigator?.language?$n.test(navigator.language)?`rtl`:`ltr`:o===`rtl`?`rtl`:`ltr`}var Yn=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ze$1(`ltr`);change=new tt$1;constructor(){let t=y$1(Gn,{optional:!0});if(t){let n=t.body?t.body.dir:null,a=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(cn(n||a||`ltr`))}}ngOnDestroy(){this.change.complete()}static ɵfac=function(n){return new(n||e)};static ɵprov=Kr({token:e,factory:e.ɵfac})}return e})();var Et=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=KC({type:e});static ɵinj=Rd({})}return e})();var dn=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=KC({type:e});static ɵinj=Rd({imports:[Et]})}return e})();var Qn=[[[``,8,`material-icons`,3,`iconPositionEnd`,``],[`mat-icon`,3,`iconPositionEnd`,``],[``,`matButtonIcon`,``,3,`iconPositionEnd`,``]],`*`,[[``,`iconPositionEnd`,``,8,`material-icons`],[`mat-icon`,`iconPositionEnd`,``],[``,`matButtonIcon`,``,`iconPositionEnd`,``]],[[``,`progressIndicator`,``]]];var Xn=[`.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])`,`*`,`.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]`,`[progressIndicator]`];function qn(e,o){e&1&&(iu(0,`div`,2),gb(1,3),su())}var mn=new Map([[`text`,[`mat-mdc-button`]],[`filled`,[`mdc-button--unelevated`,`mat-mdc-unelevated-button`]],[`elevated`,[`mdc-button--raised`,`mat-mdc-raised-button`]],[`outlined`,[`mdc-button--outlined`,`mat-mdc-outlined-button`]],[`tonal`,[`mat-tonal-button`]]]);var hr=(()=>{class e extends Yt{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||`text`)}_appearance=null;constructor(){super();let t=Jn(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let n=this._elementRef.nativeElement.classList,a=this._appearance?mn.get(this._appearance):null,i=mn.get(t);a&&n.remove(...a),n.add(...i),this._appearance=t}static ɵfac=function(n){return new(n||e)};static ɵcmp=YC({type:e,selectors:[[`button`,`matButton`,``],[`a`,`matButton`,``],[`button`,`mat-button`,``],[`button`,`mat-raised-button`,``],[`button`,`mat-flat-button`,``],[`button`,`mat-stroked-button`,``],[`a`,`mat-button`,``],[`a`,`mat-raised-button`,``],[`a`,`mat-flat-button`,``],[`a`,`mat-stroked-button`,``]],hostAttrs:[1,`mdc-button`],inputs:{appearance:[0,`matButton`,`appearance`]},exportAs:[`matButton`,`matAnchor`],features:[gm],ngContentSelectors:Xn,decls:8,vars:5,consts:[[1,`mat-mdc-button-persistent-ripple`],[1,`mdc-button__label`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(n,a){n&1&&(hb(Qn),Am(0,`span`,0),gb(1),iu(2,`span`,1),gb(3,1),su(),gb(4,2),zw(5,qn,2,0,`div`,2),Am(6,`span`,3)(7,`span`,4)),n&2&&(Qm(`mdc-button__ripple`,!a._isFab)(`mdc-fab__ripple`,a._isFab),cT(5),Qw(a.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--%NS%mat-button-text-horizontal-padding, 12px);
  height: var(--%NS%mat-button-text-container-height, 40px);
  font-family: var(--%NS%mat-button-text-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-text-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-text-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-text-label-text-transform);
  font-weight: var(--%NS%mat-button-text-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-text-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--%NS%mat-button-text-label-text-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--%NS%mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-text-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-text-touch-target-size, 48px);
  display: var(--%NS%mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-filled-container-height, 40px);
  font-family: var(--%NS%mat-button-filled-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-filled-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-filled-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-filled-label-text-transform);
  font-weight: var(--%NS%mat-button-filled-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-filled-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-state-layer-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-filled-touch-target-size, 48px);
  display: var(--%NS%mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--%NS%mat-button-filled-label-text-color, var(--%NS%mat-sys-on-primary));
  background-color: var(--%NS%mat-button-filled-container-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-filled-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --%NS%mat-progress-spinner-active-indicator-color: var(--%NS%mat-button-filled-progress-active-indicator-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--%NS%mat-button-protected-container-elevation-shadow, var(--%NS%mat-sys-level1));
  height: var(--%NS%mat-button-protected-container-height, 40px);
  font-family: var(--%NS%mat-button-protected-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-protected-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-protected-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-protected-label-text-transform);
  font-weight: var(--%NS%mat-button-protected-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-protected-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-protected-touch-target-size, 48px);
  display: var(--%NS%mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--%NS%mat-button-protected-label-text-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-button-protected-container-color, var(--%NS%mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-protected-container-shape, var(--%NS%mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--%NS%mat-button-protected-hover-container-elevation-shadow, var(--%NS%mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--%NS%mat-button-protected-focus-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--%NS%mat-button-protected-pressed-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-protected-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--%NS%mat-button-protected-disabled-container-elevation-shadow, var(--%NS%mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-outlined-container-height, 40px);
  font-family: var(--%NS%mat-button-outlined-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-outlined-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-outlined-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-outlined-label-text-transform);
  font-weight: var(--%NS%mat-button-outlined-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  border-radius: var(--%NS%mat-button-outlined-container-shape, var(--%NS%mat-sys-corner-full));
  border-width: var(--%NS%mat-button-outlined-outline-width, 1px);
  padding: 0 var(--%NS%mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-outlined-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-outlined-touch-target-size, 48px);
  display: var(--%NS%mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--%NS%mat-button-outlined-label-text-color, var(--%NS%mat-sys-primary));
  border-color: var(--%NS%mat-button-outlined-outline-color, var(--%NS%mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: var(--%NS%mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-tonal-container-height, 40px);
  font-family: var(--%NS%mat-button-tonal-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-tonal-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-tonal-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-tonal-label-text-transform);
  font-weight: var(--%NS%mat-button-tonal-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--%NS%mat-button-tonal-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-tonal-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-tonal-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-tonal-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-secondary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-tonal-touch-target-size, 48px);
  display: var(--%NS%mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return e})();function Jn(e){return e.hasAttribute(`mat-raised-button`)?`elevated`:e.hasAttribute(`mat-stroked-button`)?`outlined`:e.hasAttribute(`mat-flat-button`)?`filled`:e.hasAttribute(`mat-button`)?`text`:null}var vr=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=KC({type:e});static ɵinj=Rd({imports:[dn,Et]})}return e})();export{mi as A,w as B,hn as C,kn as D,jt as E,q as F,xi as H,rn as I,tt as L,ni as M,p as N,kt as O,pn as P,vr as R,fi as S,je as T,y as U,wi as V,zt as W,Zt as _,Dn as a,bo as b,K as c,Tn as d,Ut as f,Zn as g,Ze as h,D as i,na as j,li as k,Ln as l,Yn as m,Bi as n,Et as o,Y as p,Ct as r,Ft as s,$ as t,Pt as u,an as v,hr as w,bt as x,bi as y,vt as z};