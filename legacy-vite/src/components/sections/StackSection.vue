<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { stack } from '@/content/stack'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t, locale } = useI18n()
const activeId = ref(stack[0].id)

function loc(value: { en: string; fr: string }): string {
  return value[locale.value as 'en' | 'fr'] ?? value.en
}

function select(id: string) {
  activeId.value = id
}
</script>

<template>
  <section id="stack" class="border-t border-line bg-surface/30" aria-labelledby="stack-title">
    <div class="wrap py-24 md:py-36">
      <Reveal>
        <SectionHeading index="04" :eyebrow="t('home.stack.eyebrow')">
          <span id="stack-title">{{ t('home.stack.title') }}</span>
        </SectionHeading>
        <p class="-mt-4 mb-12 max-w-2xl text-sm text-muted md:-mt-8 md:mb-16 md:text-base">
          {{ t('home.stack.subtitle') }}
        </p>
      </Reveal>

      <div class="grid gap-10 md:grid-cols-12">
        <div class="md:col-span-4" role="tablist" :aria-label="t('home.stack.eyebrow')">
          <button
            v-for="category in stack"
            :key="category.id"
            type="button"
            role="tab"
            :id="`tab-${category.id}`"
            :aria-selected="activeId === category.id"
            :aria-controls="`panel-${category.id}`"
            class="group flex w-full cursor-pointer items-center justify-between border-b border-line py-4 text-left transition-colors duration-300"
            :class="activeId === category.id ? 'text-text' : 'text-muted hover:text-text'"
            @click="select(category.id)"
          >
            <span class="flex items-baseline gap-4">
              <span class="font-mono text-xs text-accent">{{
                String(stack.indexOf(category) + 1).padStart(2, '0')
              }}</span>
              <span class="font-display text-lg font-medium tracking-tight md:text-xl">
                {{ loc(category.title) }}
              </span>
            </span>
            <span class="font-mono text-[0.66rem] text-muted">{{ category.items.length }}</span>
          </button>
        </div>

        <div class="md:col-span-8">
          <div
            v-for="category in stack"
            v-show="activeId === category.id"
            :key="category.id"
            :id="`panel-${category.id}`"
            role="tabpanel"
            :aria-labelledby="`tab-${category.id}`"
            class="grid gap-px border border-line bg-line sm:grid-cols-2"
          >
            <div
              v-for="item in category.items"
              :key="item.name"
              class="group bg-bg p-5 transition-colors duration-300 hover:bg-surface"
            >
              <p
                class="font-display text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent md:text-lg"
              >
                {{ item.name }}
              </p>
              <p class="mt-1 text-[0.8rem] text-muted">{{ loc(item.note) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
