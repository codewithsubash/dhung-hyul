import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.xlsx"],
  server: {
    port: 3000, // Change this to your desired port
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend server URL
        changeOrigin: true, // Change the origin of the request
      },
      // "/socket.io": {
      //   target: "http://localhost:5090", // your backend server port
      //   changeOrigin: true,
      //   ws: true,
      // },
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@store": path.resolve(__dirname, "src/store"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@data": path.resolve(__dirname, "src/data"),
      "@socket": path.resolve(__dirname, "src/socket"),
    },
  },
});
