<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { profile } from '~/data/profile'
</script>

<template>
  <section class="container-page mt-28 md:mt-40" aria-labelledby="about-title">
    <div class="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
      <MotionReveal>
        <p class="section-label">// About</p>
        <h2 id="about-title" class="heading-display mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem]">
          <span class="text-text-muted">Three years of building enterprise web applications from
            Morocco taught me that</span>
          reliability is a feature, clear interfaces are engineering,
          <span class="text-text-muted">and the best software is the software</span>
          people can trust.
        </h2>
        <NuxtLink to="/about" class="link-arrow mt-8">
          More about me <ArrowRight class="size-4" />
        </NuxtLink>
      </MotionReveal>

      <MotionReveal :delay="0.12">
        <figure class="card-surface monogram-card grid place-items-center p-10 text-center">
          <span class="font-display text-6xl font-bold tracking-tight">{{ profile.monogram }}</span>
          <span class="mt-1 block size-2 bg-primary mx-auto" aria-hidden="true" />
          <figcaption class="mt-6 font-mono text-xs text-text-muted">
            — {{ profile.name }} · {{ profile.location }}
          </figcaption>
        </figure>
      </MotionReveal>
    </div>
  </section>
</template>

<style scoped>
.monogram-card {
  background:
    radial-gradient(ellipse 100% 80% at 50% 100%, var(--purple-glow), transparent),
    var(--surface);
  aspect-ratio: 4 / 3.4;
}
</style>
