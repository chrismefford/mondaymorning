import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

const SITE_URL = "https://mondaymorning-af.com";

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
  "/social-club",
  "/press",
  "/consulting",
  "/non-alcoholic-drinks-san-diego",
  "/non-alcoholic-beer-guide",
  "/best-non-alcoholic-drinks",
  "/new-to-non-alcoholic-drinks",
  "/alcohol-free-lifestyle-benefits",
  "/zero-proof-meaning",
  "/cutwater-alcohol-content",
  "/non-alc-drinks",
  "/zero-proof-alcohol-nearby",
  "/alcohol-alternatives",
  // Kava Haven neighborhood pages
  "/kava-haven/north-park",
  "/kava-haven/pacific-beach",
  "/kava-haven/ocean-beach",
  "/kava-haven/little-italy",
  "/kava-haven/mission-beach",
  "/kava-haven/mission-valley",
  "/kava-haven/normal-heights",
  "/kava-haven/coronado",
  "/kava-haven/la-jolla",
  "/kava-haven/liberty-station",
  "/kava-haven/carlsbad",
  "/kava-haven/oceanside",
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
    // Generate sitemap.xml only during production builds
    mode === "production" && Sitemap({
      hostname: SITE_URL,
      dynamicRoutes: staticRoutes,
      exclude: ["/admin", "/blog-import", "/wholesale-login", "/wholesale-catalog", "/auth", "/404"],
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
