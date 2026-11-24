<script setup lang="ts">
import { profile } from '~/data/profile'

const emit = defineEmits<{ done: [] }>()
const { prefersReduced } = useReducedMotion()

const progress = ref(0)
const lineIndex = ref(0)
const lines = ['initializing interface', 'loading design tokens', 'resolving content', 'ready']

let cancelled = false
const timeouts: ReturnType<typeof setTimeout>[] = []

function after(ms: number, fn: () => void) {
  timeouts.push(setTimeout(fn, ms))
}

onMounted(() => {
  if (prefersReduced.value) {
    // Reduced motion: skip the sequence, no artificial delay.
    progress.value = 100
    after(150, () => !cancelled && emit('done'))
    return
  }

  lines.forEach((_, i) => after(i * 260, () => !cancelled && (lineIndex.value = i)))
  after(1050, () => !cancelled && (progress.value = 100))
  after(1350, () => !cancelled && emit('done'))
})

onBeforeUnmount(() => {
  cancelled = true
  timeouts.forEach(clearTimeout)
})
</script>

<template>
  <div
    class="fixed inset-0 z-[60] grid place-items-center bg-background"
    role="status"
    aria-label="Loading"
  >
    <div class="w-64 text-center">
      <div
        class="mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-surface font-mono text-xl font-bold text-accent"
      >
        {{ profile.monogram }}
      </div>

      <div class="mt-6 h-px w-full bg-border">
        <div
          class="h-px bg-accent transition-[width] duration-700 ease-out"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <p class="mt-4 h-5 font-mono text-xs text-text-muted">
        <span class="text-accent">//</span> {{ lines[lineIndex] }}
      </p>
    </div>
  </div>
</template>
