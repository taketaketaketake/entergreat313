// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update to https://www.entergreat313.org when the domain moves over
  site: 'https://entergreat313.netlify.app',

  // /about moved to /who-we-are — keep the old URL working for anyone who bookmarked it
  redirects: {
    '/about': '/who-we-are',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact(), sitemap()]
});
