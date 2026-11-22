# remot.in, landing page

Landing utama PT Remotin Cloud Infrastructure (remot.in). UI/UX terinspirasi decart.ai: canvas terang, headline besar dan ringan, satu aksen biru dari logo, tombol pill, media card besar, serta storytelling berbasis scroll.

Stack: Vite + React + TypeScript, Lenis (smooth scroll). Animasi lain ditulis sendiri (canvas voxel morph, reveal scroll, typewriter), tanpa video eksternal.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5190
npm run build    # output ke dist/
```

## Mengganti isi

- **Copy / teks / link**: `src/content.ts` (link produk ada di `LINKS`)
- **Gambar & logo partner**: `src/media.ts` + folder `public/`
- **Warna & token**: blok `:root` di `src/styles.css` (`--blue` diambil dari logo)
- **Logo**: `src/components/Logo.tsx` (SVG hasil gambar ulang logo remot.in) dan `public/favicon.svg`

## Deploy (Vercel)

Import repo ini di Vercel (framework Vite terdeteksi otomatis, output `dist`). Tambahkan domain `remot.in` + `www.remot.in` ke project ini, lalu pindahkan `play.remot.in` ke project kirani dan `wanychat.remot.in` ke project wanychat.
