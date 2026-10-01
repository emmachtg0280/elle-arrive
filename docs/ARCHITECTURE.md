# Architecture actuelle et étapes backend

## Livré

Site statique HTML/CSS/JS, sans dépendance npm, base de données, authentification, collecte, cookies ou analytics. Aucun code ni secret de Nudge réutilisé. Le build inclut uniquement les fichiers de rendu et actifs. Le serveur de développement écoute sur loopback et ne sert pas de fichiers arbitraires.

## Hébergement

Un hébergement statique suffit. Configurer HTTPS, cache long pour actifs versionnés, compression et headers CSP/nosniff/referrer/permissions côté hébergeur. La configuration locale n’est pas une preuve du paramétrage cloud. noindex volontaire tant que le lancement n’est pas décidé. Domaine, URL canonique, mentions légales et identité de l’opérateur à établir avant publication publique.

## Si une inscription devient nécessaire

Créer un endpoint serveur séparé avec validation, limitation de débit, protection contre l’abus, déduplication et réponse générique. Collecter seulement les données réellement utiles ; documenter la finalité, la conservation, le retrait et les accès administratifs. La présence de mineures impose de concevoir les contacts et la modération avant d’ouvrir la communauté. Ne pas simplement ajouter un formulaire frontal connecté à une table ouverte.

## Si le réseau devient opérationnel

Séparer profils publics, coordonnées privées, ressources, sessions, candidatures et demandes de mise en relation. Modération et contrôle d’accès par rôle et par ressource. Aucun annuaire de coordonnées ouvert. Journaux d’accès, sauvegardes testées, environnements distincts et gestion des secrets côté serveur. Les politiques d’accès et les tests d’autorisation devront être vérifiés sur le backend choisi.

## Choix non faits

Pas de provisionnement cloud, coût engagé, schéma Supabase, authentification ni envoi d’e-mails. Le backend de Nudge n’appartient pas à Elle arrive. Aucun audit distant d’une base inexistante n’est annoncé.
