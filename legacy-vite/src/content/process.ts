import type { ProcessStep } from '@/types/content'

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: { en: 'Understand', fr: 'Comprendre' },
    description: {
      en: 'Before any code: what is the business actually trying to achieve, who uses it, and what does “done right” look like for them?',
      fr: 'Avant tout code : que cherche réellement le métier, qui l’utilise, et à quoi ressemble « bien fait » pour eux ?',
    },
    detail: {
      en: 'Requirements · Domain vocabulary · Edge cases',
      fr: 'Exigences · Vocabulaire métier · Cas limites',
    },
  },
  {
    index: '02',
    title: { en: 'Structure', fr: 'Structurer' },
    description: {
      en: 'Data models, API contracts and component boundaries are decided up front, so the build phase is assembly — not improvisation.',
      fr: 'Modèles de données, contrats d’API et frontières de composants sont décidés en amont, pour que la construction soit un assemblage — pas une improvisation.',
    },
    detail: {
      en: 'Typed contracts · State ownership · Module design',
      fr: 'Contrats typés · Propriété d’état · Design de modules',
    },
  },
  {
    index: '03',
    title: { en: 'Build', fr: 'Construire' },
    description: {
      en: 'Iterative implementation with working software early. Screens come alive one at a time, each integrated with real data as soon as possible.',
      fr: 'Implémentation itérative avec un logiciel fonctionnel tôt. Les écrans prennent vie un à un, chacun intégré avec de vraies données dès que possible.',
    },
    detail: {
      en: 'Vertical slices · Real data early · Daily runs',
      fr: 'Tranches verticales · Vraies données tôt · Exécutions quotidiennes',
    },
  },
  {
    index: '04',
    title: { en: 'Refine', fr: 'Affiner' },
    description: {
      en: 'The last 10% carries half the perceived quality: feedback states, empty states, loading behavior, and the small interactions that make software feel solid.',
      fr: 'Les 10 % finaux portent la moitié de la qualité perçue : états de feedback, états vides, comportements de chargement et petites interactions qui rendent un logiciel solide.',
    },
    detail: {
      en: 'Edge cases · Micro-interactions · Performance',
      fr: 'Cas limites · Micro-interactions · Performance',
    },
  },
]
