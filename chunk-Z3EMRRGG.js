import{a as V,b as U,c as B}from"./chunk-LJLQVCCH.js";import{$ as M,H as pe,L as w,M as a,N as q,R as $,S as x,T as z,V as h,W as T,Z as X,_ as H,aa as C,ba as J,ca as y,da as k,ea as Q,p as Y}from"./chunk-CFACD5PN.js";import{f as _,g as K}from"./chunk-4PTZGMQB.js";var Z=_(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var ge="Provided shouldReconnect() returned false. Closing permanently.",ye="Provided shouldReconnect() resolved to false. Closing permanently.",F=function(){function n(e,t,s){if(s===void 0&&(s={}),this.url=e,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=n.CONNECTING,this.OPEN=n.OPEN,this.CLOSING=n.CLOSING,this.CLOSED=n.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},t==null||typeof t=="string"||Array.isArray(t)?this.protocols=t:s=t,this.options=ke(s),!this.options.wsConstructor)if(typeof WebSocket<"u")this.options.wsConstructor=WebSocket;else throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.openNewWebSocket()}return Object.defineProperty(n.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach(function(s){var i=Ee(s);i!=null?e+=i:t=!0}),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"readyState",{get:function(){return this.isClosed?n.CLOSED:n.OPEN},enumerable:!0,configurable:!0}),n.prototype.close=function(e,t){this.disposeSocket(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},n.prototype.send=function(e){if(this.isClosed)throw new Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e)},n.prototype.reconnect=function(){if(this.isClosed)throw new Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},n.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},n.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},n.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(function(s){return s!==t}))},n.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,s=t.connectTimeout,i=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var r=new i(this.url,this.protocols);r.onclose=function(o){return e.handleClose(o)},r.onerror=function(o){return e.handleError(o)},r.onmessage=function(o){return e.handleMessage(o)},r.onopen=function(o){return e.handleOpen(o)},this.connectTimeoutId=setTimeout(function(){e.clearConnectTimeout(),e.disposeSocket(),e.handleClose(void 0)},s),this.ws=r}},n.prototype.handleOpen=function(e){var t=this;if(!(!this.ws||this.isClosed)){var s=this.options.allClearResetTime;this.debugLog("WebSocket opened."),this.binaryTypeInternal!=null?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(i){return t.send(i)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var i=s/1e3|0;t.debugLog("WebSocket remained open for "+i+" seconds. Resetting retry time and count.")},s)}},n.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e)},n.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var s=this.options,i=s.maxReconnectAttempts,r=s.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",e),this.reconnectCount>=i){this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());return}var o=!e||r(e);typeof o=="boolean"?this.handleWillReconnect(o,e,ge):o.then(function(c){t.isClosed||t.handleWillReconnect(c,e,ye)})}},n.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.")},n.prototype.handleWillReconnect=function(e,t,s){e?this.reestablishConnection():this.stopReconnecting(t,s)},n.prototype.reestablishConnection=function(){var e=this,t=this.options,s=t.minReconnectDelay,i=t.maxReconnectDelay,r=t.reconnectBackoffFactor;this.reconnectCount++;var o=this.nextRetryTime;this.nextRetryTime=Math.max(s,Math.min(this.nextRetryTime*r,i)),setTimeout(function(){return e.openNewWebSocket()},o);var c=o/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+c+" seconds.")},n.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),e&&this.dispatchEventOfType("close",e)},n.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},n.prototype.disposeSocket=function(e,t){this.ws&&(this.ws.onerror=S,this.ws.onclose=S,this.ws.onmessage=S,this.ws.onopen=S,this.ws.close(e,t),this.ws=void 0)},n.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},n.prototype.clearConnectTimeout=function(){this.connectTimeoutId!=null&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},n.prototype.clearAllClearTimeout=function(){this.allClearTimeoutId!=null&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},n.prototype.dispatchEventOfType=function(e,t){var s=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t);break}return e in this.listeners&&this.listeners[e].slice().forEach(function(i){return s.callListener(i,t)}),!t||!t.defaultPrevented},n.prototype.callListener=function(e,t){typeof e=="function"?e.call(this,t):e.handleEvent.call(this,t)},n.prototype.debugLog=function(e){this.options.debug&&console.log(e)},n.prototype.getTooManyFailedReconnectsMessage=function(){var e=this.options.maxReconnectAttempts;return"Failed to reconnect after "+e+" "+ve("attempt",e)+". Closing permanently."},n.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},n.CONNECTING=0,n.OPEN=1,n.CLOSING=2,n.CLOSED=3,n}();D.default=F;function ke(n){var e={};return Object.keys(F.DEFAULT_OPTIONS).forEach(function(t){var s=n[t];e[t]=s===void 0?F.DEFAULT_OPTIONS[t]:s}),e}function Ee(n){return typeof n=="string"?2*n.length:n instanceof ArrayBuffer?n.byteLength:n instanceof Blob?n.size:void 0}function ve(n,e){return e===1?n:n+"s"}function S(){}});var se=_((Ke,te)=>{"use strict";var ee=function(){if(typeof self=="object"&&self)return self;if(typeof window=="object"&&window)return window;throw new Error("Unable to resolve global `this`")};te.exports=function(){if(this)return this;if(typeof globalThis=="object"&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch{return ee()}try{return __global__||ee()}finally{delete Object.prototype.__global__}}()});var ne=_((Ye,_e)=>{_e.exports={name:"websocket",description:"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",keywords:["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],author:"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",contributors:["I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],version:"1.0.34",repository:{type:"git",url:"https://github.com/theturtle32/WebSocket-Node.git"},homepage:"https://github.com/theturtle32/WebSocket-Node",engines:{node:">=4.0.0"},dependencies:{bufferutil:"^4.0.1",debug:"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2",yaeti:"^0.0.6"},devDependencies:{"buffer-equal":"^1.0.0",gulp:"^4.0.2","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1",jshint:"^2.0.0",tape:"^4.9.1"},config:{verbose:!1},scripts:{test:"tape test/unit/*.js",gulp:"gulp"},main:"index",directories:{lib:"./lib"},browser:"lib/browser.js",license:"Apache-2.0"}});var re=_((Ve,ie)=>{"use strict";ie.exports=ne().version});var le=_((Ue,ce)=>{"use strict";var E;if(typeof globalThis=="object")E=globalThis;else try{E=se()}catch{}finally{if(!E&&typeof window<"u"&&(E=window),!E)throw new Error("Could not determine global this")}var I=E.WebSocket||E.MozWebSocket,we=re();function oe(n,e){var t;return e?t=new I(n,e):t=new I(n),t}I&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(n){Object.defineProperty(oe,n,{get:function(){return I[n]}})});ce.exports={w3cwebsocket:I?oe:null,version:we}});var be=K(Z());var Qe=K(pe());var Te=120,j=class{constructor(e){this.provider=e,this.maxBackfillBlocks=Te}getNewHeadsBackfill(e,t,s){return a(this,void 0,void 0,function*(){b(e);let i=yield this.getBlockNumber();if(b(e),t.length===0)return this.getHeadEventsInRange(Math.max(s,i-this.maxBackfillBlocks)+1,i+1);let r=h(t[t.length-1].number),o=i-this.maxBackfillBlocks+1;if(r<=o)return this.getHeadEventsInRange(o,i+1);let c=yield this.getReorgHeads(e,t);b(e);let d=yield this.getHeadEventsInRange(r+1,i+1);return b(e),[...c,...d]})}getLogsBackfill(e,t,s,i){return a(this,void 0,void 0,function*(){b(e);let r=yield this.getBlockNumber();if(b(e),s.length===0)return this.getLogsInRange(t,Math.max(i,r-this.maxBackfillBlocks)+1,r+1);let o=h(s[s.length-1].blockNumber),c=r-this.maxBackfillBlocks+1;if(o<c)return this.getLogsInRange(t,c,r+1);let d=yield this.getCommonAncestor(e,s);b(e);let p=s.filter(l=>h(l.blockNumber)>d.blockNumber).map(l=>Object.assign(Object.assign({},l),{removed:!0})),m=d.blockNumber===Number.NEGATIVE_INFINITY?h(s[0].blockNumber):d.blockNumber,u=yield this.getLogsInRange(t,m,r+1);return u=u.filter(l=>l&&(h(l.blockNumber)>d.blockNumber||h(l.logIndex)>d.logIndex)),b(e),[...p,...u]})}setMaxBackfillBlock(e){this.maxBackfillBlocks=e}getBlockNumber(){return a(this,void 0,void 0,function*(){let e=yield this.provider.send("eth_blockNumber");return h(e)})}getHeadEventsInRange(e,t){return a(this,void 0,void 0,function*(){if(e>=t)return[];let s=[];for(let r=e;r<t;r++)s.push({method:"eth_getBlockByNumber",params:[T(r),!1]});return(yield this.provider.sendBatch(s)).map(ae)})}getReorgHeads(e,t){return a(this,void 0,void 0,function*(){let s=[];for(let i=t.length-1;i>=0;i--){let r=t[i],o=yield this.getBlockByNumber(h(r.number));if(b(e),r.hash===o.hash)break;s.push(ae(o))}return s.reverse()})}getBlockByNumber(e){return a(this,void 0,void 0,function*(){return this.provider.send("eth_getBlockByNumber",[T(e),!1])})}getCommonAncestor(e,t){return a(this,void 0,void 0,function*(){let s=yield this.getBlockByNumber(h(t[t.length-1].blockNumber));b(e);for(let i=t.length-1;i>=0;i--){let r=t[i];if(r.blockNumber!==s.number&&(s=yield this.getBlockByNumber(h(r.blockNumber))),r.blockHash===s.hash)return{blockNumber:h(r.blockNumber),logIndex:h(r.logIndex)}}return{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY}})}getLogsInRange(e,t,s){return a(this,void 0,void 0,function*(){if(t>=s)return[];let i=Object.assign(Object.assign({},e),{fromBlock:T(t),toBlock:T(s-1)});return this.provider.send("eth_getLogs",[i])})}};function ae(n){let e=Object.assign({},n);return delete e.totalDifficulty,delete e.transactions,delete e.uncles,e}function Ie(n){return me(n,e=>e.hash)}function Ne(n){return me(n,e=>`${e.blockHash}/${e.logIndex}`)}function me(n,e){let t=new Set,s=[];return n.forEach(i=>{let r=e(i);t.has(r)||(t.add(r),s.push(i))}),s}var Be=new Error("Cancelled");function b(n){if(n())throw Be}var Ce=3e4,Se=1e4,ue=6e4,he=5,Ae=10,de=class extends U{constructor(e,t){var s;let i=B.getApiKey(e.apiKey),r=B.getAlchemyNetwork(e.network),o=B.getAlchemyConnectionInfo(r,i,"wss"),c=`alchemy-sdk-${X}`,d=new be.default((s=e.url)!==null&&s!==void 0?s:o.url,c,{wsConstructor:t??Re()}),p=$[r];super(d,p),this._events=[],this.virtualSubscriptionsById=new Map,this.virtualIdsByPhysicalId=new Map,this.handleMessage=m=>{let u=JSON.parse(m.data);if(!De(u))return;let l=u.params.subscription,f=this.virtualIdsByPhysicalId.get(l);if(!f)return;let N=this.virtualSubscriptionsById.get(f);if(N.method==="eth_subscribe")switch(N.params[0]){case"newHeads":{let v=N,L=u,{isBackfilling:O,backfillBuffer:P}=v,{result:g}=L.params;O?We(P,g):l!==f?this.emitAndRememberEvent(f,g,A):this.rememberEvent(f,g,A);break}case"logs":{let v=N,L=u,{isBackfilling:O,backfillBuffer:P}=v,{result:g}=L.params;O?je(P,g):f!==l?this.emitAndRememberEvent(f,g,R):this.rememberEvent(f,g,R);break}default:if(l!==f){let{result:v}=u.params;this.emitEvent(f,v)}}},this.handleReopen=()=>{this.virtualIdsByPhysicalId.clear();let{cancel:m,isCancelled:u}=Oe();this.cancelBackfill=m;for(let l of this.virtualSubscriptionsById.values())a(this,void 0,void 0,function*(){try{yield this.resubscribeAndBackfill(u,l)}catch(f){u()||console.error(`Error while backfilling "${l.params[0]}" subscription. Some events may be missing.`,f)}});this.startHeartbeat()},this.stopHeartbeatAndBackfill=()=>{this.heartbeatIntervalId!=null&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=void 0),this.cancelBackfill()},this.apiKey=i,this.backfiller=new j(this),this.addSocketListeners(),this.startHeartbeat(),this.cancelBackfill=z}static getNetwork(e){return typeof e=="string"&&e in x?x[e]:V(e)}on(e,t){return this._addEventListener(e,t,!1)}once(e,t){return this._addEventListener(e,t,!0)}off(e,t){return y(e)?this._off(e,t):super.off(e,t)}removeAllListeners(e){return e!==void 0&&y(e)?this._removeAllListeners(e):super.removeAllListeners(e)}listenerCount(e){return e!==void 0&&y(e)?this._listenerCount(e):super.listenerCount(e)}listeners(e){return e!==void 0&&y(e)?this._listeners(e):super.listeners(e)}_addEventListener(e,t,s){if(y(e)){Q(e);let i=new J(k(e),t,s);return this._events.push(i),this._startEvent(i),this}else return super._addEventListener(e,t,s)}_startEvent(e){[...C,"block","filter"].includes(e.type)?this.customStartEvent(e):super._startEvent(e)}_subscribe(e,t,s,i){return a(this,void 0,void 0,function*(){let r=this._subIds[e],o=yield this.getBlockNumber();r==null&&(r=Promise.all(t).then(p=>this.send("eth_subscribe",p)),this._subIds[e]=r);let c=yield r,d=yield Promise.all(t);this.virtualSubscriptionsById.set(c,{event:i,method:"eth_subscribe",params:d,startingBlockNumber:o,virtualId:c,physicalId:c,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(c,c),this._subs[c]={tag:e,processFunc:s}})}emit(e,...t){if(y(e)){let s=!1,i=[],r=k(e);return this._events=this._events.filter(o=>o.tag!==r?!0:(setTimeout(()=>{o.listener.apply(this,t)},0),s=!0,o.once?(i.push(o),!1):!0)),i.forEach(o=>{this._stopEvent(o)}),s}else return super.emit(e,...t)}sendBatch(e){return a(this,void 0,void 0,function*(){let t=0,s=e.map(({method:i,params:r})=>({method:i,params:r,jsonrpc:"2.0",id:`alchemy-sdk:${t++}`}));return this.sendBatchConcurrently(s)})}destroy(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),super.destroy()}isCommunityResource(){return this.apiKey===q}_stopEvent(e){let t=e.tag;if(C.includes(e.type)){if(this._events.filter(i=>C.includes(i.type)).length)return}else if(e.type==="tx"){if(this._events.filter(i=>i.type==="tx").length)return;t="tx"}else if(this.listenerCount(e.event))return;let s=this._subIds[t];s&&(delete this._subIds[t],s.then(i=>{this._subs[i]&&(delete this._subs[i],this.send("eth_unsubscribe",[i]))}))}addSocketListeners(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}removeSocketListeners(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}resubscribeAndBackfill(e,t){return a(this,void 0,void 0,function*(){let{virtualId:s,method:i,params:r,sentEvents:o,backfillBuffer:c,startingBlockNumber:d}=t;t.isBackfilling=!0,c.length=0;try{let p=yield this.send(i,r);switch(b(e),t.physicalId=p,this.virtualIdsByPhysicalId.set(p,s),r[0]){case"newHeads":{let m=yield fe(()=>W(this.backfiller.getNewHeadsBackfill(e,o,d),ue),he,()=>!e());b(e),Ie([...m,...c]).forEach(l=>this.emitNewHeadsEvent(s,l));break}case"logs":{let m=r[1]||{},u=yield fe(()=>W(this.backfiller.getLogsBackfill(e,m,o,d),ue),he,()=>!e());b(e),Ne([...u,...c]).forEach(f=>this.emitLogsEvent(s,f));break}default:break}}finally{t.isBackfilling=!1,c.length=0}})}emitNewHeadsEvent(e,t){this.emitAndRememberEvent(e,t,A)}emitLogsEvent(e,t){this.emitAndRememberEvent(e,t,R)}emitAndRememberEvent(e,t,s){this.rememberEvent(e,t,s),this.emitEvent(e,t)}emitEvent(e,t){let s=this.virtualSubscriptionsById.get(e);s&&this.emitGenericEvent(s,t)}rememberEvent(e,t,s){let i=this.virtualSubscriptionsById.get(e);i&&G(i.sentEvents,Object.assign({},t),s)}emitGenericEvent(e,t){this.emitProcessFn(e.event)(t)}startHeartbeat(){this.heartbeatIntervalId==null&&(this.heartbeatIntervalId=setInterval(()=>a(this,void 0,void 0,function*(){try{yield W(this.send("net_version"),Se)}catch{this._websocket.reconnect()}}),Ce))}sendBatchConcurrently(e){return a(this,void 0,void 0,function*(){return Promise.all(e.map(t=>this.send(t.method,t.params)))})}customStartEvent(e){if(e.type===H){let{fromAddress:t,toAddress:s,hashesOnly:i}=e;this._subscribe(e.tag,[w.PENDING_TRANSACTIONS,{fromAddress:t,toAddress:s,hashesOnly:i}],this.emitProcessFn(e),e)}else if(e.type===M){let{addresses:t,includeRemoved:s,hashesOnly:i}=e;this._subscribe(e.tag,[w.MINED_TRANSACTIONS,{addresses:t,includeRemoved:s,hashesOnly:i}],this.emitProcessFn(e),e)}else e.type==="block"?this._subscribe("block",["newHeads"],this.emitProcessFn(e),e):e.type==="filter"&&this._subscribe(e.tag,["logs",this._getFilter(e.filter)],this.emitProcessFn(e),e)}emitProcessFn(e){switch(e.type){case H:return t=>this.emit({method:w.PENDING_TRANSACTIONS,fromAddress:e.fromAddress,toAddress:e.toAddress,hashesOnly:e.hashesOnly},t);case M:return t=>this.emit({method:w.MINED_TRANSACTIONS,addresses:e.addresses,includeRemoved:e.includeRemoved,hashesOnly:e.hashesOnly},t);case"block":return t=>{let s=Y.from(t.number).toNumber();this._emitted.block=s,this.emit("block",s)};case"filter":return t=>{t.removed==null&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))};default:throw new Error("Invalid event type to `emitProcessFn()`")}}_off(e,t){if(t==null)return this.removeAllListeners(e);let s=[],i=!1,r=k(e);return this._events=this._events.filter(o=>o.tag!==r||o.listener!=t||i?!0:(i=!0,s.push(o),!1)),s.forEach(o=>{this._stopEvent(o)}),this}_removeAllListeners(e){let t=[];if(e==null)t=this._events,this._events=[];else{let s=k(e);this._events=this._events.filter(i=>i.tag!==s?!0:(t.push(i),!1))}return t.forEach(s=>{this._stopEvent(s)}),this}_listenerCount(e){if(!e)return this._events.length;let t=k(e);return this._events.filter(s=>s.tag===t).length}_listeners(e){if(e==null)return this._events.map(s=>s.listener);let t=k(e);return this._events.filter(s=>s.tag===t).map(s=>s.listener)}};function Re(){return Le()?le().w3cwebsocket:WebSocket}function Le(){return typeof process<"u"&&process!=null&&process.versions!=null&&process.versions.node!=null}function Oe(){let n=!1;return{cancel:()=>n=!0,isCancelled:()=>n}}var Pe=1e3,xe=2,He=3e4;function fe(n,e,t=()=>!0){return a(this,void 0,void 0,function*(){let s=0,i=0;for(;;)try{return yield n()}catch(r){if(i++,i>=e||!t(r)||(yield Me(s),!t(r)))throw r;s=s===0?Pe:Math.min(He,xe*s)}})}function Me(n){return new Promise(e=>setTimeout(e,n))}function W(n,e){return Promise.race([n,new Promise((t,s)=>setTimeout(()=>s(new Error("Timeout")),e))])}function A(n){return h(n.number)}function R(n){return h(n.blockNumber)}function Fe(n){return Array.isArray(n)||n.jsonrpc==="2.0"&&n.id!==void 0}function De(n){return!Fe(n)}function We(n,e){G(n,e,A)}function je(n,e){G(n,e,R)}function G(n,e,t){let s=t(e),i=n.findIndex(r=>t(r)>s-Ae);i===-1?n.length=0:n.splice(0,i),n.push(e)}export{de as AlchemyWebSocketProvider};
