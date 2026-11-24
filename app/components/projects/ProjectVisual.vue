<script setup lang="ts">
import type { Project } from '~/types/content'

const props = defineProps<{ project: Project }>()

// Abstract, clearly conceptual UI-inspired visuals — placeholders for authorized assets.
const variant = computed(() => props.project.visual)
</script>

<template>
  <div class="visual-stage" role="img" :aria-label="`Conceptual visual for ${project.name}`">
    <svg viewBox="0 0 480 300" class="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient :id="`glow-${project.slug}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.32" />
          <stop offset="100%" stop-color="var(--primary)" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- window frame -->
      <rect x="24" y="20" width="432" height="260" rx="12" fill="var(--surface-elevated)" stroke="var(--border)" />
      <rect x="24" y="20" width="432" height="34" rx="12" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="46" cy="37" r="4" fill="var(--border-strong)" />
      <circle cx="62" cy="37" r="4" fill="var(--border-strong)" />
      <circle cx="78" cy="37" r="4" fill="var(--primary)" opacity="0.8" />
      <rect x="100" y="31" width="150" height="12" rx="6" fill="var(--surface-elevated)" stroke="var(--border)" />

      <rect x="24" y="54" width="432" height="226" :fill="`url(#glow-${project.slug})`" />

      <!-- sidebar -->
      <rect x="24" y="54" width="96" height="226" fill="var(--surface)" stroke="var(--border)" />
      <rect
v-for="i in 6" :key="i" x="38" :y="66 + (i - 1) * 32" :width="i === 1 ? 68 : 48" height="10" rx="5"
        :fill="i === 1 ? 'var(--primary)' : 'var(--border-strong)'" :opacity="i === 1 ? 0.9 : 0.7" />

      <!-- dashboard variant: chart + stat cards -->
      <template v-if="variant === 'dashboard'">
        <rect x="138" y="70" width="90" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect x="238" y="70" width="90" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect x="338" y="70" width="100" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect x="150" y="94" width="52" height="10" rx="5" fill="var(--primary)" />
        <rect x="250" y="94" width="46" height="10" rx="5" fill="var(--border-strong)" />
        <rect x="350" y="94" width="60" height="10" rx="5" fill="var(--border-strong)" />
        <rect x="138" y="136" width="300" height="130" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <polyline
points="150,240 195,205 240,220 285,180 330,195 375,160 420,170"
          fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <g stroke="var(--border)" stroke-dasharray="3 5">
          <line x1="150" y1="200" x2="420" y2="200" />
          <line x1="150" y1="235" x2="420" y2="235" />
        </g>
      </template>

      <!-- portal variant: tracking list + status -->
      <template v-else-if="variant === 'portal'">
        <rect x="138" y="70" width="300" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect x="152" y="85" width="120" height="10" rx="5" fill="var(--border-strong)" />
        <rect x="352" y="82" width="70" height="16" rx="8" fill="var(--primary)" opacity="0.85" />
        <rect
v-for="i in 4" :key="i" x="138" :y="122 + (i - 1) * 38" width="300" height="28" rx="8"
          fill="var(--surface)" stroke="var(--border)" />
        <circle
v-for="i in 4" :key="`d${i}`" cx="154" :cy="136 + (i - 1) * 38" r="5"
          :fill="i < 3 ? 'var(--primary)' : 'var(--border-strong)'" />
        <rect
v-for="i in 4" :key="`t${i}`" x="170" :y="131 + (i - 1) * 38" :width="120 - i * 12" height="10" rx="5"
          fill="var(--border-strong)" />
      </template>

      <!-- logistics variant: route map -->
      <template v-else-if="variant === 'logistics'">
        <rect x="138" y="70" width="300" height="196" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <path
d="M160 230 C 210 150, 260 220, 310 140 S 400 170, 420 110"
          fill="none" stroke="var(--primary)" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round" />
        <circle cx="160" cy="230" r="7" fill="var(--primary)" />
        <circle cx="310" cy="140" r="7" fill="var(--surface)" stroke="var(--primary)" stroke-width="3" />
        <circle cx="420" cy="110" r="7" fill="var(--primary)" />
        <rect x="160" y="84" width="90" height="12" rx="6" fill="var(--border-strong)" />
      </template>

      <!-- operations variant: kanban columns -->
      <template v-else-if="variant === 'operations'">
        <g v-for="c in 3" :key="c">
          <rect :x="138 + (c - 1) * 102" y="70" width="92" height="196" rx="8" fill="var(--surface)" stroke="var(--border)" />
          <rect
:x="150 + (c - 1) * 102" y="84" width="50" height="10" rx="5"
            :fill="c === 2 ? 'var(--primary)' : 'var(--border-strong)'" />
          <rect
v-for="r in (4 - (c - 1))" :key="r" :x="150 + (c - 1) * 102" :y="104 + (r - 1) * 40" width="68" height="30" rx="6"
            fill="var(--surface-elevated)" stroke="var(--border)" />
        </g>
      </template>

      <!-- reporting variant: document + table -->
      <template v-else>
        <rect x="138" y="70" width="180" height="196" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect x="154" y="88" width="100" height="12" rx="6" fill="var(--primary)" />
        <rect
v-for="i in 7" :key="i" x="154" :y="116 + (i - 1) * 19" :width="148 - (i % 3) * 24" height="8" rx="4"
          fill="var(--border-strong)" opacity="0.75" />
        <rect x="334" y="70" width="104" height="196" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect
v-for="i in 5" :key="`b${i}`" :x="348 + (i - 1) * 16" :y="240 - i * 22" width="10" :height="i * 22" rx="3"
          :fill="i === 4 ? 'var(--primary)' : 'var(--border-strong)'" />
      </template>
    </svg>
  </div>
</template>

<style scoped>
.visual-stage {
  background: var(--surface-elevated);
  border-bottom: 1px solid var(--border);
  padding: clamp(1rem, 4%, 2.5rem);
}
</style>
