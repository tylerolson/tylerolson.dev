<script lang="ts">
	import type { RepoData } from '$lib/types';
	import { languageColors } from '$lib/types';

	interface Props {
		repo: RepoData;
	}

	let { repo }: Props = $props();
</script>

<div
	class="flex h-full flex-col rounded-lg border border-ctp-surface0 bg-ctp-mantle p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ctp-lavender"
>
	<a
		href={repo.html_url}
		target="_blank"
		rel="noopener noreferrer"
		class="mb-2 inline-block font-mono text-lg text-ctp-blue transition-colors duration-300 hover:text-ctp-green"
	>
		{repo.name}
		{#if repo.archived}
			<span class="rounded bg-ctp-base px-3 py-1 font-mono text-xs tracking-wide text-ctp-lavender">
				Archived
			</span>
		{/if}
	</a>

	<p class="mb-4 grow text-sm text-ctp-text">
		{repo.description || 'No description available'}
	</p>

	<div class="flex gap-6 font-mono text-xs text-ctp-subtext0">
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
