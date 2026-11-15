import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const src = (dir) => fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

export default defineConfig({
  plugins: [react()],

  // Absolute imports that CRA resolved via jsconfig "baseUrl": "src"
  resolve: {
    alias: {
      Components: src("Components"),
      Pages: src("Pages"),
      api: src("api"),
      assets: src("assets"),
      context: src("context"),
      hooks: src("hooks"),
      utils: src("utils"),
    },
  },

  // Keep REACT_APP_* working so the existing Netlify env vars need no change
  envPrefix: ["VITE_", "REACT_APP_"],

  server: {
    port: 3000,
    open: true,
  },

  build: {
    // Same output folder as CRA so the deploy settings stay the same
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // lottie-web (404 page only) uses eval internally - third-party, nothing to fix here
        if (warning.code === "EVAL" && warning.id?.includes("lottie-web")) return;
        warn(warning);
      },
      output: {
        manualChunks(id) {
          // Rarely changes -> stays cached in the browser across deploys
          if (
            /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[\\/]/.test(id)
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
