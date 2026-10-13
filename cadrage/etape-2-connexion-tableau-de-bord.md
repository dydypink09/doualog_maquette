# Étape 2 — E00 Connexion et E01 Tableau de bord

L'étape 2 est faite : E00 et E01 fonctionnent et passent la checklist anti-generic. J'ai vérifié le rendu dans Edge à 1366 px et testé les interactions avec un script : tri, filtres rapides, panneau Filtres, recherche, état vide, changement de rôle, message d'export.

**Une entorse à « uniquement les composants existants ».** La colonne collante n'existait pas dans `components.css`. Je l'ai ajoutée avec deux autres petits composants, dans `components.css` et dans `design-system.html` comme le demande CLAUDE.md. Tout le reste réutilise l'existant : le message d'export est une alerte, le panneau Filtres est le panneau latéral déjà prévu.

## Fichiers

**Créés**
- `output/interne/E00-connexion.html`
- `output/interne/E01-tableau-de-bord.html`
- `output/assets/shell.js` : topbar et menu communs à tous les écrans internes. Le rôle choisi est mémorisé d'un écran à l'autre.

**Modifiés**
- `assets/data.js` : entrées du menu et accès par rôle, selon le CDC §02.
- `assets/components.css` et `design-system.html` :
  - **colonnes collantes** : la colonne N° dossier reste à gauche. J'ai aussi fixé la colonne de l'œil à droite, sinon elle sortait de l'écran à 1366 px ;
  - **infobulle sous la cellule**, sinon elle est coupée sur les deux premières lignes ;
  - **écran de connexion** ;
  - correction d'un ascenseur parasite sur les onglets.
- `QUESTIONS-ONCLE.md` : deux questions ajoutées (§2.2 et §2.3).

## Choix à connaître

- **Tri par urgence** : info manquante, puis contrôles, puis dédouanement en cours, bons obtenus, facturation, et les dossiers terminés en dernier. À égalité, ceux qui ont des alertes passent d'abord, puis le plus ancien. Cliquer sur une colonne la trie ; un bouton « Revenir au tri par urgence » apparaît alors.
- **Filtres rapides** : Tous, Info manquante, En contrôle, Transport à confirmer, En facturation, Avec alertes. « Mes dossiers » n'apparaît qu'en vue Déclarant.
- **Retiré** : l'icône navire/avion dans la colonne Type, illisible à 14 px, et la colonne Type de la salle d'attente, pour qu'elle tienne en 1366 px (E03 la reprendra).
- **Liens vers des écrans pas encore créés** : pour l'instant, ils mènent à une page introuvable.
  - `E02-dossier.html?id=…` (l'œil et le N° dossier) ;
  - E05, E06, E07, E08 (menu et cloche) ;
  - `externe/X03-suivi-public.html` (lien en bas de la connexion).

## À VALIDER

- **Qui voit quoi selon le profil** (US-45) : réglé dans `data.js`, question §2.2. La Direction voit tout en lecture seule, mais rien ne l'indique encore à l'écran.
- **Ordre du tri par urgence** : question §2.3.
- **« Mot de passe oublié »** : la procédure n'est pas décrite dans les specs, le lien est inactif. C'est une question technique, pas pour le client.

## Checklist anti-generic

- Uniquement les couleurs de la charte : aucun dégradé décoratif, aucune ombre.
- Aucun emoji, aucun texte de remplissage.
- Un seul bouton primaire, sur E00. E01 n'en a pas, car les dossiers naissent des emails.
- Les exceptions se voient : filet rouge pour l'info manquante, filet rouille pour les contrôles, compteurs d'alertes rouges, ligne du fil rouge 0412 surlignée.
- États non nominaux prévus : liste vide après filtrage, message d'export, salle d'attente.
- Libellés métier partout (BAE, BAS, LTA, pièces manquantes, relances).

Rien n'est commité. Étape suivante après validation : étape 3 (E02).
