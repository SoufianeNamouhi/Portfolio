<script setup lang="ts">
import SiteNav from '@/components/layout/SiteNav.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import Preloader from '@/components/layout/Preloader.vue'
import CursorFx from '@/components/layout/CursorFx.vue'
import ScrollProgress from '@/components/layout/ScrollProgress.vue'
</script>

<template>
  <Preloader />
  <CursorFx />
  <ScrollProgress />

  <a
    href="#main"
    class="sr-only z-[70] rounded-full bg-accent px-4 py-2 font-mono text-xs text-[#090a0d] focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
  >
    Skip to content
  </a>

  <SiteNav />

  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <main id="main" :key="$route.name" class="min-h-screen">
        <component :is="Component" />
      </main>
    </Transition>
  </RouterView>

  <SiteFooter />
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
