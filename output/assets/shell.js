/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Shell des écrans internes (structure de references/vision-client.jpeg)
   Remplit <header id="topbar"> et <nav id="sidebar"> à partir de data.js.
   Le rôle se choisit sous le nom de l'utilisateur (maquette), il est mémorisé (localStorage)
   pour tous les écrans et filtre les entrées du menu selon DOUALOG.acces (CDC §02).
   Usage : DOUALOG_SHELL.init({ actif: 'tableau', onSearch: function (texte) {} })
   ══════════════════════════════════════════════════════════════ */
(function () {
  var D = window.DOUALOG, KEY = 'doualog-role';
  var opts = {};

  function $(id) { return document.getElementById(id); }
  function icon(n, cls) { return '<svg class="c-icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>'; }

  function lireRole() {
    var r = null;
    try { r = localStorage.getItem(KEY); } catch (e) {}
    return D.acces[r] ? r : 'declarant';
  }
  function ecrireRole(r) { try { localStorage.setItem(KEY, r); } catch (e) {} }
  function nonLues() { return D.nonLues(); }
  /* Page d'accueil du profil : E07 pour Manager et Direction, E01 sinon */
  function accueil(role) { return D.acces[role].accueil || 'E01-tableau-de-bord.html'; }

  function renderTopbar(role) {
    var notif = nonLues(), mails = D.emailsNonLus.length;
    $('topbar').innerHTML =
      '<a class="c-brand" id="shell-accueil" href="' + accueil(role) + '" aria-label="DOUALOG — Accueil">' +
        '<span class="c-brand__mark"><img src="../assets/img/logo-monogramme.png" alt=""></span>' +
        '<span><span class="c-brand__name">DOUA<em>LOG</em></span><span class="c-brand__sub">Control Tower</span></span></a>' +
      '<div class="c-topbar__search c-input-icon">' + icon('search') +
        '<input class="c-input" id="shell-search" type="search" placeholder="Rechercher un dossier, un BL, un conteneur, un client…" aria-label="Recherche globale"></div>' +
      '<div class="c-topbar__right">' +
        '<a class="c-btn c-btn--icon c-btn--ghost c-topbar__icon" href="E08-notifications.html" aria-label="Notifications, ' + notif + ' non lues">' +
          icon('bell', 'c-icon--lg') + '<span class="c-count c-count--accent" id="shell-notif">' + (notif || '') + '</span></a>' +
        /* Messagerie générale hors V1 : le compteur montre les emails entrants non lus de la boîte DOUALOG */
        '<span class="c-btn c-btn--icon c-btn--ghost c-topbar__icon" role="img" title="Emails entrants non lus — messagerie générale prévue après la V1" aria-label="' + mails + ' emails entrants non lus">' +
          icon('mail', 'c-icon--lg') + '<span class="c-count c-count--accent">' + (mails || '') + '</span></span>' +
        '<div class="c-user"><span class="c-user__initials" id="shell-initiales"></span><span>' +
          '<span class="c-user__name" id="shell-nom"></span>' +
          '<select class="c-user__role" id="shell-role" aria-label="Profil affiché (maquette)">' +
            D.roles.map(function (r) { return '<option value="' + r.id + '"' + (r.id === role ? ' selected' : '') + '>' + r.label + '</option>'; }).join('') +
          '</select></span></div>' +
      '</div>';
  }

  function item(e, n) {
    if (e.horsV1) {
      return '<li data-nav="' + e.id + '"><span class="c-nav__item is-disabled" aria-disabled="true" title="Prévu après la V1">' + icon(e.icone) + e.label + '</span></li>';
    }
    /* Entrée hors droits du profil : rendue grisée par appliquerRole (le menu reste celui de l'image) */
    return '<li data-nav="' + e.id + '"><a class="c-nav__item" href="' + e.href + '">' + icon(e.icone) + e.label +
      '<span class="c-count"' + (e.id === 'notifications' ? ' id="shell-nav-notif"' : '') + (n ? '' : ' data-zero') + '>' + (n || '') + '</span></a></li>';
  }

  function renderSidebar() {
    var n = { notifications: nonLues() };
    $('sidebar').innerHTML =
      '<ul class="c-nav">' + D.navigation.map(function (e) { return item(e, n[e.id]); }).join('') + '</ul>' +
      '<ul class="c-nav c-nav--bottom"><li><a class="c-nav__item" href="E00-connexion.html">' + icon('logout') + 'Déconnexion</a></li></ul>';
  }

  function appliquerRole(role) {
    var a = D.acces[role], u = D.equipe[a.utilisateur];
    /* Le menu complet de l'image reste visible ; ce que le profil ne peut pas ouvrir est grisé (CDC §02) */
    document.querySelectorAll('[data-nav]').forEach(function (li) {
      var el = li.firstChild, e = D.navigation.filter(function (x) { return x.id === li.dataset.nav; })[0];
      if (e.horsV1) return;
      var ok = a.nav.indexOf(e.id) >= 0;
      el.classList.toggle('is-disabled', !ok);
      if (ok) { el.setAttribute('href', e.href); el.removeAttribute('aria-disabled'); el.removeAttribute('title'); }
      else { el.removeAttribute('href'); el.setAttribute('aria-disabled', 'true'); el.title = 'Non accessible au profil ' + D.roles.filter(function (r) { return r.id === role; })[0].label; }
    });
    $('shell-initiales').textContent = u.initiales;
    $('shell-nom').textContent = u.nom;
    document.dispatchEvent(new CustomEvent('dlg:role', { detail: { role: role, acces: a, utilisateur: a.utilisateur } }));
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
    renderSidebar();
    setActive(opts.actif);
    appliquerRole(role);

    $('shell-role').addEventListener('change', function () {
      ecrireRole(this.value);
      /* Changement de profil depuis une page d'accueil : on bascule sur l'accueil du nouveau profil */
      var page = location.pathname.split('/').pop(), dest = accueil(this.value);
      if (!location.search && (page === 'E01-tableau-de-bord.html' || page === 'E07-dashboard-manager.html') && page !== dest) { location.href = dest; return; }
      $('shell-accueil').href = dest;
      appliquerRole(this.value);
    });
    var s = $('shell-search');
    s.addEventListener('input', function () { if (opts.onSearch) opts.onSearch(s.value); });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !opts.onSearch) location.href = 'E01-tableau-de-bord.html?q=' + encodeURIComponent(s.value);
    });
  }

  /* Met à jour les compteurs de notifications (cloche + menu) après « marquer comme lu » */
  function majCompteurs() {
    var n = nonLues();
    [$('shell-notif'), $('shell-nav-notif')].forEach(function (el) {
      if (!el) return;
      el.textContent = n || '';
      if (n) el.removeAttribute('data-zero'); else el.setAttribute('data-zero', '');
    });
  }

  window.DOUALOG_SHELL = { init: init, setActive: setActive, role: lireRole, icon: icon, accueil: accueil, majCompteurs: majCompteurs };
})();
