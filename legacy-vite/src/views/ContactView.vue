<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import ContactChannels from '@/components/sections/ContactChannels.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t } = useI18n()

useSeo(
  computed(() => ({
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
    path: '/contact',
  })),
)
</script>

<template>
  <div class="wrap pb-24 pt-32 md:pb-36 md:pt-44">
    <Reveal>
      <p class="tag mb-6 flex items-center gap-3">
        <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
        {{ t('nav.contact') }}
      </p>
      <h1 class="max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02]">
        {{ t('contact.page.headingTop') }}
        <br />
        <span class="text-accent">{{ t('contact.page.headingBottom') }}</span>
      </h1>
      <p class="mt-6 max-w-xl text-sm text-muted md:text-base">
        {{ t('contact.page.body') }}
      </p>
    </Reveal>

    <Reveal :delay="0.1" class="mt-14 max-w-3xl md:mt-20">
      <p class="tag mb-5">{{ t('contact.page.direct') }}</p>
      <ContactChannels />
      <p class="mt-6 text-[0.8rem] leading-relaxed text-muted">
        {{ t('contact.page.formSoon') }}
      </p>
    </Reveal>
  </div>
</template>
