import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve'
  const isDemo = mode === 'demo'
  
  if (isDev || isDemo) {
    // Development mode or demo build
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
          'vue': 'vue/dist/vue.esm-bundler.js'
        }
      },
      server: {
        port: 3000,
        open: true
      },
      build: isDemo ? {
        outDir: 'dist-demo',
        base: '/Vue-Currency/',
        rollupOptions: {
          input: resolve(__dirname, 'index.html')
        }
      } : undefined
    }
  }
  
  // Production mode - build library
  return {
    plugins: [
      vue(),
      dts({
        insertTypesEntry: true,
        include: ['src/**/*'],
        exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
      })
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'VueCurrency',
        fileName: (format) => `vue-currency.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      },
      sourcemap: true,
      minify: 'terser'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  }
})
