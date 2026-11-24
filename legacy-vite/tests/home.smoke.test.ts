import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import { i18n } from '@/i18n'
import { router as appRouter } from '@/router'
import { testRoutes } from './fixtures/routes'
import HomeView from '@/views/HomeView.vue'

describe('home view smoke test', () => {
  it('renders the hero heading and sections', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes: testRoutes })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: { plugins: [createPinia(), router, i18n] },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.text()).toContain('Building digital')
  })

  it('app shell mounts without errors', async () => {
    const app = createApp(App)
    app.use(createPinia())
    app.use(i18n)
    app.use(appRouter)
    await appRouter.isReady()
    const el = document.createElement('div')
    document.body.appendChild(el)
    app.mount(el)
    await new Promise((r) => setTimeout(r, 100))
    expect(el.querySelector('header')).toBeTruthy()
    app.unmount()
    el.remove()
  })
})
