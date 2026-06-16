"use client";

import { useEffect } from "react";
import LiveClock from "./LiveClock";

export default function Landing() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const fine = window.matchMedia("(pointer:fine)").matches;

    // nav solidify + scroll progress
    const nav = document.getElementById("nav");
    const prog = document.getElementById("progress");
    const onScroll = () => {
      if (nav) nav.classList.toggle("solid", window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // cursor spotlight
    const spot = document.getElementById("spot");
    let raf = 0;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    if (spot) {
      if (!reduce && fine) {
        window.addEventListener("mousemove", onMove, { passive: true });
        const loop = () => {
          cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
          spot.style.transform = `translate(${cx}px,${cy}px)`;
          raf = requestAnimationFrame(loop);
        };
        loop();
      } else { spot.style.opacity = "0"; }
    }

    // hero parallax
    const hc = document.getElementById("heroContent");
    const onParallax = () => {
      const y = window.scrollY;
      if (hc && y < window.innerHeight) {
        hc.style.transform = `translateY(${y * 0.18}px)`;
        hc.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.8)));
      }
    };
    if (!reduce && hc) window.addEventListener("scroll", onParallax, { passive: true });

    // scroll reveals
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal,.stagger").forEach((el) => io.observe(el));

    // count-up
    const animCount = (el) => {
      const dec = +el.dataset.dec || 0, target = parseFloat(el.dataset.count), dur = 1500, t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec);
      };
      requestAnimationFrame(step);
    };
    const sio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll("[data-count]").forEach((n) => {
            if (reduce) n.textContent = (+n.dataset.count).toFixed(+n.dataset.dec || 0); else animCount(n);
          });
          sio.unobserve(e.target);
        }
      }), { threshold: 0.4 }
    );
    const sg = document.getElementById("statGrid");
    if (sg) sio.observe(sg);

    // 3D tilt
    const tilt = [];
    if (!reduce && fine) {
      document.querySelectorAll(".tilt").forEach((card) => {
        const mm = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          card.style.transform = `rotateY(${(px - 0.5) * 7}deg) rotateX(${(0.5 - py) * 7}deg) translateY(-4px)`;
          card.style.setProperty("--mx", px * 100 + "%");
          card.style.setProperty("--my", py * 100 + "%");
        };
        const ml = () => { card.style.transform = ""; };
        card.addEventListener("mousemove", mm);
        card.addEventListener("mouseleave", ml);
        tilt.push([card, mm, ml]);
      });
    }

    // program accordion
    const list = document.getElementById("prjList");
    const setPanel = (prj, open) => {
      const panel = prj.querySelector(".prj-panel"), btn = prj.querySelector(".prj-btn");
      if (open) { prj.classList.add("open"); btn.setAttribute("aria-expanded", "true"); panel.style.maxHeight = panel.scrollHeight + "px"; }
      else { prj.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); panel.style.maxHeight = "0px"; }
    };
    const clicks = [];
    if (list) {
      list.querySelectorAll(".prj").forEach((prj) => {
        const h = () => {
          const isOpen = prj.classList.contains("open");
          list.querySelectorAll(".prj").forEach((p) => setPanel(p, false));
          if (!isOpen) setPanel(prj, true);
        };
        const btn = prj.querySelector(".prj-btn");
        btn.addEventListener("click", h);
        clicks.push([btn, h]);
      });
      const first = list.querySelector(".prj.open");
      if (first) setPanel(first, true);
    }
    const onResize = () => {
      const o = list && list.querySelector(".prj.open");
      if (o) { const p = o.querySelector(".prj-panel"); p.style.maxHeight = p.scrollHeight + "px"; }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onParallax);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect(); sio.disconnect();
      tilt.forEach(([c, mm, ml]) => { c.removeEventListener("mousemove", mm); c.removeEventListener("mouseleave", ml); });
      clicks.forEach(([b, h]) => b.removeEventListener("click", h));
    };
  }, []);

  return (
    <>
      <div id="grain"></div>
      <div id="spot"></div>
      <div id="progress"></div>

      <nav id="nav">
      <div className="brand">UDGOK<span className="dot">.</span></div>
      <div style={{display:"flex",alignItems:"center",gap:"18px"}}><span className="nav-clock"><LiveClock variant="compact" /></span><a href="/contact" className="nav-cta">Contact</a></div>
      </nav>

      <header className="hero">
      <div className="mesh"><span className="blob b1"></span><span className="blob b2"></span><span className="blob b3"></span></div>
      <div className="hero-grid"></div>
      <div className="hero-veil"></div>
      <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 560 520" xmlns="http://www.w3.org/2000/svg">

      <path className="sig" d="M210 480 H545" opacity=".4"/>

      <path className="struct" d="M250 480 V300 H322 V480"/>
      <path className="struct" d="M250 332 H322 M250 366 H322 M250 400 H322 M250 434 H322"/>
      <path className="struct" d="M336 480 V236 H420 V480"/>
      <path className="struct" d="M336 270 H420 M336 306 H420 M336 342 H420 M336 378 H420 M336 414 H420 M336 450 H420"/>
      <path className="struct" d="M434 480 V346 H488 V480"/>
      <path className="struct" d="M434 378 H488 M434 410 H488 M434 442 H488"/>
      <path className="struct" d="M378 236 V206"/>

      <path className="net" d="M150 96 L245 70 L315 124 M150 96 L210 162 L300 210 M210 162 L245 70 M120 182 L150 96 M210 162 L120 182 M315 124 L300 210" opacity=".7"/>

      <path className="sig" d="M333 108 a30 30 0 0 1 0 32"/>
      <path className="sig" d="M345 100 a44 44 0 0 1 0 48" opacity=".6"/>

      <circle className="nd" cx="315" cy="124" r="4.5"/>
      <circle className="nd" cx="245" cy="70" r="4"/>
      <circle className="nd" cx="210" cy="162" r="4.5"/>
      <circle className="nd" cx="300" cy="210" r="4"/>
      <circle className="nd2" cx="150" cy="96" r="3.2"/>
      <circle className="nd2" cx="120" cy="182" r="3.2"/>
      </svg>
      </div>
      <div className="wrap" id="heroContent">
      <span className="eyebrow rise d1">DOC // KWT-01 — REV 2026.1</span>
      <h1 className="rise d2">The systems behind <span className="shimmer">Kuwait&rsquo;s flagship build.</span></h1>
      <p className="lede rise d3">UDGOK delivers the buildings, power, lighting, and mission-critical systems across the program&rsquo;s landmark projects &mdash; designed, powered, lit, secured, and sourced.</p>
      <div className="hero-status rise d3"><LiveClock variant="full" /></div>
      <div className="hero-meta rise d4">
      <div className="hm"><span className="n">6</span><span className="l">Capability pillars</span></div>
      <div className="hm"><span className="n">5</span><span className="l">Flagship projects</span></div>
      <div className="hm"><span className="n">$8.5B+</span><span className="l">Named value</span></div>
      </div>
      </div>
      <div className="scrollcue rise d5"><span className="bar"></span>Scroll</div>
      </header>

      <section className="statement">
      <span className="glow"></span>
      <div className="wrap reveal">
      <span className="eyebrow" style={{display:"block",marginBottom:"22px"}}>The brief</span>
      <h2><span className="q">Kuwait is building at national scale.</span> UDGOK delivers the facility and systems scope inside it &mdash; <span className="shimmer">designed, powered, lit, secured, and sourced.</span></h2>
      </div>
      </section>

      <section className="stats">
      <span className="glow"></span>
      <div className="wrap">
      <div className="stat-grid reveal" id="statGrid">
      <div className="stat"><div className="num" data-count="6">0</div><div className="lab">Capability pillars</div></div>
      <div className="stat"><div className="num" data-count="5">0</div><div className="lab">Flagship projects</div></div>
      <div className="stat"><div className="num"><span className="u">$</span><span data-count="8.5" data-dec="1">0</span><span className="u">B+</span></div><div className="lab">Named project value</div></div>
      </div>
      </div>
      </section>

      <section className="pillars">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">Services we provide</span>
      <h2>Six pillars. One accountable delivery partner.</h2>
      <p>A complete capability set across the program &mdash; from healthcare design-build to network-powered lighting and mission-critical infrastructure.</p>
      </div>
      <div className="pillar-grid stagger" id="pillarGrid">
      <div className="pillar tilt"><span className="picon"><svg viewBox="0 0 24 24"><path d="M4 18h16"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M10 8.6V6.3a2 2 0 0 1 4 0V8.6"/></svg></span><span className="pnum">PILLAR 01</span><h3>Construction &amp; Design-Build</h3><ul>
      <li><b>Healthcare</b> &mdash; medical, dental, surgery centers, eye clinics</li>
      <li><b>Commercial</b> &mdash; retail, restaurant, office, tenant improvement</li>
      <li><b>Industrial</b> &mdash; warehouses, cold storage, manufacturing</li>
      <li><b>Preconstruction</b> &mdash; budgeting, planning, scheduling</li>
      <li><b>Commissioning</b> &mdash; quality assurance and handover</li>
      <li><b>VDC</b> &mdash; Virtual Design &amp; Construction</li></ul></div>
      <div className="pillar tilt"><span className="picon"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg></span><span className="pnum">PILLAR 02</span><h3>Energy &amp; Power</h3><ul>
      <li><b>Solar</b> &mdash; solar battery system design</li>
      <li><b>Storage</b> &mdash; lithium-ion deployment for backup power and peak shaving</li></ul></div>
      <div className="pillar tilt"><span className="picon"><svg viewBox="0 0 24 24"><path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.8 10.7c.8.7 1.3 1.4 1.3 2.3h5c0-.9.5-1.6 1.3-2.3A6 6 0 0 0 12 3z"/></svg></span><span className="pnum">PILLAR 03</span><h3>Lighting Systems <span className="tag-new">New</span></h3><ul>
      <li><b>LED</b> &mdash; interior, exterior, and architectural fixtures</li>
      <li><b>PoE</b> &mdash; Power-over-Ethernet, network-powered smart lighting</li>
      <li><b>Decorative</b> &mdash; chandeliers, pendants, sconces, feature lighting</li>
      <li><b>Controls</b> &mdash; dimming and building-management integration</li></ul></div>
      <div className="pillar tilt"><span className="picon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01"/><path d="M7 16.5h.01"/><path d="M11 7.5h6"/><path d="M11 16.5h6"/></svg></span><span className="pnum">PILLAR 04</span><h3>Mission-Critical Infrastructure</h3><ul>
      <li><b>Data</b> &mdash; data center design and build</li>
      <li><b>Telecom</b> &mdash; cell and telecom site deployment</li></ul></div>
      <div className="pillar tilt"><span className="picon"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 7-7 8.5C8 18 5 15.5 5 11V6z"/><path d="M9 12l2 2 4-4"/></svg></span><span className="pnum">PILLAR 05</span><h3>Security Systems</h3><ul>
      <li><b>Access</b> &mdash; access control system design and installation</li>
      <li><b>Perimeter</b> &mdash; site and perimeter security integration</li></ul></div>
      <div className="pillar tilt"><span className="picon"><svg viewBox="0 0 24 24"><path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="M4 7l8 4 8-4"/><path d="M12 11v10"/></svg></span><span className="pnum">PILLAR 06</span><h3>Sourcing &amp; Delivery</h3><ul>
      <li><b>Sourcing</b> &mdash; construction materials and equipment</li>
      <li><b>Build</b> &mdash; full-scope construction services</li></ul></div>
      </div>
      </div>
      </section>

      <section className="program" id="program">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">Where we fit &mdash; Kuwait program</span>
      <h2>Mapped to the flagship projects.</h2>
      <p>UDGOK delivers the building, systems, and sourcing packages inside the program&rsquo;s landmark developments. Select a project to see the scope.</p>
      </div>
      <div className="scaleband reveal">
      <div className="bignum"><span className="u">$</span>8.5B<span className="u">+</span></div>
      <div className="slabel">named value across the <b>new airport</b> and <b>Mubarak Al-Kabir port</b> alone &mdash; two of five flagship projects UDGOK is positioned to serve.</div>
      </div>
      <div className="prj-list reveal" id="prjList">
      <div className="prj open"><button className="prj-btn" aria-expanded="true"><span className="prj-code">PRJ.01</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><path d="M2 21h20"/><path d="M5 21V8h6v13"/><path d="M11 21v-7h5v7"/><path d="M7 11h2M7 14.5h2"/></svg></span>New housing cities</span><span className="prj-val">Multi-site</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">Scope</div><div className="prj-scope">
      <span className="chip">Hospitals &amp; clinics</span><span className="chip">Schools, retail &amp; community buildings</span><span className="chip">Interior &amp; exterior LED lighting</span><span className="chip">On-site solar &amp; battery power</span><span className="chip">Access control &amp; security</span><span className="chip">Materials &amp; equipment sourcing</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.02</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.6a3 3 0 0 1 0 4.8"/><path d="M18.5 20a6 6 0 0 0-3.2-5.3"/></svg></span>Labor city</span><span className="prj-val">Multi-site</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">Scope</div><div className="prj-scope">
      <span className="chip">Worker clinics</span><span className="chip">Dining &amp; retail / service buildings</span><span className="chip">Cold storage &amp; food facilities</span><span className="chip">Interior &amp; area lighting</span><span className="chip">Backup power (solar + lithium-ion)</span><span className="chip">Access control &amp; security</span><span className="chip">Full sourcing &amp; delivery</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.03</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><path d="M12 2.5c-.8 0-1.3 1-1.3 2.2v3.9L3 13v1.8l7.7-2.2v4l-2 1.4V21l3.3-.9 3.3.9v-1.8l-2-1.4v-4L21 16.8V15l-7.7-4.4V4.7c0-1.2-.5-2.2-1.3-2.2z"/></svg></span>New airport</span><span className="prj-val has">$4B</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">Scope</div><div className="prj-scope">
      <span className="chip">Terminal commercial fit-out &amp; tenant improvement</span><span className="chip">Architectural, decorative &amp; PoE lighting</span><span className="chip">On-site data center &amp; telecom / cell sites</span><span className="chip">Access control &amp; security systems</span><span className="chip">Backup power &amp; energy storage</span><span className="chip">Cargo &amp; catering cold storage</span><span className="chip">Sourcing</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.04</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="1.8"/><path d="M12 6.3V20"/><path d="M8.5 9h7"/><path d="M5 12.5a7 7 0 0 0 14 0"/><path d="M5 12.5l-2 .6M5 12.5l1.6 1.8M19 12.5l2 .6M19 12.5l-1.6 1.8"/></svg></span>Mubarak Al-Kabir port</span><span className="prj-val has">$4.5B</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">Scope</div><div className="prj-scope">
      <span className="chip">Warehouses, cold storage &amp; industrial buildings</span><span className="chip">High-mast, area &amp; flood lighting</span><span className="chip">Access control &amp; perimeter security</span><span className="chip">Power &amp; energy storage</span><span className="chip">Telecom site deployment</span><span className="chip">Materials &amp; equipment sourcing</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.05</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><path d="M12 9.5V21"/><path d="M8.5 21h7"/><circle cx="12" cy="7" r="1.6"/><path d="M8.7 10.3a4.5 4.5 0 0 1 6.6 0"/><path d="M6 8a8 8 0 0 1 12 0"/></svg></span>Data &amp; telecom infrastructure</span><span className="prj-val">National</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">Scope</div><div className="prj-scope">
      <span className="chip">Data center design &amp; build</span><span className="chip">PoE network-powered lighting</span><span className="chip">Physical access control</span><span className="chip">Supporting power &amp; backup systems</span>
      </div></div></div></div>
      </div>
      </div>
      </section>

      <section className="lighting">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">Lighting &mdash; delivered with our partners</span>
      <h2>From hotel lobby to data hall, lit by specialists.</h2>
      <p>UDGOK&rsquo;s lighting scope is delivered with two established partners &mdash; spanning decorative hospitality fixtures to network-powered smart lighting.</p>
      </div>
      <div className="lite-grid stagger">
      <div className="lite-card tilt"><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><path d="M12 3v3"/><path d="M5 6h14"/><path d="M6 6v2.2M12 6v2.2M18 6v2.2"/><circle cx="6" cy="11" r="2.6"/><circle cx="12" cy="11" r="2.6"/><circle cx="18" cy="11" r="2.6"/></svg></span><span className="k">Partner 01</span><h3>Estelle&rsquo;s Lighting</h3>
      <p>Custom hospitality and commercial lighting &mdash; chandeliers, sconces, architectural and exterior fixtures, with controls.</p>
      <div className="meta">Hospitality &amp; commercial &nbsp;<span>/</span>&nbsp; Gulf-region offices</div></div>
      <div className="lite-card tilt"><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 9V4M12 15v5M9 12H4M15 12h5"/><circle cx="12" cy="4" r="1.5"/><circle cx="12" cy="20" r="1.5"/><circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/></svg></span><span className="k">Partner 02</span><h3>PoE Lighting</h3>
      <p>Power-over-Ethernet lighting &mdash; driverless, network-powered LED fixtures with smart controls and IoT integration.</p>
      <div className="meta">Power-over-Ethernet &nbsp;<span>/</span>&nbsp; Smart &amp; networked</div></div>
      </div>
      </div>
      </section>

      <footer id="contact">
      <span className="glow"></span>
      <div className="wrap">
      <div className="reveal">
      <span className="eyebrow" style={{display:"block",marginBottom:"22px"}}>Let&rsquo;s build it</span>
      <div className="ftitle">Ready to map UDGOK into the <span className="shimmer">Kuwait program.</span></div>
      <a href="/contact" className="footer-cta">Start a service request &rarr;</a>
      </div>
      <div className="contactrow reveal">
      <a href="mailto:projects@udgok.com" className="primary">projects@udgok.com</a>
      <a href="https://udgok.com" target="_blank" rel="noopener">udgok.com</a>
      <a href="https://z1power.com" target="_blank" rel="noopener">z1power.com</a>
      <a href="https://solar-tec.com" target="_blank" rel="noopener">solar-tec.com</a>
      </div>
      <div className="foot-base"><div className="b">UDGOK<span className="dot">.</span></div><LiveClock variant="full" /></div>
      </div>
      </footer>    </>
  );
}
