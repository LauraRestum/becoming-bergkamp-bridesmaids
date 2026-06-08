# Becoming Bergkamp: Wedding Party Hub

## Build Handoff Spec

This document is the single source of truth for the app.

-----

## 1. What We Are Building

A mobile-first, app-like website for the wedding party of Laura and William
(Becoming Bergkamp). Phase 1 (this build) covers three areas:

1. **Bachelorette Trip** (the centerpiece, most built-out and interactive)
2. **The Day Before** (Friday rehearsal weekend info)
3. **The Day Of** (wedding day info and attire)

Phase 2 (future) adds a Bridesmaids portal and a Groomsmen portal. These are
"coming soon" placeholders in the menu only. Do not build them yet.

**Brand names**

- App / wedding brand: **Becoming Bergkamp**
- Bachelorette sub-brand: **All You SEA is Love** (SEA is intentionally capitalized)

**Tone:** warm, playful, romantic, coastal-editorial. Cute but elevated.

-----

## 2. Goals and Principles

- **Phone first.** Design and test mobile first, then scale up gracefully.
- **Feels like an app.** Installable PWA, full-screen, fast, works offline.
- **No backend, no API, no database.** Static site. No logins, no submissions.
- **Easy to update.** Content lives in a single data file (`scripts/data.js`).
- **Deploys to Vercel** as a static site.

-----

## 3. Tech Approach

- Vanilla HTML, CSS, JS. One app shell, one stylesheet, one app script, one data
  file. No bundler, no build step.
- Single-page feel with hash routing: `#/home`, `#/bachelorette`,
  `#/day-before`, `#/day-of`. Back button works, views are deep-linkable.
  Switching a route swaps the visible view and scrolls to top.
- Content is data-driven. Days, schedule events, and looks are arrays/objects in
  `data.js`, rendered by `app.js`. Adding a look is a one-object edit.
- Maps use keyless Google Maps embed iframes.
- Fonts from Google Fonts.

-----

## 4. Design System

### 4.1 Typography

The 2026 redesign moved to a modern, bolder, editorial type system at Laura's
request. No cursive or script faces.

- **Display:** Bricolage Grotesque (heavy weights, tight tracking). Oversized,
  edge to edge headings that read like a fashion or travel magazine.
- **Body and UI sans:** Jost (300 to 600). Body copy, labels, buttons, nav.
- **Accents:** tracked uppercase Jost eyebrows replace the old script kickers.

Do not substitute system fonts, Inter, Roboto, Arial, or Montserrat.

### 4.2 Global color tokens

```
--ivory:    #FBF7EF   /* page base */
--ink:      #15130F   /* near-black text and dark surfaces */
--sand:     #E6D8BD   /* borders, soft accents */
--greenery: #4A7A4E   /* botanical green */
--gold:     #C9A24B   /* antique gold */
--gold-soft:#E3CF9C   /* lighter gold for dark backgrounds */
```

### 4.3 Wedding palette (The Day Before and The Day Of)

Refined black and white with greenery and antique gold.

**Exact phrasing rule:** the wedding colors must always be written as

> "black and white with hints of greenery and notes of antique gold"

Never shorten this to "green" or "gold." Swatch dots: `#15130F` (black),
`#FFFFFF` (white), `#4A7A4E` (greenery), `#C9A24B` (antique gold).

### 4.4 Bachelorette per-day palettes

Each bachelorette day is its own visual world with a distinct background.

- **Thursday, Beach Club** (deep emerald, old-money green): emerald `#2C5C4F`,
  hunter `#2C5F34`, cream `#F4EFE3`, white `#FFFFFF`, gold `#C9A24B`. Background:
  rich emerald radial gradient. Light cream text.
- **Friday day, Something Blue:** sky `#8EC5E8`, cobalt `#1366C9`, turquoise
  `#2BB3C0`, navy `#16314E`, sand `#E6D8BD`. Background: sky-to-navy gradient.
  White text.
- **Friday night, Rainbow Fish:** opal `#EAE6F2`, plus spectrum accents pink
  `#FF3FA4`, tangerine `#FF8A3D`, gold `#FFD23F`, emerald `#2FBF71`, azure
  `#3FA9FF`, violet `#8A4FFF`. Background: deep night `#0c1230` with a faint
  iridescent scale texture. Day title uses an animated rainbow gradient.
- **Saturday day, Boardwalk:** warm sand and terracotta. Background: cream
  gradient (`#F6EAD2` to `#ECD9B4`). Accent terracotta `#C56B4A`. No swatch row.
- **Saturday night, Coco Nuts:** bronze `#A9742E`, coconut `#6B4226`, terracotta
  `#C56B4A`, coral `#E58A6F`, sungold `#E8B14C`, cream `#F4EAD7`. Background:
  warm sunset gradient. Warm cream text.
- **Sunday:** soft warm cream, centered, gentle. No swatch row.

### 4.5 Motion and texture

- Faint film-grain overlay across the whole app (subtle SVG noise, low opacity).
- Drawer slides in from the left; hamburger animates to an X.
- Reveal-on-scroll via IntersectionObserver.
- Rainbow Fish title shimmer animation (looping gradient).
- Wave SVG dividers under section heroes.
- Soft palm and botanical glyph accents per day world.
- Buttons and cards have active/hover press states.

### 4.6 Hard copy rule

**No em dashes anywhere** in any copy or code comments. Use periods, commas,
parentheses, or "to" for ranges.

### 4.7 Not an Envision project

Do not apply any Envision brand system and do not force Montserrat.

-----

## 5. Navigation and Layout

### 5.1 Fixed top bar (all views)

- Left: hamburger (animates to X when open).
- Center: wordmark "Becoming Bergkamp" in tracked uppercase Bricolage Grotesque, "Bergkamp"
  in gold.
- Right: a small shell glyph.
- Translucent ivory background with blur, thin gold bottom border.

### 5.2 Slide-in drawer menu

Dark (`--ink`) panel, ivory text:

- Eyebrow "welcome to the" then "Wedding Party Hub" in Bricolage Grotesque.
- Nav links with serif index numbers: `00 Home`, `01 Bachelorette Trip`,
  `02 The Day Before`, `03 The Day Of`. Active link highlighted in soft gold.
- Pinned at the bottom: a "Coming soon" block reading
  "Bridesmaids portal · Groomsmen portal" (present, not clickable).
- Scrim tap closes it; Escape closes it.

-----

## 6. Page Content

All page copy lives in `scripts/data.js`. See sections 6.1 to 6.4 of the
original handoff for the verbatim copy, all of which is encoded in `data.js`.

-----

## 7. Widgets and Tools

### 7.1 Boardwalk Shorts Visualizer ("Pick Your Shorts")

A look builder for the Boardwalk day. Everyone gets the same surprise tee (shown
blank) and chooses one of several shorts options. Each look is a front-and-back
mockup on black.

Built as a self-contained module: embedded inside the Boardwalk day section AND
available as a standalone page (`boardwalk-looks.html`). Both render from
`DATA.boardwalk.looks`.

Each look card: dark lookbook image tile (near-black to blend the on-black
photo), overlay labels (`LOOK 01`, `front & back`, `tap to zoom`), look name,
one-line descriptor, and a "Shop the shorts" pill. When no link exists, render a
non-clickable dashed "Link coming soon" pill. Tap any image for a full-screen
lightbox (tap or Escape to close).

**Looks data shape:**

```js
{ img: "assets/img/looks/lace-trim.jpg", num: "01", name: "The Lace Trim",
  desc: "Soft drawstring shorts with a scalloped lace hem. Sweet and breezy.",
  shop: "" }   // shop: "" or "#" renders "Link coming soon"
```

Adding a look later: add an image to `assets/img/looks/` and append one object.

**Image handling:** source mockups are about 1300px square PNGs on black. Resize
to about 920px wide and export JPEG (quality 85). Store under `assets/img/looks/`.

-----

## 8. Assets

### 8.1 Provided now

Three shorts mockups (tee plus shorts, front and back, on black):

- `assets/img/looks/lace-trim.jpg` (light blue drawstring, scalloped lace hem)
- `assets/img/looks/denim-cutoffs.jpg` (light-wash frayed denim)
- `assets/img/looks/seersucker-ruffle.jpg` (blue smocked shorts with bow)

Brand art ("All I Sea is Love" badge and illustration) is in
`assets/img/brand/`. The original full-size uploads are preserved in
`assets/img/_source-mockups/` (these include extra mockups, skorts, and skirts
Laura may want to use later). They are not loaded by the app.

### 8.2 Placeholders to scaffold (content coming from Laura)

- Day-world photos (optional; days run on color and atmosphere for now).
- Hero imagery.
- Bridesmaid wedding-dress inspiration images for The Day Of attire block.
- Additional shorts mockups for the widget.
- Shop links (Amazon) for each shorts look.
- Final PWA app icon art (placeholders ship now).

Never place any design or text on the surprise tee.

-----

## 9. Maps

Keyless Google Maps embeds plus an "Open in Maps" link.

- Embed iframe src: `https://www.google.com/maps?q=QUERY&output=embed`
- Link href: `https://www.google.com/maps?q=QUERY`
- `loading="lazy"` on iframes.

Queries: House `83 Carrington Dr Pawleys Island SC`; Broadway at the Beach
`Broadway at the Beach Myrtle Beach SC`; Murrells Inlet
`Murrells Inlet MarshWalk SC`; Ceremony and Rehearsal
`Central Community Church Wichita KS`; Blessing and Rehearsal Dinner
`Saint Rose Mount Vernon Cheney KS`; Reception `Brick and Mortar Wichita KS`.

-----

## 10. PWA / App-Like Requirements

- `manifest.json`: name "Becoming Bergkamp", short_name "Bergkamp",
  `display: standalone`, `theme_color: #15130F`, `background_color: #FBF7EF`,
  `start_url: "/"`, icon set (192, 256, 512, plus maskable).
- `service-worker.js`: cache the shell, styles, script, fonts, and images for
  offline use. Cache-first for assets, network-first for the document.
- Meta tags: `theme-color`, `apple-mobile-web-app-capable`,
  `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, and
  `viewport` with `viewport-fit=cover`.
- No localStorage or sessionStorage anywhere.

-----

## 11. Functionality Checklist

- Hash-based routing across all four views (back button and deep links work).
- Hamburger drawer open/close (button, scrim, Escape), animated hamburger.
- Active nav state syncs to current route.
- Home cards navigate to their views.
- Bachelorette sticky day-jump nav smooth-scrolls to anchors with correct offset.
- Each day world renders from data with its own atmosphere and swatches.
- Rainbow Fish animated shimmer title.
- Reveal-on-scroll for cards and sections.
- All maps embed and "Open in Maps" links work.
- Boardwalk widget renders from data, lightbox zoom works, "Link coming soon"
  fallback works.
- PWA installs and loads offline.
- Looks good from 320px wide up to desktop.
- No em dashes in any output.

-----

## 12. Repo Structure

```
/
  index.html              app shell, meta tags, font links
  boardwalk-looks.html    standalone Boardwalk widget
  manifest.json
  service-worker.js
  /styles/main.css        all design tokens and styles
  /scripts/data.js        all content
  /scripts/app.js         routing, drawer, reveal, sticky nav, lightbox
  /assets/img/looks       shorts mockups
  /assets/img/brand       All You Sea is Love art
  /assets/img/photos      placeholders for day, hero, dress inspo
  /assets/img/_source-mockups  original uploads (not deployed in the app)
  /assets/icons           PWA icons
  README.md
  CLAUDE.md
  BACHELORETTE-APP-SPEC.md   (this file)
```

-----

## 13. Deployment

Static deploy to Vercel. No environment variables, no server functions, no build
step. Connect the GitHub repo and it serves the static files directly.

-----

## 14. Open Decisions and To-Dos (owned by Laura)

1. Shorts "size" note: clarify the "two different looks depending on size".
2. Shop links: provide product links for each shorts look.
3. More shorts mockups: each is a one-object add.
4. Widget placement: currently both embedded and standalone.
5. Photos: day-world photos, hero imagery, dress inspiration.
6. Venue addresses: optional precise street addresses for the map queries.
7. PWA icon art: final app icon.
8. Phase 2 portals: Bridesmaids and Groomsmen content (still backendless).

-----

## 15. Hard Rules (do not break)

- No em dashes, anywhere.
- Wedding colors are always written exactly as "black and white with hints of
  greenery and notes of antique gold." Never reduce to "green" or "gold."
- This is not an Envision project. No Envision brand system, no Montserrat.
- The Boardwalk tee is a surprise. Never render any graphic or text on it.
- No backend, no API, no database, no data submission features.
- Fonts are Bricolage Grotesque and Jost. No cursive, no generic system fallbacks.
