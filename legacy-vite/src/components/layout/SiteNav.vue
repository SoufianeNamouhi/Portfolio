<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useEventListener, useScroll, useScrollLock } from '@vueuse/core'
import { ArrowUpRight, Menu, X } from '@lucide/vue'
import { gsap } from '@/lib/gsap'
import { site } from '@/config/site'
import AppButton from '@/components/ui/AppButton.vue'
import LangSwitcher from '@/components/ui/LangSwitcher.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const { t } = useI18n()
const route = useRoute()
const { y } = useScroll(window)
const menuOpen = ref(false)
const burger = ref<HTMLButtonElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const overlay = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(document.body)
let menuCtx: gsap.Context | null = null

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
] as const

function openMenu() {
  menuOpen.value = true
  isLocked.value = true
  nextTick(() => {
    closeButton.value?.focus()
    if (overlay.value) {
      menuCtx = gsap.context(() => {
        gsap.fromTo(
          '[data-menu-panel]',
          { yPercent: -4, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        )
        gsap.fromTo(
          '[data-menu-link]',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.1, ease: 'power3.out' },
        )
      }, overlay.value)
    }
  })
}

function closeMenu(restoreFocus = true) {
  if (!menuOpen.value) return
  menuCtx?.revert()
  menuOpen.value = false
  isLocked.value = false
  if (restoreFocus) burger.value?.focus()
}

useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
})

watch(
  () => route.fullPath,
  () => closeMenu(false),
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-all duration-500"
    :class="
      y > 24 ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent'
    "
  >
    <div class="wrap flex h-16 items-center justify-between md:h-20">
      <RouterLink
        :to="{ name: 'home' }"
        class="group flex items-center gap-3"
        :aria-label="t('a11y.logo')"
      >
        <span
          class="grid size-9 place-items-center border border-line font-display text-sm font-bold tracking-tight transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
          aria-hidden="true"
        >
          {{ site.monogram }}
        </span>
        <span class="hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted sm:block">
          {{ site.name }}
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-8 lg:flex" :aria-label="t('common.menuLabel')">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="link-underline py-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-text"
          :class="route.path === link.to ? 'text-accent [background-size:100%_1px]' : ''"
        >
          {{ t(link.key) }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <LangSwitcher class="hidden sm:flex" />
        <ThemeToggle />
        <AppButton to="/contact" size="md" class="hidden lg:inline-flex">
          {{ t('nav.cta') }}
          <ArrowUpRight
            :size="14"
            class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </AppButton>
        <button
          ref="burger"
          type="button"
          class="grid size-10 cursor-pointer place-items-center rounded-full border border-line text-text lg:hidden"
          :aria-label="t('nav.openMenu')"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="openMenu"
        >
          <Menu :size="18" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div
      v-if="menuOpen"
      id="mobile-menu"
      ref="overlay"
      class="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden"
      role="dialog"
      aria-modal="true"
      :aria-label="t('common.menuLabel')"
    >
      <div data-menu-panel class="flex h-16 items-center justify-between border-b border-line px-5">
        <span class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {{ site.name }}
        </span>
        <button
          ref="closeButton"
          type="button"
          class="grid size-10 cursor-pointer place-items-center rounded-full border border-line text-text"
          :aria-label="t('nav.close')"
          @click="closeMenu()"
        >
          <X :size="18" aria-hidden="true" />
        </button>
      </div>

      <nav
        class="flex flex-1 flex-col justify-center gap-2 px-6"
        :aria-label="t('common.menuLabel')"
      >
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          data-menu-link
          class="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-semibold tracking-tight transition-colors"
          :class="route.path === link.to ? 'text-accent' : 'text-text'"
        >
          <span class="font-mono text-xs text-muted">0{{ links.indexOf(link) + 1 }}</span>
          {{ t(link.key) }}
        </RouterLink>
      </nav>

      <div data-menu-link class="flex items-center justify-between border-t border-line p-5">
        <LangSwitcher />
        <span class="tag">{{ site.location }}</span>
      </div>
    </div>
  </Teleport>
</template>
