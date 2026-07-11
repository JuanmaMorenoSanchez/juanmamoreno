var p$1=Object.create;var j$2=Object.defineProperty,q$3=Object.defineProperties,r$1=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertyNames,g=Object.getOwnPropertySymbols,u=Object.getPrototypeOf,k$1=Object.prototype.hasOwnProperty,m$2=Object.prototype.propertyIsEnumerable;var l=(a,b,c)=>b in a?j$2(a,b,{enumerable:true,configurable:true,writable:true,value:c}):a[b]=c,w$2=(a,b)=>{for(var c in b||={})k$1.call(b,c)&&l(a,c,b[c]);if(g)for(var c of g(b))m$2.call(b,c)&&l(a,c,b[c]);return a},x$1=(a,b)=>q$3(a,s(b));var y$2=a=>typeof a=="symbol"?a:a+"",z$1=(a,b)=>{var c={};for(var d in a)k$1.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&g)for(var d of g(a))b.indexOf(d)<0&&m$2.call(a,d)&&(c[d]=a[d]);return c};var A$2=(a,b)=>()=>{try{return b||a((b={exports:{}}).exports,b),b.exports}catch(c){throw b=0,c}};var v$2=(a,b,c,d)=>{if(b&&typeof b=="object"||typeof b=="function")for(let e of t(b))!k$1.call(a,e)&&e!==c&&j$2(a,e,{get:()=>b[e],enumerable:!(d=r$1(b,e))||d.enumerable});return a};var B$3=(a,b,c)=>(c=a!=null?p$1(u(a)):{},v$2(j$2(c,"default",{value:a,enumerable:true}),a));var C$1=(a,b,c)=>new Promise((d,e)=>{var n=f=>{try{h(c.next(f));}catch(i){e(i);}},o=f=>{try{h(c.throw(f));}catch(i){e(i);}},h=f=>f.done?d(f.value):Promise.resolve(f.value).then(n,o);h((c=c.apply(a,b)).next());});function w$1(e){return typeof e=="function"}function Eh(e){return w$1(e?.lift)}function E$1(e){return t=>{if(Eh(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r);}});throw new TypeError("Unable to lift unknown Observable type")}}function Ut$3(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack;});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Nr$2=Ut$3(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n;});function ft$1(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1);}}var G=class e{constructor(t){this.initialTeardown=t,this.closed=false,this._parentage=null,this._finalizers=null;}unsubscribe(){let t;if(!this.closed){this.closed=true;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(w$1(r))try{r();}catch(i){t=i instanceof Nr$2?i.errors:[i];}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{Zc$1(i);}catch(s){t=t??[],s instanceof Nr$2?t=[...t,...s.errors]:t.push(s);}}if(t)throw new Nr$2(t)}}add(t){var n;if(t&&t!==this)if(this.closed)Zc$1(t);else {if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this);}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t);}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t;}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&ft$1(n,t);}remove(t){let{_finalizers:n}=this;n&&ft$1(n,t),t instanceof e&&t._removeParent(this);}};G.EMPTY=(()=>{let e=new G;return e.closed=true,e})();var Ai$3=G.EMPTY;function Sr$2(e){return e instanceof G||e&&"closed"in e&&w$1(e.remove)&&w$1(e.add)&&w$1(e.unsubscribe)}function Zc$1(e){w$1(e)?e():e.unsubscribe();}var ge={Promise:void 0};var Wt$1={setTimeout(e,t,...n){return setTimeout(e,t,...n)},clearTimeout(e){return (clearTimeout)(e)},delegate:void 0};function xr$2(e){Wt$1.setTimeout(()=>{throw e});}function pt$1(){}function qt$1(e){e();}var gt$2=class gt extends G{constructor(t){super(),this.isStopped=false,t?(this.destination=t,Sr$2(t)&&t.add(this)):this.destination=Th;}static create(t,n,r){return new Fe$2(t,n,r)}next(t){this.isStopped?Oi$1():this._next(t);}error(t){this.isStopped?Oi$1():(this.isStopped=true,this._error(t));}complete(){this.isStopped?Oi$1():(this.isStopped=true,this._complete());}unsubscribe(){this.closed||(this.isStopped=true,super.unsubscribe(),this.destination=null);}_next(t){this.destination.next(t);}_error(t){try{this.destination.error(t);}finally{this.unsubscribe();}}_complete(){try{this.destination.complete();}finally{this.unsubscribe();}}};var Pi$1=class Pi{constructor(t){this.partialObserver=t;}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t);}catch(r){Ar$2(r);}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t);}catch(r){Ar$2(r);}else Ar$2(t);}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete();}catch(n){Ar$2(n);}}},Fe$2=class Fe extends gt$2{constructor(t,n,r){super();let o;if(w$1(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else {o=t;}this.destination=new Pi$1(o);}};function Ar$2(e){xr$2(e);}function wh(e){throw e}function Oi$1(e,t){}var Th={closed:true,next:pt$1,error:wh,complete:pt$1};function D$1(e,t,n,r,o){return new Li$1(e,t,n,r,o)}var Li$1=class Li extends gt$2{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a);}catch(c){t.error(c);}}:super._next,this._error=o?function(a){try{o(a);}catch(c){t.error(c);}finally{this.unsubscribe();}}:super._error,this._complete=r?function(){try{r();}catch(a){t.error(a);}finally{this.unsubscribe();}}:super._complete;}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this));}}};function we$1(e,t){return E$1((n,r)=>{let o=0;n.subscribe(D$1(r,i=>{r.next(e.call(t,i,o++));}));})}var Gt$2=typeof Symbol=="function"&&Symbol.observable||"@@observable";function X$1(e){return e}function Ch(...e){return Fi$2(e)}function Fi$2(e){return e.length===0?X$1:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var N$1=(()=>{class e{constructor(n){n&&(this._subscribe=n);}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=_h(n)?n:new Fe$2(n,r,o);return qt$1(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i));}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r);}}forEach(n,r){return r=el$1(r),new r((o,i)=>{let s=new Fe$2({next:a=>{try{n(a);}catch(c){i(c),s.unsubscribe();}},error:i,complete:o});this.subscribe(s);})}_subscribe(n){var r;return (r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[Gt$2](){return this}pipe(...n){return Fi$2(n)(this)}toPromise(n){return n=el$1(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i));})}}return e.create=t=>new e(t),e})();function el$1(e){var t;return (t=e??ge.Promise)!==null&&t!==void 0?t:Promise}function bh(e){return e&&w$1(e.next)&&w$1(e.error)&&w$1(e.complete)}function _h(e){return e&&e instanceof gt$2||bh(e)&&Sr$2(e)}var mt$1=new N$1(e=>e.complete());function yt$2(e){return e<=0?()=>mt$1:E$1((t,n)=>{let r=0;t.subscribe(D$1(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete());}));})}function Gw(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i}function zw(e,t){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(e,t)}function nl$1(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i);})}return new(n||(n=Promise))(function(i,s){function a(u){try{l(r.next(u));}catch(d){s(d);}}function c(u){try{l(r.throw(u));}catch(d){s(d);}}function l(u){u.done?i(u.value):o(u.value).then(a,c);}l((r=r.apply(e,[])).next());})}function tl$1(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return {next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function vt$2(e){return this instanceof vt$2?(this.v=e,this):new vt$2(e)}function rl$1(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(f){return function(h){return Promise.resolve(h).then(f,d)}}function a(f,h){r[f]&&(o[f]=function(g){return new Promise(function(_,M){i.push([f,g,_,M])>1||c(f,g);})},h&&(o[f]=h(o[f])));}function c(f,h){try{l(r[f](h));}catch(g){p(i[0][3],g);}}function l(f){f.value instanceof vt$2?Promise.resolve(f.value.v).then(u,d):p(i[0][2],f);}function u(f){c("next",f);}function d(f){c("throw",f);}function p(f,h){f(h),i.shift(),i.length&&c(i[0][0],i[0][1]);}}function ol$1(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof tl$1=="function"?tl$1(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value);})};}function o(i,s,a,c){Promise.resolve(c).then(function(l){i({value:l,done:a});},s);}}var Rr$2=e=>e&&typeof e.length=="number"&&typeof e!="function";function kr$2(e){return w$1(e?.then)}function Or$2(e){return w$1(e[Gt$2])}function Pr$2(e){return Symbol.asyncIterator&&w$1(e?.[Symbol.asyncIterator])}function Lr$2(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Mh(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Fr$2=Mh();function jr$2(e){return w$1(e?.[Fr$2])}function Vr$2(e){return rl$1(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield vt$2(n.read());if(o)return yield vt$2(void 0);yield yield vt$2(r);}}finally{n.releaseLock();}})}function Hr$2(e){return w$1(e?.getReader)}function k(e){if(e instanceof N$1)return e;if(e!=null){if(Or$2(e))return Nh(e);if(Rr$2(e))return Sh(e);if(kr$2(e))return xh(e);if(Pr$2(e))return il$1(e);if(jr$2(e))return Ah(e);if(Hr$2(e))return Rh(e)}throw Lr$2(e)}function Nh(e){return new N$1(t=>{let n=e[Gt$2]();if(w$1(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Sh(e){return new N$1(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete();})}function xh(e){return new N$1(t=>{e.then(n=>{t.closed||(t.next(n),t.complete());},n=>t.error(n)).then(null,xr$2);})}function Ah(e){return new N$1(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete();})}function il$1(e){return new N$1(t=>{kh(e,t).catch(n=>t.error(n));})}function Rh(e){return il$1(Vr$2(e))}function kh(e,t){var n,r,o,i;return nl$1(this,void 0,void 0,function*(){try{for(n=ol$1(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s};}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n));}finally{if(o)throw o.error}}t.complete();})}function sl$1(e,t){return E$1((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(D$1(r,c=>{o?.unsubscribe();let l=0,u=i++;k(e(c,u)).subscribe(o=D$1(r,d=>r.next(t?t(c,d,u,l++):d),()=>{o=null,a();}));},()=>{s=!0,a();}));})}var al$1=Ut$3(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed";});var ee$1=(()=>{class e extends N$1{constructor(){super(),this.closed=false,this.currentObservers=null,this.observers=[],this.isStopped=false,this.hasError=false,this.thrownError=null;}lift(n){let r=new Br$2(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new al$1}next(n){qt$1(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n);}});}error(n){qt$1(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=true,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n);}});}complete(){qt$1(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=true;let{observers:n}=this;for(;n.length;)n.shift().complete();}});}unsubscribe(){this.isStopped=this.closed=true,this.observers=this.currentObservers=null;}get observed(){var n;return ((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?Ai$3:(this.currentObservers=null,i.push(n),new G(()=>{this.currentObservers=null,ft$1(i,n);}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete();}asObservable(){let n=new N$1;return n.source=this,n}}return e.create=(t,n)=>new Br$2(t,n),e})(),Br$2=class Br extends ee$1{constructor(t,n){super(),this.destination=t,this.source=n;}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t);}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t);}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t);}_subscribe(t){var n,r;return (r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:Ai$3}};var Sn=class extends ee$1{constructor(t){super(),this._value=t;}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return !n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t);}};var xn={now(){return (xn.delegate||Date).now()},delegate:void 0};var An=class extends ee$1{constructor(t=1/0,n=1/0,r=xn){super(),this._bufferSize=t,this._windowTime=n,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=true,this._infiniteTimeWindow=n===1/0,this._bufferSize=Math.max(1,t),this._windowTime=Math.max(1,n);}next(t){let{isStopped:n,_buffer:r,_infiniteTimeWindow:o,_timestampProvider:i,_windowTime:s}=this;n||(r.push(t),!o&&r.push(i.now()+s)),this._trimBuffer(),super.next(t);}_subscribe(t){this._throwIfClosed(),this._trimBuffer();let n=this._innerSubscribe(t),{_infiniteTimeWindow:r,_buffer:o}=this,i=o.slice();for(let s=0;s<i.length&&!t.closed;s+=r?1:2)t.next(i[s]);return this._checkFinalizedStatuses(t),n}_trimBuffer(){let{_bufferSize:t,_timestampProvider:n,_buffer:r,_infiniteTimeWindow:o}=this,i=(o?1:2)*t;if(t<1/0&&i<r.length&&r.splice(0,r.length-i),!o){let s=n.now(),a=0;for(let c=1;c<r.length&&r[c]<=s;c+=2)a=c;a&&r.splice(0,a+1);}}};var $r$1=class $r extends G{constructor(t,n){super();}schedule(t,n=0){return this}};var Rn$1={setInterval(e,t,...n){let{delegate:r}=Rn$1;return r?.setInterval?r.setInterval(e,t,...n):setInterval(e,t,...n)},clearInterval(e){return (clearInterval)(e)},delegate:void 0};var Ur$2=class Ur extends $r$1{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=false;}schedule(t,n=0){var r;if(this.closed)return this;this.state=t;let o=this.id,i=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(i,o,n)),this.pending=true,this.delay=n,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(i,this.id,n),this}requestAsyncId(t,n,r=0){return Rn$1.setInterval(t.flush.bind(t,this),r)}recycleAsyncId(t,n,r=0){if(r!=null&&this.delay===r&&this.pending===false)return n;n!=null&&Rn$1.clearInterval(n);}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=false;let r=this._execute(t,n);if(r)return r;this.pending===false&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null));}_execute(t,n){let r=false,o;try{this.work(t);}catch(i){r=true,o=i||new Error("Scheduled action threw falsy error");}if(r)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:t,scheduler:n}=this,{actions:r}=n;this.work=this.state=this.scheduler=null,this.pending=false,ft$1(r,this),t!=null&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe();}}};var zt$4=class e{constructor(t,n=e.now){this.schedulerActionCtor=t,this.now=n;}schedule(t,n=0,r){return new this.schedulerActionCtor(this,t).schedule(r,n)}};zt$4.now=xn.now;var Wr$2=class Wr extends zt$4{constructor(t,n=zt$4.now){super(t,n),this.actions=[],this._active=false;}flush(t){let{actions:n}=this;if(this._active){n.push(t);return}let r;this._active=true;do if(r=t.execute(t.state,t.delay))break;while(t=n.shift());if(this._active=false,r){for(;t=n.shift();)t.unsubscribe();throw r}}};var It$2=new Wr$2(Ur$2),cl$1=It$2;function qr$2(e){return e&&w$1(e.schedule)}function ji$2(e){return e[e.length-1]}function Gr$2(e){return w$1(ji$2(e))?e.pop():void 0}function Te$2(e){return qr$2(ji$2(e))?e.pop():void 0}function ll$1(e,t){return typeof ji$2(e)=="number"?e.pop():t}function J$3(e,t,n,r=0,o=false){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe();},r);if(e.add(i),!o)return i}function zr$2(e,t=0){return E$1((n,r)=>{n.subscribe(D$1(r,o=>J$3(r,e,()=>r.next(o),t),()=>J$3(r,e,()=>r.complete(),t),o=>J$3(r,e,()=>r.error(o),t)));})}function Qr$2(e,t=0){return E$1((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t));})}function ul$1(e,t){return k(e).pipe(Qr$2(t),zr$2(t))}function dl$1(e,t){return k(e).pipe(Qr$2(t),zr$2(t))}function fl$1(e,t){return new N$1(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule());})})}function pl$1(e,t){return new N$1(n=>{let r;return J$3(n,t,()=>{r=e[Fr$2](),J$3(n,t,()=>{let o,i;try{({value:o,done:i}=r.next());}catch(s){n.error(s);return}i?n.complete():n.next(o);},0,true);}),()=>w$1(r?.return)&&r.return()})}function Zr$2(e,t){if(!e)throw new Error("Iterable cannot be null");return new N$1(n=>{J$3(n,t,()=>{let r=e[Symbol.asyncIterator]();J$3(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value);});},0,true);});})}function hl$1(e,t){return Zr$2(Vr$2(e),t)}function gl$1(e,t){if(e!=null){if(Or$2(e))return ul$1(e,t);if(Rr$2(e))return fl$1(e,t);if(kr$2(e))return dl$1(e,t);if(Pr$2(e))return Zr$2(e,t);if(jr$2(e))return pl$1(e,t);if(Hr$2(e))return hl$1(e,t)}throw Lr$2(e)}function Ce(e,t){return t?gl$1(e,t):k(e)}function Oh(...e){let t=Te$2(e);return Ce(e,t)}function Ph(e,t){let n=w$1(e)?e:()=>e,r=o=>o.error(n());return new N$1(r)}function Lh(e){return !!e&&(e instanceof N$1||w$1(e.lift)&&w$1(e.subscribe))}var kn$1=Ut$3(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence";});function ml$1(e){return e instanceof Date&&!isNaN(e)}var{isArray:Fh}=Array;function jh(e,t){return Fh(t)?e(...t):e(t)}function Yr$2(e){return we$1(t=>jh(e,t))}var{isArray:Vh}=Array,{getPrototypeOf:Hh,prototype:Bh,keys:$h}=Object;function Kr$2(e){if(e.length===1){let t=e[0];if(Vh(t))return {args:t,keys:null};if(Uh(t)){let n=$h(t);return {args:n.map(r=>t[r]),keys:n}}}return {args:e,keys:null}}function Uh(e){return e&&typeof e=="object"&&Hh(e)===Bh}function Jr$3(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function Wh(...e){let t=Te$2(e),n=Gr$2(e),{args:r,keys:o}=Kr$2(e);if(r.length===0)return Ce([],t);let i=new N$1(qh(r,t,o?s=>Jr$3(o,s):X$1));return n?i.pipe(Yr$2(n)):i}function qh(e,t,n=X$1){return r=>{yl(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)yl(t,()=>{let l=Ce(e[c],t),u=false;l.subscribe(D$1(r,d=>{i[c]=d,u||(u=true,a--),a||r.next(n(i.slice()));},()=>{--s||r.complete();}));},r);},r);}}function yl(e,t,n){e?J$3(n,e,t):t();}function vl(e,t,n,r,o,i,s,a){let c=[],l=0,u=0,d=false,p=()=>{d&&!c.length&&!l&&t.complete();},f=g=>l<r?h(g):c.push(g),h=g=>{l++;let _=false;k(n(g,u++)).subscribe(D$1(t,M=>{t.next(M);},()=>{_=true;},void 0,()=>{if(_)try{for(l--;c.length&&l<r;){let M=c.shift();s?J$3(t,s,()=>h(M)):h(M);}p();}catch(M){t.error(M);}}));};return e.subscribe(D$1(t,f,()=>{d=true,p();})),()=>{}}function je$3(e,t,n=1/0){return w$1(t)?je$3((r,o)=>we$1((i,s)=>t(r,i,o,s))(k(e(r,o))),n):(typeof t=="number"&&(n=t),E$1((r,o)=>vl(r,o,e,n)))}function On$1(e=1/0){return je$3(X$1,e)}function Il$1(){return On$1(1)}function Qt$2(...e){return Il$1()(Ce(e,Te$2(e)))}function Gh(e){return new N$1(t=>{k(e()).subscribe(t);})}function zh(...e){let t=Gr$2(e),{args:n,keys:r}=Kr$2(e),o=new N$1(i=>{let{length:s}=n;if(!s){i.complete();return}let a=new Array(s),c=s,l=s;for(let u=0;u<s;u++){let d=false;k(n[u]).subscribe(D$1(i,p=>{d||(d=true,l--),a[u]=p;},()=>c--,void 0,()=>{(!c||!d)&&(l||i.next(r?Jr$3(r,a):a),i.complete());}));}});return t?o.pipe(Yr$2(t)):o}function Xr$2(e=0,t,n=cl$1){let r=-1;return t!=null&&(qr$2(t)?n=t:r=t),new N$1(o=>{let i=ml$1(e)?+e-n.now():e;i<0&&(i=0);let s=0;return n.schedule(function(){o.closed||(o.next(s++),0<=r?this.schedule(void 0,r):o.complete());},i)})}function Qh(...e){let t=Te$2(e),n=ll$1(e,1/0),r=e;return r.length?r.length===1?k(r[0]):On$1(n)(Ce(r,t)):mt$1}function Zt$1(e,t){return E$1((n,r)=>{let o=0;n.subscribe(D$1(r,i=>e.call(t,i,o++)&&r.next(i)));})}function El$1(e){return E$1((t,n)=>{let r=!1,o=null,i=null,s=!1,a=()=>{if(i?.unsubscribe(),i=null,r){r=!1;let l=o;o=null,n.next(l);}s&&n.complete();},c=()=>{i=null,s&&n.complete();};t.subscribe(D$1(n,l=>{r=!0,o=l,i||k(e(l)).subscribe(i=D$1(n,a,c));},()=>{s=!0,(!r||!i||i.closed)&&n.complete();}));})}function Zh(e,t=It$2){return El$1(()=>Xr$2(e,t))}function Vi$1(e){return E$1((t,n)=>{let r=null,o=!1,i;r=t.subscribe(D$1(n,void 0,void 0,s=>{i=k(e(s,Vi$1(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0;})),o&&(r.unsubscribe(),r=null,i.subscribe(n));})}function Dl(e,t,n,r,o){return (i,s)=>{let a=n,c=t,l=0;i.subscribe(D$1(s,u=>{let d=l++;c=a?e(c,u,d):(a=true,u),s.next(c);},o));}}function Yh(e,t){return w$1(t)?je$3(e,t,1):je$3(e,1)}function Kh(e,t=It$2){return E$1((n,r)=>{let o=null,i=null,s=null,a=()=>{if(o){o.unsubscribe(),o=null;let l=i;i=null,r.next(l);}};function c(){let l=s+e,u=t.now();if(u<l){o=this.schedule(void 0,l-u),r.add(o);return}a();}n.subscribe(D$1(r,l=>{i=l,s=t.now(),o||(o=t.schedule(c,e),r.add(o));},()=>{a(),r.complete();},void 0,()=>{i=o=null;}));})}function wl$1(e){return E$1((t,n)=>{let r=!1;t.subscribe(D$1(n,o=>{r=!0,n.next(o);},()=>{r||n.next(e),n.complete();}));})}function Tl$1(){return E$1((e,t)=>{e.subscribe(D$1(t,pt$1));})}function Hi$2(e){return we$1(()=>e)}function Bi$1(e,t){return t?n=>Qt$2(t.pipe(yt$2(1),Tl$1()),n.pipe(Bi$1(e))):je$3((n,r)=>k(e(n,r)).pipe(yt$2(1),Hi$2(n)))}function Cl$1(e,t=It$2){let n=Xr$2(e,t);return Bi$1(()=>n)}function bl(e,t=X$1){return e=e??Jh,E$1((n,r)=>{let o,i=!0;n.subscribe(D$1(r,s=>{let a=t(s);(i||!e(o,a))&&(i=!1,o=a,r.next(s));}));})}function Jh(e,t){return e===t}function _l$1(e=Xh){return E$1((t,n)=>{let r=!1;t.subscribe(D$1(n,o=>{r=!0,n.next(o);},()=>r?n.complete():n.error(e())));})}function Xh(){return new kn$1}function Ml$1(e){return E$1((t,n)=>{try{t.subscribe(n);}finally{n.add(e);}})}function eg$1(e,t){let n=arguments.length>=2;return r=>r.pipe(e?Zt$1((o,i)=>e(o,i,r)):X$1,yt$2(1),n?wl$1(t):_l$1(()=>new kn$1))}function tg$1(e){return e<=0?()=>mt$1:E$1((t,n)=>{let r=[];t.subscribe(D$1(n,o=>{r.push(o),e<r.length&&r.shift();},()=>{for(let o of r)n.next(o);n.complete();},void 0,()=>{r=null;}));})}function ng(){return E$1((e,t)=>{let n,r=!1;e.subscribe(D$1(t,o=>{let i=n;n=o,r&&t.next([i,o]),r=!0;}));})}function rg(e,t){return E$1(Dl(e,t,arguments.length>=2,!0))}function Ui$1(e={}){let{connector:t=()=>new ee$1,resetOnError:n=true,resetOnComplete:r=true,resetOnRefCountZero:o=true}=e;return i=>{let s,a,c,l=0,u=false,d=false,p=()=>{a?.unsubscribe(),a=void 0;},f=()=>{p(),s=c=void 0,u=d=false;},h=()=>{let g=s;f(),g?.unsubscribe();};return E$1((g,_)=>{l++,!d&&!u&&p();let M=c=c??t();_.add(()=>{l--,l===0&&!d&&!u&&(a=$i$2(h,o));}),M.subscribe(_),!s&&l>0&&(s=new Fe$2({next:he=>M.next(he),error:he=>{d=!0,p(),a=$i$2(f,n,he),M.error(he);},complete:()=>{u=!0,p(),a=$i$2(f,r),M.complete();}}),k(g).subscribe(s));})(i)}}function $i$2(e,t,...n){if(t===true){e();return}if(t===false)return;let r=new Fe$2({next:()=>{r.unsubscribe(),e();}});return k(t(...n)).subscribe(r)}function og(e,t,n){let r,o=false;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:t=1/0,refCount:o=false,scheduler:n}=e:r=e??1/0,Ui$1({connector:()=>new An(r,t,n),resetOnError:true,resetOnComplete:false,resetOnRefCountZero:o})}function Nl$1(e){return Zt$1((t,n)=>e<=n)}function Sl$1(...e){let t=Te$2(e);return E$1((n,r)=>{(t?Qt$2(e,n,t):Qt$2(e,n)).subscribe(r);})}function ig(e){return E$1((t,n)=>{k(e).subscribe(D$1(n,()=>n.complete(),pt$1)),!n.closed&&t.subscribe(n);})}function sg(e,t=false){return E$1((n,r)=>{let o=0;n.subscribe(D$1(r,i=>{let s=e(i,o++);(s||t)&&r.next(i),!s&&r.complete();}));})}function xl$1(e,t,n){let r=w$1(e)||t||n?{next:e,error:t,complete:n}:e;return r?E$1((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(D$1(i,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),i.next(c);},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete();},c=>{var l;a=!1,(l=r.error)===null||l===void 0||l.call(r,c),i.error(c);},()=>{var c,l;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r);}));}):X$1}var Y$1=null,eo$2=false,Et$3=1,j$1=Symbol("SIGNAL");function v$1(e){let t=Y$1;return Y$1=e,t}function to$2(){return Y$1}var Ke$1={version:0,lastCleanEpoch:0,dirty:false,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:false,consumerAllowSignalWrites:false,consumerIsAlwaysLive:false,kind:"unknown",producerMustRecompute:()=>false,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Ve$3(e){if(eo$2)throw new Error("");if(Y$1===null)return;Y$1.consumerOnSignalRead(e);let t=Y$1.producersTail;if(t!==void 0&&t.producer===e)return;let n,r=Y$1.recomputing;if(r&&(n=t!==void 0?t.nextProducer:Y$1.producers,n!==void 0&&n.producer===e)){Y$1.producersTail=n,n.lastReadVersion=e.version,n.knownValidAtEpoch=Et$3;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===Y$1&&(!r||o.knownValidAtEpoch===Et$3))return;let i=Jt$2(Y$1),s={producer:e,consumer:Y$1,nextProducer:n,prevConsumer:void 0,knownValidAtEpoch:Et$3,lastReadVersion:e.version,nextConsumer:void 0};Y$1.producersTail=s,t!==void 0?t.nextProducer=s:Y$1.producers=s,i&&Ol$1(e,s);}function Al$1(){Et$3++;}function Tt$2(e){if(!(Jt$2(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Et$3)){if(!e.producerMustRecompute(e)&&!Kt$2(e)){Yt$3(e);return}e.producerRecomputeValue(e),Yt$3(e);}}function Wi$1(e){if(e.consumers===void 0)return;let t=eo$2;eo$2=true;try{for(let n=e.consumers;n!==void 0;n=n.nextConsumer){let r=n.consumer;r.dirty||cg(r);}}finally{eo$2=t;}}function qi$3(){return Y$1?.consumerAllowSignalWrites!==false}function cg(e){e.dirty=true,Wi$1(e),e.consumerMarkedDirty?.(e);}function Yt$3(e){e.dirty=false,e.lastCleanEpoch=Et$3;}function He$2(e){return e&&Rl$1(e),v$1(e)}function Rl$1(e){if(e.producersTail?.knownValidAtEpoch===Et$3){let t=e.producers;for(;t!==void 0;)t.knownValidAtEpoch=null,t=t.nextProducer;}e.producersTail=void 0,e.recomputing=true;}function Je$3(e,t){v$1(t),e&&kl$1(e);}function kl$1(e){e.recomputing=false;let t=e.producersTail,n=t!==void 0?t.nextProducer:e.producers;if(n!==void 0){if(Jt$2(e))do n=Gi$2(n);while(n!==void 0);t!==void 0?t.nextProducer=void 0:e.producers=void 0;}}function Kt$2(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let n=t.producer,r=t.lastReadVersion;if(r!==n.version||(Tt$2(n),r!==n.version))return  true}return  false}function Xe$2(e){if(Jt$2(e)){let t=e.producers;for(;t!==void 0;)t=Gi$2(t);}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0;}function Ol$1(e,t){let n=e.consumersTail,r=Jt$2(e);if(n!==void 0?(t.nextConsumer=n.nextConsumer,n.nextConsumer=t):(t.nextConsumer=void 0,e.consumers=t),t.prevConsumer=n,e.consumersTail=t,!r)for(let o=e.producers;o!==void 0;o=o.nextProducer)Ol$1(o.producer,o);}function Gi$2(e){let t=e.producer,n=e.nextProducer,r=e.nextConsumer,o=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=o:t.consumersTail=o,o!==void 0)o.nextConsumer=r;else if(t.consumers=r,!Jt$2(t)){let i=t.producers;for(;i!==void 0;)i=Gi$2(i);}return n}function Jt$2(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Ln$2(e,t){return Object.is(e,t)}function Fn$2(e,t){let n=Object.create(lg);n.computation=e,t!==void 0&&(n.equal=t);let r=()=>{if(Tt$2(n),Ve$3(n),n.value===be$1)throw n.error;return n.value};return r[j$1]=n,r}var Dt$2=Symbol("UNSET"),wt$3=Symbol("COMPUTING"),be$1=Symbol("ERRORED"),lg=x$1(w$2({},Ke$1),{value:Dt$2,dirty:true,error:null,equal:Ln$2,kind:"computed",producerMustRecompute(e){return e.value===Dt$2||e.value===wt$3},producerRecomputeValue(e){if(e.value===wt$3)throw new Error("");let t=e.value;e.value=wt$3;let n=He$2(e),r,o=false;try{r=e.computation(),v$1(null),o=t!==Dt$2&&t!==be$1&&r!==be$1&&e.equal(t,r);}catch(i){r=be$1,e.error=i;}finally{Je$3(e,n);}if(o){e.value=t;return}e.value=r,e.version++;}});function ug(){throw new Error}var Pl$1=ug;function Ll$1(e){Pl$1(e);}function zi$2(e){Pl$1=e;}function Qi$2(e,t){let n=Object.create(jn$2);n.value=e,t!==void 0&&(n.equal=t);let r=()=>Fl(n);return r[j$1]=n,[r,s=>et$4(n,s),s=>no$3(n,s)]}function Fl(e){return Ve$3(e),e.value}function et$4(e,t){qi$3()||Ll$1(e),e.equal(e.value,t)||(e.value=t,fg(e));}function no$3(e,t){qi$3()||Ll$1(e),et$4(e,t(e.value));}var jn$2=x$1(w$2({},Ke$1),{equal:Ln$2,value:void 0,kind:"signal"});function fg(e){e.version++,Al$1(),Wi$1(e);}var Zi$2=x$1(w$2({},Ke$1),{consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,dirty:true,kind:"effect"});function Yi$1(e){if(e.dirty=false,e.version>0&&!Kt$2(e))return;e.version++;let t=He$2(e);try{e.cleanup(),e.fn();}finally{Je$3(e,t);}}var Ki$2;function ro$3(){return Ki$2}function _e(e){let t=Ki$2;return Ki$2=e,t}var jl$1=Symbol("NotFound");function Xt$2(e){return e===jl$1||e?.name==="\u0275NotFound"}function Ji$2(e,t,n){let r=Object.create(pg);r.source=e,r.computation=t,n!=null&&(r.equal=n);let i=()=>{if(Tt$2(r),Ve$3(r),r.value===be$1)throw r.error;return r.value};return i[j$1]=r,i}function Vl$1(e,t){Tt$2(e),et$4(e,t),Yt$3(e);}function Hl$1(e,t){if(Tt$2(e),e.value===be$1)throw e.error;no$3(e,t),Yt$3(e);}var pg=x$1(w$2({},Ke$1),{value:Dt$2,dirty:true,error:null,equal:Ln$2,kind:"linkedSignal",producerMustRecompute(e){return e.value===Dt$2||e.value===wt$3},producerRecomputeValue(e){if(e.value===wt$3)throw new Error("");let t=e.value;e.value=wt$3;let n=He$2(e),r,o=false;try{let i=e.source(),s=t!==Dt$2&&t!==be$1,a=s?{source:e.sourceValue,value:t}:void 0;r=e.computation(i,a),e.sourceValue=i,v$1(null),o=s&&r!==be$1&&e.equal(t,r);}catch(i){r=be$1,e.error=i;}finally{Je$3(e,n);}if(o){e.value=t;return}e.value=r,e.version++;}});function Bl$1(e){let t=v$1(null);try{return e()}finally{v$1(t);}}var uo$2="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",b=class extends Error{code;constructor(t,n){super(Wn$2(t,n)),this.code=t;}};function hg(e){return `NG0${Math.abs(e)}`}function Wn$2(e,t){return `${hg(e)}${t?": "+t:""}`}function A$1(e){for(let t in e)if(e[t]===A$1)return t;throw Error("")}function Gl$1(e,t){for(let n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n]);}function qn$2(e){if(typeof e=="string")return e;if(Array.isArray(e))return `[${e.map(qn$2).join(", ")}]`;if(e==null)return ""+e;let t=e.overriddenName||e.name;if(t)return `${t}`;let n=e.toString();if(n==null)return ""+n;let r=n.indexOf(`
`);return r>=0?n.slice(0,r):n}function fo$2(e,t){return e?t?`${e} ${t}`:e:t||""}var gg$1=A$1({__forward_ref__:A$1});function po$2(e){return e.__forward_ref__=po$2,e}function B$2(e){return ds$1(e)?e():e}function ds$1(e){return typeof e=="function"&&e.hasOwnProperty(gg$1)&&e.__forward_ref__===po$2}function te$1(e){return {token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function zl$1(e){return {providers:e.providers||[],imports:e.imports||[]}}function Gn$2(e){return yg(e,ho$2)}function mg(e){return Gn$2(e)!==null}function yg(e,t){return e.hasOwnProperty(t)&&e[t]||null}function vg(e){let t=e?.[ho$2]??null;return t||null}function es$2(e){return e&&e.hasOwnProperty(io$2)?e[io$2]:null}var ho$2=A$1({\u0275prov:A$1}),io$2=A$1({\u0275inj:A$1}),x=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,n){this._desc=t,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=te$1({token:this,providedIn:n.providedIn||"root",factory:n.factory}));}get multi(){return this}toString(){return `InjectionToken ${this._desc}`}};function fs$1(e){return e&&!!e.\u0275providers}var ps$1=A$1({\u0275cmp:A$1}),hs$1=A$1({\u0275dir:A$1}),gs$1=A$1({\u0275pipe:A$1}),ms$1=A$1({\u0275mod:A$1}),Hn$2=A$1({\u0275fac:A$1}),Nt$1=A$1({__NG_ELEMENT_ID__:A$1}),$l$1=A$1({__NG_ENV_ID__:A$1});function Ql$1(e){return mo$2(e),e[ms$1]||null}function rt$1(e){return mo$2(e),e[ps$1]||null}function go$2(e){return mo$2(e),e[hs$1]||null}function Zl$1(e){return mo$2(e),e[gs$1]||null}function mo$2(e,t){if(e==null)throw new b(-919,false)}function ce$2(e){return typeof e=="string"?e:e==null?"":String(e)}var Yl$1=A$1({ngErrorCode:A$1}),Ig=A$1({ngErrorMessage:A$1});A$1({ngTokenPath:A$1});function ys$1(e,t){return Kl$1("",-200)}function yo$1(e,t){throw new b(-201,false)}function Kl$1(e,t,n){let r=new b(t,e);return r[Yl$1]=t,r[Ig]=e,r}function Dg(e){return e[Yl$1]}var ts$1;function Jl$1(){return ts$1}function K$1(e){let t=ts$1;return ts$1=e,t}function vs$1(e,t,n){let r=Gn$2(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&8)return null;if(t!==void 0)return t;yo$1();}var nn$2=globalThis;var wg={},Ct$4=wg,Tg="__NG_DI_FLAG__",ns$1=class ns{injector;constructor(t){this.injector=t;}retrieve(t,n){let r=bt$2(n)||0;try{return this.injector.get(t,r&8?null:Ct$4,r)}catch(o){if(Xt$2(o))return o;throw o}}};function Cg(e,t=0){let n=ro$3();if(n===void 0)throw new b(-203,false);if(n===null)return vs$1(e,void 0,t);{let r=bg(t),o=n.retrieve(e,r);if(Xt$2(o)){if(r.optional)return null;throw o}return o}}function Me$3(e,t=0){return (Jl$1()||Cg)(B$2(e),t)}function T$1(e,t){return Me$3(e,bt$2(t))}function bt$2(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function bg(e){return {optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function rs$1(e){let t=[];for(let n=0;n<e.length;n++){let r=B$2(e[n]);if(Array.isArray(r)){if(r.length===0)throw new b(900,false);let o,i=0;for(let s=0;s<r.length;s++){let a=r[s],c=_g(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a;}t.push(Me$3(o,i));}else t.push(Me$3(r));}return t}function _g(e){return e[Tg]}function tt$3(e,t){let n=e.hasOwnProperty(Hn$2);return n?e[Hn$2]:null}function Xl$1(e,t,n){if(e.length!==t.length)return  false;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return  false}return  true}function eu$1(e){return e.flat(Number.POSITIVE_INFINITY)}function vo$2(e,t){e.forEach(n=>Array.isArray(n)?vo$2(n,t):t(n));}function Is$1(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n);}function zn$2(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function tu$1(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function nu$1(e,t,n,r){let o=e.length;if(o==t)e.push(n,r);else if(o===1)e.push(r,e[0]),e[0]=n;else {for(o--,e.push(e[o-1],e[o]);o>t;){let i=o-2;e[o]=e[i],o--;}e[t]=n,e[t+1]=r;}}function Io$2(e,t,n){let r=rn$2(e,t);return r>=0?e[r|1]=n:(r=~r,nu$1(e,r,t,n)),r}function Eo$2(e,t){let n=rn$2(e,t);if(n>=0)return e[n|1]}function rn$2(e,t){return Mg(e,t,1)}function Mg(e,t,n){let r=0,o=e.length>>n;for(;o!==r;){let i=r+(o-r>>1),s=e[i<<n];if(t===s)return i<<n;s>t?o=i:r=i+1;}return ~(o<<n)}var ot$1={},z=[],Qn$2=new x(""),Zn$2=new x("",-1),Es$1=new x(""),tn$2=class tn{get(t,n=Ct$4){if(n===Ct$4){let o=Kl$1("",-201);throw o.name="\u0275NotFound",o}return n}};function Ds$1(e){return {\u0275providers:e}}function ru$1(...e){return {\u0275providers:ws$1(true,e),\u0275fromNgModule:true}}function ws$1(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s);};return vo$2(t,s=>{let a=s;so$2(a,i,[],r)&&(o||=[],o.push(a));}),o!==void 0&&ou$1(o,i),n}function ou$1(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];Ts$1(o,i=>{t(i,r);});}}function so$2(e,t,n,r){if(e=B$2(e),!e)return  false;let o=null,i=es$2(e),s=!i&&rt$1(e);if(!i&&!s){let c=e.ngModule;if(i=es$2(c),i)o=c;else return  false}else {if(s&&!s.standalone)return  false;o=e;}let a=r.has(o);if(s){if(a)return  false;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)so$2(l,t,n,r);}}else if(i){if(i.imports!=null&&!a){r.add(o);let l;vo$2(i.imports,u=>{so$2(u,t,n,r)&&(l||=[],l.push(u));}),l!==void 0&&ou$1(l,t);}if(!a){let l=tt$3(o)||(()=>new o);t({provide:o,useFactory:l,deps:z},o),t({provide:Es$1,useValue:o,multi:true},o),t({provide:Qn$2,useValue:()=>Me$3(o),multi:true},o);}let c=i.providers;if(c!=null&&!a){let l=e;Ts$1(c,u=>{t(u,l);});}}else return  false;return o!==e&&e.providers!==void 0}function Ts$1(e,t){for(let n of e)fs$1(n)&&(n=n.\u0275providers),Array.isArray(n)?Ts$1(n,t):t(n);}var Ng=A$1({provide:String,useValue:A$1});function iu$1(e){return e!==null&&typeof e=="object"&&Ng in e}function Sg(e){return !!(e&&e.useExisting)}function xg(e){return !!(e&&e.useFactory)}function _t$1(e){return typeof e=="function"}function su$1(e){return !!e.useClass}var Cs$1=new x(""),oo$2={},Ul$1={},Xi$1;function on$2(){return Xi$1===void 0&&(Xi$1=new tn$2),Xi$1}var se$1=class se{},Mt$4=class Mt extends se$1{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=false;injectorDefTypes;constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,is$1(t,s=>this.processProvider(s)),this.records.set(Zn$2,en$2(void 0,this)),o.has("environment")&&this.records.set(se$1,en$2(void 0,this));let i=this.records.get(Cs$1);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Es$1,z,{self:true}));}retrieve(t,n){let r=bt$2(n)||0;try{return this.get(t,Ct$4,r)}catch(o){if(Xt$2(o))return o;throw o}}destroy(){Vn$2(this),this._destroyed=true;let t=v$1(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r();}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),v$1(t);}}onDestroy(t){return Vn$2(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){Vn$2(this);let n=_e(this),r=K$1(void 0);try{return t()}finally{_e(n),K$1(r);}}get(t,n=Ct$4,r){if(Vn$2(this),t.hasOwnProperty($l$1))return t[$l$1](this);let o=bt$2(r),s=_e(this),a=K$1(void 0);try{if(!(o&4)){let l=this.records.get(t);if(l===void 0){let u=Pg(t)&&Gn$2(t);u&&this.injectableDefInScope(u)?l=en$2(os$1(t),oo$2):l=null,this.records.set(t,l);}if(l!=null)return this.hydrate(t,l,o)}let c=o&2?on$2():this.parent;return n=o&8&&n===Ct$4?null:n,c.get(t,n)}catch(c){let l=Dg(c);throw l===-200||l===-201?new b(l,null):c}finally{K$1(a),_e(s);}}resolveInjectorInitializers(){let t=v$1(null),n=_e(this),r=K$1(void 0);try{let i=this.get(Qn$2,z,{self:!0});for(let s of i)s();}finally{_e(n),K$1(r),v$1(t);}}toString(){return "R3Injector[...]"}processProvider(t){t=B$2(t);let n=_t$1(t)?t:B$2(t&&t.provide),r=Rg(t);if(!_t$1(t)&&t.multi===true){let o=this.records.get(n);o||(o=en$2(void 0,oo$2,true),o.factory=()=>rs$1(o.multi),this.records.set(n,o)),n=t,o.multi.push(t);}this.records.set(n,r);}hydrate(t,n,r){let o=v$1(null);try{if(n.value===Ul$1)throw ys$1("");return n.value===oo$2&&(n.value=Ul$1,n.value=n.factory(void 0,r)),typeof n.value=="object"&&n.value&&Og(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{v$1(o);}}injectableDefInScope(t){if(!t.providedIn)return  false;let n=B$2(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1);}};function os$1(e){let t=Gn$2(e),n=t!==null?t.factory:tt$3(e);if(n!==null)return n;if(e instanceof x)throw new b(-204,false);if(e instanceof Function)return Ag(e);throw new b(-204,false)}function Ag(e){if(e.length>0)throw new b(-204,false);let n=vg(e);return n!==null?()=>n.factory(e):()=>new e}function Rg(e){if(iu$1(e))return en$2(void 0,e.useValue);{let t=bs$1(e);return en$2(t,oo$2)}}function bs$1(e,t,n){let r;if(_t$1(e)){let o=B$2(e);return tt$3(o)||os$1(o)}else if(iu$1(e))r=()=>B$2(e.useValue);else if(xg(e))r=()=>e.useFactory(...rs$1(e.deps||[]));else if(Sg(e))r=(o,i)=>Me$3(B$2(e.useExisting),i!==void 0&&i&8?8:void 0);else {let o=B$2(e&&(e.useClass||e.provide));if(kg(e))r=()=>new o(...rs$1(e.deps));else return tt$3(o)||os$1(o)}return r}function Vn$2(e){if(e.destroyed)throw new b(-205,false)}function en$2(e,t,n=false){return {factory:e,value:t,multi:n?[]:void 0}}function kg(e){return !!e.deps}function Og(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function Pg(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function is$1(e,t){for(let n of e)Array.isArray(n)?is$1(n,t):n&&fs$1(n)?is$1(n.\u0275providers,t):t(n);}function Do$2(e,t){let n;e instanceof Mt$4?(Vn$2(e),n=e):n=new ns$1(e);let o=_e(n),i=K$1(void 0);try{return t()}finally{_e(o),K$1(i);}}function au$1(){return Jl$1()!==void 0||ro$3()!=null}var me$2=0,y$1=1,I=2,$$2=3,le$1=4,Q$3=5,St$4=6,sn$2=7,V$2=8,xe$1=9,ye=10,O$1=11,an$2=12,_s$1=13,it$3=14,Z$1=15,st=16,xt$3=17,Ae$1=18,Re$1=19,Ms$1=20,$e$1=21,wo$2=22,nt$4=23,ne$1=24,At$4=25,ke$2=26,L=27,cu$1=1,Ns$1=6,at=7,Yn$2=8,Rt$3=9,F$1=10;function qe$3(e){return Array.isArray(e)&&typeof e[cu$1]=="object"}function ue$2(e){return Array.isArray(e)&&e[cu$1]===true}function Ss$1(e){return (e.flags&4)!==0}function Ge$2(e){return e.componentOffset>-1}function cn$2(e){return (e.flags&1)===1}function ve(e){return !!e.template}function ln$2(e){return (e[I]&512)!==0}function kt$3(e){return (e[I]&256)===256}var xs$1="svg",lu$1="math";function de$1(e){for(;Array.isArray(e);)e=e[me$2];return e}function As$1(e,t){return de$1(t[e])}function fe$1(e,t){return de$1(t[e.index])}function To$2(e,t){return e.data[t]}function Co$2(e,t){return e[t]}function Rs$1(e,t,n,r){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=r;}function pe$2(e,t){let n=t[e];return qe$3(n)?n:n[me$2]}function uu$1(e){return (e[I]&4)===4}function bo$1(e){return (e[I]&128)===128}function du$1(e){return ue$2(e[$$2])}function re$2(e,t){return t==null?null:e[t]}function ks$1(e){e[xt$3]=0;}function Os$1(e){e[I]&1024||(e[I]|=1024,bo$1(e)&&Ot$2(e));}function fu$1(e,t){for(;e>0;)t=t[it$3],e--;return t}function Kn$2(e){return !!(e[I]&9216||e[ne$1]?.dirty)}function _o$1(e){e[ye].changeDetectionScheduler?.notify(8),e[I]&64&&(e[I]|=1024),Kn$2(e)&&Ot$2(e);}function Ot$2(e){e[ye].changeDetectionScheduler?.notify(0);let t=Ue$3(e);for(;t!==null&&!(t[I]&8192||(t[I]|=8192,!bo$1(t)));)t=Ue$3(t);}function Mo$2(e,t){if(kt$3(e))throw new b(911,false);e[$e$1]===null&&(e[$e$1]=[]),e[$e$1].push(t);}function pu$1(e,t){if(e[$e$1]===null)return;let n=e[$e$1].indexOf(t);n!==-1&&e[$e$1].splice(n,1);}function Ue$3(e){let t=e[$$2];return ue$2(t)?t[$$2]:t}function Ps$1(e){return e[sn$2]??=[]}function Ls$1(e){return e.cleanup??=[]}function hu$1(e,t,n,r){let o=Ps$1(t);o.push(n),e.firstCreatePass&&Ls$1(e).push(r,o.length-1);}var C={lFrame:Mu$1(null),bindingsEnabled:true,skipHydrationRootTNode:null};var ss$1=false;function gu$1(){return C.lFrame.elementDepthCount}function mu$1(){C.lFrame.elementDepthCount++;}function Fs$1(){C.lFrame.elementDepthCount--;}function No$1(){return C.bindingsEnabled}function js$1(){return C.skipHydrationRootTNode!==null}function Vs$1(e){return C.skipHydrationRootTNode===e}function Hs$1(){C.skipHydrationRootTNode=null;}function m$1(){return C.lFrame.lView}function P$1(){return C.lFrame.tView}function yu$1(e){return C.lFrame.contextLView=e,e[V$2]}function vu$1(e){return C.lFrame.contextLView=null,e}function H$1(){let e=Bs$1();for(;e!==null&&e.type===64;)e=e.parent;return e}function Bs$1(){return C.lFrame.currentTNode}function Iu$1(){let e=C.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function un$2(e,t){let n=C.lFrame;n.currentTNode=e,n.isParent=t;}function $s$1(){return C.lFrame.isParent}function Us$1(){C.lFrame.isParent=false;}function Eu$1(){return C.lFrame.contextLView}function Ws$1(){return ss$1}function Bn$1(e){let t=ss$1;return ss$1=e,t}function Jn$2(){let e=C.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function qs$1(){return C.lFrame.bindingIndex}function Du$1(e){return C.lFrame.bindingIndex=e}function ze$3(){return C.lFrame.bindingIndex++}function Xn$2(e){let t=C.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function wu$1(){return C.lFrame.inI18n}function Tu$1(e,t){let n=C.lFrame;n.bindingIndex=n.bindingRootIndex=e,So$2(t);}function Cu$1(){return C.lFrame.currentDirectiveIndex}function So$2(e){C.lFrame.currentDirectiveIndex=e;}function bu$1(e){let t=C.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function xo$2(){return C.lFrame.currentQueryIndex}function er$2(e){C.lFrame.currentQueryIndex=e;}function Lg(e){let t=e[y$1];return t.type===2?t.declTNode:t.type===1?e[Q$3]:null}function Gs$1(e,t,n){if(n&4){let o=t,i=e;for(;o=o.parent,o===null&&!(n&1);)if(o=Lg(i),o===null||(i=i[it$3],o.type&10))break;if(o===null)return  false;t=o,e=i;}let r=C.lFrame=_u$1();return r.currentTNode=t,r.lView=e,true}function Ao$2(e){let t=_u$1(),n=e[y$1];C.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=false;}function _u$1(){let e=C.lFrame,t=e===null?null:e.child;return t===null?Mu$1(e):t}function Mu$1(e){let t={currentTNode:null,isParent:true,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:false};return e!==null&&(e.child=t),t}function Nu$1(){let e=C.lFrame;return C.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var zs$1=Nu$1;function Ro$2(){let e=Nu$1();e.isParent=true,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0;}function Su$1(e){return (C.lFrame.contextLView=fu$1(e,C.lFrame.contextLView))[V$2]}function Ie(){return C.lFrame.selectedIndex}function ct$1(e){C.lFrame.selectedIndex=e;}function dn$1(){let e=C.lFrame;return To$2(e.tView,e.selectedIndex)}function xu$1(){C.lFrame.currentNamespace=xs$1;}function Au$1(){Fg();}function Fg(){C.lFrame.currentNamespace=null;}function Qs$1(){return C.lFrame.currentNamespace}var Ru$1=true;function ko$2(){return Ru$1}function tr$2(e){Ru$1=e;}function ku$1(){let e,t;return {promise:new Promise((r,o)=>{e=r,t=o;}),resolve:e,reject:t}}function as$1(e,t=null,n=null,r){let o=Zs$1(e,t,n);return o.resolveInjectorInitializers(),o}function Zs$1(e,t=null,n=null,r,o=new Set){let i=[n||z,ru$1(e)];return new Mt$4(i,t||on$2(),null,o)}var ae$1=class e{static THROW_IF_NOT_FOUND=Ct$4;static NULL=new tn$2;static create(t,n){if(Array.isArray(t))return as$1({name:""},n,t);{let r=t.name??"";return as$1({name:r},t.parent,t.providers)}}static \u0275prov=te$1({token:e,providedIn:"any",factory:()=>Me$3(Zn$2)});static __NG_ELEMENT_ID__=-1},nr$2=new x(""),Oe$1=(()=>{class e{static __NG_ELEMENT_ID__=jg;static __NG_ENV_ID__=n=>n}return e})(),ao$2=class ao extends Oe$1{_lView;constructor(t){super(),this._lView=t;}get destroyed(){return kt$3(this._lView)}onDestroy(t){let n=this._lView;return Mo$2(n,t),()=>pu$1(n,t)}};function jg(){return new ao$2(m$1())}var Ou$1=false,Pu$1=new x(""),Pt$3=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=false;pendingTask=new Sn(false);debugTaskTracker=T$1(Pu$1,{optional:true});get hasPendingTasks(){return this.destroyed?false:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new N$1(n=>{n.next(false),n.complete();}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(true);let n=this.taskId++;return this.pendingTasks.add(n),this.debugTaskTracker?.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.debugTaskTracker?.remove(n),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(false);}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(false),this.destroyed=true,this.pendingTask.unsubscribe();}static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>new e})}return e})(),cs$1=class cs extends ee$1{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=false){super(),this.__isAsync=t,au$1()&&(this.destroyRef=T$1(Oe$1,{optional:true})??void 0,this.pendingTasks=T$1(Pt$3,{optional:true})??void 0);}emit(t){let n=v$1(null);try{super.next(t);}finally{v$1(n);}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c);}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof G&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{t(n);}finally{r!==void 0&&this.pendingTasks?.remove(r);}});}}},Be$2=cs$1;function co$2(...e){}function Ys$1(e){let t,n;function r(){e=co$2;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t);}catch(o){}}return t=setTimeout(()=>{e(),r();}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r();})),()=>r()}function Lu$1(e){return queueMicrotask(()=>e()),()=>{e=co$2;}}var Ks$1="isAngularZone",$n$1=Ks$1+"_ID",Vg=0,Ne$1=class e{hasPendingMacrotasks=false;hasPendingMicrotasks=false;isStable=true;onUnstable=new Be$2(false);onMicrotaskEmpty=new Be$2(false);onStable=new Be$2(false);onError=new Be$2(false);constructor(t){let{enableLongStackTrace:n=false,shouldCoalesceEventChangeDetection:r=false,shouldCoalesceRunChangeDetection:o=false,scheduleInRootZone:i=Ou$1}=t;if(typeof Zone>"u")throw new b(908,false);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=false,s.scheduleInRootZone=i,$g(s);}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Ks$1)===true}static assertInAngularZone(){if(!e.isInAngularZone())throw new b(909,false)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new b(909,false)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,Hg,co$2,co$2);try{return i.runTask(s,n,r)}finally{i.cancelTask(s);}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},Hg={};function Js$1(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null);}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null));}finally{e.isStable=true;}}}function Bg(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=true;function t(){Ys$1(()=>{e.callbackScheduled=false,ls$1(e),e.isCheckStableRunning=true,Js$1(e),e.isCheckStableRunning=false;});}e.scheduleInRootZone?Zone.root.run(()=>{t();}):e._outer.run(()=>{t();}),ls$1(e);}function $g(e){let t=()=>{Bg(e);},n=Vg++;e._inner=e._inner.fork({name:"angular",properties:{[Ks$1]:true,[$n$1]:n,[$n$1+n]:true},onInvokeTask:(r,o,i,s,a,c)=>{if(Ug(c))return r.invokeTask(i,s,a,c);try{return Wl$1(e),r.invokeTask(i,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),ql$1(e);}},onInvoke:(r,o,i,s,a,c,l)=>{try{return Wl$1(e),r.invoke(i,s,a,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Wg(c)&&t(),ql$1(e);}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,ls$1(e),Js$1(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask));},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),false)});}function ls$1(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===true?e.hasPendingMicrotasks=true:e.hasPendingMicrotasks=false;}function Wl$1(e){e._nesting++,e.isStable&&(e.isStable=false,e.onUnstable.emit(null));}function ql$1(e){e._nesting--,Js$1(e);}var Un$2=class Un{hasPendingMicrotasks=false;hasPendingMacrotasks=false;isStable=true;onUnstable=new Be$2;onMicrotaskEmpty=new Be$2;onStable=new Be$2;onError=new Be$2;run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function Ug(e){return Fu$1(e,"__ignore_ng_zone__")}function Wg(e){return Fu$1(e,"__scheduler_tick__")}function Fu$1(e,t){return !Array.isArray(e)||e.length!==1?false:e[0]?.data?.[t]===true}var We$1=class We{_console=console;handleError(t){this._console.error("ERROR",t);}},Lt$2=new x("",{factory:()=>{let e=T$1(Ne$1),t=T$1(se$1),n;return r=>{e.runOutsideAngular(()=>{t.destroyed&&!n?setTimeout(()=>{throw r}):(n??=t.get(We$1),n.handleError(r));});}}}),ju={provide:Qn$2,useValue:()=>{T$1(We$1,{optional:true});},multi:true};function Pe$2(e,t){let [n,r,o]=Qi$2(e,t?.equal),i=n;i[j$1];return i.set=r,i.update=o,i.asReadonly=fn$1.bind(i),i}function fn$1(){let e=this[j$1];if(e.readonlyFn===void 0){let t=()=>this();t[j$1]=e,e.readonlyFn=t;}return e.readonlyFn}var Xs$1=new x("",{factory:()=>qg}),qg="ng";var Vu=new x(""),Gg=new x("",{providedIn:"platform",factory:()=>"unknown"}),zg=new x(""),Qg=new x("",{factory:()=>T$1(nr$2).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Oo$2=(()=>{class e{static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>{let n=new e;return n.store=Hu(T$1(nr$2),T$1(Xs$1)),n}});store={};onSerializeCallbacks={};get(n,r){return this.store[n]!==void 0?this.store[n]:r}set(n,r){this.store[n]=r;}remove(n){delete this.store[n];}hasKey(n){return this.store.hasOwnProperty(n)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(n,r){this.onSerializeCallbacks[n]=r;}toJson(){for(let n in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(n))try{this.store[n]=this.onSerializeCallbacks[n]();}catch(r){console.warn("Exception in onSerialize callback: ",r);}return JSON.stringify(this.store).replace(/</g,"\\u003C").replace(/\//g,"\\u002F")}}return e})();function Hu(e,t){let n=e.getElementById(t+"-state");if(n?.tagName==="SCRIPT"&&n.textContent)try{return JSON.parse(n.textContent)}catch(r){console.warn("Exception while restoring TransferState for app "+t,r);}return {}}var pn$1=(()=>{class e{view;node;constructor(n,r){this.view=n,this.node=r;}static __NG_ELEMENT_ID__=Zg}return e})();function Zg(){return new pn$1(m$1(),H$1())}var Se$2=class Se{},rr$2=new x("",{factory:()=>true});var ea$3=new x(""),Po$2=(()=>{class e{static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>new us$1})}return e})(),us$1=class us{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t);}schedule(t){t.dirty&&this.dirtyEffectCount++;}remove(t){let n=t.zone,r=this.queues.get(n);r.has(t)&&(r.delete(t),t.dirty&&this.dirtyEffectCount--);}enqueue(t){let n=t.zone;this.queues.has(n)||this.queues.set(n,new Set);let r=this.queues.get(n);r.has(t)||r.add(t);}flush(){for(;this.dirtyEffectCount>0;){let t=false;for(let[n,r]of this.queues)n===null?t||=this.flushQueue(r):t||=n.run(()=>this.flushQueue(r));t||(this.dirtyEffectCount=0);}}flushQueue(t){let n=false;for(let r of t)r.dirty&&(this.dirtyEffectCount--,n=true,r.run());return n}},lo$2=class lo{[j$1];constructor(t){this[j$1]=t;}destroy(){this[j$1].destroy();}};function ta$3(e,t){let n=t?.injector??T$1(ae$1),r=t?.manualCleanup!==true?n.get(Oe$1):null,o,i=n.get(pn$1,null,{optional:true}),s=n.get(Se$2);return i!==null?(o=Jg(i.view,s,e),r instanceof ao$2&&r._lView===i.view&&(r=null)):o=Xg(e,n.get(Po$2),s),o.injector=n,r!==null&&(o.onDestroyFns=[r.onDestroy(()=>o.destroy())]),new lo$2(o)}var Bu=x$1(w$2({},Zi$2),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Bn$1(false);try{Yi$1(this);}finally{Bn$1(e);}},cleanup(){if(!this.cleanupFns?.length)return;let e=v$1(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()();}finally{this.cleanupFns=[],v$1(e);}}}),Yg=x$1(w$2({},Bu),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12);},destroy(){if(Xe$2(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this);}}),Kg=x$1(w$2({},Bu),{consumerMarkedDirty(){this.view[I]|=8192,Ot$2(this.view),this.notifier.notify(13);},destroy(){if(Xe$2(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[nt$4]?.delete(this);}});function Jg(e,t,n){let r=Object.create(Kg);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=t,r.fn=$u(r,n),e[nt$4]??=new Set,e[nt$4].add(r),r.consumerMarkedDirty(r),r}function Xg(e,t,n){let r=Object.create(Yg);return r.fn=$u(r,e),r.scheduler=t,r.notifier=n,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function $u(e,t){return ()=>{t(n=>(e.cleanupFns??=[]).push(n));}}function or$2(e){return typeof e=="function"&&e[j$1]!==void 0}function Lo$2(e){return or$2(e)&&typeof e.set=="function"}var Fo$2=(()=>{class e{internalPendingTasks=T$1(Pt$3);scheduler=T$1(Se$2);errorHandler=T$1(Lt$2);add(){let n=this.internalPendingTasks.add();return ()=>{this.internalPendingTasks.has(n)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(n));}}run(n){let r=this.add();try{n().catch(this.errorHandler).finally(r);}catch(o){this.errorHandler(o),r();}}static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>new e})}return e})();function mr$2(e){return {toString:e}.toString()}var S=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(S||{}),Go$2=class Go{previousValue;currentValue;firstChange;constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r;}isFirstChange(){return this.firstChange}};function Nd$1(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r;}var Sd$1=null,lm=(()=>{Sd$1=Uu;let e=()=>Uu;return e.ngInherit=true,e})();function um(){return Sd$1}function Uu(e){return e.type.prototype.ngOnChanges&&(e.setInput=fm),dm}function dm(){let e=xd$1(this),t=e?.current;if(t){let n=e.previous;if(n===ot$1)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t);}}function fm(e,t,n,r,o){let i=this.declaredInputs[r],s=xd$1(e)||pm(e,{previous:ot$1,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[i];a[i]=new Go$2(l&&l.currentValue,n,c===ot$1),Nd$1(e,t,o,n);}var fa$2="__ngSimpleChanges__";function xd$1(e){return Object.hasOwn(e,fa$2)&&e[fa$2]||null}function pm(e,t){return e[fa$2]=t}var Wu=[];var R$1=function(e,t=null,n){for(let r=0;r<Wu.length;r++){let o=Wu[r];o(e,t,n);}};function hm(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=um()(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s);}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i));}function Ad$1(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),l&&((e.viewHooks??=[]).push(n,l),(e.viewCheckHooks??=[]).push(n,l)),u!=null&&(e.destroyHooks??=[]).push(n,u);}}function $o$2(e,t,n){Rd$1(e,t,3,n);}function Uo$3(e,t,n,r){(e[I]&3)===n&&Rd$1(e,t,n,r);}function na$3(e,t){let n=e[I];(n&3)===t&&(n&=16383,n+=1,e[I]=n);}function Rd$1(e,t,n,r){let o=r!==void 0?e[xt$3]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[xt$3]+=65536),(a<i||i==-1)&&(gm(e,n,t,c),e[xt$3]=(e[xt$3]&4294901760)+c+2),c++;}function qu(e,t){R$1(S.LifecycleHookStart,e,t);let n=v$1(null);try{t.call(e);}finally{v$1(n),R$1(S.LifecycleHookEnd,e,t);}}function gm(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[I]>>14<e[xt$3]>>16&&(e[I]&3)===t&&(e[I]+=16384,qu(a,i)):qu(a,i);}var gn$1=-1,jt$2=class jt{factory;name;injectImpl;resolving=false;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,n,r,o){this.factory=t,this.name=o,this.canSeeViewProviders=n,this.injectImpl=r;}};function mm(e){return (e.flags&8)!==0}function ym(e){return (e.flags&16)!==0}function vm(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i);}else {let i=o,s=n[++r];Im(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++;}}return r}function kd$1(e){return e===3||e===4||e===6}function Im(e){return e.charCodeAt(0)===64}function mn$2(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else {let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?Gu(e,n,o,null,t[++r]):Gu(e,n,o,null,null));}}return e}function Gu(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){o!==null&&(e[i+1]=o);return}i++,o!==null&&i++;}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),o!==null&&e.splice(i++,0,o);}function Od$1(e){return e!==gn$1}function zo$3(e){return e&32767}function Em(e){return e>>16}function Qo$2(e,t){let n=Em(e),r=t;for(;n>0;)r=r[it$3],n--;return r}var pa$3=true;function Zo$2(e){let t=pa$3;return pa$3=e,t}var Dm=256,Pd$1=Dm-1,Ld$1=5,wm=0,Le$2={};function Tm(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty(Nt$1)&&(r=n[Nt$1]),r==null&&(r=n[Nt$1]=wm++);let o=r&Pd$1,i=1<<o;t.data[e+(o>>Ld$1)]|=i;}function Yo$2(e,t){let n=Fd$1(e,t);if(n!==-1)return n;let r=t[y$1];r.firstCreatePass&&(e.injectorIndex=t.length,ra$3(r.data,e),ra$3(t,null),ra$3(r.blueprint,null));let o=Qa$2(e,t),i=e.injectorIndex;if(Od$1(o)){let s=zo$3(o),a=Qo$2(o,t),c=a[y$1].data;for(let l=0;l<8;l++)t[i+l]=a[s+l]|c[s+l];}return t[i+8]=o,i}function ra$3(e,t){e.push(0,0,0,0,0,0,0,0,t);}function Fd$1(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function Qa$2(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=$d$1(o),r===null)return gn$1;if(n++,o=o[it$3],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return gn$1}function ha$3(e,t,n){Tm(e,t,n);}function Cm(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(kd$1(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else {if(i===t)return n[o+1];o=o+2;}}}return null}function jd$1(e,t,n){if(n&8||e!==void 0)return e;yo$1();}function Vd$1(e,t,n,r){if(n&8&&r===void 0&&(r=null),(n&3)===0){let o=e[xe$1],i=K$1(void 0);try{return o?o.get(t,r,n&8):vs$1(t,r,n&8)}finally{K$1(i);}}return jd$1(r,t,n)}function Hd$1(e,t,n,r=0,o){if(e!==null){if(t[I]&2048&&!(r&2)){let s=Sm(e,t,n,r,Le$2);if(s!==Le$2)return s}let i=Bd$1(e,t,n,r,Le$2);if(i!==Le$2)return i}return Vd$1(t,n,r,o)}function Bd$1(e,t,n,r,o){let i=_m(n);if(typeof i=="function"){if(!Gs$1(t,e,r))return r&1?jd$1(o,n,r):Vd$1(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&8))yo$1(n);else return s}finally{zs$1();}}else if(typeof i=="number"){let s=null,a=Fd$1(e,t),c=gn$1,l=r&1?t[Z$1][Q$3]:null;for((a===-1||r&4)&&(c=a===-1?Qa$2(e,t):t[a+8],c===gn$1||!Qu(r,false)?a=-1:(s=t[y$1],a=zo$3(c),t=Qo$2(c,t)));a!==-1;){let u=t[y$1];if(zu(i,a,u.data)){let d=bm(a,t,n,s,r,l);if(d!==Le$2)return d}c=t[a+8],c!==gn$1&&Qu(r,t[y$1].data[a+8]===l)&&zu(i,a,t)?(s=u,a=zo$3(c),t=Qo$2(c,t)):a=-1;}}return o}function bm(e,t,n,r,o,i){let s=t[y$1],a=s.data[e+8],c=r==null?Ge$2(a)&&pa$3:r!=s&&(a.type&3)!==0,l=o&1&&i===a,u=Wo$1(a,s,n,c,l);return u!==null?cr$2(t,s,u,a,o):Le$2}function Wo$1(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,l=e.directiveEnd,u=i>>20,d=r?a:a+u,p=o?a+u:l;for(let f=d;f<p;f++){let h=s[f];if(f<c&&n===h||f>=c&&h.type===n)return f}if(o){let f=s[c];if(f&&ve(f)&&f.type===n)return c}return null}function cr$2(e,t,n,r,o){let i=e[n],s=t.data;if(i instanceof jt$2){let a=i;if(a.resolving)throw ys$1();let c=Zo$2(a.canSeeViewProviders);a.resolving=true;s[n].type||s[n];let d=a.injectImpl?K$1(a.injectImpl):null;Gs$1(e,r,0);try{i=e[n]=a.factory(void 0,o,s,e,r),t.firstCreatePass&&n>=r.directiveStart&&hm(n,s[n],t);}finally{d!==null&&K$1(d),Zo$2(c),a.resolving=false,zs$1();}}return i}function _m(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(Nt$1)?e[Nt$1]:void 0;return typeof t=="number"?t>=0?t&Pd$1:Mm:t}function zu(e,t,n){let r=1<<e;return !!(n[t+(e>>Ld$1)]&r)}function Qu(e,t){return !(e&2)&&!(e&1&&t)}var lt$2=class lt{_tNode;_lView;constructor(t,n){this._tNode=t,this._lView=n;}get(t,n,r){return Hd$1(this._tNode,this._lView,t,bt$2(r),n)}};function Mm(){return new lt$2(H$1(),m$1())}function Nm(e){return mr$2(()=>{let t=e.prototype.constructor,n=t[Hn$2]||ga$3(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[Hn$2]||ga$3(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o);}return i=>new i})}function ga$3(e){return ds$1(e)?()=>{let t=ga$3(B$2(e));return t&&t()}:tt$3(e)}function Sm(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[I]&2048&&!ln$2(s);){let a=Bd$1(i,s,n,r|2,Le$2);if(a!==Le$2)return a;let c=i.parent;if(!c){let l=s[Ms$1];if(l){let u=l.get(n,Le$2,r&-5);if(u!==Le$2)return u}c=$d$1(s),s=s[it$3];}i=c;}return o}function $d$1(e){let t=e[y$1],n=t.type;return n===2?t.declTNode:n===1?e[Q$3]:null}function Ud$1(e){return Cm(H$1(),e)}function yr$2(e){return {token:e.token,providedIn:e.autoProvided===false?null:"root",factory:e.factory,value:void 0}}function xm(){return Cn(H$1(),m$1())}function Cn(e,t){return new vr$2(fe$1(e,t))}var vr$2=(()=>{class e{nativeElement;constructor(n){this.nativeElement=n;}static __NG_ELEMENT_ID__=xm}return e})();function Wd$1(e){return e instanceof vr$2?e.nativeElement:e}function Am(){return this._results[Symbol.iterator]()}var Ko$2=class Ko{_emitDistinctChangesOnly;dirty=true;_onDirty=void 0;_results=[];_changesDetected=false;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new ee$1}constructor(t=false){this._emitDistinctChangesOnly=t;}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t);}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=false;let r=eu$1(t);(this._changesDetected=!Xl$1(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0]);}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this);}onDirty(t){this._onDirty=t;}setDirty(){this.dirty=true,this._onDirty?.();}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe());}[Symbol.iterator]=Am};function qd$1(e){return (e.flags&128)===128}var Za$2=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(Za$2||{}),Gd$1=new Map,Rm=0;function km(){return Rm++}function Om(e){Gd$1.set(e[Re$1],e);}function ma$3(e){Gd$1.delete(e[Re$1]);}var Zu="__ngContext__";function yn$1(e,t){qe$3(t)?(e[Zu]=t[Re$1],Om(t)):e[Zu]=t;}function zd$1(e){return Zd$1(e[an$2])}function Qd$1(e){return Zd$1(e[le$1])}function Zd$1(e){for(;e!==null&&!ue$2(e);)e=e[le$1];return e}var ya$2;function Pm(e){ya$2=e;}function Ya$3(){if(ya$2!==void 0)return ya$2;if(typeof document<"u")return document;throw new b(210,false)}var Yd$1="r";var Kd$1="di";var Jd$1=false,Xd$1=new x("",{factory:()=>Jd$1});var Yu=new WeakMap;function Lm(e,t){if(e==null||typeof e!="object")return;let n=Yu.get(e);n||(n=new WeakSet,Yu.set(e,n)),n.add(t);}function hi$1(e){return (e.flags&32)===32}var Vm=()=>null;function ef(e,t,n=false){return Vm()}function tf(e,t){let n=e.contentQueries;if(n!==null){let r=v$1(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];er$2(i),a.contentQueries(2,t[s],s);}}}finally{v$1(r);}}}function va$3(e,t,n){er$2(0);let r=v$1(null);try{t(e,n);}finally{v$1(r);}}function Ka$3(e,t,n){if(Ss$1(t)){let r=v$1(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s);}}}finally{v$1(r);}}}var Vt=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(Vt||{});var jo$3;function Hm(){if(jo$3===void 0&&(jo$3=null,nn$2.trustedTypes))try{jo$3=nn$2.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e});}catch(e){}return jo$3}function gi$3(e){return Hm()?.createHTML(e)||e}var Vo$1;function nf(){if(Vo$1===void 0&&(Vo$1=null,nn$2.trustedTypes))try{Vo$1=nn$2.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e});}catch(e){}return Vo$1}function Ku(e){return nf()?.createHTML(e)||e}function Ju(e){return nf()?.createScriptURL(e)||e}var Qe$2=class Qe{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t;}toString(){return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${uo$2})`}},Ia$3=class Ia extends Qe$2{getTypeName(){return "HTML"}},Ea$3=class Ea extends Qe$2{getTypeName(){return "Style"}},Da$3=class Da extends Qe$2{getTypeName(){return "Script"}},wa$3=class wa extends Qe$2{getTypeName(){return "URL"}},Ta$3=class Ta extends Qe$2{getTypeName(){return "ResourceURL"}};function bn$1(e){return e instanceof Qe$2?e.changingThisBreaksApplicationSecurity:e}function mi$1(e,t){let n=rf(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return  true;throw new Error(`Required a safe ${t}, got a ${n} (see ${uo$2})`)}return n===t}function rf(e){return e instanceof Qe$2&&e.getTypeName()||null}function Bm(e){return new Ia$3(e)}function $m(e){return new Ea$3(e)}function Um(e){return new Da$3(e)}function Wm(e){return new wa$3(e)}function qm(e){return new Ta$3(e)}function Gm(e){let t=new ba$3(e);return zm()?new Ca$3(t):t}var Ca$3=class Ca{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t;}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(gi$3(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch(n){return null}}},ba$3=class ba{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=gi$3(t),n}};function zm(){try{return !!new window.DOMParser().parseFromString(gi$3(""),"text/html")}catch(e){return  false}}var Qm=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Ja$2(e){return e=String(e),e.match(Qm)?e:"unsafe:"+e}function Ze$2(e){let t={};for(let n of e.split(","))t[n]=true;return t}function Ir$2(...e){let t={};for(let n of e)for(let r in n)n.hasOwnProperty(r)&&(t[r]=true);return t}var of=Ze$2("area,br,col,hr,img,wbr"),sf=Ze$2("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),af=Ze$2("rp,rt"),Zm=Ir$2(af,sf),Ym=Ir$2(sf,Ze$2("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),Km=Ir$2(af,Ze$2("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Xu=Ir$2(of,Ym,Km,Zm),cf=Ze$2("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),Jm=Ze$2("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),Xm=Ze$2("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),ey=Ir$2(cf,Jm,Xm),ty=Ze$2("script,style,template"),_a$2=class _a{sanitizedSomething=false;buf=[];sanitizeChildren(t){let n=t.firstChild,r=true,o=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?r=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=true,r&&n.firstChild){o.push(n),n=oy(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let i=ry(n);if(i){n=i;break}n=o.pop();}}return this.buf.join("")}startElement(t){let n=ed$1(t).toLowerCase();if(!Xu.hasOwnProperty(n))return this.sanitizedSomething=true,!ty.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let r=t.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),s=i.name,a=s.toLowerCase();if(!ey.hasOwnProperty(a)){this.sanitizedSomething=true;continue}let c=i.value;cf[a]&&(c=Ja$2(c)),this.buf.push(" ",s,'="',td$1(c),'"');}return this.buf.push(">"),true}endElement(t){let n=ed$1(t).toLowerCase();Xu.hasOwnProperty(n)&&!of.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"));}chars(t){this.buf.push(td$1(t));}};function ny(e,t){return (e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function ry(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw lf(t);return t}function oy(e){let t=e.firstChild;if(t&&ny(e,t))throw lf(t);return t}function ed$1(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function lf(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var iy=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,sy=/([^\#-~ |!])/g;function td$1(e){return e.replace(/&/g,"&amp;").replace(iy,function(t){let n=t.charCodeAt(0),r=t.charCodeAt(1);return "&#"+((n-55296)*1024+(r-56320)+65536)+";"}).replace(sy,function(t){return "&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Ho$3;function uf(e,t){let n=null;try{Ho$3=Ho$3||Gm(e);let r=t?String(t):"";n=Ho$3.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=n.innerHTML,n=Ho$3.getInertBodyElement(r);}while(r!==i);let a=new _a$2().sanitizeChildren(nd$1(n)||n);return gi$3(a)}finally{if(n){let r=nd$1(n)||n;for(;r.firstChild;)r.firstChild.remove();}}}function nd$1(e){return "content"in e&&ay(e)?e.content:null}function ay(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var cy=/^>|^->|<!--|-->|--!>|<!-$/g,ly=/(<|>)/g,uy="\u200B$1\u200B";function dy(e){return e.replace(cy,t=>t.replace(ly,uy))}function fy(e,t){return e.createText(t)}function py(e,t,n){e.setValue(t,n);}function hy(e,t){return e.createComment(dy(t))}function df(e,t,n){return e.createElement(t,n)}function Jo$2(e,t,n,r,o){e.insertBefore(t,n,r,o);}function ff(e,t,n){e.appendChild(t,n);}function rd$1(e,t,n,r,o){r!==null?Jo$2(e,t,n,r,o):ff(e,t,n);}function pf(e,t,n,r){e.removeChild(null,t,n,r);}function gy(e,t,n){e.setAttribute(t,"style",n);}function my(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n);}function hf(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&vm(e,t,r),o!==null&&my(e,t,o),i!==null&&gy(e,t,i);}var Er$2=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e[e.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",e})(Er$2||{});function yy(e){let t=Xa$3();return t?Ku(t.sanitize(Er$2.HTML,e)||""):mi$1(e,"HTML")?Ku(bn$1(e)):uf(Ya$3(),ce$2(e))}function gf(e){let t=Xa$3();return t?t.sanitize(Er$2.URL,e)||"":mi$1(e,"URL")?bn$1(e):Ja$2(ce$2(e))}function mf(e){let t=Xa$3();if(t)return Ju(t.sanitize(Er$2.RESOURCE_URL,e)||"");if(mi$1(e,"ResourceURL"))return Ju(bn$1(e));throw new b(904,false)}var vy={embed:{src:true},frame:{src:true},iframe:{src:true},media:{src:true},base:{href:true},link:{href:true},object:{data:true,codebase:true}};function Iy(e,t){return vy[e.toLowerCase()]?.[t.toLowerCase()]===true?mf:gf}function Ey(e,t,n){return Iy(t,n)(e)}function Xa$3(){let e=m$1();return e&&e[ye].sanitizer}function Dy(e){return e.ownerDocument}function wy(e){return e instanceof Function?e():e}function Ty(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1;}}var yf="ng-template";function Cy(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&Ty(t[o+1].toLowerCase(),n,0)!==-1)return  true}else if(ec$1(e))return  false;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return  true}return  false}function ec$1(e){return e.type===4&&e.value!==yf}function by(e,t,n){let r=e.type===4&&!n?yf:e.value;return t===r}function _y$1(e,t,n){let r=4,o=e.attrs,i=o!==null?Sy(o):0,s=false;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!Ee(r)&&!Ee(c))return  false;if(s&&Ee(c))continue;s=false,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!by(e,c,n)||c===""&&t.length===1){if(Ee(r))return  false;s=true;}}else if(r&8){if(o===null||!Cy(e,o,c,n)){if(Ee(r))return  false;s=true;}}else {let l=t[++a],u=My(c,o,ec$1(e),n);if(u===-1){if(Ee(r))return  false;s=true;continue}if(l!==""){let d;if(u>i?d="":d=o[u+1].toLowerCase(),r&2&&l!==d){if(Ee(r))return  false;s=true;}}}}return Ee(r)||s}function Ee(e){return (e&1)===0}function My(e,t,n,r){if(t===null)return  -1;let o=0;if(r||!n){let i=false;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=true;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else {if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2;}return  -1}else return xy(t,e)}function vf(e,t,n=false){for(let r=0;r<t.length;r++)if(_y$1(e,t[r],n))return  true;return  false}function Ny(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if((n&1)===0)return t[n+1]}return null}function Sy(e){for(let t=0;t<e.length;t++){let n=e[t];if(kd$1(n))return t}return e.length}function xy(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return  -1;if(r===t)return n;n++;}return  -1}function Ay(e,t){e:for(let n=0;n<t.length;n++){let r=t[n];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return  true}}return  false}function od$1(e,t){return e?":not("+t.trim()+")":t}function Ry(e){let t=e[0],n=1,r=2,o="",i=false;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]";}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!Ee(s)&&(t+=od$1(i,o),o=""),r=s,i=i||!Ee(r);n++;}return o!==""&&(t+=od$1(i,o)),t}function ky(e){return e.map(Ry).join(",")}function Oy(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else {if(!Ee(o))break;o=i;}r++;}return n.length&&t.push(1,...n),t}var q$2={},Xo$1=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(Xo$1||{}),Py;function tc$1(e,t){return Py(e,t)}typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Ma$3=new WeakMap;function If(e){return e?e[it$3]??e:null}var ir$2=new WeakSet;function Ly(e,t,n){let r=Ma$3.get(e);if(!r||r.length===0)return;let o=t.parentNode,i=t.previousSibling,s=If(n);for(let a=r.length-1;a>=0;a--){let{el:c,declarationView:l}=r[a],u=c.parentNode;c===t?(r.splice(a,1),ir$2.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}}))):i&&c===i?(r.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),c.parentNode?.removeChild(c)):u&&o&&u!==o&&(s===null||l===null||s===l)&&(r.splice(a,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),c.parentNode?.removeChild(c));}}function Fy(e,t,n){let r=If(n),o=Ma$3.get(e);o?o.some(i=>i.el===t)||o.push({el:t,declarationView:r}):Ma$3.set(e,[{el:t,declarationView:r}]);}var vn$1=new Set,yi$2=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(yi$2||{}),$t$2=new x(""),id$1=new Set;function Ye$2(e){id$1.has(e)||(id$1.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}));}var vi$2=(()=>{class e{impl=null;execute(){this.impl?.execute();}static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>new e})}return e})(),nc$1=[0,1,2,3],rc$1=(()=>{class e{ngZone=T$1(Ne$1);scheduler=T$1(Se$2);errorHandler=T$1(We$1,{optional:true});sequences=new Set;deferredRegistrations=new Set;executing=false;constructor(){T$1($t$2,{optional:true});}execute(){let n=this.sequences.size>0;n&&R$1(S.AfterRenderHooksStart),this.executing=true;for(let r of nc$1)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[r]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let i=o.hooks[r];return i(o.pipelinedValue)},o.snapshot));}catch(i){o.erroredOrDestroyed=true,this.errorHandler?.handleError(i);}this.executing=false;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),n&&R$1(S.AfterRenderHooksEnd);}register(n){let{view:r}=n;r!==void 0?((r[At$4]??=[]).push(n),Ot$2(r),r[I]|=8192):this.executing?this.deferredRegistrations.add(n):this.addSequence(n);}addSequence(n){this.sequences.add(n),this.scheduler.notify(7);}unregister(n){this.executing&&this.sequences.has(n)?(n.erroredOrDestroyed=true,n.pipelinedValue=void 0,n.once=true):(this.sequences.delete(n),this.deferredRegistrations.delete(n));}maybeTrace(n,r){return r?r.run(yi$2.AFTER_NEXT_RENDER,n):n()}static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>new e})}return e})(),lr$2=class lr{impl;hooks;view;once;snapshot;erroredOrDestroyed=false;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,n,r,o,i,s=null){this.impl=t,this.hooks=n,this.view=r,this.once=o,this.snapshot=s,this.unregisterOnDestroy=i?.onDestroy(()=>this.destroy());}afterRun(){this.erroredOrDestroyed=false,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null;}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[At$4];t&&(this.view[At$4]=t.filter(n=>n!==this));}};function jy(e,t){let n=t?.injector??T$1(ae$1);return Ye$2("NgAfterNextRender"),Hy(e,n,t,true)}function Vy(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function Hy(e,t,n,r){let o=t.get(vi$2);o.impl??=t.get(rc$1);let i=t.get($t$2,null,{optional:true}),s=n?.manualCleanup!==true?t.get(Oe$1):null,a=t.get(pn$1,null,{optional:true}),c=new lr$2(o.impl,Vy(e),a?.view,r,s,i?.snapshot(null));return o.impl.register(c),c}var oc$1=new x("",{factory:()=>{let e=T$1(se$1),t=new Set;return e.onDestroy(()=>t.clear()),{queue:t,isScheduled:false,scheduler:null,injector:e}}});function Ef(e,t,n){let r=e.get(oc$1);if(Array.isArray(t))for(let o of t)r.queue.add(o),n?.detachedLeaveAnimationFns?.push(o);else r.queue.add(t),n?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(e);}function By(e,t){let n=e.get(oc$1);if(Array.isArray(t))for(let r of t)n.queue.delete(r);else n.queue.delete(t);}function $y(e,t){let n=e.get(oc$1);if(t.detachedLeaveAnimationFns){for(let r of t.detachedLeaveAnimationFns)n.queue.delete(r);t.detachedLeaveAnimationFns=void 0;}}function Uy(e,t){for(let[n,r]of t)Ef(e,r.animateFns);}function sd$1(e,t,n,r){let o=e?.[ke$2]?.enter;t!==null&&o&&o.has(n.index)&&Uy(r,o);}function ad$1(e,t,n,r){try{n.get(Zn$2);}catch(s){return r(false)}let o=e?.[ke$2];o?.enter?.has(t.index)&&By(n,o.enter.get(t.index).animateFns);let i=Wy(e,t,o);if(i.size===0){let s=false;if(e){let a=[];Ii$2(e,t,a),s=a.length>0;}if(!s)return r(false)}e&&vn$1.add(e[Re$1]),Ef(n,()=>qy(e,t,o||void 0,i,r),o||void 0);}function Wy(e,t,n){let r=new Map,o=n?.leave;if(o&&o.has(t.index)&&r.set(t.index,o.get(t.index)),e&&o)for(let[i,s]of o){if(r.has(i))continue;let c=e[y$1].data[i].parent;for(;c;){if(c===t){r.set(i,s);break}c=c.parent;}}return r}function qy(e,t,n,r,o){let i=[];if(n&&n.leave)for(let[s]of r){if(!n.leave.has(s))continue;let a=n.leave.get(s);for(let c of a.animateFns){let{promise:l}=c();i.push(l);}n.detachedLeaveAnimationFns=void 0;}if(e&&Ii$2(e,t,i),i.length>0){let s=n||e?.[ke$2];if(s){let a=s.running;a&&i.push(a),s.running=Promise.allSettled(i),zy(e,s.running,o);}else Promise.allSettled(i).then(()=>{e&&vn$1.delete(e[Re$1]),o(true);});}else e&&vn$1.delete(e[Re$1]),o(false);}function Ii$2(e,t,n){if(t.type&12){let o=e[t.index];if(ue$2(o))for(let i=F$1;i<o.length;i++){let s=o[i];s[y$1].type===2&&Gy(s,n);}}let r=t.child;for(;r;)Ii$2(e,r,n),r=r.next;}function Gy(e,t){let n=e[ke$2];if(n&&n.leave)for(let o of n.leave.values())for(let i of o.animateFns){let{promise:s}=i();t.push(s);}let r=e[y$1].firstChild;for(;r;)Ii$2(e,r,t),r=r.next;}function zy(e,t,n){t.then(()=>{e[ke$2]?.running===t&&(e[ke$2].running=void 0,vn$1.delete(e[Re$1])),n(true);});}function hn$2(e,t,n,r,o,i,s,a){if(o!=null){let c,l=false;ue$2(o)?c=o:qe$3(o)&&(l=true,o=o[me$2]);let u=de$1(o);e===0&&r!==null?(sd$1(a,r,i,n),s==null?ff(t,r,u):Jo$2(t,r,u,s||null,true)):e===1&&r!==null?(sd$1(a,r,i,n),Jo$2(t,r,u,s||null,true),Ly(i,u,a)):e===2?(a?.[ke$2]?.leave?.has(i.index)&&Fy(i,u,a),ir$2.delete(u),ad$1(a,i,n,d=>{if(ir$2.has(u)){ir$2.delete(u);return}pf(t,u,l,d);})):e===3&&(ir$2.delete(u),ad$1(a,i,n,()=>{t.destroyNode(u);})),c!=null&&rv(t,e,n,c,i,r,s);}}function Qy(e,t){Df(e,t),t[me$2]=null,t[Q$3]=null;}function Zy(e,t,n,r,o,i){r[me$2]=o,r[Q$3]=t,Di$3(e,r,n,1,o,i);}function Df(e,t){t[ye].changeDetectionScheduler?.notify(9),Di$3(e,t,t[O$1],2,null,null);}function Yy(e){let t=e[an$2];if(!t)return oa$3(e[y$1],e);for(;t;){let n=null;if(qe$3(t))n=t[an$2];else {let r=t[F$1];r&&(n=r);}if(!n){for(;t&&!t[le$1]&&t!==e;)qe$3(t)&&oa$3(t[y$1],t),t=t[$$2];t===null&&(t=e),qe$3(t)&&oa$3(t[y$1],t),n=t&&t[le$1];}t=n;}}function ic$1(e,t){let n=e[Rt$3],r=n.indexOf(t);n.splice(r,1);}function Ei$3(e,t){if(kt$3(t))return;let n=t[O$1];n.destroyNode&&Di$3(e,t,n,3,null,null),Yy(t);}function oa$3(e,t){if(kt$3(t))return;let n=v$1(null);try{t[I]&=-129,t[I]|=256,t[ne$1]&&Xe$2(t[ne$1]),Jy(e,t),Ky(e,t),t[y$1].type===1&&t[O$1].destroy();let r=t[st];if(r!==null&&ue$2(t[$$2])){r!==t[$$2]&&ic$1(r,t);let o=t[Ae$1];o!==null&&o.detachView(e);}ma$3(t);}finally{v$1(n);}}function Ky(e,t){let n=e.cleanup,r=t[sn$2];if(n!==null)for(let s=0;s<n.length-1;s+=2)if(typeof n[s]=="string"){let a=n[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2;}else {let a=r[n[s+1]];n[s].call(a);}r!==null&&(t[sn$2]=null);let o=t[$e$1];if(o!==null){t[$e$1]=null;for(let s=0;s<o.length;s++){let a=o[s];a();}}let i=t[nt$4];if(i!==null){t[nt$4]=null;for(let s of i)s.destroy();}}function Jy(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof jt$2)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];R$1(S.LifecycleHookStart,a,c);try{c.call(a);}finally{R$1(S.LifecycleHookEnd,a,c);}}else {R$1(S.LifecycleHookStart,o,i);try{i.call(o);}finally{R$1(S.LifecycleHookEnd,o,i);}}}}}function wf(e,t,n){return Xy(e,t.parent,n)}function Xy(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[me$2];if(Ge$2(r)){let{encapsulation:o}=e.data[r.directiveStart+r.componentOffset];if(o===Vt.None||o===Vt.Emulated)return null}return fe$1(r,n)}function Tf(e,t,n){return tv(e,t,n)}function ev(e,t,n){return e.type&40?fe$1(e,n):null}var tv=ev;function sc$1(e,t,n,r){let o=wf(e,r,t),i=t[O$1],s=r.parent||t[Q$3],a=Tf(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)rd$1(i,o,n[c],a,false);else rd$1(i,o,n,a,false);}function sr$2(e,t){if(t!==null){let n=t.type;if(n&3)return fe$1(t,e);if(n&4)return Na$2(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return sr$2(e,r);{let o=e[t.index];return ue$2(o)?Na$2(-1,o):de$1(o)}}else {if(n&128)return sr$2(e,t.next);if(n&32)return tc$1(t,e)()||de$1(e[t.index]);{let r=Cf(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=Ue$3(e[Z$1]);return sr$2(o,r)}else return sr$2(e,t.next)}}}return null}function Cf(e,t){if(t!==null){let r=e[Z$1][Q$3],o=t.projection;return r.projection[o]}return null}function Na$2(e,t){let n=F$1+e+1;if(n<t.length){let r=t[n],o=r[y$1].firstChild;if(o!==null)return sr$2(r,o)}return t[at]}function ac$1(e,t,n,r,o,i,s){for(;n!=null;){let a=r[xe$1];if(n.type===128){n=n.next;continue}let c=r[n.index],l=n.type;if(s&&t===0&&(c&&yn$1(de$1(c),r),n.flags|=2),!hi$1(n))if(l&8)ac$1(e,t,n.child,r,o,i,false),hn$2(t,e,a,o,c,n,i,r);else if(l&32){let u=tc$1(n,r),d;for(;d=u();)hn$2(t,e,a,o,d,n,i,r);hn$2(t,e,a,o,c,n,i,r);}else l&16?bf(e,t,r,n,o,i):hn$2(t,e,a,o,c,n,i,r);n=s?n.projectionNext:n.next;}}function Di$3(e,t,n,r,o,i){ac$1(n,r,e.firstChild,t,o,i,false);}function nv(e,t,n){let r=t[O$1],o=wf(e,n,t),i=n.parent||t[Q$3],s=Tf(i,n,t);bf(r,0,t,n,o,s);}function bf(e,t,n,r,o,i){let s=n[Z$1],c=s[Q$3].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];hn$2(t,e,n[xe$1],o,u,r,i,n);}else {let l=c,u=s[$$2];qd$1(r)&&(l.flags|=128),ac$1(e,t,l,u,o,i,true);}}function rv(e,t,n,r,o,i,s){let a=r[at],c=de$1(r);a!==c&&hn$2(t,e,n,i,a,o,s);for(let l=F$1;l<r.length;l++){let u=r[l];Di$3(u[y$1],u,e,t,i,a);}}function ov(e,t,n,r,o){if(t)o?e.addClass(n,r):e.removeClass(n,r);else {let i=r.indexOf("-")===-1?void 0:Xo$1.DashCase;o==null?e.removeStyle(n,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=Xo$1.Important),e.setStyle(n,r,o,i));}}function cc(e,t,n,r,o,i,s,a,c,l,u){let d=L+r,p=d+o,f=iv(d,p),h=typeof l=="function"?l():l;return f[y$1]={type:e,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:p,hostBindingOpCodes:null,firstCreatePass:true,firstUpdatePass:true,staticViewQueries:false,staticContentQueries:false,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:h,incompleteFirstPass:false,ssrId:u}}function iv(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:q$2);return n}function sv(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=cc(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function lc$1(e,t,n,r,o,i,s,a,c,l,u){let d=t.blueprint.slice();return d[me$2]=o,d[I]=r|4|128|8|64|1024,(l!==null||e&&e[I]&2048)&&(d[I]|=2048),ks$1(d),d[$$2]=d[it$3]=e,d[V$2]=n,d[ye]=s||e&&e[ye],d[O$1]=a||e&&e[O$1],d[xe$1]=c||e&&e[xe$1]||null,d[Q$3]=i,d[Re$1]=km(),d[St$4]=u,d[Ms$1]=l,d[Z$1]=t.type==2?e[Z$1]:d,d}function av(e,t,n){let r=fe$1(t,e),o=sv(n),i=e[ye].rendererFactory,s=uc$1(e,lc$1(e,o,null,_f(n),r,t,null,i.createRenderer(r,n),null,null,null));return e[t.index]=s}function _f(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function Mf(e,t,n,r){if(n===0)return  -1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function uc$1(e,t){return e[an$2]?e[_s$1][le$1]=t:e[an$2]=t,e[_s$1]=t,t}function cv(e=1){Nf(P$1(),m$1(),Ie()+e);}function Nf(e,t,n,r){if((t[I]&3)===3){let i=e.preOrderCheckHooks;i!==null&&$o$2(t,i,n);}else {let i=e.preOrderHooks;i!==null&&Uo$3(t,i,0,n);}ct$1(n);}var wi$2=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(wi$2||{});function Ht$3(e,t,n,r){let o=v$1(null);try{let[i,s,a]=e.inputs[n],c=null;(s&wi$2.SignalBased)!==0&&(c=t[i][j$1]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):a!==null&&(r=a.call(t,r)),e.setInput!==null?e.setInput(t,c,r,n,i):Nd$1(t,c,i,r);}finally{v$1(o);}}function Sf(e,t,n,r,o){let i=Ie(),s=r&2;try{ct$1(-1),s&&t.length>L&&Nf(e,t,L,!1);let a=s?S.TemplateUpdateStart:S.TemplateCreateStart;R$1(a,o,n),n(r,o);}finally{ct$1(i);let a=s?S.TemplateUpdateEnd:S.TemplateCreateEnd;R$1(a,o,n);}}function Ti$2(e,t,n){hv(e,t,n),(n.flags&64)===64&&gv(e,t,n);}function Dr$2(e,t,n=fe$1){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a;}}}function lv(e,t,n,r){let i=r.get(Xd$1,Jd$1)||n===Vt.ShadowDom||n===Vt.ExperimentalIsolatedShadowDom,s=e.selectRootElement(t,i);if(s.tagName.toLowerCase()==="script")throw new b(905,false);return s}function fv(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function xf(e,t,n,r,o,i){let s=t[y$1];if(hc$1(e,s,t,n,r)){Ge$2(e)&&pv$1(t,e.index);return}e.type&3&&(n=fv(n)),Af(e,t,n,r,o,i);}function Af(e,t,n,r,o,i){if(e.type&3){let s=fe$1(e,t);r=i!=null?i(r,e.value||"",n):r,o.setProperty(s,n,r);}else e.type&12;}function pv$1(e,t){let n=pe$2(t,e);n[I]&16||(n[I]|=64);}function hv(e,t,n){let r=n.directiveStart,o=n.directiveEnd;Ge$2(n)&&av(t,n,e.data[r+n.componentOffset]),e.firstCreatePass||Yo$2(n,t);let i=n.initialInputs;for(let s=r;s<o;s++){let a=e.data[s],c=cr$2(t,e,s,n);if(yn$1(c,t),i!==null&&Iv(t,s-r,c,a,n,i),ve(a)){let l=pe$2(n.index,t);l[V$2]=cr$2(t,e,s,n);}}}function gv(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=Cu$1();try{ct$1(i);for(let a=r;a<o;a++){let c=e.data[a],l=t[a];So$2(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&mv(c,l);}}finally{ct$1(-1),So$2(s);}}function mv(e,t){e.hostBindings!==null&&e.hostBindings(1,t);}function dc$1(e,t){let n=e.directiveRegistry,r=null;if(n)for(let o=0;o<n.length;o++){let i=n[o];vf(t,i.selectors,false)&&(r??=[],ve(i)?r.unshift(i):r.push(i));}return r}function yv(e,t,n,r,o,i){let s=fe$1(e,t);vv(t[O$1],s,i,e.value,n,r,o);}function vv(e,t,n,r,o,i,s){if(i==null)s?.(i,r||"",o),e.removeAttribute(t,o,n);else {let a=s==null?ce$2(i):s(i,r||"",o);e.setAttribute(t,o,a,n);}}function Iv(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Ht$3(r,n,c,l);}}function fc$1(e,t,n,r,o){let i=L+n,s=t[y$1],a=o(s,t,e,r,n);t[i]=a,un$2(e,true);let c=e.type===2;return c?(hf(t[O$1],a,e),(gu$1()===0||cn$2(e))&&yn$1(a,t),mu$1()):yn$1(a,t),ko$2()&&(!c||!hi$1(e))&&sc$1(s,t,a,e),e}function pc$1(e){let t=e;return $s$1()?Us$1():(t=t.parent,un$2(t,false)),t}function Ev(e,t){let n=e[xe$1];if(!n)return;let r;try{r=n.get(Lt$2,null);}catch(o){r=null;}r?.(t);}function hc$1(e,t,n,r,o){let i=e.inputs?.[r],s=e.hostDirectiveInputs?.[r],a=false;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=t.data[l];Ht$3(d,n[l],u,o),a=true;}if(i)for(let c of i){let l=n[c],u=t.data[c];Ht$3(u,l,r,o),a=true;}return a}function Dv(e,t,n,r,o,i){let s=null,a=null,c=null,l=false,u=e.directiveToIndex.get(r.type);if(typeof u=="number"?s=u:[s,a,c]=u,a!==null&&c!==null&&e.hostDirectiveInputs?.hasOwnProperty(o)){let d=e.hostDirectiveInputs[o];for(let p=0;p<d.length;p+=2){let f=d[p];if(f>=a&&f<=c){let h=t.data[f],g=d[p+1];Ht$3(h,n[f],g,i),l=true;}else if(f>c)break}}return s!==null&&r.inputs.hasOwnProperty(o)&&(Ht$3(r,n[s],o,i),l=true),l}function wv(e,t){let n=pe$2(t,e),r=n[y$1];Tv(r,n);let o=n[me$2];o!==null&&n[St$4]===null&&(n[St$4]=ef(o,n[xe$1])),R$1(S.ComponentStart);try{gc$1(r,n,n[V$2]);}finally{R$1(S.ComponentEnd,n[V$2]);}}function Tv(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n]);}function gc$1(e,t,n){Ao$2(t);try{let r=e.viewQuery;r!==null&&va$3(1,r,n);let o=e.template;o!==null&&Sf(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Ae$1]?.finishViewCreation(e),e.staticContentQueries&&tf(e,t),e.staticViewQueries&&va$3(2,e.viewQuery,n);let i=e.components;i!==null&&Cv(t,i);}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=true,e.firstCreatePass=false),r}finally{t[I]&=-5,Ro$2();}}function Cv(e,t){for(let n=0;n<t.length;n++)wv(e,t[n]);}function wr$2(e,t,n,r){let o=v$1(null);try{let i=t.tView,a=e[I]&4096?4096:16,c=lc$1(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=e[t.index];c[st]=l;let u=e[Ae$1];return u!==null&&(c[Ae$1]=u.createEmbeddedView(i)),gc$1(i,c,n),c}finally{v$1(o);}}function In$1(e,t){return !t||t.firstChild===null||qd$1(e)}function ur$2(e,t,n,r,o=false){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let i=t[n.index];i!==null&&r.push(de$1(i)),ue$2(i)&&Rf(i,r);let s=n.type;if(s&8)ur$2(e,t,n.child,r);else if(s&32){let a=tc$1(n,t),c;for(;c=a();)r.push(c);}else if(s&16){let a=Cf(t,n);if(Array.isArray(a))r.push(...a);else {let c=Ue$3(t[Z$1]);ur$2(c[y$1],c,a,r,true);}}n=o?n.projectionNext:n.next;}return r}function Rf(e,t){for(let n=F$1;n<e.length;n++){let r=e[n],o=r[y$1].firstChild;o!==null&&ur$2(r[y$1],r,o,t);}e[at]!==e[me$2]&&t.push(e[at]);}function kf(e){if(e[At$4]!==null){for(let t of e[At$4])t.impl.addSequence(t);e[At$4].length=0;}}var Of=[];function bv(e){return e[ne$1]??_v(e)}function _v(e){let t=Of.pop()??Object.create(Nv);return t.lView=e,t}function Mv(e){e.lView[ne$1]!==e&&(e.lView=null,Of.push(e));}var Nv=x$1(w$2({},Ke$1),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:e=>{Ot$2(e.lView);},consumerOnSignalRead(){this.lView[ne$1]=this;}});function Sv(e){let t=e[ne$1]??Object.create(xv);return t.lView=e,t}var xv=x$1(w$2({},Ke$1),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:e=>{let t=Ue$3(e.lView);for(;t&&!Pf(t[y$1]);)t=Ue$3(t);t&&Os$1(t);},consumerOnSignalRead(){this.lView[ne$1]=this;}});function Pf(e){return e.type!==2}function Lf(e){if(e[nt$4]===null)return;let t=true;for(;t;){let n=false;for(let r of e[nt$4])r.dirty&&(n=true,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));t=n&&!!(e[I]&8192);}}var Av=100;function Ff(e,t=0){let r=e[ye].rendererFactory;r.begin?.();try{Rv(e,t);}finally{r.end?.();}}function Rv(e,t){let n=Ws$1();try{Bn$1(!0),Sa$3(e,t);let r=0;for(;Kn$2(e);){if(r===Av)throw new b(103,!1);r++,Sa$3(e,1);}}finally{Bn$1(n);}}function kv(e,t,n,r){if(kt$3(t))return;let o=t[I],i=false,s=false;Ao$2(t);let a=true,c=null,l=null;(Pf(e)?(l=bv(t),c=He$2(l)):to$2()===null?(a=false,l=Sv(t),c=He$2(l)):t[ne$1]&&(Xe$2(t[ne$1]),t[ne$1]=null));try{ks$1(t),Du$1(e.bindingStartIndex),n!==null&&Sf(e,t,n,2,r);let u=(o&3)===3;if(!i)if(u){let f=e.preOrderCheckHooks;f!==null&&$o$2(t,f,null);}else {let f=e.preOrderHooks;f!==null&&Uo$3(t,f,0,null),na$3(t,0);}if(s||Ov(t),Lf(t),jf(t,0),e.contentQueries!==null&&tf(e,t),!i)if(u){let f=e.contentCheckHooks;f!==null&&$o$2(t,f);}else {let f=e.contentHooks;f!==null&&Uo$3(t,f,1),na$3(t,1);}Lv(e,t);let d=e.components;d!==null&&Hf(t,d,0);let p=e.viewQuery;if(p!==null&&va$3(2,p,r),!i)if(u){let f=e.viewCheckHooks;f!==null&&$o$2(t,f);}else {let f=e.viewHooks;f!==null&&Uo$3(t,f,2),na$3(t,2);}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[wo$2]){for(let f of t[wo$2])f();t[wo$2]=null;}i||(kf(t),t[I]&=-73);}catch(u){throw Ot$2(t),u}finally{l!==null&&(Je$3(l,c),a&&Mv(l)),Ro$2();}}function jf(e,t){for(let n=zd$1(e);n!==null;n=Qd$1(n))for(let r=F$1;r<n.length;r++){let o=n[r];Vf(o,t);}}function Ov(e){for(let t=zd$1(e);t!==null;t=Qd$1(t)){if(!(t[I]&2))continue;let n=t[Rt$3];for(let r=0;r<n.length;r++){let o=n[r];Os$1(o);}}}function Pv(e,t,n){R$1(S.ComponentStart);let r=pe$2(t,e);try{Vf(r,n);}finally{R$1(S.ComponentEnd,r[V$2]);}}function Vf(e,t){bo$1(e)&&Sa$3(e,t);}function Sa$3(e,t){let r=e[y$1],o=e[I],i=e[ne$1],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&Kt$2(i)),s||=false,i&&(i.dirty=false),e[I]&=-9217,s)kv(r,e,r.template,e[V$2]);else if(o&8192){let a=v$1(null);try{Lf(e),jf(e,1);let c=r.components;c!==null&&Hf(e,c,1),kf(e);}finally{v$1(a);}}}function Hf(e,t,n){for(let r=0;r<t.length;r++)Pv(e,t[r],n);}function Lv(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)ct$1(~o);else {let i=o,s=n[++r],a=n[++r];Tu$1(s,i);let c=t[i];R$1(S.HostBindingsUpdateStart,c);try{a(2,c);}finally{R$1(S.HostBindingsUpdateEnd,c);}}}}finally{ct$1(-1);}}function mc$1(e,t){let n=Ws$1()?64:1088;for(e[ye].changeDetectionScheduler?.notify(t);e;){e[I]|=n;let r=Ue$3(e);if(ln$2(e)&&!r)return e;e=r;}return null}function Bf(e,t,n,r){return [e,true,0,t,null,r,null,n,null,null]}function $f(e,t){let n=F$1+t;if(n<e.length)return e[n]}function Tr$2(e,t,n,r=true){let o=t[y$1];if(Fv(o,t,e,n),r){let s=Na$2(n,e),a=t[O$1],c=a.parentNode(e[at]);c!==null&&Zy(o,e[Q$3],a,t,c,s);}let i=t[St$4];i!==null&&i.firstChild!==null&&(i.firstChild=null);}function Uf(e,t){let n=dr$2(e,t);return n!==void 0&&Ei$3(n[y$1],n),n}function dr$2(e,t){if(e.length<=F$1)return;let n=F$1+t,r=e[n];if(r){let o=r[st];o!==null&&o!==e&&ic$1(o,r),t>0&&(e[n-1][le$1]=r[le$1]);let i=zn$2(e,F$1+t);Qy(r[y$1],r);let s=i[Ae$1];s!==null&&s.detachView(i[y$1]),r[$$2]=null,r[le$1]=null,r[I]&=-129;}return r}function Fv(e,t,n,r){let o=F$1+r,i=n.length;r>0&&(n[o-1][le$1]=t),r<i-F$1?(t[le$1]=n[o],Is$1(n,F$1+r,t)):(n.push(t),t[le$1]=null),t[$$2]=n;let s=t[st];s!==null&&n!==s&&Wf(s,t);let a=t[Ae$1];a!==null&&a.insertView(e),_o$1(t),t[I]|=128;}function Wf(e,t){let n=e[Rt$3],r=t[$$2];if(qe$3(r))e[I]|=2;else {let o=r[$$2][Z$1];t[Z$1]!==o&&(e[I]|=2);}n===null?e[Rt$3]=[t]:n.push(t);}var ut$2=class ut{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=false;exhaustive;get rootNodes(){let t=this._lView,n=t[y$1];return ur$2(n,t,n.firstChild,[])}constructor(t,n){this._lView=t,this._cdRefInjectingView=n;}get context(){return this._lView[V$2]}set context(t){this._lView[V$2]=t;}get destroyed(){return kt$3(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[$$2];if(ue$2(t)){let n=t[Yn$2],r=n?n.indexOf(this):-1;r>-1&&(dr$2(t,r),zn$2(n,r));}this._attachedToViewContainer=false;}Ei$3(this._lView[y$1],this._lView);}onDestroy(t){Mo$2(this._lView,t);}markForCheck(){mc$1(this._cdRefInjectingView||this._lView,4);}detach(){this._lView[I]&=-129;}reattach(){_o$1(this._lView),this._lView[I]|=128;}detectChanges(){this._lView[I]|=1024,Ff(this._lView);}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new b(902,false);this._attachedToViewContainer=true;}detachFromAppRef(){this._appRef=null;let t=ln$2(this._lView),n=this._lView[st];n!==null&&!t&&ic$1(n,this._lView),Df(this._lView[y$1],this._lView);}attachToAppRef(t){if(this._attachedToViewContainer)throw new b(902,false);this._appRef=t;let n=ln$2(this._lView),r=this._lView[st];r!==null&&!n&&Wf(r,this._lView),_o$1(this._lView);}};var fr$2=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=jv;constructor(n,r,o){this._declarationLView=n,this._declarationTContainer=r,this.elementRef=o;}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,r){return this.createEmbeddedViewImpl(n,r)}createEmbeddedViewImpl(n,r,o){let i=wr$2(this._declarationLView,this._declarationTContainer,n,{embeddedViewInjector:r,dehydratedView:o});return new ut$2(i)}}return e})();function jv(){return Ci$2(H$1(),m$1())}function Ci$2(e,t){return e.type&4?new fr$2(t,e,Cn(e,t)):null}function _n$1(e,t,n,r,o){let i=e.data[t];if(i===null)i=Vv(e,t,n,r,o),wu$1()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=Iu$1();i.injectorIndex=s===null?-1:s.injectorIndex;}return un$2(i,true),i}function Vv(e,t,n,r,o){let i=Bs$1(),s=$s$1(),a=s?i:i&&i.parent,c=e.data[t]=Bv(e,a,n,t,r,o);return Hv$1(e,c,i,s),c}function Hv$1(e,t,n,r){e.firstChild===null&&(e.firstChild=t),n!==null&&(r?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n));}function Bv(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return js$1()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,namespace:Qs$1(),attrs:i,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function $v(e){let t=e[Ns$1]??[],r=e[$$2][O$1],o=[];for(let i of t)i.data[Kd$1]!==void 0?o.push(i):Uv(i,r);e[Ns$1]=o;}function Uv(e,t){let n=0,r=e.firstChild;if(r){let o=e.data[Yd$1];for(;n<o;){let i=r.nextSibling;pf(t,r,false),r=i,n++;}}}var Wv=()=>null,qv=()=>null;function ei$2(e,t){return Wv()}function qf(e,t,n){return qv()}var Gf=class{},pr$2=class pr{},Gv$1=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>zv$1()}return e})();function zv$1(){let e=m$1(),t=H$1(),n=pe$2(t.index,e);return (qe$3(n)?n:e)[O$1]}var zf=(()=>{class e{static \u0275prov=te$1({token:e,providedIn:"root",factory:()=>null})}return e})();function Qf(e){return e.debugInfo?.className||e.type.name||null}var qo$3={},ti$2=class ti{injector;parentInjector;constructor(t,n){this.injector=t,this.parentInjector=n;}get(t,n,r){let o=this.injector.get(t,qo$3,r);return o!==qo$3||n===qo$3?o:this.parentInjector.get(t,n,r)}};function yc$1(e,t,n){return e[t]=n}function Qv(e,t){return e[t]}function oe$1(e,t,n){if(n===q$2)return  false;let r=e[t];return Object.is(r,n)?false:(e[t]=n,true)}function ni$1(e,t,n,r){let o=oe$1(e,t,n);return oe$1(e,t+1,r)||o}function Zv(e,t,n,r,o,i){let s=ni$1(e,t,n,r);return ni$1(e,t+2,o,i)||s}function Ft$3(e,t,n){return function r(o){let i=r.__ngNativeEl__;i!==void 0&&Lm(o,i);let s=Ge$2(e)?pe$2(e.index,t):t;mc$1(s,5);let a=t[V$2],c=ld$1(t,a,n,o),l=r.__ngNextListenerFn__;for(;l;)c=ld$1(t,a,l,o)&&c,l=l.__ngNextListenerFn__;return c}}function ld$1(e,t,n,r){let o=v$1(null);try{return R$1(S.OutputStart,t,n),n(r)!==!1}catch(i){return Ev(e,i),false}finally{R$1(S.OutputEnd,t,n),v$1(o);}}function vc$1(e,t,n,r,o,i,s,a){let c=cn$2(e),l=false,u=null;if(!r&&c&&(u=Kv(t,n,i,e.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,l=true;}else {let d=fe$1(e,n),p=r?r(d):d;r||(a.__ngNativeEl__=d);let f=o.listen(p,i,a);if(!Yv(i)){let h=r?g=>r(de$1(g[e.index])):e.index;Zf(h,t,n,i,a,f,false);}}return l}function Yv(e){return e.startsWith("animation")||e.startsWith("transition")}function Kv(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[sn$2],c=o[i+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(i+=2);}return null}function Zf(e,t,n,r,o,i,s){let a=t.firstCreatePass?Ls$1(t):null,c=Ps$1(n),l=c.length;c.push(o,i),a&&a.push(r,e,l,(l+1)*(s?-1:1));}function ud$1(e,t,n,r,o){let i=null,s=null,a=null,c=false,l=e.directiveToIndex.get(n.type);if(typeof l=="number"?i=l:[i,s,a]=l,s!==null&&a!==null&&e.hostDirectiveOutputs?.hasOwnProperty(r)){let u=e.hostDirectiveOutputs[r];for(let d=0;d<u.length;d+=2){let p=u[d];if(p>=s&&p<=a)c=true,ri$1(e,t,p,u[d+1],r,o);else if(p>a)break}}return n.outputs.hasOwnProperty(r)&&(c=true,ri$1(e,t,i,r,r,o)),c}function ri$1(e,t,n,r,o,i){let s=t[n],a=t[y$1],l=a.data[n].outputs[r],d=s[l].subscribe(i);Zf(e.index,a,t,o,i,d,true);}function Jv(){Xv();}function Xv(){let e=m$1(),t=P$1(),n=H$1();if(t.firstCreatePass&&nI(t,n),n.controlDirectiveIndex===-1)return;Ye$2("NgSignalForms");let r=e[n.controlDirectiveIndex];t.data[n.controlDirectiveIndex].controlDef.create(r,new oi$1(e,t,n));}function eI(){tI();}function tI(){let e=m$1(),t=P$1(),n=dn$1();if(n.controlDirectiveIndex===-1)return;let r=t.data[n.controlDirectiveIndex].controlDef,o=e[n.controlDirectiveIndex];r.update(o,new oi$1(e,t,n));}var oi$1=class oi{lView;tView;tNode;hasPassThrough;constructor(t,n,r){this.lView=t,this.tView=n,this.tNode=r,this.hasPassThrough=!!(r.flags&4096);}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return fe$1(this.tNode,this.lView)}get descriptor(){return `<${this.tNode.value}>`}listenToCustomControlOutput(t,n){let r=this.tView.data[this.tNode.customControlIndex];ud$1(this.tNode,this.lView,r,t,Ft$3(this.tNode,this.lView,n));}listenToCustomControlModel(t){let n=this.tNode.flags&1024?"valueChange":"checkedChange",r=this.tView.data[this.tNode.customControlIndex];ud$1(this.tNode,this.lView,r,n,Ft$3(this.tNode,this.lView,t));}listenToDom(t,n){vc$1(this.tNode,this.tView,this.lView,void 0,this.lView[O$1],t,n,Ft$3(this.tNode,this.lView,n));}setInputOnDirectives(t,n){let r=this.tNode.inputs?.[t],o=this.tNode.hostDirectiveInputs?.[t];if(!r&&!o)return  false;let i=false;if(r)for(let s of r){if(s===this.tNode.controlDirectiveIndex)continue;let a=this.tView.data[s],c=this.lView[s];Ht$3(a,c,t,n),i=true;}if(o)for(let s=0;s<o.length;s+=2){let a=o[s];if(a===this.tNode.controlDirectiveIndex)continue;let c=o[s+1],l=this.tView.data[a],u=this.lView[a];Ht$3(l,u,c,n),i=true;}return i}setCustomControlModelInput(t){let n=this.tView.data[this.tNode.customControlIndex],r=this.tNode.flags&1024?"value":"checked";Dv(this.tNode,this.tView,this.lView,n,r,t);}customControlHasInput(t){if(this.tNode.customControlIndex===-1)return  false;let n=this.tView.data[this.tNode.customControlIndex];return (n.signalFormsInputPresence??=this._buildCustomControlInputCache(n))[t]===true}_buildCustomControlInputCache(t){let n={};for(let r in t.inputs)n[r]=true;if(t.hostDirectives!==null){let r=[...t.hostDirectives];for(;r.length>0;){let o=r.shift();if(typeof o!="function"){for(let s in o.inputs)n[o.inputs[s]]=true;let i=dd$1(o.directive);i!==null&&r.push(...i);continue}for(let i of o()){if(typeof i=="function")continue;if(i.inputs)for(let a=0;a<i.inputs.length;a+=2){let c=i.inputs[a+1]||i.inputs[a];n[c]=true;}let s=dd$1(i.directive);s!==null&&r.push(...s);}}}return n}};function dd$1(e){return typeof e=="function"&&"\u0275dir"in e?e.\u0275dir.hostDirectives??null:null}function nI(e,t,n){for(let o=t.directiveStart;o<t.directiveEnd;o++)if(e.data[o].controlDef){t.controlDirectiveIndex=o;break}if(t.controlDirectiveIndex===-1)return;let r=e.data[t.controlDirectiveIndex].controlDef;if(r.passThroughInput&&(t.inputs?.[r.passThroughInput]?.length??0)>1){t.flags|=4096;return}rI(e,t);}function rI(e,t){for(let n=t.directiveStart;n<t.directiveEnd;n++){let r=e.data[n];if(!(t.directiveToIndex&&!t.directiveToIndex.has(r.type))){if(fd$1(r,"value")){t.flags|=1024,t.customControlIndex=n;return}if(fd$1(r,"checked")){t.flags|=2048,t.customControlIndex=n;return}}}if(t.hostDirectiveInputs!==null&&t.hostDirectiveOutputs!==null&&t.directiveToIndex!==null){let n=(r,o)=>{let i=t.hostDirectiveInputs[r],s=t.hostDirectiveOutputs[r+"Change"];if(!i||!s)return  false;for(let a=0;a<i.length;a+=2){let c=i[a];for(let l=0;l<s.length;l+=2){let u=s[l];if(c===u)for(let d of t.directiveToIndex.values()){if(!Array.isArray(d))continue;let[p,f,h]=d;if(c>=f&&c<=h)return t.flags|=o,t.customControlIndex=p,true}}}return  false};if(n("value",1024)||n("checked",2048))return}}function fd$1(e,t){return oI(e,t)&&iI(e,t+"Change")}function oI(e,t){return t in e.inputs}function iI(e,t){return t in e.outputs}var xa$3=Symbol("BINDING");var Yf=new x("");function ii$1(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=fo$2(o,a);else if(i==2){let c=a,l=t[++s];r=fo$2(r,c+": "+l+";");}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o;}function Cr$2(e,t=0){let n=m$1();if(n===null)return Me$3(e,t);let r=H$1();return Hd$1(r,n,B$2(e),t)}function sI(){let e="invalid";throw new Error(e)}function Kf(e,t,n,r,o){let i=r===null?null:{"":-1},s=o(e,n);if(s!==null){let a=s,c=null,l=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(s);break}lI(e,t,n,a,i,c,l);}i!==null&&r!==null&&aI(n,r,i);}function aI(e,t,n){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new b(-301,false);r.push(t[o],i);}}function cI(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index);}function lI(e,t,n,r,o,i,s){let a=r.length,c=null;for(let p=0;p<a;p++){let f=r[p];c===null&&ve(f)&&(c=f,cI(e,n,p)),ha$3(Yo$2(n,t),e,f.type);}gI(n,e.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let p=0;p<a;p++){let f=r[p];f.providersResolver&&f.providersResolver(f);}let l=false,u=false,d=Mf(e,t,a,null);a>0&&(n.directiveToIndex=new Map);for(let p=0;p<a;p++){let f=r[p];if(n.mergedAttrs=mn$2(n.mergedAttrs,f.hostAttrs),dI(e,n,t,d,f),hI(d,f,o),s!==null&&s.has(f)){let[g,_]=s.get(f);n.directiveToIndex.set(f.type,[d,g+n.directiveStart,_+n.directiveStart]);}else (i===null||!i.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let h=f.type.prototype;!l&&(h.ngOnChanges||h.ngOnInit||h.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=true),!u&&(h.ngOnChanges||h.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=true),d++;}uI(e,n,i);}function uI(e,t,n){for(let r=t.directiveStart;r<t.directiveEnd;r++){let o=e.data[r];if(n===null||!n.has(o))pd$1(0,t,o,r),pd$1(1,t,o,r),gd$1(t,r,false);else {let i=n.get(o);hd$1(0,t,i,r),hd$1(1,t,i,r),gd$1(t,r,true);}}}function pd$1(e,t,n,r){let o=e===0?n.inputs:n.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s;e===0?s=t.inputs??={}:s=t.outputs??={},s[i]??=[],s[i].push(r),Jf(t,i);}}function hd$1(e,t,n,r){let o=e===0?n.inputs:n.outputs;for(let i in o)if(o.hasOwnProperty(i)){let s=o[i],a;e===0?a=t.hostDirectiveInputs??={}:a=t.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,i),Jf(t,s);}}function Jf(e,t){t==="class"?e.flags|=8:t==="style"&&(e.flags|=16);}function gd$1(e,t,n){let{attrs:r,inputs:o,hostDirectiveInputs:i}=e;if(r===null||!n&&o===null||n&&i===null||ec$1(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let c=r[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!n&&o.hasOwnProperty(c)){let l=o[c];for(let u of l)if(u===t){s??=[],s.push(c,r[a+1]);break}}else if(n&&i.hasOwnProperty(c)){let l=i[c];for(let u=0;u<l.length;u+=2)if(l[u]===t){s??=[],s.push(l[u+1],r[a+1]);break}}a+=2;}e.initialInputs??=[],e.initialInputs.push(s);}function dI(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=tt$3(o.type)),s=new jt$2(i,ve(o),Cr$2,null);e.blueprint[r]=s,n[r]=s,fI(e,t,r,Mf(e,n,o.hostVars,q$2),o);}function fI(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;pI(s)!=a&&s.push(a),s.push(n,r,i);}}function pI(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function hI(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;ve(t)&&(n[""]=e);}}function gI(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t;}function Ic$1(e,t,n,r,o,i,s,a){let c=t[y$1],l=c.consts,u=re$2(l,s),d=_n$1(c,e,n,r,u);return Kf(c,t,d,re$2(l,a),o),d.mergedAttrs=mn$2(d.mergedAttrs,d.attrs),d.attrs!==null&&ii$1(d,d.attrs,false),d.mergedAttrs!==null&&ii$1(d,d.mergedAttrs,true),c.queries!==null&&c.queries.elementStart(c,d),d}function Ec$1(e,t){Ad$1(e,t),Ss$1(t)&&e.queries.elementEnd(t);}function mI(e,t,n,r,o,i){let s=t.consts,a=re$2(s,o),c=_n$1(t,e,n,r,a);if(c.mergedAttrs=mn$2(c.mergedAttrs,c.attrs),i!=null){let l=re$2(s,i);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1);}return c.attrs!==null&&ii$1(c,c.attrs,false),c.mergedAttrs!==null&&ii$1(c,c.mergedAttrs,true),t.queries!==null&&t.queries.elementStart(t,c),c}var Xf=typeof ShadowRoot<"u",yI=typeof Document<"u";function vI(e){return Object.keys(e).map(t=>{let[n,r,o]=e[t],i={propName:n,templateName:t,isSignal:(r&wi$2.SignalBased)!==0};return o&&(i.transform=o),i})}function II(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function EI(e,t,n){let r=t instanceof se$1?t:t?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new ti$2(n,r):n}function DI(e){let t=e.get(pr$2,null);if(t===null)throw new b(407,false);let n=e.get(zf,null),r=e.get(Se$2,null),o=e.get($t$2,null,{optional:true});return {rendererFactory:t,sanitizer:n,changeDetectionScheduler:r,ngReflect:false,tracingService:o}}function wI(e,t){let n=ep(e);return df(t,n,n==="svg"?xs$1:n==="math"?lu$1:null)}function ep(e){return (e.selectors[0][0]||"div").toLowerCase()}var En=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=vI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=II(this.componentDef.outputs),this.cachedOutputs}constructor(t,n){this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=ky(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!n;}create(t,n,r,o,i,s){R$1(S.DynamicComponentStart);let a=v$1(null);try{let c=this.componentDef,l=EI(c,o||this.ngModule,t),u=DI(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(Qf(c),()=>this.createComponentRef(u,l,n,r,i,s)):this.createComponentRef(u,l,n,r,i,s)}finally{v$1(a);}}createComponentRef(t,n,r,o,i,s){let a=this.componentDef,c=TI(o,a,s,i),l=t.rendererFactory.createRenderer(null,a),u=o?lv(l,o,a.encapsulation,n):wI(a,l),d=n.get(Yf,null),p=CI(u,()=>n.get(nr$2,null)??Ya$3());d&&d.addHost(p);let f=s?.some(md$1)||i?.some(_=>typeof _!="function"&&_.bindings.some(md$1)),h=lc$1(null,c,null,512|_f(a),null,null,t,l,n,null,ef(u,n,true));d&&Xf&&p instanceof ShadowRoot&&Mo$2(h,()=>{d.removeHost(p);}),h[L]=u,Ao$2(h);let g=null;try{let _=Ic$1(L,h,2,"#host",()=>c.directiveRegistry,!0,0);hf(l,u,_),yn$1(u,h),Ti$2(c,h,_),Ka$3(c,_,h),Ec$1(c,_),r!==void 0&&_I(_,this.ngContentSelectors,r),g=pe$2(_.index,h),h[V$2]=g[V$2],gc$1(c,h,null);}catch(_){throw g!==null&&ma$3(g),ma$3(h),_}finally{R$1(S.DynamicComponentEnd),Ro$2();}return new si$1(this.componentType,h,!!f)}};function TI(e,t,n,r){let o=e?["ng-version","22.0.4"]:Oy(t.selectors[0]),i=null,s=null,a=0;if(n)for(let u of n)a+=u[xa$3].requiredVars,u.create&&(u.targetIdx=0,(i??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let p of d.bindings){a+=p[xa$3].requiredVars;let f=u+1;p.create&&(p.targetIdx=f,(i??=[]).push(p)),p.update&&(p.targetIdx=f,(s??=[]).push(p));}}let c=[t];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,p=go$2(d);c.push(p);}return cc(0,null,bI(i,s),1,a,c,null,null,null,[o],null)}function CI(e,t){let n=e.getRootNode?.();return yI&&n instanceof Document?n.head:n&&Xf&&n instanceof ShadowRoot?n:t().head}function bI(e,t){return !e&&!t?null:n=>{if(n&1&&e)for(let r of e)r.create();if(n&2&&t)for(let r of t)r.update();}}function md$1(e){let t=e[xa$3].kind;return t==="input"||t==="twoWay"}var si$1=class si extends Gf{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,n,r){super(),this._rootLView=n,this._hasInputBindings=r,this._tNode=To$2(n[y$1],L),this.location=Cn(this._tNode,n),this.instance=pe$2(this._tNode.index,n)[V$2],this.hostView=this.changeDetectorRef=new ut$2(n,void 0),this.componentType=t;}setInput(t,n){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let o=this._rootLView;hc$1(r,o[y$1],o,t,n);this.previousInputValues.set(t,n);let s=pe$2(r.index,o);mc$1(s,1);}get injector(){return new lt$2(this._tNode,this._rootLView)}destroy(){this.hostView.destroy();}onDestroy(t){this.hostView.onDestroy(t);}};function _I(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null&&i.length?Array.from(i):null);}}var bi$2=(()=>{class e{static __NG_ELEMENT_ID__=MI}return e})();function MI(){let e=H$1();return tp(e,m$1())}var Aa$3=class e extends bi$2{_lContainer;_hostTNode;_hostLView;constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r;}get element(){return Cn(this._hostTNode,this._hostLView)}get injector(){return new lt$2(this._hostTNode,this._hostLView)}get parentInjector(){let t=Qa$2(this._hostTNode,this._hostLView);if(Od$1(t)){let n=Qo$2(t,this._hostLView),r=zo$3(t),o=n[y$1].data[r+8];return new lt$2(o,n)}else return new lt$2(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1);}get(t){let n=yd$1(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-F$1}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=ei$2(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,In$1(this._hostTNode,s)),a}createComponent(t,n,r,o,i,s,a){let c,l=n||{};c=l.index,r=l.injector,o=l.projectableNodes,i=l.environmentInjector||l.ngModuleRef,s=l.directives,a=l.bindings;let u=new En(rt$1(t)),d=r||this.parentInjector;if(!i&&u.ngModule==null){let M=this.parentInjector.get(se$1,null);M&&(i=M);}let p=rt$1(u.componentType??{}),f=ei$2(this._lContainer,p?.id??null),h=null,g=u.create(d,o,h,i,s,a);return this.insertImpl(g.hostView,c,In$1(this._hostTNode,f)),g}insert(t,n){return this.insertImpl(t,n,true)}insertImpl(t,n,r){let o=t._lView;if(du$1(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else {let c=o[$$2],l=new e(c,c[Q$3],c[$$2]);l.detach(l.indexOf(t));}}let i=this._adjustIndex(n),s=this._lContainer;return Tr$2(s,o,i,r),t.attachToViewContainerRef(),Is$1(ia$3(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=yd$1(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=dr$2(this._lContainer,n);r&&(zn$2(ia$3(this._lContainer),n),Ei$3(r[y$1],r));}detach(t){let n=this._adjustIndex(t,-1),r=dr$2(this._lContainer,n);return r&&zn$2(ia$3(this._lContainer),n)!=null?new ut$2(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function yd$1(e){return e[Yn$2]}function ia$3(e){return e[Yn$2]||(e[Yn$2]=[])}function tp(e,t){let n,r=t[e.index];return ue$2(r)?n=r:(n=Bf(r,t,null,e),t[e.index]=n,uc$1(t,n)),SI(n,t,e,r),new Aa$3(n,e,t)}function NI(e,t){let n=e[O$1],r=n.createComment(""),o=fe$1(t,e),i=n.parentNode(o);return Jo$2(n,i,r,n.nextSibling(o),false),r}var SI=RI;function RI(e,t,n,r){if(e[at])return;let o;n.type&8?o=de$1(r):o=NI(t,n),e[at]=o;}var Ra$2=class e{queryList;matches=null;constructor(t){this.queryList=t;}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty();}},ka$3=class e{queries;constructor(t=[]){this.queries=t;}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone());}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t);}detachView(t){this.dirtyQueriesWithMatches(t);}finishViewCreation(t){this.dirtyQueriesWithMatches(t);}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)wc$1(t,n).matches!==null&&this.queries[n].setDirty();}},ai$1=class ai{flags;read;predicate;constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=FI(t):this.predicate=t;}},Oa$3=class e{queries;constructor(t=[]){this.queries=t;}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n);}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t);}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i]);}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n);}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t);}},Pa$3=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=false;_declarationNodeIndex;_appliesToNextNode=true;constructor(t,n=-1){this.metadata=t,this._declarationNodeIndex=n;}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n);}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=false);}template(t,n){this.elementStart(t,n);}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=true,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,kI(n,i)),this.matchTNodeWithReadOption(t,n,Wo$1(n,t,i,false,false));}else r===fr$2?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,Wo$1(n,t,r,false,false));}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===vr$2||o===bi$2||o===fr$2&&n.type&4)this.addMatch(n.index,-2);else {let i=Wo$1(n,t,o,false,false);i!==null&&this.addMatch(n.index,i);}else this.addMatch(n.index,r);}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n);}};function kI(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function OI(e,t){return e.type&11?Cn(e,t):e.type&4?Ci$2(e,t):null}function PI(e,t,n,r){return n===-1?OI(t,e):n===-2?LI(e,t,r):cr$2(e,e[y$1],n,t)}function LI(e,t,n){if(n===vr$2)return Cn(t,e);if(n===fr$2)return Ci$2(t,e);if(n===bi$2)return tp(t,e)}function np(e,t,n,r){let o=t[Ae$1].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else {let u=i[l];a.push(PI(t,u,s[c+1],n.metadata.read));}}o.matches=a;}return o.matches}function La$2(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=np(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else {let l=i[a+1],u=t[-c];for(let d=F$1;d<u.length;d++){let p=u[d];p[st]===p[$$2]&&La$2(p[y$1],p,l,r);}if(u[Rt$3]!==null){let d=u[Rt$3];for(let p=0;p<d.length;p++){let f=d[p];La$2(f[y$1],f,l,r);}}}}}return r}function Dc$1(e,t){return e[Ae$1].queries[t].queryList}function rp(e,t,n){let r=new Ko$2((n&4)===4);return hu$1(e,t,r,r.destroy),(t[Ae$1]??=new ka$3).queries.push(new Ra$2(r))-1}function op(e,t,n){let r=P$1();return r.firstCreatePass&&(sp(r,new ai$1(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=true)),rp(r,m$1(),t)}function ip(e,t,n,r){let o=P$1();if(o.firstCreatePass){let i=H$1();sp(o,new ai$1(t,n,r),i.index),jI(o,e),(n&2)===2&&(o.staticContentQueries=true);}return rp(o,m$1(),n)}function FI(e){return e.split(",").map(t=>t.trim())}function sp(e,t,n){e.queries===null&&(e.queries=new Oa$3),e.queries.track(new Pa$3(t,n));}function jI(e,t){let n=e.contentQueries||(e.contentQueries=[]),r=n.length?n[n.length-1]:-1;t!==r&&n.push(e.queries.length-1,t);}function wc$1(e,t){return e.queries.getByIndex(t)}function ap$1(e,t){let n=e[y$1],r=wc$1(n,t);return r.crossesNgTemplate?La$2(n,e,t,[]):np(n,e,r,t)}function cp(e,t,n){let r,o=Fn$2(()=>{r._dirtyCounter();let i=VI(r,e);if(t&&i===void 0)throw new b(-951,false);return i});return r=o[j$1],r._dirtyCounter=Pe$2(0),r._flatValue=void 0,o}function Tc$1(e){return cp(true,false)}function Cc$1(e){return cp(true,true)}function lp(e,t){let n=e[j$1];n._lView=m$1(),n._queryIndex=t,n._queryList=Dc$1(n._lView,t),n._queryList.onDirty(()=>n._dirtyCounter.update(r=>r+1));}function VI(e,t){let n=e._lView,r=e._queryIndex;if(n===void 0||r===void 0||n[I]&4)return t?void 0:z;let o=Dc$1(n,r),i=ap$1(n,r);return o.reset(i,Wd$1),t?o.first:o._changesDetected||e._flatValue===void 0?e._flatValue=o.toArray():e._flatValue}function bc$1(e){return !!e&&typeof e.then=="function"}function up(e){return !!e&&typeof e.subscribe=="function"}var Dn=class{},dp=class{};var ci$1=class ci extends Dn{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];constructor(t,n,r,o=true){super(),this.ngModuleType=t,this._parent=n;let i=Ql$1(t);this._bootstrapComponents=wy(i.bootstrap),this._r3Injector=Zs$1(t,n,[{provide:Dn,useValue:this},...r],qn$2(t),new Set(["environment"])),o&&this.resolveInjectorInitializers();}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType);}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null;}onDestroy(t){this.destroyCbs.push(t);}},li$1=class li extends dp{moduleType;constructor(t){super(),this.moduleType=t;}create(t){return new ci$1(this.moduleType,t,[])}};var hr$2=class hr extends Dn{injector;instance=null;constructor(t){super();let n=new Mt$4([...t.providers,{provide:Dn,useValue:this}],t.parent||on$2(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers();}destroy(){this.injector.destroy();}onDestroy(t){this.injector.onDestroy(t);}};function fp(e,t,n=null){return new hr$2({providers:e,parent:t,debugName:n,runEnvironmentInitializers:true}).injector}var HI=(()=>{class e{_injector;cachedInjectors=new Map;constructor(n){this._injector=n;}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let r=ws$1(false,n.type),o=r.length>0?fp([r],this._injector,""):null;this.cachedInjectors.set(n,o);}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy();}finally{this.cachedInjectors.clear();}}static \u0275prov=te$1({token:e,providedIn:"environment",factory:()=>new e(Me$3(se$1))})}return e})();function BI(e){return mr$2(()=>{let t=pp(e),n=x$1(w$2({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==Za$2.Eager,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?o=>o.get(HI).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??false,data:e.data||{},encapsulation:e.encapsulation||Vt.Emulated,styles:e.styles||z,_:null,schemas:e.schemas||null,tView:null,id:""});t.standalone&&Ye$2("NgStandalone"),hp(n);let r=e.dependencies;return n.directiveDefs=vd$1(r,$I),n.pipeDefs=vd$1(r,Zl$1),n.id=QI(n),n})}function $I(e){return rt$1(e)||go$2(e)}function UI(e){return mr$2(()=>({type:e.type,bootstrap:e.bootstrap||z,declarations:e.declarations||z,imports:e.imports||z,exports:e.exports||z,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function WI(e,t){if(e==null)return ot$1;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a,c;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i,c=o[3]||null):(i=o,s=o,a=wi$2.None,c=null),n[i]=[r,a,c],t[i]=s;}return n}function qI(e){if(e==null)return ot$1;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function GI(e){return mr$2(()=>{let t=pp(e);return hp(t),t})}function zI(e){return {type:e.type,name:e.name,factory:null,pure:e.pure!==false,standalone:e.standalone??true,onDestroy:e.type.prototype.ngOnDestroy||null}}function pp(e){let t={};return {type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||ot$1,exportAs:e.exportAs||null,standalone:e.standalone??true,signals:e.signals===true,selectors:e.selectors||z,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:WI(e.inputs,t),outputs:qI(e.outputs),debugInfo:null}}function hp(e){e.features?.forEach(t=>t(e));}function vd$1(e,t){return e?()=>{let n=typeof e=="function"?e():e,r=[];for(let o of n){let i=t(o);i!==null&&r.push(i);}return r}:null}function QI(e){let t=0,n=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let i of r.join("|"))t=Math.imul(31,t)+i.charCodeAt(0)<<0;return t+=2147483648,"c"+t}var gp=new x("");var _c$1=(()=>{class e{resolve;reject;initialized=false;done=false;donePromise=new Promise((n,r)=>{this.resolve=n,this.reject=r;});appInits=T$1(gp,{optional:true})??[];injector=T$1(ae$1);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let o of this.appInits){let i=Do$2(this.injector,o);if(bc$1(i))n.push(i);else if(up(i)){let s=new Promise((a,c)=>{i.subscribe({complete:a,error:c});});n.push(s);}}let r=()=>{this.done=true,this.resolve();};Promise.all(n).then(()=>{r();}).catch(o=>{this.reject(o);}),n.length===0&&r(),this.initialized=true;}static \u0275fac=function(r){return new(r||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function ZI(e){return t=>{t.controlDef={create:(n,r)=>{n?.\u0275ngControlCreate(r);},update:(n,r)=>{n?.\u0275ngControlUpdate?.(r);},passThroughInput:e};}}function YI(e){let t=n=>{let r=Array.isArray(e);n.hostDirectives===null?(n.resolveHostDirectives=KI,n.hostDirectives=r?e.map(Fa$3):[e]):r?n.hostDirectives.unshift(...e.map(Fa$3)):n.hostDirectives.unshift(e);};return t.ngInherit=true,t}function KI(e){let t=[],n=false,r=null,o=null;for(let i=0;i<e.length;i++){let s=e[i];if(s.hostDirectives!==null){let a=t.length;r??=new Map,o??=new Map,mp(s,t,r,e),o.set(s,[a,t.length-1]);}i===0&&ve(s)&&(n=true,t.push(s));}for(let i=n?1:0;i<e.length;i++)t.push(e[i]);return r!==null&&r.forEach((i,s)=>{JI(s.declaredInputs,i.inputs);}),[t,r,o]}function mp(e,t,n,r){if(e.hostDirectives!==null)for(let o of e.hostDirectives)if(typeof o=="function"){let i=o();for(let s of i)Id$1(Fa$3(s),t,n,r);}else Id$1(o,t,n,r);}function Id$1(e,t,n,r){let o=go$2(e.directive);if(mp(o,t,n,r),n.has(o)){let i=n.get(o);Ed$1(i,e.inputs,"input"),Ed$1(i,e.outputs,"output");}else r.includes(o)||(n.set(o,e),t.push(o));}function Ed$1(e,t,n){let r=n==="input"?e.inputs:e.outputs;Object.keys(t).forEach(o=>{let i=t[o];(!r.hasOwnProperty(o)||r[o]===i)&&(r[o]=i);});}function Fa$3(e){return typeof e=="function"?{directive:B$2(e),inputs:{},outputs:{}}:{directive:B$2(e.directive),inputs:Dd$1(e.inputs),outputs:Dd$1(e.outputs)}}function Dd$1(e){let t={};if(e!==void 0&&e.length>0)for(let n=0;n<e.length;n+=2)t[e[n]]=e[n+1];return t}function JI(e,t){for(let n in t)if(t.hasOwnProperty(n)){let r=t[n],o=e[n];e[r]=o;}}function XI(e){return Object.getPrototypeOf(e.prototype).constructor}function yp(e){let t=XI(e.type),n=true,r=[e];for(;t;){let o;if(ve(e))o=t.\u0275cmp||t.\u0275dir;else {if(t.\u0275cmp)throw new b(903,false);o=t.\u0275dir;}if(o){if(n){r.push(o);let s=e;s.inputs=sa$3(e.inputs),s.declaredInputs=sa$3(e.declaredInputs),s.outputs=sa$3(e.outputs);let a=o.hostBindings;a&&oE(e,a);let c=o.viewQuery,l=o.contentQueries;if(c&&nE(e,c),l&&rE(e,l),eE(e,o),Gl$1(e.outputs,o.outputs),ve(o)&&o.data.animation){let u=e.data;u.animation=(u.animation||[]).concat(o.data.animation);}}let i=o.features;if(i)for(let s=0;s<i.length;s++){let a=i[s];a&&a.ngInherit&&a(e),a===yp&&(n=false);}}t=Object.getPrototypeOf(t);}tE(r);}function eE(e,t){for(let n in t.inputs){if(!t.inputs.hasOwnProperty(n)||e.inputs.hasOwnProperty(n))continue;let r=t.inputs[n];r!==void 0&&(e.inputs[n]=r,e.declaredInputs[n]=t.declaredInputs[n]);}}function tE(e){let t=0,n=null;for(let r=e.length-1;r>=0;r--){let o=e[r];o.hostVars=t+=o.hostVars,o.hostAttrs=mn$2(o.hostAttrs,n=mn$2(n,o.hostAttrs));}}function sa$3(e){return e===ot$1?{}:e===z?[]:e}function nE(e,t){let n=e.viewQuery;n?e.viewQuery=(r,o)=>{t(r,o),n(r,o);}:e.viewQuery=t;}function rE(e,t){let n=e.contentQueries;n?e.contentQueries=(r,o,i)=>{t(r,o,i),n(r,o,i);}:e.contentQueries=t;}function oE(e,t){let n=e.hostBindings;n?e.hostBindings=(r,o)=>{t(r,o),n(r,o);}:e.hostBindings=t;}function vp$1(e,t,n,r,o,i,s,a){if(n.firstCreatePass){e.mergedAttrs=mn$2(e.mergedAttrs,e.attrs);let u=e.tView=cc(2,e,o,i,s,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),u.queries=n.queries.embeddedTView(e));}a&&(e.flags|=a),un$2(e,false);let c=sE(n,t);ko$2()&&sc$1(n,t,c,e),yn$1(c,t);let l=Bf(c,t,c,e);t[r+L]=l,uc$1(t,l);}function iE(e,t,n,r,o,i,s,a,c,l,u){let d=n+L,p;return t.firstCreatePass?(p=_n$1(t,d,4,s||null,a||null),Kf(t,e,p,re$2(t.consts,l),dc$1),Ad$1(t,p)):p=t.data[d],vp$1(p,e,t,n,r,o,i,c),cn$2(p)&&Ti$2(t,e,p),l!=null&&Dr$2(e,p,u),p}function wn$1(e,t,n,r,o,i,s,a,c,l,u){let d=n+L,p;if(t.firstCreatePass){if(p=_n$1(t,d,4,s||null,a||null),l!=null){let f=re$2(t.consts,l);p.localNames=[];for(let h=0;h<f.length;h+=2)p.localNames.push(f[h],-1);}}else p=t.data[d];return vp$1(p,e,t,n,r,o,i,c),l!=null&&Dr$2(e,p,u),p}function Ip(e,t,n,r,o,i,s,a){let c=m$1(),l=P$1(),u=re$2(l.consts,i);return iE(c,l,e,t,n,r,o,u,void 0,s,a),Ip}function Ep(e,t,n,r,o,i,s,a){let c=m$1(),l=P$1(),u=re$2(l.consts,i);return wn$1(c,l,e,t,n,r,o,u,void 0,s,a),Ep}var sE=aE;function aE(e,t,n,r){return tr$2(true),t[O$1].createComment("")}var cE=(()=>{class e{log(n){console.log(n);}warn(n){console.warn(n);}static \u0275fac=function(r){return new(r||e)};static \u0275prov=te$1({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var Dp=new x("");var wp=new x("");function Tp$1(){zi$2(()=>{let e="";throw new b(600,e)});}var lE=10;var _i$3=(()=>{class e{_runningTick=false;_destroyed=false;_destroyListeners=[];_views=[];internalErrorHandler=T$1(Lt$2);afterRenderManager=T$1(vi$2);zonelessEnabled=T$1(rr$2);rootEffectScheduler=T$1(Po$2);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=false;afterTick=new ee$1;get allViews(){return [...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=T$1(Pt$3);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(we$1(n=>!n))}constructor(){T$1($t$2,{optional:true});}whenStable(){let n;return new Promise(r=>{n=this.isStable.subscribe({next:o=>{o&&r();}});}).finally(()=>{n.unsubscribe();})}_injector=T$1(se$1);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,r){return this.bootstrapImpl(n,r)}bootstrapImpl(n,r,o=ae$1.NULL){return this._injector.get(Ne$1).run(()=>{if(R$1(S.BootstrapComponentStart),!this._injector.get(_c$1).done){let M="";throw new b(405,M)}let a=rt$1(n),c=this._injector.get(Dn),l=new En(a,c);this.componentTypes.push(n);let{hostElement:u,directives:d,bindings:p}=uE(r),f=u||l.selector,h=l.create(o,[],f,c.injector,d,p),g=h.location.nativeElement,_=h.injector.get(Dp,null);return _?.registerApplication(g),h.onDestroy(()=>{this.detachView(h.hostView),ar$2(this.components,h),_?.unregisterApplication(g);}),this._loadComponent(h),R$1(S.BootstrapComponentEnd,h),h})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick();}_tick(){R$1(S.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(yi$2.CHANGE_DETECTION,this.tickImpl):this.tickImpl();}tickImpl=()=>{if(this._runningTick)throw R$1(S.ChangeDetectionEnd),new b(101,false);let n=v$1(null);try{this._runningTick=!0,this.synchronize();}finally{this._runningTick=false,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,v$1(n),this.afterTick.next(),R$1(S.ChangeDetectionEnd);}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(pr$2,null,{optional:true}));let n=0;for(;this.dirtyFlags!==0&&n++<lE;){R$1(S.ChangeDetectionSyncStart);try{this.synchronizeOnce();}finally{R$1(S.ChangeDetectionSyncEnd);}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let n=false;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!r&&!Kn$2(o))continue;let i=r&&!this.zonelessEnabled?0:1;Ff(o,i),n=true;}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}n||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews();}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>Kn$2(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8;}attachView(n){let r=n;this._views.push(r),r.attachToAppRef(this);}detachView(n){let r=n;ar$2(this._views,r),r.detachFromAppRef();}_loadComponent(n){this.attachView(n.hostView);try{this.tick();}catch(o){this.internalErrorHandler(o);}this.components.push(n),this._injector.get(wp,[]).forEach(o=>o(n));}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy());}finally{this._destroyed=true,this._views=[],this._destroyListeners=[];}}onDestroy(n){return this._destroyListeners.push(n),()=>ar$2(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new b(406,false);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy();}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function uE(e){return e===void 0||typeof e=="string"||e instanceof Element?{hostElement:e}:e}function ar$2(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1);}function Cp(e,t,n,r){let o=m$1(),i=ze$3();if(oe$1(o,i,t)){P$1();let a=dn$1();yv(a,o,e,t,n,r);}return Cp}function dE(){return m$1()[Z$1][V$2]}var ja$2=class ja{destroy(t){}updateValue(t,n){}swap(t,n){let r=Math.min(t,n),o=Math.max(t,n),i=this.detach(o);if(o-r>1){let s=this.detach(r);this.attach(r,i),this.attach(o,s);}else this.attach(r,i);}move(t,n){this.attach(n,this.detach(t));}};function aa$3(e,t,n,r,o){return e===n&&Object.is(t,r)?1:Object.is(o(e,t),o(n,r))?-1:0}function fE(e,t,n,r){let o,i,s=0,a=e.length-1;if(Array.isArray(t)){v$1(r);let l=t.length-1;for(v$1(null);s<=a&&s<=l;){let u=e.at(s),d=t[s],p=aa$3(s,u,s,d,n);if(p!==0){p<0&&e.updateValue(s,d),s++;continue}let f=e.at(a),h=t[l],g=aa$3(a,f,l,h,n);if(g!==0){g<0&&e.updateValue(a,h),a--,l--;continue}let _=n(s,u),M=n(a,f),he=n(s,d);if(Object.is(he,M)){let xi=n(l,h);Object.is(xi,_)?(e.swap(s,a),e.updateValue(a,h),l--,a--):e.move(a,s),e.updateValue(s,d),s++;continue}if(o??=new ui$1,i??=Td$1(e,s,a,n),Va$3(e,o,s,he))e.updateValue(s,d),s++,a++;else if(i.has(he))o.set(_,e.detach(s)),a--;else {let xi=e.create(s,t[s]);e.attach(s,xi),s++,a++;}}for(;s<=l;)wd$1(e,o,n,s,t[s]),s++;}else if(t!=null){v$1(r);let l=t[Symbol.iterator]();v$1(null);let u=l.next();for(;!u.done&&s<=a;){let d=e.at(s),p=u.value,f=aa$3(s,d,s,p,n);if(f!==0)f<0&&e.updateValue(s,p),s++,u=l.next();else {o??=new ui$1,i??=Td$1(e,s,a,n);let h=n(s,p);if(Va$3(e,o,s,h))e.updateValue(s,p),s++,a++,u=l.next();else if(!i.has(h))e.attach(s,e.create(s,p)),s++,a++,u=l.next();else {let g=n(s,d);o.set(g,e.detach(s)),a--;}}}for(;!u.done;)wd$1(e,o,n,e.length,u.value),u=l.next();}for(;s<=a;)e.destroy(e.detach(a--));o?.forEach(l=>{e.destroy(l);});}function Va$3(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),true):false}function wd$1(e,t,n,r,o){if(Va$3(e,t,r,n(r,o)))e.updateValue(r,o);else {let i=e.create(r,o);e.attach(r,i);}}function Td$1(e,t,n,r){let o=new Set;for(let i=t;i<=n;i++)o.add(r(i,e.at(i)));return o}var ui$1=class ui{kvMap=new Map;_vMap=void 0;has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return  false;let n=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(t,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(t),true}get(t){return this.kvMap.get(t)}set(t,n){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(r);)r=o.get(r);o.set(r,n);}else this.kvMap.set(t,n);}forEach(t){for(let[n,r]of this.kvMap)if(t(r,n),this._vMap!==void 0){let o=this._vMap;for(;o.has(r);)r=o.get(r),t(r,n);}}};function pE(e,t,n,r,o,i,s,a){Ye$2("NgControlFlow");let c=m$1(),l=P$1(),u=re$2(l.consts,i);return wn$1(c,l,e,t,n,r,o,u,256,s,a),Mc$1}function Mc$1(e,t,n,r,o,i,s,a){Ye$2("NgControlFlow");let c=m$1(),l=P$1(),u=re$2(l.consts,i);return wn$1(c,l,e,t,n,r,o,u,512,s,a),Mc$1}function hE(e,t){Ye$2("NgControlFlow");let n=m$1(),r=ze$3(),o=n[r]!==q$2?n[r]:-1,i=o!==-1?di$1(n,L+o):void 0,s=0;if(oe$1(n,r,e)){let a=v$1(null);try{if(i!==void 0&&Uf(i,s),e!==-1){let c=L+e,l=di$1(n,c),u=Ua$2(n[y$1],c),d=qf(l,u,n),p=wr$2(n,u,t,{dehydratedView:d});Tr$2(l,p,s,In$1(u,d));}}finally{v$1(a);}}else if(i!==void 0){let a=$f(i,s);a!==void 0&&(a[V$2]=t);}}var Ha$2=class Ha{lContainer;$implicit;$index;constructor(t,n,r){this.lContainer=t,this.$implicit=n,this.$index=r;}get $count(){return this.lContainer.length-F$1}};function gE(e,t){return t}var Ba$2=class Ba{hasEmptyBlock;trackByFn;liveCollection;constructor(t,n,r){this.hasEmptyBlock=t,this.trackByFn=n,this.liveCollection=r;}};function mE(e,t,n,r,o,i,s,a,c,l,u,d,p){Ye$2("NgControlFlow");let f=m$1(),h=P$1(),g=c!==void 0,_=m$1(),M=a?s.bind(_[Z$1][V$2]):s,he=new Ba$2(g,M);_[L+e]=he,wn$1(f,h,e+1,t,n,r,o,re$2(h.consts,i),256);}var $a$3=class $a extends ja$2{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=false;constructor(t,n,r){super(),this.lContainer=t,this.hostLView=n,this.templateTNode=r;}get length(){return this.lContainer.length-F$1}at(t){return this.getLView(t)[V$2].$implicit}attach(t,n){let r=n[St$4];this.needsIndexUpdate||=t!==this.length,Tr$2(this.lContainer,n,t,In$1(this.templateTNode,r)),vE(this.lContainer,t);}detach(t){return this.needsIndexUpdate||=t!==this.length-1,IE(this.lContainer,t),EE(this.lContainer,t)}create(t,n){let r=ei$2(this.lContainer,this.templateTNode.tView.ssrId);return wr$2(this.hostLView,this.templateTNode,new Ha$2(this.lContainer,n,t),{dehydratedView:r})}destroy(t){Ei$3(t[y$1],t);}updateValue(t,n){this.getLView(t)[V$2].$implicit=n;}reset(){this.needsIndexUpdate=false;}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[V$2].$index=t;}getLView(t){return DE(this.lContainer,t)}};function yE(e){let t=v$1(null),n=Ie();try{let r=m$1(),o=r[y$1],i=r[n],s=n+1,a=di$1(r,s);if(i.liveCollection===void 0){let l=Ua$2(o,s);i.liveCollection=new $a$3(a,r,l);}else i.liveCollection.reset();let c=i.liveCollection;if(fE(c,e,i.trackByFn,t),c.updateIndexes(),i.hasEmptyBlock){let l=ze$3(),u=c.length===0;if(oe$1(r,l,u)){let d=n+2,p=di$1(r,d);if(u){let f=Ua$2(o,d),h=qf(p,f,r),g=wr$2(r,f,void 0,{dehydratedView:h});Tr$2(p,g,0,In$1(f,h));}else o.firstUpdatePass&&$v(p),Uf(p,0);}}}finally{v$1(t);}}function di$1(e,t){return e[t]}function vE(e,t){if(e.length<=F$1)return;let n=F$1+t,r=e[n],o=r?r[ke$2]:void 0;if(r&&o&&o.detachedLeaveAnimationFns&&o.detachedLeaveAnimationFns.length>0){let i=r[xe$1];$y(i,o),vn$1.delete(r[Re$1]),o.detachedLeaveAnimationFns=void 0;}}function IE(e,t){if(e.length<=F$1)return;let n=F$1+t,r=e[n],o=r?r[ke$2]:void 0;o&&o.leave&&o.leave.size>0&&(o.detachedLeaveAnimationFns=[]);}function EE(e,t){return dr$2(e,t)}function DE(e,t){return $f(e,t)}function Ua$2(e,t){return To$2(e,t)}function bp$1(e,t,n){let r=m$1(),o=ze$3();if(oe$1(r,o,t)){P$1();let s=dn$1();xf(s,r,e,t,r[O$1],n);}return bp$1}function Wa$2(e,t,n,r,o){hc$1(t,e,n,o?"class":"style",r);}function fi$3(e,t,n,r){let o=m$1(),i=o[y$1],s=e+L,a=i.firstCreatePass?Ic$1(s,o,2,t,dc$1,No$1(),n,r):i.data[s];if(Ge$2(a)){let c=o[ye].tracingService;if(c&&c.componentCreate){let l=i.data[a.directiveStart+a.componentOffset];return c.componentCreate(Qf(l),()=>(Cd$1(e,t,o,a,r),fi$3))}}return Cd$1(e,t,o,a,r),fi$3}function Cd$1(e,t,n,r,o){if(fc$1(r,n,e,t,Np),cn$2(r)){let i=n[y$1];Ti$2(i,n,r),Ka$3(i,r,n);}o!=null&&Dr$2(n,r);}function Nc$1(){let e=P$1(),t=H$1(),n=pc$1(t);return e.firstCreatePass&&Ec$1(e,n),Vs$1(n)&&Hs$1(),Fs$1(),n.classesWithoutHost!=null&&mm(n)&&Wa$2(e,n,m$1(),n.classesWithoutHost,true),n.stylesWithoutHost!=null&&ym(n)&&Wa$2(e,n,m$1(),n.stylesWithoutHost,false),Nc$1}function _p$1(e,t,n,r){return fi$3(e,t,n,r),Nc$1(),_p$1}function Sc$1(e,t,n,r){let o=m$1(),i=o[y$1],s=e+L,a=i.firstCreatePass?mI(s,i,2,t,n,r):i.data[s];return fc$1(a,o,e,t,Np),r!=null&&Dr$2(o,a),Sc$1}function xc$1(){let e=H$1(),t=pc$1(e);return Vs$1(t)&&Hs$1(),Fs$1(),xc$1}function Mp(e,t,n,r){return Sc$1(e,t,n,r),xc$1(),Mp}var Np=(e,t,n,r,o)=>(tr$2(true),df(t[O$1],r,Qs$1()));function Ac$1(e,t,n){let r=m$1(),o=r[y$1],i=e+L,s=o.firstCreatePass?Ic$1(i,r,8,"ng-container",dc$1,No$1(),t,n):o.data[i];if(fc$1(s,r,e,"ng-container",wE),cn$2(s)){let a=r[y$1];Ti$2(a,r,s),Ka$3(a,s,r);}return n!=null&&Dr$2(r,s),Ac$1}function Rc$1(){let e=P$1(),t=H$1(),n=pc$1(t);return e.firstCreatePass&&Ec$1(e,n),Rc$1}function Sp(e,t,n){return Ac$1(e,t,n),Rc$1(),Sp}var wE=(e,t,n,r,o)=>(tr$2(true),hy(t[O$1],""));function TE(){return m$1()}function xp(e,t,n){let r=m$1(),o=ze$3();if(oe$1(r,o,t)){P$1();let s=dn$1();Af(s,r,e,t,r[O$1],n);}return xp}var br$2="en-US";function Ap(e){typeof e=="string"&&(e.toLowerCase().replace(/_/g,"-"));}function Rp$1(e,t,n){let r=m$1(),o=P$1(),i=H$1();return Op(o,r,r[O$1],i,e,t,n),Rp$1}function kp(e,t,n){let r=m$1(),o=P$1(),i=H$1();return (i.type&3||n)&&vc$1(i,o,r,n,r[O$1],e,t,Ft$3(i,r,t)),kp}function Op(e,t,n,r,o,i,s){let a=true,c=null;if((r.type&3||s)&&(c??=Ft$3(r,t,i),vc$1(r,e,t,s,n,o,i,c)&&(a=false)),a){let l=r.outputs?.[o],u=r.hostDirectiveOutputs?.[o];if(u&&u.length)for(let d=0;d<u.length;d+=2){let p=u[d],f=u[d+1];c??=Ft$3(r,t,i),ri$1(r,t,p,f,o,c);}if(l&&l.length)for(let d of l)c??=Ft$3(r,t,i),ri$1(r,t,d,o,o,c);}}function bE(e=1){return Su$1(e)}function _E(e,t){let n=null,r=Ny(e);for(let o=0;o<t.length;o++){let i=t[o];if(i==="*"){n=o;continue}if(r===null?vf(e,i,true):Ay(r,i))return o}return n}function ME(e){let t=m$1()[Z$1][Q$3];if(!t.projection){let n=e?e.length:1,r=t.projection=tu$1(n,null),o=r.slice(),i=t.child;for(;i!==null;){if(i.type!==128){let s=e?_E(i,e):0;s!==null&&(o[s]?o[s].projectionNext=i:r[s]=i,o[s]=i);}i=i.next;}}}function NE(e,t=0,n,r,o,i){let s=m$1(),a=P$1(),c=null;let l=_n$1(a,L+e,16,null,null);l.projection===null&&(l.projection=t),Us$1();let d=!s[St$4]||js$1();s[Z$1][Q$3].projection[l.projection]===null&&c!==null?SE(s,a,c):d&&!hi$1(l)&&nv(a,s,l);}function SE(e,t,n){let r=L+n,o=t.data[r],i=e[r],s=ei$2(i,o.tView.ssrId),a=wr$2(e,o,void 0,{dehydratedView:s});Tr$2(i,a,0,In$1(o,s));}function Pp(e,t,n,r){return ip(e,t,n,r),Pp}function Lp(e,t,n){return op(e,t,n),Lp}function xE(e){let t=m$1(),n=P$1(),r=xo$2();er$2(r+1);let o=wc$1(n,r);if(e.dirty&&uu$1(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else {let i=ap$1(t,r);e.reset(i,Wd$1),e.notifyOnChanges();}return  true}return  false}function AE(){return Dc$1(m$1(),xo$2())}function Fp(e,t,n,r,o){return lp(t,ip(e,n,r,o)),Fp}function jp(e,t,n,r){return lp(e,op(t,n,r)),jp}function RE(e=1){er$2(xo$2()+e);}function kE(e){let t=Eu$1();return Co$2(t,L+e)}function Bo$2(e,t){return e<<17|t<<2}function Bt$1(e){return e>>17&32767}function OE(e){return (e&2)==2}function PE(e,t){return e&131071|t<<17}function qa$3(e){return e|2}function Tn$1(e){return (e&131068)>>2}function ca$3(e,t){return e&-131069|t<<2}function LE(e){return (e&1)===1}function Ga$2(e){return e|1}function FE(e,t,n,r,o,i){let s=i?t.classBindings:t.styleBindings,a=Bt$1(s),c=Tn$1(s);e[r]=n;let l=false,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||rn$2(d,u)>0)&&(l=true);}else u=n;if(o)if(c!==0){let p=Bt$1(e[a+1]);e[r+1]=Bo$2(p,a),p!==0&&(e[p+1]=ca$3(e[p+1],r)),e[a+1]=PE(e[a+1],r);}else e[r+1]=Bo$2(a,0),a!==0&&(e[a+1]=ca$3(e[a+1],r)),a=r;else e[r+1]=Bo$2(c,0),a===0?a=r:e[c+1]=ca$3(e[c+1],r),c=r;l&&(e[r+1]=qa$3(e[r+1])),bd$1(e,u,r,true),bd$1(e,u,r,false),jE(t,u,e,r,i),s=Bo$2(a,c),i?t.classBindings=s:t.styleBindings=s;}function jE(e,t,n,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof t=="string"&&rn$2(i,t)>=0&&(n[r+1]=Ga$2(n[r+1]));}function bd$1(e,t,n,r){let o=e[n+1],i=t===null,s=r?Bt$1(o):Tn$1(o),a=false;for(;s!==0&&(a===false||i);){let c=e[s],l=e[s+1];VE(c,t)&&(a=true,e[s+1]=r?Ga$2(l):qa$3(l)),s=r?Bt$1(l):Tn$1(l);}a&&(e[n+1]=r?qa$3(o):Ga$2(o));}function VE(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?true:Array.isArray(e)&&typeof t=="string"?rn$2(e,t)>=0:false}var De$2={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function HE(e){return e.substring(De$2.key,De$2.keyEnd)}function BE(e){return $E(e),Vp(e,Hp(e,0,De$2.textEnd))}function Vp(e,t){let n=De$2.textEnd;return n===t?-1:(t=De$2.keyEnd=UE(e,De$2.key=t,n),Hp(e,t,n))}function $E(e){De$2.key=0,De$2.keyEnd=0,De$2.value=0,De$2.valueEnd=0,De$2.textEnd=e.length;}function Hp(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function UE(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function Bp(e,t,n){return Up(e,t,n,false),Bp}function $p(e,t){return Up(e,t,null,true),$p}function WE(e){GE(JE,qE,e,true);}function qE(e,t){for(let n=BE(t);n>=0;n=Vp(t,n))Io$2(e,HE(t),true);}function Up(e,t,n,r){let o=m$1(),i=P$1(),s=Xn$2(2);if(i.firstUpdatePass&&qp(i,e,s,r),t!==q$2&&oe$1(o,s,t)){let a=i.data[Ie()];Gp(i,a,o,o[O$1],e,o[s+1]=eD(t,n),r,s);}}function GE(e,t,n,r){let o=P$1(),i=Xn$2(2);o.firstUpdatePass&&qp(o,null,i,r);let s=m$1();if(n!==q$2&&oe$1(s,i,n)){let a=o.data[Ie()];if(zp(a,r)&&!Wp(o,i)){let c=a.classesWithoutHost;c!==null&&(n=fo$2(c,n||"")),Wa$2(o,a,s,n,r);}else XE(o,a,s,s[O$1],s[i+1],s[i+1]=KE(e,t,n),r,i);}}function Wp(e,t){return t>=e.expandoStartIndex}function qp(e,t,n,r){let o=e.data;if(o[n+1]===null){let i=o[Ie()],s=Wp(e,n);zp(i,r)&&t===null&&!s&&(t=false),t=zE(o,i,t,r),FE(o,i,t,n,s,r);}}function zE(e,t,n,r){let o=bu$1(e),i=r?t.residualClasses:t.residualStyles;if(o===null)(r?t.classBindings:t.styleBindings)===0&&(n=la$3(null,e,t,n,r),n=gr$2(n,t.attrs,r),i=null);else {let s=t.directiveStylingLast;if(s===-1||e[s]!==o)if(n=la$3(o,e,t,n,r),i===null){let c=QE(e,t,r);c!==void 0&&Array.isArray(c)&&(c=la$3(null,e,t,c[1],r),c=gr$2(c,t.attrs,r),ZE(e,t,r,c));}else i=YE(e,t,r);}return i!==void 0&&(r?t.residualClasses=i:t.residualStyles=i),n}function QE(e,t,n){let r=n?t.classBindings:t.styleBindings;if(Tn$1(r)!==0)return e[Bt$1(r)]}function ZE(e,t,n,r){let o=n?t.classBindings:t.styleBindings;e[Bt$1(o)]=r;}function YE(e,t,n){let r,o=t.directiveEnd;for(let i=1+t.directiveStylingLast;i<o;i++){let s=e[i].hostAttrs;r=gr$2(r,s,n);}return gr$2(r,t.attrs,n)}function la$3(e,t,n,r,o){let i=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(i=t[a],r=gr$2(r,i.hostAttrs,o),i!==e);)a++;return e!==null&&(n.directiveStylingLast=a),r}function gr$2(e,t,n){let r=n?1:2,o=-1;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];typeof s=="number"?o=s:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Io$2(e,s,n?true:t[++i]));}return e===void 0?null:e}function KE(e,t,n){if(n==null||n==="")return z;let r=[],o=bn$1(n);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],true);else if(o instanceof Set)for(let i of o)e(r,i,true);else if(typeof o=="object")for(let i in o)Object.hasOwn(o,i)&&e(r,i,o[i]);else typeof o=="string"&&t(r,o);return r}function JE(e,t,n){let r=String(t);r!==""&&!r.includes(" ")&&Io$2(e,r,n);}function XE(e,t,n,r,o,i,s,a){o===q$2&&(o=z);let c=0,l=0,u=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;u!==null||d!==null;){let p=c<o.length?o[c+1]:void 0,f=l<i.length?i[l+1]:void 0,h=null,g;u===d?(c+=2,l+=2,p!==f&&(h=d,g=f)):d===null||u!==null&&u<d?(c+=2,h=u):(l+=2,h=d,g=f),h!==null&&Gp(e,t,n,r,h,g,s,a),u=c<o.length?o[c]:null,d=l<i.length?i[l]:null;}}function Gp(e,t,n,r,o,i,s,a){if(!(t.type&3))return;let c=e.data,l=c[a+1],u=LE(l)?_d$1(c,t,n,o,Tn$1(l),s):void 0;if(!pi$2(u)){pi$2(i)||OE(l)&&(i=_d$1(c,null,n,o,a,s));let d=As$1(Ie(),n);ov(r,s,d,o,i);}}function _d$1(e,t,n,r,o,i){let s=t===null,a;for(;o>0;){let c=e[o],l=Array.isArray(c),u=l?c[1]:c,d=u===null,p=n[o+1];p===q$2&&(p=d?z:void 0);let f=d?Eo$2(p,r):u===r?p:void 0;if(l&&!pi$2(f)&&(f=Eo$2(c,r)),pi$2(f)&&(a=f,s))return a;let h=e[o+1];o=s?Bt$1(h):Tn$1(h);}if(t!==null){let c=i?t.residualClasses:t.residualStyles;c!=null&&(a=Eo$2(c,r));}return a}function pi$2(e){return e!==void 0}function eD(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=qn$2(bn$1(e)))),e}function zp(e,t){return (e.flags&(t?8:16))!==0}function tD(e,t=""){let n=m$1(),r=P$1(),o=e+L,i=r.firstCreatePass?_n$1(r,o,1,t,null):r.data[o],s=nD(r,n,i,t);n[o]=s,ko$2()&&sc$1(r,n,s,i),un$2(i,false);}var nD=(e,t,n,r)=>(tr$2(true),fy(t[O$1],r));function rD(e,t,n,r=""){return oe$1(e,ze$3(),n)?t+ce$2(n)+r:q$2}function oD(e,t,n,r,o,i=""){let s=qs$1(),a=ni$1(e,s,n,o);return Xn$2(2),a?t+ce$2(n)+r+ce$2(o)+i:q$2}function iD(e,t,n,r,o,i,s,a,c,l=""){let u=qs$1(),d=Zv(e,u,n,o,s,c);return Xn$2(4),d?t+ce$2(n)+r+ce$2(o)+i+ce$2(s)+a+ce$2(c)+l:q$2}function Qp$1(e){return kc$1("",e),Qp$1}function kc$1(e,t,n){let r=m$1(),o=rD(r,e,t,n);return o!==q$2&&Oc$1(r,Ie(),o),kc$1}function Zp$1(e,t,n,r,o){let i=m$1(),s=oD(i,e,t,n,r,o);return s!==q$2&&Oc$1(i,Ie(),s),Zp$1}function Yp(e,t,n,r,o,i,s,a,c){let l=m$1(),u=iD(l,e,t,n,r,o,i,s,a,c);return u!==q$2&&Oc$1(l,Ie(),u),Yp}function Oc$1(e,t,n){let r=As$1(t,e);py(e[O$1],r,n);}function Kp$1(e,t,n){Lo$2(t)&&(t=t());let r=m$1(),o=ze$3();if(oe$1(r,o,t)){P$1();let s=dn$1();xf(s,r,e,t,r[O$1],n);}return Kp$1}function sD(e,t){let n=Lo$2(e);return n&&e.set(t),n}function Jp$1(e,t){let n=m$1(),r=P$1(),o=H$1();return Op(r,n,n[O$1],o,e,t),Jp$1}function aD(e){return oe$1(m$1(),ze$3(),e)?ce$2(e):q$2}function Md$1(e,t,n){let r=P$1();r.firstCreatePass&&Xp(t,r.data,r.blueprint,ve(e),n);}function Xp(e,t,n,r,o){if(e=B$2(e),Array.isArray(e))for(let i=0;i<e.length;i++)Xp(e[i],t,n,r,o);else {let i=P$1(),s=m$1(),a=H$1(),c=_t$1(e)?e:B$2(e.provide),l=bs$1(e),u=a.providerIndexes&1048575,d=a.directiveStart,p=a.providerIndexes>>20;if(_t$1(e)||!e.multi){let f=new jt$2(l,o,Cr$2,null),h=da$3(c,t,u+p,d);h===-1?(ha$3(Yo$2(a,s),i,c),ua$3(i,e,t.length),t.push(c),a.directiveStart++,a.directiveEnd++,n.push(f),s.push(f)):(n[h]=f,s[h]=f);}else {let f=da$3(c,t,u+p,d),h=da$3(c,t,u,u+p),g=f>=0&&n[f],_=h>=0&&n[h];if(!g){ha$3(Yo$2(a,s),i,c);let M=uD(cD,n.length,o,r,l);_&&(n[h].providerFactory=M),ua$3(i,e,t.length,0),t.push(c),a.directiveStart++,a.directiveEnd++,n.push(M),s.push(M);}else {let M=eh(n[f],l,r);ua$3(i,e,f>-1?f:h,M);}r&&_&&n[h].componentProviders++;}}}function ua$3(e,t,n,r){let o=_t$1(t),i=su$1(t);if(o||i){let c=(i?B$2(t.useClass):t).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!o&&t.multi){let u=l.indexOf(n);u===-1?l.push(n,[r,c]):l[u+1].push(r,c);}else l.push(n,c);}}}function eh(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function da$3(e,t,n,r){for(let o=n;o<r;o++)if(t[o]===e)return o;return  -1}function cD(e,t,n,r,o){return za$2(this.multi,[])}function za$2(e,t){for(let n=0;n<e.length;n++){let r=e[n];t.push(r());}return t}function uD(e,t,n,r,o,i){let s=new jt$2(e,n,Cr$2,null);return s.multi=[],s.index=t,s.componentProviders=0,eh(s,o,r&&!n),s}function dD(e,t){return n=>{n.providersResolver=(r,o)=>Md$1(r,o?o(e):e,false);}}function fD(e,t){let n=Jn$2()+e,r=m$1();return r[n]===q$2?yc$1(r,n,t()):Qv(r,n)}function pD(e,t,n){return nh(m$1(),Jn$2(),e,t,n)}function th(e,t){let n=e[t];return n===q$2?void 0:n}function nh(e,t,n,r,o,i){let s=t+n;return oe$1(e,s,o)?yc$1(e,s+1,i?r.call(i,o):r(o)):th(e,s+1)}function hD(e,t,n,r,o,i,s){let a=t+n;return ni$1(e,a,o,i)?yc$1(e,a+2,s?r.call(s,o,i):r(o,i)):th(e,a+2)}function gD(e,t){let n=P$1(),r,o=e+L;n.firstCreatePass?(r=mD(t,n.pipeRegistry),n.data[o]=r,r.onDestroy&&(n.destroyHooks??=[]).push(o,r.onDestroy)):r=n.data[o];let i=r.factory||(r.factory=tt$3(r.type)),a=K$1(Cr$2);try{let c=Zo$2(!1),l=i();return Zo$2(c),Rs$1(n,m$1(),o,l),l}finally{K$1(a);}}function mD(e,t){if(t)for(let n=t.length-1;n>=0;n--){let r=t[n];if(e===r.name)return r}}function yD(e,t,n){let r=e+L,o=m$1(),i=Co$2(o,r);return rh(o,r)?nh(o,Jn$2(),t,i.transform,n,i):i.transform(n)}function vD(e,t,n,r){let o=e+L,i=m$1(),s=Co$2(i,o);return rh(i,o)?hD(i,Jn$2(),t,s.transform,n,r,s):s.transform(n,r)}function rh(e,t){return e[y$1].data[t].pure}function ID(e,t){return Ci$2(e,t)}var oh=(()=>{class e{applicationErrorHandler=T$1(Lt$2);appRef=T$1(_i$3);taskService=T$1(Pt$3);ngZone=T$1(Ne$1);zonelessEnabled=T$1(rr$2);tracing=T$1($t$2,{optional:true});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:true}}];subscriptions=new G;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get($n$1):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(T$1(ea$3,{optional:true})??false);cancelScheduledCallback=null;useMicrotaskScheduler=false;runningTick=false;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let n=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(n);return}this.switchToMicrotaskScheduler(),this.taskService.remove(n);})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup();}));}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let n=this.taskService.add();this.useMicrotaskScheduler=true,queueMicrotask(()=>{this.useMicrotaskScheduler=false,this.taskService.remove(n);});});}notify(n){if(!this.zonelessEnabled&&n===5)return;switch(n){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8;}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Lu$1:Ys$1;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()));}shouldScheduleTick(){return !(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get($n$1+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick();},void 0,this.schedulerTickApplyArgs);}catch(r){this.applicationErrorHandler(r);}finally{this.taskService.remove(n),this.cleanup();}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup();}cleanup(){if(this.runningTick=false,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n);}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function ED(){return Ye$2("NgZoneless"),Ds$1([...Pc$1(),[]])}function Pc$1(){return [{provide:Se$2,useExisting:oh},{provide:Ne$1,useClass:Un$2},{provide:rr$2,useValue:true}]}var DD=(()=>{class e{compileModuleSync(n){return new li$1(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function wD(){return typeof $localize<"u"&&$localize.locale||br$2}var Lc$1=new x("",{factory:()=>T$1(Lc$1,{optional:true,skipSelf:true})||wD()});var _r$2=class _r{destroyed=false;listeners=null;errorHandler=T$1(We$1,{optional:true});isEmitting=false;hasNullListeners=false;destroyRef=T$1(Oe$1);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=true,this.listeners=null;});}subscribe(t){if(this.destroyed)throw new b(953,false);return (this.listeners??=[]).push(t),{unsubscribe:()=>{let n=this.listeners?this.listeners.indexOf(t):-1;n>-1&&(this.isEmitting?(this.hasNullListeners=true,this.listeners[n]=null):this.listeners.splice(n,1));}}}emit(t){if(this.destroyed){console.warn(Wn$2(953,false));return}if(this.listeners===null)return;this.isEmitting=true;let n=v$1(null);try{for(let r of this.listeners)try{r!==null&&r(t);}catch(o){this.errorHandler?.handleError(o);}}finally{this.hasNullListeners&&(this.hasNullListeners=false,this.listeners&&TD(this.listeners)),v$1(n),this.isEmitting=false;}}};function TD(e){let t=e.length-1;for(;t>-1;)e[t]===null&&e.splice(t,1),t--;}var CD=new x("");function dt$2(e,t){return Fn$2(e,t?.equal)}function ie$1(e){return Bl$1(e)}var Fc$1=class Fc extends Error{dependency;constructor(t){super("Dependency error",{cause:t.error()}),this.name="ResourceDependencyError",this.dependency=t;}},Mn=class e extends Error{_brand;constructor(t){super(t);}static IDLE=new e("IDLE");static LOADING=new e("LOADING")},bD=e=>e;function jc$1(e,t){if(typeof e=="function"){let n=Ji$2(e,bD,t?.equal);return ih(n)}else {let n=Ji$2(e.source,e.computation,e.equal);return ih(n,e.debugName)}}function ih(e,t){let n=e[j$1],r=e;return r.set=o=>Vl$1(n,o),r.update=o=>Hl$1(n,o),r.asReadonly=fn$1.bind(e),r}function Xx(e){let t=e.request,n=e.params??t??(()=>null);return new Hc$1(n,MD(e),e.defaultValue,e.equal?_D(e.equal):void 0,e.debugName,e.injector??T$1(ae$1),e.id)}var Vc$1=class Vc{value;isLoading;constructor(t,n){this.value=t,this.value.set=this.set.bind(this),this.value.update=this.update.bind(this),this.value.asReadonly=fn$1,this.isLoading=dt$2(()=>this.status()==="loading"||this.status()==="reloading",void 0);}isError=dt$2(()=>this.status()==="error");update(t){this.set(t(ie$1(this.value)));}isValueDefined=dt$2(()=>this.isError()?false:this.value()!==void 0);_snapshot;get snapshot(){return this._snapshot??=dt$2(()=>{let t=this.status();return t==="error"?{status:"error",error:this.error()}:{status:t,value:this.value()}})}hasValue(){return this.isValueDefined()}asReadonly(){return this}},Hc$1=class Hc extends Vc$1{loaderFn;equal;debugName;transferCacheKey;pendingTasks;state;extRequest;effectRef;pendingController;resolvePendingTask=void 0;destroyed=false;unregisterOnDestroy;status;error;transferState;constructor(t,n,r,o,i,s,a,c){if(ch())throw lh();super(dt$2(()=>{let u=this.state().stream?.();if(!u||this.state().status==="loading"&&this.error())return r;if(!Bc$1(u))throw new Mi$2(this.error());return u.value},{equal:o}),i),this.loaderFn=n,this.equal=o,this.debugName=i,this.transferCacheKey=a;let l=s.get(CD,void 0,{optional:true})??{isActive:false};this.transferState=s.get(Oo$2,void 0,{optional:true})??void 0,this.extRequest=jc$1(()=>{try{return Wc$1(!0),{request:t(AD),reload:0}}catch(u){return qc$1(u),u===Mn.IDLE?{status:"idle",reload:0}:u===Mn.LOADING?{status:"loading",reload:0}:{error:u,reload:0}}finally{Wc$1(false);}},void 0),this.state=jc$1({source:this.extRequest,computation:(u,d)=>{let{request:p,status:f,error:h}=u,g;if(h)f="resolved",g=Pe$2({error:$c$1(h)},void 0);else if(!f)if(d)f=p===void 0?"idle":"loading",d.value.extRequest.request===p&&(g=d.value.stream);else {let _=this.transferState,M=this.transferCacheKey;l.isActive&&M&&_&&p!==void 0&&_.hasKey(M)&&(g=Pe$2({value:_.get(M,r)},void 0)),g||(g=c?.(u.request)),c=void 0,f=p===void 0?"idle":g?"resolved":"loading";}return {extRequest:u,status:f,previousStatus:d?sh(d.value):"idle",stream:g}}}),this.effectRef=ta$3(this.loadEffect.bind(this),{injector:s,manualCleanup:true}),this.pendingTasks=s.get(Fo$2),this.unregisterOnDestroy=s.get(Oe$1).onDestroy(()=>this.destroy()),this.status=dt$2(()=>sh(this.state()),void 0),this.error=dt$2(()=>{let u=this.state().stream?.();return u&&!Bc$1(u)?u.error:void 0},void 0);}set(t){if(this.destroyed)return;let n=ie$1(this.error),r=ie$1(this.state);if(!n){let o=ie$1(this.value);if(r.status==="local"&&(this.equal?this.equal(o,t):o===t))return}this.state.set({extRequest:r.extRequest,status:"local",previousStatus:"local",stream:Pe$2({value:t},void 0)}),this.abortInProgressLoad();}reload(){let{status:t}=ie$1(this.state);return t==="idle"||t==="loading"?false:(this.extRequest.update(({request:n,reload:r})=>({request:n,reload:r+1})),true)}destroy(){this.destroyed=true,this.unregisterOnDestroy(),this.effectRef.destroy(),this.abortInProgressLoad(),this.state.set({extRequest:{request:void 0,reload:0},status:"idle",previousStatus:"idle",stream:void 0});}loadEffect(){return C$1(this,null,function*(){let t=this.extRequest(),{status:n,previousStatus:r}=ie$1(this.state);if(t.request===void 0)return;if(n!=="loading")return;this.abortInProgressLoad();let o=this.resolvePendingTask=this.pendingTasks.add(),{signal:i}=this.pendingController=new AbortController;try{let s=ie$1(()=>this.loaderFn({params:t.request,abortSignal:i,previous:{status:r}})),a=()=>i.aborted||ie$1(this.extRequest)!==t;if(or$2(s)){if(a())return;this.state.set({extRequest:t,status:"resolved",previousStatus:"resolved",stream:s});let c=ie$1(s);}else {let c=yield s;if(a())return;this.state.set({extRequest:t,status:"resolved",previousStatus:"resolved",stream:c});let l=c?ie$1(c):void 0;}}catch(s){if(qc$1(s),i.aborted||ie$1(this.extRequest)!==t)return;this.state.set({extRequest:t,status:"resolved",previousStatus:"error",stream:Pe$2({error:$c$1(s)},void 0)});}finally{o?.(),o=void 0;}})}abortInProgressLoad(){ie$1(()=>this.pendingController?.abort()),this.pendingController=void 0,this.resolvePendingTask?.(),this.resolvePendingTask=void 0;}};function _D(e){return (t,n)=>t===void 0||n===void 0?t===n:e(t,n)}function MD(e){return ND(e)?e.stream:t=>C$1(null,null,function*(){try{return Pe$2({value:yield e.loader(t)},void 0)}catch(n){return Pe$2({error:$c$1(n)},void 0)}})}function ND(e){return !!e.stream}function sh(e){switch(e.status){case "loading":return e.extRequest.reload===0?"loading":"reloading";case "resolved":return Bc$1(e.stream())?"resolved":"error";default:return e.status}}function Bc$1(e){return e.error===void 0}function $c$1(e){return SD(e)?e:new Uc$1(e)}function SD(e){return e instanceof Error||typeof e=="object"&&typeof e.name=="string"&&typeof e.message=="string"}var Mi$2=class Mi extends Error{constructor(t){super(t.message,{cause:t});}},Uc$1=class Uc extends Error{constructor(t){super(String(t),{cause:t});}};function xD(e){switch(e.status()){case "idle":throw Mn.IDLE;case "error":throw new Fc$1(e);case "loading":case "reloading":throw Mn.LOADING}return e.value()}var AD={chain:xD},ah=false;function ch(){return ah}function Wc$1(e){ah=e;}function lh(){return new b(992,false)}function qc$1(e){if(e instanceof b&&e.code===992)throw e}var Si$2=Symbol("InputSignalNode#UNSET"),mh=x$1(w$2({},jn$2),{transformFn:void 0,applyValueToInputSignal(e,t){et$4(e,t);}});function yh(e,t){let n=Object.create(mh);n.value=e,n.transformFn=t?.transform;function r(){if(Ve$3(n),n.value===Si$2){let o=null;throw new b(-950,o)}return n.value}return r[j$1]=n,r}var uh=class{attributeName;constructor(t){this.attributeName=t;}__NG_ELEMENT_ID__=()=>Ud$1(this.attributeName);toString(){return `HostAttributeToken ${this.attributeName}`}},qL=(()=>{let e=new x("");return e.__NG_ELEMENT_ID__=t=>{let n=H$1();if(n===null)throw new b(-204,false);if(n.type&2)return n.value;if(t&8)return null;throw new b(-204,false)},e})();function GL(e){return RD(e)?e.default:e}function RD(e){return e&&typeof e=="object"&&"default"in e}function zL(e){return new _r$2}function dh(e,t){return yh(e,t)}function kD(e){return yh(Si$2,e)}var QL=(dh.required=kD,dh);function vh(e,t){let n=Object.create(mh),r=new _r$2;n.value=e;function o(){return Ve$3(n),fh(n.value),n.value}return o[j$1]=n,o.asReadonly=fn$1.bind(o),o.set=i=>{n.equal(n.value,i)||(et$4(n,i),r.emit(i));},o.update=i=>{fh(n.value),o.set(i(n.value));},o.subscribe=r.subscribe.bind(r),o.destroyRef=r.destroyRef,o}function fh(e){if(e===Si$2)throw new b(952,false)}function ph(e,t){return vh(e)}function OD(e){return vh(Si$2)}var ZL=(ph.required=OD,ph);function hh(e,t){return Tc$1()}function PD(e,t){return Cc$1()}var YL=(hh.required=PD,hh);function gh(e,t){return Tc$1()}function LD(e,t){return Cc$1()}var KL=(gh.required=LD,gh);var XL=(()=>{class e{static __NG_ELEMENT_ID__=jD}return e})();function jD(e){return VD(H$1(),m$1(),(e&16)===16)}function VD(e,t,n){if(Ge$2(e)&&!n){let r=pe$2(e.index,t);return new ut$2(r,r)}else if(e.type&175){let r=t[Z$1];return new ut$2(r,t)}return null}var zc$1=new x(""),HD=new x("");function Mr$2(e){return !e.moduleRef}function BD(e){let t=Mr$2(e)?e.r3Injector:e.moduleRef.injector,n=t.get(Ne$1);return n.run(()=>{Mr$2(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(Lt$2),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:r});}),Mr$2(e)){let i=()=>t.destroy(),s=e.platformInjector.get(zc$1);s.add(i),t.onDestroy(()=>{o.unsubscribe(),s.delete(i);});}else {let i=()=>e.moduleRef.destroy(),s=e.platformInjector.get(zc$1);s.add(i),e.moduleRef.onDestroy(()=>{ar$2(e.allPlatformModules,e.moduleRef),o.unsubscribe(),s.delete(i);});}return UD(r,n,()=>{let i=t.get(Pt$3),s=i.add(),a=t.get(_c$1);return a.runInitializers(),a.donePromise.then(()=>{let c=t.get(Lc$1,br$2);if(Ap(c||br$2),!t.get(HD,!0))return Mr$2(e)?t.get(_i$3):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Mr$2(e)){let u=t.get(_i$3);return e.rootComponent!==void 0&&u.bootstrap(e.rootComponent),u}else return $D?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{i.remove(s);})})})}var $D;function UD(e,t,n){try{let r=n();return bc$1(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e(r)),r}}var Ni$1=null;function WD(e=[],t){return ae$1.create({name:t,providers:[{provide:Cs$1,useValue:"platform"},{provide:zc$1,useValue:new Set([()=>Ni$1=null])},...e]})}function qD(e=[]){if(Ni$1)return Ni$1;let t=WD(e);return Ni$1=t,Tp$1(),GD(t),t}function GD(e){let t=e.get(Vu,null);Do$2(e,()=>{t?.forEach(n=>n());});}function eF(e){let{rootComponent:t,appProviders:n,platformProviders:r,platformRef:o}=e;R$1(S.BootstrapApplicationStart);try{let i=o?.injector??qD(r),s=[Pc$1(),ju,...n||[]],a=new hr$2({providers:s,parent:i,debugName:"",runEnvironmentInitializers:!1});return BD({r3Injector:a.injector,platformInjector:i,rootComponent:t})}catch(i){return Promise.reject(i)}finally{R$1(S.BootstrapApplicationEnd);}}function tF(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function nF(e,t=NaN){return !isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):t}var Gc$1=Symbol("NOT_SET"),Ih=new Set,zD=x$1(w$2({},jn$2),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,value:Gc$1,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=true;}this.sequence.scheduler.notify(7);},phaseFn(e){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=false,this.value!==Gc$1&&!Kt$2(this))return this.signal;try{for(let o of this.cleanup??Ih)o();}finally{this.cleanup?.clear();}let t=[];e!==void 0&&t.push(e),t.push(this.registerCleanupFn);let n=He$2(this),r;try{r=this.userFn.apply(null,t);}finally{Je$3(this,n);}return (this.value===Gc$1||!this.equal(this.value,r))&&(this.value=r,this.version++),this.signal}}),Qc$1=class Qc extends lr$2{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(t,n,r,o,i,s=null){super(t,[void 0,void 0,void 0,void 0],r,false,i.get(Oe$1),s),this.scheduler=o;for(let a of nc$1){let c=n[a];if(c===void 0)continue;let l=Object.create(zD);l.sequence=this,l.phase=a,l.userFn=c,l.dirty=true,l.signal=()=>(Ve$3(l),l.value),l.signal[j$1]=l,l.registerCleanupFn=u=>(l.cleanup??=new Set).add(u),this.nodes[a]=l,this.hooks[a]=u=>l.phaseFn(u);}}afterRun(){super.afterRun(),this.lastPhase=null;}destroy(){if(this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();super.destroy();for(let t of this.nodes)if(t)try{for(let n of t.cleanup??Ih)n();}finally{Xe$2(t);}}};function rF(e,t){let n=T$1(ae$1),r=n.get(Se$2),o=n.get(vi$2),i=n.get($t$2,null,{optional:true});o.impl??=n.get(rc$1);let s=e;typeof s=="function"&&(s={mixedReadWrite:e});let a=n.get(pn$1,null,{optional:true}),c=new Qc$1(o.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,r,n,i?.snapshot(null));return o.impl.register(c),c}function oF(e,t){let n=rt$1(e),r=t.elementInjector||on$2();return new En(n).create(r,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}
var jo$2=null;function ue$1(){return jo$2}function Xi(i){jo$2??=i;}var Ut$2=class Ut{},pt=(()=>{class i{historyGo(e){throw new Error("")}static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:()=>T$1(Uo$2),providedIn:"platform"})}return i})();var Uo$2=(()=>{class i extends pt{_location;_history;_doc=T$1(nr$2);constructor(){super(),this._location=window.location,this._history=window.history;}getBaseHrefFromDOM(){return ue$1().getBaseHref(this._doc)}onPopState(e){let n=ue$1().getGlobalEventTarget(this._doc,"window");return n.addEventListener("popstate",e,false),()=>n.removeEventListener("popstate",e)}onHashChange(e){let n=ue$1().getGlobalEventTarget(this._doc,"window");return n.addEventListener("hashchange",e,false),()=>n.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e;}pushState(e,n,r){this._history.pushState(e,n,r);}replaceState(e,n,r){this._history.replaceState(e,n,r);}forward(){this._history.forward();}back(){this._history.back();}historyGo(e=0){this._history.go(e);}getState(){return this._history.state}static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:()=>new i,providedIn:"platform"})}return i})();function $o$1(i,t){return i?t?i.endsWith("/")?t.startsWith("/")?i+t.slice(1):i+t:t.startsWith("/")?i+t:`${i}/${t}`:i:t}function zo$2(i){let t=i.search(/#|\?|$/);return i[t-1]==="/"?i.slice(0,t-1)+i.slice(t):i}function Le$1(i){return i&&i[0]!=="?"?`?${i}`:i}var Fn$1=(()=>{class i{historyGo(e){throw new Error("")}static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:()=>T$1(hl),providedIn:"root"})}return i})(),fl=new x(""),hl=(()=>{class i extends Fn$1{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,n){super(),this._platformLocation=e,this._baseHref=n??this._platformLocation.getBaseHrefFromDOM()??T$1(nr$2).location?.origin??"";}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()();}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e));}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return $o$1(this._baseHref,e)}path(e=false){let n=this._platformLocation.pathname+Le$1(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${n}${r}`:n}pushState(e,n,r,o){let s=this.prepareExternalUrl(r+Le$1(o));this._platformLocation.pushState(e,n,s);}replaceState(e,n,r,o){let s=this.prepareExternalUrl(r+Le$1(o));this._platformLocation.replaceState(e,n,s);}forward(){this._platformLocation.forward();}back(){this._platformLocation.back();}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e);}static \u0275fac=function(n){return new(n||i)(Me$3(pt),Me$3(fl,8))};static \u0275prov=te$1({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var Rn=(()=>{class i{_subject=new ee$1;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let n=this._locationStrategy.getBaseHref();this._basePath=gl(zo$2(Ho$2(n))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(true),pop:true,state:r.state,type:r.type});});}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[];}path(e=false){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,n=""){return this.path()==this.normalize(e+Le$1(n))}normalize(e){return i.stripTrailingSlash(pl(this._basePath,Ho$2(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,n="",r=null){this._locationStrategy.pushState(r,"",e,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Le$1(n)),r);}replaceState(e,n="",r=null){this._locationStrategy.replaceState(r,"",e,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Le$1(n)),r);}forward(){this._locationStrategy.forward();}back(){this._locationStrategy.back();}historyGo(e=0){this._locationStrategy.historyGo?.(e);}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(n=>{this._notifyUrlChangeListeners(n.url,n.state);}),()=>{let n=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(n,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null);}}_notifyUrlChangeListeners(e="",n){this._urlChangeListeners.forEach(r=>r(e,n));}subscribe(e,n,r){return this._subject.subscribe({next:e,error:n??void 0,complete:r??void 0})}static normalizeQueryParams=Le$1;static joinWithSlash=$o$1;static stripTrailingSlash=zo$2;static \u0275fac=function(n){return new(n||i)(Me$3(Fn$1))};static \u0275prov=te$1({token:i,factory:()=>ml(),providedIn:"root"})}return i})();function ml(){return new Rn(Me$3(Fn$1))}function pl(i,t){if(!i||!t.startsWith(i))return t;let e=t.substring(i.length);return e===""||["/",";","?","#"].includes(e[0])?e:t}function Ho$2(i){return i.replace(/\/index\.html$/,"")}function gl(i){if(new RegExp("^(https?:)?//").test(i)){let[,e]=i.split(/\/\/[^\/]+/);return e}return i}var Zi$1=/\s+/,Go$1=[],_l=(()=>{class i{_ngEl;_renderer;initialClasses=Go$1;rawClass;stateMap=new Map;constructor(e,n){this._ngEl=e,this._renderer=n;}set klass(e){this.initialClasses=e!=null?e.trim().split(Zi$1):Go$1;}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(Zi$1):e;}ngDoCheck(){for(let n of this.initialClasses)this._updateState(n,true);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let n of e)this._updateState(n,true);else if(e!=null)for(let n of Object.keys(e))this._updateState(n,!!e[n]);this._applyStateDiff();}_updateState(e,n){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==n&&(r.changed=true,r.enabled=n),r.touched=true):this.stateMap.set(e,{enabled:n,changed:true,touched:true});}_applyStateDiff(){for(let e of this.stateMap){let n=e[0],r=e[1];r.changed?(this._toggleClass(n,r.enabled),r.changed=false):r.touched||(r.enabled&&this._toggleClass(n,false),this.stateMap.delete(n)),r.touched=false;}}_toggleClass(e,n){e=e.trim(),e.length>0&&e.split(Zi$1).forEach(r=>{n?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r);});}static \u0275fac=function(n){return new(n||i)(Cr$2(vr$2),Cr$2(Gv$1))};static \u0275dir=GI({type:i,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return i})();var Ki$1=(()=>{class i{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=T$1(ae$1);constructor(e){this._viewContainerRef=e;}ngOnChanges(e){if(this._shouldRecreateView(e)){let n=this._viewContainerRef;if(this._viewRef&&n.remove(n.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=n.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()});}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return !!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,n,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,n,r):false,get:(e,n,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,n,r)}})}static \u0275fac=function(n){return new(n||i)(Cr$2(bi$2))};static \u0275dir=GI({type:i,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[lm]})}return i})();function zt$3(i,t){t=encodeURIComponent(t);for(let e of i.split(";")){let n=e.indexOf("="),[r,o]=n==-1?[e,""]:[e.slice(0,n),e.slice(n+1)];if(r.trim()===t)return decodeURIComponent(o)}return null}var qi$2="browser";function Yo$1(i){return i===qi$2}var Ht$2=class Ht{_doc;constructor(t){this._doc=t;}manager},Tn=(()=>{class i extends Ht$2{constructor(e){super(e);}supports(e){return  true}addEventListener(e,n,r,o){return e.addEventListener(n,r,o),()=>this.removeEventListener(e,n,r,o)}removeEventListener(e,n,r,o){return e.removeEventListener(n,r,o)}static \u0275fac=function(n){return new(n||i)(Me$3(nr$2))};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),kn=new x(""),tr$1=(()=>{class i{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,n){this._zone=n,e.forEach(s=>{s.manager=this;});let r=e.filter(s=>!(s instanceof Tn));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof Tn);o&&this._plugins.push(o);}addEventListener(e,n,r,o){return this._findPluginFor(n).addEventListener(e,n,r,o)}getZone(){return this._zone}_findPluginFor(e){let n=this._eventNameToPlugin.get(e);if(n)return n;if(n=this._plugins.find(o=>o.supports(e)),!n)throw new b(-5101,false);return this._eventNameToPlugin.set(e,n),n}static \u0275fac=function(n){return new(n||i)(Me$3(kn),Me$3(Ne$1))};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),Ji$1="ng-app-id";function Xo(i){for(let t of i)t.remove();}function Zo$1(i,t){let e=t.createElement("style");return e.textContent=i,e}function wl(i,t,e,n){let r=i.head?.querySelectorAll(`style[${Ji$1}="${t}"],link[${Ji$1}="${t}"]`);if(!r||r.length===0)return  false;for(let o of r)o.removeAttribute(Ji$1),o instanceof HTMLLinkElement?n.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]});return  true}function er$1(i,t){let e=t.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",i),e}var nr$1=(()=>{class i{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,n,r,o={}){this.doc=e,this.appId=n,this.nonce=r,wl(e,n,this.inline,this.external)&&this.hosts.add(e.head);}addStyles(e,n){for(let r of e)this.addUsage(r,this.inline,Zo$1);n?.forEach(r=>this.addUsage(r,this.external,er$1));}removeStyles(e,n){for(let r of e)this.removeUsage(r,this.inline);n?.forEach(r=>this.removeUsage(r,this.external));}addUsage(e,n,r){let o=n.get(e);o?o.usage++:n.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))});}removeUsage(e,n){let r=n.get(e);r&&(r.usage--,r.usage<=0&&(Xo(r.elements),n.delete(e)));}ngOnDestroy(){for(let[,{elements:e}]of [...this.inline,...this.external])Xo(e);this.hosts.clear();}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[n,{elements:r}]of this.inline)r.push(this.addElement(e,Zo$1(n,this.doc)));for(let[n,{elements:r}]of this.external)r.push(this.addElement(e,er$1(n,this.doc)));}}removeHost(e){this.hosts.delete(e);for(let n of [...this.inline.values(),...this.external.values()]){let r=[];for(let o of n.elements)o.parentNode===e?o.remove():r.push(o);n.elements=r;}}addElement(e,n){return this.nonce&&n.setAttribute("nonce",this.nonce),e.appendChild(n)}static \u0275fac=function(n){return new(n||i)(Me$3(nr$2),Me$3(Xs$1),Me$3(Qg,8),Me$3(Gg))};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),Qi$1={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},ir$1=/%COMP%/g;var qo$2="%COMP%",Cl=`_nghost-${qo$2}`,El=`_ngcontent-${qo$2}`,xl=true,Sl=new x("",{factory:()=>xl});function Al(i){return El.replace(ir$1,i)}function Ml(i){return Cl.replace(ir$1,i)}function Jo$1(i,t){return t.map(e=>e.replace(ir$1,i))}var rr$1=(()=>{class i{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,n,r,o,s,l,c=null,u=null){this.eventManager=e,this.sharedStylesHost=n,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=l,this.nonce=c,this.tracingService=u,this.defaultRenderer=new $t$1(e,s,l,this.tracingService);}createRenderer(e,n){if(!e||!n)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,n);return r instanceof In?r.applyToHost(e):r instanceof Gt$1&&r.applyStyles(),r}getOrCreateRenderer(e,n){let r=this.rendererByCompId,o=r.get(n.id);if(!o){let s=this.doc,l=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.tracingService;switch(n.encapsulation){case Vt.Emulated:o=new In(c,u,n,this.appId,d,s,l,f);break;case Vt.ShadowDom:return new On(c,e,n,s,l,this.nonce,f,u);case Vt.ExperimentalIsolatedShadowDom:return new On(c,e,n,s,l,this.nonce,f);default:o=new Gt$1(c,u,n,d,s,l,f);break}r.set(n.id,o);}return o}ngOnDestroy(){this.rendererByCompId.clear();}componentReplaced(e){this.rendererByCompId.delete(e);}static \u0275fac=function(n){return new(n||i)(Me$3(tr$1),Me$3(Yf),Me$3(Xs$1),Me$3(Sl),Me$3(nr$2),Me$3(Ne$1),Me$3(Qg),Me$3($t$2,8))};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),$t$1=class $t{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=true;constructor(t,e,n,r){this.eventManager=t,this.doc=e,this.ngZone=n,this.tracingService=r;}destroy(){}destroyNode=null;createElement(t,e){return e?this.doc.createElementNS(Qi$1[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(Ko$1(t)?t.content:t).appendChild(e);}insertBefore(t,e,n){t&&(Ko$1(t)?t.content:t).insertBefore(e,n);}removeChild(t,e){e.remove();}selectRootElement(t,e){let n=typeof t=="string"?this.doc.querySelector(t):t;if(!n)throw new b(-5104,false);return e||(n.textContent=""),n}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,n,r){if(r){e=r+":"+e;let o=Qi$1[r];o?t.setAttributeNS(o,e,n):t.setAttribute(e,n);}else t.setAttribute(e,n);}removeAttribute(t,e,n){if(n){let r=Qi$1[n];r?t.removeAttributeNS(r,e):t.removeAttribute(`${n}:${e}`);}else t.removeAttribute(e);}addClass(t,e){t.classList.add(e);}removeClass(t,e){t.classList.remove(e);}setStyle(t,e,n,r){r&(Xo$1.DashCase|Xo$1.Important)?t.style.setProperty(e,n,r&Xo$1.Important?"important":""):t.style[e]=n;}removeStyle(t,e,n){n&Xo$1.DashCase?t.style.removeProperty(e):t.style[e]="";}setProperty(t,e,n){t!=null&&(t[e]=n);}setValue(t,e){t.nodeValue=e;}listen(t,e,n,r){if(typeof t=="string"&&(t=ue$1().getGlobalEventTarget(this.doc,t),!t))throw new b(-5102,false);let o=this.decoratePreventDefault(n);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,e,o)),this.eventManager.addEventListener(t,e,o,r)}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;t(e)===false&&e.preventDefault();}}};function Ko$1(i){return i.tagName==="TEMPLATE"&&i.content!==void 0}var On=class extends $t$1{hostEl;sharedStylesHost;shadowRoot;constructor(t,e,n,r,o,s,l,c){super(t,r,o,l),this.hostEl=e,this.sharedStylesHost=c,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let u=n.styles;u=Jo$1(n.id,u);for(let f of u){let y=document.createElement("style");s&&y.setAttribute("nonce",s),y.textContent=f,this.shadowRoot.appendChild(y);}let d=n.getExternalStyles?.();if(d)for(let f of d){let y=er$1(f,r);s&&y.setAttribute("nonce",s),this.shadowRoot.appendChild(y);}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,n){return super.insertBefore(this.nodeOrShadowRoot(t),e,n)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot);}},Gt$1=class Gt extends $t$1{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,e,n,r,o,s,l,c){super(t,o,s,l),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let u=n.styles;this.styles=c?Jo$1(c,u):u,this.styleUrls=n.getExternalStyles?.(c);}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls);}destroy(){this.removeStylesOnCompDestroy&&vn$1.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls);}},In=class extends Gt$1{contentAttr;hostAttr;constructor(t,e,n,r,o,s,l,c){let u=r+"-"+n.id;super(t,e,n,o,s,l,c,u),this.contentAttr=Al(u),this.hostAttr=Ml(u);}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"");}createElement(t,e){let n=super.createElement(t,e);return super.setAttribute(n,this.contentAttr,""),n}};var Pn$1=class i extends Ut$2{supportsDOMEvents=true;static makeCurrent(){Xi(new i);}onAndCancel(t,e,n,r){return t.addEventListener(e,n,r),()=>{t.removeEventListener(e,n,r);}}dispatchEvent(t,e){t.dispatchEvent(e);}remove(t){t.remove();}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=Rl();return e==null?null:Tl(e)}resetBaseElement(){Wt=null;}getUserAgent(){return window.navigator.userAgent}getCookie(t){return zt$3(document.cookie,t)}},Wt=null;function Rl(){return Wt=Wt||document.head.querySelector("base"),Wt?Wt.getAttribute("href"):null}function Tl(i){return new URL(i,document.baseURI).pathname}var Qo$1=["alt","control","meta","shift"],Ol={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Il={alt:i=>i.altKey,control:i=>i.ctrlKey,meta:i=>i.metaKey,shift:i=>i.shiftKey},es$1=(()=>{class i extends Ht$2{constructor(e){super(e);}supports(e){return i.parseEventName(e)!=null}addEventListener(e,n,r,o){let s=i.parseEventName(n),l=i.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ue$1().onAndCancel(e,s.domEventName,l,o))}static parseEventName(e){let n=e.toLowerCase().split("."),r=n.shift();if(n.length===0||!(r==="keydown"||r==="keyup"))return null;let o=i._normalizeKey(n.pop()),s="",l=n.indexOf("code");if(l>-1&&(n.splice(l,1),s="code."),Qo$1.forEach(u=>{let d=n.indexOf(u);d>-1&&(n.splice(d,1),s+=u+".");}),s+=o,n.length!=0||o.length===0)return null;let c={};return c.domEventName=r,c.fullKey=s,c}static matchEventFullKeyCode(e,n){let r=Ol[e.key]||e.key,o="";return n.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?false:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Qo$1.forEach(s=>{if(s!==r){let l=Il[s];l(e)&&(o+=s+".");}}),o+=r,o===n)}static eventCallback(e,n,r){return o=>{i.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>n(o));}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(n){return new(n||i)(Me$3(nr$2))};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})();function kl(i,t,e){return C$1(this,null,function*(){let n=w$2({rootComponent:i},Pl(t,e));return eF(n)})}function Pl(i,t){return {platformRef:t?.platformRef,appProviders:[...jl,...i?.providers??[]],platformProviders:Bl}}function Nl(){Pn$1.makeCurrent();}function Ll(){return new We$1}function Vl(){return Pm(document),document}var Bl=[{provide:Gg,useValue:qi$2},{provide:Vu,useValue:Nl,multi:true},{provide:nr$2,useFactory:Vl}];var jl=[{provide:Cs$1,useValue:"root"},{provide:We$1,useFactory:Ll},{provide:kn,useClass:Tn,multi:true},{provide:kn,useClass:es$1,multi:true},rr$1,{provide:Yf,useClass:nr$1},{provide:nr$1,useExisting:Yf},tr$1,{provide:pr$2,useExisting:rr$1},[]];var Ae=class i{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(t){t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(e=>{let n=e.indexOf(":");if(n>0){let r=e.slice(0,n),o=e.slice(n+1).trim();this.addHeaderEntry(r,o);}});}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((e,n)=>{this.addHeaderEntry(n,e);})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([e,n])=>{this.setHeaderEntries(e,n);});}:this.headers=new Map;}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let e=this.headers.get(t.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,e){return this.clone({name:t,value:e,op:"a"})}set(t,e){return this.clone({name:t,value:e,op:"s"})}delete(t,e){return this.clone({name:t,value:e,op:"d"})}maybeSetNormalizedName(t,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,t);}init(){this.lazyInit&&(this.lazyInit instanceof i?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null));}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(e=>{this.headers.set(e,t.headers.get(e)),this.normalizedNames.set(e,t.normalizedNames.get(e));});}clone(t){let e=new i;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof i?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([t]),e}applyUpdate(t){let e=t.name.toLowerCase();switch(t.op){case "a":case "s":let n=t.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(t.name,e);let r=(t.op==="a"?this.headers.get(e):void 0)||[];r.push(...n),this.headers.set(e,r);break;case "d":let o=t.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else {let s=this.headers.get(e);if(!s)return;s=s.filter(l=>o.indexOf(l)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s);}break}}addHeaderEntry(t,e){let n=t.toLowerCase();this.maybeSetNormalizedName(t,n),this.headers.has(n)?this.headers.get(n).push(e):this.headers.set(n,[e]);}setHeaderEntries(t,e){let n=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=t.toLowerCase();this.headers.set(r,n),this.maybeSetNormalizedName(t,r);}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>t(this.normalizedNames.get(e),this.headers.get(e)));}};var Ln$1=class Ln{map=new Map;set(t,e){return this.map.set(t,e),this}get(t){return this.map.has(t)||this.map.set(t,t.defaultValue()),this.map.get(t)}delete(t){return this.map.delete(t),this}has(t){return this.map.has(t)}keys(){return this.map.keys()}},Vn$1=class Vn{encodeKey(t){return ts(t)}encodeValue(t){return ts(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}};function Ul(i,t){let e=new Map;return i.length>0&&i.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[s,l]=o==-1?[t.decodeKey(r),""]:[t.decodeKey(r.slice(0,o)),t.decodeValue(r.slice(o+1))],c=e.get(s)||[];c.push(l),e.set(s,c);}),e}var zl=/%(\d[a-f0-9])/gi,Hl={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function ts(i){return encodeURIComponent(i).replace(zl,(t,e)=>Hl[e]??t)}function Nn(i){return `${i}`}var Se$1=class i{map;encoder;updates=null;cloneFrom=null;constructor(t={}){if(this.encoder=t.encoder||new Vn$1,t.fromString){if(t.fromObject)throw new b(2805,false);this.map=Ul(t.fromString,this.encoder);}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(e=>{let n=t.fromObject[e],r=Array.isArray(n)?n.map(Nn):[Nn(n)];this.map.set(e,r);})):this.map=null;}has(t){return this.init(),this.map.has(t)}get(t){this.init();let e=this.map.get(t);return e?e[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,e){return this.clone({param:t,value:e,op:"a"})}appendAll(t){let e=[];return Object.keys(t).forEach(n=>{let r=t[n];Array.isArray(r)?r.forEach(o=>{e.push({param:n,value:o,op:"a"});}):e.push({param:n,value:r,op:"a"});}),this.clone(e)}set(t,e){return this.clone({param:t,value:e,op:"s"})}delete(t,e){return this.clone({param:t,value:e,op:"d"})}toString(){return this.init(),this.keys().map(t=>{let e=this.encoder.encodeKey(t);return this.map.get(t).map(n=>e+"="+this.encoder.encodeValue(n)).join("&")}).filter(t=>t!=="").join("&")}clone(t){let e=new i({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(t),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case "a":case "s":let e=(t.op==="a"?this.map.get(t.param):void 0)||[];e.push(Nn(t.value)),this.map.set(t.param,e);break;case "d":if(t.value!==void 0){let n=this.map.get(t.param)||[],r=n.indexOf(Nn(t.value));r!==-1&&n.splice(r,1),n.length>0?this.map.set(t.param,n):this.map.delete(t.param);}else {this.map.delete(t.param);break}}}),this.cloneFrom=this.updates=null);}};function $l(i){switch(i){case "DELETE":case "GET":case "HEAD":case "OPTIONS":case "JSONP":return  false;default:return  true}}function ns(i){return typeof ArrayBuffer<"u"&&i instanceof ArrayBuffer}function is(i){return typeof Blob<"u"&&i instanceof Blob}function rs(i){return typeof FormData<"u"&&i instanceof FormData}function Gl(i){return typeof URLSearchParams<"u"&&i instanceof URLSearchParams}var or$1="Content-Type",os="Accept",ls="text/plain",cs="application/json",Wl=`${cs}, ${ls}, */*`,gt$1=class i{url;body=null;headers;context;reportProgress=false;reportUploadProgress=false;reportDownloadProgress=false;withCredentials=false;credentials;keepalive=false;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(t,e,n,r){this.url=e,this.method=t.toUpperCase();let o;if($l(this.method)||r?(this.body=n!==void 0?n:null,o=r):o=n,o){if(this.reportProgress=!!o.reportProgress,this.reportUploadProgress=!!o.reportUploadProgress,this.reportDownloadProgress=!!o.reportDownloadProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new b(2822,"");this.timeout=o.timeout;}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache;}if(this.headers??=new Ae,this.context??=new Ln$1,!this.params)this.params=new Se$1,this.urlWithParams=e;else {let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else {let l=e,c="",u=e.indexOf("#");u!==-1&&(c=e.substring(u),l=e.substring(0,u));let d=l.indexOf("?"),f=d===-1?"?":d<l.length-1?"&":"";this.urlWithParams=l+f+s+c;}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||ns(this.body)||is(this.body)||rs(this.body)||Gl(this.body)?this.body:this.body instanceof Se$1?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||rs(this.body)?null:is(this.body)?this.body.type||null:ns(this.body)?null:typeof this.body=="string"?ls:this.body instanceof Se$1?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?cs:null}clone(t={}){let e=t.method||this.method,n=t.url||this.url,r=t.responseType||this.responseType,o=t.keepalive??this.keepalive,s=t.priority||this.priority,l=t.cache||this.cache,c=t.mode||this.mode,u=t.redirect||this.redirect,d=t.credentials||this.credentials,f=t.referrer??this.referrer,y=t.integrity||this.integrity,N=t.referrerPolicy||this.referrerPolicy,F=t.transferCache??this.transferCache,M=t.timeout??this.timeout,B=t.body!==void 0?t.body:this.body,De=t.withCredentials??this.withCredentials,Te=t.reportProgress??this.reportProgress,Oe=t.reportUploadProgress??this.reportUploadProgress,it=t.reportDownloadProgress??this.reportDownloadProgress,Rt=t.headers||this.headers,$e=t.params||this.params,gn=t.context??this.context;return t.setHeaders!==void 0&&(Rt=Object.keys(t.setHeaders).reduce((rt,Ge)=>rt.set(Ge,t.setHeaders[Ge]),Rt)),t.setParams&&($e=Object.keys(t.setParams).reduce((rt,Ge)=>rt.set(Ge,t.setParams[Ge]),$e)),new i(e,n,B,{params:$e,headers:Rt,context:gn,reportProgress:Te,reportUploadProgress:Oe,reportDownloadProgress:it,responseType:r,withCredentials:De,transferCache:F,keepalive:o,cache:l,priority:s,timeout:M,mode:c,redirect:u,credentials:d,referrer:f,integrity:y,referrerPolicy:N})}},bt$1=(function(i){return i[i.Sent=0]="Sent",i[i.UploadProgress=1]="UploadProgress",i[i.ResponseHeader=2]="ResponseHeader",i[i.DownloadProgress=3]="DownloadProgress",i[i.Response=4]="Response",i[i.User=5]="User",i})(bt$1||{}),_t=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(t,e=200,n="OK"){this.headers=t.headers||new Ae,this.status=t.status!==void 0?t.status:e,this.statusText=t.statusText||n,this.url=t.url||null,this.redirected=t.redirected,this.responseType=t.responseType,this.ok=this.status>=200&&this.status<300;}},Bn=class i extends _t{constructor(t={}){super(t);}type=bt$1.ResponseHeader;clone(t={}){return new i({headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}},Yt$2=class i extends _t{body;constructor(t={}){super(t),this.body=t.body!==void 0?t.body:null;}type=bt$1.Response;clone(t={}){return new i({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0,redirected:t.redirected??this.redirected,responseType:t.responseType??this.responseType})}},qe$2=class qe extends _t{name="HttpErrorResponse";message;error;ok=false;constructor(t){super(t,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${t.url||"(unknown url)"}`:this.message=`Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`,this.error=t.error||null;}},Yl=200;var Xl=/^\)\]\}',?\n/,ds=new x("",{factory:()=>null}),jn$1=(()=>{class i{fetchImpl=T$1(ar$1,{optional:true})?.fetch??((...e)=>globalThis.fetch(...e));ngZone=T$1(Ne$1);destroyRef=T$1(Oe$1);maxResponseSize=T$1(ds);handle(e){return new N$1(n=>{let r=new AbortController;this.doRequest(e,r.signal,n).then(lr$1,s=>n.error(new qe$2({error:s})));let o;return e.timeout&&(o=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{r.signal.aborted||r.abort(new DOMException("signal timed out","TimeoutError"));},e.timeout))),()=>{o!==void 0&&clearTimeout(o),r.abort();}})}doRequest(e,n,r){return C$1(this,null,function*(){let o=this.createRequestInit(e),s;try{let B=this.ngZone.runOutsideAngular(()=>this.fetchImpl(e.urlWithParams,w$2({signal:n},o)));Zl(B),r.next({type:bt$1.Sent}),s=yield B;}catch(B){r.error(new qe$2({error:B,status:B.status??0,statusText:B.statusText,url:e.urlWithParams,headers:B.headers}));return}let l=new Ae(s.headers),c=s.statusText,u=s.url||e.urlWithParams,d=s.status,f=null,y=e.reportProgress||e.reportDownloadProgress;if(y&&r.next(new Bn({headers:l,status:d,statusText:c,url:u})),s.body){let B=s.headers.get("content-length"),De=B!==null?Number(B):NaN;this.maxResponseSize!==null&&Number.isFinite(De)&&De>this.maxResponseSize&&ss(this.maxResponseSize);let Te=[],Oe=s.body.getReader(),it=0,Rt,$e,gn=typeof Zone<"u"&&Zone.current,rt=false;if(yield this.ngZone.runOutsideAngular(()=>C$1(this,null,function*(){for(;;){if(this.destroyRef.destroyed){yield Oe.cancel(),rt=true;break}let{done:Tt,value:Ti}=yield Oe.read();if(Tt)break;if(Te.push(Ti),it+=Ti.length,this.maxResponseSize!==null&&it>this.maxResponseSize&&(yield Oe.cancel(),ss(this.maxResponseSize)),y){$e=e.responseType==="text"?($e??"")+(Rt??=new TextDecoder).decode(Ti,{stream:true}):void 0;let oo=()=>r.next({type:bt$1.DownloadProgress,total:Number.isFinite(De)?De:void 0,loaded:it,partialText:$e});gn?gn.run(oo):oo();}}})),rt){r.complete();return}let Ge=this.concatChunks(Te,it);try{let Tt=s.headers.get(or$1)??"";f=this.parseBody(e,Ge,Tt,d);}catch(Tt){r.error(new qe$2({error:Tt,headers:new Ae(s.headers),status:s.status,statusText:s.statusText,url:s.url||e.urlWithParams}));return}}d===0&&(d=f?Yl:0);let N=d>=200&&d<300,F=s.redirected,M=s.type;N?(r.next(new Yt$2({body:f,headers:l,status:d,statusText:c,url:u,redirected:F,responseType:M})),r.complete()):r.error(new qe$2({error:f,headers:l,status:d,statusText:c,url:u,redirected:F,responseType:M}));})}parseBody(e,n,r,o){switch(e.responseType){case "json":let s=new TextDecoder().decode(n).replace(Xl,"");if(s==="")return null;try{return JSON.parse(s)}catch(l){if(o<200||o>=300)return s;throw l}case "text":return new TextDecoder().decode(n);case "blob":return new Blob([n],{type:r});case "arraybuffer":return n.buffer}}createRequestInit(e){if(e.reportUploadProgress)throw new b(2824,false);let n={},r;if(r=e.credentials,e.withCredentials&&(r="include"),e.headers.forEach((o,s)=>n[o]=s.join(",")),e.headers.has(os)||(n[os]=Wl),!e.headers.has(or$1)){let o=e.detectContentTypeHeader();o!==null&&(n[or$1]=o);}return {body:e.serializeBody(),method:e.method,headers:n,credentials:r,keepalive:e.keepalive,cache:e.cache,priority:e.priority,mode:e.mode,redirect:e.redirect,referrer:e.referrer,integrity:e.integrity,referrerPolicy:e.referrerPolicy}}concatChunks(e,n){let r=new Uint8Array(n),o=0;for(let s of e)r.set(s,o),o+=s.length;return r}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),ar$1=class ar{};function lr$1(){}function Zl(i){i.then(lr$1,lr$1);}function ss(i){throw new b(-2825,false)}function us(i,t){return t(i)}function Kl(i,t){return (e,n)=>t.intercept(e,{handle:r=>i(r,n)})}function ql(i,t,e){return (n,r)=>Do$2(e,()=>t(n,o=>i(o,r)))}var fs=new x(""),cr$1=new x("",{factory:()=>[]}),hs=new x(""),dr$1=new x("",{factory:()=>true});function Jl(){let i=null;return (t,e)=>{i===null&&(i=(T$1(fs,{optional:true})??[]).reduceRight(Kl,us));let n=T$1(Fo$2);if(T$1(dr$1)){let o=n.add();return i(t,e).pipe(Ml$1(o))}else return i(t,e)}}var ur$1=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:function(n){let r=null;return n?r=new(n||i):r=Me$3(jn$1),r},providedIn:"root"})}return i})();var Un$1=(()=>{class i{backend;injector;chain=null;pendingTasks=T$1(Fo$2);contributeToStability=T$1(dr$1);constructor(e,n){this.backend=e,this.injector=n;}handle(e){if(this.chain===null){let n=Array.from(new Set([...this.injector.get(cr$1),...this.injector.get(hs,[])]));this.chain=n.reduceRight((r,o)=>ql(r,o,this.injector),us);}if(this.contributeToStability){let n=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(Ml$1(n))}else return this.chain(e,n=>this.backend.handle(n))}static \u0275fac=function(n){return new(n||i)(Me$3(ur$1),Me$3(se$1))};static \u0275prov=te$1({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})(),fr$1=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:function(n){let r=null;return n?r=new(n||i):r=Me$3(Un$1),r},providedIn:"root"})}return i})();function sr$1(i,t){return w$2({body:t},i)}var ms=(()=>{class i{handler;constructor(e){this.handler=e;}request(e,n,r={}){let o;if(e instanceof gt$1)o=e;else {let c;r.headers instanceof Ae?c=r.headers:c=new Ae(r.headers);let u;r.params&&(r.params instanceof Se$1?u=r.params:u=new Se$1({fromObject:r.params})),o=new gt$1(e,n,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:u,reportProgress:r.reportProgress,reportUploadProgress:r.reportUploadProgress,reportDownloadProgress:r.reportDownloadProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout});}let s=Oh(o).pipe(Yh(c=>this.handler.handle(c)));if(e instanceof gt$1||r.observe==="events")return s;let l=s.pipe(Zt$1(c=>c instanceof Yt$2));switch(r.observe||"body"){case "body":switch(o.responseType){case "arraybuffer":return l.pipe(we$1(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new b(2806,false);return c.body}));case "blob":return l.pipe(we$1(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new b(2807,false);return c.body}));case "text":return l.pipe(we$1(c=>{if(c.body!==null&&typeof c.body!="string")throw new b(2808,false);return c.body}));default:return l.pipe(we$1(c=>c.body))}case "response":return l;default:throw new b(2809,false)}}delete(e,n={}){return this.request("DELETE",e,n)}get(e,n={}){return this.request("GET",e,n)}head(e,n={}){return this.request("HEAD",e,n)}jsonp(e,n){return this.request("JSONP",e,{params:new Se$1().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,n={}){return this.request("OPTIONS",e,n)}patch(e,n,r={}){return this.request("PATCH",e,sr$1(r,n))}post(e,n,r={}){return this.request("POST",e,sr$1(r,n))}put(e,n,r={}){return this.request("PUT",e,sr$1(r,n))}static \u0275fac=function(n){return new(n||i)(Me$3(fr$1))};static \u0275prov=te$1({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var Ql=new x("",{factory:()=>true}),ec="XSRF-TOKEN",tc=new x("",{factory:()=>ec}),nc="X-XSRF-TOKEN",ic=new x("",{factory:()=>nc}),rc=(()=>{class i{cookieName=T$1(tc);doc=T$1(nr$2);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=zt$3(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),ps=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:function(n){let r=null;return n?r=new(n||i):r=Me$3(rc),r},providedIn:"root"})}return i})();function oc(i,t){if(!T$1(Ql)||i.method==="GET"||i.method==="HEAD")return t(i);try{let r=T$1(pt).href,{origin:o}=new URL(r),{origin:s}=new URL(i.url,o);if(o!==s)return t(i)}catch(r){return t(i)}let e=T$1(ps).getToken(),n=T$1(ic);return e!=null&&!i.headers.has(n)&&(i=i.clone({headers:i.headers.set(n,e)})),t(i)}var hr$1=(function(i){return i[i.Interceptors=0]="Interceptors",i[i.LegacyInterceptors=1]="LegacyInterceptors",i[i.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",i[i.NoXsrfProtection=3]="NoXsrfProtection",i[i.JsonpSupport=4]="JsonpSupport",i[i.RequestsMadeViaParent=5]="RequestsMadeViaParent",i[i.Fetch=6]="Fetch",i[i.Xhr=7]="Xhr",i})(hr$1||{});function sc(i,t){return {\u0275kind:i,\u0275providers:t}}function ac(...i){let t=[ms,jn$1,Un$1,{provide:fr$1,useExisting:Un$1},{provide:ur$1,useFactory:()=>T$1(jn$1)},{provide:cr$1,useValue:oc,multi:true}];for(let e of i)t.push(...e.\u0275providers);return Ds$1(t)}var as=new x("");function lc(){return sc(hr$1.LegacyInterceptors,[{provide:as,useFactory:Jl},{provide:cr$1,useExisting:as,multi:true}])}var ap=(()=>{class i{_doc;constructor(e){this._doc=e;}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||"";}static \u0275fac=function(n){return new(n||i)(Me$3(nr$2))};static \u0275prov=te$1({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var mr$1=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:function(n){let r=null;return n?r=new(n||i):r=Me$3(dc),r},providedIn:"root"})}return i})(),dc=(()=>{class i extends mr$1{_doc=T$1(nr$2);sanitize(e,n){if(n==null)return null;switch(e){case Er$2.NONE:return n;case Er$2.HTML:return mi$1(n,"HTML")?bn$1(n):uf(this._doc,String(n)).toString();case Er$2.STYLE:return mi$1(n,"Style")?bn$1(n):n;case Er$2.SCRIPT:if(mi$1(n,"Script"))return bn$1(n);throw new b(5200,false);case Er$2.URL:return mi$1(n,"URL")?bn$1(n):Ja$2(String(n));case Er$2.RESOURCE_URL:if(mi$1(n,"ResourceURL"))return bn$1(n);throw new b(5201,false);default:throw new b(5202,false)}}bypassSecurityTrustHtml(e){return Bm(e)}bypassSecurityTrustStyle(e){return $m(e)}bypassSecurityTrustScript(e){return Um(e)}bypassSecurityTrustUrl(e){return Wm(e)}bypassSecurityTrustResourceUrl(e){return qm(e)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function Ve$2(i){i||(i=T$1(Oe$1));let t=new N$1(e=>{if(i.destroyed){e.next();return}return i.onDestroy(e.next.bind(e))});return e=>e.pipe(ig(t))}function bp(i,t){let e=T$1(ae$1),n=new An(1),r=ta$3(()=>{let o;try{o=i();}catch(s){ie$1(()=>n.error(s));return}ie$1(()=>n.next(o));},{injector:e,manualCleanup:true});return e.get(Oe$1).onDestroy(()=>{r.destroy(),n.complete();}),n.asObservable()}function _p(i,t){let n=!t?.manualCleanup?t?.injector?.get(Oe$1)??T$1(Oe$1):null,r=uc(t?.equal),o;t?.requireSync?o=Pe$2({kind:0},{equal:r}):o=Pe$2({kind:1,value:t?.initialValue},{equal:r});let s,l=i.subscribe({next:c=>o.set({kind:1,value:c}),error:c=>{o.set({kind:2,error:c}),s?.();},complete:()=>{s?.();}});if(t?.requireSync&&o().kind===0)throw new b(601,false);return s=n?.onDestroy(l.unsubscribe.bind(l)),dt$2(()=>{let c=o();switch(c.kind){case 1:return c.value;case 2:throw c.error;case 0:throw new b(601,false)}},{equal:t?.equal})}function uc(i=Object.is){return (t,e)=>t.kind===1&&e.kind===1&&i(t.value,e.value)}function vp(i){return Xx(x$1(w$2({},i),{loader:void 0,stream:t=>{let e,n=false,r=Pe$2({value:void 0}),{resolve:o,promise:s}=ku$1(),l=false;function c(){l||(l=true,o(r));}let u=()=>{n=true,e?.unsubscribe(),t.abortSignal.removeEventListener("abort",u),c();};t.abortSignal.addEventListener("abort",u);function d(y){r.set(y),c();}let f=i.stream;if(f===void 0)throw new b(990,false);return e=f(t).subscribe({next:y=>d({value:y}),error:y=>{d({error:$c$1(y)}),t.abortSignal.removeEventListener("abort",u);},complete:()=>{l||d({error:new b(991,false)}),t.abortSignal.removeEventListener("abort",u);}}),n&&e.unsubscribe(),l?r:s}}))}function gs(i,t){let e={};for(let n of Object.keys(i))n!==t&&(e[n]=i[n]);return e}var pr$1=class pr{state=Pe$2({});hasAny=dt$2(()=>Object.keys(this.state()).length>0);isLoading(t){return this.state()[t]!==void 0}get(t){return this.state()[t]}set(t,e){this.state.update(n=>x$1(w$2({},n),{[t]:e}));}clear(t){this.state.update(e=>gs(e,t));}clearIfOwner(t,e){this.state.update(n=>n[t]===e?gs(n,t):n);}},Hn$1=class Hn{},fc=(()=>{class i{handle(e){return e.key}static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),Kt$1=class Kt{},hc=(()=>{class i extends Kt$1{compile(e,n){return e}compileTranslations(e,n){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),qt=class{},mc=(()=>{class i extends qt{getTranslation(e){return Oh({})}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})();function gr$1(i,t){if(i===t)return  true;if(i===null||t===null)return  false;if(i!==i&&t!==t)return  true;let e=typeof i,n=typeof t,r;if(e==n&&e=="object")if(Array.isArray(i)){if(!Array.isArray(t))return  false;if((r=i.length)==t.length){for(let o=0;o<r;o++)if(!gr$1(i[o],t[o]))return  false;return  true}}else {if(Array.isArray(t))return  false;if(Fe$1(i)&&Fe$1(t)){let o=Object.create(null);for(let s in i){if(!gr$1(i[s],t[s]))return  false;o[s]=true;}for(let s in t)if(!(s in o)&&typeof t[s]<"u")return  false;return  true}}return  false}function Me$2(i){return typeof i<"u"&&i!==null}function bs(i){return i!==void 0}function Fe$1(i){return Zt(i)&&!Je$2(i)&&i!==null}function Zt(i){return typeof i=="object"&&i!==null}function Je$2(i){return Array.isArray(i)}function $n(i){return typeof i=="string"}function pc(i){return typeof i=="function"}function Gn$1(i){if(Je$2(i))return i.map(t=>Gn$1(t));if(Fe$1(i)){let t={};return Object.keys(i).forEach(e=>{t[e]=Gn$1(i[e]);}),t}else return i}function _r$1(i,t){if(!Zt(i))return Gn$1(t);let e=Gn$1(i);return Zt(e)&&Zt(t)&&Object.keys(t).forEach(n=>{Fe$1(t[n])?n in i?e[n]=_r$1(i[n],t[n]):Object.assign(e,{[n]:t[n]}):Object.assign(e,{[n]:t[n]});}),e}function vs(i,t){let e=t.split(".");t="";do{t+=e.shift();let n=!e.length;if(Me$2(i)){if(Fe$1(i)&&bs(i[t])&&(Fe$1(i[t])||Je$2(i[t])||n)){i=i[t],t="";continue}if(Je$2(i)){if(t==="length"&&n){i=i.length,t="";continue}if(/^\d+$/.test(t)){let r=parseInt(t,10);if(bs(i[r])&&(Fe$1(i[r])||Je$2(i[r])||n)){i=i[r],t="";continue}}}}if(n){i=void 0;continue}t+=".";}while(e.length);return i}function gc(i,t,e){return _r$1(i,bc(t,e))}function bc(i,t){return i.split(".").reduceRight((e,n)=>({[n]:e}),t)}var Jt$1=class Jt{},_c=(()=>{class i extends Jt$1{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(e,n){if($n(e))return this.interpolateString(e,n);if(pc(e))return this.interpolateFunction(e,n)}interpolateFunction(e,n){return e(n)}interpolateString(e,n){return n?e.replace(this.templateMatcher,(r,o)=>{let s=this.getInterpolationReplacement(n,o);return s!==void 0?s:r}):e}getInterpolationReplacement(e,n){return this.formatValue(vs(e,n))}formatValue(e){if($n(e))return e;if(typeof e=="number"||typeof e=="boolean")return e.toString();if(e===null)return "null";if(Je$2(e))return e.join(", ");if(Zt(e))return typeof e.toString=="function"&&e.toString!==Object.prototype.toString?e.toString():JSON.stringify(e)}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),ys=(()=>{class i{_translations=Pe$2({});translations=this._translations.asReadonly();_languages=Pe$2([]);languages=this._languages.asReadonly();_lastTranslationChange=Pe$2(null);lastTranslationChange=this._lastTranslationChange.asReadonly();_translationChange$=new ee$1;translationChange$=this._translationChange$.asObservable();constructor(){T$1(Oe$1).onDestroy(()=>{this._translationChange$.complete();});}getTranslations(e){return this.translations()[e]}setTranslations(e,n,r){this._translations.update(s=>x$1(w$2({},s),{[e]:r&&this.hasTranslationFor(e)?_r$1(s[e],n):n})),this.addLanguages([e]);let o={lang:e,translations:this.getTranslations(e)};this._lastTranslationChange.set(o),this._translationChange$.next(o);}getLanguages(){return this.languages()}addLanguages(e){this._languages.update(n=>Array.from(new Set([...n,...e])));}hasTranslationFor(e){return typeof this.translations()[e]<"u"}deleteTranslations(e){this._translations.update(n=>{let s=n,{[e]:r}=s;return z$1(s,[y$2(e)])});}getTranslationValue(e,n){return vs(this.getTranslations(e),n)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})(),Ds=new x("TRANSLATE_CONFIG"),Xt$1=i=>Lh(i)?i:Oh(i),br$1=(()=>{class i{loadingTranslations=new pr$1;lastUseLanguage=null;currentLoader=T$1(qt);compiler=T$1(Kt$1);parser=T$1(Jt$1);missingTranslationHandler=T$1(Hn$1);store=T$1(ys);destroyRef=T$1(Oe$1);parent;get isRoot(){return this.parent===null}_onLangChange=new ee$1;_onFallbackLangChange=new ee$1;_currentLang=Pe$2(null);_fallbackLang=Pe$2(null);_onTranslationRefresh=null;_isLoading=dt$2(()=>this.loadingTranslations.hasAny()||(this.parent?.isLoading()??false));getRoot(){let e=this;for(;e.parent;)e=e.parent;return e}getParent(){return this.parent}getActiveRequestedLang(){return this.getRoot().lastUseLanguage}hasTranslationInChain(e){for(let n=this;n;n=n.parent)if(n.store.hasTranslationFor(e))return  true;return  false}chainTranslationChange$(){let e=[];for(let n=this;n;n=n.parent)e.push(n.store.translationChange$);return e.length===1?e[0]:Qh(...e)}get onTranslationChange(){return this.store.translationChange$}get onLangChange(){return this.isRoot?this._onLangChange.asObservable():this.parent?this.parent.onLangChange:mt$1}get onFallbackLangChange(){return this.isRoot?this._onFallbackLangChange.asObservable():this.parent?this.parent.onFallbackLangChange:mt$1}get onTranslationRefresh(){if(!this._onTranslationRefresh){let e=Qh(this.onTranslationChange.pipe(Zt$1(n=>n.lang===this.getCurrentLang()||n.lang===this.getFallbackLang())),this.onLangChange,this.onFallbackLangChange).pipe(we$1(()=>{}));this.isRoot?this._onTranslationRefresh=e:this._onTranslationRefresh=this.parent?Qh(e,this.parent.onTranslationRefresh):e;}return this._onTranslationRefresh}constructor(){let e=w$2({isRoot:true,fallbackLang:null},T$1(Ds,{optional:true}));this.parent=e.isRoot?null:T$1(i,{optional:true,skipSelf:true});let n=T$1(Oe$1);if(this.isRoot)e.lang&&this.use(e.lang),e.fallbackLang&&this.setFallbackLang(e.fallbackLang);else {let r=this.getCurrentLang();r&&this.loadOrExtendLanguage(r)?.pipe(Ve$2(n)).subscribe({error:s=>{console.warn(`@ngx-translate/core: child failed to load "${r}". Cause:`,s);}});let o=this.getFallbackLang();o&&o!==r&&this.loadOrExtendLanguage(o)?.pipe(Ve$2(n)).subscribe({error:s=>{console.warn(`@ngx-translate/core: child failed to load "${o}". Cause:`,s);}});}this.onLangChange.pipe(Ve$2(n)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe(Ve$2(n)).subscribe({error:o=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,o);}});}),this.onFallbackLangChange.pipe(Ve$2(n)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe(Ve$2(n)).subscribe({error:o=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,o);}});}),n.onDestroy(()=>{this._onLangChange.complete(),this._onFallbackLangChange.complete();});}setFallbackLang(e){if(!this.isRoot)return this.parent.setFallbackLang(e);this._fallbackLang()||this._fallbackLang.set(e);let n=this.loadOrExtendLanguage(e);return Lh(n)?(n.pipe(yt$2(1)).subscribe({next:()=>{this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)});},error:r=>{console.warn(`@ngx-translate/core: failed to load fallback "${e}". Cause:`,r);}}),n):(this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)}),Oh(this.store.getTranslations(e)))}get isLoading(){return this._isLoading}use(e){if(!this.isRoot)return this.parent.use(e);let n=this._currentLang(),r=this.lastUseLanguage;this.lastUseLanguage=e,this._currentLang()||this._currentLang.set(e);let o=this.loadOrExtendLanguage(e);return Lh(o)?(o.pipe(yt$2(1)).subscribe({next:()=>{this.changeLang(e);},error:s=>{this.lastUseLanguage===e&&(this._currentLang.set(n),this.lastUseLanguage=r),console.warn(`@ngx-translate/core: failed to load "${e}". currentLang was NOT changed; remains "${n??"null"}". Cause:`,s);}}),o):(this.changeLang(e),Oh(this.store.getTranslations(e)))}loadOrExtendLanguage(e){return this.store.hasTranslationFor(e)?Oh(this.store.getTranslations(e)):this.loadAndCompileTranslations(e)}getTranslations(e){return this.store.getTranslations(e)}changeLang(e){e===this.lastUseLanguage&&(this._currentLang.set(e),this._onLangChange.next({lang:e,translations:this.store.getTranslations(e)}));}getCurrentLang(){return this.isRoot?this._currentLang():this.parent?.getCurrentLang()??null}loadAndCompileTranslations(e){let n=this.loadingTranslations.get(e);if(n)return n;let r=this.currentLoader.getTranslation(e).pipe(we$1(o=>this.compiler.compileTranslations(o,e)),xl$1(o=>{this.store.setTranslations(e,o,false),this.loadingTranslations.clearIfOwner(e,r);}),Ml$1(()=>this.loadingTranslations.clearIfOwner(e,r)),og({bufferSize:1,refCount:true}));return this.loadingTranslations.set(e,r),r.pipe(Ve$2(this.destroyRef)).subscribe({error:()=>{}}),r}setTranslation(e,n,r=false){let o=this.compiler.compileTranslations(n,e);this.store.setTranslations(e,o,r);}setCompiledTranslation(e,n,r=false){this.store.setTranslations(e,n,r);}getLangs(){return this.store.getLanguages()}addLangs(e){this.store.addLanguages(e);}getParsedResultForKey(e,n,r){let o=this.getTextToInterpolate(e,r);if(Me$2(o))return this.runInterpolation(o,n);let l=this.getMissingTranslationHandler().handle(w$2({key:e,translateService:this},n!==void 0&&{interpolateParams:n}));return l!==void 0?l:e}getMissingTranslationHandler(){return this.missingTranslationHandler}getFallbackLang(){return this.isRoot?this._fallbackLang():this.parent?.getFallbackLang()??null}getTextToInterpolate(e,n){if(n){let l=this.store.getTranslationValue(n,e);return l!==void 0?l:this.parent?.getTextToInterpolate(e,n)}let r=this.getCurrentLang(),o=this.getFallbackLang(),s;return r&&(s=this.store.getTranslationValue(r,e)),!Me$2(s)&&o&&o!==r&&(s=this.store.getTranslationValue(o,e)),s!==void 0?s:this.parent?.getTextToInterpolate(e)}runInterpolation(e,n){if(Me$2(e))return Je$2(e)?this.runInterpolationOnArray(e,n):Fe$1(e)?this.runInterpolationOnDict(e,n):this.parser.interpolate(e,n)}runInterpolationOnArray(e,n){return e.map(r=>this.runInterpolation(r,n))}runInterpolationOnDict(e,n){let r={};for(let o in e){let s=this.runInterpolation(e[o],n);s!==void 0&&(r[o]=s);}return r}getParsedResult(e,n,r){return e instanceof Array?this.getParsedResultForArray(e,n,r):this.getParsedResultForKey(e,n,r)}getParsedResultForArray(e,n,r){let o={},s=false;for(let c of e)o[c]=this.getParsedResultForKey(c,n,r),s=s||Lh(o[c]);if(!s)return o;let l=e.map(c=>Xt$1(o[c]));return zh(l).pipe(we$1(c=>{let u={};return c.forEach((d,f)=>{u[e[f]]=d;}),u}))}get(e,n,r){if(!Me$2(e)||!e.length)return Oh("");let o=r??this.getActiveRequestedLang()??this.getCurrentLang(),s=o?this.loadingTranslations.get(o):void 0;return s?s.pipe(Yh(()=>Xt$1(this.getParsedResult(e,n,r)))):Xt$1(this.getParsedResult(e,n,r))}getStreamOnTranslationChange(e,n,r){if(!Me$2(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return Qt$2(Gh(()=>this.get(e,n,r)),this.onTranslationChange.pipe(sl$1(()=>{let o=this.getParsedResult(e,n,r);return Xt$1(o)})))}stream(e,n,r){if(!Me$2(e)||!e.length)throw new Error('Parameter "key" required');let o=r?Qh(this.onLangChange,this.chainTranslationChange$().pipe(Zt$1(s=>s.lang===r))):this.onLangChange;return Qt$2(Gh(()=>this.get(e,n,r)),o.pipe(sl$1(()=>{let s=this.getParsedResult(e,n,r);return Xt$1(s)})))}instant(e,n,r){if(!Me$2(e)||e.length===0)return "";r&&!this.hasTranslationInChain(r)&&this.warnUnloadedInstantLang(r);let o=this.getParsedResult(e,n,r);return Lh(o)?this.keyToObject(e):o}warnedUnloadedInstantLangs=new Set;warnUnloadedInstantLang(e){let n=this.getRoot();if(n!==this){n.warnUnloadedInstantLang(e);return}this.warnedUnloadedInstantLangs.has(e)||ie$1(()=>{this.warnedUnloadedInstantLangs.add(e),console.warn(`@ngx-translate/core: instant() called with lang="${e}" but no translations are loaded for that language. Returning the key as fallback. Load with use("${e}") or setTranslation("${e}", ...) first.`);});}translate(e,n,r){return dt$2(()=>{let o=typeof e=="function"?e():e,s=typeof n=="function"?n():n,l=typeof r=="function"?r():r;return this.instant(o,s,l)})}keyToObject(e){return Array.isArray(e)?e.reduce((n,r)=>(n[r]=r,n),{}):e}set(e,n,r=this.getCurrentLang()){this.store.setTranslations(r,gc(this.store.getTranslations(r),e,$n(n)?this.compiler.compile(n,r):this.compiler.compileTranslations(n,r)),false);}reloadLang(e){return this.resetLang(e),this.loadAndCompileTranslations(e)}resetLang(e){this.loadingTranslations.clear(e),this.store.deleteTranslations(e);}static getBrowserLang(){if(typeof window>"u"||!window.navigator)return;let e=this.getBrowserCultureLang();return e?e.split(/[-_]/)[0]:void 0}static getBrowserCultureLang(){if(!(typeof window>"u"||typeof window.navigator>"u"))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}getBrowserLang(){return i.getBrowserLang()}getBrowserCultureLang(){return i.getBrowserCultureLang()}get currentLang(){return this.isRoot?this._currentLang.asReadonly():this.parent.currentLang}get fallbackLang(){return this.isRoot?this._fallbackLang.asReadonly():this.parent.fallbackLang}static \u0275fac=function(n){return new(n||i)};static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})();var Rp=(()=>{class i{translateService=T$1(br$1);cachedSignal=null;lastKey=null;lastParams;transform(e,...n){if(!e||!e.length)return e;let r=this.parseArgs(n);return (e!==this.lastKey||!gr$1(r,this.lastParams))&&(this.cachedSignal=this.translateService.translate(e,r),this.lastKey=e,this.lastParams=r),this.cachedSignal()}parseArgs(e){if(!(!Me$2(e[0])||!e.length)){if($n(e[0])&&e[0].length){let n=e[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,'"$2":').replace(/:(\s)?(')(.*?)(')/g,':"$3"');try{return JSON.parse(n)}catch(r){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${e[0]}`)}}if(Fe$1(e[0]))return e[0]}}static \u0275fac=function(n){return new(n||i)};static \u0275pipe=zI({name:"translate",type:i,pure:false});static \u0275prov=te$1({token:i,factory:i.\u0275fac})}return i})();function ws(i){return /^class\s/.test(Function.prototype.toString.call(i))}function _s(i,t){return ws(t)?{provide:i,useClass:t}:{provide:i,useFactory:t}}function Tp(i={}){return vc(x$1(w$2({},i),{isRoot:true}))}function zn$1(i,t,e,n,r){if(t===void 0)return _s(i,e);if(typeof t=="function"){if(ws(t)){let o=t.name||"YourClass";console.warn(`@ngx-translate/core: "${n}" received a bare class (${o}); auto-wrapping with ${r}(). For clarity, prefer ${n}: ${r}(${o}).`);}return _s(i,t)}return t}function vc(i){let t=[],e=zn$1(qt,i.loader,mc,"loader","provideTranslateLoader"),n=zn$1(Kt$1,i.compiler,hc,"compiler","provideTranslateCompiler"),r=zn$1(Jt$1,i.parser,_c,"parser","provideTranslateParser"),o=zn$1(Hn$1,i.missingTranslationHandler,fc,"missingTranslationHandler","provideMissingTranslationHandler");t.push(e,n,r,o),t.push(ys);let s={fallbackLang:i.fallbackLang??null,lang:i.lang,isRoot:i.isRoot};return t.push({provide:Ds,useValue:s}),t.push({provide:br$1,useClass:br$1}),t}var Rs=(()=>{class i{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,n){this._renderer=e,this._elementRef=n;}setProperty(e,n){this._renderer.setProperty(this._elementRef.nativeElement,e,n);}registerOnTouched(e){this.onTouched=e;}registerOnChange(e){this.onChange=e;}setDisabledState(e){this.setProperty("disabled",e);}static \u0275fac=function(n){return new(n||i)(Cr$2(Gv$1),Cr$2(vr$2))};static \u0275dir=GI({type:i})}return i})(),yc=(()=>{class i extends Rs{static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275dir=GI({type:i,features:[yp]})}return i})(),xr$1=new x("");var Dc={provide:xr$1,useExisting:po$2(()=>Ts),multi:true};function wc(){let i=ue$1()?ue$1().getUserAgent():"";return /android (\d+)/.test(i.toLowerCase())}var Cc=new x(""),Ts=(()=>{class i extends Rs{_compositionMode;_composing=false;constructor(e,n,r){super(e,n),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!wc());}writeValue(e){let n=e??"";this.setProperty("value",n);}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e);}_compositionStart(){this._composing=true;}_compositionEnd(e){this._composing=false,this._compositionMode&&this.onChange(e);}static \u0275fac=function(n){return new(n||i)(Cr$2(Gv$1),Cr$2(vr$2),Cr$2(Cc,8))};static \u0275dir=GI({type:i,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(n,r){n&1&&Rp$1("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)});},standalone:false,features:[dD([Dc]),yp]})}return i})();function Sr$1(i){return i==null||Ar$1(i)===0}function Ar$1(i){return i==null?null:Array.isArray(i)||typeof i=="string"?i.length:i instanceof Set?i.size:null}var Ct$3=new x(""),ni=new x(""),Ec=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,vr$1=class vr{static min(t){return xc(t)}static max(t){return Sc(t)}static required(t){return Os(t)}static requiredTrue(t){return Ac(t)}static email(t){return Mc(t)}static minLength(t){return Fc(t)}static maxLength(t){return Is(t)}static pattern(t){return Rc(t)}static nullValidator(t){return Yn$1()}static compose(t){return Bs(t)}static composeAsync(t){return js(t)}};function xc(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e<i?{min:{min:i,actual:t.value}}:null}}function Sc(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e>i?{max:{max:i,actual:t.value}}:null}}function Os(i){return Sr$1(i.value)?{required:true}:null}function Ac(i){return i.value===true?null:{required:true}}function Mc(i){return Sr$1(i.value)||Ec.test(i.value)?null:{email:true}}function Fc(i){return t=>{let e=t.value?.length??Ar$1(t.value);return e===null||e===0?null:e<i?{minlength:{requiredLength:i,actualLength:e}}:null}}function Is(i){return t=>{let e=t.value?.length??Ar$1(t.value);return e!==null&&e>i?{maxlength:{requiredLength:i,actualLength:e}}:null}}function Rc(i){if(!i)return Yn$1;let t,e;return typeof i=="string"?(e="",i.charAt(0)!=="^"&&(e+="^"),e+=i,i.charAt(i.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=i.toString(),t=i),n=>{if(Sr$1(n.value))return null;let r=n.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Yn$1(i){return null}function ks(i){return i!=null}function Ps(i){return bc$1(i)?Ce(i):i}function Ns(i){let t={};return i.forEach(e=>{t=e!=null?w$2(w$2({},t),e):t;}),Object.keys(t).length===0?null:t}function Ls(i,t){return t.map(e=>e(i))}function Tc(i){return !i.validate}function Vs(i){return i.map(t=>Tc(t)?t:e=>t.validate(e))}function Bs(i){if(!i)return null;let t=i.filter(ks);return t.length==0?null:function(e){return Ns(Ls(e,t))}}function Mr$1(i){return i!=null?Bs(Vs(i)):null}function js(i){if(!i)return null;let t=i.filter(ks);return t.length==0?null:function(e){let n=Ls(e,t).map(Ps);return zh(n).pipe(we$1(Ns))}}function Fr$1(i){return i!=null?js(Vs(i)):null}function Cs(i,t){return i===null?[t]:Array.isArray(i)?[...i,t]:[i,t]}function Us(i){return i._rawValidators}function zs(i){return i._rawAsyncValidators}function yr$1(i){return i?Array.isArray(i)?i:[i]:[]}function Xn$1(i,t){return Array.isArray(i)?i.includes(t):i===t}function Es(i,t){let e=yr$1(t);return yr$1(i).forEach(r=>{Xn$1(e,r)||e.push(r);}),e}function xs(i,t){return yr$1(t).filter(e=>!Xn$1(i,e))}var Zn$1=class Zn{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Mr$1(this._rawValidators);}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Fr$1(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[];}reset(t=void 0){this.control?.reset(t);}hasError(t,e){return this.control?this.control.hasError(t,e):false}getError(t,e){return this.control?this.control.getError(t,e):null}},Be$1=class Be extends Zn$1{name;get formDirective(){return null}get path(){return null}};var Qt$1="VALID",Wn$1="INVALID",vt$1="PENDING",en$1="DISABLED",je$2=class je{},Kn$1=class Kn extends je$2{value;source;constructor(t,e){super(),this.value=t,this.source=e;}},nn$1=class nn extends je$2{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e;}},rn$1=class rn extends je$2{touched;source;constructor(t,e){super(),this.touched=t,this.source=e;}},yt$1=class yt extends je$2{status;source;constructor(t,e){super(),this.status=t,this.source=e;}},qn$1=class qn extends je$2{source;constructor(t){super(),this.source=t;}},Qe$1=class Qe extends je$2{source;constructor(t){super(),this.source=t;}};function Rr$1(i){return (ii(i)?i.validators:i)||null}function Oc(i){return Array.isArray(i)?Mr$1(i):i||null}function Tr$1(i,t){return (ii(t)?t.asyncValidators:i)||null}function Ic(i){return Array.isArray(i)?Fr$1(i):i||null}function ii(i){return i!=null&&!Array.isArray(i)&&typeof i=="object"}function Hs(i,t,e){let n=i.controls;if(!(t?Object.keys(n):n).length)throw new b(1e3,"");if(!Gs(n,e))throw new b(1001,"")}function $s(i,t,e){i._forEachChild((n,r)=>{if(e[r]===void 0)throw new b(-1002,"")});}var Dt$1=class Dt{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=Pe$2(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e);}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t;}get parent(){return this._parent}get status(){return ie$1(this.statusReactive)}set status(t){ie$1(()=>this.statusReactive.set(t));}_status=dt$2(()=>this.statusReactive());statusReactive=Pe$2(void 0);get valid(){return this.status===Qt$1}get invalid(){return this.status===Wn$1}get pending(){return this.status===vt$1}get disabled(){return this.status===en$1}get enabled(){return this.status!==en$1}errors;get pristine(){return ie$1(this.pristineReactive)}set pristine(t){ie$1(()=>this.pristineReactive.set(t));}_pristine=dt$2(()=>this.pristineReactive());pristineReactive=Pe$2(true);get dirty(){return !this.pristine}get touched(){return ie$1(this.touchedReactive)}set touched(t){ie$1(()=>this.touchedReactive.set(t));}_touched=dt$2(()=>this.touchedReactive());touchedReactive=Pe$2(false);get untouched(){return !this.touched}_events=new ee$1;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t);}setAsyncValidators(t){this._assignAsyncValidators(t);}addValidators(t){this.setValidators(Es(t,this._rawValidators));}addAsyncValidators(t){this.setAsyncValidators(Es(t,this._rawAsyncValidators));}removeValidators(t){this.setValidators(xs(t,this._rawValidators));}removeAsyncValidators(t){this.setAsyncValidators(xs(t,this._rawAsyncValidators));}hasValidator(t){return Xn$1(this._rawValidators,t)}hasAsyncValidator(t){return Xn$1(this._rawAsyncValidators,t)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(t={}){let e=this.touched===false;this.touched=true;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(x$1(w$2({},t),{sourceControl:n})),e&&t.emitEvent!==false&&this._events.next(new rn$1(true,n));}markAllAsDirty(t={}){this.markAsDirty({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t));}markAllAsTouched(t={}){this.markAsTouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t));}markAsUntouched(t={}){let e=this.touched===true;this.touched=false,this._pendingTouched=false;let n=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:n});}),t.onlySelf||this._parent?._updateTouched(t,n),e&&t.emitEvent!==false&&this._events.next(new rn$1(false,n));}markAsDirty(t={}){let e=this.pristine===true;this.pristine=false;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(x$1(w$2({},t),{sourceControl:n})),e&&t.emitEvent!==false&&this._events.next(new nn$1(false,n));}markAsPristine(t={}){let e=this.pristine===false;this.pristine=true,this._pendingDirty=false;let n=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:true,emitEvent:t.emitEvent});}),t.onlySelf||this._parent?._updatePristine(t,n),e&&t.emitEvent!==false&&this._events.next(new nn$1(true,n));}markAsPending(t={}){this.status=vt$1;let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new yt$1(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(x$1(w$2({},t),{sourceControl:e}));}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=en$1,this.errors=null,this._forEachChild(r=>{r.disable(x$1(w$2({},t),{onlySelf:true}));}),this._updateValue();let n=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new Kn$1(this.value,n)),this._events.next(new yt$1(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(x$1(w$2({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(true));}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=Qt$1,this._forEachChild(n=>{n.enable(x$1(w$2({},t),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent}),this._updateAncestors(x$1(w$2({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(n=>n(false));}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e));}setParent(t){this._parent=t;}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Qt$1||this.status===vt$1)&&this._runAsyncValidator(n,t.emitEvent);}let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new Kn$1(this.value,e)),this._events.next(new yt$1(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(x$1(w$2({},t),{sourceControl:e}));}_updateTreeValidity(t={emitEvent:true}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?en$1:Qt$1;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=vt$1,this._hasOwnPendingAsyncValidator={emitEvent:e!==false,shouldHaveEmitted:t!==false};let n=Ps(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,t}return  false}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==false,this,e.shouldHaveEmitted);}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((n,r)=>n&&n._find(r),this)}getError(t,e){let n=e?this.get(e):this;return n?.errors?n.errors[t]:null}hasError(t,e){return !!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,n){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||n)&&this._events.next(new yt$1(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,n);}_initObservables(){this.valueChanges=new Be$2,this.statusChanges=new Be$2;}_calculateStatus(){return this._allControlsDisabled()?en$1:this.errors?Wn$1:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(vt$1)?vt$1:this._anyControlsHaveStatus(Wn$1)?Wn$1:Qt$1}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let n=!this._anyControlsDirty(),r=this.pristine!==n;this.pristine=n,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new nn$1(this.pristine,e));}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new rn$1(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e);}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t;}_setUpdateStrategy(t){ii(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn);}_parentMarkedDirty(t){return !t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=Oc(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Ic(this._rawAsyncValidators);}_updateHasRequiredValidator(){ie$1(()=>this._hasRequired.set(this.hasValidator(vr$1.required)));}};function Gs(i,t){return Object.hasOwn(i,t)}function kc(i){return i.tagName==="INPUT"||i.tagName==="SELECT"||i.tagName==="TEXTAREA"}function Pc(i,t,e,n){switch(e){case "name":i.setAttribute(t,e,n);break;case "disabled":case "readonly":case "required":n?i.setAttribute(t,e,""):i.removeAttribute(t,e);break;case "max":case "min":case "minLength":case "maxLength":n!==void 0?i.setAttribute(t,e,n.toString()):i.removeAttribute(t,e);break}}var Dr$1=class Dr{kind;context;control;message;constructor({kind:t,context:e,control:n}){this.kind=t,this.context=e,this.control=n;}};function Nc(i){return typeof i=="number"?i:parseInt(i,10)}var Ws=(()=>{class i{_validator=Yn$1;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let n=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):Yn$1,this._onChange?.();}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e;}enabled(e){return e!=null}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,features:[lm]})}return i})();var Lc={provide:Ct$3,useExisting:po$2(()=>Ys),multi:true};var Ys=(()=>{class i extends Ws{required;inputName="required";normalizeInput=tF;createValidator=e=>Os;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275dir=GI({type:i,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(n,r){n&2&&Cp("required",r._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[dD([Lc]),yp]})}return i})();var Vc={provide:Ct$3,useExisting:po$2(()=>Bc),multi:true},Bc=(()=>{class i extends Ws{maxlength;inputName="maxlength";normalizeInput=e=>Nc(e);createValidator=e=>Is(e);static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275dir=GI({type:i,selectors:[["","maxlength","","formControlName",""],["","maxlength","","formControl",""],["","maxlength","","ngModel",""]],hostVars:1,hostBindings:function(n,r){n&2&&Cp("maxlength",r._enabled?r.maxlength:null);},inputs:{maxlength:"maxlength"},standalone:false,features:[dD([Vc]),yp]})}return i})();var jc=new x(""),Et$2=new x("",{factory:()=>ri}),ri="always";function Uc(i,t){return [...t.path,i]}function wr$1(i,t,e=ri){Or$1(i,t),t.valueAccessor.writeValue(i.value),(i.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(i.disabled),Hc(i,t),Gc(i,t),$c(i,t),zc(i,t);}function Jn$1(i,t,e=true){let n=()=>{};t?.valueAccessor?.registerOnChange(n),t?.valueAccessor?.registerOnTouched(n),ei$1(i,t),i&&(t._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}));}function Qn$1(i,t){i.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t);});}function zc(i,t){if(t.valueAccessor.setDisabledState){let e=n=>{t.valueAccessor.setDisabledState(n);};i.registerOnDisabledChange(e),t._registerOnDestroy(()=>{i._unregisterOnDisabledChange(e);});}}function Or$1(i,t){let e=Us(i);t.validator!==null?i.setValidators(Cs(e,t.validator)):typeof e=="function"&&i.setValidators([e]);let n=zs(i);t.asyncValidator!==null?i.setAsyncValidators(Cs(n,t.asyncValidator)):typeof n=="function"&&i.setAsyncValidators([n]);let r=()=>i.updateValueAndValidity();Qn$1(t._rawValidators,r),Qn$1(t._rawAsyncValidators,r);}function ei$1(i,t){let e=false;if(i!==null){if(t.validator!==null){let r=Us(i);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.validator);o.length!==r.length&&(e=true,i.setValidators(o));}}if(t.asyncValidator!==null){let r=zs(i);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==t.asyncValidator);o.length!==r.length&&(e=true,i.setAsyncValidators(o));}}}let n=()=>{};return Qn$1(t._rawValidators,n),Qn$1(t._rawAsyncValidators,n),e}function Hc(i,t){t.valueAccessor.registerOnChange(e=>{i._pendingValue=e,i._pendingChange=true,i._pendingDirty=true,i.updateOn==="change"&&Xs(i,t);});}function $c(i,t){t.valueAccessor.registerOnTouched(()=>{i._pendingTouched=true,i.updateOn==="blur"&&i._pendingChange&&Xs(i,t),i.updateOn!=="submit"&&i.markAsTouched();});}function Xs(i,t){i._pendingDirty&&i.markAsDirty(),i.setValue(i._pendingValue,{emitModelToViewChange:false}),t.viewToModelUpdate(i._pendingValue),i._pendingChange=false;}function Gc(i,t){let e=(n,r)=>{t.valueAccessor.writeValue(n),r&&t.viewToModelUpdate(n);};i.registerOnChange(e),t._registerOnDestroy(()=>{i._unregisterOnChange(e);});}function Zs(i,t){Or$1(i,t);}function Wc(i,t){return ei$1(i,t)}function Ks(i,t){if(!i.hasOwnProperty("model"))return  false;let e=i.model;return e.isFirstChange()?true:!Object.is(t,e.currentValue)}function Yc(i){return Object.getPrototypeOf(i.constructor)===yc}function qs(i,t){i._syncPendingControls(),t.forEach(e=>{let n=e.control;n.updateOn==="submit"&&n._pendingChange&&(e.viewToModelUpdate(n._pendingValue),n._pendingChange=false);});}function Xc(i,t){if(!t)return null;let e,n,r;return t.forEach(o=>{o.constructor===Ts?e=o:Yc(o)?n=o:r=o;}),r||n||e||null}function Zc(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1);}var Js={provide:jc,useFactory:()=>{let i=T$1(Ue$2,{self:true});return {setParseErrors:t=>{i.setParseErrorSource(t);},set onReset(t){i.onReset=t;}}}},Ue$2=class Ue extends Zn$1{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Qe$1&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Xc(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,n){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=n,this.injector?.get(Oe$1)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(XL);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new G,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(n=>{n instanceof Qe$1&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(t){!t.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=true,t.listenToCustomControlModel(r=>{this.control?.setValue(r,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(r);}),t.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=kc(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof Ys));}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let n=this.control,r=this.customControlBindings;Object.is(r.value,n.value)||(r.value=n.value,t.setCustomControlModelInput(n.value)),this.bindControlProperty(t,r,"touched",n.touched),this.bindControlProperty(t,r,"dirty",n.dirty),this.bindControlProperty(t,r,"valid",n.valid),this.bindControlProperty(t,r,"invalid",n.invalid),this.bindControlProperty(t,r,"pending",n.pending),this.bindControlProperty(t,r,"disabled",n.disabled),this.shouldBindRequired&&this.bindControlProperty(t,r,"required",this.isRequired);let o=n.errors;if(r.errors!==o){r.errors=o;let s=this._convertErrors(o);t.setInputOnDirectives("errors",s);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(t,e,n,r){if(e[n]===r)return;e[n]=r;let o=t.setInputOnDirectives(n,r);this.isNativeFormElement&&!o&&(n==="disabled"||n==="required")&&this.renderer&&Pc(this.renderer,t.nativeElement,n,r);}_convertErrors(t){if(t===null)return [];let e=this.control;return Object.entries(t).map(([n,r])=>new Dr$1({context:r,kind:n,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,n=dt$2(()=>{let r=t();return r.length===0?null:r.reduce((o,s)=>(o[s.kind]=s,o),{})});this.parseErrorsValidator=(()=>e).bind(this),ta$3(()=>{e=n(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:false}));}},ti$1=class ti{_cd;constructor(t){this._cd=t;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Zp=(()=>{class i extends ti$1{constructor(e){super(e);}static \u0275fac=function(n){return new(n||i)(Cr$2(Ue$2,2))};static \u0275dir=GI({type:i,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,r){n&2&&$p("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending);},standalone:false,features:[yp]})}return i})(),Kp=(()=>{class i extends ti$1{constructor(e){super(e);}static \u0275fac=function(n){return new(n||i)(Cr$2(Be$1,10))};static \u0275dir=GI({type:i,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(n,r){n&2&&$p("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted);},standalone:false,features:[yp]})}return i})(),wt$2=class wt extends Dt$1{constructor(t,e,n){super(Rr$1(e),Tr$1(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(t,e){let n=this._find(t);return n||(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,n={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}removeControl(t,e={}){let n=this._find(t);n&&n._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}setControl(t,e,n={}){let r=this._find(t);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}contains(t){return this._find(t)?.enabled===true}setValue(t,e={}){ie$1(()=>{$s(this,true,t),Object.keys(t).forEach(n=>{Hs(this,true,n),this.controls[n].setValue(t[n],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(n=>{let r=this._find(n);r&&r.patchValue(t[n],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(t={},e={}){this._forEachChild((n,r)=>{n.reset(t?t[r]:null,x$1(w$2({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new Qe$1(this));}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(false,(e,n)=>n._syncPendingControls()?true:e);return t&&this.updateValueAndValidity({onlySelf:true}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let n=this.controls[e];n&&t(n,e);});}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(t){for(let[e,n]of Object.entries(this.controls))if(this.contains(e)&&t(n))return  true;return  false}_reduceValue(){let t={};return this._reduceChildren(t,(e,n,r)=>((n.enabled||this.disabled)&&(e[r]=n.value),e))}_reduceChildren(t,e){let n=t;return this._forEachChild((r,o)=>{n=e(n,r,o);}),n}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(t){return Gs(this.controls,t)?this.controls[t]:null}};var Cr$1=class Cr extends wt$2{};var Kc={provide:Be$1,useExisting:po$2(()=>qc)},tn$1=Promise.resolve(),qc=(()=>{class i extends Be$1{callSetDisabledState;get submitted(){return ie$1(this.submittedReactive)}_submitted=dt$2(()=>this.submittedReactive());submittedReactive=Pe$2(false);_directives=new Set;form;ngSubmit=new Be$2;options;constructor(e,n,r){super(),this.callSetDisabledState=r,this.form=new wt$2({},Mr$1(e),Fr$1(n));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(e){tn$1.then(()=>{let n=this._findContainer(e.path);e.control=n.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:false}),this._directives.add(e);});}getControl(e){return this.form.get(e.path)}removeControl(e){tn$1.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e);});}addFormGroup(e){tn$1.then(()=>{let n=this._findContainer(e.path),r=new wt$2({});Zs(r,e),n.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:false});});}removeFormGroup(e){tn$1.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name);});}getFormGroup(e){return this.form.get(e.path)}updateModel(e,n){tn$1.then(()=>{this.form.get(e.path).setValue(n);});}setValue(e){this.control.setValue(e);}onSubmit(e){return this.submittedReactive.set(true),qs(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new qn$1(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(n){return new(n||i)(Cr$2(Ct$3,10),Cr$2(ni,10),Cr$2(Et$2,8))};static \u0275dir=GI({type:i,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(n,r){n&1&&Rp$1("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[dD([Kc]),yp]})}return i})();function Ss(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1);}function As(i){return typeof i=="object"&&i!==null&&Object.keys(i).length===2&&"value"in i&&"disabled"in i}var on$1=class on extends Dt$1{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(t=null,e,n){super(Rr$1(e),Tr$1(n,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),ii(e)&&(e.nonNullable||e.initialValueIsDefault)&&(As(t)?this.defaultValue=t.value:this.defaultValue=t);}setValue(t,e={}){ie$1(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==false&&this._onChange.forEach(n=>n(this.value,e.emitViewToModelChange!==false)),this.updateValueAndValidity(e);});}patchValue(t,e={}){this.setValue(t,e);}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,e?.emitEvent!==false&&this._events.next(new Qe$1(this));}_updateValue(){}_anyControls(t){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t);}_unregisterOnChange(t){Ss(this._onChange,t);}registerOnDisabledChange(t){this._onDisabledChange.push(t);}_unregisterOnDisabledChange(t){Ss(this._onDisabledChange,t);}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(t){As(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=t;}};var Jc=i=>i instanceof on$1;var Qc={provide:Ue$2,useExisting:po$2(()=>ed)},Ms=Promise.resolve(),ed=(()=>{class i extends Ue$2{_changeDetectorRef;callSetDisabledState;control=new on$1;static ngAcceptInputType_isDisabled;_registered=false;viewModel;name="";isDisabled;model;options;update=new Be$2;constructor(e,n,r,o,s,l,c,u){super(c,u,o),this._changeDetectorRef=s,this.callSetDisabledState=l,this._parent=e,this._setValidators(n),this._setAsyncValidators(r);}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let n=e.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)});}this._setUpControl();}"isDisabled"in e&&this._updateDisabled(e),Ks(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model);}ngOnDestroy(){this.formDirective?.removeControl(this);}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){super.ngControlUpdate(e,false);}get shouldBindRequired(){return  false}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=true;}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn);}_isStandalone(){return !this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,wr$1(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:false});}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,wr$1(this.control,this,e));}_checkForErrors(){this._checkName();}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name;}_updateValue(e){Ms.then(()=>{this.control.setValue(e,{emitViewToModelChange:false}),this._changeDetectorRef?.markForCheck();});}_updateDisabled(e){let n=e.isDisabled.currentValue,r=n!==0&&tF(n);Ms.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck();});}_getPath(e){return this._parent?Uc(e,this._parent):[e]}static \u0275fac=function(n){return new(n||i)(Cr$2(Be$1,9),Cr$2(Ct$3,10),Cr$2(ni,10),Cr$2(xr$1,10),Cr$2(XL,8),Cr$2(Et$2,8),Cr$2(ae$1,8),Cr$2(Gv$1,8))};static \u0275dir=GI({type:i,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:false,features:[dD([Qc,Js]),yp,lm,ZI(null)]})}return i})();var Jp=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:false})}return i})();var Er$1=class Er extends Dt$1{constructor(t,e,n){super(Rr$1(e),Tr$1(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;at(t){return this.controls[this._adjustIndex(t)]}push(t,e={}){Array.isArray(t)?t.forEach(n=>{this.controls.push(n),this._registerControl(n);}):(this.controls.push(t),this._registerControl(t)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}insert(t,e,n={}){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:n.emitEvent});}removeAt(t,e={}){let n=this._adjustIndex(t);n<0&&(n=0),this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),this.controls.splice(n,1),this.updateValueAndValidity({emitEvent:e.emitEvent});}setControl(t,e,n={}){let r=this._adjustIndex(t);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}get length(){return this.controls.length}setValue(t,e={}){ie$1(()=>{$s(this,false,t),t.forEach((n,r)=>{Hs(this,false,r),this.at(r).setValue(n,{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(t,e={}){t!=null&&(t.forEach((n,r)=>{this.at(r)&&this.at(r).patchValue(n,{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(t=[],e={}){this._forEachChild((n,r)=>{n.reset(t[r],x$1(w$2({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new Qe$1(this));}getRawValue(){return this.controls.map(t=>t.getRawValue())}clear(t={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:t.emitEvent}));}_adjustIndex(t){return t<0?t+this.length:t}_syncPendingControls(){let t=this.controls.reduce((e,n)=>n._syncPendingControls()?true:e,false);return t&&this.updateValueAndValidity({onlySelf:true}),t}_forEachChild(t){this.controls.forEach((e,n)=>{t(e,n);});}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value);}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t));}_allControlsDisabled(){for(let t of this.controls)if(t.enabled)return  false;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange);}_find(t){return this.at(t)??null}};var td=(()=>{class i extends Be$1{callSetDisabledState;get submitted(){return ie$1(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e);}_submitted=dt$2(()=>this._submittedReactive());_submittedReactive=Pe$2(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,n,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(n);}ngOnChanges(e){this.onChanges(e);}ngOnDestroy(){this.onDestroy();}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(ei$1(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(e){let n=this.form.get(e.path);return e._setupWithForm(n,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:false}),this.directives.push(e),n}getControl(e){return this.form.get(e.path)}removeControl(e){Jn$1(e.control||null,e,false),Zc(this.directives,e);}addFormGroup(e){this._setUpFormContainer(e);}removeFormGroup(e){this._cleanUpFormContainer(e);}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e);}removeFormArray(e){this._cleanUpFormContainer(e);}updateModel(e,n){this.form.get(e.path).setValue(n);}onReset(){this.resetForm();}resetForm(e=void 0,n={}){this.form.reset(e,n),this._submittedReactive.set(false);}onSubmit(e){return this.submitted=true,qs(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new qn$1(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let n=e.control,r=this.form.get(e.path);n!==r&&(Jn$1(n||null,e),Jc(r)&&e._setupWithForm(r,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(e){let n=this.form.get(e.path);Zs(n,e),n.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(e){let n=this.form?.get(e.path);n&&Wc(n,e)&&n.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){Or$1(this.form,this),this._oldForm&&ei$1(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(n){return new(n||i)(Cr$2(Ct$3,10),Cr$2(ni,10),Cr$2(Et$2,8))};static \u0275dir=GI({type:i,features:[yp,lm]})}return i})();var Qs=new x(""),nd={provide:Ue$2,useExisting:po$2(()=>id)},id=(()=>{class i extends Ue$2{_ngModelWarningConfig;callSetDisabledState;viewModel;form;set isDisabled(e){}model;update=new Be$2;static _ngModelWarningSentOnce=false;_ngModelWarningSent=false;constructor(e,n,r,o,s,l,c){super(c,l,r),this._ngModelWarningConfig=o,this.callSetDisabledState=s,this._setValidators(e),this._setAsyncValidators(n);}ngOnChanges(e){if(this._isControlChanged(e)){let n=e.form.previousValue;n&&(Jn$1(n,this,false),this.removeParseErrorsValidator(n)),this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,wr$1(this.form,this,this.callSetDisabledState)),this.form.updateValueAndValidity({emitEvent:false});}Ks(e,this.viewModel)&&(this.form.setValue(this.model),this.viewModel=this.model);}ngOnDestroy(){this.form&&Jn$1(this.form,this,false);}get path(){return []}get control(){return this.form}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}_isControlChanged(e){return e.hasOwnProperty("form")}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){super.ngControlUpdate(e,true);}static \u0275fac=function(n){return new(n||i)(Cr$2(Ct$3,10),Cr$2(ni,10),Cr$2(xr$1,10),Cr$2(Qs,8),Cr$2(Et$2,8),Cr$2(Gv$1,8),Cr$2(ae$1,8))};static \u0275dir=GI({type:i,selectors:[["","formControl",""]],inputs:{form:[0,"formControl","form"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},exportAs:["ngForm"],standalone:false,features:[dD([nd,Js]),yp,lm,ZI(null)]})}return i})();var rd={provide:Be$1,useExisting:po$2(()=>od)},od=(()=>{class i extends td{form=null;ngSubmit=new Be$2;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275dir=GI({type:i,selectors:[["","formGroup",""]],hostBindings:function(n,r){n&1&&Rp$1("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[dD([rd]),yp]})}return i})();var ea$2=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=UI({type:i});static \u0275inj=zl$1({})}return i})();function Fs(i){return !!i&&(i.asyncValidators!==void 0||i.validators!==void 0||i.updateOn!==void 0)}var Qp=(()=>{class i{useNonNullable=false;get nonNullable(){let e=new i;return e.useNonNullable=true,e}group(e,n=null){let r=this._reduceControls(e),o={};return Fs(n)?o=n:n!==null&&(o.validators=n.validator,o.asyncValidators=n.asyncValidator),new wt$2(r,o)}record(e,n=null){let r=this._reduceControls(e);return new Cr$1(r,n)}control(e,n,r){let o={};return this.useNonNullable?(Fs(n)?o=n:(o.validators=n,o.asyncValidators=r),new on$1(e,x$1(w$2({},o),{nonNullable:true}))):new on$1(e,n,r)}array(e,n,r){let o=e.map(s=>this._createControl(s));return new Er$1(o,n,r)}_reduceControls(e){let n={};return Object.keys(e).forEach(r=>{n[r]=this._createControl(e[r]);}),n}_createControl(e){if(e instanceof on$1)return e;if(e instanceof Dt$1)return e;if(Array.isArray(e)){let n=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(n,r,o)}else return this.control(e)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var eg=(()=>{class i{static withConfig(e){return {ngModule:i,providers:[{provide:Et$2,useValue:e.callSetDisabledState??ri}]}}static \u0275fac=function(n){return new(n||i)};static \u0275mod=UI({type:i});static \u0275inj=zl$1({imports:[ea$2]})}return i})(),tg=(()=>{class i{static withConfig(e){return {ngModule:i,providers:[{provide:Qs,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:Et$2,useValue:e.callSetDisabledState??ri}]}}static \u0275fac=function(n){return new(n||i)};static \u0275mod=UI({type:i});static \u0275inj=zl$1({imports:[ea$2]})}return i})();var Ir$1;try{Ir$1=typeof Intl<"u"&&Intl.v8BreakIterator;}catch(i){Ir$1=false;}var O=(()=>{class i{_platformId=T$1(Gg);isBrowser=this._platformId?Yo$1(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Ir$1)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function xt$2(i){return Array.isArray(i)?i:[i]}var ta$2=new Set,et$3,oi=(()=>{class i{_platform=T$1(O);_nonce=T$1(Qg,{optional:true});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):ad;}matchMedia(e){return (this._platform.WEBKIT||this._platform.BLINK)&&sd(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function sd(i,t){if(!ta$2.has(i))try{et$3||(et$3=document.createElement("style"),t&&et$3.setAttribute("nonce",t),et$3.setAttribute("type","text/css"),document.head.appendChild(et$3)),et$3.sheet&&(et$3.sheet.insertRule(`@media ${i.replace(/[{}]/g,"")} {body{ }}`,0),ta$2.add(i));}catch(e){console.error(e);}}function ad(i){return {matches:i==="all"||i==="",media:i,addListener:()=>{},removeListener:()=>{}}}var ld=(()=>{class i{_mediaMatcher=T$1(oi);_zone=T$1(Ne$1);_queries=new Map;_destroySubject=new ee$1;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete();}isMatched(e){return na$2(xt$2(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=na$2(xt$2(e)).map(s=>this._registerQuery(s).observable),o=Wh(r);return o=Qt$2(o.pipe(yt$2(1)),o.pipe(Nl$1(1),Kh(0))),o.pipe(we$1(s=>{let l={matches:false,breakpoints:{}};return s.forEach(({matches:c,query:u})=>{l.matches=l.matches||c,l.breakpoints[u]=c;}),l}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let n=this._mediaMatcher.matchMedia(e),o={observable:new N$1(s=>{let l=c=>this._zone.run(()=>s.next(c));return n.addListener(l),()=>{n.removeListener(l);}}).pipe(Sl$1(n),we$1(({matches:s})=>({query:e,matches:s})),ig(this._destroySubject)),mql:n};return this._queries.set(e,o),o}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function na$2(i){return i.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}var gg={XSmall:"(max-width: 599.98px)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)"};function sn$1(i){return i.buttons===0||i.detail===0}function an$1(i){let t=i.touches&&i.touches[0]||i.changedTouches&&i.changedTouches[0];return !!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var kr$1;function ia$2(){if(kr$1==null){let i=typeof document<"u"?document.head:null;kr$1=!!(i&&(i.createShadowRoot||i.attachShadow));}return kr$1}function Pr$1(i){if(ia$2()){let t=i.getRootNode?i.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function cd(){let i=typeof document<"u"&&document?document.activeElement:null;for(;i&&i.shadowRoot;){let t=i.shadowRoot.activeElement;if(t===i)break;i=t;}return i}function J$2(i){if(i.composedPath)try{return i.composedPath()[0]}catch(t){}return i.target}var ln$1;function ra$2(){if(ln$1==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ln$1=!0}));}finally{ln$1=ln$1||false;}return ln$1}function St$3(i){return ra$2()?i:!!i.capture}function si(i,t=0){return oa$2(i)?Number(i):arguments.length===2?t:0}function oa$2(i){return !isNaN(parseFloat(i))&&!isNaN(Number(i))}function fe(i){return i instanceof vr$2?i.nativeElement:i}var sa$2=new x("cdk-input-modality-detector-options"),aa$2={ignoreKeys:[18,17,224,91,16]},la$2=650,Nr$1={passive:true,capture:true},ca$2=(()=>{class i{_platform=T$1(O);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Sn(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(n=>n===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=J$2(e));};_onMousedown=e=>{Date.now()-this._lastTouchMs<la$2||(this._modality.next(sn$1(e)?"keyboard":"mouse"),this._mostRecentTarget=J$2(e));};_onTouchstart=e=>{if(an$1(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=J$2(e);};constructor(){let e=T$1(Ne$1),n=T$1(nr$2),r=T$1(sa$2,{optional:true});if(this._options=w$2(w$2({},aa$2),r),this.modalityDetected=this._modality.pipe(Nl$1(1)),this.modalityChanged=this.modalityDetected.pipe(bl()),this._platform.isBrowser){let o=T$1(pr$2).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(n,"keydown",this._onKeydown,Nr$1),o.listen(n,"mousedown",this._onMousedown,Nr$1),o.listen(n,"touchstart",this._onTouchstart,Nr$1)]);}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e());}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),cn$1=(function(i){return i[i.IMMEDIATE=0]="IMMEDIATE",i[i.EVENTUAL=1]="EVENTUAL",i})(cn$1||{}),da$2=new x("cdk-focus-monitor-default-options"),ai=St$3({passive:true,capture:true}),Lr$1=(()=>{class i{_ngZone=T$1(Ne$1);_platform=T$1(O);_inputModalityDetector=T$1(ca$2);_origin=null;_lastFocusOrigin=null;_windowFocused=false;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=false;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=true,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=false);};_document=T$1(nr$2);_stopInputModalityDetector=new ee$1;constructor(){let e=T$1(da$2,{optional:true});this._detectionMode=e?.detectionMode||cn$1.IMMEDIATE;}_rootNodeFocusAndBlurListener=e=>{let n=J$2(e);for(let r=n;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r);};monitor(e,n=false){let r=fe(e);if(!this._platform.isBrowser||r.nodeType!==1)return Oh();let o=Pr$1(r)||this._document,s=this._elementInfo.get(r);if(s)return n&&(s.checkChildren=true),s.subject;let l={checkChildren:n,subject:new ee$1,rootNode:o};return this._elementInfo.set(r,l),this._registerGlobalListeners(l),l.subject}stopMonitoring(e){let n=fe(e),r=this._elementInfo.get(n);r&&(r.subject.complete(),this._setClasses(n),this._elementInfo.delete(n),this._removeGlobalListeners(r));}focusVia(e,n,r){let o=fe(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([l,c])=>this._originChanged(l,n,c)):(this._setOrigin(n),typeof o.focus=="function"&&o.focus(r));}ngOnDestroy(){this._elementInfo.forEach((e,n)=>this.stopMonitoring(n));}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===cn$1.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,n){e.classList.toggle("cdk-focused",!!n),e.classList.toggle("cdk-touch-focused",n==="touch"),e.classList.toggle("cdk-keyboard-focused",n==="keyboard"),e.classList.toggle("cdk-mouse-focused",n==="mouse"),e.classList.toggle("cdk-program-focused",n==="program");}_setOrigin(e,n=false){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&n,this._detectionMode===cn$1.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?la$2:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r);}});}_onFocus(e,n){let r=this._elementInfo.get(n),o=J$2(e);!r||!r.checkChildren&&n!==o||this._originChanged(n,this._getFocusOrigin(o),r);}_onBlur(e,n){let r=this._elementInfo.get(n);!r||r.checkChildren&&e.relatedTarget instanceof Node&&n.contains(e.relatedTarget)||(this._setClasses(n),this._emitOrigin(r,null));}_emitOrigin(e,n){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(n));}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let n=e.rootNode,r=this._rootNodeFocusListenerCount.get(n)||0;r||this._ngZone.runOutsideAngular(()=>{n.addEventListener("focus",this._rootNodeFocusAndBlurListener,ai),n.addEventListener("blur",this._rootNodeFocusAndBlurListener,ai);}),this._rootNodeFocusListenerCount.set(n,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener);}),this._inputModalityDetector.modalityDetected.pipe(ig(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,true);}));}_removeGlobalListeners(e){let n=e.rootNode;if(this._rootNodeFocusListenerCount.has(n)){let r=this._rootNodeFocusListenerCount.get(n);r>1?this._rootNodeFocusListenerCount.set(n,r-1):(n.removeEventListener("focus",this._rootNodeFocusAndBlurListener,ai),n.removeEventListener("blur",this._rootNodeFocusAndBlurListener,ai),this._rootNodeFocusListenerCount.delete(n));}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId));}_originChanged(e,n,r){this._setClasses(e,n),this._emitOrigin(r,n),this._lastFocusOrigin=n;}_getClosestElementsInfo(e){let n=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&n.push([o,r]);}),n}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:n,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!n||n===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return  false;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(n))return  true}return  false}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var li=new WeakMap,he$1=(()=>{class i{_appRef;_injector=T$1(ae$1);_environmentInjector=T$1(se$1);load(e){let n=this._appRef=this._appRef||this._injector.get(_i$3),r=li.get(n);r||(r={loaders:new Set,refs:[]},li.set(n,r),n.onDestroy(()=>{li.get(n)?.refs.forEach(o=>o.destroy()),li.delete(n);})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(oF(e,{environmentInjector:this._environmentInjector})));}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var di=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(n,r){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2})}return i})(),ci;function dd(){if(ci===void 0&&(ci=null,typeof window<"u")){let i=window;i.trustedTypes!==void 0&&(ci=i.trustedTypes.createPolicy("angular#components",{createHTML:t=>t}));}return ci}function ud(i){return dd()?.createHTML(i)||i}function ua$2(i,t,e){let n=e.sanitize(Er$2.HTML,t);i.innerHTML=ud(n||"");}function fd(i){if(i.type==="characterData"&&i.target instanceof Comment)return  true;if(i.type==="childList"){for(let t=0;t<i.addedNodes.length;t++)if(!(i.addedNodes[t]instanceof Comment))return  false;for(let t=0;t<i.removedNodes.length;t++)if(!(i.removedNodes[t]instanceof Comment))return  false;return  true}return  false}var hd=(()=>{class i{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),md=(()=>{class i{_mutationObserverFactory=T$1(hd);_observedElements=new Map;_ngZone=T$1(Ne$1);ngOnDestroy(){this._observedElements.forEach((e,n)=>this._cleanupObserver(n));}observe(e){let n=fe(e);return new N$1(r=>{let s=this._observeElement(n).pipe(we$1(l=>l.filter(c=>!fd(c))),Zt$1(l=>!!l.length)).subscribe(l=>{this._ngZone.run(()=>{r.next(l);});});return ()=>{s.unsubscribe(),this._unobserveElement(n);}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else {let n=new ee$1,r=this._mutationObserverFactory.create(o=>n.next(o));r&&r.observe(e,{characterData:true,childList:true,subtree:true}),this._observedElements.set(e,{observer:r,stream:n,count:1});}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e));}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:n,stream:r}=this._observedElements.get(e);n&&n.disconnect(),r.complete(),this._observedElements.delete(e);}}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),ob=(()=>{class i{_contentObserver=T$1(md);_elementRef=T$1(vr$2);event=new Be$2;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe();}_disabled=false;get debounce(){return this._debounce}set debounce(e){this._debounce=si(e),this._subscribe();}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe();}ngOnDestroy(){this._unsubscribe();}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(Kh(this.debounce)):e).subscribe(this.event);}_unsubscribe(){this._currentSubscription?.unsubscribe();}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",tF],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return i})();var ha$2=(()=>{class i{_platform=T$1(O);isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return gd(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return  false;let n=pd(Ed(e));if(n&&(fa$1(n)===-1||!this.isVisible(n)))return  false;let r=e.nodeName.toLowerCase(),o=fa$1(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!wd(e)?false:r==="audio"?e.hasAttribute("controls")?o!==-1:false:r==="video"?o===-1?false:o!==null?true:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,n){return Cd(e)&&!this.isDisabled(e)&&(n?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function pd(i){try{return i.frameElement}catch(t){return null}}function gd(i){return !!(i.offsetWidth||i.offsetHeight||typeof i.getClientRects=="function"&&i.getClientRects().length)}function bd(i){let t=i.nodeName.toLowerCase();return t==="input"||t==="select"||t==="button"||t==="textarea"}function _d(i){return yd(i)&&i.type=="hidden"}function vd(i){return Dd(i)&&i.hasAttribute("href")}function yd(i){return i.nodeName.toLowerCase()=="input"}function Dd(i){return i.nodeName.toLowerCase()=="a"}function ma$2(i){if(!i.hasAttribute("tabindex")||i.tabIndex===void 0)return  false;let t=i.getAttribute("tabindex");return !!(t&&!isNaN(parseInt(t,10)))}function fa$1(i){if(!ma$2(i))return null;let t=parseInt(i.getAttribute("tabindex")||"",10);return isNaN(t)?-1:t}function wd(i){let t=i.nodeName.toLowerCase(),e=t==="input"&&i.type;return e==="text"||e==="password"||t==="select"||t==="textarea"}function Cd(i){return _d(i)?false:bd(i)||vd(i)||i.hasAttribute("contenteditable")||ma$2(i)}function Ed(i){return i.ownerDocument&&i.ownerDocument.defaultView||window}var ui=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=false;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(t){this._enabled=t,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(t,this._startAnchor),this._toggleAnchorTabIndex(t,this._endAnchor));}_enabled=true;constructor(t,e,n,r,o=false,s){this._element=t,this._checker=e,this._ngZone=n,this._document=r,this._injector=s,o||this.attachAnchors();}destroy(){let t=this._startAnchor,e=this._endAnchor;t&&(t.removeEventListener("focus",this.startAnchorListener),t.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=false;}attachAnchors(){return this._hasAttached?true:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener));}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=true),this._hasAttached)}focusInitialElementWhenReady(t){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(t)));})}focusFirstTabbableElementWhenReady(t){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(t)));})}focusLastTabbableElementWhenReady(t){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(t)));})}_getRegionBoundary(t){let e=this._element.querySelectorAll(`[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`);return t=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(t){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let n=this._getFirstTabbableElement(e);return n?.focus(t),!!n}return e.focus(t),true}return this.focusFirstTabbableElement(t)}focusFirstTabbableElement(t){let e=this._getRegionBoundary("start");return e&&e.focus(t),!!e}focusLastTabbableElement(t){let e=this._getRegionBoundary("end");return e&&e.focus(t),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(t){if(this._checker.isFocusable(t)&&this._checker.isTabbable(t))return t;let e=t.children;for(let n=0;n<e.length;n++){let r=e[n].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[n]):null;if(r)return r}return null}_getLastTabbableElement(t){if(this._checker.isFocusable(t)&&this._checker.isTabbable(t))return t;let e=t.children;for(let n=e.length-1;n>=0;n--){let r=e[n].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[n]):null;if(r)return r}return null}_createAnchor(){let t=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,t),t.classList.add("cdk-visually-hidden"),t.classList.add("cdk-focus-trap-anchor"),t.setAttribute("aria-hidden","true"),t}_toggleAnchorTabIndex(t,e){t?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex");}toggleAnchors(t){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(t,this._startAnchor),this._toggleAnchorTabIndex(t,this._endAnchor));}_executeOnStable(t){jy(t,{injector:this._injector});}},xd=(()=>{class i{_checker=T$1(ha$2);_ngZone=T$1(Ne$1);_document=T$1(nr$2);_injector=T$1(ae$1);constructor(){T$1(he$1).load(di);}create(e,n=false){return new ui(e,this._checker,this._ngZone,this._document,n,this._injector)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var pa$2=new x("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),ga$2=new x("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),Sd=0,Ad=(()=>{class i{_ngZone=T$1(Ne$1);_defaultOptions=T$1(ga$2,{optional:true});_liveElement;_document=T$1(nr$2);_sanitizer=T$1(mr$1);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=T$1(pa$2,{optional:true});this._liveElement=e||this._createLiveElement();}announce(e,...n){let r=this._defaultOptions,o,s;return n.length===1&&typeof n[0]=="number"?s=n[0]:[o,s]=n,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(l=>this._currentResolve=l)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:ua$2(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="");}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;}_createLiveElement(){let e="cdk-live-announcer-element",n=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<n.length;o++)n[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${Sd++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let n=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<n.length;r++){let o=n[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e);}}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var Md=200,fi$2=class fi{_letterKeyStream=new ee$1;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new ee$1;selectedItem=this._selectedItem;constructor(t,e){let n=typeof e?.debounceInterval=="number"?e.debounceInterval:Md;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(t),this._setupKeyHandler(n);}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete();}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t;}setItems(t){this._items=t;}handleKey(t){let e=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e));}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[];}_setupKeyHandler(t){this._letterKeyStream.pipe(xl$1(e=>this._pressedLetters.push(e)),Kh(t),Zt$1(()=>this._pressedLetters.length>0),we$1(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let n=1;n<this._items.length+1;n++){let r=(this._selectedItemIndex+n)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[];});}};function hi(i,...t){return t.length?t.some(e=>i[e]):i.altKey||i.shiftKey||i.ctrlKey||i.metaKey}var At$3=class At{_items;_activeItemIndex=Pe$2(-1);_activeItem=Pe$2(null);_wrap=false;_typeaheadSubscription=G.EMPTY;_itemChangesSubscription;_vertical=true;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=false;_pageUpAndDown={enabled:false,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,e){this._items=t,t instanceof Ko$2?this._itemChangesSubscription=t.changes.subscribe(n=>this._itemsChanged(n.toArray())):or$2(t)&&(this._effectRef=ta$3(()=>this._itemsChanged(t()),{injector:e}));}tabOut=new ee$1;change=new ee$1;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=true){return this._wrap=t,this}withVerticalOrientation(t=true){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new fi$2(e,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:n=>this._skipPredicateFn(n)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(n=>{this.setActiveItem(n);}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=true){return this._homeAndEnd=t,this}withPageUpDown(t=true,e=10){return this._pageUpAndDown={enabled:t,delta:e},this}setActiveItem(t){let e=this._activeItem();this.updateActiveItem(t),this._activeItem()!==e&&this.change.next(this._activeItemIndex());}onKeydown(t){let e=t.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!t[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||hi(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault();}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return !!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1);}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1);}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1);}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1);}updateActiveItem(t){let e=this._getItemsArray(),n=typeof t=="number"?t:e.indexOf(t),r=e[n];this._activeItem.set(r??null),this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n);}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete();}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t);}_setActiveInWrapMode(t){let e=this._getItemsArray();for(let n=1;n<=e.length;n++){let r=(this._activeItemIndex()+t*n+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t);}_setActiveItemByIndex(t,e){let n=this._getItemsArray();if(n[t]){for(;this._skipPredicateFn(n[t]);)if(t+=e,!n[t])return;this.setActiveItem(t);}}_getItemsArray(){return or$2(this._items)?this._items():this._items instanceof Ko$2?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let e=this._activeItem();if(e){let n=t.indexOf(e);n>-1&&n!==this._activeItemIndex()&&(this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n));}}};var Vr$1=class Vr extends At$3{setActiveItem(t){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(t),this.activeItem&&this.activeItem.setActiveStyles();}};var Br$1=class Br extends At$3{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin);}};var ba$2=new Map,Re=class i{_appId=T$1(Xs$1);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,e=false){this._appId!=="ng"&&(t+=this._appId);let n=ba$2.get(t);return n===void 0?n=0:n++,ba$2.set(t,n),`${t}${e?i._infix+"-":""}${n}`}static \u0275fac=function(e){return new(e||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})};var va$2=" ";function Fd(i,t,e){let n=pi$1(i,t);e=e.trim(),!n.some(r=>r.trim()===e)&&(n.push(e),i.setAttribute(t,n.join(va$2)));}function Rd(i,t,e){let n=pi$1(i,t);e=e.trim();let r=n.filter(o=>o!==e);r.length?i.setAttribute(t,r.join(va$2)):i.removeAttribute(t);}function pi$1(i,t){return i.getAttribute(t)?.match(/\S+/g)??[]}var ya$1="cdk-describedby-message",mi="cdk-describedby-host",Ur$1=0,o_=(()=>{class i{_platform=T$1(O);_document=T$1(nr$2);_messageRegistry=new Map;_messagesContainer=null;_id=`${Ur$1++}`;constructor(){T$1(he$1).load(di),this._id=T$1(Xs$1)+"-"+Ur$1++;}describe(e,n,r){if(!this._canBeDescribed(e,n))return;let o=jr$1(n,r);typeof n!="string"?(_a$1(n,this._id),this._messageRegistry.set(o,{messageElement:n,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(n,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o);}removeDescription(e,n,r){if(!n||!this._isElementNode(e))return;let o=jr$1(n,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof n=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o);}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null);}ngOnDestroy(){let e=this._document.querySelectorAll(`[${mi}="${this._id}"]`);for(let n=0;n<e.length;n++)this._removeCdkDescribedByReferenceIds(e[n]),e[n].removeAttribute(mi);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear();}_createMessageElement(e,n){let r=this._document.createElement("div");_a$1(r,this._id),r.textContent=e,n&&r.setAttribute("role",n),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(jr$1(e,n),{messageElement:r,referenceCount:0});}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e);}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",n=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<n.length;o++)n[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r;}_removeCdkDescribedByReferenceIds(e){let n=pi$1(e,"aria-describedby").filter(r=>r.indexOf(ya$1)!=0);e.setAttribute("aria-describedby",n.join(" "));}_addMessageReference(e,n){let r=this._messageRegistry.get(n);Fd(e,"aria-describedby",r.messageElement.id),e.setAttribute(mi,this._id),r.referenceCount++;}_removeMessageReference(e,n){let r=this._messageRegistry.get(n);r.referenceCount--,Rd(e,"aria-describedby",r.messageElement.id),e.removeAttribute(mi);}_isElementDescribedByMessage(e,n){let r=pi$1(e,"aria-describedby"),o=this._messageRegistry.get(n),s=o&&o.messageElement.id;return !!s&&r.indexOf(s)!=-1}_canBeDescribed(e,n){if(!this._isElementNode(e))return  false;if(n&&typeof n=="object")return  true;let r=n==null?"":`${n}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:false}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function jr$1(i,t){return typeof i=="string"?`${t||""}/${i}`:i}function _a$1(i,t){i.id||(i.id=`${ya$1}-${t}-${Ur$1++}`);}var Td=new x("cdk-dir-doc",{providedIn:"root",factory:()=>T$1(nr$2)}),Od=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Da$2(i){let t=i?.toLowerCase()||"";return t==="auto"&&typeof navigator<"u"&&navigator?.language?Od.test(navigator.language)?"rtl":"ltr":t==="rtl"?"rtl":"ltr"}var ze$2=(()=>{class i{get value(){return this.valueSignal()}valueSignal=Pe$2("ltr");change=new Be$2;constructor(){let e=T$1(Td,{optional:true});if(e){let n=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(Da$2(n||r||"ltr"));}}ngOnDestroy(){this.change.complete();}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function V$1(i){return i==null?"":typeof i=="string"?i:`${i}px`}function wa$2(i){return i!=null&&`${i}`!="false"}var be=(function(i){return i[i.NORMAL=0]="NORMAL",i[i.NEGATED=1]="NEGATED",i[i.INVERTED=2]="INVERTED",i})(be||{}),gi$2,tt$2;function bi$1(){if(tt$2==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return tt$2=false,tt$2;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)tt$2=true;else {let i=Element.prototype.scrollTo;i?tt$2=!/\{\s*\[native code\]\s*\}/.test(i.toString()):tt$2=false;}}return tt$2}function Mt$3(){if(typeof document!="object"||!document)return be.NORMAL;if(gi$2==null){let i=document.createElement("div"),t=i.style;i.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let e=document.createElement("div"),n=e.style;n.width="2px",n.height="1px",i.appendChild(e),document.body.appendChild(i),gi$2=be.NORMAL,i.scrollLeft===0&&(i.scrollLeft=1,gi$2=i.scrollLeft===0?be.NEGATED:be.INVERTED),i.remove();}return gi$2}function zr$1(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Ft$2,Ca$2=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function C_(){if(Ft$2)return Ft$2;if(typeof document!="object"||!document)return Ft$2=new Set(Ca$2),Ft$2;let i=document.createElement("input");return Ft$2=new Set(Ca$2.filter(t=>(i.setAttribute("type",t),i.type===t))),Ft$2}var Hr$1=class Hr{_box;_destroyed=new ee$1;_resizeSubject=new ee$1;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)));}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new N$1(e=>{let n=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),n.unsubscribe(),this._elementObservables.delete(t);}}).pipe(Zt$1(e=>e.some(n=>n.target===t)),og({bufferSize:1,refCount:true}),ig(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear();}},Ea$2=(()=>{class i{_cleanupErrorListener;_observers=new Map;_ngZone=T$1(Ne$1);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.();}observe(e,n){let r=n?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Hr$1(r)),this._observers.get(r).observe(e)}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var Id=new x("MATERIAL_ANIMATIONS"),xa$2=null;function kd(){return T$1(Id,{optional:true})?.animationsDisabled||T$1(zg,{optional:true})==="NoopAnimations"?"di-disabled":(xa$2??=T$1(oi).matchMedia("(prefers-reduced-motion)").matches,xa$2?"reduced-motion":"enabled")}function He$1(){return kd()!=="enabled"}var Pd=["notch"],Nd=["*"],Sa$2=["iconPrefixContainer"],Aa$2=["textPrefixContainer"],Ma$2=["iconSuffixContainer"],Fa$2=["textSuffixContainer"],Ld=["textField"],Vd=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],Bd=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function jd(i,t){i&1&&_p$1(0,"span",21);}function Ud(i,t){if(i&1&&(fi$3(0,"label",20),NE(1,1),pE(2,jd,1,0,"span",21),Nc$1()),i&2){let e=bE(2);bp$1("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Cp("for",e._control.disableAutomaticLabeling?null:e._control.id),cv(2),hE(!e.hideRequiredMarker&&e._control.required?2:-1);}}function zd(i,t){if(i&1&&pE(0,Ud,3,5,"label",20),i&2){let e=bE();hE(e._hasFloatingLabel()?0:-1);}}function Hd(i,t){i&1&&_p$1(0,"div",7);}function $d(i,t){}function Gd(i,t){if(i&1&&Ip(0,$d,0,0,"ng-template",13),i&2){bE(2);let e=kE(1);bp$1("ngTemplateOutlet",e);}}function Wd(i,t){if(i&1&&(fi$3(0,"div",9),pE(1,Gd,1,1,null,13),Nc$1()),i&2){let e=bE();bp$1("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),cv(),hE(e._forceDisplayInfixLabel()?-1:1);}}function Yd(i,t){i&1&&(fi$3(0,"div",10,2),NE(2,2),Nc$1());}function Xd(i,t){i&1&&(fi$3(0,"div",11,3),NE(2,3),Nc$1());}function Zd(i,t){}function Kd(i,t){if(i&1&&Ip(0,Zd,0,0,"ng-template",13),i&2){bE();let e=kE(1);bp$1("ngTemplateOutlet",e);}}function qd(i,t){i&1&&(fi$3(0,"div",14,4),NE(2,4),Nc$1());}function Jd(i,t){i&1&&(fi$3(0,"div",15,5),NE(2,5),Nc$1());}function Qd(i,t){i&1&&_p$1(0,"div",16);}function eu(i,t){i&1&&(fi$3(0,"div",18),NE(1,6),Nc$1());}function tu(i,t){if(i&1&&(fi$3(0,"mat-hint",22),tD(1),Nc$1()),i&2){let e=bE(2);bp$1("id",e._hintLabelId),cv(),Qp$1(e.hintLabel);}}function nu(i,t){if(i&1&&(fi$3(0,"div",19),pE(1,tu,2,2,"mat-hint",22),NE(2,7),_p$1(3,"div",23),NE(4,8),Nc$1()),i&2){let e=bE();cv(),hE(e.hintLabel?1:-1);}}var $r=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["mat-label"]]})}return i})(),Na$1=new x("MatError"),iu=(()=>{class i{id=T$1(Re).getId("mat-mdc-error-");static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["mat-error"],["","matError",""]],hostAttrs:[1,"mat-mdc-form-field-error","mat-mdc-form-field-bottom-align"],hostVars:1,hostBindings:function(n,r){n&2&&xp("id",r.id);},inputs:{id:"id"},features:[dD([{provide:Na$1,useExisting:i}])]})}return i})(),Gr$1=(()=>{class i{align="start";id=T$1(Re).getId("mat-mdc-hint-");static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(n,r){n&2&&(xp("id",r.id),Cp("align",null),$p("mat-mdc-form-field-hint-end",r.align==="end"));},inputs:{align:"align",id:"id"}})}return i})(),ru=new x("MatPrefix");var ou=new x("MatSuffix");var La$1=new x("FloatingLabelParent"),Ra$1=(()=>{class i{_elementRef=T$1(vr$2);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=T$1(Ea$2);_ngZone=T$1(Ne$1);_parent=T$1(La$1);_resizeSubscription=new G;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return su(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(n,r){n&2&&$p("mdc-floating-label--float-above",r.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return i})();function su(i){let t=i;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(true);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let n=e.scrollWidth;return e.remove(),n}var Ta$2="mdc-line-ripple--active",_i$2="mdc-line-ripple--deactivating",Oa$2=(()=>{class i{_elementRef=T$1(vr$2);_cleanupTransitionEnd;constructor(){let e=T$1(Ne$1),n=T$1(Gv$1);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=n.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let e=this._elementRef.nativeElement.classList;e.remove(_i$2),e.add(Ta$2);}deactivate(){this._elementRef.nativeElement.classList.add(_i$2);}_handleTransitionEnd=e=>{let n=this._elementRef.nativeElement.classList,r=n.contains(_i$2);e.propertyName==="opacity"&&r&&n.remove(Ta$2,_i$2);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return i})(),Ia$2=(()=>{class i{_elementRef=T$1(vr$2);_ngZone=T$1(Ne$1);open=false;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,n=e.querySelector(".mdc-floating-label");n?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(n.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>n.style.transitionDuration="");}))):e.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(e){let n=this._notch.nativeElement;!this.open||!e?n.style.width="":n.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`);}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(n,r){if(n&1&&Lp(Pd,5),n&2){let o;xE(o=AE())&&(r._notch=o.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(n,r){n&2&&$p("mdc-notched-outline--notched",r.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:Nd,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(n,r){n&1&&(ME(),Mp(0,"div",1),Sc$1(1,"div",2,0),NE(3),xc$1(),Mp(4,"div",3));},encapsulation:2})}return i})(),au=(()=>{class i{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i})}return i})();var lu=new x("MatFormField"),cu=new x("MAT_FORM_FIELD_DEFAULT_OPTIONS"),ka$2="fill",du="auto",Pa$2="fixed",uu="translateY(-50%)",fu=(()=>{class i{_elementRef=T$1(vr$2);_changeDetectorRef=T$1(XL);_platform=T$1(O);_idGenerator=T$1(Re);_ngZone=T$1(Ne$1);_defaults=T$1(cu,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=YL("iconPrefixContainer");_textPrefixContainerSignal=YL("textPrefixContainer");_iconSuffixContainerSignal=YL("iconSuffixContainer");_textSuffixContainerSignal=YL("textSuffixContainer");_prefixSuffixContainers=dt$2(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=KL($r);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=wa$2(e);}_hideRequiredMarker=false;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||du}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let n=e||this._defaults?.appearance||ka$2;this._appearanceSignal.set(n);}_appearanceSignal=Pe$2(ka$2);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Pa$2}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Pa$2;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e;}_destroyed=new ee$1;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=He$1();constructor(){let e=this._defaults,n=T$1(ze$2);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),ta$3(()=>this._currentDirection=n.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=dt$2(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(e){let n=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),n.controlType&&this._elementRef.nativeElement.classList.add(r+n.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=n.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),this._describedByChanges?.unsubscribe(),this._describedByChanges=n.stateChanges.pipe(Sl$1([void 0,void 0]),we$1(()=>[n.errorState,n.userAriaDescribedBy]),ng(),Zt$1(([[o,s],[l,c]])=>o!==l||s!==c)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),n.ngControl&&n.ngControl.valueChanges&&(this._valueChanges=n.ngControl.valueChanges.pipe(ig(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Qh(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=true,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e);}_syncOutlineLabelOffset(){rF({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=dt$2(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(e){let n=this._control?this._control.ngControl:null;return n&&n[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(l=>l.align==="start"):null,s=this._hintChildren?this._hintChildren.find(l=>l.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id);}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let n=this._control.describedByIds,r;if(n){let o=this._describedByIds||e;r=e.concat(n.filter(s=>s&&!o.includes(s)));}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e;}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,n=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,l=n?.getBoundingClientRect().width??0,c=r?.getBoundingClientRect().width??0,u=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",f=`${s+l}px`,N=`calc(${d} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,F=`var(--mat-mdc-form-field-label-transform, ${uu} translateX(${N}))`,M=s+l+c+u;return [F,M]}_writeOutlinedLabelStyles(e){if(e!==null){let[n,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=n),r!==null&&this._notchedOutline?._setMaxWidth(r);}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let n=e.getRootNode();return n&&n!==e}return document.documentElement.contains(e)}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["mat-form-field"]],contentQueries:function(n,r,o){if(n&1&&(Fp(o,r._labelChild,$r,5),Pp(o,au,5)(o,ru,5)(o,ou,5)(o,Na$1,5)(o,Gr$1,5)),n&2){RE();let s;xE(s=AE())&&(r._formFieldControl=s.first),xE(s=AE())&&(r._prefixChildren=s),xE(s=AE())&&(r._suffixChildren=s),xE(s=AE())&&(r._errorChildren=s),xE(s=AE())&&(r._hintChildren=s);}},viewQuery:function(n,r){if(n&1&&(jp(r._iconPrefixContainerSignal,Sa$2,5)(r._textPrefixContainerSignal,Aa$2,5)(r._iconSuffixContainerSignal,Ma$2,5)(r._textSuffixContainerSignal,Fa$2,5),Lp(Ld,5)(Sa$2,5)(Aa$2,5)(Ma$2,5)(Fa$2,5)(Ra$1,5)(Ia$2,5)(Oa$2,5)),n&2){RE(4);let o;xE(o=AE())&&(r._textField=o.first),xE(o=AE())&&(r._iconPrefixContainer=o.first),xE(o=AE())&&(r._textPrefixContainer=o.first),xE(o=AE())&&(r._iconSuffixContainer=o.first),xE(o=AE())&&(r._textSuffixContainer=o.first),xE(o=AE())&&(r._floatingLabel=o.first),xE(o=AE())&&(r._notchedOutline=o.first),xE(o=AE())&&(r._lineRipple=o.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(n,r){n&2&&$p("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[dD([{provide:lu,useExisting:i},{provide:La$1,useExisting:i}])],ngContentSelectors:Bd,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(n,r){if(n&1&&(ME(Vd),Ip(0,zd,1,1,"ng-template",null,0,ID),fi$3(2,"div",6,1),Rp$1("click",function(s){return r._control.onContainerClick(s)}),pE(4,Hd,1,0,"div",7),fi$3(5,"div",8),pE(6,Wd,2,2,"div",9),pE(7,Yd,3,0,"div",10),pE(8,Xd,3,0,"div",11),fi$3(9,"div",12),pE(10,Kd,1,1,null,13),NE(11),Nc$1(),pE(12,qd,3,0,"div",14),pE(13,Jd,3,0,"div",15),Nc$1(),pE(14,Qd,1,0,"div",16),Nc$1(),fi$3(15,"div",17),pE(16,eu,2,0,"div",18)(17,nu,5,1,"div",19),Nc$1()),n&2){let o;cv(2),$p("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),cv(2),hE(!r._hasOutline()&&!r._control.disabled?4:-1),cv(2),hE(r._hasOutline()?6:-1),cv(),hE(r._hasIconPrefix?7:-1),cv(),hE(r._hasTextPrefix?8:-1),cv(2),hE(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),cv(2),hE(r._hasTextSuffix?12:-1),cv(),hE(r._hasIconSuffix?13:-1),cv(),hE(r._hasOutline()?-1:14),cv(),$p("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();cv(),hE((o=s)==="error"?16:o==="hint"?17:-1);}},dependencies:[Ra$1,Ia$2,Ki$1,Oa$2,Gr$1],styles:[`.mdc-text-field {
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
`],encapsulation:2})}return i})();var me$1=(function(i){return i[i.FADING_IN=0]="FADING_IN",i[i.VISIBLE=1]="VISIBLE",i[i.FADING_OUT=2]="FADING_OUT",i[i.HIDDEN=3]="HIDDEN",i})(me$1||{}),Wr$1=class Wr{_renderer;element;config;_animationForciblyDisabledThroughCss;state=me$1.HIDDEN;constructor(t,e,n,r=false){this._renderer=t,this.element=e,this.config=n,this._animationForciblyDisabledThroughCss=r;}fadeOut(){this._renderer.fadeOutRipple(this);}},Va$2=St$3({passive:true,capture:true}),Yr$1=class Yr{_events=new Map;addHandler(t,e,n,r){let o=this._events.get(e);if(o){let s=o.get(n);s?s.add(r):o.set(n,new Set([r]));}else this._events.set(e,new Map([[n,new Set([r])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,Va$2);});}removeHandler(t,e,n){let r=this._events.get(t);if(!r)return;let o=r.get(e);o&&(o.delete(n),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,Va$2)));}_delegateEventHandler=t=>{let e=J$2(t);e&&this._events.get(t.type)?.forEach((n,r)=>{(r===e||r.contains(e))&&n.forEach(o=>o.handleEvent(t));});}},dn={enterDuration:225,exitDuration:150},hu=800,Ba$1=St$3({passive:true,capture:true}),ja$1=["mousedown","touchstart"],Ua$1=["mouseup","mouseleave","touchend","touchcancel"],mu=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(n,r){},styles:[`.mat-ripple {
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
`],encapsulation:2})}return i})(),un$1=class i{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=false;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=false;_containerRect=null;static _eventManager=new Yr$1;constructor(t,e,n,r,o){this._target=t,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=fe(n)),o&&o.get(he$1).load(mu);}fadeInRipple(t,e,n={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=w$2(w$2({},dn),n.animation);n.centered&&(t=r.left+r.width/2,e=r.top+r.height/2);let s=n.radius||pu(t,e,r),l=t-r.left,c=e-r.top,u=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${l-s}px`,d.style.top=`${c-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,n.color!=null&&(d.style.backgroundColor=n.color),d.style.transitionDuration=`${u}ms`,this._containerElement.appendChild(d);let f=window.getComputedStyle(d),y=f.transitionProperty,N=f.transitionDuration,F=y==="none"||N==="0s"||N==="0s, 0s"||r.width===0&&r.height===0,M=new Wr$1(this,d,n,F);d.style.transform="scale3d(1, 1, 1)",M.state=me$1.FADING_IN,n.persistent||(this._mostRecentTransientRipple=M);let B=null;return !F&&(u||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let De=()=>{B&&(B.fallbackTimer=null),clearTimeout(Oe),this._finishRippleTransition(M);},Te=()=>this._destroyRipple(M),Oe=setTimeout(Te,u+100);d.addEventListener("transitionend",De),d.addEventListener("transitioncancel",Te),B={onTransitionEnd:De,onTransitionCancel:Te,fallbackTimer:Oe};}),this._activeRipples.set(M,B),(F||!u)&&this._finishRippleTransition(M),M}fadeOutRipple(t){if(t.state===me$1.FADING_OUT||t.state===me$1.HIDDEN)return;let e=t.element,n=w$2(w$2({},dn),t.config.animation);e.style.transitionDuration=`${n.exitDuration}ms`,e.style.opacity="0",t.state=me$1.FADING_OUT,(t._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(t);}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut());}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut();});}setupTriggerEvents(t){let e=fe(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,ja$1.forEach(n=>{i._eventManager.addHandler(this._ngZone,n,e,this);}));}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Ua$1.forEach(e=>{this._triggerElement.addEventListener(e,this,Ba$1);});}),this._pointerUpEventsRegistered=true);}_finishRippleTransition(t){t.state===me$1.FADING_IN?this._startFadeOutTransition(t):t.state===me$1.FADING_OUT&&this._destroyRipple(t);}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:n}=t.config;t.state=me$1.VISIBLE,!n&&(!e||!this._isPointerDown)&&t.fadeOut();}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=me$1.HIDDEN,e!==null&&(t.element.removeEventListener("transitionend",e.onTransitionEnd),t.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove();}_onMousedown(t){let e=sn$1(t),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+hu;!this._target.rippleDisabled&&!e&&!n&&(this._isPointerDown=true,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig));}_onTouchStart(t){if(!this._target.rippleDisabled&&!an$1(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=true;let e=t.changedTouches;if(e)for(let n=0;n<e.length;n++)this.fadeInRipple(e[n].clientX,e[n].clientY,this._target.rippleConfig);}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=false,this._getActiveRipples().forEach(t=>{let e=t.state===me$1.VISIBLE||t.config.terminateOnPointerUp&&t.state===me$1.FADING_IN;!t.config.persistent&&e&&t.fadeOut();}));}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(ja$1.forEach(e=>i._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(Ua$1.forEach(e=>t.removeEventListener(e,this,Ba$1)),this._pointerUpEventsRegistered=false));}};function pu(i,t,e){let n=Math.max(Math.abs(i-e.left),Math.abs(i-e.right)),r=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(n*n+r*r)}var Xr$1=new x("mat-ripple-global-options"),pv=(()=>{class i{_elementRef=T$1(vr$2);_animationsDisabled=He$1();color;unbounded=false;centered=false;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled();}_disabled=false;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled();}_trigger;_rippleRenderer;_globalOptions;_isInitialized=false;constructor(){let e=T$1(Ne$1),n=T$1(O),r=T$1(Xr$1,{optional:true}),o=T$1(ae$1);this._globalOptions=r||{},this._rippleRenderer=new un$1(this,e,this._elementRef,n,o);}ngOnInit(){this._isInitialized=true,this._setupTriggerEventsIfEnabled();}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents();}fadeOutAll(){this._rippleRenderer.fadeOutAll();}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent();}get rippleConfig(){return {centered:this.centered,radius:this.radius,color:this.color,animation:w$2(w$2(w$2({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger);}launch(e,n=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,n,w$2(w$2({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,w$2(w$2({},this.rippleConfig),e))}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(n,r){n&2&&$p("mat-ripple-unbounded",r.unbounded);},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return i})();var gu={capture:true},bu=["focus","mousedown","mouseenter","touchstart"],Zr$1="mat-ripple-loader-uninitialized",Kr$1="mat-ripple-loader-class-name",za$1="mat-ripple-loader-centered",vi$1="mat-ripple-loader-disabled",Ha$1=(()=>{class i{_document=T$1(nr$2);_animationsDisabled=He$1();_globalRippleOptions=T$1(Xr$1,{optional:true});_platform=T$1(O);_ngZone=T$1(Ne$1);_injector=T$1(ae$1);_eventCleanups;_hosts=new Map;constructor(){let e=T$1(pr$2).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>bu.map(n=>e.listen(this._document,n,this._onInteraction,gu)));}ngOnDestroy(){let e=this._hosts.keys();for(let n of e)this.destroyRipple(n);this._eventCleanups.forEach(n=>n());}configureRipple(e,n){e.setAttribute(Zr$1,this._globalRippleOptions?.namespace??""),(n.className||!e.hasAttribute(Kr$1))&&e.setAttribute(Kr$1,n.className||""),n.centered&&e.setAttribute(za$1,""),n.disabled&&e.setAttribute(vi$1,"");}setDisabled(e,n){let r=this._hosts.get(e);r?(r.target.rippleDisabled=n,!n&&!r.hasSetUpEvents&&(r.hasSetUpEvents=true,r.renderer.setupTriggerEvents(e))):n?e.setAttribute(vi$1,""):e.removeAttribute(vi$1);}_onInteraction=e=>{let n=J$2(e);if(n instanceof HTMLElement){let r=n.closest(`[${Zr$1}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r);}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let n=this._document.createElement("span");n.classList.add("mat-ripple",e.getAttribute(Kr$1)),e.append(n);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??dn.enterDuration,s=this._animationsDisabled?0:r?.animation?.exitDuration??dn.exitDuration,l={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(vi$1),rippleConfig:{centered:e.hasAttribute(za$1),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},c=new un$1(l,this._ngZone,n,this._platform,this._injector),u=!l.rippleDisabled;u&&c.setupTriggerEvents(e),this._hosts.set(e,{target:l,renderer:c,hasSetUpEvents:u}),e.removeAttribute(Zr$1);}destroyRipple(e){let n=this._hosts.get(e);n&&(n.renderer._removeTriggerEvents(),this._hosts.delete(e));}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var $a$2=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["structural-styles"]],decls:0,vars:0,template:function(n,r){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2})}return i})();var _u=["*",[["","progressIndicator",""]]],vu=["*","[progressIndicator]"];function yu(i,t){i&1&&(Sc$1(0,"div",1),NE(1,1),xc$1());}var Du=new x("MAT_BUTTON_CONFIG");function Ga$1(i){return i==null?void 0:nF(i)}var yi$1=(()=>{class i{_elementRef=T$1(vr$2);_ngZone=T$1(Ne$1);_animationsDisabled=He$1();_config=T$1(Du,{optional:true});_focusMonitor=T$1(Lr$1);_cleanupClick;_renderer=T$1(Gv$1);_rippleLoader=T$1(Ha$1);_isAnchor;_isFab=false;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled();}_disableRipple=false;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled();}_disabled=false;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e;}showProgress=QL(false,{transform:tF});constructor(){T$1(he$1).load($a$2);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??false,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"});}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,true),this._isAnchor&&this._setupAsAnchor();}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);}focus(e="program",n){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,n):this._elementRef.nativeElement.focus(n);}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?true:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:true}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled);}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation());}));}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(n,r){n&2&&(Cp("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),WE(r.color?"mat-"+r.color:""),$p("mat-mdc-button-progress-indicator-shown",r.showProgress())("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled));},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",tF],disabled:[2,"disabled","disabled",tF],ariaDisabled:[2,"aria-disabled","ariaDisabled",tF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",tF],tabIndex:[2,"tabIndex","tabIndex",Ga$1],_tabindex:[2,"tabindex","_tabindex",Ga$1],showProgress:[1,"showProgress"]}})}return i})(),wu=(()=>{class i extends yi$1{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:true});}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[yp],ngContentSelectors:vu,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(n,r){n&1&&(ME(_u),Mp(0,"span",0),NE(1),pE(2,yu,2,0,"div",1),Mp(3,"span",2)(4,"span",3)),n&2&&(cv(2),hE(r.showProgress()?2:-1));},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2})}return i})();var Ya$2=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],Xa$2=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function Cu(i,t){i&1&&(Sc$1(0,"div",2),NE(1,3),xc$1());}function Eu(i,t){i&1&&(Sc$1(0,"div",2),NE(1,3),xc$1());}var xu=`.mat-mdc-fab-base {
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
`,Wa$1=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),zv=(()=>{class i extends yi$1{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text");}_appearance=null;constructor(){super();let e=Su(this._elementRef.nativeElement);e&&this.setAppearance(e);}setAppearance(e){if(e===this._appearance)return;let n=this._elementRef.nativeElement.classList,r=this._appearance?Wa$1.get(this._appearance):null,o=Wa$1.get(e);r&&n.remove(...r),n.add(...o),this._appearance=e;}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[yp],ngContentSelectors:Xa$2,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(n,r){n&1&&(ME(Ya$2),Mp(0,"span",0),NE(1),Sc$1(2,"span",1),NE(3,1),xc$1(),NE(4,2),pE(5,Cu,2,0,"div",2),Mp(6,"span",3)(7,"span",4)),n&2&&($p("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab),cv(5),hE(r.showProgress()?5:-1));},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2})}return i})();function Su(i){return i.hasAttribute("mat-raised-button")?"elevated":i.hasAttribute("mat-stroked-button")?"outlined":i.hasAttribute("mat-flat-button")?"filled":i.hasAttribute("mat-button")?"text":null}var Au=new x("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>qr$1}),qr$1={color:"accent"};var Hv=(()=>{class i extends yi$1{_options=T$1(Au,{optional:true});_isFab=true;constructor(){super(),this._options=this._options||qr$1,this.color=this._options.color||qr$1.color;}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["button","mat-mini-fab",""],["a","mat-mini-fab",""],["button","matMiniFab",""],["a","matMiniFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"],exportAs:["matButton","matAnchor"],features:[yp],ngContentSelectors:Xa$2,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(n,r){n&1&&(ME(Ya$2),Mp(0,"span",0),NE(1),Sc$1(2,"span",1),NE(3,1),xc$1(),NE(4,2),pE(5,Eu,2,0,"div",2),Mp(6,"span",3)(7,"span",4)),n&2&&($p("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab),cv(5),hE(r.showProgress()?5:-1));},styles:[xu],encapsulation:2})}return i})();var Gv=(()=>{class i{isErrorState(e,n){return !!(e&&e.invalid&&(e.touched||n&&n.submitted))}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var Za$1=class Za{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;constructor(t,e,n,r,o){this._defaultMatcher=t,this.ngControl=e,this._parentFormGroup=n,this._parentForm=r,this._stateChanges=o;}updateErrorState(){let t=this.errorState,e=this._parentFormGroup||this._parentForm,n=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=n?.isErrorState(r,e)??false;o!==t&&(this.errorState=o,this._stateChanges.next());}};var Mu=20,Di$2=(()=>{class i{_ngZone=T$1(Ne$1);_platform=T$1(O);_renderer=T$1(pr$2).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new ee$1;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)));}deregister(e){let n=this.scrollContainers.get(e);n&&(n.unsubscribe(),this.scrollContainers.delete(e));}scrolled(e=Mu){return this._platform.isBrowser?new N$1(n=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(Zh(e)).subscribe(n):this._scrolled.subscribe(n);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0);}}):Oh()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,n)=>this.deregister(n)),this._scrolled.complete();}ancestorScrolled(e,n){let r=this.getAncestorScrollContainers(e);return this.scrolled(n).pipe(Zt$1(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let n=[];return this.scrollContainers.forEach((r,o)=>{this._targetContainsElement(o,e)&&n.push(o);}),n}_targetContainsElement(e,n){let r=fe(n),o=e.getElementRef().nativeElement;do if(r==o)return  true;while(r=r.parentElement);return  false}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),Fu=(()=>{class i{elementRef=T$1(vr$2);scrollDispatcher=T$1(Di$2);ngZone=T$1(Ne$1);dir=T$1(ze$2,{optional:true});_scrollElement=this.elementRef.nativeElement;_destroyed=new ee$1;_renderer=T$1(Gv$1);_cleanupScroll;_elementScrolled=new ee$1;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this);}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete();}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let n=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=n.scrollHeight-n.clientHeight-e.bottom),r&&Mt$3()!=be.NORMAL?(e.left!=null&&(e.right=n.scrollWidth-n.clientWidth-e.left),Mt$3()==be.INVERTED?e.left=e.right:Mt$3()==be.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=n.scrollWidth-n.clientWidth-e.right),this._applyScrollToOptions(e);}_applyScrollToOptions(e){let n=this.elementRef.nativeElement;bi$1()?n.scrollTo(e):(e.top!=null&&(n.scrollTop=e.top),e.left!=null&&(n.scrollLeft=e.left));}measureScrollOffset(e){let n="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:n:e=="end"&&(e=s?n:r),s&&Mt$3()==be.INVERTED?e==n?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Mt$3()==be.NEGATED?e==n?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==n?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return i})(),Ru=20,fn=(()=>{class i{_platform=T$1(O);_listeners;_viewportSize=null;_change=new ee$1;_document=T$1(nr$2);constructor(){let e=T$1(Ne$1),n=T$1(pr$2).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[n.listen("window","resize",r),n.listen("window","orientationchange",r)];}this.change().subscribe(()=>this._viewportSize=null);});}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete();}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:n,height:r}=this.getViewportSize();return {top:e.top,left:e.left,bottom:e.top+r,right:e.left+n,height:r,width:n}}getViewportScrollPosition(){if(!this._platform.isBrowser)return {top:0,left:0};let e=this._document,n=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||n.scrollY||r.scrollTop||0,l=-o.left||e.body?.scrollLeft||n.scrollX||r.scrollLeft||0;return {top:s,left:l}}change(e=Ru){return e>0?this._change.pipe(Zh(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0};}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();var hn$1=class hn{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach());}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t;}},Jr$2=class Jr extends hn$1{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(t,e,n,r,o,s){super(),this.component=t,this.viewContainerRef=e,this.injector=n,this.projectableNodes=r,this.bindings=o||null,this.directives=s||null;}},mn$1=class mn extends hn$1{templateRef;viewContainerRef;context;injector;constructor(t,e,n,r){super(),this.templateRef=t,this.viewContainerRef=e,this.context=n,this.injector=r;}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}},Qr$1=class Qr extends hn$1{element;constructor(t){super(),this.element=t instanceof vr$2?t.nativeElement:t;}},wi$1=class wi{_attachedPortal=null;_disposeFn=null;_isDisposed=false;hasAttached(){return !!this._attachedPortal}attach(t){if(t instanceof Jr$2)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof mn$1)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Qr$1)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn();}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=true;}setDisposeFn(t){this._disposeFn=t;}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null);}},Ci$1=class Ci extends wi$1{outletElement;_appRef;_defaultInjector;constructor(t,e,n){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=n;}attachComponentPortal(t){let e;if(t.viewContainerRef){let n=t.injector||t.viewContainerRef.injector,r=n.get(Dn,null,{optional:true})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:n,ngModuleRef:r,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),this.setDisposeFn(()=>e.destroy());}else {let n=this._appRef,r=t.injector||this._defaultInjector||ae$1.NULL,o=r.get(se$1,n.injector);e=oF(t.component,{elementInjector:r,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),n.attachView(e.hostView),this.setDisposeFn(()=>{n.viewCount>0&&n.detachView(e.hostView),e.destroy();});}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,n=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return n.rootNodes.forEach(r=>this.outletElement.appendChild(r)),n.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(n);r!==-1&&e.remove(r);}),this._attachedPortal=t,n}attachDomPortal=t=>{let e=t.element;e.parentNode;let n=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(n,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{n.parentNode&&n.parentNode.replaceChild(e,n);});};dispose(){super.dispose(),this.outletElement.remove();}_getComponentRootNode(t){return t.hostView.rootNodes[0]}};var _y=(()=>{class i extends wi$1{_moduleRef=T$1(Dn,{optional:true});_document=T$1(nr$2);_viewContainerRef=T$1(bi$2);_isInitialized=false;_attachedRef=null;get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null);}attached=new Be$2;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=true;}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null;}attachComponentPortal(e){e.setAttachedHost(this);let n=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=n.createComponent(e.component,{index:n.length,injector:e.injector||n.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0});return n!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let n=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=n,this.attached.emit(n),n}attachDomPortal=e=>{let n=e.element;n.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),n.parentNode.insertBefore(r,n),this._getRootNode().appendChild(n),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(n,r);});};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Nm(i)))(r||i)}})();static \u0275dir=GI({type:i,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[yp]})}return i})();var Ka$2=bi$1();function Tu(i){return new Ei$2(i.get(fn),i.get(nr$2))}var Ei$2=class Ei{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=false;_document;constructor(t,e){this._viewportRuler=t,this._document=e;}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=V$1(-this._previousScrollPosition.left),t.style.top=V$1(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=true;}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,n=t.style,r=e.style,o=n.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=false,n.left=this._previousHTMLStyles.left,n.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),Ka$2&&(n.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Ka$2&&(n.scrollBehavior=o,r.scrollBehavior=s);}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return  false;let e=this._document.documentElement,n=this._viewportRuler.getViewportSize();return e.scrollHeight>n.height||e.scrollWidth>n.width}};var xi$1=class xi{enable(){}disable(){}attach(){}};function eo$1(i,t){return t.some(e=>{let n=i.bottom<e.top,r=i.top>e.bottom,o=i.right<e.left,s=i.left>e.right;return n||r||o||s})}function qa$2(i,t){return t.some(e=>{let n=i.top<e.top,r=i.bottom>e.bottom,o=i.left<e.left,s=i.right>e.right;return n||r||o||s})}function il(i,t){return new Si$1(i.get(Di$2),i.get(fn),i.get(Ne$1),t)}var Si$1=class Si{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,n,r){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=n,this._config=r;}attach(t){this._overlayRef,this._overlayRef=t;}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:n,height:r}=this._viewportRuler.getViewportSize();eo$1(e,[{width:n,height:r,bottom:r,right:n,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()));}});}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null);}detach(){this.disable(),this._overlayRef=null;}};var pn=class{positionStrategy;scrollStrategy=new xi$1;panelClass="";hasBackdrop=false;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=false;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let n of e)t[n]!==void 0&&(this[n]=t[n]);}}};var Ai$2=class Ai{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e;}};var rl=(()=>{class i{_attachedOverlays=[];_document=T$1(nr$2);_isAttached=false;ngOnDestroy(){this.detach();}add(e){this.remove(e),this._attachedOverlays.push(e);}remove(e){let n=this._attachedOverlays.indexOf(e);n>-1&&this._attachedOverlays.splice(n,1),this._attachedOverlays.length===0&&this.detach();}canReceiveEvent(e,n,r){return r.observers.length<1?false:e.eventPredicate?e.eventPredicate(n):true}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),ol=(()=>{class i extends rl{_ngZone=T$1(Ne$1);_renderer=T$1(pr$2).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener);}),this._isAttached=true);}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=false);}_keydownListener=e=>{let n=this._attachedOverlays;for(let r=n.length-1;r>-1;r--){let o=n[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),sl=(()=>{class i extends rl{_platform=T$1(O);_ngZone=T$1(Ne$1);_renderer=T$1(pr$2).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=false;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let n=this._document.body,r={capture:true},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(n,"pointerdown",this._pointerDownListener,r),o.listen(n,"click",this._clickListener,r),o.listen(n,"auxclick",this._clickListener,r),o.listen(n,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=n.style.cursor,n.style.cursor="pointer",this._cursorStyleIsSet=true),this._isAttached=true;}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=false),this._isAttached=false);}_pointerDownListener=e=>{this._pointerDownEventTarget=J$2(e);};_clickListener=e=>{let n=J$2(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:n;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let l=o[s],c=l._outsidePointerEvents;if(!(!l.hasAttached()||!this.canReceiveEvent(l,e,c))){if(Ja$1(l.overlayElement,n)||Ja$1(l.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>c.next(e)):c.next(e);}}};static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})();function Ja$1(i,t){let e=typeof ShadowRoot<"u"&&ShadowRoot,n=t;for(;n;){if(n===i)return  true;n=e&&n instanceof ShadowRoot?n.host:n.parentNode;}return  false}var al=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=BI({type:i,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(n,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2})}return i})(),ll=(()=>{class i{_platform=T$1(O);_containerElement;_document=T$1(nr$2);_styleLoader=T$1(he$1);ngOnDestroy(){this._containerElement?.remove();}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||zr$1()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove();}let n=this._document.createElement("div");n.classList.add(e),zr$1()?n.setAttribute("platform","test"):this._platform.isBrowser||n.setAttribute("platform","server"),this._document.body.appendChild(n),this._containerElement=n;}_loadStyles(){this._styleLoader.load(al);}static \u0275fac=function(n){return new(n||i)};static \u0275prov=yr$2({token:i,factory:i.\u0275fac})}return i})(),to$1=class to{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,n,r){this._renderer=e,this._ngZone=n,this.element=t.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r);}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents="none",t.classList.remove("cdk-overlay-backdrop-showing");});}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove();}};function io$1(i){return i&&i.nodeType===1}var Mi$1=class Mi{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new ee$1;_attachments=new ee$1;_detachments=new ee$1;_positionStrategy;_scrollStrategy;_locationChanges=G.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=false;_previousHostParent;_keydownEvents=new ee$1;_outsidePointerEvents=new ee$1;_afterNextRenderRef;constructor(t,e,n,r,o,s,l,c,u,d=false,f,y){this._portalOutlet=t,this._host=e,this._pane=n,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=l,this._location=c,this._outsideClickDispatcher=u,this._animationsDisabled=d,this._injector=f,this._renderer=y,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy;}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=jy(()=>{this.hasAttached()&&this.updatePosition();},{injector:this._injector}),this._togglePointerEvents(true),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,true),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()));}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(false),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=true;}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply();}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()));}updateSize(t){this._config=w$2(w$2({},this._config),t),this._updateElementSize();}setDirection(t){this._config=x$1(w$2({},this._config),{direction:t}),this._updateElementDirection();}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,true);}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,false);}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()));}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection());}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=V$1(this._config.width),t.height=V$1(this._config.height),t.minWidth=V$1(this._config.minWidth),t.minHeight=V$1(this._config.minHeight),t.maxWidth=V$1(this._config.maxWidth),t.maxHeight=V$1(this._config.maxHeight);}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none";}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;io$1(t)?t.after(this._host):t?.type==="parent"?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host);}if(this._config.usePopover)try{this._host.showPopover();}catch(t){}}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new to$1(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e);}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,true),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t));}):this._backdropRef.element.classList.add(t);}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host);}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach();}_toggleClasses(t,e,n){let r=xt$2(e||[]).filter(o=>!!o);r.length&&(n?t.classList.add(...r):t.classList.remove(...r));}_detachContentWhenEmpty(){let t=false;try{this._detachContentAfterRenderRef=jy(()=>{t=!0,this._detachContent();},{injector:this._injector});}catch(e){if(t)throw e;this._detachContent();}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent();}),this._detachContentMutationObserver.observe(this._pane,{childList:true}));}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,false),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent());}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect();}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.();}},Qa$1="cdk-overlay-connected-position-bounding-box",Ou=/([A-Za-z%]+)$/;function cl(i,t){return new Fi$1(t,i.get(fn),i.get(nr$2),i.get(O),i.get(ll))}var Fi$1=class Fi{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=false;_lastBoundingBoxSize={width:0,height:0};_isPushed=false;_canPush=true;_growAfterOpen=false;_hasFlexibleDimensions=true;_positionLocked=false;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=false;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new ee$1;_resizeSubscription=G.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,n,r,o){this._viewportRuler=e,this._document=n,this._platform=r,this._overlayContainer=o,this.setOrigin(t);}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(Qa$1),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=false,this._isInitialRender=true,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=true,this.apply();});}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,n=this._viewportRect,r=this._containerRect,o=[],s;for(let l of this._preferredPositions){let c=this._getOriginPoint(t,r,l),u=this._getOverlayPoint(c,e,l),d=this._getOverlayFit(u,e,n,l);if(d.isCompletelyWithinViewport){this._isPushed=false,this._applyPosition(l,c);return}if(this._canFitWithFlexibleDimensions(d,u,n)){o.push({position:l,origin:c,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(c,l)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:u,originPoint:c,position:l,overlayRect:e});}if(o.length){let l=null,c=-1;for(let u of o){let d=u.boundingBoxRect.width*u.boundingBoxRect.height*(u.position.weight||1);d>c&&(c=d,l=u);}this._isPushed=false,this._applyPosition(l.position,l.origin);return}if(this._canPush){this._isPushed=true,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint);}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe();}dispose(){this._isDisposed||(this._boundingBox&&nt$3(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(Qa$1),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=true);}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply();}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=true){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=true){return this._growAfterOpen=t,this}withPush(t=true){return this._canPush=t,this}withLockedPosition(t=true){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof vr$2?this._origin.nativeElement:io$1(this._origin)?this._origin:null}_getOriginPoint(t,e,n){let r;if(n.originX=="center")r=t.left+t.width/2;else {let s=this._isRtl()?t.right:t.left,l=this._isRtl()?t.left:t.right;r=n.originX=="start"?s:l;}e.left<0&&(r-=e.left);let o;return n.originY=="center"?o=t.top+t.height/2:o=n.originY=="top"?t.top:t.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(t,e,n){let r;n.overlayX=="center"?r=-e.width/2:n.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return n.overlayY=="center"?o=-e.height/2:o=n.overlayY=="top"?0:-e.height,{x:t.x+r,y:t.y+o}}_getOverlayFit(t,e,n,r){let o=tl(e),{x:s,y:l}=t,c=this._getOffset(r,"x"),u=this._getOffset(r,"y");c&&(s+=c),u&&(l+=u);let d=0-s,f=s+o.width-n.width,y=0-l,N=l+o.height-n.height,F=this._subtractOverflows(o.width,d,f),M=this._subtractOverflows(o.height,y,N),B=F*M;return {visibleArea:B,isCompletelyWithinViewport:o.width*o.height===B,fitsInViewportVertically:M===o.height,fitsInViewportHorizontally:F==o.width}}_canFitWithFlexibleDimensions(t,e,n){if(this._hasFlexibleDimensions){let r=n.bottom-e.y,o=n.right-e.x,s=el(this._overlayRef.getConfig().minHeight),l=el(this._overlayRef.getConfig().minWidth),c=t.fitsInViewportVertically||s!=null&&s<=r,u=t.fitsInViewportHorizontally||l!=null&&l<=o;return c&&u}return  false}_pushOverlayOnScreen(t,e,n){if(this._previousPushAmount&&this._positionLocked)return {x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let r=tl(e),o=this._viewportRect,s=Math.max(t.x+r.width-o.width,0),l=Math.max(t.y+r.height-o.height,0),c=Math.max(o.top-n.top-t.y,0),u=Math.max(o.left-n.left-t.x,0),d=0,f=0;return r.width<=o.width?d=u||-s:d=t.x<this._getViewportMarginStart()?o.left-n.left-t.x:0,r.height<=o.height?f=c||-l:f=t.y<this._getViewportMarginTop()?o.top-n.top-t.y:0,this._previousPushAmount={x:d,y:f},{x:t.x+d,y:t.y+f}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let n=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!Iu(this._lastScrollVisibility,n)){let r=new Ai$2(t,n);this._positionChanges.next(r);}this._lastScrollVisibility=n;}this._lastPosition=t,this._isInitialRender=false;}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),n,r=t.overlayY;t.overlayX==="center"?n="center":this._isRtl()?n=t.overlayX==="start"?"right":"left":n=t.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${n} ${r}`;}_calculateBoundingBoxRect(t,e){let n=this._viewportRect,r=this._isRtl(),o,s,l;if(e.overlayY==="top")s=t.y,o=n.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")l=n.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=n.height-l+this._getViewportMarginTop();else {let N=Math.min(n.bottom-t.y+n.top,t.y),F=this._lastBoundingBoxSize.height;o=N*2,s=t.y-N,o>F&&!this._isInitialRender&&!this._growAfterOpen&&(s=t.y-F/2);}let c=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,u=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,d,f,y;if(u)y=n.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=t.x-this._getViewportMarginStart();else if(c)f=t.x,d=n.right-t.x-this._getViewportMarginEnd();else {let N=Math.min(n.right-t.x+n.left,t.x),F=this._lastBoundingBoxSize.width;d=N*2,f=t.x-N,d>F&&!this._isInitialRender&&!this._growAfterOpen&&(f=t.x-F/2);}return {top:s,left:f,bottom:l,right:y,width:d,height:o}}_setBoundingBoxStyles(t,e){let n=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(n.height=Math.min(n.height,this._lastBoundingBoxSize.height),n.width=Math.min(n.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else {let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=V$1(n.width),r.height=V$1(n.height),r.top=V$1(n.top)||"auto",r.bottom=V$1(n.bottom)||"auto",r.left=V$1(n.left)||"auto",r.right=V$1(n.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=V$1(o)),s&&(r.maxWidth=V$1(s));}this._lastBoundingBoxSize=n,nt$3(this._boundingBox.style,r);}_resetBoundingBoxStyles(){nt$3(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""});}_resetOverlayElementStyles(){nt$3(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""});}_setOverlayElementStyles(t,e){let n={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let d=this._viewportRuler.getViewportScrollPosition();nt$3(n,this._getExactOverlayY(e,t,d)),nt$3(n,this._getExactOverlayX(e,t,d));}else n.position="static";let l="",c=this._getOffset(e,"x"),u=this._getOffset(e,"y");c&&(l+=`translateX(${c}px) `),u&&(l+=`translateY(${u}px)`),n.transform=l.trim(),s.maxHeight&&(r?n.maxHeight=V$1(s.maxHeight):o&&(n.maxHeight="")),s.maxWidth&&(r?n.maxWidth=V$1(s.maxWidth):o&&(n.maxWidth="")),nt$3(this._pane.style,n);}_getExactOverlayY(t,e,n){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,n)),t.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`;}else r.top=V$1(o.y);return r}_getExactOverlayX(t,e,n){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,n));let s;if(this._isRtl()?s=t.overlayX==="end"?"left":"right":s=t.overlayX==="end"?"right":"left",s==="right"){let l=this._document.documentElement.clientWidth;r.right=`${l-(o.x+this._overlayRect.width)}px`;}else r.left=V$1(o.x);return r}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),n=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return {isOriginClipped:qa$2(t,n),isOriginOutsideView:eo$1(t,n),isOverlayClipped:qa$2(e,n),isOverlayOutsideView:eo$1(e,n)}}_subtractOverflows(t,...e){return e.reduce((n,r)=>n-Math.max(r,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,n=this._viewportRuler.getViewportScrollPosition();return {top:n.top+this._getViewportMarginTop(),left:n.left+this._getViewportMarginStart(),right:n.left+t-this._getViewportMarginEnd(),bottom:n.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return !this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&xt$2(t).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e));});}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t);}),this._appliedPanelClasses=[]);}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof vr$2)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,n=t.height||0;return {top:t.y,bottom:t.y+n,left:t.x,right:t.x+e,height:n,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();t&&(e.style.display="block");let n=e.getBoundingClientRect();return t&&(e.style.display=""),n}};function nt$3(i,t){for(let e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);return i}function el(i){if(typeof i!="number"&&i!=null){let[t,e]=i.split(Ou);return !e||e==="px"?parseFloat(t):null}return i||null}function tl(i){return {top:Math.floor(i.top),right:Math.floor(i.right),bottom:Math.floor(i.bottom),left:Math.floor(i.left),width:Math.floor(i.width),height:Math.floor(i.height)}}function Iu(i,t){return i===t?true:i.isOriginClipped===t.isOriginClipped&&i.isOriginOutsideView===t.isOriginOutsideView&&i.isOverlayClipped===t.isOverlayClipped&&i.isOverlayOutsideView===t.isOverlayOutsideView}var nl="cdk-global-overlay-wrapper";function ku(i){return new Ri$1}var Ri$1=class Ri{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=false;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(nl),this._isDisposed=false;}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,n=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:l}=n,c=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),u=(o==="100%"||o==="100vh")&&(!l||l==="100%"||l==="100vh"),d=this._xPosition,f=this._xOffset,y=this._overlayRef.getConfig().direction==="rtl",N="",F="",M="";c?M="flex-start":d==="center"?(M="center",y?F=f:N=f):y?d==="left"||d==="end"?(M="flex-end",N=f):(d==="right"||d==="start")&&(M="flex-start",F=f):d==="left"||d==="start"?(M="flex-start",N=f):(d==="right"||d==="end")&&(M="flex-end",F=f),t.position=this._cssPosition,t.marginLeft=c?"0":N,t.marginTop=u?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=c?"0":F,e.justifyContent=M,e.alignItems=u?"flex-start":this._alignItems;}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,n=e.style;e.classList.remove(nl),n.justifyContent=n.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=true;}};var ro$2=new x("OVERLAY_DEFAULT_CONFIG");function dl(i,t){i.get(he$1).load(al);let e=i.get(ll),n=i.get(nr$2),r=i.get(Re),o=i.get(_i$3),s=i.get(ze$2),l=i.get(Gv$1,null,{optional:true})||i.get(pr$2).createRenderer(null,null),c=new pn(t),u=i.get(ro$2,null,{optional:true})?.usePopover??true;c.direction=c.direction||s.value,"showPopover"in n.body?c.usePopover=t?.usePopover??u:c.usePopover=false;let d=n.createElement("div"),f=n.createElement("div");d.id=r.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),f.appendChild(d),c.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let y=c.usePopover?c.positionStrategy?.getPopoverInsertionPoint?.():null;return io$1(y)?y.after(f):y?.type==="parent"?y.element.appendChild(f):e.getContainerElement().appendChild(f),new Mi$1(new Ci$1(d,o,i),f,d,c,i.get(Ne$1),i.get(ol),n,i.get(Rn),i.get(sl),t?.disableAnimations??i.get(zg,null,{optional:true})==="NoopAnimations",i.get(se$1),l)}var Pu=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],Nu=new x("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let i=T$1(ae$1);return ()=>il(i)}}),no$2=(()=>{class i{elementRef=T$1(vr$2);static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return i})(),ul=new x("cdk-connected-overlay-default-config"),Lu=(()=>{class i{_dir=T$1(ze$2,{optional:true});_injector=T$1(ae$1);_overlayRef;_templatePortal;_backdropSubscription=G.EMPTY;_attachSubscription=G.EMPTY;_detachSubscription=G.EMPTY;_positionSubscription=G.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=T$1(Nu);_ngZone=T$1(Ne$1);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position);}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position);}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=false;disableClose=false;transformOriginSelector;hasBackdrop=false;lockPosition=false;flexibleDimensions=false;growAfterOpen=false;push=false;disposeOnNavigation=false;usePopover;matchWidth=false;set _config(e){typeof e!="string"&&this._assignConfig(e);}backdropClick=new Be$2;positionChange=new Be$2;attach=new Be$2;detach=new Be$2;overlayKeydown=new Be$2;overlayOutsideClick=new Be$2;constructor(){let e=T$1(fr$2),n=T$1(bi$2),r=T$1(ul,{optional:true}),o=T$1(ro$2,{optional:true});this.usePopover=o?.usePopover===false?null:"global",this._templatePortal=new mn$1(e,n),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r);}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose();}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay());}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=Pu);let e=this._overlayRef=dl(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(n=>{this.overlayKeydown.next(n),n.keyCode===27&&!this.disableClose&&!hi(n)&&(n.preventDefault(),this.detachOverlay());}),this._overlayRef.outsidePointerEvents().subscribe(n=>{let r=this._getOriginElement(),o=J$2(n);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(n);});}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),n=new pn({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return (this.height||this.height===0)&&(n.height=this.height),(this.minWidth||this.minWidth===0)&&(n.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(n.minHeight=this.minHeight),this.backdropClass&&(n.backdropClass=this.backdropClass),this.panelClass&&(n.panelClass=this.panelClass),n}_updatePositionStrategy(e){let n=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(n).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=cl(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof no$2?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof no$2?this.origin.elementRef.nativeElement:this.origin instanceof vr$2?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(n=>this.backdropClick.emit(n)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(sg(()=>this.positionChange.observers.length>0)).subscribe(n=>{this._ngZone.run(()=>this.positionChange.emit(n)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe();})),this.open=true;}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=false;}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth;}static \u0275fac=function(n){return new(n||i)};static \u0275dir=GI({type:i,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",tF],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",tF],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",tF],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",tF],push:[2,"cdkConnectedOverlayPush","push",tF],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",tF],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",tF],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[lm]})}return i})();var ct=class{static scrollToTop(){window.scroll({top:0,left:0,behavior:"smooth"});}static isElementDisplayed(a){let t=document.getElementById(a);return t?window.getComputedStyle(t).display!=="none":(console.warn(`Element with id "${a}" not found.`),false)}static composeImgSrc(a){return `data:image/jpeg;base64,${a}`}static imageExtensionFor(a){return a.type==="image/png"?"png":"jpg"}};var lt$1=(()=>{class e{_animationsDisabled=He$1();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(n){return new(n||e)};static \u0275cmp=BI({type:e,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(n,i){n&2&&$p("mat-pseudo-checkbox-indeterminate",i.state==="indeterminate")("mat-pseudo-checkbox-checked",i.state==="checked")("mat-pseudo-checkbox-disabled",i.disabled)("mat-pseudo-checkbox-minimal",i.appearance==="minimal")("mat-pseudo-checkbox-full",i.appearance==="full")("_mat-animation-noopable",i._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(n,i){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return e})();var gt=["text"],ut$1=[[["mat-icon"]],"*"],bt=["mat-icon","*"];function ft(e,a){if(e&1&&_p$1(0,"mat-pseudo-checkbox",1),e&2){let t=bE();bp$1("disabled",t.disabled)("state",t.selected?"checked":"unchecked");}}function xt$1(e,a){if(e&1&&_p$1(0,"mat-pseudo-checkbox",3),e&2){let t=bE();bp$1("disabled",t.disabled);}}function vt(e,a){if(e&1&&(fi$3(0,"span",4),tD(1),Nc$1()),e&2){let t=bE();cv(),kc$1("(",t.group.label,")");}}var mt=new x("MAT_OPTION_PARENT_COMPONENT"),dt$1=new x("MatOptgroup");var F=class{source;isUserInput;constructor(a,t=false){this.source=a,this.isUserInput=t;}},kt$2=(()=>{class e{_element=T$1(vr$2);_changeDetectorRef=T$1(XL);_parent=T$1(mt,{optional:true});group=T$1(dt$1,{optional:true});_signalDisableRipple=false;_selected=false;_active=false;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=T$1(Re).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(t){this._disabled.set(t);}_disabled=Pe$2(false);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return !!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Be$2;_text;_stateChanges=new ee$1;constructor(){let t=T$1(he$1);t.load($a$2),t.load(di),this._signalDisableRipple=!!this._parent&&or$2(this._parent.disableRipple);}get active(){return this._active}get viewValue(){return (this._text?.nativeElement.textContent||"").trim()}select(t=true){this._selected||(this._selected=true,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent());}deselect(t=true){this._selected&&(this._selected=false,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent());}focus(t,n){let i=this._getHostElement();typeof i.focus=="function"&&i.focus(n);}setActiveStyles(){this._active||(this._active=true,this._changeDetectorRef.markForCheck());}setInactiveStyles(){this._active&&(this._active=false,this._changeDetectorRef.markForCheck());}getLabel(){return this.viewValue}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!hi(t)&&(this._selectViaInteraction(),t.preventDefault());}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:true,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(true));}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let t=this.viewValue;t!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=t);}}ngOnDestroy(){this._stateChanges.complete();}_emitSelectionChangeEvent(t=false){this.onSelectionChange.emit(new F(this,t));}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=BI({type:e,selectors:[["mat-option"]],viewQuery:function(n,i){if(n&1&&Lp(gt,7),n&2){let o;xE(o=AE())&&(i._text=o.first);}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(n,i){n&1&&Rp$1("click",function(){return i._selectViaInteraction()})("keydown",function(c){return i._handleKeydown(c)}),n&2&&(xp("id",i.id),Cp("aria-selected",i.selected)("aria-disabled",i.disabled.toString()),$p("mdc-list-item--selected",i.selected)("mat-mdc-option-multiple",i.multiple)("mat-mdc-option-active",i.active)("mdc-list-item--disabled",i.disabled));},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",tF]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:bt,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(n,i){n&1&&(ME(ut$1),pE(0,ft,1,2,"mat-pseudo-checkbox",1),NE(1),fi$3(2,"span",2,0),NE(4,1),Nc$1(),pE(5,xt$1,1,1,"mat-pseudo-checkbox",3),pE(6,vt,2,1,"span",4),_p$1(7,"div",5)),n&2&&(hE(i.multiple?0:-1),cv(5),hE(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),cv(),hE(i.group&&i.group._inert?6:-1),cv(),bp$1("matRippleTrigger",i._getHostElement())("matRippleDisabled",i.disabled||i.disableRipple));},dependencies:[lt$1,pv],styles:[`.mat-mdc-option {
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
`],encapsulation:2})}return e})();function yt(e,a,t){if(t.length){let n=a.toArray(),i=t.toArray(),o=0;for(let c=0;c<e+1;c++)n[c].group&&n[c].group===i[o]&&o++;return o}return 0}function wt$1(e,a,t,n){return e<t?e:e+a>t+n?Math.max(0,e-n+a):t}var B$1=class B{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new ee$1;constructor(a=false,t,n=true,i){this._multiple=a,this._emitChanges=n,this.compareWith=i,t&&t.length&&(a?t.forEach(o=>this._markSelected(o)):this._markSelected(t[0]),this._selectedToEmit.length=0);}select(...a){this._verifyValueAssignment(a),a.forEach(n=>this._markSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}deselect(...a){this._verifyValueAssignment(a),a.forEach(n=>this._unmarkSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}setSelection(...a){this._verifyValueAssignment(a);let t=this.selected,n=new Set(a.map(o=>this._getConcreteValue(o)));a.forEach(o=>this._markSelected(o)),t.filter(o=>!n.has(this._getConcreteValue(o,n))).forEach(o=>this._unmarkSelected(o));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(a){return this.isSelected(a)?this.deselect(a):this.select(a)}clear(a=true){this._unmarkAll();let t=this._hasQueuedChanges();return a&&this._emitChangeEvent(),t}isSelected(a){return this._selection.has(this._getConcreteValue(a))}isEmpty(){return this._selection.size===0}hasValue(){return !this.isEmpty()}sort(a){this._multiple&&this.selected&&this._selected.sort(a);}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[]);}_markSelected(a){a=this._getConcreteValue(a),this.isSelected(a)||(this._multiple||this._unmarkAll(),this.isSelected(a)||this._selection.add(a),this._emitChanges&&this._selectedToEmit.push(a));}_unmarkSelected(a){a=this._getConcreteValue(a),this.isSelected(a)&&(this._selection.delete(a),this._emitChanges&&this._deselectedToEmit.push(a));}_unmarkAll(){this.isEmpty()||this._selection.forEach(a=>this._unmarkSelected(a));}_verifyValueAssignment(a){a.length>1&&this._multiple;}_hasQueuedChanges(){return !!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(a,t){if(this.compareWith){t=t??this._selection;for(let n of t)if(this.compareWith(a,n))return n;return a}else return a}};var Ct$2=["*"],Mt$2=`.mdc-list {
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
`,Dt=["unscopedContent"],It$1=["text"],Lt$1=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Tt$1=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var St$2=new x("ListOption"),Et$1=(()=>{class e{_elementRef=T$1(vr$2);static \u0275fac=function(n){return new(n||e)};static \u0275dir=GI({type:e,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return e})(),At$2=(()=>{class e{_elementRef=T$1(vr$2);static \u0275fac=function(n){return new(n||e)};static \u0275dir=GI({type:e,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return e})(),Ot$1=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275dir=GI({type:e,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return e})(),ht$1=(()=>{class e{_listOption=T$1(St$2,{optional:true});_isAlignedAtStart(){return !this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(n){return new(n||e)};static \u0275dir=GI({type:e,hostVars:4,hostBindings:function(n,i){n&2&&$p("mdc-list-item__start",i._isAlignedAtStart())("mdc-list-item__end",!i._isAlignedAtStart());}})}return e})(),Rt$2=(()=>{class e extends ht$1{static \u0275fac=(()=>{let t;return function(i){return (t||(t=Nm(e)))(i||e)}})();static \u0275dir=GI({type:e,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[yp]})}return e})(),zt$2=(()=>{class e extends ht$1{static \u0275fac=(()=>{let t;return function(i){return (t||(t=Nm(e)))(i||e)}})();static \u0275dir=GI({type:e,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[yp]})}return e})(),Ft$1=new x("MAT_LIST_CONFIG"),Q$2=(()=>{class e{_isNonInteractive=true;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=wa$2(t);}_disableRipple=false;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(wa$2(t));}_disabled=Pe$2(false);_defaultOptions=T$1(Ft$1,{optional:true});static \u0275fac=function(n){return new(n||e)};static \u0275dir=GI({type:e,hostVars:1,hostBindings:function(n,i){n&2&&Cp("aria-disabled",i.disabled);},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return e})(),Pt$2=(()=>{class e{_elementRef=T$1(vr$2);_ngZone=T$1(Ne$1);_listBase=T$1(Q$2,{optional:true});_platform=T$1(O);_hostElement;_isButtonElement;_noopAnimations=He$1();_avatars;_icons;set lines(t){this._explicitLines=si(t,null),this._updateItemLines(false);}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=wa$2(t);}_disableRipple=false;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(wa$2(t));}_disabled=Pe$2(false);_subscriptions=new G;_rippleRenderer=null;_hasUnscopedTextContent=false;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){T$1(he$1).load($a$2);let t=T$1(Xr$1,{optional:true});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button");}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(true);}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents();}_hasIconOrAvatar(){return !!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new un$1(this,this._ngZone,this._hostElement,this._platform,T$1(ae$1)),this._rippleRenderer.setupTriggerEvents(this._hostElement);}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Qh(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(false)));});}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let n=this._explicitLines??this._inferLinesFromContent(),i=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",n<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",n<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",n===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",n===3),this._hasUnscopedTextContent){let o=this._titles.length===0&&n===1;i.classList.toggle("mdc-list-item__primary-text",o),i.classList.toggle("mdc-list-item__secondary-text",!o);}else i.classList.remove("mdc-list-item__primary-text"),i.classList.remove("mdc-list-item__secondary-text");}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()));}static \u0275fac=function(n){return new(n||e)};static \u0275dir=GI({type:e,contentQueries:function(n,i,o){if(n&1&&Pp(o,Rt$2,4)(o,zt$2,4),n&2){let c;xE(c=AE())&&(i._avatars=c),xE(c=AE())&&(i._icons=c);}},hostVars:4,hostBindings:function(n,i){n&2&&(Cp("aria-disabled",i.disabled)("disabled",i._isButtonElement&&i.disabled||null),$p("mdc-list-item--disabled",i.disabled));},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return e})();var Ye$1=(()=>{class e extends Q$2{static \u0275fac=(()=>{let t;return function(i){return (t||(t=Nm(e)))(i||e)}})();static \u0275cmp=BI({type:e,selectors:[["mat-list"]],hostAttrs:[1,"mat-mdc-list","mat-mdc-list-base","mdc-list"],exportAs:["matList"],features:[dD([{provide:Q$2,useExisting:e}]),yp],ngContentSelectors:Ct$2,decls:1,vars:0,template:function(n,i){n&1&&(ME(),NE(0));},styles:[Mt$2],encapsulation:2})}return e})(),qe$1=(()=>{class e extends Pt$2{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=wa$2(t);}_activated=false;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Nm(e)))(i||e)}})();static \u0275cmp=BI({type:e,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(n,i,o){if(n&1&&Pp(o,At$2,5)(o,Et$1,5)(o,Ot$1,5),n&2){let c;xE(c=AE())&&(i._lines=c),xE(c=AE())&&(i._titles=c),xE(c=AE())&&(i._meta=c);}},viewQuery:function(n,i){if(n&1&&Lp(Dt,5)(It$1,5),n&2){let o;xE(o=AE())&&(i._unscopedContent=o.first),xE(o=AE())&&(i._itemText=o.first);}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(n,i){n&2&&(Cp("aria-current",i._getAriaCurrent()),$p("mdc-list-item--activated",i.activated)("mdc-list-item--with-leading-avatar",i._avatars.length!==0)("mdc-list-item--with-leading-icon",i._icons.length!==0)("mdc-list-item--with-trailing-meta",i._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",i._hasBothLeadingAndTrailing())("_mat-animation-noopable",i._noopAnimations));},inputs:{activated:"activated"},exportAs:["matListItem"],features:[yp],ngContentSelectors:Tt$1,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(n,i){n&1&&(ME(Lt$1),NE(0),fi$3(1,"span",1),NE(2,1),NE(3,2),fi$3(4,"span",2,0),Rp$1("cdkObserveContent",function(){return i._updateItemLines(true)}),NE(6,3),Nc$1()(),NE(7,4),NE(8,5),_p$1(9,"div",3));},dependencies:[ob],encapsulation:2})}return e})();var m=(()=>{class e{get vertical(){return this._vertical}set vertical(t){this._vertical=wa$2(t);}_vertical=false;get inset(){return this._inset}set inset(t){this._inset=wa$2(t);}_inset=false;static \u0275fac=function(r){return new(r||e)};static \u0275cmp=BI({type:e,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(r,i){r&2&&(Cp("aria-orientation",i.vertical?"vertical":"horizontal"),$p("mat-divider-vertical",i.vertical)("mat-divider-horizontal",!i.vertical)("mat-divider-inset",i.inset));},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(r,i){},styles:[`.mat-divider {
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
`],encapsulation:2})}return e})();var e={backendUrl:"https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/"};
var p="primary",he=Symbol("RouteTitle"),yi=class{params;constructor(n){this.params=n||{};}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let t=this.params[n];return Array.isArray(t)?t[0]:t}return null}getAll(n){if(this.has(n)){let t=this.params[n];return Array.isArray(t)?t:[t]}return []}get keys(){return Object.keys(this.params)}};function wt(e){return new yi(e)}function fi$1(e,n,t){for(let i=0;i<e.length;i++){let r=e[i],a=n[i];if(r[0]===":")t[r.substring(1)]=a;else if(r!==a.path)return  false}return  true}function qn(e,n,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>e.length||t.pathMatch==="full"&&(n.hasChildren()||i.length<e.length))return null;let s={},l=e.slice(0,i.length);return fi$1(i,l,s)?{consumed:l,posParams:s}:null}if(r!==i.lastIndexOf("**"))return null;let a=i.slice(0,r),o=i.slice(r+1);if(a.length+o.length>e.length||t.pathMatch==="full"&&n.hasChildren()&&t.path!=="**")return null;let c={};return !fi$1(a,e.slice(0,a.length),c)||!fi$1(o,e.slice(e.length-o.length),c)?null:{consumed:e,posParams:c}}function Ne(e){return new Promise((n,t)=>{e.pipe(eg$1()).subscribe({next:i=>n(i),error:i=>t(i)});})}function qr(e,n){if(e.length!==n.length)return  false;for(let t=0;t<e.length;++t)if(!J$1(e[t],n[t]))return  false;return  true}function J$1(e,n){let t=e?bi(e):void 0,i=n?bi(n):void 0;if(!t||!i||t.length!=i.length)return  false;let r;for(let a=0;a<t.length;a++)if(r=t[a],!Vn(e[r],n[r]))return  false;return  true}function bi(e){return [...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Vn(e,n){if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return  false;let t=[...e].sort(),i=[...n].sort();return t.every((r,a)=>i[a]===r)}else return e===n}function Vr(e){return e.length>0?e[e.length-1]:null}function It(e){return Lh(e)?e:bc$1(e)?Ce(Promise.resolve(e)):Oh(e)}function Gn(e){return Lh(e)?Ne(e):Promise.resolve(e)}var Gr={exact:Qn,subset:Kn},Wn={exact:Wr,subset:Qr,ignored:()=>true},Oi={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},ie={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function Pi(e,n,t){let i=e instanceof D?e:n.parseUrl(e);return dt$2(()=>Ci(n.lastSuccessfulNavigation()?.finalUrl??new D,i,w$2(w$2({},ie),t)))}function Ci(e,n,t){return Gr[t.paths](e.root,n.root,t.matrixParams)&&Wn[t.queryParams](e.queryParams,n.queryParams)&&!(t.fragment==="exact"&&e.fragment!==n.fragment)}function Wr(e,n){return J$1(e,n)}function Qn(e,n,t){if(!Ct$1(e.segments,n.segments)||!xe(e.segments,n.segments,t)||e.numberOfChildren!==n.numberOfChildren)return  false;for(let i in n.children)if(!e.children[i]||!Qn(e.children[i],n.children[i],t))return  false;return  true}function Qr(e,n){return Object.keys(n).length<=Object.keys(e).length&&Object.keys(n).every(t=>Vn(e[t],n[t]))}function Kn(e,n,t){return Zn(e,n,n.segments,t)}function Zn(e,n,t,i){if(e.segments.length>t.length){let r=e.segments.slice(0,t.length);return !(!Ct$1(r,t)||n.hasChildren()||!xe(r,t,i))}else if(e.segments.length===t.length){if(!Ct$1(e.segments,t)||!xe(e.segments,t,i))return  false;for(let r in n.children)if(!e.children[r]||!Kn(e.children[r],n.children[r],i))return  false;return  true}else {let r=t.slice(0,e.segments.length),a=t.slice(e.segments.length);return !Ct$1(e.segments,r)||!xe(e.segments,r,i)||!e.children[p]?false:Zn(e.children[p],n,a,i)}}function xe(e,n,t){return n.every((i,r)=>Wn[t](e[r].parameters,i.parameters))}var D=class{root;queryParams;fragment;_queryParamMap;constructor(n=new v([],{}),t={},i=null){this.root=n,this.queryParams=t,this.fragment=i;}get queryParamMap(){return this._queryParamMap??=wt(this.queryParams),this._queryParamMap}toString(){return Yr.serialize(this)}},v=class{segments;children;parent=null;constructor(n,t){this.segments=n,this.children=t,Object.values(t).forEach(i=>i.parent=this);}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Te$1(this)}},lt=class{path;parameters;_parameterMap;constructor(n,t){this.path=n,this.parameters=t;}get parameterMap(){return this._parameterMap??=wt(this.parameters),this._parameterMap}toString(){return Jn(this)}};function Kr(e,n){return Ct$1(e,n)&&e.every((t,i)=>J$1(t.parameters,n[i].parameters))}function Ct$1(e,n){return e.length!==n.length?false:e.every((t,i)=>t.path===n[i].path)}function Zr(e,n){let t=[];return Object.entries(e.children).forEach(([i,r])=>{i===p&&(t=t.concat(n(r,i)));}),Object.entries(e.children).forEach(([i,r])=>{i!==p&&(t=t.concat(n(r,i)));}),t}var Ft=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:()=>new dt})}return e})(),dt=class{parse(n){let t=new Ri(n);return new D(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(n){let t=`/${Yt$1(n.root,true)}`,i=ta$1(n.queryParams),r=typeof n.fragment=="string"?`#${Jr$1(n.fragment)}`:"";return `${t}${i}${r}`}},Yr=new dt;function Te$1(e){return e.segments.map(n=>Jn(n)).join("/")}function Yt$1(e,n){if(!e.hasChildren())return Te$1(e);if(n){let t=e.children[p]?Yt$1(e.children[p],false):"",i=[];return Object.entries(e.children).forEach(([r,a])=>{r!==p&&i.push(`${r}:${Yt$1(a,false)}`);}),i.length>0?`${t}(${i.join("//")})`:t}else {let t=Zr(e,(i,r)=>r===p?[Yt$1(e.children[p],false)]:[`${r}:${Yt$1(i,false)}`]);return Object.keys(e.children).length===1&&e.children[p]!=null?`${Te$1(e)}/${t[0]}`:`${Te$1(e)}/(${t.join("//")})`}}function Yn(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Me$1(e){return Yn(e).replace(/%3B/gi,";")}function Jr$1(e){return encodeURI(e)}function wi(e){return Yn(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function ke$1(e){return decodeURIComponent(e)}function Pn(e){return ke$1(e.replace(/\+/g,"%20"))}function Jn(e){return `${wi(e.path)}${Xr(e.parameters)}`}function Xr(e){return Object.entries(e).map(([n,t])=>`;${wi(n)}=${wi(t)}`).join("")}function ta$1(e){let n=Object.entries(e).map(([t,i])=>Array.isArray(i)?i.map(r=>`${Me$1(t)}=${Me$1(r)}`).join("&"):`${Me$1(t)}=${Me$1(i)}`).filter(t=>t);return n.length?`?${n.join("&")}`:""}var ea$1=/^[^\/()?;#]+/;function gi$1(e){let n=e.match(ea$1);return n?n[0]:""}var ia$1=/^[^\/()?;=#]+/;function na$1(e){let n=e.match(ia$1);return n?n[0]:""}var ra$1=/^[^=?&#]+/;function aa$1(e){let n=e.match(ra$1);return n?n[0]:""}var oa$1=/^[^&#]+/;function sa$1(e){let n=e.match(oa$1);return n?n[0]:""}var Ri=class{url;remaining;constructor(n){this.url=n,this.remaining=n;}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new v([],{}):new v([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new b(4010,false);if(this.remaining==="")return {};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(true,n));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(false,n)),(t.length>0||Object.keys(i).length>0)&&(r[p]=new v(t,i)),r}parseSegment(){let n=gi$1(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new b(4009,false);return this.capture(n),new lt(ke$1(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let t=na$1(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=gi$1(this.remaining);r&&(i=r,this.capture(i));}n[ke$1(t)]=ke$1(i);}parseQueryParam(n){let t=aa$1(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=sa$1(this.remaining);o&&(i=o,this.capture(i));}let r=Pn(t),a=Pn(i);if(n.hasOwnProperty(r)){let o=n[r];Array.isArray(o)||(o=[o],n[r]=o),o.push(a);}else n[r]=a;}parseParens(n,t){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=gi$1(this.remaining),a=this.remaining[r.length];if(a!=="/"&&a!==")"&&a!==";")throw new b(4010,false);let o;r.indexOf(":")>-1?(o=r.slice(0,r.indexOf(":")),this.capture(o),this.capture(":")):n&&(o=p);let c=this.parseChildren(t+1);i[o??p]=Object.keys(c).length===1&&c[p]?c[p]:new v([],c),this.consumeOptional("//");}return i}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),true):false}capture(n){if(!this.consumeOptional(n))throw new b(4011,false)}};function Xn(e){return e.segments.length>0?new v([],{[p]:e}):e}function tr(e){let n={};for(let[i,r]of Object.entries(e.children)){let a=tr(r);if(i===p&&a.segments.length===0&&a.hasChildren())for(let[o,c]of Object.entries(a.children))n[o]=c;else (a.segments.length>0||a.hasChildren())&&(n[i]=a);}let t=new v(e.segments,n);return ca$1(t)}function ca$1(e){if(e.numberOfChildren===1&&e.children[p]){let n=e.children[p];return new v(e.segments.concat(n.segments),n.children)}return e}function ht(e){return e instanceof D}function er(e,n,t=null,i=null,r=new dt){let a=ir(e);return nr(a,n,t,i,r)}function ir(e){let n;function t(a){let o={};for(let s of a.children){let l=t(s);o[s.outlet]=l;}let c=new v(a.url,o);return a===e&&(n=c),c}let i=t(e.root),r=Xn(i);return n??r}function nr(e,n,t,i,r){let a=e;for(;a.parent;)a=a.parent;if(n.length===0)return vi(a,a,a,t,i,r);let o=la$1(n);if(o.toRoot())return vi(a,a,new v([],{}),t,i,r);let c=da$1(o,a,e),s=c.processChildren?Xt(c.segmentGroup,c.index,o.commands):ar(c.segmentGroup,c.index,o.commands);return vi(a,c.segmentGroup,s,t,i,r)}function Oe(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function ne(e){return typeof e=="object"&&e!=null&&e.outlets}function Un(e,n,t){e||="\u0275";let i=new D;return i.queryParams={[e]:n},t.parse(t.serialize(i)).queryParams[e]}function vi(e,n,t,i,r,a){let o={};for(let[l,u]of Object.entries(i??{}))o[l]=Array.isArray(u)?u.map(g=>Un(l,g,a)):Un(l,u,a);let c;e===n?c=t:c=rr(e,n,t);let s=Xn(tr(c));return new D(s,o,r)}function rr(e,n,t){let i={};return Object.entries(e.children).forEach(([r,a])=>{a===n?i[r]=t:i[r]=rr(a,n,t);}),new v(e.segments,i)}var Pe$1=class Pe{isAbsolute;numberOfDoubleDots;commands;constructor(n,t,i){if(this.isAbsolute=n,this.numberOfDoubleDots=t,this.commands=i,n&&i.length>0&&Oe(i[0]))throw new b(4003,false);let r=i.find(ne);if(r&&r!==Vr(i))throw new b(4004,false)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function la$1(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new Pe$1(true,0,e);let n=0,t=false,i=e.reduce((r,a,o)=>{if(typeof a=="object"&&a!=null){if(a.outlets){let c={};return Object.entries(a.outlets).forEach(([s,l])=>{c[s]=typeof l=="string"?l.split("/"):l;}),[...r,{outlets:c}]}if(a.segmentPath)return [...r,a.segmentPath]}return typeof a!="string"?[...r,a]:o===0?(a.split("/").forEach((c,s)=>{s==0&&c==="."||(s==0&&c===""?t=true:c===".."?n++:c!=""&&r.push(c));}),r):[...r,a]},[]);return new Pe$1(t,n,i)}var kt$1=class kt{segmentGroup;processChildren;index;constructor(n,t,i){this.segmentGroup=n,this.processChildren=t,this.index=i;}};function da$1(e,n,t){if(e.isAbsolute)return new kt$1(n,true,0);if(!t)return new kt$1(n,false,NaN);if(t.parent===null)return new kt$1(t,true,0);let i=Oe(e.commands[0])?0:1,r=t.segments.length-1+i;return ha$1(t,r,e.numberOfDoubleDots)}function ha$1(e,n,t){let i=e,r=n,a=t;for(;a>r;){if(a-=r,i=i.parent,!i)throw new b(4005,false);r=i.segments.length;}return new kt$1(i,false,r-a)}function ua$1(e){return ne(e[0])?e[0].outlets:{[p]:e}}function ar(e,n,t){if(e??=new v([],{}),e.segments.length===0&&e.hasChildren())return Xt(e,n,t);let i=pa$1(e,n,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<e.segments.length){let a=new v(e.segments.slice(0,i.pathIndex),{});return a.children[p]=new v(e.segments.slice(i.pathIndex),e.children),Xt(a,0,r)}else return i.match&&r.length===0?new v(e.segments,{}):i.match&&!e.hasChildren()?Si(e,n,t):i.match?Xt(e,0,r):Si(e,n,t)}function Xt(e,n,t){if(t.length===0)return new v(e.segments,{});{let i=ua$1(t),r={};if(Object.keys(i).some(a=>a!==p)&&e.children[p]&&e.numberOfChildren===1&&e.children[p].segments.length===0){let a=Xt(e.children[p],n,t);return new v(e.segments,a.children)}return Object.entries(i).forEach(([a,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[a]=ar(e.children[a],n,o));}),Object.entries(e.children).forEach(([a,o])=>{i[a]===void 0&&(r[a]=o);}),new v(e.segments,r)}}function pa$1(e,n,t){let i=0,r=n,a={match:false,pathIndex:0,commandIndex:0};for(;r<e.segments.length;){if(i>=t.length)return a;let o=e.segments[r],c=t[i];if(ne(c))break;let s=`${c}`,l=i<t.length-1?t[i+1]:null;if(r>0&&s===void 0)break;if(s&&l&&typeof l=="object"&&l.outlets===void 0){if(!jn(s,l,o))return a;i+=2;}else {if(!jn(s,{},o))return a;i++;}r++;}return {match:true,pathIndex:r,commandIndex:i}}function Si(e,n,t){let i=e.segments.slice(0,n),r=0;for(;r<t.length;){let a=t[r];if(ne(a)){let s=ma$1(a.outlets);return new v(i,s)}if(r===0&&Oe(t[0])){let s=e.segments[n];i.push(new lt(s.path,Ln(t[0]))),r++;continue}let o=ne(a)?a.outlets[p]:`${a}`,c=r<t.length-1?t[r+1]:null;o&&c&&Oe(c)?(i.push(new lt(o,Ln(c))),r+=2):(i.push(new lt(o,{})),r++);}return new v(i,{})}function ma$1(e){let n={};return Object.entries(e).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(n[t]=Si(new v([],{}),0,i));}),n}function Ln(e){let n={};return Object.entries(e).forEach(([t,i])=>n[t]=`${i}`),n}function jn(e,n,t){return e==t.path&&J$1(n,t.parameters)}var te="imperative",w=(function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e})(w||{}),U=class{id;url;constructor(n,t){this.id=n,this.url=t;}},Rt$1=class Rt extends U{type=w.NavigationStart;navigationTrigger;restoredState;constructor(n,t,i="imperative",r=null){super(n,t),this.navigationTrigger=i,this.restoredState=r;}toString(){return `NavigationStart(id: ${this.id}, url: '${this.url}')`}},q$1=class q extends U{urlAfterRedirects;type=w.NavigationEnd;constructor(n,t,i){super(n,t),this.urlAfterRedirects=i;}toString(){return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},E=(function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e[e.Aborted=4]="Aborted",e})(E||{}),re$1=(function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e})(re$1||{}),$$1=class $ extends U{reason;code;type=w.NavigationCancel;constructor(n,t,i,r){super(n,t),this.reason=i,this.code=r;}toString(){return `NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function or(e){return e instanceof $$1&&(e.code===E.Redirect||e.code===E.SupersededByNewNavigation)}var it$2=class it extends U{reason;code;type=w.NavigationSkipped;constructor(n,t,i,r){super(n,t),this.reason=i,this.code=r;}},St$1=class St extends U{error;target;type=w.NavigationError;constructor(n,t,i,r){super(n,t),this.error=i,this.target=r;}toString(){return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},ae=class extends U{urlAfterRedirects;state;type=w.RoutesRecognized;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r;}toString(){return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ue$1=class Ue extends U{urlAfterRedirects;state;type=w.GuardsCheckStart;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r;}toString(){return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Le=class extends U{urlAfterRedirects;state;shouldActivate;type=w.GuardsCheckEnd;constructor(n,t,i,r,a){super(n,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=a;}toString(){return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},je$1=class je extends U{urlAfterRedirects;state;type=w.ResolveStart;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r;}toString(){return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Fe=class extends U{urlAfterRedirects;state;type=w.ResolveEnd;constructor(n,t,i,r){super(n,t),this.urlAfterRedirects=i,this.state=r;}toString(){return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ze$1=class ze{route;type=w.RouteConfigLoadStart;constructor(n){this.route=n;}toString(){return `RouteConfigLoadStart(path: ${this.route.path})`}},He=class{route;type=w.RouteConfigLoadEnd;constructor(n){this.route=n;}toString(){return `RouteConfigLoadEnd(path: ${this.route.path})`}},Be=class{snapshot;type=w.ChildActivationStart;constructor(n){this.snapshot=n;}toString(){return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},$e=class{snapshot;type=w.ChildActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},qe=class{snapshot;type=w.ActivationStart;constructor(n){this.snapshot=n;}toString(){return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ve$1=class Ve{snapshot;type=w.ActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Ot=class{},oe=class{},Pt$1=class Pt{url;navigationBehaviorOptions;constructor(n,t){this.url=n,this.navigationBehaviorOptions=t;}};function fa(e){return !(e instanceof Ot)&&!(e instanceof Pt$1)&&!(e instanceof oe)}var Ge$1=class Ge{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new zt$1(this.rootInjector);}},zt$1=(()=>{class e{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t;}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r);}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null);}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t;}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new Ge$1(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||e)(Me$3(se$1))};static \u0275prov=te$1({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),We=class{_root;constructor(n){this._root=n;}get root(){return this._root.value}parent(n){let t=this.pathFromRoot(n);return t.length>1?t[t.length-2]:null}children(n){let t=Ii$1(n,this._root);return t?t.children.map(i=>i.value):[]}firstChild(n){let t=Ii$1(n,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(n){let t=Ei$1(n,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==n)}pathFromRoot(n){return Ei$1(n,this._root).map(t=>t.value)}};function Ii$1(e,n){if(e===n.value)return n;for(let t of n.children){let i=Ii$1(e,t);if(i)return i}return null}function Ei$1(e,n){if(e===n.value)return [n];for(let t of n.children){let i=Ei$1(e,t);if(i.length)return i.unshift(n),i}return []}var P=class{value;children;constructor(n,t){this.value=n,this.children=t;}toString(){return `TreeNode(${this.value})`}};function Tt(e){let n={};return e&&e.children.forEach(t=>n[t.value.outlet]=t),n}var se=class extends We{snapshot;constructor(n,t){super(n),this.snapshot=t,Li(this,n);}toString(){return this.snapshot.toString()}};function sr(e,n){let t=ga$1(e,n),i=new Sn([new lt("",{})]),r=new Sn({}),a=new Sn({}),o=new Sn({}),c=new Sn(""),s=new nt$2(i,r,o,c,a,p,e,t.root);return s.snapshot=t.root,new se(new P(s,[]),t)}function ga$1(e,n){let t={},i={},r={},o=new Ut$1([],t,r,"",i,p,e,null,{},n);return new ce$1("",new P(o,[]))}var nt$2=class nt{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;_localInjector;constructor(n,t,i,r,a,o,c,s){this.urlSubject=n,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=a,this.outlet=o,this.component=c,this._futureSnapshot=s,this.title=this.dataSubject?.pipe(we$1(l=>l[he]))??Oh(void 0),this.url=n,this.params=t,this.queryParams=i,this.fragment=r,this.data=a;}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(we$1(n=>wt(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(we$1(n=>wt(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}},va$1="always";function Ui(e,n,t){let i,{routeConfig:r}=e;return n!==null&&(t==="always"||r?.path===""||!n.component&&!n.routeConfig?.loadComponent)?i={params:w$2(w$2({},n.params),e.params),data:w$2(w$2({},n.data),e.data),resolve:w$2(w$2(w$2(w$2({},e.data),n.data),r?.data),e._resolvedData)}:i={params:w$2({},e.params),data:w$2({},e.data),resolve:w$2(w$2({},e.data),e._resolvedData??{})},r&&lr(r)&&(i.resolve[he]=r.title),i}var Ut$1=class Ut{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[he]}constructor(n,t,i,r,a,o,c,s,l,u){this.url=n,this.params=t,this.queryParams=i,this.fragment=r,this.data=a,this.outlet=o,this.component=c,this.routeConfig=s,this._resolve=l,this._environmentInjector=u;}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=wt(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=wt(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return `Route(url:'${n}', path:'${t}')`}},ce$1=class ce extends We{url;constructor(n,t){super(t),this.url=n,Li(this,t);}toString(){return cr(this._root)}};function Li(e,n){n.value._routerState=e,n.children.forEach(t=>Li(e,t));}function cr(e){let n=e.children.length>0?` { ${e.children.map(cr).join(", ")} } `:"";return `${e.value}${n}`}function _i$1(e){if(e.snapshot){let n=e.snapshot,t=e._futureSnapshot;e.snapshot=t,J$1(n.queryParams,t.queryParams)||e.queryParamsSubject.next(t.queryParams),n.fragment!==t.fragment&&e.fragmentSubject.next(t.fragment),J$1(n.params,t.params)||e.paramsSubject.next(t.params),qr(n.url,t.url)||e.urlSubject.next(t.url),J$1(n.data,t.data)||e.dataSubject.next(t.data);}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data);}function Ai$1(e,n){let t=J$1(e.params,n.params)&&Kr(e.url,n.url),i=!e.parent!=!n.parent;return t&&!i&&(!e.parent||Ai$1(e.parent,n.parent))}function lr(e){return typeof e.title=="string"||e.title===null}var dr=new x(""),ji$1=(()=>{class e{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=p;activateEvents=new Be$2;deactivateEvents=new Be$2;attachEvents=new Be$2;detachEvents=new Be$2;routerOutletData=QL();parentContexts=T$1(zt$1);location=T$1(bi$2);changeDetector=T$1(XL);inputBinder=T$1(Ye,{optional:true});supportsBindingToComponentInputs=true;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName();}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this);}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName();}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector));}get isActivated(){return !!this.activated}get component(){if(!this.activated)throw new b(4012,false);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new b(4012,false);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new b(4012,false);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance);}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t);}}activateWith(t,i){if(this.isActivated)throw new b(4013,false);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,c=this.parentContexts.getOrCreateContext(this.name).children,s=new Mi(t,c,r.injector,this.routerOutletData);this.activated=r.createComponent(o,{index:r.length,injector:s,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance);}static \u0275fac=function(i){return new(i||e)};static \u0275dir=GI({type:e,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[lm]})}return e})(),Mi=class{route;childContexts;parent;outletData;constructor(n,t,i,r){this.route=n,this.childContexts=t,this.parent=i,this.outletData=r;}get(n,t){return n===nt$2?this.route:n===zt$1?this.childContexts:n===dr?this.outletData:this.parent.get(n,t)}},Ye=new x("");var Fi=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=BI({type:e,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&_p$1(0,"router-outlet");},dependencies:[ji$1],encapsulation:2,changeDetection:1})}return e})();function zi$1(e){let n=e.children&&e.children.map(zi$1),t=n?x$1(w$2({},e),{children:n}):w$2({},e);return !t.component&&!t.loadComponent&&(n||t.loadChildren)&&t.outlet&&t.outlet!==p&&(t.component=Fi),t}function _a(e,n,t){let i=new Set,r=le(e,n._root,t?t._root:void 0,i);return {newlyCreatedRoutes:i,state:new se(r,n)}}function le(e,n,t,i){if(t&&e.shouldReuseRoute(n.value,t.value.snapshot)){let r=t.value;r._futureSnapshot=n.value;let a=ya(e,n,t,i);return new P(r,a)}else {if(e.shouldAttach(n.value)){let o=e.retrieve(n.value);if(o!==null){let c=o.route;return c.value._futureSnapshot=n.value,c.children=n.children.map(s=>le(e,s,void 0,i)),c}}let r=ba$1(n.value);i.add(r);let a=n.children.map(o=>le(e,o,void 0,i));return new P(r,a)}}function ya(e,n,t,i){return n.children.map(r=>{for(let a of t.children)if(e.shouldReuseRoute(r.value,a.value.snapshot))return le(e,r,a,i);return le(e,r,void 0,i)})}function ba$1(e){return new nt$2(new Sn(e.url),new Sn(e.params),new Sn(e.queryParams),new Sn(e.fragment),new Sn(e.data),e.outlet,e.component,e)}var Lt=class{redirectTo;navigationBehaviorOptions;constructor(n,t){this.redirectTo=n,this.navigationBehaviorOptions=t;}},hr="ngNavigationCancelingError";function Qe(e,n){let{redirectTo:t,navigationBehaviorOptions:i}=ht(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,r=ur(false,E.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function ur(e,n){let t=new Error(`NavigationCancelingError: ${""}`);return t[hr]=true,t.cancellationCode=n,t}function Ca$1(e){return pr(e)&&ht(e.url)}function pr(e){return !!e&&e[hr]}var Di$1=class Di{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,t,i,r,a){this.routeReuseStrategy=n,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=a;}activate(n){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,n),_i$1(this.futureState.root),this.activateChildRoutes(t,i,n);}deactivateChildRoutes(n,t,i){let r=Tt(t);n.children.forEach(a=>{let o=a.value.outlet;this.deactivateRoutes(a,r[o],i),delete r[o];}),Object.values(r).forEach(a=>{this.deactivateRouteAndItsChildren(a,i);});}deactivateRoutes(n,t,i){let r=n.value,a=t?t.value:null;if(r===a)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(n,t,o.children);}else this.deactivateChildRoutes(n,t,i);else a&&this.deactivateRouteAndItsChildren(t,i);}deactivateRouteAndItsChildren(n,t){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,t):this.deactivateRouteAndOutlet(n,t);}detachAndStoreRouteSubtree(n,t){let i=t.getContext(n.value.outlet),r=i&&n.value.component?i.children:t,a=Tt(n);for(let o of Object.values(a))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),c=i.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:o,route:n,contexts:c});}}deactivateRouteAndOutlet(n,t){let i=t.getContext(n.value.outlet),r=i&&n.value.component?i.children:t,a=Tt(n);for(let o of Object.values(a))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null),n.value._localInjector?.destroy();}activateChildRoutes(n,t,i){let r=Tt(t);n.children.forEach(a=>{this.activateRoutes(a,r[a.value.outlet],i),this.forwardEvent(new Ve$1(a.value.snapshot));}),n.children.length&&this.forwardEvent(new $e(n.value.snapshot));}activateRoutes(n,t,i){let r=n.value,a=t?t.value:null;if(_i$1(r),r===a)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(n,t,o.children);}else this.activateChildRoutes(n,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let c=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(c.contexts),o.attachRef=c.componentRef,o.route=c.route.value,o.outlet&&o.outlet.attach(c.componentRef,c.route.value),_i$1(c.route.value),this.activateChildRoutes(n,null,o.children);}else o.attachRef=null,o.route=r,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(n,null,o.children);}else this.activateChildRoutes(n,null,i);}},Ke=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1];}},Nt=class{component;route;constructor(n,t){this.component=n,this.route=t;}};function wa$1(e,n,t){let i=e._root,r=n?n._root:null;return Jt(i,r,t,[i.value])}function Ra(e){let n=e.routeConfig?e.routeConfig.canActivateChild:null;return !n||n.length===0?null:{node:e,guards:n}}function Ht$1(e,n){let t=Symbol(),i=n.get(e,t);return i===t?typeof e=="function"&&!mg(e)?e:n.get(e):i}function Jt(e,n,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let a=Tt(n);return e.children.forEach(o=>{Sa$1(o,a[o.value.outlet],t,i.concat([o.value]),r),delete a[o.value.outlet];}),Object.entries(a).forEach(([o,c])=>ee(c,t.getContext(o),r)),r}function Sa$1(e,n,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let a=e.value,o=n?n.value:null,c=t?t.getContext(e.value.outlet):null;if(o&&a.routeConfig===o.routeConfig){let s=Ia$1(o,a,a.routeConfig.runGuardsAndResolvers);s?r.canActivateChecks.push(new Ke(i)):(a.data=o.data,a._resolvedData=o._resolvedData),a.component?Jt(e,n,c?c.children:null,i,r):Jt(e,n,t,i,r),s&&c&&c.outlet&&c.outlet.isActivated&&r.canDeactivateChecks.push(new Nt(c.outlet.component,o));}else o&&ee(n,c,r),r.canActivateChecks.push(new Ke(i)),a.component?Jt(e,null,c?c.children:null,i,r):Jt(e,null,t,i,r);return r}function Ia$1(e,n,t){if(typeof t=="function")return Do$2(n._environmentInjector,()=>t(e,n));switch(t){case "pathParamsChange":return !Ct$1(e.url,n.url);case "pathParamsOrQueryParamsChange":return !Ct$1(e.url,n.url)||!J$1(e.queryParams,n.queryParams);case "always":return  true;case "paramsOrQueryParamsChange":return !Ai$1(e,n)||!J$1(e.queryParams,n.queryParams);default:return !Ai$1(e,n)}}function ee(e,n,t){let i=Tt(e),r=e.value;Object.entries(i).forEach(([a,o])=>{r.component?n?ee(o,n.children.getContext(a),t):ee(o,null,t):ee(o,n,t);}),r.component?n&&n.outlet&&n.outlet.isActivated?t.canDeactivateChecks.push(new Nt(n.outlet.component,r)):t.canDeactivateChecks.push(new Nt(null,r)):t.canDeactivateChecks.push(new Nt(null,r));}function ue(e){return typeof e=="function"}function Ea$1(e){return typeof e=="boolean"}function Aa$1(e){return e&&ue(e.canLoad)}function Ma$1(e){return e&&ue(e.canActivate)}function Da$1(e){return e&&ue(e.canActivateChild)}function xa$1(e){return e&&ue(e.canDeactivate)}function Ta$1(e){return e&&ue(e.canMatch)}function mr(e){return e instanceof kn$1||e?.name==="EmptyError"}var De$1=Symbol("INITIAL_VALUE");function jt$1(){return sl$1(e=>Wh(e.map(n=>n.pipe(yt$2(1),Sl$1(De$1)))).pipe(we$1(n=>{for(let t of n)if(t!==true){if(t===De$1)return De$1;if(t===false||ka$1(t))return t}return  true}),Zt$1(n=>n!==De$1),yt$2(1)))}function ka$1(e){return ht(e)||e instanceof Lt}function fr(e){return e.aborted?Oh(void 0).pipe(yt$2(1)):new N$1(n=>{let t=()=>{n.next(),n.complete();};return e.addEventListener("abort",t),()=>e.removeEventListener("abort",t)})}function gr(e){return ig(fr(e))}function Na(e){return je$3(n=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:a}}=n;return a.length===0&&r.length===0?Oh(x$1(w$2({},n),{guardsResult:true})):Oa$1(a,t,i).pipe(je$3(o=>o&&Ea$1(o)?Pa$1(t,r,e):Oh(o)),we$1(o=>x$1(w$2({},n),{guardsResult:o})))})}function Oa$1(e,n,t){return Ce(e).pipe(je$3(i=>za(i.component,i.route,t,n)),eg$1(i=>i!==true,true))}function Pa$1(e,n,t){return Ce(n).pipe(Yh(i=>Qt$2(La(i.route.parent,t),Ua(i.route,t),Fa$1(e,i.path),ja(e,i.route))),eg$1(i=>i!==true,true))}function Ua(e,n){return e!==null&&n&&n(new qe(e)),Oh(true)}function La(e,n){return e!==null&&n&&n(new Be(e)),Oh(true)}function ja(e,n){let t=n.routeConfig?n.routeConfig.canActivate:null;if(!t||t.length===0)return Oh(true);let i=t.map(r=>Gh(()=>{let a=n._environmentInjector,o=Ht$1(r,a),c=Ma$1(o)?o.canActivate(n,e):Do$2(a,()=>o(n,e));return It(c).pipe(eg$1())}));return Oh(i).pipe(jt$1())}function Fa$1(e,n){let t=n[n.length-1],r=n.slice(0,n.length-1).reverse().map(a=>Ra(a)).filter(a=>a!==null).map(a=>Gh(()=>{let o=a.guards.map(c=>{let s=a.node._environmentInjector,l=Ht$1(c,s),u=Da$1(l)?l.canActivateChild(t,e):Do$2(s,()=>l(t,e));return It(u).pipe(eg$1())});return Oh(o).pipe(jt$1())}));return Oh(r).pipe(jt$1())}function za(e,n,t,i){let r=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!r||r.length===0)return Oh(true);let a=r.map(o=>{let c=n._environmentInjector,s=Ht$1(o,c),l=xa$1(s)?s.canDeactivate(e,n,t,i):Do$2(c,()=>s(e,n,t,i));return It(l).pipe(eg$1())});return Oh(a).pipe(jt$1())}function Ha(e,n,t,i,r){let a=n.canLoad;if(a===void 0||a.length===0)return Oh(true);let o=a.map(c=>{let s=Ht$1(c,e),l=Aa$1(s)?s.canLoad(n,t):Do$2(e,()=>s(n,t)),u=It(l);return r?u.pipe(gr(r)):u});return Oh(o).pipe(jt$1(),vr(i))}function vr(e){return Ch(xl$1(n=>{if(typeof n!="boolean")throw Qe(e,n)}),we$1(n=>n===true))}function Ba(e,n,t,i,r,a){let o=n.canMatch;if(!o||o.length===0)return Oh(true);let c=o.map(s=>{let l=Ht$1(s,e),u=Ta$1(l)?l.canMatch(n,t,r):Do$2(e,()=>l(n,t,r));return It(u).pipe(gr(a))});return Oh(c).pipe(jt$1(),vr(i))}var et$2=class e extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,e.prototype);}},de=class e extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,e.prototype);}};function $a$1(e){throw new b(4e3,false)}function qa$1(e){throw ur(false,E.GuardRejected)}var xi=class{urlSerializer;urlTree;constructor(n,t){this.urlSerializer=n,this.urlTree=t;}lineralizeSegments(n,t){return C$1(this,null,function*(){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[p])throw $a$1(`${n.redirectTo}`);r=r.children[p];}})}applyRedirectCommands(n,t,i,r,a){return C$1(this,null,function*(){let o=yield Va$1(t,r,a);if(o instanceof D)throw new de(o);let c=this.applyRedirectCreateUrlTree(o,this.urlSerializer.parse(o),n,i);if(o[0]==="/")throw new de(c);return c})}applyRedirectCreateUrlTree(n,t,i,r){let a=this.createSegmentGroup(n,t.root,i,r);return new D(a,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(n,t){let i={};return Object.entries(n).forEach(([r,a])=>{if(typeof a=="string"&&a[0]===":"){let c=a.substring(1);i[r]=t[c];}else i[r]=a;}),i}createSegmentGroup(n,t,i,r){let a=this.createSegments(n,t.segments,i,r),o={};return Object.entries(t.children).forEach(([c,s])=>{o[c]=this.createSegmentGroup(n,s,i,r);}),new v(a,o)}createSegments(n,t,i,r){return t.map(a=>a.path[0]===":"?this.findPosParam(n,a,r):this.findOrReturn(a,i))}findPosParam(n,t,i){let r=i[t.path.substring(1)];if(!r)throw new b(4001,false);return r}findOrReturn(n,t){let i=0;for(let r of t){if(r.path===n.path)return t.splice(i),r;i++;}return n}};function Va$1(e,n,t){if(typeof e=="string")return Promise.resolve(e);let i=e;return Ne(It(Do$2(t,()=>i(n))))}function Ga(e,n){return e.providers&&!e._injector&&(e._injector=fp(e.providers,n,`Route: ${e.path}`)),e._injector??n}function Q$1(e){return e.outlet||p}function Wa(e,n){let t=e.filter(i=>Q$1(i)===n);return t.push(...e.filter(i=>Q$1(i)!==n)),t}var Ti$1={matched:false,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function _r(e){return {routeConfig:e.routeConfig,url:e.url,params:e.params,queryParams:e.queryParams,fragment:e.fragment,data:e.data,outlet:e.outlet,title:e.title,paramMap:e.paramMap,queryParamMap:e.queryParamMap}}function Qa(e,n,t,i,r,a,o){let c=yr(e,n,t);if(!c.matched)return Oh(c);let s=_r(a(c));return i=Ga(n,i),Ba(i,n,t,r,s,o).pipe(we$1(l=>l===true?c:w$2({},Ti$1)))}function yr(e,n,t){if(n.path==="")return n.pathMatch==="full"&&(e.hasChildren()||t.length>0)?w$2({},Ti$1):{matched:true,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(n.matcher||qn)(t,e,n);if(!r)return w$2({},Ti$1);let a={};Object.entries(r.posParams??{}).forEach(([c,s])=>{a[c]=s.path;});let o=r.consumed.length>0?w$2(w$2({},a),r.consumed[r.consumed.length-1].parameters):a;return {matched:true,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function Fn(e,n,t,i,r){return t.length>0&&Ya$1(e,t,i,r)?{segmentGroup:new v(n,Za(i,new v(t,e.children))),slicedSegments:[]}:t.length===0&&Ja(e,t,i)?{segmentGroup:new v(e.segments,Ka$1(e,t,i,e.children)),slicedSegments:t}:{segmentGroup:new v(e.segments,e.children),slicedSegments:t}}function Ka$1(e,n,t,i){let r={};for(let a of t)if(Je$1(e,n,a)&&!i[Q$1(a)]){let o=new v([],{});r[Q$1(a)]=o;}return w$2(w$2({},i),r)}function Za(e,n){let t={};t[p]=n;for(let i of e)if(i.path===""&&Q$1(i)!==p){let r=new v([],{});t[Q$1(i)]=r;}return t}function Ya$1(e,n,t,i){return t.some(r=>!Je$1(e,n,r)||!(Q$1(r)!==p)?false:!(i!==void 0&&Q$1(r)===i))}function Ja(e,n,t){return t.some(i=>Je$1(e,n,i))}function Je$1(e,n,t){return (e.hasChildren()||n.length>0)&&t.pathMatch==="full"?false:t.path===""}function Xa$1(e,n,t){return n.length===0&&!e.children[t]}var ki$1=class ki{};function to(e,n,t,i,r,a,o,c){return C$1(this,null,function*(){return new Ni(e,n,t,i,r,o,a,c).recognize()})}var eo=31,Ni=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=true;constructor(n,t,i,r,a,o,c,s){this.injector=n,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=a,this.paramsInheritanceStrategy=o,this.urlSerializer=c,this.abortSignal=s,this.applyRedirects=new xi(this.urlSerializer,this.urlTree);}noMatchError(n){return new b(4002,`'${n.segmentGroup}'`)}recognize(){return C$1(this,null,function*(){let n=Fn(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=yield this.match(n),r=new P(i,t),a=new ce$1("",r),o=er(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,a.url=this.urlSerializer.serialize(o),{state:a,tree:o}})}match(n){return C$1(this,null,function*(){let t=new Ut$1([],Object.freeze({}),Object.freeze(w$2({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),p,this.rootComponentType,null,{},this.injector);try{return {children:yield this.processSegmentGroup(this.injector,this.config,n,p,t),rootSnapshot:t}}catch(i){if(i instanceof de)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof et$2?this.noMatchError(i):i}})}processSegmentGroup(n,t,i,r,a){return C$1(this,null,function*(){if(i.segments.length===0&&i.hasChildren())return this.processChildren(n,t,i,a);let o=yield this.processSegment(n,t,i,i.segments,r,true,a);return o instanceof P?[o]:[]})}processChildren(n,t,i,r){return C$1(this,null,function*(){let a=[];for(let s of Object.keys(i.children))s==="primary"?a.unshift(s):a.push(s);let o=[];for(let s of a){let l=i.children[s],u=Wa(t,s),g=yield this.processSegmentGroup(n,u,l,s,r);o.push(...g);}let c=br(o);return io(c),c})}processSegment(n,t,i,r,a,o,c){return C$1(this,null,function*(){for(let s of t)try{return yield this.processSegmentAgainstRoute(s._injector??n,t,s,i,r,a,o,c)}catch(l){if(l instanceof et$2||mr(l))continue;throw l}if(Xa$1(i,r,a))return new ki$1;throw new et$2(i)})}processSegmentAgainstRoute(n,t,i,r,a,o,c,s){return C$1(this,null,function*(){if(Q$1(i)!==o&&(o===p||!Je$1(r,a,i)))throw new et$2(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,r,i,a,o,s);if(this.allowRedirects&&c)return this.expandSegmentAgainstRouteUsingRedirect(n,r,t,i,a,o,s);throw new et$2(r)})}expandSegmentAgainstRouteUsingRedirect(n,t,i,r,a,o,c){return C$1(this,null,function*(){let{matched:s,parameters:l,consumedSegments:u,positionalParamSegments:g,remainingSegments:f}=yr(t,r,a);if(!s)throw new et$2(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>eo&&(this.allowRedirects=false));let x=this.createSnapshot(n,r,a,l,c);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let V=yield this.applyRedirects.applyRedirectCommands(u,r.redirectTo,g,_r(x),n),pt=yield this.applyRedirects.lineralizeSegments(r,V);return this.processSegment(n,i,t,pt.concat(f),o,false,c)})}createSnapshot(n,t,i,r,a){let o=new Ut$1(i,r,Object.freeze(w$2({},this.urlTree.queryParams)),this.urlTree.fragment,ro$1(t),Q$1(t),t.component??t._loadedComponent??null,t,ao$1(t),n),c=Ui(o,a,this.paramsInheritanceStrategy);return o.params=Object.freeze(c.params),o.data=Object.freeze(c.data),o}matchSegmentAgainstRoute(n,t,i,r,a,o){return C$1(this,null,function*(){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let c=mt=>this.createSnapshot(n,i,mt.consumedSegments,mt.parameters,o),s=yield Ne(Qa(t,i,r,n,this.urlSerializer,c,this.abortSignal));if(i.path==="**"&&(t.children={}),!s?.matched)throw new et$2(t);n=i._injector??n;let{routes:l}=yield this.getChildConfig(n,i,r),u=i._loadedInjector??n,{parameters:g,consumedSegments:f,remainingSegments:x}=s,V=this.createSnapshot(n,i,f,g,o),{segmentGroup:pt,slicedSegments:$t}=Fn(t,f,x,l,a);if($t.length===0&&pt.hasChildren()){let mt=yield this.processChildren(u,l,pt,V);return new P(V,mt)}if(l.length===0&&$t.length===0)return new P(V,[]);let ii=Q$1(i)===a,fe=yield this.processSegment(u,l,pt,$t,ii?p:a,true,V);return new P(V,fe instanceof P?[fe]:[])})}getChildConfig(n,t,i){return C$1(this,null,function*(){if(t.children)return {routes:t.children,injector:n};if(t.loadChildren){if(t._loadedRoutes!==void 0){let a=t._loadedNgModuleFactory;return a&&!t._loadedInjector&&(t._loadedInjector=a.create(n).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(yield Ne(Ha(n,t,i,this.urlSerializer,this.abortSignal))){let a=yield this.configLoader.loadChildren(n,t);return t._loadedRoutes=a.routes,t._loadedInjector=a.injector,t._loadedNgModuleFactory=a.factory,a}throw qa$1()}return {routes:[],injector:n}})}};function io(e){e.sort((n,t)=>n.value.outlet===p?-1:t.value.outlet===p?1:n.value.outlet.localeCompare(t.value.outlet));}function no$1(e){let n=e.value.routeConfig;return n&&n.path===""}function br(e){let n=[],t=new Set;for(let i of e){if(!no$1(i)){n.push(i);continue}let r=n.find(a=>i.value.routeConfig===a.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):n.push(i);}for(let i of t){let r=br(i.children);n.push(new P(i.value,r));}return n.filter(i=>!t.has(i))}function ro$1(e){return e.data||{}}function ao$1(e){return e.resolve||{}}function oo$1(e,n,t,i,r,a,o){return je$3(c=>C$1(null,null,function*(){let{state:s,tree:l}=yield to(e,n,t,i,c.extractedUrl,r,a,o);return x$1(w$2({},c),{targetSnapshot:s,urlAfterRedirects:l})}))}function so$1(e){return je$3(n=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=n;if(!i.length)return Oh(n);let r=new Set(i.map(c=>c.route)),a=new Set;for(let c of r)if(!a.has(c))for(let s of Cr(c))a.add(s);let o=0;return Ce(a).pipe(Yh(c=>r.has(c)?co$1(c,t,e):(c.data=Ui(c,c.parent,e).resolve,Oh(void 0))),xl$1(()=>o++),tg$1(1),je$3(c=>o===a.size?Oh(n):mt$1))})}function Cr(e){let n=e.children.map(t=>Cr(t)).flat();return [e,...n]}function co$1(e,n,t){let i=e.routeConfig,r=e._resolve;return i?.title!==void 0&&!lr(i)&&(r[he]=i.title),Gh(()=>(e.data=Ui(e,e.parent,t).resolve,lo$1(r,e,n).pipe(we$1(a=>(e._resolvedData=a,e.data=w$2(w$2({},e.data),a),null)))))}function lo$1(e,n,t){let i=bi(e);if(i.length===0)return Oh({});let r={};return Ce(i).pipe(je$3(a=>ho$1(e[a],n,t).pipe(eg$1(),xl$1(o=>{if(o instanceof Lt)throw Qe(new dt,o);r[a]=o;}))),tg$1(1),we$1(()=>r),Vi$1(a=>mr(a)?mt$1:Ph(a)))}function ho$1(e,n,t){let i=n._environmentInjector,r=Ht$1(e,i),a=r.resolve?r.resolve(n,t):Do$2(i,()=>r(n,t));return It(a)}function zn(e){return sl$1(n=>{let t=e(n);return t?Ce(t).pipe(we$1(()=>n)):Oh(n)})}var Hi$1=(()=>{class e{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(a=>a.outlet===p);return i}getResolvedTitleForRoute(t){return t.data[he]}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:()=>T$1(wr)})}return e})(),wr=(()=>{class e extends Hi$1{title;constructor(t){super(),this.title=t;}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i);}static \u0275fac=function(i){return new(i||e)(Me$3(ap))};static \u0275prov=te$1({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Bt=new x("",{factory:()=>({})}),pe$1=new x(""),Bi=(()=>{class e{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=T$1(DD);loadComponent(t,i){return C$1(this,null,function*(){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=C$1(this,null,function*(){try{let a=yield Gn(Do$2(t,()=>i.loadComponent())),o=yield Sr(GL(a));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=o,o}finally{this.componentLoaders.delete(i);}});return this.componentLoaders.set(i,r),r})}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=C$1(this,null,function*(){try{let a=yield Rr(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=a.routes,i._loadedInjector=a.injector,i._loadedNgModuleFactory=a.factory,a}finally{this.childrenLoaders.delete(i);}});return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function Rr(e,n,t,i){return C$1(this,null,function*(){let r=yield Gn(Do$2(t,()=>e.loadChildren())),a=yield Sr(GL(r)),o;a instanceof dp||Array.isArray(a)?o=a:o=yield n.compileModuleAsync(a),i&&i(e);let c,s,u;return Array.isArray(o)?(s=o,true):(c=o.create(t).injector,u=o,s=c.get(pe$1,[],{optional:true,self:true}).flat()),{routes:s.map(zi$1),injector:c,factory:u}})}function Sr(e){return C$1(this,null,function*(){return e})}var Xe$1=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:()=>T$1(uo$1)})}return e})(),uo$1=(()=>{class e{shouldProcessUrl(t){return  true}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})(),Ir=new x("");var Er=new x(""),po$1=()=>{},Ar=new x(""),Mr=(()=>{class e{currentNavigation=Pe$2(null,{equal:()=>false});currentTransition=null;lastSuccessfulNavigation=Pe$2(null);events=new ee$1;transitionAbortWithErrorSubject=new ee$1;configLoader=T$1(Bi);environmentInjector=T$1(se$1);destroyRef=T$1(Oe$1);urlSerializer=T$1(Ft);rootContexts=T$1(zt$1);location=T$1(Rn);inputBindingEnabled=T$1(Ye,{optional:true})!==null;titleStrategy=T$1(Hi$1);options=T$1(Bt,{optional:true})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||va$1;urlHandlingStrategy=T$1(Xe$1);createViewTransition=T$1(Ir,{optional:true});navigationErrorHandler=T$1(Ar,{optional:true});activatedRouteInjectorFeature=T$1(Er,{optional:true});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>Oh(void 0);rootComponentType=null;destroyed=false;constructor(){let t=r=>this.events.next(new ze$1(r)),i=r=>this.events.next(new He(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=true;});}complete(){this.transitions?.complete();}handleNavigationRequest(t){let i=++this.navigationId;ie$1(()=>{this.transitions?.next(x$1(w$2({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}));});}setupNavigations(t){return this.transitions=new Sn(null),this.transitions.pipe(Zt$1(i=>i!==null),sl$1(i=>{let r=true,a=false,o=new AbortController,c=()=>!a&&this.currentTransition?.id===i.id;return Oh(i).pipe(sl$1(s=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",E.SupersededByNewNavigation),mt$1;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:l?x$1(w$2({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:s.routesRecognizeHandler,beforeActivateHandler:s.beforeActivateHandler});let u=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),g=s.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!u&&g!=="reload")return this.events.next(new it$2(s.id,this.urlSerializer.serialize(s.rawUrl),"",re$1.IgnoredSameUrlNavigation)),s.resolve(false),mt$1;if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return Oh(s).pipe(sl$1(f=>(this.events.next(new Rt$1(f.id,this.urlSerializer.serialize(f.extractedUrl),f.source,f.restoredState)),f.id!==this.navigationId?mt$1:Promise.resolve(f))),oo$1(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),xl$1(f=>{i.targetSnapshot=f.targetSnapshot,i.urlAfterRedirects=f.urlAfterRedirects,this.currentNavigation.update(x=>(x.finalUrl=f.urlAfterRedirects,x)),this.events.next(new oe);}),sl$1(f=>Ce(i.routesRecognizeHandler.deferredHandle??Oh(void 0)).pipe(we$1(()=>f))),xl$1(()=>{let f=new ae(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(f);}));if(u&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:f,extractedUrl:x,source:V,restoredState:pt,extras:$t}=s,ii=new Rt$1(f,this.urlSerializer.serialize(x),V,pt);this.events.next(ii);let fe=sr(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=x$1(w$2({},s),{targetSnapshot:fe,urlAfterRedirects:x,extras:x$1(w$2({},$t),{skipLocationChange:false,replaceUrl:false})}),this.currentNavigation.update(mt=>(mt.finalUrl=x,mt)),Oh(i)}else return this.events.next(new it$2(s.id,this.urlSerializer.serialize(s.extractedUrl),"",re$1.IgnoredByUrlHandlingStrategy)),s.resolve(false),mt$1}),we$1(s=>{let l=new Ue$1(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);return this.events.next(l),this.currentTransition=i=x$1(w$2({},s),{guards:wa$1(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),i}),Na(s=>this.events.next(s)),sl$1(s=>{if(i.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw Qe(this.urlSerializer,s.guardsResult);let l=new Le(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);if(this.events.next(l),!c())return mt$1;if(!s.guardsResult)return this.cancelNavigationTransition(s,"",E.GuardRejected),mt$1;if(s.guards.canActivateChecks.length===0)return Oh(s);let u=new je$1(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);if(this.events.next(u),!c())return mt$1;let g=false;return Oh(s).pipe(so$1(this.paramsInheritanceStrategy),xl$1({next:()=>{g=true;let f=new Fe(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(f);},complete:()=>{g||this.cancelNavigationTransition(s,"",E.NoDataFromResolver);}}))}),zn(s=>{let l=g=>{let f=[];if(g.routeConfig?._loadedComponent)g.component=g.routeConfig?._loadedComponent;else if(g.routeConfig?.loadComponent){let x=g._environmentInjector;f.push(this.configLoader.loadComponent(x,g.routeConfig).then(V=>{g.component=V;}));}for(let x of g.children)f.push(...l(x));return f},u=l(s.targetSnapshot.root);return u.length===0?Oh(s):Ce(Promise.all(u).then(()=>s))}),sl$1(s=>{let{newlyCreatedRoutes:l,state:u}=_a(t.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=i=s=x$1(w$2({},s),{targetRouterState:u,newlyCreatedRoutes:l}),this.currentNavigation.update(g=>(g.targetRouterState=u,g)),Oh(s)}),this.activatedRouteInjectorFeature?.operator()??(s=>s),zn(()=>this.afterPreactivation()),sl$1(()=>{let{currentSnapshot:s,targetSnapshot:l}=i,u=this.createViewTransition?.(this.environmentInjector,s.root,l.root);return u?Ce(u).pipe(we$1(()=>i)):Oh(i)}),yt$2(1),sl$1(s=>{r=false,this.events.next(new Ot);let l=i.beforeActivateHandler.deferredHandle;return l?Ce(l.then(()=>s)):Oh(s)}),xl$1(s=>{new Di$1(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s.newlyCreatedRoutes?.clear(),c()&&(a=true,this.currentNavigation.update(l=>(l.abort=po$1,l)),this.lastSuccessfulNavigation.set(ie$1(this.currentNavigation)),this.events.next(new q$1(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(true));}),ig(fr(o.signal).pipe(Zt$1(()=>!a&&r),xl$1(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",E.Aborted);}))),xl$1({complete:()=>{a=true;}}),ig(this.transitionAbortWithErrorSubject.pipe(xl$1(s=>{throw s}))),Ml$1(()=>{o.abort(),a||this.cancelNavigationTransition(i,"",E.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null);}),Vi$1(s=>{if(a=true,Hn(i),this.destroyed)return i.resolve(false),mt$1;if(pr(s))this.events.next(new $$1(i.id,this.urlSerializer.serialize(i.extractedUrl),s.message,s.cancellationCode)),Ca$1(s)?this.events.next(new Pt$1(s.url,s.navigationBehaviorOptions)):i.resolve(false);else {let l=new St$1(i.id,this.urlSerializer.serialize(i.extractedUrl),s,i.targetSnapshot??void 0);try{let u=Do$2(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(u instanceof Lt){let{message:g,cancellationCode:f}=Qe(this.urlSerializer,u);this.events.next(new $$1(i.id,this.urlSerializer.serialize(i.extractedUrl),g,f)),this.events.next(new Pt$1(u.redirectTo,u.navigationBehaviorOptions));}else throw this.events.next(l),s}catch(u){this.options.resolveNavigationPromiseOnError?i.resolve(false):i.reject(u);}}return mt$1}))}))}cancelNavigationTransition(t,i,r){Hn(t);let a=new $$1(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(a),t.resolve(false);}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true))),i=ie$1(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function mo$1(e){return e!==te}function Hn(e){if(e.newlyCreatedRoutes)for(let n of e.newlyCreatedRoutes)n._localInjector?.destroy();}var Dr=new x("");var xr=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:()=>T$1(fo$1)})}return e})(),Ze$1=class Ze{shouldDetach(n){return  false}store(n,t){}shouldAttach(n){return  false}retrieve(n){return null}shouldReuseRoute(n,t){return n.routeConfig===t.routeConfig}shouldDestroyInjector(n){return  true}},fo$1=(()=>{class e extends Ze$1{static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})(),ti=(()=>{class e{urlSerializer=T$1(Ft);options=T$1(Bt,{optional:true})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=T$1(Rn);urlHandlingStrategy=T$1(Xe$1);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new D;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let a=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,o=r??a;return o instanceof D?this.urlSerializer.serialize(o):o}routerUrlState(t){return t?.targetBrowserUrl===void 0||t?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(t.finalUrl)}}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r;}routerState=sr(null,T$1(se$1));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento();}createStateMemento(){return {rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:()=>T$1(go$1)})}return e})(),go$1=(()=>{class e extends ti{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:true});});})}handleRouterEvent(t,i){t instanceof Rt$1?this.updateStateMemento():t instanceof it$2?this.commitTransition(i):t instanceof ae?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof Ot?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof $$1&&!or(t)?this.restoreHistory(i):t instanceof St$1?this.restoreHistory(i,true):t instanceof q$1&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId);}setBrowserUrl(t,i){let{extras:r,id:a}=i,{replaceUrl:o,state:c}=r;if(this.location.isCurrentPathEqualTo(t)||o){let s=this.browserPageId,l=w$2(w$2({},c),this.generateNgRouterState(a,s,i));this.location.replaceState(t,"",l);}else {let s=w$2(w$2({},c),this.generateNgRouterState(a,this.browserPageId+1,i));this.location.go(t,"",s);}}restoreHistory(t,i=false){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,a=this.currentPageId-r;a!==0?this.location.historyGo(a):this.getCurrentUrlTree()===t.finalUrl&&a===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree());}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree());}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree);}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId));}generateNgRouterState(t,i,r){return this.canceledNavigationResolution==="computed"?w$2({navigationId:t,\u0275routerPageId:i},this.routerUrlState(r)):w$2({navigationId:t},this.routerUrlState(r))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function $i$1(e,n){e.events.pipe(Zt$1(t=>t instanceof q$1||t instanceof $$1||t instanceof St$1||t instanceof it$2),we$1(t=>t instanceof q$1||t instanceof it$2?0:(t instanceof $$1?t.code===E.Redirect||t.code===E.SupersededByNewNavigation:false)?2:1),Zt$1(t=>t!==2),yt$2(1)).subscribe(()=>{n();});}var ut=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=false;nonRouterCurrentEntryChangeSubscription;console=T$1(cE);stateManager=T$1(ti);options=T$1(Bt,{optional:true})||{};pendingTasks=T$1(Pt$3);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=T$1(Mr);urlSerializer=T$1(Ft);location=T$1(Rn);urlHandlingStrategy=T$1(Xe$1);injector=T$1(se$1);_events=new ee$1;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=false;routeReuseStrategy=T$1(xr);injectorCleanup=T$1(Dr,{optional:true});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=T$1(pe$1,{optional:true})?.flat()??[];componentInputBindingEnabled=!!T$1(Ye,{optional:true});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents();}eventsSubscription=new G;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,a=ie$1(this.navigationTransitions.currentNavigation);if(r!==null&&a!==null){if(this.stateManager.handleRouterEvent(i,a),i instanceof $$1&&i.code!==E.Redirect&&i.code!==E.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof q$1)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Pt$1){let o=i.navigationBehaviorOptions,c=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),s=w$2({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||mo$1(r.source)},o);this.scheduleNavigation(c,te,null,s,{resolve:r.resolve,reject:r.reject,promise:r.promise});}}fa(i)&&this._events.next(i);}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r);}});this.eventsSubscription.add(t);}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t;}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(true),te,this.stateManager.restoredState(),{replaceUrl:true});}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,a)=>{this.navigateToSyncWithBrowser(t,r,i,a);});}navigateToSyncWithBrowser(t,i,r,a){let o=r?.navigationId?r:null,c=r?.\u0275routerUrl??t;if(r?.\u0275routerUrl&&(a=x$1(w$2({},a),{browserUrl:t})),r){let l=w$2({},r);delete l.navigationId,delete l.\u0275routerPageId,delete l.\u0275routerUrl,Object.keys(l).length!==0&&(a.state=l);}let s=this.parseUrl(c);this.scheduleNavigation(s,i,o,a).catch(l=>{this.disposed||this.injector.get(Lt$2)(l);});}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return ie$1(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(zi$1),this.navigated=false;}ngOnDestroy(){this.dispose();}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=true,this.eventsSubscription.unsubscribe();}createUrlTree(t,i={}){let{relativeTo:r,queryParams:a,fragment:o,queryParamsHandling:c,preserveFragment:s}=i,l=s?this.currentUrlTree.fragment:o,u=null;switch(c??this.options.defaultQueryParamsHandling){case "merge":u=w$2(w$2({},this.currentUrlTree.queryParams),a);break;case "preserve":u=this.currentUrlTree.queryParams;break;default:u=a||null;}u!==null&&(u=this.removeEmptyProps(u));let g;try{let f=r?r.snapshot:this.routerState.snapshot.root;g=ir(f);}catch(f){(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),g=this.currentUrlTree.root;}return nr(g,t,u,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:false}){let r=ht(t)?t:this.parseUrl(t),a=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(a,te,null,i)}navigate(t,i={skipLocationChange:false}){return vo$1(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch(i){return this.console.warn(Wn$2(4018,false)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===true?r=w$2({},Oi):i===false?r=w$2({},ie):r=w$2(w$2({},ie),i),ht(t))return Ci(this.currentUrlTree,t,r);let a=this.parseUrl(t);return Ci(this.currentUrlTree,a,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,a])=>(a!=null&&(i[r]=a),i),{})}scheduleNavigation(t,i,r,a,o){if(this.disposed)return Promise.resolve(false);let c,s,l;o?(c=o.resolve,s=o.reject,l=o.promise):l=new Promise((g,f)=>{c=g,s=f;});let u=this.pendingTasks.add();return $i$1(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u));}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:a,resolve:c,reject:s,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();function vo$1(e){for(let n=0;n<e.length;n++)if(e[n]==null)throw new b(4008,false)}var Co$1=(()=>{class e{router=T$1(ut);stateManager=T$1(ti);fragment=Pe$2("");queryParams=Pe$2({});path=Pe$2("");serializer=T$1(Ft);constructor(){this.updateState(),this.router.events?.subscribe(t=>{t instanceof q$1&&this.updateState();});}updateState(){let{fragment:t,root:i,queryParams:r}=this.stateManager.getCurrentUrlTree();this.fragment.set(t),this.queryParams.set(r),this.path.set(this.serializer.serialize(new D(i)));}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})(),ei=(()=>{class e{router;route;tabIndexAttribute;renderer;el;locationStrategy;hrefAttributeValue=T$1(new uh("href"),{optional:true});reactiveHref=jc$1(()=>this.isAnchorElement?this.computeHref(this._urlTree()):this.hrefAttributeValue);get href(){return ie$1(this.reactiveHref)}set href(t){this.reactiveHref.set(t);}set target(t){this._target.set(t);}get target(){return ie$1(this._target)}_target=Pe$2(void 0);set queryParams(t){this._queryParams.set(t);}get queryParams(){return ie$1(this._queryParams)}_queryParams=Pe$2(void 0,{equal:()=>false});set fragment(t){this._fragment.set(t);}get fragment(){return ie$1(this._fragment)}_fragment=Pe$2(void 0);set queryParamsHandling(t){this._queryParamsHandling.set(t);}get queryParamsHandling(){return ie$1(this._queryParamsHandling)}_queryParamsHandling=Pe$2(void 0);set state(t){this._state.set(t);}get state(){return ie$1(this._state)}_state=Pe$2(void 0,{equal:()=>false});set info(t){this._info.set(t);}get info(){return ie$1(this._info)}_info=Pe$2(void 0,{equal:()=>false});set relativeTo(t){this._relativeTo.set(t);}get relativeTo(){return ie$1(this._relativeTo)}_relativeTo=Pe$2(void 0);set preserveFragment(t){this._preserveFragment.set(t);}get preserveFragment(){return ie$1(this._preserveFragment)}_preserveFragment=Pe$2(false);set skipLocationChange(t){this._skipLocationChange.set(t);}get skipLocationChange(){return ie$1(this._skipLocationChange)}_skipLocationChange=Pe$2(false);set replaceUrl(t){this._replaceUrl.set(t);}get replaceUrl(){return ie$1(this._replaceUrl)}_replaceUrl=Pe$2(false);browserUrl=QL(void 0);isAnchorElement;onChanges=new ee$1;applicationErrorHandler=T$1(Lt$2);options=T$1(Bt,{optional:true});reactiveRouterState=T$1(Co$1);constructor(t,i,r,a,o,c){this.router=t,this.route=i,this.tabIndexAttribute=r,this.renderer=a,this.el=o,this.locationStrategy=c;let s=o.nativeElement.tagName?.toLowerCase();this.isAnchorElement=s==="a"||s==="area"||!!(typeof customElements=="object"&&customElements.get(s)?.observedAttributes?.includes?.("href"));}setTabIndexIfNotOnNativeEl(t){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",t);}ngOnChanges(t){this.onChanges.next(this);}routerLinkInput=Pe$2(null);set routerLink(t){t==null?(this.routerLinkInput.set(null),this.setTabIndexIfNotOnNativeEl(null)):(ht(t)?this.routerLinkInput.set(t):this.routerLinkInput.set(Array.isArray(t)?t:[t]),this.setTabIndexIfNotOnNativeEl("0"));}onClick(t,i,r,a,o){let c=this._urlTree();if(c===null||this.isAnchorElement&&(t!==0||i||r||a||o||typeof this.target=="string"&&this.target!="_self"))return  true;let s=this.browserUrl(),l=w$2({skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info},s!==void 0&&{browserUrl:s});return this.router.navigateByUrl(c,l)?.catch(u=>{this.applicationErrorHandler(u);}),!this.isAnchorElement}ngOnDestroy(){}applyAttributeValue(t,i){let r=this.renderer,a=this.el.nativeElement;i!==null?r.setAttribute(a,t,i):r.removeAttribute(a,t);}_urlTree=dt$2(()=>{this.reactiveRouterState.path(),this._preserveFragment()&&this.reactiveRouterState.fragment();let t=r=>r==="preserve"||r==="merge";(t(this._queryParamsHandling())||t(this.options?.defaultQueryParamsHandling))&&this.reactiveRouterState.queryParams();let i=this.routerLinkInput();return i===null||!this.router.createUrlTree?null:ht(i)?i:this.router.createUrlTree(i,{relativeTo:this._relativeTo()!==void 0?this._relativeTo():this.route,queryParams:this._queryParams(),fragment:this._fragment(),queryParamsHandling:this._queryParamsHandling(),preserveFragment:this._preserveFragment()})},{equal:(t,i)=>this.computeHref(t)===this.computeHref(i)});get urlTree(){return ie$1(this._urlTree)}computeHref(t){return t!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(t))??"":null}static \u0275fac=function(i){return new(i||e)(Cr$2(ut),Cr$2(nt$2),Ud$1("tabindex"),Cr$2(Gv$1),Cr$2(vr$2),Cr$2(Fn$1))};static \u0275dir=GI({type:e,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(i,r){i&1&&Rp$1("click",function(o){return r.onClick(o.button,o.ctrlKey,o.shiftKey,o.altKey,o.metaKey)}),i&2&&Cp("href",r.reactiveHref(),Ey)("target",r._target());},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",tF],skipLocationChange:[2,"skipLocationChange","skipLocationChange",tF],replaceUrl:[2,"replaceUrl","replaceUrl",tF],browserUrl:[1,"browserUrl"],routerLink:"routerLink"},features:[lm]})}return e})(),wo$1=(()=>{class e{router;element;renderer;cdr;links;classes=[];routerEventsSubscription;linkInputChangesSubscription;_isActive=false;get isActive(){return this._isActive}routerLinkActiveOptions={exact:false};ariaCurrentWhenActive;isActiveChange=new Be$2;link=T$1(ei,{optional:true});constructor(t,i,r,a){this.router=t,this.element=i,this.renderer=r,this.cdr=a,this.routerEventsSubscription=t.events.subscribe(o=>{o instanceof q$1&&this.update();});}ngAfterContentInit(){Oh(this.links.changes,Oh(null)).pipe(On$1()).subscribe(t=>{this.update(),this.subscribeToEachLinkOnChanges();});}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let t=[...this.links.toArray(),this.link].filter(i=>!!i).map(i=>i.onChanges);this.linkInputChangesSubscription=Ce(t).pipe(On$1()).subscribe(i=>{this._isActive!==this.isLinkActive(this.router)(i)&&this.update();});}set routerLinkActive(t){let i=Array.isArray(t)?t:t.split(" ");this.classes=i.filter(r=>!!r);}ngOnChanges(t){this.update();}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe();}update(){!this.links||!this.router.navigated||queueMicrotask(()=>{let t=this.hasActiveLinks();this.classes.forEach(i=>{t?this.renderer.addClass(this.element.nativeElement,i):this.renderer.removeClass(this.element.nativeElement,i);}),t&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,"aria-current",this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,"aria-current"),this._isActive!==t&&(this._isActive=t,this.cdr.markForCheck(),this.isActiveChange.emit(t));});}isLinkActive(t){let i=Ro$1(this.routerLinkActiveOptions)?this.routerLinkActiveOptions:this.routerLinkActiveOptions.exact??false?w$2({},Oi):w$2({},ie);return r=>{let a=r.urlTree;return a?ie$1(Pi(a,t,i)):false}}hasActiveLinks(){let t=this.isLinkActive(this.router);return this.link&&t(this.link)||this.links.some(t)}static \u0275fac=function(i){return new(i||e)(Cr$2(ut),Cr$2(vr$2),Cr$2(Gv$1),Cr$2(XL))};static \u0275dir=GI({type:e,selectors:[["","routerLinkActive",""]],contentQueries:function(i,r,a){if(i&1&&Pp(a,ei,5),i&2){let o;xE(o=AE())&&(r.links=o);}},inputs:{routerLinkActiveOptions:"routerLinkActiveOptions",ariaCurrentWhenActive:"ariaCurrentWhenActive",routerLinkActive:"routerLinkActive"},outputs:{isActiveChange:"isActiveChange"},exportAs:["routerLinkActive"],features:[lm]})}return e})();function Ro$1(e){let n=e;return !!(n.paths||n.matrixParams||n.queryParams||n.fragment)}var me=class{},So$1=(()=>{class e{preload(t,i){return i().pipe(Vi$1(()=>Oh(null)))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=yr$2({token:e,factory:e.\u0275fac})}return e})();var Tr=(()=>{class e{router;injector;preloadingStrategy;loader;subscription;constructor(t,i,r,a){this.router=t,this.injector=i,this.preloadingStrategy=r,this.loader=a;}setUpPreloading(){this.subscription=this.router.events.pipe(Zt$1(t=>t instanceof q$1),Yh(()=>this.preload())).subscribe(()=>{});}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe();}processRoutes(t,i){let r=[];for(let a of i){a.providers&&!a._injector&&(a._injector=fp(a.providers,t,""));let o=a._injector??t;a._loadedNgModuleFactory&&!a._loadedInjector&&(a._loadedInjector=a._loadedNgModuleFactory.create(o).injector);let c=a._loadedInjector??o;(a.loadChildren&&!a._loadedRoutes&&a.canLoad===void 0||a.loadComponent&&!a._loadedComponent)&&r.push(this.preloadConfig(o,a)),(a.children||a._loadedRoutes)&&r.push(this.processRoutes(c,a.children??a._loadedRoutes));}return Ce(r).pipe(On$1())}preloadConfig(t,i){return this.preloadingStrategy.preload(i,()=>{if(t.destroyed)return Oh(null);let r;i.loadChildren&&i.canLoad===void 0?r=Ce(this.loader.loadChildren(t,i)):r=Oh(null);let a=r.pipe(je$3(o=>o===null?Oh(void 0):(i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,this.processRoutes(o.injector??t,o.routes))));if(i.loadComponent&&!i._loadedComponent){let o=this.loader.loadComponent(t,i);return Ce([a,o]).pipe(On$1())}else return a})}static \u0275fac=function(i){return new(i||e)(Me$3(ut),Me$3(se$1),Me$3(me),Me$3(Bi))};static \u0275prov=te$1({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Io$1=new x("");function Eo$1(e,...n){return Ds$1([{provide:pe$1,multi:true,useValue:e},{provide:nt$2,useFactory:Ao$1},{provide:wp,multi:true,useFactory:Do$1},n.map(t=>t.\u0275providers)])}function Ao$1(){return T$1(ut).routerState.root}function Mo$1(e,n){return {\u0275kind:e,\u0275providers:n}}function Do$1(){let e=T$1(ae$1);return n=>{let t=e.get(_i$3);if(n!==t.components[0])return;let i=e.get(ut),r=e.get(xo$1);e.get(To$1)===1&&i.initialNavigation(),e.get(kr,null,{optional:true})?.setUpPreloading(),e.get(Io$1,null,{optional:true})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe());}}var xo$1=new x("",{factory:()=>new ee$1}),To$1=new x("",{factory:()=>1});var kr=new x("");function ko$1(e){return Mo$1(0,[{provide:kr,useExisting:Tr},{provide:me,useExisting:e}])}var Lr=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],jr=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function Oo$1(e,n){e&1&&(fi$3(0,"span",3),NE(1,1),Nc$1());}function Po$1(e,n){e&1&&(fi$3(0,"span",6),NE(1,2),Nc$1());}function Uo$1(e,n){e&1&&(fi$3(0,"span",3),NE(1,1),fi$3(2,"span",7),xu$1(),fi$3(3,"svg",8),_p$1(4,"path",9),Nc$1()()());}function Lo$1(e,n){e&1&&(fi$3(0,"span",6),NE(1,2),Nc$1());}var jo$1=`.mdc-evolution-chip,
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
`;var Fr=["*"],Fo$1=`.mat-mdc-chip-set {
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
`,zr=new x("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),Nr=new x("MatChipAvatar"),Or=new x("MatChipTrailingIcon"),Pr=new x("MatChipEdit"),Ur=new x("MatChipRemove"),Gi$1=new x("MatChip"),Hr=(()=>{class e{_elementRef=T$1(vr$2);_parentChip=T$1(Gi$1);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(t){this._disabled=t;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){T$1(he$1).load($a$2),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(i){return new(i||e)};static \u0275dir=GI({type:e,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(i,r){i&2&&(Cp("disabled",r._getDisabledAttribute())("aria-disabled",r.disabled),$p("mdc-evolution-chip__action--primary",r._isPrimary)("mdc-evolution-chip__action--secondary",!r._isPrimary)("mdc-evolution-chip__action--trailing",!r._isPrimary&&!r._isLeading));},inputs:{disabled:[2,"disabled","disabled",tF],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?-1:nF(t)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return e})(),Br=(()=>{class e extends Hr{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(t){!this.disabled&&this._isPrimary&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let t;return function(r){return (t||(t=Nm(e)))(r||e)}})();static \u0275dir=GI({type:e,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(i,r){i&1&&Rp$1("click",function(o){return r._handleClick(o)})("keydown",function(o){return r._handleKeydown(o)}),i&2&&(Cp("tabindex",r._getTabindex()),$p("mdc-evolution-chip__action--presentational",false));},features:[yp]})}return e})();var qi$1=(()=>{class e{_changeDetectorRef=T$1(XL);_elementRef=T$1(vr$2);_tagName=T$1(qL);_ngZone=T$1(Ne$1);_focusMonitor=T$1(Lr$1);_globalRippleOptions=T$1(Xr$1,{optional:true});_document=T$1(nr$2);_onFocus=new ee$1;_onBlur=new ee$1;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=He$1();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=T$1(Re).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(t){this._value=t;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(t){this._disabled=t;}_disabled=false;removed=new Be$2;destroyed=new Be$2;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=T$1(Ha$1);_injector=T$1(ae$1);constructor(){let t=T$1(he$1);t.load($a$2),t.load(di),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Qh(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(t){(t.keyCode===8&&!t.repeat||t.keyCode===46)&&(t.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(t){return this._getActions().find(i=>{let r=i._elementRef.nativeElement;return r===t||r.contains(t)})}_getActions(){let t=[];return this.editIcon&&t.push(this.editIcon),this.primaryAction&&t.push(this.primaryAction),this.removeIcon&&t.push(this.removeIcon),t}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(t){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(t=>{let i=t!==null;i!==this._hasFocusInternal&&(this._hasFocusInternal=i,i?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=BI({type:e,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(i,r,a){if(i&1&&Pp(a,Nr,5)(a,Pr,5)(a,Or,5)(a,Ur,5)(a,Nr,5)(a,Or,5)(a,Pr,5)(a,Ur,5),i&2){let o;xE(o=AE())&&(r.leadingIcon=o.first),xE(o=AE())&&(r.editIcon=o.first),xE(o=AE())&&(r.trailingIcon=o.first),xE(o=AE())&&(r.removeIcon=o.first),xE(o=AE())&&(r._allLeadingIcons=o),xE(o=AE())&&(r._allTrailingIcons=o),xE(o=AE())&&(r._allEditIcons=o),xE(o=AE())&&(r._allRemoveIcons=o);}},viewQuery:function(i,r){if(i&1&&Lp(Br,5),i&2){let a;xE(a=AE())&&(r.primaryAction=a.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(i,r){i&1&&Rp$1("keydown",function(o){return r._handleKeydown(o)}),i&2&&(xp("id",r.id),Cp("role",r.role)("aria-label",r.ariaLabel),WE("mat-"+(r.color||"primary")),$p("mdc-evolution-chip",!r._isBasicChip)("mdc-evolution-chip--disabled",r.disabled)("mdc-evolution-chip--with-trailing-action",r._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",r.leadingIcon)("mdc-evolution-chip--with-primary-icon",r.leadingIcon)("mdc-evolution-chip--with-avatar",r.leadingIcon)("mat-mdc-chip-with-avatar",r.leadingIcon)("mat-mdc-chip-highlighted",r.highlighted)("mat-mdc-chip-disabled",r.disabled)("mat-mdc-basic-chip",r._isBasicChip)("mat-mdc-standard-chip",!r._isBasicChip)("mat-mdc-chip-with-trailing-icon",r._hasTrailingIcon())("_mat-animation-noopable",r._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",tF],highlighted:[2,"highlighted","highlighted",tF],disableRipple:[2,"disableRipple","disableRipple",tF],disabled:[2,"disabled","disabled",tF]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[dD([{provide:Gi$1,useExisting:e}])],ngContentSelectors:jr,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(i,r){i&1&&(ME(Lr),_p$1(0,"span",0),fi$3(1,"span",1)(2,"span",2),pE(3,Oo$1,2,0,"span",3),fi$3(4,"span",4),NE(5),_p$1(6,"span",5),Nc$1()()(),pE(7,Po$1,2,0,"span",6)),i&2&&(cv(3),hE(r.leadingIcon?3:-1),cv(4),hE(r._hasTrailingIcon()?7:-1));},dependencies:[Hr],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2})}return e})();var zo$1=(()=>{class e extends qi$1{_defaultOptions=T$1(zr,{optional:true});chipListSelectable=true;_chipListMultiple=false;_chipListHideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get selectable(){return this._selectable&&this.chipListSelectable}set selectable(t){this._selectable=t,this._changeDetectorRef.markForCheck();}_selectable=true;get selected(){return this._selected}set selected(t){this._setSelectedState(t,false,true);}_selected=false;get ariaSelected(){return this.selectable?this.selected.toString():null}basicChipAttrName="mat-basic-chip-option";selectionChange=new Be$2;ngOnInit(){super.ngOnInit(),this.role="presentation";}select(){this._setSelectedState(true,false,true);}deselect(){this._setSelectedState(false,false,true);}selectViaInteraction(){this._setSelectedState(true,true,true);}toggleSelected(t=false){return this._setSelectedState(!this.selected,t,true),this.selected}_handlePrimaryActionInteraction(){this.disabled||(this.focus(),this.selectable&&this.toggleSelected(true));}_hasLeadingGraphic(){return this.leadingIcon?true:!this._chipListHideSingleSelectionIndicator||this._chipListMultiple}_setSelectedState(t,i,r){t!==this.selected&&(this._selected=t,r&&this.selectionChange.emit({source:this,isUserInput:i,selected:this.selected}),this._changeDetectorRef.markForCheck());}static \u0275fac=(()=>{let t;return function(r){return (t||(t=Nm(e)))(r||e)}})();static \u0275cmp=BI({type:e,selectors:[["mat-basic-chip-option"],["","mat-basic-chip-option",""],["mat-chip-option"],["","mat-chip-option",""]],hostAttrs:[1,"mat-mdc-chip","mat-mdc-chip-option"],hostVars:37,hostBindings:function(i,r){i&2&&(xp("id",r.id),Cp("tabindex",null)("aria-label",null)("aria-description",null)("role",r.role),$p("mdc-evolution-chip",!r._isBasicChip)("mdc-evolution-chip--filter",!r._isBasicChip)("mdc-evolution-chip--selectable",!r._isBasicChip)("mat-mdc-chip-selected",r.selected)("mat-mdc-chip-multiple",r._chipListMultiple)("mat-mdc-chip-disabled",r.disabled)("mat-mdc-chip-with-avatar",r.leadingIcon)("mdc-evolution-chip--disabled",r.disabled)("mdc-evolution-chip--selected",r.selected)("mdc-evolution-chip--selecting",!r._animationsDisabled)("mdc-evolution-chip--with-trailing-action",r._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon",r.leadingIcon)("mdc-evolution-chip--with-primary-graphic",r._hasLeadingGraphic())("mdc-evolution-chip--with-avatar",r.leadingIcon)("mat-mdc-chip-highlighted",r.highlighted)("mat-mdc-chip-with-trailing-icon",r._hasTrailingIcon()));},inputs:{selectable:[2,"selectable","selectable",tF],selected:[2,"selected","selected",tF]},outputs:{selectionChange:"selectionChange"},features:[dD([{provide:qi$1,useExisting:e},{provide:Gi$1,useExisting:e}]),yp],ngContentSelectors:jr,decls:8,vars:6,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipAction","","role","option",3,"_allowFocusWhenDisabled"],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"],[1,"mdc-evolution-chip__checkmark"],["viewBox","-2 -3 30 30","focusable","false","aria-hidden","true",1,"mdc-evolution-chip__checkmark-svg"],["fill","none","stroke","currentColor","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-evolution-chip__checkmark-path"]],template:function(i,r){i&1&&(ME(Lr),_p$1(0,"span",0),fi$3(1,"span",1)(2,"button",2),pE(3,Uo$1,5,0,"span",3),fi$3(4,"span",4),NE(5),_p$1(6,"span",5),Nc$1()()(),pE(7,Lo$1,2,0,"span",6)),i&2&&(cv(2),bp$1("_allowFocusWhenDisabled",true),Cp("aria-description",r.ariaDescription)("aria-label",r.ariaLabel)("aria-selected",r.ariaSelected),cv(),hE(r._hasLeadingGraphic()?3:-1),cv(4),hE(r._hasTrailingIcon()?7:-1));},dependencies:[Br],styles:[jo$1],encapsulation:2})}return e})();var Ho$1=(()=>{class e{_elementRef=T$1(vr$2);_changeDetectorRef=T$1(XL);_dir=T$1(ze$2,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new ee$1;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(t=>t._onFocus)}get chipDestroyedChanges(){return this._getChipStream(t=>t.destroyed)}get chipRemovedChanges(){return this._getChipStream(t=>t.removed)}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(t){this._explicitRole=t;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new Ko$2;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(t=>t._hasFocus())}_syncChipsState(){this._chips?.forEach(t=>{t._chipListDisabled=this._disabled,t._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(t){this._originatesFromChip(t)&&this._keyManager.onKeydown(t);}_isValidIndex(t){return t>=0&&t<this._chips.length}_allowFocusEscape(){let t=this._elementRef.nativeElement.tabIndex;t!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=t));}_getChipStream(t){return this._chips.changes.pipe(Sl$1(null),sl$1(()=>Qh(...this._chips.map(t))))}_originatesFromChip(t){let i=t.target;for(;i&&i!==this._elementRef.nativeElement;){if(i.classList.contains("mat-mdc-chip"))return  true;i=i.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Sl$1(this._chips)).subscribe(t=>{let i=[];t.forEach(r=>r._getActions().forEach(a=>i.push(a))),this._chipActions.reset(i),this._chipActions.notifyOnChanges();}),this._keyManager=new Br$1(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(t=>this._skipPredicate(t)),this.chipFocusChanges.pipe(ig(this._destroyed)).subscribe(({chip:t})=>{let i=t._getSourceAction(document.activeElement);i&&this._keyManager.updateActiveItem(i);}),this._dir?.change.pipe(ig(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t));}_skipPredicate(t){return t.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Sl$1(null),ig(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(ig(this._destroyed)).subscribe(t=>{let r=this._chips.toArray().indexOf(t.chip),a=t.chip._hasFocus(),o=t.chip._hadFocusOnRemove&&this._keyManager.activeItem&&t.chip._getActions().includes(this._keyManager.activeItem),c=a||o;this._isValidIndex(r)&&c&&(this._lastDestroyedFocusedChipIndex=r);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let t=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),i=this._chips.toArray()[t];i.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():i.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=BI({type:e,selectors:[["mat-chip-set"]],contentQueries:function(i,r,a){if(i&1&&Pp(a,qi$1,5),i&2){let o;xE(o=AE())&&(r._chips=o);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(i,r){i&1&&Rp$1("keydown",function(o){return r._handleKeydown(o)}),i&2&&Cp("role",r.role);},inputs:{disabled:[2,"disabled","disabled",tF],role:"role",tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:nF(t)]},ngContentSelectors:Fr,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(i,r){i&1&&(ME(),Sc$1(0,"div",0),NE(1),xc$1());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return e})(),Vi=class{source;value;constructor(n,t){this.source=n,this.value=t;}},Bo$1={provide:xr$1,useExisting:po$2(()=>$o),multi:true},$o=(()=>{class e extends Ho$1{_onTouched=()=>{};_onChange=()=>{};_defaultRole="listbox";_defaultOptions=T$1(zr,{optional:true});get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._syncListboxProperties();}_multiple=false;get selected(){let t=this._chips.toArray().filter(i=>i.selected);return this.multiple?t:t[0]}ariaOrientation="horizontal";get selectable(){return this._selectable}set selectable(t){this._selectable=t,this._syncListboxProperties();}_selectable=true;compareWith=(t,i)=>t===i;required=false;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._syncListboxProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get chipSelectionChanges(){return this._getChipStream(t=>t.selectionChange)}get chipBlurChanges(){return this._getChipStream(t=>t._onBlur)}get value(){return this._value}set value(t){this._chips&&this._chips.length&&this._setSelectionByValue(t,false),this._value=t;}_value;change=new Be$2;_chips=void 0;ngAfterContentInit(){this._chips.changes.pipe(Sl$1(null),ig(this._destroyed)).subscribe(()=>{this.value!==void 0&&Promise.resolve().then(()=>{this._setSelectionByValue(this.value,false);}),this._syncListboxProperties();}),this.chipBlurChanges.pipe(ig(this._destroyed)).subscribe(()=>this._blur()),this.chipSelectionChanges.pipe(ig(this._destroyed)).subscribe(t=>{this.multiple||this._chips.forEach(i=>{i!==t.source&&i._setSelectedState(false,false,false);}),t.isUserInput&&this._propagateChanges();});}focus(){if(this.disabled)return;let t=this._getFirstSelectedChip();t&&!t.disabled?t.focus():this._chips.length>0?this._keyManager.setFirstItemActive():this._elementRef.nativeElement.focus();}writeValue(t){t!=null?this.value=t:this.value=void 0;}registerOnChange(t){this._onChange=t;}registerOnTouched(t){this._onTouched=t;}setDisabledState(t){this.disabled=t;}_setSelectionByValue(t,i=true){this._clearSelection(),Array.isArray(t)?t.forEach(r=>this._selectValue(r,i)):this._selectValue(t,i);}_blur(){this.disabled||setTimeout(()=>{this.focused||this._markAsTouched();});}_keydown(t){t.keyCode===9&&super._allowFocusEscape();}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck();}_propagateChanges(){let t=null;Array.isArray(this.selected)?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:void 0,this._value=t,this.change.emit(new Vi(this,t)),this._onChange(t),this._changeDetectorRef.markForCheck();}_clearSelection(t){this._chips.forEach(i=>{i!==t&&i.deselect();});}_selectValue(t,i){let r=this._chips.find(a=>a.value!=null&&this.compareWith(a.value,t));return r&&(i?r.selectViaInteraction():r.select()),r}_syncListboxProperties(){this._chips&&Promise.resolve().then(()=>{this._chips.forEach(t=>{t._chipListMultiple=this.multiple,t.chipListSelectable=this._selectable,t._chipListHideSingleSelectionIndicator=this.hideSingleSelectionIndicator,t._changeDetectorRef.markForCheck();});});}_getFirstSelectedChip(){return Array.isArray(this.selected)?this.selected.length?this.selected[0]:void 0:this.selected}_skipPredicate(t){return  false}static \u0275fac=(()=>{let t;return function(r){return (t||(t=Nm(e)))(r||e)}})();static \u0275cmp=BI({type:e,selectors:[["mat-chip-listbox"]],contentQueries:function(i,r,a){if(i&1&&Pp(a,zo$1,5),i&2){let o;xE(o=AE())&&(r._chips=o);}},hostAttrs:[1,"mdc-evolution-chip-set","mat-mdc-chip-listbox"],hostVars:10,hostBindings:function(i,r){i&1&&Rp$1("focus",function(){return r.focus()})("blur",function(){return r._blur()})("keydown",function(o){return r._keydown(o)}),i&2&&(xp("tabIndex",r.disabled||r.empty?-1:r.tabIndex),Cp("role",r.role)("aria-required",r.role?r.required:null)("aria-disabled",r.disabled.toString())("aria-multiselectable",r.multiple)("aria-orientation",r.ariaOrientation),$p("mat-mdc-chip-list-disabled",r.disabled)("mat-mdc-chip-list-required",r.required));},inputs:{multiple:[2,"multiple","multiple",tF],ariaOrientation:[0,"aria-orientation","ariaOrientation"],selectable:[2,"selectable","selectable",tF],compareWith:"compareWith",required:[2,"required","required",tF],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",tF],value:"value"},outputs:{change:"change"},features:[dD([Bo$1]),yp],ngContentSelectors:Fr,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(i,r){i&1&&(ME(),Sc$1(0,"div",0),NE(1),xc$1());},styles:[Fo$1],encapsulation:2})}return e})();var qo$1=(function(e){return e.ASC="asc",e.DESC="desc",e})(qo$1||{});function j(o){return Error(`Unable to find icon with the name "${o}"`)}function J(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function B(o){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${o}".`)}function $(o){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${o}".`)}var a=class{url;svgText;options;svgElement=null;constructor(l,t,e){this.url=l,this.svgText=t,this.options=e;}},Y=(()=>{class o{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,e,n,i){this._httpClient=t,this._sanitizer=e,this._errorHandler=i,this._document=n;}addSvgIcon(t,e,n){return this.addSvgIconInNamespace("",t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace("",t,e,n)}addSvgIconInNamespace(t,e,n,i){return this._addSvgIconConfig(t,e,new a(n,null,i))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,i){let r=this._sanitizer.sanitize(Er$2.HTML,n);if(!r)throw $(n);let s=ud(r);return this._addSvgIconConfig(t,e,new a("",s,i))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace("",t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace("",t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new a(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){let i=this._sanitizer.sanitize(Er$2.HTML,e);if(!i)throw $(e);let r=ud(i);return this._addSvgIconSetConfig(t,new a("",r,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let e=this._sanitizer.sanitize(Er$2.RESOURCE_URL,t);if(!e)throw B(t);let n=this._cachedIconsByUrl.get(e);return n?Oh(M(n)):this._loadSvgIconFromConfig(new a(t,null)).pipe(xl$1(i=>this._cachedIconsByUrl.set(e,i)),we$1(i=>M(i)))}getNamedSvgIcon(t,e=""){let n=q(e,t),i=this._svgIconConfigs.get(n);if(i)return this._getSvgFromConfig(i);if(i=this._getIconConfigFromResolvers(e,t),i)return this._svgIconConfigs.set(n,i),this._getSvgFromConfig(i);let r=this._iconSetConfigs.get(e);return r?this._getSvgFromIconSetConfigs(t,r):Ph(j(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear();}_getSvgFromConfig(t){return t.svgText?Oh(M(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(we$1(e=>M(e)))}_getSvgFromIconSetConfigs(t,e){let n=this._extractIconWithNameFromAnySet(t,e);if(n)return Oh(n);let i=e.filter(r=>!r.svgText).map(r=>this._loadSvgIconSetFromConfig(r).pipe(Vi$1(s=>{let h=`Loading icon set URL: ${this._sanitizer.sanitize(Er$2.RESOURCE_URL,r.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(h)),Oh(null)})));return zh(i).pipe(we$1(()=>{let r=this._extractIconWithNameFromAnySet(t,e);if(!r)throw j(t);return r}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.svgText&&i.svgText.toString().indexOf(t)>-1){let r=this._svgElementFromConfig(i),s=this._extractSvgIconFromSet(r,t,i.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(xl$1(e=>t.svgText=e),we$1(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?Oh(null):this._fetchIcon(t).pipe(xl$1(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){let i=t.querySelector(`[id="${e}"]`);if(!i)return null;let r=i.cloneNode(true);if(r.removeAttribute("id"),r.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(r,n);if(r.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(r),n);let s=this._svgElementFromString(ud("<svg></svg>"));return s.appendChild(r),this._setSvgAttributes(s,n)}_svgElementFromString(t){let e=this._document.createElement("DIV");e.innerHTML=t;let n=e.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(t){let e=this._svgElementFromString(ud("<svg></svg>")),n=t.attributes;for(let i=0;i<n.length;i++){let{name:r,value:s}=n[i];r!=="id"&&e.setAttribute(r,s);}for(let i=0;i<t.childNodes.length;i++)t.childNodes[i].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[i].cloneNode(true));return e}_setSvgAttributes(t,e){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),e&&e.viewBox&&t.setAttribute("viewBox",e.viewBox),t}_fetchIcon(t){let{url:e,options:n}=t,i=n?.withCredentials??false;if(!this._httpClient)throw J();if(e==null)throw Error(`Cannot fetch icon from URL "${e}".`);let r=this._sanitizer.sanitize(Er$2.RESOURCE_URL,e);if(!r)throw B(e);let s=this._inProgressUrlFetches.get(r);if(s)return s;let f=this._httpClient.get(r,{responseType:"text",withCredentials:i}).pipe(we$1(h=>ud(h)),Ml$1(()=>this._inProgressUrlFetches.delete(r)),Ui$1());return this._inProgressUrlFetches.set(r,f),f}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(q(t,e),n),this}_addSvgIconSetConfig(t,e){let n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){let e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e;}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){let i=this._resolvers[n](e,t);if(i)return V(i)?new a(i.url,null,i.options):new a(i,null)}}static \u0275fac=function(e){return new(e||o)(Me$3(ms,8),Me$3(mr$1),Me$3(nr$2,8),Me$3(We$1))};static \u0275prov=te$1({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();function M(o){return o.cloneNode(true)}function q(o,l){return o+":"+l}function V(o){return !!(o.url&&o.options)}var Z=["*"],Q=new x("MAT_ICON_DEFAULT_OPTIONS"),X=new x("mat-icon-location",{providedIn:"root",factory:()=>{let o=T$1(nr$2),l=o?o.location:null;return {getPathname:()=>l?l.pathname+l.search:""}}}),K=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],tt$1=K.map(o=>`[${o}]`).join(", "),et$1=/^url\(['"]?#(.*?)['"]?\)$/,Mt$1=(()=>{class o{_elementRef=T$1(vr$2);_iconRegistry=T$1(Y);_location=T$1(X);_errorHandler=T$1(We$1);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t;}_color;inline=false;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t);}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses());}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses());}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=G.EMPTY;constructor(){let t=T$1(new uh("aria-hidden"),{optional:true}),e=T$1(Q,{optional:true});e&&(e.color&&(this.color=this._defaultColor=e.color),e.fontSet&&(this.fontSet=e.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true");}_splitIconName(t){if(!t)return ["",""];let e=t.split(":");switch(e.length){case 1:return ["",e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses();}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e));}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();}_usingFontIcon(){return !this.svgIcon}_setSvgElement(t){this._clearSvgElement();let e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t);}_clearSvgElement(){let t=this._elementRef.nativeElement,e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){let n=t.childNodes[e];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove();}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon);}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let e=this._elementsWithExternalReferences;e&&e.forEach((n,i)=>{n.forEach(r=>{i.setAttribute(r.name,`url('${t}#${r.value}')`);});});}_cacheChildrenWithExternalReferences(t){let e=t.querySelectorAll(tt$1),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<e.length;i++)K.forEach(r=>{let s=e[i],f=s.getAttribute(r),h=f?f.match(et$1):null;if(h){let v=n.get(s);v||(v=[],n.set(s,v)),v.push({name:r,value:h[1]});}});}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe(yt$2(1)).subscribe(i=>this._setSvgElement(i),i=>{let r=`Error retrieving icon ${e}:${n}! ${i.message}`;this._errorHandler.handleError(new Error(r));});}}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=BI({type:o,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(e,n){e&2&&(Cp("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),WE(n.color?"mat-"+n.color:""),$p("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"));},inputs:{color:"color",inline:[2,"inline","inline",tF],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:Z,decls:1,vars:0,template:function(e,n){e&1&&(ME(),NE(0));},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2})}return o})();var Rt=new x("ARTWORK_PORT");var nt$1=(function(o){return o.MEDIUM="Medium",o.HEIGHT="Height",o.WIDTH="Width",o.UNIT="Unit",o.YEAR="Year",o.IMAGETYPE="Image Type",o.ARTIST="Artist",o.PROJECT="Project",o.DESC_AUTHOR="Description Author",o.DESC_LANG="Description language",o.VERSION="Version",o})(nt$1||{}),ot=(function(o){return o.FRONTAL="Frontal view",o.PROGRESS="Work in progress",o.DETAIL="Detail",o})(ot||{}),it$1=(function(o){return o.YEAR="year",o.SIZE="size",o.MEDIUM="medium",o})(it$1||{}),At$1=["23","24","25","26","30","34","37","58","59","61","64","66","70","71","72","74","75","77","94","97","112","114","115","118","117","126","136","159","161","163","165"];var rt=["*"],Pt=(()=>{class o{labelPosition="after";static \u0275fac=function(e){return new(e||o)};static \u0275cmp=BI({type:o,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(e,n){e&2&&$p("mdc-form-field--align-end",n.labelPosition==="before");},inputs:{labelPosition:"labelPosition"},ngContentSelectors:rt,decls:1,vars:0,template:function(e,n){e&1&&(ME(),NE(0));},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})}return o})();var h=(()=>{class t{constructor(){this.responsive=T$1(ld),this.displayMobileLayout=new Sn(false),this.responsive.observe([gg.XSmall]).pipe(bl()).subscribe(e=>{this.displayMobileLayout.next(!e.matches);});}static{this.\u0275fac=function(c){return new(c||t)};}static{this.\u0275prov=te$1({token:t,factory:t.\u0275fac,providedIn:"root"});}}return t})();var r=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=GI({type:t,selectors:[["","mat-line",""],["","matLine",""]],hostAttrs:[1,"mat-line"]})}return t})();var Ge={type:null,entityIds:null,skip:false,payload:null},ji=false;function zi(){ji=false;}function ce(r,n,e){N(r,n,e),ji=true;}function N(r,n,e){ji===false&&(Ge.type=r,Ge.entityIds=n,Ge.payload=e);}function Hi(r=true){Ge.skip=r;}function qi(r,n){return function(e,t,i){let a=i.value;return i.value=function(...o){return ce(r,n),a.apply(this,o)},i}}function Se(r,n){return r.hasOwnProperty(n)}function pe(r){return Array.isArray(r)}function Ut(r){return r.hasOwnProperty("active")}function pi(r){return pe(r)}function jt({active:r,ids:n,entities:e}){return pi(r)?Jr(r,n):Se(e,r)===false?null:r}function Jr(r,n){let e=r.filter(t=>n.indexOf(t)>-1);return e.length===r.length?r:e}function Yi({state:r,entities:n,idKey:e,options:t={},preAddEntity:i}){let a={},o=[],l=false;for(let d of n)if(Se(r.entities,d[e])===false){let u=i(d),S=u[e];a[S]=u,t.prepend?o.unshift(S):o.push(S),l=true;}return l?{newState:x$1(w$2({},r),{entities:w$2(w$2({},r.entities),a),ids:t.prepend?[...o,...r.ids]:[...r.ids,...o]}),newIds:o}:null}function H(r){return r==null}function R(r){return H(r)?[]:Array.isArray(r)?r:[r]}function Me(r){return pe(r)?r.length===0:false}function y(r){return typeof r=="function"}function ke(r){let n=typeof r;return r!=null&&(n=="object"||n=="function")}var ea={resettable:false,ttl:null,producerFn:void 0};function xt(){return ea}function ta(){return ea.producerFn}function Ve(r){return H(r)===false}var zt=new ee$1,Xe=new An(50,5e3),Ki=new ee$1;function ia(r){zt.next(r);}function na(r){Xe.next(r);}function ra(r,n){Ki.next({storeName:r,action:n});}var Ze=typeof window<"u",Ht=!Ze,Qi=()=>{try{return typeof localStorage<"u"}catch(r){return  false}},aa=()=>{try{return typeof sessionStorage<"u"}catch(r){return  false}};var A={},Wi={};Ze&&(window.$$stores=A,window.$$queries=Wi);function Gi(r){return r&&r.charAt(0).toUpperCase()+r.slice(1)}var Ct=[];function $i(r,n={}){if(Ht||!window.__REDUX_DEVTOOLS_EXTENSION__)return;Ct.length&&Ct.forEach(u=>{u.unsubscribe?u.unsubscribe():u&&u();}),r&&r.run||(r=r||{},r.run=u=>u(),n=r);let i=Object.assign({},{name:"Akita",shallow:true,storesWhitelist:[]},n),a=i.storesWhitelist,o=window.__REDUX_DEVTOOLS_EXTENSION__.connect(i),l={},d=u=>a.length?a.indexOf(u)>-1:true;Ct.push(Xe.subscribe(u=>{d(u)!==false&&(l=x$1(w$2({},l),{[u]:A[u]._value()}),o.send({type:`[${Gi(u)}] - @@INIT`},l));})),Ct.push(zt.subscribe(u=>{d(u)!==false&&(delete l[u],o.send({type:`[${u}] - Delete Store`},l));})),Ct.push(Ki.subscribe(({storeName:u,action:S})=>{if(d(u)===false)return;let It=S,{type:w,entityIds:_,skip:v}=It,$=z$1(It,["type","entityIds","skip"]).payload;if(v){Hi(false);return}let de=A[u];if(!de||n.shallow===false&&l[u]&&JSON.stringify(de._value())===JSON.stringify(l[u]))return;l=x$1(w$2({},l),{[u]:de._value()});let fe=Gi(u),X=Ve(_)?`[${fe}] - ${w} (ids: ${_})`:`[${fe}] - ${w}`;if(n.logTrace&&(console.group(X),console.trace(),console.groupEnd()),n.sortAlphabetically){let rt=Object.keys(l).sort().reduce((at,Tt)=>(at[Tt]=l[Tt],at),{});o.send(w$2({type:X},$),rt);return}o.send(w$2({type:X},$),l);})),Ct.push(o.subscribe(u=>{if(u.type==="DISPATCH"){if(u.payload.type==="COMMIT"){o.init(l);return}if(u.state){let w=JSON.parse(u.state);for(let _=0,v=Object.keys(w);_<v.length;_++){let D=v[_];A[D]&&r.run(()=>{A[D]._setState(()=>w[D],false);});}}}}));}var Ue=(function(r){return r.Set="Set",r.Add="Add",r.Update="Update",r.Remove="Remove",r})(Ue||{});function Zi(r,n,e){let t;if(pe(r))t=r;else if(ke(r)){if(H(e))return;r=Object.assign({wrap:true},r);let i=n.indexOf(e);if(r.prev){let a=i===0;if(a&&!r.wrap)return;t=a?n[n.length-1]:n[i-1];}else if(r.next){let a=n.length===i+1;if(a&&!r.wrap)return;t=a?n[0]:n[i+1];}}else {if(r===e)return;t=r;}return t}var Ji=()=>({entities:{},ids:[],loading:true,error:null});function we(r){return r===void 0}function en({state:r,ids:n}){if(H(n))return oa(r);let e=r.entities,t={};for(let a of r.ids)n.includes(a)===false&&(t[a]=e[a]);let i=x$1(w$2({},r),{entities:t,ids:r.ids.filter(a=>n.includes(a)===false)});return Ut(r)&&(i.active=jt(i)),i}function oa(r){return x$1(w$2({},r),{entities:{},ids:[],active:pi(r.active)?[]:null})}function tn(r,n,e){let t={entities:{},ids:[]};for(let i of r){let a=e(i);t.entities[a[n]]=a,t.ids.push(a[n]);}return t}function la(r){return r.entities&&r.ids}function sa(r,n){let e={};for(let t of Object.keys(r))e[t]=n(r[t]);return e}function nn({state:r,entities:n,idKey:e,preAddEntity:t,isNativePreAdd:i}){let a,o;if(pe(n)){let d=tn(n,e,t);a=d.entities,o=d.ids;}else la(n)?(a=i?n.entities:sa(n.entities,t),o=n.ids):(a=i?n:sa(n,t),o=Object.keys(a).map(d=>isNaN(d)?d:Number(d)));let l=x$1(w$2({},r),{entities:a,ids:o,loading:false});return Ut(r)&&(l.active=jt(l)),l}function rn(r){Object.freeze(r);let n=typeof r=="function",e=Object.prototype.hasOwnProperty;return Object.getOwnPropertyNames(r).forEach(function(t){e.call(r,t)&&(!n||t!=="caller"&&t!=="callee"&&t!=="arguments")&&r[t]!==null&&(typeof r[t]=="object"||typeof r[t]=="function")&&!Object.isFrozen(r[t])&&rn(r[t]);}),r}function ca(r,n){r||console.error(`@StoreConfig({ name }) is missing in ${n}`);}function Te(r){return r!=null&&`${r}`!="false"}function St(r){return Te(r)&&r.constructor.name==="Object"}var Je="akitaConfig";function an(r){return function(n){n[Je]={idKey:"id"};for(let e=0,t=Object.keys(r);e<t.length;e++){let i=t[e];i==="name"?n[Je].storeName=r[i]:n[Je][i]=r[i];}}}var Va=new ee$1,da=new Sn(false),De={activeTransactions:0,batchTransaction:null};function ua(){fi()||(De.batchTransaction=new ee$1),De.activeTransactions++,da.next(true);}function ma(){--De.activeTransactions===0&&(De.batchTransaction.next(true),De.batchTransaction.complete(),da.next(false),Va.next(true));}function fi(){return De.activeTransactions>0}function on(){return De.batchTransaction?De.batchTransaction.asObservable():Oh(true)}function Yt(r,n=void 0){ua();try{return r.apply(n)}finally{ce("@Transaction"),ma();}}function gi(){return function(r,n,e){let t=e.value;return e.value=function(...i){return Yt(()=>t.apply(this,i),this)},e}}var je=class{constructor(n,e={}){this.options=e,this.inTransaction=false,this.cache={active:new Sn(false),ttl:null},this.onInit(n);}setLoading(n=false){n!==this._value().loading&&(N("Set Loading"),this._setState(e=>x$1(w$2({},e),{loading:n})));}setHasCache(n,e={restartTTL:false}){if(n!==this.cache.active.value&&this.cache.active.next(n),e.restartTTL){let t=this.getCacheTTL();t&&(this.cache.ttl!==null&&clearTimeout(this.cache.ttl),this.cache.ttl=setTimeout(()=>this.setHasCache(false),t));}}getValue(){return this.storeValue}setError(n){n!==this._value().error&&(N("Set Error"),this._setState(e=>x$1(w$2({},e),{error:n})));}_select(n){return this.store.asObservable().pipe(we$1(e=>n(e.state)),bl())}_value(){return this.storeValue}_cache(){return this.cache.active}get config(){return this.constructor[Je]||{}}get storeName(){return this.config.storeName||this.options.storeName||this.options.name}get deepFreeze(){return this.config.deepFreezeFn||this.options.deepFreezeFn||rn}get cacheConfig(){return this.config.cache||this.options.cache}get _producerFn(){return this.config.producerFn||this.options.producerFn||ta()}get resettable(){return Ve(this.config.resettable)?this.config.resettable:this.options.resettable}_setState(n,e=true){if(y(n)){let t=n(this._value());this.storeValue=this.deepFreeze(t);}else this.storeValue=n;if(!this.store){this.store=new Sn({state:this.storeValue}),this.store.subscribe(({action:t})=>{t&&ra(this.storeName,t);});return}if(fi()){this.handleTransaction();return}this.dispatch(this.storeValue,e);}reset(){this.isResettable()&&(N("Reset"),this._setState(()=>Object.assign({},this._initialState)),this.setHasCache(false));}update(n){N("Update");let e,t=this._value();y(n)?e=y(this._producerFn)?this._producerFn(t,n):n(t):e=n;let i=this.akitaPreUpdate(t,w$2(w$2({},t),e)),a=St(t)?i:new t.constructor(i);this._setState(a);}updateStoreConfig(n){this.options=w$2(w$2({},this.options),n);}akitaPreUpdate(n,e){return e}destroy(){!(Ze&&window.hmrEnabled)&&this===A[this.storeName]&&(delete A[this.storeName],ia(this.storeName),this.setHasCache(false),this.cache.active.complete(),this.store.complete());}onInit(n){A[this.storeName]=this,this._setState(()=>n),na(this.storeName),this.isResettable()&&(this._initialState=n),ca(this.storeName,this.constructor.name);}dispatch(n,e=true){let t;e&&(t=Ge,zi()),this.store.next({state:n,action:t});}watchTransaction(){on().subscribe(()=>{this.inTransaction=false,this.dispatch(this._value());});}isResettable(){return this.resettable===false?false:this.resettable||xt().resettable}handleTransaction(){this.inTransaction||(this.watchTransaction(),this.inTransaction=true);}getCacheTTL(){return this.cacheConfig&&this.cacheConfig.ttl||xt().ttl}};function sn({state:r,ids:n,idKey:e,newStateOrFn:t,preUpdateEntity:i,producerFn:a,onEntityIdChanges:o}){let l={},d=false,u;for(let v of n){if(Se(r.entities,v)===false)continue;let D=r.entities[v],$;y(t)?$=y(a)?a(D,t):t(D):$=t;let de=$.hasOwnProperty(e)&&$[e]!==D[e],fe;u=v,de&&(d=true,u=$[e]);let X=w$2(w$2({},D),$);St(D)?fe=X:St($)?fe=new D.constructor(X):fe=new $.constructor(X),l[u]=i(D,fe);}let S=r.ids,w=r.entities;if(d){let[v]=n,_=r.entities,{[v]:D}=_;w=z$1(_,[y$2(v)]),S=r.ids.map(de=>de===v?u:de),o(v,u);}return x$1(w$2({},r),{entities:w$2(w$2({},w),l),ids:S})}var ha,et=class r extends je{constructor(n={},e={}){super(w$2(w$2({},Ji()),n),e),this.options=e,this.entityActions=new ee$1,this.entityIdChanges=new ee$1;}get selectEntityAction$(){return this.entityActions.asObservable()}get selectEntityIdChanges$(){return this.entityIdChanges.asObservable()}get idKey(){return this.config.idKey||this.options.idKey||"id"}set(n,e={}){if(H(n))return;N("Set Entity");let t=this.akitaPreAddEntity===r.prototype.akitaPreAddEntity;this.setHasCache(true,{restartTTL:true}),this._setState(i=>{let a=nn({state:i,entities:n,idKey:this.idKey,preAddEntity:this.akitaPreAddEntity.bind(this),isNativePreAdd:t});return we(e.activeId)===false&&(a.active=e.activeId),a}),this.hasInitialUIState()&&this.handleUICreation(),this.entityActions.next({type:Ue.Set,ids:this.ids});}add(n,e={loading:false}){let t=R(n);if(Me(t))return;let i=Yi({state:this._value(),preAddEntity:this.akitaPreAddEntity.bind(this),entities:t,idKey:this.idKey,options:e});i&&(N("Add Entity"),i.newState.loading=e.loading,this._setState(()=>i.newState),this.hasInitialUIState()&&this.handleUICreation(true),this.entityActions.next({type:Ue.Add,ids:i.newIds}));}update(n,e){if(we(e)){super.update(n);return}let t=[];if(y(n)?t=this.ids.filter(a=>n(this.entities[a])):t=H(n)?this.ids:R(n),Me(t))return;N("Update Entity",t);let i;this._setState(a=>sn({idKey:this.idKey,ids:t,preUpdateEntity:this.akitaPreUpdateEntity.bind(this),state:a,newStateOrFn:e,producerFn:this._producerFn,onEntityIdChanges:(o,l)=>{i={oldId:o,newId:l},this.entityIdChanges.next(x$1(w$2({},i),{pending:true}));}})),i&&this.entityIdChanges.next(x$1(w$2({},i),{pending:false})),this.entityActions.next({type:Ue.Update,ids:t});}upsert(n,e,t,i={}){let a=R(n),o=w=>_=>Se(this.entities,_)===w,l=y(t)?i.baseClass:t?t.baseClass:void 0,d=y(l),u=a.filter(o(true)),S=a.filter(o(false)).map(w=>{let _=typeof e=="function"?e({}):e,v=y(t)?t(w,_):_,D=x$1(w$2({},v),{[this.idKey]:w});return d?new l(D):D});this.update(u,e),this.add(S),ce("Upsert Entity");}upsertMany(n,e={}){let t=[],i=[],a={};for(let o of n){let l=this.akitaPreCheckEntity(o),d=l[this.idKey];if(Se(this.entities,d)){let u=this._value().entities[d],S=w$2(w$2({},this._value().entities[d]),l),w=e.baseClass?new e.baseClass(S):S,_=this.akitaPreUpdateEntity(u,w),v=_[this.idKey];a[v]=_,i.push(v);}else {let u=e.baseClass?new e.baseClass(l):l,S=this.akitaPreAddEntity(u),w=S[this.idKey];t.push(w),a[w]=S;}}ce("Upsert Many"),this._setState(o=>x$1(w$2({},o),{ids:t.length?[...o.ids,...t]:o.ids,entities:w$2(w$2({},o.entities),a),loading:!!e.loading})),i.length&&this.entityActions.next({type:Ue.Update,ids:i}),t.length&&this.entityActions.next({type:Ue.Add,ids:t}),t.length&&this.hasUIStore()&&this.handleUICreation(true);}replace(n,e){let t=R(n);if(Me(t))return;let i={};for(let a of t)i[a]=x$1(w$2({},e),{[this.idKey]:a});N("Replace Entity",n),this._setState(a=>x$1(w$2({},a),{entities:w$2(w$2({},a.entities),i)}));}move(n,e){let t=this.ids.slice();t.splice(e<0?t.length+e:e,0,t.splice(n,1)[0]),N("Move Entity"),this._setState(i=>x$1(w$2({},i),{entities:w$2({},i.entities),ids:t}));}remove(n){if(Me(this.ids))return;let e=Ve(n),t=[];y(n)?t=this.ids.filter(i=>n(this.entities[i])):t=e?R(n):this.ids,!Me(t)&&(N("Remove Entity",t),this._setState(i=>en({state:i,ids:t})),e||this.setHasCache(false),this.handleUIRemove(t),this.entityActions.next({type:Ue.Remove,ids:t}));}updateActive(n){let e=R(this.active);N("Update Active",e),this.update(e,n);}setActive(n){let e=Zi(n,this.ids,this.active);e!==void 0&&(N("Set Active",e),this._setActive(e));}addActive(n){let e=R(n);Me(e)||e.every(i=>this.active.indexOf(i)>-1)||(N("Add Active",n),this._setState(i=>{let a=Array.from(new Set([...i.active,...e]));return x$1(w$2({},i),{active:a})}));}removeActive(n){let e=R(n);Me(e)||!e.some(i=>this.active.indexOf(i)>-1)||(N("Remove Active",n),this._setState(i=>x$1(w$2({},i),{active:Array.isArray(i.active)?i.active.filter(a=>e.indexOf(a)===-1):null})));}toggleActive(n){let e=R(n),t=o=>l=>this.active.includes(l)===o,i=e.filter(t(true)),a=e.filter(t(false));this.removeActive(i),this.addActive(a),ce("Toggle Active");}createUIStore(n={},e={}){let t={name:`UI/${this.storeName}`,idKey:this.idKey};return this.ui=new Kt(n,w$2(w$2({},t),e)),this.ui}destroy(){super.destroy(),this.ui instanceof r&&this.ui.destroy(),this.entityActions.complete();}akitaPreUpdateEntity(n,e){return e}akitaPreAddEntity(n){return n}akitaPreCheckEntity(n){return n}get ids(){return this._value().ids}get entities(){return this._value().entities}get active(){return this._value().active}_setActive(n){this._setState(e=>x$1(w$2({},e),{active:n}));}handleUICreation(n=false){let e=this.ids,t=y(this.ui._akitaCreateEntityFn),i,a=o=>{let l=this.entities[o],d=t?this.ui._akitaCreateEntityFn(l):this.ui._akitaCreateEntityFn;return w$2({[this.idKey]:l[this.idKey]},d)};n?i=this.ids.filter(o=>we(this.ui.entities[o])).map(a):i=e.map(a),n?this.ui.add(i):this.ui.set(i);}hasInitialUIState(){return this.hasUIStore()&&we(this.ui._akitaCreateEntityFn)===false}handleUIRemove(n){this.hasUIStore()&&this.ui.remove(n);}hasUIStore(){return this.ui instanceof Kt}};Gw([gi(),zw("design:type",Function),zw("design:paramtypes",[Object,Object,Object,Object]),zw("design:returntype",void 0)],et.prototype,"upsert",null);Gw([gi(),zw("design:type",Function),zw("design:paramtypes",[typeof(ha=typeof T<"u"&&T)=="function"?ha:Object]),zw("design:returntype",void 0)],et.prototype,"toggleActive",null);var Kt=class extends et{constructor(n={},e={}){super(n,e);}setInitialEntityState(n){this._akitaCreateEntityFn=n;}};function ln(){return Zt$1(r=>r!=null)}function pa(r){return function(n,e){let t=y(r[0]);return r.some(i=>t?i(n)!==i(e):n[i]!==e[i])===false}}function tt(r){return typeof r=="string"}var cn="akitaQueryConfig";var it=class{constructor(n){this.store=n,this.__store__=n,(Wi[n.storeName]=this);}select(n){let e;if(y(n))e=n;else if(tt(n))e=t=>t[n];else {if(Array.isArray(n))return this.store._select(t=>t).pipe(bl(pa(n)),we$1(t=>y(n[0])?n.map(i=>i(t)):n.reduce((i,a)=>(i[a]=t[a],i),{})));e=t=>t;}return this.store._select(e)}selectLoading(){return this.select(n=>n.loading)}selectError(){return this.select(n=>n.error)}getValue(){return this.store._value()}selectHasCache(){return this.store._cache().asObservable()}getHasCache(){return this.store._cache().value}get config(){return this.constructor[cn]}};function nt(r,n){return n.split(".").length===1?r:n.split(".").slice(1).join(".").split(".").reduce((t,i)=>t&&t[i],r)}function Mt(r,n,e,t=false){let i=n.split(".");if(i.length===1)return w$2(w$2({},r),e);r=w$2({},r);let a=i.length-2;return n.split(".").slice(1).reduce((l,d,u)=>u!==a?(l[d]=w$2({},l[d]),l&&l[d]):(l[d]=t||Array.isArray(l[d])||!ke(l[d])?e:w$2(w$2({},l[d]),e),l&&l[d]),r),r}var ga=false,qa=new An(1);function Ya(){return ga}function Ka(r){return r&&y(r.then)}function Qt(r){return Ka(r)||Lh(r)?Ce(r):Oh(r)}function un(r){let n={key:"AkitaStores",enableInNonBrowser:false,storage:Qi()?localStorage:r.storage,deserialize:JSON.parse,serialize:JSON.stringify,include:[],select:[],persistOnDestroy:false,preStorageUpdate:function(C,b){return b},preStoreUpdate:function(C,b){return b},skipStorageUpdate:Ya,preStorageUpdateOperator:()=>C=>C},{storage:e,enableInNonBrowser:t,deserialize:i,serialize:a,include:o,select:l,key:d,preStorageUpdate:u,persistOnDestroy:S,preStorageUpdateOperator:w,preStoreUpdate:_,skipStorageUpdate:v}=Object.assign({},n,r);if(Ht&&!t||!e)return;let D=o.length>0,$=l.length>0,de,fe;D&&(de=o.reduce((C,b)=>{if(y(b))C.fns.push(b);else {let Ee=b.split(".")[0];C[Ee]=b;}return C},{fns:[]})),$&&(fe=l.reduce((C,b)=>(C[b.storeName]=b,C),{}));let X={},It={},rt=[],at=[];function Tt(C){Qt(C).subscribe(()=>{let b=at.shift();b&&Tt(b);});}let Ra=Qi()&&e===localStorage||aa()&&e===sessionStorage;return Qt(e.getItem(d)).subscribe(C=>{let b=ke(C)?C:i(C||"{}");function Ee(f){b.$cache=w$2(w$2({},b.$cache||{}),f),b=Object.assign({},b,It),at.push(e.setItem(d,Ra?a(b):b)),Tt(at.shift());}function ot(f,st){X[f]=A[f]._select(ae=>nt(ae,st)).pipe(Nl$1(1),we$1(ae=>$&&fe[f]?fe[f](ae):ae),Zt$1(()=>v()===false),w()).subscribe(ae=>{It[f]=u(f,ae),Promise.resolve().then(()=>Ee({[f]:A[f]._cache().getValue()}));});}function Pi(f,st,ae){if(f in b){N("@PersistState"),st._setState(Xt=>Mt(Xt,ae,_(f,b[f],Xt)));let xn=b.$cache?b.$cache[f]:false;A[f].setHasCache(xn,{restartTTL:true});}}rt.push(zt.subscribe(f=>{X[f]&&(S===false&&Ee({[f]:false}),X[f].unsubscribe(),delete X[f]);})),rt.push(Xe.subscribe(f=>{if(f==="router")return;let st=A[f];if(D){let ae=de[f];if(!ae)if(de.fns.some(Xt=>Xt(f)))ae=f;else return;Pi(f,st,ae),ot(f,ae);}else Pi(f,st,f),ot(f,f);})),qa.next(true);}),{destroy(){rt.forEach(C=>C.unsubscribe());for(let C=0,b=Object.keys(X);C<b.length;C++){let Ee=b[C];X[Ee].unsubscribe();}X={};},clear(){e.clear();},clearStore(C){if(H(C)){Qt(e.setItem(d,"{}")).subscribe();return}let b=e.getItem(d);Qt(b).subscribe(Ee=>{let ot=i(Ee||"{}");ot[C]&&(delete ot[C],Qt(e.setItem(d,a(ot))).subscribe());});}}}var ze=class{constructor(n,e){this.query=n,e&&e.resetFn&&xt().resettable;}getQuery(){return this.query}getStore(){return this.getQuery().__store__}isEntityBased(n){return Te(n)}selectSource(n,e){return this.isEntityBased(n)?this.getQuery().selectEntity(n).pipe(ln()):e?this.getQuery().select(t=>nt(t,this.withStoreName(e))):this.getQuery().select()}getSource(n,e){if(this.isEntityBased(n))return this.getQuery().getEntity(n);let t=this.getQuery().getValue();return e?nt(t,this.withStoreName(e)):t}withStoreName(n){return `${this.storeName}.${n}`}get storeName(){return this.getStore().storeName}updateStore(n,e,t,i=false){if(this.isEntityBased(e)){let a=this.getStore();i?a.replace(e,n):a.update(e,n);}else {if(t){this.getStore()._setState(o=>Mt(o,this.withStoreName(t),n,true));return}let a=i?n:o=>w$2(w$2({},o),n);this.getStore()._setState(a);}}onReset(n){let e=this.getStore().reset;this.getStore().reset=(...t)=>{setTimeout(()=>{e.apply(this.getStore(),t),n();});};}};var $a={pagesControls:false,range:false,startWith:1,cacheTimeout:void 0,clearStoreWithCache:true},_i=class extends ze{constructor(n,e={}){super(n,{resetFn:()=>{this.initial=false,this.destroy({clearCache:true,currentPage:1});}}),this.query=n,this.config=e,this.metadata=new Map,this.pages=new Map,this.pagination={currentPage:1,perPage:0,total:0,lastPage:0,data:[]},this.initial=true,this.isLoading$=this.query.selectLoading().pipe(Cl$1(0)),this.config=w$2(w$2({},$a),e);let{startWith:t,cacheTimeout:i}=this.config;this.page=new Sn(t),Lh(i)&&(this.clearCacheSubscription=i.subscribe(()=>this.clearCache()));}get pageChanges(){return this.page.asObservable()}get currentPage(){return this.pagination.currentPage}get isFirst(){return this.currentPage===1}get isLast(){return this.currentPage===this.pagination.lastPage}withControls(){return this.config.pagesControls=true,this}withRange(){return this.config.range=true,this}setLoading(n=true){this.getStore().setLoading(n);}update(n){this.pagination=n,this.addPage(n.data);}addPage(n){this.pages.set(this.currentPage,{ids:n.map(e=>e[this.getStore().idKey])}),this.getStore().upsertMany(n);}clearCache(n={}){this.initial||(ce("@Pagination - Clear Cache"),n.clearStore!==false&&(this.config.clearStoreWithCache||n.clearStore)&&this.getStore().remove(),this.pages=new Map,this.metadata=new Map),this.initial=false;}clearPage(n){this.pages.delete(n);}destroy({clearCache:n,currentPage:e}={}){this.clearCacheSubscription&&this.clearCacheSubscription.unsubscribe(),n&&this.clearCache(),we(e)||this.setPage(e),this.initial=true;}isPageActive(n){return this.currentPage===n}setPage(n){(n!==this.currentPage||!this.hasPage(n))&&this.page.next(this.pagination.currentPage=n);}nextPage(){this.currentPage!==this.pagination.lastPage&&this.setPage(this.pagination.currentPage+1);}prevPage(){this.pagination.currentPage>1&&this.setPage(this.pagination.currentPage-1);}setLastPage(){this.setPage(this.pagination.lastPage);}setFirstPage(){this.setPage(1);}hasPage(n){return this.pages.has(n)}getPage(n){let e=this.pagination.currentPage;return this.hasPage(e)?this.selectPage(e):(this.setLoading(true),Ce(n()).pipe(sl$1(t=>(e=t.currentPage,Yt(()=>{this.setLoading(false),this.update(t);}),this.selectPage(e)))))}getQuery(){return this.query}refreshCurrentPage(){H(this.currentPage)===false&&(this.clearPage(this.currentPage),this.setPage(this.currentPage));}getFrom(){return this.isFirst?1:(this.currentPage-1)*this.pagination.perPage+1}getTo(){return this.isLast?this.pagination.total:this.currentPage*this.pagination.perPage}selectPage(n){return this.query.selectAll({asObject:true}).pipe(yt$2(1),we$1(e=>{let t=x$1(w$2({},this.pagination),{data:this.pages.get(n).ids.map(o=>e[o])}),{range:i,pagesControls:a}=this.config;return isNaN(this.pagination.total)&&(t.lastPage===1?t.total=t.data?t.data.length:0:t.total=t.perPage*t.lastPage,this.pagination.total=t.total),i&&(t.from=this.getFrom(),t.to=this.getTo()),a&&(t.pageControls=Xa(this.pagination.total,this.pagination.perPage)),t}))}};Gw([qi("@Pagination - New Page"),zw("design:type",Function),zw("design:paramtypes",[Object]),zw("design:returntype",void 0)],_i.prototype,"update",null);function Xa(r,n){let e=Math.ceil(r/n),t=[];for(let i=0;i<e;i++)t.push(i+1);return t}var mn=(function(r){return r.Update="UPDATE",r})(mn||{});({[mn.Update]:"update"});var Pe=(function(r){return r.Update="UPDATE",r.AddEntities="ADD_ENTITIES",r.SetEntities="SET_ENTITIES",r.UpdateEntities="UPDATE_ENTITIES",r.RemoveEntities="REMOVE_ENTITIES",r.UpsertEntities="UPSERT_ENTITIES",r.UpsertManyEntities="UPSERT_MANY_ENTITIES",r})(Pe||{});({[Pe.Update]:"update",[Pe.AddEntities]:"add",[Pe.SetEntities]:"set",[Pe.UpdateEntities]:"update",[Pe.RemoveEntities]:"remove",[Pe.UpsertEntities]:"upsert",[Pe.UpsertManyEntities]:"upsertMany"});var no=["trigger"],ro=["panel"],ao=[[["mat-select-trigger"]],"*"],oo=["mat-select-trigger","*"];function so(r,n){if(r&1&&(fi$3(0,"span",4),tD(1),Nc$1()),r&2){let e=bE();cv(),Qp$1(e.placeholder);}}function lo(r,n){r&1&&NE(0);}function co(r,n){if(r&1&&(fi$3(0,"span",11),tD(1),Nc$1()),r&2){let e=bE(2);cv(),Qp$1(e.triggerValue);}}function uo(r,n){if(r&1&&(fi$3(0,"span",5),pE(1,lo,1,0)(2,co,2,1,"span",11),Nc$1()),r&2){let e=bE();cv(),hE(e.customTrigger?1:2);}}function mo(r,n){if(r&1){let e=TE();fi$3(0,"div",12,1),Rp$1("keydown",function(i){yu$1(e);let a=bE();return vu$1(a._handleKeydown(i))}),NE(2,1),Nc$1();}if(r&2){let e=bE();WE(e.panelClass),$p("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._parentFormField?.color==="primary")("mat-accent",e._parentFormField?.color==="accent")("mat-warn",e._parentFormField?.color==="warn")("mat-undefined",!e._parentFormField?.color),Cp("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby());}}var ho=new x("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let r=T$1(ae$1);return ()=>il(r)}}),po=new x("MAT_SELECT_CONFIG"),fo=new x("MatSelectTrigger"),hn=class{source;value;constructor(n,e){this.source=n,this.value=e;}},ba=(()=>{class r{_viewportRuler=T$1(fn);_changeDetectorRef=T$1(XL);_elementRef=T$1(vr$2);_dir=T$1(ze$2,{optional:true});_idGenerator=T$1(Re);_renderer=T$1(Gv$1);_parentFormField=T$1(lu,{optional:true});ngControl=T$1(Ue$2,{self:true,optional:true});_liveAnnouncer=T$1(Ad);_defaultOptions=T$1(po,{optional:true});_animationsDisabled=He$1();_popoverLocation;_initialized=new ee$1;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=yt(e,this.options,this.optionGroups),o=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=wt$1(o.offsetTop,o.offsetHeight,i.scrollTop,i.offsetHeight);}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0);}_getChangeEvent(e){return new hn(this,e)}_scrollStrategyFactory=T$1(ho);_panelOpen=false;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new ee$1;_errorStateTracker;stateChanges=new ee$1;disableAutomaticLabeling=true;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=false;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=false;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e);}_disableRipple=Pe$2(false);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next();}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(vr$1.required)??false}set required(e){this._required=e,this.stateChanges.next();}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e;}_multiple=false;disableOptionCentering=this._defaultOptions?.disableOptionCentering??false;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection();}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e);}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next();}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??false;optionSelectionChanges=Gh(()=>{let e=this.options;return e?e.changes.pipe(Sl$1(e),sl$1(()=>Qh(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(sl$1(()=>this.optionSelectionChanges))});openedChange=new Be$2;_openedStream=this.openedChange.pipe(Zt$1(e=>e),we$1(()=>{}));_closedStream=this.openedChange.pipe(Zt$1(e=>!e),we$1(()=>{}));selectionChange=new Be$2;valueChange=new Be$2;constructor(){let e=T$1(Gv),t=T$1(qc,{optional:true}),i=T$1(od,{optional:true}),a=T$1(new uh("tabindex"),{optional:true}),o=T$1(ro$2,{optional:true});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Za$1(e,this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=o?.usePopover===false?null:"inline",this.id=this.id;}ngOnInit(){this._selectionModel=new B$1(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(ig(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges());});}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(ig(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect());}),this.options.changes.pipe(Sl$1(null),ig(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection();});}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute("aria-labelledby",e):i.removeAttribute("aria-labelledby");}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState());}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass));}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete();}toggle(){this.panelOpen?this.close():this.open();}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=true,this._overlayDir.positionChange.pipe(yt$2(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled();}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(true)));}close(){this._panelOpen&&(this._panelOpen=false,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(false)));}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0;};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",a=>{a.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay());}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay();},200);e.classList.add("mat-select-panel-exit");}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck();}writeValue(e){this._assignValue(e);}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next();}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return "";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState();}_isRtl(){return this._dir?this._dir.value==="rtl":false}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e));}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,o=this._keyManager;if(!o.isTyping()&&a&&!hi(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;o.onKeydown(e);let d=this.selected;d&&l!==d&&this._liveAnnouncer.announce(d.viewValue,1e4);}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,o=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!o&&(i===13||i===32)&&t.activeItem&&!hi(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!o&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(d=>!d.disabled&&!d.selected);this.options.forEach(d=>{d.disabled||(l?d.select():d.deselect());});}else {let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction();}}_handleOverlayKeydown(e){e.keyCode===27&&!hi(e)&&(e.preventDefault(),this.close());}_onFocus(){this.disabled||(this._focused=true,this.stateChanges.next());}_onBlur(){this._focused=false,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next());}get empty(){return !this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next();});}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else {let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1);}this._changeDetectorRef.markForCheck();}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return  false;try{return (i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch(a){return  false}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,true):false}_skipPredicate=e=>this.panelOpen?false:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof no$2?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck();}_initKeyManager(){this._keyManager=new Vr$1(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close());}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction();});}_resetOptions(){let e=Qh(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(ig(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus());}),Qh(...this.options.map(t=>t._stateChanges)).pipe(ig(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next();});}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next();}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next();}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck();}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e);}else this._keyManager.setActiveItem(this._selectionModel.selected[0]);}_canOpen(){return !this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e);}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby");}onContainerClick(e){let t=J$2(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open());}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=BI({type:r,selectors:[["mat-select"]],contentQueries:function(t,i,a){if(t&1&&Pp(a,fo,5)(a,kt$2,5)(a,dt$1,5),t&2){let o;xE(o=AE())&&(i.customTrigger=o.first),xE(o=AE())&&(i.options=o),xE(o=AE())&&(i.optionGroups=o);}},viewQuery:function(t,i){if(t&1&&Lp(no,5)(ro,5)(Lu,5),t&2){let a;xE(a=AE())&&(i.trigger=a.first),xE(a=AE())&&(i.panel=a.first),xE(a=AE())&&(i._overlayDir=a.first);}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,i){t&1&&Rp$1("keydown",function(o){return i._handleKeydown(o)})("focus",function(){return i._onFocus()})("blur",function(){return i._onBlur()}),t&2&&(Cp("id",i.id)("tabindex",i.disabled?-1:i.tabIndex)("aria-controls",i.panelOpen?i.id+"-panel":null)("aria-expanded",i.panelOpen)("aria-label",i.ariaLabel||null)("aria-required",i.required.toString())("aria-disabled",i.disabled.toString())("aria-invalid",i.errorState)("aria-activedescendant",i._getAriaActiveDescendant()),$p("mat-mdc-select-disabled",i.disabled)("mat-mdc-select-invalid",i.errorState)("mat-mdc-select-required",i.required)("mat-mdc-select-empty",i.empty)("mat-mdc-select-multiple",i.multiple)("mat-select-open",i.panelOpen));},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",tF],disableRipple:[2,"disableRipple","disableRipple",tF],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:nF(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",tF],placeholder:"placeholder",required:[2,"required","required",tF],multiple:[2,"multiple","multiple",tF],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",tF],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",nF],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",tF]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[dD([{provide:au,useExisting:r},{provide:mt,useExisting:r}]),lm],ngContentSelectors:oo,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,i){if(t&1&&(ME(ao),fi$3(0,"div",2,0),Rp$1("click",function(){return i.open()}),fi$3(3,"div",3),pE(4,so,2,1,"span",4)(5,uo,3,1,"span",5),Nc$1(),fi$3(6,"div",6)(7,"div",7),xu$1(),fi$3(8,"svg",8),_p$1(9,"path",9),Nc$1()()()(),Ip(10,mo,3,16,"ng-template",10),Rp$1("detach",function(){return i.close()})("backdropClick",function(){return i.close()})("overlayKeydown",function(o){return i._handleOverlayKeydown(o)})),t&2){let a=kE(1);cv(3),Cp("id",i._valueId),cv(),hE(i.empty?4:5),cv(6),bp$1("cdkConnectedOverlayDisableClose",true)("cdkConnectedOverlayPanelClass",i._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",i._scrollStrategy)("cdkConnectedOverlayOrigin",i._preferredOverlayOrigin||a)("cdkConnectedOverlayPositions",i._positions)("cdkConnectedOverlayWidth",i._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",true)("cdkConnectedOverlayUsePopover",i._popoverLocation);}},dependencies:[no$2,Lu],styles:[`@keyframes _mat-select-enter {
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
`],encapsulation:2})}return r})();function go(){return {artPieces:[],lastArtPiecesUpdate:void 0,imageCache:[]}}var kt=class Mi extends je{constructor(){super(go());}static{this.\u0275fac=function(e){return new(e||Mi)};}static{this.\u0275prov=te$1({token:Mi,factory:Mi.\u0275fac,providedIn:"root"});}};kt=Gw([an({name:"session"})],kt);var ki=(()=>{class r extends it{constructor(){super(T$1(kt)),this.getArtPiecesObservable=this.select(({artPieces:e})=>[...e]);}get selectArtPieces(){return this.getValue().artPieces}get selectLastArtPiecesUpdate(){return this.getValue().lastArtPiecesUpdate}getThumbnailByTokenId(e){return this.getValue().imageCache.find(t=>t?.tokenId===e)}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275prov=te$1({token:r,factory:r.\u0275fac,providedIn:"root"});}}return r})();function _o(r,n){if(r&1&&(fi$3(0,"mat-chip",1)(1,"a",6),tD(2),Nc$1()()),r&2){let e=n.$implicit;cv(),bp$1("routerLink",e.url)("queryParams",e.queryParams),Cp("aria-label",e.queryParams),cv(),kc$1(" ",e.label," ");}}function yo(r,n){if(r&1&&(fi$3(0,"mat-option",5),tD(1),Nc$1()),r&2){let e=n.$implicit;bp$1("value",e),cv(),kc$1(" ",e," ");}}function bo(r,n){if(r&1){let e=TE();fi$3(0,"nav",0)(1,"mat-chip-listbox")(2,"mat-chip",1)(3,"span")(4,"a",2)(5,"mat-icon"),tD(6,"home"),Nc$1()()()(),mE(7,_o,3,4,"mat-chip",1,gE),fi$3(9,"mat-form-field",3)(10,"mat-label"),tD(11),gD(12,"translate"),Nc$1(),fi$3(13,"mat-select",4),Rp$1("ngModelChange",function(i){yu$1(e);let a=bE();return vu$1(a.handleYearChange(i))}),mE(14,yo,2,2,"mat-option",5,gE),Nc$1(),Jv(),Nc$1()()();}if(r&2){let e=bE();cv(7),yE(e.breadcrumbs()),cv(4),Qp$1(yD(12,2,"selectYear")),cv(2),bp$1("ngModel",e.newYear()),eI(),cv(),yE(e.validYears);}}var va=(()=>{class r{constructor(){this.artworkService=T$1(Rt),this.router=T$1(ut),this.activatedRoute=T$1(nt$2),this.translateService=T$1(br$1),this.sessionQuery=T$1(ki),this.selectedYears=[],this.newYear=Pe$2(null),this.breadcrumbs=Pe$2(this.buildBreadCrumb(this.activatedRoute.root));}ngOnInit(){this.router.events.pipe(Zt$1(e=>e instanceof q$1),bl()).subscribe(()=>{this.selectedYears=this.extractSelectedYears(),this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute.root));});}handleYearChange(e){this.validYears.includes(e)&&(this.newYear.set(e),this.selectedYears.includes(e)||(this.selectedYears.push(e),this.updateQueryParams())),this.newYear.set(null);}removeYearFilter(e){this.selectedYears=this.selectedYears.filter(t=>t!==Number(e)),this.updateQueryParams();}get validYears(){return [...this.artworkService.getAvailableYears()].filter(e=>!this.selectedYears.includes(e))}updateQueryParams(){let e={years:this.selectedYears.join(",")};this.router.navigate([],{queryParams:e});}extractSelectedYears(){let e=this.activatedRoute.snapshot.queryParamMap.get("years");return e?e.split(",").map(t=>Number(t)):[]}buildBreadCrumb(e,t="",i=[]){let a=e.routeConfig&&e.routeConfig.data?e.routeConfig.data.breadcrumb:"",o=e.routeConfig&&e.routeConfig.data?e.routeConfig.path:"",l=o?o.split("/").pop():"";if(l.startsWith(":")&&e.snapshot){let _=l.split(":")[1],v=e.snapshot.params[_];o=o.replace(l,v),_==="id"?a=this.extractNameFromId(v)||v:a=v;}let u=o?`${t}/${o}`:t,S={label:a?this.translateService.instant(a.toLowerCase()):"",url:u,queryParams:{years:[]}},w=a?[...i,S]:[...i];if(e.firstChild)return this.buildBreadCrumb(e.firstChild,u,w);{let _=e.snapshot.queryParamMap.get("years");_&&_.split(",").forEach(D=>{w.push({label:D,url:u,queryParams:{years:D}});});}return w}extractNameFromId(e){return this.artworkService.getNftById(e,this.sessionQuery.selectArtPieces)?.name||null}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=BI({type:r,selectors:[["app-breadcrumb"]],decls:1,vars:1,consts:[["aria-label","Breadcrumb",1,"container"],["color","primary"],["routerLink","/","routerLinkActive","router-link-active","aria-label","Home","matLine","",1,"link-as-text"],["appearance","fill",1,"small-input"],["aria-label","Select year",3,"ngModelChange","ngModel"],[3,"value"],["routerLinkActive","router-link-active","matLine","",1,"link-as-text",3,"routerLink","queryParams"]],template:function(t,i){t&1&&pE(0,bo,16,4,"nav",0),t&2&&hE(i.breadcrumbs().length?0:-1);},dependencies:[$o,qi$1,ei,wo$1,Mt$1,fu,ba,eg,Zp,ed,kt$2,$r,Rp],styles:[".small-input[_ngcontent-%COMP%]{width:27em;height:11em;font-size:.4em;margin-left:2em}.link-as-text[_ngcontent-%COMP%]{all:unset;display:inline;color:inherit;text-decoration:none;cursor:text}"]});}}return r})();function vo(r,n){if(r&1){let e=TE();fi$3(0,"button",1),Rp$1("click",function(){yu$1(e);let i=bE();return vu$1(i.handleClick())}),fi$3(1,"mat-icon"),tD(2,"share"),Nc$1()();}}var wa=(()=>{class r{constructor(){this.canShare=typeof navigator.share=="function";}handleClick(){if(this.canShare){let e={title:"Juanma Moreno S\xE1nchez",text:"Contemporary Art",url:window.location.href};navigator.share(e);}}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=BI({type:r,selectors:[["app-share-button"]],decls:1,vars:1,consts:[["aria-label","share","mat-mini-fab","","color","primary",1,"share-button"],["aria-label","share","mat-mini-fab","","color","primary",1,"share-button",3,"click"]],template:function(t,i){t&1&&pE(0,vo,3,0,"button",0),t&2&&hE(i.canShare?0:-1);},dependencies:[Hv,Mt$1],styles:[".share-button[_ngcontent-%COMP%]{position:fixed;bottom:20px;left:4px;z-index:9999}"]});}}return r})();var wo=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],xo=["mat-icon, [matMenuItemIcon]","*"];function Co(r,n){r&1&&(xu$1(),fi$3(0,"svg",2),_p$1(1,"polygon",3),Nc$1());}var So=["*"];function Mo(r,n){if(r&1){let e=TE();Sc$1(0,"div",0),kp("click",function(){yu$1(e);let i=bE();return vu$1(i.closed.emit("click"))})("animationstart",function(i){yu$1(e);let a=bE();return vu$1(a._onAnimationStart(i.animationName))})("animationend",function(i){yu$1(e);let a=bE();return vu$1(a._onAnimationDone(i.animationName))})("animationcancel",function(i){yu$1(e);let a=bE();return vu$1(a._onAnimationDone(i.animationName))}),Sc$1(1,"div",1),NE(2),xc$1()();}if(r&2){let e=bE();WE(e._classList),$p("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),xp("id",e.panelId),Cp("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null);}}var _n=new x("MAT_MENU_PANEL"),Gt=(()=>{class r{_elementRef=T$1(vr$2);_document=T$1(nr$2);_focusMonitor=T$1(Lr$1);_parentMenu=T$1(_n,{optional:true});_changeDetectorRef=T$1(XL);role="menuitem";disabled=false;disableRipple=false;_hovered=new ee$1;_focused=new ee$1;_highlighted=false;_triggersSubmenu=false;constructor(){T$1(he$1).load($a$2),this._parentMenu?.addItem?.(this);}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this);}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,false);}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete();}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}_handleMouseEnter(){this._hovered.next(this);}getLabel(){let e=this._elementRef.nativeElement.cloneNode(true),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck();}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck();}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=BI({type:r,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&Rp$1("click",function(o){return i._checkDisabled(o)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(Cp("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),$p("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu));},inputs:{role:"role",disabled:[2,"disabled","disabled",tF],disableRipple:[2,"disableRipple","disableRipple",tF]},exportAs:["matMenuItem"],ngContentSelectors:xo,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(ME(wo),NE(0),fi$3(1,"span",0),NE(2,1),Nc$1(),_p$1(3,"div",1),pE(4,Co,2,0,":svg:svg",2)),t&2&&(cv(3),bp$1("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),cv(),hE(i._triggersSubmenu?4:-1));},dependencies:[pv],encapsulation:2})}return r})();var ko=new x("MatMenuContent");var Eo=new x("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:false,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),gn="_mat-menu-enter",Ei="_mat-menu-exit",At=(()=>{class r{_elementRef=T$1(vr$2);_changeDetectorRef=T$1(XL);_injector=T$1(ae$1);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=He$1();_allItems;_directDescendantItems=new Ko$2;_classList={};_panelAnimationState="void";_animationDone=new ee$1;_isAnimating=Pe$2(false);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses();}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses();}templateRef;items;lazyContent;overlapTrigger=false;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,i=w$2({},this._classList);t&&t.length&&t.split(" ").forEach(a=>{i[a]=false;}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(a=>{i[a]=true;}),this._elementRef.nativeElement.className=""),this._classList=i;}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e;}closed=new Be$2;close=this.closed;panelId=T$1(Re).getId("mat-menu-panel-");constructor(){let e=T$1(Eo);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop;}ngOnInit(){this.setPositionClasses();}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Br$1(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Sl$1(this._directDescendantItems),sl$1(e=>Qh(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),a=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[a]&&!i[a].disabled?t.setActiveItem(a):t.setNextItemActive();}});}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout);}_hovered(){return this._directDescendantItems.changes.pipe(Sl$1(this._directDescendantItems),sl$1(t=>Qh(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:hi(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=jy(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus();}},{injector:this._injector});}resetActiveItem(){this._keyManager.setActiveItem(-1);}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=x$1(w$2({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck();}_onAnimationDone(e){let t=e===Ei;(t||e===gn)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(false));}_onAnimationStart(e){(e===gn||e===Ei)&&this._isAnimating.set(true);}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0);}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Ei),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?gn:Ei);}),this._changeDetectorRef.markForCheck();}_updateDirectDescendants(){this._allItems.changes.pipe(Sl$1(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges();});}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=BI({type:r,selectors:[["mat-menu"]],contentQueries:function(t,i,a){if(t&1&&Pp(a,ko,5)(a,Gt,5)(a,Gt,4),t&2){let o;xE(o=AE())&&(i.lazyContent=o.first),xE(o=AE())&&(i._allItems=o),xE(o=AE())&&(i.items=o);}},viewQuery:function(t,i){if(t&1&&Lp(fr$2,5),t&2){let a;xE(a=AE())&&(i.templateRef=a.first);}},hostVars:3,hostBindings:function(t,i){t&2&&Cp("aria-label",null)("aria-labelledby",null)("aria-describedby",null);},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",tF],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:tF(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[dD([{provide:_n,useExisting:r}])],ngContentSelectors:So,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(ME(),Ep(0,Mo,3,12,"ng-template"));},styles:[`mat-menu {
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
`],encapsulation:2})}return r})(),Ao=new x("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let r=T$1(ae$1);return ()=>il(r)}});var Et=new WeakMap,Io=(()=>{class r{_canHaveBackdrop;_element=T$1(vr$2);_viewContainerRef=T$1(bi$2);_menuItemInstance=T$1(Gt,{optional:true,self:true});_dir=T$1(ze$2,{optional:true});_focusMonitor=T$1(Lr$1);_ngZone=T$1(Ne$1);_injector=T$1(ae$1);_scrollStrategy=T$1(Ao);_changeDetectorRef=T$1(XL);_animationsDisabled=He$1();_portal;_overlayRef=null;_menuOpen=false;_closingActionsSubscription=G.EMPTY;_menuCloseSubscription=G.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t);})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()));}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=T$1(_n,{optional:true});this._parentMaterialMenu=t instanceof At?t:void 0;}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Et.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null);}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return !!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit();}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let i=Et.get(t);Et.set(t,this),i&&i!==this&&i._closeMenu();let a=this._createOverlay(t),o=a.getConfig(),l=o.positionStrategy;this._setPosition(t,l),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??false,a.hasAttached()||(a.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(true),t instanceof At&&(t._setIsOpen(true),t._directDescendantItems.changes.pipe(ig(t.close)).subscribe(()=>{l.withLockedPosition(false).reapplyLastPosition(),l.withLockedPosition(true);}));}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t);}_destroyMenu(e){let t=this._overlayRef,i=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),i instanceof At&&this._ownsMenu(i)?(this._pendingRemoval=i._animationDone.pipe(yt$2(1)).subscribe(()=>{t.detach(),Et.has(i)||i.lazyContent?.detach();}),i._setIsOpen(false)):(t.detach(),i?.lazyContent?.detach()),i&&this._ownsMenu(i)&&Et.delete(i),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(false));}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck());}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=dl(this._injector,t),this._overlayRef.keydownEvents().subscribe(i=>{this._menu instanceof At&&this._menu._handleKeydown(i);});}return this._overlayRef}_getOverlayConfig(e){return new pn({positionStrategy:cl(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{this._ngZone.run(()=>{let a=i.connectionPair.overlayX==="start"?"after":"before",o=i.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(a,o);});});}_setPosition(e,t){let[i,a]=e.xPosition==="before"?["end","start"]:["start","end"],[o,l]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[d,u]=[o,l],[S,w]=[i,a],_=0;if(this._triggersSubmenu()){if(w=i=e.xPosition==="before"?"start":"end",a=S=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let v=this._parentMaterialMenu.items.first;this._parentInnerPadding=v?v._getHostElement().offsetTop:0;}_=o==="bottom"?this._parentInnerPadding:-this._parentInnerPadding;}}else e.overlapTrigger||(d=o==="top"?"bottom":"top",u=l==="top"?"bottom":"top");t.withPositions([{originX:i,originY:d,overlayX:S,overlayY:o,offsetY:_},{originX:a,originY:d,overlayX:w,overlayY:o,offsetY:_},{originX:i,originY:u,overlayX:S,overlayY:l,offsetY:-_},{originX:a,originY:u,overlayX:w,overlayY:l,offsetY:-_}]);}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:Oh(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Zt$1(o=>this._menuOpen&&o!==this._menuItemInstance)):Oh();return Qh(e,i,a,t)}_getPortal(e){return (!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new mn$1(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Et.get(e)===this}_triggerIsAriaDisabled(){return tF(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){sI();};static \u0275dir=GI({type:r})}return r})(),xa=(()=>{class r extends Io{_cleanupTouchstart;_hoverSubscription=G.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e;}get menu(){return this._menu}set menu(e){this._menu=e;}menuData;restoreFocus=true;menuOpened=new Be$2;onMenuOpen=this.menuOpened;menuClosed=new Be$2;onMenuClose=this.menuClosed;constructor(){super(true);let e=T$1(Gv$1);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{an$1(t)||(this._openedBy="touch");},{passive:true});}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(true);}closeMenu(){this._closeMenu();}updatePosition(){this._overlayRef?.updatePosition();}ngAfterContentInit(){this._handleHover();}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe();}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){sn$1(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault());}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu());}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu();}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(false));}));}static \u0275fac=function(t){return new(t||r)};static \u0275dir=GI({type:r,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&Rp$1("click",function(o){return i._handleClick(o)})("mousedown",function(o){return i._handleMousedown(o)})("keydown",function(o){return i._handleKeydown(o)}),t&2&&Cp("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu?.panelId:null);},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[yp]})}return r})();var Ca=["*"],To=["content"],Do=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],Po=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function Oo(r,n){if(r&1){let e=TE();fi$3(0,"div",1),Rp$1("click",function(){yu$1(e);let i=bE();return vu$1(i._onBackdropClicked())}),Nc$1();}if(r&2){let e=bE();$p("mat-drawer-shown",e._isShowingBackdrop());}}function Fo(r,n){r&1&&(fi$3(0,"mat-drawer-content"),NE(1,2),Nc$1());}var Ro=new x("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>false}),Sa=new x("MAT_DRAWER_CONTAINER"),$t=(()=>{class r extends Fu{_platform=T$1(O);_changeDetectorRef=T$1(XL);_element=T$1(vr$2);_ngZone=T$1(Ne$1);_isInert=false;_container=T$1(bn);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck());}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(Cl$1(50),yt$2(1)).subscribe(()=>this._updateInert());}):this._updateInert();}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let t=this._element.nativeElement;this._isInert=e,e?t.setAttribute("inert","true"):t.removeAttribute("inert");}}_shouldBeHidden(){if(this._platform.isBrowser)return  false;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=(()=>{let e;return function(i){return (e||(e=Nm(r)))(i||r)}})();static \u0275cmp=BI({type:r,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,i){t&2&&(Bp("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),$p("mat-drawer-content-hidden",i._shouldBeHidden()));},features:[dD([{provide:Fu,useExisting:r}]),yp],ngContentSelectors:Ca,decls:1,vars:0,template:function(t,i){t&1&&(ME(),NE(0));},encapsulation:2})}return r})(),yn=(()=>{class r{_elementRef=T$1(vr$2);_focusTrapFactory=T$1(xd);_focusMonitor=T$1(Lr$1);_platform=T$1(O);_ngZone=T$1(Ne$1);_renderer=T$1(Gv$1);_interactivityChecker=T$1(ha$2);_doc=T$1(nr$2);_container=T$1(Sa,{optional:true});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=false;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit());}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next();}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=wa$2(e);}_disableClose=false;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=wa$2(e)),this._autoFocus=e;}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(wa$2(e));}_opened=Pe$2(false);_openedVia=null;_animationStarted=new ee$1;_animationEnd=new ee$1;openedChange=new Be$2(true);_openedStream=this.openedChange.pipe(Zt$1(e=>e),we$1(()=>{}));openedStart=this._animationStarted.pipe(Zt$1(()=>this.opened),Hi$2(void 0));_closedStream=this.openedChange.pipe(Zt$1(e=>!e),we$1(()=>{}));closedStart=this._animationStarted.pipe(Zt$1(()=>!this.opened),Hi$2(void 0));_destroyed=new ee$1;onPositionChanged=new Be$2;_content;_modeChanged=new ee$1;_injector=T$1(ae$1);_changeDetectorRef=T$1(XL);constructor(){this.openedChange.pipe(ig(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program");}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return [e.listen(t,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!hi(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault();});}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened);});}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&(this._interactivityChecker.isFocusable(i)||(i.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let a=()=>{o(),l(),i.removeAttribute("tabindex");},o=this._renderer.listen(i,"blur",a),l=this._renderer.listen(i,"mousedown",a);})),i.focus(t));}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case  false:case "dialog":return;case  true:case "first-tabbable":jy(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus();},{injector:this._injector});break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null);}_isFocusWithinDrawer(){let e=this._doc.activeElement;return !!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=true,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState());}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete();}open(e){return this.toggle(true,e)}close(){return this.toggle(false)}_closeViaBackdropClick(){return this._setOpen(false,true,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,t,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),(this._container?._content||this._container?._userContent)?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(true),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next();}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(a=>{this.openedChange.pipe(yt$2(1)).subscribe(o=>a(o?"open":"close"));}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e);}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop());}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,i=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,t)),i.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor);}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(false),this._animationEnd.next(e);});};static \u0275fac=function(t){return new(t||r)};static \u0275cmp=BI({type:r,selectors:[["mat-drawer"]],viewQuery:function(t,i){if(t&1&&Lp(To,5),t&2){let a;xE(a=AE())&&(i._content=a.first);}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,i){t&2&&(Cp("align",null)("tabIndex",i.mode!=="side"?"-1":null),Bp("visibility",!i._container&&!i.opened?"hidden":null),$p("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"));},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Ca,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,i){t&1&&(ME(),fi$3(0,"div",1,0),NE(2),Nc$1());},dependencies:[Fu],encapsulation:2})}return r})(),bn=(()=>{class r{_dir=T$1(ze$2,{optional:true});_element=T$1(vr$2);_ngZone=T$1(Ne$1);_changeDetectorRef=T$1(XL);_animationDisabled=He$1();_transitionsEnabled=false;_allDrawers;_drawers=new Ko$2;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=wa$2(e);}_autosize=T$1(Ro);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:wa$2(e);}_backdropOverride=null;backdropClick=new Be$2;_start=null;_end=null;_left=null;_right=null;_destroyed=new ee$1;_doCheckSubject=new ee$1;_contentMargins={left:null,right:null};_contentMarginChanges=new ee$1;get scrollable(){return this._userContent||this._content}_injector=T$1(ae$1);constructor(){let e=T$1(O),t=T$1(fn);this._dir?.change.pipe(ig(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins();}),t.change().pipe(ig(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=true;},200);});}ngAfterContentInit(){this._allDrawers.changes.pipe(Sl$1(this._allDrawers),ig(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges();}),this._drawers.changes.pipe(Sl$1(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e);}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Kh(10),ig(this._destroyed)).subscribe(()=>this.updateContentMargins());});}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete();}open(){this._drawers.forEach(e=>e.open());}close(){this._drawers.forEach(e=>e.close());}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,t-=i;}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();t+=i,e-=i;}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)));}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next());}_watchDrawerToggle(e){e._animationStarted.pipe(ig(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),e.mode!=="side"&&e.openedChange.pipe(ig(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened));}_watchDrawerPosition(e){e.onPositionChanged.pipe(ig(this._drawers.changes)).subscribe(()=>{jy({read:()=>this._validateDrawers()},{injector:this._injector});});}_watchDrawerMode(e){e._modeChanged.pipe(ig(Qh(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();});}_setContainerClass(e){let t=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?t.add(i):t.remove(i);}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e);}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end);}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop();}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick());}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=BI({type:r,selectors:[["mat-drawer-container"]],contentQueries:function(t,i,a){if(t&1&&Pp(a,$t,5)(a,yn,5),t&2){let o;xE(o=AE())&&(i._content=o.first),xE(o=AE())&&(i._allDrawers=o);}},viewQuery:function(t,i){if(t&1&&Lp($t,5),t&2){let a;xE(a=AE())&&(i._userContent=a.first);}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,i){t&2&&$p("mat-drawer-container-explicit-backdrop",i._backdropOverride);},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[dD([{provide:Sa,useExisting:r}])],ngContentSelectors:Po,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,i){t&1&&(ME(Do),pE(0,Oo,1,2,"div",0),NE(1),NE(2,1),pE(3,Fo,2,0,"mat-drawer-content")),t&2&&(hE(i.hasBackdrop?0:-1),cv(3),hE(i._content?-1:3));},dependencies:[$t],styles:[`.mat-drawer-container {
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
`],encapsulation:2})}return r})();var Bo=["*",[["mat-toolbar-row"]]],No=["*","mat-toolbar-row"],vn=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275dir=GI({type:r,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return r})(),Ma=(()=>{class r{_elementRef=T$1(vr$2);_platform=T$1(O);_document=T$1(nr$2);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()));}_checkToolbarMixedModes(){this._toolbarRows.length;}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=BI({type:r,selectors:[["mat-toolbar"]],contentQueries:function(t,i,a){if(t&1&&Pp(a,vn,5),t&2){let o;xE(o=AE())&&(i._toolbarRows=o);}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,i){t&2&&(WE(i.color?"mat-"+i.color:""),$p("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0));},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:No,decls:2,vars:0,template:function(t,i){t&1&&(ME(Bo),NE(0),NE(1,1));},styles:[`.mat-toolbar {
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
`],encapsulation:2})}return r})();var re=(function(r){return r.SPANISH="es-ES",r.ENGLISH="en-EN",r})(re||{});function ka(){let r=window.navigator.language||window.navigator.languages?.[0]||re.ENGLISH;return Object.values(re).includes(r)?r:re.ENGLISH}var Lo=()=>["/"],Vo=()=>["/about"],Uo=()=>["/cv"],jo=()=>["/contact"],zo=()=>["/artworks"],Ho=r=>({years:r});function qo(r,n){r&1&&Sp(0);}function Yo(r,n){if(r&1){let e=TE();fi$3(0,"button",14),Rp$1("click",function(){yu$1(e),bE();let i=kE(2);return vu$1(i.toggle())}),fi$3(1,"mat-icon"),tD(2,"menu"),Nc$1()();}}function Ko(r,n){r&1&&Sp(0);}function Qo(r,n){if(r&1&&Ip(0,Ko,1,0,"ng-container",5),r&2){bE();let e=kE(15);bp$1("ngTemplateOutlet",e);}}function Wo(r,n){if(r&1){let e=TE();fi$3(0,"button",15),tD(1),gD(2,"translate"),Nc$1(),fi$3(3,"button",16),gD(4,"translate"),tD(5),gD(6,"translate"),Nc$1(),fi$3(7,"button",17),tD(8,"CV"),Nc$1(),fi$3(9,"button",16),gD(10,"translate"),tD(11),gD(12,"translate"),Nc$1(),fi$3(13,"button",18),Rp$1("click",function(){yu$1(e);let i=bE();return vu$1(i.changeLanguage())}),tD(14),Nc$1();}if(r&2){let e=bE(),t=kE(17);bp$1("matMenuTriggerFor",t),cv(),kc$1(" ",yD(2,10,"paintings")," "),cv(2),bp$1("routerLink",fD(20,Vo)),Cp("aria-label",yD(4,12,"menu.about")),cv(2),kc$1(" ",yD(6,14,"menu.about")," "),cv(2),bp$1("routerLink",fD(21,Uo)),cv(2),bp$1("routerLink",fD(22,jo)),Cp("aria-label",yD(10,16,"menu.contact")),cv(2),kc$1(" ",yD(12,18,"menu.contact")," "),cv(3),kc$1(" ",e.currentLangLabel," ");}}function Go(r,n){if(r&1&&(fi$3(0,"button",13),tD(1),Nc$1()),r&2){let e=n.$implicit;bp$1("routerLink",fD(4,zo))("queryParams",pD(5,Ho,e)),Cp("aria-label",e),cv(),kc$1(" ",e," ");}}var Ea=(()=>{class r{constructor(){this.artworkService=T$1(Rt),this.responsiveService=T$1(h),this.translateService=T$1(br$1),this.mobileMenu=_p(this.responsiveService.displayMobileLayout);}get years(){return this.artworkService.getAvailableYears()}get currentLang(){return this.translateService.getCurrentLang()||this.translateService.getFallbackLang()||re.ENGLISH}get currentLangLabel(){return this.currentLang.slice(0,2).toUpperCase()}changeLanguage(){let e=this.currentLang===re.ENGLISH?re.SPANISH:re.ENGLISH;this.translateService.use(e);}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=BI({type:r,selectors:[["app-top-menu"]],decls:30,vars:17,consts:[["drawer",""],["menuButtons",""],["paintingMenu","matMenu"],["yearsMenu","matMenu"],["mode","over","position","end",1,"drawer"],[4,"ngTemplateOutlet"],["color","primary"],["aria-label","Juanma Moreno S\xE1nchez","mat-button","",3,"routerLink"],[1,"catalog-heading","brand"],[1,"spacer"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu"],["mat-menu-item","","routerLink","/artworks"],["mat-menu-item","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"routerLink","queryParams"],["aria-expanded","false","aria-controls","menu","mat-icon-button","","aria-label","Toggle menu",3,"click"],["x","","mat-button","",3,"matMenuTriggerFor"],["mat-button","",3,"routerLink"],["aria-label","CV","mat-button","",3,"routerLink"],["aria-label","Language switcher","mat-button","",3,"click"]],template:function(t,i){if(t&1&&(fi$3(0,"mat-drawer-container")(1,"mat-drawer",4,0)(3,"div"),Ip(4,qo,1,0,"ng-container",5),Nc$1()(),fi$3(5,"mat-drawer-content")(6,"mat-toolbar",6)(7,"mat-toolbar-row")(8,"button",7)(9,"h1",8),tD(10,"Juanma Moreno S\xE1nchez"),Nc$1()(),_p$1(11,"span",9),pE(12,Yo,3,0,"button",10)(13,Qo,1,1,"ng-container"),Nc$1()()()(),Ip(14,Wo,15,23,"ng-template",null,1,ID),fi$3(16,"mat-menu",null,2)(18,"button",11),gD(19,"translate"),tD(20),gD(21,"translate"),Nc$1(),fi$3(22,"button",12),gD(23,"translate"),tD(24),gD(25,"translate"),Nc$1()(),fi$3(26,"mat-menu",null,3),mE(28,Go,2,7,"button",13,gE),Nc$1()),t&2){let a=kE(15),o=kE(27);cv(4),bp$1("ngTemplateOutlet",a),cv(4),bp$1("routerLink",fD(16,Lo)),cv(4),hE(i.mobileMenu()?13:12),cv(6),Cp("aria-label",yD(19,8,"menu.allPaintings")),cv(2),kc$1(" ",yD(21,10,"menu.allPaintings")," "),cv(2),bp$1("matMenuTriggerFor",o),Cp("aria-label",yD(23,12,"menu.byYear")),cv(2),kc$1(" ",yD(25,14,"menu.byYear")," "),cv(4),yE(i.years);}},dependencies:[Ma,vn,zv,ei,wu,Mt$1,Ki$1,bn,$t,yn,xa,At,Gt,Rp],styles:[".spacer[_ngcontent-%COMP%]{flex:1 1 auto}.brand[_ngcontent-%COMP%]{color:inherit;font-size:1.1rem;font-weight:400;margin:0}"]});}}return r})();var Aa={"Oil on wood":"Oil on wood","Oil on canvas":"Oil on canvas","Watercolor on paper":"Watercolor on paper",sold:"Art piece sold",moreOn:"More on",selectYear:"Select a year",paintings:"Paintings",submit:"Submit",close:"Close",cancel:"Cancel",back:"Back",menu:{allPaintings:"All paintings",generative:"Generative",about:"About",contact:"Contact",byYear:"By Year"},traits:{medium:"Medium",keight:"Height",width:"Width",unit:"Unit",year:"Year",imgTypr:"Image Type",artist:"Artist",project:"Project",descAuthor:"Description Author",descLang:"Description language"},viewTypes:{frontal:"Frontal view",progreso:"Work in progress",detail:"Detail view"},sortBy:"Sort by ",sortMethod:{year:"Year",size:"Size",medium:"Medium"},contact:{title:"Contact",representedBy:"Currently represented by <a href='https://galeriazunino.com/' target='_blank'>Zunino Gallery</a> (Sevilla)",contactText:"If you want to contact me, use the form bellow and I will get back to you soon. You can also follow me on <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a> to stay on the loop.",name:"Name",message:"Message"},error:{noValue:"You must enter a value",invalidEmail:"Not a valid email"},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n, Spain), 1986. Based in Madrid (Spain)",shows:{title:"Solo shows"},collectiveShows:{title:"Collective exhibitions (selection)"},awards:{title:"Artistic awards and residencies (selection)",lefranc:"Lefranc&Bourgueois art award",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Antonio Gala Foundation Residence Program</a>"},conferences:{title:"Conferences",unia:"<a href='https://www.unia.es/' target='blank'>International University of Andalucia</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>Towards a New AI Winter</a>"},education:{title:"Education",degree:"Bachelor on arts degree",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>University of Granada",erasmus:"LLP Erasmus Scholarship",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Zunino gallery</a>",countries:{online:"Online",spain:"Spain",usa:"USA",germany:"Germany",mexico:"Mexico",italy:"Italy"}},statement:{title:"Statement",introduction:{content:"My artistic work is profoundly analog, even though its creation usually originates in the digital. This is the great contradiction of <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'><em>the millennial generation, to which I belong</em></a>. We are the last generation to have been educated using pen and paper that has had to navigate life in a digital environment. It is the intersection between two worlds, a collision I do not try to hide. In fact, I split my labor between the artistic production I need to be happy and the software development I need in order to eat."},painting:{title:"Painting",distance:"In painting is where, throughout my entire life, I have found refuge. Painting is important. Painting is useful. Painting is home.",outOfNoise:"This distance involves spending time outside the automatism of routine, a necessary condition to be able to observe, analyze, and finally build.",anacronism:"Painting is an ancient craft that allows working on a surface as much or as little as the artist wishes, with the only limits being space and time. <strong>Painting is a precious anachronism.</strong> Simultaneously, painting is always relevant because it is an infinite field of knowledge. Each artist, over the years, gradually discovers small findings that together end up forming something unique and unrepeatable."},art:{title:"Art",arts:"My refuge in painting, sculpture, generative art, or digital art has yielded different fruits over time. There are fruits that have never been documented, and there are also those that have not even been seen by anyone other than myself. In any case, there are peculiarities in my art that are constant and cut across production, and there are others that are variable; obsessions that come and go over time:"},constants:{title:"Constants",items:{first:{title:"Internet",content:"Representing technology artistically in painting and making technology by hand are ways of trying to reconcile our physical self and our avatar. Most of the images I use in my creative process originate from the Internet, specifically from chance encounters with random images. Even before the emergence of AIs, the Internet was already a virtually infinite visual world."},second:{title:"Disturbing Element",content:"In a hypothetical painting, a character looks at or interacts with something. But we don't know who they are, what they are doing, or why they are doing it. Even if it's something indeterminate, the action introduces narrative and invites spending time contemplating the image. The idea is for the image to propose an open premise, something beyond the pose, and for the viewer to complete it. The disturbing as a starting point."},third:{title:"Tradition",content:"Cultural heritage is the DNA of any cultural identity. Great authors and the great themes of art history have had, have, and will have a tremendously gravitational effect. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., have created great masterpieces in which the great themes of the history of art have been developed yesterday and today. Themes that are inherently human and are transversal and universal: love, death, fear,..'"},fourth:{title:"Failure as one of the Fine Arts",content:"'I have done many things because I have failed at all of them. I start from failure as one of the Fine Arts.' This quote from the multifaceted Pep\xEDn Tre perfectly illustrates the reason for multidisciplinarity. Genius, divine enlightenment, or inspiration are nothing but mythological clich\xE9s. Reality, as always, is much more prosaic: it is failure (real or perceived) that moves an artist to investigate, try new techniques, new ways of reaching the public, etc. On the contrary, I am convinced that success (real or perceived) has a paralyzing capacity and ends up producing artists bored with their own art and therefore with themselves. Failure frustrates, but it also stimulates, or so I want to believe."}}},variables:{title:"Variables",items:{first:{title:"Artificial Intelligence",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>In 2019, a minimal advance guard of creators, like Juanma Moreno, already experimented with the old Artificial Intelligence of that time</em></a>, as Javier Villuendas says in his column in ABC Cultural. In 2019, few of us intuited the creative potential of the AI of the time. Old neural networks like StyleGan or Bigbigan stimulated our imagination by creating very interesting monsters. Nowadays, AI-generated art is commonplace and has reached new levels of formal sufficiency. But at that time, the margin of error (loss) was much wider, and accidents produced unheard-of and highly interesting monsters. From 2019 to 2023, the primary source of inspiration for my work shifted from images found on the internet to images that Artificial Intelligences are capable of generating."},second:{title:"Software",content:"Software doesn't have to be an ultra-rational and efficient solution to an engineering problem. Software can also satisfy an artist's curiosity, be flexible, organic, random, disorganized, and unpredictable. Once again, we must value error. It is in the brushstroke that goes slightly beyond the contour, the accident that causes software to distort an image until it aberrates, where the value and originality lie."}}}},download:{cv:"Generate and download CV",statement:"Generate and download Statement",sheet:"Generate and download technical sheet",portfolio:"Generate and download portfolio",hd:"Download high resolution image",success:"Download ready",error:"Could not generate the file"},links:{view:"View where this artwork appears on the Internet",title:"Appearances of the artwork on the Internet"}};var Ia={"Oil on wood":"\xD3leo sobre madera","Oil on canvas":"\xD3leo sobre tela","Watercolor on paper":"Acuarela sobre papel",sold:"Pieza vendida",moreOn:"M\xE1s de",selectYear:"Selecciona un a\xF1o",paintings:"Pinturas",submit:"Enviar",close:"Cerrar",cancel:"Cancelar",back:"Volver",menu:{allPaintings:"Todas las pinturas",generative:"Generativo",about:"Acerca de",contact:"Contacto",byYear:"Por a\xF1o"},traits:{medium:"T\xE9cnica",keight:"Altura",width:"Ancho",unit:"Unidad",year:"A\xF1o",imgTypr:"Tipo de imagen",artist:"Artista",project:"Proyecto",descAuthor:"Autor de la descripci\xF3n",descLang:"Lenguage de la descripci\xF3n"},viewTypes:{frontal:"Vista frontal",progreso:"En progreso",detail:"Vista de detalle"},sortBy:"Ordenar por ",sortMethod:{year:"A\xF1o",size:"Tama\xF1o",medium:"T\xE9cnica"},contact:{title:"Contacto",representedBy:"Representado por la <a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino </a> (Sevilla)",contactText:"Si quieres contactar conmigo, usa el formulario debajo. Tambi\xE9n puedes seguirme en <a href='https://www.instagram.com/juanmamorenosanchez/' target='_blank'>Instagram</a>.",name:"Nombre",message:"Mensaje"},error:{noValue:"Debes escribir algo",invalidEmail:"Email inv\xE1lido"},cv:{shortBio:"Alcal\xE1 la Real (Ja\xE9n), 1986. Reside en Madrid.",shows:{title:"Exposiciones individuales"},collectiveShows:{title:"Exposiciones colectivas (selecci\xF3n)"},conferences:{title:"Conferencias",unia:"<a href='https://www.unia.es/' target='blank'>Universidad Internacional de Andaluc\xEDa</a>","invierno-ia":"<a href='https://www.unia.es/estudios-y-acceso/oferta-academica/cursos-de-verano/fundamentos-de-inteligencia-artificial-modelos-generativos-y-aplicaciones-avanzadas' target='blank'>\xBFHacia un nuevo invierno de la IA?</a>"},awards:{title:"Premios y becas (selecci\xF3n)",lefranc:"Becas Lefranc&Bourgueois",fag:"<a href='http://www.fundacionantoniogala.org/' target='blank'>Fundaci\xF3n Antonio Gala para j\xF3venes creadores</a>"},education:{title:"Educacion",degree:"Licenciado en Bellas Artes",ugr:"<a href='http://bellasartes.ugr.es/' target='blank'>Universidad de Granada",erasmus:"Beca LLP Erasmus",burg:"<a href='http://www.burg-halle.de/' target='blank'>Burg Giebichenstein, Hochschule f\xFCr Kunst und Design</a>"},zunino:"<a href='https://galeriazunino.com/' target='_blank'>Galer\xEDa Zunino</a>",countries:{online:"Online",spain:"Espa\xF1a",usa:"USA",germany:"Alemania",mexico:"M\xE9xico",italy:"Italia"}},statement:{title:"Statement",introduction:{content:"Mi obra art\xEDstica es profundamente anal\xF3gica, si bien la creaci\xF3n suele tener su origen en lo digital. Esta es la gran contradicci\xF3n de <a href='https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/' target='_blank' rel='noopener noreferrer'><em>la generaci\xF3n milenial, a la que pertenezco</a>. Somos la \xFAltima generaci\xF3n que se ha formado usando papel y l\xE1piz que ha tenido que buscarse la vida en un ambiente digital. Es la intersecci\xF3n entre dos mundos, una colisi\xF3n que no intento disimular. De hecho, divido mi fuerza de trabajo entre la producci\xF3n art\xEDstica que necesito para ser feliz y la programaci\xF3n de software que necesito para poder comer."},painting:{title:"Pintura",distance:"En la pintura es donde, a lo largo de toda mi vida, he encontrado refugio. La pintura es importante. La pintura es \xFAtil. La pintura es casa.",outOfNoise:"Esta distancia implica pasar tiempo fuera del automatismo de la rutina, una condici\xF3n necesaria para poder observar, analizar y finalmente construir.",anacronism:"La pintura es un oficio ancestral que permite trabajar en una superficie tanto o tan poco como el artista quiera, teniendo como \xFAnicos l\xEDmites el espacio y el tiempo. <strong>La pintura es un anacronismo precioso.</strong> Al mismo tiempo, la pintura es siempre relevante porque es un campo infinito de conocimiento. Cada artista, a lo largo de los a\xF1os, va descubriendo peque\xF1os hallazgos, que en su conjunto acaban por formar algo \xFAnico e irrepetible."},art:{title:"Arte",arts:"Mi refugio en la pintura, la escultura, el arte generativo o el arte digital ha dado frutos diferentes a lo largo del tiempo. Hay frutos que nunca han sido documentados, y tambi\xE9n los hay que ni siquiera han sido vistos por otra persona m\xE1s que yo mismo. En cualquier caso, hay peculiaridades en mi arte que son constantes y atraviesan la producci\xF3n, y hay otras que son variables; obsesiones que van y vienen con el tiempo:"},constants:{title:"Constantes",items:{first:{title:"Internet",content:"Representar a la tecnolog\xEDa en la pintura y crear tecnolog\xEDa artesanalmente son formas de intentar reconciliar nuestro yo f\xEDsico y nuestro avatar.La mayor\xEDa de las im\xE1genes que uso en mi proceso creativo provienen de Internet, espec\xEDficamente de encuentros fortuitos con im\xE1genes aleatorias. Incluso antes de la aparici\xF3n de las IA, Internet ya era un mundo visual virtualmente infinito."},second:{title:"Elemento inquietante",content:"En una pintura hipot\xE9tica, un personaje mira o interact\xFAa con algo. Pero no sabemos qui\xE9n es, qu\xE9 est\xE1 haciendo o por qu\xE9 lo est\xE1 haciendo. Incluso si es algo indeterminado, la acci\xF3n introduce una narrativa e invita a pasar tiempo contemplando la imagen. La idea es que la imagen proponga una premisa abierta, algo m\xE1s all\xE1 de la pose, y que el espectador la complete. Lo inquietante como punto de partida."},third:{title:"Tradici\xF3n",content:"El patrimonio cultural est\xE1 en el ADN de cualquier identidad. Los grandes autores y los grandes temas de la historia del arte han tenido, tienen y tendr\xE1n un efecto tremendamente gravitacional. Vel\xE1zquez, Goya, Menzel, Rego, Hopper, Rauch, etc., han creado grandes obras maestras en las que se han desarrollado los grandes temas de la historia del arte, ayer y hoy. Temas intr\xEDnsecamente humanos, transversales y universales: el amor, la muerte, el miedo..."},fourth:{title:"El fracaso como una de las Bellas Artes",content:"'He hecho muchas cosas porque he fracasado en todas ellas. Parto del fracaso como una de las Bellas Artes.' Esta cita del polifac\xE9tico Pep\xEDn Tre ilustra perfectamente la raz\xF3n de la multidisciplinariedad. El genio, la iluminaci\xF3n divina o la inspiraci\xF3n no son m\xE1s que clich\xE9s mitol\xF3gicos. La realidad, como siempre, es mucho m\xE1s prosaica: es el fracaso (real o percibido) lo que mueve a un artista a investigar, probar nuevas t\xE9cnicas, nuevas formas de llegar al p\xFAblico, etc. Por el contrario, estoy convencido de que el \xE9xito (real o percibido) tiene una capacidad paralizante y termina produciendo artistas aburridos de su propio arte y por tanto de s\xED mismos. El fracaso frustra, pero tambi\xE9n estimula, o eso quiero creer yo."}}},variables:{title:"Variables",items:{first:{title:"Inteligencia Artificial",content:"<a href='https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html' target='_blank' rel='noopener noreferrer'><em>En 2019, una m\xEDnima vanguardia de creadores, como Juanma Moreno, ya experimentaba con la vieja Inteligencia Artificial de esa \xE9poca</em></a>, como dice Javier Villuendas en su columna en ABC Cultural. En 2019, pocos intu\xEDamos el potencial creativo de la IA de entonces. Las viejas redes neuronales como StyleGan o Bigbigan estimulaban nuestra imaginaci\xF3n creando monstruos muy interesantes. Hoy en d\xEDa, el arte generado por IA es algo com\xFAn y ha alcanzado nuevos niveles de suficiencia formal. Pero en aquel entonces, el margen de error (la p\xE9rdida) era mucho mayor, y los accidentes produc\xEDan monstruos inauditos y altamente interesantes. De 2019 a 2023, la principal fuente de inspiraci\xF3n para mi trabajo pas\xF3 de ser im\xE1genes encontradas en Internet a im\xE1genes que las Inteligencias Artificiales son capaces de generar."},second:{title:"Software",content:"El software no tiene que ser una soluci\xF3n ultra-racional y eficiente a un problema de ingenier\xEDa. El software tambi\xE9n puede satisfacer la curiosidad de un artista, ser flexible, org\xE1nico, mutar, ser aleatorio, desordenado e impredecible. Una vez m\xE1s, debemos valorar el error. Es en la pincelada que va ligeramente m\xE1s all\xE1 del contorno, en el accidente que hace que el software distorsione una imagen hasta aberrarla, donde reside el valor y la originalidad."}}}},download:{cv:"Generar y descargar CV",statement:"Generar y descargar statement",sheet:"Generar y descargar ficha t\xE9cnica",portfolio:"Generar y descargar dossier",hd:"Descargar imagen en alta resoluci\xF3n",success:"Descarga lista",error:"No se pudo generar el archivo"},links:{view:"Ver repercusi\xF3n de la pieza en Internet",title:"Apariciones de la pieza en Internet"}};var Ta=(()=>{class r{constructor(){this.translateService=T$1(br$1),this.translateService.setTranslation(re.ENGLISH,Aa),this.translateService.setTranslation(re.SPANISH,Ia),this.translateService.use(ka());}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=BI({type:r,selectors:[["app-root"]],decls:6,vars:0,consts:[["role","banner"],["role","main"]],template:function(t,i){t&1&&(_p$1(0,"app-share-button"),fi$3(1,"header",0),_p$1(2,"app-top-menu"),Nc$1(),fi$3(3,"main",1),_p$1(4,"app-breadcrumb")(5,"router-outlet"),Nc$1());},dependencies:[Ea,wa,va,ji$1],encapsulation:2});}}return r})();var Zo="@",Jo=(()=>{class r{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=T$1(ae$1);loadingSchedulerFn=T$1(es,{optional:true});_engine;constructor(e,t,i,a,o){this.doc=e,this.delegate=t,this.zone=i,this.animationType=a,this.moduleImpl=o;}ngOnDestroy(){this._engine?.flush();}loadImpl(){let e=()=>this.moduleImpl??import('./chunk-B5QmZYVZ.js').then(i=>i),t;return this.loadingSchedulerFn?t=this.loadingSchedulerFn(e):t=e(),t.catch(i=>{throw new b(5300,false)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:a})=>{this._engine=i(this.animationType,this.doc);let o=new a(this.delegate,this._engine,this.zone);return this.delegate=o,o})}createRenderer(e,t){let i=this.delegate.createRenderer(e,t);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=false);let a=new wn(i);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(o=>{let l=o.createRenderer(e,t);a.use(l),this.scheduler??=this.injector.get(Se$2,null,{optional:true}),this.scheduler?.notify(10);}).catch(o=>{a.use(i);}),a}begin(){this.delegate.begin?.();}end(){this.delegate.end?.();}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(e){this._engine?.flush(),this.delegate.componentReplaced?.(e);}static \u0275fac=function(t){sI();};static \u0275prov=te$1({token:r,factory:r.\u0275fac})}return r})(),wn=class{delegate;replay=[];\u0275type=1;constructor(n){this.delegate=n;}use(n){if(this.delegate=n,this.replay!==null){for(let e of this.replay)e(n);this.replay=null;}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy();}createElement(n,e){return this.delegate.createElement(n,e)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}get destroyNode(){return this.delegate.destroyNode}appendChild(n,e){this.delegate.appendChild(n,e);}insertBefore(n,e,t,i){this.delegate.insertBefore(n,e,t,i);}removeChild(n,e,t,i){this.delegate.removeChild(n,e,t,i);}selectRootElement(n,e){return this.delegate.selectRootElement(n,e)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,e,t,i){this.delegate.setAttribute(n,e,t,i);}removeAttribute(n,e,t){this.delegate.removeAttribute(n,e,t);}addClass(n,e){this.delegate.addClass(n,e);}removeClass(n,e){this.delegate.removeClass(n,e);}setStyle(n,e,t,i){this.delegate.setStyle(n,e,t,i);}removeStyle(n,e,t){this.delegate.removeStyle(n,e,t);}setProperty(n,e,t){this.shouldReplay(e)&&this.replay.push(i=>i.setProperty(n,e,t)),this.delegate.setProperty(n,e,t);}setValue(n,e){this.delegate.setValue(n,e);}listen(n,e,t,i){return this.shouldReplay(e)&&this.replay.push(a=>a.listen(n,e,t,i)),this.delegate.listen(n,e,t,i)}shouldReplay(n){return this.replay!==null&&n.startsWith(Zo)}},es=new x("");function Da(r="animations"){return Ye$2("NgAsyncAnimations"),Ds$1([{provide:pr$2,useFactory:()=>new Jo(T$1(nr$2),T$1(rr$1),T$1(Ne$1),r)},{provide:zg,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Ai=class{getTraitValue(n,e){try{return n.raw.metadata.attributes.find(t=>t.trait_type===e)?.value??""}catch(t){switch(e){case nt$1.VERSION:return "";case nt$1.MEDIUM:return "Error getting medium";case nt$1.HEIGHT:return "XX";case nt$1.WIDTH:return "XX";case nt$1.UNIT:return "cm";case nt$1.YEAR:return "XXXX";case nt$1.IMAGETYPE:return "Frontal view";default:return "Error getting data"}}}getYears(n){let e=(n??[]).map(t=>Number(this.getTraitValue(t,nt$1.YEAR))).filter(t=>!Number.isNaN(t)).sort((t,i)=>i-t);return new Set(e)}sortByYear(n,e=qo$1.ASC){return [...n].sort((t,i)=>{let a=Number(this.getTraitValue(t,nt$1.YEAR)),o=Number(this.getTraitValue(i,nt$1.YEAR));return e===qo$1.ASC?a-o:o-a})}sortByMedium(n,e=qo$1.ASC){let t=["oil","watercolor"],i=a=>{let o=this.getTraitValue(a,nt$1.MEDIUM).toLowerCase(),l=t.findIndex(d=>o.includes(d));return l===-1?t.length:l};return [...n].sort((a,o)=>{let l=i(a)-i(o);return e===qo$1.ASC?l:-l})}sortBySize(n,e=qo$1.ASC){return [...n].sort((t,i)=>{let a=this.getSize(t)-this.getSize(i);return e===qo$1.ASC?a:-a})}sortByName(n,e=qo$1.ASC){return [...n].sort((t,i)=>{let a=t.name?.toLowerCase()||"",o=i.name?.toLowerCase()||"",l=a.localeCompare(o);return e===qo$1.ASC?l:-l})}getSize(n){let e=parseInt(this.getTraitValue(n,nt$1.HEIGHT)),t=parseInt(this.getTraitValue(n,nt$1.WIDTH));return e+t}getNftById(n,e){return e.find(({tokenId:t})=>n===t)||null}getArtByTitle(n,e){return e.filter(({name:t})=>t===n)}getNftLenghtByYear(n,e){return e.filter(t=>this.getTraitValue(t,nt$1.YEAR)===n).length}isFrontalView(n,e){let t=this.filterFrontalArtworks(e);return t.length?t.length===1?t[0].tokenId===n.tokenId:this.getLatestVersion(t)?.tokenId===n.tokenId:false}filterFrontalArtworks(n){return n.filter(e=>this.getTraitValue(e,nt$1.IMAGETYPE)===ot.FRONTAL)}isExcludedByYear(n,e=[]){if(e?.length){let t=this.getTraitValue(n,nt$1.YEAR);return !e.includes(t)}else return  false}getLatestVersion(n){return n.length?n.reduce((e,t)=>{let i=parseInt(this.getTraitValue(e,nt$1.VERSION))||0;return (parseInt(this.getTraitValue(t,nt$1.VERSION))||0)>i?t:e}):null}getLatestVersionIndex(n){let e=this.getLatestVersion(n);return n.findIndex(t=>e&&t.tokenId===e.tokenId)}getNftQualityUrls(n){return this.collectUrls(n,["originalUrl","cachedUrl","thumbnailUrl"])}getNftFetchableUrls(n){return this.collectUrls(n,["originalUrl","pngUrl","thumbnailUrl"])}getNftQualityUrl(n){return this.getNftQualityUrls(n)[0]||""}getNftOptimalUrl(n){return this.collectUrls(n,["thumbnailUrl","cachedUrl","originalUrl"])[0]||""}collectUrls(n,e){let t=e.map(i=>n?.[i]);return [...new Set(t.filter(i=>typeof i=="string"&&!!i))]}};var Ii=class{static olderThanNDays(n,e){let i=Math.abs(new Date().getTime()-new Date(n).getTime());return Math.ceil(i/(1e3*3600*24))>e}};var Ti=(function(r){return r[r.BACKEND_THUMBNAIL=1]="BACKEND_THUMBNAIL",r[r.NFT_THUMBNAIL=2]="NFT_THUMBNAIL",r[r.NFT_CACHED=3]="NFT_CACHED",r})(Ti||{}),Di=class extends Ai{constructor(){super(...arguments),this.http=T$1(ms),this.sessionStore=T$1(kt),this.sessionQuery=T$1(ki);}getArtPiecesObservable(){if(!this.itIsNeccesaryToFetch())return this.sessionQuery.getArtPiecesObservable;let n=this.http.get(`${e.backendUrl}nfts-snapshot`).pipe(this.extractData([]),xl$1(e=>this.saveNftsLocally(e)),Vi$1(()=>this.sessionQuery.getArtPiecesObservable));return this.sessionQuery.selectArtPieces.length?n.pipe(Sl$1(this.sessionQuery.selectArtPieces)):this.getFallbackArtworks().pipe(xl$1(e=>this.sessionStore.update({artPieces:e})),sl$1(e=>n.pipe(Sl$1(e))))}getFallbackArtworks(){return Ce(import('./chunk-DSHJwLD8.js')).pipe(we$1(n=>n.FALLBACK_ARTWORKS_API_CALL.data??[]))}getArtPieceDescriptions(n){return this.http.get(`${e.backendUrl}descriptions/${n}`).pipe(this.extractData(null),Vi$1(()=>Oh(null)))}extractData(n){return we$1(e=>e.success&&e.data?e.data:n)}getNftByIdObservable(n){return this.sessionQuery.getArtPiecesObservable.pipe(we$1(e=>this.getNftById(n,e)))}getSameArtThanObservable(n){return this.getNftByIdObservable(n).pipe(sl$1(e=>e?Oh(this.getArtByTitle(e.name,this.sessionQuery.selectArtPieces)):this.getArtPiecesObservable().pipe(sl$1(t=>{let i=this.getNftById(n,t);return i?.name?Oh(this.getArtByTitle(i.name,t)):Oh([])}))))}getFullNftLenghtByYear(n){return this.getNftLenghtByYear(n,this.sessionQuery.selectArtPieces)}getAvailableOptimalUrl(n){return this.getLocalCachedThumbnail(n.tokenId).pipe(sl$1(e=>e?Oh(e):this.fetchRemoteThumbnail(n.tokenId).pipe(we$1(t=>t||n.image.thumbnailUrl||n.image.originalUrl))))}getProgressiveImageUrls(n){let e=this.getLocalCachedThumbnail(n.tokenId).pipe(sl$1(a=>a?Oh(a):this.fetchRemoteThumbnail(n.tokenId)),Vi$1(()=>Oh(null)),we$1(a=>({url:a,quality:Ti.BACKEND_THUMBNAIL}))),t=this.preloadImage(n.image?.thumbnailUrl).pipe(we$1(a=>({url:a,quality:Ti.NFT_THUMBNAIL}))),i=this.preloadImage(n.image?.cachedUrl).pipe(we$1(a=>({url:a,quality:Ti.NFT_CACHED})));return Qh(e,t,i).pipe(rg((a,o)=>o.url&&o.quality>a.quality?o:a,{url:null,quality:0}),we$1(({url:a})=>a),Zt$1(a=>!!a),bl())}preloadImage(n){return n?new N$1(e=>{let t=new Image;return t.onload=()=>{e.next(n),e.complete();},t.onerror=()=>e.complete(),t.src=n,()=>{t.onload=null,t.onerror=null,t.complete||(t.src="");}}):mt$1}getLinks(n){return this.http.get(e.backendUrl+"vision/search/"+n).pipe(this.extractData([]),Vi$1(()=>Oh([])))}getAvailableYears(){return this.getYears(this.sessionQuery.selectArtPieces)}saveNftsLocally(n){this.sessionStore.update({artPieces:n,lastArtPiecesUpdate:new Date});}getLocalCachedThumbnail(n){let e=this.sessionQuery.getThumbnailByTokenId(n);return Oh(e?ct.composeImgSrc(e.thumbnail):null)}fetchRemoteThumbnail(n){return this.http.get(`${e.backendUrl}nft-thumbnails/${n}`).pipe(xl$1(e=>{if(e.success&&e.data){let t=this.sessionQuery.getValue().imageCache;this.sessionStore.update({imageCache:[...t,e.data]});}}),we$1(e=>e.data?ct.composeImgSrc(e.data?.thumbnail):null))}itIsNeccesaryToFetch(){return !this.sessionQuery.selectArtPieces.length||!this.sessionQuery.selectLastArtPiecesUpdate||Ii.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate,7)}};var Pa=(()=>{class r{constructor(){this.router=T$1(ut);}navigateTo(e){this.router.navigate([e]);}static{this.\u0275fac=function(t){return new(t||r)};}static{this.\u0275cmp=BI({type:r,selectors:[["app-not-found"]],decls:24,vars:18,consts:[[1,"container","center"],["role","list"],["mat-button","","color","primary",3,"click"],["aria-label","cv","mat-button","","color","primary",3,"click"]],template:function(t,i){t&1&&(fi$3(0,"div",0)(1,"h2"),tD(2,"404 - Page Not Found"),Nc$1(),fi$3(3,"p"),tD(4,"Oops! The page you are looking for does not exist. Please navigate to:"),Nc$1(),fi$3(5,"mat-list",1)(6,"mat-list-item")(7,"button",2),gD(8,"translate"),Rp$1("click",function(){return i.navigateTo("/artworks")}),tD(9),gD(10,"translate"),Nc$1()(),fi$3(11,"mat-list-item")(12,"button",2),gD(13,"translate"),Rp$1("click",function(){return i.navigateTo("/about")}),tD(14),gD(15,"translate"),Nc$1()(),fi$3(16,"mat-list-item")(17,"button",3),Rp$1("click",function(){return i.navigateTo("/cv")}),tD(18,"CV"),Nc$1()(),fi$3(19,"mat-list-item")(20,"button",2),gD(21,"translate"),Rp$1("click",function(){return i.navigateTo("/contact")}),tD(22),gD(23,"translate"),Nc$1()()()()),t&2&&(cv(7),Cp("aria-label",yD(8,6,"paintings")),cv(2),kc$1(" ",yD(10,8,"paintings")," "),cv(3),Cp("aria-label",yD(13,10,"statement.title")),cv(2),kc$1(" ",yD(15,12,"statement.title")," "),cv(6),Cp("aria-label",yD(21,14,"menu.contact")),cv(2),kc$1(" ",yD(23,16,"menu.contact")," "));},dependencies:[Ye$1,qe$1,zv,Rp],styles:[".center[_ngcontent-%COMP%]{text-align:center}"]});}}return r})();var Oa=[{path:"",pathMatch:"full",loadComponent:()=>import('./chunk-CEu6-ZvJ.js').then(r=>r.ArtPiecesListComponent),data:{breadcrumb:"Paintings"}},{path:"artworks",loadComponent:()=>import('./chunk-CEu6-ZvJ.js').then(r=>r.ArtPiecesListComponent),data:{breadcrumb:"Paintings"}},{path:"artwork/:id",loadComponent:()=>import('./chunk-BpwUWjF8.js').then(r=>r.ArtPieceComponent)},{path:"cv",loadComponent:()=>import('./chunk-BrDSawLD.js').then(r=>r.CvComponent)},{path:"about",loadComponent:()=>import('./chunk-CHG5lwCQ.js').then(r=>r.AboutComponent)},{path:"contact",loadComponent:()=>import('./chunk-BcEyClq9.js').then(r=>r.ContactComponent)},{path:"terms",loadComponent:()=>import('./chunk-CF-irsTA.js').then(r=>r.TermsComponent)},{path:"privacy",loadComponent:()=>import('./chunk-CY-XCdWG.js').then(r=>r.PrivacyComponent)},{path:"**",component:Pa}];var Fa={providers:[Eo$1(Oa,ko$1(So$1)),Tp({fallbackLang:re.ENGLISH}),{provide:Rt,useClass:Di},ED(),ac(lc()),Da()]};un({preStorageUpdate:(r,n)=>r==="session"&&!n.lastArtPiecesUpdate?x$1(w$2({},n),{artPieces:[]}):n});$i();kl(Ta,Fa).catch(r=>console.error(r));
export{$p as $,At$1 as A,BI as B,C$1 as C,Ki$1 as D,ME as E,Rp$1 as F,Bp as G,xE as H,Ip as I,Jp$1 as J,Kp$1 as K,Lp as L,Mt$1 as M,Nc$1 as N,Oh as O,Pe$2 as P,QL as Q,Rt as R,Sl$1 as S,T$1 as T,AE as U,Ve$2 as V,ct as W,gD as X,yD as Y,ZL as Z,_p as _,br$1 as a,Au$1 as a$,Cp as a0,vp as a1,Rn as a2,tD as a3,aD as a4,zI as a5,bE as a6,kc$1 as a7,Qp$1 as a8,fD as a9,vr$2 as aA,Ne$1 as aB,O as aC,o_ as aD,Lr$1 as aE,ze$2 as aF,ae$1 as aG,bi$2 as aH,oi as aI,nr$2 as aJ,Gv$1 as aK,He$1 as aL,x as aM,wa$2 as aN,si as aO,ee$1 as aP,ig as aQ,Jr$2 as aR,Di$2 as aS,cl as aT,dl as aU,jy as aV,hi as aW,GI as aX,kd as aY,nF as aZ,xu$1 as a_,pD as aa,vD as ab,Yp as ac,TE as ad,NE as ae,Sp as af,kE as ag,Ye$1 as ah,qe$1 as ai,r as aj,zv as ak,mE as al,gE as am,yE as an,bl as ao,Vi$1 as ap,yu$1 as aq,vu$1 as ar,ID as as,Dy as at,sD as au,Zp$1 as av,gf as aw,ld as ax,gg as ay,yy as az,b,Gr$1 as b$,WE as b0,XL as b1,Sc$1 as b2,kp as b3,xc$1 as b4,il as b5,x$1 as b6,Re as b7,Gh as b8,ku as b9,$a$2 as bA,uh as bB,pv as bC,Pt as bD,lm as bE,tF as bF,dD as bG,xr$1 as bH,Ct$3 as bI,po$2 as bJ,wi$1 as bK,xd as bL,ha$2 as bM,cd as bN,Fu as bO,Qp as bP,on$1 as bQ,vr$1 as bR,Oe$1 as bS,Jp as bT,Kp as bU,Ys as bV,Bc as bW,tg as bX,id as bY,od as bZ,iu as b_,yr$2 as ba,eg as bb,Ts as bc,Zp as bd,ed as be,fu as bf,$r as bg,Jv as bh,eI as bi,Tu as bj,ll as bk,yt$2 as bl,pn as bm,Mi$1 as bn,fr$2 as bo,mn$1 as bp,An as bq,Zt$1 as br,Qh as bs,Be$2 as bt,Nm as bu,_y as bv,yp as bw,xp as bx,YI as by,he$1 as bz,nt$1 as c,ms as c0,e as c1,Pp as c2,Ad as c3,Ue$2 as c4,lu as c5,C_ as c6,qc as c7,Gv as c8,or$2 as c9,Za$1 as ca,au as cb,pr$2 as cc,mt$1 as cd,fe as ce,A$2 as cf,B$3 as cg,it$1 as ch,zL as ci,qo$1 as cj,_l as ck,$o as cl,qi$1 as cm,dE as cn,we$1 as d,dt$2 as e,ta$3 as f,ei as g,h,Rp as i,fi$3 as j,_p$1 as k,cv as l,m,nt$2 as n,ot as o,pE as p,bp$1 as q,hE as r,sl$1 as s,te$1 as t,ut as u,bp as v,w$2 as w,ie$1 as x,wu as y,z$1 as z};