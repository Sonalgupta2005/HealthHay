import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/': 'http://localhost:5000',
  //   },
  // },
});

