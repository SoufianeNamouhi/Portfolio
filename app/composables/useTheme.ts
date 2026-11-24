type Theme = 'dark' | 'light'
const STORAGE_KEY = 'sn-theme'

/** Dark by default; persists the explicit choice and respects system preference. */
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark')

  function apply(value: Theme) {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.classList.toggle('light', value === 'light')
    }
  }

  onMounted(() => {
    let initial: Theme = 'dark'
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored === 'light' || stored === 'dark') {
        initial = stored
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        initial = 'light'
      }
    } catch {
      /* storage unavailable */
    }
    apply(initial)
  })

  function toggle() {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    apply(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }

  return { theme, toggle }
}
