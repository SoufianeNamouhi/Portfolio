<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { projects } from '~/data/projects'
import { profile } from '~/data/profile'

const profileYears = profile.yearsOfExperience

useSeoMeta({
  title: 'Projects',
  description:
    'Enterprise web applications, logistics platforms and customer portals — engineering case studies from the professional work of Soufiane Namouhi.',
})

const categories = ['All', ...new Set(projects.map((p) => p.category))]
const activeCategory = ref('All')

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory.value),
)
</script>

<template>
  <div class="container-page pt-28 md:pt-40">
    <NuxtLink to="/" class="link-arrow">
      <ArrowLeft class="size-4" /> Back to home
    </NuxtLink>

    <MotionReveal class="mt-10">
      <p class="section-label">// PROJECTS</p>
      <h1 class="heading-display mt-5 text-4xl sm:text-5xl lg:text-7xl">
        Complete systems, <span class="text-accent">built for production.</span>
      </h1>
      <p class="text-body-gray mt-6 max-w-2xl">
        Every application starts with a real business problem and ends as maintainable software in
        production. Open any project for the full engineering write-up.
      </p>
    </MotionReveal>

    <MotionReveal :delay="0.08" class="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
      <div>
        <p class="font-display text-3xl font-bold sm:text-4xl">{{ projects.length }}</p>
        <p class="mt-1.5 font-mono text-xs text-text-muted">projects & case studies</p>
      </div>
      <div>
        <p class="font-display text-3xl font-bold sm:text-4xl">{{ profileYears }}</p>
        <p class="mt-1.5 font-mono text-xs text-text-muted">years of professional work</p>
      </div>
      <div>
        <p class="font-display text-3xl font-bold sm:text-4xl">Vue.js</p>
        <p class="mt-1.5 font-mono text-xs text-text-muted">primary frontend stack</p>
      </div>
    </MotionReveal>

    <MotionReveal :delay="0.12" class="mt-10 flex flex-wrap items-center gap-3">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="rounded-full border px-4 py-2 font-mono text-xs transition-colors"
        :class="
          category === activeCategory
            ? 'border-primary bg-primary text-white'
            : 'border-border text-text-secondary hover:border-accent hover:text-text-primary'
        "
        :aria-pressed="category === activeCategory"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
      <span class="ml-auto font-mono text-xs text-text-muted">
        {{ String(filtered.length).padStart(2, '0') }} projects
      </span>
    </MotionReveal>

    <div class="mt-12 grid gap-8 pb-8 lg:grid-cols-2">
      <MotionReveal v-for="(project, index) in filtered" :key="project.slug" :delay="(index % 2) * 0.08">
        <ProjectsProjectCard :project="project" />
      </MotionReveal>
    </div>
  </div>
</template>
