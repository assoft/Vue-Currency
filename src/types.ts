/**
 * Money configuration options
 */
export interface MoneyConfig {
  /** Number of decimal places */
  precision: number
  /** Decimal separator */
  decimal: string
  /** Thousands separator */
  thousands: string
  /** Currency symbol prefix (e.g., "R$ ") */
  prefix: string
  /** Currency symbol suffix (e.g., " %") */
  suffix: string
  /** Whether to include mask in component output */
  masked: boolean
}

/**
 * Default money configuration
 */
export const defaultMoneyConfig: MoneyConfig = {
  precision: 2,
  decimal: '.',
  thousands: ',',
  prefix: '',
  suffix: '',
  masked: false
}

/**
 * Money component props
 */
export interface MoneyProps {
  /** The value to display */
  value?: number | string
  /** The model value (for v-model) */
  modelValue?: number | string
  /** Number of decimal places */
  precision?: number
  /** Decimal separator */
  decimal?: string
  /** Thousands separator */
  thousands?: string
  /** Currency symbol prefix */
  prefix?: string
  /** Currency symbol suffix */
  suffix?: string
  /** Whether to include mask in output */
  masked?: boolean
  /** Input placeholder */
  placeholder?: string
  /** Whether input is disabled */
  disabled?: boolean
  /** Whether input is readonly */
  readonly?: boolean
  /** Custom CSS class */
  class?: string | string[] | Record<string, boolean>
  /** Custom CSS style */
  style?: string | Record<string, any>
}

/**
 * Money directive binding value
 */
export type MoneyDirectiveValue = Partial<MoneyConfig>

/**
 * Money component emits
 */
export interface MoneyEmits {
  /** Emitted when the value changes */
  (event: 'update:modelValue', value: number | string): void
  /** Emitted when the input changes */
  (event: 'change', value: number | string): void
  /** Emitted when the input receives focus */
  (event: 'focus', evt: FocusEvent): void
  /** Emitted when the input loses focus */
  (event: 'blur', evt: FocusEvent): void
  /** Emitted when a key is pressed */
  (event: 'keydown', evt: KeyboardEvent): void
  /** Emitted when content is pasted */
  (event: 'paste', evt: ClipboardEvent): void
}
