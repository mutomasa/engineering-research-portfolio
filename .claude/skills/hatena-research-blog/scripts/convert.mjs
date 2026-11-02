// はてなブログの記事 HTML を、原文のまま Astro 用 Markdown（src/content/blog-ja/）に変換する。
//
// 使い方（依存はプロジェクトに入れず、スクラッチの作業ディレクトリに入れる）:
//   cd <scratch>/tools && npm init -y && npm i turndown@7.2.0 turndown-plugin-gfm@1.0.2 jsdom@24.1.3
//   cp <skill>/scripts/convert.mjs . && node convert.mjs <list.txt> <rawDir> <outDir>
//
// list.txt は 1 行 1 記事で「<entry パス> <slug> [タグ,カンマ区切り]」。
//   例: 2026/09/20/125823 molmoact-2-tactile-world-model-next-gen-vla robotics,vla,world-models
// rawDir には <slug>.html として記事ページ（https://mutomasa.hatenablog.com/entry/<entry パス>）を保存しておく。
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const [listFile, rawDir, outDir] = process.argv.slice(2);
if (!listFile || !rawDir || !outDir) {
	console.error('usage: node convert.mjs <list.txt> <rawDir> <outDir>');
	process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
const q = (s) => `'${s.replace(/'/g, "''")}'`;

for (const line of fs.readFileSync(listFile, 'utf8').trim().split('\n')) {
	const [entryPath, slug, tagCsv = ''] = line.trim().split(/\s+/);
	const html = fs.readFileSync(path.join(rawDir, slug + '.html'), 'utf8');
	const doc = new JSDOM(html).window.document;
	const meta = (prop) => doc.querySelector(`meta[property="${prop}"]`)?.getAttribute('content') ?? '';
	const title = doc.querySelector('h1.entry-title')?.textContent.trim() || meta('og:title');
	const body = doc.querySelector('.entry-content.hatenablog-entry');
	if (!body) {
		console.error(`本文が見つかりません: ${slug}`);
		continue;
	}

	// はてな記法のキーワードリンクは外してテキストだけ残す
	body.querySelectorAll('a.keyword').forEach((a) => a.replaceWith(a.textContent));
	body.querySelectorAll('svg, script, style, button').forEach((e) => e.remove());
	// ブログカード（iframe）は「タイトル付きリンク」にし、直後の出典表示（cite）は重複するので消す
	body.querySelectorAll('cite.hatena-citation').forEach((e) => e.remove());
	body.querySelectorAll('iframe').forEach((f) => {
		const src = f.getAttribute('src') || '';
		const m = src.match(/[?&]url=([^&]+)/);
		const url = m ? decodeURIComponent(m[1]) : src;
		const a = doc.createElement('a');
		a.href = url;
		a.textContent = f.getAttribute('title') || url;
		const p = doc.createElement('p');
		p.append(a);
		f.replaceWith(p);
	});
	// [tex:] 記法の数式画像（chart.apis.google.com、配信終了済み）は alt の TeX に戻す
	const maths = [];
	body.querySelectorAll('img[src*="chart.apis.google.com"]').forEach((img) => {
		const tex = img.getAttribute('alt') || '';
		const parent = img.parentElement;
		const alone = parent && parent.textContent.trim() === '' && parent.querySelectorAll('img').length === 1;
		maths.push(alone ? `$$${tex}$$` : `$${tex}$`);
		img.replaceWith(`MATHTOKEN${maths.length - 1}X`);
	});
	// 表のセル内の段落を解除し、空白をまとめる（GFM の表が崩れないように）
	body.querySelectorAll('td, th').forEach((cell) => {
		cell.querySelectorAll('p, div').forEach((b) => b.replaceWith(...b.childNodes, ' '));
		const walker = doc.createTreeWalker(cell, 4);
		let n;
		while ((n = walker.nextNode())) n.nodeValue = n.nodeValue.replace(/\s+/g, ' ');
	});

	const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*' });
	td.use(gfm);
	td.addRule('hatenaCode', {
		filter: (n) => n.nodeName === 'PRE',
		replacement: (_c, n) => {
			const lang = n.getAttribute('data-lang') || '';
			const code = n.textContent.replace(/\n$/, '');
			const fence = code.includes('```') ? '~~~~' : '```';
			return `\n\n${fence}${lang === 'text' ? '' : lang}\n${code}\n${fence}\n\n`;
		},
	});
	td.addRule('img', {
		filter: 'img',
		replacement: (_c, n) => `![${n.getAttribute('alt') || ''}](${n.getAttribute('src')})`,
	});
	let md = td.turndown(body.innerHTML).replace(/\n{3,}/g, '\n\n').trim();
	md = md.replace(/MATHTOKEN(\d+)X/g, (_m, i) => maths[+i]);

	let desc = (meta('og:description') || '').replace(/\s+/g, ' ').trim();
	if (desc.startsWith(title)) desc = desc.slice(title.length).trim();
	if (desc.length > 120) desc = desc.slice(0, 120).replace(/[、。,\s]*$/, '') + '…';
	const tags = tagCsv ? tagCsv.split(',').filter(Boolean) : [];
	const fm = [
		'---',
		`title: ${q(title)}`,
		`description: ${q(desc)}`,
		`pubDate: ${entryPath.slice(0, 10).replace(/\//g, '-')}`,
		`tags: [${tags.map(q).join(', ')}]`,
		`originalUrl: ${q('https://mutomasa.hatenablog.com/entry/' + entryPath)}`,
		'---',
		'',
	].join('\n');
	fs.writeFileSync(path.join(outDir, slug + '.md'), fm + md + '\n');
	console.log(`${slug}\t${title}\t${md.length} chars`);
}
