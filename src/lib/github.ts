import { SITE } from '../consts';

export interface Repo {
	name: string;
	url: string;
	description: string | null;
	language: string | null;
	stars: number;
	updatedAt: string;
	fork: boolean;
	archived: boolean;
}

export type RepoResult =
	| { ok: true; repos: Repo[]; fetchedAt: string }
	| { ok: false; error: string };

interface ApiRepo {
	name: string;
	html_url: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	updated_at: string;
	fork: boolean;
	archived: boolean;
	private: boolean;
}

const PER_PAGE = 100;
const MAX_PAGES = 50; // 無限ループ防止（最大 5,000 件）

async function fetchAllRepos(user: string): Promise<Repo[]> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': `${user}-research-portfolio`,
	};
	// ビルド時のみ使用。認証するとレート制限が緩和される（出力には含まれない）。
	const token = typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : undefined;
	if (token) headers.Authorization = `Bearer ${token}`;

	const repos: Repo[] = [];
	let url: string | null =
		`https://api.github.com/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&per_page=${PER_PAGE}`;

	for (let page = 0; url && page < MAX_PAGES; page++) {
		const res: Response = await fetch(url, { headers, signal: AbortSignal.timeout(15_000) });
		if (!res.ok) {
			const rateLimited = res.status === 403 || res.status === 429;
			throw new Error(
				rateLimited ? 'GitHub API rate limit exceeded' : `GitHub API responded with ${res.status}`,
			);
		}
		const items = (await res.json()) as ApiRepo[];
		for (const r of items) {
			if (r.private) continue; // 念のため非公開リポジトリは除外
			repos.push({
				name: r.name,
				url: r.html_url,
				description: r.description,
				language: r.language,
				stars: r.stargazers_count,
				updatedAt: r.updated_at,
				fork: r.fork,
				archived: r.archived,
			});
		}
		// Link ヘッダーの rel="next" で全件をページネーション
		const next = res.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/);
		url = next ? next[1] : null;
	}

	return repos.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

let cached: Promise<RepoResult> | undefined;

/** 公開リポジトリを取得する。失敗してもビルドは止めず、エラー結果を返す。 */
export function getPublicRepos(user: string = SITE.github.user): Promise<RepoResult> {
	cached ??= fetchAllRepos(user).then(
		(repos): RepoResult => ({ ok: true, repos, fetchedAt: new Date().toISOString() }),
		(err): RepoResult => ({
			ok: false,
			error: err instanceof Error ? err.message : 'Unknown error',
		}),
	);
	return cached;
}
