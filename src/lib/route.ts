// Dua halaman saja: beranda dan /contact. Tanpa router.
export const isContact = typeof window !== 'undefined' && /^\/contact\/?$/.test(window.location.pathname)

/** In-page anchors (#produk) must point back to the home page when we're on /contact. */
export const href = (h: string) => (isContact && h.startsWith('#') ? '/' + h : h)

export const external = (h: string) => (h.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})
