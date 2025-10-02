import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import VMoney from '../src/VMoney.vue'

describe('VMoney Component', () => {
  it('should render with default props', () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 123.45
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('type')).toBe('tel')
    expect(wrapper.find('input').classes()).toContain('v-money')
  })

  it('should format value correctly', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 1234.56
      }
    })

    await nextTick()
    
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('1,234.56')
  })

  it('should emit update:modelValue on input', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 0
      }
    })

    const input = wrapper.find('input')
    await input.setValue('1,234.56')
    await input.trigger('input')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1234.56])
  })

  it('should emit change event', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 0
      }
    })

    const input = wrapper.find('input')
    await input.setValue('1,234.56')
    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([1234.56])
  })

  it('should handle masked output', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 1234.56,
        masked: true
      }
    })

    const input = wrapper.find('input')
    await input.setValue('$1,234.56')
    await input.trigger('input')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['$1,234.56'])
  })

  it('should handle custom configuration', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 1234.567,
        precision: 3,
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' #'
      }
    })

    await nextTick()
    
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('R$ 1.234,567 #')
  })

  it('should handle disabled state', () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 123.45,
        disabled: true
      }
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('should handle readonly state', () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 123.45,
        readonly: true
      }
    })

    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('should handle placeholder', () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 0,
        placeholder: 'Enter amount'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter amount')
  })

  it('should expose focus method', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 123.45
      }
    })

    const focusSpy = vi.spyOn(wrapper.find('input').element, 'focus')
    
    await wrapper.vm.focus()
    expect(focusSpy).toHaveBeenCalled()
  })

  it('should expose blur method', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 123.45
      }
    })

    const blurSpy = vi.spyOn(wrapper.find('input').element, 'blur')
    
    await wrapper.vm.blur()
    expect(blurSpy).toHaveBeenCalled()
  })

  it('should expose select method', async () => {
    const wrapper = mount(VMoney, {
      props: {
        value: 123.45
      }
    })

    const selectSpy = vi.spyOn(wrapper.find('input').element, 'select')
    
    await wrapper.vm.select()
    expect(selectSpy).toHaveBeenCalled()
  })
})
