import { Octokit, type RestEndpointMethodTypes } from '@octokit/rest';
import fs from 'fs/promises';
import { env } from '$env/dynamic/private';

type GithubRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][number];

const octokit = new Octokit();
const PATH = env.REPOS_SAVE_PATH === undefined ? 'repos.json' : env.REPOS_SAVE_PATH;

let cachedRepos: RepoData[] | null = null;

export type RepoData = {
	name: string;
	private: boolean;
	html_url: string;
	description: string;
	fork: boolean;
	archived: boolean;
	created_at: Date;
	updated_at: Date;
	size: number;
	stargazers_count: number;
	language: string;
	forks: number;
	open_issues_count: number;
};

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
		console.log(`Updated repos at ${new Date().toLocaleString()}`);
	} catch (err) {
		console.error('Error updating repos:', err);
	}
}

export async function getRepoList(): Promise<RepoData[]> {
	if (cachedRepos !== null) {
		return cachedRepos;
	}

	try {
		const data = await fs.readFile(PATH, 'utf8');
		cachedRepos = JSON.parse(data) as RepoData[];
		return cachedRepos;
	} catch (e) {
		return [];
	}
}
