import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.ts', '.tsx', '.vue', '.mjs', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    strictPort: true, // fail if 8080 is taken (no auto-switch)
    host: false
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: false
  }
})
