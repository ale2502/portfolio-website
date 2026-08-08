# Progress Journal

## 2026-08-08

Big direction change: moved off the single-page scroll-scrubbed layout toward a simpler multi-page site (Home / Projects / About Me / Contact), no persistent navbar. Home keeps just hero content; Projects, About Me, and Contact are full standalone pages.

**Hero (`src/pages/Home.tsx`)**
- Replaced the GSAP `ScrollTrigger` exit timeline with a plain Framer Motion mount fade-in (staggered: name → heading → paragraph → buttons). Dropped `ScrollSmoother`-driven motion from the hero entirely — it no longer needs to scroll to reveal itself.
- Removed the years-of-experience / commits stats block.
- Added three nav buttons (`.hero-btn`, Projects/About Me/Contact) under the intro paragraph — these are now the site's primary navigation on Home, replacing the old navbar's job.
- Added a circular profile photo (`public/me.png`) next to the text: `object-fit: cover` + `object-position: center 20%` to avoid cropping the head (source photo is portrait `1122×1402`, so only vertical `object-position` has any effect — the scaled width exactly fills the box with zero horizontal slack), continuous floating y-loop via Framer Motion (`animate.y: [0, -15, 0]`, `repeat: Infinity`, split from the one-time `opacity` fade via per-property `transition` overrides so the fade doesn't loop too).
- Restructured the hero row into two flex children (text block, photo) and centered the whole compact group on the page (`justify-content: center` on the section) instead of letting it stretch to the container's full width — removing the redundant nested `.container` class (its `margin: 0 auto` was silently fighting centering via flex auto-margins) was the actual fix, not just tuning `gap`.
- Shortened the intro paragraph copy and narrowed it (`max-w-lg`) to force more line wraps.
- Removed the navbar from `Layout.tsx` entirely (dead CSS: `.header`/`.nav`/`.nav-links`/`.logo`, not yet cleaned up).

**Projects page (`src/pages/Projects.tsx`)**
- Replaced placeholder data with real GrindNotes project info (title/links), moved over from the now-removed home-embedded `components/Projects.tsx` section.
- Added a staggered Framer Motion entrance (`container`/`fadeUp` variants, `staggerChildren`) for the card grid, triggered on mount rather than scroll.
- Added phone-mockup preview images per card (`public/projects/*.png`, AI-generated placeholders, `z_image` model) — restructured cards into `.project-card` (image, full-bleed top, own rounded top corners) + `.project-card-body` (padded text content) so the image can bleed edge-to-edge without the card's own padding pushing it in.
- Iterated on card hover: border-color change → attempted body-only border → settled on a whole-card cyan `box-shadow` glow (`rgba(34, 211, 238, 0.35)`, matches `--accent` written out since `var()` can't take partial opacity).
- Card background bumped from `var(--surface)` to `var(--surface-hover)` (lighter, more contrast against the page background) with a visible `#3a3a3a` border, after a "make the whole card light-themed" attempt looked wrong against the dark site.
- Fixed tags/links floating instead of sticking to the card's bottom when descriptions are short: `.project-card-body` needed `flex: 1` so it actually fills the card's grid-stretched height, letting `.project-card p`'s existing `flex: 1` (previously a no-op with nothing to grow into) push the tags/links down properly.
- Replaced "Live Demo"/"Source Code" text links with icon buttons: added a `globe-icon` symbol to `public/icons.svg` (iterated from a plain wireframe circle+line, to a denser wireframe, to a real continent-silhouette path borrowed from Font Awesome's `earth-americas`, CC BY 4.0 — attribution not yet added anywhere) and reused the existing (previously unused) `github-icon` symbol, switching its hardcoded `fill="#08060d"` to `fill="currentColor"` so both icons follow the link's text color and turn `--accent` on hover. "Live Demo" ended up different from "Source Code": it's now a rounded-rectangle button with icon + text label (`.project-live-btn`, radius matching `.skill-tag`), while "Source Code" stayed a plain circular icon-only button (`.project-icon-link`).

**Navigation**
- New `src/components/NavDrawer.tsx`: self-contained hamburger + slide-in drawer (from the right, dimmed backdrop, Framer Motion `AnimatePresence`), pulled out of `Layout.tsx` the same way `Timeline`/`Projects` were pulled out of `Home.tsx` earlier. Hidden on `/` via its own `useLocation()` check (`return null` on Home) since Home already has the hero buttons as its nav.
- Removed the footer from `Layout.tsx` (dead CSS: `.footer`, not yet cleaned up).

**Assets**
- `public/me.png`: user's own photo (renamed from a messy default export filename with spaces/commas).
- `public/favicon-photo.png`: circular-cropped version of the same photo for the favicon, cropped via `magick` to match the exact same framing as the hero circle (56px top offset on a 1122×1122 square crop, i.e. the same effective `object-position: center 20%`), circular alpha mask, 512×512. Wired into `index.html`, replacing `favicon.svg` (left in `public/`, unused).

**Gotchas (see `.claude/skills/tailwind-layer-check/SKILL.md` and the `project-hero-redesign` memory for the full writeups)**
- Tailwind v4 unlayered-CSS-beats-utilities bug recurred a 4th time (hero button margin). First fix attempt (wrap all of `index.css`'s plain rules into `@layer base`/`@layer components`) was reverted — it un-silenced *every* previously-broken Tailwind class at once (h1 size, several margins), not just the one being fixed, since much of the site's tuned look depended on the bug. Went back to the established scoped-one-off-class pattern instead. Skill file updated to default to that going forward.
- `position: fixed` elements need to live outside `#smooth-content` (siblings of it inside `#smooth-wrapper`), not nested inside — `ScrollSmoother`'s transform breaks fixed positioning for descendants. Applied proactively this time for `NavDrawer` based on the earlier `CodeRain` bug, instead of rediscovering it.
- Flex `margin: 0 auto` on a flex item actively consumes leftover main-axis space, same as `flex-grow` would — bit the hero-photo layout twice (once via an explicit `flex-1`, then again via a leftover nested `.container` class nobody noticed was still doing the same thing).
- `object-fit: cover` cropping is single-axis when the image and box aspect ratios differ enough — a portrait photo in a square box only has vertical crop room, so `object-position`'s horizontal value can be a total no-op depending on the source image's proportions.

**Next up**
- Font Awesome attribution for the globe icon (CC BY 4.0) not yet added anywhere.
- Dead CSS from removed navbar/footer/old `.project-image` etc. not cleaned up.
- About Me page not started yet — still needs Video + Statement + Timeline content migrated over from `Home.tsx`/`History.tsx`, plus a decision on whether the Tech Stack grid moves there too (still undecided).
- Source Code button could get the same icon+label treatment as Live Demo for consistency, or stay icon-only — open question.
- Drawer link destinations assume `/about` exists — it doesn't yet.

## 2026-07-28

Added a Projects section to the home page, following the same section-scoped GSAP pattern as Timeline/Video/Statement.

**New component**
- `src/components/Projects.tsx`: heading and card grid separate in opposite `y` directions via one scrubbed `useGSAP` timeline (`start: 'top bottom'` / `end: 'bottom top'`), no opacity fade — same call as Timeline (a short 2-3 card block doesn't need Framer Motion's per-item stagger on top of the section-level split, unlike Timeline's 5-item list). Wired into `Home.tsx` right after Statement, before Timeline.

**Bugs fixed**
- `import Projects from './Projects'` in `Home.tsx` silently resolved to the pre-existing standalone `src/pages/Projects.tsx` (the `/projects` route) instead of the new `src/components/Projects.tsx` — same filename, sibling directories, no error thrown. Fixed by importing from `../components/Projects`.
- Card was originally a whole `motion.a`, so hovering underlined all the text inside it (global `a:hover { text-decoration: underline }` propagates into descendants). Dropped Framer Motion from the card entirely and switched to a plain `<article>` with two independent `<a>` links inside (Live Demo / Source Code), matching the `/projects` page's structure.
- `.home-project-card` used `display: block` with manual `margin-top` per child, causing inconsistent spacing (links row glued together, no top gap). Switched to `display: flex; flex-direction: column; gap: 0.75rem`, matching the `/projects` page's own `.project-card` technique — one `gap` handles spacing consistently instead of per-child margins.
- Renamed the new classes with a `home-` prefix (`.home-project-card`, `.home-project-tags`, `.home-project-links`) since the pre-existing `/projects` page already defines `.project-card`/`.project-tags`/`.project-links` — two same-named unlayered CSS rules were silently colliding.

**Next up**
- Confirm the flex-gap card CSS actually renders correctly — session ended mid-fix.
- Real project content (titles/descriptions/links) is still placeholder.
- `src/components/Projects.tsx` and `src/pages/Projects.tsx` are now duplicated the same way `Timeline.tsx`/`History.tsx` are — worth consolidating both once the navbar/standalone pages get removed.
- Navbar removal + deleting standalone pages (`/projects`, `/history`, etc.) once collapsed into a single-page scroll, keeping only the Contact page/model as reference for the eventual single-page Contact section.

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
