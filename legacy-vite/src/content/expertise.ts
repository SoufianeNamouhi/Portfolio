import type { ExpertiseArea } from '@/types/content'

export const expertise: ExpertiseArea[] = [
  {
    id: 'frontend',
    index: '01',
    title: { en: 'Frontend Engineering', fr: 'Ingénierie Frontend' },
    description: {
      en: 'Complex, responsive interfaces built with Vue 3 and TypeScript. Component architecture, state management and data visualization done properly — not just made to look right once.',
      fr: 'Des interfaces complexes et responsives construites avec Vue 3 et TypeScript. Architecture de composants, gestion d’état et visualisation de données faites correctement — pas juste pour paraître bien une fois.',
    },
    technologies: [
      'Vue 3',
      'TypeScript',
      'Vuetify 3',
      'Pinia',
      'Vue Router',
      'Vite',
      'Chart.js',
      'ApexCharts',
    ],
  },
  {
    id: 'backend',
    index: '02',
    title: { en: 'Backend & Data', fr: 'Backend & Données' },
    description: {
      en: 'REST services and data layers with Java and Spring Boot. From schema design in PostgreSQL to report generation, the backend is built to stay understandable and reliable.',
      fr: 'Services REST et couches de données avec Java et Spring Boot. De la conception de schémas PostgreSQL à la génération de rapports, le backend est construit pour rester compréhensible et fiable.',
    },
    technologies: ['Java', 'Spring Boot', 'Hibernate / JPA', 'PostgreSQL', 'REST APIs', 'Tomcat'],
  },
  {
    id: 'product',
    index: '03',
    title: { en: 'Product Thinking & Tooling', fr: 'Pensée Produit & Outillage' },
    description: {
      en: 'Translating business requirements into functional software, with the workflow fluency to move fast without breaking things: Git, testing APIs, reporting tools and AI-assisted development.',
      fr: 'Traduire des exigences métier en logiciel fonctionnel, avec la maîtrise des outils pour aller vite sans rien casser : Git, tests d’APIs, outils de reporting et développement assisté par IA.',
    },
    technologies: [
      'Git',
      'Postman',
      'JasperReports',
      'Jaspersoft Studio',
      'npm',
      'Node.js',
      'AI-assisted workflows',
    ],
  },
]
