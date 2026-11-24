import type { StackCategory } from '@/types/content'

export const stack: StackCategory[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', fr: 'Frontend' },
    items: [
      {
        name: 'Vue 3',
        note: { en: 'Composition API, script setup', fr: 'Composition API, script setup' },
      },
      {
        name: 'TypeScript',
        note: {
          en: 'Strict, typed contracts end to end',
          fr: 'Strict, contrats typés de bout en bout',
        },
      },
      {
        name: 'Vuetify 3',
        note: { en: 'Enterprise component system', fr: 'Système de composants d’entreprise' },
      },
      { name: 'Pinia', note: { en: 'Explicit, modular state', fr: 'État explicite et modulaire' } },
      { name: 'Vue Router', note: { en: 'Typed navigation', fr: 'Navigation typée' } },
      { name: 'Vite', note: { en: 'Fast builds and HMR', fr: 'Builds rapides et HMR' } },
      { name: 'Axios', note: { en: 'REST integration layer', fr: 'Couche d’intégration REST' } },
      {
        name: 'Chart.js / ApexCharts',
        note: { en: 'Dashboard visualization', fr: 'Visualisation de tableaux de bord' },
      },
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', fr: 'Backend' },
    items: [
      { name: 'Java', note: { en: 'Primary backend language', fr: 'Langage backend principal' } },
      {
        name: 'Spring Boot',
        note: { en: 'REST services and business logic', fr: 'Services REST et logique métier' },
      },
      {
        name: 'Hibernate / JPA',
        note: { en: 'Domain persistence mapping', fr: 'Mapping de la persistance métier' },
      },
      { name: 'PostgreSQL', note: { en: 'Primary database', fr: 'Base de données principale' } },
      {
        name: 'REST APIs',
        note: { en: 'Contract-first integration', fr: 'Intégration contract-first' },
      },
      { name: 'Tomcat', note: { en: 'Deployment runtime', fr: 'Runtime de déploiement' } },
    ],
  },
  {
    id: 'reporting',
    title: { en: 'Reporting', fr: 'Reporting' },
    items: [
      {
        name: 'JasperReports',
        note: { en: 'Document & report generation', fr: 'Génération de documents et rapports' },
      },
      {
        name: 'Jaspersoft Studio',
        note: { en: 'Report template design', fr: 'Conception de modèles de rapports' },
      },
    ],
  },
  {
    id: 'tools',
    title: { en: 'Tools', fr: 'Outils' },
    items: [
      {
        name: 'Git / GitHub',
        note: { en: 'Version control & reviews', fr: 'Versioning & revues de code' },
      },
      { name: 'VS Code', note: { en: 'Primary editor', fr: 'Éditeur principal' } },
      {
        name: 'IntelliJ IDEA / DataGrip',
        note: { en: 'Java IDE & database work', fr: 'IDE Java & travail base de données' },
      },
      {
        name: 'DBeaver',
        note: { en: 'Database exploration', fr: 'Exploration de bases de données' },
      },
      { name: 'Postman', note: { en: 'API design & testing', fr: 'Conception & tests d’APIs' } },
      { name: 'npm / Node.js', note: { en: 'Frontend toolchain', fr: 'Chaîne d’outils frontend' } },
    ],
  },
  {
    id: 'exploring',
    title: { en: 'Also Exploring', fr: 'En Exploration' },
    items: [
      {
        name: 'Flutter',
        note: {
          en: 'Cross-platform mobile development',
          fr: 'Développement mobile cross-platform',
        },
      },
      {
        name: 'Unity',
        note: { en: 'Interactive & real-time 3D', fr: '3D interactive et temps réel' },
      },
      {
        name: 'AI-assisted workflows',
        note: {
          en: 'Faster, better-informed development',
          fr: 'Développement plus rapide et éclairé',
        },
      },
    ],
  },
]
