import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Stub GSAP-driven rAF loops in unit tests.
globalThis.matchMedia =
  globalThis.matchMedia ??
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList)

Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true })

// jsdom lacks these browser APIs; the components guard against null contexts.
HTMLCanvasElement.prototype.getContext = (() =>
  null) as unknown as typeof HTMLCanvasElement.prototype.getContext

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = globalThis.ResizeObserver ?? (ResizeObserverStub as never)

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver ?? (IntersectionObserverStub as never)

config.global.renderStubDefaultSlot = true
