# Direction Signal / studio

Surface : Persuade. Direction validée dans le chat : claire, digitale, soignée comme un objet de catalogue, inspirée des principes de composition Stripe et Rhode. Le fond animé et le EA portent la personnalité. Le catalogue reste caché jusqu’à ouverture de l’onglet inférieur.

Manrope auto-hébergée, titres massifs lisibles, tracking limité à -0.04em sauf monogramme graphique. Papier #fbfafc, encre #202139, violet #5342c7, accents lilas/pêche/bleu/jaune. Thème clair assumé par le brief ; aucun dark mode promis.

Ruban original généré avec imagegen, optimisé en WebP. Objet EA en CSS. Motion lente du ruban, commande de pause, respect de prefers-reduced-motion. Tiroir avec modal natif, focus piégé nativement, fermeture Échap, retour du focus.

Ne pas ajouter cartes de statistiques, preuves sociales fictives, stickers ou sections supplémentaires dans la landing.

## Matière en mouvement

Personnalité premium : élégance, ouverture, calme. Le ruban WebP original est déformé par un shader WebGL avec ondulations sinusoïdales lentes et reflets chauds. Le côté texte reste protégé par un voile clair. Le EA reste stable après son arrivée ; le fond porte le mouvement ambiant. Les interactions utilisent la courbe cubic-bezier(.16,1,.3,1), sans rebond.

Rendu plafonné à 30 images/s et ratio de pixels 1,25. Boucle arrêtée lorsque la page est masquée, le catalogue ouvert, la pause activée ou prefers-reduced-motion demandé. Image de secours si WebGL manque ; image fixe avec réduction du mouvement. Pas de vidéo, bibliothèque d'animation ou téléchargement tiers.

Proportions ajustées après retour : titre desktop réduit d'environ 21 %, objet EA d'environ 16 %, avec réduction équivalente sur mobile. Le ruban et l'espace clair prennent davantage de place.
