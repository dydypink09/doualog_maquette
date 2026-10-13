# Étape 0 — Cadrage DOUALOG Control Tower

J'ai lu CLAUDE.md, les 3 specs (sans les images base64) et `charte-graphique/index.html`. Aucun fichier n'a été créé à cette étape.

À noter dès le départ : le dossier `charte/` cité dans CLAUDE.md n'existe pas. La charte est dans `charte-graphique/index.html` et le logo dans `logo.png` à la racine. Cette charte **contredit le CDC §15** (point C1 ci-dessous).

---

## 1. Inventaire des écrans corrigé

**Ce qui manque :**

| ID proposé | Écran | Pourquoi | US |
|---|---|---|---|
| **E02e** | Onglet **Informations générales**, ouvert par défaut | US-17 est MUST et ne figure dans aucun onglet de l'inventaire | US-17, 09 |
| **E02f** | Onglet **Transport** du dossier (suivi de l'OT) | Sans lui, aucun écran interne ne montre la réponse du transporteur, le camion ou les documents de transport. E04 ne couvre que la création | US-28 à 33 (vue interne) |
| **X08** | Email **demande d'information** après contrôle | US-24 est MUST (parcours 3, étape 6) et n'a pas d'écran | US-24 |
| **X05b** | Page de retour après le clic **Accepter / Refuser** | Nécessaire pour la démo : le bouton de l'email doit mener quelque part. C'est aussi là que le transporteur reçoit son lien personnel (parcours 4, étape 5) | US-31 |
| X09 *(SHOULD)* | Email **demande de mandat** | Parcours 1, condition « mandat absent » | US-08 |

**Ce qui ne demande pas d'écran à part :**
- La relance pour documents manquants (US-06) est une variante de X02 : seuls l'objet et un bandeau « Relance n°2 » changent.
- Le code de confirmation par email s'affiche comme un état dans X04 (une fenêtre de saisie du code), pas comme un écran.
- E03, la salle d'attente, s'affiche comme un **onglet de E01**, comme le prévoit le CDC (« onglet ou filtre »). Elle garde quand même son propre fichier.

**Ce qui est en trop, ou à revoir :**
- **US-44 (mandat) est COULD**, alors que X04 l'inclut. Ça contredit la règle « COULD : ne pas faire » (point C6).
- US-12 (exports) et US-19 (versions de documents) sont COULD : ils n'auront pas d'écran. Le bouton « Exporter PDF » du bandeau sera quand même présent (point D13).
- E07 et E08 sont SHOULD : je les garde, mais je les produirai en dernier.

---

## 2. Contenu et actions par écran

**Habillage commun aux écrans internes.** Une topbar `#0A1628` soulignée d'orange contient : le logo, une recherche globale (N° DLG, BL, client), la cloche des notifications avec compteur (vers E08), le sélecteur de rôle et le profil. La navigation latérale sombre affiche des entrées filtrées selon le rôle (CDC §02) : Dossiers, Salle d'attente, Transporteurs, Facturation, Pilotage, Notifications.

| ID | Blocs de contenu | Actions principales | US |
|---|---|---|---|
| **E00** Connexion | Logo, champs email et mot de passe, mention « accès réservé à l'équipe DOUALOG » | Se connecter (vers E01). « Mot de passe oublié » est inerte | 45 |
| **E01** Tableau de bord | Onglets « Dossiers (17) / Salle d'attente (3) ». Barre avec recherche et filtres (type, mode, statut, contrôle, transport, responsable). Tableau des 14 colonnes du CDC §05, avec infobulles au survol de Stockée et Anticipé, et badges pour le type, le contrôle et le transport | Trier par colonne, filtrer, ouvrir un dossier (icône œil, vers E02). Exports Excel/PDF : voir D13 | 10, 11, 13, 16, 22, 46 |
| **E02** Panneau dossier | Panneau en bas de page, avec la liste toujours visible au-dessus. **Bandeau** bleu nuit (12 champs + statut). **Workflow** de 9 étapes colorées, avec infobulles sur Stockée et Anticipé. Onglets | Envoyer un email (vers E02c en mode rédaction), Créer OT (vers E04), Exporter PDF, agrandir ou fermer le panneau | 13, 14, 15, 16 |
| **E02e** Infos générales | Champs du CDC §7.1. Compagnie maritime ou aérienne choisie dans une liste du répertoire. Date de réception en lecture seule. Prestations demandées et prix cible. Liens personnels actifs, avec leur date d'expiration | Modifier et enregistrer, désactiver un lien (`À VALIDER` : aucune US ne le couvre) | 17, 09 |
| **E02a** Douane | 4 blocs empilés. **Déclaration** : date stockée, puis ETA et conteneur, qui font passer en « anticipée ». **Contrôle** : type, 3 dates, inspecteur, résultat, commentaire. Si le résultat est « Info manquante », un encart indique « Demande envoyée au client le … » (vers X08). **BAE** : N°, bouton, date modifiable, statut. **BAS** : même chose, plus un avertissement « déclenche la facturation » | Enregistrer, BAE obtenu, BAS obtenu (fait basculer en facturation) | 22 à 26, 34 |
| **E02b** Documents | Liste des documents obligatoires et facultatifs, chacun avec : présent ou manquant, provenance (email, lien client, transporteur), date. Puis les documents de transport et la facture | Voir, télécharger, ajouter. Lien vers le dossier logistique de la compagnie | 18, 03 |
| **E02c** Messagerie | Filtres par catégorie (Tous / Entrants client / Sortants / Automatiques / Logistiques), fil chronologique, lecture d'un email avec ses pièces jointes | « + Nouveau message » : objet pré-rempli `[DLG-…]`, pièces jointes, envoyer | 20, 21, 02 |
| **E02d** Historique | Journal horodaté (acteur, action, détail), filtrable par équipe, client, transporteur ou système. Les consultations des liens personnels y apparaissent | Filtrer | 47 |
| **E02f** Transport | Résumé de l'OT. Transporteurs sollicités et leur réponse. Frise des statuts transport. Camion et chauffeur. Documents de transport. Lien transporteur actif | Créer OT, marquer « Pas de livraison », désactiver le lien | 28 à 33 |
| **E03** Salle d'attente | Tableau : N° DLG, type, client, réception, **documents manquants** (étiquettes), relances (nombre, dernière, prochaine), mandat trouvé ou absent, ancienneté | Ouvrir le dossier (sur l'onglet Documents), ajouter un document, voir l'email envoyé (X02) | 04, 05, 06, 08 |
| **E04** Création OT et offre | **Étape 1** : OT pré-rempli et modifiable (champs du CDC §9.1), avec l'option « Pas de livraison ». **Étape 2** : choix des transporteurs dans l'annuaire (cases à cocher) et aperçu de l'email X05 | Créer l'offre de transport, ce qui affiche une confirmation et passe le statut à « Demande envoyée » | 27, 28, 29 |
| **E05** Annuaire transporteurs | Tableau : raison sociale, contact, email, téléphone, nombre d'OT, dernier OT | Ajouter, modifier (dans un panneau latéral) | 27 |
| **E06** Facturation | Filtres par statut (En facturation / Émise / Partiellement réglé / Réglé). Tableau : DLG, client, date BAS, N° facture, montant, échéance, statut. **Aperçu de la facture** : client (raison sociale, adresse, IFU), références (DLG, BL, conteneur), prestations, totaux, N° séquentiel | Générer la facture, émettre et envoyer (vers X07), enregistrer un paiement | 34 à 37 |
| **E07** Dashboard Manager | Les 10 tuiles KPI du CDC §14, un sélecteur de période, et la charge par responsable (`À VALIDER`) | Un clic sur une tuile ouvre E01 avec le filtre correspondant | 48 |
| **E08** Notifications | Les 6 types du CDC §13.1, avec lu / non lu, et un filtre par type | Ouvrir le dossier concerné, marquer comme lu | 46 |
| **X01** Email accusé de réception | N° DLG mis en avant, date de réception, pièces reçues. Bouton « Suivre mon dossier » (vers X04). Rappel de la page de suivi (vers X03). Conseil : citer le N° DLG dans les réponses | — | 07, 39 |
| **X02** Email documents manquants | Liste précise des pièces manquantes, plus sa variante « relance » | « Déposer mes documents » (vers X04), ou répondre directement à l'email | 05, 06 |
| **X03** Page de suivi publique | Formulaire DLG + BL/AWB. Résultat : statut, étapes réalisées et à venir, alertes génériques, **aucun document ni montant**. État « aucune correspondance » | Rechercher | 40 |
| **X04** Lien personnel client | En-tête du dossier. **Actions attendues** en premier. Suivi détaillé daté. Documents à télécharger. Dépôt de documents. Instructions douanières. Mandat. Date d'expiration du lien | Télécharger, déposer, envoyer les instructions, signer le mandat (avec saisie du code) | 39 à 42, (44) |
| **X05** Email offre de transport | Récapitulatif de l'OT (DLG, marchandise, poids, colis, adresses, date, instructions) | Accepter, Refuser | 30, 31 |
| **X05b** Retour transporteur | « Offre acceptée » avec un accès au lien (vers X06), « Offre refusée », ou « Offre déjà attribuée » | — | 31 |
| **X06** Lien transporteur | Récapitulatif de l'OT. Camion : immatriculation et chauffeur. Statuts proposés dans l'ordre : Chargement, puis En route, puis Livré. Dépôt du bon de livraison signé, de la CMR et des photos | Mettre à jour le statut, déposer les documents | 32, 33 |
| **X07** Email facture | N° de facture, montant, échéance, PDF en pièce jointe, références, lien vers le dossier | — | 36 |
| **X08** Email demande d'information | Information demandée (reprise du commentaire du contrôle) | Répondre via le lien (vers X04), ou par email | 24 |

---

## 3. Points à trancher

### Points bloquants avant de coder

- **C1. Deux chartes incompatibles.**
  - Le CDC §15 prévoit : Inter, `#0A1628` / `#1E3A5F`, orange `#F97316`, fond blanc, 9 couleurs de badges.
  - `charte-graphique/` prévoit : police **Sora**, marine `#0C2C5E`, **or `#D6821A`**, fond ivoire `#F1EEE7`, 6 teintes de statut (dont le contrôle en magenta et le transport en rouille), plus un « rond de santé » absent des specs.

  → **Ma recommandation :** CLAUDE.md impose le CDC, donc je prends les couleurs et la police du CDC. De la charte, je reprends : les règles du logo, le rayon de 6 px, les badges en pilule, l'absence d'ombre, les icônes au trait de 1,8 px et l'échelle typographique. Point important : **il n'existe pas de logo en version blanche**. Sur la topbar sombre, il faudra donc mettre le monogramme sur une pastille blanche. Confirmez-vous ?

- **C2. Un seul statut global alors que plusieurs pistes avancent en parallèle.**
  - Facturé et Livré peuvent être vrais en même temps : lequel affiche-t-on ?
  - Deux statuts ne durent qu'un instant. « BAS obtenu » bascule aussitôt en « En facturation ». « Demande de transport envoyée » devient « À confirmer » dès l'envoi.

  → **Ma recommandation :** le statut global suit la piste douane puis facturation, et la livraison se lit dans la colonne Transport. « Livré » ne s'affiche en statut global que si la facture n'est pas encore émise.

- **C3. Pas de colonne « Statut » dans la liste du CDC §05,** alors qu'US-16 demande de voir le statut sans ouvrir le dossier. → Je propose d'ajouter cette colonne après « Client ».

- **C4. Pays, devise et références locales.** Le N° **IFU** fait penser au Bénin ou au Burkina, mais rien ne le confirme. Il me faut le pays, le port et l'aéroport, la devise (XOF ou XAF) et le taux de TVA. Il me faut aussi la **liste des prestations facturables** (point US n°3). Sans elle, la facture d'E06 et X07 sera remplie de valeurs provisoires marquées `À VALIDER`.

- **C5. Moment de création de l'OT.** Est-ce après le BAS seulement, ou dès le BAE ? → **Je recommande : dès le BAE.** Le bouton « Créer OT » est déjà dans le bandeau, sans condition. Ce choix change le jeu de données.

- **C6. Mandat (US-44, COULD) et formulaire infos société (US-43, SHOULD) dans X04.** → **Je recommande :** garder le mandat, parce que le parcours 6 le décrit et qu'il est parlant en démo. Ne pas faire US-43.

- **C7. Offre envoyée à plusieurs transporteurs.** La première acceptation ferme-t-elle l'offre pour les autres ? → **Je recommande : oui,** avec l'écran X05b « Offre déjà attribuée ».

### Points non bloquants (je pose un `<!-- À VALIDER -->` et j'applique ma proposition)

- **D1.** Après un résultat « Info manquante » : je retiens **« Info manquante »** plutôt que « En attente de réponse ».
- **D2.** Ordre des statuts transport : **Chargement, puis En route.**
- **D3.** Couleurs des statuts de facture, que le CDC ne définit pas : je propose Facture émise en bleu, Partiellement réglé en orange, Réglé en vert.
- **D4.** Contrôle « non conforme » : l'option sera sélectionnable, sans suite affichée.
- **D5.** Refus d'une offre : un bouton « Solliciter un autre transporteur » sera présent, mais inerte.
- **D6.** Code de confirmation : le CDC l'exige pour le mandat **et** le dépôt de documents, les user flows seulement pour le mandat. Je suis le CDC.
- **D7.** **La page de suivi publique n'est pas utilisable pour un export ni pour un dossier incomplet** : le BL/AWB n'est pas obligatoire à l'export. Quelle autre référence demander dans ce cas ?
- **D8.** **Aérien :** l'étape « Anticipé » exige un ETA navire et un conteneur. Faut-il un équivalent pour l'aérien (ETA du vol, N° LTA) ?
- **D9.** Le **bon de livraison**, obligatoire à l'import (CDC §3.2), manque dans la liste documentaire du §7.2. Je l'ajoute.
- **D10.** « Responsable » et « Déclarant assigné » : est-ce la même personne ? Et qui l'assigne ?
- **D11.** Fréquence des relances et durée de validité des liens : j'affiche « prochaine relance le … » et « expire le … » avec 30 jours, comme proposé dans les user flows.
- **D12.** US-30 parle encore d'un « portail transporteur » avec un accès et une liste des offres : c'est la même contradiction que côté client. J'applique le CDC §12 (un lien = un OT).
- **D13.** « Exporter PDF » fait partie des critères d'US-14 (MUST), mais les exports relèvent d'US-12 (COULD). Le bouton sera visible et affichera un simple message.
- **D14.** La notification « Modification de déclaration en attente » n'a aucun déclencheur défini.
- **D15.** Les champs de l'annuaire transporteurs ne sont pas définis : je me limite au minimum (raison sociale, contact, email, téléphone).
- **D16.** Clôture d'un dossier « Pas de livraison » : je considère qu'elle se fait sur la seule facture réglée.

---

## 4. Plan du jeu de données (`data.js`)

- **Date du jour fictive :** vendredi 16/10/2026. Les dates de réception vont du 22/09 au 16/10.
- **Clients :** 12 clients fictifs, dont certains ont plusieurs dossiers.
- **Transporteurs :** 6 transporteurs dans l'annuaire.
- **Équipe :** 6 personnes, une par rôle.

| N° | Type · Mode | Client | Statut dossier | Contrôle | Transport | Facture |
|---|---|---|---|---|---|---|
| 0398 | Import · Maritime | Boissons du Delta | **Clôturé** | Aucun | Livré | Réglé |
| 0401 | Import · Maritime | BTP Horizon | **Facturé** | Documentaire, conforme | Chargement | Émise |
| 0403 | Export · Aérien | Comptoir Textile du Golfe | **Livré** | Aucun | Livré | Partiellement réglé |
| 0405 | Import · Aérien | Medilab Équipements | **En facturation** | Aucun | Pas de livraison | — |
| 0407 | Import · Maritime | Électro Plus Distribution | **BAS obtenu** *(statut transitoire)* | Physique, conforme | Camion affecté | — |
| 0410 | Import · Maritime | Pharmadis Afrique | **BAE obtenu** | Aucun | Confirmé | — |
| **0412 ★** | Import · Maritime | **Agro-Industrie du Littoral** | **En facturation** | Physique, conforme | **En route** | — |
| 0413 | Export · Maritime | Cacao & Café Export | **BAE obtenu** | Aucun | À confirmer (2 transporteurs sollicités) | — |
| 0415 | Import · Maritime | AutoParts Pro | **Contrôle physique en cours** | Physique | — | — |
| 0416 | Import · Maritime | BTP Horizon | **Info manquante** | Documentaire | — | — |
| 0417 | Export · Aérien | Pharmadis Afrique | **Contrôle documentaire en cours** | Documentaire | — | — |
| 0419 | Import · Maritime | Électro Plus Distribution | **Contrôle physique en cours** | Physique | — | — |
| 0420 | Import · Maritime | Éts Kora & Fils | **Déclaration anticipée** | — | — | — |
| 0421 | Export · Maritime | Société Cotonnière de l'Ouest | **Déclaration anticipée** | — | — | — |
| 0423 | Import · Aérien | Medilab Équipements | **Déclaration stockée** | — | — | — |
| 0424 | Import · Maritime | Agro-Industrie du Littoral | **En cours de traitement** | — | — | — |
| 0425 | Export · Aérien | Comptoir Textile du Golfe | **En cours de traitement** | — | — | — |
| 0426 | Import · Maritime | Boissons du Delta | **En attente de documents** (manquent le BL et le bon de livraison) | — | — | — |
| 0427 | Export · Maritime | Anacarde Trading | **En attente de documents** (manque l'instruction douane, mandat absent) | — | — | — |
| 0428 | Import · Aérien | Éts Kora & Fils | **En attente de documents** (manque la packing list) | — | — | — |

**Couverture du jeu de données :**
- Les 13 statuts dossier sont présents.
- 7 statuts transport sur 8 : « Demande envoyée » ne dure qu'un instant (C2).
- Les 3 statuts de facture sont présents.
- Répartition : 14 imports et 6 exports, 14 maritimes et 6 aériens.
- Les quotas de CLAUDE.md sont respectés : 2 contrôles physiques, 1 info manquante, 3 en salle d'attente, 2 en facturation, 1 clôturé.

**Dossier fil rouge DLG-2026-0412**, figé à l'état « En facturation » avec le transport « En route ». Cet état permet de montrer tous les parcours sur un seul dossier :
1. Réception le 29/09, déclaration stockée le 01/10, anticipée le 03/10 (ETA le 05/10).
2. Contrôle physique du 06 au 08/10, conforme. BAE le 09/10.
3. OT créé le 09/10 et envoyé à 2 transporteurs. Trans-Express Logistique accepte.
4. BAS le 12/10, ce qui déclenche la facturation.
5. Camion affecté le 13/10, chargement le 14/10, en route le 15/10.
6. **En démo :** générer la facture (E06), qui envoie X07. Le transporteur confirme la livraison (X06). Le dossier peut alors être clôturé dès le paiement.

En attente des décisions, en priorité **C1 à C7**, pour passer à l'étape 1 (tokens et design system).
