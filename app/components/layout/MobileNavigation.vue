<script setup lang="ts">
import { ArrowRight, X } from 'lucide-vue-next'
import { profile } from '~/data/profile'

const props = defineProps<{
  open: boolean
  links: { id: string; label: string; to: string }[]
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const route = useRoute()
const panel = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

function close() {
  emit('update:open', false)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) return
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) {
      window.addEventListener('keydown', onKeydown)
      nextTick(() => closeButton.value?.focus())
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.documentElement.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        ref="panel"
        class="fixed inset-0 z-50 flex flex-col bg-background"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div class="container-page flex h-16 items-center justify-between md:h-20">
          <span class="flex items-center gap-1.5">
            <span class="font-display text-lg font-bold tracking-tight">{{ profile.name }}</span>
            <span class="mt-1 block size-2 bg-primary" aria-hidden="true" />
          </span>
          <button
            ref="closeButton"
            type="button"
            class="grid size-11 place-items-center rounded-xl border border-accent text-accent"
            aria-label="Close menu"
            @click="close"
          >
            <X class="size-5" />
          </button>
        </div>

        <nav class="container-page mt-6 flex-1" aria-label="Mobile">
          <ul>
            <li v-for="(link, index) in links" :key="link.to" class="border-b border-border">
              <NuxtLink
                :to="link.to"
                class="group flex items-center gap-5 py-5"
                :aria-current="isActive(link.to) ? 'page' : undefined"
                :style="{ '--stagger': `${index * 45}ms` }"
              >
                <span
                  class="font-mono text-sm"
                  :class="isActive(link.to) ? 'text-accent' : 'text-text-muted'"
                  >{{ link.id }}</span
                >
                <span
                  class="font-display text-4xl font-bold tracking-tight transition-colors"
                  :class="
                    isActive(link.to) ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                  "
                  >{{ link.label }}</span
                >
                <ArrowRight
                  class="ml-auto size-6 transition-all group-hover:translate-x-1"
                  :class="isActive(link.to) ? 'text-accent' : 'text-text-muted'"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="container-page space-y-3 pb-10">
          <p
            v-if="profile.availability.show"
            class="flex items-center gap-2 font-mono text-sm text-text-secondary"
          >
            <span class="dot-live size-2 rounded-full bg-primary" aria-hidden="true" />
            {{ profile.availability.label }}
          </p>
          <NuxtLink to="/contact" class="btn-outline w-full justify-center">Get in touch</NuxtLink>
          <a
            v-if="profile.cvUrl"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener"
            class="btn-outline w-full justify-center"
            >Preview CV</a
          >
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
