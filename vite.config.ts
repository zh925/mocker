import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Pages from 'vite-plugin-pages'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Pages({
    dirs: 'src/pages',
    exclude: ['**/components/*'],
    extensions: ['tsx', 'jsx', 'ts', 'js'],
    routeStyle: 'next',
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
