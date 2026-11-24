import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import gsap from 'gsap'
import { usePreferredReducedMotion } from '@vueuse/core'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Magnetic hover effect for buttons/links. The element gently follows the
 * pointer while hovered and springs back on leave. Disabled automatically on
 * touch devices and under reduced-motion preferences.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.35,
): {
  el: Ref<T | null>
} {
  const el: Ref<T | null> = ref(null)
  const reducedMotion = usePreferredReducedMotion()
  let quickX: ((v: number) => void) | null = null
  let quickY: ((v: number) => void) | null = null
  let cleanup: (() => void) | null = null

  onMounted(() => {
    const node = el.value
    if (!node) return
    if (reducedMotion.value === 'reduce') return
    if (typeof window !== 'undefined' && !window.matchMedia(FINE_POINTER).matches) return

    quickX = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3.out' })
    quickY = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      const relY = event.clientY - (rect.top + rect.height / 2)
      quickX?.(relX * strength)
      quickY?.(relY * strength)
    }
    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    cleanup = () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  })

  onBeforeUnmount(() => {
    cleanup?.()
    if (el.value) gsap.killTweensOf(el.value)
  })

  return { el }
}
