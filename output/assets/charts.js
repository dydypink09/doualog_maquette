/* ══════════════════════════════════════════════════════════════
   DOUALOG — Graphiques SVG partagés (E09 tableau de bord, E10 fiche client…)
   Rendu léger et précis, dessiné à la taille réelle du conteneur (largeur(el)) pour que barres et textes ne grossissent pas : barres fines (10 px max) à coins hauts arrondis, courbes de 1,75 px, grille en pointillé,
   anneaux fins à segments espacés, valeurs exactes dans une infobulle au survol ([data-tip]).
   La géométrie est calculée ici (attributs SVG) ; couleurs, traits et animations dans components.css (.c-chart…).
   Teinte d'une série : classe is-s-blue / -orange / -navy / -green / -violet / -magenta / -red / -gray.
   ══════════════════════════════════════════════════════════════ */
(function () {
  var uid = 0;
  function attr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function n1(v) { return Math.round(v * 10) / 10; }

  /* Graduations « rondes » : 3 ou 4 lignes de grille au plus */
  function graduations(max) {
    var pas = [1, 2, 4, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000].filter(function (p) { return max / p <= 4; })[0] || Math.ceil(max / 4);
    return { pas: pas, haut: Math.max(pas, Math.ceil(max / pas) * pas) };
  }
  function grille(o, g) {
    var s = '';
    for (var v = 0; v <= g.haut; v += g.pas) {
      var y = n1(o.h - o.b - (o.h - o.b - o.t) * v / g.haut);
      s += '<line class="c-chart__grid" x1="' + o.g + '" x2="' + o.w + '" y1="' + y + '" y2="' + y + '"/>' +
        '<text class="c-chart__axis" x="' + (o.g - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + v + '</text>';
    }
    return s;
  }
  /* Barre à coins hauts arrondis (le bas reste droit, posé sur la base) */
  function barre(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, h, w / 2));
    return 'M' + n1(x) + ' ' + n1(y + h) + 'V' + n1(y + r) + 'Q' + n1(x) + ' ' + n1(y) + ' ' + n1(x + r) + ' ' + n1(y) +
      'H' + n1(x + w - r) + 'Q' + n1(x + w) + ' ' + n1(y) + ' ' + n1(x + w) + ' ' + n1(y + r) + 'V' + n1(y + h) + 'Z';
  }
  /* Libellés d'axe : un sur k quand la place manque (44 px mini par libellé), le dernier (période en cours) toujours affiché */
  function libelleVisible(i, n, slot) { var k = Math.ceil(44 / slot); return (n - 1 - i) % k === 0; }
  function cadre(o) { return { w: o.w || 640, h: o.h || 210, g: o.g || 30, b: o.b || 26, t: o.t || 18 }; }
  function svg(o, contenu, aria) {
    return '<svg class="c-chart" viewBox="0 0 ' + o.w + ' ' + o.h + '" role="img" aria-label="' + attr(aria) + '">' + contenu + '</svg>';
  }

  /* Barres verticales empilées.
     opts : series [{cle, cls, nom}], points [{label, valeurs {cle: n}, href, partiel, tip}], aria, total (afficher le total au-dessus) */
  function barres(opts) {
    var o = cadre(opts), series = opts.series, pts = opts.points;
    var totaux = pts.map(function (p) { return series.reduce(function (s, x) { return s + (p.valeurs[x.cle] || 0); }, 0); });
    var g = graduations(Math.max.apply(null, totaux.concat([1])));
    var slot = (o.w - o.g) / pts.length, bw = Math.max(4, Math.min(slot * 0.36, opts.barre || 10)), base = o.h - o.b, ESPACE = 2, s = grille(o, g);
    function hauteur(v) { return (base - o.t) * v / g.haut; }
    pts.forEach(function (p, i) {
      var x = o.g + slot * i + (slot - bw) / 2, y = base, segs = '', visibles = series.filter(function (x) { return p.valeurs[x.cle]; });
      visibles.forEach(function (serie, k) {
        var h = hauteur(p.valeurs[serie.cle]), haut = k === visibles.length - 1, hv = k ? Math.max(h - ESPACE, 1) : h;
        segs += '<path class="c-chart__bar ' + serie.cls + (p.partiel ? ' c-chart__bar--partiel' : '') + '" d="' + barre(x, y - h, bw, hv, haut ? 2.5 : 0) + '"/>';
        y -= h;
      });
      var tip = p.tip || (p.label + ' : ' + series.map(function (x) { return (p.valeurs[x.cle] || 0) + ' ' + x.nom.toLowerCase(); }).join(', '));
      /* Zone de survol pleine hauteur : la valeur exacte s'affiche dans l'infobulle */
      var zone = '<rect class="c-chart__zone" x="' + n1(o.g + slot * i) + '" y="' + o.t + '" width="' + n1(slot) + '" height="' + (base - o.t) + '"/>';
      var groupe = zone + segs + (opts.total ? '<text class="c-chart__value" x="' + n1(x + bw / 2) + '" y="' + n1(y - 6) + '" text-anchor="middle">' + totaux[i] + '</text>' : '');
      s += p.href ? '<a class="c-chart__pt" href="' + attr(p.href) + '" data-tip="' + attr(tip) + '" aria-label="' + attr(tip) + '">' + groupe + '</a>'
                  : '<g class="c-chart__pt" data-tip="' + attr(tip) + '">' + groupe + '</g>';
      if (libelleVisible(i, pts.length, slot)) s += '<text class="c-chart__axis" x="' + n1(x + bw / 2) + '" y="' + (o.h - 8) + '" text-anchor="middle">' + p.label + '</text>';
    });
    return svg(o, s, opts.aria);
  }

  /* Courbe : opts labels [..], valeurs [n|null], cls, format(v), tips [..], reference {v, label}, aria */
  function courbe(opts) {
    var o = cadre(opts), id = 'dg' + (++uid), fmt = opts.format || String;
    var pts = opts.valeurs.map(function (v, i) { return { i: i, v: v }; }).filter(function (p) { return p.v !== null && p.v !== undefined; });
    var g = graduations(Math.max.apply(null, pts.map(function (p) { return p.v; }).concat(opts.reference ? [opts.reference.v] : [])) * 1.1);
    var slot = (o.w - o.g) / opts.labels.length, base = o.h - o.b;
    function xy(p) { return [n1(o.g + slot * p.i + slot / 2), n1(base - (base - o.t) * p.v / g.haut)]; }
    var trace = pts.map(function (p, k) { var c = xy(p); return (k ? 'L' : 'M') + c[0] + ' ' + c[1]; }).join(' ');
    var aire = trace + ' L' + xy(pts[pts.length - 1])[0] + ' ' + base + ' L' + xy(pts[0])[0] + ' ' + base + ' Z';
    var s = grille(o, g) + '<g class="' + opts.cls + '"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop class="c-chart__stop" offset="0"/><stop class="c-chart__stop c-chart__stop--bas" offset="1"/></linearGradient></defs>' +
      '<path class="c-chart__area" d="' + aire + '" fill="url(#' + id + ')"/><path class="c-chart__line" d="' + trace + '"/>';
    if (opts.reference) {
      var yr = n1(base - (base - o.t) * opts.reference.v / g.haut);
      s += '<line class="c-chart__ref" x1="' + o.g + '" x2="' + o.w + '" y1="' + yr + '" y2="' + yr + '"/>' +
        '<text class="c-chart__ref-label" x="' + (o.g + 4) + '" y="' + (yr - 5) + '">' + attr(opts.reference.label) + '</text>';
    }
    pts.forEach(function (p, k) {
      var c = xy(p), dernier = k === pts.length - 1, tip = (opts.tips && opts.tips[p.i]) || (opts.labels[p.i] + ' : ' + fmt(p.v));
      s += '<g class="c-chart__pt" data-tip="' + attr(tip) + '" aria-label="' + attr(tip) + '">' +
        '<rect class="c-chart__zone" x="' + n1(o.g + slot * p.i) + '" y="' + o.t + '" width="' + n1(slot) + '" height="' + (base - o.t) + '"/>' +
        '<circle class="c-chart__dot' + (dernier ? ' is-last' : '') + '" cx="' + c[0] + '" cy="' + c[1] + '" r="3.5"/>' +
        (dernier ? '<text class="c-chart__value" x="' + c[0] + '" y="' + (c[1] - 10) + '" text-anchor="middle">' + fmt(p.v) + '</text>' : '') + '</g>';
    });
    s += '</g>';
    opts.labels.forEach(function (l, i) { if (libelleVisible(i, opts.labels.length, slot)) s += '<text class="c-chart__axis" x="' + n1(o.g + slot * i + slot / 2) + '" y="' + (o.h - 8) + '" text-anchor="middle">' + l + '</text>'; });
    return svg(o, s, opts.aria);
  }

  /* Anneau fin, segments séparés par un petit espace. parts [{label, n, cls}] */
  function anneau(parts, total, legende) {
    var r = 50, c = 2 * Math.PI * r, debut = 0, segs = '', ESPACE = parts.filter(function (p) { return p.n; }).length > 1 ? 3 : 0;
    parts.forEach(function (p) {
      var l = total ? c * p.n / total : 0, tip = p.label + ' : ' + p.n + ' (' + (total ? Math.round(100 * p.n / total) : 0) + ' %)';
      if (l) segs += '<circle class="c-donut__seg ' + p.cls + '" cx="60" cy="60" r="' + r + '" stroke-dasharray="' + n1(Math.max(l - ESPACE, 1)) + ' ' + n1(c - Math.max(l - ESPACE, 1)) + '" stroke-dashoffset="' + n1(-debut) + '" transform="rotate(-90 60 60)" data-tip="' + attr(tip) + '"/>';
      debut += l;
    });
    return '<div class="c-donut-row"><svg class="c-chart" viewBox="0 0 120 120" role="img" aria-label="' + attr(legende) + '">' +
      '<circle class="c-donut__track" cx="60" cy="60" r="' + r + '"/>' + segs +
      '<text class="c-donut__total" x="60" y="62" text-anchor="middle">' + total + '</text><text class="c-donut__label" x="60" y="78" text-anchor="middle">' + attr(legende) + '</text></svg>' +
      '<ul class="c-legend c-legend--col">' + parts.map(function (p) { return '<li class="' + p.cls + '">' + p.label + '<b>' + p.n + ' · ' + (total ? Math.round(100 * p.n / total) : 0) + ' %</b></li>'; }).join('') + '</ul></div>';
  }

  /* Barre horizontale fine (piste + remplissage en %), sans déformation des arrondis */
  function piste(pct) {
    return '<span class="c-hbar__track"><svg aria-hidden="true"><rect class="c-hbar__bg" width="100%" height="100%" rx="3"/>' +
      (pct ? '<rect class="c-hbar__fill" width="' + pct + '%" height="100%" rx="3"/>' : '') + '</svg></span>';
  }
  /* Barre horizontale empilée (répartition d'un total), segments séparés par un filet de la couleur du fond. parts [{v, cls, nom, tip}] */
  function empile(parts, aria) {
    var tot = parts.reduce(function (s, p) { return s + p.v; }, 0) || 1, x = 0, s = '';
    parts.forEach(function (p) {
      var w = 100 * p.v / tot;
      if (w) s += '<rect class="c-hbar__fill c-hbar__fill--empile ' + p.cls + '" x="' + n1(x) + '%" width="' + n1(w) + '%" height="100%" rx="3" data-tip="' + attr(p.tip || p.nom) + '"/>';
      x += w;
    });
    return '<span class="c-hbar__track"><svg role="img" aria-label="' + attr(aria) + '">' + s + '</svg></span>';
  }

  /* Largeur utile d'un conteneur (sans ses marges intérieures) : le SVG est dessiné à l'échelle 1, au pixel près */
  function largeur(el) {
    var cs = getComputedStyle(el);
    return Math.max(240, Math.floor(el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)));
  }

  /* Infobulle unique, suit le pointeur sur tout élément [data-tip] d'un graphique */
  var bulle = null;
  function montrer(e) {
    var cible = e.target.closest && e.target.closest('.c-chart [data-tip], .c-hbar__track [data-tip]');
    if (!cible) { if (bulle) bulle.classList.remove('is-visible'); return; }
    if (!bulle) { bulle = document.createElement('div'); bulle.className = 'c-chart-tip'; bulle.setAttribute('role', 'tooltip'); document.body.appendChild(bulle); }
    bulle.textContent = cible.getAttribute('data-tip');
    var x = Math.min(e.clientX + 14, window.innerWidth - bulle.offsetWidth - 8);
    bulle.style.transform = 'translate(' + x + 'px,' + (e.clientY - bulle.offsetHeight - 12) + 'px)';
    bulle.classList.add('is-visible');
  }
  document.addEventListener('pointermove', montrer);
  document.addEventListener('pointerleave', function () { if (bulle) bulle.classList.remove('is-visible'); });

  window.DOUALOG_CHARTS = { largeur: largeur, barres: barres, courbe: courbe, anneau: anneau, piste: piste, empile: empile };
})();
