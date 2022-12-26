import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

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
        target: "http://localhost:5187",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/capability/, ""),
      },
      "/api/delivery": {
        target: "http://localhost:5299",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/delivery/, ""),
      },
    },
  },
});
