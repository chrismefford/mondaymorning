// CJS-compatible import for SSG/ESM builds where named exports aren't available
import pkg from 'react-helmet-async';
const { Helmet, HelmetProvider } = pkg as any;
export { Helmet, HelmetProvider };
