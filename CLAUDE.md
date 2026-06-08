# Project instructions: Becoming Bergkamp

This is a mobile-first, app-like static site (a PWA) for the wedding party of
Laura and William. The full build spec is in `BACHELORETTE-APP-SPEC.md`. Read it
before making structural changes.

## Architecture (keep it this way)

- Vanilla HTML, CSS, JS. No framework, no bundler, no build step.
- One app shell (`index.html`) with hash routing: `#/home`, `#/bachelorette`,
  `#/day-before`, `#/day-of`.
- All content lives in `scripts/data.js`. `scripts/app.js` renders it.
- No backend, no API, no database, no forms that submit, no localStorage.
- Deploys to Vercel as static files.

## Hard rules (do not break)

1. **No em dashes anywhere**, in copy or code comments. Use periods, commas,
   parentheses, or "to" for ranges.
2. The wedding colors are always written exactly as:
   **"black and white with hints of greenery and notes of antique gold."**
   Never shorten to "green" or "gold."
3. Fonts are **Bricolage Grotesque** (modern display) and **Jost** (UI and
   body). No cursive or script faces (Sacramento was removed at Laura's request
   for a more modern, bolder look). Never fall back to Inter, Roboto, Arial,
   Montserrat, or system fonts in the design.
4. This is **not an Envision project**. Do not apply any Envision brand system
   and do not use Montserrat.
5. The Boardwalk widget tee is a **surprise**. Never render any graphic or text
   on the tee.
6. "SEA" in "All You SEA is Love" is intentionally capitalized.
7. The look is **editorial, not card-heavy**. Prefer hairline rules, flowing
   full-bleed sections, and oversized display type over boxed cards with drop
   shadows.

## Brand color tokens

```
--ivory:#FBF7EF  --ink:#15130F  --sand:#E6D8BD
--greenery:#4A7A4E  --gold:#C9A24B  --gold-soft:#E3CF9C
```

## Phase 2 (not now)

Bridesmaids portal and Groomsmen portal are "coming soon" placeholders in the
drawer only. Do not build them.
