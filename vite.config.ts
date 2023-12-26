import { VitePWA } from "vite-plugin-pwa";
// vite.config.js
import { defineConfig } from "vite";

const version = process.env.APP_VERSION || "1.0.0";

export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: "My React Vite App",
        short_name: "Vite App",
        description: "My awesome React Vite app.",
      },
      workbox: {},
    }),
  ],
  define: {
    "process.env": {
      APP_VERSION: JSON.stringify(version),
    },
  },
});
