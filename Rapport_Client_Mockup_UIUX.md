# Mauritius Gymkhana Club — Refonte digitale

## Rapport de présentation — Maquette UI/UX & feuille de route Back-Office

**Date :** 15 juillet 2026
**Préparé par :** Visylo Consulting
**Statut du projet :** Maquette front-end (mockup) livrée — phase back-office à cadrer

---

## 1. Contexte et objectif de ce rapport

Le site actuel du Mauritius Gymkhana Club (mgc.mu) présente un état d'abandon opérationnel : contenu factice (*Lorem ipsum*) en production, menu du jour périmé, quatre pages vides, liens cassés, aucun parcours permettant de devenir membre, réserver une partie de golf ou louer une salle.

Ce rapport présente :

1. **Ce qui a été réalisé** sur la maquette (mockup) de refonte UI/UX front-end.
2. **Ce qu'il reste à développer côté back-office** (contenu administrable, formulaires fonctionnels, CMS) pour rendre le site réellement exploitable par les équipes du club.

Il s'agit à ce stade d'un **prototype visuel et structurel** : les pages, la navigation et le design sont fonctionnels à l'écran, mais aucun contenu n'est encore branché à une base de données, et les formulaires ne soumettent pas encore de données réelles.

---

## 2. Ce qui a été fait — Refonte UI/UX front-end

### 2.1 Identité visuelle

Un nouveau design system « Tropical Premium » a été défini et appliqué à l'ensemble du site, en rupture avec l'aspect daté du site actuel :

| Élément | Choix |
|---|---|
| Couleur principale | Vert pin profond (`#1B4332`) — évoque le gazon, l'héritage colonial britannique du club |
| Couleur d'accent | Or chaleureux (`#E8B04B`) — utilisé avec parcimonie (CTA, filets, badges) |
| Fond | Crème chaud (`#FDFBF5`) — plus doux qu'un blanc pur, évite l'effet « écran froid » |
| Texte | Encre chaude quasi-noire (`#2D2A26`) |
| Typographie de titres | DM Serif Display — registre éditorial, sérieux, en cohérence avec un club fondé en 1849 |
| Typographie courante | Inter — lisible, neutre, optimisée pour les interfaces |

Principes appliqués : sobriété premium (pas de glassmorphism, pas de carrousel autoplay), grandes respirations, micro-interactions discrètes, mobile-first.

### 2.2 Nouvelle architecture du site

| | Site actuel (mgc.mu) | Nouvelle maquette |
|---|---|---|
| Navigation | 10 items à plat, offre (golf, tennis, adhésion) reléguée en pied de page | Navigation organisée par intention (Le Club, Golf, Sports, Restauration, Location de salles) + CTA permanent « Devenir membre » |
| Pages | 4 pages vides, doublons (Histoire/Milestones) | **22 gabarits de page** couvrant l'intégralité de l'arborescence cible |
| Parcours de conversion | Aucun | Formulaires (adhésion, contact, golf visiteurs, devis salles) intégrés à l'interface |

### 2.3 Pages livrées (maquette visuelle)

- **Accueil** — présentation, mise en avant des sports, actualités et vie du club
- **Le Club** — Histoire (timeline consolidée 1844→aujourd'hui), Comité exécutif, Carrières, Appels d'offres, Règlements
- **Sports** — hub + pages dédiées Golf (la plus aboutie : héros, statistiques du parcours, tableau de green fees, formulaire visiteur), Tennis, Squash, Fitness, Piscine
- **Restauration** — présentation des espaces (restaurant, terrasse, bar)
- **Événements** et **Actualités**
- **Adhésion** — catégories, parcours « Comment adhérer », formulaire de demande, et page dédiée aux 26 clubs affiliés (réciprocité)
- **Galerie** — index des albums + page d'album individuelle
- **Location de salles** (Conference Room, Multipurpose Hall, FootFive)
- **Contact** — carte interactive, formulaire à sujets

### 2.4 Autres corrections déjà intégrées à la maquette

- Suppression des défauts visuels constatés dans l'audit (prix illisibles type « Rs Rs 35 000 », image de carte cassée, liens `javascript:;`)
- Un composant d'**état vide** normalisé (au lieu d'une page blanche) sur les sections sans contenu
- Bases SEO techniques : titres/meta-descriptions par page, `sitemap.xml`, `robots.txt`
- Bases d'accessibilité : structure sémantique, focus clavier visible, contrastes conformes, respect de `prefers-reduced-motion`

### 2.5 Ce que cette maquette ne couvre pas encore

Important pour cadrer les attentes du client : à ce stade, la maquette est un **front-end statique**.

- Les formulaires (adhésion, contact, devis, golf visiteur) sont visuellement fonctionnels mais **ne soumettent rien** (pas d'e-mail de confirmation, pas de stockage).
- Le contenu de certaines pages (Comité exécutif, Appels d'offres, Carrières, Location de salles) reste indicatif, en attente de données réelles du club (photos, tarifs, textes définitifs).
- Aucun outil ne permet encore au personnel du club de modifier un contenu sans passer par un développeur — **c'est précisément la cause racine de l'abandon du site actuel**, et l'objet de la phase suivante.

---

## 3. Ce qu'il reste à développer — Fonctionnalités Back-Office

L'objectif de cette phase est de rendre le site **autonome pour le personnel du club** : plus aucune mise à jour de contenu ne doit nécessiter l'intervention d'un développeur.

### 3.1 Fonctionnalités indispensables (Must-have)

| # | Fonctionnalité | Description | Bénéficiaire côté club |
|---|---|---|---|
| 1 | **CMS avec rôles et workflow** | Interface d'administration : brouillon → relecture → publication, avec rôles (Administrateur, Éditeur, Contributeur) | Toute l'équipe |
| 2 | **Formulaires fonctionnels** | Adhésion, contact, golf visiteurs, devis salles : validation, anti-spam, e-mail de confirmation au demandeur + notification au club, stockage des demandes | Secrétariat, F&B, Golf |
| 3 | **Menu du jour daté** | Saisie hebdomadaire par l'équipe F&B, bascule automatique en « menu en cours de mise à jour » passé un délai | Restauration |
| 4 | **Gestion des événements** | Création/édition, catégories, filtres, export « Ajouter à mon agenda » (ICS) | Éditeur |
| 5 | **Gestion des actualités** | Articles, pièces jointes PDF, liste paginée | Éditeur |
| 6 | **Gestion de la galerie photo** | Upload, recadrage, texte alternatif obligatoire (accessibilité) | Éditeur |
| 7 | **Bibliothèque de documents** | Règlements, cartes de menus, dossiers d'appels d'offres, newsletters — avec version et date | Éditeur |
| 8 | **Clubs affiliés** | Liste filtrable par pays, validation des liens sortants | Éditeur |
| 9 | **Appels d'offres** | Publication avec date limite et **retrait automatique** à échéance | Éditeur |
| 10 | **Bandeau cookies conforme** | Accepter / Refuser / Préférences | Conformité légale |

### 3.2 Fonctionnalités souhaitables (Should-have)

- Recherche interne (pages, actualités, événements)
- Inscription à une newsletter

### 3.3 Fonctionnalités envisageables (Could-have)

- Candidature en ligne avec upload de CV
- Site bilingue Français/Anglais

### 3.4 Hors périmètre de cette phase (assumé, à réévaluer plus tard)

- **Espace membre authentifié** (comptes, relevés) — nécessite une intégration avec le système de gestion interne du club, dont l'existence reste à vérifier avec le client.
- **Réservation en ligne en temps réel** (départs de golf, courts de tennis) — même dépendance. Les formulaires de demande (point 2 ci-dessus) couvrent l'essentiel de la valeur en attendant.

---

## 4. Prochaines étapes suggérées

1. **Validation du mockup** par le client (ce document + démonstration de la maquette).
2. **Collecte des données manquantes** : tarifs d'adhésion, composition du comité exécutif, textes et photos des salles, procédure d'accès réciproque pour les clubs affiliés.
3. **Mise en place du back-office** : activation du CMS et des formulaires fonctionnels (section 3.1).
4. **Recette et conformité** : test des parcours utilisateurs, audit d'accessibilité, cookies.
5. **Mise en production.**

---

*Document préparé pour présentation client — Visylo Consulting.*
