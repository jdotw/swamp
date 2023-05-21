/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    proxy: {
      "/api/people": {
        target: "http://localhost:5187",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/people/, ""),
      },
      "/api/capability": {
        target: "http://localhost:5043",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/capability/, ""),
      },
      "/api/delivery": {
        target: "http://localhost:5299",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/delivery/, ""),
      },
      "/api/org": {
        target: "http://localhost:5228",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/org/, ""),
      },
      "/api/trpc": {
        target: "http://localhost:5228",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    clearMocks: true,
  },
});
