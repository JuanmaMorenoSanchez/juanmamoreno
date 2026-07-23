var p$1=Object.create;var j$4=Object.defineProperty,q$5=Object.defineProperties,r$1=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertyNames,g$2=Object.getOwnPropertySymbols,u$1=Object.getPrototypeOf,k$4=Object.prototype.hasOwnProperty,m$2=Object.prototype.propertyIsEnumerable;var l$1=(a,b,c)=>b in a?j$4(a,b,{enumerable:true,configurable:true,writable:true,value:c}):a[b]=c,w$3=(a,b)=>{for(var c in b||={})k$4.call(b,c)&&l$1(a,c,b[c]);if(g$2)for(var c of g$2(b))m$2.call(b,c)&&l$1(a,c,b[c]);return a},x$3=(a,b)=>q$5(a,s(b));var y$1=a=>typeof a=="symbol"?a:a+"",z$2=(a,b)=>{var c={};for(var d in a)k$4.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&g$2)for(var d of g$2(a))b.indexOf(d)<0&&m$2.call(a,d)&&(c[d]=a[d]);return c};var A$4=(a,b)=>()=>{try{return b||a((b={exports:{}}).exports,b),b.exports}catch(c){throw b=0,c}};var v$3=(a,b,c,d)=>{if(b&&typeof b=="object"||typeof b=="function")for(let e of t(b))!k$4.call(a,e)&&e!==c&&j$4(a,e,{get:()=>b[e],enumerable:!(d=r$1(b,e))||d.enumerable});return a};var B$6=(a,b,c)=>(c=a!=null?p$1(u$1(a)):{},v$3(j$4(c,"default",{value:a,enumerable:true}),a));var C$4=(a,b,c)=>new Promise((d,e)=>{var n=f=>{try{h(c.next(f));}catch(i){e(i);}},o=f=>{try{h(c.throw(f));}catch(i){e(i);}},h=f=>f.done?d(f.value):Promise.resolve(f.value).then(n,o);h((c=c.apply(a,b)).next());});function w$2(e){return typeof e=="function"}function zh(e){return w$2(e?.lift)}function E$1(e){return t=>{if(zh(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r);}});throw new TypeError("Unable to lift unknown Observable type")}}function zt$4(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack;});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Pr$2=zt$4(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n;});function ft$3(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1);}}var G$2=class e{constructor(t){this.initialTeardown=t,this.closed=false,this._parentage=null,this._finalizers=null;}unsubscribe(){let t;if(!this.closed){this.closed=true;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(w$2(r))try{r();}catch(i){t=i instanceof Pr$2?i.errors:[i];}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{al(i);}catch(s){t=t??[],s instanceof Pr$2?t=[...t,...s.errors]:t.push(s);}}if(t)throw new Pr$2(t)}}add(t){var n;if(t&&t!==this)if(this.closed)al(t);else {if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this);}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t);}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t;}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&ft$3(n,t);}remove(t){let{_finalizers:n}=this;n&&ft$3(n,t),t instanceof e&&t._removeParent(this);}};G$2.EMPTY=(()=>{let e=new G$2;return e.closed=true,e})();var $i$3=G$2.EMPTY;function Lr$2(e){return e instanceof G$2||e&&"closed"in e&&w$2(e.remove)&&w$2(e.add)&&w$2(e.unsubscribe)}function al(e){w$2(e)?e():e.unsubscribe();}var ve$4={Promise:void 0};var Qt$3={setTimeout(e,t,...n){return setTimeout(e,t,...n)},clearTimeout(e){return (clearTimeout)(e)},delegate:void 0};function Fr$2(e){Qt$3.setTimeout(()=>{throw e});}function pt$4(){}function Zt$3(e){e();}var gt$5=class gt extends G$2{constructor(t){super(),this.isStopped=false,t?(this.destination=t,Lr$2(t)&&t.add(this)):this.destination=Yh;}static create(t,n,r){return new Ve$5(t,n,r)}next(t){this.isStopped?qi$3():this._next(t);}error(t){this.isStopped?qi$3():(this.isStopped=true,this._error(t));}complete(){this.isStopped?qi$3():(this.isStopped=true,this._complete());}unsubscribe(){this.closed||(this.isStopped=true,super.unsubscribe(),this.destination=null);}_next(t){this.destination.next(t);}_error(t){try{this.destination.error(t);}finally{this.unsubscribe();}}_complete(){try{this.destination.complete();}finally{this.unsubscribe();}}};var Gi$3=class Gi{constructor(t){this.partialObserver=t;}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t);}catch(r){jr$2(r);}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t);}catch(r){jr$2(r);}else jr$2(t);}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete();}catch(n){jr$2(n);}}},Ve$5=class Ve extends gt$5{constructor(t,n,r){super();let o;if(w$2(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else {o=t;}this.destination=new Gi$3(o);}};function jr$2(e){Fr$2(e);}function Zh(e){throw e}function qi$3(e,t){}var Yh={closed:true,next:pt$4,error:Zh,complete:pt$4};function D$1(e,t,n,r,o){return new zi$3(e,t,n,r,o)}var zi$3=class zi extends gt$5{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a);}catch(c){t.error(c);}}:super._next,this._error=o?function(a){try{o(a);}catch(c){t.error(c);}finally{this.unsubscribe();}}:super._error,this._complete=r?function(){try{r();}catch(a){t.error(a);}finally{this.unsubscribe();}}:super._complete;}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this));}}};function Me$3(e,t){return E$1((n,r)=>{let o=0;n.subscribe(D$1(r,i=>{r.next(e.call(t,i,o++));}));})}function uT(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i}function dT(e,t){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(e,t)}function pl(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i);})}return new(n||(n=Promise))(function(i,s){function a(u){try{l(r.next(u));}catch(d){s(d);}}function c(u){try{l(r.throw(u));}catch(d){s(d);}}function l(u){u.done?i(u.value):o(u.value).then(a,c);}l((r=r.apply(e,[])).next());})}function fl(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return {next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function mt$4(e){return this instanceof mt$4?(this.v=e,this):new mt$4(e)}function hl(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(f){return function(h){return Promise.resolve(h).then(f,d)}}function a(f,h){r[f]&&(o[f]=function(m){return new Promise(function(_,M){i.push([f,m,_,M])>1||c(f,m);})},h&&(o[f]=h(o[f])));}function c(f,h){try{l(r[f](h));}catch(m){p(i[0][3],m);}}function l(f){f.value instanceof mt$4?Promise.resolve(f.value.v).then(u,d):p(i[0][2],f);}function u(f){c("next",f);}function d(f){c("throw",f);}function p(f,h){f(h),i.shift(),i.length&&c(i[0][0],i[0][1]);}}function gl(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof fl=="function"?fl(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value);})};}function o(i,s,a,c){Promise.resolve(c).then(function(l){i({value:l,done:a});},s);}}var Vr$2=e=>e&&typeof e.length=="number"&&typeof e!="function";function Hr$2(e){return w$2(e?.then)}var Yt$3=typeof Symbol=="function"&&Symbol.observable||"@@observable";function te$4(e){return e}function Kh(...e){return Qi$3(e)}function Qi$3(e){return e.length===0?te$4:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var N$2=(()=>{class e{constructor(n){n&&(this._subscribe=n);}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=Xh(n)?n:new Ve$5(n,r,o);return Zt$3(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i));}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r);}}forEach(n,r){return r=ml(r),new r((o,i)=>{let s=new Ve$5({next:a=>{try{n(a);}catch(c){i(c),s.unsubscribe();}},error:i,complete:o});this.subscribe(s);})}_subscribe(n){var r;return (r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[Yt$3](){return this}pipe(...n){return Qi$3(n)(this)}toPromise(n){return n=ml(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i));})}}return e.create=t=>new e(t),e})();function ml(e){var t;return (t=e??ve$4.Promise)!==null&&t!==void 0?t:Promise}function Jh(e){return e&&w$2(e.next)&&w$2(e.error)&&w$2(e.complete)}function Xh(e){return e&&e instanceof gt$5||Jh(e)&&Lr$2(e)}function Br$2(e){return w$2(e[Yt$3])}function $r$2(e){return Symbol.asyncIterator&&w$2(e?.[Symbol.asyncIterator])}function Ur$2(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function eg(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Wr$2=eg();function qr$2(e){return w$2(e?.[Wr$2])}function Gr$2(e){return hl(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield mt$4(n.read());if(o)return yield mt$4(void 0);yield yield mt$4(r);}}finally{n.releaseLock();}})}function zr$2(e){return w$2(e?.getReader)}function O$2(e){if(e instanceof N$2)return e;if(e!=null){if(Br$2(e))return tg(e);if(Vr$2(e))return ng(e);if(Hr$2(e))return rg(e);if($r$2(e))return yl(e);if(qr$2(e))return og(e);if(zr$2(e))return ig(e)}throw Ur$2(e)}function tg(e){return new N$2(t=>{let n=e[Yt$3]();if(w$2(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function ng(e){return new N$2(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete();})}function rg(e){return new N$2(t=>{e.then(n=>{t.closed||(t.next(n),t.complete());},n=>t.error(n)).then(null,Fr$2);})}function og(e){return new N$2(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete();})}function yl(e){return new N$2(t=>{sg(e,t).catch(n=>t.error(n));})}function ig(e){return yl(Gr$2(e))}function sg(e,t){var n,r,o,i;return pl(this,void 0,void 0,function*(){try{for(n=gl(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s};}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n));}finally{if(o)throw o.error}}t.complete();})}function vl(e,t){return E$1((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(D$1(r,c=>{o?.unsubscribe();let l=0,u=i++;O$2(e(c,u)).subscribe(o=D$1(r,d=>r.next(t?t(c,d,u,l++):d),()=>{o=null,a();}));},()=>{s=!0,a();}));})}var Il=zt$4(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed";});var ne$2=(()=>{class e extends N$2{constructor(){super(),this.closed=false,this.currentObservers=null,this.observers=[],this.isStopped=false,this.hasError=false,this.thrownError=null;}lift(n){let r=new Qr$3(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new Il}next(n){Zt$3(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n);}});}error(n){Zt$3(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=true,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n);}});}complete(){Zt$3(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=true;let{observers:n}=this;for(;n.length;)n.shift().complete();}});}unsubscribe(){this.isStopped=this.closed=true,this.observers=this.currentObservers=null;}get observed(){var n;return ((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?$i$3:(this.currentObservers=null,i.push(n),new G$2(()=>{this.currentObservers=null,ft$3(i,n);}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete();}asObservable(){let n=new N$2;return n.source=this,n}}return e.create=(t,n)=>new Qr$3(t,n),e})(),Qr$3=class Qr extends ne$2{constructor(t,n){super(),this.destination=t,this.source=n;}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t);}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t);}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t);}_subscribe(t){var n,r;return (r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:$i$3}};var Rn$3=class Rn extends ne$2{constructor(t){super(),this._value=t;}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return !n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t);}};var kn$3={now(){return (kn$3.delegate||Date).now()},delegate:void 0};var On$3=class On extends ne$2{constructor(t=1/0,n=1/0,r=kn$3){super(),this._bufferSize=t,this._windowTime=n,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=true,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,n);}next(t){let{isStopped:n,_buffer:r,_infiniteTimeWindow:o,_timestampProvider:i,_windowTime:s}=this;n||(r.push(t),!o&&r.push(i.now()+s)),this._trimBuffer(),super.next(t);}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(t),{_infiniteTimeWindow:r,_buffer:o}=this,i=o.slice();for(let s=0;s<i.length&&!t.closed;s+=r?1:2)t.next(i[s]);return this._checkFinalizedStatuses(t),n}_trimBuffer(){let{_bufferSize:t,_timestampProvider:n,_buffer:r,_infiniteTimeWindow:o}=this,i=(o?1:2)*t;if(t<1/0&&i<r.length&&r.splice(0,r.length-i),!o){let s=n.now(),a=0;for(let c=1;c<r.length&&r[c]<=s;c+=2)a=c;a&&r.splice(0,a+1);}}};var Zr$3=class Zr extends G$2{constructor(t,n){super();}schedule(t,n=0){return this}};var Pn$3={setInterval(e,t,...n){let{delegate:r}=Pn$3;return r?.setInterval?r.setInterval(e,t,...n):setInterval(e,t,...n)},clearInterval(e){return (clearInterval)(e)},delegate:void 0};var Yr$3=class Yr extends Zr$3{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=false;}schedule(t,n=0){var r;if(this.closed)return this;this.state=t;let o=this.id,i=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(i,o,n)),this.pending=true,this.delay=n,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(i,this.id,n),this}requestAsyncId(t,n,r=0){return Pn$3.setInterval(t.flush.bind(t,this),r)}recycleAsyncId(t,n,r=0){if(r!=null&&this.delay===r&&this.pending===false)return n;n!=null&&Pn$3.clearInterval(n);}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=false;let r=this._execute(t,n);if(r)return r;this.pending===false&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null));}_execute(t,n){let r=false,o;try{this.work(t);}catch(i){r=true,o=i||new Error("Scheduled action threw falsy error");}if(r)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:t,scheduler:n}=this,{actions:r}=n;this.work=this.state=this.scheduler=null,this.pending=false,ft$3(r,this),t!=null&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe();}}};var Kt$4=class e{constructor(t,n=e.now){this.schedulerActionCtor=t,this.now=n;}schedule(t,n=0,r){return new this.schedulerActionCtor(this,t).schedule(r,n)}};Kt$4.now=kn$3.now;var Kr$2=class Kr extends Kt$4{constructor(t,n=Kt$4.now){super(t,n),this.actions=[],this._active=false;}flush(t){let{actions:n}=this;if(this._active){n.push(t);return}let r;this._active=true;do if(r=t.execute(t.state,t.delay))break;while(t=n.shift());if(this._active=false,r){for(;t=n.shift();)t.unsubscribe();throw r}}};var yt$4=new Kr$2(Yr$3),El=yt$4;var vt$4=new N$2(e=>e.complete());function Jr$3(e){return e&&w$2(e.schedule)}function Zi$3(e){return e[e.length-1]}function Xr$3(e){return w$2(Zi$3(e))?e.pop():void 0}function Ne$2(e){return Jr$3(Zi$3(e))?e.pop():void 0}function Dl(e,t){return typeof Zi$3(e)=="number"?e.pop():t}function X$4(e,t,n,r=0,o=false){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe();},r);if(e.add(i),!o)return i}function eo$3(e,t=0){return E$1((n,r)=>{n.subscribe(D$1(r,o=>X$4(r,e,()=>r.next(o),t),()=>X$4(r,e,()=>r.complete(),t),o=>X$4(r,e,()=>r.error(o),t)));})}function to$2(e,t=0){return E$1((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t));})}function wl(e,t){return O$2(e).pipe(to$2(t),eo$3(t))}function Tl(e,t){return O$2(e).pipe(to$2(t),eo$3(t))}function Cl(e,t){return new N$2(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule());})})}function bl(e,t){return new N$2(n=>{let r;return X$4(n,t,()=>{r=e[Wr$2](),X$4(n,t,()=>{let o,i;try{({value:o,done:i}=r.next());}catch(s){n.error(s);return}i?n.complete():n.next(o);},0,true);}),()=>w$2(r?.return)&&r.return()})}function no$2(e,t){if(!e)throw new Error("Iterable cannot be null");return new N$2(n=>{X$4(n,t,()=>{let r=e[Symbol.asyncIterator]();X$4(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value);});},0,true);});})}function _l(e,t){return no$2(Gr$2(e),t)}function Ml(e,t){if(e!=null){if(Br$2(e))return wl(e,t);if(Vr$2(e))return Cl(e,t);if(Hr$2(e))return Tl(e,t);if($r$2(e))return no$2(e,t);if(qr$2(e))return bl(e,t);if(zr$2(e))return _l(e,t)}throw Ur$2(e)}function Se$4(e,t){return t?Ml(e,t):O$2(e)}function ag(...e){let t=Ne$2(e);return Se$4(e,t)}function cg(e,t){let n=w$2(e)?e:()=>e,r=o=>o.error(n());return new N$2(r)}function lg(e){return !!e&&(e instanceof N$2||w$2(e.lift)&&w$2(e.subscribe))}var Ln$3=zt$4(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence";});function Nl(e){return e instanceof Date&&!isNaN(e)}var{isArray:ug}=Array;function dg(e,t){return ug(t)?e(...t):e(t)}function ro$3(e){return Me$3(t=>dg(e,t))}var{isArray:fg}=Array,{getPrototypeOf:pg,prototype:hg,keys:gg}=Object;function oo$2(e){if(e.length===1){let t=e[0];if(fg(t))return {args:t,keys:null};if(mg(t)){let n=gg(t);return {args:n.map(r=>t[r]),keys:n}}}return {args:e,keys:null}}function mg(e){return e&&typeof e=="object"&&pg(e)===hg}function io$2(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function yg(...e){let t=Ne$2(e),n=Xr$3(e),{args:r,keys:o}=oo$2(e);if(r.length===0)return Se$4([],t);let i=new N$2(vg(r,t,o?s=>io$2(o,s):te$4));return n?i.pipe(ro$3(n)):i}function vg(e,t,n=te$4){return r=>{Sl(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)Sl(t,()=>{let l=Se$4(e[c],t),u=false;l.subscribe(D$1(r,d=>{i[c]=d,u||(u=true,a--),a||r.next(n(i.slice()));},()=>{--s||r.complete();}));},r);},r);}}function Sl(e,t,n){e?X$4(n,e,t):t();}function xl(e,t,n,r,o,i,s,a){let c=[],l=0,u=0,d=false,p=()=>{d&&!c.length&&!l&&t.complete();},f=m=>l<r?h(m):c.push(m),h=m=>{l++;let _=false;O$2(n(m,u++)).subscribe(D$1(t,M=>{t.next(M);},()=>{_=true;},void 0,()=>{if(_)try{for(l--;c.length&&l<r;){let M=c.shift();s?X$4(t,s,()=>h(M)):h(M);}p();}catch(M){t.error(M);}}));};return e.subscribe(D$1(t,f,()=>{d=true,p();})),()=>{}}function He$3(e,t,n=1/0){return w$2(t)?He$3((r,o)=>Me$3((i,s)=>t(r,i,o,s))(O$2(e(r,o))),n):(typeof t=="number"&&(n=t),E$1((r,o)=>xl(r,o,e,n)))}function Fn$3(e=1/0){return He$3(te$4,e)}function Al(){return Fn$3(1)}function Jt$3(...e){return Al()(Se$4(e,Ne$2(e)))}function Ig(e){return new N$2(t=>{O$2(e()).subscribe(t);})}function Eg(...e){let t=Xr$3(e),{args:n,keys:r}=oo$2(e),o=new N$2(i=>{let{length:s}=n;if(!s){i.complete();return}let a=new Array(s),c=s,l=s;for(let u=0;u<s;u++){let d=false;O$2(n[u]).subscribe(D$1(i,p=>{d||(d=true,l--),a[u]=p;},()=>c--,void 0,()=>{(!c||!d)&&(l||i.next(r?io$2(r,a):a),i.complete());}));}});return t?o.pipe(ro$3(t)):o}function so$2(e=0,t,n=El){let r=-1;return t!=null&&(Jr$3(t)?n=t:r=t),new N$2(o=>{let i=Nl(e)?+e-n.now():e;i<0&&(i=0);let s=0;return n.schedule(function(){o.closed||(o.next(s++),0<=r?this.schedule(void 0,r):o.complete());},i)})}function Dg(...e){let t=Ne$2(e),n=Dl(e,1/0),r=e;return r.length?r.length===1?O$2(r[0]):Fn$3(n)(Se$4(r,t)):vt$4}function Xt$3(e,t){return E$1((n,r)=>{let o=0;n.subscribe(D$1(r,i=>e.call(t,i,o++)&&r.next(i)));})}function Rl(e){return E$1((t,n)=>{let r=!1,o=null,i=null,s=!1,a=()=>{if(i?.unsubscribe(),i=null,r){r=!1;let l=o;o=null,n.next(l);}s&&n.complete();},c=()=>{i=null,s&&n.complete();};t.subscribe(D$1(n,l=>{r=!0,o=l,i||O$2(e(l)).subscribe(i=D$1(n,a,c));},()=>{s=!0,(!r||!i||i.closed)&&n.complete();}));})}function wg(e,t=yt$4){return Rl(()=>so$2(e,t))}function Yi$3(e){return E$1((t,n)=>{let r=null,o=!1,i;r=t.subscribe(D$1(n,void 0,void 0,s=>{i=O$2(e(s,Yi$3(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0;})),o&&(r.unsubscribe(),r=null,i.subscribe(n));})}function kl(e,t,n,r,o){return (i,s)=>{let a=n,c=t,l=0;i.subscribe(D$1(s,u=>{let d=l++;c=a?e(c,u,d):(a=true,u),s.next(c);},o));}}function Tg(e,t){return w$2(t)?He$3(e,t,1):He$3(e,1)}function Cg(e,t=yt$4){return E$1((n,r)=>{let o=null,i=null,s=null,a=()=>{if(o){o.unsubscribe(),o=null;let l=i;i=null,r.next(l);}};function c(){let l=s+e,u=t.now();if(u<l){o=this.schedule(void 0,l-u),r.add(o);return}a();}n.subscribe(D$1(r,l=>{i=l,s=t.now(),o||(o=t.schedule(c,e),r.add(o));},()=>{a(),r.complete();},void 0,()=>{i=o=null;}));})}function Ol(e){return E$1((t,n)=>{let r=!1;t.subscribe(D$1(n,o=>{r=!0,n.next(o);},()=>{r||n.next(e),n.complete();}));})}function It$5(e){return e<=0?()=>vt$4:E$1((t,n)=>{let r=0;t.subscribe(D$1(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete());}));})}function Pl(){return E$1((e,t)=>{e.subscribe(D$1(t,pt$4));})}function Ki$3(e){return Me$3(()=>e)}function Ji$2(e,t){return t?n=>Jt$3(t.pipe(It$5(1),Pl()),n.pipe(Ji$2(e))):He$3((n,r)=>O$2(e(n,r)).pipe(It$5(1),Ki$3(n)))}function Ll$1(e,t=yt$4){let n=so$2(e,t);return Ji$2(()=>n)}function Fl(e,t=te$4){return e=e??bg,E$1((n,r)=>{let o,i=!0;n.subscribe(D$1(r,s=>{let a=t(s);(i||!e(o,a))&&(i=!1,o=a,r.next(s));}));})}function bg(e,t){return e===t}function jl(e=_g){return E$1((t,n)=>{let r=!1;t.subscribe(D$1(n,o=>{r=!0,n.next(o);},()=>r?n.complete():n.error(e())));})}function _g(){return new Ln$3}function Vl(e){return E$1((t,n)=>{try{t.subscribe(n);}finally{n.add(e);}})}function Mg(e,t){let n=arguments.length>=2;return r=>r.pipe(e?Xt$3((o,i)=>e(o,i,r)):te$4,It$5(1),n?Ol(t):jl(()=>new Ln$3))}function Ng(e){return e<=0?()=>vt$4:E$1((t,n)=>{let r=[];t.subscribe(D$1(n,o=>{r.push(o),e<r.length&&r.shift();},()=>{for(let o of r)n.next(o);n.complete();},void 0,()=>{r=null;}));})}function Sg(){return E$1((e,t)=>{let n,r=!1;e.subscribe(D$1(t,o=>{let i=n;n=o,r&&t.next([i,o]),r=!0;}));})}function xg(e,t){return E$1(kl(e,t,arguments.length>=2,!0))}function es$2(e={}){let{connector:t=()=>new ne$2,resetOnError:n=true,resetOnComplete:r=true,resetOnRefCountZero:o=true}=e;return i=>{let s,a,c,l=0,u=false,d=false,p=()=>{a?.unsubscribe(),a=void 0;},f=()=>{p(),s=c=void 0,u=d=false;},h=()=>{let m=s;f(),m?.unsubscribe();};return E$1((m,_)=>{l++,!d&&!u&&p();let M=c=c??t();_.add(()=>{l--,l===0&&!d&&!u&&(a=Xi$3(h,o));}),M.subscribe(_),!s&&l>0&&(s=new Ve$5({next:ye=>M.next(ye),error:ye=>{d=!0,p(),a=Xi$3(f,n,ye),M.error(ye);},complete:()=>{u=!0,p(),a=Xi$3(f,r),M.complete();}}),O$2(m).subscribe(s));})(i)}}function Xi$3(e,t,...n){if(t===true){e();return}if(t===false)return;let r=new Ve$5({next:()=>{r.unsubscribe(),e();}});return O$2(t(...n)).subscribe(r)}function Ag(e,t,n){let r,o=false;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:t=1/0,refCount:o=false,scheduler:n}=e:r=e??1/0,es$2({connector:()=>new On$3(r,t,n),resetOnError:true,resetOnComplete:false,resetOnRefCountZero:o})}function Hl(e){return Xt$3((t,n)=>e<=n)}function Bl(...e){let t=Ne$2(e);return E$1((n,r)=>{(t?Jt$3(e,n,t):Jt$3(e,n)).subscribe(r);})}function Rg(e){return E$1((t,n)=>{O$2(e).subscribe(D$1(n,()=>n.complete(),pt$4)),!n.closed&&t.subscribe(n);})}function kg(e,t=false){return E$1((n,r)=>{let o=0;n.subscribe(D$1(r,i=>{let s=e(i,o++);(s||t)&&r.next(i),!s&&r.complete();}));})}function $l(e,t,n){let r=w$2(e)||t||n?{next:e,error:t,complete:n}:e;return r?E$1((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(D$1(i,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),i.next(c);},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete();},c=>{var l;a=!1,(l=r.error)===null||l===void 0||l.call(r,c),i.error(c);},()=>{var c,l;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r);}));}):te$4}var K$5=null,ao$3=false,Et$6=1,F$2=Symbol("SIGNAL");function v$2(e){let t=K$5;return K$5=e,t}function co$2(){return K$5}var Be$3={version:0,lastCleanEpoch:0,dirty:false,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:false,consumerAllowSignalWrites:false,consumerIsAlwaysLive:false,kind:"unknown",producerMustRecompute:()=>false,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function $e$3(e){if(ao$3)throw new Error("");if(K$5===null)return;K$5.consumerOnSignalRead(e);let t=K$5.producersTail;if(t!==void 0&&t.producer===e)return;let n,r=K$5.recomputing;if(r&&(n=t!==void 0?t.nextProducer:K$5.producers,n!==void 0&&n.producer===e)){K$5.producersTail=n,n.lastReadVersion=e.version,n.knownValidAtEpoch=Et$6;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===K$5&&(!r||o.knownValidAtEpoch===Et$6))return;let i=tn$3(K$5),s={producer:e,consumer:K$5,nextProducer:n,prevConsumer:void 0,knownValidAtEpoch:Et$6,lastReadVersion:e.version,nextConsumer:void 0};K$5.producersTail=s,t!==void 0?t.nextProducer=s:K$5.producers=s,i&&zl(e,s);}function Ul(){Et$6++;}function Tt$6(e){if(!(tn$3(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Et$6)){if(!e.producerMustRecompute(e)&&!Ct$4(e)){en$4(e);return}e.producerRecomputeValue(e),en$4(e);}}function ts$2(e){if(e.consumers===void 0)return;let t=ao$3;ao$3=true;try{for(let n=e.consumers;n!==void 0;n=n.nextConsumer){let r=n.consumer;r.dirty||Wl(r);}}finally{ao$3=t;}}function ns$2(){return K$5?.consumerAllowSignalWrites!==false}function Wl(e){e.dirty=true,ts$2(e),e.consumerMarkedDirty?.(e);}function en$4(e){e.dirty=false,e.lastCleanEpoch=Et$6;}function Ae$2(e){return e&&ql(e),v$2(e)}function ql(e){if(e.producersTail?.knownValidAtEpoch===Et$6){let t=e.producers;for(;t!==void 0;)t.knownValidAtEpoch=null,t=t.nextProducer;}e.producersTail=void 0,e.recomputing=true;}function Ue$4(e,t){v$2(t),e&&Gl(e);}function Gl(e){e.recomputing=false;let t=e.producersTail,n=t!==void 0?t.nextProducer:e.producers;if(n!==void 0){if(tn$3(e))do n=rs$2(n);while(n!==void 0);t!==void 0?t.nextProducer=void 0:e.producers=void 0;}}function Ct$4(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let n=t.producer,r=t.lastReadVersion;if(r!==n.version||(Tt$6(n),r!==n.version))return  true}return  false}function We$3(e){if(tn$3(e)){let t=e.producers;for(;t!==void 0;)t=rs$2(t);}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0;}function zl(e,t){let n=e.consumersTail,r=tn$3(e);if(n!==void 0?(t.nextConsumer=n.nextConsumer,n.nextConsumer=t):(t.nextConsumer=void 0,e.consumers=t),t.prevConsumer=n,e.consumersTail=t,!r)for(let o=e.producers;o!==void 0;o=o.nextProducer)zl(o.producer,o);}function rs$2(e){let t=e.producer,n=e.nextProducer,r=e.nextConsumer,o=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=o:t.consumersTail=o,o!==void 0)o.nextConsumer=r;else if(t.consumers=r,!tn$3(t)){let i=t.producers;for(;i!==void 0;)i=rs$2(i);}return n}function tn$3(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Vn$3(e,t){return Object.is(e,t)}function Hn$3(e,t){let n=Object.create(Pg);n.computation=e,t!==void 0&&(n.equal=t);let r=()=>{if(Tt$6(n),$e$3(n),n.value===xe$3)throw n.error;return n.value};return r[F$2]=n,r}var Dt$5=Symbol("UNSET"),wt$5=Symbol("COMPUTING"),xe$3=Symbol("ERRORED"),Pg=x$3(w$3({},Be$3),{value:Dt$5,dirty:true,error:null,equal:Vn$3,kind:"computed",producerMustRecompute(e){return e.value===Dt$5||e.value===wt$5},producerRecomputeValue(e){if(e.value===wt$5)throw new Error("");let t=e.value;e.value=wt$5;let n=Ae$2(e),r,o=false;try{r=e.computation(),v$2(null),o=t!==Dt$5&&t!==xe$3&&r!==xe$3&&e.equal(t,r);}catch(i){r=xe$3,e.error=i;}finally{Ue$4(e,n);}if(o){e.value=t;return}e.value=r,e.version++;}});function Lg(){throw new Error}var Ql=Lg;function Zl(e){Ql(e);}function os$2(e){Ql=e;}function is$2(e,t){let n=Object.create(Bn$3);n.value=e,t!==void 0&&(n.equal=t);let r=()=>Yl(n);return r[F$2]=n,[r,s=>et$2(n,s),s=>lo$2(n,s)]}function Yl(e){return $e$3(e),e.value}function et$2(e,t){ns$2()||Zl(e),e.equal(e.value,t)||(e.value=t,jg(e));}function lo$2(e,t){ns$2()||Zl(e),et$2(e,t(e.value));}var Bn$3=x$3(w$3({},Be$3),{equal:Vn$3,value:void 0,kind:"signal"});function jg(e){e.version++,Ul(),ts$2(e);}var ss$2=x$3(w$3({},Be$3),{consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,dirty:true,kind:"effect"});function as$2(e){if(e.dirty=false,e.version>0&&!Ct$4(e))return;e.version++;let t=Ae$2(e);try{e.cleanup(),e.fn();}finally{Ue$4(e,t);}}var cs$1;function uo$2(){return cs$1}function Re$3(e){let t=cs$1;return cs$1=e,t}var Kl=Symbol("NotFound");function nn$2(e){return e===Kl||e?.name==="\u0275NotFound"}function ls$2(e,t,n){let r=Object.create(Vg);r.source=e,r.computation=t,n!=null&&(r.equal=n);let i=()=>{if(Tt$6(r),$e$3(r),r.value===xe$3)throw r.error;return r.value};return i[F$2]=r,i}function Jl(e,t){Tt$6(e),et$2(e,t),en$4(e);}function Xl(e,t){if(Tt$6(e),e.value===xe$3)throw e.error;lo$2(e,t),en$4(e);}var Vg=x$3(w$3({},Be$3),{value:Dt$5,dirty:true,error:null,equal:Vn$3,kind:"linkedSignal",producerMustRecompute(e){return e.value===Dt$5||e.value===wt$5},producerRecomputeValue(e){if(e.value===wt$5)throw new Error("");let t=e.value;e.value=wt$5;let n=Ae$2(e),r,o=false;try{let i=e.source(),s=t!==Dt$5&&t!==xe$3,a=s?{source:e.sourceValue,value:t}:void 0;r=e.computation(i,a),e.sourceValue=i,v$2(null),o=s&&r!==xe$3&&e.equal(t,r);}catch(i){r=xe$3,e.error=i;}finally{Ue$4(e,n);}if(o){e.value=t;return}e.value=r,e.version++;}});function eu(e){let t=v$2(null);try{return e()}finally{v$2(t);}}var vo$3="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",b$2=class b extends Error{code;constructor(t,n){super(zn$3(t,n)),this.code=t;}};function Hg(e){return `NG0${Math.abs(e)}`}function zn$3(e,t){return `${Hg(e)}${t?": "+t:""}`}function R$3(e){for(let t in e)if(e[t]===R$3)return t;throw Error("")}function iu$1(e,t){for(let n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n]);}function Qn$3(e){if(typeof e=="string")return e;if(Array.isArray(e))return `[${e.map(Qn$3).join(", ")}]`;if(e==null)return ""+e;let t=e.overriddenName||e.name;if(t)return `${t}`;let n=e.toString();if(n==null)return ""+n;let r=n.indexOf(`
`);return r>=0?n.slice(0,r):n}function Io$3(e,t){return e?t?`${e} ${t}`:e:t||""}var Bg=R$3({__forward_ref__:R$3});function Eo$3(e){return e.__forward_ref__=Eo$3,e}function B$5(e){return ws$1(e)?e():e}function ws$1(e){return typeof e=="function"&&e.hasOwnProperty(Bg)&&e.__forward_ref__===Eo$3}function re$3(e){return {token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function su$1(e){return {providers:e.providers||[],imports:e.imports||[]}}function Zn$3(e){return Ug(e,Do$3)}function $g(e){return Zn$3(e)!==null}function Ug(e,t){return e.hasOwnProperty(t)&&e[t]||null}function Wg(e){let t=e?.[Do$3]??null;return t||null}function ds$1(e){return e&&e.hasOwnProperty(po$3)?e[po$3]:null}var Do$3=R$3({\u0275prov:R$3}),po$3=R$3({\u0275inj:R$3}),S$1=class S{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,n){this._desc=t,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=re$3({token:this,providedIn:n.providedIn||"root",factory:n.factory}));}get multi(){return this}toString(){return `InjectionToken ${this._desc}`}};function Ts$1(e){return e&&!!e.\u0275providers}var Cs$1=R$3({\u0275cmp:R$3}),bs$1=R$3({\u0275dir:R$3}),_s$1=R$3({\u0275pipe:R$3}),Ms$1=R$3({\u0275mod:R$3}),Un$3=R$3({\u0275fac:R$3}),St$6=R$3({__NG_ELEMENT_ID__:R$3}),tu=R$3({__NG_ENV_ID__:R$3});function au(e){return To$3(e),e[Ms$1]||null}function rt$2(e){return To$3(e),e[Cs$1]||null}function wo$3(e){return To$3(e),e[bs$1]||null}function cu(e){return To$3(e),e[_s$1]||null}function To$3(e,t){if(e==null)throw new b$2(-919,false)}function de$2(e){return typeof e=="string"?e:e==null?"":String(e)}var lu=R$3({ngErrorCode:R$3}),qg=R$3({ngErrorMessage:R$3});R$3({ngTokenPath:R$3});function Ns(e,t){return uu("",-200)}function Co$3(e,t){throw new b$2(-201,false)}function uu(e,t,n){let r=new b$2(t,e);return r[lu]=t,r[qg]=e,r}function zg(e){return e[lu]}var fs$1;function du(){return fs$1}function J$3(e){let t=fs$1;return fs$1=e,t}function Ss$1(e,t,n){let r=Zn$3(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&8)return null;if(t!==void 0)return t;Co$3();}var sn$2=globalThis;var Qg={},bt$5=Qg,Zg="__NG_DI_FLAG__",ps$2=class ps{injector;constructor(t){this.injector=t;}retrieve(t,n){let r=_t$3(n)||0;try{return this.injector.get(t,r&8?null:bt$5,r)}catch(o){if(nn$2(o))return o;throw o}}};function Yg(e,t=0){let n=uo$2();if(n===void 0)throw new b$2(-203,false);if(n===null)return Ss$1(e,void 0,t);{let r=Kg(t),o=n.retrieve(e,r);if(nn$2(o)){if(r.optional)return null;throw o}return o}}function ke$5(e,t=0){return (du()||Yg)(B$5(e),t)}function T$3(e,t){return ke$5(e,_t$3(t))}function _t$3(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function Kg(e){return {optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function hs$1(e){let t=[];for(let n=0;n<e.length;n++){let r=B$5(e[n]);if(Array.isArray(r)){if(r.length===0)throw new b$2(900,false);let o,i=0;for(let s=0;s<r.length;s++){let a=r[s],c=Jg(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a;}t.push(ke$5(o,i));}else t.push(ke$5(r));}return t}function Jg(e){return e[Zg]}function tt$2(e,t){let n=e.hasOwnProperty(Un$3);return n?e[Un$3]:null}function fu(e,t,n){if(e.length!==t.length)return  false;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return  false}return  true}function pu(e){return e.flat(Number.POSITIVE_INFINITY)}function bo$3(e,t){e.forEach(n=>Array.isArray(n)?bo$3(n,t):t(n));}function xs$1(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n);}function Yn$3(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function hu(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function gu(e,t,n,r){let o=e.length;if(o==t)e.push(n,r);else if(o===1)e.push(r,e[0]),e[0]=n;else {for(o--,e.push(e[o-1],e[o]);o>t;){let i=o-2;e[o]=e[i],o--;}e[t]=n,e[t+1]=r;}}function _o$3(e,t,n){let r=an$2(e,t);return r>=0?e[r|1]=n:(r=~r,gu(e,r,t,n)),r}function Mo$2(e,t){let n=an$2(e,t);if(n>=0)return e[n|1]}function an$2(e,t){return Xg(e,t,1)}function Xg(e,t,n){let r=0,o=e.length>>n;for(;o!==r;){let i=r+(o-r>>1),s=e[i<<n];if(t===s)return i<<n;s>t?o=i:r=i+1;}return ~(o<<n)}var ot$3={},z$1=[],Kn$3=new S$1(""),Jn$1=new S$1("",-1),As$1=new S$1(""),on$2=class on{get(t,n=bt$5){if(n===bt$5){let o=uu("",-201);throw o.name="\u0275NotFound",o}return n}};function Rs$1(e){return {\u0275providers:e}}function mu(...e){return {\u0275providers:ks$1(true,e),\u0275fromNgModule:true}}function ks$1(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s);};return bo$3(t,s=>{let a=s;ho$3(a,i,[],r)&&(o||=[],o.push(a));}),o!==void 0&&yu(o,i),n}function yu(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];Os$1(o,i=>{t(i,r);});}}function ho$3(e,t,n,r){if(e=B$5(e),!e)return  false;let o=null,i=ds$1(e),s=!i&&rt$2(e);if(!i&&!s){let c=e.ngModule;if(i=ds$1(c),i)o=c;else return  false}else {if(s&&!s.standalone)return  false;o=e;}let a=r.has(o);if(s){if(a)return  false;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)ho$3(l,t,n,r);}}else if(i){if(i.imports!=null&&!a){r.add(o);let l;bo$3(i.imports,u=>{ho$3(u,t,n,r)&&(l||=[],l.push(u));}),l!==void 0&&yu(l,t);}if(!a){let l=tt$2(o)||(()=>new o);t({provide:o,useFactory:l,deps:z$1},o),t({provide:As$1,useValue:o,multi:true},o),t({provide:Kn$3,useValue:()=>ke$5(o),multi:true},o);}let c=i.providers;if(c!=null&&!a){let l=e;Os$1(c,u=>{t(u,l);});}}else return  false;return o!==e&&e.providers!==void 0}function Os$1(e,t){for(let n of e)Ts$1(n)&&(n=n.\u0275providers),Array.isArray(n)?Os$1(n,t):t(n);}var em=R$3({provide:String,useValue:R$3});function vu(e){return e!==null&&typeof e=="object"&&em in e}function tm(e){return !!(e&&e.useExisting)}function nm(e){return !!(e&&e.useFactory)}function Mt$7(e){return typeof e=="function"}function Iu(e){return !!e.useClass}var Ps$1=new S$1(""),fo$3={},nu={},us$2;function cn$2(){return us$2===void 0&&(us$2=new on$2),us$2}var ce$3=class ce{},Nt$4=class Nt extends ce$3{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=false;injectorDefTypes;constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,ms$2(t,s=>this.processProvider(s)),this.records.set(Jn$1,rn$2(void 0,this)),o.has("environment")&&this.records.set(ce$3,rn$2(void 0,this));let i=this.records.get(Ps$1);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(As$1,z$1,{self:true}));}retrieve(t,n){let r=_t$3(n)||0;try{return this.get(t,bt$5,r)}catch(o){if(nn$2(o))return o;throw o}}destroy(){$n$3(this),this._destroyed=true;let t=v$2(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r();}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),v$2(t);}}onDestroy(t){return $n$3(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){$n$3(this);let n=Re$3(this),r=J$3(void 0);try{return t()}finally{Re$3(n),J$3(r);}}get(t,n=bt$5,r){if($n$3(this),t.hasOwnProperty(tu))return t[tu](this);let o=_t$3(r),s=Re$3(this),a=J$3(void 0);try{if(!(o&4)){let l=this.records.get(t);if(l===void 0){let u=am(t)&&Zn$3(t);u&&this.injectableDefInScope(u)?l=rn$2(gs$1(t),fo$3):l=null,this.records.set(t,l);}if(l!=null)return this.hydrate(t,l,o)}let c=o&2?cn$2():this.parent;return n=o&8&&n===bt$5?null:n,c.get(t,n)}catch(c){let l=zg(c);throw l===-200||l===-201?new b$2(l,null):c}finally{J$3(a),Re$3(s);}}resolveInjectorInitializers(){let t=v$2(null),n=Re$3(this),r=J$3(void 0);try{let i=this.get(Kn$3,z$1,{self:!0});for(let s of i)s();}finally{Re$3(n),J$3(r),v$2(t);}}toString(){return "R3Injector[...]"}processProvider(t){t=B$5(t);let n=Mt$7(t)?t:B$5(t&&t.provide),r=om(t);if(!Mt$7(t)&&t.multi===true){let o=this.records.get(n);o||(o=rn$2(void 0,fo$3,true),o.factory=()=>hs$1(o.multi),this.records.set(n,o)),n=t,o.multi.push(t);}this.records.set(n,r);}hydrate(t,n,r){let o=v$2(null);try{if(n.value===nu)throw Ns("");return n.value===fo$3&&(n.value=nu,n.value=n.factory(void 0,r)),typeof n.value=="object"&&n.value&&sm(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{v$2(o);}}injectableDefInScope(t){if(!t.providedIn)return  false;let n=B$5(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1);}};function gs$1(e){let t=Zn$3(e),n=t!==null?t.factory:tt$2(e);if(n!==null)return n;if(e instanceof S$1)throw new b$2(-204,false);if(e instanceof Function)return rm(e);throw new b$2(-204,false)}function rm(e){if(e.length>0)throw new b$2(-204,false);let n=Wg(e);return n!==null?()=>n.factory(e):()=>new e}function om(e){if(vu(e))return rn$2(void 0,e.useValue);{let t=Ls(e);return rn$2(t,fo$3)}}function Ls(e,t,n){let r;if(Mt$7(e)){let o=B$5(e);return tt$2(o)||gs$1(o)}else if(vu(e))r=()=>B$5(e.useValue);else if(nm(e))r=()=>e.useFactory(...hs$1(e.deps||[]));else if(tm(e))r=(o,i)=>ke$5(B$5(e.useExisting),i!==void 0&&i&8?8:void 0);else {let o=B$5(e&&(e.useClass||e.provide));if(im(e))r=()=>new o(...hs$1(e.deps));else return tt$2(o)||gs$1(o)}return r}function $n$3(e){if(e.destroyed)throw new b$2(-205,false)}function rn$2(e,t,n=false){return {factory:e,value:t,multi:n?[]:void 0}}function im(e){return !!e.deps}function sm(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function am(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function ms$2(e,t){for(let n of e)Array.isArray(n)?ms$2(n,t):n&&Ts$1(n)?ms$2(n.\u0275providers,t):t(n);}function No$3(e,t){let n;e instanceof Nt$4?($n$3(e),n=e):n=new ps$2(e);let o=Re$3(n),i=J$3(void 0);try{return t()}finally{Re$3(o),J$3(i);}}function Eu(){return du()!==void 0||uo$2()!=null}var Ie$2=0,y=1,I$4=2,$$2=3,fe$3=4,Q$7=5,xt$3=6,ln$3=7,H$3=8,Z$3=9,Ee$3=10,A$3=11,un$2=12,Fs$1=13,it$3=14,Y$3=15,st$2=16,At$6=17,Pe$4=18,De$4=19,js=20,Ge$3=21,So$3=22,nt$2=23,oe$1=24,Rt$5=25,pe$3=26,L$3=27,Du=1,Vs$1=6,at$3=7,Xn$2=8,kt$3=9,j$3=10;function Ze$2(e){return Array.isArray(e)&&typeof e[Du]=="object"}function he$3(e){return Array.isArray(e)&&e[Du]===true}function Hs(e){return (e.flags&4)!==0}function Ye$3(e){return e.componentOffset>-1}function dn$3(e){return (e.flags&1)===1}function we$5(e){return !!e.template}function fn$3(e){return (e[I$4]&512)!==0}function Ot$3(e){return (e[I$4]&256)===256}var Bs="svg",wu="math";function ge$3(e){for(;Array.isArray(e);)e=e[Ie$2];return e}function $s(e,t){return ge$3(t[e])}function ee$4(e,t){return ge$3(t[e.index])}function xo$3(e,t){return e.data[t]}function Ao$3(e,t){return e[t]}function Us(e,t,n,r){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=r;}function me$3(e,t){let n=t[e];return Ze$2(n)?n:n[Ie$2]}function Tu(e){return (e[I$4]&4)===4}function Ro$3(e){return (e[I$4]&128)===128}function Cu$1(e){return he$3(e[$$2])}function ie$1(e,t){return t==null?null:e[t]}function Ws(e){e[At$6]=0;}function qs$1(e){e[I$4]&1024||(e[I$4]|=1024,Ro$3(e)&&Pt$6(e));}function bu(e,t){for(;e>0;)t=t[it$3],e--;return t}function er$3(e){return !!(e[I$4]&9216||e[oe$1]?.dirty)}function ko$3(e){e[Ee$3].changeDetectionScheduler?.notify(8),e[I$4]&64&&(e[I$4]|=1024),er$3(e)&&Pt$6(e);}function Pt$6(e){e[Ee$3].changeDetectionScheduler?.notify(0);let t=ze$4(e);for(;t!==null&&!(t[I$4]&8192||(t[I$4]|=8192,!Ro$3(t)));)t=ze$4(t);}function Oo$3(e,t){if(Ot$3(e))throw new b$2(911,false);e[Ge$3]===null&&(e[Ge$3]=[]),e[Ge$3].push(t);}function _u(e,t){if(e[Ge$3]===null)return;let n=e[Ge$3].indexOf(t);n!==-1&&e[Ge$3].splice(n,1);}function ze$4(e){let t=e[$$2];return he$3(t)?t[$$2]:t}function Gs(e){return e[ln$3]??=[]}function zs(e){return e.cleanup??=[]}function Mu(e,t,n,r){let o=Gs(t);o.push(n),e.firstCreatePass&&zs(e).push(r,o.length-1);}var C$3={lFrame:Hu$1(null),bindingsEnabled:true,skipHydrationRootTNode:null};var ys$1=false;function Nu(){return C$3.lFrame.elementDepthCount}function Su(){C$3.lFrame.elementDepthCount++;}function Qs$1(){C$3.lFrame.elementDepthCount--;}function Po$3(){return C$3.bindingsEnabled}function Zs(){return C$3.skipHydrationRootTNode!==null}function Ys(e){return C$3.skipHydrationRootTNode===e}function Ks(){C$3.skipHydrationRootTNode=null;}function g$1(){return C$3.lFrame.lView}function P$1(){return C$3.lFrame.tView}function xu$1(e){return C$3.lFrame.contextLView=e,e[H$3]}function Au(e){return C$3.lFrame.contextLView=null,e}function V$1(){let e=Js();for(;e!==null&&e.type===64;)e=e.parent;return e}function Js(){return C$3.lFrame.currentTNode}function Ru(){let e=C$3.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function pn$3(e,t){let n=C$3.lFrame;n.currentTNode=e,n.isParent=t;}function Xs(){return C$3.lFrame.isParent}function ea$1(){C$3.lFrame.isParent=false;}function ku(){return C$3.lFrame.contextLView}function ta$1(){return ys$1}function Wn$3(e){let t=ys$1;return ys$1=e,t}function tr$3(){let e=C$3.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function na$1(){return C$3.lFrame.bindingIndex}function Ou(e){return C$3.lFrame.bindingIndex=e}function Ke$3(){return C$3.lFrame.bindingIndex++}function nr$4(e){let t=C$3.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function Pu(){return C$3.lFrame.inI18n}function Lu(e,t){let n=C$3.lFrame;n.bindingIndex=n.bindingRootIndex=e,Lo$3(t);}function Fu(){return C$3.lFrame.currentDirectiveIndex}function Lo$3(e){C$3.lFrame.currentDirectiveIndex=e;}function ju$1(e){let t=C$3.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function Fo$2(){return C$3.lFrame.currentQueryIndex}function rr$4(e){C$3.lFrame.currentQueryIndex=e;}function cm(e){let t=e[y];return t.type===2?t.declTNode:t.type===1?e[Q$7]:null}function ra$1(e,t,n){if(n&4){let o=t,i=e;for(;o=o.parent,o===null&&!(n&1);)if(o=cm(i),o===null||(i=i[it$3],o.type&10))break;if(o===null)return  false;t=o,e=i;}let r=C$3.lFrame=Vu();return r.currentTNode=t,r.lView=e,true}function jo$3(e){let t=Vu(),n=e[y];C$3.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=false;}function Vu(){let e=C$3.lFrame,t=e===null?null:e.child;return t===null?Hu$1(e):t}function Hu$1(e){let t={currentTNode:null,isParent:true,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:false};return e!==null&&(e.child=t),t}function Bu(){let e=C$3.lFrame;return C$3.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var oa$2=Bu;function Vo$2(){let e=Bu();e.isParent=true,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0;}function $u$1(e){return (C$3.lFrame.contextLView=bu(e,C$3.lFrame.contextLView))[H$3]}function Te$2(){return C$3.lFrame.selectedIndex}function ct$3(e){C$3.lFrame.selectedIndex=e;}function hn$3(){let e=C$3.lFrame;return xo$3(e.tView,e.selectedIndex)}function Uu(){C$3.lFrame.currentNamespace=Bs;}function Wu$1(){lm();}function lm(){C$3.lFrame.currentNamespace=null;}function ia$1(){return C$3.lFrame.currentNamespace}var qu=true;function Ho$3(){return qu}function or$3(e){qu=e;}function sa$2(){let e,t;return {promise:new Promise((r,o)=>{e=r,t=o;}),resolve:e,reject:t}}function vs$1(e,t=null,n=null,r){let o=aa$1(e,t,n);return o.resolveInjectorInitializers(),o}function aa$1(e,t=null,n=null,r,o=new Set){let i=[n||z$1,mu(e)];return new Nt$4(i,t||cn$2(),null,o)}var le$2=class e{static THROW_IF_NOT_FOUND=bt$5;static NULL=new on$2;static create(t,n){if(Array.isArray(t))return vs$1({name:""},n,t);{let r=t.name??"";return vs$1({name:r},t.parent,t.providers)}}static \u0275prov=re$3({token:e,providedIn:"any",factory:()=>ke$5(Jn$1)});static __NG_ELEMENT_ID__=-1},ir$3=new S$1(""),Le$3=(()=>{class e{static __NG_ELEMENT_ID__=um;static __NG_ENV_ID__=n=>n}return e})(),go$3=class go extends Le$3{_lView;constructor(t){super(),this._lView=t;}get destroyed(){return Ot$3(this._lView)}onDestroy(t){let n=this._lView;return Oo$3(n,t),()=>_u(n,t)}};function um(){return new go$3(g$1())}var Gu=false,zu$1=new S$1(""),Lt$4=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=false;pendingTask=new Rn$3(false);debugTaskTracker=T$3(zu$1,{optional:true});get hasPendingTasks(){return this.destroyed?false:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new N$2(n=>{n.next(false),n.complete();}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(true);let n=this.taskId++;return this.pendingTasks.add(n),this.debugTaskTracker?.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.debugTaskTracker?.remove(n),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(false);}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(false),this.destroyed=true,this.pendingTask.unsubscribe();}static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>new e})}return e})(),Is$1=class Is extends ne$2{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=false){super(),this.__isAsync=t,Eu()&&(this.destroyRef=T$3(Le$3,{optional:true})??void 0,this.pendingTasks=T$3(Lt$4,{optional:true})??void 0);}emit(t){let n=v$2(null);try{super.next(t);}finally{v$2(n);}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c);}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof G$2&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{t(n);}finally{r!==void 0&&this.pendingTasks?.remove(r);}});}}},qe$3=Is$1;function mo$3(...e){}function ca$2(e){let t,n;function r(){e=mo$3;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t);}catch(o){}}return t=setTimeout(()=>{e(),r();}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r();})),()=>r()}function Qu(e){return queueMicrotask(()=>e()),()=>{e=mo$3;}}var la$2="isAngularZone",qn$3=la$2+"_ID",dm=0,ue$1=class e{hasPendingMacrotasks=false;hasPendingMicrotasks=false;isStable=true;onUnstable=new qe$3(false);onMicrotaskEmpty=new qe$3(false);onStable=new qe$3(false);onError=new qe$3(false);constructor(t){let{enableLongStackTrace:n=false,shouldCoalesceEventChangeDetection:r=false,shouldCoalesceRunChangeDetection:o=false,scheduleInRootZone:i=Gu}=t;if(typeof Zone>"u")throw new b$2(908,false);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=false,s.scheduleInRootZone=i,hm(s);}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(la$2)===true}static assertInAngularZone(){if(!e.isInAngularZone())throw new b$2(909,false)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new b$2(909,false)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,fm,mo$3,mo$3);try{return i.runTask(s,n,r)}finally{i.cancelTask(s);}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},fm={};function ua$2(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null);}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null));}finally{e.isStable=true;}}}function pm(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=true;function t(){ca$2(()=>{e.callbackScheduled=false,Es$1(e),e.isCheckStableRunning=true,ua$2(e),e.isCheckStableRunning=false;});}e.scheduleInRootZone?Zone.root.run(()=>{t();}):e._outer.run(()=>{t();}),Es$1(e);}function hm(e){let t=()=>{pm(e);},n=dm++;e._inner=e._inner.fork({name:"angular",properties:{[la$2]:true,[qn$3]:n,[qn$3+n]:true},onInvokeTask:(r,o,i,s,a,c)=>{if(gm(c))return r.invokeTask(i,s,a,c);try{return ru(e),r.invokeTask(i,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),ou(e);}},onInvoke:(r,o,i,s,a,c,l)=>{try{return ru(e),r.invoke(i,s,a,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!mm(c)&&t(),ou(e);}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Es$1(e),ua$2(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask));},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),false)});}function Es$1(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===true?e.hasPendingMicrotasks=true:e.hasPendingMicrotasks=false;}function ru(e){e._nesting++,e.isStable&&(e.isStable=false,e.onUnstable.emit(null));}function ou(e){e._nesting--,ua$2(e);}var Gn$3=class Gn{hasPendingMicrotasks=false;hasPendingMacrotasks=false;isStable=true;onUnstable=new qe$3;onMicrotaskEmpty=new qe$3;onStable=new qe$3;onError=new qe$3;run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function gm(e){return Zu(e,"__ignore_ng_zone__")}function mm(e){return Zu(e,"__scheduler_tick__")}function Zu(e,t){return !Array.isArray(e)||e.length!==1?false:e[0]?.data?.[t]===true}var Qe$2=class Qe{_console=console;handleError(t){this._console.error("ERROR",t);}},Ft$4=new S$1("",{factory:()=>{let e=T$3(ue$1),t=T$3(ce$3),n;return r=>{e.runOutsideAngular(()=>{t.destroyed&&!n?setTimeout(()=>{throw r}):(n??=t.get(Qe$2),n.handleError(r));});}}}),Yu={provide:Kn$3,useValue:()=>{T$3(Qe$2,{optional:true});},multi:true};function Fe$3(e,t){let [n,r,o]=is$2(e,t?.equal),i=n;i[F$2];return i.set=r,i.update=o,i.asReadonly=gn$3.bind(i),i}function gn$3(){let e=this[F$2];if(e.readonlyFn===void 0){let t=()=>this();t[F$2]=e,e.readonlyFn=t;}return e.readonlyFn}var da$2=new S$1("",{factory:()=>ym}),ym="ng";var Ku=new S$1(""),vm=new S$1("",{providedIn:"platform",factory:()=>"unknown"}),Im=new S$1(""),Em=new S$1("",{factory:()=>T$3(ir$3).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Bo$2=(()=>{class e{static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>{let n=new e;return n.store=Ju(T$3(ir$3),T$3(da$2)),n}});store={};onSerializeCallbacks={};get(n,r){return this.store[n]!==void 0?this.store[n]:r}set(n,r){this.store[n]=r;}remove(n){delete this.store[n];}hasKey(n){return this.store.hasOwnProperty(n)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(n,r){this.onSerializeCallbacks[n]=r;}toJson(){for(let n in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(n))try{this.store[n]=this.onSerializeCallbacks[n]();}catch(r){console.warn("Exception in onSerialize callback: ",r);}return JSON.stringify(this.store).replace(/</g,"\\u003C").replace(/\//g,"\\u002F")}}return e})();function Ju(e,t){let n=e.getElementById(t+"-state");if(n?.tagName==="SCRIPT"&&n.textContent)try{return JSON.parse(n.textContent)}catch(r){console.warn("Exception while restoring TransferState for app "+t,r);}return {}}var mn$2=(()=>{class e{view;node;constructor(n,r){this.view=n,this.node=r;}static __NG_ELEMENT_ID__=Dm}return e})();function Dm(){return new mn$2(g$1(),V$1())}var Oe$4=class Oe{},sr$3=new S$1("",{factory:()=>true});var fa$2=new S$1(""),$o$3=(()=>{class e{static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>new Ds$1})}return e})(),Ds$1=class Ds{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t);}schedule(t){t.dirty&&this.dirtyEffectCount++;}remove(t){let n=t.zone,r=this.queues.get(n);r.has(t)&&(r.delete(t),t.dirty&&this.dirtyEffectCount--);}enqueue(t){let n=t.zone;this.queues.has(n)||this.queues.set(n,new Set);let r=this.queues.get(n);r.has(t)||r.add(t);}flush(){for(;this.dirtyEffectCount>0;){let t=false;for(let[n,r]of this.queues)n===null?t||=this.flushQueue(r):t||=n.run(()=>this.flushQueue(r));t||(this.dirtyEffectCount=0);}}flushQueue(t){let n=false;for(let r of t)r.dirty&&(this.dirtyEffectCount--,n=true,r.run());return n}},yo$3=class yo{[F$2];constructor(t){this[F$2]=t;}destroy(){this[F$2].destroy();}};function pa$2(e,t){let n=t?.injector??T$3(le$2),r=t?.manualCleanup!==true?n.get(Le$3):null,o,i=n.get(mn$2,null,{optional:true}),s=n.get(Oe$4);return i!==null?(o=Cm(i.view,s,e),r instanceof go$3&&r._lView===i.view&&(r=null)):o=bm(e,n.get($o$3),s),o.injector=n,r!==null&&(o.onDestroyFns=[r.onDestroy(()=>o.destroy())]),new yo$3(o)}var Xu=x$3(w$3({},ss$2),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Wn$3(false);try{as$2(this);}finally{Wn$3(e);}},cleanup(){if(!this.cleanupFns?.length)return;let e=v$2(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()();}finally{this.cleanupFns=[],v$2(e);}}}),wm$1=x$3(w$3({},Xu),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12);},destroy(){if(We$3(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this);}}),Tm=x$3(w$3({},Xu),{consumerMarkedDirty(){this.view[I$4]|=8192,Pt$6(this.view),this.notifier.notify(13);},destroy(){if(We$3(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[nt$2]?.delete(this);}});function Cm(e,t,n){let r=Object.create(Tm);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=t,r.fn=ed(r,n),e[nt$2]??=new Set,e[nt$2].add(r),r.consumerMarkedDirty(r),r}function bm(e,t,n){let r=Object.create(wm$1);return r.fn=ed(r,e),r.scheduler=t,r.notifier=n,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function ed(e,t){return ()=>{t(n=>(e.cleanupFns??=[]).push(n));}}function ar$4(e){return typeof e=="function"&&e[F$2]!==void 0}function Uo$3(e){return ar$4(e)&&typeof e.set=="function"}var Wo$2=(()=>{class e{internalPendingTasks=T$3(Lt$4);scheduler=T$3(Oe$4);errorHandler=T$3(Ft$4);add(){let n=this.internalPendingTasks.add();return ()=>{this.internalPendingTasks.has(n)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(n));}}run(n){let r=this.add();try{n().catch(this.errorHandler).finally(r);}catch(o){this.errorHandler(o),r();}}static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>new e})}return e})();function Dr$2(e){return {toString:e}.toString()}var x$2=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(x$2||{}),ti$2=class ti{previousValue;currentValue;firstChange;constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r;}isFirstChange(){return this.firstChange}};function Wd(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r;}var qd=null,Pm=(()=>{qd=td;let e=()=>td;return e.ngInherit=true,e})();function Lm(){return qd}function td(e){return e.type.prototype.ngOnChanges&&(e.setInput=jm),Fm}function Fm(){let e=Gd(this),t=e?.current;if(t){let n=e.previous;if(n===ot$3)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t);}}function jm(e,t,n,r,o){let i=this.declaredInputs[r],s=Gd(e)||Vm(e,{previous:ot$3,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[i];a[i]=new ti$2(l&&l.currentValue,n,c===ot$3),Wd(e,t,o,n);}var Ca$2="__ngSimpleChanges__";function Gd(e){return Object.hasOwn(e,Ca$2)&&e[Ca$2]||null}function Vm(e,t){return e[Ca$2]=t}var nd=[];var k$3=function(e,t=null,n){for(let r=0;r<nd.length;r++){let o=nd[r];o(e,t,n);}};function Hm(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=Lm()(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s);}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i));}function zd(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),l&&((e.viewHooks??=[]).push(n,l),(e.viewCheckHooks??=[]).push(n,l)),u!=null&&(e.destroyHooks??=[]).push(n,u);}}function Zo$2(e,t,n){Qd(e,t,3,n);}function Yo$2(e,t,n,r){(e[I$4]&3)===n&&Qd(e,t,n,r);}function ha$2(e,t){let n=e[I$4];(n&3)===t&&(n&=16383,n+=1,e[I$4]=n);}function Qd(e,t,n,r){let o=r!==void 0?e[At$6]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[At$6]+=65536),(a<i||i==-1)&&(Bm(e,n,t,c),e[At$6]=(e[At$6]&4294901760)+c+2),c++;}function rd(e,t){k$3(x$2.LifecycleHookStart,e,t);let n=v$2(null);try{t.call(e);}finally{v$2(n),k$3(x$2.LifecycleHookEnd,e,t);}}function Bm(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[I$4]>>14<e[At$6]>>16&&(e[I$4]&3)===t&&(e[I$4]+=16384,rd(a,i)):rd(a,i);}var vn$4=-1,Bt$3=class Bt{factory;name;injectImpl;resolving=false;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,n,r,o){this.factory=t,this.name=o,this.canSeeViewProviders=n,this.injectImpl=r;}};function $m(e){return (e.flags&8)!==0}function Um(e){return (e.flags&16)!==0}function Wm(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i);}else {let i=o,s=n[++r];qm(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++;}}return r}function Zd(e){return e===3||e===4||e===6}function qm(e){return e.charCodeAt(0)===64}function In$3(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else {let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?od(e,n,o,null,t[++r]):od(e,n,o,null,null));}}return e}function od(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){o!==null&&(e[i+1]=o);return}i++,o!==null&&i++;}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),o!==null&&e.splice(i++,0,o);}function Yd(e){return e!==vn$4}function ni$2(e){return e&32767}function Gm(e){return e>>16}function ri$2(e,t){let n=Gm(e),r=t;for(;n>0;)r=r[it$3],n--;return r}var ba$2=true;function oi$1(e){let t=ba$2;return ba$2=e,t}var zm=256,Kd=zm-1,Jd=5,Qm=0,je$4={};function Zm(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty(St$6)&&(r=n[St$6]),r==null&&(r=n[St$6]=Qm++);let o=r&Kd,i=1<<o;t.data[e+(o>>Jd)]|=i;}function ii$2(e,t){let n=Xd(e,t);if(n!==-1)return n;let r=t[y];r.firstCreatePass&&(e.injectorIndex=t.length,ga$2(r.data,e),ga$2(t,null),ga$2(r.blueprint,null));let o=ic(e,t),i=e.injectorIndex;if(Yd(o)){let s=ni$2(o),a=ri$2(o,t),c=a[y].data;for(let l=0;l<8;l++)t[i+l]=a[s+l]|c[s+l];}return t[i+8]=o,i}function ga$2(e,t){e.push(0,0,0,0,0,0,0,0,t);}function Xd(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function ic(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=of(o),r===null)return vn$4;if(n++,o=o[it$3],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return vn$4}function _a$2(e,t,n){Zm(e,t,n);}function Ym(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(Zd(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else {if(i===t)return n[o+1];o=o+2;}}}return null}function ef(e,t,n){if(n&8||e!==void 0)return e;Co$3();}function tf(e,t,n,r){if(n&8&&r===void 0&&(r=null),(n&3)===0){let o=e[Z$3],i=J$3(void 0);try{return o?o.get(t,r,n&8):Ss$1(t,r,n&8)}finally{J$3(i);}}return ef(r,t,n)}function nf(e,t,n,r=0,o){if(e!==null){if(t[I$4]&2048&&!(r&2)){let s=ty(e,t,n,r,je$4);if(s!==je$4)return s}let i=rf(e,t,n,r,je$4);if(i!==je$4)return i}return tf(t,n,r,o)}function rf(e,t,n,r,o){let i=Jm(n);if(typeof i=="function"){if(!ra$1(t,e,r))return r&1?ef(o,n,r):tf(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&8))Co$3(n);else return s}finally{oa$2();}}else if(typeof i=="number"){let s=null,a=Xd(e,t),c=vn$4,l=r&1?t[Y$3][Q$7]:null;for((a===-1||r&4)&&(c=a===-1?ic(e,t):t[a+8],c===vn$4||!sd(r,false)?a=-1:(s=t[y],a=ni$2(c),t=ri$2(c,t)));a!==-1;){let u=t[y];if(id(i,a,u.data)){let d=Km(a,t,n,s,r,l);if(d!==je$4)return d}c=t[a+8],c!==vn$4&&sd(r,t[y].data[a+8]===l)&&id(i,a,t)?(s=u,a=ni$2(c),t=ri$2(c,t)):a=-1;}}return o}function Km(e,t,n,r,o,i){let s=t[y],a=s.data[e+8],c=r==null?Ye$3(a)&&ba$2:r!=s&&(a.type&3)!==0,l=o&1&&i===a,u=Ko$2(a,s,n,c,l);return u!==null?dr$4(t,s,u,a,o):je$4}function Ko$2(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,l=e.directiveEnd,u=i>>20,d=r?a:a+u,p=o?a+u:l;for(let f=d;f<p;f++){let h=s[f];if(f<c&&n===h||f>=c&&h.type===n)return f}if(o){let f=s[c];if(f&&we$5(f)&&f.type===n)return c}return null}function dr$4(e,t,n,r,o){let i=e[n],s=t.data;if(i instanceof Bt$3){let a=i;if(a.resolving)throw Ns();let c=oi$1(a.canSeeViewProviders);a.resolving=true;s[n].type||s[n];let d=a.injectImpl?J$3(a.injectImpl):null;ra$1(e,r,0);try{i=e[n]=a.factory(void 0,o,s,e,r),t.firstCreatePass&&n>=r.directiveStart&&Hm(n,s[n],t);}finally{d!==null&&J$3(d),oi$1(c),a.resolving=false,oa$2();}}return i}function Jm(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(St$6)?e[St$6]:void 0;return typeof t=="number"?t>=0?t&Kd:Xm:t}function id(e,t,n){let r=1<<e;return !!(n[t+(e>>Jd)]&r)}function sd(e,t){return !(e&2)&&!(e&1&&t)}var lt$3=class lt{_tNode;_lView;constructor(t,n){this._tNode=t,this._lView=n;}get(t,n,r){return nf(this._tNode,this._lView,t,_t$3(r),n)}};function Xm(){return new lt$3(V$1(),g$1())}function ey(e){return Dr$2(()=>{let t=e.prototype.constructor,n=t[Un$3]||Ma$1(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[Un$3]||Ma$1(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o);}return i=>new i})}function Ma$1(e){return ws$1(e)?()=>{let t=Ma$1(B$5(e));return t&&t()}:tt$2(e)}function ty(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[I$4]&2048&&!fn$3(s);){let a=rf(i,s,n,r|2,je$4);if(a!==je$4)return a;let c=i.parent;if(!c){let l=s[js];if(l){let u=l.get(n,je$4,r&-5);if(u!==je$4)return u}c=of(s),s=s[it$3];}i=c;}return o}function of(e){let t=e[y],n=t.type;return n===2?t.declTNode:n===1?e[Q$7]:null}function sf(e){return Ym(V$1(),e)}function wr$2(e){return {token:e.token,providedIn:e.autoProvided===false?null:"root",factory:e.factory,value:void 0}}function ny(){return Mn$3(V$1(),g$1())}function Mn$3(e,t){return new Tr$2(ee$4(e,t))}var Tr$2=(()=>{class e{nativeElement;constructor(n){this.nativeElement=n;}static __NG_ELEMENT_ID__=ny}return e})();function af(e){return e instanceof Tr$2?e.nativeElement:e}function ry(){return this._results[Symbol.iterator]()}var si$1=class si{_emitDistinctChangesOnly;dirty=true;_onDirty=void 0;_results=[];_changesDetected=false;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new ne$2}constructor(t=false){this._emitDistinctChangesOnly=t;}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t);}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=false;let r=pu(t);(this._changesDetected=!fu(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0]);}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this);}onDirty(t){this._onDirty=t;}setDirty(){this.dirty=true,this._onDirty?.();}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe());}[Symbol.iterator]=ry};function cf(e){return (e.flags&128)===128}var sc=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(sc||{}),lf=new Map,oy=0;function iy(){return oy++}function sy(e){lf.set(e[De$4],e);}function Na$3(e){lf.delete(e[De$4]);}var ad="__ngContext__";function En$2(e,t){Ze$2(t)?(e[ad]=t[De$4],sy(t)):e[ad]=t;}function uf(e){return ff(e[un$2])}function df(e){return ff(e[fe$3])}function ff(e){for(;e!==null&&!he$3(e);)e=e[fe$3];return e}var Sa$1;function ay(e){Sa$1=e;}function ac(){if(Sa$1!==void 0)return Sa$1;if(typeof document<"u")return document;throw new b$2(210,false)}var pf="r";var hf="di";var gf=false,mf=new S$1("",{factory:()=>gf});var cd=new WeakMap;function cy(e,t){if(e==null||typeof e!="object")return;let n=cd.get(e);n||(n=new WeakSet,cd.set(e,n)),n.add(t);}function Ci$2(e){return (e.flags&32)===32}var dy=()=>null;function yf(e,t,n=false){return dy()}function vf(e,t){let n=e.contentQueries;if(n!==null){let r=v$2(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];rr$4(i),a.contentQueries(2,t[s],s);}}}finally{v$2(r);}}}function xa$1(e,t,n){rr$4(0);let r=v$2(null);try{t(e,n);}finally{v$2(r);}}function cc(e,t,n){if(Hs(t)){let r=v$2(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s);}}}finally{v$2(r);}}}var $t$2=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})($t$2||{});var qo$2;function fy(){if(qo$2===void 0&&(qo$2=null,sn$2.trustedTypes))try{qo$2=sn$2.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e});}catch(e){}return qo$2}function bi$2(e){return fy()?.createHTML(e)||e}var Go$2;function If(){if(Go$2===void 0&&(Go$2=null,sn$2.trustedTypes))try{Go$2=sn$2.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e});}catch(e){}return Go$2}function ld(e){return If()?.createHTML(e)||e}function ud(e){return If()?.createScriptURL(e)||e}var Je$3=class Je{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t;}toString(){return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${vo$3})`}},Aa$2=class Aa extends Je$3{getTypeName(){return "HTML"}},Ra$2=class Ra extends Je$3{getTypeName(){return "Style"}},ka$2=class ka extends Je$3{getTypeName(){return "Script"}},Oa$2=class Oa extends Je$3{getTypeName(){return "URL"}},Pa$2=class Pa extends Je$3{getTypeName(){return "ResourceURL"}};function Nn$3(e){return e instanceof Je$3?e.changingThisBreaksApplicationSecurity:e}function _i$2(e,t){let n=Ef(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return  true;throw new Error(`Required a safe ${t}, got a ${n} (see ${vo$3})`)}return n===t}function Ef(e){return e instanceof Je$3&&e.getTypeName()||null}function py(e){return new Aa$2(e)}function hy(e){return new Ra$2(e)}function gy(e){return new ka$2(e)}function my(e){return new Oa$2(e)}function yy(e){return new Pa$2(e)}function vy(e){let t=new Fa$2(e);return Iy()?new La$2(t):t}var La$2=class La{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t;}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(bi$2(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch(n){return null}}},Fa$2=class Fa{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=bi$2(t),n}};function Iy(){try{return !!new window.DOMParser().parseFromString(bi$2(""),"text/html")}catch(e){return  false}}var Ey=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function lc(e){return e=String(e),e.match(Ey)?e:"unsafe:"+e}function Xe$3(e){let t={};for(let n of e.split(","))t[n]=true;return t}function Cr$2(...e){let t={};for(let n of e)for(let r in n)n.hasOwnProperty(r)&&(t[r]=true);return t}var Df=Xe$3("area,br,col,hr,img,wbr"),wf=Xe$3("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Tf=Xe$3("rp,rt"),Dy=Cr$2(Tf,wf),wy=Cr$2(wf,Xe$3("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),Ty=Cr$2(Tf,Xe$3("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),dd=Cr$2(Df,wy,Ty,Dy),Cf=Xe$3("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),Cy=Xe$3("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),by=Xe$3("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),_y=Cr$2(Cf,Cy,by),My=Xe$3("script,style,template"),ja$2=class ja{sanitizedSomething=false;buf=[];sanitizeChildren(t){let n=t.firstChild,r=true,o=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?r=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=true,r&&n.firstChild){o.push(n),n=xy(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let i=Sy(n);if(i){n=i;break}n=o.pop();}}return this.buf.join("")}startElement(t){let n=fd(t).toLowerCase();if(!dd.hasOwnProperty(n))return this.sanitizedSomething=true,!My.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let r=t.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),s=i.name,a=s.toLowerCase();if(!_y.hasOwnProperty(a)){this.sanitizedSomething=true;continue}let c=i.value;Cf[a]&&(c=lc(c)),this.buf.push(" ",s,'="',pd(c),'"');}return this.buf.push(">"),true}endElement(t){let n=fd(t).toLowerCase();dd.hasOwnProperty(n)&&!Df.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"));}chars(t){this.buf.push(pd(t));}};function Ny(e,t){return (e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function Sy(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw bf(t);return t}function xy(e){let t=e.firstChild;if(t&&Ny(e,t))throw bf(t);return t}function fd(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function bf(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var Ay=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Ry=/([^\#-~ |!])/g;function pd(e){return e.replace(/&/g,"&amp;").replace(Ay,function(t){let n=t.charCodeAt(0),r=t.charCodeAt(1);return "&#"+((n-55296)*1024+(r-56320)+65536)+";"}).replace(Ry,function(t){return "&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var zo$3;function _f(e,t){let n=null;try{zo$3=zo$3||vy(e);let r=t?String(t):"";n=zo$3.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=n.innerHTML,n=zo$3.getInertBodyElement(r);}while(r!==i);let a=new ja$2().sanitizeChildren(hd(n)||n);return bi$2(a)}finally{if(n){let r=hd(n)||n;for(;r.firstChild;)r.firstChild.remove();}}}function hd(e){return "content"in e&&ky(e)?e.content:null}function ky(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var Oy=/^>|^->|<!--|-->|--!>|<!-$/g,Py=/(<|>)/g,Ly="\u200B$1\u200B";function Fy(e){return e.replace(Oy,t=>t.replace(Py,Ly))}function jy(e,t){return e.createText(t)}function Vy(e,t,n){e.setValue(t,n);}function Hy(e,t){return e.createComment(Fy(t))}function Mf(e,t,n){return e.createElement(t,n)}function ai$1(e,t,n,r,o){e.insertBefore(t,n,r,o);}function Nf(e,t,n){e.appendChild(t,n);}function gd(e,t,n,r,o){r!==null?ai$1(e,t,n,r,o):Nf(e,t,n);}function Sf(e,t,n,r){e.removeChild(null,t,n,r);}function By(e,t,n){e.setAttribute(t,"style",n);}function $y(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n);}function xf(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&Wm(e,t,r),o!==null&&$y(e,t,o),i!==null&&By(e,t,i);}var br$2=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e[e.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",e})(br$2||{});function Uy(e){let t=uc();return t?ld(t.sanitize(br$2.HTML,e)||""):_i$2(e,"HTML")?ld(Nn$3(e)):_f(ac(),de$2(e))}function Af(e){let t=uc();return t?t.sanitize(br$2.URL,e)||"":_i$2(e,"URL")?Nn$3(e):lc(de$2(e))}function Rf(e){let t=uc();if(t)return ud(t.sanitize(br$2.RESOURCE_URL,e)||"");if(_i$2(e,"ResourceURL"))return ud(Nn$3(e));throw new b$2(904,false)}var Wy={embed:{src:true},frame:{src:true},iframe:{src:true},media:{src:true},base:{href:true},link:{href:true},object:{data:true,codebase:true}};function qy(e,t){return Wy[e.toLowerCase()]?.[t.toLowerCase()]===true?Rf:Af}function Gy(e,t,n){return qy(t,n)(e)}function uc(){let e=g$1();return e&&e[Ee$3].sanitizer}function zy(e){return e.ownerDocument}function Qy(e){return e instanceof Function?e():e}function Zy(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1;}}var kf="ng-template";function Yy(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&Zy(t[o+1].toLowerCase(),n,0)!==-1)return  true}else if(dc(e))return  false;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return  true}return  false}function dc(e){return e.type===4&&e.value!==kf}function Ky(e,t,n){let r=e.type===4&&!n?kf:e.value;return t===r}function Jy(e,t,n){let r=4,o=e.attrs,i=o!==null?tv(o):0,s=false;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!Ce$4(r)&&!Ce$4(c))return  false;if(s&&Ce$4(c))continue;s=false,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!Ky(e,c,n)||c===""&&t.length===1){if(Ce$4(r))return  false;s=true;}}else if(r&8){if(o===null||!Yy(e,o,c,n)){if(Ce$4(r))return  false;s=true;}}else {let l=t[++a],u=Xy(c,o,dc(e),n);if(u===-1){if(Ce$4(r))return  false;s=true;continue}if(l!==""){let d;if(u>i?d="":d=o[u+1].toLowerCase(),r&2&&l!==d){if(Ce$4(r))return  false;s=true;}}}}return Ce$4(r)||s}function Ce$4(e){return (e&1)===0}function Xy(e,t,n,r){if(t===null)return  -1;let o=0;if(r||!n){let i=false;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=true;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else {if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2;}return  -1}else return nv(t,e)}function Of(e,t,n=false){for(let r=0;r<t.length;r++)if(Jy(e,t[r],n))return  true;return  false}function ev(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if((n&1)===0)return t[n+1]}return null}function tv(e){for(let t=0;t<e.length;t++){let n=e[t];if(Zd(n))return t}return e.length}function nv(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return  -1;if(r===t)return n;n++;}return  -1}function rv(e,t){e:for(let n=0;n<t.length;n++){let r=t[n];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return  true}}return  false}function md(e,t){return e?":not("+t.trim()+")":t}function ov(e){let t=e[0],n=1,r=2,o="",i=false;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]";}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!Ce$4(s)&&(t+=md(i,o),o=""),r=s,i=i||!Ce$4(r);n++;}return o!==""&&(t+=md(i,o)),t}function iv(e){return e.map(ov).join(",")}function sv(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else {if(!Ce$4(o))break;o=i;}r++;}return n.length&&t.push(1,...n),t}var q$4={},ci$1=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(ci$1||{}),av;function fc(e,t){return av(e,t)}var Pf=new S$1("",{factory:()=>false});var cv=false,_r$2=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function Lf(e){return e[Z$3].get(Pf,cv)}function lv(e,t,n){let r=Dn$2.get(e);if(r){for(let o of t)r.classList.push(o);for(let o of n)r.cleanupFns.push(o);}else Dn$2.set(e,{classList:t,cleanupFns:n});}function pc(e){let t=Dn$2.get(e);if(t){for(let n of t.cleanupFns)n();Dn$2.delete(e);}Vt$4.delete(e);}var Dn$2=new WeakMap,Vt$4=new WeakMap,fr$4=new WeakMap;function Ff(e){return e?e[it$3]??e:null}var cr$4=new WeakSet;function yd(e,t){let n=fr$4.get(e);if(n&&n.length>0){let r=n.findIndex(o=>o.el===t);r>-1&&n.splice(r,1);}n?.length===0&&fr$4.delete(e);}function uv(e,t,n){let r=fr$4.get(e);if(!r||r.length===0)return;let o=t.parentNode,i=t.previousSibling,s=Ff(n);for(let a=r.length-1;a>=0;a--){let{el:c,declarationView:l}=r[a],u=c.parentNode;c===t?(r.splice(a,1),cr$4.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}}))):i&&c===i?(r.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),c.parentNode?.removeChild(c)):u&&o&&u!==o&&(s===null||l===null||s===l)&&(r.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),c.parentNode?.removeChild(c));}}function jf(e,t,n){let r=Ff(n),o=fr$4.get(e);o?o.some(i=>i.el===t)||o.push({el:t,declarationView:r}):fr$4.set(e,[{el:t,declarationView:r}]);}function vd(e){let t=e[pe$3]??={};return t.enter??=new Map}function Mi$1(e){let t=e[pe$3]??={};return t.leave??=new Map}function Vf(e){let t=typeof e=="function"?e():e,n=Array.isArray(t)?t:null;return typeof t=="string"&&(n=t.trim().split(/\s+/).filter(r=>r)),n}function dv(e,t){if(!_r$2)return;let n=Dn$2.get(e);if(n&&n.classList.length>0&&fv(e,n.classList))for(let r of n.classList)t.removeClass(e,r);pc(e);}function fv(e,t){for(let n of t)if(e.classList.contains(n))return  true;return  false}function pr$3(e){return e.composedPath?e.composedPath()[0]:e.target}function hc(e,t){let n=Vt$4.get(t);return n===void 0?true:t===pr$3(e)&&(n.animationName!==void 0&&e.animationName===n.animationName||n.propertyName!==void 0&&(n.propertyName==="all"||e.propertyName===n.propertyName))}function Hf(e,t,n){let r=e.get(t.index)??{animateFns:[]};r.animateFns.push(n),e.set(t.index,r);}function Id(e,t){if(e)for(let n of e)n();for(let n of t)n();}function Ed(e,t){let n=Mi$1(e).get(t.index);n&&(n.resolvers=void 0);}function li$1(e){if(!e)return 0;let t=e.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(e)*t}function jt$3(e,t){return e.getPropertyValue(t).split(",").map(r=>r.trim())}function pv(e){let t=jt$3(e,"transition-property"),n=jt$3(e,"transition-duration"),r=jt$3(e,"transition-delay"),o={propertyName:"",duration:0,animationName:void 0};for(let i=0;i<t.length;i++){let s=li$1(r[i])+li$1(n[i]);s>o.duration&&(o.propertyName=t[i],o.duration=s);}return o}function hv(e){let t=jt$3(e,"animation-name"),n=jt$3(e,"animation-delay"),r=jt$3(e,"animation-duration"),o=jt$3(e,"animation-iteration-count"),i={animationName:"",propertyName:void 0,duration:0};for(let s=0;s<t.length;s++){let a=li$1(n[s])+li$1(r[s]),c=o[s];a>i.duration&&c!=="infinite"&&(i.animationName=t[s],i.duration=a);}return i}function Bf(e,t){return e!==void 0&&e.duration>t.duration}function $f(e){return (e.animationName!=null||e.propertyName!=null)&&e.duration>0}function gv(e,t){let n=getComputedStyle(e),r=hv(n),o=pv(n),i=r.duration>o.duration?r:o;Bf(t.get(e),i)||$f(i)&&t.set(e,i);}function Uf(e,t,n){if(!n)return;let r=e.getAnimations();return r.length===0?gv(e,t):mv(e,t,r)}function mv(e,t,n){let r={animationName:void 0,propertyName:void 0,duration:0};for(let o of n){let i=o.effect?.getTiming();if(i?.iterations===1/0)continue;let s=typeof i?.duration=="number"?i.duration:0,a=(i?.delay??0)+s,c=o.playbackRate;c!==void 0&&c!==0&&c!==1&&(a/=Math.abs(c));let l,u;o.animationName?u=o.animationName:l=o.transitionProperty,a>=r.duration&&(r={animationName:u,propertyName:l,duration:a});}Bf(t.get(e),r)||$f(r)&&t.set(e,r);}var Ut$3=new Set,Ni$2=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Ni$2||{}),Gt$3=new S$1(""),Dd=new Set;function _e$3(e){Dd.has(e)||(Dd.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}));}var Si$1=(()=>{class e{impl=null;execute(){this.impl?.execute();}static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>new e})}return e})(),gc=[0,1,2,3],mc=(()=>{class e{ngZone=T$3(ue$1);scheduler=T$3(Oe$4);errorHandler=T$3(Qe$2,{optional:true});sequences=new Set;deferredRegistrations=new Set;executing=false;constructor(){T$3(Gt$3,{optional:true});}execute(){let n=this.sequences.size>0;n&&k$3(x$2.AfterRenderHooksStart),this.executing=true;for(let r of gc)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[r]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let i=o.hooks[r];return i(o.pipelinedValue)},o.snapshot));}catch(i){o.erroredOrDestroyed=true,this.errorHandler?.handleError(i);}this.executing=false;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),n&&k$3(x$2.AfterRenderHooksEnd);}register(n){let{view:r}=n;r!==void 0?((r[Rt$5]??=[]).push(n),Pt$6(r),r[I$4]|=8192):this.executing?this.deferredRegistrations.add(n):this.addSequence(n);}addSequence(n){this.sequences.add(n),this.scheduler.notify(7);}unregister(n){this.executing&&this.sequences.has(n)?(n.erroredOrDestroyed=true,n.pipelinedValue=void 0,n.once=true):(this.sequences.delete(n),this.deferredRegistrations.delete(n));}maybeTrace(n,r){return r?r.run(Ni$2.AFTER_NEXT_RENDER,n):n()}static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>new e})}return e})(),hr$4=class hr{impl;hooks;view;once;snapshot;erroredOrDestroyed=false;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,n,r,o,i,s=null){this.impl=t,this.hooks=n,this.view=r,this.once=o,this.snapshot=s,this.unregisterOnDestroy=i?.onDestroy(()=>this.destroy());}afterRun(){this.erroredOrDestroyed=false,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null;}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[Rt$5];t&&(this.view[Rt$5]=t.filter(n=>n!==this));}};function Wf(e,t){let n=t?.injector??T$3(le$2);return _e$3("NgAfterNextRender"),vv(e,n,t,true)}function yv(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function vv(e,t,n,r){let o=t.get(Si$1);o.impl??=t.get(mc);let i=t.get(Gt$3,null,{optional:true}),s=n?.manualCleanup!==true?t.get(Le$3):null,a=t.get(mn$2,null,{optional:true}),c=new hr$4(o.impl,yv(e),a?.view,r,s,i?.snapshot(null));return o.impl.register(c),c}var Mr$2=new S$1("",{factory:()=>{let e=T$3(ce$3),t=new Set;return e.onDestroy(()=>t.clear()),{queue:t,isScheduled:false,scheduler:null,injector:e}}});function qf(e,t,n){let r=e.get(Mr$2);if(Array.isArray(t))for(let o of t)r.queue.add(o),n?.detachedLeaveAnimationFns?.push(o);else r.queue.add(t),n?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(e);}function Iv(e,t){let n=e.get(Mr$2);if(Array.isArray(t))for(let r of t)n.queue.delete(r);else n.queue.delete(t);}function Ev(e,t){let n=e.get(Mr$2);if(t.detachedLeaveAnimationFns){for(let r of t.detachedLeaveAnimationFns)n.queue.delete(r);t.detachedLeaveAnimationFns=void 0;}}function Dv(e){let t=e.get(Mr$2);t.isScheduled||(Wf(()=>{t.isScheduled=false;for(let n of t.queue)n();t.queue.clear();},{injector:t.injector}),t.isScheduled=true);}function Gf(e){let t=e.get(Mr$2);t.scheduler=Dv,t.scheduler(e);}function zf(e,t){for(let[n,r]of t)qf(e,r.animateFns);}function wd(e,t,n,r){let o=e?.[pe$3]?.enter;t!==null&&o&&o.has(n.index)&&zf(r,o);}function Td(e,t,n,r){try{n.get(Jn$1);}catch(s){return r(false)}let o=e?.[pe$3];o?.enter?.has(t.index)&&Iv(n,o.enter.get(t.index).animateFns);let i=wv(e,t,o);if(i.size===0){let s=false;if(e){let a=[];xi$2(e,t,a),s=a.length>0;}if(!s)return r(false)}e&&Ut$3.add(e[De$4]),qf(n,()=>Tv(e,t,o||void 0,i,r),o||void 0);}function wv(e,t,n){let r=new Map,o=n?.leave;if(o&&o.has(t.index)&&r.set(t.index,o.get(t.index)),e&&o)for(let[i,s]of o){if(r.has(i))continue;let c=e[y].data[i].parent;for(;c;){if(c===t){r.set(i,s);break}c=c.parent;}}return r}function Tv(e,t,n,r,o){let i=[];if(n&&n.leave)for(let[s]of r){if(!n.leave.has(s))continue;let a=n.leave.get(s);for(let c of a.animateFns){let{promise:l}=c();i.push(l);}n.detachedLeaveAnimationFns=void 0;}if(e&&xi$2(e,t,i),i.length>0){let s=n||e?.[pe$3];if(s){let a=s.running;a&&i.push(a),s.running=Promise.allSettled(i),bv(e,s.running,o);}else Promise.allSettled(i).then(()=>{e&&Ut$3.delete(e[De$4]),o(true);});}else e&&Ut$3.delete(e[De$4]),o(false);}function xi$2(e,t,n){if(t.type&12){let o=e[t.index];if(he$3(o))for(let i=j$3;i<o.length;i++){let s=o[i];s[y].type===2&&Cv(s,n);}}let r=t.child;for(;r;)xi$2(e,r,n),r=r.next;}function Cv(e,t){let n=e[pe$3];if(n&&n.leave)for(let o of n.leave.values())for(let i of o.animateFns){let{promise:s}=i();t.push(s);}let r=e[y].firstChild;for(;r;)xi$2(e,r,t),r=r.next;}function bv(e,t,n){t.then(()=>{e[pe$3]?.running===t&&(e[pe$3].running=void 0,Ut$3.delete(e[De$4])),n(true);});}function yn$3(e,t,n,r,o,i,s,a){if(o!=null){let c,l=false;he$3(o)?c=o:Ze$2(o)&&(l=true,o=o[Ie$2]);let u=ge$3(o);e===0&&r!==null?(wd(a,r,i,n),s==null?Nf(t,r,u):ai$1(t,r,u,s||null,true)):e===1&&r!==null?(wd(a,r,i,n),ai$1(t,r,u,s||null,true),uv(i,u,a)):e===2?(a?.[pe$3]?.leave?.has(i.index)&&jf(i,u,a),cr$4.delete(u),Td(a,i,n,d=>{if(cr$4.has(u)){cr$4.delete(u);return}Sf(t,u,l,d);})):e===3&&(cr$4.delete(u),Td(a,i,n,()=>{t.destroyNode(u);})),c!=null&&Pv(t,e,n,c,i,r,s);}}function _v(e,t){Qf(e,t),t[Ie$2]=null,t[Q$7]=null;}function Mv(e,t,n,r,o,i){r[Ie$2]=o,r[Q$7]=t,Ri$3(e,r,n,1,o,i);}function Qf(e,t){t[Ee$3].changeDetectionScheduler?.notify(9),Ri$3(e,t,t[A$3],2,null,null);}function Nv(e){let t=e[un$2];if(!t)return ma$2(e[y],e);for(;t;){let n=null;if(Ze$2(t))n=t[un$2];else {let r=t[j$3];r&&(n=r);}if(!n){for(;t&&!t[fe$3]&&t!==e;)Ze$2(t)&&ma$2(t[y],t),t=t[$$2];t===null&&(t=e),Ze$2(t)&&ma$2(t[y],t),n=t&&t[fe$3];}t=n;}}function yc(e,t){let n=e[kt$3],r=n.indexOf(t);n.splice(r,1);}function Ai$3(e,t){if(Ot$3(t))return;let n=t[A$3];n.destroyNode&&Ri$3(e,t,n,3,null,null),Nv(t);}function ma$2(e,t){if(Ot$3(t))return;let n=v$2(null);try{t[I$4]&=-129,t[I$4]|=256,t[oe$1]&&We$3(t[oe$1]),xv(e,t),Sv(e,t),t[y].type===1&&t[A$3].destroy();let r=t[st$2];if(r!==null&&he$3(t[$$2])){r!==t[$$2]&&yc(r,t);let o=t[Pe$4];o!==null&&o.detachView(e);}Na$3(t);}finally{v$2(n);}}function Sv(e,t){let n=e.cleanup,r=t[ln$3];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2;}else {let a=r[n[s+1]];n[s].call(a);}r!==null&&(t[ln$3]=null);let o=t[Ge$3];if(o!==null){t[Ge$3]=null;for(let s=0;s<o.length;s++){let a=o[s];a();}}let i=t[nt$2];if(i!==null){t[nt$2]=null;for(let s of i)s.destroy();}}function xv(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof Bt$3)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];k$3(x$2.LifecycleHookStart,a,c);try{c.call(a);}finally{k$3(x$2.LifecycleHookEnd,a,c);}}else {k$3(x$2.LifecycleHookStart,o,i);try{i.call(o);}finally{k$3(x$2.LifecycleHookEnd,o,i);}}}}}function Zf(e,t,n){return Av(e,t.parent,n)}function Av(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[Ie$2];if(Ye$3(r)){let{encapsulation:o}=e.data[r.directiveStart+r.componentOffset];if(o===$t$2.None||o===$t$2.Emulated)return null}return ee$4(r,n)}function Yf(e,t,n){return kv(e,t,n)}function Rv(e,t,n){return e.type&40?ee$4(e,n):null}var kv=Rv;function vc(e,t,n,r){let o=Zf(e,r,t),i=t[A$3],s=r.parent||t[Q$7],a=Yf(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)gd(i,o,n[c],a,false);else gd(i,o,n,a,false);}function lr$4(e,t){if(t!==null){let n=t.type;if(n&3)return ee$4(t,e);if(n&4)return Va$2(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return lr$4(e,r);{let o=e[t.index];return he$3(o)?Va$2(-1,o):ge$3(o)}}else {if(n&128)return lr$4(e,t.next);if(n&32)return fc(t,e)()||ge$3(e[t.index]);{let r=Kf(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=ze$4(e[Y$3]);return lr$4(o,r)}else return lr$4(e,t.next)}}}return null}function Kf(e,t){if(t!==null){let r=e[Y$3][Q$7],o=t.projection;return r.projection[o]}return null}function Va$2(e,t){let n=j$3+e+1;if(n<t.length){let r=t[n],o=r[y].firstChild;if(o!==null)return lr$4(r,o)}return t[at$3]}function Ic(e,t,n,r,o,i,s){for(;n!=null;){let a=r[Z$3];if(n.type===128){n=n.next;continue}let c=r[n.index],l=n.type;if(s&&t===0&&(c&&En$2(ge$3(c),r),n.flags|=2),!Ci$2(n))if(l&8)Ic(e,t,n.child,r,o,i,false),yn$3(t,e,a,o,c,n,i,r);else if(l&32){let u=fc(n,r),d;for(;d=u();)yn$3(t,e,a,o,d,n,i,r);yn$3(t,e,a,o,c,n,i,r);}else l&16?Jf(e,t,r,n,o,i):yn$3(t,e,a,o,c,n,i,r);n=s?n.projectionNext:n.next;}}function Ri$3(e,t,n,r,o,i){Ic(n,r,e.firstChild,t,o,i,false);}function Ov(e,t,n){let r=t[A$3],o=Zf(e,n,t),i=n.parent||t[Q$7],s=Yf(i,n,t);Jf(r,0,t,n,o,s);}function Jf(e,t,n,r,o,i){let s=n[Y$3],c=s[Q$7].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];yn$3(t,e,n[Z$3],o,u,r,i,n);}else {let l=c,u=s[$$2];cf(r)&&(l.flags|=128),Ic(e,t,l,u,o,i,true);}}function Pv(e,t,n,r,o,i,s){let a=r[at$3],c=ge$3(r);a!==c&&yn$3(t,e,n,i,a,o,s);for(let l=j$3;l<r.length;l++){let u=r[l];Ri$3(u[y],u,e,t,i,a);}}function Lv(e,t,n,r,o){if(t)o?e.addClass(n,r):e.removeClass(n,r);else {let i=r.indexOf("-")===-1?void 0:ci$1.DashCase;o==null?e.removeStyle(n,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=ci$1.Important),e.setStyle(n,r,o,i));}}function Ec(e,t,n,r,o,i,s,a,c,l,u){let d=L$3+r,p=d+o,f=Fv(d,p),h=typeof l=="function"?l():l;return f[y]={type:e,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:p,hostBindingOpCodes:null,firstCreatePass:true,firstUpdatePass:true,staticViewQueries:false,staticContentQueries:false,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:h,incompleteFirstPass:false,ssrId:u}}function Fv(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:q$4);return n}function jv(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=Ec(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function Dc(e,t,n,r,o,i,s,a,c,l,u){let d=t.blueprint.slice();return d[Ie$2]=o,d[I$4]=r|4|128|8|64|1024,(l!==null||e&&e[I$4]&2048)&&(d[I$4]|=2048),Ws(d),d[$$2]=d[it$3]=e,d[H$3]=n,d[Ee$3]=s||e&&e[Ee$3],d[A$3]=a||e&&e[A$3],d[Z$3]=c||e&&e[Z$3]||null,d[Q$7]=i,d[De$4]=iy(),d[xt$3]=u,d[js]=l,d[Y$3]=t.type==2?e[Y$3]:d,d}function Vv(e,t,n){let r=ee$4(t,e),o=jv(n),i=e[Ee$3].rendererFactory,s=wc(e,Dc(e,o,null,Xf(n),r,t,null,i.createRenderer(r,n),null,null,null));return e[t.index]=s}function Xf(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function ep(e,t,n,r){if(n===0)return  -1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function wc(e,t){return e[un$2]?e[Fs$1][fe$3]=t:e[un$2]=t,e[Fs$1]=t,t}function Hv(e=1){tp(P$1(),g$1(),Te$2()+e);}function tp(e,t,n,r){if((t[I$4]&3)===3){let i=e.preOrderCheckHooks;i!==null&&Zo$2(t,i,n);}else {let i=e.preOrderHooks;i!==null&&Yo$2(t,i,0,n);}ct$3(n);}var ki$4=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(ki$4||{});function Wt$3(e,t,n,r){let o=v$2(null);try{let[i,s,a]=e.inputs[n],c=null;(s&ki$4.SignalBased)!==0&&(c=t[i][F$2]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):a!==null&&(r=a.call(t,r)),e.setInput!==null?e.setInput(t,c,r,n,i):Wd(t,c,i,r);}finally{v$2(o);}}function np(e,t,n,r,o){let i=Te$2(),s=r&2;try{ct$3(-1),s&&t.length>L$3&&tp(e,t,L$3,!1);let a=s?x$2.TemplateUpdateStart:x$2.TemplateCreateStart;k$3(a,o,n),n(r,o);}finally{ct$3(i);let a=s?x$2.TemplateUpdateEnd:x$2.TemplateCreateEnd;k$3(a,o,n);}}function Oi$2(e,t,n){Gv(e,t,n),(n.flags&64)===64&&zv(e,t,n);}function Nr$2(e,t,n=ee$4){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a;}}}function Bv(e,t,n,r){let i=r.get(mf,gf)||n===$t$2.ShadowDom||n===$t$2.ExperimentalIsolatedShadowDom,s=e.selectRootElement(t,i);if(s.tagName.toLowerCase()==="script")throw new b$2(905,false);return s}function Wv(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function rp(e,t,n,r,o,i){let s=t[y];if(_c(e,s,t,n,r)){Ye$3(e)&&qv(t,e.index);return}e.type&3&&(n=Wv(n)),op(e,t,n,r,o,i);}function op(e,t,n,r,o,i){if(e.type&3){let s=ee$4(e,t);r=i!=null?i(r,e.value||"",n):r,o.setProperty(s,n,r);}else e.type&12;}function qv(e,t){let n=me$3(t,e);n[I$4]&16||(n[I$4]|=64);}function Gv(e,t,n){let r=n.directiveStart,o=n.directiveEnd;Ye$3(n)&&Vv(t,n,e.data[r+n.componentOffset]),e.firstCreatePass||ii$2(n,t);let i=n.initialInputs;for(let s=r;s<o;s++){let a=e.data[s],c=dr$4(t,e,s,n);if(En$2(c,t),i!==null&&Kv(t,s-r,c,a,n,i),we$5(a)){let l=me$3(n.index,t);l[H$3]=dr$4(t,e,s,n);}}}function zv(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=Fu();try{ct$3(i);for(let a=r;a<o;a++){let c=e.data[a],l=t[a];Lo$3(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&Qv(c,l);}}finally{ct$3(-1),Lo$3(s);}}function Qv(e,t){e.hostBindings!==null&&e.hostBindings(1,t);}function Tc(e,t){let n=e.directiveRegistry,r=null;if(n)for(let o=0;o<n.length;o++){let i=n[o];Of(t,i.selectors,false)&&(r??=[],we$5(i)?r.unshift(i):r.push(i));}return r}function Zv(e,t,n,r,o,i){let s=ee$4(e,t);Yv(t[A$3],s,i,e.value,n,r,o);}function Yv(e,t,n,r,o,i,s){if(i==null)s?.(i,r||"",o),e.removeAttribute(t,o,n);else {let a=s==null?de$2(i):s(i,r||"",o);e.setAttribute(t,o,a,n);}}function Kv(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Wt$3(r,n,c,l);}}function Cc(e,t,n,r,o){let i=L$3+n,s=t[y],a=o(s,t,e,r,n);t[i]=a,pn$3(e,true);let c=e.type===2;return c?(xf(t[A$3],a,e),(Nu()===0||dn$3(e))&&En$2(a,t),Su()):En$2(a,t),Ho$3()&&(!c||!Ci$2(e))&&vc(s,t,a,e),e}function bc(e){let t=e;return Xs()?ea$1():(t=t.parent,pn$3(t,false)),t}function Jv(e,t){let n=e[Z$3];if(!n)return;let r;try{r=n.get(Ft$4,null);}catch(o){r=null;}r?.(t);}function _c(e,t,n,r,o){let i=e.inputs?.[r],s=e.hostDirectiveInputs?.[r],a=false;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=t.data[l];Wt$3(d,n[l],u,o),a=true;}if(i)for(let c of i){let l=n[c],u=t.data[c];Wt$3(u,l,r,o),a=true;}return a}function Xv(e,t,n,r,o,i){let s=null,a=null,c=null,l=false,u=e.directiveToIndex.get(r.type);if(typeof u=="number"?s=u:[s,a,c]=u,a!==null&&c!==null&&e.hostDirectiveInputs?.hasOwnProperty(o)){let d=e.hostDirectiveInputs[o];for(let p=0;p<d.length;p+=2){let f=d[p];if(f>=a&&f<=c){let h=t.data[f],m=d[p+1];Wt$3(h,n[f],m,i),l=true;}else if(f>c)break}}return s!==null&&r.inputs.hasOwnProperty(o)&&(Wt$3(r,n[s],o,i),l=true),l}function eI(e,t){let n=me$3(t,e),r=n[y];tI(r,n);let o=n[Ie$2];o!==null&&n[xt$3]===null&&(n[xt$3]=yf(o,n[Z$3])),k$3(x$2.ComponentStart);try{Mc(r,n,n[H$3]);}finally{k$3(x$2.ComponentEnd,n[H$3]);}}function tI(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n]);}function Mc(e,t,n){jo$3(t);try{let r=e.viewQuery;r!==null&&xa$1(1,r,n);let o=e.template;o!==null&&np(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Pe$4]?.finishViewCreation(e),e.staticContentQueries&&vf(e,t),e.staticViewQueries&&xa$1(2,e.viewQuery,n);let i=e.components;i!==null&&nI(t,i);}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=true,e.firstCreatePass=false),r}finally{t[I$4]&=-5,Vo$2();}}function nI(e,t){for(let n=0;n<t.length;n++)eI(e,t[n]);}function Sr$2(e,t,n,r){let o=v$2(null);try{let i=t.tView,a=e[I$4]&4096?4096:16,c=Dc(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=e[t.index];c[st$2]=l;let u=e[Pe$4];return u!==null&&(c[Pe$4]=u.createEmbeddedView(i)),Mc(i,c,n),c}finally{v$2(o);}}function wn$4(e,t){return !t||t.firstChild===null||cf(e)}function gr$3(e,t,n,r,o=false){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let i=t[n.index];i!==null&&r.push(ge$3(i)),he$3(i)&&ip(i,r);let s=n.type;if(s&8)gr$3(e,t,n.child,r);else if(s&32){let a=fc(n,t),c;for(;c=a();)r.push(c);}else if(s&16){let a=Kf(t,n);if(Array.isArray(a))r.push(...a);else {let c=ze$4(t[Y$3]);gr$3(c[y],c,a,r,true);}}n=o?n.projectionNext:n.next;}return r}function ip(e,t){for(let n=j$3;n<e.length;n++){let r=e[n],o=r[y].firstChild;o!==null&&gr$3(r[y],r,o,t);}e[at$3]!==e[Ie$2]&&t.push(e[at$3]);}function sp(e){if(e[Rt$5]!==null){for(let t of e[Rt$5])t.impl.addSequence(t);e[Rt$5].length=0;}}var ap=[];function rI(e){return e[oe$1]??oI(e)}function oI(e){let t=ap.pop()??Object.create(sI);return t.lView=e,t}function iI(e){e.lView[oe$1]!==e&&(e.lView=null,ap.push(e));}var sI=x$3(w$3({},Be$3),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:e=>{Pt$6(e.lView);},consumerOnSignalRead(){this.lView[oe$1]=this;}});function aI(e){let t=e[oe$1]??Object.create(cI);return t.lView=e,t}var cI=x$3(w$3({},Be$3),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:e=>{let t=ze$4(e.lView);for(;t&&!cp(t[y]);)t=ze$4(t);t&&qs$1(t);},consumerOnSignalRead(){this.lView[oe$1]=this;}});function cp(e){return e.type!==2}function lp(e){if(e[nt$2]===null)return;let t=true;for(;t;){let n=false;for(let r of e[nt$2])r.dirty&&(n=true,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));t=n&&!!(e[I$4]&8192);}}var lI=100;function up(e,t=0){let r=e[Ee$3].rendererFactory;r.begin?.();try{uI(e,t);}finally{r.end?.();}}function uI(e,t){let n=ta$1();try{Wn$3(!0),Ha$1(e,t);let r=0;for(;er$3(e);){if(r===lI)throw new b$2(103,!1);r++,Ha$1(e,1);}}finally{Wn$3(n);}}function dI(e,t,n,r){if(Ot$3(t))return;let o=t[I$4],i=false,s=false;jo$3(t);let a=true,c=null,l=null;(cp(e)?(l=rI(t),c=Ae$2(l)):co$2()===null?(a=false,l=aI(t),c=Ae$2(l)):t[oe$1]&&(We$3(t[oe$1]),t[oe$1]=null));try{Ws(t),Ou(e.bindingStartIndex),n!==null&&np(e,t,n,2,r);let u=(o&3)===3;if(!i)if(u){let f=e.preOrderCheckHooks;f!==null&&Zo$2(t,f,null);}else {let f=e.preOrderHooks;f!==null&&Yo$2(t,f,0,null),ha$2(t,0);}if(s||fI(t),lp(t),dp(t,0),e.contentQueries!==null&&vf(e,t),!i)if(u){let f=e.contentCheckHooks;f!==null&&Zo$2(t,f);}else {let f=e.contentHooks;f!==null&&Yo$2(t,f,1),ha$2(t,1);}hI(e,t);let d=e.components;d!==null&&pp(t,d,0);let p=e.viewQuery;if(p!==null&&xa$1(2,p,r),!i)if(u){let f=e.viewCheckHooks;f!==null&&Zo$2(t,f);}else {let f=e.viewHooks;f!==null&&Yo$2(t,f,2),ha$2(t,2);}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[So$3]){for(let f of t[So$3])f();t[So$3]=null;}i||(sp(t),t[I$4]&=-73);}catch(u){throw Pt$6(t),u}finally{l!==null&&(Ue$4(l,c),a&&iI(l)),Vo$2();}}function dp(e,t){for(let n=uf(e);n!==null;n=df(n))for(let r=j$3;r<n.length;r++){let o=n[r];fp(o,t);}}function fI(e){for(let t=uf(e);t!==null;t=df(t)){if(!(t[I$4]&2))continue;let n=t[kt$3];for(let r=0;r<n.length;r++){let o=n[r];qs$1(o);}}}function pI(e,t,n){k$3(x$2.ComponentStart);let r=me$3(t,e);try{fp(r,n);}finally{k$3(x$2.ComponentEnd,r[H$3]);}}function fp(e,t){Ro$3(e)&&Ha$1(e,t);}function Ha$1(e,t){let r=e[y],o=e[I$4],i=e[oe$1],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&Ct$4(i)),s||=false,i&&(i.dirty=false),e[I$4]&=-9217,s)dI(r,e,r.template,e[H$3]);else if(o&8192){let a=v$2(null);try{lp(e),dp(e,1);let c=r.components;c!==null&&pp(e,c,1),sp(e);}finally{v$2(a);}}}function pp(e,t,n){for(let r=0;r<t.length;r++)pI(e,t[r],n);}function hI(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)ct$3(~o);else {let i=o,s=n[++r],a=n[++r];Lu(s,i);let c=t[i];k$3(x$2.HostBindingsUpdateStart,c);try{a(2,c);}finally{k$3(x$2.HostBindingsUpdateEnd,c);}}}}finally{ct$3(-1);}}function Nc(e,t){let n=ta$1()?64:1088;for(e[Ee$3].changeDetectionScheduler?.notify(t);e;){e[I$4]|=n;let r=ze$4(e);if(fn$3(e)&&!r)return e;e=r;}return null}function hp(e,t,n,r){return [e,true,0,t,null,r,null,n,null,null]}function gp(e,t){let n=j$3+t;if(n<e.length)return e[n]}function xr$2(e,t,n,r=true){let o=t[y];if(gI(o,t,e,n),r){let s=Va$2(n,e),a=t[A$3],c=a.parentNode(e[at$3]);c!==null&&Mv(o,e[Q$7],a,t,c,s);}let i=t[xt$3];i!==null&&i.firstChild!==null&&(i.firstChild=null);}function mp(e,t){let n=mr$4(e,t);return n!==void 0&&Ai$3(n[y],n),n}function mr$4(e,t){if(e.length<=j$3)return;let n=j$3+t,r=e[n];if(r){let o=r[st$2];o!==null&&o!==e&&yc(o,r),t>0&&(e[n-1][fe$3]=r[fe$3]);let i=Yn$3(e,j$3+t);_v(r[y],r);let s=i[Pe$4];s!==null&&s.detachView(i[y]),r[$$2]=null,r[fe$3]=null,r[I$4]&=-129;}return r}function gI(e,t,n,r){let o=j$3+r,i=n.length;r>0&&(n[o-1][fe$3]=t),r<i-j$3?(t[fe$3]=n[o],xs$1(n,j$3+r,t)):(n.push(t),t[fe$3]=null),t[$$2]=n;let s=t[st$2];s!==null&&n!==s&&yp(s,t);let a=t[Pe$4];a!==null&&a.insertView(e),ko$3(t),t[I$4]|=128;}function yp(e,t){let n=e[kt$3],r=t[$$2];if(Ze$2(r))e[I$4]|=2;else {let o=r[$$2][Y$3];t[Y$3]!==o&&(e[I$4]|=2);}n===null?e[kt$3]=[t]:n.push(t);}var ut$4=class ut{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=false;exhaustive;get rootNodes(){let t=this._lView,n=t[y];return gr$3(n,t,n.firstChild,[])}constructor(t,n){this._lView=t,this._cdRefInjectingView=n;}get context(){return this._lView[H$3]}set context(t){this._lView[H$3]=t;}get destroyed(){return Ot$3(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[$$2];if(he$3(t)){let n=t[Xn$2],r=n?n.indexOf(this):-1;r>-1&&(mr$4(t,r),Yn$3(n,r));}this._attachedToViewContainer=false;}Ai$3(this._lView[y],this._lView);}onDestroy(t){Oo$3(this._lView,t);}markForCheck(){Nc(this._cdRefInjectingView||this._lView,4);}detach(){this._lView[I$4]&=-129;}reattach(){ko$3(this._lView),this._lView[I$4]|=128;}detectChanges(){this._lView[I$4]|=1024,up(this._lView);}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new b$2(902,false);this._attachedToViewContainer=true;}detachFromAppRef(){this._appRef=null;let t=fn$3(this._lView),n=this._lView[st$2];n!==null&&!t&&yc(n,this._lView),Qf(this._lView[y],this._lView);}attachToAppRef(t){if(this._attachedToViewContainer)throw new b$2(902,false);this._appRef=t;let n=fn$3(this._lView),r=this._lView[st$2];r!==null&&!n&&yp(r,this._lView),ko$3(this._lView);}};var yr$2=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=mI;constructor(n,r,o){this._declarationLView=n,this._declarationTContainer=r,this.elementRef=o;}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,r){return this.createEmbeddedViewImpl(n,r)}createEmbeddedViewImpl(n,r,o){let i=Sr$2(this._declarationLView,this._declarationTContainer,n,{embeddedViewInjector:r,dehydratedView:o});return new ut$4(i)}}return e})();function mI(){return Pi$4(V$1(),g$1())}function Pi$4(e,t){return e.type&4?new yr$2(t,e,Mn$3(e,t)):null}function Sn$3(e,t,n,r,o){let i=e.data[t];if(i===null)i=yI(e,t,n,r,o),Pu()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=Ru();i.injectorIndex=s===null?-1:s.injectorIndex;}return pn$3(i,true),i}function yI(e,t,n,r,o){let i=Js(),s=Xs(),a=s?i:i&&i.parent,c=e.data[t]=II(e,a,n,t,r,o);return vI(e,c,i,s),c}function vI(e,t,n,r){e.firstChild===null&&(e.firstChild=t),n!==null&&(r?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n));}function II(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return Zs()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,namespace:ia$1(),attrs:i,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function EI(e){let t=e[Vs$1]??[],r=e[$$2][A$3],o=[];for(let i of t)i.data[hf]!==void 0?o.push(i):DI(i,r);e[Vs$1]=o;}function DI(e,t){let n=0,r=e.firstChild;if(r){let o=e.data[pf];for(;n<o;){let i=r.nextSibling;Sf(t,r,false),r=i,n++;}}}var wI=()=>null,TI=()=>null;function ui$1(e,t){return wI()}function vp(e,t,n){return TI()}var Ip=class{},vr$3=class vr{},CI=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>bI()}return e})();function bI(){let e=g$1(),t=V$1(),n=me$3(t.index,e);return (Ze$2(n)?n:e)[A$3]}var Ep=(()=>{class e{static \u0275prov=re$3({token:e,providedIn:"root",factory:()=>null})}return e})();function Dp(e){return e.debugInfo?.className||e.type.name||null}var Jo$2={},di$1=class di{injector;parentInjector;constructor(t,n){this.injector=t,this.parentInjector=n;}get(t,n,r){let o=this.injector.get(t,Jo$2,r);return o!==Jo$2||n===Jo$2?o:this.parentInjector.get(t,n,r)}};function Sc(e,t,n){return e[t]=n}function _I(e,t){return e[t]}function se$2(e,t,n){if(n===q$4)return  false;let r=e[t];return Object.is(r,n)?false:(e[t]=n,true)}function fi$3(e,t,n,r){let o=se$2(e,t,n);return se$2(e,t+1,r)||o}function MI(e,t,n,r,o,i){let s=fi$3(e,t,n,r);return fi$3(e,t+2,o,i)||s}function Ht$3(e,t,n){return function r(o){let i=r.__ngNativeEl__;i!==void 0&&cy(o,i);let s=Ye$3(e)?me$3(e.index,t):t;Nc(s,5);let a=t[H$3],c=bd(t,a,n,o),l=r.__ngNextListenerFn__;for(;l;)c=bd(t,a,l,o)&&c,l=l.__ngNextListenerFn__;return c}}function bd(e,t,n,r){let o=v$2(null);try{return k$3(x$2.OutputStart,t,n),n(r)!==!1}catch(i){return Jv(e,i),false}finally{k$3(x$2.OutputEnd,t,n),v$2(o);}}function xc(e,t,n,r,o,i,s,a){let c=dn$3(e),l=false,u=null;if(!r&&c&&(u=SI(t,n,i,e.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,l=true;}else {let d=ee$4(e,n),p=r?r(d):d;r||(a.__ngNativeEl__=d);let f=o.listen(p,i,a);if(!NI(i)){let h=r?m=>r(ge$3(m[e.index])):e.index;wp(h,t,n,i,a,f,false);}}return l}function NI(e){return e.startsWith("animation")||e.startsWith("transition")}function SI(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[ln$3],c=o[i+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(i+=2);}return null}function wp(e,t,n,r,o,i,s){let a=t.firstCreatePass?zs(t):null,c=Gs(n),l=c.length;c.push(o,i),a&&a.push(r,e,l,(l+1)*(s?-1:1));}function _d(e,t,n,r,o){let i=null,s=null,a=null,c=false,l=e.directiveToIndex.get(n.type);if(typeof l=="number"?i=l:[i,s,a]=l,s!==null&&a!==null&&e.hostDirectiveOutputs?.hasOwnProperty(r)){let u=e.hostDirectiveOutputs[r];for(let d=0;d<u.length;d+=2){let p=u[d];if(p>=s&&p<=a)c=true,pi$1(e,t,p,u[d+1],r,o);else if(p>a)break}}return n.outputs.hasOwnProperty(r)&&(c=true,pi$1(e,t,i,r,r,o)),c}function pi$1(e,t,n,r,o,i){let s=t[n],a=t[y],l=a.data[n].outputs[r],d=s[l].subscribe(i);wp(e.index,a,t,o,i,d,true);}function xI(){AI();}function AI(){let e=g$1(),t=P$1(),n=V$1();if(t.firstCreatePass&&OI(t,n),n.controlDirectiveIndex===-1)return;_e$3("NgSignalForms");let r=e[n.controlDirectiveIndex];t.data[n.controlDirectiveIndex].controlDef.create(r,new hi$2(e,t,n));}function RI(){kI();}function kI(){let e=g$1(),t=P$1(),n=hn$3();if(n.controlDirectiveIndex===-1)return;let r=t.data[n.controlDirectiveIndex].controlDef,o=e[n.controlDirectiveIndex];r.update(o,new hi$2(e,t,n));}var hi$2=class hi{lView;tView;tNode;hasPassThrough;constructor(t,n,r){this.lView=t,this.tView=n,this.tNode=r,this.hasPassThrough=!!(r.flags&4096);}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return ee$4(this.tNode,this.lView)}get descriptor(){return `<${this.tNode.value}>`}listenToCustomControlOutput(t,n){let r=this.tView.data[this.tNode.customControlIndex];_d(this.tNode,this.lView,r,t,Ht$3(this.tNode,this.lView,n));}listenToCustomControlModel(t){let n=this.tNode.flags&1024?"valueChange":"checkedChange",r=this.tView.data[this.tNode.customControlIndex];_d(this.tNode,this.lView,r,n,Ht$3(this.tNode,this.lView,t));}listenToDom(t,n){xc(this.tNode,this.tView,this.lView,void 0,this.lView[A$3],t,n,Ht$3(this.tNode,this.lView,n));}setInputOnDirectives(t,n){let r=this.tNode.inputs?.[t],o=this.tNode.hostDirectiveInputs?.[t];if(!r&&!o)return  false;let i=false;if(r)for(let s of r){if(s===this.tNode.controlDirectiveIndex)continue;let a=this.tView.data[s],c=this.lView[s];Wt$3(a,c,t,n),i=true;}if(o)for(let s=0;s<o.length;s+=2){let a=o[s];if(a===this.tNode.controlDirectiveIndex)continue;let c=o[s+1],l=this.tView.data[a],u=this.lView[a];Wt$3(l,u,c,n),i=true;}return i}setCustomControlModelInput(t){let n=this.tView.data[this.tNode.customControlIndex],r=this.tNode.flags&1024?"value":"checked";Xv(this.tNode,this.tView,this.lView,n,r,t);}customControlHasInput(t){if(this.tNode.customControlIndex===-1)return  false;let n=this.tView.data[this.tNode.customControlIndex];return (n.signalFormsInputPresence??=this._buildCustomControlInputCache(n))[t]===true}_buildCustomControlInputCache(t){let n={};for(let r in t.inputs)n[r]=true;if(t.hostDirectives!==null){let r=[...t.hostDirectives];for(;r.length>0;){let o=r.shift();if(typeof o!="function"){for(let s in o.inputs)n[o.inputs[s]]=true;let i=Md(o.directive);i!==null&&r.push(...i);continue}for(let i of o()){if(typeof i=="function")continue;if(i.inputs)for(let a=0;a<i.inputs.length;a+=2){let c=i.inputs[a+1]||i.inputs[a];n[c]=true;}let s=Md(i.directive);s!==null&&r.push(...s);}}}return n}};function Md(e){return typeof e=="function"&&"\u0275dir"in e?e.\u0275dir.hostDirectives??null:null}function OI(e,t,n){for(let o=t.directiveStart;o<t.directiveEnd;o++)if(e.data[o].controlDef){t.controlDirectiveIndex=o;break}if(t.controlDirectiveIndex===-1)return;let r=e.data[t.controlDirectiveIndex].controlDef;if(r.passThroughInput&&(t.inputs?.[r.passThroughInput]?.length??0)>1){t.flags|=4096;return}PI(e,t);}function PI(e,t){for(let n=t.directiveStart;n<t.directiveEnd;n++){let r=e.data[n];if(!(t.directiveToIndex&&!t.directiveToIndex.has(r.type))){if(Nd(r,"value")){t.flags|=1024,t.customControlIndex=n;return}if(Nd(r,"checked")){t.flags|=2048,t.customControlIndex=n;return}}}if(t.hostDirectiveInputs!==null&&t.hostDirectiveOutputs!==null&&t.directiveToIndex!==null){let n=(r,o)=>{let i=t.hostDirectiveInputs[r],s=t.hostDirectiveOutputs[r+"Change"];if(!i||!s)return  false;for(let a=0;a<i.length;a+=2){let c=i[a];for(let l=0;l<s.length;l+=2){let u=s[l];if(c===u)for(let d of t.directiveToIndex.values()){if(!Array.isArray(d))continue;let[p,f,h]=d;if(c>=f&&c<=h)return t.flags|=o,t.customControlIndex=p,true}}}return  false};if(n("value",1024)||n("checked",2048))return}}function Nd(e,t){return LI(e,t)&&FI(e,t+"Change")}function LI(e,t){return t in e.inputs}function FI(e,t){return t in e.outputs}var Ba$2=Symbol("BINDING");var Tp=new S$1("");function gi$2(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=Io$3(o,a);else if(i==2){let c=a,l=t[++s];r=Io$3(r,c+": "+l+";");}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o;}function Ar$2(e,t=0){let n=g$1();if(n===null)return ke$5(e,t);let r=V$1();return nf(r,n,B$5(e),t)}function jI(){let e="invalid";throw new Error(e)}function Cp(e,t,n,r,o){let i=r===null?null:{"":-1},s=o(e,n);if(s!==null){let a=s,c=null,l=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(s);break}BI(e,t,n,a,i,c,l);}i!==null&&r!==null&&VI(n,r,i);}function VI(e,t,n){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new b$2(-301,false);r.push(t[o],i);}}function HI(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index);}function BI(e,t,n,r,o,i,s){let a=r.length,c=null;for(let p=0;p<a;p++){let f=r[p];c===null&&we$5(f)&&(c=f,HI(e,n,p)),_a$2(ii$2(n,t),e,f.type);}zI(n,e.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let p=0;p<a;p++){let f=r[p];f.providersResolver&&f.providersResolver(f);}let l=false,u=false,d=ep(e,t,a,null);a>0&&(n.directiveToIndex=new Map);for(let p=0;p<a;p++){let f=r[p];if(n.mergedAttrs=In$3(n.mergedAttrs,f.hostAttrs),UI(e,n,t,d,f),GI(d,f,o),s!==null&&s.has(f)){let[m,_]=s.get(f);n.directiveToIndex.set(f.type,[d,m+n.directiveStart,_+n.directiveStart]);}else (i===null||!i.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let h=f.type.prototype;!l&&(h.ngOnChanges||h.ngOnInit||h.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=true),!u&&(h.ngOnChanges||h.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=true),d++;}$I(e,n,i);}function $I(e,t,n){for(let r=t.directiveStart;r<t.directiveEnd;r++){let o=e.data[r];if(n===null||!n.has(o))Sd(0,t,o,r),Sd(1,t,o,r),Ad(t,r,false);else {let i=n.get(o);xd(0,t,i,r),xd(1,t,i,r),Ad(t,r,true);}}}function Sd(e,t,n,r){let o=e===0?n.inputs:n.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s;e===0?s=t.inputs??={}:s=t.outputs??={},s[i]??=[],s[i].push(r),bp(t,i);}}function xd(e,t,n,r){let o=e===0?n.inputs:n.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s=o[i],a;e===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,i),bp(t,s);}}function bp(e,t){t==="class"?e.flags|=8:t==="style"&&(e.flags|=16);}function Ad(e,t,n){let{attrs:r,inputs:o,hostDirectiveInputs:i}=e;if(r===null||!n&&o===null||n&&i===null||dc(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let c=r[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!n&&o.hasOwnProperty(c)){let l=o[c];for(let u of l)if(u===t){s??=[],s.push(c,r[a+1]);break}}else if(n&&i.hasOwnProperty(c)){let l=i[c];for(let u=0;u<l.length;u+=2)if(l[u]===t){s??=[],s.push(l[u+1],r[a+1]);break}}a+=2;}e.initialInputs??=[],e.initialInputs.push(s);}function UI(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=tt$2(o.type)),s=new Bt$3(i,we$5(o),Ar$2,null);e.blueprint[r]=s,n[r]=s,WI(e,t,r,ep(e,n,o.hostVars,q$4),o);}function WI(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;qI(s)!=a&&s.push(a),s.push(n,r,i);}}function qI(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function GI(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;we$5(t)&&(n[""]=e);}}function zI(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t;}function Ac(e,t,n,r,o,i,s,a){let c=t[y],l=c.consts,u=ie$1(l,s),d=Sn$3(c,e,n,r,u);return Cp(c,t,d,ie$1(l,a),o),d.mergedAttrs=In$3(d.mergedAttrs,d.attrs),d.attrs!==null&&gi$2(d,d.attrs,false),d.mergedAttrs!==null&&gi$2(d,d.mergedAttrs,true),c.queries!==null&&c.queries.elementStart(c,d),d}function Rc(e,t){zd(e,t),Hs(t)&&e.queries.elementEnd(t);}function QI(e,t,n,r,o,i){let s=t.consts,a=ie$1(s,o),c=Sn$3(t,e,n,r,a);if(c.mergedAttrs=In$3(c.mergedAttrs,c.attrs),i!=null){let l=ie$1(s,i);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1);}return c.attrs!==null&&gi$2(c,c.attrs,false),c.mergedAttrs!==null&&gi$2(c,c.mergedAttrs,true),t.queries!==null&&t.queries.elementStart(t,c),c}var _p=typeof ShadowRoot<"u",ZI=typeof Document<"u";function YI(e){return Object.keys(e).map(t=>{let[n,r,o]=e[t],i={propName:n,templateName:t,isSignal:(r&ki$4.SignalBased)!==0};return o&&(i.transform=o),i})}function KI(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function JI(e,t,n){let r=t instanceof ce$3?t:t?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new di$1(n,r):n}function XI(e){let t=e.get(vr$3,null);if(t===null)throw new b$2(407,false);let n=e.get(Ep,null),r=e.get(Oe$4,null),o=e.get(Gt$3,null,{optional:true});return {rendererFactory:t,sanitizer:n,changeDetectionScheduler:r,ngReflect:false,tracingService:o}}function eE(e,t){let n=Mp(e);return Mf(t,n,n==="svg"?Bs:n==="math"?wu:null)}function Mp(e){return (e.selectors[0][0]||"div").toLowerCase()}var Tn$3=class Tn{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=YI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=KI(this.componentDef.outputs),this.cachedOutputs}constructor(t,n){this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=iv(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!n;}create(t,n,r,o,i,s){k$3(x$2.DynamicComponentStart);let a=v$2(null);try{let c=this.componentDef,l=JI(c,o||this.ngModule,t),u=XI(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(Dp(c),()=>this.createComponentRef(u,l,n,r,i,s)):this.createComponentRef(u,l,n,r,i,s)}finally{v$2(a);}}createComponentRef(t,n,r,o,i,s){let a=this.componentDef,c=tE(o,a,s,i),l=t.rendererFactory.createRenderer(null,a),u=o?Bv(l,o,a.encapsulation,n):eE(a,l),d=n.get(Tp,null),p=nE(u,()=>n.get(ir$3,null)??ac());d&&d.addHost(p);let f=s?.some(Rd)||i?.some(_=>typeof _!="function"&&_.bindings.some(Rd)),h=Dc(null,c,null,512|Xf(a),null,null,t,l,n,null,yf(u,n,true));d&&_p&&p instanceof ShadowRoot&&Oo$3(h,()=>{d.removeHost(p);}),h[L$3]=u,jo$3(h);let m=null;try{let _=Ac(L$3,h,2,"#host",()=>c.directiveRegistry,!0,0);xf(l,u,_),En$2(u,h),Oi$2(c,h,_),cc(c,_,h),Rc(c,_),r!==void 0&&oE(_,this.ngContentSelectors,r),m=me$3(_.index,h),h[H$3]=m[H$3],Mc(c,h,null);}catch(_){throw m!==null&&Na$3(m),Na$3(h),_}finally{k$3(x$2.DynamicComponentEnd),Vo$2();}return new mi$1(this.componentType,h,!!f)}};function tE(e,t,n,r){let o=e?["ng-version","22.0.4"]:sv(t.selectors[0]),i=null,s=null,a=0;if(n)for(let u of n)a+=u[Ba$2].requiredVars,u.create&&(u.targetIdx=0,(i??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let p of d.bindings){a+=p[Ba$2].requiredVars;let f=u+1;p.create&&(p.targetIdx=f,(i??=[]).push(p)),p.update&&(p.targetIdx=f,(s??=[]).push(p));}}let c=[t];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,p=wo$3(d);c.push(p);}return Ec(0,null,rE(i,s),1,a,c,null,null,null,[o],null)}function nE(e,t){let n=e.getRootNode?.();return ZI&&n instanceof Document?n.head:n&&_p&&n instanceof ShadowRoot?n:t().head}function rE(e,t){return !e&&!t?null:n=>{if(n&1&&e)for(let r of e)r.create();if(n&2&&t)for(let r of t)r.update();}}function Rd(e){let t=e[Ba$2].kind;return t==="input"||t==="twoWay"}var mi$1=class mi extends Ip{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,n,r){super(),this._rootLView=n,this._hasInputBindings=r,this._tNode=xo$3(n[y],L$3),this.location=Mn$3(this._tNode,n),this.instance=me$3(this._tNode.index,n)[H$3],this.hostView=this.changeDetectorRef=new ut$4(n,void 0),this.componentType=t;}setInput(t,n){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let o=this._rootLView;_c(r,o[y],o,t,n);this.previousInputValues.set(t,n);let s=me$3(r.index,o);Nc(s,1);}get injector(){return new lt$3(this._tNode,this._rootLView)}destroy(){this.hostView.destroy();}onDestroy(t){this.hostView.onDestroy(t);}};function oE(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null&&i.length?Array.from(i):null);}}var Li$3=(()=>{class e{static __NG_ELEMENT_ID__=iE}return e})();function iE(){let e=V$1();return Np(e,g$1())}var $a$1=class e extends Li$3{_lContainer;_hostTNode;_hostLView;constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r;}get element(){return Mn$3(this._hostTNode,this._hostLView)}get injector(){return new lt$3(this._hostTNode,this._hostLView)}get parentInjector(){let t=ic(this._hostTNode,this._hostLView);if(Yd(t)){let n=ri$2(t,this._hostLView),r=ni$2(t),o=n[y].data[r+8];return new lt$3(o,n)}else return new lt$3(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1);}get(t){let n=kd(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-j$3}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=ui$1(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,wn$4(this._hostTNode,s)),a}createComponent(t,n,r,o,i,s,a){let c,l=n||{};c=l.index,r=l.injector,o=l.projectableNodes,i=l.environmentInjector||l.ngModuleRef,s=l.directives,a=l.bindings;let u=new Tn$3(rt$2(t)),d=r||this.parentInjector;if(!i&&u.ngModule==null){let M=this.parentInjector.get(ce$3,null);M&&(i=M);}let p=rt$2(u.componentType??{}),f=ui$1(this._lContainer,p?.id??null),h=null,m=u.create(d,o,h,i,s,a);return this.insertImpl(m.hostView,c,wn$4(this._hostTNode,f)),m}insert(t,n){return this.insertImpl(t,n,true)}insertImpl(t,n,r){let o=t._lView;if(Cu$1(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else {let c=o[$$2],l=new e(c,c[Q$7],c[$$2]);l.detach(l.indexOf(t));}}let i=this._adjustIndex(n),s=this._lContainer;return xr$2(s,o,i,r),t.attachToViewContainerRef(),xs$1(ya$2(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=kd(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=mr$4(this._lContainer,n);r&&(Yn$3(ya$2(this._lContainer),n),Ai$3(r[y],r));}detach(t){let n=this._adjustIndex(t,-1),r=mr$4(this._lContainer,n);return r&&Yn$3(ya$2(this._lContainer),n)!=null?new ut$4(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function kd(e){return e[Xn$2]}function ya$2(e){return e[Xn$2]||(e[Xn$2]=[])}function Np(e,t){let n,r=t[e.index];return he$3(r)?n=r:(n=hp(r,t,null,e),t[e.index]=n,wc(t,n)),aE(n,t,e,r),new $a$1(n,e,t)}function sE(e,t){let n=e[A$3],r=n.createComment(""),o=ee$4(t,e),i=n.parentNode(o);return ai$1(n,i,r,n.nextSibling(o),false),r}var aE=uE;function uE(e,t,n,r){if(e[at$3])return;let o;n.type&8?o=ge$3(r):o=sE(t,n),e[at$3]=o;}var Ua$2=class e{queryList;matches=null;constructor(t){this.queryList=t;}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty();}},Wa$2=class e{queries;constructor(t=[]){this.queries=t;}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone());}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t);}detachView(t){this.dirtyQueriesWithMatches(t);}finishViewCreation(t){this.dirtyQueriesWithMatches(t);}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)Oc(t,n).matches!==null&&this.queries[n].setDirty();}},yi$2=class yi{flags;read;predicate;constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=gE(t):this.predicate=t;}},qa$1=class e{queries;constructor(t=[]){this.queries=t;}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n);}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t);}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i]);}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n);}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t);}},Ga$2=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=false;_declarationNodeIndex;_appliesToNextNode=true;constructor(t,n=-1){this.metadata=t,this._declarationNodeIndex=n;}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n);}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=false);}template(t,n){this.elementStart(t,n);}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=true,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,dE(n,i)),this.matchTNodeWithReadOption(t,n,Ko$2(n,t,i,false,false));}else r===yr$2?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,Ko$2(n,t,r,false,false));}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===Tr$2||o===Li$3||o===yr$2&&n.type&4)this.addMatch(n.index,-2);else {let i=Ko$2(n,t,o,false,false);i!==null&&this.addMatch(n.index,i);}else this.addMatch(n.index,r);}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n);}};function dE(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function fE(e,t){return e.type&11?Mn$3(e,t):e.type&4?Pi$4(e,t):null}function pE(e,t,n,r){return n===-1?fE(t,e):n===-2?hE(e,t,r):dr$4(e,e[y],n,t)}function hE(e,t,n){if(n===Tr$2)return Mn$3(t,e);if(n===yr$2)return Pi$4(t,e);if(n===Li$3)return Np(t,e)}function Sp(e,t,n,r){let o=t[Pe$4].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else {let u=i[l];a.push(pE(t,u,s[c+1],n.metadata.read));}}o.matches=a;}return o.matches}function za$2(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=Sp(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else {let l=i[a+1],u=t[-c];for(let d=j$3;d<u.length;d++){let p=u[d];p[st$2]===p[$$2]&&za$2(p[y],p,l,r);}if(u[kt$3]!==null){let d=u[kt$3];for(let p=0;p<d.length;p++){let f=d[p];za$2(f[y],f,l,r);}}}}}return r}function kc(e,t){return e[Pe$4].queries[t].queryList}function xp(e,t,n){let r=new si$1((n&4)===4);return Mu(e,t,r,r.destroy),(t[Pe$4]??=new Wa$2).queries.push(new Ua$2(r))-1}function Ap(e,t,n){let r=P$1();return r.firstCreatePass&&(kp(r,new yi$2(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=true)),xp(r,g$1(),t)}function Rp(e,t,n,r){let o=P$1();if(o.firstCreatePass){let i=V$1();kp(o,new yi$2(t,n,r),i.index),mE(o,e),(n&2)===2&&(o.staticContentQueries=true);}return xp(o,g$1(),n)}function gE(e){return e.split(",").map(t=>t.trim())}function kp(e,t,n){e.queries===null&&(e.queries=new qa$1),e.queries.track(new Ga$2(t,n));}function mE(e,t){let n=e.contentQueries||(e.contentQueries=[]),r=n.length?n[n.length-1]:-1;t!==r&&n.push(e.queries.length-1,t);}function Oc(e,t){return e.queries.getByIndex(t)}function Op(e,t){let n=e[y],r=Oc(n,t);return r.crossesNgTemplate?za$2(n,e,t,[]):Sp(n,e,r,t)}function Pp(e,t,n){let r,o=Hn$3(()=>{r._dirtyCounter();let i=yE(r,e);if(t&&i===void 0)throw new b$2(-951,false);return i});return r=o[F$2],r._dirtyCounter=Fe$3(0),r._flatValue=void 0,o}function Pc(e){return Pp(true,false)}function Lc(e){return Pp(true,true)}function Lp(e,t){let n=e[F$2];n._lView=g$1(),n._queryIndex=t,n._queryList=kc(n._lView,t),n._queryList.onDirty(()=>n._dirtyCounter.update(r=>r+1));}function yE(e,t){let n=e._lView,r=e._queryIndex;if(n===void 0||r===void 0||n[I$4]&4)return t?void 0:z$1;let o=kc(n,r),i=Op(n,r);return o.reset(i,af),t?o.first:o._changesDetected||e._flatValue===void 0?e._flatValue=o.toArray():e._flatValue}function Fc(e){return !!e&&typeof e.then=="function"}function Fp(e){return !!e&&typeof e.subscribe=="function"}var Cn$4=class Cn{},jp=class{};var vi$1=class vi extends Cn$4{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];constructor(t,n,r,o=true){super(),this.ngModuleType=t,this._parent=n;let i=au(t);this._bootstrapComponents=Qy(i.bootstrap),this._r3Injector=aa$1(t,n,[{provide:Cn$4,useValue:this},...r],Qn$3(t),new Set(["environment"])),o&&this.resolveInjectorInitializers();}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType);}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null;}onDestroy(t){this.destroyCbs.push(t);}},Ii$4=class Ii extends jp{moduleType;constructor(t){super(),this.moduleType=t;}create(t){return new vi$1(this.moduleType,t,[])}};var Ir$2=class Ir extends Cn$4{injector;instance=null;constructor(t){super();let n=new Nt$4([...t.providers,{provide:Cn$4,useValue:this}],t.parent||cn$2(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers();}destroy(){this.injector.destroy();}onDestroy(t){this.injector.onDestroy(t);}};function Vp(e,t,n=null){return new Ir$2({providers:e,parent:t,debugName:n,runEnvironmentInitializers:true}).injector}var vE=(()=>{class e{_injector;cachedInjectors=new Map;constructor(n){this._injector=n;}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let r=ks$1(false,n.type),o=r.length>0?Vp([r],this._injector,""):null;this.cachedInjectors.set(n,o);}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy();}finally{this.cachedInjectors.clear();}}static \u0275prov=re$3({token:e,providedIn:"environment",factory:()=>new e(ke$5(ce$3))})}return e})();function IE(e){return Dr$2(()=>{let t=Hp(e),n=x$3(w$3({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==sc.Eager,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?o=>o.get(vE).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??false,data:e.data||{},encapsulation:e.encapsulation||$t$2.Emulated,styles:e.styles||z$1,_:null,schemas:e.schemas||null,tView:null,id:""});t.standalone&&_e$3("NgStandalone"),Bp(n);let r=e.dependencies;return n.directiveDefs=Od(r,EE),n.pipeDefs=Od(r,cu),n.id=_E(n),n})}function EE(e){return rt$2(e)||wo$3(e)}function DE(e){return Dr$2(()=>({type:e.type,bootstrap:e.bootstrap||z$1,declarations:e.declarations||z$1,imports:e.imports||z$1,exports:e.exports||z$1,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function wE(e,t){if(e==null)return ot$3;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a,c;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i,c=o[3]||null):(i=o,s=o,a=ki$4.None,c=null),n[i]=[r,a,c],t[i]=s;}return n}function TE(e){if(e==null)return ot$3;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function CE(e){return Dr$2(()=>{let t=Hp(e);return Bp(t),t})}function bE(e){return {type:e.type,name:e.name,factory:null,pure:e.pure!==false,standalone:e.standalone??true,onDestroy:e.type.prototype.ngOnDestroy||null}}function Hp(e){let t={};return {type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||ot$3,exportAs:e.exportAs||null,standalone:e.standalone??true,signals:e.signals===true,selectors:e.selectors||z$1,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:wE(e.inputs,t),outputs:TE(e.outputs),debugInfo:null}}function Bp(e){e.features?.forEach(t=>t(e));}function Od(e,t){return e?()=>{let n=typeof e=="function"?e():e,r=[];for(let o of n){let i=t(o);i!==null&&r.push(i);}return r}:null}function _E(e){let t=0,n=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let i of r.join("|"))t=Math.imul(31,t)+i.charCodeAt(0)<<0;return t+=2147483648,"c"+t}var $p=new S$1("");var jc=(()=>{class e{resolve;reject;initialized=false;done=false;donePromise=new Promise((n,r)=>{this.resolve=n,this.reject=r;});appInits=T$3($p,{optional:true})??[];injector=T$3(le$2);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let o of this.appInits){let i=No$3(this.injector,o);if(Fc(i))n.push(i);else if(Fp(i)){let s=new Promise((a,c)=>{i.subscribe({complete:a,error:c});});n.push(s);}}let r=()=>{this.done=true,this.resolve();};Promise.all(n).then(()=>{r();}).catch(o=>{this.reject(o);}),n.length===0&&r(),this.initialized=true;}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function ME(e){return t=>{t.controlDef={create:(n,r)=>{n?.\u0275ngControlCreate(r);},update:(n,r)=>{n?.\u0275ngControlUpdate?.(r);},passThroughInput:e};}}function NE(e){let t=n=>{let r=Array.isArray(e);n.hostDirectives===null?(n.resolveHostDirectives=SE,n.hostDirectives=r?e.map(Qa$2):[e]):r?n.hostDirectives.unshift(...e.map(Qa$2)):n.hostDirectives.unshift(e);};return t.ngInherit=true,t}function SE(e){let t=[],n=false,r=null,o=null;for(let i=0;i<e.length;i++){let s=e[i];if(s.hostDirectives!==null){let a=t.length;r??=new Map,o??=new Map,Up(s,t,r,e),o.set(s,[a,t.length-1]);}i===0&&we$5(s)&&(n=true,t.push(s));}for(let i=n?1:0;i<e.length;i++)t.push(e[i]);return r!==null&&r.forEach((i,s)=>{xE(s.declaredInputs,i.inputs);}),[t,r,o]}function Up(e,t,n,r){if(e.hostDirectives!==null)for(let o of e.hostDirectives)if(typeof o=="function"){let i=o();for(let s of i)Pd(Qa$2(s),t,n,r);}else Pd(o,t,n,r);}function Pd(e,t,n,r){let o=wo$3(e.directive);if(Up(o,t,n,r),n.has(o)){let i=n.get(o);Ld$1(i,e.inputs,"input"),Ld$1(i,e.outputs,"output");}else r.includes(o)||(n.set(o,e),t.push(o));}function Ld$1(e,t,n){let r=n==="input"?e.inputs:e.outputs;Object.keys(t).forEach(o=>{let i=t[o];(!r.hasOwnProperty(o)||r[o]===i)&&(r[o]=i);});}function Qa$2(e){return typeof e=="function"?{directive:B$5(e),inputs:{},outputs:{}}:{directive:B$5(e.directive),inputs:Fd(e.inputs),outputs:Fd(e.outputs)}}function Fd(e){let t={};if(e!==void 0&&e.length>0)for(let n=0;n<e.length;n+=2)t[e[n]]=e[n+1];return t}function xE(e,t){for(let n in t)if(t.hasOwnProperty(n)){let r=t[n],o=e[n];e[r]=o;}}function AE(e){return Object.getPrototypeOf(e.prototype).constructor}function Wp(e){let t=AE(e.type),n=true,r=[e];for(;t;){let o;if(we$5(e))o=t.\u0275cmp||t.\u0275dir;else {if(t.\u0275cmp)throw new b$2(903,false);o=t.\u0275dir;}if(o){if(n){r.push(o);let s=e;s.inputs=va$2(e.inputs),s.declaredInputs=va$2(e.declaredInputs),s.outputs=va$2(e.outputs);let a=o.hostBindings;a&&LE(e,a);let c=o.viewQuery,l=o.contentQueries;if(c&&OE(e,c),l&&PE(e,l),RE(e,o),iu$1(e.outputs,o.outputs),we$5(o)&&o.data.animation){let u=e.data;u.animation=(u.animation||[]).concat(o.data.animation);}}let i=o.features;if(i)for(let s=0;s<i.length;s++){let a=i[s];a&&a.ngInherit&&a(e),a===Wp&&(n=false);}}t=Object.getPrototypeOf(t);}kE(r);}function RE(e,t){for(let n in t.inputs){if(!t.inputs.hasOwnProperty(n)||e.inputs.hasOwnProperty(n))continue;let r=t.inputs[n];r!==void 0&&(e.inputs[n]=r,e.declaredInputs[n]=t.declaredInputs[n]);}}function kE(e){let t=0,n=null;for(let r=e.length-1;r>=0;r--){let o=e[r];o.hostVars=t+=o.hostVars,o.hostAttrs=In$3(o.hostAttrs,n=In$3(n,o.hostAttrs));}}function va$2(e){return e===ot$3?{}:e===z$1?[]:e}function OE(e,t){let n=e.viewQuery;n?e.viewQuery=(r,o)=>{t(r,o),n(r,o);}:e.viewQuery=t;}function PE(e,t){let n=e.contentQueries;n?e.contentQueries=(r,o,i)=>{t(r,o,i),n(r,o,i);}:e.contentQueries=t;}function LE(e,t){let n=e.hostBindings;n?e.hostBindings=(r,o)=>{t(r,o),n(r,o);}:e.hostBindings=t;}function qp(e,t,n,r,o,i,s,a){if(n.firstCreatePass){e.mergedAttrs=In$3(e.mergedAttrs,e.attrs);let u=e.tView=Ec(2,e,o,i,s,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),u.queries=n.queries.embeddedTView(e));}a&&(e.flags|=a),pn$3(e,false);let c=jE(n,t);Ho$3()&&vc(n,t,c,e),En$2(c,t);let l=hp(c,t,c,e);t[r+L$3]=l,wc(t,l);}function FE(e,t,n,r,o,i,s,a,c,l,u){let d=n+L$3,p;return t.firstCreatePass?(p=Sn$3(t,d,4,s||null,a||null),Cp(t,e,p,ie$1(t.consts,l),Tc),zd(t,p)):p=t.data[d],qp(p,e,t,n,r,o,i,c),dn$3(p)&&Oi$2(t,e,p),l!=null&&Nr$2(e,p,u),p}function bn$4(e,t,n,r,o,i,s,a,c,l,u){let d=n+L$3,p;if(t.firstCreatePass){if(p=Sn$3(t,d,4,s||null,a||null),l!=null){let f=ie$1(t.consts,l);p.localNames=[];for(let h=0;h<f.length;h+=2)p.localNames.push(f[h],-1);}}else p=t.data[d];return qp(p,e,t,n,r,o,i,c),l!=null&&Nr$2(e,p,u),p}function Gp(e,t,n,r,o,i,s,a){let c=g$1(),l=P$1(),u=ie$1(l.consts,i);return FE(c,l,e,t,n,r,o,u,void 0,s,a),Gp}function zp(e,t,n,r,o,i,s,a){let c=g$1(),l=P$1(),u=ie$1(l.consts,i);return bn$4(c,l,e,t,n,r,o,u,void 0,s,a),zp}var jE=VE;function VE(e,t,n,r){return or$3(true),t[A$3].createComment("")}var HE=(()=>{class e{log(n){console.log(n);}warn(n){console.warn(n);}static \u0275fac=function(r){return new(r||e)};static \u0275prov=re$3({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var Qp=new S$1("");var Zp=new S$1("");function Yp(){os$2(()=>{let e="";throw new b$2(600,e)});}var BE=10;var Fi$3=(()=>{class e{_runningTick=false;_destroyed=false;_destroyListeners=[];_views=[];internalErrorHandler=T$3(Ft$4);afterRenderManager=T$3(Si$1);zonelessEnabled=T$3(sr$3);rootEffectScheduler=T$3($o$3);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=false;afterTick=new ne$2;get allViews(){return [...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=T$3(Lt$4);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Me$3(n=>!n))}constructor(){T$3(Gt$3,{optional:true});}whenStable(){let n;return new Promise(r=>{n=this.isStable.subscribe({next:o=>{o&&r();}});}).finally(()=>{n.unsubscribe();})}_injector=T$3(ce$3);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,r){return this.bootstrapImpl(n,r)}bootstrapImpl(n,r,o=le$2.NULL){return this._injector.get(ue$1).run(()=>{if(k$3(x$2.BootstrapComponentStart),!this._injector.get(jc).done){let M="";throw new b$2(405,M)}let a=rt$2(n),c=this._injector.get(Cn$4),l=new Tn$3(a,c);this.componentTypes.push(n);let{hostElement:u,directives:d,bindings:p}=$E(r),f=u||l.selector,h=l.create(o,[],f,c.injector,d,p),m=h.location.nativeElement,_=h.injector.get(Qp,null);return _?.registerApplication(m),h.onDestroy(()=>{this.detachView(h.hostView),ur$4(this.components,h),_?.unregisterApplication(m);}),this._loadComponent(h),k$3(x$2.BootstrapComponentEnd,h),h})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick();}_tick(){k$3(x$2.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Ni$2.CHANGE_DETECTION,this.tickImpl):this.tickImpl();}tickImpl=()=>{if(this._runningTick)throw k$3(x$2.ChangeDetectionEnd),new b$2(101,false);let n=v$2(null);try{this._runningTick=!0,this.synchronize();}finally{this._runningTick=false,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,v$2(n),this.afterTick.next(),k$3(x$2.ChangeDetectionEnd);}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(vr$3,null,{optional:true}));let n=0;for(;this.dirtyFlags!==0&&n++<BE;){k$3(x$2.ChangeDetectionSyncStart);try{this.synchronizeOnce();}finally{k$3(x$2.ChangeDetectionSyncEnd);}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let n=false;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!r&&!er$3(o))continue;let i=r&&!this.zonelessEnabled?0:1;up(o,i),n=true;}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}n||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews();}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>er$3(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8;}attachView(n){let r=n;this._views.push(r),r.attachToAppRef(this);}detachView(n){let r=n;ur$4(this._views,r),r.detachFromAppRef();}_loadComponent(n){this.attachView(n.hostView);try{this.tick();}catch(o){this.internalErrorHandler(o);}this.components.push(n),this._injector.get(Zp,[]).forEach(o=>o(n));}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy());}finally{this._destroyed=true,this._views=[],this._destroyListeners=[];}}onDestroy(n){return this._destroyListeners.push(n),()=>ur$4(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new b$2(406,false);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy();}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function $E(e){return e===void 0||typeof e=="string"||e instanceof Element?{hostElement:e}:e}function ur$4(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1);}function Kp(e,t,n,r){let o=g$1(),i=Ke$3();if(se$2(o,i,t)){P$1();let a=hn$3();Zv(a,o,e,t,n,r);}return Kp}function Xo$2(e){if(_e$3("NgAnimateEnter"),!_r$2)return Xo$2;let t=g$1();if(Lf(t))return Xo$2;let n=V$1(),r=t[Z$3].get(ue$1);return Hf(vd(t),n,()=>UE(t,n,e,r)),Gf(t[Z$3]),zf(t[Z$3],vd(t)),Xo$2}function UE(e,t,n,r){let o=ee$4(t,e),i=e[A$3],s=Vf(n),a=[],c=false,l=d=>{if(pr$3(d)!==o)return;let p=d instanceof AnimationEvent?"animationend":"transitionend";r.runOutsideAngular(()=>{i.listen(o,p,u);});},u=d=>{pr$3(d)===o&&(hc(d,o)&&(c=true),WE(d,o,i));};if(s&&s.length>0){r.runOutsideAngular(()=>{a.push(i.listen(o,"animationstart",l)),a.push(i.listen(o,"transitionstart",l));}),lv(o,s,a);for(let d of s)i.addClass(o,d);r.runOutsideAngular(()=>{requestAnimationFrame(()=>{if(!c&&(Uf(o,Vt$4,_r$2),!Vt$4.has(o))){for(let d of s)i.removeClass(o,d);pc(o);}});});}}function WE(e,t,n){let r=Dn$2.get(t);if(!(pr$3(e)!==t||!r)&&hc(e,t)){e.stopPropagation();for(let o of r.classList)n.removeClass(t,o);pc(t);}}function ei$2(e){if(_e$3("NgAnimateLeave"),!_r$2)return ei$2;let t=g$1();if(Lf(t))return ei$2;let r=V$1(),o=t[Z$3].get(ue$1);return Hf(Mi$1(t),r,()=>qE(t,r,e,o)),Gf(t[Z$3]),ei$2}function qE(e,t,n,r){let{promise:o,resolve:i}=sa$2(),s=ee$4(t,e),a=e[A$3];Ut$3.add(e[De$4]),(Mi$1(e).get(t.index).resolvers??=[]).push(i);let c=Vf(n);return c&&c.length>0?GE(s,t,e,c,a,r):i(),{promise:o,resolve:i}}function GE(e,t,n,r,o,i){dv(e,o);let s=[],a=Mi$1(n).get(t.index)?.resolvers,c,l=false,u=d=>{if(!(pr$3(d)!==e&&d.type!=="animation-fallback")&&(d.type==="animation-fallback"||hc(d,e))){if(l=true,c&&clearTimeout(c),d.type!=="animation-fallback"&&d.stopPropagation(),Vt$4.delete(e),yd(t,e),Array.isArray(t.projection))for(let f of r)o.removeClass(e,f);Id(a,s),Ed(n,t);}};i.runOutsideAngular(()=>{s.push(o.listen(e,"animationend",u)),s.push(o.listen(e,"transitionend",u));}),jf(t,e);for(let d of r)o.addClass(e,d);i.runOutsideAngular(()=>{requestAnimationFrame(()=>{if(l)return;Uf(e,Vt$4,_r$2);let d=Vt$4.get(e);d?(c=setTimeout(()=>{u(new CustomEvent("animation-fallback"));},d.duration+50),s.push(()=>clearTimeout(c))):(yd(t,e),Id(a,s),Ed(n,t));});});}function zE(){return g$1()[Y$3][H$3]}var Za$2=class Za{destroy(t){}updateValue(t,n){}swap(t,n){let r=Math.min(t,n),o=Math.max(t,n),i=this.detach(o);if(o-r>1){let s=this.detach(r);this.attach(r,i),this.attach(o,s);}else this.attach(r,i);}move(t,n){this.attach(n,this.detach(t));}};function Ia$2(e,t,n,r,o){return e===n&&Object.is(t,r)?1:Object.is(o(e,t),o(n,r))?-1:0}function QE(e,t,n,r){let o,i,s=0,a=e.length-1;if(Array.isArray(t)){v$2(r);let l=t.length-1;for(v$2(null);s<=a&&s<=l;){let u=e.at(s),d=t[s],p=Ia$2(s,u,s,d,n);if(p!==0){p<0&&e.updateValue(s,d),s++;continue}let f=e.at(a),h=t[l],m=Ia$2(a,f,l,h,n);if(m!==0){m<0&&e.updateValue(a,h),a--,l--;continue}let _=n(s,u),M=n(a,f),ye=n(s,d);if(Object.is(ye,M)){let Bi=n(l,h);Object.is(Bi,_)?(e.swap(s,a),e.updateValue(a,h),l--,a--):e.move(a,s),e.updateValue(s,d),s++;continue}if(o??=new Ei$3,i??=Vd(e,s,a,n),Ya$2(e,o,s,ye))e.updateValue(s,d),s++,a++;else if(i.has(ye))o.set(_,e.detach(s)),a--;else {let Bi=e.create(s,t[s]);e.attach(s,Bi),s++,a++;}}for(;s<=l;)jd(e,o,n,s,t[s]),s++;}else if(t!=null){v$2(r);let l=t[Symbol.iterator]();v$2(null);let u=l.next();for(;!u.done&&s<=a;){let d=e.at(s),p=u.value,f=Ia$2(s,d,s,p,n);if(f!==0)f<0&&e.updateValue(s,p),s++,u=l.next();else {o??=new Ei$3,i??=Vd(e,s,a,n);let h=n(s,p);if(Ya$2(e,o,s,h))e.updateValue(s,p),s++,a++,u=l.next();else if(!i.has(h))e.attach(s,e.create(s,p)),s++,a++,u=l.next();else {let m=n(s,d);o.set(m,e.detach(s)),a--;}}}for(;!u.done;)jd(e,o,n,e.length,u.value),u=l.next();}for(;s<=a;)e.destroy(e.detach(a--));o?.forEach(l=>{e.destroy(l);});}function Ya$2(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),true):false}function jd(e,t,n,r,o){if(Ya$2(e,t,r,n(r,o)))e.updateValue(r,o);else {let i=e.create(r,o);e.attach(r,i);}}function Vd(e,t,n,r){let o=new Set;for(let i=t;i<=n;i++)o.add(r(i,e.at(i)));return o}var Ei$3=class Ei{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return  false;let n=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(t,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(t),true}get(t){return this.kvMap.get(t)}set(t,n){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(r);)r=o.get(r);o.set(r,n);}else this.kvMap.set(t,n);}forEach(t){for(let[n,r]of this.kvMap)if(t(r,n),this._vMap!==void 0){let o=this._vMap;for(;o.has(r);)r=o.get(r),t(r,n);}}};function ZE(e,t,n,r,o,i,s,a){_e$3("NgControlFlow");let c=g$1(),l=P$1(),u=ie$1(l.consts,i);return bn$4(c,l,e,t,n,r,o,u,256,s,a),Vc}function Vc(e,t,n,r,o,i,s,a){_e$3("NgControlFlow");let c=g$1(),l=P$1(),u=ie$1(l.consts,i);return bn$4(c,l,e,t,n,r,o,u,512,s,a),Vc}function YE(e,t){_e$3("NgControlFlow");let n=g$1(),r=Ke$3(),o=n[r]!==q$4?n[r]:-1,i=o!==-1?Di$1(n,L$3+o):void 0,s=0;if(se$2(n,r,e)){let a=v$2(null);try{if(i!==void 0&&mp(i,s),e!==-1){let c=L$3+e,l=Di$1(n,c),u=ec(n[y],c),d=vp(l,u,n),p=Sr$2(n,u,t,{dehydratedView:d});xr$2(l,p,s,wn$4(u,d));}}finally{v$2(a);}}else if(i!==void 0){let a=gp(i,s);a!==void 0&&(a[H$3]=t);}}var Ka$1=class Ka{lContainer;$implicit;$index;constructor(t,n,r){this.lContainer=t,this.$implicit=n,this.$index=r;}get $count(){return this.lContainer.length-j$3}};function KE(e,t){return t}var Ja$2=class Ja{hasEmptyBlock;trackByFn;liveCollection;constructor(t,n,r){this.hasEmptyBlock=t,this.trackByFn=n,this.liveCollection=r;}};function JE(e,t,n,r,o,i,s,a,c,l,u,d,p){_e$3("NgControlFlow");let f=g$1(),h=P$1(),m=c!==void 0,_=g$1(),M=a?s.bind(_[Y$3][H$3]):s,ye=new Ja$2(m,M);_[L$3+e]=ye,bn$4(f,h,e+1,t,n,r,o,ie$1(h.consts,i),256);}var Xa$1=class Xa extends Za$2{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=false;constructor(t,n,r){super(),this.lContainer=t,this.hostLView=n,this.templateTNode=r;}get length(){return this.lContainer.length-j$3}at(t){return this.getLView(t)[H$3].$implicit}attach(t,n){let r=n[xt$3];this.needsIndexUpdate||=t!==this.length,xr$2(this.lContainer,n,t,wn$4(this.templateTNode,r)),eD(this.lContainer,t);}detach(t){return this.needsIndexUpdate||=t!==this.length-1,tD(this.lContainer,t),nD(this.lContainer,t)}create(t,n){let r=ui$1(this.lContainer,this.templateTNode.tView.ssrId);return Sr$2(this.hostLView,this.templateTNode,new Ka$1(this.lContainer,n,t),{dehydratedView:r})}destroy(t){Ai$3(t[y],t);}updateValue(t,n){this.getLView(t)[H$3].$implicit=n;}reset(){this.needsIndexUpdate=false;}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[H$3].$index=t;}getLView(t){return rD(this.lContainer,t)}};function XE(e){let t=v$2(null),n=Te$2();try{let r=g$1(),o=r[y],i=r[n],s=n+1,a=Di$1(r,s);if(i.liveCollection===void 0){let l=ec(o,s);i.liveCollection=new Xa$1(a,r,l);}else i.liveCollection.reset();let c=i.liveCollection;if(QE(c,e,i.trackByFn,t),c.updateIndexes(),i.hasEmptyBlock){let l=Ke$3(),u=c.length===0;if(se$2(r,l,u)){let d=n+2,p=Di$1(r,d);if(u){let f=ec(o,d),h=vp(p,f,r),m=Sr$2(r,f,void 0,{dehydratedView:h});xr$2(p,m,0,wn$4(f,h));}else o.firstUpdatePass&&EI(p),mp(p,0);}}}finally{v$2(t);}}function Di$1(e,t){return e[t]}function eD(e,t){if(e.length<=j$3)return;let n=j$3+t,r=e[n],o=r?r[pe$3]:void 0;if(r&&o&&o.detachedLeaveAnimationFns&&o.detachedLeaveAnimationFns.length>0){let i=r[Z$3];Ev(i,o),Ut$3.delete(r[De$4]),o.detachedLeaveAnimationFns=void 0;}}function tD(e,t){if(e.length<=j$3)return;let n=j$3+t,r=e[n],o=r?r[pe$3]:void 0;o&&o.leave&&o.leave.size>0&&(o.detachedLeaveAnimationFns=[]);}function nD(e,t){return mr$4(e,t)}function rD(e,t){return gp(e,t)}function ec(e,t){return xo$3(e,t)}function Jp(e,t,n){let r=g$1(),o=Ke$3();if(se$2(r,o,t)){P$1();let s=hn$3();rp(s,r,e,t,r[A$3],n);}return Jp}function tc(e,t,n,r,o){_c(t,e,n,o?"class":"style",r);}function wi$1(e,t,n,r){let o=g$1(),i=o[y],s=e+L$3,a=i.firstCreatePass?Ac(s,o,2,t,Tc,Po$3(),n,r):i.data[s];if(Ye$3(a)){let c=o[Ee$3].tracingService;if(c&&c.componentCreate){let l=i.data[a.directiveStart+a.componentOffset];return c.componentCreate(Dp(l),()=>(Hd(e,t,o,a,r),wi$1))}}return Hd(e,t,o,a,r),wi$1}function Hd(e,t,n,r,o){if(Cc(r,n,e,t,th),dn$3(r)){let i=n[y];Oi$2(i,n,r),cc(i,r,n);}o!=null&&Nr$2(n,r);}function Hc(){let e=P$1(),t=V$1(),n=bc(t);return e.firstCreatePass&&Rc(e,n),Ys(n)&&Ks(),Qs$1(),n.classesWithoutHost!=null&&$m(n)&&tc(e,n,g$1(),n.classesWithoutHost,true),n.stylesWithoutHost!=null&&Um(n)&&tc(e,n,g$1(),n.stylesWithoutHost,false),Hc}function Xp(e,t,n,r){return wi$1(e,t,n,r),Hc(),Xp}function Bc(e,t,n,r){let o=g$1(),i=o[y],s=e+L$3,a=i.firstCreatePass?QI(s,i,2,t,n,r):i.data[s];return Cc(a,o,e,t,th),r!=null&&Nr$2(o,a),Bc}function $c(){let e=V$1(),t=bc(e);return Ys(t)&&Ks(),Qs$1(),$c}function eh(e,t,n,r){return Bc(e,t,n,r),$c(),eh}var th=(e,t,n,r,o)=>(or$3(true),Mf(t[A$3],r,ia$1()));function Uc(e,t,n){let r=g$1(),o=r[y],i=e+L$3,s=o.firstCreatePass?Ac(i,r,8,"ng-container",Tc,Po$3(),t,n):o.data[i];if(Cc(s,r,e,"ng-container",oD),dn$3(s)){let a=r[y];Oi$2(a,r,s),cc(a,s,r);}return n!=null&&Nr$2(r,s),Uc}function Wc(){let e=P$1(),t=V$1(),n=bc(t);return e.firstCreatePass&&Rc(e,n),Wc}function nh(e,t,n){return Uc(e,t,n),Wc(),nh}var oD=(e,t,n,r,o)=>(or$3(true),Hy(t[A$3],""));function iD(){return g$1()}function rh(e,t,n){let r=g$1(),o=Ke$3();if(se$2(r,o,t)){P$1();let s=hn$3();op(s,r,e,t,r[A$3],n);}return rh}var Rr$2="en-US";function oh(e){typeof e=="string"&&(e.toLowerCase().replace(/_/g,"-"));}function ih(e,t,n){let r=g$1(),o=P$1(),i=V$1();return ah(o,r,r[A$3],i,e,t,n),ih}function sh(e,t,n){let r=g$1(),o=P$1(),i=V$1();return (i.type&3||n)&&xc(i,o,r,n,r[A$3],e,t,Ht$3(i,r,t)),sh}function ah(e,t,n,r,o,i,s){let a=true,c=null;if((r.type&3||s)&&(c??=Ht$3(r,t,i),xc(r,e,t,s,n,o,i,c)&&(a=false)),a){let l=r.outputs?.[o],u=r.hostDirectiveOutputs?.[o];if(u&&u.length)for(let d=0;d<u.length;d+=2){let p=u[d],f=u[d+1];c??=Ht$3(r,t,i),pi$1(r,t,p,f,o,c);}if(l&&l.length)for(let d of l)c??=Ht$3(r,t,i),pi$1(r,t,d,o,o,c);}}function aD(e=1){return $u$1(e)}function cD(e,t){let n=null,r=ev(e);for(let o=0;o<t.length;o++){let i=t[o];if(i==="*"){n=o;continue}if(r===null?Of(e,i,true):rv(r,i))return o}return n}function lD(e){let t=g$1()[Y$3][Q$7];if(!t.projection){let n=e?e.length:1,r=t.projection=hu(n,null),o=r.slice(),i=t.child;for(;i!==null;){if(i.type!==128){let s=e?cD(i,e):0;s!==null&&(o[s]?o[s].projectionNext=i:r[s]=i,o[s]=i);}i=i.next;}}}function uD(e,t=0,n,r,o,i){let s=g$1(),a=P$1(),c=null;let l=Sn$3(a,L$3+e,16,null,null);l.projection===null&&(l.projection=t),ea$1();let d=!s[xt$3]||Zs();s[Y$3][Q$7].projection[l.projection]===null&&c!==null?dD(s,a,c):d&&!Ci$2(l)&&Ov(a,s,l);}function dD(e,t,n){let r=L$3+n,o=t.data[r],i=e[r],s=ui$1(i,o.tView.ssrId),a=Sr$2(e,o,void 0,{dehydratedView:s});xr$2(i,a,0,wn$4(o,s));}function ch(e,t,n,r){return Rp(e,t,n,r),ch}function lh(e,t,n){return Ap(e,t,n),lh}function fD(e){let t=g$1(),n=P$1(),r=Fo$2();rr$4(r+1);let o=Oc(n,r);if(e.dirty&&Tu(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else {let i=Op(t,r);e.reset(i,af),e.notifyOnChanges();}return  true}return  false}function pD(){return kc(g$1(),Fo$2())}function uh(e,t,n,r,o){return Lp(t,Rp(e,n,r,o)),uh}function dh(e,t,n,r){return Lp(e,Ap(t,n,r)),dh}function hD(e=1){rr$4(Fo$2()+e);}function gD(e){let t=ku();return Ao$3(t,L$3+e)}function Qo$2(e,t){return e<<17|t<<2}function qt$4(e){return e>>17&32767}function mD(e){return (e&2)==2}function yD(e,t){return e&131071|t<<17}function nc$1(e){return e|2}function _n$3(e){return (e&131068)>>2}function Ea$2(e,t){return e&-131069|t<<2}function vD(e){return (e&1)===1}function rc(e){return e|1}function ID(e,t,n,r,o,i){let s=i?t.classBindings:t.styleBindings,a=qt$4(s),c=_n$3(s);e[r]=n;let l=false,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||an$2(d,u)>0)&&(l=true);}else u=n;if(o)if(c!==0){let p=qt$4(e[a+1]);e[r+1]=Qo$2(p,a),p!==0&&(e[p+1]=Ea$2(e[p+1],r)),e[a+1]=yD(e[a+1],r);}else e[r+1]=Qo$2(a,0),a!==0&&(e[a+1]=Ea$2(e[a+1],r)),a=r;else e[r+1]=Qo$2(c,0),a===0?a=r:e[c+1]=Ea$2(e[c+1],r),c=r;l&&(e[r+1]=nc$1(e[r+1])),Bd(e,u,r,true),Bd(e,u,r,false),ED(t,u,e,r,i),s=Qo$2(a,c),i?t.classBindings=s:t.styleBindings=s;}function ED(e,t,n,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof t=="string"&&an$2(i,t)>=0&&(n[r+1]=rc(n[r+1]));}function Bd(e,t,n,r){let o=e[n+1],i=t===null,s=r?qt$4(o):_n$3(o),a=false;for(;s!==0&&(a===false||i);){let c=e[s],l=e[s+1];DD(c,t)&&(a=true,e[s+1]=r?rc(l):nc$1(l)),s=r?qt$4(l):_n$3(l);}a&&(e[n+1]=r?nc$1(o):rc(o));}function DD(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?true:Array.isArray(e)&&typeof t=="string"?an$2(e,t)>=0:false}var be$3={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function wD(e){return e.substring(be$3.key,be$3.keyEnd)}function TD(e){return CD(e),fh(e,ph(e,0,be$3.textEnd))}function fh(e,t){let n=be$3.textEnd;return n===t?-1:(t=be$3.keyEnd=bD(e,be$3.key=t,n),ph(e,t,n))}function CD(e){be$3.key=0,be$3.keyEnd=0,be$3.value=0,be$3.valueEnd=0,be$3.textEnd=e.length;}function ph(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function bD(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function hh(e,t,n){return mh(e,t,n,false),hh}function gh(e,t){return mh(e,t,null,true),gh}function _D(e){ND(OD,MD,e,true);}function MD(e,t){for(let n=TD(t);n>=0;n=fh(t,n))_o$3(e,wD(t),true);}function mh(e,t,n,r){let o=g$1(),i=P$1(),s=nr$4(2);if(i.firstUpdatePass&&vh(i,e,s,r),t!==q$4&&se$2(o,s,t)){let a=i.data[Te$2()];Ih(i,a,o,o[A$3],e,o[s+1]=LD(t,n),r,s);}}function ND(e,t,n,r){let o=P$1(),i=nr$4(2);o.firstUpdatePass&&vh(o,null,i,r);let s=g$1();if(n!==q$4&&se$2(s,i,n)){let a=o.data[Te$2()];if(Eh(a,r)&&!yh(o,i)){let c=a.classesWithoutHost;c!==null&&(n=Io$3(c,n||"")),tc(o,a,s,n,r);}else PD(o,a,s,s[A$3],s[i+1],s[i+1]=kD(e,t,n),r,i);}}function yh(e,t){return t>=e.expandoStartIndex}function vh(e,t,n,r){let o=e.data;if(o[n+1]===null){let i=o[Te$2()],s=yh(e,n);Eh(i,r)&&t===null&&!s&&(t=false),t=SD(o,i,t,r),ID(o,i,t,n,s,r);}}function SD(e,t,n,r){let o=ju$1(e),i=r?t.residualClasses:t.residualStyles;if(o===null)(r?t.classBindings:t.styleBindings)===0&&(n=Da$2(null,e,t,n,r),n=Er$2(n,t.attrs,r),i=null);else {let s=t.directiveStylingLast;if(s===-1||e[s]!==o)if(n=Da$2(o,e,t,n,r),i===null){let c=xD(e,t,r);c!==void 0&&Array.isArray(c)&&(c=Da$2(null,e,t,c[1],r),c=Er$2(c,t.attrs,r),AD(e,t,r,c));}else i=RD(e,t,r);}return i!==void 0&&(r?t.residualClasses=i:t.residualStyles=i),n}function xD(e,t,n){let r=n?t.classBindings:t.styleBindings;if(_n$3(r)!==0)return e[qt$4(r)]}function AD(e,t,n,r){let o=n?t.classBindings:t.styleBindings;e[qt$4(o)]=r;}function RD(e,t,n){let r,o=t.directiveEnd;for(let i=1+t.directiveStylingLast;i<o;i++){let s=e[i].hostAttrs;r=Er$2(r,s,n);}return Er$2(r,t.attrs,n)}function Da$2(e,t,n,r,o){let i=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(i=t[a],r=Er$2(r,i.hostAttrs,o),i!==e);)a++;return e!==null&&(n.directiveStylingLast=a),r}function Er$2(e,t,n){let r=n?1:2,o=-1;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];typeof s=="number"?o=s:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),_o$3(e,s,n?true:t[++i]));}return e===void 0?null:e}function kD(e,t,n){if(n==null||n==="")return z$1;let r=[],o=Nn$3(n);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],true);else if(o instanceof Set)for(let i of o)e(r,i,true);else if(typeof o=="object")for(let i in o)Object.hasOwn(o,i)&&e(r,i,o[i]);else typeof o=="string"&&t(r,o);return r}function OD(e,t,n){let r=String(t);r!==""&&!r.includes(" ")&&_o$3(e,r,n);}function PD(e,t,n,r,o,i,s,a){o===q$4&&(o=z$1);let c=0,l=0,u=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;u!==null||d!==null;){let p=c<o.length?o[c+1]:void 0,f=l<i.length?i[l+1]:void 0,h=null,m;u===d?(c+=2,l+=2,p!==f&&(h=d,m=f)):d===null||u!==null&&u<d?(c+=2,h=u):(l+=2,h=d,m=f),h!==null&&Ih(e,t,n,r,h,m,s,a),u=c<o.length?o[c]:null,d=l<i.length?i[l]:null;}}function Ih(e,t,n,r,o,i,s,a){if(!(t.type&3))return;let c=e.data,l=c[a+1],u=vD(l)?$d(c,t,n,o,_n$3(l),s):void 0;if(!Ti$4(u)){Ti$4(i)||mD(l)&&(i=$d(c,null,n,o,a,s));let d=$s(Te$2(),n);Lv(r,s,d,o,i);}}function $d(e,t,n,r,o,i){let s=t===null,a;for(;o>0;){let c=e[o],l=Array.isArray(c),u=l?c[1]:c,d=u===null,p=n[o+1];p===q$4&&(p=d?z$1:void 0);let f=d?Mo$2(p,r):u===r?p:void 0;if(l&&!Ti$4(f)&&(f=Mo$2(c,r)),Ti$4(f)&&(a=f,s))return a;let h=e[o+1];o=s?qt$4(h):_n$3(h);}if(t!==null){let c=i?t.residualClasses:t.residualStyles;c!=null&&(a=Mo$2(c,r));}return a}function Ti$4(e){return e!==void 0}function LD(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=Qn$3(Nn$3(e)))),e}function Eh(e,t){return (e.flags&(t?8:16))!==0}function FD(e,t=""){let n=g$1(),r=P$1(),o=e+L$3,i=r.firstCreatePass?Sn$3(r,o,1,t,null):r.data[o],s=jD(r,n,i,t);n[o]=s,Ho$3()&&vc(r,n,s,i),pn$3(i,false);}var jD=(e,t,n,r)=>(or$3(true),jy(t[A$3],r));function VD(e,t,n,r=""){return se$2(e,Ke$3(),n)?t+de$2(n)+r:q$4}function HD(e,t,n,r,o,i=""){let s=na$1(),a=fi$3(e,s,n,o);return nr$4(2),a?t+de$2(n)+r+de$2(o)+i:q$4}function BD(e,t,n,r,o,i,s,a,c,l=""){let u=na$1(),d=MI(e,u,n,o,s,c);return nr$4(4),d?t+de$2(n)+r+de$2(o)+i+de$2(s)+a+de$2(c)+l:q$4}function Dh(e){return qc("",e),Dh}function qc(e,t,n){let r=g$1(),o=VD(r,e,t,n);return o!==q$4&&Gc(r,Te$2(),o),qc}function wh(e,t,n,r,o){let i=g$1(),s=HD(i,e,t,n,r,o);return s!==q$4&&Gc(i,Te$2(),s),wh}function Th(e,t,n,r,o,i,s,a,c){let l=g$1(),u=BD(l,e,t,n,r,o,i,s,a,c);return u!==q$4&&Gc(l,Te$2(),u),Th}function Gc(e,t,n){let r=$s(t,e);Vy(e[A$3],r,n);}function Ch(e,t,n){Uo$3(t)&&(t=t());let r=g$1(),o=Ke$3();if(se$2(r,o,t)){P$1();let s=hn$3();rp(s,r,e,t,r[A$3],n);}return Ch}function $D(e,t){let n=Uo$3(e);return n&&e.set(t),n}function bh(e,t){let n=g$1(),r=P$1(),o=V$1();return ah(r,n,n[A$3],o,e,t),bh}function UD(e){return se$2(g$1(),Ke$3(),e)?de$2(e):q$4}function Ud(e,t,n){let r=P$1();r.firstCreatePass&&_h(t,r.data,r.blueprint,we$5(e),n);}function _h(e,t,n,r,o){if(e=B$5(e),Array.isArray(e))for(let i=0;i<e.length;i++)_h(e[i],t,n,r,o);else {let i=P$1(),s=g$1(),a=V$1(),c=Mt$7(e)?e:B$5(e.provide),l=Ls(e),u=a.providerIndexes&1048575,d=a.directiveStart,p=a.providerIndexes>>20;if(Mt$7(e)||!e.multi){let f=new Bt$3(l,o,Ar$2,null),h=Ta$2(c,t,u+p,d);h===-1?(_a$2(ii$2(a,s),i,c),wa$2(i,e,t.length),t.push(c),a.directiveStart++,a.directiveEnd++,n.push(f),s.push(f)):(n[h]=f,s[h]=f);}else {let f=Ta$2(c,t,u+p,d),h=Ta$2(c,t,u,u+p),m=f>=0&&n[f],_=h>=0&&n[h];if(!m){_a$2(ii$2(a,s),i,c);let M=GD(WD,n.length,o,r,l);_&&(n[h].providerFactory=M),wa$2(i,e,t.length,0),t.push(c),a.directiveStart++,a.directiveEnd++,n.push(M),s.push(M);}else {let M=Mh(n[f],l,r);wa$2(i,e,f>-1?f:h,M);}r&&_&&n[h].componentProviders++;}}}function wa$2(e,t,n,r){let o=Mt$7(t),i=Iu(t);if(o||i){let c=(i?B$5(t.useClass):t).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!o&&t.multi){let u=l.indexOf(n);u===-1?l.push(n,[r,c]):l[u+1].push(r,c);}else l.push(n,c);}}}function Mh(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function Ta$2(e,t,n,r){for(let o=n;o<r;o++)if(t[o]===e)return o;return  -1}function WD(e,t,n,r,o){return oc(this.multi,[])}function oc(e,t){for(let n=0;n<e.length;n++){let r=e[n];t.push(r());}return t}function GD(e,t,n,r,o,i){let s=new Bt$3(e,n,Ar$2,null);return s.multi=[],s.index=t,s.componentProviders=0,Mh(s,o,r&&!n),s}function zD(e,t){return n=>{n.providersResolver=(r,o)=>Ud(r,o?o(e):e,false);}}function QD(e,t){let n=tr$3()+e,r=g$1();return r[n]===q$4?Sc(r,n,t()):_I(r,n)}function ZD(e,t,n){return Sh(g$1(),tr$3(),e,t,n)}function Nh(e,t){let n=e[t];return n===q$4?void 0:n}function Sh(e,t,n,r,o,i){let s=t+n;return se$2(e,s,o)?Sc(e,s+1,i?r.call(i,o):r(o)):Nh(e,s+1)}function YD(e,t,n,r,o,i,s){let a=t+n;return fi$3(e,a,o,i)?Sc(e,a+2,s?r.call(s,o,i):r(o,i)):Nh(e,a+2)}function KD(e,t){let n=P$1(),r,o=e+L$3;n.firstCreatePass?(r=JD(t,n.pipeRegistry),n.data[o]=r,r.onDestroy&&(n.destroyHooks??=[]).push(o,r.onDestroy)):r=n.data[o];let i=r.factory||(r.factory=tt$2(r.type)),a=J$3(Ar$2);try{let c=oi$1(!1),l=i();return oi$1(c),Us(n,g$1(),o,l),l}finally{J$3(a);}}function JD(e,t){if(t)for(let n=t.length-1;n>=0;n--){let r=t[n];if(e===r.name)return r}}function XD(e,t,n){let r=e+L$3,o=g$1(),i=Ao$3(o,r);return xh(o,r)?Sh(o,tr$3(),t,i.transform,n,i):i.transform(n)}function ew(e,t,n,r){let o=e+L$3,i=g$1(),s=Ao$3(i,o);return xh(i,o)?YD(i,tr$3(),t,s.transform,n,r,s):s.transform(n,r)}function xh(e,t){return e[y].data[t].pure}function tw(e,t){return Pi$4(e,t)}var Ah=(()=>{class e{applicationErrorHandler=T$3(Ft$4);appRef=T$3(Fi$3);taskService=T$3(Lt$4);ngZone=T$3(ue$1);zonelessEnabled=T$3(sr$3);tracing=T$3(Gt$3,{optional:true});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:true}}];subscriptions=new G$2;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(qn$3):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(T$3(fa$2,{optional:true})??false);cancelScheduledCallback=null;useMicrotaskScheduler=false;runningTick=false;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let n=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(n);return}this.switchToMicrotaskScheduler(),this.taskService.remove(n);})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup();}));}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let n=this.taskService.add();this.useMicrotaskScheduler=true,queueMicrotask(()=>{this.useMicrotaskScheduler=false,this.taskService.remove(n);});});}notify(n){if(!this.zonelessEnabled&&n===5)return;switch(n){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8;}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Qu:ca$2;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()));}shouldScheduleTick(){return !(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(qn$3+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick();},void 0,this.schedulerTickApplyArgs);}catch(r){this.applicationErrorHandler(r);}finally{this.taskService.remove(n),this.cleanup();}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup();}cleanup(){if(this.runningTick=false,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n);}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function nw(){return _e$3("NgZoneless"),Rs$1([...zc(),[]])}function zc(){return [{provide:Oe$4,useExisting:Ah},{provide:ue$1,useClass:Gn$3},{provide:sr$3,useValue:true}]}var rw=(()=>{class e{compileModuleSync(n){return new Ii$4(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function ow(){return typeof $localize<"u"&&$localize.locale||Rr$2}var Qc=new S$1("",{factory:()=>T$3(Qc,{optional:true,skipSelf:true})||ow()});var kr$2=class kr{destroyed=false;listeners=null;errorHandler=T$3(Qe$2,{optional:true});isEmitting=false;hasNullListeners=false;destroyRef=T$3(Le$3);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=true,this.listeners=null;});}subscribe(t){if(this.destroyed)throw new b$2(953,false);return (this.listeners??=[]).push(t),{unsubscribe:()=>{let n=this.listeners?this.listeners.indexOf(t):-1;n>-1&&(this.isEmitting?(this.hasNullListeners=true,this.listeners[n]=null):this.listeners.splice(n,1));}}}emit(t){if(this.destroyed){console.warn(zn$3(953,false));return}if(this.listeners===null)return;this.isEmitting=true;let n=v$2(null);try{for(let r of this.listeners)try{r!==null&&r(t);}catch(o){this.errorHandler?.handleError(o);}}finally{this.hasNullListeners&&(this.hasNullListeners=false,this.listeners&&iw(this.listeners)),v$2(n),this.isEmitting=false;}}};function iw(e){let t=e.length-1;for(;t>-1;)e[t]===null&&e.splice(t,1),t--;}var sw=new S$1("");function dt$3(e,t){return Hn$3(e,t?.equal)}function ae$2(e){return eu(e)}var Zc=class extends Error{dependency;constructor(t){super("Dependency error",{cause:t.error()}),this.name="ResourceDependencyError",this.dependency=t;}},xn$4=class e extends Error{_brand;constructor(t){super(t);}static IDLE=new e("IDLE");static LOADING=new e("LOADING")},aw=e=>e;function Yc(e,t){if(typeof e=="function"){let n=ls$2(e,aw,t?.equal);return Rh(n)}else {let n=ls$2(e.source,e.computation,e.equal);return Rh(n,e.debugName)}}function Rh(e,t){let n=e[F$2],r=e;return r.set=o=>Jl(n,o),r.update=o=>Xl(n,o),r.asReadonly=gn$3.bind(e),r}function LA(e){let t=e.request,n=e.params??t??(()=>null);return new Jc(n,lw(e),e.defaultValue,e.equal?cw(e.equal):void 0,e.debugName,e.injector??T$3(le$2),e.id)}var Kc=class{value;isLoading;constructor(t,n){this.value=t,this.value.set=this.set.bind(this),this.value.update=this.update.bind(this),this.value.asReadonly=gn$3,this.isLoading=dt$3(()=>this.status()==="loading"||this.status()==="reloading",void 0);}isError=dt$3(()=>this.status()==="error");update(t){this.set(t(ae$2(this.value)));}isValueDefined=dt$3(()=>this.isError()?false:this.value()!==void 0);_snapshot;get snapshot(){return this._snapshot??=dt$3(()=>{let t=this.status();return t==="error"?{status:"error",error:this.error()}:{status:t,value:this.value()}})}hasValue(){return this.isValueDefined()}asReadonly(){return this}},Jc=class extends Kc{loaderFn;equal;debugName;transferCacheKey;pendingTasks;state;extRequest;effectRef;pendingController;resolvePendingTask=void 0;destroyed=false;unregisterOnDestroy;status;error;transferState;constructor(t,n,r,o,i,s,a,c){if(Ph())throw Lh();super(dt$3(()=>{let u=this.state().stream?.();if(!u||this.state().status==="loading"&&this.error())return r;if(!Xc$1(u))throw new ji$2(this.error());return u.value},{equal:o}),i),this.loaderFn=n,this.equal=o,this.debugName=i,this.transferCacheKey=a;let l=s.get(sw,void 0,{optional:true})??{isActive:false};this.transferState=s.get(Bo$2,void 0,{optional:true})??void 0,this.extRequest=Yc(()=>{try{return nl(!0),{request:t(pw),reload:0}}catch(u){return rl(u),u===xn$4.IDLE?{status:"idle",reload:0}:u===xn$4.LOADING?{status:"loading",reload:0}:{error:u,reload:0}}finally{nl(false);}},void 0),this.state=Yc({source:this.extRequest,computation:(u,d)=>{let{request:p,status:f,error:h}=u,m;if(h)f="resolved",m=Fe$3({error:el(h)},void 0);else if(!f)if(d)f=p===void 0?"idle":"loading",d.value.extRequest.request===p&&(m=d.value.stream);else {let _=this.transferState,M=this.transferCacheKey;l.isActive&&M&&_&&p!==void 0&&_.hasKey(M)&&(m=Fe$3({value:_.get(M,r)},void 0)),m||(m=c?.(u.request)),c=void 0,f=p===void 0?"idle":m?"resolved":"loading";}return {extRequest:u,status:f,previousStatus:d?kh(d.value):"idle",stream:m}}}),this.effectRef=pa$2(this.loadEffect.bind(this),{injector:s,manualCleanup:true}),this.pendingTasks=s.get(Wo$2),this.unregisterOnDestroy=s.get(Le$3).onDestroy(()=>this.destroy()),this.status=dt$3(()=>kh(this.state()),void 0),this.error=dt$3(()=>{let u=this.state().stream?.();return u&&!Xc$1(u)?u.error:void 0},void 0);}set(t){if(this.destroyed)return;let n=ae$2(this.error),r=ae$2(this.state);if(!n){let o=ae$2(this.value);if(r.status==="local"&&(this.equal?this.equal(o,t):o===t))return}this.state.set({extRequest:r.extRequest,status:"local",previousStatus:"local",stream:Fe$3({value:t},void 0)}),this.abortInProgressLoad();}reload(){let{status:t}=ae$2(this.state);return t==="idle"||t==="loading"?false:(this.extRequest.update(({request:n,reload:r})=>({request:n,reload:r+1})),true)}destroy(){this.destroyed=true,this.unregisterOnDestroy(),this.effectRef.destroy(),this.abortInProgressLoad(),this.state.set({extRequest:{request:void 0,reload:0},status:"idle",previousStatus:"idle",stream:void 0});}loadEffect(){return C$4(this,null,function*(){let t=this.extRequest(),{status:n,previousStatus:r}=ae$2(this.state);if(t.request===void 0)return;if(n!=="loading")return;this.abortInProgressLoad();let o=this.resolvePendingTask=this.pendingTasks.add(),{signal:i}=this.pendingController=new AbortController;try{let s=ae$2(()=>this.loaderFn({params:t.request,abortSignal:i,previous:{status:r}})),a=()=>i.aborted||ae$2(this.extRequest)!==t;if(ar$4(s)){if(a())return;this.state.set({extRequest:t,status:"resolved",previousStatus:"resolved",stream:s});let c=ae$2(s);}else {let c=yield s;if(a())return;this.state.set({extRequest:t,status:"resolved",previousStatus:"resolved",stream:c});let l=c?ae$2(c):void 0;}}catch(s){if(rl(s),i.aborted||ae$2(this.extRequest)!==t)return;this.state.set({extRequest:t,status:"resolved",previousStatus:"error",stream:Fe$3({error:el(s)},void 0)});}finally{o?.(),o=void 0;}})}abortInProgressLoad(){ae$2(()=>this.pendingController?.abort()),this.pendingController=void 0,this.resolvePendingTask?.(),this.resolvePendingTask=void 0;}};function cw(e){return (t,n)=>t===void 0||n===void 0?t===n:e(t,n)}function lw(e){return uw(e)?e.stream:t=>C$4(null,null,function*(){try{return Fe$3({value:yield e.loader(t)},void 0)}catch(n){return Fe$3({error:el(n)},void 0)}})}function uw(e){return !!e.stream}function kh(e){switch(e.status){case "loading":return e.extRequest.reload===0?"loading":"reloading";case "resolved":return Xc$1(e.stream())?"resolved":"error";default:return e.status}}function Xc$1(e){return e.error===void 0}function el(e){return dw(e)?e:new tl(e)}function dw(e){return e instanceof Error||typeof e=="object"&&typeof e.name=="string"&&typeof e.message=="string"}var ji$2=class ji extends Error{constructor(t){super(t.message,{cause:t});}},tl=class extends Error{constructor(t){super(String(t),{cause:t});}};function fw(e){switch(e.status()){case "idle":throw xn$4.IDLE;case "error":throw new Zc(e);case "loading":case "reloading":throw xn$4.LOADING}return e.value()}var pw={chain:fw},Oh=false;function Ph(){return Oh}function nl(e){Oh=e;}function Lh(){return new b$2(992,false)}function rl(e){if(e instanceof b$2&&e.code===992)throw e}var Hi$4=Symbol("InputSignalNode#UNSET"),Uh=x$3(w$3({},Bn$3),{transformFn:void 0,applyValueToInputSignal(e,t){et$2(e,t);}});function Wh(e,t){let n=Object.create(Uh);n.value=e,n.transformFn=t?.transform;function r(){if($e$3(n),n.value===Hi$4){let o=null;throw new b$2(-950,o)}return n.value}return r[F$2]=n,r}var Fh=class{attributeName;constructor(t){this.attributeName=t;}__NG_ELEMENT_ID__=()=>sf(this.attributeName);toString(){return `HostAttributeToken ${this.attributeName}`}},bF=(()=>{let e=new S$1("");return e.__NG_ELEMENT_ID__=t=>{let n=V$1();if(n===null)throw new b$2(-204,false);if(n.type&2)return n.value;if(t&8)return null;throw new b$2(-204,false)},e})();function _F(e){return hw(e)?e.default:e}function hw(e){return e&&typeof e=="object"&&"default"in e}function MF(e){return new kr$2}function jh(e,t){return Wh(e,t)}function gw(e){return Wh(Hi$4,e)}var NF=(jh.required=gw,jh);function qh(e,t){let n=Object.create(Uh),r=new kr$2;n.value=e;function o(){return $e$3(n),Vh(n.value),n.value}return o[F$2]=n,o.asReadonly=gn$3.bind(o),o.set=i=>{n.equal(n.value,i)||(et$2(n,i),r.emit(i));},o.update=i=>{Vh(n.value),o.set(i(n.value));},o.subscribe=r.subscribe.bind(r),o.destroyRef=r.destroyRef,o}function Vh(e){if(e===Hi$4)throw new b$2(952,false)}function Hh(e,t){return qh(e)}function mw(e){return qh(Hi$4)}var SF=(Hh.required=mw,Hh);function Bh(e,t){return Pc()}function yw(e,t){return Lc()}var xF=(Bh.required=yw,Bh);function $h(e,t){return Pc()}function vw(e,t){return Lc()}var AF=($h.required=vw,$h);var kF=(()=>{class e{static __NG_ELEMENT_ID__=Ew}return e})();function Ew(e){return Dw(V$1(),g$1(),(e&16)===16)}function Dw(e,t,n){if(Ye$3(e)&&!n){let r=me$3(e.index,t);return new ut$4(r,r)}else if(e.type&175){let r=t[Y$3];return new ut$4(r,t)}return null}var il=new S$1(""),ww=new S$1("");function Or$2(e){return !e.moduleRef}function Tw(e){let t=Or$2(e)?e.r3Injector:e.moduleRef.injector,n=t.get(ue$1);return n.run(()=>{Or$2(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(Ft$4),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:r});}),Or$2(e)){let i=()=>t.destroy(),s=e.platformInjector.get(il);s.add(i),t.onDestroy(()=>{o.unsubscribe(),s.delete(i);});}else {let i=()=>e.moduleRef.destroy(),s=e.platformInjector.get(il);s.add(i),e.moduleRef.onDestroy(()=>{ur$4(e.allPlatformModules,e.moduleRef),o.unsubscribe(),s.delete(i);});}return bw(r,n,()=>{let i=t.get(Lt$4),s=i.add(),a=t.get(jc);return a.runInitializers(),a.donePromise.then(()=>{let c=t.get(Qc,Rr$2);if(oh(c||Rr$2),!t.get(ww,!0))return Or$2(e)?t.get(Fi$3):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Or$2(e)){let u=t.get(Fi$3);return e.rootComponent!==void 0&&u.bootstrap(e.rootComponent),u}else return Cw?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{i.remove(s);})})})}var Cw;function bw(e,t,n){try{let r=n();return Fc(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e(r)),r}}var Vi$3=null;function _w(e=[],t){return le$2.create({name:t,providers:[{provide:Ps$1,useValue:"platform"},{provide:il,useValue:new Set([()=>Vi$3=null])},...e]})}function Mw(e=[]){if(Vi$3)return Vi$3;let t=_w(e);return Vi$3=t,Yp(),Nw(t),t}function Nw(e){let t=e.get(Ku,null);No$3(e,()=>{t?.forEach(n=>n());});}function OF(e){let{rootComponent:t,appProviders:n,platformProviders:r,platformRef:o}=e;k$3(x$2.BootstrapApplicationStart);try{let i=o?.injector??Mw(r),s=[zc(),Yu,...n||[]],a=new Ir$2({providers:s,parent:i,debugName:"",runEnvironmentInitializers:!1});return Tw({r3Injector:a.injector,platformInjector:i,rootComponent:t})}catch(i){return Promise.reject(i)}finally{k$3(x$2.BootstrapApplicationEnd);}}function PF(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function LF(e,t=NaN){return !isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):t}var ol=Symbol("NOT_SET"),Gh=new Set,Sw=x$3(w$3({},Bn$3),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,value:ol,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=true;}this.sequence.scheduler.notify(7);},phaseFn(e){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=false,this.value!==ol&&!Ct$4(this))return this.signal;try{for(let o of this.cleanup??Gh)o();}finally{this.cleanup?.clear();}let t=[];e!==void 0&&t.push(e),t.push(this.registerCleanupFn);let n=Ae$2(this),r;try{r=this.userFn.apply(null,t);}finally{Ue$4(this,n);}return (this.value===ol||!this.equal(this.value,r))&&(this.value=r,this.version++),this.signal}}),sl=class extends hr$4{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(t,n,r,o,i,s=null){super(t,[void 0,void 0,void 0,void 0],r,false,i.get(Le$3),s),this.scheduler=o;for(let a of gc){let c=n[a];if(c===void 0)continue;let l=Object.create(Sw);l.sequence=this,l.phase=a,l.userFn=c,l.dirty=true,l.signal=()=>($e$3(l),l.value),l.signal[F$2]=l,l.registerCleanupFn=u=>(l.cleanup??=new Set).add(u),this.nodes[a]=l,this.hooks[a]=u=>l.phaseFn(u);}}afterRun(){super.afterRun(),this.lastPhase=null;}destroy(){if(this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();super.destroy();for(let t of this.nodes)if(t)try{for(let n of t.cleanup??Gh)n();}finally{We$3(t);}}};function FF(e,t){let n=t?.injector??T$3(le$2),r=n.get(Oe$4),o=n.get(Si$1),i=n.get(Gt$3,null,{optional:true});o.impl??=n.get(mc);let s=e;typeof s=="function"&&(s={mixedReadWrite:e});let a=n.get(mn$2,null,{optional:true}),c=new sl(o.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,r,n,i?.snapshot(null));return o.impl.register(c),c}function jF(e,t){let n=rt$2(e),r=t.elementInjector||cn$2();return new Tn$3(n).create(r,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}
var ln$2=null;function T$2(){return ln$2}function gt$4(n){ln$2??=n;}var de$1=class de{},q$3=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:()=>T$3(dn$2),providedIn:"platform"})}return n})();var dn$2=(()=>{class n extends q$3{_location;_history;_doc=T$3(ir$3);constructor(){super(),this._location=window.location,this._history=window.history;}getBaseHrefFromDOM(){return T$2().getBaseHref(this._doc)}onPopState(e){let t=T$2().getGlobalEventTarget(this._doc,"window");return t.addEventListener("popstate",e,false),()=>t.removeEventListener("popstate",e)}onHashChange(e){let t=T$2().getGlobalEventTarget(this._doc,"window");return t.addEventListener("hashchange",e,false),()=>t.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e;}pushState(e,t,i){this._history.pushState(e,t,i);}replaceState(e,t,i){this._history.replaceState(e,t,i);}forward(){this._history.forward();}back(){this._history.back();}historyGo(e=0){this._history.go(e);}getState(){return this._history.state}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function gn$2(n,r){return n?r?n.endsWith("/")?r.startsWith("/")?n+r.slice(1):n+r:r.startsWith("/")?n+r:`${n}/${r}`:n:r}function fn$2(n){let r=n.search(/#|\?|$/);return n[r-1]==="/"?n.slice(0,r-1)+n.slice(r):n}function I$3(n){return n&&n[0]!=="?"?`?${n}`:n}var xe$2=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:()=>T$3(Zn$2),providedIn:"root"})}return n})(),Xn$1=new S$1(""),Zn$2=(()=>{class n extends xe$2{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,t){super(),this._platformLocation=e,this._baseHref=t??this._platformLocation.getBaseHrefFromDOM()??T$3(ir$3).location?.origin??"";}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()();}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e));}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return gn$2(this._baseHref,e)}path(e=false){let t=this._platformLocation.pathname+I$3(this._platformLocation.search),i=this._platformLocation.hash;return i&&e?`${t}${i}`:t}pushState(e,t,i,s){let o=this.prepareExternalUrl(i+I$3(s));this._platformLocation.pushState(e,t,o);}replaceState(e,t,i,s){let o=this.prepareExternalUrl(i+I$3(s));this._platformLocation.replaceState(e,t,o);}forward(){this._platformLocation.forward();}back(){this._platformLocation.back();}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e);}static \u0275fac=function(t){return new(t||n)(ke$5(q$3),ke$5(Xn$1,8))};static \u0275prov=re$3({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var pn$2=(()=>{class n{_subject=new ne$2;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let t=this._locationStrategy.getBaseHref();this._basePath=Qn$2(fn$2(hn$2(t))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(true),pop:true,state:i.state,type:i.type});});}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[];}path(e=false){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,t=""){return this.path()==this.normalize(e+I$3(t))}normalize(e){return n.stripTrailingSlash(qn$2(this._basePath,hn$2(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,t="",i=null){this._locationStrategy.pushState(i,"",e,t),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+I$3(t)),i);}replaceState(e,t="",i=null){this._locationStrategy.replaceState(i,"",e,t),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+I$3(t)),i);}forward(){this._locationStrategy.forward();}back(){this._locationStrategy.back();}historyGo(e=0){this._locationStrategy.historyGo?.(e);}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(t=>{this._notifyUrlChangeListeners(t.url,t.state);}),()=>{let t=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(t,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null);}}_notifyUrlChangeListeners(e="",t){this._urlChangeListeners.forEach(i=>i(e,t));}subscribe(e,t,i){return this._subject.subscribe({next:e,error:t??void 0,complete:i??void 0})}static normalizeQueryParams=I$3;static joinWithSlash=gn$2;static stripTrailingSlash=fn$2;static \u0275fac=function(t){return new(t||n)(ke$5(xe$2))};static \u0275prov=re$3({token:n,factory:()=>Jn(),providedIn:"root"})}return n})();function Jn(){return new pn$2(ke$5(xe$2))}function qn$2(n,r){if(!n||!r.startsWith(n))return r;let e=r.substring(n.length);return e===""||["/",";","?","#"].includes(e[0])?e:r}function hn$2(n){return n.replace(/\/index\.html$/,"")}function Qn$2(n){if(new RegExp("^(https?:)?//").test(n)){let[,e]=n.split(/\/\/[^\/]+/);return e}return n}var pt$3=/\s+/,mn$1=[],nr$3=(()=>{class n{_ngEl;_renderer;initialClasses=mn$1;rawClass;stateMap=new Map;constructor(e,t){this._ngEl=e,this._renderer=t;}set klass(e){this.initialClasses=e!=null?e.trim().split(pt$3):mn$1;}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(pt$3):e;}ngDoCheck(){for(let t of this.initialClasses)this._updateState(t,true);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let t of e)this._updateState(t,true);else if(e!=null)for(let t of Object.keys(e))this._updateState(t,!!e[t]);this._applyStateDiff();}_updateState(e,t){let i=this.stateMap.get(e);i!==void 0?(i.enabled!==t&&(i.changed=true,i.enabled=t),i.touched=true):this.stateMap.set(e,{enabled:t,changed:true,touched:true});}_applyStateDiff(){for(let e of this.stateMap){let t=e[0],i=e[1];i.changed?(this._toggleClass(t,i.enabled),i.changed=false):i.touched||(i.enabled&&this._toggleClass(t,false),this.stateMap.delete(t)),i.touched=false;}}_toggleClass(e,t){e=e.trim(),e.length>0&&e.split(pt$3).forEach(i=>{t?this._renderer.addClass(this._ngEl.nativeElement,i):this._renderer.removeClass(this._ngEl.nativeElement,i);});}static \u0275fac=function(t){return new(t||n)(Ar$2(Tr$2),Ar$2(CI))};static \u0275dir=CE({type:n,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return n})();var rr$3=(()=>{class n{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=T$3(le$2);constructor(e){this._viewContainerRef=e;}ngOnChanges(e){if(this._shouldRecreateView(e)){let t=this._viewContainerRef;if(this._viewRef&&t.remove(t.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let i=this._createContextForwardProxy();this._viewRef=t.createEmbeddedView(this.ngTemplateOutlet,i,{injector:this._getInjector()});}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return !!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,t,i)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,t,i):false,get:(e,t,i)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,t,i)}})}static \u0275fac=function(t){return new(t||n)(Ar$2(Li$3))};static \u0275dir=CE({type:n,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Pm]})}return n})();function fe$2(n,r){r=encodeURIComponent(r);for(let e of n.split(";")){let t=e.indexOf("="),[i,s]=t==-1?[e,""]:[e.slice(0,t),e.slice(t+1)];if(i.trim()===r)return decodeURIComponent(s)}return null}var mt$3="browser";function Qs(n){return n===mt$3}var he$2=class he{_doc;constructor(r){this._doc=r;}manager},ke$4=(()=>{class n extends he$2{constructor(e){super(e);}supports(e){return  true}addEventListener(e,t,i,s){return e.addEventListener(t,i,s),()=>this.removeEventListener(e,t,i,s)}removeEventListener(e,t,i,s){return e.removeEventListener(t,i,s)}static \u0275fac=function(t){return new(t||n)(ke$5(ir$3))};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),je$3=new S$1(""),wt$4=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,t){this._zone=t,e.forEach(o=>{o.manager=this;});let i=e.filter(o=>!(o instanceof ke$4));this._plugins=i.slice().reverse();let s=e.find(o=>o instanceof ke$4);s&&this._plugins.push(s);}addEventListener(e,t,i,s){return this._findPluginFor(t).addEventListener(e,t,i,s)}getZone(){return this._zone}_findPluginFor(e){let t=this._eventNameToPlugin.get(e);if(t)return t;if(t=this._plugins.find(s=>s.supports(e)),!t)throw new b$2(-5101,false);return this._eventNameToPlugin.set(e,t),t}static \u0275fac=function(t){return new(t||n)(ke$5(je$3),ke$5(ue$1))};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),Dt$4="ng-app-id";function wn$3(n){for(let r of n)r.remove();}function vn$3(n,r){let e=r.createElement("style");return e.textContent=n,e}function ar$3(n,r,e,t){let i=n.head?.querySelectorAll(`style[${Dt$4}="${r}"],link[${Dt$4}="${r}"]`);if(!i||i.length===0)return  false;for(let s of i)s.removeAttribute(Dt$4),s instanceof HTMLLinkElement?t.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&e.set(s.textContent,{usage:0,elements:[s]});return  true}function Et$5(n,r){let e=r.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var vt$3=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,t,i,s={}){this.doc=e,this.appId=t,this.nonce=i,ar$3(e,t,this.inline,this.external)&&this.hosts.add(e.head);}addStyles(e,t){for(let i of e)this.addUsage(i,this.inline,vn$3);t?.forEach(i=>this.addUsage(i,this.external,Et$5));}removeStyles(e,t){for(let i of e)this.removeUsage(i,this.inline);t?.forEach(i=>this.removeUsage(i,this.external));}addUsage(e,t,i){let s=t.get(e);s?s.usage++:t.set(e,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,i(e,this.doc)))});}removeUsage(e,t){let i=t.get(e);i&&(i.usage--,i.usage<=0&&(wn$3(i.elements),t.delete(e)));}ngOnDestroy(){for(let[,{elements:e}]of [...this.inline,...this.external])wn$3(e);this.hosts.clear();}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[t,{elements:i}]of this.inline)i.push(this.addElement(e,vn$3(t,this.doc)));for(let[t,{elements:i}]of this.external)i.push(this.addElement(e,Et$5(t,this.doc)));}}removeHost(e){this.hosts.delete(e);for(let t of [...this.inline.values(),...this.external.values()]){let i=[];for(let s of t.elements)s.parentNode===e?s.remove():i.push(s);t.elements=i;}}addElement(e,t){return this.nonce&&t.setAttribute("nonce",this.nonce),e.appendChild(t)}static \u0275fac=function(t){return new(t||n)(ke$5(ir$3),ke$5(da$2),ke$5(Em,8),ke$5(vm))};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),yt$3={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Ct$3=/%COMP%/g;var bn$3="%COMP%",ur$3=`_nghost-${bn$3}`,cr$3=`_ngcontent-${bn$3}`,lr$3=true,dr$3=new S$1("",{factory:()=>lr$3});function fr$3(n){return cr$3.replace(Ct$3,n)}function hr$3(n){return ur$3.replace(Ct$3,n)}function Sn$2(n,r){return r.map(e=>e.replace(Ct$3,n))}var bt$4=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,t,i,s,o,u,a=null,l=null){this.eventManager=e,this.sharedStylesHost=t,this.appId=i,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=u,this.nonce=a,this.tracingService=l,this.defaultRenderer=new ge$2(e,o,u,this.tracingService);}createRenderer(e,t){if(!e||!t)return this.defaultRenderer;let i=this.getOrCreateRenderer(e,t);return i instanceof Ue$3?i.applyToHost(e):i instanceof pe$2&&i.applyStyles(),i}getOrCreateRenderer(e,t){let i=this.rendererByCompId,s=i.get(t.id);if(!s){let o=this.doc,u=this.ngZone,a=this.eventManager,l=this.sharedStylesHost,h=this.removeStylesOnCompDestroy,p=this.tracingService;switch(t.encapsulation){case $t$2.Emulated:s=new Ue$3(a,l,t,this.appId,h,o,u,p);break;case $t$2.ShadowDom:return new Be$2(a,e,t,o,u,this.nonce,p,l);case $t$2.ExperimentalIsolatedShadowDom:return new Be$2(a,e,t,o,u,this.nonce,p);default:s=new pe$2(a,l,t,h,o,u,p);break}i.set(t.id,s);}return s}ngOnDestroy(){this.rendererByCompId.clear();}componentReplaced(e){this.rendererByCompId.delete(e);}static \u0275fac=function(t){return new(t||n)(ke$5(wt$4),ke$5(Tp),ke$5(da$2),ke$5(dr$3),ke$5(ir$3),ke$5(ue$1),ke$5(Em),ke$5(Gt$3,8))};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),ge$2=class ge{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=true;constructor(r,e,t,i){this.eventManager=r,this.doc=e,this.ngZone=t,this.tracingService=i;}destroy(){}destroyNode=null;createElement(r,e){return e?this.doc.createElementNS(yt$3[e]||e,r):this.doc.createElement(r)}createComment(r){return this.doc.createComment(r)}createText(r){return this.doc.createTextNode(r)}appendChild(r,e){(Cn$3(r)?r.content:r).appendChild(e);}insertBefore(r,e,t){r&&(Cn$3(r)?r.content:r).insertBefore(e,t);}removeChild(r,e){e.remove();}selectRootElement(r,e){let t=typeof r=="string"?this.doc.querySelector(r):r;if(!t)throw new b$2(-5104,false);return e||(t.textContent=""),t}parentNode(r){return r.parentNode}nextSibling(r){return r.nextSibling}setAttribute(r,e,t,i){if(i){e=i+":"+e;let s=yt$3[i];s?r.setAttributeNS(s,e,t):r.setAttribute(e,t);}else r.setAttribute(e,t);}removeAttribute(r,e,t){if(t){let i=yt$3[t];i?r.removeAttributeNS(i,e):r.removeAttribute(`${t}:${e}`);}else r.removeAttribute(e);}addClass(r,e){r.classList.add(e);}removeClass(r,e){r.classList.remove(e);}setStyle(r,e,t,i){i&(ci$1.DashCase|ci$1.Important)?r.style.setProperty(e,t,i&ci$1.Important?"important":""):r.style[e]=t;}removeStyle(r,e,t){t&ci$1.DashCase?r.style.removeProperty(e):r.style[e]="";}setProperty(r,e,t){r!=null&&(r[e]=t);}setValue(r,e){r.nodeValue=e;}listen(r,e,t,i){if(typeof r=="string"&&(r=T$2().getGlobalEventTarget(this.doc,r),!r))throw new b$2(-5102,false);let s=this.decoratePreventDefault(t);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(r,e,s)),this.eventManager.addEventListener(r,e,s,i)}decoratePreventDefault(r){return e=>{if(e==="__ngUnwrap__")return r;r(e)===false&&e.preventDefault();}}};function Cn$3(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Be$2=class Be extends ge$2{hostEl;sharedStylesHost;shadowRoot;constructor(r,e,t,i,s,o,u,a){super(r,i,s,u),this.hostEl=e,this.sharedStylesHost=a,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=t.styles;l=Sn$2(t.id,l);for(let p of l){let D=document.createElement("style");o&&D.setAttribute("nonce",o),D.textContent=p,this.shadowRoot.appendChild(D);}let h=t.getExternalStyles?.();if(h)for(let p of h){let D=Et$5(p,i);o&&D.setAttribute("nonce",o),this.shadowRoot.appendChild(D);}}nodeOrShadowRoot(r){return r===this.hostEl?this.shadowRoot:r}appendChild(r,e){return super.appendChild(this.nodeOrShadowRoot(r),e)}insertBefore(r,e,t){return super.insertBefore(this.nodeOrShadowRoot(r),e,t)}removeChild(r,e){return super.removeChild(null,e)}parentNode(r){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(r)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot);}},pe$2=class pe extends ge$2{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(r,e,t,i,s,o,u,a){super(r,s,o,u),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=i;let l=t.styles;this.styles=a?Sn$2(a,l):l,this.styleUrls=t.getExternalStyles?.(a);}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls);}destroy(){this.removeStylesOnCompDestroy&&Ut$3.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls);}},Ue$3=class Ue extends pe$2{contentAttr;hostAttr;constructor(r,e,t,i,s,o,u,a){let l=i+"-"+t.id;super(r,e,t,s,o,u,a,l),this.contentAttr=fr$3(l),this.hostAttr=hr$3(l);}applyToHost(r){this.applyStyles(),this.setAttribute(r,this.hostAttr,"");}createElement(r,e){let t=super.createElement(r,e);return super.setAttribute(t,this.contentAttr,""),t}};var $e$2=class n extends de$1{supportsDOMEvents=true;static makeCurrent(){gt$4(new n);}onAndCancel(r,e,t,i){return r.addEventListener(e,t,i),()=>{r.removeEventListener(e,t,i);}}dispatchEvent(r,e){r.dispatchEvent(e);}remove(r){r.remove();}createElement(r,e){return e=e||this.getDefaultDocument(),e.createElement(r)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(r){return r.nodeType===Node.ELEMENT_NODE}isShadowRoot(r){return r instanceof DocumentFragment}getGlobalEventTarget(r,e){return e==="window"?window:e==="document"?r:e==="body"?r.body:null}getBaseHref(r){let e=pr$2();return e==null?null:mr$3(e)}resetBaseElement(){me$2=null;}getUserAgent(){return window.navigator.userAgent}getCookie(r){return fe$2(document.cookie,r)}},me$2=null;function pr$2(){return me$2=me$2||document.head.querySelector("base"),me$2?me$2.getAttribute("href"):null}function mr$3(n){return new URL(n,document.baseURI).pathname}var Tn$2=["alt","control","meta","shift"],Dr$1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},yr$1={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},_n$2=(()=>{class n extends he$2{constructor(e){super(e);}supports(e){return n.parseEventName(e)!=null}addEventListener(e,t,i,s){let o=n.parseEventName(t),u=n.eventCallback(o.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>T$2().onAndCancel(e,o.domEventName,u,s))}static parseEventName(e){let t=e.toLowerCase().split("."),i=t.shift();if(t.length===0||!(i==="keydown"||i==="keyup"))return null;let s=n._normalizeKey(t.pop()),o="",u=t.indexOf("code");if(u>-1&&(t.splice(u,1),o="code."),Tn$2.forEach(l=>{let h=t.indexOf(l);h>-1&&(t.splice(h,1),o+=l+".");}),o+=s,t.length!=0||s.length===0)return null;let a={};return a.domEventName=i,a.fullKey=o,a}static matchEventFullKeyCode(e,t){let i=Dr$1[e.key]||e.key,s="";return t.indexOf("code.")>-1&&(i=e.code,s="code."),i==null||!i?false:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),Tn$2.forEach(o=>{if(o!==i){let u=yr$1[o];u(e)&&(s+=o+".");}}),s+=i,s===t)}static eventCallback(e,t,i){return s=>{n.matchEventFullKeyCode(s,e)&&i.runGuarded(()=>t(s));}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(t){return new(t||n)(ke$5(ir$3))};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})();function Er$1(n,r,e){return C$4(this,null,function*(){let t=w$3({rootComponent:n},wr$1(r,e));return OF(t)})}function wr$1(n,r){return {platformRef:r?.platformRef,appProviders:[...Tr$1,...n?.providers??[]],platformProviders:Sr$1}}function vr$2(){$e$2.makeCurrent();}function Cr$1(){return new Qe$2}function br$1(){return ay(document),document}var Sr$1=[{provide:vm,useValue:mt$3},{provide:Ku,useValue:vr$2,multi:true},{provide:ir$3,useFactory:br$1}];var Tr$1=[{provide:Ps$1,useValue:"root"},{provide:Qe$2,useFactory:Cr$1},{provide:je$3,useClass:ke$4,multi:true},{provide:je$3,useClass:_n$2,multi:true},bt$4,{provide:Tp,useClass:vt$3},{provide:vt$3,useExisting:Tp},wt$4,{provide:vr$3,useExisting:bt$4},[]];var A$2=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(r){r?typeof r=="string"?this.lazyInit=()=>{this.headers=new Map,r.split(`
`).forEach(e=>{let t=e.indexOf(":");if(t>0){let i=e.slice(0,t),s=e.slice(t+1).trim();this.addHeaderEntry(i,s);}});}:typeof Headers<"u"&&r instanceof Headers?(this.headers=new Map,r.forEach((e,t)=>{this.addHeaderEntry(t,e);})):this.lazyInit=()=>{this.headers=new Map,Object.entries(r).forEach(([e,t])=>{this.setHeaderEntries(e,t);});}:this.headers=new Map;}has(r){return this.init(),this.headers.has(r.toLowerCase())}get(r){this.init();let e=this.headers.get(r.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(r){return this.init(),this.headers.get(r.toLowerCase())||null}append(r,e){return this.clone({name:r,value:e,op:"a"})}set(r,e){return this.clone({name:r,value:e,op:"s"})}delete(r,e){return this.clone({name:r,value:e,op:"d"})}maybeSetNormalizedName(r,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,r);}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(r=>this.applyUpdate(r)),this.lazyUpdate=null));}copyFrom(r){r.init(),Array.from(r.headers.keys()).forEach(e=>{this.headers.set(e,r.headers.get(e)),this.normalizedNames.set(e,r.normalizedNames.get(e));});}clone(r){let e=new n;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([r]),e}applyUpdate(r){let e=r.name.toLowerCase();switch(r.op){case "a":case "s":let t=r.value;if(typeof t=="string"&&(t=[t]),t.length===0)return;this.maybeSetNormalizedName(r.name,e);let i=(r.op==="a"?this.headers.get(e):void 0)||[];i.push(...t),this.headers.set(e,i);break;case "d":let s=r.value;if(!s)this.headers.delete(e),this.normalizedNames.delete(e);else {let o=this.headers.get(e);if(!o)return;o=o.filter(u=>s.indexOf(u)===-1),o.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,o);}break}}addHeaderEntry(r,e){let t=r.toLowerCase();this.maybeSetNormalizedName(r,t),this.headers.has(t)?this.headers.get(t).push(e):this.headers.set(t,[e]);}setHeaderEntries(r,e){let t=(Array.isArray(e)?e:[e]).map(s=>s.toString()),i=r.toLowerCase();this.headers.set(i,t),this.maybeSetNormalizedName(r,i);}forEach(r){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>r(this.normalizedNames.get(e),this.headers.get(e)));}};var ze$3=class ze{map=new Map;set(r,e){return this.map.set(r,e),this}get(r){return this.map.has(r)||this.map.set(r,r.defaultValue()),this.map.get(r)}delete(r){return this.map.delete(r),this}has(r){return this.map.has(r)}keys(){return this.map.keys()}},He$2=class He{encodeKey(r){return An$2(r)}encodeValue(r){return An$2(r)}decodeKey(r){return decodeURIComponent(r)}decodeValue(r){return decodeURIComponent(r)}};function _r$1(n,r){let e=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(i=>{let s=i.indexOf("="),[o,u]=s==-1?[r.decodeKey(i),""]:[r.decodeKey(i.slice(0,s)),r.decodeValue(i.slice(s+1))],a=e.get(o)||[];a.push(u),e.set(o,a);}),e}var Ar$1=/%(\d[a-f0-9])/gi,Fr$1={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function An$2(n){return encodeURIComponent(n).replace(Ar$1,(r,e)=>Fr$1[e]??r)}function Ve$4(n){return `${n}`}var _=class n{map;encoder;updates=null;cloneFrom=null;constructor(r={}){if(this.encoder=r.encoder||new He$2,r.fromString){if(r.fromObject)throw new b$2(2805,false);this.map=_r$1(r.fromString,this.encoder);}else r.fromObject?(this.map=new Map,Object.keys(r.fromObject).forEach(e=>{let t=r.fromObject[e],i=Array.isArray(t)?t.map(Ve$4):[Ve$4(t)];this.map.set(e,i);})):this.map=null;}has(r){return this.init(),this.map.has(r)}get(r){this.init();let e=this.map.get(r);return e?e[0]:null}getAll(r){return this.init(),this.map.get(r)||null}keys(){return this.init(),Array.from(this.map.keys())}append(r,e){return this.clone({param:r,value:e,op:"a"})}appendAll(r){let e=[];return Object.keys(r).forEach(t=>{let i=r[t];Array.isArray(i)?i.forEach(s=>{e.push({param:t,value:s,op:"a"});}):e.push({param:t,value:i,op:"a"});}),this.clone(e)}set(r,e){return this.clone({param:r,value:e,op:"s"})}delete(r,e){return this.clone({param:r,value:e,op:"d"})}toString(){return this.init(),this.keys().map(r=>{let e=this.encoder.encodeKey(r);return this.map.get(r).map(t=>e+"="+this.encoder.encodeValue(t)).join("&")}).filter(r=>r!=="").join("&")}clone(r){let e=new n({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(r),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(r=>this.map.set(r,this.cloneFrom.map.get(r))),this.updates.forEach(r=>{switch(r.op){case "a":case "s":let e=(r.op==="a"?this.map.get(r.param):void 0)||[];e.push(Ve$4(r.value)),this.map.set(r.param,e);break;case "d":if(r.value!==void 0){let t=this.map.get(r.param)||[],i=t.indexOf(Ve$4(r.value));i!==-1&&t.splice(i,1),t.length>0?this.map.set(r.param,t):this.map.delete(r.param);}else {this.map.delete(r.param);break}}}),this.cloneFrom=this.updates=null);}};function Rr$1(n){switch(n){case "DELETE":case "GET":case "HEAD":case "OPTIONS":case "JSONP":return  false;default:return  true}}function Fn$2(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function Rn$2(n){return typeof Blob<"u"&&n instanceof Blob}function Mn$2(n){return typeof FormData<"u"&&n instanceof FormData}function Mr$1(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}var St$5="Content-Type",In$2="Accept",Pn$2="text/plain",Nn$2="application/json",Ir$1=`${Nn$2}, ${Pn$2}, */*`,Q$6=class n{url;body=null;headers;context;reportProgress=false;reportUploadProgress=false;reportDownloadProgress=false;withCredentials=false;credentials;keepalive=false;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(r,e,t,i){this.url=e,this.method=r.toUpperCase();let s;if(Rr$1(this.method)||i?(this.body=t!==void 0?t:null,s=i):s=t,s){if(this.reportProgress=!!s.reportProgress,this.reportUploadProgress=!!s.reportUploadProgress,this.reportDownloadProgress=!!s.reportDownloadProgress,this.withCredentials=!!s.withCredentials,this.keepalive=!!s.keepalive,s.responseType&&(this.responseType=s.responseType),s.headers&&(this.headers=s.headers),s.context&&(this.context=s.context),s.params&&(this.params=s.params),s.priority&&(this.priority=s.priority),s.cache&&(this.cache=s.cache),s.credentials&&(this.credentials=s.credentials),typeof s.timeout=="number"){if(s.timeout<1||!Number.isInteger(s.timeout))throw new b$2(2822,"");this.timeout=s.timeout;}s.mode&&(this.mode=s.mode),s.redirect&&(this.redirect=s.redirect),s.integrity&&(this.integrity=s.integrity),s.referrer!==void 0&&(this.referrer=s.referrer),s.referrerPolicy&&(this.referrerPolicy=s.referrerPolicy),this.transferCache=s.transferCache;}if(this.headers??=new A$2,this.context??=new ze$3,!this.params)this.params=new _,this.urlWithParams=e;else {let o=this.params.toString();if(o.length===0)this.urlWithParams=e;else {let u=e,a="",l=e.indexOf("#");l!==-1&&(a=e.substring(l),u=e.substring(0,l));let h=u.indexOf("?"),p=h===-1?"?":h<u.length-1?"&":"";this.urlWithParams=u+p+o+a;}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Fn$2(this.body)||Rn$2(this.body)||Mn$2(this.body)||Mr$1(this.body)?this.body:this.body instanceof _?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Mn$2(this.body)?null:Rn$2(this.body)?this.body.type||null:Fn$2(this.body)?null:typeof this.body=="string"?Pn$2:this.body instanceof _?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Nn$2:null}clone(r={}){let e=r.method||this.method,t=r.url||this.url,i=r.responseType||this.responseType,s=r.keepalive??this.keepalive,o=r.priority||this.priority,u=r.cache||this.cache,a=r.mode||this.mode,l=r.redirect||this.redirect,h=r.credentials||this.credentials,p=r.referrer??this.referrer,D=r.integrity||this.integrity,qe=r.referrerPolicy||this.referrerPolicy,be=r.transferCache??this.transferCache,Se=r.timeout??this.timeout,w=r.body!==void 0?r.body:this.body,U=r.withCredentials??this.withCredentials,Te=r.reportProgress??this.reportProgress,ne=r.reportUploadProgress??this.reportUploadProgress,j=r.reportDownloadProgress??this.reportDownloadProgress,re=r.headers||this.headers,O=r.params||this.params,_e=r.context??this.context;return r.setHeaders!==void 0&&(re=Object.keys(r.setHeaders).reduce(($,P)=>$.set(P,r.setHeaders[P]),re)),r.setParams&&(O=Object.keys(r.setParams).reduce(($,P)=>$.set(P,r.setParams[P]),O)),new n(e,t,w,{params:O,headers:re,context:_e,reportProgress:Te,reportUploadProgress:ne,reportDownloadProgress:j,responseType:i,withCredentials:U,transferCache:be,keepalive:s,cache:u,priority:o,timeout:Se,mode:a,redirect:l,credentials:h,referrer:p,integrity:D,referrerPolicy:qe})}},ee$3=(function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n})(ee$3||{}),te$3=class te{headers;status;statusText;url;ok;type;redirected;responseType;constructor(r,e=200,t="OK"){this.headers=r.headers||new A$2,this.status=r.status!==void 0?r.status:e,this.statusText=r.statusText||t,this.url=r.url||null,this.redirected=r.redirected,this.responseType=r.responseType,this.ok=this.status>=200&&this.status<300;}},Ge$2=class n extends te$3{constructor(r={}){super(r);}type=ee$3.ResponseHeader;clone(r={}){return new n({headers:r.headers||this.headers,status:r.status!==void 0?r.status:this.status,statusText:r.statusText||this.statusText,url:r.url||this.url||void 0})}},De$3=class n extends te$3{body;constructor(r={}){super(r),this.body=r.body!==void 0?r.body:null;}type=ee$3.Response;clone(r={}){return new n({body:r.body!==void 0?r.body:this.body,headers:r.headers||this.headers,status:r.status!==void 0?r.status:this.status,statusText:r.statusText||this.statusText,url:r.url||this.url||void 0,redirected:r.redirected??this.redirected,responseType:r.responseType??this.responseType})}},k$2=class k extends te$3{name="HttpErrorResponse";message;error;ok=false;constructor(r){super(r,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${r.url||"(unknown url)"}`:this.message=`Http failure response for ${r.url||"(unknown url)"}: ${r.status} ${r.statusText}`,this.error=r.error||null;}},Lr$1=200;var Or$1=/^\)\]\}',?\n/,xn$3=new S$1("",{factory:()=>null}),We$2=(()=>{class n{fetchImpl=T$3(_t$2,{optional:true})?.fetch??((...e)=>globalThis.fetch(...e));ngZone=T$3(ue$1);destroyRef=T$3(Le$3);maxResponseSize=T$3(xn$3);handle(e){return new N$2(t=>{let i=new AbortController;this.doRequest(e,i.signal,t).then(At$5,o=>t.error(new k$2({error:o})));let s;return e.timeout&&(s=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{i.signal.aborted||i.abort(new DOMException("signal timed out","TimeoutError"));},e.timeout))),()=>{s!==void 0&&clearTimeout(s),i.abort();}})}doRequest(e,t,i){return C$4(this,null,function*(){let s=this.createRequestInit(e),o;try{let w=this.ngZone.runOutsideAngular(()=>this.fetchImpl(e.urlWithParams,w$3({signal:t},s)));Pr$1(w),i.next({type:ee$3.Sent}),o=yield w;}catch(w){i.error(new k$2({error:w,status:w.status??0,statusText:w.statusText,url:e.urlWithParams,headers:w.headers}));return}let u=new A$2(o.headers),a=o.statusText,l=o.url||e.urlWithParams,h=o.status,p=null,D=e.reportProgress||e.reportDownloadProgress;if(D&&i.next(new Ge$2({headers:u,status:h,statusText:a,url:l})),o.body){let w=o.headers.get("content-length"),U=w!==null?Number(w):NaN;this.maxResponseSize!==null&&Number.isFinite(U)&&U>this.maxResponseSize&&Ln$2(this.maxResponseSize);let Te=[],ne=o.body.getReader(),j=0,re,O,_e=typeof Zone<"u"&&Zone.current,$=false;if(yield this.ngZone.runOutsideAngular(()=>C$4(this,null,function*(){for(;;){if(this.destroyRef.destroyed){yield ne.cancel(),$=true;break}let{done:ie,value:Qe}=yield ne.read();if(ie)break;if(Te.push(Qe),j+=Qe.length,this.maxResponseSize!==null&&j>this.maxResponseSize&&(yield ne.cancel(),Ln$2(this.maxResponseSize)),D){O=e.responseType==="text"?(O??"")+(re??=new TextDecoder).decode(Qe,{stream:true}):void 0;let kt=()=>i.next({type:ee$3.DownloadProgress,total:Number.isFinite(U)?U:void 0,loaded:j,partialText:O});_e?_e.run(kt):kt();}}})),$){i.complete();return}let P=this.concatChunks(Te,j);try{let ie=o.headers.get(St$5)??"";p=this.parseBody(e,P,ie,h);}catch(ie){i.error(new k$2({error:ie,headers:new A$2(o.headers),status:o.status,statusText:o.statusText,url:o.url||e.urlWithParams}));return}}h===0&&(h=p?Lr$1:0);let qe=h>=200&&h<300,be=o.redirected,Se=o.type;qe?(i.next(new De$3({body:p,headers:u,status:h,statusText:a,url:l,redirected:be,responseType:Se})),i.complete()):i.error(new k$2({error:p,headers:u,status:h,statusText:a,url:l,redirected:be,responseType:Se}));})}parseBody(e,t,i,s){switch(e.responseType){case "json":let o=new TextDecoder().decode(t).replace(Or$1,"");if(o==="")return null;try{return JSON.parse(o)}catch(u){if(s<200||s>=300)return o;throw u}case "text":return new TextDecoder().decode(t);case "blob":return new Blob([t],{type:i});case "arraybuffer":return t.buffer}}createRequestInit(e){if(e.reportUploadProgress)throw new b$2(2824,false);let t={},i;if(i=e.credentials,e.withCredentials&&(i="include"),e.headers.forEach((s,o)=>t[s]=o.join(",")),e.headers.has(In$2)||(t[In$2]=Ir$1),!e.headers.has(St$5)){let s=e.detectContentTypeHeader();s!==null&&(t[St$5]=s);}return {body:e.serializeBody(),method:e.method,headers:t,credentials:i,keepalive:e.keepalive,cache:e.cache,priority:e.priority,mode:e.mode,redirect:e.redirect,referrer:e.referrer,integrity:e.integrity,referrerPolicy:e.referrerPolicy}}concatChunks(e,t){let i=new Uint8Array(t),s=0;for(let o of e)i.set(o,s),s+=o.length;return i}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),_t$2=class _t{};function At$5(){}function Pr$1(n){n.then(At$5,At$5);}function Ln$2(n){throw new b$2(-2825,false)}function kn$2(n,r){return r(n)}function Nr$1(n,r){return (e,t)=>r.intercept(e,{handle:i=>n(i,t)})}function xr$1(n,r,e){return (t,i)=>No$3(e,()=>r(t,s=>n(s,i)))}var Bn$2=new S$1(""),Ft$3=new S$1("",{factory:()=>[]}),Un$2=new S$1(""),Rt$4=new S$1("",{factory:()=>true});function kr$1(){let n=null;return (r,e)=>{n===null&&(n=(T$3(Bn$2,{optional:true})??[]).reduceRight(Nr$1,kn$2));let t=T$3(Wo$2);if(T$3(Rt$4)){let s=t.add();return n(r,e).pipe(Vl(s))}else return n(r,e)}}var Mt$6=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$5(We$2),i},providedIn:"root"})}return n})();var Ye$2=(()=>{class n{backend;injector;chain=null;pendingTasks=T$3(Wo$2);contributeToStability=T$3(Rt$4);constructor(e,t){this.backend=e,this.injector=t;}handle(e){if(this.chain===null){let t=Array.from(new Set([...this.injector.get(Ft$3),...this.injector.get(Un$2,[])]));this.chain=t.reduceRight((i,s)=>xr$1(i,s,this.injector),kn$2);}if(this.contributeToStability){let t=this.pendingTasks.add();return this.chain(e,i=>this.backend.handle(i)).pipe(Vl(t))}else return this.chain(e,t=>this.backend.handle(t))}static \u0275fac=function(t){return new(t||n)(ke$5(Mt$6),ke$5(ce$3))};static \u0275prov=re$3({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),It$4=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$5(Ye$2),i},providedIn:"root"})}return n})();function Tt$5(n,r){return w$3({body:r},n)}var jn$2=(()=>{class n{handler;constructor(e){this.handler=e;}request(e,t,i={}){let s;if(e instanceof Q$6)s=e;else {let a;i.headers instanceof A$2?a=i.headers:a=new A$2(i.headers);let l;i.params&&(i.params instanceof _?l=i.params:l=new _({fromObject:i.params})),s=new Q$6(e,t,i.body!==void 0?i.body:null,{headers:a,context:i.context,params:l,reportProgress:i.reportProgress,reportUploadProgress:i.reportUploadProgress,reportDownloadProgress:i.reportDownloadProgress,responseType:i.responseType||"json",withCredentials:i.withCredentials,transferCache:i.transferCache,keepalive:i.keepalive,priority:i.priority,cache:i.cache,mode:i.mode,redirect:i.redirect,credentials:i.credentials,referrer:i.referrer,referrerPolicy:i.referrerPolicy,integrity:i.integrity,timeout:i.timeout});}let o=ag(s).pipe(Tg(a=>this.handler.handle(a)));if(e instanceof Q$6||i.observe==="events")return o;let u=o.pipe(Xt$3(a=>a instanceof De$3));switch(i.observe||"body"){case "body":switch(s.responseType){case "arraybuffer":return u.pipe(Me$3(a=>{if(a.body!==null&&!(a.body instanceof ArrayBuffer))throw new b$2(2806,false);return a.body}));case "blob":return u.pipe(Me$3(a=>{if(a.body!==null&&!(a.body instanceof Blob))throw new b$2(2807,false);return a.body}));case "text":return u.pipe(Me$3(a=>{if(a.body!==null&&typeof a.body!="string")throw new b$2(2808,false);return a.body}));default:return u.pipe(Me$3(a=>a.body))}case "response":return u;default:throw new b$2(2809,false)}}delete(e,t={}){return this.request("DELETE",e,t)}get(e,t={}){return this.request("GET",e,t)}head(e,t={}){return this.request("HEAD",e,t)}jsonp(e,t){return this.request("JSONP",e,{params:new _().append(t,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,t={}){return this.request("OPTIONS",e,t)}patch(e,t,i={}){return this.request("PATCH",e,Tt$5(i,t))}post(e,t,i={}){return this.request("POST",e,Tt$5(i,t))}put(e,t,i={}){return this.request("PUT",e,Tt$5(i,t))}static \u0275fac=function(t){return new(t||n)(ke$5(It$4))};static \u0275prov=re$3({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Br$1=new S$1("",{factory:()=>true}),Ur$1="XSRF-TOKEN",jr$1=new S$1("",{factory:()=>Ur$1}),$r$1="X-XSRF-TOKEN",Vr$1=new S$1("",{factory:()=>$r$1}),zr$1=(()=>{class n{cookieName=T$3(jr$1);doc=T$3(ir$3);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=fe$2(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),$n$2=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$5(zr$1),i},providedIn:"root"})}return n})();function Hr$1(n,r){if(!T$3(Br$1)||n.method==="GET"||n.method==="HEAD")return r(n);try{let i=T$3(q$3).href,{origin:s}=new URL(i),{origin:o}=new URL(n.url,s);if(s!==o)return r(n)}catch(i){return r(n)}let e=T$3($n$2).getToken(),t=T$3(Vr$1);return e!=null&&!n.headers.has(t)&&(n=n.clone({headers:n.headers.set(t,e)})),r(n)}var Lt$3=(function(n){return n[n.Interceptors=0]="Interceptors",n[n.LegacyInterceptors=1]="LegacyInterceptors",n[n.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",n[n.NoXsrfProtection=3]="NoXsrfProtection",n[n.JsonpSupport=4]="JsonpSupport",n[n.RequestsMadeViaParent=5]="RequestsMadeViaParent",n[n.Fetch=6]="Fetch",n[n.Xhr=7]="Xhr",n})(Lt$3||{});function Gr$1(n,r){return {\u0275kind:n,\u0275providers:r}}function Wr$1(...n){let r=[jn$2,We$2,Ye$2,{provide:It$4,useExisting:Ye$2},{provide:Mt$6,useFactory:()=>T$3(We$2)},{provide:Ft$3,useValue:Hr$1,multi:true}];for(let e of n)r.push(...e.\u0275providers);return Rs$1(r)}var On$2=new S$1("");function Yr$2(){return Gr$1(Lt$3.LegacyInterceptors,[{provide:On$2,useFactory:kr$1},{provide:Ft$3,useExisting:On$2,multi:true}])}var Na$2=(()=>{class n{_doc;constructor(e){this._doc=e;}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||"";}static \u0275fac=function(t){return new(t||n)(ke$5(ir$3))};static \u0275prov=re$3({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Kr$1=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$5(Xr$2),i},providedIn:"root"})}return n})(),Xr$2=(()=>{class n extends Kr$1{_doc=T$3(ir$3);sanitize(e,t){if(t==null)return null;switch(e){case br$2.NONE:return t;case br$2.HTML:return _i$2(t,"HTML")?Nn$3(t):_f(this._doc,String(t)).toString();case br$2.STYLE:return _i$2(t,"Style")?Nn$3(t):t;case br$2.SCRIPT:if(_i$2(t,"Script"))return Nn$3(t);throw new b$2(5200,false);case br$2.URL:return _i$2(t,"URL")?Nn$3(t):lc(String(t));case br$2.RESOURCE_URL:if(_i$2(t,"ResourceURL"))return Nn$3(t);throw new b$2(5201,false);default:throw new b$2(5202,false)}}bypassSecurityTrustHtml(e){return py(e)}bypassSecurityTrustStyle(e){return hy(e)}bypassSecurityTrustScript(e){return gy(e)}bypassSecurityTrustUrl(e){return my(e)}bypassSecurityTrustResourceUrl(e){return yy(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function L$2(n){n||(n=T$3(Le$3));let r=new N$2(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(Rg(r))}function Ga$1(n,r){let e=T$3(le$2),t=new On$3(1),i=pa$2(()=>{let s;try{s=n();}catch(o){ae$2(()=>t.error(o));return}ae$2(()=>t.next(s));},{injector:e,manualCleanup:true});return e.get(Le$3).onDestroy(()=>{i.destroy(),t.complete();}),t.asObservable()}function Wa$1(n,r){let t=!r?.manualCleanup?r?.injector?.get(Le$3)??T$3(Le$3):null,i=Zr$2(r?.equal),s;r?.requireSync?s=Fe$3({kind:0},{equal:i}):s=Fe$3({kind:1,value:r?.initialValue},{equal:i});let o,u=n.subscribe({next:a=>s.set({kind:1,value:a}),error:a=>{s.set({kind:2,error:a}),o?.();},complete:()=>{o?.();}});if(r?.requireSync&&s().kind===0)throw new b$2(601,false);return o=t?.onDestroy(u.unsubscribe.bind(u)),dt$3(()=>{let a=s();switch(a.kind){case 1:return a.value;case 2:throw a.error;case 0:throw new b$2(601,false)}},{equal:r?.equal})}function Zr$2(n=Object.is){return (r,e)=>r.kind===1&&e.kind===1&&n(r.value,e.value)}function Ya$1(n){return LA(x$3(w$3({},n),{loader:void 0,stream:r=>{let e,t=false,i=Fe$3({value:void 0}),{resolve:s,promise:o}=sa$2(),u=false;function a(){u||(u=true,s(i));}let l=()=>{t=true,e?.unsubscribe(),r.abortSignal.removeEventListener("abort",l),a();};r.abortSignal.addEventListener("abort",l);function h(D){i.set(D),a();}let p=n.stream;if(p===void 0)throw new b$2(990,false);return e=p(r).subscribe({next:D=>h({value:D}),error:D=>{h({error:el(D)}),r.abortSignal.removeEventListener("abort",l);},complete:()=>{u||h({error:new b$2(991,false)}),r.abortSignal.removeEventListener("abort",l);}}),t&&e.unsubscribe(),u?i:o}}))}function Vn$2(n,r){let e={};for(let t of Object.keys(n))t!==r&&(e[t]=n[t]);return e}var Ot$2=class Ot{state=Fe$3({});hasAny=dt$3(()=>Object.keys(this.state()).length>0);isLoading(r){return this.state()[r]!==void 0}get(r){return this.state()[r]}set(r,e){this.state.update(t=>x$3(w$3({},t),{[r]:e}));}clear(r){this.state.update(e=>Vn$2(e,r));}clearIfOwner(r,e){this.state.update(t=>t[r]===e?Vn$2(t,r):t);}},Xe$2=class Xe{},Jr$2=(()=>{class n{handle(e){return e.key}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),we$4=class we{},qr$1=(()=>{class n extends we$4{compile(e,t){return e}compileTranslations(e,t){return e}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(n)))(i||n)}})();static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),ve$3=class ve{},Qr$2=(()=>{class n extends ve$3{getTranslation(e){return ag({})}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(n)))(i||n)}})();static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})();function Pt$5(n,r){if(n===r)return  true;if(n===null||r===null)return  false;if(n!==n&&r!==r)return  true;let e=typeof n,t=typeof r,i;if(e==t&&e=="object")if(Array.isArray(n)){if(!Array.isArray(r))return  false;if((i=n.length)==r.length){for(let s=0;s<i;s++)if(!Pt$5(n[s],r[s]))return  false;return  true}}else {if(Array.isArray(r))return  false;if(R$2(n)&&R$2(r)){let s=Object.create(null);for(let o in n){if(!Pt$5(n[o],r[o]))return  false;s[o]=true;}for(let o in r)if(!(o in s)&&typeof r[o]<"u")return  false;return  true}}return  false}function F$1(n){return typeof n<"u"&&n!==null}function zn$2(n){return n!==void 0}function R$2(n){return Ee$2(n)&&!B$4(n)&&n!==null}function Ee$2(n){return typeof n=="object"&&n!==null}function B$4(n){return Array.isArray(n)}function Ze$1(n){return typeof n=="string"}function ei$1(n){return typeof n=="function"}function Je$2(n){if(B$4(n))return n.map(r=>Je$2(r));if(R$2(n)){let r={};return Object.keys(n).forEach(e=>{r[e]=Je$2(n[e]);}),r}else return n}function xt$2(n,r){if(!Ee$2(n))return Je$2(r);let e=Je$2(n);return Ee$2(e)&&Ee$2(r)&&Object.keys(r).forEach(t=>{R$2(r[t])?t in n?e[t]=xt$2(n[t],r[t]):Object.assign(e,{[t]:r[t]}):Object.assign(e,{[t]:r[t]});}),e}function Gn$2(n,r){let e=r.split(".");r="";do{r+=e.shift();let t=!e.length;if(F$1(n)){if(R$2(n)&&zn$2(n[r])&&(R$2(n[r])||B$4(n[r])||t)){n=n[r],r="";continue}if(B$4(n)){if(r==="length"&&t){n=n.length,r="";continue}if(/^\d+$/.test(r)){let i=parseInt(r,10);if(zn$2(n[i])&&(R$2(n[i])||B$4(n[i])||t)){n=n[i],r="";continue}}}}if(t){n=void 0;continue}r+=".";}while(e.length);return n}function ti$1(n,r,e){return xt$2(n,ni$1(r,e))}function ni$1(n,r){return n.split(".").reduceRight((e,t)=>({[t]:e}),r)}var Ce$3=class Ce{},ri$1=(()=>{class n extends Ce$3{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(e,t){if(Ze$1(e))return this.interpolateString(e,t);if(ei$1(e))return this.interpolateFunction(e,t)}interpolateFunction(e,t){return e(t)}interpolateString(e,t){return t?e.replace(this.templateMatcher,(i,s)=>{let o=this.getInterpolationReplacement(t,s);return o!==void 0?o:i}):e}getInterpolationReplacement(e,t){return this.formatValue(Gn$2(e,t))}formatValue(e){if(Ze$1(e))return e;if(typeof e=="number"||typeof e=="boolean")return e.toString();if(e===null)return "null";if(B$4(e))return e.join(", ");if(Ee$2(e))return typeof e.toString=="function"&&e.toString!==Object.prototype.toString?e.toString():JSON.stringify(e)}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(n)))(i||n)}})();static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),Wn$2=(()=>{class n{_translations=Fe$3({});translations=this._translations.asReadonly();_languages=Fe$3([]);languages=this._languages.asReadonly();_lastTranslationChange=Fe$3(null);lastTranslationChange=this._lastTranslationChange.asReadonly();_translationChange$=new ne$2;translationChange$=this._translationChange$.asObservable();constructor(){T$3(Le$3).onDestroy(()=>{this._translationChange$.complete();});}getTranslations(e){return this.translations()[e]}setTranslations(e,t,i){this._translations.update(o=>x$3(w$3({},o),{[e]:i&&this.hasTranslationFor(e)?xt$2(o[e],t):t})),this.addLanguages([e]);let s={lang:e,translations:this.getTranslations(e)};this._lastTranslationChange.set(s),this._translationChange$.next(s);}getLanguages(){return this.languages()}addLanguages(e){this._languages.update(t=>Array.from(new Set([...t,...e])));}hasTranslationFor(e){return typeof this.translations()[e]<"u"}deleteTranslations(e){this._translations.update(t=>{let o=t,{[e]:i}=o;return z$2(o,[y$1(e)])});}getTranslationValue(e,t){return Gn$2(this.getTranslations(e),t)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})(),Yn$2=new S$1("TRANSLATE_CONFIG"),ye$3=n=>lg(n)?n:ag(n),Nt$3=(()=>{class n{loadingTranslations=new Ot$2;lastUseLanguage=null;currentLoader=T$3(ve$3);compiler=T$3(we$4);parser=T$3(Ce$3);missingTranslationHandler=T$3(Xe$2);store=T$3(Wn$2);destroyRef=T$3(Le$3);parent;get isRoot(){return this.parent===null}_onLangChange=new ne$2;_onFallbackLangChange=new ne$2;_currentLang=Fe$3(null);_fallbackLang=Fe$3(null);_onTranslationRefresh=null;_isLoading=dt$3(()=>this.loadingTranslations.hasAny()||(this.parent?.isLoading()??false));getRoot(){let e=this;for(;e.parent;)e=e.parent;return e}getParent(){return this.parent}getActiveRequestedLang(){return this.getRoot().lastUseLanguage}hasTranslationInChain(e){for(let t=this;t;t=t.parent)if(t.store.hasTranslationFor(e))return  true;return  false}chainTranslationChange$(){let e=[];for(let t=this;t;t=t.parent)e.push(t.store.translationChange$);return e.length===1?e[0]:Dg(...e)}get onTranslationChange(){return this.store.translationChange$}get onLangChange(){return this.isRoot?this._onLangChange.asObservable():this.parent?this.parent.onLangChange:vt$4}get onFallbackLangChange(){return this.isRoot?this._onFallbackLangChange.asObservable():this.parent?this.parent.onFallbackLangChange:vt$4}get onTranslationRefresh(){if(!this._onTranslationRefresh){let e=Dg(this.onTranslationChange.pipe(Xt$3(t=>t.lang===this.getCurrentLang()||t.lang===this.getFallbackLang())),this.onLangChange,this.onFallbackLangChange).pipe(Me$3(()=>{}));this.isRoot?this._onTranslationRefresh=e:this._onTranslationRefresh=this.parent?Dg(e,this.parent.onTranslationRefresh):e;}return this._onTranslationRefresh}constructor(){let e=w$3({isRoot:true,fallbackLang:null},T$3(Yn$2,{optional:true}));this.parent=e.isRoot?null:T$3(n,{optional:true,skipSelf:true});let t=T$3(Le$3);if(this.isRoot)e.lang&&this.use(e.lang),e.fallbackLang&&this.setFallbackLang(e.fallbackLang);else {let i=this.getCurrentLang();i&&this.loadOrExtendLanguage(i)?.pipe(L$2(t)).subscribe({error:o=>{console.warn(`@ngx-translate/core: child failed to load "${i}". Cause:`,o);}});let s=this.getFallbackLang();s&&s!==i&&this.loadOrExtendLanguage(s)?.pipe(L$2(t)).subscribe({error:o=>{console.warn(`@ngx-translate/core: child failed to load "${s}". Cause:`,o);}});}this.onLangChange.pipe(L$2(t)).subscribe(i=>{this.isRoot||this.loadOrExtendLanguage(i.lang)?.pipe(L$2(t)).subscribe({error:s=>{console.warn(`@ngx-translate/core: child failed to load "${i.lang}". Cause:`,s);}});}),this.onFallbackLangChange.pipe(L$2(t)).subscribe(i=>{this.isRoot||this.loadOrExtendLanguage(i.lang)?.pipe(L$2(t)).subscribe({error:s=>{console.warn(`@ngx-translate/core: child failed to load "${i.lang}". Cause:`,s);}});}),t.onDestroy(()=>{this._onLangChange.complete(),this._onFallbackLangChange.complete();});}setFallbackLang(e){if(!this.isRoot)return this.parent.setFallbackLang(e);this._fallbackLang()||this._fallbackLang.set(e);let t=this.loadOrExtendLanguage(e);return lg(t)?(t.pipe(It$5(1)).subscribe({next:()=>{this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)});},error:i=>{console.warn(`@ngx-translate/core: failed to load fallback "${e}". Cause:`,i);}}),t):(this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)}),ag(this.store.getTranslations(e)))}get isLoading(){return this._isLoading}use(e){if(!this.isRoot)return this.parent.use(e);let t=this._currentLang(),i=this.lastUseLanguage;this.lastUseLanguage=e,this._currentLang()||this._currentLang.set(e);let s=this.loadOrExtendLanguage(e);return lg(s)?(s.pipe(It$5(1)).subscribe({next:()=>{this.changeLang(e);},error:o=>{this.lastUseLanguage===e&&(this._currentLang.set(t),this.lastUseLanguage=i),console.warn(`@ngx-translate/core: failed to load "${e}". currentLang was NOT changed; remains "${t??"null"}". Cause:`,o);}}),s):(this.changeLang(e),ag(this.store.getTranslations(e)))}loadOrExtendLanguage(e){return this.store.hasTranslationFor(e)?ag(this.store.getTranslations(e)):this.loadAndCompileTranslations(e)}getTranslations(e){return this.store.getTranslations(e)}changeLang(e){e===this.lastUseLanguage&&(this._currentLang.set(e),this._onLangChange.next({lang:e,translations:this.store.getTranslations(e)}));}getCurrentLang(){return this.isRoot?this._currentLang():this.parent?.getCurrentLang()??null}loadAndCompileTranslations(e){let t=this.loadingTranslations.get(e);if(t)return t;let i=this.currentLoader.getTranslation(e).pipe(Me$3(s=>this.compiler.compileTranslations(s,e)),$l(s=>{this.store.setTranslations(e,s,false),this.loadingTranslations.clearIfOwner(e,i);}),Vl(()=>this.loadingTranslations.clearIfOwner(e,i)),Ag({bufferSize:1,refCount:true}));return this.loadingTranslations.set(e,i),i.pipe(L$2(this.destroyRef)).subscribe({error:()=>{}}),i}setTranslation(e,t,i=false){let s=this.compiler.compileTranslations(t,e);this.store.setTranslations(e,s,i);}setCompiledTranslation(e,t,i=false){this.store.setTranslations(e,t,i);}getLangs(){return this.store.getLanguages()}addLangs(e){this.store.addLanguages(e);}getParsedResultForKey(e,t,i){let s=this.getTextToInterpolate(e,i);if(F$1(s))return this.runInterpolation(s,t);let u=this.getMissingTranslationHandler().handle(w$3({key:e,translateService:this},t!==void 0&&{interpolateParams:t}));return u!==void 0?u:e}getMissingTranslationHandler(){return this.missingTranslationHandler}getFallbackLang(){return this.isRoot?this._fallbackLang():this.parent?.getFallbackLang()??null}getTextToInterpolate(e,t){if(t){let u=this.store.getTranslationValue(t,e);return u!==void 0?u:this.parent?.getTextToInterpolate(e,t)}let i=this.getCurrentLang(),s=this.getFallbackLang(),o;return i&&(o=this.store.getTranslationValue(i,e)),!F$1(o)&&s&&s!==i&&(o=this.store.getTranslationValue(s,e)),o!==void 0?o:this.parent?.getTextToInterpolate(e)}runInterpolation(e,t){if(F$1(e))return B$4(e)?this.runInterpolationOnArray(e,t):R$2(e)?this.runInterpolationOnDict(e,t):this.parser.interpolate(e,t)}runInterpolationOnArray(e,t){return e.map(i=>this.runInterpolation(i,t))}runInterpolationOnDict(e,t){let i={};for(let s in e){let o=this.runInterpolation(e[s],t);o!==void 0&&(i[s]=o);}return i}getParsedResult(e,t,i){return e instanceof Array?this.getParsedResultForArray(e,t,i):this.getParsedResultForKey(e,t,i)}getParsedResultForArray(e,t,i){let s={},o=false;for(let a of e)s[a]=this.getParsedResultForKey(a,t,i),o=o||lg(s[a]);if(!o)return s;let u=e.map(a=>ye$3(s[a]));return Eg(u).pipe(Me$3(a=>{let l={};return a.forEach((h,p)=>{l[e[p]]=h;}),l}))}get(e,t,i){if(!F$1(e)||!e.length)return ag("");let s=i??this.getActiveRequestedLang()??this.getCurrentLang(),o=s?this.loadingTranslations.get(s):void 0;return o?o.pipe(Tg(()=>ye$3(this.getParsedResult(e,t,i)))):ye$3(this.getParsedResult(e,t,i))}getStreamOnTranslationChange(e,t,i){if(!F$1(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return Jt$3(Ig(()=>this.get(e,t,i)),this.onTranslationChange.pipe(vl(()=>{let s=this.getParsedResult(e,t,i);return ye$3(s)})))}stream(e,t,i){if(!F$1(e)||!e.length)throw new Error('Parameter "key" required');let s=i?Dg(this.onLangChange,this.chainTranslationChange$().pipe(Xt$3(o=>o.lang===i))):this.onLangChange;return Jt$3(Ig(()=>this.get(e,t,i)),s.pipe(vl(()=>{let o=this.getParsedResult(e,t,i);return ye$3(o)})))}instant(e,t,i){if(!F$1(e)||e.length===0)return "";i&&!this.hasTranslationInChain(i)&&this.warnUnloadedInstantLang(i);let s=this.getParsedResult(e,t,i);return lg(s)?this.keyToObject(e):s}warnedUnloadedInstantLangs=new Set;warnUnloadedInstantLang(e){let t=this.getRoot();if(t!==this){t.warnUnloadedInstantLang(e);return}this.warnedUnloadedInstantLangs.has(e)||ae$2(()=>{this.warnedUnloadedInstantLangs.add(e),console.warn(`@ngx-translate/core: instant() called with lang="${e}" but no translations are loaded for that language. Returning the key as fallback. Load with use("${e}") or setTranslation("${e}", ...) first.`);});}translate(e,t,i){return dt$3(()=>{let s=typeof e=="function"?e():e,o=typeof t=="function"?t():t,u=typeof i=="function"?i():i;return this.instant(s,o,u)})}keyToObject(e){return Array.isArray(e)?e.reduce((t,i)=>(t[i]=i,t),{}):e}set(e,t,i=this.getCurrentLang()){this.store.setTranslations(i,ti$1(this.store.getTranslations(i),e,Ze$1(t)?this.compiler.compile(t,i):this.compiler.compileTranslations(t,i)),false);}reloadLang(e){return this.resetLang(e),this.loadAndCompileTranslations(e)}resetLang(e){this.loadingTranslations.clear(e),this.store.deleteTranslations(e);}static getBrowserLang(){if(typeof window>"u"||!window.navigator)return;let e=this.getBrowserCultureLang();return e?e.split(/[-_]/)[0]:void 0}static getBrowserCultureLang(){if(!(typeof window>"u"||typeof window.navigator>"u"))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}getBrowserLang(){return n.getBrowserLang()}getBrowserCultureLang(){return n.getBrowserCultureLang()}get currentLang(){return this.isRoot?this._currentLang.asReadonly():this.parent.currentLang}get fallbackLang(){return this.isRoot?this._fallbackLang.asReadonly():this.parent.fallbackLang}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})();var iu=(()=>{class n{translateService=T$3(Nt$3);cachedSignal=null;lastKey=null;lastParams;transform(e,...t){if(!e||!e.length)return e;let i=this.parseArgs(t);return (e!==this.lastKey||!Pt$5(i,this.lastParams))&&(this.cachedSignal=this.translateService.translate(e,i),this.lastKey=e,this.lastParams=i),this.cachedSignal()}parseArgs(e){if(!(!F$1(e[0])||!e.length)){if(Ze$1(e[0])&&e[0].length){let t=e[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,'"$2":').replace(/:(\s)?(')(.*?)(')/g,':"$3"');try{return JSON.parse(t)}catch(i){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${e[0]}`)}}if(R$2(e[0]))return e[0]}}static \u0275fac=function(t){return new(t||n)};static \u0275pipe=bE({name:"translate",type:n,pure:false});static \u0275prov=re$3({token:n,factory:n.\u0275fac})}return n})();function Kn$2(n){return /^class\s/.test(Function.prototype.toString.call(n))}function Hn$2(n,r){return Kn$2(r)?{provide:n,useClass:r}:{provide:n,useFactory:r}}function su(n={}){return ii$1(x$3(w$3({},n),{isRoot:true}))}function Ke$2(n,r,e,t,i){if(r===void 0)return Hn$2(n,e);if(typeof r=="function"){if(Kn$2(r)){let s=r.name||"YourClass";console.warn(`@ngx-translate/core: "${t}" received a bare class (${s}); auto-wrapping with ${i}(). For clarity, prefer ${t}: ${i}(${s}).`);}return Hn$2(n,r)}return r}function ii$1(n){let r=[],e=Ke$2(ve$3,n.loader,Qr$2,"loader","provideTranslateLoader"),t=Ke$2(we$4,n.compiler,qr$1,"compiler","provideTranslateCompiler"),i=Ke$2(Ce$3,n.parser,ri$1,"parser","provideTranslateParser"),s=Ke$2(Xe$2,n.missingTranslationHandler,Jr$2,"missingTranslationHandler","provideMissingTranslationHandler");r.push(e,t,i,s),r.push(Wn$2);let o={fallbackLang:n.fallbackLang??null,lang:n.lang,isRoot:n.isRoot};return r.push({provide:Yn$2,useValue:o}),r.push({provide:Nt$3,useClass:Nt$3}),r}var gn$1;try{gn$1=typeof Intl<"u"&&Intl.v8BreakIterator;}catch(i){gn$1=false;}var x$1=(()=>{class i{_platformId=T$3(vm);isBrowser=this._platformId?Qs(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||gn$1)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function Tt$4(i){return Array.isArray(i)?i:[i]}var Ri$2=new Set,Et$4,be$2=(()=>{class i{_platform=T$3(x$1);_nonce=T$3(Em,{optional:true});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):_r;}matchMedia(t){return (this._platform.WEBKIT||this._platform.BLINK)&&br(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function br(i,e){if(!Ri$2.has(i))try{Et$4||(Et$4=document.createElement("style"),e&&Et$4.setAttribute("nonce",e),Et$4.setAttribute("type","text/css"),document.head.appendChild(Et$4)),Et$4.sheet&&(Et$4.sheet.insertRule(`@media ${i.replace(/[{}]/g,"")} {body{ }}`,0),Ri$2.add(i));}catch(t){console.error(t);}}function _r(i){return {matches:i==="all"||i==="",media:i,addListener:()=>{},removeListener:()=>{}}}var vr$1=(()=>{class i{_mediaMatcher=T$3(be$2);_zone=T$3(ue$1);_queries=new Map;_destroySubject=new ne$2;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete();}isMatched(t){return Fi$2(Tt$4(t)).some(o=>this._registerQuery(o).mql.matches)}observe(t){let o=Fi$2(Tt$4(t)).map(a=>this._registerQuery(a).observable),r=yg(o);return r=Jt$3(r.pipe(It$5(1)),r.pipe(Hl(1),Cg(0))),r.pipe(Me$3(a=>{let l={matches:false,breakpoints:{}};return a.forEach(({matches:d,query:u})=>{l.matches=l.matches||d,l.breakpoints[u]=d;}),l}))}_registerQuery(t){if(this._queries.has(t))return this._queries.get(t);let n=this._mediaMatcher.matchMedia(t),r={observable:new N$2(a=>{let l=d=>this._zone.run(()=>a.next(d));return n.addListener(l),()=>{n.removeListener(l);}}).pipe(Bl(n),Me$3(({matches:a})=>({query:t,matches:a})),Rg(this._destroySubject)),mql:n};return this._queries.set(t,r),r}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function Fi$2(i){return i.map(e=>e.split(",")).reduce((e,t)=>e.concat(t)).map(e=>e.trim())}var qs={XSmall:"(max-width: 599.98px)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)"};function $t$1(i){return i.buttons===0||i.detail===0}function Xt$2(i){let e=i.touches&&i.touches[0]||i.changedTouches&&i.changedTouches[0];return !!e&&e.identifier===-1&&(e.radiusX==null||e.radiusX===1)&&(e.radiusY==null||e.radiusY===1)}var bn$2;function ki$3(){if(bn$2==null){let i=typeof document<"u"?document.head:null;bn$2=!!(i&&(i.createShadowRoot||i.attachShadow));}return bn$2}function _n$1(i){if(ki$3()){let e=i.getRootNode?i.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&e instanceof ShadowRoot)return e}return null}function yr(){let i=typeof document<"u"&&document?document.activeElement:null;for(;i&&i.shadowRoot;){let e=i.shadowRoot.activeElement;if(e===i)break;i=e;}return i}function H$2(i){if(i.composedPath)try{return i.composedPath()[0]}catch(e){}return i.target}var qt$3;function Ii$3(){if(qt$3==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>qt$3=!0}));}finally{qt$3=qt$3||false;}return qt$3}function Pt$4(i){return Ii$3()?i:!!i.capture}function _e$2(i,e=0){return Ti$3(i)?Number(i):arguments.length===2?e:0}function Ti$3(i){return !isNaN(parseFloat(i))&&!isNaN(Number(i))}function Z$2(i){return i instanceof Tr$2?i.nativeElement:i}var Pi$3=new S$1("cdk-input-modality-detector-options"),Vi$2={ignoreKeys:[18,17,224,91,16]},Ni$1=650,vn$2={passive:true,capture:true},Li$2=(()=>{class i{_platform=T$3(x$1);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Rn$3(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(n=>n===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=H$2(t));};_onMousedown=t=>{Date.now()-this._lastTouchMs<Ni$1||(this._modality.next($t$1(t)?"keyboard":"mouse"),this._mostRecentTarget=H$2(t));};_onTouchstart=t=>{if(Xt$2(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=H$2(t);};constructor(){let t=T$3(ue$1),n=T$3(ir$3),o=T$3(Pi$3,{optional:true});if(this._options=w$3(w$3({},Vi$2),o),this.modalityDetected=this._modality.pipe(Hl(1)),this.modalityChanged=this.modalityDetected.pipe(Fl()),this._platform.isBrowser){let r=T$3(vr$3).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[r.listen(n,"keydown",this._onKeydown,vn$2),r.listen(n,"mousedown",this._onMousedown,vn$2),r.listen(n,"touchstart",this._onTouchstart,vn$2)]);}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t());}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),Zt$2=(function(i){return i[i.IMMEDIATE=0]="IMMEDIATE",i[i.EVENTUAL=1]="EVENTUAL",i})(Zt$2||{}),Bi$2=new S$1("cdk-focus-monitor-default-options"),ve$2=Pt$4({passive:true,capture:true}),yn$2=(()=>{class i{_ngZone=T$3(ue$1);_platform=T$3(x$1);_inputModalityDetector=T$3(Li$2);_origin=null;_lastFocusOrigin=null;_windowFocused=false;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=false;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=true,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=false);};_document=T$3(ir$3);_stopInputModalityDetector=new ne$2;constructor(){let t=T$3(Bi$2,{optional:true});this._detectionMode=t?.detectionMode||Zt$2.IMMEDIATE;}_rootNodeFocusAndBlurListener=t=>{let n=H$2(t);for(let o=n;o;o=o.parentElement)t.type==="focus"?this._onFocus(t,o):this._onBlur(t,o);};monitor(t,n=false){let o=Z$2(t);if(!this._platform.isBrowser||o.nodeType!==1)return ag();let r=_n$1(o)||this._document,a=this._elementInfo.get(o);if(a)return n&&(a.checkChildren=true),a.subject;let l={checkChildren:n,subject:new ne$2,rootNode:r};return this._elementInfo.set(o,l),this._registerGlobalListeners(l),l.subject}stopMonitoring(t){let n=Z$2(t),o=this._elementInfo.get(n);o&&(o.subject.complete(),this._setClasses(n),this._elementInfo.delete(n),this._removeGlobalListeners(o));}focusVia(t,n,o){let r=Z$2(t),a=this._document.activeElement;r===a?this._getClosestElementsInfo(r).forEach(([l,d])=>this._originChanged(l,n,d)):(this._setOrigin(n),typeof r.focus=="function"&&r.focus(o));}ngOnDestroy(){this._elementInfo.forEach((t,n)=>this.stopMonitoring(n));}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===Zt$2.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,n){t.classList.toggle("cdk-focused",!!n),t.classList.toggle("cdk-touch-focused",n==="touch"),t.classList.toggle("cdk-keyboard-focused",n==="keyboard"),t.classList.toggle("cdk-mouse-focused",n==="mouse"),t.classList.toggle("cdk-program-focused",n==="program");}_setOrigin(t,n=false){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&n,this._detectionMode===Zt$2.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?Ni$1:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o);}});}_onFocus(t,n){let o=this._elementInfo.get(n),r=H$2(t);!o||!o.checkChildren&&n!==r||this._originChanged(n,this._getFocusOrigin(r),o);}_onBlur(t,n){let o=this._elementInfo.get(n);!o||o.checkChildren&&t.relatedTarget instanceof Node&&n.contains(t.relatedTarget)||(this._setClasses(n),this._emitOrigin(o,null));}_emitOrigin(t,n){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(n));}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let n=t.rootNode,o=this._rootNodeFocusListenerCount.get(n)||0;o||this._ngZone.runOutsideAngular(()=>{n.addEventListener("focus",this._rootNodeFocusAndBlurListener,ve$2),n.addEventListener("blur",this._rootNodeFocusAndBlurListener,ve$2);}),this._rootNodeFocusListenerCount.set(n,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener);}),this._inputModalityDetector.modalityDetected.pipe(Rg(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,true);}));}_removeGlobalListeners(t){let n=t.rootNode;if(this._rootNodeFocusListenerCount.has(n)){let o=this._rootNodeFocusListenerCount.get(n);o>1?this._rootNodeFocusListenerCount.set(n,o-1):(n.removeEventListener("focus",this._rootNodeFocusAndBlurListener,ve$2),n.removeEventListener("blur",this._rootNodeFocusAndBlurListener,ve$2),this._rootNodeFocusListenerCount.delete(n));}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId));}_originChanged(t,n,o){this._setClasses(t,n),this._emitOrigin(o,n),this._lastFocusOrigin=n;}_getClosestElementsInfo(t){let n=[];return this._elementInfo.forEach((o,r)=>{(r===t||o.checkChildren&&r.contains(t))&&n.push([r,o]);}),n}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:n,mostRecentModality:o}=this._inputModalityDetector;if(o!=="mouse"||!n||n===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return  false;let r=t.labels;if(r){for(let a=0;a<r.length;a++)if(r[a].contains(n))return  true}return  false}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var ye$2=new WeakMap,K$4=(()=>{class i{_appRef;_injector=T$3(le$2);_environmentInjector=T$3(ce$3);load(t){let n=this._appRef=this._appRef||this._injector.get(Fi$3),o=ye$2.get(n);o||(o={loaders:new Set,refs:[]},ye$2.set(n,o),n.onDestroy(()=>{ye$2.get(n)?.refs.forEach(r=>r.destroy()),ye$2.delete(n);})),o.loaders.has(t)||(o.loaders.add(t),o.refs.push(jF(t,{environmentInjector:this._environmentInjector})));}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var Ce$2=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(n,o){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2})}return i})(),xe$1;function xr(){if(xe$1===void 0&&(xe$1=null,typeof window<"u")){let i=window;i.trustedTypes!==void 0&&(xe$1=i.trustedTypes.createPolicy("angular#components",{createHTML:e=>e}));}return xe$1}function Cr(i){return xr()?.createHTML(i)||i}function zi$2(i,e,t){let n=t.sanitize(br$2.HTML,e);i.innerHTML=Cr(n||"");}function wr(i){if(i.type==="characterData"&&i.target instanceof Comment)return  true;if(i.type==="childList"){for(let e=0;e<i.addedNodes.length;e++)if(!(i.addedNodes[e]instanceof Comment))return  false;for(let e=0;e<i.removedNodes.length;e++)if(!(i.removedNodes[e]instanceof Comment))return  false;return  true}return  false}var Er=(()=>{class i{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),Dr=(()=>{class i{_mutationObserverFactory=T$3(Er);_observedElements=new Map;_ngZone=T$3(ue$1);ngOnDestroy(){this._observedElements.forEach((t,n)=>this._cleanupObserver(n));}observe(t){let n=Z$2(t);return new N$2(o=>{let a=this._observeElement(n).pipe(Me$3(l=>l.filter(d=>!wr(d))),Xt$3(l=>!!l.length)).subscribe(l=>{this._ngZone.run(()=>{o.next(l);});});return ()=>{a.unsubscribe(),this._unobserveElement(n);}})}_observeElement(t){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(t))this._observedElements.get(t).count++;else {let n=new ne$2,o=this._mutationObserverFactory.create(r=>n.next(r));o&&o.observe(t,{characterData:true,childList:true,subtree:true}),this._observedElements.set(t,{observer:o,stream:n,count:1});}return this._observedElements.get(t).stream})}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t));}_cleanupObserver(t){if(this._observedElements.has(t)){let{observer:n,stream:o}=this._observedElements.get(t);n&&n.disconnect(),o.complete(),this._observedElements.delete(t);}}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),Ll=(()=>{class i{_contentObserver=T$3(Dr);_elementRef=T$3(Tr$2);event=new qe$3;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._disabled?this._unsubscribe():this._subscribe();}_disabled=false;get debounce(){return this._debounce}set debounce(t){this._debounce=_e$2(t),this._subscribe();}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe();}ngOnDestroy(){this._unsubscribe();}_subscribe(){this._unsubscribe();let t=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?t.pipe(Cg(this.debounce)):t).subscribe(this.event);}_unsubscribe(){this._currentSubscription?.unsubscribe();}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",PF],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return i})();var Hi$3=(()=>{class i{_platform=T$3(x$1);isDisabled(t){return t.hasAttribute("disabled")}isVisible(t){return Mr(t)&&getComputedStyle(t).visibility==="visible"}isTabbable(t){if(!this._platform.isBrowser)return  false;let n=Sr(Pr(t));if(n&&(ji$1(n)===-1||!this.isVisible(n)))return  false;let o=t.nodeName.toLowerCase(),r=ji$1(t);return t.hasAttribute("contenteditable")?r!==-1:o==="iframe"||o==="object"||this._platform.WEBKIT&&this._platform.IOS&&!Ir(t)?false:o==="audio"?t.hasAttribute("controls")?r!==-1:false:o==="video"?r===-1?false:r!==null?true:this._platform.FIREFOX||t.hasAttribute("controls"):t.tabIndex>=0}isFocusable(t,n){return Tr(t)&&!this.isDisabled(t)&&(n?.ignoreVisibility||this.isVisible(t))}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function Sr(i){try{return i.frameElement}catch(e){return null}}function Mr(i){return !!(i.offsetWidth||i.offsetHeight||typeof i.getClientRects=="function"&&i.getClientRects().length)}function Ar(i){let e=i.nodeName.toLowerCase();return e==="input"||e==="select"||e==="button"||e==="textarea"}function Or(i){return Fr(i)&&i.type=="hidden"}function Rr(i){return kr(i)&&i.hasAttribute("href")}function Fr(i){return i.nodeName.toLowerCase()=="input"}function kr(i){return i.nodeName.toLowerCase()=="a"}function Ui$1(i){if(!i.hasAttribute("tabindex")||i.tabIndex===void 0)return  false;let e=i.getAttribute("tabindex");return !!(e&&!isNaN(parseInt(e,10)))}function ji$1(i){if(!Ui$1(i))return null;let e=parseInt(i.getAttribute("tabindex")||"",10);return isNaN(e)?-1:e}function Ir(i){let e=i.nodeName.toLowerCase(),t=e==="input"&&i.type;return t==="text"||t==="password"||e==="select"||e==="textarea"}function Tr(i){return Or(i)?false:Ar(i)||Rr(i)||i.hasAttribute("contenteditable")||Ui$1(i)}function Pr(i){return i.ownerDocument&&i.ownerDocument.defaultView||window}var we$3=class we{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=false;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(e){this._enabled=e,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(e,this._startAnchor),this._toggleAnchorTabIndex(e,this._endAnchor));}_enabled=true;constructor(e,t,n,o,r=false,a){this._element=e,this._checker=t,this._ngZone=n,this._document=o,this._injector=a,r||this.attachAnchors();}destroy(){let e=this._startAnchor,t=this._endAnchor;e&&(e.removeEventListener("focus",this.startAnchorListener),e.remove()),t&&(t.removeEventListener("focus",this.endAnchorListener),t.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=false;}attachAnchors(){return this._hasAttached?true:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener));}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=true),this._hasAttached)}focusInitialElementWhenReady(e){return new Promise(t=>{this._executeOnStable(()=>t(this.focusInitialElement(e)));})}focusFirstTabbableElementWhenReady(e){return new Promise(t=>{this._executeOnStable(()=>t(this.focusFirstTabbableElement(e)));})}focusLastTabbableElementWhenReady(e){return new Promise(t=>{this._executeOnStable(()=>t(this.focusLastTabbableElement(e)));})}_getRegionBoundary(e){let t=this._element.querySelectorAll(`[cdk-focus-region-${e}], [cdkFocusRegion${e}], [cdk-focus-${e}]`);return e=="start"?t.length?t[0]:this._getFirstTabbableElement(this._element):t.length?t[t.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(e){let t=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(t){if(!this._checker.isFocusable(t)){let n=this._getFirstTabbableElement(t);return n?.focus(e),!!n}return t.focus(e),true}return this.focusFirstTabbableElement(e)}focusFirstTabbableElement(e){let t=this._getRegionBoundary("start");return t&&t.focus(e),!!t}focusLastTabbableElement(e){let t=this._getRegionBoundary("end");return t&&t.focus(e),!!t}hasAttached(){return this._hasAttached}_getFirstTabbableElement(e){if(this._checker.isFocusable(e)&&this._checker.isTabbable(e))return e;let t=e.children;for(let n=0;n<t.length;n++){let o=t[n].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(t[n]):null;if(o)return o}return null}_getLastTabbableElement(e){if(this._checker.isFocusable(e)&&this._checker.isTabbable(e))return e;let t=e.children;for(let n=t.length-1;n>=0;n--){let o=t[n].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(t[n]):null;if(o)return o}return null}_createAnchor(){let e=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,e),e.classList.add("cdk-visually-hidden"),e.classList.add("cdk-focus-trap-anchor"),e.setAttribute("aria-hidden","true"),e}_toggleAnchorTabIndex(e,t){e?t.setAttribute("tabindex","0"):t.removeAttribute("tabindex");}toggleAnchors(e){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(e,this._startAnchor),this._toggleAnchorTabIndex(e,this._endAnchor));}_executeOnStable(e){Wf(e,{injector:this._injector});}},Vr=(()=>{class i{_checker=T$3(Hi$3);_ngZone=T$3(ue$1);_document=T$3(ir$3);_injector=T$3(le$2);constructor(){T$3(K$4).load(Ce$2);}create(t,n=false){return new we$3(t,this._checker,this._ngZone,this._document,n,this._injector)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var Wi$2=new S$1("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),Gi$2=new S$1("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),Nr=0,Lr=(()=>{class i{_ngZone=T$3(ue$1);_defaultOptions=T$3(Gi$2,{optional:true});_liveElement;_document=T$3(ir$3);_sanitizer=T$3(Kr$1);_previousTimeout;_currentPromise;_currentResolve;constructor(){let t=T$3(Wi$2,{optional:true});this._liveElement=t||this._createLiveElement();}announce(t,...n){let o=this._defaultOptions,r,a;return n.length===1&&typeof n[0]=="number"?a=n[0]:[r,a]=n,this.clear(),clearTimeout(this._previousTimeout),r||(r=o&&o.politeness?o.politeness:"polite"),a==null&&o&&(a=o.duration),this._liveElement.setAttribute("aria-live",r),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(l=>this._currentResolve=l)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!t||typeof t=="string"?this._liveElement.textContent=t:zi$2(this._liveElement,t,this._sanitizer),typeof a=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="");}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;}_createLiveElement(){let t="cdk-live-announcer-element",n=this._document.getElementsByClassName(t),o=this._document.createElement("div");for(let r=0;r<n.length;r++)n[r].remove();return o.classList.add(t),o.classList.add("cdk-visually-hidden"),o.setAttribute("aria-atomic","true"),o.setAttribute("aria-live","polite"),o.id=`cdk-live-announcer-${Nr++}`,this._document.body.appendChild(o),o}_exposeAnnouncerToModals(t){let n=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let o=0;o<n.length;o++){let r=n[o],a=r.getAttribute("aria-owns");a?a.indexOf(t)===-1&&r.setAttribute("aria-owns",a+" "+t):r.setAttribute("aria-owns",t);}}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var Br=200,Ee$1=class Ee{_letterKeyStream=new ne$2;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new ne$2;selectedItem=this._selectedItem;constructor(e,t){let n=typeof t?.debounceInterval=="number"?t.debounceInterval:Br;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(e),this._setupKeyHandler(n);}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete();}setCurrentSelectedItemIndex(e){this._selectedItemIndex=e;}setItems(e){this._items=e;}handleKey(e){let t=e.keyCode;e.key&&e.key.length===1?this._letterKeyStream.next(e.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t));}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[];}_setupKeyHandler(e){this._letterKeyStream.pipe($l(t=>this._pressedLetters.push(t)),Cg(e),Xt$3(()=>this._pressedLetters.length>0),Me$3(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(t=>{for(let n=1;n<this._items.length+1;n++){let o=(this._selectedItemIndex+n)%this._items.length,r=this._items[o];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(r);break}}this._pressedLetters=[];});}};function De$2(i,...e){return e.length?e.some(t=>i[t]):i.altKey||i.shiftKey||i.ctrlKey||i.metaKey}var Vt$3=class Vt{_items;_activeItemIndex=Fe$3(-1);_activeItem=Fe$3(null);_wrap=false;_typeaheadSubscription=G$2.EMPTY;_itemChangesSubscription;_vertical=true;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=false;_pageUpAndDown={enabled:false,delta:10};_effectRef;_typeahead;_skipPredicateFn=e=>e.disabled;constructor(e,t){this._items=e,e instanceof si$1?this._itemChangesSubscription=e.changes.subscribe(n=>this._itemsChanged(n.toArray())):ar$4(e)&&(this._effectRef=pa$2(()=>this._itemsChanged(e()),{injector:t}));}tabOut=new ne$2;change=new ne$2;skipPredicate(e){return this._skipPredicateFn=e,this}withWrap(e=true){return this._wrap=e,this}withVerticalOrientation(e=true){return this._vertical=e,this}withHorizontalOrientation(e){return this._horizontal=e,this}withAllowedModifierKeys(e){return this._allowedModifierKeys=e,this}withTypeAhead(e=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new Ee$1(t,{debounceInterval:typeof e=="number"?e:void 0,skipPredicate:n=>this._skipPredicateFn(n)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(n=>{this.setActiveItem(n);}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(e=true){return this._homeAndEnd=e,this}withPageUpDown(e=true,t=10){return this._pageUpAndDown={enabled:e,delta:t},this}setActiveItem(e){let t=this._activeItem();this.updateActiveItem(e),this._activeItem()!==t&&this.change.next(this._activeItemIndex());}onKeydown(e){let t=e.keyCode,o=["altKey","ctrlKey","metaKey","shiftKey"].every(r=>!e[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(r<a?r:a-1,-1);break}else return;default:(o||De$2(e,"shiftKey"))&&this._typeahead?.handleKey(e);return}this._typeahead?.reset(),e.preventDefault();}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return !!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1);}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1);}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1);}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1);}updateActiveItem(e){let t=this._getItemsArray(),n=typeof e=="number"?e:t.indexOf(e),o=t[n];this._activeItem.set(o??null),this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n);}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete();}_setActiveItemByDelta(e){this._wrap?this._setActiveInWrapMode(e):this._setActiveInDefaultMode(e);}_setActiveInWrapMode(e){let t=this._getItemsArray();for(let n=1;n<=t.length;n++){let o=(this._activeItemIndex()+e*n+t.length)%t.length,r=t[o];if(!this._skipPredicateFn(r)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(e){this._setActiveItemByIndex(this._activeItemIndex()+e,e);}_setActiveItemByIndex(e,t){let n=this._getItemsArray();if(n[e]){for(;this._skipPredicateFn(n[e]);)if(e+=t,!n[e])return;this.setActiveItem(e);}}_getItemsArray(){return ar$4(this._items)?this._items():this._items instanceof si$1?this._items.toArray():this._items}_itemsChanged(e){this._typeahead?.setItems(e);let t=this._activeItem();if(t){let n=e.indexOf(t);n>-1&&n!==this._activeItemIndex()&&(this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n));}}};var xn$2=class xn extends Vt$3{setActiveItem(e){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(e),this.activeItem&&this.activeItem.setActiveStyles();}};var Cn$2=class Cn extends Vt$3{_origin="program";setFocusOrigin(e){return this._origin=e,this}setActiveItem(e){super.setActiveItem(e),this.activeItem&&this.activeItem.focus(this._origin);}};var Yi$2=new Map,ut$3=class i{_appId=T$3(da$2);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(e,t=false){this._appId!=="ng"&&(e+=this._appId);let n=Yi$2.get(e);return n===void 0?n=0:n++,Yi$2.set(e,n),`${e}${t?i._infix+"-":""}${n}`}static \u0275fac=function(t){return new(t||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})};var Xi$2=" ";function zr(i,e,t){let n=Me$2(i,e);t=t.trim(),!n.some(o=>o.trim()===t)&&(n.push(t),i.setAttribute(e,n.join(Xi$2)));}function jr(i,e,t){let n=Me$2(i,e);t=t.trim();let o=n.filter(r=>r!==t);o.length?i.setAttribute(e,o.join(Xi$2)):i.removeAttribute(e);}function Me$2(i,e){return i.getAttribute(e)?.match(/\S+/g)??[]}var qi$2="cdk-describedby-message",Se$3="cdk-describedby-host",En$1=0,Ld=(()=>{class i{_platform=T$3(x$1);_document=T$3(ir$3);_messageRegistry=new Map;_messagesContainer=null;_id=`${En$1++}`;constructor(){T$3(K$4).load(Ce$2),this._id=T$3(da$2)+"-"+En$1++;}describe(t,n,o){if(!this._canBeDescribed(t,n))return;let r=wn$2(n,o);typeof n!="string"?($i$2(n,this._id),this._messageRegistry.set(r,{messageElement:n,referenceCount:0})):this._messageRegistry.has(r)||this._createMessageElement(n,o),this._isElementDescribedByMessage(t,r)||this._addMessageReference(t,r);}removeDescription(t,n,o){if(!n||!this._isElementNode(t))return;let r=wn$2(n,o);if(this._isElementDescribedByMessage(t,r)&&this._removeMessageReference(t,r),typeof n=="string"){let a=this._messageRegistry.get(r);a&&a.referenceCount===0&&this._deleteMessageElement(r);}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null);}ngOnDestroy(){let t=this._document.querySelectorAll(`[${Se$3}="${this._id}"]`);for(let n=0;n<t.length;n++)this._removeCdkDescribedByReferenceIds(t[n]),t[n].removeAttribute(Se$3);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear();}_createMessageElement(t,n){let o=this._document.createElement("div");$i$2(o,this._id),o.textContent=t,n&&o.setAttribute("role",n),this._createMessagesContainer(),this._messagesContainer.appendChild(o),this._messageRegistry.set(wn$2(t,n),{messageElement:o,referenceCount:0});}_deleteMessageElement(t){this._messageRegistry.get(t)?.messageElement?.remove(),this._messageRegistry.delete(t);}_createMessagesContainer(){if(this._messagesContainer)return;let t="cdk-describedby-message-container",n=this._document.querySelectorAll(`.${t}[platform="server"]`);for(let r=0;r<n.length;r++)n[r].remove();let o=this._document.createElement("div");o.style.visibility="hidden",o.classList.add(t),o.classList.add("cdk-visually-hidden"),this._platform.isBrowser||o.setAttribute("platform","server"),this._document.body.appendChild(o),this._messagesContainer=o;}_removeCdkDescribedByReferenceIds(t){let n=Me$2(t,"aria-describedby").filter(o=>o.indexOf(qi$2)!=0);t.setAttribute("aria-describedby",n.join(" "));}_addMessageReference(t,n){let o=this._messageRegistry.get(n);zr(t,"aria-describedby",o.messageElement.id),t.setAttribute(Se$3,this._id),o.referenceCount++;}_removeMessageReference(t,n){let o=this._messageRegistry.get(n);o.referenceCount--,jr(t,"aria-describedby",o.messageElement.id),t.removeAttribute(Se$3);}_isElementDescribedByMessage(t,n){let o=Me$2(t,"aria-describedby"),r=this._messageRegistry.get(n),a=r&&r.messageElement.id;return !!a&&o.indexOf(a)!=-1}_canBeDescribed(t,n){if(!this._isElementNode(t))return  false;if(n&&typeof n=="object")return  true;let o=n==null?"":`${n}`.trim(),r=t.getAttribute("aria-label");return o?!r||r.trim()!==o:false}_isElementNode(t){return t.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function wn$2(i,e){return typeof i=="string"?`${e||""}/${i}`:i}function $i$2(i,e){i.id||(i.id=`${qi$2}-${e}-${En$1++}`);}var Hr=new S$1("cdk-dir-doc",{providedIn:"root",factory:()=>T$3(ir$3)}),Ur=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Zi$2(i){let e=i?.toLowerCase()||"";return e==="auto"&&typeof navigator<"u"&&navigator?.language?Ur.test(navigator.language)?"rtl":"ltr":e==="rtl"?"rtl":"ltr"}var pt$2=(()=>{class i{get value(){return this.valueSignal()}valueSignal=Fe$3("ltr");change=new qe$3;constructor(){let t=T$3(Hr,{optional:true});if(t){let n=t.body?t.body.dir:null,o=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(Zi$2(n||o||"ltr"));}}ngOnDestroy(){this.change.complete();}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function M$3(i){return i==null?"":typeof i=="string"?i:`${i}px`}function Ki$2(i){return i!=null&&`${i}`!="false"}var it$2=(function(i){return i[i.NORMAL=0]="NORMAL",i[i.NEGATED=1]="NEGATED",i[i.INVERTED=2]="INVERTED",i})(it$2||{}),Ae$1,Dt$3;function Oe$3(){if(Dt$3==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Dt$3=false,Dt$3;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Dt$3=true;else {let i=Element.prototype.scrollTo;i?Dt$3=!/\{\s*\[native code\]\s*\}/.test(i.toString()):Dt$3=false;}}return Dt$3}function Nt$2(){if(typeof document!="object"||!document)return it$2.NORMAL;if(Ae$1==null){let i=document.createElement("div"),e=i.style;i.dir="rtl",e.width="1px",e.overflow="auto",e.visibility="hidden",e.pointerEvents="none",e.position="absolute";let t=document.createElement("div"),n=t.style;n.width="2px",n.height="1px",i.appendChild(t),document.body.appendChild(i),Ae$1=it$2.NORMAL,i.scrollLeft===0&&(i.scrollLeft=1,Ae$1=i.scrollLeft===0?it$2.NEGATED:it$2.INVERTED),i.remove();}return Ae$1}function Dn$1(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Lt$2,Qi$2=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function nc(){if(Lt$2)return Lt$2;if(typeof document!="object"||!document)return Lt$2=new Set(Qi$2),Lt$2;let i=document.createElement("input");return Lt$2=new Set(Qi$2.filter(e=>(i.setAttribute("type",e),i.type===e))),Lt$2}var Sn$1=class Sn{_box;_destroyed=new ne$2;_resizeSubject=new ne$2;_resizeObserver;_elementObservables=new Map;constructor(e){this._box=e,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)));}observe(e){return this._elementObservables.has(e)||this._elementObservables.set(e,new N$2(t=>{let n=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(e,{box:this._box}),()=>{this._resizeObserver?.unobserve(e),n.unsubscribe(),this._elementObservables.delete(e);}}).pipe(Xt$3(t=>t.some(n=>n.target===e)),Ag({bufferSize:1,refCount:true}),Rg(this._destroyed))),this._elementObservables.get(e)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear();}},Ji$1=(()=>{class i{_cleanupErrorListener;_observers=new Map;_ngZone=T$3(ue$1);constructor(){}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.();}observe(t,n){let o=n?.box||"content-box";return this._observers.has(o)||this._observers.set(o,new Sn$1(o)),this._observers.get(o).observe(t)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var Wr=new S$1("MATERIAL_ANIMATIONS"),to$1=null;function Gr(){return T$3(Wr,{optional:true})?.animationsDisabled||T$3(Im,{optional:true})==="NoopAnimations"?"di-disabled":(to$1??=T$3(be$2).matchMedia("(prefers-reduced-motion)").matches,to$1?"reduced-motion":"enabled")}function gt$3(){return Gr()!=="enabled"}var Yr$1=["notch"],$r=["*"],eo$2=["iconPrefixContainer"],no$1=["textPrefixContainer"],io$1=["iconSuffixContainer"],oo$1=["textSuffixContainer"],Xr$1=["textField"],qr=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],Zr$1=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function Kr(i,e){i&1&&Xp(0,"span",21);}function Qr$1(i,e){if(i&1&&(wi$1(0,"label",20),uD(1,1),ZE(2,Kr,1,0,"span",21),Hc()),i&2){let t=aD(2);Jp("floating",t._shouldLabelFloat())("monitorResize",t._hasOutline())("id",t._labelId),Kp("for",t._control.disableAutomaticLabeling?null:t._control.id),Hv(2),YE(!t.hideRequiredMarker&&t._control.required?2:-1);}}function Jr$1(i,e){if(i&1&&ZE(0,Qr$1,3,5,"label",20),i&2){let t=aD();YE(t._hasFloatingLabel()?0:-1);}}function ta(i,e){i&1&&Xp(0,"div",7);}function ea(i,e){}function na(i,e){if(i&1&&Gp(0,ea,0,0,"ng-template",13),i&2){aD(2);let t=gD(1);Jp("ngTemplateOutlet",t);}}function ia(i,e){if(i&1&&(wi$1(0,"div",9),ZE(1,na,1,1,null,13),Hc()),i&2){let t=aD();Jp("matFormFieldNotchedOutlineOpen",t._shouldLabelFloat()),Hv(),YE(t._forceDisplayInfixLabel()?-1:1);}}function oa$1(i,e){i&1&&(wi$1(0,"div",10,2),uD(2,2),Hc());}function ra(i,e){i&1&&(wi$1(0,"div",11,3),uD(2,3),Hc());}function aa(i,e){}function sa$1(i,e){if(i&1&&Gp(0,aa,0,0,"ng-template",13),i&2){aD();let t=gD(1);Jp("ngTemplateOutlet",t);}}function la$1(i,e){i&1&&(wi$1(0,"div",14,4),uD(2,4),Hc());}function da$1(i,e){i&1&&(wi$1(0,"div",15,5),uD(2,5),Hc());}function ca$1(i,e){i&1&&Xp(0,"div",16);}function ua$1(i,e){i&1&&(wi$1(0,"div",18),uD(1,6),Hc());}function ma$1(i,e){if(i&1&&(wi$1(0,"mat-hint",22),FD(1),Hc()),i&2){let t=aD(2);Jp("id",t._hintLabelId),Hv(),Dh(t.hintLabel);}}function fa$1(i,e){if(i&1&&(wi$1(0,"div",19),ZE(1,ma$1,2,2,"mat-hint",22),uD(2,7),Xp(3,"div",23),uD(4,8),Hc()),i&2){let t=aD();Hv(),YE(t.hintLabel?1:-1);}}var Mn$1=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["mat-label"]]})}return i})(),mo$2=new S$1("MatError"),ha$1=(()=>{class i{id=T$3(ut$3).getId("mat-mdc-error-");static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["mat-error"],["","matError",""]],hostAttrs:[1,"mat-mdc-form-field-error","mat-mdc-form-field-bottom-align"],hostVars:1,hostBindings:function(n,o){n&2&&rh("id",o.id);},inputs:{id:"id"},features:[zD([{provide:mo$2,useExisting:i}])]})}return i})(),An$1=(()=>{class i{align="start";id=T$3(ut$3).getId("mat-mdc-hint-");static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(n,o){n&2&&(rh("id",o.id),Kp("align",null),gh("mat-mdc-form-field-hint-end",o.align==="end"));},inputs:{align:"align",id:"id"}})}return i})(),pa$1=new S$1("MatPrefix");var ga$1=new S$1("MatSuffix");var fo$2=new S$1("FloatingLabelParent"),ro$2=(()=>{class i{_elementRef=T$3(Tr$2);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=T$3(Ji$1);_ngZone=T$3(ue$1);_parent=T$3(fo$2);_resizeSubscription=new G$2;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return ba$1(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(n,o){n&2&&gh("mdc-floating-label--float-above",o.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return i})();function ba$1(i){let e=i;if(e.offsetParent!==null)return e.scrollWidth;let t=e.cloneNode(true);t.style.setProperty("position","absolute"),t.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(t);let n=t.scrollWidth;return t.remove(),n}var ao$2="mdc-line-ripple--active",Re$2="mdc-line-ripple--deactivating",so$1=(()=>{class i{_elementRef=T$3(Tr$2);_cleanupTransitionEnd;constructor(){let t=T$3(ue$1),n=T$3(CI);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=n.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let t=this._elementRef.nativeElement.classList;t.remove(Re$2),t.add(ao$2);}deactivate(){this._elementRef.nativeElement.classList.add(Re$2);}_handleTransitionEnd=t=>{let n=this._elementRef.nativeElement.classList,o=n.contains(Re$2);t.propertyName==="opacity"&&o&&n.remove(ao$2,Re$2);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return i})(),lo$1=(()=>{class i{_elementRef=T$3(Tr$2);_ngZone=T$3(ue$1);open=false;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,n=t.querySelector(".mdc-floating-label");n?(t.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(n.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>n.style.transitionDuration="");}))):t.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(t){let n=this._notch.nativeElement;!this.open||!t?n.style.width="":n.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(t){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${t}px)`);}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(n,o){if(n&1&&lh(Yr$1,5),n&2){let r;fD(r=pD())&&(o._notch=r.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(n,o){n&2&&gh("mdc-notched-outline--notched",o.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:$r,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(n,o){n&1&&(lD(),eh(0,"div",1),Bc(1,"div",2,0),uD(3),$c(),eh(4,"div",3));},encapsulation:2})}return i})(),_a$1=(()=>{class i{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i})}return i})();var va$1=new S$1("MatFormField"),ya$1=new S$1("MAT_FORM_FIELD_DEFAULT_OPTIONS"),co$1="fill",xa="auto",uo$1="fixed",Ca$1="translateY(-50%)",wa$1=(()=>{class i{_elementRef=T$3(Tr$2);_changeDetectorRef=T$3(kF);_platform=T$3(x$1);_idGenerator=T$3(ut$3);_ngZone=T$3(ue$1);_defaults=T$3(ya$1,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=xF("iconPrefixContainer");_textPrefixContainerSignal=xF("textPrefixContainer");_iconSuffixContainerSignal=xF("iconSuffixContainer");_textSuffixContainerSignal=xF("textSuffixContainer");_prefixSuffixContainers=dt$3(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=AF(Mn$1);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=Ki$2(t);}_hideRequiredMarker=false;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||xa}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let n=t||this._defaults?.appearance||co$1;this._appearanceSignal.set(n);}_appearanceSignal=Fe$3(co$1);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||uo$1}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||uo$1;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t;}_destroyed=new ne$2;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=gt$3();constructor(){let t=this._defaults,n=T$3(pt$2);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),pa$2(()=>this._currentDirection=n.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=dt$3(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(t){let n=this._control,o="mat-mdc-form-field-type-";t&&this._elementRef.nativeElement.classList.remove(o+t.controlType),n.controlType&&this._elementRef.nativeElement.classList.add(o+n.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=n.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),this._describedByChanges?.unsubscribe(),this._describedByChanges=n.stateChanges.pipe(Bl([void 0,void 0]),Me$3(()=>[n.errorState,n.userAriaDescribedBy]),Sg(),Xt$3(([[r,a],[l,d]])=>r!==l||a!==d)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),n.ngControl&&n.ngControl.valueChanges&&(this._valueChanges=n.ngControl.valueChanges.pipe(Rg(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Dg(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){let t=this._control.focused;t&&!this._isFocused?(this._isFocused=true,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",t),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",t);}_syncOutlineLabelOffset(){FF({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=dt$3(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(t){let n=this._control?this._control.ngControl:null;return n&&n[t]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&t.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let r=this._hintChildren?this._hintChildren.find(l=>l.align==="start"):null,a=this._hintChildren?this._hintChildren.find(l=>l.align==="end"):null;r?t.push(r.id):this._hintLabel&&t.push(this._hintLabelId),a&&t.push(a.id);}else this._errorChildren&&t.push(...this._errorChildren.map(r=>r.id));let n=this._control.describedByIds,o;if(n){let r=this._describedByIds||t;o=t.concat(n.filter(a=>a&&!r.includes(a)));}else o=t;this._control.setDescribedByIds(o),this._describedByIds=t;}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,n=this._textPrefixContainer?.nativeElement,o=this._iconSuffixContainer?.nativeElement,r=this._textSuffixContainer?.nativeElement,a=t?.getBoundingClientRect().width??0,l=n?.getBoundingClientRect().width??0,d=o?.getBoundingClientRect().width??0,u=r?.getBoundingClientRect().width??0,c=this._currentDirection==="rtl"?"-1":"1",p=`${a+l}px`,T=`calc(${c} * (${p} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,R=`var(--mat-mdc-form-field-label-transform, ${Ca$1} translateX(${T}))`,A=a+l+d+u;return [R,A]}_writeOutlinedLabelStyles(t){if(t!==null){let[n,o]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=n),o!==null&&this._notchedOutline?._setMaxWidth(o);}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let n=t.getRootNode();return n&&n!==t}return document.documentElement.contains(t)}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["mat-form-field"]],contentQueries:function(n,o,r){if(n&1&&(uh(r,o._labelChild,Mn$1,5),ch(r,_a$1,5)(r,pa$1,5)(r,ga$1,5)(r,mo$2,5)(r,An$1,5)),n&2){hD();let a;fD(a=pD())&&(o._formFieldControl=a.first),fD(a=pD())&&(o._prefixChildren=a),fD(a=pD())&&(o._suffixChildren=a),fD(a=pD())&&(o._errorChildren=a),fD(a=pD())&&(o._hintChildren=a);}},viewQuery:function(n,o){if(n&1&&(dh(o._iconPrefixContainerSignal,eo$2,5)(o._textPrefixContainerSignal,no$1,5)(o._iconSuffixContainerSignal,io$1,5)(o._textSuffixContainerSignal,oo$1,5),lh(Xr$1,5)(eo$2,5)(no$1,5)(io$1,5)(oo$1,5)(ro$2,5)(lo$1,5)(so$1,5)),n&2){hD(4);let r;fD(r=pD())&&(o._textField=r.first),fD(r=pD())&&(o._iconPrefixContainer=r.first),fD(r=pD())&&(o._textPrefixContainer=r.first),fD(r=pD())&&(o._iconSuffixContainer=r.first),fD(r=pD())&&(o._textSuffixContainer=r.first),fD(r=pD())&&(o._floatingLabel=r.first),fD(r=pD())&&(o._notchedOutline=r.first),fD(r=pD())&&(o._lineRipple=r.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(n,o){n&2&&gh("mat-mdc-form-field-label-always-float",o._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",o._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",o._hasIconSuffix)("mat-form-field-invalid",o._control.errorState)("mat-form-field-disabled",o._control.disabled)("mat-form-field-autofilled",o._control.autofilled)("mat-form-field-appearance-fill",o.appearance=="fill")("mat-form-field-appearance-outline",o.appearance=="outline")("mat-form-field-hide-placeholder",o._hasFloatingLabel()&&!o._shouldLabelFloat())("mat-primary",o.color!=="accent"&&o.color!=="warn")("mat-accent",o.color==="accent")("mat-warn",o.color==="warn")("ng-untouched",o._shouldForward("untouched"))("ng-touched",o._shouldForward("touched"))("ng-pristine",o._shouldForward("pristine"))("ng-dirty",o._shouldForward("dirty"))("ng-valid",o._shouldForward("valid"))("ng-invalid",o._shouldForward("invalid"))("ng-pending",o._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[zD([{provide:va$1,useExisting:i},{provide:fo$2,useExisting:i}])],ngContentSelectors:Zr$1,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(n,o){if(n&1&&(lD(qr),Gp(0,Jr$1,1,1,"ng-template",null,0,tw),wi$1(2,"div",6,1),ih("click",function(a){return o._control.onContainerClick(a)}),ZE(4,ta,1,0,"div",7),wi$1(5,"div",8),ZE(6,ia,2,2,"div",9),ZE(7,oa$1,3,0,"div",10),ZE(8,ra,3,0,"div",11),wi$1(9,"div",12),ZE(10,sa$1,1,1,null,13),uD(11),Hc(),ZE(12,la$1,3,0,"div",14),ZE(13,da$1,3,0,"div",15),Hc(),ZE(14,ca$1,1,0,"div",16),Hc(),wi$1(15,"div",17),ZE(16,ua$1,2,0,"div",18)(17,fa$1,5,1,"div",19),Hc()),n&2){let r;Hv(2),gh("mdc-text-field--filled",!o._hasOutline())("mdc-text-field--outlined",o._hasOutline())("mdc-text-field--no-label",!o._hasFloatingLabel())("mdc-text-field--disabled",o._control.disabled)("mdc-text-field--invalid",o._control.errorState),Hv(2),YE(!o._hasOutline()&&!o._control.disabled?4:-1),Hv(2),YE(o._hasOutline()?6:-1),Hv(),YE(o._hasIconPrefix?7:-1),Hv(),YE(o._hasTextPrefix?8:-1),Hv(2),YE(!o._hasOutline()||o._forceDisplayInfixLabel()?10:-1),Hv(2),YE(o._hasTextSuffix?12:-1),Hv(),YE(o._hasIconSuffix?13:-1),Hv(),YE(o._hasOutline()?-1:14),Hv(),gh("mat-mdc-form-field-subscript-dynamic-size",o.subscriptSizing==="dynamic");let a=o._getSubscriptMessageType();Hv(),YE((r=a)==="error"?16:r==="hint"?17:-1);}},dependencies:[ro$2,lo$1,rr$3,so$1,An$1],styles:[`.mdc-text-field {
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
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
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
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
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
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
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

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
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
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
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
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
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

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
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
  --mat-mdc-form-field-label-offset-x: -16px;
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
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
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
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
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
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
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
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
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
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
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
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
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
`],encapsulation:2})}return i})();var Q$5=(function(i){return i[i.FADING_IN=0]="FADING_IN",i[i.VISIBLE=1]="VISIBLE",i[i.FADING_OUT=2]="FADING_OUT",i[i.HIDDEN=3]="HIDDEN",i})(Q$5||{}),On$1=class On{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Q$5.HIDDEN;constructor(e,t,n,o=false){this._renderer=e,this.element=t,this.config=n,this._animationForciblyDisabledThroughCss=o;}fadeOut(){this._renderer.fadeOutRipple(this);}},ho$2=Pt$4({passive:true,capture:true}),Rn$1=class Rn{_events=new Map;addHandler(e,t,n,o){let r=this._events.get(t);if(r){let a=r.get(n);a?a.add(o):r.set(n,new Set([o]));}else this._events.set(t,new Map([[n,new Set([o])]])),e.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,ho$2);});}removeHandler(e,t,n){let o=this._events.get(e);if(!o)return;let r=o.get(t);r&&(r.delete(n),r.size===0&&o.delete(t),o.size===0&&(this._events.delete(e),document.removeEventListener(e,this._delegateEventHandler,ho$2)));}_delegateEventHandler=e=>{let t=H$2(e);t&&this._events.get(e.type)?.forEach((n,o)=>{(o===t||o.contains(t))&&n.forEach(r=>r.handleEvent(e));});}},Kt$3={enterDuration:225,exitDuration:150},Ea$1=800,po$2=Pt$4({passive:true,capture:true}),go$2=["mousedown","touchstart"],bo$2=["mouseup","mouseleave","touchend","touchcancel"],Da$1=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(n,o){},styles:[`.mat-ripple {
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
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return i})(),Qt$2=class i{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=false;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=false;_containerRect=null;static _eventManager=new Rn$1;constructor(e,t,n,o,r){this._target=e,this._ngZone=t,this._platform=o,o.isBrowser&&(this._containerElement=Z$2(n)),r&&r.get(K$4).load(Da$1);}fadeInRipple(e,t,n={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=w$3(w$3({},Kt$3),n.animation);n.centered&&(e=o.left+o.width/2,t=o.top+o.height/2);let a=n.radius||Sa(e,t,o),l=e-o.left,d=t-o.top,u=r.enterDuration,c=document.createElement("div");c.classList.add("mat-ripple-element"),c.style.left=`${l-a}px`,c.style.top=`${d-a}px`,c.style.height=`${a*2}px`,c.style.width=`${a*2}px`,n.color!=null&&(c.style.backgroundColor=n.color),c.style.transitionDuration=`${u}ms`,this._containerElement.appendChild(c);let p=window.getComputedStyle(c),I=p.transitionProperty,T=p.transitionDuration,R=I==="none"||T==="0s"||T==="0s, 0s"||o.width===0&&o.height===0,A=new On$1(this,c,n,R);c.style.transform="scale3d(1, 1, 1)",A.state=Q$5.FADING_IN,n.persistent||(this._mostRecentTransientRipple=A);let _t=null;return !R&&(u||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let Jn=()=>{_t&&(_t.fallbackTimer=null),clearTimeout(ti),this._finishRippleTransition(A);},nn=()=>this._destroyRipple(A),ti=setTimeout(nn,u+100);c.addEventListener("transitionend",Jn),c.addEventListener("transitioncancel",nn),_t={onTransitionEnd:Jn,onTransitionCancel:nn,fallbackTimer:ti};}),this._activeRipples.set(A,_t),(R||!u)&&this._finishRippleTransition(A),A}fadeOutRipple(e){if(e.state===Q$5.FADING_OUT||e.state===Q$5.HIDDEN)return;let t=e.element,n=w$3(w$3({},Kt$3),e.config.animation);t.style.transitionDuration=`${n.exitDuration}ms`,t.style.opacity="0",e.state=Q$5.FADING_OUT,(e._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(e);}fadeOutAll(){this._getActiveRipples().forEach(e=>e.fadeOut());}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(e=>{e.config.persistent||e.fadeOut();});}setupTriggerEvents(e){let t=Z$2(e);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,go$2.forEach(n=>{i._eventManager.addHandler(this._ngZone,n,t,this);}));}handleEvent(e){e.type==="mousedown"?this._onMousedown(e):e.type==="touchstart"?this._onTouchStart(e):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{bo$2.forEach(t=>{this._triggerElement.addEventListener(t,this,po$2);});}),this._pointerUpEventsRegistered=true);}_finishRippleTransition(e){e.state===Q$5.FADING_IN?this._startFadeOutTransition(e):e.state===Q$5.FADING_OUT&&this._destroyRipple(e);}_startFadeOutTransition(e){let t=e===this._mostRecentTransientRipple,{persistent:n}=e.config;e.state=Q$5.VISIBLE,!n&&(!t||!this._isPointerDown)&&e.fadeOut();}_destroyRipple(e){let t=this._activeRipples.get(e)??null;this._activeRipples.delete(e),this._activeRipples.size||(this._containerRect=null),e===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),e.state=Q$5.HIDDEN,t!==null&&(e.element.removeEventListener("transitionend",t.onTransitionEnd),e.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),e.element.remove();}_onMousedown(e){let t=$t$1(e),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Ea$1;!this._target.rippleDisabled&&!t&&!n&&(this._isPointerDown=true,this.fadeInRipple(e.clientX,e.clientY,this._target.rippleConfig));}_onTouchStart(e){if(!this._target.rippleDisabled&&!Xt$2(e)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=true;let t=e.changedTouches;if(t)for(let n=0;n<t.length;n++)this.fadeInRipple(t[n].clientX,t[n].clientY,this._target.rippleConfig);}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=false,this._getActiveRipples().forEach(e=>{let t=e.state===Q$5.VISIBLE||e.config.terminateOnPointerUp&&e.state===Q$5.FADING_IN;!e.config.persistent&&t&&e.fadeOut();}));}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let e=this._triggerElement;e&&(go$2.forEach(t=>i._eventManager.removeHandler(t,e,this)),this._pointerUpEventsRegistered&&(bo$2.forEach(t=>e.removeEventListener(t,this,po$2)),this._pointerUpEventsRegistered=false));}};function Sa(i,e,t){let n=Math.max(Math.abs(i-t.left),Math.abs(i-t.right)),o=Math.max(Math.abs(e-t.top),Math.abs(e-t.bottom));return Math.sqrt(n*n+o*o)}var Fn$1=new S$1("mat-ripple-global-options"),Xc=(()=>{class i{_elementRef=T$3(Tr$2);_animationsDisabled=gt$3();color;unbounded=false;centered=false;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled();}_disabled=false;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled();}_trigger;_rippleRenderer;_globalOptions;_isInitialized=false;constructor(){let t=T$3(ue$1),n=T$3(x$1),o=T$3(Fn$1,{optional:true}),r=T$3(le$2);this._globalOptions=o||{},this._rippleRenderer=new Qt$2(this,t,this._elementRef,n,r);}ngOnInit(){this._isInitialized=true,this._setupTriggerEventsIfEnabled();}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents();}fadeOutAll(){this._rippleRenderer.fadeOutAll();}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent();}get rippleConfig(){return {centered:this.centered,radius:this.radius,color:this.color,animation:w$3(w$3(w$3({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger);}launch(t,n=0,o){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,n,w$3(w$3({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,w$3(w$3({},this.rippleConfig),t))}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(n,o){n&2&&gh("mat-ripple-unbounded",o.unbounded);},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return i})();var Ma={capture:true},Aa$1=["focus","mousedown","mouseenter","touchstart"],kn$1="mat-ripple-loader-uninitialized",In$1="mat-ripple-loader-class-name",_o$2="mat-ripple-loader-centered",Fe$2="mat-ripple-loader-disabled",vo$2=(()=>{class i{_document=T$3(ir$3);_animationsDisabled=gt$3();_globalRippleOptions=T$3(Fn$1,{optional:true});_platform=T$3(x$1);_ngZone=T$3(ue$1);_injector=T$3(le$2);_eventCleanups;_hosts=new Map;constructor(){let t=T$3(vr$3).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>Aa$1.map(n=>t.listen(this._document,n,this._onInteraction,Ma)));}ngOnDestroy(){let t=this._hosts.keys();for(let n of t)this.destroyRipple(n);this._eventCleanups.forEach(n=>n());}configureRipple(t,n){t.setAttribute(kn$1,this._globalRippleOptions?.namespace??""),(n.className||!t.hasAttribute(In$1))&&t.setAttribute(In$1,n.className||""),n.centered&&t.setAttribute(_o$2,""),n.disabled&&t.setAttribute(Fe$2,"");}setDisabled(t,n){let o=this._hosts.get(t);o?(o.target.rippleDisabled=n,!n&&!o.hasSetUpEvents&&(o.hasSetUpEvents=true,o.renderer.setupTriggerEvents(t))):n?t.setAttribute(Fe$2,""):t.removeAttribute(Fe$2);}_onInteraction=t=>{let n=H$2(t);if(n instanceof HTMLElement){let o=n.closest(`[${kn$1}="${this._globalRippleOptions?.namespace??""}"]`);o&&this._createRipple(o);}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let n=this._document.createElement("span");n.classList.add("mat-ripple",t.getAttribute(In$1)),t.append(n);let o=this._globalRippleOptions,r=this._animationsDisabled?0:o?.animation?.enterDuration??Kt$3.enterDuration,a=this._animationsDisabled?0:o?.animation?.exitDuration??Kt$3.exitDuration,l={rippleDisabled:this._animationsDisabled||o?.disabled||t.hasAttribute(Fe$2),rippleConfig:{centered:t.hasAttribute(_o$2),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:a}}},d=new Qt$2(l,this._ngZone,n,this._platform,this._injector),u=!l.rippleDisabled;u&&d.setupTriggerEvents(t),this._hosts.set(t,{target:l,renderer:d,hasSetUpEvents:u}),t.removeAttribute(kn$1);}destroyRipple(t){let n=this._hosts.get(t);n&&(n.renderer._removeTriggerEvents(),this._hosts.delete(t));}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var yo$2=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["structural-styles"]],decls:0,vars:0,template:function(n,o){},styles:[`.mat-focus-indicator {
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
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2})}return i})();var Oa$1=["*",[["","progressIndicator",""]]],Ra$1=["*","[progressIndicator]"];function Fa$1(i,e){i&1&&(Bc(0,"div",1),uD(1,1),$c());}var ka$1=new S$1("MAT_BUTTON_CONFIG");function xo$2(i){return i==null?void 0:LF(i)}var ke$3=(()=>{class i{_elementRef=T$3(Tr$2);_ngZone=T$3(ue$1);_animationsDisabled=gt$3();_config=T$3(ka$1,{optional:true});_focusMonitor=T$3(yn$2);_cleanupClick;_renderer=T$3(CI);_rippleLoader=T$3(vo$2);_isAnchor;_isFab=false;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled();}_disableRipple=false;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled();}_disabled=false;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t;}showProgress=NF(false,{transform:PF});constructor(){T$3(K$4).load(yo$2);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??false,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"});}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,true),this._isAnchor&&this._setupAsAnchor();}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);}focus(t="program",n){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,n):this._elementRef.nativeElement.focus(n);}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?true:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:true}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled);}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());}));}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(n,o){n&2&&(Kp("disabled",o._getDisabledAttribute())("aria-disabled",o._getAriaDisabled())("tabindex",o._getTabIndex()),_D(o.color?"mat-"+o.color:""),gh("mat-mdc-button-progress-indicator-shown",o.showProgress())("mat-mdc-button-disabled",o.disabled)("mat-mdc-button-disabled-interactive",o.disabledInteractive)("mat-unthemed",!o.color)("_mat-animation-noopable",o._animationsDisabled));},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",PF],disabled:[2,"disabled","disabled",PF],ariaDisabled:[2,"aria-disabled","ariaDisabled",PF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",PF],tabIndex:[2,"tabIndex","tabIndex",xo$2],_tabindex:[2,"tabindex","_tabindex",xo$2],showProgress:[1,"showProgress"]}})}return i})(),Ia$1=(()=>{class i extends ke$3{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:true});}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[Wp],ngContentSelectors:Ra$1,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(n,o){n&1&&(lD(Oa$1),eh(0,"span",0),uD(1),ZE(2,Fa$1,2,0,"div",1),eh(3,"span",2)(4,"span",3)),n&2&&(Hv(2),YE(o.showProgress()?2:-1));},styles:[`.mat-mdc-icon-button {
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
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
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
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
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
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
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
`],encapsulation:2})}return i})();var wo$2=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],Eo$2=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function Ta$1(i,e){i&1&&(Bc(0,"div",2),uD(1,3),$c());}function Pa$1(i,e){i&1&&(Bc(0,"div",2),uD(1,3),$c());}var Va$1=`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
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
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  margin-block-start: 0;
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
`,Co$2=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),xu=(()=>{class i extends ke$3{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text");}_appearance=null;constructor(){super();let t=Na$1(this._elementRef.nativeElement);t&&this.setAppearance(t);}setAppearance(t){if(t===this._appearance)return;let n=this._elementRef.nativeElement.classList,o=this._appearance?Co$2.get(this._appearance):null,r=Co$2.get(t);o&&n.remove(...o),n.add(...r),this._appearance=t;}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Wp],ngContentSelectors:Eo$2,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(n,o){n&1&&(lD(wo$2),eh(0,"span",0),uD(1),Bc(2,"span",1),uD(3,1),$c(),uD(4,2),ZE(5,Ta$1,2,0,"div",2),eh(6,"span",3)(7,"span",4)),n&2&&(gh("mdc-button__ripple",!o._isFab)("mdc-fab__ripple",o._isFab),Hv(5),YE(o.showProgress()?5:-1));},styles:[`.mat-mdc-button-base {
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
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
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
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
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
`],encapsulation:2})}return i})();function Na$1(i){return i.hasAttribute("mat-raised-button")?"elevated":i.hasAttribute("mat-stroked-button")?"outlined":i.hasAttribute("mat-flat-button")?"filled":i.hasAttribute("mat-button")?"text":null}var La$1=new S$1("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>Tn$1}),Tn$1={color:"accent"};var Cu=(()=>{class i extends ke$3{_options=T$3(La$1,{optional:true});_isFab=true;constructor(){super(),this._options=this._options||Tn$1,this.color=this._options.color||Tn$1.color;}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["button","mat-mini-fab",""],["a","mat-mini-fab",""],["button","matMiniFab",""],["a","matMiniFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"],exportAs:["matButton","matAnchor"],features:[Wp],ngContentSelectors:Eo$2,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(n,o){n&1&&(lD(wo$2),eh(0,"span",0),uD(1),Bc(2,"span",1),uD(3,1),$c(),uD(4,2),ZE(5,Pa$1,2,0,"div",2),eh(6,"span",3)(7,"span",4)),n&2&&(gh("mdc-button__ripple",!o._isFab)("mdc-fab__ripple",o._isFab),Hv(5),YE(o.showProgress()?5:-1));},styles:[Va$1],encapsulation:2})}return i})();var Io$2=(()=>{class i{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,n){this._renderer=t,this._elementRef=n;}setProperty(t,n){this._renderer.setProperty(this._elementRef.nativeElement,t,n);}registerOnTouched(t){this.onTouched=t;}registerOnChange(t){this.onChange=t;}setDisabledState(t){this.setProperty("disabled",t);}static \u0275fac=function(n){return new(n||i)(Ar$2(CI),Ar$2(Tr$2))};static \u0275dir=CE({type:i})}return i})(),Ba$1=(()=>{class i extends Io$2{static \u0275fac=(()=>{let t;return function(o){return (t||(t=ey(i)))(o||i)}})();static \u0275dir=CE({type:i,features:[Wp]})}return i})(),To$2=new S$1("");var za$1={provide:To$2,useExisting:Eo$3(()=>Po$2),multi:true};function ja$1(){let i=T$2()?T$2().getUserAgent():"";return /android (\d+)/.test(i.toLowerCase())}var Ha=new S$1(""),Po$2=(()=>{class i extends Io$2{_compositionMode;_composing=false;constructor(t,n,o){super(t,n),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!ja$1());}writeValue(t){let n=t??"";this.setProperty("value",n);}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t);}_compositionStart(){this._composing=true;}_compositionEnd(t){this._composing=false,this._compositionMode&&this.onChange(t);}static \u0275fac=function(n){return new(n||i)(Ar$2(CI),Ar$2(Tr$2),Ar$2(Ha,8))};static \u0275dir=CE({type:i,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(n,o){n&1&&ih("input",function(a){return o._handleInput(a.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(a){return o._compositionEnd(a.target.value)});},standalone:false,features:[zD([za$1]),Wp]})}return i})();function Bn$1(i){return i==null||zn$1(i)===0}function zn$1(i){return i==null?null:Array.isArray(i)||typeof i=="string"?i.length:i instanceof Set?i.size:null}var Ue$2=new S$1(""),jn$1=new S$1(""),Ua$1=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Pn$1=class Pn{static min(e){return Wa(e)}static max(e){return Ga(e)}static required(e){return Vo$1(e)}static requiredTrue(e){return Ya(e)}static email(e){return $a(e)}static minLength(e){return Xa(e)}static maxLength(e){return qa(e)}static pattern(e){return Za$1(e)}static nullValidator(e){return Te$1()}static compose(e){return Ho$2(e)}static composeAsync(e){return Uo$2(e)}};function Wa(i){return e=>{if(e.value==null||i==null)return null;let t=parseFloat(e.value);return !isNaN(t)&&t<i?{min:{min:i,actual:e.value}}:null}}function Ga(i){return e=>{if(e.value==null||i==null)return null;let t=parseFloat(e.value);return !isNaN(t)&&t>i?{max:{max:i,actual:e.value}}:null}}function Vo$1(i){return Bn$1(i.value)?{required:true}:null}function Ya(i){return i.value===true?null:{required:true}}function $a(i){return Bn$1(i.value)||Ua$1.test(i.value)?null:{email:true}}function Xa(i){return e=>{let t=e.value?.length??zn$1(e.value);return t===null||t===0?null:t<i?{minlength:{requiredLength:i,actualLength:t}}:null}}function qa(i){return e=>{let t=e.value?.length??zn$1(e.value);return t!==null&&t>i?{maxlength:{requiredLength:i,actualLength:t}}:null}}function Za$1(i){if(!i)return Te$1;let e,t;return typeof i=="string"?(t="",i.charAt(0)!=="^"&&(t+="^"),t+=i,i.charAt(i.length-1)!=="$"&&(t+="$"),e=new RegExp(t)):(t=i.toString(),e=i),n=>{if(Bn$1(n.value))return null;let o=n.value;return e.test(o)?null:{pattern:{requiredPattern:t,actualValue:o}}}}function Te$1(i){return null}function No$2(i){return i!=null}function Lo$2(i){return Fc(i)?Se$4(i):i}function Bo$1(i){let e={};return i.forEach(t=>{e=t!=null?w$3(w$3({},e),t):e;}),Object.keys(e).length===0?null:e}function zo$2(i,e){return e.map(t=>t(i))}function Ka(i){return !i.validate}function jo$2(i){return i.map(e=>Ka(e)?e:t=>e.validate(t))}function Ho$2(i){if(!i)return null;let e=i.filter(No$2);return e.length==0?null:function(t){return Bo$1(zo$2(t,e))}}function Hn$1(i){return i!=null?Ho$2(jo$2(i)):null}function Uo$2(i){if(!i)return null;let e=i.filter(No$2);return e.length==0?null:function(t){let n=zo$2(t,e).map(Lo$2);return Eg(n).pipe(Me$3(Bo$1))}}function Un$1(i){return i!=null?Uo$2(jo$2(i)):null}function Do$2(i,e){return i===null?[e]:Array.isArray(i)?[...i,e]:[i,e]}function Wo$1(i){return i._rawValidators}function Go$1(i){return i._rawAsyncValidators}function Vn$1(i){return i?Array.isArray(i)?i:[i]:[]}function Pe$3(i,e){return Array.isArray(i)?i.includes(e):i===e}function So$2(i,e){let t=Vn$1(e);return Vn$1(i).forEach(o=>{Pe$3(t,o)||t.push(o);}),t}function Mo$1(i,e){return Vn$1(e).filter(t=>!Pe$3(i,t))}var Ve$3=class Ve{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Hn$1(this._rawValidators);}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Un$1(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[];}reset(e=void 0){this.control?.reset(e);}hasError(e,t){return this.control?this.control.hasError(e,t):false}getError(e,t){return this.control?this.control.getError(e,t):null}},St$4=class St extends Ve$3{name;get formDirective(){return null}get path(){return null}};var Jt$2="VALID",Ie$1="INVALID",Bt$2="PENDING",te$2="DISABLED",bt$3=class bt{},Ne$1=class Ne extends bt$3{value;source;constructor(e,t){super(),this.value=e,this.source=t;}},ne$1=class ne extends bt$3{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t;}},ie=class extends bt$3{touched;source;constructor(e,t){super(),this.touched=e,this.source=t;}},zt$3=class zt extends bt$3{status;source;constructor(e,t){super(),this.status=e,this.source=t;}},Le$2=class Le extends bt$3{source;constructor(e){super(),this.source=e;}},jt$2=class jt extends bt$3{source;constructor(e){super(),this.source=e;}};function Yo$1(i){return (We$1(i)?i.validators:i)||null}function Qa$1(i){return Array.isArray(i)?Hn$1(i):i||null}function $o$2(i,e){return (We$1(e)?e.asyncValidators:i)||null}function Ja$1(i){return Array.isArray(i)?Un$1(i):i||null}function We$1(i){return i!=null&&!Array.isArray(i)&&typeof i=="object"}function ts$1(i,e,t){let n=i.controls;if(!(Object.keys(n)).length)throw new b$2(1e3,"");if(!Xo$1(n,t))throw new b$2(1001,"")}function es$1(i,e,t){i._forEachChild((n,o)=>{if(t[o]===void 0)throw new b$2(-1002,"")});}var Be$1=class Be{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=Fe$3(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t);}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e;}get parent(){return this._parent}get status(){return ae$2(this.statusReactive)}set status(e){ae$2(()=>this.statusReactive.set(e));}_status=dt$3(()=>this.statusReactive());statusReactive=Fe$3(void 0);get valid(){return this.status===Jt$2}get invalid(){return this.status===Ie$1}get pending(){return this.status===Bt$2}get disabled(){return this.status===te$2}get enabled(){return this.status!==te$2}errors;get pristine(){return ae$2(this.pristineReactive)}set pristine(e){ae$2(()=>this.pristineReactive.set(e));}_pristine=dt$3(()=>this.pristineReactive());pristineReactive=Fe$3(true);get dirty(){return !this.pristine}get touched(){return ae$2(this.touchedReactive)}set touched(e){ae$2(()=>this.touchedReactive.set(e));}_touched=dt$3(()=>this.touchedReactive());touchedReactive=Fe$3(false);get untouched(){return !this.touched}_events=new ne$2;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e);}setAsyncValidators(e){this._assignAsyncValidators(e);}addValidators(e){this.setValidators(So$2(e,this._rawValidators));}addAsyncValidators(e){this.setAsyncValidators(So$2(e,this._rawAsyncValidators));}removeValidators(e){this.setValidators(Mo$1(e,this._rawValidators));}removeAsyncValidators(e){this.setAsyncValidators(Mo$1(e,this._rawAsyncValidators));}hasValidator(e){return Pe$3(this._rawValidators,e)}hasAsyncValidator(e){return Pe$3(this._rawAsyncValidators,e)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(e={}){let t=this.touched===false;this.touched=true;let n=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched(x$3(w$3({},e),{sourceControl:n})),t&&e.emitEvent!==false&&this._events.next(new ie(true,n));}markAllAsDirty(e={}){this.markAsDirty({onlySelf:true,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e));}markAllAsTouched(e={}){this.markAsTouched({onlySelf:true,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e));}markAsUntouched(e={}){let t=this.touched===true;this.touched=false,this._pendingTouched=false;let n=e.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:true,emitEvent:e.emitEvent,sourceControl:n});}),e.onlySelf||this._parent?._updateTouched(e,n),t&&e.emitEvent!==false&&this._events.next(new ie(false,n));}markAsDirty(e={}){let t=this.pristine===true;this.pristine=false;let n=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty(x$3(w$3({},e),{sourceControl:n})),t&&e.emitEvent!==false&&this._events.next(new ne$1(false,n));}markAsPristine(e={}){let t=this.pristine===false;this.pristine=true,this._pendingDirty=false;let n=e.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:true,emitEvent:e.emitEvent});}),e.onlySelf||this._parent?._updatePristine(e,n),t&&e.emitEvent!==false&&this._events.next(new ne$1(true,n));}markAsPending(e={}){this.status=Bt$2;let t=e.sourceControl??this;e.emitEvent!==false&&(this._events.next(new zt$3(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending(x$3(w$3({},e),{sourceControl:t}));}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=te$2,this.errors=null,this._forEachChild(o=>{o.disable(x$3(w$3({},e),{onlySelf:true}));}),this._updateValue();let n=e.sourceControl??this;e.emitEvent!==false&&(this._events.next(new Ne$1(this.value,n)),this._events.next(new zt$3(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(x$3(w$3({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(o=>o(true));}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Jt$2,this._forEachChild(n=>{n.enable(x$3(w$3({},e),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:e.emitEvent}),this._updateAncestors(x$3(w$3({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(n=>n(false));}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t));}setParent(e){this._parent=e;}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Jt$2||this.status===Bt$2)&&this._runAsyncValidator(n,e.emitEvent);}let t=e.sourceControl??this;e.emitEvent!==false&&(this._events.next(new Ne$1(this.value,t)),this._events.next(new zt$3(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity(x$3(w$3({},e),{sourceControl:t}));}_updateTreeValidity(e={emitEvent:true}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:true,emitEvent:e.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?te$2:Jt$2;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=Bt$2,this._hasOwnPendingAsyncValidator={emitEvent:t!==false,shouldHaveEmitted:e!==false};let n=Lo$2(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:t,shouldHaveEmitted:e});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,e}return  false}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==false,this,t.shouldHaveEmitted);}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((n,o)=>n&&n._find(o),this)}getError(e,t){let n=t?this.get(t):this;return n?.errors?n.errors[e]:null}hasError(e,t){return !!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,n){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||n)&&this._events.next(new zt$3(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,n);}_initObservables(){this.valueChanges=new qe$3,this.statusChanges=new qe$3;}_calculateStatus(){return this._allControlsDisabled()?te$2:this.errors?Ie$1:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Bt$2)?Bt$2:this._anyControlsHaveStatus(Ie$1)?Ie$1:Jt$2}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let n=!this._anyControlsDirty(),o=this.pristine!==n;this.pristine=n,e.onlySelf||this._parent?._updatePristine(e,t),o&&this._events.next(new ne$1(this.pristine,t));}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new ie(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t);}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e;}_setUpdateStrategy(e){We$1(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn);}_parentMarkedDirty(e){return !e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Qa$1(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=Ja$1(this._rawAsyncValidators);}_updateHasRequiredValidator(){ae$2(()=>this._hasRequired.set(this.hasValidator(Pn$1.required)));}};function Xo$1(i,e){return Object.hasOwn(i,e)}function ns$1(i){return i.tagName==="INPUT"||i.tagName==="SELECT"||i.tagName==="TEXTAREA"}function zu(i){if(i.tagName!=="INPUT")return  false;let e=i.type;return e==="number"||e==="range"||e==="date"||e==="month"}function ju(i){return i.tagName==="INPUT"||i.tagName==="TEXTAREA"}function is$1(i,e,t,n){switch(t){case "name":i.setAttribute(e,t,n);break;case "disabled":case "readonly":case "required":n?i.setAttribute(e,t,""):i.removeAttribute(e,t);break;case "max":case "min":case "minLength":case "maxLength":n!==void 0?i.setAttribute(e,t,n.toString()):i.removeAttribute(e,t);break}}var Nn$1=class Nn{kind;context;control;message;constructor({kind:e,context:t,control:n}){this.kind=e,this.context=t,this.control=n;}};var os$1=(()=>{class i{_validator=Te$1;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let n=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):Te$1,this._onChange?.();}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t;}enabled(t){return t!=null}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,features:[Pm]})}return i})();var rs$1={provide:Ue$2,useExisting:Eo$3(()=>qo$1),multi:true};var qo$1=(()=>{class i extends os$1{required;inputName="required";normalizeInput=PF;createValidator=t=>Vo$1;enabled(t){return t}static \u0275fac=(()=>{let t;return function(o){return (t||(t=ey(i)))(o||i)}})();static \u0275dir=CE({type:i,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(n,o){n&2&&Kp("required",o._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[zD([rs$1]),Wp]})}return i})();var as$1=new S$1(""),Ge$1=new S$1("",{factory:()=>Wn$1}),Wn$1="always";function ss$1(i,e){return [...e.path,i]}function Ao$2(i,e,t=Wn$1){Gn$1(i,e),e.valueAccessor.writeValue(i.value),(i.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(i.disabled),ds(i,e),us$1(i,e),cs(i,e),ls$1(i,e);}function Oo$2(i,e,t=true){let n=()=>{};e?.valueAccessor?.registerOnChange(n),e?.valueAccessor?.registerOnTouched(n),je$2(i,e),i&&(e._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}));}function ze$2(i,e){i.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e);});}function ls$1(i,e){if(e.valueAccessor.setDisabledState){let t=n=>{e.valueAccessor.setDisabledState(n);};i.registerOnDisabledChange(t),e._registerOnDestroy(()=>{i._unregisterOnDisabledChange(t);});}}function Gn$1(i,e){let t=Wo$1(i);e.validator!==null?i.setValidators(Do$2(t,e.validator)):typeof t=="function"&&i.setValidators([t]);let n=Go$1(i);e.asyncValidator!==null?i.setAsyncValidators(Do$2(n,e.asyncValidator)):typeof n=="function"&&i.setAsyncValidators([n]);let o=()=>i.updateValueAndValidity();ze$2(e._rawValidators,o),ze$2(e._rawAsyncValidators,o);}function je$2(i,e){let t=false;if(i!==null){if(e.validator!==null){let o=Wo$1(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(a=>a!==e.validator);r.length!==o.length&&(t=true,i.setValidators(r));}}if(e.asyncValidator!==null){let o=Go$1(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(a=>a!==e.asyncValidator);r.length!==o.length&&(t=true,i.setAsyncValidators(r));}}}let n=()=>{};return ze$2(e._rawValidators,n),ze$2(e._rawAsyncValidators,n),t}function ds(i,e){e.valueAccessor.registerOnChange(t=>{i._pendingValue=t,i._pendingChange=true,i._pendingDirty=true,i.updateOn==="change"&&Zo$1(i,e);});}function cs(i,e){e.valueAccessor.registerOnTouched(()=>{i._pendingTouched=true,i.updateOn==="blur"&&i._pendingChange&&Zo$1(i,e),i.updateOn!=="submit"&&i.markAsTouched();});}function Zo$1(i,e){i._pendingDirty&&i.markAsDirty(),i.setValue(i._pendingValue,{emitModelToViewChange:false}),e.viewToModelUpdate(i._pendingValue),i._pendingChange=false;}function us$1(i,e){let t=(n,o)=>{e.valueAccessor.writeValue(n),o&&e.viewToModelUpdate(n);};i.registerOnChange(t),e._registerOnDestroy(()=>{i._unregisterOnChange(t);});}function Ko$1(i,e){Gn$1(i,e);}function ms$1(i,e){return je$2(i,e)}function fs(i,e){if(!i.hasOwnProperty("model"))return  false;let t=i.model;return t.isFirstChange()?true:!Object.is(e,t.currentValue)}function hs(i){return Object.getPrototypeOf(i.constructor)===Ba$1}function Qo$1(i,e){i._syncPendingControls(),e.forEach(t=>{let n=t.control;n.updateOn==="submit"&&n._pendingChange&&(t.viewToModelUpdate(n._pendingValue),n._pendingChange=false);});}function ps$1(i,e){if(!e)return null;let t,n,o;return e.forEach(r=>{r.constructor===Po$2?t=r:hs(r)?n=r:o=r;}),o||n||t||null}function gs(i,e){let t=i.indexOf(e);t>-1&&i.splice(t,1);}var bs={provide:as$1,useFactory:()=>{let i=T$3(Ht$2,{self:true});return {setParseErrors:e=>{i.setParseErrorSource(e);},set onReset(e){i.onReset=e;}}}},Ht$2=class Ht extends Ve$3{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(e){this.userOnReset=e,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof jt$2&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=ps$1(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(e,t,n){super(),this.injector=e,this.renderer=t,this.rawValueAccessors=n,this.injector?.get(Le$3)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let e=this.injector?.get(kF);if(!this.control||!e)return;let t=e.markForCheck.bind(e);this.subscription=new G$2,this.subscription.add(this.control.valueChanges.subscribe(t)),this.subscription.add(this.control.statusChanges.subscribe(t)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(n=>{n instanceof jt$2&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(e){!e.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!e.customControl||(this.isCustomControlBased=true,e.listenToCustomControlModel(o=>{this.control?.setValue(o,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(o);}),e.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=ns$1(e.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(o=>o instanceof qo$1));}ngControlUpdate(e,t){if(!this.isCustomControlBased)return;let n=this.control,o=this.customControlBindings;Object.is(o.value,n.value)||(o.value=n.value,e.setCustomControlModelInput(n.value)),this.bindControlProperty(e,o,"touched",n.touched),this.bindControlProperty(e,o,"dirty",n.dirty),this.bindControlProperty(e,o,"valid",n.valid),this.bindControlProperty(e,o,"invalid",n.invalid),this.bindControlProperty(e,o,"pending",n.pending),this.bindControlProperty(e,o,"disabled",n.disabled),this.shouldBindRequired&&this.bindControlProperty(e,o,"required",this.isRequired);let r=n.errors;if(o.errors!==r){o.errors=r;let a=this._convertErrors(r);e.setInputOnDirectives("errors",a);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(e,t,n,o){if(t[n]===o)return;t[n]=o;let r=e.setInputOnDirectives(n,o);this.isNativeFormElement&&!r&&(n==="disabled"||n==="required")&&this.renderer&&is$1(this.renderer,e.nativeElement,n,o);}_convertErrors(e){if(e===null)return [];let t=this.control;return Object.entries(e).map(([n,o])=>new Nn$1({context:o,kind:n,control:t}))}setParseErrorSource(e){if(e===void 0)return;let t=null,n=dt$3(()=>{let o=e();return o.length===0?null:o.reduce((r,a)=>(r[a.kind]=a,r),{})});this.parseErrorsValidator=(()=>t).bind(this),pa$2(()=>{t=n(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(e){this.parseErrorsValidator&&(e?.removeValidators(this.parseErrorsValidator),e?.updateValueAndValidity({emitEvent:false}));}},Ln$1=class Ln{_cd;constructor(e){this._cd=e;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Hu=(()=>{class i extends Ln$1{constructor(t){super(t);}static \u0275fac=function(n){return new(n||i)(Ar$2(Ht$2,2))};static \u0275dir=CE({type:i,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,o){n&2&&gh("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending);},standalone:false,features:[Wp]})}return i})();var He$1=class He extends Be$1{constructor(e,t,n){super(Yo$1(t),$o$2(n,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(e,t){let n=this._find(e);return n||(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,n={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}removeControl(e,t={}){let n=this._find(e);n&&n._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange();}setControl(e,t,n={}){let o=this._find(e);o&&o._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}contains(e){return this._find(e)?.enabled===true}setValue(e,t={}){ae$2(()=>{es$1(this,true,e),Object.keys(e).forEach(n=>{ts$1(this,true,n),this.controls[n].setValue(e[n],{onlySelf:true,emitEvent:t.emitEvent});}),this.updateValueAndValidity(t);});}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(n=>{let o=this._find(n);o&&o.patchValue(e[n],{onlySelf:true,emitEvent:t.emitEvent});}),this.updateValueAndValidity(t));}reset(e={},t={}){this._forEachChild((n,o)=>{n.reset(e?e[o]:null,x$3(w$3({},t),{onlySelf:true}));}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==false&&this._events.next(new jt$2(this));}getRawValue(){return this._reduceChildren({},(e,t,n)=>(e[n]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(false,(t,n)=>n._syncPendingControls()?true:t);return e&&this.updateValueAndValidity({onlySelf:true}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let n=this.controls[t];n&&e(n,t);});}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(e){for(let[t,n]of Object.entries(this.controls))if(this.contains(t)&&e(n))return  true;return  false}_reduceValue(){let e={};return this._reduceChildren(e,(t,n,o)=>((n.enabled||this.disabled)&&(t[o]=n.value),t))}_reduceChildren(e,t){let n=e;return this._forEachChild((o,r)=>{n=t(n,o,r);}),n}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(e){return Xo$1(this.controls,e)?this.controls[e]:null}};var _s={provide:St$4,useExisting:Eo$3(()=>vs)},ee$2=Promise.resolve(),vs=(()=>{class i extends St$4{callSetDisabledState;get submitted(){return ae$2(this.submittedReactive)}_submitted=dt$3(()=>this.submittedReactive());submittedReactive=Fe$3(false);_directives=new Set;form;ngSubmit=new qe$3;options;constructor(t,n,o){super(),this.callSetDisabledState=o,this.form=new He$1({},Hn$1(t),Un$1(n));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(t){ee$2.then(()=>{let n=this._findContainer(t.path);t.control=n.registerControl(t.name,t.control),t._setupWithForm(this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:false}),this._directives.add(t);});}getControl(t){return this.form.get(t.path)}removeControl(t){ee$2.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t);});}addFormGroup(t){ee$2.then(()=>{let n=this._findContainer(t.path),o=new He$1({});Ko$1(o,t),n.registerControl(t.name,o),o.updateValueAndValidity({emitEvent:false});});}removeFormGroup(t){ee$2.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name);});}getFormGroup(t){return this.form.get(t.path)}updateModel(t,n){ee$2.then(()=>{this.form.get(t.path).setValue(n);});}setValue(t){this.control.setValue(t);}onSubmit(t){return this.submittedReactive.set(true),Qo$1(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new Le$2(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(n){return new(n||i)(Ar$2(Ue$2,10),Ar$2(jn$1,10),Ar$2(Ge$1,8))};static \u0275dir=CE({type:i,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(n,o){n&1&&ih("submit",function(a){return o.onSubmit(a)})("reset",function(){return o.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[zD([_s]),Wp]})}return i})();function Ro$2(i,e){let t=i.indexOf(e);t>-1&&i.splice(t,1);}function Fo$1(i){return typeof i=="object"&&i!==null&&Object.keys(i).length===2&&"value"in i&&"disabled"in i}var Jo$1=class Jo extends Be$1{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(e=null,t,n){super(Yo$1(t),$o$2(n,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),We$1(t)&&(t.nonNullable||t.initialValueIsDefault)&&(Fo$1(e)?this.defaultValue=e.value:this.defaultValue=e);}setValue(e,t={}){ae$2(()=>{this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==false&&this._onChange.forEach(n=>n(this.value,t.emitViewToModelChange!==false)),this.updateValueAndValidity(t);});}patchValue(e,t={}){this.setValue(e,t);}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,t?.emitEvent!==false&&this._events.next(new jt$2(this));}_updateValue(){}_anyControls(e){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e);}_unregisterOnChange(e){Ro$2(this._onChange,e);}registerOnDisabledChange(e){this._onDisabledChange.push(e);}_unregisterOnDisabledChange(e){Ro$2(this._onDisabledChange,e);}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(e){Fo$1(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=e;}};var ys=i=>i instanceof Jo$1;var xs={provide:Ht$2,useExisting:Eo$3(()=>Cs)},ko$2=Promise.resolve(),Cs=(()=>{class i extends Ht$2{_changeDetectorRef;callSetDisabledState;control=new Jo$1;static ngAcceptInputType_isDisabled;_registered=false;viewModel;name="";isDisabled;model;options;update=new qe$3;constructor(t,n,o,r,a,l,d,u){super(d,u,r),this._changeDetectorRef=a,this.callSetDisabledState=l,this._parent=t,this._setValidators(n),this._setAsyncValidators(o);}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let n=t.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)});}this._setUpControl();}"isDisabled"in t&&this._updateDisabled(t),fs(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model);}ngOnDestroy(){this.formDirective?.removeControl(this);}\u0275ngControlCreate(t){super.ngControlCreate(t);}\u0275ngControlUpdate(t){super.ngControlUpdate(t,false);}get shouldBindRequired(){return  false}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t);}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=true;}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn);}_isStandalone(){return !this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Ao$2(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:false});}_setupWithForm(t){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Ao$2(this.control,this,t));}_checkForErrors(){this._checkName();}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name;}_updateValue(t){ko$2.then(()=>{this.control.setValue(t,{emitViewToModelChange:false}),this._changeDetectorRef?.markForCheck();});}_updateDisabled(t){let n=t.isDisabled.currentValue,o=n!==0&&PF(n);ko$2.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck();});}_getPath(t){return this._parent?ss$1(t,this._parent):[t]}static \u0275fac=function(n){return new(n||i)(Ar$2(St$4,9),Ar$2(Ue$2,10),Ar$2(jn$1,10),Ar$2(To$2,10),Ar$2(kF,8),Ar$2(Ge$1,8),Ar$2(le$2,8),Ar$2(CI,8))};static \u0275dir=CE({type:i,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:false,features:[zD([xs,bs]),Wp,Pm,ME(null)]})}return i})();var ws=(()=>{class i extends St$4{callSetDisabledState;get submitted(){return ae$2(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t);}_submitted=dt$3(()=>this._submittedReactive());_submittedReactive=Fe$3(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,n,o){super(),this.callSetDisabledState=o,this._setValidators(t),this._setAsyncValidators(n);}ngOnChanges(t){this.onChanges(t);}ngOnDestroy(){this.onDestroy();}onChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(je$2(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(t){let n=this.form.get(t.path);return t._setupWithForm(n,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:false}),this.directives.push(t),n}getControl(t){return this.form.get(t.path)}removeControl(t){Oo$2(t.control||null,t,false),gs(this.directives,t);}addFormGroup(t){this._setUpFormContainer(t);}removeFormGroup(t){this._cleanUpFormContainer(t);}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t);}removeFormArray(t){this._cleanUpFormContainer(t);}updateModel(t,n){this.form.get(t.path).setValue(n);}onReset(){this.resetForm();}resetForm(t=void 0,n={}){this.form.reset(t,n),this._submittedReactive.set(false);}onSubmit(t){return this.submitted=true,Qo$1(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new Le$2(this.control)),t?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(t=>{let n=t.control,o=this.form.get(t.path);n!==o&&(Oo$2(n||null,t),ys(o)&&t._setupWithForm(o,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(t){let n=this.form.get(t.path);Ko$1(n,t),n.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(t){let n=this.form?.get(t.path);n&&ms$1(n,t)&&n.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){Gn$1(this.form,this),this._oldForm&&je$2(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(n){return new(n||i)(Ar$2(Ue$2,10),Ar$2(jn$1,10),Ar$2(Ge$1,8))};static \u0275dir=CE({type:i,features:[Wp,Pm]})}return i})();var Es={provide:St$4,useExisting:Eo$3(()=>Ds)},Ds=(()=>{class i extends ws{form=null;ngSubmit=new qe$3;get control(){return this.form}static \u0275fac=(()=>{let t;return function(o){return (t||(t=ey(i)))(o||i)}})();static \u0275dir=CE({type:i,selectors:[["","formGroup",""]],hostBindings:function(n,o){n&1&&ih("submit",function(a){return o.onSubmit(a)})("reset",function(){return o.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[zD([Es]),Wp]})}return i})();var Ss=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=DE({type:i});static \u0275inj=su$1({})}return i})();var Wu=(()=>{class i{static withConfig(t){return {ngModule:i,providers:[{provide:Ge$1,useValue:t.callSetDisabledState??Wn$1}]}}static \u0275fac=function(n){return new(n||i)};static \u0275mod=DE({type:i});static \u0275inj=su$1({imports:[Ss]})}return i})();var $u=(()=>{class i{isErrorState(t,n){return !!(t&&t.invalid&&(t.touched||n&&n.submitted))}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var tr$2=class tr{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;constructor(e,t,n,o,r){this._defaultMatcher=e,this.ngControl=t,this._parentFormGroup=n,this._parentForm=o,this._stateChanges=r;}updateErrorState(){let e=this.errorState,t=this._parentFormGroup||this._parentForm,n=this.matcher||this._defaultMatcher,o=this.ngControl?this.ngControl.control:null,r=n?.isErrorState(o,t)??false;r!==e&&(this.errorState=r,this._stateChanges.next());}};var Ms=20,Ye$1=(()=>{class i{_ngZone=T$3(ue$1);_platform=T$3(x$1);_renderer=T$3(vr$3).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new ne$2;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)));}deregister(t){let n=this.scrollContainers.get(t);n&&(n.unsubscribe(),this.scrollContainers.delete(t));}scrolled(t=Ms){return this._platform.isBrowser?new N$2(n=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let o=t>0?this._scrolled.pipe(wg(t)).subscribe(n):this._scrolled.subscribe(n);return this._scrolledCount++,()=>{o.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0);}}):ag()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,n)=>this.deregister(n)),this._scrolled.complete();}ancestorScrolled(t,n){let o=this.getAncestorScrollContainers(t);return this.scrolled(n).pipe(Xt$3(r=>!r||o.indexOf(r)>-1))}getAncestorScrollContainers(t){let n=[];return this.scrollContainers.forEach((o,r)=>{this._targetContainsElement(r,t)&&n.push(r);}),n}_targetContainsElement(t,n){let o=Z$2(n),r=t.getElementRef().nativeElement;do if(o==r)return  true;while(o=o.parentElement);return  false}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),As=(()=>{class i{elementRef=T$3(Tr$2);scrollDispatcher=T$3(Ye$1);ngZone=T$3(ue$1);dir=T$3(pt$2,{optional:true});_scrollElement=this.elementRef.nativeElement;_destroyed=new ne$2;_renderer=T$3(CI);_cleanupScroll;_elementScrolled=new ne$2;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",t=>this._elementScrolled.next(t))),this.scrollDispatcher.register(this);}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete();}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(t){let n=this.elementRef.nativeElement,o=this.dir&&this.dir.value=="rtl";t.left==null&&(t.left=o?t.end:t.start),t.right==null&&(t.right=o?t.start:t.end),t.bottom!=null&&(t.top=n.scrollHeight-n.clientHeight-t.bottom),o&&Nt$2()!=it$2.NORMAL?(t.left!=null&&(t.right=n.scrollWidth-n.clientWidth-t.left),Nt$2()==it$2.INVERTED?t.left=t.right:Nt$2()==it$2.NEGATED&&(t.left=t.right?-t.right:t.right)):t.right!=null&&(t.left=n.scrollWidth-n.clientWidth-t.right),this._applyScrollToOptions(t);}_applyScrollToOptions(t){let n=this.elementRef.nativeElement;Oe$3()?n.scrollTo(t):(t.top!=null&&(n.scrollTop=t.top),t.left!=null&&(n.scrollLeft=t.left));}measureScrollOffset(t){let n="left",o="right",r=this.elementRef.nativeElement;if(t=="top")return r.scrollTop;if(t=="bottom")return r.scrollHeight-r.clientHeight-r.scrollTop;let a=this.dir&&this.dir.value=="rtl";return t=="start"?t=a?o:n:t=="end"&&(t=a?n:o),a&&Nt$2()==it$2.INVERTED?t==n?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:a&&Nt$2()==it$2.NEGATED?t==n?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:t==n?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return i})(),Os=20,oe=(()=>{class i{_platform=T$3(x$1);_listeners;_viewportSize=null;_change=new ne$2;_document=T$3(ir$3);constructor(){let t=T$3(ue$1),n=T$3(vr$3).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let o=r=>this._change.next(r);this._listeners=[n.listen("window","resize",o),n.listen("window","orientationchange",o)];}this.change().subscribe(()=>this._viewportSize=null);});}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete();}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:n,height:o}=this.getViewportSize();return {top:t.top,left:t.left,bottom:t.top+o,right:t.left+n,height:o,width:n}}getViewportScrollPosition(){if(!this._platform.isBrowser)return {top:0,left:0};let t=this._document,n=this._getWindow(),o=t.documentElement,r=o.getBoundingClientRect(),a=-r.top||t.body?.scrollTop||n.scrollY||o.scrollTop||0,l=-r.left||t.body?.scrollLeft||n.scrollX||o.scrollLeft||0;return {top:a,left:l}}change(t=Os){return t>0?this._change.pipe(wg(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0};}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();var re$2=class re{_attachedHost=null;attach(e){return this._attachedHost=e,e.attach(this)}detach(){let e=this._attachedHost;e!=null&&(this._attachedHost=null,e.detach());}get isAttached(){return this._attachedHost!=null}setAttachedHost(e){this._attachedHost=e;}},Yn$1=class Yn extends re$2{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(e,t,n,o,r,a){super(),this.component=e,this.viewContainerRef=t,this.injector=n,this.projectableNodes=o,this.bindings=r||null,this.directives=a||null;}},ae$1=class ae extends re$2{templateRef;viewContainerRef;context;injector;constructor(e,t,n,o){super(),this.templateRef=e,this.viewContainerRef=t,this.context=n,this.injector=o;}get origin(){return this.templateRef.elementRef}attach(e,t=this.context){return this.context=t,super.attach(e)}detach(){return this.context=void 0,super.detach()}},$n$1=class $n extends re$2{element;constructor(e){super(),this.element=e instanceof Tr$2?e.nativeElement:e;}},$e$1=class $e{_attachedPortal=null;_disposeFn=null;_isDisposed=false;hasAttached(){return !!this._attachedPortal}attach(e){if(e instanceof Yn$1)return this._attachedPortal=e,this.attachComponentPortal(e);if(e instanceof ae$1)return this._attachedPortal=e,this.attachTemplatePortal(e);if(this.attachDomPortal&&e instanceof $n$1)return this._attachedPortal=e,this.attachDomPortal(e)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn();}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=true;}setDisposeFn(e){this._disposeFn=e;}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null);}},Xe$1=class Xe extends $e$1{outletElement;_appRef;_defaultInjector;constructor(e,t,n){super(),this.outletElement=e,this._appRef=t,this._defaultInjector=n;}attachComponentPortal(e){let t;if(e.viewContainerRef){let n=e.injector||e.viewContainerRef.injector,o=n.get(Cn$4,null,{optional:true})||void 0;t=e.viewContainerRef.createComponent(e.component,{index:e.viewContainerRef.length,injector:n,ngModuleRef:o,projectableNodes:e.projectableNodes||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0}),this.setDisposeFn(()=>t.destroy());}else {let n=this._appRef,o=e.injector||this._defaultInjector||le$2.NULL,r=o.get(ce$3,n.injector);t=jF(e.component,{elementInjector:o,environmentInjector:r,projectableNodes:e.projectableNodes||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0}),n.attachView(t.hostView),this.setDisposeFn(()=>{n.viewCount>0&&n.detachView(t.hostView),t.destroy();});}return this.outletElement.appendChild(this._getComponentRootNode(t)),this._attachedPortal=e,t}attachTemplatePortal(e){let t=e.viewContainerRef,n=t.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return n.rootNodes.forEach(o=>this.outletElement.appendChild(o)),n.detectChanges(),this.setDisposeFn(()=>{let o=t.indexOf(n);o!==-1&&t.remove(o);}),this._attachedPortal=e,n}attachDomPortal=e=>{let t=e.element;t.parentNode;let n=this.outletElement.ownerDocument.createComment("dom-portal");t.parentNode.insertBefore(n,t),this.outletElement.appendChild(t),this._attachedPortal=e,super.setDisposeFn(()=>{n.parentNode&&n.parentNode.replaceChild(t,n);});};dispose(){super.dispose(),this.outletElement.remove();}_getComponentRootNode(e){return e.hostView.rootNodes[0]}};var wm=(()=>{class i extends $e$1{_moduleRef=T$3(Cn$4,{optional:true});_document=T$3(ir$3);_viewContainerRef=T$3(Li$3);_isInitialized=false;_attachedRef=null;get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null);}attached=new qe$3;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=true;}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null;}attachComponentPortal(t){t.setAttachedHost(this);let n=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,o=n.createComponent(t.component,{index:n.length,injector:t.injector||n.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0});return n!==this._viewContainerRef&&this._getRootNode().appendChild(o.hostView.rootNodes[0]),super.setDisposeFn(()=>o.destroy()),this._attachedPortal=t,this._attachedRef=o,this.attached.emit(o),o}attachTemplatePortal(t){t.setAttachedHost(this);let n=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=n,this.attached.emit(n),n}attachDomPortal=t=>{let n=t.element;n.parentNode;let o=this._document.createComment("dom-portal");t.setAttachedHost(this),n.parentNode.insertBefore(o,n),this._getRootNode().appendChild(n),this._attachedPortal=t,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(n,o);});};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static \u0275fac=(()=>{let t;return function(o){return (t||(t=ey(i)))(o||i)}})();static \u0275dir=CE({type:i,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Wp]})}return i})();var er$2=Oe$3();function Rs(i){return new qe$2(i.get(oe),i.get(ir$3))}var qe$2=class qe{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=false;_document;constructor(e,t){this._viewportRuler=e,this._document=t;}attach(){}enable(){if(this._canBeEnabled()){let e=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=e.style.left||"",this._previousHTMLStyles.top=e.style.top||"",e.style.left=M$3(-this._previousScrollPosition.left),e.style.top=M$3(-this._previousScrollPosition.top),e.classList.add("cdk-global-scrollblock"),this._isEnabled=true;}}disable(){if(this._isEnabled){let e=this._document.documentElement,t=this._document.body,n=e.style,o=t.style,r=n.scrollBehavior||"",a=o.scrollBehavior||"";this._isEnabled=false,n.left=this._previousHTMLStyles.left,n.top=this._previousHTMLStyles.top,e.classList.remove("cdk-global-scrollblock"),er$2&&(n.scrollBehavior=o.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),er$2&&(n.scrollBehavior=r,o.scrollBehavior=a);}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return  false;let t=this._document.documentElement,n=this._viewportRuler.getViewportSize();return t.scrollHeight>n.height||t.scrollWidth>n.width}};var Ze=class{enable(){}disable(){}attach(){}};function Xn(i,e){return e.some(t=>{let n=i.bottom<t.top,o=i.top>t.bottom,r=i.right<t.left,a=i.left>t.right;return n||o||r||a})}function nr$2(i,e){return e.some(t=>{let n=i.top<t.top,o=i.bottom>t.bottom,r=i.left<t.left,a=i.right>t.right;return n||o||r||a})}function lr$2(i,e){return new Ke$1(i.get(Ye$1),i.get(oe),i.get(ue$1),e)}var Ke$1=class Ke{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(e,t,n,o){this._scrollDispatcher=e,this._viewportRuler=t,this._ngZone=n,this._config=o;}attach(e){this._overlayRef,this._overlayRef=e;}enable(){if(!this._scrollSubscription){let e=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(e).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let t=this._overlayRef.overlayElement.getBoundingClientRect(),{width:n,height:o}=this._viewportRuler.getViewportSize();Xn(t,[{width:n,height:o,bottom:o,right:n,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()));}});}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null);}detach(){this.disable(),this._overlayRef=null;}};var se$1=class se{positionStrategy;scrollStrategy=new Ze;panelClass="";hasBackdrop=false;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=false;usePopover;eventPredicate;constructor(e){if(e){let t=Object.keys(e);for(let n of t)e[n]!==void 0&&(this[n]=e[n]);}}};var Qe$1=class Qe{connectionPair;scrollableViewProperties;constructor(e,t){this.connectionPair=e,this.scrollableViewProperties=t;}};var dr$2=(()=>{class i{_attachedOverlays=[];_document=T$3(ir$3);_isAttached=false;ngOnDestroy(){this.detach();}add(t){this.remove(t),this._attachedOverlays.push(t);}remove(t){let n=this._attachedOverlays.indexOf(t);n>-1&&this._attachedOverlays.splice(n,1),this._attachedOverlays.length===0&&this.detach();}canReceiveEvent(t,n,o){return o.observers.length<1?false:t.eventPredicate?t.eventPredicate(n):true}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),cr$2=(()=>{class i extends dr$2{_ngZone=T$3(ue$1);_renderer=T$3(vr$3).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener);}),this._isAttached=true);}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=false);}_keydownListener=t=>{let n=this._attachedOverlays;for(let o=n.length-1;o>-1;o--){let r=n[o];if(this.canReceiveEvent(r,t,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(t));break}}};static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),ur$2=(()=>{class i extends dr$2{_platform=T$3(x$1);_ngZone=T$3(ue$1);_renderer=T$3(vr$3).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=false;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let n=this._document.body,o={capture:true},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(n,"pointerdown",this._pointerDownListener,o),r.listen(n,"click",this._clickListener,o),r.listen(n,"auxclick",this._clickListener,o),r.listen(n,"contextmenu",this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=n.style.cursor,n.style.cursor="pointer",this._cursorStyleIsSet=true),this._isAttached=true;}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=false),this._isAttached=false);}_pointerDownListener=t=>{this._pointerDownEventTarget=H$2(t);};_clickListener=t=>{let n=H$2(t),o=t.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:n;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let a=r.length-1;a>-1;a--){let l=r[a],d=l._outsidePointerEvents;if(!(!l.hasAttached()||!this.canReceiveEvent(l,t,d))){if(ir$2(l.overlayElement,n)||ir$2(l.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>d.next(t)):d.next(t);}}};static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})();function ir$2(i,e){let t=typeof ShadowRoot<"u"&&ShadowRoot,n=e;for(;n;){if(n===i)return  true;n=t&&n instanceof ShadowRoot?n.host:n.parentNode;}return  false}var mr$2=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=IE({type:i,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(n,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2})}return i})(),fr$2=(()=>{class i{_platform=T$3(x$1);_containerElement;_document=T$3(ir$3);_styleLoader=T$3(K$4);ngOnDestroy(){this._containerElement?.remove();}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t="cdk-overlay-container";if(this._platform.isBrowser||Dn$1()){let o=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let r=0;r<o.length;r++)o[r].remove();}let n=this._document.createElement("div");n.classList.add(t),Dn$1()?n.setAttribute("platform","test"):this._platform.isBrowser||n.setAttribute("platform","server"),this._document.body.appendChild(n),this._containerElement=n;}_loadStyles(){this._styleLoader.load(mr$2);}static \u0275fac=function(n){return new(n||i)};static \u0275prov=wr$2({token:i,factory:i.\u0275fac})}return i})(),qn$1=class qn{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(e,t,n,o){this._renderer=t,this._ngZone=n,this.element=e.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=t.listen(this.element,"click",o);}detach(){this._ngZone.runOutsideAngular(()=>{let e=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(e,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),e.style.pointerEvents="none",e.classList.remove("cdk-overlay-backdrop-showing");});}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove();}};function Kn$1(i){return i&&i.nodeType===1}var Je$1=class Je{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new ne$2;_attachments=new ne$2;_detachments=new ne$2;_positionStrategy;_scrollStrategy;_locationChanges=G$2.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=false;_previousHostParent;_keydownEvents=new ne$2;_outsidePointerEvents=new ne$2;_afterNextRenderRef;constructor(e,t,n,o,r,a,l,d,u,c=false,p,I){this._portalOutlet=e,this._host=t,this._pane=n,this._config=o,this._ngZone=r,this._keyboardDispatcher=a,this._document=l,this._location=d,this._outsideClickDispatcher=u,this._animationsDisabled=c,this._injector=p,this._renderer=I,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy;}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(e){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(e);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Wf(()=>{this.hasAttached()&&this.updatePosition();},{injector:this._injector}),this._togglePointerEvents(true),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,true),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof t?.onDestroy=="function"&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()));}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(false),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let e=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),e}dispose(){if(this._disposed)return;let e=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,e&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=true;}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply();}updatePositionStrategy(e){e!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=e,this.hasAttached()&&(e.attach(this),this.updatePosition()));}updateSize(e){this._config=w$3(w$3({},this._config),e),this._updateElementSize();}setDirection(e){this._config=x$3(w$3({},this._config),{direction:e}),this._updateElementDirection();}addPanelClass(e){this._pane&&this._toggleClasses(this._pane,e,true);}removePanelClass(e){this._pane&&this._toggleClasses(this._pane,e,false);}getDirection(){let e=this._config.direction;return e?typeof e=="string"?e:e.value:"ltr"}updateScrollStrategy(e){e!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=e,this.hasAttached()&&(e.attach(this),e.enable()));}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection());}_updateElementSize(){if(!this._pane)return;let e=this._pane.style;e.width=M$3(this._config.width),e.height=M$3(this._config.height),e.minWidth=M$3(this._config.minWidth),e.minHeight=M$3(this._config.minHeight),e.maxWidth=M$3(this._config.maxWidth),e.maxHeight=M$3(this._config.maxHeight);}_togglePointerEvents(e){this._pane.style.pointerEvents=e?"":"none";}_attachHost(){if(!this._host.parentElement){let e=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Kn$1(e)?e.after(this._host):e?.type==="parent"?e.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host);}if(this._config.usePopover)try{this._host.showPopover();}catch(e){}}_attachBackdrop(){let e="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new qn$1(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t);}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,true),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(e));}):this._backdropRef.element.classList.add(e);}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host);}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach();}_toggleClasses(e,t,n){let o=Tt$4(t||[]).filter(r=>!!r);o.length&&(n?e.classList.add(...o):e.classList.remove(...o));}_detachContentWhenEmpty(){let e=false;try{this._detachContentAfterRenderRef=Wf(()=>{e=!0,this._detachContent();},{injector:this._injector});}catch(t){if(e)throw t;this._detachContent();}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent();}),this._detachContentMutationObserver.observe(this._pane,{childList:true}));}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,false),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent());}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect();}_disposeScrollStrategy(){let e=this._scrollStrategy;e?.disable(),e?.detach?.();}},or$2="cdk-overlay-connected-position-bounding-box",Fs=/([A-Za-z%]+)$/;function hr$2(i,e){return new tn$2(e,i.get(oe),i.get(ir$3),i.get(x$1),i.get(fr$2))}var tn$2=class tn{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=false;_lastBoundingBoxSize={width:0,height:0};_isPushed=false;_canPush=true;_growAfterOpen=false;_hasFlexibleDimensions=true;_positionLocked=false;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=false;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new ne$2;_resizeSubscription=G$2.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(e,t,n,o,r){this._viewportRuler=t,this._document=n,this._platform=o,this._overlayContainer=r,this.setOrigin(e);}attach(e){this._overlayRef&&this._overlayRef,this._validatePositions(),e.hostElement.classList.add(or$2),this._overlayRef=e,this._boundingBox=e.hostElement,this._pane=e.overlayElement,this._isDisposed=false,this._isInitialRender=true,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=true,this.apply();});}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let e=this._originRect,t=this._overlayRect,n=this._viewportRect,o=this._containerRect,r=[],a;for(let l of this._preferredPositions){let d=this._getOriginPoint(e,o,l),u=this._getOverlayPoint(d,t,l),c=this._getOverlayFit(u,t,n,l);if(c.isCompletelyWithinViewport){this._isPushed=false,this._applyPosition(l,d);return}if(this._canFitWithFlexibleDimensions(c,u,n)){r.push({position:l,origin:d,overlayRect:t,boundingBoxRect:this._calculateBoundingBoxRect(d,l)});continue}(!a||a.overlayFit.visibleArea<c.visibleArea)&&(a={overlayFit:c,overlayPoint:u,originPoint:d,position:l,overlayRect:t});}if(r.length){let l=null,d=-1;for(let u of r){let c=u.boundingBoxRect.width*u.boundingBoxRect.height*(u.position.weight||1);c>d&&(d=c,l=u);}this._isPushed=false,this._applyPosition(l.position,l.origin);return}if(this._canPush){this._isPushed=true,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint);}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe();}dispose(){this._isDisposed||(this._boundingBox&&Mt$5(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(or$2),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=true);}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let e=this._lastPosition;e?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(e,this._getOriginPoint(this._originRect,this._containerRect,e))):this.apply();}withScrollableContainers(e){return this._scrollables=e,this}withPositions(e){return this._preferredPositions=e,e.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(e){return this._viewportMargin=e,this}withFlexibleDimensions(e=true){return this._hasFlexibleDimensions=e,this}withGrowAfterOpen(e=true){return this._growAfterOpen=e,this}withPush(e=true){return this._canPush=e,this}withLockedPosition(e=true){return this._positionLocked=e,this}setOrigin(e){return this._origin=e,this}withDefaultOffsetX(e){return this._offsetX=e,this}withDefaultOffsetY(e){return this._offsetY=e,this}withTransformOriginOn(e){return this._transformOriginSelector=e,this}withPopoverLocation(e){return this._popoverLocation=e,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof Tr$2?this._origin.nativeElement:Kn$1(this._origin)?this._origin:null}_getOriginPoint(e,t,n){let o;if(n.originX=="center")o=e.left+e.width/2;else {let a=this._isRtl()?e.right:e.left,l=this._isRtl()?e.left:e.right;o=n.originX=="start"?a:l;}t.left<0&&(o-=t.left);let r;return n.originY=="center"?r=e.top+e.height/2:r=n.originY=="top"?e.top:e.bottom,t.top<0&&(r-=t.top),{x:o,y:r}}_getOverlayPoint(e,t,n){let o;n.overlayX=="center"?o=-t.width/2:n.overlayX==="start"?o=this._isRtl()?-t.width:0:o=this._isRtl()?0:-t.width;let r;return n.overlayY=="center"?r=-t.height/2:r=n.overlayY=="top"?0:-t.height,{x:e.x+o,y:e.y+r}}_getOverlayFit(e,t,n,o){let r=ar$2(t),{x:a,y:l}=e,d=this._getOffset(o,"x"),u=this._getOffset(o,"y");d&&(a+=d),u&&(l+=u);let c=0-a,p=a+r.width-n.width,I=0-l,T=l+r.height-n.height,R=this._subtractOverflows(r.width,c,p),A=this._subtractOverflows(r.height,I,T),_t=R*A;return {visibleArea:_t,isCompletelyWithinViewport:r.width*r.height===_t,fitsInViewportVertically:A===r.height,fitsInViewportHorizontally:R==r.width}}_canFitWithFlexibleDimensions(e,t,n){if(this._hasFlexibleDimensions){let o=n.bottom-t.y,r=n.right-t.x,a=rr$2(this._overlayRef.getConfig().minHeight),l=rr$2(this._overlayRef.getConfig().minWidth),d=e.fitsInViewportVertically||a!=null&&a<=o,u=e.fitsInViewportHorizontally||l!=null&&l<=r;return d&&u}return  false}_pushOverlayOnScreen(e,t,n){if(this._previousPushAmount&&this._positionLocked)return {x:e.x+this._previousPushAmount.x,y:e.y+this._previousPushAmount.y};let o=ar$2(t),r=this._viewportRect,a=Math.max(e.x+o.width-r.width,0),l=Math.max(e.y+o.height-r.height,0),d=Math.max(r.top-n.top-e.y,0),u=Math.max(r.left-n.left-e.x,0),c=0,p=0;return o.width<=r.width?c=u||-a:c=e.x<this._getViewportMarginStart()?r.left-n.left-e.x:0,o.height<=r.height?p=d||-l:p=e.y<this._getViewportMarginTop()?r.top-n.top-e.y:0,this._previousPushAmount={x:c,y:p},{x:e.x+c,y:e.y+p}}_applyPosition(e,t){if(this._setTransformOrigin(e),this._setOverlayElementStyles(t,e),this._setBoundingBoxStyles(t,e),e.panelClass&&this._addPanelClasses(e.panelClass),this._positionChanges.observers.length){let n=this._getScrollVisibility();if(e!==this._lastPosition||!this._lastScrollVisibility||!ks(this._lastScrollVisibility,n)){let o=new Qe$1(e,n);this._positionChanges.next(o);}this._lastScrollVisibility=n;}this._lastPosition=e,this._isInitialRender=false;}_setTransformOrigin(e){if(!this._transformOriginSelector)return;let t=this._boundingBox.querySelectorAll(this._transformOriginSelector),n,o=e.overlayY;e.overlayX==="center"?n="center":this._isRtl()?n=e.overlayX==="start"?"right":"left":n=e.overlayX==="start"?"left":"right";for(let r=0;r<t.length;r++)t[r].style.transformOrigin=`${n} ${o}`;}_calculateBoundingBoxRect(e,t){let n=this._viewportRect,o=this._isRtl(),r,a,l;if(t.overlayY==="top")a=e.y,r=n.height-a+this._getViewportMarginBottom();else if(t.overlayY==="bottom")l=n.height-e.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=n.height-l+this._getViewportMarginTop();else {let T=Math.min(n.bottom-e.y+n.top,e.y),R=this._lastBoundingBoxSize.height;r=T*2,a=e.y-T,r>R&&!this._isInitialRender&&!this._growAfterOpen&&(a=e.y-R/2);}let d=t.overlayX==="start"&&!o||t.overlayX==="end"&&o,u=t.overlayX==="end"&&!o||t.overlayX==="start"&&o,c,p,I;if(u)I=n.width-e.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),c=e.x-this._getViewportMarginStart();else if(d)p=e.x,c=n.right-e.x-this._getViewportMarginEnd();else {let T=Math.min(n.right-e.x+n.left,e.x),R=this._lastBoundingBoxSize.width;c=T*2,p=e.x-T,c>R&&!this._isInitialRender&&!this._growAfterOpen&&(p=e.x-R/2);}return {top:a,left:p,bottom:l,right:I,width:c,height:r}}_setBoundingBoxStyles(e,t){let n=this._calculateBoundingBoxRect(e,t);!this._isInitialRender&&!this._growAfterOpen&&(n.height=Math.min(n.height,this._lastBoundingBoxSize.height),n.width=Math.min(n.width,this._lastBoundingBoxSize.width));let o={};if(this._hasExactPosition())o.top=o.left="0",o.bottom=o.right="auto",o.maxHeight=o.maxWidth="",o.width=o.height="100%";else {let r=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;o.width=M$3(n.width),o.height=M$3(n.height),o.top=M$3(n.top)||"auto",o.bottom=M$3(n.bottom)||"auto",o.left=M$3(n.left)||"auto",o.right=M$3(n.right)||"auto",t.overlayX==="center"?o.alignItems="center":o.alignItems=t.overlayX==="end"?"flex-end":"flex-start",t.overlayY==="center"?o.justifyContent="center":o.justifyContent=t.overlayY==="bottom"?"flex-end":"flex-start",r&&(o.maxHeight=M$3(r)),a&&(o.maxWidth=M$3(a));}this._lastBoundingBoxSize=n,Mt$5(this._boundingBox.style,o);}_resetBoundingBoxStyles(){Mt$5(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""});}_resetOverlayElementStyles(){Mt$5(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""});}_setOverlayElementStyles(e,t){let n={},o=this._hasExactPosition(),r=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(o){let c=this._viewportRuler.getViewportScrollPosition();Mt$5(n,this._getExactOverlayY(t,e,c)),Mt$5(n,this._getExactOverlayX(t,e,c));}else n.position="static";let l="",d=this._getOffset(t,"x"),u=this._getOffset(t,"y");d&&(l+=`translateX(${d}px) `),u&&(l+=`translateY(${u}px)`),n.transform=l.trim(),a.maxHeight&&(o?n.maxHeight=M$3(a.maxHeight):r&&(n.maxHeight="")),a.maxWidth&&(o?n.maxWidth=M$3(a.maxWidth):r&&(n.maxWidth="")),Mt$5(this._pane.style,n);}_getExactOverlayY(e,t,n){let o={top:"",bottom:""},r=this._getOverlayPoint(t,this._overlayRect,e);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,n)),e.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;o.bottom=`${a-(r.y+this._overlayRect.height)}px`;}else o.top=M$3(r.y);return o}_getExactOverlayX(e,t,n){let o={left:"",right:""},r=this._getOverlayPoint(t,this._overlayRect,e);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,n));let a;if(this._isRtl()?a=e.overlayX==="end"?"left":"right":a=e.overlayX==="end"?"right":"left",a==="right"){let l=this._document.documentElement.clientWidth;o.right=`${l-(r.x+this._overlayRect.width)}px`;}else o.left=M$3(r.x);return o}_getScrollVisibility(){let e=this._getOriginRect(),t=this._pane.getBoundingClientRect(),n=this._scrollables.map(o=>o.getElementRef().nativeElement.getBoundingClientRect());return {isOriginClipped:nr$2(e,n),isOriginOutsideView:Xn(e,n),isOverlayClipped:nr$2(t,n),isOverlayOutsideView:Xn(t,n)}}_subtractOverflows(e,...t){return t.reduce((n,o)=>n-Math.max(o,0),e)}_getNarrowedViewportRect(){let e=this._document.documentElement.clientWidth,t=this._document.documentElement.clientHeight,n=this._viewportRuler.getViewportScrollPosition();return {top:n.top+this._getViewportMarginTop(),left:n.left+this._getViewportMarginStart(),right:n.left+e-this._getViewportMarginEnd(),bottom:n.top+t-this._getViewportMarginBottom(),width:e-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:t-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return !this._hasFlexibleDimensions||this._isPushed}_getOffset(e,t){return t==="x"?e.offsetX==null?this._offsetX:e.offsetX:e.offsetY==null?this._offsetY:e.offsetY}_validatePositions(){}_addPanelClasses(e){this._pane&&Tt$4(e).forEach(t=>{t!==""&&this._appliedPanelClasses.indexOf(t)===-1&&(this._appliedPanelClasses.push(t),this._pane.classList.add(t));});}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(e=>{this._pane.classList.remove(e);}),this._appliedPanelClasses=[]);}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let e=this._origin;if(e instanceof Tr$2)return e.nativeElement.getBoundingClientRect();if(e instanceof Element)return e.getBoundingClientRect();let t=e.width||0,n=e.height||0;return {top:e.y,bottom:e.y+n,left:e.x,right:e.x+t,height:n,width:t}}_getContainerRect(){let e=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",t=this._overlayContainer.getContainerElement();e&&(t.style.display="block");let n=t.getBoundingClientRect();return e&&(t.style.display=""),n}};function Mt$5(i,e){for(let t in e)e.hasOwnProperty(t)&&(i[t]=e[t]);return i}function rr$2(i){if(typeof i!="number"&&i!=null){let[e,t]=i.split(Fs);return !t||t==="px"?parseFloat(e):null}return i||null}function ar$2(i){return {top:Math.floor(i.top),right:Math.floor(i.right),bottom:Math.floor(i.bottom),left:Math.floor(i.left),width:Math.floor(i.width),height:Math.floor(i.height)}}function ks(i,e){return i===e?true:i.isOriginClipped===e.isOriginClipped&&i.isOriginOutsideView===e.isOriginOutsideView&&i.isOverlayClipped===e.isOverlayClipped&&i.isOverlayOutsideView===e.isOverlayOutsideView}var sr$2="cdk-global-overlay-wrapper";function Is(i){return new en$3}var en$3=class en{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=false;attach(e){let t=e.getConfig();this._overlayRef=e,this._width&&!t.width&&e.updateSize({width:this._width}),this._height&&!t.height&&e.updateSize({height:this._height}),e.hostElement.classList.add(sr$2),this._isDisposed=false;}top(e=""){return this._bottomOffset="",this._topOffset=e,this._alignItems="flex-start",this}left(e=""){return this._xOffset=e,this._xPosition="left",this}bottom(e=""){return this._topOffset="",this._bottomOffset=e,this._alignItems="flex-end",this}right(e=""){return this._xOffset=e,this._xPosition="right",this}start(e=""){return this._xOffset=e,this._xPosition="start",this}end(e=""){return this._xOffset=e,this._xPosition="end",this}width(e=""){return this._overlayRef?this._overlayRef.updateSize({width:e}):this._width=e,this}height(e=""){return this._overlayRef?this._overlayRef.updateSize({height:e}):this._height=e,this}centerHorizontally(e=""){return this.left(e),this._xPosition="center",this}centerVertically(e=""){return this.top(e),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let e=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,n=this._overlayRef.getConfig(),{width:o,height:r,maxWidth:a,maxHeight:l}=n,d=(o==="100%"||o==="100vw")&&(!a||a==="100%"||a==="100vw"),u=(r==="100%"||r==="100vh")&&(!l||l==="100%"||l==="100vh"),c=this._xPosition,p=this._xOffset,I=this._overlayRef.getConfig().direction==="rtl",T="",R="",A="";d?A="flex-start":c==="center"?(A="center",I?R=p:T=p):I?c==="left"||c==="end"?(A="flex-end",T=p):(c==="right"||c==="start")&&(A="flex-start",R=p):c==="left"||c==="start"?(A="flex-start",T=p):(c==="right"||c==="end")&&(A="flex-end",R=p),e.position=this._cssPosition,e.marginLeft=d?"0":T,e.marginTop=u?"0":this._topOffset,e.marginBottom=this._bottomOffset,e.marginRight=d?"0":R,t.justifyContent=A,t.alignItems=u?"flex-start":this._alignItems;}dispose(){if(this._isDisposed||!this._overlayRef)return;let e=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,n=t.style;t.classList.remove(sr$2),n.justifyContent=n.alignItems=e.marginTop=e.marginBottom=e.marginLeft=e.marginRight=e.position="",this._overlayRef=null,this._isDisposed=true;}};var Qn$1=new S$1("OVERLAY_DEFAULT_CONFIG");function pr$1(i,e){i.get(K$4).load(mr$2);let t=i.get(fr$2),n=i.get(ir$3),o=i.get(ut$3),r=i.get(Fi$3),a=i.get(pt$2),l=i.get(CI,null,{optional:true})||i.get(vr$3).createRenderer(null,null),d=new se$1(e),u=i.get(Qn$1,null,{optional:true})?.usePopover??true;d.direction=d.direction||a.value,"showPopover"in n.body?d.usePopover=e?.usePopover??u:d.usePopover=false;let c=n.createElement("div"),p=n.createElement("div");c.id=o.getId("cdk-overlay-"),c.classList.add("cdk-overlay-pane"),p.appendChild(c),d.usePopover&&(p.setAttribute("popover","manual"),p.classList.add("cdk-overlay-popover"));let I=d.usePopover?d.positionStrategy?.getPopoverInsertionPoint?.():null;return Kn$1(I)?I.after(p):I?.type==="parent"?I.element.appendChild(p):t.getContainerElement().appendChild(p),new Je$1(new Xe$1(c,r,i),p,c,d,i.get(ue$1),i.get(cr$2),n,i.get(pn$2),i.get(ur$2),e?.disableAnimations??i.get(Im,null,{optional:true})==="NoopAnimations",i.get(ce$3),l)}var Ts=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],Ps=new S$1("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let i=T$3(le$2);return ()=>lr$2(i)}}),Zn$1=(()=>{class i{elementRef=T$3(Tr$2);static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return i})(),gr$2=new S$1("cdk-connected-overlay-default-config"),Vs=(()=>{class i{_dir=T$3(pt$2,{optional:true});_injector=T$3(le$2);_overlayRef;_templatePortal;_backdropSubscription=G$2.EMPTY;_attachSubscription=G$2.EMPTY;_detachSubscription=G$2.EMPTY;_positionSubscription=G$2.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=T$3(Ps);_ngZone=T$3(ue$1);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(t){this._offsetX=t,this._position&&this._updatePositionStrategy(this._position);}get offsetY(){return this._offsetY}set offsetY(t){this._offsetY=t,this._position&&this._updatePositionStrategy(this._position);}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=false;disableClose=false;transformOriginSelector;hasBackdrop=false;lockPosition=false;flexibleDimensions=false;growAfterOpen=false;push=false;disposeOnNavigation=false;usePopover;matchWidth=false;set _config(t){typeof t!="string"&&this._assignConfig(t);}backdropClick=new qe$3;positionChange=new qe$3;attach=new qe$3;detach=new qe$3;overlayKeydown=new qe$3;overlayOutsideClick=new qe$3;constructor(){let t=T$3(yr$2),n=T$3(Li$3),o=T$3(gr$2,{optional:true}),r=T$3(Qn$1,{optional:true});this.usePopover=r?.usePopover===false?null:"global",this._templatePortal=new ae$1(t,n),this.scrollStrategy=this._scrollStrategyFactory(),o&&this._assignConfig(o);}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose();}ngOnChanges(t){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),t.origin&&this.open&&this._position.apply()),t.open&&(this.open?this.attachOverlay():this.detachOverlay());}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=Ts);let t=this._overlayRef=pr$1(this._injector,this._buildConfig());this._attachSubscription=t.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=t.detachments().subscribe(()=>this.detach.emit()),t.keydownEvents().subscribe(n=>{this.overlayKeydown.next(n),n.keyCode===27&&!this.disableClose&&!De$2(n)&&(n.preventDefault(),this.detachOverlay());}),this._overlayRef.outsidePointerEvents().subscribe(n=>{let o=this._getOriginElement(),r=H$2(n);(!o||o!==r&&!o.contains(r))&&this.overlayOutsideClick.next(n);});}_buildConfig(){let t=this._position=this.positionStrategy||this._createPositionStrategy(),n=new se$1({direction:this._dir||"ltr",positionStrategy:t,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return (this.height||this.height===0)&&(n.height=this.height),(this.minWidth||this.minWidth===0)&&(n.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(n.minHeight=this.minHeight),this.backdropClass&&(n.backdropClass=this.backdropClass),this.panelClass&&(n.panelClass=this.panelClass),n}_updatePositionStrategy(t){let n=this.positions.map(o=>({originX:o.originX,originY:o.originY,overlayX:o.overlayX,overlayY:o.overlayY,offsetX:o.offsetX||this.offsetX,offsetY:o.offsetY||this.offsetY,panelClass:o.panelClass||void 0}));return t.setOrigin(this._getOrigin()).withPositions(n).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let t=hr$2(this._injector,this._getOrigin());return this._updatePositionStrategy(t),t}_getOrigin(){return this.origin instanceof Zn$1?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Zn$1?this.origin.elementRef.nativeElement:this.origin instanceof Tr$2?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let t=this._overlayRef;t.getConfig().hasBackdrop=this.hasBackdrop,t.updateSize({width:this._getWidth()}),t.hasAttached()||t.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=t.backdropClick().subscribe(n=>this.backdropClick.emit(n)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(kg(()=>this.positionChange.observers.length>0)).subscribe(n=>{this._ngZone.run(()=>this.positionChange.emit(n)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe();})),this.open=true;}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=false;}_assignConfig(t){this.origin=t.origin??this.origin,this.positions=t.positions??this.positions,this.positionStrategy=t.positionStrategy??this.positionStrategy,this.offsetX=t.offsetX??this.offsetX,this.offsetY=t.offsetY??this.offsetY,this.width=t.width??this.width,this.height=t.height??this.height,this.minWidth=t.minWidth??this.minWidth,this.minHeight=t.minHeight??this.minHeight,this.backdropClass=t.backdropClass??this.backdropClass,this.panelClass=t.panelClass??this.panelClass,this.viewportMargin=t.viewportMargin??this.viewportMargin,this.scrollStrategy=t.scrollStrategy??this.scrollStrategy,this.disableClose=t.disableClose??this.disableClose,this.transformOriginSelector=t.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=t.hasBackdrop??this.hasBackdrop,this.lockPosition=t.lockPosition??this.lockPosition,this.flexibleDimensions=t.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=t.growAfterOpen??this.growAfterOpen,this.push=t.push??this.push,this.disposeOnNavigation=t.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=t.usePopover??this.usePopover,this.matchWidth=t.matchWidth??this.matchWidth;}static \u0275fac=function(n){return new(n||i)};static \u0275dir=CE({type:i,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",PF],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",PF],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",PF],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",PF],push:[2,"cdkConnectedOverlayPush","push",PF],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",PF],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",PF],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Pm]})}return i})();var ct$2=class ct{static scrollToTop(){window.scroll({top:0,left:0,behavior:"smooth"});}static isElementDisplayed(a){let t=document.getElementById(a);return t?window.getComputedStyle(t).display!=="none":(console.warn(`Element with id "${a}" not found.`),false)}static composeImgSrc(a){return `data:image/jpeg;base64,${a}`}static imageExtensionFor(a){return a.type==="image/png"?"png":"jpg"}};var lt$2=(()=>{class e{_animationsDisabled=gt$3();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(n){return new(n||e)};static \u0275cmp=IE({type:e,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(n,i){n&2&&gh("mat-pseudo-checkbox-indeterminate",i.state==="indeterminate")("mat-pseudo-checkbox-checked",i.state==="checked")("mat-pseudo-checkbox-disabled",i.disabled)("mat-pseudo-checkbox-minimal",i.appearance==="minimal")("mat-pseudo-checkbox-full",i.appearance==="full")("_mat-animation-noopable",i._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(n,i){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return e})();var gt$2=["text"],ut$2=[[["mat-icon"]],"*"],bt$2=["mat-icon","*"];function ft$2(e,a){if(e&1&&Xp(0,"mat-pseudo-checkbox",1),e&2){let t=aD();Jp("disabled",t.disabled)("state",t.selected?"checked":"unchecked");}}function xt$1(e,a){if(e&1&&Xp(0,"mat-pseudo-checkbox",3),e&2){let t=aD();Jp("disabled",t.disabled);}}function vt$2(e,a){if(e&1&&(wi$1(0,"span",4),FD(1),Hc()),e&2){let t=aD();Hv(),qc("(",t.group.label,")");}}var mt$2=new S$1("MAT_OPTION_PARENT_COMPONENT"),dt$2=new S$1("MatOptgroup");var F=class{source;isUserInput;constructor(a,t=false){this.source=a,this.isUserInput=t;}},kt$2=(()=>{class e{_element=T$3(Tr$2);_changeDetectorRef=T$3(kF);_parent=T$3(mt$2,{optional:true});group=T$3(dt$2,{optional:true});_signalDisableRipple=false;_selected=false;_active=false;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=T$3(ut$3).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(t){this._disabled.set(t);}_disabled=Fe$3(false);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return !!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new qe$3;_text;_stateChanges=new ne$2;constructor(){let t=T$3(K$4);t.load(yo$2),t.load(Ce$2),this._signalDisableRipple=!!this._parent&&ar$4(this._parent.disableRipple);}get active(){return this._active}get viewValue(){return (this._text?.nativeElement.textContent||"").trim()}select(t=true){this._selected||(this._selected=true,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent());}deselect(t=true){this._selected&&(this._selected=false,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent());}focus(t,n){let i=this._getHostElement();typeof i.focus=="function"&&i.focus(n);}setActiveStyles(){this._active||(this._active=true,this._changeDetectorRef.markForCheck());}setInactiveStyles(){this._active&&(this._active=false,this._changeDetectorRef.markForCheck());}getLabel(){return this.viewValue}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!De$2(t)&&(this._selectViaInteraction(),t.preventDefault());}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:true,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(true));}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let t=this.viewValue;t!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=t);}}ngOnDestroy(){this._stateChanges.complete();}_emitSelectionChangeEvent(t=false){this.onSelectionChange.emit(new F(this,t));}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=IE({type:e,selectors:[["mat-option"]],viewQuery:function(n,i){if(n&1&&lh(gt$2,7),n&2){let o;fD(o=pD())&&(i._text=o.first);}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(n,i){n&1&&ih("click",function(){return i._selectViaInteraction()})("keydown",function(c){return i._handleKeydown(c)}),n&2&&(rh("id",i.id),Kp("aria-selected",i.selected)("aria-disabled",i.disabled.toString()),gh("mdc-list-item--selected",i.selected)("mat-mdc-option-multiple",i.multiple)("mat-mdc-option-active",i.active)("mdc-list-item--disabled",i.disabled));},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",PF]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:bt$2,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(n,i){n&1&&(lD(ut$2),ZE(0,ft$2,1,2,"mat-pseudo-checkbox",1),uD(1),wi$1(2,"span",2,0),uD(4,1),Hc(),ZE(5,xt$1,1,1,"mat-pseudo-checkbox",3),ZE(6,vt$2,2,1,"span",4),Xp(7,"div",5)),n&2&&(YE(i.multiple?0:-1),Hv(5),YE(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),Hv(),YE(i.group&&i.group._inert?6:-1),Hv(),Jp("matRippleTrigger",i._getHostElement())("matRippleDisabled",i.disabled||i.disableRipple));},dependencies:[lt$2,Xc],styles:[`.mat-mdc-option {
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
`],encapsulation:2})}return e})();function yt$2(e,a,t){if(t.length){let n=a.toArray(),i=t.toArray(),o=0;for(let c=0;c<e+1;c++)n[c].group&&n[c].group===i[o]&&o++;return o}return 0}function wt$3(e,a,t,n){return e<t?e:e+a>t+n?Math.max(0,e-n+a):t}var B$3=class B{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new ne$2;constructor(a=false,t,n=true,i){this._multiple=a,this._emitChanges=n,this.compareWith=i,t&&t.length&&(a?t.forEach(o=>this._markSelected(o)):this._markSelected(t[0]),this._selectedToEmit.length=0);}select(...a){this._verifyValueAssignment(a),a.forEach(n=>this._markSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}deselect(...a){this._verifyValueAssignment(a),a.forEach(n=>this._unmarkSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}setSelection(...a){this._verifyValueAssignment(a);let t=this.selected,n=new Set(a.map(o=>this._getConcreteValue(o)));a.forEach(o=>this._markSelected(o)),t.filter(o=>!n.has(this._getConcreteValue(o,n))).forEach(o=>this._unmarkSelected(o));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(a){return this.isSelected(a)?this.deselect(a):this.select(a)}clear(a=true){this._unmarkAll();let t=this._hasQueuedChanges();return a&&this._emitChangeEvent(),t}isSelected(a){return this._selection.has(this._getConcreteValue(a))}isEmpty(){return this._selection.size===0}hasValue(){return !this.isEmpty()}sort(a){this._multiple&&this.selected&&this._selected.sort(a);}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[]);}_markSelected(a){a=this._getConcreteValue(a),this.isSelected(a)||(this._multiple||this._unmarkAll(),this.isSelected(a)||this._selection.add(a),this._emitChanges&&this._selectedToEmit.push(a));}_unmarkSelected(a){a=this._getConcreteValue(a),this.isSelected(a)&&(this._selection.delete(a),this._emitChanges&&this._deselectedToEmit.push(a));}_unmarkAll(){this.isEmpty()||this._selection.forEach(a=>this._unmarkSelected(a));}_verifyValueAssignment(a){a.length>1&&this._multiple;}_hasQueuedChanges(){return !!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(a,t){if(this.compareWith){t=t??this._selection;for(let n of t)if(this.compareWith(a,n))return n;return a}else return a}};var Ct$2=["*"],Mt$4=`.mdc-list {
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
`,Dt$2=["unscopedContent"],It$3=["text"],Lt$1=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Tt$3=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var St$3=new S$1("ListOption"),Et$3=(()=>{class e{_elementRef=T$3(Tr$2);static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return e})(),At$4=(()=>{class e{_elementRef=T$3(Tr$2);static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return e})(),Ot$1=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return e})(),ht$2=(()=>{class e{_listOption=T$3(St$3,{optional:true});_isAlignedAtStart(){return !this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,hostVars:4,hostBindings:function(n,i){n&2&&gh("mdc-list-item__start",i._isAlignedAtStart())("mdc-list-item__end",!i._isAlignedAtStart());}})}return e})(),Rt$3=(()=>{class e extends ht$2{static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275dir=CE({type:e,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[Wp]})}return e})(),zt$2=(()=>{class e extends ht$2{static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275dir=CE({type:e,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[Wp]})}return e})(),Ft$2=new S$1("MAT_LIST_CONFIG"),Q$4=(()=>{class e{_isNonInteractive=true;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=Ki$2(t);}_disableRipple=false;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(Ki$2(t));}_disabled=Fe$3(false);_defaultOptions=T$3(Ft$2,{optional:true});static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,hostVars:1,hostBindings:function(n,i){n&2&&Kp("aria-disabled",i.disabled);},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return e})(),Pt$3=(()=>{class e{_elementRef=T$3(Tr$2);_ngZone=T$3(ue$1);_listBase=T$3(Q$4,{optional:true});_platform=T$3(x$1);_hostElement;_isButtonElement;_noopAnimations=gt$3();_avatars;_icons;set lines(t){this._explicitLines=_e$2(t,null),this._updateItemLines(false);}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=Ki$2(t);}_disableRipple=false;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(Ki$2(t));}_disabled=Fe$3(false);_subscriptions=new G$2;_rippleRenderer=null;_hasUnscopedTextContent=false;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){T$3(K$4).load(yo$2);let t=T$3(Fn$1,{optional:true});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button");}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(true);}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents();}_hasIconOrAvatar(){return !!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new Qt$2(this,this._ngZone,this._hostElement,this._platform,T$3(le$2)),this._rippleRenderer.setupTriggerEvents(this._hostElement);}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Dg(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(false)));});}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let n=this._explicitLines??this._inferLinesFromContent(),i=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",n<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",n<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",n===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",n===3),this._hasUnscopedTextContent){let o=this._titles.length===0&&n===1;i.classList.toggle("mdc-list-item__primary-text",o),i.classList.toggle("mdc-list-item__secondary-text",!o);}else i.classList.remove("mdc-list-item__primary-text"),i.classList.remove("mdc-list-item__secondary-text");}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()));}static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,contentQueries:function(n,i,o){if(n&1&&ch(o,Rt$3,4)(o,zt$2,4),n&2){let c;fD(c=pD())&&(i._avatars=c),fD(c=pD())&&(i._icons=c);}},hostVars:4,hostBindings:function(n,i){n&2&&(Kp("aria-disabled",i.disabled)("disabled",i._isButtonElement&&i.disabled||null),gh("mdc-list-item--disabled",i.disabled));},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return e})();var Ye=(()=>{class e extends Q$4{static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275cmp=IE({type:e,selectors:[["mat-list"]],hostAttrs:[1,"mat-mdc-list","mat-mdc-list-base","mdc-list"],exportAs:["matList"],features:[zD([{provide:Q$4,useExisting:e}]),Wp],ngContentSelectors:Ct$2,decls:1,vars:0,template:function(n,i){n&1&&(lD(),uD(0));},styles:[Mt$4],encapsulation:2})}return e})(),qe$1=(()=>{class e extends Pt$3{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=Ki$2(t);}_activated=false;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275cmp=IE({type:e,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(n,i,o){if(n&1&&ch(o,At$4,5)(o,Et$3,5)(o,Ot$1,5),n&2){let c;fD(c=pD())&&(i._lines=c),fD(c=pD())&&(i._titles=c),fD(c=pD())&&(i._meta=c);}},viewQuery:function(n,i){if(n&1&&lh(Dt$2,5)(It$3,5),n&2){let o;fD(o=pD())&&(i._unscopedContent=o.first),fD(o=pD())&&(i._itemText=o.first);}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(n,i){n&2&&(Kp("aria-current",i._getAriaCurrent()),gh("mdc-list-item--activated",i.activated)("mdc-list-item--with-leading-avatar",i._avatars.length!==0)("mdc-list-item--with-leading-icon",i._icons.length!==0)("mdc-list-item--with-trailing-meta",i._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",i._hasBothLeadingAndTrailing())("_mat-animation-noopable",i._noopAnimations));},inputs:{activated:"activated"},exportAs:["matListItem"],features:[Wp],ngContentSelectors:Tt$3,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(n,i){n&1&&(lD(Lt$1),uD(0),wi$1(1,"span",1),uD(2,1),uD(3,2),wi$1(4,"span",2,0),ih("cdkObserveContent",function(){return i._updateItemLines(true)}),uD(6,3),Hc()(),uD(7,4),uD(8,5),Xp(9,"div",3));},dependencies:[Ll],encapsulation:2})}return e})();var v$1=(i,t,e,s,r)=>s+(i-t)/(e-t)*(r-s),A$1=(i,t,e)=>Math.min(e,Math.max(t,i));var l=(i,t)=>i+Math.random()*(t-i),C$2=(i,t)=>Math.floor(l(i,t+1));var E={minIntervalSeconds:6,maxIntervalSeconds:14,durationSeconds:3,peakAlpha:.4,colorRgb:"255,235,205",radiusFraction:.6},f$1=class f{constructor(t={}){this.shineStartedAt=null,this.originX=.5,this.originY=.5,this.options=w$3(w$3({},E),t),this.nextShineAt=l(this.options.minIntervalSeconds,this.options.maxIntervalSeconds);}update(t){if(this.shineStartedAt===null){t>=this.nextShineAt&&(this.shineStartedAt=t,this.originX=l(.25,.75),this.originY=l(.25,.75));return}t-this.shineStartedAt>=this.options.durationSeconds&&(this.shineStartedAt=null,this.nextShineAt=t+l(this.options.minIntervalSeconds,this.options.maxIntervalSeconds));}draw(t,e,s,r){if(this.shineStartedAt===null)return;let n=(r-this.shineStartedAt)/this.options.durationSeconds,a=Math.sin(Math.PI*n);if(a<=0)return;let g=Math.min(e,s)*this.options.radiusFraction,o=e*this.originX,h=s*this.originY,p=t.createRadialGradient(o,h,0,o,h,g);p.addColorStop(0,`rgba(${this.options.colorRgb}, ${this.options.peakAlpha*a})`),p.addColorStop(1,`rgba(${this.options.colorRgb}, 0)`),t.save(),t.globalCompositeOperation="lighter",t.fillStyle=p,t.fillRect(0,0,e,s),t.restore();}};var d=class{constructor(t,e,s=1){this.depth=t,this.maxShift=e,this.ease=s,this.currentX=0,this.currentY=0;}update(t,e){let s=t*this.depth*this.maxShift,r=e*this.depth*this.maxShift;this.currentX+=(s-this.currentX)*this.ease,this.currentY+=(r-this.currentY)*this.ease;}get x(){return this.currentX}get y(){return this.currentY}reset(){this.currentX=0,this.currentY=0;}};function P(i){return C$4(this,null,function*(){let t=yield Promise.all(Object.entries(i).map(([e,s])=>new Promise((r,n)=>{let a=new Image;a.onload=()=>r([e,a]),a.onerror=()=>n(new Error(`Failed to load image: ${s}`)),a.src=s;})));return Object.fromEntries(t)})}var c="assets/images/canvases/",u=Math.PI*2,O$1=.0015,R$1="#241d18",X$3="rgba(36, 29, 24, 0.035)",Y$2=.6180339887*u,w$1=class w{constructor(){this.width=0,this.height=0,this.angle=0,this.prayerNumber=1,this.prayerCount=4,this.headParallax=new d(1,16,.03),this.bodyParallax=new d(.4,26,.02),this.lightShine=new f$1,this.prayers=[];}setup(t,e,s){return C$4(this,null,function*(){this.width=e,this.height=s;let r=yield P({head:`${c}cabeza.png`,p1:`${c}pryer1.png`,p2:`${c}pryer2.png`,p3:`${c}pryer3.png`,p4:`${c}pryer4.png`});this.head=r.head,this.prayers=[r.p1,r.p2,r.p3,r.p4],this.paintBase(t),this.reseed();})}resize(t,e,s){this.width=e,this.height=s,this.paintBase(t);}pointerDown(){this.reseed();}draw(t,e){let{width:s,height:r}=this;if(!this.head)return;t.fillStyle=X$3,t.fillRect(0,0,s,r);let n=e.pointer.active?e.pointer.x:s/2,a=e.pointer.active?e.pointer.y:r/2,g=v$1(n,0,s,20,260),o=v$1(a,0,r,20,260),h=e.pointer.active?A$1((n-s/2)/(s/2),-1,1):0,p=e.pointer.active?A$1((a-r/2)/(r/2),-1,1):0;this.headParallax.update(h,p),this.bodyParallax.update(h,p),t.drawImage(this.head,s/2-this.head.width/2+this.headParallax.x,r/2-this.head.height/2+this.headParallax.y),t.save(),t.translate(s/2+this.bodyParallax.x,r/2+this.bodyParallax.y),t.rotate(this.angle);for(let y=0;y<this.prayerCount;y++){t.save(),t.rotate(y*u/this.prayerCount),t.translate(0,g*1.5);for(let m=0;m<this.prayerCount;m++){t.save(),t.rotate(m*u/this.prayerCount),t.translate(0,o);for(let S=0;S<this.prayerCount;S++)t.save(),t.rotate(S*u/this.prayerCount),t.translate(0,o),this.drawPrayer(t,e.t,y,m,S),t.restore();t.restore();}t.restore();}t.restore(),this.lightShine.update(e.t),this.lightShine.draw(t,s,r,e.t),this.angle+=O$1;}drawPrayer(t,e,s,r,n){let a=this.prayers[this.prayerNumber-1]??this.prayers[0],o=((s*this.prayerCount+r)*this.prayerCount+n)*Y$2%u,h=1+.14*Math.sin(e*.5+o),p=.5+.35*(.5+.5*Math.sin(e*.35+o*1.7));t.save(),t.globalAlpha=p,t.scale(h,h),t.drawImage(a,-30,-45,60,90),t.restore();}paintBase(t){t.fillStyle=R$1,t.fillRect(0,0,this.width,this.height);}reseed(){this.prayerNumber=C$2(1,4),this.prayerCount=C$2(3,5);}};var M$2={believe:{label:"Believe",factory:()=>new w$1}},K$3=Object.entries(M$2).map(([i,t])=>({id:i,label:t.label}));var m$1=(()=>{class e{get vertical(){return this._vertical}set vertical(t){this._vertical=Ki$2(t);}_vertical=false;get inset(){return this._inset}set inset(t){this._inset=Ki$2(t);}_inset=false;static \u0275fac=function(r){return new(r||e)};static \u0275cmp=IE({type:e,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(r,i){r&2&&(Kp("aria-orientation",i.vertical?"vertical":"horizontal"),gh("mat-divider-vertical",i.vertical)("mat-divider-horizontal",!i.vertical)("mat-divider-inset",i.inset));},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(r,i){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2})}return e})();var gr$1={backendUrl:"https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/"};var le$1=0;function Ct$1(){return le$1}function M$1(r,e){return (...t)=>{try{return le$1=e,r(...t)}finally{le$1=0;}}}function At$3(r){return !r}function st$1(r){return r}function p(r){return Array.isArray(r)}function $$1(r){return (typeof r=="object"||typeof r=="function")&&r!=null}var w=Symbol(),ee$1=Symbol(),K$2=class K{predicates;fns=[];constructor(e){this.predicates=e;}push(e){this.fns.push(ot$2(this.predicates,e));}mergeIn(e){let t=this.predicates?e.fns.map(n=>ot$2(this.predicates,n)):e.fns;this.fns.push(...t);}hasRules(){return this.fns.length>0}},z=class extends K$2{get defaultValue(){return  false}compute(e){return this.fns.some(t=>{let n=t(e);return n&&n!==ee$1})}},T$1=class r extends K$2{ignore;static ignoreNull(e){return new r(e,t=>t===null)}constructor(e,t){super(e),this.ignore=t;}get defaultValue(){return []}compute(e){return this.fns.reduce((t,n)=>{let i=n(e);return i===void 0||i===ee$1?t:p(i)?[...t,...this.ignore?i.filter(s=>!this.ignore(s)):i]:this.ignore&&this.ignore(i)?t:[...t,i]},[])}},ce$2=class ce extends T$1{constructor(e){super(e,void 0);}},he$1=class he extends K$2{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(e,t){super(e),this.key=t;}compute(e){if(this.fns.length===0)return this.key.reducer.getInitial();let t=this.key.reducer.getInitial();for(let n=0;n<this.fns.length;n++){let i=this.fns[n](e);i!==ee$1&&(t=this.key.reducer.reduce(t,i));}return t}};function ot$2(r,e){return r.length===0?e:t=>{for(let n of r){let i=t.stateOf(n.path),s=ae$2(i.structure.pathKeys).length-n.depth;for(let o=0;o<s;o++)i=i.structure.parent;if(!n.fn(i.context))return ee$1}return e(t)}}var D=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(e){this.predicates=e,this.hidden=new z(e),this.disabledReasons=new ce$2(e),this.readonly=new z(e),this.syncErrors=T$1.ignoreNull(e),this.syncTreeErrors=T$1.ignoreNull(e),this.asyncErrors=T$1.ignoreNull(e);}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(e){return this.metadata.has(e)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(e){return this.metadata.has(e)||this.metadata.set(e,new he$1(this.predicates,e)),this.metadata.get(e)}mergeIn(e){this.hidden.mergeIn(e.hidden),this.disabledReasons.mergeIn(e.disabledReasons),this.readonly.mergeIn(e.readonly),this.syncErrors.mergeIn(e.syncErrors),this.syncTreeErrors.mergeIn(e.syncTreeErrors),this.asyncErrors.mergeIn(e.asyncErrors);for(let t of e.getMetadataKeys()){let n=e.metadata.get(t);this.getMetadata(t).mergeIn(n);}}},W$1=class W{depth;constructor(e){this.depth=e;}build(){return new Y$1(this,[],0)}},C$1=class r extends W$1{constructor(e){super(e);}current;all=[];addHiddenRule(e){this.getCurrent().addHiddenRule(e);}addDisabledReasonRule(e){this.getCurrent().addDisabledReasonRule(e);}addReadonlyRule(e){this.getCurrent().addReadonlyRule(e);}addSyncErrorRule(e){this.getCurrent().addSyncErrorRule(e);}addSyncTreeErrorRule(e){this.getCurrent().addSyncTreeErrorRule(e);}addAsyncErrorRule(e){this.getCurrent().addAsyncErrorRule(e);}addMetadataRule(e,t){this.getCurrent().addMetadataRule(e,t);}getChild(e){if(e===w){let t=this.getCurrent().children;t.size>(t.has(w)?1:0)&&(this.current=void 0);}return this.getCurrent().getChild(e)}hasLogic(e){return this===e?true:this.all.some(({builder:t})=>t.hasLogic(e))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:e})=>e.anyChildHasLogic())}mergeIn(e,t){t?this.all.push({builder:e,predicate:{fn:M$1(t.fn,this.depth),path:t.path}}):this.all.push({builder:e}),this.current=void 0;}getCurrent(){return this.current===void 0&&(this.current=new j$2(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new r(0)}},j$2=class j extends W$1{logic=new D([]);children=new Map;constructor(e){super(e);}addHiddenRule(e){this.logic.hidden.push(M$1(e,this.depth));}addDisabledReasonRule(e){this.logic.disabledReasons.push(M$1(e,this.depth));}addReadonlyRule(e){this.logic.readonly.push(M$1(e,this.depth));}addSyncErrorRule(e){this.logic.syncErrors.push(M$1(e,this.depth));}addSyncTreeErrorRule(e){this.logic.syncTreeErrors.push(M$1(e,this.depth));}addAsyncErrorRule(e){this.logic.asyncErrors.push(M$1(e,this.depth));}addMetadataRule(e,t){this.logic.getMetadata(e).push(M$1(t,this.depth));}getChild(e){return this.children.has(e)||this.children.set(e,new C$1(this.depth+1)),this.children.get(e)}hasLogic(e){return this===e}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let e of this.children.values())if(e.hasRules())return  true;return  false}},Y$1=class r{builder;predicates;depth;logic;constructor(e,t,n){this.builder=e,this.predicates=t,this.depth=n,this.logic=e?It$2(e,t,n):new D([]);}getChild(e){let t=this.builder?ut$1(this.builder,e):[];if(t.length===0)return new r(void 0,[],this.depth+1);if(t.length===1){let{builder:n,predicates:i}=t[0];return new r(n,[...this.predicates,...i.map(s=>me$1(s,this.depth))],this.depth+1)}else {let n=t.map(({builder:i,predicates:s})=>new r(i,[...this.predicates,...s.map(o=>me$1(o,this.depth))],this.depth+1));return new fe$1(n)}}hasLogic(e){return this.builder?this.builder.hasLogic(e):false}hasRules(){return this.builder?this.builder.hasRules():false}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():false}},fe$1=class r{all;logic;constructor(e){this.all=e,this.logic=new D([]);for(let t of e)this.logic.mergeIn(t.logic);}getChild(e){return new r(this.all.flatMap(t=>t.getChild(e)))}hasLogic(e){return this.all.some(t=>t.hasLogic(e))}hasRules(){return this.all.some(e=>e.hasRules())}anyChildHasLogic(){return this.all.some(e=>e.anyChildHasLogic())}};function ut$1(r,e){if(r instanceof C$1)return r.all.flatMap(({builder:t,predicate:n})=>{let i=ut$1(t,e);return n?i.map(({builder:s,predicates:o})=>({builder:s,predicates:[...o,n]})):i});if(r instanceof j$2)return [...e!==w&&r.children.has(w)?[{builder:r.getChild(w),predicates:[]}]:[],...r.children.has(e)?[{builder:r.getChild(e),predicates:[]}]:[]];throw new b$2(1909,false)}function It$2(r,e,t){let n=new D(e);if(r instanceof C$1){let i=r.all.map(({builder:s,predicate:o})=>new Y$1(s,o?[...e,me$1(o,t)]:e,t));for(let s of i)n.mergeIn(s.logic);}else if(r instanceof j$2)n.mergeIn(r.logic);else throw new b$2(1909,false);return n}function me$1(r,e){return x$3(w$3({},r),{depth:e})}var lt$1=Symbol("PATH"),b$1=class r{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,kt$1);logicBuilder;constructor(e,t,n,i){this.keys=e,this.parent=n,this.keyInParent=i,this.root=t??this,n||(this.logicBuilder=C$1.newRoot());}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(e){return this.children.has(e)||this.children.set(e,new r([...this.keys,e],this.root,this,e)),this.children.get(e)}mergeIn(e,t){let n=e.compile();this.builder.mergeIn(n.builder,t);}static unwrapFieldPath(e){return e[lt$1]}static newRoot(){return new r([],void 0,void 0,void 0)}},kt$1={get(r,e){return e===lt$1?r:r.getChild(e).fieldPathProxy}},q$2,L$1=new Map,X$2=class r{schemaFn;constructor(e){this.schemaFn=e;}compile(){if(L$1.has(this))return L$1.get(this);let e=b$1.newRoot();L$1.set(this,e);let t=q$2;try{q$2=e,this.schemaFn(e.fieldPathProxy);}finally{q$2=t;}return e}static create(e){return e instanceof r?e:new r(e)}static rootCompile(e){try{return L$1.clear(),e===void 0?b$1.newRoot():e instanceof r?e.compile():new r(e).compile()}finally{L$1.clear();}}};function Pt$2(r){return r instanceof X$2||typeof r=="function"}function te$1(r){if(q$2!==b$1.unwrapFieldPath(r).root)throw new b$2(1908,false)}function B$2(r,e,t){return te$1(r),b$1.unwrapFieldPath(r).builder.addMetadataRule(e,t),e}var A={list(){return {reduce:(r,e)=>e===void 0?r:[...r,e],getInitial:()=>[]}},min(){return {reduce:(r,e)=>r===void 0||e===void 0?r??e:e<r?e:r,getInitial:()=>{}}},max(){return {reduce:(r,e)=>r===void 0||e===void 0?r??e:e>r?e:r,getInitial:()=>{}}},or(){return {reduce:(r,e)=>r||e,getInitial:()=>false}},and(){return {reduce:(r,e)=>r&&e,getInitial:()=>true}},override:Ft$1};function Ft$1(r){return {reduce:(e,t)=>t,getInitial:()=>r?.()}}var Re$1=Symbol("IS_ASYNC_VALIDATION_RESOURCE"),Z$1=class Z{reducer;create;brand;[Re$1];constructor(e,t){this.reducer=e,this.create=t;}};function v(r){return new Z$1(r??A.override())}function Te(){return v()}var De$1=v(A.or()),ct$1=Te();var ht$1=Te();var ft$1=v(A.max()),Ce$1=v(A.min()),mt$1=v(A.list());function g(r,e){if(r===e)return  true;if(!r||!e||r.length!==e.length)return  false;for(let t=0;t<r.length;t++)if(!Object.is(r[t],e[t]))return  false;return  true}function Ot(r){return r.errors().length>0?"invalid":r.pending()?"unknown":"valid"}var ge$1=class ge{node;constructor(e){this.node=e;}rawSyncTreeErrors=dt$3(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:g});syncErrors=dt$3(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),..._t$1(this.node.submitState.submissionErrors())],{equal:g});syncValid=dt$3(()=>this.shouldSkipValidation()?true:this.node.structure.reduceChildren(this.syncErrors().length===0,(e,t)=>t&&e.validationState.syncValid(),At$3));syncTreeErrors=dt$3(()=>this.rawSyncTreeErrors().filter(e=>e.fieldTree===this.node.fieldTree),{equal:g});rawAsyncErrors=dt$3(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:g});asyncErrors=dt$3(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(e=>e==="pending"||e.fieldTree===this.node.fieldTree),{equal:g});parseErrors=dt$3(()=>this.node.formFieldBindings().flatMap(e=>e.parseErrors()),{equal:g});errors=dt$3(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(e=>e!=="pending")],{equal:g});errorSummary=dt$3(()=>{let e=this.node.structure.reduceChildren(this.errors(),(t,n)=>[...n,...t.errorSummary()]);return ae$2(()=>e.sort(Vt$2)),e},{equal:g});pending=dt$3(()=>this.node.structure.reduceChildren(this.asyncErrors().includes("pending"),(e,t)=>t||e.validationState.asyncErrors().includes("pending")));status=dt$3(()=>{if(this.shouldSkipValidation())return "valid";let e=Ot(this);return this.node.structure.reduceChildren(e,(t,n)=>n==="invalid"||t.validationState.status()==="invalid"?"invalid":n==="unknown"||t.validationState.status()==="unknown"?"unknown":"valid",t=>t==="invalid")});valid=dt$3(()=>this.status()==="valid");invalid=dt$3(()=>this.status()==="invalid");shouldSkipValidation=dt$3(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function _t$1(r){return r===void 0?[]:p(r)?r:[r]}function Ae(r,e){if(p(r))for(let t of r)t.fieldTree??=e;else r&&(r.fieldTree??=e);return r}function at$2(r){return r.formField?r.formField.element:r.fieldTree().formFieldBindings().reduce((e,t)=>!e||!t.element?e??t.element:e.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t.element:e,void 0)}function Vt$2(r,e){let t=at$2(r),n=at$2(e);return t===n?0:t===void 0||n===void 0?t===void 0?1:-1:t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var ye$1=v(),pe$1=class pe{node;cache=new WeakMap;constructor(e){this.node=e,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this);}resolve(e){if(!this.cache.has(e)){let t=dt$3(()=>{let n=b$1.unwrapFieldPath(e),i=this.node,s=Ct$1();for(;s>0||!i.structure.logic.hasLogic(n.root.builder);)if(s--,i=i.structure.parent,i===void 0)throw new b$2(1900,false);for(let o of n.keys)if(i=i.structure.getChild(o),i===void 0)throw new b$2(1901,false);return i.fieldTree});this.cache.set(e,t);}return this.cache.get(e)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=dt$3(()=>{let e=this.key();if(!p(ae$2(this.node.structure.parent.value)))throw new b$2(1906,false);return Number(e)});fieldTreeOf(e){return this.resolve(e)}stateOf(e){return this.resolve(e)()}valueOf=e=>{let t=this.resolve(e)().value();if(t instanceof Be$1)throw new b$2(1907,false);return t}},be$1=class be{node;metadata=new Map;constructor(e){this.node=e;}runMetadataCreateLifecycle(){this.node.logicNode.logic.hasMetadataKeys()&&ae$2(()=>No$3(this.node.structure.injector,()=>{for(let e of this.node.logicNode.logic.getMetadataKeys())if(e.create){let t=this.node.logicNode.logic.getMetadata(e),n=e.create(this.node,dt$3(()=>t.compute(this.node.context)));this.metadata.set(e,n);}}));}get(e){if(this.has(e)&&!this.metadata.has(e)){if(e.create)throw new b$2(1912,false);let t=this.node.logicNode.logic.getMetadata(e);this.metadata.set(e,dt$3(()=>t.compute(this.node.context)));}return this.metadata.get(e)}has(e){return this.node.logicNode.logic.hasMetadata(e)}},Lt={get(r,e,t){let n=r(),i=n.structure.getChild(e);if(i!==void 0)return i.fieldTree;let s=ae$2(n.value);if(p(s)){if(e==="length")return n.value().length;if(e===Symbol.iterator)return ()=>(n.value(),Array.prototype[Symbol.iterator].apply(n.fieldTree))}if($$1(s)&&e===Symbol.iterator)return function*(){for(let o in t)yield [o,t[o]];}},getOwnPropertyDescriptor(r,e){let t=ae$2(r().value),n=Reflect.getOwnPropertyDescriptor(t,e);return n&&!n.configurable&&(n.configurable=true),n},ownKeys(r){let e=ae$2(r().value);return typeof e=="object"&&e!==null?Reflect.ownKeys(e):[]}};function Kt$2(r,e){let t=dt$3(()=>r()[e()]);return t[F$2]=r[F$2],t.set=n=>{Object.is(ae$2(t),n)||r.update(i=>jt$1(i,n,e()));},t.update=n=>{t.set(n(ae$2(t)));},t.asReadonly=()=>t,t}function jt$1(r,e,t){if(p(r)){let n=[...r];return n[t]=e,n}else return x$3(w$3({},r),{[t]:e})}var R=Symbol(""),gt$1=dt$3(()=>false),Q$3=class Q{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=le$2.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(e,t,n){this.logic=e,this.node=t,this.createChildNode=n;}children(){this.ensureChildrenMap();let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>ae$2(t.reader))}materializedChildren(){let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>t.node)}_areChildrenMaterialized(){return ae$2(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||ae$2(()=>{this.childrenMap.update(e=>this.computeChildrenMap(this.value(),e,true));});}getChild(e){this.ensureChildrenMap();let t=e.toString(),n=ae$2(this.childrenMap)?.byPropertyKey.get(t)?.reader;return n||(n=this.createReader(t)),n()}reduceChildren(e,t,n){let i=this.childrenMap();if(!i)return e;let s=e;for(let o of i.byPropertyKey.values()){if(n?.(s))break;s=t(ae$2(o.reader),s);}return s}destroy(){this.injector.destroy();}createKeyOrOrphanSignals(e,t,n){if(e==="root")return {keyInParent:yt$1,isOrphaned:gt$1};let i=this.parent,s=n,o=dt$3(()=>{if(i.structure.isOrphaned())return R;let c=i.structure.childrenMap();if(!c)return R;let f=c.byPropertyKey.get(s);if(f&&f.node===this.node)return s;if(t===void 0)return R;for(let[P,ie]of c.byPropertyKey)if(ie.node===this.node)return s=P;return R}),d=dt$3(()=>o()===R);return {keyInParent:dt$3(()=>{let c=o();if(c===R)throw t===void 0?new b$2(-1902,false):new b$2(1904,false);return c}),isOrphaned:d}}createChildrenMap(){return Yc({source:this.value,computation:(e,t)=>this.computeChildrenMap(e,t?.value,false)})}computeChildrenMap(e,t,n){if(!$$1(e)||!n&&t===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;t??={byPropertyKey:new Map};let i,s=p(e);t!==void 0&&(s?i=Bt$1(t,e,this.identitySymbol):i=Ut$2(t,e));for(let o of Object.keys(e)){let d,u=e[o];if(u===void 0){t.byPropertyKey.has(o)&&(i??=w$3({},t),i.byPropertyKey.delete(o));continue}s&&$$1(u)&&!p(u)&&(d=u[this.identitySymbol]??=Symbol(""));let c;d&&(t.byTrackingKey?.has(d)||(i??=w$3({},t),i.byTrackingKey??=new Map,i.byTrackingKey.set(d,this.createChildNode(o,d,s))),c=(i??t).byTrackingKey.get(d));let f=t.byPropertyKey.get(o);f===void 0?(i??=w$3({},t),i.byPropertyKey.set(o,{reader:this.createReader(o),node:c??this.createChildNode(o,d,s)})):c&&c!==f.node&&(i??=w$3({},t),f.node=c);}return i??t}createReader(e){return dt$3(()=>this.childrenMap()?.byPropertyKey.get(e)?.node)}},ve$1=class ve extends Q$3{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return xt}get keyInParent(){return yt$1}isOrphaned=gt$1;childrenMap;constructor(e,t,n,i,s){super(t,e,s),this.fieldManager=n,this.value=i,this.childrenMap=this.createChildrenMap();}},Ne=class extends Q$3{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(e,t,n,i,s,o){super(t,e,o),this.logic=t,this.parent=n,this.root=this.parent.structure.root;let d=this.createKeyOrOrphanSignals("child",i,s);this.isOrphaned=d.isOrphaned,this.keyInParent=d.keyInParent,this.pathKeys=dt$3(()=>[...n.structure.pathKeys(),this.keyInParent()]),this.value=Kt$2(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this);}};var xt=dt$3(()=>[]),yt$1=dt$3(()=>{throw new b$2(1905,false)});function Bt$1(r,e,t){let n,i=new Set(r.byPropertyKey.keys()),s=new Set(r.byTrackingKey?.keys());for(let o=0;o<e.length;o++){let d=e[o];i.delete(o.toString()),$$1(d)&&d.hasOwnProperty(t)&&s.delete(d[t]);}if(i.size>0){n??=w$3({},r);for(let o of i)n.byPropertyKey.delete(o);}if(s.size>0){n??=w$3({},r);for(let o of s)n.byTrackingKey?.delete(o);}return n}function Ut$2(r,e){let t;for(let n of r.byPropertyKey.keys())e.hasOwnProperty(n)||(t??=w$3({},r),t.byPropertyKey.delete(n));return t}var Me$1=class Me{node;selfSubmitting=Fe$3(false);submissionErrors;constructor(e){this.node=e,this.submissionErrors=Yc({source:this.node.structure.value,computation:()=>[]});}submitting=dt$3(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??false))},x=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new pe$1(this)}fieldProxy=new Proxy(()=>this,Lt);pathNode;constructor(e){this.pathNode=e.pathNode,this.fieldAdapter=e.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,e),this.validationState=this.fieldAdapter.createValidationState(this,e),this.nodeState=this.fieldAdapter.createNodeState(this,e),this.metadataState=new be$1(this),this.submitState=new Me$1(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle();}focusBoundControl(e){this.getBindingForFocus()?.focus(e);}getBindingForFocus(){let e=this.formFieldBindings().filter(t=>t.focus!==void 0).reduce(dt$1,void 0);return e||this.structure.children().map(t=>t.getBindingForFocus()).reduce(dt$1,void 0)}pendingSync=Yc({source:()=>this.value(),computation:(e,t)=>{t?.value?.abort();}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let e=this.metadata(ht$1)?.();return e?this.metadata(e):void 0}get maxLength(){return this.metadata(Ce$1)}get min(){let e=this.metadata(ct$1)?.();return e?this.metadata(e):void 0}get minLength(){return this.metadata(ft$1)}get pattern(){return this.metadata(mt$1)??Ht$1}get required(){return this.metadata(De$1)??Gt$2}metadata(e){return this.metadataState.get(e)}getError(e){return this.errors().find(t=>t.kind===e)}hasMetadata(e){return this.metadataState.has(e)}markAsTouched(e){this.structure.isOrphaned()||ae$2(()=>{this.markAsTouchedInternal(e),this.flushSync();});}markAsTouchedInternal(e){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!e?.skipDescendants))for(let t of this.structure.children())t.markAsTouchedInternal();}markAsDirty(){this.nodeState.markAsDirty();}markAsPristine(){this.nodeState.markAsPristine();}markAsUntouched(){this.nodeState.markAsUntouched();}reset(e){ae$2(()=>this._reset(e));}_reset(e){this.pendingSync()?.abort(),e!==void 0&&this.value.set(e),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let t of this.formFieldBindings())t.reset();for(let t of this.structure.materializedChildren())t._reset();}reloadValidation(){ae$2(()=>this._reloadValidation());}_reloadValidation(){let e=this.logicNode.logic.getMetadataKeys();for(let t of e)t[Re$1]&&this.metadata(t).reload?.();for(let t of this.structure.children())t._reloadValidation();}controlValueSignal(){let e=Yc(this.value);e.rawSet=e.set,e.set=n=>{e.rawSet(n),this.markAsDirty(),this.debounceSync();};let t=e.update;return e.update=n=>{t(n),this.markAsDirty(),this.debounceSync();},e}sync(){this.value.set(this.controlValue());}flushSync(){let e=this.pendingSync();e&&!e.signal.aborted&&(e.abort(),this.sync());}debounceSync(){return C$4(this,null,function*(){let e=ae$2(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(e){let t=new AbortController,n=e(t.signal);if(n&&(this.pendingSync.set(t),yield n,t.signal.aborted))return}this.structure.isOrphaned()||this.sync();})}static newRoot(e,t,n,i){return i.newRoot(e,t,n,i)}createStructure(e){return e.kind==="root"?new ve$1(this,e.logic,e.fieldManager,e.value,this.newChild.bind(this)):new Ne(this,e.logic,e.parent,e.identityInParent,e.initialKeyInParent,this.newChild.bind(this))}newChild(e,t,n){let i,s;return n?(i=this.pathNode.getChild(w),s=this.structure.logic.getChild(w)):(i=this.pathNode.getChild(e),s=this.structure.logic.getChild(e)),this.fieldAdapter.newChild({kind:"child",parent:this,pathNode:i,logic:s,initialKeyInParent:e,identityInParent:t,fieldAdapter:this.fieldAdapter})}},Ht$1=dt$3(()=>[]),Gt$2=dt$3(()=>false);function dt$1(r,e){return r?e&&r.element.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e:r:e}var Ee=class{node;selfTouched=Fe$3(false);selfDirty=Fe$3(false);markAsTouched(){this.selfTouched.set(true);}markAsDirty(){this.selfDirty.set(true);}markAsPristine(){this.selfDirty.set(false);}markAsUntouched(){this.selfTouched.set(false);}formFieldBindings=Fe$3([]);constructor(e){this.node=e;}dirty=dt$3(()=>{let e=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,n)=>n||t.nodeState.dirty(),st$1)});touched=dt$3(()=>{let e=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,n)=>n||t.nodeState.touched(),st$1)});disabledReasons=dt$3(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:g});disabled=dt$3(()=>!!this.disabledReasons().length);readonly=dt$3(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??false);hidden=dt$3(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??false);name=dt$3(()=>{let e=this.node.structure.parent;return e?`${e.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=dt$3(()=>{if(this.node.logicNode.logic.hasMetadata(ye$1)){let t=this.node.logicNode.logic.getMetadata(ye$1).compute(this.node.context);if(t)return n=>t(this.node.context,n)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=dt$3(()=>this.hidden()||this.disabled()||this.readonly())},we$2=class we{newRoot(e,t,n,i){return new x({kind:"root",fieldManager:e,value:t,pathNode:n,logic:n.builder.build(),fieldAdapter:i})}newChild(e){return new x(e)}createNodeState(e){return new Ee(e)}createValidationState(e){return new ge$1(e)}createStructure(e,t){return e.createStructure(t)}},Se$2=class Se{injector;rootName;submitOptions;constructor(e,t,n){this.injector=e,this.rootName=t??`${this.injector.get(da$2)}.form${qt$2++}`,this.submitOptions=n;}structures=new Set;createFieldManagementEffect(e){pa$2(()=>{let t=new Set;this.markStructuresLive(e,t);for(let n of this.structures)t.has(n)||(this.structures.delete(n),ae$2(()=>n.destroy()));},{injector:this.injector});}markStructuresLive(e,t){t.add(e);for(let n of e.children())this.markStructuresLive(n.structure,t);}},qt$2=0,pt$1=new S$1("");function $t(r){let e,t,n;return r.length===3?[e,t,n]=r:r.length===2?Pt$2(r[1])?[e,t]=r:[e,n]=r:[e]=r,[e,t,n]}function zt$1(...r){let[e,t,n]=$t(r),i=n?.injector??T$3(le$2),s=No$3(i,()=>X$2.rootCompile(t)),o=new Se$2(i,n?.name,n?.submission),d=n?.adapter??new we$2,u=x.newRoot(o,e,s,d);o.createFieldManagementEffect(u.structure);let{experimentalWebMcpTool:c}=n??{};if(c){let f=No$3(i,()=>T$3(pt$1,{optional:!0}));f&&No$3(i,()=>f(u.fieldTree,{name:c.name,description:c.description}));}return u.fieldTree}function bt$1(r,e){return C$4(this,null,function*(){let t=ae$2(r);if(ae$2(t.submitState.submitting))return  false;let n=e===void 0?t.structure.root.fieldProxy:r,i={root:t.structure.root.fieldProxy,submitted:r};e=typeof e=="function"?{action:e}:e??t.structure.fieldManager.submitOptions;let s=e?.action;if(!s)throw new b$2(1915,false);t.markAsTouched();let o=e?.onInvalid,d=Wt$2(t,e?.ignoreValidators);try{if(d){t.submitState.selfSubmitting.set(!0);let u=yield ae$2(()=>s?.(n,i));return u&&Yt$2(t,u),!u||p(u)&&u.length===0}else ae$2(()=>o?.(n,i));return !1}finally{t.submitState.selfSubmitting.set(false);}})}function Wt$2(r,e){switch(e){case "all":return  true;case "none":return ae$2(r.valid);default:return !ae$2(r.invalid)}}function Yt$2(r,e){p(e)||(e=[e]);let t=new Map;for(let n of e){let i=Ae(n,r.fieldTree),s=i.fieldTree(),o=t.get(s);o||(o=[],t.set(s,o)),o.push(i);}for(let[n,i]of t)n.submitState.submissionErrors.set(i);}var J$2=class J{kind="compat";control;fieldTree;context;message;constructor({context:e,kind:t,control:n}){this.context=e,this.kind=t,this.control=n;}};function vt$1(r){if(r.length===0)return null;let e={};for(let t of r)e[t.kind]=t instanceof J$2?t.context:t;return e}function Nt$1(r,e){return r===null?[]:Object.entries(r).map(([t,n])=>new J$2({context:n,kind:t,control:e}))}var Xt$1=new S$1("");function Yr(r,e){te$1(r);let t=b$1.unwrapFieldPath(r),n;typeof e=="function"||typeof e=="string"?n=e:n=e?.when,t.builder.addDisabledReasonRule(i=>{let s=true;return typeof n=="string"?s=n:n&&(s=n(i)),typeof s=="string"?{fieldTree:i.fieldTree,message:s}:s?{fieldTree:i.fieldTree}:void 0});}function Zt$1(r){let e=r;return typeof e.length=="number"?e.length:e.size}function I$2(r,e){return r instanceof Function?r(e):r}function _e$1(r){return typeof r=="number"?isNaN(r):r===""||r===false||r==null}function Mt$3(r){return r===void 0?[]:Array.isArray(r)?r:[r]}function Ve$2(r,e){te$1(r),b$1.unwrapFieldPath(r).builder.addSyncErrorRule(n=>Ae(e(n),n.fieldTree));}function Qt$1(r){return new Ie(r)}function Jt$1(r,e){return new ke$2(r,e)}function er$1(r){return new Pe$2(r)}var k$1=class k{__brand=void 0;kind="";fieldTree;message;constructor(e){e&&Object.assign(this,e);}},Ie=class extends k$1{kind="required"};var ke$2=class ke extends k$1{maxLength;kind="maxLength";constructor(e,t){super(t),this.maxLength=e;}};var Pe$2=class Pe extends k$1{kind="email"},re$1=class re extends k$1{kind="parse"};var tr$1=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;function Xr(r,e){Ve$2(r,t=>{if(!_e$1(t.value())&&!tr$1.test(t.value()))return er$1({message:I$2(e?.message,t)})});}function Zr(r,e,t){let n=B$2(r,v(),i=>{return e});B$2(r,Ce$1,({state:i})=>i.metadata(n)()),Ve$2(r,i=>{if(_e$1(i.value()))return;let s=i.state.metadata(n)();if(s!==void 0&&Zt$1(i.value())>s)return Jt$1(s,{message:I$2(t?.message,i)})});}function Qr(r,e){let t=B$2(r,v(),n=>true);B$2(r,De$1,({state:n})=>n.metadata(t)()),Ve$2(r,n=>{if(n.state.metadata(t)()&&_e$1(n.value()))return Qt$1({message:I$2(e?.message,n)})});}function rr$1(r,e,t){let n=Yc({source:r,computation:()=>[],equal:g}),i=o=>{let d=t(o);n.set(Mt$3(d.error)),d.value!==void 0&&e(d.value),n.set(Mt$3(d.error));},s=()=>{n.set([]);};return {errors:n.asReadonly(),setRawValue:i,reset:s}}var Fe$1=class Fe{field;constructor(e){this.field=e;}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return !this.field().disabled()}get errors(){return vt$1(this.field().errors())}get pristine(){return !this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return !this.field().touched()}get status(){if(this.field().disabled())return "DISABLED";if(this.field().valid())return "VALID";if(this.field().invalid())return "INVALID";if(this.field().pending())return "PENDING";throw new b$2(1910,false)}valueAccessor=null;hasValidator(e){return e===Pn$1.required?this.field().required():false}updateValueAndValidity(){}},Oe$2={disabled:"disabled",disabledReasons:"disabledReasons",dirty:"dirty",errors:"errors",hidden:"hidden",invalid:"invalid",max:"max",maxLength:"maxLength",min:"min",minLength:"minLength",name:"name",pattern:"pattern",pending:"pending",readonly:"readonly",required:"required",touched:"touched"},nr$1=(()=>{let r={};for(let e of Object.keys(Oe$2))r[Oe$2[e]]=e;return r})();function Le$1(r,e){let t=nr$1[e];return r[t]?.()}var Ke=Object.values(Oe$2);function ne(){return {}}function S(r,e,t){return r[e]!==t?(r[e]=t,true):false}function ir$1(r,e,t){let n;if(Rt$2(r)&&t.isBadInput(r))return {error:new re$1};switch(r.type){case "checkbox":return {value:r.checked};case "number":case "range":case "datetime-local":if(n=ae$2(e),typeof n=="number"||n===null)return {value:r.value===""?null:r.valueAsNumber};break;case "date":case "month":case "time":case "week":if(n=ae$2(e),n===null||n instanceof Date)return {value:r.valueAsDate};if(typeof n=="number")return {value:r.valueAsNumber};break}if(r.tagName==="INPUT"&&r.type==="text"&&(n??=ae$2(e),typeof n=="number"||n===null)){if(r.value==="")return {value:null};let i=Number(r.value);return Number.isNaN(i)?{error:new re$1}:{value:i}}return {value:r.value}}function Et$2(r,e){switch(r.type){case "checkbox":r.checked=e;return;case "radio":r.checked=e===r.value;return;case "number":case "range":case "datetime-local":if(typeof e=="number"){wt$2(r,e);return}else if(e===null){r.value="";return}break;case "date":case "month":case "time":case "week":if(e===null||e instanceof Date){r.valueAsDate=e;return}else if(typeof e=="number"){wt$2(r,e);return}}if(r.tagName==="INPUT"&&r.type==="text"){if(typeof e=="number"){r.value=isNaN(e)?"":String(e);return}if(e===null){r.value="";return}}r.value=e;}function wt$2(r,e){isNaN(e)?r.value="":r.valueAsNumber=e;}function Rt$2(r){return r.tagName==="INPUT"}function sr$1(r){return r.type==="date"||r.type==="datetime-local"||r.type==="month"||r.type==="time"||r.type==="week"}function or$1(r,e){let t=r.getUTCFullYear(),n=String(r.getUTCMonth()+1).padStart(2,"0");if(e==="month")return `${t}-${n}`;let i=String(r.getUTCDate()).padStart(2,"0");return `${t}-${n}-${i}`}function Tt$2(r,e,t){return e instanceof Date&&(r==="min"||r==="max")&&(t==="date"||t==="month")?or$1(e,t):e}function ar$1(r,e){r.listenToCustomControlModel(n=>e.state().controlValue.set(n)),r.listenToCustomControlOutput("touch",()=>e.state().markAsTouched()),e.registerAsBinding(r.customControl);let t=ne();return ()=>{let n=e.state(),i=n.controlValue();S(t,"controlValue",i)&&r.setCustomControlModelInput(i);for(let s of Ke){let o;if(s==="errors"?o=e.errors():o=Le$1(n,s),S(t,s,o)&&(r.setInputOnDirectives(s,o),e.elementAcceptsNativeProperty(s)&&!r.customControlHasInput(s))){let d=Tt$2(s,o,e.nativeFormElement.type);is$1(e.renderer,e.nativeFormElement,s,d);}}}}function dr$1(r){return typeof r=="object"&&r!==null}function ur$1(r,e){let t=ne();e.controlValueAccessor.registerOnChange(i=>{t.controlValue=i,e.state().controlValue.set(i);}),e.controlValueAccessor.registerOnTouched(()=>e.state().markAsTouched());let n=e.injector.get(Ue$2,null,{optional:true,self:true});if(n){let i;for(let u of n)dr$1(u)&&u.registerOnValidatorChange&&(i??=Fe$3(0),u.registerOnValidatorChange(()=>{i.update(c=>c+1);}));let s=n.map(u=>typeof u=="function"?u:u.validate.bind(u)),o=Pn$1.compose(s),d=dt$3(()=>{i?.();let u=o?o(e.interopNgControl.control):null;return Nt$1(u,e.interopNgControl.control)});e.parseErrorsSource.set(d);}return e.registerAsBinding({reset:()=>{let i=e.state().value();t.controlValue=i,ae$2(()=>e.controlValueAccessor.writeValue(i));}}),()=>{let i=e.state(),s=i.value();S(t,"controlValue",s)&&ae$2(()=>e.controlValueAccessor.writeValue(s));for(let o of Ke){let d=Le$1(i,o);if(S(t,o,d)){let u=r.setInputOnDirectives(o,d);o==="disabled"&&e.controlValueAccessor.setDisabledState?ae$2(()=>e.controlValueAccessor.setDisabledState(d)):!u&&e.elementAcceptsNativeProperty(o)&&is$1(e.renderer,e.nativeFormElement,o,d);}}}}function lr$1(r,e,t){if(typeof MutationObserver!="function")return;let n=new MutationObserver(i=>{i.some(s=>cr$1(s))&&e();});n.observe(r,{attributes:true,attributeFilter:["value"],characterData:true,childList:true,subtree:true}),t.onDestroy(()=>n.disconnect());}function cr$1(r){if(r.type==="childList"||r.type==="characterData"){if(r.target instanceof Comment)return  false;for(let e of r.addedNodes)if(!(e instanceof Comment))return  true;for(let e of r.removedNodes)if(!(e instanceof Comment))return  true;return  false}return r.type==="attributes"&&r.target instanceof HTMLOptionElement}function hr$1(r,e,t,n){let i=false,s=e.nativeFormElement,o=rr$1(()=>e.state().value(),u=>e.state().controlValue.set(u),u=>ir$1(s,e.state().value,n));t.set(o.errors),e.onReset=()=>{o.reset();let u=e.state().value();d.controlValue=u,Et$2(s,u);},r.listenToDom("input",()=>o.setRawValue(void 0)),r.listenToDom("blur",()=>e.state().markAsTouched()),Rt$2(s)&&sr$1(s)&&n.watchValidity(e.destroyRef,s,()=>o.setRawValue(void 0)),e.registerAsBinding(),s.tagName==="SELECT"&&lr$1(s,()=>{i&&(s.value=e.state().controlValue());},e.destroyRef);let d=ne();return ()=>{let u=e.state();for(let f of Ke){let P=Le$1(u,f);if(S(d,f,P)&&(r.setInputOnDirectives(f,P),e.elementAcceptsNativeProperty(f))){let ie=Tt$2(f,P,s.type);is$1(e.renderer,s,f,ie);}}let c=u.controlValue();S(d,"controlValue",c)&&Et$2(s,c),i=true;}}var Dt$1=(()=>{class r{static \u0275fac=function(n){return new(n||r)};static \u0275prov=re$3({token:r,factory:t=>fr$1.\u0275fac(t),providedIn:"root"})}return r})(),fr$1=(()=>{class r extends Dt$1{document=T$3(ir$3);cspNonce=T$3(Em,{optional:true});injectedStyles=new WeakMap;watchValidity(t,n,i){let s=n.getRootNode();this.injectedStyles.has(s)||this.injectedStyles.set(s,this.createTransitionStyle(s));let o=d=>{let u=d;(u.animationName==="ng-valid"||u.animationName==="ng-invalid")&&i();};n.addEventListener("animationstart",o),t.onDestroy(()=>{n.removeEventListener("animationstart",o);});}isBadInput(t){return t.validity?.badInput??false}createTransitionStyle(t){let n=this.document.createElement("style");return this.cspNonce&&(n.nonce=this.cspNonce),n.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,t.nodeType===9?t.head?.appendChild(n):t.appendChild(n),n}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove();}static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(r)))(i||r)}})();static \u0275prov=re$3({token:r,factory:r.\u0275fac})}return r})(),mr$1=Symbol(),St$2=new S$1(""),Jr=(()=>{class r{field=NF.required({alias:"formField"});state=dt$3(()=>this.field()());renderer=T$3(CI);destroyRef=T$3(Le$3);injector=T$3(le$2);element=T$3(Tr$2).nativeElement;elementIsNativeFormElement=ns$1(this.element);elementAcceptsTextualValues=ju(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=t=>this.element.focus(t);controlValueAccessors=T$3(To$2,{optional:true,self:true});config=T$3(Xt$1,{optional:true});validityMonitor=T$3(Dt$1);parseErrorsSource=Fe$3(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new Fe$1(this.state)}parseErrors=dt$3(()=>this.parseErrorsSource()?.().map(t=>x$3(w$3({},t),{fieldTree:ae$2(this.state).fieldTree,formField:this}))??[],{equal:g});errors=dt$3(()=>this.state().errors().filter(t=>!t.formField||t.formField===this),{equal:g});isFieldBinding=false;resetter=()=>{};parseErrorsResetCallback;setParseErrors(t){this.parseErrorsSource.set(t);}set onReset(t){this.parseErrorsResetCallback=t;}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return !this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:ps$1(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let t=Object.entries(this.config?.classes??{}).map(([i,s])=>[i,dt$3(()=>s(this))]);if(t.length===0)return;let n=ne();FF({write:()=>{for(let[i,s]of t){let o=s();S(n,i,o)&&(o?this.renderer.addClass(this.element,i):this.renderer.removeClass(this.element,i));}}},{injector:this.injector});}focus(t){this.focuser(t);}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value());}registerAsBinding(t){if(this.isFieldBinding)throw new b$2(1913,false);this.isFieldBinding=true,this.installClassBindingEffect(),t?.focus&&(this.focuser=n=>t.focus(n)),t?.reset&&(this.resetter=()=>t.reset()),pa$2(n=>{let i=this.state();i.nodeState.formFieldBindings.update(s=>[...s,this]),n(()=>{i.nodeState.formFieldBindings.update(s=>s.filter(o=>o!==this));});},{injector:this.injector});}[mr$1];\u0275ngControlCreate(t){if(!t.hasPassThrough)if(this.controlValueAccessor)this.\u0275ngControlUpdate=ur$1(t,this);else if(t.customControl)this.\u0275ngControlUpdate=ar$1(t,this);else if(this.elementIsNativeFormElement)this.\u0275ngControlUpdate=hr$1(t,this,this.parseErrorsSource,this.validityMonitor);else throw new b$2(1914,false)}\u0275ngControlUpdate;elementAcceptsNativeProperty(t){if(!this.elementIsNativeFormElement)return  false;switch(t){case "min":case "max":return this._elementAcceptsMinMax??=zu(this.element);case "minLength":case "maxLength":return this.elementAcceptsTextualValues;case "disabled":case "required":case "readonly":case "name":return  true;default:return  false}}static \u0275fac=function(n){return new(n||r)};static \u0275dir=CE({type:r,selectors:[["","formField",""]],inputs:{field:[1,"formField","field"]},exportAs:["formField"],features:[zD([{provide:St$2,useExisting:r},{provide:Ht$2,useFactory:()=>T$3(r).interopNgControl},{provide:as$1,useFactory:()=>T$3(St$2,{self:true})}]),ME("formField")]})}return r})(),en$2=(()=>{class r{fieldTree=NF.required({alias:"formRoot"});onSubmit(t){t.preventDefault(),ae$2(()=>{let n=this.fieldTree();n().structure.fieldManager.submitOptions&&bt$1(n);});}static \u0275fac=function(n){return new(n||r)};static \u0275dir=CE({type:r,selectors:[["form","formRoot",""]],hostAttrs:["novalidate",""],hostBindings:function(n,i){n&1&&ih("submit",function(o){return i.onSubmit(o)});},inputs:{fieldTree:[1,"formRoot","fieldTree"]}})}return r})();var Ci$1=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],xi$1=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function Fi$1(n,y){n&1&&(wi$1(0,"span",3),uD(1,1),Hc());}function Ai$2(n,y){n&1&&(wi$1(0,"span",6),uD(1,2),Hc());}function Ri$1(n,y){n&1&&(wi$1(0,"span",3),uD(1,1),wi$1(2,"span",7),Uu(),wi$1(3,"svg",8),Xp(4,"path",9),Hc()()());}function Ti$2(n,y){n&1&&(wi$1(0,"span",6),uD(1,2),Hc());}var Bi$1=`.mdc-evolution-chip,
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
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
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
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
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
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
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
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
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
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
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
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
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
  color: var(--mat-chip-with-icon-icon-color, currentColor);
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
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
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
`;var Ii$2=["*"],Pi$2=`.mat-mdc-chip-set {
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
`,ki$2=new S$1("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),fi$2=new S$1("MatChipAvatar"),yi$1=new S$1("MatChipTrailingIcon"),bi$1=new S$1("MatChipEdit"),G$1=new S$1("MatChipRemove"),N$1=new S$1("MatChip"),Ei$2=(()=>{class n{_elementRef=T$3(Tr$2);_parentChip=T$3(N$1);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(i){this._disabled=i;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){T$3(K$4).load(yo$2),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(e){return new(e||n)};static \u0275dir=CE({type:n,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(e,t){e&2&&(Kp("disabled",t._getDisabledAttribute())("aria-disabled",t.disabled),gh("mdc-evolution-chip__action--primary",t._isPrimary)("mdc-evolution-chip__action--secondary",!t._isPrimary)("mdc-evolution-chip__action--trailing",!t._isPrimary&&!t._isLeading));},inputs:{disabled:[2,"disabled","disabled",PF],tabIndex:[2,"tabIndex","tabIndex",i=>i==null?-1:LF(i)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return n})(),K$1=(()=>{class n extends Ei$2{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(i){!this.disabled&&this._isPrimary&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275dir=CE({type:n,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(e,t){e&1&&ih("click",function(a){return t._handleClick(a)})("keydown",function(a){return t._handleKeydown(a)}),e&2&&(Kp("tabindex",t._getTabindex()),gh("mdc-evolution-chip__action--presentational",false));},features:[Wp]})}return n})();var wt$1=(()=>{class n extends K$1{_isPrimary=false;_handleClick(i){this.disabled||(i.stopPropagation(),i.preventDefault(),this._parentChip.remove());}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&(i.stopPropagation(),i.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275dir=CE({type:n,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(e,t){e&2&&Kp("aria-hidden",null);},features:[zD([{provide:G$1,useExisting:n}]),Wp]})}return n})(),q$1=(()=>{class n{_changeDetectorRef=T$3(kF);_elementRef=T$3(Tr$2);_tagName=T$3(bF);_ngZone=T$3(ue$1);_focusMonitor=T$3(yn$2);_globalRippleOptions=T$3(Fn$1,{optional:true});_document=T$3(ir$3);_onFocus=new ne$2;_onBlur=new ne$2;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=gt$3();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=T$3(ut$3).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(i){this._value=i;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(i){this._disabled=i;}_disabled=false;removed=new qe$3;destroyed=new qe$3;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=T$3(vo$2);_injector=T$3(le$2);constructor(){let i=T$3(K$4);i.load(yo$2),i.load(Ce$2),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Dg(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(i){(i.keyCode===8&&!i.repeat||i.keyCode===46)&&(i.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(i){return this._getActions().find(e=>{let t=e._elementRef.nativeElement;return t===i||t.contains(i)})}_getActions(){let i=[];return this.editIcon&&i.push(this.editIcon),this.primaryAction&&i.push(this.primaryAction),this.removeIcon&&i.push(this.removeIcon),i}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(i){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(i=>{let e=i!==null;e!==this._hasFocusInternal&&(this._hasFocusInternal=e,e?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=IE({type:n,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(e,t,c){if(e&1&&ch(c,fi$2,5)(c,bi$1,5)(c,yi$1,5)(c,G$1,5)(c,fi$2,5)(c,yi$1,5)(c,bi$1,5)(c,G$1,5),e&2){let a;fD(a=pD())&&(t.leadingIcon=a.first),fD(a=pD())&&(t.editIcon=a.first),fD(a=pD())&&(t.trailingIcon=a.first),fD(a=pD())&&(t.removeIcon=a.first),fD(a=pD())&&(t._allLeadingIcons=a),fD(a=pD())&&(t._allTrailingIcons=a),fD(a=pD())&&(t._allEditIcons=a),fD(a=pD())&&(t._allRemoveIcons=a);}},viewQuery:function(e,t){if(e&1&&lh(K$1,5),e&2){let c;fD(c=pD())&&(t.primaryAction=c.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(e,t){e&1&&ih("keydown",function(a){return t._handleKeydown(a)}),e&2&&(rh("id",t.id),Kp("role",t.role)("aria-label",t.ariaLabel),_D("mat-"+(t.color||"primary")),gh("mdc-evolution-chip",!t._isBasicChip)("mdc-evolution-chip--disabled",t.disabled)("mdc-evolution-chip--with-trailing-action",t._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",t.leadingIcon)("mdc-evolution-chip--with-primary-icon",t.leadingIcon)("mdc-evolution-chip--with-avatar",t.leadingIcon)("mat-mdc-chip-with-avatar",t.leadingIcon)("mat-mdc-chip-highlighted",t.highlighted)("mat-mdc-chip-disabled",t.disabled)("mat-mdc-basic-chip",t._isBasicChip)("mat-mdc-standard-chip",!t._isBasicChip)("mat-mdc-chip-with-trailing-icon",t._hasTrailingIcon())("_mat-animation-noopable",t._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",PF],highlighted:[2,"highlighted","highlighted",PF],disableRipple:[2,"disableRipple","disableRipple",PF],disabled:[2,"disabled","disabled",PF]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[zD([{provide:N$1,useExisting:n}])],ngContentSelectors:xi$1,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(e,t){e&1&&(lD(Ci$1),Xp(0,"span",0),wi$1(1,"span",1)(2,"span",2),ZE(3,Fi$1,2,0,"span",3),wi$1(4,"span",4),uD(5),Xp(6,"span",5),Hc()()(),ZE(7,Ai$2,2,0,"span",6)),e&2&&(Hv(3),YE(t.leadingIcon?3:-1),Hv(4),YE(t._hasTrailingIcon()?7:-1));},dependencies:[Ei$2],styles:[`.mdc-evolution-chip,
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
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
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
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
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
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
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
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
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
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
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
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
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
  color: var(--mat-chip-with-icon-icon-color, currentColor);
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
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
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
`],encapsulation:2})}return n})();var Li$1=(()=>{class n extends q$1{_defaultOptions=T$3(ki$2,{optional:true});chipListSelectable=true;_chipListMultiple=false;_chipListHideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get selectable(){return this._selectable&&this.chipListSelectable}set selectable(i){this._selectable=i,this._changeDetectorRef.markForCheck();}_selectable=true;get selected(){return this._selected}set selected(i){this._setSelectedState(i,false,true);}_selected=false;get ariaSelected(){return this.selectable?this.selected.toString():null}basicChipAttrName="mat-basic-chip-option";selectionChange=new qe$3;ngOnInit(){super.ngOnInit(),this.role="presentation";}select(){this._setSelectedState(true,false,true);}deselect(){this._setSelectedState(false,false,true);}selectViaInteraction(){this._setSelectedState(true,true,true);}toggleSelected(i=false){return this._setSelectedState(!this.selected,i,true),this.selected}_handlePrimaryActionInteraction(){this.disabled||(this.focus(),this.selectable&&this.toggleSelected(true));}_hasLeadingGraphic(){return this.leadingIcon?true:!this._chipListHideSingleSelectionIndicator||this._chipListMultiple}_setSelectedState(i,e,t){i!==this.selected&&(this._selected=i,t&&this.selectionChange.emit({source:this,isUserInput:e,selected:this.selected}),this._changeDetectorRef.markForCheck());}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275cmp=IE({type:n,selectors:[["mat-basic-chip-option"],["","mat-basic-chip-option",""],["mat-chip-option"],["","mat-chip-option",""]],hostAttrs:[1,"mat-mdc-chip","mat-mdc-chip-option"],hostVars:37,hostBindings:function(e,t){e&2&&(rh("id",t.id),Kp("tabindex",null)("aria-label",null)("aria-description",null)("role",t.role),gh("mdc-evolution-chip",!t._isBasicChip)("mdc-evolution-chip--filter",!t._isBasicChip)("mdc-evolution-chip--selectable",!t._isBasicChip)("mat-mdc-chip-selected",t.selected)("mat-mdc-chip-multiple",t._chipListMultiple)("mat-mdc-chip-disabled",t.disabled)("mat-mdc-chip-with-avatar",t.leadingIcon)("mdc-evolution-chip--disabled",t.disabled)("mdc-evolution-chip--selected",t.selected)("mdc-evolution-chip--selecting",!t._animationsDisabled)("mdc-evolution-chip--with-trailing-action",t._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon",t.leadingIcon)("mdc-evolution-chip--with-primary-graphic",t._hasLeadingGraphic())("mdc-evolution-chip--with-avatar",t.leadingIcon)("mat-mdc-chip-highlighted",t.highlighted)("mat-mdc-chip-with-trailing-icon",t._hasTrailingIcon()));},inputs:{selectable:[2,"selectable","selectable",PF],selected:[2,"selected","selected",PF]},outputs:{selectionChange:"selectionChange"},features:[zD([{provide:q$1,useExisting:n},{provide:N$1,useExisting:n}]),Wp],ngContentSelectors:xi$1,decls:8,vars:6,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipAction","","role","option",3,"_allowFocusWhenDisabled"],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"],[1,"mdc-evolution-chip__checkmark"],["viewBox","-2 -3 30 30","focusable","false","aria-hidden","true",1,"mdc-evolution-chip__checkmark-svg"],["fill","none","stroke","currentColor","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-evolution-chip__checkmark-path"]],template:function(e,t){e&1&&(lD(Ci$1),Xp(0,"span",0),wi$1(1,"span",1)(2,"button",2),ZE(3,Ri$1,5,0,"span",3),wi$1(4,"span",4),uD(5),Xp(6,"span",5),Hc()()(),ZE(7,Ti$2,2,0,"span",6)),e&2&&(Hv(2),Jp("_allowFocusWhenDisabled",true),Kp("aria-description",t.ariaDescription)("aria-label",t.ariaLabel)("aria-selected",t.ariaSelected),Hv(),YE(t._hasLeadingGraphic()?3:-1),Hv(4),YE(t._hasTrailingIcon()?7:-1));},dependencies:[K$1],styles:[Bi$1],encapsulation:2})}return n})();var Oi$1=(()=>{class n{_elementRef=T$3(Tr$2);_changeDetectorRef=T$3(kF);_dir=T$3(pt$2,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new ne$2;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(i=>i._onFocus)}get chipDestroyedChanges(){return this._getChipStream(i=>i.destroyed)}get chipRemovedChanges(){return this._getChipStream(i=>i.removed)}get disabled(){return this._disabled}set disabled(i){this._disabled=i,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(i){this._explicitRole=i;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new si$1;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(i=>i._hasFocus())}_syncChipsState(){this._chips?.forEach(i=>{i._chipListDisabled=this._disabled,i._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(i){this._originatesFromChip(i)&&this._keyManager.onKeydown(i);}_isValidIndex(i){return i>=0&&i<this._chips.length}_allowFocusEscape(){let i=this._elementRef.nativeElement.tabIndex;i!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=i));}_getChipStream(i){return this._chips.changes.pipe(Bl(null),vl(()=>Dg(...this._chips.map(i))))}_originatesFromChip(i){let e=i.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-mdc-chip"))return  true;e=e.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Bl(this._chips)).subscribe(i=>{let e=[];i.forEach(t=>t._getActions().forEach(c=>e.push(c))),this._chipActions.reset(e),this._chipActions.notifyOnChanges();}),this._keyManager=new Cn$2(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(i=>this._skipPredicate(i)),this.chipFocusChanges.pipe(Rg(this._destroyed)).subscribe(({chip:i})=>{let e=i._getSourceAction(document.activeElement);e&&this._keyManager.updateActiveItem(e);}),this._dir?.change.pipe(Rg(this._destroyed)).subscribe(i=>this._keyManager.withHorizontalOrientation(i));}_skipPredicate(i){return i.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Bl(null),Rg(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Rg(this._destroyed)).subscribe(i=>{let t=this._chips.toArray().indexOf(i.chip),c=i.chip._hasFocus(),a=i.chip._hadFocusOnRemove&&this._keyManager.activeItem&&i.chip._getActions().includes(this._keyManager.activeItem),Si=c||a;this._isValidIndex(t)&&Si&&(this._lastDestroyedFocusedChipIndex=t);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let i=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),e=this._chips.toArray()[i];e.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():e.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=IE({type:n,selectors:[["mat-chip-set"]],contentQueries:function(e,t,c){if(e&1&&ch(c,q$1,5),e&2){let a;fD(a=pD())&&(t._chips=a);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(e,t){e&1&&ih("keydown",function(a){return t._handleKeydown(a)}),e&2&&Kp("role",t.role);},inputs:{disabled:[2,"disabled","disabled",PF],role:"role",tabIndex:[2,"tabIndex","tabIndex",i=>i==null?0:LF(i)]},ngContentSelectors:Ii$2,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,t){e&1&&(lD(),Bc(0,"div",0),uD(1),$c());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return n})(),Q$2=class Q{source;value;constructor(y,i){this.source=y,this.value=i;}},Hi$2={provide:To$2,useExisting:Eo$3(()=>zi$1),multi:true},zi$1=(()=>{class n extends Oi$1{_onTouched=()=>{};_onChange=()=>{};_defaultRole="listbox";_defaultOptions=T$3(ki$2,{optional:true});get multiple(){return this._multiple}set multiple(i){this._multiple=i,this._syncListboxProperties();}_multiple=false;get selected(){let i=this._chips.toArray().filter(e=>e.selected);return this.multiple?i:i[0]}ariaOrientation="horizontal";get selectable(){return this._selectable}set selectable(i){this._selectable=i,this._syncListboxProperties();}_selectable=true;compareWith=(i,e)=>i===e;required=false;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(i){this._hideSingleSelectionIndicator=i,this._syncListboxProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get chipSelectionChanges(){return this._getChipStream(i=>i.selectionChange)}get chipBlurChanges(){return this._getChipStream(i=>i._onBlur)}get value(){return this._value}set value(i){this._chips&&this._chips.length&&this._setSelectionByValue(i,false),this._value=i;}_value;change=new qe$3;_chips=void 0;ngAfterContentInit(){this._chips.changes.pipe(Bl(null),Rg(this._destroyed)).subscribe(()=>{this.value!==void 0&&Promise.resolve().then(()=>{this._setSelectionByValue(this.value,false);}),this._syncListboxProperties();}),this.chipBlurChanges.pipe(Rg(this._destroyed)).subscribe(()=>this._blur()),this.chipSelectionChanges.pipe(Rg(this._destroyed)).subscribe(i=>{this.multiple||this._chips.forEach(e=>{e!==i.source&&e._setSelectedState(false,false,false);}),i.isUserInput&&this._propagateChanges();});}focus(){if(this.disabled)return;let i=this._getFirstSelectedChip();i&&!i.disabled?i.focus():this._chips.length>0?this._keyManager.setFirstItemActive():this._elementRef.nativeElement.focus();}writeValue(i){i!=null?this.value=i:this.value=void 0;}registerOnChange(i){this._onChange=i;}registerOnTouched(i){this._onTouched=i;}setDisabledState(i){this.disabled=i;}_setSelectionByValue(i,e=true){this._clearSelection(),Array.isArray(i)?i.forEach(t=>this._selectValue(t,e)):this._selectValue(i,e);}_blur(){this.disabled||setTimeout(()=>{this.focused||this._markAsTouched();});}_keydown(i){i.keyCode===9&&super._allowFocusEscape();}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck();}_propagateChanges(){let i=null;Array.isArray(this.selected)?i=this.selected.map(e=>e.value):i=this.selected?this.selected.value:void 0,this._value=i,this.change.emit(new Q$2(this,i)),this._onChange(i),this._changeDetectorRef.markForCheck();}_clearSelection(i){this._chips.forEach(e=>{e!==i&&e.deselect();});}_selectValue(i,e){let t=this._chips.find(c=>c.value!=null&&this.compareWith(c.value,i));return t&&(e?t.selectViaInteraction():t.select()),t}_syncListboxProperties(){this._chips&&Promise.resolve().then(()=>{this._chips.forEach(i=>{i._chipListMultiple=this.multiple,i.chipListSelectable=this._selectable,i._chipListHideSingleSelectionIndicator=this.hideSingleSelectionIndicator,i._changeDetectorRef.markForCheck();});});}_getFirstSelectedChip(){return Array.isArray(this.selected)?this.selected.length?this.selected[0]:void 0:this.selected}_skipPredicate(i){return  false}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275cmp=IE({type:n,selectors:[["mat-chip-listbox"]],contentQueries:function(e,t,c){if(e&1&&ch(c,Li$1,5),e&2){let a;fD(a=pD())&&(t._chips=a);}},hostAttrs:[1,"mdc-evolution-chip-set","mat-mdc-chip-listbox"],hostVars:10,hostBindings:function(e,t){e&1&&ih("focus",function(){return t.focus()})("blur",function(){return t._blur()})("keydown",function(a){return t._keydown(a)}),e&2&&(rh("tabIndex",t.disabled||t.empty?-1:t.tabIndex),Kp("role",t.role)("aria-required",t.role?t.required:null)("aria-disabled",t.disabled.toString())("aria-multiselectable",t.multiple)("aria-orientation",t.ariaOrientation),gh("mat-mdc-chip-list-disabled",t.disabled)("mat-mdc-chip-list-required",t.required));},inputs:{multiple:[2,"multiple","multiple",PF],ariaOrientation:[0,"aria-orientation","ariaOrientation"],selectable:[2,"selectable","selectable",PF],compareWith:"compareWith",required:[2,"required","required",PF],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",PF],value:"value"},outputs:{change:"change"},features:[zD([Hi$2]),Wp],ngContentSelectors:Ii$2,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,t){e&1&&(lD(),Bc(0,"div",0),uD(1),$c());},styles:[Pi$2],encapsulation:2})}return n})();var St$1=(()=>{class n{constructor(){this.responsive=T$3(vr$1),this.displayMobileLayout=new Rn$3(false),this.responsive.observe([qs.XSmall]).pipe(Fl()).subscribe(i=>{this.displayMobileLayout.next(!i.matches);});}static{this.\u0275fac=function(e){return new(e||n)};}static{this.\u0275prov=re$3({token:n,factory:n.\u0275fac,providedIn:"root"});}}return n})();var Vi$1=(function(n){return n.ASC="asc",n.DESC="desc",n})(Vi$1||{});var f="primary",Ve$1=Symbol("RouteTitle"),Vt$1=class Vt{params;constructor(n){this.params=n||{};}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return []}get keys(){return Object.keys(this.params)}};function se(t){return new Vt$1(t)}function Ht(t,n,e){for(let r=0;r<t.length;r++){let i=t[r],o=n[r];if(i[0]===":")e[i.substring(1)]=o;else if(i!==o.path)return  false}return  true}function cn$1(t,n,e){let r=e.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>t.length||e.pathMatch==="full"&&(n.hasChildren()||r.length<t.length))return null;let s={},u=t.slice(0,r.length);return Ht(r,u,s)?{consumed:u,posParams:s}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),a=r.slice(i+1);if(o.length+a.length>t.length||e.pathMatch==="full"&&n.hasChildren()&&e.path!=="**")return null;let c={};return !Ht(o,t.slice(0,o.length),c)||!Ht(a,t.slice(t.length-a.length),c)?null:{consumed:t,posParams:c}}function lt(t){return new Promise((n,e)=>{t.pipe(Mg()).subscribe({next:r=>n(r),error:r=>e(r)});})}function ei(t,n){if(t.length!==n.length)return  false;for(let e=0;e<t.length;++e)if(!B$1(t[e],n[e]))return  false;return  true}function B$1(t,n){let e=t?Gt$1(t):void 0,r=n?Gt$1(n):void 0;if(!e||!r||e.length!=r.length)return  false;let i;for(let o=0;o<e.length;o++)if(i=e[o],!un$1(t[i],n[i]))return  false;return  true}function Gt$1(t){return [...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function un$1(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return  false;let e=[...t].sort(),r=[...n].sort();return e.every((i,o)=>r[o]===i)}else return t===n}function ti(t){return t.length>0?t[t.length-1]:null}function le(t){return lg(t)?t:Fc(t)?Se$4(Promise.resolve(t)):ag(t)}function ln$1(t){return lg(t)?lt(t):Promise.resolve(t)}var ri={exact:dn$1,subset:fn$1},hn$1={exact:ni,subset:ii,ignored:()=>true},ar={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},xe={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function sr(t,n,e){let r=t instanceof N?t:n.parseUrl(t);return dt$3(()=>Wt$1(n.lastSuccessfulNavigation()?.finalUrl??new N,r,w$3(w$3({},xe),e)))}function Wt$1(t,n,e){return ri[e.paths](t.root,n.root,e.matrixParams)&&hn$1[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment==="exact"&&t.fragment!==n.fragment)}function ni(t,n){return B$1(t,n)}function dn$1(t,n,e){if(!ae(t.segments,n.segments)||!st(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return  false;for(let r in n.children)if(!t.children[r]||!dn$1(t.children[r],n.children[r],e))return  false;return  true}function ii(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>un$1(t[e],n[e]))}function fn$1(t,n,e){return pn$1(t,n,n.segments,e)}function pn$1(t,n,e,r){if(t.segments.length>e.length){let i=t.segments.slice(0,e.length);return !(!ae(i,e)||n.hasChildren()||!st(i,e,r))}else if(t.segments.length===e.length){if(!ae(t.segments,e)||!st(t.segments,e,r))return  false;for(let i in n.children)if(!t.children[i]||!fn$1(t.children[i],n.children[i],r))return  false;return  true}else {let i=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return !ae(t.segments,i)||!st(t.segments,i,r)||!t.children[f]?false:pn$1(t.children[f],n,o,r)}}function st(t,n,e){return n.every((r,i)=>hn$1[e](t[i].parameters,r.parameters))}var N=class{root;queryParams;fragment;_queryParamMap;constructor(n=new m([],{}),e={},r=null){this.root=n,this.queryParams=e,this.fragment=r;}get queryParamMap(){return this._queryParamMap??=se(this.queryParams),this._queryParamMap}toString(){return si.serialize(this)}},m=class{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(r=>r.parent=this);}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return ct(this)}},J$1=class J{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e;}get parameterMap(){return this._parameterMap??=se(this.parameters),this._parameterMap}toString(){return vn$1(this)}};function oi(t,n){return ae(t,n)&&t.every((e,r)=>B$1(e.parameters,n[r].parameters))}function ae(t,n){return t.length!==n.length?false:t.every((e,r)=>e.path===n[r].path)}function ai(t,n){let e=[];return Object.entries(t.children).forEach(([r,i])=>{r===f&&(e=e.concat(n(i,r)));}),Object.entries(t.children).forEach(([r,i])=>{r!==f&&(e=e.concat(n(i,r)));}),e}var Se$1=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>new X$1})}return t})(),X$1=class X{parse(n){let e=new Kt$1(n);return new N(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){let e=`/${_e(n.root,true)}`,r=li(n.queryParams),i=typeof n.fragment=="string"?`#${ci(n.fragment)}`:"";return `${e}${r}${i}`}},si=new X$1;function ct(t){return t.segments.map(n=>vn$1(n)).join("/")}function _e(t,n){if(!t.hasChildren())return ct(t);if(n){let e=t.children[f]?_e(t.children[f],false):"",r=[];return Object.entries(t.children).forEach(([i,o])=>{i!==f&&r.push(`${i}:${_e(o,false)}`);}),r.length>0?`${e}(${r.join("//")})`:e}else {let e=ai(t,(r,i)=>i===f?[_e(t.children[f],false)]:[`${i}:${_e(r,false)}`]);return Object.keys(t.children).length===1&&t.children[f]!=null?`${ct(t)}/${e[0]}`:`${ct(t)}/(${e.join("//")})`}}function gn(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function ot$1(t){return gn(t).replace(/%3B/gi,";")}function ci(t){return encodeURI(t)}function Qt(t){return gn(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function ut(t){return decodeURIComponent(t)}function en$1(t){return ut(t.replace(/\+/g,"%20"))}function vn$1(t){return `${Qt(t.path)}${ui(t.parameters)}`}function ui(t){return Object.entries(t).map(([n,e])=>`;${Qt(n)}=${Qt(e)}`).join("")}function li(t){let n=Object.entries(t).map(([e,r])=>Array.isArray(r)?r.map(i=>`${ot$1(e)}=${ot$1(i)}`).join("&"):`${ot$1(e)}=${ot$1(r)}`).filter(e=>e);return n.length?`?${n.join("&")}`:""}var hi$1=/^[^\/()?;#]+/;function Ft(t){let n=t.match(hi$1);return n?n[0]:""}var di=/^[^\/()?;=#]+/;function fi$1(t){let n=t.match(di);return n?n[0]:""}var pi=/^[^=?&#]+/;function gi$1(t){let n=t.match(pi);return n?n[0]:""}var vi=/^[^&#]+/;function mi(t){let n=t.match(vi);return n?n[0]:""}var Kt$1=class Kt{url;remaining;constructor(n){this.url=n,this.remaining=n;}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new m([],{}):new m([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new b$2(4010,false);if(this.remaining==="")return {};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(true,n));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(false,n)),(e.length>0||Object.keys(r).length>0)&&(i[f]=new m(e,r)),i}parseSegment(){let n=Ft(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new b$2(4009,false);return this.capture(n),new J$1(ut(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let e=fi$1(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let i=Ft(this.remaining);i&&(r=i,this.capture(r));}n[ut(e)]=ut(r);}parseQueryParam(n){let e=gi$1(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let a=mi(this.remaining);a&&(r=a,this.capture(r));}let i=en$1(e),o=en$1(r);if(n.hasOwnProperty(i)){let a=n[i];Array.isArray(a)||(a=[a],n[i]=a),a.push(o);}else n[i]=o;}parseParens(n,e){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Ft(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new b$2(4010,false);let a;i.indexOf(":")>-1?(a=i.slice(0,i.indexOf(":")),this.capture(a),this.capture(":")):n&&(a=f);let c=this.parseChildren(e+1);r[a??f]=Object.keys(c).length===1&&c[f]?c[f]:new m([],c),this.consumeOptional("//");}return r}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),true):false}capture(n){if(!this.consumeOptional(n))throw new b$2(4011,false)}};function mn(t){return t.segments.length>0?new m([],{[f]:t}):t}function yn$1(t){let n={};for(let[r,i]of Object.entries(t.children)){let o=yn$1(i);if(r===f&&o.segments.length===0&&o.hasChildren())for(let[a,c]of Object.entries(o.children))n[a]=c;else (o.segments.length>0||o.hasChildren())&&(n[r]=o);}let e=new m(t.segments,n);return yi(e)}function yi(t){if(t.numberOfChildren===1&&t.children[f]){let n=t.children[f];return new m(t.segments.concat(n.segments),n.children)}return t}function ee(t){return t instanceof N}function Rn(t,n,e=null,r=null,i=new X$1){let o=Sn(t);return Cn$1(o,n,e,r,i)}function Sn(t){let n;function e(o){let a={};for(let s of o.children){let u=e(s);a[s.outlet]=u;}let c=new m(o.url,a);return o===t&&(n=c),c}let r=e(t.root),i=mn(r);return n??i}function Cn$1(t,n,e,r,i){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return qt$1(o,o,o,e,r,i);let a=Ri(n);if(a.toRoot())return qt$1(o,o,new m([],{}),e,r,i);let c=Si(a,o,t),s=c.processChildren?Oe$1(c.segmentGroup,c.index,a.commands):bn$1(c.segmentGroup,c.index,a.commands);return qt$1(o,c.segmentGroup,s,e,r,i)}function ht(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function je$1(t){return typeof t=="object"&&t!=null&&t.outlets}function tn$1(t,n,e){t||="\u0275";let r=new N;return r.queryParams={[t]:n},e.parse(e.serialize(r)).queryParams[t]}function qt$1(t,n,e,r,i,o){let a={};for(let[u,h]of Object.entries(r??{}))a[u]=Array.isArray(h)?h.map(v=>tn$1(u,v,o)):tn$1(u,h,o);let c;t===n?c=e:c=wn$1(t,n,e);let s=mn(yn$1(c));return new N(s,a,i)}function wn$1(t,n,e){let r={};return Object.entries(t.children).forEach(([i,o])=>{o===n?r[i]=e:r[i]=wn$1(o,n,e);}),new m(t.segments,r)}var dt=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,r){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=r,n&&r.length>0&&ht(r[0]))throw new b$2(4003,false);let i=r.find(je$1);if(i&&i!==ti(r))throw new b$2(4004,false)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function Ri(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new dt(true,0,t);let n=0,e=false,r=t.reduce((i,o,a)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let c={};return Object.entries(o.outlets).forEach(([s,u])=>{c[s]=typeof u=="string"?u.split("/"):u;}),[...i,{outlets:c}]}if(o.segmentPath)return [...i,o.segmentPath]}return typeof o!="string"?[...i,o]:a===0?(o.split("/").forEach((c,s)=>{s==0&&c==="."||(s==0&&c===""?e=true:c===".."?n++:c!=""&&i.push(c));}),i):[...i,o]},[]);return new dt(e,n,r)}var fe=class{segmentGroup;processChildren;index;constructor(n,e,r){this.segmentGroup=n,this.processChildren=e,this.index=r;}};function Si(t,n,e){if(t.isAbsolute)return new fe(n,true,0);if(!e)return new fe(n,false,NaN);if(e.parent===null)return new fe(e,true,0);let r=ht(t.commands[0])?0:1,i=e.segments.length-1+r;return Ci(e,i,t.numberOfDoubleDots)}function Ci(t,n,e){let r=t,i=n,o=e;for(;o>i;){if(o-=i,r=r.parent,!r)throw new b$2(4005,false);i=r.segments.length;}return new fe(r,false,i-o)}function wi(t){return je$1(t[0])?t[0].outlets:{[f]:t}}function bn$1(t,n,e){if(t??=new m([],{}),t.segments.length===0&&t.hasChildren())return Oe$1(t,n,e);let r=bi(t,n,e),i=e.slice(r.commandIndex);if(r.match&&r.pathIndex<t.segments.length){let o=new m(t.segments.slice(0,r.pathIndex),{});return o.children[f]=new m(t.segments.slice(r.pathIndex),t.children),Oe$1(o,0,i)}else return r.match&&i.length===0?new m(t.segments,{}):r.match&&!t.hasChildren()?Yt$1(t,n,e):r.match?Oe$1(t,0,i):Yt$1(t,n,e)}function Oe$1(t,n,e){if(e.length===0)return new m(t.segments,{});{let r=wi(e),i={};if(Object.keys(r).some(o=>o!==f)&&t.children[f]&&t.numberOfChildren===1&&t.children[f].segments.length===0){let o=Oe$1(t.children[f],n,e);return new m(t.segments,o.children)}return Object.entries(r).forEach(([o,a])=>{typeof a=="string"&&(a=[a]),a!==null&&(i[o]=bn$1(t.children[o],n,a));}),Object.entries(t.children).forEach(([o,a])=>{r[o]===void 0&&(i[o]=a);}),new m(t.segments,i)}}function bi(t,n,e){let r=0,i=n,o={match:false,pathIndex:0,commandIndex:0};for(;i<t.segments.length;){if(r>=e.length)return o;let a=t.segments[i],c=e[r];if(je$1(c))break;let s=`${c}`,u=r<e.length-1?e[r+1]:null;if(i>0&&s===void 0)break;if(s&&u&&typeof u=="object"&&u.outlets===void 0){if(!nn$1(s,u,a))return o;r+=2;}else {if(!nn$1(s,{},a))return o;r++;}i++;}return {match:true,pathIndex:i,commandIndex:r}}function Yt$1(t,n,e){let r=t.segments.slice(0,n),i=0;for(;i<e.length;){let o=e[i];if(je$1(o)){let s=Ii$1(o.outlets);return new m(r,s)}if(i===0&&ht(e[0])){let s=t.segments[n];r.push(new J$1(s.path,rn$1(e[0]))),i++;continue}let a=je$1(o)?o.outlets[f]:`${o}`,c=i<e.length-1?e[i+1]:null;a&&c&&ht(c)?(r.push(new J$1(a,rn$1(c))),i+=2):(r.push(new J$1(a,{})),i++);}return new m(r,{})}function Ii$1(t){let n={};return Object.entries(t).forEach(([e,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(n[e]=Yt$1(new m([],{}),0,r));}),n}function rn$1(t){let n={};return Object.entries(t).forEach(([e,r])=>n[e]=`${r}`),n}function nn$1(t,n,e){return t==e.path&&B$1(n,e.parameters)}var Pe$1="imperative",C=(function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t})(C||{}),O=class{id;url;constructor(n,e){this.id=n,this.url=e;}},ce$1=class ce extends O{type=C.NavigationStart;navigationTrigger;restoredState;constructor(n,e,r="imperative",i=null){super(n,e),this.navigationTrigger=r,this.restoredState=i;}toString(){return `NavigationStart(id: ${this.id}, url: '${this.url}')`}},k=class extends O{urlAfterRedirects;type=C.NavigationEnd;constructor(n,e,r){super(n,e),this.urlAfterRedirects=r;}toString(){return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},I$1=(function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t[t.Aborted=4]="Aborted",t})(I$1||{}),ke$1=(function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t})(ke$1||{}),j$1=class j extends O{reason;code;type=C.NavigationCancel;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i;}toString(){return `NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function In(t){return t instanceof j$1&&(t.code===I$1.Redirect||t.code===I$1.SupersededByNewNavigation)}var W=class extends O{reason;code;type=C.NavigationSkipped;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i;}},ue=class extends O{error;target;type=C.NavigationError;constructor(n,e,r,i){super(n,e),this.error=r,this.target=i;}toString(){return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},$e=class extends O{urlAfterRedirects;state;type=C.RoutesRecognized;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ft=class extends O{urlAfterRedirects;state;type=C.GuardsCheckStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},pt=class extends O{urlAfterRedirects;state;shouldActivate;type=C.GuardsCheckEnd;constructor(n,e,r,i,o){super(n,e),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o;}toString(){return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},gt=class extends O{urlAfterRedirects;state;type=C.ResolveStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},vt=class extends O{urlAfterRedirects;state;type=C.ResolveEnd;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},mt=class{route;type=C.RouteConfigLoadStart;constructor(n){this.route=n;}toString(){return `RouteConfigLoadStart(path: ${this.route.path})`}},yt=class{route;type=C.RouteConfigLoadEnd;constructor(n){this.route=n;}toString(){return `RouteConfigLoadEnd(path: ${this.route.path})`}},Rt$1=class Rt{snapshot;type=C.ChildActivationStart;constructor(n){this.snapshot=n;}toString(){return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},St=class{snapshot;type=C.ChildActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ct=class{snapshot;type=C.ActivationStart;constructor(n){this.snapshot=n;}toString(){return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},wt=class{snapshot;type=C.ActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var ge=class{},ze$1=class ze{},ve=class{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e;}};function Ai$1(t){return !(t instanceof ge)&&!(t instanceof ve)&&!(t instanceof ze$1)}var bt=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new Ce(this.rootInjector);}},Ce=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e;}onChildOutletCreated(e,r){let i=this.getOrCreateContext(e);i.outlet=r,this.contexts.set(e,i);}onChildOutletDestroyed(e){let r=this.getContext(e);r&&(r.outlet=null,r.attachRef=null);}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e;}getOrCreateContext(e){let r=this.getContext(e);return r||(r=new bt(this.rootInjector),this.contexts.set(e,r)),r}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(r){return new(r||t)(ke$5(ce$3))};static \u0275prov=re$3({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),It$1=class It{_root;constructor(n){this._root=n;}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=Zt(n,this._root);return e?e.children.map(r=>r.value):[]}firstChild(n){let e=Zt(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=Jt(n,this._root);return e.length<2?[]:e[e.length-2].children.map(i=>i.value).filter(i=>i!==n)}pathFromRoot(n){return Jt(n,this._root).map(e=>e.value)}};function Zt(t,n){if(t===n.value)return n;for(let e of n.children){let r=Zt(t,e);if(r)return r}return null}function Jt(t,n){if(t===n.value)return [n];for(let e of n.children){let r=Jt(t,e);if(r.length)return r.unshift(n),r}return []}var U$1=class U{value;children;constructor(n,e){this.value=n,this.children=e;}toString(){return `TreeNode(${this.value})`}};function de(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var He=class extends It$1{snapshot;constructor(n,e){super(n),this.snapshot=e,ur(this,n);}toString(){return this.snapshot.toString()}};function An(t,n){let e=Ei$1(t,n),r=new Rn$3([new J$1("",{})]),i=new Rn$3({}),o=new Rn$3({}),a=new Rn$3({}),c=new Rn$3(""),s=new Q$1(r,i,a,c,o,f,t,e.root);return s.snapshot=e.root,new He(new U$1(s,[]),e)}function Ei$1(t,n){let e={},r={},i={},a=new me([],e,i,"",r,f,t,null,{},n);return new Fe("",new U$1(a,[]))}var Q$1=class Q{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;_localInjector;constructor(n,e,r,i,o,a,c,s){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=a,this.component=c,this._futureSnapshot=s,this.title=this.dataSubject?.pipe(Me$3(u=>u[Ve$1]))??ag(void 0),this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o;}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(Me$3(n=>se(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(Me$3(n=>se(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}},Ti$1="always";function cr(t,n,e){let r,{routeConfig:i}=t;return n!==null&&(e==="always"||i?.path===""||!n.component&&!n.routeConfig?.loadComponent)?r={params:w$3(w$3({},n.params),t.params),data:w$3(w$3({},n.data),t.data),resolve:w$3(w$3(w$3(w$3({},t.data),n.data),i?.data),t._resolvedData)}:r={params:w$3({},t.params),data:w$3({},t.data),resolve:w$3(w$3({},t.data),t._resolvedData??{})},i&&Tn(i)&&(r.resolve[Ve$1]=i.title),r}var me=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Ve$1]}constructor(n,e,r,i,o,a,c,s,u,h){this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=a,this.component=c,this.routeConfig=s,this._resolve=u,this._environmentInjector=h;}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=se(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=se(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(r=>r.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return `Route(url:'${n}', path:'${e}')`}},Fe=class extends It$1{url;constructor(n,e){super(e),this.url=n,ur(this,e);}toString(){return En(this._root)}};function ur(t,n){n.value._routerState=t,n.children.forEach(e=>ur(t,e));}function En(t){let n=t.children.length>0?` { ${t.children.map(En).join(", ")} } `:"";return `${t.value}${n}`}function Bt(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,B$1(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),B$1(n.params,e.params)||t.paramsSubject.next(e.params),ei(n.url,e.url)||t.urlSubject.next(e.url),B$1(n.data,e.data)||t.dataSubject.next(e.data);}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data);}function Xt(t,n){let e=B$1(t.params,n.params)&&oi(t.url,n.url),r=!t.parent!=!n.parent;return e&&!r&&(!t.parent||Xt(t.parent,n.parent))}function Tn(t){return typeof t.title=="string"||t.title===null}var Nn=new S$1(""),lr=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=f;activateEvents=new qe$3;deactivateEvents=new qe$3;attachEvents=new qe$3;detachEvents=new qe$3;routerOutletData=NF();parentContexts=T$3(Ce);location=T$3(Li$3);changeDetector=T$3(kF);inputBinder=T$3(Nt,{optional:true});supportsBindingToComponentInputs=true;ngOnChanges(e){if(e.name){let{firstChange:r,previousValue:i}=e.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName();}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this);}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName();}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector));}get isActivated(){return !!this.activated}get component(){if(!this.activated)throw new b$2(4012,false);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new b$2(4012,false);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new b$2(4012,false);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,r){this.activated=e,this._activatedRoute=r,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance);}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e);}}activateWith(e,r){if(this.isActivated)throw new b$2(4013,false);this._activatedRoute=e;let i=this.location,a=e.snapshot.component,c=this.parentContexts.getOrCreateContext(this.name).children,s=new er(e,c,i.injector,this.routerOutletData);this.activated=i.createComponent(a,{index:i.length,injector:s,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance);}static \u0275fac=function(r){return new(r||t)};static \u0275dir=CE({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Pm]})}return t})(),er=class{route;childContexts;parent;outletData;constructor(n,e,r,i){this.route=n,this.childContexts=e,this.parent=r,this.outletData=i;}get(n,e){return n===Q$1?this.route:n===Ce?this.childContexts:n===Nn?this.outletData:this.parent.get(n,e)}},Nt=new S$1("");var hr=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=IE({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&Xp(0,"router-outlet");},dependencies:[lr],encapsulation:2,changeDetection:1})}return t})();function dr(t){let n=t.children&&t.children.map(dr),e=n?x$3(w$3({},t),{children:n}):w$3({},t);return !e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==f&&(e.component=hr),e}function Ni(t,n,e){let r=new Set,i=qe(t,n._root,e?e._root:void 0,r);return {newlyCreatedRoutes:r,state:new He(i,n)}}function qe(t,n,e,r){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let i=e.value;i._futureSnapshot=n.value;let o=Mi(t,n,e,r);return new U$1(i,o)}else {if(t.shouldAttach(n.value)){let a=t.retrieve(n.value);if(a!==null){let c=a.route;return c.value._futureSnapshot=n.value,c.children=n.children.map(s=>qe(t,s,void 0,r)),c}}let i=Di(n.value);r.add(i);let o=n.children.map(a=>qe(t,a,void 0,r));return new U$1(i,o)}}function Mi(t,n,e,r){return n.children.map(i=>{for(let o of e.children)if(t.shouldReuseRoute(i.value,o.value.snapshot))return qe(t,i,o,r);return qe(t,i,void 0,r)})}function Di(t){return new Q$1(new Rn$3(t.url),new Rn$3(t.params),new Rn$3(t.queryParams),new Rn$3(t.fragment),new Rn$3(t.data),t.outlet,t.component,t)}var ye=class{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e;}},Mn="ngNavigationCancelingError";function At$2(t,n){let{redirectTo:e,navigationBehaviorOptions:r}=ee(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,i=Dn(false,I$1.Redirect);return i.url=e,i.navigationBehaviorOptions=r,i}function Dn(t,n){let e=new Error(`NavigationCancelingError: ${""}`);return e[Mn]=true,e.cancellationCode=n,e}function _i$1(t){return _n(t)&&ee(t.url)}function _n(t){return !!t&&t[Mn]}var tr=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,r,i,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o;}activate(n){let e=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,r,n),Bt(this.futureState.root),this.activateChildRoutes(e,r,n);}deactivateChildRoutes(n,e,r){let i=de(e);n.children.forEach(o=>{let a=o.value.outlet;this.deactivateRoutes(o,i[a],r),delete i[a];}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r);});}deactivateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(i===o)if(i.component){let a=r.getContext(i.outlet);a&&this.deactivateChildRoutes(n,e,a.children);}else this.deactivateChildRoutes(n,e,r);else o&&this.deactivateRouteAndItsChildren(e,r);}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e);}detachAndStoreRouteSubtree(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=de(n);for(let a of Object.values(o))this.deactivateRouteAndItsChildren(a,i);if(r&&r.outlet){let a=r.outlet.detach(),c=r.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:a,route:n,contexts:c});}}deactivateRouteAndOutlet(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=de(n);for(let a of Object.values(o))this.deactivateRouteAndItsChildren(a,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null),n.value._localInjector?.destroy();}activateChildRoutes(n,e,r){let i=de(e);n.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new wt(o.value.snapshot));}),n.children.length&&this.forwardEvent(new St(n.value.snapshot));}activateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(Bt(i),i===o)if(i.component){let a=r.getOrCreateContext(i.outlet);this.activateChildRoutes(n,e,a.children);}else this.activateChildRoutes(n,e,r);else if(i.component){let a=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let c=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),a.children.onOutletReAttached(c.contexts),a.attachRef=c.componentRef,a.route=c.route.value,a.outlet&&a.outlet.attach(c.componentRef,c.route.value),Bt(c.route.value),this.activateChildRoutes(n,null,a.children);}else a.attachRef=null,a.route=i,a.outlet&&a.outlet.activateWith(i,a.injector),this.activateChildRoutes(n,null,a.children);}else this.activateChildRoutes(n,null,r);}},Et$1=class Et{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1];}},pe=class{component;route;constructor(n,e){this.component=n,this.route=e;}};function Ui(t,n,e){let r=t._root,i=n?n._root:null;return Ue$1(r,i,e,[r.value])}function Oi(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return !n||n.length===0?null:{node:t,guards:n}}function we$1(t,n){let e=Symbol(),r=n.get(t,e);return r===e?typeof t=="function"&&!$g(t)?t:n.get(t):r}function Ue$1(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=de(n);return t.children.forEach(a=>{Pi$1(a,o[a.value.outlet],e,r.concat([a.value]),i),delete o[a.value.outlet];}),Object.entries(o).forEach(([a,c])=>Le(c,e.getContext(a),i)),i}function Pi$1(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,a=n?n.value:null,c=e?e.getContext(t.value.outlet):null;if(a&&o.routeConfig===a.routeConfig){let s=Li(a,o,o.routeConfig.runGuardsAndResolvers);s?i.canActivateChecks.push(new Et$1(r)):(o.data=a.data,o._resolvedData=a._resolvedData),o.component?Ue$1(t,n,c?c.children:null,r,i):Ue$1(t,n,e,r,i),s&&c&&c.outlet&&c.outlet.isActivated&&i.canDeactivateChecks.push(new pe(c.outlet.component,a));}else a&&Le(n,c,i),i.canActivateChecks.push(new Et$1(r)),o.component?Ue$1(t,null,c?c.children:null,r,i):Ue$1(t,null,e,r,i);return i}function Li(t,n,e){if(typeof e=="function")return No$3(n._environmentInjector,()=>e(t,n));switch(e){case "pathParamsChange":return !ae(t.url,n.url);case "pathParamsOrQueryParamsChange":return !ae(t.url,n.url)||!B$1(t.queryParams,n.queryParams);case "always":return  true;case "paramsOrQueryParamsChange":return !Xt(t,n)||!B$1(t.queryParams,n.queryParams);default:return !Xt(t,n)}}function Le(t,n,e){let r=de(t),i=t.value;Object.entries(r).forEach(([o,a])=>{i.component?n?Le(a,n.children.getContext(o),e):Le(a,null,e):Le(a,n,e);}),i.component?n&&n.outlet&&n.outlet.isActivated?e.canDeactivateChecks.push(new pe(n.outlet.component,i)):e.canDeactivateChecks.push(new pe(null,i)):e.canDeactivateChecks.push(new pe(null,i));}function Ge(t){return typeof t=="function"}function xi(t){return typeof t=="boolean"}function ji(t){return t&&Ge(t.canLoad)}function ki$1(t){return t&&Ge(t.canActivate)}function $i$1(t){return t&&Ge(t.canActivateChild)}function zi(t){return t&&Ge(t.canDeactivate)}function Hi$1(t){return t&&Ge(t.canMatch)}function Un(t){return t instanceof Ln$3||t?.name==="EmptyError"}var at$1=Symbol("INITIAL_VALUE");function Re(){return vl(t=>yg(t.map(n=>n.pipe(It$5(1),Bl(at$1)))).pipe(Me$3(n=>{for(let e of n)if(e!==true){if(e===at$1)return at$1;if(e===false||Fi(e))return e}return  true}),Xt$3(n=>n!==at$1),It$5(1)))}function Fi(t){return ee(t)||t instanceof ye}function On(t){return t.aborted?ag(void 0).pipe(It$5(1)):new N$2(n=>{let e=()=>{n.next(),n.complete();};return t.addEventListener("abort",e),()=>t.removeEventListener("abort",e)})}function Pn(t){return Rg(On(t))}function qi$1(t){return He$3(n=>{let{targetSnapshot:e,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=n;return o.length===0&&i.length===0?ag(x$3(w$3({},n),{guardsResult:true})):Bi(o,e,r).pipe(He$3(a=>a&&xi(a)?Vi(e,i,t):ag(a)),Me$3(a=>x$3(w$3({},n),{guardsResult:a})))})}function Bi(t,n,e){return Se$4(t).pipe(He$3(r=>Yi$1(r.component,r.route,e,n)),Mg(r=>r!==true,true))}function Vi(t,n,e){return Se$4(n).pipe(Tg(r=>Jt$3(Wi$1(r.route.parent,e),Gi$1(r.route,e),Ki$1(t,r.path),Qi$1(t,r.route))),Mg(r=>r!==true,true))}function Gi$1(t,n){return t!==null&&n&&n(new Ct(t)),ag(true)}function Wi$1(t,n){return t!==null&&n&&n(new Rt$1(t)),ag(true)}function Qi$1(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return ag(true);let r=e.map(i=>Ig(()=>{let o=n._environmentInjector,a=we$1(i,o),c=ki$1(a)?a.canActivate(n,t):No$3(o,()=>a(n,t));return le(c).pipe(Mg())}));return ag(r).pipe(Re())}function Ki$1(t,n){let e=n[n.length-1],i=n.slice(0,n.length-1).reverse().map(o=>Oi(o)).filter(o=>o!==null).map(o=>Ig(()=>{let a=o.guards.map(c=>{let s=o.node._environmentInjector,u=we$1(c,s),h=$i$1(u)?u.canActivateChild(e,t):No$3(s,()=>u(e,t));return le(h).pipe(Mg())});return ag(a).pipe(Re())}));return ag(i).pipe(Re())}function Yi$1(t,n,e,r){let i=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!i||i.length===0)return ag(true);let o=i.map(a=>{let c=n._environmentInjector,s=we$1(a,c),u=zi(s)?s.canDeactivate(t,n,e,r):No$3(c,()=>s(t,n,e,r));return le(u).pipe(Mg())});return ag(o).pipe(Re())}function Zi$1(t,n,e,r,i){let o=n.canLoad;if(o===void 0||o.length===0)return ag(true);let a=o.map(c=>{let s=we$1(c,t),u=ji(s)?s.canLoad(n,e):No$3(t,()=>s(n,e)),h=le(u);return i?h.pipe(Pn(i)):h});return ag(a).pipe(Re(),Ln(r))}function Ln(t){return Kh($l(n=>{if(typeof n!="boolean")throw At$2(t,n)}),Me$3(n=>n===true))}function Ji(t,n,e,r,i,o){let a=n.canMatch;if(!a||a.length===0)return ag(true);let c=a.map(s=>{let u=we$1(s,t),h=Hi$1(u)?u.canMatch(n,e,i):No$3(t,()=>u(n,e,i));return le(h).pipe(Pn(o))});return ag(c).pipe(Re(),Ln(r))}var G=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype);}},Be=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype);}};function Xi$1(t){throw new b$2(4e3,false)}function eo$1(t){throw Dn(false,I$1.GuardRejected)}var rr=class{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e;}lineralizeSegments(n,e){return C$4(this,null,function*(){let r=[],i=e.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[f])throw Xi$1(`${n.redirectTo}`);i=i.children[f];}})}applyRedirectCommands(n,e,r,i,o){return C$4(this,null,function*(){let a=yield to(e,i,o);if(a instanceof N)throw new Be(a);let c=this.applyRedirectCreateUrlTree(a,this.urlSerializer.parse(a),n,r);if(a[0]==="/")throw new Be(c);return c})}applyRedirectCreateUrlTree(n,e,r,i){let o=this.createSegmentGroup(n,e.root,r,i);return new N(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let r={};return Object.entries(n).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let c=o.substring(1);r[i]=e[c];}else r[i]=o;}),r}createSegmentGroup(n,e,r,i){let o=this.createSegments(n,e.segments,r,i),a={};return Object.entries(e.children).forEach(([c,s])=>{a[c]=this.createSegmentGroup(n,s,r,i);}),new m(o,a)}createSegments(n,e,r,i){return e.map(o=>o.path[0]===":"?this.findPosParam(n,o,i):this.findOrReturn(o,r))}findPosParam(n,e,r){let i=r[e.path.substring(1)];if(!i)throw new b$2(4001,false);return i}findOrReturn(n,e){let r=0;for(let i of e){if(i.path===n.path)return e.splice(r),i;r++;}return n}};function to(t,n,e){if(typeof t=="string")return Promise.resolve(t);let r=t;return lt(le(No$3(e,()=>r(n))))}function ro$1(t,n){return t.providers&&!t._injector&&(t._injector=Vp(t.providers,n,`Route: ${t.path}`)),t._injector??n}function H$1(t){return t.outlet||f}function no(t,n){let e=t.filter(r=>H$1(r)===n);return e.push(...t.filter(r=>H$1(r)!==n)),e}var nr={matched:false,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function xn$1(t){return {routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function io(t,n,e,r,i,o,a){let c=jn(t,n,e);if(!c.matched)return ag(c);let s=xn$1(o(c));return r=ro$1(n,r),Ji(r,n,e,i,s,a).pipe(Me$3(u=>u===true?c:w$3({},nr)))}function jn(t,n,e){if(n.path==="")return n.pathMatch==="full"&&(t.hasChildren()||e.length>0)?w$3({},nr):{matched:true,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let i=(n.matcher||cn$1)(e,t,n);if(!i)return w$3({},nr);let o={};Object.entries(i.posParams??{}).forEach(([c,s])=>{o[c]=s.path;});let a=i.consumed.length>0?w$3(w$3({},o),i.consumed[i.consumed.length-1].parameters):o;return {matched:true,consumedSegments:i.consumed,remainingSegments:e.slice(i.consumed.length),parameters:a,positionalParamSegments:i.posParams??{}}}function on$1(t,n,e,r,i){return e.length>0&&so(t,e,r,i)?{segmentGroup:new m(n,ao$1(r,new m(e,t.children))),slicedSegments:[]}:e.length===0&&co(t,e,r)?{segmentGroup:new m(t.segments,oo(t,e,r,t.children)),slicedSegments:e}:{segmentGroup:new m(t.segments,t.children),slicedSegments:e}}function oo(t,n,e,r){let i={};for(let o of e)if(Mt$2(t,n,o)&&!r[H$1(o)]){let a=new m([],{});i[H$1(o)]=a;}return w$3(w$3({},r),i)}function ao$1(t,n){let e={};e[f]=n;for(let r of t)if(r.path===""&&H$1(r)!==f){let i=new m([],{});e[H$1(r)]=i;}return e}function so(t,n,e,r){return e.some(i=>!Mt$2(t,n,i)||!(H$1(i)!==f)?false:!(r!==void 0&&H$1(i)===r))}function co(t,n,e){return e.some(r=>Mt$2(t,n,r))}function Mt$2(t,n,e){return (t.hasChildren()||n.length>0)&&e.pathMatch==="full"?false:e.path===""}function uo(t,n,e){return n.length===0&&!t.children[e]}var ir=class{};function lo(t,n,e,r,i,o,a,c){return C$4(this,null,function*(){return new or(t,n,e,r,i,a,o,c).recognize()})}var ho$1=31,or=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=true;constructor(n,e,r,i,o,a,c,s){this.injector=n,this.configLoader=e,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=a,this.urlSerializer=c,this.abortSignal=s,this.applyRedirects=new rr(this.urlSerializer,this.urlTree);}noMatchError(n){return new b$2(4002,`'${n.segmentGroup}'`)}recognize(){return C$4(this,null,function*(){let n=on$1(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:r}=yield this.match(n),i=new U$1(r,e),o=new Fe("",i),a=Rn(r,[],this.urlTree.queryParams,this.urlTree.fragment);return a.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(a),{state:o,tree:a}})}match(n){return C$4(this,null,function*(){let e=new me([],Object.freeze({}),Object.freeze(w$3({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),f,this.rootComponentType,null,{},this.injector);try{return {children:yield this.processSegmentGroup(this.injector,this.config,n,f,e),rootSnapshot:e}}catch(r){if(r instanceof Be)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof G?this.noMatchError(r):r}})}processSegmentGroup(n,e,r,i,o){return C$4(this,null,function*(){if(r.segments.length===0&&r.hasChildren())return this.processChildren(n,e,r,o);let a=yield this.processSegment(n,e,r,r.segments,i,true,o);return a instanceof U$1?[a]:[]})}processChildren(n,e,r,i){return C$4(this,null,function*(){let o=[];for(let s of Object.keys(r.children))s==="primary"?o.unshift(s):o.push(s);let a=[];for(let s of o){let u=r.children[s],h=no(e,s),v=yield this.processSegmentGroup(n,h,u,s,i);a.push(...v);}let c=kn(a);return fo$1(c),c})}processSegment(n,e,r,i,o,a,c){return C$4(this,null,function*(){for(let s of e)try{return yield this.processSegmentAgainstRoute(s._injector??n,e,s,r,i,o,a,c)}catch(u){if(u instanceof G||Un(u))continue;throw u}if(uo(r,i,o))return new ir;throw new G(r)})}processSegmentAgainstRoute(n,e,r,i,o,a,c,s){return C$4(this,null,function*(){if(H$1(r)!==a&&(a===f||!Mt$2(i,o,r)))throw new G(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,i,r,o,a,s);if(this.allowRedirects&&c)return this.expandSegmentAgainstRouteUsingRedirect(n,i,e,r,o,a,s);throw new G(i)})}expandSegmentAgainstRouteUsingRedirect(n,e,r,i,o,a,c){return C$4(this,null,function*(){let{matched:s,parameters:u,consumedSegments:h,positionalParamSegments:v,remainingSegments:g}=jn(e,i,o);if(!s)throw new G(e);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>ho$1&&(this.allowRedirects=false));let M=this.createSnapshot(n,i,o,u,c);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let $=yield this.applyRedirects.applyRedirectCommands(h,i.redirectTo,v,xn$1(M),n),re=yield this.applyRedirects.lineralizeSegments(i,$);return this.processSegment(n,r,e,re.concat(g),a,false,c)})}createSnapshot(n,e,r,i,o){let a=new me(r,i,Object.freeze(w$3({},this.urlTree.queryParams)),this.urlTree.fragment,go$1(e),H$1(e),e.component??e._loadedComponent??null,e,vo$1(e),n),c=cr(a,o,this.paramsInheritanceStrategy);return a.params=Object.freeze(c.params),a.data=Object.freeze(c.data),a}matchSegmentAgainstRoute(n,e,r,i,o,a){return C$4(this,null,function*(){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let c=ne=>this.createSnapshot(n,r,ne.consumedSegments,ne.parameters,a),s=yield lt(io(e,r,i,n,this.urlSerializer,c,this.abortSignal));if(r.path==="**"&&(e.children={}),!s?.matched)throw new G(e);n=r._injector??n;let{routes:u}=yield this.getChildConfig(n,r,i),h=r._loadedInjector??n,{parameters:v,consumedSegments:g,remainingSegments:M}=s,$=this.createSnapshot(n,r,g,v,a),{segmentGroup:re,slicedSegments:Ie}=on$1(e,g,M,u,o);if(Ie.length===0&&re.hasChildren()){let ne=yield this.processChildren(h,u,re,$);return new U$1($,ne)}if(u.length===0&&Ie.length===0)return new U$1($,[]);let Ot=H$1(r)===o,Ke=yield this.processSegment(h,u,re,Ie,Ot?f:o,true,$);return new U$1($,Ke instanceof U$1?[Ke]:[])})}getChildConfig(n,e,r){return C$4(this,null,function*(){if(e.children)return {routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(yield lt(Zi$1(n,e,r,this.urlSerializer,this.abortSignal))){let o=yield this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw eo$1()}return {routes:[],injector:n}})}};function fo$1(t){t.sort((n,e)=>n.value.outlet===f?-1:e.value.outlet===f?1:n.value.outlet.localeCompare(e.value.outlet));}function po$1(t){let n=t.value.routeConfig;return n&&n.path===""}function kn(t){let n=[],e=new Set;for(let r of t){if(!po$1(r)){n.push(r);continue}let i=n.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),e.add(i)):n.push(r);}for(let r of e){let i=kn(r.children);n.push(new U$1(r.value,i));}return n.filter(r=>!e.has(r))}function go$1(t){return t.data||{}}function vo$1(t){return t.resolve||{}}function mo$1(t,n,e,r,i,o,a){return He$3(c=>C$4(null,null,function*(){let{state:s,tree:u}=yield lo(t,n,e,r,c.extractedUrl,i,o,a);return x$3(w$3({},c),{targetSnapshot:s,urlAfterRedirects:u})}))}function yo$1(t){return He$3(n=>{let{targetSnapshot:e,guards:{canActivateChecks:r}}=n;if(!r.length)return ag(n);let i=new Set(r.map(c=>c.route)),o=new Set;for(let c of i)if(!o.has(c))for(let s of $n(c))o.add(s);let a=0;return Se$4(o).pipe(Tg(c=>i.has(c)?Ro$1(c,e,t):(c.data=cr(c,c.parent,t).resolve,ag(void 0))),$l(()=>a++),Ng(1),He$3(c=>a===o.size?ag(n):vt$4))})}function $n(t){let n=t.children.map(e=>$n(e)).flat();return [t,...n]}function Ro$1(t,n,e){let r=t.routeConfig,i=t._resolve;return r?.title!==void 0&&!Tn(r)&&(i[Ve$1]=r.title),Ig(()=>(t.data=cr(t,t.parent,e).resolve,So$1(i,t,n).pipe(Me$3(o=>(t._resolvedData=o,t.data=w$3(w$3({},t.data),o),null)))))}function So$1(t,n,e){let r=Gt$1(t);if(r.length===0)return ag({});let i={};return Se$4(r).pipe(He$3(o=>Co$1(t[o],n,e).pipe(Mg(),$l(a=>{if(a instanceof ye)throw At$2(new X$1,a);i[o]=a;}))),Ng(1),Me$3(()=>i),Yi$3(o=>Un(o)?vt$4:cg(o)))}function Co$1(t,n,e){let r=n._environmentInjector,i=we$1(t,r),o=i.resolve?i.resolve(n,e):No$3(r,()=>i(n,e));return le(o)}function an$1(t){return vl(n=>{let e=t(n);return e?Se$4(e).pipe(Me$3(()=>n)):ag(n)})}var fr=(()=>{class t{buildTitle(e){let r,i=e.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===f);return r}getResolvedTitleForRoute(e){return e.data[Ve$1]}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(zn)})}return t})(),zn=(()=>{class t extends fr{title;constructor(e){super(),this.title=e;}updateTitle(e){let r=this.buildTitle(e);r!==void 0&&this.title.setTitle(r);}static \u0275fac=function(r){return new(r||t)(ke$5(Na$2))};static \u0275prov=re$3({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),be=new S$1("",{factory:()=>({})}),We=new S$1(""),pr=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=T$3(rw);loadComponent(e,r){return C$4(this,null,function*(){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=C$4(this,null,function*(){try{let o=yield ln$1(No$3(e,()=>r.loadComponent())),a=yield Fn(_F(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=a,a}finally{this.componentLoaders.delete(r);}});return this.componentLoaders.set(r,i),i})}loadChildren(e,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=C$4(this,null,function*(){try{let o=yield Hn(r,this.compiler,e,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r);}});return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function Hn(t,n,e,r){return C$4(this,null,function*(){let i=yield ln$1(No$3(e,()=>t.loadChildren())),o=yield Fn(_F(i)),a;o instanceof jp||Array.isArray(o)?a=o:a=yield n.compileModuleAsync(o),r&&r(t);let c,s,h;return Array.isArray(a)?(s=a,true):(c=a.create(e).injector,h=a,s=c.get(We,[],{optional:true,self:true}).flat()),{routes:s.map(dr),injector:c,factory:h}})}function Fn(t){return C$4(this,null,function*(){return t})}var Dt=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(wo$1)})}return t})(),wo$1=(()=>{class t{shouldProcessUrl(e){return  true}extract(e){return e}merge(e,r){return e}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})(),gr=new S$1(""),vr=new S$1("");function qn(t,n,e){let r=t.get(vr),i=t.get(ir$3);if(!i.startViewTransition||r.skipNextTransition)return r.skipNextTransition=false,new Promise(u=>setTimeout(u));let o,a=new Promise(u=>{o=u;}),c=i.startViewTransition(()=>(o(),bo$1(t)));c.updateCallbackDone.catch(u=>{}),c.ready.catch(u=>{}),c.finished.catch(u=>{});let{onViewTransitionCreated:s}=r;return s&&No$3(t,()=>s({transition:c,from:n,to:e})),a}function bo$1(t){return new Promise(n=>{Wf({read:()=>setTimeout(n)},{injector:t});})}var Bn=new S$1(""),Io$1=()=>{},Vn=new S$1(""),Gn=(()=>{class t{currentNavigation=Fe$3(null,{equal:()=>false});currentTransition=null;lastSuccessfulNavigation=Fe$3(null);events=new ne$2;transitionAbortWithErrorSubject=new ne$2;configLoader=T$3(pr);environmentInjector=T$3(ce$3);destroyRef=T$3(Le$3);urlSerializer=T$3(Se$1);rootContexts=T$3(Ce);location=T$3(pn$2);inputBindingEnabled=T$3(Nt,{optional:true})!==null;titleStrategy=T$3(fr);options=T$3(be,{optional:true})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||Ti$1;urlHandlingStrategy=T$3(Dt);createViewTransition=T$3(gr,{optional:true});navigationErrorHandler=T$3(Vn,{optional:true});activatedRouteInjectorFeature=T$3(Bn,{optional:true});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>ag(void 0);rootComponentType=null;destroyed=false;constructor(){let e=i=>this.events.next(new mt(i)),r=i=>this.events.next(new yt(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=true;});}complete(){this.transitions?.complete();}handleNavigationRequest(e){let r=++this.navigationId;ae$2(()=>{this.transitions?.next(x$3(w$3({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}));});}setupNavigations(e){return this.transitions=new Rn$3(null),this.transitions.pipe(Xt$3(r=>r!==null),vl(r=>{let i=true,o=false,a=new AbortController,c=()=>!o&&this.currentTransition?.id===r.id;return ag(r).pipe(vl(s=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",I$1.SupersededByNewNavigation),vt$4;this.currentTransition=r;let u=this.lastSuccessfulNavigation();this.currentNavigation.set({id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:u?x$3(w$3({},u),{previousNavigation:null}):null,abort:()=>a.abort(),routesRecognizeHandler:s.routesRecognizeHandler,beforeActivateHandler:s.beforeActivateHandler});let h=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),v=s.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!h&&v!=="reload")return this.events.next(new W(s.id,this.urlSerializer.serialize(s.rawUrl),"",ke$1.IgnoredSameUrlNavigation)),s.resolve(false),vt$4;if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return ag(s).pipe(vl(g=>(this.events.next(new ce$1(g.id,this.urlSerializer.serialize(g.extractedUrl),g.source,g.restoredState)),g.id!==this.navigationId?vt$4:Promise.resolve(g))),mo$1(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,a.signal),$l(g=>{r.targetSnapshot=g.targetSnapshot,r.urlAfterRedirects=g.urlAfterRedirects,this.currentNavigation.update(M=>(M.finalUrl=g.urlAfterRedirects,M)),this.events.next(new ze$1);}),vl(g=>Se$4(r.routesRecognizeHandler.deferredHandle??ag(void 0)).pipe(Me$3(()=>g))),$l(()=>{let g=new $e(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(g);}));if(h&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:g,extractedUrl:M,source:$,restoredState:re,extras:Ie}=s,Ot=new ce$1(g,this.urlSerializer.serialize(M),$,re);this.events.next(Ot);let Ke=An(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=x$3(w$3({},s),{targetSnapshot:Ke,urlAfterRedirects:M,extras:x$3(w$3({},Ie),{skipLocationChange:false,replaceUrl:false})}),this.currentNavigation.update(ne=>(ne.finalUrl=M,ne)),ag(r)}else return this.events.next(new W(s.id,this.urlSerializer.serialize(s.extractedUrl),"",ke$1.IgnoredByUrlHandlingStrategy)),s.resolve(false),vt$4}),Me$3(s=>{let u=new ft(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);return this.events.next(u),this.currentTransition=r=x$3(w$3({},s),{guards:Ui(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),r}),qi$1(s=>this.events.next(s)),vl(s=>{if(r.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw At$2(this.urlSerializer,s.guardsResult);let u=new pt(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);if(this.events.next(u),!c())return vt$4;if(!s.guardsResult)return this.cancelNavigationTransition(s,"",I$1.GuardRejected),vt$4;if(s.guards.canActivateChecks.length===0)return ag(s);let h=new gt(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);if(this.events.next(h),!c())return vt$4;let v=false;return ag(s).pipe(yo$1(this.paramsInheritanceStrategy),$l({next:()=>{v=true;let g=new vt(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(g);},complete:()=>{v||this.cancelNavigationTransition(s,"",I$1.NoDataFromResolver);}}))}),an$1(s=>{let u=v=>{let g=[];if(v.routeConfig?._loadedComponent)v.component=v.routeConfig?._loadedComponent;else if(v.routeConfig?.loadComponent){let M=v._environmentInjector;g.push(this.configLoader.loadComponent(M,v.routeConfig).then($=>{v.component=$;}));}for(let M of v.children)g.push(...u(M));return g},h=u(s.targetSnapshot.root);return h.length===0?ag(s):Se$4(Promise.all(h).then(()=>s))}),vl(s=>{let{newlyCreatedRoutes:u,state:h}=Ni(e.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=r=s=x$3(w$3({},s),{targetRouterState:h,newlyCreatedRoutes:u}),this.currentNavigation.update(v=>(v.targetRouterState=h,v)),ag(s)}),this.activatedRouteInjectorFeature?.operator()??(s=>s),an$1(()=>this.afterPreactivation()),vl(()=>{let{currentSnapshot:s,targetSnapshot:u}=r,h=this.createViewTransition?.(this.environmentInjector,s.root,u.root);return h?Se$4(h).pipe(Me$3(()=>r)):ag(r)}),It$5(1),vl(s=>{i=false,this.events.next(new ge);let u=r.beforeActivateHandler.deferredHandle;return u?Se$4(u.then(()=>s)):ag(s)}),$l(s=>{new tr(e.routeReuseStrategy,r.targetRouterState,r.currentRouterState,u=>this.events.next(u),this.inputBindingEnabled).activate(this.rootContexts),s.newlyCreatedRoutes?.clear(),c()&&(o=true,this.currentNavigation.update(u=>(u.abort=Io$1,u)),this.lastSuccessfulNavigation.set(ae$2(this.currentNavigation)),this.events.next(new k(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(true));}),Rg(On(a.signal).pipe(Xt$3(()=>!o&&i),$l(()=>{this.cancelNavigationTransition(r,a.signal.reason+"",I$1.Aborted);}))),$l({complete:()=>{o=true;}}),Rg(this.transitionAbortWithErrorSubject.pipe($l(s=>{throw s}))),Vl(()=>{a.abort(),o||this.cancelNavigationTransition(r,"",I$1.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null);}),Yi$3(s=>{if(o=true,sn$1(r),this.destroyed)return r.resolve(false),vt$4;if(_n(s))this.events.next(new j$1(r.id,this.urlSerializer.serialize(r.extractedUrl),s.message,s.cancellationCode)),_i$1(s)?this.events.next(new ve(s.url,s.navigationBehaviorOptions)):r.resolve(false);else {let u=new ue(r.id,this.urlSerializer.serialize(r.extractedUrl),s,r.targetSnapshot??void 0);try{let h=No$3(this.environmentInjector,()=>this.navigationErrorHandler?.(u));if(h instanceof ye){let{message:v,cancellationCode:g}=At$2(this.urlSerializer,h);this.events.next(new j$1(r.id,this.urlSerializer.serialize(r.extractedUrl),v,g)),this.events.next(new ve(h.redirectTo,h.navigationBehaviorOptions));}else throw this.events.next(u),s}catch(h){this.options.resolveNavigationPromiseOnError?r.resolve(false):r.reject(h);}}return vt$4}))}))}cancelNavigationTransition(e,r,i){sn$1(e);let o=new j$1(e.id,this.urlSerializer.serialize(e.extractedUrl),r,i);this.events.next(o),e.resolve(false);}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true))),r=ae$2(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return e.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function Ao$1(t){return t!==Pe$1}function sn$1(t){if(t.newlyCreatedRoutes)for(let n of t.newlyCreatedRoutes)n._localInjector?.destroy();}var Wn=new S$1("");var Qn=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(Eo$1)})}return t})(),Tt$1=class Tt{shouldDetach(n){return  false}store(n,e){}shouldAttach(n){return  false}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return  true}},Eo$1=(()=>{class t extends Tt$1{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})(),_t=(()=>{class t{urlSerializer=T$3(Se$1);options=T$3(be,{optional:true})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=T$3(pn$2);urlHandlingStrategy=T$3(Dt);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new N;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:r,targetBrowserUrl:i}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,r):r,a=i??o;return a instanceof N?this.urlSerializer.serialize(a):a}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:r,initialUrl:i}){r&&e?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=e):this.rawUrlTree=i;}routerState=An(null,T$3(ce$3));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento();}createStateMemento(){return {rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(To$1)})}return t})(),To$1=(()=>{class t extends _t{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{e(r.url,r.state,"popstate",{replaceUrl:true});});})}handleRouterEvent(e,r){e instanceof ce$1?this.updateStateMemento():e instanceof W?this.commitTransition(r):e instanceof $e?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof ge?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof j$1&&!In(e)?this.restoreHistory(r):e instanceof ue?this.restoreHistory(r,true):e instanceof k&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId);}setBrowserUrl(e,r){let{extras:i,id:o}=r,{replaceUrl:a,state:c}=i;if(this.location.isCurrentPathEqualTo(e)||a){let s=this.browserPageId,u=w$3(w$3({},c),this.generateNgRouterState(o,s,r));this.location.replaceState(e,"",u);}else {let s=w$3(w$3({},c),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(e,"",s);}}restoreHistory(e,r=false){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree());}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree());}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree);}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId));}generateNgRouterState(e,r,i){return this.canceledNavigationResolution==="computed"?w$3({navigationId:e,\u0275routerPageId:r},this.routerUrlState(i)):w$3({navigationId:e},this.routerUrlState(i))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function mr(t,n){t.events.pipe(Xt$3(e=>e instanceof k||e instanceof j$1||e instanceof ue||e instanceof W),Me$3(e=>e instanceof k||e instanceof W?0:(e instanceof j$1?e.code===I$1.Redirect||e.code===I$1.SupersededByNewNavigation:false)?2:1),Xt$3(e=>e!==2),It$5(1)).subscribe(()=>{n();});}var te=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=false;nonRouterCurrentEntryChangeSubscription;console=T$3(HE);stateManager=T$3(_t);options=T$3(be,{optional:true})||{};pendingTasks=T$3(Lt$4);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=T$3(Gn);urlSerializer=T$3(Se$1);location=T$3(pn$2);urlHandlingStrategy=T$3(Dt);injector=T$3(ce$3);_events=new ne$2;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=false;routeReuseStrategy=T$3(Qn);injectorCleanup=T$3(Wn,{optional:true});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=T$3(We,{optional:true})?.flat()??[];componentInputBindingEnabled=!!T$3(Nt,{optional:true});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents();}eventsSubscription=new G$2;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=ae$2(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof j$1&&r.code!==I$1.Redirect&&r.code!==I$1.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof k)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof ve){let a=r.navigationBehaviorOptions,c=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),s=w$3({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||Ao$1(i.source)},a);this.scheduleNavigation(c,Pe$1,null,s,{resolve:i.resolve,reject:i.reject,promise:i.promise});}}Ai$1(r)&&this._events.next(r);}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i);}});this.eventsSubscription.add(e);}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e;}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(true),Pe$1,this.stateManager.restoredState(),{replaceUrl:true});}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,r,i,o)=>{this.navigateToSyncWithBrowser(e,i,r,o);});}navigateToSyncWithBrowser(e,r,i,o){let a=i?.navigationId?i:null,c=i?.\u0275routerUrl??e;if(i?.\u0275routerUrl&&(o=x$3(w$3({},o),{browserUrl:e})),i){let u=w$3({},i);delete u.navigationId,delete u.\u0275routerPageId,delete u.\u0275routerUrl,Object.keys(u).length!==0&&(o.state=u);}let s=this.parseUrl(c);this.scheduleNavigation(s,r,a,o).catch(u=>{this.disposed||this.injector.get(Ft$4)(u);});}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return ae$2(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(dr),this.navigated=false;}ngOnDestroy(){this.dispose();}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=true,this.eventsSubscription.unsubscribe();}createUrlTree(e,r={}){let{relativeTo:i,queryParams:o,fragment:a,queryParamsHandling:c,preserveFragment:s}=r,u=s?this.currentUrlTree.fragment:a,h=null;switch(c??this.options.defaultQueryParamsHandling){case "merge":h=w$3(w$3({},this.currentUrlTree.queryParams),o);break;case "preserve":h=this.currentUrlTree.queryParams;break;default:h=o||null;}h!==null&&(h=this.removeEmptyProps(h));let v;try{let g=i?i.snapshot:this.routerState.snapshot.root;v=Sn(g);}catch(g){(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),v=this.currentUrlTree.root;}return Cn$1(v,e,h,u??null,this.urlSerializer)}navigateByUrl(e,r={skipLocationChange:false}){let i=ee(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,Pe$1,null,r)}navigate(e,r={skipLocationChange:false}){return No$1(e),this.navigateByUrl(this.createUrlTree(e,r),r)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch(r){return this.console.warn(zn$3(4018,false)),this.urlSerializer.parse("/")}}isActive(e,r){let i;if(r===true?i=w$3({},ar):r===false?i=w$3({},xe):i=w$3(w$3({},xe),r),ee(e))return Wt$1(this.currentUrlTree,e,i);let o=this.parseUrl(e);return Wt$1(this.currentUrlTree,o,i)}removeEmptyProps(e){return Object.entries(e).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(e,r,i,o,a){if(this.disposed)return Promise.resolve(false);let c,s,u;a?(c=a.resolve,s=a.reject,u=a.promise):u=new Promise((v,g)=>{c=v,s=g;});let h=this.pendingTasks.add();return mr(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(h));}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:c,reject:s,promise:u,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),u.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function No$1(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new b$2(4008,false)}var Do$1=(()=>{class t{router=T$3(te);stateManager=T$3(_t);fragment=Fe$3("");queryParams=Fe$3({});path=Fe$3("");serializer=T$3(Se$1);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof k&&this.updateState();});}updateState(){let{fragment:e,root:r,queryParams:i}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(i),this.path.set(this.serializer.serialize(new N(r)));}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})(),Ut$1=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=T$3(new Fh("href"),{optional:true});reactiveHref=Yc(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return ae$2(this.reactiveHref)}set href(e){this.reactiveHref.set(e);}set target(e){this._target.set(e);}get target(){return ae$2(this._target)}_target=Fe$3(void 0);set queryParams(e){this._queryParams.set(e);}get queryParams(){return ae$2(this._queryParams)}_queryParams=Fe$3(void 0,{equal:()=>false});set fragment(e){this._fragment.set(e);}get fragment(){return ae$2(this._fragment)}_fragment=Fe$3(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e);}get queryParamsHandling(){return ae$2(this._queryParamsHandling)}_queryParamsHandling=Fe$3(void 0);set state(e){this._state.set(e);}get state(){return ae$2(this._state)}_state=Fe$3(void 0,{equal:()=>false});set info(e){this._info.set(e);}get info(){return ae$2(this._info)}_info=Fe$3(void 0,{equal:()=>false});set relativeTo(e){this._relativeTo.set(e);}get relativeTo(){return ae$2(this._relativeTo)}_relativeTo=Fe$3(void 0);set preserveFragment(e){this._preserveFragment.set(e);}get preserveFragment(){return ae$2(this._preserveFragment)}_preserveFragment=Fe$3(false);set skipLocationChange(e){this._skipLocationChange.set(e);}get skipLocationChange(){return ae$2(this._skipLocationChange)}_skipLocationChange=Fe$3(false);set replaceUrl(e){this._replaceUrl.set(e);}get replaceUrl(){return ae$2(this._replaceUrl)}_replaceUrl=Fe$3(false);browserUrl=NF(void 0);isAnchorElement;onChanges=new ne$2;applicationErrorHandler=T$3(Ft$4);options=T$3(be,{optional:true});reactiveRouterState=T$3(Do$1);constructor(e,r,i,o,a,c){this.router=e,this.route=r,this.tabIndexAttribute=i,this.renderer=o,this.el=a,this.locationStrategy=c;let s=a.nativeElement.tagName?.toLowerCase();this.isAnchorElement=s==="a"||s==="area"||!!(typeof customElements=="object"&&customElements.get(s)?.observedAttributes?.includes?.("href"));}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",e);}ngOnChanges(e){this.onChanges.next(this);}routerLinkInput=Fe$3(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(ee(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl("0"));}onClick(e,r,i,o,a){let c=this._urlTree();if(c===null||this.isAnchorElement&&(e!==0||r||i||o||a||typeof this.target=="string"&&this.target!="_self"))return  true;let s=this.browserUrl(),u=w$3({skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info},s!==void 0&&{browserUrl:s});return this.router.navigateByUrl(c,u)?.catch(h=>{this.applicationErrorHandler(h);}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,r){let i=this.renderer,o=this.el.nativeElement;r!==null?i.setAttribute(o,e,r):i.removeAttribute(o,e);}_urlTree=dt$3(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=i=>i==="preserve"||i==="merge";(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let r=this.routerLinkInput();return r===null||!this.router.createUrlTree?null:ee(r)?r:this.router.createUrlTree(r,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,r)=>this.computeHref(e)===this.computeHref(r)});get urlTree(){return ae$2(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??"":null}static \u0275fac=function(r){return new(r||t)(Ar$2(te),Ar$2(Q$1),sf("tabindex"),Ar$2(CI),Ar$2(Tr$2),Ar$2(xe$2))};static \u0275dir=CE({type:t,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(r,i){r&1&&ih("click",function(a){return i.onClick(a.button,a.ctrlKey,a.shiftKey,a.altKey,a.metaKey)}),r&2&&Kp("href",i.reactiveHref(),Gy)("target",i._target());},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",PF],skipLocationChange:[2,"skipLocationChange","skipLocationChange",PF],replaceUrl:[2,"replaceUrl","replaceUrl",PF],browserUrl:[1,"browserUrl"],routerLink:"routerLink"},features:[Pm]})}return t})(),_o$1=(()=>{class t{router;element;renderer;cdr;links;classes=[];routerEventsSubscription;linkInputChangesSubscription;_isActive=false;get isActive(){return this._isActive}routerLinkActiveOptions={exact:false};ariaCurrentWhenActive;isActiveChange=new qe$3;link=T$3(Ut$1,{optional:true});constructor(e,r,i,o){this.router=e,this.element=r,this.renderer=i,this.cdr=o,this.routerEventsSubscription=e.events.subscribe(a=>{a instanceof k&&this.update();});}ngAfterContentInit(){ag(this.links.changes,ag(null)).pipe(Fn$3()).subscribe(e=>{this.update(),this.subscribeToEachLinkOnChanges();});}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let e=[...this.links.toArray(),this.link].filter(r=>!!r).map(r=>r.onChanges);this.linkInputChangesSubscription=Se$4(e).pipe(Fn$3()).subscribe(r=>{this._isActive!==this.isLinkActive(this.router)(r)&&this.update();});}set routerLinkActive(e){let r=Array.isArray(e)?e:e.split(" ");this.classes=r.filter(i=>!!i);}ngOnChanges(e){this.update();}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe();}update(){!this.links||!this.router.navigated||queueMicrotask(()=>{let e=this.hasActiveLinks();this.classes.forEach(r=>{e?this.renderer.addClass(this.element.nativeElement,r):this.renderer.removeClass(this.element.nativeElement,r);}),e&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,"aria-current",this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,"aria-current"),this._isActive!==e&&(this._isActive=e,this.cdr.markForCheck(),this.isActiveChange.emit(e));});}isLinkActive(e){let r=Uo$1(this.routerLinkActiveOptions)?this.routerLinkActiveOptions:this.routerLinkActiveOptions.exact??false?w$3({},ar):w$3({},xe);return i=>{let o=i.urlTree;return o?ae$2(sr(o,e,r)):false}}hasActiveLinks(){let e=this.isLinkActive(this.router);return this.link&&e(this.link)||this.links.some(e)}static \u0275fac=function(r){return new(r||t)(Ar$2(te),Ar$2(Tr$2),Ar$2(CI),Ar$2(kF))};static \u0275dir=CE({type:t,selectors:[["","routerLinkActive",""]],contentQueries:function(r,i,o){if(r&1&&ch(o,Ut$1,5),r&2){let a;fD(a=pD())&&(i.links=a);}},inputs:{routerLinkActiveOptions:"routerLinkActiveOptions",ariaCurrentWhenActive:"ariaCurrentWhenActive",routerLinkActive:"routerLinkActive"},outputs:{isActiveChange:"isActiveChange"},exportAs:["routerLinkActive"],features:[Pm]})}return t})();function Uo$1(t){let n=t;return !!(n.paths||n.matrixParams||n.queryParams||n.fragment)}var Qe=class{},Oo$1=(()=>{class t{preload(e,r){return r().pipe(Yi$3(()=>ag(null)))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();var Kn=(()=>{class t{router;injector;preloadingStrategy;loader;subscription;constructor(e,r,i,o){this.router=e,this.injector=r,this.preloadingStrategy=i,this.loader=o;}setUpPreloading(){this.subscription=this.router.events.pipe(Xt$3(e=>e instanceof k),Tg(()=>this.preload())).subscribe(()=>{});}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe();}processRoutes(e,r){let i=[];for(let o of r){o.providers&&!o._injector&&(o._injector=Vp(o.providers,e,""));let a=o._injector??e;o._loadedNgModuleFactory&&!o._loadedInjector&&(o._loadedInjector=o._loadedNgModuleFactory.create(a).injector);let c=o._loadedInjector??a;(o.loadChildren&&!o._loadedRoutes&&o.canLoad===void 0||o.loadComponent&&!o._loadedComponent)&&i.push(this.preloadConfig(a,o)),(o.children||o._loadedRoutes)&&i.push(this.processRoutes(c,o.children??o._loadedRoutes));}return Se$4(i).pipe(Fn$3())}preloadConfig(e,r){return this.preloadingStrategy.preload(r,()=>{if(e.destroyed)return ag(null);let i;r.loadChildren&&r.canLoad===void 0?i=Se$4(this.loader.loadChildren(e,r)):i=ag(null);let o=i.pipe(He$3(a=>a===null?ag(void 0):(r._loadedRoutes=a.routes,r._loadedInjector=a.injector,r._loadedNgModuleFactory=a.factory,this.processRoutes(a.injector??e,a.routes))));if(r.loadComponent&&!r._loadedComponent){let a=this.loader.loadComponent(e,r);return Se$4([o,a]).pipe(Fn$3())}else return o})}static \u0275fac=function(r){return new(r||t)(ke$5(te),ke$5(ce$3),ke$5(Qe),ke$5(pr))};static \u0275prov=re$3({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Po$1=new S$1("");function Lo$1(t,...n){return Rs$1([{provide:We,multi:true,useValue:t},{provide:Q$1,useFactory:xo$1},{provide:Zp,multi:true,useFactory:jo$1},n.map(e=>e.\u0275providers)])}function xo$1(){return T$3(te).routerState.root}function Yn(t,n){return {\u0275kind:t,\u0275providers:n}}function jo$1(){let t=T$3(le$2);return n=>{let e=t.get(Fi$3);if(n!==e.components[0])return;let r=t.get(te),i=t.get(ko$1);t.get($o$1)===1&&r.initialNavigation(),t.get(Zn,null,{optional:true})?.setUpPreloading(),t.get(Po$1,null,{optional:true})?.init(),r.resetRootComponentType(e.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe());}}var ko$1=new S$1("",{factory:()=>new ne$2}),$o$1=new S$1("",{factory:()=>1});var Zn=new S$1("");function zo$1(t){return Yn(0,[{provide:Zn,useExisting:Kn},{provide:Qe,useExisting:t}])}function Ho$1(t){_e$3("NgRouterViewTransitions");let n=[{provide:gr,useValue:qn},{provide:vr,useValue:w$3({skipNextTransition:false},t)}];return Yn(9,n)}
var r=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=CE({type:t,selectors:[["","mat-line",""],["","matLine",""]],hostAttrs:[1,"mat-line"]})}return t})();function j(o){return Error(`Unable to find icon with the name "${o}"`)}function J(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function B(o){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${o}".`)}function $(o){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${o}".`)}var a=class{url;svgText;options;svgElement=null;constructor(l,t,e){this.url=l,this.svgText=t,this.options=e;}},Y=(()=>{class o{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,e,n,i){this._httpClient=t,this._sanitizer=e,this._errorHandler=i,this._document=n;}addSvgIcon(t,e,n){return this.addSvgIconInNamespace("",t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace("",t,e,n)}addSvgIconInNamespace(t,e,n,i){return this._addSvgIconConfig(t,e,new a(n,null,i))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,i){let r=this._sanitizer.sanitize(br$2.HTML,n);if(!r)throw $(n);let s=Cr(r);return this._addSvgIconConfig(t,e,new a("",s,i))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace("",t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace("",t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new a(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){let i=this._sanitizer.sanitize(br$2.HTML,e);if(!i)throw $(e);let r=Cr(i);return this._addSvgIconSetConfig(t,new a("",r,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let e=this._sanitizer.sanitize(br$2.RESOURCE_URL,t);if(!e)throw B(t);let n=this._cachedIconsByUrl.get(e);return n?ag(M(n)):this._loadSvgIconFromConfig(new a(t,null)).pipe($l(i=>this._cachedIconsByUrl.set(e,i)),Me$3(i=>M(i)))}getNamedSvgIcon(t,e=""){let n=q(e,t),i=this._svgIconConfigs.get(n);if(i)return this._getSvgFromConfig(i);if(i=this._getIconConfigFromResolvers(e,t),i)return this._svgIconConfigs.set(n,i),this._getSvgFromConfig(i);let r=this._iconSetConfigs.get(e);return r?this._getSvgFromIconSetConfigs(t,r):cg(j(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear();}_getSvgFromConfig(t){return t.svgText?ag(M(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(Me$3(e=>M(e)))}_getSvgFromIconSetConfigs(t,e){let n=this._extractIconWithNameFromAnySet(t,e);if(n)return ag(n);let i=e.filter(r=>!r.svgText).map(r=>this._loadSvgIconSetFromConfig(r).pipe(Yi$3(s=>{let h=`Loading icon set URL: ${this._sanitizer.sanitize(br$2.RESOURCE_URL,r.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(h)),ag(null)})));return Eg(i).pipe(Me$3(()=>{let r=this._extractIconWithNameFromAnySet(t,e);if(!r)throw j(t);return r}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.svgText&&i.svgText.toString().indexOf(t)>-1){let r=this._svgElementFromConfig(i),s=this._extractSvgIconFromSet(r,t,i.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe($l(e=>t.svgText=e),Me$3(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?ag(null):this._fetchIcon(t).pipe($l(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){let i=t.querySelector(`[id="${e}"]`);if(!i)return null;let r=i.cloneNode(true);if(r.removeAttribute("id"),r.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(r,n);if(r.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(r),n);let s=this._svgElementFromString(Cr("<svg></svg>"));return s.appendChild(r),this._setSvgAttributes(s,n)}_svgElementFromString(t){let e=this._document.createElement("DIV");e.innerHTML=t;let n=e.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(t){let e=this._svgElementFromString(Cr("<svg></svg>")),n=t.attributes;for(let i=0;i<n.length;i++){let{name:r,value:s}=n[i];r!=="id"&&e.setAttribute(r,s);}for(let i=0;i<t.childNodes.length;i++)t.childNodes[i].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[i].cloneNode(true));return e}_setSvgAttributes(t,e){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),e&&e.viewBox&&t.setAttribute("viewBox",e.viewBox),t}_fetchIcon(t){let{url:e,options:n}=t,i=n?.withCredentials??false;if(!this._httpClient)throw J();if(e==null)throw Error(`Cannot fetch icon from URL "${e}".`);let r=this._sanitizer.sanitize(br$2.RESOURCE_URL,e);if(!r)throw B(e);let s=this._inProgressUrlFetches.get(r);if(s)return s;let f=this._httpClient.get(r,{responseType:"text",withCredentials:i}).pipe(Me$3(h=>Cr(h)),Vl(()=>this._inProgressUrlFetches.delete(r)),es$2());return this._inProgressUrlFetches.set(r,f),f}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(q(t,e),n),this}_addSvgIconSetConfig(t,e){let n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){let e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e;}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){let i=this._resolvers[n](e,t);if(i)return V(i)?new a(i.url,null,i.options):new a(i,null)}}static \u0275fac=function(e){return new(e||o)(ke$5(jn$2,8),ke$5(Kr$1),ke$5(ir$3,8),ke$5(Qe$2))};static \u0275prov=re$3({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();function M(o){return o.cloneNode(true)}function q(o,l){return o+":"+l}function V(o){return !!(o.url&&o.options)}var Z=["*"],Q=new S$1("MAT_ICON_DEFAULT_OPTIONS"),X=new S$1("mat-icon-location",{providedIn:"root",factory:()=>{let o=T$3(ir$3),l=o?o.location:null;return {getPathname:()=>l?l.pathname+l.search:""}}}),K=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],tt$1=K.map(o=>`[${o}]`).join(", "),et$1=/^url\(['"]?#(.*?)['"]?\)$/,Mt$1=(()=>{class o{_elementRef=T$3(Tr$2);_iconRegistry=T$3(Y);_location=T$3(X);_errorHandler=T$3(Qe$2);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t;}_color;inline=false;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t);}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses());}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses());}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=G$2.EMPTY;constructor(){let t=T$3(new Fh("aria-hidden"),{optional:true}),e=T$3(Q,{optional:true});e&&(e.color&&(this.color=this._defaultColor=e.color),e.fontSet&&(this.fontSet=e.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true");}_splitIconName(t){if(!t)return ["",""];let e=t.split(":");switch(e.length){case 1:return ["",e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses();}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e));}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();}_usingFontIcon(){return !this.svgIcon}_setSvgElement(t){this._clearSvgElement();let e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t);}_clearSvgElement(){let t=this._elementRef.nativeElement,e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){let n=t.childNodes[e];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove();}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon);}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let e=this._elementsWithExternalReferences;e&&e.forEach((n,i)=>{n.forEach(r=>{i.setAttribute(r.name,`url('${t}#${r.value}')`);});});}_cacheChildrenWithExternalReferences(t){let e=t.querySelectorAll(tt$1),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<e.length;i++)K.forEach(r=>{let s=e[i],f=s.getAttribute(r),h=f?f.match(et$1):null;if(h){let v=n.get(s);v||(v=[],n.set(s,v)),v.push({name:r,value:h[1]});}});}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe(It$5(1)).subscribe(i=>this._setSvgElement(i),i=>{let r=`Error retrieving icon ${e}:${n}! ${i.message}`;this._errorHandler.handleError(new Error(r));});}}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=IE({type:o,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(e,n){e&2&&(Kp("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),_D(n.color?"mat-"+n.color:""),gh("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"));},inputs:{color:"color",inline:[2,"inline","inline",PF],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:Z,decls:1,vars:0,template:function(e,n){e&1&&(lD(),uD(0));},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
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
`],encapsulation:2})}return o})();var Rt=new S$1("ARTWORK_PORT");var nt$1=(function(o){return o.MEDIUM="Medium",o.HEIGHT="Height",o.WIDTH="Width",o.UNIT="Unit",o.YEAR="Year",o.IMAGETYPE="Image Type",o.ARTIST="Artist",o.PROJECT="Project",o.DESC_AUTHOR="Description Author",o.DESC_LANG="Description language",o.VERSION="Version",o})(nt$1||{}),ot=(function(o){return o.FRONTAL="Frontal view",o.PROGRESS="Work in progress",o.DETAIL="Detail",o})(ot||{}),it$1=(function(o){return o.YEAR="year",o.SIZE="size",o.MEDIUM="medium",o})(it$1||{}),At$1=["23","24","25","26","30","34","37","58","59","61","64","66","70","71","72","74","75","77","94","97","112","114","115","118","117","126","136","159","161","163","165"];var rt$1=["*"],Pt$1=(()=>{class o{labelPosition="after";static \u0275fac=function(e){return new(e||o)};static \u0275cmp=IE({type:o,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(e,n){e&2&&gh("mdc-form-field--align-end",n.labelPosition==="before");},inputs:{labelPosition:"labelPosition"},ngContentSelectors:rt$1,decls:1,vars:0,template:function(e,n){e&1&&(lD(),uD(0));},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})}return o})();var Xe={type:null,entityIds:null,skip:false,payload:null},Hi=false;function qi(){Hi=false;}function ce(r,n,e){U(r,n,e),Hi=true;}function U(r,n,e){Hi===false&&(Xe.type=r,Xe.entityIds=n,Xe.payload=e);}function Yi(r=true){Xe.skip=r;}function Ki(r,n){return function(e,t,i){let a=i.value;return i.value=function(...o){return ce(r,n),a.apply(this,o)},i}}function Se(r,n){return r.hasOwnProperty(n)}function he(r){return Array.isArray(r)}function Vt(r){return r.hasOwnProperty("active")}function hi(r){return he(r)}function Ut({active:r,ids:n,entities:e}){return hi(r)?oa(r,n):Se(e,r)===false?null:r}function oa(r,n){let e=r.filter(t=>n.indexOf(t)>-1);return e.length===r.length?r:e}function Qi({state:r,entities:n,idKey:e,options:t={},preAddEntity:i}){let a={},o=[],l=false;for(let d of n)if(Se(r.entities,d[e])===false){let u=i(d),k=u[e];a[k]=u,t.prepend?o.unshift(k):o.push(k),l=true;}return l?{newState:x$3(w$3({},r),{entities:w$3(w$3({},r.entities),a),ids:t.prepend?[...o,...r.ids]:[...r.ids,...o]}),newIds:o}:null}function H(r){return r==null}function L(r){return H(r)?[]:Array.isArray(r)?r:[r]}function Me(r){return he(r)?r.length===0:false}function b(r){return typeof r=="function"}function ke(r){let n=typeof r;return r!=null&&(n=="object"||n=="function")}var sa={resettable:false,ttl:null,producerFn:void 0};function Mt(){return sa}function la(){return sa.producerFn}function Ve(r){return H(r)===false}var jt=new ne$2,Je=new On$3(50,5e3),Wi=new ne$2;function ca(r){jt.next(r);}function da(r){Je.next(r);}function ua(r,n){Wi.next({storeName:r,action:n});}var et=typeof window<"u",zt=!et,Gi=()=>{try{return typeof localStorage<"u"}catch(r){return  false}},ma=()=>{try{return typeof sessionStorage<"u"}catch(r){return  false}};var I={},$i={};et&&(window.$$stores=I,window.$$queries=$i);function Xi(r){return r&&r.charAt(0).toUpperCase()+r.slice(1)}var kt=[];function Zi(r,n={}){if(zt||!window.__REDUX_DEVTOOLS_EXTENSION__)return;kt.length&&kt.forEach(u=>{u.unsubscribe?u.unsubscribe():u&&u();}),r&&r.run||(r=r||{},r.run=u=>u(),n=r);let i=Object.assign({},{name:"Akita",shallow:true,storesWhitelist:[]},n),a=i.storesWhitelist,o=window.__REDUX_DEVTOOLS_EXTENSION__.connect(i),l={},d=u=>a.length?a.indexOf(u)>-1:true;kt.push(Je.subscribe(u=>{d(u)!==false&&(l=x$3(w$3({},l),{[u]:I[u]._value()}),o.send({type:`[${Xi(u)}] - @@INIT`},l));})),kt.push(jt.subscribe(u=>{d(u)!==false&&(delete l[u],o.send({type:`[${u}] - Delete Store`},l));})),kt.push(Wi.subscribe(({storeName:u,action:k})=>{if(d(u)===false)return;let Dt=k,{type:x,entityIds:y,skip:w}=Dt,X=z$2(Dt,["type","entityIds","skip"]).payload;if(w){Yi(false);return}let de=I[u];if(!de||n.shallow===false&&l[u]&&JSON.stringify(de._value())===JSON.stringify(l[u]))return;l=x$3(w$3({},l),{[u]:de._value()});let fe=Xi(u),Z=Ve(y)?`[${fe}] - ${x} (ids: ${y})`:`[${fe}] - ${x}`;if(n.logTrace&&(console.group(Z),console.trace(),console.groupEnd()),n.sortAlphabetically){let ot=Object.keys(l).sort().reduce((st,Ot)=>(st[Ot]=l[Ot],st),{});o.send(w$3({type:Z},X),ot);return}o.send(w$3({type:Z},X),l);})),kt.push(o.subscribe(u=>{if(u.type==="DISPATCH"){if(u.payload.type==="COMMIT"){o.init(l);return}if(u.state){let x=JSON.parse(u.state);for(let y=0,w=Object.keys(x);y<w.length;y++){let D=w[y];I[D]&&r.run(()=>{I[D]._setState(()=>x[D],false);});}}}}));}var Ue=(function(r){return r.Set="Set",r.Add="Add",r.Update="Update",r.Remove="Remove",r})(Ue||{});function en(r,n,e){let t;if(he(r))t=r;else if(ke(r)){if(H(e))return;r=Object.assign({wrap:true},r);let i=n.indexOf(e);if(r.prev){let a=i===0;if(a&&!r.wrap)return;t=a?n[n.length-1]:n[i-1];}else if(r.next){let a=n.length===i+1;if(a&&!r.wrap)return;t=a?n[0]:n[i+1];}}else {if(r===e)return;t=r;}return t}var tn=()=>({entities:{},ids:[],loading:true,error:null});function we(r){return r===void 0}function nn({state:r,ids:n}){if(H(n))return pa(r);let e=r.entities,t={};for(let a of r.ids)n.includes(a)===false&&(t[a]=e[a]);let i=x$3(w$3({},r),{entities:t,ids:r.ids.filter(a=>n.includes(a)===false)});return Vt(r)&&(i.active=Ut(i)),i}function pa(r){return x$3(w$3({},r),{entities:{},ids:[],active:hi(r.active)?[]:null})}function rn(r,n,e){let t={entities:{},ids:[]};for(let i of r){let a=e(i);t.entities[a[n]]=a,t.ids.push(a[n]);}return t}function fa(r){return r.entities&&r.ids}function ha(r,n){let e={};for(let t of Object.keys(r))e[t]=n(r[t]);return e}function an({state:r,entities:n,idKey:e,preAddEntity:t,isNativePreAdd:i}){let a,o;if(he(n)){let d=rn(n,e,t);a=d.entities,o=d.ids;}else fa(n)?(a=i?n.entities:ha(n.entities,t),o=n.ids):(a=i?n:ha(n,t),o=Object.keys(a).map(d=>isNaN(d)?d:Number(d)));let l=x$3(w$3({},r),{entities:a,ids:o,loading:false});return Vt(r)&&(l.active=Ut(l)),l}function on(r){Object.freeze(r);let n=typeof r=="function",e=Object.prototype.hasOwnProperty;return Object.getOwnPropertyNames(r).forEach(function(t){e.call(r,t)&&(!n||t!=="caller"&&t!=="callee"&&t!=="arguments")&&r[t]!==null&&(typeof r[t]=="object"||typeof r[t]=="function")&&!Object.isFrozen(r[t])&&on(r[t]);}),r}function ga(r,n){r||console.error(`@StoreConfig({ name }) is missing in ${n}`);}function Pe(r){return r!=null&&`${r}`!="false"}function Et(r){return Pe(r)&&r.constructor.name==="Object"}var tt="akitaConfig";function sn(r){return function(n){n[tt]={idKey:"id"};for(let e=0,t=Object.keys(r);e<t.length;e++){let i=t[e];i==="name"?n[tt].storeName=r[i]:n[tt][i]=r[i];}}}var Qa=new ne$2,_a=new Rn$3(false),De={activeTransactions:0,batchTransaction:null};function ya(){fi()||(De.batchTransaction=new ne$2),De.activeTransactions++,_a.next(true);}function ba(){--De.activeTransactions===0&&(De.batchTransaction.next(true),De.batchTransaction.complete(),_a.next(false),Qa.next(true));}function fi(){return De.activeTransactions>0}function ln(){return De.batchTransaction?De.batchTransaction.asObservable():ag(true)}function qt(r,n=void 0){ya();try{return r.apply(n)}finally{ce("@Transaction"),ba();}}function gi(){return function(r,n,e){let t=e.value;return e.value=function(...i){return qt(()=>t.apply(this,i),this)},e}}var je=class{constructor(n,e={}){this.options=e,this.inTransaction=false,this.cache={active:new Rn$3(false),ttl:null},this.onInit(n);}setLoading(n=false){n!==this._value().loading&&(U("Set Loading"),this._setState(e=>x$3(w$3({},e),{loading:n})));}setHasCache(n,e={restartTTL:false}){if(n!==this.cache.active.value&&this.cache.active.next(n),e.restartTTL){let t=this.getCacheTTL();t&&(this.cache.ttl!==null&&clearTimeout(this.cache.ttl),this.cache.ttl=setTimeout(()=>this.setHasCache(false),t));}}getValue(){return this.storeValue}setError(n){n!==this._value().error&&(U("Set Error"),this._setState(e=>x$3(w$3({},e),{error:n})));}_select(n){return this.store.asObservable().pipe(Me$3(e=>n(e.state)),Fl())}_value(){return this.storeValue}_cache(){return this.cache.active}get config(){return this.constructor[tt]||{}}get storeName(){return this.config.storeName||this.options.storeName||this.options.name}get deepFreeze(){return this.config.deepFreezeFn||this.options.deepFreezeFn||on}get cacheConfig(){return this.config.cache||this.options.cache}get _producerFn(){return this.config.producerFn||this.options.producerFn||la()}get resettable(){return Ve(this.config.resettable)?this.config.resettable:this.options.resettable}_setState(n,e=true){if(b(n)){let t=n(this._value());this.storeValue=this.deepFreeze(t);}else this.storeValue=n;if(!this.store){this.store=new Rn$3({state:this.storeValue}),this.store.subscribe(({action:t})=>{t&&ua(this.storeName,t);});return}if(fi()){this.handleTransaction();return}this.dispatch(this.storeValue,e);}reset(){this.isResettable()&&(U("Reset"),this._setState(()=>Object.assign({},this._initialState)),this.setHasCache(false));}update(n){U("Update");let e,t=this._value();b(n)?e=b(this._producerFn)?this._producerFn(t,n):n(t):e=n;let i=this.akitaPreUpdate(t,w$3(w$3({},t),e)),a=Et(t)?i:new t.constructor(i);this._setState(a);}updateStoreConfig(n){this.options=w$3(w$3({},this.options),n);}akitaPreUpdate(n,e){return e}destroy(){!(et&&window.hmrEnabled)&&this===I[this.storeName]&&(delete I[this.storeName],ca(this.storeName),this.setHasCache(false),this.cache.active.complete(),this.store.complete());}onInit(n){I[this.storeName]=this,this._setState(()=>n),da(this.storeName),this.isResettable()&&(this._initialState=n),ga(this.storeName,this.constructor.name);}dispatch(n,e=true){let t;e&&(t=Xe,qi()),this.store.next({state:n,action:t});}watchTransaction(){ln().subscribe(()=>{this.inTransaction=false,this.dispatch(this._value());});}isResettable(){return this.resettable===false?false:this.resettable||Mt().resettable}handleTransaction(){this.inTransaction||(this.watchTransaction(),this.inTransaction=true);}getCacheTTL(){return this.cacheConfig&&this.cacheConfig.ttl||Mt().ttl}};function cn({state:r,ids:n,idKey:e,newStateOrFn:t,preUpdateEntity:i,producerFn:a,onEntityIdChanges:o}){let l={},d=false,u;for(let w of n){if(Se(r.entities,w)===false)continue;let D=r.entities[w],X;b(t)?X=b(a)?a(D,t):t(D):X=t;let de=X.hasOwnProperty(e)&&X[e]!==D[e],fe;u=w,de&&(d=true,u=X[e]);let Z=w$3(w$3({},D),X);Et(D)?fe=Z:Et(X)?fe=new D.constructor(Z):fe=new X.constructor(Z),l[u]=i(D,fe);}let k=r.ids,x=r.entities;if(d){let[w]=n,y=r.entities,{[w]:D}=y;x=z$2(y,[y$1(w)]),k=r.ids.map(de=>de===w?u:de),o(w,u);}return x$3(w$3({},r),{entities:w$3(w$3({},x),l),ids:k})}var va,it=class r extends je{constructor(n={},e={}){super(w$3(w$3({},tn()),n),e),this.options=e,this.entityActions=new ne$2,this.entityIdChanges=new ne$2;}get selectEntityAction$(){return this.entityActions.asObservable()}get selectEntityIdChanges$(){return this.entityIdChanges.asObservable()}get idKey(){return this.config.idKey||this.options.idKey||"id"}set(n,e={}){if(H(n))return;U("Set Entity");let t=this.akitaPreAddEntity===r.prototype.akitaPreAddEntity;this.setHasCache(true,{restartTTL:true}),this._setState(i=>{let a=an({state:i,entities:n,idKey:this.idKey,preAddEntity:this.akitaPreAddEntity.bind(this),isNativePreAdd:t});return we(e.activeId)===false&&(a.active=e.activeId),a}),this.hasInitialUIState()&&this.handleUICreation(),this.entityActions.next({type:Ue.Set,ids:this.ids});}add(n,e={loading:false}){let t=L(n);if(Me(t))return;let i=Qi({state:this._value(),preAddEntity:this.akitaPreAddEntity.bind(this),entities:t,idKey:this.idKey,options:e});i&&(U("Add Entity"),i.newState.loading=e.loading,this._setState(()=>i.newState),this.hasInitialUIState()&&this.handleUICreation(true),this.entityActions.next({type:Ue.Add,ids:i.newIds}));}update(n,e){if(we(e)){super.update(n);return}let t=[];if(b(n)?t=this.ids.filter(a=>n(this.entities[a])):t=H(n)?this.ids:L(n),Me(t))return;U("Update Entity",t);let i;this._setState(a=>cn({idKey:this.idKey,ids:t,preUpdateEntity:this.akitaPreUpdateEntity.bind(this),state:a,newStateOrFn:e,producerFn:this._producerFn,onEntityIdChanges:(o,l)=>{i={oldId:o,newId:l},this.entityIdChanges.next(x$3(w$3({},i),{pending:true}));}})),i&&this.entityIdChanges.next(x$3(w$3({},i),{pending:false})),this.entityActions.next({type:Ue.Update,ids:t});}upsert(n,e,t,i={}){let a=L(n),o=x=>y=>Se(this.entities,y)===x,l=b(t)?i.baseClass:t?t.baseClass:void 0,d=b(l),u=a.filter(o(true)),k=a.filter(o(false)).map(x=>{let y=typeof e=="function"?e({}):e,w=b(t)?t(x,y):y,D=x$3(w$3({},w),{[this.idKey]:x});return d?new l(D):D});this.update(u,e),this.add(k),ce("Upsert Entity");}upsertMany(n,e={}){let t=[],i=[],a={};for(let o of n){let l=this.akitaPreCheckEntity(o),d=l[this.idKey];if(Se(this.entities,d)){let u=this._value().entities[d],k=w$3(w$3({},this._value().entities[d]),l),x=e.baseClass?new e.baseClass(k):k,y=this.akitaPreUpdateEntity(u,x),w=y[this.idKey];a[w]=y,i.push(w);}else {let u=e.baseClass?new e.baseClass(l):l,k=this.akitaPreAddEntity(u),x=k[this.idKey];t.push(x),a[x]=k;}}ce("Upsert Many"),this._setState(o=>x$3(w$3({},o),{ids:t.length?[...o.ids,...t]:o.ids,entities:w$3(w$3({},o.entities),a),loading:!!e.loading})),i.length&&this.entityActions.next({type:Ue.Update,ids:i}),t.length&&this.entityActions.next({type:Ue.Add,ids:t}),t.length&&this.hasUIStore()&&this.handleUICreation(true);}replace(n,e){let t=L(n);if(Me(t))return;let i={};for(let a of t)i[a]=x$3(w$3({},e),{[this.idKey]:a});U("Replace Entity",n),this._setState(a=>x$3(w$3({},a),{entities:w$3(w$3({},a.entities),i)}));}move(n,e){let t=this.ids.slice();t.splice(e<0?t.length+e:e,0,t.splice(n,1)[0]),U("Move Entity"),this._setState(i=>x$3(w$3({},i),{entities:w$3({},i.entities),ids:t}));}remove(n){if(Me(this.ids))return;let e=Ve(n),t=[];b(n)?t=this.ids.filter(i=>n(this.entities[i])):t=e?L(n):this.ids,!Me(t)&&(U("Remove Entity",t),this._setState(i=>nn({state:i,ids:t})),e||this.setHasCache(false),this.handleUIRemove(t),this.entityActions.next({type:Ue.Remove,ids:t}));}updateActive(n){let e=L(this.active);U("Update Active",e),this.update(e,n);}setActive(n){let e=en(n,this.ids,this.active);e!==void 0&&(U("Set Active",e),this._setActive(e));}addActive(n){let e=L(n);Me(e)||e.every(i=>this.active.indexOf(i)>-1)||(U("Add Active",n),this._setState(i=>{let a=Array.from(new Set([...i.active,...e]));return x$3(w$3({},i),{active:a})}));}removeActive(n){let e=L(n);Me(e)||!e.some(i=>this.active.indexOf(i)>-1)||(U("Remove Active",n),this._setState(i=>x$3(w$3({},i),{active:Array.isArray(i.active)?i.active.filter(a=>e.indexOf(a)===-1):null})));}toggleActive(n){let e=L(n),t=o=>l=>this.active.includes(l)===o,i=e.filter(t(true)),a=e.filter(t(false));this.removeActive(i),this.addActive(a),ce("Toggle Active");}createUIStore(n={},e={}){let t={name:`UI/${this.storeName}`,idKey:this.idKey};return this.ui=new Yt(n,w$3(w$3({},t),e)),this.ui}destroy(){super.destroy(),this.ui instanceof r&&this.ui.destroy(),this.entityActions.complete();}akitaPreUpdateEntity(n,e){return e}akitaPreAddEntity(n){return n}akitaPreCheckEntity(n){return n}get ids(){return this._value().ids}get entities(){return this._value().entities}get active(){return this._value().active}_setActive(n){this._setState(e=>x$3(w$3({},e),{active:n}));}handleUICreation(n=false){let e=this.ids,t=b(this.ui._akitaCreateEntityFn),i,a=o=>{let l=this.entities[o],d=t?this.ui._akitaCreateEntityFn(l):this.ui._akitaCreateEntityFn;return w$3({[this.idKey]:l[this.idKey]},d)};n?i=this.ids.filter(o=>we(this.ui.entities[o])).map(a):i=e.map(a),n?this.ui.add(i):this.ui.set(i);}hasInitialUIState(){return this.hasUIStore()&&we(this.ui._akitaCreateEntityFn)===false}handleUIRemove(n){this.hasUIStore()&&this.ui.remove(n);}hasUIStore(){return this.ui instanceof Yt}};uT([gi(),dT("design:type",Function),dT("design:paramtypes",[Object,Object,Object,Object]),dT("design:returntype",void 0)],it.prototype,"upsert",null);uT([gi(),dT("design:type",Function),dT("design:paramtypes",[typeof(va=typeof T<"u"&&T)=="function"?va:Object]),dT("design:returntype",void 0)],it.prototype,"toggleActive",null);var Yt=class extends it{constructor(n={},e={}){super(n,e);}setInitialEntityState(n){this._akitaCreateEntityFn=n;}};function dn(){return Xt$3(r=>r!=null)}function wa(r){return function(n,e){let t=b(r[0]);return r.some(i=>t?i(n)!==i(e):n[i]!==e[i])===false}}function nt(r){return typeof r=="string"}var un="akitaQueryConfig";var rt=class{constructor(n){this.store=n,this.__store__=n,($i[n.storeName]=this);}select(n){let e;if(b(n))e=n;else if(nt(n))e=t=>t[n];else {if(Array.isArray(n))return this.store._select(t=>t).pipe(Fl(wa(n)),Me$3(t=>b(n[0])?n.map(i=>i(t)):n.reduce((i,a)=>(i[a]=t[a],i),{})));e=t=>t;}return this.store._select(e)}selectLoading(){return this.select(n=>n.loading)}selectError(){return this.select(n=>n.error)}getValue(){return this.store._value()}selectHasCache(){return this.store._cache().asObservable()}getHasCache(){return this.store._cache().value}get config(){return this.constructor[un]}};function at(r,n){return n.split(".").length===1?r:n.split(".").slice(1).join(".").split(".").reduce((t,i)=>t&&t[i],r)}function At(r,n,e,t=false){let i=n.split(".");if(i.length===1)return w$3(w$3({},r),e);r=w$3({},r);let a=i.length-2;return n.split(".").slice(1).reduce((l,d,u)=>u!==a?(l[d]=w$3({},l[d]),l&&l[d]):(l[d]=t||Array.isArray(l[d])||!ke(l[d])?e:w$3(w$3({},l[d]),e),l&&l[d]),r),r}var Ca=false,Za=new On$3(1);function Ja(){return Ca}function eo(r){return r&&b(r.then)}function Kt(r){return eo(r)||lg(r)?Se$4(r):ag(r)}function pn(r){let n={key:"AkitaStores",enableInNonBrowser:false,storage:Gi()?localStorage:r.storage,deserialize:JSON.parse,serialize:JSON.stringify,include:[],select:[],persistOnDestroy:false,preStorageUpdate:function(S,v){return v},preStoreUpdate:function(S,v){return v},skipStorageUpdate:Ja,preStorageUpdateOperator:()=>S=>S},{storage:e,enableInNonBrowser:t,deserialize:i,serialize:a,include:o,select:l,key:d,preStorageUpdate:u,persistOnDestroy:k,preStorageUpdateOperator:x,preStoreUpdate:y,skipStorageUpdate:w}=Object.assign({},n,r);if(zt&&!t||!e)return;let D=o.length>0,X=l.length>0,de,fe;D&&(de=o.reduce((S,v)=>{if(b(v))S.fns.push(v);else {let Ee=v.split(".")[0];S[Ee]=v;}return S},{fns:[]})),X&&(fe=l.reduce((S,v)=>(S[v.storeName]=v,S),{}));let Z={},Dt={},ot=[],st=[];function Ot(S){Kt(S).subscribe(()=>{let v=st.shift();v&&Ot(v);});}let Ha=Gi()&&e===localStorage||ma()&&e===sessionStorage;return Kt(e.getItem(d)).subscribe(S=>{let v=ke(S)?S:i(S||"{}");function Ee(f){v.$cache=w$3(w$3({},v.$cache||{}),f),v=Object.assign({},v,Dt),st.push(e.setItem(d,Ha?a(v):v)),Ot(st.shift());}function lt(f,ct){Z[f]=I[f]._select(ae=>at(ae,ct)).pipe(Hl(1),Me$3(ae=>X&&fe[f]?fe[f](ae):ae),Xt$3(()=>w()===false),x()).subscribe(ae=>{Dt[f]=u(f,ae),Promise.resolve().then(()=>Ee({[f]:I[f]._cache().getValue()}));});}function Di(f,ct,ae){if(f in v){U("@PersistState"),ct._setState($t=>At($t,ae,y(f,v[f],$t)));let Sn=v.$cache?v.$cache[f]:false;I[f].setHasCache(Sn,{restartTTL:true});}}ot.push(jt.subscribe(f=>{Z[f]&&(k===false&&Ee({[f]:false}),Z[f].unsubscribe(),delete Z[f]);})),ot.push(Je.subscribe(f=>{if(f==="router")return;let ct=I[f];if(D){let ae=de[f];if(!ae)if(de.fns.some($t=>$t(f)))ae=f;else return;Di(f,ct,ae),lt(f,ae);}else Di(f,ct,f),lt(f,f);})),Za.next(true);}),{destroy(){ot.forEach(S=>S.unsubscribe());for(let S=0,v=Object.keys(Z);S<v.length;S++){let Ee=v[S];Z[Ee].unsubscribe();}Z={};},clear(){e.clear();},clearStore(S){if(H(S)){Kt(e.setItem(d,"{}")).subscribe();return}let v=e.getItem(d);Kt(v).subscribe(Ee=>{let lt=i(Ee||"{}");lt[S]&&(delete lt[S],Kt(e.setItem(d,a(lt))).subscribe());});}}}var ze=class{constructor(n,e){this.query=n,e&&e.resetFn&&Mt().resettable;}getQuery(){return this.query}getStore(){return this.getQuery().__store__}isEntityBased(n){return Pe(n)}selectSource(n,e){return this.isEntityBased(n)?this.getQuery().selectEntity(n).pipe(dn()):e?this.getQuery().select(t=>at(t,this.withStoreName(e))):this.getQuery().select()}getSource(n,e){if(this.isEntityBased(n))return this.getQuery().getEntity(n);let t=this.getQuery().getValue();return e?at(t,this.withStoreName(e)):t}withStoreName(n){return `${this.storeName}.${n}`}get storeName(){return this.getStore().storeName}updateStore(n,e,t,i=false){if(this.isEntityBased(e)){let a=this.getStore();i?a.replace(e,n):a.update(e,n);}else {if(t){this.getStore()._setState(o=>At(o,this.withStoreName(t),n,true));return}let a=i?n:o=>w$3(w$3({},o),n);this.getStore()._setState(a);}}onReset(n){let e=this.getStore().reset;this.getStore().reset=(...t)=>{setTimeout(()=>{e.apply(this.getStore(),t),n();});};}};var ro={pagesControls:false,range:false,startWith:1,cacheTimeout:void 0,clearStoreWithCache:true},_i=class extends ze{constructor(n,e={}){super(n,{resetFn:()=>{this.initial=false,this.destroy({clearCache:true,currentPage:1});}}),this.query=n,this.config=e,this.metadata=new Map,this.pages=new Map,this.pagination={currentPage:1,perPage:0,total:0,lastPage:0,data:[]},this.initial=true,this.isLoading$=this.query.selectLoading().pipe(Ll$1(0)),this.config=w$3(w$3({},ro),e);let{startWith:t,cacheTimeout:i}=this.config;this.page=new Rn$3(t),lg(i)&&(this.clearCacheSubscription=i.subscribe(()=>this.clearCache()));}get pageChanges(){return this.page.asObservable()}get currentPage(){return this.pagination.currentPage}get isFirst(){return this.currentPage===1}get isLast(){return this.currentPage===this.pagination.lastPage}withControls(){return this.config.pagesControls=true,this}withRange(){return this.config.range=true,this}setLoading(n=true){this.getStore().setLoading(n);}update(n){this.pagination=n,this.addPage(n.data);}addPage(n){this.pages.set(this.currentPage,{ids:n.map(e=>e[this.getStore().idKey])}),this.getStore().upsertMany(n);}clearCache(n={}){this.initial||(ce("@Pagination - Clear Cache"),n.clearStore!==false&&(this.config.clearStoreWithCache||n.clearStore)&&this.getStore().remove(),this.pages=new Map,this.metadata=new Map),this.initial=false;}clearPage(n){this.pages.delete(n);}destroy({clearCache:n,currentPage:e}={}){this.clearCacheSubscription&&this.clearCacheSubscription.unsubscribe(),n&&this.clearCache(),we(e)||this.setPage(e),this.initial=true;}isPageActive(n){return this.currentPage===n}setPage(n){(n!==this.currentPage||!this.hasPage(n))&&this.page.next(this.pagination.currentPage=n);}nextPage(){this.currentPage!==this.pagination.lastPage&&this.setPage(this.pagination.currentPage+1);}prevPage(){this.pagination.currentPage>1&&this.setPage(this.pagination.currentPage-1);}setLastPage(){this.setPage(this.pagination.lastPage);}setFirstPage(){this.setPage(1);}hasPage(n){return this.pages.has(n)}getPage(n){let e=this.pagination.currentPage;return this.hasPage(e)?this.selectPage(e):(this.setLoading(true),Se$4(n()).pipe(vl(t=>(e=t.currentPage,qt(()=>{this.setLoading(false),this.update(t);}),this.selectPage(e)))))}getQuery(){return this.query}refreshCurrentPage(){H(this.currentPage)===false&&(this.clearPage(this.currentPage),this.setPage(this.currentPage));}getFrom(){return this.isFirst?1:(this.currentPage-1)*this.pagination.perPage+1}getTo(){return this.isLast?this.pagination.total:this.currentPage*this.pagination.perPage}selectPage(n){return this.query.selectAll({asObject:true}).pipe(It$5(1),Me$3(e=>{let t=x$3(w$3({},this.pagination),{data:this.pages.get(n).ids.map(o=>e[o])}),{range:i,pagesControls:a}=this.config;return isNaN(this.pagination.total)&&(t.lastPage===1?t.total=t.data?t.data.length:0:t.total=t.perPage*t.lastPage,this.pagination.total=t.total),i&&(t.from=this.getFrom(),t.to=this.getTo()),a&&(t.pageControls=ao(this.pagination.total,this.pagination.perPage)),t}))}};uT([Ki("@Pagination - New Page"),dT("design:type",Function),dT("design:paramtypes",[Object]),dT("design:returntype",void 0)],_i.prototype,"update",null);function ao(r,n){let e=Math.ceil(r/n),t=[];for(let i=0;i<e;i++)t.push(i+1);return t}var hn=(function(r){return r.Update="UPDATE",r})(hn||{});({[hn.Update]:"update"});var Oe=(function(r){return r.Update="UPDATE",r.AddEntities="ADD_ENTITIES",r.SetEntities="SET_ENTITIES",r.UpdateEntities="UPDATE_ENTITIES",r.RemoveEntities="REMOVE_ENTITIES",r.UpsertEntities="UPSERT_ENTITIES",r.UpsertManyEntities="UPSERT_MANY_ENTITIES",r})(Oe||{});({[Oe.Update]:"update",[Oe.AddEntities]:"add",[Oe.SetEntities]:"set",[Oe.UpdateEntities]:"update",[Oe.RemoveEntities]:"remove",[Oe.UpsertEntities]:"upsert",[Oe.UpsertManyEntities]:"upsertMany"});var mo=["trigger"],po=["panel"],ho=[[["mat-select-trigger"]],"*"],fo=["mat-select-trigger","*"];function go(r,n){if(r&1&&(wi$1(0,"span",4),FD(1),Hc()),r&2){let e=aD();Hv(),Dh(e.placeholder);}}function _o(r,n){r&1&&uD(0);}function yo(r,n){if(r&1&&(wi$1(0,"span",11),FD(1),Hc()),r&2){let e=aD(2);Hv(),Dh(e.triggerValue);}}function bo(r,n){if(r&1&&(wi$1(0,"span",5),ZE(1,_o,1,0)(2,yo,2,1,"span",11),Hc()),r&2){let e=aD();Hv(),YE(e.customTrigger?1:2);}}function vo(r,n){if(r&1){let e=iD();wi$1(0,"div",12,1),ih("keydown",function(i){xu$1(e);let a=aD();return Au(a._handleKeydown(i))}),uD(2,1),Hc();}if(r&2){let e=aD();_D(e.panelClass),gh("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._parentFormField?.color==="primary")("mat-accent",e._parentFormField?.color==="accent")("mat-warn",e._parentFormField?.color==="warn")("mat-undefined",!e._parentFormField?.color),Kp("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby());}}var wo=new S$1("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let r=T$3(le$2);return ()=>lr$2(r)}}),xo=new S$1("MAT_SELECT_CONFIG"),Co=new S$1("MatSelectTrigger"),fn=class{source;value;constructor(n,e){this.source=n,this.value=e;}},ka=(()=>{class r{_viewportRuler=T$3(oe);_changeDetectorRef=T$3(kF);_elementRef=T$3(Tr$2);_dir=T$3(pt$2,{optional:true});_idGenerator=T$3(ut$3);_renderer=T$3(CI);_parentFormField=T$3(va$1,{optional:true});ngControl=T$3(Ht$2,{self:true,optional:true});_liveAnnouncer=T$3(Lr);_defaultOptions=T$3(xo,{optional:true});_animationsDisabled=gt$3();_popoverLocation;_initialized=new ne$2;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=yt$2(e,this.options,this.optionGroups),o=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=wt$3(o.offsetTop,o.offsetHeight,i.scrollTop,i.offsetHeight);}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0);}_getChangeEvent(e){return new fn(this,e)}_scrollStrategyFactory=T$3(wo);_panelOpen=false;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new ne$2;_errorStateTracker;stateChanges=new ne$2;disableAutomaticLabeling=true;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=false;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=false;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e);}_disableRipple=Fe$3(false);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next();}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Pn$1.required)??false}set required(e){this._required=e,this.stateChanges.next();}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e;}_multiple=false;disableOptionCentering=this._defaultOptions?.disableOptionCentering??false;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection();}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e);}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next();}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??false;optionSelectionChanges=Ig(()=>{let e=this.options;return e?e.changes.pipe(Bl(e),vl(()=>Dg(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(vl(()=>this.optionSelectionChanges))});openedChange=new qe$3;_openedStream=this.openedChange.pipe(Xt$3(e=>e),Me$3(()=>{}));_closedStream=this.openedChange.pipe(Xt$3(e=>!e),Me$3(()=>{}));selectionChange=new qe$3;valueChange=new qe$3;constructor(){let e=T$3($u),t=T$3(vs,{optional:true}),i=T$3(Ds,{optional:true}),a=T$3(new Fh("tabindex"),{optional:true}),o=T$3(Qn$1,{optional:true});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new tr$2(e,this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=o?.usePopover===false?null:"inline",this.id=this.id;}ngOnInit(){this._selectionModel=new B$3(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Rg(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges());});}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Rg(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect());}),this.options.changes.pipe(Bl(null),Rg(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection();});}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute("aria-labelledby",e):i.removeAttribute("aria-labelledby");}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState());}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass));}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete();}toggle(){this.panelOpen?this.close():this.open();}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=true,this._overlayDir.positionChange.pipe(It$5(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled();}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(true)));}close(){this._panelOpen&&(this._panelOpen=false,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(false)));}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0;};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",a=>{a.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay());}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay();},200);e.classList.add("mat-select-panel-exit");}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck();}writeValue(e){this._assignValue(e);}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next();}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return "";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState();}_isRtl(){return this._dir?this._dir.value==="rtl":false}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e));}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,o=this._keyManager;if(!o.isTyping()&&a&&!De$2(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;o.onKeydown(e);let d=this.selected;d&&l!==d&&this._liveAnnouncer.announce(d.viewValue,1e4);}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,o=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!o&&(i===13||i===32)&&t.activeItem&&!De$2(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!o&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(d=>!d.disabled&&!d.selected);this.options.forEach(d=>{d.disabled||(l?d.select():d.deselect());});}else {let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction();}}_handleOverlayKeydown(e){e.keyCode===27&&!De$2(e)&&(e.preventDefault(),this.close());}_onFocus(){this.disabled||(this._focused=true,this.stateChanges.next());}_onBlur(){this._focused=false,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next());}get empty(){return !this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next();});}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else {let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1);}this._changeDetectorRef.markForCheck();}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return  false;try{return (i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch(a){return  false}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,true):false}_skipPredicate=e=>this.panelOpen?false:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Zn$1?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck();}_initKeyManager(){this._keyManager=new xn$2(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close());}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction();});}_resetOptions(){let e=Dg(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Rg(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus());}),Dg(...this.options.map(t=>t._stateChanges)).pipe(Rg(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next();});}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next();}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next();}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck();}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e);}else this._keyManager.setActiveItem(this._selectionModel.selected[0]);}_canOpen(){return !this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e);}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby");}onContainerClick(e){let t=H$2(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open());}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-select"]],contentQueries:function(t,i,a){if(t&1&&ch(a,Co,5)(a,kt$2,5)(a,dt$2,5),t&2){let o;fD(o=pD())&&(i.customTrigger=o.first),fD(o=pD())&&(i.options=o),fD(o=pD())&&(i.optionGroups=o);}},viewQuery:function(t,i){if(t&1&&lh(mo,5)(po,5)(Vs,5),t&2){let a;fD(a=pD())&&(i.trigger=a.first),fD(a=pD())&&(i.panel=a.first),fD(a=pD())&&(i._overlayDir=a.first);}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,i){t&1&&ih("keydown",function(o){return i._handleKeydown(o)})("focus",function(){return i._onFocus()})("blur",function(){return i._onBlur()}),t&2&&(Kp("id",i.id)("tabindex",i.disabled?-1:i.tabIndex)("aria-controls",i.panelOpen?i.id+"-panel":null)("aria-expanded",i.panelOpen)("aria-label",i.ariaLabel||null)("aria-required",i.required.toString())("aria-disabled",i.disabled.toString())("aria-invalid",i.errorState)("aria-activedescendant",i._getAriaActiveDescendant()),gh("mat-mdc-select-disabled",i.disabled)("mat-mdc-select-invalid",i.errorState)("mat-mdc-select-required",i.required)("mat-mdc-select-empty",i.empty)("mat-mdc-select-multiple",i.multiple)("mat-select-open",i.panelOpen));},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",PF],disableRipple:[2,"disableRipple","disableRipple",PF],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:LF(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",PF],placeholder:"placeholder",required:[2,"required","required",PF],multiple:[2,"multiple","multiple",PF],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",PF],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",LF],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",PF]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[zD([{provide:_a$1,useExisting:r},{provide:mt$2,useExisting:r}]),Pm],ngContentSelectors:fo,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,i){if(t&1&&(lD(ho),wi$1(0,"div",2,0),ih("click",function(){return i.open()}),wi$1(3,"div",3),ZE(4,go,2,1,"span",4)(5,bo,3,1,"span",5),Hc(),wi$1(6,"div",6)(7,"div",7),Uu(),wi$1(8,"svg",8),Xp(9,"path",9),Hc()()()(),Gp(10,vo,3,16,"ng-template",10),ih("detach",function(){return i.close()})("backdropClick",function(){return i.close()})("overlayKeydown",function(o){return i._handleOverlayKeydown(o)})),t&2){let a=gD(1);Hv(3),Kp("id",i._valueId),Hv(),YE(i.empty?4:5),Hv(6),Jp("cdkConnectedOverlayDisableClose",true)("cdkConnectedOverlayPanelClass",i._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",i._scrollStrategy)("cdkConnectedOverlayOrigin",i._preferredOverlayOrigin||a)("cdkConnectedOverlayPositions",i._positions)("cdkConnectedOverlayWidth",i._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",true)("cdkConnectedOverlayUsePopover",i._popoverLocation);}},dependencies:[Zn$1,Vs],styles:[`@keyframes _mat-select-enter {
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
`],encapsulation:2})}return r})();function So(){return {artPieces:[],lastArtPiecesUpdate:void 0,imageCache:[]}}var It=class Mi extends je{constructor(){super(So());}static{this.\u0275fac=function(e){return new(e||Mi)};}static{this.\u0275prov=re$3({token:Mi,factory:Mi.\u0275fac,providedIn:"root"});}};It=uT([sn({name:"session"})],It);var ki=(()=>{class r extends rt{constructor(){super(T$3(It)),this.getArtPiecesObservable=this.select(({artPieces:e})=>[...e]);}get selectArtPieces(){return this.getValue().artPieces}get selectLastArtPiecesUpdate(){return this.getValue().lastArtPiecesUpdate}getThumbnailByTokenId(e){return this.getValue().imageCache.find(t=>t?.tokenId===e)}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275prov=re$3({token:r,factory:r.\u0275fac,providedIn:"root"});}}return r})();var Ea=(r,n)=>n.label;function Mo(r,n){if(r&1&&(wi$1(0,"mat-chip",1)(1,"a",7),FD(2),Hc()()),r&2){let e=n.$implicit;Hv(),Jp("routerLink",e.url)("queryParams",e.queryParams),Kp("aria-label",e.queryParams),Hv(),qc(" ",e.label," ");}}function ko(r,n){if(r&1&&(wi$1(0,"mat-option",5),FD(1),Hc()),r&2){let e=n.$implicit;Jp("value",e),Hv(),qc(" ",e," ");}}function Eo(r,n){if(r&1){let e=iD();wi$1(0,"mat-chip",8),ei$2("year-chip-leave"),Xo$2("year-chip-enter"),ih("removed",function(){let i=xu$1(e).$implicit,a=aD(2);return Au(a.removeYearFilter(i.label))}),wi$1(1,"a",7),FD(2),Hc(),wi$1(3,"button",9)(4,"mat-icon"),FD(5,"cancel"),Hc()()();}if(r&2){let e=n.$implicit;Jp("removable",true),Hv(),Jp("routerLink",e.url)("queryParams",e.queryParams),Kp("aria-label",e.queryParams),Hv(),qc(" ",e.label," "),Hv(),Kp("aria-label","Remove year "+e.label);}}function Ao(r,n){if(r&1&&(wi$1(0,"nav",0)(1,"mat-chip-listbox")(2,"mat-chip",1)(3,"a",2)(4,"mat-icon"),FD(5,"home"),Hc()()(),JE(6,Mo,3,4,"mat-chip",1,Ea),wi$1(8,"mat-form-field",3)(9,"mat-label"),FD(10),KD(11,"translate"),Hc(),wi$1(12,"mat-select",4),JE(13,ko,2,2,"mat-option",5,KE),Hc(),xI(),Hc(),JE(15,Eo,6,6,"mat-chip",6,Ea),Hc()()),r&2){let e=aD();Hv(6),XE(e.routeBreadcrumbs()),Hv(4),Dh(XD(11,2,"selectYear")),Hv(2),Jp("formField",e.yearPickerForm.newYear),RI(),Hv(),XE(e.validYears),Hv(2),XE(e.yearBreadcrumbs());}}var Aa=(()=>{class r{constructor(){this.artworkService=T$3(Rt),this.router=T$3(te),this.activatedRoute=T$3(Q$1),this.translateService=T$3(Nt$3),this.sessionQuery=T$3(ki),this.selectedYears=[],this.routeBreadcrumbs=dt$3(()=>this.breadcrumbs().filter(e=>!e.isYear)),this.yearBreadcrumbs=dt$3(()=>this.breadcrumbs().filter(e=>!!e.isYear)),this.yearPickerModel=Fe$3({newYear:null}),this.yearPickerForm=zt$1(this.yearPickerModel),this.breadcrumbs=Fe$3(this.buildBreadCrumb(this.activatedRoute.root)),pa$2(()=>{let e=this.yearPickerForm.newYear().value();e!==null&&ae$2(()=>this.handleYearChange(e));});}ngOnInit(){this.router.events.pipe(Xt$3(e=>e instanceof k),Fl()).subscribe(()=>{this.selectedYears=this.extractSelectedYears(),this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute.root));});}handleYearChange(e){this.validYears.includes(e)&&!this.selectedYears.includes(e)&&(this.selectedYears.push(e),this.updateQueryParams()),setTimeout(()=>this.yearPickerModel.set({newYear:null}));}removeYearFilter(e){this.selectedYears=this.selectedYears.filter(t=>t!==Number(e)),this.updateQueryParams();}get validYears(){return [...this.artworkService.getAvailableYears()].filter(e=>!this.selectedYears.includes(e))}updateQueryParams(){let e={years:this.selectedYears.length?this.selectedYears.join(","):null};this.router.navigate([],{queryParams:e});}extractSelectedYears(){let e=this.activatedRoute.snapshot.queryParamMap.get("years");return e?e.split(",").map(t=>Number(t)):[]}buildBreadCrumb(e,t="",i=[]){let a=e.routeConfig&&e.routeConfig.data?e.routeConfig.data.breadcrumb:"",o=e.routeConfig&&e.routeConfig.data?e.routeConfig.path:"",l=o?o.split("/").pop():"";if(l.startsWith(":")&&e.snapshot){let y=l.split(":")[1],w=e.snapshot.params[y];o=o.replace(l,w),y==="id"?a=this.extractNameFromId(w)||w:a=w;}let u=o?`${t}/${o}`:t,k={label:a?this.translateService.instant(a.toLowerCase()):"",url:u,queryParams:{years:[]}},x=a?[...i,k]:[...i];if(e.firstChild)return this.buildBreadCrumb(e.firstChild,u,x);{let y=e.snapshot.queryParamMap.get("years");y&&y.split(",").forEach(D=>{x.push({label:D,url:u,queryParams:{years:D},isYear:true});});}return x}extractNameFromId(e){return this.artworkService.getNftById(e,this.sessionQuery.selectArtPieces)?.name||null}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-breadcrumb"]],decls:1,vars:1,consts:[["aria-label","Breadcrumb",1,"container"],["color","primary"],["routerLink","/","routerLinkActive","router-link-active","aria-label","Home","matLine","",1,"link-as-text"],["appearance","outline","subscriptSizing","dynamic",1,"small-input"],["aria-label","Select year",3,"formField"],[3,"value"],["color","primary",3,"removable"],["routerLinkActive","router-link-active","matLine","",1,"link-as-text",3,"routerLink","queryParams"],["color","primary",3,"removed","removable"],["matChipRemove",""]],template:function(t,i){t&1&&ZE(0,Ao,17,4,"nav",0),t&2&&YE(i.breadcrumbs().length?0:-1);},dependencies:[zi$1,q$1,wt$1,Ut$1,_o$1,Mt$1,wa$1,ka,Jr,kt$2,Mn$1,iu],styles:[".small-input[_ngcontent-%COMP%]{width:10.8rem;margin-left:.8rem;align-self:flex-start;margin-top:.25rem}.link-as-text[_ngcontent-%COMP%]{all:unset;display:flex;align-items:center;color:inherit;text-decoration:none;cursor:text}@keyframes _ngcontent-%COMP%_year-chip-enter-anim{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}@keyframes _ngcontent-%COMP%_year-chip-leave-anim{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85)}}.year-chip-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-enter-anim .18s ease-out}.year-chip-leave[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-leave-anim .15s ease-in}"]});}}return r})();function Io(r,n){if(r&1){let e=iD();wi$1(0,"button",1),ih("click",function(){xu$1(e);let i=aD();return Au(i.handleClick())}),wi$1(1,"mat-icon"),FD(2,"share"),Hc()();}}var Ia=(()=>{class r{constructor(){this.canShare=typeof navigator.share=="function";}handleClick(){if(this.canShare){let e={title:"Juanma Moreno S\xE1nchez",text:"Contemporary Art",url:window.location.href};navigator.share(e);}}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-share-button"]],decls:1,vars:1,consts:[["aria-label","share","mat-mini-fab","","color","primary",1,"share-button"],["aria-label","share","mat-mini-fab","","color","primary",1,"share-button",3,"click"]],template:function(t,i){t&1&&ZE(0,Io,3,0,"button",0),t&2&&YE(i.canShare?0:-1);},dependencies:[Cu,Mt$1],styles:[".share-button[_ngcontent-%COMP%]{position:fixed;bottom:1.25rem;left:.25rem;z-index:9999}"]});}}return r})();var To=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],Po=["mat-icon, [matMenuItemIcon]","*"];function Do(r,n){r&1&&(Uu(),wi$1(0,"svg",2),Xp(1,"polygon",3),Hc());}var Oo=["*"];function Fo(r,n){if(r&1){let e=iD();Bc(0,"div",0),sh("click",function(){xu$1(e);let i=aD();return Au(i.closed.emit("click"))})("animationstart",function(i){xu$1(e);let a=aD();return Au(a._onAnimationStart(i.animationName))})("animationend",function(i){xu$1(e);let a=aD();return Au(a._onAnimationDone(i.animationName))})("animationcancel",function(i){xu$1(e);let a=aD();return Au(a._onAnimationDone(i.animationName))}),Bc(1,"div",1),uD(2),$c()();}if(r&2){let e=aD();_D(e._classList),gh("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),rh("id",e.panelId),Kp("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null);}}var bn=new S$1("MAT_MENU_PANEL"),Wt=(()=>{class r{_elementRef=T$3(Tr$2);_document=T$3(ir$3);_focusMonitor=T$3(yn$2);_parentMenu=T$3(bn,{optional:true});_changeDetectorRef=T$3(kF);role="menuitem";disabled=false;disableRipple=false;_hovered=new ne$2;_focused=new ne$2;_highlighted=false;_triggersSubmenu=false;constructor(){T$3(K$4).load(yo$2),this._parentMenu?.addItem?.(this);}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this);}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,false);}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete();}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}_handleMouseEnter(){this._hovered.next(this);}getLabel(){let e=this._elementRef.nativeElement.cloneNode(true),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck();}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck();}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&ih("click",function(o){return i._checkDisabled(o)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(Kp("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),gh("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu));},inputs:{role:"role",disabled:[2,"disabled","disabled",PF],disableRipple:[2,"disableRipple","disableRipple",PF]},exportAs:["matMenuItem"],ngContentSelectors:Po,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(lD(To),uD(0),wi$1(1,"span",0),uD(2,1),Hc(),Xp(3,"div",1),ZE(4,Do,2,0,":svg:svg",2)),t&2&&(Hv(3),Jp("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),Hv(),YE(i._triggersSubmenu?4:-1));},dependencies:[Xc],encapsulation:2})}return r})();var Ro=new S$1("MatMenuContent");var Bo=new S$1("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:false,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),yn="_mat-menu-enter",Ei="_mat-menu-exit",Pt=(()=>{class r{_elementRef=T$3(Tr$2);_changeDetectorRef=T$3(kF);_injector=T$3(le$2);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=gt$3();_allItems;_directDescendantItems=new si$1;_classList={};_panelAnimationState="void";_animationDone=new ne$2;_isAnimating=Fe$3(false);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses();}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses();}templateRef;items;lazyContent;overlapTrigger=false;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,i=w$3({},this._classList);t&&t.length&&t.split(" ").forEach(a=>{i[a]=false;}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(a=>{i[a]=true;}),this._elementRef.nativeElement.className=""),this._classList=i;}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e;}closed=new qe$3;close=this.closed;panelId=T$3(ut$3).getId("mat-menu-panel-");constructor(){let e=T$3(Bo);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop;}ngOnInit(){this.setPositionClasses();}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Cn$2(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Bl(this._directDescendantItems),vl(e=>Dg(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),a=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[a]&&!i[a].disabled?t.setActiveItem(a):t.setNextItemActive();}});}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout);}_hovered(){return this._directDescendantItems.changes.pipe(Bl(this._directDescendantItems),vl(t=>Dg(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:De$2(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Wf(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus();}},{injector:this._injector});}resetActiveItem(){this._keyManager.setActiveItem(-1);}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=x$3(w$3({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck();}_onAnimationDone(e){let t=e===Ei;(t||e===yn)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(false));}_onAnimationStart(e){(e===yn||e===Ei)&&this._isAnimating.set(true);}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0);}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Ei),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?yn:Ei);}),this._changeDetectorRef.markForCheck();}_updateDirectDescendants(){this._allItems.changes.pipe(Bl(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges();});}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-menu"]],contentQueries:function(t,i,a){if(t&1&&ch(a,Ro,5)(a,Wt,5)(a,Wt,4),t&2){let o;fD(o=pD())&&(i.lazyContent=o.first),fD(o=pD())&&(i._allItems=o),fD(o=pD())&&(i.items=o);}},viewQuery:function(t,i){if(t&1&&lh(yr$2,5),t&2){let a;fD(a=pD())&&(i.templateRef=a.first);}},hostVars:3,hostBindings:function(t,i){t&2&&Kp("aria-label",null)("aria-labelledby",null)("aria-describedby",null);},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",PF],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:PF(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[zD([{provide:bn,useExisting:r}])],ngContentSelectors:Oo,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(lD(),zp(0,Fo,3,12,"ng-template"));},styles:[`mat-menu {
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
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
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
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
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
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
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
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
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
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
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
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
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
`],encapsulation:2})}return r})(),No=new S$1("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let r=T$3(le$2);return ()=>lr$2(r)}});var Tt=new WeakMap,Lo=(()=>{class r{_canHaveBackdrop;_element=T$3(Tr$2);_viewContainerRef=T$3(Li$3);_menuItemInstance=T$3(Wt,{optional:true,self:true});_dir=T$3(pt$2,{optional:true});_focusMonitor=T$3(yn$2);_ngZone=T$3(ue$1);_injector=T$3(le$2);_scrollStrategy=T$3(No);_changeDetectorRef=T$3(kF);_animationsDisabled=gt$3();_portal;_overlayRef=null;_menuOpen=false;_closingActionsSubscription=G$2.EMPTY;_menuCloseSubscription=G$2.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t);})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()));}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=T$3(bn,{optional:true});this._parentMaterialMenu=t instanceof Pt?t:void 0;}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Tt.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null);}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return !!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit();}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let i=Tt.get(t);Tt.set(t,this),i&&i!==this&&i._closeMenu();let a=this._createOverlay(t),o=a.getConfig(),l=o.positionStrategy;this._setPosition(t,l),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??false,a.hasAttached()||(a.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(true),t instanceof Pt&&(t._setIsOpen(true),t._directDescendantItems.changes.pipe(Rg(t.close)).subscribe(()=>{l.withLockedPosition(false).reapplyLastPosition(),l.withLockedPosition(true);}));}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t);}_destroyMenu(e){let t=this._overlayRef,i=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),i instanceof Pt&&this._ownsMenu(i)?(this._pendingRemoval=i._animationDone.pipe(It$5(1)).subscribe(()=>{t.detach(),Tt.has(i)||i.lazyContent?.detach();}),i._setIsOpen(false)):(t.detach(),i?.lazyContent?.detach()),i&&this._ownsMenu(i)&&Tt.delete(i),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(false));}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck());}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=pr$1(this._injector,t),this._overlayRef.keydownEvents().subscribe(i=>{this._menu instanceof Pt&&this._menu._handleKeydown(i);});}return this._overlayRef}_getOverlayConfig(e){return new se$1({positionStrategy:hr$2(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{this._ngZone.run(()=>{let a=i.connectionPair.overlayX==="start"?"after":"before",o=i.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(a,o);});});}_setPosition(e,t){let[i,a]=e.xPosition==="before"?["end","start"]:["start","end"],[o,l]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[d,u]=[o,l],[k,x]=[i,a],y=0;if(this._triggersSubmenu()){if(x=i=e.xPosition==="before"?"start":"end",a=k=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let w=this._parentMaterialMenu.items.first;this._parentInnerPadding=w?w._getHostElement().offsetTop:0;}y=o==="bottom"?this._parentInnerPadding:-this._parentInnerPadding;}}else e.overlapTrigger||(d=o==="top"?"bottom":"top",u=l==="top"?"bottom":"top");t.withPositions([{originX:i,originY:d,overlayX:k,overlayY:o,offsetY:y},{originX:a,originY:d,overlayX:x,overlayY:o,offsetY:y},{originX:i,originY:u,overlayX:k,overlayY:l,offsetY:-y},{originX:a,originY:u,overlayX:x,overlayY:l,offsetY:-y}]);}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:ag(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Xt$3(o=>this._menuOpen&&o!==this._menuItemInstance)):ag();return Dg(e,i,a,t)}_getPortal(e){return (!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new ae$1(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Tt.get(e)===this}_triggerIsAriaDisabled(){return PF(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){jI();};static \u0275dir=CE({type:r})}return r})(),Ta=(()=>{class r extends Lo{_cleanupTouchstart;_hoverSubscription=G$2.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e;}get menu(){return this._menu}set menu(e){this._menu=e;}menuData;restoreFocus=true;menuOpened=new qe$3;onMenuOpen=this.menuOpened;menuClosed=new qe$3;onMenuClose=this.menuClosed;constructor(){super(true);let e=T$3(CI);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Xt$2(t)||(this._openedBy="touch");},{passive:true});}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(true);}closeMenu(){this._closeMenu();}updatePosition(){this._overlayRef?.updatePosition();}ngAfterContentInit(){this._handleHover();}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe();}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){$t$1(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault());}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu());}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu();}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(false));}));}static \u0275fac=function(t){return new(t||r)};static \u0275dir=CE({type:r,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&ih("click",function(o){return i._handleClick(o)})("mousedown",function(o){return i._handleMousedown(o)})("keydown",function(o){return i._handleKeydown(o)}),t&2&&Kp("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu?.panelId:null);},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[Wp]})}return r})();var Pa=["*"],Vo=["content"],Uo=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],jo=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function zo(r,n){if(r&1){let e=iD();wi$1(0,"div",1),ih("click",function(){xu$1(e);let i=aD();return Au(i._onBackdropClicked())}),Hc();}if(r&2){let e=aD();gh("mat-drawer-shown",e._isShowingBackdrop());}}function Ho(r,n){r&1&&(wi$1(0,"mat-drawer-content"),uD(1,2),Hc());}var qo=new S$1("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>false}),Da=new S$1("MAT_DRAWER_CONTAINER"),Gt=(()=>{class r extends As{_platform=T$3(x$1);_changeDetectorRef=T$3(kF);_element=T$3(Tr$2);_ngZone=T$3(ue$1);_isInert=false;_container=T$3(wn);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck());}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(Ll$1(50),It$5(1)).subscribe(()=>this._updateInert());}):this._updateInert();}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let t=this._element.nativeElement;this._isInert=e,e?t.setAttribute("inert","true"):t.removeAttribute("inert");}}_shouldBeHidden(){if(this._platform.isBrowser)return  false;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(r)))(i||r)}})();static \u0275cmp=IE({type:r,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,i){t&2&&(hh("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),gh("mat-drawer-content-hidden",i._shouldBeHidden()));},features:[zD([{provide:As,useExisting:r}]),Wp],ngContentSelectors:Pa,decls:1,vars:0,template:function(t,i){t&1&&(lD(),uD(0));},encapsulation:2})}return r})(),vn=(()=>{class r{_elementRef=T$3(Tr$2);_focusTrapFactory=T$3(Vr);_focusMonitor=T$3(yn$2);_platform=T$3(x$1);_ngZone=T$3(ue$1);_renderer=T$3(CI);_interactivityChecker=T$3(Hi$3);_doc=T$3(ir$3);_container=T$3(Da,{optional:true});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=false;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit());}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next();}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=Ki$2(e);}_disableClose=false;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=Ki$2(e)),this._autoFocus=e;}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(Ki$2(e));}_opened=Fe$3(false);_openedVia=null;_animationStarted=new ne$2;_animationEnd=new ne$2;openedChange=new qe$3(true);_openedStream=this.openedChange.pipe(Xt$3(e=>e),Me$3(()=>{}));openedStart=this._animationStarted.pipe(Xt$3(()=>this.opened),Ki$3(void 0));_closedStream=this.openedChange.pipe(Xt$3(e=>!e),Me$3(()=>{}));closedStart=this._animationStarted.pipe(Xt$3(()=>!this.opened),Ki$3(void 0));_destroyed=new ne$2;onPositionChanged=new qe$3;_content;_modeChanged=new ne$2;_injector=T$3(le$2);_changeDetectorRef=T$3(kF);constructor(){this.openedChange.pipe(Rg(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program");}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return [e.listen(t,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!De$2(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault();});}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened);});}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&(this._interactivityChecker.isFocusable(i)||(i.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let a=()=>{o(),l(),i.removeAttribute("tabindex");},o=this._renderer.listen(i,"blur",a),l=this._renderer.listen(i,"mousedown",a);})),i.focus(t));}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case  false:case "dialog":return;case  true:case "first-tabbable":Wf(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus();},{injector:this._injector});break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null);}_isFocusWithinDrawer(){let e=this._doc.activeElement;return !!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=true,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState());}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete();}open(e){return this.toggle(true,e)}close(){return this.toggle(false)}_closeViaBackdropClick(){return this._setOpen(false,true,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,t,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),(this._container?._content||this._container?._userContent)?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(true),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next();}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(a=>{this.openedChange.pipe(It$5(1)).subscribe(o=>a(o?"open":"close"));}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e);}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop());}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,i=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,t)),i.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor);}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(false),this._animationEnd.next(e);});};static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-drawer"]],viewQuery:function(t,i){if(t&1&&lh(Vo,5),t&2){let a;fD(a=pD())&&(i._content=a.first);}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,i){t&2&&(Kp("align",null)("tabIndex",i.mode!=="side"?"-1":null),hh("visibility",!i._container&&!i.opened?"hidden":null),gh("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"));},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Pa,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,i){t&1&&(lD(),wi$1(0,"div",1,0),uD(2),Hc());},dependencies:[As],encapsulation:2})}return r})(),wn=(()=>{class r{_dir=T$3(pt$2,{optional:true});_element=T$3(Tr$2);_ngZone=T$3(ue$1);_changeDetectorRef=T$3(kF);_animationDisabled=gt$3();_transitionsEnabled=false;_allDrawers;_drawers=new si$1;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=Ki$2(e);}_autosize=T$3(qo);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:Ki$2(e);}_backdropOverride=null;backdropClick=new qe$3;_start=null;_end=null;_left=null;_right=null;_destroyed=new ne$2;_doCheckSubject=new ne$2;_contentMargins={left:null,right:null};_contentMarginChanges=new ne$2;get scrollable(){return this._userContent||this._content}_injector=T$3(le$2);constructor(){let e=T$3(x$1),t=T$3(oe);this._dir?.change.pipe(Rg(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins();}),t.change().pipe(Rg(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=true;},200);});}ngAfterContentInit(){this._allDrawers.changes.pipe(Bl(this._allDrawers),Rg(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges();}),this._drawers.changes.pipe(Bl(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e);}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Cg(10),Rg(this._destroyed)).subscribe(()=>this.updateContentMargins());});}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete();}open(){this._drawers.forEach(e=>e.open());}close(){this._drawers.forEach(e=>e.close());}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,t-=i;}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();t+=i,e-=i;}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)));}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next());}_watchDrawerToggle(e){e._animationStarted.pipe(Rg(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),e.mode!=="side"&&e.openedChange.pipe(Rg(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened));}_watchDrawerPosition(e){e.onPositionChanged.pipe(Rg(this._drawers.changes)).subscribe(()=>{Wf({read:()=>this._validateDrawers()},{injector:this._injector});});}_watchDrawerMode(e){e._modeChanged.pipe(Rg(Dg(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();});}_setContainerClass(e){let t=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?t.add(i):t.remove(i);}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e);}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end);}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop();}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick());}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-drawer-container"]],contentQueries:function(t,i,a){if(t&1&&ch(a,Gt,5)(a,vn,5),t&2){let o;fD(o=pD())&&(i._content=o.first),fD(o=pD())&&(i._allDrawers=o);}},viewQuery:function(t,i){if(t&1&&lh(Gt,5),t&2){let a;fD(a=pD())&&(i._userContent=a.first);}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,i){t&2&&gh("mat-drawer-container-explicit-backdrop",i._backdropOverride);},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[zD([{provide:Da,useExisting:r}])],ngContentSelectors:jo,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,i){t&1&&(lD(Uo),ZE(0,zo,1,2,"div",0),uD(1),uD(2,1),ZE(3,Ho,2,0,"mat-drawer-content")),t&2&&(YE(i.hasBackdrop?0:-1),Hv(3),YE(i._content?-1:3));},dependencies:[Gt],styles:[`.mat-drawer-container {
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
`],encapsulation:2})}return r})();var Yo=["*",[["mat-toolbar-row"]]],Ko=["*","mat-toolbar-row"],xn=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275dir=CE({type:r,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return r})(),Oa=(()=>{class r{_elementRef=T$3(Tr$2);_platform=T$3(x$1);_document=T$3(ir$3);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()));}_checkToolbarMixedModes(){this._toolbarRows.length;}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-toolbar"]],contentQueries:function(t,i,a){if(t&1&&ch(a,xn,5),t&2){let o;fD(o=pD())&&(i._toolbarRows=o);}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,i){t&2&&(_D(i.color?"mat-"+i.color:""),gh("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0));},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Ko,decls:2,vars:0,template:function(t,i){t&1&&(lD(Yo),uD(0),uD(1,1));},styles:[`.mat-toolbar {
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
`],encapsulation:2})}return r})();var re=(function(r){return r.SPANISH="es-ES",r.ENGLISH="en-EN",r})(re||{});function Fa(){let r=window.navigator.language||window.navigator.languages?.[0]||re.ENGLISH;return Object.values(re).includes(r)?r:re.ENGLISH}var Qo=()=>["/"],Wo=()=>["/about"],Go=()=>["/cv"],$o=()=>["/contact"],Xo=()=>["/artworks"],Zo=r=>({years:r}),Jo=r=>["/generative",r],es=(r,n)=>n.id;function ts(r,n){r&1&&nh(0);}function is(r,n){if(r&1){let e=iD();wi$1(0,"button",16),ih("click",function(){xu$1(e),aD();let i=gD(2);return Au(i.toggle())}),wi$1(1,"mat-icon"),FD(2,"menu"),Hc()();}}function ns(r,n){r&1&&nh(0);}function rs(r,n){if(r&1&&Gp(0,ns,1,0,"ng-container",6),r&2){aD();let e=gD(15);Jp("ngTemplateOutlet",e);}}function as(r,n){if(r&1&&(wi$1(0,"button",18),KD(1,"translate"),FD(2),KD(3,"translate"),Hc()),r&2){aD(2);let e=gD(31);Jp("matMenuTriggerFor",e),Kp("aria-label",XD(1,3,"menu.generative")),Hv(2),qc(" ",XD(3,5,"menu.generative")," ");}}function os(r,n){if(r&1){let e=iD();wi$1(0,"button",17),FD(1),KD(2,"translate"),Hc(),ZE(3,as,4,7,"button",18),wi$1(4,"button",19),KD(5,"translate"),FD(6),KD(7,"translate"),Hc(),wi$1(8,"button",20),FD(9,"CV"),Hc(),wi$1(10,"button",19),KD(11,"translate"),FD(12),KD(13,"translate"),Hc(),wi$1(14,"button",21),ih("click",function(){xu$1(e);let i=aD();return Au(i.changeLanguage())}),FD(15),Hc();}if(r&2){let e=aD(),t=gD(17);Jp("matMenuTriggerFor",t),Hv(),qc(" ",XD(2,11,"paintings")," "),Hv(2),YE(e.generativePieces.length?3:-1),Hv(),Jp("routerLink",QD(21,Wo)),Kp("aria-label",XD(5,13,"menu.about")),Hv(2),qc(" ",XD(7,15,"menu.about")," "),Hv(2),Jp("routerLink",QD(22,Go)),Hv(2),Jp("routerLink",QD(23,$o)),Kp("aria-label",XD(11,17,"menu.contact")),Hv(2),qc(" ",XD(13,19,"menu.contact")," "),Hv(3),qc(" ",e.currentLangLabel," ");}}function ss(r,n){if(r&1&&(wi$1(0,"button",14),FD(1),Hc()),r&2){let e=n.$implicit;Jp("routerLink",QD(4,Xo))("queryParams",ZD(5,Zo,e)),Kp("aria-label",e),Hv(),qc(" ",e," ");}}function ls(r,n){if(r&1&&(wi$1(0,"button",15),FD(1),Hc()),r&2){let e=n.$implicit;Jp("routerLink",ZD(3,Jo,e.id)),Kp("aria-label",e.label),Hv(),qc(" ",e.label," ");}}var Ra=(()=>{class r{constructor(){this.artworkService=T$3(Rt),this.responsiveService=T$3(St$1),this.translateService=T$3(Nt$3),this.mobileMenu=Wa$1(this.responsiveService.displayMobileLayout),this.generativePieces=K$3;}get years(){return this.artworkService.getAvailableYears()}get currentLang(){return this.translateService.getCurrentLang()||this.translateService.getFallbackLang()||re.ENGLISH}get currentLangLabel(){return this.currentLang.slice(0,2).toUpperCase()}changeLanguage(){let e=this.currentLang===re.ENGLISH?re.SPANISH:re.ENGLISH;this.translateService.use(e);}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-top-menu"]],decls:34,vars:17,consts:[["drawer",""],["menuButtons",""],["paintingMenu","matMenu"],["yearsMenu","matMenu"],["generativeMenu","matMenu"],["mode","over","position","end",1,"drawer"],[4,"ngTemplateOutlet"],["color","primary"],["aria-label","Juanma Moreno S\xE1nchez","mat-button","",3,"routerLink"],[1,"catalog-heading","brand"],[1,"spacer"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu"],["mat-menu-item","","routerLink","/artworks"],["mat-menu-item","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"routerLink","queryParams"],["mat-menu-item","",3,"routerLink"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu",3,"click"],["x","","mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"routerLink"],["aria-label","CV","mat-button","",3,"routerLink"],["aria-label","Language switcher","mat-button","",3,"click"]],template:function(t,i){if(t&1&&(wi$1(0,"mat-drawer-container")(1,"mat-drawer",5,0)(3,"div"),Gp(4,ts,1,0,"ng-container",6),Hc()(),wi$1(5,"mat-drawer-content")(6,"mat-toolbar",7)(7,"mat-toolbar-row")(8,"button",8)(9,"h1",9),FD(10,"Juanma Moreno S\xE1nchez"),Hc()(),Xp(11,"span",10),ZE(12,is,3,0,"button",11)(13,rs,1,1,"ng-container"),Hc()()()(),Gp(14,os,16,24,"ng-template",null,1,tw),wi$1(16,"mat-menu",null,2)(18,"button",12),KD(19,"translate"),FD(20),KD(21,"translate"),Hc(),wi$1(22,"button",13),KD(23,"translate"),FD(24),KD(25,"translate"),Hc()(),wi$1(26,"mat-menu",null,3),JE(28,ss,2,7,"button",14,KE),Hc(),wi$1(30,"mat-menu",null,4),JE(32,ls,2,5,"button",15,es),Hc()),t&2){let a=gD(15),o=gD(27);Hv(4),Jp("ngTemplateOutlet",a),Hv(4),Jp("routerLink",QD(16,Qo)),Hv(4),YE(i.mobileMenu()?13:12),Hv(6),Kp("aria-label",XD(19,8,"menu.allPaintings")),Hv(2),qc(" ",XD(21,10,"menu.allPaintings")," "),Hv(2),Jp("matMenuTriggerFor",o),Kp("aria-label",XD(23,12,"menu.byYear")),Hv(2),qc(" ",XD(25,14,"menu.byYear")," "),Hv(4),XE(i.years),Hv(4),XE(i.generativePieces);}},dependencies:[Oa,xn,xu,Ut$1,Ia$1,Mt$1,rr$3,wn,Gt,vn,Ta,Pt,Wt,iu],styles:["mat-toolbar-row[_ngcontent-%COMP%]{flex-wrap:wrap;height:auto;min-height:var(--mat-toolbar-standard-height, 4rem);row-gap:.25rem;padding-top:.5rem;padding-bottom:.5rem}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.brand[_ngcontent-%COMP%]{color:inherit;font-size:1.1rem;font-weight:400;margin:0}"]});}}return r})();var Ba={"Oil on wood":"Oil on wood","Oil on canvas":"Oil on canvas","Watercolor on paper":"Watercolor on paper",sold:"Art piece sold",moreOn:"More on",selectYear:"Select a year",paintings:"Paintings",submit:"Submit",close:"Close",cancel:"Cancel",back:"Back",next:"Next",generative:{notFound:"This generative piece was not found."},menu:{allPaintings:"All paintings",generative:"Generative",about:"About",contact:"Contact",byYear:"By Year"},traits:{medium:"Medium",keight:"Height",width:"Width",unit:"Unit",year:"Year",imgTypr:"Image Type",artist:"Artist",project:"Project",descAuthor:"Description Author",descLang:"Description language"},viewTypes:{frontal:"Frontal view",progreso:"Work in progress",detail:"Detail view"},sortBy:"Sort by ",sortMethod:{year:"Year",size:"Size",medium:"Medium"},contact:{title:"Contact",representedBy:"Currently represented by <a href='https://galeriazunino.com/' target='_blank'>Zunino Gallery</a> (Sevilla)",contactText:"If you want to contact me, use the form bellow and I will get back to you soon. You can also follow me on <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a> to stay on the loop.",name:"Name",message:"Message"},error:{noValue:"You must enter a value",invalidEmail:"Not a valid email"},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n, Spain), 1986. Based in Madrid (Spain)",shows:{title:"Solo shows"},collectiveShows:{title:"Collective exhibitions (selection)"},awards:{title:"Artistic awards and residencies (selection)",lefranc:"Lefranc&Bourgueois art award",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Antonio Gala Foundation Residence Program</a>"},conferences:{title:"Conferences",unia:"<a href='https://www.unia.es/' target='blank'>International University of Andalucia</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>Towards a New AI Winter</a>"},education:{title:"Education",degree:"Bachelor on arts degree",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>University of Granada",erasmus:"LLP Erasmus Scholarship",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Zunino gallery</a>",countries:{online:"Online",spain:"Spain",usa:"USA",germany:"Germany",mexico:"Mexico",italy:"Italy"}},statement:{title:"Statement",introduction:{content:"My artistic work is profoundly analog, even though its creation usually originates in the digital. This is the great contradiction of <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'>the millennial generation, to which I belong</a>. We are the last generation to have been educated using pen and paper that has had to navigate life in a digital environment. It is the intersection between two worlds, a collision I do not try to hide. In fact, I split my labor between the artistic production I need to be happy and the software development I need in order to eat."},painting:{title:"Painting",distance:"In painting is where, throughout my entire life, I have found refuge. Painting is important. Painting is useful. Painting is home.",outOfNoise:"This distance involves spending time outside the automatism of routine, a necessary condition to be able to observe, analyze, and finally build.",anacronism:"Painting is an ancient craft that allows working on a surface as much or as little as the artist wishes, with the only limits being space and time. <strong>Painting is a precious anachronism.</strong> Simultaneously, painting is always relevant because it is an infinite field of knowledge. Each artist, over the years, gradually discovers small findings that together end up forming something unique and unrepeatable."},art:{title:"Art",arts:"My refuge in painting, sculpture, generative art, or digital art has yielded different fruits over time. There are fruits that have never been documented, and there are also those that have not even been seen by anyone other than myself. In any case, there are peculiarities in my art that are constant and cut across production, and there are others that are variable; obsessions that come and go over time:"},constants:{title:"Constants",items:{first:{title:"Internet",content:"Representing technology artistically in painting and making technology by hand are ways of trying to reconcile our physical self and our avatar. Most of the images I use in my creative process originate from the Internet, specifically from chance encounters with random images. Even before the emergence of AIs, the Internet was already a virtually infinite visual world."},second:{title:"Disturbing Element",content:"In a hypothetical painting, a character looks at or interacts with something. But we don't know who they are, what they are doing, or why they are doing it. Even if it's something indeterminate, the action introduces narrative and invites spending time contemplating the image. The idea is for the image to propose an open premise, something beyond the pose, and for the viewer to complete it. The disturbing as a starting point."},third:{title:"Tradition",content:"Cultural heritage is the DNA of any cultural identity. Great authors and the great themes of art history have had, have, and will have a tremendously gravitational effect. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., have created great masterpieces in which the great themes of the history of art have been developed yesterday and today. Themes that are inherently human and are transversal and universal: love, death, fear..."},fourth:{title:"Failure as one of the Fine Arts",content:"'I have done many things because I have failed at all of them. I start from failure as one of the Fine Arts.' This quote from the multifaceted Pep\xEDn Tre perfectly illustrates the reason for multidisciplinarity. Genius, divine enlightenment, or inspiration are nothing but mythological clich\xE9s. Reality, as always, is much more prosaic: it is failure (real or perceived) that moves an artist to investigate, try new techniques, new ways of reaching the public, etc. On the contrary, I am convinced that success (real or perceived) has a paralyzing capacity and ends up producing artists bored with their own art and therefore with themselves. Failure frustrates, but it also stimulates, or so I want to believe."}}},variables:{title:"Variables",items:{first:{title:"Artificial Intelligence",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>In 2019, a minimal advance guard of creators, like Juanma Moreno, already experimented with the old Artificial Intelligence of that time</em></a>, as Javier Villuendas says in his column in ABC Cultural. In 2019, few of us intuited the creative potential of the AI of the time. Old neural networks like StyleGan or Bigbigan stimulated our imagination by creating very interesting monsters. Nowadays, AI-generated art is commonplace and has reached new levels of formal sufficiency. But at that time, the margin of error (loss) was much wider, and accidents produced unheard-of and highly interesting monsters. From 2019 to 2023, the primary source of inspiration for my work shifted from images found on the internet to images that Artificial Intelligences are capable of generating."},second:{title:"Software",content:"Software doesn't have to be an ultra-rational and efficient solution to an engineering problem. Software can also satisfy an artist's curiosity, be flexible, organic, mutate, be random, disorganized, and unpredictable. Once again, we must value error. It is in the brushstroke that goes slightly beyond the contour, the accident that causes software to distort an image until it aberrates, where the value and originality lie."}}}},download:{cv:"Generate and download CV",statement:"Generate and download Statement",sheet:"Generate and download technical sheet",portfolio:"Generate and download portfolio",hd:"Download high resolution image",success:"Download ready",error:"Could not generate the file"},links:{view:"View where this artwork appears on the Internet",title:"Appearances of the artwork on the Internet"}};var Na={"Oil on wood":"\xD3leo sobre madera","Oil on canvas":"\xD3leo sobre tela","Watercolor on paper":"Acuarela sobre papel",sold:"Pieza vendida",moreOn:"M\xE1s de",selectYear:"Selecciona un a\xF1o",paintings:"Pinturas",submit:"Enviar",close:"Cerrar",cancel:"Cancelar",back:"Volver",next:"Siguiente",generative:{notFound:"No se encontr\xF3 esta pieza generativa."},menu:{allPaintings:"Todas las pinturas",generative:"Generativo",about:"Acerca de",contact:"Contacto",byYear:"Por a\xF1o"},traits:{medium:"T\xE9cnica",keight:"Altura",width:"Ancho",unit:"Unidad",year:"A\xF1o",imgTypr:"Tipo de imagen",artist:"Artista",project:"Proyecto",descAuthor:"Autor de la descripci\xF3n",descLang:"Lenguage de la descripci\xF3n"},viewTypes:{frontal:"Vista frontal",progreso:"En progreso",detail:"Vista de detalle"},sortBy:"Ordenar por ",sortMethod:{year:"A\xF1o",size:"Tama\xF1o",medium:"T\xE9cnica"},contact:{title:"Contacto",representedBy:"Representado por la <a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino </a> (Sevilla)",contactText:"Si quieres contactar conmigo, usa el formulario debajo. Tambi\xE9n puedes seguirme en <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a>.",name:"Nombre",message:"Mensaje"},error:{noValue:"Debes escribir algo",invalidEmail:"Email inv\xE1lido"},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n), 1986. Reside en Madrid.",shows:{title:"Exposiciones individuales"},collectiveShows:{title:"Exposiciones colectivas (selecci\xF3n)"},conferences:{title:"Conferencias",unia:"<a href='https://www.unia.es/' target='blank'>Universidad Internacional de Andaluc\xEDa</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>\xBFHacia un nuevo invierno de la IA?</a>"},awards:{title:"Premios y becas (selecci\xF3n)",lefranc:"Becas Lefranc&Bourgueois",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Fundaci\xF3n Antonio Gala para j\xF3venes creadores</a>"},education:{title:"Educacion",degree:"Licenciado en Bellas Artes",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>Universidad de Granada",erasmus:"Beca LLP Erasmus",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino</a>",countries:{online:"Online",spain:"Espa\xF1a",usa:"USA",germany:"Alemania",mexico:"M\xE9xico",italy:"Italia"}},statement:{title:"Statement",introduction:{content:"Mi obra art\xEDstica es profundamente anal\xF3gica, si bien la creaci\xF3n suele tener su origen en lo digital. Esta es la gran contradicci\xF3n de <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'>la generaci\xF3n milenial, a la que pertenezco</a>. Somos la \xFAltima generaci\xF3n que se ha formado usando papel y l\xE1piz que ha tenido que buscarse la vida en un ambiente digital. Es la intersecci\xF3n entre dos mundos, una colisi\xF3n que no intento disimular. De hecho, divido mi fuerza de trabajo entre la producci\xF3n art\xEDstica que necesito para ser feliz y la programaci\xF3n de software que necesito para poder comer."},painting:{title:"Pintura",distance:"En la pintura es donde, a lo largo de toda mi vida, he encontrado refugio. La pintura es importante. La pintura es \xFAtil. La pintura es casa.",outOfNoise:"Esta distancia implica pasar tiempo fuera del automatismo de la rutina, una condici\xF3n necesaria para poder observar, analizar y finalmente construir.",anacronism:"La pintura es un oficio ancestral que permite trabajar en una superficie tanto o tan poco como el artista quiera, teniendo como \xFAnicos l\xEDmites el espacio y el tiempo. <strong>La pintura es un anacronismo precioso.</strong> Al mismo tiempo, la pintura es siempre relevante porque es un campo infinito de conocimiento. Cada artista, a lo largo de los a\xF1os, va descubriendo peque\xF1os hallazgos, que en su conjunto acaban por formar algo \xFAnico e irrepetible."},art:{title:"Arte",arts:"Mi refugio en la pintura, la escultura, el arte generativo o el arte digital ha dado frutos diferentes a lo largo del tiempo. Hay frutos que nunca han sido documentados, y tambi\xE9n los hay que ni siquiera han sido vistos por otra persona m\xE1s que yo mismo. En cualquier caso, hay peculiaridades en mi arte que son constantes y atraviesan la producci\xF3n, y hay otras que son variables; obsesiones que van y vienen con el tiempo:"},constants:{title:"Constantes",items:{first:{title:"Internet",content:"Representar a la tecnolog\xEDa en la pintura y crear tecnolog\xEDa artesanalmente son formas de intentar reconciliar nuestro yo f\xEDsico y nuestro avatar.La mayor\xEDa de las im\xE1genes que uso en mi proceso creativo provienen de Internet, espec\xEDficamente de encuentros fortuitos con im\xE1genes aleatorias. Incluso antes de la aparici\xF3n de las IA, Internet ya era un mundo visual virtualmente infinito."},second:{title:"Elemento inquietante",content:"En una pintura hipot\xE9tica, un personaje mira o interact\xFAa con algo. Pero no sabemos qui\xE9n es, qu\xE9 est\xE1 haciendo o por qu\xE9 lo est\xE1 haciendo. Incluso si es algo indeterminado, la acci\xF3n introduce una narrativa e invita a pasar tiempo contemplando la imagen. La idea es que la imagen proponga una premisa abierta, algo m\xE1s all\xE1 de la pose, y que el espectador la complete. Lo inquietante como punto de partida."},third:{title:"Tradici\xF3n",content:"El patrimonio cultural est\xE1 en el ADN de cualquier identidad. Los grandes autores y los grandes temas de la historia del arte han tenido, tienen y tendr\xE1n un efecto tremendamente gravitacional. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., han creado grandes obras maestras en las que se han desarrollado los grandes temas de la historia del arte, ayer y hoy. Temas intr\xEDnsecamente humanos, transversales y universales: el amor, la muerte, el miedo..."},fourth:{title:"El fracaso como una de las Bellas Artes",content:"'He hecho muchas cosas porque he fracasado en todas ellas. Parto del fracaso como una de las Bellas Artes.' Esta cita del polifac\xE9tico Pep\xEDn Tre ilustra perfectamente la raz\xF3n de la multidisciplinariedad. El genio, la iluminaci\xF3n divina o la inspiraci\xF3n no son m\xE1s que clich\xE9s mitol\xF3gicos. La realidad, como siempre, es mucho m\xE1s prosaica: es el fracaso (real o percibido) lo que mueve a un artista a investigar, probar nuevas t\xE9cnicas, nuevas formas de llegar al p\xFAblico, etc. Por el contrario, estoy convencido de que el \xE9xito (real o percibido) tiene una capacidad paralizante y termina produciendo artistas aburridos de su propio arte y por tanto de s\xED mismos. El fracaso frustra, pero tambi\xE9n estimula, o eso quiero creer yo."}}},variables:{title:"Variables",items:{first:{title:"Inteligencia Artificial",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>En 2019, una m\xEDnima vanguardia de creadores, como Juanma Moreno, ya experimentaba con la vieja Inteligencia Artificial de esa \xE9poca</em></a>, como dice Javier Villuendas en su columna en ABC Cultural. En 2019, pocos intu\xEDamos el potencial creativo de la IA de entonces. Las viejas redes neuronales como StyleGan o Bigbigan estimulaban nuestra imaginaci\xF3n creando monstruos muy interesantes. Hoy en d\xEDa, el arte generado por IA es algo com\xFAn y ha alcanzado nuevos niveles de suficiencia formal. Pero en aquel entonces, el margen de error (la p\xE9rdida) era mucho mayor, y los accidentes produc\xEDan monstruos inauditos y altamente interesantes. De 2019 a 2023, la principal fuente de inspiraci\xF3n para mi trabajo pas\xF3 de ser im\xE1genes encontradas en Internet a im\xE1genes que las Inteligencias Artificiales son capaces de generar."},second:{title:"Software",content:"El software no tiene que ser una soluci\xF3n ultra-racional y eficiente a un problema de ingenier\xEDa. El software tambi\xE9n puede satisfacer la curiosidad de un artista, ser flexible, org\xE1nico, mutar, ser aleatorio, desordenado e impredecible. Una vez m\xE1s, debemos valorar el error. Es en la pincelada que va ligeramente m\xE1s all\xE1 del contorno, en el accidente que hace que el software distorsione una imagen hasta aberrarla, donde reside el valor y la originalidad."}}}},download:{cv:"Generar y descargar CV",statement:"Generar y descargar statement",sheet:"Generar y descargar ficha t\xE9cnica",portfolio:"Generar y descargar dossier",hd:"Descargar imagen en alta resoluci\xF3n",success:"Descarga lista",error:"No se pudo generar el archivo"},links:{view:"Ver repercusi\xF3n de la pieza en Internet",title:"Apariciones de la pieza en Internet"}};var La=(()=>{class r{constructor(){this.translateService=T$3(Nt$3),this.translateService.setTranslation(re.ENGLISH,Ba),this.translateService.setTranslation(re.SPANISH,Na),this.translateService.use(Fa());}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-root"]],decls:6,vars:0,consts:[["role","banner"],["role","main"]],template:function(t,i){t&1&&(Xp(0,"app-share-button"),wi$1(1,"header",0),Xp(2,"app-top-menu"),Hc(),wi$1(3,"main",1),Xp(4,"app-breadcrumb")(5,"router-outlet"),Hc());},dependencies:[Ra,Ia,Aa,lr],styles:["main[_ngcontent-%COMP%]{display:block;padding-bottom:3rem}"]});}}return r})();var us="@",ms=(()=>{class r{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=T$3(le$2);loadingSchedulerFn=T$3(ps,{optional:true});_engine;constructor(e,t,i,a,o){this.doc=e,this.delegate=t,this.zone=i,this.animationType=a,this.moduleImpl=o;}ngOnDestroy(){this._engine?.flush();}loadImpl(){let e=()=>this.moduleImpl??import('./chunk-CoJGL5pQ.js').then(i=>i),t;return this.loadingSchedulerFn?t=this.loadingSchedulerFn(e):t=e(),t.catch(i=>{throw new b$2(5300,false)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:a})=>{this._engine=i(this.animationType,this.doc);let o=new a(this.delegate,this._engine,this.zone);return this.delegate=o,o})}createRenderer(e,t){let i=this.delegate.createRenderer(e,t);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=false);let a=new Cn(i);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(o=>{let l=o.createRenderer(e,t);a.use(l),this.scheduler??=this.injector.get(Oe$4,null,{optional:true}),this.scheduler?.notify(10);}).catch(o=>{a.use(i);}),a}begin(){this.delegate.begin?.();}end(){this.delegate.end?.();}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(e){this._engine?.flush(),this.delegate.componentReplaced?.(e);}static \u0275fac=function(t){jI();};static \u0275prov=re$3({token:r,factory:r.\u0275fac})}return r})(),Cn=class{delegate;replay=[];\u0275type=1;constructor(n){this.delegate=n;}use(n){if(this.delegate=n,this.replay!==null){for(let e of this.replay)e(n);this.replay=null;}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy();}createElement(n,e){return this.delegate.createElement(n,e)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}get destroyNode(){return this.delegate.destroyNode}appendChild(n,e){this.delegate.appendChild(n,e);}insertBefore(n,e,t,i){this.delegate.insertBefore(n,e,t,i);}removeChild(n,e,t,i){this.delegate.removeChild(n,e,t,i);}selectRootElement(n,e){return this.delegate.selectRootElement(n,e)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,e,t,i){this.delegate.setAttribute(n,e,t,i);}removeAttribute(n,e,t){this.delegate.removeAttribute(n,e,t);}addClass(n,e){this.delegate.addClass(n,e);}removeClass(n,e){this.delegate.removeClass(n,e);}setStyle(n,e,t,i){this.delegate.setStyle(n,e,t,i);}removeStyle(n,e,t){this.delegate.removeStyle(n,e,t);}setProperty(n,e,t){this.shouldReplay(e)&&this.replay.push(i=>i.setProperty(n,e,t)),this.delegate.setProperty(n,e,t);}setValue(n,e){this.delegate.setValue(n,e);}listen(n,e,t,i){return this.shouldReplay(e)&&this.replay.push(a=>a.listen(n,e,t,i)),this.delegate.listen(n,e,t,i)}shouldReplay(n){return this.replay!==null&&n.startsWith(us)}},ps=new S$1("");function Va(r="animations"){return _e$3("NgAsyncAnimations"),Rs$1([{provide:vr$3,useFactory:()=>new ms(T$3(ir$3),T$3(bt$4),T$3(ue$1),r)},{provide:Im,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Ai=class{getTraitValue(n,e){try{return n.raw.metadata.attributes.find(t=>t.trait_type===e)?.value??""}catch(t){switch(e){case nt$1.VERSION:return "";case nt$1.MEDIUM:return "Error getting medium";case nt$1.HEIGHT:return "XX";case nt$1.WIDTH:return "XX";case nt$1.UNIT:return "cm";case nt$1.YEAR:return "XXXX";case nt$1.IMAGETYPE:return "";default:return "Error getting data"}}}getYears(n){let e=(n??[]).map(t=>Number(this.getTraitValue(t,nt$1.YEAR))).filter(t=>!Number.isNaN(t)).sort((t,i)=>i-t);return new Set(e)}sortByYear(n,e=Vi$1.ASC){let t=i=>{let a=Number(this.getTraitValue(i,nt$1.YEAR));return Number.isNaN(a)?0:a};return [...n].sort((i,a)=>{let o=t(i),l=t(a);return e===Vi$1.ASC?o-l:l-o})}sortByMedium(n,e=Vi$1.ASC){let t=["oil","watercolor"],i=a=>{let o=this.getTraitValue(a,nt$1.MEDIUM).toLowerCase(),l=t.findIndex(d=>o.includes(d));return l===-1?t.length:l};return [...n].sort((a,o)=>{let l=i(a)-i(o);return e===Vi$1.ASC?l:-l})}sortBySize(n,e=Vi$1.ASC){return [...n].sort((t,i)=>{let a=this.getSize(t)-this.getSize(i);return e===Vi$1.ASC?a:-a})}sortByName(n,e=Vi$1.ASC){return [...n].sort((t,i)=>{let a=t.name?.toLowerCase()||"",o=i.name?.toLowerCase()||"",l=a.localeCompare(o);return e===Vi$1.ASC?l:-l})}getSize(n){let e=t=>{let i=Number.parseInt(this.getTraitValue(n,t),10);return Number.isNaN(i)?0:i};return e(nt$1.HEIGHT)+e(nt$1.WIDTH)}getNftById(n,e){return e.find(({tokenId:t})=>n===t)||null}getArtByTitle(n,e){return e.filter(({name:t})=>t===n)}getNftLenghtByYear(n,e){return e.filter(t=>this.getTraitValue(t,nt$1.YEAR)===n).length}isFrontalView(n,e){let t=this.filterFrontalArtworks(e);return t.length?t.length===1?t[0].tokenId===n.tokenId:this.getLatestVersion(t)?.tokenId===n.tokenId:false}filterFrontalArtworks(n){return n.filter(e=>this.getTraitValue(e,nt$1.IMAGETYPE)===ot.FRONTAL)}isExcludedByYear(n,e=[]){if(e?.length){let t=this.getTraitValue(n,nt$1.YEAR);return !e.includes(t)}else return  false}getLatestVersion(n){return n.length?n.reduce((e,t)=>{let i=parseInt(this.getTraitValue(e,nt$1.VERSION))||0;return (parseInt(this.getTraitValue(t,nt$1.VERSION))||0)>i?t:e}):null}getLatestVersionIndex(n){let e=this.getLatestVersion(n);return n.findIndex(t=>e&&t.tokenId===e.tokenId)}getNftQualityUrls(n){return this.collectUrls(n,["originalUrl","cachedUrl","thumbnailUrl"])}getNftFetchableUrls(n){return this.collectUrls(n,["originalUrl","pngUrl","thumbnailUrl"])}getNftQualityUrl(n){return this.getNftQualityUrls(n)[0]||""}getNftOptimalUrl(n){return this.collectUrls(n,["thumbnailUrl","cachedUrl","originalUrl"])[0]||""}collectUrls(n,e){let t=e.map(i=>n?.[i]);return [...new Set(t.filter(i=>typeof i=="string"&&!!i))]}};var Ii=class{static olderThanNDays(n,e){let i=Math.abs(new Date().getTime()-new Date(n).getTime());return Math.ceil(i/(1e3*3600*24))>e}};var Ti=(function(r){return r[r.BACKEND_THUMBNAIL=1]="BACKEND_THUMBNAIL",r[r.NFT_THUMBNAIL=2]="NFT_THUMBNAIL",r[r.NFT_CACHED=3]="NFT_CACHED",r})(Ti||{}),Pi=class extends Ai{constructor(){super(...arguments),this.http=T$3(jn$2),this.sessionStore=T$3(It),this.sessionQuery=T$3(ki);}getArtPiecesObservable(){if(!this.itIsNeccesaryToFetch())return this.sessionQuery.getArtPiecesObservable;let n=this.http.get(`${gr$1.backendUrl}nfts-snapshot`).pipe(this.extractData([]),$l(e=>this.saveNftsLocally(e)),Yi$3(()=>this.sessionQuery.getArtPiecesObservable));return this.sessionQuery.selectArtPieces.length?n.pipe(Bl(this.sessionQuery.selectArtPieces)):this.getFallbackArtworks().pipe($l(e=>this.sessionStore.update({artPieces:e})),vl(e=>n.pipe(Bl(e))))}getFallbackArtworks(){return Se$4(import('./chunk-DSHJwLD8.js')).pipe(Me$3(n=>n.FALLBACK_ARTWORKS_API_CALL.data??[]))}getArtPieceDescriptions(n){return this.http.get(`${gr$1.backendUrl}descriptions/${n}`).pipe(this.extractData(null),Yi$3(()=>ag(null)))}extractData(n){return Me$3(e=>e.success&&e.data?e.data:n)}getNftByIdObservable(n){return this.sessionQuery.getArtPiecesObservable.pipe(Me$3(e=>this.getNftById(n,e)))}getSameArtThanObservable(n){return this.getNftByIdObservable(n).pipe(vl(e=>e?ag(this.getArtByTitle(e.name,this.sessionQuery.selectArtPieces)):this.getArtPiecesObservable().pipe(vl(t=>{let i=this.getNftById(n,t);return i?.name?ag(this.getArtByTitle(i.name,t)):ag([])}))))}getFullNftLenghtByYear(n){return this.getNftLenghtByYear(n,this.sessionQuery.selectArtPieces)}getAvailableOptimalUrl(n){return this.getLocalCachedThumbnail(n.tokenId).pipe(vl(e=>e?ag(e):this.fetchRemoteThumbnail(n.tokenId).pipe(Yi$3(()=>ag(null)),Me$3(t=>t||n.image.thumbnailUrl||n.image.originalUrl))))}getProgressiveImageUrls(n){let e=this.getLocalCachedThumbnail(n.tokenId).pipe(vl(a=>a?ag(a):this.fetchRemoteThumbnail(n.tokenId)),Yi$3(()=>ag(null)),Me$3(a=>({url:a,quality:Ti.BACKEND_THUMBNAIL}))),t=this.preloadImage(n.image?.thumbnailUrl).pipe(Me$3(a=>({url:a,quality:Ti.NFT_THUMBNAIL}))),i=this.preloadImage(n.image?.cachedUrl).pipe(Me$3(a=>({url:a,quality:Ti.NFT_CACHED})));return Dg(e,t,i).pipe(xg((a,o)=>o.url&&o.quality>a.quality?o:a,{url:null,quality:0}),Me$3(({url:a})=>a),Xt$3(a=>!!a),Fl())}preloadImage(n){return n?new N$2(e=>{let t=new Image;return t.onload=()=>{e.next(n),e.complete();},t.onerror=()=>e.complete(),t.src=n,()=>{t.onload=null,t.onerror=null,t.complete||(t.src="");}}):vt$4}getLinks(n){return this.http.get(gr$1.backendUrl+"vision/search/"+n).pipe(this.extractData([]),Yi$3(()=>ag([])))}getAvailableYears(){return this.getYears(this.sessionQuery.selectArtPieces)}saveNftsLocally(n){this.sessionStore.update({artPieces:n,lastArtPiecesUpdate:new Date});}getLocalCachedThumbnail(n){let e=this.sessionQuery.getThumbnailByTokenId(n);return ag(e?ct$2.composeImgSrc(e.thumbnail):null)}fetchRemoteThumbnail(n){return this.http.get(`${gr$1.backendUrl}nft-thumbnails/${n}`).pipe($l(e=>{if(e.success&&e.data){let t=this.sessionQuery.getValue().imageCache;this.sessionStore.update({imageCache:[...t,e.data]});}}),Me$3(e=>e.data?ct$2.composeImgSrc(e.data?.thumbnail):null))}itIsNeccesaryToFetch(){return !this.sessionQuery.selectArtPieces.length||!this.sessionQuery.selectLastArtPiecesUpdate||Ii.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate,7)}};var Ua=(()=>{class r{constructor(){this.router=T$3(te);}navigateTo(e){this.router.navigate([e]);}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-not-found"]],decls:24,vars:18,consts:[[1,"container","center"],["role","list"],["mat-button","","color","primary",3,"click"],["aria-label","cv","mat-button","","color","primary",3,"click"]],template:function(t,i){t&1&&(wi$1(0,"div",0)(1,"h2"),FD(2,"404 - Page Not Found"),Hc(),wi$1(3,"p"),FD(4,"Oops! The page you are looking for does not exist. Please navigate to:"),Hc(),wi$1(5,"mat-list",1)(6,"mat-list-item")(7,"button",2),KD(8,"translate"),ih("click",function(){return i.navigateTo("/artworks")}),FD(9),KD(10,"translate"),Hc()(),wi$1(11,"mat-list-item")(12,"button",2),KD(13,"translate"),ih("click",function(){return i.navigateTo("/about")}),FD(14),KD(15,"translate"),Hc()(),wi$1(16,"mat-list-item")(17,"button",3),ih("click",function(){return i.navigateTo("/cv")}),FD(18,"CV"),Hc()(),wi$1(19,"mat-list-item")(20,"button",2),KD(21,"translate"),ih("click",function(){return i.navigateTo("/contact")}),FD(22),KD(23,"translate"),Hc()()()()),t&2&&(Hv(7),Kp("aria-label",XD(8,6,"paintings")),Hv(2),qc(" ",XD(10,8,"paintings")," "),Hv(3),Kp("aria-label",XD(13,10,"statement.title")),Hv(2),qc(" ",XD(15,12,"statement.title")," "),Hv(6),Kp("aria-label",XD(21,14,"menu.contact")),Hv(2),qc(" ",XD(23,16,"menu.contact")," "));},dependencies:[Ye,qe$1,xu,iu],styles:[".center[_ngcontent-%COMP%]{text-align:center}"]});}}return r})();var ja=[{path:"",pathMatch:"full",loadComponent:()=>import('./chunk-C_YJonCO.js').then(r=>r.ArtPiecesListComponent),data:{breadcrumb:"Paintings"}},{path:"artworks",loadComponent:()=>import('./chunk-C_YJonCO.js').then(r=>r.ArtPiecesListComponent),data:{breadcrumb:"Paintings"}},{path:"artwork/:id",loadComponent:()=>import('./chunk-Dc1hg2nT.js').then(r=>r.ArtPieceComponent)},{path:"generative/:id",loadComponent:()=>import('./chunk-CfG6jRXR.js').then(r=>r.GenerativePieceComponent)},{path:"cv",loadComponent:()=>import('./chunk-Bo5b6c4-.js').then(r=>r.CvComponent)},{path:"about",loadComponent:()=>import('./chunk-CrDNal6G.js').then(r=>r.AboutComponent)},{path:"contact",loadComponent:()=>import('./chunk-BwX4WUOM.js').then(r=>r.ContactComponent)},{path:"terms",loadComponent:()=>import('./chunk-CQuYeSFF.js').then(r=>r.TermsComponent)},{path:"privacy",loadComponent:()=>import('./chunk-n3LJJF_J.js').then(r=>r.PrivacyComponent)},{path:"**",component:Ua}];var za={providers:[Lo$1(ja,zo$1(Oo$1),Ho$1()),su({fallbackLang:re.ENGLISH}),{provide:Rt,useClass:Pi},nw(),Wr$1(Yr$2()),Va()]};pn({preStorageUpdate:(r,n)=>r==="session"&&!n.lastArtPiecesUpdate?x$3(w$3({},n),{artPieces:[]}):n});Zi();Er$1(La,za).catch(r=>console.error(r));
export{Kp as $,hh as A,Bl as B,Ch as C,gh as D,lh as E,Fe$3 as F,Ga$1 as G,Hc as H,IE as I,Jp as J,fD as K,L$2 as L,Me$3 as M,Nt$3 as N,pD as O,ct$2 as P,Q$1 as Q,Rt as R,St$1 as S,T$3 as T,Ut$1 as U,KD as V,Wa$1 as W,Xp as X,YE as Y,ZE as Z,XD as _,Ia$1 as a,Yn$1 as a$,Ya$1 as a0,pn$2 as a1,FD as a2,UD as a3,bE as a4,Uc as a5,Wc as a6,aD as a7,iD as a8,qc as a9,Le$3 as aA,M$2 as aB,Bc as aC,eh as aD,$c as aE,vr$1 as aF,qs as aG,Uy as aH,Tr$2 as aI,pt$2 as aJ,_e$2 as aK,zD as aL,S$1 as aM,ch as aN,ue$1 as aO,x$1 as aP,Ld as aQ,yn$2 as aR,le$2 as aS,Li$3 as aT,be$2 as aU,ir$3 as aV,CI as aW,gt$3 as aX,Ki$2 as aY,ne$2 as aZ,Rg as a_,Dh as aa,QD as ab,ZD as ac,ew as ad,Th as ae,uD as af,nh as ag,gD as ah,Ye as ai,qe$1 as aj,r as ak,xu as al,JE as am,KE as an,XE as ao,Fl as ap,Yi$3 as aq,xu$1 as ar,Au as as,zy as at,ot as au,At$1 as av,Vi$1 as aw,$D as ax,wh as ay,Af as az,b$2 as b,Jr as b$,Ye$1 as b0,hr$2 as b1,pr$1 as b2,Wf as b3,De$2 as b4,CE as b5,Gr as b6,LF as b7,Uu as b8,Wu$1 as b9,Dg as bA,qe$3 as bB,ey as bC,wm as bD,Wp as bE,rh as bF,K$4 as bG,yo$2 as bH,Fh as bI,Xc as bJ,Pt$1 as bK,Pm as bL,PF as bM,To$2 as bN,Ue$2 as bO,Eo$3 as bP,$e$1 as bQ,Vr as bR,Hi$3 as bS,yr as bT,NE as bU,As as bV,zt$1 as bW,Qr as bX,Xr as bY,Zr as bZ,Yr as b_,_D as ba,kF as bb,sh as bc,lr$2 as bd,x$3 as be,ut$3 as bf,Ig as bg,Is as bh,wr$2 as bi,Wu as bj,Po$2 as bk,Hu as bl,Cs as bm,wa$1 as bn,Mn$1 as bo,xI as bp,RI as bq,Rs as br,fr$2 as bs,It$5 as bt,se$1 as bu,Je$1 as bv,yr$2 as bw,ae$1 as bx,On$3 as by,Xt$3 as bz,Mt$1 as c,en$2 as c0,ha$1 as c1,An$1 as c2,jn$2 as c3,gr$1 as c4,Lr as c5,Ht$2 as c6,va$1 as c7,Pn$1 as c8,nc as c9,vs as ca,Ds as cb,$u as cc,ar$4 as cd,tr$2 as ce,vr$3 as cf,vt$4 as cg,Z$2 as ch,_a$1 as ci,A$4 as cj,B$6 as ck,it$1 as cl,MF as cm,nr$3 as cn,zi$1 as co,q$1 as cp,zE as cq,Xo$2 as cr,dt$3 as d,wi$1 as e,bh as f,Hv as g,NF as h,iu as i,SF as j,ag as k,ae$2 as l,m$1 as m,nt$1 as n,C$4 as o,pa$2 as p,rr$3 as q,re$3 as r,lD as s,te as t,Gp as u,vl as v,w$3 as w,tw as x,ih as y,z$2 as z};