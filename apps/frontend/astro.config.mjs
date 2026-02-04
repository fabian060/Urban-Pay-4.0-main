// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  outDir: '../backend/dist',
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // Redirige todas las peticiones que comiencen con /api
        // a tu servidor backend en el puerto 3000.
        '/api': 'http://localhost:3000',
      },
    },
  },

  integrations: [icon()],
  adapter: node({mode: "middleware"})
});