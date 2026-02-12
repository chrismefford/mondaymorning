// Compatibility wrapper for react-helmet-async to handle both CJS and ESM environments (SSG builds)
import pkg from 'react-helmet-async';

const { Helmet, HelmetProvider } = pkg as any;

export { Helmet, HelmetProvider };
