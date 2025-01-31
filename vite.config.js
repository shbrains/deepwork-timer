import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/deepwork-timer/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}) 