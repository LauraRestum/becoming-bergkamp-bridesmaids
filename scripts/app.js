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
  /* The trip is a stack of compact, uniform banner tiles on one shared
     background. Collapsed, each day is just its hand-lettered banner with a
     small weekday tag, all the same size so the whole trip reads at a glance
     with almost no scrolling. Tapping a tile expands its plan in place. */
  function seg(html) {
    return html ? '<div class="wrap"><div class="day__inner">' + html + "</div></div>" : "";
  }

  /* The banner tile. The banner art is the hero and runs the full width of the
     section. Days without banner art fall back to their title in the display
     face. The whole tile is the toggle button for the panel below. */
  function dayHead(day) {
    var hasBanner = !!day.banner;
    var hero = hasBanner
      ? '<img class="day__banner-hero" src="' + esc(day.banner) + '" alt="' + esc(day.title) + '">'
      : '<span class="day__wordmark">' + esc(day.title) + "</span>";
    // The weekday label sits in the seam: the soft band where one hero bleeds
    // into the next. It straddles the boundary so the trip reads as one
    // continuous flow with the day name floating in the transition.
    return '<button class="day__head' + (hasBanner ? "" : " day__head--text") +
        ' reveal" type="button" aria-expanded="false" ' +
        'aria-controls="panel-' + esc(day.id) + '">' +
      '<span class="day__seam"><span class="day__cap">' + esc(day.label) + "</span></span>" +
      '<span class="day__hero">' + hero + "</span>" +
      '<span class="day__chev" aria-hidden="true"></span>' +
    "</button>";
  }

  /* The collapsible panel holds the full plan for a day. Each block of copy
     sits over one of the day's photos, washed back with a heavy themed veil so
     the image reads as a background behind the words (running through the whole
     panel, not just at its foot) and the text stays legible. No captions. */
  function dayPanel(day) {
    // The day's photos, in reading order, become the background washes. They
    // are cycled across the blocks so the imagery runs through the whole panel.
    var pics = dayPhotos(day);
    var pi = 0;
    function bgFor() { return pics.length ? pics[pi++ % pics.length] : null; }

    var body = "";

    // Intro copy. A koozie prop, when set, tucks into the corner of the copy
    // as a small fun element the text flows around. The banner art is not
    // repeated here, it is already the hero of the tile above.
    var intro = "";
    if (day.koozie) {
      intro += '<img class="day__koozie" src="' + esc(day.koozie) +
        '" alt="All I Sea is Love koozie" loading="lazy">';
    }
    intro += '<p class="vibe reveal">' + esc(day.vibe) + "</p>";
    if (day.secondary) intro += '<p class="secondary reveal">' + esc(day.secondary) + "</p>";
    if (day.transport) intro += transportHTML(day.transport);
    body += washSeg(intro, bgFor());

    if (day.sunset) body += washSeg(sunsetHTML(day.sunset), bgFor());

    var plan = "";
    if (day.forms) plan += formsHTML(day.forms);
    if (day.wear) plan += '<div class="wearchip chip reveal"><span class="lead">Wear</span>' + esc(day.wear) + "</div>";
    plan += swatchRow(day.swatches);
    body += washSeg(plan, bgFor());

    if (day.meals) body += washSeg(mealsHTML(day.meals), bgFor());
    // The boardwalk tee is a surprise, so its widget keeps a plain background.
    if (day.looksWidget && window.Boardwalk) body += seg(window.Boardwalk.html());
    if (day.location) body += washSeg(dayLocationHTML(day.location), bgFor());

    // A close affordance at the foot of the plan, so a long day can be folded
    // back up without scrolling all the way to its banner.
    body += closeHTML(day);

    return '<div class="day__panel" id="panel-' + esc(day.id) + '" hidden>' +
      '<div class="day__panel-in">' + stickersHTML(day.stickers) + body + "</div></div>";
  }

  /* The collapse control that lives at the bottom of an open day. Tapping it
     folds the day shut and returns to its banner. */
  function closeHTML(day) {
    return '<div class="wrap"><button class="day__close reveal" type="button" ' +
      'aria-controls="panel-' + esc(day.id) + '">' +
      '<span class="day__close-chev" aria-hidden="true"></span>' +
      '<span>Close ' + esc(day.label) + "</span></button></div>";
  }

  /* Fun, sticker-like elements scattered over an expanded plan. Purely
     decorative (aria-hidden, no pointer events), each one is a transparent PNG
     placed and tilted by its "pos" class in the stylesheet. */
  function stickersHTML(list) {
    if (!list || !list.length) return "";
    var imgs = list.map(function (s) {
      return '<img class="sticker ' + esc(s.pos || "") + '" src="' + esc(s.src) +
        '" alt="" loading="lazy">';
    }).join("");
    return '<div class="day__stickers" aria-hidden="true">' + imgs + "</div>";
  }

  function renderDay(day) {
    // A themed photo, when set, washes the whole day world (the hero band and
    // the expanded plan share it). It rides on a CSS custom property so the
    // stylesheet owns the scrims that keep the text readable.
    var cls = "day day--acc " + day.theme + (day.bg ? " has-bg" : "");
    var style = day.bg ? ' style="--day-bg:url(&quot;' + esc(day.bg) + '&quot;)"' : "";
    return '<section class="' + cls + '" id="' + esc(day.id) + '"' + style + ">" +
             dayHead(day) + dayPanel(day) +
           "</section>";
  }

  /* Hand-lettered banner art, run full bleed. The image background (its colors
     and gradients) reaches edge to edge and the top and bottom dissolve into
     the day, so the header has no rectangle, it just flows in. */
  function bannerHTML(day) {
    if (!day.banner) return "";
    var crest = day.bannerKeepsTitle ? " day__banner--crest" : "";
    return '<figure class="day__banner-bleed reveal">' +
      '<img class="day__banner' + crest + '" src="' + esc(day.banner) +
      '" alt="' + esc(day.title) + (day.bannerKeepsTitle ? " crest" : "") + '"></figure>';
  }

  /* A block of copy laid over one of the day's photos. The image fills the full
     width of the block as a background and is washed back with a heavy themed
     veil so it reads as a quiet backdrop and the words stay legible. Blocks with
     no photo fall back to a plain segment. */
  function washSeg(html, p) {
    if (!html) return "";
    if (!p || !p.src) return seg(html);
    // The photo is a decorative background wash behind the copy, so it carries
    // no alt text of its own (the words in the block describe the day).
    return '<section class="washseg reveal" style="background-image:url(' + esc(p.src) + ')">' +
      '<span class="washseg__veil" aria-hidden="true"></span>' +
      '<div class="wrap"><div class="day__inner">' + html + "</div></div>" +
    "</section>";
  }

  /* Every photo for a day, in reading order, used as the panel's backgrounds. */
  function dayPhotos(day) {
    var out = [];
    if (day.sunset && day.sunset.photos) out = out.concat(day.sunset.photos);
    if (day.meals) out = out.concat(mealPhotos(day.meals));
    if (day.location && day.location.photos) out = out.concat(day.location.photos);
    return out;
  }
  /* Pull the photos hung on each named meal, in serving order. */
  function mealPhotos(m) {
    var out = [];
    ["breakfast", "lunch", "dinner"].forEach(function (k) {
      var v = m[k];
      if (v && typeof v === "object" && v.photos) out = out.concat(v.photos);
    });
    return out;
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

    // Lead with the mockup art on white when one is set, then a full-width
    // header banner, otherwise the round crest and hand-set lettering.
    var heroInner, heroClass;
    if (b.hero.mockup) {
      heroInner =
        '<img class="hero-mockup reveal" src="' + esc(b.hero.mockup) +
          '" alt="All I Sea is Love, Laura\'s Bachelorette, est 2026">' +
        '<div class="sub reveal">' + esc(b.hero.subtitle) + "</div>";
      heroClass = "hero hero--white";
    } else if (b.hero.banner) {
      heroInner =
        '<img class="hero-banner reveal" src="' + esc(b.hero.banner) +
          '" alt="' + esc(b.hero.kicker) + " " + esc(b.hero.headline) + '">' +
        '<div class="sub reveal">' + esc(b.hero.subtitle) + "</div>";
      heroClass = "hero hero--sea hero--banner";
    } else {
      heroInner =
        '<img class="hero-badge reveal" src="assets/img/brand/sea-badge.jpg" alt="All I Sea is Love, Laura\'s Bachelorette, Pawleys Island" width="120" height="120">' +
        '<div class="kicker reveal">' + esc(b.hero.kicker) + "</div>" +
        '<h1 class="reveal">' + esc(b.hero.headline) + "</h1>" +
        '<div class="sub reveal">' + esc(b.hero.subtitle) + "</div>";
      heroClass = "hero hero--sea";
    }

    el("view-bachelorette").innerHTML =
      '<section class="' + heroClass + '">' +
        heroInner +
        '<div class="wavewrap">' + waveSVG("#FBF7EF") + "</div>" +
      "</section>" +
      '<nav class="jumpnav"><div class="jumpnav__scroll">' + pills + "</div></nav>" +
      '<div class="wrap">' + house + "</div>" +
      '<div class="bach-days">' + days + "</div>" +
      '<div class="wrap">' + pagefoot(b.footerScript, b.footerLine) + "</div>";

    initJumpNav();
    initAccordion(el("view-bachelorette"));
    if (window.Boardwalk) window.Boardwalk.init(el("view-bachelorette"));
  }

  /* -------------------------------------------------- DAY ACCORDION */
  /* Days start collapsed so every one is scannable at a glance. Tapping a
     glance card opens its panel with a smooth height transition. Several can
     be open at once. */
  function initAccordion(scope) {
    (scope || document).querySelectorAll(".day--acc").forEach(function (sec) {
      var head = sec.querySelector(".day__head");
      if (head && !head.dataset.accBound) {
        head.dataset.accBound = "1";
        head.addEventListener("click", function () {
          toggleDay(sec, !sec.classList.contains("is-open"));
        });
      }
      // the close control at the foot of the plan folds the day back up and
      // returns to its banner so the next day is right there
      var closer = sec.querySelector(".day__close");
      if (closer && !closer.dataset.accBound) {
        closer.dataset.accBound = "1";
        closer.addEventListener("click", function () {
          toggleDay(sec, false);
          if (head) head.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  }

  function toggleDay(sec, open) {
    var head = sec.querySelector(".day__head");
    var panel = sec.querySelector(".day__panel");
    if (!head || !panel) return;

    sec.classList.toggle("is-open", open);
    head.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      panel.hidden = false;
      // content inside the panel reveals immediately when it opens
      panel.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-in"); });
      var target = panel.scrollHeight;
      panel.style.height = "0px";
      // next frame so the browser registers the start height before animating
      requestAnimationFrame(function () { panel.style.height = target + "px"; });
      panel.addEventListener("transitionend", function done(e) {
        if (e.propertyName !== "height") return;
        panel.style.height = "auto"; // let later-loading images grow the panel
        panel.removeEventListener("transitionend", done);
      });
    } else {
      // from auto height back to a fixed value, then to zero
      panel.style.height = panel.scrollHeight + "px";
      requestAnimationFrame(function () { panel.style.height = "0px"; });
      panel.addEventListener("transitionend", function done(e) {
        if (e.propertyName !== "height") return;
        panel.hidden = true;
        panel.style.height = "";
        panel.removeEventListener("transitionend", done);
      });
    }
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
        if (!target) return;
        // open a collapsed day before jumping to it
        if (target.classList.contains("day--acc") && !target.classList.contains("is-open")) {
          toggleDay(target, true);
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
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
