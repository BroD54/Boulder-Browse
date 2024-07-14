import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'elkjs/lib/elk.bundled.js',
        '@fortawesome/react-fontawesome',
        '@fortawesome/free-solid-svg-icons',
      ],
    },
  },
})
