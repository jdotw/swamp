import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dns from "dns";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    proxy: {
      // string shorthand
      "/api/people": {
        target: "http://localhost:5187",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/people/, ""),
      },
    },
  },
});
