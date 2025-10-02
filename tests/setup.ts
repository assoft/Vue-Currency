import { vi } from 'vitest'

// Mock DOM methods that might not be available in jsdom
Object.defineProperty(document, 'createEvent', {
  value: vi.fn(() => ({
    initEvent: vi.fn()
  }))
})

// Mock window.Vue for auto-install test
Object.defineProperty(window, 'Vue', {
  value: {
    use: vi.fn()
  },
  writable: true
})
