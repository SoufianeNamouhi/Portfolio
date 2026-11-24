<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()

const { data: article } = await useAsyncData(`writing-${route.path}`, () =>
  queryCollection('writing').path(route.path).first(),
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
})

// Estimated reading time from the rendered AST text content.
function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>
    return [extractText(record.value), extractText(record.children)].filter(Boolean).join(' ')
  }
  return ''
}

const readingTime = computed(() => {
  const words = extractText(article.value?.body).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
})

const toc = computed(() => article.value?.body?.toc?.links ?? [])

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="container-page pt-28 md:pt-40">
    <NuxtLink to="/writing" class="link-arrow">
      <ArrowLeft class="size-4" /> Back to writing
    </NuxtLink>

    <header class="mt-10 max-w-3xl">
      <p class="section-label">// {{ article!.category }}</p>
      <h1 class="heading-display mt-5 text-4xl sm:text-5xl">{{ article!.title }}</h1>
      <p class="text-body-gray mt-5">{{ article!.description }}</p>
      <p class="mt-6 flex flex-wrap gap-4 border-t border-border pt-6 font-mono text-xs text-text-muted">
        <time :datetime="article!.date">{{ formatDate(article!.date) }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ readingTime }} min read</span>
      </p>
    </header>

    <div class="mt-14 grid gap-12 pb-8 lg:grid-cols-[1fr_14rem]">
      <article class="prose-content min-w-0">
        <ContentRenderer :value="article!" />
      </article>

      <aside v-if="toc.length" class="hidden lg:block">
        <nav class="sticky top-28" aria-label="Table of contents">
          <p class="mono-tag uppercase tracking-wider">On this page</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in toc" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="block text-xs text-text-muted transition-colors hover:text-accent"
                :class="{ 'pl-3': link.depth === 3 }"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<style>
.prose-content {
  color: var(--text-secondary);
  line-height: 1.8;
}

.prose-content h2 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.prose-content h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 2.25rem;
  margin-bottom: 0.75rem;
}

.prose-content p {
  margin-block: 1.1rem;
}

.prose-content a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose-content ul,
.prose-content ol {
  padding-left: 1.25rem;
  margin-block: 1.1rem;
}

.prose-content ul {
  list-style: disc;
}

.prose-content ol {
  list-style: decimal;
}

.prose-content li::marker {
  color: var(--accent);
}

.prose-content code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  padding: 0.15em 0.4em;
}

.prose-content pre {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.9rem;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin-block: 1.5rem;
}

.prose-content pre code {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.7;
}

.prose-content blockquote {
  border-left: 2px solid var(--primary);
  padding-left: 1.25rem;
  margin-block: 1.5rem;
  color: var(--text-primary);
  font-style: italic;
}
</style>
