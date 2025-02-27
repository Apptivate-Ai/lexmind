import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8522,
    strictPort: true,
    hmr: {
      clientPort: 443,
      port: 8522,
      protocol: 'wss',
      host: 'hukukarama.com'
    },
    proxy: {
      '/api': {
        target: 'https://hukukarama.com',
        changeOrigin: true,
        secure: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8522,
    strictPort: true
  },
  // Production build options
  build: {
    // Generate source maps for production
    sourcemap: true,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
