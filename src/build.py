#!/usr/bin/env python3
"""Abysses : génère index.html (français) et en.html (anglais) depuis une seule source.

    python3 src/build.py           écrit index.html et en.html
    python3 src/build.py --check   vérifie seulement qu'ils sont à jour (code 1 sinon)

- src/abysses.html : la page commune. Chaque texte qui change selon la langue y est
  remplacé par un repère ⟦t042⟧.
- src/textes.json : pour chaque repère, le texte français ("fr") et anglais ("en").
  Il peut contenir du code quand une langue a besoin d'une ligne en plus (ex. t010).

Une correction du jeu se fait donc une seule fois, dans src/abysses.html. Ne pas
modifier index.html ni en.html à la main : ils seraient écrasés au prochain build.
Python 3 standard, rien à installer.
"""
import json
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SRC = RACINE / 'src'
SORTIES = {'fr': 'index.html', 'en': 'en.html'}
REPERE = re.compile(r'⟦(t\d+)⟧')


def lire(chemin):
    with open(chemin, encoding='utf-8', newline='') as f:
        return f.read()


def construire(modele, textes, langue):
    vus = set()

    def remplacer(m):
        cle = m.group(1)
        if cle not in textes:
            sys.exit(f'Repère {cle} absent de src/textes.json')
        vus.add(cle)
        return textes[cle][langue]

    page = REPERE.sub(remplacer, modele)
    return page, vus


def main():
    verifier = '--check' in sys.argv[1:]
    modele = lire(SRC / 'abysses.html')
    textes = json.loads(lire(SRC / 'textes.json'))
    for cle, t in textes.items():
        if set(t) != {'fr', 'en'}:
            sys.exit(f'{cle} : il faut exactement "fr" et "en" dans src/textes.json')
    perimes = []
    for langue, nom in SORTIES.items():
        page, vus = construire(modele, textes, langue)
        inutiles = set(textes) - vus
        if inutiles:
            print('Textes jamais utilisés dans src/abysses.html :', ', '.join(sorted(inutiles)))
        cible = RACINE / nom
        actuel = lire(cible) if cible.exists() else None
        if actuel == page:
            continue
        if verifier:
            perimes.append(nom)
        else:
            with open(cible, 'w', encoding='utf-8', newline='') as f:  # pas de conversion des fins de ligne
                f.write(page)
            print(nom, 'mis à jour')
    if perimes:
        sys.exit(', '.join(perimes) + ' pas à jour : lancer python3 src/build.py')
    if verifier:
        print('index.html et en.html sont à jour')


if __name__ == '__main__':
    main()
