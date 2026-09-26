import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// En GitHub Pages el sitio vive en /cellphone/, no en la raíz del dominio.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/cellphone/" : "/",
  plugins: [react(), tailwindcss()],
}))
