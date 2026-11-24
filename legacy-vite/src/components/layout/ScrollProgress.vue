<script setup lang="ts">
import { computed } from 'vue'
import { useScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { y } = useScroll(window)

const progress = computed(() => {
  const total = document.documentElement.scrollHeight - window.innerHeight
  return total > 0 ? Math.min(1, y.value / total) : 0
})
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    :style="{ transform: `scaleX(${progress})` }"
    role="progressbar"
    :aria-label="t('a11y.scrollProgress')"
    :aria-valuenow="Math.round(progress * 100)"
    aria-valuemin="0"
    aria-valuemax="100"
  />
</template>
