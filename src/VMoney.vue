<template>
  <input
    ref="inputRef"
    type="tel"
    :value="formattedValue"
    :class="props.class"
    :style="props.style"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown="handleKeydown"
    @paste="handlePaste"
    v-money="directiveConfig"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { format, unformat } from './utils'
import { defaultMoneyConfig } from './types'
import type { MoneyProps, MoneyEmits, MoneyConfig } from './types'

// Props with defaults
const props = withDefaults(defineProps<MoneyProps>(), {
  value: 0,
  modelValue: 0,
  precision: () => defaultMoneyConfig.precision,
  decimal: () => defaultMoneyConfig.decimal,
  thousands: () => defaultMoneyConfig.thousands,
  prefix: () => defaultMoneyConfig.prefix,
  suffix: () => defaultMoneyConfig.suffix,
  masked: () => defaultMoneyConfig.masked,
  placeholder: '',
  disabled: false,
  readonly: false
})

// Emits
const emit = defineEmits<MoneyEmits>()

// Refs
const inputRef = ref<HTMLInputElement>()

// Computed
const directiveConfig = computed((): Partial<MoneyConfig> => ({
  precision: props.precision,
  decimal: props.decimal,
  thousands: props.thousands,
  prefix: props.prefix,
  suffix: props.suffix
}))

const formattedValue = ref<string>('')

// Computed value (prioritize modelValue over value)
const currentValue = computed(() => props.modelValue ?? props.value ?? 0)

// Methods
const updateFormattedValue = (): void => {
  const config: MoneyConfig = {
    precision: props.precision,
    decimal: props.decimal,
    thousands: props.thousands,
    prefix: props.prefix,
    suffix: props.suffix,
    masked: props.masked
  }
  
  const formatted = format(currentValue.value, config)
  if (formatted !== formattedValue.value) {
    formattedValue.value = formatted
  }
}

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = props.masked ? target.value : unformat(target.value, props.precision)
  emit('update:modelValue', value)
}

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = props.masked ? target.value : unformat(target.value, props.precision)
  emit('change', value)
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent): void => {
  emit('keydown', event)
}

const handlePaste = (event: ClipboardEvent): void => {
  emit('paste', event)
}

// Watchers
watch(
  currentValue,
  () => {
    nextTick(() => {
      updateFormattedValue()
    })
  },
  { immediate: true }
)

// Expose methods for parent components
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

