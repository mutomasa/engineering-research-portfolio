/**
 * 内部リンクを組み立てる。
 *
 * Hugging Face の static Space はディレクトリの index.html を補完せず、
 * `/projects` は 404、`/projects/` は huggingface.co/projects へ飛ばされる。
 * そのため本番ビルドでは `/projects/index.html` のようにファイルを明示する。
 * 開発中（astro dev）は従来どおりのきれいな URL を使う。
 */
export function pageHref(path: string): string {
	if (import.meta.env.DEV || path === '/') return path;
	return `${path.replace(/\/+$/, '')}/index.html`;
}
