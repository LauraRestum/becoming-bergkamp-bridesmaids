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

  /* A small map pin glyph for the compact "open in maps" cue. */
  function pinSVG() {
    return '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z"/>' +
      '<circle cx="12" cy="10" r="2.5"/></svg>';
  }

  function swatchRow(swatches) {
    if (!swatches || !swatches.length) return "";
    var dots = swatches.map(function (s) {
      return '<span class="swatch"><span class="dot" style="background:' + esc(s.hex) + '"></span>' +
             '<span class="nm">' + esc(s.name) + '</span></span>';
    }).join("");
    return '<div class="swatches reveal">' + dots + "</div>";
  }

  /* A single outfit inspiration collage for a day, run full bleed (edge to
     edge) as its own band so the looks fill the screen. The art is a
     transparent PNG that sits straight on the day color, or on an optional
     on-theme band color set inline. A small gold label and a quiet hint ride
     in the padded margins above and below. The collage already carries the
     palette, so the swatch dots are dropped wherever it appears. Tapping the
     image opens the shared lightbox at full size. */
  function outfitInspoHTML(inspo) {
    if (!inspo || !inspo.src) return "";
    var alt = inspo.alt || "Outfit inspiration";
    // An optional band color feathers in and out so the collage melts into the
    // day color instead of stopping on a hard line at the top and bottom edges.
    var bg = inspo.bg
      ? ' style="background:linear-gradient(to bottom, transparent 0%, ' +
          esc(inspo.bg) + ' 12%, ' + esc(inspo.bg) + ' 88%, transparent 100%)"'
      : "";
    return '<section class="outfit-inspo reveal">' +
      '<div class="wrap"><div class="day__inner">' +
        '<p class="outfit-inspo__label">Outfit inspo</p>' +
      "</div></div>" +
      '<button class="outfit-inspo__btn" type="button"' + bg + ' data-zoom="' + esc(inspo.src) +
        '" data-zoom-alt="' + esc(alt) + '" aria-label="Expand outfit inspiration">' +
        '<img class="outfit-inspo__img" src="' + esc(inspo.src) +
          '" alt="' + esc(alt) + '" loading="lazy">' +
      "</button>" +
      '<div class="wrap"><div class="day__inner">' +
        '<span class="outfit-inspo__hint" aria-hidden="true">Tap to expand</span>' +
      "</div></div>" +
    "</section>";
  }

  /* The looks people have already ordered for a night, gathered under the
     outfit inspo so everyone can see what the group is wearing and steer
     toward a different color or shade. A gold label (with a hairline above)
     and a short note set it up, then each claimed look sits in a calm column
     with its owner's name tagged below. Tapping a look opens the shared
     lightbox at full size. */
  function claimedLooksHTML(data) {
    if (!data || !data.looks || !data.looks.length) return "";
    var cards = data.looks.map(function (look) {
      if (!look || !look.src) return "";
      var alt = look.alt || ((look.name || "Someone") + "'s look");
      var tag = look.name ? esc(look.name) + "'s" : "Claimed";
      return '<figure class="claimed-look">' +
        '<button class="claimed-look__btn" type="button" data-zoom="' + esc(look.src) +
          '" data-zoom-alt="' + esc(alt) + '" aria-label="Expand ' + tag + ' look">' +
          '<img class="claimed-look__img" src="' + esc(look.src) +
            '" alt="' + esc(alt) + '" loading="lazy">' +
        "</button>" +
        '<figcaption class="claimed-look__tag">' + tag + "</figcaption>" +
      "</figure>";
    }).join("");
    return '<section class="claimed-looks reveal">' +
      '<p class="claimed-looks__label">' + esc(data.label || "Who's wearing what") + "</p>" +
      (data.note ? '<p class="claimed-looks__note">' + esc(data.note) + "</p>" : "") +
      '<div class="claimed-looks__grid">' + cards + "</div>" +
    "</section>";
  }

  function pagefoot(script, line) {
    return '<footer class="pagefoot reveal">' + contactList() +
           '<div class="script">' + esc(script) +
           '</div><div class="line">' + esc(line) + "</div></footer>";
  }

  /* The wedding party phone list, shared by every footer. Names are already in
     alphabetical order in the data; each number is a tappable tel: link. */
  function contactList() {
    var c = DATA.contacts;
    if (!c || !c.people || !c.people.length) return "";
    var rows = c.people.map(function (p) {
      return '<li class="contact">' +
        '<span class="contact__who">' +
          '<span class="contact__name">' + esc(p.name) + "</span>" +
          (p.role ? '<span class="contact__role">' + esc(p.role) + "</span>" : "") +
        "</span>" +
        '<a class="contact__num" href="tel:' + esc(p.tel) + '">' + esc(p.display) + "</a>" +
        "</li>";
    }).join("");
    return '<section class="contacts reveal">' +
      (c.eyebrow ? '<div class="contacts__eyebrow">' + esc(c.eyebrow) + "</div>" : "") +
      (c.title ? '<h3 class="contacts__title">' + esc(c.title) + "</h3>" : "") +
      '<ul class="contacts__list">' + rows + "</ul>" +
    "</section>";
  }


  /* -------------------------------------------------- EDITORIAL THEME PIECES */
  /* Home, The Day Before, and The Day Of share the main wedding site's look: a
     near black ground, Rosaline serif, a newspaper masthead, and a link back to
     the main site so the two stay interconnected. */

  /* The newspaper masthead that crowns a sub page (The Day Before / Day Of). */
  function edPageHead(kicker, headline, sub) {
    return '<header class="ed-masthead reveal">' +
      '<div class="ed-rule-top"></div>' +
      '<div class="ed-dateline">' +
        '<span class="l">Becoming Bergkamp</span>' +
        '<span class="c">' + esc(kicker) + "</span>" +
        '<span class="r">' + esc(sub) + "</span>" +
      "</div>" +
      '<div class="ed-rule-thin"></div>' +
      '<h1 class="ed-masthead__title ed-masthead__title--page">' + esc(headline) + "</h1>" +
      '<div class="ed-rule-thick"></div>' +
    "</header>";
  }

  /* An editorial figure: a venue illustration carried over from the main site,
     hairline framed, with a serif italic caption. The "ed-figure--bleed"
     variant drops the frame and feathers the edges for art that sits on black
     (the chapel at night), so it melts into the dark ground. */
  function edFigure(p, variant) {
    if (!p || !p.src) return "";
    return '<figure class="ed-figure' + (variant ? " " + variant : "") + ' reveal">' +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") +
        '" loading="lazy" decoding="async">' +
      (p.caption ? "<figcaption>" + esc(p.caption) + "</figcaption>" : "") +
    "</figure>";
  }

  /* A centered hairline with a gold fleuron, the main site's section divider. */
  function edOrnament() {
    return '<div class="ed-orn reveal"><span class="ln"></span>' +
      '<span class="om" aria-hidden="true">&#10022;</span><span class="ln"></span></div>';
  }

  /* The editorial schedule list (serif times in gold, hairline rows). */
  function edSchedule(list) {
    return list.map(function (s) {
      return '<article class="ed-sched reveal">' +
        '<div class="time">' + esc(s.time) + "</div>" +
        "<div><h3>" + esc(s.name) + "</h3>" +
          '<div class="venue">' + esc(s.venue) + "</div>" +
          '<div class="place">' + esc(s.place) + "</div>" +
          '<div class="when">' + esc(s.when) + "</div></div>" +
        (s.photo ? edFigure(s.photo, "ed-figure--inline") : "") +
        (s.map ? '<div class="map-full">' + mapBlock(s.map, s.venue) + "</div>" : "") +
      "</article>";
    }).join("");
  }

  /* The dark sign-off, with the monogram and the link back to the main site. */
  function edFoot(script, line) {
    var site = DATA.mainSite;
    return '<footer class="ed-foot reveal">' +
      contactList() +
      '<div class="mono">LBR &middot; WJB</div>' +
      '<div class="sub">' + esc(script) + "</div>" +
      '<a class="ed-sitelink" href="' + esc(site.url) + '" target="_blank" rel="noopener">' +
        esc(site.label) + " &#8599;</a>" +
      '<div class="credit">' + esc(line) + "</div>" +
    "</footer>";
  }

  /* -------------------------------------------------- HOME */
  function renderHome() {
    var d = DATA.home;
    var site = DATA.mainSite;
    var chapters = ["Chapter I", "Chapter II", "Chapter III"];

    var rows = d.cards.map(function (c, i) {
      return '<a class="ed-portal reveal" href="' + esc(c.route) + '">' +
        '<span class="ed-portal__num">' + (chapters[i] || "") + "</span>" +
        '<span class="ed-portal__tag">' + esc(c.tag) + "</span>" +
        "<h3>" + esc(c.title) + "</h3>" +
        "<p>" + esc(c.subtitle) + "</p>" +
        '<span class="ed-portal__arrow">Enter &rarr;</span></a>';
    }).join("");

    // a fourth portal that crosses over to the main wedding website
    var mainPortal =
      '<a class="ed-portal ed-portal--main reveal" href="' + esc(site.url) +
        '" target="_blank" rel="noopener">' +
        '<span class="ed-portal__num">The Full Story</span>' +
        '<span class="ed-portal__tag">laura &amp; william</span>' +
        "<h3>The Wedding Website</h3>" +
        "<p>Our story, the ceremony, travel, the wedding party, the honeymoon, and the RSVP. Everything for the big day.</p>" +
        '<span class="ed-portal__arrow">Visit the site &#8599;</span></a>';

    // The hero leads with the full curtain projection at the top, shown edge to
    // edge so "The Bergkamps" reads clearly. Its lit floor feathers into a warm
    // dance floor that carries down to the bottom, where the one line "Laura's
    // Bridal Party" sits in display type. The curtain is set as a CSS background
    // (path from data.js) and labelled for screen readers.
    var curtainCorner = (d.curtain && d.curtain.image)
      ? '<div class="home-hero__curtain" role="img" aria-label="' + esc(d.curtain.alt) +
          '" style="background-image:url(&quot;' + esc(d.curtain.image) + '&quot;)"></div>'
      : "";

    // The checkerboard the bride dropped in, run as the backdrop behind the
    // option buttons. It feathers in at the top so the section heading stays on
    // clean paper and the checks read behind the buttons.
    var portalsBg = (d.checkerboard && d.checkerboard.image)
      ? '<div class="home-portals__bg" aria-hidden="true" style="background-image:url(&quot;' +
          esc(d.checkerboard.image) + '&quot;)"></div>'
      : "";

    el("view-home").innerHTML =
      '<section class="home-hero reveal">' +
        curtainCorner +
        '<h1 class="home-hero__title">' + esc(d.title) + "</h1>" +
      "</section>" +
      '<section class="ed-portals home-portals">' +
        portalsBg +
        '<div class="home-portals__in">' +
          '<div class="ed-kicker reveal">The Weekend, In Parts</div>' +
          '<h2 class="ed-h reveal">Where To Begin</h2>' +
          '<div class="ed-portal-grid">' + rows + mainPortal + "</div>" +
        "</div>" +
      "</section>" +
      edFoot(d.footerScript, d.footerLine);
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

  /* The collapsible panel holds the full plan for a day. The words ride on the
     day's own soft gradient so they stay clean and easy to read. Photos are used
     sparingly, in two deliberate treatments rather than behind every block: one
     quiet full-bleed band that melts into the day color (no framed box), and a
     half image, half words split for the location. A day only ever uses a couple
     of its photos, so the panel reads calm instead of busy. */
  function dayPanel(day) {
    var body = "";

    // Intro copy on the clean gradient. A koozie prop, when set, tucks into the
    // corner as a small fun element the text flows around. The banner art is
    // not repeated here, it is already the hero of the tile above.
    var intro = "";
    if (day.koozie) {
      intro += '<img class="day__koozie" src="' + esc(day.koozie) +
        '" alt="All I Sea is Love koozie" loading="lazy">';
    }
    intro += '<p class="vibe reveal">' + esc(day.vibe) + "</p>";
    if (day.secondary) intro += '<p class="secondary reveal">' + esc(day.secondary) + "</p>";
    if (day.transport) intro += transportHTML(day.transport);
    body += seg(intro);

    // The night-in activity grid (Beach Club) rides on the clean gradient right
    // under the intro, so the icons read before the games and forms below.
    if (day.activities) body += seg(activitiesHTML(day.activities));

    // One quiet, full-bleed photo that fades into the day at top and bottom: a
    // natural gradient, never a picture sitting in a box, and no copy over it to
    // fight for legibility.
    var atmos = atmospherePhoto(day);
    if (atmos) body += bandSeg(atmos);

    if (day.sunset) body += seg(sunsetHTML(day.sunset));

    var plan = "";
    if (day.forms) plan += formsHTML(day.forms);
    if (day.wear) plan += '<div class="wearchip chip reveal"><span class="lead">Wear</span>' + esc(day.wear) + "</div>";
    // The outfit inspo collage already carries the palette, so the swatch dots
    // would be redundant. Show the dots only on days without a collage.
    if (!day.outfitInspo) plan += swatchRow(day.swatches);
    body += seg(plan);

    // The outfit inspo collage runs full bleed in its own band below the plan.
    body += outfitInspoHTML(day.outfitInspo);

    // The looks people have already ordered sit just under the inspo, so the
    // group can see what is taken and pick a different color or shade.
    if (day.claimedLooks) body += seg(claimedLooksHTML(day.claimedLooks));

    if (day.meals) body += seg(mealsHTML(day.meals));
    // The boardwalk tee is a surprise, so its widget keeps a plain background.
    if (day.looksWidget && window.Boardwalk) body += seg(window.Boardwalk.html());

    // The location reads as half image, half words: the photo bleeds off one
    // side and melts into the day color where it meets the copy.
    if (day.location) body += splitSeg(dayLocationHTML(day.location), splitPhoto(day));

    // A close affordance at the foot of the plan, so a long day can be folded
    // back up without scrolling all the way to its banner.
    body += closeHTML(day);

    return '<div class="day__panel" id="panel-' + esc(day.id) + '" hidden>' +
      '<div class="day__panel-in">' + stickersHTML(day.stickers) + dayCarHTML(day) + body + "</div></div>";
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
    // A themed photo, when set, gives the banner band its textured backing. It
    // rides on a CSS custom property; the expanded plan below sits on the day's
    // own soft gradient so the words stay clean and easy to read.
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

  /* A single quiet photo, run full bleed, that dissolves into the day color at
     its top and bottom edges through a soft gradient mask. It reads as imagery
     living in the background of the day, not a picture framed in a box, and
     carries no copy of its own so nothing has to fight it to stay legible. */
  function bandSeg(p) {
    if (!p || !p.src) return "";
    return '<section class="photoband reveal" style="background-image:url(' +
      esc(p.src) + ')" aria-hidden="true"></section>';
  }

  /* Half image, half words. The photo bleeds off one edge and melts into the day
     color along a gradient seam where it meets the copy, so picture and words
     read as one flowing panel. Falls back to a plain copy block with no photo. */
  function splitSeg(html, p) {
    if (!html) return "";
    if (!p || !p.src) return seg(html);
    return '<section class="splitseg reveal">' +
      '<div class="splitseg__media" style="background-image:url(' + esc(p.src) +
        ')" aria-hidden="true"></div>' +
      '<div class="splitseg__copy"><div class="wrap"><div class="day__inner">' +
        html + "</div></div></div>" +
    "</section>";
  }

  /* The quiet atmosphere photo for the full-bleed band. Pulled from the day's
     sunset or meal photos (the location shot is saved for the split), so a day
     only ever leans on a couple of its images. */
  function atmospherePhoto(day) {
    if (day.sunset && day.sunset.photos && day.sunset.photos[0]) return day.sunset.photos[0];
    var mp = day.meals ? mealPhotos(day.meals) : [];
    return mp[0] || null;
  }
  /* The image half of the location split: its first photo, or any day photo. */
  function splitPhoto(day) {
    if (day.location && day.location.photos && day.location.photos[0]) {
      return day.location.photos[0];
    }
    return atmospherePhoto(day);
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

  /* Form links that feed the games. Rendered as bold arrow hyperlinks (no pill).
     href "" renders a non-clickable "soon" row with a muted arrow. */
  function formsHTML(f) {
    var arrow = '<span class="arrowlink__arr" aria-hidden="true">' + arrowSVG() + "</span>";
    var items = f.items.map(function (it) {
      var txt = '<span class="arrowlink__txt">' + esc(it.label) + "</span>";
      return (it.href && it.href !== "#")
        ? '<a class="arrowlink" href="' + esc(it.href) + '" target="_blank" rel="noopener">' +
            txt + arrow + "</a>"
        : '<span class="arrowlink is-ghost">' + txt +
            '<span class="arrowlink__soon">soon</span>' + arrow + "</span>";
    }).join("");
    return '<div class="forms reveal">' +
      (f.eyebrow ? '<span class="eyebrow">' + esc(f.eyebrow) + "</span>" : "") +
      (f.title ? "<h3>" + esc(f.title) + "</h3>" : "") +
      (f.note ? '<p class="forms__note">' + esc(f.note) + "</p>" : "") +
      '<div class="forms__links">' + items + "</div></div>";
  }

  /* A small right arrow used by the form links and the map cue. */
  function arrowSVG() {
    return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  }

  /* The Beach Club night-in plan: a bold grid of line icons (taco bar, dips,
     games, trivia, crafts, movie) rather than a paragraph. Each item
     names an inline SVG by key. Hairline framed, no boxed cards or shadows. */
  function activityIcon(key) {
    var paths = {
      taco: '<path d="M2.5 17a9.5 9.5 0 0 1 19 0Z"/><path d="M6 17c.8-1.2 2-1.2 2.8 0M10.6 17c.8-1.2 2-1.2 2.8 0M15.2 17c.8-1.2 2-1.2 2.8 0"/>',
      dip: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M13 11V6.5a2.5 2.5 0 0 1 2.5-2.5"/>',
      games: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
      trivia: '<rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M10 9.5a2 2 0 1 1 2.7 1.9c-.6.2-1 .7-1 1.4M11.7 15.5h.01"/>',
      craft: '<path d="M12 3a9 9 0 0 0 0 18c1 0 1.5-.7 1.5-1.5 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8z"/><circle cx="7.8" cy="11.8" r="1" fill="currentColor" stroke="none"/><circle cx="10.6" cy="8.2" r="1" fill="currentColor" stroke="none"/><circle cx="14.6" cy="8.2" r="1" fill="currentColor" stroke="none"/>',
      movie: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none"/>'
    };
    return '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (paths[key] || "") + "</svg>";
  }

  function activitiesHTML(a) {
    if (!a || !a.items || !a.items.length) return "";
    var cells = a.items.map(function (it) {
      return '<div class="activity reveal">' +
        '<span class="activity__icon">' + activityIcon(it.icon) + "</span>" +
        '<span class="activity__label">' + esc(it.label) + "</span>" +
        (it.note ? '<span class="activity__note">' + esc(it.note) + "</span>" : "") +
      "</div>";
    }).join("");
    return '<div class="activities reveal">' +
      (a.eyebrow ? '<span class="eyebrow">' + esc(a.eyebrow) + "</span>" : "") +
      (a.title ? "<h3>" + esc(a.title) + "</h3>" : "") +
      '<div class="activities__grid">' + cells + "</div></div>";
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

  /* The cars panning along, used both inside the car days and at the foot of the
     trip. The set is doubled in the markup and the lane slides one full set over,
     so the pan loops forever and seamlessly. The cars face left, so a leftward
     pan keeps them moving forward. No road, just the cars gliding across.
     Decorative, so it is hidden from assistive tech. */
  var carStreamSeq = 0;
  function carStream(cars) {
    if (!cars || !cars.length) return "";
    // rotate the order so each place the fleet appears leads with a different car
    var off = carStreamSeq++ % cars.length;
    var ordered = cars.slice(off).concat(cars.slice(0, off));
    var lane = ordered.concat(ordered).map(function (src) {
      return '<img class="carstream__car" src="' + esc(src) + '" alt="" decoding="async">';
    }).join("");
    return '<div class="carstream reveal" aria-hidden="true">' +
      '<div class="carstream__lane">' + lane + "</div></div>";
  }

  /* The car days (Friday night, Saturday day, Saturday night) carry the panning
     stream across the top of their plan. Days opt in with "cars: true". */
  function dayCarHTML(day) {
    if (!day.cars) return "";
    return carStream(DATA.bachelorette.carBand || []);
  }

  /* Travel Details. A collapsible banner that sits right above the days. Closed,
     it is just its title. Open it and the bridesmaid plane taxis in from the left
     and lands as the header (CSS keyframes keyed off .is-open), then the flights
     and dates ride below. Built with the day accordion's class hooks so it shares
     the same open and close machinery. */
  function travelLegsHTML(legs) {
    if (!legs || !legs.length) return "";
    var rows = legs.map(function (l) {
      return '<div class="travel-leg reveal">' +
        '<span class="travel-leg__label">' + esc(l.label) + "</span>" +
        '<div class="travel-leg__body">' +
          '<span class="travel-leg__route">' + esc(l.route) + "</span>" +
          (l.date ? '<span class="travel-leg__date">' + esc(l.date) + "</span>" : "") +
          (l.time ? '<span class="travel-leg__time">' + esc(l.time) + "</span>" : "") +
        "</div></div>";
    }).join("");
    return '<div class="travel-legs">' + rows + "</div>";
  }

  /* Flight options, grouped by home base. Each option is a hairline-ruled
     editorial block: airline and dates up top with the round trip price,
     the outbound and return legs segment by segment below, and a booking
     link straight into Google Flights. */
  function flightLegHTML(leg) {
    var rows = (leg.segments || []).map(function (s) {
      if (s.layover) {
        return '<div class="flightop__lay">' + esc(s.layover) + "</div>";
      }
      return '<div class="flightop__seg">' +
        '<span class="flightop__segno">' + esc(s.flight) + "</span>" +
        '<span class="flightop__segdetail">' + esc(s.detail) + "</span>" +
      "</div>";
    }).join("");
    return '<div class="flightop__leg">' +
      '<div class="flightop__leghead">' +
        '<span class="flightop__leglabel">' + esc(leg.label) + "</span>" +
        (leg.meta ? '<span class="flightop__legmeta">' + esc(leg.meta) + "</span>" : "") +
      "</div>" + rows +
    "</div>";
  }

  function flightOptionHTML(o) {
    var price = o.price
      ? '<div class="flightop__price"><b>' + esc(o.price) + "</b><span>round trip</span></div>"
      : '<div class="flightop__price flightop__price--tap"><b>Tap to price</b><span>round trip</span></div>';
    return '<article class="flightop reveal">' +
      '<header class="flightop__top">' +
        '<div class="flightop__id">' +
          '<span class="flightop__airline">' + esc(o.airline) + "</span>" +
          '<span class="flightop__dates">' + esc(o.dates) + "</span>" +
        "</div>" + price +
      "</header>" +
      (o.note ? '<p class="flightop__note">' + esc(o.note) + "</p>" : "") +
      '<div class="flightop__legs">' + o.legs.map(flightLegHTML).join("") + "</div>" +
      '<a class="flightop__book" href="' + esc(o.link) + '" target="_blank" rel="noopener">' +
        "Book on Google Flights</a>" +
    "</article>";
  }

  function flightGroupsHTML(groups) {
    if (!groups || !groups.length) return "";
    return '<div class="flightops">' + groups.map(function (g) {
      return '<div class="flightops__group">' +
        '<h4 class="flightops__city reveal">' + esc(g.city) + "</h4>" +
        g.options.map(flightOptionHTML).join("") +
      "</div>";
    }).join("") + "</div>";
  }

  function renderTravelDetails(t) {
    if (!t) return "";
    var head =
      '<button class="day__head day__head--text travel__head reveal" type="button" ' +
        'aria-expanded="false" aria-controls="panel-travel">' +
        '<span class="day__seam"><span class="day__cap">' + esc(t.eyebrow) + "</span></span>" +
        '<span class="day__hero"><span class="travel__title">' +
          '<span class="day__wordmark">' + esc(t.title) + "</span>" +
          (t.hint ? '<span class="travel__hint">' + esc(t.hint) + "</span>" : "") +
        "</span></span>" +
        '<span class="day__chev" aria-hidden="true"></span>' +
      "</button>";

    // The plane runway. The plane is decorative, so the band is hidden from
    // assistive tech and the flights below carry the real information.
    var sky =
      '<div class="travel__sky" aria-hidden="true">' +
        '<img class="travel__plane" src="' + esc(t.plane) + '" alt="">' +
      "</div>";

    var copy =
      '<div class="wrap"><div class="day__inner">' +
        (t.headline ? '<h3 class="travel__head-copy reveal">' + esc(t.headline) + "</h3>" : "") +
        (t.note ? '<p class="travel__note reveal">' + esc(t.note) + "</p>" : "") +
        travelLegsHTML(t.legs) +
        flightGroupsHTML(t.flightGroups) +
      "</div></div>";

    var closer =
      '<div class="wrap"><button class="day__close reveal" type="button" ' +
        'aria-controls="panel-travel">' +
        '<span class="day__close-chev" aria-hidden="true"></span>' +
        '<span>Close ' + esc(t.title) + "</span></button></div>";

    var panel =
      '<div class="day__panel" id="panel-travel" hidden>' +
        '<div class="day__panel-in">' + sky + copy + closer + "</div>" +
      "</div>";

    return '<section class="day day--acc travel-sec" id="travel">' + head + panel + "</section>";
  }

  function renderBachelorette() {
    var b = DATA.bachelorette;

    var pills = b.jump.map(function (j) {
      return '<button class="jumpnav__pill" data-anchor="' + esc(j.anchor) + '">' + esc(j.label) + "</button>";
    }).join("");

    // The home base is one compact, tappable block: name, address and note
    // sit together and the whole thing opens directions in maps. No bulky
    // embedded map, it stays editorial and takes up little room.
    var house =
      '<a class="house reveal" id="house" href="' + esc(b.house.map.link) +
        '" target="_blank" rel="noopener">' +
        (b.house.photo
          ? '<img class="house__photo" src="' + esc(b.house.photo.src) +
            '" alt="' + esc(b.house.photo.alt || "") + '" loading="lazy" decoding="async">'
          : "") +
        '<span class="house__glyph" aria-hidden="true">&#128026;</span>' +
        '<span class="eyebrow">' + esc(b.house.eyebrow) + "</span>" +
        "<h2>" + esc(b.house.title) + "</h2>" +
        '<div class="addr">' + esc(b.house.address) + "</div>" +
        '<div class="note">' + esc(b.house.note) + "</div>" +
        '<span class="maptap"><span class="maptap__pin">' + pinSVG() + "</span>Open in Maps</span>" +
      "</a>";

    // Short editorial notes under the home base (getting there, what to bring).
    // Hairline framed, no box, so they stay editorial rather than card-heavy.
    function homeNote(n, cls) {
      if (!n) return "";
      return '<div class="homenote ' + cls + ' reveal">' +
        (n.eyebrow ? '<span class="eyebrow">' + esc(n.eyebrow) + "</span>" : "") +
        (n.title ? "<h2>" + esc(n.title) + "</h2>" : "") +
        (n.note ? '<p class="note">' + esc(n.note) + "</p>" : "") +
      "</div>";
    }
    var travel = homeNote(b.travel, "travel");
    var packing = homeNote(b.packing, "packing");

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
        '<div class="wavewrap">' + waveSVG("#FFFFFF") + "</div>" +
      "</section>" +
      '<nav class="jumpnav"><div class="jumpnav__scroll">' + pills + "</div></nav>" +
      '<div class="wrap">' + house + "</div>" +
      '<div class="bach-days">' + renderTravelDetails(b.travelDetails) + "</div>" +
      '<div class="wrap">' + travel + packing + "</div>" +
      '<div class="bach-days">' + days + "</div>" +
      carStream(b.carBand) +
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
  function renderDayBefore() {
    var d = DATA.dayBefore;
    el("view-day-before").innerHTML =
      edPageHead(d.hero.kicker, d.hero.headline, d.hero.subtitle) +
      '<section class="ed-schedule reveal">' + edSchedule(d.schedule) + "</section>" +
      edFoot(d.footerScript, d.footerLine);
  }

  function renderDayOf() {
    var d = DATA.dayOf;
    var colors = d.colors;
    var headline = Array.isArray(d.hero.headline) ? d.hero.headline.join("") : d.hero.headline;
    var colorPalette = colors.image
      ? '<img class="ed-colors__img" src="' + esc(colors.image.src) + '" alt="' +
          esc(colors.image.alt || "") + '" loading="lazy" decoding="async">'
      : '<div class="dots">' + (colors.dots || []).map(function (c) {
          return '<span class="d" style="background:' + esc(c.hex) + '" title="' + esc(c.name) + '"></span>';
        }).join("") + "</div>";

    el("view-day-of").innerHTML =
      edPageHead(d.hero.kicker, headline, d.hero.subtitle) +
      (d.hero.image
        ? edFigure({ src: d.hero.image, alt: d.hero.imageAlt }, "ed-figure--bleed")
        : "") +
      '<section class="ed-schedule reveal">' + edSchedule(d.schedule) + "</section>" +
      '<div class="ed-sched-note reveal">' + esc(d.scheduleNote) + "</div>" +
      (d.feature ? edFigure(d.feature) : "") +
      edOrnament() +
      '<section class="ed-colors reveal">' +
        '<div class="ed-kicker">' + esc(colors.eyebrow) + "</div>" +
        '<h2 class="ed-h">' + esc(colors.title) + "</h2>" +
        colorPalette +
        '<p class="statement">' + esc(colors.statement) + "</p>" +
      "</section>" +
      '<section class="ed-attire reveal">' +
        '<div class="ed-kicker">' + esc(d.attire.eyebrow) + "</div>" +
        '<h2 class="ed-h">' + esc(d.attire.title) + "</h2>" +
        '<p class="body">' + esc(d.attire.body) + "</p>" +
        (d.attire.tag ? '<span class="tag">' + esc(d.attire.tag) + "</span>" : "") +
        (d.attire.inspo ? edFigure(d.attire.inspo) : "") +
      "</section>" +
      edFoot(d.footerScript, d.footerLine);
  }

  /* -------------------------------------------------- wave divider */
  function waveSVG(fill) {
    return '<svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">' +
      '<path fill="' + fill + '" d="M0,40 C180,90 360,0 540,30 C720,60 900,90 1080,55 C1260,25 1380,40 1440,50 L1440,80 L0,80 Z"></path></svg>';
  }

  /* -------------------------------------------------- REVEAL */
  /* Containers whose direct reveal children animate in with a soft stagger. */
  var STAGGER_PARENTS = ".ed-portal-grid, .ed-schedule, .looks";

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
      var tile = e.target.closest && e.target.closest(".look-tile, .outfit-inspo__btn, .claimed-look__btn");
      if (tile) {
        lastFocus = document.activeElement;
        img.src = tile.getAttribute("data-zoom");
        var look = tile.getAttribute("data-look");
        img.alt = look ? look + ", front and back"
                       : (tile.getAttribute("data-zoom-alt") || "Outfit inspiration");
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

  // Home, The Day Before, and The Day Of wear the dark, serif, newspaper theme
  // that echoes the main wedding site. The Bachelorette keeps its own SEA brand.
  var EDITORIAL_ROUTES = { "/home": 1, "/day-before": 1, "/day-of": 1 };

  function route() {
    var r = currentRoute();
    var viewId = ROUTES[r];

    Object.keys(ROUTES).forEach(function (key) {
      var v = el(ROUTES[key]);
      if (v) v.classList.toggle("is-active", ROUTES[key] === viewId);
    });

    // swap the page theme for the active route (only the dark routes get it).
    // Home wears the light variant: the same editorial dress flipped to black
    // on white, so it favors white while The Day Before and The Day Of stay dark.
    document.body.classList.toggle("theme-editorial", !!EDITORIAL_ROUTES[r]);
    document.body.classList.toggle("theme-light", r === "/home");
    // The Bachelorette keeps its SEA brand. A nautical dress on the top bar so
    // the wordmark fits the trip rather than reading like the wedding masthead.
    document.body.classList.toggle("theme-sea", r === "/bachelorette");

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
