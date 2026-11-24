import type { ExperienceEntry } from '@/types/content'

/**
 * Professional journey. Dates are intentionally approximate — no exact hiring
 * dates are invented. Edit freely once real dates are confirmed.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'dts-2021',
    period: { en: '2021', fr: '2021' },
    title: { en: 'DTS Diploma — Bac+2', fr: 'Diplôme DTS — Bac+2' },
    place: 'Morocco',
    description: {
      en: 'Obtained the Diplôme de Technicien Spécialisé, the foundation of a career built on practical software craftsmanship.',
      fr: 'Obtention du Diplôme de Technicien Spécialisé, socle d’une carrière construite sur le craftsmanship logiciel pratique.',
    },
  },
  {
    id: 'kay-technology',
    period: { en: 'Professional experience', fr: 'Expérience professionnelle' },
    title: { en: 'Full-Stack Web Developer', fr: 'Développeur Web Full-Stack' },
    place: 'KAY Technology — Casablanca',
    highlight: true,
    description: {
      en: 'Designing and building enterprise applications with Vue 3 frontends and Java/Spring Boot backends: business workflows, reporting, data-heavy dashboards and production maintenance.',
      fr: 'Conception et développement d’applications d’entreprise avec des frontends Vue 3 et des backends Java/Spring Boot : flux métier, reporting, tableaux de bord denses en données et maintenance en production.',
    },
  },
  {
    id: 'current',
    period: { en: 'Today', fr: 'Aujourd’hui' },
    title: {
      en: 'Full-Stack Development & Enterprise Applications',
      fr: 'Développement full-stack & applications d’entreprise',
    },
    place: 'Casablanca, Morocco',
    description: {
      en: 'Focused on complex interfaces, backend integrations and reporting systems — and on getting a little better at this craft every day.',
      fr: 'Concentré sur les interfaces complexes, les intégrations backend et les systèmes de reporting — et sur le fait de progresser un peu plus chaque jour dans ce métier.',
    },
  },
]
