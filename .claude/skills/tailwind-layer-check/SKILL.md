---
name: tailwind-layer-check
description: Use before proposing or writing ANY Tailwind utility class change (margin, padding, font-size, line-height, width/height, gap, color, etc.) in this portfolio-website project, or whenever a Tailwind class is reported as "not working" / "nothing changed". Checks src/index.css for plain CSS rules that sit outside a Tailwind @layer, since those silently override Tailwind utilities regardless of specificity or source order.
---

# Tailwind v4 Layer Check

## The problem

This project uses Tailwind CSS v4 via `@import 'tailwindcss'` in `src/index.css`. Tailwind v4 wraps its own styles in cascade layers (`@layer theme, base, components, utilities;`). Per the CSS cascade-layers spec, **any plain CSS rule that is NOT inside an `@layer` block automatically beats every rule that IS inside a layer** — regardless of selector specificity, regardless of which one appears later in the file.

`src/index.css` originally had plain (unlayered) rules — the universal reset (`*, *::before, *::after { margin: 0; padding: 0; }`), bare element selectors (`h1`, `h2`, `h3`, `body`, `a`, `img`, `section`), etc. These silently defeated Tailwind utility classes (`pt-40`, `mt-8`, `mt-12`, custom `h1` font sizing, and more) with zero error or warning — the class was "applied" in the DOM but had no visible effect. This has bitten this project's h1 sizing, section padding, video-hero padding, and hero-button margin so far.

The fix already applied: the plain rules in `src/index.css` were wrapped in `@layer base { ... }` (resets/element defaults) and `@layer components { ... }` (everything else — layout/nav/footer/video/timeline/project/contact rules), leaving `:root { ... }` and `@theme { ... }` un-layered (required — `@theme` is a special Tailwind directive, not a normal layer).

## What to do before suggesting a styling change

1. Before recommending a Tailwind utility class for spacing/sizing/typography/color on an element, open `src/index.css` and check whether that same element/selector (or a matching bare-element/universal selector) already sets that property in a rule that is **outside** `@layer base` / `@layer components` / `@theme` / `:root`.
2. If such an unlayered rule exists, don't just hand over the Tailwind class as if it'll work — tell the user up front that it will likely be a no-op, name the conflicting rule, and propose a **scoped, one-off dedicated plain-CSS class** (matching the existing pattern already used in this file, e.g. `.statement-section { padding-top: 14rem }`, `.stat-gap { margin-top: 2rem }`) rather than moving the conflicting rule into `@layer base`/`components`.
   - Do NOT default to "wrap the whole conflicting rule (or the whole file) into a Tailwind layer" as the fix. Tried once (2026-08-08) and it caused a much bigger, unwanted visual change than intended: most of this site's current sizing/spacing (h1 at `4rem`/`2rem` instead of the JSX's actual `text-6xl`/`md:text-8xl`, several `mt-*`/`mb-*` gaps) was unintentionally tuned *around* the unlayered-CSS bug over many past sessions. Un-breaking the cascade site-wide makes every previously-silenced Tailwind utility fire at once, not just the one the user asked about.
   - Only propose the full layer-wrap (moving existing plain rules into `@layer base`/`components`) if the user explicitly asks to do a broader re-tune/cleanup pass, understanding it will shift other sizing/spacing too.
3. When adding brand-new custom CSS to `index.css` for a single new spacing/sizing need, add a small dedicated class (unlayered is fine, consistent with the rest of the file) rather than trying to make a Tailwind utility class win by relayering things.
4. If unsure whether a rule is layered, grep the file for the property in question and trace whether it's nested inside an `@layer { ... }` block.

## Reporting back

When flagging a conflict, be concrete: name the file, the exact conflicting rule, and why the requested Tailwind class won't take effect — the same way the h1/section-padding/video-padding/hero-button-margin issues were diagnosed. Don't wait for the user to apply a change and report "nothing happened" before checking this.
