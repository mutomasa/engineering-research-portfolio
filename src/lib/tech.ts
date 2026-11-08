import { getCollection, type CollectionEntry } from 'astro:content';
import { techSeries } from '../data/techSeries';

export type TechEntry = CollectionEntry<'tech'>;

/** 公開対象の記事（本番では draft を除く）を並び順で返す */
export async function getTechEntries(): Promise<TechEntry[]> {
	const entries = await getCollection('tech', ({ data }) => import.meta.env.DEV || !data.draft);
	return entries.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

/** 書籍ごとに章をまとめる（techSeries の順） */
export function groupBySeries(entries: TechEntry[]) {
	return techSeries.map((series) => ({
		series,
		chapters: entries.filter((entry) => entry.data.series === series.id),
	}));
}

/** 書籍に属さない単発の記事（新しい順） */
export function standaloneArticles(entries: TechEntry[]) {
	return entries
		.filter((entry) => !entry.data.series)
		.sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf());
}
