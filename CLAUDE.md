# DOUALOG Control Tower — Maquettes HTML V1

## Objectif
Produire les **maquettes HTML statiques et cliquables** de la V1 de DOUALOG Control Tower,
pour une présentation au client (dirigeant de DOUALOG, profil non technique) **dimanche**.
Ce ne sont pas des écrans de production : pas de backend, pas de framework, JS minimal.

## Visuel (ordre de priorité)
1. **Style : skill `apple-design` — référence principale** pour l'exécution visuelle (espacements, angles, profondeur,
   matières, typographie, micro-interactions et transitions). Objectif : moderne, haut de gamme, niveau Linear / Stripe / Apple ;
   ni vieux logiciel métier, ni template généré par IA.
2. **`references/vision-client.jpeg` — référence pour l'identité et la structure** (bleu nuit, orange `#F97316`, logo ;
   header, menu, indicateurs, liste pleine largeur, dossier ouvert en panneau pleine hauteur avec blocs en grille sans onglets,
   workflow horizontal des 9 étapes). Contenu, libellés métier et couleurs de sens des statuts : inchangés.
3. `charte-graphique/index.html` — pour ce que l'image ne montre pas (teintes de statut, icônes, règles du logo).
4. CDC §15 — en dernier.

Lisibilité métier d'abord : un déclarant passe 8 h par jour sur l'outil. Tableau dense et lisible, aucun effet ne gêne
la lecture des données, contraste AA minimum.

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
1. `apple-design` — **skill de style principal**
2. Image `references/vision-client.jpeg` (identité, structure), puis charte `charte-graphique/index.html`
3. `anti-ai-generic-design` — garde-fou, checklist avant de livrer chaque écran
4. `b2b-saas-ui` — règles métier : densité, tableaux, statuts
5. `ui-design-system` — tokens + composants, aucune valeur en dur

Ne pas utiliser `ui-design-dydy` ni d'autre skill d'esthétique sur ce projet.

## Refonte apple-design (appliquée à tous les écrans — prioritaire sur les sections suivantes)
**Méthode suivie** : pilote sur **E09, E01, E02** + tokens, composants et design system, **validé à 100 % par le client**, puis
application à tous les écrans (internes, externes, emails, sommaire, démo) uniquement par tokens et composants, aucun style local dans les pages.
- **Police : Inter partout** (choisie par le client après comparaison avec Roboto et Geist ; sélecteur et comparatif retirés).
  Chiffres tabulaires **seulement** sur les contenus purement numériques (dates, montants, compteurs, `.is-num`) : avec Inter, ils élargissent aussi les traits d'union (DLG-2026-…, Agro-Industries).
  Semi-gras 600. Approche négative sur les titres (`--ls-title`), −0,6 % sur le corps (`--ls-body`).
- **Couleurs inchangées** : menu bleu nuit `#123259`, zone de travail claire `#F4F5F7`. Orange `#F97316` = repères d'identité
  (`--action-accent` : menu actif, étape en cours, focus) ; **boutons principaux en `#CC4A0E`** (`--action-primary`) pour un
  texte blanc AA (4,6:1 ; blanc sur `#F97316` = 2,8:1).
- **Angles** 6 / 8 / 12 / 16 px (menu, contrôles, cartes, modales), pilule pour statuts, compteurs, filtres.
- **Profondeur** : ombres douces `--shadow-xs` (cartes) à `--shadow-lg` (menus, panneaux, modales) ; header et bandeau du dossier
  **translucides** (flou), voile de modale légèrement flouté. Titres de cartes sans filet (filet gardé au-dessus d'un tableau).
- **Mouvement** court (90–240 ms), sans rebond, courbe des feuilles iOS (`--ease-out`), sortie en miroir par le même chemin ;
  pression des boutons dès l'appui ; lignes du tableau en fondu en cascade ; menu « … » qui naît de son bouton ; barres des
  graphiques qui poussent. Distances dans les tokens (`--move-*`) : à 0 si « moins d'animations » ; matières opaques si
  « moins de transparence » ; filets renforcés si « contraste renforcé ».
- Tableau : lignes de 40 px, en-têtes gris très clair, œil discret jusqu'au survol. Filtre actif plein bleu marine.

## Refonte sobre « entreprise » (après l'étape 8 — complétée par la refonte apple-design ci-dessus)
Le client trouvait le rendu « trop IA, projet scolaire ». Direction choisie : **sobre, menu sombre**.
- ~~**Police : Roboto**~~ (à choisir, voir la refonte apple-design) (celle d'Odoo ; Inter puis IBM Plex jugées « gamines ») ; semi-gras = 500. Références en chiffres tabulaires, sans police à chasse fixe.
  ~~**Angles : 4 px** (boutons, champs), **6 px** (cartes)~~ → 8 / 12 px ; **statuts et compteurs en pilule**. Emails : police système (Inter si installée), voir « Emails ».
- Menu **bleu marine franc `#123259`** (plus le quasi-noir `#0A1628`, aussi dans les emails et pages externes) **pleine hauteur avec le logo en tête** ; **header blanc** à filet gris (recherche, cloche à compteur rouge, emails, utilisateur).
- Zone de travail **gris très clair** `#F4F5F7` (`--gray-app`), cartes blanches à bordure fine. Plus de fond sombre ni d'ombre du menu.
- Entrée active du menu : fond discret + **trait orange à gauche**. Orange réservé aux boutons d'action principaux.
- Onglets, filtres, indicateur actif : **bleu marine** (`--action-active`). Frise : couleurs d'origine conservées (vert fait, violet anticipé, orange en cours) — le client aime les couleurs.
- Indicateurs : **bandeau blanc, icônes de couleur conservées** (carré légèrement teinté à gauche, libellé puis chiffre). Bandeau dossier **blanc**.
- **Pas de majuscules** pour titres de blocs, libellés, en-têtes de colonnes. Import / Export en texte simple.
- Sommaire `index.html` : page claire, un tableau des écrans (Écran · Utilisé par · Contenu · Réf.), textes courts.
- Les pages externes et les emails gardent leur en-tête bleu nuit + ligne orange.

## Style visuel d'origine (d'après `references/vision-client.jpeg`) — remplacé en partie par la refonte ci-dessus
- ~~Police : Inter partout~~ → **remplacée par Roboto** (voir la refonte ci-dessus).
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
  Facturation (E06, MUST) ajoutée **entre Documents et Messagerie** — absente de l'image, À VALIDER.
- **Accueil : E09 (Tableau de bord graphique) pour tous les profils** (connexion, logo). « Dossiers » = liste E01, « Rapports » = E07.
- Logo : pas de version blanche → monogramme sur pastille blanche + nom en texte (DOUA blanc, LOG orange).
- Rayon 6 px (boutons, champs), 8 px (cartes, tuiles), badges en pilule. Pas d'ombre portée.
- Icônes : une seule famille, trait 1,8 px, sans remplissage (sprite `assets/icons.js`), aucun emoji.
- Workflow : la ligne entre deux étapes dégrade de la couleur de l'étape passée vers la suivante.

## Décisions de cadrage (étape 0)
- C2 : le statut global suit la piste douane → facturation ; la livraison se lit dans la colonne Transport.
  « Livré » n'est statut global que si la facture n'est pas encore émise.
- C3 : colonne **Statut** ajoutée après Client dans E01.
- C1 : **annulé** — le visuel suit l'image du client (voir « Style visuel »).
- C4 : **tranché (14/10/2026) — périmètre France** (le choix initial du Sénégal était une erreur) : Port du Havre, aéroport Paris-CDG (Roissy),
  euros, TVA 20 % À VALIDER pour les prestations ; « N° IFU » du CDC remplacé par **SIRET** (facture, fiche client) + **N° EORI** (douane, dossier), À VALIDER.
  Clients et transporteurs français fictifs, provenances variées ; mentions de facture françaises (IBAN, pénalités de retard, indemnité de 40 €).
- C5 : OT possible dès le BAE (À VALIDER). C7 : la première acceptation ferme l'offre pour les autres transporteurs.
- D1 « Info manquante » · D2 Chargement → En route · D6 code de confirmation pour mandat **et** dépôt de documents.
- D8 : en aérien, « Anticipé » = ETA vol + N° LTA. D10 : Responsable = déclarant assigné, par le Manager (À VALIDER).
- Points ouverts pour le client : `QUESTIONS-ONCLE.md`.

## Inventaire des écrans

### Interne (app DOUALOG)
| ID | Écran | Parcours | US |
|---|---|---|---|
| E00 | Connexion | — | US-45 |
| E09 | **Tableau de bord** (`E09-tableau-de-bord.html`) — 8 indicateurs cliquables (→ E01 `?kpi=`), graphiques SVG (reçus par semaine, répartition, étapes, délai réception → BAS), priorités du jour, facturation du mois. Ordre : indicateurs, puis section **Activité** juste dessous (demande client), puis section **Aujourd'hui** : priorités + répartition, puis étapes · **Clients à suivre** (mandat, factures échues, dossiers bloqués ; `DOUALOG.resumeClient`, partagé avec E10) · facturation. **Activité** : période au choix (récent, **années depuis 2021**, tout l'historique, plage de mois ; 8 sem. par défaut ; `?periode=8s|12m|a2025|tout|2024-03_2024-08&par=mois`), affichage semaine / mois / trimestre / année (jamais grisé : « Année » sur 8 sem. passe à tout l'historique, la note de section le signale), **comparaison avec la même période un an plus tôt**, gardée dans le navigateur, bouton « Réinitialiser » (visible hors réglage par défaut) pour revenir à 8 sem. Avant le 21/09/2026 : `statsAnterieures` (fictif : généré de 2021 à oct. 2025, écrit à la main ensuite) | — | US-10, 48 |
| E01 | **Dossiers** (`E01-dossiers.html` ; l'ancien `E01-tableau-de-bord.html` redirige) — liste des dossiers (pleine largeur, filtres, tri), sans bandeau d'indicateurs | P1–P3 | US-10, 11, 16 |
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
`E01-dossiers.html?id=DLG-…` l'ouvre au chargement ; `E02-dossier.html` redirige vers E01 avec le fil rouge.
BAE et BAS s'empilent dans une colonne (côte à côte sur grand écran). Les actions BAE / BAS / nouveau message modifient
les données en mémoire pour la démo (rechargement = retour à l'état initial).
| E03 | Salle d'attente — dossiers incomplets (**onglet de la carte « Liste des dossiers » de E01** ; `E03-salle-attente.html` ouvre cet onglet) | P2 | US-04, 06 |
| E04 | Création OT + envoi offre (choix transporteurs) | P4 | US-28, 29 |
| E05 | Annuaire transporteurs | P4 | US-27 |
| E06 | Facturation — liste + aperçu facture | P5 | US-34 à 37 |
| E07 | Dashboard Manager — KPIs (SHOULD) | — | US-48 |
| E08 | Centre de notifications (SHOULD) | — | US-46 |
| E10 | **Clients** (`E10-clients.html`) — liste (SIRET, ville, contact, dossiers en cours, mandat, CA 2026 ; filtres Mandat absent / expire < 30 j / dossiers bloqués) + **fiche client en panneau pleine hauteur** (`?id=c01`) : société et contacts, mandat (→ X09), grille tarifaire (`data.js > tarifsClients`, À VALIDER), dossiers, facturation, échanges | — | CDC §11.4 |
| E12 | **Mandats** (`E12-mandats.html`) — 4 indicateurs qui filtrent (valides, expirent < 30 j, en attente de signature, absents / expirés), tableau par client (SIRET, statut, dates, signataire, mode en ligne / papier, dossiers en cours, dernière action), **fiche mandat en panneau pleine hauteur** (`?id=c11`, `&action=demande|depot`) : document (aperçu PDF), signature, dossiers concernés, historique ; demander (aperçu X09), relancer, ajouter un scan papier, renouveler, révoquer. Statuts : `DOUALOG.etatMandat` (Valide, Expire bientôt, Demande envoyée, Relancé, Expiré, Absent), `mandatOk(d)` pour la pièce Mandat d'un dossier. Compteur « à traiter » dans le menu | P1 | CDC §3.4, US-08 |
| E13 | **Documents** (`E13-documents.html`) — 4 indicateurs qui filtrent (manquants, à classer, reçus cette semaine, générés par DOUALOG), filtres (type, dossier, client, statut, provenance, période), recherche, vue **Liste** / **Par dossier** (checklist compacte des pièces), **aperçu en panneau à droite** (`?doc=DLG-…:packing`) : visuel simulé, informations, versions, historique ; remplacer, changer le type, rattacher, demander au client (X02). **À classer** : pièces jointes avec type et dossier probables (module IA documentaire, À VALIDER V1/V2) : Valider / Modifier / Ignorer. Une seule source : `DOUALOG.registreDocuments()` (pièces des dossiers + `docsInfo`, mandats, OT et documents transporteur, factures), `piecesManquantes(d)` = bloc Documents du dossier | P2 | CDC §3.2, §7.2, US-18, 19 |
| E14 | **Paramètres** (`E14-parametres.html`) — sous-menu vertical (`.c-settings`) + sections en cartes avec « Enregistrer » et confirmation discrète, badge « À valider » sur les valeurs provisoires. Manager et Direction : 11 sections (profil, société, utilisateurs et droits par rôle, boîte email, documents obligatoires, délais, modèles d'emails, facturation, référentiels, notifications, sécurité) ; autres profils : Mon profil seulement. `?section=`. Enregistré dans la mémoire de démo (`DOUALOG.enregistrerParametres`) et appliqué : délais (`config`), TVA, boîte email, coordonnées société (facture E06), documents obligatoires (salle d'attente), équipe | — | CDC §02, §17 |
| E11 | **Messagerie** (`E11-messagerie.html`) — boîte centrale 3 colonnes (filtres · liste · lecture), badge N° DLG, **Non rattachés** (dossier probable proposé : Rattacher / Créer / Ignorer), Répondre / Transférer / Nouveau message. Même source que le bloc Messagerie du dossier (`data.js > messagesDossier, boite, nonRattaches`). Proposition qui étend le CDC §7.6 (À VALIDER) | P1 | US-20, 21 |

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
├── assets/tokens.css · components.css · icons.js · data.js (jeu de données + mémoire de démo) · shell.js (header + menu) · dossier.js (panneau E02)
│          · charts.js (graphiques SVG partagés : barres, courbe, anneau, pistes, infobulle)
│          · email.js (remplit les emails X0x depuis data.js) · img/
├── design-system.html
├── index.html            ← sommaire groupé par parcours (lien vers la présentation en haut)
├── presentation.html     ← diaporama du dimanche (12 diapositives, aperçus des vraies maquettes)
├── interne/E01-dossiers.html …
└── externe/X01-email-accuse-reception.html …
```

## Parcours transport (étape 5)
- E02 « Créer OT » → **E04** (`?id=`, défaut DLG-2026-0410 : BAE obtenu, sans OT) → email **X05** (`?ot=&t=`) →
  **X05b** (`?ot=&t=&reponse=acceptee|refusee`, ou `?etat=acceptee|refusee|attribuee` pour la démo) → **X06** (`?ot=`, défaut OT-2026-0156 du fil rouge).
- **Mémoire de démo** (`data.js`, sessionStorage) : OT créé, réponses aux offres, camion, statuts, documents, BAE, BAS, réception de pièces
  et fiches transporteurs sont gardés le temps de l'onglet. Fermer l'onglet (ou `DOUALOG.reinitialiserDemo()`) remet l'état initial.
- Pages externes : composant `.c-ext` (mobile-first, sans navigation applicative).

## Facturation, pilotage, notifications (étape 6)
- **E06** : tous les dossiers dont le BAS est obtenu ; facture calculée par `DOUALOG.facture(d)` (grilles de `data.js`, TVA sur
  prestations, débours hors TVA). En facturation → Générer (N° séquentiel FAC-2026-xxxx) → Émettre et envoyer (X07, échéance
  à 30 jours) → paiements (partiel / réglé). Réglé → dossier Clôturé si livré ou sans livraison (D16). `?id=` ouvre l'aperçu.
- **E07** : 10 indicateurs du CDC §14 (BAE, BAS, Livrés sur la période ; autres à date), clic → `E01?ids=…&titre=…`,
  4 listes d'exceptions, charge par déclarant.
- **E08** : notifications (types et teintes dans `DOUALOG.typesNotification`), lues gardées dans la mémoire de démo ;
  `DOUALOG_SHELL.majCompteurs()` met à jour la cloche et le menu.

## Pages client (étape 7)
- **X03** suivi public : N° DLG + BL / LTA, ou N° DLG + booking (D7) ; message neutre si rien ne correspond ; aucun document,
  montant, nom ni donnée commerciale. Démo : `?dlg=&ref=&type=booking`.
- **X04** lien personnel (`?id=`, `&action=depot|mandat`, `&etat=expire|desactive`) : actions attendues en premier, suivi daté,
  documents, dépôt, instructions douanières, mandat ; code à 6 chiffres (D6) pour le dépôt et le mandat (code de démo 482913).
- Langage client centralisé dans `data.js` : `statutPublic(d)`, `etapesPubliques(d)`, `actionsClient(d)`, `recevoirDocumentClient(d, cle)`.
- Tous les boutons d'emails pointent vers X03 / X04 avec le bon dossier (vérifié : aucun lien vers une page inexistante).

## Sommaire et démo guidée (étape 8)
- `output/index.html` : sommaire pour le client (français clair, sans jargon), écrans par parcours + « Ce que voient le client et le transporteur ».
- `assets/demo.js` (chargé par toutes les pages) : barre fixe « Étape X / 14 » seulement avec `?demo=N` ; `&demo-reset=1` remet la mémoire de démo à zéro.
- Aucun code interne (C5, D7, US-…, À VALIDER) dans un texte visible à l'écran : seulement en commentaire (sauf références US discrètes du sommaire).

## Emails (X01, X02, X07, X08, X09…)
- HTML d'email réaliste : 600 px, tableaux, **styles en ligne** (couleurs en dur reprises de tokens.css, les messageries
  ne lisent pas les variables CSS), police système `Inter, -apple-system, Segoe UI, Roboto, Arial` ; carte 12 px, bouton `#CC4A0E` 8 px, N° de dossier en encadré gris clair, libellés sans majuscules (refonte apple-design). En-tête de messagerie (objet, De, À, date) au-dessus de l'email.
- Bandeau bleu nuit + ligne orange, logo (monogramme + DOUA**LOG**), N° DLG mis en avant, bouton orange, pied « Connecter • Sécuriser • Livrer ».
- Contenu rempli par `assets/email.js` depuis `data.js` (`?id=DLG-…`, défaut dans `data-defaut`) : `[data-f]`, `[data-href]`, `[data-liste]`, `[data-si]`.
- Variante relance : `X02-email-documents-manquants.html?relance=n` (`X02-email-relance.html` = relance n°2 de DLG-2026-0426).
- `salleAttente.envois` : 1er envoi = demande initiale (X02), suivants = relances n°1, n°2…

## Données de maquette
- Un **seul jeu de données partagé** (`assets/data.js`) : 21 dossiers `DLG-2026-0xxx` (dont DLG-2026-0389, ancien dossier réglé d'Agrofertil Normandie, pour sa fiche client), cohérents d'un écran à l'autre
  (le même dossier a le même client, BL, statut partout). Date du jour fictive : **vendredi 16/10/2026**.
- Mélange import/export, maritime/aérien, tous les statuts représentés, dont : 2 en contrôle physique,
  1 en info manquante, 3 en salle d'attente, 2 en facturation, 2 clôturés.
- Clients et transporteurs **français** fictifs crédibles (aucune vraie marque), équipe DOUALOG aux noms de l'image
  (Awa Ndiaye, Mamadou Ba…), dates autour d'octobre 2026, formats français, téléphones +33, montants en euros avec centimes (`fmt.montant`).
- **Dossier fil rouge : DLG-2026-0412** (En facturation, transport En route), utilisé dans tous les parcours pour la démo.

## Règles de travail
- Une étape à la fois. À la fin de chaque étape : lister les fichiers créés, puis **s'arrêter** pour validation.
- Tout nouveau composant va dans `components.css` et `design-system.html`, jamais en local dans une page.
- Textes en français, vouvoiement pour tout ce qui s'adresse au client ou au transporteur, ton professionnel sobre.
- Si une règle métier manque dans les specs : ne pas inventer, laisser un commentaire `<!-- À VALIDER : … -->`
  et le lister en fin d'étape (et dans `QUESTIONS-ONCLE.md` si c'est une question pour le client).

## Graphiques, clients, messagerie, présentation (après la refonte apple-design)
- **Graphiques** : tous dessinés par `assets/charts.js` (`DOUALOG_CHARTS`), rendu « Apple Santé / Stripe » : dessinés à la taille réelle du conteneur (`largeur(el)`, jamais agrandis par le viewBox), barres de 10 px max à coins hauts
  arrondis, courbes de 1,75 px, grille en pointillé sans axe ni cadre, points au survol (sauf le dernier), ligne de référence en pointillé,
  anneaux fins à segments espacés, infobulle de valeur exacte au survol. Ne jamais redessiner un graphique à la main dans une page.
- **Clients (E10), Messagerie (E11) et Mandats (E12)** : entrées du menu actives pour tous les profils (À VALIDER). Mandats : c11 demande envoyée (DLG-2026-0427), c04 relancé, c06 expire bientôt, c13 Verrerie de la Bresle (ancien client sans dossier) expiré, c01 signé en ligne (historique complet), c09 papier scanné. Bloc Mandat de E10, bloc Documents de E02 et salle d'attente renvoient vers E12 ; X09 a une variante renouvellement.
- **Paramètres (E14)** : entrée du menu active pour tous ; délais par défaut dans `config` (relance 2 j, 5 relances max, lien client 30 j, transporteur 24 h, alerte mandat 30 j, paiement 30 j, relance paiement 7 j), tous À VALIDER. Équipe : `equipe` a email, statut, dernière connexion ; Léa Martin (u8) invitée.
- **Documents (E13)** : entrée du menu active pour tous (À VALIDER), compteur = manquants + à classer. Démo : valider la packing list `PL_88231_scan.pdf` → DLG-2026-0428 quitte la salle d'attente. Liens : bloc Documents du dossier (« Tous les documents du dossier »), pièces manquantes de la salle d'attente, fiche client, fiche mandat. Compteur d'emails non lus dans
  le header et le menu (`DOUALOG.emailsNonLus()`). Rattacher / créer / ignorer un email non rattaché et emails lus : mémoire de démo.
- **SIRET** (et N° EORI) affichés à la place de « N° IFU » (À VALIDER).
- **Présentation** : `presentation.html`, 12 diapositives, flèches / clic / F (plein écran), `#n` ouvre la diapositive n.
- **Démo guidée** : 14 étapes ; l'étape 3 montre un email non rattaché (E11, `?filtre=nonrattaches&mail=n1`).
