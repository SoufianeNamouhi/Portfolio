<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { site } from '@/config/site'
import { experience } from '@/content/experience'
import Reveal from '@/components/motion/Reveal.vue'

const { t, locale } = useI18n()

useSeo(
  computed(() => ({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    path: '/about',
  })),
)

const facts = computed(() => [
  { key: 'role', icon: 'code' },
  { key: 'company', icon: 'building' },
  { key: 'location', icon: 'map' },
  { key: 'experience', icon: 'clock' },
  { key: 'education', icon: 'graduation' },
  { key: 'languages', icon: 'languages' },
])

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}
</script>

<template>
  <div class="wrap pb-24 pt-32 md:pb-36 md:pt-44">
    <Reveal>
      <p class="tag mb-6 flex items-center gap-3">
        <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
        {{ t('nav.about') }}
      </p>
      <h1 class="max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02]">
        {{ t('about.page.headingTop') }}
        <br />
        <span class="text-accent">{{ t('about.page.headingBottom') }}</span>
      </h1>
    </Reveal>

    <div class="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-12">
      <div class="space-y-8 md:col-span-7">
        <Reveal v-for="key in ['p1', 'p2', 'p3', 'p4']" :key="key" :delay="0.06">
          <p
            class="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            :class="key === 'p1' ? 'text-text' : ''"
          >
            {{ t(`about.page.${key}`) }}
          </p>
        </Reveal>
      </div>

      <aside class="md:col-span-4 md:col-start-9">
        <Reveal :delay="0.1">
          <p class="tag mb-6">{{ t('about.page.factsLabel') }}</p>
          <dl class="border border-line">
            <div
              v-for="fact in facts"
              :key="fact.key"
              class="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0"
            >
              <dt class="tag !text-[0.62rem]">{{ fact.key }}</dt>
              <dd class="text-right text-[0.82rem] font-medium">
                {{ t(`about.page.facts.${fact.key}`) }}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal :delay="0.16" class="mt-10">
          <p class="tag mb-6">{{ t('home.journey.eyebrow') }}</p>
          <ol class="relative space-y-8 border-l border-line pl-6">
            <li v-for="entry in experience" :key="entry.id" class="relative">
              <span
                class="absolute -left-[27px] top-1.5 size-[9px] rounded-full border-2 border-accent bg-bg"
                :class="entry.highlight ? 'bg-accent' : ''"
                aria-hidden="true"
              />
              <p class="tag !text-[0.6rem]">{{ loc(entry.period) }}</p>
              <p class="mt-1 text-sm font-semibold">{{ loc(entry.title) }}</p>
              <p class="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent-2">
                {{ entry.place }}
              </p>
            </li>
          </ol>
        </Reveal>
      </aside>
    </div>

    <p class="sr-only">{{ site.name }} — {{ site.role }}</p>
  </div>
</template>
