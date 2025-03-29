import path from "path";
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  const d = Date.now();

  return {
    root: 'src',
    build: {
      chunkSizeWarningLimit: 5000,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-${d}.js`,
          chunkFileNames: `assets/[name]-${d}.js`,
          assetFileNames: (assetInfo) => {
            // Check if the asset is a CSS file
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return `assets/[name]-${d}.css`;
            }
            // Default behavior for other assets
            return `assets/[name].[ext]`;
          },
          manualChunks: () => `index-${d}.js`,
        },
      },
    },
    plugins: [react(), tailwindcss()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    define: {
      'process.env': env, // Make env variables available in your app
    },
  };
});