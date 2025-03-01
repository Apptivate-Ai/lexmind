import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8522,
    strictPort: true,
    hmr: false,
    watch: {
      ignored: ['**/*'],
      usePolling: false
    },
    proxy: {
      '/api': {
        target: 'https://hukukarama.com',
        changeOrigin: true,
        secure: true,
        ws: false
      }
    },
    fs: {
      strict: true,
      allow: ['src']
    },
    origin: 'http://localhost:8522'
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false
  },
  build: {
    sourcemap: true,
    minify: 'terser' as const,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}))
