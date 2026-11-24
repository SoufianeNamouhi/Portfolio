import type { Technology } from '~/types/content'

/**
 * Keyboard content. `years` stays null unless a duration is verified —
 * the board hides unverified numbers instead of inventing them.
 */
export const technologies: Technology[] = [
  {
    id: 'vue',
    name: 'Vue.js',
    group: 'frontend',
    years: '3y',
    usage: 'Daily',
    description:
      'Primary frontend framework. Used for building enterprise applications, complex business interfaces, reusable components and responsive dashboards.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    group: 'frontend',
    years: '3y',
    usage: 'Daily',
    description:
      'Core language of every project. Async data flows, DOM-heavy interfaces and the business logic that lives in the browser.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    group: 'frontend',
    years: null,
    usage: 'Frequent',
    description:
      'Static typing where it pays off: API contracts, component props and shared models across larger codebases.',
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    group: 'frontend',
    years: '3y',
    usage: 'Daily',
    description:
      'Semantic document structure, accessible markup and responsive layouts. The layer everything else stands on.',
  },
  {
    id: 'vuetify',
    name: 'Vuetify',
    group: 'frontend',
    years: '3y',
    usage: 'Daily',
    description:
      'Component framework used across enterprise Vue applications: data tables, forms and navigation patterns built for dense operational screens.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    group: 'frontend',
    years: null,
    usage: 'Frequent',
    description:
      'Utility-first styling for custom interfaces — including this portfolio — with design tokens mapped to CSS custom properties.',
  },
  {
    id: 'java',
    name: 'Java',
    group: 'backend',
    years: '3y',
    usage: 'Daily',
    description:
      'Backend language of the enterprise systems I work on: services, business rules and integrations behind the frontend.',
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    group: 'backend',
    years: '3y',
    usage: 'Daily',
    description:
      'REST API development and application services. Endpoints consumed by Vue frontends, with Hibernate/JPA for persistence.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    group: 'backend',
    years: '3y',
    usage: 'Daily',
    description:
      'Relational database behind the applications I maintain: schema work, queries and the data that feeds operational and reporting screens.',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    group: 'backend',
    years: '3y',
    usage: 'Daily',
    description:
      'Designing and consuming REST contracts between frontend and backend — the seam where most of my daily work happens.',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    group: 'mobile',
    years: null,
    usage: 'Occasional',
    description:
      'Cross-platform mobile development. Additional experience alongside the primary web stack.',
  },
  {
    id: 'dart',
    name: 'Dart',
    group: 'mobile',
    years: null,
    usage: 'Occasional',
    description: 'Language of Flutter work: widgets, state and mobile UI patterns.',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    group: 'tools',
    years: '3y',
    usage: 'Daily',
    description:
      'Version control for every project: branch discipline, reviewable commits and a history that explains itself.',
  },
  {
    id: 'vite',
    name: 'Vite',
    group: 'tools',
    years: null,
    usage: 'Frequent',
    description:
      'Build tooling for modern Vue applications — fast dev server and lean production bundles.',
  },
  {
    id: 'tomcat',
    name: 'Apache Tomcat',
    group: 'tools',
    years: null,
    usage: 'Frequent',
    description: 'Servlet container used to deploy and run Java backend applications.',
  },
  {
    id: 'jasper',
    name: 'JasperReports',
    group: 'tools',
    years: null,
    usage: 'Frequent',
    description:
      'Reporting engine used for document generation: operational reports and printable business documents from application data.',
  },
]

export const technologyGroups = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'tools', label: 'Tools & Infrastructure' },
] as const
