import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import fs from "fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      assets: path.resolve("src/assets/"),
      components: path.resolve("src/components/"),
      contexts: path.resolve("src/contexts/"),
      layouts: path.resolve("src/layouts/"),
      routes: path.resolve("src/routes/"),
      services: path.resolve("src/services/"),
      utils: path.resolve("src/utils/"),
      variables: path.resolve("src/variables/"),
      views: path.resolve("src/views/"),
      // "~": path.resolve("src"),
    },
  },

  plugins: [react()],
});
