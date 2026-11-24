import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'sn-portfolio-theme'

function detectTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* storage unavailable */
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: light)').matches
  ) {
    return 'light'
  }
  return 'dark'
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode — persistence best-effort */
  }
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(detectTheme())
  applyTheme(theme.value)

  function commit(value: Theme): void {
    theme.value = value
    applyTheme(value)
    persistTheme(value)
  }

  function toggle(): void {
    commit(theme.value === 'dark' ? 'light' : 'dark')
  }

  function setTheme(value: Theme): void {
    commit(value)
  }

  return { theme, toggle, setTheme }
})
