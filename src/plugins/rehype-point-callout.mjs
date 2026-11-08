/**
 * Markdown の `> [!POINT]` で始まる引用を、猫のキャラクター付きの「ポイント」ボックスに変える rehype プラグイン。
 *
 *   > [!POINT]
 *   > ここに要点を書く
 */

const MARKER = '[!POINT]';

// 猫のキャラクター（装飾なので読み上げ対象から外す）
const CAT_SVG = `<svg class="point-cat" viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" focusable="false">
  <path d="M12 26 L14 6 L28 17 Z" fill="#f4a261" stroke="#7a4a2a" stroke-width="2" stroke-linejoin="round"/>
  <path d="M52 26 L50 6 L36 17 Z" fill="#f4a261" stroke="#7a4a2a" stroke-width="2" stroke-linejoin="round"/>
  <path d="M15.5 21 L16.5 11 L24 17 Z" fill="#ffc8d2"/>
  <path d="M48.5 21 L47.5 11 L40 17 Z" fill="#ffc8d2"/>
  <ellipse cx="32" cy="36" rx="23" ry="20" fill="#f4a261" stroke="#7a4a2a" stroke-width="2"/>
  <path d="M27 18 Q32 22 37 18" fill="none" stroke="#d9823f" stroke-width="2" stroke-linecap="round"/>
  <path d="M29 23 Q32 26 35 23" fill="none" stroke="#d9823f" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="32" cy="43" rx="11" ry="8" fill="#fff4e6"/>
  <ellipse cx="23" cy="34" rx="3" ry="3.6" fill="#3b2a20"/>
  <ellipse cx="41" cy="34" rx="3" ry="3.6" fill="#3b2a20"/>
  <circle cx="24.1" cy="32.7" r="1.1" fill="#fff"/>
  <circle cx="42.1" cy="32.7" r="1.1" fill="#fff"/>
  <ellipse cx="17" cy="41" rx="3.4" ry="2.2" fill="#ff9aa8" opacity="0.75"/>
  <ellipse cx="47" cy="41" rx="3.4" ry="2.2" fill="#ff9aa8" opacity="0.75"/>
  <path d="M30.2 39.5 L33.8 39.5 L32 41.6 Z" fill="#e76f82"/>
  <path d="M32 41.6 Q30 44.6 27.6 43.4 M32 41.6 Q34 44.6 36.4 43.4" fill="none" stroke="#7a4a2a" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M8 38 L18 39.5 M8 44 L18 42.5 M56 38 L46 39.5 M56 44 L46 42.5" stroke="#7a4a2a" stroke-width="1.4" stroke-linecap="round"/>
</svg>`;

/** 最初のテキストからマーカーを取り除き、マーカーがあったかを返す */
function stripMarker(node) {
	if (!node || !Array.isArray(node.children)) return false;
	const first = node.children.find((c) => !(c.type === 'text' && c.value.trim() === ''));
	if (!first) return false;
	if (first.type === 'text') {
		const text = first.value.trimStart();
		if (!text.startsWith(MARKER)) return false;
		first.value = text.slice(MARKER.length).replace(/^\s+/, '');
		return true;
	}
	if (first.type === 'element' && first.tagName === 'p') return stripMarker(first);
	return false;
}

export default function rehypePointCallout() {
	const visit = (node) => {
		if (!Array.isArray(node.children)) return;
		node.children = node.children.map((child) => {
			if (child.type === 'element' && child.tagName === 'blockquote' && stripMarker(child)) {
				// マーカーだけの段落が空になったら取り除く
				child.children = child.children.filter(
					(c) =>
						!(
							c.type === 'element' &&
							c.tagName === 'p' &&
							c.children.every((t) => t.type === 'text' && t.value.trim() === '')
						),
				);
				return {
					type: 'element',
					tagName: 'aside',
					properties: { className: ['point'], ariaLabel: 'ポイント' },
					children: [
						{ type: 'raw', value: CAT_SVG },
						{
							type: 'element',
							tagName: 'div',
							properties: { className: ['point-body'] },
							children: [
								{
									type: 'element',
									tagName: 'p',
									properties: { className: ['point-label'] },
									children: [{ type: 'text', value: 'ポイント' }],
								},
								...child.children,
							],
						},
					],
				};
			}
			visit(child);
			return child;
		});
	};
	return (tree) => visit(tree);
}
