import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Changed from /MiSite/ since using custom domain
  plugins: [react()],
});
