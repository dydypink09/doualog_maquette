/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Composants partagés rendus en JS (issue #12)
   Les styles sont dans components.css (.c-stat, .c-badge, .c-cell-select, .c-cell-input, .c-table) et documentés
   dans design-system.html ; ce fichier produit leur balisage, pour que l'accueil (E09) et les dashboards
   Import / Export / Transit (E15) les réutilisent sans le dupliquer.
   À charger après data.js. Usage : DOUALOG_UI.carteKpi({…}), DOUALOG_UI.tableau(table, colonnes, lignes)…
   ══════════════════════════════════════════════════════════════ */
(function () {
  var D = window.DOUALOG, F = D.fmt, esc = D.esc;
  function icon(n, cls) { return '<svg class="c-icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>'; }
  var VIDE = '<span class="u-muted">—</span>';

  /* ── Carte KPI ─────────────────────────────────────────────
     o = { label, court (libellé abrégé, carte étroite), valeur, icone, ton (couleur : blue, red…), href | attrs, actif, titre }
     Avec href : lien ; sinon bouton (attrs = attributs en plus, ex. ' data-kpi="bae"'). */
  function carteKpi(o) {
    var cls = 'c-stat c-stat--' + o.ton + (o.actif ? ' is-active' : ''), titre = ' title="' + esc(o.titre || o.label) + '"';
    var dedans = '<span class="c-stat__in"><span class="c-stat__icon">' + icon(o.icone) + '</span><span class="c-stat__value">' + o.valeur + '</span>' +
      '<span class="c-stat__label"><span class="is-long">' + esc(o.label) + '</span>' + (o.court ? '<span class="is-short" aria-hidden="true">' + esc(o.court) + '</span>' : '') + '</span></span>';
    return o.href
      ? '<a class="' + cls + '" href="' + o.href + '"' + titre + '>' + dedans + '</a>'
      : '<button class="' + cls + '" type="button"' + (o.attrs || '') + ' aria-pressed="' + !!o.actif + '"' + titre + '>' + dedans + '</button>';
  }
  /* Bandeau d'indicateurs du catalogue (data.js > indicateursDe) compté sur une liste de dossiers ; lien(k) = adresse ouverte au clic */
  function bandeauIndicateurs(indicateurs, dossiers, lien, precision) {
    return indicateurs.map(function (k) {
      return carteKpi({ label: k.label, court: k.court, icone: k.icone, ton: k.ton, valeur: dossiers.filter(k.f).length, href: lien(k),
        titre: k.label + (precision ? ' (' + precision + ')' : '') + ' — ouvrir la liste' });
    }).join('');
  }

  /* ── Badge de statut douane / statut dossier (couleur par statut : data.js > tonSuivi) ── */
  function badgeStatut(nom) { return nom ? '<span class="c-badge c-badge--' + D.tonSuivi(nom) + '">' + esc(nom) + '</span>' : VIDE; }

  /* ── Cellules éditables dans la ligne ──────────────────────
     o = { champ (data-champ), valeur, libelle (lecteurs d'écran), lectureSeule }
     En lecture seule : la valeur s'affiche (badge, date, texte), sans champ. */
  function celluleSelect(o) {   // + o.options : noms proposés ; '—' tant qu'aucune valeur n'est choisie
    if (o.lectureSeule) return badgeStatut(o.valeur);
    return '<select class="c-cell-select c-badge--' + D.tonSuivi(o.valeur) + '" data-champ="' + o.champ + '" aria-label="' + esc(o.libelle) + '">' +
      (o.valeur ? '' : '<option value="" selected>—</option>') +
      o.options.map(function (n) { return '<option' + (n === o.valeur ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('') + '</select>';
  }
  function celluleDate(o) {
    if (o.lectureSeule) return o.valeur ? '<span class="u-num">' + F.date(o.valeur) + '</span>' : VIDE;
    return '<input class="c-cell-input" type="date" data-champ="' + o.champ + '" value="' + (o.valeur || '') + '" aria-label="' + esc(o.libelle) + '">';
  }
  function celluleTexte(o) {   // + o.placeholder
    if (o.lectureSeule) return o.valeur ? esc(o.valeur) : VIDE;
    return '<input class="c-cell-input c-cell-input--texte" type="text" data-champ="' + o.champ + '" value="' + esc(o.valeur || '') + '"' +
      ' placeholder="' + esc(o.placeholder || '') + '" aria-label="' + esc(o.libelle) + '">';
  }

  /* ── Tableau générique configurable par colonnes ───────────
     colonnes = [{ titre, cls (ex. 'is-num'), v: function (ligne) { return html; }, actions (true : colonne figée à droite) }]
     lignes = données ; cle(ligne) = identifiant posé sur la ligne (data-id), lu par suivreEdition. */
  function tableau(table, colonnes, lignes, cle) {
    function attr(k) { return k.cls ? ' class="' + k.cls + '"' : ''; }
    table.classList.toggle('c-table--sticky', colonnes[colonnes.length - 1].actions === true);
    table.innerHTML = '<thead><tr>' + colonnes.map(function (k) { return '<th' + attr(k) + '>' + k.titre + '</th>'; }).join('') + '</tr></thead>' +
      '<tbody>' + lignes.map(function (l) {
        return '<tr data-id="' + esc(cle(l)) + '">' + colonnes.map(function (k) { return '<td' + attr(k) + '>' + k.v(l) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody>';
    if (window.DOUALOG_SHELL) window.DOUALOG_SHELL.suivreDefilement();   // ombre de la colonne figée
  }
  /* Enregistrement au changement d'une cellule : onChange(id, champ, valeur) ; le badge prend la couleur du statut choisi,
     bref halo vert sur la cellule (td.is-saved). À appeler une fois par tableau. */
  function suivreEdition(table, onChange) {
    table.addEventListener('change', function (e) {
      var el = e.target, champ = el.dataset.champ;
      if (!champ) return;
      var valeur = el.type === 'text' ? el.value.trim() : el.value;
      if (el.tagName === 'SELECT') {
        el.className = 'c-cell-select c-badge--' + D.tonSuivi(valeur);
        var vide = el.querySelector('option[value=""]'); if (vide && valeur) vide.remove();
      }
      onChange(el.closest('tr').dataset.id, champ, valeur);
      var td = el.closest('td'); td.classList.remove('is-saved'); void td.offsetWidth; td.classList.add('is-saved');
    });
  }

  window.DOUALOG_UI = {
    icon: icon, carteKpi: carteKpi, bandeauIndicateurs: bandeauIndicateurs, badgeStatut: badgeStatut,
    celluleSelect: celluleSelect, celluleDate: celluleDate, celluleTexte: celluleTexte, tableau: tableau, suivreEdition: suivreEdition
  };
})();
