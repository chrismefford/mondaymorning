import "./ssr-polyfill"; // Must be first - provides localStorage/sessionStorage for SSG builds
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Fonts are declared in index.html via @font-face on self-hosted /fonts/*.woff2
// (kept out of the JS/CSS bundle so they don't bloat render-blocking CSS)

import "./index.css";

if (typeof document !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}
