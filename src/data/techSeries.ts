/**
 * AI/IT 技術タブの書籍（シリーズ）の定義。
 * 各章は src/content/tech/<id>/ に置き、frontmatter の series に id を指定する。
 */
export interface TechSeries {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	/** 書籍一覧で紹介文の下に表示する注意事項（任意） */
	note?: string;
	/** 「書籍」「連載」などの種類 */
	kind: string;
	/** 「執筆中」「完結」などの状態 */
	status: string;
	tags: string[];
}

export const techSeries: TechSeries[] = [
	{
		id: 'architecture',
		title: 'アーキテクチャ入門',
		subtitle: 'AI時代にシステムの構造を考える',
		description:
			'建築の思想からメインフレーム、Web、クラウド、マイクロサービス、データ基盤、セキュリティ、GPU、機械学習、そして AI Agent まで。「なぜその構造が必要なのか」を歴史・原理・実例の順に解説する入門書。',
		note: '注意事項：本書は、著者自身が設計・構築したアーキテクチャのみを記載しています。すべてのITアーキテクチャ・AIアーキテクチャを網羅したものではありません（第11章の機械学習のアーキテクチャは、一般的なものを紹介しています）。',
		kind: '書籍',
		status: '初版（随時改訂）',
		tags: ['Architecture', 'System Design', 'Cloud', 'GPU', 'Machine Learning', 'AI Agent'],
	},
];
