import { describe, it, expect } from 'vitest'
import { format, unformat, onlyNumbers, mergeConfig } from '../src/utils'
import { defaultMoneyConfig } from '../src/types'

describe('Utils', () => {
  describe('onlyNumbers', () => {
    it('should extract only numbers from string', () => {
      expect(onlyNumbers('abc123def456')).toBe('123456')
      expect(onlyNumbers('123.45')).toBe('12345')
      expect(onlyNumbers('$1,234.56')).toBe('123456')
      expect(onlyNumbers('')).toBe('0')
      expect(onlyNumbers('abc')).toBe('0')
    })

    it('should handle number input', () => {
      expect(onlyNumbers(123.45)).toBe('12345')
      expect(onlyNumbers(0)).toBe('0')
    })
  })

  describe('format', () => {
    it('should format number with default config', () => {
      expect(format(1234.56, defaultMoneyConfig)).toBe('1,234.56')
      expect(format('1234.56', defaultMoneyConfig)).toBe('1,234.56')
      expect(format(0, defaultMoneyConfig)).toBe('0.00')
    })

    it('should format with custom config', () => {
      const config = {
        ...defaultMoneyConfig,
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' #',
        precision: 3
      }
      
      expect(format(1234.567, config)).toBe('R$ 1.234,567 #')
    })

    it('should handle negative numbers', () => {
      expect(format(-1234.56, defaultMoneyConfig)).toBe('-1,234.56')
    })

    it('should handle precision limits', () => {
      const config = { ...defaultMoneyConfig, precision: 25 }
      // When precision is 25, it gets clamped to 20, but the number gets divided by 10^25
      // So 123.456789 becomes 0.00123456788999999991
      expect(format(123.456789, config)).toBe('0.00123456788999999991')
    })
  })

  describe('unformat', () => {
    it('should unformat with default precision', () => {
      expect(unformat('1,234.56', 2)).toBe(1234.56)
      expect(unformat('$1,234.56', 2)).toBe(1234.56)
      expect(unformat('0.00', 2)).toBe(0)
    })

    it('should handle negative numbers', () => {
      expect(unformat('-1,234.56', 2)).toBe(-1234.56)
    })

    it('should handle different precisions', () => {
      expect(unformat('1,234.567', 3)).toBe(1234.567)
      expect(unformat('1,234.5', 1)).toBe(1234.5)
    })
  })

  describe('mergeConfig', () => {
    it('should merge configs correctly', () => {
      const userConfig = {
        precision: 3,
        prefix: '€ '
      }
      
      const result = mergeConfig(defaultMoneyConfig, userConfig)
      
      expect(result).toEqual({
        ...defaultMoneyConfig,
        precision: 3,
        prefix: '€ '
      })
    })

    it('should handle empty user config', () => {
      const result = mergeConfig(defaultMoneyConfig, {})
      expect(result).toEqual(defaultMoneyConfig)
    })

    it('should handle undefined user config', () => {
      const result = mergeConfig(defaultMoneyConfig, undefined)
      expect(result).toEqual(defaultMoneyConfig)
    })
  })
})
