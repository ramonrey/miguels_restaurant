# Miguel's Mexican Dining

Website redesign of Miguel's Mexican Dining — a family-owned Mexican restaurant in Stockton, CA (on Pacific Ave, serving the neighborhood since the '70s/'80s). Rebuilt from the ground up on [Astro](https://astro.build) with a modern, SEO-first structure, using the restaurant's real branding (toucan logo, food photography, storefront) and design inspiration drawn from Ballena and Diodona.

**Live locally at:** `http://localhost:4321` once the dev server is running (see below).

---

## Getting started

### Prerequisites

- **Node.js ≥ 22.12** (see `engines` in `package.json`) — check yours with `node -v`
- **npm** (ships with Node)

### Install & run

```sh
# 1. Clone the repo
git clone https://github.com/ramonrey/miguels_restaurant.git
cd miguels_restaurant

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:4321** in your browser. The dev server hot-reloads on file changes.

### All commands

| Command             | Action                                                         |
| :------------------- | :--------------------------------------------------------------- |
| `npm install`         | Install dependencies                                              |
| `npm run dev`         | Start the local dev server at `localhost:4321`                    |
| `npm run build`       | Type-check content and build the static site to `./dist/`         |
| `npm run preview`     | Serve the production build from `./dist/` locally, before deploying |
| `npm run astro ...`   | Run any Astro CLI command directly, e.g. `npm run astro check`    |
| `npx astro dev stop`  | Stop a dev server that's running in the background                |

---

## Tech stack

| Layer | Choice | Why |
| :--- | :--- | :--- |
| **Framework** | [Astro v7](https://astro.build) | Static-site generation — builds to plain HTML/CSS/JS, `output: 'static'`, no server runtime required. Ships **zero client-side JS by default**; only the mobile nav toggle and the scroll-reveal animation are small vanilla `<script>` blocks. No React/Vue/Svelte — the site doesn't need a UI framework. |
| **Styling** | Tailwind CSS v4 | Via the official `@tailwindcss/vite` plugin (not the deprecated `@astrojs/tailwind` integration). Config is CSS-first — theme tokens (brand colors, fonts, container widths) live in `src/styles/global.css` under `@theme`, not a JS config file. |
| **Typography** | Astro Fonts API | Fraunces (display/headings), Caveat (script accents), Work Sans (body) — declared in `astro.config.mjs` (`fonts:` key), fetched from Google Fonts **at build time** and self-hosted from `_astro/fonts`. No runtime request to `fonts.googleapis.com`. |
| **Images** | `astro:assets` | Every photo is imported as a module; the `<Image>` component automatically resizes and converts to WebP at build time with responsive `widths`/`sizes`. |
| **Content** | Astro Content Collections | The menu (`src/content/menu/*.json`) is structured, Zod-validated data (schema in `src/content.config.ts`) — pages loop over typed data instead of hardcoded markup. |
| **Icons** | `astro-icon` + `@iconify-json/lucide` | `<Icon name="lucide:phone" />` resolves to inline SVG at build time — no icon font, no runtime fetch. |
| **SEO** | `@astrojs/sitemap` + hand-rolled meta | Auto-generated `sitemap-index.xml`; per-page title/description/canonical/OG/Twitter tags and a `Restaurant` (schema.org) JSON-LD block, all built in `BaseLayout.astro`. |
| **Data** | Plain TypeScript modules | `src/data/business.ts` (NAP, hours, socials — single source of truth) and `src/data/images.ts` (string-key → optimized-image registry). No CMS, no database — editing the site means editing files in the repo. |

**Deliberately not used:** a UI component library, state management, a CMS/backend, or any build config beyond what Astro/Vite provide out of the box. The goal was a lean, fast, easy-to-maintain marketing site — not an app.

---

## Project structure

```text
src/
  assets/photos/         real Miguel's photography + labeled stock placeholders (see ASSETS.md)
    stock/                free-license placeholder photos — swap for real photography
  components/             Header, Footer, Button, SectionHeading, MenuCategory, HoursList,
                          MapEmbed — reusable building blocks
  content/
    menu/*.json            menu categories & items (Zod-validated via src/content.config.ts)
  content.config.ts        content collection schema
  data/
    business.ts             NAP, hours, socials, order-online URL — single source of truth
    images.ts                string-key → optimized astro:assets image registry
  layouts/
    BaseLayout.astro        SEO meta, JSON-LD, header/footer shell, font loading
  pages/
    index.astro              Home
    menu.astro                Full menu
    about.astro                Our Story
    gallery.astro               Gallery
    contact.astro                Contact & location
    404.astro                    Not found
  styles/
    global.css                Tailwind import + @theme design tokens
public/
  robots.txt, favicon*.png    static files served as-is
astro.config.mjs              integrations, Tailwind/Vite plugin, font declarations, site URL
ASSETS.md                     which photos are real vs. stock placeholders, and licensing
```

---

## Editing content

- **Business info (address, phone, hours, socials, Order Online link):** `src/data/business.ts`. Everything else (footer, header, JSON-LD, Contact page) reads from this one file.
- **Menu:** each category is a JSON file in `src/content/menu/` (e.g. `tacos.json`). Add/edit items directly — `price` is a string, `tags` can be any of `spicy`, `vegetarian`, `gf`, `popular`.
- **Photos:** drop new images in `src/assets/photos/`, import them where needed, and (if used as a menu category header) register them in `src/data/images.ts`.
- **Copy:** page text lives directly in each `.astro` file under `src/pages/`.

---

## Before launch

See [`ASSETS.md`](./ASSETS.md) for a full breakdown of which photos are real Miguel's photography vs. placeholder stock, plus licensing notes. A few things still need real data plugged in:

- [ ] Menu prices in `src/content/menu/*.json` are illustrative — update with real pricing.
- [ ] Contact form (`src/pages/contact.astro`) needs a live [Formspree](https://formspree.io) (or similar) endpoint — set `formEndpoint` in `src/data/business.ts`.
- [ ] `site` in `astro.config.mjs` should be confirmed as the real production domain.
- [ ] The geo coordinates in `src/data/business.ts` are approximate (city-corridor level, not rooftop-precise) — flagged with a `TODO` in that file.
- [ ] Confirm the restaurant's founding year (signage says "since 1977"; copy currently says 1985 per third-party listings) and reconcile across `business.ts` and page copy if needed.
- [ ] Swap placeholder stock photos in `src/assets/photos/stock/` for real interior/food photography as it becomes available.

---

## Deployment

The site builds to static files (`output: 'static'` in `astro.config.mjs`) — no server runtime needed, so it deploys to any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.

```sh
npm run build      # outputs to ./dist/
npm run preview    # sanity-check the production build locally first
```

Point your host's build command at `npm run build` and its publish directory at `dist/`.

---

## License

MIT — see [`LICENSE`](./LICENSE).
