<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Copy } from '@lucide/vue'

const props = defineProps<{ value: string; label?: string }>()
const { t } = useI18n()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
  } catch {
    // Clipboard API unavailable (non-secure context) — select-based fallback.
    const helper = document.createElement('textarea')
    helper.value = props.value
    document.body.appendChild(helper)
    helper.select()
    document.execCommand('copy')
    helper.remove()
  }
  copied.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[0.72rem] tracking-wider text-muted transition-colors duration-300 hover:border-text hover:text-text"
    :aria-label="label ?? t('common.copy')"
    @click="copy"
  >
    <Check v-if="copied" :size="13" class="text-accent" aria-hidden="true" />
    <Copy v-else :size="13" aria-hidden="true" />
    <span aria-live="polite">{{ copied ? t('common.copied') : t('common.copy') }}</span>
  </button>
</template>
