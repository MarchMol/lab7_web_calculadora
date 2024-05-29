import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@button': '/src/components/button',
      '@display': '/src/components/display',
      '@calculator': '/src/components/calculator',
      '@hooks': '/src/hooks'
    }
  }
})
