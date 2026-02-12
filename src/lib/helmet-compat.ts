// Namespace import works in both ESM (Vite/Rollup) and CJS (SSG/Node) contexts
import * as HelmetModule from 'react-helmet-async';

// Handle both ESM named exports and CJS default export shapes
const mod = (HelmetModule as any).default || HelmetModule;
const Helmet = mod.Helmet || (HelmetModule as any).Helmet;
const HelmetProvider = mod.HelmetProvider || (HelmetModule as any).HelmetProvider;

export { Helmet, HelmetProvider };
