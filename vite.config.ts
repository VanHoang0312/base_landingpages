import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    allowedHosts: ["terp-dev.thinklabs.com.vn" ],
    proxy: {
      "/api": {
        target: "https://terp-daihathanh.thinklabs.com.vn",
        changeOrigin: true,
      },
      "/upload": {
        target: "https://terp-daihathanh.thinklabs.com.vn",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
