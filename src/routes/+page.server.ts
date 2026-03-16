import type { PageServerLoad } from './$types';
import { getRepos, getCacheAge, getNextRefresh, type RepoStats } from '$lib/server/github';
import type { RepoData } from '$lib/types';

export const load: PageServerLoad = async () => {
	const { repos, stats, cachedAt }: { repos: RepoData[]; stats: RepoStats; cachedAt: number } =
		await getRepos();

	return {
		repos,
		stats: {
			uniqueLanguages: [...stats.uniqueLanguages].sort(),
			totalStars: stats.totalStars,
			totalForks: stats.totalForks
		},
		cacheInfo: {
			cachedAt,
			age: getCacheAge(cachedAt),
			nextRefresh: getNextRefresh(cachedAt)
		}
	};
};
