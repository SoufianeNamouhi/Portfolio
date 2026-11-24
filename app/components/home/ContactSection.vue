<script setup lang="ts">
import { ArrowRight, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-vue-next'
import { profile } from '~/data/profile'

const { time } = useLocalTime()
</script>

<template>
  <section class="container-page mt-28 md:mt-40" aria-labelledby="contact-title">
    <UiSectionHeader
      label="Contact"
      title="Let's build something"
      accent="that matters."
      description="Have a project, a role, or an interesting problem in mind? Share the details and let's talk about building something thoughtful, useful, and well-engineered."
    />

    <div class="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <MotionReveal class="card-surface flex flex-col items-start justify-center gap-6 p-8 md:p-12">
        <p class="text-body-gray max-w-md">
          The contact form lives on the dedicated contact page — name, email, and the shape of what
          you want to build.
        </p>
        <NuxtLink to="/contact" class="btn-primary">
          Go to the contact form
          <span class="btn-icon"><ArrowRight class="size-4" /></span>
        </NuxtLink>
      </MotionReveal>

      <MotionReveal :delay="0.1" class="contact-card card-surface overflow-hidden">
        <div class="card-glow p-8 md:p-10">
          <p v-if="profile.availability.show" class="font-display text-xl font-bold">
            {{ profile.availability.label }}
            <span class="dot-live ml-1 inline-block size-2 rounded-full bg-primary align-middle" />
          </p>
          <p class="font-display text-xl font-bold">Based in Morocco</p>
          <p class="mt-2 text-sm text-text-secondary">
            Working on enterprise systems at {{ profile.company }}.
          </p>
        </div>

        <ul class="divide-y divide-border border-t border-border">
          <li v-if="profile.social.email" class="contact-row">
            <span class="contact-icon"><Mail class="size-4" /></span>
            <span>
              <span class="contact-label">Email</span>
              <a :href="`mailto:${profile.social.email}`" class="contact-value">{{
                profile.social.email
              }}</a>
            </span>
          </li>
          <li v-if="profile.social.linkedin" class="contact-row">
            <span class="contact-icon"><ArrowUpRight class="size-4" /></span>
            <span>
              <span class="contact-label">LinkedIn</span>
              <a :href="profile.social.linkedin" target="_blank" rel="noopener" class="contact-value"
                >Profile</a
              >
            </span>
          </li>
          <li class="contact-row">
            <span class="contact-icon"><MapPin class="size-4" /></span>
            <span>
              <span class="contact-label">Location</span>
              <span class="contact-value">{{ profile.location }}</span>
            </span>
          </li>
          <li class="contact-row">
            <span class="contact-icon"><Clock class="size-4" /></span>
            <span>
              <span class="contact-label">Local time</span>
              <ClientOnly
                ><span class="contact-value">{{ time }} ({{ profile.timezone }})</span></ClientOnly
              >
            </span>
          </li>
        </ul>
      </MotionReveal>
    </div>
  </section>
</template>

<style scoped>
.card-glow {
  background:
    radial-gradient(ellipse 120% 100% at 80% 0%, var(--purple-glow), transparent 60%),
    var(--surface-elevated);
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
}

.contact-icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: 9999px;
  color: var(--accent);
  flex-shrink: 0;
}

.contact-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.contact-value {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 0.15rem;
}

a.contact-value:hover {
  color: var(--accent);
}
</style>
