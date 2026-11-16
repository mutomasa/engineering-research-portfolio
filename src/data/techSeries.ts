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
	/** 書籍の版（例：'1.0'）。書籍一覧と各章に「Version 1.0」と表示する */
	version?: string;
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
		version: '1.0',
		tags: ['Architecture', 'System Design', 'Cloud', 'GPU', 'Machine Learning', 'AI Agent'],
	},
	{
		id: 'ops-platform-engineering',
		title: 'Opsの進化とPlatform Engineering',
		subtitle: 'IT運用の歴史からAIエージェント、自律進化するSoftware Factoryへ',
		description:
			'メインフレームの運用と監視ツールから、DevOps、SRE、Cloud Native、Observability、MLOps・LLMOps・AgentOps などの XOps を経て、Platform Engineering、Agent Mesh、Software Factory、自己改善型プラットフォームまで。各Opsの専門性を生かしながら、共通能力・開発体験・ガバナンスをどう提供するかを、歴史・原典・設計・実装例で解説する。',
		note: '注意事項：本書は初稿（Version 0.1.1、基準日 2026年11月14日）です。本文中の「執筆メモ」は、刊行前に一次資料で再確認する予定の箇所です。クラウド製品の名称・提供状況などは基準日時点の情報です。',
		kind: '書籍',
		status: '初稿（執筆中）',
		version: '0.1.1',
		tags: ['Operations', 'DevOps', 'SRE', 'Observability', 'MLOps', 'LLMOps', 'AgentOps', 'Platform Engineering'],
	},
];
