import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173, // Fixed port to avoid conflicts
      strictPort: true, // Don't try other ports
    },
    // Only expose necessary variables
    base: '/', // Important for production
  build: {
    outDir: 'dist', // Build to backend public folder
    emptyOutDir: true,
  }} 
});