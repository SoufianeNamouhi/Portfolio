<script setup lang="ts">
withDefaults(defineProps<{ index?: string; eyebrow: string }>(), { index: undefined })
</script>

<template>
  <div class="mb-10 flex items-end justify-between gap-6 md:mb-16">
    <div>
      <p class="tag mb-4 flex items-center gap-3">
        <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
        {{ eyebrow }}
      </p>
      <h2 class="max-w-3xl text-h2 font-semibold leading-[1.02]">
        <slot />
      </h2>
    </div>
    <span
      v-if="index"
      aria-hidden="true"
      class="hidden shrink-0 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-none text-line md:block"
    >
      {{ index }}
    </span>
  </div>
</template>
