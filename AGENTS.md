# AGENTS.md — Portfolio Website

Working notes and decisions for this project, so any agent (or future me) picking this up has context.

## Goal

Personal developer portfolio, inspired in *feel* (not copied) by https://www.tajmirul.site/ — single-page-ish scroll layout, tech-stack showcase, project cards, subtle motion. Content and personality are Alessandro's own, not a clone of the reference site's copy or structure.

## Stack (decided 2026-07-20)

- **Vite + React 19 + TypeScript** — already in place, kept as-is.
- **React Router** — kept for multi-page routing (`/`, `/projects`, `/contact`).
- **Tailwind CSS** — added on top of the existing hand-written CSS. New components use Tailwind utility classes; existing custom CSS in `src/index.css` migrates over time, not all at once.
- **Framer Motion** — added for scroll-reveal, hover states, and any animated stats/counters.
- No Next.js. This site is fully static (no SSR/dynamic routing needed), so Vite stays simpler and faster to iterate on.

## Working mode

This project is a **learning exercise**, not a hands-off build:

- The assistant explains concepts, proposes approach, and gives code snippets + install commands.
- The human (Alessandro) applies the snippets, runs the install commands, and does the actual file edits himself unless he explicitly asks the assistant to write/edit a file directly.
- Prefer small, explained steps over large one-shot changes.

## Current structure (as of 2026-07-20)

```
src/
  App.tsx              — BrowserRouter + Routes
  main.tsx             — entry point
  index.css            — global styles, dark theme, custom CSS
  components/Layout.tsx — navbar + footer
  pages/Home.tsx        — video hero, goal, story, timeline
  pages/Projects.tsx    — project card grid (placeholder content)
  pages/Contact.tsx     — contact links
  pages/About.tsx       — legacy, may be merged into Home
```

See `plan.md` for the original scaffold plan and outstanding content to-dos (personalize story text, real projects, contact links, intro video).

## Open decisions / not yet settled

- Whether `About.tsx` stays a separate route or gets folded into Home as a section.
- Exact section order/content for the "tech stack" and "experience" style sections inspired by the reference site.
