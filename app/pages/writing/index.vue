<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

useSeoMeta({
  title: 'Writing',
  description:
    'Notes on building maintainable Vue.js applications, enterprise dashboards and logistics software — written by Soufiane Namouhi.',
})

const { data: articles } = await useAsyncData('writing-list', () =>
  queryCollection('writing').where('draft', '=', false).order('date', 'DESC').all(),
)

const categories = computed(() => [
  'All',
  ...new Set((articles.value ?? []).map((a) => a.category)),
])
const activeCategory = ref('All')

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? (articles.value ?? [])
    : (articles.value ?? []).filter((a) => a.category === activeCategory.value),
)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<template>
  <div class="container-page pt-28 md:pt-40">
    <MotionReveal>
      <p class="section-label">// Writing</p>
      <h1 class="heading-display mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-7xl">
        Notes on building <span class="text-accent">business software.</span>
      </h1>
      <p class="text-body-gray mt-6 max-w-2xl">
        Written from production work — maintainable Vue.js, enterprise dashboards, business
        workflows and the lessons in between.
      </p>
    </MotionReveal>

    <MotionReveal v-if="articles?.length" :delay="0.1" class="mt-12 flex flex-wrap items-center gap-3">
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
        // {{ filtered.length }} posts
      </span>
    </MotionReveal>

    <ul v-if="filtered.length" class="mt-10 divide-y divide-border border-t border-border pb-8">
      <li v-for="(article, index) in filtered" :key="article.path">
        <MotionReveal :delay="index * 0.05">
          <NuxtLink
            :to="article.path"
            class="group grid gap-3 py-8 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-8"
          >
            <time class="font-mono text-xs text-text-muted" :datetime="article.date">{{
              formatDate(article.date)
            }}</time>
            <span>
              <span
                class="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-accent sm:text-2xl"
                >{{ article.title }}</span
              >
              <span class="text-body-gray mt-1.5 block text-sm">{{ article.description }}</span>
            </span>
            <span class="flex items-center gap-4">
              <span class="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-text-secondary">{{
                article.category
              }}</span>
              <span class="grid size-10 place-items-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-purple-glow">
                <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </NuxtLink>
        </MotionReveal>
      </li>
    </ul>

    <MotionReveal v-else class="mt-16 border-t border-border py-20">
      <div class="card-surface mx-auto max-w-xl p-10 text-center">
        <p class="section-label">// In preparation</p>
        <h2 class="font-display mt-4 text-2xl font-bold tracking-tight">The first notes are on their way</h2>
        <p class="text-body-gray mt-4 text-sm">
          Articles are published here only once they are written and reviewed. Planned topics:
          maintainable Vue.js applications, enterprise dashboard design, complex business
          workflows, REST API integration in Vue, and lessons from logistics software development.
        </p>
      </div>
    </MotionReveal>
  </div>
</template>
