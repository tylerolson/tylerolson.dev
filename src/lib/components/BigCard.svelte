<script lang="ts">
	export let title: string;
	export let description: string;
	export let tags: string[];
	export let url: string;
</script>

<div
	class="group relative overflow-hidden border border-cyber-border bg-cyber-bg-secondary p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyber-accent-primary hover:shadow-glow"
>
	<div
		class="absolute top-0 left-0 h-0 w-1 bg-linear-to-b from-cyber-accent-primary to-cyber-accent-secondary transition-all duration-300 group-hover:h-full"
	></div>

	<div class="mb-4 flex items-start justify-between">
		<h3 class="text-2xl font-semibold text-cyber-text-primary">{title}</h3>
		<a
			href={url}
			class="text-2xl text-cyber-accent-secondary transition-all duration-300 hover:scale-110 hover:text-cyber-accent-primary"
		>
			→
		</a>
	</div>

	<p class="mb-6 leading-relaxed text-cyber-text-secondary">
		{description}
	</p>

	<div class="flex flex-wrap gap-2">
		{#each tags as tag}
			<span
				class="border border-cyber-border bg-cyber-bg-tertiary px-3 py-1 font-mono text-xs tracking-wide text-cyber-accent-primary uppercase"
			>
				{tag}
			</span>
		{/each}
	</div>
</div>
