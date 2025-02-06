import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { Features } from "lightningcss";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  build: {
    cssMinify: "lightningcss",
    outDir: "build",
  },
  css: {
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      include: Features.MediaQueries,
    },
    transformer: "lightningcss",
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: fileURLToPath(new URL("src", import.meta.url)),
      },
    ],
  },
});
