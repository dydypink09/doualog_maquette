/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Jeu de données commun des maquettes
   Validé à l'étape 0 (cadrage/etape-0-cadrage.md §4). Toutes les données sont fictives.
   Un même dossier a le même client, BL, statut sur tous les écrans : ne jamais dupliquer
   ces valeurs dans une page, toujours les lire ici.
   ══════════════════════════════════════════════════════════════ */
(function () {

  /* ── Configuration pays — périmètre France : Le Havre, Roissy CDG, euros ─── */
  var config = {
    aujourdhui: '2026-10-16T10:15',      // vendredi 16/10/2026 — date fictive de la démo
    pays: 'France',
    ville: 'Le Havre',
    port: 'Port du Havre',
    aeroport: 'Aéroport Paris-Charles-de-Gaulle (Roissy)',
    devise: '€',
    tva: 0.20,                           // taux normal en France — À VALIDER pour les prestations DOUALOG
    boiteEmail: 'dossiers@doualog.fr',   // À VALIDER — adresse de la boîte surveillée
    dureeLienClientJours: 30,            // À VALIDER (D11)
    frequenceRelanceJours: 2,            // À VALIDER (D11)
    delaiPaiementJours: 30,              // À VALIDER — échéance des factures
    tvaLibelle: 'TVA 20 %',              // À VALIDER — taux appliqué aux prestations (débours hors TVA)
    /* Paramètres (E14) — tous À VALIDER (QUESTIONS-ONCLE.md) */
    maxRelances: 5,                      // relances automatiques de documents, ensuite le déclarant reprend la main
    delaiReponseTransporteurHeures: 24,  // au-delà, l'offre est signalée sans réponse au service transport
    alerteMandatJours: 30,               // alerte avant la fin d'un mandat (E12)
    relancePaiementJours: 7,             // relance de paiement : 7 jours après l'échéance, puis tous les 7 jours
    numeroFacture: 'FAC-{AAAA}-{NNNN}',
    /* Coordonnées FICTIVES pour la démo (factures, mandat, emails) — À VALIDER : vraies mentions légales de DOUALOG */
    societe: { nom: 'DOUALOG — Douane & Logistique', siret: '914 237 586 00012', rcs: 'RCS Le Havre 914 237 586', tvaIntra: 'FR62 914237586', eori: 'FR91423758600012',
      adresse: '18 quai de Southampton, 76600 Le Havre', telephone: '+33 2 35 19 42 60', iban: 'FR76 9999 9001 2300 0451 3017 228', bic: 'BPNMFR21XXX', banque: 'Banque Portuaire de Normandie' },
    signatureEmail: "L'équipe DOUALOG — Douane & Logistique\nLe Havre, France · dossiers@doualog.fr\nConnecter • Sécuriser • Livrer",
    reglesEmail: { rattachementDLG: true, propositionClientBL: true, creationAutoPJ: true }
  };

  /* ── Équipe DOUALOG (CDC §02) ─────────────────────────────── */
  var roles = [
    { id: 'declarant',   label: 'Déclarant douane' },
    { id: 'operateur',   label: 'Opérateur transit' },
    { id: 'transport',   label: 'Service transport' },
    { id: 'facturation', label: 'Service facturation' },
    { id: 'manager',     label: 'Manager' },
    { id: 'direction',   label: 'Direction' }
  ];

  var equipe = {
    u1: { nom: 'Awa Ndiaye',        initiales: 'AN', role: 'declarant',   email: 'a.ndiaye@doualog.fr',  statut: 'actif',  derniere: '2026-10-16T08:02' },
    u2: { nom: 'Mamadou Ba',        initiales: 'MB', role: 'declarant',   email: 'm.ba@doualog.fr',      statut: 'actif',  derniere: '2026-10-16T08:11' },
    u3: { nom: 'Moussa Diagne',     initiales: 'MD', role: 'operateur',   email: 'm.diagne@doualog.fr',  statut: 'actif',  derniere: '2026-10-16T07:54' },
    u4: { nom: 'Seydou Camara',     initiales: 'SC', role: 'transport',   email: 's.camara@doualog.fr',  statut: 'actif',  derniere: '2026-10-16T07:31' },
    u5: { nom: 'Rokhaya Diop',      initiales: 'RD', role: 'facturation', email: 'r.diop@doualog.fr',    statut: 'actif',  derniere: '2026-10-15T17:48' },
    u6: { nom: 'Babacar Gaye',      initiales: 'BG', role: 'manager',     email: 'b.gaye@doualog.fr',    statut: 'actif',  derniere: '2026-10-16T09:20' },
    u7: { nom: 'Aïda Mbengue',      initiales: 'AM', role: 'direction',   email: 'a.mbengue@doualog.fr', statut: 'actif',  derniere: '2026-10-14T18:05' },
    u8: { nom: 'Léa Martin',        initiales: 'LM', role: 'declarant',   email: 'l.martin@doualog.fr',  statut: 'invite', derniere: null, invite: '2026-10-14T11:30' }   // invitée, pas encore connectée (E14)
  };

  /* ── Clients (base centralisée, CDC §11.4) ─────────────────
     siret : identifiant de l'entreprise (facture) ; eori : numéro EORI (douane). Le CDC parle de « N° IFU » — À VALIDER.
     mandat.signe / jusquau : dates de signature et de fin du mandat de représentation en douane.
     autres : contacts secondaires (fiche client E10).
     mandat (E12) : num, signe / jusquau (dates), mode « en ligne » (lien personnel + code de confirmation, D6) ou « papier » (scan déposé),
       signataire, fonction, signeLe (date et heure), emailConfirmation ou deposePar ; demande en cours { date, dossier, motif, relances } ;
       historique explicite, sinon reconstitué par historiqueMandat(). c13 : ancien client, mandat expiré, aucun dossier en 2026.
     À VALIDER : durée d'un mandat (1 an), alerte 30 jours avant l'échéance, un mandat par client, signature papier acceptée (QUESTIONS-ONCLE.md). */
  var clients = {
    c01: { nom: 'Agrofertil Normandie', sigle: 'AFN', siret: '512 304 718 00027', eori: 'FR51230471800027', adresse: '12 rue de l’Industrie, ZI du Grand-Quevilly', cp: '76120', ville: 'Le Grand-Quevilly', contact: 'Claire Dubois', fonction: 'Responsable achats', email: 'c.dubois@agrofertil.fr', tel: '+33 2 35 68 41 90', mandat: { valide: true, num: 'MDT-2026-001', signe: '2026-01-05', jusquau: '2026-12-31', mode: 'en ligne', signataire: 'Pierre Lambert', fonction: 'Directeur financier', signeLe: '2026-01-05T10:44', emailConfirmation: 'p.lambert@agrofertil.fr',
        historique: [
          { date: '2025-12-15T09:02', type: 'demande', acteur: 'Système', texte: 'Demande de renouvellement envoyée à c.dubois@agrofertil.fr, avec le modèle de mandat DOUALOG et le lien de signature.' },
          { date: '2025-12-17T09:02', type: 'relance', acteur: 'Système', texte: 'Relance automatique envoyée à c.dubois@agrofertil.fr.' },
          { date: '2026-01-05T10:31', type: 'ouverture', acteur: 'Client (lien personnel)', texte: 'Lien de signature ouvert.' },
          { date: '2026-01-05T10:42', type: 'code', acteur: 'Système', texte: 'Code de confirmation à 6 chiffres envoyé à p.lambert@agrofertil.fr.' },
          { date: '2026-01-05T10:44', type: 'signature', acteur: 'Pierre Lambert (lien personnel)', texte: 'Code confirmé. Mandat MDT-2026-001 signé en ligne par Pierre Lambert, Directeur financier. Valide du 05/01/2026 au 31/12/2026.' }
        ] },
      autres: [{ nom: 'Pierre Lambert', fonction: 'Directeur financier', email: 'p.lambert@agrofertil.fr', tel: '+33 2 35 68 41 10' }] },
    c02: { nom: 'Normapharm Distribution', sigle: 'NPD', siret: '438 915 260 00034', eori: 'FR43891526000034', adresse: '5 avenue du Maréchal-Foch', cp: '27000', ville: 'Évreux', contact: 'Thomas Mercier', fonction: 'Responsable logistique', email: 'logistique@normapharm.fr', tel: '+33 6 08 33 61 42', mandat: { valide: true, num: 'MDT-2026-006', signe: '2026-04-01', jusquau: '2027-03-31', mode: 'en ligne', signataire: 'Hélène Mercier', fonction: 'Directrice générale', signeLe: '2026-04-01T11:18', emailConfirmation: 'logistique@normapharm.fr' },
      autres: [{ nom: 'Sophie Bernard', fonction: 'Comptabilité fournisseurs', email: 'compta@normapharm.fr', tel: '+33 2 32 21 67 02' }] },
    c03: { nom: 'Bâtiment et Travaux de l’Estuaire', sigle: 'BTE', siret: '391 627 845 00019', eori: 'FR39162784500019', adresse: '48 route d’Oudalle', cp: '76700', ville: 'Harfleur', contact: 'Laurent Petit', fonction: 'Chef du service achats', email: 'achats@bt-estuaire.fr', tel: '+33 6 29 01 45 57', mandat: { valide: true, num: 'MDT-2026-003', signe: '2026-01-16', jusquau: '2027-01-15', mode: 'papier', signataire: 'Bernard Petit', fonction: 'Gérant', signeLe: '2026-01-19T15:20', deposePar: 'Moussa Diagne', fichier: 'Mandat_signe_BTE.pdf' } },
    c04: { nom: 'Maison Textile Duval', siret: '804 511 932 00012', eori: 'FR80451193200012', adresse: '22 rue de la Martinière', cp: '69001', ville: 'Lyon', contact: 'Isabelle Duval', fonction: 'Gérante', email: 'export@textile-duval.fr', tel: '+33 6 91 40 23 78', mandat: { valide: true, num: 'MDT-2025-021', signe: '2025-11-10', jusquau: '2026-11-09', mode: 'en ligne', signataire: 'Isabelle Duval', fonction: 'Gérante', signeLe: '2025-11-10T16:05', emailConfirmation: 'export@textile-duval.fr',
        demande: { date: '2026-10-09T09:00', dossier: 'DLG-2026-0403', motif: 'renouvellement', relances: ['2026-10-14T09:00'] } } },
    c05: { nom: 'Brasserie de la Côte d’Albâtre', siret: '527 840 113 00025', eori: 'FR52784011300025', adresse: '3 quai de la Vicomté', cp: '76400', ville: 'Fécamp', contact: 'Nicolas Lefèvre', fonction: 'Responsable approvisionnement', email: 'appro@brasserie-albatre.fr', tel: '+33 6 12 24 60 93', mandat: { valide: true, num: 'MDT-2026-009', signe: '2026-07-01', jusquau: '2027-06-30', mode: 'en ligne', signataire: 'Nicolas Lefèvre', fonction: 'Responsable approvisionnement', signeLe: '2026-07-01T14:37', emailConfirmation: 'appro@brasserie-albatre.fr' } },
    c06: { nom: 'Électro Plus Distribution', siret: '450 276 381 00048', eori: 'FR45027638100048', adresse: '17 avenue du Port', cp: '92230', ville: 'Gennevilliers', contact: 'Karim Haddad', fonction: 'Responsable import', email: 'import@electroplus.fr', tel: '+33 6 38 75 52 04', mandat: { valide: true, num: 'MDT-2025-020', signe: '2025-11-06', jusquau: '2026-11-05', mode: 'papier', signataire: 'Philippe Garnier', fonction: 'Président', signeLe: '2025-11-07T10:12', deposePar: 'Mamadou Ba', fichier: 'Mandat_signe_Electro_Plus.pdf' } },
    c07: { nom: 'Coopérative Lin de Normandie', sigle: 'CLN', siret: '783 096 254 00016', eori: 'FR78309625400016', adresse: '9 route de Caudebec', cp: '76190', ville: 'Yvetot', contact: 'Hugo Lemaire', fonction: 'Directeur export', email: 'export@lin-normandie.fr', tel: '+33 6 65 08 14 39', mandat: { valide: true, num: 'MDT-2026-002', signe: '2026-01-02', jusquau: '2026-12-31', mode: 'en ligne', signataire: 'Hugo Lemaire', fonction: 'Directeur export', signeLe: '2026-01-02T09:51', emailConfirmation: 'export@lin-normandie.fr' } },
    c08: { nom: 'Malteries de la Seine Export', sigle: 'MSE', siret: '612 058 497 00031', eori: 'FR61205849700031', adresse: 'Quai de Saint-Gervais, entrepôt 12', cp: '76000', ville: 'Rouen', contact: 'Émilie Fontaine', fonction: 'Responsable des opérations', email: 'operations@malteries-seine.fr', tel: '+33 6 43 39 01 68', mandat: { valide: true, num: 'MDT-2026-008', signe: '2026-05-01', jusquau: '2027-04-30', mode: 'en ligne', signataire: 'Émilie Fontaine', fonction: 'Responsable des opérations', signeLe: '2026-05-01T08:46', emailConfirmation: 'operations@malteries-seine.fr' } },
    c09: { nom: 'Éts Moreau & Fils', siret: '330 145 672 00010', eori: 'FR33014567200010', adresse: '64 rue Lafayette', cp: '76100', ville: 'Rouen', contact: 'Patrick Moreau', fonction: 'Gérant', email: 'contact@moreau-fils.fr', tel: '+33 6 24 57 18 86', mandat: { valide: true, num: 'MDT-2026-004', signe: '2026-01-08', jusquau: '2026-12-31', mode: 'papier', signataire: 'Patrick Moreau', fonction: 'Gérant', signeLe: '2026-01-12T15:20', deposePar: 'Moussa Diagne', fichier: 'Mandat_signe_Moreau_et_Fils.pdf',
        historique: [
          { date: '2026-01-06T09:00', type: 'demande', acteur: 'Système', texte: 'Demande de mandat envoyée à contact@moreau-fils.fr, avec le modèle de mandat DOUALOG et le lien de signature.' },
          { date: '2026-01-07T11:24', type: 'reception', acteur: 'Patrick Moreau', texte: 'Le client préfère signer sur papier : « je vous renvoie le mandat signé par courrier ».' },
          { date: '2026-01-12T09:40', type: 'reception', acteur: 'Moussa Diagne', texte: 'Original papier signé le 08/01/2026 reçu par courrier.' },
          { date: '2026-01-12T15:20', type: 'depot', acteur: 'Moussa Diagne', texte: 'Scan du mandat papier déposé (Mandat_signe_Moreau_et_Fils.pdf). Validité saisie : du 08/01/2026 au 31/12/2026.' }
        ] } },
    c10: { nom: 'Medilab Équipements', siret: '849 652 187 00023', eori: 'FR84965218700023', adresse: '7 rue Félix-Faure', cp: '14000', ville: 'Caen', contact: 'Camille Roussel', fonction: 'Responsable des commandes', email: 'commandes@medilab-equipements.fr', tel: '+33 6 51 80 97 46', mandat: { valide: true, num: 'MDT-2026-007', signe: '2026-06-01', jusquau: '2027-05-31', mode: 'en ligne', signataire: 'Camille Roussel', fonction: 'Responsable des commandes', signeLe: '2026-06-01T16:22', emailConfirmation: 'commandes@medilab-equipements.fr' } },
    c11: { nom: 'Cidrerie du Pays d’Auge', siret: '903 194 561 00014', eori: 'FR90319456100014', adresse: '2 chemin des Pressoirs', cp: '14130', ville: 'Pont-l’Évêque', contact: 'Antoine Leclerc', fonction: 'Directeur commercial', email: 'export@cidrerie-paysdauge.fr', tel: '+33 6 90 26 31 57', mandat: { valide: false, signe: null, jusquau: null,
        demande: { date: '2026-10-15T10:03', dossier: 'DLG-2026-0427', motif: 'premier', relances: [] },
        historique: [
          { date: '2026-10-15T10:03', type: 'recherche', acteur: 'Système', texte: 'Dossier DLG-2026-0427 créé : aucun mandat trouvé pour Cidrerie du Pays d’Auge.' },
          { date: '2026-10-15T10:03', type: 'demande', acteur: 'Système', texte: 'Demande de mandat envoyée à export@cidrerie-paysdauge.fr, avec le modèle de mandat DOUALOG et le lien de signature du dossier DLG-2026-0427.' },
          { date: '2026-10-15T16:48', type: 'ouverture', acteur: 'Client (lien personnel)', texte: 'Lien de signature ouvert. Mandat pas encore signé.' }
        ] } },
    c12: { nom: 'Pièces Auto du Havre', siret: '518 263 409 00011', eori: 'FR51826340900011', adresse: '135 boulevard de Graville', cp: '76600', ville: 'Le Havre', contact: 'Sébastien Caron', fonction: 'Gérant', email: 'contact@piecesauto-lehavre.fr', tel: '+33 6 16 04 83 25', mandat: { valide: true, num: 'MDT-2026-005', signe: '2026-02-01', jusquau: '2027-01-31', mode: 'papier', signataire: 'Sébastien Caron', fonction: 'Gérant', signeLe: '2026-02-02T11:05', deposePar: 'Awa Ndiaye', fichier: 'Mandat_signe_Pieces_Auto.pdf' } },
    c13: { nom: 'Verrerie de la Bresle', siret: '423 581 096 00018', eori: 'FR42358109600018', adresse: 'Route de Foucarmont', cp: '76340', ville: 'Blangy-sur-Bresle', contact: 'Marc Lenoir', fonction: 'Directeur général', email: 'm.lenoir@verrerie-bresle.fr', tel: '+33 2 35 93 52 41', mandat: { valide: true, num: 'MDT-2025-019', signe: '2025-10-01', jusquau: '2026-09-30', mode: 'en ligne', signataire: 'Marc Lenoir', fonction: 'Directeur général', signeLe: '2025-10-01T10:02', emailConfirmation: 'm.lenoir@verrerie-bresle.fr' } }
  };

  /* Prix convenus par client pour les prestations habituelles (€ HT) — À VALIDER (QUESTIONS-ONCLE.md, tarifs).
     Base commune, puis écarts négociés par client (honoraires de transit surtout). */
  var tarifsBase = { p01: 45, p02: 95, p03: 180, p04: 90, p05: null, p06: null };
  var tarifsClients = {
    c01: { p03: 210, p06: 480 }, c02: { p03: 165, p06: 320 }, c03: { p03: 230, p06: 560 },
    c04: { p03: 150, p06: 180 }, c05: { p03: 180, p06: 420 }, c06: { p03: 200, p06: 450 },
    c07: { p03: 190, p06: 380 }, c08: { p03: 185 }, c09: { p03: 140 }, c10: { p03: 165 },
    c11: { p03: 175 }, c12: { p03: 150, p06: 290 }
  };

  /* ── Annuaire transporteurs (US-27 — champs minimaux, D15 À VALIDER) ── */
  var transporteurs = {
    t1: { nom: 'Normandie Fret Express',     contact: 'Franck Delaunay',  email: 'exploitation@normandie-fret.fr',  tel: '+33 6 12 40 87 31' },
    t2: { nom: 'Atlantique Fret Logistique', contact: 'Serge Morin',      email: 'fret@atlantique-fret.fr',         tel: '+33 6 45 52 10 37' },
    t3: { nom: 'Transports Vallée de Seine', contact: 'Olivier Simon',    email: 'contact@tvs-transports.fr',       tel: '+33 6 60 87 41 92' },
    t4: { nom: 'Transports Marchand Logistique', contact: 'Éric Marchand', email: 'exploitation@tml-transports.fr', tel: '+33 6 53 36 02 84' },
    t5: { nom: 'Rapid Cargo Services',       contact: 'Céline Robin',     email: 'ops@rapidcargo.fr',               tel: '+33 1 48 62 92 05' },
    t6: { nom: 'Camions du Port',            contact: 'Alain Bertrand',   email: 'dispatch@camionsduport.fr',       tel: '+33 2 35 28 13 66' }
  };

  /* ── Répertoire des compagnies (US-17) — adresses À VALIDER ── */
  var compagnies = {
    k1: { nom: 'MSC',               mode: 'Maritime', email: 'import.export@msc-agence.fr' },
    k2: { nom: 'Maersk',            mode: 'Maritime', email: 'documentation@maersk-agence.fr' },
    k3: { nom: 'CMA CGM',           mode: 'Maritime', email: 'agence@cmacgm-agence.fr' },
    k4: { nom: 'Grimaldi',          mode: 'Maritime', email: 'booking@grimaldi-agence.fr' },
    k5: { nom: 'Air France Cargo',  mode: 'Aérien',   email: 'fret@afcargo-agence.fr' },
    k6: { nom: 'Emirates SkyCargo', mode: 'Aérien',   email: 'cargo@skycargo-agence.fr' }
  };

  /* ── Prestations facturables — liste proposée, À VALIDER (QUESTIONS-ONCLE.md §1.4) ── */
  var prestations = {
    p01: { libelle: 'Ouverture et suivi du dossier',                 tva: true  },
    p02: { libelle: 'Établissement de la déclaration en douane',     tva: true  },
    p03: { libelle: 'Honoraires de transit',                          tva: true  },
    p04: { libelle: 'Assistance à la visite douanière',               tva: true  },
    p05: { libelle: 'Frais de magasinage',                            tva: true  },
    p06: { libelle: "Transport routier jusqu'au site client",        tva: true  },
    p07: { libelle: 'Débours — droits et taxes de douane',           tva: false },
    p08: { libelle: 'Débours — frais portuaires et manutention',     tva: false }
  };

  /* ── Référentiels de statuts → teinte (charte §07, 6 teintes) ── */
  var statuts = {
    dossier: {
      'En attente de documents':        'warning',
      'En cours de traitement':         'info',
      'Déclaration stockée':            'info',
      'Déclaration anticipée':          'special',
      'Contrôle physique en cours':     'warning',
      'Contrôle documentaire en cours': 'warning',
      'Info manquante':                 'danger',
      'BAE obtenu':                     'success',
      'BAS obtenu':                     'success',
      'En facturation':                 'special',
      'Facturé':                        'success',
      'Livré':                          'success',
      'Clôturé':                        'neutral'
    },
    transport: {
      'Demande de transport envoyée': 'info',
      'À confirmer':                  'warning',
      'Confirmé':                     'info',
      'Camion affecté':               'info',
      'Chargement':                   'info',
      'En route':                     'info',
      'Livré':                        'success',
      'Pas de livraison':             'neutral'
    },
    facture: {                         // couleurs D3 — À VALIDER
      'En facturation':      'special',
      'Facture émise':       'info',
      'Partiellement réglé': 'warning',
      'Réglé':               'success'
    },
    controle: { 'Aucun': 'neutral', 'Physique': 'warning', 'Documentaire': 'warning' },
    resultat: { 'En cours': 'warning', 'Conforme': 'success', 'Non conforme': 'danger', 'Info manquante': 'danger' },
    bon:      { 'En attente': 'warning', 'Obtenu': 'success' },
    type:     { 'Import': 'info', 'Export': 'warning' }
  };

  var ordreTransport = ['Demande de transport envoyée', 'À confirmer', 'Confirmé', 'Camion affecté', 'Chargement', 'En route', 'Livré'];

  /* ── Documents (CDC §3.2 + §7.2 + D9 : bon de livraison ajouté) ── */
  var documents = {
    facture:           { libelle: 'Facture commerciale' },
    packing:           { libelle: 'Packing list' },
    instruction:       { libelle: 'Instruction douane' },
    bl:                { libelle: 'BL / LTA' },
    bonLivraison:      { libelle: 'Bon de livraison' },
    mandat:            { libelle: 'Mandat' },
    certificatOrigine: { libelle: "Certificat d'origine" }
  };
  /* Documents de transport déposés par le transporteur sur son lien (US-33) */
  var documentsTransport = {
    blSigne: { libelle: 'Bon de livraison signé' },
    cmr:     { libelle: 'Lettre de voiture (CMR)' },
    photos:  { libelle: 'Photos de la livraison' }
  };
  var documentsRequis = {
    Import: ['facture', 'packing', 'instruction', 'bl', 'bonLivraison'],
    Export: ['facture', 'packing', 'instruction']
  };

  /* Raccourci : tous les documents présents */
  function docs(over) {
    var d = { facture: true, packing: true, instruction: true, bl: true, bonLivraison: true, mandat: true, certificatOrigine: false };
    for (var k in over) d[k] = over[k];
    return d;
  }

  /* ── Dossiers ──────────────────────────────────────────────── */
  var dossiers = [
    /* Ancien dossier de Maison Textile Duval (c04) : facture émise le 01/09, échue le 01/10 et toujours impayée — exemple de facture en retard (E06, E09, E10).
       Une relance de paiement envoyée le 08/10 (7 jours après l'échéance, config.relancePaiementJours). */
    {
      id: 'DLG-2026-0384', type: 'Export', mode: 'Aérien', client: 'c04', statut: 'Facturé',
      reception: '2026-08-24T14:10', responsable: 'u2',
      booking: 'AF-BK-761905', lta: '057-48177214', vol: 'AF 0779', compagnie: 'k5', eta: '2026-08-28',
      incoterm: 'FCA', poids: 860, colis: 26, unite: 'colis', marchandise: 'Tissus de lin teints',
      docs: docs({ bonLivraison: false }),
      declStockee: '2026-08-25T09:30', declAnticipee: '2026-08-26T15:05',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-044390', date: '2026-08-27' }, bas: { num: '2026-BAS-047962', date: '2026-08-28' },
      transport: { statut: 'Livré', ot: 'OT-2026-0119', transporteur: 't5' }, livraison: '2026-08-31',
      facture: { num: 'FAC-2026-0172', statut: 'Facture émise', montant: 724, emise: '2026-09-01', echeance: '2026-10-01', regle: 0, paiements: [],
        relances: ['2026-10-08T09:00'] }
    },
    /* Ancien dossier d'Agrofertil Normandie (c01), réglé : historique de facturation de sa fiche client (E10) */
    {
      id: 'DLG-2026-0389', type: 'Import', mode: 'Maritime', client: 'c01', statut: 'Clôturé',
      reception: '2026-09-07T10:05', responsable: 'u1',
      bl: 'MEDULH468817', conteneur: 'MSCU 3982214-6', typeConteneur: "40'", navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-09-09',
      incoterm: 'CIF', poids: 25000, colis: 500, unite: 'sacs', marchandise: 'Urée granulée 46 % en sacs de 50 kg',
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-09-08T09:40', declAnticipee: '2026-09-09T15:12',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-045812', date: '2026-09-11' }, bas: { num: '2026-BAS-049377', date: '2026-09-14' },
      transport: { statut: 'Livré', ot: 'OT-2026-0128', transporteur: 't1' }, livraison: '2026-09-15',
      facture: { num: 'FAC-2026-0178', statut: 'Réglé', montant: 4658.2, emise: '2026-09-17', echeance: '2026-10-17', regle: 4658.2, dateReglement: '2026-10-02',
        paiements: [{ date: '2026-10-02', montant: 4658.2, mode: 'Virement bancaire' }] }
    },
    {
      id: 'DLG-2026-0398', type: 'Import', mode: 'Maritime', client: 'c05', statut: 'Clôturé',
      reception: '2026-09-22T08:47', responsable: 'u2',
      bl: 'MEDULH471530', conteneur: 'MSCU 7718302-4', navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-09-24',
      incoterm: 'CIF', poids: 18640, colis: 1120, unite: 'cartons', marchandise: 'Bouteilles en verre vides',
      docs: docs({}),
      declStockee: '2026-09-23T09:10', declAnticipee: '2026-09-24T11:25',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-046901', date: '2026-09-26' }, bas: { num: '2026-BAS-050118', date: '2026-09-28' },
      transport: { statut: 'Livré', ot: 'OT-2026-0141', transporteur: 't4' }, livraison: '2026-09-30',
      facture: { num: 'FAC-2026-0187', statut: 'Réglé', montant: 4935, emise: '2026-10-01', echeance: '2026-10-31', regle: 4935, dateReglement: '2026-10-12',
        paiements: [{ date: '2026-10-12', montant: 4935, mode: 'Virement bancaire' }] }
    },
    {
      id: 'DLG-2026-0401', type: 'Import', mode: 'Maritime', client: 'c03', statut: 'Facturé',
      reception: '2026-09-23T10:12', responsable: 'u1',
      bl: 'MAEU238104771', conteneur: 'MRKU 4410927-3', navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-09-27',
      incoterm: 'CFR', poids: 26300, colis: 64, unite: 'bottes', marchandise: 'Fers à béton HA12',
      docs: docs({}),
      declStockee: '2026-09-24T14:02', declAnticipee: '2026-09-26T10:48',
      controle: { type: 'Documentaire', notification: '2026-09-29', date: '2026-09-30', fin: '2026-09-30', inspecteur: 'A. Leroy', resultat: 'Conforme', commentaire: 'Concordance facture / déclaration vérifiée.' },
      bae: { num: '2026-BAE-047352', date: '2026-10-02' }, bas: { num: '2026-BAS-050644', date: '2026-10-05' },
      transport: { statut: 'Chargement', ot: 'OT-2026-0150', transporteur: 't3' }, livraison: null,
      facture: { num: 'FAC-2026-0191', statut: 'Partiellement réglé', montant: 7335.2, emise: '2026-10-07', echeance: '2026-11-06', regle: 3000, dateReglement: '2026-10-14',
        paiements: [{ date: '2026-10-14', montant: 3000, mode: 'Virement bancaire' }] }
    },
    {
      id: 'DLG-2026-0402', type: 'Export', mode: 'Maritime', client: 'c07', statut: 'Facturé',
      reception: '2026-09-24T09:05', responsable: 'u2',
      booking: 'GRI-26-AB4471', bl: 'GRILH2609117', conteneur: 'GRIU 3305281-0', navire: 'Grande Europa', compagnie: 'k4', eta: '2026-09-30',
      incoterm: 'FOB', poids: 21900, colis: 438, unite: 'sacs', marchandise: 'Graines de lin',
      docs: docs({ bonLivraison: false }),
      declStockee: '2026-09-25T15:20', declAnticipee: '2026-09-28T09:40',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-047018', date: '2026-09-30' }, bas: { num: '2026-BAS-050402', date: '2026-10-02' },
      transport: { statut: 'Livré', ot: 'OT-2026-0147', transporteur: 't6' }, livraison: '2026-10-06',
      facture: { num: 'FAC-2026-0193', statut: 'Facture émise', montant: 4519, emise: '2026-10-09', echeance: '2026-11-08', regle: 0 }
    },
    {
      id: 'DLG-2026-0403', type: 'Export', mode: 'Aérien', client: 'c04', statut: 'Livré',
      reception: '2026-09-25T15:30', responsable: 'u1',
      booking: 'AF-BK-778120', lta: '057-48213960', vol: 'AF 0781', compagnie: 'k5', eta: '2026-09-29',
      incoterm: 'FCA', poids: 1240, colis: 38, unite: 'colis', marchandise: 'Tissus de soie imprimés',
      docs: docs({ bonLivraison: false }),
      declStockee: '2026-09-26T10:05', declAnticipee: '2026-09-28T16:30',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-047120', date: '2026-09-29' }, bas: { num: '2026-BAS-050471', date: '2026-09-30' },
      transport: { statut: 'Livré', ot: 'OT-2026-0148', transporteur: 't5' }, livraison: '2026-10-01',
      facture: null   // BAS validé, facture pas encore émise → statut global « Livré » (C2)
    },
    {
      id: 'DLG-2026-0405', type: 'Import', mode: 'Aérien', client: 'c10', statut: 'En facturation',
      reception: '2026-09-26T11:05', responsable: 'u1',
      lta: '176-30028815', vol: 'EK 0073', compagnie: 'k6', eta: '2026-09-30',
      incoterm: 'CPT', poids: 412, colis: 9, unite: 'colis', marchandise: 'Équipements de laboratoire (centrifugeuses)',
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-09-29T09:45', declAnticipee: '2026-09-30T08:10',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-047488', date: '2026-10-05' }, bas: { num: '2026-BAS-050897', date: '2026-10-07' },
      transport: { statut: 'Pas de livraison' }, livraison: null,
      facture: { num: null, statut: 'En facturation' }
    },
    {
      id: 'DLG-2026-0407', type: 'Import', mode: 'Maritime', client: 'c06', statut: 'BAS obtenu',
      reception: '2026-09-27T14:22', responsable: 'u2',
      bl: 'CMDULHR2208741', conteneur: 'CMAU 5530174-8', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-02',
      incoterm: 'FOB', poids: 9870, colis: 412, unite: 'cartons', marchandise: 'Climatiseurs split',
      docs: docs({}),
      declStockee: '2026-09-29T16:12', declAnticipee: '2026-10-01T10:30',
      controle: { type: 'Physique', notification: '2026-10-06', date: '2026-10-08', fin: '2026-10-09', inspecteur: 'O. Martin', resultat: 'Conforme', commentaire: 'Comptage de 40 cartons sur 412, conforme au packing list.' },
      bae: { num: '2026-BAE-048596', date: '2026-10-13' }, bas: { num: '2026-BAS-052614', date: '2026-10-16' },
      transport: { statut: 'Camion affecté', ot: 'OT-2026-0158', transporteur: 't2' }, livraison: null,
      facture: null   // BAS saisi à 09:58 : basculement en facturation en cours (statut transitoire, C2)
    },
    {
      id: 'DLG-2026-0410', type: 'Import', mode: 'Maritime', client: 'c02', statut: 'BAE obtenu',
      reception: '2026-09-28T09:40', responsable: 'u2',
      bl: 'MEDULH476822', conteneur: 'MSDU 2290413-5', navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-10-05',
      incoterm: 'CIP', poids: 7420, colis: 22, unite: 'palettes', marchandise: 'Médicaments génériques',
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-09-30T11:15', declAnticipee: '2026-10-02T14:50',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-048877', date: '2026-10-14' }, bas: null,
      transport: null, livraison: null,   // BAE obtenu le 14/10, ordre de transport à créer (exemple de E04)
      facture: null
    },
    /* ★ Dossier fil rouge de la démo */
    {
      id: 'DLG-2026-0412', filRouge: true, type: 'Import', mode: 'Maritime', client: 'c01', statut: 'En facturation',
      reception: '2026-09-29T09:14', responsable: 'u1',
      bl: 'MEDULH482093', conteneur: 'MSCU 4120936-2', typeConteneur: "40'", navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-10-05',
      incoterm: 'CIF', poids: 24600, colis: 492, unite: 'sacs', marchandise: 'Engrais NPK 15-15-15 en sacs de 50 kg',
      prestationsDemandees: ['p01', 'p02', 'p03', 'p06'], prixCible: 1000,
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-10-01T10:32', declAnticipee: '2026-10-03T16:05',
      controle: { type: 'Physique', notification: '2026-10-06', date: '2026-10-07', fin: '2026-10-08', inspecteur: 'M. Girard', resultat: 'Conforme', commentaire: 'Vérification du poids et du marquage des sacs : conforme au manifeste.' },
      bae: { num: '2026-BAE-048213', date: '2026-10-09' }, bas: { num: '2026-BAS-051907', date: '2026-10-12' },
      transport: { statut: 'En route', ot: 'OT-2026-0156', transporteur: 't1' }, livraison: null,
      facture: { num: null, statut: 'En facturation' },
      lienClient: { cree: '2026-09-29T09:15', expire: '2026-10-29', actif: true, consultations: 3 }
    },
    {
      id: 'DLG-2026-0413', type: 'Export', mode: 'Maritime', client: 'c08', statut: 'BAE obtenu',
      reception: '2026-09-30T08:58', responsable: 'u2',
      booking: 'MSC-BK-26118402', conteneur: 'MEDU 6031187-4', navire: 'MSC Bianca', compagnie: 'k1', eta: '2026-10-20',
      incoterm: 'FOB', poids: 19200, colis: 384, unite: 'sacs', marchandise: 'Malt d’orge en sacs de 50 kg',
      docs: docs({ bl: false, bonLivraison: false, certificatOrigine: true }),
      declStockee: '2026-10-02T10:20', declAnticipee: '2026-10-07T15:35',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-048990', date: '2026-10-15' }, bas: null,
      transport: { statut: 'À confirmer', ot: 'OT-2026-0161', transporteurs: ['t3', 't6'] }, livraison: null,
      facture: null
    },
    {
      id: 'DLG-2026-0415', type: 'Import', mode: 'Maritime', client: 'c12', statut: 'Contrôle physique en cours',
      reception: '2026-10-01T13:37', responsable: 'u1',
      bl: 'CMDULHR2211906', conteneur: 'CMAU 8817265-1', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-09',
      incoterm: 'CFR', poids: 6230, colis: 186, unite: 'colis', marchandise: 'Pièces détachées automobiles',
      docs: docs({}),
      declStockee: '2026-10-05T09:50', declAnticipee: '2026-10-07T11:05',
      controle: { type: 'Physique', notification: '2026-10-14', date: '2026-10-16', fin: null, inspecteur: 'M. Girard', resultat: 'En cours', commentaire: 'Visite programmée au terminal à 14:00.' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0416', type: 'Import', mode: 'Maritime', client: 'c03', statut: 'Info manquante',
      reception: '2026-10-02T10:20', responsable: 'u2',
      bl: 'MAEU238559024', conteneur: 'MSKU 9902314-6', navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-10-10',
      incoterm: 'CIF', poids: 21450, colis: 1430, unite: 'cartons', marchandise: 'Carreaux céramique',
      docs: docs({ certificatOrigine: false }),
      declStockee: '2026-10-06T14:25', declAnticipee: '2026-10-09T09:15',
      controle: { type: 'Documentaire', notification: '2026-10-12', date: '2026-10-13', fin: null, inspecteur: 'A. Leroy', resultat: 'Info manquante', commentaire: "Certificat d'origine requis pour appliquer le tarif préférentiel.", demandeEnvoyee: '2026-10-13T15:22' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0417', type: 'Export', mode: 'Aérien', client: 'c02', statut: 'Contrôle documentaire en cours',
      reception: '2026-10-03T09:48', responsable: 'u1',
      booking: 'EK-BK-552094', lta: '176-30041276', vol: 'EK 0075', compagnie: 'k6', eta: '2026-10-19',
      incoterm: 'CPT', poids: 845, colis: 31, unite: 'colis', marchandise: 'Produits pharmaceutiques (réexpédition)',
      docs: docs({ bl: false, bonLivraison: false, certificatOrigine: true }),
      declStockee: '2026-10-08T10:40', declAnticipee: '2026-10-12T15:10',
      controle: { type: 'Documentaire', notification: '2026-10-15', date: '2026-10-16', fin: null, inspecteur: 'F. Lemoine', resultat: 'En cours', commentaire: '' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0419', type: 'Import', mode: 'Maritime', client: 'c06', statut: 'Contrôle physique en cours',
      reception: '2026-10-05T11:02', responsable: 'u2',
      bl: 'CMDULHR2213358', conteneur: 'CMAU 6624011-9', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-11',
      incoterm: 'FOB', poids: 8115, colis: 640, unite: 'cartons', marchandise: 'Téléviseurs LED et accessoires',
      docs: docs({}),
      declStockee: '2026-10-07T16:05', declAnticipee: '2026-10-10T10:20',
      controle: { type: 'Physique', notification: '2026-10-15', date: '2026-10-16', fin: null, inspecteur: 'P. Roux', resultat: 'En cours', commentaire: 'Dépotage partiel en cours au terminal.' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0420', type: 'Import', mode: 'Maritime', client: 'c09', statut: 'Déclaration anticipée',
      reception: '2026-10-06T08:30', responsable: 'u1',
      bl: 'MEDULH490155', conteneur: 'MSCU 5502871-3', navire: 'MSC Bianca', compagnie: 'k1', eta: '2026-10-19',
      incoterm: 'CFR', poids: 27000, colis: 1080, unite: 'sacs', marchandise: 'Riz basmati en sacs de 25 kg',
      docs: docs({}),
      declStockee: '2026-10-08T11:30', declAnticipee: '2026-10-13T09:05',
      controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0421', type: 'Export', mode: 'Maritime', client: 'c07', statut: 'Déclaration anticipée',
      reception: '2026-10-07T14:15', responsable: 'u2',
      booking: 'GRI-26-AB4730', conteneur: 'GRIU 3307742-8', navire: 'Grande Amburgo', compagnie: 'k4', eta: '2026-10-20',
      incoterm: 'FOB', poids: 22680, colis: 104, unite: 'balles', marchandise: 'Lin teillé en balles',
      docs: docs({ bl: false, bonLivraison: false, certificatOrigine: true }),
      declStockee: '2026-10-09T10:10', declAnticipee: '2026-10-14T14:40',
      controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0423', type: 'Import', mode: 'Aérien', client: 'c10', statut: 'Déclaration stockée',
      reception: '2026-10-09T16:44', responsable: 'u1',
      lta: '057-48231772', vol: 'AF 0784', compagnie: 'k5', eta: '2026-10-18',
      incoterm: 'CPT', poids: 286, colis: 14, unite: 'colis', marchandise: 'Consommables médicaux',
      docs: docs({}),
      declStockee: '2026-10-14T10:55', declAnticipee: null,
      controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0424', type: 'Import', mode: 'Maritime', client: 'c01', statut: 'En cours de traitement',
      reception: '2026-10-13T11:47', responsable: 'u2',
      bl: 'MEDULH493308', conteneur: 'MSCU 4135520-7', navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-10-26',
      incoterm: 'CIF', poids: 12400, colis: 496, unite: 'sacs', marchandise: 'Semences de maïs certifiées',
      docs: docs({ certificatOrigine: true }),
      declStockee: null, declAnticipee: null,
      controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    /* Salle d'attente — dossiers incomplets.
       salleAttente.envois : 1er = demande initiale des pièces (X02), suivants = relances n°1, n°2… (US-06) */
    {
      id: 'DLG-2026-0426', type: 'Import', mode: 'Maritime', client: 'c05', statut: 'En attente de documents',
      reception: '2026-10-12T08:15', responsable: 'u2',
      bl: null, conteneur: null, navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-10-28',
      incoterm: 'CIF', poids: 3900, colis: 260, unite: 'cartons', marchandise: 'Capsules et étiquettes',
      docs: docs({ bl: false, bonLivraison: false }),
      salleAttente: { envois: ['2026-10-12T08:16', '2026-10-14T08:16', '2026-10-16T08:16'], prochaineRelance: '2026-10-18T08:16' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0427', type: 'Export', mode: 'Maritime', client: 'c11', statut: 'En attente de documents',
      reception: '2026-10-15T10:02', responsable: 'u1',
      booking: 'MAE-BK-26-771904', conteneur: null, navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-10-27',
      incoterm: 'FOB', poids: 14800, colis: 1240, unite: 'cartons', marchandise: 'Cidre et calvados en bouteilles',
      docs: docs({ instruction: false, bl: false, bonLivraison: false, mandat: false }),
      salleAttente: { envois: ['2026-10-15T10:03'], prochaineRelance: '2026-10-17T10:03', mandatDemande: '2026-10-15T10:03' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0428', type: 'Import', mode: 'Aérien', client: 'c09', statut: 'En attente de documents',
      reception: '2026-10-16T08:31', responsable: 'u1',
      lta: '176-30055902', vol: 'EK 0073', compagnie: 'k6', eta: '2026-10-21',
      incoterm: 'CPT', poids: 148, colis: 6, unite: 'colis', marchandise: 'Pièces de rechange pour ligne d’ensachage',
      docs: docs({ packing: false }),
      salleAttente: { envois: ['2026-10-16T08:32'], prochaineRelance: '2026-10-18T08:32' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    }
  ];

  /* Informations sur une pièce (E13) : provenance, date, fichier, versions. Par défaut : pièce jointe de l'email du client.
     Exemple de remplacement (versions, US-19 COULD) : instruction douane du fil rouge précisée par le client. */
  dossiers.filter(function (d) { return d.id === 'DLG-2026-0412'; })[0].docsInfo = {
    instruction: { provenance: 'Email client', date: '2026-10-01T10:05', par: 'Awa Ndiaye', fichier: 'Instruction_douane_AFN_v2.pdf',
      versions: [{ date: '2026-09-29T09:14', fichier: 'Instruction_douane_AFN.pdf', par: 'Claire Dubois (email)' },
                 { date: '2026-10-01T10:05', fichier: 'Instruction_douane_AFN_v2.pdf', par: 'Awa Ndiaye', note: 'régime 4000 précisé par le client' }] }
  };

  /* ── Pièces jointes reçues par email, sans type ni dossier (E13 « À classer ») ──
     À VALIDER (V1 ou V2) : la proposition « type probable / dossier probable » suppose un module IA documentaire (lecture des pièces) ;
     en V1 sans ce module, l'équipe choisit le type et le dossier à la main. */
  var aClasser = [
    { id: 'pj1', fichier: 'PL_88231_scan.pdf', taille: 412, date: '2026-10-16T09:47', de: 'Patrick Moreau <contact@moreau-fils.fr>', objet: 'TR: liste de colisage',
      proposition: { type: 'packing', dossier: 'DLG-2026-0428', raison: 'même client (Éts Moreau & Fils), 6 colis, LTA 176-30055902 dans la pièce' } },
    { id: 'pj2', fichier: 'IMG_20261016_0912.jpg', taille: 2860, date: '2026-10-16T09:12', de: 'Nicolas Lefèvre <appro@brasserie-albatre.fr>', objet: 'Photo document MSC',
      proposition: { type: 'bonLivraison', dossier: 'DLG-2026-0426', raison: 'même client, en-tête MSC, navire MSC Lorena' } },
    { id: 'pj3', fichier: 'Scan_0042.pdf', taille: 238, date: '2026-10-15T17:26', de: 'Laurent Petit <achats@bt-estuaire.fr>', objet: '(sans objet)',
      proposition: { type: 'certificatOrigine', dossier: 'DLG-2026-0416', raison: 'certificat EUR.1 attendu par la douane pour ce client' } }
  ];

  /* ── Ordres de transport ───────────────────────────────────── */
  var ots = {
    'OT-2026-0156': {
      dossier: 'DLG-2026-0412', cree: '2026-10-09T10:58', par: 'u4',
      marchandise: 'Engrais NPK 15-15-15 en sacs de 50 kg', poids: 24600, colis: 492, unite: 'sacs',
      chargement: 'Terminal à conteneurs du Port du Havre, parc n° 2', livraisonAdresse: 'Entrepôt AFN — 12 rue de l’Industrie, 76120 Le Grand-Quevilly',
      priseEnCharge: '2026-10-14T08:00', incoterm: 'CIF',
      instructions: "Conteneur 40' — prévoir un porte-conteneur plateau. Déchargement par l'équipe AFN ; présenter le BAS à l'entrée.",
      offres: [
        { transporteur: 't1', envoi: '2026-10-09T11:20', reponse: 'Acceptée', date: '2026-10-09T14:47' },
        { transporteur: 't2', envoi: '2026-10-09T11:20', reponse: 'Offre clôturée', date: '2026-10-09T14:47' }  // C7 : première acceptation
      ],
      camion: { immatriculation: 'GH-427-BC', chauffeur: 'Didier Faure', tel: '+33 6 94 41 86 20' },
      suivi: [
        { statut: 'Demande de transport envoyée', date: '2026-10-09T11:20' },
        { statut: 'À confirmer',    date: '2026-10-09T11:20' },
        { statut: 'Confirmé',       date: '2026-10-09T14:47' },
        { statut: 'Camion affecté', date: '2026-10-14T09:30' },
        { statut: 'Chargement',     date: '2026-10-15T14:10' },
        { statut: 'En route',       date: '2026-10-16T07:40' }
      ],
      documents: [],   // bon de livraison signé, CMR, photos : attendus à la livraison
      lien: { actif: true, expire: 'à la confirmation de livraison' }
    },
    'OT-2026-0161': {
      dossier: 'DLG-2026-0413', cree: '2026-10-15T15:52', par: 'u4',
      marchandise: 'Malt d’orge en sacs de 50 kg', poids: 19200, colis: 384, unite: 'sacs',
      chargement: 'Malteries de la Seine Export — Quai de Saint-Gervais, entrepôt 12, 76000 Rouen', livraisonAdresse: 'Terminal à conteneurs du Port du Havre — empotage',
      priseEnCharge: '2026-10-19T07:00', incoterm: 'FOB',
      instructions: 'Sacs de 50 kg sur palettes, chargement par chariot. Bâche obligatoire.',
      offres: [
        { transporteur: 't3', envoi: '2026-10-15T16:10', reponse: null },
        { transporteur: 't6', envoi: '2026-10-15T16:10', reponse: null }
      ],
      camion: null, suivi: [ { statut: 'Demande de transport envoyée', date: '2026-10-15T16:10' }, { statut: 'À confirmer', date: '2026-10-15T16:10' } ],
      documents: [], lien: null
    }
  };

  /* ── Grille tarifaire du fil rouge (pré-remplie depuis l'email, US-09) — montants À VALIDER ── */
  var grilles = {
    /* Prix convenus d'Agrofertil Normandie (tarifsClients.c01) : honoraires 210 €, transport 480 € */
    'DLG-2026-0384': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 150 }, { prestation: 'p06', montant: 180 }, { prestation: 'p08', montant: 160 } ],
    'DLG-2026-0389': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 210 }, { prestation: 'p05', montant: 111 }, { prestation: 'p06', montant: 480 }, { prestation: 'p07', montant: 2916 }, { prestation: 'p08', montant: 613 } ],
    'DLG-2026-0398': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 180 }, { prestation: 'p05', montant: 70 }, { prestation: 'p06', montant: 420 }, { prestation: 'p07', montant: 3377 }, { prestation: 'p08', montant: 586 } ],
    'DLG-2026-0401': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 230 }, { prestation: 'p04', montant: 90 }, { prestation: 'p05', montant: 141 }, { prestation: 'p06', montant: 560 }, { prestation: 'p07', montant: 5203 }, { prestation: 'p08', montant: 739 } ],
    'DLG-2026-0402': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 190 }, { prestation: 'p06', montant: 380 }, { prestation: 'p07', montant: 2992 }, { prestation: 'p08', montant: 675 } ],
    'DLG-2026-0403': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 150 }, { prestation: 'p06', montant: 180 }, { prestation: 'p07', montant: 74 }, { prestation: 'p08', montant: 193 } ],
    'DLG-2026-0405': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 165 }, { prestation: 'p05', montant: 59 }, { prestation: 'p07', montant: 1961 }, { prestation: 'p08', montant: 114 } ],
    'DLG-2026-0407': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 200 }, { prestation: 'p04', montant: 90 }, { prestation: 'p05', montant: 134 }, { prestation: 'p06', montant: 450 }, { prestation: 'p07', montant: 4429 }, { prestation: 'p08', montant: 607 } ],
    'DLG-2026-0412': [ { prestation: 'p01', montant: 45 }, { prestation: 'p02', montant: 95 }, { prestation: 'p03', montant: 210 }, { prestation: 'p04', montant: 90 }, { prestation: 'p05', montant: 180 }, { prestation: 'p06', montant: 480 }, { prestation: 'p07', montant: 2815 }, { prestation: 'p08', montant: 629 } ]
  };
  var prochainNumeroFacture = 'FAC-2026-0196';
  var prochainNumeroOT = 'OT-2026-0162';

  var typesNotification = {
    'Contrôle douane programmé ou en cours':  { ton: 'warning', icone: 'controle' },
    'Documents complémentaires requis':       { ton: 'danger',  icone: 'document' },
    'Modification de déclaration en attente': { ton: 'info',    icone: 'edit' },
    'Confirmation transporteur reçue':        { ton: 'success', icone: 'transport' },
    'BAS obtenu → basculement facturation':   { ton: 'special', icone: 'facture' },
    'Facture en attente de règlement':        { ton: 'info',    icone: 'clock' }
  };
  /* ── Notifications internes (CDC §13.1) — la colonne Alertes compte les non lues ── */
  var notifications = [
    { id: 'n01', date: '2026-10-16T09:58', type: 'BAS obtenu → basculement facturation', dossier: 'DLG-2026-0407', lue: false, texte: 'BAS 2026-BAS-052614 saisi par Mamadou Ba. Le dossier passe en facturation.' },
    { id: 'n02', date: '2026-10-16T09:05', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0419', lue: false, texte: 'Contrôle physique en cours au terminal — inspecteur P. Roux.' },
    { id: 'n03', date: '2026-10-15T17:30', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0417', lue: false, texte: 'Contrôle documentaire programmé le 16/10/2026.' },
    { id: 'n04', date: '2026-10-13T16:12', type: 'Confirmation transporteur reçue', dossier: 'DLG-2026-0407', lue: false, texte: "Atlantique Fret Logistique a accepté l'offre OT-2026-0158." },
    { id: 'n05', date: '2026-10-15T15:22', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0416', lue: false, texte: "Pas de réponse du client depuis 48 h sur le certificat d'origine. Relance envoyée." },
    { id: 'n06', date: '2026-10-15T10:04', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0427', lue: false, texte: 'Instruction douane manquante et mandat absent. Client informé.' },
    { id: 'n07', date: '2026-10-14T11:05', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0415', lue: false, texte: 'Contrôle physique notifié — visite le 16/10/2026 à 14:00.' },
    /* À VALIDER (D14) : déclencheur de cette notification non défini dans le CDC */
    { id: 'n08', date: '2026-10-14T09:40', type: 'Modification de déclaration en attente', dossier: 'DLG-2026-0420', lue: false, texte: 'ETA du navire décalée du 17/10 au 19/10 : déclaration anticipée à mettre à jour.' },
    { id: 'n09', date: '2026-10-14T14:20', type: 'Facture en attente de règlement', dossier: 'DLG-2026-0401', lue: true, texte: 'Acompte de 3 000,00 € reçu. Solde de 4 335,20 € attendu avant le 06/11/2026.' },
    { id: 'n10', date: '2026-10-13T15:22', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0416', lue: false, texte: "Contrôle documentaire : certificat d'origine demandé au client (envoi automatique)." },
    { id: 'n11', date: '2026-10-12T16:40', type: 'BAS obtenu → basculement facturation', dossier: 'DLG-2026-0412', lue: true, texte: 'BAS 2026-BAS-051907 saisi par Awa Ndiaye. Le dossier passe en facturation.' },
    { id: 'n12', date: '2026-10-09T15:05', type: 'Facture en attente de règlement', dossier: 'DLG-2026-0402', lue: false, texte: 'Facture FAC-2026-0193 émise. Règlement attendu avant le 08/11/2026.' },
    { id: 'n13', date: '2026-10-09T14:47', type: 'Confirmation transporteur reçue', dossier: 'DLG-2026-0412', lue: true, texte: "Normandie Fret Express a accepté l'offre OT-2026-0156." },
    { id: 'n14', date: '2026-10-06T10:31', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0412', lue: true, texte: 'Contrôle physique notifié — visite le 07/10/2026.' }
  ];

  /* ── Messagerie du fil rouge (CDC §7.6 : entrant, sortant, auto, logistique) ── */
  var messages = {
    'DLG-2026-0412': [
      { id: 'm1', date: '2026-09-29T09:14', categorie: 'entrant', de: 'Claire Dubois <c.dubois@agrofertil.fr>', a: 'dossiers@doualog.fr',
        objet: 'Import engrais NPK — MSC Ilaria — documents',
        corps: "Bonjour,\n\nVeuillez trouver ci-joint les documents de notre import d'engrais NPK, arrivée prévue sur le MSC Ilaria le 05/10.\nPrestations souhaitées : dédouanement complet et livraison à notre entrepôt du Grand-Quevilly.\nPrix cible pour vos prestations : 1 000 € HT.\n\nCordialement,\nClaire Dubois\nResponsable achats — Agrofertil Normandie",
        pj: ['Facture_commerciale_INV-88214.pdf', 'Packing_list_PL-88214.pdf', 'Instruction_douane_AFN.pdf', 'BL_MEDULH482093.pdf', 'Bon_de_livraison_MSC.pdf', 'Certificat_origine_CO-5521.pdf'] },
      { id: 'm2', date: '2026-09-29T09:15', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.fr>', a: 'c.dubois@agrofertil.fr',
        objet: '[DLG-2026-0412] Accusé de réception de votre envoi', corps: 'Accusé de réception — voir X01.', pj: [] },
      { id: 'm3', date: '2026-10-03T08:12', categorie: 'logistique', de: 'MSC — Agence <import.export@msc-agence.fr>', a: 'dossiers@doualog.fr',
        objet: "Avis d'arrivée — MSC Ilaria — BL MEDULH482093", corps: "Arrivée confirmée le 05/10/2026. Conteneur MSCU 4120936-2 (40').", pj: ['Avis_arrivee_MEDULH482093.pdf'] },
      { id: 'm4', date: '2026-10-06T10:40', categorie: 'sortant', de: 'Awa Ndiaye <dossiers@doualog.fr>', a: 'c.dubois@agrofertil.fr',
        objet: '[DLG-2026-0412] Contrôle physique programmé le 07/10',
        corps: "Madame,\n\nLa douane a notifié un contrôle physique de votre conteneur MSCU 4120936-2 le 07/10/2026. Nous y assisterons pour votre compte ; aucune action n'est requise de votre part.\n\nBien cordialement,\nAwa Ndiaye — Déclarante douane", pj: [] },
      { id: 'm5', date: '2026-10-08T17:05', categorie: 'sortant', de: 'Awa Ndiaye <dossiers@doualog.fr>', a: 'c.dubois@agrofertil.fr',
        objet: '[DLG-2026-0412] Contrôle conforme', corps: 'Madame,\n\nLe contrôle physique est terminé et conforme. Nous poursuivons les formalités pour obtenir le bon à enlever.\n\nBien cordialement,\nAwa Ndiaye', pj: [] },
      { id: 'm6', date: '2026-10-09T15:02', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.fr>', a: 'c.dubois@agrofertil.fr',
        objet: '[DLG-2026-0412] Bon à enlever obtenu', corps: 'Mise à jour du suivi de votre dossier.', pj: ['BAE_2026-BAE-048213.pdf'] },
      { id: 'm7', date: '2026-10-12T16:41', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.fr>', a: 'c.dubois@agrofertil.fr',
        objet: '[DLG-2026-0412] Bon à sortir obtenu', corps: 'Mise à jour du suivi de votre dossier.', pj: ['BAS_2026-BAS-051907.pdf'] },
      { id: 'm8', date: '2026-10-16T07:58', categorie: 'entrant', de: 'Claire Dubois <c.dubois@agrofertil.fr>', a: 'dossiers@doualog.fr',
        objet: 'RE: [DLG-2026-0412] Bon à sortir obtenu', corps: "Bonjour,\n\nPouvez-vous nous confirmer l'heure d'arrivée du camion ? Notre équipe de déchargement est disponible jusqu'à 17 h.\n\nMerci,\nC. Dubois", pj: [] },
      { id: 'm9', date: '2026-10-16T08:20', categorie: 'sortant', de: 'Seydou Camara <dossiers@doualog.fr>', a: 'c.dubois@agrofertil.fr',
        objet: 'RE: [DLG-2026-0412] Bon à sortir obtenu', corps: "Madame,\n\nLe camion GH-427-BC a quitté le port du Havre à 07:40. Arrivée prévue à votre entrepôt vers 09:15.\n\nBien cordialement,\nSeydou Camara — Service transport", pj: [] }
    ]
  };


  /* ── Boîte de réception centrale (E11) ─────────────────────────────────────
     À VALIDER : la boîte centrale est une proposition qui étend le CDC §7.6 (messagerie par dossier).
     Une seule source : chaque dossier a son fil (messages ci-dessus, ou fil type généré par messagesDossier) ;
     la boîte E11 et le bloc Messagerie du dossier lisent les mêmes emails. */
  /* Emails entrants récents, rattachés automatiquement par le [DLG-…] de l'objet, pas encore lus */
  var emailsRecents = [
    { id: 'e1', dossier: 'DLG-2026-0416', date: '2026-10-16T09:41', categorie: 'entrant', de: 'Laurent Petit <achats@bt-estuaire.fr>', a: 'dossiers@doualog.fr',
      objet: "RE: [DLG-2026-0416] Certificat d'origine", nonLu: true,
      corps: "Bonjour,\n\nNotre fournisseur nous confirme l'envoi du certificat d'origine EUR.1 original par DHL aujourd'hui. Nous vous transmettons le numéro de suivi dès réception.\n\nCordialement,\nLaurent Petit\nChef du service achats — BTE", pj: [] },
    { id: 'e2', dossier: 'DLG-2026-0426', date: '2026-10-16T09:12', categorie: 'entrant', de: 'Nicolas Lefèvre <appro@brasserie-albatre.fr>', a: 'dossiers@doualog.fr',
      objet: 'RE: [DLG-2026-0426] Documents manquants — BL', nonLu: true,
      corps: "Bonjour,\n\nLa compagnie maritime nous remet le BL original lundi matin. Le bon de livraison suivra dans la foulée.\n\nBien à vous,\nNicolas Lefèvre", pj: [] },
    { id: 'e3', dossier: 'DLG-2026-0410', date: '2026-10-16T08:47', categorie: 'entrant', de: 'Thomas Mercier <logistique@normapharm.fr>', a: 'dossiers@doualog.fr',
      objet: '[DLG-2026-0410] Heure de livraison souhaitée', nonLu: true,
      corps: "Bonjour,\n\nPour la livraison des médicaments, notre entrepôt peut recevoir le camion lundi 19/10 entre 8 h et 12 h. Merci de prévoir un camion frigorifique.\n\nCordialement,\nThomas Mercier\nResponsable logistique — Normapharm", pj: [] }
  ];
  /* Emails entrants sans N° DLG reconnu : le système propose un dossier probable (même client, même BL) */
  var nonRattaches = [
    { id: 'n1', date: '2026-10-16T09:58', categorie: 'entrant', de: 'Sébastien Caron <contact@piecesauto-lehavre.fr>', a: 'dossiers@doualog.fr', nonLu: true,
      objet: 'Facture rectifiée pour la douane',
      corps: "Bonjour,\n\nSuite à la visite de la douane sur notre conteneur, voici la facture rectifiée de notre fournisseur (BL CMDULHR2211906). Les quantités de plaquettes de frein sont maintenant détaillées par référence.\n\nMerci de la transmettre à l'inspecteur.\n\nSébastien Caron\nPièces Auto du Havre",
      pj: ['Facture_rectifiee_FR-20931.pdf'],
      proposition: { dossier: 'DLG-2026-0415', raison: 'même client (Pièces Auto du Havre) et même BL CMDULHR2211906' } },
    { id: 'n2', date: '2026-10-16T08:05', categorie: 'logistique', de: 'MSC — Agence <import.export@msc-agence.fr>', a: 'dossiers@doualog.fr', nonLu: true,
      objet: "Avis d'arrivée — MSC Aurora — BL MEDULH493308",
      corps: "Madame, Monsieur,\n\nNous vous informons de l'arrivée prévue du navire MSC Aurora le 21/10/2026 au Port du Havre.\nBL MEDULH493308 — 1 conteneur 20'.\n\nService import — MSC Agence Le Havre",
      pj: ['Avis_arrivee_MEDULH493308.pdf'],
      proposition: { dossier: 'DLG-2026-0424', raison: 'même BL MEDULH493308 (Agrofertil Normandie)' } },
    { id: 'n3', date: '2026-10-16T09:30', categorie: 'entrant', de: 'Marion Girard <m.girard@seine-energie.fr>', a: 'dossiers@doualog.fr', nonLu: true,
      objet: 'Demande de dédouanement — groupes électrogènes',
      corps: "Bonjour,\n\nNous importons 4 groupes électrogènes de 250 kVA, arrivée prévue au Havre le 28/10 sur le CMA CGM Tage. Pouvez-vous prendre en charge le dédouanement et la livraison à Rouen ?\nVous trouverez ci-joint la facture, la liste de colisage et le BL.\n\nCordialement,\nMarion Girard\nSeine Énergie SAS",
      pj: ['Facture_SE-2026-118.pdf', 'Packing_list_SE-2026-118.pdf', 'BL_CMDULHR2219044.pdf'],
      proposition: null }
  ];
  /* ── Journal du fil rouge (CDC §13.2) ─────────────────────── */
  var historique = {
    'DLG-2026-0412': [
      { date: '2026-09-29T09:14', acteur: 'Système',  type: 'creation', texte: 'Dossier créé à partir de l’email de c.dubois@agrofertil.fr (6 pièces jointes). Type : Import.' },
      { date: '2026-09-29T09:14', acteur: 'Système',  type: 'statut',   texte: 'Mandat valide trouvé (jusqu’au 31/12/2026). Documents obligatoires présents. Statut : En cours de traitement.' },
      { date: '2026-09-29T09:15', acteur: 'Système',  type: 'email',    texte: 'Accusé de réception envoyé au client avec son lien personnel (expire le 29/10/2026).' },
      { date: '2026-09-29T09:32', acteur: 'Babacar Gaye', type: 'assignation', texte: 'Dossier attribué à Awa Ndiaye.' },
      { date: '2026-09-29T11:47', acteur: 'Client (lien personnel)', type: 'lien', texte: 'Consultation du suivi du dossier.' },
      { date: '2026-10-01T10:32', acteur: 'Awa Ndiaye', type: 'statut', texte: 'Déclaration stockée saisie. Statut : Déclaration stockée.' },
      { date: '2026-10-03T08:12', acteur: 'Système',  type: 'email',    texte: 'Email logistique rattaché : avis d’arrivée MSC.' },
      { date: '2026-10-03T16:05', acteur: 'Awa Ndiaye', type: 'statut', texte: 'ETA 05/10/2026 et conteneur MSCU 4120936-2 renseignés. Statut : Déclaration anticipée.' },
      { date: '2026-10-06T10:31', acteur: 'Awa Ndiaye', type: 'statut', texte: 'Contrôle physique notifié par la douane. Statut : Contrôle physique en cours.' },
      { date: '2026-10-06T10:40', acteur: 'Awa Ndiaye', type: 'email', texte: 'Email envoyé au client : contrôle physique programmé.' },
      { date: '2026-10-08T16:50', acteur: 'Awa Ndiaye', type: 'statut', texte: 'Résultat du contrôle : Conforme.' },
      { date: '2026-10-09T08:44', acteur: 'Awa Ndiaye', type: 'statut', texte: 'BAE 2026-BAE-048213 obtenu. Statut : BAE obtenu.' },
      { date: '2026-10-09T10:58', acteur: 'Seydou Camara',  type: 'transport', texte: 'Ordre de transport OT-2026-0156 créé.' },
      { date: '2026-10-09T11:20', acteur: 'Seydou Camara',  type: 'transport', texte: 'Offre envoyée à Normandie Fret Express et Atlantique Fret Logistique. Transport : À confirmer.' },
      { date: '2026-10-09T14:47', acteur: 'Normandie Fret Express (lien)', type: 'lien', texte: 'Offre acceptée. Transport : Confirmé. Offre clôturée pour Atlantique Fret Logistique.' },
      { date: '2026-10-12T16:40', acteur: 'Awa Ndiaye', type: 'statut', texte: 'BAS 2026-BAS-051907 obtenu. Statut : BAS obtenu.' },
      { date: '2026-10-12T16:40', acteur: 'Système',  type: 'statut',   texte: 'Basculement automatique en facturation. Statut : En facturation.' },
      { date: '2026-10-13T09:10', acteur: 'Client (lien personnel)', type: 'lien', texte: 'Consultation du suivi et téléchargement de BAE_2026-BAE-048213.pdf.' },
      { date: '2026-10-14T09:30', acteur: 'Normandie Fret Express (lien)', type: 'lien', texte: 'Camion GH-427-BC, chauffeur Didier Faure. Transport : Camion affecté.' },
      { date: '2026-10-15T14:10', acteur: 'Normandie Fret Express (lien)', type: 'lien', texte: 'Transport : Chargement.' },
      { date: '2026-10-16T07:40', acteur: 'Normandie Fret Express (lien)', type: 'lien', texte: 'Transport : En route.' },
      { date: '2026-10-16T07:58', acteur: 'Système',  type: 'email',    texte: 'Email du client rattaché au dossier.' },
      { date: '2026-10-16T08:20', acteur: 'Seydou Camara',  type: 'email', texte: 'Email envoyé au client : heure d’arrivée du camion.' }
    ]
  };

  /* ── Navigation interne et accès par rôle (image client + CDC §02) ───────
     Entrées dans l'ordre de l'image. horsV1 : visibles mais inactives.
     À VALIDER : « Facturation » (E06, MUST) n'apparaît pas dans l'image — ajoutée entre Documents et Messagerie.
     Accueil : E09 (tableau de bord graphique) pour tous les profils ; Dossiers = liste E01 ; Clients = E10 ; Mandats = E12 ; Documents = E13 ; Paramètres = E14 ; Messagerie = E11 (boîte centrale, À VALIDER) ; Rapports = E07 (Manager, Direction).
     À VALIDER : pas de matrice des droits détaillée (US-45), répartition déduite du tableau §02.
     Direction = mêmes entrées que le Manager, en lecture seule. */
  var navigation = [
    { id: 'tableau',       label: 'Tableau de bord', icone: 'dashboard', href: 'E09-tableau-de-bord.html' },
    { id: 'dossiers',      label: 'Dossiers',        icone: 'dossiers',  href: 'E01-dossiers.html' },
    { id: 'transport',     label: 'Transport',       icone: 'transport', href: 'E05-annuaire-transporteurs.html' },
    { id: 'mandats',       label: 'Mandats',         icone: 'mandat',    href: 'E12-mandats.html' },
    { id: 'clients',       label: 'Clients',         icone: 'clients',   href: 'E10-clients.html' },
    { id: 'documents',     label: 'Documents',       icone: 'document',  href: 'E13-documents.html' },
    { id: 'facturation',   label: 'Facturation',     icone: 'facture',   href: 'E06-facturation.html' },
    { id: 'messagerie',    label: 'Messagerie',      icone: 'mail',      href: 'E11-messagerie.html' },
    { id: 'notifications', label: 'Notifications',   icone: 'bell',      href: 'E08-notifications.html' },
    { id: 'rapports',      label: 'Rapports',        icone: 'rapport',   href: 'E07-dashboard-manager.html' },
    { id: 'parametres',    label: 'Paramètres',      icone: 'settings',  href: 'E14-parametres.html' }
  ];
  /* ── Historique fictif des semaines passées (tableau de bord E09, toutes les périodes) ──
     Une ligne par semaine : lundi, dossiers reçus import / export, délai moyen réception → BAS en jours.
     · janv. 2021 → oct. 2025 : généré (graine fixe, toujours le même) — activité en croissance, délai qui baisse,
       creux des fêtes de fin d'année et de la mi-août ;
     · nov. 2025 → 14/09/2026 : valeurs écrites à la main ;
     · à partir du 21/09/2026, E09 calcule sur les dossiers du jeu de données.
     À VALIDER : reprise de l'historique des années passées dans l'outil (QUESTIONS-ONCLE.md). */
  var historiqueGenere = (function () {
    var graine = 11, out = [], t = Date.UTC(2021, 0, 4), fin = Date.UTC(2025, 10, 3);
    function hasard() { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; }
    for (; t < fin; t += 7 * 864e5) {
      var iso = new Date(t).toISOString().slice(0, 10), an = (t - Date.UTC(2021, 0, 4)) / (365.25 * 864e5);   // années écoulées depuis 2021
      var creux = (iso.slice(5, 7) === '12' && +iso.slice(8, 10) > 20) || (iso.slice(5, 7) === '08' && +iso.slice(8, 10) >= 6 && +iso.slice(8, 10) <= 20);
      var imp = Math.round(1.4 + an * 0.35 + hasard() * 2), exp = Math.round(0.3 + an * 0.18 + hasard() * 1.4);
      if (creux) { imp = Math.max(1, imp - 2); exp = Math.max(0, exp - 1); }
      out.push({ lundi: iso, import: imp, export: exp, delai: Math.round((15.6 - an * 0.75 + hasard() * 2.6 + (creux ? 2 : 0)) * 10) / 10 });
    }
    return out;
  })();
  var statsAnterieures = historiqueGenere.concat([
    ['2025-11-03', 4, 2, 10.8], ['2025-11-10', 3, 2, 12.1], ['2025-11-17', 3, 3, 12.4], ['2025-11-24', 4, 1, 13.1],
    ['2025-12-01', 5, 1, 12.1], ['2025-12-08', 3, 3, 10.9], ['2025-12-15', 5, 2, 11], ['2025-12-22', 2, 1, 15.3],
    ['2025-12-29', 2, 1, 15.2], ['2026-01-05', 3, 2, 12.3], ['2026-01-12', 5, 1, 11], ['2026-01-19', 6, 2, 11.2],
    ['2026-01-26', 5, 1, 10.9], ['2026-02-02', 6, 2, 11.6], ['2026-02-09', 3, 3, 11.2], ['2026-02-16', 6, 2, 11.2],
    ['2026-02-23', 5, 2, 13], ['2026-03-02', 5, 1, 11.2], ['2026-03-09', 4, 1, 10.6], ['2026-03-16', 4, 3, 12.6],
    ['2026-03-23', 6, 1, 11.9], ['2026-03-30', 4, 2, 13.3], ['2026-04-06', 4, 2, 11.3], ['2026-04-13', 3, 3, 10.8],
    ['2026-04-20', 4, 3, 13.3], ['2026-04-27', 6, 3, 13.3], ['2026-05-04', 5, 2, 12.3], ['2026-05-11', 3, 1, 11.6],
    ['2026-05-18', 3, 2, 12.7], ['2026-05-25', 2, 1, 15.3], ['2026-06-01', 3, 2, 12.4], ['2026-06-08', 4, 1, 13.8],
    ['2026-06-15', 4, 3, 12.4], ['2026-06-22', 4, 1, 13.1], ['2026-06-29', 6, 1, 10.5], ['2026-07-06', 3, 3, 12.8],
    ['2026-07-13', 5, 3, 11.2], ['2026-07-20', 6, 1, 10.5], ['2026-07-27', 3, 1, 12.2], ['2026-08-03', 6, 3, 10.9],
    ['2026-08-10', 4, 1, 11.4], ['2026-08-17', 4, 1, 11.6]
  ].map(function (s) { return { lundi: s[0], import: s[1], export: s[2], delai: s[3] }; })).concat([
    { lundi: '2026-08-24', import: 4, export: 2, delai: 11.2 },
    { lundi: '2026-08-31', import: 5, export: 1, delai: 12.4 },
    { lundi: '2026-09-07', import: 3, export: 3, delai: 10.8 },
    { lundi: '2026-09-14', import: 5, export: 2, delai: 11.6 }
  ]);
  var horsV1 = ['parametres'];   // Paramètres (E14) : ouvert à tous (Mon profil), le reste réservé au Manager et à la Direction
  /* Clients (E10) et Messagerie (E11) ouverts à tous les profils — À VALIDER (droits, QUESTIONS-ONCLE.md §1) */
  var communs = ['clients', 'messagerie', 'mandats', 'documents'];   // Mandats (E12), Documents (E13) : À VALIDER, comme Clients
  var acces = {
    declarant:   { nav: ['tableau', 'dossiers', 'notifications'].concat(communs, horsV1), utilisateur: 'u1' },
    operateur:   { nav: ['tableau', 'dossiers', 'transport', 'notifications'].concat(communs, horsV1), utilisateur: 'u3' },
    transport:   { nav: ['tableau', 'dossiers', 'transport', 'notifications'].concat(communs, horsV1), utilisateur: 'u4' },
    facturation: { nav: ['tableau', 'dossiers', 'facturation', 'notifications'].concat(communs, horsV1), utilisateur: 'u5' },
    manager:     { nav: ['tableau', 'dossiers', 'transport', 'facturation', 'notifications', 'rapports'].concat(communs, horsV1), utilisateur: 'u6' },
    direction:   { nav: ['tableau', 'dossiers', 'transport', 'facturation', 'notifications', 'rapports'].concat(communs, horsV1), utilisateur: 'u7', lectureSeule: true }
  };


  /* ══════════════════════════════════════════════════════════════
     Fonctions d'aide (lecture seule)
     ══════════════════════════════════════════════════════════════ */
  var NBSP = ' ';

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function parse(iso) { return iso ? new Date(iso.length === 10 ? iso + 'T00:00' : iso) : null; }

  function fmtDate(iso) {
    var d = parse(iso); if (!d) return '';
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function fmtDateCourte(iso) {
    var d = parse(iso); if (!d) return '';
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1);
  }
  function fmtHeure(iso) {
    var d = parse(iso); if (!d) return '';
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function fmtDateHeure(iso) { return iso ? fmtDate(iso) + ' · ' + fmtHeure(iso) : ''; }
  function fmtNombre(n) {
    if (n === null || n === undefined) return '';
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  }
  function fmtMontant(n) {
    if (n === null || n === undefined) return '';
    var c = Math.round(n * 100), e = Math.floor(Math.abs(c) / 100), d = Math.abs(c) % 100;
    return (c < 0 ? '−' : '') + fmtNombre(e) + ',' + (d < 10 ? '0' : '') + d + NBSP + config.devise;
  }
  function fmtPoids(kg) { return kg === null || kg === undefined ? '' : fmtNombre(kg) + NBSP + 'kg'; }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* badge('dossier', 'Info manquante') → <span class="c-badge c-badge--danger">Info manquante</span> */
  function badge(famille, valeur, extra) {
    if (!valeur) return '<span class="c-dash">—</span>';
    var ton = (statuts[famille] || {})[valeur] || 'neutral';
    var cls = 'c-badge c-badge--' + ton + (famille === 'type' ? ' c-badge--outline' : '') + (extra ? ' ' + extra : '');
    return '<span class="' + cls + '">' + esc(valeur) + '</span>';
  }

  function dossier(id) { for (var i = 0; i < dossiers.length; i++) if (dossiers[i].id === id) return dossiers[i]; return null; }
  function client(d) { return clients[d.client]; }
  function responsable(d) { return equipe[d.responsable]; }
  function refTransport(d) { return d.bl || d.lta || d.booking || null; }
  function enSalleAttente(d) { return d.statut === 'En attente de documents'; }
  function alertes(id) { var n = 0; notifications.forEach(function (x) { if (x.dossier === id && !x.lue) n++; }); return n; }
  function documentsManquants(d) {
    return documentsRequis[d.type].filter(function (k) { return !d.docs[k]; })
      .concat(mandatOk(d) ? [] : ['mandat'])
      .filter(function (k, i, a) { return a.indexOf(k) === i; });
  }
  function tableauDeBord() { return dossiers.filter(function (d) { return !enSalleAttente(d); }); }
  function salleAttente() { return dossiers.filter(enSalleAttente); }
  /* Relances d'un dossier en salle d'attente : nombre, dernier envoi, prochaine */
  function relances(d) {
    var e = d.salleAttente ? d.salleAttente.envois : [];
    return { envois: e, nombre: Math.max(e.length - 1, 0), dernier: e[e.length - 1] || null, prochaine: d.salleAttente ? d.salleAttente.prochaineRelance : null };
  }

  /* Totaux d'une grille tarifaire (TVA uniquement sur les prestations, pas sur les débours) */
  function totaux(lignes) {
    var ht = 0, debours = 0;
    lignes.forEach(function (l) { if (prestations[l.prestation].tva) ht += l.montant; else debours += l.montant; });
    var tva = Math.round(ht * config.tva * 100) / 100;   // au centime
    return { ht: ht, tva: tva, debours: debours, ttc: Math.round((ht + tva + debours) * 100) / 100 };
  }

  /* Workflow horizontal (CDC §6.2) → [{ label, etat, date, tip }]
     etat : done | special | current | warning | danger | skipped | todo */
  function workflow(d) {
    var ctrl = d.controle, t = d.transport ? d.transport.statut : null;
    var ctrlFini = ctrl && (ctrl.type === 'Aucun' || ctrl.resultat === 'Conforme');
    var tIdx = t ? ordreTransport.indexOf(t) : -1;
    var steps = [];

    steps.push({ label: 'Réception', etat: enSalleAttente(d) ? 'warning' : 'done', date: fmtDateCourte(d.reception),
      tip: enSalleAttente(d) ? 'Documents manquants' : null });

    steps.push({ label: 'Déclaration stockée',
      etat: d.declStockee ? 'done' : (enSalleAttente(d) ? 'todo' : 'current'),
      date: fmtDateCourte(d.declStockee),
      tip: d.declStockee ? 'Stockée le ' + fmtDateHeure(d.declStockee) : null });

    var etaLib = d.mode === 'Aérien' ? 'ETA vol ' + (d.vol || '') + ' · LTA ' + (d.lta || '') : 'ETA navire ' + (d.navire || '') + ' : ' + fmtDate(d.eta);
    steps.push({ label: 'Anticipé',
      etat: d.declAnticipee ? 'special' : (d.declStockee ? 'current' : 'todo'),
      date: fmtDateCourte(d.declAnticipee),
      tip: d.declAnticipee ? 'Anticipée le ' + fmtDateHeure(d.declAnticipee) + ' — ' + etaLib : null });

    var ce = 'todo';
    if (ctrl) {
      if (ctrl.type === 'Aucun') ce = 'skipped';
      else if (ctrl.resultat === 'Conforme') ce = 'done';
      else if (ctrl.resultat === 'Info manquante' || ctrl.resultat === 'Non conforme') ce = 'danger';
      else ce = 'warning';
    } else if (d.declAnticipee) ce = 'current';
    steps.push({ label: 'Contrôle douane', etat: ce,
      date: ctrl && ctrl.type !== 'Aucun' ? fmtDateCourte(ctrl.fin || ctrl.date) : (ctrl ? 'Aucun' : ''),
      tip: ctrl && ctrl.type !== 'Aucun' ? 'Contrôle ' + ctrl.type.toLowerCase() + ' — ' + ctrl.resultat : null });

    steps.push({ label: 'BAE', etat: d.bae ? 'done' : (ctrlFini ? 'current' : 'todo'), date: d.bae ? fmtDateCourte(d.bae.date) : '' });
    steps.push({ label: 'BAS', etat: d.bas ? 'done' : (d.bae ? 'current' : 'todo'), date: d.bas ? fmtDateCourte(d.bas.date) : '' });

    var te = 'todo';
    if (t === 'Pas de livraison') te = 'skipped';
    else if (tIdx >= 2) te = 'done';
    else if (tIdx >= 0) te = 'current';
    steps.push({ label: 'Transport', etat: te, date: t === 'Pas de livraison' ? 'Aucun' : '', tip: t ? 'Transport : ' + t : null });

    var le = 'todo';
    if (t === 'Pas de livraison') le = 'skipped';
    else if (t === 'Livré') le = 'done';
    else if (tIdx >= 2) le = 'current';
    steps.push({ label: 'Livraison', etat: le, date: d.livraison ? fmtDateCourte(d.livraison) : '' });

    var cl = 'todo';
    if (d.statut === 'Clôturé') cl = 'done';
    else if (d.bas && (le === 'done' || le === 'skipped')) cl = 'current';
    steps.push({ label: 'Clôture', etat: cl, date: d.statut === 'Clôturé' && d.facture ? fmtDateCourte(d.facture.dateReglement) : '' });

    return steps;
  }

  /* ══════════════════════════════════════════════════════════════
     Mémoire de démo : les actions faites pendant la présentation (OT créé, offre acceptée, camion,
     statut transport, documents, BAE, BAS…) sont gardées le temps de l'onglet (sessionStorage),
     pour suivre un parcours d'une page à l'autre. Fermer l'onglet ou reinitialiserDemo() remet l'état initial.
     ══════════════════════════════════════════════════════════════ */
  var CLE_DEMO = 'doualog-demo';
  function lireDemo() { try { return JSON.parse(sessionStorage.getItem(CLE_DEMO)) || {}; } catch (e) { return {}; } }
  function ecrireDemo(famille, id, valeur) {
    var p = lireDemo(); p[famille] = p[famille] || {}; p[famille][id] = valeur;
    try { sessionStorage.setItem(CLE_DEMO, JSON.stringify(p)); } catch (e) {}
  }
  (function appliquerDemo() {
    var p = lireDemo(), k;
    for (k in (p.nouveaux || {})) if (!dossier(k)) dossiers.push(p.nouveaux[k]);   // dossiers créés à la main pendant la démo
    for (k in (p.dossiers || {})) { var d = dossier(k); if (d) for (var c in p.dossiers[k]) d[c] = p.dossiers[k][c]; }
    for (k in (p.ots || {})) ots[k] = p.ots[k];
    for (k in (p.transporteurs || {})) transporteurs[k] = p.transporteurs[k];
    for (k in (p.mandats || {})) if (clients[k]) clients[k].mandat = p.mandats[k];
    var pr = p.parametres || {};
    for (k in (pr.config || {})) config[k] = pr.config[k];
    if (pr.documentsRequis) { documentsRequis.Import = pr.documentsRequis.Import; documentsRequis.Export = pr.documentsRequis.Export; }
    for (k in (pr.equipe || {})) equipe[k] = pr.equipe[k];
    for (k in (p.aClasser || {})) aClasser.forEach(function (x) { if (x.id === k) x.traite = p.aClasser[k]; });
    if (p.compteurs) { if (p.compteurs.ot) prochainNumeroOT = p.compteurs.ot; if (p.compteurs.fac) prochainNumeroFacture = p.compteurs.fac; }
    if (p.notifications) notifications.forEach(function (n) { if (p.notifications[n.id]) n.lue = true; });
  })();
  var CHAMPS_SAUVES = ['statut', 'docs', 'docsInfo', 'bae', 'bas', 'facture', 'transport', 'livraison', 'salleAttente', 'responsable'];
  function sauverDossier(d) { var o = {}; CHAMPS_SAUVES.forEach(function (c) { o[c] = d[c]; }); ecrireDemo('dossiers', d.id, o); }
  /* Création manuelle d'un dossier (E01 « Nouveau dossier ») — À VALIDER : le CDC ne prévoit que la création automatique à la réception
     d'un email ; la création à la main sert aux demandes reçues par téléphone ou remises en main propre (QUESTIONS-ONCLE.md).
     o = { client, type, mode, ref, marchandise, responsable, recus: [clés des pièces déjà reçues] }. Pièce obligatoire manquante → salle d'attente. */
  function creerDossier(o) {
    var max = 0; dossiers.forEach(function (x) { max = Math.max(max, +x.id.slice(-4)); });
    var id = 'DLG-2026-' + String(max + 1).padStart(4, '0'), now = config.aujourdhui;
    var dd = { facture: false, packing: false, instruction: false, bl: false, bonLivraison: false, certificatOrigine: false, mandat: etatMandat(clients[o.client]).couvert };
    (o.recus || []).forEach(function (k) { dd[k] = true; });
    var manque = documentsRequis[o.type].some(function (k) { return !dd[k]; });
    var d = { id: id, type: o.type, mode: o.mode, client: o.client, statut: manque ? 'En attente de documents' : 'En cours de traitement',
      reception: now, responsable: o.responsable, creeManuellement: true,
      eta: null, incoterm: null, poids: null, colis: null, unite: 'colis', marchandise: o.marchandise || 'À préciser',
      docs: dd, declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null };
    if (o.ref) { if (o.mode === 'Aérien') d.lta = o.ref; else if (o.type === 'Export') d.booking = o.ref; else d.bl = o.ref; }
    if (manque) d.salleAttente = { envois: [now], prochaineRelance: plusJours(now, config.frequenceRelanceJours) + now.slice(10) };
    dossiers.push(d);
    ecrireDemo('nouveaux', id, d);
    return d;
  }
  function sauverOT(id) { ecrireDemo('ots', id, ots[id]); }
  function sauverTransporteur(id) { ecrireDemo('transporteurs', id, transporteurs[id]); }
  /* Réserve le prochain N° d'OT (séquentiel) */
  function reserverNumeroOT() {
    var n = prochainNumeroOT;
    prochainNumeroOT = 'OT-2026-' + String(parseInt(n.slice(-4), 10) + 1).padStart(4, '0');
    ecrireDemo('compteurs', 'ot', prochainNumeroOT);
    return n;
  }
  function reserverNumeroFacture() {
    var n = prochainNumeroFacture;
    prochainNumeroFacture = 'FAC-2026-' + String(parseInt(n.slice(-4), 10) + 1).padStart(4, '0');
    ecrireDemo('compteurs', 'fac', prochainNumeroFacture);
    return n;
  }
  function numeroFactureSuivant() { return prochainNumeroFacture; }
  function marquerLue(id) { notifications.forEach(function (n) { if (n.id === id) n.lue = true; }); ecrireDemo('notifications', id, true); }
  function nonLues() { return notifications.filter(function (n) { return !n.lue; }).length; }
  /* Facture d'un dossier (CDC §10) : dès le BAS, le dossier est « En facturation » tant que la facture n'est pas émise */
  function facture(d) {
    if (!d.bas) return null;
    var f = d.facture || { num: null, statut: 'En facturation' };
    var lignes = grilles[d.id] || [], t = totaux(lignes);
    return { num: f.num, statut: f.statut, generee: f.generee || null, emise: f.emise || null, echeance: f.echeance || null,
      regle: f.regle || 0, paiements: f.paiements || [], lignes: lignes, ht: t.ht, tva: t.tva, debours: t.debours, ttc: f.montant || t.ttc,
      reste: Math.round(((f.montant || t.ttc) - (f.regle || 0)) * 100) / 100, dateBAS: d.bas.date };
  }
  /* ══ Vue client (X03, X04) : statut et étapes en langage client, sans jargon interne ══ */
  function statutPublic(d) {
    var t = d.transport ? d.transport.statut : null;
    if (d.statut === 'Clôturé') return { libelle: 'Dossier terminé', ton: 'neutral', texte: 'Toutes les opérations de ce dossier sont terminées.' };
    if (enSalleAttente(d)) return { libelle: 'Documents attendus', ton: 'warning', texte: 'Il nous manque des documents pour commencer les formalités de dédouanement.' };
    if (d.statut === 'Info manquante' && d.docs.certificatOrigine) return { libelle: 'Contrôle de la douane en cours', ton: 'warning', texte: 'Votre réponse a bien été transmise à la douane. Le contrôle se poursuit.' };
    if (d.statut === 'Info manquante') return { libelle: 'Information attendue', ton: 'danger', texte: 'La douane demande une information complémentaire avant de poursuivre.' };
    if (d.statut.indexOf('Contrôle') === 0) return { libelle: 'Contrôle de la douane en cours', ton: 'warning', texte: 'La douane vérifie votre marchandise ou vos documents. Aucune action n\'est attendue de votre part.' };
    if (d.bas) {
      if (t === 'Livré') return { libelle: 'Marchandise livrée', ton: 'success', texte: 'Votre marchandise a été livrée.' };
      if (t === 'En route' || t === 'Chargement' || t === 'Camion affecté' || t === 'Confirmé') return { libelle: 'Livraison en cours', ton: 'info', texte: 'Les formalités douanières sont terminées. Le transport vers le lieu de livraison est en cours.' };
      if (t === 'À confirmer' || t === 'Demande de transport envoyée') return { libelle: 'Livraison en préparation', ton: 'info', texte: 'Les formalités douanières sont terminées. Nous organisons le transport.' };
      return { libelle: 'Formalités douanières terminées', ton: 'success', texte: 'La marchandise peut être enlevée.' };
    }
    if (d.bae) return { libelle: 'Enlèvement autorisé', ton: 'success', texte: 'La douane a autorisé l\'enlèvement de la marchandise. La sortie du port est en préparation.' };
    if (d.statut === 'Déclaration anticipée') return { libelle: 'Déclaration en douane déposée', ton: 'info', texte: 'Votre déclaration est déposée auprès de la douane.' };
    if (d.statut === 'Déclaration stockée') return { libelle: 'Déclaration en douane enregistrée', ton: 'info', texte: 'Votre déclaration en douane est en cours de préparation.' };
    return { libelle: 'Dossier en préparation', ton: 'info', texte: 'Nous préparons les formalités de dédouanement.' };
  }
  var LIBELLES_PUBLICS = { 'Réception': 'Dossier reçu', 'Déclaration stockée': 'Déclaration enregistrée', 'Anticipé': 'Déclaration déposée',
    'Contrôle douane': 'Contrôle de la douane', 'BAE': 'Bon à enlever (BAE)', 'BAS': 'Bon à sortir (BAS)', 'Transport': 'Transport organisé',
    'Livraison': 'Livraison', 'Clôture': 'Dossier terminé' };
  /* Étapes publiques : { label, etat (fait | en-cours | a-venir | sans-objet), date (ISO ou null), note } */
  function etapesPubliques(d) {
    var ot = d.transport && d.transport.ot ? ots[d.transport.ot] : null;
    function dateOT(st) { var x = ot ? ot.suivi.filter(function (e) { return e.statut === st; })[0] : null; return x ? x.date : null; }
    var dates = {
      'Réception': d.reception, 'Déclaration stockée': d.declStockee, 'Anticipé': d.declAnticipee,
      'Contrôle douane': d.controle && d.controle.type !== 'Aucun' ? (d.controle.fin || d.controle.date) : null,
      'BAE': d.bae ? d.bae.date : null, 'BAS': d.bas ? d.bas.date : null,
      /* Le transporteur peut être choisi dès le BAE (C5), donc avant le BAS : l'étape « Transport organisé » prend la date du camion affecté,
         pour que les dates du suivi client restent dans l'ordre ; la date de confirmation passe en note */
      'Transport': dateOT('Camion affecté') || dateOT('Confirmé'),
      'Livraison': d.livraison, 'Clôture': d.statut === 'Clôturé' && d.facture ? d.facture.dateReglement : null
    };
    return workflow(d).map(function (s) {
      var etat = { done: 'fait', special: 'fait', current: 'en-cours', warning: 'en-cours', danger: 'en-cours', skipped: 'sans-objet', todo: 'a-venir' }[s.etat];
      var note = '';
      if (s.label === 'Contrôle douane' && d.controle) note = d.controle.type === 'Aucun' ? 'Pas de contrôle' : (d.controle.resultat === 'Conforme' ? 'Contrôle terminé, conforme' : d.controle.type === 'Physique' ? 'Visite de la marchandise' : 'Vérification des documents');
      if (s.label === 'Transport' && d.transport && d.transport.statut === 'Pas de livraison') note = 'Sans livraison : enlèvement par vos soins';
      else if (s.label === 'Transport' && etat === 'fait' && dateOT('Camion affecté') && dateOT('Confirmé')) note = 'Transporteur retenu le ' + fmtDate(dateOT('Confirmé')) + ', camion affecté';
      if (s.label === 'Livraison' && d.transport && etat === 'en-cours') note = d.transport.statut === 'En route' ? 'Camion en route' : 'En préparation';
      if (s.label === 'Réception' && etat === 'en-cours') note = 'Documents attendus';
      return { label: LIBELLES_PUBLICS[s.label], etat: etat, date: etat === 'fait' ? dates[s.label] : null, note: note };
    });
  }
  /* Ce que le client doit faire, d'après le dossier (X04, et alerte générique de X03) */
  function actionsClient(d) {
    var a = [];
    documentsManquants(d).forEach(function (k) {
      if (k === 'mandat') a.push({ type: 'mandat', cle: k, titre: 'Signer le mandat de représentation en douane' });
      else if (k === 'instruction') a.push({ type: 'instructions', cle: k, titre: 'Nous transmettre vos instructions douanières' });
      else a.push({ type: 'depot', cle: k, titre: 'Déposer : ' + documents[k].libelle });
    });
    if (d.statut === 'Info manquante' && d.controle && !d.docs.certificatOrigine) {
      a.unshift({ type: 'depot', cle: 'certificatOrigine', titre: 'Répondre à la demande de la douane', detail: d.controle.commentaire });
    }
    return a;
  }
  /* Réception d'un document envoyé par le client (X04) : si plus rien ne manque, le dossier quitte la salle d'attente */
  function recevoirDocumentClient(d, cle) {
    if (cle === 'mandat') { signerMandatEnLigne(d); return; }
    var c = clients[d.client];
    recevoirDocument(d, cle, { provenance: 'Lien client', par: c.contact, fichier: fichierPiece(d, cle), note: 'Déposé par ' + c.contact + ' sur son lien personnel, après le code de confirmation.' });
  }

  /* ══ Emails : fil d'un dossier, boîte centrale E11, non lus (une seule source) ══ */
  function nomFichier(k) { return documents[k].libelle.replace(/[ \/']+/g, '_').replace(/_+/g, '_') + '.pdf'; }
  function messagesDossier(d) {
    if (!messages[d.id]) {
      /* Dossiers sans fil détaillé : envoi du client, accusé de réception (toujours envoyé, CDC §3), relances, mandat, demande d'information */
      var c = client(d), boiteDLG = 'DOUALOG <' + config.boiteEmail + '>';
      var m = [
        { id: d.id + '-a', date: d.reception, categorie: 'entrant', de: c.contact + ' <' + c.email + '>', a: config.boiteEmail, objet: 'Envoi des documents — ' + (d.marchandise || d.id),
          corps: 'Bonjour,\n\nVeuillez trouver ci-joint les documents de notre ' + (d.type === 'Import' ? 'import' : 'export') + ' : ' + d.marchandise.toLowerCase() + '.\n\nCordialement,\n' + c.contact + '\n' + c.nom,
          pj: Object.keys(d.docs).filter(function (k) { return d.docs[k] && documents[k]; }).map(nomFichier) },
        { id: d.id + '-b', date: d.reception, categorie: 'auto', de: boiteDLG, a: c.email, objet: '[' + d.id + '] Accusé de réception de votre envoi',
          corps: 'Accusé de réception automatique : numéro de dossier ' + d.id + ' et lien de suivi personnel.', pj: [] }
      ];
      if (d.creeManuellement) m.shift();   // dossier créé à la main (E01) : pas d'email d'envoi du client
      if (d.salleAttente) d.salleAttente.envois.forEach(function (x, i) {
        m.push({ id: d.id + '-r' + i, date: x, categorie: 'auto', de: boiteDLG, a: c.email, objet: (i ? 'Relance n°' + i + ' — ' : '') + '[' + d.id + '] Documents manquants pour le traitement de votre dossier',
          corps: 'Email automatique : liste des pièces manquantes et lien pour les déposer.', pj: [] });
      });
      if (d.salleAttente && d.salleAttente.mandatDemande) m.push({ id: d.id + '-md', date: d.salleAttente.mandatDemande, categorie: 'auto', de: boiteDLG, a: c.email,
        objet: '[' + d.id + '] Mandat de représentation en douane à signer', corps: 'Email automatique : modèle de mandat en pièce jointe, lien pour le renvoyer signé.', pj: ['Modele_mandat_DOUALOG.pdf'] });
      if (d.controle && d.controle.demandeEnvoyee) m.push({ id: d.id + '-c', date: d.controle.demandeEnvoyee, categorie: 'auto', de: boiteDLG, a: c.email,
        objet: '[' + d.id + '] Information demandée par la douane', corps: 'Email automatique : information demandée par la douane après contrôle.', pj: [] });
      emailsRecents.forEach(function (x) { if (x.dossier === d.id) m.push(x); });
      messages[d.id] = m;
    }
    /* Emails « non rattachés » rattachés à ce dossier pendant la démo (E11) */
    nonRattaches.forEach(function (x) { if (etatNonRattache(x.id) === d.id && messages[d.id].indexOf(x) < 0) messages[d.id].push(x); });
    return messages[d.id];
  }
  function estNonLu(m) { return !!m.nonLu && !(lireDemo().lus || {})[m.id]; }
  function marquerEmailLu(m) { ecrireDemo('lus', m.id, true); }
  /* Sort d'un email non rattaché : 'DLG-…' (rattaché), 'nouveau' (dossier créé), 'ignore', ou null */
  function etatNonRattache(id) { return (lireDemo().rattachements || {})[id] || null; }
  function traiterNonRattache(id, valeur) { ecrireDemo('rattachements', id, valeur); }
  /* Boîte centrale : tous les emails des dossiers + les non rattachés en attente, du plus récent au plus ancien */
  function boite() {
    var l = [];
    dossiers.forEach(function (d) { messagesDossier(d).forEach(function (m) { l.push({ m: m, dossier: d.id }); }); });
    nonRattaches.forEach(function (m) { if (!etatNonRattache(m.id)) l.push({ m: m, dossier: null }); });
    return l.sort(function (a, b) { return a.m.date < b.m.date ? 1 : -1; });
  }
  /* Emails entrants non lus (compteurs du header et du menu) */
  function emailsNonLus() { return boite().filter(function (x) { return (x.m.categorie === 'entrant' || x.m.categorie === 'logistique') && estNonLu(x.m); }); }
  /* Client : tarifs convenus, état du mandat, chiffres de facturation (E10) */
  function tarifsClient(id) {
    var t = {}, k; for (k in tarifsBase) t[k] = tarifsBase[k];
    for (k in (tarifsClients[id] || {})) t[k] = tarifsClients[id][k];
    return Object.keys(t).filter(function (k) { return t[k]; }).map(function (k) { return { prestation: k, montant: t[k] }; });
  }
  /* État du mandat d'un client (E12, E10, E09, X04) :
     valide · bientot (expire dans 30 jours ou moins) · demande (envoyée) · relance · expire · absent (jamais signé ou révoqué).
     couvert : un mandat signé couvre aujourd'hui (même si une demande de renouvellement est en cours). */
  var MANDAT_ETATS = {
    valide:  { libelle: 'Valide',           ton: 'success' },
    bientot: { libelle: 'Expire bientôt',   ton: 'warning' },
    demande: { libelle: 'Demande envoyée',  ton: 'info' },
    relance: { libelle: 'Relancé',          ton: 'warning' },
    expire:  { libelle: 'Expiré',           ton: 'danger' },
    absent:  { libelle: 'Absent',           ton: 'neutral' }
  };
  var ALERTE_MANDAT_JOURS = config.alerteMandatJours;   // À VALIDER — réglable dans Paramètres (E14)
  function etatMandat(c) {
    var m = c.mandat || {}, auj = parse(config.aujourdhui.slice(0, 10));
    var j = m.jusquau ? Math.round((parse(m.jusquau) - auj) / 864e5) : null;
    var couvert = !!(m.valide && !m.revoque && m.jusquau && j >= 0);
    var cle = couvert ? (j <= ALERTE_MANDAT_JOURS ? 'bientot' : 'valide') : (m.valide && !m.revoque && m.jusquau ? 'expire' : 'absent');
    var base = cle;
    if (m.demande) cle = m.demande.relances && m.demande.relances.length ? 'relance' : 'demande';
    var e = MANDAT_ETATS[cle];
    return { cle: cle, base: base, libelle: e.libelle, ton: e.ton, jours: j, couvert: couvert, bientot: base === 'bientot', aTraiter: cle !== 'valide' };
  }
  function mandatOk(d) { return !!d.docs.mandat && etatMandat(clients[d.client]).couvert; }
  function mandatsATraiter() { return Object.keys(clients).filter(function (id) { return etatMandat(clients[id]).aTraiter; }); }
  function plusJours(iso, n) { var t = parse(iso.slice(0, 10)); t.setDate(t.getDate() + n); return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); }
  function finValidite(debut) { var t = parse(debut); t.setFullYear(t.getFullYear() + 1); t.setDate(t.getDate() - 1); return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); }   // 1 an — À VALIDER
  /* Journal du mandat : historique écrit, sinon reconstitué depuis la signature ; alerte et expiration ajoutées à la date du jour */
  function historiqueMandat(id) {
    var c = clients[id], m = c.mandat || {}, h = (m.historique || []).slice(), auj = config.aujourdhui.slice(0, 10);
    if (!m.historique && m.signe) {
      if (m.mode === 'papier') h.push(
        { date: plusJours(m.signe, -2) + 'T09:00', type: 'demande', acteur: 'Système', texte: 'Demande de mandat envoyée à ' + c.email + ', avec le modèle de mandat DOUALOG.' },
        { date: m.signeLe.slice(0, 10) + 'T09:30', type: 'reception', acteur: m.deposePar, texte: 'Original papier signé le ' + fmtDate(m.signe) + ' reçu par courrier.' },
        { date: m.signeLe, type: 'depot', acteur: m.deposePar, texte: 'Scan du mandat papier déposé (' + m.fichier + '). Validité saisie : du ' + fmtDate(m.signe) + ' au ' + fmtDate(m.jusquau) + '.' });
      else h.push(
        { date: plusJours(m.signe, -3) + 'T09:00', type: 'demande', acteur: 'Système', texte: 'Demande de mandat envoyée à ' + c.email + ', avec le modèle de mandat DOUALOG et le lien de signature.' },
        { date: m.signeLe.slice(0, 11) + pad(Math.max(+m.signeLe.slice(11, 13) - 1, 8)) + ':' + m.signeLe.slice(14, 16), type: 'ouverture', acteur: 'Client (lien personnel)', texte: 'Lien de signature ouvert.' },
        { date: m.signeLe.slice(0, 14) + pad(Math.max(+m.signeLe.slice(14, 16) - 2, 0)), type: 'code', acteur: 'Système', texte: 'Code de confirmation à 6 chiffres envoyé à ' + m.emailConfirmation + '.' },
        { date: m.signeLe, type: 'signature', acteur: m.signataire + ' (lien personnel)', texte: 'Code confirmé. Mandat ' + m.num + ' signé en ligne par ' + m.signataire + ', ' + m.fonction + '. Valide du ' + fmtDate(m.signe) + ' au ' + fmtDate(m.jusquau) + '.' });
    }
    if (m.valide && !m.revoque && m.jusquau) {
      var alerte = plusJours(m.jusquau, -ALERTE_MANDAT_JOURS), fin = plusJours(m.jusquau, 1);
      if (alerte <= auj && !h.some(function (x) { return x.type === 'alerte' && x.num === m.num; })) h.push({ date: alerte + 'T07:00', type: 'alerte', num: m.num, acteur: 'Système', texte: 'Alerte : le mandat ' + m.num + ' expire dans ' + ALERTE_MANDAT_JOURS + ' jours (' + fmtDate(m.jusquau) + ').' });
      if (fin <= auj && !h.some(function (x) { return x.type === 'expiration' && x.num === m.num; })) h.push({ date: fin + 'T00:00', type: 'expiration', num: m.num, acteur: 'Système', texte: 'Mandat ' + m.num + ' expiré le ' + fmtDate(m.jusquau) + '. Les nouveaux dossiers de ce client attendront un mandat.' });
    }
    return h.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }
  /* Actions (E12, X04) : gardées dans la mémoire de démo */
  var prochainNumeroMandat = 'MDT-2026-014';
  function figerMandat(id) { var m = clients[id].mandat; m.historique = historiqueMandat(id); return m; }
  function sauverMandat(id) { ecrireDemo('mandats', id, clients[id].mandat); }
  function numeroMandat() {
    var p = lireDemo(), n = (p.compteurs && p.compteurs.mdt) || prochainNumeroMandat;
    ecrireDemo('compteurs', 'mdt', 'MDT-2026-' + String(parseInt(n.slice(-3), 10) + 1).padStart(3, '0'));
    return n;
  }
  /* Le nouveau mandat sert à tous les dossiers en cours du client (pièce « Mandat » reçue) */
  function appliquerMandatDossiers(id) {
    dossiers.forEach(function (d) {
      if (d.client !== id || d.statut === 'Clôturé') return;
      d.docs.mandat = true;
      if (enSalleAttente(d) && documentsManquants(d).length === 0) d.statut = 'En cours de traitement';
      sauverDossier(d);
    });
  }
  function demanderMandat(id, dossierId, acteur) {
    var c = clients[id], m = figerMandat(id), quand = config.aujourdhui, renouv = etatMandat(c).couvert;
    m.demande = { date: quand, dossier: dossierId || null, motif: renouv ? 'renouvellement' : 'premier', relances: [] };
    m.historique.push({ date: quand, type: 'demande', acteur: acteur || 'Système', texte: (renouv ? 'Demande de renouvellement' : 'Demande de mandat') + ' envoyée à ' + c.email + ', avec le modèle de mandat DOUALOG' + (dossierId ? ' et le lien de signature du dossier ' + dossierId : '') + '.' });
    sauverMandat(id);
  }
  function relancerMandat(id, acteur) {
    var c = clients[id], m = figerMandat(id);
    if (!m.demande) return;
    m.demande.relances = (m.demande.relances || []).concat([config.aujourdhui]);
    m.historique.push({ date: config.aujourdhui, type: 'relance', acteur: acteur || 'Système', texte: 'Relance n° ' + m.demande.relances.length + ' envoyée à ' + c.email + '.' });
    sauverMandat(id);
  }
  /* Scan d'un mandat signé sur papier : o = { signataire, fonction, signe, jusquau, fichier } */
  function deposerMandat(id, o, acteur) {
    var m = figerMandat(id), num = numeroMandat(), h = m.historique;
    clients[id].mandat = { valide: true, num: num, signe: o.signe, jusquau: o.jusquau, mode: 'papier', signataire: o.signataire, fonction: o.fonction,
      signeLe: config.aujourdhui, deposePar: acteur, fichier: o.fichier || 'Mandat_signe_' + num + '.pdf', historique: h };
    h.push({ date: config.aujourdhui, type: 'depot', acteur: acteur, texte: 'Scan du mandat papier déposé (' + clients[id].mandat.fichier + '). Mandat ' + num + ' signé par ' + o.signataire + ', ' + o.fonction + '. Validité : du ' + fmtDate(o.signe) + ' au ' + fmtDate(o.jusquau) + '.' });
    sauverMandat(id); appliquerMandatDossiers(id);
  }
  function revoquerMandat(id, acteur) {
    var m = figerMandat(id);
    m.revoque = config.aujourdhui; m.demande = null;
    m.historique.push({ date: config.aujourdhui, type: 'revocation', acteur: acteur, texte: 'Mandat ' + m.num + ' révoqué. DOUALOG ne peut plus déclarer pour ce client sans nouveau mandat.' });
    sauverMandat(id);
  }
  /* ══ Documents (E13) : un registre calculé depuis les dossiers, les OT, les factures et les mandats — une seule source ══
     statut : Reçu · Validé (pièce contrôlée : déclaration stockée, ou document généré) · Manquant · À classer.
     provenance : Email client · Lien client · Transporteur · Généré par DOUALOG · Ajout manuel. */
  var STATUTS_DOC = { 'Reçu': 'info', 'Validé': 'success', 'Manquant': 'danger', 'À classer': 'special' };
  statuts.document = STATUTS_DOC;
  var PROVENANCES = ['Email client', 'Lien client', 'Transporteur', 'Généré par DOUALOG', 'Ajout manuel'];
  var CLES_DOSSIER = ['facture', 'packing', 'instruction', 'bl', 'bonLivraison', 'certificatOrigine'];
  function tailleDoc(nom, ext) {   // taille fictive mais stable (Ko)
    var h = 0; for (var i = 0; i < nom.length; i++) h = (h * 31 + nom.charCodeAt(i)) % 9973;
    return ext === 'JPG' ? 1200 + h % 2600 : 90 + h % 1700;
  }
  function extDoc(nom) { var e = (nom.split('.').pop() || '').toUpperCase(); return e === 'JPEG' || e === 'PNG' ? 'JPG' : e; }
  function refPiece(d) { return 'INV-' + (4000 + parseInt(d.id.slice(-4), 10) * 7 % 6000); }
  function fichierPiece(d, k) {
    var c = clients[d.client], ref = refPiece(d), comp = (compagnies[d.compagnie] || {}).nom || '';
    var pj = ((messages[d.id] || [])[0] || {}).pj || [];
    var trouve = pj.filter(function (x) { return x.toLowerCase().indexOf({ facture: 'facture', packing: 'packing', instruction: 'instruction', bl: d.mode === 'Aérien' ? 'lta' : 'bl_', bonLivraison: 'bon_de_livraison', certificatOrigine: 'certificat' }[k]) === 0; })[0];
    if (trouve) return trouve;
    return { facture: 'Facture_commerciale_' + ref + '.pdf', packing: 'Packing_list_' + ref.replace('INV', 'PL') + '.pdf',
      instruction: 'Instruction_douane_' + (c.sigle || c.nom.split(' ')[0]).replace(/[^A-Za-zÀ-ÿ]/g, '') + '.pdf',
      bl: d.lta ? 'LTA_' + d.lta + '.pdf' : 'BL_' + (d.bl || d.booking) + '.pdf', bonLivraison: 'Bon_de_livraison_' + comp.replace(/\s/g, '_') + '.pdf',
      certificatOrigine: 'Certificat_origine_' + ref.replace('INV', 'CO') + '.pdf' }[k];
  }
  var LIB_DOSSIER = { facture: 'Facture commerciale', packing: 'Packing list', instruction: 'Instruction douane', bl: 'BL / LTA', bonLivraison: 'Bon de livraison', certificatOrigine: "Certificat d'origine", mandat: 'Mandat' };
  function libDoc(k) { return LIB_DOSSIER[k] || (documentsTransport[k] || {}).libelle || k; }
  /* Pièces attendues d'un dossier : obligatoires selon le sens (CDC §3.2), + certificat d'origine s'il est là ou demandé par la douane, + autres pièces reçues */
  function clesDossier(d) {
    var cles = documentsRequis[d.type].slice();
    if (d.docs.certificatOrigine || (d.controle && d.controle.resultat === 'Info manquante')) cles.push('certificatOrigine');
    CLES_DOSSIER.forEach(function (k) { if (d.docs[k] && cles.indexOf(k) < 0) cles.push(k); });
    return cles;
  }
  function piecesManquantes(d) {   // = bloc Documents du dossier (E02) : obligatoires + certificat demandé + mandat
    if (d.statut === 'Clôturé') return [];
    return clesDossier(d).filter(function (k) { return !d.docs[k]; }).concat(mandatOk(d) ? [] : ['mandat']);
  }
  function registreDocuments() {
    var out = [], auj = config.aujourdhui;
    dossiers.forEach(function (d) {
      var c = clients[d.client], info = d.docsInfo || {};
      clesDossier(d).forEach(function (k) {
        var id = d.id + ':' + k, i = info[k] || {};
        if (!d.docs[k]) {
          if (d.statut === 'Clôturé') return;
          var douane = k === 'certificatOrigine' && d.controle && d.controle.resultat === 'Info manquante', rl = relances(d);
          out.push({ id: id, cle: k, type: libDoc(k), famille: 'dossier', dossier: d.id, client: d.client, statut: 'Manquant', provenance: null, date: null,
            demande: douane ? d.controle.demandeEnvoyee : (rl.envois[0] || null), relances: douane ? 0 : rl.nombre, prochaine: douane ? null : rl.prochaine, parDouane: douane });
          return;
        }
        var nom = i.fichier || fichierPiece(d, k), ext = extDoc(nom);
        out.push({ id: id, cle: k, type: libDoc(k), famille: 'dossier', dossier: d.id, client: d.client, fichier: nom, ext: ext, taille: i.taille || tailleDoc(nom, ext),
          statut: i.valide || d.declStockee ? 'Validé' : 'Reçu', provenance: i.provenance || 'Email client', date: i.date || d.reception, par: i.par || c.contact,
          origine: i.origine || (i.provenance && i.provenance !== 'Email client' ? null : c.contact + ' <' + c.email + '>'), versions: i.versions || null, journal: i.journal || [] });
      });
      if (d.statut !== 'Clôturé' && !mandatOk(d))
        out.push({ id: d.id + ':mandat', cle: 'mandat', type: 'Mandat', famille: 'mandat', dossier: d.id, client: d.client, statut: 'Manquant', provenance: null, date: null,
          demande: c.mandat.demande ? c.mandat.demande.date : null, relances: c.mandat.demande ? c.mandat.demande.relances.length : 0, prochaine: null });
      /* Documents générés : ordre de transport, facture DOUALOG */
      if (d.transport && d.transport.ot) {
        var ot = ots[d.transport.ot], nomOT = 'Ordre_transport_' + d.transport.ot + '.pdf';
        out.push({ id: 'OT:' + d.transport.ot, cle: 'ordreTransport', type: 'Ordre de transport', famille: 'doualog', dossier: d.id, client: d.client, fichier: nomOT, ext: 'PDF', taille: tailleDoc(nomOT, 'PDF'),
          statut: 'Validé', provenance: 'Généré par DOUALOG', date: ot ? ot.cree : (d.bae ? d.bae.date + 'T11:00' : d.reception), par: equipe.u4.nom, journal: [] });
        /* Documents de transport : déposés par le transporteur sur son lien (X06) ; livraisons passées : bon signé + CMR */
        var depots = ot ? (ot.documents || []) : (d.transport.statut === 'Livré' && d.livraison ? [{ type: 'blSigne', nom: 'Bon_livraison_signe_' + d.transport.ot + '.pdf', date: d.livraison + 'T16:20' }, { type: 'cmr', nom: 'CMR_' + d.transport.ot + '.pdf', date: d.livraison + 'T16:22' }] : []);
        depots.forEach(function (x, n) {
          var e = extDoc(x.nom), t = transporteurs[d.transport.transporteur] || {};
          out.push({ id: 'TR:' + d.transport.ot + ':' + n, cle: x.type, type: libDoc(x.type), famille: 'transport', dossier: d.id, client: d.client, fichier: x.nom, ext: e, taille: tailleDoc(x.nom, e),
            statut: 'Reçu', provenance: 'Transporteur', date: x.date, par: t.nom || 'Transporteur', journal: [] });
        });
      }
      if (d.facture && d.facture.num) {
        var nomF = 'Facture_' + d.facture.num + '_' + d.id + '.pdf';
        out.push({ id: 'FAC:' + d.facture.num, cle: 'factureDoualog', type: 'Facture DOUALOG', famille: 'doualog', dossier: d.id, client: d.client, fichier: nomF, ext: 'PDF', taille: tailleDoc(nomF, 'PDF'),
          statut: 'Validé', provenance: 'Généré par DOUALOG', date: (d.facture.emise || d.facture.generee || auj.slice(0, 10)) + 'T15:00', par: equipe.u5.nom, journal: [] });
      }
    });
    /* Mandats signés (E12) */
    Object.keys(clients).forEach(function (id) {
      var m = clients[id].mandat;
      if (!m || !m.signe || m.revoque) return;
      var nom = m.mode === 'papier' && m.fichier ? m.fichier : 'Mandat_' + m.num + '_' + clients[id].nom.replace(/[^A-Za-zÀ-ÿ0-9]+/g, '_') + '.pdf';
      out.push({ id: 'MDT:' + id, cle: 'mandat', type: 'Mandat', famille: 'mandat', dossier: m.dossier || null, client: id, fichier: nom, ext: 'PDF', taille: tailleDoc(nom, 'PDF'),
        statut: etatMandat(clients[id]).couvert ? 'Validé' : 'Reçu', provenance: m.mode === 'papier' ? 'Ajout manuel' : 'Lien client', date: m.signeLe,
        par: m.mode === 'papier' ? m.deposePar : m.signataire, journal: [] });
    });
    /* Pièces jointes à classer */
    aClasser.forEach(function (x) {
      if (x.traite) return;
      out.push({ id: 'AC:' + x.id, cle: null, type: null, famille: 'aclasser', dossier: null, client: null, fichier: x.fichier, ext: extDoc(x.fichier), taille: x.taille,
        statut: 'À classer', provenance: 'Email client', date: x.date, origine: x.de, objet: x.objet, proposition: x.proposition, par: x.de.replace(/\s*<.*>/, ''), journal: [] });
    });
    return out;
  }
  function documentsATraiter() { return registreDocuments().filter(function (x) { return x.statut === 'Manquant' || x.statut === 'À classer'; }); }
  /* Enregistre une pièce d'un dossier (E02, E13, X04) : provenance, date, fichier ; le dossier quitte la salle d'attente s'il est complet */
  function recevoirDocument(d, k, o) {
    d.docs[k] = true;
    d.docsInfo = d.docsInfo || {};
    var ancien = d.docsInfo[k] || {};
    d.docsInfo[k] = { provenance: o.provenance, date: o.date || config.aujourdhui, par: o.par, fichier: o.fichier || ancien.fichier, origine: o.origine || null,
      taille: o.taille || null, journal: (ancien.journal || []).concat(o.note ? [{ date: config.aujourdhui, texte: o.note, par: o.par }] : []) };
    if (enSalleAttente(d) && documentsManquants(d).length === 0) d.statut = 'En cours de traitement';
    sauverDossier(d);
  }
  /* À classer → pièce du dossier choisi (Valider la proposition, ou Modifier le type / le dossier) */
  function classerDocument(pjId, k, dossierId, acteur) {
    var x = aClasser.filter(function (y) { return y.id === pjId; })[0], d = dossier(dossierId);
    if (!x || !d) return null;
    var avant = d.statut;
    recevoirDocument(d, k, { provenance: 'Email client', date: x.date, par: acteur, fichier: x.fichier, origine: x.de, taille: x.taille,
      note: 'Pièce jointe classée par ' + acteur + ' : ' + libDoc(k) + (x.proposition && x.proposition.type === k && x.proposition.dossier === dossierId ? ' (proposition validée).' : ' (type ou dossier modifié).') });
    x.traite = { etat: 'classe', dossier: dossierId, cle: k, par: acteur, date: config.aujourdhui };
    ecrireDemo('aClasser', pjId, x.traite);
    return { dossier: d, sortiSalle: avant === 'En attente de documents' && d.statut !== avant };
  }
  function ignorerDocument(pjId, acteur) {
    var x = aClasser.filter(function (y) { return y.id === pjId; })[0];
    if (!x) return;
    x.traite = { etat: 'ignore', par: acteur, date: config.aujourdhui };
    ecrireDemo('aClasser', pjId, x.traite);
  }
  /* Remplacer une pièce d'un dossier : nouvelle version */
  function remplacerDocument(d, k, fichier, acteur) {
    var i = (d.docsInfo = d.docsInfo || {})[k] || {}, nom = fichierPiece(d, k);
    var versions = i.versions || [{ date: i.date || d.reception, fichier: i.fichier || nom, par: i.par || clients[d.client].contact }];
    versions = versions.concat([{ date: config.aujourdhui, fichier: fichier, par: acteur }]);
    d.docsInfo[k] = { provenance: 'Ajout manuel', date: config.aujourdhui, par: acteur, fichier: fichier, versions: versions, taille: null,
      journal: (i.journal || []).concat([{ date: config.aujourdhui, texte: 'Remplacé par ' + fichier + ' (version ' + versions.length + ').', par: acteur }]) };
    sauverDossier(d);
  }
  /* Changer le type ou le dossier d'une pièce : elle quitte sa place (qui redevient manquante si elle est obligatoire) */
  function deplacerDocument(d, k, d2, k2, acteur) {
    var i = (d.docsInfo || {})[k] || {}, nom = i.fichier || fichierPiece(d, k);
    d.docs[k] = false; if (d.docsInfo) delete d.docsInfo[k];
    sauverDossier(d);
    recevoirDocument(d2, k2, { provenance: i.provenance || 'Email client', date: i.date || d.reception, par: acteur, fichier: nom, origine: i.origine, taille: i.taille,
      note: (d2 === d ? 'Type changé par ' + acteur + ' : ' + libDoc(k) + ' → ' + libDoc(k2) + '.' : 'Rattaché par ' + acteur + ' : ' + d.id + ' → ' + d2.id + '.') });
  }

  /* Signature en ligne sur le lien personnel d'un dossier (X04), après le code de confirmation (D6) */
  function signerMandatEnLigne(d) {
    var id = d.client, c = clients[id], m = figerMandat(id), h = m.historique, num = numeroMandat(), quand = config.aujourdhui, debut = quand.slice(0, 10);
    h.push({ date: quand, type: 'code', acteur: 'Système', texte: 'Code de confirmation à 6 chiffres envoyé à ' + c.email + '.' });
    clients[id].mandat = { valide: true, num: num, signe: debut, jusquau: finValidite(debut), mode: 'en ligne', signataire: c.contact, fonction: c.fonction,
      signeLe: quand, emailConfirmation: c.email, dossier: d.id, historique: h };
    h.push({ date: quand, type: 'signature', acteur: c.contact + ' (lien personnel)', texte: 'Code confirmé. Mandat ' + num + ' signé en ligne par ' + c.contact + ', ' + c.fonction + ', depuis le dossier ' + d.id + '. Valide du ' + fmtDate(debut) + ' au ' + fmtDate(finValidite(debut)) + '.' });
    sauverMandat(id); appliquerMandatDossiers(id);
  }
  function dossiersClient(id) { return dossiers.filter(function (d) { return d.client === id; }); }
  /* Statuts où le dossier attend quelqu'un (douane, client) : « bloqué » dans Clients (E10) et le tableau de bord (E09) */
  var statutsBloquants = ['Info manquante', 'Contrôle physique en cours', 'Contrôle documentaire en cours', 'En attente de documents'];
  /* Résumé d'un client : dossiers, en cours, bloqués, mandat, facturation (liste E10, « Clients à suivre » E09) */
  function resumeClient(id) {
    var ds = dossiersClient(id), enCours = ds.filter(function (d) { return d.statut !== 'Clôturé'; });
    return { id: id, c: clients[id], dossiers: ds, enCours: enCours, mandat: etatMandat(clients[id]), fact: facturationClient(id),
      bloques: enCours.filter(function (d) { return statutsBloquants.indexOf(d.statut) >= 0; }) };
  }
  function facturationClient(id) {
    var r = { facture: 0, encaisse: 0, reste: 0, echues: [], nbFactures: 0, ca: 0 }, auj = config.aujourdhui.slice(0, 10);
    dossiersClient(id).forEach(function (d) {
      var f = facture(d);
      if (!f || !f.emise) return;
      r.nbFactures++; r.facture += f.ttc; r.encaisse += f.regle; r.reste += f.reste;
      if (f.emise.slice(0, 4) === auj.slice(0, 4)) r.ca += f.ttc;
      if (f.reste > 0 && f.echeance && f.echeance < auj) r.echues.push({ num: f.num, dossier: d.id, reste: f.reste, echeance: f.echeance });
    });
    return r;
  }
  /* Paramètres (E14) : famille = config (valeurs de config), documentsRequis, equipe, ou une section (profil, notifications, modeles, referentiels, prestations) */
  function parametres(famille) { var p = lireDemo().parametres || {}; return p[famille]; }
  function enregistrerParametres(famille, valeur) {
    if (famille === 'config') { var actuel = parametres('config') || {}; for (var k in valeur) { actuel[k] = valeur[k]; config[k] = valeur[k]; } valeur = actuel; }
    if (famille === 'documentsRequis') { documentsRequis.Import = valeur.Import; documentsRequis.Export = valeur.Export; }
    if (famille === 'equipe') for (var u in valeur) equipe[u] = valeur[u];
    ecrireDemo('parametres', famille, valeur);
  }
  function reinitialiserDemo() { try { sessionStorage.removeItem(CLE_DEMO); } catch (e) {} }
  /* OT dont le transporteur t est l'attributaire, nombre d'OT et dernier OT (annuaire E05) */
  function otsTransporteur(t) {
    return dossiers.filter(function (d) { return d.transport && d.transport.transporteur === t && d.transport.ot; })
      .map(function (d) { return { ot: d.transport.ot, dossier: d.id, date: ots[d.transport.ot] ? ots[d.transport.ot].cree : null }; })
      .sort(function (a, b) { return a.ot < b.ot ? 1 : -1; });
  }

  window.DOUALOG = {
    config: config, roles: roles, equipe: equipe, clients: clients, transporteurs: transporteurs,
    compagnies: compagnies, prestations: prestations, statuts: statuts, ordreTransport: ordreTransport,
    documents: documents, documentsRequis: documentsRequis,
    dossiers: dossiers, ots: ots, grilles: grilles, prochainNumeroFacture: prochainNumeroFacture,
    notifications: notifications, messages: messages, historique: historique,
    navigation: navigation, acces: acces, statsAnterieures: statsAnterieures, emailsNonLus: emailsNonLus, documentsTransport: documentsTransport,
    nonRattaches: nonRattaches, messagesDossier: messagesDossier, estNonLu: estNonLu, marquerEmailLu: marquerEmailLu, etatNonRattache: etatNonRattache,
    traiterNonRattache: traiterNonRattache, boite: boite, tarifsClient: tarifsClient, etatMandat: etatMandat, mandatOk: mandatOk, mandatsATraiter: mandatsATraiter, historiqueMandat: historiqueMandat, mandatEtats: MANDAT_ETATS, alerteMandatJours: ALERTE_MANDAT_JOURS,
    demanderMandat: demanderMandat, relancerMandat: relancerMandat, deposerMandat: deposerMandat, revoquerMandat: revoquerMandat, finValidite: finValidite,
    parametres: parametres, enregistrerParametres: enregistrerParametres,
    registreDocuments: registreDocuments, documentsATraiter: documentsATraiter, piecesManquantes: piecesManquantes, clesDossier: clesDossier, aClasser: aClasser, libDoc: libDoc, provenances: PROVENANCES, clesDocDossier: CLES_DOSSIER,
    recevoirDocument: recevoirDocument, classerDocument: classerDocument, ignorerDocument: ignorerDocument, remplacerDocument: remplacerDocument, deplacerDocument: deplacerDocument, dossiersClient: dossiersClient, facturationClient: facturationClient, resumeClient: resumeClient, statutsBloquants: statutsBloquants,
    sauverDossier: sauverDossier, creerDossier: creerDossier, sauverOT: sauverOT, sauverTransporteur: sauverTransporteur,
    reserverNumeroOT: reserverNumeroOT, reserverNumeroFacture: reserverNumeroFacture, numeroFactureSuivant: numeroFactureSuivant, marquerLue: marquerLue, nonLues: nonLues,
    facture: facture, typesNotification: typesNotification,
    statutPublic: statutPublic, etapesPubliques: etapesPubliques, actionsClient: actionsClient, recevoirDocumentClient: recevoirDocumentClient, reinitialiserDemo: reinitialiserDemo, otsTransporteur: otsTransporteur,
    fmt: { date: fmtDate, dateCourte: fmtDateCourte, heure: fmtHeure, dateHeure: fmtDateHeure, nombre: fmtNombre, montant: fmtMontant, poids: fmtPoids },
    esc: esc, badge: badge, dossier: dossier, client: client, responsable: responsable, refTransport: refTransport,
    enSalleAttente: enSalleAttente, alertes: alertes, documentsManquants: documentsManquants,
    tableauDeBord: tableauDeBord, salleAttente: salleAttente, relances: relances, totaux: totaux, workflow: workflow
  };
})();
