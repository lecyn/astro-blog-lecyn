import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
	const blogPosts = await getCollection("blog");
	const shares = await getCollection("shares");

	const allItems = [
		...blogPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
		...shares.map((share) => ({
			...share.data,
			link: `/share/${share.id}/`,
		})),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: '<language>zh-CN</language>',
		items: allItems,
	});
}
