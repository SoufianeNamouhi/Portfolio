<script setup lang="ts">
import { motion } from 'motion-v'
import { ArrowRight, Download } from 'lucide-vue-next'
import { profile } from '~/data/profile'

const { prefersReduced } = useReducedMotion()

// Subtle pointer parallax for the monogram panel (fine pointers only).
const panel = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)

function onPointerMove(event: PointerEvent) {
  if (prefersReduced.value || event.pointerType !== 'mouse' || !panel.value) return
  const rect = panel.value.getBoundingClientRect()
  tiltX.value = ((event.clientX - rect.left) / rect.width - 0.5) * 8
  tiltY.value = ((event.clientY - rect.top) / rect.height - 0.5) * -8
}

function resetTilt() {
  tiltX.value = 0
  tiltY.value = 0
}

const ease = [0.22, 1, 0.36, 1] as const

const enter = (delay: number) =>
  prefersReduced.value
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease },
      }
</script>

<template>
  <section class="hero-grid relative overflow-hidden pt-28 md:pt-40">
    <div class="container-page grid items-center gap-14 pb-16 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <component :is="motion.p" v-bind="enter(0)" class="section-label">
          // {{ profile.title }} · Vue.js · Enterprise Systems
        </component>

        <component :is="motion.h1" v-bind="enter(0.08)" class="heading-display mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl">
          Building software<br />
          that solves real<br />
          <span class="text-accent">business problems.</span>
        </component>

        <component :is="motion.p" v-bind="enter(0.16)" class="text-body-gray mt-7 max-w-xl">
          Software developer based in Morocco, specializing in enterprise web applications,
          logistics systems and modern frontend experiences. I build reliable, intuitive software
          with Vue.js, Java, Spring Boot and PostgreSQL.
        </component>

        <component :is="motion.div" v-bind="enter(0.24)" class="mt-9 flex flex-wrap gap-4">
          <NuxtLink to="/projects" class="btn-primary">
            View projects
            <span class="btn-icon"><ArrowRight class="size-4" /></span>
          </NuxtLink>
          <a v-if="profile.cvUrl" :href="profile.cvUrl" target="_blank" rel="noopener" class="btn-outline">
            Download CV
            <Download class="size-4" />
          </a>
        </component>
      </div>

      <!-- Portrait area: monogram composition until a real photograph is provided. -->
      <component :is="motion.div" v-bind="enter(0.2)" class="relative hidden lg:block">
        <div
          ref="panel"
          class="monogram-panel"
          :style="{ transform: `perspective(900px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)` }"
          @pointermove="onPointerMove"
          @pointerleave="resetTilt"
        >
          <img
            v-if="profile.portraitUrl"
            :src="profile.portraitUrl"
            :alt="`Portrait of ${profile.name}`"
            class="h-full w-full rounded-2xl object-cover"
          />
          <div v-else class="monogram-fallback" aria-hidden="true">
            <span class="monogram-letters">{{ profile.monogram }}</span>
            <span class="monogram-caption font-mono">// {{ profile.location }}</span>
          </div>
        </div>
      </component>
    </div>

    <div class="container-page">
      <component
        :is="motion.div"
        v-bind="enter(0.32)"
        class="grid grid-cols-3 gap-6 border-t border-border pt-8 pb-16"
      >
        <div
v-for="stat in [
          { value: profile.yearsOfExperience, label: 'Years of professional experience' },
          { value: '5', label: 'Professional projects' },
          { value: 'MA', label: 'Based in Morocco' },
        ]" :key="stat.label">
          <p class="font-display text-3xl font-bold sm:text-4xl">{{ stat.value }}</p>
          <p class="mt-1.5 font-mono text-xs text-text-muted">{{ stat.label }}</p>
        </div>
      </component>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  position: relative;
}

.hero-grid::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 72px 72px;
  background-position: center top;
  opacity: 0.5;
  mask-image: linear-gradient(180deg, black, transparent 72%);
  -webkit-mask-image: linear-gradient(180deg, black, transparent 72%);
}

.hero-grid > * {
  position: relative;
  z-index: 1;
}

.monogram-panel {
  position: relative;
  aspect-ratio: 4 / 5;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  background:
    radial-gradient(ellipse 90% 70% at 70% 20%, var(--purple-glow), transparent),
    var(--surface);
  transition: transform 0.25s ease-out;
  overflow: hidden;
}

.monogram-fallback {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.monogram-letters {
  font-family: var(--font-display);
  font-size: clamp(4rem, 9vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  color: var(--text-primary);
  line-height: 1;
}

.monogram-letters::after {
  content: '';
  display: inline-block;
  width: 0.16em;
  height: 0.16em;
  margin-left: 0.08em;
  background: var(--primary);
}

.monogram-caption {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
