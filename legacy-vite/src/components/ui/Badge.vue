<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300"
  >
    {{ label }}
  </span>
</template>
