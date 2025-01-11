import { defineConfig } from 'vite'
import { resolve } from 'path'
import terser from '@rollup/plugin-terser'
import autoprefixer from 'autoprefixer'


export default defineConfig({
  root: './src',
  base: '/assets/',
  build: {
    outDir: '../assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js')
      },
      output: {
        entryFileNames: 'main.min.js',
        assetFileNames: 'main.min.css'
      },
      external: []
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    },
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  resolve: {
    alias: {
      'iDisqus.css': resolve(__dirname, './node_modules/disqus-php-api/dist/iDisqus.min.css')
    }
  }
})
