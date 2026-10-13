---
name: b2b-saas-ui
description: Conception d'écrans d'application métier B2B dense (back-office, transit, douane, logistique) — tableaux de dossiers, Kanban, fiches détail, formulaires longs, timelines, statuts. À utiliser pour toute maquette d'outil interne utilisé au quotidien par des opérateurs, et pour les pages client sans compte (suivi par lien).
---

# B2B SaaS UI — Applications métier denses

Un outil métier n'est pas une landing page. Ses utilisateurs y passent **des heures par jour**,
traitent **des dizaines de dossiers**, et doivent repérer **en un coup d'œil ce qui bloque**.

Priorités, dans l'ordre : **lisibilité → rapidité d'action → densité → esthétique.**

---

## 1. Principes

1. **Le dossier est l'unité centrale.** Tout écran répond à : quels dossiers, dans quel état, qu'est-ce que je dois faire maintenant ?
2. **L'exception d'abord.** Ce qui est en retard, bloqué, incomplet ou en contrôle doit sauter aux yeux. Le nominal reste discret.
3. **Densité maîtrisée.** Lignes de tableau 36–40px, texte 13–14px, marges internes 12–16px. Pas d'espace vide décoratif.
4. **Zéro navigation inutile.** L'action la plus fréquente est accessible en 1 clic depuis la liste.
5. **Le rôle conditionne l'écran.** Un déclarant douane, un opérateur transport et la facturation ne voient pas les mêmes colonnes ni les mêmes actions (se référer à la matrice des rôles).

---

## 2. Shell applicatif (commun à tous les écrans internes)

```
┌────────────┬───────────────────────────────────────────────┐
│            │ Topbar : recherche globale (réf. dossier,     │
│  Sidebar   │ client, BL) · notifications · utilisateur/rôle │
│            ├───────────────────────────────────────────────┤
│  Logo      │ Titre de page + compteur · actions de page    │
│  Nav       ├───────────────────────────────────────────────┤
│  (avec     │ Toolbar : filtres rapides, filtres, vue       │
│  compteurs)│ (liste / kanban), export                      │
│            ├───────────────────────────────────────────────┤
│            │                                               │
│            │ Contenu principal                             │
│            │                                               │
└────────────┴───────────────────────────────────────────────┘
```

- Sidebar fixe, items avec **compteur** quand il y a du travail en attente (ex. "Douane 12").
- Recherche globale toujours visible : on cherche par référence de dossier avant tout.
- Le rôle de l'utilisateur connecté est visible (permet de présenter les maquettes par rôle).

---

## 3. Patterns d'écran

### 3.1 Liste de dossiers (écran principal)
- **Tableau pleine largeur**, pas de cartes.
- Colonnes type : Réf. dossier · Client · Sens (Import/Export) · Mode · Statut douane · Statut transport · Échéance · Responsable · Actions.
- Référence en **police mono**, cliquable.
- **Filtres rapides** au-dessus (chips) : "À traiter", "En retard", "En contrôle", "Documents manquants", "Mes dossiers", avec compteur.
- Ligne en retard / bloquée : indicateur discret mais net (bordure gauche colorée ou icône + badge), pas toute la ligne colorée.
- Colonne Actions : icône "œil" → ouvre le **détail dans un panneau sous la liste** (ou panneau latéral), sans quitter la liste.
- Tri par défaut : urgence (échéance la plus proche, puis blocages).
- Prévoir : état vide filtré ("Aucun dossier en retard"), pagination ou "Afficher plus".

### 3.2 Fiche dossier (détail)
- **En-tête fixe** : référence, client, sens, statuts principaux (badges), échéance, responsable, actions principales (1 primaire max).
- **Onglets** : Résumé · Documents · Douane · Transport · Échanges · Facturation · Historique.
- Colonne principale (2/3) : informations et actions de l'onglet. Colonne latérale (1/3) : timeline / derniers événements, checklist documents.
- **Checklist documents** visible : chaque document attendu avec état (reçu / manquant / à valider). C'est souvent la cause n°1 de blocage.

### 3.3 Kanban
- Une colonne = un statut du workflow (ex. statuts douane dans l'ordre réel du processus).
- En-tête de colonne : libellé + compteur.
- Carte compacte : réf. (mono), client, échéance, 1–2 indicateurs (retard, document manquant), avatar/initiales du responsable. **Pas de description longue.**
- Les colonnes "exception" (contrôle, info manquante) ont un repère visuel distinct.
- Glisser-déposer simulé en maquette : montrer une carte "en cours de déplacement" sur un écran suffit.

### 3.4 Formulaires longs (création / édition de dossier)
- Découpés en **sections titrées** (pas en un seul bloc), sur 2 colonnes quand les champs sont courts.
- Champs conditionnels visibles selon le contexte (ex. Import → champs spécifiques obligatoires ; Export → masqués).
- Barre d'actions **collante en bas** : Annuler (secondaire) · Enregistrer brouillon · Valider (primaire).
- Validation inline, message d'erreur sous le champ.
- Si création à partir d'un email : afficher l'email source à côté (split view) avec les champs pré-remplis repérables.

### 3.5 Timeline / historique
- Verticale, plus récent en haut, horodatage précis (`12/10/2026 · 14:32`).
- Chaque événement : acteur, action, objet (ex. "M. Diallo a changé le statut douane : Lancé → Contrôle documentaire").
- Types d'événements distingués par une petite icône (email, statut, document, commentaire), pas par des couleurs vives.

### 3.6 Dashboard / pilotage (Manager, Direction)
- Haut : 4–6 **KPI** sobres (valeur + variation + période). Pas de jauges décoratives.
- Ensuite : listes d'exceptions actionnables ("Dossiers en retard", "Contrôles en cours") plutôt que des graphiques.
- Graphiques seulement si une tendance aide à décider (volume par semaine, délai moyen de dédouanement).

### 3.7 Page externe sans compte (suivi par lien, type suivi de colis)
- **Changement de registre** : page aérée, simple, mobile-first, aucun jargon interne.
- Contenu : référence, étape actuelle mise en avant, frise des étapes (passées / en cours / à venir), date estimée, contact.
- Action éventuelle : déposer un document demandé (un seul bouton clair).
- Logo et couleurs de la charte, mais pas de sidebar ni de navigation applicative.
- Prévoir aussi l'**email** qui contient ce lien (maquette HTML de l'email).

---

## 4. Statuts

- Un statut = **badge** (fond léger + texte foncé + libellé), jamais couleur seule.
- Même libellé et même couleur **partout** (liste, kanban, fiche, page externe).
- Grouper les statuts par sens :
  - neutre/gris → pas commencé, en attente
  - info/bleu → en cours
  - warning/orange → action requise, info manquante, contrôle
  - danger/rouge → bloqué, en retard, rejeté
  - success/vert → validé, terminé, livré
- Statut inconnu en maquette = demander, ne pas inventer de nouveau statut métier.

---

## 5. Données de maquette

- Utiliser le **vocabulaire métier exact** des spécifications (références, statuts, documents, rôles).
- Références au format défini dans les specs (ex. `DLG-0412`).
- 15 à 25 lignes dans les listes, avec de la **variété** : quelques retards, un contrôle, un dossier complet, un tout juste créé, import et export mélangés.
- Noms d'entreprises et de personnes crédibles et variés, dates autour de la date du jour, montants irréguliers.
- Formats français : `12/10/2026`, `12 847,30 €`, `14:32`.

---

## 6. Ce qu'on ne fait pas dans un outil métier

- ❌ Cartes à la place d'un tableau pour des listes de dossiers
- ❌ Hero, illustrations, grands visuels dans l'application interne
- ❌ Modale pour consulter un détail (préférer panneau ou page)
- ❌ Plus de 2 niveaux de navigation
- ❌ Actions destructrices sans confirmation
- ❌ Infos critiques cachées dans un survol (tooltip) uniquement

---

## 7. Livrable maquettes

- `index.html` : sommaire des écrans, groupés par **user flow**, avec pour chaque écran : nom, rôle concerné, user stories couvertes.
- Chaque écran est **cliquable** vers l'écran suivant du flow.
- Pour chaque écran, vérifier : action principale identifiable en 3 secondes, exceptions visibles, statuts cohérents, rôle respecté.
