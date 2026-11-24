<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useEventListener, usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from '@/lib/gsap'

/**
 * Accent cursor follower for precise pointers only. The native cursor stays
 * fully functional; this adds a lagging blend-mode ring that expands over
 * interactive elements.
 */
const reducedMotion = usePreferredReducedMotion()
const finePointer =
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
const enabled = computed(() => finePointer && reducedMotion.value !== 'reduce')

const dot = ref<HTMLDivElement | null>(null)
const ring = ref<HTMLDivElement | null>(null)
const hover = ref(false)
let dotX: ((v: number) => void) | null = null
let dotY: ((v: number) => void) | null = null
let ringX: ((v: number) => void) | null = null
let ringY: ((v: number) => void) | null = null

onMounted(() => {
  if (!enabled.value) return
  dotX = gsap.quickTo(dot.value, 'x', { duration: 0.08, ease: 'power2.out' })
  dotY = gsap.quickTo(dot.value, 'y', { duration: 0.08, ease: 'power2.out' })
  ringX = gsap.quickTo(ring.value, 'x', { duration: 0.35, ease: 'power3.out' })
  ringY = gsap.quickTo(ring.value, 'y', { duration: 0.35, ease: 'power3.out' })
})

useEventListener(document, 'pointermove', (e: PointerEvent) => {
  if (!enabled.value) return
  dotX?.(e.clientX)
  dotY?.(e.clientY)
  ringX?.(e.clientX)
  ringY?.(e.clientY)
})

useEventListener(document, 'pointerover', (e: PointerEvent) => {
  if (!enabled.value) return
  const target = e.target as HTMLElement | null
  hover.value = Boolean(target?.closest?.('a, button, [role="button"], input, textarea, select'))
})

onBeforeUnmount(() => {
  for (const node of [dot.value, ring.value]) {
    if (node) gsap.killTweensOf(node)
  }
})
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed inset-0 z-[90] hidden md:block"
    aria-hidden="true"
  >
    <div
      ref="dot"
      class="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
    />
    <div
      ref="ring"
      class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent mix-blend-difference transition-[width,height,opacity] duration-300"
      :class="hover ? 'size-10 opacity-90' : 'size-5 opacity-40'"
    />
  </div>
</template>
