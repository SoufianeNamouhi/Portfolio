<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { experience } from '~/data/experience'
import { profile } from '~/data/profile'
</script>

<template>
  <section class="container-page mt-28 md:mt-40" aria-labelledby="journey-title">
    <div class="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
      <MotionReveal>
        <p class="section-label">// Git log --journey</p>
        <h2 id="journey-title" class="heading-display mt-5 text-4xl sm:text-5xl lg:text-6xl">
          Every experience.<br /><span class="text-accent">Another commit.</span>
        </h2>
      </MotionReveal>
      <MotionReveal :delay="0.1" class="md:pb-2 md:text-right lg:text-left">
        <p class="text-body-gray">
          From a technical diploma to enterprise production systems — each step added something the
          last one couldn't.
        </p>
        <a
          v-if="profile.cvUrl"
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener"
          class="btn-outline mt-6"
        >
          Download CV
          <Download class="size-4" />
        </a>
      </MotionReveal>
    </div>

    <ol class="timeline mt-16">
      <li v-for="entry in experience" :key="entry.id" class="timeline-entry">
        <MotionReveal>
          <div class="grid gap-3 sm:grid-cols-[7rem_1fr] md:gap-8 md:grid-cols-[9rem_1fr_1fr]">
            <div class="font-mono text-xs text-text-muted">
              <p>{{ entry.period }}</p>
              <p class="mt-1 text-[0.65rem] opacity-60">{{ entry.ref }}</p>
            </div>

            <div class="timeline-body">
              <span class="timeline-node" :data-current="entry.current" aria-hidden="true" />
              <p class="font-mono text-xs text-text-muted">
                <span v-if="entry.current" class="text-accent">HEAD → </span>{{ entry.branch }}
                <span class="mx-1.5 opacity-50">·</span>{{ profile.name }}
                <span v-if="entry.current">
                  <span class="mx-1.5 opacity-50">·</span>{{ profile.company }}</span
                >
              </p>
              <h3 class="font-display mt-3 text-2xl font-bold tracking-tight">{{ entry.title }}</h3>
              <p class="text-body-gray mt-3 text-sm md:text-base">{{ entry.body }}</p>
            </div>

            <ul class="flex flex-wrap content-start gap-2 sm:col-start-2 md:col-start-auto md:justify-end">
              <li
                v-for="tag in entry.tags"
                :key="tag"
                class="rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-text-secondary"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </MotionReveal>
      </li>
    </ol>
  </section>
</template>

<style scoped>
/* Each entry draws its own vertical segment; stacked entries form a continuous line. */
.timeline-entry {
  position: relative;
  padding-block: 1.75rem;
}

.timeline-body {
  position: relative;
  padding-left: 1.75rem;
}

.timeline-body::before {
  content: '';
  position: absolute;
  left: 0;
  top: -1.75rem;
  bottom: -1.75rem;
  width: 2px;
  background: var(--border);
}

.timeline-entry:first-child .timeline-body::before {
  top: 0.45rem;
}

.timeline-entry:last-child .timeline-body::before {
  bottom: auto;
  height: 0.7rem;
}

.timeline-node {
  position: absolute;
  left: -0.35rem;
  top: 0.45rem;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 9999px;
  background: var(--bg);
  border: 2px solid var(--primary);
}

.timeline-node[data-current='true'] {
  background: var(--primary);
  box-shadow: 0 0 0 6px var(--purple-glow);
}
</style>
