import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Hashed JS/CSS go to /static so they can be cached forever without touching /assets (logo, social image).
    assetsDir: 'static'
  }
});
