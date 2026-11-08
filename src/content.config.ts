import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		// 関連リポジトリ・デモの URL（任意）
		github: z.string().url().optional(),
		demo: z.string().url().optional(),
		// Hatena ブログからの翻訳インポート記事のトレーサビリティ情報（任意）
		originalUrl: z.string().url().optional(),
		originalTitle: z.string().optional(),
		sourceLanguage: z.string().optional(),
	}),
});

// はてなブログの日本語原文（翻訳せずそのまま掲載）。ファイル名は英語版と同じ slug にすると、
// 1 つの記事として英語・日本語を切り替えて表示する。英語版がない記事は日本語のみで公開する。
const blogJa = defineCollection({
	loader: glob({ base: './src/content/blog-ja', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		originalUrl: z.string().url(),
	}),
});

// Home Lab ビルドプロジェクトの解説（/lab に表示）
const lab = defineCollection({
	loader: glob({ base: './src/content/lab', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

// 研究内容（/research に一覧、/research/<slug> に本文を表示）。日本語のみ。
const research = defineCollection({
	loader: glob({ base: './src/content/research', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		description: z.string(),
		// 「研究計画書」「研究紹介」などの資料の種類
		kind: z.string(),
		// 一覧での表示順（小さいほど先）
		order: z.number().default(100),
		updated: z.coerce.date(),
		tags: z.array(z.string()).default([]),
	}),
});

// AI/IT 技術の記事・書籍（/tech に一覧、/tech/<slug> に本文を表示）。日本語のみ。
// 書籍はサブディレクトリにまとめ、series に src/data/techSeries.ts の id を指定する。
const tech = defineCollection({
	loader: glob({ base: './src/content/tech', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updated: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		// 書籍（シリーズ）の id。単発の記事では省略する
		series: z.string().optional(),
		// 書籍内の並び順、または一覧での並び順（小さいほど先）
		order: z.number().default(100),
		// 「第1章」「付録A」などの見出しラベル（任意）
		label: z.string().optional(),
	}),
});

export const collections = { blog, blogJa, lab, research, tech };
