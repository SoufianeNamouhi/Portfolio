export interface SocialLinks {
  /** PLACEHOLDER: provide the real address to enable the contact row. */
  email: string | null
  /** PLACEHOLDER: provide the real profile URL to enable the GitHub links. */
  github: string | null
  /** PLACEHOLDER: provide the real profile URL to enable the LinkedIn links. */
  linkedin: string | null
}

export interface Profile {
  name: string
  firstName: string
  monogram: string
  title: string
  location: string
  timezone: string
  company: string
  yearsOfExperience: string
  education: string
  availability: {
    /** Set false to hide the availability indicator site-wide. */
    show: boolean
    label: string
  }
  /** PLACEHOLDER: path under /public (e.g. /documents/cv.pdf). Null hides every CV action. */
  cvUrl: string | null
  /** PLACEHOLDER: path under /public (e.g. /images/portrait.webp). Null renders the monogram hero visual. */
  portraitUrl: string | null
  social: SocialLinks
}

export interface ProjectCaseSection {
  label: string
  title: string
  body: string[]
}

export interface ProjectChallenge {
  title: string
  body: string
}

export interface Project {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  featured: boolean
  /** Professional work: no public repo/demo. Shows a discreet confidentiality label. */
  professional: boolean
  draft: boolean
  year: string | null
  role: string
  stack: string[]
  highlights: string[]
  responsibilities: string[]
  sections: ProjectCaseSection[]
  challenges: ProjectChallenge[]
  /** Conceptual visual theme used by the generated placeholder artwork. */
  visual: 'dashboard' | 'portal' | 'logistics' | 'operations' | 'reporting'
}

export interface Technology {
  id: string
  name: string
  group: 'frontend' | 'backend' | 'mobile' | 'tools'
  /** Verified duration only; null hides the duration badge. */
  years: string | null
  usage: string
  description: string
}

export interface ExperienceEntry {
  id: string
  period: string
  /** Decorative git-style identifier — visual element only, not a real commit reference. */
  ref: string
  branch: string
  title: string
  body: string
  tags: string[]
  current: boolean
}
