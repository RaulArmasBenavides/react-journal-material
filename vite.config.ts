import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          sweetalert: ['sweetalert2'],
          mui: ['@mui/material', '@mui/icons-material'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
});
