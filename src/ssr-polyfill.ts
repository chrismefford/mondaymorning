// SSR/SSG polyfill: provide no-op localStorage/sessionStorage for Node environments
if (typeof globalThis.localStorage === 'undefined') {
  const noopStorage: Storage = {
    length: 0,
    clear() {},
    getItem() { return null; },
    key() { return null; },
    removeItem() {},
    setItem() {},
  };
  (globalThis as any).localStorage = noopStorage;
  (globalThis as any).sessionStorage = noopStorage;
}
