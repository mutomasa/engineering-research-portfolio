// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeInternalLinks from './src/plugins/rehype-internal-links.mjs';
import rehypePointCallout from './src/plugins/rehype-point-callout.mjs';

// 本番ビルドかどうか（Markdown 内の内部リンクを Hugging Face Space 向けに書き換えるため）
const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
	// 静的サイトとして dist/ に出力する（Docker・サーバーサイド実行は使用しない）
	output: 'static',
	// 第11章を「機械学習のアーキテクチャ」にしたため、旧URLを新しい第12章へ転送する
	redirects: {
		'/tech/architecture/11-ai-architecture': '/tech/architecture/12-ai-architecture',
	},
	markdown: {
		// $...$ / $$...$$ の数式をビルド時に KaTeX で描画する
		remarkPlugins: [remarkMath],
		// 外部リンクは新しいタブで開く（HF Space の iframe 内では GitHub などが開けないため）
		// `> [!POINT]` の引用を猫のキャラクター付きの「ポイント」ボックスにする
		rehypePlugins: [rehypeKatex, rehypePointCallout, rehypeExternalLinks, [rehypeInternalLinks, { enabled: isBuild }]],
		// ```mermaid はハイライトせず残し、ページ側のスクリプトで図に変換する
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'math'] },
	},
});
