# Becoming Bergkamp :: Wedding Party Hub

A mobile-first, app-like website for the wedding party of Laura and William. It
is the one place bridesmaids and groomsmen go for everything wedding related.

Bachelorette sub-brand: **All You SEA is Love** (the capital SEA is on purpose).

## What is in here

- **Home**, **Bachelorette Trip**, **The Day Before**, and **The Day Of**.
- A **Boardwalk "Pick Your Shorts"** look builder, both embedded in the
  Bachelorette view and as a standalone page (`boardwalk-looks.html`).
- Installable as a Progressive Web App (works offline, adds to the home screen).

## Tech

Plain HTML, CSS, and JavaScript. No framework, no build step, no backend, no
database. It is a static site that deploys to Vercel as-is.

```
index.html              app shell, meta tags, font links
boardwalk-looks.html    standalone shorts look builder
manifest.json           PWA manifest
service-worker.js       offline caching
styles/main.css         design tokens and all styles
scripts/data.js         ALL content (edit copy and looks here)
scripts/app.js          routing, drawer, reveal, sticky nav, lightbox
assets/img/looks/       shorts mockups
assets/img/brand/       All You Sea is Love art
assets/img/photos/      placeholders for day, hero, and dress inspiration
assets/img/_source-mockups/  original full-size uploads (not used by the app)
assets/icons/           PWA icons (placeholders until final art)
```

## Editing content

Almost everything lives in `scripts/data.js`. You can change times, copy, the
wedding palette, or add a bachelorette day without touching layout code.

### Add a Boardwalk shorts look

1. Drop an image in `assets/img/looks/` (resize to about 920px wide, JPEG q85,
   on a black background to match the others).
2. Append one object to `DATA.boardwalk.looks` in `scripts/data.js`:

   ```js
   { num: "04", name: "The New Look", desc: "One line about it.",
     normal: "assets/img/looks/your-look-normal.png",
     crop: "assets/img/looks/your-look-crop.png" }
   ```

   The looks are inspiration only (no shopping links). The carousel shows a note
   that these are ideas and the vision is light blue and white.

## Local preview

Serve it over http (the service worker and routing need it):

```
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy

Connect the GitHub repo to Vercel. No build command, no environment variables,
no server functions. Vercel serves the static files directly.

## House rules (please keep)

- No em dashes anywhere.
- The wedding colors are always written exactly as
  "black and white with hints of greenery and notes of antique gold."
- Fonts are Bricolage Grotesque and Jost. No cursive or script faces.
- The Boardwalk tee is a surprise. Never put any graphic or text on it.
- No backend, no logins, no forms that submit anywhere.

See `BACHELORETTE-APP-SPEC.md` for the full build spec.
