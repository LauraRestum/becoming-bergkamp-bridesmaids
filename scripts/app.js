/*
  Becoming Bergkamp :: app shell logic
  Hash routing, drawer, reveal-on-scroll, sticky day-jump nav, lightbox,
  and data-driven rendering of every view. No backend, no storage.
  No em dashes anywhere.
*/
(function () {
  "use strict";

  /* -------------------------------------------------- helpers */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function el(id) { return document.getElementById(id); }

  /* keyless Google Maps embed + "Open in Maps" link */
  function mapBlock(map, label) {
    if (!map) return "";
    return (
      '<a class="pill-link" href="' + esc(map.link) + '" target="_blank" rel="noopener">Open in Maps</a>' +
      '<iframe class="map-embed" loading="lazy" title="Map: ' + esc(label || map.query) + '" ' +
      'src="' + esc(map.embed) + '"></iframe>'
    );
  }

  function swatchRow(swatches) {
    if (!swatches || !swatches.length) return "";
    var dots = swatches.map(function (s) {
      return '<span class="swatch"><span class="dot" style="background:' + esc(s.hex) + '"></span>' +
             '<span class="nm">' + esc(s.name) + '</span></span>';
    }).join("");
    return '<div class="swatches reveal">' + dots + "</div>";
  }

  function pagefoot(script, line) {
    return '<footer class="pagefoot reveal"><div class="script">' + esc(script) +
           '</div><div class="line">' + esc(line) + "</div></footer>";
  }

  /* -------------------------------------------------- HOME */
  function renderHome() {
    var d = DATA.home;
    var cards = d.cards.map(function (c) {
      return '<a class="tapcard ' + c.theme + ' reveal" href="' + esc(c.route) + '">' +
        '<span class="tag">' + esc(c.tag) + "</span>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<span class="sub">' + esc(c.subtitle) + "</span>" +
        '<span class="arrow">&rarr;</span></a>';
    }).join("");

    el("view-home").innerHTML =
      '<section class="home-hero">' +
        '<div class="kicker reveal">' + esc(d.kicker) + "</div>" +
        '<h1 class="reveal">' + esc(d.headline[0]) +
          '<span class="italic">' + esc(d.headline[1]) + "</span></h1>" +
        '<div class="gold-rule reveal"><span class="dot"></span><span class="line"></span>' +
          '<span class="dot"></span><span class="line"></span><span class="dot"></span></div>' +
        '<div class="meta reveal">' + esc(d.meta) + "</div>" +
      "</section>" +
      '<div class="wrap"><div class="home-cards">' + cards + "</div></div>" +
      '<div class="wrap">' + pagefoot(d.footerScript, d.footerLine) + "</div>";
  }

  /* -------------------------------------------------- BACHELORETTE */
  function renderDay(day) {
    var glyph = "&#127796;"; // palm tree default
    if (day.theme === "day--rainbow") glyph = "&#128031;"; // tropical fish
    if (day.theme === "day--coconuts") glyph = "&#129373;"; // coconut
    if (day.theme === "day--boardwalk") glyph = "&#127881;";

    var heading = day.banner
      ? '<h2 class="reveal day__banner-wrap"><img class="day__banner" src="' + esc(day.banner) +
        '" alt="' + esc(day.title) + '"></h2>'
      : '<h2 class="reveal' + (day.rainbow ? " rainbow-title" : "") + '">' + esc(day.title) + "</h2>";

    var body =
      '<div class="label reveal">' + esc(day.label) + "</div>" +
      heading;

    if (day.hook) body += '<div class="hook reveal">' + esc(day.hook) + "</div>";
    body += '<p class="vibe reveal">' + esc(day.vibe) + "</p>";
    if (day.secondary) body += '<p class="secondary reveal">' + esc(day.secondary) + "</p>";
    if (day.wear) {
      body += '<div class="wearchip chip reveal"><span class="lead">Wear</span>' + esc(day.wear) + "</div>";
    }
    body += swatchRow(day.swatches);
    if (day.looksWidget) body += boardwalkWidgetHTML();

    var bgStyle = day.bg ? ' style="background-image:url(' + esc(day.bg) + ')"' : "";

    return '<section class="day ' + day.theme + '" id="' + esc(day.id) + '"' + bgStyle + ">" +
             '<span class="day__glyph" aria-hidden="true">' + glyph + "</span>" +
             '<div class="wrap"><div class="day__inner">' + body + "</div></div>" +
           "</section>";
  }

  function renderBachelorette() {
    var b = DATA.bachelorette;

    var pills = b.jump.map(function (j) {
      return '<button class="jumpnav__pill" data-anchor="' + esc(j.anchor) + '">' + esc(j.label) + "</button>";
    }).join("");

    var house =
      '<section class="house reveal" id="house"><span class="eyebrow">' + esc(b.house.eyebrow) + "</span>" +
        "<h2>" + esc(b.house.title) + "</h2>" +
        '<div class="addr">' + esc(b.house.address) + "</div>" +
        '<div class="note">' + esc(b.house.note) + "</div>" +
        mapBlock(b.house.map, b.house.title) +
      "</section>";

    var days = b.days.map(renderDay).join("");

    var wwg = b.whereWeGoing;
    var locCards = wwg.cards.map(function (c) {
      return '<article class="loc-card reveal"><span class="eyebrow">' + esc(c.eyebrow) + "</span>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<div class="detail">' + esc(c.detail) + "</div>" +
        mapBlock(c.map, c.title) + "</article>";
    }).join("");

    el("view-bachelorette").innerHTML =
      '<section class="hero hero--sea">' +
        '<img class="hero-badge reveal" src="assets/img/brand/sea-badge.jpg" alt="All I Sea is Love, Laura\'s Bachelorette, Pawleys Island" width="120" height="120">' +
        '<div class="kicker reveal">' + esc(b.hero.kicker) + "</div>" +
        '<h1 class="reveal">' + esc(b.hero.headline) + "</h1>" +
        '<div class="sub reveal">' + esc(b.hero.subtitle) + "</div>" +
        '<div class="wavewrap">' + waveSVG("#FBF7EF") + "</div>" +
      "</section>" +
      '<nav class="jumpnav"><div class="jumpnav__scroll">' + pills + "</div></nav>" +
      '<div class="wrap">' + house + "</div>" +
      days +
      '<div class="wrap"><section class="wwg"><span class="eyebrow">' + esc(wwg.eyebrow) + "</span>" +
        '<h2 class="reveal">' + esc(wwg.heading) + "</h2>" + locCards + "</section>" +
        pagefoot(b.footerScript, b.footerLine) + "</div>";

    initJumpNav();
  }

  /* -------------------------------------------------- DAY BEFORE / OF */
  function scheduleCards(list) {
    return list.map(function (s) {
      return '<article class="sched-card reveal">' +
        '<div class="time">' + esc(s.time) + "</div>" +
        "<div><h3>" + esc(s.name) + "</h3>" +
          '<div class="venue">' + esc(s.venue) + "</div>" +
          '<div class="place">' + esc(s.place) + "</div>" +
          '<div class="when">' + esc(s.when) + "</div></div>" +
        (s.map ? '<div class="map-full">' + mapBlock(s.map, s.venue) + "</div>" : "") +
        "</article>";
    }).join("");
  }

  function renderDayBefore() {
    var d = DATA.dayBefore;
    el("view-day-before").innerHTML =
      '<section class="hero hero--greenery">' +
        '<div class="kicker reveal">' + esc(d.hero.kicker) + "</div>" +
        '<h1 class="reveal"><span class="italic">' + esc(d.hero.headline) + "</span></h1>" +
        '<div class="sub reveal">' + esc(d.hero.subtitle) + "</div>" +
        '<div class="wavewrap">' + waveSVG("#FBF7EF") + "</div>" +
      "</section>" +
      '<div class="wrap"><div class="schedule">' + scheduleCards(d.schedule) + "</div>" +
        pagefoot(d.footerScript, d.footerLine) + "</div>";
  }

  function renderDayOf() {
    var d = DATA.dayOf;
    var colors = d.colors;
    var colorDots = colors.dots.map(function (c) {
      return '<span class="d" style="background:' + esc(c.hex) + '" title="' + esc(c.name) + '"></span>';
    }).join("");

    el("view-day-of").innerHTML =
      '<section class="hero hero--blackgold">' +
        '<div class="kicker reveal">' + esc(d.hero.kicker) + "</div>" +
        '<h1 class="reveal"><span class="gold">' + esc(d.hero.headline[0]) + "</span>" +
          esc(d.hero.headline[1]) + "</h1>" +
        '<div class="sub reveal">' + esc(d.hero.subtitle) + "</div>" +
        '<div class="wavewrap">' + waveSVG("#FBF7EF") + "</div>" +
      "</section>" +
      '<div class="wrap">' +
        '<div class="schedule">' + scheduleCards(d.schedule) + "</div>" +
        '<div class="sched-note reveal">' + esc(d.scheduleNote) + "</div>" +
        '<section class="colors reveal"><span class="eyebrow">' + esc(colors.eyebrow) + "</span>" +
          "<h2>" + esc(colors.title) + "</h2>" +
          '<div class="dots">' + colorDots + "</div>" +
          '<p class="statement">' + esc(colors.statement) + "</p></section>" +
        '<section class="attire reveal"><span class="eyebrow">' + esc(d.attire.eyebrow) + "</span>" +
          "<h2>" + esc(d.attire.title) + "</h2>" +
          '<p class="body">' + esc(d.attire.body) + "</p>" +
          '<span class="tag">' + esc(d.attire.tag) + "</span></section>" +
        pagefoot(d.footerScript, d.footerLine) + "</div>";
  }

  /* -------------------------------------------------- BOARDWALK WIDGET */
  function boardwalkWidgetHTML() {
    var w = DATA.boardwalk;
    var looks = w.looks.map(function (lk, i) {
      var shop = (lk.shop && lk.shop !== "#")
        ? '<a class="pill-link" href="' + esc(lk.shop) + '" target="_blank" rel="noopener">Shop the shorts</a>'
        : '<span class="pill-link is-ghost">Link coming soon</span>';
      return '<article class="look-card reveal">' +
        '<div class="look-tile" data-zoom="' + esc(lk.img) + '" data-look="' + esc(lk.name) + '">' +
          '<img loading="lazy" src="' + esc(lk.img) + '" alt="' + esc(lk.name) + ', front and back">' +
          '<span class="ov ov-num">LOOK ' + esc(lk.num) + "</span>" +
          '<span class="ov ov-fb">front &amp; back</span>' +
          '<span class="ov ov-zoom">tap to zoom</span>' +
        "</div>" +
        '<div class="look-meta"><h3>' + esc(lk.name) + "</h3>" +
          '<p class="desc">' + esc(lk.desc) + "</p>" + shop + "</div>" +
        "</article>";
    }).join("");

    return '<div class="boardwalk-widget reveal">' +
      '<div class="tee-note"><span class="glyph" aria-hidden="true">&#128085;</span>' +
        '<div><div class="t">' + esc(w.teeNote) + "</div>" +
        '<div class="s">' + esc(w.teeSub) + "</div></div></div>" +
      '<div class="looks">' + looks + "</div></div>";
  }

  /* -------------------------------------------------- wave divider */
  function waveSVG(fill) {
    return '<svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">' +
      '<path fill="' + fill + '" d="M0,40 C180,90 360,0 540,30 C720,60 900,90 1080,55 C1260,25 1380,40 1440,50 L1440,80 L0,80 Z"></path></svg>';
  }

  /* -------------------------------------------------- REVEAL */
  var revealObserver;
  function initReveal(scope) {
    if (!("IntersectionObserver" in window)) {
      (scope || document).querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); revealObserver.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    (scope || document).querySelectorAll(".reveal:not(.is-in)").forEach(function (n) {
      revealObserver.observe(n);
    });
  }

  /* -------------------------------------------------- JUMP NAV */
  function initJumpNav() {
    var pills = Array.prototype.slice.call(document.querySelectorAll(".jumpnav__pill"));
    if (!pills.length) return;

    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        var target = document.getElementById(p.getAttribute("data-anchor"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    if ("IntersectionObserver" in window) {
      var topOffset = 0;
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.id;
            pills.forEach(function (p) {
              p.classList.toggle("is-active", p.getAttribute("data-anchor") === id);
            });
            // keep the active pill visible in the scroller
            var active = document.querySelector(".jumpnav__pill.is-active");
            if (active) active.scrollIntoView({ inline: "center", block: "nearest" });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

      pills.forEach(function (p) {
        var t = document.getElementById(p.getAttribute("data-anchor"));
        if (t) spy.observe(t);
      });
    }
  }

  /* -------------------------------------------------- LIGHTBOX */
  function initLightbox() {
    var lb = el("lightbox");
    if (!lb) return;
    var img = lb.querySelector("img");

    document.addEventListener("click", function (e) {
      var tile = e.target.closest && e.target.closest(".look-tile");
      if (tile) {
        img.src = tile.getAttribute("data-zoom");
        img.alt = (tile.getAttribute("data-look") || "Look") + ", front and back";
        lb.classList.add("is-open");
      }
    });

    function close() { lb.classList.remove("is-open"); img.src = ""; }
    lb.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("is-open")) close();
    });
  }

  /* -------------------------------------------------- DRAWER */
  function initDrawer() {
    var burger = el("hamburger");
    var scrim = el("scrim");

    function open() { document.body.classList.add("drawer-open"); burger.setAttribute("aria-expanded", "true"); }
    function close() { document.body.classList.remove("drawer-open"); burger.setAttribute("aria-expanded", "false"); }
    function toggle() { document.body.classList.contains("drawer-open") ? close() : open(); }

    burger.addEventListener("click", toggle);
    scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    // close when a drawer link is tapped
    document.querySelectorAll(".drawer__link").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  /* -------------------------------------------------- ROUTER */
  var ROUTES = {
    "/home": "view-home",
    "/bachelorette": "view-bachelorette",
    "/day-before": "view-day-before",
    "/day-of": "view-day-of"
  };

  function currentRoute() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h || !ROUTES[h]) return "/home";
    return h;
  }

  function route() {
    var r = currentRoute();
    var viewId = ROUTES[r];

    Object.keys(ROUTES).forEach(function (key) {
      var v = el(ROUTES[key]);
      if (v) v.classList.toggle("is-active", ROUTES[key] === viewId);
    });

    document.querySelectorAll(".drawer__link").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + r);
    });

    window.scrollTo(0, 0);
    initReveal(el(viewId));
  }

  /* -------------------------------------------------- BOOT */
  function boot() {
    renderHome();
    renderBachelorette();
    renderDayBefore();
    renderDayOf();

    initDrawer();
    initLightbox();

    window.addEventListener("hashchange", route);
    route();

    // register service worker for offline / installable PWA
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js").catch(function () {});
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
