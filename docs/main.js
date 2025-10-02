import { createApp } from 'vue'
import VMoneyPlugin from '../src/index'
import VMoney from '../src/VMoney.vue'

const app = createApp({
  data() {
    return {
      // Basic usage
      basicAmount: 1234.56,
      basicConfig: {
        precision: 2,
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: ''
      },

      // Component usage
      componentAmount: 987.65,
      componentConfig: {
        precision: 2,
        decimal: '.',
        thousands: ',',
        prefix: 'USD ',
        suffix: '',
        masked: false
      },

      // Brazilian Real
      brlAmount: 1500.75,
      brlConfig: {
        precision: 2,
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ''
      },

      // Euro
      eurAmount: 2500.00,
      eurConfig: {
        precision: 2,
        decimal: '.',
        thousands: ',',
        prefix: '€ ',
        suffix: ''
      },

      // Cryptocurrency
      cryptoAmount: 0.1234,
      cryptoConfig: {
        precision: 4,
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: ' BTC'
      },

      // Percentage
      percentAmount: 15.75,
      percentConfig: {
        precision: 2,
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: ' %'
      }
    }
  }
})

// Install the plugin
app.use(VMoneyPlugin)

// Register component globally
app.component('VMoney', VMoney)

app.mount('#app')
