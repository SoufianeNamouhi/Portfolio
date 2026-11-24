import type { ExperienceEntry } from '~/types/content'

/**
 * Career timeline entries. Dates are deliberately coarse — only confirmed
 * milestones are listed. `ref` values are decorative visual identifiers,
 * not references to real commits.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'now',
    period: 'Now',
    ref: 'HEAD',
    branch: 'main',
    title: 'Full-stack development on enterprise systems',
    body: 'Developing and maintaining enterprise web applications at KAY Technology: Vue.js frontends, Spring Boot backends, PostgreSQL data layers and the business workflows that connect them.',
    tags: ['Vue.js', 'Spring Boot', 'PostgreSQL'],
    current: true,
  },
  {
    id: 'growth',
    period: 'Ongoing',
    ref: 'feat/growth',
    branch: 'main',
    title: 'Growing responsibility across projects',
    body: 'From single modules to contributions across multiple enterprise applications — logistics platforms, customer portals, reporting workflows — with increasing ownership of frontend architecture and API integration.',
    tags: ['TypeScript', 'Vuetify', 'REST APIs'],
    current: false,
  },
  {
    id: 'start',
    period: 'Career start',
    ref: 'feat/career',
    branch: 'main',
    title: 'First professional role in software development',
    body: 'Started professional development work on real production systems: learning how business requirements become software, and how much maintenance, reliability and clarity matter once users depend on your code.',
    tags: ['Java', 'Vue.js', 'SQL'],
    current: false,
  },
  {
    id: 'education',
    period: '2021',
    ref: 'init',
    branch: 'main',
    title: 'Diplôme de Technicien Spécialisé (DTS), Bac+2',
    body: 'Completed the DTS qualification — the foundation: programming fundamentals, databases, web technologies and the first projects that made software a career direction.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    current: false,
  },
]
