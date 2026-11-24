import type { Profile } from '~/types/content'

/**
 * Single source of truth for personal information.
 * Fields marked PLACEHOLDER stay disabled in the UI until real values are provided.
 */
export const profile: Profile = {
  name: 'Soufiane Namouhi',
  firstName: 'Soufiane',
  monogram: 'SN',
  title: 'Software Developer',
  location: 'Casablanca, Morocco',
  timezone: 'Africa/Casablanca',
  company: 'KAY Technology',
  yearsOfExperience: '3+',
  education: 'Diplôme de Technicien Spécialisé (DTS), Bac+2 — 2021',
  availability: {
    show: false,
    label: 'Open to new opportunities',
  },
  cvUrl: null, // PLACEHOLDER — e.g. '/documents/soufiane-namouhi-cv.pdf'
  portraitUrl: null, // PLACEHOLDER — e.g. '/images/portrait.webp'
  social: {
    email: null, // PLACEHOLDER — e.g. 'hello@soufianenamouhi.dev'
    github: null, // PLACEHOLDER — e.g. 'https://github.com/username'
    linkedin: null, // PLACEHOLDER — e.g. 'https://www.linkedin.com/in/username'
  },
}
