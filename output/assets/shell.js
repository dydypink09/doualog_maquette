/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Shell des écrans internes (structure de references/vision-client.jpeg)
   Remplit <header id="topbar"> et <nav id="sidebar"> à partir de data.js.
   Le rôle se choisit sous le nom de l'utilisateur (maquette), il est mémorisé (localStorage)
   pour tous les écrans et filtre les entrées du menu selon DOUALOG.acces (CDC §02).
   Usage : DOUALOG_SHELL.init({ actif: 'tableau', onSearch: function (texte) {} })
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
    $('topbar').innerHTML =
      '<button class="c-btn c-btn--icon c-btn--ghost c-topbar__icon" type="button" id="shell-menu" aria-controls="sidebar">' + icon('sidebar', 'c-icon--lg') + '</button>' +
      '<div class="c-topbar__search c-input-icon">' + icon('search') +
        '<input class="c-input" id="shell-search" type="search" placeholder="Rechercher un dossier, un BL, un conteneur, un client…" aria-label="Recherche globale"></div>' +
      '<div class="c-topbar__right">' +
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

  function item(e, n) {
    if (e.horsV1) {
      return '<li data-nav="' + e.id + '"><span class="c-nav__item is-disabled" aria-disabled="true" title="Prévu après la V1">' + icon(e.icone) + '<span class="c-nav__label">' + e.label + '</span></span></li>';
    }
    /* Entrée hors droits du profil : rendue grisée par appliquerRole (le menu reste celui de l'image) */
    return '<li data-nav="' + e.id + '"><a class="c-nav__item" href="' + e.href + '">' + icon(e.icone) + '<span class="c-nav__label">' + e.label + '</span>' +
      '<span class="c-count"' + (e.id === 'notifications' ? ' id="shell-nav-notif"' : e.id === 'messagerie' ? ' id="shell-nav-mail"' : e.id === 'mandats' ? ' id="shell-nav-mandats" title="Mandats à traiter"' : e.id === 'documents' ? ' id="shell-nav-documents" title="Documents manquants ou à classer"' : '') + (n ? '' : ' data-zero') + '>' + (n || '') + '</span></a></li>';
  }

  /* Le logo est en tête du menu (menu bleu nuit pleine hauteur, header blanc) : nom DOUALOG blanc, monogramme blanc quand le menu est fermé */
  function renderSidebar(role) {
    var n = { notifications: nonLues(), messagerie: D.emailsNonLus().length, mandats: D.mandatsATraiter().length, documents: D.documentsATraiter().length };
    $('sidebar').innerHTML =
      '<div class="c-sidebar__brand"><a class="c-brand" id="shell-accueil" href="' + accueil(role) + '" aria-label="DOUALOG — Accueil">' +
        '<img class="c-brand__logo" src="../assets/img/logo-blanc-menu.png" alt="DOUALOG">' +
        '<img class="c-brand__logo c-brand__logo--mono" src="../assets/img/logo-monogramme-blanc-menu.png" alt=""></a></div>' +
      '<ul class="c-nav">' + D.navigation.map(function (e) { return item(e, n[e.id]); }).join('') + '</ul>' +
      '<ul class="c-nav c-nav--bottom"><li><a class="c-nav__item" href="E00-connexion.html">' + icon('logout') + '<span class="c-nav__label">Déconnexion</span></a></li></ul>';
  }

  function appliquerRole(role) {
    var a = D.acces[role], u = D.equipe[a.utilisateur];
    /* Le menu complet de l'image reste visible ; ce que le profil ne peut pas ouvrir est grisé (CDC §02) */
    document.querySelectorAll('[data-nav]').forEach(function (li) {
      var el = li.firstChild, e = D.navigation.filter(function (x) { return x.id === li.dataset.nav; })[0];
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
  }

  function init(o) {
    opts = o || {};
    var role = lireRole();
    renderTopbar(role);
    renderSidebar(role);
    setActive(opts.actif);
    appliquerRole(role);
    majMenu();
    $('shell-menu').addEventListener('click', basculerMenu);

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

  window.DOUALOG_SHELL = { init: init, setActive: setActive, role: lireRole, icon: icon, accueil: accueil, majCompteurs: majCompteurs, suivreDefilement: suivreDefilement };
})();
