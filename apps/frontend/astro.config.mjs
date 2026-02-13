// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import icon from "astro-icon";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  outDir: "../backend/dist",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      },
    },
  },

  integrations: [icon()],
  adapter: node({mode: "middleware"})
});