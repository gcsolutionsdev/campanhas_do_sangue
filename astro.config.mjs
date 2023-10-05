import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: "https://gcsolutionsdev.github.io",
	base: '/campanhas_do_sangue',
	integrations: [mdx(), sitemap()],
});
