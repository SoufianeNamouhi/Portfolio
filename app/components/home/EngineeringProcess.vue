<script setup lang="ts">
const steps = [
  {
    id: '01',
    tag: '// DISCOVERY',
    title: 'Discovery & Requirements',
    body: 'Understand business needs, existing workflows and user requirements before any code is written.',
    outcome: 'A clear problem statement',
  },
  {
    id: '02',
    tag: '// PLANNING',
    title: 'Planning & Scope',
    body: 'Define features, constraints, technical priorities and acceptance criteria everyone agrees on.',
    outcome: 'Scoped, agreed feature list',
  },
  {
    id: '03',
    tag: '// ARCHITECTURE',
    title: 'Interface & Architecture',
    body: 'Design responsive interfaces, component architecture, data flows and API contracts up front.',
    outcome: 'Component map & API contracts',
  },
  {
    id: '04',
    tag: '// BUILD',
    title: 'Development',
    body: 'Implement maintainable components, business logic, backend integrations and database operations.',
    outcome: 'Working, reviewed code',
  },
  {
    id: '05',
    tag: '// REFINEMENT',
    title: 'Testing & Refinement',
    body: 'Validate workflows, resolve bugs, optimize performance and improve accessibility.',
    outcome: 'Verified, stable release',
  },
  {
    id: '06',
    tag: '// MAINTENANCE',
    title: 'Deployment & Maintenance',
    body: 'Deploy applications, monitor behavior and continuously improve functionality in production.',
    outcome: 'Healthy production system',
  },
]

const section = ref<HTMLElement | null>(null)
const { progress } = useScrollProgress(section)

const activeIndex = computed(() =>
  Math.min(steps.length - 1, Math.floor(progress.value * steps.length)),
)
</script>

<template>
  <!-- Desktop: sticky scroll-driven sequence. Mobile: natural vertical list. -->
  <section aria-labelledby="process-title" class="mt-28 md:mt-40">
    <div ref="section" class="process-track hidden lg:block">
      <div class="process-sticky container-page flex h-screen flex-col justify-center">
        <div class="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p class="section-label">// HOW I BUILD</p>
            <h2 id="process-title" class="heading-display mt-5 text-5xl lg:text-6xl">
              From requirements<br /><span class="text-accent">to production.</span>
            </h2>
          </div>
          <p class="text-body-gray md:pb-2 md:text-right lg:text-left">
            A deliberate sequence that keeps every decision intentional, every feature justified,
            and every release production-ready.
          </p>
        </div>

        <div class="mt-12 grid grid-cols-6 gap-4">
          <article
            v-for="(step, index) in steps"
            :key="step.id"
            class="process-card"
            :data-active="index === activeIndex"
            :data-past="index < activeIndex"
          >
            <div class="flex items-center justify-between">
              <span class="process-number">{{ step.id }}</span>
              <span class="font-mono text-[0.6rem] tracking-wider" :class="index === activeIndex ? 'text-accent' : 'text-text-muted'">{{ step.tag }}</span>
            </div>
            <h3 class="font-display mt-4 text-lg font-bold tracking-tight">{{ step.title }}</h3>
            <p class="mt-2 line-clamp-4 text-xs leading-relaxed text-text-secondary">{{ step.body }}</p>
            <p class="process-outcome">↳ {{ step.outcome }}</p>
          </article>
        </div>

        <div class="mt-10 flex items-center gap-0" aria-hidden="true">
          <div class="relative h-0.5 w-full bg-border">
            <div
              class="absolute inset-y-0 left-0 bg-primary transition-[width] duration-300 ease-out"
              :style="{ width: `${((activeIndex + 0.5) / steps.length) * 100}%` }"
            />
            <div class="absolute inset-0 flex justify-between">
              <span
                v-for="(step, index) in steps"
                :key="step.id"
                class="process-dot"
                :class="{
                  'process-dot--active': index === activeIndex,
                  'process-dot--past': index < activeIndex,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile fallback: plain vertical timeline, no scroll hijacking. -->
    <div class="container-page lg:hidden">
      <p class="section-label">// HOW I BUILD</p>
      <h2 class="heading-display mt-5 text-4xl sm:text-5xl">
        From requirements <span class="text-accent">to production.</span>
      </h2>
      <ol class="mt-10 space-y-4">
        <li v-for="step in steps" :key="step.id">
          <MotionReveal>
            <article class="card-surface p-5">
              <div class="flex items-center justify-between">
                <span class="rounded-full border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">{{ step.id }}</span>
                <span class="font-mono text-[0.6rem] tracking-wider text-text-muted">{{ step.tag }}</span>
              </div>
              <h3 class="font-display mt-3 text-lg font-bold tracking-tight">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-text-secondary">{{ step.body }}</p>
              <p class="mt-3 font-mono text-xs text-accent">↳ {{ step.outcome }}</p>
            </article>
          </MotionReveal>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process-track {
  height: 420vh;
  position: relative;
}

.process-sticky {
  position: sticky;
  top: 0;
}

.process-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--surface);
  padding: 1.25rem;
  min-height: 15rem;
  opacity: 0.35;
  transform: translateY(6px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.process-card[data-past='true'] {
  opacity: 0.75;
  transform: none;
}

.process-card[data-active='true'] {
  opacity: 1;
  transform: none;
  border-color: var(--primary);
  box-shadow:
    0 0 0 1px var(--primary),
    0 12px 48px -12px var(--purple-glow);
}

.process-number {
  display: inline-block;
  border: 1px solid var(--border-strong);
  border-radius: 9999px;
  padding: 0.15rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.process-card[data-active='true'] .process-number {
  border-color: var(--primary);
  color: var(--accent);
}

.process-outcome {
  margin-top: auto;
  padding-top: 1rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.process-card[data-active='true'] .process-outcome {
  color: var(--accent);
}

.process-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  border: 2px solid var(--border-strong);
  background: var(--bg);
  transform: translateY(-50%);
  top: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.process-dot--past {
  background: var(--primary);
  border-color: var(--primary);
}

.process-dot--active {
  background: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 0 5px var(--purple-glow);
  transform: translateY(-50%) scale(1.5);
}

@media (prefers-reduced-motion: reduce) {
  .process-track {
    height: auto;
  }

  .process-sticky {
    position: static;
    height: auto;
    padding-block: 4rem;
  }

  .process-card,
  .process-card[data-past='true'],
  .process-card[data-active='true'] {
    opacity: 1;
    transform: none;
  }
}
</style>
