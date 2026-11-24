<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePreferredReducedMotion, useScrollLock } from '@vueuse/core'
import { gsap } from '@/lib/gsap'
import { site } from '@/config/site'

const SEEN_KEY = 'sn-preloader-seen'

const seen = ref(false)
const root = ref<HTMLElement | null>(null)
const reducedMotion = usePreferredReducedMotion()
const isLocked = useScrollLock(document.body)

// Never replay within the same tab session.
try {
  seen.value = sessionStorage.getItem(SEEN_KEY) === '1'
} catch {
  seen.value = true // storage unavailable — don't block content
}

onMounted(() => {
  if (seen.value) return
  isLocked.value = true

  if (reducedMotion.value === 'reduce' || !root.value) {
    finish()
    return
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ onComplete: finish })
    tl.fromTo(
      '[data-pre-mono] span',
      { yPercent: 110 },
      { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out' },
    )
      .fromTo(
        '[data-pre-bar]',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
        '-=0.3',
      )
      .fromTo('[data-pre-meta]', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.6')
      .to(root.value, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.25 })
      .set(root.value, { display: 'none' })
  }, root)
  cleanupFns.push(() => ctx.revert())
})

function finish() {
  seen.value = true
  isLocked.value = false
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* best-effort */
  }
}

const cleanupFns: (() => void)[] = []

onBeforeUnmount(() => cleanupFns.forEach((fn) => fn()))
</script>

<template>
  <div
    v-if="!seen"
    ref="root"
    class="fixed inset-0 z-[100] grid place-items-center bg-bg"
    aria-hidden="true"
  >
    <div class="flex flex-col items-center gap-6">
      <p
        data-pre-mono
        class="flex overflow-hidden font-display text-6xl font-bold tracking-tight md:text-7xl"
      >
        <span>{{ site.monogram.charAt(0) }}</span>
        <span>{{ site.monogram.charAt(1) }}</span>
      </p>
      <div class="h-px w-40 overflow-hidden bg-line md:w-56">
        <div data-pre-bar class="h-full w-full origin-left bg-accent" />
      </div>
      <p data-pre-meta class="tag opacity-0">{{ site.role }} — {{ site.location }}</p>
    </div>
  </div>
</template>
