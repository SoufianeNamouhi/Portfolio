<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from '@/lib/gsap'
import { experience } from '@/content/experience'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t, locale } = useI18n()
const root = ref<HTMLElement | null>(null)
const progress = ref<HTMLElement | null>(null)
const reducedMotion = usePreferredReducedMotion()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (reducedMotion.value === 'reduce' || !root.value) return
  ctx = gsap.context(() => {
    if (progress.value) {
      gsap.fromTo(
        progress.value,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }
  }, root)
})

onBeforeUnmount(() => ctx?.revert())

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}
</script>

<template>
  <section
    ref="root"
    id="journey"
    class="border-t border-line bg-surface/30"
    aria-labelledby="journey-title"
  >
    <div class="wrap grid gap-12 py-24 md:grid-cols-12 md:py-36">
      <div class="md:col-span-4">
        <div class="md:sticky md:top-32">
          <Reveal>
            <SectionHeading :eyebrow="t('home.journey.eyebrow')">
              <span id="journey-title">{{ t('home.journey.title') }}</span>
            </SectionHeading>
          </Reveal>
        </div>
      </div>

      <div class="relative md:col-span-7 md:col-start-6">
        <div class="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden="true" />
        <div
          ref="progress"
          class="absolute bottom-2 left-[5px] top-2 w-px bg-accent"
          aria-hidden="true"
        />

        <ol class="space-y-14">
          <li v-for="(entry, i) in experience" :key="entry.id" class="relative pl-10">
            <span
              class="absolute left-0 top-2 size-[11px] rounded-full border-2 border-accent bg-bg"
              :class="entry.highlight ? 'bg-accent' : ''"
              aria-hidden="true"
            />
            <Reveal :delay="i * 0.06">
              <p class="tag mb-2">{{ loc(entry.period) }}</p>
              <h3 class="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {{ loc(entry.title) }}
              </h3>
              <p class="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-2">
                {{ entry.place }}
              </p>
              <p class="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {{ loc(entry.description) }}
              </p>
            </Reveal>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
