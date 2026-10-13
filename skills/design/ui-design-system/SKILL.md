---
name: ui-design-system
description: Transforme une charte graphique en design system HTML/CSS (tokens, composants, règles d'usage) et l'applique à toutes les maquettes. À utiliser avant de créer le premier écran et à chaque nouvel écran pour rester cohérent.
---

# UI Design System

Objectif : **toutes les pages se ressemblent comme si une seule personne les avait dessinées le même jour.**
On ne crée jamais un style "à la volée" dans une page. Tout passe par les tokens et les composants.

---

## 1. Ordre de travail (obligatoire)

1. **Lire la charte graphique** fournie (couleurs, typo, logo, ton). Elle est la source de vérité.
2. **Générer `tokens.css`** à partir de la charte (section 2). Ne rien inventer qui contredit la charte. Si une valeur manque (ex. couleur d'alerte), la déduire de la palette existante et le signaler dans un commentaire `/* déduit, à valider */`.
3. **Générer `components.css`** (section 3).
4. **Générer `design-system.html`** : une page qui affiche tous les tokens et composants. C'est la référence visuelle et elle sert à valider avant de produire les écrans.
5. Seulement ensuite, produire les écrans. Chaque écran importe `tokens.css` + `components.css` et **n'ajoute que du layout spécifique**.

---

## 2. Tokens (`tokens.css`)

Tout est en variables CSS sur `:root`. Nommage sémantique (par usage), pas par couleur.

```css
:root {
  /* — Palette brute (issue de la charte) — */
  --brand-500: #XXXXXX;   /* couleur principale charte */
  --brand-600: #XXXXXX;   /* hover */
  --brand-50:  #XXXXXX;   /* fond léger */
  --neutral-0:   #FFFFFF;
  --neutral-50:  #XXXXXX;
  --neutral-100: #XXXXXX;
  --neutral-200: #XXXXXX;
  --neutral-400: #XXXXXX;
  --neutral-600: #XXXXXX;
  --neutral-900: #XXXXXX;

  /* — Sémantique : surfaces & texte — */
  --bg-app:        var(--neutral-50);
  --bg-surface:    var(--neutral-0);
  --bg-subtle:     var(--neutral-100);
  --border:        var(--neutral-200);
  --text-primary:  var(--neutral-900);
  --text-secondary:var(--neutral-600);
  --text-muted:    var(--neutral-400);

  /* — Sémantique : actions — */
  --action-primary:       var(--brand-500);
  --action-primary-hover: var(--brand-600);
  --focus-ring:           var(--brand-500);

  /* — Sémantique : statuts (toujours paire fond + texte) — */
  --status-success-bg: #XXXXXX; --status-success-fg: #XXXXXX;
  --status-warning-bg: #XXXXXX; --status-warning-fg: #XXXXXX;
  --status-danger-bg:  #XXXXXX; --status-danger-fg:  #XXXXXX;
  --status-info-bg:    #XXXXXX; --status-info-fg:    #XXXXXX;
  --status-neutral-bg: #XXXXXX; --status-neutral-fg: #XXXXXX;

  /* — Typographie — */
  --font-sans: "<police charte>", system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;
  --fs-xs: 12px;  --fs-sm: 13px;  --fs-md: 14px;
  --fs-lg: 16px;  --fs-xl: 20px;  --fs-2xl: 24px;
  --fw-regular: 400; --fw-medium: 500; --fw-semibold: 600;
  --lh-tight: 1.25; --lh-normal: 1.5;

  /* — Espacements (base 4) — */
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
  --sp-5: 20px; --sp-6: 24px; --sp-8: 32px; --sp-10: 40px;

  /* — Formes — */
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / .06);
  --shadow-md: 0 4px 12px rgb(0 0 0 / .08);

  /* — Layout — */
  --sidebar-w: 232px;
  --topbar-h: 56px;
  --row-h: 40px;        /* hauteur ligne tableau */
  --control-h: 36px;    /* hauteur input / bouton */
}
```

### Règles tokens
- **Aucune valeur en dur dans les pages** (pas de `#hex`, pas de `px` hors tokens), sauf layout ponctuel.
- Contraste texte/fond **≥ 4.5:1** (WCAG AA). Vérifier chaque paire de statut.
- Un statut n'est **jamais** porté par la couleur seule : toujours couleur + libellé (et icône si utile).
- La couleur de marque est réservée aux actions primaires, à l'élément actif de la nav et au focus. Pas en fond de grandes zones.

---

## 3. Composants (`components.css`)

Classes simples, préfixe `.c-` pour éviter les collisions. Chaque composant a ses états.

| Composant | Variantes | États à prévoir |
|---|---|---|
| `.c-btn` | primary, secondary, ghost, danger ; sm / md | hover, focus, disabled, loading |
| `.c-input`, `.c-select`, `.c-textarea` | avec label, aide, erreur | focus, error, disabled, readonly |
| `.c-badge` | success, warning, danger, info, neutral | — |
| `.c-table` | dense, avec sélection, ligne cliquable | hover, ligne sélectionnée, ligne en alerte |
| `.c-card` | simple, avec header/actions | — |
| `.c-tabs` | — | actif, hover |
| `.c-nav` (sidebar) | — | item actif, compteur |
| `.c-alert` | info, warning, danger, success | — |
| `.c-empty` | état vide avec texte + action | — |
| `.c-timeline` | événements horodatés | — |
| `.c-drawer` / `.c-panel` | panneau détail | ouvert / fermé |
| `.c-modal` | confirmation, formulaire | — |
| `.c-toolbar` | recherche + filtres + actions | filtres actifs |
| `.c-pagination` | — | — |

### Règles composants
- Focus visible partout (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).
- Zones cliquables ≥ 32px de haut (36px recommandé).
- Labels de formulaire **au-dessus** du champ, jamais en placeholder seul.
- Champs obligatoires marqués `*`, messages d'erreur sous le champ, en langage clair.

---

## 4. Structure des fichiers

```
output/
├── assets/
│   ├── tokens.css
│   ├── components.css
│   └── icons/            (si besoin, sinon Lucide via CDN)
├── design-system.html    ← référence visuelle, à valider en premier
├── index.html            ← sommaire de toutes les maquettes
└── ecrans/
    ├── 01-xxx.html
    └── ...
```

- Une page = un écran. Navigation entre écrans par liens `<a href>`.
- Pas de framework JS. JS minimal autorisé uniquement pour : ouvrir un panneau, changer d'onglet, afficher une modale.
- Icônes : Lucide (CDN), une seule bibliothèque.

---

## 5. Contrôle de cohérence (à chaque nouvel écran)

- [ ] L'écran importe `tokens.css` et `components.css`
- [ ] Aucune couleur / taille en dur
- [ ] Mêmes sidebar, topbar et marges que les autres écrans
- [ ] Les badges de statut utilisent exactement les mêmes libellés et couleurs partout
- [ ] Si un nouveau composant est nécessaire : l'ajouter à `components.css` **et** à `design-system.html`, jamais en local dans la page
