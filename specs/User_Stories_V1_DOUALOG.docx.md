

**USER STORIES V1**

**DOUALOG DASHBOARD**

*CONNECTER  •  SÉCURISER  •  LIVRER*

![][image1]

| Version | 0.1 — Septembre 2026 |
| :---- | :---- |
| **Statut** | Document de travail — à valider |
| **Référence** | Cahier des charges fonctionnel v1.0 |
| **Phase** | Phase UX |

| 01 | OBJET DU DOCUMENT |
| :---: | :---- |

Ce document traduit le cahier des charges fonctionnel v1.0 en user stories : de courtes descriptions de chaque fonctionnalité, du point de vue de la personne qui l’utilise.

Il ne contient aucune fonctionnalité nouvelle. Chaque user story renvoie à la section du cahier des charges dont elle est issue. Ces user stories serviront de base à la conception des écrans puis au développement de la V1.

| 02 | FORMAT ET PRIORISATION |
| :---: | :---- |

**Format d’une user story**

Chaque user story suit la même structure :

* **En tant que** … : le profil qui utilise la fonctionnalité ;

* **Je veux** … : ce qu’il souhaite faire ;

* **Afin de** … : le bénéfice attendu ;

* **Critères d’acceptation** : les conditions précises qui permettent de dire que la fonctionnalité est terminée et conforme.

**Priorisation**

| Priorité | Signification |
| :---: | ----- |
| **MUST** | Indispensable : la V1 ne peut pas être mise en service sans cette fonctionnalité. |
| **SHOULD** | Importante : prévue en V1, mais la plateforme reste utilisable si elle est livrée un peu plus tard. |
| **COULD** | Souhaitable : ajoutée si le planning le permet, sinon reportée à la version suivante. |

📌 **Note :** *La priorisation est une proposition. Les priorités « Must » correspondent aux six parcours clés de la plateforme : réception d’un email et création du dossier, dossier incomplet, workflow jusqu’au BAE / BAS, ordre de transport et portail transporteur, facturation au BAS, suivi client par lien unique.*

| 03 | SYNTHÈSE DES USER STORIES |
| :---: | :---- |

48 user stories : **30 Must**, **14 Should**, **4 Could**.

| ID | User story | Profil | Priorité |
| ----- | ----- | ----- | :---: |
| **04 — Réception des emails et création des dossiers** |  |  |  |
| **US-01** | Création automatique d’un dossier | Membre de l’équipe DOUALOG | **MUST** |
| **US-02** | Consolidation autour du numéro DLG | Membre de l’équipe DOUALOG | **MUST** |
| **US-03** | Vérification des documents obligatoires | Membre de l’équipe DOUALOG | **MUST** |
| **US-04** | Salle d’attente des dossiers incomplets | Membre de l’équipe DOUALOG | **MUST** |
| **US-05** | Information du client sur les documents manquants | Client | **MUST** |
| **US-06** | Relances automatiques des documents manquants | Membre de l’équipe DOUALOG | **SHOULD** |
| **US-07** | Accusé de réception systématique | Client | **MUST** |
| **US-08** | Gestion automatique du mandat | Membre de l’équipe DOUALOG | **SHOULD** |
| **US-09** | Capture des prestations demandées | Client | **SHOULD** |
| **05 — Tableau de bord et consultation des dossiers** |  |  |  |
| **US-10** | Liste des dossiers | Membre de l’équipe DOUALOG | **MUST** |
| **US-11** | Recherche, filtres et tri | Membre de l’équipe DOUALOG | **SHOULD** |
| **US-12** | Exports | Membre de l’équipe DOUALOG | **COULD** |
| **US-13** | Ouverture d’un dossier | Membre de l’équipe DOUALOG | **MUST** |
| **US-14** | Bandeau du dossier | Membre de l’équipe DOUALOG | **MUST** |
| **US-15** | Workflow horizontal | Membre de l’équipe DOUALOG | **MUST** |
| **US-16** | Statuts du dossier | Membre de l’équipe DOUALOG | **MUST** |
| **US-17** | Informations générales | Déclarant douane | **MUST** |
| **US-18** | Gestion documentaire | Membre de l’équipe DOUALOG | **MUST** |
| **US-19** | Historique des versions de documents | Membre de l’équipe DOUALOG | **COULD** |
| **US-20** | Fil de messagerie du dossier | Membre de l’équipe DOUALOG | **MUST** |
| **US-21** | Envoi d’un email depuis le dossier | Membre de l’équipe DOUALOG | **SHOULD** |
| **06 — Douane** |  |  |  |
| **US-22** | Déclaration stockée et anticipée | Déclarant douane | **MUST** |
| **US-23** | Contrôle douane | Déclarant douane | **MUST** |
| **US-24** | Demande d’information suite au contrôle | Déclarant douane | **MUST** |
| **US-25** | BAE — Bon à Enlever | Déclarant douane | **MUST** |
| **US-26** | BAS — Bon à Sortir | Déclarant douane | **MUST** |
| **07 — Transport et portail transporteur** |  |  |  |
| **US-27** | Annuaire des transporteurs | Service transport | **MUST** |
| **US-28** | Création de l’ordre de transport | Service transport | **MUST** |
| **US-29** | Envoi d’une offre de transport | Service transport | **MUST** |
| **US-30** | Accès au portail transporteur | Transporteur | **MUST** |
| **US-31** | Réponse à une offre | Transporteur | **MUST** |
| **US-32** | Suivi de la livraison | Transporteur | **MUST** |
| **US-33** | Dépôt des documents de transport | Transporteur | **SHOULD** |
| **08 — Facturation** |  |  |  |
| **US-34** | Basculement automatique en facturation | Service facturation | **MUST** |
| **US-35** | Génération de la facture | Service facturation | **MUST** |
| **US-36** | Envoi de la facture au client | Service facturation | **SHOULD** |
| **US-37** | Suivi des paiements | Service facturation | **SHOULD** |
| **US-38** | Relances de paiement | Service facturation | **COULD** |
| **09 — Portail client** |  |  |  |
| **US-39** | Accès sécurisé au portail | Client | **MUST** |
| **US-40** | Suivi du dossier en temps réel | Client | **MUST** |
| **US-41** | Téléchargement des documents | Client | **SHOULD** |
| **US-42** | Envoi des instructions douanières | Client | **SHOULD** |
| **US-43** | Enregistrement des données client | Client | **SHOULD** |
| **US-44** | Signature du mandat | Client | **COULD** |
| **10 — Notifications, historique et pilotage** |  |  |  |
| **US-45** | Accès selon le profil | Membre de l’équipe DOUALOG | **MUST** |
| **US-46** | Centre de notifications | Membre de l’équipe DOUALOG | **SHOULD** |
| **US-47** | Journal d’historique | Manager | **SHOULD** |
| **US-48** | Dashboard KPIs | Manager | **SHOULD** |

📌 **Note :** *Lorsque la matrice des rôles et droits ne précise pas encore quel profil réalise une action, la user story est rédigée pour un « membre de l’équipe DOUALOG ». Elle sera ajustée une fois la matrice validée.*

| 04 | RÉCEPTION DES EMAILS ET CRÉATION DES DOSSIERS |
| :---: | :---- |

| US-01 | Création automatique d’un dossier | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | qu’un dossier soit créé automatiquement à chaque email entrant contenant des pièces jointes |  |
| **Afin de** | ne plus avoir à saisir les dossiers manuellement |  |
| **Critères d’acceptation** | La boîte email DOUALOG est surveillée en continu. Chaque email entrant avec pièces jointes crée un dossier. Le dossier reçoit un numéro unique au format DLG-AAAA-NNNN (ex. DLG-2026-0001). Le dossier est typé Import ou Export dès sa création. |  |
| **Référence** | *Cahier des charges §03 · §04.1 · §04.3* |  |

| US-02 | Consolidation autour du numéro DLG | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | qu’un email mentionnant un numéro DLG existant soit rattaché au dossier correspondant |  |
| **Afin de** | retrouver tous les échanges d’un dossier au même endroit |  |
| **Critères d’acceptation** | Si l’objet ou le corps de l’email contient un numéro DLG existant, aucun nouveau dossier n’est créé. L’email est rattaché automatiquement au dossier existant. Tous les échanges futurs (reçus, envoyés, réponses) sont liés à ce numéro. |  |
| **Référence** | *Cahier des charges §04.2* |  |

| US-03 | Vérification des documents obligatoires | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | que la plateforme vérifie automatiquement la présence des documents obligatoires |  |
| **Afin de** | savoir immédiatement si un dossier est complet |  |
| **Critères d’acceptation** | Import : facture commerciale, packing list, instruction douane, BL / AWB et bon de livraison sont exigés. Export : facture commerciale, packing list et instruction douane sont exigés. Chaque document affiche un statut présent ou manquant dans le dossier. |  |
| **Référence** | *Cahier des charges §03.2 · §07.2* |  |

| US-04 | Salle d’attente des dossiers incomplets | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | que les dossiers incomplets soient placés dans une salle d’attente |  |
| **Afin de** | garder le tableau de bord principal centré sur les dossiers traitables |  |
| **Critères d’acceptation** | Un dossier incomplet est créé avec le statut « En attente de documents ». Il n’apparaît pas dans le tableau de bord principal. Un onglet ou un filtre dédié permet de consulter la salle d’attente. Le dossier bascule dans le tableau de bord principal dès qu’il est complet. |  |
| **Référence** | *Cahier des charges §03.3 · §05* |  |

| US-05 | Information du client sur les documents manquants | MUST |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | recevoir un email listant les documents manquants de mon dossier |  |
| **Afin de** | compléter mon envoi rapidement |  |
| **Critères d’acceptation** | Un email automatique est envoyé au client dès qu’un dossier est incomplet. L’email liste précisément les documents manquants. |  |
| **Référence** | *Cahier des charges §03.3* |  |

| US-06 | Relances automatiques des documents manquants | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | que des relances soient envoyées automatiquement tant que les documents manquent |  |
| **Afin de** | ne pas avoir à relancer le client manuellement |  |
| **Critères d’acceptation** | Des relances sont programmées automatiquement pour chaque dossier incomplet. Les relances s’arrêtent dès réception des documents. |  |
| **Référence** | *Cahier des charges §03.3* |  |

| US-07 | Accusé de réception systématique | MUST |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | recevoir un accusé de réception à chaque envoi |  |
| **Afin de** | être certain que mon envoi a bien été reçu et connaître mon numéro de dossier |  |
| **Critères d’acceptation** | Un accusé de réception est envoyé dans tous les cas : dossier complet, incomplet ou mandat manquant. Il indique le numéro de dossier DLG attribué. Il contient un lien de tracking personnalisé. |  |
| **Référence** | *Cahier des charges §03.5* |  |

| US-08 | Gestion automatique du mandat | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | que la plateforme recherche un mandat valide et le demande au client s’il manque |  |
| **Afin de** | régulariser les mandats sans bloquer la création des dossiers |  |
| **Critères d’acceptation** | La plateforme recherche automatiquement un mandat valide dans la base client. Mandat trouvé et valide : aucune action supplémentaire. Mandat absent : le dossier est créé normalement et un email est envoyé au client avec le modèle de mandat DOUALOG et une demande de signature. |  |
| **Référence** | *Cahier des charges §03.4* |  |

| US-09 | Capture des prestations demandées | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | indiquer lors de mon envoi le type de prestation souhaitée et mon prix cible |  |
| **Afin de** | que ma demande soit prise en compte dès l’ouverture du dossier |  |
| **Critères d’acceptation** | Le client peut indiquer les prestations souhaitées (cochage) et un prix cible. Ces informations pré-remplissent la grille tarifaire du dossier. |  |
| **Référence** | *Cahier des charges §03.1* |  |

| 05 | TABLEAU DE BORD ET CONSULTATION DES DOSSIERS |
| :---: | :---- |

| US-10 | Liste des dossiers | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | voir tous les dossiers en cours sur un tableau de bord unique |  |
| **Afin de** | suivre l’activité d’un coup d’œil |  |
| **Critères d’acceptation** | Le tableau occupe toute la largeur de la page, avec une ligne par dossier. Colonnes : N° dossier, type, client, réception, déclaration stockée, anticipé, contrôle, BAE, BAS, transport, livraison, responsable, alertes, actions. Le numéro de dossier est cliquable ; le type et le contrôle sont affichés en badges colorés. Les dossiers en salle d’attente n’y figurent pas. |  |
| **Référence** | *Cahier des charges §05* |  |

| US-11 | Recherche, filtres et tri | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | rechercher, filtrer et trier les dossiers |  |
| **Afin de** | retrouver rapidement un dossier précis |  |
| **Critères d’acceptation** | Une recherche est disponible sur le tableau de bord. Des filtres multicritères sont disponibles. Chaque colonne peut être triée. |  |
| **Référence** | *Cahier des charges §05* |  |

| US-12 | Exports | COULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | exporter le tableau de bord en Excel ou en PDF, et un dossier en PDF |  |
| **Afin de** | partager ou archiver l’information hors de la plateforme |  |
| **Critères d’acceptation** | Le tableau de bord est exportable en Excel et en PDF. Un dossier est exportable en PDF depuis ses actions rapides. |  |
| **Référence** | *Cahier des charges §05 · §06.1* |  |

| US-13 | Ouverture d’un dossier | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | ouvrir un dossier sans quitter la liste |  |
| **Afin de** | passer d’un dossier à l’autre rapidement |  |
| **Critères d’acceptation** | Un clic sur l’icône œil ouvre le dossier dans un panneau en bas de page. La liste des dossiers reste affichée. |  |
| **Référence** | *Cahier des charges §06* |  |

| US-14 | Bandeau du dossier | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | voir les informations clés du dossier en tête de celui-ci |  |
| **Afin de** | identifier le dossier et son état immédiatement |  |
| **Critères d’acceptation** | Le bandeau affiche : numéro DLG, statut global en badge, type, client, mode de transport, ETA, BL / AWB, conteneur, déclarant assigné, Incoterm, poids brut, nombre de colis. Il propose les actions rapides : envoyer un email, créer un OT, exporter en PDF. |  |
| **Référence** | *Cahier des charges §06.1* |  |

| US-15 | Workflow horizontal | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | voir les étapes du dossier de gauche à droite avec un code couleur |  |
| **Afin de** | savoir où en est le dossier et ce qu’il reste à faire |  |
| **Critères d’acceptation** | Étapes : réception, déclaration stockée, anticipé, contrôle douane, BAE, BAS, transport, livraison, clôture. Chaque étape prend la couleur définie selon sa condition de passage. Au survol des étapes « Déclaration stockée » et « Anticipé », une infobulle affiche les dates précises. |  |
| **Référence** | *Cahier des charges §06.2* |  |

| US-16 | Statuts du dossier | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | que chaque dossier affiche un statut coloré mis à jour automatiquement |  |
| **Afin de** | connaître l’état de chaque dossier sans l’ouvrir |  |
| **Critères d’acceptation** | Les 13 statuts du cahier des charges sont disponibles, de « En attente de documents » à « Clôturé ». Chaque statut a sa couleur normalisée. Le statut change automatiquement selon son déclencheur. |  |
| **Référence** | *Cahier des charges §08* |  |

| US-17 | Informations générales | MUST |
| ----- | :---- | :---: |
| **En tant que** | Déclarant douane |  |
| **Je veux** | renseigner les informations générales du dossier |  |
| **Afin de** | disposer de toutes les données nécessaires au traitement |  |
| **Critères d’acceptation** | Champs : importateur / exportateur, N° IFU, BL / AWB, conteneur, navire, ETA, déclarant assigné, Incoterm, poids brut, nombre de colis, compagnie maritime / aérienne. La date de réception de l’email est horodatée automatiquement. La compagnie est choisie dans un répertoire interne contenant son adresse email. |  |
| **Référence** | *Cahier des charges §07.1* |  |

| US-18 | Gestion documentaire | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | consulter, télécharger et ajouter les documents d’un dossier |  |
| **Afin de** | centraliser toutes les pièces au même endroit |  |
| **Critères d’acceptation** | Documents suivis : facture commerciale, packing list, instruction douane, BL ou AWB, mandat, certificat d’origine. Chaque document peut être consulté en ligne, téléchargé ou ajouté. Un lien vers le dossier logistique de la compagnie maritime ou du client est disponible. |  |
| **Référence** | *Cahier des charges §07.2* |  |

| US-19 | Historique des versions de documents | COULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | accéder aux versions précédentes d’un document |  |
| **Afin de** | retrouver une pièce remplacée |  |
| **Critères d’acceptation** | Chaque nouvel ajout d’un même document conserve la version précédente. Les versions précédentes restent consultables. |  |
| **Référence** | *Cahier des charges §07.2* |  |

| US-20 | Fil de messagerie du dossier | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | voir tous les emails d’un dossier dans un fil unique |  |
| **Afin de** | avoir tout l’historique des échanges sans chercher dans la boîte mail |  |
| **Critères d’acceptation** | Les emails sont classés par catégorie : entrants client, sortants DOUALOG, automatiques, logistiques. Tous les emails rattachés au dossier y apparaissent. |  |
| **Référence** | *Cahier des charges §07.6* |  |

| US-21 | Envoi d’un email depuis le dossier | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | envoyer un email directement depuis le dossier |  |
| **Afin de** | que chaque envoi soit archivé automatiquement |  |
| **Critères d’acceptation** | Un bouton « \+ Nouveau message » permet d’envoyer un email depuis l’interface. L’email envoyé est archivé automatiquement dans le dossier. |  |
| **Référence** | *Cahier des charges §07.6* |  |

| 06 | DOUANE |
| :---: | :---- |

| US-22 | Déclaration stockée et anticipée | MUST |
| ----- | :---- | :---: |
| **En tant que** | Déclarant douane |  |
| **Je veux** | saisir la déclaration stockée et l’anticipation |  |
| **Afin de** | suivre l’avancement douanier du dossier |  |
| **Critères d’acceptation** | La saisie de la déclaration stockée passe le dossier au statut « Déclaration stockée ». L’ETA renseignée et le conteneur identifié passent le dossier au statut « Déclaration anticipée ». Les dates apparaissent dans les colonnes correspondantes du tableau de bord, avec le détail au survol. |  |
| **Référence** | *Cahier des charges §05 · §06.2 · §08* |  |

| US-23 | Contrôle douane | MUST |
| ----- | :---- | :---: |
| **En tant que** | Déclarant douane |  |
| **Je veux** | renseigner le contrôle douane du dossier |  |
| **Afin de** | tracer chaque contrôle et son résultat |  |
| **Critères d’acceptation** | Champs : type de contrôle (physique / documentaire / aucun), date de notification, date de contrôle, fin de contrôle, inspecteur, résultat, commentaire. Un contrôle physique ou documentaire passe le dossier au statut « Contrôle … en cours » (orange). Le résultat peut être : conforme, non conforme, info manquante. |  |
| **Référence** | *Cahier des charges §07.3 · §08* |  |

| US-24 | Demande d’information suite au contrôle | MUST |
| ----- | :---- | :---: |
| **En tant que** | Déclarant douane |  |
| **Je veux** | qu’un résultat « Info manquante » déclenche automatiquement une demande au client |  |
| **Afin de** | obtenir l’information sans rédiger de message |  |
| **Critères d’acceptation** | Le dossier change de statut (voir point à préciser n° 2). Un email de demande d’information est envoyé automatiquement au client. La réponse du client est rattachée automatiquement au dossier. |  |
| **Référence** | *Cahier des charges §07.3 · §08* |  |

| US-25 | BAE — Bon à Enlever | MUST |
| ----- | :---- | :---: |
| **En tant que** | Déclarant douane |  |
| **Je veux** | enregistrer l’obtention du BAE |  |
| **Afin de** | faire avancer le dossier vers l’enlèvement |  |
| **Critères d’acceptation** | Le numéro de BAE est saisi manuellement. Un clic sur « BAE obtenu » enregistre la date du jour, modifiable ensuite. Le statut du BAE passe de « En attente » à « Obtenu » et le dossier au statut « BAE obtenu ». |  |
| **Référence** | *Cahier des charges §07.4* |  |

| US-26 | BAS — Bon à Sortir | MUST |
| ----- | :---- | :---: |
| **En tant que** | Déclarant douane |  |
| **Je veux** | enregistrer l’obtention du BAS |  |
| **Afin de** | clôturer la phase douane et lancer la facturation |  |
| **Critères d’acceptation** | Le numéro de BAS est saisi manuellement. Un clic sur « BAS obtenu » enregistre la date du jour, modifiable ensuite. La validation du BAS fait basculer automatiquement le dossier en facturation. |  |
| **Référence** | *Cahier des charges §07.5 · §10.1* |  |

| 07 | TRANSPORT ET PORTAIL TRANSPORTEUR |
| :---: | :---- |

| US-27 | Annuaire des transporteurs | MUST |
| ----- | :---- | :---: |
| **En tant que** | Service transport |  |
| **Je veux** | gérer un annuaire des transporteurs |  |
| **Afin de** | sélectionner rapidement les transporteurs à solliciter |  |
| **Critères d’acceptation** | Le service transport peut ajouter et modifier les transporteurs de l’annuaire. Les transporteurs de l’annuaire sont sélectionnables lors de l’envoi d’une offre. |  |
| **Référence** | *Cahier des charges §02 · §09.2* |  |

| US-28 | Création de l’ordre de transport | MUST |
| ----- | :---- | :---: |
| **En tant que** | Service transport |  |
| **Je veux** | créer un ordre de transport pré-rempli depuis le dossier |  |
| **Afin de** | éviter toute ressaisie |  |
| **Critères d’acceptation** | Le bouton « Créer OT » génère un ordre de transport depuis le dossier. Sont pré-remplis : N° DLG, client, nature de la marchandise, poids, nombre de colis, adresses de chargement et de livraison, date de prise en charge souhaitée, Incoterm, instructions particulières. Un dossier sans transport peut être marqué « Pas de livraison ». |  |
| **Référence** | *Cahier des charges §09.1* |  |

| US-29 | Envoi d’une offre de transport | MUST |
| ----- | :---- | :---: |
| **En tant que** | Service transport |  |
| **Je veux** | envoyer une offre aux transporteurs sélectionnés |  |
| **Afin de** | obtenir une confirmation de prise en charge |  |
| **Critères d’acceptation** | Le bouton « Créer Offre de Transport » envoie automatiquement l’offre aux transporteurs sélectionnés. Tous les éléments de l’offre sont pré-remplis depuis le dossier. Le statut transport passe à « Demande de transport envoyée ». |  |
| **Référence** | *Cahier des charges §09.2 · §09.3* |  |

| US-30 | Accès au portail transporteur | MUST |
| ----- | :---- | :---: |
| **En tant que** | Transporteur |  |
| **Je veux** | disposer d’un accès personnel au portail |  |
| **Afin de** | consulter les offres qui me sont adressées |  |
| **Critères d’acceptation** | L’accès est créé automatiquement à l’envoi de la première offre. L’accès est sécurisé et personnel. Le transporteur voit uniquement les offres qui lui sont adressées. |  |
| **Référence** | *Cahier des charges §12 · §12.1* |  |

| US-31 | Réponse à une offre | MUST |
| ----- | :---- | :---: |
| **En tant que** | Transporteur |  |
| **Je veux** | confirmer ou refuser une offre de transport |  |
| **Afin de** | indiquer rapidement ma disponibilité à DOUALOG |  |
| **Critères d’acceptation** | Le transporteur peut confirmer ou refuser chaque offre. Une confirmation passe le statut transport à « Confirmé ». La colonne Transport du tableau de bord est mise à jour en temps réel. |  |
| **Référence** | *Cahier des charges §09.3 · §12.1* |  |

| US-32 | Suivi de la livraison | MUST |
| ----- | :---- | :---: |
| **En tant que** | Transporteur |  |
| **Je veux** | mettre à jour le statut de la livraison |  |
| **Afin de** | tenir DOUALOG informé sans appel ni email |  |
| **Critères d’acceptation** | Statuts disponibles : camion affecté (avec immatriculation et chauffeur), chargement, en route, livré. La confirmation « Livré » passe le dossier au statut « Livré ». La colonne Transport du tableau de bord reflète le statut en temps réel. |  |
| **Référence** | *Cahier des charges §09.3 · §12.1* |  |

| US-33 | Dépôt des documents de transport | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Transporteur |  |
| **Je veux** | déposer mes documents de transport sur le portail |  |
| **Afin de** | transmettre les preuves de livraison sans passer par email |  |
| **Critères d’acceptation** | Documents déposables : bon de livraison signé, CMR / lettre de voiture, photos de chargement et de livraison. Les documents sont archivés automatiquement dans le dossier DOUALOG correspondant. |  |
| **Référence** | *Cahier des charges §12.2* |  |

| 08 | FACTURATION |
| :---: | :---- |

| US-34 | Basculement automatique en facturation | MUST |
| ----- | :---- | :---: |
| **En tant que** | Service facturation |  |
| **Je veux** | qu’un dossier bascule en facturation dès la validation du BAS |  |
| **Afin de** | ne manquer aucun dossier à facturer |  |
| **Critères d’acceptation** | La validation du BAS passe le dossier au statut « En facturation ». Une notification interne signale le basculement. |  |
| **Référence** | *Cahier des charges §10.1* |  |

| US-35 | Génération de la facture | MUST |
| ----- | :---- | :---: |
| **En tant que** | Service facturation |  |
| **Je veux** | générer la facture automatiquement depuis le dossier |  |
| **Afin de** | éviter toute ressaisie et les erreurs |  |
| **Critères d’acceptation** | Sont repris automatiquement : informations client (raison sociale, adresse, IFU), prestations issues de la grille tarifaire, références du dossier (N° DLG, BL, conteneur). La facture est générée au format PDF et numérotée séquentiellement. La facture est archivée dans le dossier. |  |
| **Référence** | *Cahier des charges §10.2* |  |

| US-36 | Envoi de la facture au client | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Service facturation |  |
| **Je veux** | que la facture soit envoyée automatiquement au client |  |
| **Afin de** | accélérer le paiement |  |
| **Critères d’acceptation** | Le client reçoit un email avec la facture en pièce jointe. Une notification interne est créée à la génération de la facture. Le dossier passe au statut « Facturé ». |  |
| **Référence** | *Cahier des charges §10.4* |  |

| US-37 | Suivi des paiements | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Service facturation |  |
| **Je veux** | enregistrer l’état de paiement de chaque facture |  |
| **Afin de** | savoir quels dossiers peuvent être clôturés |  |
| **Critères d’acceptation** | Statuts disponibles : en facturation, facture émise, partiellement réglé, réglé. Le statut « Réglé » avec livraison confirmée passe le dossier au statut « Clôturé ». |  |
| **Référence** | *Cahier des charges §10.3 · §08* |  |

| US-38 | Relances de paiement | COULD |
| ----- | :---- | :---: |
| **En tant que** | Service facturation |  |
| **Je veux** | que les factures impayées soient relancées automatiquement |  |
| **Afin de** | réduire les retards de paiement |  |
| **Critères d’acceptation** | Une relance est envoyée automatiquement au client en cas de non-paiement à échéance. |  |
| **Référence** | *Cahier des charges §10.4* |  |

| 09 | PORTAIL CLIENT |
| :---: | :---- |

| US-39 | Accès sécurisé au portail | MUST |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | accéder à mon espace par un lien unique reçu par email |  |
| **Afin de** | suivre mes dossiers sans démarche supplémentaire |  |
| **Critères d’acceptation** | Chaque email sortant contient un lien de suivi unique. Le client ne voit que ses propres dossiers. |  |
| **Référence** | *Cahier des charges §11 · §11.2* |  |

| US-40 | Suivi du dossier en temps réel | MUST |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | voir l’état de mon dossier en ligne |  |
| **Afin de** | savoir où en est ma marchandise sans contacter DOUALOG |  |
| **Critères d’acceptation** | La page de suivi affiche le statut actuel du dossier. Elle affiche les étapes réalisées et à venir. Elle affiche les alertes et les informations manquantes éventuelles. |  |
| **Référence** | *Cahier des charges §11.1 · §11.2* |  |

| US-41 | Téléchargement des documents | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | télécharger les documents de mon dossier |  |
| **Afin de** | disposer de mes pièces à tout moment |  |
| **Critères d’acceptation** | Les documents du dossier sont accessibles en téléchargement uniquement. |  |
| **Référence** | *Cahier des charges §11.1* |  |

| US-42 | Envoi des instructions douanières | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | envoyer mes instructions douanières depuis le portail |  |
| **Afin de** | les transmettre sans passer par email |  |
| **Critères d’acceptation** | Le client peut transmettre ses instructions douanières depuis le portail. Elles sont rattachées au dossier concerné. |  |
| **Référence** | *Cahier des charges §11.1* |  |

| US-43 | Enregistrement des données client | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | enregistrer ma grille tarifaire et les informations de ma société |  |
| **Afin de** | ne pas les ressaisir à chaque dossier |  |
| **Critères d’acceptation** | Le client peut saisir et mettre à jour sa grille tarifaire et ses informations société. Ces données sont enregistrées dans la base centralisée. |  |
| **Référence** | *Cahier des charges §11.1* |  |

| US-44 | Signature du mandat | COULD |
| ----- | :---- | :---: |
| **En tant que** | Client |  |
| **Je veux** | télécharger et signer le mandat DOUALOG depuis le portail |  |
| **Afin de** | régulariser ma situation facilement |  |
| **Critères d’acceptation** | Le modèle de mandat est téléchargeable lorsque le mandat est manquant. Le mandat signé est archivé dans la base client. |  |
| **Référence** | *Cahier des charges §03.4 · §11.1* |  |

| 10 | NOTIFICATIONS, HISTORIQUE ET PILOTAGE |
| :---: | :---- |

| US-45 | Accès selon le profil | MUST |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | me connecter avec un compte personnel |  |
| **Afin de** | accéder uniquement aux fonctionnalités de mon profil |  |
| **Critères d’acceptation** | Chaque utilisateur interne dispose d’un compte personnel. Les droits appliqués sont ceux de la matrice des rôles et droits. |  |
| **Référence** | *Cahier des charges §02 · §16* |  |

| US-46 | Centre de notifications | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Membre de l’équipe DOUALOG |  |
| **Je veux** | recevoir des notifications sur les événements importants |  |
| **Afin de** | réagir sans surveiller chaque dossier |  |
| **Critères d’acceptation** | Notifications : contrôle douane programmé ou en cours, documents complémentaires requis, modification de déclaration en attente, confirmation transporteur reçue, BAS obtenu, facture en attente de règlement. La colonne Alertes du tableau de bord affiche le nombre de notifications en attente par dossier. |  |
| **Référence** | *Cahier des charges §05 · §13.1* |  |

| US-47 | Journal d’historique | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Manager |  |
| **Je veux** | consulter l’historique complet de chaque dossier |  |
| **Afin de** | savoir qui a fait quoi et quand |  |
| **Critères d’acceptation** | Chaque action est enregistrée et horodatée automatiquement : création, emails, documents, changements de statut, OT, facturation, BAE / BAS, connexions aux portails. |  |
| **Référence** | *Cahier des charges §13.2* |  |

| US-48 | Dashboard KPIs | SHOULD |
| ----- | :---- | :---: |
| **En tant que** | Manager |  |
| **Je veux** | consulter les indicateurs clés de l’activité |  |
| **Afin de** | piloter l’équipe et anticiper la charge |  |
| **Critères d’acceptation** | KPIs : dossiers actifs, déclarations stockées, déclarations anticipées, contrôles en cours, BAE obtenus, BAS obtenus, transport en cours, livrés, en attente de documents, en facturation. |  |
| **Référence** | *Cahier des charges §14* |  |

| 11 | POINTS À PRÉCISER |
| :---: | :---- |

Les points suivants sont à trancher pour finaliser les user stories.

1. **Priorités.** La répartition Must / Should / Could proposée convient-elle ?

2. **Statut après « Info manquante ».** La section 07.3 indique que le dossier passe « En attente de réponse », la section 08 indique « Info manquante ». Quel libellé retenir ?

3. **Prestations à facturer.** Si le client n’indique pas les prestations souhaitées lors de son envoi, qui les renseigne dans le dossier pour que la facture puisse être générée ?

4. **Assignation du dossier.** Qui assigne le déclarant et le responsable d’un dossier, et à quel moment ?

5. **Relances automatiques.** À quelle fréquence relancer le client pour les documents manquants et pour les factures impayées ?

6. **Statuts transport.** Le cahier des charges définit « En route » comme « chargement effectué » et « Chargement » comme « en cours de chargement ». Quel est l’ordre exact des étapes ?

7. **Signature du mandat.** Le client signe-t-il électroniquement sur le portail, ou renvoie-t-il le mandat signé en document ?

8. **Lien de suivi client.** Le lien unique suffit-il pour accéder au portail, ou faut-il aussi un identifiant et un mot de passe pour les fonctions comme l’envoi d’instructions ou la grille tarifaire ?

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAACiCAIAAAClEDRnAABMyElEQVR4XuxdB3QTx9aWuyy5d1MNGBdVVwiQBEICvOQl76VQ3GRJlrtN7y6qtjE9hI7pBAiETqiGmO6qXtx7792WXOCflYwxwhCTB0HJr+/co7Pa3Zldab+9c++dmTuwZ2qooWKAKe9QQ40PDTUp1VA5qEmphspBTUo1VA5qUqqhclCTUg2Vg5qUaqgc1KRUQ+WgJqUaKgc1KdVQOahJqYbKQU1KNVQOalKqoXJQk1INlYOalGqoHNSkVEPloCalGioHNSnVUDmoSamGykFNSjVUDmpSqqFyUJNSDZWDmpRqqBzUpFRD5aAmpRoqBzUp1VA5qEmphspBTUrVwdOX5f8v1KT8y/D0aV/P0z5Zf09Xv6ytp6NO2pArreF2lqRIC66285I6UmkNvy9pSImsT4mo+31xTXJo3f3F3YKENv5PrcJTbQXJXXXiroZ8WVtln7Ttaa8U1KZ8hX8K1KR8Z+jv6+2TdfV2t3U1ljTn3624Glx89oeysz/UXVrYeGlh503/rntLmh5Ed/APNovPNRfeb6ngtlTxmyt5LVW85gpOU+mjutwbFdxTpU921dyj1d0Kqzv3df3pz7suzG06Nb3+hGfVUUzVsQmFe03rjllV7DOq3m9dBr4enZR/BF92elb+4Vm1d2ltudekDXm9XU2A+sr39/eBmpTvAH29Pe2NtZWC3xtL+G1VkuaSrNZydndzWW93Sz9Qaf29z6Xv2dN+5cKvw1OAfqBdQQ29nY2ypuKuak57cXKrYFfx1R/Kz39acty95Mj43H1WFUcnFe+3K9gxpvmwc+Veu6okx+pTH1eeX9BSmCJtq+v/GypUNSnfGQCJlHe9J8j52tfT3SI+3vg4pu6af92Z2c3H3RoP2FXvtmk4Mr78wKjyg3bF+zC1x2dWnw9oSDvYXpLR29WiXI+qQk3KvzcAO/t7u/tkHb2d9ZWXyFVHPUsPOFQemgxIWbPfrnL3mLq9E+r2O1QluZQfmt5WltEn63w6cm39gaAm5T8H/X0yWXtde8njNv7x2su+tYcnVCSNrjo6rni/dXGSVfE+m4r9HtVnfGruxrWXZ/TK2pXLqwzUpPwno6+nq7O5tJq9r/oXXM0hk8qDY/J+sq085Fiy1778gHPh/in1jzb3dDSomu78R5Hyr7Pq/gf09/c9VYgcIwxJQmfKTUnlAyMDaN9bcy5U/+JReNC+5MCE2oMOtXvsmg9Mrtw9seyge82DxPZqkXKZD4d/DilvpTyhbT1M3Xp0BXPPEvquFfEHV208vDz+ICRxSUBWxO9flXBg5YYDK+KTBkVxaBkL7Dy4MuEQkBXy88HnmoSDq1kHVjIOrIk/FLfj9Llrj367k/77Y14GL6ekvKa1vUP5Dv4I/X29tbmPipO3FV1eW3stquLSqrIra/MvR4nOrxNeihFfpQkuRRUnx/MvruNeihLfYOVc2yA5vyH7LL38elTplRV551YXXo9pKs5UrnfEaK8WVN5aWp6EathnX7dzfMP+CaV7bKuPTS46NLnwiEtXQ9Ez1Xir/zmkbGhqidtzZtTHJIupRKsZIYaewUjPEH0PIGEIdyAhCI9ApDsk+u5BQBAewQpRfIW7BSqJqVuQuXuwmXsoEBOPUBP3MPBpOSXM3DPI4fPFn/nQl9GTrt/NrG98C6+2T9ZVkXU+e98cQdxECdUsh2kpjhst2TIhnWmVnmCZFW8qTDTPYhixN9jwt9qlxYwSsZxy4uwz1uhms4zZ8ZPyT37fXpOtXOnb4Gl/r6wht/bm6oYj7tVJE6oOjSk5YJW707Tm2ITaUzMrbsf2tFUrl/nL8c8hJUBbR+euY5cmzgzQR/2gjyXqoIi62EBdbLAOJgiIHoasjwnQx5L1MCQgcCwZ/nx78KtC9HEBQHTQfpCg/IFoY0jaGKIOlqSN8tXH+xvg/BAYbwTqB7tPgiZ/TF4Wu+/oL7f7+0ekZkATXF+cKT6xUMg0FlIRGesQPLopn2XBjzNhx+jxY/Ty40yEVH1OlK6EYSGMNRJRDUUMfSELwfvRIecWo69Hqlzj26O/V9pa9qj40KSS/aPrj04o321bs29s9b7xNUdRFWdm1QiP93bL37SnT9sq2B31ecrl3zP+UaR8BllsT1cwd9lOI+mhCXBsgB6GoocOAqKLCoSjyQpRsBAiKCZgcKcuyl8hemiiPgoSXRxRBw+ISFaINo6kgydrYaGdei7+Go7zDbA+SJSXMZpgjCKbYYJWxx8ur6oboV0r7WgSxI/m04wl8SZCpqGAYSSmGeXHmebQkJJYvTyGfjYVzo/SFdP1+bEaIqYOl64nSprV2VyhXNH/gIacS0Vn5hQfdK4+YF+9d1ztXtvSvRbFB20LT0wuuh4ibSjqrmLXn5vXlLrxL+4f+qeREqCrW0pes10TTYShA7SxAzoSjiHp4siAVTq4AC0MCYguOkAPFfhcAH3lZMX6wzFASAg0SQO1EO5O0sOFwBzI+tgQfdcATYy/Jj4YEpcALbz8NKdQhGMYHBMMqgXE1XDwAY27y78i7qfxlW/rFVSlnxYkTs6KQ3LjtIV0eE60eU6smYBhwGUhuXR9Hg2RnWAuYBlyaLrp62FChnl383tpWIHm7qhIKzvzLTAxKw5alSSZFO83Bxq05ACqcv+E6r2jmg+OacnaOUKH7J3gH0jKbqls1YbDuvgQLWyIJipIC0XRQZF1nYnaEBcDNDBkDaw/oJe2nJcK0UZDTAX7FYcAobXQRD2sjz7eT8vB38g1Qt85QBdD0EQRNLGBGrgQDTxZ20V+AtCpzhChdXFQJWADgSON/TjUcSZF+bZeQQ3/Gjt+AodlxGfpiekGOVQTMc2EyzTgxCH5TCRQn+nr4VymkWSDiZiJyE4cr1z+naK3s7FyH6Y6aVLlgVEVB6zL9gN2jgLbVfttK/aPKjg2vVf21o7dn8Y/kJRAUxKWJtpMCRo/a+mkz5bbf7Z04ieRk2ZGjJ8ZNm5mJCSzwsbMDLabFW73afj4T8ImzIwY92n4mJlho2dDMmpWmM3MUJuPw2xnBBjiFpm7UrQmLDDFU3QcFxm4AOYFamECtXAUoCl18IsAL4FmhU1aBHcJ1HAiIl2CNB18YHb/McUtvHLrQW9vr/LNDUGt+I54B5bDhLQjaLslNCMR3QhwNCvOgMdAgJ0cqrEozpTPNBCxjLhb3ZXLv2t0Cw9WH7KvShoNSFmeZFmaZFmTNLrmwJjy/WOKj+Lrsy8pF3hv+AeSEkAqlXV0drV3dLW1dwJpl0tLW0drewf4lEt7c0tbU3ProDSCT7DnuTQ2t4nzik5fvrOKeWBhSPyUrxab4nyQaB9gfQJ7AGhcTRxRC+elg/fWAU4PnqLt7A9z9Ae8NHANBuasAc53lNu3ktxC5TsbgmrRLeEOFJdhKaIDHWkGlCXgn5yURgKWAScWLom3FbLM0tbp5W4eV8c9q1z+naK/t7tDsK3i8CjQgpdDmtKmYr9t/d6xdXvHVx2YWLB3YtWFfymXeW/4Z5LynQOQmL7l8KRPAoww/kgM5D9pQ829DxAtLAG458A8MPKMBM6+pjPw00k6aJ+xM4gzf4hoaW1Trus5KnkXsxLH8phWYrq5mGoBVKOClECEcYag+eZSzbixhhy6ecHR/3TUFSiXf3foam8sT92Vd9i+/PD46oNjqpLGAakGjvne0bV7xlTum1i6f1LVEZRysfcGNSnfDsC5vnI7dcq/VyFRgHzAbA0DlivgqFyDUoBXpIECZitFxyUEZj/f3N1vytehMtnwg8cyd3hksYDrbSxmGPPpFlymCR/44HQDyL6MN86M0ubTTLOZ1gVHfuisL1Yu/B7wtL+vT9bZmne3/GJ46dHPSpPQFQctKpMsqveNr9pt17h/clctV7nM+4GalH8GmbwczOfLNCZTtNBhOtgIXbn/DsUyIYcpUBMTDAS4Svpob+zc8AepHOXycqTFjxUmmIgY+gIGksuw4DAtBHSTXKpBLhUppgNHx0BAN8uLG195Z2t/7/C0fk/o65F2t1S2ljyqP+NWC1zvfWOad9q0H5jYzt7a3/cOoqR/iH8UKYGxWFlTX1XbUFPfWFPXWFPfBKS6rrG6FvoK9gOprm2ob2jq6XmTCzIS7Dh4AY4OQrouA7xUkFIXDTXckLmJCYZhQ4H7r+Psa+3hF5O4r79fuc+6u60unWEmiTcWMXUETD3g7nAYloCF+bHIglh9QEpxnDGPZlGeNEfaUqNU9i9DT0dtW/a5xtsr2n6ZU5uEqbviJWt6k5X8rvDPIWVFdf1S1hHMv1dPmh2J/886l2/WTvosHP3lCocvlgBxmrfM4fNlTnNWOH0e+fmiVU8y/ziO+GYAPwmBJmmhKJooKDIvDy0RtTFELQxJExsI2nSYEwWBpVi6+Qeu2CiVyZSK591OzN9sw43RFjG1BUwdDssEkFJEMyuIUZDSQMAwkiTaF9/YqFTwrwfUrEvbW0pTK0/M6S59pHz4PeCfQ8rffmdPmBsFXGAD93DYZD9DtxBFjw5wPuDYQKhrB0UCgkR5f+O/Lie/WLn8W6Knt9fMjQLsSA3nQG20nJQYAhAdrL82lqyFCwIWp44TycKFGLA8saure2hZWUezaPd0LhUpYRnKNaUOl2kEueE0C6Ap8+Wk5DPMRDumy9rqhxb8sJC11fR2NinvfQ/4h5Cyr69/zMdLFOTTciLq4yiGHhEwR4Immgz0FhTxRgXooIhG+MC5fvSi0nfTWWfzUZiGE1HXJRyyIDGBuhhfONYbjvXRw/pDZHWiIHGBlq4kv4i4ziGkbKsrlhxflLNhjCTeFvjXUAcjHSmhIUHbDYgI7EsgfIYJl2kj+0sYoIL4h5CyrqHZ3JOi4eCjg/KH44iaKF+YgxcUSnSlaLoEwnABmlgS2G+IJ8btPN3zxpj2yIFwJsJdFsOcIQsS8B4KpGMXAV7qYf10sCQd5yAEmgw0ZeDKzd3dL/yDvJQfM+NGcWMsHq8xFieOE9AtJDSjXKq+iG4k56IBh2UgiDcXJk7806Mn/+74h5Dy3LUHcJSPgRsFaCkNZx9ASh2cnxaWAHgJw0KihSMjXQgTZga3tL6z7jIrT6CMAzVxEQpSwjF+cIiXUB+PHoYMPHF9LNnKnRiTeKC3r09RpKWuRHjaV5BgxY0yEW+YmB5jIaBZimkmOTSknJRGUMc34CVg6sFvXr7a/yP8E0jZ2Nw2yytKH0XUA64GNAiDAqw6QBE9jLc2ylsbR9JyDYI5+FpOofyYdG6Eo3j+EF1dUiSGqOMSBMOHwLCg+Q5AokhwaPwRBXjl4FPfgwxzWDhhdujj9IHw3tP+/pL0k/zECWKGqTDakM+0zaRacBkW7FgDPh1qsoVMY16UVjbTSMAcX3Zv/8sXfF/o6Oy8fP228t4Pir89KWU9PScuJtvNjFT4MfKO6SDAS0BKfbS3qWcQzH4R2IPwDHf799Kmltf2r7wtmprbTNwCANc1XIKBmgQvAwIaAkfRQ4foocP00EEamIV6rr64byK7ugcMyraGsowdM4Vxo4FqBKTkMa2y6GZsulFOoqUwwSwjFsmnG4pjdMHRwsMLOuuKXr7gu0d/f//jDE5U3Nb6hkblYx8Uf3tSFpZWeC/bbOoZoiClXFMOkFIP7QubuBDhFgxDkTVQpCvJT5QL/w/IyS8zcIFGZmjig7WheBAJGiAHkTII4iWGgnQj6KG+ne29dLBItTg5LW4Sj2ULfBpBrJmAaQ4ZkVR9IdOQHYvI3WgjjjPNphuLmGPKbm+BMhe8Z2xLOukVvK61TeWmNf69SVlRVRe6dhcSS4C7UPRQAfrO0PgxwEhgQQJXQxdN1HAgIHChmg4ku89WSl/T3fcnUFZZ6/HNCmgQhgPkaOujSMB40MCTdKC2m6IYmmnmSpjyJbm944UJm7XBicOwzKKbsBmmPIaNENiRDD0hTSubpZ/LNAZfJYm24s1ORXd+GnKpd4/Wto6L1x/O/G6VKPs99qf/L/gbkxI40SkPeU6fLQeWHAzlN4SUZC08CZiS2hiSPhZo0EC4E/lzH6py+T+LbqlsMX2f9bQQHRTZZOoSiPfO0KBgmCsJvA9AR+rIZ1kYOn+XzhH1PXdxZF1tHNZYHt00i2HEYZopSClm6OXG64NPcQxcEAsHlH0Q7yLrbH75gu8ShaVVpJVbHD8J/oH4zv6Qd46/MSnb2jq9Q7dYe0QCcsCcvKHR44q+PuDZAFJiIf9XYzLRGB9uig9K3PXOhn6lpPIw/16uiyPD7H11nYlATQJSQi+GK0kDD3wsOSnRhLne62rrGhRF+np78n/fxaOZA6uRw0ByWEY8moWQjhAz4XyqtoQJz4nSFcbAMxk2DZL36HMknb3p9t06G0/y+rgDjU1vMd/tL8bfmJRZvLyx7pH6jhRtdKC2G0U+vQEiJTS9Cwd1q0BDwVGBRtjAL32Z+UXvJmBe39SymHEA6R6siSZrOUHReLgjAYkCqpEMSAnDUwAvgZpEoLyvJT8eVJPtTdWiY948qhHQjnwmEAMe1UTAMICmgzHghYmmkrVaOQwj0d7PpB3vJWDeC1qVNI71VH+7mRHbky7+713/7xV/Y1JO/3oNwp5ogIvQxYfAnBdBnYoQKYlQRx/OXxPYlNhAoMlsPUMYW068k4B5X1//1bsZYz5drIsN1saEwNFkJNoPgSJoTiYAaxLcg4Z7IAxH1MeSDVELOztfTLbKvnMglWUH1CQgpZAOByKmQVFJDsOQxzIWUBElDEMx3aKOe67/Pfg3FdV1lPU/2v8r0uPLxed/uzf4qqgsVJSUfxhNbGhqsfII1bD308OFINxDYE4LoKG1KKIuNLfGHy6ffwg+zd1I25POKRf+UyirqHWeGWYE+fXBOugwLXQwIB8C4wN8fF18EDT1x3G+Jt5L18VrzDTypl0nFaWe9vcXpZ55SB3PY1nz6MZQ0IeKENPgEro+sCwzmeYZVBNxvFUe3aji/v53OzkrnZf9qW+UxXR/YzefMVMDKcu3KZ+hqlAtUvb29pWUVuTnF7e+fsD2M3mA7fKtR7ooP135HEJo2ivOD5oFiyHpAVKiCeATsBOO8XP/eklL67sJeXzhtc4UT0agKLqoQG10MLAZoEniGD/wDmjhKNr4QGMXgqHLQvMpCwNXbxocq9bWWC05FchmjeKzrBSkFAH/BvBSQUqGBRsyNC3EdPPOhtKXL/jnAVrnRxmCUTP8TTy89F0XuH278uK1ByreZA+FCpGSzRVfv3kvN++PR+yVV9X6Lt2kmPOqgSZoonyhMRBy7QjoCHf2gzv7AzWGxPpcuPFQufCfQhpbZDUlCNQJOVLyqCSkmLHQ/HHwCUMTYCiCqfMixMQv/CJoQ4dfVGc/fMIcz2dZPFmtP0BKqqmIaiwC7g7TjEO3ENAtuLGmwgS7vl7l4W1/Av39T7MLSlew9tl/FmCA+nr0NN/g6B/FucPE4aXdncq7VAYqQUqpTJadV3z1+j3lA6/BqYu/j54eCs2FxRHgbgFQ1gBngpyUJGjWtrMf8IgNcWSPb1cVlvyv/k23VHb3Ecf9P8vl1ipQxtCgyeej1MjymChFf1o40NbmTgtm/zeiuqZusKy0szVzx2xuvM2j1TBxnA2PbgiZlVQLPtCOTAMuwwz442KamZBuJdj1yZBr/knUNTQvpu8bPSPAEDvf0t3b5cuQ63efgMZH6TRgGjXUlKZc3Km0X3XwgUkJ/qCiksqtu8+tYx76QztSgZq6pqW0Qwgs8HNJMJyfBtpXH0/ShzoYoQwW+liiPgoKHFp4Uo6euwMopVz+bdDU3Lbv+BXsvAhDV4rhR4thk72ACwVMBT2sjy7GGxrPiwnWwAXBHBbBXcgBS7YXFZcPLV7GvpIVN5HLNMrfZJG+Rt7BDXhJteFRbbLigKNjJqSa5lBN8hPHlT3+n3q6e/v6uOJ8p69Xmc0I08ZCI+jGf0KprH7xegxC2tUmSN57/2BQY3WJ8jGVwYckpVTW8yBNELLyx3X0g6XltcqHhwPwf5MfcMbNWKKLDoBhCHAPCsxxESClAZaiiQ3QxgdAmYBQRIQz8UsSPa/oJYq8LdKyRISlm8dPDzXzCIQ5+sIc/XRcwSX8dHA+ejhvbaw3cPBhWIiUup4UA1ff3PyXjMIeWTd3x+xM0DTLe2t4UUBNIiBeQqQcxWWaCBhIYF/mxZlnbHTt6frjgDmwU7u7O9vbWlpbWvqeBxO6pVK+OH/jvjNOXy7XcPbRwfpbTAv6xGvdjZS0l0tDaK0r4f6y4t7WL2qLeCqSYG1YfDBSrt3488TZy78iMguLK5WPvR6S/DLASKAmdTAULSxBG0OQt6fAzguEORB0cMF6GIqpW5Ax2qeo9C2qHQQgfWFpVezWY7MINDg+WBcbqoWiaKHICr9eBw25NaDhVoyRgzkCNyLAZApl88Fzr/ZhCo5TRBvGC6gGQoYlj2rCWavFZ+lxGEhhrJU4xiY7xlzEgHHiNNhJn8k6hh8P0dPdUZWfzr22Pf1M1K0dC7mPfmtrbe7rg+gIzNY7DzMcP4swdyMbuYHfvkgP7bssdmdF5fDvdnd7I+98NCfWvuDUYmn7QEhfZfFhSNnY1GL7UeDYj0Pz3iamXd/Y8qU/w9QtRMOJCE0axBGBJQcJNF0r0Mg9RNvJC4n20Rz3jd20AEAv5fJvBGBVymP+wrBE+5mRFu4BRjgiaAe1cL6A+vJLQNMUtdDBMEcS0iVEy9EXWK4G6EXuXy9NeTL8ZEXJDo/0daDJNsykGXPirYBq5DGQkK9DtRLG2gBqcuMM2RtH1QkvDxZ52t/X1VrXUMqtEt7KvRZ3izHl3rYvf9+xMP3iltqKQplMBiycyqqa5AeZU75bajuDDPw5IBpOP1hO8yWtSeh7ZXoaQG+PtFJ8L23nvNT4ydl75jbkpSqfoXr4AKTs6e09dOq30R+H0LcPBPNGiEcZojHTQ02nRMCcyRoY0F6TAC+hTyxESk0nbwTOH4n2M8YRnGeHKxceDjJZD7AaS8qq9xy58o1/nLVnmDEuSN8ZOArBMDsf0EBr4721XHy08P7ANtDEhGphw3TQYfq4IB0HX0Nnr4joHSXlwyedAi5Oegxwqw3FccapVGRmnBk3wZpLM+DTjAU0SwHNWki34bFs804saC9ny9rqmovYGXsCuHt9uD/OyoyflJXg+JDumLnnv6XC+w3VJdIuyFMuLinfuufnzxatHvMxBYHx1kH7mLhQrDwpHt8tTuUIh7r8Cjzt72+qKeSeW5Ge6JTJHM2OG1f0IOmd+PjvGx+AlBxB3oz5qxy/WFxVO3yzNSxa2zoWhSXYTguHTfbRcwnVwEDhSag7EQe5ONroALhrCNSmo8iANJ/5bDh/I+3CzScXbj6+cPPhhZsPgJy7/vCXK/ePnknefeTK9gPnN+35dX5IgsOs4NHTgsw9yEgsAekSBJvsr4UOhTmEwF1XamJ9tHBemjhfDdBSAxMWC5FSw4mMxFNsPQN/CGK86tgOokp4kxutn8MyzorWyWTA2RuM0unGWTQol5qAbiamW4ljbcW0MSKGXWrs+EyWIzcRl06dIExEp0WPz0rACQ78wL4Q39nW1COT9shkTU1N12/9jp0TYvMRUR+z0NAd/GQfXTzh20Da1duP2juGD+7kPTrE3j2Vu8EmI1pHSDPMpFr1SN/ZqPv3ir+alF3d0tjNpyynBv0nJLG1ffh/c1hcTX7sPDsCgfbXdiZpoilQe4qFehShTkW5WQlNuEaTkR6RWqggJD7C0CXUavoSY3eK+VQgZBNPsrFnsLFHqKFnGMItWA9PQbgFaTn7wHFEOI4AtA7wljTRRIR7GHCokZ7LYc5BWmh/8Ow1MX5Q7AkLjYjTxQUYuQVMnh1y/tr9odNulADUpPDMksIEc956OD9Wn0vX58cZsWlmHCrwvqFpD2KamSjGTBRtDdrxvMSJqTFWd9eZPmQ5P4hzTdv5fUOpqKO1USbtkkmlZWVlJ06fn/19yNipXjD7b3WxXrroBQZ4b+uPyDMWrX1VOyrQK5PWFHEexo19EouAkgwykdk0U/7WKcrnqSr+alKmZuVYeqwEimdx/Imu1z/XVwFUmgHGF0oziQ4AzocuNFHLf1CgeQguULBGHp2Bxo8ZuIZCQzQwUPASGsYGFCqOrCEfMKHhSobh/LRcgfIjAoddx4UC6Ahlr0RDgR6ki48edj4SNx8JDf8J0HfyRzr72ngQz12/N5IAE3C6OcdDs+h2EqpJdowpfxUiZ71hMVCN660GIpQ0cx7VjEs158Q7ZG5y4Z4Olzw41tE64Hx0dnbee/j4x/0nPvomyMzNV9vJB+qywkGZB02meoVRt99LzXpdMrfmivyi5P2CBLeMGBsuyzI9Bs6ONchhWPOp48ru/PQXjBp+V/hLSdnf3//bHbaVxyqgjTy84ppHPIersbnN0jNQMQUH4bYY5gi5HYqUzwPRbDRJYQJq4310XAgQw+SB7oERQ3IBpqFinCUCF6Dr6AcaayhdJeCoSyAM5a+Y8QhD+UG6E+WDQHkbOPlYuwZOnhESt/3n5hH3VTZV5nISMIJYcwnNKDsWmR2jnxOln08zE0RbZEVZcBljMhkT05iotI3Taoq47c213V3t/X0Qqmtqo+J/mv6fCLtP/MynfG/s8R0wHA1w/nqOXmauBFtPn/rGJulr3gpgPkrbm7gbPNJjJqatHyVk2oL2OptplLUWIaDZFpxZ3N06TMxSZfGXkhI4j9fvZlp4LNPGB5t+vPL2oxGlqQClUlIFsInzQbOrjQ2COVPgbpE6uGDQmL4QbKA23k/BSCgnNH4gJ7Qie+9Aomi5AM4ZoPwNnQg6Tv6aziQ9tzAYiqzrGaHhEqyND4Q5eJt4BAMXfvSUoJ2HL91/wuvqegt13tfbwz/sJ2GOz6WZiugmnCi4gGokYVinrTFLp0/gbvPI2Pkv8a1dJfyUtqbap0/7pd3dra0t4uxs5pafHGZRbKYGITFQiAeO94I5fW2A+8EI/c1/KDEnzt0ofk2EC9Cxs7U+58Ymwc5PgefEplrymbZZ0cbCWAN+tAHw9At2ftyY+0C5mGrjLyUlgDC72MojHOkeou0a6jk/qrb+j4cPtnd2LWYdg2Zzo4kwRz9oXhg+EBrOiCbqoPwhyw8N5d6F0u/K80YD/QeNP4daeWhIpbyrWiEkaCYNWqEIfaGhG1DKALIeLkzfNcLIYynqq3XzyPELIjZdSU79c8M4KkUp7AQMf71xDtVEuNEuM25UGmscd4srf8/c9GOktqbqro6W3h4ostPT05OWzj1y6vLcRYvHT1lgjP7WENyYE1nbnoxEBxtiAoyw3l6R0Zk8wRuMV6CVC+7sz9o89XGcXdZGmwdRmlygHWOQAqY5cKe49NG8OPvyWxv7e19bg2riryYlcKI/XRANaKGFowDPg7hsY9sfLUiTV1QOrCtTN6KxZ4DZRyF6WD+EC9EQfHUhADGCxN/A1d/YhQLEZEDIA4IjmeIp5i6BZi4UMxzJDOdvhiNYuBMtpxAtPYgWbsQJM4IWhW86e/WhJK8UvCEj7OocFoBwnBMR/M0YQdxEDnNiSpxH2s4v8tPO1ZWKgV6Udnf29Mh6e3s6OjoePcn4r9eysR4kC7w/0nGRvqM3wskfPplghKZYuIWCm/T8auUvl35/wxhQoGXbmsozN00RsBwz6aMy48zuRWtmMPV5cQZcqn42yzhjjTbQzfyD3r3dbxpvpZr4q0n5DBo30BQR9ZOOszdQfkg8xcw9+Atf6p1Hw4eg/0bogroAGzrbW7o723pkUsCblpaWvLzCew/SwlawcJ+RbTzJJq7+CKij0k8T66Ph7KMxeZHeZG8LHHmsS8D9x1yllENKAIq2OOv8g51fPAJ6Md42LcaATzPlxhoKaPoCpn5mjI5442g+3UIYg+Sv0SqiGzTkpChX8TfBByDlM6gRLwRKDokng9ZTBxtq6BZmMz2kpLJmhEvRqCagRer6+7u6u5ubW0rLKxYERX3jHzt+Ksl+Zoipq4+2w3wDLJRbVcOZAEP5arj4G35Esf40OJK2+/fHnLLKN+X76+2R1hZkZG13S2eO4rGsH6+C58SPFlGthXQrIcNcRDfgx+pzYhE8qg031lZMHVO8CZWzAdX/d4iTD4sPQ0qAb4NY5u7AoQ7SxoRpo4OBU+L0VWQYbeetBxmqPKdpWACnuL2j6+K1e8fP3oqM2WE/kzBxdoAe1sfANVQHEwRz8oW7UBD4QODyG+HIxq5kYw+S6/crj5y72djc+gaDQdbd2ViZn3fvmCBpUdYGDJdmJGQa82nGwLnm08azqY5spqNwm6c46T+5vwSVXovJv0Iru7e/Of+JtKWmt/vP2MQqgg9Gysam1u8CN5q7BJm6hQJHWMeZAMcRDNzIJm5Eh1lhW/ad6+jsetv+678M4MZkPT3Nre1VtY23HmT9mxzvOHuFqYufIc7X1J2k4fC9vpu/Boao5xYCcyYDHwuJC9Rz8rd295k03W81a3dhScUfxmiBDXB3+/zULf9iJ84QbnDN3ejEY42VbMcI984ruBbXXPBE2lYvbW+SdTT3ybr6+3qg1URfz++/Fz4YKZ/JFczlW0++8qdZepCMXYnAiYay26P8gW8OVMtMv7jgqKTj534H7HxduPivRLdUBphUWFr107ErQTF7gmP3W34SroX2Q7oHg9tGuAUbuoUo8qbq4gJgTn66eArM2RcB+VtEGw/S6viDbEHOG3yXoQCGaXkBp5h9rUp4t6mI3dVU0SfrBMzr65WBT1UedfZO8CFJqUBTS+ueYxc8vokAalLPlaLtFqjlFgweqqZnoJY7xfSTyNGfLrXxDLxw80nyQy5bmA/0EzDd3qtWUJi2xeU1D9IFN+5lXk/J3H/qlu2MMBOPYOtpSxD4ICO3SCQ+TA8dZui6VA8XBk3nxZHgWCjwhMAGIbAhus5k9L9Wzw9PXB2flFNQ8rpc/GoMiw9PykEAs+xJpnD38auf+UTbTg/WVywFgiNrYwgwtBfQo0B9mk2N1HIiGLpC02X00V5jPw2zmkoYPytg1HQ/z+/X/ZuywW/5ruB1e1bQD8RuPEzfeoS29TBt22HadrBxjLr5ZEziyTWsY5HRe0mrtn/hR5367ZpJn4SNmRFqMzVw9Mehxp4UQ08oJg93DdGAxmsStfF+MIeFCI9AoPN08PLlGeVaUA8fAJu0EOhIQ/dAq2nhVu6BXxOZx3+9xRXmtrZ1gJZd+bep8TZQIVIOortbWlPXNGfRuun/XWvrQTH1JBu4++vj/bWB3zrZB4EP1pxMBKrICB+o4+Bt7gmN4zL3IMKhHGjeWigy1H9o7wONQ8OT5FFMgoGrv4FLgCEm0hCz1AAdCcpCnMYE6KGgZUMRWCg5ObSiLR5K+aKDg9Z20MSE6rsFg9YZKG+Y4yJNaPFaP12sl4Grr80MitUUnxkLVn9JXHvwl+tllbUtbR2vDvJV409DFUmpAGijgRsuEBekpPKBYjN1heaCGbsEm7tHwtEUQ5dwfUwgcCB0Uf5ajt46jotgeF9NN5K+R4gOLtDAJVzHKcAAHwItkown6eFJui4kXWywLiZ8YEAkigg+QQ1QBiI5O6FZuRiChjOwEUP0cEF6uBAdZ4r8nADzqRGm7hTHWcFRiYfuPsxK54hy8ov/MOavxp+G6pJSCZ1dUrYgb9eRy9Qtx6M3nfBbut0cT9aZtMAEF2DmEgh38IJG43oQYCgv0MJCGQpw4YBVkJ2HI+q4ELSBYMnyAeRQ+6vvKucl0I5OvnAnbwO0jyHGyxgz3wj9gwl6IX5upHfkZua2U6xtpw+evC7MLuro7H512RE13hP+NqR8FV1dUmCGtrR2FJfW3Pqd/d/wDR7e6yZ/tcTpyxW4b6JwX0e5fhuD/zbKdX4U6j8r8PNXuy2Mcvp6uev8GOdv1qL+s875q5We365ZGLGR9ePPF64/EOcWdXR0dnZ2dXV1y2QylY1G/X/A35iUavxToSalGioHNSnVUDmoSamGymGkpOzt62toemmZdoU0t7QrRHl/68Cexmbo8w0jVYcCeLhSWU9rWweoEHgwAyJfNr61DVpFHpJWaBsIOKe1vWNwiZpXIZXK2tqhMxVl3zbtWFNzG7jW4C96K+8b/Ar5mvfQdRVXb3rLhSn6eqQ9Xa29XS09HY1go1+eg+DP4enTp73SDlBPL1QhJLL2Bnm1Lb3dbT2dLYqvYH9PZzOQvp43jaAbRF+PDLrD7vae7jaoHlAc3G0nVOfAhbpboZ2d0E75ma1QH+kIMFJSpqTy7D5fav1xhNX0cKvpYVYzwoFYz1hsPT3SGtqAvkIyPdLyowiraZHW0xYrxGb6komzln1Fibvxe/qbY3uPMkSJu35dFL7F6Yvl1h9FWM9YbjVtmQWo8OMw84+DLT9eYjFjmeX0FVYfLbeevmLszFWTZi13/WpVwIqtPx26WPBKIivA7BWMfQ6zl4/5aMWoKcvHT1u1Ze+vSue8GfbTA22nhI+dsXT89CVj3CllFW8aXTYUgH9rEw/bzAixmhFhMT3c5pNIqxmh1h+HvOH9eRXiO4eF8c4SxqjihNHZW9D14j+TdrqrpbYs49e8q4ycnz7JZY7KjR+fEzcpO25CNt0mN07+NWFiDmtMNtMqm2WdHTc2L94mb9OkvJ99yu7tbKt9bZr+HmlnLf+WZN/36UxnXoITuD02c5x4g50wfrwofpI43l4cP0EYP1acYJ8bjxJS7QoSJwvixvPjJhT9vnskb9dISXk9JcPio1BoLS00FN6DBE+CKybByOe56kIpIaH5BrrORASWojmZYICHYoFamEAYNlDXI1jXhWSED0DPXnn/CU+pclFu8ZcBLD23EE0nbxPPAH0slNNMGwutbQiHZodBOSq00cG6qGAdFFkH7aeL8jFwIenjKFC288l+8vm1Pouph9o7XiTPBUqOvG6f0ZQwaMUG+ZqN67aefKtAj4XbAjjWB5r9gw5GYMIKi5V5/yp6e/t+u5M5buZKHVwwDO0DTR5Ck8C/YewRCpu00OPrFY8zRMplXoPcO7vEMRbiWHNerDknwa5e/JvyGW/E0/4+9gan1FgLQawZbw2cu1Y/L848a51uAd02J8Y2h2WTGW0gpJpKYi3FVAsBy5DPNBBGm3LXG0AzgJkIdoxeFs0850wk0HBDq61kn+NtnCGKtRPF2EiYJlnRutnx1hlRSBHLhEPT59FNeTQLSOjG8rWqbIWxViKahZBpzIlFCBnmVbfjRzLKc6SkvHkvw2Jq0AApcQGAEKM+WWw/d+nEOZGT5iyxn7ts0rxVE+etspuzcsKcVQ7z1jjMW2c1LQjpRoE5E7VdQ2FYMszJRw9NMMH4zw9KyMl/kTGxtr5xKW2X5bQwGAqaW62DJWk4+2k4etvMXDZ65uJJ81aPm7Nq7JzVEz6PnvR51ITPV9l/sdzhiyUWHkQz9zBdZ4oBPgyBD4ZN9h49JXzX4UuD1QJNSV6733hquI68RxHIui0/vxUpzfCLwA3LExxQENigghGQUphTPPWHWC0Hf/AaGHmQoZ4kXIAWKgjmQEa6BJq6+nxNih7hQiHZd3aKYszEsaY8qhknftzbkrIhPzWLNSqTaZ6baCmJNxMmjEqlGudsG5O7CZ2fiBclYgp2eYp/dM3f7pm/zT1nGz57C0ZItRWzLIVMQz5VOycOLmEhxZsx5Y+ODCbVaK4QSo59L6CNl1DHCGIsRXQT9jooNZIowUG8GZ+7zSVnCyZ3s0fulimSrW6SLfi8zR75W6cU/egu3uwk+REn2OxS9yRpJC34SEl5636m+ZQgBI4EpWbEgb+b8pid2y2VDRVgSAEZ3Ojskja3dtx+yJs8d5kunqLnSka6kgyx/tZuhIQdxwZrvp2S6vh5kKF7gJZLiA4uAChC+zmLr9zJAMXlo8UGpFvaI5eBa3V0dbN2nrGdGq5tTzB0CQV62hBNXhgcX145kEcFWHJ+K3bLSUlSqPZ1m4+/HSmxXroofx1MECAlKF7wRznc6hub5y/eBO4fMFLHyV8ftcDIjfBV8CYjjxVwXCTUkjh/N/ZTMm3LoY4h6dBfB3HyLihhQawBP9aQGz/mbUlZdHsHlCY4zvzJeq30GDggqOQ0sVfa3tfT1d/T3Sfr7JN1QJ/QdleftAMcApZlHe+iYLODkI7gR8NyWQgBa5zgaEBbXYmizvL0E4KNdllrIP3KjTUVxdtJjvp1NZQAg7W/VwrV1t3WL23vBxvSDrDdBy4HiXxD1t7f0znCJVBHSsqb9wApQxB4CtRS44ig4eaJ/zjlrgIl5TWfLorVdFqgg/MBLa+O44Il9BfpGJNOXrH09Nd0WKiD8jfEE8d9HPD7I/aQ0q+FrKd3/8kbttPCtOQp8Excgx1nhSXfG0iBB5rvgHUHTaeG6mH9kRgikLWbjr6VVWeG9YOmF6KhJe7gOGJhyR+QMnH/OcuZYbpuUOoYQxzFFL9g/aZDZVX1ASv2mLovA38dwgPc53f2n4f+fD75Dyd+iO7sEcaaSGIQwhh9QZxNg+iK8hmvB2i7S67QMmLN0xlm/I3m3ATLosurgBeifN5wqOVdLtgySUxFCtfCxXQr4Y6Z9QUDjyP3cjSXbpvHHAdImc0yz74QJW1/i8Q7I8eISZmSaeIRCv5ZYOHp4InAoOSJRtQMPZOP096y/wIgJdKDpIHyAmX9Vu1WHAIs+fHQBe3J3+s4+8oTQhO+CaCVviZr1KtI40gmfhqKdA0AtgFssg/2qzUXr91THGpqaSeuOmA6JVwX46sg5bpNx0Y4xlYBMwxBzxFKMghsVjiO8GZSSmUyi2lBMMcFMDQB7hqiZe/9xcJlDfJ5HVn8/C8IGwxdKZpuXjD7fyNd/OxnhqU8GlhF9HUQ3NkrijHJiUVIYvVFrLcjJTAE834OY8eYpFINU+kG/I1jmyQ3Rjg0uKM2X7zvSwnDIjvaCNij7ARMjWQgRXfumTBwJ9x1poCsXJpRreDGy0Wf9co6gdbsk3XLNzqhz8EN+ec71pQ37qZbeoYCPsFQPpo4gr5bMF88TCbtYQHM/8O/3AHPFYZeCHcnAU5/F7lLcejp06c/Hb0CjfRxIupig4EB57ViR8VwKWiHBU9c4P7vNUhMgLxs0KTZKy/dGFiAsbGpjbzmiIlnOGhPEWgSEkNeu+mY7G2iQmZ4X7gztMod5CoBTflylt6haGxu+4xA00L7wxx94G6BeviAUdMoQ08AL8OOo5dhLv4wDEETGwD8P2BbA6t36DlK4CfvzY41LojVy47RFzNHNQqvKp/xegBSlpyiiGhwDg3+cK0efwu2Puex8kmvQXtDKe+QL49lmxtnnLnekLsJUyW+qziU+yuZS9djxxpxGNaPGWa14vsvF33GjrcTRk8URtmBE9hxpiIaUrLeOCfavCjOgrNOD1gjlbcSn75L7/tuutWUMEBKDbQvICUw/niikTbf4JEcPJWs5ewFdyUAUsImL5i/bJ/ikIKUsEmLkC4hQCe9FSlBWaCt3b9ei0CTASk1nAMnzFp58fpA/kVAFMLyA+ZTIrWd/AwxFCSKvCrhyFuR0sLFS9PBC+kWBnOA4gmvS5/e3t45z59hPXOlhoOvkXu4poOPmbv/6viBHzgIcGl9z2AYLlBDHg3Qd/JfRdv7BuNSdHuveD2ikAoHylJAs20QvIVN2dPZUnI6MJcO50TpsmlmmXHotyKl+DgRsApali/GBJCyJjtFcUh8msBn6vNppmya+ROmec0rpOQk2EmokyWxk0DxLJYJtII51YpLteTEGIjjTAVRBjXJ79T7vnY3zXIKZJ8BUmq7EOEulLfQlH19R365Y+BC0kQvAs23Jsr3vxHbFYcgUh65DFptLScCcKKN3EN/iNg0clJyhPme36yFTfJGuIZqYSBSXroxQErQfAeuO2zqEQ6bsMgIGwy06brNP7+VTWmC+QGBg1K7GLhHGuBDhg0JdQF/a+uxSZ+tgIiLD4ZN8AbtiftXocNGZNHzlurigdtEhtahQhMnTAs9ePK1VONf21lANxWv1RKu1+MzxjWIriuf8XrIOluKzoSLY+BFGy3z4kdn0hzqJMoEeh3a64v5h714DJtsunH6WiR/E65aMmAR5Z0N4NEQnPUGfLoFL9H21Tozt07hsabwWZ5ZiZj0jQ7shIkZLHte/PgshlFmjE4u07jyBu1dkhJoSoupEXoYkhbaT9eFhHAhv4Wm7Onduu8CIKUO2gc0pkAWLh1YqBUQ68dD5w2wPtpQwIho5EL6hkIvf02OZCWAsuncHIfZkaBCffcgoGXtPl1y+Xnz3dTSRly5x8Iz3NgtFImiINGBwbH7el6fUfJVmLsugk3+HpASNgnyeIqG05SXbzz0+HK5lWcEFEDFUExdw+0/DiqtGN4mFuWWYr9cZeQWCE14n+yNcPL7ZP76h+nDJ1TKvb0nN9Yoh4YUUI3yfsRXct7CppR2tuT+slQca5y+VEMUbS6MtWsU3lI+6TXoqC3IPfydmG7JXqEHPjlx6EGNmH06KDveVhhlBjywrBj9WuHNl4s+g3p0Oppl7U3AAZK2N8g6mqSt1TmnicJN1kDFSuh6VTdin77DkNC1u+lmU0LhUCozgp48bM6XjFRTNjS1LgzdDLOfr4f108cSERi/gDUv1ss4eOqqqSuUhFcfF6Dn7O08N+JxhmBI6deis6v72K93bD6CvG+4C1nLyQ81b8WNO8+977Z2yro9RvgAaEFPFEXLwc/5q+XVdX+cukiBltZ2BHq+oXuAvksIMC2AAfCq+wUs2q9J8cZoguYkLwPXYPCfWE8Jzs4vUzptEOAtOnft0fiPg7Tsv4Pajcm+1lPDP/deX103jA8rubkrl2nKj9LlxRjwEybUC68pn/F69PXIJBdiMtcgAS9z6TZ5TLuqO9v6ZK81FYaiJf9BJnVULssil2rOjbEQ7/isPj9TcUh8boWAYSVYbypabyRmGOZfT+gdQRbW/PNhD6K0szcYCKNhTb/Hv0ubEjTf5lNDAKXkeaGgnhuLqeF2n0dOmBM5ae7SSXOXjft85bgvVtnNXT1+7qoxX6wYP2eN5dQg6+lhZlMjdbFQPioNZwLw35EOhI+/XZ3JEw/WXFPXELx2G6gchgvWcwnWdw3URBGAu2Azc9mEOSsnzVtjN2/N+HlrJ3wRO3lOjP3cdfZzVk6cHWkzLdjYJVjXmaKPCdZ2Jmk7E0zdiIztL8KfAGVVte7frtV1JACjE5yg4wbccG8jrJ+lZ8i4WcsmzF1m98XK8eCev1gz6Ys1drOWT563FPwii2khxqBNcFkCNdyu0DwyHWfC+E9Clfq+pVLZmE8joBRZ0GopwPf/NjJ270gyBlbV1HtFxBngvWE4EszJVwfnZ+5B+PHgRaXTsu/sz4xGcGm6QjpcRDXMTRgvSsDn/zRNvBmfvcUpdysqbysuZ/PknM32YFu8EZu/bUrh1bjBTrwK4d0nMeaCOEturKGQZSHZOOHhegPexvE5m3D5iXjJRoxoC1a8wzVvu3vuVhfJVgwQ8QZndqwV8Nl5NAMuFZ6xXlu8GVOSsg9QXFFnfVEq76epvCjznFgLbpShgGoAXhgR0y5ns6t4o0vuVrf87a5526blbJ0u2eoKJGfbVN4m94wocyHLhA+MY4ZhxTXq0/53R8rf7qabTh3oZoRjSOA5AacHgacA4xJoKSBQHA4fCASwClqCDg2liYei1rggyDUGWhA0/fbeE6avuHxTORe8MLtw6vdrtHAUDUcvPQykNaFUqC7BBnj5Il9QIj/gyoCrA1UdCIdW5CQg8URghgJOALdd3zVIG+u7IHJjyyv+7PmbqaNnLAXety6GAEN9a+pOQjj5GOIoSHDnrpBlDHcB9xwMxMQ9DI5aZOJJ1EEtgrJZYMK1nQKNPSI0nIi6KJ+4nb8o1ZzJkwDVDkMFAt8Fhvc1+IhYWDJ8tr5XUVvf5PyvSBjKR29qqCYOGKN+4z6iKE0aFt3YIUkwFyQYZcTqAW5lRRnlMGw40aYZUci8BDMx04ATi+DQ9PlxJjkbRotYNnyaecmVVYOZUft6pJmsCRy6KS8GzovWZa/REdOMBFSEJMociIhmJoQcEQMJ1QTs5zF1uQwtQYyhhGWbugbJoRqCguk0K/6BhbLOF92M4A6LUnZJ4lHi2NFQ/yTTAJiYkjibzCgjyPuJBV/NgVvDBSoW0BpitpmIap0bN0rMMAYuFz9Kv+Z2/Lsk5Y2UDEugKdG+CBQBifbXdfLSdgIEgtaBe55L1x+BhjLq6qIgLoJPA2wAtI0DvCFoOi0yQHt/RWAm3x8+kRVHlGc6JQD4rXpOPxhi/fTQBEBlyK1G+Sv6vvXQ0KqxgF7gElDeXqyfDpYE6VSotwboYP9hswr29z/97U76jO/XG7kTddy8AeEMsf6KSuTLOUKL5+mhg4AY4gItplB0nL6HY310nH0BTeVpLXztZkXuP3Wj+eUxPmyexGVusBbaX88tDMq+jvOaPC9k6Al/iGspGXpTAmFoPxiaCN5YU9eAxy8bl+IbO9KiTdkJFpnx5k+oJoL40SKGNZTcP34UYAybbsRlWHI2WKYzzJ7EWmQxbbkMs6LfVg595KVpZwTbPNOjrbKZ1hKqRTbNnB1tmE0bLaKO5tMtM2KRArqJhGYpYZrx4uG8eF0h1VRAs+TQbDhxtumMsRmJrl3NVUPuCEJfr6xWmJye8CmPPoEda8RnQWtLQncC2M80zwKXoJlz6OZ8hhG0pBrVTEi14Kw35kYjc+LAhlHNnU3vspsx5RHH1oM8yjPA0pVkhiOYuRKN8f4mbiQgpq6QmLnLRb6si0KM3YNMPIIBla0/Cvro2xWnzt9WerRKuHb3iVdE/PTv146dEWbmEWboEg4aaCO3YIRHoL5HmKnLMjNXgqWbnxk+zBgbgXQN0MUT7Oet+MQrJmjdLuCGK1c3BICv+09dQ/93hbkHBXjHpm5BRm4BCE8iqBnpEW7gtszYfTnwUcw8yKYe/sYeJCN3kqEbcY5v9ErWvtJXBgfV1NaFrd5m6eZvPI1i6B5o7Eq28vDZvOdnpdPeDKB1TDwCDDzCkFOXa7mEIaeELaf92ND4/L16+jTn9l42C8Pe4vA4YUxm4nhO/Bh+3KiMhElpCZPZ8RN48XbC+ElZG+wesmzZmyZyNk5IZ1oJL0e/FJ1++rSzsark7gH+noXizR7iDZOFCeNEcZMFLAde3ERu3DhB3Hghy04YN1aQYCXYYAG+ihImCDY6Cfb/O/diVH3hgCn5KqQdzWWPjufu+YyXMBmIKNEpnWoriANVjRezxorjRgONCwRs5GwYx4k1y0kYBd4oPm10UfJP75KUrW3tPGEeh5/DEeSyBbkcYR5bvjEoHOFLX+V78tnCPEF2YVFZ1UiMrWfyR9Xa1lFcViPKLWELC+Q15LNFeWwR2C7kinJ5olyusIArLOSI8iUFwM2tf10y+ldR19icX1zJl4B6CriifI4YVAvqL2ALIAHXAj9BLnk8cb4kv+R1OQXaOzpyC0oF2cVZghxQD1eUl51X/FbBJgWEucXQ7xIXcUFVwvyc/OKh6zy0NdY2V+TWlfIbK4R1xezGMn5TmaChXFRfKmwoFTSWCZvKxU1lopZKSWO5CEhLpbjzNTmke2Vdnc3VrTUFoIYmULaE31jCawTb8q9NpXxIynhNZcKWquyOxvKe7vaRdP90ttR21Jc2lUuaykWtlZLmMkFLuaC1QgRJuaCllNdSxgc7WyuEkJQL2qsk0rYRrSs1UlKqocZfBjUp1VA5qEmphspBTUo1VA5qUqqhcviQpKxraHqcIbj/hJ/yiC/MLlY62tDU8iRLnPyAnc7Llspe9OIDF5Uvym9oghbIrq5rFOcWK2XF5Qpzsob0GClQUTXgmba1d3LFeU3NAzHhhsbmdI74fhrvXiqnoKjkRYFXUJ3Hrs7Pkr0+bXNHZ5cor7hmuHBpZ7dUICl6wpE0NL005eWZPAFiOi/nxoMMpQBFaXnV0HB6b2/fnYeZD9N5VTX1gzvTssBtsx9kCB5kCJ9kDfTNdnZ1p7MFldUvjR8or6q9/4RTWFLZP6TOsvLKLJ6oTx43ANcqLn3RuQ/+cK4o70Ga4H4qny/Ke92iUu8JIyVlj7SrrbqoraoASGtlfltVoVwU2wWtVQUtFXnNQCrzW6oKgYCNxoqCpuqSpurShqqSmvIimfSl2E1vX9/5mxmu31HP3khvbGnPL62ZvWgNm5+jOFpeWRudeKiiur6lrUNSWPld6JaamoFoQhYvb+Z/Y05dvCPr6d118ta/QjaDh6o4VF3X5LvmgN/6I3ODNg7S7pl8QUjW7gt2Xyxm7Tlz7V6m57erz98YGLj666W7U/4Vtf/Uw5v3RW8YMdnWWFlynJx3LDD/+gZZ1/C8zC8u/z5y877Tt4dOuqhvbI6g7g2O2p1dUF5SWcfYef7zhfQ0tgQcYguzvwtlLEk4Vlrd0NLeWVhaOzSfIGvfz3UNAyvTt7V3BK/Zlnj4eiq/oLy6XkEjgMaWttWbT4yetzxdkD+4RB9HkOM0m7L3xMAAjks3n8z0jTly/lZTS9vZ2w9nEqkHz9xU0H3jT8fspgWUVEAsr6ptWpuQNPjy87PzP/JaduMR7/YjbnGZcqc/QEdrU3NNSXN1UTN43NVFLdXgoQMa5LdVF0Ci4An4WlvQXJ3XWpPfXlvYXlvU3T7wi96MkZKyvljM2xsm3BckOhAi2h+UfShMcjBUfCAEkqRQUVKYKAlshAsPhvL2B/EOBPMOhLAPLck8tDL18Nr7h9ffOcwozHtJe/X191+4nf6RF+tqCjTavksqm/7tskvXB9bGEooLdh+8oNju6JJu2HdRkj0wKCmLm/3pd9FHfr3V29e/9dj1r0I2Zwlzn8nf9V0nblh+snz/hYzjv6XvP/aiN7mrW8bafT4wdj/2m+XfBLJcvl556dbA+MJfLyY7zlj8yfz4hYv3XL6RMlhECSWCZMGOeZxt8+o4v+Y+ONHW/EJdDaKgpOLbiE37Tt8dquFKyqtd5obH7zqj+Hr417tOn6+8dQ/6yZdu3cd9vfT4lYE78V25hy14MfCKtedEXeOLCQyCnJIvQnZ9Rt64hHUo7/lsIXCh2J/OOHy/PnvIsulcUa71R947jkJz6Pr7+4+cvf05ISaVC70GeWVVXmt+ou38RXGHW3b/bO1GyCuGOFdW3bCKsW9wajxPkj9lwZKvI1g+qxIv3ro/+Boo0COT8ZJPZh5bwTu+nHdsCedYJP94pPB4hPhomPhYiOR4WPaxUCDC42Fph4j8UyHCkxTJ6WD2YVJu2sWRrO08UlI+k4896ZV190q7oE+ZVL7R9fwrJD2K7R6pYhsSsCHrBjpS2t2p1LcLvp6//dBjwdqLyZmANE84eV7hcdW1Aw+7qbllUSA9g5MHGHnnicBl/prB/6WkrIq0fDNp/daahpZZZFowbXddI/T+5RdXziVtmDg3yuU7xkxSAnnZtpy8geYYaJHEfReKy2svJ6dNnBkyfmbQxVvPNeWVZPy8pfcycuoaW1835LZH2i28uaW7+H5t2pHk+Bn8y9T21mFIWVRatWDx1m2Hr7e1dw3qrY6Orp8OXvrcj3bjPqewom4WiUGJ2ldYCnXfgYY+kpHk6pXAy6sAP3PSv1YnP3wxR4K54+jQtv7X3x6XVTcBxrv+e/mdh1mKneDFjjtw0eGbVTlDJrUJsgtGfULYc3pg/OXNlCefLVoeRt0JlDF1z1mnb5ZfvTswkOr0hZtuXy/befwmuPrVu+yDJ14M2RTlFM3xj6qub2pqbR82NzagO/RwpeDhPn/Q8o1BGijtlLNCOpJJ38/eipTvHA8zOD5L4r4PjV8QtmVxTFJ17UvhfvAe+0dsmwP1Im7dd/LF3FmA1Ez+MtauOaQY+k8/P8kc6DJOvpfO2PpzFj8PGAbgaa2i7krNECoOyXp6frmU3CbvL7l863Fw1PbHzy2wR6lZxJWJX1Ji/hvJpG3ZVVhcovTyKFAsSknfs0B8KjL7Cu3RGWplifjVPg9g7VG3HPlvCOvb0ITvQhPqnze+zS1tJy/eCY494LVqx6ZDF3OHEKikvGbzwSsLV+ydSdzA2nUmf4j9cPby7ZbnC6rW1DUc+Pm3OaQE78jNuw5fqBtitp66cjdg7ZZBixmguKySvG7jpeSBtw7g/pOslcy90xesnUFg/HrrSe3zGwP/0+lLdwLXbZ9HZPgt3z50pRhgPkVE/Tg/nLEgNCZyXUJp+UjHmrwTfEhSPpO/66DJAO/isOs/gEPAzFJqOxTokyd4Ud47BH84XXAQiqsA3fa6fkU5niped/Cu90MjcV5bObhb+Qxj5UbqKbT00/ClgNZ5w3r2g3jdXzFCAI9qynwqsHqJy5hDM9iAG4MW0R0uKQ14vcF/8lb5at4JPjAp1fgrUd/YWlvf1C0dUV6nDwg1KdVQOahJqYbKQU1KNVQOalKqoXJQk/J/xbAhJDX+F3x4UpZX1V1OTnuYIS4th9b7bmntOPrr74/YeT+fT1FEs1vbOsPX784tLM/iDfTcPEgTsLadLK+q58uTbPU/fcrc9nMmL6dSnsWgq1t6/OytDK6kqrYenNzb15eaJT596U5nF1RbfnHF5duP0jhiBZkeZwp/Pnfz3uOsX84pz2FtbW6UR39eoK2t/ezFaw/TOL/dedjR1c3LLjh6Kfl+uiCTJwG1FZZUnLmc8iBV8DBd0Cjv5Lz7KKu5pf1JhuRBGhQxrWto/uno1eQHnFv3srqlstsP2OeuQT1Y/f39OQVlt1IyFP2KnV3S5Iech5nZipgXqOpGSuZvyY/zCkuH3swzaGm2LpnsJVca/Ngbdx4MRhyraxsuXrmrCCSxth+tb2jhCPI7OqH+Xkle6bW7nD3HoPng4G9Pfsh7nJUreD5t+lpy5rnLj3cnXRo2q8L7xocn5Y0U9onzKYqEKn19/Xfu89K4BYAwKU+ET9IF4IGB57ogdMOBkzcUvXPg8d9Iydqy9/y9VMHt+xwo/vf06TJa0qMMYav8H6xvbA5avXHoJbq6ZfdSByasZQmy95y4DAih+Hr7QebeoxfPXb1z4MjZFwXkRDmxM+Zh8tn+IaHBzs6u2ylPTvx67Zcrd8C10gW5u0/fvHo3PYObDY5u23/23G8PwbUUJ4Mb2330UnVt89XbGb9egULZ4C2K3nry2PmUvSdvtnd0/3rt0aFfIE4A0ojzSs9cuV9aAY2iAK/l2WtPLtzOUPSh19Q3gTMP/wK9DIN38gwaotF79uRPv9882zMkJirr6Tl/9Y7i5QQoq6jdl3RREQQV5RRdvZ0J/jTFIY6w4NSl1B1Hkp/JSXn5dtaNFEFZ5UDB42d/3/DjpZ/P/N7SMnxH/3vFhyelKLvo6NlbkrwSoTgP0KumrnHrgcsFJdUHT/6mmGjW2dW9PiGJte3opZuPFEUepPLvPGR/7R914/c0BSnXxh8AT0IRgYNSqWw7nFdYUlRarlCHUqnsccZA+mBhTsGFG/cqng+ieZTBe5DKLimrXLE+XrFnEE2Ndb3Ppzwr0NzSevTkhey8oiXRUG6ZLGHer9cfAaopsqvxRHn7j13NKyhn83MLissBFQhhNKDLfz5z9/hpKJkEUIS/Xntw9Nfbdx9zwUt4NfnJyYt3wB0CjZjFz/35/O00thiUamnruHkvE7QMiqh1fWPL4wx+ifwyQ2/mGdSH2SZ7OejY09Nz+tx1gaSgQd5vXlJWdepMsoLcgK+bdv4yOBYpO7/kzJVHdx8O9IfdTMksLq9tfN6x+evl+3fu85OOXP0gxsmHJ+Uz+ay0sooXszkBt0rKq4d2udbWNYCmvKt7YJwRIBn41gRUyvOZVhVV1WUV1YOd1z29vdU1dUOHaQ32YYBqwcnllQOXA1V1d0uBrmqUj4V7MwBL6hsaC4pKauSGAagKvAmVVbU1z7vswf2Ar4PdgO0dnQWFpZVVdYNXV1xLMe4O/IS2joHGEdxwVU1tz/MupabmlsrqF7MoFe1vl9z8+EOAthu8Y+XPU8e0tL6YQfpitqQcitUvFduAshVVtdW1A5oS/JPgnwHP5cXZfyFUgpRqqDEUalKqoXJQk1INlYOalGqoHNSkVEPloCalGioHNSnVUDmoSamGykFNSjVUDmpSqqFyUJNSDZWDmpRqqBzUpFRD5aAmpRoqBzUp1VA5qEmphspBTUo1VA5qUqqhclCTUg2Vg5qUaqgc1KT8v3bpWAAAAABgkL/1NHYUQ+xIyY6U7EjJjpTsSMmOlOxIyY6U7EjJjpTsBDQhj6ArJFyPAAAAAElFTkSuQmCC>