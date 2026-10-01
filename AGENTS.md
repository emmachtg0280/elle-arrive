# Elle arrive — instructions aux agents

Lire PRODUCT.md, DESIGN.md et docs/AUDIT.md avant une modification. Ce projet est indépendant de Nudge, présent dans le dossier parent. Ne pas modifier le projet voisin.

- Priorité : qualité visuelle du hero, puis accessibilité et fonctionnalité. Landing limitée au hero ; catalogue fermé au chargement, disponible par l’onglet inférieur.
- Préserver le fond clair, le ruban original, le EA sculptural, le ton français franc et ambitieux.
- Aucun chiffre, témoignage, partenariat, événement ni inscription inventé. Identifier les services en préparation.
- Aucun secret, formulaire collectant des données ou analytics ajouté implicitement. Ne pas lire ou copier les fichiers .env.
- Tokens dans styles.css ; actifs locaux avec provenance/licence ; boutons natifs et dialog natif, focus visible, retour du focus, Échap, réduction et pause du mouvement.
- Aucun backend requis pour cette preview. Toute future collecte exige un besoin produit documenté, validation serveur, protections contre l’abus et contrôle d’accès.
- Avant commit : npm run check, npm test, npm run build ; vérifier hero et tiroir au clavier et en formats mobile/desktop. Documenter les limites réellement non testées.
- Branches codex/<sujet>, commits ciblés ; pas de force-push, secret, build, captures ou dépendances dans Git. Aucun merge/publication publique sans demande.
- Ne déléguer à des agents que si l’utilisateur le demande. Ne pas désactiver les contrôles pour obtenir un résultat vert.
