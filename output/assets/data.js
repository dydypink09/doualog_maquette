/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Jeu de données commun des maquettes
   Validé à l'étape 0 (cadrage/etape-0-cadrage.md §4). Toutes les données sont fictives.
   Un même dossier a le même client, BL, statut sur tous les écrans : ne jamais dupliquer
   ces valeurs dans une page, toujours les lire ici.
   ══════════════════════════════════════════════════════════════ */
(function () {

  /* ── Configuration pays — C4 tranché : Sénégal ─────────────── */
  var config = {
    aujourdhui: '2026-10-16T10:15',      // vendredi 16/10/2026 — date fictive de la démo
    pays: 'Sénégal',
    ville: 'Dakar',
    port: 'Port autonome de Dakar',
    aeroport: 'Aéroport international Blaise Diagne (AIBD)',
    devise: 'FCFA',                      // franc CFA BCEAO (XOF)
    tva: 0.18,                           // taux normal au Sénégal — À VALIDER pour les prestations DOUALOG
    boiteEmail: 'dossiers@doualog.sn',   // À VALIDER — adresse de la boîte surveillée
    dureeLienClientJours: 30,            // À VALIDER (D11)
    frequenceRelanceJours: 2,            // À VALIDER (D11)
    delaiPaiementJours: 30,              // À VALIDER — échéance des factures
    tvaLibelle: 'TVA 18 %'               // À VALIDER — taux appliqué aux prestations (débours hors TVA)
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
    u1: { nom: 'Awa Ndiaye',        initiales: 'AN', role: 'declarant' },
    u2: { nom: 'Mamadou Ba',        initiales: 'MB', role: 'declarant' },
    u3: { nom: 'Moussa Diagne',     initiales: 'MD', role: 'operateur' },
    u4: { nom: 'Seydou Camara',     initiales: 'SC', role: 'transport' },
    u5: { nom: 'Rokhaya Diop',      initiales: 'RD', role: 'facturation' },
    u6: { nom: 'Babacar Gaye',      initiales: 'BG', role: 'manager' },
    u7: { nom: 'Aïda Mbengue',      initiales: 'AM', role: 'direction' }
  };

  /* ── Clients (base centralisée, CDC §11.4) ─────────────────── */
  var clients = {
    c01: { nom: 'Agro-Industries du Sine', sigle: 'AIS', ifu: '004587213 2G3', adresse: 'Zone industrielle de Mbao, lot 27', contact: 'Mariama Diouf', email: 'm.diouf@agro-sine.sn', mandat: { valide: true, jusquau: '2026-12-31' } },
    c02: { nom: 'Pharma Distribution Sénégal', sigle: 'PDS', ifu: '005120984 2V2', adresse: 'Rue Carnot, immeuble Les Palmiers, 3e étage', contact: 'Cheikh Tidiane Sarr', email: 'logistique@pds-pharma.sn', mandat: { valide: true, jusquau: '2027-03-31' } },
    c03: { nom: 'Bâtiments et Travaux du Cap-Vert', sigle: 'BTCV', ifu: '006233190 2C1', adresse: 'Route de Rufisque, km 12', contact: 'Ousmane Fall', email: 'achats@btcv.sn', mandat: { valide: true, jusquau: '2027-01-15' } },
    c04: { nom: 'Comptoir Textile de Sandaga', ifu: '003961287 2B2', adresse: 'Avenue Lamine Guèye, n° 112', contact: 'Fatou Kiné Mbaye', email: 'export@ct-sandaga.sn', mandat: { valide: true, jusquau: '2026-11-30' } },
    c05: { nom: 'Boissons de la Petite-Côte', ifu: '004780655 2G3', adresse: 'Zone industrielle de Diamniadio, îlot 9', contact: 'Ibrahima Ndoye', email: 'appro@boissons-petitecote.sn', mandat: { valide: true, jusquau: '2027-06-30' } },
    c06: { nom: 'Électro Plus Dakar', ifu: '007012356 2A2', adresse: 'Boulevard du Centenaire, n° 48', contact: 'Moustapha Sy', email: 'import@electroplus-dakar.sn', mandat: { valide: true, jusquau: '2027-02-28' } },
    c07: { nom: 'Cotonnière du Sénégal Oriental', sigle: 'CSO', ifu: '002987460 2R2', adresse: 'Route de Tambacounda, km 4', contact: 'Abdoulaye Kanté', email: 'export@cso-coton.sn', mandat: { valide: true, jusquau: '2026-12-31' } },
    c08: { nom: 'Arachides & Céréales Export', sigle: 'ACE', ifu: '005874402 2G2', adresse: 'Boulevard de la Libération, entrepôt 12', contact: 'Aïssatou Sow', email: 'operations@ace-export.sn', mandat: { valide: true, jusquau: '2027-04-30' } },
    c09: { nom: 'Éts Gueye & Fils', ifu: '001345671 1A2', adresse: 'Médina, rue 14 × 19', contact: 'Modou Gueye', email: 'contact@gueye-fils.sn', mandat: { valide: true, jusquau: '2026-12-31' } },
    c10: { nom: 'Medilab Équipements', ifu: '006542187 2V3', adresse: 'Rue Félix Faure, villa 7', contact: 'Ndèye Astou Faye', email: 'commandes@medilab-equipements.sn', mandat: { valide: true, jusquau: '2027-05-31' } },
    c11: { nom: 'Anacarde Trading Casamance', ifu: '008031945 2Z2', adresse: 'Quartier Boucotte, Ziguinchor', contact: 'Lamine Badji', email: 'trading@anacarde-casamance.sn', mandat: { valide: false, jusquau: null } },
    c12: { nom: 'Pièces Auto Colobane', ifu: '007182634 1A1', adresse: 'Colobane, local 5', contact: 'Pape Seck', email: 'contact@piecesauto-colobane.sn', mandat: { valide: true, jusquau: '2027-01-31' } }
  };

  /* ── Annuaire transporteurs (US-27 — champs minimaux, D15 À VALIDER) ── */
  var transporteurs = {
    t1: { nom: 'Téranga Fret Express',      contact: 'Alassane Ndour',       email: 'exploitation@teranga-fret.sn',    tel: '+221 77 612 40 87' },
    t2: { nom: 'Atlantique Fret Sénégal',   contact: 'Serigne Mbacké Diop',  email: 'fret@atlantique-fret.sn',         tel: '+221 78 455 21 03' },
    t3: { nom: 'Routes du Sahel Transport', contact: 'Oumar Sall',           email: 'contact@routesdusahel.sn',        tel: '+221 76 608 74 19' },
    t4: { nom: 'Transports Mbaye Logistique', contact: 'El Hadji Mbaye',     email: 'exploitation@tml-transports.sn',  tel: '+221 77 533 60 28' },
    t5: { nom: 'Rapid Cargo Services',      contact: 'Coumba Thiam',         email: 'ops@rapidcargo.sn',               tel: '+221 70 147 92 05' },
    t6: { nom: 'Camions du Port',           contact: 'Alioune Badara Cissé', email: 'dispatch@camionsduport.sn',       tel: '+221 77 028 13 66' }
  };

  /* ── Répertoire des compagnies (US-17) — adresses À VALIDER ── */
  var compagnies = {
    k1: { nom: 'MSC',               mode: 'Maritime', email: 'import.export@msc-agence.sn' },
    k2: { nom: 'Maersk',            mode: 'Maritime', email: 'documentation@maersk-agence.sn' },
    k3: { nom: 'CMA CGM',           mode: 'Maritime', email: 'agence@cmacgm-agence.sn' },
    k4: { nom: 'Grimaldi',          mode: 'Maritime', email: 'booking@grimaldi-agence.sn' },
    k5: { nom: 'Air France Cargo',  mode: 'Aérien',   email: 'fret@afcargo-agence.sn' },
    k6: { nom: 'Ethiopian Cargo',   mode: 'Aérien',   email: 'cargo@ethiopian-agence.sn' }
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
    bl:                { libelle: 'BL / AWB' },
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
    {
      id: 'DLG-2026-0398', type: 'Import', mode: 'Maritime', client: 'c05', statut: 'Clôturé',
      reception: '2026-09-22T08:47', responsable: 'u2',
      bl: 'MEDUDK471530', conteneur: 'MSCU 7718302-4', navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-09-24',
      incoterm: 'CIF', poids: 18640, colis: 1120, unite: 'cartons', marchandise: 'Bouteilles en verre vides',
      docs: docs({}),
      declStockee: '2026-09-23T09:10', declAnticipee: '2026-09-24T11:25',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-046901', date: '2026-09-26' }, bas: { num: '2026-BAS-050118', date: '2026-09-28' },
      transport: { statut: 'Livré', ot: 'OT-2026-0141', transporteur: 't4' }, livraison: '2026-09-30',
      facture: { num: 'FAC-2026-0187', statut: 'Réglé', montant: 3184650, emise: '2026-10-01', echeance: '2026-10-31', regle: 3184650, dateReglement: '2026-10-12',
        paiements: [{ date: '2026-10-12', montant: 3184650, mode: 'Virement bancaire' }] }
    },
    {
      id: 'DLG-2026-0401', type: 'Import', mode: 'Maritime', client: 'c03', statut: 'Facturé',
      reception: '2026-09-23T10:12', responsable: 'u1',
      bl: 'MAEU238104771', conteneur: 'MRKU 4410927-3', navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-09-27',
      incoterm: 'CFR', poids: 26300, colis: 64, unite: 'bottes', marchandise: 'Fers à béton HA12',
      docs: docs({}),
      declStockee: '2026-09-24T14:02', declAnticipee: '2026-09-26T10:48',
      controle: { type: 'Documentaire', notification: '2026-09-29', date: '2026-09-30', fin: '2026-09-30', inspecteur: 'A. Sarr', resultat: 'Conforme', commentaire: 'Concordance facture / déclaration vérifiée.' },
      bae: { num: '2026-BAE-047352', date: '2026-10-02' }, bas: { num: '2026-BAS-050644', date: '2026-10-05' },
      transport: { statut: 'Chargement', ot: 'OT-2026-0150', transporteur: 't3' }, livraison: null,
      facture: { num: 'FAC-2026-0191', statut: 'Partiellement réglé', montant: 4762315, emise: '2026-10-07', echeance: '2026-11-06', regle: 2000000, dateReglement: '2026-10-14',
        paiements: [{ date: '2026-10-14', montant: 2000000, mode: 'Virement bancaire' }] }
    },
    {
      id: 'DLG-2026-0402', type: 'Export', mode: 'Maritime', client: 'c07', statut: 'Facturé',
      reception: '2026-09-24T09:05', responsable: 'u2',
      booking: 'GRI-26-AB4471', bl: 'GRIDK2609117', conteneur: 'GRIU 3305281-0', navire: 'Grande Lagos', compagnie: 'k4', eta: '2026-09-30',
      incoterm: 'FOB', poids: 21900, colis: 438, unite: 'sacs', marchandise: 'Graines de coton',
      docs: docs({ bonLivraison: false }),
      declStockee: '2026-09-25T15:20', declAnticipee: '2026-09-28T09:40',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-047018', date: '2026-09-30' }, bas: { num: '2026-BAS-050402', date: '2026-10-02' },
      transport: { statut: 'Livré', ot: 'OT-2026-0147', transporteur: 't6' }, livraison: '2026-10-06',
      facture: { num: 'FAC-2026-0193', statut: 'Facture émise', montant: 2918540, emise: '2026-10-09', echeance: '2026-11-08', regle: 0 }
    },
    {
      id: 'DLG-2026-0403', type: 'Export', mode: 'Aérien', client: 'c04', statut: 'Livré',
      reception: '2026-09-25T15:30', responsable: 'u1',
      booking: 'AF-BK-778120', lta: '057-48213960', vol: 'AF 0781', compagnie: 'k5', eta: '2026-09-29',
      incoterm: 'FCA', poids: 1240, colis: 38, unite: 'colis', marchandise: 'Tissus bazin teints',
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
      lta: '071-30028815', vol: 'ET 0921', compagnie: 'k6', eta: '2026-09-30',
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
      bl: 'CMDUDKR2208741', conteneur: 'CMAU 5530174-8', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-02',
      incoterm: 'FOB', poids: 9870, colis: 412, unite: 'cartons', marchandise: 'Climatiseurs split',
      docs: docs({}),
      declStockee: '2026-09-29T16:12', declAnticipee: '2026-10-01T10:30',
      controle: { type: 'Physique', notification: '2026-10-06', date: '2026-10-08', fin: '2026-10-09', inspecteur: 'O. Ndiaye', resultat: 'Conforme', commentaire: 'Comptage de 40 cartons sur 412, conforme au packing list.' },
      bae: { num: '2026-BAE-048596', date: '2026-10-13' }, bas: { num: '2026-BAS-052614', date: '2026-10-16' },
      transport: { statut: 'Camion affecté', ot: 'OT-2026-0158', transporteur: 't2' }, livraison: null,
      facture: null   // BAS saisi à 09:58 : basculement en facturation en cours (statut transitoire, C2)
    },
    {
      id: 'DLG-2026-0410', type: 'Import', mode: 'Maritime', client: 'c02', statut: 'BAE obtenu',
      reception: '2026-09-28T09:40', responsable: 'u2',
      bl: 'MEDUDK476822', conteneur: 'MSDU 2290413-5', navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-10-05',
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
      bl: 'MEDUDK482093', conteneur: 'MSCU 4120936-2', typeConteneur: "40'", navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-10-05',
      incoterm: 'CIF', poids: 24600, colis: 492, unite: 'sacs', marchandise: 'Engrais NPK 15-15-15 en sacs de 50 kg',
      prestationsDemandees: ['p01', 'p02', 'p03', 'p06'], prixCible: 700000,
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-10-01T10:32', declAnticipee: '2026-10-03T16:05',
      controle: { type: 'Physique', notification: '2026-10-06', date: '2026-10-07', fin: '2026-10-08', inspecteur: 'M. Diallo', resultat: 'Conforme', commentaire: 'Vérification du poids et du marquage des sacs : conforme au manifeste.' },
      bae: { num: '2026-BAE-048213', date: '2026-10-09' }, bas: { num: '2026-BAS-051907', date: '2026-10-12' },
      transport: { statut: 'En route', ot: 'OT-2026-0156', transporteur: 't1' }, livraison: null,
      facture: { num: null, statut: 'En facturation' },
      lienClient: { cree: '2026-09-29T09:15', expire: '2026-10-29', actif: true, consultations: 3 }
    },
    {
      id: 'DLG-2026-0413', type: 'Export', mode: 'Maritime', client: 'c08', statut: 'BAE obtenu',
      reception: '2026-09-30T08:58', responsable: 'u2',
      booking: 'MSC-BK-26118402', conteneur: 'MEDU 6031187-4', navire: 'MSC Bianca', compagnie: 'k1', eta: '2026-10-20',
      incoterm: 'FOB', poids: 19200, colis: 384, unite: 'sacs', marchandise: 'Arachides décortiquées en sacs de 50 kg',
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
      bl: 'CMDUDKR2211906', conteneur: 'CMAU 8817265-1', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-09',
      incoterm: 'CFR', poids: 6230, colis: 186, unite: 'colis', marchandise: 'Pièces détachées automobiles',
      docs: docs({}),
      declStockee: '2026-10-05T09:50', declAnticipee: '2026-10-07T11:05',
      controle: { type: 'Physique', notification: '2026-10-14', date: '2026-10-16', fin: null, inspecteur: 'M. Diallo', resultat: 'En cours', commentaire: 'Visite programmée au terminal à 14:00.' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0416', type: 'Import', mode: 'Maritime', client: 'c03', statut: 'Info manquante',
      reception: '2026-10-02T10:20', responsable: 'u2',
      bl: 'MAEU238559024', conteneur: 'MSKU 9902314-6', navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-10-10',
      incoterm: 'CIF', poids: 21450, colis: 1430, unite: 'cartons', marchandise: 'Carreaux céramique',
      docs: docs({ certificatOrigine: false }),
      declStockee: '2026-10-06T14:25', declAnticipee: '2026-10-09T09:15',
      controle: { type: 'Documentaire', notification: '2026-10-12', date: '2026-10-13', fin: null, inspecteur: 'A. Sarr', resultat: 'Info manquante', commentaire: "Certificat d'origine requis pour appliquer le tarif préférentiel.", demandeEnvoyee: '2026-10-13T15:22' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0417', type: 'Export', mode: 'Aérien', client: 'c02', statut: 'Contrôle documentaire en cours',
      reception: '2026-10-03T09:48', responsable: 'u1',
      booking: 'ET-BK-552094', lta: '071-30041276', vol: 'ET 0938', compagnie: 'k6', eta: '2026-10-19',
      incoterm: 'CPT', poids: 845, colis: 31, unite: 'colis', marchandise: 'Produits pharmaceutiques (réexpédition)',
      docs: docs({ bl: false, bonLivraison: false, certificatOrigine: true }),
      declStockee: '2026-10-08T10:40', declAnticipee: '2026-10-12T15:10',
      controle: { type: 'Documentaire', notification: '2026-10-15', date: '2026-10-16', fin: null, inspecteur: 'F. Diatta', resultat: 'En cours', commentaire: '' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0419', type: 'Import', mode: 'Maritime', client: 'c06', statut: 'Contrôle physique en cours',
      reception: '2026-10-05T11:02', responsable: 'u2',
      bl: 'CMDUDKR2213358', conteneur: 'CMAU 6624011-9', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-11',
      incoterm: 'FOB', poids: 8115, colis: 640, unite: 'cartons', marchandise: 'Téléviseurs LED et accessoires',
      docs: docs({}),
      declStockee: '2026-10-07T16:05', declAnticipee: '2026-10-10T10:20',
      controle: { type: 'Physique', notification: '2026-10-15', date: '2026-10-16', fin: null, inspecteur: 'P. Mendy', resultat: 'En cours', commentaire: 'Dépotage partiel en cours au terminal.' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0420', type: 'Import', mode: 'Maritime', client: 'c09', statut: 'Déclaration anticipée',
      reception: '2026-10-06T08:30', responsable: 'u1',
      bl: 'MEDUDK490155', conteneur: 'MSCU 5502871-3', navire: 'MSC Bianca', compagnie: 'k1', eta: '2026-10-19',
      incoterm: 'CFR', poids: 27000, colis: 540, unite: 'sacs', marchandise: 'Riz brisé 25 % en sacs de 50 kg',
      docs: docs({}),
      declStockee: '2026-10-08T11:30', declAnticipee: '2026-10-13T09:05',
      controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0421', type: 'Export', mode: 'Maritime', client: 'c07', statut: 'Déclaration anticipée',
      reception: '2026-10-07T14:15', responsable: 'u2',
      booking: 'GRI-26-AB4730', conteneur: 'GRIU 3307742-8', navire: 'Grande Abidjan', compagnie: 'k4', eta: '2026-10-20',
      incoterm: 'FOB', poids: 22680, colis: 104, unite: 'balles', marchandise: 'Coton fibre en balles',
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
      bl: 'MEDUDK493308', conteneur: 'MSCU 4135520-7', navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-10-26',
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
      incoterm: 'FOB', poids: 25000, colis: 312, unite: 'sacs', marchandise: 'Noix de cajou brutes',
      docs: docs({ instruction: false, bl: false, bonLivraison: false, mandat: false }),
      salleAttente: { envois: ['2026-10-15T10:03'], prochaineRelance: '2026-10-17T10:03', mandatDemande: '2026-10-15T10:03' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0428', type: 'Import', mode: 'Aérien', client: 'c09', statut: 'En attente de documents',
      reception: '2026-10-16T08:31', responsable: 'u1',
      lta: '071-30055902', vol: 'ET 0921', compagnie: 'k6', eta: '2026-10-21',
      incoterm: 'CPT', poids: 148, colis: 6, unite: 'colis', marchandise: 'Pièces de rechange pour décortiqueuse',
      docs: docs({ packing: false }),
      salleAttente: { envois: ['2026-10-16T08:32'], prochaineRelance: '2026-10-18T08:32' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    }
  ];

  /* ── Ordres de transport ───────────────────────────────────── */
  var ots = {
    'OT-2026-0156': {
      dossier: 'DLG-2026-0412', cree: '2026-10-09T10:58', par: 'u4',
      marchandise: 'Engrais NPK 15-15-15 en sacs de 50 kg', poids: 24600, colis: 492, unite: 'sacs',
      chargement: 'Terminal à conteneurs du Port autonome de Dakar, parc n° 2', livraisonAdresse: 'Entrepôt AIS — Zone industrielle de Mbao, lot 27',
      priseEnCharge: '2026-10-14T08:00', incoterm: 'CIF',
      instructions: "Conteneur 40' — prévoir un porte-conteneur plateau. Déchargement par l'équipe AIS ; présenter le BAS à l'entrée.",
      offres: [
        { transporteur: 't1', envoi: '2026-10-09T11:20', reponse: 'Acceptée', date: '2026-10-09T14:47' },
        { transporteur: 't2', envoi: '2026-10-09T11:20', reponse: 'Offre clôturée', date: '2026-10-09T14:47' }  // C7 : première acceptation
      ],
      camion: { immatriculation: 'DK-4271-BC', chauffeur: 'Mbaye Faye', tel: '+221 77 944 18 62' },
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
      marchandise: 'Arachides décortiquées en sacs de 50 kg', poids: 19200, colis: 384, unite: 'sacs',
      chargement: 'Arachides & Céréales Export — Boulevard de la Libération, entrepôt 12', livraisonAdresse: 'Terminal à conteneurs du Port autonome de Dakar — empotage',
      priseEnCharge: '2026-10-19T07:00', incoterm: 'FOB',
      instructions: 'Sacs de 50 kg, chargement manuel. Bâche obligatoire.',
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
    'DLG-2026-0398': [ { prestation: 'p01', montant: 35000 }, { prestation: 'p02', montant: 85000 }, { prestation: 'p03', montant: 120000 }, { prestation: 'p05', montant: 46200 },
                       { prestation: 'p06', montant: 210000 }, { prestation: 'p07', montant: 2214870 }, { prestation: 'p08', montant: 384264 } ],
    'DLG-2026-0401': [ { prestation: 'p01', montant: 35000 }, { prestation: 'p02', montant: 85000 }, { prestation: 'p03', montant: 160000 }, { prestation: 'p04', montant: 40000 },
                       { prestation: 'p05', montant: 92800 }, { prestation: 'p06', montant: 320000 }, { prestation: 'p07', montant: 3412940 }, { prestation: 'p08', montant: 484671 } ],
    'DLG-2026-0402': [ { prestation: 'p01', montant: 35000 }, { prestation: 'p02', montant: 85000 }, { prestation: 'p03', montant: 130000 }, { prestation: 'p06', montant: 185000 },
                       { prestation: 'p07', montant: 1962310 }, { prestation: 'p08', montant: 442930 } ],
    'DLG-2026-0403': [ { prestation: 'p01', montant: 35000 }, { prestation: 'p02', montant: 85000 }, { prestation: 'p03', montant: 95000 }, { prestation: 'p06', montant: 90000 },
                       { prestation: 'p07', montant: 48600 }, { prestation: 'p08', montant: 126400 } ],
    'DLG-2026-0405': [ { prestation: 'p01', montant: 35000 }, { prestation: 'p02', montant: 85000 }, { prestation: 'p03', montant: 110000 }, { prestation: 'p05', montant: 38500 },
                       { prestation: 'p07', montant: 1286340 }, { prestation: 'p08', montant: 74900 } ],
    'DLG-2026-0407': [ { prestation: 'p01', montant: 35000 }, { prestation: 'p02', montant: 85000 }, { prestation: 'p03', montant: 140000 }, { prestation: 'p04', montant: 40000 },
                       { prestation: 'p05', montant: 87600 }, { prestation: 'p06', montant: 230000 }, { prestation: 'p07', montant: 2905480 }, { prestation: 'p08', montant: 398150 } ],
    'DLG-2026-0412': [
      { prestation: 'p01', montant: 35000 },
      { prestation: 'p02', montant: 85000 },
      { prestation: 'p03', montant: 145000 },
      { prestation: 'p04', montant: 40000 },
      { prestation: 'p05', montant: 118400 },
      { prestation: 'p06', montant: 275000 },
      { prestation: 'p07', montant: 1846213 },
      { prestation: 'p08', montant: 412760 }
    ]
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
    { id: 'n02', date: '2026-10-16T09:05', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0419', lue: false, texte: 'Contrôle physique en cours au terminal — inspecteur P. Mendy.' },
    { id: 'n03', date: '2026-10-15T17:30', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0417', lue: false, texte: 'Contrôle documentaire programmé le 16/10/2026.' },
    { id: 'n04', date: '2026-10-13T16:12', type: 'Confirmation transporteur reçue', dossier: 'DLG-2026-0407', lue: false, texte: "Atlantique Fret Sénégal a accepté l'offre OT-2026-0158." },
    { id: 'n05', date: '2026-10-15T15:22', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0416', lue: false, texte: "Pas de réponse du client depuis 48 h sur le certificat d'origine. Relance envoyée." },
    { id: 'n06', date: '2026-10-15T10:04', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0427', lue: false, texte: 'Instruction douane manquante et mandat absent. Client informé.' },
    { id: 'n07', date: '2026-10-14T11:05', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0415', lue: false, texte: 'Contrôle physique notifié — visite le 16/10/2026 à 14:00.' },
    /* À VALIDER (D14) : déclencheur de cette notification non défini dans le CDC */
    { id: 'n08', date: '2026-10-14T09:40', type: 'Modification de déclaration en attente', dossier: 'DLG-2026-0420', lue: false, texte: 'ETA du navire décalée du 17/10 au 19/10 : déclaration anticipée à mettre à jour.' },
    { id: 'n09', date: '2026-10-14T14:20', type: 'Facture en attente de règlement', dossier: 'DLG-2026-0401', lue: true, texte: 'Acompte de 2 000 000 FCFA reçu. Solde de 2 762 315 FCFA attendu avant le 06/11/2026.' },
    { id: 'n10', date: '2026-10-13T15:22', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0416', lue: false, texte: "Contrôle documentaire : certificat d'origine demandé au client (envoi automatique)." },
    { id: 'n11', date: '2026-10-12T16:40', type: 'BAS obtenu → basculement facturation', dossier: 'DLG-2026-0412', lue: true, texte: 'BAS 2026-BAS-051907 saisi par Awa Ndiaye. Le dossier passe en facturation.' },
    { id: 'n12', date: '2026-10-09T15:05', type: 'Facture en attente de règlement', dossier: 'DLG-2026-0402', lue: false, texte: 'Facture FAC-2026-0193 émise. Règlement attendu avant le 08/11/2026.' },
    { id: 'n13', date: '2026-10-09T14:47', type: 'Confirmation transporteur reçue', dossier: 'DLG-2026-0412', lue: true, texte: "Téranga Fret Express a accepté l'offre OT-2026-0156." },
    { id: 'n14', date: '2026-10-06T10:31', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0412', lue: true, texte: 'Contrôle physique notifié — visite le 07/10/2026.' }
  ];

  /* ── Messagerie du fil rouge (CDC §7.6 : entrant, sortant, auto, logistique) ── */
  var messages = {
    'DLG-2026-0412': [
      { id: 'm1', date: '2026-09-29T09:14', categorie: 'entrant', de: 'Mariama Diouf <m.diouf@agro-sine.sn>', a: 'dossiers@doualog.sn',
        objet: 'Import engrais NPK — MSC Ilaria — documents',
        corps: "Bonjour,\n\nVeuillez trouver ci-joint les documents de notre import d'engrais NPK, arrivée prévue sur le MSC Ilaria le 05/10.\nPrestations souhaitées : dédouanement complet et livraison à notre entrepôt de la zone industrielle.\nPrix cible pour vos prestations : 700 000 FCFA HT.\n\nCordialement,\nMariama Diouf\nResponsable achats — Agro-Industries du Sine",
        pj: ['Facture_commerciale_INV-88214.pdf', 'Packing_list_PL-88214.pdf', 'Instruction_douane_AIS.pdf', 'BL_MEDUDK482093.pdf', 'Bon_de_livraison_MSC.pdf', 'Certificat_origine_CO-5521.pdf'] },
      { id: 'm2', date: '2026-09-29T09:15', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.sn>', a: 'm.diouf@agro-sine.sn',
        objet: '[DLG-2026-0412] Accusé de réception de votre envoi', corps: 'Accusé de réception — voir X01.', pj: [] },
      { id: 'm3', date: '2026-10-03T08:12', categorie: 'logistique', de: 'MSC — Agence <import.export@msc-agence.bj>', a: 'dossiers@doualog.sn',
        objet: "Avis d'arrivée — MSC Ilaria — BL MEDUDK482093", corps: "Arrivée confirmée le 05/10/2026. Conteneur MSCU 4120936-2 (40').", pj: ['Avis_arrivee_MEDUDK482093.pdf'] },
      { id: 'm4', date: '2026-10-06T10:40', categorie: 'sortant', de: 'Awa Ndiaye <dossiers@doualog.sn>', a: 'm.diouf@agro-sine.sn',
        objet: '[DLG-2026-0412] Contrôle physique programmé le 07/10',
        corps: "Madame,\n\nLa douane a notifié un contrôle physique de votre conteneur MSCU 4120936-2 le 07/10/2026. Nous y assisterons pour votre compte ; aucune action n'est requise de votre part.\n\nBien cordialement,\nAwa Ndiaye — Déclarante douane", pj: [] },
      { id: 'm5', date: '2026-10-08T17:05', categorie: 'sortant', de: 'Awa Ndiaye <dossiers@doualog.sn>', a: 'm.diouf@agro-sine.sn',
        objet: '[DLG-2026-0412] Contrôle conforme', corps: 'Madame,\n\nLe contrôle physique est terminé et conforme. Nous poursuivons les formalités pour obtenir le bon à enlever.\n\nBien cordialement,\nAwa Ndiaye', pj: [] },
      { id: 'm6', date: '2026-10-09T15:02', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.sn>', a: 'm.diouf@agro-sine.sn',
        objet: '[DLG-2026-0412] Bon à enlever obtenu', corps: 'Mise à jour du suivi de votre dossier.', pj: ['BAE_2026-BAE-048213.pdf'] },
      { id: 'm7', date: '2026-10-12T16:41', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.sn>', a: 'm.diouf@agro-sine.sn',
        objet: '[DLG-2026-0412] Bon à sortir obtenu', corps: 'Mise à jour du suivi de votre dossier.', pj: ['BAS_2026-BAS-051907.pdf'] },
      { id: 'm8', date: '2026-10-16T07:58', categorie: 'entrant', de: 'Mariama Diouf <m.diouf@agro-sine.sn>', a: 'dossiers@doualog.sn',
        objet: 'RE: [DLG-2026-0412] Bon à sortir obtenu', corps: "Bonjour,\n\nPouvez-vous nous confirmer l'heure d'arrivée du camion ? Notre équipe de déchargement est disponible jusqu'à 17 h.\n\nMerci,\nM. Diouf", pj: [] },
      { id: 'm9', date: '2026-10-16T08:20', categorie: 'sortant', de: 'Seydou Camara <dossiers@doualog.sn>', a: 'm.diouf@agro-sine.sn',
        objet: 'RE: [DLG-2026-0412] Bon à sortir obtenu', corps: "Madame,\n\nLe camion DK-4271-BC a quitté le port à 07:40. Arrivée prévue à votre entrepôt vers 10:30.\n\nBien cordialement,\nSeydou Camara — Service transport", pj: [] }
    ]
  };

  /* ── Journal du fil rouge (CDC §13.2) ─────────────────────── */
  var historique = {
    'DLG-2026-0412': [
      { date: '2026-09-29T09:14', acteur: 'Système',  type: 'creation', texte: 'Dossier créé à partir de l’email de m.diouf@agro-sine.sn (6 pièces jointes). Type : Import.' },
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
      { date: '2026-10-09T11:20', acteur: 'Seydou Camara',  type: 'transport', texte: 'Offre envoyée à Téranga Fret Express et Atlantique Fret Sénégal. Transport : À confirmer.' },
      { date: '2026-10-09T14:47', acteur: 'Téranga Fret Express (lien)', type: 'lien', texte: 'Offre acceptée. Transport : Confirmé. Offre clôturée pour Atlantique Fret Sénégal.' },
      { date: '2026-10-12T16:40', acteur: 'Awa Ndiaye', type: 'statut', texte: 'BAS 2026-BAS-051907 obtenu. Statut : BAS obtenu.' },
      { date: '2026-10-12T16:40', acteur: 'Système',  type: 'statut',   texte: 'Basculement automatique en facturation. Statut : En facturation.' },
      { date: '2026-10-13T09:10', acteur: 'Client (lien personnel)', type: 'lien', texte: 'Consultation du suivi et téléchargement de BAE_2026-BAE-048213.pdf.' },
      { date: '2026-10-14T09:30', acteur: 'Téranga Fret Express (lien)', type: 'lien', texte: 'Camion DK-4271-BC, chauffeur Mbaye Faye. Transport : Camion affecté.' },
      { date: '2026-10-15T14:10', acteur: 'Téranga Fret Express (lien)', type: 'lien', texte: 'Transport : Chargement.' },
      { date: '2026-10-16T07:40', acteur: 'Téranga Fret Express (lien)', type: 'lien', texte: 'Transport : En route.' },
      { date: '2026-10-16T07:58', acteur: 'Système',  type: 'email',    texte: 'Email du client rattaché au dossier.' },
      { date: '2026-10-16T08:20', acteur: 'Seydou Camara',  type: 'email', texte: 'Email envoyé au client : heure d’arrivée du camion.' }
    ]
  };

  /* ── Navigation interne et accès par rôle (image client + CDC §02) ───────
     Entrées dans l'ordre de l'image. horsV1 : visibles mais inactives.
     À VALIDER : « Facturation » (E06, MUST) n'apparaît pas dans l'image — ajoutée entre Documents et Messagerie.
     Accueil : E07 (Rapports) pour Manager et Direction, E01 pour les autres profils.
     À VALIDER : pas de matrice des droits détaillée (US-45), répartition déduite du tableau §02.
     Direction = mêmes entrées que le Manager, en lecture seule. */
  var navigation = [
    { id: 'tableau',       label: 'Tableau de bord', icone: 'dashboard', href: 'E01-tableau-de-bord.html' },
    { id: 'dossiers',      label: 'Dossiers',        icone: 'dossiers',  href: 'E01-tableau-de-bord.html#liste' },
    { id: 'transport',     label: 'Transport',       icone: 'transport', href: 'E05-annuaire-transporteurs.html' },
    { id: 'mandats',       label: 'Mandats',         icone: 'mandat',    horsV1: true },
    { id: 'clients',       label: 'Clients',         icone: 'clients',   horsV1: true },
    { id: 'documents',     label: 'Documents',       icone: 'document',  horsV1: true },
    { id: 'facturation',   label: 'Facturation',     icone: 'facture',   href: 'E06-facturation.html' },
    { id: 'messagerie',    label: 'Messagerie',      icone: 'mail',      horsV1: true },
    { id: 'notifications', label: 'Notifications',   icone: 'bell',      href: 'E08-notifications.html' },
    { id: 'rapports',      label: 'Rapports',        icone: 'rapport',   href: 'E07-dashboard-manager.html' },
    { id: 'parametres',    label: 'Paramètres',      icone: 'settings',  horsV1: true }
  ];
  var horsV1 = ['mandats', 'clients', 'documents', 'messagerie', 'parametres'];
  var acces = {
    declarant:   { nav: ['tableau', 'dossiers', 'notifications'].concat(horsV1), utilisateur: 'u1' },
    operateur:   { nav: ['tableau', 'dossiers', 'transport', 'notifications'].concat(horsV1), utilisateur: 'u3' },
    transport:   { nav: ['tableau', 'dossiers', 'transport', 'notifications'].concat(horsV1), utilisateur: 'u4' },
    facturation: { nav: ['tableau', 'dossiers', 'facturation', 'notifications'].concat(horsV1), utilisateur: 'u5' },
    manager:     { nav: ['tableau', 'dossiers', 'transport', 'facturation', 'notifications', 'rapports'].concat(horsV1), utilisateur: 'u6', accueil: 'E07-dashboard-manager.html' },
    direction:   { nav: ['tableau', 'dossiers', 'transport', 'facturation', 'notifications', 'rapports'].concat(horsV1), utilisateur: 'u7', lectureSeule: true, accueil: 'E07-dashboard-manager.html' }
  };

  /* Emails entrants pas encore lus dans la boîte DOUALOG (compteur « messages » du header) */
  var emailsNonLus = [
    { date: '2026-10-16T09:41', dossier: 'DLG-2026-0416', de: 'achats@btcv.sn',               objet: "RE: [DLG-2026-0416] Certificat d'origine" },
    { date: '2026-10-16T09:12', dossier: 'DLG-2026-0426', de: 'appro@boissons-petitecote.sn', objet: 'RE: [DLG-2026-0426] Documents manquants — BL' },
    { date: '2026-10-16T08:47', dossier: 'DLG-2026-0410', de: 'logistique@pds-pharma.sn',     objet: '[DLG-2026-0410] Heure de livraison souhaitée' }
  ];

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
  function fmtMontant(n) { return fmtNombre(n) + NBSP + config.devise; }
  function fmtPoids(kg) { return fmtNombre(kg) + NBSP + 'kg'; }

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
      .concat(d.docs.mandat ? [] : ['mandat'])
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
    var tva = Math.round(ht * config.tva);
    return { ht: ht, tva: tva, debours: debours, ttc: ht + tva + debours };
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
    for (k in (p.dossiers || {})) { var d = dossier(k); if (d) for (var c in p.dossiers[k]) d[c] = p.dossiers[k][c]; }
    for (k in (p.ots || {})) ots[k] = p.ots[k];
    for (k in (p.transporteurs || {})) transporteurs[k] = p.transporteurs[k];
    if (p.compteurs) { if (p.compteurs.ot) prochainNumeroOT = p.compteurs.ot; if (p.compteurs.fac) prochainNumeroFacture = p.compteurs.fac; }
    if (p.notifications) notifications.forEach(function (n) { if (p.notifications[n.id]) n.lue = true; });
  })();
  var CHAMPS_SAUVES = ['statut', 'docs', 'bae', 'bas', 'facture', 'transport', 'livraison', 'salleAttente'];
  function sauverDossier(d) { var o = {}; CHAMPS_SAUVES.forEach(function (c) { o[c] = d[c]; }); ecrireDemo('dossiers', d.id, o); }
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
      reste: (f.montant || t.ttc) - (f.regle || 0), dateBAS: d.bas.date };
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
      'BAE': d.bae ? d.bae.date : null, 'BAS': d.bas ? d.bas.date : null, 'Transport': dateOT('Confirmé'),
      'Livraison': d.livraison, 'Clôture': d.statut === 'Clôturé' && d.facture ? d.facture.dateReglement : null
    };
    return workflow(d).map(function (s) {
      var etat = { done: 'fait', special: 'fait', current: 'en-cours', warning: 'en-cours', danger: 'en-cours', skipped: 'sans-objet', todo: 'a-venir' }[s.etat];
      var note = '';
      if (s.label === 'Contrôle douane' && d.controle) note = d.controle.type === 'Aucun' ? 'Pas de contrôle' : (d.controle.resultat === 'Conforme' ? 'Contrôle terminé, conforme' : d.controle.type === 'Physique' ? 'Visite de la marchandise' : 'Vérification des documents');
      if (s.label === 'Transport' && d.transport && d.transport.statut === 'Pas de livraison') note = 'Sans livraison : enlèvement par vos soins';
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
    d.docs[cle] = true;
    if (enSalleAttente(d) && documentsManquants(d).length === 0) d.statut = 'En cours de traitement';
    sauverDossier(d);
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
    navigation: navigation, acces: acces, emailsNonLus: emailsNonLus, documentsTransport: documentsTransport,
    sauverDossier: sauverDossier, sauverOT: sauverOT, sauverTransporteur: sauverTransporteur,
    reserverNumeroOT: reserverNumeroOT, reserverNumeroFacture: reserverNumeroFacture, numeroFactureSuivant: numeroFactureSuivant, marquerLue: marquerLue, nonLues: nonLues,
    facture: facture, typesNotification: typesNotification,
    statutPublic: statutPublic, etapesPubliques: etapesPubliques, actionsClient: actionsClient, recevoirDocumentClient: recevoirDocumentClient, reinitialiserDemo: reinitialiserDemo, otsTransporteur: otsTransporteur,
    fmt: { date: fmtDate, dateCourte: fmtDateCourte, heure: fmtHeure, dateHeure: fmtDateHeure, nombre: fmtNombre, montant: fmtMontant, poids: fmtPoids },
    esc: esc, badge: badge, dossier: dossier, client: client, responsable: responsable, refTransport: refTransport,
    enSalleAttente: enSalleAttente, alertes: alertes, documentsManquants: documentsManquants,
    tableauDeBord: tableauDeBord, salleAttente: salleAttente, relances: relances, totaux: totaux, workflow: workflow
  };
})();
