import{B as Jw,Bn as iu,Cr as rv,Ct as Te,G as Kw,Mt as Vm,O as Gm,P as Ib,Ur as uu,Ut as Xw,Wn as jm,Wt as YC,ci as ze,dt as Qw,ei as y,en as _t,gr as pb,j as HV,jr as su,l as BV,ln as cT,mr as pD,n as $b,qt as Yw,sr as nv,t as $V,tn as ac}from"./chunk-D7L_4Od2.js";var I=[`frame`];function L(t,c){t&1&&(iu(0,`p`,6),$b(1,`Starting it…`),su())}function q(t,c){if(t&1&&(iu(0,`div`,7)(1,`strong`),$b(2,`It threw.`),su(),iu(3,`code`),$b(4),su(),iu(5,`span`),$b(6,`Nothing is broken but the piece. Change the sentence and run the box again — a model this size is expected to need two or three tries.`),su()()),t&2){let n=c;cT(4),rv(``,n.message,``,n.where?` · `+n.where:``)}}function B(t,c){if(t&1&&(iu(0,`li`),$b(1),su()),t&2){let n=c.$implicit;cT(),nv(n)}}function R(t,c){if(t&1&&(iu(0,`ul`,8),Jw(1,B,2,1,`li`,null,Kw),su()),t&2){let n=pb();cT(),Xw(n.notes())}}function F(t,c){t&1&&($b(0,` Written to `),iu(1,`code`),$b(2),su(),$b(3,`. To make it a page of its own, add a line to `),iu(4,`code`),$b(5,`sketches/registry.ts`),su(),$b(6,` — deliberately by hand. `)),t&2&&(cT(2),uu(`atelier-engine/out/`,c))}function H(t,c){t&1&&$b(0,` Nowhere but this browser until you do something with it. `)}var W=[{looks:/\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|navigator\.sendBeacon/,note:`asks the network for something — the frame has no network, so it will fail`},{looks:/\bimport\s*[({]|\brequire\s*\(/,note:`tries to load a library — there are none in the frame`},{looks:/\beval\s*\(|new\s+Function/,note:`builds code at runtime, which the policy refuses`},{looks:/\b(localStorage|sessionStorage|indexedDB|document\.cookie)\b/,note:`reaches for storage, which an opaque origin does not have`},{looks:/\b(setTimeout|setInterval)\s*\(/,note:`uses its own timer — a sketch is driven by draw(), and a timer will fight it`}];var A=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy"
      content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'">
<title>sketch</title>
<style>
  html, body { margin: 0; height: 100%; background: #0b0b0c; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100%; }
</style>
</head>
<body>
<canvas id="stage"></canvas>
<script>
(function () {
  var stage = document.getElementById('stage');
  var ctx = stage.getContext('2d');
  var piece = null;
  var started = 0;
  var last = 0;
  var frame = 0;
  var pointer = { x: 0, y: 0, vx: 0, vy: 0, down: false, active: false };

  function tell(message) { parent.postMessage(message, '*'); }

  function blame(what, where) {
    cancelAnimationFrame(frame);
    piece = null;
    tell({ kind: 'broken', message: String(what), where: where || '' });
  }

  window.onerror = function (message, _file, line) {
    blame(message, line ? 'line ' + line : '');
    return true;
  };

  // A refused request is silent otherwise, which is the one failure here that
  // looks like nothing happening: fetch rejects a promise nobody awaited and
  // an image simply never loads, so the piece runs on drawing nothing and
  // there is no error to report. Measured in Chrome: an image beacon in draw()
  // made 74 attempts in half a second, every one refused, and said nothing.
  //
  // Reported once. At sixty frames a second the alternative is a thousand
  // messages a minute, and the first says everything the rest would.
  //
  // (No backticks in here, ever: this whole harness is a template literal and
  // one would end it. Nor a dollar-brace, which would interpolate.)
  var mentioned = false;
  document.addEventListener('securitypolicyviolation', function (event) {
    if (mentioned) return;
    mentioned = true;
    tell({ kind: 'refused', directive: String(event.violatedDirective || 'a request') });
  });

  function size() {
    var box = stage.getBoundingClientRect();
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    stage.width = Math.max(1, Math.round(box.width * ratio));
    stage.height = Math.max(1, Math.round(box.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width: box.width, height: box.height };
  }

  stage.addEventListener('pointermove', function (event) {
    var box = stage.getBoundingClientRect();
    var x = event.clientX - box.left;
    var y = event.clientY - box.top;
    pointer.vx = x - pointer.x;
    pointer.vy = y - pointer.y;
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
  });
  stage.addEventListener('pointerdown', function () {
    pointer.down = true;
    if (piece && piece.pointerDown) {
      try { piece.pointerDown(pointer.x, pointer.y); } catch (e) { blame(e && e.message); }
    }
  });
  stage.addEventListener('pointerup', function () { pointer.down = false; });

  window.addEventListener('resize', function () {
    if (!piece) return;
    var at = size();
    if (piece.resize) {
      try { piece.resize(ctx, at.width, at.height); } catch (e) { blame(e && e.message); }
    }
  });

  function run() {
    var at = size();
    started = performance.now();
    last = started;

    var tick = function (now) {
      var frameInfo = {
        t: (now - started) / 1000,
        dt: Math.min((now - last) / 1000, 0.1),
        width: at.width,
        height: at.height,
        pointer: pointer
      };
      last = now;
      // A throw here would otherwise repeat sixty times a second, so the loop
      // stops at the first one and says what it was.
      try {
        piece.draw(ctx, frameInfo);
      } catch (e) {
        blame((e && e.message) || e, 'in draw()');
        return;
      }
      pointer.vx *= 0.9;
      pointer.vy *= 0.9;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  window.addEventListener('message', function (event) {
    if (!event.data || event.data.kind !== 'code') return;

    cancelAnimationFrame(frame);
    piece = null;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, stage.width, stage.height);

    // Two elements rather than one string. A class declared at the top level
    // of a classic script lands in the global lexical environment, which the
    // next script can read \u2014 so the code needs no line appended to it and
    // there is no newline to escape.
    var written = document.createElement('script');
    written.textContent = event.data.code;
    document.body.appendChild(written);

    var reach = document.createElement('script');
    reach.textContent = 'self.__piece = typeof Piece === "function" ? Piece : null;';
    document.body.appendChild(reach);

    if (!self.__piece) {
      blame('the code defines no class called Piece');
      return;
    }

    try {
      piece = new self.__piece();
      var at = size();
      var setup = piece.setup && piece.setup(ctx, at.width, at.height);
      if (setup && typeof setup.then === 'function') {
        setup.then(function () { tell({ kind: 'running' }); run(); },
                   function (e) { blame((e && e.message) || e, 'in setup()'); });
        return;
      }
    } catch (e) {
      blame((e && e.message) || e, 'in setup()');
      return;
    }

    tell({ kind: 'running' });
    run();
  });

  tell({ kind: 'ready' });
}());
<\/script>
</body>
</html>`;var U=(()=>{class t{constructor(){this.code=BV.required(),this.file=BV(null),this.dismissed=HV(),this.frame=$V(`frame`),this.state=ze(`starting`),this.trouble=ze(null),this.copied=ze(!1),this.refused=ze(null),this.lines=_t(()=>this.code().split(`
`).length),this.notes=_t(()=>{let i=this.code(),e=W.filter(l=>l.looks.test(i)).map(l=>l.note),d=this.refused();return d&&e.unshift(`the frame refused something it asked for (${d}) \u2014 it has no network, so that part of the piece will do nothing`),e}),this.standing=!1,this.sent=null;let n=i=>{if(i.source!==this.frame()?.nativeElement.contentWindow)return;let e=i.data;e?.kind===`ready`?this.up():e?.kind===`running`?(this.state.set(`running`),this.trouble.set(null)):e?.kind===`broken`?(this.state.set(`broken`),this.trouble.set({message:e.message??`it threw`,where:e.where??``})):e?.kind===`refused`&&this.refused.set(e.directive??`a request`)};window.addEventListener(`message`,n),y(Te).onDestroy(()=>window.removeEventListener(`message`,n)),ac(()=>{let i=this.frame()?.nativeElement;i&&(i.getAttribute(`srcdoc`)!==A&&i.setAttribute(`srcdoc`,A),this.code(),this.state.set(`starting`),this.trouble.set(null),this.refused.set(null),this.send())})}arrived(){this.up()}up(){this.standing=!0,this.send()}send(){if(!this.standing)return;let n=this.code();this.sent!==n&&(this.sent=n,this.frame()?.nativeElement.contentWindow?.postMessage({kind:`code`,code:n},`*`))}async copy(){try{await navigator.clipboard.writeText(this.code()),this.copied.set(!0)}catch{this.copied.set(!1)}}static{this.ɵfac=function(i){return new(i||t)}}static{this.ɵcmp=YC({type:t,selectors:[[`app-sketch-preview`]],viewQuery:function(i,e){i&1&&Gm(e.frame,I,5),i&2&&Ib()},hostBindings:function(i,e){i&1&&jm(`keydown.escape`,function(){return e.dismissed.emit()},pD)},inputs:{code:[1,`code`],file:[1,`file`]},outputs:{dismissed:`dismissed`},decls:26,vars:7,consts:[[`frame`,``],[1,`overlay-scrim`],[1,`overlay-panel`,`piece-panel`],[1,`overlay-head`,`piece-head`],[1,`piece-stage`],[`title`,`the written piece, running`,`sandbox`,`allow-scripts`,`referrerpolicy`,`no-referrer`,`data-testid`,`piece-frame`,3,`load`],[1,`piece-wait`],[`data-testid`,`piece-trouble`,1,`piece-trouble`],[`data-testid`,`piece-notes`,1,`piece-notes`],[1,`piece-code`],[`data-testid`,`piece-code`],[1,`piece-foot`],[1,`piece-note`],[`type`,`button`,`data-testid`,`piece-copy`,1,`piece-minor`,3,`click`],[`type`,`button`,`data-testid`,`piece-close`,1,`piece-go`,3,`click`]],template:function(i,e){if(i&1&&(iu(0,`div`,1)(1,`div`,2)(2,`header`,3)(3,`h2`),$b(4,`The piece, running`),su(),iu(5,`p`),$b(6,` Written by the model and running in a frame of its own: no network, and no way to reach this page. Move the pointer over it — most pieces answer to it. `),su()(),iu(7,`div`,4)(8,`iframe`,5,0),Vm(`load`,function(){return e.arrived()}),su(),Qw(10,L,2,0,`p`,6),Qw(11,q,7,2,`div`,7),su(),Qw(12,R,3,0,`ul`,8),iu(13,`details`,9)(14,`summary`),$b(15),su(),iu(16,`pre`,10),$b(17),su()(),iu(18,`footer`,11)(19,`span`,12),Qw(20,F,7,1)(21,H,1,0),su(),iu(22,`button`,13),Vm(`click`,function(){return e.copy()}),$b(23),su(),iu(24,`button`,14),Vm(`click`,function(){return e.dismissed.emit()}),$b(25,` Done `),su()()()()),i&2){let d,l;cT(10),Yw(e.state()===`starting`?10:-1),cT(),Yw((d=e.trouble())?11:-1,d),cT(),Yw(e.notes().length?12:-1),cT(3),uu(`The code, `,e.lines(),` lines`),cT(2),nv(e.code()),cT(3),Yw((l=e.file())?20:21,l),cT(3),uu(` `,e.copied()?`Copied`:`Copy the code`,` `)}},styles:[`.piece-panel[_ngcontent-%COMP%]{width:min(56rem,100%);max-height:100%}.piece-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;max-width:42rem;font-size:.78rem;opacity:.7}.piece-stage[_ngcontent-%COMP%]{position:relative;min-height:0}.piece-stage[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{display:block;width:100%;height:min(52vh,30rem);border:0;border-radius:4px;background:#0b0b0c}.piece-wait[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;margin:0;color:#f4f4f5;font-size:.85rem}.piece-trouble[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;padding:1.5rem;border-radius:4px;background:#0b0b0ceb;color:#f4f4f5;text-align:center;font-size:.82rem;line-height:1.45}.piece-trouble[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{max-width:100%;padding:.3rem .5rem;border-radius:3px;background:#ffffff1a;color:#ffb4ab;font-size:.78rem;overflow-wrap:anywhere}.piece-trouble[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{max-width:32rem;opacity:.75}.piece-notes[_ngcontent-%COMP%]{margin:0;padding-left:1.1rem;font-size:.75rem;opacity:.7}.piece-code[_ngcontent-%COMP%]{min-height:0}.piece-code[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]{font-size:.78rem;opacity:.7;cursor:pointer}.piece-code[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{max-height:18rem;margin:.5rem 0 0;padding:.6rem .7rem;overflow:auto;border-radius:4px;background:#0000000d;font-size:.72rem;line-height:1.45}.piece-foot[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.piece-note[_ngcontent-%COMP%]{flex:1 1 auto;font-size:.75rem;opacity:.65}.piece-note[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-size:.72rem}.piece-go[_ngcontent-%COMP%], .piece-minor[_ngcontent-%COMP%]{flex:0 0 auto;font:inherit;font-size:.82rem;padding:.35rem .8rem;border:1px solid currentColor;border-radius:3px;background:transparent;color:inherit;cursor:pointer}.piece-go[_ngcontent-%COMP%]{font-weight:600}.piece-minor[_ngcontent-%COMP%]{font-size:.78rem;opacity:.75}`]})}}return t})();export{U as t};