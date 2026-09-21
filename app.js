/* ============================================================
   ATELIER — app.js
   A hash-routed multi-page site that runs by simply opening
   index.html (or with the VS Code "Live Server" extension).
   Pages: Home, Skill pages, Find talent, Talent profile, Our work,
   Case study, Hire brief, Join as talent, About, Contact,
   Saved talent, Compare.
   All content comes from data.js.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  var D = window.ATELIER, Art = window.Art, C = D.config;
  var cats = D.categories, talents = D.talents;
  var catBy = {}, talentBy = {}, projBy = {}, projects = [];
  cats.forEach(function (c) { catBy[c.slug] = c; });
  talents.forEach(function (t) {
    talentBy[t.id] = t;
    t.projects.forEach(function (p, i) {
      p.id = p.id || t.id + "-" + (i + 1);
      p.talent = t.id; p.cat = t.cat;
      projects.push(p); projBy[p.id] = p;
    });
  });
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var avgRating = (talents.reduce(function (s, t) { return s + t.rating; }, 0) / talents.length).toFixed(1);

  /* ---------- Helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("atelier:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("atelier:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }
  function waLink(text) { return "https://wa.me/" + C.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); }
  function mailLink(subject, body) { return "mailto:" + C.email + "?subject=" + encodeURIComponent(subject || "") + (body ? "&body=" + encodeURIComponent(body) : ""); }

  var ICONS = {
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    quill: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    heart: '<path d="M12 20s-7-4.4-9-9.2C1.6 7.3 4 4 7.2 4c1.9 0 3.3 1 4.8 2.9C13.5 5 14.9 4 16.8 4 20 4 22.4 7.3 21 10.8 19 15.6 12 20 12 20z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    compare: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>',
    whatsapp: '<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z"/><path d="M9 10c0 3 2 5 5 5l1.2-1.4-2-1-.8.8c-.9-.4-1.6-1.1-2-2l.8-.8-1-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  function ico(n, s) {
    s = s || 20;
    return '<svg class="ico" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || "") + "</svg>";
  }
  function spark(cls) {
    return '<svg class="' + cls + '" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4Q50 50 96 50Q50 50 50 96Q50 50 4 50Q50 50 50 4z" fill="#141414"/></svg>';
  }
  function underline(t) { return '<span class="scribble u">' + t + '<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 8c30-6 60-6 96-3s70 4 100-1"/></svg></span>'; }
  function circled(t) { return '<span class="scribble c">' + t + '<svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M22 12C62-2 172 0 191 30c14 26-40 46-100 46S4 56 6 34C8 14 60 4 120 6"/></svg></span>'; }
  function avatarOf(t) { return t.photo ? '<img src="' + esc(t.photo) + '" alt="' + esc(t.name) + '" loading="lazy">' : Art.avatar(t); }
  function projArt(p, c, o) {
    if (p.img) return '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" loading="lazy"' + (o && o.mute ? ' style="filter:grayscale(1) contrast(.9)"' : "") + ">";
    return Art.project(p, c, o);
  }
  function list(arr, fn) { return arr.map(fn).join(""); }

  /* ---------- State: saved + compare ---------- */
  var saved = store.get("saved", []).filter(function (id) { return talentBy[id]; });
  var compare = store.get("compare", []).filter(function (id) { return talentBy[id]; });

  function toggleSave(id) {
    var i = saved.indexOf(id);
    if (i > -1) { saved.splice(i, 1); toast("Removed from saved talent"); }
    else { saved.push(id); toast(talentBy[id].name + " saved"); }
    store.set("saved", saved); syncState(true);
  }
  function toggleCompare(id) {
    var i = compare.indexOf(id);
    if (i > -1) compare.splice(i, 1);
    else if (compare.length >= 3) { toast("You can compare up to 3 profiles. Remove one first."); return; }
    else compare.push(id);
    store.set("compare", compare); syncState(true);
  }
  function syncState(refresh) {
    $$('[data-action="save"]').forEach(function (b) { var on = saved.indexOf(b.dataset.id) > -1; b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
    $$('[data-action="compare"]').forEach(function (b) { var on = compare.indexOf(b.dataset.id) > -1; b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
    var badge = $("#saved-count");
    if (badge) { badge.hidden = !saved.length; badge.textContent = saved.length; }
    renderTray();
    if (refresh && /^#\/(compare|shortlist)/.test(location.hash)) route(true);
  }
  function renderTray() {
    var tray = $("#tray");
    if (!tray) { tray = document.createElement("div"); tray.id = "tray"; $("#overlays").appendChild(tray); }
    if (!compare.length) { tray.hidden = true; tray.innerHTML = ""; return; }
    tray.hidden = false;
    tray.innerHTML = '<div class="tray-in"><span class="tray-label">Compare (' + compare.length + "/3)</span>" +
      list(compare, function (id) {
        var t = talentBy[id];
        return '<span class="tray-chip"><span class="tray-av">' + avatarOf(t) + "</span>" + esc(t.name.split(" ")[0]) +
          '<button data-action="compare-remove" data-id="' + id + '" aria-label="Remove ' + esc(t.name) + ' from comparison">' + ico("close", 14) + "</button></span>";
      }) +
      '<a class="btn btn-sm btn-ink' + (compare.length < 2 ? " disabled" : "") + '" href="#/compare"' + (compare.length < 2 ? ' aria-disabled="true" tabindex="-1"' : "") + ">Compare now</a></div>";
  }

  /* ---------- Shared components ---------- */
  function talentCard(t) {
    var c = catBy[t.cat], isSaved = saved.indexOf(t.id) > -1, inCmp = compare.indexOf(t.id) > -1;
    return '<article class="talent-card card tilt">' +
      '<a class="tc-media" href="#/talent/' + t.id + '" tabindex="-1" aria-hidden="true">' + avatarOf(t) + '<span class="tc-cat" style="background:' + c.color + '">' + esc(c.name) + "</span></a>" +
      '<div class="tc-body"><div class="tc-top"><h3><a href="#/talent/' + t.id + '">' + esc(t.name) + '</a></h3><span class="rating">' + ico("star", 14) + t.rating.toFixed(1) + "</span></div>" +
      '<p class="tc-title">' + esc(t.title) + "</p>" +
      '<p class="avail ' + t.avail + '"><i></i>' + esc(t.availText) + "</p>" +
      '<div class="tc-tags">' + list(t.skills.slice(0, 3), function (s) { return '<span class="tag">' + esc(s) + "</span>"; }) + "</div>" +
      '<div class="tc-price">' + esc(t.from) + "</div>" +
      '<div class="tc-actions"><a class="btn btn-sm" href="#/talent/' + t.id + '">View Portfolio</a><a class="btn btn-sm btn-primary" href="#/hire?talent=' + t.id + '">Hire</a>' +
      '<button class="icon-btn' + (isSaved ? " on" : "") + '" data-action="save" data-id="' + t.id + '" aria-pressed="' + isSaved + '" aria-label="Save ' + esc(t.name) + '" title="Save">' + ico("heart", 18) + "</button>" +
      '<button class="icon-btn' + (inCmp ? " on" : "") + '" data-action="compare" data-id="' + t.id + '" aria-pressed="' + inCmp + '" aria-label="Compare ' + esc(t.name) + '" title="Compare">' + ico("compare", 18) + "</button>" +
      "</div></div></article>";
  }
  function catCard(c) {
    var n = talents.filter(function (t) { return t.cat === c.slug; }).length;
    return '<a class="cat-card tilt" href="#/skill/' + c.slug + '" style="--tint:' + c.color + '"><span class="cat-ico">' + ico(c.icon, 26) + "</span>" +
      "<h3>" + esc(c.name) + "</h3><p>" + esc(c.short) + '</p><span class="cat-foot"><span>' + n + " specialists</span>" + '<span class="arrow">' + ico("arrow", 18) + "</span></span></a>";
  }
  function projectCard(p, chipOf) {
    var c = catBy[p.cat], t = talentBy[p.talent];
    return '<button class="proj" data-action="open-project" data-id="' + p.id + '" data-tags="' + esc(chipOf(p).join("|")) + '" aria-label="Open ' + esc(p.title) + '">' +
      '<span class="proj-art">' + projArt(p, c) + "</span>" +
      '<span class="proj-meta"><strong>' + esc(p.title) + "</strong><small>" + esc(p.client) + " by " + esc(t.name) + "</small></span>" +
      '<span class="proj-hover">' + ico("external", 14) + "View project</span></button>";
  }
  function caseCard(p, chipOf) {
    var c = catBy[p.cat], m = p.metrics[0];
    return '<article class="case card" data-tags="' + esc(chipOf(p).join("|")) + '">' +
      '<a class="case-art" href="#/work/' + p.id + '" tabindex="-1" aria-hidden="true">' + projArt(p, c, { fixed: true }) + "</a>" +
      '<div class="case-body"><span class="tag" style="background:' + c.color + '">' + esc(p.client) + "</span>" +
      '<div class="case-metric"><b>' + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></div>" +
      "<h4>" + esc(p.title) + "</h4><p>" + esc(p.summary) + "</p>" +
      '<a class="link-arrow" href="#/work/' + p.id + '">Read the case study ' + ico("arrow", 16) + "</a></div></article>";
  }
  /* Portfolio gallery: masonry for visual work, cards for case studies. */
  function gallery(items, chipOf, opts) {
    opts = opts || {};
    var counts = {};
    items.forEach(function (p) { chipOf(p).forEach(function (k) { counts[k] = (counts[k] || 0) + 1; }); });
    var chips = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 10);
    var visual = items.filter(function (p) { return p.kind !== "case"; }), cases = items.filter(function (p) { return p.kind === "case"; });
    return '<div class="gallery" data-gallery>' +
      (opts.chips === false ? "" : '<div class="filter-row" role="group" aria-label="Filter portfolio"><button class="fchip" data-action="filter" data-tag="" aria-pressed="true">All <small>' + items.length + "</small></button>" +
        list(chips, function (k) { return '<button class="fchip" data-action="filter" data-tag="' + esc(k) + '" aria-pressed="false">' + esc(k) + " <small>" + counts[k] + "</small></button>"; }) + "</div>") +
      (visual.length ? '<div class="g-sec"><h3 class="g-title">Visual work</h3><div class="masonry">' + list(visual, function (p) { return projectCard(p, chipOf); }) + "</div></div>" : "") +
      (cases.length ? '<div class="g-sec"><h3 class="g-title">Results and case studies</h3><div class="case-grid">' + list(cases, function (p) { return caseCard(p, chipOf); }) + "</div></div>" : "") +
      '<p class="empty" hidden>Nothing matches that filter yet. Try another one.</p></div>';
  }
  function applyFilter(btn) {
    var g = btn.closest("[data-gallery]"), tag = btn.dataset.tag, any = false;
    $$(".fchip", g).forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
    $$(".g-sec", g).forEach(function (sec) {
      var n = 0;
      $$("[data-tags]", sec).forEach(function (it) {
        var show = !tag || it.dataset.tags.split("|").indexOf(tag) > -1;
        it.hidden = !show; if (show) n++;
      });
      sec.hidden = n === 0; if (n) any = true;
    });
    $(".empty", g).hidden = any;
  }
  function faqList(faqs) {
    return '<div class="faq-list">' + list(faqs, function (f) { return '<details class="faq"><summary>' + esc(f[0]) + ico("plus", 22) + "</summary><p>" + esc(f[1]) + "</p></details>"; }) + "</div>";
  }
  function ctaBand(title, text, primary) {
    return '<section class="section tight"><div class="container"><div class="cta-band">' + spark("spark") +
      "<h2>" + title + "</h2><p>" + esc(text) + '</p><div class="hero-cta"><a class="btn btn-lg magnetic" href="' + (primary || "#/hire") + '">Start a brief</a>' +
      '<a class="btn btn-lg btn-ink magnetic" href="' + waLink("Hi " + C.brand + "! I have a project in mind.") + '" target="_blank" rel="noopener">' + ico("whatsapp", 18) + "Chat on WhatsApp</a></div></div></div></section>";
  }
  function crumbs(items) {
    return '<nav class="crumbs" aria-label="Breadcrumb">' + items.map(function (x, i) { return x[1] ? '<a href="' + x[1] + '">' + esc(x[0]) + "</a>" + (i < items.length - 1 ? "<span>/</span>" : "") : "<span>" + esc(x[0]) + "</span>"; }).join("") + "</nav>";
  }

  /* ---------- Form helpers ---------- */
  function fld(o) {
    var id = "f-" + o.name, req = o.req !== undefined ? ' data-req="' + esc(o.req === true ? "" : o.req) + '"' : "";
    var base = 'id="' + id + '" name="' + o.name + '" aria-describedby="' + id + '-err"' + req;
    var control;
    if (o.tag === "textarea") control = "<textarea " + base + (o.min ? ' data-min="' + o.min + '"' : "") + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : "") + ' rows="' + (o.rows || 5) + '">' + esc(o.val || "") + "</textarea>";
    else if (o.tag === "select") control = "<select " + base + '><option value="">' + esc(o.ph || "Choose one") + "</option>" + list(o.opts, function (x) { return '<option value="' + esc(x[0]) + '"' + (x[0] === o.val ? " selected" : "") + ">" + esc(x[1]) + "</option>"; }) + "</select>";
    else control = '<input type="' + (o.type || "text") + '" ' + base + (o.min ? ' data-min="' + o.min + '"' : "") + (o.url ? ' data-url="1"' : "") + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : "") + (o.auto ? ' autocomplete="' + o.auto + '"' : "") + ' value="' + esc(o.val || "") + '">';
    return '<div class="field' + (o.full ? " full" : "") + '"><label for="' + id + '">' + esc(o.label) + (o.optional ? ' <span class="hint">(optional)</span>' : "") + "</label>" + control + '<p class="err" id="' + id + '-err" role="alert"></p></div>';
  }
  function validateFields(form) {
    var ok = true, first = null;
    $$("[data-req]", form).forEach(function (el) {
      var v = el.type === "checkbox" ? (el.checked ? "1" : "") : el.value.trim(), msg = "";
      if (!v) msg = el.dataset.req || "This field is required.";
      else if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Enter a valid email address, like name@company.com.";
      else if (el.dataset.min && v.length < +el.dataset.min) msg = "Please write at least " + el.dataset.min + " characters.";
      else if (el.dataset.url && !/^https?:\/\/\S+\.\S+/.test(v)) msg = "Enter a full link that starts with https://";
      var box = el.closest(".field"), err = box && $(".err", box);
      if (err) err.textContent = msg;
      el.classList.toggle("invalid", !!msg); el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) { ok = false; if (!first) first = el; }
    });
    if (first) first.focus();
    return ok;
  }
  function sendPayload(type, data) {
    store.set("last-" + type, data);
    if (!C.formEndpoint) return Promise.resolve(true);
    return fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(Object.assign({ type: type }, data)) })
      .then(function (r) { return r.ok; }).catch(function () { return false; });
  }
  function successCard(title, text, actions, extra) {
    return '<div class="card success"><div class="tick">' + ico("check", 34) + '</div><h2 class="display sm">' + title + "</h2><p class=\"lead\" style=\"margin:0\">" + text + "</p>" + (extra || "") + '<div class="hero-cta" style="margin:0">' + actions + "</div></div>";
  }

  /* ============================================================
     PAGES — each returns { title, desc, html, after? }
     ============================================================ */
  function home() {
    var pickVisual = function (slug) { return projects.filter(function (p) { return p.cat === slug && p.kind === "visual"; })[0]; };
    var feat = ["video-editing", "web-development", "graphic-design", "photography", "ai-content", "social-media"].map(pickVisual);
    var hero = [feat[0], feat[2], feat[3]];
    var words = cats.map(function (c) { return c.name; }), half = words.concat(words), track = half.concat(half);
    var chipOfCat = function (p) { return [catBy[p.cat].name]; };
    var stats = [[talents.length, 0, "", "vetted specialists"], [cats.length, 0, "", "skill studios"], [Number(avgRating), 1, "", "average client rating"], [48, 0, "h", "to your first shortlist"]];
    return {
      title: "", desc: C.tagline + " Browse portfolios by skill, then hire the specialist behind the work.",
      html:
        '<section class="container hero"><div class="hero-copy">' +
        '<span class="tag">A studio of ' + talents.length + " specialists across " + cats.length + " skills</span>" +
        '<h1 class="display">Marketing talent, ' + underline("hand-picked") + " and <em>ready to ship.</em></h1>" +
        '<p class="lead">' + esc(C.brand) + " is where brands hire editors, designers, developers, ad buyers and writers. Browse portfolios by skill, check the real results, then brief the person behind the work.</p>" +
        '<div class="hero-cta"><a class="btn btn-primary btn-lg magnetic" href="#/hire">Hire a Specialist</a><a class="btn btn-lg magnetic" href="#/work">See Our Work</a></div>' +
        '<ul class="hero-proof"><li><b>' + avgRating + "</b>average rating</li><li><b>48h</b>to a shortlist</li><li><b>" + projects.length + "</b>portfolio pieces to browse</li></ul></div>" +
        '<div class="hero-art" aria-hidden="true">' +
        '<div class="fc a">' + projArt(hero[0], catBy[hero[0].cat], { fixed: true }) + "</div>" +
        '<div class="fc b">' + projArt(hero[1], catBy[hero[1].cat], { fixed: true }) + "</div>" +
        '<div class="fc c">' + projArt(hero[2], catBy[hero[2].cat], { fixed: true }) + "</div>" +
        '<span class="sticker s1">' + ico("star", 16) + avgRating + " client rating</span>" +
        '<span class="sticker s2">' + ico("check", 16) + "Portfolios first</span>" +
        '<span class="sticker s3">Matched in 48 hours</span></div></section>' +

        '<div class="marquee" aria-hidden="true"><div class="marquee-track">' + list(track, function (w) { return "<span>" + esc(w) + "</span>"; }) + "</div></div>" +

        '<section class="section"><div class="container"><div class="section-head reveal"><div><h2 class="title">Pick a skill, meet the people, <em>see the work.</em></h2></div>' +
        '<p>Every skill has its own studio with a roster of specialists and portfolios you can open before you decide.</p></div>' +
        '<div class="grid-cats reveal">' + list(cats, catCard) + "</div></div></section>" +

        '<section class="section" style="padding-top:0"><div class="container"><div class="section-head reveal"><h2 class="title">Recent work from <em>our roster</em></h2><a class="link-arrow" href="#/work">Browse all work ' + ico("arrow", 16) + "</a></div>" +
        '<div class="reveal" data-gallery><div class="masonry">' + list(feat, function (p) { return projectCard(p, chipOfCat); }) + "</div></div></div></section>" +

        '<section class="section" style="padding-top:0"><div class="container"><div class="section-head reveal"><h2 class="title">How it works, <em>start to finish</em></h2><p>A short brief in, a curated shortlist back, and a clear path to delivery.</p></div>' +
        '<div class="steps reveal">' + list(D.steps, function (s, i) { return '<div class="step"><div class="step-n">' + (i + 1) + "</div><h3>" + esc(s.t) + "</h3><p>" + esc(s.d) + "</p></div>"; }) + "</div></div></section>" +

        '<section class="statband"><div class="container stats">' + list(stats, function (s) { return '<div class="stat"><b data-count="' + s[0] + '" data-dec="' + s[1] + '" data-suffix="' + s[2] + '">' + s[0].toFixed(s[1]) + s[2] + "</b><span>" + s[3] + "</span></div>"; }) + "</div></section>" +

        '<section class="section tight"><div class="container"><p class="muted" style="text-align:center">Brands that have briefed us</p><div class="clients">' + list(D.clients, function (c) { return "<span>" + esc(c) + "</span>"; }) + "</div></div></section>" +

        '<section class="section" style="padding-top:0"><div class="container"><div class="section-head reveal"><h2 class="title">What clients say <em>after delivery</em></h2></div>' +
        '<div class="quotes reveal">' + list(D.testimonials, function (q) { return '<figure class="card quote" style="margin:0"><blockquote>&ldquo;' + esc(q.text) + '&rdquo;</blockquote><figcaption><b>' + esc(q.by) + "</b>" + esc(q.role) + "</figcaption></figure>"; }) + "</div></div></section>" +
        ctaBand("Have a project? <em>Let&rsquo;s brief it.</em>", "Tell us what you need. You will have a shortlist of specialists, with portfolios, within 48 hours.")
    };
  }

  function skillPage(slug) {
    var c = catBy[slug]; if (!c) return notFound();
    var team = talents.filter(function (t) { return t.cat === slug; }), ps = projects.filter(function (p) { return p.cat === slug; });
    var others = cats.filter(function (x) { return x !== c; });
    return {
      title: c.name, desc: c.short + " " + c.intro,
      html:
        '<section class="skill-hero" style="--tint:' + c.color + ";--deep:" + c.deep + '"><div class="container skill-hero-in"><div>' +
        crumbs([["Home", "#/"], ["Find talent", "#/talent"], [c.name]]) +
        '<span class="cat-ico big">' + ico(c.icon, 34) + "</span>" +
        '<h1 class="display">' + esc(c.name) + ", <em>done properly.</em></h1><p class=\"lead\">" + esc(c.intro) + "</p>" +
        '<div class="hero-cta"><a class="btn btn-primary btn-lg magnetic" href="#/hire?skill=' + slug + '">Hire a ' + esc(c.name) + ' specialist</a><button class="btn btn-lg magnetic" data-action="scroll" data-target="portfolio">See portfolios</button></div></div>' +
        '<aside class="card delivers"><h2>What you get</h2><ul>' + list(c.delivers, function (d) { return "<li>" + ico("check", 18) + esc(d) + "</li>"; }) + "</ul>" +
        '<p class="from">Projects start at <b>' + esc(c.pricing[0][1]) + "</b></p></aside></div></section>" +

        '<section class="section" id="talent" style="--tint:' + c.color + '"><div class="container"><div class="section-head"><h2 class="title">Meet the <em>' + esc(c.name.toLowerCase()) + " specialists</em></h2><p>Save your favourites, or tick the compare icon on up to three profiles to see them side by side.</p></div>" +
        '<div class="grid-talent">' + list(team, talentCard) + "</div></div></section>" +

        '<section class="section" id="portfolio" style="padding-top:0"><div class="container"><div class="section-head"><h2 class="title">Portfolio, <em>in their own work</em></h2><p>Open any piece to see the brief, the approach and the numbers.</p></div>' + gallery(ps, function (p) { return p.tags; }) + "</div></section>" +

        '<section class="section" style="padding-top:0"><div class="container"><div class="section-head"><h2 class="title">What it <em>costs</em></h2><p>Typical starting points. Your matched specialist confirms an exact quote after the brief.</p></div>' +
        '<div class="pricing" style="--tint:' + c.color + '">' + list(c.pricing, function (p) { return '<div class="card price"><h3>' + esc(p[0]) + "</h3><b>" + esc(p[1]) + "</b><p>" + esc(p[2]) + '</p><a class="btn btn-sm" href="#/hire?skill=' + slug + '">Get a quote</a></div>'; }) + "</div></div></section>" +

        '<section class="section" style="padding-top:0;--tint:' + c.color + '"><div class="container"><div class="section-head"><h2 class="title">Questions about <em>' + esc(c.name.toLowerCase()) + "</em></h2></div>" + faqList(c.faqs) + "</div></section>" +

        '<section class="section tight" style="padding-top:0"><div class="container"><p class="lead" style="margin:0 0 14px">Need something else?</p><div class="chips">' + list(others, function (o) { return '<a class="tag" style="background:' + o.color + ';padding:6px 16px;font-size:.92rem" href="#/skill/' + o.slug + '">' + esc(o.name) + "</a>"; }) + "</div></div></section>" +
        ctaBand("Ready for <em>" + esc(c.name.toLowerCase()) + " that works?</em>", "Send a short brief and we will match you with the right specialist from this studio.", "#/hire?skill=" + slug)
    };
  }

  /* ---------- Find talent ---------- */
  function talentIndex(q) {
    var s = { q: q.q || "", cat: q.cat || "" };
    return {
      title: "Find talent", desc: "Search and filter " + talents.length + " marketing specialists by skill, budget, availability and rating.",
      html:
        '<section class="container page-head">' + crumbs([["Home", "#/"], ["Find talent"]]) + '<h1 class="display">Find your <em>specialist.</em></h1><p class="lead">Search by name, skill or tool. Filter by budget, availability and rating, then open a profile to see the portfolio.</p></section>' +
        '<section class="container" style="padding-bottom:90px"><div class="finder">' +
        '<form class="card filters" id="tf-form" role="search" aria-label="Filter talent"><h2>Filters</h2>' +
        '<div class="field"><label for="tf-q">Search</label><input id="tf-q" type="search" name="q" placeholder="Name, skill or tool" value="' + esc(s.q) + '"></div>' +
        '<div class="field"><label for="tf-cat">Skill</label><select id="tf-cat" name="cat"><option value="">All skills</option>' + list(cats, function (c) { return '<option value="' + c.slug + '"' + (c.slug === s.cat ? " selected" : "") + ">" + esc(c.name) + "</option>"; }) + "</select></div>" +
        '<div class="field"><label for="tf-tier">Budget</label><select id="tf-tier" name="tier"><option value="">Any budget</option><option value="1">$ Budget-friendly</option><option value="2">$$ Mid-range</option><option value="3">$$$ Premium</option></select></div>' +
        '<div class="field"><label for="tf-rating">Rating</label><select id="tf-rating" name="rating"><option value="">Any rating</option><option value="4.8">4.8 and up</option><option value="4.9">4.9 and up</option></select></div>' +
        '<div class="field"><label for="tf-sort">Sort by</label><select id="tf-sort" name="sort"><option value="rating">Top rated</option><option value="price">Lowest budget first</option><option value="jobs">Most projects</option></select></div>' +
        '<label class="check"><input type="checkbox" name="avail" value="1"><span>Available now</span></label>' +
        '<button type="button" class="btn btn-sm" data-action="tf-reset">Clear filters</button></form>' +
        '<div><div class="results-bar"><p id="tf-count" aria-live="polite"></p></div><div class="grid-talent" id="tf-grid"></div></div></div></section>',
      after: function () {
        var form = $("#tf-form");
        function run() {
          var f = new FormData(form), qv = (f.get("q") || "").trim().toLowerCase(), cat = f.get("cat"), tier = f.get("tier"), rating = parseFloat(f.get("rating")) || 0, avail = f.get("avail"), sort = f.get("sort");
          var out = talents.filter(function (t) {
            if (cat && t.cat !== cat) return false;
            if (tier && String(t.tier) !== tier) return false;
            if (rating && t.rating < rating) return false;
            if (avail && t.avail !== "now") return false;
            if (qv) { var hay = [t.name, t.title, t.skills.join(" "), t.tools.join(" "), catBy[t.cat].name, t.loc].join(" ").toLowerCase(); if (hay.indexOf(qv) < 0) return false; }
            return true;
          });
          out.sort(function (a, b) { return sort === "price" ? a.tier - b.tier || b.rating - a.rating : sort === "jobs" ? b.jobs - a.jobs : b.rating - a.rating || b.jobs - a.jobs; });
          $("#tf-count").innerHTML = "<b>" + out.length + "</b> " + (out.length === 1 ? "specialist" : "specialists");
          $("#tf-grid").innerHTML = out.length ? list(out, talentCard) : '<div class="empty-state" style="grid-column:1/-1"><h2>No one matches yet</h2><p>Try removing a filter, or tell us what you need and we will find someone for you.</p><a class="btn btn-primary" href="#/hire">Start a brief</a></div>';
        }
        form.addEventListener("input", run); form.addEventListener("change", run);
        form.addEventListener("submit", function (e) { e.preventDefault(); });
        $('[data-action="tf-reset"]', form).addEventListener("click", function () {
          $("#tf-q").value = ""; $("#tf-cat").value = ""; $("#tf-tier").value = ""; $("#tf-rating").value = ""; $("#tf-sort").value = "rating"; $('input[name="avail"]', form).checked = false; run();
        });
        run();
      }
    };
  }

  /* ---------- Talent profile ---------- */
  function talentPage(id) {
    var t = talentBy[id]; if (!t) return notFound();
    var c = catBy[t.cat], more = talents.filter(function (x) { return x.cat === t.cat && x !== t; });
    var isSaved = saved.indexOf(t.id) > -1;
    return {
      title: t.name + ", " + t.title, desc: t.bio,
      html:
        '<section class="container profile">' + crumbs([["Home", "#/"], [c.name, "#/skill/" + c.slug], [t.name]]) +
        '<div class="profile-grid"><div>' +
        '<header class="p-head"><div class="p-avatar">' + avatarOf(t) + "</div><div>" +
        '<a class="tag" style="background:' + c.color + '" href="#/skill/' + c.slug + '">' + esc(c.name) + "</a>" +
        '<h1 class="display sm" style="margin-top:12px">' + esc(t.name) + '</h1><p class="lead" style="margin-top:8px">' + esc(t.title) + "</p>" +
        '<p class="p-meta"><span class="rating">' + ico("star", 16) + t.rating.toFixed(1) + "</span><span>" + t.jobs + " projects delivered</span><span>" + ico("pin", 15) + " " + esc(t.loc) + '</span><span class="avail ' + t.avail + '"><i></i>' + esc(t.availText) + "</span></p></div></header>" +
        '<section class="p-sec" style="margin-top:0"><h2>About</h2><p class="bio">' + esc(t.bio) + "</p></section>" +
        '<section class="p-sec"><h2>Skills and tools</h2><div class="chips">' + list(t.skills, function (s) { return '<span class="tag" style="background:' + c.color + ';padding:5px 14px;font-size:.9rem">' + esc(s) + "</span>"; }) + list(t.tools, function (s) { return '<span class="tag" style="padding:5px 14px;font-size:.9rem">' + esc(s) + "</span>"; }) + "</div></section>" +
        '<section class="p-sec"><h2>Portfolio</h2>' + gallery(t.projects, function (p) { return p.tags; }, { chips: false }) + "</section>" +
        '<section class="p-sec"><h2>Client review</h2><figure class="card review" style="margin:0"><blockquote>&ldquo;' + esc(t.review.text) + "&rdquo;</blockquote><figcaption><b>" + esc(t.review.by) + "</b>, " + esc(t.review.role) + "</figcaption></figure></section>" +
        (more.length ? '<section class="p-sec"><h2>More in ' + esc(c.name) + '</h2><div class="grid-talent">' + list(more, talentCard) + "</div></section>" : "") +
        '</div><aside class="card hire-box" style="--tint:' + c.color + '"><p class="price-line">' + esc(t.from) + "</p>" +
        '<p class="avail ' + t.avail + '"><i></i>' + esc(t.availText) + "</p>" +
        "<dl><div><dt>Rating</dt><dd>" + t.rating.toFixed(1) + " (" + t.jobs + " projects)</dd></div><div><dt>Response</dt><dd>" + esc(t.resp) + "</dd></div><div><dt>Based in</dt><dd>" + esc(t.loc) + "</dd></div></dl>" +
        '<a class="btn btn-primary btn-lg" href="#/hire?talent=' + t.id + '">Hire ' + esc(t.name.split(" ")[0]) + "</a>" +
        '<div class="row"><button class="btn btn-sm' + (isSaved ? " on" : "") + '" data-action="save" data-id="' + t.id + '" aria-pressed="' + isSaved + '">' + ico("heart", 16) + "Save</button>" +
        '<button class="btn btn-sm' + (compare.indexOf(t.id) > -1 ? " on" : "") + '" data-action="compare" data-id="' + t.id + '" aria-pressed="' + (compare.indexOf(t.id) > -1) + '">' + ico("compare", 16) + "Compare</button></div>" +
        '<div class="row"><a class="btn btn-sm" href="' + waLink("Hi " + C.brand + "! I'd like to talk to " + t.name + " (" + t.title + ").") + '" target="_blank" rel="noopener">' + ico("whatsapp", 16) + 'WhatsApp</a><a class="btn btn-sm" href="' + mailLink("Enquiry about " + t.name, "Hi " + C.brand + ", I'd like to talk to " + t.name + ".") + '">' + ico("mail", 16) + "Email</a></div></aside></div></section>"
    };
  }

  /* ---------- Work index + case study ---------- */
  function workIndex() {
    return {
      title: "Our work", desc: "Portfolios and case studies from every skill studio.",
      html: '<section class="container page-head">' + crumbs([["Home", "#/"], ["Our work"]]) + '<h1 class="display">The work, <em>and the results.</em></h1><p class="lead">Every piece here was made by a specialist you can hire. Filter by skill, open a piece for the story behind it.</p></section>' +
        '<section class="container" style="padding-bottom:90px">' + gallery(projects, function (p) { return [catBy[p.cat].name]; }) + "</section>" +
        ctaBand("Want work like <em>this?</em>", "Tell us the goal and we will match you with the specialist behind the piece you like.")
    };
  }
  function workPage(id) {
    var p = projBy[id]; if (!p) return notFound();
    var c = catBy[p.cat], t = talentBy[p.talent], nx = projects[(projects.indexOf(p) + 1) % projects.length];
    return {
      title: p.title, desc: p.summary,
      html:
        '<section class="container profile" style="--tint:' + c.color + '">' + crumbs([["Home", "#/"], ["Our work", "#/work"], [p.title]]) +
        '<div class="chips"><a class="tag" style="background:' + c.color + '" href="#/skill/' + c.slug + '">' + esc(c.name) + "</a>" + list(p.tags, function (x) { return '<span class="tag">' + esc(x) + "</span>"; }) + "</div>" +
        '<h1 class="display sm" style="margin-top:16px;max-width:20ch">' + esc(p.title) + '</h1><p class="lead">' + esc(p.summary) + "</p>" +
        '<div class="cs-hero">' + projArt(p, c, { fixed: true }) + "</div>" +
        '<dl class="cs-meta"><div><dt>Client</dt><dd>' + esc(p.client) + '</dd></div><div><dt>Made by</dt><dd><a href="#/talent/' + t.id + '">' + esc(t.name) + "</a></dd></div><div><dt>Skill</dt><dd>" + esc(c.name) + "</dd></div><div><dt>Year</dt><dd>" + esc(p.year) + "</dd></div></dl>" +
        '<div class="metric-row">' + list(p.metrics, function (m) { return '<div class="card metric"><b>' + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></div>"; }) + "</div>" +
        '<div class="prs">' + list([["Problem", p.problem], ["Approach", p.approach], ["Result", p.result]], function (x, i) { return '<div class="card pr"><div class="step-n">' + (i + 1) + "</div><h3>" + x[0] + "</h3><p>" + esc(x[1]) + "</p></div>"; }) + "</div>" +
        '<div class="ba"><figure><figcaption class="tag">Before</figcaption>' + projArt(p, c, { fixed: true, mute: true }) + '</figure><figure><figcaption class="tag" style="background:var(--butter)">After</figcaption>' + projArt(p, c, { fixed: true }) + "</figure></div>" +
        (p.link ? '<p style="margin-top:26px"><a class="btn" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + ico("external", 16) + "Visit the live project</a></p>" : "") +
        '<div class="card hire-box cs-cta"><div><h2 style="font-size:1.8rem">Want results like this?</h2><p class="muted" style="margin-top:6px">' + esc(t.name) + " is " + esc(t.availText.toLowerCase()) + ".</p></div>" +
        '<div class="row"><a class="btn btn-primary" href="#/hire?talent=' + t.id + '">Hire ' + esc(t.name.split(" ")[0]) + '</a><a class="btn" href="#/talent/' + t.id + '">View profile</a></div></div>' +
        '<a class="card next-work" href="#/work/' + nx.id + '"><span><span class="muted">Next project</span><b>' + esc(nx.title) + "</b></span>" + ico("arrow", 26) + "</a></section>"
    };
  }

  /* ---------- Hire brief (multi-step) ---------- */
  var STEPS = ["Skills", "Budget", "Timeline", "Details", "Contact"];
  var brief, step;
  function resetBrief(q) {
    brief = { services: [], budget: "", timeline: "", talents: [], title: "", details: "", name: "", email: "", phone: "", company: "" }; step = 0;
    if (q.skill && catBy[q.skill]) brief.services.push(q.skill);
    if (q.talent) {
      brief.talents = q.talent.split(",").filter(function (id) { return talentBy[id]; });
      brief.talents.forEach(function (id) { var s = talentBy[id].cat; if (brief.services.indexOf(s) < 0) brief.services.push(s); });
    }
  }
  function hirePage(q) {
    resetBrief(q);
    return {
      title: "Start a brief", desc: "Tell us what you need in five short steps and get a shortlist of specialists within 48 hours.",
      html: '<section class="container hire-page">' + crumbs([["Home", "#/"], ["Start a brief"]]) + '<h1 class="display">Start a <em>brief.</em></h1><p class="lead">Five short steps. No account needed. We reply within 48 hours with a shortlist of specialists and their portfolios.</p><div id="hire-root" style="scroll-margin-top:90px"></div></section>',
      after: renderHire
    };
  }
  function radios(name, opts, cur) {
    return '<div class="chip-group" role="radiogroup">' + list(opts, function (o) { return '<label class="chip"><input type="radio" name="' + name + '" value="' + esc(o) + '"' + (o === cur ? " checked" : "") + "><span>" + esc(o) + "</span></label>"; }) + "</div>";
  }
  function stepHTML() {
    if (step === 0) return '<fieldset class="fs"><legend><h2>What do you need <em>help with?</em></h2><p>Pick one or more skills.</p></legend><div class="chip-group">' +
      list(cats, function (c) { return '<label class="chip"><input type="checkbox" name="service" value="' + c.slug + '"' + (brief.services.indexOf(c.slug) > -1 ? " checked" : "") + "><span>" + ico(c.icon, 16) + esc(c.name) + "</span></label>"; }) + '</div><p class="err" data-err="chips" role="alert"></p></fieldset>';
    if (step === 1) return '<fieldset class="fs"><legend><h2>What&rsquo;s your <em>budget?</em></h2><p>A rough range is fine. It helps us pick the right people.</p></legend>' + radios("budget", D.hire.budgets, brief.budget) + '<p class="err" data-err="chips" role="alert"></p></fieldset>';
    if (step === 2) return '<fieldset class="fs"><legend><h2>When do you <em>need it?</em></h2><p>Pick the timeline that fits best.</p></legend>' + radios("timeline", D.hire.timelines, brief.timeline) + '<p class="err" data-err="chips" role="alert"></p></fieldset>';
    if (step === 3) return '<fieldset class="fs"><legend><h2>Tell us about <em>the project.</em></h2><p>A few sentences is plenty. Links to references help.</p></legend>' +
      fld({ label: "Project name", name: "title", req: "Give your project a short name.", min: 3, ph: "e.g. Autumn launch reels", val: brief.title }) +
      fld({ label: "What should we know?", name: "details", tag: "textarea", req: "Tell us a little about the project.", min: 20, rows: 6, ph: "Goals, audience, examples you like, anything that is already decided", val: brief.details }) + "</fieldset>";
    return '<fieldset class="fs"><legend><h2>Where should we <em>send the shortlist?</em></h2><p>We only use these details to reply to your brief.</p></legend><div class="form-grid">' +
      fld({ label: "Your name", name: "name", req: "Please tell us your name.", auto: "name", val: brief.name }) +
      fld({ label: "Email", name: "email", type: "email", req: "Enter your email so we can reply.", auto: "email", val: brief.email }) +
      fld({ label: "WhatsApp or phone", name: "phone", type: "tel", optional: true, auto: "tel", val: brief.phone }) +
      fld({ label: "Company", name: "company", optional: true, auto: "organization", val: brief.company }) + "</div></fieldset>";
  }
  function renderHire() {
    var root = $("#hire-root"); if (!root) return;
    var last = step === STEPS.length - 1;
    root.innerHTML = '<div class="hire-grid"><div class="card hire-card"><ol class="stepper" aria-label="Progress">' +
      list(STEPS, function (s, i) { return '<li class="' + (i < step ? "done" : i === step ? "cur" : "") + '"' + (i === step ? ' aria-current="step"' : "") + "><b>" + (i < step ? ico("check", 14) : i + 1) + "</b><span>" + s + "</span></li>"; }) +
      '</ol><div class="progress" aria-hidden="true"><i style="width:' + ((step + 1) / STEPS.length * 100) + '%"></i></div>' +
      '<form id="hire-form" novalidate>' + stepHTML() + '<div class="form-nav">' + (step > 0 ? '<button type="button" class="btn" data-action="hire-back">Back</button>' : "<span></span>") +
      '<button type="submit" class="btn btn-primary btn-lg">' + (last ? "Send my brief" : "Continue") + "</button></div></form></div>" +
      '<aside class="hire-side"><div class="card side-card"><h3>What happens next</h3><ol><li><b>We read your brief</b> and pick specialists whose portfolios fit.</li><li><b>You get a shortlist</b> within 48 hours, with work samples and quotes.</li><li><b>You choose</b> and kick off. No obligation until you do.</li></ol></div>' +
      (brief.talents.length ? '<div class="card side-card"><h3>You asked for</h3><div class="pick-list">' + list(brief.talents, function (id) { var t = talentBy[id]; return '<div class="pick"><span class="av">' + avatarOf(t) + "</span>" + esc(t.name) + "</div>"; }) + "</div></div>" : "") +
      '<div class="card side-card"><h3>Prefer to chat?</h3><div class="row" style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-sm" href="' + waLink("Hi " + C.brand + "! I have a project in mind.") + '" target="_blank" rel="noopener">' + ico("whatsapp", 16) + 'WhatsApp</a><a class="btn btn-sm" href="' + mailLink("New project") + '">' + ico("mail", 16) + "Email</a></div></div></aside></div>";
    var first = $("input:not([type=radio]):not([type=checkbox]), textarea", root);
    if (first && step >= 3) first.focus({ preventScroll: true });
  }
  function collectStep(f) {
    var fd = new FormData(f);
    if (step === 0) brief.services = fd.getAll("service");
    if (step === 1) brief.budget = fd.get("budget") || "";
    if (step === 2) brief.timeline = fd.get("timeline") || "";
    if (step === 3) { brief.title = (fd.get("title") || "").trim(); brief.details = (fd.get("details") || "").trim(); }
    if (step === 4) ["name", "email", "phone", "company"].forEach(function (k) { brief[k] = (fd.get(k) || "").trim(); });
  }
  function validateStep(f) {
    if (step > 2) return validateFields(f);
    var msgs = ["Pick at least one skill you need.", "Choose a budget range so we can match you well.", "Choose a timeline so we can plan around it."];
    var val = step === 0 ? brief.services.length : step === 1 ? brief.budget : brief.timeline;
    $(".err[data-err]", f).textContent = val ? "" : msgs[step];
    return !!val;
  }
  function briefText() {
    return ["Hi " + C.brand + "! I'd like to start a project.",
      "Skills: " + brief.services.map(function (s) { return catBy[s].name; }).join(", "),
      "Budget: " + brief.budget, "Timeline: " + brief.timeline, "Project: " + brief.title, "Details: " + brief.details,
      brief.talents.length ? "Specialists I liked: " + brief.talents.map(function (id) { return talentBy[id].name; }).join(", ") : "",
      "From: " + brief.name + (brief.company ? ", " + brief.company : "") + " (" + brief.email + ")"].filter(Boolean).join("\n");
  }
  function hireSubmit(f) {
    collectStep(f);
    if (!validateStep(f)) return;
    if (step < STEPS.length - 1) { step++; renderHire(); $("#hire-root").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); return; }
    var btn = $('button[type="submit"]', f); btn.disabled = true; btn.textContent = "Sending...";
    var payload = Object.assign({}, brief, { services: brief.services.map(function (s) { return catBy[s].name; }), talents: brief.talents.map(function (id) { return talentBy[id].name; }) });
    sendPayload("brief", payload).then(function (ok) {
      if (!ok) { btn.disabled = false; btn.textContent = "Send my brief"; toast("That did not send. Check your connection or message us on WhatsApp."); return; }
      var rows = [["Skills", payload.services.join(", ")], ["Budget", brief.budget], ["Timeline", brief.timeline], ["Project", brief.title]];
      if (payload.talents.length) rows.push(["Specialists", payload.talents.join(", ")]);
      $("#hire-root").innerHTML = successCard("Brief received. <em>Thank you, " + esc(brief.name.split(" ")[0]) + ".</em>",
        "We will email <b>" + esc(brief.email) + "</b> within 48 hours with a shortlist of specialists and their portfolios.",
        '<a class="btn btn-primary" href="' + waLink(briefText()) + '" target="_blank" rel="noopener">' + ico("whatsapp", 16) + 'Send this on WhatsApp</a><a class="btn" href="#/work">Browse our work</a><a class="btn" href="#/">Back to home</a>',
        '<dl class="summary">' + list(rows, function (r) { return "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>"; }) + "</dl>");
      $("#hire-root").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  /* ---------- Join, contact, about ---------- */
  function joinPage() {
    return {
      title: "Join as talent", desc: "Apply to join " + C.brand + " as a marketing specialist and get matched with clients.",
      html: '<section class="container hire-page">' + crumbs([["Home", "#/"], ["Join as talent"]]) +
        '<div class="split"><div><h1 class="display">Do great work? <em>Join the roster.</em></h1><p class="lead">We match specialists with brands that value craft. Apply with your portfolio and we will reply within five working days.</p>' +
        '<ul class="perks"><li>' + ico("check", 20) + "<span><b>Briefs that fit you.</b> We only send projects that match your skills and rates.</span></li><li>" + ico("check", 20) + "<span><b>Your own portfolio page,</b> shown to every client who browses your skill.</span></li><li>" + ico("check", 20) + "<span><b>Fair, on-time pay</b> with clear scopes and no chasing invoices.</span></li></ul></div>" +
        '<div class="card hire-card" data-form-box><form id="join-form" novalidate><div class="form-grid">' +
        fld({ label: "Full name", name: "name", req: "Please tell us your name.", auto: "name" }) +
        fld({ label: "Email", name: "email", type: "email", req: "Enter your email so we can reply.", auto: "email" }) +
        fld({ label: "Main skill", name: "skill", tag: "select", req: "Choose your main skill.", ph: "Choose a skill", opts: cats.map(function (c) { return [c.name, c.name]; }) }) +
        fld({ label: "Experience", name: "experience", tag: "select", ph: "Choose one", opts: [["1-2 years", "1 to 2 years"], ["3-5 years", "3 to 5 years"], ["6-10 years", "6 to 10 years"], ["10+ years", "More than 10 years"]] }) +
        fld({ label: "Portfolio link", name: "portfolio", type: "url", req: "Add a link to your portfolio.", url: true, ph: "https://", full: true }) +
        fld({ label: "Your starting rate", name: "rate", optional: true, ph: "e.g. $40 per hour or $500 per project", full: true }) +
        fld({ label: "Tell us about your work", name: "about", tag: "textarea", req: "Tell us a little about your work.", min: 30, rows: 5, ph: "What you make, who you make it for, and the result you are proudest of", full: true }) +
        '<div class="field full"><label class="check"><input type="checkbox" name="consent" data-req="Please tick the box to continue."><span>I agree to be contacted about my application.</span></label><p class="err" role="alert"></p></div></div>' +
        '<div class="form-nav"><span></span><button type="submit" class="btn btn-primary btn-lg">Send application</button></div></form></div></div></section>'
    };
  }
  function contactPage() {
    return {
      title: "Contact", desc: "Talk to the " + C.brand + " team by WhatsApp, email or the contact form.",
      html: '<section class="container hire-page">' + crumbs([["Home", "#/"], ["Contact"]]) +
        '<div class="split"><div><h1 class="display">Say <em>hello.</em></h1><p class="lead">Questions about a project, a specialist or pricing? We answer fast, usually within a few hours.</p>' +
        '<div class="contact-list"><a href="' + waLink("Hi " + C.brand + "!") + '" target="_blank" rel="noopener">' + ico("whatsapp", 22) + "<span>WhatsApp<small>Fastest way to reach us</small></span></a>" +
        '<a href="' + mailLink("Hello") + '">' + ico("mail", 22) + "<span>" + esc(C.email) + "<small>We reply within one working day</small></span></a>" +
        "<div>" + ico("clock", 22) + "<span>" + esc(C.hours) + "<small>" + esc(C.location) + "</small></span></div></div></div>" +
        '<div class="card hire-card" data-form-box><form id="contact-form" novalidate><div class="form-grid">' +
        fld({ label: "Your name", name: "name", req: "Please tell us your name.", auto: "name" }) +
        fld({ label: "Email", name: "email", type: "email", req: "Enter your email so we can reply.", auto: "email" }) +
        fld({ label: "What is this about?", name: "topic", tag: "select", ph: "Choose a topic", full: true, opts: [["Hiring", "I want to hire someone"], ["Pricing", "Pricing question"], ["Partnership", "Partnership"], ["Other", "Something else"]] }) +
        fld({ label: "Message", name: "message", tag: "textarea", req: "Write a short message.", min: 10, rows: 6, full: true }) +
        '</div><div class="form-nav"><span></span><button type="submit" class="btn btn-primary btn-lg">Send message</button></div></form></div></div></section>'
    };
  }
  function formSubmit(f, type) {
    if (!validateFields(f)) return;
    var data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; });
    var btn = $('button[type="submit"]', f), label = btn.textContent; btn.disabled = true; btn.textContent = "Sending...";
    sendPayload(type, data).then(function (ok) {
      btn.disabled = false; btn.textContent = label;
      if (!ok) { toast("That did not send. Check your connection or message us on WhatsApp."); return; }
      var first = esc((data.name || "").split(" ")[0]);
      f.closest("[data-form-box]").innerHTML = type === "join"
        ? successCard("Application received, <em>" + first + ".</em>", "We review every application by hand and will email <b>" + esc(data.email) + "</b> within five working days.", '<a class="btn btn-primary" href="#/work">See the work we do</a><a class="btn" href="#/">Back to home</a>')
        : successCard("Message sent, <em>" + first + ".</em>", "Thanks for writing. We will reply to <b>" + esc(data.email) + "</b> within one working day.", '<a class="btn" href="' + waLink("Hi " + C.brand + "!") + '" target="_blank" rel="noopener">' + ico("whatsapp", 16) + 'Chat on WhatsApp</a><a class="btn" href="#/">Back to home</a>');
    });
  }
  function aboutPage() {
    return {
      title: "About", desc: C.brand + " is a studio of vetted marketing specialists. Learn how we vet talent and why portfolios come first.",
      html: '<section class="container page-head">' + crumbs([["Home", "#/"], ["About"]]) + '<h1 class="display" style="max-width:16ch">A studio of <em>makers,</em> not a directory.</h1></section>' +
        '<section class="container" style="padding-bottom:70px"><div class="split"><div class="prose"><p>' + esc(C.brand) + " started with a simple frustration. Hiring a good editor, designer or ad buyer meant scrolling through profiles that all promised the same thing, then hoping for the best.</p><p>So we built the opposite: a small roster of specialists we have worked with, grouped into skill studios, each with real portfolios and real numbers. You see what they have made before you say a word to them.</p></div>" +
        '<div class="values">' + list([["Portfolios before promises", "Every specialist is shown through finished work and measurable results."], ["Craft over volume", "We keep the roster small so every brief gets a specialist who is a genuine fit."], ["Honest scoping", "Clear prices, clear rounds of feedback and no surprises at the invoice."]], function (v) { return '<div class="card value"><h3>' + v[0] + "</h3><p>" + v[1] + "</p></div>"; }) + "</div></div></section>" +
        '<section class="section" style="padding-top:0"><div class="container"><div class="section-head"><h2 class="title">How we <em>vet talent</em></h2><p>Fewer than one in five applicants join the roster.</p></div><div class="steps">' +
        list([["Portfolio review", "We look for craft, range and results, not follower counts."], ["Paid trial project", "Every applicant completes a real, paid brief before joining."], ["Client reference", "We speak to at least one previous client about how they work."], ["Ongoing ratings", "Every project is rated, and ratings decide who stays on the roster."]], function (s, i) { return '<div class="step"><div class="step-n">' + (i + 1) + "</div><h3>" + s[0] + "</h3><p>" + s[1] + "</p></div>"; }) + "</div></div></section>" +
        ctaBand("Work with <em>the roster.</em>", "Send a brief, or apply to join if you make great work.")
    };
  }

  /* ---------- Saved + compare ---------- */
  function shortlistPage() {
    var items = saved.map(function (id) { return talentBy[id]; });
    return {
      title: "Saved talent", desc: "Your saved specialists.",
      html: '<section class="container page-head">' + crumbs([["Home", "#/"], ["Saved talent"]]) + '<h1 class="display">Your <em>shortlist.</em></h1></section><section class="container" style="padding-bottom:90px">' +
        (items.length ? '<div class="results-bar"><p><b>' + items.length + "</b> saved</p><a class=\"btn btn-primary\" href=\"#/hire?talent=" + saved.join(",") + '">Start a brief with these</a></div><div class="grid-talent">' + list(items, talentCard) + "</div>"
          : '<div class="empty-state"><h2>Nobody saved yet</h2><p>Tap the heart on any profile to keep it here while you decide.</p><a class="btn btn-primary" href="#/talent">Find talent</a></div>') + "</section>"
    };
  }
  function comparePage() {
    var items = compare.map(function (id) { return talentBy[id]; });
    var best = items.length ? Math.max.apply(null, items.map(function (t) { return t.rating; })) : 0;
    var rows = [
      ["Skill", function (t) { return esc(catBy[t.cat].name); }], ["Specialty", function (t) { return esc(t.title); }],
      ["Rating", function (t) { return t.rating.toFixed(1) + " (" + t.jobs + " projects)"; }, function (t) { return t.rating === best; }],
      ["Starting rate", function (t) { return esc(t.from); }], ["Availability", function (t) { return '<span class="avail ' + t.avail + '"><i></i>' + esc(t.availText) + "</span>"; }],
      ["Response time", function (t) { return esc(t.resp); }], ["Based in", function (t) { return esc(t.loc); }],
      ["Top skills", function (t) { return esc(t.skills.join(", ")); }], ["Tools", function (t) { return esc(t.tools.join(", ")); }]
    ];
    return {
      title: "Compare talent", desc: "Compare up to three specialists side by side.",
      html: '<section class="container page-head">' + crumbs([["Home", "#/"], ["Compare"]]) + '<h1 class="display">Side by <em>side.</em></h1></section><section class="container" style="padding-bottom:90px">' +
        (items.length < 2 ? '<div class="empty-state"><h2>Pick at least two specialists</h2><p>Tap the compare icon on any profile card to add it. You can compare up to three at once.</p><a class="btn btn-primary" href="#/talent">Find talent</a></div>' :
          '<div class="table-wrap"><table class="cmp"><thead><tr><th></th>' + list(items, function (t) {
            return '<th scope="col"><div class="who"><span class="av">' + avatarOf(t) + "</span><b>" + esc(t.name) + '</b><span class="chips"><a class="btn btn-sm" href="#/talent/' + t.id + '">Portfolio</a><a class="btn btn-sm btn-primary" href="#/hire?talent=' + t.id + '">Hire</a><button class="btn btn-sm" data-action="compare-remove" data-id="' + t.id + '">Remove</button></span></div></th>';
          }) + "</tr></thead><tbody>" +
          list(rows, function (r) { return '<tr><th scope="row">' + r[0] + "</th>" + list(items, function (t) { return "<td" + (r[2] && r[2](t) ? ' class="best"' : "") + ">" + r[1](t) + "</td>"; }) + "</tr>"; }) + "</tbody></table></div>") + "</section>"
    };
  }
  function notFound() {
    return { title: "Page not found", desc: "", html: '<section class="container page-head"><h1 class="display">Lost in the <em>studio.</em></h1><p class="lead">That page does not exist. Try one of the skill studios instead.</p><div class="hero-cta"><a class="btn btn-primary" href="#/">Back to home</a><a class="btn" href="#/talent">Find talent</a></div></section>' };
  }

  /* ============================================================
     SHELL: nav, drawer, footer, search, modal
     ============================================================ */
  function renderShell() {
    $("#nav").innerHTML = '<div class="nav-inner container"><a class="logo" href="#/" aria-label="' + esc(C.brand) + ' home">' + esc(C.brand) + '<span class="dot"></span></a>' +
      '<nav class="nav-links" aria-label="Main"><div class="has-mega"><button class="nav-link" data-action="toggle-mega" aria-expanded="false" aria-controls="mega">Skills ' + ico("chev", 14) + "</button>" +
      '<div class="mega" id="mega"><div class="mega-grid">' + list(cats, function (c) { return '<a href="#/skill/' + c.slug + '" class="mega-item" style="--tint:' + c.color + '"><span class="mi">' + ico(c.icon, 20) + "</span><span><b>" + esc(c.name) + "</b><small>" + talents.filter(function (t) { return t.cat === c.slug; }).length + " specialists</small></span></a>"; }) +
      '</div><a class="mega-promo" href="#/hire"><b>Not sure who you need?</b><span>Tell us the goal and we will match you within 48 hours.</span></a></div></div>' +
      '<a class="nav-link" href="#/talent">Find talent</a><a class="nav-link" href="#/work">Our work</a><a class="nav-link" href="#/about">About</a><a class="nav-link" href="#/join">Join as talent</a></nav>' +
      '<div class="nav-actions"><button class="icon-btn" data-action="open-search" aria-label="Search (press /)">' + ico("search") + "</button>" +
      '<a class="icon-btn has-count" href="#/shortlist" aria-label="Saved talent">' + ico("heart") + '<b id="saved-count" hidden>0</b></a>' +
      '<a class="btn btn-primary btn-sm nav-cta magnetic" href="#/hire">Hire a specialist</a><button class="icon-btn burger" data-action="toggle-drawer" aria-label="Open menu" aria-expanded="false">' + ico("menu") + "</button></div></div>";
    $("#footer").innerHTML = '<div class="container"><div class="foot-grid"><div><div class="foot-brand">' + esc(C.brand) + "</div><p>" + esc(C.tagline) + "</p></div>" +
      "<div><h4>Skills</h4>" + list(cats, function (c) { return '<a href="#/skill/' + c.slug + '">' + esc(c.name) + "</a>"; }) + "</div>" +
      '<div><h4>Company</h4><a href="#/about">About</a><a href="#/work">Our work</a><a href="#/talent">Find talent</a><a href="#/join">Join as talent</a><a href="#/contact">Contact</a></div>' +
      '<div><h4>Talk to us</h4><a href="#/hire">Start a brief</a><a href="' + waLink("Hi " + C.brand + "!") + '" target="_blank" rel="noopener">WhatsApp</a><a href="' + mailLink("Hello") + '">' + esc(C.email) + "</a><a href=\"#/shortlist\">Saved talent</a></div></div>" +
      '<div class="foot-word" aria-hidden="true">' + esc(C.brand.toLowerCase()) + '</div><div class="foot-bottom"><span>&copy; ' + new Date().getFullYear() + " " + esc(C.brand) + ". All rights reserved.</span><span>" + esc(C.location) + "</span></div></div>";
    $("#floaters").innerHTML = '<a class="wa-float" href="' + waLink("Hi " + C.brand + "! I have a project in mind.") + '" target="_blank" rel="noopener">' + ico("whatsapp", 18) + "WhatsApp</a>" +
      '<div class="mobile-cta"><a class="btn btn-primary" href="#/hire">Hire a specialist</a><a class="btn wa" href="' + waLink("Hi " + C.brand + "!") + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ico("whatsapp", 20) + "</a></div>";
  }
  function updateLock() { document.body.classList.toggle("lock", !!($(".modal") || $(".search-ov") || $(".drawer"))); }
  function closeMega() { var m = $(".has-mega"); if (m) { m.classList.remove("open"); $(".has-mega > button").setAttribute("aria-expanded", "false"); } }
  function openDrawer() {
    closeAll();
    var d = document.createElement("div"); d.className = "drawer"; d.id = "drawer"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Menu");
    d.innerHTML = '<button class="icon-btn line drawer-x" data-action="toggle-drawer" aria-label="Close menu">' + ico("close") + '</button><a href="#/">Home</a><a href="#/talent">Find talent</a><a href="#/work">Our work</a>' +
      '<div class="sub">' + list(cats, function (c) { return '<a href="#/skill/' + c.slug + '" style="--tint:' + c.color + '">' + ico(c.icon, 18) + esc(c.name) + "</a>"; }) + '</div><a href="#/about">About</a><a href="#/join">Join as talent</a><a href="#/contact">Contact</a><a href="#/shortlist">Saved talent</a>';
    $("#overlays").appendChild(d); $(".burger").setAttribute("aria-expanded", "true"); updateLock(); $(".drawer-x").focus();
  }
  function closeDrawer() { var d = $("#drawer"); if (d) d.remove(); var b = $(".burger"); if (b) b.setAttribute("aria-expanded", "false"); updateLock(); }

  /* search */
  function openSearch() {
    closeAll();
    var ov = document.createElement("div"); ov.className = "search-ov"; ov.id = "search"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Search");
    ov.innerHTML = '<div class="card search-box"><form id="search-form" role="search">' + ico("search", 22) + '<label class="sr-only" for="search-q">Search</label><input id="search-q" type="search" placeholder="Search skills, people or projects" autocomplete="off"><button type="button" class="icon-btn" data-action="close-search" aria-label="Close search">' + ico("close") + '</button></form><div id="search-res"></div></div>';
    $("#overlays").appendChild(ov); updateLock(); $("#search-q").focus(); renderSearch("");
    $("#search-q").addEventListener("input", function (e) { renderSearch(e.target.value); });
  }
  function closeSearch() { var s = $("#search"); if (s) s.remove(); updateLock(); }
  function renderSearch(q) {
    var s = q.trim().toLowerCase(), out = "";
    if (!s) out = '<p class="sr-h">Browse by skill</p><div class="sr-chips">' + list(cats, function (c) { return '<a class="tag" style="background:' + c.color + '" href="#/skill/' + c.slug + '">' + esc(c.name) + "</a>"; }) + "</div>";
    else {
      var hit = function () { return Array.prototype.join.call(arguments, " ").toLowerCase().indexOf(s) > -1; };
      var cs = cats.filter(function (c) { return hit(c.name, c.short); }).slice(0, 4);
      var ts = talents.filter(function (t) { return hit(t.name, t.title, t.skills.join(" "), t.tools.join(" "), catBy[t.cat].name); }).slice(0, 5);
      var ps = projects.filter(function (p) { return hit(p.title, p.client, p.tags.join(" ")); }).slice(0, 4);
      if (cs.length) out += '<p class="sr-h">Skills</p>' + list(cs, function (c) { return '<a class="sr-row" href="#/skill/' + c.slug + '"><span class="av" style="background:' + c.color + '">' + ico(c.icon, 18) + "</span><span><b>" + esc(c.name) + "</b><small>" + esc(c.short) + "</small></span></a>"; });
      if (ts.length) out += '<p class="sr-h">Specialists</p>' + list(ts, function (t) { return '<a class="sr-row" href="#/talent/' + t.id + '"><span class="av">' + avatarOf(t) + "</span><span><b>" + esc(t.name) + "</b><small>" + esc(t.title) + "</small></span></a>"; });
      if (ps.length) out += '<p class="sr-h">Work</p>' + list(ps, function (p) { return '<a class="sr-row" href="#/work/' + p.id + '"><span class="av" style="background:' + catBy[p.cat].color + '">' + ico(catBy[p.cat].icon, 18) + "</span><span><b>" + esc(p.title) + "</b><small>" + esc(p.client) + "</small></span></a>"; });
      if (!out) out = '<p class="muted" style="padding:14px 4px">Nothing matches &ldquo;' + esc(q) + '&rdquo;. Try &ldquo;video&rdquo;, &ldquo;SEO&rdquo; or &ldquo;Meta ads&rdquo;.</p>';
      else out += '<p class="sr-h">Press Enter to see all matching specialists</p>';
    }
    $("#search-res").innerHTML = out;
  }

  /* project lightbox */
  var M = { ids: [], i: 0, opener: null };
  function openProject(id, opener) {
    var g = opener && opener.closest("[data-gallery]");
    M.ids = g ? $$('[data-action="open-project"]', g).filter(function (b) { return !b.hidden; }).map(function (b) { return b.dataset.id; }) : [id];
    if (M.ids.indexOf(id) < 0) M.ids = [id];
    M.i = M.ids.indexOf(id); M.opener = opener || null;
    var m = $("#modal");
    if (!m) { m = document.createElement("div"); m.className = "modal"; m.id = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); $("#overlays").appendChild(m); }
    paintModal(); updateLock(); $(".modal-x", m).focus();
  }
  function paintModal() {
    var p = projBy[M.ids[M.i]], c = catBy[p.cat], t = talentBy[p.talent], m = $("#modal");
    m.setAttribute("aria-label", p.title);
    var media = p.video ? '<div class="embed"><iframe src="https://www.youtube.com/embed/' + esc(p.video) + '" title="' + esc(p.title) + '" allowfullscreen loading="lazy"></iframe></div>' : projArt(p, c);
    m.innerHTML = '<div class="modal-card" style="--tint:' + c.color + '"><button class="icon-btn line modal-x" data-action="close-modal" aria-label="Close">' + ico("close") + "</button>" +
      '<div class="modal-media">' + media + "</div>" +
      (M.ids.length > 1 ? '<div class="modal-nav"><button class="icon-btn prev" data-action="modal-prev" aria-label="Previous project">' + ico("arrow", 18) + '</button><button class="icon-btn" data-action="modal-next" aria-label="Next project">' + ico("arrow", 18) + "</button></div>" : "") +
      '<div class="modal-info"><div class="chips"><span class="tag" style="background:' + c.color + '">' + esc(c.name) + "</span>" + list(p.tags, function (x) { return '<span class="tag">' + esc(x) + "</span>"; }) + "</div>" +
      "<h3>" + esc(p.title) + '</h3><p class="sub">' + esc(p.client) + " &middot; " + esc(p.year) + " &middot; by " + esc(t.name) + "</p><p>" + esc(p.summary) + "</p>" +
      '<div class="modal-metrics">' + list(p.metrics, function (x) { return "<div><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></div>"; }) + "</div>" +
      '<div class="row"><a class="btn btn-primary" href="#/work/' + p.id + '">Full case study</a><a class="btn" href="#/hire?talent=' + t.id + '">Hire ' + esc(t.name.split(" ")[0]) + "</a>" +
      (p.link ? '<a class="btn" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + ico("external", 16) + "Live site</a>" : "") + "</div></div></div>";
  }
  function stepModal(d) { M.i = (M.i + d + M.ids.length) % M.ids.length; paintModal(); $(".modal-x").focus(); }
  function closeModal() { var m = $("#modal"); if (!m) return; m.remove(); updateLock(); if (M.opener && document.contains(M.opener)) M.opener.focus(); M.opener = null; }
  function closeAll() { closeModal(); closeSearch(); closeDrawer(); closeMega(); }

  /* ============================================================
     ROUTER
     ============================================================ */
  function route(keepScroll) {
    var y = window.scrollY;
    closeAll();
    var h = location.hash.replace(/^#\/?/, ""), sp = h.split("?"), parts = sp[0].split("/").filter(Boolean).map(decodeURIComponent);
    var q = {}; new URLSearchParams(sp[1] || "").forEach(function (v, k) { q[k] = v; });
    var page;
    switch (parts[0]) {
      case undefined: page = home(); break;
      case "skill": page = parts[1] ? skillPage(parts[1]) : talentIndex(q); break;
      case "talent": page = parts[1] ? talentPage(parts[1]) : talentIndex(q); break;
      case "work": page = parts[1] ? workPage(parts[1]) : workIndex(); break;
      case "hire": page = hirePage(q); break;
      case "about": page = aboutPage(); break;
      case "contact": page = contactPage(); break;
      case "join": page = joinPage(); break;
      case "shortlist": page = shortlistPage(); break;
      case "compare": page = comparePage(); break;
      default: page = notFound();
    }
    document.title = (page.title ? page.title + " | " : "") + C.brand + (page.title ? "" : ": " + C.tagline);
    var md = $('meta[name="description"]'); if (md && page.desc) md.setAttribute("content", page.desc);
    var el = $("#app"); el.innerHTML = page.html;
    if (!keepScroll) { el.classList.remove("page-in"); void el.offsetWidth; el.classList.add("page-in"); }
    $$(".nav-link[href]").forEach(function (a) { a.classList.toggle("active", !!(parts[0] && a.getAttribute("href") === "#/" + parts[0])); });
    if (page.after) page.after();
    initReveal(); initCounters(); syncState(false);
    window.scrollTo(0, keepScroll ? y : 0);
    if (!keepScroll) el.focus({ preventScroll: true });
  }

  /* ---------- Motion ---------- */
  var revealObs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }) : null;
  function initReveal() { $$(".reveal:not(.in)").forEach(function (el) { if (revealObs && !reduce) revealObs.observe(el); else el.classList.add("in"); }); }
  var countObs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { countObs.unobserve(e.target); animateCount(e.target); } });
  }, { threshold: 0.5 }) : null;
  function initCounters() { if (!reduce && countObs) $$("[data-count]").forEach(function (el) { countObs.observe(el); }); }
  function animateCount(el) {
    var end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suf = el.dataset.suffix || "", t0 = performance.now(), dur = 1300;
    (function tick(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (end * e).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if (!reduce && window.matchMedia && window.matchMedia("(hover: hover)").matches) {
    var cur = null;
    var resetFx = function (el) { ["--rx", "--ry", "--mx", "--my"].forEach(function (p) { el.style.removeProperty(p); }); };
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest ? e.target.closest(".tilt, .magnetic") : null;
      if (cur && cur !== el) resetFx(cur);
      cur = el; if (!el) return;
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      if (el.classList.contains("tilt")) { el.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg"); el.style.setProperty("--ry", (x * 6).toFixed(2) + "deg"); }
      else { el.style.setProperty("--mx", (x * 10).toFixed(1) + "px"); el.style.setProperty("--my", (y * 8).toFixed(1) + "px"); }
    });
    document.documentElement.addEventListener("mouseleave", function () { if (cur) resetFx(cur); });
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) {
      if (!e.target.closest(".has-mega")) closeMega();
      if (e.target.classList.contains("modal")) closeModal();
      if (e.target.classList.contains("search-ov")) closeSearch();
      return;
    }
    var a = el.dataset.action, id = el.dataset.id;
    if (a === "open-project") openProject(id, el);
    else if (a === "close-modal") closeModal();
    else if (a === "modal-prev") stepModal(-1);
    else if (a === "modal-next") stepModal(1);
    else if (a === "save") toggleSave(id);
    else if (a === "compare") toggleCompare(id);
    else if (a === "compare-remove") { compare = compare.filter(function (x) { return x !== id; }); store.set("compare", compare); syncState(true); }
    else if (a === "filter") applyFilter(el);
    else if (a === "toggle-mega") { var m = el.closest(".has-mega"), open = !m.classList.contains("open"); m.classList.toggle("open", open); el.setAttribute("aria-expanded", String(open)); }
    else if (a === "toggle-drawer") { if ($("#drawer")) closeDrawer(); else openDrawer(); }
    else if (a === "open-search") openSearch();
    else if (a === "close-search") closeSearch();
    else if (a === "hire-back") { collectStep($("#hire-form")); step = Math.max(0, step - 1); renderHire(); }
    else if (a === "scroll") { var tg = document.getElementById(el.dataset.target); if (tg) tg.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }
  });
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.id === "hire-form") { e.preventDefault(); hireSubmit(f); }
    else if (f.id === "join-form") { e.preventDefault(); formSubmit(f, "join"); }
    else if (f.id === "contact-form") { e.preventDefault(); formSubmit(f, "contact"); }
    else if (f.id === "search-form") { e.preventDefault(); var v = $("#search-q").value.trim(); closeSearch(); location.hash = "#/talent" + (v ? "?q=" + encodeURIComponent(v) : ""); }
  });
  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.classList && el.classList.contains("invalid") && (el.type === "checkbox" ? el.checked : el.value.trim())) {
      el.classList.remove("invalid"); el.removeAttribute("aria-invalid");
      var err = $(".err", el.closest(".field")); if (err) err.textContent = "";
    }
    if (el.name === "service" || el.name === "budget" || el.name === "timeline") { var er = $(".err[data-err]", el.closest("form")); if (er) er.textContent = ""; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeAll(); return; }
    var modal = $("#modal");
    if (modal) {
      if (e.key === "ArrowRight" && M.ids.length > 1) stepModal(1);
      if (e.key === "ArrowLeft" && M.ids.length > 1) stepModal(-1);
      if (e.key === "Tab") {
        var f = $$("a[href], button:not([disabled]), iframe", modal); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !$("#search")) { e.preventDefault(); openSearch(); }
  });
  window.addEventListener("hashchange", function () { route(false); });

  /* ---------- Go ---------- */
  renderShell();
  route(false);
})();
