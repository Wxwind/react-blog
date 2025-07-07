import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import { visualizer } from "rollup-plugin-visualizer";
import { viteExternalsPlugin } from "vite-plugin-externals";
import cdn from "vite-plugin-cdn-import";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: "./build",
  },
  plugins: [
    tailwindcss(),
    react(),
    viteExternalsPlugin(
      {
        "@tensorflow/tfjs ": "Tensor",
      },
      { disableInServe: true }
    ),
    cdn({
      prodUrl: "https://cdn.jsdelivr.net/npm/{name}@{version}/{path}",
      modules: [
        {
          name: "@tensorflow/tfjs",
          path: "min/vs/loader.js",
          var: "Tensor",
        },
      ],
    }),
    commonjs(),
    visualizer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
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
