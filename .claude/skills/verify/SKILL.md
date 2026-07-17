---
name: verify
description: Build, launch, and drive this static PWA to verify changes at the surface.
---

# Verifying Becoming Bergkamp

Static site, no build step. Serve and drive it in a real browser.

## Launch

```bash
python3 -m http.server 8630 &   # from the repo root
```

## Drive

Use playwright-core with the preinstalled Chromium (do not run
`playwright install`):

```js
const { chromium } = require('playwright-core');
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
});
// mobile-first: use viewport 390x844
```

Routes: `#/home`, `#/bachelorette`, `#/day-before`, `#/day-of`.
Bachelorette days expand via `button[aria-controls="panel-<id>"]`
(ids: travel, thursday, friday-blue, friday-rainbow, boardwalk,
coconuts, sunday). The shared lightbox is `#lightbox`.

## Gotchas

- The sandbox Chromium has no H.264/AAC codecs, so the site's mp4s
  report "no supported sources". Real browsers play them fine. To
  exercise video code paths, transcode short VP9 stand-ins with the
  ffmpeg from `pip install imageio-ffmpeg` and serve them via
  `page.route('**/<name>.mp4', ...)` with contentType video/webm.
- Google Fonts is blocked in the sandbox, so text falls back to
  system faces in screenshots. Not a site bug.
- Pre-existing: one 404 for `styles/assets/img/coconuts/coconuts-stripe-bg.jpg`
  (a relative url() resolved against /styles/). Harmless, not new.
