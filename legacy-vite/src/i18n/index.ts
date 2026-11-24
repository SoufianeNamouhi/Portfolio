import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import { site } from '@/config/site'

export type Locale = 'en' | 'fr'

const STORAGE_KEY = 'sn-portfolio-locale'

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'fr') return saved
  } catch {
    /* storage unavailable — fall through */
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('fr')) {
    return 'fr'
  }
  return site.defaultLocale
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { en, fr },
})

export function setLocale(locale: Locale): void {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* private mode — persistence best-effort */
  }
}

/** Initialize document lang on boot. */
export function initI18n(): void {
  document.documentElement.lang = i18n.global.locale.value
}
