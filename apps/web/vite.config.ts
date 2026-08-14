import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envDir: '../../',
  // GitHub Pages hosts this project below /travel-buddy-reach/.
  // Local development remains available from the root path.
  base: process.env.GITHUB_ACTIONS ? '/travel-buddy-reach/' : '/'
});
