import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VMoneyDirective } from '../src/directive'

// Mock DOM methods
const mockSetSelectionRange = vi.fn()
const mockDispatchEvent = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

// Mock input element
const createMockInput = () => ({
  tagName: 'INPUT',
  value: '',
  selectionEnd: 0,
  getElementsByTagName: vi.fn(() => []),
  setSelectionRange: mockSetSelectionRange,
  dispatchEvent: mockDispatchEvent,
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
  focus: vi.fn(),
  blur: vi.fn()
})

describe('VMoneyDirective', () => {
  let mockElement: any

  beforeEach(() => {
    mockElement = createMockInput()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should not throw error on empty config', () => {
    expect(() => {
      VMoneyDirective.mounted?.(mockElement, { value: {} } as any)
    }).not.toThrow()
  })

  it('should format input on mount', () => {
    mockElement.value = '1234.56'
    
    VMoneyDirective.mounted?.(mockElement, { 
      value: { precision: 2, decimal: '.', thousands: ',' } 
    } as any)

    expect(mockElement.value).toBe('1,234.56')
    expect(mockDispatchEvent).toHaveBeenCalled()
  })

  it('should handle input events', () => {
    mockElement.value = '123456'
    mockElement.selectionEnd = 6
    
    VMoneyDirective.mounted?.(mockElement, { 
      value: { precision: 2, decimal: '.', thousands: ',' } 
    } as any)

    // Check that event listeners were added
    expect(mockAddEventListener).toHaveBeenCalledWith('input', expect.any(Function))
    expect(mockAddEventListener).toHaveBeenCalledWith('focus', expect.any(Function))
  })

  it('should handle focus events', () => {
    mockElement.value = '$1,234.56'
    
    VMoneyDirective.mounted?.(mockElement, { 
      value: { precision: 2, decimal: '.', thousands: ',', prefix: '$ ', suffix: '' } 
    } as any)

    // Check that focus event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith('focus', expect.any(Function))
  })

  it('should find input element in container', () => {
    const container = {
      tagName: 'DIV',
      getElementsByTagName: vi.fn(() => [mockElement])
    }
    
    VMoneyDirective.mounted?.(container, { 
      value: { precision: 2 } 
    } as any)

    expect(container.getElementsByTagName).toHaveBeenCalledWith('input')
  })

  it('should handle multiple inputs in container', () => {
    const container = {
      tagName: 'DIV',
      getElementsByTagName: vi.fn(() => [mockElement, mockElement])
    }
    
    // Should not throw, but use first input
    expect(() => {
      VMoneyDirective.mounted?.(container, { 
        value: { precision: 2 } 
      } as any)
    }).not.toThrow()
  })

  it('should handle no inputs in container', () => {
    const container = {
      tagName: 'DIV',
      getElementsByTagName: vi.fn(() => [])
    }
    
    // Should not throw, but do nothing
    expect(() => {
      VMoneyDirective.mounted?.(container, { 
        value: { precision: 2 } 
      } as any)
    }).not.toThrow()
  })

  it('should update config on update', () => {
    VMoneyDirective.mounted?.(mockElement, { 
      value: { precision: 2 } 
    } as any)

    VMoneyDirective.updated?.(mockElement, { 
      value: { precision: 3 } 
    } as any)

    expect(mockElement.__moneyConfig).toBeDefined()
  })

  it('should cleanup on unmount', () => {
    VMoneyDirective.mounted?.(mockElement, { 
      value: { precision: 2 } 
    } as any)

    VMoneyDirective.unmounted?.(mockElement)

    expect(mockRemoveEventListener).toHaveBeenCalled()
    expect(mockElement.__moneyHandlers).toBeUndefined()
    expect(mockElement.__moneyConfig).toBeUndefined()
  })

  it('should handle custom separators', () => {
    mockElement.value = '1234,56'
    
    VMoneyDirective.mounted?.(mockElement, { 
      value: { 
        precision: 2, 
        decimal: ',', 
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' #'
      } 
    } as any)

    expect(mockElement.value).toBe('R$ 1.234,56 #')
  })

  it('should handle negative numbers', () => {
    mockElement.value = '-1234.56'
    
    VMoneyDirective.mounted?.(mockElement, { 
      value: { precision: 2, decimal: '.', thousands: ',' } 
    } as any)

    expect(mockElement.value).toBe('-1,234.56')
  })
})
