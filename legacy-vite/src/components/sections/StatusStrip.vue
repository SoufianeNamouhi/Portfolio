<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/config/site'

const { t } = useI18n()

const items = computed(() => [
  { label: t('status.name'), mono: false },
  { label: t('status.role'), mono: false },
  { label: t('status.location'), mono: false },
  { label: t('status.focus'), mono: false },
])

const available = computed(() => site.availableForWork)
</script>

<template>
  <section id="status" class="border-y border-line bg-surface/40" aria-label="Status">
    <div class="wrap grid grid-cols-2 gap-x-6 md:grid-cols-4">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center gap-3 border-l border-line py-5 pl-4 first:border-l-0 md:py-6"
      >
        <span v-if="i === 3" class="relative flex size-2 shrink-0" aria-hidden="true">
          <span
            class="absolute inline-flex size-full rounded-full"
            :class="available ? 'bg-accent animate-pulse-dot' : 'bg-muted'"
          />
          <span
            class="relative inline-flex size-2 rounded-full"
            :class="available ? 'bg-accent' : 'bg-muted'"
          />
        </span>
        <p class="truncate text-[0.8rem] font-medium tracking-wide">{{ item.label }}</p>
      </div>
    </div>
    <p class="sr-only">{{ available ? t('status.available') : t('status.notAvailable') }}</p>
  </section>
</template>
