// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	// 静的サイトとして dist/ に出力する（Docker・サーバーサイド実行は使用しない）
	output: 'static',
	markdown: {
		// $...$ / $$...$$ の数式をビルド時に KaTeX で描画する
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
		// ```mermaid はハイライトせず残し、ページ側のスクリプトで図に変換する
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'math'] },
	},
});
