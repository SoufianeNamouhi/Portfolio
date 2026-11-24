<script setup lang="ts">
import { ArrowRight, Download } from 'lucide-vue-next'
import { profile } from '~/data/profile'

useSeoMeta({
  title: 'About',
  description:
    'About Soufiane Namouhi — software developer based in Morocco, focused on enterprise web applications, logistics systems and modern frontend experiences.',
})

const principles = [
  {
    title: 'Understand before building',
    body: 'Good software starts with the business workflow, not the framework. The first job is always understanding what the system must actually do.',
  },
  {
    title: 'Reliability is a feature',
    body: 'Production systems are used by people doing real work. Predictable behavior, careful error handling and safe changes matter more than clever code.',
  },
  {
    title: 'Interfaces are engineering',
    body: 'Complex operations deserve interfaces that make them feel simple. Clarity in the UI is as much engineering as the logic behind it.',
  },
  {
    title: 'Maintain like you own it',
    body: 'Most professional work is evolution, not greenfield. Reading existing code carefully and improving it safely is a core skill, not a chore.',
  },
]
</script>

<template>
  <div class="container-page pt-28 md:pt-40">
    <MotionReveal>
      <p class="section-label">// About</p>
      <h1 class="heading-display mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
        Code is the tool.<br /><span class="text-accent">The outcome is the goal.</span>
      </h1>
    </MotionReveal>

    <div class="mt-16 grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="space-y-6">
        <MotionReveal class="space-y-6">
          <p class="text-body-gray text-lg">
            I am a software developer based in {{ profile.location }}, focused on building reliable
            business applications and modern web experiences.
          </p>
          <p class="text-body-gray">
            My professional experience at {{ profile.company }} has allowed me to work on
            enterprise logistics and transportation systems, combining frontend development, API
            integration and practical business requirements.
          </p>
          <p class="text-body-gray">
            I enjoy transforming complex workflows into intuitive interfaces and maintainable
            software — the kind of work where a well-structured screen saves someone an hour every
            single day.
          </p>
        </MotionReveal>

        <MotionReveal :delay="0.08" class="grid gap-6 pt-6 sm:grid-cols-2">
          <div v-for="principle in principles" :key="principle.title" class="card-surface p-6">
            <h2 class="font-display text-lg font-bold tracking-tight">{{ principle.title }}</h2>
            <p class="text-body-gray mt-3 text-sm">{{ principle.body }}</p>
          </div>
        </MotionReveal>
      </div>

      <MotionReveal :delay="0.12" class="space-y-6">
        <div class="card-surface grid place-items-center p-10 text-center">
          <span class="font-display text-6xl font-bold tracking-tight">{{ profile.monogram }}</span>
          <span class="mx-auto mt-1 block size-2 bg-primary" aria-hidden="true" />
          <p class="mt-6 font-mono text-xs text-text-muted">
            — {{ profile.name }} · {{ profile.location }}
          </p>
        </div>

        <dl class="card-surface divide-y divide-border">
          <div class="flex justify-between gap-4 p-5">
            <dt class="font-mono text-xs uppercase tracking-wider text-text-muted">Company</dt>
            <dd class="text-sm font-medium">{{ profile.company }}</dd>
          </div>
          <div class="flex justify-between gap-4 p-5">
            <dt class="font-mono text-xs uppercase tracking-wider text-text-muted">Experience</dt>
            <dd class="text-sm font-medium">{{ profile.yearsOfExperience }} years</dd>
          </div>
          <div class="flex justify-between gap-4 p-5">
            <dt class="font-mono text-xs uppercase tracking-wider text-text-muted">Education</dt>
            <dd class="text-right text-sm font-medium">{{ profile.education }}</dd>
          </div>
          <div class="flex justify-between gap-4 p-5">
            <dt class="font-mono text-xs uppercase tracking-wider text-text-muted">Focus</dt>
            <dd class="text-right text-sm font-medium">Enterprise web applications</dd>
          </div>
          <div class="flex justify-between gap-4 p-5">
            <dt class="font-mono text-xs uppercase tracking-wider text-text-muted">Learning</dt>
            <dd class="text-right text-sm font-medium">Mobile development, modern tooling</dd>
          </div>
        </dl>

        <a
          v-if="profile.cvUrl"
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener"
          class="btn-outline w-full justify-center"
        >
          Download CV
          <Download class="size-4" />
        </a>
      </MotionReveal>
    </div>

    <MotionReveal class="mt-20 border-t border-border pt-12 pb-8">
      <p class="section-label">// THE JOURNEY</p>
      <NuxtLink to="/#journey-title" class="group mt-6 flex items-center justify-between gap-6">
        <span class="heading-display text-2xl transition-colors group-hover:text-accent sm:text-4xl">
          Every experience. Another commit.
        </span>
        <span class="grid size-12 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-purple-glow">
          <ArrowRight class="size-5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </NuxtLink>
    </MotionReveal>
  </div>
</template>
