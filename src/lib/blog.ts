import { getCollection, type CollectionEntry } from 'astro:content';

export interface Post {
	slug: string;
	/** 英語版（はてなブログからの英訳、または英語で書いた記事） */
	en?: CollectionEntry<'blog'>;
	/** 日本語版（はてなブログの原文をそのまま掲載） */
	ja?: CollectionEntry<'blogJa'>;
	pubDate: Date;
	tags: string[];
}

/** 英語版・日本語版を slug で 1 つの記事にまとめ、下書きを除いて公開日の新しい順に返す。 */
export async function getPublishedPosts(): Promise<Post[]> {
	const [en, ja] = await Promise.all([
		getCollection('blog', ({ data }) => !data.draft),
		getCollection('blogJa', ({ data }) => !data.draft),
	]);
	const posts = new Map<string, Post>();
	for (const entry of en) {
		posts.set(entry.id, { slug: entry.id, en: entry, pubDate: entry.data.pubDate, tags: entry.data.tags });
	}
	for (const entry of ja) {
		const post = posts.get(entry.id);
		if (post) post.ja = entry;
		else posts.set(entry.id, { slug: entry.id, ja: entry, pubDate: entry.data.pubDate, tags: entry.data.tags });
	}
	return [...posts.values()].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}

/** タイムゾーンに依存しない YYYY-MM-DD 表記。 */
export function formatDate(date: Date | string) {
	return new Date(date).toISOString().slice(0, 10);
}
