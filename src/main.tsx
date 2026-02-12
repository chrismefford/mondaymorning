import "./ssr-polyfill"; // Must be first - provides localStorage/sessionStorage for SSG builds
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
