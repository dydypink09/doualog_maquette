/* ══════════════════════════════════════════════════════════════
   DOUALOG — Démo guidée sur le dossier fil rouge DLG-2026-0412
   La barre n'apparaît que si l'adresse contient ?demo=N (lancée depuis le sommaire, index.html).
   ?demo-reset=1 efface d'abord la mémoire de démo pour repartir de l'état initial.
   Chargé par toutes les pages (internes, externes, emails) ; les pages sont toutes dans un sous-dossier d'output/.
   ══════════════════════════════════════════════════════════════ */
(function () {
  var p = new URLSearchParams(location.search);
  if (p.get('demo-reset')) {
    try { sessionStorage.removeItem('doualog-demo'); } catch (e) {}
    p.delete('demo-reset');
    location.replace(location.pathname + '?' + p.toString() + location.hash);
    return;
  }
  var n = parseInt(p.get('demo'), 10);
  if (!n) return;

  var ETAPES = [
    { url: 'externe/X01-email-accuse-reception.html?id=DLG-2026-0412',
      texte: '<b>Le client envoie ses documents par email.</b> DOUALOG crée le dossier DLG-2026-0412 et lui répond aussitôt avec son numéro et un lien de suivi.' },
    { url: 'interne/E09-tableau-de-bord.html',
      texte: '<b>Le tableau de bord.</b> L\'activité en un coup d\'œil : chiffres du jour, graphiques et dossiers à traiter en priorité. Un clic sur un chiffre ouvre les dossiers concernés.' },
    { url: 'interne/E11-messagerie.html?filtre=nonrattaches&mail=n1',
      texte: '<b>Les emails sans numéro de dossier.</b> Un client envoie une facture sans citer son N° DLG : l\'outil propose le bon dossier (même client, même BL). Un clic sur « Rattacher » et l\'email rejoint le dossier.' },
    { url: 'interne/E01-dossiers.html?id=DLG-2026-0412',
      texte: '<b>La liste des dossiers, puis le dossier ouvert.</b> Les urgences en haut ; en un clic, sans quitter la liste : informations, documents, douane, transport, emails et notifications sur un seul écran.' },
    { url: 'interne/E01-dossiers.html?id=DLG-2026-0412&bloc=controle',
      texte: '<b>La douane.</b> Contrôle physique le 07/10, conforme. Bon à enlever (BAE) le 09/10, bon à sortir (BAS) le 12/10 : le BAS déclenche la facturation.' },
    { url: 'interne/E04-creation-ot.html?id=DLG-2026-0410',
      texte: '<b>Commander le camion.</b> L\'ordre de transport se remplit tout seul depuis le dossier ; on choisit les transporteurs. (Exemple sur le dossier 0410 : celui du 0412 a déjà été créé le 09/10.)' },
    { url: 'externe/X05-email-offre-transport.html?ot=OT-2026-0156&t=t1',
      texte: '<b>L\'email reçu par le transporteur.</b> Le détail du transport et deux boutons : Accepter ou Refuser. Aucun compte n\'est nécessaire.' },
    { url: 'externe/X05b-retour-offre.html?ot=OT-2026-0156&t=t1&etat=acceptee',
      texte: '<b>Le transporteur accepte.</b> Le premier qui accepte obtient le transport ; l\'offre se ferme pour les autres. Il reçoit son lien personnel.' },
    { url: 'externe/X06-lien-transporteur.html?ot=OT-2026-0156',
      texte: '<b>La page du transporteur, sur son téléphone.</b> Il indique le camion, met à jour l\'avancement (chargement, en route, livré) et dépose le bon de livraison signé.' },
    { url: 'interne/E06-facturation.html?id=DLG-2026-0412',
      texte: '<b>La facture.</b> Prête dès le BAS : client, références et prestations sont repris du dossier. Essayez « Générer la facture » puis « Émettre et envoyer au client ».' },
    { url: 'externe/X07-email-facture.html?id=DLG-2026-0412',
      texte: '<b>L\'email facture reçu par le client</b>, avec le montant, l\'échéance et la facture en pièce jointe.' },
    { url: 'externe/X03-suivi-public.html?dlg=DLG-2026-0412&ref=MEDULH482093',
      texte: '<b>La page de suivi publique.</b> Avec son numéro de dossier et son numéro de BL, le client voit où en est sa marchandise, sans aucune donnée confidentielle.' },
    { url: 'externe/X04-lien-client.html?id=DLG-2026-0412',
      texte: '<b>Le lien personnel du client.</b> Ce qu\'on attend de lui en premier, le suivi daté et ses documents. Pour le 0412, aucune action n\'est attendue.' },
    { url: 'interne/E07-dashboard-manager.html',
      texte: '<b>Le tableau de pilotage du dirigeant.</b> Les chiffres clés de la semaine et les dossiers qui demandent une décision. Un clic sur un chiffre ouvre la liste.' }
  ];
  if (n < 1 || n > ETAPES.length) return;

  function lien(i) {
    var e = ETAPES[i - 1];
    return '../' + e.url + (e.url.indexOf('?') >= 0 ? '&' : '?') + 'demo=' + i;
  }
  function monter() {
    /* Les emails n'utilisent pas la feuille de style de l'application : on la charge pour la barre */
    if (!document.querySelector('link[href$="components.css"]')) {
      ['tokens.css', 'components.css'].forEach(function (f) {
        var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '../assets/' + f; document.head.appendChild(l);
      });
    }
    document.body.classList.add('has-demo');
    document.body.insertAdjacentHTML('beforeend',
      '<div class="c-demobar" role="region" aria-label="Démonstration guidée">' +
        '<span class="c-demobar__etape">Étape ' + n + ' / ' + ETAPES.length + '</span>' +
        '<p class="c-demobar__texte">' + ETAPES[n - 1].texte + '</p>' +
        '<div class="c-demobar__actions">' +
          (n > 1 ? '<a class="c-btn c-btn--sm c-btn--on-dark" href="' + lien(n - 1) + '">Précédent</a>' : '') +
          (n < ETAPES.length ? '<a class="c-btn c-btn--sm c-btn--primary" href="' + lien(n + 1) + '">Suivant</a>'
                             : '<a class="c-btn c-btn--sm c-btn--primary" href="../index.html">Terminer la démo</a>') +
          '<a class="c-btn c-btn--sm c-btn--ghost c-btn--on-dark" href="../index.html">Quitter la démo</a>' +
        '</div></div>');
  }
  if (document.body) monter(); else document.addEventListener('DOMContentLoaded', monter);
  window.DOUALOG_DEMO = { etapes: ETAPES.length, lien: lien };
})();
