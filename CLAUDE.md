# DOUALOG Control Tower — Maquettes HTML V1

## Objectif
Produire les **maquettes HTML statiques et cliquables** de la V1 de DOUALOG Control Tower,
pour une présentation au client (dirigeant de DOUALOG, profil non technique) **dimanche**.
Ce ne sont pas des écrans de production : pas de backend, pas de framework, JS minimal.

## Sources (ordre de priorité en cas de contradiction)
1. `specs/User_Flows_DOUALOG_v0.2.docx.md` — parcours, enchaînement des écrans, statuts. **Source la plus à jour.**
2. `specs/CDC_Doualog_Control_Tower.docx.md` — règles métier, colonnes, champs, statuts, rôles (§02).
3. `specs/User_Stories_V1_DOUALOG.docx.md` — contenu de chaque écran (critères d'acceptation) et priorités.
4. `charte-graphique/index.html` — **charte graphique de référence** (remplace le CDC §15). Logo : `logo.png` (racine),
   copié dans `output/assets/img/logo.png` ; monogramme seul : `output/assets/img/logo-monogramme.png`.
5. `cadrage/etape-0-cadrage.md` — inventaire corrigé, contenu des écrans, points tranchés.

⚠️ Contradiction connue : les user stories US-30 et US-39 à US-44 parlent encore de « portail » et de « ses dossiers ».
**La règle qui s'applique est celle des user flows et du CDC §11–12** : aucun compte client ni transporteur,
page de suivi publique (N° DLG + BL/AWB, ou N° DLG + N° de booking à l'export / sans BL) et
**liens personnels rattachés à UN seul dossier / UN seul OT**.

Les fichiers `.md` de specs contiennent une image encodée en base64 (logo de couverture) : l'ignorer.

## Périmètre
- **MUST** : obligatoire. **SHOULD** : si le temps le permet. **COULD** : ne pas faire
  (exception validée : le mandat reste dans X04 ; US-43 n'est pas faite).
- Pas de matrice des rôles détaillée : utiliser le tableau du CDC §02. En maquette, un **sélecteur de rôle**
  dans la topbar (Déclarant, Opérateur transit, Transport, Facturation, Manager, Direction) suffit à montrer les vues.

## Skills à appliquer (ordre de priorité)
1. Charte `charte-graphique/index.html` (non négociable)
2. `ui-design-system` — tokens + composants, aucune valeur en dur
3. `b2b-saas-ui` — patterns d'écrans métier
4. `anti-ai-generic-design` — checklist avant de livrer chaque écran

Ne pas utiliser `ui-design-dydy` ni d'autre skill d'esthétique sur ce projet.

## Charte (résumé de `charte-graphique/index.html`)
- Police unique : **Sora** (400 / 500 / 600 / 700). Hiérarchie par poids et taille, jamais par une autre police.
- Identité : bleu marine `#0C2C5E` (titres, structure) · or douane `#D6821A` (action principale, accent, trait de signature ;
  texte sur fond or : `#1A1204`) · or texte `#B96C15`.
- Surfaces : encre `#070D18` (topbar, bandeau dossier) · ardoise `#131A26` (menu latéral) ·
  ivoire `#F1EEE7` (fond de la zone de travail) · blanc `#FFFFFF` (cartes, panneaux, champs).
- Texte : `#14110D` principal · `#5B564A` secondaire · `#B9B0A0` traits / bordures (`#D9D2C2` bordures légères).
- Statuts : **6 teintes sémantiques** — succès `#2E8347` · info `#2F63AE` · vigilance (rouille) `#B04B1B` ·
  bloquant `#B23327` · spécifique (violet) `#6A4FD1` · neutre `#5B564A`. Mapping des statuts dans `tokens.css`
  et `design-system.html`. Le « rond de santé » de la charte n'est **pas** utilisé.
- Rayon 6 px (boutons, champs, cartes), badges en pilule. **Aucune ombre portée** : séparation par bordure fine et espacement.
- Icônes : une seule famille, trait 1,8 px, sans remplissage (sprite `assets/icons.js`), aucun emoji.
- Logo : pas de version blanche. Sur fond sombre (topbar) : **monogramme DL sur pastille blanche**.
- Workflow : la ligne entre deux étapes dégrade de la couleur de l'étape passée vers la suivante.

## Décisions de cadrage (étape 0)
- C2 : le statut global suit la piste douane → facturation ; la livraison se lit dans la colonne Transport.
  « Livré » n'est statut global que si la facture n'est pas encore émise.
- C3 : colonne **Statut** ajoutée après Client dans E01.
- C4 : pays, devise, TVA à remplir → valeurs provisoires centralisées dans `data.js` (`config`), marquées À VALIDER.
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
| E02 | Dossier ouvert en panneau bas de page : bandeau + workflow horizontal + onglets | P3 | US-13 à 16 |
| E02e | Onglet Informations générales (**ouvert par défaut**) | P3 | US-17, 09 |
| E02a | Onglet Douane : déclaration stockée/anticipée, contrôle, BAE, BAS | P3 | US-22 à 26 |
| E02b | Onglet Documents (présent / manquant) | P2 | US-18 |
| E02f | Onglet Transport (suivi de l'OT, réponses, camion, documents) | P4 | US-28 à 33 |
| E02c | Onglet Messagerie (fil d'emails par catégorie + nouveau message) | P1 | US-20, 21 |
| E02d | Onglet Historique (journal horodaté) | toutes | US-47 |
| E03 | Salle d'attente — dossiers incomplets (**onglet de E01**) | P2 | US-04, 06 |
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
├── assets/tokens.css · components.css · icons.js · data.js (jeu de données commun) · img/
├── design-system.html
├── index.html            ← sommaire groupé par parcours
├── interne/E01-tableau-de-bord.html …
└── externe/X01-email-accuse-reception.html …
```

## Données de maquette
- Un **seul jeu de données partagé** (`assets/data.js`) : 20 dossiers `DLG-2026-0xxx`, cohérents d'un écran à l'autre
  (le même dossier a le même client, BL, statut partout). Date du jour fictive : **vendredi 16/10/2026**.
- Mélange import/export, maritime/aérien, tous les statuts représentés, dont : 2 en contrôle physique,
  1 en info manquante, 3 en salle d'attente, 2 en facturation, 1 clôturé.
- Clients et transporteurs fictifs crédibles, dates autour d'octobre 2026, formats français.
- **Dossier fil rouge : DLG-2026-0412** (En facturation, transport En route), utilisé dans tous les parcours pour la démo.

## Règles de travail
- Une étape à la fois. À la fin de chaque étape : lister les fichiers créés, puis **s'arrêter** pour validation.
- Tout nouveau composant va dans `components.css` et `design-system.html`, jamais en local dans une page.
- Textes en français, vouvoiement pour tout ce qui s'adresse au client ou au transporteur, ton professionnel sobre.
- Si une règle métier manque dans les specs : ne pas inventer, laisser un commentaire `<!-- À VALIDER : … -->`
  et le lister en fin d'étape (et dans `QUESTIONS-ONCLE.md` si c'est une question pour le client).
