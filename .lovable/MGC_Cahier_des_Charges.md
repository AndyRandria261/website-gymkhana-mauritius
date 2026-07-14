# CAHIER DES CHARGES - Refonte du site web du Mauritius Gymkhana Club

**Version :** 1.0 - 13 juillet 2026
**Statut :** Projet de référence, en attente de validation client
**Source :** Audit UI/UX complet du site mgc.mu (document « MGC_UIUX_Audit_Redesign_Spec.md », juillet 2026)
**Convention :** Les informations absentes de l'audit sont marquées **[ACC]** = « À confirmer avec le client ». Elles sont bloquantes lorsqu'indiqué.

---

## Table des matières

1. Présentation du projet
2. Analyse de l'existant (synthèse)
3. Vision du nouveau site
4. Architecture du site & parcours
5. Description complète de chaque page
6. Design System
7. UX - Parcours utilisateurs & User Flows
8. Responsive Design
9. Fonctionnalités
10. CMS - Modèle de contenu administrable
11. SEO
12. Accessibilité (WCAG 2.2 AA)
13. Performance
14. Technologies recommandées
15. Roadmap
16. Estimation
17. Annexes (wireframes textuels, user stories, backlog MoSCoW, composants)

---

# 1. Présentation du projet

## 1.1 Contexte

Le Mauritius Gymkhana Club (MGC), fondé en 1849 à Vacoas (Maurice), revendique le plus ancien parcours de golf de l'hémisphère sud (golf pratiqué depuis 1844) et les seuls courts de tennis en gazon de l'océan Indien. Son site actuel (mgc.mu) est un site vitrine construit par un prestataire local, dont l'audit de juillet 2026 a révélé un état d'abandon opérationnel : contenu factice (*Lorem ipsum*) en production, menu du jour périmé de 11 mois, dernière actualité datant de septembre 2023, quatre pages vides, liens cassés, et absence totale de parcours de conversion (adhésion, réservation).

Le projet consiste en une **refonte complète** : nouvelle architecture d'information, nouveau design premium fidèle à l'identité historique du club, nouveau socle technique avec CMS, et - condition de succès non technique - mise en place d'une **gouvernance éditoriale** côté club.

## 1.2 Objectifs de la refonte

| # | Objectif | Justification (valeur) |
|---|---|---|
| O1 | Créer des parcours de conversion mesurables (adhésion, green fees visiteurs, location de salles) | Le site actuel ne permet à aucune des audiences génératrices de revenus d'agir. C'est le manque à gagner principal. |
| O2 | Restaurer la crédibilité de la marque (design premium + contenu exact et à jour) | Un club « premium » avec du Lorem ipsum en ligne détruit sa propre promesse. La cohérence marque/expérience est la base de la confiance. |
| O3 | Rendre le contenu administrable par le personnel du club sans compétence technique | Cause racine de l'échec actuel : le contenu exige un prestataire pour chaque mise à jour. Un CMS avec rôles et workflows supprime ce goulot. |
| O4 | Capter le trafic de recherche (SEO) sur les requêtes à valeur : « green fees Mauritius », « golf club Mauritius », « grass tennis courts Mauritius » | Aujourd'hui, toutes les pages partagent le même titre et des metas vides : le club est invisible sur ses propres différenciateurs. |
| O5 | Conformité : accessibilité WCAG 2.2 AA, consentement cookies conforme, mentions légales | Réduction du risque juridique et élargissement de l'audience (membres seniors nombreux). |

## 1.3 Problèmes actuels (rappel synthétique - détail en §2)

Contenu abandonné et factice ; aucune conversion possible ; navigation qui masque l'offre réelle ; défauts de fabrication visibles (liens cassés, encodage corrompu, hiérarchies de prix inversées, fausse carte Google) ; fondations SEO/accessibilité absentes ; dépendance au JavaScript pour des contenus essentiels.

## 1.4 Public cible

1. **Membres actuels** (usage récurrent : menu du jour, événements, règlements, comptes).
2. **Prospects membres** (résidents mauriciens et expatriés cherchant un club sportif/social).
3. **Golfeurs visiteurs / touristes** (green fees à la journée, forfaits annuels visiteurs).
4. **Entreprises** (location salle de conférence, salle polyvalente, événements).
5. **Candidats à l'emploi**.
6. **Fournisseurs** (appels d'offres).
7. **Membres de clubs affiliés** (26 clubs réciproques, majoritairement en Inde) en visite à Maurice.

## 1.5 Personas

| Persona | Profil | Objectifs sur le site | Frustrations actuelles |
|---|---|---|---|
| **P1 - « Ravi », membre senior, 63 ans** | Membre depuis 30 ans, golfeur, consulte sur mobile | Menu du jour, événements, résultats de compétitions | Menu périmé, page événements vide, PDF illisibles sur mobile |
| **P2 - « Émilie », expatriée, 38 ans** | Cadre récemment installée à Vacoas, cherche club famille (tennis, piscine, restaurant) | Comprendre les catégories d'adhésion, les tarifs, comment postuler | Aucun tarif d'adhésion publié, pas de formulaire, jargon réglementaire |
| **P3 - « Mark », golfeur touriste, 55 ans** | Britannique, 2 semaines à Maurice, cherche un parcours historique | Green fees visiteurs, réservation d'un départ, location de matériel | Tarifs présents mais illisibles, aucun moyen de réserver, image cassée |
| **P4 - « Priya », office manager, 30 ans** | Organise un séminaire de 40 personnes | Capacités des salles, photos, tarifs, demande de devis | Texte Lorem ipsum sur la salle de conférence, aucun CTA |
| **P5 - « Jean », candidat F&B, 26 ans** | Cherche un poste en restauration | Voir les postes ouverts, postuler en ligne | Aucune offre listée, email affiché avec un défaut de formatage |
| **P6 - « Anand », membre du Delhi Gymkhana** | En vacances à Maurice, droit d'accès réciproque | Vérifier l'affiliation, la procédure d'accès, contacter le club | Procédure réciproque non documentée, liens cassés |

## 1.6 Objectifs business & KPIs

Hypothèse : le site actuel n'a vraisemblablement aucun dispositif de mesure **[ACC - existence d'un compte Analytics]**. Les valeurs de référence (baseline) devront être établies au lancement ; les cibles ci-dessous sont des ordres de grandeur à 12 mois, à recalibrer après 3 mois de mesure.

| KPI | Définition | Cible indicative (12 mois post-lancement) |
|---|---|---|
| Demandes d'adhésion qualifiées | Soumissions du formulaire « Devenir membre » | ≥ 8/mois |
| Demandes green fees visiteurs | Soumissions du formulaire « Planifier une partie » | ≥ 15/mois (saisonnalité touristique) |
| Demandes de location de salles | Formulaire « Événements & séminaires » | ≥ 4/mois |
| Fraîcheur éditoriale | Âge du « Menu du jour » ; délai de publication des événements | Menu ≤ 7 jours ; 100 % des événements publiés ≥ 7 j avant |
| Visibilité SEO | Position sur « green fees Mauritius », « golf Vacoas », « Mauritius Gymkhana Club » | Top 3 marque ; top 10 requêtes génériques ciblées |
| Qualité technique | Core Web Vitals (LCP, INP, CLS) sur mobile | LCP < 2,5 s ; INP < 200 ms ; CLS < 0,1 |
| Accessibilité | Audit WCAG 2.2 AA | 0 non-conformité bloquante |
| Autonomie éditoriale | % de mises à jour de contenu réalisées sans prestataire | ≥ 95 % |

---

# 2. Analyse de l'existant (synthèse de l'audit)

> Cette section transforme les 17 constats de l'audit en 9 familles de problèmes, chacune reformulée en **exigence** pour la refonte.

| Domaine | Diagnostic synthétique | Exigence dérivée |
|---|---|---|
| **Navigation / IA** | Le menu principal (10 items plats) expose l'administratif (appels d'offres, règlements) et cache l'offre (golf, tennis, adhésion, restauration, accessibles uniquement en pied de page). Liens de footer erronés ou dupliqués. | EX-NAV : navigation par tâches en 6 groupes max + CTA permanent « Devenir membre » ; zéro lien mort ; cibles de liens vérifiées en recette. |
| **UX / Conversion** | Aucun parcours d'action : pas de tarifs d'adhésion, pas de formulaire d'adhésion, pas de réservation/demande pour visiteurs, carte Google factice (PNG statique). | EX-CONV : chaque audience dispose d'un CTA et d'un formulaire dédié avec accusé de réception ; carte interactive avec itinéraire. |
| **UI / Fabrication** | Hiérarchies visuelles incohérentes (prix au-dessus des libellés), artefacts de balisage visibles, images aux noms par défaut, doublons de timeline, glyphes parasites. | EX-UI : Design System unique avec composants normés (tables de prix, timeline, cards) ; revue de contenu systématique avant publication. |
| **Contenu** | Lorem ipsum en production ; menu du jour périmé de 11 mois ; 1 actualité en 3 ans ; 4 pages vides ; documents critiques en PDF/JPG bruts. | EX-CONT : CMS avec états vides élégants, dates de validité automatiques (menu), workflow de publication, propriétaire éditorial nommé côté club **[ACC]**. |
| **SEO** | Titre identique sur toutes les pages, metas vides, contenus clés non indexables (JS-only, images, PDF). | EX-SEO : titres/metas uniques générés par le CMS, contenu HTML server-rendered, données structurées, sitemap. |
| **Accessibilité** | Alt vides sur des images de contenu ; liens `javascript:;` ; contenus uniquement en image ; le reste non mesurable sans rendu. | EX-A11Y : conformité WCAG 2.2 AA vérifiée par audit outillé + manuel en recette. |
| **Performance** | Non mesurable dans l'audit (pas de rendu). Signaux défavorables : images non optimisées (exports bruts d'appareil photo). | EX-PERF : budget de performance contraignant (cf. §13), mesuré en CI. |
| **Responsive** | Viewport déclaré, hamburger présent ; comportement réel non vérifié dans l'audit. Contenus en image (menus) inutilisables sur mobile par nature. | EX-RESP : conception mobile-first, contenus critiques en HTML natif, tests sur appareils réels. |
| **Parcours utilisateur** | Chaque persona rencontre une impasse (cf. §1.5). | EX-FLOW : les 7 parcours de §7 doivent aboutir sans impasse ; testés en recette par scénarios. |

**Constat transversal (cause racine) :** l'échec du site actuel est d'abord **organisationnel** (aucun processus de mise à jour), ensuite seulement technique et esthétique. La refonte doit livrer un outil *et* un processus. Sans engagement du club sur la gouvernance éditoriale (rôle, cadence, responsable), les objectifs O2 et O4 ne seront pas atteints - ce point doit figurer au contrat.

---

# 3. Vision du nouveau site

## 3.1 Énoncé de vision

> « Le site du plus ancien club de golf de l'hémisphère sud doit se vivre comme le club lui-même : un héritage de 180 ans, servi avec la précision d'aujourd'hui. »

Le nouveau mgc.mu est un site **éditorial et photographique**, calme et généreux en espace, qui raconte l'héritage (1844–aujourd'hui) tout en rendant chaque action simple : rejoindre le club, réserver une partie, réserver une salle, consulter le menu. Il transmet **prestige, héritage, élégance, modernité, sport et histoire** - sans effets de mode.

## 3.2 Principes directeurs

1. **Heritage first** : la date « Est. 1849 » et les faits historiques vérifiés sont des éléments d'interface, pas des notes de bas de page.
2. **La photographie porte le prestige** : grandes images du parcours, des courts en gazon, du clubhouse. Le texte reste sobre. **[ACC - banque d'images approuvée ; une séance photo professionnelle est fortement recommandée, les images actuelles étant hétérogènes]**.
3. **Sobriété premium** : pas de glassmorphism, pas de parallaxe lourde, pas de carrousels autoplay. Micro-interactions discrètes (150–250 ms). Le luxe, en 2026, c'est la retenue et la vitesse.
4. **Honnêteté des états** : une section sans contenu ne s'affiche pas, ou affiche un état vide daté (« Aucun appel d'offres en cours - mis à jour le… »). Plus jamais de page blanche.
5. **Mobile d'abord** : les usages membres (menu du jour, événements) sont majoritairement mobiles.

## 3.3 Références d'inspiration (catégories)

- **Golf clubs historiques** : sites des clubs de type « Royal & Ancient » - typographie serif institutionnelle, photographie de parcours, pages green fees claires.
- **Country clubs / private members' clubs** : structuration adhésion (catégories, étapes, FAQ), ton exclusif mais accueillant.
- **Resorts et hôtels haut de gamme** : héros pleine page, rythme éditorial image/texte alterné, formulaires de demande soignés.
- **Clubs de tennis historiques** : mise en valeur du gazon comme signature (pertinent : seuls courts en gazon de l'océan Indien).

*Note de méthode : s'inspirer des patterns (hiérarchie, parcours, densité), jamais copier un design existant.*

---

# 4. Architecture du site & parcours

## 4.1 Arborescence cible

```
/                           Accueil
/le-club                    Le Club (hub)
  /le-club/histoire           Histoire & Milestones (fusion About + Milestones)
  /le-club/comite             Executive Committee            [ACC - données]
  /le-club/carrieres          Carrières (offres + candidature)
  /le-club/appels-doffres     Tender Bids (avec état vide daté)
  /le-club/reglements         Rules & Bye-Laws (page + PDF téléchargeable)
/sports                     Sports (hub)
  /sports/golf                Golf (histoire, parcours, green fees, coaching, matériel)
  /sports/tennis              Tennis
  /sports/squash              Squash
  /sports/fitness             Fitness Centre
  /sports/piscine             Swimming Pool
/restauration               Dining (hub : restaurants & bars)
  /restauration/menu-du-jour  Menu du jour (HTML, daté, état périmé auto)
  /restauration/cartes        Menu Cards (Pizza, Restaurant, Vins, Deck)
/evenements                 Events (liste filtrable + fiches)
/actualites                 News (liste + articles)
/adhesion                   Membership (catégories, tarifs [ACC], comment adhérer, FAQ)
  /adhesion/clubs-affilies    Affiliated Clubs (26 fiches, filtre pays)
/galerie                    Gallery (albums → pages d'album avec lightbox)
/salles-et-evenements       Venue Hire (Conference Room, Multipurpose Hall, FootFive) - B2B
/contact                    Contact (carte interactive, horaires [ACC], formulaire à sujets)
/mentions-legales, /confidentialite, /plan-du-site
```

**Décisions d'architecture à défendre :**
- **Fusion Histoire + Milestones** : deux pages actuelles racontent la même chose ; une seule page timeline riche vaut mieux que deux pages minces.
- **Création d'un hub B2B « Salles & Événements »** : la salle de conférence et la salle polyvalente sont aujourd'hui des onglets perdus en bas de page d'accueil, alors qu'il s'agit d'une source de revenus (persona P4).
- **Adhésion promue au premier niveau + CTA global** : c'est l'objectif business n°1.
- **Bilinguisme FR/EN [ACC - décision client]** : le site actuel est en anglais avec des intitulés français (« Menu du jour »). Le public visé (membres locaux + touristes) justifie d'étudier un site bilingue ; coût significatif (cf. §16). Par défaut, ce CDC spécifie un site **anglophone** avec architecture préparée pour l'i18n.

## 4.2 Parcours utilisateurs principaux (résumé - détail en §7)

| Parcours | Entrée | Chemin nominal | Sortie (conversion) |
|---|---|---|---|
| Devenir membre | Accueil / SEO / CTA global | Adhésion → catégories → tarifs → « Comment adhérer » → formulaire | Demande d'adhésion envoyée + email de confirmation |
| Golfeur visiteur | SEO « green fees Mauritius » | Golf → onglet Visiteurs → tarifs → formulaire « Planifier une partie » | Demande de départ envoyée |
| Membre au quotidien | Accès direct / favori mobile | Menu du jour ; Événements ; Actualités | Information consommée (< 30 s) |
| Location de salle | Accueil → Salles & Événements | Fiche salle → capacités/photos → formulaire devis | Demande de devis envoyée |
| Candidat | Carrières | Offres → fiche → candidature (email ou formulaire) | Candidature envoyée |
| Fournisseur | Appels d'offres | Liste (ou état vide daté) → PDF | Téléchargement dossier |
| Membre réciproque | Clubs affiliés | Recherche son club → procédure d'accès [ACC] → contact | Demande envoyée |

---

# 5. Description complète de chaque page

> Format : fiche normalisée. Les champs Animations, Responsive, SEO et Accessibilité appliquent par défaut les règles globales des §6, §8, §11, §12 ; seules les spécificités sont notées ici.

## 5.1 Accueil (`/`)

- **Objectif :** identité + orientation en 3 secondes ; router chaque persona vers son parcours.
- **Utilisateurs :** tous.
- **Sections (ordre) :** 1. Héros ; 2. Bande héritage (1844→1996) ; 3. Grille Sports (5 cards) ; 4. Vitrine Salles & Restauration (sections alternées) ; 5. « Club Life » (3 dernières actus/événements, auto-masqué si vide) ; 6. Teaser Galerie (5 albums) ; 7. Bandeau CTA adhésion ; 8. Footer.
- **Composants :** Hero, FactBand, SportCard ×5, SplitSection ×3–5, NewsCard ×3, AlbumCard ×5, CTABanner.
- **Contenu :** H1 « The oldest golf club in the Southern Hemisphere » ; overline « EST. 1849 · VACOAS, MAURITIUS » ; blurbs sports repris de l'audit (corrigés) ; textes Conference Room et FootFive **[ACC - à rédiger, actuellement Lorem ipsum/absent]**.
- **CTA :** primaire « Become a Member » ; secondaire « Visitor Green Fees » ; tertiaires par section.
- **Interactions :** hover-lift cards ; révélation au scroll (une fois, 200 ms) ; FactBand → tap révèle le fait, lien vers Histoire.
- **Mobile :** héros 70svh, CTA empilés pleine largeur ; FactBand en scroll-snap horizontal ; grilles 1 colonne.
- **Desktop :** héros 92vh ; grille sports 5 colonnes ≥1280 px.
- **SEO spécifique :** title « Mauritius Gymkhana Club - Golf, Tennis & Club Life since 1849 » ; schema `SportsClub`/`LocalBusiness`.
- **A11y spécifique :** H1 unique ; contraste texte/héros garanti par scrim ≥ 4,5:1 ; carrousel interdit.

## 5.2 Le Club - Histoire (`/le-club/histoire`)

- **Objectif :** faire de l'héritage un argument d'adhésion.
- **Sections :** intro (reprend le texte « The Club: An Overview ») ; timeline verticale dédupliquée (1834–49, 1844, 1849, 1849–1976, 1922, 1935, années 1940, 1976 ×1 consolidé, 1991, 1996, + entrées post-1996 **[ACC]**) ; galerie « Club Evolution » intégrée ; CTA adhésion.
- **Composants :** PageHero, Timeline (entrées alternées, photo optionnelle), CTABanner.
- **Interactions :** révélation progressive des entrées au scroll ; ancres par décennie.
- **SEO :** cible « history Mauritius Gymkhana Club », « oldest golf course southern hemisphere ».

## 5.3 Le Club - Executive Committee (`/le-club/comite`)

- **Objectif :** transparence de gouvernance (signal de confiance pour un club associatif).
- **Sections :** intro courte ; grille PersonCard (photo, nom, fonction, éventuellement portefeuille) **[ACC - la totalité des données ; page actuellement vide]** ; lien règlements.
- **État vide interdit :** la page ne sera mise en ligne qu'avec les données ; sinon retirée de la nav (décision de lancement).

## 5.4 Le Club - Carrières (`/le-club/carrieres`)

- **Sections :** intro (texte existant corrigé - email `hr_officer@mgc.mu` réparé) ; liste des offres (JobCard : intitulé, département, type, date limite) OU état vide « No open positions - last updated {date} » ; procédure de candidature (3 canaux existants) ; liste des pièces requises.
- **CTA :** « Apply by email » (mailto pré-rempli avec l'intitulé du poste) ; option formulaire avec upload CV (phase 2, cf. §9).

## 5.5 Le Club - Appels d'offres (`/le-club/appels-doffres`)

- **Sections :** tableau (Référence, Intitulé, Date limite, Dossier PDF) ; état vide daté obligatoire.
- **CMS :** collection Tenders avec date d'expiration → retrait automatique de la liste à échéance.

## 5.6 Le Club - Règlements (`/le-club/reglements`)

- **Sections :** résumé en langage clair des points les plus consultés (invités, tenue, comptes - repris du contenu Membership actuel) ; DocumentCard « Rules & Bye-Laws (PDF, {taille}) » ; date de version du PDF.

## 5.7 Sports - Golf (`/sports/golf`) - page à plus forte valeur commerciale

- **Objectif :** convertir le golfeur visiteur ; informer le membre.
- **Sections :** 1. PageHero + StatChips (Par 68 · 18 Holes · 5.6 km · Est. 1844) ; 2. Histoire (verbatim audité) ; 3. Le parcours (description trous ; scorecard/plan **[ACC - documents]**) ; 4. Green fees en onglets [Members | Juniors | Visitors | Guests | Coaching | Equipment & Caddies] - tables 2 colonnes, libellé à gauche, prix à droite, chiffres tabulaires ; correction « Rs Rs 35,000 » → « Rs 35,000 » ; 5. Bloc coaching ; 6. CTA visiteur « Planning a round in Mauritius? » + formulaire (nom, email, date souhaitée, nb joueurs, handicap facultatif, message) ; 7. Contacts (Caddy Master 698 6302).
- **Interactions :** sous-navigation sticky (Overview · Course · Fees · Coaching · Contact) ; onglets tarifs accessibles clavier.
- **SEO :** cible « green fees Mauritius », « golf Vacoas » ; schema `GolfCourse` + `PriceSpecification`.
- **Mobile :** onglets tarifs → accordéon ; tables scrollables sans casse.

## 5.8 Sports - Tennis / Squash / Fitness / Piscine (gabarit commun)

- **Sections :** PageHero ; intro (copies existantes verbatim, corrigées - artefact « Â » fitness) ; FactRow (tennis : « 8 grass courts · laid in the 1940s · only grass courts in the Indian Ocean ») ; table tarifs normalisée (tennis : Yearly Rs 9,000 / Monthly Rs 900 / Hourly Rs 100 / Guest Rs 300 / Non-member yearly Rs 20,000) ; bloc réservation/contact (squash : réservation 1 semaine à l'avance) ; bande 6 photos de l'album correspondant.
- **Contenus squash/fitness/piscine détaillés :** **[ACC - pages actuelles non entièrement auditées ; copie à valider]**.

## 5.9 Restauration (`/restauration`, `/menu-du-jour`, `/cartes`)

- **Hub :** présentation des espaces (Main Restaurant, Swimming Pool Terrace, Sport Bar & Leisure, Bar & Lounge - cités dans le contenu actuel) ; contact F&B (660 1845 / resto@mgc.mu).
- **Menu du jour :** contenu HTML structuré (entrée/plat/dessert par jour) saisi au CMS avec **dates de validité obligatoires** ; à échéance +1 jour : bascule automatique sur l'état « This week's menu is being updated » ; option d'affichage de l'image du menu en complément, jamais en remplacement.
- **Cartes :** 4 DocumentCards (Pizza, Restaurant, Wine List, Deck) avec vraies URL profondes (PDF ou pages), poids affiché - suppression des liens `javascript:;`.

## 5.10 Événements (`/evenements`) & Actualités (`/actualites`)

- **Liste :** cards datées, tri antéchronologique, filtres par catégorie (Fitness, Football, Golf, Music, Other - reprises de l'existant), pagination. Rendu **serveur** (indexable), jamais dépendant du JS pour l'affichage initial.
- **Fiche événement :** date/heure, lieu dans le club, description, image, éventuel document ; bouton « Add to calendar » (ICS).
- **Fiche actualité :** article HTML (plus jamais un lien PDF nu comme « Newsletter No. 1 ») ; les newsletters PDF restent téléchargeables en pièce jointe de l'article.
- **États vides :** designés et datés.

## 5.11 Adhésion (`/adhesion`)

- **Objectif :** page de conversion n°1.
- **Sections :** 1. Bandeau d'intro (promesse + photo) ; 2. Catégories (Full, Corporate, Temporary, Honorary, Senior, Member-on-Leave) en cards, résumés en langage clair dérivés des règles existantes ; 3. **Tableau des droits et cotisations [ACC - donnée absente du site, bloquante pour la mise en ligne de la page]** ; 4. « How to join » : stepper 4 étapes **[ACC - procédure exacte ; la page actuelle promet des liens inexistants]** ; 5. FAQ accordéon (Q/R existantes réécrites, références de clauses conservées en note ; typo « the Cub » corrigée) ; 6. Formulaire de demande (prénom, nom, email, téléphone, catégorie visée, parrain éventuel **[ACC - le parrainage est-il requis ?]**, message) ; 7. Lien Règlements.
- **KPI rattaché :** demandes d'adhésion (O1).

## 5.12 Clubs affiliés (`/adhesion/clubs-affilies`)

- **Sections :** intro expliquant la réciprocité + procédure (lettre d'introduction ? **[ACC]**) ; filtres pays (All · India · UK · Singapore · Thailand · Malaysia · Australia · Kenya) ; grille de 26 ClubCards (logo en `object-fit:contain` sur fond blanc, nom, badge pays, adresse, site en **URL absolue corrigée** - au moins 4 liens actuellement cassés -, email, téléphone).
- **Corrections de données :** tirets mojibake ; « Country: London » → United Kingdom ; fiche Indian Gymkhana Club (adresse Bangalore / site .co.uk) **[ACC - à trancher par le club]**.

## 5.13 Galerie (`/galerie` + pages d'album)

- **Index :** 5 AlbumCards avec compteurs (Golf Tournament 33 · Sports 63 · Entertainment & Activities 34 · Memories 33 · Club Evolution 28).
- **Album :** URL propre par album (partageable), grille responsive, lightbox accessible (navigation clavier, bouton fermer, alt obligatoires **[ACC - légendes à fournir ou rédiger]**), lazy-loading.

## 5.14 Salles & Événements privés (`/salles-et-evenements`) - B2B

- **Sections :** intro ; 3 fiches (Conference Room, Multipurpose Hall, FootFive Pitch) : galerie photo, capacité **[ACC]**, équipements **[ACC]**, configurations **[ACC]**, texte **[ACC - Lorem ipsum actuel]** ; formulaire de devis (société, contact, date, effectif, type d'événement, besoins) ; contact direct F&B.
- **KPI rattaché :** demandes de location (O1).

## 5.15 Contact (`/contact`)

- **Sections :** carte Google interactive (remplace le PNG statique ; fallback image liée vers l'itinéraire) ; bloc infos : adresse, téléphone +230 660 1844, secretary@mgc.mu, **horaires [ACC]**, contacts par service (F&B, Caddy Master) ; formulaire à sujet (General / Membership / Golf & Sports / Events & Venue Hire / Careers / Press) routant vers la bonne boîte **[ACC - boîtes de destination]** ; validation inline ; écran de succès ; anti-spam invisible.
- **Suppression :** heading orphelin « Google Map ».

## 5.16 Pages légales

- Mentions légales, politique de confidentialité, politique cookies, plan du site. **Contenus [ACC - informations légales de l'association]**. Bandeau cookies : Accepter / Refuser / Préférences (remplace l'auto-acceptation actuelle).

---

# 6. Design System

> Livrable attendu : bibliothèque Figma + tokens exportés (JSON/CSS variables) + Storybook des composants codés. Palette à valider contre le blason du club **[ACC - charte/blason source]**.

## 6.1 Couleurs (tokens)

| Token | Valeur | Usage | Contraste |
|---|---|---|---|
| `--color-green-900` | #12281D | Footer, fonds sombres | - |
| `--color-green-700` | #1B3A2A | Primaire : boutons, liens actifs, titres sur clair | ≥ 7:1 sur cream |
| `--color-gold-600` | #B98A2F | Accent : CTA primaire, filets, badges - usage parcimonieux | vérifier 3:1 en grands textes ; jamais pour du texte courant sur clair |
| `--color-cream-50` | #F7F4EC | Fond de page | - |
| `--color-surface` | #FFFFFF | Cards, tables | - |
| `--color-ink-900` | #20211F | Texte courant | ≥ 12:1 sur cream |
| `--color-ink-600` | #5A5B57 | Texte secondaire, captions | ≥ 4,5:1 |
| `--color-line` | #E4DFD3 | Bordures, séparateurs | - |
| Sémantiques | success #2E6B3F · error #A63D2F · warning #9A6B1F · info #2F5C7A | Formulaires, alertes | ≥ 4,5:1 sur blanc |

**Dark mode : non retenu en V1.** Justification : audience senior significative, site majoritairement photographique diurne, coût de double thème non justifié par un besoin exprimé. Réévaluable en V2.

## 6.2 Typographie

| Rôle | Police | Repli | Styles |
|---|---|---|---|
| Display/titres | Fraunces (variable) | Georgia, serif | H1 clamp(2.25rem–4.25rem)/1.1 ; H2 clamp(1.75–2.75)/1.15 ; H3 1.375rem/1.3 ; graisses 500–600 |
| Corps/UI | Inter (variable) | system-ui, sans-serif | Body 1.0625rem/1.7 ; small 0.875rem ; boutons 0.9375rem semibold, letter-spacing 0.02em |
| Chiffres tarifs | Inter, `font-variant-numeric: tabular-nums` | - | Alignement décimal des colonnes prix |

Règles : jamais plus de 2 familles ; texte tout-en-capitales limité aux overlines/labels avec `letter-spacing 0.08em` ; longueur de ligne 60–75 caractères.

## 6.3 Espacements, grille, rayons, ombres

- Échelle 4 px : 4·8·12·16·24·32·48·64·96·128. Padding de section : 96 px desktop / 56 px mobile.
- Grille 12 colonnes, gouttière 24 px, conteneur max 1200 px (1320 px pour héros/galeries pleine largeur).
- Rayons : 8 px (boutons, inputs) · 12 px (cards) · 16 px (modales). Ombres : `sm 0 2px 8px rgb(0 0 0/6%)` · `md 0 8px 24px rgb(0 0 0/8%)` - jamais plus lourdes.

## 6.4 Composants (spécification des états)

Chaque composant est livré avec états : **default / hover / focus-visible / active / disabled / loading / error / empty** le cas échéant. Focus visible universel : anneau 2 px `--color-gold-600`, offset 2 px, jamais supprimé.

| Composant | Spécification clé |
|---|---|
| **Boutons** | Primaire : fond gold, texte green-900, hover assombri 8 % + translation −1 px ; Secondaire : contour green-700 ; Tertiaire : lien avec soulignement animé. Hauteurs 44/52 px (min. tactile 44 px). Disabled : 40 % opacité + `cursor:not-allowed`. Loading : spinner inline, largeur stable. |
| **Cards** (Sport, News, Album, Club, Person, Job, Document) | Surface blanche, radius 12, image ratio fixé (3:2 sports, 16:9 news, 1:1 personnes), hover : lift 2–4 px + ombre md + zoom image 1,03 ; toute la card cliquable avec un seul lien accessible. |
| **Inputs & Forms** | Label toujours visible (jamais placeholder-seul) ; aide et erreur sous le champ, erreur = texte + icône + `aria-describedby` ; validation à la perte de focus puis à la soumission ; états success ; champs 52 px ; consentement par checkbox non pré-cochée. |
| **Navigation** | Barre utilitaire (horaires · téléphone · Menu du jour) + barre principale ; transparente sur héros → solide cream au scroll (fond + ombre sm) ; dropdowns ouvrables au clavier (`Escape` ferme) ; item actif souligné gold ; mobile : drawer plein écran, groupes en accordéon, fermeture visible. |
| **Footer** | Fond green-900, texte cream ; 4 colonnes → accordéon mobile ; liens vérifiés (zéro doublon, zéro mauvaise cible). |
| **Hero** | Image pleine largeur + scrim dégradé bas (noir 0→55 %) garantissant 4,5:1 ; texte en bas-gauche ; jamais de carrousel autoplay ; effet Ken Burns optionnel désactivé si `prefers-reduced-motion`. |
| **Tables (tarifs, tenders)** | En-tête green-700/cream ; zébrage lignes cream-50 ; libellé gauche / prix droite tabulaire ; caption obligatoire ; mobile : scroll horizontal avec ombre d'affordance OU bascule en liste définitionnelle. |
| **Timeline** | Épine verticale `--color-line`, pastilles gold, entrées alternées desktop / empilées mobile, année en Fraunces 600. |
| **Accordion (FAQ, règles)** | Bouton avec `aria-expanded`, chevron rotatif 200 ms, un seul niveau, contenu indexable (rendu dans le DOM). |
| **Badges** | Pays (clubs affiliés), catégorie (événements), date-chip (news) : cream, bordure line, texte ink-600, radius pleine hauteur. |
| **Modals/Lightbox** | Focus trap, `Escape`, retour du focus à l'appelant, fond scrimé, fermeture au clic extérieur ; lightbox : flèches clavier, compteur x/y. |
| **Icons** | Set unique type Lucide, trait 1,5 px, 20/24 px, `aria-hidden` si décoratif. |
| **EmptyState** | Illustration légère + message daté + action éventuelle - composant obligatoire sur toute liste dynamique. |

## 6.5 Animations & motion

- Durées : 150 ms (hover) · 200–250 ms (révélations, accordéons) · 300 ms (drawer, modales). Easing `cubic-bezier(0.2,0,0,1)`.
- Révélation au scroll : fade + translation 12 px, une seule fois, seuil 20 %.
- **Interdits :** autoplay, parallaxe multi-couches, animations en boucle, tout effet > 400 ms.
- `prefers-reduced-motion: reduce` → toutes transitions ramenées à 0 ; obligation contractuelle.

---

# 7. UX - Parcours utilisateurs & User Flows

> Notation : [Page] → action → (résultat). Chaque flow se termine par une conversion mesurée ou une information consommée ; les impasses constatées dans l'audit sont explicitement supprimées.

## 7.1 Visiteur / prospect membre (P2)
[Accueil] → CTA « Become a Member » → [/adhesion] → compare les catégories → consulte le tableau des cotisations → stepper « How to join » → remplit le formulaire → (écran de succès + email de confirmation + notification au Club Manager).
*Points de friction supprimés : absence de tarifs, promesse de « liens ci-dessous » inexistants, jargon réglementaire en premier niveau.*

## 7.2 Membre (P1)
[Favori mobile /menu-du-jour] → menu HTML de la semaine (< 30 s) → éventuel rebond vers [/evenements] → « Add to calendar ».
*Exigence : le menu ne peut jamais afficher une semaine passée sans bannière d'obsolescence automatique.*

## 7.3 Touriste golfeur (P3)
[Google « green fees Mauritius »] → [/sports/golf] (landing SEO) → onglet Visitors → tarifs 18/9 trous + location matériel → formulaire « Planning a round » → (confirmation + notification Caddy Master/secrétariat **[ACC - boîte destinataire]**).

## 7.4 Golfeur membre
[/sports/golf] → sous-nav sticky → Fees/Members → coaching (grille 1p/2p/kids) → contact Caddy Master (tel: cliquable).

## 7.5 Entreprise (P4)
[Accueil § Salles] ou [/salles-et-evenements] → fiche Conference Room (photos, capacité, équipements) → formulaire devis → (confirmation + notification F&B).

## 7.6 Recruteur / candidat (P5)
[/le-club/carrieres] → liste des offres (ou état vide daté) → fiche → « Apply by email » mailto pré-rempli → (candidature). V2 : formulaire avec upload.

## 7.7 Fournisseur (P6 tender)
[/le-club/appels-doffres] → tableau des AO en cours → téléchargement PDF → contact référencé dans le dossier. État vide daté sinon.

## 7.8 Membre réciproque (P6 Anand)
[/adhesion/clubs-affilies] → filtre pays → fiche de son club (lien sortant **corrigé**) → encart « Visiting from an affiliated club? » → procédure **[ACC]** → formulaire contact sujet « Membership ».

---

# 8. Responsive Design

| Breakpoint | Cible | Comportements clés |
|---|---|---|
| ≥ 1280 px (Desktop) | Écrans de bureau | Grille 12 col ; sports 5 col ; nav complète avec dropdowns ; timeline alternée ; héros 92vh |
| 1024–1279 (Laptop) | Portables | Sports 3 col ; conteneur fluide ; sous-nav sticky conservée |
| 640–1023 (Tablet) | iPad & co | Sports 2 col ; SplitSections empilées (image au-dessus) ; tables scrollables ; nav condensée ou drawer |
| < 640 px (Mobile) | Smartphones - **priorité de conception** | 1 colonne ; héros 70svh ; CTA pleine largeur empilés ; FactBand scroll-snap ; onglets tarifs → accordéons ; footer accordéon ; cibles tactiles ≥ 44 px ; polices min 16 px (inputs 16 px pour éviter le zoom iOS) |

Règles transverses : images `srcset/sizes` systématiques ; aucun contenu exclusif à un breakpoint ; tests réels sur iOS Safari + Android Chrome (les usages membres locaux sont mobiles) ; pas de hover-only (toute info au survol a un équivalent tap/focus).

---

# 9. Fonctionnalités (périmètre)

| # | Fonctionnalité | Description | Priorité (MoSCoW) |
|---|---|---|---|
| F1 | Rendu serveur des contenus (SSR/SSG) | Toutes les listes et pages indexables sans JS | Must |
| F2 | Formulaires (contact multi-sujets, adhésion, green fees, devis salles) | Validation inline, anti-spam (honeypot + rate-limit), emails de notification + accusé, stockage des soumissions au CMS | Must |
| F3 | Menu du jour daté | Saisie hebdo, dates de validité, état périmé automatique | Must |
| F4 | Événements | CRUD, catégories, filtres, ICS « Add to calendar », état vide | Must |
| F5 | Actualités | Articles HTML + PDF joints, listing paginé | Must |
| F6 | Galerie | Albums, pages dédiées, lightbox accessible, gestion médias (upload, recadrage focal, alt obligatoire) | Must |
| F7 | Google Maps interactif | Embed + lien itinéraire + fallback statique lié | Must |
| F8 | Documents PDF gérés | Bibliothèque (règlements, cartes menus, dossiers AO, newsletters) avec libellé, taille, version, date | Must |
| F9 | Clubs affiliés | Collection filtrable par pays, liens sortants validés (contrôle d'URL absolu à la saisie) | Must |
| F10 | Appels d'offres | Collection avec expiration automatique | Must |
| F11 | Offres d'emploi | Collection + mailto pré-rempli | Must |
| F12 | Bandeau cookies conforme | Accepter/Refuser/Préférences, scripts conditionnés au consentement | Must |
| F13 | Recherche interne | Recherche plein texte (pages, actus, événements) | Should |
| F14 | Newsletter (inscription) | Capture email + intégration outil d'emailing **[ACC - outil du club ?]** | Should |
| F15 | Candidature avec upload CV | Formulaire fichier (PDF ≤ 5 Mo, antivirus) | Could |
| F16 | Bilinguisme FR/EN | i18n complète contenus + UI | Could **[ACC - décision]** |
| F17 | Espace membre authentifié (comptes, relevés) | Hors périmètre V1 - dépend du système de gestion interne du club **[ACC]** | Won't (V1) |
| F18 | Réservation en ligne temps réel (tee times, courts) | Hors périmètre V1 - nécessite moteur de réservation ; V1 = formulaires de demande | Won't (V1) |

**Justification des deux « Won't » :** un espace membre et une réservation temps réel exigent une intégration avec la gestion interne du club (comptes membres, planning des départs) dont l'existence et l'ouverture (API) sont inconnues **[ACC]**. Les inclure en V1 ferait exploser coût et risque pour un club dont le problème immédiat est l'abandon éditorial. Les formulaires de demande couvrent 80 % de la valeur à 10 % du coût.

---

# 10. CMS - Modèle de contenu administrable

> Principe : **tout contenu visible est administrable** ; aucun texte en dur hors libellés d'interface. Rôles : Administrateur (prestataire/IT), Éditeur (Club Manager), Contributeur (F&B, Golf, RH). Workflow brouillon → relecture → publication ; prévisualisation avant publication ; historique des versions.

## 10.1 Collections (types de contenu)

| Collection | Champs principaux | Contributeur type | Cadence |
|---|---|---|---|
| Pages (accueil, hubs) | Sections modulaires ordonnables (héros, split, bandeaux CTA), SEO | Éditeur | Ponctuel |
| Menu du jour | Semaine (date début/fin obligatoires), plats par jour, image optionnelle | F&B | Hebdomadaire |
| Cartes de menu | Titre, PDF/page, ordre | F&B | Trimestriel |
| Événements | Titre, catégorie, date(s), heure, lieu, description, image, document | Éditeur | Continu |
| Actualités | Titre, date, corps riche, image, PDF joints | Éditeur | Mensuel/trimestriel |
| Sports | Intro, faits, tables tarifaires (lignes libellé/prix), contacts, album lié | Golf/Éditeur | Annuel (tarifs) |
| Salles (venue) | Nom, capacité, équipements, galerie, texte | F&B | Ponctuel |
| Comité | Nom, fonction, photo, ordre | Éditeur | Annuel (AG) |
| Clubs affiliés | Nom, pays (liste fermée), adresse, site (validation URL absolue), email, tél, logo | Éditeur | Ponctuel |
| Appels d'offres | Réf, intitulé, PDF, date limite (expiration auto) | Éditeur | Ponctuel |
| Offres d'emploi | Intitulé, département, type, description, date limite | RH | Ponctuel |
| Albums & Médias | Photos avec alt obligatoire, point focal, légende | Éditeur | Continu |
| Timeline | Année/période, texte, photo | Éditeur | Rare |
| Documents | Fichier, libellé, catégorie, version, date | Éditeur | Ponctuel |
| Globaux | Header (liens, CTA), Footer (colonnes, coordonnées, horaires), bandeau d'alerte site (fermeture exceptionnelle, cyclone) | Admin/Éditeur | Rare |
| Soumissions de formulaires | Lecture seule, export CSV | Éditeur | - |

## 10.2 Garde-fous éditoriaux (issus des défauts constatés)

1. Champs date de validité obligatoires sur Menu du jour et Appels d'offres → péremption automatique (plus jamais un menu d'août 2025 en juillet 2026).
2. Validation d'URL absolue sur tout champ « site web » (supprime la classe de bugs des clubs affiliés).
3. Alt obligatoire à l'upload d'une image de contenu.
4. Compteur/alerte de fraîcheur sur le tableau de bord CMS (« Menu du jour : expiré depuis N jours »).
5. Aucun composant de liste sans EmptyState configuré.

---

# 11. SEO

| Chantier | Spécification |
|---|---|
| Titres & metas | Générés par le CMS : `{Titre de page} - Mauritius Gymkhana Club` ; meta description unique 140–160 car. par page (champ obligatoire) - corrige le titre unique global et les metas vides actuels |
| URLs | Courtes, descriptives, sans suffixes techniques (suppression des `/golfr`, `/about-usr`) ; **redirections 301 exhaustives** de toutes les anciennes URL vers les nouvelles (table de mapping en annexe de recette) |
| Schema.org (JSON-LD) | `SportsClub` + `LocalBusiness` (siège, géo, horaires) ; `GolfCourse` ; `Event` par événement ; `NewsArticle` ; `JobPosting` ; `FAQPage` (adhésion) ; `BreadcrumbList` |
| OpenGraph/Twitter | og:title/description/image (1200×630 générée par gabarit) sur toutes les pages |
| Sitemap & robots | sitemap.xml auto-généré à chaque publication ; robots.txt propre ; soumission Search Console |
| Contenu indexable | Tout contenu critique en HTML server-rendered ; menus et règlements résumés en HTML (les PDF en complément) ; fin des contenus JS-only |
| Images | Noms de fichiers descriptifs, alt, formats modernes (cf. §13) |
| Recherche locale | Fiche Google Business Profile alignée (adresse, horaires **[ACC]**) - hors site mais dans le périmètre de lancement |
| Cibles éditoriales | Pages piliers : golf (green fees), tennis (grass courts), histoire (oldest golf course southern hemisphere), adhésion |

---

# 12. Accessibilité - WCAG 2.2 AA

Engagement contractuel : conformité **WCAG 2.2 niveau AA**, vérifiée par audit outillé (axe-core en CI) + revue manuelle (clavier, lecteur d'écran NVDA/VoiceOver) en recette. Points saillants appliqués au projet :

1. **Structure** : un H1 par page, hiérarchie sans saut, landmarks (`header/nav/main/footer`), breadcrumbs `nav aria-label`.
2. **Clavier** : tout est opérable au clavier ; focus visible (2.4.7) renforcé par 2.4.11 *Focus Not Obscured* (la sous-nav sticky ne masque jamais l'élément focalisé) ; pas de piège.
3. **Cibles** : 2.5.8 *Target Size* ≥ 24×24 px CSS minimum - norme interne 44 px tactile.
4. **Contrastes** : texte 4,5:1 (3:1 grands textes), composants UI 3:1 ; le gold n'est jamais utilisé pour du texte courant sur fond clair.
5. **Formulaires** : labels visibles, erreurs textuelles reliées (`aria-describedby`), 3.3.7 *Redundant Entry* (pas de resaisie), pas de CAPTCHA cognitif (3.3.8) - honeypot + rate-limiting.
6. **Images & médias** : alt pertinents (contenu) / vides (décoratif) ; aucun texte porté uniquement par une image (menus !).
7. **Mouvement** : `prefers-reduced-motion` respecté ; aucun clignotement ; aucun autoplay.
8. **Composants riches** : accordéons, onglets, modales, lightbox conformes aux patterns ARIA APG (rôles, états, gestion du focus).
9. **Langue** : attribut `lang` correct ; changements de langue balisés (« Menu du jour » dans un site EN).
10. **PDF** : les documents publiés doivent être balisés/accessibles ou doublés d'un équivalent HTML - inclut RULES.pdf **[ACC - refonte du PDF côté club si non accessible]**.

---

# 13. Performance

**Budget contraignant (mesuré en CI sur mobile simulé, 4G) :** LCP < 2,5 s · INP < 200 ms · CLS < 0,1 · Poids page d'accueil < 1,2 Mo transférés · JS initial < 150 ko gz.

| Levier | Spécification |
|---|---|
| Images | AVIF/WebP avec fallback ; `srcset/sizes` ; recadrage/redimensionnement automatique via CDN d'images ; point focal géré au CMS ; `fetchpriority=high` + preload sur l'image LCP du héros ; lazy-loading natif sous la ligne de flottaison ; dimensions déclarées (anti-CLS). Interdiction de publier des exports bruts (les `IMG_3843.JPG` 4000 px de l'existant). |
| Fonts | 2 familles variables, `woff2` auto-hébergées, `font-display: swap`, préchargement, subsets latin. |
| Rendu | SSG/ISR pour tout le site éditorial ; hydratation minimale (îlots) ; zéro framework côté client pour les pages purement statiques. |
| Cache & CDN | Assets fingerprintés `immutable` 1 an ; HTML en stale-while-revalidate ; CDN edge global. |
| Compression | Brotli ; minification ; HTTP/2+. |
| Scripts tiers | Un seul outil d'analytics léger ; Maps chargé en façade (image cliquable → embed à l'interaction) ; tout tiers conditionné au consentement. |
| Monitoring | Lighthouse CI à chaque déploiement (budget bloquant) + RUM Core Web Vitals en production. |

---

# 14. Technologies recommandées

## 14.1 Architecture cible (recommandation principale)

| Couche | Choix recommandé | Justification |
|---|---|---|
| Frontend | **Next.js (React) en SSG/ISR** - alternative : Astro | Rendu serveur natif (exigence SEO/F1), écosystème, images optimisées intégrées ; Astro pertinent si l'équipe privilégie le « zéro JS par défaut » |
| CMS | **Headless : Sanity ou Strapi** (alternative packagée : Payload) | Modèle de contenu de §10 modélisable finement (validations d'URL, dates obligatoires, workflows, rôles) ; interface simple pour le personnel du club |
| Base de données | Portée par le CMS (Sanity : hébergée ; Strapi/Payload : PostgreSQL managé) | Pas de BDD applicative propre en V1 (pas d'espace membre) |
| Hébergement | Vercel ou Netlify (front) + cloud du CMS ; CDN inclus | Déploiements atomiques, previews par branche, SSL, edge |
| Emails transactionnels | Resend / Postmark / SES | Accusés et notifications de formulaires (F2), délivrabilité suivie |
| Formulaires & anti-spam | API routes + stockage CMS + honeypot/rate-limit (Turnstile en dernier recours) | Conformité 3.3.8 (pas de CAPTCHA cognitif) |
| Analytics | Plausible ou Matomo (léger, sans cookie) - GA4 seulement si exigé **[ACC]** | KPIs de §1.6 sans alourdir le consentement |
| Monitoring | Sentry (erreurs) + Lighthouse CI + uptime (BetterStack/UptimeRobot) | Qualité continue |
| Recherche (F13) | Pagefind (statique) ou Algolia si volumétrie | Coût quasi nul avec Pagefind |
| DNS/Sécurité | Cloudflare devant l'existant `.mu` ; HTTPS forcé ; en-têtes de sécurité (CSP, HSTS) | Baseline 2026 |

## 14.2 Note franche sur Lovable / Google AI Studio

Ces outils génèrent des front-ends React rapidement : ils sont pertinents pour **prototyper l'UI** (valider le design system et les gabarits avec le comité avant développement). Ils ne remplacent **ni** le CMS, **ni** le SSR/SEO, **ni** les workflows éditoriaux - c'est-à-dire précisément ce qui a fait échouer le site actuel. Position du CDC : Lovable = outil de maquettage en phase UI ; la production suit l'architecture §14.1. Livrer le site final « en Lovable » sans CMS reproduirait la cause racine de l'échec (contenu figé nécessitant un développeur à chaque mise à jour).

## 14.3 Alternative économique (si budget contraint)

WordPress + thème sur mesure (blocks) + WP Rocket + plan d'hébergement managé. Moins élégant techniquement, mais CMS maîtrisable localement à Maurice et coût inférieur. À n'envisager que si la maintenance locale prime sur la performance ; les exigences des §11–13 restent applicables.

---

# 15. Roadmap

> Hypothèse d'équipe : 1 chef de projet (mi-temps), 1 UX/UI designer, 2 développeurs (front + full-stack/CMS), 1 QA (mi-temps), + un référent contenu **côté club** (obligatoire). Durée totale indicative : **14 à 18 semaines** hors délais de validation client.

| Phase | Contenu | Durée | Jalons / critères de sortie |
|---|---|---|---|
| **0. Cadrage & collecte** | Ateliers client ; levée de TOUS les [ACC] (tarifs adhésion, comité, horaires, textes salles, charte/blason, photos, procédure réciproque) ; séance photo pro ; ouverture Search Console/Analytics ; **correctifs d'urgence sur le site actuel** (Lorem ipsum, liens cassés, menu périmé) | 2–3 sem | Backlog de contenu 100 % attribué ; défauts Sévérité-1 corrigés en ligne |
| **1. UX** | Arborescence validée, wireframes basse fidélité (desktop+mobile) des 12 gabarits, flows §7 joués sur wireframes avec 3–5 utilisateurs (dont 1 membre senior) | 2 sem | Wireframes signés par le comité |
| **2. UI & Design System** | Tokens, composants Figma (états complets), maquettes haute fidélité des gabarits, prototype cliquable (éventuellement via Lovable), test contraste/a11y sur maquettes | 2–3 sem | DS signé ; maquettes signées |
| **3. Socle technique & CMS** | Setup repo/CI/CD, environnements (dev/staging/prod), modélisation CMS (§10), rôles & workflows, garde-fous éditoriaux | 2 sem (‖ phase 2) | CMS opérationnel, contenu de démonstration |
| **4. Développement front** | Intégration des gabarits, composants Storybook, formulaires + emails, Maps, lightbox, recherche | 4–5 sem | Storybook complet ; pages branchées CMS |
| **5. Contenu & migration** | Saisie/reprise du contenu réel (fees golf, 26 clubs corrigés, timeline dédupliquée, 191 photos avec alt), rédaction des manques, table de redirections 301 | 2 sem (‖ phase 4) | 100 % du contenu réel en staging ; zéro Lorem ipsum ; zéro [ACC] restant |
| **6. Qualité (QA, SEO, A11y, Perf)** | Recette fonctionnelle par scénarios §7 ; audit axe + lecteur d'écran ; Lighthouse CI ≤ budgets ; vérif 301 ; metas/schema ; tests iOS/Android réels | 2 sem | 0 bug bloquant ; budgets tenus ; audit AA sans non-conformité majeure |
| **7. Recette client & formation** | Recette comité ; **formation des éditeurs (2 sessions) + guide éditorial** ; calendrier éditorial signé (qui publie quoi, à quelle cadence) | 1 sem | PV de recette ; charte éditoriale signée |
| **8. Mise en production** | Bascule DNS, 301 actives, soumission sitemap, monitoring armé, période d'hypercare 2 semaines | 1 sem | Site en prod ; RUM actif |
| **9. Post-lancement (M+1, M+3)** | Revue KPIs, ajustements SEO, backlog V2 (upload CV, newsletter, bilingue, espace membre) | - | Rapport M+3 |

**Chemin critique réel : la phase 0.** L'expérience de l'audit montre que le risque n°1 n'est pas technique : c'est l'obtention des contenus et décisions client. Aucune phase 4+ ne démarre tant que les [ACC] bloquants (tarifs adhésion, textes salles, comité) ne sont pas levés.

---

# 16. Estimation

> **Hypothèses affichées :** équipe de niveau confirmé ; jours-homme (JH) de conception+dev+recette inclus ; hors coût de licence/hébergement (~30–80 €/mois selon pile) ; hors séance photo ; fourchettes ±30 % tant que la phase 0 n'est pas terminée. Quiconque promet mieux sans connaître l'équipe et le contenu final avance à l'aveugle.

| Lot | Complexité | Priorité | Estimation (JH) | Risques | Dépendances |
|---|---|---|---|---|---|
| Cadrage, ateliers, collecte (ph. 0) | M | Must | 8–12 | Indisponibilité du comité ; contenus tardifs (risque n°1 du projet) | Client |
| Correctifs d'urgence site actuel | S | Must | 2–3 | Accès au CMS actuel du prestataire sortant **[ACC]** | Prestataire actuel |
| UX (arbo, wireframes, tests) | M | Must | 10–14 | Divergences au sein du comité | Ph. 0 |
| Design System + maquettes | M/L | Must | 12–18 | Validation charte/blason | UX |
| Socle technique + CI/CD | M | Must | 5–8 | - | - |
| Modélisation CMS + rôles + garde-fous | M | Must | 8–12 | Sous-estimation des validations custom (URL, dates) | Socle |
| Gabarits & composants front (12 gabarits) | L | Must | 20–28 | Dérive de périmètre sur les micro-interactions | DS, CMS |
| Formulaires + emails + anti-spam (4 formulaires) | M | Must | 6–9 | Délivrabilité email ; routage des boîtes [ACC] | Socle |
| Galerie + médiathèque (191 photos, alt) | M | Must | 5–8 | Rédaction des alt (volume) | CMS |
| Menu du jour daté + états vides | S | Must | 3–4 | - | CMS |
| Clubs affiliés (26 fiches corrigées, filtres) | S/M | Must | 3–5 | Vérification des données club par club | Contenu |
| SEO technique (metas, schema, sitemap, 301) | M | Must | 5–7 | Oublis de mapping 301 → perte SEO | Arbo figée |
| Accessibilité AA (audit + corrections) | M | Must | 6–9 | Découvertes tardives si testé trop tard → tester en continu | Front |
| Performance (budgets CI, images, fonts) | M | Must | 4–6 | Photos sources trop lourdes | Front |
| Recette + scénarios + devices réels | M | Must | 8–10 | - | Tout |
| Formation éditeurs + guide + charte éditoriale | S | Must | 3–4 | Turnover du personnel club | CMS final |
| Recherche interne (F13) | S | Should | 2–4 | - | Front |
| Newsletter (F14) | S | Should | 2–3 | Choix d'outil [ACC] | Client |
| Candidature avec upload (F15) | M | Could | 3–5 | Sécurité fichiers | Formulaires |
| Bilinguisme FR/EN (F16) | L | Could | 15–25 | Coût de traduction + double maintenance éditoriale | Décision client |
| **Total V1 (Must + Should)** | | | **≈ 110–160 JH** | | |

Lecture honnête : à des taux mauriciens/agence régionale, la V1 se situe dans une enveloppe défendable pour un club de cette taille ; le bilinguisme et l'espace membre la feraient changer de catégorie. L'arbitrage MoSCoW ci-dessus est conçu pour protéger la valeur (conversion + gouvernance éditoriale) au détriment du confort (dark mode, réservation temps réel).

---

# 17. Annexes

## 17.1 Wireframes textuels (extraits - les 12 gabarits sont déclinés en phase 1)

**Accueil (mobile)**
```
[Barre utilitaire: ☎ +230 660 1844 · Menu du jour]
[Logo]                       [☰]
┌──────────────────────────────┐
│  PHOTO PARCOURS (70svh)      │
│  EST. 1849 · VACOAS          │
│  The oldest golf club in     │
│  the Southern Hemisphere     │
│  [Become a Member]           │
│  [Visitor Green Fees]        │
└──────────────────────────────┘
◄ 1844 · 1849 · 1922 · 1935 ► (scroll-snap)
[SPORTS]  (cards 1 col : Golf / Tennis / Squash / Fitness / Pool)
[VENUES & DINING] (splits empilés)
[CLUB LIFE] (3 cards datées - masqué si vide)
[GALLERY] (5 albums + compteurs)
[Bandeau CTA adhésion]
[Footer accordéon]
```

**Golf - bloc tarifs (desktop)**
```
[Sub-nav sticky: Overview | Course | Fees | Coaching | Contact]
FEES
[Members][Juniors][Visitors][Guests][Coaching][Equipment]
┌────────────────────────────┬──────────┐
│ 18 Holes                   │   Rs 500 │
│ 13 Holes                   │   Rs 425 │
│ 9 Holes                    │   Rs 350 │
│ 1 Year Package             │ Rs 27,000│
└────────────────────────────┴──────────┘
caption: For members. Caddy Master: 698 6302
```

**Adhésion (desktop)**
```
[Hero court + promesse]
[6 cards catégories]
[Table cotisations - ACC]
[Stepper: 1 Enquire → 2 Application → 3 Committee review → 4 Welcome  - ACC]
[FAQ accordéon]
[Formulaire de demande]
```

## 17.2 User Journey exemple (P3 « Mark », golfeur touriste)

| Étape | Canal | Pensée | Émotion visée | Exigence associée |
|---|---|---|---|---|
| Recherche « green fees Mauritius » | Google | « Un parcours historique près de Vacoas ? » | Curiosité | §11 (SEO golf) |
| Landing /sports/golf | Site | « Par 68, est. 1844 - sérieux » | Confiance | StatChips, photos |
| Onglet Visitors | Site | « Rs 2 100 les 18 trous, matériel dispo » | Clarté | Tables §6.4 |
| Formulaire « Planning a round » | Site | « 2 minutes, c'est fait » | Facilité | F2, a11y §12.5 |
| Accusé email + réponse club | Email | « Réponse rapide, je viens » | Réassurance | Notification + SLA de réponse **[ACC - engagement club]** |

## 17.3 User Stories (extraits du backlog - format INVEST)

- **US-01 (Must)** En tant que prospect, je veux voir les catégories d'adhésion et leurs cotisations afin de décider si je candidate. *AC : 6 catégories affichées ; table des cotisations ; source CMS ; conforme AA.*
- **US-02 (Must)** En tant que golfeur visiteur, je veux envoyer une demande de départ avec ma date afin d'organiser ma partie. *AC : formulaire validé inline ; accusé email < 1 min ; notification à la boîte désignée ; soumission visible au CMS.*
- **US-03 (Must)** En tant que responsable F&B, je veux publier le menu de la semaine avec ses dates afin que les membres le consultent sur mobile. *AC : saisie < 10 min ; état « being updated » automatique à J+1 après la fin de validité.*
- **US-04 (Must)** En tant qu'éditeur, je veux être alerté quand un contenu daté expire afin de ne plus laisser de contenu périmé. *AC : alerte tableau de bord Menu/Tenders/Events.*
- **US-05 (Must)** En tant que membre senior malvoyant, je veux naviguer au clavier avec un focus visible afin d'utiliser le site sans souris. *AC : parcours §7.2 complet au clavier ; audit AA.*
- **US-06 (Must)** En tant que membre d'un club affilié, je veux trouver mon club et la procédure de visite afin de préparer mon passage. *AC : filtre pays ; 26 fiches ; 0 lien cassé (test automatisé de liens en CI).*
- **US-07 (Should)** En tant que visiteur, je veux rechercher un contenu afin de trouver une information sans parcourir le menu. *AC : résultats < 500 ms ; pages/actus/événements couverts.*
- **US-08 (Must)** En tant que chef de projet, je veux des redirections 301 exhaustives afin de ne perdre aucun acquis SEO. *AC : table ancienne→nouvelle URL validée ; test 200/301 automatisé.*

## 17.4 Use Cases critiques (résumé)

UC-1 Soumission de formulaire avec panne email → la soumission est TOUJOURS persistée au CMS avant l'envoi ; écran de succès conditionné à la persistance, pas à l'email. UC-2 Publication d'un événement passé → warning CMS. UC-3 Upload d'une photo 12 Mo → redimensionnement auto, refus > 25 Mo. UC-4 Éditeur supprime une page liée → contrôle de références, blocage avec liste des liens entrants.

## 17.5 Priorisation MoSCoW (synthèse backlog)

- **Must :** F1–F12, 12 gabarits, DS, SEO technique, AA, budgets perf, redirections, formation éditeurs, correctifs d'urgence sur site actuel.
- **Should :** recherche interne, newsletter, animations de timeline enrichies, page presse.
- **Could :** upload CV, bilinguisme FR/EN, mode « kiosque » menu du jour (écran au club), flux ICS global.
- **Won't (V1) :** espace membre authentifié, réservation temps réel, dark mode, e-commerce (paiement green fees en ligne - réévaluer en V2 selon volume de demandes mesuré).

## 17.6 Liste complète des composants (référence Storybook)

Boutons (3 variantes × 6 états) · NavBar + UtilityBar + Drawer mobile · Dropdown menu · Breadcrumbs · Footer · Hero (page/home) · FactBand · SportCard · NewsCard · EventCard · AlbumCard · PersonCard · ClubCard · JobCard · DocumentCard · SplitSection · CTABanner · StatChips · PriceTable · DataTable (tenders) · Timeline · Accordion · Tabs · FilterChips · Pagination · Form (Input, Select, Textarea, Checkbox, FileUpload*) · FormMessage (error/success) · EmptyState · Badge/DateChip · Lightbox · Modal · MapEmbed (façade) · SearchBox* · Alert/SiteBanner · Skeleton loaders. (* = Should/Could)

---

## Conditions de validité de ce CDC

1. Le présent document repose sur l'audit de juillet 2026 ; toute donnée marquée **[ACC]** doit être levée en phase 0 - les [ACC] bloquants sont : cotisations d'adhésion, procédure d'adhésion, composition du comité, horaires, textes Conference Room/FootFive, charte graphique/blason, banque photo, boîtes email de routage des formulaires.
2. L'engagement de gouvernance éditoriale côté club (référent nommé, cadence de publication) est une **condition de succès contractuelle**, pas une option.
3. Les estimations (§16) sont des fourchettes ±30 % à affiner en fin de phase 1.

*- Fin du document -*
