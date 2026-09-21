/* ============================================================
   ATELIER — art.js
   Generates the placeholder artwork and illustrated avatars as SVG,
   so the site looks finished without any image files.
   To use real images later, add `img: "assets/photo.jpg"` to a
   project or `photo: "assets/me.jpg"` to a talent in data.js.
   ============================================================ */
window.Art = (function () {
  "use strict";

  var INK = "#141414", PAPER = "#FFFDF9", ACCENT = "#FF4D2E", MUTE_ACCENT = "#8A857B";
  var uid = 0;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function num(r, a, b) { return a + r() * (b - a); }
  function catOf(slug) {
    var list = window.ATELIER.categories;
    for (var i = 0; i < list.length; i++) if (list[i].slug === slug) return list[i];
    return { slug: slug, color: "#EEE8DD", deep: "#B7B1A6" };
  }
  function spark(x, y, s, fill) {
    return '<path d="M' + x + " " + (y - s) + "Q" + x + " " + y + " " + (x + s) + " " + y + "Q" + x + " " + y + " " + x + " " + (y + s) +
      "Q" + x + " " + y + " " + (x - s) + " " + y + "Q" + x + " " + y + " " + x + " " + (y - s) + 'z" fill="' + fill + '"/>';
  }

  /* One little scene per skill. Each returns SVG shapes drawn on a W x H canvas. */
  var scenes = {
    "video-editing": function (c) {
      var r = c.r, W = c.W, H = c.H, fw = W * 0.72, fh = H * 0.5, fx = (W - fw) / 2, fy = H * 0.1, ty = H * 0.76, bars = "", x = W * 0.08;
      while (x < W * 0.9) {
        var w = num(r, 22, 64), ww = Math.max(10, Math.min(w, W * 0.92 - x) - 4);
        bars += '<rect x="' + x + '" y="' + ty + '" width="' + ww + '" height="' + H * 0.09 + '" rx="4" fill="' + pick(r, [INK, c.deep, PAPER]) + '" stroke="' + INK + '" stroke-width="1.5"/>';
        x += w;
      }
      var px = W * num(r, 0.3, 0.65);
      return '<rect x="' + fx + '" y="' + fy + '" width="' + fw + '" height="' + fh + '" rx="16" fill="' + INK + '"/>' +
        '<circle cx="' + W / 2 + '" cy="' + (fy + fh / 2) + '" r="' + fh * 0.19 + '" fill="' + c.acc + '"/>' +
        '<path d="M' + (W / 2 - fh * 0.06) + " " + (fy + fh / 2 - fh * 0.1) + "l" + fh * 0.17 + " " + fh * 0.1 + "l-" + fh * 0.17 + " " + fh * 0.1 + 'z" fill="#fff"/>' +
        bars + '<rect x="' + px + '" y="' + (ty - 10) + '" width="3" height="' + (H * 0.09 + 20) + '" fill="' + c.acc + '"/>';
    },
    "graphic-design": function (c) {
      var r = c.r, W = c.W, H = c.H;
      return '<circle cx="' + W * 0.3 + '" cy="' + H * 0.42 + '" r="' + H * 0.28 + '" fill="' + c.deep + '"/>' +
        '<rect x="' + W * 0.4 + '" y="' + H * 0.2 + '" width="' + W * 0.36 + '" height="' + W * 0.36 + '" rx="10" fill="none" stroke="' + INK + '" stroke-width="3" transform="rotate(' + num(r, 8, 20).toFixed(1) + " " + W * 0.58 + " " + H * 0.38 + ')"/>' +
        '<path d="M' + W * 0.15 + " " + H * 0.86 + "a" + W * 0.2 + " " + W * 0.2 + " 0 0 1 " + W * 0.4 + ' 0z" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="3"/>' +
        '<circle cx="' + W * 0.78 + '" cy="' + H * 0.72 + '" r="' + H * 0.07 + '" fill="' + c.acc + '"/>' +
        '<text x="' + W * 0.6 + '" y="' + H * 0.9 + '" font-family="Fraunces,Georgia,serif" font-size="' + H * 0.22 + '" font-style="italic" fill="' + INK + '">Aa</text>';
    },
    "web-development": function (c) {
      var W = c.W, H = c.H, x = W * 0.1, y = H * 0.12, w = W * 0.8, h = H * 0.74, cards = "";
      for (var i = 0; i < 3; i++) {
        cards += '<rect x="' + (x + 20 + i * (w - 40) / 3) + '" y="' + (y + h * 0.64) + '" width="' + ((w - 40) / 3 - 10) + '" height="' + h * 0.26 + '" rx="8" fill="' + (i === 1 ? c.deep : "none") + '" stroke="' + INK + '" stroke-width="2"/>';
      }
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<path d="M' + x + " " + (y + 26) + "h" + w + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<circle cx="' + (x + 16) + '" cy="' + (y + 13) + '" r="4" fill="' + c.acc + '"/><circle cx="' + (x + 30) + '" cy="' + (y + 13) + '" r="4" fill="' + c.deep + '"/><circle cx="' + (x + 44) + '" cy="' + (y + 13) + '" r="4" fill="' + INK + '"/>' +
        '<rect x="' + (x + 20) + '" y="' + (y + 46) + '" width="' + w * 0.5 + '" height="14" rx="4" fill="' + INK + '"/>' +
        '<rect x="' + (x + 20) + '" y="' + (y + 68) + '" width="' + w * 0.34 + '" height="8" rx="4" fill="' + c.deep + '" opacity=".6"/>' +
        '<rect x="' + (x + 20) + '" y="' + (y + 90) + '" width="64" height="22" rx="11" fill="' + c.acc + '"/>' +
        '<rect x="' + (x + w * 0.62) + '" y="' + (y + 44) + '" width="' + w * 0.3 + '" height="' + h * 0.34 + '" rx="8" fill="' + c.deep + '"/>' + cards;
    },
    "social-media": function (c) {
      var r = c.r, W = c.W, H = c.H, g = 8, cw = (W * 0.7 - g * 2) / 3, ox = W * 0.15, oy = H * 0.16, ch = (H * 0.72 - g * 2) / 3, t = "";
      for (var i = 0; i < 9; i++) {
        var cx = ox + (i % 3) * (cw + g), cy = oy + Math.floor(i / 3) * (ch + g);
        t += '<rect x="' + cx + '" y="' + cy + '" width="' + cw + '" height="' + ch + '" rx="10" fill="' + pick(r, [c.deep, PAPER, INK, c.acc, "#fff"]) + '" stroke="' + INK + '" stroke-width="2"/>';
      }
      return t + '<rect x="' + W * 0.6 + '" y="' + H * 0.04 + '" width="' + W * 0.3 + '" height="28" rx="14" fill="' + c.acc + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<text x="' + W * 0.75 + '" y="' + (H * 0.04 + 19) + '" text-anchor="middle" font-family="DM Sans,sans-serif" font-weight="700" font-size="14" fill="#fff">12.4k likes</text>';
    },
    "performance-ads": function (c) {
      var r = c.r, W = c.W, H = c.H, n = 6, bw = W * 0.09, gap = W * 0.03, x0 = W * 0.12, base = H * 0.86, t = "", pts = [];
      for (var i = 0; i < n; i++) {
        var h = H * (0.12 + i * 0.09 + num(r, 0, 0.04)), x = x0 + i * (bw + gap);
        t += '<rect x="' + x + '" y="' + (base - h) + '" width="' + bw + '" height="' + h + '" rx="6" fill="' + (i === n - 1 ? c.acc : c.deep) + '" stroke="' + INK + '" stroke-width="2"/>';
        pts.push((x + bw / 2) + "," + (base - h - 10));
      }
      var m = c.p && c.p.metrics && c.p.metrics[0] ? c.p.metrics[0][0] : "+";
      return t + '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>' +
        '<text x="' + W * 0.12 + '" y="' + H * 0.2 + '" font-family="Fraunces,Georgia,serif" font-size="' + H * 0.15 + '" font-style="italic" fill="' + INK + '">' + esc(m) + "</text>";
    },
    "seo": function (c) {
      var r = c.r, W = c.W, H = c.H, n = 7, pts = [], i;
      for (i = 0; i < n; i++) pts.push([W * 0.12 + i * (W * 0.76 / (n - 1)), H * (0.7 - i * 0.07 - num(r, 0, 0.05))]);
      var line = pts.map(function (q) { return "L" + q[0] + " " + q[1]; }).join(" ");
      var area = "M" + pts[0][0] + " " + H * 0.84 + " " + line + " L" + pts[n - 1][0] + " " + H * 0.84 + "z";
      var last = pts[n - 1], dots = pts.map(function (q) { return '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="4.5" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2"/>'; }).join("");
      return '<path d="M' + W * 0.1 + " " + H * 0.84 + "h" + W * 0.8 + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<path d="' + area + '" fill="' + c.deep + '" opacity=".55"/>' +
        '<polyline points="' + pts.map(function (q) { return q.join(","); }).join(" ") + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' + dots +
        '<circle cx="' + (last[0] - 26) + '" cy="' + (last[1] - 28) + '" r="' + H * 0.09 + '" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="3"/>' +
        '<path d="M' + (last[0] - 26 + H * 0.064) + " " + (last[1] - 28 + H * 0.064) + "l" + H * 0.07 + " " + H * 0.07 + '" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
        '<text x="' + (last[0] - 26) + '" y="' + (last[1] - 22) + '" text-anchor="middle" font-family="DM Sans,sans-serif" font-weight="700" font-size="' + H * 0.07 + '" fill="' + c.acc + '">#1</text>';
    },
    "copywriting": function (c) {
      var r = c.r, W = c.W, H = c.H, x = W * 0.14, y = H * 0.12, w = W * 0.72, h = H * 0.76, lines = "";
      for (var i = 0; i < 5; i++) {
        var lw = w * (i === 4 ? 0.45 : num(r, 0.6, 0.9));
        lines += '<rect x="' + (x + 24) + '" y="' + (y + h * 0.46 + i * 17) + '" width="' + (lw - 48) + '" height="7" rx="3.5" fill="' + INK + '" opacity="' + (i % 2 ? 0.25 : 0.55) + '"/>';
      }
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<text x="' + (x + 22) + '" y="' + (y + h * 0.36) + '" font-family="Fraunces,Georgia,serif" font-size="' + h * 0.5 + '" fill="' + c.deep + '">&#8220;</text>' +
        '<rect x="' + (x + 24) + '" y="' + (y + h * 0.3) + '" width="' + w * 0.5 + '" height="14" rx="4" fill="' + INK + '" transform="translate(' + w * 0.2 + ' 0)"/>' +
        lines + '<path d="M' + (x + 24) + " " + (y + h * 0.9) + 'q10 -8 20 0t20 0t20 0t20 0t20 0" fill="none" stroke="' + c.acc + '" stroke-width="3" stroke-linecap="round"/>';
    },
    "ai-content": function (c) {
      var r = c.r, W = c.W, H = c.H, id = "gr" + (++uid), t = "", i;
      t += '<defs><radialGradient id="' + id + '"><stop offset="0" stop-color="' + c.deep + '"/><stop offset="1" stop-color="' + c.deep + '" stop-opacity="0"/></radialGradient></defs>';
      for (i = 0; i < 4; i++) t += '<circle cx="' + num(r, W * 0.2, W * 0.8) + '" cy="' + num(r, H * 0.2, H * 0.8) + '" r="' + num(r, H * 0.25, H * 0.42) + '" fill="url(#' + id + ')"/>';
      t += '<rect x="' + W * 0.16 + '" y="' + H * 0.16 + '" width="' + W * 0.68 + '" height="' + H * 0.68 + '" rx="16" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="6 7"/>';
      t += spark(W * 0.5, H * 0.5, H * 0.2, INK) + spark(W * 0.7, H * 0.32, H * 0.09, c.acc) + spark(W * 0.3, H * 0.68, H * 0.07, PAPER);
      return t;
    },
    "photography": function (c) {
      var W = c.W, H = c.H, x = W * 0.16, y = H * 0.09, w = W * 0.68, h = H * 0.82;
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<rect x="' + (x + 12) + '" y="' + (y + 12) + '" width="' + (w - 24) + '" height="' + (h * 0.7 - 12) + '" fill="' + c.deep + '" opacity=".6"/>' +
        '<circle cx="' + (x + w * 0.72) + '" cy="' + (y + h * 0.26) + '" r="' + h * 0.08 + '" fill="' + c.acc + '"/>' +
        '<path d="M' + (x + 12) + " " + (y + h * 0.7) + "L" + (x + w * 0.32) + " " + (y + h * 0.4) + "L" + (x + w * 0.5) + " " + (y + h * 0.58) + "L" + (x + w * 0.68) + " " + (y + h * 0.34) + "L" + (x + w - 12) + " " + (y + h * 0.7) + 'z" fill="' + INK + '"/>' +
        '<rect x="' + (x + 12) + '" y="' + (y + h * 0.8) + '" width="' + w * 0.5 + '" height="8" rx="4" fill="' + INK + '" opacity=".55"/>' +
        '<rect x="' + (x + 12) + '" y="' + (y + h * 0.88) + '" width="' + w * 0.3 + '" height="6" rx="3" fill="' + INK + '" opacity=".25"/>';
    }
  };

  /* Project artwork. opts: { fixed: true } for a fixed 16:10 ratio, { mute: true } for the "before" look. */
  function project(p, cat, opts) {
    opts = opts || {};
    var slug = typeof cat === "string" ? cat : cat.slug;
    var meta = catOf(slug);
    var r = rng(hash(p.id || p.title));
    var W = 400, H = opts.fixed ? 250 : pick(r, [260, 300, 340, 380]);
    var bg = meta.color, deep = meta.deep, acc = ACCENT;
    if (opts.mute) { bg = "#E9E5DD"; deep = "#B9B3A8"; acc = MUTE_ACCENT; }
    var fn = scenes[slug] || scenes["graphic-design"];
    var body = fn({ r: r, W: W, H: H, deep: deep, acc: acc, p: p });
    var glow = '<circle cx="' + num(r, 40, 360) + '" cy="' + num(r, 20, H - 20) + '" r="' + num(r, 70, 130) + '" fill="#fff" opacity=".35"/>';
    return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(p.title) + '">' +
      '<rect width="' + W + '" height="' + H + '" fill="' + bg + '"/>' + glow + body + "</svg>";
  }

  /* Illustrated portrait avatar, unique per person. */
  function avatar(t) {
    var r = rng(hash(t.id)), meta = catOf(t.cat);
    var skin = pick(r, ["#F5D0B0", "#E2AE84", "#C68A5E", "#94603F", "#6B4229"]);
    var hair = pick(r, ["#141414", "#2E1F16", "#5A3A22", "#A5703F", "#7B7B7B"]);
    var style = Math.floor(r() * 3);
    var back = style === 1 ? '<path d="M28 50c0-24 9-34 22-34s22 10 22 34v24H28z" fill="' + hair + '"/>' : "";
    var bun = style === 2 ? '<circle cx="50" cy="17" r="8" fill="' + hair + '"/>' : "";
    return '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(t.name) + '">' +
      '<rect width="100" height="100" fill="' + meta.color + '"/>' +
      '<circle cx="' + (25 + r() * 50).toFixed(0) + '" cy="' + (30 + r() * 30).toFixed(0) + '" r="34" fill="#fff" opacity=".4"/>' +
      '<path d="M12 100c2-24 18-32 38-32s36 8 38 32z" fill="' + meta.deep + '" stroke="#141414" stroke-width="2"/>' +
      '<rect x="43" y="56" width="14" height="18" rx="6" fill="' + skin + '"/>' + back + bun +
      '<ellipse cx="50" cy="45" rx="16" ry="18" fill="' + skin + '" stroke="#141414" stroke-width="1.5"/>' +
      '<path d="M33 44c-1-14 7-20 17-20s18 6 17 20c-4-6-10-9-17-9s-13 3-17 9z" fill="' + hair + '"/>' +
      '<circle cx="44" cy="47" r="1.6" fill="#141414"/><circle cx="56" cy="47" r="1.6" fill="#141414"/>' +
      '<path d="M45 54q5 4 10 0" fill="none" stroke="#141414" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }

  return { project: project, avatar: avatar };
})();
