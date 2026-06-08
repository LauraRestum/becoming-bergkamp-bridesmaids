/*
  Becoming Bergkamp :: Pick Your Shorts carousel
  Shared by the embedded Boardwalk day (app.js) and the standalone
  boardwalk-looks.html page. Renders from DATA.boardwalk and steps through the
  shorts options with arrows, with a crop top / tucked in toggle per look.
  No backend, no storage, no em dashes anywhere.
*/
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Markup for the whole widget. State and images are filled in by init(). */
  function html() {
    var w = DATA.boardwalk;
    var total = w.looks.length;

    return '' +
      '<div class="boardwalk-widget reveal">' +
        '<div class="tee-note"><span class="glyph" aria-hidden="true">&#128085;</span>' +
          '<div><div class="t">' + esc(w.teeNote) + '</div>' +
          '<div class="s">' + esc(w.teeSub) + '</div>' +
          (w.teeSizing ? '<div class="s tee-size">' + esc(w.teeSizing) + '</div>' : '') +
          '</div></div>' +

        '<div class="shorts" data-shorts>' +
          '<div class="shorts__bar">' +
            '<div class="shorts__count"><span data-cur>1</span>' +
              '<span class="sl">/</span><span data-total>' + total + '</span></div>' +
            '<div class="shorts__fit" role="group" aria-label="How to wear the tee">' +
              '<button type="button" class="shorts__fitbtn is-on" data-fit="normal">Tucked in</button>' +
              '<button type="button" class="shorts__fitbtn" data-fit="crop">Crop top</button>' +
            '</div>' +
          '</div>' +

          '<div class="shorts__stage">' +
            '<button type="button" class="shorts__arrow is-prev" data-prev aria-label="Previous look">&#8249;</button>' +
            '<div class="shorts__frame">' +
              '<div class="look-tile shorts__tile" data-zoom="" data-look="">' +
                '<img data-img alt="" loading="lazy">' +
                '<span class="ov ov-fb">front &amp; back</span>' +
                '<span class="ov ov-zoom">tap to zoom</span>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="shorts__arrow is-next" data-next aria-label="Next look">&#8250;</button>' +
          '</div>' +

          '<div class="shorts__dots" data-dots></div>' +

          '<div class="shorts__meta">' +
            '<div class="shorts__num" data-num></div>' +
            '<h3 data-name></h3>' +
            '<p class="desc" data-desc></p>' +
            '<div data-shop></div>' +
          '</div>' +
        '</div>' +

        (w.fitNote ? '<div class="shorts__fitnote">' + esc(w.fitNote) + '</div>' : '') +
      '</div>';
  }

  /* Wire every [data-shorts] carousel found inside scope (default document). */
  function init(scope) {
    var root = scope || document;
    var looks = DATA.boardwalk.looks;

    Array.prototype.forEach.call(root.querySelectorAll("[data-shorts]"), function (box) {
      var state = { i: 0, fit: "normal" };

      var img   = box.querySelector("[data-img]");
      var tile  = box.querySelector(".shorts__tile");
      var numEl = box.querySelector("[data-num]");
      var nameEl = box.querySelector("[data-name]");
      var descEl = box.querySelector("[data-desc]");
      var shopEl = box.querySelector("[data-shop]");
      var curEl  = box.querySelector("[data-cur]");
      var dotsEl = box.querySelector("[data-dots]");
      var fitBtns = box.querySelectorAll(".shorts__fitbtn");

      // dots, one per look
      dotsEl.innerHTML = looks.map(function (lk, i) {
        return '<button type="button" class="shorts__dot" data-go="' + i +
          '" aria-label="Look ' + (i + 1) + '"></button>';
      }).join("");
      var dots = dotsEl.querySelectorAll(".shorts__dot");

      function paint() {
        var lk = looks[state.i];
        var src = lk[state.fit] || lk.normal || lk.crop;
        var fitWord = state.fit === "crop" ? "tee cropped" : "tee tucked in";
        var altText = lk.name + ", front and back, " + fitWord;

        img.src = src;
        img.alt = altText;
        tile.setAttribute("data-zoom", src);
        tile.setAttribute("data-look", lk.name + " (" + fitWord + ")");

        numEl.textContent = "LOOK " + lk.num;
        nameEl.textContent = lk.name;
        descEl.textContent = lk.desc;
        curEl.textContent = String(state.i + 1);

        shopEl.innerHTML = (lk.shop && lk.shop !== "#")
          ? '<a class="pill-link" href="' + esc(lk.shop) + '" target="_blank" rel="noopener">Shop on Amazon</a>'
          : '<span class="pill-link is-ghost">Amazon link coming soon</span>';

        Array.prototype.forEach.call(dots, function (d, i) {
          d.classList.toggle("is-on", i === state.i);
        });
        Array.prototype.forEach.call(fitBtns, function (b) {
          b.classList.toggle("is-on", b.getAttribute("data-fit") === state.fit);
        });
      }

      function go(n) {
        var len = looks.length;
        state.i = (n % len + len) % len;
        paint();
      }

      box.querySelector("[data-prev]").addEventListener("click", function () { go(state.i - 1); });
      box.querySelector("[data-next]").addEventListener("click", function () { go(state.i + 1); });
      Array.prototype.forEach.call(dots, function (d) {
        d.addEventListener("click", function () { go(parseInt(d.getAttribute("data-go"), 10)); });
      });
      Array.prototype.forEach.call(fitBtns, function (b) {
        b.addEventListener("click", function () { state.fit = b.getAttribute("data-fit"); paint(); });
      });

      paint();
    });
  }

  window.Boardwalk = { html: html, init: init };
})();
