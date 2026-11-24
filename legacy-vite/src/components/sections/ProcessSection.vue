<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { processSteps } from '@/content/process'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t, locale } = useI18n()

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}
</script>

<template>
  <section id="process" class="wrap py-24 md:py-36" aria-labelledby="process-title">
    <Reveal>
      <SectionHeading index="03" :eyebrow="t('home.process.eyebrow')">
        <span id="process-title">{{ t('home.process.title') }}</span>
      </SectionHeading>
    </Reveal>

    <ol class="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(step, i) in processSteps"
        :key="step.index"
        class="group relative bg-bg p-7 transition-colors duration-500 hover:bg-surface md:p-9"
      >
        <Reveal :delay="i * 0.07" class="flex h-full flex-col">
          <span
            class="font-display text-4xl font-bold text-line transition-colors duration-500 group-hover:text-accent md:text-5xl"
            aria-hidden="true"
          >
            {{ step.index }}
          </span>
          <h3 class="mt-6 font-display text-xl font-semibold tracking-tight md:text-2xl">
            {{ loc(step.title) }}
          </h3>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {{ loc(step.description) }}
          </p>
          <p class="tag mt-6 !text-[0.62rem] !normal-case !tracking-[0.08em] text-accent-2">
            {{ loc(step.detail) }}
          </p>
        </Reveal>
      </li>
    </ol>
  </section>
</template>
