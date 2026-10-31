# Abysses

Pêche de nuit, vends ta prise au village et perce les secrets des abysses. Un jeu de **Keismey Studio**, jouable dans le navigateur et installable sur téléphone.

Jouer : https://keismey.github.io/Abysses/ (aussi dans le hub : https://keismey.github.io/)
Play in English: https://keismey.github.io/Abysses/en.html

## Fichiers

- `index.html` (français) et `en.html` (anglais) — le jeu complet, une page par langue, **générées** par `src/build.py` : ne pas les modifier à la main
- `src/abysses.html` — la page commune aux deux langues ; chaque texte qui change selon la langue y est remplacé par un repère `⟦t042⟧`
- `src/textes.json` — pour chaque repère, le texte français (`fr`) et anglais (`en`)
- `src/build.py` — fabrique les deux pages (Python 3 standard, rien à installer)
- `sw.js` — mode hors ligne ; changer `VERSION` à chaque mise en ligne
- `manifest.webmanifest`, `manifest-en.webmanifest` — installation sur téléphone
- `ks-studio.js`, `ks-back.js` — fichiers communs à tous les jeux du studio (ne pas les modifier ici)
- `a/` — images et musiques ; `icons/` — icônes de l'appli ; `og.jpg` — image d'aperçu des liens partagés
- `fonts/` — Fredoka, Cinzel et IM Fell English SC, hébergées avec le jeu (licence SIL OFL, voir `fonts/OFL-*.txt`)

## Mettre à jour le jeu

1. Modifier `src/abysses.html` (le code, une seule fois pour les deux langues) et, pour un texte affiché, `src/textes.json` (français et anglais). Pour retrouver un texte : chercher sa version française dans `src/textes.json`, puis son repère dans `src/abysses.html`. Un nouveau texte : ajouter un repère `⟦t…⟧` avec un numéro libre et son entrée dans `src/textes.json`.
2. Ajouter une entrée en tête de `PN` (notes de mise à jour, repère dans `src/textes.json`) et changer `VER` dans `src/abysses.html`.
3. Lancer `python3 src/build.py` à la racine du dépôt : il régénère `index.html` et `en.html`. `python3 src/build.py --check` vérifie seulement qu'ils sont à jour.
4. Changer `VERSION` en haut de `sw.js` pour que les téléphones récupèrent la nouvelle version.

## Sauvegarde

Dans le navigateur (`localStorage`, clé `ab_save`). Le hub Keismey Studio la lit pour afficher la progression, sans jamais l'écrire.
