<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, MoveLeft } from '@lucide/vue'
import { adjacentProjects, getProject } from '@/content/projects'
import { useSeo } from '@/composables/useSeo'
import Badge from '@/components/ui/Badge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Reveal from '@/components/motion/Reveal.vue'
import ProjectVisual from '@/components/projects/ProjectVisual.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const project = computed(() => getProject(String(route.params.slug)))

// Unknown slug → render the 404 view instead of an empty shell.
watchEffect(() => {
  if (project.value === undefined && route.name === 'project') {
    router.replace({ name: 'not-found' })
  }
})

const neighbors = computed(() => (project.value ? adjacentProjects(project.value.slug) : null))

useSeo(
  computed(() => ({
    title: project.value
      ? `${project.value.name} — ${t('projects.page.eyebrow')} · Soufiane NAMOUHI`
      : t('seo.projects.title'),
    description: project.value
      ? t('seo.project.description', {
          name: project.value.name,
          category: loc(project.value.category),
        })
      : t('seo.projects.description'),
    path: project.value ? `/projects/${project.value.slug}` : '/projects',
  })),
)

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}
</script>

<template>
  <article v-if="project" class="pb-24 md:pb-36">
    <!-- Hero -->
    <header class="wrap pt-32 md:pt-44">
      <Reveal>
        <AppButton to="/projects" variant="ghost" class="!px-0">
          <MoveLeft :size="14" aria-hidden="true" />
          {{ t('common.backToProjects') }}
        </AppButton>

        <div class="mt-10 flex flex-wrap items-center gap-2">
          <Badge :label="loc(project.category)" />
          <Badge :label="t('common.professional')" />
          <Badge v-if="project.year" :label="project.year" />
          <Badge v-if="project.draft" :label="t('common.draft')" />
        </div>

        <h1
          class="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.98] tracking-[-0.03em]"
        >
          {{ project.name }}
        </h1>
        <p class="mt-4 font-mono text-sm text-muted">
          {{ project.index }} / {{ String(6).padStart(2, '0') }}
        </p>
      </Reveal>

      <Reveal :delay="0.12" class="mt-12 md:mt-16">
        <figure class="relative overflow-hidden border border-line">
          <ProjectVisual :project="project" variant="banner" />
          <figcaption class="tag absolute bottom-4 left-5 !text-[0.62rem] opacity-70">
            {{ t('common.conceptualVisualNote') }}
          </figcaption>
        </figure>
      </Reveal>
    </header>

    <!-- Draft notice -->
    <div v-if="project.draft" class="wrap mt-10">
      <p
        class="flex items-start gap-3 border border-line bg-surface/60 p-4 text-[0.8rem] leading-relaxed text-muted md:items-center md:p-5"
        role="note"
      >
        <span
          class="mt-1 inline-block size-2 shrink-0 rounded-full bg-accent md:mt-0"
          aria-hidden="true"
        />
        {{ t('projects.case.draftNotice') }}
      </p>
    </div>

    <!-- Overview -->
    <section class="wrap mt-16 md:mt-24" :aria-label="t('projects.case.overview')">
      <div class="grid gap-10 md:grid-cols-12">
        <Reveal class="md:col-span-4">
          <p class="tag sticky top-28">{{ t('projects.case.overview') }}</p>
        </Reveal>
        <Reveal class="md:col-span-8">
          <p class="max-w-3xl text-lg leading-relaxed text-text md:text-xl">
            {{ loc(project.overview) }}
          </p>
          <p class="mt-8 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {{ loc(project.context) }}
          </p>
        </Reveal>
      </div>
    </section>

    <!-- Challenges & responsibilities -->
    <section class="wrap mt-20 md:mt-28" :aria-label="t('projects.case.challenges')">
      <div class="grid gap-px border border-line bg-line md:grid-cols-2">
        <Reveal class="bg-bg p-7 md:p-10">
          <p class="tag mb-6">{{ t('projects.case.challenges') }}</p>
          <ul class="space-y-5">
            <li v-for="(item, i) in project.challenges" :key="i" class="flex gap-4">
              <span class="font-mono text-xs text-accent">{{
                String(i + 1).padStart(2, '0')
              }}</span>
              <p class="text-sm leading-relaxed text-muted md:text-base">{{ loc(item) }}</p>
            </li>
          </ul>
        </Reveal>
        <Reveal :delay="0.08" class="bg-bg p-7 md:p-10">
          <p class="tag mb-6">{{ t('projects.case.responsibilities') }}</p>
          <ul class="space-y-5">
            <li v-for="(item, i) in project.responsibilities" :key="i" class="flex gap-4">
              <span
                class="mt-[7px] inline-block size-1.5 shrink-0 bg-accent-2"
                aria-hidden="true"
              />
              <p class="text-sm leading-relaxed text-muted md:text-base">{{ loc(item) }}</p>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>

    <!-- Approach -->
    <section class="wrap mt-20 md:mt-28" :aria-label="t('projects.case.approach')">
      <div class="grid gap-10 md:grid-cols-12">
        <Reveal class="md:col-span-4">
          <p class="tag sticky top-28">{{ t('projects.case.approach') }}</p>
        </Reveal>
        <Reveal class="md:col-span-8">
          <p class="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {{ loc(project.approach) }}
          </p>
        </Reveal>
      </div>
    </section>

    <!-- Features & technologies -->
    <section class="wrap mt-20 md:mt-28" :aria-label="t('projects.case.features')">
      <div class="grid gap-px border border-line bg-line lg:grid-cols-2">
        <Reveal class="bg-bg p-7 md:p-10">
          <p class="tag mb-6">{{ t('projects.case.features') }}</p>
          <ul class="space-y-4">
            <li
              v-for="(item, i) in project.features"
              :key="i"
              class="flex items-baseline gap-4 border-b border-line pb-4 last:border-b-0"
            >
              <span class="font-display text-lg font-semibold text-line">{{
                String(i + 1).padStart(2, '0')
              }}</span>
              <p class="text-sm text-text md:text-base">{{ loc(item) }}</p>
            </li>
          </ul>
        </Reveal>
        <Reveal :delay="0.08" class="bg-bg p-7 md:p-10">
          <p class="tag mb-6">{{ t('projects.case.technologies') }}</p>
          <ul class="flex flex-wrap gap-2" :aria-label="t('a11y.techList')">
            <li
              v-for="tech in project.technologies"
              :key="tech"
              class="rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.7rem] tracking-wider text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {{ tech }}
            </li>
          </ul>
          <p class="tag mt-8 !text-[0.6rem]">
            {{ t('common.conceptualVisual') }} — {{ t('common.conceptualVisualNote') }}
          </p>
        </Reveal>
      </div>
    </section>

    <!-- Next / prev navigation -->
    <nav v-if="neighbors" class="wrap mt-24 md:mt-32" :aria-label="t('common.nextProject')">
      <div class="grid gap-px border border-line bg-line md:grid-cols-2">
        <RouterLink
          :to="`/projects/${neighbors.prev.slug}`"
          class="group bg-bg p-7 transition-colors duration-300 hover:bg-surface md:p-10"
        >
          <p class="tag mb-4 flex items-center gap-2">
            <ArrowLeft :size="12" aria-hidden="true" /> {{ t('common.previousProject') }}
          </p>
          <p
            class="font-display text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:-translate-x-2 md:text-2xl"
          >
            {{ neighbors.prev.name }}
          </p>
        </RouterLink>
        <RouterLink
          :to="`/projects/${neighbors.next.slug}`"
          class="group bg-bg p-7 text-right transition-colors duration-300 hover:bg-surface md:p-10"
        >
          <p class="tag mb-4 flex items-center justify-end gap-2">
            {{ t('common.nextProject') }} <ArrowRight :size="12" aria-hidden="true" />
          </p>
          <p
            class="font-display text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-2xl"
          >
            {{ neighbors.next.name }}
          </p>
        </RouterLink>
      </div>
    </nav>
  </article>
</template>
