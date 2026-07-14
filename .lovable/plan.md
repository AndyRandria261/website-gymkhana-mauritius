# Gap analysis - MGC refonte

Trois colonnes : **site actuel (mgc.mu)** · **V1 déjà construite ici** · **exigence du CDC**. Objectif : voir ce qui est déjà réglé et ce qui reste.

## 1. Ce que la V1 corrige déjà par rapport à mgc.mu

| Domaine | mgc.mu aujourd'hui | V1 Lovable |
|---|---|---|
| Identité visuelle | Site abandonné, esthétique datée, Lorem ipsum en production | Design system "Tropical premium" verrouillé (pine/gold/cream/ink, DM Serif + Inter), tokens sémantiques |
| Architecture d'information | 10 items plats, offre cachée en footer | Nav en 5 groupes (The Club / Golf / Sports / Dining / Venue Hire) + CTA permanent "Join the Club" |
| Arborescence CDC | 4 pages vides, doublons Histoire/Milestones | 22 routes couvrant l'arborescence §4.1 du CDC |
| Parcours conversion | Aucun formulaire, aucun tarif adhésion | Page Membership avec 3 catégories, stepper "How to join", formulaire d'enquête ; formulaires UI sur Contact, Golf, Venue Hire |
| Golf (page à plus forte valeur) | Prix illisibles, "Rs Rs 35 000", image cassée | Page Golf avec héros, StatChips, tableau green fees propre, CTA visiteur |
| Histoire | Deux pages redondantes, timeline dupliquée | Une seule page timeline consolidée |
| Contact | Fausse carte Google (PNG) | Carte OSM interactive + formulaire à sujets |
| SEO | Titre identique partout, metas vides | Title/description uniques par route, og:image, sitemap.xml, robots.txt |
| Accessibilité | Alt vides, liens `javascript:;` | Structure sémantique, focus visibles, contrastes OK, `prefers-reduced-motion` respecté |
| États vides | Pages blanches | Composant `SimplePage` avec message daté sur toutes les pages sans contenu réel |
| Responsive | Contenus critiques en image | Mobile-first, drawer nav, images optimisées |

## 2. Ce qu'il reste à faire - écarts vs CDC

Trois catégories : (A) pages à approfondir, (B) fonctionnalités systémiques manquantes, (C) hors-périmètre V1 assumé.

### A. Pages construites mais encore minces (SimplePage stub)

À enrichir avec le contenu détaillé §5 du CDC :

- **`/sports/tennis`** - mettre en avant "seuls courts en gazon de l'océan Indien" (différenciateur SEO majeur), photos, coaching, tarifs
- **`/sports/squash`, `/sports/fitness`, `/sports/pool`** - équipements, horaires, tarifs
- **`/dining`** - split réel Brasserie / Veranda / Bar + composant "Menu du jour" HTML daté (F3 du CDC, doit devenir un contenu vivant, pas un état vide permanent)
- **`/events`** - liste filtrable + fiches événement avec ICS "Add to calendar" (F4)
- **News/Actualités** - route `/news` pas encore créée ; listing paginé + article détail (F5)
- **`/gallery`** - actuellement une seule grille ; le CDC demande albums → pages d'album avec lightbox (F6)
- **`/the-club/committee`** - page marquée "à retirer de la nav tant que pas de données" par le CDC ; décider : cacher ou peupler
- **`/the-club/careers`** - JobCard + mailto pré-rempli
- **`/the-club/tenders`** - tableau AO + PDF, état vide daté
- **`/the-club/rules`** - résumé langage clair + DocumentCard PDF
- **`/venue-hire`** - décomposer en fiches Conference Room / Multipurpose Hall / FootFive avec capacités, photos, formulaire devis
- **`/membership/reciprocal`** - grille des 26 clubs affiliés, filtre par pays

### B. Fonctionnalités systémiques absentes (aucune implémentation V1)

Toutes marquées **Must** au §9 du CDC :

- **F1 SSR / indexabilité** - TanStack Start le supporte, à activer/vérifier
- **F2 Formulaires réels** - actuellement UI-only, aucune soumission. Nécessite backend (Lovable Cloud) : validation, honeypot, rate-limit, email de notif + accusé de réception, stockage
- **F3 Menu du jour daté** avec état périmé automatique
- **F4 Événements** - CRUD + ICS
- **F5 News** - CRUD articles
- **F6 Galerie** - upload, alt obligatoire, lightbox accessible
- **F8 Bibliothèque PDF** avec version/date
- **F9 Clubs affiliés** - collection filtrable
- **F10 Appels d'offres** - expiration automatique
- **F12 Bandeau cookies conforme** - accepter/refuser/préférences
- **CMS §10** - modèle de contenu administrable (cause racine de l'échec actuel selon le CDC)

Puis les **Should/Could** : recherche interne (F13), newsletter (F14), upload CV (F15), bilinguisme FR/EN (F16).

### C. Choix V1 assumés (rappel)

- Espace membre authentifié (F17) et réservation temps réel (F18) : **Won't V1** dans le CDC lui-même.
- Bilinguisme FR/EN : architecture i18n prête, contenu EN uniquement - conforme au périmètre décidé.

## 3. Ce que ce résumé N'est PAS

Pas un plan d'implémentation. C'est un état des lieux. Les prochaines vagues logiques (à décider ensemble) :

1. **Vague contenu** - enrichir les 6-7 SimplePage prioritaires (Tennis en tête, différenciateur SEO), toujours en frontend statique.
2. **Vague backend** - activer Lovable Cloud pour brancher les formulaires (F2), le menu du jour (F3), les événements (F4), les news (F5).
3. **Vague CMS** - modèle §10 pour rendre le club autonome (l'objectif O3 du CDC, cause racine de l'abandon actuel).
4. **Vague conformité** - bandeau cookies (F12), audit WCAG 2.2 AA, Core Web Vitals.

Dis-moi laquelle tu veux que je détaille en plan d'implémentation, ou si tu préfères qu'on attaque directement une page prioritaire (ma recommandation : Tennis - c'est le 2e différenciateur signature du club et il est encore en stub).
