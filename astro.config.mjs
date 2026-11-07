// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';

// https://astro.build/config
export default defineConfig({
	// 静的サイトとして dist/ に出力する（Docker・サーバーサイド実行は使用しない）
	output: 'static',
	markdown: {
		// $...$ / $$...$$ の数式をビルド時に KaTeX で描画する
		remarkPlugins: [remarkMath],
		// 外部リンクは新しいタブで開く（HF Space の iframe 内では GitHub などが開けないため）
		rehypePlugins: [rehypeKatex, rehypeExternalLinks],
		// ```mermaid はハイライトせず残し、ページ側のスクリプトで図に変換する
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'math'] },
	},
});
