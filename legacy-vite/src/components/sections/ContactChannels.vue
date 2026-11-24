<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { FileText, GitBranch, Briefcase, Mail } from '@lucide/vue'
import { site } from '@/config/site'
import CopyButton from '@/components/ui/CopyButton.vue'

/**
 * Contact channel cards driven entirely by src/config/site.ts.
 * Every unconfigured channel renders an intentional, explained state
 * instead of a dead link — nothing is fabricated.
 */
const { t } = useI18n()

const channels = [
  {
    id: 'email',
    label: 'Email',
    value: site.email,
    href: site.email ? `mailto:${site.email}` : null,
    icon: Mail,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: site.github,
    href: site.github,
    icon: GitBranch,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: site.linkedin,
    href: site.linkedin,
    icon: Briefcase,
  },
  {
    id: 'resume',
    label: t('home.contact.resume'),
    value: site.resumeUrl,
    href: site.resumeUrl,
    icon: FileText,
  },
]
</script>

<template>
  <ul class="grid gap-px border border-line bg-line sm:grid-cols-2">
    <li v-for="channel in channels" :key="channel.id" class="bg-bg">
      <div
        class="group flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-300 hover:bg-surface md:p-7"
      >
        <div class="flex items-center justify-between">
          <component
            :is="channel.icon"
            :size="18"
            class="text-muted transition-colors duration-300 group-hover:text-accent"
            aria-hidden="true"
          />
          <span class="tag !text-[0.6rem]">{{ channel.label }}</span>
        </div>

        <div v-if="channel.href" class="min-w-0">
          <a
            :href="channel.href"
            class="truncate font-mono text-sm text-text underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            :target="channel.id === 'email' ? undefined : '_blank'"
            :rel="channel.id === 'email' ? undefined : 'noopener noreferrer'"
          >
            {{ channel.value }}
          </a>
          <div v-if="channel.id === 'email'" class="mt-4">
            <CopyButton v-if="site.email" :value="site.email" />
          </div>
        </div>

        <p v-else class="text-[0.8rem] leading-relaxed text-muted">
          <span class="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-line">
            —
          </span>
          {{ t('home.contact.notConfigured') }}
        </p>
      </div>
    </li>
  </ul>
</template>
