import type { Project } from '@/types/content'

/**
 * Project case studies. All entries describe professional work and are kept
 * deliberately high-level: no client names, metrics, screenshots or internal
 * details are invented. Every case study is marked as draft until Soufiane
 * verifies it can be disclosed publicly.
 *
 * To add a project: append a new entry following the same shape and add its
 * slug to the sitemap list in vite.config.ts.
 */
export const projects: Project[] = [
  {
    slug: 'metaphore',
    name: 'METAPHORE',
    index: '01',
    year: null,
    kind: 'professional',
    draft: true,
    category: {
      en: 'Enterprise Business Management Platform',
      fr: 'Plateforme métier de gestion d’entreprise',
    },
    summary: {
      en: 'A modular business management platform covering day-to-day operations, data management and reporting for an enterprise environment.',
      fr: 'Une plateforme métier modulaire couvrant les opérations quotidiennes, la gestion des données et le reporting en environnement enterprise.',
    },
    overview: {
      en: 'METAPHORE is an internal business management platform built to centralize operational workflows in a single, coherent system. It brings together data entry, validation, document generation and reporting behind one consistent interface, replacing scattered manual processes.',
      fr: 'METAPHORE est une plateforme métier interne conçue pour centraliser les flux opérationnels dans un système cohérent. Elle réunit saisie de données, validation, génération de documents et reporting derrière une interface unique, en remplaçant des processus manuels dispersés.',
    },
    context: {
      en: 'Developed professionally at KAY Technology. The project targets complex, data-heavy business processes where reliability and clarity matter more than visual novelty. Public details are limited by confidentiality; this case study stays at a high level.',
      fr: 'Développé professionnellement chez KAY Technology. Le projet vise des processus métier complexes et riches en données, où la fiabilité et la clarté priment sur la nouveauté visuelle. Les détails publics sont limités par la confidentialité ; cette étude de cas reste volontairement générale.',
    },
    challenges: [
      {
        en: 'Modeling intricate business workflows without overwhelming the user interface.',
        fr: 'Modéliser des flux métier complexes sans surcharger l’interface utilisateur.',
      },
      {
        en: 'Keeping large data sets manageable, filterable and fast to navigate.',
        fr: 'Garder de grands volumes de données gérables, filtrables et rapides à parcourir.',
      },
      {
        en: 'Generating consistent documents and reports from live application data.',
        fr: 'Générer des documents et rapports cohérents à partir des données de l’application.',
      },
    ],
    responsibilities: [
      {
        en: 'Designing and building frontend modules with Vue 3, TypeScript and Vuetify.',
        fr: 'Conception et développement de modules frontend avec Vue 3, TypeScript et Vuetify.',
      },
      {
        en: 'Integrating REST endpoints and shaping data flows between UI and backend.',
        fr: 'Intégration d’APIs REST et structuration des flux de données entre UI et backend.',
      },
      {
        en: 'Implementing reporting and document generation workflows.',
        fr: 'Mise en place des flux de reporting et de génération de documents.',
      },
      {
        en: 'Maintaining and improving existing production features.',
        fr: 'Maintenance et amélioration de fonctionnalités existantes en production.',
      },
    ],
    approach: {
      en: 'A component-driven frontend architecture with strict separation between UI, state and data access. Type-safe API contracts keep the Vue layer aligned with the Java backend, while a modular screen design lets new business features slot in without rework.',
      fr: 'Une architecture frontend orientée composants avec une séparation stricte entre UI, état et accès aux données. Des contrats d’API typés alignent la couche Vue avec le backend Java, tandis qu’une conception modulaire des écrans permet d’ajouter de nouvelles fonctionnalités métier sans refonte.',
    },
    features: [
      {
        en: 'Structured data management screens with advanced filtering',
        fr: 'Écrans de gestion de données structurées avec filtres avancés',
      },
      {
        en: 'Document and report generation pipeline',
        fr: 'Pipeline de génération de documents et de rapports',
      },
      { en: 'Role-aware navigation and workflows', fr: 'Navigation et flux adaptés aux rôles' },
      {
        en: 'Consistent design system across modules',
        fr: 'Design system cohérent entre les modules',
      },
    ],
    technologies: [
      'Vue 3',
      'TypeScript',
      'Vuetify 3',
      'Pinia',
      'Vue Router',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'JasperReports',
      'REST',
    ],
    accentHue: 84,
  },
  {
    slug: 'metaphore-client',
    name: 'METAPHORE Client',
    index: '02',
    year: null,
    kind: 'professional',
    draft: true,
    category: { en: 'Customer Portal', fr: 'Portail client' },
    summary: {
      en: 'A customer-facing portal extending the METAPHORE platform, giving external users a clean, self-service window into their data and requests.',
      fr: 'Un portail client prolongeant la plateforme METAPHORE, offrant aux utilisateurs externes une fenêtre claire en libre-service vers leurs données et demandes.',
    },
    overview: {
      en: 'METAPHORE Client is the external companion to the internal platform. It exposes a carefully scoped subset of functionality to customers through a responsive, accessible interface, with the same attention to data consistency as the back-office.',
      fr: 'METAPHORE Client est le complément externe de la plateforme interne. Il expose une partie soigneusement délimitée des fonctionnalités aux clients via une interface responsive et accessible, avec la même exigence de cohérence des données que le back-office.',
    },
    context: {
      en: 'Developed professionally at KAY Technology as the public-facing layer of an existing enterprise system. Details remain confidential; this summary describes the approach without revealing internals.',
      fr: 'Développé professionnellement chez KAY Technology comme couche publique d’un système d’entreprise existant. Les détails restent confidentiels ; ce résumé décrit l’approche sans révéler d’éléments internes.',
    },
    challenges: [
      {
        en: 'Exposing internal data safely and clearly to external audiences.',
        fr: 'Exposer les données internes de manière sûre et claire à un public externe.',
      },
      {
        en: 'Delivering a fast, responsive experience across a wide range of devices.',
        fr: 'Offrir une expérience rapide et responsive sur une large gamme d’appareils.',
      },
      {
        en: 'Keeping the customer UI consistent with the platform design language.',
        fr: 'Garder l’UI client cohérente avec le langage visuel de la plateforme.',
      },
    ],
    responsibilities: [
      {
        en: 'Building responsive portal screens with Vue 3 and Vuetify.',
        fr: 'Développement d’écrans du portail responsive avec Vue 3 et Vuetify.',
      },
      {
        en: 'Consuming and shaping REST APIs for external-facing features.',
        fr: 'Consommation et structuration d’APIs REST pour les fonctionnalités exposées.',
      },
      {
        en: 'Handling feedback, loading and empty states for a public audience.',
        fr: 'Gestion des états de chargement, de feedback et de vide pour un public large.',
      },
    ],
    approach: {
      en: 'The portal reuses the platform’s design tokens and typed API layer while keeping a thinner, faster bundle. Every screen is designed around its core task first, with progressive enhancement where it helps.',
      fr: 'Le portail réutilise les design tokens de la plateforme et sa couche d’API typée, avec un bundle plus léger et rapide. Chaque écran est d’abord pensé autour de sa tâche principale, avec des améliorations progressives lorsqu’elles apportent de la valeur.',
    },
    features: [
      {
        en: 'Self-service access to customer data and requests',
        fr: 'Accès en libre-service aux données et demandes du client',
      },
      {
        en: 'Fully responsive, mobile-first layouts',
        fr: 'Mises en page entièrement responsive, mobile-first',
      },
      {
        en: 'Clear feedback for every user action',
        fr: 'Feedback clair pour chaque action utilisateur',
      },
    ],
    technologies: [
      'Vue 3',
      'TypeScript',
      'Vuetify 3',
      'Pinia',
      'Axios',
      'Java',
      'Spring Boot',
      'REST',
    ],
    accentHue: 214,
  },
  {
    slug: 'deliverypro',
    name: 'DeliveryPro',
    index: '03',
    year: null,
    kind: 'professional',
    draft: true,
    category: {
      en: 'Delivery & Logistics Application',
      fr: 'Application de livraison et logistique',
    },
    summary: {
      en: 'A delivery and logistics application built to plan, track and manage delivery operations from a single operational interface.',
      fr: 'Une application de livraison et de logistique conçue pour planifier, suivre et gérer les opérations de livraison depuis une interface opérationnelle unique.',
    },
    overview: {
      en: 'DeliveryPro focuses on the operational reality of delivery work: planning routes, following statuses in real time and giving teams a reliable picture of the day’s activity. The interface prioritizes legibility and speed of use in the field.',
      fr: 'DeliveryPro se concentre sur la réalité opérationnelle de la livraison : planifier les tournées, suivre les statuts en temps réel et offrir aux équipes une vision fiable de l’activité. L’interface privilégie la lisibilité et la rapidité d’usage sur le terrain.',
    },
    context: {
      en: 'Developed professionally at KAY Technology within the logistics domain. This summary intentionally avoids operational specifics that are not cleared for publication.',
      fr: 'Développé professionnellement chez KAY Technology dans le domaine de la logistique. Ce résumé évite volontairement les spécificités opérationnelles non autorisées à la publication.',
    },
    challenges: [
      {
        en: 'Representing live delivery statuses without information overload.',
        fr: 'Représenter des statuts de livraison en direct sans surcharge d’information.',
      },
      {
        en: 'Designing flows that stay usable under time pressure.',
        fr: 'Concevoir des flux utilisables même sous pression temporelle.',
      },
      {
        en: 'Synchronizing state between office views and field reality.',
        fr: 'Synchroniser l’état entre les vues de bureau et la réalité terrain.',
      },
    ],
    responsibilities: [
      {
        en: 'Developing interactive tracking and planning screens.',
        fr: 'Développement d’écrans interactifs de suivi et de planification.',
      },
      {
        en: 'Integrating backend services for operational data.',
        fr: 'Intégration des services backend pour les données opérationnelles.',
      },
      {
        en: 'Building status-driven UI states and notifications.',
        fr: 'Construction d’états d’interface pilotés par les statuts et notifications.',
      },
    ],
    approach: {
      en: 'A state-first frontend where every screen derives from a single, well-typed data model. Visual hierarchy does the heavy lifting: operators see status at a glance, then drill down only when needed.',
      fr: 'Un frontend où l’état prime : chaque écran dérive d’un modèle de données unique et bien typé. La hiérarchie visuelle fait le travail : les opérateurs voient le statut d’un coup d’œil, puis approfondissent seulement si nécessaire.',
    },
    features: [
      {
        en: 'Delivery planning and follow-up views',
        fr: 'Vues de planification et de suivi des livraisons',
      },
      { en: 'Real-time status visualization', fr: 'Visualisation des statuts en temps réel' },
      {
        en: 'Operational dashboards for daily activity',
        fr: 'Tableaux de bord opérationnels de l’activité quotidienne',
      },
    ],
    technologies: [
      'Vue 3',
      'JavaScript',
      'Vuetify 3',
      'Pinia',
      'Axios',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'REST',
    ],
    accentHue: 160,
  },
  {
    slug: 'sat',
    name: 'SAT',
    index: '04',
    year: null,
    kind: 'professional',
    draft: true,
    category: { en: 'Logistics & Operations Platform', fr: 'Plateforme logistique et opérations' },
    summary: {
      en: 'A logistics and operations platform coordinating flows, resources and operational data across teams.',
      fr: 'Une plateforme logistique et opérations coordonnant flux, ressources et données opérationnelles entre équipes.',
    },
    overview: {
      en: 'SAT addresses the coordination layer of logistics work: bringing operational data together, structuring it and making it actionable through dedicated modules. It is a system designed for daily, heavy use by operational teams.',
      fr: 'SAT traite la couche de coordination du travail logistique : rassembler les données opérationnelles, les structurer et les rendre exploitables via des modules dédiés. C’est un système pensé pour un usage quotidien et intensif par les équipes opérationnelles.',
    },
    context: {
      en: 'Developed professionally at KAY Technology. This case study is published as a draft and will be completed once details are cleared.',
      fr: 'Développé professionnellement chez KAY Technology. Cette étude de cas est publiée en brouillon et sera complétée une fois les détails validés.',
    },
    challenges: [
      {
        en: 'Structuring heterogeneous operational data into a coherent model.',
        fr: 'Structurer des données opérationnelles hétérogènes en un modèle cohérent.',
      },
      {
        en: 'Coordinating multiple modules without duplicating logic.',
        fr: 'Coordonner plusieurs modules sans dupliquer la logique.',
      },
      {
        en: 'Keeping performance steady on data-dense screens.',
        fr: 'Garder des performances stables sur des écrans denses en données.',
      },
    ],
    responsibilities: [
      {
        en: 'Implementing core operational modules and flows.',
        fr: 'Implémentation des modules et flux opérationnels cœur.',
      },
      {
        en: 'Modeling UI state with Pinia for complex screens.',
        fr: 'Modélisation de l’état UI avec Pinia pour les écrans complexes.',
      },
      {
        en: 'Connecting frontend modules to backend services.',
        fr: 'Connexion des modules frontend aux services backend.',
      },
    ],
    approach: {
      en: 'Shared typed models and a consistent module pattern keep the platform coherent as it grows. Complex screens are decomposed into focused components with explicit state ownership.',
      fr: 'Des modèles typés partagés et un pattern de module cohérent préservent la cohérence de la plateforme à mesure qu’elle grandit. Les écrans complexes sont décomposés en composants ciblés avec une propriété d’état explicite.',
    },
    features: [
      {
        en: 'Operational data coordination modules',
        fr: 'Modules de coordination des données opérationnelles',
      },
      { en: 'Data-dense management screens', fr: 'Écrans de gestion denses en données' },
      { en: 'Cross-module consistency by design', fr: 'Cohérence entre modules par conception' },
    ],
    technologies: [
      'Vue 3',
      'TypeScript',
      'Vuetify 3',
      'Pinia',
      'Vue Router',
      'Java',
      'Hibernate',
      'PostgreSQL',
      'REST',
    ],
    accentHue: 32,
  },
  {
    slug: 'smtr-carre',
    name: 'SMTR CARRE',
    index: '05',
    year: null,
    kind: 'professional',
    draft: true,
    category: { en: 'Transport & Mission Management', fr: 'Gestion de transport et de missions' },
    summary: {
      en: 'A transport and mission management application for planning, assigning and following missions through their lifecycle.',
      fr: 'Une application de gestion de transport et de missions pour planifier, assigner et suivre les missions tout au long de leur cycle de vie.',
    },
    overview: {
      en: 'SMTR CARRE supports the full mission lifecycle: creation, assignment, follow-up and closing. The application translates operational rules into guided, validated screens so that teams work faster with fewer errors.',
      fr: 'SMTR CARRE accompagne tout le cycle de vie d’une mission : création, affectation, suivi et clôture. L’application traduit des règles opérationnelles en écrans guidés et validés, pour un travail plus rapide et moins sujet aux erreurs.',
    },
    context: {
      en: 'Developed professionally at KAY Technology. Published as a high-level draft pending verification.',
      fr: 'Développé professionnellement chez KAY Technology. Publié en brouillon de haut niveau en attente de vérification.',
    },
    challenges: [
      {
        en: 'Encoding business validation rules without blocking users.',
        fr: 'Encoder les règles métier de validation sans bloquer les utilisateurs.',
      },
      {
        en: 'Giving clear visibility on mission status at every stage.',
        fr: 'Offrir une visibilité claire du statut des missions à chaque étape.',
      },
      {
        en: 'Adapting complex forms to small screens.',
        fr: 'Adapter des formulaires complexes aux petits écrans.',
      },
    ],
    responsibilities: [
      {
        en: 'Building guided forms and validation flows.',
        fr: 'Construction de formulaires guidés et de flux de validation.',
      },
      {
        en: 'Designing mission lifecycle views and filters.',
        fr: 'Conception des vues et filtres du cycle de vie des missions.',
      },
      {
        en: 'Wiring screens to backend mission services.',
        fr: 'Branchement des écrans aux services backend de gestion des missions.',
      },
    ],
    approach: {
      en: 'Forms are treated as first-class UX: progressive disclosure, inline validation and saved context. The underlying state is explicit and typed, which keeps edge cases visible instead of hidden.',
      fr: 'Les formulaires sont traités comme une UX à part entière : divulgation progressive, validation en ligne et contexte préservé. L’état sous-jacent est explicite et typé, ce qui rend les cas limites visibles au lieu de les masquer.',
    },
    features: [
      { en: 'Mission lifecycle management', fr: 'Gestion du cycle de vie des missions' },
      {
        en: 'Guided data entry with inline validation',
        fr: 'Saisie guidée avec validation en ligne',
      },
      { en: 'Status-driven follow-up views', fr: 'Vues de suivi pilotées par les statuts' },
    ],
    technologies: [
      'Vue 3',
      'TypeScript',
      'Vuetify 3',
      'Pinia',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'REST',
    ],
    accentHue: 268,
  },
  {
    slug: 'fleet-management-reporting',
    name: 'Fleet Management & Maintenance Reporting',
    index: '06',
    year: null,
    kind: 'professional',
    draft: true,
    category: { en: 'Enterprise Reporting Workflows', fr: 'Flux de reporting d’entreprise' },
    summary: {
      en: 'Fleet and maintenance reporting workflows: turning operational records into structured, printable, decision-ready documents.',
      fr: 'Flux de reporting de flotte et de maintenance : transformer les enregistrements opérationnels en documents structurés, imprimables et prêts pour la décision.',
    },
    overview: {
      en: 'This project centers on the reporting side of fleet operations. It covers the path from raw maintenance records to formatted, reliable outputs — reports and documents that teams can actually use in their decision process.',
      fr: 'Ce projet porte sur la partie reporting des opérations de flotte. Il couvre le chemin des enregistrements de maintenance bruts vers des sorties fiables et mises en forme — des rapports et documents réellement exploitables dans le processus de décision.',
    },
    context: {
      en: 'Developed professionally at KAY Technology. Details of the reporting content remain internal; the case study focuses on the technical approach.',
      fr: 'Développé professionnellement chez KAY Technology. Le contenu des rapports reste interne ; l’étude de cas se concentre sur l’approche technique.',
    },
    challenges: [
      {
        en: 'Producing consistent documents from live, evolving data.',
        fr: 'Produire des documents cohérents à partir de données vivantes et évolutives.',
      },
      {
        en: 'Designing report templates that stay maintainable.',
        fr: 'Concevoir des modèles de rapports maintenables dans le temps.',
      },
      {
        en: 'Bridging application data and report engines cleanly.',
        fr: 'Connecter proprement les données de l’application et les moteurs de rapport.',
      },
    ],
    responsibilities: [
      {
        en: 'Building reporting screens and export flows.',
        fr: 'Développement des écrans de reporting et des flux d’export.',
      },
      {
        en: 'Designing and maintaining report templates.',
        fr: 'Conception et maintenance des modèles de rapports.',
      },
      {
        en: 'Integrating the reporting engine with application data.',
        fr: 'Intégration du moteur de reporting avec les données de l’application.',
      },
    ],
    approach: {
      en: 'Report templates are versioned alongside the application and fed through a clean data-preparation layer, so document output stays predictable even as the domain model evolves.',
      fr: 'Les modèles de rapports sont versionnés avec l’application et alimentés par une couche de préparation des données propre, pour des sorties prévisibles même quand le modèle métier évolue.',
    },
    features: [
      {
        en: 'Maintenance and fleet reporting pipelines',
        fr: 'Pipelines de reporting de maintenance et de flotte',
      },
      { en: 'Structured document generation', fr: 'Génération structurée de documents' },
      {
        en: 'Export-ready, print-friendly outputs',
        fr: 'Sorties exportables et prêtes à imprimer',
      },
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'JasperReports',
      'Jaspersoft Studio',
      'PostgreSQL',
      'Vue 3',
      'Chart.js',
      'REST',
    ],
    accentHue: 190,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function adjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug)
  const safe = i === -1 ? 0 : i
  return {
    prev: projects[(safe - 1 + projects.length) % projects.length],
    next: projects[(safe + 1) % projects.length],
  }
}
