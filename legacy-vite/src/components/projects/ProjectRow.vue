<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from '@lucide/vue'
import type { Project } from '@/types/content'
import ProjectVisual from '@/components/projects/ProjectVisual.vue'
import Badge from '@/components/ui/Badge.vue'
import Reveal from '@/components/motion/Reveal.vue'

defineProps<{ project: Project }>()
const { t, locale } = useI18n()

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}
</script>

<template>
  <Reveal>
    <RouterLink
      :to="`/projects/${project.slug}`"
      class="group relative grid gap-6 border-t border-line py-10 transition-colors duration-500 last:border-b md:grid-cols-12 md:gap-8 md:py-14"
      :aria-label="`${t('common.viewProject')}: ${project.name}`"
    >
      <div class="md:col-span-1">
        <span
          class="font-mono text-sm text-muted transition-colors duration-300 group-hover:text-accent"
        >
          {{ project.index }}
        </span>
      </div>

      <div class="md:col-span-6">
        <div class="flex flex-wrap items-center gap-2">
          <Badge :label="loc(project.category)" />
          <Badge v-if="project.kind === 'professional'" :label="t('common.professional')" />
          <Badge v-if="project.draft" :label="t('common.draft')" />
        </div>
        <h3
          class="mt-4 font-display text-3xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl"
        >
          {{ project.name }}
        </h3>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {{ loc(project.summary) }}
        </p>
        <ul class="mt-5 flex flex-wrap gap-x-4 gap-y-1" :aria-label="t('a11y.techList')">
          <li
            v-for="tech in project.technologies.slice(0, 5)"
            :key="tech"
            class="tag !text-[0.62rem]"
          >
            {{ tech }}
          </li>
        </ul>
      </div>

      <div class="relative overflow-hidden border border-line md:col-span-5">
        <div
          class="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        >
          <ProjectVisual :project="project" />
        </div>
        <span
          class="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-line bg-bg/70 backdrop-blur-sm transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[#090a0d]"
          aria-hidden="true"
        >
          <ArrowUpRight :size="16" />
        </span>
        <span class="absolute bottom-3 left-4 tag !text-[0.6rem] opacity-60">{{
          t('common.conceptualVisual')
        }}</span>
      </div>
    </RouterLink>
  </Reveal>
</template>
