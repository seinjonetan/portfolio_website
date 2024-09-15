import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true, // Ensure source maps are enabled
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit if necessary
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of manual chunking
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  base: "/",
});