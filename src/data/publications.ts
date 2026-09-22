export interface Publication {
	title: string;
	authors: string;
	venue: string;
	year: number;
	kind: 'paper' | 'poster' | 'other';
	url?: string;
}

/**
 * 論文・ポスター・研究成果はここに追加すると /papers に表示されます。
 * 実在するものだけを追加してください。
 *
 * 例:
 * {
 *   title: '...',
 *   authors: 'Masahiro Muto, ...',
 *   venue: '...',
 *   year: 2026,
 *   kind: 'paper',
 *   url: 'https://...',
 * }
 */
export const publications: Publication[] = [];
