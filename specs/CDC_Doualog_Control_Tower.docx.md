

**CAHIER DES CHARGES FONCTIONNEL**

**DOUALOG CONTROL TOWER**

*CONNECTER  •  SÉCURISER  •  LIVRER*

| Version | 1.0 — Septembre 2026 |
| :---- | :---- |
| **Statut** | Document de référence |
| **Domaine** | Transit · Douane · Transport · Facturation |
| **Société** | DOUALOG — Douane & Logistique |

| 01 | OBJECTIF DU PROJET |
| :---: | :---- |

DOUALOG Control Tower est une plateforme métier centralisée permettant de gérer l'intégralité du cycle opérationnel d'un dossier de transit, douane, transport et facturation dans un système unique.

**Objectifs principaux**

* Centraliser tous les dossiers import et export dans un référentiel unique (numéro DLG).

* Automatiser la création de dossiers à partir des emails entrants.

* Consolider tous les échanges email autour d'un numéro de dossier unique.

* Assurer le suivi douanier complet (déclaration stockée, anticipée, contrôle, BAE, BAS).

* Assurer le suivi transport (création OT, confirmation, livraison).

* Assurer le suivi de la facturation (déclenchement automatique post-BAS).

* Offrir au client un suivi simple sans création de compte : page de suivi par numéro de dossier et liens personnels sécurisés envoyés par email (suivi, documents, instructions, mandat). 

* Permettre au transporteur de gérer ses ordres de transport directement depuis ses emails, sans création de compte (acceptation des offres, mise à jour du statut, dépôt des documents). 

* Garantir une traçabilité complète de chaque action sur chaque dossier.

**📌 Note :** *Le dossier DOUALOG (numéro DLG) devient l'unique référence de travail pour toutes les parties.*

| 02 | UTILISATEURS ET ACCÈS |
| :---: | :---- |

| Profil | Type | Accès |
| ----- | ----- | ----- |
| Déclarant Douane | Interne | Gestion dossiers douane, déclarations, contrôles, BAE/BAS |
| Opérateur Transit | Interne | Suivi opérationnel complet des dossiers |
| Service Transport | Interne | Création OT, gestion transporteurs, suivi livraison |
| Service Facturation | Interne | Génération et suivi des factures |
| Manager | Interne | Dashboard KPIs, validation, supervision équipe |
| Direction | Interne | Accès global lecture \+ reporting |
| Client | Externe | Suivi par email et liens personnels  |
| Transporteur | Externe | Suivi par email et liens personnels  |

| 03 | RÉCEPTION ET TRAITEMENT DES EMAILS ENTRANTS |
| :---: | :---- |

La plateforme surveille en continu la boîte email DOUALOG. À chaque email entrant contenant des pièces jointes, le système engage automatiquement le processus de vérification et de création de dossier.

**3.1  Identification du type de prestation**

Lors de l'envoi, le client peut indiquer le type de prestation souhaitée et ses exigences tarifaires. Le système doit permettre de capturer ces informations (cochage de prestations, indication de prix cible) pour pré-remplir la grille tarifaire du dossier.

**3.2  Vérification des documents obligatoires**

Les documents obligatoires varient selon le type d'opération :

| Document | Import | Export |
| ----- | ----- | ----- |
| Facture commerciale | ✅ Obligatoire | ✅ Obligatoire |
| Packing List | ✅ Obligatoire | ✅ Obligatoire |
| Instruction Douane | ✅ Obligatoire | ✅ Obligatoire |
| BL / AWB | ✅ Obligatoire | ❌ Non requis |
| Bon de Livraison | ✅ Obligatoire (import) | ❌ Non requis |

**3.3  Cas dossier incomplet**

Si un ou plusieurs documents obligatoires sont manquants :

* Un dossier est quand même créé et placé en statut « En attente de documents ».

* Le dossier est mis en salle d'attente (non visible dans le tableau de bord principal).

* Un email automatique est envoyé au client listant les documents manquants.

* Des relances automatiques sont programmées jusqu'à réception des documents.

* Le dossier bascule dans le tableau de bord principal uniquement une fois complet.

**3.4  Gestion du mandat**

Le mandat n'est pas obligatoire pour la création du dossier. Le système applique la logique suivante :

* Recherche automatique d'un mandat valide dans la base client.

* Mandat trouvé et valide → aucune action supplémentaire.

* Mandat non trouvé → le dossier est créé normalement ; un email automatique est envoyé au client avec le modèle de mandat DOUALOG en pièce jointe et une demande de signature.

**3.5  Accusé de réception systématique**

Dans tous les cas (dossier complet, incomplet, mandat manquant), un accusé de réception automatique est envoyé au client confirmant la bonne réception de son envoi et indiquant le numéro de dossier attribué, ainsi qu'un lien de tracking personnalisé.

| 04 | NUMÉROTATION ET CONSOLIDATION DES DOSSIERS |
| :---: | :---- |

**4.1  Identifiant unique DLG**

Chaque dossier reçoit un identifiant unique généré automatiquement, de la forme :

**DLG-AAAA-NNNN  (ex. : DLG-2026-0001)**

**4.2  Règle de consolidation**

Si un email entrant fait référence à un numéro de dossier DLG existant (dans l'objet ou le corps du message) :

* Aucun nouveau dossier n'est créé.

* L'email est automatiquement rattaché au dossier existant.

* Tous les échanges futurs (reçus, envoyés, réponses) sont liés à ce numéro unique.

**4.3  Distinction Import / Export**

Chaque dossier est typé à la création : Import ou Export. Cette distinction conditionne les documents obligatoires, le workflow douanier et les colonnes affichées dans le tableau de bord.

| 05 | TABLEAU DE BORD PRINCIPAL — LISTE DES DOSSIERS |
| :---: | :---- |

Le tableau de bord occupe toute la largeur de la page. Il affiche une ligne par dossier, avec les colonnes suivantes :

| Colonne | Description | Notes |
| ----- | ----- | ----- |
| N° Dossier | Identifiant DLG unique | Lien cliquable vers le dossier |
| Type | Import / Export | Badge coloré |
| Client | Raison sociale du client |  |
| Réception | Date et heure de réception email |  |
| Déclaration Stockée | Date de stockage \+ survol : date détaillée | Tooltip au survol |
| Anticipé | Date d'anticipation douanière \+ survol : date ETA navire | Tooltip au survol |
| Contrôle | Type (Physique / Documentaire / Aucun) \+ statut | Badge coloré |
| BAE | Date d'obtention du BAE | Modifiable |
| BAS | Date d'obtention du BAS | Modifiable — déclenche facturation |
| Transport | Statut OT (Demande envoyée / Confirmé / En route / Livré) |  |
| Livraison | Date de livraison effective |  |
| Responsable | Membre de l'équipe DOUALOG assigné |  |
| Alertes | Nombre de notifications en attente | Badge compteur |
| Actions | Icône œil → ouvre le dossier en bas de page |  |

Fonctionnalités du tableau : recherche, filtres multicritères, tri par colonne, export Excel, export PDF.

**📌 Note :** *Les dossiers incomplets (salle d'attente) ne sont pas affichés dans ce tableau. Un onglet ou filtre dédié permet d'y accéder.*

| 06 | OUVERTURE ET STRUCTURE D'UN DOSSIER |
| :---: | :---- |

Un clic sur l'icône œil d'une ligne ouvre le dossier dans un panneau bas de page (sans quitter la liste). Le dossier se compose des blocs suivants :

**6.1  Bandeau dossier**

* Numéro DLG, statut global (badge couleur), type Import / Export.

* Client, mode de transport, ETA, BL/AWB, conteneur.

* Déclarant assigné, Incoterm, poids brut, nombre de colis.

* Actions rapides : Envoyer un email · Créer OT · Exporter PDF.

**6.2  Workflow horizontal**

Affiché sous le bandeau, le workflow liste les étapes du dossier de gauche à droite :

| Étape | Couleur | Condition de passage |
| ----- | ----- | ----- |
| Réception | Vert | Email reçu et dossier créé |
| Déclaration Stockée | Vert | Saisie effectuée dans le système |
| Anticipé | Vert | ETA navire renseigné \+ conteneur identifié |
| Contrôle Douane | Orange / Rouge / Gris | Selon type de contrôle |
| BAE | Vert | Date BAE saisie (modifiable) |
| BAS | Vert | Date BAS saisie → déclenche facturation |
| Transport | Bleu | OT créé et confirmé transporteur |
| Livraison | Vert | Livraison confirmée |
| Clôture | Vert foncé | Facture acquittée |

**📌 Note :** *Au survol des étapes Déclaration Stockée et Anticipé, une infobulle affiche les dates précises de stockage et d'anticipation.*

| 07 | BLOCS DE CONTENU DU DOSSIER |
| :---: | :---- |

**7.1  Informations générales**

| Champ | Description |
| ----- | ----- |
| Importateur / Exportateur | Raison sociale |
| N° IFU | Identifiant fiscal |
| BL / AWB | Référence document de transport |
| Conteneur | Numéro de conteneur |
| Navire | Nom du navire (import maritime) |
| ETA | Date d'arrivée estimée |
| Date réception email | Horodatage automatique |
| Déclarant assigné | Membre équipe DOUALOG |
| Incoterm | FOB, CIF, DAP, etc. |
| Poids brut | En kg |
| Nombre de colis | Unité |
| Compagnie maritime / aérienne | Répertoire interne avec adresse mail |

**7.2  Gestion documentaire**

Documents affichés avec statut (présent ✅ / manquant ❌) :

* Facture commerciale, Packing List, Instruction Douane, BL ou AWB, Mandat, Certificat d'origine.

Fonctionnalités : consultation en ligne · téléchargement · upload · historique des versions · lien vers dossier logistique compagnie maritime ou client.

**7.3  Déclaration / Contrôle douane**

| Champ | Valeur / Comportement |
| ----- | ----- |
| Type de contrôle | Physique / Documentaire / Aucun (sélection manuelle) |
| Date notification | Saisie manuelle ou automatique |
| Date contrôle | Saisie manuelle |
| Fin de contrôle | Saisie manuelle |
| Inspecteur | Nom de l'inspecteur douanier |
| Résultat | Conforme / Non conforme / Info manquante |
| Commentaire | Zone de texte libre |

Si le résultat est « Info manquante », le dossier passe au statut « En attente de réponse » et un email de demande d'information est envoyé automatiquement au client. La réponse est rattachée automatiquement au dossier.

**7.4  BAE — Bon à Enlever**

| Champ | Valeur / Comportement |
| ----- | ----- |
| N° BAE | Saisie manuelle |
| Date BAE | Saisie manuelle — date du clic sur le bouton « BAE obtenu » (modifiable) |
| Statut BAE | En attente / Obtenu |

**7.5  BAS — Bon à Sortir**

| Champ | Valeur / Comportement |
| ----- | ----- |
| N° BAS | Saisie manuelle |
| Date BAS | Saisie manuelle — date du clic sur le bouton « BAS obtenu » (modifiable) |
| Statut BAS | En attente / Obtenu |

**📌 Note :** *La validation du BAS déclenche automatiquement le passage en facturation.*

**7.6  Messagerie dossier**

Tous les emails liés au dossier sont visibles dans un fil de messagerie intégré, classés par catégorie :

* Emails entrants client.

* Emails sortants DOUALOG.

* Emails automatiques (accusés de réception, relances, demandes d'information).

* Emails logistiques (compagnie maritime, transitaires).

Bouton « \+ Nouveau message » pour envoyer depuis l'interface, avec archivage automatique dans le dossier.

| 08 | STATUTS DU DOSSIER |
| :---: | :---- |

| Statut | Couleur | Déclencheur |
| ----- | ----- | ----- |
| En attente de documents | Gris | Dossier créé, documents manquants |
| En cours de traitement | Bleu | Dossier complet, traitement démarré |
| Déclaration stockée | Bleu doux | Saisie déclaration stockée |
| Déclaration anticipée | Bleu doux | ETA \+ conteneur renseignés |
| Contrôle physique en cours | Orange | Type de contrôle \= Physique |
| Contrôle documentaire en cours | Orange | Type de contrôle \= Documentaire |
| Info manquante | Rouge | Résultat contrôle \= Info manquante |
| BAE obtenu | Vert clair | Date BAE saisie |
| BAS obtenu | Vert | Date BAS saisie |
| En facturation | Violet | BAS validé → basculement automatique |
| Facturé | Vert foncé | Facture émise |
| Livré | Vert foncé | Livraison confirmée transporteur |
| Clôturé | Vert foncé | Facture acquittée \+ livraison confirmée |

| 09 | MODULE TRANSPORT |
| :---: | :---- |

**9.1  Création de l'Ordre de Transport (OT)**

Depuis un dossier, le bouton « Créer OT » génère automatiquement un ordre de transport pré-rempli avec :

* N° dossier DLG, client, nature de la marchandise, poids, nombre de colis.

* Adresse de chargement et de livraison.

* Date souhaitée de prise en charge.

* Incoterm et instructions particulières.

**9.2  Création d'une Offre de Transport**

Bouton « Créer Offre de Transport » : génère et envoie automatiquement une offre au(x) transporteur(s) sélectionné(s) dans l'annuaire. Tous les éléments sont pré-remplis depuis le dossier.

**9.3  Workflow transport**

| Statut | Couleur | Description |
| ----- | ----- | ----- |
| Demande de transport envoyée | Bleu | Offre envoyée au transporteur |
| À confirmer | Orange | En attente de confirmation transporteur |
| Confirmé | Vert | Transporteur a accepté la commande |
| Camion affecté | Vert | Immatriculation et chauffeur renseignés |
| En route | Bleu | Chargement effectué |
| Chargement | Bleu doux | En cours de chargement |
| Livré | Vert foncé | Livraison confirmée |
| Pas de livraison | Gris | Transport non requis pour ce dossier |

**📌 Note :** *La colonne Transport du tableau de bord reflète ces statuts en temps réel.*

| 10 | MODULE FACTURATION |
| :---: | :---- |

**10.1  Déclenchement**

La facturation est déclenchée automatiquement dès la validation du BAS. Le dossier bascule au statut « En facturation ».

**10.2  Création de la facture**

Récupération automatique depuis le dossier :

* Informations client (raison sociale, adresse, IFU).

* Prestations réalisées (issues de la grille tarifaire cochée à la création).

* Références dossier (N° DLG, BL, conteneur).

La facture est générée au format PDF, numérotée séquentiellement, et archivée dans le dossier.

**10.3  Statuts facturation**

| Statut | Description |
| ----- | ----- |
| En facturation | BAS validé, facture non encore émise |
| Facture émise | Facture générée et envoyée au client |
| Partiellement réglé | Acompte reçu |
| Réglé | Paiement intégral reçu — clôture dossier |

**10.4  Notifications facturation**

* Notification interne à la création de la facture.

* Notification client par email avec facture en pièce jointe.

* Relances automatiques en cas de non-paiement à échéance.

| 11 | SUIVI CLIENT (SANS COMPTE) |
| :---: | :---- |

Le client n'a aucun compte à créer ni aucun mot de passe à retenir. L'ensemble des échanges passe par email, sur le modèle du suivi de colis : le client reçoit un numéro et des liens personnels qui lui donnent accès aux informations de son dossier. 

**11.1 Page de suivi publique** 

* son numéro de dossier DLG;

* la référence de son document de transport (BL ou AWB).

La combinaison des deux est exigée afin qu'aucun tiers ne puisse consulter un dossier en devinant simplement un numéro. Cette page affiche uniquement : 

* le statut actuel du dossier;

* les étapes réalisées et à venir;

* les alertes éventuelles (document manquant, information demandée)

Aucun document, montant ou donnée commerciale n'est visible sur cette page.

**11.2 Liens personnels envoyés par email**

Chaque email envoyé au client contient un lien personnel, unique et impossible à deviner, rattaché à un seul dossier. Ce lien permet au client, sans connexion préalable :

 

* de télécharger les documents de son dossier ;

* de transmettre ses instructions douanière ;

* de déposer les documents manquant ;

* de télécharger et signer le mandat DOUALOG si nécessaire ;

* de consulter le suivi détaillé de son dossier

**11.3 Règles de sécurité** 

| Règle  | Comportement |
| ----- | ----- |
| Durée de validité  | Chaque lien expire après un délai défini (ex. : 30 jours) ou à la clôture du dossier  |
| Périmètre  | Un lien donne accès à un seul dossier, jamais à l'ensemble des dossiers du client  |
| Révocation  | DOUALOG peut désactiver un lien à tout moment depuis le dossier  |
| Actions sensibles  | La signature du mandat et le dépôt de documents nécessitent un code de confirmation envoyé par email au client  |
| Traçabilité  | Chaque consultation ou action via un lien est enregistrée dans le journal du dossier |

**11.4 Informations société et grille tarifaire** 

Les informations société et la grille tarifaire du client sont gérées par l'équipe DOUALOG dans la base centralisée. Si une mise à jour est nécessaire, un formulaire est envoyé au client par lien personnel ; les données saisies sont validées par DOUALOG avant enregistrement. 

| 12 | SUIVI TRANSPORTEUR (SANS COMPTE)  |
| :---: | :---- |

Le transporteur n'a aucun compte à créer. Chaque ordre de transport lui est adressé par email, avec des liens personnels lui permettant d'agir directement. 

## **12.1  Réception de l'offre** 

L'email d'offre de transport contient : 

* le récapitulatif de l'ordre de transport (dossier DLG, marchandise, poids, colis, adresses, date souhaitée, instructions) ; 

* un bouton « Accepter » et un bouton « Refuser ». 

La réponse du transporteur met automatiquement à jour le statut transport du dossier.

## **12.2 Suivi de la livraison** 

Une fois l'offre acceptée, le transporteur reçoit un lien personnel lui permettant :Bon de Livraison signé.

* de renseigner le camion affecté (immatriculation, chauffeur) ; 

* de mettre à jour le statut (chargement, en route, livré) ; 

* de déposer les documents de transport. 

## **12.3 Documents déposables**

* Bon de livraison signé. 

* CMR / Lettre de voiture. 

* Photos de chargement et de livraison. 

Ces documents sont automatiquement archivés dans le dossier DOUALOG correspondant.

## **12.4 Règles de sécurité** 

| Règle  | Comportement |
| ----- | ----- |
| Durée de validité  | Le lien expire à la confirmation de la livraison  |
| Périmètre  | Le lien est rattaché à un seul ordre de transport   |
| Révocation  | DOUALOG peut désactiver un lien à tout moment  |
| Traçabilité  | Chaque action du transporteur est enregistrée dans le journal du dossier  |

| 13 | NOTIFICATIONS ET HISTORIQUE |
| :---: | :---- |

**13.1  Centre de notifications internes**

* Contrôle douane programmé ou en cours.

* Documents complémentaires requis.

* Modification de déclaration en attente.

* Confirmation transporteur reçue.

* BAS obtenu → basculement facturation.

* Facture en attente de règlement.

**13.2  Journal d'historique automatique**

Chaque dossier dispose d'un journal horodaté enregistrant automatiquement toutes les actions :

* Création du dossier.

* Réception / envoi d'email.

* Upload de document.

* Changement de statut.

* Création OT / facturation.

* Validation BAE / BAS.

* Consultation ou action via lien personnel 

| 14 | DASHBOARD MANAGER — KPIS |
| :---: | :---- |

| KPI | Description |
| ----- | ----- |
| Dossiers actifs | Nombre total de dossiers en cours de traitement |
| Déclarations stockées | Nombre de dossiers au stade déclaration stockée |
| Déclarations anticipées | Nombre de dossiers anticipés |
| Contrôles en cours | Dossiers en contrôle physique ou documentaire |
| BAE obtenus | Nombre de BAE validés sur la période |
| BAS obtenus | Nombre de BAS validés sur la période |
| Transport en cours | OT confirmés, non encore livrés |
| Livrés | Dossiers livrés sur la période |
| En attente de documents | Dossiers en salle d'attente |
| En facturation | Dossiers basculés en facturation non encore réglés |

| 15 | DESIGN ET IDENTITÉ VISUELLE |
| :---: | :---- |

| Élément | Spécification |
| ----- | ----- |
| Fond principal | Blanc (\#FFFFFF) |
| Header | Bleu nuit (\#0A1628) — logo DOUALOG, recherche, notifications, profil |
| Séparation header | Fine ligne orange (\#F97316) sous le header |
| Accent principal | Orange (\#F97316) — boutons CTA, badges, icônes actives |
| Couleur secondaire | Bleu nuit (\#1E3A5F) — titres, sous-titres |
| Texte courant | Gris foncé (\#374151) |
| Lignes tableau (pair) | Blanc (\#FFFFFF) |
| Lignes tableau (impair) | Gris très clair (\#F3F4F6) |
| Bandeau dossier | Fond bleu nuit, statut en badge couleur selon état |
| Police | Calibri ou Inter — sans serif, lisible |
| Badges statut | Couleurs normalisées par état (vert / orange / rouge / gris / violet) |
| Navigation latérale | Fond sombre, icônes blanches, élément actif en orange |

| 16 | TECHNOLOGIE |
| :---: | :---- |

| Couche | Technologie retenue |
| ----- | ----- |
| Frontend | React / Next.js |
| Backend | Node.js |
| Base de données | PostgreSQL |
| Emails entrants / sortants | Intégration IMAP / SMTP (boîte DOUALOG) |
| Génération documents | Librairie docx (Node.js) |
| Authentification | JWT, accès rôle par rôle (Azure AD/MFA différé) |
| Hébergement | À définir — environnement cloud |

| 17 | RÉSULTAT ATTENDU |
| :---: | :---- |

DOUALOG Control Tower doit permettre de gérer l'intégralité du cycle opérationnel :

**Email entrant  →  Création dossier DLG  →  Douane  →  Transport  →  Facturation  →  Clôture**

avec visibilité en temps réel pour :

* DOUALOG (opérateurs, déclarants, managers, direction).

* Le client (suivi par email , tracking, documents).

* Le transporteur (suivi par email, dépôt documents).

autour d'un numéro unique de dossier DLG, référence centrale de toutes les opérations.

*DOUALOG — Douane & Logistique  |  CONNECTER • SÉCURISER • LIVRER*