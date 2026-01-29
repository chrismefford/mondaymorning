import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// Static routes for sitemap generation
const staticRoutes = [
  "/",
  "/shop",
  "/about",
  "/recipes",
  "/locations",
  "/blog",
  "/privacy",
  "/terms",
  "/shipping",
  "/returns",
  "/services",
  "/auth",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // Generate sitemap.xml for all routes
    Sitemap({
      hostname: "https://mondaymorning.lovable.app",
      dynamicRoutes: staticRoutes,
      exclude: ["/admin", "/blog-import", "/wholesale-login", "/wholesale-catalog"],
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
      readable: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
