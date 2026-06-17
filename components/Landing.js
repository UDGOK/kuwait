"use client";

import { useEffect, useState } from "react";
import LiveClock from "./LiveClock";
import { useLang, LangToggle } from "./i18n";

const DETAILS = {
  construction: { num: "01", accent: "ember", title: "Construction & Design-Build",
    lead: "Full-scope vertical construction and design-build — from healthcare and commercial to heavy industrial, managed end to end.",
    groups: [
      { label: "Sectors", items: ["Healthcare — hospitals, clinics, surgery & eye centers", "Commercial — retail, F&B, office, tenant improvement", "Industrial — warehouses, cold storage, manufacturing", "Mixed-use & community buildings"] },
      { label: "Delivery", items: ["Preconstruction — budgeting & value engineering", "VDC / BIM coordination", "Quality assurance & commissioning", "Turnkey handover"] },
    ] },
  energy: { num: "02", accent: "green", title: "Energy & Power",
    lead: "Clean, resilient power across every site — solar generation, lithium battery storage, and smart EV charging, delivered with our energy partners.",
    images: [
      { src: "https://evbolt.com/wp-content/uploads/2024/01/vision-360-1-1-538x1024.png", alt: "EVBOLT Vision 360" },
      { src: "https://evbolt.com/wp-content/uploads/2022/08/Apex-10-715x1024.png", alt: "EVBOLT Apex 10" },
      { src: "https://www.z1power.com/cdn/shop/files/Z1Power_Homepage_Image.png?v=1778782659&width=1200", alt: "Z1Power LiFePO4" },
    ],
    groups: [
      { label: "Solar — solar-tec", items: ["On-site photovoltaic generation", "Solar + storage integration", "Grid-tie & off-grid systems"] },
      { label: "Battery storage — z1power", items: ["LiFePO4 systems, UL 9540A certified", "Backup power & peak shaving", "4,000+ cycles, 10-year design life"] },
      { label: "EV charging — EVBOLT", items: ["AC Level II chargers, 7.5–19 kW", "DC fast charging, 30–240 kW (to 320 kW)", "Networked management & EVBOLT+ app", "Hospitality, retail, fleet & parking"] },
    ] },
  lighting: { num: "03", accent: "ember", title: "Lighting Systems",
    lead: "Specification-grade lighting for every environment — architectural, decorative, and network-powered — delivered with Estelle's Lighting and PoE Lighting.",
    groups: [
      { label: "Fixtures — Estelle's Lighting", items: ["Interior, exterior & architectural LED", "Decorative — chandeliers, pendants, sconces", "Hospitality & commercial grade", "Gulf-region offices (Oman, Riyadh)"] },
      { label: "PoE Lighting", items: ["Power-over-Ethernet, network-powered", "Driverless, low-voltage, smart-controlled", "IoT & building-management integration"] },
      { label: "Controls", items: ["Dimming, scenes & scheduling", "DALI / 0–10V & wireless control"] },
    ] },
  mission: { num: "04", accent: "ember", title: "Mission-Critical Infrastructure",
    lead: "AI, HPC, and mission-critical data center delivery — engineered for accelerated compute, uptime, and resilience.",
    groups: [
      { label: "AI & data centers", items: ["Accelerated compute halls — NVIDIA & Cerebras", "Server hall design & build", "White-space fit-out & equipment rooms"] },
      { label: "Power & cooling", items: ["High-density power & busway", "Direct-to-chip & liquid cooling", "UPS, N+1 redundancy & BMS"] },
    ] },
  security: { num: "05", accent: "ember", title: "Security Systems",
    lead: "Integrated electronic security — from access control to perimeter protection and surveillance.",
    groups: [
      { label: "Access & identity", items: ["Access control design & installation", "Credential & visitor management", "Door hardware integration"] },
      { label: "Surveillance & perimeter", items: ["CCTV / IP video systems", "Perimeter intrusion detection", "Command & monitoring integration"] },
    ] },
  sourcing: { num: "06", accent: "ember", title: "Sourcing & Delivery",
    lead: "Global sourcing and full-scope build — materials, equipment, and logistics managed to the program's standards.",
    groups: [
      { label: "Sourcing", items: ["Construction materials & equipment", "Vetted supplier network", "Specification & compliance"] },
      { label: "Delivery", items: ["Logistics & expediting", "Full-scope construction services", "On-site delivery & install"] },
    ] },
  estelles: { kicker: "Lighting partner · Estelle's Group", accent: "ember", title: "Estelle's Group",
    lead: "Our lighting partner and a full hospitality & multi-family group — certified lighting, smart PoE controls, LED mirrors, architectural doors, solar and EV charging, delivered across North America and the Gulf.",
    pdf: "/Estelles-Group-Company-Profile.pdf",
    stats: [
      { value: "1,600+", label: "Projects delivered" },
      { value: "15+", label: "Hospitality brands" },
      { value: "IHG", label: "Certified vendor" },
      { value: "2008", label: "Est. in Houston" },
    ],
    groups: [
      { label: "Lighting", items: ["Interior, architectural & exterior LED", "Lighted mirrors & bespoke fixtures", "Hospitality, multi-family & commercial"] },
      { label: "Smart & sustainable", items: ["PoE smart lighting & controls (LED Industries)", "Solar energy (SolarTec)", "EV charging (EVBOLT)"] },
      { label: "Group of companies", items: ["Estelles & Impulse Lighting", "Dezine Multi-Family Lighting", "MAK Door Industries — fire-rated doors", "Aqua Mirrors & Smart Glass", "Bloorz — vanities, shower & surrounds"] },
      { label: "Credentials & reach", items: ["IHG-certified vendor (1 of 2 in N. America)", "cUL, CSA, UL & DarkSky rated", "1,600+ projects since 2008", "Houston HQ · Toronto · South Asia"] },
    ] },
};

export default function Landing() {
  const [active, setActive] = useState(null);
  const [closing, setClosing] = useState(false);
  const open = (k) => { setClosing(false); setActive(k); };
  const close = () => { setClosing(true); setTimeout(() => { setActive(null); setClosing(false); }, 280); };
  const onBackdrop = (e) => { if (e.target === e.currentTarget) close(); };
  const cardProps = (k) => ({ onClick: () => open(k), role: "button", tabIndex: 0, onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(k); } } });
  const { t } = useLang();

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [active]);

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

    // cursor spotlight — update only on movement (CSS transition smooths it); no perpetual rAF
    const spot = document.getElementById("spot");
    let queued = false;
    let mx = 0, my = 0;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => { queued = false; if (spot) spot.style.transform = `translate(${mx}px,${my}px)`; });
      }
    };
    if (spot) {
      if (!reduce && fine) window.addEventListener("mousemove", onMove, { passive: true });
      else spot.style.opacity = "0";
    }

    // pause hero glow animation once the hero scrolls out of view
    const hero = document.querySelector(".hero");
    let heroIO;
    if (hero && !reduce) {
      heroIO = new IntersectionObserver(
        (es) => es.forEach((e) => hero.classList.toggle("paused", !e.isIntersecting)),
        { threshold: 0 }
      );
      heroIO.observe(hero);
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
      io.disconnect(); sio.disconnect();
      if (heroIO) heroIO.disconnect();
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
      <div style={{display:"flex",alignItems:"center",gap:"14px"}}><span className="nav-clock"><LiveClock variant="compact" /></span><LangToggle /><a href="/contact" className="nav-cta">{t("Contact")}</a></div>
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
      <h1 className="rise d2">{t("The systems behind ")}<span className="shimmer">{t("Kuwait\u2019s flagship build.")}</span></h1>
      <p className="lede rise d3">{t("UDGOK delivers the buildings, power, lighting, and mission-critical systems across the program\u2019s landmark projects \u2014 designed, powered, lit, secured, and sourced.")}</p>
      <div className="hero-status rise d3"><LiveClock variant="full" /></div>
      <div className="hero-meta rise d4">
      <div className="hm"><span className="n">6</span><span className="l">{t("Capability pillars")}</span></div>
      <div className="hm"><span className="n">5</span><span className="l">{t("Flagship projects")}</span></div>
      <div className="hm"><span className="n">$8.5B+</span><span className="l">{t("Named value")}</span></div>
      </div>
      </div>
      <div className="scrollcue rise d5"><span className="bar"></span>{t("Scroll")}</div>
      </header>

      <section className="statement">
      <span className="glow"></span>
      <div className="wrap reveal">
      <span className="eyebrow" style={{display:"block",marginBottom:"22px"}}>{t("The brief")}</span>
      <h2><span className="q">{t("Kuwait is building at national scale.")}</span>{t(" UDGOK delivers the facility and systems scope inside it \u2014 ")}<span className="shimmer">{t("designed, powered, lit, secured, and sourced.")}</span></h2>
      </div>
      </section>

      <section className="stats">
      <span className="glow"></span>
      <div className="wrap">
      <div className="stat-grid reveal" id="statGrid">
      <div className="stat"><div className="num" data-count="6">0</div><div className="lab">{t("Capability pillars")}</div></div>
      <div className="stat"><div className="num" data-count="5">0</div><div className="lab">{t("Flagship projects")}</div></div>
      <div className="stat"><div className="num"><span className="u">$</span><span data-count="8.5" data-dec="1">0</span><span className="u">B+</span></div><div className="lab">{t("Named project value")}</div></div>
      </div>
      </div>
      </section>

      <section className="pillars">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">{t("Services we provide")}</span>
      <h2>{t("Six pillars. One accountable delivery partner.")}</h2>
      <p>{t("A complete capability set across the program \u2014 from healthcare design-build to network-powered lighting and mission-critical infrastructure.")}</p>
      </div>
      <div className="pillar-grid stagger" id="pillarGrid">
      <div className="pillar tilt" {...cardProps("construction")}><span className="picon"><svg viewBox="0 0 24 24"><path d="M4 18h16"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M10 8.6V6.3a2 2 0 0 1 4 0V8.6"/></svg></span><span className="pnum">PILLAR 01</span><h3>{t("Construction & Design-Build")}</h3><ul>
      <li><b>{t("Healthcare")}</b> {t("\u2014 medical, dental, surgery centers, eye clinics")}</li>
      <li><b>{t("Commercial")}</b> {t("\u2014 retail, restaurant, office, tenant improvement")}</li>
      <li><b>{t("Industrial")}</b> {t("\u2014 warehouses, cold storage, manufacturing")}</li>
      <li><b>{t("Preconstruction")}</b> {t("\u2014 budgeting, planning, scheduling")}</li>
      <li><b>{t("Commissioning")}</b> {t("\u2014 quality assurance and handover")}</li>
      <li><b>{t("VDC")}</b> {t("\u2014 Virtual Design & Construction")}</li></ul></div>
      <div className="pillar tilt energy" {...cardProps("energy")}><span className="picon"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg></span><span className="pnum">PILLAR 02</span><h3>{t("Energy & Power")}</h3><ul>
      <li><b>{t("Solar")}</b> {t("\u2014 on-site solar generation (with solar-tec)")}</li>
      <li><b>{t("Storage")}</b> {t("\u2014 lithium-ion battery systems for backup power and peak shaving (with z1power)")}</li>
      <li><b>{t("EV Charging")}</b> {t("\u2014 smart AC & DC fast charging (with EVBOLT)")}</li></ul></div>
      <div className="pillar tilt" {...cardProps("lighting")}><span className="picon"><svg viewBox="0 0 24 24"><path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.8 10.7c.8.7 1.3 1.4 1.3 2.3h5c0-.9.5-1.6 1.3-2.3A6 6 0 0 0 12 3z"/></svg></span><span className="pnum">PILLAR 03</span><h3>{t("Lighting Systems")} <span className="tag-new">{t("New")}</span></h3><ul>
      <li><b>{t("LED")}</b> {t("\u2014 interior, exterior, and architectural fixtures")}</li>
      <li><b>{t("PoE")}</b> {t("\u2014 Power-over-Ethernet, network-powered smart lighting")}</li>
      <li><b>{t("Decorative")}</b> {t("\u2014 chandeliers, pendants, sconces, feature lighting")}</li>
      <li><b>{t("Controls")}</b> {t("\u2014 dimming and building-management integration")}</li></ul></div>
      <div className="pillar tilt" {...cardProps("mission")}><span className="picon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01"/><path d="M7 16.5h.01"/><path d="M11 7.5h6"/><path d="M11 16.5h6"/></svg></span><span className="pnum">PILLAR 04</span><h3>{t("Mission-Critical Infrastructure")}</h3><ul>
      <li><b>{t("AI data centers")}</b> {t("\u2014 design & execution (NVIDIA, Cerebras)")}</li>
      <li><b>{t("Resilience")}</b> {t("\u2014 UPS, redundancy, power and cooling")}</li></ul></div>
      <div className="pillar tilt" {...cardProps("security")}><span className="picon"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 7-7 8.5C8 18 5 15.5 5 11V6z"/><path d="M9 12l2 2 4-4"/></svg></span><span className="pnum">PILLAR 05</span><h3>{t("Security Systems")}</h3><ul>
      <li><b>{t("Access")}</b> {t("\u2014 access control system design and installation")}</li>
      <li><b>{t("Perimeter")}</b> {t("\u2014 site and perimeter security integration")}</li></ul></div>
      <div className="pillar tilt" {...cardProps("sourcing")}><span className="picon"><svg viewBox="0 0 24 24"><path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="M4 7l8 4 8-4"/><path d="M12 11v10"/></svg></span><span className="pnum">PILLAR 06</span><h3>{t("Sourcing & Delivery")}</h3><ul>
      <li><b>{t("Sourcing")}</b> {t("\u2014 construction materials and equipment")}</li>
      <li><b>{t("Build")}</b> {t("\u2014 full-scope construction services")}</li></ul></div>
      </div>
      </div>
      </section>

      <section className="program" id="program">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">{t("Where we fit \u2014 Kuwait program")}</span>
      <h2>{t("Mapped to the flagship projects.")}</h2>
      <p>{t("UDGOK delivers the building, systems, and sourcing packages inside the program\u2019s landmark developments. Select a project to see the scope.")}</p>
      </div>
      <div className="scaleband reveal">
      <div className="bignum"><span className="u">$</span>8.5B<span className="u">+</span></div>
      <div className="slabel">{t("named value across the ")}<b>{t("new airport")}</b>{t(" and ")}<b>{t("Mubarak Al-Kabir port")}</b>{t(" alone \u2014 two of five flagship projects UDGOK is positioned to serve.")}</div>
      </div>
      <div className="prj-list reveal" id="prjList">
      <div className="prj open"><button className="prj-btn" aria-expanded="true"><span className="prj-code">PRJ.01</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><path d="M2 21h20"/><path d="M5 21V8h6v13"/><path d="M11 21v-7h5v7"/><path d="M7 11h2M7 14.5h2"/></svg></span>{t("New housing cities")}</span><span className="prj-val">{t("Multi-site")}</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">{t("Scope")}</div><div className="prj-scope">
      <span className="chip">{t("Hospitals & clinics")}</span><span className="chip">{t("Schools, retail & community buildings")}</span><span className="chip">{t("Interior & exterior LED lighting")}</span><span className="chip energy">{t("On-site solar & battery power")}</span><span className="chip energy">{t("EV charging stations")}</span><span className="chip">{t("Access control & security")}</span><span className="chip">{t("Materials & equipment sourcing")}</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.02</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.6a3 3 0 0 1 0 4.8"/><path d="M18.5 20a6 6 0 0 0-3.2-5.3"/></svg></span>{t("Labor city")}</span><span className="prj-val">{t("Multi-site")}</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">{t("Scope")}</div><div className="prj-scope">
      <span className="chip">{t("Worker clinics")}</span><span className="chip">{t("Dining & retail / service buildings")}</span><span className="chip">{t("Cold storage & food facilities")}</span><span className="chip">{t("Interior & area lighting")}</span><span className="chip energy">{t("Backup power (solar + lithium-ion)")}</span><span className="chip">{t("Access control & security")}</span><span className="chip">{t("Full sourcing & delivery")}</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.03</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><path d="M12 2.5c-.8 0-1.3 1-1.3 2.2v3.9L3 13v1.8l7.7-2.2v4l-2 1.4V21l3.3-.9 3.3.9v-1.8l-2-1.4v-4L21 16.8V15l-7.7-4.4V4.7c0-1.2-.5-2.2-1.3-2.2z"/></svg></span>{t("New airport")}</span><span className="prj-val has">$4B</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">{t("Scope")}</div><div className="prj-scope">
      <span className="chip">{t("Terminal commercial fit-out & tenant improvement")}</span><span className="chip">{t("Architectural, decorative & PoE lighting")}</span><span className="chip">{t("On-site data center & equipment rooms")}</span><span className="chip">{t("Access control & security systems")}</span><span className="chip energy">{t("Backup power & energy storage")}</span><span className="chip energy">{t("EV charging plaza")}</span><span className="chip">{t("Cargo & catering cold storage")}</span><span className="chip">{t("Sourcing")}</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.04</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="1.8"/><path d="M12 6.3V20"/><path d="M8.5 9h7"/><path d="M5 12.5a7 7 0 0 0 14 0"/><path d="M5 12.5l-2 .6M5 12.5l1.6 1.8M19 12.5l2 .6M19 12.5l-1.6 1.8"/></svg></span>{t("Mubarak Al-Kabir port")}</span><span className="prj-val has">$4.5B</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">{t("Scope")}</div><div className="prj-scope">
      <span className="chip">{t("Warehouses, cold storage & industrial buildings")}</span><span className="chip">{t("High-mast, area & flood lighting")}</span><span className="chip">{t("Access control & perimeter security")}</span><span className="chip energy">{t("Power & energy storage")}</span><span className="chip energy">{t("Fleet EV charging")}</span><span className="chip">{t("Materials & equipment sourcing")}</span>
      </div></div></div></div>
      <div className="prj"><button className="prj-btn" aria-expanded="false"><span className="prj-code">PRJ.05</span><span className="prj-name"><span className="prj-ic"><svg viewBox="0 0 24 24"><path d="M12 9.5V21"/><path d="M8.5 21h7"/><circle cx="12" cy="7" r="1.6"/><path d="M8.7 10.3a4.5 4.5 0 0 1 6.6 0"/><path d="M6 8a8 8 0 0 1 12 0"/></svg></span>{t("Data & telecom infrastructure")}</span><span className="prj-val">{t("National")}</span><span className="prj-ico"><i></i></span></button>
      <div className="prj-panel"><div className="prj-panel-inner"><div className="col-l">{t("Scope")}</div><div className="prj-scope">
      <span className="chip">{t("AI / HPC data centers")}</span><span className="chip">{t("Data center design & build")}</span><span className="chip">{t("PoE network-powered lighting")}</span><span className="chip">{t("Physical access control")}</span><span className="chip energy">{t("Supporting power & backup systems")}</span>
      </div></div></div></div>
      </div>
      </div>
      </section>

      <section className="ai" id="ai">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">{t("AI infrastructure \u2014 design & execution")}</span>
      <h2>{t("Built for the ")}<span className="shimmer">{t("AI era.")}</span></h2>
      <p>{t("UDGOK designs and executes AI and high-performance data centers end to end \u2014 white space, high-density power, advanced cooling, and network fabric \u2014 engineered for the most demanding accelerated-compute platforms, and delivered complete with our dedicated partners.")}</p>
      </div>
      <div className="ai-platforms reveal">
      <span className="ai-pl-label">{t("Designed for")}</span>
      <span className="ai-chip"><b>NVIDIA</b><em>{t("GPU compute clusters")}</em></span>
      <span className="ai-chip"><b>Cerebras</b><em>{t("wafer-scale AI systems")}</em></span>
      <span className="ai-chip alt"><b>{t("Your dedicated stack")}</b><em>{t("built with our partners")}</em></span>
      </div>
      <div className="ai-grid stagger">
      <div className="ai-card"><span className="ai-ic"><svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/><rect x="10.5" y="10.5" width="3" height="3" rx=".5"/></svg></span><h3>{t("Accelerated compute halls")}</h3><p>{t("High-density GPU and wafer-scale deployments \u2014 DGX / HGX-class clusters and Cerebras CS systems.")}</p></div>
      <div className="ai-card"><span className="ai-ic"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg></span><h3>{t("High-density power")}</h3><p>{t("Busway distribution, UPS, and N+1 redundancy engineered for AI rack densities.")}</p></div>
      <div className="ai-card"><span className="ai-ic"><svg viewBox="0 0 24 24"><path d="M12 3s5 5.5 5 10a5 5 0 0 1-10 0c0-4.5 5-10 5-10z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/></svg></span><h3>{t("Advanced cooling")}</h3><p>{t("Direct-to-chip and liquid cooling, rear-door heat exchangers, and thermal management.")}</p></div>
      <div className="ai-card"><span className="ai-ic"><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2.2"/><circle cx="19" cy="5.5" r="2.2"/><circle cx="19" cy="18.5" r="2.2"/><path d="M7 11l10-4.6M7 13l10 4.6"/></svg></span><h3>{t("Low-latency fabric")}</h3><p>{t("High-bandwidth network and interconnect design for training and inference at scale.")}</p></div>
      <div className="ai-card"><span className="ai-ic"><svg viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V6l7-3 7 3v15"/><path d="M9 21v-5h6v5"/><path d="M9 9h2M13 9h2M9 12.5h2M13 12.5h2"/></svg></span><h3>{t("Design-build delivery")}</h3><p>{t("Site, structure, MEP and fit-out \u2014 executed end to end and commissioned for uptime.")}</p></div>
      <div className="ai-card"><span className="ai-ic"><svg viewBox="0 0 24 24"><path d="M8 12l2.5 2.5L12 13l1.5 1.5L16 12"/><path d="M3 8l4-2 5 2 5-2 4 2v8l-4 2-5-2-5 2-4-2z"/></svg></span><h3>{t("Delivered with partners")}</h3><p>{t("We design and deliver the complete facility with our specialist engineering partners.")}</p></div>
      </div>
      </div>
      </section>

      <section className="lighting">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">{t("Lighting \u2014 delivered with our partners")}</span>
      <h2>{t("From hotel lobby to data hall, lit by specialists.")}</h2>
      <p>{t("UDGOK\u2019s lighting scope is delivered with two established partners \u2014 spanning decorative hospitality fixtures to network-powered smart lighting.")}</p>
      </div>
      <div className="lite-grid stagger">
      <div className="lite-card tilt" {...cardProps("estelles")}><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><path d="M12 3v3"/><path d="M5 6h14"/><path d="M6 6v2.2M12 6v2.2M18 6v2.2"/><circle cx="6" cy="11" r="2.6"/><circle cx="12" cy="11" r="2.6"/><circle cx="18" cy="11" r="2.6"/></svg></span><span className="k">{t("Partner 01 \u00b7 Estelle\u2019s Group")}</span><h3>Estelle&rsquo;s Lighting</h3>
      <p>{t("Our hospitality & multi-family lighting partner \u2014 certified fixtures, mirrors, doors and smart energy, delivered across North America and the Gulf.")}</p>
      <div className="meta">{t("IHG-certified")} &nbsp;<span>/</span>&nbsp; {t("1,600+ projects")} &nbsp;<span>/</span>&nbsp; cUL &middot; CSA &middot; DarkSky</div>
      <div className="lite-links"><a className="lite-link" href="https://estelleslighting.com" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>estelleslighting.com &rarr;</a><a className="lite-link alt" href="/Estelles-Group-Company-Profile.pdf" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>{t("Company profile (PDF) \u2193")}</a></div></div>
      <div className="lite-card tilt"><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 9V4M12 15v5M9 12H4M15 12h5"/><circle cx="12" cy="4" r="1.5"/><circle cx="12" cy="20" r="1.5"/><circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/></svg></span><span className="k">{t("Partner 02")}</span><h3>{t("PoE Lighting")}</h3>
      <p>{t("Power-over-Ethernet lighting \u2014 driverless, network-powered LED fixtures with smart controls and IoT integration.")}</p>
      <div className="meta">{t("Power-over-Ethernet")} &nbsp;<span>/</span>&nbsp; {t("Smart & networked")}</div><a className="lite-link" href="https://poelightingusa.com" target="_blank" rel="noopener">poelightingusa.com &rarr;</a></div>
      </div>
      </div>
      </section>

      <section className="lighting energy-sec">
      <span className="glow"></span>
      <div className="wrap">
      <div className="sec-head reveal">
      <span className="eyebrow">{t("Energy & EV charging \u2014 partner network")}</span>
      <h2>{t("Powered, stored, and ")}<span style={{ color: "var(--ev)" }}>{t("charged sustainably.")}</span></h2>
      <p>{t("UDGOK\u2019s energy scope \u2014 on-site generation, battery storage, and EV charging \u2014 is delivered with specialist partners across the program.")}</p>
      </div>
      <div className="lite-grid stagger">
      <div className="lite-card tilt energy"><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="9" height="18" rx="2"/><path d="M9.6 6.6l-2.3 4.1h2L8.7 15l3-4.7H9.3l.3-3.7z"/><path d="M13 8h2.4a1.6 1.6 0 0 1 1.6 1.6V16a1.5 1.5 0 0 0 3 0v-4.6L18.4 9.8"/></svg></span><span className="k">{t("Partner 03")}</span><h3>EVBOLT</h3>
      <p>{t("Smart & sustainable EV charging \u2014 AC Level II and DC fast chargers up to 240kW+, with networked management and the EVBOLT+ app.")}</p>
      <div className="meta">{t("AC & DC fast charging")} &nbsp;<span>/</span>&nbsp; {t("Smart & networked")}</div>
      <a className="lite-link" href="https://evbolt.com" target="_blank" rel="noopener">evbolt.com &rarr;</a></div>
      <div className="lite-card tilt energy"><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><rect x="2.5" y="7" width="16" height="10" rx="2"/><path d="M21 10.5v3"/><path d="M10.6 9l-2.2 3.4h2L9.7 15.6l3-3.7h-2.1L10.6 9z"/></svg></span><span className="k">{t("Partner 04")}</span><h3>z1power</h3>
      <p>{t("Battery energy storage \u2014 lithium-ion systems for backup power and peak shaving across program sites.")}</p>
      <div className="meta">{t("Battery storage")} &nbsp;<span>/</span>&nbsp; {t("Backup & peak shaving")}</div>
      <a className="lite-link" href="https://z1power.com" target="_blank" rel="noopener">z1power.com &rarr;</a></div>
      <div className="lite-card tilt energy"><span className="beam"></span><span className="lite-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.1 5.1l1.8 1.8M17.1 17.1l1.8 1.8M18.9 5.1l-1.8 1.8M6.9 17.1l-1.8 1.8"/></svg></span><span className="k">{t("Partner 05")}</span><h3>solar-tec</h3>
      <p>{t("Solar generation \u2014 on-site photovoltaic systems integrated with storage for clean, resilient power.")}</p>
      <div className="meta">{t("Solar PV")} &nbsp;<span>/</span>&nbsp; {t("On-site generation")}</div>
      <a className="lite-link" href="https://solar-tec.com" target="_blank" rel="noopener">solar-tec.com &rarr;</a></div>
      </div>
      </div>
      </section>

      <footer id="contact">
      <span className="glow"></span>
      <div className="wrap">
      <div className="reveal">
      <span className="eyebrow" style={{display:"block",marginBottom:"22px"}}>{t("Let\u2019s build it")}</span>
      <div className="ftitle">{t("Ready to map UDGOK into the ")}<span className="shimmer">{t("Kuwait program.")}</span></div>
      <a href="/contact" className="footer-cta">{t("Start a service request \u2192")}</a>
      </div>
      <div className="contactrow reveal">
      <a href="mailto:yasir@udgok.com" className="primary">yasir@udgok.com</a>
      <a href="tel:+19185203823">+1.918.520.3823</a>
      <a href="https://udgok.com" target="_blank" rel="noopener">udgok.com</a>
      <a href="https://z1power.com" target="_blank" rel="noopener" className="energy">z1power.com</a>
      <a href="https://solar-tec.com" target="_blank" rel="noopener" className="energy">solar-tec.com</a>
      <a href="https://evbolt.com" target="_blank" rel="noopener" className="energy">evbolt.com</a>
      </div>
      <div className="foot-base"><div className="b">UDGOK<span className="dot">.</span></div><LiveClock variant="full" /></div>
      </div>
      </footer>      {active && (() => { const d = DETAILS[active]; return (
        <div className={"modal-backdrop" + (closing ? " closing" : "")} onClick={onBackdrop}>
          <div className={"modal-card" + (d.accent === "green" ? " green" : "") + (closing ? " closing" : "")} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={close} aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
            <span className="modal-num">{d.kicker ? t(d.kicker) : t("PILLAR") + " " + d.num}</span>
            <h2 className="modal-title">{t(d.title)}</h2>
            <p className="modal-lead">{t(d.lead)}</p>
            {d.stats && (
              <div className="modal-stats">
                {d.stats.map((st) => (
                  <div className="mstat" key={st.label}><span className="mstat-v">{st.value}</span><span className="mstat-l">{t(st.label)}</span></div>
                ))}
              </div>
            )}
            {d.images && (
              <div className="modal-gallery">
                {d.images.map((im) => (
                  <figure className="mg-fig" key={im.src}>
                    <img src={im.src} alt={im.alt} loading="lazy" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <figcaption>{im.alt}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            <div className="modal-groups">
              {d.groups.map((g) => (
                <div className="mgroup" key={g.label}>
                  <h3 className="mgroup-h">{t(g.label)}</h3>
                  <ul>{g.items.map((it) => (<li key={it}>{t(it)}</li>))}</ul>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              {d.pdf && (<a className="modal-cta" href={d.pdf} target="_blank" rel="noopener">{t("Download company profile (PDF) \u2193")}</a>)}
              <a className={"modal-cta" + (d.pdf ? " ghost" : "")} href="/contact">{t("Request this service \u2192")}</a>
            </div>
          </div>
        </div>
      ); })()}
    </>
  );
}
