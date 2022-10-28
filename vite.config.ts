import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@icons",
        replacement: path.resolve(__dirname, "./src/components/icons"),
      },
      {
        find: "@config",
        replacement: path.resolve(__dirname, "./src/config"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@types",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "./src/constants"),
      },
    ],
  },
});
