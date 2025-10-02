import type { App, Plugin } from 'vue'
import VMoney from './VMoney.vue'
import { VMoneyDirective } from './directive'
import { defaultMoneyConfig } from './types'
import type { MoneyConfig } from './types'

// Export types
export type { MoneyConfig, MoneyProps, MoneyEmits, MoneyDirectiveValue } from './types'

// Export components
export { VMoney }

// Export directive
export { VMoneyDirective }

// Export utilities
export { format, unformat, onlyNumbers, setCursor, createEvent, mergeConfig } from './utils'

// Export default config
export { defaultMoneyConfig }

// Plugin installation function
export function install(app: App, globalOptions?: Partial<MoneyConfig>): void {
  // Merge global options with defaults
  const config = globalOptions 
    ? { ...defaultMoneyConfig, ...globalOptions }
    : defaultMoneyConfig

  // Register global component
  app.component('VMoney', VMoney)

  // Register global directive
  app.directive('money', VMoneyDirective)

  // Provide global config
  app.provide('v-money-config', config)
}

// Plugin object
const VMoneyPlugin: Plugin = {
  install
}

// Default export
export default VMoneyPlugin

// Version
export const version = '2.0.0'

// Auto-install when used via script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VMoneyPlugin)
}

// Global type declarations
declare global {
  interface Window {
    Vue: any
  }
}
