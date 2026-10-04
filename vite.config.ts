import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
  build: { target: 'es2022', chunkSizeWarningLimit: 750, rollupOptions: { output: { onlyExplicitManualChunks: true, manualChunks(id) {
    if (id.includes('node_modules/three/')) return 'three-engine'
    if (id.includes('node_modules/@react-three/')) return 'webgl-react'
    if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-core'
    if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion'
  } } } }
})
