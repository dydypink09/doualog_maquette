/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Shell des écrans internes (header : retour client du 06/11/2026)
   Remplit <header id="topbar"> et <nav id="sidebar"> à partir de data.js.
   Le rôle se choisit sous le nom de l'utilisateur (maquette), il est mémorisé (localStorage)
   pour tous les écrans et filtre les entrées du menu selon DOUALOG.acces (CDC §02).
   Usage : DOUALOG_SHELL.init({ actif: 'tableau', contexte: 'import', onContexte: function (c) {}, onSearch: function (texte) {} })
           onContexte : la page gère elle-même les dashboards (E15) → Import / Export / Transit changent la vue sans rechargement
           DOUALOG_SHELL.setContexte('export')   // change le titre du header sur place (null = accueil)
   ══════════════════════════════════════════════════════════════ */
(function () {
  var D = window.DOUALOG, KEY = 'doualog-role', KEY_MENU = 'doualog-menu';
  var opts = {};

  /* Menu ouvert / fermé : mémorisé pour tous les écrans, appliqué dès le chargement du script (pas de saut à l'affichage) */
  function menuFerme() { try { return localStorage.getItem(KEY_MENU) === 'ferme'; } catch (e) { return false; } }
  document.documentElement.classList.toggle('is-nav-ferme', menuFerme());

  function $(id) { return document.getElementById(id); }
  function icon(n, cls) { return '<svg class="c-icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>'; }

  function lireRole() {
    var r = null;
    try { r = localStorage.getItem(KEY); } catch (e) {}
    return D.acces[r] ? r : 'declarant';
  }
  function ecrireRole(r) { try { localStorage.setItem(KEY, r); } catch (e) {} }
  function nonLues() { return D.nonLues(); }
  /* Page d'accueil : le tableau de bord (E09) pour tous les profils, sauf accueil propre déclaré dans data.js */
  function accueil(role) { return D.acces[role].accueil || 'E09-tableau-de-bord.html'; }

  function renderTopbar(role) {
    var notif = nonLues(), mails = D.emailsNonLus().length;
    /* Header (retour client 06/11/2026) : logo à gauche, titre centré, recherche · notifications · emails · utilisateur à droite */
    $('topbar').innerHTML =
      '<div class="c-topbar__left">' +
        '<a class="c-brand c-brand--blanc" id="shell-accueil" href="' + accueil(role) + '" aria-label="DOUALOG — Accueil">' +
          '<img class="c-brand__mono" src="../assets/img/logo-monogramme-blanc-menu.png" alt="">' +
          '<span class="c-brand__texte"><img class="c-brand__logo" src="../assets/img/logo-blanc-menu.png" alt="DOUALOG"><span class="c-brand__sub">Douane &amp; Logistique</span></span></a>' +
      '</div>' +
      '<div class="c-topbar__title"><span class="c-topbar__name" id="shell-titre"></span>' + renderKpis() + '</div>' +
      '<div class="c-topbar__right">' +
        '<div class="c-topbar__search c-input-icon">' + icon('search') +
          '<input class="c-input" id="shell-search" type="search" placeholder="Dossier, BL, conteneur, client…" aria-label="Rechercher un dossier, un BL, un conteneur, un client"></div>' +
        '<a class="c-btn c-btn--icon c-btn--ghost c-topbar__icon" href="E08-notifications.html" aria-label="Notifications, ' + notif + ' non lues">' +
          icon('bell', 'c-icon--lg') + '<span class="c-count c-count--accent" id="shell-notif">' + (notif || '') + '</span></a>' +
        /* Boîte de réception centrale (E11) : emails entrants non lus, rattachés ou non */
        '<a class="c-btn c-btn--icon c-btn--ghost c-topbar__icon" href="E11-messagerie.html" aria-label="Messagerie, ' + mails + ' emails non lus">' +
          icon('mail', 'c-icon--lg') + '<span class="c-count c-count--accent" id="shell-mail">' + (mails || '') + '</span></a>' +
        '<div class="c-user"><span class="c-user__initials" id="shell-initiales"></span><span>' +
          '<span class="c-user__name" id="shell-nom"></span>' +
          '<select class="c-user__role" id="shell-role" aria-label="Profil affiché (maquette)">' +
            D.roles.map(function (r) { return '<option value="' + r.id + '"' + (r.id === role ? ' selected' : '') + '>' + r.label + '</option>'; }).join('') +
          '</select></span></div>' +
      '</div>';
  }

  /* Titre du header selon le dashboard actif (issue #2) : « Trade & Customs Dashboard » sur l'accueil,
     suffixé « - Import » / « - Export » / « - Transit » sur les dashboards métier ; changé sur place, sans rechargement */
  var TITRE = 'Trade & Customs Dashboard', CONTEXTES = { import: 'Import', export: 'Export', transit: 'Transit' };
  function setContexte(c) {
    var el = $('shell-titre');
    if (el) el.textContent = TITRE + (CONTEXTES[c] ? ' - ' + CONTEXTES[c] : '');
    document.querySelectorAll('.c-topbar__kpi').forEach(function (k) {
      if (k.dataset.contexte === c) k.setAttribute('aria-current', 'page'); else k.removeAttribute('aria-current');
    });
  }

  /* KPI globaux sous le titre (issue #3) : volume d'activité consolidé, même compte que les dashboards (DOUALOG.volumes()) ;
     un clic ouvre le dashboard du type (sur place depuis E15) */
  var KPIS = [['import', 'Imports'], ['export', 'Exports'], ['transit', 'Transits']];
  function renderKpis() {
    var v = D.volumes();
    return '<span class="c-topbar__kpis" role="group" aria-label="Volume d\'activité">' + KPIS.map(function (k) {
      return '<a class="c-topbar__kpi" href="E15-operations.html?type=' + k[0] + '" data-contexte="' + k[0] + '" title="Ouvrir le Dashboard ' + CONTEXTES[k[0]] + '">' +
        icon(k[0]) + '<span>' + k[1] + '</span><b class="u-num">' + v[k[0]] + '</b></a>';
    }).join('') + '</span>';
  }

  /* Menu de data.js à plat (groupes et leurs entrées), pour retrouver une entrée par son id */
  function entrees() {
    var out = [];
    D.navigation.forEach(function (e) { out.push(e); (e.enfants || []).forEach(function (x) { out.push(x); }); });
    return out;
  }
  function entree(id) { return entrees().filter(function (x) { return x.id === id; })[0]; }

  function item(e, n) {
    if (e.horsV1) {
      return '<li data-nav="' + e.id + '"><span class="c-nav__item is-disabled" aria-disabled="true" title="Prévu après la V1">' + icon(e.icone) + '<span class="c-nav__label">' + e.label + '</span></span></li>';
    }
    /* Entrée hors droits du profil : rendue grisée par appliquerRole (le menu reste celui de l'image) */
    return '<li data-nav="' + e.id + '"><a class="c-nav__item" href="' + e.href + '"' + (e.contexte ? ' data-contexte="' + e.contexte + '"' : '') + '>' + icon(e.icone) + '<span class="c-nav__label">' + e.label + '</span>' +
      '<span class="c-count"' + (e.id === 'notifications' ? ' id="shell-nav-notif"' : e.id === 'messagerie' ? ' id="shell-nav-mail"' : e.id === 'mandats' ? ' id="shell-nav-mandats" title="Mandats à traiter"' : e.id === 'documents' ? ' id="shell-nav-documents" title="Documents manquants ou à classer"' : '') + (n ? '' : ' data-zero') + '>' + (n || '') + '</span></a></li>';
  }

  /* Groupe repliable (Référentiels) : ouvert s'il contient l'entrée active, sinon dans l'état laissé par l'utilisateur.
     Menu fermé : le titre du groupe disparaît, ses entrées restent visibles en icônes */
  function groupeOuvert(id) { try { return localStorage.getItem(KEY_MENU + '-' + id) === 'ouvert'; } catch (e) { return false; } }
  function groupe(e, n) {
    var ouvert = groupeOuvert(e.id);
    return '<li class="c-nav__groupe" data-groupe="' + e.id + '">' +
      '<button class="c-nav__item c-nav__item--btn c-nav__toggle" type="button" aria-expanded="' + ouvert + '" aria-controls="nav-' + e.id + '">' +
        icon(e.icone) + '<span class="c-nav__label">' + e.label + '</span>' + icon('chevron-down', 'c-nav__chevron') + '</button>' +
      '<ul class="c-nav__sub" id="nav-' + e.id + '">' + e.enfants.map(function (x) { return item(x, n[x.id]); }).join('') + '</ul></li>';
  }
  function ouvrirGroupe(li, ouvert, memoriser) {
    li.querySelector('.c-nav__toggle').setAttribute('aria-expanded', String(ouvert));
    if (memoriser) try { localStorage.setItem(KEY_MENU + '-' + li.dataset.groupe, ouvert ? 'ouvert' : 'ferme'); } catch (e) {}
  }

  /* Menu bleu nuit sous le header (le logo est dans le header) ; entrées dans data.js > navigation */
  function renderSidebar() {
    var n = { notifications: nonLues(), messagerie: D.emailsNonLus().length, mandats: D.mandatsATraiter().length, documents: D.documentsATraiter().length };
    $('sidebar').innerHTML =
      '<ul class="c-nav">' + D.navigation.map(function (e) { return e.enfants ? groupe(e, n) : item(e, n[e.id]); }).join('') + '</ul>' +
      '<ul class="c-nav c-nav--bottom">' +
        '<li><button class="c-nav__item c-nav__item--btn" type="button" id="shell-menu" aria-controls="sidebar">' + icon('sidebar') + '<span class="c-nav__label" id="shell-menu-label">Réduire le menu</span></button></li>' +
        '<li><a class="c-nav__item" href="E00-connexion.html">' + icon('logout') + '<span class="c-nav__label">Déconnexion</span></a></li></ul>';
  }

  function appliquerRole(role) {
    var a = D.acces[role], u = D.equipe[a.utilisateur];
    /* Le menu complet de l'image reste visible ; ce que le profil ne peut pas ouvrir est grisé (CDC §02) */
    document.querySelectorAll('[data-nav]').forEach(function (li) {
      var el = li.firstChild, e = entree(li.dataset.nav);
      if (e.horsV1) return;
      var ok = a.nav.indexOf(e.id) >= 0;
      el.classList.toggle('is-disabled', !ok);
      if (ok) { el.setAttribute('href', e.href); el.removeAttribute('aria-disabled'); el.removeAttribute('title'); delete el.dataset.titreMenu; }
      else { el.removeAttribute('href'); el.setAttribute('aria-disabled', 'true'); delete el.dataset.titreMenu; el.title = 'Non accessible au profil ' + D.roles.filter(function (r) { return r.id === role; })[0].label; }
    });
    $('shell-initiales').textContent = u.initiales;
    $('shell-nom').textContent = u.nom;
    document.dispatchEvent(new CustomEvent('dlg:role', { detail: { role: role, acces: a, utilisateur: a.utilisateur } }));
  }

  /* Menu fermé : le libellé de chaque entrée passe en infobulle (title), sauf si le profil la grise (title déjà posé) */
  function majMenu() {
    var ferme = document.documentElement.classList.contains('is-nav-ferme'), b = $('shell-menu');
    b.setAttribute('aria-expanded', String(!ferme));
    b.setAttribute('aria-label', ferme ? 'Ouvrir le menu' : 'Fermer le menu');
    b.title = ferme ? 'Ouvrir le menu' : 'Fermer le menu';
    $('shell-menu-label').textContent = ferme ? 'Ouvrir le menu' : 'Réduire le menu';
    document.querySelectorAll('#sidebar .c-nav__item').forEach(function (el) {
      var l = el.querySelector('.c-nav__label').textContent;
      if (ferme && !el.title) { el.title = l; el.dataset.titreMenu = ''; }
      else if (!ferme && el.dataset.titreMenu !== undefined) { el.removeAttribute('title'); delete el.dataset.titreMenu; }
    });
  }
  function basculerMenu() {
    var ferme = !document.documentElement.classList.contains('is-nav-ferme');
    document.documentElement.classList.toggle('is-nav-ferme', ferme);
    try { localStorage.setItem(KEY_MENU, ferme ? 'ferme' : 'ouvert'); } catch (e) {}
    majMenu();
  }

  function setActive(id) {
    document.querySelectorAll('[data-nav]').forEach(function (li) {
      var el = li.firstChild, on = li.dataset.nav === id;
      el.classList.toggle('is-active', on);
      if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-groupe]').forEach(function (li) {
      var dedans = !!li.querySelector('[data-nav="' + id + '"]');
      li.querySelector('.c-nav__toggle').classList.toggle('has-active', dedans);
      if (dedans) ouvrirGroupe(li, true, false);
    });
  }

  /* Dashboards métier (E15) : au clic sur Import / Export / Transit, la vue change sur place (sans rechargement) :
     adresse (history), entrée active, titre du header, puis opts.onContexte(contexte) redessine le contenu */
  function afficherContexte(c) {
    var e = entrees().filter(function (x) { return x.contexte === c; })[0];
    if (!e) return;
    setActive(e.id);
    setContexte(c);
    opts.onContexte(c);
  }
  function suivreContextes() {
    history.replaceState({ contexte: opts.contexte }, '');
    /* Liens vers un dashboard : entrées du menu et KPI du header (attribut data-contexte) */
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest('a[data-contexte]'), c = a && a.dataset.contexte, href = a && a.getAttribute('href');
      if (!c || !href || a.classList.contains('is-disabled') || ev.button || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      ev.preventDefault();
      /* Navigateur qui refuse de réécrire l'adresse (ex. fichier local d'un autre nom) : navigation classique */
      try { if (c !== (history.state && history.state.contexte)) history.pushState({ contexte: c }, '', href); }
      catch (err) { location.href = href; return; }
      afficherContexte(c);
    });
    window.addEventListener('popstate', function (ev) { if (ev.state && ev.state.contexte) afficherContexte(ev.state.contexte); });
  }

  function init(o) {
    opts = o || {};
    var role = lireRole();
    renderTopbar(role);
    setContexte(opts.contexte);
    renderSidebar();
    setActive(opts.actif);
    appliquerRole(role);
    majMenu();
    $('shell-menu').addEventListener('click', basculerMenu);
    document.querySelectorAll('[data-groupe]').forEach(function (li) {
      li.querySelector('.c-nav__toggle').addEventListener('click', function () { ouvrirGroupe(li, this.getAttribute('aria-expanded') !== 'true', true); });
    });
    if (opts.onContexte) suivreContextes();

    $('shell-role').addEventListener('change', function () {
      ecrireRole(this.value);
      var dest = accueil(this.value);
      $('shell-accueil').href = dest;
      appliquerRole(this.value);
      majMenu();
    });
    var s = $('shell-search');
    s.addEventListener('input', function () { if (opts.onSearch) opts.onSearch(s.value); });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !opts.onSearch) location.href = 'E01-dossiers.html?q=' + encodeURIComponent(s.value);
    });
  }

  /* Met à jour les compteurs (cloche, emails, mandats à traiter) après « marquer comme lu », un rattachement ou une action sur un mandat */
  function majCompteurs() {
    var n = nonLues(), m = D.emailsNonLus().length, k = D.mandatsATraiter().length;
    [$('shell-notif'), $('shell-nav-notif')].forEach(function (el) {
      if (!el) return;
      el.textContent = n || '';
      if (n) el.removeAttribute('data-zero'); else el.setAttribute('data-zero', '');
    });
    [$('shell-mail'), $('shell-nav-mail')].forEach(function (el) {
      if (!el) return;
      el.textContent = m || '';
      if (m) el.removeAttribute('data-zero'); else el.setAttribute('data-zero', '');
    });
    var em = $('shell-nav-mandats');
    if (em) { em.textContent = k || ''; if (k) em.removeAttribute('data-zero'); else em.setAttribute('data-zero', ''); }
    var ed = $('shell-nav-documents'), nd = D.documentsATraiter().length;
    if (ed) { ed.textContent = nd || ''; if (nd) ed.removeAttribute('data-zero'); else ed.setAttribute('data-zero', ''); }
  }

  /* Tableaux qui défilent à l'horizontale : ombre au bord de la colonne Actions (figée à droite) tant qu'il reste des colonnes à voir */
  function suivreDefilement() {
    function maj(w) {
      var max = w.scrollWidth - w.clientWidth;
      w.classList.toggle('has-suite', w.scrollLeft < max - 1);
    }
    document.querySelectorAll('.c-table-wrap').forEach(function (w) {
      if (w.dataset.defile) return;
      w.dataset.defile = '1';
      w.addEventListener('scroll', function () { maj(w); }, { passive: true });
      if (window.ResizeObserver) { var ro = new ResizeObserver(function () { maj(w); }); ro.observe(w); if (w.firstElementChild) ro.observe(w.firstElementChild); }
      maj(w);
    });
  }
  document.addEventListener('DOMContentLoaded', suivreDefilement);
  window.addEventListener('load', suivreDefilement);

  window.DOUALOG_SHELL = { init: init, setActive: setActive, setContexte: setContexte, role: lireRole, icon: icon, accueil: accueil, majCompteurs: majCompteurs, suivreDefilement: suivreDefilement };
})();
