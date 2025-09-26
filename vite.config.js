import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base: './',
  base: 'https://github.com/minuwu/ViteNotice/',
  build: {
    outDir: 'docs'
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      ignored: ['**/notes.json','**/server.cjs'],
    }
  }
})