var p$1=Object.create;var j$5=Object.defineProperty,q$4=Object.defineProperties,r$2=Object.getOwnPropertyDescriptor,s$2=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertyNames,g$5=Object.getOwnPropertySymbols,u$1=Object.getPrototypeOf,k$6=Object.prototype.hasOwnProperty,m$4=Object.prototype.propertyIsEnumerable;var l=(a,b,c)=>b in a?j$5(a,b,{enumerable:true,configurable:true,writable:true,value:c}):a[b]=c,w$3=(a,b)=>{for(var c in b||={})k$6.call(b,c)&&l(a,c,b[c]);if(g$5)for(var c of g$5(b))m$4.call(b,c)&&l(a,c,b[c]);return a},x$2=(a,b)=>q$4(a,s$2(b));var y$2=a=>typeof a=="symbol"?a:a+"",z$4=(a,b)=>{var c={};for(var d in a)k$6.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&g$5)for(var d of g$5(a))b.indexOf(d)<0&&m$4.call(a,d)&&(c[d]=a[d]);return c};var A$4=(a,b)=>()=>{try{return b||a((b={exports:{}}).exports,b),b.exports}catch(c){throw b=0,c}};var v$3=(a,b,c,d)=>{if(b&&typeof b=="object"||typeof b=="function")for(let e of t(b))!k$6.call(a,e)&&e!==c&&j$5(a,e,{get:()=>b[e],enumerable:!(d=r$2(b,e))||d.enumerable});return a};var B$6=(a,b,c)=>(c=a!=null?p$1(u$1(a)):{},v$3(j$5(c,"default",{value:a,enumerable:true}),a));var C$5=(a,b,c)=>new Promise((d,e)=>{var n=f=>{try{h(c.next(f));}catch(i){e(i);}},o=f=>{try{h(c.throw(f));}catch(i){e(i);}},h=f=>f.done?d(f.value):Promise.resolve(f.value).then(n,o);h((c=c.apply(a,b)).next());});function w$2(e){return typeof e=="function"}function zh(e){return w$2(e?.lift)}function E$1(e){return t=>{if(zh(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r);}});throw new TypeError("Unable to lift unknown Observable type")}}function zt$5(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack;});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Pr$2=zt$5(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n;});function ft$6(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1);}}var G$4=class e{constructor(t){this.initialTeardown=t,this.closed=false,this._parentage=null,this._finalizers=null;}unsubscribe(){let t;if(!this.closed){this.closed=true;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(w$2(r))try{r();}catch(i){t=i instanceof Pr$2?i.errors:[i];}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{al(i);}catch(s){t=t??[],s instanceof Pr$2?t=[...t,...s.errors]:t.push(s);}}if(t)throw new Pr$2(t)}}add(t){var n;if(t&&t!==this)if(this.closed)al(t);else {if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this);}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t);}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t;}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&ft$6(n,t);}remove(t){let{_finalizers:n}=this;n&&ft$6(n,t),t instanceof e&&t._removeParent(this);}};G$4.EMPTY=(()=>{let e=new G$4;return e.closed=true,e})();var $i$4=G$4.EMPTY;function Lr$2(e){return e instanceof G$4||e&&"closed"in e&&w$2(e.remove)&&w$2(e.add)&&w$2(e.unsubscribe)}function al(e){w$2(e)?e():e.unsubscribe();}var ve$4={Promise:void 0};var Qt$5={setTimeout(e,t,...n){return setTimeout(e,t,...n)},clearTimeout(e){return (clearTimeout)(e)},delegate:void 0};function Fr$2(e){Qt$5.setTimeout(()=>{throw e});}function pt$5(){}function Zt$4(e){e();}var gt$5=class gt extends G$4{constructor(t){super(),this.isStopped=false,t?(this.destination=t,Lr$2(t)&&t.add(this)):this.destination=Yh;}static create(t,n,r){return new Ve$4(t,n,r)}next(t){this.isStopped?qi$4():this._next(t);}error(t){this.isStopped?qi$4():(this.isStopped=true,this._error(t));}complete(){this.isStopped?qi$4():(this.isStopped=true,this._complete());}unsubscribe(){this.closed||(this.isStopped=true,super.unsubscribe(),this.destination=null);}_next(t){this.destination.next(t);}_error(t){try{this.destination.error(t);}finally{this.unsubscribe();}}_complete(){try{this.destination.complete();}finally{this.unsubscribe();}}};var Gi$4=class Gi{constructor(t){this.partialObserver=t;}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t);}catch(r){jr$2(r);}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t);}catch(r){jr$2(r);}else jr$2(t);}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete();}catch(n){jr$2(n);}}},Ve$4=class Ve extends gt$5{constructor(t,n,r){super();let o;if(w$2(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else {o=t;}this.destination=new Gi$4(o);}};function jr$2(e){Fr$2(e);}function Zh(e){throw e}function qi$4(e,t){}var Yh={closed:true,next:pt$5,error:Zh,complete:pt$5};function D$2(e,t,n,r,o){return new zi$4(e,t,n,r,o)}var zi$4=class zi extends gt$5{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a);}catch(c){t.error(c);}}:super._next,this._error=o?function(a){try{o(a);}catch(c){t.error(c);}finally{this.unsubscribe();}}:super._error,this._complete=r?function(){try{r();}catch(a){t.error(a);}finally{this.unsubscribe();}}:super._complete;}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this));}}};function Me$3(e,t){return E$1((n,r)=>{let o=0;n.subscribe(D$2(r,i=>{r.next(e.call(t,i,o++));}));})}function uT(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i}function dT(e,t){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(e,t)}function pl(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i);})}return new(n||(n=Promise))(function(i,s){function a(u){try{l(r.next(u));}catch(d){s(d);}}function c(u){try{l(r.throw(u));}catch(d){s(d);}}function l(u){u.done?i(u.value):o(u.value).then(a,c);}l((r=r.apply(e,[])).next());})}function fl(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return {next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function mt$6(e){return this instanceof mt$6?(this.v=e,this):new mt$6(e)}function hl(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(f){return function(h){return Promise.resolve(h).then(f,d)}}function a(f,h){r[f]&&(o[f]=function(m){return new Promise(function(_,M){i.push([f,m,_,M])>1||c(f,m);})},h&&(o[f]=h(o[f])));}function c(f,h){try{l(r[f](h));}catch(m){p(i[0][3],m);}}function l(f){f.value instanceof mt$6?Promise.resolve(f.value.v).then(u,d):p(i[0][2],f);}function u(f){c("next",f);}function d(f){c("throw",f);}function p(f,h){f(h),i.shift(),i.length&&c(i[0][0],i[0][1]);}}function gl(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof fl=="function"?fl(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value);})};}function o(i,s,a,c){Promise.resolve(c).then(function(l){i({value:l,done:a});},s);}}var Vr$2=e=>e&&typeof e.length=="number"&&typeof e!="function";function Hr$2(e){return w$2(e?.then)}var Yt$5=typeof Symbol=="function"&&Symbol.observable||"@@observable";function te$3(e){return e}function Kh(...e){return Qi$4(e)}function Qi$4(e){return e.length===0?te$3:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var N$5=(()=>{class e{constructor(n){n&&(this._subscribe=n);}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=Xh(n)?n:new Ve$4(n,r,o);return Zt$4(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i));}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r);}}forEach(n,r){return r=ml(r),new r((o,i)=>{let s=new Ve$4({next:a=>{try{n(a);}catch(c){i(c),s.unsubscribe();}},error:i,complete:o});this.subscribe(s);})}_subscribe(n){var r;return (r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[Yt$5](){return this}pipe(...n){return Qi$4(n)(this)}toPromise(n){return n=ml(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i));})}}return e.create=t=>new e(t),e})();function ml(e){var t;return (t=e??ve$4.Promise)!==null&&t!==void 0?t:Promise}function Jh(e){return e&&w$2(e.next)&&w$2(e.error)&&w$2(e.complete)}function Xh(e){return e&&e instanceof gt$5||Jh(e)&&Lr$2(e)}function Br$2(e){return w$2(e[Yt$5])}function $r$2(e){return Symbol.asyncIterator&&w$2(e?.[Symbol.asyncIterator])}function Ur$2(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function eg(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Wr$2=eg();function qr$2(e){return w$2(e?.[Wr$2])}function Gr$2(e){return hl(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield mt$6(n.read());if(o)return yield mt$6(void 0);yield yield mt$6(r);}}finally{n.releaseLock();}})}function zr$2(e){return w$2(e?.getReader)}function O$3(e){if(e instanceof N$5)return e;if(e!=null){if(Br$2(e))return tg(e);if(Vr$2(e))return ng(e);if(Hr$2(e))return rg(e);if($r$2(e))return yl(e);if(qr$2(e))return og(e);if(zr$2(e))return ig(e)}throw Ur$2(e)}function tg(e){return new N$5(t=>{let n=e[Yt$5]();if(w$2(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function ng(e){return new N$5(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete();})}function rg(e){return new N$5(t=>{e.then(n=>{t.closed||(t.next(n),t.complete());},n=>t.error(n)).then(null,Fr$2);})}function og(e){return new N$5(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete();})}function yl(e){return new N$5(t=>{sg(e,t).catch(n=>t.error(n));})}function ig(e){return yl(Gr$2(e))}function sg(e,t){var n,r,o,i;return pl(this,void 0,void 0,function*(){try{for(n=gl(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s};}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n));}finally{if(o)throw o.error}}t.complete();})}function vl(e,t){return E$1((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(D$2(r,c=>{o?.unsubscribe();let l=0,u=i++;O$3(e(c,u)).subscribe(o=D$2(r,d=>r.next(t?t(c,d,u,l++):d),()=>{o=null,a();}));},()=>{s=!0,a();}));})}var Il=zt$5(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed";});var ne$3=(()=>{class e extends N$5{constructor(){super(),this.closed=false,this.currentObservers=null,this.observers=[],this.isStopped=false,this.hasError=false,this.thrownError=null;}lift(n){let r=new Qr$3(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new Il}next(n){Zt$4(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n);}});}error(n){Zt$4(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=true,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n);}});}complete(){Zt$4(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=true;let{observers:n}=this;for(;n.length;)n.shift().complete();}});}unsubscribe(){this.isStopped=this.closed=true,this.observers=this.currentObservers=null;}get observed(){var n;return ((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?$i$4:(this.currentObservers=null,i.push(n),new G$4(()=>{this.currentObservers=null,ft$6(i,n);}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete();}asObservable(){let n=new N$5;return n.source=this,n}}return e.create=(t,n)=>new Qr$3(t,n),e})(),Qr$3=class Qr extends ne$3{constructor(t,n){super(),this.destination=t,this.source=n;}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t);}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t);}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t);}_subscribe(t){var n,r;return (r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:$i$4}};var Rn$2=class Rn extends ne$3{constructor(t){super(),this._value=t;}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return !n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t);}};var kn$2={now(){return (kn$2.delegate||Date).now()},delegate:void 0};var On$2=class On extends ne$3{constructor(t=1/0,n=1/0,r=kn$2){super(),this._bufferSize=t,this._windowTime=n,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=true,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,n);}next(t){let{isStopped:n,_buffer:r,_infiniteTimeWindow:o,_timestampProvider:i,_windowTime:s}=this;n||(r.push(t),!o&&r.push(i.now()+s)),this._trimBuffer(),super.next(t);}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(t),{_infiniteTimeWindow:r,_buffer:o}=this,i=o.slice();for(let s=0;s<i.length&&!t.closed;s+=r?1:2)t.next(i[s]);return this._checkFinalizedStatuses(t),n}_trimBuffer(){let{_bufferSize:t,_timestampProvider:n,_buffer:r,_infiniteTimeWindow:o}=this,i=(o?1:2)*t;if(t<1/0&&i<r.length&&r.splice(0,r.length-i),!o){let s=n.now(),a=0;for(let c=1;c<r.length&&r[c]<=s;c+=2)a=c;a&&r.splice(0,a+1);}}};var Zr$3=class Zr extends G$4{constructor(t,n){super();}schedule(t,n=0){return this}};var Pn$2={setInterval(e,t,...n){let{delegate:r}=Pn$2;return r?.setInterval?r.setInterval(e,t,...n):setInterval(e,t,...n)},clearInterval(e){return (clearInterval)(e)},delegate:void 0};var Yr$3=class Yr extends Zr$3{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=false;}schedule(t,n=0){var r;if(this.closed)return this;this.state=t;let o=this.id,i=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(i,o,n)),this.pending=true,this.delay=n,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(i,this.id,n),this}requestAsyncId(t,n,r=0){return Pn$2.setInterval(t.flush.bind(t,this),r)}recycleAsyncId(t,n,r=0){if(r!=null&&this.delay===r&&this.pending===false)return n;n!=null&&Pn$2.clearInterval(n);}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=false;let r=this._execute(t,n);if(r)return r;this.pending===false&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null));}_execute(t,n){let r=false,o;try{this.work(t);}catch(i){r=true,o=i||new Error("Scheduled action threw falsy error");}if(r)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:t,scheduler:n}=this,{actions:r}=n;this.work=this.state=this.scheduler=null,this.pending=false,ft$6(r,this),t!=null&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe();}}};var Kt$4=class e{constructor(t,n=e.now){this.schedulerActionCtor=t,this.now=n;}schedule(t,n=0,r){return new this.schedulerActionCtor(this,t).schedule(r,n)}};Kt$4.now=kn$2.now;var Kr$2=class Kr extends Kt$4{constructor(t,n=Kt$4.now){super(t,n),this.actions=[],this._active=false;}flush(t){let{actions:n}=this;if(this._active){n.push(t);return}let r;this._active=true;do if(r=t.execute(t.state,t.delay))break;while(t=n.shift());if(this._active=false,r){for(;t=n.shift();)t.unsubscribe();throw r}}};var yt$5=new Kr$2(Yr$3),El=yt$5;var vt$5=new N$5(e=>e.complete());function Jr$3(e){return e&&w$2(e.schedule)}function Zi$4(e){return e[e.length-1]}function Xr$3(e){return w$2(Zi$4(e))?e.pop():void 0}function Ne$2(e){return Jr$3(Zi$4(e))?e.pop():void 0}function Dl(e,t){return typeof Zi$4(e)=="number"?e.pop():t}function X$4(e,t,n,r=0,o=false){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe();},r);if(e.add(i),!o)return i}function eo$3(e,t=0){return E$1((n,r)=>{n.subscribe(D$2(r,o=>X$4(r,e,()=>r.next(o),t),()=>X$4(r,e,()=>r.complete(),t),o=>X$4(r,e,()=>r.error(o),t)));})}function to$4(e,t=0){return E$1((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t));})}function wl(e,t){return O$3(e).pipe(to$4(t),eo$3(t))}function Tl(e,t){return O$3(e).pipe(to$4(t),eo$3(t))}function Cl(e,t){return new N$5(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule());})})}function bl(e,t){return new N$5(n=>{let r;return X$4(n,t,()=>{r=e[Wr$2](),X$4(n,t,()=>{let o,i;try{({value:o,done:i}=r.next());}catch(s){n.error(s);return}i?n.complete():n.next(o);},0,true);}),()=>w$2(r?.return)&&r.return()})}function no$4(e,t){if(!e)throw new Error("Iterable cannot be null");return new N$5(n=>{X$4(n,t,()=>{let r=e[Symbol.asyncIterator]();X$4(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value);});},0,true);});})}function _l(e,t){return no$4(Gr$2(e),t)}function Ml(e,t){if(e!=null){if(Br$2(e))return wl(e,t);if(Vr$2(e))return Cl(e,t);if(Hr$2(e))return Tl(e,t);if($r$2(e))return no$4(e,t);if(qr$2(e))return bl(e,t);if(zr$2(e))return _l(e,t)}throw Ur$2(e)}function Se$3(e,t){return t?Ml(e,t):O$3(e)}function ag(...e){let t=Ne$2(e);return Se$3(e,t)}function cg(e,t){let n=w$2(e)?e:()=>e,r=o=>o.error(n());return new N$5(r)}function lg(e){return !!e&&(e instanceof N$5||w$2(e.lift)&&w$2(e.subscribe))}var Ln$2=zt$5(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence";});function Nl(e){return e instanceof Date&&!isNaN(e)}var{isArray:ug}=Array;function dg(e,t){return ug(t)?e(...t):e(t)}function ro$2(e){return Me$3(t=>dg(e,t))}var{isArray:fg}=Array,{getPrototypeOf:pg,prototype:hg,keys:gg}=Object;function oo$2(e){if(e.length===1){let t=e[0];if(fg(t))return {args:t,keys:null};if(mg(t)){let n=gg(t);return {args:n.map(r=>t[r]),keys:n}}}return {args:e,keys:null}}function mg(e){return e&&typeof e=="object"&&pg(e)===hg}function io$4(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function yg(...e){let t=Ne$2(e),n=Xr$3(e),{args:r,keys:o}=oo$2(e);if(r.length===0)return Se$3([],t);let i=new N$5(vg(r,t,o?s=>io$4(o,s):te$3));return n?i.pipe(ro$2(n)):i}function vg(e,t,n=te$3){return r=>{Sl(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)Sl(t,()=>{let l=Se$3(e[c],t),u=false;l.subscribe(D$2(r,d=>{i[c]=d,u||(u=true,a--),a||r.next(n(i.slice()));},()=>{--s||r.complete();}));},r);},r);}}function Sl(e,t,n){e?X$4(n,e,t):t();}function xl(e,t,n,r,o,i,s,a){let c=[],l=0,u=0,d=false,p=()=>{d&&!c.length&&!l&&t.complete();},f=m=>l<r?h(m):c.push(m),h=m=>{l++;let _=false;O$3(n(m,u++)).subscribe(D$2(t,M=>{t.next(M);},()=>{_=true;},void 0,()=>{if(_)try{for(l--;c.length&&l<r;){let M=c.shift();s?X$4(t,s,()=>h(M)):h(M);}p();}catch(M){t.error(M);}}));};return e.subscribe(D$2(t,f,()=>{d=true,p();})),()=>{}}function He$3(e,t,n=1/0){return w$2(t)?He$3((r,o)=>Me$3((i,s)=>t(r,i,o,s))(O$3(e(r,o))),n):(typeof t=="number"&&(n=t),E$1((r,o)=>xl(r,o,e,n)))}function Fn$2(e=1/0){return He$3(te$3,e)}function Al(){return Fn$2(1)}function Jt$3(...e){return Al()(Se$3(e,Ne$2(e)))}function Ig(e){return new N$5(t=>{O$3(e()).subscribe(t);})}function Eg(...e){let t=Xr$3(e),{args:n,keys:r}=oo$2(e),o=new N$5(i=>{let{length:s}=n;if(!s){i.complete();return}let a=new Array(s),c=s,l=s;for(let u=0;u<s;u++){let d=false;O$3(n[u]).subscribe(D$2(i,p=>{d||(d=true,l--),a[u]=p;},()=>c--,void 0,()=>{(!c||!d)&&(l||i.next(r?io$4(r,a):a),i.complete());}));}});return t?o.pipe(ro$2(t)):o}function so$3(e=0,t,n=El){let r=-1;return t!=null&&(Jr$3(t)?n=t:r=t),new N$5(o=>{let i=Nl(e)?+e-n.now():e;i<0&&(i=0);let s=0;return n.schedule(function(){o.closed||(o.next(s++),0<=r?this.schedule(void 0,r):o.complete());},i)})}function Dg(...e){let t=Ne$2(e),n=Dl(e,1/0),r=e;return r.length?r.length===1?O$3(r[0]):Fn$2(n)(Se$3(r,t)):vt$5}function Xt$5(e,t){return E$1((n,r)=>{let o=0;n.subscribe(D$2(r,i=>e.call(t,i,o++)&&r.next(i)));})}function Rl(e){return E$1((t,n)=>{let r=!1,o=null,i=null,s=!1,a=()=>{if(i?.unsubscribe(),i=null,r){r=!1;let l=o;o=null,n.next(l);}s&&n.complete();},c=()=>{i=null,s&&n.complete();};t.subscribe(D$2(n,l=>{r=!0,o=l,i||O$3(e(l)).subscribe(i=D$2(n,a,c));},()=>{s=!0,(!r||!i||i.closed)&&n.complete();}));})}function wg(e,t=yt$5){return Rl(()=>so$3(e,t))}function Yi$4(e){return E$1((t,n)=>{let r=null,o=!1,i;r=t.subscribe(D$2(n,void 0,void 0,s=>{i=O$3(e(s,Yi$4(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0;})),o&&(r.unsubscribe(),r=null,i.subscribe(n));})}function kl(e,t,n,r,o){return (i,s)=>{let a=n,c=t,l=0;i.subscribe(D$2(s,u=>{let d=l++;c=a?e(c,u,d):(a=true,u),s.next(c);},o));}}function Tg(e,t){return w$2(t)?He$3(e,t,1):He$3(e,1)}function Cg(e,t=yt$5){return E$1((n,r)=>{let o=null,i=null,s=null,a=()=>{if(o){o.unsubscribe(),o=null;let l=i;i=null,r.next(l);}};function c(){let l=s+e,u=t.now();if(u<l){o=this.schedule(void 0,l-u),r.add(o);return}a();}n.subscribe(D$2(r,l=>{i=l,s=t.now(),o||(o=t.schedule(c,e),r.add(o));},()=>{a(),r.complete();},void 0,()=>{i=o=null;}));})}function Ol(e){return E$1((t,n)=>{let r=!1;t.subscribe(D$2(n,o=>{r=!0,n.next(o);},()=>{r||n.next(e),n.complete();}));})}function It$7(e){return e<=0?()=>vt$5:E$1((t,n)=>{let r=0;t.subscribe(D$2(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete());}));})}function Pl(){return E$1((e,t)=>{e.subscribe(D$2(t,pt$5));})}function Ki$4(e){return Me$3(()=>e)}function Ji$4(e,t){return t?n=>Jt$3(t.pipe(It$7(1),Pl()),n.pipe(Ji$4(e))):He$3((n,r)=>O$3(e(n,r)).pipe(It$7(1),Ki$4(n)))}function Ll(e,t=yt$5){let n=so$3(e,t);return Ji$4(()=>n)}function Fl(e,t=te$3){return e=e??bg,E$1((n,r)=>{let o,i=!0;n.subscribe(D$2(r,s=>{let a=t(s);(i||!e(o,a))&&(i=!1,o=a,r.next(s));}));})}function bg(e,t){return e===t}function jl(e=_g){return E$1((t,n)=>{let r=!1;t.subscribe(D$2(n,o=>{r=!0,n.next(o);},()=>r?n.complete():n.error(e())));})}function _g(){return new Ln$2}function Vl$1(e){return E$1((t,n)=>{try{t.subscribe(n);}finally{n.add(e);}})}function Mg(e,t){let n=arguments.length>=2;return r=>r.pipe(e?Xt$5((o,i)=>e(o,i,r)):te$3,It$7(1),n?Ol(t):jl(()=>new Ln$2))}function Ng(e){return e<=0?()=>vt$5:E$1((t,n)=>{let r=[];t.subscribe(D$2(n,o=>{r.push(o),e<r.length&&r.shift();},()=>{for(let o of r)n.next(o);n.complete();},void 0,()=>{r=null;}));})}function Sg(){return E$1((e,t)=>{let n,r=!1;e.subscribe(D$2(t,o=>{let i=n;n=o,r&&t.next([i,o]),r=!0;}));})}function xg(e,t){return E$1(kl(e,t,arguments.length>=2,!0))}function es$1(e={}){let{connector:t=()=>new ne$3,resetOnError:n=true,resetOnComplete:r=true,resetOnRefCountZero:o=true}=e;return i=>{let s,a,c,l=0,u=false,d=false,p=()=>{a?.unsubscribe(),a=void 0;},f=()=>{p(),s=c=void 0,u=d=false;},h=()=>{let m=s;f(),m?.unsubscribe();};return E$1((m,_)=>{l++,!d&&!u&&p();let M=c=c??t();_.add(()=>{l--,l===0&&!d&&!u&&(a=Xi$4(h,o));}),M.subscribe(_),!s&&l>0&&(s=new Ve$4({next:ye=>M.next(ye),error:ye=>{d=!0,p(),a=Xi$4(f,n,ye),M.error(ye);},complete:()=>{u=!0,p(),a=Xi$4(f,r),M.complete();}}),O$3(m).subscribe(s));})(i)}}function Xi$4(e,t,...n){if(t===true){e();return}if(t===false)return;let r=new Ve$4({next:()=>{r.unsubscribe(),e();}});return O$3(t(...n)).subscribe(r)}function Ag(e,t,n){let r,o=false;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:t=1/0,refCount:o=false,scheduler:n}=e:r=e??1/0,es$1({connector:()=>new On$2(r,t,n),resetOnError:true,resetOnComplete:false,resetOnRefCountZero:o})}function Hl(e){return Xt$5((t,n)=>e<=n)}function Bl(...e){let t=Ne$2(e);return E$1((n,r)=>{(t?Jt$3(e,n,t):Jt$3(e,n)).subscribe(r);})}function Rg(e){return E$1((t,n)=>{O$3(e).subscribe(D$2(n,()=>n.complete(),pt$5)),!n.closed&&t.subscribe(n);})}function kg(e,t=false){return E$1((n,r)=>{let o=0;n.subscribe(D$2(r,i=>{let s=e(i,o++);(s||t)&&r.next(i),!s&&r.complete();}));})}function $l(e,t,n){let r=w$2(e)||t||n?{next:e,error:t,complete:n}:e;return r?E$1((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(D$2(i,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),i.next(c);},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete();},c=>{var l;a=!1,(l=r.error)===null||l===void 0||l.call(r,c),i.error(c);},()=>{var c,l;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r);}));}):te$3}var K$4=null,ao$2=false,Et$7=1,F$4=Symbol("SIGNAL");function v$2(e){let t=K$4;return K$4=e,t}function co$2(){return K$4}var Be$2={version:0,lastCleanEpoch:0,dirty:false,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:false,consumerAllowSignalWrites:false,consumerIsAlwaysLive:false,kind:"unknown",producerMustRecompute:()=>false,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function $e$3(e){if(ao$2)throw new Error("");if(K$4===null)return;K$4.consumerOnSignalRead(e);let t=K$4.producersTail;if(t!==void 0&&t.producer===e)return;let n,r=K$4.recomputing;if(r&&(n=t!==void 0?t.nextProducer:K$4.producers,n!==void 0&&n.producer===e)){K$4.producersTail=n,n.lastReadVersion=e.version,n.knownValidAtEpoch=Et$7;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===K$4&&(!r||o.knownValidAtEpoch===Et$7))return;let i=tn$4(K$4),s={producer:e,consumer:K$4,nextProducer:n,prevConsumer:void 0,knownValidAtEpoch:Et$7,lastReadVersion:e.version,nextConsumer:void 0};K$4.producersTail=s,t!==void 0?t.nextProducer=s:K$4.producers=s,i&&zl(e,s);}function Ul(){Et$7++;}function Tt$7(e){if(!(tn$4(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Et$7)){if(!e.producerMustRecompute(e)&&!Ct$5(e)){en$4(e);return}e.producerRecomputeValue(e),en$4(e);}}function ts$1(e){if(e.consumers===void 0)return;let t=ao$2;ao$2=true;try{for(let n=e.consumers;n!==void 0;n=n.nextConsumer){let r=n.consumer;r.dirty||Wl(r);}}finally{ao$2=t;}}function ns$1(){return K$4?.consumerAllowSignalWrites!==false}function Wl(e){e.dirty=true,ts$1(e),e.consumerMarkedDirty?.(e);}function en$4(e){e.dirty=false,e.lastCleanEpoch=Et$7;}function Ae$2(e){return e&&ql$1(e),v$2(e)}function ql$1(e){if(e.producersTail?.knownValidAtEpoch===Et$7){let t=e.producers;for(;t!==void 0;)t.knownValidAtEpoch=null,t=t.nextProducer;}e.producersTail=void 0,e.recomputing=true;}function Ue$4(e,t){v$2(t),e&&Gl(e);}function Gl(e){e.recomputing=false;let t=e.producersTail,n=t!==void 0?t.nextProducer:e.producers;if(n!==void 0){if(tn$4(e))do n=rs$1(n);while(n!==void 0);t!==void 0?t.nextProducer=void 0:e.producers=void 0;}}function Ct$5(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let n=t.producer,r=t.lastReadVersion;if(r!==n.version||(Tt$7(n),r!==n.version))return  true}return  false}function We$2(e){if(tn$4(e)){let t=e.producers;for(;t!==void 0;)t=rs$1(t);}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0;}function zl(e,t){let n=e.consumersTail,r=tn$4(e);if(n!==void 0?(t.nextConsumer=n.nextConsumer,n.nextConsumer=t):(t.nextConsumer=void 0,e.consumers=t),t.prevConsumer=n,e.consumersTail=t,!r)for(let o=e.producers;o!==void 0;o=o.nextProducer)zl(o.producer,o);}function rs$1(e){let t=e.producer,n=e.nextProducer,r=e.nextConsumer,o=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=o:t.consumersTail=o,o!==void 0)o.nextConsumer=r;else if(t.consumers=r,!tn$4(t)){let i=t.producers;for(;i!==void 0;)i=rs$1(i);}return n}function tn$4(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Vn$2(e,t){return Object.is(e,t)}function Hn$2(e,t){let n=Object.create(Pg);n.computation=e,t!==void 0&&(n.equal=t);let r=()=>{if(Tt$7(n),$e$3(n),n.value===xe$3)throw n.error;return n.value};return r[F$4]=n,r}var Dt$6=Symbol("UNSET"),wt$6=Symbol("COMPUTING"),xe$3=Symbol("ERRORED"),Pg=x$2(w$3({},Be$2),{value:Dt$6,dirty:true,error:null,equal:Vn$2,kind:"computed",producerMustRecompute(e){return e.value===Dt$6||e.value===wt$6},producerRecomputeValue(e){if(e.value===wt$6)throw new Error("");let t=e.value;e.value=wt$6;let n=Ae$2(e),r,o=false;try{r=e.computation(),v$2(null),o=t!==Dt$6&&t!==xe$3&&r!==xe$3&&e.equal(t,r);}catch(i){r=xe$3,e.error=i;}finally{Ue$4(e,n);}if(o){e.value=t;return}e.value=r,e.version++;}});function Lg(){throw new Error}var Ql$1=Lg;function Zl(e){Ql$1(e);}function os$1(e){Ql$1=e;}function is$2(e,t){let n=Object.create(Bn$2);n.value=e,t!==void 0&&(n.equal=t);let r=()=>Yl(n);return r[F$4]=n,[r,s=>et$4(n,s),s=>lo$3(n,s)]}function Yl(e){return $e$3(e),e.value}function et$4(e,t){ns$1()||Zl(e),e.equal(e.value,t)||(e.value=t,jg(e));}function lo$3(e,t){ns$1()||Zl(e),et$4(e,t(e.value));}var Bn$2=x$2(w$3({},Be$2),{equal:Vn$2,value:void 0,kind:"signal"});function jg(e){e.version++,Ul(),ts$1(e);}var ss$1=x$2(w$3({},Be$2),{consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,dirty:true,kind:"effect"});function as$1(e){if(e.dirty=false,e.version>0&&!Ct$5(e))return;e.version++;let t=Ae$2(e);try{e.cleanup(),e.fn();}finally{Ue$4(e,t);}}var cs$1;function uo$2(){return cs$1}function Re$4(e){let t=cs$1;return cs$1=e,t}var Kl=Symbol("NotFound");function nn$4(e){return e===Kl||e?.name==="\u0275NotFound"}function ls$1(e,t,n){let r=Object.create(Vg);r.source=e,r.computation=t,n!=null&&(r.equal=n);let i=()=>{if(Tt$7(r),$e$3(r),r.value===xe$3)throw r.error;return r.value};return i[F$4]=r,i}function Jl(e,t){Tt$7(e),et$4(e,t),en$4(e);}function Xl(e,t){if(Tt$7(e),e.value===xe$3)throw e.error;lo$3(e,t),en$4(e);}var Vg=x$2(w$3({},Be$2),{value:Dt$6,dirty:true,error:null,equal:Vn$2,kind:"linkedSignal",producerMustRecompute(e){return e.value===Dt$6||e.value===wt$6},producerRecomputeValue(e){if(e.value===wt$6)throw new Error("");let t=e.value;e.value=wt$6;let n=Ae$2(e),r,o=false;try{let i=e.source(),s=t!==Dt$6&&t!==xe$3,a=s?{source:e.sourceValue,value:t}:void 0;r=e.computation(i,a),e.sourceValue=i,v$2(null),o=s&&r!==xe$3&&e.equal(t,r);}catch(i){r=xe$3,e.error=i;}finally{Ue$4(e,n);}if(o){e.value=t;return}e.value=r,e.version++;}});function eu(e){let t=v$2(null);try{return e()}finally{v$2(t);}}var vo$3="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",b$4=class b extends Error{code;constructor(t,n){super(zn$2(t,n)),this.code=t;}};function Hg(e){return `NG0${Math.abs(e)}`}function zn$2(e,t){return `${Hg(e)}${t?": "+t:""}`}function R$2(e){for(let t in e)if(e[t]===R$2)return t;throw Error("")}function iu(e,t){for(let n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n]);}function Qn$2(e){if(typeof e=="string")return e;if(Array.isArray(e))return `[${e.map(Qn$2).join(", ")}]`;if(e==null)return ""+e;let t=e.overriddenName||e.name;if(t)return `${t}`;let n=e.toString();if(n==null)return ""+n;let r=n.indexOf(`
`);return r>=0?n.slice(0,r):n}function Io$3(e,t){return e?t?`${e} ${t}`:e:t||""}var Bg=R$2({__forward_ref__:R$2});function Eo$3(e){return e.__forward_ref__=Eo$3,e}function B$5(e){return ws(e)?e():e}function ws(e){return typeof e=="function"&&e.hasOwnProperty(Bg)&&e.__forward_ref__===Eo$3}function re$1(e){return {token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function su(e){return {providers:e.providers||[],imports:e.imports||[]}}function Zn$2(e){return Ug(e,Do$3)}function $g(e){return Zn$2(e)!==null}function Ug(e,t){return e.hasOwnProperty(t)&&e[t]||null}function Wg(e){let t=e?.[Do$3]??null;return t||null}function ds$1(e){return e&&e.hasOwnProperty(po$2)?e[po$2]:null}var Do$3=R$2({\u0275prov:R$2}),po$2=R$2({\u0275inj:R$2}),S$2=class S{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,n){this._desc=t,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=re$1({token:this,providedIn:n.providedIn||"root",factory:n.factory}));}get multi(){return this}toString(){return `InjectionToken ${this._desc}`}};function Ts(e){return e&&!!e.\u0275providers}var Cs=R$2({\u0275cmp:R$2}),bs=R$2({\u0275dir:R$2}),_s$1=R$2({\u0275pipe:R$2}),Ms=R$2({\u0275mod:R$2}),Un$2=R$2({\u0275fac:R$2}),St$6=R$2({__NG_ELEMENT_ID__:R$2}),tu=R$2({__NG_ENV_ID__:R$2});function au(e){return To$3(e),e[Ms]||null}function rt$4(e){return To$3(e),e[Cs]||null}function wo$3(e){return To$3(e),e[bs]||null}function cu(e){return To$3(e),e[_s$1]||null}function To$3(e,t){if(e==null)throw new b$4(-919,false)}function de$1(e){return typeof e=="string"?e:e==null?"":String(e)}var lu=R$2({ngErrorCode:R$2}),qg=R$2({ngErrorMessage:R$2});R$2({ngTokenPath:R$2});function Ns(e,t){return uu("",-200)}function Co$3(e,t){throw new b$4(-201,false)}function uu(e,t,n){let r=new b$4(t,e);return r[lu]=t,r[qg]=e,r}function zg(e){return e[lu]}var fs$1;function du(){return fs$1}function J$3(e){let t=fs$1;return fs$1=e,t}function Ss$1(e,t,n){let r=Zn$2(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&8)return null;if(t!==void 0)return t;Co$3();}var sn$4=globalThis;var Qg={},bt$5=Qg,Zg="__NG_DI_FLAG__",ps=class{injector;constructor(t){this.injector=t;}retrieve(t,n){let r=_t$4(n)||0;try{return this.injector.get(t,r&8?null:bt$5,r)}catch(o){if(nn$4(o))return o;throw o}}};function Yg(e,t=0){let n=uo$2();if(n===void 0)throw new b$4(-203,false);if(n===null)return Ss$1(e,void 0,t);{let r=Kg(t),o=n.retrieve(e,r);if(nn$4(o)){if(r.optional)return null;throw o}return o}}function ke$4(e,t=0){return (du()||Yg)(B$5(e),t)}function T$3(e,t){return ke$4(e,_t$4(t))}function _t$4(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function Kg(e){return {optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function hs$1(e){let t=[];for(let n=0;n<e.length;n++){let r=B$5(e[n]);if(Array.isArray(r)){if(r.length===0)throw new b$4(900,false);let o,i=0;for(let s=0;s<r.length;s++){let a=r[s],c=Jg(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a;}t.push(ke$4(o,i));}else t.push(ke$4(r));}return t}function Jg(e){return e[Zg]}function tt$4(e,t){let n=e.hasOwnProperty(Un$2);return n?e[Un$2]:null}function fu(e,t,n){if(e.length!==t.length)return  false;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return  false}return  true}function pu(e){return e.flat(Number.POSITIVE_INFINITY)}function bo$3(e,t){e.forEach(n=>Array.isArray(n)?bo$3(n,t):t(n));}function xs(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n);}function Yn$2(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function hu(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function gu(e,t,n,r){let o=e.length;if(o==t)e.push(n,r);else if(o===1)e.push(r,e[0]),e[0]=n;else {for(o--,e.push(e[o-1],e[o]);o>t;){let i=o-2;e[o]=e[i],o--;}e[t]=n,e[t+1]=r;}}function _o$3(e,t,n){let r=an$4(e,t);return r>=0?e[r|1]=n:(r=~r,gu(e,r,t,n)),r}function Mo$2(e,t){let n=an$4(e,t);if(n>=0)return e[n|1]}function an$4(e,t){return Xg(e,t,1)}function Xg(e,t,n){let r=0,o=e.length>>n;for(;o!==r;){let i=r+(o-r>>1),s=e[i<<n];if(t===s)return i<<n;s>t?o=i:r=i+1;}return ~(o<<n)}var ot$6={},z$3=[],Kn$2=new S$2(""),Jn$1=new S$2("",-1),As=new S$2(""),on$4=class on{get(t,n=bt$5){if(n===bt$5){let o=uu("",-201);throw o.name="\u0275NotFound",o}return n}};function Rs(e){return {\u0275providers:e}}function mu(...e){return {\u0275providers:ks(true,e),\u0275fromNgModule:true}}function ks(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s);};return bo$3(t,s=>{let a=s;ho$2(a,i,[],r)&&(o||=[],o.push(a));}),o!==void 0&&yu(o,i),n}function yu(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];Os(o,i=>{t(i,r);});}}function ho$2(e,t,n,r){if(e=B$5(e),!e)return  false;let o=null,i=ds$1(e),s=!i&&rt$4(e);if(!i&&!s){let c=e.ngModule;if(i=ds$1(c),i)o=c;else return  false}else {if(s&&!s.standalone)return  false;o=e;}let a=r.has(o);if(s){if(a)return  false;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)ho$2(l,t,n,r);}}else if(i){if(i.imports!=null&&!a){r.add(o);let l;bo$3(i.imports,u=>{ho$2(u,t,n,r)&&(l||=[],l.push(u));}),l!==void 0&&yu(l,t);}if(!a){let l=tt$4(o)||(()=>new o);t({provide:o,useFactory:l,deps:z$3},o),t({provide:As,useValue:o,multi:true},o),t({provide:Kn$2,useValue:()=>ke$4(o),multi:true},o);}let c=i.providers;if(c!=null&&!a){let l=e;Os(c,u=>{t(u,l);});}}else return  false;return o!==e&&e.providers!==void 0}function Os(e,t){for(let n of e)Ts(n)&&(n=n.\u0275providers),Array.isArray(n)?Os(n,t):t(n);}var em=R$2({provide:String,useValue:R$2});function vu(e){return e!==null&&typeof e=="object"&&em in e}function tm$1(e){return !!(e&&e.useExisting)}function nm(e){return !!(e&&e.useFactory)}function Mt$4(e){return typeof e=="function"}function Iu(e){return !!e.useClass}var Ps$1=new S$2(""),fo$3={},nu={},us$1;function cn$4(){return us$1===void 0&&(us$1=new on$4),us$1}var ce$3=class ce{},Nt$4=class Nt extends ce$3{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=false;injectorDefTypes;constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,ms(t,s=>this.processProvider(s)),this.records.set(Jn$1,rn$4(void 0,this)),o.has("environment")&&this.records.set(ce$3,rn$4(void 0,this));let i=this.records.get(Ps$1);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(As,z$3,{self:true}));}retrieve(t,n){let r=_t$4(n)||0;try{return this.get(t,bt$5,r)}catch(o){if(nn$4(o))return o;throw o}}destroy(){$n$2(this),this._destroyed=true;let t=v$2(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r();}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),v$2(t);}}onDestroy(t){return $n$2(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){$n$2(this);let n=Re$4(this),r=J$3(void 0);try{return t()}finally{Re$4(n),J$3(r);}}get(t,n=bt$5,r){if($n$2(this),t.hasOwnProperty(tu))return t[tu](this);let o=_t$4(r),s=Re$4(this),a=J$3(void 0);try{if(!(o&4)){let l=this.records.get(t);if(l===void 0){let u=am(t)&&Zn$2(t);u&&this.injectableDefInScope(u)?l=rn$4(gs$1(t),fo$3):l=null,this.records.set(t,l);}if(l!=null)return this.hydrate(t,l,o)}let c=o&2?cn$4():this.parent;return n=o&8&&n===bt$5?null:n,c.get(t,n)}catch(c){let l=zg(c);throw l===-200||l===-201?new b$4(l,null):c}finally{J$3(a),Re$4(s);}}resolveInjectorInitializers(){let t=v$2(null),n=Re$4(this),r=J$3(void 0);try{let i=this.get(Kn$2,z$3,{self:!0});for(let s of i)s();}finally{Re$4(n),J$3(r),v$2(t);}}toString(){return "R3Injector[...]"}processProvider(t){t=B$5(t);let n=Mt$4(t)?t:B$5(t&&t.provide),r=om(t);if(!Mt$4(t)&&t.multi===true){let o=this.records.get(n);o||(o=rn$4(void 0,fo$3,true),o.factory=()=>hs$1(o.multi),this.records.set(n,o)),n=t,o.multi.push(t);}this.records.set(n,r);}hydrate(t,n,r){let o=v$2(null);try{if(n.value===nu)throw Ns("");return n.value===fo$3&&(n.value=nu,n.value=n.factory(void 0,r)),typeof n.value=="object"&&n.value&&sm(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{v$2(o);}}injectableDefInScope(t){if(!t.providedIn)return  false;let n=B$5(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1);}};function gs$1(e){let t=Zn$2(e),n=t!==null?t.factory:tt$4(e);if(n!==null)return n;if(e instanceof S$2)throw new b$4(-204,false);if(e instanceof Function)return rm$1(e);throw new b$4(-204,false)}function rm$1(e){if(e.length>0)throw new b$4(-204,false);let n=Wg(e);return n!==null?()=>n.factory(e):()=>new e}function om(e){if(vu(e))return rn$4(void 0,e.useValue);{let t=Ls(e);return rn$4(t,fo$3)}}function Ls(e,t,n){let r;if(Mt$4(e)){let o=B$5(e);return tt$4(o)||gs$1(o)}else if(vu(e))r=()=>B$5(e.useValue);else if(nm(e))r=()=>e.useFactory(...hs$1(e.deps||[]));else if(tm$1(e))r=(o,i)=>ke$4(B$5(e.useExisting),i!==void 0&&i&8?8:void 0);else {let o=B$5(e&&(e.useClass||e.provide));if(im(e))r=()=>new o(...hs$1(e.deps));else return tt$4(o)||gs$1(o)}return r}function $n$2(e){if(e.destroyed)throw new b$4(-205,false)}function rn$4(e,t,n=false){return {factory:e,value:t,multi:n?[]:void 0}}function im(e){return !!e.deps}function sm(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function am(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function ms(e,t){for(let n of e)Array.isArray(n)?ms(n,t):n&&Ts(n)?ms(n.\u0275providers,t):t(n);}function No$3(e,t){let n;e instanceof Nt$4?($n$2(e),n=e):n=new ps(e);let o=Re$4(n),i=J$3(void 0);try{return t()}finally{Re$4(o),J$3(i);}}function Eu(){return du()!==void 0||uo$2()!=null}var Ie$2=0,y$1=1,I$5=2,$$6=3,fe$3=4,Q$6=5,xt$3=6,ln$4=7,H$3=8,Z$4=9,Ee$4=10,A$3=11,un$4=12,Fs=13,it$3=14,Y$4=15,st$6=16,At$7=17,Pe$4=18,De$5=19,js=20,Ge$2=21,So$3=22,nt$3=23,oe=24,Rt$4=25,pe$4=26,L$3=27,Du=1,Vs=6,at$6=7,Xn$1=8,kt$4=9,j$4=10;function Ze$2(e){return Array.isArray(e)&&typeof e[Du]=="object"}function he$2(e){return Array.isArray(e)&&e[Du]===true}function Hs(e){return (e.flags&4)!==0}function Ye$3(e){return e.componentOffset>-1}function dn$4(e){return (e.flags&1)===1}function we$4(e){return !!e.template}function fn$4(e){return (e[I$5]&512)!==0}function Ot$4(e){return (e[I$5]&256)===256}var Bs="svg",wu="math";function ge$4(e){for(;Array.isArray(e);)e=e[Ie$2];return e}function $s(e,t){return ge$4(t[e])}function ee$3(e,t){return ge$4(t[e.index])}function xo$3(e,t){return e.data[t]}function Ao$3(e,t){return e[t]}function Us(e,t,n,r){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=r;}function me$4(e,t){let n=t[e];return Ze$2(n)?n:n[Ie$2]}function Tu(e){return (e[I$5]&4)===4}function Ro$3(e){return (e[I$5]&128)===128}function Cu(e){return he$2(e[$$6])}function ie$1(e,t){return t==null?null:e[t]}function Ws(e){e[At$7]=0;}function qs(e){e[I$5]&1024||(e[I$5]|=1024,Ro$3(e)&&Pt$5(e));}function bu(e,t){for(;e>0;)t=t[it$3],e--;return t}function er$3(e){return !!(e[I$5]&9216||e[oe]?.dirty)}function ko$3(e){e[Ee$4].changeDetectionScheduler?.notify(8),e[I$5]&64&&(e[I$5]|=1024),er$3(e)&&Pt$5(e);}function Pt$5(e){e[Ee$4].changeDetectionScheduler?.notify(0);let t=ze$3(e);for(;t!==null&&!(t[I$5]&8192||(t[I$5]|=8192,!Ro$3(t)));)t=ze$3(t);}function Oo$3(e,t){if(Ot$4(e))throw new b$4(911,false);e[Ge$2]===null&&(e[Ge$2]=[]),e[Ge$2].push(t);}function _u(e,t){if(e[Ge$2]===null)return;let n=e[Ge$2].indexOf(t);n!==-1&&e[Ge$2].splice(n,1);}function ze$3(e){let t=e[$$6];return he$2(t)?t[$$6]:t}function Gs(e){return e[ln$4]??=[]}function zs(e){return e.cleanup??=[]}function Mu(e,t,n,r){let o=Gs(t);o.push(n),e.firstCreatePass&&zs(e).push(r,o.length-1);}var C$4={lFrame:Hu(null),bindingsEnabled:true,skipHydrationRootTNode:null};var ys=false;function Nu(){return C$4.lFrame.elementDepthCount}function Su(){C$4.lFrame.elementDepthCount++;}function Qs(){C$4.lFrame.elementDepthCount--;}function Po$3(){return C$4.bindingsEnabled}function Zs(){return C$4.skipHydrationRootTNode!==null}function Ys(e){return C$4.skipHydrationRootTNode===e}function Ks(){C$4.skipHydrationRootTNode=null;}function g$4(){return C$4.lFrame.lView}function P$3(){return C$4.lFrame.tView}function xu(e){return C$4.lFrame.contextLView=e,e[H$3]}function Au(e){return C$4.lFrame.contextLView=null,e}function V$2(){let e=Js();for(;e!==null&&e.type===64;)e=e.parent;return e}function Js(){return C$4.lFrame.currentTNode}function Ru(){let e=C$4.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function pn$3(e,t){let n=C$4.lFrame;n.currentTNode=e,n.isParent=t;}function Xs(){return C$4.lFrame.isParent}function ea$1(){C$4.lFrame.isParent=false;}function ku(){return C$4.lFrame.contextLView}function ta$1(){return ys}function Wn$2(e){let t=ys;return ys=e,t}function tr$3(){let e=C$4.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function na$1(){return C$4.lFrame.bindingIndex}function Ou(e){return C$4.lFrame.bindingIndex=e}function Ke$3(){return C$4.lFrame.bindingIndex++}function nr$4(e){let t=C$4.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function Pu(){return C$4.lFrame.inI18n}function Lu(e,t){let n=C$4.lFrame;n.bindingIndex=n.bindingRootIndex=e,Lo$3(t);}function Fu(){return C$4.lFrame.currentDirectiveIndex}function Lo$3(e){C$4.lFrame.currentDirectiveIndex=e;}function ju$1(e){let t=C$4.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function Fo$2(){return C$4.lFrame.currentQueryIndex}function rr$4(e){C$4.lFrame.currentQueryIndex=e;}function cm(e){let t=e[y$1];return t.type===2?t.declTNode:t.type===1?e[Q$6]:null}function ra$1(e,t,n){if(n&4){let o=t,i=e;for(;o=o.parent,o===null&&!(n&1);)if(o=cm(i),o===null||(i=i[it$3],o.type&10))break;if(o===null)return  false;t=o,e=i;}let r=C$4.lFrame=Vu();return r.currentTNode=t,r.lView=e,true}function jo$3(e){let t=Vu(),n=e[y$1];C$4.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=false;}function Vu(){let e=C$4.lFrame,t=e===null?null:e.child;return t===null?Hu(e):t}function Hu(e){let t={currentTNode:null,isParent:true,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:false};return e!==null&&(e.child=t),t}function Bu(){let e=C$4.lFrame;return C$4.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var oa$1=Bu;function Vo$2(){let e=Bu();e.isParent=true,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0;}function $u(e){return (C$4.lFrame.contextLView=bu(e,C$4.lFrame.contextLView))[H$3]}function Te$2(){return C$4.lFrame.selectedIndex}function ct$6(e){C$4.lFrame.selectedIndex=e;}function hn$4(){let e=C$4.lFrame;return xo$3(e.tView,e.selectedIndex)}function Uu$1(){C$4.lFrame.currentNamespace=Bs;}function Wu(){lm$1();}function lm$1(){C$4.lFrame.currentNamespace=null;}function ia$1(){return C$4.lFrame.currentNamespace}var qu=true;function Ho$3(){return qu}function or$4(e){qu=e;}function sa(){let e,t;return {promise:new Promise((r,o)=>{e=r,t=o;}),resolve:e,reject:t}}function vs(e,t=null,n=null,r){let o=aa(e,t,n);return o.resolveInjectorInitializers(),o}function aa(e,t=null,n=null,r,o=new Set){let i=[n||z$3,mu(e)];return new Nt$4(i,t||cn$4(),null,o)}var le$2=class e{static THROW_IF_NOT_FOUND=bt$5;static NULL=new on$4;static create(t,n){if(Array.isArray(t))return vs({name:""},n,t);{let r=t.name??"";return vs({name:r},t.parent,t.providers)}}static \u0275prov=re$1({token:e,providedIn:"any",factory:()=>ke$4(Jn$1)});static __NG_ELEMENT_ID__=-1},ir$4=new S$2(""),Le$4=(()=>{class e{static __NG_ELEMENT_ID__=um;static __NG_ENV_ID__=n=>n}return e})(),go$3=class go extends Le$4{_lView;constructor(t){super(),this._lView=t;}get destroyed(){return Ot$4(this._lView)}onDestroy(t){let n=this._lView;return Oo$3(n,t),()=>_u(n,t)}};function um(){return new go$3(g$4())}var Gu=false,zu=new S$2(""),Lt$4=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=false;pendingTask=new Rn$2(false);debugTaskTracker=T$3(zu,{optional:true});get hasPendingTasks(){return this.destroyed?false:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new N$5(n=>{n.next(false),n.complete();}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(true);let n=this.taskId++;return this.pendingTasks.add(n),this.debugTaskTracker?.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.debugTaskTracker?.remove(n),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(false);}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(false),this.destroyed=true,this.pendingTask.unsubscribe();}static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>new e})}return e})(),Is=class extends ne$3{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=false){super(),this.__isAsync=t,Eu()&&(this.destroyRef=T$3(Le$4,{optional:true})??void 0,this.pendingTasks=T$3(Lt$4,{optional:true})??void 0);}emit(t){let n=v$2(null);try{super.next(t);}finally{v$2(n);}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c);}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof G$4&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{t(n);}finally{r!==void 0&&this.pendingTasks?.remove(r);}});}}},qe$3=Is;function mo$2(...e){}function ca$1(e){let t,n;function r(){e=mo$2;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t);}catch(o){}}return t=setTimeout(()=>{e(),r();}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r();})),()=>r()}function Qu(e){return queueMicrotask(()=>e()),()=>{e=mo$2;}}var la="isAngularZone",qn$2=la+"_ID",dm=0,ue$1=class e{hasPendingMacrotasks=false;hasPendingMicrotasks=false;isStable=true;onUnstable=new qe$3(false);onMicrotaskEmpty=new qe$3(false);onStable=new qe$3(false);onError=new qe$3(false);constructor(t){let{enableLongStackTrace:n=false,shouldCoalesceEventChangeDetection:r=false,shouldCoalesceRunChangeDetection:o=false,scheduleInRootZone:i=Gu}=t;if(typeof Zone>"u")throw new b$4(908,false);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=false,s.scheduleInRootZone=i,hm(s);}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(la)===true}static assertInAngularZone(){if(!e.isInAngularZone())throw new b$4(909,false)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new b$4(909,false)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,fm$1,mo$2,mo$2);try{return i.runTask(s,n,r)}finally{i.cancelTask(s);}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},fm$1={};function ua$1(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null);}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null));}finally{e.isStable=true;}}}function pm(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=true;function t(){ca$1(()=>{e.callbackScheduled=false,Es(e),e.isCheckStableRunning=true,ua$1(e),e.isCheckStableRunning=false;});}e.scheduleInRootZone?Zone.root.run(()=>{t();}):e._outer.run(()=>{t();}),Es(e);}function hm(e){let t=()=>{pm(e);},n=dm++;e._inner=e._inner.fork({name:"angular",properties:{[la]:true,[qn$2]:n,[qn$2+n]:true},onInvokeTask:(r,o,i,s,a,c)=>{if(gm(c))return r.invokeTask(i,s,a,c);try{return ru(e),r.invokeTask(i,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),ou(e);}},onInvoke:(r,o,i,s,a,c,l)=>{try{return ru(e),r.invoke(i,s,a,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!mm(c)&&t(),ou(e);}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Es(e),ua$1(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask));},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),false)});}function Es(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===true?e.hasPendingMicrotasks=true:e.hasPendingMicrotasks=false;}function ru(e){e._nesting++,e.isStable&&(e.isStable=false,e.onUnstable.emit(null));}function ou(e){e._nesting--,ua$1(e);}var Gn$2=class Gn{hasPendingMicrotasks=false;hasPendingMacrotasks=false;isStable=true;onUnstable=new qe$3;onMicrotaskEmpty=new qe$3;onStable=new qe$3;onError=new qe$3;run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function gm(e){return Zu(e,"__ignore_ng_zone__")}function mm(e){return Zu(e,"__scheduler_tick__")}function Zu(e,t){return !Array.isArray(e)||e.length!==1?false:e[0]?.data?.[t]===true}var Qe$2=class Qe{_console=console;handleError(t){this._console.error("ERROR",t);}},Ft$4=new S$2("",{factory:()=>{let e=T$3(ue$1),t=T$3(ce$3),n;return r=>{e.runOutsideAngular(()=>{t.destroyed&&!n?setTimeout(()=>{throw r}):(n??=t.get(Qe$2),n.handleError(r));});}}}),Yu={provide:Kn$2,useValue:()=>{T$3(Qe$2,{optional:true});},multi:true};function Fe$3(e,t){let [n,r,o]=is$2(e,t?.equal),i=n;i[F$4];return i.set=r,i.update=o,i.asReadonly=gn$4.bind(i),i}function gn$4(){let e=this[F$4];if(e.readonlyFn===void 0){let t=()=>this();t[F$4]=e,e.readonlyFn=t;}return e.readonlyFn}var da$1=new S$2("",{factory:()=>ym}),ym="ng";var Ku=new S$2(""),vm=new S$2("",{providedIn:"platform",factory:()=>"unknown"}),Im=new S$2(""),Em=new S$2("",{factory:()=>T$3(ir$4).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Bo$2=(()=>{class e{static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>{let n=new e;return n.store=Ju(T$3(ir$4),T$3(da$1)),n}});store={};onSerializeCallbacks={};get(n,r){return this.store[n]!==void 0?this.store[n]:r}set(n,r){this.store[n]=r;}remove(n){delete this.store[n];}hasKey(n){return this.store.hasOwnProperty(n)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(n,r){this.onSerializeCallbacks[n]=r;}toJson(){for(let n in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(n))try{this.store[n]=this.onSerializeCallbacks[n]();}catch(r){console.warn("Exception in onSerialize callback: ",r);}return JSON.stringify(this.store).replace(/</g,"\\u003C").replace(/\//g,"\\u002F")}}return e})();function Ju(e,t){let n=e.getElementById(t+"-state");if(n?.tagName==="SCRIPT"&&n.textContent)try{return JSON.parse(n.textContent)}catch(r){console.warn("Exception while restoring TransferState for app "+t,r);}return {}}var mn$4=(()=>{class e{view;node;constructor(n,r){this.view=n,this.node=r;}static __NG_ELEMENT_ID__=Dm}return e})();function Dm(){return new mn$4(g$4(),V$2())}var Oe$5=class Oe{},sr$4=new S$2("",{factory:()=>true});var fa$1=new S$2(""),$o$4=(()=>{class e{static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>new Ds})}return e})(),Ds=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t);}schedule(t){t.dirty&&this.dirtyEffectCount++;}remove(t){let n=t.zone,r=this.queues.get(n);r.has(t)&&(r.delete(t),t.dirty&&this.dirtyEffectCount--);}enqueue(t){let n=t.zone;this.queues.has(n)||this.queues.set(n,new Set);let r=this.queues.get(n);r.has(t)||r.add(t);}flush(){for(;this.dirtyEffectCount>0;){let t=false;for(let[n,r]of this.queues)n===null?t||=this.flushQueue(r):t||=n.run(()=>this.flushQueue(r));t||(this.dirtyEffectCount=0);}}flushQueue(t){let n=false;for(let r of t)r.dirty&&(this.dirtyEffectCount--,n=true,r.run());return n}},yo$3=class yo{[F$4];constructor(t){this[F$4]=t;}destroy(){this[F$4].destroy();}};function pa$1(e,t){let n=t?.injector??T$3(le$2),r=t?.manualCleanup!==true?n.get(Le$4):null,o,i=n.get(mn$4,null,{optional:true}),s=n.get(Oe$5);return i!==null?(o=Cm(i.view,s,e),r instanceof go$3&&r._lView===i.view&&(r=null)):o=bm(e,n.get($o$4),s),o.injector=n,r!==null&&(o.onDestroyFns=[r.onDestroy(()=>o.destroy())]),new yo$3(o)}var Xu=x$2(w$3({},ss$1),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Wn$2(false);try{as$1(this);}finally{Wn$2(e);}},cleanup(){if(!this.cleanupFns?.length)return;let e=v$2(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()();}finally{this.cleanupFns=[],v$2(e);}}}),wm=x$2(w$3({},Xu),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12);},destroy(){if(We$2(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this);}}),Tm$1=x$2(w$3({},Xu),{consumerMarkedDirty(){this.view[I$5]|=8192,Pt$5(this.view),this.notifier.notify(13);},destroy(){if(We$2(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[nt$3]?.delete(this);}});function Cm(e,t,n){let r=Object.create(Tm$1);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=t,r.fn=ed(r,n),e[nt$3]??=new Set,e[nt$3].add(r),r.consumerMarkedDirty(r),r}function bm(e,t,n){let r=Object.create(wm);return r.fn=ed(r,e),r.scheduler=t,r.notifier=n,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function ed(e,t){return ()=>{t(n=>(e.cleanupFns??=[]).push(n));}}function ar$4(e){return typeof e=="function"&&e[F$4]!==void 0}function Uo$3(e){return ar$4(e)&&typeof e.set=="function"}var Wo$2=(()=>{class e{internalPendingTasks=T$3(Lt$4);scheduler=T$3(Oe$5);errorHandler=T$3(Ft$4);add(){let n=this.internalPendingTasks.add();return ()=>{this.internalPendingTasks.has(n)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(n));}}run(n){let r=this.add();try{n().catch(this.errorHandler).finally(r);}catch(o){this.errorHandler(o),r();}}static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>new e})}return e})();function Dr$2(e){return {toString:e}.toString()}var x$1=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(x$1||{}),ti$2=class ti{previousValue;currentValue;firstChange;constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r;}isFirstChange(){return this.firstChange}};function Wd(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r;}var qd=null,Pm=(()=>{qd=td$1;let e=()=>td$1;return e.ngInherit=true,e})();function Lm(){return qd}function td$1(e){return e.type.prototype.ngOnChanges&&(e.setInput=jm),Fm}function Fm(){let e=Gd(this),t=e?.current;if(t){let n=e.previous;if(n===ot$6)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t);}}function jm(e,t,n,r,o){let i=this.declaredInputs[r],s=Gd(e)||Vm(e,{previous:ot$6,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[i];a[i]=new ti$2(l&&l.currentValue,n,c===ot$6),Wd(e,t,o,n);}var Ca$1="__ngSimpleChanges__";function Gd(e){return Object.hasOwn(e,Ca$1)&&e[Ca$1]||null}function Vm(e,t){return e[Ca$1]=t}var nd=[];var k$5=function(e,t=null,n){for(let r=0;r<nd.length;r++){let o=nd[r];o(e,t,n);}};function Hm(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=Lm()(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s);}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i));}function zd(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),l&&((e.viewHooks??=[]).push(n,l),(e.viewCheckHooks??=[]).push(n,l)),u!=null&&(e.destroyHooks??=[]).push(n,u);}}function Zo$3(e,t,n){Qd(e,t,3,n);}function Yo$2(e,t,n,r){(e[I$5]&3)===n&&Qd(e,t,n,r);}function ha$1(e,t){let n=e[I$5];(n&3)===t&&(n&=16383,n+=1,e[I$5]=n);}function Qd(e,t,n,r){let o=r!==void 0?e[At$7]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[At$7]+=65536),(a<i||i==-1)&&(Bm(e,n,t,c),e[At$7]=(e[At$7]&4294901760)+c+2),c++;}function rd(e,t){k$5(x$1.LifecycleHookStart,e,t);let n=v$2(null);try{t.call(e);}finally{v$2(n),k$5(x$1.LifecycleHookEnd,e,t);}}function Bm(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[I$5]>>14<e[At$7]>>16&&(e[I$5]&3)===t&&(e[I$5]+=16384,rd(a,i)):rd(a,i);}var vn$4=-1,Bt$5=class Bt{factory;name;injectImpl;resolving=false;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,n,r,o){this.factory=t,this.name=o,this.canSeeViewProviders=n,this.injectImpl=r;}};function $m(e){return (e.flags&8)!==0}function Um(e){return (e.flags&16)!==0}function Wm(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i);}else {let i=o,s=n[++r];qm(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++;}}return r}function Zd(e){return e===3||e===4||e===6}function qm(e){return e.charCodeAt(0)===64}function In$2(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else {let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?od(e,n,o,null,t[++r]):od(e,n,o,null,null));}}return e}function od(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){o!==null&&(e[i+1]=o);return}i++,o!==null&&i++;}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),o!==null&&e.splice(i++,0,o);}function Yd(e){return e!==vn$4}function ni$2(e){return e&32767}function Gm(e){return e>>16}function ri$2(e,t){let n=Gm(e),r=t;for(;n>0;)r=r[it$3],n--;return r}var ba$1=true;function oi$2(e){let t=ba$1;return ba$1=e,t}var zm=256,Kd=zm-1,Jd=5,Qm=0,je$3={};function Zm(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty(St$6)&&(r=n[St$6]),r==null&&(r=n[St$6]=Qm++);let o=r&Kd,i=1<<o;t.data[e+(o>>Jd)]|=i;}function ii$2(e,t){let n=Xd(e,t);if(n!==-1)return n;let r=t[y$1];r.firstCreatePass&&(e.injectorIndex=t.length,ga$1(r.data,e),ga$1(t,null),ga$1(r.blueprint,null));let o=ic(e,t),i=e.injectorIndex;if(Yd(o)){let s=ni$2(o),a=ri$2(o,t),c=a[y$1].data;for(let l=0;l<8;l++)t[i+l]=a[s+l]|c[s+l];}return t[i+8]=o,i}function ga$1(e,t){e.push(0,0,0,0,0,0,0,0,t);}function Xd(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function ic(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=of$1(o),r===null)return vn$4;if(n++,o=o[it$3],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return vn$4}function _a$1(e,t,n){Zm(e,t,n);}function Ym(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(Zd(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else {if(i===t)return n[o+1];o=o+2;}}}return null}function ef(e,t,n){if(n&8||e!==void 0)return e;Co$3();}function tf(e,t,n,r){if(n&8&&r===void 0&&(r=null),(n&3)===0){let o=e[Z$4],i=J$3(void 0);try{return o?o.get(t,r,n&8):Ss$1(t,r,n&8)}finally{J$3(i);}}return ef(r,t,n)}function nf(e,t,n,r=0,o){if(e!==null){if(t[I$5]&2048&&!(r&2)){let s=ty(e,t,n,r,je$3);if(s!==je$3)return s}let i=rf(e,t,n,r,je$3);if(i!==je$3)return i}return tf(t,n,r,o)}function rf(e,t,n,r,o){let i=Jm(n);if(typeof i=="function"){if(!ra$1(t,e,r))return r&1?ef(o,n,r):tf(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&8))Co$3(n);else return s}finally{oa$1();}}else if(typeof i=="number"){let s=null,a=Xd(e,t),c=vn$4,l=r&1?t[Y$4][Q$6]:null;for((a===-1||r&4)&&(c=a===-1?ic(e,t):t[a+8],c===vn$4||!sd(r,false)?a=-1:(s=t[y$1],a=ni$2(c),t=ri$2(c,t)));a!==-1;){let u=t[y$1];if(id(i,a,u.data)){let d=Km(a,t,n,s,r,l);if(d!==je$3)return d}c=t[a+8],c!==vn$4&&sd(r,t[y$1].data[a+8]===l)&&id(i,a,t)?(s=u,a=ni$2(c),t=ri$2(c,t)):a=-1;}}return o}function Km(e,t,n,r,o,i){let s=t[y$1],a=s.data[e+8],c=r==null?Ye$3(a)&&ba$1:r!=s&&(a.type&3)!==0,l=o&1&&i===a,u=Ko$2(a,s,n,c,l);return u!==null?dr$4(t,s,u,a,o):je$3}function Ko$2(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,l=e.directiveEnd,u=i>>20,d=r?a:a+u,p=o?a+u:l;for(let f=d;f<p;f++){let h=s[f];if(f<c&&n===h||f>=c&&h.type===n)return f}if(o){let f=s[c];if(f&&we$4(f)&&f.type===n)return c}return null}function dr$4(e,t,n,r,o){let i=e[n],s=t.data;if(i instanceof Bt$5){let a=i;if(a.resolving)throw Ns();let c=oi$2(a.canSeeViewProviders);a.resolving=true;s[n].type||s[n];let d=a.injectImpl?J$3(a.injectImpl):null;ra$1(e,r,0);try{i=e[n]=a.factory(void 0,o,s,e,r),t.firstCreatePass&&n>=r.directiveStart&&Hm(n,s[n],t);}finally{d!==null&&J$3(d),oi$2(c),a.resolving=false,oa$1();}}return i}function Jm(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(St$6)?e[St$6]:void 0;return typeof t=="number"?t>=0?t&Kd:Xm:t}function id(e,t,n){let r=1<<e;return !!(n[t+(e>>Jd)]&r)}function sd(e,t){return !(e&2)&&!(e&1&&t)}var lt$6=class lt{_tNode;_lView;constructor(t,n){this._tNode=t,this._lView=n;}get(t,n,r){return nf(this._tNode,this._lView,t,_t$4(r),n)}};function Xm(){return new lt$6(V$2(),g$4())}function ey(e){return Dr$2(()=>{let t=e.prototype.constructor,n=t[Un$2]||Ma(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[Un$2]||Ma(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o);}return i=>new i})}function Ma(e){return ws(e)?()=>{let t=Ma(B$5(e));return t&&t()}:tt$4(e)}function ty(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[I$5]&2048&&!fn$4(s);){let a=rf(i,s,n,r|2,je$3);if(a!==je$3)return a;let c=i.parent;if(!c){let l=s[js];if(l){let u=l.get(n,je$3,r&-5);if(u!==je$3)return u}c=of$1(s),s=s[it$3];}i=c;}return o}function of$1(e){let t=e[y$1],n=t.type;return n===2?t.declTNode:n===1?e[Q$6]:null}function sf(e){return Ym(V$2(),e)}function wr$2(e){return {token:e.token,providedIn:e.autoProvided===false?null:"root",factory:e.factory,value:void 0}}function ny(){return Mn$2(V$2(),g$4())}function Mn$2(e,t){return new Tr$2(ee$3(e,t))}var Tr$2=(()=>{class e{nativeElement;constructor(n){this.nativeElement=n;}static __NG_ELEMENT_ID__=ny}return e})();function af$1(e){return e instanceof Tr$2?e.nativeElement:e}function ry(){return this._results[Symbol.iterator]()}var si$2=class si{_emitDistinctChangesOnly;dirty=true;_onDirty=void 0;_results=[];_changesDetected=false;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new ne$3}constructor(t=false){this._emitDistinctChangesOnly=t;}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t);}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=false;let r=pu(t);(this._changesDetected=!fu(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0]);}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this);}onDirty(t){this._onDirty=t;}setDirty(){this.dirty=true,this._onDirty?.();}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe());}[Symbol.iterator]=ry};function cf(e){return (e.flags&128)===128}var sc=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(sc||{}),lf=new Map,oy=0;function iy(){return oy++}function sy(e){lf.set(e[De$5],e);}function Na$1(e){lf.delete(e[De$5]);}var ad="__ngContext__";function En$3(e,t){Ze$2(t)?(e[ad]=t[De$5],sy(t)):e[ad]=t;}function uf(e){return ff(e[un$4])}function df(e){return ff(e[fe$3])}function ff(e){for(;e!==null&&!he$2(e);)e=e[fe$3];return e}var Sa$1;function ay(e){Sa$1=e;}function ac(){if(Sa$1!==void 0)return Sa$1;if(typeof document<"u")return document;throw new b$4(210,false)}var pf="r";var hf="di";var gf=false,mf=new S$2("",{factory:()=>gf});var cd=new WeakMap;function cy(e,t){if(e==null||typeof e!="object")return;let n=cd.get(e);n||(n=new WeakSet,cd.set(e,n)),n.add(t);}function Ci$3(e){return (e.flags&32)===32}var dy=()=>null;function yf(e,t,n=false){return dy()}function vf(e,t){let n=e.contentQueries;if(n!==null){let r=v$2(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];rr$4(i),a.contentQueries(2,t[s],s);}}}finally{v$2(r);}}}function xa$1(e,t,n){rr$4(0);let r=v$2(null);try{t(e,n);}finally{v$2(r);}}function cc(e,t,n){if(Hs(t)){let r=v$2(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s);}}}finally{v$2(r);}}}var $t$4=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})($t$4||{});var qo$2;function fy(){if(qo$2===void 0&&(qo$2=null,sn$4.trustedTypes))try{qo$2=sn$4.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e});}catch(e){}return qo$2}function bi$3(e){return fy()?.createHTML(e)||e}var Go$2;function If(){if(Go$2===void 0&&(Go$2=null,sn$4.trustedTypes))try{Go$2=sn$4.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e});}catch(e){}return Go$2}function ld(e){return If()?.createHTML(e)||e}function ud(e){return If()?.createScriptURL(e)||e}var Je$2=class Je{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t;}toString(){return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${vo$3})`}},Aa=class extends Je$2{getTypeName(){return "HTML"}},Ra$1=class Ra extends Je$2{getTypeName(){return "Style"}},ka$1=class ka extends Je$2{getTypeName(){return "Script"}},Oa$1=class Oa extends Je$2{getTypeName(){return "URL"}},Pa$1=class Pa extends Je$2{getTypeName(){return "ResourceURL"}};function Nn$2(e){return e instanceof Je$2?e.changingThisBreaksApplicationSecurity:e}function _i$3(e,t){let n=Ef(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return  true;throw new Error(`Required a safe ${t}, got a ${n} (see ${vo$3})`)}return n===t}function Ef(e){return e instanceof Je$2&&e.getTypeName()||null}function py(e){return new Aa(e)}function hy(e){return new Ra$1(e)}function gy(e){return new ka$1(e)}function my(e){return new Oa$1(e)}function yy(e){return new Pa$1(e)}function vy(e){let t=new Fa$1(e);return Iy()?new La$1(t):t}var La$1=class La{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t;}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(bi$3(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch(n){return null}}},Fa$1=class Fa{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=bi$3(t),n}};function Iy(){try{return !!new window.DOMParser().parseFromString(bi$3(""),"text/html")}catch(e){return  false}}var Ey=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function lc(e){return e=String(e),e.match(Ey)?e:"unsafe:"+e}function Xe$2(e){let t={};for(let n of e.split(","))t[n]=true;return t}function Cr$2(...e){let t={};for(let n of e)for(let r in n)n.hasOwnProperty(r)&&(t[r]=true);return t}var Df=Xe$2("area,br,col,hr,img,wbr"),wf=Xe$2("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Tf=Xe$2("rp,rt"),Dy=Cr$2(Tf,wf),wy=Cr$2(wf,Xe$2("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),Ty=Cr$2(Tf,Xe$2("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),dd=Cr$2(Df,wy,Ty,Dy),Cf=Xe$2("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),Cy=Xe$2("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),by=Xe$2("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),_y=Cr$2(Cf,Cy,by),My=Xe$2("script,style,template"),ja$1=class ja{sanitizedSomething=false;buf=[];sanitizeChildren(t){let n=t.firstChild,r=true,o=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?r=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=true,r&&n.firstChild){o.push(n),n=xy(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let i=Sy(n);if(i){n=i;break}n=o.pop();}}return this.buf.join("")}startElement(t){let n=fd(t).toLowerCase();if(!dd.hasOwnProperty(n))return this.sanitizedSomething=true,!My.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let r=t.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),s=i.name,a=s.toLowerCase();if(!_y.hasOwnProperty(a)){this.sanitizedSomething=true;continue}let c=i.value;Cf[a]&&(c=lc(c)),this.buf.push(" ",s,'="',pd(c),'"');}return this.buf.push(">"),true}endElement(t){let n=fd(t).toLowerCase();dd.hasOwnProperty(n)&&!Df.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"));}chars(t){this.buf.push(pd(t));}};function Ny(e,t){return (e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function Sy(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw bf(t);return t}function xy(e){let t=e.firstChild;if(t&&Ny(e,t))throw bf(t);return t}function fd(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function bf(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var Ay=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Ry=/([^\#-~ |!])/g;function pd(e){return e.replace(/&/g,"&amp;").replace(Ay,function(t){let n=t.charCodeAt(0),r=t.charCodeAt(1);return "&#"+((n-55296)*1024+(r-56320)+65536)+";"}).replace(Ry,function(t){return "&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var zo$3;function _f(e,t){let n=null;try{zo$3=zo$3||vy(e);let r=t?String(t):"";n=zo$3.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=n.innerHTML,n=zo$3.getInertBodyElement(r);}while(r!==i);let a=new ja$1().sanitizeChildren(hd(n)||n);return bi$3(a)}finally{if(n){let r=hd(n)||n;for(;r.firstChild;)r.firstChild.remove();}}}function hd(e){return "content"in e&&ky(e)?e.content:null}function ky(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var Oy=/^>|^->|<!--|-->|--!>|<!-$/g,Py=/(<|>)/g,Ly="\u200B$1\u200B";function Fy(e){return e.replace(Oy,t=>t.replace(Py,Ly))}function jy(e,t){return e.createText(t)}function Vy(e,t,n){e.setValue(t,n);}function Hy(e,t){return e.createComment(Fy(t))}function Mf(e,t,n){return e.createElement(t,n)}function ai$2(e,t,n,r,o){e.insertBefore(t,n,r,o);}function Nf(e,t,n){e.appendChild(t,n);}function gd(e,t,n,r,o){r!==null?ai$2(e,t,n,r,o):Nf(e,t,n);}function Sf(e,t,n,r){e.removeChild(null,t,n,r);}function By(e,t,n){e.setAttribute(t,"style",n);}function $y(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n);}function xf(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&Wm(e,t,r),o!==null&&$y(e,t,o),i!==null&&By(e,t,i);}var br$2=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e[e.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",e})(br$2||{});function Uy(e){let t=uc();return t?ld(t.sanitize(br$2.HTML,e)||""):_i$3(e,"HTML")?ld(Nn$2(e)):_f(ac(),de$1(e))}function Af(e){let t=uc();return t?t.sanitize(br$2.URL,e)||"":_i$3(e,"URL")?Nn$2(e):lc(de$1(e))}function Rf(e){let t=uc();if(t)return ud(t.sanitize(br$2.RESOURCE_URL,e)||"");if(_i$3(e,"ResourceURL"))return ud(Nn$2(e));throw new b$4(904,false)}var Wy={embed:{src:true},frame:{src:true},iframe:{src:true},media:{src:true},base:{href:true},link:{href:true},object:{data:true,codebase:true}};function qy(e,t){return Wy[e.toLowerCase()]?.[t.toLowerCase()]===true?Rf:Af}function Gy(e,t,n){return qy(t,n)(e)}function uc(){let e=g$4();return e&&e[Ee$4].sanitizer}function zy(e){return e.ownerDocument}function Qy(e){return e instanceof Function?e():e}function Zy(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1;}}var kf="ng-template";function Yy(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&Zy(t[o+1].toLowerCase(),n,0)!==-1)return  true}else if(dc(e))return  false;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return  true}return  false}function dc(e){return e.type===4&&e.value!==kf}function Ky(e,t,n){let r=e.type===4&&!n?kf:e.value;return t===r}function Jy(e,t,n){let r=4,o=e.attrs,i=o!==null?tv(o):0,s=false;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!Ce$3(r)&&!Ce$3(c))return  false;if(s&&Ce$3(c))continue;s=false,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!Ky(e,c,n)||c===""&&t.length===1){if(Ce$3(r))return  false;s=true;}}else if(r&8){if(o===null||!Yy(e,o,c,n)){if(Ce$3(r))return  false;s=true;}}else {let l=t[++a],u=Xy(c,o,dc(e),n);if(u===-1){if(Ce$3(r))return  false;s=true;continue}if(l!==""){let d;if(u>i?d="":d=o[u+1].toLowerCase(),r&2&&l!==d){if(Ce$3(r))return  false;s=true;}}}}return Ce$3(r)||s}function Ce$3(e){return (e&1)===0}function Xy(e,t,n,r){if(t===null)return  -1;let o=0;if(r||!n){let i=false;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=true;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else {if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2;}return  -1}else return nv(t,e)}function Of(e,t,n=false){for(let r=0;r<t.length;r++)if(Jy(e,t[r],n))return  true;return  false}function ev(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if((n&1)===0)return t[n+1]}return null}function tv(e){for(let t=0;t<e.length;t++){let n=e[t];if(Zd(n))return t}return e.length}function nv(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return  -1;if(r===t)return n;n++;}return  -1}function rv(e,t){e:for(let n=0;n<t.length;n++){let r=t[n];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return  true}}return  false}function md(e,t){return e?":not("+t.trim()+")":t}function ov(e){let t=e[0],n=1,r=2,o="",i=false;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]";}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!Ce$3(s)&&(t+=md(i,o),o=""),r=s,i=i||!Ce$3(r);n++;}return o!==""&&(t+=md(i,o)),t}function iv(e){return e.map(ov).join(",")}function sv(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else {if(!Ce$3(o))break;o=i;}r++;}return n.length&&t.push(1,...n),t}var q$3={},ci$2=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(ci$2||{}),av;function fc(e,t){return av(e,t)}var Pf=new S$2("",{factory:()=>false});var cv=false,_r$2=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function Lf(e){return e[Z$4].get(Pf,cv)}function lv(e,t,n){let r=Dn$3.get(e);if(r){for(let o of t)r.classList.push(o);for(let o of n)r.cleanupFns.push(o);}else Dn$3.set(e,{classList:t,cleanupFns:n});}function pc(e){let t=Dn$3.get(e);if(t){for(let n of t.cleanupFns)n();Dn$3.delete(e);}Vt$4.delete(e);}var Dn$3=new WeakMap,Vt$4=new WeakMap,fr$4=new WeakMap;function Ff(e){return e?e[it$3]??e:null}var cr$4=new WeakSet;function yd(e,t){let n=fr$4.get(e);if(n&&n.length>0){let r=n.findIndex(o=>o.el===t);r>-1&&n.splice(r,1);}n?.length===0&&fr$4.delete(e);}function uv(e,t,n){let r=fr$4.get(e);if(!r||r.length===0)return;let o=t.parentNode,i=t.previousSibling,s=Ff(n);for(let a=r.length-1;a>=0;a--){let{el:c,declarationView:l}=r[a],u=c.parentNode;c===t?(r.splice(a,1),cr$4.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}}))):i&&c===i?(r.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),c.parentNode?.removeChild(c)):u&&o&&u!==o&&(s===null||l===null||s===l)&&(r.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),c.parentNode?.removeChild(c));}}function jf(e,t,n){let r=Ff(n),o=fr$4.get(e);o?o.some(i=>i.el===t)||o.push({el:t,declarationView:r}):fr$4.set(e,[{el:t,declarationView:r}]);}function vd(e){let t=e[pe$4]??={};return t.enter??=new Map}function Mi$3(e){let t=e[pe$4]??={};return t.leave??=new Map}function Vf(e){let t=typeof e=="function"?e():e,n=Array.isArray(t)?t:null;return typeof t=="string"&&(n=t.trim().split(/\s+/).filter(r=>r)),n}function dv(e,t){if(!_r$2)return;let n=Dn$3.get(e);if(n&&n.classList.length>0&&fv(e,n.classList))for(let r of n.classList)t.removeClass(e,r);pc(e);}function fv(e,t){for(let n of t)if(e.classList.contains(n))return  true;return  false}function pr$3(e){return e.composedPath?e.composedPath()[0]:e.target}function hc(e,t){let n=Vt$4.get(t);return n===void 0?true:t===pr$3(e)&&(n.animationName!==void 0&&e.animationName===n.animationName||n.propertyName!==void 0&&(n.propertyName==="all"||e.propertyName===n.propertyName))}function Hf(e,t,n){let r=e.get(t.index)??{animateFns:[]};r.animateFns.push(n),e.set(t.index,r);}function Id(e,t){if(e)for(let n of e)n();for(let n of t)n();}function Ed(e,t){let n=Mi$3(e).get(t.index);n&&(n.resolvers=void 0);}function li$2(e){if(!e)return 0;let t=e.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(e)*t}function jt$4(e,t){return e.getPropertyValue(t).split(",").map(r=>r.trim())}function pv(e){let t=jt$4(e,"transition-property"),n=jt$4(e,"transition-duration"),r=jt$4(e,"transition-delay"),o={propertyName:"",duration:0,animationName:void 0};for(let i=0;i<t.length;i++){let s=li$2(r[i])+li$2(n[i]);s>o.duration&&(o.propertyName=t[i],o.duration=s);}return o}function hv(e){let t=jt$4(e,"animation-name"),n=jt$4(e,"animation-delay"),r=jt$4(e,"animation-duration"),o=jt$4(e,"animation-iteration-count"),i={animationName:"",propertyName:void 0,duration:0};for(let s=0;s<t.length;s++){let a=li$2(n[s])+li$2(r[s]),c=o[s];a>i.duration&&c!=="infinite"&&(i.animationName=t[s],i.duration=a);}return i}function Bf(e,t){return e!==void 0&&e.duration>t.duration}function $f(e){return (e.animationName!=null||e.propertyName!=null)&&e.duration>0}function gv(e,t){let n=getComputedStyle(e),r=hv(n),o=pv(n),i=r.duration>o.duration?r:o;Bf(t.get(e),i)||$f(i)&&t.set(e,i);}function Uf(e,t,n){if(!n)return;let r=e.getAnimations();return r.length===0?gv(e,t):mv(e,t,r)}function mv(e,t,n){let r={animationName:void 0,propertyName:void 0,duration:0};for(let o of n){let i=o.effect?.getTiming();if(i?.iterations===1/0)continue;let s=typeof i?.duration=="number"?i.duration:0,a=(i?.delay??0)+s,c=o.playbackRate;c!==void 0&&c!==0&&c!==1&&(a/=Math.abs(c));let l,u;o.animationName?u=o.animationName:l=o.transitionProperty,a>=r.duration&&(r={animationName:u,propertyName:l,duration:a});}Bf(t.get(e),r)||$f(r)&&t.set(e,r);}var Ut$5=new Set,Ni$3=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Ni$3||{}),Gt$6=new S$2(""),Dd=new Set;function _e$4(e){Dd.has(e)||(Dd.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}));}var Si$3=(()=>{class e{impl=null;execute(){this.impl?.execute();}static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>new e})}return e})(),gc=[0,1,2,3],mc=(()=>{class e{ngZone=T$3(ue$1);scheduler=T$3(Oe$5);errorHandler=T$3(Qe$2,{optional:true});sequences=new Set;deferredRegistrations=new Set;executing=false;constructor(){T$3(Gt$6,{optional:true});}execute(){let n=this.sequences.size>0;n&&k$5(x$1.AfterRenderHooksStart),this.executing=true;for(let r of gc)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[r]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let i=o.hooks[r];return i(o.pipelinedValue)},o.snapshot));}catch(i){o.erroredOrDestroyed=true,this.errorHandler?.handleError(i);}this.executing=false;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),n&&k$5(x$1.AfterRenderHooksEnd);}register(n){let{view:r}=n;r!==void 0?((r[Rt$4]??=[]).push(n),Pt$5(r),r[I$5]|=8192):this.executing?this.deferredRegistrations.add(n):this.addSequence(n);}addSequence(n){this.sequences.add(n),this.scheduler.notify(7);}unregister(n){this.executing&&this.sequences.has(n)?(n.erroredOrDestroyed=true,n.pipelinedValue=void 0,n.once=true):(this.sequences.delete(n),this.deferredRegistrations.delete(n));}maybeTrace(n,r){return r?r.run(Ni$3.AFTER_NEXT_RENDER,n):n()}static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>new e})}return e})(),hr$4=class hr{impl;hooks;view;once;snapshot;erroredOrDestroyed=false;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,n,r,o,i,s=null){this.impl=t,this.hooks=n,this.view=r,this.once=o,this.snapshot=s,this.unregisterOnDestroy=i?.onDestroy(()=>this.destroy());}afterRun(){this.erroredOrDestroyed=false,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null;}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[Rt$4];t&&(this.view[Rt$4]=t.filter(n=>n!==this));}};function Wf(e,t){let n=t?.injector??T$3(le$2);return _e$4("NgAfterNextRender"),vv(e,n,t,true)}function yv(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function vv(e,t,n,r){let o=t.get(Si$3);o.impl??=t.get(mc);let i=t.get(Gt$6,null,{optional:true}),s=n?.manualCleanup!==true?t.get(Le$4):null,a=t.get(mn$4,null,{optional:true}),c=new hr$4(o.impl,yv(e),a?.view,r,s,i?.snapshot(null));return o.impl.register(c),c}var Mr$2=new S$2("",{factory:()=>{let e=T$3(ce$3),t=new Set;return e.onDestroy(()=>t.clear()),{queue:t,isScheduled:false,scheduler:null,injector:e}}});function qf(e,t,n){let r=e.get(Mr$2);if(Array.isArray(t))for(let o of t)r.queue.add(o),n?.detachedLeaveAnimationFns?.push(o);else r.queue.add(t),n?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(e);}function Iv(e,t){let n=e.get(Mr$2);if(Array.isArray(t))for(let r of t)n.queue.delete(r);else n.queue.delete(t);}function Ev(e,t){let n=e.get(Mr$2);if(t.detachedLeaveAnimationFns){for(let r of t.detachedLeaveAnimationFns)n.queue.delete(r);t.detachedLeaveAnimationFns=void 0;}}function Dv(e){let t=e.get(Mr$2);t.isScheduled||(Wf(()=>{t.isScheduled=false;for(let n of t.queue)n();t.queue.clear();},{injector:t.injector}),t.isScheduled=true);}function Gf(e){let t=e.get(Mr$2);t.scheduler=Dv,t.scheduler(e);}function zf(e,t){for(let[n,r]of t)qf(e,r.animateFns);}function wd(e,t,n,r){let o=e?.[pe$4]?.enter;t!==null&&o&&o.has(n.index)&&zf(r,o);}function Td(e,t,n,r){try{n.get(Jn$1);}catch(s){return r(false)}let o=e?.[pe$4];o?.enter?.has(t.index)&&Iv(n,o.enter.get(t.index).animateFns);let i=wv(e,t,o);if(i.size===0){let s=false;if(e){let a=[];xi$4(e,t,a),s=a.length>0;}if(!s)return r(false)}e&&Ut$5.add(e[De$5]),qf(n,()=>Tv(e,t,o||void 0,i,r),o||void 0);}function wv(e,t,n){let r=new Map,o=n?.leave;if(o&&o.has(t.index)&&r.set(t.index,o.get(t.index)),e&&o)for(let[i,s]of o){if(r.has(i))continue;let c=e[y$1].data[i].parent;for(;c;){if(c===t){r.set(i,s);break}c=c.parent;}}return r}function Tv(e,t,n,r,o){let i=[];if(n&&n.leave)for(let[s]of r){if(!n.leave.has(s))continue;let a=n.leave.get(s);for(let c of a.animateFns){let{promise:l}=c();i.push(l);}n.detachedLeaveAnimationFns=void 0;}if(e&&xi$4(e,t,i),i.length>0){let s=n||e?.[pe$4];if(s){let a=s.running;a&&i.push(a),s.running=Promise.allSettled(i),bv(e,s.running,o);}else Promise.allSettled(i).then(()=>{e&&Ut$5.delete(e[De$5]),o(true);});}else e&&Ut$5.delete(e[De$5]),o(false);}function xi$4(e,t,n){if(t.type&12){let o=e[t.index];if(he$2(o))for(let i=j$4;i<o.length;i++){let s=o[i];s[y$1].type===2&&Cv(s,n);}}let r=t.child;for(;r;)xi$4(e,r,n),r=r.next;}function Cv(e,t){let n=e[pe$4];if(n&&n.leave)for(let o of n.leave.values())for(let i of o.animateFns){let{promise:s}=i();t.push(s);}let r=e[y$1].firstChild;for(;r;)xi$4(e,r,t),r=r.next;}function bv(e,t,n){t.then(()=>{e[pe$4]?.running===t&&(e[pe$4].running=void 0,Ut$5.delete(e[De$5])),n(true);});}function yn$3(e,t,n,r,o,i,s,a){if(o!=null){let c,l=false;he$2(o)?c=o:Ze$2(o)&&(l=true,o=o[Ie$2]);let u=ge$4(o);e===0&&r!==null?(wd(a,r,i,n),s==null?Nf(t,r,u):ai$2(t,r,u,s||null,true)):e===1&&r!==null?(wd(a,r,i,n),ai$2(t,r,u,s||null,true),uv(i,u,a)):e===2?(a?.[pe$4]?.leave?.has(i.index)&&jf(i,u,a),cr$4.delete(u),Td(a,i,n,d=>{if(cr$4.has(u)){cr$4.delete(u);return}Sf(t,u,l,d);})):e===3&&(cr$4.delete(u),Td(a,i,n,()=>{t.destroyNode(u);})),c!=null&&Pv(t,e,n,c,i,r,s);}}function _v(e,t){Qf(e,t),t[Ie$2]=null,t[Q$6]=null;}function Mv(e,t,n,r,o,i){r[Ie$2]=o,r[Q$6]=t,Ri$3(e,r,n,1,o,i);}function Qf(e,t){t[Ee$4].changeDetectionScheduler?.notify(9),Ri$3(e,t,t[A$3],2,null,null);}function Nv(e){let t=e[un$4];if(!t)return ma$1(e[y$1],e);for(;t;){let n=null;if(Ze$2(t))n=t[un$4];else {let r=t[j$4];r&&(n=r);}if(!n){for(;t&&!t[fe$3]&&t!==e;)Ze$2(t)&&ma$1(t[y$1],t),t=t[$$6];t===null&&(t=e),Ze$2(t)&&ma$1(t[y$1],t),n=t&&t[fe$3];}t=n;}}function yc(e,t){let n=e[kt$4],r=n.indexOf(t);n.splice(r,1);}function Ai$4(e,t){if(Ot$4(t))return;let n=t[A$3];n.destroyNode&&Ri$3(e,t,n,3,null,null),Nv(t);}function ma$1(e,t){if(Ot$4(t))return;let n=v$2(null);try{t[I$5]&=-129,t[I$5]|=256,t[oe]&&We$2(t[oe]),xv(e,t),Sv(e,t),t[y$1].type===1&&t[A$3].destroy();let r=t[st$6];if(r!==null&&he$2(t[$$6])){r!==t[$$6]&&yc(r,t);let o=t[Pe$4];o!==null&&o.detachView(e);}Na$1(t);}finally{v$2(n);}}function Sv(e,t){let n=e.cleanup,r=t[ln$4];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2;}else {let a=r[n[s+1]];n[s].call(a);}r!==null&&(t[ln$4]=null);let o=t[Ge$2];if(o!==null){t[Ge$2]=null;for(let s=0;s<o.length;s++){let a=o[s];a();}}let i=t[nt$3];if(i!==null){t[nt$3]=null;for(let s of i)s.destroy();}}function xv(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof Bt$5)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];k$5(x$1.LifecycleHookStart,a,c);try{c.call(a);}finally{k$5(x$1.LifecycleHookEnd,a,c);}}else {k$5(x$1.LifecycleHookStart,o,i);try{i.call(o);}finally{k$5(x$1.LifecycleHookEnd,o,i);}}}}}function Zf(e,t,n){return Av(e,t.parent,n)}function Av(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[Ie$2];if(Ye$3(r)){let{encapsulation:o}=e.data[r.directiveStart+r.componentOffset];if(o===$t$4.None||o===$t$4.Emulated)return null}return ee$3(r,n)}function Yf(e,t,n){return kv(e,t,n)}function Rv(e,t,n){return e.type&40?ee$3(e,n):null}var kv=Rv;function vc(e,t,n,r){let o=Zf(e,r,t),i=t[A$3],s=r.parent||t[Q$6],a=Yf(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)gd(i,o,n[c],a,false);else gd(i,o,n,a,false);}function lr$4(e,t){if(t!==null){let n=t.type;if(n&3)return ee$3(t,e);if(n&4)return Va$1(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return lr$4(e,r);{let o=e[t.index];return he$2(o)?Va$1(-1,o):ge$4(o)}}else {if(n&128)return lr$4(e,t.next);if(n&32)return fc(t,e)()||ge$4(e[t.index]);{let r=Kf(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=ze$3(e[Y$4]);return lr$4(o,r)}else return lr$4(e,t.next)}}}return null}function Kf(e,t){if(t!==null){let r=e[Y$4][Q$6],o=t.projection;return r.projection[o]}return null}function Va$1(e,t){let n=j$4+e+1;if(n<t.length){let r=t[n],o=r[y$1].firstChild;if(o!==null)return lr$4(r,o)}return t[at$6]}function Ic(e,t,n,r,o,i,s){for(;n!=null;){let a=r[Z$4];if(n.type===128){n=n.next;continue}let c=r[n.index],l=n.type;if(s&&t===0&&(c&&En$3(ge$4(c),r),n.flags|=2),!Ci$3(n))if(l&8)Ic(e,t,n.child,r,o,i,false),yn$3(t,e,a,o,c,n,i,r);else if(l&32){let u=fc(n,r),d;for(;d=u();)yn$3(t,e,a,o,d,n,i,r);yn$3(t,e,a,o,c,n,i,r);}else l&16?Jf(e,t,r,n,o,i):yn$3(t,e,a,o,c,n,i,r);n=s?n.projectionNext:n.next;}}function Ri$3(e,t,n,r,o,i){Ic(n,r,e.firstChild,t,o,i,false);}function Ov(e,t,n){let r=t[A$3],o=Zf(e,n,t),i=n.parent||t[Q$6],s=Yf(i,n,t);Jf(r,0,t,n,o,s);}function Jf(e,t,n,r,o,i){let s=n[Y$4],c=s[Q$6].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];yn$3(t,e,n[Z$4],o,u,r,i,n);}else {let l=c,u=s[$$6];cf(r)&&(l.flags|=128),Ic(e,t,l,u,o,i,true);}}function Pv(e,t,n,r,o,i,s){let a=r[at$6],c=ge$4(r);a!==c&&yn$3(t,e,n,i,a,o,s);for(let l=j$4;l<r.length;l++){let u=r[l];Ri$3(u[y$1],u,e,t,i,a);}}function Lv(e,t,n,r,o){if(t)o?e.addClass(n,r):e.removeClass(n,r);else {let i=r.indexOf("-")===-1?void 0:ci$2.DashCase;o==null?e.removeStyle(n,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=ci$2.Important),e.setStyle(n,r,o,i));}}function Ec(e,t,n,r,o,i,s,a,c,l,u){let d=L$3+r,p=d+o,f=Fv(d,p),h=typeof l=="function"?l():l;return f[y$1]={type:e,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:p,hostBindingOpCodes:null,firstCreatePass:true,firstUpdatePass:true,staticViewQueries:false,staticContentQueries:false,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:h,incompleteFirstPass:false,ssrId:u}}function Fv(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:q$3);return n}function jv(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=Ec(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function Dc(e,t,n,r,o,i,s,a,c,l,u){let d=t.blueprint.slice();return d[Ie$2]=o,d[I$5]=r|4|128|8|64|1024,(l!==null||e&&e[I$5]&2048)&&(d[I$5]|=2048),Ws(d),d[$$6]=d[it$3]=e,d[H$3]=n,d[Ee$4]=s||e&&e[Ee$4],d[A$3]=a||e&&e[A$3],d[Z$4]=c||e&&e[Z$4]||null,d[Q$6]=i,d[De$5]=iy(),d[xt$3]=u,d[js]=l,d[Y$4]=t.type==2?e[Y$4]:d,d}function Vv(e,t,n){let r=ee$3(t,e),o=jv(n),i=e[Ee$4].rendererFactory,s=wc(e,Dc(e,o,null,Xf(n),r,t,null,i.createRenderer(r,n),null,null,null));return e[t.index]=s}function Xf(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function ep(e,t,n,r){if(n===0)return  -1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function wc(e,t){return e[un$4]?e[Fs][fe$3]=t:e[un$4]=t,e[Fs]=t,t}function Hv(e=1){tp(P$3(),g$4(),Te$2()+e);}function tp(e,t,n,r){if((t[I$5]&3)===3){let i=e.preOrderCheckHooks;i!==null&&Zo$3(t,i,n);}else {let i=e.preOrderHooks;i!==null&&Yo$2(t,i,0,n);}ct$6(n);}var ki$4=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(ki$4||{});function Wt$4(e,t,n,r){let o=v$2(null);try{let[i,s,a]=e.inputs[n],c=null;(s&ki$4.SignalBased)!==0&&(c=t[i][F$4]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):a!==null&&(r=a.call(t,r)),e.setInput!==null?e.setInput(t,c,r,n,i):Wd(t,c,i,r);}finally{v$2(o);}}function np(e,t,n,r,o){let i=Te$2(),s=r&2;try{ct$6(-1),s&&t.length>L$3&&tp(e,t,L$3,!1);let a=s?x$1.TemplateUpdateStart:x$1.TemplateCreateStart;k$5(a,o,n),n(r,o);}finally{ct$6(i);let a=s?x$1.TemplateUpdateEnd:x$1.TemplateCreateEnd;k$5(a,o,n);}}function Oi$4(e,t,n){Gv(e,t,n),(n.flags&64)===64&&zv(e,t,n);}function Nr$2(e,t,n=ee$3){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a;}}}function Bv(e,t,n,r){let i=r.get(mf,gf)||n===$t$4.ShadowDom||n===$t$4.ExperimentalIsolatedShadowDom,s=e.selectRootElement(t,i);if(s.tagName.toLowerCase()==="script")throw new b$4(905,false);return s}function Wv(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function rp(e,t,n,r,o,i){let s=t[y$1];if(_c(e,s,t,n,r)){Ye$3(e)&&qv(t,e.index);return}e.type&3&&(n=Wv(n)),op(e,t,n,r,o,i);}function op(e,t,n,r,o,i){if(e.type&3){let s=ee$3(e,t);r=i!=null?i(r,e.value||"",n):r,o.setProperty(s,n,r);}else e.type&12;}function qv(e,t){let n=me$4(t,e);n[I$5]&16||(n[I$5]|=64);}function Gv(e,t,n){let r=n.directiveStart,o=n.directiveEnd;Ye$3(n)&&Vv(t,n,e.data[r+n.componentOffset]),e.firstCreatePass||ii$2(n,t);let i=n.initialInputs;for(let s=r;s<o;s++){let a=e.data[s],c=dr$4(t,e,s,n);if(En$3(c,t),i!==null&&Kv(t,s-r,c,a,n,i),we$4(a)){let l=me$4(n.index,t);l[H$3]=dr$4(t,e,s,n);}}}function zv(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=Fu();try{ct$6(i);for(let a=r;a<o;a++){let c=e.data[a],l=t[a];Lo$3(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&Qv(c,l);}}finally{ct$6(-1),Lo$3(s);}}function Qv(e,t){e.hostBindings!==null&&e.hostBindings(1,t);}function Tc(e,t){let n=e.directiveRegistry,r=null;if(n)for(let o=0;o<n.length;o++){let i=n[o];Of(t,i.selectors,false)&&(r??=[],we$4(i)?r.unshift(i):r.push(i));}return r}function Zv(e,t,n,r,o,i){let s=ee$3(e,t);Yv(t[A$3],s,i,e.value,n,r,o);}function Yv(e,t,n,r,o,i,s){if(i==null)s?.(i,r||"",o),e.removeAttribute(t,o,n);else {let a=s==null?de$1(i):s(i,r||"",o);e.setAttribute(t,o,a,n);}}function Kv(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Wt$4(r,n,c,l);}}function Cc(e,t,n,r,o){let i=L$3+n,s=t[y$1],a=o(s,t,e,r,n);t[i]=a,pn$3(e,true);let c=e.type===2;return c?(xf(t[A$3],a,e),(Nu()===0||dn$4(e))&&En$3(a,t),Su()):En$3(a,t),Ho$3()&&(!c||!Ci$3(e))&&vc(s,t,a,e),e}function bc(e){let t=e;return Xs()?ea$1():(t=t.parent,pn$3(t,false)),t}function Jv(e,t){let n=e[Z$4];if(!n)return;let r;try{r=n.get(Ft$4,null);}catch(o){r=null;}r?.(t);}function _c(e,t,n,r,o){let i=e.inputs?.[r],s=e.hostDirectiveInputs?.[r],a=false;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=t.data[l];Wt$4(d,n[l],u,o),a=true;}if(i)for(let c of i){let l=n[c],u=t.data[c];Wt$4(u,l,r,o),a=true;}return a}function Xv(e,t,n,r,o,i){let s=null,a=null,c=null,l=false,u=e.directiveToIndex.get(r.type);if(typeof u=="number"?s=u:[s,a,c]=u,a!==null&&c!==null&&e.hostDirectiveInputs?.hasOwnProperty(o)){let d=e.hostDirectiveInputs[o];for(let p=0;p<d.length;p+=2){let f=d[p];if(f>=a&&f<=c){let h=t.data[f],m=d[p+1];Wt$4(h,n[f],m,i),l=true;}else if(f>c)break}}return s!==null&&r.inputs.hasOwnProperty(o)&&(Wt$4(r,n[s],o,i),l=true),l}function eI(e,t){let n=me$4(t,e),r=n[y$1];tI(r,n);let o=n[Ie$2];o!==null&&n[xt$3]===null&&(n[xt$3]=yf(o,n[Z$4])),k$5(x$1.ComponentStart);try{Mc(r,n,n[H$3]);}finally{k$5(x$1.ComponentEnd,n[H$3]);}}function tI(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n]);}function Mc(e,t,n){jo$3(t);try{let r=e.viewQuery;r!==null&&xa$1(1,r,n);let o=e.template;o!==null&&np(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Pe$4]?.finishViewCreation(e),e.staticContentQueries&&vf(e,t),e.staticViewQueries&&xa$1(2,e.viewQuery,n);let i=e.components;i!==null&&nI(t,i);}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=true,e.firstCreatePass=false),r}finally{t[I$5]&=-5,Vo$2();}}function nI(e,t){for(let n=0;n<t.length;n++)eI(e,t[n]);}function Sr$2(e,t,n,r){let o=v$2(null);try{let i=t.tView,a=e[I$5]&4096?4096:16,c=Dc(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=e[t.index];c[st$6]=l;let u=e[Pe$4];return u!==null&&(c[Pe$4]=u.createEmbeddedView(i)),Mc(i,c,n),c}finally{v$2(o);}}function wn$3(e,t){return !t||t.firstChild===null||cf(e)}function gr$4(e,t,n,r,o=false){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let i=t[n.index];i!==null&&r.push(ge$4(i)),he$2(i)&&ip(i,r);let s=n.type;if(s&8)gr$4(e,t,n.child,r);else if(s&32){let a=fc(n,t),c;for(;c=a();)r.push(c);}else if(s&16){let a=Kf(t,n);if(Array.isArray(a))r.push(...a);else {let c=ze$3(t[Y$4]);gr$4(c[y$1],c,a,r,true);}}n=o?n.projectionNext:n.next;}return r}function ip(e,t){for(let n=j$4;n<e.length;n++){let r=e[n],o=r[y$1].firstChild;o!==null&&gr$4(r[y$1],r,o,t);}e[at$6]!==e[Ie$2]&&t.push(e[at$6]);}function sp(e){if(e[Rt$4]!==null){for(let t of e[Rt$4])t.impl.addSequence(t);e[Rt$4].length=0;}}var ap=[];function rI(e){return e[oe]??oI(e)}function oI(e){let t=ap.pop()??Object.create(sI);return t.lView=e,t}function iI(e){e.lView[oe]!==e&&(e.lView=null,ap.push(e));}var sI=x$2(w$3({},Be$2),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:e=>{Pt$5(e.lView);},consumerOnSignalRead(){this.lView[oe]=this;}});function aI(e){let t=e[oe]??Object.create(cI);return t.lView=e,t}var cI=x$2(w$3({},Be$2),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:e=>{let t=ze$3(e.lView);for(;t&&!cp(t[y$1]);)t=ze$3(t);t&&qs(t);},consumerOnSignalRead(){this.lView[oe]=this;}});function cp(e){return e.type!==2}function lp(e){if(e[nt$3]===null)return;let t=true;for(;t;){let n=false;for(let r of e[nt$3])r.dirty&&(n=true,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));t=n&&!!(e[I$5]&8192);}}var lI=100;function up(e,t=0){let r=e[Ee$4].rendererFactory;r.begin?.();try{uI(e,t);}finally{r.end?.();}}function uI(e,t){let n=ta$1();try{Wn$2(!0),Ha$1(e,t);let r=0;for(;er$3(e);){if(r===lI)throw new b$4(103,!1);r++,Ha$1(e,1);}}finally{Wn$2(n);}}function dI(e,t,n,r){if(Ot$4(t))return;let o=t[I$5],i=false,s=false;jo$3(t);let a=true,c=null,l=null;(cp(e)?(l=rI(t),c=Ae$2(l)):co$2()===null?(a=false,l=aI(t),c=Ae$2(l)):t[oe]&&(We$2(t[oe]),t[oe]=null));try{Ws(t),Ou(e.bindingStartIndex),n!==null&&np(e,t,n,2,r);let u=(o&3)===3;if(!i)if(u){let f=e.preOrderCheckHooks;f!==null&&Zo$3(t,f,null);}else {let f=e.preOrderHooks;f!==null&&Yo$2(t,f,0,null),ha$1(t,0);}if(s||fI(t),lp(t),dp(t,0),e.contentQueries!==null&&vf(e,t),!i)if(u){let f=e.contentCheckHooks;f!==null&&Zo$3(t,f);}else {let f=e.contentHooks;f!==null&&Yo$2(t,f,1),ha$1(t,1);}hI(e,t);let d=e.components;d!==null&&pp(t,d,0);let p=e.viewQuery;if(p!==null&&xa$1(2,p,r),!i)if(u){let f=e.viewCheckHooks;f!==null&&Zo$3(t,f);}else {let f=e.viewHooks;f!==null&&Yo$2(t,f,2),ha$1(t,2);}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[So$3]){for(let f of t[So$3])f();t[So$3]=null;}i||(sp(t),t[I$5]&=-73);}catch(u){throw Pt$5(t),u}finally{l!==null&&(Ue$4(l,c),a&&iI(l)),Vo$2();}}function dp(e,t){for(let n=uf(e);n!==null;n=df(n))for(let r=j$4;r<n.length;r++){let o=n[r];fp(o,t);}}function fI(e){for(let t=uf(e);t!==null;t=df(t)){if(!(t[I$5]&2))continue;let n=t[kt$4];for(let r=0;r<n.length;r++){let o=n[r];qs(o);}}}function pI(e,t,n){k$5(x$1.ComponentStart);let r=me$4(t,e);try{fp(r,n);}finally{k$5(x$1.ComponentEnd,r[H$3]);}}function fp(e,t){Ro$3(e)&&Ha$1(e,t);}function Ha$1(e,t){let r=e[y$1],o=e[I$5],i=e[oe],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&Ct$5(i)),s||=false,i&&(i.dirty=false),e[I$5]&=-9217,s)dI(r,e,r.template,e[H$3]);else if(o&8192){let a=v$2(null);try{lp(e),dp(e,1);let c=r.components;c!==null&&pp(e,c,1),sp(e);}finally{v$2(a);}}}function pp(e,t,n){for(let r=0;r<t.length;r++)pI(e,t[r],n);}function hI(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)ct$6(~o);else {let i=o,s=n[++r],a=n[++r];Lu(s,i);let c=t[i];k$5(x$1.HostBindingsUpdateStart,c);try{a(2,c);}finally{k$5(x$1.HostBindingsUpdateEnd,c);}}}}finally{ct$6(-1);}}function Nc(e,t){let n=ta$1()?64:1088;for(e[Ee$4].changeDetectionScheduler?.notify(t);e;){e[I$5]|=n;let r=ze$3(e);if(fn$4(e)&&!r)return e;e=r;}return null}function hp(e,t,n,r){return [e,true,0,t,null,r,null,n,null,null]}function gp(e,t){let n=j$4+t;if(n<e.length)return e[n]}function xr$2(e,t,n,r=true){let o=t[y$1];if(gI(o,t,e,n),r){let s=Va$1(n,e),a=t[A$3],c=a.parentNode(e[at$6]);c!==null&&Mv(o,e[Q$6],a,t,c,s);}let i=t[xt$3];i!==null&&i.firstChild!==null&&(i.firstChild=null);}function mp(e,t){let n=mr$4(e,t);return n!==void 0&&Ai$4(n[y$1],n),n}function mr$4(e,t){if(e.length<=j$4)return;let n=j$4+t,r=e[n];if(r){let o=r[st$6];o!==null&&o!==e&&yc(o,r),t>0&&(e[n-1][fe$3]=r[fe$3]);let i=Yn$2(e,j$4+t);_v(r[y$1],r);let s=i[Pe$4];s!==null&&s.detachView(i[y$1]),r[$$6]=null,r[fe$3]=null,r[I$5]&=-129;}return r}function gI(e,t,n,r){let o=j$4+r,i=n.length;r>0&&(n[o-1][fe$3]=t),r<i-j$4?(t[fe$3]=n[o],xs(n,j$4+r,t)):(n.push(t),t[fe$3]=null),t[$$6]=n;let s=t[st$6];s!==null&&n!==s&&yp(s,t);let a=t[Pe$4];a!==null&&a.insertView(e),ko$3(t),t[I$5]|=128;}function yp(e,t){let n=e[kt$4],r=t[$$6];if(Ze$2(r))e[I$5]|=2;else {let o=r[$$6][Y$4];t[Y$4]!==o&&(e[I$5]|=2);}n===null?e[kt$4]=[t]:n.push(t);}var ut$6=class ut{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=false;exhaustive;get rootNodes(){let t=this._lView,n=t[y$1];return gr$4(n,t,n.firstChild,[])}constructor(t,n){this._lView=t,this._cdRefInjectingView=n;}get context(){return this._lView[H$3]}set context(t){this._lView[H$3]=t;}get destroyed(){return Ot$4(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[$$6];if(he$2(t)){let n=t[Xn$1],r=n?n.indexOf(this):-1;r>-1&&(mr$4(t,r),Yn$2(n,r));}this._attachedToViewContainer=false;}Ai$4(this._lView[y$1],this._lView);}onDestroy(t){Oo$3(this._lView,t);}markForCheck(){Nc(this._cdRefInjectingView||this._lView,4);}detach(){this._lView[I$5]&=-129;}reattach(){ko$3(this._lView),this._lView[I$5]|=128;}detectChanges(){this._lView[I$5]|=1024,up(this._lView);}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new b$4(902,false);this._attachedToViewContainer=true;}detachFromAppRef(){this._appRef=null;let t=fn$4(this._lView),n=this._lView[st$6];n!==null&&!t&&yc(n,this._lView),Qf(this._lView[y$1],this._lView);}attachToAppRef(t){if(this._attachedToViewContainer)throw new b$4(902,false);this._appRef=t;let n=fn$4(this._lView),r=this._lView[st$6];r!==null&&!n&&yp(r,this._lView),ko$3(this._lView);}};var yr$2=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=mI;constructor(n,r,o){this._declarationLView=n,this._declarationTContainer=r,this.elementRef=o;}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,r){return this.createEmbeddedViewImpl(n,r)}createEmbeddedViewImpl(n,r,o){let i=Sr$2(this._declarationLView,this._declarationTContainer,n,{embeddedViewInjector:r,dehydratedView:o});return new ut$6(i)}}return e})();function mI(){return Pi$5(V$2(),g$4())}function Pi$5(e,t){return e.type&4?new yr$2(t,e,Mn$2(e,t)):null}function Sn$3(e,t,n,r,o){let i=e.data[t];if(i===null)i=yI(e,t,n,r,o),Pu()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=Ru();i.injectorIndex=s===null?-1:s.injectorIndex;}return pn$3(i,true),i}function yI(e,t,n,r,o){let i=Js(),s=Xs(),a=s?i:i&&i.parent,c=e.data[t]=II(e,a,n,t,r,o);return vI(e,c,i,s),c}function vI(e,t,n,r){e.firstChild===null&&(e.firstChild=t),n!==null&&(r?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n));}function II(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return Zs()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,namespace:ia$1(),attrs:i,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function EI(e){let t=e[Vs]??[],r=e[$$6][A$3],o=[];for(let i of t)i.data[hf]!==void 0?o.push(i):DI(i,r);e[Vs]=o;}function DI(e,t){let n=0,r=e.firstChild;if(r){let o=e.data[pf];for(;n<o;){let i=r.nextSibling;Sf(t,r,false),r=i,n++;}}}var wI=()=>null,TI=()=>null;function ui$2(e,t){return wI()}function vp(e,t,n){return TI()}var Ip=class{},vr$3=class vr{},CI=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>bI()}return e})();function bI(){let e=g$4(),t=V$2(),n=me$4(t.index,e);return (Ze$2(n)?n:e)[A$3]}var Ep=(()=>{class e{static \u0275prov=re$1({token:e,providedIn:"root",factory:()=>null})}return e})();function Dp(e){return e.debugInfo?.className||e.type.name||null}var Jo$3={},di$2=class di{injector;parentInjector;constructor(t,n){this.injector=t,this.parentInjector=n;}get(t,n,r){let o=this.injector.get(t,Jo$3,r);return o!==Jo$3||n===Jo$3?o:this.parentInjector.get(t,n,r)}};function Sc(e,t,n){return e[t]=n}function _I(e,t){return e[t]}function se$1(e,t,n){if(n===q$3)return  false;let r=e[t];return Object.is(r,n)?false:(e[t]=n,true)}function fi$4(e,t,n,r){let o=se$1(e,t,n);return se$1(e,t+1,r)||o}function MI(e,t,n,r,o,i){let s=fi$4(e,t,n,r);return fi$4(e,t+2,o,i)||s}function Ht$5(e,t,n){return function r(o){let i=r.__ngNativeEl__;i!==void 0&&cy(o,i);let s=Ye$3(e)?me$4(e.index,t):t;Nc(s,5);let a=t[H$3],c=bd(t,a,n,o),l=r.__ngNextListenerFn__;for(;l;)c=bd(t,a,l,o)&&c,l=l.__ngNextListenerFn__;return c}}function bd(e,t,n,r){let o=v$2(null);try{return k$5(x$1.OutputStart,t,n),n(r)!==!1}catch(i){return Jv(e,i),false}finally{k$5(x$1.OutputEnd,t,n),v$2(o);}}function xc(e,t,n,r,o,i,s,a){let c=dn$4(e),l=false,u=null;if(!r&&c&&(u=SI(t,n,i,e.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,l=true;}else {let d=ee$3(e,n),p=r?r(d):d;r||(a.__ngNativeEl__=d);let f=o.listen(p,i,a);if(!NI(i)){let h=r?m=>r(ge$4(m[e.index])):e.index;wp(h,t,n,i,a,f,false);}}return l}function NI(e){return e.startsWith("animation")||e.startsWith("transition")}function SI(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[ln$4],c=o[i+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(i+=2);}return null}function wp(e,t,n,r,o,i,s){let a=t.firstCreatePass?zs(t):null,c=Gs(n),l=c.length;c.push(o,i),a&&a.push(r,e,l,(l+1)*(s?-1:1));}function _d(e,t,n,r,o){let i=null,s=null,a=null,c=false,l=e.directiveToIndex.get(n.type);if(typeof l=="number"?i=l:[i,s,a]=l,s!==null&&a!==null&&e.hostDirectiveOutputs?.hasOwnProperty(r)){let u=e.hostDirectiveOutputs[r];for(let d=0;d<u.length;d+=2){let p=u[d];if(p>=s&&p<=a)c=true,pi$2(e,t,p,u[d+1],r,o);else if(p>a)break}}return n.outputs.hasOwnProperty(r)&&(c=true,pi$2(e,t,i,r,r,o)),c}function pi$2(e,t,n,r,o,i){let s=t[n],a=t[y$1],l=a.data[n].outputs[r],d=s[l].subscribe(i);wp(e.index,a,t,o,i,d,true);}function xI(){AI();}function AI(){let e=g$4(),t=P$3(),n=V$2();if(t.firstCreatePass&&OI(t,n),n.controlDirectiveIndex===-1)return;_e$4("NgSignalForms");let r=e[n.controlDirectiveIndex];t.data[n.controlDirectiveIndex].controlDef.create(r,new hi$2(e,t,n));}function RI(){kI();}function kI(){let e=g$4(),t=P$3(),n=hn$4();if(n.controlDirectiveIndex===-1)return;let r=t.data[n.controlDirectiveIndex].controlDef,o=e[n.controlDirectiveIndex];r.update(o,new hi$2(e,t,n));}var hi$2=class hi{lView;tView;tNode;hasPassThrough;constructor(t,n,r){this.lView=t,this.tView=n,this.tNode=r,this.hasPassThrough=!!(r.flags&4096);}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return ee$3(this.tNode,this.lView)}get descriptor(){return `<${this.tNode.value}>`}listenToCustomControlOutput(t,n){let r=this.tView.data[this.tNode.customControlIndex];_d(this.tNode,this.lView,r,t,Ht$5(this.tNode,this.lView,n));}listenToCustomControlModel(t){let n=this.tNode.flags&1024?"valueChange":"checkedChange",r=this.tView.data[this.tNode.customControlIndex];_d(this.tNode,this.lView,r,n,Ht$5(this.tNode,this.lView,t));}listenToDom(t,n){xc(this.tNode,this.tView,this.lView,void 0,this.lView[A$3],t,n,Ht$5(this.tNode,this.lView,n));}setInputOnDirectives(t,n){let r=this.tNode.inputs?.[t],o=this.tNode.hostDirectiveInputs?.[t];if(!r&&!o)return  false;let i=false;if(r)for(let s of r){if(s===this.tNode.controlDirectiveIndex)continue;let a=this.tView.data[s],c=this.lView[s];Wt$4(a,c,t,n),i=true;}if(o)for(let s=0;s<o.length;s+=2){let a=o[s];if(a===this.tNode.controlDirectiveIndex)continue;let c=o[s+1],l=this.tView.data[a],u=this.lView[a];Wt$4(l,u,c,n),i=true;}return i}setCustomControlModelInput(t){let n=this.tView.data[this.tNode.customControlIndex],r=this.tNode.flags&1024?"value":"checked";Xv(this.tNode,this.tView,this.lView,n,r,t);}customControlHasInput(t){if(this.tNode.customControlIndex===-1)return  false;let n=this.tView.data[this.tNode.customControlIndex];return (n.signalFormsInputPresence??=this._buildCustomControlInputCache(n))[t]===true}_buildCustomControlInputCache(t){let n={};for(let r in t.inputs)n[r]=true;if(t.hostDirectives!==null){let r=[...t.hostDirectives];for(;r.length>0;){let o=r.shift();if(typeof o!="function"){for(let s in o.inputs)n[o.inputs[s]]=true;let i=Md(o.directive);i!==null&&r.push(...i);continue}for(let i of o()){if(typeof i=="function")continue;if(i.inputs)for(let a=0;a<i.inputs.length;a+=2){let c=i.inputs[a+1]||i.inputs[a];n[c]=true;}let s=Md(i.directive);s!==null&&r.push(...s);}}}return n}};function Md(e){return typeof e=="function"&&"\u0275dir"in e?e.\u0275dir.hostDirectives??null:null}function OI(e,t,n){for(let o=t.directiveStart;o<t.directiveEnd;o++)if(e.data[o].controlDef){t.controlDirectiveIndex=o;break}if(t.controlDirectiveIndex===-1)return;let r=e.data[t.controlDirectiveIndex].controlDef;if(r.passThroughInput&&(t.inputs?.[r.passThroughInput]?.length??0)>1){t.flags|=4096;return}PI(e,t);}function PI(e,t){for(let n=t.directiveStart;n<t.directiveEnd;n++){let r=e.data[n];if(!(t.directiveToIndex&&!t.directiveToIndex.has(r.type))){if(Nd(r,"value")){t.flags|=1024,t.customControlIndex=n;return}if(Nd(r,"checked")){t.flags|=2048,t.customControlIndex=n;return}}}if(t.hostDirectiveInputs!==null&&t.hostDirectiveOutputs!==null&&t.directiveToIndex!==null){let n=(r,o)=>{let i=t.hostDirectiveInputs[r],s=t.hostDirectiveOutputs[r+"Change"];if(!i||!s)return  false;for(let a=0;a<i.length;a+=2){let c=i[a];for(let l=0;l<s.length;l+=2){let u=s[l];if(c===u)for(let d of t.directiveToIndex.values()){if(!Array.isArray(d))continue;let[p,f,h]=d;if(c>=f&&c<=h)return t.flags|=o,t.customControlIndex=p,true}}}return  false};if(n("value",1024)||n("checked",2048))return}}function Nd(e,t){return LI(e,t)&&FI(e,t+"Change")}function LI(e,t){return t in e.inputs}function FI(e,t){return t in e.outputs}var Ba$1=Symbol("BINDING");var Tp=new S$2("");function gi$3(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=Io$3(o,a);else if(i==2){let c=a,l=t[++s];r=Io$3(r,c+": "+l+";");}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o;}function Ar$2(e,t=0){let n=g$4();if(n===null)return ke$4(e,t);let r=V$2();return nf(r,n,B$5(e),t)}function jI(){let e="invalid";throw new Error(e)}function Cp(e,t,n,r,o){let i=r===null?null:{"":-1},s=o(e,n);if(s!==null){let a=s,c=null,l=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(s);break}BI(e,t,n,a,i,c,l);}i!==null&&r!==null&&VI(n,r,i);}function VI(e,t,n){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new b$4(-301,false);r.push(t[o],i);}}function HI(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index);}function BI(e,t,n,r,o,i,s){let a=r.length,c=null;for(let p=0;p<a;p++){let f=r[p];c===null&&we$4(f)&&(c=f,HI(e,n,p)),_a$1(ii$2(n,t),e,f.type);}zI(n,e.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let p=0;p<a;p++){let f=r[p];f.providersResolver&&f.providersResolver(f);}let l=false,u=false,d=ep(e,t,a,null);a>0&&(n.directiveToIndex=new Map);for(let p=0;p<a;p++){let f=r[p];if(n.mergedAttrs=In$2(n.mergedAttrs,f.hostAttrs),UI(e,n,t,d,f),GI(d,f,o),s!==null&&s.has(f)){let[m,_]=s.get(f);n.directiveToIndex.set(f.type,[d,m+n.directiveStart,_+n.directiveStart]);}else (i===null||!i.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let h=f.type.prototype;!l&&(h.ngOnChanges||h.ngOnInit||h.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=true),!u&&(h.ngOnChanges||h.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=true),d++;}$I(e,n,i);}function $I(e,t,n){for(let r=t.directiveStart;r<t.directiveEnd;r++){let o=e.data[r];if(n===null||!n.has(o))Sd(0,t,o,r),Sd(1,t,o,r),Ad(t,r,false);else {let i=n.get(o);xd(0,t,i,r),xd(1,t,i,r),Ad(t,r,true);}}}function Sd(e,t,n,r){let o=e===0?n.inputs:n.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s;e===0?s=t.inputs??={}:s=t.outputs??={},s[i]??=[],s[i].push(r),bp(t,i);}}function xd(e,t,n,r){let o=e===0?n.inputs:n.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s=o[i],a;e===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,i),bp(t,s);}}function bp(e,t){t==="class"?e.flags|=8:t==="style"&&(e.flags|=16);}function Ad(e,t,n){let{attrs:r,inputs:o,hostDirectiveInputs:i}=e;if(r===null||!n&&o===null||n&&i===null||dc(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let c=r[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!n&&o.hasOwnProperty(c)){let l=o[c];for(let u of l)if(u===t){s??=[],s.push(c,r[a+1]);break}}else if(n&&i.hasOwnProperty(c)){let l=i[c];for(let u=0;u<l.length;u+=2)if(l[u]===t){s??=[],s.push(l[u+1],r[a+1]);break}}a+=2;}e.initialInputs??=[],e.initialInputs.push(s);}function UI(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=tt$4(o.type)),s=new Bt$5(i,we$4(o),Ar$2,null);e.blueprint[r]=s,n[r]=s,WI(e,t,r,ep(e,n,o.hostVars,q$3),o);}function WI(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;qI(s)!=a&&s.push(a),s.push(n,r,i);}}function qI(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function GI(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;we$4(t)&&(n[""]=e);}}function zI(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t;}function Ac(e,t,n,r,o,i,s,a){let c=t[y$1],l=c.consts,u=ie$1(l,s),d=Sn$3(c,e,n,r,u);return Cp(c,t,d,ie$1(l,a),o),d.mergedAttrs=In$2(d.mergedAttrs,d.attrs),d.attrs!==null&&gi$3(d,d.attrs,false),d.mergedAttrs!==null&&gi$3(d,d.mergedAttrs,true),c.queries!==null&&c.queries.elementStart(c,d),d}function Rc(e,t){zd(e,t),Hs(t)&&e.queries.elementEnd(t);}function QI(e,t,n,r,o,i){let s=t.consts,a=ie$1(s,o),c=Sn$3(t,e,n,r,a);if(c.mergedAttrs=In$2(c.mergedAttrs,c.attrs),i!=null){let l=ie$1(s,i);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1);}return c.attrs!==null&&gi$3(c,c.attrs,false),c.mergedAttrs!==null&&gi$3(c,c.mergedAttrs,true),t.queries!==null&&t.queries.elementStart(t,c),c}var _p=typeof ShadowRoot<"u",ZI=typeof Document<"u";function YI(e){return Object.keys(e).map(t=>{let[n,r,o]=e[t],i={propName:n,templateName:t,isSignal:(r&ki$4.SignalBased)!==0};return o&&(i.transform=o),i})}function KI(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function JI(e,t,n){let r=t instanceof ce$3?t:t?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new di$2(n,r):n}function XI(e){let t=e.get(vr$3,null);if(t===null)throw new b$4(407,false);let n=e.get(Ep,null),r=e.get(Oe$5,null),o=e.get(Gt$6,null,{optional:true});return {rendererFactory:t,sanitizer:n,changeDetectionScheduler:r,ngReflect:false,tracingService:o}}function eE(e,t){let n=Mp(e);return Mf(t,n,n==="svg"?Bs:n==="math"?wu:null)}function Mp(e){return (e.selectors[0][0]||"div").toLowerCase()}var Tn$2=class Tn{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=YI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=KI(this.componentDef.outputs),this.cachedOutputs}constructor(t,n){this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=iv(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!n;}create(t,n,r,o,i,s){k$5(x$1.DynamicComponentStart);let a=v$2(null);try{let c=this.componentDef,l=JI(c,o||this.ngModule,t),u=XI(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(Dp(c),()=>this.createComponentRef(u,l,n,r,i,s)):this.createComponentRef(u,l,n,r,i,s)}finally{v$2(a);}}createComponentRef(t,n,r,o,i,s){let a=this.componentDef,c=tE(o,a,s,i),l=t.rendererFactory.createRenderer(null,a),u=o?Bv(l,o,a.encapsulation,n):eE(a,l),d=n.get(Tp,null),p=nE(u,()=>n.get(ir$4,null)??ac());d&&d.addHost(p);let f=s?.some(Rd)||i?.some(_=>typeof _!="function"&&_.bindings.some(Rd)),h=Dc(null,c,null,512|Xf(a),null,null,t,l,n,null,yf(u,n,true));d&&_p&&p instanceof ShadowRoot&&Oo$3(h,()=>{d.removeHost(p);}),h[L$3]=u,jo$3(h);let m=null;try{let _=Ac(L$3,h,2,"#host",()=>c.directiveRegistry,!0,0);xf(l,u,_),En$3(u,h),Oi$4(c,h,_),cc(c,_,h),Rc(c,_),r!==void 0&&oE(_,this.ngContentSelectors,r),m=me$4(_.index,h),h[H$3]=m[H$3],Mc(c,h,null);}catch(_){throw m!==null&&Na$1(m),Na$1(h),_}finally{k$5(x$1.DynamicComponentEnd),Vo$2();}return new mi$2(this.componentType,h,!!f)}};function tE(e,t,n,r){let o=e?["ng-version","22.0.4"]:sv(t.selectors[0]),i=null,s=null,a=0;if(n)for(let u of n)a+=u[Ba$1].requiredVars,u.create&&(u.targetIdx=0,(i??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let p of d.bindings){a+=p[Ba$1].requiredVars;let f=u+1;p.create&&(p.targetIdx=f,(i??=[]).push(p)),p.update&&(p.targetIdx=f,(s??=[]).push(p));}}let c=[t];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,p=wo$3(d);c.push(p);}return Ec(0,null,rE(i,s),1,a,c,null,null,null,[o],null)}function nE(e,t){let n=e.getRootNode?.();return ZI&&n instanceof Document?n.head:n&&_p&&n instanceof ShadowRoot?n:t().head}function rE(e,t){return !e&&!t?null:n=>{if(n&1&&e)for(let r of e)r.create();if(n&2&&t)for(let r of t)r.update();}}function Rd(e){let t=e[Ba$1].kind;return t==="input"||t==="twoWay"}var mi$2=class mi extends Ip{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,n,r){super(),this._rootLView=n,this._hasInputBindings=r,this._tNode=xo$3(n[y$1],L$3),this.location=Mn$2(this._tNode,n),this.instance=me$4(this._tNode.index,n)[H$3],this.hostView=this.changeDetectorRef=new ut$6(n,void 0),this.componentType=t;}setInput(t,n){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let o=this._rootLView;_c(r,o[y$1],o,t,n);this.previousInputValues.set(t,n);let s=me$4(r.index,o);Nc(s,1);}get injector(){return new lt$6(this._tNode,this._rootLView)}destroy(){this.hostView.destroy();}onDestroy(t){this.hostView.onDestroy(t);}};function oE(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null&&i.length?Array.from(i):null);}}var Li$4=(()=>{class e{static __NG_ELEMENT_ID__=iE}return e})();function iE(){let e=V$2();return Np(e,g$4())}var $a$1=class e extends Li$4{_lContainer;_hostTNode;_hostLView;constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r;}get element(){return Mn$2(this._hostTNode,this._hostLView)}get injector(){return new lt$6(this._hostTNode,this._hostLView)}get parentInjector(){let t=ic(this._hostTNode,this._hostLView);if(Yd(t)){let n=ri$2(t,this._hostLView),r=ni$2(t),o=n[y$1].data[r+8];return new lt$6(o,n)}else return new lt$6(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1);}get(t){let n=kd(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-j$4}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=ui$2(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,wn$3(this._hostTNode,s)),a}createComponent(t,n,r,o,i,s,a){let c,l=n||{};c=l.index,r=l.injector,o=l.projectableNodes,i=l.environmentInjector||l.ngModuleRef,s=l.directives,a=l.bindings;let u=new Tn$2(rt$4(t)),d=r||this.parentInjector;if(!i&&u.ngModule==null){let M=this.parentInjector.get(ce$3,null);M&&(i=M);}let p=rt$4(u.componentType??{}),f=ui$2(this._lContainer,p?.id??null),h=null,m=u.create(d,o,h,i,s,a);return this.insertImpl(m.hostView,c,wn$3(this._hostTNode,f)),m}insert(t,n){return this.insertImpl(t,n,true)}insertImpl(t,n,r){let o=t._lView;if(Cu(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else {let c=o[$$6],l=new e(c,c[Q$6],c[$$6]);l.detach(l.indexOf(t));}}let i=this._adjustIndex(n),s=this._lContainer;return xr$2(s,o,i,r),t.attachToViewContainerRef(),xs(ya$1(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=kd(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=mr$4(this._lContainer,n);r&&(Yn$2(ya$1(this._lContainer),n),Ai$4(r[y$1],r));}detach(t){let n=this._adjustIndex(t,-1),r=mr$4(this._lContainer,n);return r&&Yn$2(ya$1(this._lContainer),n)!=null?new ut$6(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function kd(e){return e[Xn$1]}function ya$1(e){return e[Xn$1]||(e[Xn$1]=[])}function Np(e,t){let n,r=t[e.index];return he$2(r)?n=r:(n=hp(r,t,null,e),t[e.index]=n,wc(t,n)),aE(n,t,e,r),new $a$1(n,e,t)}function sE(e,t){let n=e[A$3],r=n.createComment(""),o=ee$3(t,e),i=n.parentNode(o);return ai$2(n,i,r,n.nextSibling(o),false),r}var aE=uE;function uE(e,t,n,r){if(e[at$6])return;let o;n.type&8?o=ge$4(r):o=sE(t,n),e[at$6]=o;}var Ua$1=class e{queryList;matches=null;constructor(t){this.queryList=t;}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty();}},Wa=class e{queries;constructor(t=[]){this.queries=t;}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone());}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t);}detachView(t){this.dirtyQueriesWithMatches(t);}finishViewCreation(t){this.dirtyQueriesWithMatches(t);}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)Oc(t,n).matches!==null&&this.queries[n].setDirty();}},yi$4=class yi{flags;read;predicate;constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=gE(t):this.predicate=t;}},qa$1=class e{queries;constructor(t=[]){this.queries=t;}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n);}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t);}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i]);}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n);}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t);}},Ga=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=false;_declarationNodeIndex;_appliesToNextNode=true;constructor(t,n=-1){this.metadata=t,this._declarationNodeIndex=n;}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n);}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=false);}template(t,n){this.elementStart(t,n);}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=true,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,dE(n,i)),this.matchTNodeWithReadOption(t,n,Ko$2(n,t,i,false,false));}else r===yr$2?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,Ko$2(n,t,r,false,false));}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===Tr$2||o===Li$4||o===yr$2&&n.type&4)this.addMatch(n.index,-2);else {let i=Ko$2(n,t,o,false,false);i!==null&&this.addMatch(n.index,i);}else this.addMatch(n.index,r);}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n);}};function dE(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function fE(e,t){return e.type&11?Mn$2(e,t):e.type&4?Pi$5(e,t):null}function pE(e,t,n,r){return n===-1?fE(t,e):n===-2?hE(e,t,r):dr$4(e,e[y$1],n,t)}function hE(e,t,n){if(n===Tr$2)return Mn$2(t,e);if(n===yr$2)return Pi$5(t,e);if(n===Li$4)return Np(t,e)}function Sp(e,t,n,r){let o=t[Pe$4].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else {let u=i[l];a.push(pE(t,u,s[c+1],n.metadata.read));}}o.matches=a;}return o.matches}function za$1(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=Sp(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else {let l=i[a+1],u=t[-c];for(let d=j$4;d<u.length;d++){let p=u[d];p[st$6]===p[$$6]&&za$1(p[y$1],p,l,r);}if(u[kt$4]!==null){let d=u[kt$4];for(let p=0;p<d.length;p++){let f=d[p];za$1(f[y$1],f,l,r);}}}}}return r}function kc(e,t){return e[Pe$4].queries[t].queryList}function xp(e,t,n){let r=new si$2((n&4)===4);return Mu(e,t,r,r.destroy),(t[Pe$4]??=new Wa).queries.push(new Ua$1(r))-1}function Ap(e,t,n){let r=P$3();return r.firstCreatePass&&(kp(r,new yi$4(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=true)),xp(r,g$4(),t)}function Rp(e,t,n,r){let o=P$3();if(o.firstCreatePass){let i=V$2();kp(o,new yi$4(t,n,r),i.index),mE(o,e),(n&2)===2&&(o.staticContentQueries=true);}return xp(o,g$4(),n)}function gE(e){return e.split(",").map(t=>t.trim())}function kp(e,t,n){e.queries===null&&(e.queries=new qa$1),e.queries.track(new Ga(t,n));}function mE(e,t){let n=e.contentQueries||(e.contentQueries=[]),r=n.length?n[n.length-1]:-1;t!==r&&n.push(e.queries.length-1,t);}function Oc(e,t){return e.queries.getByIndex(t)}function Op(e,t){let n=e[y$1],r=Oc(n,t);return r.crossesNgTemplate?za$1(n,e,t,[]):Sp(n,e,r,t)}function Pp(e,t,n){let r,o=Hn$2(()=>{r._dirtyCounter();let i=yE(r,e);if(t&&i===void 0)throw new b$4(-951,false);return i});return r=o[F$4],r._dirtyCounter=Fe$3(0),r._flatValue=void 0,o}function Pc(e){return Pp(true,false)}function Lc(e){return Pp(true,true)}function Lp(e,t){let n=e[F$4];n._lView=g$4(),n._queryIndex=t,n._queryList=kc(n._lView,t),n._queryList.onDirty(()=>n._dirtyCounter.update(r=>r+1));}function yE(e,t){let n=e._lView,r=e._queryIndex;if(n===void 0||r===void 0||n[I$5]&4)return t?void 0:z$3;let o=kc(n,r),i=Op(n,r);return o.reset(i,af$1),t?o.first:o._changesDetected||e._flatValue===void 0?e._flatValue=o.toArray():e._flatValue}function Fc(e){return !!e&&typeof e.then=="function"}function Fp(e){return !!e&&typeof e.subscribe=="function"}var Cn$3=class Cn{},jp=class{};var vi$2=class vi extends Cn$3{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];constructor(t,n,r,o=true){super(),this.ngModuleType=t,this._parent=n;let i=au(t);this._bootstrapComponents=Qy(i.bootstrap),this._r3Injector=aa(t,n,[{provide:Cn$3,useValue:this},...r],Qn$2(t),new Set(["environment"])),o&&this.resolveInjectorInitializers();}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType);}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null;}onDestroy(t){this.destroyCbs.push(t);}},Ii$5=class Ii extends jp{moduleType;constructor(t){super(),this.moduleType=t;}create(t){return new vi$2(this.moduleType,t,[])}};var Ir$2=class Ir extends Cn$3{injector;instance=null;constructor(t){super();let n=new Nt$4([...t.providers,{provide:Cn$3,useValue:this}],t.parent||cn$4(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers();}destroy(){this.injector.destroy();}onDestroy(t){this.injector.onDestroy(t);}};function Vp(e,t,n=null){return new Ir$2({providers:e,parent:t,debugName:n,runEnvironmentInitializers:true}).injector}var vE=(()=>{class e{_injector;cachedInjectors=new Map;constructor(n){this._injector=n;}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let r=ks(false,n.type),o=r.length>0?Vp([r],this._injector,""):null;this.cachedInjectors.set(n,o);}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy();}finally{this.cachedInjectors.clear();}}static \u0275prov=re$1({token:e,providedIn:"environment",factory:()=>new e(ke$4(ce$3))})}return e})();function IE(e){return Dr$2(()=>{let t=Hp(e),n=x$2(w$3({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==sc.Eager,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?o=>o.get(vE).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??false,data:e.data||{},encapsulation:e.encapsulation||$t$4.Emulated,styles:e.styles||z$3,_:null,schemas:e.schemas||null,tView:null,id:""});t.standalone&&_e$4("NgStandalone"),Bp(n);let r=e.dependencies;return n.directiveDefs=Od(r,EE),n.pipeDefs=Od(r,cu),n.id=_E(n),n})}function EE(e){return rt$4(e)||wo$3(e)}function DE(e){return Dr$2(()=>({type:e.type,bootstrap:e.bootstrap||z$3,declarations:e.declarations||z$3,imports:e.imports||z$3,exports:e.exports||z$3,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function wE(e,t){if(e==null)return ot$6;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a,c;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i,c=o[3]||null):(i=o,s=o,a=ki$4.None,c=null),n[i]=[r,a,c],t[i]=s;}return n}function TE(e){if(e==null)return ot$6;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function CE(e){return Dr$2(()=>{let t=Hp(e);return Bp(t),t})}function bE(e){return {type:e.type,name:e.name,factory:null,pure:e.pure!==false,standalone:e.standalone??true,onDestroy:e.type.prototype.ngOnDestroy||null}}function Hp(e){let t={};return {type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||ot$6,exportAs:e.exportAs||null,standalone:e.standalone??true,signals:e.signals===true,selectors:e.selectors||z$3,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:wE(e.inputs,t),outputs:TE(e.outputs),debugInfo:null}}function Bp(e){e.features?.forEach(t=>t(e));}function Od(e,t){return e?()=>{let n=typeof e=="function"?e():e,r=[];for(let o of n){let i=t(o);i!==null&&r.push(i);}return r}:null}function _E(e){let t=0,n=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let i of r.join("|"))t=Math.imul(31,t)+i.charCodeAt(0)<<0;return t+=2147483648,"c"+t}var $p=new S$2("");var jc=(()=>{class e{resolve;reject;initialized=false;done=false;donePromise=new Promise((n,r)=>{this.resolve=n,this.reject=r;});appInits=T$3($p,{optional:true})??[];injector=T$3(le$2);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let o of this.appInits){let i=No$3(this.injector,o);if(Fc(i))n.push(i);else if(Fp(i)){let s=new Promise((a,c)=>{i.subscribe({complete:a,error:c});});n.push(s);}}let r=()=>{this.done=true,this.resolve();};Promise.all(n).then(()=>{r();}).catch(o=>{this.reject(o);}),n.length===0&&r(),this.initialized=true;}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function ME(e){return t=>{t.controlDef={create:(n,r)=>{n?.\u0275ngControlCreate(r);},update:(n,r)=>{n?.\u0275ngControlUpdate?.(r);},passThroughInput:e};}}function NE(e){let t=n=>{let r=Array.isArray(e);n.hostDirectives===null?(n.resolveHostDirectives=SE,n.hostDirectives=r?e.map(Qa):[e]):r?n.hostDirectives.unshift(...e.map(Qa)):n.hostDirectives.unshift(e);};return t.ngInherit=true,t}function SE(e){let t=[],n=false,r=null,o=null;for(let i=0;i<e.length;i++){let s=e[i];if(s.hostDirectives!==null){let a=t.length;r??=new Map,o??=new Map,Up(s,t,r,e),o.set(s,[a,t.length-1]);}i===0&&we$4(s)&&(n=true,t.push(s));}for(let i=n?1:0;i<e.length;i++)t.push(e[i]);return r!==null&&r.forEach((i,s)=>{xE(s.declaredInputs,i.inputs);}),[t,r,o]}function Up(e,t,n,r){if(e.hostDirectives!==null)for(let o of e.hostDirectives)if(typeof o=="function"){let i=o();for(let s of i)Pd(Qa(s),t,n,r);}else Pd(o,t,n,r);}function Pd(e,t,n,r){let o=wo$3(e.directive);if(Up(o,t,n,r),n.has(o)){let i=n.get(o);Ld(i,e.inputs,"input"),Ld(i,e.outputs,"output");}else r.includes(o)||(n.set(o,e),t.push(o));}function Ld(e,t,n){let r=n==="input"?e.inputs:e.outputs;Object.keys(t).forEach(o=>{let i=t[o];(!r.hasOwnProperty(o)||r[o]===i)&&(r[o]=i);});}function Qa(e){return typeof e=="function"?{directive:B$5(e),inputs:{},outputs:{}}:{directive:B$5(e.directive),inputs:Fd(e.inputs),outputs:Fd(e.outputs)}}function Fd(e){let t={};if(e!==void 0&&e.length>0)for(let n=0;n<e.length;n+=2)t[e[n]]=e[n+1];return t}function xE(e,t){for(let n in t)if(t.hasOwnProperty(n)){let r=t[n],o=e[n];e[r]=o;}}function AE(e){return Object.getPrototypeOf(e.prototype).constructor}function Wp(e){let t=AE(e.type),n=true,r=[e];for(;t;){let o;if(we$4(e))o=t.\u0275cmp||t.\u0275dir;else {if(t.\u0275cmp)throw new b$4(903,false);o=t.\u0275dir;}if(o){if(n){r.push(o);let s=e;s.inputs=va$1(e.inputs),s.declaredInputs=va$1(e.declaredInputs),s.outputs=va$1(e.outputs);let a=o.hostBindings;a&&LE(e,a);let c=o.viewQuery,l=o.contentQueries;if(c&&OE(e,c),l&&PE(e,l),RE(e,o),iu(e.outputs,o.outputs),we$4(o)&&o.data.animation){let u=e.data;u.animation=(u.animation||[]).concat(o.data.animation);}}let i=o.features;if(i)for(let s=0;s<i.length;s++){let a=i[s];a&&a.ngInherit&&a(e),a===Wp&&(n=false);}}t=Object.getPrototypeOf(t);}kE(r);}function RE(e,t){for(let n in t.inputs){if(!t.inputs.hasOwnProperty(n)||e.inputs.hasOwnProperty(n))continue;let r=t.inputs[n];r!==void 0&&(e.inputs[n]=r,e.declaredInputs[n]=t.declaredInputs[n]);}}function kE(e){let t=0,n=null;for(let r=e.length-1;r>=0;r--){let o=e[r];o.hostVars=t+=o.hostVars,o.hostAttrs=In$2(o.hostAttrs,n=In$2(n,o.hostAttrs));}}function va$1(e){return e===ot$6?{}:e===z$3?[]:e}function OE(e,t){let n=e.viewQuery;n?e.viewQuery=(r,o)=>{t(r,o),n(r,o);}:e.viewQuery=t;}function PE(e,t){let n=e.contentQueries;n?e.contentQueries=(r,o,i)=>{t(r,o,i),n(r,o,i);}:e.contentQueries=t;}function LE(e,t){let n=e.hostBindings;n?e.hostBindings=(r,o)=>{t(r,o),n(r,o);}:e.hostBindings=t;}function qp(e,t,n,r,o,i,s,a){if(n.firstCreatePass){e.mergedAttrs=In$2(e.mergedAttrs,e.attrs);let u=e.tView=Ec(2,e,o,i,s,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),u.queries=n.queries.embeddedTView(e));}a&&(e.flags|=a),pn$3(e,false);let c=jE(n,t);Ho$3()&&vc(n,t,c,e),En$3(c,t);let l=hp(c,t,c,e);t[r+L$3]=l,wc(t,l);}function FE(e,t,n,r,o,i,s,a,c,l,u){let d=n+L$3,p;return t.firstCreatePass?(p=Sn$3(t,d,4,s||null,a||null),Cp(t,e,p,ie$1(t.consts,l),Tc),zd(t,p)):p=t.data[d],qp(p,e,t,n,r,o,i,c),dn$4(p)&&Oi$4(t,e,p),l!=null&&Nr$2(e,p,u),p}function bn$4(e,t,n,r,o,i,s,a,c,l,u){let d=n+L$3,p;if(t.firstCreatePass){if(p=Sn$3(t,d,4,s||null,a||null),l!=null){let f=ie$1(t.consts,l);p.localNames=[];for(let h=0;h<f.length;h+=2)p.localNames.push(f[h],-1);}}else p=t.data[d];return qp(p,e,t,n,r,o,i,c),l!=null&&Nr$2(e,p,u),p}function Gp(e,t,n,r,o,i,s,a){let c=g$4(),l=P$3(),u=ie$1(l.consts,i);return FE(c,l,e,t,n,r,o,u,void 0,s,a),Gp}function zp(e,t,n,r,o,i,s,a){let c=g$4(),l=P$3(),u=ie$1(l.consts,i);return bn$4(c,l,e,t,n,r,o,u,void 0,s,a),zp}var jE=VE;function VE(e,t,n,r){return or$4(true),t[A$3].createComment("")}var HE=(()=>{class e{log(n){console.log(n);}warn(n){console.warn(n);}static \u0275fac=function(r){return new(r||e)};static \u0275prov=re$1({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var Qp=new S$2("");var Zp=new S$2("");function Yp(){os$1(()=>{let e="";throw new b$4(600,e)});}var BE=10;var Fi$4=(()=>{class e{_runningTick=false;_destroyed=false;_destroyListeners=[];_views=[];internalErrorHandler=T$3(Ft$4);afterRenderManager=T$3(Si$3);zonelessEnabled=T$3(sr$4);rootEffectScheduler=T$3($o$4);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=false;afterTick=new ne$3;get allViews(){return [...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=T$3(Lt$4);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Me$3(n=>!n))}constructor(){T$3(Gt$6,{optional:true});}whenStable(){let n;return new Promise(r=>{n=this.isStable.subscribe({next:o=>{o&&r();}});}).finally(()=>{n.unsubscribe();})}_injector=T$3(ce$3);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,r){return this.bootstrapImpl(n,r)}bootstrapImpl(n,r,o=le$2.NULL){return this._injector.get(ue$1).run(()=>{if(k$5(x$1.BootstrapComponentStart),!this._injector.get(jc).done){let M="";throw new b$4(405,M)}let a=rt$4(n),c=this._injector.get(Cn$3),l=new Tn$2(a,c);this.componentTypes.push(n);let{hostElement:u,directives:d,bindings:p}=$E(r),f=u||l.selector,h=l.create(o,[],f,c.injector,d,p),m=h.location.nativeElement,_=h.injector.get(Qp,null);return _?.registerApplication(m),h.onDestroy(()=>{this.detachView(h.hostView),ur$3(this.components,h),_?.unregisterApplication(m);}),this._loadComponent(h),k$5(x$1.BootstrapComponentEnd,h),h})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick();}_tick(){k$5(x$1.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Ni$3.CHANGE_DETECTION,this.tickImpl):this.tickImpl();}tickImpl=()=>{if(this._runningTick)throw k$5(x$1.ChangeDetectionEnd),new b$4(101,false);let n=v$2(null);try{this._runningTick=!0,this.synchronize();}finally{this._runningTick=false,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,v$2(n),this.afterTick.next(),k$5(x$1.ChangeDetectionEnd);}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(vr$3,null,{optional:true}));let n=0;for(;this.dirtyFlags!==0&&n++<BE;){k$5(x$1.ChangeDetectionSyncStart);try{this.synchronizeOnce();}finally{k$5(x$1.ChangeDetectionSyncEnd);}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let n=false;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!r&&!er$3(o))continue;let i=r&&!this.zonelessEnabled?0:1;up(o,i),n=true;}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}n||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews();}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>er$3(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8;}attachView(n){let r=n;this._views.push(r),r.attachToAppRef(this);}detachView(n){let r=n;ur$3(this._views,r),r.detachFromAppRef();}_loadComponent(n){this.attachView(n.hostView);try{this.tick();}catch(o){this.internalErrorHandler(o);}this.components.push(n),this._injector.get(Zp,[]).forEach(o=>o(n));}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy());}finally{this._destroyed=true,this._views=[],this._destroyListeners=[];}}onDestroy(n){return this._destroyListeners.push(n),()=>ur$3(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new b$4(406,false);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy();}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function $E(e){return e===void 0||typeof e=="string"||e instanceof Element?{hostElement:e}:e}function ur$3(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1);}function Kp(e,t,n,r){let o=g$4(),i=Ke$3();if(se$1(o,i,t)){P$3();let a=hn$4();Zv(a,o,e,t,n,r);}return Kp}function Xo$2(e){if(_e$4("NgAnimateEnter"),!_r$2)return Xo$2;let t=g$4();if(Lf(t))return Xo$2;let n=V$2(),r=t[Z$4].get(ue$1);return Hf(vd(t),n,()=>UE(t,n,e,r)),Gf(t[Z$4]),zf(t[Z$4],vd(t)),Xo$2}function UE(e,t,n,r){let o=ee$3(t,e),i=e[A$3],s=Vf(n),a=[],c=false,l=d=>{if(pr$3(d)!==o)return;let p=d instanceof AnimationEvent?"animationend":"transitionend";r.runOutsideAngular(()=>{i.listen(o,p,u);});},u=d=>{pr$3(d)===o&&(hc(d,o)&&(c=true),WE(d,o,i));};if(s&&s.length>0){r.runOutsideAngular(()=>{a.push(i.listen(o,"animationstart",l)),a.push(i.listen(o,"transitionstart",l));}),lv(o,s,a);for(let d of s)i.addClass(o,d);r.runOutsideAngular(()=>{requestAnimationFrame(()=>{if(!c&&(Uf(o,Vt$4,_r$2),!Vt$4.has(o))){for(let d of s)i.removeClass(o,d);pc(o);}});});}}function WE(e,t,n){let r=Dn$3.get(t);if(!(pr$3(e)!==t||!r)&&hc(e,t)){e.stopPropagation();for(let o of r.classList)n.removeClass(t,o);pc(t);}}function ei$2(e){if(_e$4("NgAnimateLeave"),!_r$2)return ei$2;let t=g$4();if(Lf(t))return ei$2;let r=V$2(),o=t[Z$4].get(ue$1);return Hf(Mi$3(t),r,()=>qE(t,r,e,o)),Gf(t[Z$4]),ei$2}function qE(e,t,n,r){let{promise:o,resolve:i}=sa(),s=ee$3(t,e),a=e[A$3];Ut$5.add(e[De$5]),(Mi$3(e).get(t.index).resolvers??=[]).push(i);let c=Vf(n);return c&&c.length>0?GE(s,t,e,c,a,r):i(),{promise:o,resolve:i}}function GE(e,t,n,r,o,i){dv(e,o);let s=[],a=Mi$3(n).get(t.index)?.resolvers,c,l=false,u=d=>{if(!(pr$3(d)!==e&&d.type!=="animation-fallback")&&(d.type==="animation-fallback"||hc(d,e))){if(l=true,c&&clearTimeout(c),d.type!=="animation-fallback"&&d.stopPropagation(),Vt$4.delete(e),yd(t,e),Array.isArray(t.projection))for(let f of r)o.removeClass(e,f);Id(a,s),Ed(n,t);}};i.runOutsideAngular(()=>{s.push(o.listen(e,"animationend",u)),s.push(o.listen(e,"transitionend",u));}),jf(t,e);for(let d of r)o.addClass(e,d);i.runOutsideAngular(()=>{requestAnimationFrame(()=>{if(l)return;Uf(e,Vt$4,_r$2);let d=Vt$4.get(e);d?(c=setTimeout(()=>{u(new CustomEvent("animation-fallback"));},d.duration+50),s.push(()=>clearTimeout(c))):(yd(t,e),Id(a,s),Ed(n,t));});});}function zE(){return g$4()[Y$4][H$3]}var Za=class{destroy(t){}updateValue(t,n){}swap(t,n){let r=Math.min(t,n),o=Math.max(t,n),i=this.detach(o);if(o-r>1){let s=this.detach(r);this.attach(r,i),this.attach(o,s);}else this.attach(r,i);}move(t,n){this.attach(n,this.detach(t));}};function Ia$1(e,t,n,r,o){return e===n&&Object.is(t,r)?1:Object.is(o(e,t),o(n,r))?-1:0}function QE(e,t,n,r){let o,i,s=0,a=e.length-1;if(Array.isArray(t)){v$2(r);let l=t.length-1;for(v$2(null);s<=a&&s<=l;){let u=e.at(s),d=t[s],p=Ia$1(s,u,s,d,n);if(p!==0){p<0&&e.updateValue(s,d),s++;continue}let f=e.at(a),h=t[l],m=Ia$1(a,f,l,h,n);if(m!==0){m<0&&e.updateValue(a,h),a--,l--;continue}let _=n(s,u),M=n(a,f),ye=n(s,d);if(Object.is(ye,M)){let Bi=n(l,h);Object.is(Bi,_)?(e.swap(s,a),e.updateValue(a,h),l--,a--):e.move(a,s),e.updateValue(s,d),s++;continue}if(o??=new Ei$4,i??=Vd$1(e,s,a,n),Ya$1(e,o,s,ye))e.updateValue(s,d),s++,a++;else if(i.has(ye))o.set(_,e.detach(s)),a--;else {let Bi=e.create(s,t[s]);e.attach(s,Bi),s++,a++;}}for(;s<=l;)jd(e,o,n,s,t[s]),s++;}else if(t!=null){v$2(r);let l=t[Symbol.iterator]();v$2(null);let u=l.next();for(;!u.done&&s<=a;){let d=e.at(s),p=u.value,f=Ia$1(s,d,s,p,n);if(f!==0)f<0&&e.updateValue(s,p),s++,u=l.next();else {o??=new Ei$4,i??=Vd$1(e,s,a,n);let h=n(s,p);if(Ya$1(e,o,s,h))e.updateValue(s,p),s++,a++,u=l.next();else if(!i.has(h))e.attach(s,e.create(s,p)),s++,a++,u=l.next();else {let m=n(s,d);o.set(m,e.detach(s)),a--;}}}for(;!u.done;)jd(e,o,n,e.length,u.value),u=l.next();}for(;s<=a;)e.destroy(e.detach(a--));o?.forEach(l=>{e.destroy(l);});}function Ya$1(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),true):false}function jd(e,t,n,r,o){if(Ya$1(e,t,r,n(r,o)))e.updateValue(r,o);else {let i=e.create(r,o);e.attach(r,i);}}function Vd$1(e,t,n,r){let o=new Set;for(let i=t;i<=n;i++)o.add(r(i,e.at(i)));return o}var Ei$4=class Ei{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return  false;let n=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(t,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(t),true}get(t){return this.kvMap.get(t)}set(t,n){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(r);)r=o.get(r);o.set(r,n);}else this.kvMap.set(t,n);}forEach(t){for(let[n,r]of this.kvMap)if(t(r,n),this._vMap!==void 0){let o=this._vMap;for(;o.has(r);)r=o.get(r),t(r,n);}}};function ZE(e,t,n,r,o,i,s,a){_e$4("NgControlFlow");let c=g$4(),l=P$3(),u=ie$1(l.consts,i);return bn$4(c,l,e,t,n,r,o,u,256,s,a),Vc}function Vc(e,t,n,r,o,i,s,a){_e$4("NgControlFlow");let c=g$4(),l=P$3(),u=ie$1(l.consts,i);return bn$4(c,l,e,t,n,r,o,u,512,s,a),Vc}function YE(e,t){_e$4("NgControlFlow");let n=g$4(),r=Ke$3(),o=n[r]!==q$3?n[r]:-1,i=o!==-1?Di$3(n,L$3+o):void 0,s=0;if(se$1(n,r,e)){let a=v$2(null);try{if(i!==void 0&&mp(i,s),e!==-1){let c=L$3+e,l=Di$3(n,c),u=ec(n[y$1],c),d=vp(l,u,n),p=Sr$2(n,u,t,{dehydratedView:d});xr$2(l,p,s,wn$3(u,d));}}finally{v$2(a);}}else if(i!==void 0){let a=gp(i,s);a!==void 0&&(a[H$3]=t);}}var Ka=class{lContainer;$implicit;$index;constructor(t,n,r){this.lContainer=t,this.$implicit=n,this.$index=r;}get $count(){return this.lContainer.length-j$4}};function KE(e,t){return t}var Ja=class{hasEmptyBlock;trackByFn;liveCollection;constructor(t,n,r){this.hasEmptyBlock=t,this.trackByFn=n,this.liveCollection=r;}};function JE(e,t,n,r,o,i,s,a,c,l,u,d,p){_e$4("NgControlFlow");let f=g$4(),h=P$3(),m=c!==void 0,_=g$4(),M=a?s.bind(_[Y$4][H$3]):s,ye=new Ja(m,M);_[L$3+e]=ye,bn$4(f,h,e+1,t,n,r,o,ie$1(h.consts,i),256);}var Xa=class extends Za{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=false;constructor(t,n,r){super(),this.lContainer=t,this.hostLView=n,this.templateTNode=r;}get length(){return this.lContainer.length-j$4}at(t){return this.getLView(t)[H$3].$implicit}attach(t,n){let r=n[xt$3];this.needsIndexUpdate||=t!==this.length,xr$2(this.lContainer,n,t,wn$3(this.templateTNode,r)),eD(this.lContainer,t);}detach(t){return this.needsIndexUpdate||=t!==this.length-1,tD(this.lContainer,t),nD(this.lContainer,t)}create(t,n){let r=ui$2(this.lContainer,this.templateTNode.tView.ssrId);return Sr$2(this.hostLView,this.templateTNode,new Ka(this.lContainer,n,t),{dehydratedView:r})}destroy(t){Ai$4(t[y$1],t);}updateValue(t,n){this.getLView(t)[H$3].$implicit=n;}reset(){this.needsIndexUpdate=false;}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[H$3].$index=t;}getLView(t){return rD(this.lContainer,t)}};function XE(e){let t=v$2(null),n=Te$2();try{let r=g$4(),o=r[y$1],i=r[n],s=n+1,a=Di$3(r,s);if(i.liveCollection===void 0){let l=ec(o,s);i.liveCollection=new Xa(a,r,l);}else i.liveCollection.reset();let c=i.liveCollection;if(QE(c,e,i.trackByFn,t),c.updateIndexes(),i.hasEmptyBlock){let l=Ke$3(),u=c.length===0;if(se$1(r,l,u)){let d=n+2,p=Di$3(r,d);if(u){let f=ec(o,d),h=vp(p,f,r),m=Sr$2(r,f,void 0,{dehydratedView:h});xr$2(p,m,0,wn$3(f,h));}else o.firstUpdatePass&&EI(p),mp(p,0);}}}finally{v$2(t);}}function Di$3(e,t){return e[t]}function eD(e,t){if(e.length<=j$4)return;let n=j$4+t,r=e[n],o=r?r[pe$4]:void 0;if(r&&o&&o.detachedLeaveAnimationFns&&o.detachedLeaveAnimationFns.length>0){let i=r[Z$4];Ev(i,o),Ut$5.delete(r[De$5]),o.detachedLeaveAnimationFns=void 0;}}function tD(e,t){if(e.length<=j$4)return;let n=j$4+t,r=e[n],o=r?r[pe$4]:void 0;o&&o.leave&&o.leave.size>0&&(o.detachedLeaveAnimationFns=[]);}function nD(e,t){return mr$4(e,t)}function rD(e,t){return gp(e,t)}function ec(e,t){return xo$3(e,t)}function Jp(e,t,n){let r=g$4(),o=Ke$3();if(se$1(r,o,t)){P$3();let s=hn$4();rp(s,r,e,t,r[A$3],n);}return Jp}function tc(e,t,n,r,o){_c(t,e,n,o?"class":"style",r);}function wi$2(e,t,n,r){let o=g$4(),i=o[y$1],s=e+L$3,a=i.firstCreatePass?Ac(s,o,2,t,Tc,Po$3(),n,r):i.data[s];if(Ye$3(a)){let c=o[Ee$4].tracingService;if(c&&c.componentCreate){let l=i.data[a.directiveStart+a.componentOffset];return c.componentCreate(Dp(l),()=>(Hd(e,t,o,a,r),wi$2))}}return Hd(e,t,o,a,r),wi$2}function Hd(e,t,n,r,o){if(Cc(r,n,e,t,th),dn$4(r)){let i=n[y$1];Oi$4(i,n,r),cc(i,r,n);}o!=null&&Nr$2(n,r);}function Hc(){let e=P$3(),t=V$2(),n=bc(t);return e.firstCreatePass&&Rc(e,n),Ys(n)&&Ks(),Qs(),n.classesWithoutHost!=null&&$m(n)&&tc(e,n,g$4(),n.classesWithoutHost,true),n.stylesWithoutHost!=null&&Um(n)&&tc(e,n,g$4(),n.stylesWithoutHost,false),Hc}function Xp(e,t,n,r){return wi$2(e,t,n,r),Hc(),Xp}function Bc(e,t,n,r){let o=g$4(),i=o[y$1],s=e+L$3,a=i.firstCreatePass?QI(s,i,2,t,n,r):i.data[s];return Cc(a,o,e,t,th),r!=null&&Nr$2(o,a),Bc}function $c(){let e=V$2(),t=bc(e);return Ys(t)&&Ks(),Qs(),$c}function eh(e,t,n,r){return Bc(e,t,n,r),$c(),eh}var th=(e,t,n,r,o)=>(or$4(true),Mf(t[A$3],r,ia$1()));function Uc(e,t,n){let r=g$4(),o=r[y$1],i=e+L$3,s=o.firstCreatePass?Ac(i,r,8,"ng-container",Tc,Po$3(),t,n):o.data[i];if(Cc(s,r,e,"ng-container",oD),dn$4(s)){let a=r[y$1];Oi$4(a,r,s),cc(a,s,r);}return n!=null&&Nr$2(r,s),Uc}function Wc(){let e=P$3(),t=V$2(),n=bc(t);return e.firstCreatePass&&Rc(e,n),Wc}function nh(e,t,n){return Uc(e,t,n),Wc(),nh}var oD=(e,t,n,r,o)=>(or$4(true),Hy(t[A$3],""));function iD(){return g$4()}function rh(e,t,n){let r=g$4(),o=Ke$3();if(se$1(r,o,t)){P$3();let s=hn$4();op(s,r,e,t,r[A$3],n);}return rh}var Rr$2="en-US";function oh(e){typeof e=="string"&&(e.toLowerCase().replace(/_/g,"-"));}function ih(e,t,n){let r=g$4(),o=P$3(),i=V$2();return ah(o,r,r[A$3],i,e,t,n),ih}function sh(e,t,n){let r=g$4(),o=P$3(),i=V$2();return (i.type&3||n)&&xc(i,o,r,n,r[A$3],e,t,Ht$5(i,r,t)),sh}function ah(e,t,n,r,o,i,s){let a=true,c=null;if((r.type&3||s)&&(c??=Ht$5(r,t,i),xc(r,e,t,s,n,o,i,c)&&(a=false)),a){let l=r.outputs?.[o],u=r.hostDirectiveOutputs?.[o];if(u&&u.length)for(let d=0;d<u.length;d+=2){let p=u[d],f=u[d+1];c??=Ht$5(r,t,i),pi$2(r,t,p,f,o,c);}if(l&&l.length)for(let d of l)c??=Ht$5(r,t,i),pi$2(r,t,d,o,o,c);}}function aD(e=1){return $u(e)}function cD(e,t){let n=null,r=ev(e);for(let o=0;o<t.length;o++){let i=t[o];if(i==="*"){n=o;continue}if(r===null?Of(e,i,true):rv(r,i))return o}return n}function lD(e){let t=g$4()[Y$4][Q$6];if(!t.projection){let n=e?e.length:1,r=t.projection=hu(n,null),o=r.slice(),i=t.child;for(;i!==null;){if(i.type!==128){let s=e?cD(i,e):0;s!==null&&(o[s]?o[s].projectionNext=i:r[s]=i,o[s]=i);}i=i.next;}}}function uD(e,t=0,n,r,o,i){let s=g$4(),a=P$3(),c=null;let l=Sn$3(a,L$3+e,16,null,null);l.projection===null&&(l.projection=t),ea$1();let d=!s[xt$3]||Zs();s[Y$4][Q$6].projection[l.projection]===null&&c!==null?dD(s,a,c):d&&!Ci$3(l)&&Ov(a,s,l);}function dD(e,t,n){let r=L$3+n,o=t.data[r],i=e[r],s=ui$2(i,o.tView.ssrId),a=Sr$2(e,o,void 0,{dehydratedView:s});xr$2(i,a,0,wn$3(o,s));}function ch(e,t,n,r){return Rp(e,t,n,r),ch}function lh(e,t,n){return Ap(e,t,n),lh}function fD(e){let t=g$4(),n=P$3(),r=Fo$2();rr$4(r+1);let o=Oc(n,r);if(e.dirty&&Tu(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else {let i=Op(t,r);e.reset(i,af$1),e.notifyOnChanges();}return  true}return  false}function pD(){return kc(g$4(),Fo$2())}function uh(e,t,n,r,o){return Lp(t,Rp(e,n,r,o)),uh}function dh(e,t,n,r){return Lp(e,Ap(t,n,r)),dh}function hD(e=1){rr$4(Fo$2()+e);}function gD(e){let t=ku();return Ao$3(t,L$3+e)}function Qo$3(e,t){return e<<17|t<<2}function qt$4(e){return e>>17&32767}function mD(e){return (e&2)==2}function yD(e,t){return e&131071|t<<17}function nc(e){return e|2}function _n$3(e){return (e&131068)>>2}function Ea(e,t){return e&-131069|t<<2}function vD(e){return (e&1)===1}function rc(e){return e|1}function ID(e,t,n,r,o,i){let s=i?t.classBindings:t.styleBindings,a=qt$4(s),c=_n$3(s);e[r]=n;let l=false,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||an$4(d,u)>0)&&(l=true);}else u=n;if(o)if(c!==0){let p=qt$4(e[a+1]);e[r+1]=Qo$3(p,a),p!==0&&(e[p+1]=Ea(e[p+1],r)),e[a+1]=yD(e[a+1],r);}else e[r+1]=Qo$3(a,0),a!==0&&(e[a+1]=Ea(e[a+1],r)),a=r;else e[r+1]=Qo$3(c,0),a===0?a=r:e[c+1]=Ea(e[c+1],r),c=r;l&&(e[r+1]=nc(e[r+1])),Bd(e,u,r,true),Bd(e,u,r,false),ED(t,u,e,r,i),s=Qo$3(a,c),i?t.classBindings=s:t.styleBindings=s;}function ED(e,t,n,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof t=="string"&&an$4(i,t)>=0&&(n[r+1]=rc(n[r+1]));}function Bd(e,t,n,r){let o=e[n+1],i=t===null,s=r?qt$4(o):_n$3(o),a=false;for(;s!==0&&(a===false||i);){let c=e[s],l=e[s+1];DD(c,t)&&(a=true,e[s+1]=r?rc(l):nc(l)),s=r?qt$4(l):_n$3(l);}a&&(e[n+1]=r?nc(o):rc(o));}function DD(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?true:Array.isArray(e)&&typeof t=="string"?an$4(e,t)>=0:false}var be$4={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function wD(e){return e.substring(be$4.key,be$4.keyEnd)}function TD(e){return CD(e),fh(e,ph(e,0,be$4.textEnd))}function fh(e,t){let n=be$4.textEnd;return n===t?-1:(t=be$4.keyEnd=bD(e,be$4.key=t,n),ph(e,t,n))}function CD(e){be$4.key=0,be$4.keyEnd=0,be$4.value=0,be$4.valueEnd=0,be$4.textEnd=e.length;}function ph(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function bD(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function hh(e,t,n){return mh(e,t,n,false),hh}function gh(e,t){return mh(e,t,null,true),gh}function _D(e){ND(OD,MD,e,true);}function MD(e,t){for(let n=TD(t);n>=0;n=fh(t,n))_o$3(e,wD(t),true);}function mh(e,t,n,r){let o=g$4(),i=P$3(),s=nr$4(2);if(i.firstUpdatePass&&vh(i,e,s,r),t!==q$3&&se$1(o,s,t)){let a=i.data[Te$2()];Ih(i,a,o,o[A$3],e,o[s+1]=LD(t,n),r,s);}}function ND(e,t,n,r){let o=P$3(),i=nr$4(2);o.firstUpdatePass&&vh(o,null,i,r);let s=g$4();if(n!==q$3&&se$1(s,i,n)){let a=o.data[Te$2()];if(Eh(a,r)&&!yh(o,i)){let c=a.classesWithoutHost;c!==null&&(n=Io$3(c,n||"")),tc(o,a,s,n,r);}else PD(o,a,s,s[A$3],s[i+1],s[i+1]=kD(e,t,n),r,i);}}function yh(e,t){return t>=e.expandoStartIndex}function vh(e,t,n,r){let o=e.data;if(o[n+1]===null){let i=o[Te$2()],s=yh(e,n);Eh(i,r)&&t===null&&!s&&(t=false),t=SD(o,i,t,r),ID(o,i,t,n,s,r);}}function SD(e,t,n,r){let o=ju$1(e),i=r?t.residualClasses:t.residualStyles;if(o===null)(r?t.classBindings:t.styleBindings)===0&&(n=Da$1(null,e,t,n,r),n=Er$2(n,t.attrs,r),i=null);else {let s=t.directiveStylingLast;if(s===-1||e[s]!==o)if(n=Da$1(o,e,t,n,r),i===null){let c=xD(e,t,r);c!==void 0&&Array.isArray(c)&&(c=Da$1(null,e,t,c[1],r),c=Er$2(c,t.attrs,r),AD(e,t,r,c));}else i=RD(e,t,r);}return i!==void 0&&(r?t.residualClasses=i:t.residualStyles=i),n}function xD(e,t,n){let r=n?t.classBindings:t.styleBindings;if(_n$3(r)!==0)return e[qt$4(r)]}function AD(e,t,n,r){let o=n?t.classBindings:t.styleBindings;e[qt$4(o)]=r;}function RD(e,t,n){let r,o=t.directiveEnd;for(let i=1+t.directiveStylingLast;i<o;i++){let s=e[i].hostAttrs;r=Er$2(r,s,n);}return Er$2(r,t.attrs,n)}function Da$1(e,t,n,r,o){let i=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(i=t[a],r=Er$2(r,i.hostAttrs,o),i!==e);)a++;return e!==null&&(n.directiveStylingLast=a),r}function Er$2(e,t,n){let r=n?1:2,o=-1;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];typeof s=="number"?o=s:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),_o$3(e,s,n?true:t[++i]));}return e===void 0?null:e}function kD(e,t,n){if(n==null||n==="")return z$3;let r=[],o=Nn$2(n);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],true);else if(o instanceof Set)for(let i of o)e(r,i,true);else if(typeof o=="object")for(let i in o)Object.hasOwn(o,i)&&e(r,i,o[i]);else typeof o=="string"&&t(r,o);return r}function OD(e,t,n){let r=String(t);r!==""&&!r.includes(" ")&&_o$3(e,r,n);}function PD(e,t,n,r,o,i,s,a){o===q$3&&(o=z$3);let c=0,l=0,u=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;u!==null||d!==null;){let p=c<o.length?o[c+1]:void 0,f=l<i.length?i[l+1]:void 0,h=null,m;u===d?(c+=2,l+=2,p!==f&&(h=d,m=f)):d===null||u!==null&&u<d?(c+=2,h=u):(l+=2,h=d,m=f),h!==null&&Ih(e,t,n,r,h,m,s,a),u=c<o.length?o[c]:null,d=l<i.length?i[l]:null;}}function Ih(e,t,n,r,o,i,s,a){if(!(t.type&3))return;let c=e.data,l=c[a+1],u=vD(l)?$d(c,t,n,o,_n$3(l),s):void 0;if(!Ti$5(u)){Ti$5(i)||mD(l)&&(i=$d(c,null,n,o,a,s));let d=$s(Te$2(),n);Lv(r,s,d,o,i);}}function $d(e,t,n,r,o,i){let s=t===null,a;for(;o>0;){let c=e[o],l=Array.isArray(c),u=l?c[1]:c,d=u===null,p=n[o+1];p===q$3&&(p=d?z$3:void 0);let f=d?Mo$2(p,r):u===r?p:void 0;if(l&&!Ti$5(f)&&(f=Mo$2(c,r)),Ti$5(f)&&(a=f,s))return a;let h=e[o+1];o=s?qt$4(h):_n$3(h);}if(t!==null){let c=i?t.residualClasses:t.residualStyles;c!=null&&(a=Mo$2(c,r));}return a}function Ti$5(e){return e!==void 0}function LD(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=Qn$2(Nn$2(e)))),e}function Eh(e,t){return (e.flags&(t?8:16))!==0}function FD(e,t=""){let n=g$4(),r=P$3(),o=e+L$3,i=r.firstCreatePass?Sn$3(r,o,1,t,null):r.data[o],s=jD(r,n,i,t);n[o]=s,Ho$3()&&vc(r,n,s,i),pn$3(i,false);}var jD=(e,t,n,r)=>(or$4(true),jy(t[A$3],r));function VD(e,t,n,r=""){return se$1(e,Ke$3(),n)?t+de$1(n)+r:q$3}function HD(e,t,n,r,o,i=""){let s=na$1(),a=fi$4(e,s,n,o);return nr$4(2),a?t+de$1(n)+r+de$1(o)+i:q$3}function BD(e,t,n,r,o,i,s,a,c,l=""){let u=na$1(),d=MI(e,u,n,o,s,c);return nr$4(4),d?t+de$1(n)+r+de$1(o)+i+de$1(s)+a+de$1(c)+l:q$3}function Dh(e){return qc("",e),Dh}function qc(e,t,n){let r=g$4(),o=VD(r,e,t,n);return o!==q$3&&Gc(r,Te$2(),o),qc}function wh(e,t,n,r,o){let i=g$4(),s=HD(i,e,t,n,r,o);return s!==q$3&&Gc(i,Te$2(),s),wh}function Th(e,t,n,r,o,i,s,a,c){let l=g$4(),u=BD(l,e,t,n,r,o,i,s,a,c);return u!==q$3&&Gc(l,Te$2(),u),Th}function Gc(e,t,n){let r=$s(t,e);Vy(e[A$3],r,n);}function Ch(e,t,n){Uo$3(t)&&(t=t());let r=g$4(),o=Ke$3();if(se$1(r,o,t)){P$3();let s=hn$4();rp(s,r,e,t,r[A$3],n);}return Ch}function $D(e,t){let n=Uo$3(e);return n&&e.set(t),n}function bh(e,t){let n=g$4(),r=P$3(),o=V$2();return ah(r,n,n[A$3],o,e,t),bh}function UD(e){return se$1(g$4(),Ke$3(),e)?de$1(e):q$3}function Ud(e,t,n){let r=P$3();r.firstCreatePass&&_h(t,r.data,r.blueprint,we$4(e),n);}function _h(e,t,n,r,o){if(e=B$5(e),Array.isArray(e))for(let i=0;i<e.length;i++)_h(e[i],t,n,r,o);else {let i=P$3(),s=g$4(),a=V$2(),c=Mt$4(e)?e:B$5(e.provide),l=Ls(e),u=a.providerIndexes&1048575,d=a.directiveStart,p=a.providerIndexes>>20;if(Mt$4(e)||!e.multi){let f=new Bt$5(l,o,Ar$2,null),h=Ta$1(c,t,u+p,d);h===-1?(_a$1(ii$2(a,s),i,c),wa$1(i,e,t.length),t.push(c),a.directiveStart++,a.directiveEnd++,n.push(f),s.push(f)):(n[h]=f,s[h]=f);}else {let f=Ta$1(c,t,u+p,d),h=Ta$1(c,t,u,u+p),m=f>=0&&n[f],_=h>=0&&n[h];if(!m){_a$1(ii$2(a,s),i,c);let M=GD(WD,n.length,o,r,l);_&&(n[h].providerFactory=M),wa$1(i,e,t.length,0),t.push(c),a.directiveStart++,a.directiveEnd++,n.push(M),s.push(M);}else {let M=Mh(n[f],l,r);wa$1(i,e,f>-1?f:h,M);}r&&_&&n[h].componentProviders++;}}}function wa$1(e,t,n,r){let o=Mt$4(t),i=Iu(t);if(o||i){let c=(i?B$5(t.useClass):t).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!o&&t.multi){let u=l.indexOf(n);u===-1?l.push(n,[r,c]):l[u+1].push(r,c);}else l.push(n,c);}}}function Mh(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function Ta$1(e,t,n,r){for(let o=n;o<r;o++)if(t[o]===e)return o;return  -1}function WD(e,t,n,r,o){return oc(this.multi,[])}function oc(e,t){for(let n=0;n<e.length;n++){let r=e[n];t.push(r());}return t}function GD(e,t,n,r,o,i){let s=new Bt$5(e,n,Ar$2,null);return s.multi=[],s.index=t,s.componentProviders=0,Mh(s,o,r&&!n),s}function zD(e,t){return n=>{n.providersResolver=(r,o)=>Ud(r,o?o(e):e,false);}}function QD(e,t){let n=tr$3()+e,r=g$4();return r[n]===q$3?Sc(r,n,t()):_I(r,n)}function ZD(e,t,n){return Sh(g$4(),tr$3(),e,t,n)}function Nh(e,t){let n=e[t];return n===q$3?void 0:n}function Sh(e,t,n,r,o,i){let s=t+n;return se$1(e,s,o)?Sc(e,s+1,i?r.call(i,o):r(o)):Nh(e,s+1)}function YD(e,t,n,r,o,i,s){let a=t+n;return fi$4(e,a,o,i)?Sc(e,a+2,s?r.call(s,o,i):r(o,i)):Nh(e,a+2)}function KD(e,t){let n=P$3(),r,o=e+L$3;n.firstCreatePass?(r=JD(t,n.pipeRegistry),n.data[o]=r,r.onDestroy&&(n.destroyHooks??=[]).push(o,r.onDestroy)):r=n.data[o];let i=r.factory||(r.factory=tt$4(r.type)),a=J$3(Ar$2);try{let c=oi$2(!1),l=i();return oi$2(c),Us(n,g$4(),o,l),l}finally{J$3(a);}}function JD(e,t){if(t)for(let n=t.length-1;n>=0;n--){let r=t[n];if(e===r.name)return r}}function XD(e,t,n){let r=e+L$3,o=g$4(),i=Ao$3(o,r);return xh(o,r)?Sh(o,tr$3(),t,i.transform,n,i):i.transform(n)}function ew(e,t,n,r){let o=e+L$3,i=g$4(),s=Ao$3(i,o);return xh(i,o)?YD(i,tr$3(),t,s.transform,n,r,s):s.transform(n,r)}function xh(e,t){return e[y$1].data[t].pure}function tw(e,t){return Pi$5(e,t)}var Ah=(()=>{class e{applicationErrorHandler=T$3(Ft$4);appRef=T$3(Fi$4);taskService=T$3(Lt$4);ngZone=T$3(ue$1);zonelessEnabled=T$3(sr$4);tracing=T$3(Gt$6,{optional:true});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:true}}];subscriptions=new G$4;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(qn$2):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(T$3(fa$1,{optional:true})??false);cancelScheduledCallback=null;useMicrotaskScheduler=false;runningTick=false;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let n=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(n);return}this.switchToMicrotaskScheduler(),this.taskService.remove(n);})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup();}));}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let n=this.taskService.add();this.useMicrotaskScheduler=true,queueMicrotask(()=>{this.useMicrotaskScheduler=false,this.taskService.remove(n);});});}notify(n){if(!this.zonelessEnabled&&n===5)return;switch(n){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8;}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Qu:ca$1;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()));}shouldScheduleTick(){return !(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(qn$2+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick();},void 0,this.schedulerTickApplyArgs);}catch(r){this.applicationErrorHandler(r);}finally{this.taskService.remove(n),this.cleanup();}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup();}cleanup(){if(this.runningTick=false,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n);}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function nw(){return _e$4("NgZoneless"),Rs([...zc(),[]])}function zc(){return [{provide:Oe$5,useExisting:Ah},{provide:ue$1,useClass:Gn$2},{provide:sr$4,useValue:true}]}var rw=(()=>{class e{compileModuleSync(n){return new Ii$5(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=wr$2({token:e,factory:e.\u0275fac})}return e})();function ow(){return typeof $localize<"u"&&$localize.locale||Rr$2}var Qc=new S$2("",{factory:()=>T$3(Qc,{optional:true,skipSelf:true})||ow()});var kr$2=class kr{destroyed=false;listeners=null;errorHandler=T$3(Qe$2,{optional:true});isEmitting=false;hasNullListeners=false;destroyRef=T$3(Le$4);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=true,this.listeners=null;});}subscribe(t){if(this.destroyed)throw new b$4(953,false);return (this.listeners??=[]).push(t),{unsubscribe:()=>{let n=this.listeners?this.listeners.indexOf(t):-1;n>-1&&(this.isEmitting?(this.hasNullListeners=true,this.listeners[n]=null):this.listeners.splice(n,1));}}}emit(t){if(this.destroyed){console.warn(zn$2(953,false));return}if(this.listeners===null)return;this.isEmitting=true;let n=v$2(null);try{for(let r of this.listeners)try{r!==null&&r(t);}catch(o){this.errorHandler?.handleError(o);}}finally{this.hasNullListeners&&(this.hasNullListeners=false,this.listeners&&iw(this.listeners)),v$2(n),this.isEmitting=false;}}};function iw(e){let t=e.length-1;for(;t>-1;)e[t]===null&&e.splice(t,1),t--;}var sw=new S$2("");function dt$6(e,t){return Hn$2(e,t?.equal)}function ae$2(e){return eu(e)}var Zc=class extends Error{dependency;constructor(t){super("Dependency error",{cause:t.error()}),this.name="ResourceDependencyError",this.dependency=t;}},xn$3=class e extends Error{_brand;constructor(t){super(t);}static IDLE=new e("IDLE");static LOADING=new e("LOADING")},aw=e=>e;function Yc(e,t){if(typeof e=="function"){let n=ls$1(e,aw,t?.equal);return Rh(n)}else {let n=ls$1(e.source,e.computation,e.equal);return Rh(n,e.debugName)}}function Rh(e,t){let n=e[F$4],r=e;return r.set=o=>Jl(n,o),r.update=o=>Xl(n,o),r.asReadonly=gn$4.bind(e),r}function LA(e){let t=e.request,n=e.params??t??(()=>null);return new Jc(n,lw(e),e.defaultValue,e.equal?cw(e.equal):void 0,e.debugName,e.injector??T$3(le$2),e.id)}var Kc=class{value;isLoading;constructor(t,n){this.value=t,this.value.set=this.set.bind(this),this.value.update=this.update.bind(this),this.value.asReadonly=gn$4,this.isLoading=dt$6(()=>this.status()==="loading"||this.status()==="reloading",void 0);}isError=dt$6(()=>this.status()==="error");update(t){this.set(t(ae$2(this.value)));}isValueDefined=dt$6(()=>this.isError()?false:this.value()!==void 0);_snapshot;get snapshot(){return this._snapshot??=dt$6(()=>{let t=this.status();return t==="error"?{status:"error",error:this.error()}:{status:t,value:this.value()}})}hasValue(){return this.isValueDefined()}asReadonly(){return this}},Jc=class extends Kc{loaderFn;equal;debugName;transferCacheKey;pendingTasks;state;extRequest;effectRef;pendingController;resolvePendingTask=void 0;destroyed=false;unregisterOnDestroy;status;error;transferState;constructor(t,n,r,o,i,s,a,c){if(Ph())throw Lh();super(dt$6(()=>{let u=this.state().stream?.();if(!u||this.state().status==="loading"&&this.error())return r;if(!Xc(u))throw new ji$3(this.error());return u.value},{equal:o}),i),this.loaderFn=n,this.equal=o,this.debugName=i,this.transferCacheKey=a;let l=s.get(sw,void 0,{optional:true})??{isActive:false};this.transferState=s.get(Bo$2,void 0,{optional:true})??void 0,this.extRequest=Yc(()=>{try{return nl(!0),{request:t(pw),reload:0}}catch(u){return rl(u),u===xn$3.IDLE?{status:"idle",reload:0}:u===xn$3.LOADING?{status:"loading",reload:0}:{error:u,reload:0}}finally{nl(false);}},void 0),this.state=Yc({source:this.extRequest,computation:(u,d)=>{let{request:p,status:f,error:h}=u,m;if(h)f="resolved",m=Fe$3({error:el(h)},void 0);else if(!f)if(d)f=p===void 0?"idle":"loading",d.value.extRequest.request===p&&(m=d.value.stream);else {let _=this.transferState,M=this.transferCacheKey;l.isActive&&M&&_&&p!==void 0&&_.hasKey(M)&&(m=Fe$3({value:_.get(M,r)},void 0)),m||(m=c?.(u.request)),c=void 0,f=p===void 0?"idle":m?"resolved":"loading";}return {extRequest:u,status:f,previousStatus:d?kh(d.value):"idle",stream:m}}}),this.effectRef=pa$1(this.loadEffect.bind(this),{injector:s,manualCleanup:true}),this.pendingTasks=s.get(Wo$2),this.unregisterOnDestroy=s.get(Le$4).onDestroy(()=>this.destroy()),this.status=dt$6(()=>kh(this.state()),void 0),this.error=dt$6(()=>{let u=this.state().stream?.();return u&&!Xc(u)?u.error:void 0},void 0);}set(t){if(this.destroyed)return;let n=ae$2(this.error),r=ae$2(this.state);if(!n){let o=ae$2(this.value);if(r.status==="local"&&(this.equal?this.equal(o,t):o===t))return}this.state.set({extRequest:r.extRequest,status:"local",previousStatus:"local",stream:Fe$3({value:t},void 0)}),this.abortInProgressLoad();}reload(){let{status:t}=ae$2(this.state);return t==="idle"||t==="loading"?false:(this.extRequest.update(({request:n,reload:r})=>({request:n,reload:r+1})),true)}destroy(){this.destroyed=true,this.unregisterOnDestroy(),this.effectRef.destroy(),this.abortInProgressLoad(),this.state.set({extRequest:{request:void 0,reload:0},status:"idle",previousStatus:"idle",stream:void 0});}loadEffect(){return C$5(this,null,function*(){let t=this.extRequest(),{status:n,previousStatus:r}=ae$2(this.state);if(t.request===void 0)return;if(n!=="loading")return;this.abortInProgressLoad();let o=this.resolvePendingTask=this.pendingTasks.add(),{signal:i}=this.pendingController=new AbortController;try{let s=ae$2(()=>this.loaderFn({params:t.request,abortSignal:i,previous:{status:r}})),a=()=>i.aborted||ae$2(this.extRequest)!==t;if(ar$4(s)){if(a())return;this.state.set({extRequest:t,status:"resolved",previousStatus:"resolved",stream:s});let c=ae$2(s);}else {let c=yield s;if(a())return;this.state.set({extRequest:t,status:"resolved",previousStatus:"resolved",stream:c});let l=c?ae$2(c):void 0;}}catch(s){if(rl(s),i.aborted||ae$2(this.extRequest)!==t)return;this.state.set({extRequest:t,status:"resolved",previousStatus:"error",stream:Fe$3({error:el(s)},void 0)});}finally{o?.(),o=void 0;}})}abortInProgressLoad(){ae$2(()=>this.pendingController?.abort()),this.pendingController=void 0,this.resolvePendingTask?.(),this.resolvePendingTask=void 0;}};function cw(e){return (t,n)=>t===void 0||n===void 0?t===n:e(t,n)}function lw(e){return uw(e)?e.stream:t=>C$5(null,null,function*(){try{return Fe$3({value:yield e.loader(t)},void 0)}catch(n){return Fe$3({error:el(n)},void 0)}})}function uw(e){return !!e.stream}function kh(e){switch(e.status){case "loading":return e.extRequest.reload===0?"loading":"reloading";case "resolved":return Xc(e.stream())?"resolved":"error";default:return e.status}}function Xc(e){return e.error===void 0}function el(e){return dw(e)?e:new tl(e)}function dw(e){return e instanceof Error||typeof e=="object"&&typeof e.name=="string"&&typeof e.message=="string"}var ji$3=class ji extends Error{constructor(t){super(t.message,{cause:t});}},tl=class extends Error{constructor(t){super(String(t),{cause:t});}};function fw(e){switch(e.status()){case "idle":throw xn$3.IDLE;case "error":throw new Zc(e);case "loading":case "reloading":throw xn$3.LOADING}return e.value()}var pw={chain:fw},Oh=false;function Ph(){return Oh}function nl(e){Oh=e;}function Lh(){return new b$4(992,false)}function rl(e){if(e instanceof b$4&&e.code===992)throw e}var Hi$4=Symbol("InputSignalNode#UNSET"),Uh=x$2(w$3({},Bn$2),{transformFn:void 0,applyValueToInputSignal(e,t){et$4(e,t);}});function Wh(e,t){let n=Object.create(Uh);n.value=e,n.transformFn=t?.transform;function r(){if($e$3(n),n.value===Hi$4){let o=null;throw new b$4(-950,o)}return n.value}return r[F$4]=n,r}var Fh=class{attributeName;constructor(t){this.attributeName=t;}__NG_ELEMENT_ID__=()=>sf(this.attributeName);toString(){return `HostAttributeToken ${this.attributeName}`}},bF=(()=>{let e=new S$2("");return e.__NG_ELEMENT_ID__=t=>{let n=V$2();if(n===null)throw new b$4(-204,false);if(n.type&2)return n.value;if(t&8)return null;throw new b$4(-204,false)},e})();function _F(e){return hw(e)?e.default:e}function hw(e){return e&&typeof e=="object"&&"default"in e}function MF(e){return new kr$2}function jh(e,t){return Wh(e,t)}function gw(e){return Wh(Hi$4,e)}var NF=(jh.required=gw,jh);function qh(e,t){let n=Object.create(Uh),r=new kr$2;n.value=e;function o(){return $e$3(n),Vh(n.value),n.value}return o[F$4]=n,o.asReadonly=gn$4.bind(o),o.set=i=>{n.equal(n.value,i)||(et$4(n,i),r.emit(i));},o.update=i=>{Vh(n.value),o.set(i(n.value));},o.subscribe=r.subscribe.bind(r),o.destroyRef=r.destroyRef,o}function Vh(e){if(e===Hi$4)throw new b$4(952,false)}function Hh(e,t){return qh(e)}function mw(e){return qh(Hi$4)}var SF=(Hh.required=mw,Hh);function Bh(e,t){return Pc()}function yw(e,t){return Lc()}var xF=(Bh.required=yw,Bh);function $h(e,t){return Pc()}function vw(e,t){return Lc()}var AF=($h.required=vw,$h);var kF=(()=>{class e{static __NG_ELEMENT_ID__=Ew}return e})();function Ew(e){return Dw(V$2(),g$4(),(e&16)===16)}function Dw(e,t,n){if(Ye$3(e)&&!n){let r=me$4(e.index,t);return new ut$6(r,r)}else if(e.type&175){let r=t[Y$4];return new ut$6(r,t)}return null}var il=new S$2(""),ww=new S$2("");function Or$2(e){return !e.moduleRef}function Tw(e){let t=Or$2(e)?e.r3Injector:e.moduleRef.injector,n=t.get(ue$1);return n.run(()=>{Or$2(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(Ft$4),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:r});}),Or$2(e)){let i=()=>t.destroy(),s=e.platformInjector.get(il);s.add(i),t.onDestroy(()=>{o.unsubscribe(),s.delete(i);});}else {let i=()=>e.moduleRef.destroy(),s=e.platformInjector.get(il);s.add(i),e.moduleRef.onDestroy(()=>{ur$3(e.allPlatformModules,e.moduleRef),o.unsubscribe(),s.delete(i);});}return bw(r,n,()=>{let i=t.get(Lt$4),s=i.add(),a=t.get(jc);return a.runInitializers(),a.donePromise.then(()=>{let c=t.get(Qc,Rr$2);if(oh(c||Rr$2),!t.get(ww,!0))return Or$2(e)?t.get(Fi$4):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Or$2(e)){let u=t.get(Fi$4);return e.rootComponent!==void 0&&u.bootstrap(e.rootComponent),u}else return Cw?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{i.remove(s);})})})}var Cw;function bw(e,t,n){try{let r=n();return Fc(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e(r)),r}}var Vi$4=null;function _w(e=[],t){return le$2.create({name:t,providers:[{provide:Ps$1,useValue:"platform"},{provide:il,useValue:new Set([()=>Vi$4=null])},...e]})}function Mw(e=[]){if(Vi$4)return Vi$4;let t=_w(e);return Vi$4=t,Yp(),Nw(t),t}function Nw(e){let t=e.get(Ku,null);No$3(e,()=>{t?.forEach(n=>n());});}function OF(e){let{rootComponent:t,appProviders:n,platformProviders:r,platformRef:o}=e;k$5(x$1.BootstrapApplicationStart);try{let i=o?.injector??Mw(r),s=[zc(),Yu,...n||[]],a=new Ir$2({providers:s,parent:i,debugName:"",runEnvironmentInitializers:!1});return Tw({r3Injector:a.injector,platformInjector:i,rootComponent:t})}catch(i){return Promise.reject(i)}finally{k$5(x$1.BootstrapApplicationEnd);}}function PF(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function LF(e,t=NaN){return !isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):t}var ol=Symbol("NOT_SET"),Gh=new Set,Sw=x$2(w$3({},Bn$2),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,value:ol,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=true;}this.sequence.scheduler.notify(7);},phaseFn(e){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=false,this.value!==ol&&!Ct$5(this))return this.signal;try{for(let o of this.cleanup??Gh)o();}finally{this.cleanup?.clear();}let t=[];e!==void 0&&t.push(e),t.push(this.registerCleanupFn);let n=Ae$2(this),r;try{r=this.userFn.apply(null,t);}finally{Ue$4(this,n);}return (this.value===ol||!this.equal(this.value,r))&&(this.value=r,this.version++),this.signal}}),sl=class extends hr$4{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(t,n,r,o,i,s=null){super(t,[void 0,void 0,void 0,void 0],r,false,i.get(Le$4),s),this.scheduler=o;for(let a of gc){let c=n[a];if(c===void 0)continue;let l=Object.create(Sw);l.sequence=this,l.phase=a,l.userFn=c,l.dirty=true,l.signal=()=>($e$3(l),l.value),l.signal[F$4]=l,l.registerCleanupFn=u=>(l.cleanup??=new Set).add(u),this.nodes[a]=l,this.hooks[a]=u=>l.phaseFn(u);}}afterRun(){super.afterRun(),this.lastPhase=null;}destroy(){if(this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();super.destroy();for(let t of this.nodes)if(t)try{for(let n of t.cleanup??Gh)n();}finally{We$2(t);}}};function FF(e,t){let n=t?.injector??T$3(le$2),r=n.get(Oe$5),o=n.get(Si$3),i=n.get(Gt$6,null,{optional:true});o.impl??=n.get(mc);let s=e;typeof s=="function"&&(s={mixedReadWrite:e});let a=n.get(mn$4,null,{optional:true}),c=new sl(o.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,r,n,i?.snapshot(null));return o.impl.register(c),c}function jF(e,t){let n=rt$4(e),r=t.elementInjector||cn$4();return new Tn$2(n).create(r,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}
var nr$3=null;function P$2(){return nr$3}function Bt$4(n){nr$3??=n;}var Le$3=class Le{},ge$3=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:()=>T$3(rr$3),providedIn:"platform"})}return n})();var rr$3=(()=>{class n extends ge$3{_location;_history;_doc=T$3(ir$4);constructor(){super(),this._location=window.location,this._history=window.history;}getBaseHrefFromDOM(){return P$2().getBaseHref(this._doc)}onPopState(e){let t=P$2().getGlobalEventTarget(this._doc,"window");return t.addEventListener("popstate",e,false),()=>t.removeEventListener("popstate",e)}onHashChange(e){let t=P$2().getGlobalEventTarget(this._doc,"window");return t.addEventListener("hashchange",e,false),()=>t.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e;}pushState(e,t,i){this._history.pushState(e,t,i);}replaceState(e,t,i){this._history.replaceState(e,t,i);}forward(){this._history.forward();}back(){this._history.back();}historyGo(e=0){this._history.go(e);}getState(){return this._history.state}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function ar$3(n,r){return n?r?n.endsWith("/")?r.startsWith("/")?n+r.slice(1):n+r:r.startsWith("/")?n+r:`${n}/${r}`:n:r}function ir$3(n){let r=n.search(/#|\?|$/);return n[r-1]==="/"?n.slice(0,r-1)+n.slice(r):n}function K$3(n){return n&&n[0]!=="?"?`?${n}`:n}var ot$5=(()=>{class n{historyGo(e){throw new Error("")}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:()=>T$3(pi$1),providedIn:"root"})}return n})(),hi$1=new S$2(""),pi$1=(()=>{class n extends ot$5{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,t){super(),this._platformLocation=e,this._baseHref=t??this._platformLocation.getBaseHrefFromDOM()??T$3(ir$4).location?.origin??"";}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()();}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e));}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return ar$3(this._baseHref,e)}path(e=false){let t=this._platformLocation.pathname+K$3(this._platformLocation.search),i=this._platformLocation.hash;return i&&e?`${t}${i}`:t}pushState(e,t,i,o){let a=this.prepareExternalUrl(i+K$3(o));this._platformLocation.pushState(e,t,a);}replaceState(e,t,i,o){let a=this.prepareExternalUrl(i+K$3(o));this._platformLocation.replaceState(e,t,a);}forward(){this._platformLocation.forward();}back(){this._platformLocation.back();}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e);}static \u0275fac=function(t){return new(t||n)(ke$4(ge$3),ke$4(hi$1,8))};static \u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var sr$3=(()=>{class n{_subject=new ne$3;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let t=this._locationStrategy.getBaseHref();this._basePath=yi$3(ir$3(or$3(t))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(true),pop:true,state:i.state,type:i.type});});}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[];}path(e=false){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,t=""){return this.path()==this.normalize(e+K$3(t))}normalize(e){return n.stripTrailingSlash(bi$2(this._basePath,or$3(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,t="",i=null){this._locationStrategy.pushState(i,"",e,t),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+K$3(t)),i);}replaceState(e,t="",i=null){this._locationStrategy.replaceState(i,"",e,t),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+K$3(t)),i);}forward(){this._locationStrategy.forward();}back(){this._locationStrategy.back();}historyGo(e=0){this._locationStrategy.historyGo?.(e);}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(t=>{this._notifyUrlChangeListeners(t.url,t.state);}),()=>{let t=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(t,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null);}}_notifyUrlChangeListeners(e="",t){this._urlChangeListeners.forEach(i=>i(e,t));}subscribe(e,t,i){return this._subject.subscribe({next:e,error:t??void 0,complete:i??void 0})}static normalizeQueryParams=K$3;static joinWithSlash=ar$3;static stripTrailingSlash=ir$3;static \u0275fac=function(t){return new(t||n)(ke$4(ot$5))};static \u0275prov=re$1({token:n,factory:()=>gi$2(),providedIn:"root"})}return n})();function gi$2(){return new sr$3(ke$4(ot$5))}function bi$2(n,r){if(!n||!r.startsWith(n))return r;let e=r.substring(n.length);return e===""||["/",";","?","#"].includes(e[0])?e:r}function or$3(n){return n.replace(/\/index\.html$/,"")}function yi$3(n){if(new RegExp("^(https?:)?//").test(n)){let[,e]=n.split(/\/\/[^\/]+/);return e}return n}var Ut$4=/\s+/,cr$3=[],vi$1=(()=>{class n{_ngEl;_renderer;initialClasses=cr$3;rawClass;stateMap=new Map;constructor(e,t){this._ngEl=e,this._renderer=t;}set klass(e){this.initialClasses=e!=null?e.trim().split(Ut$4):cr$3;}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(Ut$4):e;}ngDoCheck(){for(let t of this.initialClasses)this._updateState(t,true);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let t of e)this._updateState(t,true);else if(e!=null)for(let t of Object.keys(e))this._updateState(t,!!e[t]);this._applyStateDiff();}_updateState(e,t){let i=this.stateMap.get(e);i!==void 0?(i.enabled!==t&&(i.changed=true,i.enabled=t),i.touched=true):this.stateMap.set(e,{enabled:t,changed:true,touched:true});}_applyStateDiff(){for(let e of this.stateMap){let t=e[0],i=e[1];i.changed?(this._toggleClass(t,i.enabled),i.changed=false):i.touched||(i.enabled&&this._toggleClass(t,false),this.stateMap.delete(t)),i.touched=false;}}_toggleClass(e,t){e=e.trim(),e.length>0&&e.split(Ut$4).forEach(i=>{t?this._renderer.addClass(this._ngEl.nativeElement,i):this._renderer.removeClass(this._ngEl.nativeElement,i);});}static \u0275fac=function(t){return new(t||n)(Ar$2(Tr$2),Ar$2(CI))};static \u0275dir=CE({type:n,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return n})();var _i$2=(()=>{class n{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=T$3(le$2);constructor(e){this._viewContainerRef=e;}ngOnChanges(e){if(this._shouldRecreateView(e)){let t=this._viewContainerRef;if(this._viewRef&&t.remove(t.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let i=this._createContextForwardProxy();this._viewRef=t.createEmbeddedView(this.ngTemplateOutlet,i,{injector:this._getInjector()});}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return !!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,t,i)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,t,i):false,get:(e,t,i)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,t,i)}})}static \u0275fac=function(t){return new(t||n)(Ar$2(Li$4))};static \u0275dir=CE({type:n,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Pm]})}return n})();function Be$1(n,r){r=encodeURIComponent(r);for(let e of n.split(";")){let t=e.indexOf("="),[i,o]=t==-1?[e,""]:[e.slice(0,t),e.slice(t+1)];if(i.trim()===r)return decodeURIComponent(o)}return null}var jt$3="browser";function dr$3(n){return n===jt$3}var Ue$3=class Ue{_doc;constructor(r){this._doc=r;}manager},at$5=(()=>{class n extends Ue$3{constructor(e){super(e);}supports(e){return  true}addEventListener(e,t,i,o){return e.addEventListener(t,i,o),()=>this.removeEventListener(e,t,i,o)}removeEventListener(e,t,i,o){return e.removeEventListener(t,i,o)}static \u0275fac=function(t){return new(t||n)(ke$4(ir$4))};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),ut$5=new S$2(""),Vt$3=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,t){this._zone=t,e.forEach(a=>{a.manager=this;});let i=e.filter(a=>!(a instanceof at$5));this._plugins=i.slice().reverse();let o=e.find(a=>a instanceof at$5);o&&this._plugins.push(o);}addEventListener(e,t,i,o){return this._findPluginFor(t).addEventListener(e,t,i,o)}getZone(){return this._zone}_findPluginFor(e){let t=this._eventNameToPlugin.get(e);if(t)return t;if(t=this._plugins.find(o=>o.supports(e)),!t)throw new b$4(-5101,false);return this._eventNameToPlugin.set(e,t),t}static \u0275fac=function(t){return new(t||n)(ke$4(ut$5),ke$4(ue$1))};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),zt$4="ng-app-id";function lr$3(n){for(let r of n)r.remove();}function mr$3(n,r){let e=r.createElement("style");return e.textContent=n,e}function Ci$2(n,r,e,t){let i=n.head?.querySelectorAll(`style[${zt$4}="${r}"],link[${zt$4}="${r}"]`);if(!i||i.length===0)return  false;for(let o of i)o.removeAttribute(zt$4),o instanceof HTMLLinkElement?t.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]});return  true}function Ht$4(n,r){let e=r.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var Gt$5=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,t,i,o={}){this.doc=e,this.appId=t,this.nonce=i,Ci$2(e,t,this.inline,this.external)&&this.hosts.add(e.head);}addStyles(e,t){for(let i of e)this.addUsage(i,this.inline,mr$3);t?.forEach(i=>this.addUsage(i,this.external,Ht$4));}removeStyles(e,t){for(let i of e)this.removeUsage(i,this.inline);t?.forEach(i=>this.removeUsage(i,this.external));}addUsage(e,t,i){let o=t.get(e);o?o.usage++:t.set(e,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,i(e,this.doc)))});}removeUsage(e,t){let i=t.get(e);i&&(i.usage--,i.usage<=0&&(lr$3(i.elements),t.delete(e)));}ngOnDestroy(){for(let[,{elements:e}]of [...this.inline,...this.external])lr$3(e);this.hosts.clear();}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[t,{elements:i}]of this.inline)i.push(this.addElement(e,mr$3(t,this.doc)));for(let[t,{elements:i}]of this.external)i.push(this.addElement(e,Ht$4(t,this.doc)));}}removeHost(e){this.hosts.delete(e);for(let t of [...this.inline.values(),...this.external.values()]){let i=[];for(let o of t.elements)o.parentNode===e?o.remove():i.push(o);t.elements=i;}}addElement(e,t){return this.nonce&&t.setAttribute("nonce",this.nonce),e.appendChild(t)}static \u0275fac=function(t){return new(t||n)(ke$4(ir$4),ke$4(da$1),ke$4(Em,8),ke$4(vm))};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),$t$3={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Wt$3=/%COMP%/g;var hr$3="%COMP%",Ti$4=`_nghost-${hr$3}`,Si$2=`_ngcontent-${hr$3}`,Ii$4=true,Mi$2=new S$2("",{factory:()=>Ii$4});function Fi$3(n){return Si$2.replace(Wt$3,n)}function xi$3(n){return Ti$4.replace(Wt$3,n)}function pr$2(n,r){return r.map(e=>e.replace(Wt$3,n))}var Kt$3=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,t,i,o,a,c,u=null,d=null){this.eventManager=e,this.sharedStylesHost=t,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=a,this.ngZone=c,this.nonce=u,this.tracingService=d,this.defaultRenderer=new je$2(e,a,c,this.tracingService);}createRenderer(e,t){if(!e||!t)return this.defaultRenderer;let i=this.getOrCreateRenderer(e,t);return i instanceof ct$5?i.applyToHost(e):i instanceof ze$2&&i.applyStyles(),i}getOrCreateRenderer(e,t){let i=this.rendererByCompId,o=i.get(t.id);if(!o){let a=this.doc,c=this.ngZone,u=this.eventManager,d=this.sharedStylesHost,l=this.removeStylesOnCompDestroy,v=this.tracingService;switch(t.encapsulation){case $t$4.Emulated:o=new ct$5(u,d,t,this.appId,l,a,c,v);break;case $t$4.ShadowDom:return new st$5(u,e,t,a,c,this.nonce,v,d);case $t$4.ExperimentalIsolatedShadowDom:return new st$5(u,e,t,a,c,this.nonce,v);default:o=new ze$2(u,d,t,l,a,c,v);break}i.set(t.id,o);}return o}ngOnDestroy(){this.rendererByCompId.clear();}componentReplaced(e){this.rendererByCompId.delete(e);}static \u0275fac=function(t){return new(t||n)(ke$4(Vt$3),ke$4(Tp),ke$4(da$1),ke$4(Mi$2),ke$4(ir$4),ke$4(ue$1),ke$4(Em),ke$4(Gt$6,8))};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),je$2=class je{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=true;constructor(r,e,t,i){this.eventManager=r,this.doc=e,this.ngZone=t,this.tracingService=i;}destroy(){}destroyNode=null;createElement(r,e){return e?this.doc.createElementNS($t$3[e]||e,r):this.doc.createElement(r)}createComment(r){return this.doc.createComment(r)}createText(r){return this.doc.createTextNode(r)}appendChild(r,e){(fr$3(r)?r.content:r).appendChild(e);}insertBefore(r,e,t){r&&(fr$3(r)?r.content:r).insertBefore(e,t);}removeChild(r,e){e.remove();}selectRootElement(r,e){let t=typeof r=="string"?this.doc.querySelector(r):r;if(!t)throw new b$4(-5104,false);return e||(t.textContent=""),t}parentNode(r){return r.parentNode}nextSibling(r){return r.nextSibling}setAttribute(r,e,t,i){if(i){e=i+":"+e;let o=$t$3[i];o?r.setAttributeNS(o,e,t):r.setAttribute(e,t);}else r.setAttribute(e,t);}removeAttribute(r,e,t){if(t){let i=$t$3[t];i?r.removeAttributeNS(i,e):r.removeAttribute(`${t}:${e}`);}else r.removeAttribute(e);}addClass(r,e){r.classList.add(e);}removeClass(r,e){r.classList.remove(e);}setStyle(r,e,t,i){i&(ci$2.DashCase|ci$2.Important)?r.style.setProperty(e,t,i&ci$2.Important?"important":""):r.style[e]=t;}removeStyle(r,e,t){t&ci$2.DashCase?r.style.removeProperty(e):r.style[e]="";}setProperty(r,e,t){r!=null&&(r[e]=t);}setValue(r,e){r.nodeValue=e;}listen(r,e,t,i){if(typeof r=="string"&&(r=P$2().getGlobalEventTarget(this.doc,r),!r))throw new b$4(-5102,false);let o=this.decoratePreventDefault(t);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(r,e,o)),this.eventManager.addEventListener(r,e,o,i)}decoratePreventDefault(r){return e=>{if(e==="__ngUnwrap__")return r;r(e)===false&&e.preventDefault();}}};function fr$3(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var st$5=class st extends je$2{hostEl;sharedStylesHost;shadowRoot;constructor(r,e,t,i,o,a,c,u){super(r,i,o,c),this.hostEl=e,this.sharedStylesHost=u,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let d=t.styles;d=pr$2(t.id,d);for(let v of d){let C=document.createElement("style");a&&C.setAttribute("nonce",a),C.textContent=v,this.shadowRoot.appendChild(C);}let l=t.getExternalStyles?.();if(l)for(let v of l){let C=Ht$4(v,i);a&&C.setAttribute("nonce",a),this.shadowRoot.appendChild(C);}}nodeOrShadowRoot(r){return r===this.hostEl?this.shadowRoot:r}appendChild(r,e){return super.appendChild(this.nodeOrShadowRoot(r),e)}insertBefore(r,e,t){return super.insertBefore(this.nodeOrShadowRoot(r),e,t)}removeChild(r,e){return super.removeChild(null,e)}parentNode(r){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(r)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot);}},ze$2=class ze extends je$2{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(r,e,t,i,o,a,c,u){super(r,o,a,c),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=i;let d=t.styles;this.styles=u?pr$2(u,d):d,this.styleUrls=t.getExternalStyles?.(u);}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls);}destroy(){this.removeStylesOnCompDestroy&&Ut$5.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls);}},ct$5=class ct extends ze$2{contentAttr;hostAttr;constructor(r,e,t,i,o,a,c,u){let d=i+"-"+t.id;super(r,e,t,o,a,c,u,d),this.contentAttr=Fi$3(d),this.hostAttr=xi$3(d);}applyToHost(r){this.applyStyles(),this.setAttribute(r,this.hostAttr,"");}createElement(r,e){let t=super.createElement(r,e);return super.setAttribute(t,this.contentAttr,""),t}};var dt$5=class n extends Le$3{supportsDOMEvents=true;static makeCurrent(){Bt$4(new n);}onAndCancel(r,e,t,i){return r.addEventListener(e,t,i),()=>{r.removeEventListener(e,t,i);}}dispatchEvent(r,e){r.dispatchEvent(e);}remove(r){r.remove();}createElement(r,e){return e=e||this.getDefaultDocument(),e.createElement(r)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(r){return r.nodeType===Node.ELEMENT_NODE}isShadowRoot(r){return r instanceof DocumentFragment}getGlobalEventTarget(r,e){return e==="window"?window:e==="document"?r:e==="body"?r.body:null}getBaseHref(r){let e=Oi$3();return e==null?null:Ni$2(e)}resetBaseElement(){$e$2=null;}getUserAgent(){return window.navigator.userAgent}getCookie(r){return Be$1(document.cookie,r)}},$e$2=null;function Oi$3(){return $e$2=$e$2||document.head.querySelector("base"),$e$2?$e$2.getAttribute("href"):null}function Ni$2(n){return new URL(n,document.baseURI).pathname}var gr$3=["alt","control","meta","shift"],Li$3={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Pi$4={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},br$1=(()=>{class n extends Ue$3{constructor(e){super(e);}supports(e){return n.parseEventName(e)!=null}addEventListener(e,t,i,o){let a=n.parseEventName(t),c=n.eventCallback(a.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>P$2().onAndCancel(e,a.domEventName,c,o))}static parseEventName(e){let t=e.toLowerCase().split("."),i=t.shift();if(t.length===0||!(i==="keydown"||i==="keyup"))return null;let o=n._normalizeKey(t.pop()),a="",c=t.indexOf("code");if(c>-1&&(t.splice(c,1),a="code."),gr$3.forEach(d=>{let l=t.indexOf(d);l>-1&&(t.splice(l,1),a+=d+".");}),a+=o,t.length!=0||o.length===0)return null;let u={};return u.domEventName=i,u.fullKey=a,u}static matchEventFullKeyCode(e,t){let i=Li$3[e.key]||e.key,o="";return t.indexOf("code.")>-1&&(i=e.code,o="code."),i==null||!i?false:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),gr$3.forEach(a=>{if(a!==i){let c=Pi$4[a];c(e)&&(o+=a+".");}}),o+=i,o===t)}static eventCallback(e,t,i){return o=>{n.matchEventFullKeyCode(o,e)&&i.runGuarded(()=>t(o));}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(t){return new(t||n)(ke$4(ir$4))};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})();function ki$3(n,r,e){return C$5(this,null,function*(){let t=w$3({rootComponent:n},Bi$3(r,e));return OF(t)})}function Bi$3(n,r){return {platformRef:r?.platformRef,appProviders:[...Hi$3,...n?.providers??[]],platformProviders:$i$3}}function Ui$2(){dt$5.makeCurrent();}function ji$2(){return new Qe$2}function zi$3(){return ay(document),document}var $i$3=[{provide:vm,useValue:jt$3},{provide:Ku,useValue:Ui$2,multi:true},{provide:ir$4,useFactory:zi$3}];var Hi$3=[{provide:Ps$1,useValue:"root"},{provide:Qe$2,useFactory:ji$2},{provide:ut$5,useClass:at$5,multi:true},{provide:ut$5,useClass:br$1,multi:true},Kt$3,{provide:Tp,useClass:Gt$5},{provide:Gt$5,useExisting:Tp},Vt$3,{provide:vr$3,useExisting:Kt$3},[]];var z$2=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(r){r?typeof r=="string"?this.lazyInit=()=>{this.headers=new Map,r.split(`
`).forEach(e=>{let t=e.indexOf(":");if(t>0){let i=e.slice(0,t),o=e.slice(t+1).trim();this.addHeaderEntry(i,o);}});}:typeof Headers<"u"&&r instanceof Headers?(this.headers=new Map,r.forEach((e,t)=>{this.addHeaderEntry(t,e);})):this.lazyInit=()=>{this.headers=new Map,Object.entries(r).forEach(([e,t])=>{this.setHeaderEntries(e,t);});}:this.headers=new Map;}has(r){return this.init(),this.headers.has(r.toLowerCase())}get(r){this.init();let e=this.headers.get(r.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(r){return this.init(),this.headers.get(r.toLowerCase())||null}append(r,e){return this.clone({name:r,value:e,op:"a"})}set(r,e){return this.clone({name:r,value:e,op:"s"})}delete(r,e){return this.clone({name:r,value:e,op:"d"})}maybeSetNormalizedName(r,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,r);}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(r=>this.applyUpdate(r)),this.lazyUpdate=null));}copyFrom(r){r.init(),Array.from(r.headers.keys()).forEach(e=>{this.headers.set(e,r.headers.get(e)),this.normalizedNames.set(e,r.normalizedNames.get(e));});}clone(r){let e=new n;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([r]),e}applyUpdate(r){let e=r.name.toLowerCase();switch(r.op){case "a":case "s":let t=r.value;if(typeof t=="string"&&(t=[t]),t.length===0)return;this.maybeSetNormalizedName(r.name,e);let i=(r.op==="a"?this.headers.get(e):void 0)||[];i.push(...t),this.headers.set(e,i);break;case "d":let o=r.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else {let a=this.headers.get(e);if(!a)return;a=a.filter(c=>o.indexOf(c)===-1),a.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,a);}break}}addHeaderEntry(r,e){let t=r.toLowerCase();this.maybeSetNormalizedName(r,t),this.headers.has(t)?this.headers.get(t).push(e):this.headers.set(t,[e]);}setHeaderEntries(r,e){let t=(Array.isArray(e)?e:[e]).map(o=>o.toString()),i=r.toLowerCase();this.headers.set(i,t),this.maybeSetNormalizedName(r,i);}forEach(r){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>r(this.normalizedNames.get(e),this.headers.get(e)));}};var mt$5=class mt{map=new Map;set(r,e){return this.map.set(r,e),this}get(r){return this.map.has(r)||this.map.set(r,r.defaultValue()),this.map.get(r)}delete(r){return this.map.delete(r),this}has(r){return this.map.has(r)}keys(){return this.map.keys()}},ft$5=class ft{encodeKey(r){return yr$1(r)}encodeValue(r){return yr$1(r)}decodeKey(r){return decodeURIComponent(r)}decodeValue(r){return decodeURIComponent(r)}};function Vi$3(n,r){let e=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(i=>{let o=i.indexOf("="),[a,c]=o==-1?[r.decodeKey(i),""]:[r.decodeKey(i.slice(0,o)),r.decodeValue(i.slice(o+1))],u=e.get(a)||[];u.push(c),e.set(a,u);}),e}var Gi$3=/%(\d[a-f0-9])/gi,Wi$3={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function yr$1(n){return encodeURIComponent(n).replace(Gi$3,(r,e)=>Wi$3[e]??r)}function lt$5(n){return `${n}`}var j$3=class n{map;encoder;updates=null;cloneFrom=null;constructor(r={}){if(this.encoder=r.encoder||new ft$5,r.fromString){if(r.fromObject)throw new b$4(2805,false);this.map=Vi$3(r.fromString,this.encoder);}else r.fromObject?(this.map=new Map,Object.keys(r.fromObject).forEach(e=>{let t=r.fromObject[e],i=Array.isArray(t)?t.map(lt$5):[lt$5(t)];this.map.set(e,i);})):this.map=null;}has(r){return this.init(),this.map.has(r)}get(r){this.init();let e=this.map.get(r);return e?e[0]:null}getAll(r){return this.init(),this.map.get(r)||null}keys(){return this.init(),Array.from(this.map.keys())}append(r,e){return this.clone({param:r,value:e,op:"a"})}appendAll(r){let e=[];return Object.keys(r).forEach(t=>{let i=r[t];Array.isArray(i)?i.forEach(o=>{e.push({param:t,value:o,op:"a"});}):e.push({param:t,value:i,op:"a"});}),this.clone(e)}set(r,e){return this.clone({param:r,value:e,op:"s"})}delete(r,e){return this.clone({param:r,value:e,op:"d"})}toString(){return this.init(),this.keys().map(r=>{let e=this.encoder.encodeKey(r);return this.map.get(r).map(t=>e+"="+this.encoder.encodeValue(t)).join("&")}).filter(r=>r!=="").join("&")}clone(r){let e=new n({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(r),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(r=>this.map.set(r,this.cloneFrom.map.get(r))),this.updates.forEach(r=>{switch(r.op){case "a":case "s":let e=(r.op==="a"?this.map.get(r.param):void 0)||[];e.push(lt$5(r.value)),this.map.set(r.param,e);break;case "d":if(r.value!==void 0){let t=this.map.get(r.param)||[],i=t.indexOf(lt$5(r.value));i!==-1&&t.splice(i,1),t.length>0?this.map.set(r.param,t):this.map.delete(r.param);}else {this.map.delete(r.param);break}}}),this.cloneFrom=this.updates=null);}};function Ki$3(n){switch(n){case "DELETE":case "GET":case "HEAD":case "OPTIONS":case "JSONP":return  false;default:return  true}}function vr$2(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function _r$1(n){return typeof Blob<"u"&&n instanceof Blob}function Dr$1(n){return typeof FormData<"u"&&n instanceof FormData}function Zi$3(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}var Zt$3="Content-Type",Er$1="Accept",Cr$1="text/plain",Tr$1="application/json",Yi$3=`${Tr$1}, ${Cr$1}, */*`,be$3=class n{url;body=null;headers;context;reportProgress=false;reportUploadProgress=false;reportDownloadProgress=false;withCredentials=false;credentials;keepalive=false;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(r,e,t,i){this.url=e,this.method=r.toUpperCase();let o;if(Ki$3(this.method)||i?(this.body=t!==void 0?t:null,o=i):o=t,o){if(this.reportProgress=!!o.reportProgress,this.reportUploadProgress=!!o.reportUploadProgress,this.reportDownloadProgress=!!o.reportDownloadProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new b$4(2822,"");this.timeout=o.timeout;}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache;}if(this.headers??=new z$2,this.context??=new mt$5,!this.params)this.params=new j$3,this.urlWithParams=e;else {let a=this.params.toString();if(a.length===0)this.urlWithParams=e;else {let c=e,u="",d=e.indexOf("#");d!==-1&&(u=e.substring(d),c=e.substring(0,d));let l=c.indexOf("?"),v=l===-1?"?":l<c.length-1?"&":"";this.urlWithParams=c+v+a+u;}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||vr$2(this.body)||_r$1(this.body)||Dr$1(this.body)||Zi$3(this.body)?this.body:this.body instanceof j$3?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Dr$1(this.body)?null:_r$1(this.body)?this.body.type||null:vr$2(this.body)?null:typeof this.body=="string"?Cr$1:this.body instanceof j$3?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Tr$1:null}clone(r={}){let e=r.method||this.method,t=r.url||this.url,i=r.responseType||this.responseType,o=r.keepalive??this.keepalive,a=r.priority||this.priority,c=r.cache||this.cache,u=r.mode||this.mode,d=r.redirect||this.redirect,l=r.credentials||this.credentials,v=r.referrer??this.referrer,C=r.integrity||this.integrity,re=r.referrerPolicy||this.referrerPolicy,H=r.transferCache??this.transferCache,T=r.timeout??this.timeout,E=r.body!==void 0?r.body:this.body,B=r.withCredentials??this.withCredentials,V=r.reportProgress??this.reportProgress,G=r.reportUploadProgress??this.reportUploadProgress,ie=r.reportDownloadProgress??this.reportDownloadProgress,Ae=r.headers||this.headers,Z=r.params||this.params,Je=r.context??this.context;return r.setHeaders!==void 0&&(Ae=Object.keys(r.setHeaders).reduce((oe,Y)=>oe.set(Y,r.setHeaders[Y]),Ae)),r.setParams&&(Z=Object.keys(r.setParams).reduce((oe,Y)=>oe.set(Y,r.setParams[Y]),Z)),new n(e,t,E,{params:Z,headers:Ae,context:Je,reportProgress:V,reportUploadProgress:G,reportDownloadProgress:ie,responseType:i,withCredentials:B,transferCache:H,keepalive:o,cache:c,priority:a,timeout:T,mode:u,redirect:d,credentials:l,referrer:v,integrity:C,referrerPolicy:re})}},ye$3=(function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n})(ye$3||{}),ve$3=class ve{headers;status;statusText;url;ok;type;redirected;responseType;constructor(r,e=200,t="OK"){this.headers=r.headers||new z$2,this.status=r.status!==void 0?r.status:e,this.statusText=r.statusText||t,this.url=r.url||null,this.redirected=r.redirected,this.responseType=r.responseType,this.ok=this.status>=200&&this.status<300;}},ht$5=class n extends ve$3{constructor(r={}){super(r);}type=ye$3.ResponseHeader;clone(r={}){return new n({headers:r.headers||this.headers,status:r.status!==void 0?r.status:this.status,statusText:r.statusText||this.statusText,url:r.url||this.url||void 0})}},He$2=class n extends ve$3{body;constructor(r={}){super(r),this.body=r.body!==void 0?r.body:null;}type=ye$3.Response;clone(r={}){return new n({body:r.body!==void 0?r.body:this.body,headers:r.headers||this.headers,status:r.status!==void 0?r.status:this.status,statusText:r.statusText||this.statusText,url:r.url||this.url||void 0,redirected:r.redirected??this.redirected,responseType:r.responseType??this.responseType})}},ee$2=class ee extends ve$3{name="HttpErrorResponse";message;error;ok=false;constructor(r){super(r,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${r.url||"(unknown url)"}`:this.message=`Http failure response for ${r.url||"(unknown url)"}: ${r.status} ${r.statusText}`,this.error=r.error||null;}},Xi$3=200;var Ji$3=/^\)\]\}',?\n/,Sr$1=new S$2("",{factory:()=>null}),pt$4=(()=>{class n{fetchImpl=T$3(Xt$4,{optional:true})?.fetch??((...e)=>globalThis.fetch(...e));ngZone=T$3(ue$1);destroyRef=T$3(Le$4);maxResponseSize=T$3(Sr$1);handle(e){return new N$5(t=>{let i=new AbortController;this.doRequest(e,i.signal,t).then(Jt$2,a=>t.error(new ee$2({error:a})));let o;return e.timeout&&(o=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{i.signal.aborted||i.abort(new DOMException("signal timed out","TimeoutError"));},e.timeout))),()=>{o!==void 0&&clearTimeout(o),i.abort();}})}doRequest(e,t,i){return C$5(this,null,function*(){let o=this.createRequestInit(e),a;try{let E=this.ngZone.runOutsideAngular(()=>this.fetchImpl(e.urlWithParams,w$3({signal:t},o)));qi$3(E),i.next({type:ye$3.Sent}),a=yield E;}catch(E){i.error(new ee$2({error:E,status:E.status??0,statusText:E.statusText,url:e.urlWithParams,headers:E.headers}));return}let c=new z$2(a.headers),u=a.statusText,d=a.url||e.urlWithParams,l=a.status,v=null,C=e.reportProgress||e.reportDownloadProgress;if(C&&i.next(new ht$5({headers:c,status:l,statusText:u,url:d})),a.body){let E=a.headers.get("content-length"),B=E!==null?Number(E):NaN;this.maxResponseSize!==null&&Number.isFinite(B)&&B>this.maxResponseSize&&wr$1(this.maxResponseSize);let V=[],G=a.body.getReader(),ie=0,Ae,Z,Je=typeof Zone<"u"&&Zone.current,oe=false;if(yield this.ngZone.runOutsideAngular(()=>C$5(this,null,function*(){for(;;){if(this.destroyRef.destroyed){yield G.cancel(),oe=true;break}let{done:Ce,value:Mt}=yield G.read();if(Ce)break;if(V.push(Mt),ie+=Mt.length,this.maxResponseSize!==null&&ie>this.maxResponseSize&&(yield G.cancel(),wr$1(this.maxResponseSize)),C){Z=e.responseType==="text"?(Z??"")+(Ae??=new TextDecoder).decode(Mt,{stream:true}):void 0;let wn=()=>i.next({type:ye$3.DownloadProgress,total:Number.isFinite(B)?B:void 0,loaded:ie,partialText:Z});Je?Je.run(wn):wn();}}})),oe){i.complete();return}let Y=this.concatChunks(V,ie);try{let Ce=a.headers.get(Zt$3)??"";v=this.parseBody(e,Y,Ce,l);}catch(Ce){i.error(new ee$2({error:Ce,headers:new z$2(a.headers),status:a.status,statusText:a.statusText,url:a.url||e.urlWithParams}));return}}l===0&&(l=v?Xi$3:0);let re=l>=200&&l<300,H=a.redirected,T=a.type;re?(i.next(new He$2({body:v,headers:c,status:l,statusText:u,url:d,redirected:H,responseType:T})),i.complete()):i.error(new ee$2({error:v,headers:c,status:l,statusText:u,url:d,redirected:H,responseType:T}));})}parseBody(e,t,i,o){switch(e.responseType){case "json":let a=new TextDecoder().decode(t).replace(Ji$3,"");if(a==="")return null;try{return JSON.parse(a)}catch(c){if(o<200||o>=300)return a;throw c}case "text":return new TextDecoder().decode(t);case "blob":return new Blob([t],{type:i});case "arraybuffer":return t.buffer}}createRequestInit(e){if(e.reportUploadProgress)throw new b$4(2824,false);let t={},i;if(i=e.credentials,e.withCredentials&&(i="include"),e.headers.forEach((o,a)=>t[o]=a.join(",")),e.headers.has(Er$1)||(t[Er$1]=Yi$3),!e.headers.has(Zt$3)){let o=e.detectContentTypeHeader();o!==null&&(t[Zt$3]=o);}return {body:e.serializeBody(),method:e.method,headers:t,credentials:i,keepalive:e.keepalive,cache:e.cache,priority:e.priority,mode:e.mode,redirect:e.redirect,referrer:e.referrer,integrity:e.integrity,referrerPolicy:e.referrerPolicy}}concatChunks(e,t){let i=new Uint8Array(t),o=0;for(let a of e)i.set(a,o),o+=a.length;return i}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),Xt$4=class Xt{};function Jt$2(){}function qi$3(n){n.then(Jt$2,Jt$2);}function wr$1(n){throw new b$4(-2825,false)}function Ir$1(n,r){return r(n)}function Qi$3(n,r){return (e,t)=>r.intercept(e,{handle:i=>n(i,t)})}function eo$2(n,r,e){return (t,i)=>No$3(e,()=>r(t,o=>n(o,i)))}var Mr$1=new S$2(""),qt$3=new S$2("",{factory:()=>[]}),Fr$1=new S$2(""),Qt$4=new S$2("",{factory:()=>true});function to$3(){let n=null;return (r,e)=>{n===null&&(n=(T$3(Mr$1,{optional:true})??[]).reduceRight(Qi$3,Ir$1));let t=T$3(Wo$2);if(T$3(Qt$4)){let o=t.add();return n(r,e).pipe(Vl$1(o))}else return n(r,e)}}var en$3=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$4(pt$4),i},providedIn:"root"})}return n})();var gt$4=(()=>{class n{backend;injector;chain=null;pendingTasks=T$3(Wo$2);contributeToStability=T$3(Qt$4);constructor(e,t){this.backend=e,this.injector=t;}handle(e){if(this.chain===null){let t=Array.from(new Set([...this.injector.get(qt$3),...this.injector.get(Fr$1,[])]));this.chain=t.reduceRight((i,o)=>eo$2(i,o,this.injector),Ir$1);}if(this.contributeToStability){let t=this.pendingTasks.add();return this.chain(e,i=>this.backend.handle(i)).pipe(Vl$1(t))}else return this.chain(e,t=>this.backend.handle(t))}static \u0275fac=function(t){return new(t||n)(ke$4(en$3),ke$4(ce$3))};static \u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),tn$3=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$4(gt$4),i},providedIn:"root"})}return n})();function Yt$4(n,r){return w$3({body:r},n)}var xr$1=(()=>{class n{handler;constructor(e){this.handler=e;}request(e,t,i={}){let o;if(e instanceof be$3)o=e;else {let u;i.headers instanceof z$2?u=i.headers:u=new z$2(i.headers);let d;i.params&&(i.params instanceof j$3?d=i.params:d=new j$3({fromObject:i.params})),o=new be$3(e,t,i.body!==void 0?i.body:null,{headers:u,context:i.context,params:d,reportProgress:i.reportProgress,reportUploadProgress:i.reportUploadProgress,reportDownloadProgress:i.reportDownloadProgress,responseType:i.responseType||"json",withCredentials:i.withCredentials,transferCache:i.transferCache,keepalive:i.keepalive,priority:i.priority,cache:i.cache,mode:i.mode,redirect:i.redirect,credentials:i.credentials,referrer:i.referrer,referrerPolicy:i.referrerPolicy,integrity:i.integrity,timeout:i.timeout});}let a=ag(o).pipe(Tg(u=>this.handler.handle(u)));if(e instanceof be$3||i.observe==="events")return a;let c=a.pipe(Xt$5(u=>u instanceof He$2));switch(i.observe||"body"){case "body":switch(o.responseType){case "arraybuffer":return c.pipe(Me$3(u=>{if(u.body!==null&&!(u.body instanceof ArrayBuffer))throw new b$4(2806,false);return u.body}));case "blob":return c.pipe(Me$3(u=>{if(u.body!==null&&!(u.body instanceof Blob))throw new b$4(2807,false);return u.body}));case "text":return c.pipe(Me$3(u=>{if(u.body!==null&&typeof u.body!="string")throw new b$4(2808,false);return u.body}));default:return c.pipe(Me$3(u=>u.body))}case "response":return c;default:throw new b$4(2809,false)}}delete(e,t={}){return this.request("DELETE",e,t)}get(e,t={}){return this.request("GET",e,t)}head(e,t={}){return this.request("HEAD",e,t)}jsonp(e,t){return this.request("JSONP",e,{params:new j$3().append(t,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,t={}){return this.request("OPTIONS",e,t)}patch(e,t,i={}){return this.request("PATCH",e,Yt$4(i,t))}post(e,t,i={}){return this.request("POST",e,Yt$4(i,t))}put(e,t,i={}){return this.request("PUT",e,Yt$4(i,t))}static \u0275fac=function(t){return new(t||n)(ke$4(tn$3))};static \u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var no$3=new S$2("",{factory:()=>true}),ro$1="XSRF-TOKEN",io$3=new S$2("",{factory:()=>ro$1}),oo$1="X-XSRF-TOKEN",ao$1=new S$2("",{factory:()=>oo$1}),so$2=(()=>{class n{cookieName=T$3(io$3);doc=T$3(ir$4);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=Be$1(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),Rr$1=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$4(so$2),i},providedIn:"root"})}return n})();function co$1(n,r){if(!T$3(no$3)||n.method==="GET"||n.method==="HEAD")return r(n);try{let i=T$3(ge$3).href,{origin:o}=new URL(i),{origin:a}=new URL(n.url,o);if(o!==a)return r(n)}catch(i){return r(n)}let e=T$3(Rr$1).getToken(),t=T$3(ao$1);return e!=null&&!n.headers.has(t)&&(n=n.clone({headers:n.headers.set(t,e)})),r(n)}var nn$3=(function(n){return n[n.Interceptors=0]="Interceptors",n[n.LegacyInterceptors=1]="LegacyInterceptors",n[n.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",n[n.NoXsrfProtection=3]="NoXsrfProtection",n[n.JsonpSupport=4]="JsonpSupport",n[n.RequestsMadeViaParent=5]="RequestsMadeViaParent",n[n.Fetch=6]="Fetch",n[n.Xhr=7]="Xhr",n})(nn$3||{});function uo$1(n,r){return {\u0275kind:n,\u0275providers:r}}function lo$2(...n){let r=[xr$1,pt$4,gt$4,{provide:tn$3,useExisting:gt$4},{provide:en$3,useFactory:()=>T$3(pt$4)},{provide:qt$3,useValue:co$1,multi:true}];for(let e of n)r.push(...e.\u0275providers);return Rs(r)}var Ar$1=new S$2("");function mo$1(){return uo$1(nn$3.LegacyInterceptors,[{provide:Ar$1,useFactory:to$3},{provide:qt$3,useExisting:Ar$1,multi:true}])}var Uu=(()=>{class n{_doc;_dom;constructor(e){this._doc=e,this._dom=P$2();}addTag(e,t=false){return e?this._getOrCreateElement(e,t):null}addTags(e,t=false){return e?e.reduce((i,o)=>(o&&i.push(this._getOrCreateElement(o,t)),i),[]):[]}getTag(e){if(!e)return null;let t=this._doc.querySelector(`meta[${e}]`);return t?.nodeName.toLowerCase()==="meta"?t:null}getTags(e){if(!e)return [];let t=this._doc.querySelectorAll(`meta[${e}]`);return t?[].slice.call(t).filter(i=>i.nodeName.toLowerCase()==="meta"):[]}updateTag(e,t){if(!e)return null;t=t||this._parseSelector(e);let i=this.getTag(t);return i?this._setMetaElementAttributes(e,i):this._getOrCreateElement(e,true)}removeTag(e){this.removeTagElement(this.getTag(e));}removeTagElement(e){e&&this._dom.remove(e);}_getOrCreateElement(e,t=false){if(!t){let a=this._parseSelector(e),c=this.getTags(a).filter(u=>this._containsAttributes(e,u))[0];if(c!==void 0)return c}let i=this._dom.createElement("meta");return this._setMetaElementAttributes(e,i),this._doc.getElementsByTagName("head")[0].appendChild(i),i}_setMetaElementAttributes(e,t){return Object.keys(e).forEach(i=>t.setAttribute(this._getMetaKeyMap(i),e[i])),t}_parseSelector(e){let t=e.name?"name":"property";return `${t}=${this._escapeSelectorValue(String(e[t]))}`}_escapeSelectorValue(e){return `"${e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`}_containsAttributes(e,t){return Object.keys(e).every(i=>t.getAttribute(this._getMetaKeyMap(i))===e[i])}_getMetaKeyMap(e){return fo$2[e]||e}static \u0275fac=function(t){return new(t||n)(ke$4(ir$4))};static \u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),fo$2={httpEquiv:"http-equiv"},ju=(()=>{class n{_doc;constructor(e){this._doc=e;}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||"";}static \u0275fac=function(t){return new(t||n)(ke$4(ir$4))};static \u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var rn$3=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:function(t){let i=null;return t?i=new(t||n):i=ke$4(ho$1),i},providedIn:"root"})}return n})(),ho$1=(()=>{class n extends rn$3{_doc=T$3(ir$4);sanitize(e,t){if(t==null)return null;switch(e){case br$2.NONE:return t;case br$2.HTML:return _i$3(t,"HTML")?Nn$2(t):_f(this._doc,String(t)).toString();case br$2.STYLE:return _i$3(t,"Style")?Nn$2(t):t;case br$2.SCRIPT:if(_i$3(t,"Script"))return Nn$2(t);throw new b$4(5200,false);case br$2.URL:return _i$3(t,"URL")?Nn$2(t):lc(String(t));case br$2.RESOURCE_URL:if(_i$3(t,"ResourceURL"))return Nn$2(t);throw new b$4(5201,false);default:throw new b$4(5202,false)}}bypassSecurityTrustHtml(e){return py(e)}bypassSecurityTrustStyle(e){return hy(e)}bypassSecurityTrustScript(e){return gy(e)}bypassSecurityTrustUrl(e){return my(e)}bypassSecurityTrustResourceUrl(e){return yy(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var on$3;try{on$3=typeof Intl<"u"&&Intl.v8BreakIterator;}catch(n){on$3=false;}var A$2=(()=>{class n{_platformId=T$3(vm);isBrowser=this._platformId?dr$3(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||on$3)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function an$3(n){return Array.isArray(n)?n:[n]}var Or$1=new Set,te$2,bt$4=(()=>{class n{_platform=T$3(A$2);_nonce=T$3(Em,{optional:true});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):go$2;}matchMedia(e){return (this._platform.WEBKIT||this._platform.BLINK)&&po$1(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function po$1(n,r){if(!Or$1.has(n))try{te$2||(te$2=document.createElement("style"),r&&te$2.setAttribute("nonce",r),te$2.setAttribute("type","text/css"),document.head.appendChild(te$2)),te$2.sheet&&(te$2.sheet.insertRule(`@media ${n.replace(/[{}]/g,"")} {body{ }}`,0),Or$1.add(n));}catch(e){console.error(e);}}function go$2(n){return {matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var bo$2=(()=>{class n{_mediaMatcher=T$3(bt$4);_zone=T$3(ue$1);_queries=new Map;_destroySubject=new ne$3;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete();}isMatched(e){return Nr$1(an$3(e)).some(i=>this._registerQuery(i).mql.matches)}observe(e){let i=Nr$1(an$3(e)).map(a=>this._registerQuery(a).observable),o=yg(i);return o=Jt$3(o.pipe(It$7(1)),o.pipe(Hl(1),Cg(0))),o.pipe(Me$3(a=>{let c={matches:false,breakpoints:{}};return a.forEach(({matches:u,query:d})=>{c.matches=c.matches||u,c.breakpoints[d]=u;}),c}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let t=this._mediaMatcher.matchMedia(e),o={observable:new N$5(a=>{let c=u=>this._zone.run(()=>a.next(u));return t.addListener(c),()=>{t.removeListener(c);}}).pipe(Bl(t),Me$3(({matches:a})=>({query:e,matches:a})),Rg(this._destroySubject)),mql:t};return this._queries.set(e,o),o}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function Nr$1(n){return n.map(r=>r.split(",")).reduce((r,e)=>r.concat(e)).map(r=>r.trim())}var td={XSmall:"(max-width: 599.98px)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)"};function Ve$3(n){return n.buttons===0||n.detail===0}function Ge$1(n){let r=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return !!r&&r.identifier===-1&&(r.radiusX==null||r.radiusX===1)&&(r.radiusY==null||r.radiusY===1)}var sn$3;function Lr$1(){if(sn$3==null){let n=typeof document<"u"?document.head:null;sn$3=!!(n&&(n.createShadowRoot||n.attachShadow));}return sn$3}function cn$3(n){if(Lr$1()){let r=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&r instanceof ShadowRoot)return r}return null}function yo$2(){let n=typeof document<"u"&&document?document.activeElement:null;for(;n&&n.shadowRoot;){let r=n.shadowRoot.activeElement;if(r===n)break;n=r;}return n}function N$4(n){if(n.composedPath)try{return n.composedPath()[0]}catch(r){}return n.target}var We$1;function Pr$1(){if(We$1==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>We$1=!0}));}finally{We$1=We$1||false;}return We$1}function _e$3(n){return Pr$1()?n:!!n.capture}function un$3(n,r=0){return kr$1(n)?Number(n):arguments.length===2?r:0}function kr$1(n){return !isNaN(parseFloat(n))&&!isNaN(Number(n))}function k$4(n){return n instanceof Tr$2?n.nativeElement:n}var Br$1=new S$2("cdk-input-modality-detector-options"),Ur$1={ignoreKeys:[18,17,224,91,16]},jr$1=650,dn$3={passive:true,capture:true},zr$1=(()=>{class n{_platform=T$3(A$2);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Rn$2(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(t=>t===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=N$4(e));};_onMousedown=e=>{Date.now()-this._lastTouchMs<jr$1||(this._modality.next(Ve$3(e)?"keyboard":"mouse"),this._mostRecentTarget=N$4(e));};_onTouchstart=e=>{if(Ge$1(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=N$4(e);};constructor(){let e=T$3(ue$1),t=T$3(ir$4),i=T$3(Br$1,{optional:true});if(this._options=w$3(w$3({},Ur$1),i),this.modalityDetected=this._modality.pipe(Hl(1)),this.modalityChanged=this.modalityDetected.pipe(Fl()),this._platform.isBrowser){let o=T$3(vr$3).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(t,"keydown",this._onKeydown,dn$3),o.listen(t,"mousedown",this._onMousedown,dn$3),o.listen(t,"touchstart",this._onTouchstart,dn$3)]);}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e());}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),Ke$2=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(Ke$2||{}),$r$1=new S$2("cdk-focus-monitor-default-options"),yt$4=_e$3({passive:true,capture:true}),ln$3=(()=>{class n{_ngZone=T$3(ue$1);_platform=T$3(A$2);_inputModalityDetector=T$3(zr$1);_origin=null;_lastFocusOrigin=null;_windowFocused=false;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=false;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=true,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=false);};_document=T$3(ir$4);_stopInputModalityDetector=new ne$3;constructor(){let e=T$3($r$1,{optional:true});this._detectionMode=e?.detectionMode||Ke$2.IMMEDIATE;}_rootNodeFocusAndBlurListener=e=>{let t=N$4(e);for(let i=t;i;i=i.parentElement)e.type==="focus"?this._onFocus(e,i):this._onBlur(e,i);};monitor(e,t=false){let i=k$4(e);if(!this._platform.isBrowser||i.nodeType!==1)return ag();let o=cn$3(i)||this._document,a=this._elementInfo.get(i);if(a)return t&&(a.checkChildren=true),a.subject;let c={checkChildren:t,subject:new ne$3,rootNode:o};return this._elementInfo.set(i,c),this._registerGlobalListeners(c),c.subject}stopMonitoring(e){let t=k$4(e),i=this._elementInfo.get(t);i&&(i.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(i));}focusVia(e,t,i){let o=k$4(e),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([c,u])=>this._originChanged(c,t,u)):(this._setOrigin(t),typeof o.focus=="function"&&o.focus(i));}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t));}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Ke$2.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,t){e.classList.toggle("cdk-focused",!!t),e.classList.toggle("cdk-touch-focused",t==="touch"),e.classList.toggle("cdk-keyboard-focused",t==="keyboard"),e.classList.toggle("cdk-mouse-focused",t==="mouse"),e.classList.toggle("cdk-program-focused",t==="program");}_setOrigin(e,t=false){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&t,this._detectionMode===Ke$2.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?jr$1:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i);}});}_onFocus(e,t){let i=this._elementInfo.get(t),o=N$4(e);!i||!i.checkChildren&&t!==o||this._originChanged(t,this._getFocusOrigin(o),i);}_onBlur(e,t){let i=this._elementInfo.get(t);!i||i.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(i,null));}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t));}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let t=e.rootNode,i=this._rootNodeFocusListenerCount.get(t)||0;i||this._ngZone.runOutsideAngular(()=>{t.addEventListener("focus",this._rootNodeFocusAndBlurListener,yt$4),t.addEventListener("blur",this._rootNodeFocusAndBlurListener,yt$4);}),this._rootNodeFocusListenerCount.set(t,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener);}),this._inputModalityDetector.modalityDetected.pipe(Rg(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,true);}));}_removeGlobalListeners(e){let t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){let i=this._rootNodeFocusListenerCount.get(t);i>1?this._rootNodeFocusListenerCount.set(t,i-1):(t.removeEventListener("focus",this._rootNodeFocusAndBlurListener,yt$4),t.removeEventListener("blur",this._rootNodeFocusAndBlurListener,yt$4),this._rootNodeFocusListenerCount.delete(t));}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId));}_originChanged(e,t,i){this._setClasses(e,t),this._emitOrigin(i,t),this._lastFocusOrigin=t;}_getClosestElementsInfo(e){let t=[];return this._elementInfo.forEach((i,o)=>{(o===e||i.checkChildren&&o.contains(e))&&t.push([o,i]);}),t}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:t,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!t||t===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return  false;let o=e.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(t))return  true}return  false}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var vt$4=new WeakMap,$$5=(()=>{class n{_appRef;_injector=T$3(le$2);_environmentInjector=T$3(ce$3);load(e){let t=this._appRef=this._appRef||this._injector.get(Fi$4),i=vt$4.get(t);i||(i={loaders:new Set,refs:[]},vt$4.set(t,i),t.onDestroy(()=>{vt$4.get(t)?.refs.forEach(o=>o.destroy()),vt$4.delete(t);})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(jF(e,{environmentInjector:this._environmentInjector})));}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var Dt$5=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2})}return n})(),_t$3;function vo$2(){if(_t$3===void 0&&(_t$3=null,typeof window<"u")){let n=window;n.trustedTypes!==void 0&&(_t$3=n.trustedTypes.createPolicy("angular#components",{createHTML:r=>r}));}return _t$3}function _o$2(n){return vo$2()?.createHTML(n)||n}function Hr$1(n,r,e){let t=e.sanitize(br$2.HTML,r);n.innerHTML=_o$2(t||"");}function Do$2(n){if(n.type==="characterData"&&n.target instanceof Comment)return  true;if(n.type==="childList"){for(let r=0;r<n.addedNodes.length;r++)if(!(n.addedNodes[r]instanceof Comment))return  false;for(let r=0;r<n.removedNodes.length;r++)if(!(n.removedNodes[r]instanceof Comment))return  false;return  true}return  false}var Eo$2=(()=>{class n{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),wo$2=(()=>{class n{_mutationObserverFactory=T$3(Eo$2);_observedElements=new Map;_ngZone=T$3(ue$1);ngOnDestroy(){this._observedElements.forEach((e,t)=>this._cleanupObserver(t));}observe(e){let t=k$4(e);return new N$5(i=>{let a=this._observeElement(t).pipe(Me$3(c=>c.filter(u=>!Do$2(u))),Xt$5(c=>!!c.length)).subscribe(c=>{this._ngZone.run(()=>{i.next(c);});});return ()=>{a.unsubscribe(),this._unobserveElement(t);}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else {let t=new ne$3,i=this._mutationObserverFactory.create(o=>t.next(o));i&&i.observe(e,{characterData:true,childList:true,subtree:true}),this._observedElements.set(e,{observer:i,stream:t,count:1});}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e));}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:t,stream:i}=this._observedElements.get(e);t&&t.disconnect(),i.complete(),this._observedElements.delete(e);}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),Vd=(()=>{class n{_contentObserver=T$3(wo$2);_elementRef=T$3(Tr$2);event=new qe$3;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe();}_disabled=false;get debounce(){return this._debounce}set debounce(e){this._debounce=un$3(e),this._subscribe();}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe();}ngOnDestroy(){this._unsubscribe();}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(Cg(this.debounce)):e).subscribe(this.event);}_unsubscribe(){this._currentSubscription?.unsubscribe();}static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",PF],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return n})();var Gr$1=(()=>{class n{_platform=T$3(A$2);isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return Co$2(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return  false;let t=Ao$2(Oo$2(e));if(t&&(Vr$1(t)===-1||!this.isVisible(t)))return  false;let i=e.nodeName.toLowerCase(),o=Vr$1(e);return e.hasAttribute("contenteditable")?o!==-1:i==="iframe"||i==="object"||this._platform.WEBKIT&&this._platform.IOS&&!xo$2(e)?false:i==="audio"?e.hasAttribute("controls")?o!==-1:false:i==="video"?o===-1?false:o!==null?true:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,t){return Ro$2(e)&&!this.isDisabled(e)&&(t?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function Ao$2(n){try{return n.frameElement}catch(r){return null}}function Co$2(n){return !!(n.offsetWidth||n.offsetHeight||typeof n.getClientRects=="function"&&n.getClientRects().length)}function To$2(n){let r=n.nodeName.toLowerCase();return r==="input"||r==="select"||r==="button"||r==="textarea"}function So$2(n){return Mo$1(n)&&n.type=="hidden"}function Io$2(n){return Fo$1(n)&&n.hasAttribute("href")}function Mo$1(n){return n.nodeName.toLowerCase()=="input"}function Fo$1(n){return n.nodeName.toLowerCase()=="a"}function Wr$1(n){if(!n.hasAttribute("tabindex")||n.tabIndex===void 0)return  false;let r=n.getAttribute("tabindex");return !!(r&&!isNaN(parseInt(r,10)))}function Vr$1(n){if(!Wr$1(n))return null;let r=parseInt(n.getAttribute("tabindex")||"",10);return isNaN(r)?-1:r}function xo$2(n){let r=n.nodeName.toLowerCase(),e=r==="input"&&n.type;return e==="text"||e==="password"||r==="select"||r==="textarea"}function Ro$2(n){return So$2(n)?false:To$2(n)||Io$2(n)||n.hasAttribute("contenteditable")||Wr$1(n)}function Oo$2(n){return n.ownerDocument&&n.ownerDocument.defaultView||window}var Et$6=class Et{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=false;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(r){this._enabled=r,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(r,this._startAnchor),this._toggleAnchorTabIndex(r,this._endAnchor));}_enabled=true;constructor(r,e,t,i,o=false,a){this._element=r,this._checker=e,this._ngZone=t,this._document=i,this._injector=a,o||this.attachAnchors();}destroy(){let r=this._startAnchor,e=this._endAnchor;r&&(r.removeEventListener("focus",this.startAnchorListener),r.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=false;}attachAnchors(){return this._hasAttached?true:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener));}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=true),this._hasAttached)}focusInitialElementWhenReady(r){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(r)));})}focusFirstTabbableElementWhenReady(r){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(r)));})}focusLastTabbableElementWhenReady(r){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(r)));})}_getRegionBoundary(r){let e=this._element.querySelectorAll(`[cdk-focus-region-${r}], [cdkFocusRegion${r}], [cdk-focus-${r}]`);return r=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(r){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let t=this._getFirstTabbableElement(e);return t?.focus(r),!!t}return e.focus(r),true}return this.focusFirstTabbableElement(r)}focusFirstTabbableElement(r){let e=this._getRegionBoundary("start");return e&&e.focus(r),!!e}focusLastTabbableElement(r){let e=this._getRegionBoundary("end");return e&&e.focus(r),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(r){if(this._checker.isFocusable(r)&&this._checker.isTabbable(r))return r;let e=r.children;for(let t=0;t<e.length;t++){let i=e[t].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[t]):null;if(i)return i}return null}_getLastTabbableElement(r){if(this._checker.isFocusable(r)&&this._checker.isTabbable(r))return r;let e=r.children;for(let t=e.length-1;t>=0;t--){let i=e[t].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[t]):null;if(i)return i}return null}_createAnchor(){let r=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,r),r.classList.add("cdk-visually-hidden"),r.classList.add("cdk-focus-trap-anchor"),r.setAttribute("aria-hidden","true"),r}_toggleAnchorTabIndex(r,e){r?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex");}toggleAnchors(r){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(r,this._startAnchor),this._toggleAnchorTabIndex(r,this._endAnchor));}_executeOnStable(r){Wf(r,{injector:this._injector});}},No$2=(()=>{class n{_checker=T$3(Gr$1);_ngZone=T$3(ue$1);_document=T$3(ir$4);_injector=T$3(le$2);constructor(){T$3($$5).load(Dt$5);}create(e,t=false){return new Et$6(e,this._checker,this._ngZone,this._document,t,this._injector)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var Kr$1=new S$2("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),Zr$2=new S$2("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),Lo$2=0,Po$2=(()=>{class n{_ngZone=T$3(ue$1);_defaultOptions=T$3(Zr$2,{optional:true});_liveElement;_document=T$3(ir$4);_sanitizer=T$3(rn$3);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=T$3(Kr$1,{optional:true});this._liveElement=e||this._createLiveElement();}announce(e,...t){let i=this._defaultOptions,o,a;return t.length===1&&typeof t[0]=="number"?a=t[0]:[o,a]=t,this.clear(),clearTimeout(this._previousTimeout),o||(o=i&&i.politeness?i.politeness:"polite"),a==null&&i&&(a=i.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(c=>this._currentResolve=c)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:Hr$1(this._liveElement,e,this._sanitizer),typeof a=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="");}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;}_createLiveElement(){let e="cdk-live-announcer-element",t=this._document.getElementsByClassName(e),i=this._document.createElement("div");for(let o=0;o<t.length;o++)t[o].remove();return i.classList.add(e),i.classList.add("cdk-visually-hidden"),i.setAttribute("aria-atomic","true"),i.setAttribute("aria-live","polite"),i.id=`cdk-live-announcer-${Lo$2++}`,this._document.body.appendChild(i),i}_exposeAnnouncerToModals(e){let t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let i=0;i<t.length;i++){let o=t[i],a=o.getAttribute("aria-owns");a?a.indexOf(e)===-1&&o.setAttribute("aria-owns",a+" "+e):o.setAttribute("aria-owns",e);}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var ko$2=200,wt$5=class wt{_letterKeyStream=new ne$3;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new ne$3;selectedItem=this._selectedItem;constructor(r,e){let t=typeof e?.debounceInterval=="number"?e.debounceInterval:ko$2;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(r),this._setupKeyHandler(t);}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete();}setCurrentSelectedItemIndex(r){this._selectedItemIndex=r;}setItems(r){this._items=r;}handleKey(r){let e=r.keyCode;r.key&&r.key.length===1?this._letterKeyStream.next(r.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e));}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[];}_setupKeyHandler(r){this._letterKeyStream.pipe($l(e=>this._pressedLetters.push(e)),Cg(r),Xt$5(()=>this._pressedLetters.length>0),Me$3(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let t=1;t<this._items.length+1;t++){let i=(this._selectedItemIndex+t)%this._items.length,o=this._items[i];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[];});}};function Yr$2(n,...r){return r.length?r.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var De$4=class De{_items;_activeItemIndex=Fe$3(-1);_activeItem=Fe$3(null);_wrap=false;_typeaheadSubscription=G$4.EMPTY;_itemChangesSubscription;_vertical=true;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=false;_pageUpAndDown={enabled:false,delta:10};_effectRef;_typeahead;_skipPredicateFn=r=>r.disabled;constructor(r,e){this._items=r,r instanceof si$2?this._itemChangesSubscription=r.changes.subscribe(t=>this._itemsChanged(t.toArray())):ar$4(r)&&(this._effectRef=pa$1(()=>this._itemsChanged(r()),{injector:e}));}tabOut=new ne$3;change=new ne$3;skipPredicate(r){return this._skipPredicateFn=r,this}withWrap(r=true){return this._wrap=r,this}withVerticalOrientation(r=true){return this._vertical=r,this}withHorizontalOrientation(r){return this._horizontal=r,this}withAllowedModifierKeys(r){return this._allowedModifierKeys=r,this}withTypeAhead(r=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new wt$5(e,{debounceInterval:typeof r=="number"?r:void 0,skipPredicate:t=>this._skipPredicateFn(t)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(t=>{this.setActiveItem(t);}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(r=true){return this._homeAndEnd=r,this}withPageUpDown(r=true,e=10){return this._pageUpAndDown={enabled:r,delta:e},this}setActiveItem(r){let e=this._activeItem();this.updateActiveItem(r),this._activeItem()!==e&&this.change.next(this._activeItemIndex());}onKeydown(r){let e=r.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!r[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(o<a?o:a-1,-1);break}else return;default:(i||Yr$2(r,"shiftKey"))&&this._typeahead?.handleKey(r);return}this._typeahead?.reset(),r.preventDefault();}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return !!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1);}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1);}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1);}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1);}updateActiveItem(r){let e=this._getItemsArray(),t=typeof r=="number"?r:e.indexOf(r),i=e[t];this._activeItem.set(i??null),this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t);}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete();}_setActiveItemByDelta(r){this._wrap?this._setActiveInWrapMode(r):this._setActiveInDefaultMode(r);}_setActiveInWrapMode(r){let e=this._getItemsArray();for(let t=1;t<=e.length;t++){let i=(this._activeItemIndex()+r*t+e.length)%e.length,o=e[i];if(!this._skipPredicateFn(o)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(r){this._setActiveItemByIndex(this._activeItemIndex()+r,r);}_setActiveItemByIndex(r,e){let t=this._getItemsArray();if(t[r]){for(;this._skipPredicateFn(t[r]);)if(r+=e,!t[r])return;this.setActiveItem(r);}}_getItemsArray(){return ar$4(this._items)?this._items():this._items instanceof si$2?this._items.toArray():this._items}_itemsChanged(r){this._typeahead?.setItems(r);let e=this._activeItem();if(e){let t=r.indexOf(e);t>-1&&t!==this._activeItemIndex()&&(this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t));}}};var mn$3=class mn extends De$4{setActiveItem(r){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(r),this.activeItem&&this.activeItem.setActiveStyles();}};var fn$3=class fn extends De$4{_origin="program";setFocusOrigin(r){return this._origin=r,this}setActiveItem(r){super.setActiveItem(r),this.activeItem&&this.activeItem.focus(this._origin);}};var Xr$2=new Map,hn$3=class n{_appId=T$3(da$1);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(r,e=false){this._appId!=="ng"&&(r+=this._appId);let t=Xr$2.get(r);return t===void 0?t=0:t++,Xr$2.set(r,t),`${r}${e?n._infix+"-":""}${t}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})};var qr$1=" ";function Bo$1(n,r,e){let t=Ct$4(n,r);e=e.trim(),!t.some(i=>i.trim()===e)&&(t.push(e),n.setAttribute(r,t.join(qr$1)));}function Uo$2(n,r,e){let t=Ct$4(n,r);e=e.trim();let i=t.filter(o=>o!==e);i.length?n.setAttribute(r,i.join(qr$1)):n.removeAttribute(r);}function Ct$4(n,r){return n.getAttribute(r)?.match(/\S+/g)??[]}var Qr$2="cdk-describedby-message",At$6="cdk-describedby-host",gn$3=0,Vl=(()=>{class n{_platform=T$3(A$2);_document=T$3(ir$4);_messageRegistry=new Map;_messagesContainer=null;_id=`${gn$3++}`;constructor(){T$3($$5).load(Dt$5),this._id=T$3(da$1)+"-"+gn$3++;}describe(e,t,i){if(!this._canBeDescribed(e,t))return;let o=pn$2(t,i);typeof t!="string"?(Jr$2(t,this._id),this._messageRegistry.set(o,{messageElement:t,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(t,i),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o);}removeDescription(e,t,i){if(!t||!this._isElementNode(e))return;let o=pn$2(t,i);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof t=="string"){let a=this._messageRegistry.get(o);a&&a.referenceCount===0&&this._deleteMessageElement(o);}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null);}ngOnDestroy(){let e=this._document.querySelectorAll(`[${At$6}="${this._id}"]`);for(let t=0;t<e.length;t++)this._removeCdkDescribedByReferenceIds(e[t]),e[t].removeAttribute(At$6);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear();}_createMessageElement(e,t){let i=this._document.createElement("div");Jr$2(i,this._id),i.textContent=e,t&&i.setAttribute("role",t),this._createMessagesContainer(),this._messagesContainer.appendChild(i),this._messageRegistry.set(pn$2(e,t),{messageElement:i,referenceCount:0});}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e);}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",t=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<t.length;o++)t[o].remove();let i=this._document.createElement("div");i.style.visibility="hidden",i.classList.add(e),i.classList.add("cdk-visually-hidden"),this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._messagesContainer=i;}_removeCdkDescribedByReferenceIds(e){let t=Ct$4(e,"aria-describedby").filter(i=>i.indexOf(Qr$2)!=0);e.setAttribute("aria-describedby",t.join(" "));}_addMessageReference(e,t){let i=this._messageRegistry.get(t);Bo$1(e,"aria-describedby",i.messageElement.id),e.setAttribute(At$6,this._id),i.referenceCount++;}_removeMessageReference(e,t){let i=this._messageRegistry.get(t);i.referenceCount--,Uo$2(e,"aria-describedby",i.messageElement.id),e.removeAttribute(At$6);}_isElementDescribedByMessage(e,t){let i=Ct$4(e,"aria-describedby"),o=this._messageRegistry.get(t),a=o&&o.messageElement.id;return !!a&&i.indexOf(a)!=-1}_canBeDescribed(e,t){if(!this._isElementNode(e))return  false;if(t&&typeof t=="object")return  true;let i=t==null?"":`${t}`.trim(),o=e.getAttribute("aria-label");return i?!o||o.trim()!==i:false}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function pn$2(n,r){return typeof n=="string"?`${r||""}/${n}`:n}function Jr$2(n,r){n.id||(n.id=`${Qr$2}-${r}-${gn$3++}`);}var Ze$1=(function(n){return n[n.NORMAL=0]="NORMAL",n[n.NEGATED=1]="NEGATED",n[n.INVERTED=2]="INVERTED",n})(Ze$1||{}),Tt$6,ne$2;function ql(){if(ne$2==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return ne$2=false,ne$2;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)ne$2=true;else {let n=Element.prototype.scrollTo;n?ne$2=!/\{\s*\[native code\]\s*\}/.test(n.toString()):ne$2=false;}}return ne$2}function Ql(){if(typeof document!="object"||!document)return Ze$1.NORMAL;if(Tt$6==null){let n=document.createElement("div"),r=n.style;n.dir="rtl",r.width="1px",r.overflow="auto",r.visibility="hidden",r.pointerEvents="none",r.position="absolute";let e=document.createElement("div"),t=e.style;t.width="2px",t.height="1px",n.appendChild(e),document.body.appendChild(n),Tt$6=Ze$1.NORMAL,n.scrollLeft===0&&(n.scrollLeft=1,Tt$6=n.scrollLeft===0?Ze$1.NEGATED:Ze$1.INVERTED),n.remove();}return Tt$6}function tm(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Ee$3,ei$1=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function rm(){if(Ee$3)return Ee$3;if(typeof document!="object"||!document)return Ee$3=new Set(ei$1),Ee$3;let n=document.createElement("input");return Ee$3=new Set(ei$1.filter(r=>(n.setAttribute("type",r),n.type===r))),Ee$3}var jo$2=new S$2("MATERIAL_ANIMATIONS"),ti$1=null;function zo$2(){return T$3(jo$2,{optional:true})?.animationsDisabled||T$3(Im,{optional:true})==="NoopAnimations"?"di-disabled":(ti$1??=T$3(bt$4).matchMedia("(prefers-reduced-motion)").matches,ti$1?"reduced-motion":"enabled")}function we$3(){return zo$2()!=="enabled"}function lm(n){return n==null?"":typeof n=="string"?n:`${n}px`}function fm(n){return n!=null&&`${n}`!="false"}var F$3=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(F$3||{}),bn$3=class bn{_renderer;element;config;_animationForciblyDisabledThroughCss;state=F$3.HIDDEN;constructor(r,e,t,i=false){this._renderer=r,this.element=e,this.config=t,this._animationForciblyDisabledThroughCss=i;}fadeOut(){this._renderer.fadeOutRipple(this);}},ni$1=_e$3({passive:true,capture:true}),yn$2=class yn{_events=new Map;addHandler(r,e,t,i){let o=this._events.get(e);if(o){let a=o.get(t);a?a.add(i):o.set(t,new Set([i]));}else this._events.set(e,new Map([[t,new Set([i])]])),r.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,ni$1);});}removeHandler(r,e,t){let i=this._events.get(r);if(!i)return;let o=i.get(e);o&&(o.delete(t),o.size===0&&i.delete(e),i.size===0&&(this._events.delete(r),document.removeEventListener(r,this._delegateEventHandler,ni$1)));}_delegateEventHandler=r=>{let e=N$4(r);e&&this._events.get(r.type)?.forEach((t,i)=>{(i===e||i.contains(e))&&t.forEach(o=>o.handleEvent(r));});}},Ye$2={enterDuration:225,exitDuration:150},$o$3=800,ri$1=_e$3({passive:true,capture:true}),ii$1=["mousedown","touchstart"],oi$1=["mouseup","mouseleave","touchend","touchcancel"],Ho$2=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:[`.mat-ripple {
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
`],encapsulation:2})}return n})(),Xe$1=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=false;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=false;_containerRect=null;static _eventManager=new yn$2;constructor(r,e,t,i,o){this._target=r,this._ngZone=e,this._platform=i,i.isBrowser&&(this._containerElement=k$4(t)),o&&o.get($$5).load(Ho$2);}fadeInRipple(r,e,t={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=w$3(w$3({},Ye$2),t.animation);t.centered&&(r=i.left+i.width/2,e=i.top+i.height/2);let a=t.radius||Vo$1(r,e,i),c=r-i.left,u=e-i.top,d=o.enterDuration,l=document.createElement("div");l.classList.add("mat-ripple-element"),l.style.left=`${c-a}px`,l.style.top=`${u-a}px`,l.style.height=`${a*2}px`,l.style.width=`${a*2}px`,t.color!=null&&(l.style.backgroundColor=t.color),l.style.transitionDuration=`${d}ms`,this._containerElement.appendChild(l);let v=window.getComputedStyle(l),C=v.transitionProperty,re=v.transitionDuration,H=C==="none"||re==="0s"||re==="0s, 0s"||i.width===0&&i.height===0,T=new bn$3(this,l,t,H);l.style.transform="scale3d(1, 1, 1)",T.state=F$3.FADING_IN,t.persistent||(this._mostRecentTransientRipple=T);let E=null;return !H&&(d||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let B=()=>{E&&(E.fallbackTimer=null),clearTimeout(G),this._finishRippleTransition(T);},V=()=>this._destroyRipple(T),G=setTimeout(V,d+100);l.addEventListener("transitionend",B),l.addEventListener("transitioncancel",V),E={onTransitionEnd:B,onTransitionCancel:V,fallbackTimer:G};}),this._activeRipples.set(T,E),(H||!d)&&this._finishRippleTransition(T),T}fadeOutRipple(r){if(r.state===F$3.FADING_OUT||r.state===F$3.HIDDEN)return;let e=r.element,t=w$3(w$3({},Ye$2),r.config.animation);e.style.transitionDuration=`${t.exitDuration}ms`,e.style.opacity="0",r.state=F$3.FADING_OUT,(r._animationForciblyDisabledThroughCss||!t.exitDuration)&&this._finishRippleTransition(r);}fadeOutAll(){this._getActiveRipples().forEach(r=>r.fadeOut());}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(r=>{r.config.persistent||r.fadeOut();});}setupTriggerEvents(r){let e=k$4(r);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,ii$1.forEach(t=>{n._eventManager.addHandler(this._ngZone,t,e,this);}));}handleEvent(r){r.type==="mousedown"?this._onMousedown(r):r.type==="touchstart"?this._onTouchStart(r):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{oi$1.forEach(e=>{this._triggerElement.addEventListener(e,this,ri$1);});}),this._pointerUpEventsRegistered=true);}_finishRippleTransition(r){r.state===F$3.FADING_IN?this._startFadeOutTransition(r):r.state===F$3.FADING_OUT&&this._destroyRipple(r);}_startFadeOutTransition(r){let e=r===this._mostRecentTransientRipple,{persistent:t}=r.config;r.state=F$3.VISIBLE,!t&&(!e||!this._isPointerDown)&&r.fadeOut();}_destroyRipple(r){let e=this._activeRipples.get(r)??null;this._activeRipples.delete(r),this._activeRipples.size||(this._containerRect=null),r===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),r.state=F$3.HIDDEN,e!==null&&(r.element.removeEventListener("transitionend",e.onTransitionEnd),r.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),r.element.remove();}_onMousedown(r){let e=Ve$3(r),t=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+$o$3;!this._target.rippleDisabled&&!e&&!t&&(this._isPointerDown=true,this.fadeInRipple(r.clientX,r.clientY,this._target.rippleConfig));}_onTouchStart(r){if(!this._target.rippleDisabled&&!Ge$1(r)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=true;let e=r.changedTouches;if(e)for(let t=0;t<e.length;t++)this.fadeInRipple(e[t].clientX,e[t].clientY,this._target.rippleConfig);}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=false,this._getActiveRipples().forEach(r=>{let e=r.state===F$3.VISIBLE||r.config.terminateOnPointerUp&&r.state===F$3.FADING_IN;!r.config.persistent&&e&&r.fadeOut();}));}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let r=this._triggerElement;r&&(ii$1.forEach(e=>n._eventManager.removeHandler(e,r,this)),this._pointerUpEventsRegistered&&(oi$1.forEach(e=>r.removeEventListener(e,this,ri$1)),this._pointerUpEventsRegistered=false));}};function Vo$1(n,r,e){let t=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),i=Math.max(Math.abs(r-e.top),Math.abs(r-e.bottom));return Math.sqrt(t*t+i*i)}var vn$3=new S$2("mat-ripple-global-options"),Tm=(()=>{class n{_elementRef=T$3(Tr$2);_animationsDisabled=we$3();color;unbounded=false;centered=false;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled();}_disabled=false;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled();}_trigger;_rippleRenderer;_globalOptions;_isInitialized=false;constructor(){let e=T$3(ue$1),t=T$3(A$2),i=T$3(vn$3,{optional:true}),o=T$3(le$2);this._globalOptions=i||{},this._rippleRenderer=new Xe$1(this,e,this._elementRef,t,o);}ngOnInit(){this._isInitialized=true,this._setupTriggerEventsIfEnabled();}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents();}fadeOutAll(){this._rippleRenderer.fadeOutAll();}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent();}get rippleConfig(){return {centered:this.centered,radius:this.radius,color:this.color,animation:w$3(w$3(w$3({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger);}launch(e,t=0,i){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,t,w$3(w$3({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,w$3(w$3({},this.rippleConfig),e))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(t,i){t&2&&gh("mat-ripple-unbounded",i.unbounded);},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var Go$1={capture:true},Wo$1=["focus","mousedown","mouseenter","touchstart"],_n$2="mat-ripple-loader-uninitialized",Dn$2="mat-ripple-loader-class-name",ai$1="mat-ripple-loader-centered",St$5="mat-ripple-loader-disabled",si$1=(()=>{class n{_document=T$3(ir$4);_animationsDisabled=we$3();_globalRippleOptions=T$3(vn$3,{optional:true});_platform=T$3(A$2);_ngZone=T$3(ue$1);_injector=T$3(le$2);_eventCleanups;_hosts=new Map;constructor(){let e=T$3(vr$3).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>Wo$1.map(t=>e.listen(this._document,t,this._onInteraction,Go$1)));}ngOnDestroy(){let e=this._hosts.keys();for(let t of e)this.destroyRipple(t);this._eventCleanups.forEach(t=>t());}configureRipple(e,t){e.setAttribute(_n$2,this._globalRippleOptions?.namespace??""),(t.className||!e.hasAttribute(Dn$2))&&e.setAttribute(Dn$2,t.className||""),t.centered&&e.setAttribute(ai$1,""),t.disabled&&e.setAttribute(St$5,"");}setDisabled(e,t){let i=this._hosts.get(e);i?(i.target.rippleDisabled=t,!t&&!i.hasSetUpEvents&&(i.hasSetUpEvents=true,i.renderer.setupTriggerEvents(e))):t?e.setAttribute(St$5,""):e.removeAttribute(St$5);}_onInteraction=e=>{let t=N$4(e);if(t instanceof HTMLElement){let i=t.closest(`[${_n$2}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i);}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let t=this._document.createElement("span");t.classList.add("mat-ripple",e.getAttribute(Dn$2)),e.append(t);let i=this._globalRippleOptions,o=this._animationsDisabled?0:i?.animation?.enterDuration??Ye$2.enterDuration,a=this._animationsDisabled?0:i?.animation?.exitDuration??Ye$2.exitDuration,c={rippleDisabled:this._animationsDisabled||i?.disabled||e.hasAttribute(St$5),rippleConfig:{centered:e.hasAttribute(ai$1),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:a}}},u=new Xe$1(c,this._ngZone,t,this._platform,this._injector),d=!c.rippleDisabled;d&&u.setupTriggerEvents(e),this._hosts.set(e,{target:c,renderer:u,hasSetUpEvents:d}),e.removeAttribute(_n$2);}destroyRipple(e){let t=this._hosts.get(e);t&&(t.renderer._removeTriggerEvents(),this._hosts.delete(e));}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var ci$1=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(t,i){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2})}return n})();var Ko$1=["*",[["","progressIndicator",""]]],Zo$2=["*","[progressIndicator]"];function Yo$1(n,r){n&1&&(Bc(0,"div",1),uD(1,1),$c());}var Xo$1=new S$2("MAT_BUTTON_CONFIG");function ui$1(n){return n==null?void 0:LF(n)}var It$6=(()=>{class n{_elementRef=T$3(Tr$2);_ngZone=T$3(ue$1);_animationsDisabled=we$3();_config=T$3(Xo$1,{optional:true});_focusMonitor=T$3(ln$3);_cleanupClick;_renderer=T$3(CI);_rippleLoader=T$3(si$1);_isAnchor;_isFab=false;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled();}_disableRipple=false;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled();}_disabled=false;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e;}showProgress=NF(false,{transform:PF});constructor(){T$3($$5).load(ci$1);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??false,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"});}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,true),this._isAnchor&&this._setupAsAnchor();}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);}focus(e="program",t){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,t):this._elementRef.nativeElement.focus(t);}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?true:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:true}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled);}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation());}));}static \u0275fac=function(t){return new(t||n)};static \u0275dir=CE({type:n,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(t,i){t&2&&(Kp("disabled",i._getDisabledAttribute())("aria-disabled",i._getAriaDisabled())("tabindex",i._getTabIndex()),_D(i.color?"mat-"+i.color:""),gh("mat-mdc-button-progress-indicator-shown",i.showProgress())("mat-mdc-button-disabled",i.disabled)("mat-mdc-button-disabled-interactive",i.disabledInteractive)("mat-unthemed",!i.color)("_mat-animation-noopable",i._animationsDisabled));},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",PF],disabled:[2,"disabled","disabled",PF],ariaDisabled:[2,"aria-disabled","ariaDisabled",PF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",PF],tabIndex:[2,"tabIndex","tabIndex",ui$1],_tabindex:[2,"tabindex","_tabindex",ui$1],showProgress:[1,"showProgress"]}})}return n})(),Jo$2=(()=>{class n extends It$6{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:true});}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[Wp],ngContentSelectors:Zo$2,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(t,i){t&1&&(lD(Ko$1),eh(0,"span",0),uD(1),ZE(2,Yo$1,2,0,"div",1),eh(3,"span",2)(4,"span",3)),t&2&&(Hv(2),YE(i.showProgress()?2:-1));},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2})}return n})();var qo$1=new S$2("cdk-dir-doc",{providedIn:"root",factory:()=>T$3(ir$4)}),Qo$2=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function di$1(n){let r=n?.toLowerCase()||"";return r==="auto"&&typeof navigator<"u"&&navigator?.language?Qo$2.test(navigator.language)?"rtl":"ltr":r==="rtl"?"rtl":"ltr"}var ea=(()=>{class n{get value(){return this.valueSignal()}valueSignal=Fe$3("ltr");change=new qe$3;constructor(){let e=T$3(qo$1,{optional:true});if(e){let t=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(di$1(t||i||"ltr"));}}ngOnDestroy(){this.change.complete();}static \u0275fac=function(t){return new(t||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var mi$1=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],fi$3=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function ta(n,r){n&1&&(Bc(0,"div",2),uD(1,3),$c());}function na(n,r){n&1&&(Bc(0,"div",2),uD(1,3),$c());}var ra=`.mat-mdc-fab-base {
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
`,li$1=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),of=(()=>{class n extends It$6{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text");}_appearance=null;constructor(){super();let e=ia(this._elementRef.nativeElement);e&&this.setAppearance(e);}setAppearance(e){if(e===this._appearance)return;let t=this._elementRef.nativeElement.classList,i=this._appearance?li$1.get(this._appearance):null,o=li$1.get(e);i&&t.remove(...i),t.add(...o),this._appearance=e;}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Wp],ngContentSelectors:fi$3,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(t,i){t&1&&(lD(mi$1),eh(0,"span",0),uD(1),Bc(2,"span",1),uD(3,1),$c(),uD(4,2),ZE(5,ta,2,0,"div",2),eh(6,"span",3)(7,"span",4)),t&2&&(gh("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab),Hv(5),YE(i.showProgress()?5:-1));},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2})}return n})();function ia(n){return n.hasAttribute("mat-raised-button")?"elevated":n.hasAttribute("mat-stroked-button")?"outlined":n.hasAttribute("mat-flat-button")?"filled":n.hasAttribute("mat-button")?"text":null}var oa=new S$2("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>En$2}),En$2={color:"accent"};var af=(()=>{class n extends It$6{_options=T$3(oa,{optional:true});_isFab=true;constructor(){super(),this._options=this._options||En$2,this.color=this._options.color||En$2.color;}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=IE({type:n,selectors:[["button","mat-mini-fab",""],["a","mat-mini-fab",""],["button","matMiniFab",""],["a","matMiniFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"],exportAs:["matButton","matAnchor"],features:[Wp],ngContentSelectors:fi$3,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(t,i){t&1&&(lD(mi$1),eh(0,"span",0),uD(1),Bc(2,"span",1),uD(3,1),$c(),uD(4,2),ZE(5,na,2,0,"div",2),eh(6,"span",3)(7,"span",4)),t&2&&(gh("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab),Hv(5),YE(i.showProgress()?5:-1));},styles:[ra],encapsulation:2})}return n})();var ct$4=class ct{static scrollToTop(){window.scroll({top:0,left:0,behavior:"smooth"});}static isElementDisplayed(a){let t=document.getElementById(a);return t?window.getComputedStyle(t).display!=="none":(console.warn(`Element with id "${a}" not found.`),false)}static composeImgSrc(a){return `data:image/jpeg;base64,${a}`}static imageExtensionFor(a){return a.type==="image/png"?"png":"jpg"}};var lt$4=(()=>{class e{_animationsDisabled=we$3();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(n){return new(n||e)};static \u0275cmp=IE({type:e,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(n,i){n&2&&gh("mat-pseudo-checkbox-indeterminate",i.state==="indeterminate")("mat-pseudo-checkbox-checked",i.state==="checked")("mat-pseudo-checkbox-disabled",i.disabled)("mat-pseudo-checkbox-minimal",i.appearance==="minimal")("mat-pseudo-checkbox-full",i.appearance==="full")("_mat-animation-noopable",i._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(n,i){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return e})();var gt$3=["text"],ut$4=[[["mat-icon"]],"*"],bt$3=["mat-icon","*"];function ft$4(e,a){if(e&1&&Xp(0,"mat-pseudo-checkbox",1),e&2){let t=aD();Jp("disabled",t.disabled)("state",t.selected?"checked":"unchecked");}}function xt$2(e,a){if(e&1&&Xp(0,"mat-pseudo-checkbox",3),e&2){let t=aD();Jp("disabled",t.disabled);}}function vt$3(e,a){if(e&1&&(wi$2(0,"span",4),FD(1),Hc()),e&2){let t=aD();Hv(),qc("(",t.group.label,")");}}var mt$4=new S$2("MAT_OPTION_PARENT_COMPONENT"),dt$4=new S$2("MatOptgroup");var F$2=class F{source;isUserInput;constructor(a,t=false){this.source=a,this.isUserInput=t;}},kt$3=(()=>{class e{_element=T$3(Tr$2);_changeDetectorRef=T$3(kF);_parent=T$3(mt$4,{optional:true});group=T$3(dt$4,{optional:true});_signalDisableRipple=false;_selected=false;_active=false;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=T$3(hn$3).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(t){this._disabled.set(t);}_disabled=Fe$3(false);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return !!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new qe$3;_text;_stateChanges=new ne$3;constructor(){let t=T$3($$5);t.load(ci$1),t.load(Dt$5),this._signalDisableRipple=!!this._parent&&ar$4(this._parent.disableRipple);}get active(){return this._active}get viewValue(){return (this._text?.nativeElement.textContent||"").trim()}select(t=true){this._selected||(this._selected=true,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent());}deselect(t=true){this._selected&&(this._selected=false,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent());}focus(t,n){let i=this._getHostElement();typeof i.focus=="function"&&i.focus(n);}setActiveStyles(){this._active||(this._active=true,this._changeDetectorRef.markForCheck());}setInactiveStyles(){this._active&&(this._active=false,this._changeDetectorRef.markForCheck());}getLabel(){return this.viewValue}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!Yr$2(t)&&(this._selectViaInteraction(),t.preventDefault());}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:true,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(true));}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let t=this.viewValue;t!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=t);}}ngOnDestroy(){this._stateChanges.complete();}_emitSelectionChangeEvent(t=false){this.onSelectionChange.emit(new F$2(this,t));}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=IE({type:e,selectors:[["mat-option"]],viewQuery:function(n,i){if(n&1&&lh(gt$3,7),n&2){let o;fD(o=pD())&&(i._text=o.first);}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(n,i){n&1&&ih("click",function(){return i._selectViaInteraction()})("keydown",function(c){return i._handleKeydown(c)}),n&2&&(rh("id",i.id),Kp("aria-selected",i.selected)("aria-disabled",i.disabled.toString()),gh("mdc-list-item--selected",i.selected)("mat-mdc-option-multiple",i.multiple)("mat-mdc-option-active",i.active)("mdc-list-item--disabled",i.disabled));},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",PF]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:bt$3,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(n,i){n&1&&(lD(ut$4),ZE(0,ft$4,1,2,"mat-pseudo-checkbox",1),uD(1),wi$2(2,"span",2,0),uD(4,1),Hc(),ZE(5,xt$2,1,1,"mat-pseudo-checkbox",3),ZE(6,vt$3,2,1,"span",4),Xp(7,"div",5)),n&2&&(YE(i.multiple?0:-1),Hv(5),YE(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),Hv(),YE(i.group&&i.group._inert?6:-1),Hv(),Jp("matRippleTrigger",i._getHostElement())("matRippleDisabled",i.disabled||i.disableRipple));},dependencies:[lt$4,Tm],styles:[`.mat-mdc-option {
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
`],encapsulation:2})}return e})();function yt$3(e,a,t){if(t.length){let n=a.toArray(),i=t.toArray(),o=0;for(let c=0;c<e+1;c++)n[c].group&&n[c].group===i[o]&&o++;return o}return 0}function wt$4(e,a,t,n){return e<t?e:e+a>t+n?Math.max(0,e-n+a):t}var B$4=class B{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new ne$3;constructor(a=false,t,n=true,i){this._multiple=a,this._emitChanges=n,this.compareWith=i,t&&t.length&&(a?t.forEach(o=>this._markSelected(o)):this._markSelected(t[0]),this._selectedToEmit.length=0);}select(...a){this._verifyValueAssignment(a),a.forEach(n=>this._markSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}deselect(...a){this._verifyValueAssignment(a),a.forEach(n=>this._unmarkSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}setSelection(...a){this._verifyValueAssignment(a);let t=this.selected,n=new Set(a.map(o=>this._getConcreteValue(o)));a.forEach(o=>this._markSelected(o)),t.filter(o=>!n.has(this._getConcreteValue(o,n))).forEach(o=>this._unmarkSelected(o));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(a){return this.isSelected(a)?this.deselect(a):this.select(a)}clear(a=true){this._unmarkAll();let t=this._hasQueuedChanges();return a&&this._emitChangeEvent(),t}isSelected(a){return this._selection.has(this._getConcreteValue(a))}isEmpty(){return this._selection.size===0}hasValue(){return !this.isEmpty()}sort(a){this._multiple&&this.selected&&this._selected.sort(a);}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[]);}_markSelected(a){a=this._getConcreteValue(a),this.isSelected(a)||(this._multiple||this._unmarkAll(),this.isSelected(a)||this._selection.add(a),this._emitChanges&&this._selectedToEmit.push(a));}_unmarkSelected(a){a=this._getConcreteValue(a),this.isSelected(a)&&(this._selection.delete(a),this._emitChanges&&this._deselectedToEmit.push(a));}_unmarkAll(){this.isEmpty()||this._selection.forEach(a=>this._unmarkSelected(a));}_verifyValueAssignment(a){a.length>1&&this._multiple;}_hasQueuedChanges(){return !!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(a,t){if(this.compareWith){t=t??this._selection;for(let n of t)if(this.compareWith(a,n))return n;return a}else return a}};var Ct$3=["*"],Mt$3=`.mdc-list {
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
`,Dt$4=["unscopedContent"],It$5=["text"],Lt$3=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Tt$5=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var St$4=new S$2("ListOption"),Et$5=(()=>{class e{_elementRef=T$3(Tr$2);static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return e})(),At$5=(()=>{class e{_elementRef=T$3(Tr$2);static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return e})(),Ot$3=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return e})(),ht$4=(()=>{class e{_listOption=T$3(St$4,{optional:true});_isAlignedAtStart(){return !this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,hostVars:4,hostBindings:function(n,i){n&2&&gh("mdc-list-item__start",i._isAlignedAtStart())("mdc-list-item__end",!i._isAlignedAtStart());}})}return e})(),Rt$3=(()=>{class e extends ht$4{static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275dir=CE({type:e,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[Wp]})}return e})(),zt$3=(()=>{class e extends ht$4{static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275dir=CE({type:e,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[Wp]})}return e})(),Ft$3=new S$2("MAT_LIST_CONFIG"),Q$5=(()=>{class e{_isNonInteractive=true;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=fm(t);}_disableRipple=false;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(fm(t));}_disabled=Fe$3(false);_defaultOptions=T$3(Ft$3,{optional:true});static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,hostVars:1,hostBindings:function(n,i){n&2&&Kp("aria-disabled",i.disabled);},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return e})(),Pt$4=(()=>{class e{_elementRef=T$3(Tr$2);_ngZone=T$3(ue$1);_listBase=T$3(Q$5,{optional:true});_platform=T$3(A$2);_hostElement;_isButtonElement;_noopAnimations=we$3();_avatars;_icons;set lines(t){this._explicitLines=un$3(t,null),this._updateItemLines(false);}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=fm(t);}_disableRipple=false;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(fm(t));}_disabled=Fe$3(false);_subscriptions=new G$4;_rippleRenderer=null;_hasUnscopedTextContent=false;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){T$3($$5).load(ci$1);let t=T$3(vn$3,{optional:true});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button");}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(true);}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents();}_hasIconOrAvatar(){return !!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new Xe$1(this,this._ngZone,this._hostElement,this._platform,T$3(le$2)),this._rippleRenderer.setupTriggerEvents(this._hostElement);}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Dg(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(false)));});}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let n=this._explicitLines??this._inferLinesFromContent(),i=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",n<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",n<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",n===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",n===3),this._hasUnscopedTextContent){let o=this._titles.length===0&&n===1;i.classList.toggle("mdc-list-item__primary-text",o),i.classList.toggle("mdc-list-item__secondary-text",!o);}else i.classList.remove("mdc-list-item__primary-text"),i.classList.remove("mdc-list-item__secondary-text");}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()));}static \u0275fac=function(n){return new(n||e)};static \u0275dir=CE({type:e,contentQueries:function(n,i,o){if(n&1&&ch(o,Rt$3,4)(o,zt$3,4),n&2){let c;fD(c=pD())&&(i._avatars=c),fD(c=pD())&&(i._icons=c);}},hostVars:4,hostBindings:function(n,i){n&2&&(Kp("aria-disabled",i.disabled)("disabled",i._isButtonElement&&i.disabled||null),gh("mdc-list-item--disabled",i.disabled));},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return e})();var Ye$1=(()=>{class e extends Q$5{static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275cmp=IE({type:e,selectors:[["mat-list"]],hostAttrs:[1,"mat-mdc-list","mat-mdc-list-base","mdc-list"],exportAs:["matList"],features:[zD([{provide:Q$5,useExisting:e}]),Wp],ngContentSelectors:Ct$3,decls:1,vars:0,template:function(n,i){n&1&&(lD(),uD(0));},styles:[Mt$3],encapsulation:2})}return e})(),qe$2=(()=>{class e extends Pt$4{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=fm(t);}_activated=false;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(e)))(i||e)}})();static \u0275cmp=IE({type:e,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(n,i,o){if(n&1&&ch(o,At$5,5)(o,Et$5,5)(o,Ot$3,5),n&2){let c;fD(c=pD())&&(i._lines=c),fD(c=pD())&&(i._titles=c),fD(c=pD())&&(i._meta=c);}},viewQuery:function(n,i){if(n&1&&lh(Dt$4,5)(It$5,5),n&2){let o;fD(o=pD())&&(i._unscopedContent=o.first),fD(o=pD())&&(i._itemText=o.first);}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(n,i){n&2&&(Kp("aria-current",i._getAriaCurrent()),gh("mdc-list-item--activated",i.activated)("mdc-list-item--with-leading-avatar",i._avatars.length!==0)("mdc-list-item--with-leading-icon",i._icons.length!==0)("mdc-list-item--with-trailing-meta",i._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",i._hasBothLeadingAndTrailing())("_mat-animation-noopable",i._noopAnimations));},inputs:{activated:"activated"},exportAs:["matListItem"],features:[Wp],ngContentSelectors:Tt$5,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(n,i){n&1&&(lD(Lt$3),uD(0),wi$2(1,"span",1),uD(2,1),uD(3,2),wi$2(4,"span",2,0),ih("cdkObserveContent",function(){return i._updateItemLines(true)}),uD(6,3),Hc()(),uD(7,4),uD(8,5),Xp(9,"div",3));},dependencies:[Vd],encapsulation:2})}return e})();var F$1=(l,t,s,e,i)=>e+(l-t)/(s-t)*(i-e),g$3=(l,t,s)=>Math.min(s,Math.max(t,l));var r$1=(l,t)=>l+Math.random()*(t-l),N$3=(l,t)=>Math.floor(r$1(l,t+1));var Z$3={minIntervalSeconds:6,maxIntervalSeconds:14,durationSeconds:3,peakAlpha:.4,colorRgb:"255,235,205",radiusFraction:.6},w$1=class w{constructor(t={}){this.shineStartedAt=null,this.originX=.5,this.originY=.5,this.options=w$3(w$3({},Z$3),t),this.nextShineAt=r$1(this.options.minIntervalSeconds,this.options.maxIntervalSeconds);}update(t){if(this.shineStartedAt===null){t>=this.nextShineAt&&(this.shineStartedAt=t,this.originX=r$1(.25,.75),this.originY=r$1(.25,.75));return}t-this.shineStartedAt>=this.options.durationSeconds&&(this.shineStartedAt=null,this.nextShineAt=t+r$1(this.options.minIntervalSeconds,this.options.maxIntervalSeconds));}draw(t,s,e,i){if(this.shineStartedAt===null)return;let o=(i-this.shineStartedAt)/this.options.durationSeconds,a=Math.sin(Math.PI*o);if(a<=0)return;let h=Math.min(s,e)*this.options.radiusFraction,n=s*this.originX,c=e*this.originY,d=t.createRadialGradient(n,c,0,n,c,h);d.addColorStop(0,`rgba(${this.options.colorRgb}, ${this.options.peakAlpha*a})`),d.addColorStop(1,`rgba(${this.options.colorRgb}, 0)`),t.save(),t.globalCompositeOperation="lighter",t.fillStyle=d,t.fillRect(0,0,s,e),t.restore();}};var m$3=class m{constructor(t,s,e=1){this.depth=t,this.maxShift=s,this.ease=e,this.currentX=0,this.currentY=0;}update(t,s){let e=t*this.depth*this.maxShift,i=s*this.depth*this.maxShift;this.currentX+=(e-this.currentX)*this.ease,this.currentY+=(i-this.currentY)*this.ease;}get x(){return this.currentX}get y(){return this.currentY}reset(){this.currentX=0,this.currentY=0;}};function I$4(l){return C$5(this,null,function*(){let t=yield Promise.all(Object.entries(l).map(([s,e])=>new Promise((i,o)=>{let a=new Image;a.onload=()=>i([s,a]),a.onerror=()=>o(new Error(`Failed to load image: ${e}`)),a.src=e;})));return Object.fromEntries(t)})}var M$2="assets/images/canvases/",S$1=Math.PI*2,J$2=.0015,tt$3="#241d18",st$4="rgba(36, 29, 24, 0.035)",et$3=.6180339887*S$1,_=class{constructor(){this.width=0,this.height=0,this.angle=0,this.prayerNumber=1,this.prayerCount=4,this.headParallax=new m$3(1,16,.03),this.bodyParallax=new m$3(.4,26,.02),this.lightShine=new w$1,this.prayers=[];}setup(t,s,e){return C$5(this,null,function*(){this.width=s,this.height=e;let i=yield I$4({head:`${M$2}cabeza.png`,p1:`${M$2}pryer1.png`,p2:`${M$2}pryer2.png`,p3:`${M$2}pryer3.png`,p4:`${M$2}pryer4.png`});this.head=i.head,this.prayers=[i.p1,i.p2,i.p3,i.p4],this.paintBase(t),this.reseed();})}resize(t,s,e){this.width=s,this.height=e,this.paintBase(t);}pointerDown(){this.reseed();}draw(t,s){let{width:e,height:i}=this;if(!this.head)return;t.fillStyle=st$4,t.fillRect(0,0,e,i);let o=s.pointer.active?s.pointer.x:e/2,a=s.pointer.active?s.pointer.y:i/2,h=F$1(o,0,e,20,260),n=F$1(a,0,i,20,260),c=s.pointer.active?g$3((o-e/2)/(e/2),-1,1):0,d=s.pointer.active?g$3((a-i/2)/(i/2),-1,1):0;this.headParallax.update(c,d),this.bodyParallax.update(c,d),t.drawImage(this.head,e/2-this.head.width/2+this.headParallax.x,i/2-this.head.height/2+this.headParallax.y),t.save(),t.translate(e/2+this.bodyParallax.x,i/2+this.bodyParallax.y),t.rotate(this.angle);for(let p=0;p<this.prayerCount;p++){t.save(),t.rotate(p*S$1/this.prayerCount),t.translate(0,h*1.5);for(let f=0;f<this.prayerCount;f++){t.save(),t.rotate(f*S$1/this.prayerCount),t.translate(0,n);for(let A=0;A<this.prayerCount;A++)t.save(),t.rotate(A*S$1/this.prayerCount),t.translate(0,n),this.drawPrayer(t,s.t,p,f,A),t.restore();t.restore();}t.restore();}t.restore(),this.lightShine.update(s.t),this.lightShine.draw(t,e,i,s.t),this.angle+=J$2;}drawPrayer(t,s,e,i,o){let a=this.prayers[this.prayerNumber-1]??this.prayers[0],n=((e*this.prayerCount+i)*this.prayerCount+o)*et$3%S$1,c=1+.14*Math.sin(s*.5+n),d=.5+.35*(.5+.5*Math.sin(s*.35+n*1.7));t.save(),t.globalAlpha=d,t.scale(c,c),t.drawImage(a,-30,-45,60,90),t.restore();}paintBase(t){t.fillStyle=tt$3,t.fillRect(0,0,this.width,this.height);}reseed(){this.prayerNumber=N$3(1,4),this.prayerCount=N$3(3,5);}};var E=class{constructor(t,s=4){this.bpm=t,this.beatsPerBar=s,this.beatPeriod=60/t;}beatIndex(t){return Math.floor(t/this.beatPeriod)}phase(t){let s=t/this.beatPeriod%1;return s<0?s+1:s}envelope(t,s=3){return Math.pow(1-this.phase(t),s)}barBeat(t){return (this.beatIndex(t)%this.beatsPerBar+this.beatsPerBar)%this.beatsPerBar}isDownbeat(t){return this.barBeat(t)===0}};var O$2=class O{constructor(t){this.frames=t,this.totalMs=t.reduce((s,e)=>s+Math.max(0,e.ms),0);}get durationMs(){return this.totalMs}indexAt(t){if(this.frames.length===0)return 0;if(this.totalMs<=0)return this.frames[0].index;let s=(t*1e3%this.totalMs+this.totalMs)%this.totalMs;for(let e of this.frames){if(s<e.ms)return e.index;s-=e.ms;}return this.frames[this.frames.length-1].index}};var u=24,it$2=12e-5,at$4=40,ot$4=220,nt$2=.5,rt$3=6,ht$3=120,lt$3=260,dt$3=.4,C$3=class l{constructor(t,s,e=90){this.width=t,this.height=s,this.count=e,this.motes=[],this.seed();}static forArea(t,s,e=it$2){let i=Math.round(g$3(t*s*e,at$4,ot$4));return new l(t,s,i)}get list(){return this.motes}resize(t,s){this.width=t,this.height=s;}seed(){this.motes=[];for(let t=0;t<this.count;t++){let s=r$1(.12,1);this.motes.push({x:r$1(0,this.width),y:r$1(0,this.height),depth:s,radius:.6+s*2.2,baseVx:r$1(-4,9)*s,baseVy:r$1(-7,2)*s,wanderAmp:r$1(3,12),wanderFreqX:r$1(.05,.25),wanderFreqY:r$1(.05,.25),phase:r$1(0,Math.PI*2),twinkleFreq:r$1(.3,1.2),vx:0,vy:0});}}update(t,s){let e=this.width,i=this.height,o=Math.pow(.12,t);for(let a of this.motes){let h=Math.cos(s*a.wanderFreqX+a.phase)*a.wanderAmp,n=Math.sin(s*a.wanderFreqY+a.phase)*a.wanderAmp;a.x+=(a.baseVx+h+a.vx)*t,a.y+=(a.baseVy+n+a.vy)*t,a.vx*=o,a.vy*=o,a.x<-u?a.x=e+u:a.x>e+u&&(a.x=-u),a.y<-u?a.y=i+u:a.y>i+u&&(a.y=-u);}}gust(t,s,e,i){let o=i*i;for(let a of this.motes){let h=a.x-t,n=a.y-s,c=h*h+n*n;if(c>o||c===0)continue;let d=g$3(1-c/o,0,1),p=Math.sqrt(c);a.vx+=h/p*e*d*a.depth,a.vy+=n/p*e*d*a.depth;}}stir(t,s,e){e<=nt$2||this.gust(t,s,e*rt$3,ht$3);}puff(t,s){this.gust(t,s,lt$3,Math.max(this.width,this.height)*dt$3);}};var X$3=l=>l*l*(3-2*l),R$1=class R{constructor(t,s,e,i=.18,o=.3){this.gapMinS=t,this.gapMaxS=s,this.durationS=e,this.fadeIn=i,this.fadeOut=o,this.nextAt=0,this.startT=-1,this.id=0;}sample(t){if(this.nextAt===0&&(this.nextAt=t+r$1(this.gapMinS,this.gapMaxS)),this.startT<0){if(t<this.nextAt)return null;this.startT=t,this.id++;}let s=(t-this.startT)/this.durationS;return s>=1?(this.startT=-1,this.nextAt=t+r$1(this.gapMinS,this.gapMaxS),null):{sweep:s,intensity:this.intensityAt(s),id:this.id}}intensityAt(t){return t<this.fadeIn?X$3(t/this.fadeIn):t>1-this.fadeOut?X$3((1-t)/this.fadeOut):1}};var ct$3=6,G$3=16,pt$3=400,ft$3=800,gt$2=1400,ut$3=3600,mt$3=400,At$4=900,H$2=70,T$2=.06,D$1=l=>l*l*(3-2*l),P$1=class P{constructor(t,s,e=6){this.width=t,this.height=s,this.count=e,this.watchers=[];for(let i=0;i<e;i++)this.watchers.push({x:0,y:0,scale:1,tilt:0,openness:0,bornAt:-1,nextAt:r$1(0,G$3),fadeInMs:0,holdMs:0,fadeOutMs:0,blinkAtMs:0});}get list(){return this.watchers}resize(t,s){this.width=t,this.height=s;}update(t,s){for(let e of this.watchers){if(e.bornAt<0)if(t>=e.nextAt)this.spawn(e,t,s);else {e.openness=0;continue}let i=e.fadeInMs+e.holdMs+e.fadeOutMs,o=(t-e.bornAt)*1e3;if(o>=i){e.bornAt=-1,e.openness=0,e.nextAt=t+r$1(ct$3,G$3);continue}e.openness=this.opennessAt(e,o);}}opennessAt(t,s){if(s<t.fadeInMs)return D$1(s/t.fadeInMs);let e=s-t.fadeInMs;if(e<t.holdMs){let o=Math.abs(e-t.blinkAtMs);return o<H$2?D$1(o/H$2):1}let i=(e-t.holdMs)/t.fadeOutMs;return D$1(1-i)}spawn(t,s,e){let i=this.width/2,o=this.height/2,a=i,h=o;for(let n=0;n<12&&(a=r$1(this.width*T$2,this.width*(1-T$2)),h=r$1(this.height*T$2,this.height*(1-T$2)),!(Math.hypot(a-i,h-o)>=e));n++);t.x=a,t.y=h,t.scale=r$1(.75,1.5),t.tilt=r$1(-0.35,.35),t.bornAt=s,t.openness=0,t.fadeInMs=r$1(pt$3,ft$3),t.holdMs=r$1(gt$2,ut$3),t.fadeOutMs=r$1(mt$3,At$4),t.blinkAtMs=r$1(t.holdMs*.3,t.holdMs*.7);}};var L$2="assets/images/canvases/",Y$3=Math.PI*2,bt$2="#070a0f",Mt$2="rgba(7, 10, 15, 0.22)",$$4="255, 244, 214",St$3=.5,U$3=.84,yt$2=5,wt$3=.02,It$4=.55,k$3="255, 236, 200",_t$2=14,Et$4=34,Ot$2=5.5,Ct$2=1.15,Rt$2=.18,Tt$4=.7,Pt$3=.5,vt$2="#bcd2ff",Bt$3=[{index:2,ms:90},{index:1,ms:130},{index:2,ms:90}],W$3=3,z$1=8,xt$1=172,v$1=["255, 45, 149","45, 160, 255","150, 90, 255","255, 120, 40"],Ft$2=.12,Nt$3=.02,Dt$3=1.2,Lt$2=.02,kt$2=.5,Xt$3=.05,B$3=class B{constructor(){this.width=0,this.height=0,this.frames=[],this.beat=new E(xt$1),this.beam=new R$1(_t$2,Et$4,Ot$2),this.beamBuffer=document.createElement("canvas"),this.beamId=-1,this.beamOriginX=.5,this.beamDir=1,this.blinkMotion=new O$2(Bt$3),this.nextBlinkAt=0,this.blinkStartT=-1,this.headParallax=new m$3(1,22,.04),this.headBuffer=document.createElement("canvas");}setup(t,s,e){return C$5(this,null,function*(){this.width=s,this.height=e,this.field=C$3.forArea(s,e,16e-5),this.watchers=new P$1(s,e,yt$2),this.buildBeamBuffer();let i=yield I$4({f1:`${L$2}escondete1.png`,f2:`${L$2}escondete2.png`,f3:`${L$2}escondete3.png`});this.frames=[i.f1,i.f2,i.f3],this.paintBase(t);})}resize(t,s,e){this.width=s,this.height=e,this.field.resize(s,e),this.watchers.resize(s,e),this.paintBase(t);}pointerDown(t,s){this.field.puff(t,s);}draw(t,s){let{width:e,height:i}=this,o=s.pointer;o.active&&this.field.stir(o.x,o.y,Math.hypot(o.vx,o.vy)),this.field.update(s.dt,s.t);let a=Math.min(e,i)*U$3;this.watchers.update(s.t,a*It$4),t.fillStyle=Mt$2,t.fillRect(0,0,e,i),t.save(),t.globalCompositeOperation="lighter";for(let n of this.field.list){let d=(.35+.65*(.5+.5*Math.sin(s.t*n.twinkleFreq+n.phase)))*(.25+n.depth*.55)*St$3,p=n.radius*(2+n.depth*3),f=t.createRadialGradient(n.x,n.y,0,n.x,n.y,p);f.addColorStop(0,`rgba(${$$4}, ${d})`),f.addColorStop(1,`rgba(${$$4}, 0)`),t.fillStyle=f,t.beginPath(),t.arc(n.x,n.y,p,0,Y$3),t.fill();}t.restore();let h=this.beam.sample(s.t);h&&this.drawBeam(t,h),this.drawStageLights(t,s),this.drawWatchers(t),this.drawHead(t,s);}drawBeam(t,s){s.id!==this.beamId&&(this.beamId=s.id,this.beamOriginX=r$1(.2,.8),this.beamDir=Math.random()<.5?-1:1);let{width:e,height:i}=this,o=e*this.beamOriginX,a=-i*.15,h=this.beamDir>=0?s.sweep:1-s.sweep,n=Math.PI/2+(h-.5)*Ct$2,c=Math.max(e,i)*Tt$4,d=Math.min(e,i)*Rt$2;t.save(),t.globalCompositeOperation="lighter",t.globalAlpha=s.intensity*Pt$3,t.translate(o,a),t.rotate(n),t.drawImage(this.beamBuffer,0,-d/2,c,d),t.restore();}buildBeamBuffer(){this.beamBuffer.width=1024,this.beamBuffer.height=256;let e=this.beamBuffer.getContext("2d");if(!e)return;e.clearRect(0,0,1024,256),e.globalCompositeOperation="source-over",e.fillStyle=vt$2,e.fillRect(0,0,1024,256),e.globalCompositeOperation="destination-in";let i=e.createLinearGradient(0,0,0,256);i.addColorStop(0,"rgba(0, 0, 0, 0)"),i.addColorStop(.5,"rgba(0, 0, 0, 1)"),i.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=i,e.fillRect(0,0,1024,256);let o=e.createLinearGradient(0,0,1024,0);o.addColorStop(0,"rgba(0, 0, 0, 0.9)"),o.addColorStop(.55,"rgba(0, 0, 0, 0.5)"),o.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=o,e.fillRect(0,0,1024,256),e.globalCompositeOperation="source-over";}drawWatchers(t){let s=Math.min(this.width,this.height)*wt$3;t.save(),t.globalCompositeOperation="lighter";for(let e of this.watchers.list)e.openness>.02&&this.drawEyes(t,e,s);t.restore();}drawEyes(t,s,e){let i=e*s.scale,o=i*.62,a=i*1.5,h=Math.sign(this.width/2-s.x)*i*.22,n=Math.sign(this.height/2-s.y)*o*.2;t.save(),t.translate(s.x,s.y),t.rotate(s.tilt);for(let c of [-1,1]){t.save(),t.translate(c*a,0),t.scale(1,s.openness),t.beginPath(),t.ellipse(0,0,i,o,0,0,Y$3),t.clip();let d=t.createRadialGradient(h,n,0,h,n,i);d.addColorStop(0,`rgba(${k$3}, 0)`),d.addColorStop(.42,`rgba(${k$3}, ${.95*s.openness})`),d.addColorStop(1,`rgba(${k$3}, 0)`),t.fillStyle=d,t.fillRect(-i,-o,i*2,o*2),t.restore();}t.restore();}drawStageLights(t,s){let e=this.beat.envelope(s.t,2);if(e<.03)return;let{width:i,height:o}=this,a=this.beat.beatIndex(s.t),h=v$1[a%v$1.length],n=v$1[(a+2)%v$1.length],c=Math.sin(s.t*.7),d=Math.max(i,o)*.9;t.save(),t.globalCompositeOperation="lighter",t.globalAlpha=e*Ft$2,this.washLight(t,i*(.28+.16*c),o*.02,d,h),this.washLight(t,i*(.72-.16*c),o*.02,d,n),t.restore();}washLight(t,s,e,i,o){let a=t.createRadialGradient(s,e,0,s,e,i);a.addColorStop(0,`rgba(${o}, 0.9)`),a.addColorStop(1,`rgba(${o}, 0)`),t.fillStyle=a,t.fillRect(0,0,this.width,this.height);}blinkFrameIndex(t){if(this.nextBlinkAt===0&&(this.nextBlinkAt=t+r$1(W$3,z$1)),this.blinkStartT<0){if(t<this.nextBlinkAt)return 0;this.blinkStartT=t;}let s=t-this.blinkStartT;return s*1e3>=this.blinkMotion.durationMs?(this.blinkStartT=-1,this.nextBlinkAt=t+r$1(W$3,z$1),0):this.blinkMotion.indexAt(s)}drawHead(t,s){let e=this.frames[this.blinkFrameIndex(s.t)];if(!e)return;let{width:i,height:o}=this,a=s.t,h=s.pointer,n=h.active?g$3((h.x-i/2)/(i/2),-1,1):0,c=h.active?g$3((h.y-o/2)/(o/2),-1,1):0;this.headParallax.update(n,c);let d=Math.min(i,o)*U$3,p=this.featherHead(e,d);if(!p)return;let f=d*Nt$3,A=(Math.sin(a*.37)+.5*Math.sin(a*.91+1.3))*f,q=(Math.sin(a*.29+2.1)+.5*Math.sin(a*.83))*f,K=1+Math.sin(a*Dt$3)*Lt$2,j=Math.sin(a*kt$2)*Xt$3,V=i/2+A+this.headParallax.x,Q=o/2+q+this.headParallax.y,y=d*K;t.save(),t.translate(V,Q),t.rotate(j),t.drawImage(p,-y/2,-y/2,y,y),t.restore();}featherHead(t,s){let e=this.headBuffer,i=Math.max(1,Math.ceil(s));(e.width!==i||e.height!==i)&&(e.width=i,e.height=i);let o=e.getContext("2d");if(!o)return null;o.clearRect(0,0,i,i),o.globalCompositeOperation="source-over",o.drawImage(t,0,0,i,i);let a=i/2;o.globalCompositeOperation="destination-in";let h=o.createRadialGradient(a,a,a*.86,a,a,a*1.18);return h.addColorStop(0,"rgba(0, 0, 0, 1)"),h.addColorStop(1,"rgba(0, 0, 0, 0)"),o.fillStyle=h,o.fillRect(0,0,i,i),o.globalCompositeOperation="source-over",e}paintBase(t){t.fillStyle=bt$2,t.fillRect(0,0,this.width,this.height);}};var Gt$4={believe:{label:"Believe",factory:()=>new _},hide:{label:"Hide until everybody is dead",factory:()=>new B$3}},Ss=Object.entries(Gt$4).map(([l,t])=>({id:l,label:t.label}));var f$3="primary",Ve$2=Symbol("RouteTitle"),Vt$2=class Vt{params;constructor(n){this.params=n||{};}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return []}get keys(){return Object.keys(this.params)}};function se(t){return new Vt$2(t)}function Ht$3(t,n,e){for(let r=0;r<t.length;r++){let i=t[r],o=n[r];if(i[0]===":")e[i.substring(1)]=o;else if(i!==o.path)return  false}return  true}function cn$2(t,n,e){let r=e.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>t.length||e.pathMatch==="full"&&(n.hasChildren()||r.length<t.length))return null;let s={},u=t.slice(0,r.length);return Ht$3(r,u,s)?{consumed:u,posParams:s}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),a=r.slice(i+1);if(o.length+a.length>t.length||e.pathMatch==="full"&&n.hasChildren()&&e.path!=="**")return null;let c={};return !Ht$3(o,t.slice(0,o.length),c)||!Ht$3(a,t.slice(t.length-a.length),c)?null:{consumed:t,posParams:c}}function lt$2(t){return new Promise((n,e)=>{t.pipe(Mg()).subscribe({next:r=>n(r),error:r=>e(r)});})}function ei(t,n){if(t.length!==n.length)return  false;for(let e=0;e<t.length;++e)if(!B$2(t[e],n[e]))return  false;return  true}function B$2(t,n){let e=t?Gt$3(t):void 0,r=n?Gt$3(n):void 0;if(!e||!r||e.length!=r.length)return  false;let i;for(let o=0;o<e.length;o++)if(i=e[o],!un$2(t[i],n[i]))return  false;return  true}function Gt$3(t){return [...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function un$2(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return  false;let e=[...t].sort(),r=[...n].sort();return e.every((i,o)=>r[o]===i)}else return t===n}function ti(t){return t.length>0?t[t.length-1]:null}function le$1(t){return lg(t)?t:Fc(t)?Se$3(Promise.resolve(t)):ag(t)}function ln$2(t){return lg(t)?lt$2(t):Promise.resolve(t)}var ri={exact:dn$2,subset:fn$2},hn$2={exact:ni,subset:ii,ignored:()=>true},ar$2={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},xe$2={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function sr$2(t,n,e){let r=t instanceof N$2?t:n.parseUrl(t);return dt$6(()=>Wt$2(n.lastSuccessfulNavigation()?.finalUrl??new N$2,r,w$3(w$3({},xe$2),e)))}function Wt$2(t,n,e){return ri[e.paths](t.root,n.root,e.matrixParams)&&hn$2[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment==="exact"&&t.fragment!==n.fragment)}function ni(t,n){return B$2(t,n)}function dn$2(t,n,e){if(!ae$1(t.segments,n.segments)||!st$3(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return  false;for(let r in n.children)if(!t.children[r]||!dn$2(t.children[r],n.children[r],e))return  false;return  true}function ii(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>un$2(t[e],n[e]))}function fn$2(t,n,e){return pn$1(t,n,n.segments,e)}function pn$1(t,n,e,r){if(t.segments.length>e.length){let i=t.segments.slice(0,e.length);return !(!ae$1(i,e)||n.hasChildren()||!st$3(i,e,r))}else if(t.segments.length===e.length){if(!ae$1(t.segments,e)||!st$3(t.segments,e,r))return  false;for(let i in n.children)if(!t.children[i]||!fn$2(t.children[i],n.children[i],r))return  false;return  true}else {let i=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return !ae$1(t.segments,i)||!st$3(t.segments,i,r)||!t.children[f$3]?false:pn$1(t.children[f$3],n,o,r)}}function st$3(t,n,e){return n.every((r,i)=>hn$2[e](t[i].parameters,r.parameters))}var N$2=class N{root;queryParams;fragment;_queryParamMap;constructor(n=new m$2([],{}),e={},r=null){this.root=n,this.queryParams=e,this.fragment=r;}get queryParamMap(){return this._queryParamMap??=se(this.queryParams),this._queryParamMap}toString(){return si.serialize(this)}},m$2=class m{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(r=>r.parent=this);}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return ct$2(this)}},J$1=class J{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e;}get parameterMap(){return this._parameterMap??=se(this.parameters),this._parameterMap}toString(){return vn$2(this)}};function oi(t,n){return ae$1(t,n)&&t.every((e,r)=>B$2(e.parameters,n[r].parameters))}function ae$1(t,n){return t.length!==n.length?false:t.every((e,r)=>e.path===n[r].path)}function ai(t,n){let e=[];return Object.entries(t.children).forEach(([r,i])=>{r===f$3&&(e=e.concat(n(i,r)));}),Object.entries(t.children).forEach(([r,i])=>{r!==f$3&&(e=e.concat(n(i,r)));}),e}var Se$2=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>new X$2})}return t})(),X$2=class X{parse(n){let e=new Kt$2(n);return new N$2(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){let e=`/${_e$2(n.root,true)}`,r=li(n.queryParams),i=typeof n.fragment=="string"?`#${ci(n.fragment)}`:"";return `${e}${r}${i}`}},si=new X$2;function ct$2(t){return t.segments.map(n=>vn$2(n)).join("/")}function _e$2(t,n){if(!t.hasChildren())return ct$2(t);if(n){let e=t.children[f$3]?_e$2(t.children[f$3],false):"",r=[];return Object.entries(t.children).forEach(([i,o])=>{i!==f$3&&r.push(`${i}:${_e$2(o,false)}`);}),r.length>0?`${e}(${r.join("//")})`:e}else {let e=ai(t,(r,i)=>i===f$3?[_e$2(t.children[f$3],false)]:[`${i}:${_e$2(r,false)}`]);return Object.keys(t.children).length===1&&t.children[f$3]!=null?`${ct$2(t)}/${e[0]}`:`${ct$2(t)}/(${e.join("//")})`}}function gn$2(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function ot$3(t){return gn$2(t).replace(/%3B/gi,";")}function ci(t){return encodeURI(t)}function Qt$3(t){return gn$2(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function ut$2(t){return decodeURIComponent(t)}function en$2(t){return ut$2(t.replace(/\+/g,"%20"))}function vn$2(t){return `${Qt$3(t.path)}${ui(t.parameters)}`}function ui(t){return Object.entries(t).map(([n,e])=>`;${Qt$3(n)}=${Qt$3(e)}`).join("")}function li(t){let n=Object.entries(t).map(([e,r])=>Array.isArray(r)?r.map(i=>`${ot$3(e)}=${ot$3(i)}`).join("&"):`${ot$3(e)}=${ot$3(r)}`).filter(e=>e);return n.length?`?${n.join("&")}`:""}var hi=/^[^\/()?;#]+/;function Ft$1(t){let n=t.match(hi);return n?n[0]:""}var di=/^[^\/()?;=#]+/;function fi$2(t){let n=t.match(di);return n?n[0]:""}var pi=/^[^=?&#]+/;function gi$1(t){let n=t.match(pi);return n?n[0]:""}var vi=/^[^&#]+/;function mi(t){let n=t.match(vi);return n?n[0]:""}var Kt$2=class Kt{url;remaining;constructor(n){this.url=n,this.remaining=n;}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new m$2([],{}):new m$2([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new b$4(4010,false);if(this.remaining==="")return {};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(true,n));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(false,n)),(e.length>0||Object.keys(r).length>0)&&(i[f$3]=new m$2(e,r)),i}parseSegment(){let n=Ft$1(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new b$4(4009,false);return this.capture(n),new J$1(ut$2(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let e=fi$2(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let i=Ft$1(this.remaining);i&&(r=i,this.capture(r));}n[ut$2(e)]=ut$2(r);}parseQueryParam(n){let e=gi$1(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let a=mi(this.remaining);a&&(r=a,this.capture(r));}let i=en$2(e),o=en$2(r);if(n.hasOwnProperty(i)){let a=n[i];Array.isArray(a)||(a=[a],n[i]=a),a.push(o);}else n[i]=o;}parseParens(n,e){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Ft$1(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new b$4(4010,false);let a;i.indexOf(":")>-1?(a=i.slice(0,i.indexOf(":")),this.capture(a),this.capture(":")):n&&(a=f$3);let c=this.parseChildren(e+1);r[a??f$3]=Object.keys(c).length===1&&c[f$3]?c[f$3]:new m$2([],c),this.consumeOptional("//");}return r}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),true):false}capture(n){if(!this.consumeOptional(n))throw new b$4(4011,false)}};function mn$2(t){return t.segments.length>0?new m$2([],{[f$3]:t}):t}function yn$1(t){let n={};for(let[r,i]of Object.entries(t.children)){let o=yn$1(i);if(r===f$3&&o.segments.length===0&&o.hasChildren())for(let[a,c]of Object.entries(o.children))n[a]=c;else (o.segments.length>0||o.hasChildren())&&(n[r]=o);}let e=new m$2(t.segments,n);return yi$2(e)}function yi$2(t){if(t.numberOfChildren===1&&t.children[f$3]){let n=t.children[f$3];return new m$2(t.segments.concat(n.segments),n.children)}return t}function ee$1(t){return t instanceof N$2}function Rn$1(t,n,e=null,r=null,i=new X$2){let o=Sn$2(t);return Cn$2(o,n,e,r,i)}function Sn$2(t){let n;function e(o){let a={};for(let s of o.children){let u=e(s);a[s.outlet]=u;}let c=new m$2(o.url,a);return o===t&&(n=c),c}let r=e(t.root),i=mn$2(r);return n??i}function Cn$2(t,n,e,r,i){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return qt$2(o,o,o,e,r,i);let a=Ri$2(n);if(a.toRoot())return qt$2(o,o,new m$2([],{}),e,r,i);let c=Si$1(a,o,t),s=c.processChildren?Oe$4(c.segmentGroup,c.index,a.commands):bn$2(c.segmentGroup,c.index,a.commands);return qt$2(o,c.segmentGroup,s,e,r,i)}function ht$2(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function je$1(t){return typeof t=="object"&&t!=null&&t.outlets}function tn$2(t,n,e){t||="\u0275";let r=new N$2;return r.queryParams={[t]:n},e.parse(e.serialize(r)).queryParams[t]}function qt$2(t,n,e,r,i,o){let a={};for(let[u,h]of Object.entries(r??{}))a[u]=Array.isArray(h)?h.map(v=>tn$2(u,v,o)):tn$2(u,h,o);let c;t===n?c=e:c=wn$2(t,n,e);let s=mn$2(yn$1(c));return new N$2(s,a,i)}function wn$2(t,n,e){let r={};return Object.entries(t.children).forEach(([i,o])=>{o===n?r[i]=e:r[i]=wn$2(o,n,e);}),new m$2(t.segments,r)}var dt$2=class dt{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,r){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=r,n&&r.length>0&&ht$2(r[0]))throw new b$4(4003,false);let i=r.find(je$1);if(i&&i!==ti(r))throw new b$4(4004,false)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function Ri$2(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new dt$2(true,0,t);let n=0,e=false,r=t.reduce((i,o,a)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let c={};return Object.entries(o.outlets).forEach(([s,u])=>{c[s]=typeof u=="string"?u.split("/"):u;}),[...i,{outlets:c}]}if(o.segmentPath)return [...i,o.segmentPath]}return typeof o!="string"?[...i,o]:a===0?(o.split("/").forEach((c,s)=>{s==0&&c==="."||(s==0&&c===""?e=true:c===".."?n++:c!=""&&i.push(c));}),i):[...i,o]},[]);return new dt$2(e,n,r)}var fe$2=class fe{segmentGroup;processChildren;index;constructor(n,e,r){this.segmentGroup=n,this.processChildren=e,this.index=r;}};function Si$1(t,n,e){if(t.isAbsolute)return new fe$2(n,true,0);if(!e)return new fe$2(n,false,NaN);if(e.parent===null)return new fe$2(e,true,0);let r=ht$2(t.commands[0])?0:1,i=e.segments.length-1+r;return Ci$1(e,i,t.numberOfDoubleDots)}function Ci$1(t,n,e){let r=t,i=n,o=e;for(;o>i;){if(o-=i,r=r.parent,!r)throw new b$4(4005,false);i=r.segments.length;}return new fe$2(r,false,i-o)}function wi$1(t){return je$1(t[0])?t[0].outlets:{[f$3]:t}}function bn$2(t,n,e){if(t??=new m$2([],{}),t.segments.length===0&&t.hasChildren())return Oe$4(t,n,e);let r=bi$1(t,n,e),i=e.slice(r.commandIndex);if(r.match&&r.pathIndex<t.segments.length){let o=new m$2(t.segments.slice(0,r.pathIndex),{});return o.children[f$3]=new m$2(t.segments.slice(r.pathIndex),t.children),Oe$4(o,0,i)}else return r.match&&i.length===0?new m$2(t.segments,{}):r.match&&!t.hasChildren()?Yt$3(t,n,e):r.match?Oe$4(t,0,i):Yt$3(t,n,e)}function Oe$4(t,n,e){if(e.length===0)return new m$2(t.segments,{});{let r=wi$1(e),i={};if(Object.keys(r).some(o=>o!==f$3)&&t.children[f$3]&&t.numberOfChildren===1&&t.children[f$3].segments.length===0){let o=Oe$4(t.children[f$3],n,e);return new m$2(t.segments,o.children)}return Object.entries(r).forEach(([o,a])=>{typeof a=="string"&&(a=[a]),a!==null&&(i[o]=bn$2(t.children[o],n,a));}),Object.entries(t.children).forEach(([o,a])=>{r[o]===void 0&&(i[o]=a);}),new m$2(t.segments,i)}}function bi$1(t,n,e){let r=0,i=n,o={match:false,pathIndex:0,commandIndex:0};for(;i<t.segments.length;){if(r>=e.length)return o;let a=t.segments[i],c=e[r];if(je$1(c))break;let s=`${c}`,u=r<e.length-1?e[r+1]:null;if(i>0&&s===void 0)break;if(s&&u&&typeof u=="object"&&u.outlets===void 0){if(!nn$2(s,u,a))return o;r+=2;}else {if(!nn$2(s,{},a))return o;r++;}i++;}return {match:true,pathIndex:i,commandIndex:r}}function Yt$3(t,n,e){let r=t.segments.slice(0,n),i=0;for(;i<e.length;){let o=e[i];if(je$1(o)){let s=Ii$3(o.outlets);return new m$2(r,s)}if(i===0&&ht$2(e[0])){let s=t.segments[n];r.push(new J$1(s.path,rn$2(e[0]))),i++;continue}let a=je$1(o)?o.outlets[f$3]:`${o}`,c=i<e.length-1?e[i+1]:null;a&&c&&ht$2(c)?(r.push(new J$1(a,rn$2(c))),i+=2):(r.push(new J$1(a,{})),i++);}return new m$2(r,{})}function Ii$3(t){let n={};return Object.entries(t).forEach(([e,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(n[e]=Yt$3(new m$2([],{}),0,r));}),n}function rn$2(t){let n={};return Object.entries(t).forEach(([e,r])=>n[e]=`${r}`),n}function nn$2(t,n,e){return t==e.path&&B$2(n,e.parameters)}var Pe$3="imperative",C$2=(function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t})(C$2||{}),O$1=class O{id;url;constructor(n,e){this.id=n,this.url=e;}},ce$2=class ce extends O$1{type=C$2.NavigationStart;navigationTrigger;restoredState;constructor(n,e,r="imperative",i=null){super(n,e),this.navigationTrigger=r,this.restoredState=i;}toString(){return `NavigationStart(id: ${this.id}, url: '${this.url}')`}},k$2=class k extends O$1{urlAfterRedirects;type=C$2.NavigationEnd;constructor(n,e,r){super(n,e),this.urlAfterRedirects=r;}toString(){return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},I$3=(function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t[t.Aborted=4]="Aborted",t})(I$3||{}),ke$3=(function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t})(ke$3||{}),j$2=class j extends O$1{reason;code;type=C$2.NavigationCancel;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i;}toString(){return `NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function In$1(t){return t instanceof j$2&&(t.code===I$3.Redirect||t.code===I$3.SupersededByNewNavigation)}var W$2=class W extends O$1{reason;code;type=C$2.NavigationSkipped;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i;}},ue=class extends O$1{error;target;type=C$2.NavigationError;constructor(n,e,r,i){super(n,e),this.error=r,this.target=i;}toString(){return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},$e$1=class $e extends O$1{urlAfterRedirects;state;type=C$2.RoutesRecognized;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ft$2=class ft extends O$1{urlAfterRedirects;state;type=C$2.GuardsCheckStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},pt$2=class pt extends O$1{urlAfterRedirects;state;shouldActivate;type=C$2.GuardsCheckEnd;constructor(n,e,r,i,o){super(n,e),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o;}toString(){return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},gt$1=class gt extends O$1{urlAfterRedirects;state;type=C$2.ResolveStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},vt$1=class vt extends O$1{urlAfterRedirects;state;type=C$2.ResolveEnd;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i;}toString(){return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},mt$2=class mt{route;type=C$2.RouteConfigLoadStart;constructor(n){this.route=n;}toString(){return `RouteConfigLoadStart(path: ${this.route.path})`}},yt$1=class yt{route;type=C$2.RouteConfigLoadEnd;constructor(n){this.route=n;}toString(){return `RouteConfigLoadEnd(path: ${this.route.path})`}},Rt$1=class Rt{snapshot;type=C$2.ChildActivationStart;constructor(n){this.snapshot=n;}toString(){return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},St$2=class St{snapshot;type=C$2.ChildActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ct$1=class Ct{snapshot;type=C$2.ActivationStart;constructor(n){this.snapshot=n;}toString(){return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},wt$2=class wt{snapshot;type=C$2.ActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var ge$2=class ge{},ze$1=class ze{},ve$2=class ve{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e;}};function Ai$3(t){return !(t instanceof ge$2)&&!(t instanceof ve$2)&&!(t instanceof ze$1)}var bt$1=class bt{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new Ce$2(this.rootInjector);}},Ce$2=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e;}onChildOutletCreated(e,r){let i=this.getOrCreateContext(e);i.outlet=r,this.contexts.set(e,i);}onChildOutletDestroyed(e){let r=this.getContext(e);r&&(r.outlet=null,r.attachRef=null);}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e;}getOrCreateContext(e){let r=this.getContext(e);return r||(r=new bt$1(this.rootInjector),this.contexts.set(e,r)),r}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(r){return new(r||t)(ke$4(ce$3))};static \u0275prov=re$1({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),It$3=class It{_root;constructor(n){this._root=n;}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=Zt$2(n,this._root);return e?e.children.map(r=>r.value):[]}firstChild(n){let e=Zt$2(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=Jt$1(n,this._root);return e.length<2?[]:e[e.length-2].children.map(i=>i.value).filter(i=>i!==n)}pathFromRoot(n){return Jt$1(n,this._root).map(e=>e.value)}};function Zt$2(t,n){if(t===n.value)return n;for(let e of n.children){let r=Zt$2(t,e);if(r)return r}return null}function Jt$1(t,n){if(t===n.value)return [n];for(let e of n.children){let r=Jt$1(t,e);if(r.length)return r.unshift(n),r}return []}var U$2=class U{value;children;constructor(n,e){this.value=n,this.children=e;}toString(){return `TreeNode(${this.value})`}};function de(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var He$1=class He extends It$3{snapshot;constructor(n,e){super(n),this.snapshot=e,ur$2(this,n);}toString(){return this.snapshot.toString()}};function An$1(t,n){let e=Ei$3(t,n),r=new Rn$2([new J$1("",{})]),i=new Rn$2({}),o=new Rn$2({}),a=new Rn$2({}),c=new Rn$2(""),s=new Q$4(r,i,a,c,o,f$3,t,e.root);return s.snapshot=e.root,new He$1(new U$2(s,[]),e)}function Ei$3(t,n){let e={},r={},i={},a=new me$3([],e,i,"",r,f$3,t,null,{},n);return new Fe$2("",new U$2(a,[]))}var Q$4=class Q{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;_localInjector;constructor(n,e,r,i,o,a,c,s){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=a,this.component=c,this._futureSnapshot=s,this.title=this.dataSubject?.pipe(Me$3(u=>u[Ve$2]))??ag(void 0),this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o;}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(Me$3(n=>se(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(Me$3(n=>se(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}},Ti$3="always";function cr$2(t,n,e){let r,{routeConfig:i}=t;return n!==null&&(e==="always"||i?.path===""||!n.component&&!n.routeConfig?.loadComponent)?r={params:w$3(w$3({},n.params),t.params),data:w$3(w$3({},n.data),t.data),resolve:w$3(w$3(w$3(w$3({},t.data),n.data),i?.data),t._resolvedData)}:r={params:w$3({},t.params),data:w$3({},t.data),resolve:w$3(w$3({},t.data),t._resolvedData??{})},i&&Tn$1(i)&&(r.resolve[Ve$2]=i.title),r}var me$3=class me{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Ve$2]}constructor(n,e,r,i,o,a,c,s,u,h){this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=a,this.component=c,this.routeConfig=s,this._resolve=u,this._environmentInjector=h;}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=se(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=se(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(r=>r.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return `Route(url:'${n}', path:'${e}')`}},Fe$2=class Fe extends It$3{url;constructor(n,e){super(e),this.url=n,ur$2(this,e);}toString(){return En$1(this._root)}};function ur$2(t,n){n.value._routerState=t,n.children.forEach(e=>ur$2(t,e));}function En$1(t){let n=t.children.length>0?` { ${t.children.map(En$1).join(", ")} } `:"";return `${t.value}${n}`}function Bt$2(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,B$2(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),B$2(n.params,e.params)||t.paramsSubject.next(e.params),ei(n.url,e.url)||t.urlSubject.next(e.url),B$2(n.data,e.data)||t.dataSubject.next(e.data);}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data);}function Xt$2(t,n){let e=B$2(t.params,n.params)&&oi(t.url,n.url),r=!t.parent!=!n.parent;return e&&!r&&(!t.parent||Xt$2(t.parent,n.parent))}function Tn$1(t){return typeof t.title=="string"||t.title===null}var Nn$1=new S$2(""),lr$2=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=f$3;activateEvents=new qe$3;deactivateEvents=new qe$3;attachEvents=new qe$3;detachEvents=new qe$3;routerOutletData=NF();parentContexts=T$3(Ce$2);location=T$3(Li$4);changeDetector=T$3(kF);inputBinder=T$3(Nt$2,{optional:true});supportsBindingToComponentInputs=true;ngOnChanges(e){if(e.name){let{firstChange:r,previousValue:i}=e.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName();}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this);}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName();}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector));}get isActivated(){return !!this.activated}get component(){if(!this.activated)throw new b$4(4012,false);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new b$4(4012,false);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new b$4(4012,false);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,r){this.activated=e,this._activatedRoute=r,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance);}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e);}}activateWith(e,r){if(this.isActivated)throw new b$4(4013,false);this._activatedRoute=e;let i=this.location,a=e.snapshot.component,c=this.parentContexts.getOrCreateContext(this.name).children,s=new er$2(e,c,i.injector,this.routerOutletData);this.activated=i.createComponent(a,{index:i.length,injector:s,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance);}static \u0275fac=function(r){return new(r||t)};static \u0275dir=CE({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Pm]})}return t})(),er$2=class er{route;childContexts;parent;outletData;constructor(n,e,r,i){this.route=n,this.childContexts=e,this.parent=r,this.outletData=i;}get(n,e){return n===Q$4?this.route:n===Ce$2?this.childContexts:n===Nn$1?this.outletData:this.parent.get(n,e)}},Nt$2=new S$2("");var hr$2=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=IE({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&Xp(0,"router-outlet");},dependencies:[lr$2],encapsulation:2,changeDetection:1})}return t})();function dr$2(t){let n=t.children&&t.children.map(dr$2),e=n?x$2(w$3({},t),{children:n}):w$3({},t);return !e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==f$3&&(e.component=hr$2),e}function Ni$1(t,n,e){let r=new Set,i=qe$1(t,n._root,e?e._root:void 0,r);return {newlyCreatedRoutes:r,state:new He$1(i,n)}}function qe$1(t,n,e,r){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let i=e.value;i._futureSnapshot=n.value;let o=Mi$1(t,n,e,r);return new U$2(i,o)}else {if(t.shouldAttach(n.value)){let a=t.retrieve(n.value);if(a!==null){let c=a.route;return c.value._futureSnapshot=n.value,c.children=n.children.map(s=>qe$1(t,s,void 0,r)),c}}let i=Di$2(n.value);r.add(i);let o=n.children.map(a=>qe$1(t,a,void 0,r));return new U$2(i,o)}}function Mi$1(t,n,e,r){return n.children.map(i=>{for(let o of e.children)if(t.shouldReuseRoute(i.value,o.value.snapshot))return qe$1(t,i,o,r);return qe$1(t,i,void 0,r)})}function Di$2(t){return new Q$4(new Rn$2(t.url),new Rn$2(t.params),new Rn$2(t.queryParams),new Rn$2(t.fragment),new Rn$2(t.data),t.outlet,t.component,t)}var ye$2=class ye{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e;}},Mn$1="ngNavigationCancelingError";function At$3(t,n){let{redirectTo:e,navigationBehaviorOptions:r}=ee$1(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,i=Dn$1(false,I$3.Redirect);return i.url=e,i.navigationBehaviorOptions=r,i}function Dn$1(t,n){let e=new Error(`NavigationCancelingError: ${""}`);return e[Mn$1]=true,e.cancellationCode=n,e}function _i$1(t){return _n$1(t)&&ee$1(t.url)}function _n$1(t){return !!t&&t[Mn$1]}var tr$2=class tr{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,r,i,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o;}activate(n){let e=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,r,n),Bt$2(this.futureState.root),this.activateChildRoutes(e,r,n);}deactivateChildRoutes(n,e,r){let i=de(e);n.children.forEach(o=>{let a=o.value.outlet;this.deactivateRoutes(o,i[a],r),delete i[a];}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r);});}deactivateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(i===o)if(i.component){let a=r.getContext(i.outlet);a&&this.deactivateChildRoutes(n,e,a.children);}else this.deactivateChildRoutes(n,e,r);else o&&this.deactivateRouteAndItsChildren(e,r);}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e);}detachAndStoreRouteSubtree(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=de(n);for(let a of Object.values(o))this.deactivateRouteAndItsChildren(a,i);if(r&&r.outlet){let a=r.outlet.detach(),c=r.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:a,route:n,contexts:c});}}deactivateRouteAndOutlet(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=de(n);for(let a of Object.values(o))this.deactivateRouteAndItsChildren(a,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null),n.value._localInjector?.destroy();}activateChildRoutes(n,e,r){let i=de(e);n.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new wt$2(o.value.snapshot));}),n.children.length&&this.forwardEvent(new St$2(n.value.snapshot));}activateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(Bt$2(i),i===o)if(i.component){let a=r.getOrCreateContext(i.outlet);this.activateChildRoutes(n,e,a.children);}else this.activateChildRoutes(n,e,r);else if(i.component){let a=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let c=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),a.children.onOutletReAttached(c.contexts),a.attachRef=c.componentRef,a.route=c.route.value,a.outlet&&a.outlet.attach(c.componentRef,c.route.value),Bt$2(c.route.value),this.activateChildRoutes(n,null,a.children);}else a.attachRef=null,a.route=i,a.outlet&&a.outlet.activateWith(i,a.injector),this.activateChildRoutes(n,null,a.children);}else this.activateChildRoutes(n,null,r);}},Et$3=class Et{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1];}},pe$3=class pe{component;route;constructor(n,e){this.component=n,this.route=e;}};function Ui$1(t,n,e){let r=t._root,i=n?n._root:null;return Ue$2(r,i,e,[r.value])}function Oi$2(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return !n||n.length===0?null:{node:t,guards:n}}function we$2(t,n){let e=Symbol(),r=n.get(t,e);return r===e?typeof t=="function"&&!$g(t)?t:n.get(t):r}function Ue$2(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=de(n);return t.children.forEach(a=>{Pi$3(a,o[a.value.outlet],e,r.concat([a.value]),i),delete o[a.value.outlet];}),Object.entries(o).forEach(([a,c])=>Le$2(c,e.getContext(a),i)),i}function Pi$3(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,a=n?n.value:null,c=e?e.getContext(t.value.outlet):null;if(a&&o.routeConfig===a.routeConfig){let s=Li$2(a,o,o.routeConfig.runGuardsAndResolvers);s?i.canActivateChecks.push(new Et$3(r)):(o.data=a.data,o._resolvedData=a._resolvedData),o.component?Ue$2(t,n,c?c.children:null,r,i):Ue$2(t,n,e,r,i),s&&c&&c.outlet&&c.outlet.isActivated&&i.canDeactivateChecks.push(new pe$3(c.outlet.component,a));}else a&&Le$2(n,c,i),i.canActivateChecks.push(new Et$3(r)),o.component?Ue$2(t,null,c?c.children:null,r,i):Ue$2(t,null,e,r,i);return i}function Li$2(t,n,e){if(typeof e=="function")return No$3(n._environmentInjector,()=>e(t,n));switch(e){case "pathParamsChange":return !ae$1(t.url,n.url);case "pathParamsOrQueryParamsChange":return !ae$1(t.url,n.url)||!B$2(t.queryParams,n.queryParams);case "always":return  true;case "paramsOrQueryParamsChange":return !Xt$2(t,n)||!B$2(t.queryParams,n.queryParams);default:return !Xt$2(t,n)}}function Le$2(t,n,e){let r=de(t),i=t.value;Object.entries(r).forEach(([o,a])=>{i.component?n?Le$2(a,n.children.getContext(o),e):Le$2(a,null,e):Le$2(a,n,e);}),i.component?n&&n.outlet&&n.outlet.isActivated?e.canDeactivateChecks.push(new pe$3(n.outlet.component,i)):e.canDeactivateChecks.push(new pe$3(null,i)):e.canDeactivateChecks.push(new pe$3(null,i));}function Ge(t){return typeof t=="function"}function xi$2(t){return typeof t=="boolean"}function ji$1(t){return t&&Ge(t.canLoad)}function ki$2(t){return t&&Ge(t.canActivate)}function $i$2(t){return t&&Ge(t.canActivateChild)}function zi$2(t){return t&&Ge(t.canDeactivate)}function Hi$2(t){return t&&Ge(t.canMatch)}function Un$1(t){return t instanceof Ln$2||t?.name==="EmptyError"}var at$3=Symbol("INITIAL_VALUE");function Re$3(){return vl(t=>yg(t.map(n=>n.pipe(It$7(1),Bl(at$3)))).pipe(Me$3(n=>{for(let e of n)if(e!==true){if(e===at$3)return at$3;if(e===false||Fi$2(e))return e}return  true}),Xt$5(n=>n!==at$3),It$7(1)))}function Fi$2(t){return ee$1(t)||t instanceof ye$2}function On$1(t){return t.aborted?ag(void 0).pipe(It$7(1)):new N$5(n=>{let e=()=>{n.next(),n.complete();};return t.addEventListener("abort",e),()=>t.removeEventListener("abort",e)})}function Pn$1(t){return Rg(On$1(t))}function qi$2(t){return He$3(n=>{let{targetSnapshot:e,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=n;return o.length===0&&i.length===0?ag(x$2(w$3({},n),{guardsResult:true})):Bi$2(o,e,r).pipe(He$3(a=>a&&xi$2(a)?Vi$2(e,i,t):ag(a)),Me$3(a=>x$2(w$3({},n),{guardsResult:a})))})}function Bi$2(t,n,e){return Se$3(t).pipe(He$3(r=>Yi$2(r.component,r.route,e,n)),Mg(r=>r!==true,true))}function Vi$2(t,n,e){return Se$3(n).pipe(Tg(r=>Jt$3(Wi$2(r.route.parent,e),Gi$2(r.route,e),Ki$2(t,r.path),Qi$2(t,r.route))),Mg(r=>r!==true,true))}function Gi$2(t,n){return t!==null&&n&&n(new Ct$1(t)),ag(true)}function Wi$2(t,n){return t!==null&&n&&n(new Rt$1(t)),ag(true)}function Qi$2(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return ag(true);let r=e.map(i=>Ig(()=>{let o=n._environmentInjector,a=we$2(i,o),c=ki$2(a)?a.canActivate(n,t):No$3(o,()=>a(n,t));return le$1(c).pipe(Mg())}));return ag(r).pipe(Re$3())}function Ki$2(t,n){let e=n[n.length-1],i=n.slice(0,n.length-1).reverse().map(o=>Oi$2(o)).filter(o=>o!==null).map(o=>Ig(()=>{let a=o.guards.map(c=>{let s=o.node._environmentInjector,u=we$2(c,s),h=$i$2(u)?u.canActivateChild(e,t):No$3(s,()=>u(e,t));return le$1(h).pipe(Mg())});return ag(a).pipe(Re$3())}));return ag(i).pipe(Re$3())}function Yi$2(t,n,e,r){let i=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!i||i.length===0)return ag(true);let o=i.map(a=>{let c=n._environmentInjector,s=we$2(a,c),u=zi$2(s)?s.canDeactivate(t,n,e,r):No$3(c,()=>s(t,n,e,r));return le$1(u).pipe(Mg())});return ag(o).pipe(Re$3())}function Zi$2(t,n,e,r,i){let o=n.canLoad;if(o===void 0||o.length===0)return ag(true);let a=o.map(c=>{let s=we$2(c,t),u=ji$1(s)?s.canLoad(n,e):No$3(t,()=>s(n,e)),h=le$1(u);return i?h.pipe(Pn$1(i)):h});return ag(a).pipe(Re$3(),Ln$1(r))}function Ln$1(t){return Kh($l(n=>{if(typeof n!="boolean")throw At$3(t,n)}),Me$3(n=>n===true))}function Ji$2(t,n,e,r,i,o){let a=n.canMatch;if(!a||a.length===0)return ag(true);let c=a.map(s=>{let u=we$2(s,t),h=Hi$2(u)?u.canMatch(n,e,i):No$3(t,()=>u(n,e,i));return le$1(h).pipe(Pn$1(o))});return ag(c).pipe(Re$3(),Ln$1(r))}var G$2=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype);}},Be=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype);}};function Xi$2(t){throw new b$4(4e3,false)}function eo$1(t){throw Dn$1(false,I$3.GuardRejected)}var rr$2=class rr{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e;}lineralizeSegments(n,e){return C$5(this,null,function*(){let r=[],i=e.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[f$3])throw Xi$2(`${n.redirectTo}`);i=i.children[f$3];}})}applyRedirectCommands(n,e,r,i,o){return C$5(this,null,function*(){let a=yield to$2(e,i,o);if(a instanceof N$2)throw new Be(a);let c=this.applyRedirectCreateUrlTree(a,this.urlSerializer.parse(a),n,r);if(a[0]==="/")throw new Be(c);return c})}applyRedirectCreateUrlTree(n,e,r,i){let o=this.createSegmentGroup(n,e.root,r,i);return new N$2(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let r={};return Object.entries(n).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let c=o.substring(1);r[i]=e[c];}else r[i]=o;}),r}createSegmentGroup(n,e,r,i){let o=this.createSegments(n,e.segments,r,i),a={};return Object.entries(e.children).forEach(([c,s])=>{a[c]=this.createSegmentGroup(n,s,r,i);}),new m$2(o,a)}createSegments(n,e,r,i){return e.map(o=>o.path[0]===":"?this.findPosParam(n,o,i):this.findOrReturn(o,r))}findPosParam(n,e,r){let i=r[e.path.substring(1)];if(!i)throw new b$4(4001,false);return i}findOrReturn(n,e){let r=0;for(let i of e){if(i.path===n.path)return e.splice(r),i;r++;}return n}};function to$2(t,n,e){if(typeof t=="string")return Promise.resolve(t);let r=t;return lt$2(le$1(No$3(e,()=>r(n))))}function ro(t,n){return t.providers&&!t._injector&&(t._injector=Vp(t.providers,n,`Route: ${t.path}`)),t._injector??n}function H$1(t){return t.outlet||f$3}function no$2(t,n){let e=t.filter(r=>H$1(r)===n);return e.push(...t.filter(r=>H$1(r)!==n)),e}var nr$2={matched:false,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function xn$2(t){return {routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function io$2(t,n,e,r,i,o,a){let c=jn$1(t,n,e);if(!c.matched)return ag(c);let s=xn$2(o(c));return r=ro(n,r),Ji$2(r,n,e,i,s,a).pipe(Me$3(u=>u===true?c:w$3({},nr$2)))}function jn$1(t,n,e){if(n.path==="")return n.pathMatch==="full"&&(t.hasChildren()||e.length>0)?w$3({},nr$2):{matched:true,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let i=(n.matcher||cn$2)(e,t,n);if(!i)return w$3({},nr$2);let o={};Object.entries(i.posParams??{}).forEach(([c,s])=>{o[c]=s.path;});let a=i.consumed.length>0?w$3(w$3({},o),i.consumed[i.consumed.length-1].parameters):o;return {matched:true,consumedSegments:i.consumed,remainingSegments:e.slice(i.consumed.length),parameters:a,positionalParamSegments:i.posParams??{}}}function on$2(t,n,e,r,i){return e.length>0&&so$1(t,e,r,i)?{segmentGroup:new m$2(n,ao(r,new m$2(e,t.children))),slicedSegments:[]}:e.length===0&&co(t,e,r)?{segmentGroup:new m$2(t.segments,oo(t,e,r,t.children)),slicedSegments:e}:{segmentGroup:new m$2(t.segments,t.children),slicedSegments:e}}function oo(t,n,e,r){let i={};for(let o of e)if(Mt$1(t,n,o)&&!r[H$1(o)]){let a=new m$2([],{});i[H$1(o)]=a;}return w$3(w$3({},r),i)}function ao(t,n){let e={};e[f$3]=n;for(let r of t)if(r.path===""&&H$1(r)!==f$3){let i=new m$2([],{});e[H$1(r)]=i;}return e}function so$1(t,n,e,r){return e.some(i=>!Mt$1(t,n,i)||!(H$1(i)!==f$3)?false:!(r!==void 0&&H$1(i)===r))}function co(t,n,e){return e.some(r=>Mt$1(t,n,r))}function Mt$1(t,n,e){return (t.hasChildren()||n.length>0)&&e.pathMatch==="full"?false:e.path===""}function uo(t,n,e){return n.length===0&&!t.children[e]}var ir$2=class ir{};function lo$1(t,n,e,r,i,o,a,c){return C$5(this,null,function*(){return new or$2(t,n,e,r,i,a,o,c).recognize()})}var ho=31,or$2=class or{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=true;constructor(n,e,r,i,o,a,c,s){this.injector=n,this.configLoader=e,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=a,this.urlSerializer=c,this.abortSignal=s,this.applyRedirects=new rr$2(this.urlSerializer,this.urlTree);}noMatchError(n){return new b$4(4002,`'${n.segmentGroup}'`)}recognize(){return C$5(this,null,function*(){let n=on$2(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:r}=yield this.match(n),i=new U$2(r,e),o=new Fe$2("",i),a=Rn$1(r,[],this.urlTree.queryParams,this.urlTree.fragment);return a.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(a),{state:o,tree:a}})}match(n){return C$5(this,null,function*(){let e=new me$3([],Object.freeze({}),Object.freeze(w$3({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),f$3,this.rootComponentType,null,{},this.injector);try{return {children:yield this.processSegmentGroup(this.injector,this.config,n,f$3,e),rootSnapshot:e}}catch(r){if(r instanceof Be)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof G$2?this.noMatchError(r):r}})}processSegmentGroup(n,e,r,i,o){return C$5(this,null,function*(){if(r.segments.length===0&&r.hasChildren())return this.processChildren(n,e,r,o);let a=yield this.processSegment(n,e,r,r.segments,i,true,o);return a instanceof U$2?[a]:[]})}processChildren(n,e,r,i){return C$5(this,null,function*(){let o=[];for(let s of Object.keys(r.children))s==="primary"?o.unshift(s):o.push(s);let a=[];for(let s of o){let u=r.children[s],h=no$2(e,s),v=yield this.processSegmentGroup(n,h,u,s,i);a.push(...v);}let c=kn$1(a);return fo$1(c),c})}processSegment(n,e,r,i,o,a,c){return C$5(this,null,function*(){for(let s of e)try{return yield this.processSegmentAgainstRoute(s._injector??n,e,s,r,i,o,a,c)}catch(u){if(u instanceof G$2||Un$1(u))continue;throw u}if(uo(r,i,o))return new ir$2;throw new G$2(r)})}processSegmentAgainstRoute(n,e,r,i,o,a,c,s){return C$5(this,null,function*(){if(H$1(r)!==a&&(a===f$3||!Mt$1(i,o,r)))throw new G$2(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,i,r,o,a,s);if(this.allowRedirects&&c)return this.expandSegmentAgainstRouteUsingRedirect(n,i,e,r,o,a,s);throw new G$2(i)})}expandSegmentAgainstRouteUsingRedirect(n,e,r,i,o,a,c){return C$5(this,null,function*(){let{matched:s,parameters:u,consumedSegments:h,positionalParamSegments:v,remainingSegments:g}=jn$1(e,i,o);if(!s)throw new G$2(e);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>ho&&(this.allowRedirects=false));let M=this.createSnapshot(n,i,o,u,c);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let $=yield this.applyRedirects.applyRedirectCommands(h,i.redirectTo,v,xn$2(M),n),re=yield this.applyRedirects.lineralizeSegments(i,$);return this.processSegment(n,r,e,re.concat(g),a,false,c)})}createSnapshot(n,e,r,i,o){let a=new me$3(r,i,Object.freeze(w$3({},this.urlTree.queryParams)),this.urlTree.fragment,go$1(e),H$1(e),e.component??e._loadedComponent??null,e,vo$1(e),n),c=cr$2(a,o,this.paramsInheritanceStrategy);return a.params=Object.freeze(c.params),a.data=Object.freeze(c.data),a}matchSegmentAgainstRoute(n,e,r,i,o,a){return C$5(this,null,function*(){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let c=ne=>this.createSnapshot(n,r,ne.consumedSegments,ne.parameters,a),s=yield lt$2(io$2(e,r,i,n,this.urlSerializer,c,this.abortSignal));if(r.path==="**"&&(e.children={}),!s?.matched)throw new G$2(e);n=r._injector??n;let{routes:u}=yield this.getChildConfig(n,r,i),h=r._loadedInjector??n,{parameters:v,consumedSegments:g,remainingSegments:M}=s,$=this.createSnapshot(n,r,g,v,a),{segmentGroup:re,slicedSegments:Ie}=on$2(e,g,M,u,o);if(Ie.length===0&&re.hasChildren()){let ne=yield this.processChildren(h,u,re,$);return new U$2($,ne)}if(u.length===0&&Ie.length===0)return new U$2($,[]);let Ot=H$1(r)===o,Ke=yield this.processSegment(h,u,re,Ie,Ot?f$3:o,true,$);return new U$2($,Ke instanceof U$2?[Ke]:[])})}getChildConfig(n,e,r){return C$5(this,null,function*(){if(e.children)return {routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(yield lt$2(Zi$2(n,e,r,this.urlSerializer,this.abortSignal))){let o=yield this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw eo$1()}return {routes:[],injector:n}})}};function fo$1(t){t.sort((n,e)=>n.value.outlet===f$3?-1:e.value.outlet===f$3?1:n.value.outlet.localeCompare(e.value.outlet));}function po(t){let n=t.value.routeConfig;return n&&n.path===""}function kn$1(t){let n=[],e=new Set;for(let r of t){if(!po(r)){n.push(r);continue}let i=n.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),e.add(i)):n.push(r);}for(let r of e){let i=kn$1(r.children);n.push(new U$2(r.value,i));}return n.filter(r=>!e.has(r))}function go$1(t){return t.data||{}}function vo$1(t){return t.resolve||{}}function mo(t,n,e,r,i,o,a){return He$3(c=>C$5(null,null,function*(){let{state:s,tree:u}=yield lo$1(t,n,e,r,c.extractedUrl,i,o,a);return x$2(w$3({},c),{targetSnapshot:s,urlAfterRedirects:u})}))}function yo$1(t){return He$3(n=>{let{targetSnapshot:e,guards:{canActivateChecks:r}}=n;if(!r.length)return ag(n);let i=new Set(r.map(c=>c.route)),o=new Set;for(let c of i)if(!o.has(c))for(let s of $n$1(c))o.add(s);let a=0;return Se$3(o).pipe(Tg(c=>i.has(c)?Ro$1(c,e,t):(c.data=cr$2(c,c.parent,t).resolve,ag(void 0))),$l(()=>a++),Ng(1),He$3(c=>a===o.size?ag(n):vt$5))})}function $n$1(t){let n=t.children.map(e=>$n$1(e)).flat();return [t,...n]}function Ro$1(t,n,e){let r=t.routeConfig,i=t._resolve;return r?.title!==void 0&&!Tn$1(r)&&(i[Ve$2]=r.title),Ig(()=>(t.data=cr$2(t,t.parent,e).resolve,So$1(i,t,n).pipe(Me$3(o=>(t._resolvedData=o,t.data=w$3(w$3({},t.data),o),null)))))}function So$1(t,n,e){let r=Gt$3(t);if(r.length===0)return ag({});let i={};return Se$3(r).pipe(He$3(o=>Co$1(t[o],n,e).pipe(Mg(),$l(a=>{if(a instanceof ye$2)throw At$3(new X$2,a);i[o]=a;}))),Ng(1),Me$3(()=>i),Yi$4(o=>Un$1(o)?vt$5:cg(o)))}function Co$1(t,n,e){let r=n._environmentInjector,i=we$2(t,r),o=i.resolve?i.resolve(n,e):No$3(r,()=>i(n,e));return le$1(o)}function an$2(t){return vl(n=>{let e=t(n);return e?Se$3(e).pipe(Me$3(()=>n)):ag(n)})}var fr$2=(()=>{class t{buildTitle(e){let r,i=e.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===f$3);return r}getResolvedTitleForRoute(e){return e.data[Ve$2]}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(zn$1)})}return t})(),zn$1=(()=>{class t extends fr$2{title;constructor(e){super(),this.title=e;}updateTitle(e){let r=this.buildTitle(e);r!==void 0&&this.title.setTitle(r);}static \u0275fac=function(r){return new(r||t)(ke$4(ju))};static \u0275prov=re$1({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),be$2=new S$2("",{factory:()=>({})}),We=new S$2(""),pr$1=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=T$3(rw);loadComponent(e,r){return C$5(this,null,function*(){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=C$5(this,null,function*(){try{let o=yield ln$2(No$3(e,()=>r.loadComponent())),a=yield Fn$1(_F(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=a,a}finally{this.componentLoaders.delete(r);}});return this.componentLoaders.set(r,i),i})}loadChildren(e,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=C$5(this,null,function*(){try{let o=yield Hn$1(r,this.compiler,e,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r);}});return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function Hn$1(t,n,e,r){return C$5(this,null,function*(){let i=yield ln$2(No$3(e,()=>t.loadChildren())),o=yield Fn$1(_F(i)),a;o instanceof jp||Array.isArray(o)?a=o:a=yield n.compileModuleAsync(o),r&&r(t);let c,s,h;return Array.isArray(a)?(s=a,true):(c=a.create(e).injector,h=a,s=c.get(We,[],{optional:true,self:true}).flat()),{routes:s.map(dr$2),injector:c,factory:h}})}function Fn$1(t){return C$5(this,null,function*(){return t})}var Dt$2=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(wo$1)})}return t})(),wo$1=(()=>{class t{shouldProcessUrl(e){return  true}extract(e){return e}merge(e,r){return e}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})(),gr$2=new S$2(""),vr$1=new S$2("");function qn$1(t,n,e){let r=t.get(vr$1),i=t.get(ir$4);if(!i.startViewTransition||r.skipNextTransition)return r.skipNextTransition=false,new Promise(u=>setTimeout(u));let o,a=new Promise(u=>{o=u;}),c=i.startViewTransition(()=>(o(),bo$1(t)));c.updateCallbackDone.catch(u=>{}),c.ready.catch(u=>{}),c.finished.catch(u=>{});let{onViewTransitionCreated:s}=r;return s&&No$3(t,()=>s({transition:c,from:n,to:e})),a}function bo$1(t){return new Promise(n=>{Wf({read:()=>setTimeout(n)},{injector:t});})}var Bn$1=new S$2(""),Io$1=()=>{},Vn$1=new S$2(""),Gn$1=(()=>{class t{currentNavigation=Fe$3(null,{equal:()=>false});currentTransition=null;lastSuccessfulNavigation=Fe$3(null);events=new ne$3;transitionAbortWithErrorSubject=new ne$3;configLoader=T$3(pr$1);environmentInjector=T$3(ce$3);destroyRef=T$3(Le$4);urlSerializer=T$3(Se$2);rootContexts=T$3(Ce$2);location=T$3(sr$3);inputBindingEnabled=T$3(Nt$2,{optional:true})!==null;titleStrategy=T$3(fr$2);options=T$3(be$2,{optional:true})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||Ti$3;urlHandlingStrategy=T$3(Dt$2);createViewTransition=T$3(gr$2,{optional:true});navigationErrorHandler=T$3(Vn$1,{optional:true});activatedRouteInjectorFeature=T$3(Bn$1,{optional:true});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>ag(void 0);rootComponentType=null;destroyed=false;constructor(){let e=i=>this.events.next(new mt$2(i)),r=i=>this.events.next(new yt$1(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=true;});}complete(){this.transitions?.complete();}handleNavigationRequest(e){let r=++this.navigationId;ae$2(()=>{this.transitions?.next(x$2(w$3({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}));});}setupNavigations(e){return this.transitions=new Rn$2(null),this.transitions.pipe(Xt$5(r=>r!==null),vl(r=>{let i=true,o=false,a=new AbortController,c=()=>!o&&this.currentTransition?.id===r.id;return ag(r).pipe(vl(s=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",I$3.SupersededByNewNavigation),vt$5;this.currentTransition=r;let u=this.lastSuccessfulNavigation();this.currentNavigation.set({id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:u?x$2(w$3({},u),{previousNavigation:null}):null,abort:()=>a.abort(),routesRecognizeHandler:s.routesRecognizeHandler,beforeActivateHandler:s.beforeActivateHandler});let h=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),v=s.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!h&&v!=="reload")return this.events.next(new W$2(s.id,this.urlSerializer.serialize(s.rawUrl),"",ke$3.IgnoredSameUrlNavigation)),s.resolve(false),vt$5;if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return ag(s).pipe(vl(g=>(this.events.next(new ce$2(g.id,this.urlSerializer.serialize(g.extractedUrl),g.source,g.restoredState)),g.id!==this.navigationId?vt$5:Promise.resolve(g))),mo(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,a.signal),$l(g=>{r.targetSnapshot=g.targetSnapshot,r.urlAfterRedirects=g.urlAfterRedirects,this.currentNavigation.update(M=>(M.finalUrl=g.urlAfterRedirects,M)),this.events.next(new ze$1);}),vl(g=>Se$3(r.routesRecognizeHandler.deferredHandle??ag(void 0)).pipe(Me$3(()=>g))),$l(()=>{let g=new $e$1(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(g);}));if(h&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:g,extractedUrl:M,source:$,restoredState:re,extras:Ie}=s,Ot=new ce$2(g,this.urlSerializer.serialize(M),$,re);this.events.next(Ot);let Ke=An$1(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=x$2(w$3({},s),{targetSnapshot:Ke,urlAfterRedirects:M,extras:x$2(w$3({},Ie),{skipLocationChange:false,replaceUrl:false})}),this.currentNavigation.update(ne=>(ne.finalUrl=M,ne)),ag(r)}else return this.events.next(new W$2(s.id,this.urlSerializer.serialize(s.extractedUrl),"",ke$3.IgnoredByUrlHandlingStrategy)),s.resolve(false),vt$5}),Me$3(s=>{let u=new ft$2(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);return this.events.next(u),this.currentTransition=r=x$2(w$3({},s),{guards:Ui$1(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),r}),qi$2(s=>this.events.next(s)),vl(s=>{if(r.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw At$3(this.urlSerializer,s.guardsResult);let u=new pt$2(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);if(this.events.next(u),!c())return vt$5;if(!s.guardsResult)return this.cancelNavigationTransition(s,"",I$3.GuardRejected),vt$5;if(s.guards.canActivateChecks.length===0)return ag(s);let h=new gt$1(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);if(this.events.next(h),!c())return vt$5;let v=false;return ag(s).pipe(yo$1(this.paramsInheritanceStrategy),$l({next:()=>{v=true;let g=new vt$1(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(g);},complete:()=>{v||this.cancelNavigationTransition(s,"",I$3.NoDataFromResolver);}}))}),an$2(s=>{let u=v=>{let g=[];if(v.routeConfig?._loadedComponent)v.component=v.routeConfig?._loadedComponent;else if(v.routeConfig?.loadComponent){let M=v._environmentInjector;g.push(this.configLoader.loadComponent(M,v.routeConfig).then($=>{v.component=$;}));}for(let M of v.children)g.push(...u(M));return g},h=u(s.targetSnapshot.root);return h.length===0?ag(s):Se$3(Promise.all(h).then(()=>s))}),vl(s=>{let{newlyCreatedRoutes:u,state:h}=Ni$1(e.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=r=s=x$2(w$3({},s),{targetRouterState:h,newlyCreatedRoutes:u}),this.currentNavigation.update(v=>(v.targetRouterState=h,v)),ag(s)}),this.activatedRouteInjectorFeature?.operator()??(s=>s),an$2(()=>this.afterPreactivation()),vl(()=>{let{currentSnapshot:s,targetSnapshot:u}=r,h=this.createViewTransition?.(this.environmentInjector,s.root,u.root);return h?Se$3(h).pipe(Me$3(()=>r)):ag(r)}),It$7(1),vl(s=>{i=false,this.events.next(new ge$2);let u=r.beforeActivateHandler.deferredHandle;return u?Se$3(u.then(()=>s)):ag(s)}),$l(s=>{new tr$2(e.routeReuseStrategy,r.targetRouterState,r.currentRouterState,u=>this.events.next(u),this.inputBindingEnabled).activate(this.rootContexts),s.newlyCreatedRoutes?.clear(),c()&&(o=true,this.currentNavigation.update(u=>(u.abort=Io$1,u)),this.lastSuccessfulNavigation.set(ae$2(this.currentNavigation)),this.events.next(new k$2(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(true));}),Rg(On$1(a.signal).pipe(Xt$5(()=>!o&&i),$l(()=>{this.cancelNavigationTransition(r,a.signal.reason+"",I$3.Aborted);}))),$l({complete:()=>{o=true;}}),Rg(this.transitionAbortWithErrorSubject.pipe($l(s=>{throw s}))),Vl$1(()=>{a.abort(),o||this.cancelNavigationTransition(r,"",I$3.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null);}),Yi$4(s=>{if(o=true,sn$2(r),this.destroyed)return r.resolve(false),vt$5;if(_n$1(s))this.events.next(new j$2(r.id,this.urlSerializer.serialize(r.extractedUrl),s.message,s.cancellationCode)),_i$1(s)?this.events.next(new ve$2(s.url,s.navigationBehaviorOptions)):r.resolve(false);else {let u=new ue(r.id,this.urlSerializer.serialize(r.extractedUrl),s,r.targetSnapshot??void 0);try{let h=No$3(this.environmentInjector,()=>this.navigationErrorHandler?.(u));if(h instanceof ye$2){let{message:v,cancellationCode:g}=At$3(this.urlSerializer,h);this.events.next(new j$2(r.id,this.urlSerializer.serialize(r.extractedUrl),v,g)),this.events.next(new ve$2(h.redirectTo,h.navigationBehaviorOptions));}else throw this.events.next(u),s}catch(h){this.options.resolveNavigationPromiseOnError?r.resolve(false):r.reject(h);}}return vt$5}))}))}cancelNavigationTransition(e,r,i){sn$2(e);let o=new j$2(e.id,this.urlSerializer.serialize(e.extractedUrl),r,i);this.events.next(o),e.resolve(false);}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true))),r=ae$2(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return e.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function Ao$1(t){return t!==Pe$3}function sn$2(t){if(t.newlyCreatedRoutes)for(let n of t.newlyCreatedRoutes)n._localInjector?.destroy();}var Wn$1=new S$2("");var Qn$1=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(Eo$1)})}return t})(),Tt$3=class Tt{shouldDetach(n){return  false}store(n,e){}shouldAttach(n){return  false}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return  true}},Eo$1=(()=>{class t extends Tt$3{static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})(),_t$1=(()=>{class t{urlSerializer=T$3(Se$2);options=T$3(be$2,{optional:true})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=T$3(sr$3);urlHandlingStrategy=T$3(Dt$2);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new N$2;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:r,targetBrowserUrl:i}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,r):r,a=i??o;return a instanceof N$2?this.urlSerializer.serialize(a):a}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:r,initialUrl:i}){r&&e?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=e):this.rawUrlTree=i;}routerState=An$1(null,T$3(ce$3));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento();}createStateMemento(){return {rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:()=>T$3(To$1)})}return t})(),To$1=(()=>{class t extends _t$1{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{e(r.url,r.state,"popstate",{replaceUrl:true});});})}handleRouterEvent(e,r){e instanceof ce$2?this.updateStateMemento():e instanceof W$2?this.commitTransition(r):e instanceof $e$1?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof ge$2?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof j$2&&!In$1(e)?this.restoreHistory(r):e instanceof ue?this.restoreHistory(r,true):e instanceof k$2&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId);}setBrowserUrl(e,r){let{extras:i,id:o}=r,{replaceUrl:a,state:c}=i;if(this.location.isCurrentPathEqualTo(e)||a){let s=this.browserPageId,u=w$3(w$3({},c),this.generateNgRouterState(o,s,r));this.location.replaceState(e,"",u);}else {let s=w$3(w$3({},c),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(e,"",s);}}restoreHistory(e,r=false){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree());}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree());}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree);}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId));}generateNgRouterState(e,r,i){return this.canceledNavigationResolution==="computed"?w$3({navigationId:e,\u0275routerPageId:r},this.routerUrlState(i)):w$3({navigationId:e},this.routerUrlState(i))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function mr$2(t,n){t.events.pipe(Xt$5(e=>e instanceof k$2||e instanceof j$2||e instanceof ue||e instanceof W$2),Me$3(e=>e instanceof k$2||e instanceof W$2?0:(e instanceof j$2?e.code===I$3.Redirect||e.code===I$3.SupersededByNewNavigation:false)?2:1),Xt$5(e=>e!==2),It$7(1)).subscribe(()=>{n();});}var te$1=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=false;nonRouterCurrentEntryChangeSubscription;console=T$3(HE);stateManager=T$3(_t$1);options=T$3(be$2,{optional:true})||{};pendingTasks=T$3(Lt$4);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=T$3(Gn$1);urlSerializer=T$3(Se$2);location=T$3(sr$3);urlHandlingStrategy=T$3(Dt$2);injector=T$3(ce$3);_events=new ne$3;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=false;routeReuseStrategy=T$3(Qn$1);injectorCleanup=T$3(Wn$1,{optional:true});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=T$3(We,{optional:true})?.flat()??[];componentInputBindingEnabled=!!T$3(Nt$2,{optional:true});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents();}eventsSubscription=new G$4;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=ae$2(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof j$2&&r.code!==I$3.Redirect&&r.code!==I$3.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof k$2)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof ve$2){let a=r.navigationBehaviorOptions,c=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),s=w$3({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||Ao$1(i.source)},a);this.scheduleNavigation(c,Pe$3,null,s,{resolve:i.resolve,reject:i.reject,promise:i.promise});}}Ai$3(r)&&this._events.next(r);}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i);}});this.eventsSubscription.add(e);}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e;}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(true),Pe$3,this.stateManager.restoredState(),{replaceUrl:true});}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,r,i,o)=>{this.navigateToSyncWithBrowser(e,i,r,o);});}navigateToSyncWithBrowser(e,r,i,o){let a=i?.navigationId?i:null,c=i?.\u0275routerUrl??e;if(i?.\u0275routerUrl&&(o=x$2(w$3({},o),{browserUrl:e})),i){let u=w$3({},i);delete u.navigationId,delete u.\u0275routerPageId,delete u.\u0275routerUrl,Object.keys(u).length!==0&&(o.state=u);}let s=this.parseUrl(c);this.scheduleNavigation(s,r,a,o).catch(u=>{this.disposed||this.injector.get(Ft$4)(u);});}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return ae$2(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(dr$2),this.navigated=false;}ngOnDestroy(){this.dispose();}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=true,this.eventsSubscription.unsubscribe();}createUrlTree(e,r={}){let{relativeTo:i,queryParams:o,fragment:a,queryParamsHandling:c,preserveFragment:s}=r,u=s?this.currentUrlTree.fragment:a,h=null;switch(c??this.options.defaultQueryParamsHandling){case "merge":h=w$3(w$3({},this.currentUrlTree.queryParams),o);break;case "preserve":h=this.currentUrlTree.queryParams;break;default:h=o||null;}h!==null&&(h=this.removeEmptyProps(h));let v;try{let g=i?i.snapshot:this.routerState.snapshot.root;v=Sn$2(g);}catch(g){(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),v=this.currentUrlTree.root;}return Cn$2(v,e,h,u??null,this.urlSerializer)}navigateByUrl(e,r={skipLocationChange:false}){let i=ee$1(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,Pe$3,null,r)}navigate(e,r={skipLocationChange:false}){return No$1(e),this.navigateByUrl(this.createUrlTree(e,r),r)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch(r){return this.console.warn(zn$2(4018,false)),this.urlSerializer.parse("/")}}isActive(e,r){let i;if(r===true?i=w$3({},ar$2):r===false?i=w$3({},xe$2):i=w$3(w$3({},xe$2),r),ee$1(e))return Wt$2(this.currentUrlTree,e,i);let o=this.parseUrl(e);return Wt$2(this.currentUrlTree,o,i)}removeEmptyProps(e){return Object.entries(e).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(e,r,i,o,a){if(this.disposed)return Promise.resolve(false);let c,s,u;a?(c=a.resolve,s=a.reject,u=a.promise):u=new Promise((v,g)=>{c=v,s=g;});let h=this.pendingTasks.add();return mr$2(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(h));}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:c,reject:s,promise:u,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),u.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();function No$1(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new b$4(4008,false)}var Do$1=(()=>{class t{router=T$3(te$1);stateManager=T$3(_t$1);fragment=Fe$3("");queryParams=Fe$3({});path=Fe$3("");serializer=T$3(Se$2);constructor(){this.updateState(),this.router.events?.subscribe(e=>{e instanceof k$2&&this.updateState();});}updateState(){let{fragment:e,root:r,queryParams:i}=this.stateManager.getCurrentUrlTree();this.fragment.set(e),this.queryParams.set(i),this.path.set(this.serializer.serialize(new N$2(r)));}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})(),Ut$3=(()=>{class t{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=T$3(new Fh("href"),{optional:true});reactiveHref=Yc(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return ae$2(this.reactiveHref)}set href(e){this.reactiveHref.set(e);}set target(e){this._target.set(e);}get target(){return ae$2(this._target)}_target=Fe$3(void 0);set queryParams(e){this._queryParams.set(e);}get queryParams(){return ae$2(this._queryParams)}_queryParams=Fe$3(void 0,{equal:()=>false});set fragment(e){this._fragment.set(e);}get fragment(){return ae$2(this._fragment)}_fragment=Fe$3(void 0);set queryParamsHandling(e){this._queryParamsHandling.set(e);}get queryParamsHandling(){return ae$2(this._queryParamsHandling)}_queryParamsHandling=Fe$3(void 0);set state(e){this._state.set(e);}get state(){return ae$2(this._state)}_state=Fe$3(void 0,{equal:()=>false});set info(e){this._info.set(e);}get info(){return ae$2(this._info)}_info=Fe$3(void 0,{equal:()=>false});set relativeTo(e){this._relativeTo.set(e);}get relativeTo(){return ae$2(this._relativeTo)}_relativeTo=Fe$3(void 0);set preserveFragment(e){this._preserveFragment.set(e);}get preserveFragment(){return ae$2(this._preserveFragment)}_preserveFragment=Fe$3(false);set skipLocationChange(e){this._skipLocationChange.set(e);}get skipLocationChange(){return ae$2(this._skipLocationChange)}_skipLocationChange=Fe$3(false);set replaceUrl(e){this._replaceUrl.set(e);}get replaceUrl(){return ae$2(this._replaceUrl)}_replaceUrl=Fe$3(false);browserUrl=NF(void 0);isAnchorElement;onChanges=new ne$3;applicationErrorHandler=T$3(Ft$4);options=T$3(be$2,{optional:true});reactiveRouterState=T$3(Do$1);constructor(e,r,i,o,a,c){this.router=e,this.route=r,this.tabIndexAttribute=i,this.renderer=o,this.el=a,this.locationStrategy=c;let s=a.nativeElement.tagName?.toLowerCase();this.isAnchorElement=s==="a"||s==="area"||!!(typeof customElements=="object"&&customElements.get(s)?.observedAttributes?.includes?.("href"));}setTabIndexIfNotOnNativeEl(e){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",e);}ngOnChanges(e){this.onChanges.next(this);}routerLinkInput=Fe$3(null);set routerLink(e){e==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(ee$1(e)?this.routerLinkInput.set(e):this.routerLinkInput.set(Array.isArray(e)?e:[e]),this.setTabIndexIfNotOnNativeEl("0"));}onClick(e,r,i,o,a){let c=this._urlTree();if(c===null||this.isAnchorElement&&(e!==0||r||i||o||a||typeof this.target=="string"&&this.target!="_self"))return  true;let s=this.browserUrl(),u=w$3({skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info},s!==void 0&&{browserUrl:s});return this.router.navigateByUrl(c,u)?.catch(h=>{this.applicationErrorHandler(h);}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(e,r){let i=this.renderer,o=this.el.nativeElement;r!==null?i.setAttribute(o,e,r):i.removeAttribute(o,e);}_urlTree=dt$6(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let e=i=>i==="preserve"||i==="merge";(e(this._queryParamsHandling())||e(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let r=this.routerLinkInput();return r===null||!this.router.createUrlTree?null:ee$1(r)?r:this.router.createUrlTree(r,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(e,r)=>this.computeHref(e)===this.computeHref(r)});get urlTree(){return ae$2(this._urlTree)}computeHref(e){return e!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e))??"":null}static \u0275fac=function(r){return new(r||t)(Ar$2(te$1),Ar$2(Q$4),sf("tabindex"),Ar$2(CI),Ar$2(Tr$2),Ar$2(ot$5))};static \u0275dir=CE({type:t,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(r,i){r&1&&ih("click",function(a){return i.onClick(a.button,a.ctrlKey,a.shiftKey,a.altKey,a.metaKey)}),r&2&&Kp("href",i.reactiveHref(),Gy)("target",i._target());},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",PF],skipLocationChange:[2,"skipLocationChange","skipLocationChange",PF],replaceUrl:[2,"replaceUrl","replaceUrl",PF],browserUrl:[1,"browserUrl"],routerLink:"routerLink"},features:[Pm]})}return t})(),_o$1=(()=>{class t{router;element;renderer;cdr;links;classes=[];routerEventsSubscription;linkInputChangesSubscription;_isActive=false;get isActive(){return this._isActive}routerLinkActiveOptions={exact:false};ariaCurrentWhenActive;isActiveChange=new qe$3;link=T$3(Ut$3,{optional:true});constructor(e,r,i,o){this.router=e,this.element=r,this.renderer=i,this.cdr=o,this.routerEventsSubscription=e.events.subscribe(a=>{a instanceof k$2&&this.update();});}ngAfterContentInit(){ag(this.links.changes,ag(null)).pipe(Fn$2()).subscribe(e=>{this.update(),this.subscribeToEachLinkOnChanges();});}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let e=[...this.links.toArray(),this.link].filter(r=>!!r).map(r=>r.onChanges);this.linkInputChangesSubscription=Se$3(e).pipe(Fn$2()).subscribe(r=>{this._isActive!==this.isLinkActive(this.router)(r)&&this.update();});}set routerLinkActive(e){let r=Array.isArray(e)?e:e.split(" ");this.classes=r.filter(i=>!!i);}ngOnChanges(e){this.update();}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe();}update(){!this.links||!this.router.navigated||queueMicrotask(()=>{let e=this.hasActiveLinks();this.classes.forEach(r=>{e?this.renderer.addClass(this.element.nativeElement,r):this.renderer.removeClass(this.element.nativeElement,r);}),e&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,"aria-current",this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,"aria-current"),this._isActive!==e&&(this._isActive=e,this.cdr.markForCheck(),this.isActiveChange.emit(e));});}isLinkActive(e){let r=Uo$1(this.routerLinkActiveOptions)?this.routerLinkActiveOptions:this.routerLinkActiveOptions.exact??false?w$3({},ar$2):w$3({},xe$2);return i=>{let o=i.urlTree;return o?ae$2(sr$2(o,e,r)):false}}hasActiveLinks(){let e=this.isLinkActive(this.router);return this.link&&e(this.link)||this.links.some(e)}static \u0275fac=function(r){return new(r||t)(Ar$2(te$1),Ar$2(Tr$2),Ar$2(CI),Ar$2(kF))};static \u0275dir=CE({type:t,selectors:[["","routerLinkActive",""]],contentQueries:function(r,i,o){if(r&1&&ch(o,Ut$3,5),r&2){let a;fD(a=pD())&&(i.links=a);}},inputs:{routerLinkActiveOptions:"routerLinkActiveOptions",ariaCurrentWhenActive:"ariaCurrentWhenActive",routerLinkActive:"routerLinkActive"},outputs:{isActiveChange:"isActiveChange"},exportAs:["routerLinkActive"],features:[Pm]})}return t})();function Uo$1(t){let n=t;return !!(n.paths||n.matrixParams||n.queryParams||n.fragment)}var Qe$1=class Qe{},Oo$1=(()=>{class t{preload(e,r){return r().pipe(Yi$4(()=>ag(null)))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=wr$2({token:t,factory:t.\u0275fac})}return t})();var Kn$1=(()=>{class t{router;injector;preloadingStrategy;loader;subscription;constructor(e,r,i,o){this.router=e,this.injector=r,this.preloadingStrategy=i,this.loader=o;}setUpPreloading(){this.subscription=this.router.events.pipe(Xt$5(e=>e instanceof k$2),Tg(()=>this.preload())).subscribe(()=>{});}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe();}processRoutes(e,r){let i=[];for(let o of r){o.providers&&!o._injector&&(o._injector=Vp(o.providers,e,""));let a=o._injector??e;o._loadedNgModuleFactory&&!o._loadedInjector&&(o._loadedInjector=o._loadedNgModuleFactory.create(a).injector);let c=o._loadedInjector??a;(o.loadChildren&&!o._loadedRoutes&&o.canLoad===void 0||o.loadComponent&&!o._loadedComponent)&&i.push(this.preloadConfig(a,o)),(o.children||o._loadedRoutes)&&i.push(this.processRoutes(c,o.children??o._loadedRoutes));}return Se$3(i).pipe(Fn$2())}preloadConfig(e,r){return this.preloadingStrategy.preload(r,()=>{if(e.destroyed)return ag(null);let i;r.loadChildren&&r.canLoad===void 0?i=Se$3(this.loader.loadChildren(e,r)):i=ag(null);let o=i.pipe(He$3(a=>a===null?ag(void 0):(r._loadedRoutes=a.routes,r._loadedInjector=a.injector,r._loadedNgModuleFactory=a.factory,this.processRoutes(a.injector??e,a.routes))));if(r.loadComponent&&!r._loadedComponent){let a=this.loader.loadComponent(e,r);return Se$3([o,a]).pipe(Fn$2())}else return o})}static \u0275fac=function(r){return new(r||t)(ke$4(te$1),ke$4(ce$3),ke$4(Qe$1),ke$4(pr$1))};static \u0275prov=re$1({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Po$1=new S$2("");function Lo$1(t,...n){return Rs([{provide:We,multi:true,useValue:t},{provide:Q$4,useFactory:xo$1},{provide:Zp,multi:true,useFactory:jo$1},n.map(e=>e.\u0275providers)])}function xo$1(){return T$3(te$1).routerState.root}function Yn$1(t,n){return {\u0275kind:t,\u0275providers:n}}function jo$1(){let t=T$3(le$2);return n=>{let e=t.get(Fi$4);if(n!==e.components[0])return;let r=t.get(te$1),i=t.get(ko$1);t.get($o$2)===1&&r.initialNavigation(),t.get(Zn$1,null,{optional:true})?.setUpPreloading(),t.get(Po$1,null,{optional:true})?.init(),r.resetRootComponentType(e.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe());}}var ko$1=new S$2("",{factory:()=>new ne$3}),$o$2=new S$2("",{factory:()=>1});var Zn$1=new S$2("");function zo$1(t){return Yn$1(0,[{provide:Zn$1,useExisting:Kn$1},{provide:Qe$1,useExisting:t}])}function Ho$1(t){_e$4("NgRouterViewTransitions");let n=[{provide:gr$2,useValue:qn$1},{provide:vr$1,useValue:w$3({skipNextTransition:false},t)}];return Yn$1(9,n)}
function b$3(n){n||(n=T$3(Le$4));let s=new N$5(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(Rg(s))}function Ne$1(n,s){let e=T$3(le$2),t=new On$2(1),r=pa$1(()=>{let i;try{i=n();}catch(a){ae$2(()=>t.error(a));return}ae$2(()=>t.next(i));},{injector:e,manualCleanup:true});return e.get(Le$4).onDestroy(()=>{r.destroy(),t.complete();}),t.asObservable()}function Pe$2(n,s){let t=!s?.manualCleanup?s?.injector?.get(Le$4)??T$3(Le$4):null,r=Ce$1(s?.equal),i;s?.requireSync?i=Fe$3({kind:0},{equal:r}):i=Fe$3({kind:1,value:s?.initialValue},{equal:r});let a,l=n.subscribe({next:o=>i.set({kind:1,value:o}),error:o=>{i.set({kind:2,error:o}),a?.();},complete:()=>{a?.();}});if(s?.requireSync&&i().kind===0)throw new b$4(601,false);return a=t?.onDestroy(l.unsubscribe.bind(l)),dt$6(()=>{let o=i();switch(o.kind){case 1:return o.value;case 2:throw o.error;case 0:throw new b$4(601,false)}},{equal:s?.equal})}function Ce$1(n=Object.is){return (s,e)=>s.kind===1&&e.kind===1&&n(s.value,e.value)}function Ue$1(n){return LA(x$2(w$3({},n),{loader:void 0,stream:s=>{let e,t=false,r=Fe$3({value:void 0}),{resolve:i,promise:a}=sa(),l=false;function o(){l||(l=true,i(r));}let m=()=>{t=true,e?.unsubscribe(),s.abortSignal.removeEventListener("abort",m),o();};s.abortSignal.addEventListener("abort",m);function w(D){r.set(D),o();}let j=n.stream;if(j===void 0)throw new b$4(990,false);return e=j(s).subscribe({next:D=>w({value:D}),error:D=>{w({error:el(D)}),s.abortSignal.removeEventListener("abort",m);},complete:()=>{l||w({error:new b$4(991,false)}),s.abortSignal.removeEventListener("abort",m);}}),t&&e.unsubscribe(),l?r:a}}))}function he$1(n,s){let e={};for(let t of Object.keys(n))t!==s&&(e[t]=n[t]);return e}var Y$2=class Y{state=Fe$3({});hasAny=dt$6(()=>Object.keys(this.state()).length>0);isLoading(s){return this.state()[s]!==void 0}get(s){return this.state()[s]}set(s,e){this.state.update(t=>x$2(w$3({},t),{[s]:e}));}clear(s){this.state.update(e=>he$1(e,s));}clearIfOwner(s,e){this.state.update(t=>t[s]===e?he$1(t,s):t);}},N$1=class N{},Te$1=(()=>{class n{handle(e){return e.key}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),M$1=class M{},we$1=(()=>{class n extends M$1{compile(e,t){return e}compileTranslations(e,t){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),F=class{},De$3=(()=>{class n extends F{getTranslation(e){return ag({})}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})();function W$1(n,s){if(n===s)return  true;if(n===null||s===null)return  false;if(n!==n&&s!==s)return  true;let e=typeof n,t=typeof s,r;if(e==t&&e=="object")if(Array.isArray(n)){if(!Array.isArray(s))return  false;if((r=n.length)==s.length){for(let i=0;i<r;i++)if(!W$1(n[i],s[i]))return  false;return  true}}else {if(Array.isArray(s))return  false;if(g$2(n)&&g$2(s)){let i=Object.create(null);for(let a in n){if(!W$1(n[a],s[a]))return  false;i[a]=true;}for(let a in s)if(!(a in i)&&typeof s[a]<"u")return  false;return  true}}return  false}function f$2(n){return typeof n<"u"&&n!==null}function pe$2(n){return n!==void 0}function g$2(n){return O(n)&&!L$1(n)&&n!==null}function O(n){return typeof n=="object"&&n!==null}function L$1(n){return Array.isArray(n)}function P(n){return typeof n=="string"}function Re$2(n){return typeof n=="function"}function U$1(n){if(L$1(n))return n.map(s=>U$1(s));if(g$2(n)){let s={};return Object.keys(n).forEach(e=>{s[e]=U$1(n[e]);}),s}else return n}function Q$3(n,s){if(!O(n))return U$1(s);let e=U$1(n);return O(e)&&O(s)&&Object.keys(s).forEach(t=>{g$2(s[t])?t in n?e[t]=Q$3(n[t],s[t]):Object.assign(e,{[t]:s[t]}):Object.assign(e,{[t]:s[t]});}),e}function me$2(n,s){let e=s.split(".");s="";do{s+=e.shift();let t=!e.length;if(f$2(n)){if(g$2(n)&&pe$2(n[s])&&(g$2(n[s])||L$1(n[s])||t)){n=n[s],s="";continue}if(L$1(n)){if(s==="length"&&t){n=n.length,s="";continue}if(/^\d+$/.test(s)){let r=parseInt(s,10);if(pe$2(n[r])&&(g$2(n[r])||L$1(n[r])||t)){n=n[r],s="";continue}}}}if(t){n=void 0;continue}s+=".";}while(e.length);return n}function Se$1(n,s,e){return Q$3(n,xe$1(s,e))}function xe$1(n,s){return n.split(".").reduceRight((e,t)=>({[t]:e}),s)}var k$1=class k{},Ie$1=(()=>{class n extends k$1{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(e,t){if(P(e))return this.interpolateString(e,t);if(Re$2(e))return this.interpolateFunction(e,t)}interpolateFunction(e,t){return e(t)}interpolateString(e,t){return t?e.replace(this.templateMatcher,(r,i)=>{let a=this.getInterpolationReplacement(t,i);return a!==void 0?a:r}):e}getInterpolationReplacement(e,t){return this.formatValue(me$2(e,t))}formatValue(e){if(P(e))return e;if(typeof e=="number"||typeof e=="boolean")return e.toString();if(e===null)return "null";if(L$1(e))return e.join(", ");if(O(e))return typeof e.toString=="function"&&e.toString!==Object.prototype.toString?e.toString():JSON.stringify(e)}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),ve$1=(()=>{class n{_translations=Fe$3({});translations=this._translations.asReadonly();_languages=Fe$3([]);languages=this._languages.asReadonly();_lastTranslationChange=Fe$3(null);lastTranslationChange=this._lastTranslationChange.asReadonly();_translationChange$=new ne$3;translationChange$=this._translationChange$.asObservable();constructor(){T$3(Le$4).onDestroy(()=>{this._translationChange$.complete();});}getTranslations(e){return this.translations()[e]}setTranslations(e,t,r){this._translations.update(a=>x$2(w$3({},a),{[e]:r&&this.hasTranslationFor(e)?Q$3(a[e],t):t})),this.addLanguages([e]);let i={lang:e,translations:this.getTranslations(e)};this._lastTranslationChange.set(i),this._translationChange$.next(i);}getLanguages(){return this.languages()}addLanguages(e){this._languages.update(t=>Array.from(new Set([...t,...e])));}hasTranslationFor(e){return typeof this.translations()[e]<"u"}deleteTranslations(e){this._translations.update(t=>{let a=t,{[e]:r}=a;return z$4(a,[y$2(e)])});}getTranslationValue(e,t){return me$2(this.getTranslations(e),t)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})(),Le$1=new S$2("TRANSLATE_CONFIG"),I$2=n=>lg(n)?n:ag(n),Z$2=(()=>{class n{loadingTranslations=new Y$2;lastUseLanguage=null;currentLoader=T$3(F);compiler=T$3(M$1);parser=T$3(k$1);missingTranslationHandler=T$3(N$1);store=T$3(ve$1);destroyRef=T$3(Le$4);parent;get isRoot(){return this.parent===null}_onLangChange=new ne$3;_onFallbackLangChange=new ne$3;_currentLang=Fe$3(null);_fallbackLang=Fe$3(null);_onTranslationRefresh=null;_isLoading=dt$6(()=>this.loadingTranslations.hasAny()||(this.parent?.isLoading()??false));getRoot(){let e=this;for(;e.parent;)e=e.parent;return e}getParent(){return this.parent}getActiveRequestedLang(){return this.getRoot().lastUseLanguage}hasTranslationInChain(e){for(let t=this;t;t=t.parent)if(t.store.hasTranslationFor(e))return  true;return  false}chainTranslationChange$(){let e=[];for(let t=this;t;t=t.parent)e.push(t.store.translationChange$);return e.length===1?e[0]:Dg(...e)}get onTranslationChange(){return this.store.translationChange$}get onLangChange(){return this.isRoot?this._onLangChange.asObservable():this.parent?this.parent.onLangChange:vt$5}get onFallbackLangChange(){return this.isRoot?this._onFallbackLangChange.asObservable():this.parent?this.parent.onFallbackLangChange:vt$5}get onTranslationRefresh(){if(!this._onTranslationRefresh){let e=Dg(this.onTranslationChange.pipe(Xt$5(t=>t.lang===this.getCurrentLang()||t.lang===this.getFallbackLang())),this.onLangChange,this.onFallbackLangChange).pipe(Me$3(()=>{}));this.isRoot?this._onTranslationRefresh=e:this._onTranslationRefresh=this.parent?Dg(e,this.parent.onTranslationRefresh):e;}return this._onTranslationRefresh}constructor(){let e=w$3({isRoot:true,fallbackLang:null},T$3(Le$1,{optional:true}));this.parent=e.isRoot?null:T$3(n,{optional:true,skipSelf:true});let t=T$3(Le$4);if(this.isRoot)e.lang&&this.use(e.lang),e.fallbackLang&&this.setFallbackLang(e.fallbackLang);else {let r=this.getCurrentLang();r&&this.loadOrExtendLanguage(r)?.pipe(b$3(t)).subscribe({error:a=>{console.warn(`@ngx-translate/core: child failed to load "${r}". Cause:`,a);}});let i=this.getFallbackLang();i&&i!==r&&this.loadOrExtendLanguage(i)?.pipe(b$3(t)).subscribe({error:a=>{console.warn(`@ngx-translate/core: child failed to load "${i}". Cause:`,a);}});}this.onLangChange.pipe(b$3(t)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe(b$3(t)).subscribe({error:i=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,i);}});}),this.onFallbackLangChange.pipe(b$3(t)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe(b$3(t)).subscribe({error:i=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,i);}});}),t.onDestroy(()=>{this._onLangChange.complete(),this._onFallbackLangChange.complete();});}setFallbackLang(e){if(!this.isRoot)return this.parent.setFallbackLang(e);this._fallbackLang()||this._fallbackLang.set(e);let t=this.loadOrExtendLanguage(e);return lg(t)?(t.pipe(It$7(1)).subscribe({next:()=>{this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)});},error:r=>{console.warn(`@ngx-translate/core: failed to load fallback "${e}". Cause:`,r);}}),t):(this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)}),ag(this.store.getTranslations(e)))}get isLoading(){return this._isLoading}use(e){if(!this.isRoot)return this.parent.use(e);let t=this._currentLang(),r=this.lastUseLanguage;this.lastUseLanguage=e,this._currentLang()||this._currentLang.set(e);let i=this.loadOrExtendLanguage(e);return lg(i)?(i.pipe(It$7(1)).subscribe({next:()=>{this.changeLang(e);},error:a=>{this.lastUseLanguage===e&&(this._currentLang.set(t),this.lastUseLanguage=r),console.warn(`@ngx-translate/core: failed to load "${e}". currentLang was NOT changed; remains "${t??"null"}". Cause:`,a);}}),i):(this.changeLang(e),ag(this.store.getTranslations(e)))}loadOrExtendLanguage(e){return this.store.hasTranslationFor(e)?ag(this.store.getTranslations(e)):this.loadAndCompileTranslations(e)}getTranslations(e){return this.store.getTranslations(e)}changeLang(e){e===this.lastUseLanguage&&(this._currentLang.set(e),this._onLangChange.next({lang:e,translations:this.store.getTranslations(e)}));}getCurrentLang(){return this.isRoot?this._currentLang():this.parent?.getCurrentLang()??null}loadAndCompileTranslations(e){let t=this.loadingTranslations.get(e);if(t)return t;let r=this.currentLoader.getTranslation(e).pipe(Me$3(i=>this.compiler.compileTranslations(i,e)),$l(i=>{this.store.setTranslations(e,i,false),this.loadingTranslations.clearIfOwner(e,r);}),Vl$1(()=>this.loadingTranslations.clearIfOwner(e,r)),Ag({bufferSize:1,refCount:true}));return this.loadingTranslations.set(e,r),r.pipe(b$3(this.destroyRef)).subscribe({error:()=>{}}),r}setTranslation(e,t,r=false){let i=this.compiler.compileTranslations(t,e);this.store.setTranslations(e,i,r);}setCompiledTranslation(e,t,r=false){this.store.setTranslations(e,t,r);}getLangs(){return this.store.getLanguages()}addLangs(e){this.store.addLanguages(e);}getParsedResultForKey(e,t,r){let i=this.getTextToInterpolate(e,r);if(f$2(i))return this.runInterpolation(i,t);let l=this.getMissingTranslationHandler().handle(w$3({key:e,translateService:this},t!==void 0&&{interpolateParams:t}));return l!==void 0?l:e}getMissingTranslationHandler(){return this.missingTranslationHandler}getFallbackLang(){return this.isRoot?this._fallbackLang():this.parent?.getFallbackLang()??null}getTextToInterpolate(e,t){if(t){let l=this.store.getTranslationValue(t,e);return l!==void 0?l:this.parent?.getTextToInterpolate(e,t)}let r=this.getCurrentLang(),i=this.getFallbackLang(),a;return r&&(a=this.store.getTranslationValue(r,e)),!f$2(a)&&i&&i!==r&&(a=this.store.getTranslationValue(i,e)),a!==void 0?a:this.parent?.getTextToInterpolate(e)}runInterpolation(e,t){if(f$2(e))return L$1(e)?this.runInterpolationOnArray(e,t):g$2(e)?this.runInterpolationOnDict(e,t):this.parser.interpolate(e,t)}runInterpolationOnArray(e,t){return e.map(r=>this.runInterpolation(r,t))}runInterpolationOnDict(e,t){let r={};for(let i in e){let a=this.runInterpolation(e[i],t);a!==void 0&&(r[i]=a);}return r}getParsedResult(e,t,r){return e instanceof Array?this.getParsedResultForArray(e,t,r):this.getParsedResultForKey(e,t,r)}getParsedResultForArray(e,t,r){let i={},a=false;for(let o of e)i[o]=this.getParsedResultForKey(o,t,r),a=a||lg(i[o]);if(!a)return i;let l=e.map(o=>I$2(i[o]));return Eg(l).pipe(Me$3(o=>{let m={};return o.forEach((w,j)=>{m[e[j]]=w;}),m}))}get(e,t,r){if(!f$2(e)||!e.length)return ag("");let i=r??this.getActiveRequestedLang()??this.getCurrentLang(),a=i?this.loadingTranslations.get(i):void 0;return a?a.pipe(Tg(()=>I$2(this.getParsedResult(e,t,r)))):I$2(this.getParsedResult(e,t,r))}getStreamOnTranslationChange(e,t,r){if(!f$2(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return Jt$3(Ig(()=>this.get(e,t,r)),this.onTranslationChange.pipe(vl(()=>{let i=this.getParsedResult(e,t,r);return I$2(i)})))}stream(e,t,r){if(!f$2(e)||!e.length)throw new Error('Parameter "key" required');let i=r?Dg(this.onLangChange,this.chainTranslationChange$().pipe(Xt$5(a=>a.lang===r))):this.onLangChange;return Jt$3(Ig(()=>this.get(e,t,r)),i.pipe(vl(()=>{let a=this.getParsedResult(e,t,r);return I$2(a)})))}instant(e,t,r){if(!f$2(e)||e.length===0)return "";r&&!this.hasTranslationInChain(r)&&this.warnUnloadedInstantLang(r);let i=this.getParsedResult(e,t,r);return lg(i)?this.keyToObject(e):i}warnedUnloadedInstantLangs=new Set;warnUnloadedInstantLang(e){let t=this.getRoot();if(t!==this){t.warnUnloadedInstantLang(e);return}this.warnedUnloadedInstantLangs.has(e)||ae$2(()=>{this.warnedUnloadedInstantLangs.add(e),console.warn(`@ngx-translate/core: instant() called with lang="${e}" but no translations are loaded for that language. Returning the key as fallback. Load with use("${e}") or setTranslation("${e}", ...) first.`);});}translate(e,t,r){return dt$6(()=>{let i=typeof e=="function"?e():e,a=typeof t=="function"?t():t,l=typeof r=="function"?r():r;return this.instant(i,a,l)})}keyToObject(e){return Array.isArray(e)?e.reduce((t,r)=>(t[r]=r,t),{}):e}set(e,t,r=this.getCurrentLang()){this.store.setTranslations(r,Se$1(this.store.getTranslations(r),e,P(t)?this.compiler.compile(t,r):this.compiler.compileTranslations(t,r)),false);}reloadLang(e){return this.resetLang(e),this.loadAndCompileTranslations(e)}resetLang(e){this.loadingTranslations.clear(e),this.store.deleteTranslations(e);}static getBrowserLang(){if(typeof window>"u"||!window.navigator)return;let e=this.getBrowserCultureLang();return e?e.split(/[-_]/)[0]:void 0}static getBrowserCultureLang(){if(!(typeof window>"u"||typeof window.navigator>"u"))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}getBrowserLang(){return n.getBrowserLang()}getBrowserCultureLang(){return n.getBrowserCultureLang()}get currentLang(){return this.isRoot?this._currentLang.asReadonly():this.parent.currentLang}get fallbackLang(){return this.isRoot?this._fallbackLang.asReadonly():this.parent.fallbackLang}static \u0275fac=function(t){return new(t||n)};static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})();var rt$2=(()=>{class n{translateService=T$3(Z$2);cachedSignal=null;lastKey=null;lastParams;transform(e,...t){if(!e||!e.length)return e;let r=this.parseArgs(t);return (e!==this.lastKey||!W$1(r,this.lastParams))&&(this.cachedSignal=this.translateService.translate(e,r),this.lastKey=e,this.lastParams=r),this.cachedSignal()}parseArgs(e){if(!(!f$2(e[0])||!e.length)){if(P(e[0])&&e[0].length){let t=e[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,'"$2":').replace(/:(\s)?(')(.*?)(')/g,':"$3"');try{return JSON.parse(t)}catch(r){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${e[0]}`)}}if(g$2(e[0]))return e[0]}}static \u0275fac=function(t){return new(t||n)};static \u0275pipe=bE({name:"translate",type:n,pure:false});static \u0275prov=re$1({token:n,factory:n.\u0275fac})}return n})();function ye$1(n){return /^class\s/.test(Function.prototype.toString.call(n))}function be$1(n,s){return ye$1(s)?{provide:n,useClass:s}:{provide:n,useFactory:s}}function st$2(n={}){return Oe$3(x$2(w$3({},n),{isRoot:true}))}function A$1(n,s,e,t,r){if(s===void 0)return be$1(n,e);if(typeof s=="function"){if(ye$1(s)){let i=s.name||"YourClass";console.warn(`@ngx-translate/core: "${t}" received a bare class (${i}); auto-wrapping with ${r}(). For clarity, prefer ${t}: ${r}(${i}).`);}return be$1(n,s)}return s}function Oe$3(n){let s=[],e=A$1(F,n.loader,De$3,"loader","provideTranslateLoader"),t=A$1(M$1,n.compiler,we$1,"compiler","provideTranslateCompiler"),r=A$1(k$1,n.parser,Ie$1,"parser","provideTranslateParser"),i=A$1(N$1,n.missingTranslationHandler,Te$1,"missingTranslationHandler","provideMissingTranslationHandler");s.push(e,t,r,i),s.push(ve$1);let a={fallbackLang:n.fallbackLang??null,lang:n.lang,isRoot:n.isRoot};return s.push({provide:Le$1,useValue:a}),s.push({provide:Z$2,useClass:Z$2}),s}var s$1="Juanma Moreno S\xE1nchez",f$1="https://www.juanmamoreno.com",y="seo.default.description",$$3=(()=>{class n extends fr$2{constructor(){super(...arguments),this.title=T$3(ju),this.meta=T$3(Uu),this.document=T$3(ir$4),this.translate=T$3(Z$2);}updateTitle(i){let t=this.buildTitle(i),e=t?this.translate.instant(t):"",a=e?`${e} \xB7 ${s$1}`:`${s$1} \u2014 artist`,g=this.deepestDescription(i.root)??y,r=this.translate.instant(g),c=f$1+(i.url.split("?")[0]||"/");this.title.setTitle(a),this.meta.updateTag({name:"description",content:r}),this.meta.updateTag({property:"og:title",content:a}),this.meta.updateTag({property:"og:description",content:r}),this.meta.updateTag({property:"og:url",content:c}),this.meta.updateTag({name:"twitter:title",content:a}),this.meta.updateTag({name:"twitter:description",content:r}),this.setCanonical(c);}setPageTitle(i,t){let e=`${i} \xB7 ${s$1}`;this.title.setTitle(e),this.meta.updateTag({property:"og:title",content:e}),this.meta.updateTag({name:"twitter:title",content:e}),t&&(this.meta.updateTag({name:"description",content:t}),this.meta.updateTag({property:"og:description",content:t}),this.meta.updateTag({name:"twitter:description",content:t}));}deepestDescription(i){let t,e=i;for(;e;){let a=e.data.description;typeof a=="string"&&(t=a),e=e.firstChild;}return t}setCanonical(i){let t=this.document.head.querySelector('link[rel="canonical"]');t||(t=this.document.createElement("link"),t.setAttribute("rel","canonical"),this.document.head.appendChild(t)),t.setAttribute("href",i);}static{this.\u0275fac=(()=>{let i;return function(e){return (i||(i=ey(n)))(e||n)}})();}static{this.\u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"});}}return n})();
var m$1=(()=>{class e{get vertical(){return this._vertical}set vertical(t){this._vertical=fm(t);}_vertical=false;get inset(){return this._inset}set inset(t){this._inset=fm(t);}_inset=false;static \u0275fac=function(r){return new(r||e)};static \u0275cmp=IE({type:e,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(r,i){r&2&&(Kp("aria-orientation",i.vertical?"vertical":"horizontal"),gh("mat-divider-vertical",i.vertical)("mat-divider-horizontal",!i.vertical)("mat-divider-inset",i.inset));},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(r,i){},styles:[`.mat-divider {
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
`],encapsulation:2})}return e})();var Vt$1=class Vt{_box;_destroyed=new ne$3;_resizeSubject=new ne$3;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)));}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new N$5(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),i.unsubscribe(),this._elementObservables.delete(t);}}).pipe(Xt$5(e=>e.some(i=>i.target===t)),Ag({bufferSize:1,refCount:true}),Rg(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear();}},xi$1=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=T$3(ue$1);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.();}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Vt$1(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var On=["notch"],Rn=["*"],wi=["iconPrefixContainer"],Si=["textPrefixContainer"],Di$1=["iconSuffixContainer"],Ei$2=["textSuffixContainer"],Fn=["textField"],Vn=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],An=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function kn(n,t){n&1&&Xp(0,"span",21);}function Pn(n,t){if(n&1&&(wi$2(0,"label",20),uD(1,1),ZE(2,kn,1,0,"span",21),Hc()),n&2){let e=aD(2);Jp("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Kp("for",e._control.disableAutomaticLabeling?null:e._control.id),Hv(2),YE(!e.hideRequiredMarker&&e._control.required?2:-1);}}function Nn(n,t){if(n&1&&ZE(0,Pn,3,5,"label",20),n&2){let e=aD();YE(e._hasFloatingLabel()?0:-1);}}function In(n,t){n&1&&Xp(0,"div",7);}function Tn(n,t){}function Ln(n,t){if(n&1&&Gp(0,Tn,0,0,"ng-template",13),n&2){aD(2);let e=gD(1);Jp("ngTemplateOutlet",e);}}function Bn(n,t){if(n&1&&(wi$2(0,"div",9),ZE(1,Ln,1,1,null,13),Hc()),n&2){let e=aD();Jp("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),Hv(),YE(e._forceDisplayInfixLabel()?-1:1);}}function zn(n,t){n&1&&(wi$2(0,"div",10,2),uD(2,2),Hc());}function jn(n,t){n&1&&(wi$2(0,"div",11,3),uD(2,3),Hc());}function Hn(n,t){}function Wn(n,t){if(n&1&&Gp(0,Hn,0,0,"ng-template",13),n&2){aD();let e=gD(1);Jp("ngTemplateOutlet",e);}}function Gn(n,t){n&1&&(wi$2(0,"div",14,4),uD(2,4),Hc());}function Un(n,t){n&1&&(wi$2(0,"div",15,5),uD(2,5),Hc());}function Yn(n,t){n&1&&Xp(0,"div",16);}function qn(n,t){n&1&&(wi$2(0,"div",18),uD(1,6),Hc());}function Xn(n,t){if(n&1&&(wi$2(0,"mat-hint",22),FD(1),Hc()),n&2){let e=aD(2);Jp("id",e._hintLabelId),Hv(),Dh(e.hintLabel);}}function $n(n,t){if(n&1&&(wi$2(0,"div",19),ZE(1,Xn,2,2,"mat-hint",22),uD(2,7),Xp(3,"div",23),uD(4,8),Hc()),n&2){let e=aD();Hv(),YE(e.hintLabel?1:-1);}}var At$2=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["mat-label"]]})}return n})(),ki$1=new S$2("MatError"),Zn=(()=>{class n{id=T$3(hn$3).getId("mat-mdc-error-");static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["mat-error"],["","matError",""]],hostAttrs:[1,"mat-mdc-form-field-error","mat-mdc-form-field-bottom-align"],hostVars:1,hostBindings:function(i,r){i&2&&rh("id",r.id);},inputs:{id:"id"},features:[zD([{provide:ki$1,useExisting:n}])]})}return n})(),kt$1=(()=>{class n{align="start";id=T$3(hn$3).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(rh("id",r.id),Kp("align",null),gh("mat-mdc-form-field-hint-end",r.align==="end"));},inputs:{align:"align",id:"id"}})}return n})(),Qn=new S$2("MatPrefix");var Kn=new S$2("MatSuffix");var Pi$2=new S$2("FloatingLabelParent"),Mi=(()=>{class n{_elementRef=T$3(Tr$2);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=T$3(xi$1);_ngZone=T$3(ue$1);_parent=T$3(Pi$2);_resizeSubscription=new G$4;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return Jn(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&gh("mdc-floating-label--float-above",r.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return n})();function Jn(n){let t=n;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(true);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var Oi$1="mdc-line-ripple--active",Ye="mdc-line-ripple--deactivating",Ri$1=(()=>{class n{_elementRef=T$3(Tr$2);_cleanupTransitionEnd;constructor(){let e=T$3(ue$1),i=T$3(CI);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Ye),e.add(Oi$1);}deactivate(){this._elementRef.nativeElement.classList.add(Ye);}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(Ye);e.propertyName==="opacity"&&r&&i.remove(Oi$1,Ye);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return n})(),Fi$1=(()=>{class n{_elementRef=T$3(Tr$2);_ngZone=T$3(ue$1);open=false;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="");}))):e.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`);}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=IE({type:n,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&lh(On,5),i&2){let o;fD(o=pD())&&(r._notch=o.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&gh("mdc-notched-outline--notched",r.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:Rn,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(lD(),eh(0,"div",1),Bc(1,"div",2,0),uD(3),$c(),eh(4,"div",3));},encapsulation:2})}return n})(),er$1=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n})}return n})();var tr$1=new S$2("MatFormField"),ir$1=new S$2("MAT_FORM_FIELD_DEFAULT_OPTIONS"),Vi$1="fill",nr$1="auto",Ai$2="fixed",rr$1="translateY(-50%)",or$1=(()=>{class n{_elementRef=T$3(Tr$2);_changeDetectorRef=T$3(kF);_platform=T$3(A$2);_idGenerator=T$3(hn$3);_ngZone=T$3(ue$1);_defaults=T$3(ir$1,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=xF("iconPrefixContainer");_textPrefixContainerSignal=xF("textPrefixContainer");_iconSuffixContainerSignal=xF("iconSuffixContainer");_textSuffixContainerSignal=xF("textSuffixContainer");_prefixSuffixContainers=dt$6(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=AF(At$2);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=fm(e);}_hideRequiredMarker=false;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||nr$1}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||Vi$1;this._appearanceSignal.set(i);}_appearanceSignal=Fe$3(Vi$1);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Ai$2}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Ai$2;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e;}_destroyed=new ne$3;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=we$3();constructor(){let e=this._defaults,i=T$3(ea);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),pa$1(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=dt$6(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(Bl([void 0,void 0]),Me$3(()=>[i.errorState,i.userAriaDescribedBy]),Sg(),Xt$5(([[o,s],[l,d]])=>o!==l||s!==d)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(Rg(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Dg(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=true,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e);}_syncOutlineLabelOffset(){FF({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=dt$6(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(l=>l.align==="start"):null,s=this._hintChildren?this._hintChildren.find(l=>l.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id);}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)));}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e;}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,l=i?.getBoundingClientRect().width??0,d=r?.getBoundingClientRect().width??0,h=o?.getBoundingClientRect().width??0,c=this._currentDirection==="rtl"?"-1":"1",u=`${s+l}px`,M=`calc(${c} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,D=`var(--mat-mdc-form-field-label-transform, ${rr$1} translateX(${M}))`,P=s+l+d+h;return [D,P]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r);}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=IE({type:n,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(uh(o,r._labelChild,At$2,5),ch(o,er$1,5)(o,Qn,5)(o,Kn,5)(o,ki$1,5)(o,kt$1,5)),i&2){hD();let s;fD(s=pD())&&(r._formFieldControl=s.first),fD(s=pD())&&(r._prefixChildren=s),fD(s=pD())&&(r._suffixChildren=s),fD(s=pD())&&(r._errorChildren=s),fD(s=pD())&&(r._hintChildren=s);}},viewQuery:function(i,r){if(i&1&&(dh(r._iconPrefixContainerSignal,wi,5)(r._textPrefixContainerSignal,Si,5)(r._iconSuffixContainerSignal,Di$1,5)(r._textSuffixContainerSignal,Ei$2,5),lh(Fn,5)(wi,5)(Si,5)(Di$1,5)(Ei$2,5)(Mi,5)(Fi$1,5)(Ri$1,5)),i&2){hD(4);let o;fD(o=pD())&&(r._textField=o.first),fD(o=pD())&&(r._iconPrefixContainer=o.first),fD(o=pD())&&(r._textPrefixContainer=o.first),fD(o=pD())&&(r._iconSuffixContainer=o.first),fD(o=pD())&&(r._textSuffixContainer=o.first),fD(o=pD())&&(r._floatingLabel=o.first),fD(o=pD())&&(r._notchedOutline=o.first),fD(o=pD())&&(r._lineRipple=o.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&gh("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[zD([{provide:tr$1,useExisting:n},{provide:Pi$2,useExisting:n}])],ngContentSelectors:An,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(lD(Vn),Gp(0,Nn,1,1,"ng-template",null,0,tw),wi$2(2,"div",6,1),ih("click",function(s){return r._control.onContainerClick(s)}),ZE(4,In,1,0,"div",7),wi$2(5,"div",8),ZE(6,Bn,2,2,"div",9),ZE(7,zn,3,0,"div",10),ZE(8,jn,3,0,"div",11),wi$2(9,"div",12),ZE(10,Wn,1,1,null,13),uD(11),Hc(),ZE(12,Gn,3,0,"div",14),ZE(13,Un,3,0,"div",15),Hc(),ZE(14,Yn,1,0,"div",16),Hc(),wi$2(15,"div",17),ZE(16,qn,2,0,"div",18)(17,$n,5,1,"div",19),Hc()),i&2){let o;Hv(2),gh("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),Hv(2),YE(!r._hasOutline()&&!r._control.disabled?4:-1),Hv(2),YE(r._hasOutline()?6:-1),Hv(),YE(r._hasIconPrefix?7:-1),Hv(),YE(r._hasTextPrefix?8:-1),Hv(2),YE(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),Hv(2),YE(r._hasTextSuffix?12:-1),Hv(),YE(r._hasIconSuffix?13:-1),Hv(),YE(r._hasOutline()?-1:14),Hv(),gh("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();Hv(),YE((o=s)==="error"?16:o==="hint"?17:-1);}},dependencies:[Mi,Fi$1,_i$2,Ri$1,kt$1],styles:[`.mdc-text-field {
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
`],encapsulation:2})}return n})();var Wi$1=(()=>{class n{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i;}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i);}registerOnTouched(e){this.onTouched=e;}registerOnChange(e){this.onChange=e;}setDisabledState(e){this.setProperty("disabled",e);}static \u0275fac=function(i){return new(i||n)(Ar$2(CI),Ar$2(Tr$2))};static \u0275dir=CE({type:n})}return n})(),sr$1=(()=>{class n extends Wi$1{static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275dir=CE({type:n,features:[Wp]})}return n})(),Gi$1=new S$2("");var ar$1={provide:Gi$1,useExisting:Eo$3(()=>Ui),multi:true};function lr$1(){let n=P$2()?P$2().getUserAgent():"";return /android (\d+)/.test(n.toLowerCase())}var dr$1=new S$2(""),Ui=(()=>{class n extends Wi$1{_compositionMode;_composing=false;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!lr$1());}writeValue(e){let i=e??"";this.setProperty("value",i);}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e);}_compositionStart(){this._composing=true;}_compositionEnd(e){this._composing=false,this._compositionMode&&this.onChange(e);}static \u0275fac=function(i){return new(i||n)(Ar$2(CI),Ar$2(Tr$2),Ar$2(dr$1,8))};static \u0275dir=CE({type:n,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&ih("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)});},standalone:false,features:[zD([ar$1]),Wp]})}return n})();function Lt$1(n){return n==null||Bt$1(n)===0}function Bt$1(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var nt$1=new S$2(""),zt$2=new S$2(""),cr$1=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Pt$2=class Pt{static min(t){return hr$1(t)}static max(t){return ur$1(t)}static required(t){return Yi$1(t)}static requiredTrue(t){return fr$1(t)}static email(t){return mr$1(t)}static minLength(t){return pr(t)}static maxLength(t){return gr$1(t)}static pattern(t){return _r(t)}static nullValidator(t){return Xe()}static compose(t){return Ki$1(t)}static composeAsync(t){return Ji$1(t)}};function hr$1(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function ur$1(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}function Yi$1(n){return Lt$1(n.value)?{required:true}:null}function fr$1(n){return n.value===true?null:{required:true}}function mr$1(n){return Lt$1(n.value)||cr$1.test(n.value)?null:{email:true}}function pr(n){return t=>{let e=t.value?.length??Bt$1(t.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function gr$1(n){return t=>{let e=t.value?.length??Bt$1(t.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function _r(n){if(!n)return Xe;let t,e;return typeof n=="string"?(e="",n.charAt(0)!=="^"&&(e+="^"),e+=n,n.charAt(n.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=n.toString(),t=n),i=>{if(Lt$1(i.value))return null;let r=i.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Xe(n){return null}function qi$1(n){return n!=null}function Xi$1(n){return Fc(n)?Se$3(n):n}function $i$1(n){let t={};return n.forEach(e=>{t=e!=null?w$3(w$3({},t),e):t;}),Object.keys(t).length===0?null:t}function Zi$1(n,t){return t.map(e=>e(n))}function vr(n){return !n.validate}function Qi$1(n){return n.map(t=>vr(t)?t:e=>t.validate(e))}function Ki$1(n){if(!n)return null;let t=n.filter(qi$1);return t.length==0?null:function(e){return $i$1(Zi$1(e,t))}}function jt$2(n){return n!=null?Ki$1(Qi$1(n)):null}function Ji$1(n){if(!n)return null;let t=n.filter(qi$1);return t.length==0?null:function(e){let i=Zi$1(e,t).map(Xi$1);return Eg(i).pipe(Me$3($i$1))}}function Ht$2(n){return n!=null?Ji$1(Qi$1(n)):null}function Ni(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function en$1(n){return n._rawValidators}function tn$1(n){return n._rawAsyncValidators}function Nt$1(n){return n?Array.isArray(n)?n:[n]:[]}function $e(n,t){return Array.isArray(n)?n.includes(t):n===t}function Ii$2(n,t){let e=Nt$1(t);return Nt$1(n).forEach(r=>{$e(e,r)||e.push(r);}),e}function Ti$2(n,t){return Nt$1(t).filter(e=>!$e(n,e))}var Ze=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=jt$2(this._rawValidators);}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Ht$2(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[];}reset(t=void 0){this.control?.reset(t);}hasError(t,e){return this.control?this.control.hasError(t,e):false}getError(t,e){return this.control?this.control.getError(t,e):null}},ie=class extends Ze{name;get formDirective(){return null}get path(){return null}};var De$2="VALID",qe="INVALID",me$1="PENDING",Ee$2="DISABLED",$$2=class ${},Qe=class extends $$2{value;source;constructor(t,e){super(),this.value=t,this.source=e;}},Oe$2=class Oe extends $$2{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e;}},Re$1=class Re extends $$2{touched;source;constructor(t,e){super(),this.touched=t,this.source=e;}},pe$1=class pe extends $$2{status;source;constructor(t,e){super(),this.status=t,this.source=e;}},Ke$1=class Ke extends $$2{source;constructor(t){super(),this.source=t;}},ge$1=class ge extends $$2{source;constructor(t){super(),this.source=t;}};function nn$1(n){return (rt$1(n)?n.validators:n)||null}function yr(n){return Array.isArray(n)?jt$2(n):n||null}function rn$1(n,t){return (rt$1(t)?t.asyncValidators:n)||null}function br(n){return Array.isArray(n)?Ht$2(n):n||null}function rt$1(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function Cr(n,t,e){let i=n.controls;if(!(Object.keys(i)).length)throw new b$4(1e3,"");if(!on$1(i,e))throw new b$4(1001,"")}function xr(n,t,e){n._forEachChild((i,r)=>{if(e[r]===void 0)throw new b$4(-1002,"")});}var Je$1=class Je{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=Fe$3(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e);}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t;}get parent(){return this._parent}get status(){return ae$2(this.statusReactive)}set status(t){ae$2(()=>this.statusReactive.set(t));}_status=dt$6(()=>this.statusReactive());statusReactive=Fe$3(void 0);get valid(){return this.status===De$2}get invalid(){return this.status===qe}get pending(){return this.status===me$1}get disabled(){return this.status===Ee$2}get enabled(){return this.status!==Ee$2}errors;get pristine(){return ae$2(this.pristineReactive)}set pristine(t){ae$2(()=>this.pristineReactive.set(t));}_pristine=dt$6(()=>this.pristineReactive());pristineReactive=Fe$3(true);get dirty(){return !this.pristine}get touched(){return ae$2(this.touchedReactive)}set touched(t){ae$2(()=>this.touchedReactive.set(t));}_touched=dt$6(()=>this.touchedReactive());touchedReactive=Fe$3(false);get untouched(){return !this.touched}_events=new ne$3;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t);}setAsyncValidators(t){this._assignAsyncValidators(t);}addValidators(t){this.setValidators(Ii$2(t,this._rawValidators));}addAsyncValidators(t){this.setAsyncValidators(Ii$2(t,this._rawAsyncValidators));}removeValidators(t){this.setValidators(Ti$2(t,this._rawValidators));}removeAsyncValidators(t){this.setAsyncValidators(Ti$2(t,this._rawAsyncValidators));}hasValidator(t){return $e(this._rawValidators,t)}hasAsyncValidator(t){return $e(this._rawAsyncValidators,t)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(t={}){let e=this.touched===false;this.touched=true;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(x$2(w$3({},t),{sourceControl:i})),e&&t.emitEvent!==false&&this._events.next(new Re$1(true,i));}markAllAsDirty(t={}){this.markAsDirty({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t));}markAllAsTouched(t={}){this.markAsTouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t));}markAsUntouched(t={}){let e=this.touched===true;this.touched=false,this._pendingTouched=false;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:i});}),t.onlySelf||this._parent?._updateTouched(t,i),e&&t.emitEvent!==false&&this._events.next(new Re$1(false,i));}markAsDirty(t={}){let e=this.pristine===true;this.pristine=false;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(x$2(w$3({},t),{sourceControl:i})),e&&t.emitEvent!==false&&this._events.next(new Oe$2(false,i));}markAsPristine(t={}){let e=this.pristine===false;this.pristine=true,this._pendingDirty=false;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:true,emitEvent:t.emitEvent});}),t.onlySelf||this._parent?._updatePristine(t,i),e&&t.emitEvent!==false&&this._events.next(new Oe$2(true,i));}markAsPending(t={}){this.status=me$1;let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new pe$1(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(x$2(w$3({},t),{sourceControl:e}));}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=Ee$2,this.errors=null,this._forEachChild(r=>{r.disable(x$2(w$3({},t),{onlySelf:true}));}),this._updateValue();let i=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new Qe(this.value,i)),this._events.next(new pe$1(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(x$2(w$3({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(true));}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=De$2,this._forEachChild(i=>{i.enable(x$2(w$3({},t),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent}),this._updateAncestors(x$2(w$3({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(false));}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e));}setParent(t){this._parent=t;}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===De$2||this.status===me$1)&&this._runAsyncValidator(i,t.emitEvent);}let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new Qe(this.value,e)),this._events.next(new pe$1(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(x$2(w$3({},t),{sourceControl:e}));}_updateTreeValidity(t={emitEvent:true}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?Ee$2:De$2;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=me$1,this._hasOwnPendingAsyncValidator={emitEvent:e!==false,shouldHaveEmitted:t!==false};let i=Xi$1(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,t}return  false}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==false,this,e.shouldHaveEmitted);}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(t,e){let i=e?this.get(e):this;return i?.errors?i.errors[t]:null}hasError(t,e){return !!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,i){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||i)&&this._events.next(new pe$1(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,i);}_initObservables(){this.valueChanges=new qe$3,this.statusChanges=new qe$3;}_calculateStatus(){return this._allControlsDisabled()?Ee$2:this.errors?qe:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(me$1)?me$1:this._anyControlsHaveStatus(qe)?qe:De$2}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new Oe$2(this.pristine,e));}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new Re$1(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e);}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t;}_setUpdateStrategy(t){rt$1(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn);}_parentMarkedDirty(t){return !t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=yr(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=br(this._rawAsyncValidators);}_updateHasRequiredValidator(){ae$2(()=>this._hasRequired.set(this.hasValidator(Pt$2.required)));}};function on$1(n,t){return Object.hasOwn(n,t)}function wr(n){return n.tagName==="INPUT"||n.tagName==="SELECT"||n.tagName==="TEXTAREA"}function $o$1(n){if(n.tagName!=="INPUT")return  false;let t=n.type;return t==="number"||t==="range"||t==="date"||t==="month"}function Zo$1(n){return n.tagName==="INPUT"||n.tagName==="TEXTAREA"}function Sr(n,t,e,i){switch(e){case "name":n.setAttribute(t,e,i);break;case "disabled":case "readonly":case "required":i?n.setAttribute(t,e,""):n.removeAttribute(t,e);break;case "max":case "min":case "minLength":case "maxLength":i!==void 0?n.setAttribute(t,e,i.toString()):n.removeAttribute(t,e);break}}var It$2=class It{kind;context;control;message;constructor({kind:t,context:e,control:i}){this.kind=t,this.context=e,this.control=i;}};var Dr=(()=>{class n{_validator=Xe;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):Xe,this._onChange?.();}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e;}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,features:[Pm]})}return n})();var Er={provide:nt$1,useExisting:Eo$3(()=>sn$1),multi:true};var sn$1=(()=>{class n extends Dr{required;inputName="required";normalizeInput=PF;createValidator=e=>Yi$1;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275dir=CE({type:n,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,r){i&2&&Kp("required",r._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[zD([Er]),Wp]})}return n})();var Mr=new S$2(""),ot$2=new S$2("",{factory:()=>Wt$1}),Wt$1="always";function Or(n,t){return [...t.path,n]}function Li$1(n,t,e=Wt$1){Gt$2(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(n.disabled),Fr(n,t),Ar(n,t),Vr(n,t),Rr(n,t);}function Bi$1(n,t,e=true){let i=()=>{};t?.valueAccessor?.registerOnChange(i),t?.valueAccessor?.registerOnTouched(i),tt$2(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}));}function et$2(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t);});}function Rr(n,t){if(t.valueAccessor.setDisabledState){let e=i=>{t.valueAccessor.setDisabledState(i);};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e);});}}function Gt$2(n,t){let e=en$1(n);t.validator!==null?n.setValidators(Ni(e,t.validator)):typeof e=="function"&&n.setValidators([e]);let i=tn$1(n);t.asyncValidator!==null?n.setAsyncValidators(Ni(i,t.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();et$2(t._rawValidators,r),et$2(t._rawAsyncValidators,r);}function tt$2(n,t){let e=false;if(n!==null){if(t.validator!==null){let r=en$1(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.validator);o.length!==r.length&&(e=true,n.setValidators(o));}}if(t.asyncValidator!==null){let r=tn$1(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.asyncValidator);o.length!==r.length&&(e=true,n.setAsyncValidators(o));}}}let i=()=>{};return et$2(t._rawValidators,i),et$2(t._rawAsyncValidators,i),e}function Fr(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=true,n._pendingDirty=true,n.updateOn==="change"&&an$1(n,t);});}function Vr(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=true,n.updateOn==="blur"&&n._pendingChange&&an$1(n,t),n.updateOn!=="submit"&&n.markAsTouched();});}function an$1(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:false}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=false;}function Ar(n,t){let e=(i,r)=>{t.valueAccessor.writeValue(i),r&&t.viewToModelUpdate(i);};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e);});}function ln$1(n,t){Gt$2(n,t);}function kr(n,t){return tt$2(n,t)}function Pr(n,t){if(!n.hasOwnProperty("model"))return  false;let e=n.model;return e.isFirstChange()?true:!Object.is(t,e.currentValue)}function Nr(n){return Object.getPrototypeOf(n.constructor)===sr$1}function dn$1(n,t){n._syncPendingControls(),t.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=false);});}function Ir(n,t){if(!t)return null;let e,i,r;return t.forEach(o=>{o.constructor===Ui?e=o:Nr(o)?i=o:r=o;}),r||i||e||null}function Tr(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1);}var Lr={provide:Mr,useFactory:()=>{let n=T$3(_e$1,{self:true});return {setParseErrors:t=>{n.setParseErrorSource(t);},set onReset(t){n.onReset=t;}}}},_e$1=class _e extends Ze{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof ge$1&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Ir(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,i){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=i,this.injector?.get(Le$4)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(kF);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new G$4,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(i=>{i instanceof ge$1&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(t){!t.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=true,t.listenToCustomControlModel(r=>{this.control?.setValue(r,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(r);}),t.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=wr(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof sn$1));}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let i=this.control,r=this.customControlBindings;Object.is(r.value,i.value)||(r.value=i.value,t.setCustomControlModelInput(i.value)),this.bindControlProperty(t,r,"touched",i.touched),this.bindControlProperty(t,r,"dirty",i.dirty),this.bindControlProperty(t,r,"valid",i.valid),this.bindControlProperty(t,r,"invalid",i.invalid),this.bindControlProperty(t,r,"pending",i.pending),this.bindControlProperty(t,r,"disabled",i.disabled),this.shouldBindRequired&&this.bindControlProperty(t,r,"required",this.isRequired);let o=i.errors;if(r.errors!==o){r.errors=o;let s=this._convertErrors(o);t.setInputOnDirectives("errors",s);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(t,e,i,r){if(e[i]===r)return;e[i]=r;let o=t.setInputOnDirectives(i,r);this.isNativeFormElement&&!o&&(i==="disabled"||i==="required")&&this.renderer&&Sr(this.renderer,t.nativeElement,i,r);}_convertErrors(t){if(t===null)return [];let e=this.control;return Object.entries(t).map(([i,r])=>new It$2({context:r,kind:i,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,i=dt$6(()=>{let r=t();return r.length===0?null:r.reduce((o,s)=>(o[s.kind]=s,o),{})});this.parseErrorsValidator=(()=>e).bind(this),pa$1(()=>{e=i(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:false}));}},Tt$2=class Tt{_cd;constructor(t){this._cd=t;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Qo$1=(()=>{class n extends Tt$2{constructor(e){super(e);}static \u0275fac=function(i){return new(i||n)(Ar$2(_e$1,2))};static \u0275dir=CE({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&gh("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending);},standalone:false,features:[Wp]})}return n})();var it$1=class it extends Je$1{constructor(t,e,i){super(nn$1(e),rn$1(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(t,e){let i=this._find(t);return i||(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,i={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}removeControl(t,e={}){let i=this._find(t);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}setControl(t,e,i={}){let r=this._find(t);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}contains(t){return this._find(t)?.enabled===true}setValue(t,e={}){ae$2(()=>{xr(this,true,t),Object.keys(t).forEach(i=>{Cr(this,true,i),this.controls[i].setValue(t[i],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(i=>{let r=this._find(i);r&&r.patchValue(t[i],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(t={},e={}){this._forEachChild((i,r)=>{i.reset(t?t[r]:null,x$2(w$3({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new ge$1(this));}getRawValue(){return this._reduceChildren({},(t,e,i)=>(t[i]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(false,(e,i)=>i._syncPendingControls()?true:e);return t&&this.updateValueAndValidity({onlySelf:true}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&t(i,e);});}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(t){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&t(i))return  true;return  false}_reduceValue(){let t={};return this._reduceChildren(t,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(t,e){let i=t;return this._forEachChild((r,o)=>{i=e(i,r,o);}),i}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(t){return on$1(this.controls,t)?this.controls[t]:null}};var Br={provide:ie,useExisting:Eo$3(()=>zr)},Me$2=Promise.resolve(),zr=(()=>{class n extends ie{callSetDisabledState;get submitted(){return ae$2(this.submittedReactive)}_submitted=dt$6(()=>this.submittedReactive());submittedReactive=Fe$3(false);_directives=new Set;form;ngSubmit=new qe$3;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new it$1({},jt$2(e),Ht$2(i));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(e){Me$2.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:false}),this._directives.add(e);});}getControl(e){return this.form.get(e.path)}removeControl(e){Me$2.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e);});}addFormGroup(e){Me$2.then(()=>{let i=this._findContainer(e.path),r=new it$1({});ln$1(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:false});});}removeFormGroup(e){Me$2.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name);});}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){Me$2.then(()=>{this.form.get(e.path).setValue(i);});}setValue(e){this.control.setValue(e);}onSubmit(e){return this.submittedReactive.set(true),dn$1(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Ke$1(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||n)(Ar$2(nt$1,10),Ar$2(zt$2,10),Ar$2(ot$2,8))};static \u0275dir=CE({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&ih("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[zD([Br]),Wp]})}return n})();function zi$1(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1);}function ji(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var cn$1=class cn extends Je$1{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(t=null,e,i){super(nn$1(e),rn$1(i,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),rt$1(e)&&(e.nonNullable||e.initialValueIsDefault)&&(ji(t)?this.defaultValue=t.value:this.defaultValue=t);}setValue(t,e={}){ae$2(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==false&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==false)),this.updateValueAndValidity(e);});}patchValue(t,e={}){this.setValue(t,e);}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,e?.emitEvent!==false&&this._events.next(new ge$1(this));}_updateValue(){}_anyControls(t){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t);}_unregisterOnChange(t){zi$1(this._onChange,t);}registerOnDisabledChange(t){this._onDisabledChange.push(t);}_unregisterOnDisabledChange(t){zi$1(this._onDisabledChange,t);}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(t){ji(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=t;}};var jr=n=>n instanceof cn$1;var Hr={provide:_e$1,useExisting:Eo$3(()=>Wr)},Hi$1=Promise.resolve(),Wr=(()=>{class n extends _e$1{_changeDetectorRef;callSetDisabledState;control=new cn$1;static ngAcceptInputType_isDisabled;_registered=false;viewModel;name="";isDisabled;model;options;update=new qe$3;constructor(e,i,r,o,s,l,d,h){super(d,h,o),this._changeDetectorRef=s,this.callSetDisabledState=l,this._parent=e,this._setValidators(i),this._setAsyncValidators(r);}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)});}this._setUpControl();}"isDisabled"in e&&this._updateDisabled(e),Pr(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model);}ngOnDestroy(){this.formDirective?.removeControl(this);}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){super.ngControlUpdate(e,false);}get shouldBindRequired(){return  false}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=true;}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn);}_isStandalone(){return !this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Li$1(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:false});}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Li$1(this.control,this,e));}_checkForErrors(){this._checkName();}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name;}_updateValue(e){Hi$1.then(()=>{this.control.setValue(e,{emitViewToModelChange:false}),this._changeDetectorRef?.markForCheck();});}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&PF(i);Hi$1.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck();});}_getPath(e){return this._parent?Or(e,this._parent):[e]}static \u0275fac=function(i){return new(i||n)(Ar$2(ie,9),Ar$2(nt$1,10),Ar$2(zt$2,10),Ar$2(Gi$1,10),Ar$2(kF,8),Ar$2(ot$2,8),Ar$2(le$2,8),Ar$2(CI,8))};static \u0275dir=CE({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:false,features:[zD([Hr,Lr]),Wp,Pm,ME(null)]})}return n})();var Gr=(()=>{class n extends ie{callSetDisabledState;get submitted(){return ae$2(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e);}_submitted=dt$6(()=>this._submittedReactive());_submittedReactive=Fe$3(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i);}ngOnChanges(e){this.onChanges(e);}ngOnDestroy(){this.onDestroy();}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(tt$2(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(e){let i=this.form.get(e.path);return e._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:false}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Bi$1(e.control||null,e,false),Tr(this.directives,e);}addFormGroup(e){this._setUpFormContainer(e);}removeFormGroup(e){this._cleanUpFormContainer(e);}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e);}removeFormArray(e){this._cleanUpFormContainer(e);}updateModel(e,i){this.form.get(e.path).setValue(i);}onReset(){this.resetForm();}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(false);}onSubmit(e){return this.submitted=true,dn$1(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Ke$1(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(Bi$1(i||null,e),jr(r)&&e._setupWithForm(r,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(e){let i=this.form.get(e.path);ln$1(i,e),i.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&kr(i,e)&&i.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){Gt$2(this.form,this),this._oldForm&&tt$2(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(i){return new(i||n)(Ar$2(nt$1,10),Ar$2(zt$2,10),Ar$2(ot$2,8))};static \u0275dir=CE({type:n,features:[Wp,Pm]})}return n})();var Ur={provide:ie,useExisting:Eo$3(()=>Yr$1)},Yr$1=(()=>{class n extends Gr{form=null;ngSubmit=new qe$3;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275dir=CE({type:n,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&ih("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[zD([Ur]),Wp]})}return n})();var qr=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=DE({type:n});static \u0275inj=su({})}return n})();var Jo$1=(()=>{class n{static withConfig(e){return {ngModule:n,providers:[{provide:ot$2,useValue:e.callSetDisabledState??Wt$1}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=DE({type:n});static \u0275inj=su({imports:[qr]})}return n})();var is$1=(()=>{class n{isErrorState(e,i){return !!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var hn$1=class hn{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;constructor(t,e,i,r,o){this._defaultMatcher=t,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o;}updateErrorState(){let t=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??false;o!==t&&(this.errorState=o,this._stateChanges.next());}};var Xr$1=20,st$1=(()=>{class n{_ngZone=T$3(ue$1);_platform=T$3(A$2);_renderer=T$3(vr$3).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new ne$3;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)));}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e));}scrolled(e=Xr$1){return this._platform.isBrowser?new N$5(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(wg(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0);}}):ag()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete();}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(Xt$5(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._targetContainsElement(o,e)&&i.push(o);}),i}_targetContainsElement(e,i){let r=k$4(i),o=e.getElementRef().nativeElement;do if(r==o)return  true;while(r=r.parentElement);return  false}static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),$r=(()=>{class n{elementRef=T$3(Tr$2);scrollDispatcher=T$3(st$1);ngZone=T$3(ue$1);dir=T$3(ea,{optional:true});_scrollElement=this.elementRef.nativeElement;_destroyed=new ne$3;_renderer=T$3(CI);_cleanupScroll;_elementScrolled=new ne$3;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this);}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete();}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&Ql()!=Ze$1.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),Ql()==Ze$1.INVERTED?e.left=e.right:Ql()==Ze$1.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e);}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;ql()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left));}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:i:e=="end"&&(e=s?i:r),s&&Ql()==Ze$1.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Ql()==Ze$1.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return n})(),Zr$1=20,Fe$1=(()=>{class n{_platform=T$3(A$2);_listeners;_viewportSize=null;_change=new ne$3;_document=T$3(ir$4);constructor(){let e=T$3(ue$1),i=T$3(vr$3).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)];}this.change().subscribe(()=>this._viewportSize=null);});}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete();}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return {top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return {top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,l=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return {top:s,left:l}}change(e=Zr$1){return e>0?this._change.pipe(wg(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0};}static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();var Ve$1=class Ve{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach());}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t;}},Ut$2=class Ut extends Ve$1{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(t,e,i,r,o,s){super(),this.component=t,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null,this.directives=s||null;}},Ae$1=class Ae extends Ve$1{templateRef;viewContainerRef;context;injector;constructor(t,e,i,r){super(),this.templateRef=t,this.viewContainerRef=e,this.context=i,this.injector=r;}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}},Yt$2=class Yt extends Ve$1{element;constructor(t){super(),this.element=t instanceof Tr$2?t.nativeElement:t;}},at$2=class at{_attachedPortal=null;_disposeFn=null;_isDisposed=false;hasAttached(){return !!this._attachedPortal}attach(t){if(t instanceof Ut$2)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof Ae$1)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Yt$2)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn();}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=true;}setDisposeFn(t){this._disposeFn=t;}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null);}},lt$1=class lt extends at$2{outletElement;_appRef;_defaultInjector;constructor(t,e,i){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=i;}attachComponentPortal(t){let e;if(t.viewContainerRef){let i=t.injector||t.viewContainerRef.injector,r=i.get(Cn$3,null,{optional:true})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),this.setDisposeFn(()=>e.destroy());}else {let i=this._appRef,r=t.injector||this._defaultInjector||le$2.NULL,o=r.get(ce$3,i.injector);e=jF(t.component,{elementInjector:r,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy();});}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,i=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r);}),this._attachedPortal=t,i}attachDomPortal=t=>{let e=t.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i);});};dispose(){super.dispose(),this.outletElement.remove();}_getComponentRootNode(t){return t.hostView.rootNodes[0]}};var Ps=(()=>{class n extends at$2{_moduleRef=T$3(Cn$3,{optional:true});_document=T$3(ir$4);_viewContainerRef=T$3(Li$4);_isInitialized=false;_attachedRef=null;get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null);}attached=new qe$3;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=true;}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null;}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r);});};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ey(n)))(r||n)}})();static \u0275dir=CE({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Wp]})}return n})();var un$1=ql();function Qr$1(n){return new dt$1(n.get(Fe$1),n.get(ir$4))}var dt$1=class dt{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=false;_document;constructor(t,e){this._viewportRuler=t,this._document=e;}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=lm(-this._previousScrollPosition.left),t.style.top=lm(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=true;}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,i=t.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=false,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),un$1&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),un$1&&(i.scrollBehavior=o,r.scrollBehavior=s);}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return  false;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};var ct$1=class ct{enable(){}disable(){}attach(){}};function qt$1(n,t){return t.some(e=>{let i=n.bottom<e.top,r=n.top>e.bottom,o=n.right<e.left,s=n.left>e.right;return i||r||o||s})}function fn$1(n,t){return t.some(e=>{let i=n.top<e.top,r=n.bottom>e.bottom,o=n.left<e.left,s=n.right>e.right;return i||r||o||s})}function yn(n,t){return new ht$1(n.get(st$1),n.get(Fe$1),n.get(ue$1),t)}var ht$1=class ht{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,i,r){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=i,this._config=r;}attach(t){this._overlayRef,this._overlayRef=t;}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();qt$1(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()));}});}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null);}detach(){this.disable(),this._overlayRef=null;}};var ke$2=class ke{positionStrategy;scrollStrategy=new ct$1;panelClass="";hasBackdrop=false;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=false;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let i of e)t[i]!==void 0&&(this[i]=t[i]);}}};var ut$1=class ut{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e;}};var bn$1=(()=>{class n{_attachedOverlays=[];_document=T$3(ir$4);_isAttached=false;ngOnDestroy(){this.detach();}add(e){this.remove(e),this._attachedOverlays.push(e);}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach();}canReceiveEvent(e,i,r){return r.observers.length<1?false:e.eventPredicate?e.eventPredicate(i):true}static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),Cn$1=(()=>{class n extends bn$1{_ngZone=T$3(ue$1);_renderer=T$3(vr$3).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener);}),this._isAttached=true);}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=false);}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),xn$1=(()=>{class n extends bn$1{_platform=T$3(A$2);_ngZone=T$3(ue$1);_renderer=T$3(vr$3).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=false;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:true},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=true),this._isAttached=true;}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=false),this._isAttached=false);}_pointerDownListener=e=>{this._pointerDownEventTarget=N$4(e);};_clickListener=e=>{let i=N$4(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let l=o[s],d=l._outsidePointerEvents;if(!(!l.hasAttached()||!this.canReceiveEvent(l,e,d))){if(mn$1(l.overlayElement,i)||mn$1(l.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>d.next(e)):d.next(e);}}};static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})();function mn$1(n,t){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=t;for(;i;){if(i===n)return  true;i=e&&i instanceof ShadowRoot?i.host:i.parentNode;}return  false}var wn$1=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=IE({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2})}return n})(),Sn$1=(()=>{class n{_platform=T$3(A$2);_containerElement;_document=T$3(ir$4);_styleLoader=T$3($$5);ngOnDestroy(){this._containerElement?.remove();}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||tm()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove();}let i=this._document.createElement("div");i.classList.add(e),tm()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i;}_loadStyles(){this._styleLoader.load(wn$1);}static \u0275fac=function(i){return new(i||n)};static \u0275prov=wr$2({token:n,factory:n.\u0275fac})}return n})(),Xt$1=class Xt{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,i,r){this._renderer=e,this._ngZone=i,this.element=t.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r);}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents="none",t.classList.remove("cdk-overlay-backdrop-showing");});}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove();}};function Zt$1(n){return n&&n.nodeType===1}var ft$1=class ft{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new ne$3;_attachments=new ne$3;_detachments=new ne$3;_positionStrategy;_scrollStrategy;_locationChanges=G$4.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=false;_previousHostParent;_keydownEvents=new ne$3;_outsidePointerEvents=new ne$3;_afterNextRenderRef;constructor(t,e,i,r,o,s,l,d,h,c=false,u,S){this._portalOutlet=t,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=l,this._location=d,this._outsideClickDispatcher=h,this._animationsDisabled=c,this._injector=u,this._renderer=S,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy;}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Wf(()=>{this.hasAttached()&&this.updatePosition();},{injector:this._injector}),this._togglePointerEvents(true),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,true),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()));}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(false),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=true;}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply();}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()));}updateSize(t){this._config=w$3(w$3({},this._config),t),this._updateElementSize();}setDirection(t){this._config=x$2(w$3({},this._config),{direction:t}),this._updateElementDirection();}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,true);}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,false);}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()));}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection());}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=lm(this._config.width),t.height=lm(this._config.height),t.minWidth=lm(this._config.minWidth),t.minHeight=lm(this._config.minHeight),t.maxWidth=lm(this._config.maxWidth),t.maxHeight=lm(this._config.maxHeight);}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none";}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Zt$1(t)?t.after(this._host):t?.type==="parent"?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host);}if(this._config.usePopover)try{this._host.showPopover();}catch(t){}}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Xt$1(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e);}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,true),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t));}):this._backdropRef.element.classList.add(t);}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host);}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach();}_toggleClasses(t,e,i){let r=an$3(e||[]).filter(o=>!!o);r.length&&(i?t.classList.add(...r):t.classList.remove(...r));}_detachContentWhenEmpty(){let t=false;try{this._detachContentAfterRenderRef=Wf(()=>{t=!0,this._detachContent();},{injector:this._injector});}catch(e){if(t)throw e;this._detachContent();}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent();}),this._detachContentMutationObserver.observe(this._pane,{childList:true}));}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,false),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent());}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect();}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.();}},pn="cdk-overlay-connected-position-bounding-box",Kr=/([A-Za-z%]+)$/;function Dn(n,t){return new mt$1(t,n.get(Fe$1),n.get(ir$4),n.get(A$2),n.get(Sn$1))}var mt$1=class mt{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=false;_lastBoundingBoxSize={width:0,height:0};_isPushed=false;_canPush=true;_growAfterOpen=false;_hasFlexibleDimensions=true;_positionLocked=false;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=false;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new ne$3;_resizeSubscription=G$4.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(t);}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(pn),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=false,this._isInitialRender=true,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=true,this.apply();});}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let l of this._preferredPositions){let d=this._getOriginPoint(t,r,l),h=this._getOverlayPoint(d,e,l),c=this._getOverlayFit(h,e,i,l);if(c.isCompletelyWithinViewport){this._isPushed=false,this._applyPosition(l,d);return}if(this._canFitWithFlexibleDimensions(c,h,i)){o.push({position:l,origin:d,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(d,l)});continue}(!s||s.overlayFit.visibleArea<c.visibleArea)&&(s={overlayFit:c,overlayPoint:h,originPoint:d,position:l,overlayRect:e});}if(o.length){let l=null,d=-1;for(let h of o){let c=h.boundingBoxRect.width*h.boundingBoxRect.height*(h.position.weight||1);c>d&&(d=c,l=h);}this._isPushed=false,this._applyPosition(l.position,l.origin);return}if(this._canPush){this._isPushed=true,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint);}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe();}dispose(){this._isDisposed||(this._boundingBox&&ne$1(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(pn),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=true);}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply();}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=true){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=true){return this._growAfterOpen=t,this}withPush(t=true){return this._canPush=t,this}withLockedPosition(t=true){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof Tr$2?this._origin.nativeElement:Zt$1(this._origin)?this._origin:null}_getOriginPoint(t,e,i){let r;if(i.originX=="center")r=t.left+t.width/2;else {let s=this._isRtl()?t.right:t.left,l=this._isRtl()?t.left:t.right;r=i.originX=="start"?s:l;}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=t.top+t.height/2:o=i.originY=="top"?t.top:t.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(t,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:t.x+r,y:t.y+o}}_getOverlayFit(t,e,i,r){let o=_n(e),{x:s,y:l}=t,d=this._getOffset(r,"x"),h=this._getOffset(r,"y");d&&(s+=d),h&&(l+=h);let c=0-s,u=s+o.width-i.width,S=0-l,M=l+o.height-i.height,D=this._subtractOverflows(o.width,c,u),P=this._subtractOverflows(o.height,S,M),Kt=D*P;return {visibleArea:Kt,isCompletelyWithinViewport:o.width*o.height===Kt,fitsInViewportVertically:P===o.height,fitsInViewportHorizontally:D==o.width}}_canFitWithFlexibleDimensions(t,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=gn$1(this._overlayRef.getConfig().minHeight),l=gn$1(this._overlayRef.getConfig().minWidth),d=t.fitsInViewportVertically||s!=null&&s<=r,h=t.fitsInViewportHorizontally||l!=null&&l<=o;return d&&h}return  false}_pushOverlayOnScreen(t,e,i){if(this._previousPushAmount&&this._positionLocked)return {x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let r=_n(e),o=this._viewportRect,s=Math.max(t.x+r.width-o.width,0),l=Math.max(t.y+r.height-o.height,0),d=Math.max(o.top-i.top-t.y,0),h=Math.max(o.left-i.left-t.x,0),c=0,u=0;return r.width<=o.width?c=h||-s:c=t.x<this._getViewportMarginStart()?o.left-i.left-t.x:0,r.height<=o.height?u=d||-l:u=t.y<this._getViewportMarginTop()?o.top-i.top-t.y:0,this._previousPushAmount={x:c,y:u},{x:t.x+c,y:t.y+u}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!Jr$1(this._lastScrollVisibility,i)){let r=new ut$1(t,i);this._positionChanges.next(r);}this._lastScrollVisibility=i;}this._lastPosition=t,this._isInitialRender=false;}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=t.overlayY;t.overlayX==="center"?i="center":this._isRtl()?i=t.overlayX==="start"?"right":"left":i=t.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`;}_calculateBoundingBoxRect(t,e){let i=this._viewportRect,r=this._isRtl(),o,s,l;if(e.overlayY==="top")s=t.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")l=i.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-l+this._getViewportMarginTop();else {let M=Math.min(i.bottom-t.y+i.top,t.y),D=this._lastBoundingBoxSize.height;o=M*2,s=t.y-M,o>D&&!this._isInitialRender&&!this._growAfterOpen&&(s=t.y-D/2);}let d=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,h=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,c,u,S;if(h)S=i.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),c=t.x-this._getViewportMarginStart();else if(d)u=t.x,c=i.right-t.x-this._getViewportMarginEnd();else {let M=Math.min(i.right-t.x+i.left,t.x),D=this._lastBoundingBoxSize.width;c=M*2,u=t.x-M,c>D&&!this._isInitialRender&&!this._growAfterOpen&&(u=t.x-D/2);}return {top:s,left:u,bottom:l,right:S,width:c,height:o}}_setBoundingBoxStyles(t,e){let i=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else {let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=lm(i.width),r.height=lm(i.height),r.top=lm(i.top)||"auto",r.bottom=lm(i.bottom)||"auto",r.left=lm(i.left)||"auto",r.right=lm(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=lm(o)),s&&(r.maxWidth=lm(s));}this._lastBoundingBoxSize=i,ne$1(this._boundingBox.style,r);}_resetBoundingBoxStyles(){ne$1(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""});}_resetOverlayElementStyles(){ne$1(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""});}_setOverlayElementStyles(t,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let c=this._viewportRuler.getViewportScrollPosition();ne$1(i,this._getExactOverlayY(e,t,c)),ne$1(i,this._getExactOverlayX(e,t,c));}else i.position="static";let l="",d=this._getOffset(e,"x"),h=this._getOffset(e,"y");d&&(l+=`translateX(${d}px) `),h&&(l+=`translateY(${h}px)`),i.transform=l.trim(),s.maxHeight&&(r?i.maxHeight=lm(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=lm(s.maxWidth):o&&(i.maxWidth="")),ne$1(this._pane.style,i);}_getExactOverlayY(t,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),t.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`;}else r.top=lm(o.y);return r}_getExactOverlayX(t,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=t.overlayX==="end"?"left":"right":s=t.overlayX==="end"?"right":"left",s==="right"){let l=this._document.documentElement.clientWidth;r.right=`${l-(o.x+this._overlayRect.width)}px`;}else r.left=lm(o.x);return r}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return {isOriginClipped:fn$1(t,i),isOriginOutsideView:qt$1(t,i),isOverlayClipped:fn$1(e,i),isOverlayOutsideView:qt$1(e,i)}}_subtractOverflows(t,...e){return e.reduce((i,r)=>i-Math.max(r,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return {top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+t-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return !this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&an$3(t).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e));});}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t);}),this._appliedPanelClasses=[]);}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof Tr$2)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,i=t.height||0;return {top:t.y,bottom:t.y+i,left:t.x,right:t.x+e,height:i,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();t&&(e.style.display="block");let i=e.getBoundingClientRect();return t&&(e.style.display=""),i}};function ne$1(n,t){for(let e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}function gn$1(n){if(typeof n!="number"&&n!=null){let[t,e]=n.split(Kr);return !e||e==="px"?parseFloat(t):null}return n||null}function _n(n){return {top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function Jr$1(n,t){return n===t?true:n.isOriginClipped===t.isOriginClipped&&n.isOriginOutsideView===t.isOriginOutsideView&&n.isOverlayClipped===t.isOverlayClipped&&n.isOverlayOutsideView===t.isOverlayOutsideView}var vn$1="cdk-global-overlay-wrapper";function eo(n){return new pt$1}var pt$1=class pt{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=false;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(vn$1),this._isDisposed=false;}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:l}=i,d=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),h=(o==="100%"||o==="100vh")&&(!l||l==="100%"||l==="100vh"),c=this._xPosition,u=this._xOffset,S=this._overlayRef.getConfig().direction==="rtl",M="",D="",P="";d?P="flex-start":c==="center"?(P="center",S?D=u:M=u):S?c==="left"||c==="end"?(P="flex-end",M=u):(c==="right"||c==="start")&&(P="flex-start",D=u):c==="left"||c==="start"?(P="flex-start",M=u):(c==="right"||c==="end")&&(P="flex-end",D=u),t.position=this._cssPosition,t.marginLeft=d?"0":M,t.marginTop=h?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=d?"0":D,e.justifyContent=P,e.alignItems=h?"flex-start":this._alignItems;}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(vn$1),i.justifyContent=i.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=true;}};var Qt$2=new S$2("OVERLAY_DEFAULT_CONFIG");function En(n,t){n.get($$5).load(wn$1);let e=n.get(Sn$1),i=n.get(ir$4),r=n.get(hn$3),o=n.get(Fi$4),s=n.get(ea),l=n.get(CI,null,{optional:true})||n.get(vr$3).createRenderer(null,null),d=new ke$2(t),h=n.get(Qt$2,null,{optional:true})?.usePopover??true;d.direction=d.direction||s.value,"showPopover"in i.body?d.usePopover=t?.usePopover??h:d.usePopover=false;let c=i.createElement("div"),u=i.createElement("div");c.id=r.getId("cdk-overlay-"),c.classList.add("cdk-overlay-pane"),u.appendChild(c),d.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let S=d.usePopover?d.positionStrategy?.getPopoverInsertionPoint?.():null;return Zt$1(S)?S.after(u):S?.type==="parent"?S.element.appendChild(u):e.getContainerElement().appendChild(u),new ft$1(new lt$1(c,o,n),u,c,d,n.get(ue$1),n.get(Cn$1),i,n.get(sr$3),n.get(xn$1),t?.disableAnimations??n.get(Im,null,{optional:true})==="NoopAnimations",n.get(ce$3),l)}var to$1=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],io$1=new S$2("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let n=T$3(le$2);return ()=>yn(n)}}),$t$2=(()=>{class n{elementRef=T$3(Tr$2);static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return n})(),Mn=new S$2("cdk-connected-overlay-default-config"),no$1=(()=>{class n{_dir=T$3(ea,{optional:true});_injector=T$3(le$2);_overlayRef;_templatePortal;_backdropSubscription=G$4.EMPTY;_attachSubscription=G$4.EMPTY;_detachSubscription=G$4.EMPTY;_positionSubscription=G$4.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=T$3(io$1);_ngZone=T$3(ue$1);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position);}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position);}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=false;disableClose=false;transformOriginSelector;hasBackdrop=false;lockPosition=false;flexibleDimensions=false;growAfterOpen=false;push=false;disposeOnNavigation=false;usePopover;matchWidth=false;set _config(e){typeof e!="string"&&this._assignConfig(e);}backdropClick=new qe$3;positionChange=new qe$3;attach=new qe$3;detach=new qe$3;overlayKeydown=new qe$3;overlayOutsideClick=new qe$3;constructor(){let e=T$3(yr$2),i=T$3(Li$4),r=T$3(Mn,{optional:true}),o=T$3(Qt$2,{optional:true});this.usePopover=o?.usePopover===false?null:"global",this._templatePortal=new Ae$1(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r);}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose();}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay());}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=to$1);let e=this._overlayRef=En(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!Yr$2(i)&&(i.preventDefault(),this.detachOverlay());}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=N$4(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i);});}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new ke$2({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return (this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=Dn(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof $t$2?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof $t$2?this.origin.elementRef.nativeElement:this.origin instanceof Tr$2?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(kg(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe();})),this.open=true;}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=false;}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth;}static \u0275fac=function(i){return new(i||n)};static \u0275dir=CE({type:n,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",PF],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",PF],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",PF],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",PF],push:[2,"cdkConnectedOverlayPush","push",PF],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",PF],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",PF],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Pm]})}return n})();var gr={backendUrl:"https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/"};var le=0;function Ct(){return le}function M(r,e){return (...t)=>{try{return le=e,r(...t)}finally{le=0;}}}function At$1(r){return !r}function st(r){return r}function p(r){return Array.isArray(r)}function $$1(r){return (typeof r=="object"||typeof r=="function")&&r!=null}var w=Symbol(),ee=Symbol(),K$2=class K{predicates;fns=[];constructor(e){this.predicates=e;}push(e){this.fns.push(ot$1(this.predicates,e));}mergeIn(e){let t=this.predicates?e.fns.map(n=>ot$1(this.predicates,n)):e.fns;this.fns.push(...t);}hasRules(){return this.fns.length>0}},z=class extends K$2{get defaultValue(){return  false}compute(e){return this.fns.some(t=>{let n=t(e);return n&&n!==ee})}},T$1=class r extends K$2{ignore;static ignoreNull(e){return new r(e,t=>t===null)}constructor(e,t){super(e),this.ignore=t;}get defaultValue(){return []}compute(e){return this.fns.reduce((t,n)=>{let i=n(e);return i===void 0||i===ee?t:p(i)?[...t,...this.ignore?i.filter(s=>!this.ignore(s)):i]:this.ignore&&this.ignore(i)?t:[...t,i]},[])}},ce$1=class ce extends T$1{constructor(e){super(e,void 0);}},he=class extends K$2{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(e,t){super(e),this.key=t;}compute(e){if(this.fns.length===0)return this.key.reducer.getInitial();let t=this.key.reducer.getInitial();for(let n=0;n<this.fns.length;n++){let i=this.fns[n](e);i!==ee&&(t=this.key.reducer.reduce(t,i));}return t}};function ot$1(r,e){return r.length===0?e:t=>{for(let n of r){let i=t.stateOf(n.path),s=ae$2(i.structure.pathKeys).length-n.depth;for(let o=0;o<s;o++)i=i.structure.parent;if(!n.fn(i.context))return ee}return e(t)}}var D=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(e){this.predicates=e,this.hidden=new z(e),this.disabledReasons=new ce$1(e),this.readonly=new z(e),this.syncErrors=T$1.ignoreNull(e),this.syncTreeErrors=T$1.ignoreNull(e),this.asyncErrors=T$1.ignoreNull(e);}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(e){return this.metadata.has(e)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(e){return this.metadata.has(e)||this.metadata.set(e,new he(this.predicates,e)),this.metadata.get(e)}mergeIn(e){this.hidden.mergeIn(e.hidden),this.disabledReasons.mergeIn(e.disabledReasons),this.readonly.mergeIn(e.readonly),this.syncErrors.mergeIn(e.syncErrors),this.syncTreeErrors.mergeIn(e.syncTreeErrors),this.asyncErrors.mergeIn(e.asyncErrors);for(let t of e.getMetadataKeys()){let n=e.metadata.get(t);this.getMetadata(t).mergeIn(n);}}},W=class{depth;constructor(e){this.depth=e;}build(){return new Y$1(this,[],0)}},C$1=class r extends W{constructor(e){super(e);}current;all=[];addHiddenRule(e){this.getCurrent().addHiddenRule(e);}addDisabledReasonRule(e){this.getCurrent().addDisabledReasonRule(e);}addReadonlyRule(e){this.getCurrent().addReadonlyRule(e);}addSyncErrorRule(e){this.getCurrent().addSyncErrorRule(e);}addSyncTreeErrorRule(e){this.getCurrent().addSyncTreeErrorRule(e);}addAsyncErrorRule(e){this.getCurrent().addAsyncErrorRule(e);}addMetadataRule(e,t){this.getCurrent().addMetadataRule(e,t);}getChild(e){if(e===w){let t=this.getCurrent().children;t.size>(t.has(w)?1:0)&&(this.current=void 0);}return this.getCurrent().getChild(e)}hasLogic(e){return this===e?true:this.all.some(({builder:t})=>t.hasLogic(e))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:e})=>e.anyChildHasLogic())}mergeIn(e,t){t?this.all.push({builder:e,predicate:{fn:M(t.fn,this.depth),path:t.path}}):this.all.push({builder:e}),this.current=void 0;}getCurrent(){return this.current===void 0&&(this.current=new j$1(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new r(0)}},j$1=class j extends W{logic=new D([]);children=new Map;constructor(e){super(e);}addHiddenRule(e){this.logic.hidden.push(M(e,this.depth));}addDisabledReasonRule(e){this.logic.disabledReasons.push(M(e,this.depth));}addReadonlyRule(e){this.logic.readonly.push(M(e,this.depth));}addSyncErrorRule(e){this.logic.syncErrors.push(M(e,this.depth));}addSyncTreeErrorRule(e){this.logic.syncTreeErrors.push(M(e,this.depth));}addAsyncErrorRule(e){this.logic.asyncErrors.push(M(e,this.depth));}addMetadataRule(e,t){this.logic.getMetadata(e).push(M(t,this.depth));}getChild(e){return this.children.has(e)||this.children.set(e,new C$1(this.depth+1)),this.children.get(e)}hasLogic(e){return this===e}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let e of this.children.values())if(e.hasRules())return  true;return  false}},Y$1=class r{builder;predicates;depth;logic;constructor(e,t,n){this.builder=e,this.predicates=t,this.depth=n,this.logic=e?It$1(e,t,n):new D([]);}getChild(e){let t=this.builder?ut(this.builder,e):[];if(t.length===0)return new r(void 0,[],this.depth+1);if(t.length===1){let{builder:n,predicates:i}=t[0];return new r(n,[...this.predicates,...i.map(s=>me(s,this.depth))],this.depth+1)}else {let n=t.map(({builder:i,predicates:s})=>new r(i,[...this.predicates,...s.map(o=>me(o,this.depth))],this.depth+1));return new fe$1(n)}}hasLogic(e){return this.builder?this.builder.hasLogic(e):false}hasRules(){return this.builder?this.builder.hasRules():false}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():false}},fe$1=class r{all;logic;constructor(e){this.all=e,this.logic=new D([]);for(let t of e)this.logic.mergeIn(t.logic);}getChild(e){return new r(this.all.flatMap(t=>t.getChild(e)))}hasLogic(e){return this.all.some(t=>t.hasLogic(e))}hasRules(){return this.all.some(e=>e.hasRules())}anyChildHasLogic(){return this.all.some(e=>e.anyChildHasLogic())}};function ut(r,e){if(r instanceof C$1)return r.all.flatMap(({builder:t,predicate:n})=>{let i=ut(t,e);return n?i.map(({builder:s,predicates:o})=>({builder:s,predicates:[...o,n]})):i});if(r instanceof j$1)return [...e!==w&&r.children.has(w)?[{builder:r.getChild(w),predicates:[]}]:[],...r.children.has(e)?[{builder:r.getChild(e),predicates:[]}]:[]];throw new b$4(1909,false)}function It$1(r,e,t){let n=new D(e);if(r instanceof C$1){let i=r.all.map(({builder:s,predicate:o})=>new Y$1(s,o?[...e,me(o,t)]:e,t));for(let s of i)n.mergeIn(s.logic);}else if(r instanceof j$1)n.mergeIn(r.logic);else throw new b$4(1909,false);return n}function me(r,e){return x$2(w$3({},r),{depth:e})}var lt=Symbol("PATH"),b$2=class r{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,kt);logicBuilder;constructor(e,t,n,i){this.keys=e,this.parent=n,this.keyInParent=i,this.root=t??this,n||(this.logicBuilder=C$1.newRoot());}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(e){return this.children.has(e)||this.children.set(e,new r([...this.keys,e],this.root,this,e)),this.children.get(e)}mergeIn(e,t){let n=e.compile();this.builder.mergeIn(n.builder,t);}static unwrapFieldPath(e){return e[lt]}static newRoot(){return new r([],void 0,void 0,void 0)}},kt={get(r,e){return e===lt?r:r.getChild(e).fieldPathProxy}},q$2,L=new Map,X$1=class r{schemaFn;constructor(e){this.schemaFn=e;}compile(){if(L.has(this))return L.get(this);let e=b$2.newRoot();L.set(this,e);let t=q$2;try{q$2=e,this.schemaFn(e.fieldPathProxy);}finally{q$2=t;}return e}static create(e){return e instanceof r?e:new r(e)}static rootCompile(e){try{return L.clear(),e===void 0?b$2.newRoot():e instanceof r?e.compile():new r(e).compile()}finally{L.clear();}}};function Pt$1(r){return r instanceof X$1||typeof r=="function"}function te(r){if(q$2!==b$2.unwrapFieldPath(r).root)throw new b$4(1908,false)}function B$1(r,e,t){return te(r),b$2.unwrapFieldPath(r).builder.addMetadataRule(e,t),e}var A={list(){return {reduce:(r,e)=>e===void 0?r:[...r,e],getInitial:()=>[]}},min(){return {reduce:(r,e)=>r===void 0||e===void 0?r??e:e<r?e:r,getInitial:()=>{}}},max(){return {reduce:(r,e)=>r===void 0||e===void 0?r??e:e>r?e:r,getInitial:()=>{}}},or(){return {reduce:(r,e)=>r||e,getInitial:()=>false}},and(){return {reduce:(r,e)=>r&&e,getInitial:()=>true}},override:Ft};function Ft(r){return {reduce:(e,t)=>t,getInitial:()=>r?.()}}var Re=Symbol("IS_ASYNC_VALIDATION_RESOURCE"),Z$1=class Z{reducer;create;brand;[Re];constructor(e,t){this.reducer=e,this.create=t;}};function v(r){return new Z$1(r??A.override())}function Te(){return v()}var De$1=v(A.or()),ct=Te();var ht=Te();var ft=v(A.max()),Ce=v(A.min()),mt=v(A.list());function g$1(r,e){if(r===e)return  true;if(!r||!e||r.length!==e.length)return  false;for(let t=0;t<r.length;t++)if(!Object.is(r[t],e[t]))return  false;return  true}function Ot$1(r){return r.errors().length>0?"invalid":r.pending()?"unknown":"valid"}var ge=class{node;constructor(e){this.node=e;}rawSyncTreeErrors=dt$6(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:g$1});syncErrors=dt$6(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),..._t(this.node.submitState.submissionErrors())],{equal:g$1});syncValid=dt$6(()=>this.shouldSkipValidation()?true:this.node.structure.reduceChildren(this.syncErrors().length===0,(e,t)=>t&&e.validationState.syncValid(),At$1));syncTreeErrors=dt$6(()=>this.rawSyncTreeErrors().filter(e=>e.fieldTree===this.node.fieldTree),{equal:g$1});rawAsyncErrors=dt$6(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:g$1});asyncErrors=dt$6(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(e=>e==="pending"||e.fieldTree===this.node.fieldTree),{equal:g$1});parseErrors=dt$6(()=>this.node.formFieldBindings().flatMap(e=>e.parseErrors()),{equal:g$1});errors=dt$6(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(e=>e!=="pending")],{equal:g$1});errorSummary=dt$6(()=>{let e=this.node.structure.reduceChildren(this.errors(),(t,n)=>[...n,...t.errorSummary()]);return ae$2(()=>e.sort(Vt)),e},{equal:g$1});pending=dt$6(()=>this.node.structure.reduceChildren(this.asyncErrors().includes("pending"),(e,t)=>t||e.validationState.asyncErrors().includes("pending")));status=dt$6(()=>{if(this.shouldSkipValidation())return "valid";let e=Ot$1(this);return this.node.structure.reduceChildren(e,(t,n)=>n==="invalid"||t.validationState.status()==="invalid"?"invalid":n==="unknown"||t.validationState.status()==="unknown"?"unknown":"valid",t=>t==="invalid")});valid=dt$6(()=>this.status()==="valid");invalid=dt$6(()=>this.status()==="invalid");shouldSkipValidation=dt$6(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function _t(r){return r===void 0?[]:p(r)?r:[r]}function Ae(r,e){if(p(r))for(let t of r)t.fieldTree??=e;else r&&(r.fieldTree??=e);return r}function at$1(r){return r.formField?r.formField.element:r.fieldTree().formFieldBindings().reduce((e,t)=>!e||!t.element?e??t.element:e.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t.element:e,void 0)}function Vt(r,e){let t=at$1(r),n=at$1(e);return t===n?0:t===void 0||n===void 0?t===void 0?1:-1:t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var ye=v(),pe=class{node;cache=new WeakMap;constructor(e){this.node=e,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this);}resolve(e){if(!this.cache.has(e)){let t=dt$6(()=>{let n=b$2.unwrapFieldPath(e),i=this.node,s=Ct();for(;s>0||!i.structure.logic.hasLogic(n.root.builder);)if(s--,i=i.structure.parent,i===void 0)throw new b$4(1900,false);for(let o of n.keys)if(i=i.structure.getChild(o),i===void 0)throw new b$4(1901,false);return i.fieldTree});this.cache.set(e,t);}return this.cache.get(e)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=dt$6(()=>{let e=this.key();if(!p(ae$2(this.node.structure.parent.value)))throw new b$4(1906,false);return Number(e)});fieldTreeOf(e){return this.resolve(e)}stateOf(e){return this.resolve(e)()}valueOf=e=>{let t=this.resolve(e)().value();if(t instanceof Je$1)throw new b$4(1907,false);return t}},be=class{node;metadata=new Map;constructor(e){this.node=e;}runMetadataCreateLifecycle(){this.node.logicNode.logic.hasMetadataKeys()&&ae$2(()=>No$3(this.node.structure.injector,()=>{for(let e of this.node.logicNode.logic.getMetadataKeys())if(e.create){let t=this.node.logicNode.logic.getMetadata(e),n=e.create(this.node,dt$6(()=>t.compute(this.node.context)));this.metadata.set(e,n);}}));}get(e){if(this.has(e)&&!this.metadata.has(e)){if(e.create)throw new b$4(1912,false);let t=this.node.logicNode.logic.getMetadata(e);this.metadata.set(e,dt$6(()=>t.compute(this.node.context)));}return this.metadata.get(e)}has(e){return this.node.logicNode.logic.hasMetadata(e)}},Lt={get(r,e,t){let n=r(),i=n.structure.getChild(e);if(i!==void 0)return i.fieldTree;let s=ae$2(n.value);if(p(s)){if(e==="length")return n.value().length;if(e===Symbol.iterator)return ()=>(n.value(),Array.prototype[Symbol.iterator].apply(n.fieldTree))}if($$1(s)&&e===Symbol.iterator)return function*(){for(let o in t)yield [o,t[o]];}},getOwnPropertyDescriptor(r,e){let t=ae$2(r().value),n=Reflect.getOwnPropertyDescriptor(t,e);return n&&!n.configurable&&(n.configurable=true),n},ownKeys(r){let e=ae$2(r().value);return typeof e=="object"&&e!==null?Reflect.ownKeys(e):[]}};function Kt$1(r,e){let t=dt$6(()=>r()[e()]);return t[F$4]=r[F$4],t.set=n=>{Object.is(ae$2(t),n)||r.update(i=>jt$1(i,n,e()));},t.update=n=>{t.set(n(ae$2(t)));},t.asReadonly=()=>t,t}function jt$1(r,e,t){if(p(r)){let n=[...r];return n[t]=e,n}else return x$2(w$3({},r),{[t]:e})}var R=Symbol(""),gt=dt$6(()=>false),Q$2=class Q{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=le$2.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(e,t,n){this.logic=e,this.node=t,this.createChildNode=n;}children(){this.ensureChildrenMap();let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>ae$2(t.reader))}materializedChildren(){let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>t.node)}_areChildrenMaterialized(){return ae$2(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||ae$2(()=>{this.childrenMap.update(e=>this.computeChildrenMap(this.value(),e,true));});}getChild(e){this.ensureChildrenMap();let t=e.toString(),n=ae$2(this.childrenMap)?.byPropertyKey.get(t)?.reader;return n||(n=this.createReader(t)),n()}reduceChildren(e,t,n){let i=this.childrenMap();if(!i)return e;let s=e;for(let o of i.byPropertyKey.values()){if(n?.(s))break;s=t(ae$2(o.reader),s);}return s}destroy(){this.injector.destroy();}createKeyOrOrphanSignals(e,t,n){if(e==="root")return {keyInParent:yt,isOrphaned:gt};let i=this.parent,s=n,o=dt$6(()=>{if(i.structure.isOrphaned())return R;let c=i.structure.childrenMap();if(!c)return R;let f=c.byPropertyKey.get(s);if(f&&f.node===this.node)return s;if(t===void 0)return R;for(let[P,ie]of c.byPropertyKey)if(ie.node===this.node)return s=P;return R}),d=dt$6(()=>o()===R);return {keyInParent:dt$6(()=>{let c=o();if(c===R)throw t===void 0?new b$4(-1902,false):new b$4(1904,false);return c}),isOrphaned:d}}createChildrenMap(){return Yc({source:this.value,computation:(e,t)=>this.computeChildrenMap(e,t?.value,false)})}computeChildrenMap(e,t,n){if(!$$1(e)||!n&&t===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;t??={byPropertyKey:new Map};let i,s=p(e);t!==void 0&&(s?i=Bt(t,e,this.identitySymbol):i=Ut$1(t,e));for(let o of Object.keys(e)){let d,u=e[o];if(u===void 0){t.byPropertyKey.has(o)&&(i??=w$3({},t),i.byPropertyKey.delete(o));continue}s&&$$1(u)&&!p(u)&&(d=u[this.identitySymbol]??=Symbol(""));let c;d&&(t.byTrackingKey?.has(d)||(i??=w$3({},t),i.byTrackingKey??=new Map,i.byTrackingKey.set(d,this.createChildNode(o,d,s))),c=(i??t).byTrackingKey.get(d));let f=t.byPropertyKey.get(o);f===void 0?(i??=w$3({},t),i.byPropertyKey.set(o,{reader:this.createReader(o),node:c??this.createChildNode(o,d,s)})):c&&c!==f.node&&(i??=w$3({},t),f.node=c);}return i??t}createReader(e){return dt$6(()=>this.childrenMap()?.byPropertyKey.get(e)?.node)}},ve=class extends Q$2{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return xt}get keyInParent(){return yt}isOrphaned=gt;childrenMap;constructor(e,t,n,i,s){super(t,e,s),this.fieldManager=n,this.value=i,this.childrenMap=this.createChildrenMap();}},Ne=class extends Q$2{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(e,t,n,i,s,o){super(t,e,o),this.logic=t,this.parent=n,this.root=this.parent.structure.root;let d=this.createKeyOrOrphanSignals("child",i,s);this.isOrphaned=d.isOrphaned,this.keyInParent=d.keyInParent,this.pathKeys=dt$6(()=>[...n.structure.pathKeys(),this.keyInParent()]),this.value=Kt$1(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this);}};var xt=dt$6(()=>[]),yt=dt$6(()=>{throw new b$4(1905,false)});function Bt(r,e,t){let n,i=new Set(r.byPropertyKey.keys()),s=new Set(r.byTrackingKey?.keys());for(let o=0;o<e.length;o++){let d=e[o];i.delete(o.toString()),$$1(d)&&d.hasOwnProperty(t)&&s.delete(d[t]);}if(i.size>0){n??=w$3({},r);for(let o of i)n.byPropertyKey.delete(o);}if(s.size>0){n??=w$3({},r);for(let o of s)n.byTrackingKey?.delete(o);}return n}function Ut$1(r,e){let t;for(let n of r.byPropertyKey.keys())e.hasOwnProperty(n)||(t??=w$3({},r),t.byPropertyKey.delete(n));return t}var Me$1=class Me{node;selfSubmitting=Fe$3(false);submissionErrors;constructor(e){this.node=e,this.submissionErrors=Yc({source:this.node.structure.value,computation:()=>[]});}submitting=dt$6(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??false))},x=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new pe(this)}fieldProxy=new Proxy(()=>this,Lt);pathNode;constructor(e){this.pathNode=e.pathNode,this.fieldAdapter=e.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,e),this.validationState=this.fieldAdapter.createValidationState(this,e),this.nodeState=this.fieldAdapter.createNodeState(this,e),this.metadataState=new be(this),this.submitState=new Me$1(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle();}focusBoundControl(e){this.getBindingForFocus()?.focus(e);}getBindingForFocus(){let e=this.formFieldBindings().filter(t=>t.focus!==void 0).reduce(dt,void 0);return e||this.structure.children().map(t=>t.getBindingForFocus()).reduce(dt,void 0)}pendingSync=Yc({source:()=>this.value(),computation:(e,t)=>{t?.value?.abort();}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let e=this.metadata(ht)?.();return e?this.metadata(e):void 0}get maxLength(){return this.metadata(Ce)}get min(){let e=this.metadata(ct)?.();return e?this.metadata(e):void 0}get minLength(){return this.metadata(ft)}get pattern(){return this.metadata(mt)??Ht$1}get required(){return this.metadata(De$1)??Gt$1}metadata(e){return this.metadataState.get(e)}getError(e){return this.errors().find(t=>t.kind===e)}hasMetadata(e){return this.metadataState.has(e)}markAsTouched(e){this.structure.isOrphaned()||ae$2(()=>{this.markAsTouchedInternal(e),this.flushSync();});}markAsTouchedInternal(e){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!e?.skipDescendants))for(let t of this.structure.children())t.markAsTouchedInternal();}markAsDirty(){this.nodeState.markAsDirty();}markAsPristine(){this.nodeState.markAsPristine();}markAsUntouched(){this.nodeState.markAsUntouched();}reset(e){ae$2(()=>this._reset(e));}_reset(e){this.pendingSync()?.abort(),e!==void 0&&this.value.set(e),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let t of this.formFieldBindings())t.reset();for(let t of this.structure.materializedChildren())t._reset();}reloadValidation(){ae$2(()=>this._reloadValidation());}_reloadValidation(){let e=this.logicNode.logic.getMetadataKeys();for(let t of e)t[Re]&&this.metadata(t).reload?.();for(let t of this.structure.children())t._reloadValidation();}controlValueSignal(){let e=Yc(this.value);e.rawSet=e.set,e.set=n=>{e.rawSet(n),this.markAsDirty(),this.debounceSync();};let t=e.update;return e.update=n=>{t(n),this.markAsDirty(),this.debounceSync();},e}sync(){this.value.set(this.controlValue());}flushSync(){let e=this.pendingSync();e&&!e.signal.aborted&&(e.abort(),this.sync());}debounceSync(){return C$5(this,null,function*(){let e=ae$2(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(e){let t=new AbortController,n=e(t.signal);if(n&&(this.pendingSync.set(t),yield n,t.signal.aborted))return}this.structure.isOrphaned()||this.sync();})}static newRoot(e,t,n,i){return i.newRoot(e,t,n,i)}createStructure(e){return e.kind==="root"?new ve(this,e.logic,e.fieldManager,e.value,this.newChild.bind(this)):new Ne(this,e.logic,e.parent,e.identityInParent,e.initialKeyInParent,this.newChild.bind(this))}newChild(e,t,n){let i,s;return n?(i=this.pathNode.getChild(w),s=this.structure.logic.getChild(w)):(i=this.pathNode.getChild(e),s=this.structure.logic.getChild(e)),this.fieldAdapter.newChild({kind:"child",parent:this,pathNode:i,logic:s,initialKeyInParent:e,identityInParent:t,fieldAdapter:this.fieldAdapter})}},Ht$1=dt$6(()=>[]),Gt$1=dt$6(()=>false);function dt(r,e){return r?e&&r.element.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e:r:e}var Ee$1=class Ee{node;selfTouched=Fe$3(false);selfDirty=Fe$3(false);markAsTouched(){this.selfTouched.set(true);}markAsDirty(){this.selfDirty.set(true);}markAsPristine(){this.selfDirty.set(false);}markAsUntouched(){this.selfTouched.set(false);}formFieldBindings=Fe$3([]);constructor(e){this.node=e;}dirty=dt$6(()=>{let e=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,n)=>n||t.nodeState.dirty(),st)});touched=dt$6(()=>{let e=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,n)=>n||t.nodeState.touched(),st)});disabledReasons=dt$6(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:g$1});disabled=dt$6(()=>!!this.disabledReasons().length);readonly=dt$6(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??false);hidden=dt$6(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??false);name=dt$6(()=>{let e=this.node.structure.parent;return e?`${e.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=dt$6(()=>{if(this.node.logicNode.logic.hasMetadata(ye)){let t=this.node.logicNode.logic.getMetadata(ye).compute(this.node.context);if(t)return n=>t(this.node.context,n)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=dt$6(()=>this.hidden()||this.disabled()||this.readonly())},we=class{newRoot(e,t,n,i){return new x({kind:"root",fieldManager:e,value:t,pathNode:n,logic:n.builder.build(),fieldAdapter:i})}newChild(e){return new x(e)}createNodeState(e){return new Ee$1(e)}createValidationState(e){return new ge(e)}createStructure(e,t){return e.createStructure(t)}},Se=class{injector;rootName;submitOptions;constructor(e,t,n){this.injector=e,this.rootName=t??`${this.injector.get(da$1)}.form${qt++}`,this.submitOptions=n;}structures=new Set;createFieldManagementEffect(e){pa$1(()=>{let t=new Set;this.markStructuresLive(e,t);for(let n of this.structures)t.has(n)||(this.structures.delete(n),ae$2(()=>n.destroy()));},{injector:this.injector});}markStructuresLive(e,t){t.add(e);for(let n of e.children())this.markStructuresLive(n.structure,t);}},qt=0,pt=new S$2("");function $t$1(r){let e,t,n;return r.length===3?[e,t,n]=r:r.length===2?Pt$1(r[1])?[e,t]=r:[e,n]=r:[e]=r,[e,t,n]}function zt$1(...r){let[e,t,n]=$t$1(r),i=n?.injector??T$3(le$2),s=No$3(i,()=>X$1.rootCompile(t)),o=new Se(i,n?.name,n?.submission),d=n?.adapter??new we,u=x.newRoot(o,e,s,d);o.createFieldManagementEffect(u.structure);let{experimentalWebMcpTool:c}=n??{};if(c){let f=No$3(i,()=>T$3(pt,{optional:!0}));f&&No$3(i,()=>f(u.fieldTree,{name:c.name,description:c.description}));}return u.fieldTree}function bt(r,e){return C$5(this,null,function*(){let t=ae$2(r);if(ae$2(t.submitState.submitting))return  false;let n=e===void 0?t.structure.root.fieldProxy:r,i={root:t.structure.root.fieldProxy,submitted:r};e=typeof e=="function"?{action:e}:e??t.structure.fieldManager.submitOptions;let s=e?.action;if(!s)throw new b$4(1915,false);t.markAsTouched();let o=e?.onInvalid,d=Wt(t,e?.ignoreValidators);try{if(d){t.submitState.selfSubmitting.set(!0);let u=yield ae$2(()=>s?.(n,i));return u&&Yt$1(t,u),!u||p(u)&&u.length===0}else ae$2(()=>o?.(n,i));return !1}finally{t.submitState.selfSubmitting.set(false);}})}function Wt(r,e){switch(e){case "all":return  true;case "none":return ae$2(r.valid);default:return !ae$2(r.invalid)}}function Yt$1(r,e){p(e)||(e=[e]);let t=new Map;for(let n of e){let i=Ae(n,r.fieldTree),s=i.fieldTree(),o=t.get(s);o||(o=[],t.set(s,o)),o.push(i);}for(let[n,i]of t)n.submitState.submissionErrors.set(i);}var J=class{kind="compat";control;fieldTree;context;message;constructor({context:e,kind:t,control:n}){this.context=e,this.kind=t,this.control=n;}};function vt(r){if(r.length===0)return null;let e={};for(let t of r)e[t.kind]=t instanceof J?t.context:t;return e}function Nt(r,e){return r===null?[]:Object.entries(r).map(([t,n])=>new J({context:n,kind:t,control:e}))}var Xt=new S$2("");function Yr(r,e){te(r);let t=b$2.unwrapFieldPath(r),n;typeof e=="function"||typeof e=="string"?n=e:n=e?.when,t.builder.addDisabledReasonRule(i=>{let s=true;return typeof n=="string"?s=n:n&&(s=n(i)),typeof s=="string"?{fieldTree:i.fieldTree,message:s}:s?{fieldTree:i.fieldTree}:void 0});}function Zt(r){let e=r;return typeof e.length=="number"?e.length:e.size}function I$1(r,e){return r instanceof Function?r(e):r}function _e(r){return typeof r=="number"?isNaN(r):r===""||r===false||r==null}function Mt(r){return r===void 0?[]:Array.isArray(r)?r:[r]}function Ve(r,e){te(r),b$2.unwrapFieldPath(r).builder.addSyncErrorRule(n=>Ae(e(n),n.fieldTree));}function Qt$1(r){return new Ie(r)}function Jt(r,e){return new ke$1(r,e)}function er(r){return new Pe$1(r)}var k=class{__brand=void 0;kind="";fieldTree;message;constructor(e){e&&Object.assign(this,e);}},Ie=class extends k{kind="required"};var ke$1=class ke extends k{maxLength;kind="maxLength";constructor(e,t){super(t),this.maxLength=e;}};var Pe$1=class Pe extends k{kind="email"},re=class extends k{kind="parse"};var tr=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;function Xr(r,e){Ve(r,t=>{if(!_e(t.value())&&!tr.test(t.value()))return er({message:I$1(e?.message,t)})});}function Zr(r,e,t){let n=B$1(r,v(),i=>{return e});B$1(r,Ce,({state:i})=>i.metadata(n)()),Ve(r,i=>{if(_e(i.value()))return;let s=i.state.metadata(n)();if(s!==void 0&&Zt(i.value())>s)return Jt(s,{message:I$1(t?.message,i)})});}function Qr(r,e){let t=B$1(r,v(),n=>true);B$1(r,De$1,({state:n})=>n.metadata(t)()),Ve(r,n=>{if(n.state.metadata(t)()&&_e(n.value()))return Qt$1({message:I$1(e?.message,n)})});}function rr(r,e,t){let n=Yc({source:r,computation:()=>[],equal:g$1}),i=o=>{let d=t(o);n.set(Mt(d.error)),d.value!==void 0&&e(d.value),n.set(Mt(d.error));},s=()=>{n.set([]);};return {errors:n.asReadonly(),setRawValue:i,reset:s}}var Fe=class{field;constructor(e){this.field=e;}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return !this.field().disabled()}get errors(){return vt(this.field().errors())}get pristine(){return !this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return !this.field().touched()}get status(){if(this.field().disabled())return "DISABLED";if(this.field().valid())return "VALID";if(this.field().invalid())return "INVALID";if(this.field().pending())return "PENDING";throw new b$4(1910,false)}valueAccessor=null;hasValidator(e){return e===Pt$2.required?this.field().required():false}updateValueAndValidity(){}},Oe$1={disabled:"disabled",disabledReasons:"disabledReasons",dirty:"dirty",errors:"errors",hidden:"hidden",invalid:"invalid",max:"max",maxLength:"maxLength",min:"min",minLength:"minLength",name:"name",pattern:"pattern",pending:"pending",readonly:"readonly",required:"required",touched:"touched"},nr=(()=>{let r={};for(let e of Object.keys(Oe$1))r[Oe$1[e]]=e;return r})();function Le(r,e){let t=nr[e];return r[t]?.()}var Ke=Object.values(Oe$1);function ne(){return {}}function S(r,e,t){return r[e]!==t?(r[e]=t,true):false}function ir(r,e,t){let n;if(Rt(r)&&t.isBadInput(r))return {error:new re};switch(r.type){case "checkbox":return {value:r.checked};case "number":case "range":case "datetime-local":if(n=ae$2(e),typeof n=="number"||n===null)return {value:r.value===""?null:r.valueAsNumber};break;case "date":case "month":case "time":case "week":if(n=ae$2(e),n===null||n instanceof Date)return {value:r.valueAsDate};if(typeof n=="number")return {value:r.valueAsNumber};break}if(r.tagName==="INPUT"&&r.type==="text"&&(n??=ae$2(e),typeof n=="number"||n===null)){if(r.value==="")return {value:null};let i=Number(r.value);return Number.isNaN(i)?{error:new re}:{value:i}}return {value:r.value}}function Et$2(r,e){switch(r.type){case "checkbox":r.checked=e;return;case "radio":r.checked=e===r.value;return;case "number":case "range":case "datetime-local":if(typeof e=="number"){wt$1(r,e);return}else if(e===null){r.value="";return}break;case "date":case "month":case "time":case "week":if(e===null||e instanceof Date){r.valueAsDate=e;return}else if(typeof e=="number"){wt$1(r,e);return}}if(r.tagName==="INPUT"&&r.type==="text"){if(typeof e=="number"){r.value=isNaN(e)?"":String(e);return}if(e===null){r.value="";return}}r.value=e;}function wt$1(r,e){isNaN(e)?r.value="":r.valueAsNumber=e;}function Rt(r){return r.tagName==="INPUT"}function sr(r){return r.type==="date"||r.type==="datetime-local"||r.type==="month"||r.type==="time"||r.type==="week"}function or(r,e){let t=r.getUTCFullYear(),n=String(r.getUTCMonth()+1).padStart(2,"0");if(e==="month")return `${t}-${n}`;let i=String(r.getUTCDate()).padStart(2,"0");return `${t}-${n}-${i}`}function Tt$1(r,e,t){return e instanceof Date&&(r==="min"||r==="max")&&(t==="date"||t==="month")?or(e,t):e}function ar(r,e){r.listenToCustomControlModel(n=>e.state().controlValue.set(n)),r.listenToCustomControlOutput("touch",()=>e.state().markAsTouched()),e.registerAsBinding(r.customControl);let t=ne();return ()=>{let n=e.state(),i=n.controlValue();S(t,"controlValue",i)&&r.setCustomControlModelInput(i);for(let s of Ke){let o;if(s==="errors"?o=e.errors():o=Le(n,s),S(t,s,o)&&(r.setInputOnDirectives(s,o),e.elementAcceptsNativeProperty(s)&&!r.customControlHasInput(s))){let d=Tt$1(s,o,e.nativeFormElement.type);Sr(e.renderer,e.nativeFormElement,s,d);}}}}function dr(r){return typeof r=="object"&&r!==null}function ur(r,e){let t=ne();e.controlValueAccessor.registerOnChange(i=>{t.controlValue=i,e.state().controlValue.set(i);}),e.controlValueAccessor.registerOnTouched(()=>e.state().markAsTouched());let n=e.injector.get(nt$1,null,{optional:true,self:true});if(n){let i;for(let u of n)dr(u)&&u.registerOnValidatorChange&&(i??=Fe$3(0),u.registerOnValidatorChange(()=>{i.update(c=>c+1);}));let s=n.map(u=>typeof u=="function"?u:u.validate.bind(u)),o=Pt$2.compose(s),d=dt$6(()=>{i?.();let u=o?o(e.interopNgControl.control):null;return Nt(u,e.interopNgControl.control)});e.parseErrorsSource.set(d);}return e.registerAsBinding({reset:()=>{let i=e.state().value();t.controlValue=i,ae$2(()=>e.controlValueAccessor.writeValue(i));}}),()=>{let i=e.state(),s=i.value();S(t,"controlValue",s)&&ae$2(()=>e.controlValueAccessor.writeValue(s));for(let o of Ke){let d=Le(i,o);if(S(t,o,d)){let u=r.setInputOnDirectives(o,d);o==="disabled"&&e.controlValueAccessor.setDisabledState?ae$2(()=>e.controlValueAccessor.setDisabledState(d)):!u&&e.elementAcceptsNativeProperty(o)&&Sr(e.renderer,e.nativeFormElement,o,d);}}}}function lr(r,e,t){if(typeof MutationObserver!="function")return;let n=new MutationObserver(i=>{i.some(s=>cr(s))&&e();});n.observe(r,{attributes:true,attributeFilter:["value"],characterData:true,childList:true,subtree:true}),t.onDestroy(()=>n.disconnect());}function cr(r){if(r.type==="childList"||r.type==="characterData"){if(r.target instanceof Comment)return  false;for(let e of r.addedNodes)if(!(e instanceof Comment))return  true;for(let e of r.removedNodes)if(!(e instanceof Comment))return  true;return  false}return r.type==="attributes"&&r.target instanceof HTMLOptionElement}function hr(r,e,t,n){let i=false,s=e.nativeFormElement,o=rr(()=>e.state().value(),u=>e.state().controlValue.set(u),u=>ir(s,e.state().value,n));t.set(o.errors),e.onReset=()=>{o.reset();let u=e.state().value();d.controlValue=u,Et$2(s,u);},r.listenToDom("input",()=>o.setRawValue(void 0)),r.listenToDom("blur",()=>e.state().markAsTouched()),Rt(s)&&sr(s)&&n.watchValidity(e.destroyRef,s,()=>o.setRawValue(void 0)),e.registerAsBinding(),s.tagName==="SELECT"&&lr(s,()=>{i&&(s.value=e.state().controlValue());},e.destroyRef);let d=ne();return ()=>{let u=e.state();for(let f of Ke){let P=Le(u,f);if(S(d,f,P)&&(r.setInputOnDirectives(f,P),e.elementAcceptsNativeProperty(f))){let ie=Tt$1(f,P,s.type);Sr(e.renderer,s,f,ie);}}let c=u.controlValue();S(d,"controlValue",c)&&Et$2(s,c),i=true;}}var Dt$1=(()=>{class r{static \u0275fac=function(n){return new(n||r)};static \u0275prov=re$1({token:r,factory:t=>fr.\u0275fac(t),providedIn:"root"})}return r})(),fr=(()=>{class r extends Dt$1{document=T$3(ir$4);cspNonce=T$3(Em,{optional:true});injectedStyles=new WeakMap;watchValidity(t,n,i){let s=n.getRootNode();this.injectedStyles.has(s)||this.injectedStyles.set(s,this.createTransitionStyle(s));let o=d=>{let u=d;(u.animationName==="ng-valid"||u.animationName==="ng-invalid")&&i();};n.addEventListener("animationstart",o),t.onDestroy(()=>{n.removeEventListener("animationstart",o);});}isBadInput(t){return t.validity?.badInput??false}createTransitionStyle(t){let n=this.document.createElement("style");return this.cspNonce&&(n.nonce=this.cspNonce),n.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,t.nodeType===9?t.head?.appendChild(n):t.appendChild(n),n}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove();}static \u0275fac=(()=>{let t;return function(i){return (t||(t=ey(r)))(i||r)}})();static \u0275prov=re$1({token:r,factory:r.\u0275fac})}return r})(),mr=Symbol(),St$1=new S$2(""),Jr=(()=>{class r{field=NF.required({alias:"formField"});state=dt$6(()=>this.field()());renderer=T$3(CI);destroyRef=T$3(Le$4);injector=T$3(le$2);element=T$3(Tr$2).nativeElement;elementIsNativeFormElement=wr(this.element);elementAcceptsTextualValues=Zo$1(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=t=>this.element.focus(t);controlValueAccessors=T$3(Gi$1,{optional:true,self:true});config=T$3(Xt,{optional:true});validityMonitor=T$3(Dt$1);parseErrorsSource=Fe$3(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new Fe(this.state)}parseErrors=dt$6(()=>this.parseErrorsSource()?.().map(t=>x$2(w$3({},t),{fieldTree:ae$2(this.state).fieldTree,formField:this}))??[],{equal:g$1});errors=dt$6(()=>this.state().errors().filter(t=>!t.formField||t.formField===this),{equal:g$1});isFieldBinding=false;resetter=()=>{};parseErrorsResetCallback;setParseErrors(t){this.parseErrorsSource.set(t);}set onReset(t){this.parseErrorsResetCallback=t;}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return !this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:Ir(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let t=Object.entries(this.config?.classes??{}).map(([i,s])=>[i,dt$6(()=>s(this))]);if(t.length===0)return;let n=ne();FF({write:()=>{for(let[i,s]of t){let o=s();S(n,i,o)&&(o?this.renderer.addClass(this.element,i):this.renderer.removeClass(this.element,i));}}},{injector:this.injector});}focus(t){this.focuser(t);}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value());}registerAsBinding(t){if(this.isFieldBinding)throw new b$4(1913,false);this.isFieldBinding=true,this.installClassBindingEffect(),t?.focus&&(this.focuser=n=>t.focus(n)),t?.reset&&(this.resetter=()=>t.reset()),pa$1(n=>{let i=this.state();i.nodeState.formFieldBindings.update(s=>[...s,this]),n(()=>{i.nodeState.formFieldBindings.update(s=>s.filter(o=>o!==this));});},{injector:this.injector});}[mr];\u0275ngControlCreate(t){if(!t.hasPassThrough)if(this.controlValueAccessor)this.\u0275ngControlUpdate=ur(t,this);else if(t.customControl)this.\u0275ngControlUpdate=ar(t,this);else if(this.elementIsNativeFormElement)this.\u0275ngControlUpdate=hr(t,this,this.parseErrorsSource,this.validityMonitor);else throw new b$4(1914,false)}\u0275ngControlUpdate;elementAcceptsNativeProperty(t){if(!this.elementIsNativeFormElement)return  false;switch(t){case "min":case "max":return this._elementAcceptsMinMax??=$o$1(this.element);case "minLength":case "maxLength":return this.elementAcceptsTextualValues;case "disabled":case "required":case "readonly":case "name":return  true;default:return  false}}static \u0275fac=function(n){return new(n||r)};static \u0275dir=CE({type:r,selectors:[["","formField",""]],inputs:{field:[1,"formField","field"]},exportAs:["formField"],features:[zD([{provide:St$1,useExisting:r},{provide:_e$1,useFactory:()=>T$3(r).interopNgControl},{provide:Mr,useFactory:()=>T$3(St$1,{self:true})}]),ME("formField")]})}return r})(),en=(()=>{class r{fieldTree=NF.required({alias:"formRoot"});onSubmit(t){t.preventDefault(),ae$2(()=>{let n=this.fieldTree();n().structure.fieldManager.submitOptions&&bt(n);});}static \u0275fac=function(n){return new(n||r)};static \u0275dir=CE({type:r,selectors:[["form","formRoot",""]],hostAttrs:["novalidate",""],hostBindings:function(n,i){n&1&&ih("submit",function(o){return i.onSubmit(o)});},inputs:{fieldTree:[1,"formRoot","fieldTree"]}})}return r})();var Ci=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],xi=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function Fi(n,y){n&1&&(wi$2(0,"span",3),uD(1,1),Hc());}function Ai$1(n,y){n&1&&(wi$2(0,"span",6),uD(1,2),Hc());}function Ri(n,y){n&1&&(wi$2(0,"span",3),uD(1,1),wi$2(2,"span",7),Uu$1(),wi$2(3,"svg",8),Xp(4,"path",9),Hc()()());}function Ti$1(n,y){n&1&&(wi$2(0,"span",6),uD(1,2),Hc());}var Bi=`.mdc-evolution-chip,
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
`;var Ii$1=["*"],Pi$1=`.mat-mdc-chip-set {
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
`,ki=new S$2("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),fi$1=new S$2("MatChipAvatar"),yi$1=new S$2("MatChipTrailingIcon"),bi=new S$2("MatChipEdit"),G$1=new S$2("MatChipRemove"),N=new S$2("MatChip"),Ei$1=(()=>{class n{_elementRef=T$3(Tr$2);_parentChip=T$3(N);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(i){this._disabled=i;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){T$3($$5).load(ci$1),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(e){return new(e||n)};static \u0275dir=CE({type:n,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(e,t){e&2&&(Kp("disabled",t._getDisabledAttribute())("aria-disabled",t.disabled),gh("mdc-evolution-chip__action--primary",t._isPrimary)("mdc-evolution-chip__action--secondary",!t._isPrimary)("mdc-evolution-chip__action--trailing",!t._isPrimary&&!t._isLeading));},inputs:{disabled:[2,"disabled","disabled",PF],tabIndex:[2,"tabIndex","tabIndex",i=>i==null?-1:LF(i)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return n})(),K$1=(()=>{class n extends Ei$1{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(i){!this.disabled&&this._isPrimary&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275dir=CE({type:n,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(e,t){e&1&&ih("click",function(a){return t._handleClick(a)})("keydown",function(a){return t._handleKeydown(a)}),e&2&&(Kp("tabindex",t._getTabindex()),gh("mdc-evolution-chip__action--presentational",false));},features:[Wp]})}return n})();var wt=(()=>{class n extends K$1{_isPrimary=false;_handleClick(i){this.disabled||(i.stopPropagation(),i.preventDefault(),this._parentChip.remove());}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&(i.stopPropagation(),i.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275dir=CE({type:n,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(e,t){e&2&&Kp("aria-hidden",null);},features:[zD([{provide:G$1,useExisting:n}]),Wp]})}return n})(),q$1=(()=>{class n{_changeDetectorRef=T$3(kF);_elementRef=T$3(Tr$2);_tagName=T$3(bF);_ngZone=T$3(ue$1);_focusMonitor=T$3(ln$3);_globalRippleOptions=T$3(vn$3,{optional:true});_document=T$3(ir$4);_onFocus=new ne$3;_onBlur=new ne$3;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=we$3();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=T$3(hn$3).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(i){this._value=i;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(i){this._disabled=i;}_disabled=false;removed=new qe$3;destroyed=new qe$3;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=T$3(si$1);_injector=T$3(le$2);constructor(){let i=T$3($$5);i.load(ci$1),i.load(Dt$5),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Dg(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(i){(i.keyCode===8&&!i.repeat||i.keyCode===46)&&(i.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(i){return this._getActions().find(e=>{let t=e._elementRef.nativeElement;return t===i||t.contains(i)})}_getActions(){let i=[];return this.editIcon&&i.push(this.editIcon),this.primaryAction&&i.push(this.primaryAction),this.removeIcon&&i.push(this.removeIcon),i}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(i){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(i=>{let e=i!==null;e!==this._hasFocusInternal&&(this._hasFocusInternal=e,e?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=IE({type:n,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(e,t,c){if(e&1&&ch(c,fi$1,5)(c,bi,5)(c,yi$1,5)(c,G$1,5)(c,fi$1,5)(c,yi$1,5)(c,bi,5)(c,G$1,5),e&2){let a;fD(a=pD())&&(t.leadingIcon=a.first),fD(a=pD())&&(t.editIcon=a.first),fD(a=pD())&&(t.trailingIcon=a.first),fD(a=pD())&&(t.removeIcon=a.first),fD(a=pD())&&(t._allLeadingIcons=a),fD(a=pD())&&(t._allTrailingIcons=a),fD(a=pD())&&(t._allEditIcons=a),fD(a=pD())&&(t._allRemoveIcons=a);}},viewQuery:function(e,t){if(e&1&&lh(K$1,5),e&2){let c;fD(c=pD())&&(t.primaryAction=c.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(e,t){e&1&&ih("keydown",function(a){return t._handleKeydown(a)}),e&2&&(rh("id",t.id),Kp("role",t.role)("aria-label",t.ariaLabel),_D("mat-"+(t.color||"primary")),gh("mdc-evolution-chip",!t._isBasicChip)("mdc-evolution-chip--disabled",t.disabled)("mdc-evolution-chip--with-trailing-action",t._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",t.leadingIcon)("mdc-evolution-chip--with-primary-icon",t.leadingIcon)("mdc-evolution-chip--with-avatar",t.leadingIcon)("mat-mdc-chip-with-avatar",t.leadingIcon)("mat-mdc-chip-highlighted",t.highlighted)("mat-mdc-chip-disabled",t.disabled)("mat-mdc-basic-chip",t._isBasicChip)("mat-mdc-standard-chip",!t._isBasicChip)("mat-mdc-chip-with-trailing-icon",t._hasTrailingIcon())("_mat-animation-noopable",t._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",PF],highlighted:[2,"highlighted","highlighted",PF],disableRipple:[2,"disableRipple","disableRipple",PF],disabled:[2,"disabled","disabled",PF]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[zD([{provide:N,useExisting:n}])],ngContentSelectors:xi,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(e,t){e&1&&(lD(Ci),Xp(0,"span",0),wi$2(1,"span",1)(2,"span",2),ZE(3,Fi,2,0,"span",3),wi$2(4,"span",4),uD(5),Xp(6,"span",5),Hc()()(),ZE(7,Ai$1,2,0,"span",6)),e&2&&(Hv(3),YE(t.leadingIcon?3:-1),Hv(4),YE(t._hasTrailingIcon()?7:-1));},dependencies:[Ei$1],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2})}return n})();var Li=(()=>{class n extends q$1{_defaultOptions=T$3(ki,{optional:true});chipListSelectable=true;_chipListMultiple=false;_chipListHideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get selectable(){return this._selectable&&this.chipListSelectable}set selectable(i){this._selectable=i,this._changeDetectorRef.markForCheck();}_selectable=true;get selected(){return this._selected}set selected(i){this._setSelectedState(i,false,true);}_selected=false;get ariaSelected(){return this.selectable?this.selected.toString():null}basicChipAttrName="mat-basic-chip-option";selectionChange=new qe$3;ngOnInit(){super.ngOnInit(),this.role="presentation";}select(){this._setSelectedState(true,false,true);}deselect(){this._setSelectedState(false,false,true);}selectViaInteraction(){this._setSelectedState(true,true,true);}toggleSelected(i=false){return this._setSelectedState(!this.selected,i,true),this.selected}_handlePrimaryActionInteraction(){this.disabled||(this.focus(),this.selectable&&this.toggleSelected(true));}_hasLeadingGraphic(){return this.leadingIcon?true:!this._chipListHideSingleSelectionIndicator||this._chipListMultiple}_setSelectedState(i,e,t){i!==this.selected&&(this._selected=i,t&&this.selectionChange.emit({source:this,isUserInput:e,selected:this.selected}),this._changeDetectorRef.markForCheck());}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275cmp=IE({type:n,selectors:[["mat-basic-chip-option"],["","mat-basic-chip-option",""],["mat-chip-option"],["","mat-chip-option",""]],hostAttrs:[1,"mat-mdc-chip","mat-mdc-chip-option"],hostVars:37,hostBindings:function(e,t){e&2&&(rh("id",t.id),Kp("tabindex",null)("aria-label",null)("aria-description",null)("role",t.role),gh("mdc-evolution-chip",!t._isBasicChip)("mdc-evolution-chip--filter",!t._isBasicChip)("mdc-evolution-chip--selectable",!t._isBasicChip)("mat-mdc-chip-selected",t.selected)("mat-mdc-chip-multiple",t._chipListMultiple)("mat-mdc-chip-disabled",t.disabled)("mat-mdc-chip-with-avatar",t.leadingIcon)("mdc-evolution-chip--disabled",t.disabled)("mdc-evolution-chip--selected",t.selected)("mdc-evolution-chip--selecting",!t._animationsDisabled)("mdc-evolution-chip--with-trailing-action",t._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon",t.leadingIcon)("mdc-evolution-chip--with-primary-graphic",t._hasLeadingGraphic())("mdc-evolution-chip--with-avatar",t.leadingIcon)("mat-mdc-chip-highlighted",t.highlighted)("mat-mdc-chip-with-trailing-icon",t._hasTrailingIcon()));},inputs:{selectable:[2,"selectable","selectable",PF],selected:[2,"selected","selected",PF]},outputs:{selectionChange:"selectionChange"},features:[zD([{provide:q$1,useExisting:n},{provide:N,useExisting:n}]),Wp],ngContentSelectors:xi,decls:8,vars:6,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipAction","","role","option",3,"_allowFocusWhenDisabled"],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"],[1,"mdc-evolution-chip__checkmark"],["viewBox","-2 -3 30 30","focusable","false","aria-hidden","true",1,"mdc-evolution-chip__checkmark-svg"],["fill","none","stroke","currentColor","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-evolution-chip__checkmark-path"]],template:function(e,t){e&1&&(lD(Ci),Xp(0,"span",0),wi$2(1,"span",1)(2,"button",2),ZE(3,Ri,5,0,"span",3),wi$2(4,"span",4),uD(5),Xp(6,"span",5),Hc()()(),ZE(7,Ti$1,2,0,"span",6)),e&2&&(Hv(2),Jp("_allowFocusWhenDisabled",true),Kp("aria-description",t.ariaDescription)("aria-label",t.ariaLabel)("aria-selected",t.ariaSelected),Hv(),YE(t._hasLeadingGraphic()?3:-1),Hv(4),YE(t._hasTrailingIcon()?7:-1));},dependencies:[K$1],styles:[Bi],encapsulation:2})}return n})();var Oi=(()=>{class n{_elementRef=T$3(Tr$2);_changeDetectorRef=T$3(kF);_dir=T$3(ea,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new ne$3;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(i=>i._onFocus)}get chipDestroyedChanges(){return this._getChipStream(i=>i.destroyed)}get chipRemovedChanges(){return this._getChipStream(i=>i.removed)}get disabled(){return this._disabled}set disabled(i){this._disabled=i,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(i){this._explicitRole=i;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new si$2;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(i=>i._hasFocus())}_syncChipsState(){this._chips?.forEach(i=>{i._chipListDisabled=this._disabled,i._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(i){this._originatesFromChip(i)&&this._keyManager.onKeydown(i);}_isValidIndex(i){return i>=0&&i<this._chips.length}_allowFocusEscape(){let i=this._elementRef.nativeElement.tabIndex;i!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=i));}_getChipStream(i){return this._chips.changes.pipe(Bl(null),vl(()=>Dg(...this._chips.map(i))))}_originatesFromChip(i){let e=i.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-mdc-chip"))return  true;e=e.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Bl(this._chips)).subscribe(i=>{let e=[];i.forEach(t=>t._getActions().forEach(c=>e.push(c))),this._chipActions.reset(e),this._chipActions.notifyOnChanges();}),this._keyManager=new fn$3(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(i=>this._skipPredicate(i)),this.chipFocusChanges.pipe(Rg(this._destroyed)).subscribe(({chip:i})=>{let e=i._getSourceAction(document.activeElement);e&&this._keyManager.updateActiveItem(e);}),this._dir?.change.pipe(Rg(this._destroyed)).subscribe(i=>this._keyManager.withHorizontalOrientation(i));}_skipPredicate(i){return i.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Bl(null),Rg(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Rg(this._destroyed)).subscribe(i=>{let t=this._chips.toArray().indexOf(i.chip),c=i.chip._hasFocus(),a=i.chip._hadFocusOnRemove&&this._keyManager.activeItem&&i.chip._getActions().includes(this._keyManager.activeItem),Si=c||a;this._isValidIndex(t)&&Si&&(this._lastDestroyedFocusedChipIndex=t);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let i=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),e=this._chips.toArray()[i];e.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():e.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=IE({type:n,selectors:[["mat-chip-set"]],contentQueries:function(e,t,c){if(e&1&&ch(c,q$1,5),e&2){let a;fD(a=pD())&&(t._chips=a);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(e,t){e&1&&ih("keydown",function(a){return t._handleKeydown(a)}),e&2&&Kp("role",t.role);},inputs:{disabled:[2,"disabled","disabled",PF],role:"role",tabIndex:[2,"tabIndex","tabIndex",i=>i==null?0:LF(i)]},ngContentSelectors:Ii$1,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,t){e&1&&(lD(),Bc(0,"div",0),uD(1),$c());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return n})(),Q$1=class Q{source;value;constructor(y,i){this.source=y,this.value=i;}},Hi={provide:Gi$1,useExisting:Eo$3(()=>zi),multi:true},zi=(()=>{class n extends Oi{_onTouched=()=>{};_onChange=()=>{};_defaultRole="listbox";_defaultOptions=T$3(ki,{optional:true});get multiple(){return this._multiple}set multiple(i){this._multiple=i,this._syncListboxProperties();}_multiple=false;get selected(){let i=this._chips.toArray().filter(e=>e.selected);return this.multiple?i:i[0]}ariaOrientation="horizontal";get selectable(){return this._selectable}set selectable(i){this._selectable=i,this._syncListboxProperties();}_selectable=true;compareWith=(i,e)=>i===e;required=false;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(i){this._hideSingleSelectionIndicator=i,this._syncListboxProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get chipSelectionChanges(){return this._getChipStream(i=>i.selectionChange)}get chipBlurChanges(){return this._getChipStream(i=>i._onBlur)}get value(){return this._value}set value(i){this._chips&&this._chips.length&&this._setSelectionByValue(i,false),this._value=i;}_value;change=new qe$3;_chips=void 0;ngAfterContentInit(){this._chips.changes.pipe(Bl(null),Rg(this._destroyed)).subscribe(()=>{this.value!==void 0&&Promise.resolve().then(()=>{this._setSelectionByValue(this.value,false);}),this._syncListboxProperties();}),this.chipBlurChanges.pipe(Rg(this._destroyed)).subscribe(()=>this._blur()),this.chipSelectionChanges.pipe(Rg(this._destroyed)).subscribe(i=>{this.multiple||this._chips.forEach(e=>{e!==i.source&&e._setSelectedState(false,false,false);}),i.isUserInput&&this._propagateChanges();});}focus(){if(this.disabled)return;let i=this._getFirstSelectedChip();i&&!i.disabled?i.focus():this._chips.length>0?this._keyManager.setFirstItemActive():this._elementRef.nativeElement.focus();}writeValue(i){i!=null?this.value=i:this.value=void 0;}registerOnChange(i){this._onChange=i;}registerOnTouched(i){this._onTouched=i;}setDisabledState(i){this.disabled=i;}_setSelectionByValue(i,e=true){this._clearSelection(),Array.isArray(i)?i.forEach(t=>this._selectValue(t,e)):this._selectValue(i,e);}_blur(){this.disabled||setTimeout(()=>{this.focused||this._markAsTouched();});}_keydown(i){i.keyCode===9&&super._allowFocusEscape();}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck();}_propagateChanges(){let i=null;Array.isArray(this.selected)?i=this.selected.map(e=>e.value):i=this.selected?this.selected.value:void 0,this._value=i,this.change.emit(new Q$1(this,i)),this._onChange(i),this._changeDetectorRef.markForCheck();}_clearSelection(i){this._chips.forEach(e=>{e!==i&&e.deselect();});}_selectValue(i,e){let t=this._chips.find(c=>c.value!=null&&this.compareWith(c.value,i));return t&&(e?t.selectViaInteraction():t.select()),t}_syncListboxProperties(){this._chips&&Promise.resolve().then(()=>{this._chips.forEach(i=>{i._chipListMultiple=this.multiple,i.chipListSelectable=this._selectable,i._chipListHideSingleSelectionIndicator=this.hideSingleSelectionIndicator,i._changeDetectorRef.markForCheck();});});}_getFirstSelectedChip(){return Array.isArray(this.selected)?this.selected.length?this.selected[0]:void 0:this.selected}_skipPredicate(i){return  false}static \u0275fac=(()=>{let i;return function(t){return (i||(i=ey(n)))(t||n)}})();static \u0275cmp=IE({type:n,selectors:[["mat-chip-listbox"]],contentQueries:function(e,t,c){if(e&1&&ch(c,Li,5),e&2){let a;fD(a=pD())&&(t._chips=a);}},hostAttrs:[1,"mdc-evolution-chip-set","mat-mdc-chip-listbox"],hostVars:10,hostBindings:function(e,t){e&1&&ih("focus",function(){return t.focus()})("blur",function(){return t._blur()})("keydown",function(a){return t._keydown(a)}),e&2&&(rh("tabIndex",t.disabled||t.empty?-1:t.tabIndex),Kp("role",t.role)("aria-required",t.role?t.required:null)("aria-disabled",t.disabled.toString())("aria-multiselectable",t.multiple)("aria-orientation",t.ariaOrientation),gh("mat-mdc-chip-list-disabled",t.disabled)("mat-mdc-chip-list-required",t.required));},inputs:{multiple:[2,"multiple","multiple",PF],ariaOrientation:[0,"aria-orientation","ariaOrientation"],selectable:[2,"selectable","selectable",PF],compareWith:"compareWith",required:[2,"required","required",PF],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",PF],value:"value"},outputs:{change:"change"},features:[zD([Hi]),Wp],ngContentSelectors:Ii$1,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,t){e&1&&(lD(),Bc(0,"div",0),uD(1),$c());},styles:[Pi$1],encapsulation:2})}return n})();var St=(()=>{class n{constructor(){this.responsive=T$3(bo$2),this.displayMobileLayout=new Rn$2(false),this.responsive.observe([td.XSmall]).pipe(Fl()).subscribe(i=>{this.displayMobileLayout.next(!i.matches);});}static{this.\u0275fac=function(e){return new(e||n)};}static{this.\u0275prov=re$1({token:n,factory:n.\u0275fac,providedIn:"root"});}}return n})();var Vi=(function(n){return n.ASC="asc",n.DESC="desc",n})(Vi||{});var r=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=CE({type:t,selectors:[["","mat-line",""],["","matLine",""]],hostAttrs:[1,"mat-line"]})}return t})();var c=new S$2("ARTWORK_PORT");var m=(function(n){return n.MEDIUM="Medium",n.HEIGHT="Height",n.WIDTH="Width",n.UNIT="Unit",n.YEAR="Year",n.IMAGETYPE="Image Type",n.ARTIST="Artist",n.PROJECT="Project",n.DESC_AUTHOR="Description Author",n.DESC_LANG="Description language",n.VERSION="Version",n})(m||{}),f=(function(n){return n.FRONTAL="Frontal view",n.PROGRESS="Work in progress",n.DETAIL="Detail",n})(f||{}),s=(function(n){return n.YEAR="year",n.SIZE="size",n.MEDIUM="medium",n})(s||{}),h=["23","24","25","26","30","34","37","58","59","61","64","66","70","71","72","74","75","77","94","97","112","114","115","118","117","126","136","159","161","163","165"];var g=["*"],b$1=(()=>{class n{labelPosition="after";static \u0275fac=function(i){return new(i||n)};static \u0275cmp=IE({type:n,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,t){i&2&&gh("mdc-form-field--align-end",t.labelPosition==="before");},inputs:{labelPosition:"labelPosition"},ngContentSelectors:g,decls:1,vars:0,template:function(i,t){i&1&&(lD(),uD(0));},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})}return n})();function $(i){return Error(`Unable to find icon with the name "${i}"`)}function K(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function j(i){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`)}function B(i){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`)}var a=class{url;svgText;options;svgElement=null;constructor(l,t,e){this.url=l,this.svgText=t,this.options=e;}},q=(()=>{class i{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,e,n,o){this._httpClient=t,this._sanitizer=e,this._errorHandler=o,this._document=n;}addSvgIcon(t,e,n){return this.addSvgIconInNamespace("",t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace("",t,e,n)}addSvgIconInNamespace(t,e,n,o){return this._addSvgIconConfig(t,e,new a(n,null,o))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,o){let r=this._sanitizer.sanitize(br$2.HTML,n);if(!r)throw B(n);let s=_o$2(r);return this._addSvgIconConfig(t,e,new a("",s,o))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace("",t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace("",t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new a(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){let o=this._sanitizer.sanitize(br$2.HTML,e);if(!o)throw B(e);let r=_o$2(o);return this._addSvgIconSetConfig(t,new a("",r,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let e=this._sanitizer.sanitize(br$2.RESOURCE_URL,t);if(!e)throw j(t);let n=this._cachedIconsByUrl.get(e);return n?ag(C(n)):this._loadSvgIconFromConfig(new a(t,null)).pipe($l(o=>this._cachedIconsByUrl.set(e,o)),Me$3(o=>C(o)))}getNamedSvgIcon(t,e=""){let n=V$1(e,t),o=this._svgIconConfigs.get(n);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(e,t),o)return this._svgIconConfigs.set(n,o),this._getSvgFromConfig(o);let r=this._iconSetConfigs.get(e);return r?this._getSvgFromIconSetConfigs(t,r):cg($(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear();}_getSvgFromConfig(t){return t.svgText?ag(C(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(Me$3(e=>C(e)))}_getSvgFromIconSetConfigs(t,e){let n=this._extractIconWithNameFromAnySet(t,e);if(n)return ag(n);let o=e.filter(r=>!r.svgText).map(r=>this._loadSvgIconSetFromConfig(r).pipe(Yi$4(s=>{let f=`Loading icon set URL: ${this._sanitizer.sanitize(br$2.RESOURCE_URL,r.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(f)),ag(null)})));return Eg(o).pipe(Me$3(()=>{let r=this._extractIconWithNameFromAnySet(t,e);if(!r)throw $(t);return r}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){let o=e[n];if(o.svgText&&o.svgText.toString().indexOf(t)>-1){let r=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(r,t,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe($l(e=>t.svgText=e),Me$3(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?ag(null):this._fetchIcon(t).pipe($l(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){let o=t.querySelector(`[id="${e}"]`);if(!o)return null;let r=o.cloneNode(true);if(r.removeAttribute("id"),r.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(r,n);if(r.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(r),n);let s=this._svgElementFromString(_o$2("<svg></svg>"));return s.appendChild(r),this._setSvgAttributes(s,n)}_svgElementFromString(t){let e=this._document.createElement("DIV");e.innerHTML=t;let n=e.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(t){let e=this._svgElementFromString(_o$2("<svg></svg>")),n=t.attributes;for(let o=0;o<n.length;o++){let{name:r,value:s}=n[o];r!=="id"&&e.setAttribute(r,s);}for(let o=0;o<t.childNodes.length;o++)t.childNodes[o].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[o].cloneNode(true));return e}_setSvgAttributes(t,e){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),e&&e.viewBox&&t.setAttribute("viewBox",e.viewBox),t}_fetchIcon(t){let{url:e,options:n}=t,o=n?.withCredentials??false;if(!this._httpClient)throw K();if(e==null)throw Error(`Cannot fetch icon from URL "${e}".`);let r=this._sanitizer.sanitize(br$2.RESOURCE_URL,e);if(!r)throw j(e);let s=this._inProgressUrlFetches.get(r);if(s)return s;let h=this._httpClient.get(r,{responseType:"text",withCredentials:o}).pipe(Me$3(f=>_o$2(f)),Vl$1(()=>this._inProgressUrlFetches.delete(r)),es$1());return this._inProgressUrlFetches.set(r,h),h}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(V$1(t,e),n),this}_addSvgIconSetConfig(t,e){let n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){let e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e;}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){let o=this._resolvers[n](e,t);if(o)return G(o)?new a(o.url,null,o.options):new a(o,null)}}static \u0275fac=function(e){return new(e||i)(ke$4(xr$1,8),ke$4(rn$3),ke$4(ir$4,8),ke$4(Qe$2))};static \u0275prov=re$1({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function C(i){return i.cloneNode(true)}function V$1(i,l){return i+":"+l}function G(i){return !!(i.url&&i.options)}var Q=["*"],X=new S$2("MAT_ICON_DEFAULT_OPTIONS"),Z=new S$2("mat-icon-location",{providedIn:"root",factory:()=>{let i=T$3(ir$4),l=i?i.location:null;return {getPathname:()=>l?l.pathname+l.search:""}}}),Y=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],tt$1=Y.map(i=>`[${i}]`).join(", "),et$1=/^url\(['"]?#(.*?)['"]?\)$/,Et$1=(()=>{class i{_elementRef=T$3(Tr$2);_iconRegistry=T$3(q);_location=T$3(Z);_errorHandler=T$3(Qe$2);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t;}_color;inline=false;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t);}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses());}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses());}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=G$4.EMPTY;constructor(){let t=T$3(new Fh("aria-hidden"),{optional:true}),e=T$3(X,{optional:true});e&&(e.color&&(this.color=this._defaultColor=e.color),e.fontSet&&(this.fontSet=e.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true");}_splitIconName(t){if(!t)return ["",""];let e=t.split(":");switch(e.length){case 1:return ["",e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses();}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e));}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();}_usingFontIcon(){return !this.svgIcon}_setSvgElement(t){this._clearSvgElement();let e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t);}_clearSvgElement(){let t=this._elementRef.nativeElement,e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){let n=t.childNodes[e];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove();}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon);}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let e=this._elementsWithExternalReferences;e&&e.forEach((n,o)=>{n.forEach(r=>{o.setAttribute(r.name,`url('${t}#${r.value}')`);});});}_cacheChildrenWithExternalReferences(t){let e=t.querySelectorAll(tt$1),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<e.length;o++)Y.forEach(r=>{let s=e[o],h=s.getAttribute(r),f=h?h.match(et$1):null;if(f){let p=n.get(s);p||(p=[],n.set(s,p)),p.push({name:r,value:f[1]});}});}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe(It$7(1)).subscribe(o=>this._setSvgElement(o),o=>{let r=`Error retrieving icon ${e}:${n}! ${o.message}`;this._errorHandler.handleError(new Error(r));});}}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=IE({type:i,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(e,n){e&2&&(Kp("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),_D(n.color?"mat-"+n.color:""),gh("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"));},inputs:{color:"color",inline:[2,"inline","inline",PF],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:Q,decls:1,vars:0,template:function(e,n){e&1&&(lD(),uD(0));},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2})}return i})();var Je={type:null,entityIds:null,skip:false,payload:null},qi=false;function Yi(){qi=false;}function ce(r,n,e){U(r,n,e),qi=true;}function U(r,n,e){qi===false&&(Je.type=r,Je.entityIds=n,Je.payload=e);}function Ki(r=true){Je.skip=r;}function Qi(r,n){return function(e,t,i){let a=i.value;return i.value=function(...o){return ce(r,n),a.apply(this,o)},i}}function Me(r,n){return r.hasOwnProperty(n)}function fe(r){return Array.isArray(r)}function Ut(r){return r.hasOwnProperty("active")}function fi(r){return fe(r)}function jt({active:r,ids:n,entities:e}){return fi(r)?ca(r,n):Me(e,r)===false?null:r}function ca(r,n){let e=r.filter(t=>n.indexOf(t)>-1);return e.length===r.length?r:e}function Wi({state:r,entities:n,idKey:e,options:t={},preAddEntity:i}){let a={},o=[],l=false;for(let d of n)if(Me(r.entities,d[e])===false){let m=i(d),k=m[e];a[k]=m,t.prepend?o.unshift(k):o.push(k),l=true;}return l?{newState:x$2(w$3({},r),{entities:w$3(w$3({},r.entities),a),ids:t.prepend?[...o,...r.ids]:[...r.ids,...o]}),newIds:o}:null}function H(r){return r==null}function V(r){return H(r)?[]:Array.isArray(r)?r:[r]}function ke(r){return fe(r)?r.length===0:false}function b(r){return typeof r=="function"}function Ee(r){let n=typeof r;return r!=null&&(n=="object"||n=="function")}var da={resettable:false,ttl:null,producerFn:void 0};function Et(){return da}function ua(){return da.producerFn}function Ue(r){return H(r)===false}var zt=new ne$3,et=new On$2(50,5e3),Gi=new ne$3;function ma(r){zt.next(r);}function pa(r){et.next(r);}function ha(r,n){Gi.next({storeName:r,action:n});}var tt=typeof window<"u",Ht=!tt,$i=()=>{try{return typeof localStorage<"u"}catch(r){return  false}},fa=()=>{try{return typeof sessionStorage<"u"}catch(r){return  false}};var I={},Xi={};tt&&(window.$$stores=I,window.$$queries=Xi);function Ji(r){return r&&r.charAt(0).toUpperCase()+r.slice(1)}var At=[];function Zi(r,n={}){if(Ht||!window.__REDUX_DEVTOOLS_EXTENSION__)return;At.length&&At.forEach(m=>{m.unsubscribe?m.unsubscribe():m&&m();}),r&&r.run||(r=r||{},r.run=m=>m(),n=r);let i=Object.assign({},{name:"Akita",shallow:true,storesWhitelist:[]},n),a=i.storesWhitelist,o=window.__REDUX_DEVTOOLS_EXTENSION__.connect(i),l={},d=m=>a.length?a.indexOf(m)>-1:true;At.push(et.subscribe(m=>{d(m)!==false&&(l=x$2(w$3({},l),{[m]:I[m]._value()}),o.send({type:`[${Ji(m)}] - @@INIT`},l));})),At.push(zt.subscribe(m=>{d(m)!==false&&(delete l[m],o.send({type:`[${m}] - Delete Store`},l));})),At.push(Gi.subscribe(({storeName:m,action:k})=>{if(d(m)===false)return;let Ft=k,{type:x,entityIds:y,skip:w}=Ft,Z=z$4(Ft,["type","entityIds","skip"]).payload;if(w){Ki(false);return}let de=I[m];if(!de||n.shallow===false&&l[m]&&JSON.stringify(de._value())===JSON.stringify(l[m]))return;l=x$2(w$3({},l),{[m]:de._value()});let ge=Ji(m),ee=Ue(y)?`[${ge}] - ${x} (ids: ${y})`:`[${ge}] - ${x}`;if(n.logTrace&&(console.group(ee),console.trace(),console.groupEnd()),n.sortAlphabetically){let st=Object.keys(l).sort().reduce((lt,Rt)=>(lt[Rt]=l[Rt],lt),{});o.send(w$3({type:ee},Z),st);return}o.send(w$3({type:ee},Z),l);})),At.push(o.subscribe(m=>{if(m.type==="DISPATCH"){if(m.payload.type==="COMMIT"){o.init(l);return}if(m.state){let x=JSON.parse(m.state);for(let y=0,w=Object.keys(x);y<w.length;y++){let D=w[y];I[D]&&r.run(()=>{I[D]._setState(()=>x[D],false);});}}}}));}var je=(function(r){return r.Set="Set",r.Add="Add",r.Update="Update",r.Remove="Remove",r})(je||{});function tn(r,n,e){let t;if(fe(r))t=r;else if(Ee(r)){if(H(e))return;r=Object.assign({wrap:true},r);let i=n.indexOf(e);if(r.prev){let a=i===0;if(a&&!r.wrap)return;t=a?n[n.length-1]:n[i-1];}else if(r.next){let a=n.length===i+1;if(a&&!r.wrap)return;t=a?n[0]:n[i+1];}}else {if(r===e)return;t=r;}return t}var nn=()=>({entities:{},ids:[],loading:true,error:null});function xe(r){return r===void 0}function rn({state:r,ids:n}){if(H(n))return ga(r);let e=r.entities,t={};for(let a of r.ids)n.includes(a)===false&&(t[a]=e[a]);let i=x$2(w$3({},r),{entities:t,ids:r.ids.filter(a=>n.includes(a)===false)});return Ut(r)&&(i.active=jt(i)),i}function ga(r){return x$2(w$3({},r),{entities:{},ids:[],active:fi(r.active)?[]:null})}function an(r,n,e){let t={entities:{},ids:[]};for(let i of r){let a=e(i);t.entities[a[n]]=a,t.ids.push(a[n]);}return t}function ya(r){return r.entities&&r.ids}function _a(r,n){let e={};for(let t of Object.keys(r))e[t]=n(r[t]);return e}function on({state:r,entities:n,idKey:e,preAddEntity:t,isNativePreAdd:i}){let a,o;if(fe(n)){let d=an(n,e,t);a=d.entities,o=d.ids;}else ya(n)?(a=i?n.entities:_a(n.entities,t),o=n.ids):(a=i?n:_a(n,t),o=Object.keys(a).map(d=>isNaN(d)?d:Number(d)));let l=x$2(w$3({},r),{entities:a,ids:o,loading:false});return Ut(r)&&(l.active=jt(l)),l}function sn(r){Object.freeze(r);let n=typeof r=="function",e=Object.prototype.hasOwnProperty;return Object.getOwnPropertyNames(r).forEach(function(t){e.call(r,t)&&(!n||t!=="caller"&&t!=="callee"&&t!=="arguments")&&r[t]!==null&&(typeof r[t]=="object"||typeof r[t]=="function")&&!Object.isFrozen(r[t])&&sn(r[t]);}),r}function ba(r,n){r||console.error(`@StoreConfig({ name }) is missing in ${n}`);}function Pe(r){return r!=null&&`${r}`!="false"}function It(r){return Pe(r)&&r.constructor.name==="Object"}var it="akitaConfig";function ln(r){return function(n){n[it]={idKey:"id"};for(let e=0,t=Object.keys(r);e<t.length;e++){let i=t[e];i==="name"?n[it].storeName=r[i]:n[it][i]=r[i];}}}var $a=new ne$3,va=new Rn$2(false),De={activeTransactions:0,batchTransaction:null};function wa(){gi()||(De.batchTransaction=new ne$3),De.activeTransactions++,va.next(true);}function xa(){--De.activeTransactions===0&&(De.batchTransaction.next(true),De.batchTransaction.complete(),va.next(false),$a.next(true));}function gi(){return De.activeTransactions>0}function cn(){return De.batchTransaction?De.batchTransaction.asObservable():ag(true)}function Yt(r,n=void 0){wa();try{return r.apply(n)}finally{ce("@Transaction"),xa();}}function _i(){return function(r,n,e){let t=e.value;return e.value=function(...i){return Yt(()=>t.apply(this,i),this)},e}}var ze=class{constructor(n,e={}){this.options=e,this.inTransaction=false,this.cache={active:new Rn$2(false),ttl:null},this.onInit(n);}setLoading(n=false){n!==this._value().loading&&(U("Set Loading"),this._setState(e=>x$2(w$3({},e),{loading:n})));}setHasCache(n,e={restartTTL:false}){if(n!==this.cache.active.value&&this.cache.active.next(n),e.restartTTL){let t=this.getCacheTTL();t&&(this.cache.ttl!==null&&clearTimeout(this.cache.ttl),this.cache.ttl=setTimeout(()=>this.setHasCache(false),t));}}getValue(){return this.storeValue}setError(n){n!==this._value().error&&(U("Set Error"),this._setState(e=>x$2(w$3({},e),{error:n})));}_select(n){return this.store.asObservable().pipe(Me$3(e=>n(e.state)),Fl())}_value(){return this.storeValue}_cache(){return this.cache.active}get config(){return this.constructor[it]||{}}get storeName(){return this.config.storeName||this.options.storeName||this.options.name}get deepFreeze(){return this.config.deepFreezeFn||this.options.deepFreezeFn||sn}get cacheConfig(){return this.config.cache||this.options.cache}get _producerFn(){return this.config.producerFn||this.options.producerFn||ua()}get resettable(){return Ue(this.config.resettable)?this.config.resettable:this.options.resettable}_setState(n,e=true){if(b(n)){let t=n(this._value());this.storeValue=this.deepFreeze(t);}else this.storeValue=n;if(!this.store){this.store=new Rn$2({state:this.storeValue}),this.store.subscribe(({action:t})=>{t&&ha(this.storeName,t);});return}if(gi()){this.handleTransaction();return}this.dispatch(this.storeValue,e);}reset(){this.isResettable()&&(U("Reset"),this._setState(()=>Object.assign({},this._initialState)),this.setHasCache(false));}update(n){U("Update");let e,t=this._value();b(n)?e=b(this._producerFn)?this._producerFn(t,n):n(t):e=n;let i=this.akitaPreUpdate(t,w$3(w$3({},t),e)),a=It(t)?i:new t.constructor(i);this._setState(a);}updateStoreConfig(n){this.options=w$3(w$3({},this.options),n);}akitaPreUpdate(n,e){return e}destroy(){!(tt&&window.hmrEnabled)&&this===I[this.storeName]&&(delete I[this.storeName],ma(this.storeName),this.setHasCache(false),this.cache.active.complete(),this.store.complete());}onInit(n){I[this.storeName]=this,this._setState(()=>n),pa(this.storeName),this.isResettable()&&(this._initialState=n),ba(this.storeName,this.constructor.name);}dispatch(n,e=true){let t;e&&(t=Je,Yi()),this.store.next({state:n,action:t});}watchTransaction(){cn().subscribe(()=>{this.inTransaction=false,this.dispatch(this._value());});}isResettable(){return this.resettable===false?false:this.resettable||Et().resettable}handleTransaction(){this.inTransaction||(this.watchTransaction(),this.inTransaction=true);}getCacheTTL(){return this.cacheConfig&&this.cacheConfig.ttl||Et().ttl}};function dn({state:r,ids:n,idKey:e,newStateOrFn:t,preUpdateEntity:i,producerFn:a,onEntityIdChanges:o}){let l={},d=false,m;for(let w of n){if(Me(r.entities,w)===false)continue;let D=r.entities[w],Z;b(t)?Z=b(a)?a(D,t):t(D):Z=t;let de=Z.hasOwnProperty(e)&&Z[e]!==D[e],ge;m=w,de&&(d=true,m=Z[e]);let ee=w$3(w$3({},D),Z);It(D)?ge=ee:It(Z)?ge=new D.constructor(ee):ge=new Z.constructor(ee),l[m]=i(D,ge);}let k=r.ids,x=r.entities;if(d){let[w]=n,y=r.entities,{[w]:D}=y;x=z$4(y,[y$2(w)]),k=r.ids.map(de=>de===w?m:de),o(w,m);}return x$2(w$3({},r),{entities:w$3(w$3({},x),l),ids:k})}var Ca,nt=class r extends ze{constructor(n={},e={}){super(w$3(w$3({},nn()),n),e),this.options=e,this.entityActions=new ne$3,this.entityIdChanges=new ne$3;}get selectEntityAction$(){return this.entityActions.asObservable()}get selectEntityIdChanges$(){return this.entityIdChanges.asObservable()}get idKey(){return this.config.idKey||this.options.idKey||"id"}set(n,e={}){if(H(n))return;U("Set Entity");let t=this.akitaPreAddEntity===r.prototype.akitaPreAddEntity;this.setHasCache(true,{restartTTL:true}),this._setState(i=>{let a=on({state:i,entities:n,idKey:this.idKey,preAddEntity:this.akitaPreAddEntity.bind(this),isNativePreAdd:t});return xe(e.activeId)===false&&(a.active=e.activeId),a}),this.hasInitialUIState()&&this.handleUICreation(),this.entityActions.next({type:je.Set,ids:this.ids});}add(n,e={loading:false}){let t=V(n);if(ke(t))return;let i=Wi({state:this._value(),preAddEntity:this.akitaPreAddEntity.bind(this),entities:t,idKey:this.idKey,options:e});i&&(U("Add Entity"),i.newState.loading=e.loading,this._setState(()=>i.newState),this.hasInitialUIState()&&this.handleUICreation(true),this.entityActions.next({type:je.Add,ids:i.newIds}));}update(n,e){if(xe(e)){super.update(n);return}let t=[];if(b(n)?t=this.ids.filter(a=>n(this.entities[a])):t=H(n)?this.ids:V(n),ke(t))return;U("Update Entity",t);let i;this._setState(a=>dn({idKey:this.idKey,ids:t,preUpdateEntity:this.akitaPreUpdateEntity.bind(this),state:a,newStateOrFn:e,producerFn:this._producerFn,onEntityIdChanges:(o,l)=>{i={oldId:o,newId:l},this.entityIdChanges.next(x$2(w$3({},i),{pending:true}));}})),i&&this.entityIdChanges.next(x$2(w$3({},i),{pending:false})),this.entityActions.next({type:je.Update,ids:t});}upsert(n,e,t,i={}){let a=V(n),o=x=>y=>Me(this.entities,y)===x,l=b(t)?i.baseClass:t?t.baseClass:void 0,d=b(l),m=a.filter(o(true)),k=a.filter(o(false)).map(x=>{let y=typeof e=="function"?e({}):e,w=b(t)?t(x,y):y,D=x$2(w$3({},w),{[this.idKey]:x});return d?new l(D):D});this.update(m,e),this.add(k),ce("Upsert Entity");}upsertMany(n,e={}){let t=[],i=[],a={};for(let o of n){let l=this.akitaPreCheckEntity(o),d=l[this.idKey];if(Me(this.entities,d)){let m=this._value().entities[d],k=w$3(w$3({},this._value().entities[d]),l),x=e.baseClass?new e.baseClass(k):k,y=this.akitaPreUpdateEntity(m,x),w=y[this.idKey];a[w]=y,i.push(w);}else {let m=e.baseClass?new e.baseClass(l):l,k=this.akitaPreAddEntity(m),x=k[this.idKey];t.push(x),a[x]=k;}}ce("Upsert Many"),this._setState(o=>x$2(w$3({},o),{ids:t.length?[...o.ids,...t]:o.ids,entities:w$3(w$3({},o.entities),a),loading:!!e.loading})),i.length&&this.entityActions.next({type:je.Update,ids:i}),t.length&&this.entityActions.next({type:je.Add,ids:t}),t.length&&this.hasUIStore()&&this.handleUICreation(true);}replace(n,e){let t=V(n);if(ke(t))return;let i={};for(let a of t)i[a]=x$2(w$3({},e),{[this.idKey]:a});U("Replace Entity",n),this._setState(a=>x$2(w$3({},a),{entities:w$3(w$3({},a.entities),i)}));}move(n,e){let t=this.ids.slice();t.splice(e<0?t.length+e:e,0,t.splice(n,1)[0]),U("Move Entity"),this._setState(i=>x$2(w$3({},i),{entities:w$3({},i.entities),ids:t}));}remove(n){if(ke(this.ids))return;let e=Ue(n),t=[];b(n)?t=this.ids.filter(i=>n(this.entities[i])):t=e?V(n):this.ids,!ke(t)&&(U("Remove Entity",t),this._setState(i=>rn({state:i,ids:t})),e||this.setHasCache(false),this.handleUIRemove(t),this.entityActions.next({type:je.Remove,ids:t}));}updateActive(n){let e=V(this.active);U("Update Active",e),this.update(e,n);}setActive(n){let e=tn(n,this.ids,this.active);e!==void 0&&(U("Set Active",e),this._setActive(e));}addActive(n){let e=V(n);ke(e)||e.every(i=>this.active.indexOf(i)>-1)||(U("Add Active",n),this._setState(i=>{let a=Array.from(new Set([...i.active,...e]));return x$2(w$3({},i),{active:a})}));}removeActive(n){let e=V(n);ke(e)||!e.some(i=>this.active.indexOf(i)>-1)||(U("Remove Active",n),this._setState(i=>x$2(w$3({},i),{active:Array.isArray(i.active)?i.active.filter(a=>e.indexOf(a)===-1):null})));}toggleActive(n){let e=V(n),t=o=>l=>this.active.includes(l)===o,i=e.filter(t(true)),a=e.filter(t(false));this.removeActive(i),this.addActive(a),ce("Toggle Active");}createUIStore(n={},e={}){let t={name:`UI/${this.storeName}`,idKey:this.idKey};return this.ui=new Kt(n,w$3(w$3({},t),e)),this.ui}destroy(){super.destroy(),this.ui instanceof r&&this.ui.destroy(),this.entityActions.complete();}akitaPreUpdateEntity(n,e){return e}akitaPreAddEntity(n){return n}akitaPreCheckEntity(n){return n}get ids(){return this._value().ids}get entities(){return this._value().entities}get active(){return this._value().active}_setActive(n){this._setState(e=>x$2(w$3({},e),{active:n}));}handleUICreation(n=false){let e=this.ids,t=b(this.ui._akitaCreateEntityFn),i,a=o=>{let l=this.entities[o],d=t?this.ui._akitaCreateEntityFn(l):this.ui._akitaCreateEntityFn;return w$3({[this.idKey]:l[this.idKey]},d)};n?i=this.ids.filter(o=>xe(this.ui.entities[o])).map(a):i=e.map(a),n?this.ui.add(i):this.ui.set(i);}hasInitialUIState(){return this.hasUIStore()&&xe(this.ui._akitaCreateEntityFn)===false}handleUIRemove(n){this.hasUIStore()&&this.ui.remove(n);}hasUIStore(){return this.ui instanceof Kt}};uT([_i(),dT("design:type",Function),dT("design:paramtypes",[Object,Object,Object,Object]),dT("design:returntype",void 0)],nt.prototype,"upsert",null);uT([_i(),dT("design:type",Function),dT("design:paramtypes",[typeof(Ca=typeof T<"u"&&T)=="function"?Ca:Object]),dT("design:returntype",void 0)],nt.prototype,"toggleActive",null);var Kt=class extends nt{constructor(n={},e={}){super(n,e);}setInitialEntityState(n){this._akitaCreateEntityFn=n;}};function un(){return Xt$5(r=>r!=null)}function Sa(r){return function(n,e){let t=b(r[0]);return r.some(i=>t?i(n)!==i(e):n[i]!==e[i])===false}}function rt(r){return typeof r=="string"}var mn="akitaQueryConfig";var at=class{constructor(n){this.store=n,this.__store__=n,(Xi[n.storeName]=this);}select(n){let e;if(b(n))e=n;else if(rt(n))e=t=>t[n];else {if(Array.isArray(n))return this.store._select(t=>t).pipe(Fl(Sa(n)),Me$3(t=>b(n[0])?n.map(i=>i(t)):n.reduce((i,a)=>(i[a]=t[a],i),{})));e=t=>t;}return this.store._select(e)}selectLoading(){return this.select(n=>n.loading)}selectError(){return this.select(n=>n.error)}getValue(){return this.store._value()}selectHasCache(){return this.store._cache().asObservable()}getHasCache(){return this.store._cache().value}get config(){return this.constructor[mn]}};function ot(r,n){return n.split(".").length===1?r:n.split(".").slice(1).join(".").split(".").reduce((t,i)=>t&&t[i],r)}function Tt(r,n,e,t=false){let i=n.split(".");if(i.length===1)return w$3(w$3({},r),e);r=w$3({},r);let a=i.length-2;return n.split(".").slice(1).reduce((l,d,m)=>m!==a?(l[d]=w$3({},l[d]),l&&l[d]):(l[d]=t||Array.isArray(l[d])||!Ee(l[d])?e:w$3(w$3({},l[d]),e),l&&l[d]),r),r}var ka=false,to=new On$2(1);function io(){return ka}function no(r){return r&&b(r.then)}function Qt(r){return no(r)||lg(r)?Se$3(r):ag(r)}function hn(r){let n={key:"AkitaStores",enableInNonBrowser:false,storage:$i()?localStorage:r.storage,deserialize:JSON.parse,serialize:JSON.stringify,include:[],select:[],persistOnDestroy:false,preStorageUpdate:function(S,v){return v},preStoreUpdate:function(S,v){return v},skipStorageUpdate:io,preStorageUpdateOperator:()=>S=>S},{storage:e,enableInNonBrowser:t,deserialize:i,serialize:a,include:o,select:l,key:d,preStorageUpdate:m,persistOnDestroy:k,preStorageUpdateOperator:x,preStoreUpdate:y,skipStorageUpdate:w}=Object.assign({},n,r);if(Ht&&!t||!e)return;let D=o.length>0,Z=l.length>0,de,ge;D&&(de=o.reduce((S,v)=>{if(b(v))S.fns.push(v);else {let Ae=v.split(".")[0];S[Ae]=v;}return S},{fns:[]})),Z&&(ge=l.reduce((S,v)=>(S[v.storeName]=v,S),{}));let ee={},Ft={},st=[],lt=[];function Rt(S){Qt(S).subscribe(()=>{let v=lt.shift();v&&Rt(v);});}let Ka=$i()&&e===localStorage||fa()&&e===sessionStorage;return Qt(e.getItem(d)).subscribe(S=>{let v=Ee(S)?S:i(S||"{}");function Ae(f){v.$cache=w$3(w$3({},v.$cache||{}),f),v=Object.assign({},v,Ft),lt.push(e.setItem(d,Ka?a(v):v)),Rt(lt.shift());}function ct(f,dt){ee[f]=I[f]._select(oe=>ot(oe,dt)).pipe(Hl(1),Me$3(oe=>Z&&ge[f]?ge[f](oe):oe),Xt$5(()=>w()===false),x()).subscribe(oe=>{Ft[f]=m(f,oe),Promise.resolve().then(()=>Ae({[f]:I[f]._cache().getValue()}));});}function Oi(f,dt,oe){if(f in v){U("@PersistState"),dt._setState(Xt=>Tt(Xt,oe,y(f,v[f],Xt)));let Mn=v.$cache?v.$cache[f]:false;I[f].setHasCache(Mn,{restartTTL:true});}}st.push(zt.subscribe(f=>{ee[f]&&(k===false&&Ae({[f]:false}),ee[f].unsubscribe(),delete ee[f]);})),st.push(et.subscribe(f=>{if(f==="router")return;let dt=I[f];if(D){let oe=de[f];if(!oe)if(de.fns.some(Xt=>Xt(f)))oe=f;else return;Oi(f,dt,oe),ct(f,oe);}else Oi(f,dt,f),ct(f,f);})),to.next(true);}),{destroy(){st.forEach(S=>S.unsubscribe());for(let S=0,v=Object.keys(ee);S<v.length;S++){let Ae=v[S];ee[Ae].unsubscribe();}ee={};},clear(){e.clear();},clearStore(S){if(H(S)){Qt(e.setItem(d,"{}")).subscribe();return}let v=e.getItem(d);Qt(v).subscribe(Ae=>{let ct=i(Ae||"{}");ct[S]&&(delete ct[S],Qt(e.setItem(d,a(ct))).subscribe());});}}}var He=class{constructor(n,e){this.query=n,e&&e.resetFn&&Et().resettable;}getQuery(){return this.query}getStore(){return this.getQuery().__store__}isEntityBased(n){return Pe(n)}selectSource(n,e){return this.isEntityBased(n)?this.getQuery().selectEntity(n).pipe(un()):e?this.getQuery().select(t=>ot(t,this.withStoreName(e))):this.getQuery().select()}getSource(n,e){if(this.isEntityBased(n))return this.getQuery().getEntity(n);let t=this.getQuery().getValue();return e?ot(t,this.withStoreName(e)):t}withStoreName(n){return `${this.storeName}.${n}`}get storeName(){return this.getStore().storeName}updateStore(n,e,t,i=false){if(this.isEntityBased(e)){let a=this.getStore();i?a.replace(e,n):a.update(e,n);}else {if(t){this.getStore()._setState(o=>Tt(o,this.withStoreName(t),n,true));return}let a=i?n:o=>w$3(w$3({},o),n);this.getStore()._setState(a);}}onReset(n){let e=this.getStore().reset;this.getStore().reset=(...t)=>{setTimeout(()=>{e.apply(this.getStore(),t),n();});};}};var so={pagesControls:false,range:false,startWith:1,cacheTimeout:void 0,clearStoreWithCache:true},yi=class extends He{constructor(n,e={}){super(n,{resetFn:()=>{this.initial=false,this.destroy({clearCache:true,currentPage:1});}}),this.query=n,this.config=e,this.metadata=new Map,this.pages=new Map,this.pagination={currentPage:1,perPage:0,total:0,lastPage:0,data:[]},this.initial=true,this.isLoading$=this.query.selectLoading().pipe(Ll(0)),this.config=w$3(w$3({},so),e);let{startWith:t,cacheTimeout:i}=this.config;this.page=new Rn$2(t),lg(i)&&(this.clearCacheSubscription=i.subscribe(()=>this.clearCache()));}get pageChanges(){return this.page.asObservable()}get currentPage(){return this.pagination.currentPage}get isFirst(){return this.currentPage===1}get isLast(){return this.currentPage===this.pagination.lastPage}withControls(){return this.config.pagesControls=true,this}withRange(){return this.config.range=true,this}setLoading(n=true){this.getStore().setLoading(n);}update(n){this.pagination=n,this.addPage(n.data);}addPage(n){this.pages.set(this.currentPage,{ids:n.map(e=>e[this.getStore().idKey])}),this.getStore().upsertMany(n);}clearCache(n={}){this.initial||(ce("@Pagination - Clear Cache"),n.clearStore!==false&&(this.config.clearStoreWithCache||n.clearStore)&&this.getStore().remove(),this.pages=new Map,this.metadata=new Map),this.initial=false;}clearPage(n){this.pages.delete(n);}destroy({clearCache:n,currentPage:e}={}){this.clearCacheSubscription&&this.clearCacheSubscription.unsubscribe(),n&&this.clearCache(),xe(e)||this.setPage(e),this.initial=true;}isPageActive(n){return this.currentPage===n}setPage(n){(n!==this.currentPage||!this.hasPage(n))&&this.page.next(this.pagination.currentPage=n);}nextPage(){this.currentPage!==this.pagination.lastPage&&this.setPage(this.pagination.currentPage+1);}prevPage(){this.pagination.currentPage>1&&this.setPage(this.pagination.currentPage-1);}setLastPage(){this.setPage(this.pagination.lastPage);}setFirstPage(){this.setPage(1);}hasPage(n){return this.pages.has(n)}getPage(n){let e=this.pagination.currentPage;return this.hasPage(e)?this.selectPage(e):(this.setLoading(true),Se$3(n()).pipe(vl(t=>(e=t.currentPage,Yt(()=>{this.setLoading(false),this.update(t);}),this.selectPage(e)))))}getQuery(){return this.query}refreshCurrentPage(){H(this.currentPage)===false&&(this.clearPage(this.currentPage),this.setPage(this.currentPage));}getFrom(){return this.isFirst?1:(this.currentPage-1)*this.pagination.perPage+1}getTo(){return this.isLast?this.pagination.total:this.currentPage*this.pagination.perPage}selectPage(n){return this.query.selectAll({asObject:true}).pipe(It$7(1),Me$3(e=>{let t=x$2(w$3({},this.pagination),{data:this.pages.get(n).ids.map(o=>e[o])}),{range:i,pagesControls:a}=this.config;return isNaN(this.pagination.total)&&(t.lastPage===1?t.total=t.data?t.data.length:0:t.total=t.perPage*t.lastPage,this.pagination.total=t.total),i&&(t.from=this.getFrom(),t.to=this.getTo()),a&&(t.pageControls=lo(this.pagination.total,this.pagination.perPage)),t}))}};uT([Qi("@Pagination - New Page"),dT("design:type",Function),dT("design:paramtypes",[Object]),dT("design:returntype",void 0)],yi.prototype,"update",null);function lo(r,n){let e=Math.ceil(r/n),t=[];for(let i=0;i<e;i++)t.push(i+1);return t}var fn=(function(r){return r.Update="UPDATE",r})(fn||{});({[fn.Update]:"update"});var Oe=(function(r){return r.Update="UPDATE",r.AddEntities="ADD_ENTITIES",r.SetEntities="SET_ENTITIES",r.UpdateEntities="UPDATE_ENTITIES",r.RemoveEntities="REMOVE_ENTITIES",r.UpsertEntities="UPSERT_ENTITIES",r.UpsertManyEntities="UPSERT_MANY_ENTITIES",r})(Oe||{});({[Oe.Update]:"update",[Oe.AddEntities]:"add",[Oe.SetEntities]:"set",[Oe.UpdateEntities]:"update",[Oe.RemoveEntities]:"remove",[Oe.UpsertEntities]:"upsert",[Oe.UpsertManyEntities]:"upsertMany"});var fo=["trigger"],go=["panel"],_o=[[["mat-select-trigger"]],"*"],yo=["mat-select-trigger","*"];function bo(r,n){if(r&1&&(wi$2(0,"span",4),FD(1),Hc()),r&2){let e=aD();Hv(),Dh(e.placeholder);}}function vo(r,n){r&1&&uD(0);}function wo(r,n){if(r&1&&(wi$2(0,"span",11),FD(1),Hc()),r&2){let e=aD(2);Hv(),Dh(e.triggerValue);}}function xo(r,n){if(r&1&&(wi$2(0,"span",5),ZE(1,vo,1,0)(2,wo,2,1,"span",11),Hc()),r&2){let e=aD();Hv(),YE(e.customTrigger?1:2);}}function Co(r,n){if(r&1){let e=iD();wi$2(0,"div",12,1),ih("keydown",function(i){xu(e);let a=aD();return Au(a._handleKeydown(i))}),uD(2,1),Hc();}if(r&2){let e=aD();_D(e.panelClass),gh("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._parentFormField?.color==="primary")("mat-accent",e._parentFormField?.color==="accent")("mat-warn",e._parentFormField?.color==="warn")("mat-undefined",!e._parentFormField?.color),Kp("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby());}}var So=new S$2("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let r=T$3(le$2);return ()=>yn(r)}}),Mo=new S$2("MAT_SELECT_CONFIG"),ko=new S$2("MatSelectTrigger"),gn=class{source;value;constructor(n,e){this.source=n,this.value=e;}},Ia=(()=>{class r{_viewportRuler=T$3(Fe$1);_changeDetectorRef=T$3(kF);_elementRef=T$3(Tr$2);_dir=T$3(ea,{optional:true});_idGenerator=T$3(hn$3);_renderer=T$3(CI);_parentFormField=T$3(tr$1,{optional:true});ngControl=T$3(_e$1,{self:true,optional:true});_liveAnnouncer=T$3(Po$2);_defaultOptions=T$3(Mo,{optional:true});_animationsDisabled=we$3();_popoverLocation;_initialized=new ne$3;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=yt$3(e,this.options,this.optionGroups),o=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=wt$4(o.offsetTop,o.offsetHeight,i.scrollTop,i.offsetHeight);}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0);}_getChangeEvent(e){return new gn(this,e)}_scrollStrategyFactory=T$3(So);_panelOpen=false;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new ne$3;_errorStateTracker;stateChanges=new ne$3;disableAutomaticLabeling=true;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=false;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=false;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e);}_disableRipple=Fe$3(false);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next();}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Pt$2.required)??false}set required(e){this._required=e,this.stateChanges.next();}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e;}_multiple=false;disableOptionCentering=this._defaultOptions?.disableOptionCentering??false;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection();}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e);}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next();}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??false;optionSelectionChanges=Ig(()=>{let e=this.options;return e?e.changes.pipe(Bl(e),vl(()=>Dg(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(vl(()=>this.optionSelectionChanges))});openedChange=new qe$3;_openedStream=this.openedChange.pipe(Xt$5(e=>e),Me$3(()=>{}));_closedStream=this.openedChange.pipe(Xt$5(e=>!e),Me$3(()=>{}));selectionChange=new qe$3;valueChange=new qe$3;constructor(){let e=T$3(is$1),t=T$3(zr,{optional:true}),i=T$3(Yr$1,{optional:true}),a=T$3(new Fh("tabindex"),{optional:true}),o=T$3(Qt$2,{optional:true});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new hn$1(e,this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=o?.usePopover===false?null:"inline",this.id=this.id;}ngOnInit(){this._selectionModel=new B$4(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Rg(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges());});}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Rg(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect());}),this.options.changes.pipe(Bl(null),Rg(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection();});}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute("aria-labelledby",e):i.removeAttribute("aria-labelledby");}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState());}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass));}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete();}toggle(){this.panelOpen?this.close():this.open();}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=true,this._overlayDir.positionChange.pipe(It$7(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled();}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(true)));}close(){this._panelOpen&&(this._panelOpen=false,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(false)));}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0;};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",a=>{a.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay());}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay();},200);e.classList.add("mat-select-panel-exit");}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck();}writeValue(e){this._assignValue(e);}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next();}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return "";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState();}_isRtl(){return this._dir?this._dir.value==="rtl":false}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e));}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,o=this._keyManager;if(!o.isTyping()&&a&&!Yr$2(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;o.onKeydown(e);let d=this.selected;d&&l!==d&&this._liveAnnouncer.announce(d.viewValue,1e4);}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,o=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!o&&(i===13||i===32)&&t.activeItem&&!Yr$2(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!o&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(d=>!d.disabled&&!d.selected);this.options.forEach(d=>{d.disabled||(l?d.select():d.deselect());});}else {let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction();}}_handleOverlayKeydown(e){e.keyCode===27&&!Yr$2(e)&&(e.preventDefault(),this.close());}_onFocus(){this.disabled||(this._focused=true,this.stateChanges.next());}_onBlur(){this._focused=false,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next());}get empty(){return !this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next();});}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else {let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1);}this._changeDetectorRef.markForCheck();}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return  false;try{return (i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch(a){return  false}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,true):false}_skipPredicate=e=>this.panelOpen?false:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof $t$2?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck();}_initKeyManager(){this._keyManager=new mn$3(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close());}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction();});}_resetOptions(){let e=Dg(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Rg(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus());}),Dg(...this.options.map(t=>t._stateChanges)).pipe(Rg(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next();});}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next();}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next();}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck();}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e);}else this._keyManager.setActiveItem(this._selectionModel.selected[0]);}_canOpen(){return !this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e);}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby");}onContainerClick(e){let t=N$4(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open());}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-select"]],contentQueries:function(t,i,a){if(t&1&&ch(a,ko,5)(a,kt$3,5)(a,dt$4,5),t&2){let o;fD(o=pD())&&(i.customTrigger=o.first),fD(o=pD())&&(i.options=o),fD(o=pD())&&(i.optionGroups=o);}},viewQuery:function(t,i){if(t&1&&lh(fo,5)(go,5)(no$1,5),t&2){let a;fD(a=pD())&&(i.trigger=a.first),fD(a=pD())&&(i.panel=a.first),fD(a=pD())&&(i._overlayDir=a.first);}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,i){t&1&&ih("keydown",function(o){return i._handleKeydown(o)})("focus",function(){return i._onFocus()})("blur",function(){return i._onBlur()}),t&2&&(Kp("id",i.id)("tabindex",i.disabled?-1:i.tabIndex)("aria-controls",i.panelOpen?i.id+"-panel":null)("aria-expanded",i.panelOpen)("aria-label",i.ariaLabel||null)("aria-required",i.required.toString())("aria-disabled",i.disabled.toString())("aria-invalid",i.errorState)("aria-activedescendant",i._getAriaActiveDescendant()),gh("mat-mdc-select-disabled",i.disabled)("mat-mdc-select-invalid",i.errorState)("mat-mdc-select-required",i.required)("mat-mdc-select-empty",i.empty)("mat-mdc-select-multiple",i.multiple)("mat-select-open",i.panelOpen));},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",PF],disableRipple:[2,"disableRipple","disableRipple",PF],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:LF(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",PF],placeholder:"placeholder",required:[2,"required","required",PF],multiple:[2,"multiple","multiple",PF],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",PF],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",LF],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",PF]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[zD([{provide:er$1,useExisting:r},{provide:mt$4,useExisting:r}]),Pm],ngContentSelectors:yo,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,i){if(t&1&&(lD(_o),wi$2(0,"div",2,0),ih("click",function(){return i.open()}),wi$2(3,"div",3),ZE(4,bo,2,1,"span",4)(5,xo,3,1,"span",5),Hc(),wi$2(6,"div",6)(7,"div",7),Uu$1(),wi$2(8,"svg",8),Xp(9,"path",9),Hc()()()(),Gp(10,Co,3,16,"ng-template",10),ih("detach",function(){return i.close()})("backdropClick",function(){return i.close()})("overlayKeydown",function(o){return i._handleOverlayKeydown(o)})),t&2){let a=gD(1);Hv(3),Kp("id",i._valueId),Hv(),YE(i.empty?4:5),Hv(6),Jp("cdkConnectedOverlayDisableClose",true)("cdkConnectedOverlayPanelClass",i._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",i._scrollStrategy)("cdkConnectedOverlayOrigin",i._preferredOverlayOrigin||a)("cdkConnectedOverlayPositions",i._positions)("cdkConnectedOverlayWidth",i._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",true)("cdkConnectedOverlayUsePopover",i._popoverLocation);}},dependencies:[$t$2,no$1],styles:[`@keyframes _mat-select-enter {
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
`],encapsulation:2})}return r})();function Eo(){return {artPieces:[],lastArtPiecesUpdate:void 0,imageCache:[]}}var Pt=class ki extends ze{constructor(){super(Eo());}static{this.\u0275fac=function(e){return new(e||ki)};}static{this.\u0275prov=re$1({token:ki,factory:ki.\u0275fac,providedIn:"root"});}};Pt=uT([ln({name:"session"})],Pt);var Ei=(()=>{class r extends at{constructor(){super(T$3(Pt)),this.getArtPiecesObservable=this.select(({artPieces:e})=>[...e]);}get selectArtPieces(){return this.getValue().artPieces}get selectLastArtPiecesUpdate(){return this.getValue().lastArtPiecesUpdate}getThumbnailByTokenId(e){return this.getValue().imageCache.find(t=>t?.tokenId===e)}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275prov=re$1({token:r,factory:r.\u0275fac,providedIn:"root"});}}return r})();var Ta=(r,n)=>n.label;function Ao(r,n){if(r&1&&(wi$2(0,"mat-chip",1)(1,"a",7),FD(2),Hc()()),r&2){let e=n.$implicit;Hv(),Jp("routerLink",e.url)("queryParams",e.queryParams),Kp("aria-label",e.queryParams),Hv(),qc(" ",e.label," ");}}function Io(r,n){if(r&1&&(wi$2(0,"mat-option",5),FD(1),Hc()),r&2){let e=n.$implicit;Jp("value",e),Hv(),qc(" ",e," ");}}function To(r,n){if(r&1){let e=iD();wi$2(0,"mat-chip",8),ei$2("year-chip-leave"),Xo$2("year-chip-enter"),ih("removed",function(){let i=xu(e).$implicit,a=aD(2);return Au(a.removeYearFilter(i.label))}),wi$2(1,"a",7),FD(2),Hc(),wi$2(3,"button",9)(4,"mat-icon"),FD(5,"cancel"),Hc()()();}if(r&2){let e=n.$implicit;Jp("removable",true),Hv(),Jp("routerLink",e.url)("queryParams",e.queryParams),Kp("aria-label",e.queryParams),Hv(),qc(" ",e.label," "),Hv(),Kp("aria-label","Remove year "+e.label);}}function Po(r,n){if(r&1&&(wi$2(0,"nav",0)(1,"mat-chip-listbox")(2,"mat-chip",1)(3,"a",2)(4,"mat-icon"),FD(5,"home"),Hc()()(),JE(6,Ao,3,4,"mat-chip",1,Ta),wi$2(8,"mat-form-field",3)(9,"mat-label"),FD(10),KD(11,"translate"),Hc(),wi$2(12,"mat-select",4),JE(13,Io,2,2,"mat-option",5,KE),Hc(),xI(),Hc(),JE(15,To,6,6,"mat-chip",6,Ta),Hc()()),r&2){let e=aD();Hv(6),XE(e.routeBreadcrumbs()),Hv(4),Dh(XD(11,2,"selectYear")),Hv(2),Jp("formField",e.yearPickerForm.newYear),RI(),Hv(),XE(e.validYears),Hv(2),XE(e.yearBreadcrumbs());}}var Pa=(()=>{class r{constructor(){this.artworkService=T$3(c),this.router=T$3(te$1),this.activatedRoute=T$3(Q$4),this.translateService=T$3(Z$2),this.sessionQuery=T$3(Ei),this.selectedYears=[],this.routeBreadcrumbs=dt$6(()=>this.breadcrumbs().filter(e=>!e.isYear)),this.yearBreadcrumbs=dt$6(()=>this.breadcrumbs().filter(e=>!!e.isYear)),this.yearPickerModel=Fe$3({newYear:null}),this.yearPickerForm=zt$1(this.yearPickerModel),this.breadcrumbs=Fe$3(this.buildBreadCrumb(this.activatedRoute.root)),pa$1(()=>{let e=this.yearPickerForm.newYear().value();e!==null&&ae$2(()=>this.handleYearChange(e));});}ngOnInit(){this.router.events.pipe(Xt$5(e=>e instanceof k$2),Fl()).subscribe(()=>{this.selectedYears=this.extractSelectedYears(),this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute.root));});}handleYearChange(e){this.validYears.includes(e)&&!this.selectedYears.includes(e)&&(this.selectedYears.push(e),this.updateQueryParams()),setTimeout(()=>this.yearPickerModel.set({newYear:null}));}removeYearFilter(e){this.selectedYears=this.selectedYears.filter(t=>t!==Number(e)),this.updateQueryParams();}get validYears(){return [...this.artworkService.getAvailableYears()].filter(e=>!this.selectedYears.includes(e))}updateQueryParams(){let e={years:this.selectedYears.length?this.selectedYears.join(","):null};this.router.navigate([],{queryParams:e});}extractSelectedYears(){let e=this.activatedRoute.snapshot.queryParamMap.get("years");return e?e.split(",").map(t=>Number(t)):[]}buildBreadCrumb(e,t="",i=[]){let a=e.routeConfig&&e.routeConfig.data?e.routeConfig.data.breadcrumb:"",o=e.routeConfig&&e.routeConfig.data?e.routeConfig.path:"",l=o?o.split("/").pop():"";if(l.startsWith(":")&&e.snapshot){let y=l.split(":")[1],w=e.snapshot.params[y];o=o.replace(l,w),y==="id"?a=this.extractNameFromId(w)||w:a=w;}let m=o?`${t}/${o}`:t,k={label:a?this.translateService.instant(a.toLowerCase()):"",url:m,queryParams:{years:[]}},x=a?[...i,k]:[...i];if(e.firstChild)return this.buildBreadCrumb(e.firstChild,m,x);{let y=e.snapshot.queryParamMap.get("years");y&&y.split(",").forEach(D=>{x.push({label:D,url:m,queryParams:{years:D},isYear:true});});}return x}extractNameFromId(e){return this.artworkService.getNftById(e,this.sessionQuery.selectArtPieces)?.name||null}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-breadcrumb"]],decls:1,vars:1,consts:[["aria-label","Breadcrumb",1,"container"],["color","primary"],["routerLink","/","routerLinkActive","router-link-active","aria-label","Home","matLine","",1,"link-as-text"],["appearance","outline","subscriptSizing","dynamic",1,"small-input"],["aria-label","Select year",3,"formField"],[3,"value"],["color","primary",3,"removable"],["routerLinkActive","router-link-active","matLine","",1,"link-as-text",3,"routerLink","queryParams"],["color","primary",3,"removed","removable"],["matChipRemove",""]],template:function(t,i){t&1&&ZE(0,Po,17,4,"nav",0),t&2&&YE(i.breadcrumbs().length?0:-1);},dependencies:[zi,q$1,wt,Ut$3,_o$1,Et$1,or$1,Ia,Jr,kt$3,At$2,rt$2],styles:[".small-input[_ngcontent-%COMP%]{width:10.8rem;margin-left:.8rem;align-self:flex-start;margin-top:.25rem}.link-as-text[_ngcontent-%COMP%]{all:unset;display:flex;align-items:center;color:inherit;text-decoration:none;cursor:text}@keyframes _ngcontent-%COMP%_year-chip-enter-anim{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}@keyframes _ngcontent-%COMP%_year-chip-leave-anim{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85)}}.year-chip-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-enter-anim .18s ease-out}.year-chip-leave[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_year-chip-leave-anim .15s ease-in}"]});}}return r})();function Do(r,n){if(r&1){let e=iD();wi$2(0,"button",1),ih("click",function(){xu(e);let i=aD();return Au(i.handleClick())}),wi$2(1,"mat-icon"),FD(2,"share"),Hc()();}}var Da=(()=>{class r{constructor(){this.canShare=typeof navigator.share=="function";}handleClick(){if(this.canShare){let e={title:"Juanma Moreno S\xE1nchez",text:"Contemporary Art",url:window.location.href};navigator.share(e);}}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-share-button"]],decls:1,vars:1,consts:[["aria-label","share","mat-mini-fab","","color","primary",1,"share-button"],["aria-label","share","mat-mini-fab","","color","primary",1,"share-button",3,"click"]],template:function(t,i){t&1&&ZE(0,Do,3,0,"button",0),t&2&&YE(i.canShare?0:-1);},dependencies:[af,Et$1],styles:[".share-button[_ngcontent-%COMP%]{position:fixed;bottom:1.25rem;left:.25rem;z-index:9999}"]});}}return r})();var Oo=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],Fo=["mat-icon, [matMenuItemIcon]","*"];function Ro(r,n){r&1&&(Uu$1(),wi$2(0,"svg",2),Xp(1,"polygon",3),Hc());}var Bo=["*"];function No(r,n){if(r&1){let e=iD();Bc(0,"div",0),sh("click",function(){xu(e);let i=aD();return Au(i.closed.emit("click"))})("animationstart",function(i){xu(e);let a=aD();return Au(a._onAnimationStart(i.animationName))})("animationend",function(i){xu(e);let a=aD();return Au(a._onAnimationDone(i.animationName))})("animationcancel",function(i){xu(e);let a=aD();return Au(a._onAnimationDone(i.animationName))}),Bc(1,"div",1),uD(2),$c()();}if(r&2){let e=aD();_D(e._classList),gh("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),rh("id",e.panelId),Kp("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null);}}var vn=new S$2("MAT_MENU_PANEL"),Gt=(()=>{class r{_elementRef=T$3(Tr$2);_document=T$3(ir$4);_focusMonitor=T$3(ln$3);_parentMenu=T$3(vn,{optional:true});_changeDetectorRef=T$3(kF);role="menuitem";disabled=false;disableRipple=false;_hovered=new ne$3;_focused=new ne$3;_highlighted=false;_triggersSubmenu=false;constructor(){T$3($$5).load(ci$1),this._parentMenu?.addItem?.(this);}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this);}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,false);}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete();}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}_handleMouseEnter(){this._hovered.next(this);}getLabel(){let e=this._elementRef.nativeElement.cloneNode(true),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck();}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck();}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&ih("click",function(o){return i._checkDisabled(o)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(Kp("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),gh("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu));},inputs:{role:"role",disabled:[2,"disabled","disabled",PF],disableRipple:[2,"disableRipple","disableRipple",PF]},exportAs:["matMenuItem"],ngContentSelectors:Fo,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(lD(Oo),uD(0),wi$2(1,"span",0),uD(2,1),Hc(),Xp(3,"div",1),ZE(4,Ro,2,0,":svg:svg",2)),t&2&&(Hv(3),Jp("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),Hv(),YE(i._triggersSubmenu?4:-1));},dependencies:[Tm],encapsulation:2})}return r})();var Lo=new S$2("MatMenuContent");var Vo=new S$2("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:false,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),bn="_mat-menu-enter",Ai="_mat-menu-exit",Ot=(()=>{class r{_elementRef=T$3(Tr$2);_changeDetectorRef=T$3(kF);_injector=T$3(le$2);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=we$3();_allItems;_directDescendantItems=new si$2;_classList={};_panelAnimationState="void";_animationDone=new ne$3;_isAnimating=Fe$3(false);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses();}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses();}templateRef;items;lazyContent;overlapTrigger=false;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,i=w$3({},this._classList);t&&t.length&&t.split(" ").forEach(a=>{i[a]=false;}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(a=>{i[a]=true;}),this._elementRef.nativeElement.className=""),this._classList=i;}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e;}closed=new qe$3;close=this.closed;panelId=T$3(hn$3).getId("mat-menu-panel-");constructor(){let e=T$3(Vo);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop;}ngOnInit(){this.setPositionClasses();}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new fn$3(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Bl(this._directDescendantItems),vl(e=>Dg(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),a=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[a]&&!i[a].disabled?t.setActiveItem(a):t.setNextItemActive();}});}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout);}_hovered(){return this._directDescendantItems.changes.pipe(Bl(this._directDescendantItems),vl(t=>Dg(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:Yr$2(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Wf(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus();}},{injector:this._injector});}resetActiveItem(){this._keyManager.setActiveItem(-1);}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=x$2(w$3({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck();}_onAnimationDone(e){let t=e===Ai;(t||e===bn)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(false));}_onAnimationStart(e){(e===bn||e===Ai)&&this._isAnimating.set(true);}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0);}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Ai),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?bn:Ai);}),this._changeDetectorRef.markForCheck();}_updateDirectDescendants(){this._allItems.changes.pipe(Bl(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges();});}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-menu"]],contentQueries:function(t,i,a){if(t&1&&ch(a,Lo,5)(a,Gt,5)(a,Gt,4),t&2){let o;fD(o=pD())&&(i.lazyContent=o.first),fD(o=pD())&&(i._allItems=o),fD(o=pD())&&(i.items=o);}},viewQuery:function(t,i){if(t&1&&lh(yr$2,5),t&2){let a;fD(a=pD())&&(i.templateRef=a.first);}},hostVars:3,hostBindings:function(t,i){t&2&&Kp("aria-label",null)("aria-labelledby",null)("aria-describedby",null);},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",PF],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:PF(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[zD([{provide:vn,useExisting:r}])],ngContentSelectors:Bo,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(lD(),zp(0,No,3,12,"ng-template"));},styles:[`mat-menu {
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
`],encapsulation:2})}return r})(),Uo=new S$2("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let r=T$3(le$2);return ()=>yn(r)}});var Dt=new WeakMap,jo=(()=>{class r{_canHaveBackdrop;_element=T$3(Tr$2);_viewContainerRef=T$3(Li$4);_menuItemInstance=T$3(Gt,{optional:true,self:true});_dir=T$3(ea,{optional:true});_focusMonitor=T$3(ln$3);_ngZone=T$3(ue$1);_injector=T$3(le$2);_scrollStrategy=T$3(Uo);_changeDetectorRef=T$3(kF);_animationsDisabled=we$3();_portal;_overlayRef=null;_menuOpen=false;_closingActionsSubscription=G$4.EMPTY;_menuCloseSubscription=G$4.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t);})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()));}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=T$3(vn,{optional:true});this._parentMaterialMenu=t instanceof Ot?t:void 0;}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Dt.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null);}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return !!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit();}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let i=Dt.get(t);Dt.set(t,this),i&&i!==this&&i._closeMenu();let a=this._createOverlay(t),o=a.getConfig(),l=o.positionStrategy;this._setPosition(t,l),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??false,a.hasAttached()||(a.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(true),t instanceof Ot&&(t._setIsOpen(true),t._directDescendantItems.changes.pipe(Rg(t.close)).subscribe(()=>{l.withLockedPosition(false).reapplyLastPosition(),l.withLockedPosition(true);}));}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t);}_destroyMenu(e){let t=this._overlayRef,i=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),i instanceof Ot&&this._ownsMenu(i)?(this._pendingRemoval=i._animationDone.pipe(It$7(1)).subscribe(()=>{t.detach(),Dt.has(i)||i.lazyContent?.detach();}),i._setIsOpen(false)):(t.detach(),i?.lazyContent?.detach()),i&&this._ownsMenu(i)&&Dt.delete(i),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(false));}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck());}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=En(this._injector,t),this._overlayRef.keydownEvents().subscribe(i=>{this._menu instanceof Ot&&this._menu._handleKeydown(i);});}return this._overlayRef}_getOverlayConfig(e){return new ke$2({positionStrategy:Dn(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{this._ngZone.run(()=>{let a=i.connectionPair.overlayX==="start"?"after":"before",o=i.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(a,o);});});}_setPosition(e,t){let[i,a]=e.xPosition==="before"?["end","start"]:["start","end"],[o,l]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[d,m]=[o,l],[k,x]=[i,a],y=0;if(this._triggersSubmenu()){if(x=i=e.xPosition==="before"?"start":"end",a=k=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let w=this._parentMaterialMenu.items.first;this._parentInnerPadding=w?w._getHostElement().offsetTop:0;}y=o==="bottom"?this._parentInnerPadding:-this._parentInnerPadding;}}else e.overlapTrigger||(d=o==="top"?"bottom":"top",m=l==="top"?"bottom":"top");t.withPositions([{originX:i,originY:d,overlayX:k,overlayY:o,offsetY:y},{originX:a,originY:d,overlayX:x,overlayY:o,offsetY:y},{originX:i,originY:m,overlayX:k,overlayY:l,offsetY:-y},{originX:a,originY:m,overlayX:x,overlayY:l,offsetY:-y}]);}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:ag(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Xt$5(o=>this._menuOpen&&o!==this._menuItemInstance)):ag();return Dg(e,i,a,t)}_getPortal(e){return (!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new Ae$1(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Dt.get(e)===this}_triggerIsAriaDisabled(){return PF(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){jI();};static \u0275dir=CE({type:r})}return r})(),Oa=(()=>{class r extends jo{_cleanupTouchstart;_hoverSubscription=G$4.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e;}get menu(){return this._menu}set menu(e){this._menu=e;}menuData;restoreFocus=true;menuOpened=new qe$3;onMenuOpen=this.menuOpened;menuClosed=new qe$3;onMenuClose=this.menuClosed;constructor(){super(true);let e=T$3(CI);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Ge$1(t)||(this._openedBy="touch");},{passive:true});}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(true);}closeMenu(){this._closeMenu();}updatePosition(){this._overlayRef?.updatePosition();}ngAfterContentInit(){this._handleHover();}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe();}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Ve$3(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault());}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu());}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu();}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(false));}));}static \u0275fac=function(t){return new(t||r)};static \u0275dir=CE({type:r,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&ih("click",function(o){return i._handleClick(o)})("mousedown",function(o){return i._handleMousedown(o)})("keydown",function(o){return i._handleKeydown(o)}),t&2&&Kp("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu?.panelId:null);},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[Wp]})}return r})();var Fa=["*"],zo=["content"],Ho=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],qo=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function Yo(r,n){if(r&1){let e=iD();wi$2(0,"div",1),ih("click",function(){xu(e);let i=aD();return Au(i._onBackdropClicked())}),Hc();}if(r&2){let e=aD();gh("mat-drawer-shown",e._isShowingBackdrop());}}function Ko(r,n){r&1&&(wi$2(0,"mat-drawer-content"),uD(1,2),Hc());}var Qo=new S$2("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>false}),Ra=new S$2("MAT_DRAWER_CONTAINER"),$t=(()=>{class r extends $r{_platform=T$3(A$2);_changeDetectorRef=T$3(kF);_element=T$3(Tr$2);_ngZone=T$3(ue$1);_isInert=false;_container=T$3(xn);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck());}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(Ll(50),It$7(1)).subscribe(()=>this._updateInert());}):this._updateInert();}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let t=this._element.nativeElement;this._isInert=e,e?t.setAttribute("inert","true"):t.removeAttribute("inert");}}_shouldBeHidden(){if(this._platform.isBrowser)return  false;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=(()=>{let e;return function(i){return (e||(e=ey(r)))(i||r)}})();static \u0275cmp=IE({type:r,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,i){t&2&&(hh("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),gh("mat-drawer-content-hidden",i._shouldBeHidden()));},features:[zD([{provide:$r,useExisting:r}]),Wp],ngContentSelectors:Fa,decls:1,vars:0,template:function(t,i){t&1&&(lD(),uD(0));},encapsulation:2})}return r})(),wn=(()=>{class r{_elementRef=T$3(Tr$2);_focusTrapFactory=T$3(No$2);_focusMonitor=T$3(ln$3);_platform=T$3(A$2);_ngZone=T$3(ue$1);_renderer=T$3(CI);_interactivityChecker=T$3(Gr$1);_doc=T$3(ir$4);_container=T$3(Ra,{optional:true});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=false;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit());}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next();}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=fm(e);}_disableClose=false;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=fm(e)),this._autoFocus=e;}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(fm(e));}_opened=Fe$3(false);_openedVia=null;_animationStarted=new ne$3;_animationEnd=new ne$3;openedChange=new qe$3(true);_openedStream=this.openedChange.pipe(Xt$5(e=>e),Me$3(()=>{}));openedStart=this._animationStarted.pipe(Xt$5(()=>this.opened),Ki$4(void 0));_closedStream=this.openedChange.pipe(Xt$5(e=>!e),Me$3(()=>{}));closedStart=this._animationStarted.pipe(Xt$5(()=>!this.opened),Ki$4(void 0));_destroyed=new ne$3;onPositionChanged=new qe$3;_content;_modeChanged=new ne$3;_injector=T$3(le$2);_changeDetectorRef=T$3(kF);constructor(){this.openedChange.pipe(Rg(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program");}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return [e.listen(t,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!Yr$2(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault();});}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened);});}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&(this._interactivityChecker.isFocusable(i)||(i.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let a=()=>{o(),l(),i.removeAttribute("tabindex");},o=this._renderer.listen(i,"blur",a),l=this._renderer.listen(i,"mousedown",a);})),i.focus(t));}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case  false:case "dialog":return;case  true:case "first-tabbable":Wf(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus();},{injector:this._injector});break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null);}_isFocusWithinDrawer(){let e=this._doc.activeElement;return !!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=true,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState());}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete();}open(e){return this.toggle(true,e)}close(){return this.toggle(false)}_closeViaBackdropClick(){return this._setOpen(false,true,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,t,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),(this._container?._content||this._container?._userContent)?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(true),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next();}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(a=>{this.openedChange.pipe(It$7(1)).subscribe(o=>a(o?"open":"close"));}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e);}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop());}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,i=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,t)),i.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor);}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(false),this._animationEnd.next(e);});};static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-drawer"]],viewQuery:function(t,i){if(t&1&&lh(zo,5),t&2){let a;fD(a=pD())&&(i._content=a.first);}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,i){t&2&&(Kp("align",null)("tabIndex",i.mode!=="side"?"-1":null),hh("visibility",!i._container&&!i.opened?"hidden":null),gh("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"));},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Fa,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,i){t&1&&(lD(),wi$2(0,"div",1,0),uD(2),Hc());},dependencies:[$r],encapsulation:2})}return r})(),xn=(()=>{class r{_dir=T$3(ea,{optional:true});_element=T$3(Tr$2);_ngZone=T$3(ue$1);_changeDetectorRef=T$3(kF);_animationDisabled=we$3();_transitionsEnabled=false;_allDrawers;_drawers=new si$2;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=fm(e);}_autosize=T$3(Qo);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:fm(e);}_backdropOverride=null;backdropClick=new qe$3;_start=null;_end=null;_left=null;_right=null;_destroyed=new ne$3;_doCheckSubject=new ne$3;_contentMargins={left:null,right:null};_contentMarginChanges=new ne$3;get scrollable(){return this._userContent||this._content}_injector=T$3(le$2);constructor(){let e=T$3(A$2),t=T$3(Fe$1);this._dir?.change.pipe(Rg(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins();}),t.change().pipe(Rg(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=true;},200);});}ngAfterContentInit(){this._allDrawers.changes.pipe(Bl(this._allDrawers),Rg(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges();}),this._drawers.changes.pipe(Bl(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e);}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Cg(10),Rg(this._destroyed)).subscribe(()=>this.updateContentMargins());});}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete();}open(){this._drawers.forEach(e=>e.open());}close(){this._drawers.forEach(e=>e.close());}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,t-=i;}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();t+=i,e-=i;}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)));}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next());}_watchDrawerToggle(e){e._animationStarted.pipe(Rg(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),e.mode!=="side"&&e.openedChange.pipe(Rg(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened));}_watchDrawerPosition(e){e.onPositionChanged.pipe(Rg(this._drawers.changes)).subscribe(()=>{Wf({read:()=>this._validateDrawers()},{injector:this._injector});});}_watchDrawerMode(e){e._modeChanged.pipe(Rg(Dg(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();});}_setContainerClass(e){let t=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?t.add(i):t.remove(i);}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e);}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end);}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop();}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick());}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-drawer-container"]],contentQueries:function(t,i,a){if(t&1&&ch(a,$t,5)(a,wn,5),t&2){let o;fD(o=pD())&&(i._content=o.first),fD(o=pD())&&(i._allDrawers=o);}},viewQuery:function(t,i){if(t&1&&lh($t,5),t&2){let a;fD(a=pD())&&(i._userContent=a.first);}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,i){t&2&&gh("mat-drawer-container-explicit-backdrop",i._backdropOverride);},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[zD([{provide:Ra,useExisting:r}])],ngContentSelectors:qo,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,i){t&1&&(lD(Ho),ZE(0,Yo,1,2,"div",0),uD(1),uD(2,1),ZE(3,Ko,2,0,"mat-drawer-content")),t&2&&(YE(i.hasBackdrop?0:-1),Hv(3),YE(i._content?-1:3));},dependencies:[$t],styles:[`.mat-drawer-container {
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
`],encapsulation:2})}return r})();var Wo=["*",[["mat-toolbar-row"]]],Go=["*","mat-toolbar-row"],Cn=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275dir=CE({type:r,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return r})(),Ba=(()=>{class r{_elementRef=T$3(Tr$2);_platform=T$3(A$2);_document=T$3(ir$4);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()));}_checkToolbarMixedModes(){this._toolbarRows.length;}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=IE({type:r,selectors:[["mat-toolbar"]],contentQueries:function(t,i,a){if(t&1&&ch(a,Cn,5),t&2){let o;fD(o=pD())&&(i._toolbarRows=o);}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,i){t&2&&(_D(i.color?"mat-"+i.color:""),gh("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0));},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Go,decls:2,vars:0,template:function(t,i){t&1&&(lD(Wo),uD(0),uD(1,1));},styles:[`.mat-toolbar {
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
`],encapsulation:2})}return r})();var ae=(function(r){return r.SPANISH="es-ES",r.ENGLISH="en-EN",r})(ae||{});function Na(){let r=window.navigator.language||window.navigator.languages?.[0]||ae.ENGLISH;return Object.values(ae).includes(r)?r:ae.ENGLISH}var $o=()=>["/"],Xo=()=>["/about"],Jo=()=>["/cv"],Zo=()=>["/contact"],es=()=>["/artworks"],ts=r=>({years:r}),is=r=>["/generative",r],ns=(r,n)=>n.id;function rs(r,n){r&1&&nh(0);}function as(r,n){if(r&1){let e=iD();wi$2(0,"button",17),ih("click",function(){xu(e),aD();let i=gD(2);return Au(i.toggle())}),wi$2(1,"mat-icon"),FD(2,"menu"),Hc()();}}function os(r,n){r&1&&nh(0);}function ss(r,n){if(r&1&&Gp(0,os,1,0,"ng-container",7),r&2){aD();let e=gD(15);Jp("ngTemplateOutlet",e);}}function ls(r,n){if(r&1&&(wi$2(0,"button",19),KD(1,"translate"),FD(2),KD(3,"translate"),Hc()),r&2){aD(2);let e=gD(31);Jp("matMenuTriggerFor",e),Kp("aria-label",XD(1,3,"menu.generative")),Hv(2),qc(" ",XD(3,5,"menu.generative")," ");}}function cs(r,n){if(r&1){let e=iD();wi$2(0,"button",18),FD(1),KD(2,"translate"),Hc(),ZE(3,ls,4,7,"button",19),wi$2(4,"button",20),KD(5,"translate"),FD(6),KD(7,"translate"),Hc(),wi$2(8,"button",21),FD(9,"CV"),Hc(),wi$2(10,"button",20),KD(11,"translate"),FD(12),KD(13,"translate"),Hc(),wi$2(14,"button",22),ih("click",function(){xu(e);let i=aD();return Au(i.changeLanguage())}),FD(15),Hc();}if(r&2){let e=aD(),t=gD(17);Jp("matMenuTriggerFor",t),Hv(),qc(" ",XD(2,11,"paintings")," "),Hv(2),YE(e.generativePieces.length?3:-1),Hv(),Jp("routerLink",QD(21,Xo)),Kp("aria-label",XD(5,13,"menu.about")),Hv(2),qc(" ",XD(7,15,"menu.about")," "),Hv(2),Jp("routerLink",QD(22,Jo)),Hv(2),Jp("routerLink",QD(23,Zo)),Kp("aria-label",XD(11,17,"menu.contact")),Hv(2),qc(" ",XD(13,19,"menu.contact")," "),Hv(3),qc(" ",e.currentLangLabel," ");}}function ds(r,n){if(r&1&&(wi$2(0,"button",15),FD(1),Hc()),r&2){let e=n.$implicit;Jp("routerLink",QD(4,es))("queryParams",ZD(5,ts,e)),Kp("aria-label",e),Hv(),qc(" ",e," ");}}function us(r,n){if(r&1&&(wi$2(0,"button",16),FD(1),Hc()),r&2){let e=n.$implicit;Jp("routerLink",ZD(3,is,e.id)),Kp("aria-label",e.label),Hv(),qc(" ",e.label," ");}}var La=(()=>{class r{constructor(){this.artworkService=T$3(c),this.responsiveService=T$3(St),this.translateService=T$3(Z$2),this.mobileMenu=Pe$2(this.responsiveService.displayMobileLayout),this.generativePieces=Ss;}get years(){return this.artworkService.getAvailableYears()}get currentLang(){return this.translateService.getCurrentLang()||this.translateService.getFallbackLang()||ae.ENGLISH}get currentLangLabel(){return this.currentLang.slice(0,2).toUpperCase()}changeLanguage(){let e=this.currentLang===ae.ENGLISH?ae.SPANISH:ae.ENGLISH;this.translateService.use(e);}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-top-menu"]],decls:34,vars:17,consts:[["drawer",""],["menuButtons",""],["paintingMenu","matMenu"],["yearsMenu","matMenu"],["generativeMenu","matMenu"],["mode","over","position","end",1,"drawer"],[1,"drawer-content"],[4,"ngTemplateOutlet"],["color","primary"],["aria-label","Juanma Moreno S\xE1nchez","mat-button","",3,"routerLink"],[1,"catalog-heading","brand"],[1,"spacer"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu"],["mat-menu-item","","routerLink","/artworks"],["mat-menu-item","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"routerLink","queryParams"],["mat-menu-item","",3,"routerLink"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu",3,"click"],["x","","mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"routerLink"],["aria-label","CV","mat-button","",3,"routerLink"],["aria-label","Language switcher","mat-button","",3,"click"]],template:function(t,i){if(t&1&&(wi$2(0,"mat-drawer-container")(1,"mat-drawer",5,0)(3,"div",6),Gp(4,rs,1,0,"ng-container",7),Hc()(),wi$2(5,"mat-drawer-content")(6,"mat-toolbar",8)(7,"mat-toolbar-row")(8,"button",9)(9,"h1",10),FD(10,"Juanma Moreno S\xE1nchez"),Hc()(),Xp(11,"span",11),ZE(12,as,3,0,"button",12)(13,ss,1,1,"ng-container"),Hc()()()(),Gp(14,cs,16,24,"ng-template",null,1,tw),wi$2(16,"mat-menu",null,2)(18,"button",13),KD(19,"translate"),FD(20),KD(21,"translate"),Hc(),wi$2(22,"button",14),KD(23,"translate"),FD(24),KD(25,"translate"),Hc()(),wi$2(26,"mat-menu",null,3),JE(28,ds,2,7,"button",15,KE),Hc(),wi$2(30,"mat-menu",null,4),JE(32,us,2,5,"button",16,ns),Hc()),t&2){let a=gD(15),o=gD(27);Hv(4),Jp("ngTemplateOutlet",a),Hv(4),Jp("routerLink",QD(16,$o)),Hv(4),YE(i.mobileMenu()?13:12),Hv(6),Kp("aria-label",XD(19,8,"menu.allPaintings")),Hv(2),qc(" ",XD(21,10,"menu.allPaintings")," "),Hv(2),Jp("matMenuTriggerFor",o),Kp("aria-label",XD(23,12,"menu.byYear")),Hv(2),qc(" ",XD(25,14,"menu.byYear")," "),Hv(4),XE(i.years),Hv(4),XE(i.generativePieces);}},dependencies:[Ba,Cn,of,Ut$3,Jo$2,Et$1,_i$2,xn,$t,wn,Oa,Ot,Gt,rt$2],styles:["mat-toolbar-row[_ngcontent-%COMP%]{flex-wrap:wrap;height:auto;min-height:var(--mat-toolbar-standard-height, 4rem);row-gap:.25rem;padding-top:.5rem;padding-bottom:.5rem}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.brand[_ngcontent-%COMP%]{color:inherit;font-size:1.1rem;font-weight:400;margin:0}.drawer[_ngcontent-%COMP%]{position:fixed!important;top:0;right:0;bottom:0;height:100vh;width:min(40vw,200px);z-index:500}  .mat-drawer-backdrop{position:fixed!important;inset:0;z-index:499}.drawer-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1rem 0;gap:.25rem}.drawer-content[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]{justify-content:flex-start;width:100%;padding-left:1.5rem;padding-right:1.5rem}"]});}}return r})();var Va={"Oil on wood":"Oil on wood","Oil on canvas":"Oil on canvas","Watercolor on paper":"Watercolor on paper",sold:"Art piece sold",moreOn:"More on",selectYear:"Select a year",paintings:"Paintings",submit:"Submit",close:"Close",cancel:"Cancel",back:"Back",next:"Next",generative:{notFound:"This generative piece was not found."},menu:{allPaintings:"All paintings",generative:"Generative",about:"About",contact:"Contact",byYear:"By Year"},traits:{medium:"Medium",keight:"Height",width:"Width",unit:"Unit",year:"Year",imgTypr:"Image Type",artist:"Artist",project:"Project",descAuthor:"Description Author",descLang:"Description language"},viewTypes:{frontal:"Frontal view",progreso:"Work in progress",detail:"Detail view"},sortBy:"Sort by ",sortMethod:{year:"Year",size:"Size",medium:"Medium"},contact:{title:"Contact",representedBy:"Currently represented by <a href='https://galeriazunino.com/' target='_blank'>Zunino Gallery</a> (Sevilla)",contactText:"If you want to contact me, use the form bellow and I will get back to you soon. You can also follow me on <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a> to stay on the loop.",name:"Name",email:"Email",emailPlaceholder:"email@example.com",message:"Message",messagePlaceholder:"I'm interested in..."},viewer:{previous:"Previous",next:"Next",fullscreen:"Fullscreen",exitFullscreen:"Exit fullscreen"},dossier:{title:"Dossier options",includeContact:"Include contact info",includeCv:"Include CV",includeStatement:"Include Statement",customTitle:"Custom title",customTitlePlaceholder:"Enter a title",customText:"Custom text",customTextPlaceholder:"Add custom text"},error:{noValue:"You must enter a value",invalidEmail:"Not a valid email",submissionFailed:"Something went wrong sending your message. Please try again later."},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n, Spain), 1986. Based in Madrid (Spain)",shows:{title:"Solo shows"},collectiveShows:{title:"Collective exhibitions (selection)"},awards:{title:"Artistic awards and residencies (selection)",lefranc:"Lefranc&Bourgueois art award",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Antonio Gala Foundation Residence Program</a>"},conferences:{title:"Conferences",unia:"<a href='https://www.unia.es/' target='blank'>International University of Andalucia</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>Towards a New AI Winter</a>"},education:{title:"Education",degree:"Bachelor on arts degree",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>University of Granada",erasmus:"LLP Erasmus Scholarship",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Zunino gallery</a>",countries:{online:"Online",spain:"Spain",usa:"USA",germany:"Germany",mexico:"Mexico",italy:"Italy"}},statement:{title:"Statement",introduction:{content:"My artistic work is profoundly analog, even though its creation usually originates in the digital. This is the great contradiction of <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'>the millennial generation, to which I belong</a>. We are the last generation to have been educated using pen and paper that has had to navigate life in a digital environment. It is the intersection between two worlds, a collision I do not try to hide. In fact, I split my labor between the artistic production I need to be happy and the software development I need in order to eat."},painting:{title:"Painting",distance:"In painting is where, throughout my entire life, I have found refuge. Painting is important. Painting is useful. Painting is home.",outOfNoise:"This distance involves spending time outside the automatism of routine, a necessary condition to be able to observe, analyze, and finally build.",anacronism:"Painting is an ancient craft that allows working on a surface as much or as little as the artist wishes, with the only limits being space and time. <strong>Painting is a precious anachronism.</strong> Simultaneously, painting is always relevant because it is an infinite field of knowledge. Each artist, over the years, gradually discovers small findings that together end up forming something unique and unrepeatable."},art:{title:"Art",arts:"My refuge in painting, sculpture, generative art, or digital art has yielded different fruits over time. There are fruits that have never been documented, and there are also those that have not even been seen by anyone other than myself. In any case, there are peculiarities in my art that are constant and cut across production, and there are others that are variable; obsessions that come and go over time:"},constants:{title:"Constants",items:{first:{title:"Internet",content:"Representing technology artistically in painting and making technology by hand are ways of trying to reconcile our physical self and our avatar. Most of the images I use in my creative process originate from the Internet, specifically from chance encounters with random images. Even before the emergence of AIs, the Internet was already a virtually infinite visual world."},second:{title:"Disturbing Element",content:"In a hypothetical painting, a character looks at or interacts with something. But we don't know who they are, what they are doing, or why they are doing it. Even if it's something indeterminate, the action introduces narrative and invites spending time contemplating the image. The idea is for the image to propose an open premise, something beyond the pose, and for the viewer to complete it. The disturbing as a starting point."},third:{title:"Tradition",content:"Cultural heritage is the DNA of any cultural identity. Great authors and the great themes of art history have had, have, and will have a tremendously gravitational effect. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., have created great masterpieces in which the great themes of the history of art have been developed yesterday and today. Themes that are inherently human and are transversal and universal: love, death, fear..."},fourth:{title:"Failure as one of the Fine Arts",content:"'I have done many things because I have failed at all of them. I start from failure as one of the Fine Arts.' This quote from the multifaceted Pep\xEDn Tre perfectly illustrates the reason for multidisciplinarity. Genius, divine enlightenment, or inspiration are nothing but mythological clich\xE9s. Reality, as always, is much more prosaic: it is failure (real or perceived) that moves an artist to investigate, try new techniques, new ways of reaching the public, etc. On the contrary, I am convinced that success (real or perceived) has a paralyzing capacity and ends up producing artists bored with their own art and therefore with themselves. Failure frustrates, but it also stimulates, or so I want to believe."}}},variables:{title:"Variables",items:{first:{title:"Artificial Intelligence",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>In 2019, a minimal advance guard of creators, like Juanma Moreno, already experimented with the old Artificial Intelligence of that time</em></a>, as Javier Villuendas says in his column in ABC Cultural. In 2019, few of us intuited the creative potential of the AI of the time. Old neural networks like StyleGan or Bigbigan stimulated our imagination by creating very interesting monsters. Nowadays, AI-generated art is commonplace and has reached new levels of formal sufficiency. But at that time, the margin of error (loss) was much wider, and accidents produced unheard-of and highly interesting monsters. From 2019 to 2023, the primary source of inspiration for my work shifted from images found on the internet to images that Artificial Intelligences are capable of generating."},second:{title:"Software",content:"Software doesn't have to be an ultra-rational and efficient solution to an engineering problem. Software can also satisfy an artist's curiosity, be flexible, organic, mutate, be random, disorganized, and unpredictable. Once again, we must value error. It is in the brushstroke that goes slightly beyond the contour, the accident that causes software to distort an image until it aberrates, where the value and originality lie."}}}},download:{cv:"Generate and download CV",statement:"Generate and download Statement",sheet:"Generate and download technical sheet",portfolio:"Generate and download portfolio",hd:"Download high resolution image",success:"Download ready",error:"Could not generate the file"},links:{view:"View where this artwork appears on the Internet",title:"Appearances of the artwork on the Internet"},seo:{default:{description:"Contemporary art \u2014 oil painting, watercolour, drawings and generative art \u2014 by the artist Juanma Moreno S\xE1nchez."},paintings:{title:"Paintings",description:"Oil paintings, watercolours and works on paper by the artist Juanma Moreno S\xE1nchez."},artwork:{title:"Artwork"},artworkBy:"Original artwork by Juanma Moreno S\xE1nchez.",generative:{title:"Generative",description:"Interactive generative artwork by Juanma Moreno S\xE1nchez, drawn live in the browser."},cv:{title:"CV",description:"Exhibitions, awards, residencies and biography of the artist Juanma Moreno S\xE1nchez."},about:{title:"Statement",description:"Artist statement \u2014 the ideas and themes behind the work of Juanma Moreno S\xE1nchez."},contact:{title:"Contact",description:"Get in touch with the artist Juanma Moreno S\xE1nchez."},terms:{title:"Terms of Service",description:"Terms of service for juanmamoreno.com."},privacy:{title:"Privacy Policy",description:"Privacy policy for juanmamoreno.com \u2014 no cookies, no third-party trackers."},notFound:{title:"Page not found"}},privacy:{title:"Privacy",noBanner:"No cookie banner here \u2014 you know why? Because we don't use any.",noTracking:"We honestly don't care about tracking you: not what you click, not where you go, not how long you stay.",noThirdParty:"No third-party cookies, no analytics, no ad networks \u2014 nothing following you around the web.",localOnly:"The only thing we keep on your device is a local copy of the gallery so it loads faster next time. It never leaves your browser and identifies no one.",contactUse:"If you write to us through the contact form, we use your message for one thing only: to reply."},terms:{title:"Terms of Service",intro:"By using this site, you agree to the following:",portfolio:"This is simply the artist's portfolio site: it shows the work and lets you get in touch.",noData:"We do not collect or store any personal information.",publicContent:"All content shown here is public.",ownRisk:"Use of this site is at your own risk. We are not responsible for any misuse of the content.",changes:"We may update these terms at any time without notice."},notFound:{title:"404 \u2014 Page not found",message:"Oops! The page you are looking for does not exist. Try one of these instead:"}};var Ua={"Oil on wood":"\xD3leo sobre madera","Oil on canvas":"\xD3leo sobre tela","Watercolor on paper":"Acuarela sobre papel",sold:"Pieza vendida",moreOn:"M\xE1s de",selectYear:"Selecciona un a\xF1o",paintings:"Pinturas",submit:"Enviar",close:"Cerrar",cancel:"Cancelar",back:"Volver",next:"Siguiente",generative:{notFound:"No se encontr\xF3 esta pieza generativa."},menu:{allPaintings:"Todas las pinturas",generative:"Generativo",about:"Acerca de",contact:"Contacto",byYear:"Por a\xF1o"},traits:{medium:"T\xE9cnica",keight:"Altura",width:"Ancho",unit:"Unidad",year:"A\xF1o",imgTypr:"Tipo de imagen",artist:"Artista",project:"Proyecto",descAuthor:"Autor de la descripci\xF3n",descLang:"Lenguage de la descripci\xF3n"},viewTypes:{frontal:"Vista frontal",progreso:"En progreso",detail:"Vista de detalle"},sortBy:"Ordenar por ",sortMethod:{year:"A\xF1o",size:"Tama\xF1o",medium:"T\xE9cnica"},contact:{title:"Contacto",representedBy:"Representado por la <a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino </a> (Sevilla)",contactText:"Si quieres contactar conmigo, usa el formulario debajo. Tambi\xE9n puedes seguirme en <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a>.",name:"Nombre",email:"Email",emailPlaceholder:"email@ejemplo.com",message:"Mensaje",messagePlaceholder:"Me interesa..."},viewer:{previous:"Anterior",next:"Siguiente",fullscreen:"Pantalla completa",exitFullscreen:"Salir de pantalla completa"},dossier:{title:"Opciones del dossier",includeContact:"Incluir datos de contacto",includeCv:"Incluir CV",includeStatement:"Incluir statement",customTitle:"T\xEDtulo personalizado",customTitlePlaceholder:"Escribe un t\xEDtulo",customText:"Texto personalizado",customTextPlaceholder:"A\xF1ade un texto personalizado"},error:{noValue:"Debes escribir algo",invalidEmail:"Email inv\xE1lido",submissionFailed:"Algo sali\xF3 mal al enviar tu mensaje. Int\xE9ntalo de nuevo m\xE1s tarde."},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n), 1986. Reside en Madrid.",shows:{title:"Exposiciones individuales"},collectiveShows:{title:"Exposiciones colectivas (selecci\xF3n)"},conferences:{title:"Conferencias",unia:"<a href='https://www.unia.es/' target='blank'>Universidad Internacional de Andaluc\xEDa</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>\xBFHacia un nuevo invierno de la IA?</a>"},awards:{title:"Premios y becas (selecci\xF3n)",lefranc:"Becas Lefranc&Bourgueois",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Fundaci\xF3n Antonio Gala para j\xF3venes creadores</a>"},education:{title:"Educacion",degree:"Licenciado en Bellas Artes",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>Universidad de Granada",erasmus:"Beca LLP Erasmus",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino</a>",countries:{online:"Online",spain:"Espa\xF1a",usa:"USA",germany:"Alemania",mexico:"M\xE9xico",italy:"Italia"}},statement:{title:"Statement",introduction:{content:"Mi obra art\xEDstica es profundamente anal\xF3gica, si bien la creaci\xF3n suele tener su origen en lo digital. Esta es la gran contradicci\xF3n de <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'>la generaci\xF3n milenial, a la que pertenezco</a>. Somos la \xFAltima generaci\xF3n que se ha formado usando papel y l\xE1piz que ha tenido que buscarse la vida en un ambiente digital. Es la intersecci\xF3n entre dos mundos, una colisi\xF3n que no intento disimular. De hecho, divido mi fuerza de trabajo entre la producci\xF3n art\xEDstica que necesito para ser feliz y la programaci\xF3n de software que necesito para poder comer."},painting:{title:"Pintura",distance:"En la pintura es donde, a lo largo de toda mi vida, he encontrado refugio. La pintura es importante. La pintura es \xFAtil. La pintura es casa.",outOfNoise:"Esta distancia implica pasar tiempo fuera del automatismo de la rutina, una condici\xF3n necesaria para poder observar, analizar y finalmente construir.",anacronism:"La pintura es un oficio ancestral que permite trabajar en una superficie tanto o tan poco como el artista quiera, teniendo como \xFAnicos l\xEDmites el espacio y el tiempo. <strong>La pintura es un anacronismo precioso.</strong> Al mismo tiempo, la pintura es siempre relevante porque es un campo infinito de conocimiento. Cada artista, a lo largo de los a\xF1os, va descubriendo peque\xF1os hallazgos, que en su conjunto acaban por formar algo \xFAnico e irrepetible."},art:{title:"Arte",arts:"Mi refugio en la pintura, la escultura, el arte generativo o el arte digital ha dado frutos diferentes a lo largo del tiempo. Hay frutos que nunca han sido documentados, y tambi\xE9n los hay que ni siquiera han sido vistos por otra persona m\xE1s que yo mismo. En cualquier caso, hay peculiaridades en mi arte que son constantes y atraviesan la producci\xF3n, y hay otras que son variables; obsesiones que van y vienen con el tiempo:"},constants:{title:"Constantes",items:{first:{title:"Internet",content:"Representar a la tecnolog\xEDa en la pintura y crear tecnolog\xEDa artesanalmente son formas de intentar reconciliar nuestro yo f\xEDsico y nuestro avatar.La mayor\xEDa de las im\xE1genes que uso en mi proceso creativo provienen de Internet, espec\xEDficamente de encuentros fortuitos con im\xE1genes aleatorias. Incluso antes de la aparici\xF3n de las IA, Internet ya era un mundo visual virtualmente infinito."},second:{title:"Elemento inquietante",content:"En una pintura hipot\xE9tica, un personaje mira o interact\xFAa con algo. Pero no sabemos qui\xE9n es, qu\xE9 est\xE1 haciendo o por qu\xE9 lo est\xE1 haciendo. Incluso si es algo indeterminado, la acci\xF3n introduce una narrativa e invita a pasar tiempo contemplando la imagen. La idea es que la imagen proponga una premisa abierta, algo m\xE1s all\xE1 de la pose, y que el espectador la complete. Lo inquietante como punto de partida."},third:{title:"Tradici\xF3n",content:"El patrimonio cultural est\xE1 en el ADN de cualquier identidad. Los grandes autores y los grandes temas de la historia del arte han tenido, tienen y tendr\xE1n un efecto tremendamente gravitacional. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., han creado grandes obras maestras en las que se han desarrollado los grandes temas de la historia del arte, ayer y hoy. Temas intr\xEDnsecamente humanos, transversales y universales: el amor, la muerte, el miedo..."},fourth:{title:"El fracaso como una de las Bellas Artes",content:"'He hecho muchas cosas porque he fracasado en todas ellas. Parto del fracaso como una de las Bellas Artes.' Esta cita del polifac\xE9tico Pep\xEDn Tre ilustra perfectamente la raz\xF3n de la multidisciplinariedad. El genio, la iluminaci\xF3n divina o la inspiraci\xF3n no son m\xE1s que clich\xE9s mitol\xF3gicos. La realidad, como siempre, es mucho m\xE1s prosaica: es el fracaso (real o percibido) lo que mueve a un artista a investigar, probar nuevas t\xE9cnicas, nuevas formas de llegar al p\xFAblico, etc. Por el contrario, estoy convencido de que el \xE9xito (real o percibido) tiene una capacidad paralizante y termina produciendo artistas aburridos de su propio arte y por tanto de s\xED mismos. El fracaso frustra, pero tambi\xE9n estimula, o eso quiero creer yo."}}},variables:{title:"Variables",items:{first:{title:"Inteligencia Artificial",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>En 2019, una m\xEDnima vanguardia de creadores, como Juanma Moreno, ya experimentaba con la vieja Inteligencia Artificial de esa \xE9poca</em></a>, como dice Javier Villuendas en su columna en ABC Cultural. En 2019, pocos intu\xEDamos el potencial creativo de la IA de entonces. Las viejas redes neuronales como StyleGan o Bigbigan estimulaban nuestra imaginaci\xF3n creando monstruos muy interesantes. Hoy en d\xEDa, el arte generado por IA es algo com\xFAn y ha alcanzado nuevos niveles de suficiencia formal. Pero en aquel entonces, el margen de error (la p\xE9rdida) era mucho mayor, y los accidentes produc\xEDan monstruos inauditos y altamente interesantes. De 2019 a 2023, la principal fuente de inspiraci\xF3n para mi trabajo pas\xF3 de ser im\xE1genes encontradas en Internet a im\xE1genes que las Inteligencias Artificiales son capaces de generar."},second:{title:"Software",content:"El software no tiene que ser una soluci\xF3n ultra-racional y eficiente a un problema de ingenier\xEDa. El software tambi\xE9n puede satisfacer la curiosidad de un artista, ser flexible, org\xE1nico, mutar, ser aleatorio, desordenado e impredecible. Una vez m\xE1s, debemos valorar el error. Es en la pincelada que va ligeramente m\xE1s all\xE1 del contorno, en el accidente que hace que el software distorsione una imagen hasta aberrarla, donde reside el valor y la originalidad."}}}},download:{cv:"Generar y descargar CV",statement:"Generar y descargar statement",sheet:"Generar y descargar ficha t\xE9cnica",portfolio:"Generar y descargar dossier",hd:"Descargar imagen en alta resoluci\xF3n",success:"Descarga lista",error:"No se pudo generar el archivo"},links:{view:"Ver repercusi\xF3n de la pieza en Internet",title:"Apariciones de la pieza en Internet"},seo:{default:{description:"Arte contempor\xE1neo \u2014 pintura al \xF3leo, acuarela, dibujo y arte generativo \u2014 del artista Juanma Moreno S\xE1nchez."},paintings:{title:"Pinturas",description:"Pinturas al \xF3leo, acuarelas y obra sobre papel del artista Juanma Moreno S\xE1nchez."},artwork:{title:"Obra"},artworkBy:"Obra original de Juanma Moreno S\xE1nchez.",generative:{title:"Generativo",description:"Arte generativo interactivo de Juanma Moreno S\xE1nchez, generado en el navegador."},cv:{title:"CV",description:"Exposiciones, premios, residencias y biograf\xEDa del artista Juanma Moreno S\xE1nchez."},about:{title:"Statement",description:"Statement del artista \u2014 las ideas y los temas detr\xE1s de la obra de Juanma Moreno S\xE1nchez."},contact:{title:"Contacto",description:"Ponte en contacto con el artista Juanma Moreno S\xE1nchez."},terms:{title:"T\xE9rminos del servicio",description:"T\xE9rminos del servicio de juanmamoreno.com."},privacy:{title:"Privacidad",description:"Pol\xEDtica de privacidad de juanmamoreno.com \u2014 sin cookies ni rastreadores de terceros."},notFound:{title:"P\xE1gina no encontrada"}},privacy:{title:"Privacidad",noBanner:"Aqu\xED no hay banner de cookies, \xBFsabes por qu\xE9? Porque no usamos ninguna.",noTracking:"De verdad que no nos importa rastrearte: ni lo que clicas, ni por d\xF3nde te mueves, ni cu\xE1nto te quedas.",noThirdParty:"Sin cookies de terceros, sin anal\xEDticas, sin redes de anuncios \u2014 nada que te siga por la web.",localOnly:"Lo \xFAnico que guardamos en tu dispositivo es una copia local de la galer\xEDa para que cargue m\xE1s r\xE1pido la pr\xF3xima vez. Nunca sale de tu navegador y no identifica a nadie.",contactUse:"Si nos escribes desde el formulario de contacto, usamos tu mensaje para una sola cosa: responderte."},terms:{title:"T\xE9rminos del servicio",intro:"Al usar este sitio, aceptas lo siguiente:",portfolio:"Esto es simplemente el portfolio del artista: muestra la obra y te permite ponerte en contacto.",noData:"No recopilamos ni almacenamos ning\xFAn dato personal.",publicContent:"Todo el contenido que se muestra aqu\xED es p\xFAblico.",ownRisk:"El uso de este sitio es bajo tu propia responsabilidad. No nos hacemos responsables de un mal uso del contenido.",changes:"Podemos actualizar estos t\xE9rminos en cualquier momento sin previo aviso."},notFound:{title:"404 \u2014 P\xE1gina no encontrada",message:"\xA1Vaya! La p\xE1gina que buscas no existe. Prueba con una de estas:"}};function hs(r,n){r&1&&Xp(0,"app-breadcrumb");}var ja=(()=>{class r{constructor(){this.translateService=T$3(Z$2),this.router=T$3(te$1),this.hideBreadcrumb=Fe$3(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root)),this.translateService.setTranslation(ae.ENGLISH,Va),this.translateService.setTranslation(ae.SPANISH,Ua),this.translateService.use(Na()),this.router.events.pipe(Xt$5(e=>e instanceof k$2),b$3()).subscribe(()=>{this.hideBreadcrumb.set(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root));});}deepestHideBreadcrumb(e){let t=e,i=false;for(;t;)t.data.hideBreadcrumb&&(i=true),t=t.firstChild;return i}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-root"]],decls:6,vars:3,consts:[["role","banner"],["role","main"]],template:function(t,i){t&1&&(Xp(0,"app-share-button"),wi$2(1,"header",0),Xp(2,"app-top-menu"),Hc(),wi$2(3,"main",1),ZE(4,hs,1,0,"app-breadcrumb"),Xp(5,"router-outlet"),Hc()),t&2&&(Hv(3),gh("no-chrome",i.hideBreadcrumb()),Hv(),YE(i.hideBreadcrumb()?-1:4));},dependencies:[La,Da,Pa,lr$2],styles:["main[_ngcontent-%COMP%]{display:block;padding-bottom:3rem}main.no-chrome[_ngcontent-%COMP%]{padding-bottom:0}"]});}}return r})();var fs="@",gs=(()=>{class r{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=T$3(le$2);loadingSchedulerFn=T$3(_s,{optional:true});_engine;constructor(e,t,i,a,o){this.doc=e,this.delegate=t,this.zone=i,this.animationType=a,this.moduleImpl=o;}ngOnDestroy(){this._engine?.flush();}loadImpl(){let e=()=>this.moduleImpl??import('./chunk-BBS4xAKn.js').then(i=>i),t;return this.loadingSchedulerFn?t=this.loadingSchedulerFn(e):t=e(),t.catch(i=>{throw new b$4(5300,false)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:a})=>{this._engine=i(this.animationType,this.doc);let o=new a(this.delegate,this._engine,this.zone);return this.delegate=o,o})}createRenderer(e,t){let i=this.delegate.createRenderer(e,t);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=false);let a=new Sn(i);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(o=>{let l=o.createRenderer(e,t);a.use(l),this.scheduler??=this.injector.get(Oe$5,null,{optional:true}),this.scheduler?.notify(10);}).catch(o=>{a.use(i);}),a}begin(){this.delegate.begin?.();}end(){this.delegate.end?.();}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(e){this._engine?.flush(),this.delegate.componentReplaced?.(e);}static \u0275fac=function(t){jI();};static \u0275prov=re$1({token:r,factory:r.\u0275fac})}return r})(),Sn=class{delegate;replay=[];\u0275type=1;constructor(n){this.delegate=n;}use(n){if(this.delegate=n,this.replay!==null){for(let e of this.replay)e(n);this.replay=null;}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy();}createElement(n,e){return this.delegate.createElement(n,e)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}get destroyNode(){return this.delegate.destroyNode}appendChild(n,e){this.delegate.appendChild(n,e);}insertBefore(n,e,t,i){this.delegate.insertBefore(n,e,t,i);}removeChild(n,e,t,i){this.delegate.removeChild(n,e,t,i);}selectRootElement(n,e){return this.delegate.selectRootElement(n,e)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,e,t,i){this.delegate.setAttribute(n,e,t,i);}removeAttribute(n,e,t){this.delegate.removeAttribute(n,e,t);}addClass(n,e){this.delegate.addClass(n,e);}removeClass(n,e){this.delegate.removeClass(n,e);}setStyle(n,e,t,i){this.delegate.setStyle(n,e,t,i);}removeStyle(n,e,t){this.delegate.removeStyle(n,e,t);}setProperty(n,e,t){this.shouldReplay(e)&&this.replay.push(i=>i.setProperty(n,e,t)),this.delegate.setProperty(n,e,t);}setValue(n,e){this.delegate.setValue(n,e);}listen(n,e,t,i){return this.shouldReplay(e)&&this.replay.push(a=>a.listen(n,e,t,i)),this.delegate.listen(n,e,t,i)}shouldReplay(n){return this.replay!==null&&n.startsWith(fs)}},_s=new S$2("");function za(r="animations"){return _e$4("NgAsyncAnimations"),Rs([{provide:vr$3,useFactory:()=>new gs(T$3(ir$4),T$3(Kt$3),T$3(ue$1),r)},{provide:Im,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Ii=class{getTraitValue(n,e){try{return n.raw.metadata.attributes.find(t=>t.trait_type===e)?.value??""}catch(t){switch(e){case m.VERSION:return "";case m.MEDIUM:return "Error getting medium";case m.HEIGHT:return "XX";case m.WIDTH:return "XX";case m.UNIT:return "cm";case m.YEAR:return "XXXX";case m.IMAGETYPE:return "";default:return "Error getting data"}}}getYears(n){let e=(n??[]).map(t=>Number(this.getTraitValue(t,m.YEAR))).filter(t=>!Number.isNaN(t)).sort((t,i)=>i-t);return new Set(e)}sortByYear(n,e=Vi.ASC){let t=i=>{let a=Number(this.getTraitValue(i,m.YEAR));return Number.isNaN(a)?0:a};return [...n].sort((i,a)=>{let o=t(i),l=t(a);return e===Vi.ASC?o-l:l-o})}sortByMedium(n,e=Vi.ASC){let t=["oil","watercolor"],i=a=>{let o=this.getTraitValue(a,m.MEDIUM).toLowerCase(),l=t.findIndex(d=>o.includes(d));return l===-1?t.length:l};return [...n].sort((a,o)=>{let l=i(a)-i(o);return e===Vi.ASC?l:-l})}sortBySize(n,e=Vi.ASC){return [...n].sort((t,i)=>{let a=this.getSize(t)-this.getSize(i);return e===Vi.ASC?a:-a})}sortByName(n,e=Vi.ASC){return [...n].sort((t,i)=>{let a=t.name?.toLowerCase()||"",o=i.name?.toLowerCase()||"",l=a.localeCompare(o);return e===Vi.ASC?l:-l})}getSize(n){let e=t=>{let i=Number.parseInt(this.getTraitValue(n,t),10);return Number.isNaN(i)?0:i};return e(m.HEIGHT)+e(m.WIDTH)}getNftById(n,e){return e.find(({tokenId:t})=>n===t)||null}getArtByTitle(n,e){return e.filter(({name:t})=>t===n)}getNftLenghtByYear(n,e){return e.filter(t=>this.getTraitValue(t,m.YEAR)===n).length}isFrontalView(n,e){let t=this.filterFrontalArtworks(e);return t.length?t.length===1?t[0].tokenId===n.tokenId:this.getLatestVersion(t)?.tokenId===n.tokenId:false}filterFrontalArtworks(n){return n.filter(e=>this.getTraitValue(e,m.IMAGETYPE)===f.FRONTAL)}isExcludedByYear(n,e=[]){if(e?.length){let t=this.getTraitValue(n,m.YEAR);return !e.includes(t)}else return  false}getLatestVersion(n){return n.length?n.reduce((e,t)=>{let i=parseInt(this.getTraitValue(e,m.VERSION))||0;return (parseInt(this.getTraitValue(t,m.VERSION))||0)>i?t:e}):null}getLatestVersionIndex(n){let e=this.getLatestVersion(n);return n.findIndex(t=>e&&t.tokenId===e.tokenId)}getNftQualityUrls(n){return this.collectUrls(n,["originalUrl","cachedUrl","thumbnailUrl"])}getNftFetchableUrls(n){return this.collectUrls(n,["originalUrl","pngUrl","thumbnailUrl"])}getNftQualityUrl(n){return this.getNftQualityUrls(n)[0]||""}getNftOptimalUrl(n){return this.collectUrls(n,["thumbnailUrl","cachedUrl","originalUrl"])[0]||""}collectUrls(n,e){let t=e.map(i=>n?.[i]);return [...new Set(t.filter(i=>typeof i=="string"&&!!i))]}};var Ti=class{static olderThanNDays(n,e){let i=Math.abs(new Date().getTime()-new Date(n).getTime());return Math.ceil(i/(1e3*3600*24))>e}};var Pi=(function(r){return r[r.BACKEND_THUMBNAIL=1]="BACKEND_THUMBNAIL",r[r.NFT_THUMBNAIL=2]="NFT_THUMBNAIL",r[r.NFT_CACHED=3]="NFT_CACHED",r})(Pi||{}),Di=class extends Ii{constructor(){super(...arguments),this.http=T$3(xr$1),this.sessionStore=T$3(Pt),this.sessionQuery=T$3(Ei);}getArtPiecesObservable(){if(!this.itIsNeccesaryToFetch())return this.sessionQuery.getArtPiecesObservable;let n=this.http.get(`${gr.backendUrl}nfts-snapshot`).pipe(this.extractData([]),$l(e=>this.saveNftsLocally(e)),Yi$4(()=>this.sessionQuery.getArtPiecesObservable));return this.sessionQuery.selectArtPieces.length?n.pipe(Bl(this.sessionQuery.selectArtPieces)):this.getFallbackArtworks().pipe($l(e=>this.sessionStore.update({artPieces:e})),vl(e=>n.pipe(Bl(e))))}getFallbackArtworks(){return Se$3(import('./chunk-DSHJwLD8.js')).pipe(Me$3(n=>n.FALLBACK_ARTWORKS_API_CALL.data??[]))}getArtPieceDescriptions(n){return this.http.get(`${gr.backendUrl}descriptions/${n}`).pipe(this.extractData(null),Yi$4(()=>ag(null)))}extractData(n){return Me$3(e=>e.success&&e.data?e.data:n)}getNftByIdObservable(n){return this.sessionQuery.getArtPiecesObservable.pipe(Me$3(e=>this.getNftById(n,e)))}getSameArtThanObservable(n){return this.getNftByIdObservable(n).pipe(vl(e=>e?ag(this.getArtByTitle(e.name,this.sessionQuery.selectArtPieces)):this.getArtPiecesObservable().pipe(vl(t=>{let i=this.getNftById(n,t);return i?.name?ag(this.getArtByTitle(i.name,t)):ag([])}))))}getFullNftLenghtByYear(n){return this.getNftLenghtByYear(n,this.sessionQuery.selectArtPieces)}getAvailableOptimalUrl(n){return this.getLocalCachedThumbnail(n.tokenId).pipe(vl(e=>e?ag(e):this.fetchRemoteThumbnail(n.tokenId).pipe(Yi$4(()=>ag(null)),Me$3(t=>t||n.image.thumbnailUrl||n.image.originalUrl))))}getProgressiveImageUrls(n){let e=this.getLocalCachedThumbnail(n.tokenId).pipe(vl(a=>a?ag(a):this.fetchRemoteThumbnail(n.tokenId)),Yi$4(()=>ag(null)),Me$3(a=>({url:a,quality:Pi.BACKEND_THUMBNAIL}))),t=this.preloadImage(n.image?.thumbnailUrl).pipe(Me$3(a=>({url:a,quality:Pi.NFT_THUMBNAIL}))),i=this.preloadImage(n.image?.cachedUrl).pipe(Me$3(a=>({url:a,quality:Pi.NFT_CACHED})));return Dg(e,t,i).pipe(xg((a,o)=>o.url&&o.quality>a.quality?o:a,{url:null,quality:0}),Me$3(({url:a})=>a),Xt$5(a=>!!a),Fl())}preloadImage(n){return n?new N$5(e=>{let t=new Image;return t.onload=()=>{e.next(n),e.complete();},t.onerror=()=>e.complete(),t.src=n,()=>{t.onload=null,t.onerror=null,t.complete||(t.src="");}}):vt$5}getLinks(n){return this.http.get(gr.backendUrl+"vision/search/"+n).pipe(this.extractData([]),Yi$4(()=>ag([])))}getAvailableYears(){return this.getYears(this.sessionQuery.selectArtPieces)}saveNftsLocally(n){this.sessionStore.update({artPieces:n,lastArtPiecesUpdate:new Date});}getLocalCachedThumbnail(n){let e=this.sessionQuery.getThumbnailByTokenId(n);return ag(e?ct$4.composeImgSrc(e.thumbnail):null)}fetchRemoteThumbnail(n){return this.http.get(`${gr.backendUrl}nft-thumbnails/${n}`).pipe($l(e=>{if(e.success&&e.data){let t=this.sessionQuery.getValue().imageCache;this.sessionStore.update({imageCache:[...t,e.data]});}}),Me$3(e=>e.data?ct$4.composeImgSrc(e.data?.thumbnail):null))}itIsNeccesaryToFetch(){return !this.sessionQuery.selectArtPieces.length||!this.sessionQuery.selectLastArtPiecesUpdate||Ti.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate,7)}};var Ha=(()=>{class r{constructor(){this.router=T$3(te$1);}navigateTo(e){this.router.navigate([e]);}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=IE({type:r,selectors:[["app-not-found"]],decls:26,vars:24,consts:[[1,"container","center"],[1,"catalog-heading"],["role","list"],["mat-button","","color","primary",3,"click"],["aria-label","cv","mat-button","","color","primary",3,"click"]],template:function(t,i){t&1&&(wi$2(0,"div",0)(1,"h2",1),FD(2),KD(3,"translate"),Hc(),wi$2(4,"p"),FD(5),KD(6,"translate"),Hc(),wi$2(7,"mat-list",2)(8,"mat-list-item")(9,"button",3),KD(10,"translate"),ih("click",function(){return i.navigateTo("/artworks")}),FD(11),KD(12,"translate"),Hc()(),wi$2(13,"mat-list-item")(14,"button",3),KD(15,"translate"),ih("click",function(){return i.navigateTo("/about")}),FD(16),KD(17,"translate"),Hc()(),wi$2(18,"mat-list-item")(19,"button",4),ih("click",function(){return i.navigateTo("/cv")}),FD(20,"CV"),Hc()(),wi$2(21,"mat-list-item")(22,"button",3),KD(23,"translate"),ih("click",function(){return i.navigateTo("/contact")}),FD(24),KD(25,"translate"),Hc()()()()),t&2&&(Hv(2),Dh(XD(3,8,"notFound.title")),Hv(3),Dh(XD(6,10,"notFound.message")),Hv(4),Kp("aria-label",XD(10,12,"paintings")),Hv(2),qc(" ",XD(12,14,"paintings")," "),Hv(3),Kp("aria-label",XD(15,16,"statement.title")),Hv(2),qc(" ",XD(17,18,"statement.title")," "),Hv(6),Kp("aria-label",XD(23,20,"menu.contact")),Hv(2),qc(" ",XD(25,22,"menu.contact")," "));},dependencies:[Ye$1,qe$2,of,rt$2],styles:[".center[_ngcontent-%COMP%]{text-align:center}"]});}}return r})();var qa=[{path:"",pathMatch:"full",loadComponent:()=>import('./chunk-BnyKLNUl.js').then(r=>r.ArtPiecesListComponent),title:"seo.paintings.title",data:{breadcrumb:"Paintings",description:"seo.paintings.description"}},{path:"artworks",loadComponent:()=>import('./chunk-BnyKLNUl.js').then(r=>r.ArtPiecesListComponent),title:"seo.paintings.title",data:{breadcrumb:"Paintings",description:"seo.paintings.description"}},{path:"artwork/:id",loadComponent:()=>import('./chunk-asnLmYFH.js').then(r=>r.ArtPieceComponent),title:"seo.artwork.title",data:{description:"seo.paintings.description"}},{path:"generative/:id",loadComponent:()=>import('./chunk-BnDe36Bf.js').then(r=>r.GenerativePieceComponent),title:"seo.generative.title",data:{description:"seo.generative.description",hideBreadcrumb:true}},{path:"cv",loadComponent:()=>import('./chunk-B3VQ8Yre.js').then(r=>r.CvComponent),title:"seo.cv.title",data:{description:"seo.cv.description"}},{path:"about",loadComponent:()=>import('./chunk-iECfOmRU.js').then(r=>r.AboutComponent),title:"seo.about.title",data:{description:"seo.about.description"}},{path:"contact",loadComponent:()=>import('./chunk-ADKyjSk3.js').then(r=>r.ContactComponent),title:"seo.contact.title",data:{description:"seo.contact.description"}},{path:"terms",loadComponent:()=>import('./chunk-B2M2ogIR.js').then(r=>r.TermsComponent),title:"seo.terms.title",data:{description:"seo.terms.description"}},{path:"privacy",loadComponent:()=>import('./chunk-hubvkWMU.js').then(r=>r.PrivacyComponent),title:"seo.privacy.title",data:{description:"seo.privacy.description"}},{path:"**",component:Ha,title:"seo.notFound.title"}];var Ya={providers:[Lo$1(qa,zo$1(Oo$1),Ho$1()),st$2({fallbackLang:ae.ENGLISH}),{provide:c,useClass:Di},nw(),lo$2(mo$1()),za(),{provide:fr$2,useExisting:$$3}]};hn({preStorageUpdate:(r,n)=>r==="session"&&!n.lastArtPiecesUpdate?x$2(w$3({},n),{artPieces:[]}):n});Zi();ki$3(ja,Ya).catch(r=>console.error(r));
export{$$3 as $,Hv as A,Bl as B,C$5 as C,lD as D,Et$1 as E,Fe$3 as F,Gp as G,Hc as H,IE as I,Jo$2 as J,KD as K,tw as L,Me$3 as M,NF as N,Xp as O,Pe$2 as P,Q$4 as Q,hh as R,St as S,T$3 as T,Ue$1 as U,gh as V,lh as W,XD as X,YE as Y,Z$2 as Z,_i$2 as _,b$3 as a,ne$3 as a$,fD as a0,pD as a1,Ye$1 as a2,qe$2 as a3,r as a4,of as a5,JE as a6,KE as a7,Dh as a8,XE as a9,Af as aA,Le$4 as aB,Gt$4 as aC,bo$2 as aD,td as aE,Uy as aF,S$2 as aG,Tr$2 as aH,un$3 as aI,ea as aJ,Bc as aK,$c as aL,zD as aM,ch as aN,zo$2 as aO,le$2 as aP,yn as aQ,ue$1 as aR,A$2 as aS,Vl as aT,ln$3 as aU,Li$4 as aV,bt$4 as aW,ir$4 as aX,CI as aY,we$3 as aZ,fm as a_,qc as aa,Fl as ab,Yi$4 as ac,f as ad,h as ae,Vi as af,Ut$3 as ag,m$1 as ah,bh as ai,Ch as aj,aD as ak,iD as al,uD as am,nh as an,gD as ao,Uc as ap,Wc as aq,QD as ar,ZD as as,ew as at,Th as au,xu as av,Au as aw,zy as ax,$D as ay,wh as az,b$4 as b,xr$1 as b$,Rg as b0,Ut$2 as b1,st$1 as b2,Dn as b3,En as b4,Wf as b5,Yr$2 as b6,CE as b7,kF as b8,at$2 as b9,Dg as bA,LF as bB,Uu$1 as bC,Wu as bD,_D as bE,sh as bF,Ps as bG,Wp as bH,rh as bI,NE as bJ,Tm as bK,b$1 as bL,PF as bM,Jo$1 as bN,Ui as bO,Qo$1 as bP,Wr as bQ,or$1 as bR,At$2 as bS,xI as bT,RI as bU,$r as bV,zt$1 as bW,Qr as bX,Xr as bY,Zr as bZ,Yr as b_,No$2 as ba,Gr$1 as bb,yo$2 as bc,Qr$1 as bd,Sn$1 as be,hn$3 as bf,Ig as bg,It$7 as bh,ke$2 as bi,eo as bj,ft$1 as bk,yr$2 as bl,Ae$1 as bm,wr$2 as bn,qe$3 as bo,ey as bp,x$2 as bq,$$5 as br,ci$1 as bs,Fh as bt,Pm as bu,Gi$1 as bv,nt$1 as bw,Eo$3 as bx,On$2 as by,Xt$5 as bz,c,gr as c0,Jr as c1,en as c2,Zn as c3,kt$1 as c4,Po$2 as c5,vr$3 as c6,vt$5 as c7,k$4 as c8,_e$1 as c9,tr$1 as ca,Pt$2 as cb,rm as cc,zr as cd,Yr$1 as ce,is$1 as cf,ar$4 as cg,hn$1 as ch,er$1 as ci,A$4 as cj,B$6 as ck,s as cl,MF as cm,vi$1 as cn,zi as co,q$1 as cp,zE as cq,Xo$2 as cr,dt$6 as d,ct$4 as e,SF as f,Ne$1 as g,ag as h,ae$2 as i,bE as j,rt$2 as k,wi$2 as l,m,ih as n,FD as o,pa$1 as p,Jp as q,re$1 as r,sr$3 as s,te$1 as t,UD as u,vl as v,w$3 as w,Kp as x,ZE as y,z$4 as z};