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
    proxy: {
      '/api': {
        target: 'https://hukukarama.com',
        changeOrigin: true,
        secure: true,
        ws: true
      },
      '^/.*': {
        target: 'http://localhost:8522',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false
  },
  // Production build options
  build: {
    // Generate source maps for production
    sourcemap: true,
    // Minify options
    minify: 'terser' as const,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}))
