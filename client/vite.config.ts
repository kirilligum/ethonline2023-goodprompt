import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // process: "process",
      // stream: "stream-browserify",
      // zlib: "browserify-zlib",
      // util: 'util'
    }
  }
})
