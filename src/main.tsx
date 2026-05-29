import "./ssr-polyfill"; // Must be first - provides localStorage/sessionStorage for SSG builds
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Self-hosted fonts (no Google Fonts network roundtrip)
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-serif-display/400-italic.css";

import "./index.css";

if (typeof document !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}
