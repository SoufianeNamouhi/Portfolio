<script setup lang="ts">
import { computed } from 'vue'
import { useMagnetic } from '@/composables/useMagnetic'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: Variant
    size?: Size
    magnetic?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    to: undefined,
    href: undefined,
    variant: 'primary',
    size: 'md',
    magnetic: false,
    type: 'button',
    disabled: false,
    ariaLabel: undefined,
  },
)

const emit = defineEmits<{ click: [MouseEvent] }>()

const { el } = useMagnetic<HTMLElement>(props.magnetic ? 0.3 : 0)

const classes = computed(() => {
  const base =
    'group inline-flex cursor-pointer items-center justify-center gap-2 font-mono uppercase tracking-[0.14em] transition-colors duration-300 select-none'
  const sizes = {
    md: 'px-5 py-2.5 text-[0.72rem]',
    lg: 'px-7 py-3.5 text-[0.78rem]',
  }
  const variants = {
    primary:
      'bg-accent text-[#090a0d] hover:bg-text rounded-full font-medium disabled:opacity-40 disabled:pointer-events-none',
    outline:
      'border border-line text-text hover:border-text hover:text-accent rounded-full bg-transparent',
    ghost: 'text-muted hover:text-text px-2 py-1',
  }
  return [base, sizes[props.size], variants[props.variant]].join(' ')
})

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

defineExpose({ el })
</script>

<template>
  <RouterLink v-if="to" ref="el" :to="to" :class="classes" :aria-label="ariaLabel" @click="onClick">
    <slot />
  </RouterLink>
  <a
    v-else-if="href"
    ref="el"
    :href="href"
    :class="classes"
    :aria-label="ariaLabel"
    :aria-disabled="disabled || undefined"
    @click="onClick"
  >
    <slot />
  </a>
  <button
    v-else
    ref="el"
    :type="type"
    :class="classes"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <slot />
  </button>
</template>
