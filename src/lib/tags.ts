import { getCollection, type CollectionEntry } from "astro:content";

/** 参与标签体系的集合（顺序即标签页中的默认分组顺序） */
export const TAGGED_COLLECTIONS = ["blog", "notes", "shares"] as const;
export type TaggedCollection = (typeof TAGGED_COLLECTIONS)[number];

/** 集合名 → 路由前缀（注意 shares 集合的单数路由 /share） */
const ROUTE_PREFIX: Record<TaggedCollection, string> = {
	blog: "/blog",
	notes: "/notes",
	shares: "/share",
};

/** 集合名 → 展示用中文标签 */
export const COLLECTION_LABELS: Record<TaggedCollection, string> = {
	blog: "博客",
	notes: "笔记",
	shares: "分享",
};

/** 跨集合的条目引用 */
export interface TaggedEntry {
	collection: TaggedCollection;
	entry: CollectionEntry<TaggedCollection>;
}

/** 标签规范化：去空白、转小写、空格转连字符 */
export function normalizeTag(raw: string): string {
	return raw.trim().toLowerCase().replace(/\s+/g, "-");
}

/** 标签 → 标签页路径 */
export function tagToPath(tag: string): string {
	return `/tags/${normalizeTag(tag)}/`;
}

/** 条目 → 详情页路径 */
export function entryHref(collection: TaggedCollection, id: string): string {
	return `${ROUTE_PREFIX[collection]}/${id}/`;
}

/** 读取某个条目的规范化标签列表（去重、去空） */
export function tagsOf(entry: TaggedEntry["entry"]): string[] {
	const raw = entry.data.tags ?? [];
	return [...new Set(raw.map(normalizeTag).filter(Boolean))];
}

/** 拉取三个集合的全部条目 */
export async function getAllTaggedEntries(): Promise<TaggedEntry[]> {
	const groups = await Promise.all(
		TAGGED_COLLECTIONS.map(async (collection) => {
			const entries = await getCollection(collection);
			return entries.map((entry) => ({ collection, entry }));
		}),
	);
	return groups.flat();
}

/** 全部标签及出现次数：次数降序，其次按标签名升序 */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
	const counts = new Map<string, number>();
	for (const { entry } of await getAllTaggedEntries()) {
		for (const tag of tagsOf(entry)) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** 某个标签下的全部条目：按发布时间倒序 */
export async function getEntriesByTag(tag: string): Promise<TaggedEntry[]> {
	const target = normalizeTag(tag);
	const all = await getAllTaggedEntries();
	return all
		.filter(({ entry }) => tagsOf(entry).includes(target))
		.sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());
}
