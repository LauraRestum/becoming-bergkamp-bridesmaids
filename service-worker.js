/*
  Becoming Bergkamp :: service worker
  Network-first for the document, cache-first for assets.
  Bump CACHE when shipping new content so clients pick it up.
*/
var CACHE = "bergkamp-v2";

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
    }).then(function () { return self.skipWaiting(); })
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

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;

  // Network-first for navigations / the document
  if (req.mode === "navigate" || (req.headers.get("accept") || "").indexOf("text/html") !== -1) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) { return m || caches.match("/index.html"); });
      })
    );
    return;
  }

  // Cache-first for everything else (styles, scripts, images, fonts)
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
