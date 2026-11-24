<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '@/content/projects'
import { useSeo } from '@/composables/useSeo'
import ProjectRow from '@/components/projects/ProjectRow.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t } = useI18n()

useSeo(
  computed(() => ({
    title: t('seo.projects.title'),
    description: t('seo.projects.description'),
    path: '/projects',
  })),
)
</script>

<template>
  <div class="wrap pb-24 pt-32 md:pb-36 md:pt-44">
    <Reveal>
      <p class="tag mb-6 flex items-center gap-3">
        <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
        {{ t('projects.page.eyebrow') }} —
        {{ t('projects.page.count', { count: projects.length }) }}
      </p>
      <h1
        class="max-w-4xl text-h2 font-semibold leading-[1.02] md:text-[length:clamp(2.5rem,6vw,5rem)]"
      >
        {{ t('projects.page.heading') }}
      </h1>
      <p class="mt-6 max-w-2xl text-sm text-muted md:text-base">
        {{ t('projects.page.subtitle') }}
      </p>
    </Reveal>

    <div class="mt-16 md:mt-24">
      <ProjectRow v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </div>
</template>
