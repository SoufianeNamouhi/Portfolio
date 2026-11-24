<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from '@/lib/gsap'
import Reveal from '@/components/motion/Reveal.vue'
import ContactChannels from '@/components/sections/ContactChannels.vue'

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)
const glow = ref<HTMLDivElement | null>(null)
const reducedMotion = usePreferredReducedMotion()
let quickX: ((v: number) => void) | null = null
let quickY: ((v: number) => void) | null = null

onMounted(() => {
  if (reducedMotion.value === 'reduce' || !glow.value) return
  quickX = gsap.quickTo(glow.value, 'x', { duration: 1.2, ease: 'power3.out' })
  quickY = gsap.quickTo(glow.value, 'y', { duration: 1.2, ease: 'power3.out' })
})

function onPointerMove(e: PointerEvent) {
  if (!quickX || !quickY || !root.value) return
  const rect = root.value.getBoundingClientRect()
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
  quickX(nx * 60)
  quickY(ny * 40)
}

onBeforeUnmount(() => {
  if (glow.value) gsap.killTweensOf(glow.value)
})
</script>

<template>
  <section
    ref="root"
    id="contact"
    class="relative overflow-hidden border-t border-line"
    aria-labelledby="contact-title"
    @pointermove="onPointerMove"
  >
    <!-- Atmospheric glow + grid backdrop -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        ref="glow"
        class="absolute left-1/2 top-1/3 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        :style="{ background: 'radial-gradient(circle, var(--accent-soft), transparent 65%)' }"
      />
      <div
        class="absolute inset-0 opacity-[0.35]"
        :style="{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 35%, black 20%, transparent 70%)',
        }"
      />
    </div>

    <div class="wrap relative py-24 md:py-36">
      <Reveal>
        <p class="tag mb-6 flex items-center justify-center gap-3">
          <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
          {{ t('home.contact.eyebrow') }}
          <span class="inline-block h-px w-8 bg-accent" aria-hidden="true" />
        </p>
        <h2
          id="contact-title"
          class="mx-auto max-w-4xl text-center text-h2 font-semibold leading-[1.02]"
        >
          {{ t('home.contact.titleTop') }}
          <br />
          <span class="text-gradient">{{ t('home.contact.titleBottom') }}</span>
        </h2>
        <p class="mx-auto mt-6 max-w-md text-center text-sm text-muted md:text-base">
          {{ t('home.contact.body') }}
        </p>
      </Reveal>

      <Reveal class="mx-auto mt-14 max-w-3xl md:mt-20" :delay="0.1">
        <ContactChannels />
      </Reveal>
    </div>
  </section>
</template>
