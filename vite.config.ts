import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from 'dotenv';

dotenv.config(); // Load env vars from .env

export default defineConfig(() => {
  // Load env file based on `mode` in the current working directory.

  return {
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
    define: {
      PYTHON_API: `"${process.env.PYTHON_API}"`, // Use process.env.VALUE
      MONGODB_URI: `"${process.env.MONGODB_URI}"`, // Use process.env.VALUE
      PORT: `"${process.env.PORT}"`, // Use process.env.VALUE
      NODE_API: `"${process.env.NODE_API}"`, // Use process.env.VALUE
    },
  };
});