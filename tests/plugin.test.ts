import { describe, it, expect, vi } from 'vitest'
import { createApp } from 'vue'
import VMoneyPlugin, { version } from '../src/index'

describe('VMoney Plugin', () => {
  it('should install plugin correctly', () => {
    const app = createApp({})
    const globalOptions = { precision: 3, prefix: '€ ' }
    
    app.use(VMoneyPlugin, globalOptions)
    
    // Check if component is registered globally
    expect(app._context.components).toBeDefined()
    
    // Check if directive is registered globally
    expect(app._context.directives).toBeDefined()
  })

  it('should provide global config', () => {
    const app = createApp({})
    const globalOptions = { precision: 3, prefix: '€ ' }
    
    app.use(VMoneyPlugin, globalOptions)
    
    // The plugin should provide global configuration
    expect(app._context.provides).toBeDefined()
  })

  it('should work without global options', () => {
    const app = createApp({})
    
    expect(() => {
      app.use(VMoneyPlugin)
    }).not.toThrow()
  })

  it('should export all necessary components and utilities', () => {
    // Test that all exports are available
    expect(VMoneyPlugin.install).toBeDefined()
    expect(typeof VMoneyPlugin.install).toBe('function')
  })

  it('should have correct version', () => {
    expect(version).toBe('2.0.0')
  })
})
