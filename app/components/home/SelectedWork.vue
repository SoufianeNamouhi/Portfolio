<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { projects } from '~/data/projects'

const featured = projects.find((p) => p.featured)!
const rest = projects.filter((p) => !p.featured)
</script>

<template>
  <section class="container-page mt-28 md:mt-40" aria-labelledby="selected-work-title">
    <UiSectionHeader
      label="SELECTED WORK"
      title="Real projects."
      accent="Real engineering challenges."
    >
      <NuxtLink to="/projects" class="link-arrow mt-4 md:justify-end lg:justify-start">
        05 All projects <ArrowRight class="size-4" />
      </NuxtLink>
    </UiSectionHeader>

    <!-- Featured flagship -->
    <MotionReveal class="mt-14">
      <article
        class="card-surface grid overflow-hidden lg:grid-cols-2"
        aria-labelledby="featured-title"
      >
        <NuxtLink :to="`/projects/${featured.slug}`" :aria-label="`Open case study: ${featured.name}`">
          <ProjectsProjectVisual :project="featured" class="h-full" />
        </NuxtLink>

        <div class="flex flex-col p-6 md:p-10">
          <p class="font-mono text-xs uppercase tracking-wider text-accent">
            {{ featured.category }}
          </p>
          <p class="mt-3 inline-flex items-center gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-accent"
            >
              <span class="dot-live size-1.5 rounded-full bg-primary" aria-hidden="true" />
              Featured project
            </span>
          </p>

          <h3 id="featured-title" class="font-display mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            {{ featured.name }}
          </h3>
          <p class="text-body-gray mt-4">{{ featured.description }}</p>

          <ul class="mt-6 space-y-3">
            <li
              v-for="item in featured.responsibilities.slice(0, 3)"
              :key="item"
              class="flex gap-3 text-sm text-text-secondary"
            >
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>

          <p class="mt-6 font-mono text-xs text-text-muted">{{ featured.stack.join(' / ') }}</p>

          <div class="mt-8 flex items-center justify-between gap-4">
            <span
              class="rounded-full border border-border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-text-muted"
              >Private enterprise project</span
            >
            <NuxtLink :to="`/projects/${featured.slug}`" class="link-arrow">
              Read case study <ArrowRight class="size-4" />
            </NuxtLink>
          </div>
        </div>
      </article>
    </MotionReveal>

    <!-- Remaining projects -->
    <div class="mt-8 grid gap-8 lg:grid-cols-2">
      <MotionReveal v-for="(project, index) in rest" :key="project.slug" :delay="(index % 2) * 0.08">
        <ProjectsProjectCard :project="project" />
      </MotionReveal>
    </div>
  </section>
</template>
