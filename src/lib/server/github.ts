import { Octokit, type RestEndpointMethodTypes } from '@octokit/rest';
import type { RepoData } from '$lib/types';

type GithubRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][number];

const octokit = new Octokit();

interface CacheEntry<T> {
	data: T;
	fetchedAt: number;
}

export interface RepoStats {
	uniqueLanguages: Set<string>;
	totalStars: number;
	totalForks: number;
}

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours in ms

let reposCache: CacheEntry<{ repos: RepoData[]; stats: RepoStats }> | null = null;

function computeStats(repos: RepoData[]): RepoStats {
	const uniqueLanguages = new Set(
		repos
			.map((r) => r.language)
			.filter(Boolean)
			.sort((a, b) => a.localeCompare(b))
	);
	uniqueLanguages.delete('');
	return {
		uniqueLanguages: uniqueLanguages,
		totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
		totalForks: repos.reduce((sum, r) => sum + r.forks, 0)
	};
}

export async function fetchAllRepos(): Promise<RepoData[]> {
	let repoData: RepoData[] = [];

	console.log('[cache] Starting repo update');
	try {
		const { data } = await octokit.repos.listForUser({
			username: 'TylerOlson',
			type: 'owner',
			per_page: 100
		});

		const repos: RepoData[] = data.map((repo: GithubRepo) => ({
			name: repo.name,
			private: repo.private,
			html_url: repo.html_url,
			description: repo.description ?? '',
			fork: repo.fork,
			archived: repo.archived ?? false,
			created_at: new Date(repo.created_at!),
			updated_at: new Date(repo.updated_at!),
			size: repo.size ?? 0,
			stargazers_count: repo.stargazers_count ?? 0,
			language: repo.language ?? '',
			forks: repo.forks ?? 0,
			open_issues_count: repo.open_issues_count ?? 0
		}));

		repoData = repos;

		console.log(`[cache] Updated repos at ${new Date().toLocaleString()}`);
	} catch (err) {
		console.error('[cache] Error updating repos:', err);
	}

	return repoData;
}

export async function getRepos(): Promise<{
	repos: RepoData[];
	stats: RepoStats;
	cachedAt: number;
}> {
	const now = Date.now();

	// If the cache is expired or does not yet exist, fetch new data and update the cache
	if (!reposCache || now - reposCache.fetchedAt > CACHE_TTL) {
		console.log('[cache] Fetching repos from GitHub API...');
		const repos = await fetchAllRepos();
		const stats = computeStats(repos);
		reposCache = { data: { repos, stats }, fetchedAt: now };
	} else {
		const ageMin = Math.floor((now - reposCache.fetchedAt) / 60000);
		console.log(`[cache] Serving repos from cache (${ageMin}m old)`);
	}

	return { ...reposCache.data, cachedAt: reposCache.fetchedAt };
}

export function getCacheAge(fetchedAt: number): string {
	const diffMs = Date.now() - fetchedAt;
	const diffMin = Math.floor(diffMs / 60000);

	if (diffMin < 1) return 'just now';
	if (diffMin < 60) return `${diffMin}m ago`;

	const diffHr = Math.floor(diffMin / 60);
	return `${diffHr}h ${diffMin % 60}m ago`;
}

export function getNextRefresh(fetchedAt: number): string {
	const nextMs = fetchedAt + CACHE_TTL;
	const diffMs = nextMs - Date.now();
	if (diffMs <= 0) return 'now';
	const diffMin = Math.floor(diffMs / 60000);
	if (diffMin < 60) return `${diffMin}m`;
	const diffHr = Math.floor(diffMin / 60);
	return `${diffHr}h ${diffMin % 60}m`;
}
