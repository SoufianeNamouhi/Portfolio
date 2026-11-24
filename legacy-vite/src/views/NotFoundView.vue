<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import AppButton from '@/components/ui/AppButton.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t } = useI18n()

useSeo(
  computed(() => ({
    title: `404 — ${t('seo.home.title')}`,
    description: t('notFound.body'),
  })),
)
</script>

<template>
  <div class="wrap grid min-h-[80vh] place-items-center pb-24 pt-32">
    <Reveal class="text-center">
      <p
        class="font-display text-[clamp(6rem,20vw,14rem)] font-bold leading-none text-line"
        aria-hidden="true"
      >
        {{ t('notFound.code') }}
      </p>
      <h1 class="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
        {{ t('notFound.title') }}
      </h1>
      <p class="mx-auto mt-4 max-w-md text-sm text-muted md:text-base">
        {{ t('notFound.body') }}
      </p>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <AppButton to="/" magnetic>{{ t('notFound.home') }}</AppButton>
        <AppButton to="/projects" variant="outline" magnetic>
          {{ t('notFound.projects') }}
        </AppButton>
      </div>
    </Reveal>
  </div>
</template>
