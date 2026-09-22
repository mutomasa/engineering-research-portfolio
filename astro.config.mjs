// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// 静的サイトとして dist/ に出力する（Docker・サーバーサイド実行は使用しない）
	output: 'static',
});
