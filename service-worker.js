/*
  Becoming Bergkamp :: service worker
  Network-first for the document and same-origin app code (HTML, CSS, JS) so
  new deploys are picked up automatically. Cache-first for binary assets
  (images, icons, fonts) that rarely change.

  Update flow: a new worker waits instead of taking over silently. The page
  detects the waiting worker, prompts the user, and on confirm posts
  SKIP_WAITING. We then activate and the page reloads onto the fresh version.

  Bump CACHE when shipping so clients pick up a new worker and get prompted.
*/
var CACHE = "bergkamp-v3";

var SHELL = [
  "/",
  "/index.html",
  "/boardwalk-looks.html",
  "/manifest.json",
  "/styles/main.css",
  "/scripts/data.js",
  "/scripts/app.js",
  "/assets/img/looks/lace-trim.jpg",
  "/assets/img/looks/denim-cutoffs.jpg",
  "/assets/img/looks/seersucker-ruffle.jpg",
  "/assets/img/brand/sea-badge.jpg",
  "/assets/img/rainbow/rainbow-bg.png",
  "/assets/img/rainbow/rainbow-banner.png",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // addAll is all-or-nothing; add individually so one miss does not fail install
      return Promise.all(SHELL.map(function (url) {
        return c.add(url).catch(function () {});
      }));
    })
    // Note: no skipWaiting here. The new worker waits so the page can prompt.
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// The page posts this when the user accepts the update prompt.
self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

// Same-origin app code we want to keep fresh on every load.
function isAppCode(url) {
  if (url.origin !== self.location.origin) return false;
  return /\.(?:html|css|js)$/.test(url.pathname);
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  var isDoc = req.mode === "navigate" ||
    (req.headers.get("accept") || "").indexOf("text/html") !== -1;

  // Network-first for the document and same-origin app code (auto updates)
  if (isDoc || isAppCode(url)) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) {
          return m || (isDoc ? caches.match("/index.html") : m);
        });
      })
    );
    return;
  }

  // Cache-first for everything else (images, icons, fonts)
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && (sameOrigin || res.type === "cors" || res.type === "opaque")) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
    })
  );
});
