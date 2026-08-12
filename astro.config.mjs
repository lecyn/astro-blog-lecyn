// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";
import { rehypeCodeLanguage } from "./src/plugins/rehype-code-language";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.lecyn.cn",
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeCodeLanguage],
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
