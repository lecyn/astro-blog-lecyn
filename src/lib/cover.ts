/**
 * 全站文章封面统一使用 alcy.cc 的随机壁纸接口。
 *
 * 该接口每次请求返回一张随机壁纸，但浏览器是**按 URL 缓存**的：
 * 若所有文章都引用同一个 URL，最终只会拿到同一张缓存图（封面重复的根因）。
 * 因此用 ?t=num 让每篇文章的 URL 互不相同。
 *
 * 编号规则：blog / notes / shares 三个集合的文章**合并在一起**，按发布日期
 * 升序编号，最早的一篇是 1。选「全局 + 升序」是为了稳定：
 *   - 全局：标签聚合页会把多个集合混在一起展示，若按集合各自编号会出现重号；
 *   - 升序：新发一篇文章只会拿到更大的编号，已有文章的编号不会变动。
 * 同一天的文章用「集合名 + id」兜底排序，保证每次构建结果一致。
 */
import { getCollection } from "astro:content";

const COVER_ENDPOINT = "https://t.alcy.cc/pc";
const COLLECTIONS = ["blog", "notes", "shares"] as const;

export interface CoverRef {
	collection: string;
	id: string;
}

const key = (entry: CoverRef) => `${entry.collection}:${entry.id}`;

let indexPromise: Promise<Map<string, number>> | undefined;

/** 构建「文章唯一键 → 封面编号」映射（整个构建过程只算一次） */
function loadIndex(): Promise<Map<string, number>> {
	indexPromise ??= (async () => {
		const groups = await Promise.all(
			COLLECTIONS.map(async (collection) => {
				const entries = await getCollection(collection);
				return entries.map((entry) => ({ collection, entry }));
			}),
		);

		const ordered = groups.flat().sort((a, b) => {
			const byDate = a.entry.data.pubDate.valueOf() - b.entry.data.pubDate.valueOf();
			if (byDate !== 0) return byDate;
			// 同一天：确定性兜底，避免每次构建编号漂移
			return key({ collection: a.collection, id: a.entry.id }).localeCompare(
				key({ collection: b.collection, id: b.entry.id }),
			);
		});

		const numbered: [string, number][] = ordered.map(({ collection, entry }, index) => [
			key({ collection, id: entry.id }),
			index + 1,
		]);
		return new Map(numbered);
	})();
	return indexPromise;
}

/**
 * 取得一个同步的封面地址解析器（顶层 await，仅在 frontmatter 里调用）：
 *
 *   const coverFor = await createCoverMapper();
 *   <img src={coverFor(post)} alt={post.data.title} />
 */
export async function createCoverMapper(): Promise<(entry: CoverRef) => string> {
	const index = await loadIndex();
	return (entry) => `${COVER_ENDPOINT}?t=${index.get(key(entry)) ?? 1}`;
}

/** 某篇文章的封面编号（1 起） */
export async function coverIndex(entry: CoverRef): Promise<number> {
	return (await loadIndex()).get(key(entry)) ?? 1;
}
