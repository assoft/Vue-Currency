import type { MoneyConfig } from './types'

/**
 * Convert a value to string, handling null/undefined
 */
function toString(value: unknown): string {
  return value ? String(value) : ''
}

/**
 * Clamp a number between min and max values
 */
function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}

/**
 * Extract only numbers from a string
 */
export function onlyNumbers(input: string | number): string {
  return toString(input).replace(/\D+/g, '') || '0'
}

/**
 * Convert numbers to currency format
 */
function numbersToCurrency(numbers: string, precision: number): string {
  const exp = Math.pow(10, precision)
  const float = parseFloat(numbers) / exp
  return float.toFixed(clamp(0, precision, 20))
}

/**
 * Add thousand separators to integer part
 */
function addThousandSeparator(integer: string, separator: string): string {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

/**
 * Join integer and decimal parts with separator
 */
function joinIntegerAndDecimal(integer: string, decimal: string, separator: string): string {
  return decimal ? `${integer}${separator}${decimal}` : integer
}

/**
 * Format a value according to money configuration
 */
export function format(input: string | number, config: MoneyConfig): string {
  if (typeof input === 'number') {
    input = input.toFixed(clamp(0, config.precision, 20))
  }

  const negative = input.indexOf('-') >= 0 ? '-' : ''
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, config.precision)
  const parts = toString(currency).split('.')
  const integer = parts[0] ?? ''
  const decimal = parts[1] ?? ''
  
  const formattedInteger = addThousandSeparator(integer, config.thousands)
  
  return `${config.prefix}${negative}${joinIntegerAndDecimal(formattedInteger, decimal, config.decimal)}${config.suffix}`
}

/**
 * Unformat a masked value to number
 */
export function unformat(input: string, precision: number): number {
  const negative = input.indexOf('-') >= 0 ? -1 : 1
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency) * negative
}

/**
 * Set cursor position in input element
 */
export function setCursor(element: HTMLInputElement, position: number): void {
  const setSelectionRange = (): void => {
    element.setSelectionRange(position, position)
  }
  
  if (element === document.activeElement) {
    setSelectionRange()
    // Android fix
    setTimeout(setSelectionRange, 1)
  }
}

/**
 * Create a custom event
 */
export function createEvent(name: string): Event {
  const event = document.createEvent('Event')
  event.initEvent(name, true, true)
  return event
}

/**
 * Merge default configuration with user configuration
 */
export function mergeConfig(defaults: MoneyConfig, userConfig: Partial<MoneyConfig>): MoneyConfig {
  return {
    ...defaults,
    ...userConfig
  }
}
