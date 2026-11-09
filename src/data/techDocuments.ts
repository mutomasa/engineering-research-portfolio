/**
 * AI/IT 技術タブの「資料」（PDF で公開する原稿・スライド）の定義。
 * PDF は public/tech/docs/ に置き、file にファイル名を指定する。
 */
export interface TechDocument {
	title: string;
	subtitle?: string;
	description: string;
	/** 「ゼミ資料」「解説記事ドラフト」「スライド」などの種類 */
	kind: string;
	/** 版（例：'1.0'）。指定すると「Version 1.0」と表示する */
	version?: string;
	/** 発表・改訂の時期（例：'2026年11月'） */
	date: string;
	pages: number;
	/** public/tech/docs/ 内のファイル名 */
	file: string;
	tags: string[];
}

export const techDocuments: TechDocument[] = [
	{
		title: 'AI エージェントとマルチエージェントの歴史',
		subtitle: '知識工学から LLM、フィジカル AI、Agentic Robotics へ',
		description:
			'記号主義 AI、Blackboard、BDI、PRS、Contract Net、Ontology から、LLM エージェント、GraphRAG、VLA、World Model、Agentic Robotics、再帰的自己改善（RSI）までを、「知識をどう獲得し、表現し、共有し、行動で更新するか」という知識科学の観点から整理した原稿。',
		kind: 'ゼミ資料（JAIST 知識科学ゼミ）',
		version: '1.0',
		date: '2026年11月',
		pages: 38,
		file: 'ai-agent-history-v1.0.pdf',
		tags: ['AI Agent', 'Multi-Agent', 'Knowledge Science', 'Agentic Robotics'],
	},
	{
		title: '自己進化する生成 AI エージェント',
		subtitle: 'LLM・進化計算・Lisp/Clojure によるプログラム表現の再考',
		description:
			'プロンプト・ルール・ワークフロー・コードを自ら改善する LLM エージェントを、進化計算・遺伝的プログラミング・記号推論の系譜から捉え直し、Clojure の S 式をエージェントのルールや計画の中間表現として使う可能性を論じた解説記事。',
		kind: '解説記事ドラフト（人工知能学会誌向け）',
		date: '2026年11月',
		pages: 6,
		file: 'self-evolving-ai-agent.pdf',
		tags: ['AI Agent', 'Self-Improvement', 'Evolutionary Computation', 'Clojure'],
	},
	{
		title: 'オントロジーと知識グラフの動向と取り組み',
		subtitle: 'LLM・AI Agent・Spatial AI への展開',
		description:
			'意味・関係・文脈を AI の判断と行動へつなぐために、RDF / OWL / SHACL、LinkML による Model-as-Code、因果知識グラフ、主要ベンダーの Ontology 製品の動向と、実装・評価の取り組みをまとめたスライド。',
		kind: 'スライド（JAIST 西村研究室セミナー）',
		date: '2026年11月改訂',
		pages: 22,
		file: 'ontology-knowledge-graph-2026-11.pdf',
		tags: ['Ontology', 'Knowledge Graph', 'LLM', 'Spatial AI'],
	},
];
