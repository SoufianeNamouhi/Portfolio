<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-border bg-surface text-accent shadow-lg transition-colors hover:border-accent"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Sun v-if="theme === 'dark'" class="size-4.5" />
    <Moon v-else class="size-4.5" />
  </button>
</template>
