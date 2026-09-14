/* CodaAI Startseite — Scroll-Choreografie und Interaktionen.
 * ---------------------------------------------------------------------------
 * 14.09.2026 aus dem <script is:inline> in src/components/premium/Home.astro
 * hierher ausgelagert. Der Code ist unveraendert; nur sein Ort hat sich
 * geaendert.
 *
 * Warum: der Block wog 24,7 KB und lag im HTML von / UND /en/ — jedes Mal neu
 * uebertragen, nie gecacht, und fuer einen KI-Agenten 24,7 KB Quelltext, den er
 * mitliest und bezahlt (squirrelscan ax/token-weight: sichtbarer Text war nur
 * 12 % der Startseite). Als Datei wird er einmal geladen und danach aus dem
 * Cache bedient.
 *
 * Einbindung in Home.astro:
 *   <script is:inline defer src="/vendor/home-init.js"></script>
 * NACH gsap, ScrollTrigger und lenis — `defer` haelt die Reihenfolge ein.
 * Die Sprachtexte kommen weiterhin ueber window.CODA_HOME_COPY, das ein
 * eigener is:inline-Block davor setzt (ein is:inline-Block kennt keine
 * Astro-Ausdruecke).
 *
 * BEWUSST NICHT MINIFIZIERT: die Kommentare in dieser Datei erklaeren
 * Entscheidungen, die sonst nirgends stehen. squirrelscan meldet die Datei
 * deshalb weiter unter perf/unminified-js (~7,5 KB Ersparnis) — das ist der
 * bewusst bezahlte Preis.
 */


function codaHomeInit(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Sprachtexte aus der Astro-Komponente (siehe Brücken-Skript oben). */
  var CD = window.CODA_HOME_COPY;

  /* ---------- FlipWords (läuft immer, auch reduced) ----------
     Zweite Zeile grau; nur das letzte Wort magenta. Danach 10 s Standstill. */
  (function(){
    var words=CD.flipWords;
    var PINK=CD.flipPink;
    var host=document.getElementById('flip'); if(!host) return;
    function make(txt){var el=document.createElement('span');el.className='w'+(txt===PINK?' pink':'');el.textContent=txt;return el;}
    host.querySelectorAll('.w').forEach(function(n){n.remove();});
    var first=make(words[0]); first.classList.add('in'); host.appendChild(first);
    if(reduced) return;
    var i=0, timer=null;
    function cleanup(){ // beim Zurückkehren nur das aktuelle Wort behalten, Reste entfernen
      var ws=host.querySelectorAll('.w');
      for(var k=0;k<ws.length-1;k++){ ws[k].remove(); }
      var last=host.querySelector('.w:last-child');
      if(last){ last.classList.remove('out'); last.classList.add('in'); }
    }
    function step(){
      var cur=host.querySelector('.w.in');
      if(cur){ cur.classList.remove('in'); cur.classList.add('out'); (function(dead){ setTimeout(function(){ if(dead.parentNode) dead.remove(); },520); })(cur); }
      i=(i+1)%words.length;
      var el=make(words[i]); host.appendChild(el);
      void el.offsetWidth;            // Reflow statt rAF — läuft auch nach Tab-Rückkehr sauber
      el.classList.add('in');
      schedule();
    }
    function schedule(){
      if(timer){ clearTimeout(timer); timer=null; }
      if(document.hidden) return;     // im Hintergrund-Tab NICHT weiterlaufen (verhindert Stapeln)
      timer=setTimeout(step, words[i]===PINK ? 10000 : 1200);
    }
    document.addEventListener('visibilitychange', function(){
      if(document.hidden){ if(timer){ clearTimeout(timer); timer=null; } }
      else { cleanup(); schedule(); }
    });
    schedule();
  })();

  /* ---------- KI-Karte Sequenz (Hero) ---------- */
  (function(){
    var card=document.getElementById('kicard'); if(!card) return;
    var Q=CD.kQuestion;
    var qt=document.getElementById('kqtext'), caret=document.getElementById('kqcaret');
    if(reduced){ qt.textContent=Q; caret.style.display='none';
      document.querySelectorAll('[data-kr]').forEach(function(r){r.classList.add('in');});
      document.getElementById('kfoot').classList.add('in'); return; }
    var wait=function(ms){return new Promise(function(r){setTimeout(r,ms);});};
    (async function(){
      await wait(500);
      for(var i=1;i<=Q.length;i++){ qt.textContent=Q.slice(0,i); await wait(18+Math.random()*22); }
      await wait(350);
      var th=document.getElementById('kthink'); th.classList.add('on'); await wait(1500); th.classList.remove('on');
      var rows=document.querySelectorAll('[data-kr]');
      for(var j=0;j<rows.length;j++){ rows[j].classList.add('in'); await wait(300); }
      await wait(450); document.getElementById('kfoot').classList.add('in');
      await wait(1200); caret.style.display='none';
    })();
  })();

  /* ---------- Cursor-Spotlight + KI-Karten-Parallax ---------- */
  (function(){
    if(reduced) return;
    var hero=document.getElementById('hero'), spot=document.getElementById('herospot'),
        tilt=document.getElementById('ktilt'), card=document.getElementById('kicard');
    if(!hero) return;
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      spot.style.setProperty('--mx',(x*100)+'%'); spot.style.setProperty('--my',(y*100)+'%');
      if(card){ card.style.transform='rotateY('+((x-0.5)*8)+'deg) rotateX('+((0.5-y)*8)+'deg) translateZ(0)'; }
    });
    hero.addEventListener('pointerleave',function(){ if(card) card.style.transform='';});
  })();

  /* ---------- Magnetische Buttons ---------- */
  (function(){
    if(reduced) return;
    document.querySelectorAll('[data-mag]').forEach(function(b){
      b.addEventListener('pointermove',function(e){
        var r=b.getBoundingClientRect();
        b.style.transform='translate('+((e.clientX-r.left-r.width/2)*0.25)+'px,'+((e.clientY-r.top-r.height/2)*0.35)+'px)';
      });
      b.addEventListener('pointerleave',function(){b.style.transform='';});
    });
  })();

  /* ---------- Bento 3D-Tilt ---------- */
  (function(){
    if(reduced) return;
    document.querySelectorAll('[data-tilt]').forEach(function(c){
      c.addEventListener('pointermove',function(e){
        var r=c.getBoundingClientRect();
        var x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
        c.style.transform='perspective(700px) rotateY('+((x-0.5)*7)+'deg) rotateX('+((0.5-y)*7)+'deg) translateY(-2px)';
      });
      c.addEventListener('pointerleave',function(){c.style.transform='';});
    });
  })();

  /* ---------- System-Tabs (Apple-„Experience"-Muster): Auto-Durchlauf + Play/Pause ---------- */
  (function(){
    var sys=document.getElementById('sys'); if(!sys) return;
    var tabs=[].slice.call(sys.querySelectorAll('[data-tab]'));
    var panels=[].slice.call(sys.querySelectorAll('[data-level]'));
    var contents=[].slice.call(sys.querySelectorAll('[data-content]'));
    var pp=sys.querySelector('.sys-pp');
    var DUR=5500, idx=0, playing=!reduced, timer=null, started=false;
    function resetBars(){ tabs.forEach(function(t){ var b=t.querySelector('.pgr'); b.style.transition='none'; b.style.width='0%'; }); }
    function startBar(i){ var b=tabs[i].querySelector('.pgr'); b.style.transition='none'; b.style.width='0%'; void b.offsetWidth; b.style.transition='width '+DUR+'ms linear'; b.style.width='100%'; }
    function animateGraphics(p){
      if(reduced||!window.gsap) return;
      var bars=p.querySelectorAll('.barrow2 i');
      if(bars.length) gsap.fromTo(bars,{scaleX:0},{scaleX:1,transformOrigin:'0% 50%',duration:.9,stagger:.12,ease:'power2.out',clearProps:'transform'});
      var gb=p.querySelectorAll('.gbar');
      if(gb.length) gsap.fromTo(gb,{scaleY:0},{scaleY:1,transformOrigin:'50% 100%',duration:.8,stagger:.1,ease:'back.out(1.5)',clearProps:'transform'});
      var eg=p.querySelectorAll('.eng > g');
      if(eg.length) gsap.fromTo(eg,{opacity:0,x:-10},{opacity:1,x:0,duration:.5,stagger:.12,ease:'power2.out',clearProps:'transform,opacity'});
    }
    function render(i,withGfx){
      idx=i;
      tabs.forEach(function(t,k){ t.classList.toggle('on',k===i); t.setAttribute('aria-selected',k===i?'true':'false'); t.tabIndex=(k===i?0:-1); });
      panels.forEach(function(p,k){ p.classList.toggle('on',k===i); });
      contents.forEach(function(c,k){ c.classList.toggle('on',k===i); });
      if(withGfx) animateGraphics(panels[i]);
    }
    function activate(i){
      started=true;
      render(i,true);
      resetBars();
      if(timer){ clearTimeout(timer); timer=null; }
      if(playing){ startBar(i); timer=setTimeout(function(){ activate((i+1)%tabs.length); }, DUR); }
    }
    sys.__start=function(){ if(started) return; started=true; activate(0); };
    function setPlaying(p){
      playing=p;
      if(pp){ pp.innerHTML=p?'&#10073;&#10073;':'&#9654;'; pp.setAttribute('aria-label',p?CD.pause:CD.play); }
      if(p){ activate(idx); }
      else { if(timer){ clearTimeout(timer); timer=null; } var b=tabs[idx].querySelector('.pgr'); var w=getComputedStyle(b).width; b.style.transition='none'; b.style.width=w; }
    }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){ activate(i); });
      t.addEventListener('keydown',function(e){
        if(e.key==='ArrowRight'||e.key==='ArrowDown'){ e.preventDefault(); var n=(i+1)%tabs.length; tabs[n].focus(); activate(n); }
        else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){ e.preventDefault(); var pI=(i-1+tabs.length)%tabs.length; tabs[pI].focus(); activate(pI); }
      });
    });
    if(pp){ pp.addEventListener('click',function(){ setPlaying(!playing); }); if(reduced) pp.style.display='none'; }
    render(0,false);   // Grundzustand ohne Auto-Durchlauf — Start erst, wenn die Sektion sichtbar wird
  })();

  /* ================= reduced-motion: hier Schluss ================= */
  if(reduced || typeof gsap==='undefined' || typeof ScrollTrigger==='undefined' || typeof Lenis==='undefined'){ return; }
  document.body.classList.add('anim');

  /* scroll-behavior:smooth (aus global.css) kollidiert mit ScrollTrigger — neutralisieren */
  document.documentElement.style.scrollBehavior='auto';
  gsap.registerPlugin(ScrollTrigger);
  /* Lenis treibt ScrollTrigger.update (nativer Scroll-Listener greift auf dieser Seite nicht zuverlässig) */
  var lenis=new Lenis({lerp:0.09,wheelMultiplier:0.9});
  function lenisRaf(t){lenis.raf(t);requestAnimationFrame(lenisRaf);} requestAnimationFrame(lenisRaf);
  lenis.on('scroll',ScrollTrigger.update);
  /* offset:-88 haelt die Sprungziele unter der 73px hohen fixen Kopfleiste frei.
     Lenis liest scroll-padding-top aus global.css nicht — der Wert muss hier
     doppelt stehen. /webinar macht dasselbe mit -90 (Zeile 1146 dort).
     Befund B2 des Mobil-Audits vom 04.08.2026.                                */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href'); if(id&&id.length>1&&id.charAt(0)==='#'){var el=document.querySelector(id);if(el){e.preventDefault();lenis.scrollTo(el,{offset:-88});}}
    });
  });

  /* Fortschrittsbalken + Navbar solid + Dot-Nav */
  var prog=document.getElementById('prog');
  ScrollTrigger.create({start:0,end:'max',onUpdate:function(self){
    prog.style.width=(self.progress*100)+'%';
  }});
  /* Der Schlüssel (data-nav) bleibt in beiden Sprachen 'angebot', die Element-ID
     wechselt (`angebot` / `offer`). Beides muss getrennt geführt werden, sonst
     findet der Trigger auf der englischen Seite seine Sektion nicht und der
     vierte Punkt der Dot-Nav leuchtet nie. */
  [['hero','hero'],['problem','problem'],['spiegel','spiegel'],
   ['outcome','outcome'],['angebot',CD.offerId]].forEach(function(pair){
    var key=pair[0], id=pair[1];
    ScrollTrigger.create({trigger:'#'+id,start:'top center',end:'bottom center',
      onToggle:function(self){ if(self.isActive){
        document.querySelectorAll('.dotnav a').forEach(function(a){a.classList.toggle('on',a.dataset.nav===key);});
      }}});
  });

  /* ---------- PROBLEM: gepinnte Szene ---------- */
  (function(){
    var QUERY=CD.query;
    var qEl=document.getElementById('qtext'), aiBody=document.getElementById('aibody');
    var AI_TEXT=CD.aiText;
    var steps=document.querySelectorAll('#psteps span');
    var PHASES=CD.phases;
    var pphase=document.getElementById('pphase'), pnum=document.getElementById('pphasenum'), lastStep=-1;
    function setStep(i){
      steps.forEach(function(s){s.classList.toggle('on',+s.dataset.step===i);});
      if(i===lastStep) return;
      lastStep=i;
      pphase.style.opacity=0; pphase.style.transform='translateY(-8px)';
      setTimeout(function(){ pphase.textContent=PHASES[i]; pnum.textContent=CD.stepFmt.replace('{n}',i+1);
        pphase.style.opacity=1; pphase.style.transform='none'; },180);
    }
    var tl=gsap.timeline({scrollTrigger:{trigger:'#p-scene',start:'top top',end:'bottom bottom',scrub:0.6,
      onUpdate:function(self){document.getElementById('prail').style.height=(self.progress*100).toFixed(1)+'%';setStep(Math.min(2,Math.floor(self.progress*3)));}}});
    tl.to({},{duration:1,onUpdate:function(){qEl.textContent=QUERY.slice(0,Math.round(QUERY.length*this.progress()));}},0);
    tl.to('[data-res]',{opacity:1,y:0,stagger:0.25,duration:1,ease:'power2.out'},1).to('#serplabel',{opacity:.9,duration:.4},1.6);
    tl.to('#ai',{y:'0%',duration:1.4,ease:'power3.inOut'},2.4)
      .to('#serp',{y:'46%',filter:'blur(3px)',opacity:.35,duration:1.4,ease:'power3.inOut'},2.4)
      .to({},{duration:1.2,onUpdate:function(){aiBody.textContent=AI_TEXT.slice(0,Math.round(AI_TEXT.length*this.progress()));}},2.8);
    tl.to('[data-chip]',{opacity:1,y:0,scale:1,stagger:0.35,duration:.9,ease:'back.out(1.6)'},3.9);
    var num={v:0};
    tl.to('#pstat',{opacity:1,x:(window.innerWidth>900?'106%':'0%'),duration:.8},4.2)
      .to(num,{v:-59,duration:1.4,ease:'power1.out',onUpdate:function(){document.getElementById('statnum').textContent=Math.round(num.v)+CD.pctSuffix;}},4.2);
    tl.add(function(){document.querySelector('[data-ghost]').classList.add('flag');},5.3)
      .to('[data-ghost]',{opacity:1,y:0,scale:1,duration:.6},5.3);
    // Bei erreichter −59 %: Box schlägt auf Weiß um, Schrift wird anthrazit (Betonung)
    tl.to('#pstat',{backgroundColor:'#ffffff',borderColor:'rgba(12,17,32,.14)',boxShadow:'0 26px 60px -28px rgba(12,17,32,.55)',duration:.5,ease:'power2.out'},5.75)
      .to('#pstat .lab',{color:'#2B3A5C',duration:.5},5.75)
      .to('#pstat .lab strong',{color:'#131A2B',duration:.5},5.75)
      .to('#pstat .src',{color:'#3E5183',duration:.5},5.75);
    // Kurz weiß, dann parallel zur 55 % ins Nichts ausblenden — Blick wandert zur Mitte
    tl.to('#punch',{opacity:1,duration:1,ease:'power2.out'},6.4)
      .to('#pstat',{opacity:0,duration:.8,ease:'power2.in'},6.4)
      // Phasen-Ueberschrift raus, sonst steht sie hinter der 55-%-Pointe
      .to('#pphasebar',{opacity:0,duration:.6,ease:'power2.in'},6.4);
  })();

  /* ---------- OUTCOME „Die Kette": Aufladen → Bruch → Pointe → Auflösung ---------- */
  (function(){
    if(!document.getElementById('oc-scene')) return;
    var nodes=gsap.utils.toArray('#oc-chain .oc-node');
    var conns=gsap.utils.toArray('#oc-chain .oc-conn i');
    var brk=document.querySelector('#oc-chain .oc-conn .brk');
    var tag=nodes[0].querySelector('.tag');
    var mv=document.getElementById('oc-mult');
    var mult={v:0};
    function setMult(){ mv.textContent=mult.v.toFixed(1).replace('.',CD.decimal)+' ×'; }
    function num(i){ return nodes[i].querySelector('.nn'); }
    var LIT='rgba(223,65,251,.55)', SHA='0 20px 44px -30px rgba(223,65,251,.6)', OFF='0 0px 0px rgba(12,17,32,0)', LINE='#C9D3E6';
    mult.v=0; setMult();
    gsap.set(brk,{xPercent:-50,yPercent:-50,scale:0});

    var tl=gsap.timeline({scrollTrigger:{trigger:'#oc-scene',start:'top top',end:'bottom bottom',scrub:0.7}});

    // 1) AUFLADEN — Glieder leuchten nacheinander, Energie fließt durch, Zahl zählt hoch
    nodes.forEach(function(n,i){
      tl.to(n,{opacity:1,borderColor:LIT,boxShadow:SHA,duration:.5,ease:'power2.out'}, 0.2+i*0.5);
      tl.to(num(i),{backgroundColor:'#DF41FB',color:'#ffffff',duration:.5}, 0.2+i*0.5);
      if(i<conns.length) tl.to(conns[i],{width:'100%',duration:.5,ease:'none'}, 0.5+i*0.5);
    });
    tl.to(mult,{v:4.4,duration:1.7,ease:'power1.out',onUpdate:setMult}, 0.4);
    // Ä10: Die 4,4 × bekommt eine Bezugsgröße — ohne sie ist die Zahl bedeutungslos.
    tl.to('#v-seo',{width:'20%',duration:1.1,ease:'power2.out'}, 0.4);
    tl.to('#v-ai', {width:'88%',duration:1.7,ease:'power2.out'}, 0.4);

    // 2) BRUCH — erstes Glied wird grau, Kette reißt, Zahl fällt auf 0
    var B=2.7;
    tl.to(nodes[0],{opacity:.5,borderColor:'rgba(62,81,131,.5)',boxShadow:OFF,duration:.5}, B);
    tl.to(num(0),{backgroundColor:'#E7ECF5',color:'#3E5183',duration:.5}, B);
    tl.to(tag,{opacity:1,duration:.4}, B+0.1);
    tl.to(brk,{opacity:1,scale:1,duration:.4,ease:'back.out(2)'}, B+0.15);
    tl.to([nodes[1],nodes[2],nodes[3]],{opacity:.26,borderColor:LINE,boxShadow:OFF,duration:.5}, B);
    tl.to([num(1),num(2),num(3)],{backgroundColor:'#E7ECF5',color:'#3E5183',duration:.5}, B);
    tl.to(conns,{width:'0%',duration:.5,ease:'none'}, B);
    tl.to(mult,{v:0,duration:.8,ease:'power2.in',onUpdate:setMult}, B);
    // …und stürzen beim Bruch mit ein: die Zahl wird ein zweites Mal wertvoll.
    tl.to(['#v-seo','#v-ai'],{width:'0%',duration:.8,ease:'power2.in'}, B);

    // 3) POINTE — direkt nach dem Bruch blendet die Magenta-Flaeche auf.
    //    (Frueher lag hier ein "Reparatur"-Beat, der die Kaesten erneut aufleuchten
    //    liess — das wirkte wie ein Neustart der Animation. Entfernt: Bruch -> Pointe.)
    tl.to('[data-punch]',{opacity:1,duration:.7,ease:'power2.out'}, B+1.2);
    // Die Pointe bleibt stehen — direkt danach folgt der Magenta-Angebotsblock.
    tl.to({},{duration:1.0}, B+2.0);

    // 4) AUFLÖSUNG — überlappender Crossfade direkt in den Schluss (Overlay deckt die Kette voll ab)
  })();


  /* ---------- Begriffe-Akkordeon + Tab-Karten (ersetzt den Horizontal-Pin) ---------- */
  (function(){
    var btn=document.getElementById('accbtn'), body=document.getElementById('accbody');
    if(!btn||!body) return;
    function fit(){ body.style.maxHeight=body.scrollHeight+40+'px'; }
    btn.addEventListener('click',function(){
      var open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded', open?'false':'true');
      if(open){ body.style.maxHeight='0px'; } else { fit(); }
      if(window.ScrollTrigger) setTimeout(function(){ ScrollTrigger.refresh(); },520);
    });
    body.querySelectorAll('.tab').forEach(function(t){
      t.addEventListener('click',function(){
        body.querySelectorAll('.tab').forEach(function(o){o.classList.remove('on');o.setAttribute('aria-selected','false');});
        body.querySelectorAll('.pane').forEach(function(o){o.classList.remove('on');});
        t.classList.add('on'); t.setAttribute('aria-selected','true');
        var pane=body.querySelector('.pane[data-pane="'+t.dataset.tab+'"]');
        if(pane) pane.classList.add('on');
        if(btn.getAttribute('aria-expanded')==='true') fit();
      });
    });
  })();

  /* ---------- Spiegel: Fragekarten + Selbstöffnung als Lehrstück ----------
     Regel aus der Animations-Doktrin: Selbstöffnung ist erlaubt, wenn sie eine
     Interaktion LEHRT, die sonst unentdeckt bliebe — Auslöser ist die erste Frage
     selbst bei >=70 % Sichtbarkeit (nicht der Container, sonst öffnet sie sich
     unter der Falz), sie feuert genau einmal und bricht ab, wenn weitergescrollt
     oder vorher selbst geklickt wird. */
  (function(){
    var heads=[].slice.call(document.querySelectorAll('.mi-qh'));
    if(!heads.length) return;
    var items=[].slice.call(document.querySelectorAll('.mi-q'));
    var touched=false, fired=false, timer=null;

    var vRed = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    // Gestufte Enthuellung je Frage: Quelle/Logo -> KI-Antwort (Typewriter) -> Befund (Scan+Typewriter)
    [].slice.call(document.querySelectorAll('.mi-qb')).forEach(function(b){
      var src=b.querySelector('.mi-logo-wrap'), ans=b.querySelector('.mi-ans'), v=b.querySelector('.mi-verdict[data-verdict]');
      if(v){ var typed=v.querySelector('.mi-vtyped'); if(typed) v._full=typed.textContent; }
      if(vRed) return;                 // reduced motion: alles statisch sichtbar
      if(ans){
        var toks=[];
        [].slice.call(ans.childNodes).forEach(function(n){
          if(n.nodeType===3) toks.push({t:n.nodeValue});
          else if(n.nodeType===1 && n.tagName==='MARK') toks.push({m:n.textContent});
          else if(n.nodeType===1 && n.tagName==='BR') toks.push({br:true});
          else if(n.nodeType===1) toks.push({t:n.textContent});
        });
        ans._toks=toks; ans._html=ans.innerHTML; ans.style.opacity='0';
      }
      if(src) src.style.opacity='0';
      if(v){ v.style.opacity='0'; v._pending=true; }
      b._staged=true;
    });

    function typeAns(el, toks, done){
      var total=toks.reduce(function(a,x){return a+(x.t!=null?x.t.length:(x.m!=null?x.m.length:0));},0);
      el.style.opacity='1'; el.classList.add('mi-typing');
      var i=0;
      (function tick(){
        i+=2; var n=i, html='';
        for(var k=0;k<toks.length;k++){
          if(n<=0) break;
          var tok=toks[k];
          if(tok.br){ html+='<br>'; continue; }
          var s=(tok.t!=null?tok.t:tok.m), isMark=(tok.m!=null);
          html+= isMark ? '<mark>'+esc(s.slice(0,n))+'</mark>' : esc(s.slice(0,n));
          n-=s.length;
        }
        el.innerHTML=html;
        if(i<total){ setTimeout(tick,14); } else { el.innerHTML=el._html; el.classList.remove('mi-typing'); done&&done(); }
      })();
    }

    function revealVerdict(v){
      if(!v||!v._pending||v._done) return;
      v._done=true; v.style.opacity='1';
      var typed=v.querySelector('.mi-vtyped'), label=v.querySelector('.mi-vlabel');
      v.classList.add('is-scanning');
      var phases=CD.miScan;
      var pi=0;
      var cyc=setInterval(function(){ pi++; if(label&&phases[pi]) label.textContent=phases[pi]; if(pi>=phases.length-1) clearInterval(cyc); },2000);
      setTimeout(function(){
        clearInterval(cyc);
        v.classList.remove('is-scanning');
        typed.classList.add('typing'); typed.textContent='';
        var full=v._full||'', i=0;
        (function tick(){
          i+=2; typed.textContent=full.slice(0,Math.min(i,full.length));
          if(i<full.length){ setTimeout(tick,22); } else { typed.classList.remove('typing'); }
        })();
      },6000);
    }

    function revealBody(b){
      if(vRed||!b||!b._staged||b._bdone) return;
      b._bdone=true;
      var src=b.querySelector('.mi-logo-wrap'), ans=b.querySelector('.mi-ans'), v=b.querySelector('.mi-verdict[data-verdict]');
      if(src) src.style.opacity='1';                              // Stufe 1: Quelle/Logo
      setTimeout(function(){                                      // Stufe 2: Antwort tippt sich ein
        if(ans && ans._toks){ typeAns(ans, ans._toks, function(){ if(v) revealVerdict(v); }); }
        else if(v){ revealVerdict(v); }                          // Stufe 3: Befund
      }, 600);
    }

    function closeAll(){
      heads.forEach(function(h){ h.setAttribute('aria-expanded','false'); h.nextElementSibling.style.maxHeight='0px'; });
    }
    function open(h){
      closeAll();
      h.setAttribute('aria-expanded','true');
      var b=h.nextElementSibling;
      b.style.maxHeight=b.scrollHeight+48+'px';
      revealBody(b);
      if(window.ScrollTrigger) setTimeout(function(){ ScrollTrigger.refresh(); },500);
    }
    heads.forEach(function(h){
      h.addEventListener('click',function(){
        touched=true; clearTimeout(timer);
        items.forEach(function(i){ i.classList.remove('hint'); });
        if(h.getAttribute('aria-expanded')==='true'){
          h.setAttribute('aria-expanded','false'); h.nextElementSibling.style.maxHeight='0px';
        } else { open(h); }
      });
    });

    var first=items[0];
    if(!first) return;
    var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function fire(){
      if(fired||touched) return;
      fired=true; open(heads[0]);
      items.forEach(function(it,i){ if(i>0) it.classList.add('hint'); });
    }
    if(reduced){ open(heads[0]); return; }
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(fired||touched) return;
        if(e.isIntersecting){
          clearTimeout(timer);
          timer=setTimeout(function(){
            var r=first.getBoundingClientRect();
            var visible=Math.min(r.bottom,window.innerHeight)-Math.max(r.top,0);
            if(r.height && visible/r.height>=0.7) fire();
          },1200);
        } else { clearTimeout(timer); }
      });
    },{threshold:[0,0.7]});
    io.observe(first);
  })();

  // Pins/Positionen neu berechnen, sobald Fonts/Bilder das Layout verschoben haben
  ScrollTrigger.refresh();
  window.addEventListener('load', function(){ ScrollTrigger.refresh(); });
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ ScrollTrigger.refresh(); }); }
  setTimeout(function(){ ScrollTrigger.refresh(); }, 600);
  setTimeout(function(){ ScrollTrigger.refresh(); }, 1600);
  window.addEventListener('resize', function(){ ScrollTrigger.refresh(); });
}

/* Startsignal. Die drei Bibliotheken oben tragen defer, laufen also erst nach
   dem Parsen — aber garantiert VOR DOMContentLoaded. Deshalb hängt der Init
   hier dran statt sofort zu laufen; sonst wäre gsap zum Aufrufzeitpunkt noch
   nicht definiert und die Seite fiele in den statischen Zustand
   (body:not(.anim)) zurück. Der else-Zweig fängt den Fall ab, dass das
   Dokument bereits fertig geparst ist (bfcache, sehr schnelle Verbindung). */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', codaHomeInit);
} else {
  codaHomeInit();
}

