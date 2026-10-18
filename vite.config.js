import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // React and the icon set are split out so a content change doesn't
    // invalidate them for returning visitors.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'icons-vendor', test: /node_modules[\\/]lucide-react[\\/]/ },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
