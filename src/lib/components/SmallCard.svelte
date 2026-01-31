<script lang="ts">
	import type { RepoData } from '$lib/types';
	import { languageColors } from '$lib/types';

	export let repo: RepoData;
</script>

<div
	class="flex h-full flex-col border border-cyber-border bg-cyber-bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyber-accent-secondary"
>
	<a
		href={repo.html_url}
		target="_blank"
		rel="noopener noreferrer"
		class="mb-2 inline-block font-mono text-lg text-cyber-accent-secondary transition-colors duration-300 hover:text-cyber-accent-primary"
	>
		{repo.name}
		{#if repo.archived}
			<span
				class="ml-2 border border-cyber-border bg-cyber-bg-tertiary px-2 py-1 text-[0.7rem] text-cyber-text-tertiary uppercase"
			>
				Archived
			</span>
		{/if}
	</a>

	<p class="mb-4 flex-grow text-sm text-cyber-text-secondary">
		{repo.description || 'No description available'}
	</p>

	<div class="flex gap-6 font-mono text-xs text-cyber-text-tertiary">
		{#if repo.language}
			<span class="flex items-center gap-2">
				<span
					class="h-2.5 w-2.5 rounded-full"
					style="background: {languageColors[repo.language] || '#666'}"
				></span>
				{repo.language}
			</span>
		{/if}
		{#if repo.stargazers_count > 0}
			<span class="flex items-center gap-1">
				★ {repo.stargazers_count}
			</span>
		{/if}
	</div>
</div>
