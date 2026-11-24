<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@lucide/vue'
import { gsap } from '@/lib/gsap'
import { usePreferredReducedMotion } from '@vueuse/core'
import AppButton from '@/components/ui/AppButton.vue'
import HeroCanvas from '@/components/sections/HeroCanvas.vue'

const { t } = useI18n()
const reducedMotion = usePreferredReducedMotion()
const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (reducedMotion.value === 'reduce' || !root.value) return
  ctx = gsap.context(() => {
    // Initial states are set in JS (not CSS classes) so content stays visible
    // whenever animation cannot run.
    gsap.set('[data-hero-label], [data-hero-copy], [data-hero-cta], [data-hero-cue]', { opacity: 0 })
    gsap.set('[data-hero-line] span', { yPercent: 115 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo('[data-hero-label]', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
      .to('[data-hero-line] span', { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.15)
      .fromTo('[data-hero-copy]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.55)
      .fromTo(
        '[data-hero-cta]',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        0.7,
      )
      .to('[data-hero-cue]', { opacity: 1, duration: 0.8 }, 1.1)
  }, root)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section
    ref="root"
    class="relative flex min-h-[100svh] flex-col overflow-hidden"
    aria-labelledby="hero-title"
  >
    <!-- Visual layer -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:w-[58%] md:opacity-100"
      aria-hidden="true"
    >
      <HeroCanvas />
      <div
        class="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent md:via-transparent"
      />
    </div>

    <div class="wrap relative flex flex-1 flex-col justify-center pb-24 pt-32 md:pt-36">
      <p data-hero-label class="tag mb-6 flex items-center gap-3">
        <span class="inline-block h-px w-10 bg-accent" aria-hidden="true" />
        {{ t('hero.label') }}
      </p>

      <h1
        id="hero-title"
        class="max-w-5xl text-hero font-bold leading-[0.98] tracking-[-0.03em]"
      >
        <span data-hero-line class="block overflow-hidden pb-1">
          <span class="block">{{ t('hero.titleTop') }}</span>
        </span>
        <span data-hero-line class="block overflow-hidden pb-1">
          <span class="block text-accent">{{ t('hero.titleAccent') }}</span>
        </span>
        <span data-hero-line class="block overflow-hidden pb-2">
          <span class="block">{{ t('hero.titleBottom') }}</span>
        </span>
      </h1>

      <p data-hero-copy class="mt-8 max-w-md text-base text-muted md:text-lg">
        {{ t('hero.intro') }}
      </p>

      <div class="mt-10 flex flex-wrap items-center gap-4">
        <span data-hero-cta>
          <AppButton to="/projects" size="lg" magnetic>{{ t('hero.ctaPrimary') }}</AppButton>
        </span>
        <span data-hero-cta>
          <AppButton to="/contact" size="lg" variant="outline" magnetic>
            {{ t('hero.ctaSecondary') }}
          </AppButton>
        </span>
      </div>
    </div>

    <a
      data-hero-cue
      href="#status"
      class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-colors hover:text-accent"
    >
      <span class="tag">{{ t('common.scrollCue') }}</span>
      <ArrowDown :size="14" class="animate-bounce" aria-hidden="true" />
    </a>
  </section>
</template>
