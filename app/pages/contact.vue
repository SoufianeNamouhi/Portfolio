<script setup lang="ts">
import { Mail, MapPin, Clock, Send, LoaderCircle, CircleCheck, CircleAlert, Copy, Check } from 'lucide-vue-next'
import { profile } from '~/data/profile'

useSeoMeta({
  title: 'Contact',
  description:
    "Get in touch with Soufiane Namouhi — let's talk about building something thoughtful, useful, and well-engineered.",
})

const { time } = useLocalTime()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  // Honeypot — must stay empty.
  company: '',
})

const errors = reactive<Record<string, string>>({})
const state = ref<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle')
const serverMessage = ref('')

function validate(): boolean {
  errors.name = form.name.trim().length >= 2 ? '' : 'Please enter your name.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ? ''
    : 'Please enter a valid email address.'
  errors.message = form.message.trim().length >= 10
    ? ''
    : 'Please describe your project in at least a sentence.'
  return !errors.name && !errors.email && !errors.message
}

async function submit() {
  if (state.value === 'sending') return
  if (!validate()) return

  state.value = 'sending'
  serverMessage.value = ''

  try {
    const response = await $fetch<{ ok: boolean; message?: string }>('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        company: form.company,
      },
    })
    state.value = 'sent'
    serverMessage.value = response.message ?? 'Message sent.'
  } catch (error: unknown) {
    const status = (error as { statusCode?: number })?.statusCode
    const message =
      (error as { data?: { message?: string } })?.data?.message ??
      'Something went wrong. Please try again later.'
    serverMessage.value = message
    state.value = status === 503 ? 'unconfigured' : 'error'
  }
}

const copied = ref(false)
async function copyEmail() {
  if (!profile.social.email) return
  try {
    await navigator.clipboard.writeText(profile.social.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="container-page pt-28 md:pt-40">
    <MotionReveal>
      <p class="section-label">// Contact</p>
      <h1 class="heading-display mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-7xl">
        Let's build something <span class="text-accent">that matters.</span>
      </h1>
      <p class="text-body-gray mt-6 max-w-2xl">
        Have a project, a role, or an interesting problem in mind? Let's talk about building
        something thoughtful, useful, and well-engineered.
      </p>
    </MotionReveal>

    <div class="mt-14 grid gap-8 pb-8 lg:grid-cols-[1.15fr_0.85fr]">
      <!-- Form -->
      <MotionReveal class="card-surface p-6 md:p-10">
        <form v-if="state !== 'sent'" novalidate @submit.prevent="submit">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label for="contact-name" class="form-label">Name</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="form-input"
                :aria-invalid="!!errors.name"
                aria-describedby="contact-name-error"
                placeholder="Your name"
              />
              <p v-if="errors.name" id="contact-name-error" class="form-error">{{ errors.name }}</p>
            </div>
            <div>
              <label for="contact-email" class="form-label">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                class="form-input"
                :aria-invalid="!!errors.email"
                aria-describedby="contact-email-error"
                placeholder="you@example.com"
              />
              <p v-if="errors.email" id="contact-email-error" class="form-error">{{ errors.email }}</p>
            </div>
          </div>

          <div class="mt-6">
            <label for="contact-subject" class="form-label">Subject / project type</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              class="form-input"
              placeholder="Web application, consulting, opportunity…"
            />
          </div>

          <div class="mt-6">
            <label for="contact-message" class="form-label">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="6"
              class="form-input resize-y"
              :aria-invalid="!!errors.message"
              aria-describedby="contact-message-error"
              placeholder="Tell me about what you want to build…"
            />
            <p v-if="errors.message" id="contact-message-error" class="form-error">{{ errors.message }}</p>
          </div>

          <!-- Honeypot: hidden from humans, catnip for bots. -->
          <div class="hidden" aria-hidden="true">
            <label for="contact-company">Company</label>
            <input id="contact-company" v-model="form.company" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" class="btn-primary" :disabled="state === 'sending'">
              {{ state === 'sending' ? 'Sending…' : 'Send message' }}
              <span class="btn-icon">
                <LoaderCircle v-if="state === 'sending'" class="size-4 animate-spin" />
                <Send v-else class="size-4" />
              </span>
            </button>
            <p
              v-if="state === 'error' || state === 'unconfigured'"
              class="flex items-center gap-2 text-sm text-red-400"
              role="alert"
            >
              <CircleAlert class="size-4" />
              {{ serverMessage }}
            </p>
          </div>
        </form>

        <div v-else class="py-10 text-center" role="status">
          <CircleCheck class="mx-auto size-10 text-accent" />
          <h2 class="font-display mt-5 text-2xl font-bold tracking-tight">Message sent</h2>
          <p class="text-body-gray mt-3">{{ serverMessage }}</p>
        </div>
      </MotionReveal>

      <!-- Info card -->
      <MotionReveal :delay="0.1" class="card-surface h-fit overflow-hidden">
        <div class="info-glow p-8">
          <p class="font-display text-xl font-bold">Direct contact</p>
          <p class="mt-2 text-sm text-text-secondary">
            Prefer email or a profile? These are the channels I actually read.
          </p>
        </div>

        <ul class="divide-y divide-border border-t border-border">
          <li v-if="profile.social.email" class="info-row">
            <span class="info-icon"><Mail class="size-4" /></span>
            <span class="min-w-0">
              <span class="info-label">Email</span>
              <a :href="`mailto:${profile.social.email}`" class="info-value truncate">{{ profile.social.email }}</a>
            </span>
            <button
              type="button"
              class="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
              :aria-label="copied ? 'Email copied' : 'Copy email address'"
              @click="copyEmail"
            >
              <Check v-if="copied" class="size-4 text-accent" />
              <Copy v-else class="size-4" />
            </button>
          </li>
          <li v-else class="info-row">
            <span class="info-icon"><Mail class="size-4" /></span>
            <span>
              <span class="info-label">Email</span>
              <span class="info-value text-text-muted">Configured soon — use the form for now</span>
            </span>
          </li>
          <li class="info-row">
            <span class="info-icon"><MapPin class="size-4" /></span>
            <span>
              <span class="info-label">Location</span>
              <span class="info-value">{{ profile.location }}</span>
            </span>
          </li>
          <li class="info-row">
            <span class="info-icon"><Clock class="size-4" /></span>
            <span>
              <span class="info-label">Local time</span>
              <ClientOnly
                ><span class="info-value">{{ time }} — {{ profile.timezone }}</span></ClientOnly
              >
            </span>
          </li>
        </ul>
      </MotionReveal>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.85rem 1.1rem;
  color: var(--text-primary);
  transition: border-color 0.2s ease;
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
}

.form-input[aria-invalid='true'] {
  border-color: #f87171;
}

.form-error {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #f87171;
}

.info-glow {
  background:
    radial-gradient(ellipse 120% 100% at 80% 0%, var(--purple-glow), transparent 60%),
    var(--surface-elevated);
}

.info-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.5rem;
}

.info-icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: 9999px;
  color: var(--accent);
  flex-shrink: 0;
}

.info-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.info-value {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 0.15rem;
}

a.info-value:hover {
  color: var(--accent);
}
</style>
