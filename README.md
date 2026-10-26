# Abysses

Pêche de nuit, vends ta prise au village et perce les secrets des abysses. Un jeu de **Keismey Studio**, jouable dans le navigateur et installable sur téléphone.

Jouer : https://keismey.github.io/Abysses/ (aussi dans le hub : https://keismey.github.io/)
Play in English: https://keismey.github.io/Abysses/en.html

## Fichiers

- `index.html` (français) et `en.html` (anglais) — le jeu complet, une page par langue : une modification se fait dans les deux
- `sw.js` — mode hors ligne ; changer `VERSION` à chaque mise en ligne
- `manifest.webmanifest`, `manifest-en.webmanifest` — installation sur téléphone
- `ks-studio.js`, `ks-back.js` — fichiers communs à tous les jeux du studio (ne pas les modifier ici)
- `a/` — images et musiques ; `icons/` — icônes de l'appli ; `og.jpg` — image d'aperçu des liens partagés
- `fonts/` — Fredoka, Cinzel et IM Fell English SC, hébergées avec le jeu (licence SIL OFL, voir `fonts/OFL-*.txt`)

## Mettre à jour le jeu

1. Modifier `index.html` et `en.html`.
2. Ajouter une entrée en tête de `PN` (notes de mise à jour) et changer `VER` dans les deux pages.
3. Changer `VERSION` en haut de `sw.js` pour que les téléphones récupèrent la nouvelle version.

## Sauvegarde

Dans le navigateur (`localStorage`, clé `ab_save`). Le hub Keismey Studio la lit pour afficher la progression, sans jamais l'écrire.
