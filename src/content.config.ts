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

// Home Lab ビルドプロジェクトの解説（/lab に表示）
const lab = defineCollection({
	loader: glob({ base: './src/content/lab', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = { blog, lab };
