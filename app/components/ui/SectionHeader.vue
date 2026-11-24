<script setup lang="ts">
defineProps<{
  label: string
  title: string
  /** Part of the title rendered in the accent color. */
  accent?: string
  description?: string
}>()
</script>

<template>
  <div class="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
    <div>
      <MotionReveal>
        <p class="section-label">// {{ label }}</p>
        <h2 class="heading-display mt-5 text-4xl sm:text-5xl lg:text-6xl">
          {{ title }}
          <span v-if="accent" class="text-accent">{{ accent }}</span>
        </h2>
      </MotionReveal>
    </div>
    <MotionReveal v-if="description || $slots.default" :delay="0.1">
      <div class="text-body-gray md:pb-2 md:text-right lg:text-left">
        <p v-if="description">{{ description }}</p>
        <slot />
      </div>
    </MotionReveal>
  </div>
</template>
