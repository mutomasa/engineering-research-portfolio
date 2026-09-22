import { SITE } from '../consts';

export interface Deck {
	id: string;
	title: string;
	url: string;
	description: string;
	publishedAt: string;
	thumbnail: string | null;
}

export type DeckResult =
	| { ok: true; decks: Deck[]; fetchedAt: string }
	| { ok: false; error: string };

const ENTITIES: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
};

function decodeEntities(text: string): string {
	return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
		if (code[0] === '#') {
			const num = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
			return Number.isFinite(num) && num > 0 && num <= 0x10ffff ? String.fromCodePoint(num) : match;
		}
		return ENTITIES[code.toLowerCase()] ?? match;
	});
}

/** フィードの content（HTML の場合あり）をプレーンテキストにする。 */
function toPlainText(html: string): string {
	return decodeEntities(decodeEntities(html).replace(/<[^>]*>/g, ' '))
		.replace(/\s+/g, ' ')
		.trim();
}

function pick(entry: string, pattern: RegExp): string | undefined {
	return entry.match(pattern)?.[1];
}

/** https の URL だけを通す（想定外のスキームを埋め込まない）。 */
function httpsUrl(value: string | undefined): string | null {
	if (!value) return null;
	const decoded = decodeEntities(value);
	return decoded.startsWith('https://') ? decoded : null;
}

export function parseDeckFeed(xml: string): Deck[] {
	const decks: Deck[] = [];
	for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
		const id = pick(entry, /<id>([\s\S]*?)<\/id>/);
		const title = pick(entry, /<title[^>]*>([\s\S]*?)<\/title>/);
		const url = httpsUrl(pick(entry, /<link[^>]*rel="alternate"[^>]*href="([^"]+)"/));
		const published = pick(entry, /<published>([\s\S]*?)<\/published>/);
		if (!id || !title || !url || !published || Number.isNaN(Date.parse(published))) continue;

		decks.push({
			id,
			title: toPlainText(title),
			url,
			description: toPlainText(pick(entry, /<content[^>]*>([\s\S]*?)<\/content>/) ?? ''),
			publishedAt: new Date(published).toISOString(),
			thumbnail: httpsUrl(pick(entry, /<media:thumbnail[^>]*url="([^"]+)"/)),
		});
	}
	return decks.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

async function fetchDecks(user: string): Promise<Deck[]> {
	const res = await fetch(`https://speakerdeck.com/${encodeURIComponent(user)}.atom`, {
		headers: { Accept: 'application/atom+xml', 'User-Agent': `${user}-research-portfolio` },
		signal: AbortSignal.timeout(15_000),
	});
	if (!res.ok) throw new Error(`Speaker Deck responded with ${res.status}`);
	return parseDeckFeed(await res.text());
}

let cached: Promise<DeckResult> | undefined;

/** Speaker Deck の公開スライドを取得する。失敗してもビルドは止めず、エラー結果を返す。 */
export function getDecks(user: string = SITE.speakerdeck.user): Promise<DeckResult> {
	cached ??= fetchDecks(user).then(
		(decks): DeckResult => ({ ok: true, decks, fetchedAt: new Date().toISOString() }),
		(err): DeckResult => ({
			ok: false,
			error: err instanceof Error ? err.message : 'Unknown error',
		}),
	);
	return cached;
}
