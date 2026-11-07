/**
 * Markdown 本文中の外部リンク（http/https）を新しいタブで開く rehype プラグイン。
 *
 * Hugging Face の Space はサイトを iframe 内に表示するため、GitHub など
 * iframe 埋め込みを拒否するサイトへのリンクは同じ枠では開けない。
 * そのため外部リンクには target="_blank" と rel="noopener noreferrer" を付ける。
 */
export default function rehypeExternalLinks() {
	const visit = (node) => {
		if (node.type === 'element' && node.tagName === 'a') {
			const href = node.properties?.href;
			if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
				node.properties.target = '_blank';
				node.properties.rel = ['noopener', 'noreferrer'];
			}
		}
		if (Array.isArray(node.children)) node.children.forEach(visit);
	};
	return (tree) => visit(tree);
}
