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

export const languageColors: Record<string, string> = {
	TypeScript: '#3178c6',
	Go: '#00ADD8',
	Java: '#b07219',
	Python: '#3572A5',
	JavaScript: '#f1e05a',
	'C#': '#178600',
	Shell: '#89e051',
	'C++': '#f34b7d',
	Lua: '#000080',
	Kotlin: '#A97BFF',
	Svelte: '#ff3e00',
	NSIS: '#d35400'
};
