import { getCollection } from 'astro:content';

/** 下書き（draft: true）を除き、公開日の新しい順に返す。 */
export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** タイムゾーンに依存しない YYYY-MM-DD 表記。 */
export function formatDate(date: Date | string) {
	return new Date(date).toISOString().slice(0, 10);
}
