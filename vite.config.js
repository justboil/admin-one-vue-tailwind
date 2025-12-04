import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// export default defineConfig({
//   base: "/sinaq/",
//   plugins: [vue()],
//   build: {
//     target: 'ES2022' // Asegura que esbuild soporta Top-level await
//   },
//   define: {
//     '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
//     // Otras banderas de características que necesites
//   },
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
// });
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno (Doppler las inyectará automáticamente)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: env.VITE_BASE_URL || "/sinaq/",
    plugins: [vue()],
    build: {
      target: 'ES2022'
    },
    define: {
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      // Configuración específica para desarrollo
      port: parseInt(env.VITE_DEV_PORT) || 3000,
    }
  };
});