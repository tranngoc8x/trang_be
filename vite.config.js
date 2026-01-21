import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Tối ưu cho shared hosting
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          strapi: ['@strapi/strapi']
        }
      }
    },
    // Giảm memory usage
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
