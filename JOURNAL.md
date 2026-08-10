# Progress Journal

## 2026-08-10

Mobile responsive pass on the hero (`src/pages/Home.tsx`, `src/index.css`) — stacked layout, photo now visible on small screens, missing side padding fixed.

**Hero mobile layout**
- Hero row switched from a fixed `flex items-center` row to `flex flex-col md:flex-row items-start md:items-center` — stacks text above photo on mobile (matches JSX order: text block, then `.hero-photo-wrap`), reverts to the existing side-by-side row at `md`.
- Profile photo was previously `hidden md:block`, i.e. not rendered at all below 768px. Dropped `hidden` so it shows on mobile too, plus a mobile-only size override (`.hero-photo` down to 180px from 250px) in the existing `@media (max-width: 640px)` block.
- Buttons (`.hero-btn`) were left untouched — their own padding is a scoped plain-CSS rule, unaffected.

**Bug fixed**
- The hero row's side padding (`px-6`) was a silent no-op — `index.css`'s unlayered universal reset (`*, *::before, *::after { margin: 0; padding: 0; }`) sits outside any `@layer` block, so per the CSS cascade-layers spec it beats Tailwind's `padding` utility regardless of specificity/order (same class of bug as the `mt-8`/`mt-12` hero-button issue from 2026-08-08). Fixed with a new scoped class, `.hero-content { padding: 0 1.5rem; }`, following the project's established one-off-class pattern instead of relayering `index.css`.

**Next up**
- Decide whether the mobile photo should stay left-aligned (flush with the text) or be centered under it — currently left-aligned by default.
- Remaining open items from 2026-08-09 (Font Awesome attribution, dead CSS cleanup, Projects-page GitHub icon sizing) still outstanding.

## 2026-08-09

Built out the About page, retired Home's old scroll sections in favor of a single-viewport hero, and spent most of the session on a new global "contact dock" — plus a real Vercel build failure that traced back to a Framer Motion typing gap.

**About page (`src/pages/About.tsx`)**
- New page at `/about`, wired into `App.tsx`. Heading + subtitle matches the Projects page pattern (`.section-subtitle`).
- Video (reused Home's `LiteYouTubeEmbed`, same video id) + a "big statement" pull-quote sit side by side (`.about-intro-grid`, flex row) — went through several layout iterations (tried centering both stacked, reverted back to side-by-side per feedback) before landing here.
- Pull-quote styling: large accent-colored opening/closing curly quotes via `::before`/`::after` on the statement `<p>`, `position: absolute` so they hang outside the text block instead of pushing it down in normal flow — first attempt used `display: block` which stacked the quote flush above the text; switched to absolute positioning + `padding-left`/`padding-right` on the paragraph to fix.
- Timeline reused as-is from the existing `components/Timeline.tsx` (shared with Home) rather than duplicating `History.tsx`'s inline copy.
- `Timeline.tsx` had its GSAP `ScrollTrigger` scrub effect (on the heading + item container) stripped out per request, keeping only the existing per-item Framer Motion `whileInView` fade — a simplification, not a bug fix (GSAP was working, just no longer wanted for this component).

**Homepage trim (`src/pages/Home.tsx`)**
- Cut down to hero-only (name, title, statement, buttons, photo) — removed the Video Hero, Statement, embedded Projects widget, and Tech Stack sections along with their now-dead GSAP refs/`useGSAP` hooks and the `LiteYouTubeEmbed`/`Timeline`/`Projects` imports.
- `History.tsx` and `components/Projects.tsx` (the homepage-only project-card widget) deleted as a consequence — both became fully orphaned (nothing in the nav pointed to either anymore).

**`index.css` cleanup**
- Full dead-rule audit: cross-checked every class selector against actual usage in `.tsx` files via `grep -rl`, then removed everything with zero hits — old `.header`/`.nav`/`.logo`/`.nav-links`/`.footer` (superseded by the hamburger drawer), `.video-hero`/`.video-container`/`.statement-section` (old Home sections), `.goals-section`/`.goals-text`/`.story-content` (pre-dated this session, never referenced), `.projects-section`/`.home-project-*`/`.skills-grid` (deleted homepage widget). ~680 lines → ~460.
- Reorganized what's left into clearly commented sections (Hero, Nav drawer, Timeline, About page, Projects page, Contact) instead of the prior scattered order.
- This was a one-time, explicitly-requested exception to the standing "snippets only, no direct edits" rule for this repo — reverted to snippets-only again immediately after.

**Contact icons → global "dock" (`src/components/ContactDock.tsx`)**
- Contact page originally got a redesigned icon row (square buttons, brand hover colors) replacing the old text-link list; brand colors/paths for WhatsApp (`#25D366`), LinkedIn (`#0A66C2`), YouTube (`#FF0000`) and their SVG paths pulled from `simple-icons`' GitHub source via `curl`/`WebFetch` rather than recalled from memory — first attempt at the WhatsApp icon *was* hand-recalled and came out with a malformed path (tiny corrupted phone-handset shape), which is why later icons were fetched from source instead.
- Then generalized further: extracted into a standalone `ContactDock` component, mounted once in `Layout.tsx` as a sibling of `NavDrawer` (outside `#smooth-content`, same fixed-position-vs-`ScrollSmoother` constraint as before) so it's a persistent, app-wide fixed dock rather than per-page content. `Contact.tsx`/`/contact` route retired as a consequence (functionality fully absorbed into the dock) — same pattern as `History.tsx`'s retirement.
- YouTube icon fix: the brand mark is a single path where the play-button triangle is a *cutout* (relies on the path's fill-rule to show whatever's behind it as "white") — looked transparent once the dock's background was removed. Split into two `<path>`s: the badge shape (`currentColor`) plus a separate triangle path hardcoded `fill="#fff"`.
- GitHub icon on the dock looked visibly smaller than the others despite identical CSS (`.contact-icon-link svg { width: 24px; height: 24px }` applies uniformly) — root cause was the source artwork itself (GitHub's mark has more built-in padding relative to its viewBox than e.g. YouTube's near-edge-to-edge rectangle), not a CSS bug. Fixed with a per-icon size modifier; first attempt (`.contact-icon-link--github svg`) silently lost to the base rule because they're tied in specificity and the base rule came later in the file — same class of bug as the color modifiers, fixed the same way (`.contact-icon-link.contact-icon-link--github svg`, two classes to force higher specificity regardless of source order).
- Dock container styling went through many rounds (bare icons → pill with background+shadow → stripped to bare again → per-icon glow → pill again with rectangle corners instead of full pill → radial-gradient glow → box-shadow-following-border-radius glow) and ended back at the original bare version (fixed-position flex row, `gap: 1rem`, no background/border/shadow) — net zero diff against the pill/glow experiments by the end of the session.
- Added a `BackHome` component (small arrow + "Home" link, new `arrow-left-icon` symbol) above the `<h1>` on Projects and About, as a lighter-weight way back than the hamburger drawer.

**Vercel deploy failure (real bug, not cosmetic)**
- `npm run build` (`tsc -b && vite build`) failed on Vercel with `TS2322` across `ContactDock.tsx`/`Home.tsx`/`About.tsx`/`Projects.tsx`: each file's `fadeUp` variants object has `ease: 'easeOut'`, and TypeScript widens that to plain `string` on a bare `const`, which doesn't satisfy Framer Motion's `Transition['ease']` (`Easing | Easing[]`) type. `npm run dev` never surfaced this because Vite's dev server uses esbuild and skips type-checking entirely — this had apparently been silently broken for a few commits before Vercel caught it.
- Fixed by appending `as const` to each `fadeUp` object (4 locations) rather than adding explicit `Variants` type annotations — smaller diff, no new imports. Verified against the actual `npm run build` command (not just `tsc --noEmit`) before calling it fixed.
- Lesson: local `tsc -b --noEmit` checks I'd been running only confirmed no *new* errors were introduced, not that the existing ones were harmless — should have run the real `npm run build` command earlier to know it was actually failing.

**Next up**
- Small leftover: duplicated `/* Contact dock */` comment above `.contact-dock` in `index.css`, cosmetic only.
- Font Awesome attribution for the globe icon (from 2026-08-08) still not added anywhere.
- GitHub icon on the Projects page (`.project-icon-link svg`) likely has the same small-relative-to-viewBox look as the dock's did — not yet addressed there.

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
