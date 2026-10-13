# DOUALOG Control Tower — Maquettes HTML V1

## Objectif
Produire les **maquettes HTML statiques et cliquables** de la V1 de DOUALOG Control Tower,
pour une présentation au client (dirigeant de DOUALOG, profil non technique) **dimanche**.
Ce ne sont pas des écrans de production : pas de backend, pas de framework, JS minimal.

## Visuel (ordre de priorité)
1. **`references/vision-client.jpeg` — vision du client, source n°1 pour tout le visuel.** Reproduire au plus près :
   structure, ambiance, densité, couleurs, typographie. En cas de doute, l'image l'emporte.
2. `charte-graphique/index.html` — pour ce que l'image ne montre pas (teintes de statut, formes, icônes, règles du logo).
   La charte sera réalignée sur l'image plus tard.
3. CDC §15 — en dernier.

## Sources métier (ordre de priorité en cas de contradiction)
1. `specs/User_Flows_DOUALOG_v0.2.docx.md` — parcours, enchaînement des écrans, statuts. **Source la plus à jour.**
2. `specs/CDC_Doualog_Control_Tower.docx.md` — règles métier, colonnes, champs, statuts, rôles (§02).
3. `specs/User_Stories_V1_DOUALOG.docx.md` — contenu de chaque écran (critères d'acceptation) et priorités.
4. Logo : `logo.png` (racine), copié dans `output/assets/img/logo.png` ; monogramme seul : `output/assets/img/logo-monogramme.png`.
5. `cadrage/etape-0-cadrage.md` — inventaire corrigé, contenu des écrans, points tranchés.

⚠️ Contradiction connue : les user stories US-30 et US-39 à US-44 parlent encore de « portail » et de « ses dossiers ».
**La règle qui s'applique est celle des user flows et du CDC §11–12** : aucun compte client ni transporteur,
page de suivi publique (N° DLG + BL/AWB, ou N° DLG + N° de booking à l'export / sans BL) et
**liens personnels rattachés à UN seul dossier / UN seul OT**.

Les fichiers `.md` de specs contiennent une image encodée en base64 (logo de couverture) : l'ignorer.

## Périmètre
- **MUST** : obligatoire. **SHOULD** : si le temps le permet. **COULD** : ne pas faire
  (exception validée : le mandat reste dans X04 ; US-43 n'est pas faite).
- Pas de matrice des rôles détaillée : utiliser le tableau du CDC §02. En maquette, le **rôle se choisit sous le nom
  de l'utilisateur** dans le header (Déclarant, Opérateur transit, Transport, Facturation, Manager, Direction).
  Le menu de l'image reste toujours visible ; ce que le profil ne peut pas ouvrir est grisé.

## Skills à appliquer (ordre de priorité)
1. Image `references/vision-client.jpeg`, puis charte `charte-graphique/index.html`
2. `ui-design-system` — tokens + composants, aucune valeur en dur
3. `b2b-saas-ui` — patterns d'écrans métier
4. `anti-ai-generic-design` — checklist avant de livrer chaque écran

Ne pas utiliser `ui-design-dydy` ni d'autre skill d'esthétique sur ce projet.

## Style visuel (d'après `references/vision-client.jpeg`)
- **Police : Inter partout** (CDC §15, choix du client — remplace Sora de la charte), 400 / 500 / 600 / 700.
  Comme sur l'image : titres de blocs et en-têtes de colonnes en **MAJUSCULES, semi-gras, petite taille, léger espacement
  des lettres** ; chiffres des indicateurs grands et gras ; titre du header « DOUALOG CONTROL TOWER » en gras majuscules,
  slogan « CONNECTER • SÉCURISER • LIVRER » plus petit et espacé dessous — **remplacé (demande client) : header sobre,
  logo + « Control Tower » à gauche, recherche large au centre, notifications / emails / utilisateur à droite, pas de titre centré
  ni de slogan** (le nom DOUALOG ne doit pas être répété). Le slogan reste sur l'écran de connexion.
- **Couleurs (C1 annulé)** : header et menu bleu nuit `#0A1628`, fond de la zone de travail `#091427` ; le menu s'en détache par un **reflet clair + une ombre** (demande client, exception à « pas d'ombre ») · fine ligne orange de 1 px sous le header ·
  orange `#F97316` pour les boutons d'action et les éléments actifs (onglet, filtre, étape en cours) ·
  entrée active du menu en **bloc bleu plein** `#1F5FD6` · titres bleu marine · **cartes et liste blanches** posées sur le fond
  bleu nuit. Plus de fond ivoire ni d'or.
- Statuts : les **6 teintes de la charte** (succès, info, vigilance rouille, bloquant, violet, neutre), mapping dans `data.js`.
- Tableau de bord : **bandeau sombre de 8 indicateurs** séparés par des filets. Chaque indicateur (souhait du client) :
  **icône à gauche (même hauteur que chiffre + libellé), grand chiffre à droite, libellé en petites MAJUSCULES sous le chiffre**. **Icônes de couleur**
  (une teinte par indicateur, comme l'image) sur carré légèrement teinté. + bouton orange
  « Nouveau dossier », puis la carte blanche « Liste des dossiers » (onglets, Filtres, Exporter).
- Menu dans l'ordre de l'image : Tableau de bord, Dossiers, Transport, Mandats, Clients, Documents, Messagerie,
  Notifications (compteur), Rapports, Paramètres, Déconnexion en bas. Entrées hors V1 visibles mais inactives.
  Facturation (E06, MUST) ajoutée après Transport — absente de l'image, À VALIDER.
- Logo : pas de version blanche → monogramme sur pastille blanche + nom en texte (DOUA blanc, LOG orange).
- Rayon 6 px (boutons, champs), 8 px (cartes, tuiles), badges en pilule. Pas d'ombre portée.
- Icônes : une seule famille, trait 1,8 px, sans remplissage (sprite `assets/icons.js`), aucun emoji.
- Workflow : la ligne entre deux étapes dégrade de la couleur de l'étape passée vers la suivante.

## Décisions de cadrage (étape 0)
- C2 : le statut global suit la piste douane → facturation ; la livraison se lit dans la colonne Transport.
  « Livré » n'est statut global que si la facture n'est pas encore émise.
- C3 : colonne **Statut** ajoutée après Client dans E01.
- C1 : **annulé** — le visuel suit l'image du client (voir « Style visuel »).
- C4 : **tranché** — Sénégal, Port autonome de Dakar, aéroport AIBD, FCFA (XOF). Clients et transporteurs sénégalais fictifs.
  TVA 18 % À VALIDER pour les prestations ; N° IFU affiché au format NINEA (À VALIDER).
- C5 : OT possible dès le BAE (À VALIDER). C7 : la première acceptation ferme l'offre pour les autres transporteurs.
- D1 « Info manquante » · D2 Chargement → En route · D6 code de confirmation pour mandat **et** dépôt de documents.
- D8 : en aérien, « Anticipé » = ETA vol + N° LTA. D10 : Responsable = déclarant assigné, par le Manager (À VALIDER).
- Points ouverts pour le client : `QUESTIONS-ONCLE.md`.

## Inventaire des écrans

### Interne (app DOUALOG)
| ID | Écran | Parcours | US |
|---|---|---|---|
| E00 | Connexion | — | US-45 |
| E01 | Tableau de bord — liste des dossiers (pleine largeur, filtres, tri) | P1–P3 | US-10, 11, 16 |
| E02 | Dossier ouvert en panneau pleine hauteur sur E01 : bandeau + workflow horizontal + **grille de blocs, sans onglets** | P3 | US-13 à 16 |
| E02e | Bloc Informations générales | P3 | US-17, 09 |
| E02b | Bloc Documents (présent / manquant) | P2 | US-18 |
| E02a | Blocs Déclaration / Contrôle, BAE, BAS | P3 | US-22 à 26 |
| E02c | Bloc Messagerie dossier (derniers emails + nouveau message) | P1 | US-20, 21 |
| E02f | Blocs Transport (OT, transporteur) et Suivi transport (frise des statuts) | P4 | US-28 à 33 |
| E02g | Bloc Notifications du dossier | — | US-46 |
| E02d | Historique (journal horodaté) — panneau latéral ouvert depuis le menu « … » ou le lien en bas du dossier | toutes | US-47 |

**Note étape 3 — le dossier ouvert n'a PAS d'onglets.** Comme sur l'image, tous les blocs sont visibles en grille sous le
bandeau et le workflow : rangée 1 = Informations générales, Documents, Déclaration / Contrôle, BAE, BAS, Messagerie ;
rangée 2 = Transport, Suivi transport, Notifications.
**Réalisation (étape 3)** : le panneau vit dans E01 (`assets/dossier.js`) et occupe **toute la hauteur sous le header**
(demande client, lisibilité), avec animation d'entrée / sortie ; l'œil ou le N° ouvre le dossier sans quitter la page,
`E01-tableau-de-bord.html?id=DLG-…` l'ouvre au chargement ; `E02-dossier.html` redirige vers E01 avec le fil rouge.
BAE et BAS s'empilent dans une colonne (côte à côte sur grand écran). Les actions BAE / BAS / nouveau message modifient
les données en mémoire pour la démo (rechargement = retour à l'état initial).
| E03 | Salle d'attente — dossiers incomplets (**onglet de la carte « Liste des dossiers » de E01** ; `E03-salle-attente.html` ouvre cet onglet) | P2 | US-04, 06 |
| E04 | Création OT + envoi offre (choix transporteurs) | P4 | US-28, 29 |
| E05 | Annuaire transporteurs | P4 | US-27 |
| E06 | Facturation — liste + aperçu facture | P5 | US-34 à 37 |
| E07 | Dashboard Manager — KPIs (SHOULD) | — | US-48 |
| E08 | Centre de notifications (SHOULD) | — | US-46 |

### Externe (sans compte — design simple, mobile-first)
| ID | Écran | Parcours | US |
|---|---|---|---|
| X01 | Email accusé de réception (N° DLG + lien de suivi) | P1 | US-07 |
| X02 | Email documents manquants (+ variante relance) | P2 | US-05, 06 |
| X03 | Page de suivi publique (saisie DLG + BL/AWB ou booking → statut + étapes) | P6 | US-40 |
| X04 | Page lien personnel client (suivi détaillé, dépôt documents, instructions, mandat, code de confirmation) | P6 | US-39, 41, 42, 44 |
| X05 | Email offre de transport (boutons Accepter / Refuser) | P4 | US-30, 31 |
| X05b | Page de retour transporteur (offre acceptée / refusée / déjà attribuée) | P4 | US-31 |
| X06 | Page lien transporteur (camion, statut, dépôt documents) | P4 | US-32, 33 |
| X07 | Email facture client | P5 | US-36 |
| X08 | Email demande d'information après contrôle | P3 | US-24 |
| X09 | Email demande de mandat (SHOULD) | P1 | US-08 |

## Structure des fichiers
```
output/
├── assets/tokens.css · components.css · icons.js · data.js (jeu de données commun) · shell.js (header + menu) · dossier.js (panneau E02)
│          · email.js (remplit les emails X0x depuis data.js) · img/
├── design-system.html
├── index.html            ← sommaire groupé par parcours
├── interne/E01-tableau-de-bord.html …
└── externe/X01-email-accuse-reception.html …
```

## Emails (X01, X02, X07, X08, X09…)
- HTML d'email réaliste : 600 px, tableaux, **styles en ligne** (couleurs en dur reprises de tokens.css, les messageries
  ne lisent pas les variables CSS), police Inter avec repli Arial. En-tête de messagerie (objet, De, À, date) au-dessus de l'email.
- Bandeau bleu nuit + ligne orange, logo (monogramme + DOUA**LOG**), N° DLG mis en avant, bouton orange, pied « Connecter • Sécuriser • Livrer ».
- Contenu rempli par `assets/email.js` depuis `data.js` (`?id=DLG-…`, défaut dans `data-defaut`) : `[data-f]`, `[data-href]`, `[data-liste]`, `[data-si]`.
- Variante relance : `X02-email-documents-manquants.html?relance=n` (`X02-email-relance.html` = relance n°2 de DLG-2026-0426).
- `salleAttente.envois` : 1er envoi = demande initiale (X02), suivants = relances n°1, n°2…

## Données de maquette
- Un **seul jeu de données partagé** (`assets/data.js`) : 20 dossiers `DLG-2026-0xxx`, cohérents d'un écran à l'autre
  (le même dossier a le même client, BL, statut partout). Date du jour fictive : **vendredi 16/10/2026**.
- Mélange import/export, maritime/aérien, tous les statuts représentés, dont : 2 en contrôle physique,
  1 en info manquante, 3 en salle d'attente, 2 en facturation, 1 clôturé.
- Clients et transporteurs **sénégalais** fictifs crédibles (aucune vraie marque), équipe DOUALOG aux noms de l'image
  (Awa Ndiaye, Mamadou Ba…), dates autour d'octobre 2026, formats français, téléphones +221.
- **Dossier fil rouge : DLG-2026-0412** (En facturation, transport En route), utilisé dans tous les parcours pour la démo.

## Règles de travail
- Une étape à la fois. À la fin de chaque étape : lister les fichiers créés, puis **s'arrêter** pour validation.
- Tout nouveau composant va dans `components.css` et `design-system.html`, jamais en local dans une page.
- Textes en français, vouvoiement pour tout ce qui s'adresse au client ou au transporteur, ton professionnel sobre.
- Si une règle métier manque dans les specs : ne pas inventer, laisser un commentaire `<!-- À VALIDER : … -->`
  et le lister en fin d'étape (et dans `QUESTIONS-ONCLE.md` si c'est une question pour le client).
