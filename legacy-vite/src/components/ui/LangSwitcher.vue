<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Globe } from '@lucide/vue'
import { setLocale, type Locale } from '@/i18n'

const { t, locale } = useI18n()

const options: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'fr', label: 'FR' },
]

function choose(value: Locale) {
  if (value !== locale.value) setLocale(value)
}
</script>

<template>
  <div
    class="flex items-center gap-1 rounded-full border border-line p-1"
    role="group"
    :aria-label="t('nav.language')"
  >
    <Globe :size="13" class="ml-1.5 text-muted" aria-hidden="true" />
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="cursor-pointer rounded-full px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-widest transition-colors duration-300"
      :class="
        locale === opt.value ? 'bg-accent font-medium text-[#090a0d]' : 'text-muted hover:text-text'
      "
      :aria-pressed="locale === opt.value"
      @click="choose(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
