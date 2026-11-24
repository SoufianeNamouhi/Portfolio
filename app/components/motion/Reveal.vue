<script setup lang="ts">
import { motion } from 'motion-v'

withDefaults(defineProps<{ delay?: number; y?: number }>(), { delay: 0, y: 24 })

const { prefersReduced } = useReducedMotion()
</script>

<template>
  <motion.div
    v-if="!prefersReduced"
    :initial="{ opacity: 0, y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, margin: '-60px' }"
    :transition="{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </motion.div>
  <div v-else><slot /></div>
</template>
