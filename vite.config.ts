import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8522,
    strictPort: true,
    hmr: {
      protocol: 'http',
      host: 'localhost',
      port: 8522,
      clientPort: 8522,
      timeout: 0,
      overlay: false
    },
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
