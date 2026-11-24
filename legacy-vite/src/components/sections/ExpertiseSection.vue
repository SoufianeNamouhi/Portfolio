<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from '@/lib/gsap'
import { expertise } from '@/content/expertise'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t, locale } = useI18n()
const root = ref<HTMLElement | null>(null)
const reducedMotion = usePreferredReducedMotion()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (reducedMotion.value === 'reduce' || !root.value) return
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-sep]').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.inOut',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    })
  }, root)
})

onBeforeUnmount(() => ctx?.revert())

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}
</script>

<template>
  <section ref="root" id="expertise" class="wrap py-24 md:py-36" aria-labelledby="expertise-title">
    <Reveal>
      <SectionHeading index="02" :eyebrow="t('home.expertise.eyebrow')">
        <span id="expertise-title">{{ t('home.expertise.title') }}</span>
      </SectionHeading>
    </Reveal>

    <div>
      <article v-for="area in expertise" :key="area.id" class="group relative">
        <div data-sep class="h-px w-full bg-line" aria-hidden="true" />
        <div class="grid gap-6 py-10 md:grid-cols-12 md:py-14">
          <div class="md:col-span-1">
            <span class="font-mono text-sm text-accent">{{ area.index }}</span>
          </div>
          <h3
            class="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-4xl"
          >
            {{ loc(area.title) }}
          </h3>
          <div class="md:col-span-6 md:col-start-7">
            <p class="max-w-xl text-sm leading-relaxed text-muted md:text-base">
              {{ loc(area.description) }}
            </p>
            <ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2" :aria-label="t('a11y.techList')">
              <li
                v-for="tech in area.technologies"
                :key="tech"
                class="tag !text-[0.66rem] transition-colors duration-300 hover:text-accent"
              >
                {{ tech }}
              </li>
            </ul>
          </div>
        </div>
      </article>
      <div data-sep class="h-px w-full bg-line" aria-hidden="true" />
    </div>
  </section>
</template>
