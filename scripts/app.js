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

  /* A scrolling brand band. The set is duplicated so the loop is seamless. */
  function marqueeHTML(items) {
    var unit = items.map(function (t) {
      return '<span><span class="star" aria-hidden="true">&#9670;</span> ' + esc(t) + "</span>";
    }).join("");
    return '<div class="marquee reveal" aria-hidden="true">' +
      '<div class="marquee__track">' + unit + unit + "</div></div>";
  }

  /* -------------------------------------------------- HOME */
  function renderHome() {
    var d = DATA.home;
    var rows = d.cards.map(function (c, i) {
      var num = (i + 1 < 10 ? "0" : "") + (i + 1);
      return '<a class="indexrow ' + c.theme + ' reveal" href="' + esc(c.route) + '">' +
        '<span class="indexrow__wash" aria-hidden="true"></span>' +
        '<span class="indexrow__num">' + num + "</span>" +
        '<span class="indexrow__body">' +
          '<span class="indexrow__tag">' + esc(c.tag) + "</span>" +
          '<span class="indexrow__title">' + esc(c.title) + "</span>" +
          '<span class="indexrow__sub">' + esc(c.subtitle) + "</span>" +
        "</span>" +
        '<span class="indexrow__arrow" aria-hidden="true">&rarr;</span></a>';
    }).join("");

    el("view-home").innerHTML =
      '<section class="home-hero">' +
        '<div class="kicker reveal">' + esc(d.kicker) + "</div>" +
        '<h1 class="reveal">' + esc(d.headline[0]) +
          '<span class="italic">' + esc(d.headline[1]) + "</span></h1>" +
        '<div class="meta reveal">' + esc(d.meta) + "</div>" +
      "</section>" +
      marqueeHTML(["Becoming Bergkamp", "March 20 2027", "Wichita Kansas", "All You SEA is Love"]) +
      '<div class="wrap"><div class="home-cards">' + rows + "</div></div>" +
      '<div class="wrap">' + pagefoot(d.footerScript, d.footerLine) + "</div>";
  }

  /* -------------------------------------------------- BACHELORETTE */
  function renderDay(day) {
    var glyph = "&#127796;"; // palm tree default
    if (day.theme === "day--rainbow") glyph = "&#128031;"; // tropical fish
    if (day.theme === "day--coconuts") glyph = "&#129373;"; // coconut
    if (day.theme === "day--boardwalk") glyph = "&#127881;";

    var body =
      '<div class="label reveal">' + esc(day.label) + "</div>" +
      headingHTML(day);

    if (day.hook) body += '<div class="hook reveal">' + esc(day.hook) + "</div>";
    body += '<p class="vibe reveal">' + esc(day.vibe) + "</p>";
    if (day.secondary) body += '<p class="secondary reveal">' + esc(day.secondary) + "</p>";
    if (day.transport) body += transportHTML(day.transport);
    if (day.sunset) body += sunsetHTML(day.sunset);
    if (day.forms) body += formsHTML(day.forms);
    if (day.wear) {
      body += '<div class="wearchip chip reveal"><span class="lead">Wear</span>' + esc(day.wear) + "</div>";
    }
    body += swatchRow(day.swatches);
    if (day.meals) body += mealsHTML(day.meals);
    if (day.looksWidget && window.Boardwalk) body += window.Boardwalk.html();
    if (day.location) body += dayLocationHTML(day.location);

    var bgStyle = day.bg ? ' style="background-image:url(' + esc(day.bg) + ')"' : "";
    var bgClass = day.bg ? " has-bg" : "";

    return '<section class="day ' + day.theme + bgClass + '" id="' + esc(day.id) + '"' + bgStyle + ">" +
             '<span class="day__glyph" aria-hidden="true">' + glyph + "</span>" +
             '<div class="wrap"><div class="day__inner">' + body + "</div></div>" +
           "</section>";
  }

  /* The day title: hand-lettered banner art, a crest plus word, a placeholder
     frame when art is still coming, or plain serif text. */
  function headingHTML(day) {
    if (day.banner && day.bannerKeepsTitle) {
      return '<div class="reveal day__crest"><img class="day__banner day__banner--crest" src="' +
        esc(day.banner) + '" alt="' + esc(day.title) + ' crest"></div>' +
        '<h2 class="reveal day__title">' + esc(day.title) + "</h2>";
    }
    if (day.banner) {
      return '<h2 class="reveal day__banner-wrap"><img class="day__banner" src="' +
        esc(day.banner) + '" alt="' + esc(day.title) + '"></h2>';
    }
    if (day.bannerPlaceholder) {
      return '<div class="reveal day__banner-ph"><span>Banner art coming soon</span></div>' +
        '<h2 class="reveal day__title">' + esc(day.title) + "</h2>";
    }
    return '<h2 class="reveal">' + esc(day.title) + "</h2>";
  }

  /* A small "we have the ride" note. */
  function transportHTML(text) {
    return '<div class="transport reveal"><span class="transport__glyph" aria-hidden="true">&#128666;</span>' +
      '<span>' + esc(text) + "</span></div>";
  }

  /* Warm sunset panel layered over the cruise description. */
  function sunsetHTML(s) {
    return '<div class="sunset reveal">' +
      (s.eyebrow ? '<span class="eyebrow">' + esc(s.eyebrow) + "</span>" : "") +
      (s.title ? "<h3>" + esc(s.title) + "</h3>" : "") +
      (s.body ? '<p class="sunset__body">' + esc(s.body) + "</p>" : "") +
      (s.cost ? '<p class="sunset__cost">' + esc(s.cost) + "</p>" : "") +
      (s.link ? linkChips(null, [s.link]) : "") +
      "</div>";
  }

  /* A small row of outbound link chips (a website plus any menu links). */
  function linkChips(website, links) {
    var items = [];
    if (website) items.push({ label: "Website", href: website });
    (links || []).forEach(function (l) { if (l && l.href) items.push(l); });
    if (!items.length) return "";
    return '<div class="linklist">' + items.map(function (it) {
      return '<a class="linkchip" href="' + esc(it.href) + '" target="_blank" rel="noopener">' +
        esc(it.label) + "</a>";
    }).join("") + "</div>";
  }

  /* Where we eat for this day. Only the provided meals render (no N/A rows).
     A meal value can be a plain string or a venue object with links. */
  function mealsHTML(m) {
    var order = [
      { key: "breakfast", glyph: "&#9749;" },   // hot beverage
      { key: "lunch", glyph: "&#127869;" },      // fork and knife with plate
      { key: "dinner", glyph: "&#127865;" }      // clinking glasses
    ];
    var rows = order.filter(function (o) { return m[o.key]; }).map(function (o) {
      var label = o.key.charAt(0).toUpperCase() + o.key.slice(1);
      var v = (typeof m[o.key] === "string") ? { place: m[o.key] } : m[o.key];
      return '<div class="meal">' +
        '<span class="meal__glyph" aria-hidden="true">' + o.glyph + "</span>" +
        '<div class="meal__body">' +
          '<span class="meal__label">' + label + "</span>" +
          '<span class="meal__place">' + esc(v.place) + "</span>" +
          (v.address ? '<span class="meal__addr">' + esc(v.address) + "</span>" : "") +
          linkChips(v.website, v.links) +
        "</div></div>";
    }).join("");
    if (!rows) return "";
    return '<div class="meals reveal"><span class="eyebrow">On the Menu</span>' +
      '<div class="meals__list">' + rows + "</div></div>";
  }

  /* Form links that feed the games. href "" renders a non-clickable pill. */
  function formsHTML(f) {
    var items = f.items.map(function (it) {
      return (it.href && it.href !== "#")
        ? '<a class="pill-link" href="' + esc(it.href) + '" target="_blank" rel="noopener">' + esc(it.label) + "</a>"
        : '<span class="pill-link is-ghost">' + esc(it.label) + " &middot; soon</span>";
    }).join("");
    return '<div class="forms reveal">' +
      (f.eyebrow ? '<span class="eyebrow">' + esc(f.eyebrow) + "</span>" : "") +
      (f.title ? "<h3>" + esc(f.title) + "</h3>" : "") +
      (f.note ? '<p class="forms__note">' + esc(f.note) + "</p>" : "") +
      '<div class="forms__links">' + items + "</div></div>";
  }

  /* a location marker that lives inside the day it belongs to */
  function dayLocationHTML(loc) {
    return '<div class="day-loc reveal">' +
      (loc.eyebrow ? '<span class="eyebrow">' + esc(loc.eyebrow) + "</span>" : "") +
      "<h3>" + esc(loc.title) + "</h3>" +
      '<div class="detail">' + esc(loc.detail) + "</div>" +
      (loc.address ? '<div class="day-loc__addr">' + esc(loc.address) + "</div>" : "") +
      linkChips(loc.website, loc.links) +
      mapBlock(loc.map, loc.title) + "</div>";
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

    // Lead with the full-width header banner when one is set, otherwise the
    // round crest and hand-set lettering.
    var heroInner = b.hero.banner
      ? '<img class="hero-banner reveal" src="' + esc(b.hero.banner) +
          '" alt="' + esc(b.hero.kicker) + " " + esc(b.hero.headline) + '">' +
        '<div class="sub reveal">' + esc(b.hero.subtitle) + "</div>"
      : '<img class="hero-badge reveal" src="assets/img/brand/sea-badge.jpg" alt="All I Sea is Love, Laura\'s Bachelorette, Pawleys Island" width="120" height="120">' +
        '<div class="kicker reveal">' + esc(b.hero.kicker) + "</div>" +
        '<h1 class="reveal">' + esc(b.hero.headline) + "</h1>" +
        '<div class="sub reveal">' + esc(b.hero.subtitle) + "</div>";

    el("view-bachelorette").innerHTML =
      '<section class="hero hero--sea' + (b.hero.banner ? " hero--banner" : "") + '">' +
        heroInner +
        '<div class="wavewrap">' + waveSVG("#FBF7EF") + "</div>" +
      "</section>" +
      '<nav class="jumpnav"><div class="jumpnav__scroll">' + pills + "</div></nav>" +
      '<div class="wrap">' + house + "</div>" +
      days +
      '<div class="wrap">' + pagefoot(b.footerScript, b.footerLine) + "</div>";

    initJumpNav();
    if (window.Boardwalk) window.Boardwalk.init(el("view-bachelorette"));
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

  /* -------------------------------------------------- wave divider */
  function waveSVG(fill) {
    return '<svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">' +
      '<path fill="' + fill + '" d="M0,40 C180,90 360,0 540,30 C720,60 900,90 1080,55 C1260,25 1380,40 1440,50 L1440,80 L0,80 Z"></path></svg>';
  }

  /* -------------------------------------------------- REVEAL */
  /* Containers whose direct reveal children animate in with a soft stagger. */
  var STAGGER_PARENTS = ".home-cards, .schedule, .looks";

  function applyStagger(scope) {
    (scope || document).querySelectorAll(STAGGER_PARENTS).forEach(function (group) {
      var kids = group.querySelectorAll(":scope > .reveal");
      kids.forEach(function (kid, i) {
        kid.style.transitionDelay = (i * 80) + "ms";
      });
    });
  }

  var revealObserver;
  function initReveal(scope) {
    if (!("IntersectionObserver" in window)) {
      (scope || document).querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    applyStagger(scope);
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
    var closeBtn = lb.querySelector(".lightbox__close");
    var lastFocus = null;

    document.addEventListener("click", function (e) {
      var tile = e.target.closest && e.target.closest(".look-tile");
      if (tile) {
        lastFocus = document.activeElement;
        img.src = tile.getAttribute("data-zoom");
        img.alt = (tile.getAttribute("data-look") || "Look") + ", front and back";
        lb.classList.add("is-open");
        lb.setAttribute("aria-hidden", "false");
        if (closeBtn) closeBtn.focus();
      }
    });

    function close() {
      if (!lb.classList.contains("is-open")) return;
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      img.src = "";
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; }
    }
    lb.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* -------------------------------------------------- DRAWER */
  function initDrawer() {
    var burger = el("hamburger");
    var scrim = el("scrim");
    var drawer = el("drawer");

    function isOpen() { return document.body.classList.contains("drawer-open"); }
    function open() {
      document.body.classList.add("drawer-open");
      burger.setAttribute("aria-expanded", "true");
      // move focus into the drawer for keyboard and screen reader users
      var first = drawer && drawer.querySelector(".drawer__link");
      if (first) first.focus();
    }
    function close() {
      var wasOpen = isOpen();
      document.body.classList.remove("drawer-open");
      burger.setAttribute("aria-expanded", "false");
      if (wasOpen) burger.focus();
    }
    function toggle() { isOpen() ? close() : open(); }

    burger.addEventListener("click", toggle);
    scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) close();
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

    // register service worker for offline / installable PWA, with an
    // in-app prompt when a fresh version has been deployed
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", initServiceWorker);
    }
  }

  /* -------------------------------------------------- AUTO UPDATE */
  function initServiceWorker() {
    var reloading = false;

    // When the new worker takes control, reload once onto the fresh version.
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    navigator.serviceWorker.register("service-worker.js").then(function (reg) {
      // A worker may already be waiting from a previous visit.
      if (reg.waiting && navigator.serviceWorker.controller) showUpdatePrompt(reg.waiting);

      reg.addEventListener("updatefound", function () {
        var fresh = reg.installing;
        if (!fresh) return;
        fresh.addEventListener("statechange", function () {
          // "installed" with an existing controller means this is an update,
          // not the very first install, so it is safe to prompt.
          if (fresh.state === "installed" && navigator.serviceWorker.controller) {
            showUpdatePrompt(fresh);
          }
        });
      });

      // Check for a new deploy now, when the tab regains focus, and hourly.
      reg.update();
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") reg.update();
      });
      setInterval(function () { reg.update(); }, 60 * 60 * 1000);
    }).catch(function () {});
  }

  var updateShown = false;
  function showUpdatePrompt(worker) {
    if (updateShown) return;
    updateShown = true;

    var bar = document.createElement("div");
    bar.className = "update-toast";
    bar.setAttribute("role", "status");
    bar.innerHTML =
      '<span class="update-toast__text">A fresh version is ready.</span>' +
      '<button type="button" class="update-toast__btn">Update</button>';

    var btn = bar.querySelector(".update-toast__btn");
    btn.addEventListener("click", function () {
      btn.disabled = true;
      btn.textContent = "Updating";
      // Ask the waiting worker to activate; controllerchange then reloads.
      worker.postMessage({ type: "SKIP_WAITING" });
    });

    document.body.appendChild(bar);
    // next frame so the entrance transition runs
    requestAnimationFrame(function () { bar.classList.add("is-in"); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
