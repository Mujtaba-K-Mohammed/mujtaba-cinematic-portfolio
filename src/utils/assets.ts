/** Vite's base keeps local assets working on a root domain or a GitHub Pages subpath. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
