# Progress Journal

## 2026-07-22

Scroll motion overhaul — moved the hero's exit animation off Framer Motion's `whileInView` (threshold-triggered, can't reverse/pause mid-scroll) onto **GSAP**, since the goal was continuous scroll-scrubbed motion matching tajmirul.site.

**Tooling**
- Installed `gsap` and `@gsap/react` (`useGSAP` hook — auto-cleans up timelines/ScrollTriggers on unmount).
- Framer Motion kept for everything else (video, goals, tech stack, History page) — the two coexist deliberately.

**Momentum scroll**
- `ScrollSmoother` wraps the whole app in `Layout.tsx` (`#smooth-wrapper` / `#smooth-content`), giving the page a soft drift-to-stop feel instead of native instant-stop scrolling.

**Hero exit effect**
- Heading, paragraph, and the two stat lines each have their own ref and animate via one `gsap.timeline` with a scrubbed `ScrollTrigger` — they separate apart (alternating `y` direction per pair) then fade, reversibly, pausable mid-scroll.

**Bugs fixed**
- Heading appeared not to fade: it was being visually covered by the sticky header before its opacity tween finished, because the scroll range (`end: 'bottom top'`) was too long. Fixed by shortening `end` to `'+=60%'` so the animation completes before elements reach the header.

**Next up**
- Tune `y` magnitudes / `end` distance further to taste.
- Navbar removal still deferred.

## 2026-07-20

Styling system and site structure work, building toward a layout inspired by (but not copying) https://www.tajmirul.site/.

**Tooling**
- Installed and configured Tailwind CSS v4 via the `@tailwindcss/vite` plugin — added `tailwindcss()` to `vite.config.ts` and `@import "tailwindcss";` to `src/index.css`.
- Registered existing dark-theme CSS variables (`--bg`, `--accent`, etc.) as Tailwind theme tokens via `@theme`, so utility classes like `bg-surface` / `text-accent` stay backed by the site's own palette instead of Tailwind defaults.
- Installed Framer Motion for scroll-reveal and entrance animations.

**Bug fixed**
- The Story + Timeline sections were originally wrapped in a single `motion.section`, so `whileInView` only fired once near the top and the timeline items never animated individually on scroll. Split into per-section (and per-timeline-item, with a staggered `delay`) `motion` wrappers so each reveals independently.

**Site structure**
- Repurposed the unused `About.tsx` route into a new `History.tsx` page (`/history`), moved the "My Story" and "My Journey" (timeline) sections out of `Home.tsx` into it.
- Added "My History" to the nav in `Layout.tsx`.
- Added a Tech Stack section to `Home.tsx` (grid of skills, staggered reveal).
- Restructured `Home.tsx` order to: **Hero (name + role) → Video → Goals → Tech Stack**, moving the video down the page instead of it being the first thing visible — matches the reference site's pattern of a big heading first.

**Visual identity**
- Added a `CodeRain` background component (`src/components/CodeRain.tsx`) — faint falling code symbols (`{ } < / > ; ( ) =>`) using Framer Motion, mounted globally behind all pages in `Layout.tsx`. Deliberately different from the reference site's plain falling dots — themed around the fact that this is a dev portfolio.
- Swapped the display font twice: tried Rubik Dirt (too rough for the look), settled on **Days One** via Google Fonts, applied to headings/logo only (`--font-display` variable) while body text keeps the original readable font.

**Next up**
- Hero section content needs a pass (heading copy, spacing) — flagged in commit `72105b0 "Add hero, but needs change"`.
- Add visual effects to the video box (mentioned as a follow-up, not started yet).
- Tech Stack section uses a placeholder-ish skills list — worth double-checking against `About.tsx`'s original (now-removed) skills list for anything missing.
