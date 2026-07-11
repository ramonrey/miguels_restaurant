# Miguel's Mexican Dining

Website redesign of Miguel's Mexican Dining — a family-owned Mexican restaurant in Stockton, CA. Rebuilt from the ground up on [Astro](https://astro.build) with a modern, SEO-first structure, drawing on the restaurant's real branding (toucan logo, food photography, storefront) and design inspiration from Ballena and Diodona.

## Stack

- **[Astro v7](https://astro.build)** — static site generation, zero client-side JS by default
- **Tailwind CSS v4** via `@tailwindcss/vite`, CSS-first `@theme` config
- **Astro Fonts API** — Fraunces, Caveat, Work Sans, self-hosted from Google Fonts
- **`astro:assets`** — automatic image optimization/WebP conversion
- **Astro Content Collections** — the menu (`src/content/menu/*.json`) is structured, typed data
- **`astro-icon`** + `@iconify-json/lucide` — inline SVG icons
- **`@astrojs/sitemap`** — sitemap generation
- Hand-rolled JSON-LD (`Restaurant` schema), OG/Twitter meta, canonical URLs

## Project structure

```text
src/
  assets/photos/       real Miguel's photography + labeled stock placeholders (see ASSETS.md)
  components/          Header, Footer, SEO/layout building blocks, MenuCategory, etc.
  content/menu/*.json  menu categories & items (Zod-validated via src/content.config.ts)
  data/                business.ts (NAP/hours/socials — single source of truth), images.ts
  layouts/             BaseLayout.astro (SEO, JSON-LD, header/footer shell)
  pages/                Home, Menu, About, Gallery, Contact, 404
public/                 robots.txt, favicons
```

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build the static site to `./dist/`           |
| `npm run preview`   | Preview the production build locally         |

## Before launch

See `ASSETS.md` for a breakdown of which photos are real vs. placeholder stock, and licensing notes. A few things still need real data plugged in:

- Menu prices in `src/content/menu/*.json` are illustrative — update with real pricing.
- Contact form (`src/pages/contact.astro`) needs a live [Formspree](https://formspree.io) endpoint — set `formEndpoint` in `src/data/business.ts`.
- `site` in `astro.config.mjs` and the geo coordinates in `src/data/business.ts` should be confirmed/updated for production.

## License

MIT — see [`LICENSE`](./LICENSE).
