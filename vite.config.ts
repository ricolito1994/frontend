import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsConfigPaths()],
    server: {    
        open: true, // opens browser on start
        port: 3000, 
    },
});