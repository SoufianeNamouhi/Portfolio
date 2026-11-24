<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { technologies, technologyGroups } from '~/data/technologies'

const activeId = ref(technologies[0]?.id ?? '')

const active = computed(() => technologies.find((t) => t.id === activeId.value) ?? technologies[0]!)
const activeIndex = computed(() => technologies.findIndex((t) => t.id === activeId.value))
const activeGroup = computed(
  () => technologyGroups.find((g) => g.id === active.value.group) ?? technologyGroups[0],
)

// Usage indicator is qualitative, not a skill percentage: maps frequency labels to a bar.
const usageWidth: Record<string, string> = {
  Daily: '92%',
  Frequent: '62%',
  Occasional: '34%',
}

function select(id: string) {
  activeId.value = id
}
</script>

<template>
  <section class="container-page mt-28 md:mt-40" aria-labelledby="stack-title">
    <div class="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
      <div>
        <MotionReveal>
          <p class="section-label">// The stack</p>
          <h2 id="stack-title" class="heading-display mt-5 text-4xl sm:text-5xl lg:text-6xl">
            The tools I trust<br /><span class="text-accent">in production.</span>
          </h2>
          <p class="text-body-gray mt-6 max-w-xl">
            The languages, frameworks and infrastructure I rely on to build dependable business
            software. Point at a key, or tab across the board, to see how each one is used.
          </p>
        </MotionReveal>
      </div>
      <p class="font-mono text-xs text-text-muted md:pb-2 md:text-right lg:text-left">
        {{ technologies.length }} tools · {{ technologyGroups.length }} groups
      </p>
    </div>

    <MotionReveal class="mt-14 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <!-- Keyboard board -->
      <div class="card-surface space-y-7 p-6 md:p-9" role="group" aria-label="Technology keyboard">
        <div
          v-for="group in technologyGroups"
          :key="group.id"
          class="grid grid-cols-1 items-start gap-3 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-4"
        >
          <span class="font-mono text-[0.65rem] uppercase tracking-wider text-text-muted">{{
            group.label
          }}</span>
          <div class="flex flex-wrap gap-2.5">
            <button
              v-for="tech in technologies.filter((t) => t.group === group.id)"
              :key="tech.id"
              type="button"
              class="keycap"
              :data-active="tech.id === activeId"
              :aria-pressed="tech.id === activeId"
              @click="select(tech.id)"
              @mouseenter="select(tech.id)"
              @focus="select(tech.id)"
            >
              <span v-if="tech.years" class="keycap-years">{{ tech.years }}</span>
              <span class="keycap-name">{{ tech.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Detail panel -->
      <div class="card-surface relative overflow-hidden p-6 md:p-8" aria-live="polite">
        <AnimatePresence mode="wait">
          <component
            :is="motion.div"
            :key="active.id"
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -8 }"
            :transition="{ duration: 0.25, ease: 'easeOut' }"
          >
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-text-muted">
                key {{ String(activeIndex + 1).padStart(2, '0') }} of
                {{ String(technologies.length).padStart(2, '0') }}
              </span>
              <span
                class="rounded-full border border-border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-accent"
                >{{ activeGroup.label }}</span
              >
            </div>

            <h3 class="font-display mt-6 text-3xl font-bold tracking-tight">{{ active.name }}</h3>

            <template v-if="active.years">
              <p class="mt-5 flex items-baseline gap-3">
                <span class="font-display text-5xl font-bold text-accent">{{ active.years.replace('y', '') }}</span>
                <span class="font-mono text-xs text-text-muted">years in use</span>
              </p>
            </template>

            <div class="mt-6">
              <div class="h-1 w-full rounded-full bg-border">
                <div
                  class="h-1 rounded-full bg-primary transition-[width] duration-500 ease-out"
                  :style="{ width: usageWidth[active.usage] }"
                />
              </div>
              <div class="mt-2 flex justify-between font-mono text-[0.65rem] text-text-muted">
                <span>Used</span>
                <span class="text-text-primary">{{ active.usage }}</span>
              </div>
            </div>

            <p class="text-body-gray mt-6 border-t border-border pt-6 text-sm">
              {{ active.description }}
            </p>
          </component>
        </AnimatePresence>
      </div>
    </MotionReveal>
  </section>
</template>

<style scoped>
.keycap {
  position: relative;
  display: flex;
  min-width: 6.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  border: 1px solid var(--border-strong);
  border-radius: 0.65rem;
  background: var(--surface-elevated);
  padding: 0.65rem 0.9rem;
  box-shadow:
    inset 0 -3px 0 rgba(0, 0, 0, 0.45),
    0 2px 0 rgba(0, 0, 0, 0.3);
  transition:
    transform 0.12s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.keycap:hover,
.keycap:focus-visible {
  border-color: var(--accent);
  transform: translateY(1px);
}

.keycap:active {
  transform: translateY(2px);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.45);
}

.keycap[data-active='true'] {
  background: var(--primary);
  border-color: var(--primary-hover);
  box-shadow:
    inset 0 -3px 0 rgba(0, 0, 0, 0.35),
    0 0 24px -4px var(--purple-glow);
}

.keycap[data-active='true'] .keycap-name,
.keycap[data-active='true'] .keycap-years {
  color: #fff;
}

.keycap-years {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--text-muted);
}

.keycap-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-primary);
  white-space: nowrap;
}

@media (max-width: 639px) {
  .keycap {
    min-width: 0;
    flex: 1 1 calc(50% - 0.65rem);
  }
}
</style>
