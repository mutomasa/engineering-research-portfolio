/**
 * Markdown 本文中のサイト内リンク（/tech/... など）を本番ビルド用に書き換える rehype プラグイン。
 *
 * Hugging Face の static Space はディレクトリの index.html を補完しないため、
 * src/lib/url.ts の pageHref と同じく `/tech/foo#bar` を `/tech/foo/index.html#bar` にする。
 * 開発中（enabled: false）は書き換えない。拡張子付きのファイルへのリンクはそのまま残す。
 */
export default function rehypeInternalLinks({ enabled = false } = {}) {
	const rewrite = (href) => {
		const match = /^(\/(?!\/)[^?#]*)([?#].*)?$/.exec(href);
		if (!match) return href;
		const [, path, rest = ''] = match;
		if (path === '/' || /\.[a-z0-9]+$/i.test(path)) return href;
		return `${path.replace(/\/+$/, '')}/index.html${rest}`;
	};
	const visit = (node) => {
		if (node.type === 'element' && node.tagName === 'a') {
			const href = node.properties?.href;
			if (typeof href === 'string') node.properties.href = rewrite(href);
		}
		if (Array.isArray(node.children)) node.children.forEach(visit);
	};
	return (tree) => {
		if (enabled) visit(tree);
	};
}
