"use client";

import { useEffect, useState } from "react";
import { useLang } from "./i18n";

// Live world clock. Kuwait City (program locale) + Central US (UDGOK home base).
const ZONES = [
  { label: "Kuwait City", short: "KWT", tz: "Asia/Kuwait" },
  { label: "Central US", short: "CT", tz: "America/Chicago" },
];

function fmt(date, tz, seconds = true) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
    hour12: false,
  }).format(date);
}

export default function LiveClock({ variant = "full" }) {
  const { t } = useLang();
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // render nothing until mounted (avoids SSR hydration mismatch)
  if (!now) return <span className="liveclock" aria-hidden="true" />;

  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuwait",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(now);

  if (variant === "compact") {
    return (
      <span className="liveclock" suppressHydrationWarning>
        <span className="lc-dot" />
        {ZONES.map((z, i) => (
          <span key={z.tz} className="lc-mini">
            <span className="lc-code">{z.short}</span>
            <span className="lc-time">{fmt(now, z.tz, false)}</span>
            {i < ZONES.length - 1 && <span className="lc-sep">·</span>}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="liveclock" suppressHydrationWarning>
      <span className="lc-dot" />
      {ZONES.map((z, i) => (
        <span key={z.tz} className="lc-zone">
          <span className="lc-city">{t(z.label)}</span>
          <span className="lc-time">{fmt(now, z.tz, true)}</span>
          {i < ZONES.length - 1 && <span className="lc-sep">/</span>}
        </span>
      ))}
      <span className="lc-sep">·</span>
      <span className="lc-date">{date}</span>
    </span>
  );
}
