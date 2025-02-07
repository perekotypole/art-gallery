import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { Features } from "lightningcss";
import { fileURLToPath } from "node:url";

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_APP_PORT
  } = loadEnv(mode, process.cwd());

  return defineConfig({
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
    server: {
      port: Number(VITE_APP_PORT),
    },
    preview: {
      port: Number(VITE_APP_PORT),
    },
  });
};

export default config;
