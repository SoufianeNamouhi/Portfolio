import { describe, expect, it } from 'vitest'
import { adjacentProjects, getProject, projects } from '@/content/projects'
import { experience } from '@/content/experience'
import { stack } from '@/content/stack'
import en from '@/i18n/locales/en.json'
import fr from '@/i18n/locales/fr.json'

describe('project content integrity', () => {
  it('has unique slugs and editorial indexes', () => {
    const slugs = projects.map((p) => p.slug)
    const indexes = projects.map((p) => p.index)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(new Set(indexes).size).toBe(indexes.length)
  })

  it('covers every localized field in both languages', () => {
    for (const project of projects) {
      for (const field of ['category', 'summary', 'overview', 'context', 'approach'] as const) {
        expect(project[field].en.trim().length).toBeGreaterThan(0)
        expect(project[field].fr.trim().length).toBeGreaterThan(0)
      }
      for (const list of ['challenges', 'responsibilities', 'features'] as const) {
        expect(project[list].length).toBeGreaterThan(0)
        for (const item of project[list]) {
          expect(item.en.trim().length).toBeGreaterThan(0)
          expect(item.fr.trim().length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('flags every case study as draft (confidentiality constraint)', () => {
    for (const project of projects) {
      expect(project.draft).toBe(true)
    }
  })

  it('never publishes unverified years or metrics', () => {
    for (const project of projects) {
      // Years stay null until verified; no invented percentages or big numbers.
      expect(project.year).toBeNull()
      for (const text of [project.summary.en, project.overview.en]) {
        expect(text).not.toMatch(/%|\d{3,}/)
      }
    }
  })

  it('lists technologies for every project', () => {
    for (const project of projects) {
      expect(project.technologies.length).toBeGreaterThan(3)
    }
  })

  it('resolves adjacency for navigation', () => {
    const { prev, next } = adjacentProjects(projects[0].slug)
    expect(prev.slug).toBe(projects[projects.length - 1].slug)
    expect(next.slug).toBe(projects[1].slug)
    expect(getProject('does-not-exist')).toBeUndefined()
    expect(getProject(projects[2].slug)?.name).toBe(projects[2].name)
  })
})

describe('structured content', () => {
  it('journey entries are complete in both locales', () => {
    expect(experience.length).toBeGreaterThanOrEqual(3)
    for (const entry of experience) {
      expect(
        entry.title.en && entry.title.fr && entry.description.en && entry.description.fr,
      ).toBeTruthy()
    }
  })

  it('stack categories contain items with notes', () => {
    expect(stack.length).toBeGreaterThanOrEqual(4)
    for (const category of stack) {
      expect(category.items.length).toBeGreaterThan(0)
      for (const item of category.items) {
        expect(item.note.en.trim().length).toBeGreaterThan(0)
        expect(item.note.fr.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('locale files expose identical key sets', () => {
    const flatten = (obj: Record<string, unknown>, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([key, value]) =>
        typeof value === 'object' && value !== null
          ? flatten(value as Record<string, unknown>, `${prefix}${key}.`)
          : [`${prefix}${key}`],
      )
    const enKeys = flatten(en as unknown as Record<string, unknown>).sort()
    const frKeys = flatten(fr as unknown as Record<string, unknown>).sort()
    expect(enKeys).toEqual(frKeys)
  })
})
