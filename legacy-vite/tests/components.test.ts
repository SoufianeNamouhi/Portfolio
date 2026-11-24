import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import CopyButton from '@/components/ui/CopyButton.vue'
import LangSwitcher from '@/components/ui/LangSwitcher.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { i18n, setLocale } from '@/i18n'
import { testRoutes } from './fixtures/routes'

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: testRoutes })
}

function mountWithPlugins(component: object, options: Record<string, unknown> = {}) {
  const router = createTestRouter()
  return mount(component as never, {
    global: {
      plugins: [createPinia(), router, i18n],
    },
    ...options,
  })
}

describe('CopyButton', () => {
  it('copies the value to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const wrapper = mountWithPlugins(CopyButton, { props: { value: 'hello@example.com' } })
    await wrapper.trigger('click')
    expect(writeText).toHaveBeenCalledWith('hello@example.com')
    expect(wrapper.text()).toContain('Copied')
  })
})

describe('LangSwitcher', () => {
  it('switches the active locale and persists it', async () => {
    setLocale('en')
    const wrapper = mountWithPlugins(LangSwitcher)
    const frButton = wrapper.findAll('button').find((b) => b.text() === 'FR')!
    await frButton.trigger('click')
    expect(i18n.global.locale.value).toBe('fr')
    expect(localStorage.getItem('sn-portfolio-locale')).toBe('fr')
    setLocale('en')
  })
})

describe('ThemeToggle', () => {
  it('toggles the document theme', async () => {
    const wrapper = mountWithPlugins(ThemeToggle)
    const before = document.documentElement.dataset.theme
    await wrapper.trigger('click')
    expect(document.documentElement.dataset.theme).toBe(before === 'dark' ? 'light' : 'dark')
    await wrapper.trigger('click')
    expect(document.documentElement.dataset.theme).toBe(before)
  })
})

describe('AppButton', () => {
  it('renders an internal router link when "to" is provided', () => {
    const wrapper = mountWithPlugins(AppButton, {
      props: { to: '/projects' },
      slots: { default: 'Go' },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/projects')
  })

  it('disables the click when marked disabled', async () => {
    const onClick = vi.fn()
    const wrapper = mountWithPlugins(AppButton, {
      props: { disabled: true },
      attrs: { onClick },
      slots: { default: 'Nope' },
    })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('i18n rendering pipeline', () => {
  it('translates a nav label reactively', async () => {
    setLocale('en')
    const wrapper = mountWithPlugins(AppButton, {
      props: { to: '/projects' },
      slots: { default: () => i18n.global.t('nav.projects') },
    })
    expect(wrapper.text()).toBe('Projects')
    setLocale('fr')
    await nextTick()
    expect(wrapper.text()).toBe('Projets')
    setLocale('en')
  })
})
