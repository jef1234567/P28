# P28 – Parcours d’apprentissage de la planification tactique OTAN (APP-28)

Webapp pédagogique d’accompagnement à l’apprentissage de l’**APP-28** (*Tactical Planning for Land Forces*), méthode OTAN de planification tactique des forces terrestres, niveaux 3 et 4 (brigade – GTIA), pour les stagiaires de l’**ESORSEM** et de l’**EEM**. Même structure et même fonctionnement que [MaisDot](https://jef1234567.github.io/maisdot/) (MEDOT).

Outil pédagogique : il ne se substitue pas aux publications OTAN en vigueur.

## ⚠ Source à revérifier

Le contenu a été rédigé à partir d’une **copie non officielle** d’APP-28 **édition A version 1 (21 novembre 2019)** trouvée en ligne (Scribd), lue par extraits. Chaque rubrique cite le paragraphe d’APP-28 (§). Il doit être **vérifié sur l’exemplaire officiel** ; les points déjà signalés sont listés dans `docs/SOURCES.md`. Les équivalents français des termes OTAN sont des propositions de l’outil, pas une traduction officielle.

## Utilisation

- **Hors ligne / Intradef** : copier `index.html` sur le poste et l’ouvrir dans le navigateur.
- **En ligne** : https://jef1234567.github.io/p28/ (GitHub Pages, branche `main`).
- **Appli sur téléphone ou PC** : depuis le site, menu du navigateur → « Installer l’application ».

Parcours : Vocabulaire, Fondements (chapitre 1), puis les **3 phases et 7 étapes** (1 Réception de la mission ; 2A Analyse de l’ordre ; 2B Évaluation des facteurs ; 3 Développement des COA ; 4 Analyse des COA ; 5 Comparaison des COA ; 6 Décision du chef ; 7 Ordres, diffusion et transition) et la planification en temps contraint (chapitre 5). Chaque étape : **Comprendre** (synthèse, fiche réflexe, canevas de briefing), **S’entraîner** (quiz, validé à 70 %), **Appliquer** (gabarits). Outils : examen blanc (30 questions en 30 minutes), conclusions et frise consolidées, sigles.

Le bouton **« Exemple VIENNE »** affiche le thème VIENNE (33(AZ)BB) transposé dans les gabarits APP-28 : faits du dossier, analyses « (à valider) », « PM » pour une donnée absente. Le dossier étant rédigé en doctrine française, certains termes MEDOT y subsistent.

**Langues** : français (source) et anglais (bouton ⚙). Les textes de l’exemple VIENNE ne sont pas traduits.

## Structure

```
index.html        fichier livré (généré, ne pas éditer à la main)
src/app.html      moteur (HTML, CSS, JS) repris de MaisDot
src/app28.js      contenu APP-28 : modules, quiz, gabarits, sigles
src/demo.js       exemple VIENNE transposé
src/i18n.js, src/i18n/en.json   traduction anglaise
docs/SOURCES.md   source et points à revérifier
tests/test_app.js  test de fumée (Playwright, Node)
```

Pour reconstruire : `python3 build.py`. Pour tester : `node tests/test_app.js`.

## Feuille de route

- [x] v1.0 : vocabulaire, fondements, 7 étapes, temps contraint, matrice de décision APP-28, examen blanc, exemple VIENNE, français et anglais
- [ ] Vérification sur l’exemplaire officiel d’APP-28
- [ ] Modules hors cycle (comme « Normes et délais » et « Appropriation et conduite » de MaisDot), annexes D à F d’APP-28 (gabarits, facteurs, techniques de gain de temps)
- [ ] Traduction de l’exemple VIENNE
