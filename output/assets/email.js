/* ══════════════════════════════════════════════════════════════
   DOUALOG — Remplissage des maquettes d'emails (X01, X02, X09) depuis data.js
   Les emails sont du HTML d'email classique (600 px, tableaux, styles en ligne) : les couleurs y sont
   écrites en dur car les messageries ne lisent pas les variables CSS. Elles reprennent tokens.css.
   Le dossier affiché : ?id=DLG-… sinon data-defaut sur <body>. Variante relance : ?relance=n (X02).
   Champs : [data-f="…"] (texte), [data-href="…"] (lien), [data-liste="…"] (lignes), [data-si="…"] (bloc conditionnel).
   ══════════════════════════════════════════════════════════════ */
(function () {
  var D = window.DOUALOG, F = D.fmt, esc = D.esc;
  var C = { navy: '#0C2C5E', texte: '#374151', gris: '#6B7280', bord: '#E5E7EB', fond: '#F3F4F6', vert: '#23683A', vertFond: '#E0ECE3', rouge: '#B23327', rougeFond: '#F3E0DF' };

  function remplir() {
    var p = new URLSearchParams(location.search);
    var d = D.dossier(p.get('id') || document.body.dataset.defaut), c = D.client(d);
    var relance = parseInt(p.get('relance') || '0', 10);
    var sa = d.salleAttente, envois = sa ? sa.envois : [];
    var refT = d.bl ? 'BL ' + d.bl : d.lta ? 'LTA ' + d.lta : d.booking ? 'Booking ' + d.booking : '';
    var transportLib = d.mode === 'Aérien' ? 'Vol ' + d.vol : 'Navire ' + d.navire;
    var expire = d.lienClient ? d.lienClient.expire : new Date(new Date(d.reception).getTime() + D.config.dureeLienClientJours * 864e5).toISOString().slice(0, 10);
    function dh(iso) { return F.date(iso) + ' à ' + F.heure(iso); }

    var v = {
      id: d.id, client: c.nom, contact: c.contact, emailClient: c.email, ifu: c.ifu,
      boite: D.config.boiteEmail, ville: D.config.ville, pays: D.config.pays,
      reception: dh(d.reception), receptionDate: F.date(d.reception),
      refTransport: [refT, transportLib, d.eta ? 'ETA ' + F.date(d.eta) : ''].filter(Boolean).join(' · '),
      marchandise: d.marchandise, duree: D.config.dureeLienClientJours, expire: F.date(expire),
      frequence: D.config.frequenceRelanceJours,
      envoiAR: dh(((D.messages[d.id] || []).filter(function (m) { return m.categorie === 'auto' && /Accusé/.test(m.objet); })[0] || { date: d.reception }).date),
      envoiInitial: envois[0] ? dh(envois[0]) : '', envoiInitialDate: envois[0] ? F.date(envois[0]) : '',
      envoiRelance: envois[relance] ? dh(envois[relance]) : '', relanceN: relance,
      prochaine: sa ? F.date(sa.prochaineRelance) : '',
      mandatDemande: sa && sa.mandatDemande ? dh(sa.mandatDemande) : dh(d.reception),
      nbRecus: 0, nbManquants: 0
    };

    /* Pièces reçues : pièces jointes de l'email du client si on les a, sinon documents présents */
    var entrant = (D.messages[d.id] || []).filter(function (m) { return m.categorie === 'entrant' && m.pj && m.pj.length; })[0];
    var recus = entrant ? entrant.pj : Object.keys(D.documents).filter(function (k) { return d.docs[k]; }).map(function (k) { return D.documents[k].libelle; });
    var manquants = D.documentsManquants(d).filter(function (k) { return k !== 'mandat'; }).map(function (k) { return D.documents[k].libelle; });
    v.nbRecus = recus.length; v.nbManquants = manquants.length;

    function ligne(texte, ok) {
      return '<tr><td width="28" valign="top" style="padding:7px 0;font-size:14px;line-height:20px;color:' + (ok ? C.vert : C.rouge) + ';font-weight:700;">' + (ok ? '&#10003;' : '&#10007;') + '</td>' +
        '<td style="padding:7px 0;font-size:14px;line-height:20px;color:' + (ok ? C.texte : C.rouge) + ';' + (ok ? '' : 'font-weight:600;') + 'border-bottom:1px solid ' + C.bord + ';">' + esc(texte) + '</td></tr>';
    }
    var listes = { recus: recus.map(function (x) { return ligne(x, true); }).join(''), manquants: manquants.map(function (x) { return ligne(x, false); }).join('') };

    var liens = {
      perso: 'X04-lien-client.html?id=' + d.id,
      depot: 'X04-lien-client.html?id=' + d.id + '&action=depot',
      mandat: 'X04-lien-client.html?id=' + d.id + '&action=mandat',
      suivi: 'X03-suivi-public.html',
      mailto: 'mailto:' + D.config.boiteEmail + '?subject=' + encodeURIComponent('[' + d.id + '] ')
    };
    var conditions = { relance: relance > 0, initial: relance === 0, incomplet: manquants.length > 0 || !d.docs.mandat, complet: manquants.length === 0 && d.docs.mandat };

    document.querySelectorAll('[data-f]').forEach(function (el) { el.textContent = v[el.dataset.f]; });
    document.querySelectorAll('[data-href]').forEach(function (el) { el.setAttribute('href', liens[el.dataset.href]); });
    document.querySelectorAll('[data-liste]').forEach(function (el) { el.innerHTML = listes[el.dataset.liste]; });
    document.querySelectorAll('[data-si]').forEach(function (el) { if (!conditions[el.dataset.si]) el.parentNode.removeChild(el); });
    document.title = document.querySelector('[data-objet]').textContent.trim() + ' — maquette email';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', remplir); else remplir();
})();
