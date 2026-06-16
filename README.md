# UDGOK — Kuwait Infrastructure Program

A dynamic, single-page presentation site for UDGOK's Kuwait infrastructure program,
built with **Next.js 14 (App Router)**. Dark, cinematic design with a live **Kuwait City**
clock, animated hero, scroll reveals, count-up stats, 3D-tilt glass cards, and an
interactive program map.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.js      # root layout + metadata, imports globals.css
  page.js        # route — renders <Landing/>
  globals.css    # all styles (design system, animations, icons, clock)
components/
  Landing.js     # the page (client component): markup + all interactivity
  LiveClock.js   # live Kuwait City (Asia/Kuwait) date & time
```

## Live world clock

`components/LiveClock.js` shows two live zones, updating every second:
- **Kuwait City** (Asia/Kuwait, UTC+3) — the program locale
- **Central US** (America/Chicago) — UDGOK's home base (DST handled automatically)

Compact form in the nav, full form in the hero status lines. It renders only after mount,
so there is no SSR hydration mismatch and no extra config.

## Contact / service request page

Route: `/contact` (`app/contact/page.js` -> `components/ContactPage.js`). A high-level form
where a client specifies exactly what they need: their details, which flagship project(s),
which services (the six pillars, each expanding to its sub-services), estimated scale, timeline,
and free-text details.

**How it submits:** on "Send request" it composes a formatted summary and opens the client's
email app to `projects@udgok.com` with subject and body pre-filled (a "Copy summary" button is
provided as a fallback). This needs no backend and works on Vercel immediately.

**Optional upgrade to a real inbox/API:** add a Next.js Route Handler (e.g. `app/api/request/route.js`)
that emails via a provider like Resend, then POST the summary to it instead of using `mailto`.
You would set the provider's API key as a Vercel Environment Variable (in the Vercel dashboard,
never in the code) — I intentionally did not wire this so no secrets live in the repo.

## Deploy (GitHub → Vercel)

This is a standard Next.js app — no environment variables required.

1. Commit and push these files to your GitHub repo (or a subfolder/route in your existing repo).
2. In Vercel, import the repo (or it auto-deploys if already linked). Framework preset: **Next.js**.
   - Build command: `next build` (default)
   - Output: handled automatically
3. Every push to your default branch triggers a new deployment.

### Adding into an existing Next.js site instead of a new repo

- Copy `components/Landing.js` and `components/LiveClock.js` into your `components/`.
- Merge the contents of `app/globals.css` into your global stylesheet (or import it).
- Create a route (e.g. `app/kuwait/page.js`) that does `import Landing from "@/components/Landing"; export default () => <Landing/>;`.

> Note: if your existing project uses TypeScript, rename the `.js` files to `.jsx`/`.tsx`
> as needed — the code is plain JS and will work in either setup.
