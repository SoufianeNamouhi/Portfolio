<script setup lang="ts">
import { useId } from 'vue'
import type { Project } from '@/types/content'

/**
 * Original conceptual project visual — deterministic generative SVG.
 * Explicitly NOT an application screenshot; labelled as conceptual wherever
 * it appears.
 */
const props = withDefaults(defineProps<{ project: Project; variant?: 'thumb' | 'banner' }>(), {
  variant: 'thumb',
})

const uid = useId().replace(/[:]/g, '')
const hue = props.project.accentHue
const id = `pv-${uid}`

// Deterministic variation from the project hue keeps each visual distinct.
const flip = hue % 2 === 0
const big = 58 + (hue % 30)
</script>

<template>
  <svg
    viewBox="0 0 800 600"
    class="h-full w-full"
    :class="variant === 'banner' ? 'aspect-[16/9]' : 'aspect-[4/3]'"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    :aria-label="`Conceptual visual for ${project.name}`"
  >
    <defs>
      <linearGradient :id="`${id}-bg`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" :stop-color="`hsl(${hue} 45% 8%)`" />
        <stop offset="100%" :stop-color="`hsl(${(hue + 40) % 360} 40% 13%)`" />
      </linearGradient>
      <linearGradient :id="`${id}-acc`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" :stop-color="`hsl(${hue} 90% 62%)`" />
        <stop offset="100%" :stop-color="`hsl(${(hue + 50) % 360} 85% 68%)`" />
      </linearGradient>
      <pattern :id="`${id}-grid`" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="white"
          stroke-opacity="0.05"
          stroke-width="1"
        />
      </pattern>
    </defs>

    <rect width="800" height="600" :fill="`url(#${id}-bg)`" />
    <rect width="800" height="600" :fill="`url(#${id}-grid)`" />

    <!-- Architecture lines -->
    <g :stroke="`url(#${id}-acc)`" stroke-width="1.5" fill="none" opacity="0.85">
      <circle :cx="flip ? 560 : 240" cy="260" :r="big + 60" opacity="0.5" />
      <circle :cx="flip ? 560 : 240" cy="260" :r="big" opacity="0.9" />
      <rect
        :x="flip ? 300 : 380"
        y="300"
        :width="big + 90"
        :height="big + 90"
        opacity="0.35"
        :transform="`rotate(${flip ? -8 : 8} ${flip ? 345 : 425} 345)`"
      />
    </g>

    <!-- Signal points -->
    <g :fill="`hsl(${hue} 90% 65%)`">
      <circle :cx="flip ? 560 : 240" cy="260" r="5" />
      <circle :cx="flip ? 560 : 240" :cy="260 - big - 60" r="3" opacity="0.7" />
      <circle :cx="flip ? 560 : 240" :cy="260 + big + 60" r="3" opacity="0.7" />
    </g>

    <!-- Technical annotations -->
    <g font-family="'JetBrains Mono', monospace" font-size="13" fill="white" fill-opacity="0.55">
      <text x="40" y="60">{{ project.index }} / {{ project.name }}</text>
      <text x="40" y="82" fill-opacity="0.35">CONCEPTUAL VISUAL</text>
      <text x="760" y="560" text-anchor="end" fill-opacity="0.35">
        HUE {{ hue }} — SN.ARTSYSTEM
      </text>
    </g>

    <!-- Corner ticks -->
    <g :stroke="`hsl(${hue} 90% 65%)`" stroke-width="1.5" opacity="0.8">
      <path :d="`M 40 24 v -8 h 8`" transform="translate(0,8)" />
      <path d="M 760 24 v -8 h -8" transform="translate(0,8)" />
      <path d="M 40 576 v 8 h 8" />
      <path d="M 760 576 v 8 h -8" />
    </g>
  </svg>
</template>
