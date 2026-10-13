/* ══════════════════════════════════════════════════════════════
   DOUALOG Control Tower — Jeu de données commun des maquettes
   Validé à l'étape 0 (cadrage/etape-0-cadrage.md §4). Toutes les données sont fictives.
   Un même dossier a le même client, BL, statut sur tous les écrans : ne jamais dupliquer
   ces valeurs dans une page, toujours les lire ici.
   ══════════════════════════════════════════════════════════════ */
(function () {

  /* ── Configuration pays — À VALIDER (QUESTIONS-ONCLE.md §1) ─── */
  var config = {
    aujourdhui: '2026-10-16T10:15',      // vendredi 16/10/2026 — date fictive de la démo
    pays: 'Bénin',                       // À VALIDER — provisoire (le N° IFU oriente vers le Bénin)
    ville: 'Cotonou',                    // À VALIDER
    port: 'Port autonome de Cotonou',    // À VALIDER
    aeroport: 'Aéroport de Cotonou',     // À VALIDER
    devise: 'FCFA',                      // À VALIDER (XOF / XAF)
    tva: 0.18,                           // À VALIDER
    boiteEmail: 'dossiers@doualog.com',  // À VALIDER — adresse de la boîte surveillée
    dureeLienClientJours: 30,            // À VALIDER (D11)
    frequenceRelanceJours: 2             // À VALIDER (D11)
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
    u1: { nom: 'Rachida Adjovi',    initiales: 'RA', role: 'declarant' },
    u2: { nom: 'Koffi Mensah',      initiales: 'KM', role: 'declarant' },
    u3: { nom: 'Serge Houngbo',     initiales: 'SH', role: 'operateur' },
    u4: { nom: 'Josué Agossou',     initiales: 'JA', role: 'transport' },
    u5: { nom: 'Aminata Sow',       initiales: 'AS', role: 'facturation' },
    u6: { nom: 'Paul Dossou',       initiales: 'PD', role: 'manager' },
    u7: { nom: 'Hélène Ahouansou',  initiales: 'HA', role: 'direction' }
  };

  /* ── Clients (base centralisée, CDC §11.4) ─────────────────── */
  var clients = {
    c01: { nom: 'Agro-Industrie du Littoral', sigle: 'AIL', ifu: '3201100487215', adresse: 'Zone industrielle, lot 27', contact: 'Bernadette Akplogan', email: 'b.akplogan@ail-industrie.com', mandat: { valide: true, jusquau: '2026-12-31' } },
    c02: { nom: 'Pharmadis Afrique', ifu: '3201300921847', adresse: 'Immeuble Les Cocotiers, 3e étage', contact: 'Serge Tossou', email: 'logistique@pharmadis-afrique.com', mandat: { valide: true, jusquau: '2027-03-31' } },
    c03: { nom: 'BTP Horizon', ifu: '3201601154390', adresse: 'Route des Pêches, parcelle 214', contact: 'Marcel Dègbo', email: 'achats@btp-horizon.com', mandat: { valide: true, jusquau: '2027-01-15' } },
    c04: { nom: 'Comptoir Textile du Golfe', ifu: '3200900376128', adresse: 'Marché Dantokpa, bâtiment C', contact: 'Nafissatou Bello', email: 'export@ctg-textile.com', mandat: { valide: true, jusquau: '2026-11-30' } },
    c05: { nom: 'Boissons du Delta', ifu: '3201200665031', adresse: 'Zone franche industrielle, îlot 9', contact: 'Hervé Sossa', email: 'appro@boissons-delta.com', mandat: { valide: true, jusquau: '2027-06-30' } },
    c06: { nom: 'Électro Plus Distribution', ifu: '3201800213569', adresse: 'Avenue Steinmetz, n° 48', contact: 'Ismaël Yessoufou', email: 'import@electroplus-distribution.com', mandat: { valide: true, jusquau: '2027-02-28' } },
    c07: { nom: "Société Cotonnière de l'Ouest", sigle: 'SCO', ifu: '3200700098746', adresse: 'Route de Parakou, km 4', contact: 'Gaston Houéto', email: 'export@sco-coton.com', mandat: { valide: true, jusquau: '2026-12-31' } },
    c08: { nom: 'Cacao & Café Export', ifu: '3201500874402', adresse: 'Boulevard du Port, entrepôt 12', contact: 'Rita Codjia', email: 'operations@cacaocafe-export.com', mandat: { valide: true, jusquau: '2027-04-30' } },
    c09: { nom: 'Éts Kora & Fils', ifu: '1198803456712', adresse: 'Quartier Gbégamey, rue 1042', contact: 'Abdou Kora', email: 'contact@kora-fils.com', mandat: { valide: true, jusquau: '2026-12-31' } },
    c10: { nom: 'Medilab Équipements', ifu: '3201900542187', adresse: 'Rue du Gouverneur, villa 7', contact: 'Aline Gnonlonfoun', email: 'commandes@medilab-equipements.com', mandat: { valide: true, jusquau: '2027-05-31' } },
    c11: { nom: 'Anacarde Trading', ifu: '3202200031945', adresse: 'Zone portuaire, magasin 31', contact: 'Moussa Traoré', email: 'trading@anacarde-trading.com', mandat: { valide: false, jusquau: null } },
    c12: { nom: 'AutoParts Pro', ifu: '3202000718263', adresse: 'Carrefour Saint-Michel, local 5', contact: 'Yannick Agbo', email: 'contact@autoparts-pro.com', mandat: { valide: true, jusquau: '2027-01-31' } }
  };

  /* ── Annuaire transporteurs (US-27 — champs minimaux, D15 À VALIDER) ── */
  var transporteurs = {
    t1: { nom: 'Trans-Express Logistique', contact: 'Éric Dossa',          email: 'exploitation@transexpress-logistique.com', tel: '+229 01 96 12 40 87' },
    t2: { nom: 'Atlantic Fret',            contact: 'Jean-Baptiste Houndé', email: 'fret@atlantic-fret.com',                  tel: '+229 01 97 55 21 03' },
    t3: { nom: 'Routes du Sahel Transport',contact: 'Issa Mahamadou',      email: 'contact@routesdusahel.com',               tel: '+229 01 66 08 74 19' },
    t4: { nom: 'TLM Transports',           contact: 'Lucien Mêtongnon',    email: 'exploitation@tlm-transports.com',         tel: '+229 01 95 33 60 28' },
    t5: { nom: 'Rapid Cargo Services',     contact: 'Clarisse Ahyi',       email: 'ops@rapidcargo-services.com',             tel: '+229 01 61 47 92 05' },
    t6: { nom: 'Camions du Port',          contact: 'Rodrigue Avocè',      email: 'dispatch@camionsduport.com',              tel: '+229 01 90 28 13 66' }
  };

  /* ── Répertoire des compagnies (US-17) — adresses À VALIDER ── */
  var compagnies = {
    k1: { nom: 'MSC',               mode: 'Maritime', email: 'import.export@msc-agence.bj' },
    k2: { nom: 'Maersk',            mode: 'Maritime', email: 'documentation@maersk-agence.bj' },
    k3: { nom: 'CMA CGM',           mode: 'Maritime', email: 'agence@cmacgm-agence.bj' },
    k4: { nom: 'Grimaldi',          mode: 'Maritime', email: 'booking@grimaldi-agence.bj' },
    k5: { nom: 'Air France Cargo',  mode: 'Aérien',   email: 'fret@afcargo-agence.bj' },
    k6: { nom: 'Ethiopian Cargo',   mode: 'Aérien',   email: 'cargo@ethiopian-agence.bj' }
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
      bl: 'MEDUBJ471530', conteneur: 'MSCU 7718302-4', navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-09-24',
      incoterm: 'CIF', poids: 18640, colis: 1120, unite: 'cartons', marchandise: 'Bouteilles en verre vides',
      docs: docs({}),
      declStockee: '2026-09-23T09:10', declAnticipee: '2026-09-24T11:25',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-046901', date: '2026-09-26' }, bas: { num: '2026-BAS-050118', date: '2026-09-28' },
      transport: { statut: 'Livré', ot: 'OT-2026-0141', transporteur: 't4' }, livraison: '2026-09-30',
      facture: { num: 'FAC-2026-0187', statut: 'Réglé', montant: 3184650, emise: '2026-10-01', echeance: '2026-10-31', regle: 3184650, dateReglement: '2026-10-12' }
    },
    {
      id: 'DLG-2026-0401', type: 'Import', mode: 'Maritime', client: 'c03', statut: 'Facturé',
      reception: '2026-09-23T10:12', responsable: 'u1',
      bl: 'MAEU238104771', conteneur: 'MRKU 4410927-3', navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-09-27',
      incoterm: 'CFR', poids: 26300, colis: 64, unite: 'bottes', marchandise: 'Fers à béton HA12',
      docs: docs({}),
      declStockee: '2026-09-24T14:02', declAnticipee: '2026-09-26T10:48',
      controle: { type: 'Documentaire', notification: '2026-09-29', date: '2026-09-30', fin: '2026-09-30', inspecteur: 'B. Zinsou', resultat: 'Conforme', commentaire: 'Concordance facture / déclaration vérifiée.' },
      bae: { num: '2026-BAE-047352', date: '2026-10-02' }, bas: { num: '2026-BAS-050644', date: '2026-10-05' },
      transport: { statut: 'Chargement', ot: 'OT-2026-0150', transporteur: 't3' }, livraison: null,
      facture: { num: 'FAC-2026-0191', statut: 'Partiellement réglé', montant: 4762315, emise: '2026-10-07', echeance: '2026-11-06', regle: 2000000, dateReglement: '2026-10-14' }
    },
    {
      id: 'DLG-2026-0402', type: 'Export', mode: 'Maritime', client: 'c07', statut: 'Facturé',
      reception: '2026-09-24T09:05', responsable: 'u2',
      booking: 'GRI-26-AB4471', bl: 'GRIBJ2609117', conteneur: 'GRIU 3305281-0', navire: 'Grande Lagos', compagnie: 'k4', eta: '2026-09-30',
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
      incoterm: 'FCA', poids: 1240, colis: 38, unite: 'colis', marchandise: 'Pagnes wax imprimés',
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
      bl: 'CMDUCTN2208741', conteneur: 'CMAU 5530174-8', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-02',
      incoterm: 'FOB', poids: 9870, colis: 412, unite: 'cartons', marchandise: 'Climatiseurs split',
      docs: docs({}),
      declStockee: '2026-09-29T16:12', declAnticipee: '2026-10-01T10:30',
      controle: { type: 'Physique', notification: '2026-10-06', date: '2026-10-08', fin: '2026-10-09', inspecteur: 'C. Akpovi', resultat: 'Conforme', commentaire: 'Comptage de 40 cartons sur 412, conforme au packing list.' },
      bae: { num: '2026-BAE-048596', date: '2026-10-13' }, bas: { num: '2026-BAS-052614', date: '2026-10-16' },
      transport: { statut: 'Camion affecté', ot: 'OT-2026-0158', transporteur: 't2' }, livraison: null,
      facture: null   // BAS saisi à 09:58 : basculement en facturation en cours (statut transitoire, C2)
    },
    {
      id: 'DLG-2026-0410', type: 'Import', mode: 'Maritime', client: 'c02', statut: 'BAE obtenu',
      reception: '2026-09-28T09:40', responsable: 'u2',
      bl: 'MEDUBJ476822', conteneur: 'MSDU 2290413-5', navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-10-05',
      incoterm: 'CIP', poids: 7420, colis: 22, unite: 'palettes', marchandise: 'Médicaments génériques',
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-09-30T11:15', declAnticipee: '2026-10-02T14:50',
      controle: { type: 'Aucun' },
      bae: { num: '2026-BAE-048877', date: '2026-10-14' }, bas: null,
      transport: { statut: 'Confirmé', ot: 'OT-2026-0160', transporteur: 't1' }, livraison: null,
      facture: null
    },
    /* ★ Dossier fil rouge de la démo */
    {
      id: 'DLG-2026-0412', filRouge: true, type: 'Import', mode: 'Maritime', client: 'c01', statut: 'En facturation',
      reception: '2026-09-29T09:14', responsable: 'u1',
      bl: 'MEDUBJ482093', conteneur: 'MSCU 4120936-2', typeConteneur: "40'", navire: 'MSC Ilaria', compagnie: 'k1', eta: '2026-10-05',
      incoterm: 'CIF', poids: 24600, colis: 492, unite: 'sacs', marchandise: 'Engrais NPK 15-15-15 en sacs de 50 kg',
      prestationsDemandees: ['p01', 'p02', 'p03', 'p06'], prixCible: 700000,
      docs: docs({ certificatOrigine: true }),
      declStockee: '2026-10-01T10:32', declAnticipee: '2026-10-03T16:05',
      controle: { type: 'Physique', notification: '2026-10-06', date: '2026-10-07', fin: '2026-10-08', inspecteur: 'R. Gbaguidi', resultat: 'Conforme', commentaire: 'Vérification du poids et du marquage des sacs : conforme au manifeste.' },
      bae: { num: '2026-BAE-048213', date: '2026-10-09' }, bas: { num: '2026-BAS-051907', date: '2026-10-12' },
      transport: { statut: 'En route', ot: 'OT-2026-0156', transporteur: 't1' }, livraison: null,
      facture: { num: null, statut: 'En facturation' },
      lienClient: { cree: '2026-09-29T09:15', expire: '2026-10-29', actif: true, consultations: 3 }
    },
    {
      id: 'DLG-2026-0413', type: 'Export', mode: 'Maritime', client: 'c08', statut: 'BAE obtenu',
      reception: '2026-09-30T08:58', responsable: 'u2',
      booking: 'MSC-BK-26118402', conteneur: 'MEDU 6031187-4', navire: 'MSC Bianca', compagnie: 'k1', eta: '2026-10-20',
      incoterm: 'FOB', poids: 19200, colis: 300, unite: 'sacs', marchandise: 'Fèves de cacao en sacs de jute',
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
      bl: 'CMDUCTN2211906', conteneur: 'CMAU 8817265-1', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-09',
      incoterm: 'CFR', poids: 6230, colis: 186, unite: 'colis', marchandise: 'Pièces détachées automobiles',
      docs: docs({}),
      declStockee: '2026-10-05T09:50', declAnticipee: '2026-10-07T11:05',
      controle: { type: 'Physique', notification: '2026-10-14', date: '2026-10-16', fin: null, inspecteur: 'R. Gbaguidi', resultat: 'En cours', commentaire: 'Visite programmée au terminal à 14:00.' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0416', type: 'Import', mode: 'Maritime', client: 'c03', statut: 'Info manquante',
      reception: '2026-10-02T10:20', responsable: 'u2',
      bl: 'MAEU238559024', conteneur: 'MSKU 9902314-6', navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-10-10',
      incoterm: 'CIF', poids: 21450, colis: 1430, unite: 'cartons', marchandise: 'Carreaux céramique',
      docs: docs({ certificatOrigine: false }),
      declStockee: '2026-10-06T14:25', declAnticipee: '2026-10-09T09:15',
      controle: { type: 'Documentaire', notification: '2026-10-12', date: '2026-10-13', fin: null, inspecteur: 'B. Zinsou', resultat: 'Info manquante', commentaire: "Certificat d'origine requis pour appliquer le tarif préférentiel.", demandeEnvoyee: '2026-10-13T15:22' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0417', type: 'Export', mode: 'Aérien', client: 'c02', statut: 'Contrôle documentaire en cours',
      reception: '2026-10-03T09:48', responsable: 'u1',
      booking: 'ET-BK-552094', lta: '071-30041276', vol: 'ET 0938', compagnie: 'k6', eta: '2026-10-19',
      incoterm: 'CPT', poids: 845, colis: 31, unite: 'colis', marchandise: 'Produits pharmaceutiques (réexpédition)',
      docs: docs({ bl: false, bonLivraison: false, certificatOrigine: true }),
      declStockee: '2026-10-08T10:40', declAnticipee: '2026-10-12T15:10',
      controle: { type: 'Documentaire', notification: '2026-10-15', date: '2026-10-16', fin: null, inspecteur: 'M. Kiki', resultat: 'En cours', commentaire: '' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0419', type: 'Import', mode: 'Maritime', client: 'c06', statut: 'Contrôle physique en cours',
      reception: '2026-10-05T11:02', responsable: 'u2',
      bl: 'CMDUCTN2213358', conteneur: 'CMAU 6624011-9', navire: 'CMA CGM Okapi', compagnie: 'k3', eta: '2026-10-11',
      incoterm: 'FOB', poids: 8115, colis: 640, unite: 'cartons', marchandise: 'Téléviseurs LED et accessoires',
      docs: docs({}),
      declStockee: '2026-10-07T16:05', declAnticipee: '2026-10-10T10:20',
      controle: { type: 'Physique', notification: '2026-10-15', date: '2026-10-16', fin: null, inspecteur: 'A. Hounsou', resultat: 'En cours', commentaire: 'Dépotage partiel en cours au terminal.' },
      bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0420', type: 'Import', mode: 'Maritime', client: 'c09', statut: 'Déclaration anticipée',
      reception: '2026-10-06T08:30', responsable: 'u1',
      bl: 'MEDUBJ490155', conteneur: 'MSCU 5502871-3', navire: 'MSC Bianca', compagnie: 'k1', eta: '2026-10-19',
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
      bl: 'MEDUBJ493308', conteneur: 'MSCU 4135520-7', navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-10-26',
      incoterm: 'CIF', poids: 12400, colis: 496, unite: 'sacs', marchandise: 'Semences de maïs certifiées',
      docs: docs({ certificatOrigine: true }),
      declStockee: null, declAnticipee: null,
      controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    /* Salle d'attente — dossiers incomplets */
    {
      id: 'DLG-2026-0426', type: 'Import', mode: 'Maritime', client: 'c05', statut: 'En attente de documents',
      reception: '2026-10-14T08:15', responsable: 'u2',
      bl: null, conteneur: null, navire: 'MSC Lorena', compagnie: 'k1', eta: '2026-10-28',
      incoterm: 'CIF', poids: 3900, colis: 260, unite: 'cartons', marchandise: 'Capsules et étiquettes',
      docs: docs({ bl: false, bonLivraison: false }),
      salleAttente: { relances: ['2026-10-14T08:16', '2026-10-16T08:16'], prochaineRelance: '2026-10-18T08:16' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0427', type: 'Export', mode: 'Maritime', client: 'c11', statut: 'En attente de documents',
      reception: '2026-10-15T10:02', responsable: 'u1',
      booking: 'MAE-BK-26-771904', conteneur: null, navire: 'Maersk Kalmar', compagnie: 'k2', eta: '2026-10-27',
      incoterm: 'FOB', poids: 25000, colis: 312, unite: 'sacs', marchandise: 'Noix de cajou brutes',
      docs: docs({ instruction: false, bl: false, bonLivraison: false, mandat: false }),
      salleAttente: { relances: ['2026-10-15T10:03'], prochaineRelance: '2026-10-17T10:03', mandatDemande: '2026-10-15T10:03' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    },
    {
      id: 'DLG-2026-0428', type: 'Import', mode: 'Aérien', client: 'c09', statut: 'En attente de documents',
      reception: '2026-10-16T08:31', responsable: 'u1',
      lta: '071-30055902', vol: 'ET 0921', compagnie: 'k6', eta: '2026-10-21',
      incoterm: 'CPT', poids: 148, colis: 6, unite: 'colis', marchandise: 'Pièces de rechange pour décortiqueuse',
      docs: docs({ packing: false }),
      salleAttente: { relances: ['2026-10-16T08:32'], prochaineRelance: '2026-10-18T08:32' },
      declStockee: null, declAnticipee: null, controle: null, bae: null, bas: null, transport: null, livraison: null, facture: null
    }
  ];

  /* ── Ordres de transport ───────────────────────────────────── */
  var ots = {
    'OT-2026-0156': {
      dossier: 'DLG-2026-0412', cree: '2026-10-09T10:58', par: 'u4',
      marchandise: 'Engrais NPK 15-15-15 en sacs de 50 kg', poids: 24600, colis: 492, unite: 'sacs',
      chargement: 'Terminal à conteneurs du port, parc n° 2', livraisonAdresse: 'Entrepôt AIL — Zone industrielle, lot 27',
      priseEnCharge: '2026-10-14T08:00', incoterm: 'CIF',
      instructions: "Conteneur 40' — prévoir un porte-conteneur plateau. Déchargement par l'équipe AIL ; présenter le BAS à l'entrée.",
      offres: [
        { transporteur: 't1', envoi: '2026-10-09T11:20', reponse: 'Acceptée', date: '2026-10-09T14:47' },
        { transporteur: 't2', envoi: '2026-10-09T11:20', reponse: 'Offre clôturée', date: '2026-10-09T14:47' }  // C7 : première acceptation
      ],
      camion: { immatriculation: 'BH 4271 RB', chauffeur: 'Firmin Kpadé', tel: '+229 01 97 44 18 62' },
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
      marchandise: 'Fèves de cacao en sacs de jute', poids: 19200, colis: 300, unite: 'sacs',
      chargement: 'Cacao & Café Export — Boulevard du Port, entrepôt 12', livraisonAdresse: 'Terminal à conteneurs du port — empotage',
      priseEnCharge: '2026-10-19T07:00', incoterm: 'FOB',
      instructions: 'Sacs de 64 kg, chargement manuel. Bâche obligatoire.',
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

  /* ── Notifications internes (CDC §13.1) — la colonne Alertes compte les non lues ── */
  var notifications = [
    { id: 'n01', date: '2026-10-16T09:58', type: 'BAS obtenu → basculement facturation', dossier: 'DLG-2026-0407', lue: false, texte: 'BAS 2026-BAS-052614 saisi par Koffi Mensah. Le dossier passe en facturation.' },
    { id: 'n02', date: '2026-10-16T09:05', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0419', lue: false, texte: 'Contrôle physique en cours au terminal — inspecteur A. Hounsou.' },
    { id: 'n03', date: '2026-10-15T17:30', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0417', lue: false, texte: 'Contrôle documentaire programmé le 16/10/2026.' },
    { id: 'n04', date: '2026-10-15T16:12', type: 'Confirmation transporteur reçue', dossier: 'DLG-2026-0410', lue: false, texte: "Trans-Express Logistique a accepté l'offre OT-2026-0160." },
    { id: 'n05', date: '2026-10-15T15:22', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0416', lue: false, texte: "Pas de réponse du client depuis 48 h sur le certificat d'origine. Relance envoyée." },
    { id: 'n06', date: '2026-10-15T10:04', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0427', lue: false, texte: 'Instruction douane manquante et mandat absent. Client informé.' },
    { id: 'n07', date: '2026-10-14T11:05', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0415', lue: false, texte: 'Contrôle physique notifié — visite le 16/10/2026 à 14:00.' },
    /* À VALIDER (D14) : déclencheur de cette notification non défini dans le CDC */
    { id: 'n08', date: '2026-10-14T09:40', type: 'Modification de déclaration en attente', dossier: 'DLG-2026-0420', lue: false, texte: 'ETA du navire décalée du 17/10 au 19/10 : déclaration anticipée à mettre à jour.' },
    { id: 'n09', date: '2026-10-14T14:20', type: 'Facture en attente de règlement', dossier: 'DLG-2026-0401', lue: true, texte: 'Acompte de 2 000 000 FCFA reçu. Solde de 2 762 315 FCFA attendu avant le 06/11/2026.' },
    { id: 'n10', date: '2026-10-13T15:22', type: 'Documents complémentaires requis', dossier: 'DLG-2026-0416', lue: false, texte: "Contrôle documentaire : certificat d'origine demandé au client (envoi automatique)." },
    { id: 'n11', date: '2026-10-12T16:40', type: 'BAS obtenu → basculement facturation', dossier: 'DLG-2026-0412', lue: true, texte: 'BAS 2026-BAS-051907 saisi par Rachida Adjovi. Le dossier passe en facturation.' },
    { id: 'n12', date: '2026-10-09T15:05', type: 'Facture en attente de règlement', dossier: 'DLG-2026-0402', lue: false, texte: 'Facture FAC-2026-0193 émise. Règlement attendu avant le 08/11/2026.' },
    { id: 'n13', date: '2026-10-09T14:47', type: 'Confirmation transporteur reçue', dossier: 'DLG-2026-0412', lue: true, texte: "Trans-Express Logistique a accepté l'offre OT-2026-0156." },
    { id: 'n14', date: '2026-10-06T10:31', type: 'Contrôle douane programmé ou en cours', dossier: 'DLG-2026-0412', lue: true, texte: 'Contrôle physique notifié — visite le 07/10/2026.' }
  ];

  /* ── Messagerie du fil rouge (CDC §7.6 : entrant, sortant, auto, logistique) ── */
  var messages = {
    'DLG-2026-0412': [
      { id: 'm1', date: '2026-09-29T09:14', categorie: 'entrant', de: 'Bernadette Akplogan <b.akplogan@ail-industrie.com>', a: 'dossiers@doualog.com',
        objet: 'Import engrais NPK — MSC Ilaria — documents',
        corps: "Bonjour,\n\nVeuillez trouver ci-joint les documents de notre import d'engrais NPK, arrivée prévue sur le MSC Ilaria le 05/10.\nPrestations souhaitées : dédouanement complet et livraison à notre entrepôt de la zone industrielle.\nPrix cible pour vos prestations : 700 000 FCFA HT.\n\nCordialement,\nBernadette Akplogan\nResponsable achats — Agro-Industrie du Littoral",
        pj: ['Facture_commerciale_INV-88214.pdf', 'Packing_list_PL-88214.pdf', 'Instruction_douane_AIL.pdf', 'BL_MEDUBJ482093.pdf', 'Bon_de_livraison_MSC.pdf', 'Certificat_origine_CO-5521.pdf'] },
      { id: 'm2', date: '2026-09-29T09:15', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.com>', a: 'b.akplogan@ail-industrie.com',
        objet: '[DLG-2026-0412] Accusé de réception de votre envoi', corps: 'Accusé de réception — voir X01.', pj: [] },
      { id: 'm3', date: '2026-10-03T08:12', categorie: 'logistique', de: 'MSC — Agence <import.export@msc-agence.bj>', a: 'dossiers@doualog.com',
        objet: "Avis d'arrivée — MSC Ilaria — BL MEDUBJ482093", corps: "Arrivée confirmée le 05/10/2026. Conteneur MSCU 4120936-2 (40').", pj: ['Avis_arrivee_MEDUBJ482093.pdf'] },
      { id: 'm4', date: '2026-10-06T10:40', categorie: 'sortant', de: 'Rachida Adjovi <dossiers@doualog.com>', a: 'b.akplogan@ail-industrie.com',
        objet: '[DLG-2026-0412] Contrôle physique programmé le 07/10',
        corps: "Madame,\n\nLa douane a notifié un contrôle physique de votre conteneur MSCU 4120936-2 le 07/10/2026. Nous y assisterons pour votre compte ; aucune action n'est requise de votre part.\n\nBien cordialement,\nRachida Adjovi — Déclarante douane", pj: [] },
      { id: 'm5', date: '2026-10-08T17:05', categorie: 'sortant', de: 'Rachida Adjovi <dossiers@doualog.com>', a: 'b.akplogan@ail-industrie.com',
        objet: '[DLG-2026-0412] Contrôle conforme', corps: 'Madame,\n\nLe contrôle physique est terminé et conforme. Nous poursuivons les formalités pour obtenir le bon à enlever.\n\nBien cordialement,\nRachida Adjovi', pj: [] },
      { id: 'm6', date: '2026-10-09T15:02', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.com>', a: 'b.akplogan@ail-industrie.com',
        objet: '[DLG-2026-0412] Bon à enlever obtenu', corps: 'Mise à jour du suivi de votre dossier.', pj: ['BAE_2026-BAE-048213.pdf'] },
      { id: 'm7', date: '2026-10-12T16:41', categorie: 'auto', de: 'DOUALOG <dossiers@doualog.com>', a: 'b.akplogan@ail-industrie.com',
        objet: '[DLG-2026-0412] Bon à sortir obtenu', corps: 'Mise à jour du suivi de votre dossier.', pj: ['BAS_2026-BAS-051907.pdf'] },
      { id: 'm8', date: '2026-10-16T07:58', categorie: 'entrant', de: 'Bernadette Akplogan <b.akplogan@ail-industrie.com>', a: 'dossiers@doualog.com',
        objet: 'RE: [DLG-2026-0412] Bon à sortir obtenu', corps: "Bonjour,\n\nPouvez-vous nous confirmer l'heure d'arrivée du camion ? Notre équipe de déchargement est disponible jusqu'à 17 h.\n\nMerci,\nB. Akplogan", pj: [] },
      { id: 'm9', date: '2026-10-16T08:20', categorie: 'sortant', de: 'Josué Agossou <dossiers@doualog.com>', a: 'b.akplogan@ail-industrie.com',
        objet: 'RE: [DLG-2026-0412] Bon à sortir obtenu', corps: "Madame,\n\nLe camion BH 4271 RB a quitté le port à 07:40. Arrivée prévue à votre entrepôt vers 10:30.\n\nBien cordialement,\nJosué Agossou — Service transport", pj: [] }
    ]
  };

  /* ── Journal du fil rouge (CDC §13.2) ─────────────────────── */
  var historique = {
    'DLG-2026-0412': [
      { date: '2026-09-29T09:14', acteur: 'Système',  type: 'creation', texte: 'Dossier créé à partir de l’email de b.akplogan@ail-industrie.com (6 pièces jointes). Type : Import.' },
      { date: '2026-09-29T09:14', acteur: 'Système',  type: 'statut',   texte: 'Mandat valide trouvé (jusqu’au 31/12/2026). Documents obligatoires présents. Statut : En cours de traitement.' },
      { date: '2026-09-29T09:15', acteur: 'Système',  type: 'email',    texte: 'Accusé de réception envoyé au client avec son lien personnel (expire le 29/10/2026).' },
      { date: '2026-09-29T09:32', acteur: 'Paul Dossou', type: 'assignation', texte: 'Dossier attribué à Rachida Adjovi.' },
      { date: '2026-09-29T11:47', acteur: 'Client (lien personnel)', type: 'lien', texte: 'Consultation du suivi du dossier.' },
      { date: '2026-10-01T10:32', acteur: 'Rachida Adjovi', type: 'statut', texte: 'Déclaration stockée saisie. Statut : Déclaration stockée.' },
      { date: '2026-10-03T08:12', acteur: 'Système',  type: 'email',    texte: 'Email logistique rattaché : avis d’arrivée MSC.' },
      { date: '2026-10-03T16:05', acteur: 'Rachida Adjovi', type: 'statut', texte: 'ETA 05/10/2026 et conteneur MSCU 4120936-2 renseignés. Statut : Déclaration anticipée.' },
      { date: '2026-10-06T10:31', acteur: 'Rachida Adjovi', type: 'statut', texte: 'Contrôle physique notifié par la douane. Statut : Contrôle physique en cours.' },
      { date: '2026-10-06T10:40', acteur: 'Rachida Adjovi', type: 'email', texte: 'Email envoyé au client : contrôle physique programmé.' },
      { date: '2026-10-08T16:50', acteur: 'Rachida Adjovi', type: 'statut', texte: 'Résultat du contrôle : Conforme.' },
      { date: '2026-10-09T08:44', acteur: 'Rachida Adjovi', type: 'statut', texte: 'BAE 2026-BAE-048213 obtenu. Statut : BAE obtenu.' },
      { date: '2026-10-09T10:58', acteur: 'Josué Agossou',  type: 'transport', texte: 'Ordre de transport OT-2026-0156 créé.' },
      { date: '2026-10-09T11:20', acteur: 'Josué Agossou',  type: 'transport', texte: 'Offre envoyée à Trans-Express Logistique et Atlantic Fret. Transport : À confirmer.' },
      { date: '2026-10-09T14:47', acteur: 'Trans-Express Logistique (lien)', type: 'lien', texte: 'Offre acceptée. Transport : Confirmé. Offre clôturée pour Atlantic Fret.' },
      { date: '2026-10-12T16:40', acteur: 'Rachida Adjovi', type: 'statut', texte: 'BAS 2026-BAS-051907 obtenu. Statut : BAS obtenu.' },
      { date: '2026-10-12T16:40', acteur: 'Système',  type: 'statut',   texte: 'Basculement automatique en facturation. Statut : En facturation.' },
      { date: '2026-10-13T09:10', acteur: 'Client (lien personnel)', type: 'lien', texte: 'Consultation du suivi et téléchargement de BAE_2026-BAE-048213.pdf.' },
      { date: '2026-10-14T09:30', acteur: 'Trans-Express Logistique (lien)', type: 'lien', texte: 'Camion BH 4271 RB, chauffeur Firmin Kpadé. Transport : Camion affecté.' },
      { date: '2026-10-15T14:10', acteur: 'Trans-Express Logistique (lien)', type: 'lien', texte: 'Transport : Chargement.' },
      { date: '2026-10-16T07:40', acteur: 'Trans-Express Logistique (lien)', type: 'lien', texte: 'Transport : En route.' },
      { date: '2026-10-16T07:58', acteur: 'Système',  type: 'email',    texte: 'Email du client rattaché au dossier.' },
      { date: '2026-10-16T08:20', acteur: 'Josué Agossou',  type: 'email', texte: 'Email envoyé au client : heure d’arrivée du camion.' }
    ]
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

  window.DOUALOG = {
    config: config, roles: roles, equipe: equipe, clients: clients, transporteurs: transporteurs,
    compagnies: compagnies, prestations: prestations, statuts: statuts, ordreTransport: ordreTransport,
    documents: documents, documentsRequis: documentsRequis,
    dossiers: dossiers, ots: ots, grilles: grilles, prochainNumeroFacture: prochainNumeroFacture,
    notifications: notifications, messages: messages, historique: historique,
    fmt: { date: fmtDate, dateCourte: fmtDateCourte, heure: fmtHeure, dateHeure: fmtDateHeure, nombre: fmtNombre, montant: fmtMontant, poids: fmtPoids },
    esc: esc, badge: badge, dossier: dossier, client: client, responsable: responsable, refTransport: refTransport,
    enSalleAttente: enSalleAttente, alertes: alertes, documentsManquants: documentsManquants,
    tableauDeBord: tableauDeBord, salleAttente: salleAttente, totaux: totaux, workflow: workflow
  };
})();
