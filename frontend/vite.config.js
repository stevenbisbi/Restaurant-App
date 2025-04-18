import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
  ],

  define: {
    "process.env": {}, // evita errores relacionados con process.env
  },
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.jpeg"],
});
