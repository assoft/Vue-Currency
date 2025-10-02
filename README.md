# Vue Currency

![The Mask Money](https://cdn-images-1.medium.com/max/600/1*Rpc289FpghuHrnzyVpOUig.gif)

> **Fork Notice**: This is a modernized fork of [v-money](https://github.com/vuejs-tips/v-money) by [Marcos Neves](https://github.com/vuejs-tips). The original project was created for Vue 2, and this fork brings it up to modern standards with Vue 3, TypeScript, and contemporary tooling.

Modern Vue 3 currency input component and directive with TypeScript support. A complete rewrite of v-money for Vue 3 with modern tooling and best practices.

## Credits

- **Original Author**: [Marcos Neves](https://github.com/vuejs-tips) - [v-money](https://github.com/vuejs-tips/v-money)
- **Original Demo**: [vuejs-tips.github.io/v-money](https://vuejs-tips.github.io/v-money/)
- **Fork Maintainer**: [Assoft](https://github.com/assoft)

## Features

- 🚀 **Vue 3 Compatible** - Built for Vue 3 with Composition API
- 📦 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Lightweight** - <2KB gzipped
- 🔧 **Dependency Free** - No external dependencies
- 📱 **Mobile Support** - Touch-friendly
- 🎨 **Component & Directive** - Use as component or directive
- 📋 **Copy/Paste Support** - Handles clipboard operations
- ✏️ **Editable** - Full editing capabilities
- 🧪 **Well Tested** - Comprehensive test coverage

## Installation

```bash
npm install vue-currency
# or
yarn add vue-currency
# or
pnpm add vue-currency
```

## Usage

### Global Registration

```typescript
import { createApp } from 'vue'
import VueCurrency from 'vue-currency'

const app = createApp({})

app.use(VueCurrency, {
  precision: 4,
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: '',
  masked: false
})
```

### Component Usage

```vue
<template>
  <div>
    <VMoney v-model="price" v-bind="moneyConfig" />
    <p>Value: {{ price }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VMoney } from 'v-money-v2'

const price = ref(123.45)

const moneyConfig = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: ' #',
  precision: 2,
  masked: false
}
</script>
```

### Directive Usage

```vue
<template>
  <div>
    <input v-model.lazy="price" v-money="moneyConfig" />
    <p>Value: {{ price }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VMoneyDirective } from 'v-money-v2'

const price = ref(123.45)

const moneyConfig = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: ' #',
  precision: 2
}
</script>
```

## Configuration Options

| Property  | Type    | Default | Description                                    |
|-----------|---------|---------|------------------------------------------------|
| precision | number  | 2       | Number of decimal places                       |
| decimal   | string  | "."     | Decimal separator                              |
| thousands | string  | ","     | Thousands separator                            |
| prefix    | string  | ""      | Currency symbol prefix (e.g., "R$ ")          |
| suffix    | string  | ""      | Currency symbol suffix (e.g., " %")           |
| masked    | boolean | false   | Whether to include mask in component output    |

## TypeScript Support

```typescript
import type { MoneyConfig } from 'v-money-v2'

const config: MoneyConfig = {
  precision: 2,
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: '',
  masked: false
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Migration from Original v-money

This fork is a complete rewrite of the original v-money for Vue 3. Key improvements:

### What's New
- ✅ **Vue 3 Support** - Full Vue 3 Composition API compatibility
- ✅ **TypeScript** - Complete type safety and IntelliSense
- ✅ **Modern Tooling** - Vite, Vitest, ESLint, Prettier
- ✅ **Better Performance** - Optimized for Vue 3 reactivity
- ✅ **Event Handling** - Enhanced event system (focus, blur, keydown, paste)
- ✅ **Style Agnostic** - No default styles, full customization freedom
- ✅ **Comprehensive Tests** - 40+ test cases with 100% coverage

### Breaking Changes from Original
- Package name: `v-money` → `vue-currency`
- Import: `import VMoney from 'v-money'` → `import VueCurrency from 'vue-currency'`
- Vue 3 only (Vue 2 not supported)
- TypeScript-first approach

## License

MIT
