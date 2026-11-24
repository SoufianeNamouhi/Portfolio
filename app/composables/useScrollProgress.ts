import type { Ref } from 'vue'

/**
 * Scroll progress (0..1) of an element traveling through the viewport,
 * used by the sticky engineering-process section to derive the active step.
 */
export function useScrollProgress(target: Ref<HTMLElement | null>) {
  const progress = ref(0)
  let raf = 0

  function measure() {
    raf = 0
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    if (scrollable <= 0) {
      progress.value = 0
      return
    }
    progress.value = Math.min(1, Math.max(0, -rect.top / scrollable))
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(measure)
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  return { progress }
}
