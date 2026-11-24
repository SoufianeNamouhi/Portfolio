import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { setLocale } from '@/i18n'

describe('theme store', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
    setActivePinia(createPinia())
  })

  it('toggles between dark and light and applies data-theme', () => {
    const store = useThemeStore()
    expect(store.theme).toBe('dark')
    store.toggle()
    expect(store.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    store.toggle()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('persists the preference to localStorage', () => {
    const store = useThemeStore()
    store.setTheme('light')
    expect(localStorage.getItem('sn-portfolio-theme')).toBe('light')
  })

  it('restores a saved preference', () => {
    localStorage.setItem('sn-portfolio-theme', 'light')
    setActivePinia(createPinia())
    const store = useThemeStore()
    expect(store.theme).toBe('light')
  })
})

describe('locale switching', () => {
  beforeEach(() => localStorage.clear())

  it('updates document lang and persists', async () => {
    setLocale('fr')
    expect(document.documentElement.lang).toBe('fr')
    expect(localStorage.getItem('sn-portfolio-locale')).toBe('fr')
    setLocale('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
