<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from '@/lib/gsap'

/**
 * Scroll-triggered reveal wrapper. Uses gsap.fromTo so content stays visible
 * if animation never runs (reduced motion, JS failure). All tweens are
 * reverted on unmount.
 */
const props = withDefaults(
  defineProps<{
    as?: string
    delay?: number
    y?: number
    duration?: number
    /** Start point of the trigger, e.g. 'top 85%'. */
    start?: string
  }>(),
  { as: 'div', delay: 0, y: 32, duration: 0.9, start: 'top 88%' },
)

const root = ref<HTMLElement | null>(null)
const reducedMotion = usePreferredReducedMotion()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (reducedMotion.value === 'reduce' || !root.value) return
  ctx = gsap.context(() => {
    gsap.fromTo(
      root.value,
      { y: props.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: props.duration,
        delay: props.delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.value, start: props.start, once: true },
      },
    )
  }, root)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <component :is="as" ref="root">
    <slot />
  </component>
</template>
