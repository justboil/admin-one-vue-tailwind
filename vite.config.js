import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/admin-one-vue-tailwind/",
  base: "./",
  plugins: [vue() ],
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
