"use client";

import { useEffect, useMemo, useState } from "react";
import LiveClock from "./LiveClock";

const PROJECTS = [
  "New housing cities",
  "Labor city",
  "New airport",
  "Mubarak Al-Kabir port",
  "Data & telecom infrastructure",
  "Other / multiple",
];

const PILLARS = [
  { key: "construction", name: "Construction & Design-Build", subs: ["Healthcare", "Commercial", "Industrial", "Preconstruction", "Commissioning", "VDC"] },
  { key: "energy", name: "Energy & Power", subs: ["Solar", "Storage"] },
  { key: "lighting", name: "Lighting Systems", subs: ["LED", "PoE", "Decorative", "Controls"] },
  { key: "mission", name: "Mission-Critical Infrastructure", subs: ["Data center", "Telecom"] },
  { key: "security", name: "Security Systems", subs: ["Access control", "Perimeter"] },
  { key: "sourcing", name: "Sourcing & Delivery", subs: ["Materials sourcing", "Full-scope build"] },
];

const BUDGETS = ["To be discussed", "Under $5M", "$5M – $25M", "$25M – $100M", "$100M+"];
const TIMELINES = ["Planning stage", "Immediate", "1 – 3 months", "3 – 6 months", "6 – 12 months"];

const CheckMark = () => (
  <svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9" /></svg>
);

export default function ContactPage() {
  const [details, setDetails] = useState({ name: "", company: "", email: "", phone: "" });
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState({}); // { pillarKey: [subs...] }
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // nav solidify + reveals
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav && nav.classList.toggle("solid", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const toggleProject = (p) =>
    setProjects((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const togglePillar = (key) =>
    setServices((prev) => {
      const next = { ...prev };
      if (key in next) delete next[key];
      else next[key] = [];
      return next;
    });

  const toggleSub = (key, sub) =>
    setServices((prev) => {
      const cur = prev[key] || [];
      const subs = cur.includes(sub) ? cur.filter((s) => s !== sub) : [...cur, sub];
      return { ...prev, [key]: subs };
    });

  const serviceCount = Object.keys(services).length;

  const summary = useMemo(() => {
    const lines = [];
    lines.push("SERVICE REQUEST — UDGOK / Kuwait Infrastructure Program");
    lines.push("");
    lines.push(`Name:    ${details.name || "-"}`);
    lines.push(`Company: ${details.company || "-"}`);
    lines.push(`Email:   ${details.email || "-"}`);
    lines.push(`Phone:   ${details.phone || "-"}`);
    lines.push("");
    lines.push(`Project(s): ${projects.length ? projects.join(", ") : "-"}`);
    lines.push("");
    lines.push("Services requested:");
    if (serviceCount === 0) lines.push("  - (none selected yet)");
    else {
      PILLARS.forEach((p) => {
        if (p.key in services) {
          const subs = services[p.key];
          lines.push(`  - ${p.name}${subs.length ? ": " + subs.join(", ") : ""}`);
        }
      });
    }
    lines.push("");
    lines.push(`Estimated scale: ${budget}`);
    lines.push(`Timeline:        ${timeline}`);
    lines.push("");
    lines.push("Details:");
    lines.push(message || "-");
    return lines.join("\n");
  }, [details, projects, services, serviceCount, budget, timeline, message]);

  const validate = () => {
    const e = {};
    if (!details.name.trim()) e.name = true;
    if (!details.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = true;
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const servicesText = () => {
    if (Object.keys(services).length === 0) return "-";
    return PILLARS.filter((p) => p.key in services)
      .map((p) => { const subs = services[p.key]; return p.name + (subs.length ? " (" + subs.join(", ") + ")" : ""); })
      .join("; ");
  };

  const submit = async () => {
    if (!validate()) {
      document.querySelector(".field.err input")?.focus();
      return;
    }
    setSending(true);
    setSent(false);
    try {
      const res = await fetch("https://formsubmit.co/ajax/yasir@udgok.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Service request — ${details.company || details.name} (Kuwait program)`,
          _template: "table",
          _captcha: "false",
          Name: details.name,
          Company: details.company || "-",
          Email: details.email,
          Phone: details.phone || "-",
          Projects: projects.length ? projects.join(", ") : "-",
          Services: servicesText(),
          "Estimated scale": budget,
          Timeline: timeline,
          Details: message || "-",
        }),
      });
      if (res.ok) setSent(true);
      else setSent("error");
    } catch (err) {
      setSent("error");
    } finally {
      setSending(false);
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setSent("copied"); } catch (_) {}
  };

  return (
    <>
      <div id="grain" />
      <div id="progress" style={{ display: "none" }} />

      <nav id="nav">
        <a href="/" className="brand">UDGOK<span className="dot">.</span></a>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <span className="nav-clock"><LiveClock variant="compact" /></span>
          <a href="/" className="backlink">Home</a>
        </div>
      </nav>

      <main className="page">
        <section className="contact-hero">
          <span className="glow" />
          <div className="wrap reveal">
            <span className="eyebrow">Service request — Kuwait program</span>
            <h1>Tell us exactly what you <span className="shimmer">need.</span></h1>
            <p>
              Specify the projects and systems you&rsquo;re scoping and UDGOK will respond with the
              right team and packages. The more detail you share, the sharper our proposal.
            </p>
            <div className="hero-status" style={{ marginTop: "28px" }}>
              <LiveClock variant="full" />
            </div>
            <div className="contact-info">
              <a className="ci" href="mailto:yasir@udgok.com"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>yasir@udgok.com</a>
              <a className="ci" href="tel:+19185203823"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>+1.918.520.3823</a>
              <a className="ci" href="https://wa.me/19185203823" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 8.5c0 3.5 3.5 7 7 7"/></svg>WhatsApp</a>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="form">
            {/* 01 — details */}
            <div className="fsec reveal">
              <div className="fsec-head"><span className="fsec-num">01</span><span className="fsec-title">Your details</span></div>
              <div className="grid2">
                <div className={"field" + (err.name ? " err" : "")}>
                  <label>Full name *</label>
                  <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} placeholder="Enter your name" />
                </div>
                <div className="field">
                  <label>Company / organization</label>
                  <input value={details.company} onChange={(e) => setDetails({ ...details, company: e.target.value })} placeholder="Organization name" />
                </div>
                <div className={"field" + (err.email ? " err" : "")}>
                  <label>Email *</label>
                  <input type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder="name@company.com" />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} placeholder="+965 …" />
                </div>
              </div>
            </div>

            {/* 02 — projects */}
            <div className="fsec reveal">
              <div className="fsec-head"><span className="fsec-num">02</span><span className="fsec-title">Which project(s)?</span></div>
              <div className="toggle-row">
                {PROJECTS.map((p) => (
                  <span key={p} className={"toggle" + (projects.includes(p) ? " on" : "")} onClick={() => toggleProject(p)} role="button" tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleProject(p)}>{p}</span>
                ))}
              </div>
            </div>

            {/* 03 — services */}
            <div className="fsec reveal">
              <div className="fsec-head">
                <span className="fsec-num">03</span><span className="fsec-title">Services required</span>
                {serviceCount > 0 && <span className="req-count" style={{ marginLeft: "auto" }}>{serviceCount} selected</span>}
              </div>
              <div className="svc-grid">
                {PILLARS.map((p) => {
                  const on = p.key in services;
                  return (
                    <div key={p.key} className={"svc" + (on ? " on" : "")} onClick={() => togglePillar(p.key)}>
                      <div className="svc-top">
                        <span className="svc-name">{p.name}</span>
                        <span className="svc-check"><CheckMark /></span>
                      </div>
                      <div className="svc-subs" onClick={(e) => e.stopPropagation()}>
                        {p.subs.map((s) => (
                          <span key={s} className={"subchip" + ((services[p.key] || []).includes(s) ? " on" : "")} onClick={() => toggleSub(p.key, s)}>{s}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 04 — scale & timeline */}
            <div className="fsec reveal">
              <div className="fsec-head"><span className="fsec-num">04</span><span className="fsec-title">Scale &amp; timeline</span></div>
              <div className="grid2">
                <div className="field">
                  <label>Estimated scale</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Timeline</label>
                  <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 05 — details */}
            <div className="fsec reveal">
              <div className="fsec-head"><span className="fsec-num">05</span><span className="fsec-title">Project details</span></div>
              <div className="field">
                <label>Anything specific we should know</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Scope, sites, key requirements, deadlines, partners involved…" />
              </div>
            </div>

            <div className="submit-row reveal">
              <button className="btn-primary" onClick={submit} disabled={sending}>{sending ? "Sending\u2026" : "Send request"}</button>
              <button className="btn-ghost" onClick={copy}>Copy summary</button>
              <span className="form-note">Sends your request straight to UDGOK. Prefer to send manually? Use &ldquo;Copy summary&rdquo; to copy it to your clipboard.</span>
            </div>

            {sent === true && <div className="sent-banner reveal in">Thank you &mdash; your request has been sent to UDGOK. We&rsquo;ll be in touch shortly.</div>}
            {sent === "error" && <div className="sent-banner err reveal in">Sorry, that didn&rsquo;t go through. Please email <a href="mailto:yasir@udgok.com">yasir@udgok.com</a> directly, or try again.</div>}
            {sent === "copied" && <div className="sent-banner reveal in">Summary copied to your clipboard.</div>}
          </div>
        </div>

        <footer>
          <span className="glow" />
          <div className="wrap">
            <div className="foot-base">
              <a href="/" className="b">UDGOK<span className="dot">.</span></a>
              <LiveClock variant="full" />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
