<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

/**
 * Procedural hero visual: a perspective dot field with a slowly rotating
 * wireframe gyroscope. Reacts subtly to pointer movement, pauses offscreen,
 * renders a single static frame under reduced motion.
 */
const canvas = ref<HTMLCanvasElement | null>(null)
const reducedMotion = usePreferredReducedMotion()

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let running = false
let width = 0
let height = 0
let dpr = 1
let colors = { accent: '#c9ff68', accent2: '#94bbff', line: '#272b33' }
const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
let time = 0

function readColors() {
  const styles = getComputedStyle(document.documentElement)
  colors = {
    accent: styles.getPropertyValue('--accent').trim() || colors.accent,
    accent2: styles.getPropertyValue('--accent-2').trim() || colors.accent2,
    line: styles.getPropertyValue('--line').trim() || colors.line,
  }
}

function resize() {
  const el = canvas.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = el.clientWidth
  height = el.clientHeight
  el.width = width * dpr
  el.height = height * dpr
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  readColors()
  if (reducedMotion.value === 'reduce') draw()
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) * 0.34
  const px = pointer.x * 18
  const py = pointer.y * 14

  // Perspective dot field.
  const gap = 42
  ctx.fillStyle = colors.line
  for (let gx = gap / 2; gx < width; gx += gap) {
    for (let gy = gap / 2; gy < height; gy += gap) {
      const depth = 1 - Math.min(1, Math.hypot(gx - cx, gy - cy) / (radius * 2.4))
      ctx.globalAlpha = 0.18 + depth * 0.5
      ctx.fillRect(gx + px * depth, gy + py * depth, 1.5, 1.5)
    }
  }
  ctx.globalAlpha = 1

  // Wireframe gyroscope: three rotating elliptical rings + core.
  const rings = [
    {
      tilt: time * 0.35 + pointer.x * 0.4,
      squash: 0.36,
      alpha: 0.5,
      color: colors.accent,
      width: 1.4,
    },
    {
      tilt: -time * 0.28 + 1.1 + pointer.y * 0.35,
      squash: 0.5,
      alpha: 0.32,
      color: colors.accent2,
      width: 1.1,
    },
    { tilt: time * 0.22 + 2.2, squash: 0.22, alpha: 0.22, color: colors.accent, width: 1 },
  ]
  for (const ring of rings) {
    ctx.save()
    ctx.translate(cx + px * 1.6, cy + py * 1.6)
    ctx.rotate(ring.tilt)
    ctx.strokeStyle = ring.color
    ctx.globalAlpha = ring.alpha
    ctx.lineWidth = ring.width
    ctx.beginPath()
    ctx.ellipse(0, 0, radius, radius * ring.squash, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  // Core node with crosshair ticks.
  ctx.globalAlpha = 1
  const coreX = cx + px * 1.6
  const coreY = cy + py * 1.6
  ctx.strokeStyle = colors.accent
  ctx.globalAlpha = 0.9
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.arc(coreX, coreY, 3.5, 0, Math.PI * 2)
  ctx.stroke()
  ctx.globalAlpha = 0.45
  const tick = 12
  ctx.beginPath()
  ctx.moveTo(coreX - tick, coreY)
  ctx.lineTo(coreX - tick + 5, coreY)
  ctx.moveTo(coreX + tick - 5, coreY)
  ctx.lineTo(coreX + tick, coreY)
  ctx.moveTo(coreX, coreY - tick)
  ctx.lineTo(coreX, coreY - tick + 5)
  ctx.moveTo(coreX, coreY + tick - 5)
  ctx.lineTo(coreX, coreY + tick)
  ctx.stroke()
  ctx.globalAlpha = 1
}

function tick() {
  if (!running) return
  time += 0.008
  pointer.x += (pointer.tx - pointer.x) * 0.06
  pointer.y += (pointer.ty - pointer.y) * 0.06
  draw()
  raf = requestAnimationFrame(tick)
}

function start() {
  if (running || reducedMotion.value === 'reduce') return
  running = true
  raf = requestAnimationFrame(tick)
}

function stop() {
  running = false
  cancelAnimationFrame(raf)
}

let observer: IntersectionObserver | null = null

function onPointerMove(e: PointerEvent) {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return
  pointer.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1
  pointer.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d') ?? null
  resize()
  const ro = new ResizeObserver(resize)
  if (canvas.value) ro.observe(canvas.value)
  cleanupFns.push(() => ro.disconnect())

  if (reducedMotion.value === 'reduce') {
    draw()
    return
  }
  observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0.05,
  })
  if (canvas.value) observer.observe(canvas.value)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  cleanupFns.push(() => window.removeEventListener('pointermove', onPointerMove))
  const themeObserver = new MutationObserver(resize)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  cleanupFns.push(() => themeObserver.disconnect())
  document.addEventListener('visibilitychange', onVisibility)
  cleanupFns.push(() => document.removeEventListener('visibilitychange', onVisibility))
})

function onVisibility() {
  if (document.hidden) stop()
  else start()
}

const cleanupFns: (() => void)[] = []

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  cleanupFns.forEach((fn) => fn())
})
</script>

<template>
  <canvas
    ref="canvas"
    class="h-full w-full"
    role="img"
    aria-label="Abstract rotating wireframe visualization"
  />
</template>
