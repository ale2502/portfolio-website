# Portfolio Website — Plan & Progress

## Stack
- **Vite + React + TypeScript**
- **React Router** for multi-page navigation
- No CSS frameworks — custom dark theme with CSS variables

## Pages

| Route | Page | Status |
|-------|------|--------|
| `/` | **Home** — Video hero, My Goal, My Story, vertical timeline | ✅ Done |
| `/projects` | **Projects** — Card grid with placeholder projects | ✅ Done |
| `/contact` | **Contact** — Email, GitHub, LinkedIn links | ✅ Done |

## Home Page Layout (top to bottom)
1. **Video hero** — YouTube embed (`ldvtz73QZ0I`), capped at 800px wide, `2rem` padding above/below
2. **My Goal** — Short paragraph about becoming a software developer
3. **My Story** — Multi-paragraph backstory (placeholder — needs personalising)
4. **My Journey** — Vertical timeline with dots and connecting line

## Files Created/Modified

| File | Purpose |
|------|---------|
| `src/index.css` | Global styles, dark theme, all component CSS |
| `src/App.tsx` | BrowserRouter + Routes |
| `src/main.tsx` | Entry point |
| `src/components/Layout.tsx` | Navbar (Home / Projects / Contact) + footer |
| `src/pages/Home.tsx` | Video hero, goals, story, timeline |
| `src/pages/Projects.tsx` | Project cards (update with real projects) |
| `src/pages/Contact.tsx` | Contact links (update with real info) |

## To-Do for Next Session
- [ ] Personalise the story text in `Home.tsx`
- [ ] Replace placeholder projects in `Projects.tsx` with real bootcamp projects
- [ ] Update contact links in `Contact.tsx` (email, GitHub, LinkedIn)
- [ ] Record and swap in a proper intro video
- [ ] Tweak video section sizing/positioning
- [ ] Possibly add a skills section or move it from the old About page
