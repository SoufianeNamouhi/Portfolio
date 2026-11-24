<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { getProject, nextProject } from '~/data/projects'

const route = useRoute()
const slug = route.params.slug as string
const project = getProject(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const next = nextProject(slug)

useSeoMeta({
  title: `${project.name} — Case Study`,
  description: project.description,
})
</script>

<template>
  <div class="container-page pt-28 md:pt-40">
    <NuxtLink to="/projects" class="link-arrow">
      <ArrowLeft class="size-4" /> Back to projects
    </NuxtLink>

    <!-- Hero -->
    <MotionReveal class="mt-10">
      <div class="flex flex-wrap items-center gap-4">
        <p class="section-label uppercase tracking-wider">// {{ project.category }}</p>
        <span
          v-if="project.professional"
          class="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-accent"
        >
          <span class="dot-live size-1.5 rounded-full bg-primary" aria-hidden="true" />
          Private enterprise project
        </span>
        <span
          v-if="project.draft"
          class="rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-text-muted"
          >Draft — pending review</span
        >
      </div>

      <h1 class="heading-display mt-6 text-5xl sm:text-6xl lg:text-8xl">{{ project.name }}</h1>
      <p class="text-body-gray mt-6 max-w-2xl text-lg">{{ project.description }}</p>
    </MotionReveal>

    <!-- Meta grid -->
    <MotionReveal :delay="0.1" class="mt-12 grid gap-8 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="mono-tag uppercase tracking-wider">Role</p>
        <p class="mt-2 font-medium">{{ project.role }}</p>
      </div>
      <div>
        <p class="mono-tag uppercase tracking-wider">Type</p>
        <p class="mt-2 font-medium">
          {{ project.professional ? 'Professional work' : 'Personal project'
          }}{{ project.year ? ` · ${project.year}` : '' }}
        </p>
      </div>
      <div>
        <p class="mono-tag uppercase tracking-wider">Core stack</p>
        <p class="mt-2 font-mono text-sm">{{ project.stack.join(' / ') }}</p>
      </div>
      <div>
        <p class="mono-tag uppercase tracking-wider">Highlights</p>
        <p class="mt-2 font-mono text-sm text-accent">{{ project.highlights.join(' / ') }}</p>
      </div>
    </MotionReveal>

    <!-- Visual -->
    <MotionReveal :delay="0.14" class="card-surface mt-12 overflow-hidden">
      <ProjectsProjectVisual :project="project" />
      <p class="border-t border-border px-6 py-3 font-mono text-[0.65rem] text-text-muted">
        Conceptual visual — placeholder for authorized project assets.
      </p>
    </MotionReveal>

    <!-- Responsibilities -->
    <section class="mt-20 grid gap-8 md:grid-cols-[0.9fr_1.1fr]" aria-labelledby="resp-title">
      <MotionReveal>
        <p class="section-label">01 // RESPONSIBILITIES</p>
        <h2 id="resp-title" class="heading-display mt-5 text-3xl md:text-4xl">
          What I worked on
        </h2>
      </MotionReveal>
      <MotionReveal :delay="0.08">
        <ul class="space-y-4">
          <li
            v-for="item in project.responsibilities"
            :key="item"
            class="flex gap-3 text-text-secondary"
          >
            <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {{ item }}
          </li>
        </ul>
      </MotionReveal>
    </section>

    <!-- Challenges -->
    <section v-if="project.challenges.length" class="mt-20" aria-labelledby="challenges-title">
      <MotionReveal>
        <p class="section-label">02 // CHALLENGES</p>
        <h2 id="challenges-title" class="heading-display mt-5 max-w-xl text-3xl md:text-4xl">
          The engineering problems
        </h2>
      </MotionReveal>
      <div class="mt-10 grid gap-8 md:grid-cols-3">
        <MotionReveal v-for="(challenge, index) in project.challenges" :key="challenge.title" :delay="index * 0.08">
          <p class="font-mono text-sm text-accent">
            {{ String(index + 1).padStart(2, '0') }}. {{ challenge.title }}
          </p>
          <p class="text-body-gray mt-3 text-sm">{{ challenge.body }}</p>
        </MotionReveal>
      </div>
    </section>

    <!-- Editorial sections -->
    <section
      v-for="(section, index) in project.sections"
      :key="section.title"
      class="mt-20 grid gap-8 border-t border-border pt-16 md:grid-cols-[0.9fr_1.1fr]"
      :aria-labelledby="`section-${index}`"
    >
      <MotionReveal>
        <p class="section-label">
          {{ String(index + 3).padStart(2, '0') }} {{ section.label }}
        </p>
        <h2 :id="`section-${index}`" class="heading-display mt-5 text-3xl md:text-4xl">
          {{ section.title }}
        </h2>
      </MotionReveal>
      <MotionReveal :delay="0.08" class="space-y-5">
        <p v-for="paragraph in section.body" :key="paragraph" class="text-body-gray">
          {{ paragraph }}
        </p>
      </MotionReveal>
    </section>

    <!-- Next project -->
    <MotionReveal class="mt-24 border-t border-border pt-12 pb-8">
      <p class="section-label">// NEXT PROJECT</p>
      <NuxtLink :to="`/projects/${next.slug}`" class="group mt-6 flex items-center justify-between gap-6">
        <span class="heading-display text-3xl transition-colors group-hover:text-accent sm:text-5xl">
          {{ next.name }}
        </span>
        <span class="grid size-12 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-purple-glow">
          <ArrowRight class="size-5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </NuxtLink>
    </MotionReveal>
  </div>
</template>
