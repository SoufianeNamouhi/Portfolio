<script setup lang="ts">
import { ArrowUpRight, Menu } from 'lucide-vue-next'
import { profile } from '~/data/profile'

const route = useRoute()
const menuOpen = ref(false)

const links = [
  { id: '01', label: 'Home', to: '/' },
  { id: '02', label: 'Projects', to: '/projects' },
  { id: '03', label: 'Stack', to: '/stack' },
  { id: '04', label: 'About', to: '/about' },
  { id: '05', label: 'Writing', to: '/writing' },
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b bg-background/80 backdrop-blur-md transition-colors"
    :class="scrolled ? 'border-border' : 'border-transparent'"
  >
    <div class="container-page flex h-16 items-center justify-between md:h-20">
      <NuxtLink to="/" class="flex items-center gap-1.5 whitespace-nowrap" aria-label="Soufiane Namouhi, home">
        <span class="font-display text-base font-bold tracking-tight md:text-lg">{{ profile.name }}</span>
        <span class="mt-1 block size-2 bg-primary" aria-hidden="true" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group relative font-mono text-sm"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          <span class="mr-1.5 text-text-muted transition-colors group-hover:text-accent">{{
            link.id
          }}</span>
          <span
            class="font-medium transition-colors"
            :class="isActive(link.to) ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'"
            >{{ link.label }}</span
          >
          <span
            class="absolute -bottom-2 left-0 h-0.5 bg-accent transition-all duration-300"
            :class="isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <span
          v-if="profile.availability.show"
          class="hidden items-center gap-2 font-mono text-xs text-text-secondary xl:flex"
        >
          <span class="dot-live size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {{ profile.availability.label }}
        </span>

        <span class="hidden sm:block">
          <NuxtLink to="/contact" class="btn-outline py-2! px-4! text-sm">
            Get in touch
            <ArrowUpRight class="size-4" />
          </NuxtLink>
        </span>

        <button
          type="button"
          class="grid size-11 place-items-center rounded-xl border border-border lg:hidden"
          aria-label="Open menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        >
          <Menu class="size-5" />
        </button>
      </div>
    </div>

    <LayoutMobileNavigation v-model:open="menuOpen" :links="links" />
  </header>
</template>
