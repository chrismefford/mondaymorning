import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { htmlPrerender } from "vite-plugin-html-prerender";
import Sitemap from "vite-plugin-sitemap";

// Static routes to pre-render for SEO
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

// Dynamic route patterns (not pre-rendered, but included in sitemap structure)
const dynamicRoutes = [
  "/product/:handle",
  "/collections/:slug",
  "/blog/:slug",
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
    // Only prerender in production build
    mode === "production" && htmlPrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: staticRoutes,
      selector: "#root",
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
