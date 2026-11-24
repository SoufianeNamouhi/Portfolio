/** A piece of content available in both supported locales. */
export interface Localized {
  en: string
  fr: string
}

export type ProjectKind = 'professional' | 'personal'

export interface Project {
  slug: string
  name: string
  /** Two-digit editorial index, e.g. "01". */
  index: string
  /** Year only when verified; null keeps it hidden. */
  year: string | null
  kind: ProjectKind
  /**
   * Draft case studies contain high-level, reviewable summaries only.
   * Details must be verified by the developer before publication.
   */
  draft: boolean
  category: Localized
  /** Short listing copy. */
  summary: Localized
  /** Longer case-study overview. */
  overview: Localized
  context: Localized
  challenges: Localized[]
  responsibilities: Localized[]
  approach: Localized
  features: Localized[]
  technologies: string[]
  /** Base hue (0-360) driving the conceptual project visual. */
  accentHue: number
}

export interface ExperienceEntry {
  id: string
  period: Localized
  title: Localized
  place: string
  description: Localized
  highlight?: boolean
}

export interface ExpertiseArea {
  id: string
  index: string
  title: Localized
  description: Localized
  technologies: string[]
}

export interface ProcessStep {
  index: string
  title: Localized
  description: Localized
  detail: Localized
}

export interface StackCategory {
  id: string
  title: Localized
  items: StackItem[]
}

export interface StackItem {
  name: string
  note: Localized
}
