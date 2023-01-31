import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./build",
  },
  plugins: [react(), removeConsole()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    proxy: {
      "/api": {
        target: "http://121.41.118.167:6211",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/fileServer": {
        target: "http://121.41.118.167:7123/static",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fileServer/, ""),
      },
    },
  },
  preview: {
    port: 4174,
    proxy: {
      "/api": {
        target: "http://121.41.118.167:6211",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/fileServer": {
        target: "http://121.41.118.167:7123/static",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fileServer/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "./src/common/styles/global.scss";`,
      },
    },
  },
});
