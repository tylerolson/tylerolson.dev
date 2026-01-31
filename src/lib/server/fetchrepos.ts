import { Octokit, type RestEndpointMethodTypes } from '@octokit/rest';
import fs from 'fs/promises';
import { env } from '$env/dynamic/private';
import type { RepoData } from '$lib/types';

type GithubRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][number];

const octokit = new Octokit();
const PATH = env.REPOS_SAVE_PATH === undefined ? 'repos.json' : env.REPOS_SAVE_PATH;

let cachedRepos: RepoData[] | null = null;
let uniqueLanguages: Set<string>;
let totalStars: number;
let totalForks: number;

export async function updateRepoList() {
	console.log('Starting repo update');
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

		await fs.writeFile(PATH, JSON.stringify(repos, null, '\t'), 'utf8');
		cachedRepos = repos;
		uniqueLanguages = new Set(
			repos
				.map((r) => r.language)
				.filter(Boolean)
				.sort((a, b) => a.localeCompare(b))
		);
		uniqueLanguages.delete('');
		totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
		totalForks = repos.reduce((sum, r) => sum + r.forks, 0);

		console.log(`Updated repos at ${new Date().toLocaleString()}`);
	} catch (err) {
		console.error('Error updating repos:', err);
	}
}

export async function getRepoList() {
	if (cachedRepos === null) {
		await updateRepoList();
	}
	return {
		repos: cachedRepos!,
		uniqueLanguages,
		totalStars,
		totalForks
	};
}
