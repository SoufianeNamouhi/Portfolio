<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUp } from '@lucide/vue'
import { site } from '@/config/site'

const { t } = useI18n()
const year = new Date().getFullYear()

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
] as const

const channels: { key: string; url: string | null; label: string }[] = [
  { key: 'Email', url: site.email ? `mailto:${site.email}` : null, label: site.email ?? '' },
  { key: 'GitHub', url: site.github, label: 'GitHub' },
  { key: 'LinkedIn', url: site.linkedin, label: 'LinkedIn' },
]

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t border-line">
    <div class="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
      <div>
        <p class="font-display text-2xl font-semibold tracking-tight">{{ site.name }}</p>
        <p class="mt-3 max-w-xs text-sm text-muted">{{ site.role }} — {{ site.location }}.</p>
        <p class="tag mt-6">{{ t('common.footer.builtWith') }}</p>
      </div>

      <nav :aria-label="t('common.menuLabel')">
        <p class="tag mb-5">{{ t('nav.menu') }}</p>
        <ul class="space-y-3">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="link-underline text-sm text-muted transition-colors hover:text-text"
            >
              {{ t(link.key) }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <p class="tag mb-5">{{ t('home.contact.channels') }}</p>
        <ul class="space-y-3">
          <li v-for="channel in channels" :key="channel.key">
            <a
              v-if="channel.url"
              :href="channel.url"
              class="link-underline text-sm text-muted transition-colors hover:text-text"
              :aria-label="channel.key"
            >
              {{ channel.label }}
            </a>
            <span v-else class="text-sm text-line">{{ channel.key }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-line">
      <div class="wrap flex h-16 items-center justify-between">
        <p class="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          © {{ year }} {{ site.name }}
        </p>
        <p class="hidden font-mono text-[0.68rem] uppercase tracking-[0.18em] text-line sm:block">
          SN — Casablanca
        </p>
        <button
          type="button"
          class="group inline-flex cursor-pointer items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
          :aria-label="t('common.footer.backToTop')"
          @click="backToTop"
        >
          {{ t('common.footer.backToTop') }}
          <ArrowUp
            :size="13"
            class="transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </footer>
</template>
