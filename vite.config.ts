import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Disable HMR in production
    hmr: process.env.NODE_ENV === 'production' ? false : {
      host: 'localhost'
    },
    // Host configuration
    host: true,
    // Proxy configuration if needed
    proxy: {
      '/api': {
        target: 'https://hukukarama.com',
        changeOrigin: true,
        secure: true
      }
    }
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
