import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  build: {
    target: 'ES2022' // Asegura que esbuild soporta Top-level await
  },
  define: {
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
    // Otras banderas de características que necesites
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
