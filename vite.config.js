import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan baris base ini:
  base: '/Portofolio-M-Iqbal-Zafarullah/',
})