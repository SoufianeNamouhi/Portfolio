<script setup lang="ts">
import { BriefcaseBusiness, Globe, LayoutDashboard, Route, FileBarChart } from 'lucide-vue-next'
import { projects } from '~/data/projects'
import type { Project } from '~/types/content'

const icons: Record<Project['visual'], unknown> = {
  dashboard: LayoutDashboard,
  portal: Globe,
  logistics: Route,
  operations: BriefcaseBusiness,
  reporting: FileBarChart,
}

// Duplicated for a seamless loop.
const items = [...projects, ...projects]
</script>

<template>
  <section aria-label="Project overview" class="container-page">
    <div class="overflow-hidden rounded-2xl border border-border">
      <div class="marquee-track flex w-max items-center">
        <NuxtLink
          v-for="(project, index) in items"
          :key="`${project.slug}-${index}`"
          :to="`/projects/${project.slug}`"
          class="group flex items-center gap-3 border-r border-border px-7 py-5 transition-colors hover:bg-surface"
          :aria-hidden="index >= projects.length"
          :tabindex="index >= projects.length ? -1 : 0"
        >
          <span class="grid size-9 place-items-center rounded-lg border border-border text-accent">
            <component :is="icons[project.visual]" class="size-4" />
          </span>
          <span>
            <span class="block text-sm font-medium text-text-primary">{{ project.name }}</span>
            <span class="block font-mono text-[0.65rem] uppercase tracking-wider text-text-muted">{{
              project.category
            }}</span>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
