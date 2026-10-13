---
name: anti-ai-generic-design
description: Garde-fou contre le look "généré par IA" (dégradés violets, cartes clonées, emojis, textes creux). À utiliser pour toute création ou revue de maquette, page HTML ou interface, avant de livrer un écran.
---

# Anti AI-Generic Design

Une interface "générée par IA" se reconnaît en 2 secondes : elle est jolie, vide et interchangeable.
Ce skill sert à produire des écrans qui ont l'air conçus pour **ce produit précis et ces utilisateurs précis**.

Règle d'or : **chaque élément doit être là pour une raison métier**, pas pour remplir l'espace.

---

## 1. Les marqueurs à bannir

### Couleurs & effets
- ❌ Dégradés violet/bleu/rose "par défaut" (`#667eea → #764ba2` et cousins)
- ❌ Dégradés sur le texte des titres
- ❌ Glow, néons, ombres colorées autour des cartes
- ❌ Glassmorphism plaqué sans raison
- ❌ Fond avec blobs flous décoratifs
- ✅ Utiliser **uniquement** les couleurs de la charte. La couleur sert à signifier (statut, action, alerte), pas à décorer.

### Mise en page
- ❌ Grille de 3 ou 4 cartes identiques "icône + titre + 2 lignes"
- ❌ Hero section centré avec gros titre + sous-titre + 2 boutons sur un écran applicatif
- ❌ Tout centré, tout symétrique
- ❌ Espacements énormes partout (padding 48px+ sur des cartes de données)
- ✅ Hiérarchie asymétrique assumée : un élément principal, des éléments secondaires plus discrets.
- ✅ Les tailles des blocs varient selon l'importance réelle de l'information.

### Iconographie
- ❌ Emojis dans l'interface (🚀 ✨ 📊 💡)
- ❌ Une icône devant chaque titre, chaque item, chaque bouton
- ❌ Icônes dans des pastilles colorées rondes en série
- ✅ Une seule bibliothèque d'icônes (Lucide), trait fin, taille cohérente (16px dans les tableaux, 20px dans la nav).
- ✅ Icône uniquement si elle accélère la reconnaissance (navigation, actions répétées, statuts).

### Typographie
- ❌ Titres énormes (48px+) dans une app métier
- ❌ Mélange de 3+ polices
- ❌ Tout en gras, ou tout en gris clair
- ✅ Échelle typographique de la charte, 2 graisses principales (regular / semibold), chiffres tabulaires (`font-variant-numeric: tabular-nums`) pour montants, dates, références.

### Contenu & textes
- ❌ Lorem ipsum
- ❌ "Bienvenue sur votre tableau de bord !" / "Gérez tout en un seul endroit" / "Boostez votre productivité"
- ❌ Données rondes et parfaites (100, 250, 1 000 €, 50 %)
- ❌ Noms génériques : John Doe, Acme Corp, Jane Smith, Entreprise ABC
- ✅ Données métier réalistes : références de dossiers, noms d'entreprises crédibles, montants irréguliers (12 847,30 €), dates proches, statuts variés.
- ✅ Libellés courts et métier : "Dossiers en attente de documents" plutôt que "Vos éléments en cours".
- ✅ Langue : français, vouvoiement si le produit s'adresse à des clients, ton professionnel sobre.

### Composants
- ❌ Boutons tous en primaire
- ❌ Badges "NEW", "PRO", "BETA" décoratifs
- ❌ Graphiques décoratifs sans axe ni valeur lisible
- ❌ Avatars générés partout
- ✅ Un seul bouton primaire par zone. Les autres actions : secondaire, ghost ou menu "…".
- ✅ Graphiques seulement si l'utilisateur doit **prendre une décision** à partir de la tendance.

---

## 2. Les signes d'un écran "conçu"

- Il y a des **états réels** : liste vide, chargement, erreur, élément en retard, document manquant.
- Les données ont de la **variété** : un dossier bloqué, un en retard, un terminé, un avec 7 documents, un avec 1.
- Il y a des **détails métier** : référence, date d'échéance, responsable, compteur, horodatage.
- La **densité** correspond à l'usage : un outil utilisé 8h/jour est dense, une page d'accueil client est aérée.
- On comprend **l'action principale** de l'écran en 3 secondes.

---

## 3. Checklist avant de livrer un écran

Passer chaque point. Si un point échoue, corriger avant de livrer.

- [ ] Aucune couleur hors charte, aucun dégradé décoratif
- [ ] Aucun emoji, aucun lorem ipsum, aucun "John Doe"
- [ ] Pas de grille de cartes identiques sans justification
- [ ] Un seul bouton primaire par zone
- [ ] Données réalistes et variées (au moins 1 cas "problème" visible : retard, blocage, manquant)
- [ ] Au moins un état non nominal prévu (vide, erreur ou alerte) quand c'est pertinent
- [ ] Les icônes servent à quelque chose, sinon elles sont retirées
- [ ] Les textes sont des libellés métier, pas du marketing
- [ ] Si je cache le logo, l'écran ressemble-t-il à n'importe quel template SaaS ? → si oui, recommencer

---

## 4. Test final

> "Est-ce qu'un utilisateur métier reconnaîtrait SON travail dans cet écran ?"

Si la réponse est non, l'écran est générique. Ajouter du contexte métier, retirer la décoration.
