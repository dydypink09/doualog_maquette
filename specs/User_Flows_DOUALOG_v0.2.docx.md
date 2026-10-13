

**USER FLOWS**

**DOUALOG DASHBOARD**

*CONNECTER  •  SÉCURISER  •  LIVRER*

![][image1]

| Version | 0.1 — Septembre 2026 |
| :---- | :---- |
| **Statut** | Document de travail — à valider |
| **Référence** | Cahier des charges fonctionnel v1.0 |
| **Phase** | Phase UX |

**01**  
**OBJET DU DOCUMENT**

Ce document décrit, étape par étape, les six parcours clés de la plateforme DOUALOG : qui agit, ce qui se passe, et le statut que prend le dossier après chaque étape.

Il s’appuie exclusivement sur le cahier des charges fonctionnel v1.1 et reprend les user stories V1 (références US-XX). Il servira de base à la conception des écrans.

**Principe d’accès pour les clients et les transporteurs**

Les clients et les transporteurs n’ont aucun compte à créer ni aucun mot de passe à retenir. Tous les échanges passent par email, sur le modèle du suivi de colis :

* Le client suit son dossier grâce à une page de suivi (numéro DLG \+ référence BL / AWB) et aux liens personnels reçus dans chaque email.

* Le transporteur accepte ou refuse une offre directement depuis l’email reçu, puis met à jour la livraison et dépose ses documents via un lien personnel.

* Chaque lien personnel est rattaché à un seul dossier ou à un seul ordre de transport, a une durée de validité limitée et peut être désactivé par DOUALOG à tout moment.

**Cycle complet d’un dossier (CDC §17)**

| Email entrant | Dossier DLG | Douane | Transport | Facturation | Clôture |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **P1 · P2** | **P1 · P2** | **P3** | **P4** | **P5** | **P5** |

**Les six parcours**

| N° | Parcours | Ce qu’il couvre |
| ----- | :---- | :---- |
| **1** | **Réception email → création du dossier DLG** | Création automatique, consolidation, mandat, accusé de réception |
| **2** | **Dossier incomplet → salle d’attente** | Documents manquants, relances, bascule dans le tableau de bord |
| **3** | **Workflow du dossier jusqu’au BAE / BAS** | Déclaration, contrôle douane, BAE, BAS |
| **4** | **Ordre de transport → suivi transporteur par email** | OT, acceptation depuis l’email, livraison, documents de transport |
| **5** | **Facturation déclenchée au BAS** | Facture, paiement, clôture du dossier |
| **6** | **Suivi client sans compte** | Page de suivi, liens personnels, actions attendues du client |

**Comment lire un parcours**

| 1 | Étape : un acteur réalise une action. La colonne de droite indique le statut obtenu. |
| :---: | :---- |
| **◆** | Condition : le parcours se divise selon la réponse, chaque réponse indique la suite. |
| **✓** | Fin du parcours et parcours suivant. |

**02**

**RÉFÉRENTIEL DES STATUTS**

Statuts et couleurs repris du cahier des charges. Ils sont utilisés dans la colonne « Statut » de chaque parcours.

**Statuts du dossier (CDC §08)**

| Statut | Couleur | Aperçu |
| :---- | :---- | :---- |
| En attente de documents | Gris |  **En attente de documents**  |
| En cours de traitement | Bleu |  **En cours de traitement**  |
| Déclaration stockée | Bleu doux |  **Déclaration stockée**  |
| Déclaration anticipée | Bleu doux |  **Déclaration anticipée**  |
| Contrôle physique en cours | Orange |  **Contrôle physique en cours**  |
| Contrôle documentaire en cours | Orange |  **Contrôle documentaire en cours**  |
| Info manquante | Rouge |  **Info manquante**  |
| BAE obtenu | Vert clair |  **BAE obtenu**  |
| BAS obtenu | Vert |  **BAS obtenu**  |
| En facturation | Violet |  **En facturation**  |
| Facturé | Vert foncé |  **Facturé**  |
| Livré | Vert foncé |  **Livré**  |
| Clôturé | Vert foncé |  **Clôturé**  |

**Statuts transport (CDC §09.3)**

| Statut | Couleur | Aperçu |
| :---- | :---- | :---- |
| Demande de transport envoyée | Bleu |  **Demande de transport envoyée**  |
| À confirmer | Orange |  **À confirmer**  |
| Confirmé | Vert |  **Confirmé**  |
| Camion affecté | Vert |  **Camion affecté**  |
| Chargement | Bleu doux |  **Chargement**  |
| En route | Bleu |  **En route**  |
| Livré | Vert foncé |  **Livré**  |
| Pas de livraison | Gris |  **Pas de livraison**  |

**Statuts facture (CDC §10.3)**

| Statut | Couleur | Aperçu |
| :---- | :---- | :---- |
| Facture émise | Non définie |  **Facture émise**  |
| Partiellement réglé | Non définie |  **Partiellement réglé**  |
| Réglé | Non définie |  **Réglé**  |

**03**

**PARCOURS 1 — RÉCEPTION D’UN EMAIL ET CRÉATION DU DOSSIER DLG**

| Objectif | Transformer automatiquement chaque envoi client en dossier DLG unique. |
| :---- | :---- |
| **Acteurs** | Client, Plateforme |
| **Déclencheur** | Un email contenant des pièces jointes arrive dans la boîte DOUALOG. |
| **Résultat** | Un dossier DLG existe, le client a reçu son accusé de réception et son lien personnel de suivi. |
| **Références** | CDC §03, §04 · US-01, US-02, US-03, US-07, US-08, US-09 |

| N° | Acteur | Action | Statut après l’étape |
| ----- | :---- | :---- | ----- |
| **1** | **Client** | Envoie un email avec ses pièces jointes à la boîte DOUALOG. Il peut indiquer les prestations souhaitées et un prix cible. | — |
| **2** | **Plateforme** | Détecte l’email entrant (surveillance continue de la boîte). | — |
| **◆** | **Condition : l’objet ou le corps de l’email contient-il un numéro DLG existant ?** **Oui**  →  l’email est rattaché au dossier existant, aucun nouveau dossier n’est créé. Fin du parcours. **Non**  →  étape 3\. |  |  |
| **3** | **Plateforme** | Crée le dossier : numéro DLG-AAAA-NNNN, type Import ou Export, date de réception horodatée. Les prestations indiquées pré-remplissent la grille tarifaire. | — |
| **4** | **Plateforme** | Recherche un mandat valide dans la base client. | — |
| **◆** | **Condition : un mandat valide est-il trouvé ?** **Oui**  →  aucune action, étape 5\. **Non**  →  email automatique au client avec le modèle de mandat DOUALOG et un lien personnel pour le signer, puis étape 5\. Le dossier n’est pas bloqué. |  |  |
| **5** | **Plateforme** | Vérifie les documents obligatoires selon le type (Import : facture, packing list, instruction douane, BL / AWB, bon de livraison. Export : facture, packing list, instruction douane). | — |
| **◆** | **Condition : tous les documents obligatoires sont-ils présents ?** **Oui**  →  étape 6 : le dossier entre dans le tableau de bord. **Non**  →  le dossier passe « En attente de documents » et suit le parcours 2, puis étape 7 pour l’accusé de réception. |  |  |
| **6** | **Plateforme** | Le dossier complet apparaît dans le tableau de bord principal. | **DOSSIER**  **En cours de traitement**  |
| **7** | **Plateforme** | Envoie l’accusé de réception au client, dans tous les cas : numéro DLG attribué, lien personnel vers son dossier et rappel de la page de suivi (numéro DLG \+ référence BL / AWB). | — |
| **✓** | **Fin du parcours : dossier créé, client informé. Suite : parcours 3 (dossier complet) ou parcours 2 (dossier incomplet).** |  |  |

**04**

**PARCOURS 2 — DOSSIER INCOMPLET ET SALLE D’ATTENTE**

| Objectif | Obtenir les documents manquants sans encombrer le tableau de bord principal. |
| :---- | :---- |
| **Acteurs** | Plateforme, Client |
| **Déclencheur** | Un ou plusieurs documents obligatoires manquent à la création du dossier. |
| **Résultat** | Le dossier complet bascule dans le tableau de bord principal. |
| **Références** | CDC §03.3, §04.2, §05 · US-02, US-04, US-05, US-06 |

| N° | Acteur | Action | Statut après l’étape |
| ----- | :---- | :---- | :---- |
| **1** | **Plateforme** | Crée le dossier malgré les documents manquants. | **DOSSIER**  **En attente de documents**  |
| **2** | **Plateforme** | Place le dossier en salle d’attente : il n’apparaît pas dans le tableau de bord principal, mais reste consultable via un onglet ou un filtre dédié. | **DOSSIER**  **En attente de documents**  |
| **3** | **Plateforme** | Envoie au client un email listant précisément les documents manquants, avec son lien personnel pour les déposer. | **DOSSIER**  **En attente de documents**  |
| **4** | **Client** | Transmet les documents manquants, soit en répondant à l’email (le numéro DLG permet le rattachement automatique au dossier), soit en les déposant via son lien personnel. | **DOSSIER**  **En attente de documents**  |
| **◆** | **Condition : le dossier est-il désormais complet ?** **Non**  →  une relance automatique est envoyée au client, retour à l’étape 4\. **Oui**  →  étape 5\. |  |  |
| **5** | **Plateforme** | Arrête les relances et fait basculer le dossier dans le tableau de bord principal. | **DOSSIER**  **En cours de traitement**  |
| **✓** | **Fin du parcours : dossier complet, prêt pour le traitement douanier (parcours 3).** |  |  |

**📌 Note :** La fréquence des relances automatiques n’est pas précisée dans le cahier des charges.

**05**

**PARCOURS 3 — WORKFLOW DU DOSSIER JUSQU’AU BAE / BAS**

| Objectif | Mener le dossier à travers toutes les étapes douanières, jusqu’au Bon à Sortir. |
| :---- | :---- |
| **Acteurs** | Déclarant Douane, Plateforme, Client |
| **Déclencheur** | Le dossier est complet et entre dans le tableau de bord. |
| **Résultat** | BAE et BAS obtenus ; la facturation est déclenchée. |
| **Références** | CDC §06.2, §07.3 à §07.5, §08 · US-22 à US-26 |

| N° | Acteur | Action | Statut après l’étape |
| ----- | :---- | :---- | ----- |
| **1** | **Déclarant Douane** | Ouvre le dossier depuis le tableau de bord (icône œil). | **DOSSIER**  **En cours de traitement**  |
| **2** | **Déclarant Douane** | Saisit la déclaration stockée. | **DOSSIER**  **Déclaration stockée**  |
| **3** | **Déclarant Douane** | Renseigne l’ETA du navire et le numéro de conteneur. | **DOSSIER**  **Déclaration anticipée**  |
| **4** | **Déclarant Douane** | Sélectionne le type de contrôle notifié par la douane. | — |
| **◆** | **Condition : quel est le type de contrôle ?** **Aucun**  →  étape 7\. **Physique**  →  statut « Contrôle physique en cours », étape 5\. **Documentaire**  →  statut « Contrôle documentaire en cours », étape 5\. |  |  |
| **5** | **Déclarant Douane** | Renseigne le contrôle : date de notification, date de contrôle, fin de contrôle, inspecteur, résultat, commentaire. | **DOSSIER**  **Contrôle physique en cours**  **DOSSIER**  **Contrôle documentaire en cours**  |
| **◆** | **Condition : quel est le résultat du contrôle ?** **Conforme**  →  étape 7\. **Info manquante**  →  étape 6\. **Non conforme**  →  suite non précisée dans le cahier des charges (voir points à préciser). |  |  |
| **6** | **Plateforme** | Change le statut et envoie automatiquement une demande d’information au client, avec son lien personnel pour répondre. Sa réponse (par email ou via le lien) est rattachée au dossier, puis retour à l’étape 5\. | **DOSSIER**  **Info manquante**  |
| **7** | **Déclarant Douane** | Saisit le numéro de BAE et clique sur « BAE obtenu » : la date du jour est enregistrée (modifiable). | **DOSSIER**  **BAE obtenu**  |
| **8** | **Déclarant Douane** | Saisit le numéro de BAS et clique sur « BAS obtenu » : la date du jour est enregistrée (modifiable). | **DOSSIER**  **BAS obtenu**  |
| **✓** | **Fin du parcours : phase douane terminée. La validation du BAS déclenche le parcours 5 (facturation) ; le transport suit le parcours 4\.** |  |  |

**📌 Note :** À chaque étape, le workflow horizontal du dossier et le suivi client (parcours 6\) sont mis à jour.

**06**

**PARCOURS 4 — ORDRE DE TRANSPORT ET SUIVI TRANSPORTEUR PAR EMAIL**

| Objectif | Organiser la livraison de la marchandise avec un transporteur, sans échange téléphonique et sans création de compte. |
| :---- | :---- |
| **Acteurs** | Service Transport, Plateforme, Transporteur |
| **Déclencheur** | Le dossier nécessite une livraison (étape « Transport » du workflow). |
| **Résultat** | La livraison est confirmée et les documents de transport sont archivés dans le dossier. |
| **Références** | CDC §09, §12 · US-27 à US-33 |

| N° | Acteur | Action | Statut après l’étape |
| ----- | :---- | :---- | ----- |
| **◆** | **Condition : le dossier nécessite-t-il un transport ?** **Non**  →  statut transport « Pas de livraison ». Fin du parcours. **Oui**  →  étape 1\. |  |  |
| **1** | **Service Transport** | Clique sur « Créer OT » : l’ordre de transport est pré-rempli depuis le dossier (marchandise, poids, colis, adresses, date de prise en charge, Incoterm, instructions). | — |
| **2** | **Service Transport** | Clique sur « Créer Offre de Transport » et sélectionne un ou plusieurs transporteurs dans l’annuaire. | **TRANSPORT**  **Demande de transport envoyée**  |
| **3** | **Plateforme** | Envoie l’offre par email à chaque transporteur sélectionné : récapitulatif de l’ordre de transport et deux boutons « Accepter » et « Refuser ». | **TRANSPORT**  **À confirmer**  |
| **4** | **Transporteur** | Consulte l’offre directement dans l’email reçu. | **TRANSPORT**  **À confirmer**  |
| **◆** | **Condition : le transporteur accepte-t-il l’offre ?** **Oui**  →  étape 5\. **Non**  →  clic sur « Refuser », refus enregistré ; la suite n’est pas précisée dans le cahier des charges (voir points à préciser). |  |  |
| **5** | **Transporteur** | Clique sur « Accepter ». Une notification interne « Confirmation transporteur reçue » est émise. Le transporteur reçoit un lien personnel rattaché à cet ordre de transport. | **TRANSPORT**  **Confirmé**  |
| **6** | **Transporteur** | Via son lien personnel, renseigne l’immatriculation du camion et le chauffeur. | **TRANSPORT**  **Camion affecté**  |
| **7** | **Transporteur** | Via son lien personnel, met à jour le statut pendant le chargement puis le trajet. | **TRANSPORT**  **Chargement**  **TRANSPORT**  **En route**  |
| **8** | **Transporteur** | Via son lien personnel, confirme la livraison. | **TRANSPORT**  **Livré**  **DOSSIER**  **Livré**  |
| **9** | **Transporteur** | Via son lien personnel, dépose le bon de livraison signé, la CMR et les photos. Ils sont archivés automatiquement dans le dossier. Le lien expire ensuite. | — |
| **✓** | **Fin du parcours : livraison confirmée. Elle est l’une des deux conditions de clôture du dossier (parcours 5).** |  |  |

**📌 Note :** La colonne Transport du tableau de bord reflète ces statuts en temps réel.

**📌 Note :** Chaque action du transporteur via son lien personnel est enregistrée dans le journal du dossier.

**07**

**PARCOURS 5 — FACTURATION DÉCLENCHÉE AU BAS**

| Objectif | Facturer chaque dossier dès la fin de la phase douane, sans oubli ni ressaisie. |
| :---- | :---- |
| **Acteurs** | Déclarant Douane, Plateforme, Service Facturation, Client |
| **Déclencheur** | Le déclarant valide le BAS (parcours 3, étape 8). |
| **Résultat** | La facture est réglée et le dossier est clôturé. |
| **Références** | CDC §07.5, §08, §10, §13.1 · US-34 à US-38 |

| N° | Acteur | Action | Statut après l’étape |
| ----- | :---- | :---- | :---- |
| **1** | **Déclarant Douane** | Valide le BAS. | **DOSSIER**  **BAS obtenu**  |
| **2** | **Plateforme** | Bascule automatiquement le dossier en facturation et émet la notification interne « BAS obtenu ». | **DOSSIER**  **En facturation**  |
| **3** | **Service Facturation** | Génère la facture depuis le dossier : informations client, prestations de la grille tarifaire, références (N° DLG, BL, conteneur). PDF numéroté séquentiellement et archivé dans le dossier. | **DOSSIER**  **En facturation**  |
| **4** | **Plateforme** | Envoie la facture par email au client et émet une notification interne. | **DOSSIER**  **Facturé**  **FACTURE**  **Facture émise**  |
| **◆** | **Condition : quel paiement est reçu ?** **Aucun à échéance**  →  relance automatique au client, retour à l’attente du paiement. **Acompte**  →  statut facture « Partiellement réglé », attente du solde. **Paiement intégral**  →  étape 5\. |  |  |
| **5** | **Service Facturation** | Enregistre le paiement intégral. | **FACTURE**  **Réglé**  |
| **◆** | **Condition : la livraison est-elle confirmée (parcours 4\) ?** **Oui**  →  étape 6\. **Non**  →  le dossier reste ouvert jusqu’à la confirmation de livraison. |  |  |
| **6** | **Plateforme** | Clôture le dossier. | **DOSSIER**  **Clôturé**  |
| **✓** | **Fin du parcours : dossier clôturé, facture acquittée et livraison confirmée.** |  |  |

**📌 Note :** Le cahier des charges ne définit pas de couleur pour les statuts de facture (Facture émise, Partiellement réglé, Réglé).

**08**

**PARCOURS 6 — SUIVI CLIENT SANS COMPTE**

| Objectif | Permettre au client de suivre son dossier en autonomie, sans contacter DOUALOG et sans créer de compte. |
| :---- | :---- |
| **Acteurs** | Plateforme, Client |
| **Déclencheur** | Le client reçoit un email de DOUALOG ou se rend sur la page de suivi. |
| **Résultat** | Le client connaît l’état de son dossier et répond aux demandes éventuelles. |
| **Références** | CDC §03.5, §11, §13.2 · US-07, US-39 à US-44 |

| N° | Acteur | Action | Statut après l’étape |
| ----- | :---- | :---- | ----- |
| **1** | **Plateforme** | Insère un lien personnel dans chaque email sortant, à commencer par l’accusé de réception. Ce lien est rattaché à ce seul dossier. | — |
| **◆** | **Condition : comment le client accède-t-il à son dossier ?** **Page de suivi**  →  saisie du numéro DLG et de la référence BL / AWB : affichage du statut et des étapes uniquement, sans documents ni montants. Étape 4\. **Lien personnel**  →  étape 2\. |  |  |
| **2** | **Client** | Clique sur le lien reçu par email et accède directement à son dossier, sans compte ni mot de passe. | — |
| **3** | **Plateforme** | Enregistre la consultation dans l’historique du dossier. | — |
| **4** | **Client** | Consulte le statut actuel du dossier, les étapes réalisées et à venir, les alertes et informations manquantes. | **DOSSIER**  **Statut en temps réel**  |
| **5** | **Client** | Via son lien personnel uniquement : télécharge les documents de son dossier. | — |
| **◆** | **Condition : une action est-elle attendue du client ?** **Mandat manquant**  →  télécharge et signe le mandat DOUALOG via son lien, avec un code de confirmation reçu par email. **Instructions douanières**  →  les dépose via son lien ou les envoie par email. **Documents ou information manquants**  →  les dépose via son lien ou répond par email en rappelant le numéro DLG (parcours 2 ou 3). **Aucune**  →  fin du parcours. |  |  |
| **✓** | **Fin du parcours : client informé ; ses réponses sont rattachées automatiquement à son dossier.** |  |  |

**📌 Note :** Les informations société et la grille tarifaire du client sont gérées par l’équipe DOUALOG. Si une mise à jour est nécessaire, un formulaire est envoyé au client par lien personnel et validé par DOUALOG avant enregistrement.

**📌 Note :** Les liens personnels ont une durée de validité limitée et peuvent être désactivés par DOUALOG à tout moment (CDC §11.3).

**09**

**POINTS À PRÉCISER**

Ces points ne sont pas couverts par le cahier des charges et bloquent la finalisation de certains parcours.

* **Contrôle non conforme (parcours 3).** Que se passe-t-il lorsque le résultat du contrôle douane est « Non conforme » ?

* **Refus d’une offre (parcours 4).** Lorsqu’un transporteur refuse une offre, le service transport en envoie-t-il une nouvelle à un autre transporteur ?

* **Offre envoyée à plusieurs transporteurs (parcours 4).** La première acceptation annule-t-elle automatiquement l’offre pour les autres transporteurs ?

* **Moment du transport (parcours 4).** L’ordre de transport est-il créé uniquement après le BAS, comme dans le workflow, ou peut-il être préparé avant ?

* **Ordre des statuts transport (parcours 4).** « En route » est défini comme « chargement effectué » et « Chargement » comme « en cours de chargement ». L’ordre retenu ici est Chargement puis En route : est-ce correct ?

* **Libellé du statut (parcours 3).** Après un résultat « Info manquante », le dossier passe-t-il « En attente de réponse » (§07.3) ou « Info manquante » (§08) ?

* **Relances (parcours 2 et 5).** À quelle fréquence relancer pour les documents manquants et pour les factures impayées ?

* **Couleurs des statuts facture (parcours 5).** Quelles couleurs attribuer à « Facture émise », « Partiellement réglé » et « Réglé » ?

* **Durée de validité des liens personnels (parcours 4 et 6).** La proposition retenue est de 30 jours pour le client (ou jusqu’à la clôture du dossier) et jusqu’à la livraison pour le transporteur : ces durées conviennent-elles ?

[image1]: <data:image/png;base64,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>