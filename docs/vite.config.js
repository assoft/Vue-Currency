import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/Vue-Currency/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('../src', import.meta.url)))
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL('./index.html', import.meta.url)))
      }
    }
  },
  server: {
    port: 5000,
    open: true
  }
})
