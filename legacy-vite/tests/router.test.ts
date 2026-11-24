import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { projects } from '@/content/projects'
import { testRoutes } from './fixtures/routes'

const makeRouter = () => createRouter({ history: createMemoryHistory(), routes: testRoutes })

describe('routing', () => {
  it('resolves a route for every project slug', async () => {
    const router = makeRouter()
    for (const project of projects) {
      const resolved = router.resolve(`/projects/${project.slug}`)
      expect(resolved.name).toBe('project')
      expect(resolved.params.slug).toBe(project.slug)
    }
  })

  it('maps unknown project slugs and arbitrary paths to not-found', async () => {
    const router = makeRouter()
    expect(router.resolve('/projects/secret-project').name).toBe('project')
    expect(router.resolve('/no-such-page').name).toBe('not-found')
    expect(router.resolve('/deeply/nested/missing').name).toBe('not-found')
  })

  it('marks the four primary routes as navigation entries', () => {
    const navRoutes = testRoutes.filter((r) => (r.meta as { nav?: boolean } | undefined)?.nav)
    expect(navRoutes.map((r) => r.name)).toEqual(['home', 'projects', 'about', 'contact'])
  })
})
