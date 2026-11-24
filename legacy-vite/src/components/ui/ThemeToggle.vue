<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Sun, Moon } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const themeStore = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="relative grid size-10 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-text hover:text-text"
    :aria-label="themeStore.theme === 'dark' ? t('nav.theme.toLight') : t('nav.theme.toDark')"
    @click="themeStore.toggle()"
  >
    <Sun v-if="themeStore.theme === 'dark'" :size="16" stroke-width="1.75" aria-hidden="true" />
    <Moon v-else :size="16" stroke-width="1.75" aria-hidden="true" />
  </button>
</template>
