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

export const collections = { blog, blogJa, lab };
