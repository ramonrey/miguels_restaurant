// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // TODO: update to the real production domain before deploying
  site: 'https://www.miguelsmexicandiningca.com',
  output: 'static',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700, 900],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      name: 'Caveat',
      cssVariable: '--font-caveat',
      provider: fontProviders.google(),
      weights: [500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      name: 'Work Sans',
      cssVariable: '--font-work-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
