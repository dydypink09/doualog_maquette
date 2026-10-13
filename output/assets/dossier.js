/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — E02 Dossier ouvert en panneau bas de page
   Structure de references/vision-client.jpeg (partie basse), en pleine hauteur sous le header : bandeau, workflow, puis tous les blocs
   visibles en grille (pas d'onglets). Historique dans un panneau latéral (menu « … » ou lien en bas).
   Usage : DOUALOG_DOSSIER.ouvrir('DLG-2026-0412') · fermer() · événement document 'dlg:dossier'
   Les actions de démonstration (BAE, BAS, nouveau message) modifient les données en mémoire.
   ══════════════════════════════════════════════════════════════ */
(function () {
  var D = window.DOUALOG, B = D.badge, F = D.fmt, esc = D.esc;
  var DASH = '<span class="c-dash">—</span>';
  var ouvert = null, enAttente = null;   // dossier affiché · action de la modale

  function $(id) { return document.getElementById(id); }
  function icon(n, cls) { return '<svg class="c-icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"></use></svg>'; }
  function dh(iso) { return iso ? (iso.length === 10 ? F.date(iso) : F.date(iso) + ' ' + F.heure(iso)) : DASH; }
  function kv(rows) {
    return '<dl class="c-kv c-kv--rows">' + rows.filter(Boolean).map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + (r[1] === null || r[1] === undefined || r[1] === '' ? DASH : r[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }
  function carte(titre, corps, actions, pied) {
    return '<section class="c-card"><div class="c-card__head"><h3>' + titre + '</h3>' + (actions ? '<div class="c-card__actions">' + actions + '</div>' : '') + '</div>' +
      '<div class="c-card__body">' + corps + '</div>' + (pied ? '<div class="c-card__foot">' + pied + '</div>' : '') + '</section>';
  }
  function utilisateur() { return D.equipe[D.acces[window.DOUALOG_SHELL.role()].utilisateur]; }
  function aujourdhui() { return D.config.aujourdhui; }
  function signaler(d) { document.dispatchEvent(new CustomEvent('dlg:dossier', { detail: { id: d ? d.id : null } })); }

  /* ── Structure fixe : panneau, historique, modale ─────────── */
  function monter() {
    if ($('dossier')) return;
    document.body.insertAdjacentHTML('beforeend',
      '<aside class="c-panel" id="dossier" aria-label="Dossier ouvert"></aside>' +
      '<aside class="c-drawer" id="dossier-drawer" aria-labelledby="dossier-drawer-titre">' +
        '<div class="c-drawer__head"><h2 class="c-block-title" id="dossier-drawer-titre"></h2>' +
        '<button class="c-btn c-btn--icon c-btn--ghost c-btn--sm" type="button" data-d="drawer-fermer" aria-label="Fermer">' + icon('x', 'c-icon--sm') + '</button></div>' +
        '<div class="c-drawer__body" id="dossier-drawer-corps"></div></aside>' +
      '<div class="c-overlay" id="dossier-modale" hidden><div class="c-modal" role="dialog" aria-modal="true" aria-labelledby="dossier-modale-titre">' +
        '<div class="c-modal__head"><h3 id="dossier-modale-titre"></h3>' +
        '<button class="c-btn c-btn--icon c-btn--ghost c-btn--sm" type="button" data-d="modale-fermer" aria-label="Fermer">' + icon('x', 'c-icon--sm') + '</button></div>' +
        '<div class="c-modal__body" id="dossier-modale-corps"></div>' +
        '<div class="c-modal__foot"><button class="c-btn c-btn--ghost" type="button" data-d="modale-fermer">Annuler</button>' +
        '<button class="c-btn c-btn--primary" type="button" data-d="modale-valider" id="dossier-modale-ok"></button></div></div></div>');
  }

  /* ── Bandeau ──────────────────────────────────────────────── */
  function bandeau(d) {
    var c = D.client(d), r = D.responsable(d);
    var refT = d.bl ? ['BL', d.bl] : d.lta ? ['LTA', d.lta] : d.booking ? ['Booking', d.booking] : ['BL', null];
    var meta = [['Client', esc(c.nom)], ['Type', d.type], ['Mode', d.mode], ['ETA', d.eta ? F.date(d.eta) : null], refT,
      d.mode === 'Aérien' ? ['Vol', d.vol] : ['Conteneur', d.conteneur],
      ['Déclarant', r.nom], ['Incoterm', d.incoterm], ['Poids brut', F.poids(d.poids)], ['Colis', F.nombre(d.colis) + ' ' + d.unite]];
    var ot = d.transport && d.transport.ot;
    var otTitre = ot ? 'Ordre de transport déjà créé (' + ot + ')' : (!d.bae ? 'Disponible après le BAE' : '');
    var otOk = !ot && d.bae;
    return '<div class="c-banner">' +
      '<span class="c-banner__icon">' + icon('rapport') + '</span>' +
      '<div class="c-banner__main"><div class="c-banner__top"><h2 class="c-banner__ref" id="dossier-titre">Dossier ' + d.id + '</h2>' + B('dossier', d.statut) + '</div>' +
        '<div class="c-banner__meta">' + meta.map(function (m) { return '<span>' + m[0] + ' : <b>' + (m[1] || '—') + '</b></span>'; }).join('') + '</div></div>' +
      '<div class="c-banner__actions">' +
        '<button class="c-btn c-btn--sm c-btn--on-dark" type="button" data-d="message">' + icon('mail', 'c-icon--sm') + 'Envoyer un email</button>' +
        /* C5 : OT possible dès le BAE (À VALIDER) */
        '<a class="c-btn c-btn--sm c-btn--on-dark" href="E04-creation-ot.html?id=' + d.id + '"' + (otOk ? '' : ' aria-disabled="true"') + (otTitre ? ' title="' + otTitre + '"' : '') + '>' + icon('transport', 'c-icon--sm') + 'Créer OT</a>' +
        '<button class="c-btn c-btn--sm c-btn--on-dark" type="button" data-d="pdf">' + icon('pdf', 'c-icon--sm') + 'Exporter PDF</button>' +
        '<div class="c-menu-wrap"><button class="c-btn c-btn--icon c-btn--sm c-btn--on-dark" type="button" data-d="menu" aria-haspopup="true" aria-expanded="false" aria-label="Plus d\'actions">' + icon('more', 'c-icon--sm') + '</button>' +
          '<div class="c-menu" id="dossier-menu" role="menu" hidden>' +
            '<button class="c-menu__item" type="button" role="menuitem" data-d="historique">' + icon('clock', 'c-icon--sm') + 'Historique du dossier</button>' +
            '<button class="c-menu__item" type="button" role="menuitem" data-d="fermer">' + icon('x', 'c-icon--sm') + 'Fermer le dossier</button>' +
          '</div></div>' +
        '<button class="c-btn c-btn--icon c-btn--sm c-btn--on-dark" type="button" data-d="fermer" aria-label="Fermer le dossier" title="Fermer le dossier">' + icon('chevron-down', 'c-icon--sm') + '</button>' +
      '</div></div>';
  }

  /* ── Workflow (9 étapes, dates dessous, infobulles Stockée / Anticipé) ── */
  var SOUS = { done: '', special: '', current: 'En cours', warning: 'En cours', danger: 'Bloqué', skipped: '', todo: 'À venir' };
  function workflow(d) {
    return '<div class="c-card"><div class="c-card__body"><ol class="c-wf" aria-label="Avancement du dossier">' + D.workflow(d).map(function (s) {
      var label = s.tip ? '<span class="c-tip c-tip--below" tabindex="0">' + s.label + '<span class="c-tip__bubble" role="tooltip">' + s.tip + '</span></span>' : s.label;
      return '<li class="c-wf__step c-wf__step--' + s.etat + '"><span class="c-wf__node"></span><span class="c-wf__label">' + label + '</span>' +
        '<span class="c-wf__date">' + (s.date || SOUS[s.etat]) + '</span></li>';
    }).join('') + '</ol></div></div>';
  }

  /* ── Bloc Informations générales (US-17, 09) ─────────────── */
  function infos(d) {
    var c = D.client(d), k = D.compagnies[d.compagnie] || {};
    var lien = d.lienClient ? 'Actif jusqu\'au ' + F.date(d.lienClient.expire) + ' · ' + d.lienClient.consultations + ' consultations' : null;
    return carte('Informations générales', kv([
      [d.type === 'Import' ? 'Importateur' : 'Exportateur', esc(c.nom)],
      ['N° IFU', c.ifu],   // À VALIDER : IFU ou NINEA (QUESTIONS-ONCLE §1.1 bis)
      d.bl ? ['BL', d.bl] : d.lta ? ['LTA', d.lta] : ['Booking', d.booking],
      d.mode === 'Aérien' ? ['Vol', d.vol] : ['Conteneur', d.conteneur],
      d.mode === 'Aérien' ? null : ['Navire', d.navire],
      ['Compagnie', k.nom],
      ['ETA', d.eta ? F.date(d.eta) : null],
      ['Date réception', dh(d.reception)],
      ['Déclarant', D.responsable(d).nom],
      ['Incoterm', d.incoterm],
      ['Poids brut', F.poids(d.poids)],
      ['Nombre de colis', F.nombre(d.colis) + ' ' + d.unite],
      ['Marchandise', esc(d.marchandise)],
      d.prixCible ? ['Prix cible', F.montant(d.prixCible) + ' HT'] : null,
      lien ? ['Lien client', lien] : null
    ]));
  }

  /* ── Bloc Documents (US-18) ──────────────────────────────── */
  function documents(d) {
    var cles = D.documentsRequis[d.type].concat(['mandat']);
    var demandeControle = d.controle && d.controle.resultat === 'Info manquante';
    if (d.docs.certificatOrigine || demandeControle) cles.push('certificatOrigine');
    var manquants = 0;
    var lignes = cles.map(function (k) {
      var ok = d.docs[k];
      if (!ok) manquants++;
      var note = !ok && k === 'certificatOrigine' && demandeControle ? ' — demandé par la douane' : '';
      return '<li class="c-doc ' + (ok ? 'c-doc--ok' : 'c-doc--missing') + '"><span class="c-doc__state">' + icon(ok ? 'check' : 'x') + '</span>' +
        '<span class="c-doc__name">' + D.documents[k].libelle + note + '</span>' +
        (ok ? '<span class="c-doc__actions"><button class="c-btn c-btn--icon c-btn--ghost c-btn--sm" type="button" aria-label="Télécharger ' + D.documents[k].libelle + '">' + icon('download', 'c-icon--sm') + '</button></span>' : '') + '</li>';
    }).join('');
    var titre = 'Documents' + (manquants ? ' <span class="c-count c-count--alert" title="' + manquants + ' manquant(s)">' + manquants + '</span>' : '');
    return carte(titre, '<ul class="c-doclist c-doclist--compact">' + lignes + '</ul>');
  }

  /* ── Bloc Déclaration / Contrôle (US-22, 23, 24) ─────────── */
  function controle(d) {
    var c = d.controle;
    var etaLib = d.mode === 'Aérien' ? 'ETA vol ' + d.vol : 'ETA navire ' + (d.navire || '');
    var rows = [
      ['Décl. stockée', d.declStockee ? '<span class="c-tip c-tip--below" tabindex="0">' + dh(d.declStockee) + '<span class="c-tip__bubble"><b>Déclaration stockée</b><br>le ' + F.date(d.declStockee) + ' à ' + F.heure(d.declStockee) + '</span></span>' : null],
      ['Décl. anticipée', d.declAnticipee ? '<span class="c-tip c-tip--below" tabindex="0">' + dh(d.declAnticipee) + '<span class="c-tip__bubble"><b>Déclaration anticipée</b><br>' + etaLib + ' : ' + F.date(d.eta) + '</span></span>' : null],
      ['Type de contrôle', c ? '<span class="c-ctrl c-ctrl--' + (c.type === 'Aucun' ? 'success' : (D.statuts.resultat[c.resultat] || 'neutral')) + '"><span class="c-ctrl__type">' + (c.type === 'Aucun' ? 'Aucun contrôle' : c.type) + '</span></span>' : 'Non renseigné']
    ];
    if (c && c.type !== 'Aucun') {
      rows.push(['Notification', c.notification ? F.date(c.notification) : null], ['Date contrôle', c.date ? F.date(c.date) : null],
        ['Fin contrôle', c.fin ? F.date(c.fin) : null], ['Inspecteur', c.inspecteur], ['Résultat', B('resultat', c.resultat)],
        ['Commentaire', c.commentaire ? esc(c.commentaire) : null]);
    }
    var encart = '';
    if (c && c.resultat === 'Info manquante') {
      /* US-24 : la demande part automatiquement au client (X08) */
      encart = '<div class="c-alert c-alert--danger u-mt-3">' + icon('alert') +
        '<div><div class="c-alert__title">Demande envoyée au client le ' + F.date(c.demandeEnvoyee) + ' à ' + F.heure(c.demandeEnvoyee) + '</div>' +
        '<div>' + esc(c.commentaire) + ' <a href="../externe/X08-email-demande-information.html?id=' + d.id + '">Voir l\'email</a></div></div></div>';
    }
    return carte('Déclaration / Contrôle', kv(rows) + encart);
  }

  /* ── Blocs BAE et BAS (US-25, 26, 34) ────────────────────── */
  function ctrlTermine(d) { return !d.controle || d.controle.type === 'Aucun' || d.controle.resultat === 'Conforme'; }
  function bae(d) {
    var corps = kv([['N° BAE', d.bae ? d.bae.num : null], ['Date BAE', d.bae ? F.date(d.bae.date) : null],
      ['Statut', B('bon', d.bae ? 'Obtenu' : 'En attente')]]);
    var pied = '';
    if (!d.bae) {
      var ok = d.declAnticipee && ctrlTermine(d);   // À VALIDER : BAE saisissable sans contrôle renseigné
      pied = '<button class="c-btn c-btn--primary c-btn--sm" type="button" data-d="bae"' + (ok ? '' : ' disabled') + '>' + icon('check', 'c-icon--sm') + 'BAE obtenu</button>';
      if (!ok) corps += '<p class="c-field__help u-mt-3">' + (d.declAnticipee ? 'Disponible quand le contrôle douane est terminé.' : 'Disponible après la déclaration anticipée.') + '</p>';
    }
    return carte('BAE', corps, '', pied);
  }
  function bas(d) {
    var corps = kv([['N° BAS', d.bas ? d.bas.num : null], ['Date BAS', d.bas ? F.date(d.bas.date) : null],
      ['Statut', B('bon', d.bas ? 'Obtenu' : 'En attente')]]);
    var pied = '';
    if (d.bas && d.statut === 'BAS obtenu') {
      corps += '<div class="c-alert c-alert--warning u-mt-3">' + icon('facture') +
        '<div><div class="c-alert__title">Le BAS déclenche la facturation</div><div>Le service facturation a été notifié ; le dossier passe en facturation.</div></div></div>';
    } else if (!d.bas) {
      if (d.bae) corps += '<div class="c-alert c-alert--warning u-mt-3">' + icon('facture') +
        '<div><div class="c-alert__title">Valider le BAS déclenche la facturation</div></div></div>';
      pied = '<button class="c-btn c-btn--primary c-btn--sm" type="button" data-d="bas"' + (d.bae ? '' : ' disabled') + '>' + icon('check', 'c-icon--sm') + 'BAS obtenu</button>';
      if (!d.bae) corps += '<p class="c-field__help u-mt-3">Disponible après le BAE.</p>';
    }
    return carte('BAS', corps, '', pied);
  }

  /* ── Messagerie dossier (US-20, 21) ──────────────────────── */
  var CAT = { entrant: ['info', 'inbox', 'Reçu'], sortant: ['success', 'send', 'Envoyé'], auto: ['special', 'mail', 'Automatique'], logistique: ['warning', 'ship', 'Logistique'] };
  function messages(d) {
    if (!D.messages[d.id]) {
      /* Dossiers sans fil détaillé : accusé de réception (toujours envoyé, CDC §3) + demande d'information éventuelle */
      var m = [{ id: 'a', date: d.reception, categorie: 'entrant', de: D.client(d).email, objet: 'Envoi des documents — ' + d.marchandise },
               { id: 'b', date: d.reception, categorie: 'auto', de: D.config.boiteEmail, objet: '[' + d.id + '] Accusé de réception de votre envoi' }];
      if (d.controle && d.controle.demandeEnvoyee) m.push({ id: 'c', date: d.controle.demandeEnvoyee, categorie: 'auto', de: D.config.boiteEmail, objet: '[' + d.id + '] Information demandée par la douane' });
      D.messages[d.id] = m;
    }
    return D.messages[d.id].slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }
  function adresse(de) { var m = /<([^>]+)>/.exec(de); return m ? m[1] : de; }
  function msgItem(m) {
    var c = CAT[m.categorie] || CAT.auto;
    return '<li class="c-msg c-msg--' + c[0] + '"><span class="c-msg__icon" title="' + c[2] + '">' + icon(c[1]) + '</span>' +
      '<span class="c-msg__from">' + esc(adresse(m.de)) + '</span><span class="c-msg__date">' + dh(m.date) + '</span>' +
      '<span class="c-msg__text">' + esc(m.objet) + (m.pj && m.pj.length ? ' · ' + icon('paperclip', 'c-icon--sm') + m.pj.length : '') + '</span></li>';
  }
  function messagerie(d) {
    var tous = messages(d);
    return carte('Messagerie dossier', '<ul class="c-msglist">' + tous.slice(0, 4).map(msgItem).join('') + '</ul>',
      '<button class="c-btn c-btn--sm" type="button" data-d="message">' + icon('plus', 'c-icon--sm') + 'Nouveau message</button>',
      '<button class="c-btn c-btn--ghost c-btn--sm" type="button" data-d="messages">Voir tous les messages (' + tous.length + ')</button>');
  }

  /* ── Transport (US-28 à 33) ───────────────────────────────── */
  function transport(d) {
    var t = d.transport, ot = t && t.ot ? D.ots[t.ot] : null;
    if (!t) {
      var txt = d.bae ? 'Aucun ordre de transport pour ce dossier.' : 'L\'ordre de transport pourra être créé après le BAE.';
      return carte('Transport', '<p class="u-muted">' + txt + '</p>', '',
        d.bae ? '<a class="c-btn c-btn--sm" href="E04-creation-ot.html?id=' + d.id + '">' + icon('plus', 'c-icon--sm') + 'Créer OT</a>' : '');
    }
    if (t.statut === 'Pas de livraison') return carte('Transport', kv([['Statut', B('transport', t.statut)]]) + '<p class="u-muted u-mt-3">Pas de livraison demandée : la marchandise est enlevée par le client.</p>');
    var rows = [['Ordre de transport', '<span class="c-ref">' + t.ot + '</span>'], ['Statut', B('transport', t.statut)]];
    if (t.transporteur) rows.push(['Transporteur', D.transporteurs[t.transporteur].nom]);
    if (t.transporteurs) rows.push(['Sollicités', t.transporteurs.map(function (x) { return D.transporteurs[x].nom; }).join(', ') + ' · en attente de réponse']);
    if (ot && ot.camion) rows.push(['Camion', ot.camion.immatriculation], ['Chauffeur', ot.camion.chauffeur + ' · ' + ot.camion.tel]);
    if (ot) rows.push(['Prise en charge', dh(ot.priseEnCharge)], ['Livraison à', esc(ot.livraisonAdresse)]);
    if (d.livraison) rows.push(['Livré le', F.date(d.livraison)]);
    return carte('Transport', kv(rows));
  }
  var FRISE = [['Demande de transport envoyée', 'OT envoyé'], ['Confirmé', 'Accepté'], ['Camion affecté', 'Camion affecté'], ['Chargement', 'Chargement'], ['En route', 'En route'], ['Livré', 'Livraison']];
  function suiviTransport(d) {
    var t = d.transport;
    if (!t || t.statut === 'Pas de livraison') {
      return carte('Suivi transport', '<p class="u-muted">' + (t ? 'Sans objet : pas de livraison pour ce dossier.' : 'Le suivi démarre à l\'envoi de l\'ordre de transport.') + '</p>');
    }
    var ot = D.ots[t.ot], dates = {};
    if (ot) ot.suivi.forEach(function (s) { dates[s.statut] = s.date; });
    if (d.livraison) dates['Livré'] = d.livraison;
    /* Étapes atteintes = terminées ; Chargement et En route restent « en cours » tant que le camion roule.
       « À confirmer » : OT envoyé, réponse du transporteur attendue → « Accepté » en attente. */
    var aConfirmer = t.statut === 'À confirmer';
    var cur = D.ordreTransport.indexOf(aConfirmer ? 'Demande de transport envoyée' : t.statut);
    var roule = t.statut === 'Chargement' || t.statut === 'En route';
    var etapes = FRISE.map(function (f) {
      var i = D.ordreTransport.indexOf(f[0]), etat;
      if (i < cur || (i === cur && !roule)) etat = 'done';
      else if (i === cur && roule) etat = 'current';
      else if (aConfirmer && f[0] === 'Confirmé') etat = 'current';
      else etat = 'todo';
      var date = dates[f[0]] ? F.dateCourte(dates[f[0]]) : (etat === 'current' ? (aConfirmer ? 'En attente' : 'En cours') : (etat === 'todo' ? 'À venir' : ''));
      return '<li class="c-wf__step c-wf__step--' + etat + '"><span class="c-wf__node"></span><span class="c-wf__label">' + f[1] + '</span><span class="c-wf__date">' + date + '</span></li>';
    });
    return carte('Suivi transport', '<ol class="c-wf" aria-label="Suivi du transport">' + etapes.join('') + '</ol>');
  }

  /* ── Notifications du dossier (US-46) ─────────────────────── */
  var NOTIF = { 'BAS obtenu → basculement facturation': 'special', 'Contrôle douane programmé ou en cours': 'warning', 'Confirmation transporteur reçue': 'success',
    'Documents complémentaires requis': 'danger', 'Modification de déclaration en attente': 'info', 'Facture en attente de règlement': 'info' };
  function notifications(d) {
    var n = D.notifications.filter(function (x) { return x.dossier === d.id; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var corps = n.length ? '<ul class="c-msglist c-msglist--wrap">' + n.slice(0, 4).map(function (x) {
      return '<li class="c-msg c-msg--' + (NOTIF[x.type] || 'info') + (x.lue ? '' : ' is-unread') + '"><span class="c-msg__icon">' + icon('bell') + '</span>' +
        '<span class="c-msg__from">' + esc(x.type) + '</span><span class="c-msg__date">' + dh(x.date) + '</span><span class="c-msg__text">' + esc(x.texte) + '</span></li>';
    }).join('') + '</ul>' : '<p class="u-muted">Aucune notification pour ce dossier.</p>';
    return carte('Notifications', corps, '<a class="c-btn c-btn--ghost c-btn--sm" href="E08-notifications.html">Voir toutes</a>');
  }

  /* ── Historique (E02d, US-47) ─────────────────────────────── */
  function journal(d) {
    if (D.historique[d.id]) return D.historique[d.id];
    var r = D.responsable(d).nom, c = D.client(d), j = [];
    j.push({ date: d.reception, acteur: 'Système', type: 'creation', texte: 'Dossier créé à partir de l’email de ' + c.email + '. Type : ' + d.type + '.' });
    j.push({ date: d.reception, acteur: 'Système', type: 'email', texte: 'Accusé de réception envoyé au client.' });
    if (d.salleAttente) d.salleAttente.relances.forEach(function (x, i) {
      j.push({ date: x, acteur: 'Système', type: 'email', texte: (i ? 'Relance n° ' + (i + 1) + ' : ' : 'Documents manquants signalés au client : ') + D.documentsManquants(d).map(function (k) { return D.documents[k].libelle; }).join(', ') + '.' });
    });
    if (d.declStockee) j.push({ date: d.declStockee, acteur: r, type: 'statut', texte: 'Déclaration stockée saisie. Statut : Déclaration stockée.' });
    if (d.declAnticipee) j.push({ date: d.declAnticipee, acteur: r, type: 'statut', texte: 'Déclaration anticipée. Statut : Déclaration anticipée.' });
    var ct = d.controle;
    if (ct && ct.type !== 'Aucun') {
      j.push({ date: ct.notification, acteur: r, type: 'statut', texte: 'Contrôle ' + ct.type.toLowerCase() + ' notifié par la douane (inspecteur ' + ct.inspecteur + ').' });
      if (ct.fin) j.push({ date: ct.fin, acteur: r, type: 'statut', texte: 'Résultat du contrôle : ' + ct.resultat + '.' });
      if (ct.demandeEnvoyee) j.push({ date: ct.demandeEnvoyee, acteur: 'Système', type: 'email', texte: 'Information demandée au client : ' + ct.commentaire });
    }
    if (d.bae) j.push({ date: d.bae.date, acteur: r, type: 'statut', texte: 'BAE ' + d.bae.num + ' obtenu.' });
    if (d.transport && d.transport.ot && D.ots[d.transport.ot]) j.push({ date: D.ots[d.transport.ot].cree, acteur: D.equipe[D.ots[d.transport.ot].par].nom, type: 'transport', texte: 'Ordre de transport ' + d.transport.ot + ' créé.' });
    if (d.bas) j.push({ date: d.bas.date, acteur: r, type: 'statut', texte: 'BAS ' + d.bas.num + ' obtenu. Basculement en facturation.' });
    if (d.livraison) j.push({ date: d.livraison, acteur: 'Transporteur (lien)', type: 'lien', texte: 'Livraison confirmée.' });
    if (d.facture && d.facture.emise) j.push({ date: d.facture.emise, acteur: D.equipe.u5.nom, type: 'statut', texte: 'Facture ' + d.facture.num + ' émise.' });
    D.historique[d.id] = j.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    return D.historique[d.id];
  }
  var ICO = { creation: 'dossiers', statut: 'valide', email: 'mail', lien: 'link', transport: 'transport', assignation: 'user' };
  function ouvrirHistorique() {
    var d = D.dossier(ouvert), j = journal(d).slice().reverse();
    $('dossier-drawer-titre').textContent = 'Historique — ' + d.id;
    $('dossier-drawer-corps').innerHTML = '<p class="c-field__help u-mb-4">' + j.length + ' événements, du plus récent au plus ancien. Les consultations des liens client et transporteur y figurent.</p>' +
      '<ol class="c-timeline">' + j.map(function (h) {
        return '<li class="c-timeline__item"><span class="c-timeline__icon">' + icon(ICO[h.type] || 'info') + '</span><div><div class="c-timeline__time">' + dh(h.date) + '</div>' +
          '<div class="c-timeline__text">' + esc(h.texte) + '</div><div class="c-timeline__actor">' + esc(h.acteur) + '</div></div></li>';
      }).join('') + '</ol>';
    $('dossier-drawer').classList.add('is-open');
  }
  function ouvrirMessages() {
    var d = D.dossier(ouvert), m = messages(d);
    $('dossier-drawer-titre').textContent = 'Messagerie — ' + d.id;
    $('dossier-drawer-corps').innerHTML = '<ul class="c-msglist c-msglist--wrap">' + m.map(msgItem).join('') + '</ul>';
    $('dossier-drawer').classList.add('is-open');
  }

  /* ── Rendu du panneau ─────────────────────────────────────── */
  function rendre() {
    var d = D.dossier(ouvert);
    $('dossier').innerHTML = bandeau(d) +
      '<div class="c-panel__body">' +
        '<div class="c-alert c-alert--info" id="dossier-msg" role="status" hidden>' + icon('info') + '<div id="dossier-msg-texte"></div></div>' +
        workflow(d) +
        '<div class="c-dgrid c-dgrid--row1">' + infos(d) + documents(d) + controle(d) + '<div class="c-dgrid__stack">' + bae(d) + bas(d) + '</div>' + messagerie(d) + '</div>' +
        '<div class="c-dgrid c-dgrid--row2">' + transport(d) + suiviTransport(d) + notifications(d) + '</div>' +
        '<div class="c-panel__foot"><button class="c-btn c-btn--ghost c-btn--sm" type="button" data-d="historique">' + icon('clock', 'c-icon--sm') +
          'Historique du dossier (' + journal(d).length + ' événements)</button></div>' +
      '</div>';
    $('dossier').setAttribute('aria-labelledby', 'dossier-titre');
  }

  function ouvrir(id) {
    if (!D.dossier(id)) return;
    monter();
    ouvert = id;
    rendre();
    var p = $('dossier');
    /* Cascade d'apparition des blocs : seulement à l'ouverture, pas quand on met à jour le dossier (BAE, BAS, message) */
    p.classList.add('is-entering');
    clearTimeout(p._entree);
    p._entree = setTimeout(function () { p.classList.remove('is-entering'); }, 1400);
    p.classList.add('is-open');
    document.body.classList.add('has-panel-open');
    signaler(D.dossier(id));
  }
  function fermer() {
    ouvert = null;
    $('dossier').classList.remove('is-open', 'is-entering');
    $('dossier-drawer').classList.remove('is-open');
    document.body.classList.remove('has-panel-open');
    signaler(null);
  }
  function info(texte) { $('dossier-msg-texte').textContent = texte; $('dossier-msg').hidden = false; }

  /* ── Modale : BAE, BAS, nouveau message ───────────────────── */
  function modale(action) {
    var d = D.dossier(ouvert), auj = aujourdhui().slice(0, 10);
    enAttente = action;
    var titre, corps, ok;
    if (action === 'bae') {
      titre = 'Valider le BAE ?'; ok = 'Valider le BAE';
      corps = '<p>Le dossier <b class="c-ref">' + d.id + '</b> passera au statut <b>BAE obtenu</b>. Le client verra l\'étape validée sur son lien de suivi.</p>' +
        '<div class="c-field"><label class="c-field__label" for="m-num">N° de BAE <span class="is-required">*</span></label><input class="c-input u-num" id="m-num" value="2026-BAE-049316"></div>' +
        '<div class="c-field"><label class="c-field__label" for="m-date">Date du BAE</label><input class="c-input" id="m-date" type="date" value="' + auj + '"><span class="c-field__help">Date du jour par défaut, modifiable.</span></div>';
    } else if (action === 'bas') {
      titre = 'Valider le BAS ?'; ok = 'Valider le BAS';
      corps = '<div class="c-alert c-alert--warning">' + icon('facture') + '<div><div class="c-alert__title">Le BAS déclenche la facturation</div>' +
        '<div>Le dossier <b class="c-ref">' + d.id + '</b> passera automatiquement en facturation et le service facturation sera notifié.</div></div></div>' +
        '<div class="c-field"><label class="c-field__label" for="m-num">N° de BAS <span class="is-required">*</span></label><input class="c-input u-num" id="m-num" value="2026-BAS-052780"></div>' +
        '<div class="c-field"><label class="c-field__label" for="m-date">Date du BAS</label><input class="c-input" id="m-date" type="date" value="' + auj + '"><span class="c-field__help">Date du jour par défaut, modifiable.</span></div>';
    } else {
      titre = 'Nouveau message'; ok = 'Envoyer';
      corps = '<div class="c-field"><label class="c-field__label" for="m-a">À</label><input class="c-input" id="m-a" value="' + esc(D.client(d).email) + '"></div>' +
        '<div class="c-field"><label class="c-field__label" for="m-objet">Objet</label><input class="c-input" id="m-objet" value="[' + d.id + '] "><span class="c-field__help">Le N° de dossier en objet permet de rattacher la réponse automatiquement.</span></div>' +
        '<div class="c-field"><label class="c-field__label" for="m-corps">Message</label><textarea class="c-textarea" id="m-corps">Madame, Monsieur,\n\n</textarea></div>' +
        '<button class="c-btn c-btn--ghost c-btn--sm u-self-start" type="button">' + icon('paperclip', 'c-icon--sm') + 'Joindre un document du dossier</button>';
    }
    $('dossier-modale-titre').textContent = titre;
    $('dossier-modale-corps').innerHTML = corps;
    $('dossier-modale-ok').textContent = ok;
    $('dossier-modale').hidden = false;
    var f = $('dossier-modale-corps').querySelector('input'); if (f) f.focus();
  }
  function valider() {
    var d = D.dossier(ouvert), u = utilisateur(), now = aujourdhui();
    if (enAttente === 'bae' || enAttente === 'bas') {
      var num = $('m-num').value.trim(), date = $('m-date').value;
      if (!num) { $('m-num').closest('.c-field').classList.add('is-error'); return; }
      journal(d);
      if (enAttente === 'bae') {
        d.bae = { num: num, date: date }; d.statut = 'BAE obtenu';
        D.historique[d.id].push({ date: now, acteur: u.nom, type: 'statut', texte: 'BAE ' + num + ' obtenu. Statut : BAE obtenu.' });
      } else {
        /* C2 : « BAS obtenu » bascule aussitôt en facturation */
        d.bas = { num: num, date: date }; d.statut = 'En facturation'; d.facture = { num: null, statut: 'En facturation' };
        D.historique[d.id].push({ date: now, acteur: u.nom, type: 'statut', texte: 'BAS ' + num + ' obtenu. Basculement automatique en facturation.' });
      }
    } else {
      messages(d);
      D.messages[d.id].push({ id: 'n' + Date.now(), date: now, categorie: 'sortant', de: u.nom + ' <' + D.config.boiteEmail + '>', a: $('m-a').value, objet: $('m-objet').value, corps: $('m-corps').value, pj: [] });
    }
    $('dossier-modale').hidden = true;
    var action = enAttente;
    rendre(); signaler(d);
    info(action === 'bae' ? 'BAE enregistré. Le statut du dossier est passé à « BAE obtenu ».' :
         action === 'bas' ? 'BAS enregistré. Le dossier est passé en facturation ; le service facturation est notifié.' :
         'Message envoyé au client et ajouté à la messagerie du dossier.');
  }

  /* ── Événements ───────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-d]');
    var menu = $('dossier-menu');
    if (menu && !menu.hidden && !e.target.closest('.c-menu-wrap')) { menu.hidden = true; }
    if (!t) return;
    var a = t.dataset.d;
    if (a === 'menu') { menu.hidden = !menu.hidden; t.setAttribute('aria-expanded', !menu.hidden); return; }
    if (menu) menu.hidden = true;
    if (a === 'fermer') fermer();
    if (a === 'historique') ouvrirHistorique();
    if (a === 'messages') ouvrirMessages();
    if (a === 'drawer-fermer') $('dossier-drawer').classList.remove('is-open');
    if (a === 'message' || a === 'bae' || a === 'bas') modale(a);
    if (a === 'modale-fermer') $('dossier-modale').hidden = true;
    if (a === 'modale-valider') valider();
    if (a === 'pdf') info('Export PDF du dossier — prévu dans une prochaine version.');   // D13
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !ouvert) return;
    if (!$('dossier-modale').hidden) $('dossier-modale').hidden = true;
    else if ($('dossier-drawer').classList.contains('is-open')) $('dossier-drawer').classList.remove('is-open');
    else fermer();
  });

  if (document.body) monter(); else document.addEventListener('DOMContentLoaded', monter);
  window.DOUALOG_DOSSIER = { ouvrir: ouvrir, fermer: fermer, ouvert: function () { return ouvert; } };
})();
