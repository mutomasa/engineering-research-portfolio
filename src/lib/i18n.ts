/**
 * ブラウザ側の表示言語の切り替え。
 * 初期値は Layout の head 内スクリプトが <html data-lang> に設定する。
 * 切り替えると `langchange` イベント（detail に言語）を document に送る。
 */
export type Lang = 'en' | 'ja';

export function getLang(): Lang {
	return document.documentElement.dataset.lang === 'ja' ? 'ja' : 'en';
}

export function setLang(lang: Lang) {
	const root = document.documentElement;
	root.dataset.lang = lang;
	root.lang = lang;
	document.title = root.dataset[lang === 'ja' ? 'titleJa' : 'titleEn'] ?? document.title;
	try {
		localStorage.setItem('lang', lang);
	} catch {
		// プライベートモードなどで保存できなくても、このページ内の切り替えは有効
	}
	document.dispatchEvent(new CustomEvent<Lang>('langchange', { detail: lang }));
}
