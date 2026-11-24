import { onBeforeUnmount, watchEffect, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { site } from '@/config/site'

interface SeoInput {
  title: string
  description: string
  /** Relative path for canonical/og:url, e.g. '/projects'. */
  path?: string
  /** Absolute URL of a share image; falls back to /og.png when present. */
  image?: string | null
}

function upsertMeta(selector: string, attributes: Record<string, string>): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const key = selector.match(/\[(\w+)="/)?.[1]
    if (key) el.setAttribute(key, attributes[key] ?? '')
    document.head.appendChild(el)
  }
  for (const [name, value] of Object.entries(attributes)) {
    el.setAttribute(name, value)
  }
}

function upsertCanonical(href: string | null): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el && href) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  if (el) {
    if (href) el.setAttribute('href', href)
    else el.remove()
  }
}

/**
 * Per-route SEO: document title, description, Open Graph and Twitter cards,
 * canonical link. Canonical/og:url are only emitted when a site URL is
 * configured (VITE_SITE_URL) so no fake domain is ever published.
 */
export function useSeo(input: Ref<SeoInput>): void {
  const route = useRoute()
  const { locale } = useI18n()

  const stop = watchEffect(
    () => {
      const { title, description, image } = input.value
      const path = input.value.path ?? route.path
      const base = site.url.replace(/\/$/, '')
      const url = base ? `${base}${path}` : null

      document.title = title
      upsertMeta('meta[name="description"]', { name: 'description', content: description })
      upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
      upsertMeta('meta[property="og:description"]', {
        property: 'og:description',
        content: description,
      })
      upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
      if (url) upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
      upsertMeta('meta[name="twitter:card"]', {
        name: 'twitter:card',
        content: 'summary_large_image',
      })
      upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
      upsertMeta('meta[name="twitter:description"]', {
        name: 'twitter:description',
        content: description,
      })

      const imageUrl = image ? (base ? `${base}${image}` : image) : null
      if (imageUrl) {
        upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
      }

      upsertMeta('meta[name="og:locale"]', {
        name: 'og:locale',
        content: locale.value === 'fr' ? 'fr_MA' : 'en_US',
      })
      upsertCanonical(url)
    },
    { flush: 'post' },
  )

  onBeforeUnmount(stop)
}
