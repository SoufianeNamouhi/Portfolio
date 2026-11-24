<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { Project } from '~/types/content'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="card-surface group overflow-hidden transition-colors hover:border-border-strong">
    <NuxtLink :to="`/projects/${project.slug}`" class="block" :aria-label="`Open case study: ${project.name}`">
      <ProjectsProjectVisual :project="project" />
    </NuxtLink>

    <div class="p-6 md:p-8">
      <div class="flex items-center justify-between gap-3">
        <p class="font-mono text-xs uppercase tracking-wider text-accent">{{ project.category }}</p>
        <span
          v-if="project.professional"
          class="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] text-text-muted"
          >Private enterprise project</span
        >
      </div>

      <h3 class="font-display mt-4 text-2xl font-bold tracking-tight md:text-3xl">
        <NuxtLink :to="`/projects/${project.slug}`" class="transition-colors hover:text-accent">{{
          project.name
        }}</NuxtLink>
      </h3>

      <p class="text-body-gray mt-3 line-clamp-3 text-sm md:text-base">{{ project.description }}</p>

      <p class="mt-5 border-t border-border pt-5 font-mono text-xs text-text-muted">
        {{ project.stack.join(' / ') }}
      </p>

      <div class="mt-5 flex items-center justify-between">
        <NuxtLink :to="`/projects/${project.slug}`" class="link-arrow">
          Case study <ArrowRight class="size-4" />
        </NuxtLink>
        <span v-if="project.draft" class="font-mono text-xs text-text-muted">Draft</span>
      </div>
    </div>
  </article>
</template>
