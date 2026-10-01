# Audit Elle arrive — 1 octobre 2026

## Périmètre et conclusion

Audit manuel du code, du produit et de la preview locale de ce dépôt. Version statique autonome : hero seul, catalogue dans un tiroir fermé au chargement. Prête à être revue visuellement ; aucun service d'inscription ou réseau opérationnel n'est annoncé comme disponible. Aucun backend ou hébergement de production n'existe dans ce périmètre. Nudge, projet voisin, n'a pas été modifié.

## Design et produit

- Direction Signal/studio : fond blanc teinté, ruban original irisé, EA sculptural, typographie Manrope locale, accents colorés.
- Hiérarchie : promesse, explication, action principale, découverte du projet. Navigation et onglet inférieur ouvrent de vraies sections du tiroir.
- Catalogue effectivement caché au chargement ; quatre chemins sélectionnables, ressources et état du projet accessibles après ouverture.
- Aucun témoignage, partenaire, nombre de membres ou événement inventé. Le réseau et les expériences locales sont explicitement en préparation.
- Fond enrichi par déformation WebGL et reflets, sans réduire la lisibilité de la zone de texte. Le mouvement est discret et interruptible.
- Corrections depuis la maquette : navigation fonctionnelle, autonomie hors conversation, sémantique native, catalogue masqué, pause, contrôles clavier et suppression du petit débordement vertical desktop.

## Accessibilité et responsive

Vérifiés dans le navigateur Chromium intégré : boutons, ouverture/fermeture du dialog, focus initial, fermeture Échap et retour au déclencheur, choix d'un chemin, accès aux ressources, commande pause/reprise. Le dialog natif assure la modalité ; focus visible, langue française, titres structurés, décor ignoré des technologies d'assistance.

Desktop final observé à 1199 × 738 : aucun débordement, onglet inférieur visible. Fixture responsive à 390 × 844 : largeur et hauteur exactes, sans débordement. Fixture 320 × 740 : contenu vertical de 830 px, défilement nécessaire et aucun débordement horizontal (largeur utile 305 px avec barre de défilement). Ce défilement préserve les tailles lisibles sur petit écran.

Réduction du mouvement et couleurs forcées prises en charge dans le code. Pas de certification WCAG, audit lecteur d'écran, appareils tactiles réels, Firefox ou Safari. Le thème clair est un choix du brief. Aucun mode sombre promis.

## Performance et robustesse

Zéro dépendance npm. Image WebP ~35 Ko ; deux polices locales ~191 Ko au total. Aucun appel tiers au chargement. Build limité aux actifs publics. Animation plafonnée à 30 images/s et ratio de pixels 1,25 ; suspendue hors visibilité, pendant le dialog et en pause. Image de secours si WebGL échoue, image fixe en mouvement réduit. Aucun benchmark matériel bas de gamme ni mesure Core Web Vitals en production réalisé.

## Sécurité, infrastructure et backend

Pas de compte, collecte, cookie, analytics, stockage personnel ni secret. Le serveur local écoute uniquement 127.0.0.1 et utilise une liste explicite de fichiers publics. Tests de refus des fichiers sensibles et des requêtes POST. CSP locale restrictive, nosniff, referrer-policy et permissions-policy. Ces headers devront être repris par l'hébergeur : le build statique ne les configure pas automatiquement.

Architecture future décrite dans ARCHITECTURE.md : contrôle d'accès, modération, validation serveur, limitation de débit, gestion des secrets et sauvegardes à concevoir lorsque la collecte devient nécessaire. Aucun backend n'a été provisionné ou prétendument audité.

## Dépôt et agents

Dépôt GitHub privé dédié, branche codex/hero-studio. AGENTS.md fixe périmètre, direction, exigences d'accessibilité, vérifications, honnêteté produit et séparation de Nudge. CI Node 22 : syntaxe, quatre tests serveur et build ; permissions contents:read, credentials de checkout non persistés. Pas de protection de branche configurée : à établir avant collaboration et intégration automatique. Captures, dist, secrets et dépendances exclus de Git.

## Vérifications et limites

- npm run check : syntaxe des scripts.
- npm test : quatre tests, rendu initial et assets, non-exposition des sources, méthode HTTP et headers.
- npm run build : copie des seuls actifs destinés au navigateur.
- Vérification visuelle desktop/mobile et parcours clavier dans la preview.
- Le moteur automatique Impeccable n'a pas pu démarrer (installation absente dans le cache protégé). Cet audit est manuel ; aucun résultat de détecteur automatique n'est revendiqué.

## Avant lancement public

1. Choisir l'hébergement et vérifier HTTPS, compression, cache et headers sur l'URL déployée.
2. Définir l'opérateur, les mentions légales et le domaine ; retirer noindex au moment décidé.
3. Tester Safari, Firefox, lecteur d'écran et un téléphone modeste ; mesurer les performances réelles.
4. Si inscription ou communauté ajoutée : spécifier et auditer le backend et la modération avant ouverture.

Ces étapes n'empêchent pas la revue de la preview statique actuelle. Elles ne sont pas présentées comme déjà accomplies.
