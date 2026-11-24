<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { profile } from '~/data/profile'

const { time } = useLocalTime()
const year = new Date().getFullYear()

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Stack', to: '/stack' },
  { label: 'About', to: '/about' },
  { label: 'Writing', to: '/writing' },
  { label: 'Contact', to: '/contact' },
]

const socials = computed(() =>
  [
    { label: 'GitHub', href: profile.social.github },
    { label: 'LinkedIn', href: profile.social.linkedin },
  ].filter((s) => s.href),
)
</script>

<template>
  <footer class="mt-32 border-t border-border">
    <div class="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <p class="font-display text-xl font-bold tracking-tight">{{ profile.name }}</p>
        <p class="text-body-gray mt-4 max-w-xs text-sm">
          Building reliable enterprise web applications and modern frontend experiences with
          Vue.js, Java and PostgreSQL.
        </p>
      </div>

      <nav aria-label="Footer pages">
        <p class="section-label text-xs">// Pages</p>
        <ul class="mt-5 space-y-3">
          <li v-for="page in pages" :key="page.to">
            <NuxtLink
              :to="page.to"
              class="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >{{ page.label }}</NuxtLink
            >
          </li>
          <li v-if="profile.cvUrl">
            <a
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >Resume <ArrowUpRight class="size-3.5"
            /></a>
          </li>
        </ul>
      </nav>

      <nav v-if="socials.length" aria-label="Social profiles">
        <p class="section-label text-xs">// Social</p>
        <ul class="mt-5 space-y-3">
          <li v-for="social in socials" :key="social.label">
            <a
              :href="social.href!"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >{{ social.label }} <ArrowUpRight class="size-3.5"
            /></a>
          </li>
        </ul>
      </nav>
    </div>

    <div
      class="container-page flex flex-col gap-3 border-t border-border py-6 font-mono text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between"
    >
      <ClientOnly>
        <p class="flex items-center gap-2">
          <span class="dot-live size-1.5 rounded-full bg-primary" aria-hidden="true" />
          Local time, {{ profile.location }}<span v-if="time">&nbsp;{{ time }}</span>
        </p>
      </ClientOnly>
      <p>© {{ year }} {{ profile.name }}. Engineered in Morocco.</p>
    </div>

    <div class="select-none overflow-hidden" aria-hidden="true">
      <p class="giant-name">{{ profile.name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.giant-name {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.04em;
  white-space: nowrap;
  text-align: center;
  font-size: clamp(3.5rem, 12.5vw, 13rem);
  line-height: 0.85;
  margin-bottom: -0.14em;
  background: linear-gradient(180deg, var(--text-primary) 30%, var(--primary) 130%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.9;
}
</style>
