import type { Directive, DirectiveBinding } from 'vue'
import { format, setCursor, createEvent, mergeConfig } from './utils'
import { defaultMoneyConfig } from './types'
import type { MoneyDirectiveValue } from './types'

/**
 * Vue 3 directive for money input formatting
 */
export const VMoneyDirective: Directive<HTMLInputElement, MoneyDirectiveValue> = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding<MoneyDirectiveValue>) {
    if (!binding.value) return

    const config = mergeConfig(defaultMoneyConfig, binding.value)
    
    // Find input element if directive is used on a container
    let inputElement = el
    if (el.tagName.toUpperCase() !== 'INPUT') {
      const inputs = el.getElementsByTagName('input')
      if (inputs.length === 1) {
        inputElement = inputs[0]
      } else if (inputs.length > 1) {
        console.warn('v-money directive found multiple input elements, using the first one')
        inputElement = inputs[0]
      } else {
        console.error('v-money directive requires an input element')
        return
      }
    }

    // Store the original config for updates
    ;(inputElement as any).__moneyConfig = config

    // Input handler
    const handleInput = (): void => {
      const positionFromEnd = inputElement.value.length - (inputElement.selectionEnd || 0)
      inputElement.value = format(inputElement.value, config)
      
      // Adjust cursor position
      const newPositionFromEnd = Math.max(positionFromEnd, config.suffix.length)
      const newPosition = inputElement.value.length - newPositionFromEnd
      const finalPosition = Math.max(newPosition, config.prefix.length + 1)
      
      setCursor(inputElement, finalPosition)
      inputElement.dispatchEvent(createEvent('change')) // For v-model.lazy
    }

    // Focus handler
    const handleFocus = (): void => {
      setCursor(inputElement, inputElement.value.length - config.suffix.length)
    }

    // Store handlers for cleanup
    ;(inputElement as any).__moneyHandlers = {
      input: handleInput,
      focus: handleFocus
    }

    // Attach event listeners
    inputElement.addEventListener('input', handleInput)
    inputElement.addEventListener('focus', handleFocus)

    // Initial format
    handleInput()
    inputElement.dispatchEvent(createEvent('input'))
  },

  updated(el: HTMLInputElement, binding: DirectiveBinding<MoneyDirectiveValue>) {
    if (!binding.value) return

    const inputElement = el.tagName.toUpperCase() === 'INPUT' 
      ? el 
      : el.getElementsByTagName('input')[0]

    if (!inputElement) return

    const config = mergeConfig(defaultMoneyConfig, binding.value)
    ;(inputElement as any).__moneyConfig = config
  },

  unmounted(el: HTMLInputElement) {
    const inputElement = el.tagName.toUpperCase() === 'INPUT' 
      ? el 
      : el.getElementsByTagName('input')[0]

    if (!inputElement) return

    const handlers = (inputElement as any).__moneyHandlers
    if (handlers) {
      inputElement.removeEventListener('input', handlers.input)
      inputElement.removeEventListener('focus', handlers.focus)
      delete (inputElement as any).__moneyHandlers
      delete (inputElement as any).__moneyConfig
    }
  }
}

export default VMoneyDirective
