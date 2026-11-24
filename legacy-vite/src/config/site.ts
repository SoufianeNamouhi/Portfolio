/**
 * Central site configuration — the single source of truth for identity and
 * contact channels. Everything a future maintainer needs to personalize the
 * portfolio lives here.
 *
 * IMPORTANT: no contact information has been invented. Fill the `null` values
 * below with real, verified details before publishing. The UI renders
 * intentional, configuration-safe states for every `null` value.
 */
export const site = {
  name: 'Soufiane NAMOUHI',
  firstName: 'Soufiane',
  lastName: 'NAMOUHI',
  monogram: 'SN',
  role: 'Full-Stack Web Developer',
  location: 'Casablanca, Morocco',
  company: 'KAY Technology',
  /** Approximately — phrased without fabricated precision. */
  experience: '3+ years',

  /** Set to true only if Soufiane explicitly wants to signal availability. */
  availableForWork: false as boolean,

  /** null = channel intentionally hidden until verified. */
  email: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  resumeUrl: null as string | null,

  /** Canonical origin, without trailing slash. Override via VITE_SITE_URL. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',
  defaultLocale: 'en' as const,
  locales: ['en', 'fr'] as const,
} as const

export type Site = typeof site
