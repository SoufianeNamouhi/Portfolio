<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="border-t border-line bg-surface/30" aria-labelledby="about-title">
    <div class="wrap grid gap-12 py-24 md:grid-cols-12 md:py-36">
      <div class="md:col-span-5">
        <div class="md:sticky md:top-32">
          <Reveal>
            <SectionHeading :eyebrow="t('home.about.eyebrow')">
              <span id="about-title">
                {{ t('home.about.titleTop') }}
                <br />
                <span class="text-accent">{{ t('home.about.titleBottom') }}</span>
              </span>
            </SectionHeading>
            <RouterLink
              to="/about"
              class="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              {{ t('home.about.link') }}
              <ArrowRight
                :size="14"
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </RouterLink>
          </Reveal>
        </div>
      </div>

      <div class="space-y-8 md:col-span-6 md:col-start-7">
        <Reveal v-for="key in ['p1', 'p2', 'p3']" :key="key" :delay="0.08">
          <p
            class="text-base leading-relaxed text-muted md:text-lg"
            :class="key === 'p2' ? 'text-text' : ''"
          >
            {{ t(`home.about.${key}`) }}
          </p>
        </Reveal>
        <Reveal :delay="0.16">
          <p class="font-display text-xl font-semibold tracking-tight text-text/80">— Soufiane</p>
        </Reveal>
      </div>
    </div>
  </section>
</template>
