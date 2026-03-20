<script lang="ts">
	export let title: string;
	export let description: string;
	export let tags: string[];
	export let url: string;
</script>

<div
	class="relative overflow-hidden rounded-xl border border-ctp-surface0 bg-ctp-mantle p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ctp-lavender"
>
	<div class="mb-4 flex items-start justify-between">
		<h3 class="text-2xl font-semibold text-ctp-subtext0">{title}</h3>
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			class="text-2xl text-ctp-subtext0 transition-all duration-300 hover:scale-110 hover:text-ctp-lavender"
			aria-label="Visit {title}"
		>
			→
		</a>
	</div>

	<p class="mb-6 leading-relaxed text-ctp-text">
		{description}
	</p>

	<div class="flex flex-wrap gap-2">
		{#each tags as tag}
			<span class="rounded bg-ctp-base px-3 py-1 font-mono text-xs tracking-wide text-ctp-lavender">
				{tag}
			</span>
		{/each}
	</div>
</div>
