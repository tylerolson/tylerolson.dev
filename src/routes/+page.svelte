<script lang="ts">
	import type { PageProps } from './$types';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import BigCard from '$lib/components/BigCard.svelte';
	import SmallCard from '$lib/components/SmallCard.svelte';
	import type { RepoData } from '$lib/types';

	let { data }: PageProps = $props();

	let selectedFilter = $state('all');
	let filteredRepos: RepoData[] = $state(data.repos);

	function filterRepos(language: string) {
		if (selectedFilter == language) {
			selectedFilter = 'all';
		} else {
			selectedFilter = language;
		}

		if (selectedFilter === 'all') {
			filteredRepos = data.repos;
		} else {
			filteredRepos = data.repos.filter((repo) => repo.language === language);
		}
	}
</script>

<svelte:head>
	<title>Tyler Olson</title>
</svelte:head>

<div class="relative z-10">
	<header class="relative py-16 md:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex fade-in-up flex-wrap items-start justify-between gap-12">
				<div class="min-w-75 flex-1">
					<div class="mb-2 animate-blink font-mono text-lg text-cyber-accent-primary md:text-xl">
						$ whoami
					</div>
					<div class="relative inline-block">
						<h1
							class="animate-text-glow text-gradient font-mono text-5xl leading-none font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
						>
							Tyler Olson
						</h1>
					</div>
					<p class="mt-4 text-xl font-light text-cyber-text-secondary md:text-2xl">
						Graduate from University of Nevada, Reno
					</p>
				</div>
			</div>

			<div class="mt-12 grid fade-in-up-1 grid-cols-2 gap-6 md:grid-cols-4">
				<div
					class="group relative overflow-hidden border border-l-[3px] border-cyber-border border-l-cyber-accent-primary bg-cyber-bg-secondary p-6 transition-all duration-300 hover:translate-x-1 hover:border-l-cyber-accent-secondary hover:shadow-glow"
				>
					<div
						class="absolute inset-0 bg-linear-to-br from-transparent to-cyber-accent-primary/5"
					></div>
					<span
						class="relative z-10 block font-mono text-3xl font-bold text-cyber-accent-primary md:text-4xl"
						>{data.repos.length}</span
					>
					<span
						class="relative z-10 text-xs tracking-wider text-cyber-text-tertiary uppercase md:text-sm"
						>Repositories</span
					>
				</div>

				<div
					class="group relative overflow-hidden border border-l-[3px] border-cyber-border border-l-cyber-accent-primary bg-cyber-bg-secondary p-6 transition-all duration-300 hover:translate-x-1 hover:border-l-cyber-accent-secondary hover:shadow-glow"
				>
					<div
						class="absolute inset-0 bg-linear-to-br from-transparent to-cyber-accent-primary/5"
					></div>
					<span
						class="relative z-10 block font-mono text-3xl font-bold text-cyber-accent-primary md:text-4xl"
						>{data.uniqueLanguages.size}</span
					>
					<span
						class="relative z-10 text-xs tracking-wider text-cyber-text-tertiary uppercase md:text-sm"
						>Languages</span
					>
				</div>

				<div
					class="group relative overflow-hidden border border-l-[3px] border-cyber-border border-l-cyber-accent-primary bg-cyber-bg-secondary p-6 transition-all duration-300 hover:translate-x-1 hover:border-l-cyber-accent-secondary hover:shadow-glow"
				>
					<div
						class="absolute inset-0 bg-linear-to-br from-transparent to-cyber-accent-primary/5"
					></div>
					<span
						class="relative z-10 block font-mono text-3xl font-bold text-cyber-accent-primary md:text-4xl"
						>{data.totalStars}</span
					>
					<span
						class="relative z-10 text-xs tracking-wider text-cyber-text-tertiary uppercase md:text-sm"
						>Stars</span
					>
				</div>

				<div
					class="group relative overflow-hidden border border-l-[3px] border-cyber-border border-l-cyber-accent-primary bg-cyber-bg-secondary p-6 transition-all duration-300 hover:translate-x-1 hover:border-l-cyber-accent-secondary hover:shadow-glow"
				>
					<div
						class="absolute inset-0 bg-linear-to-br from-transparent to-cyber-accent-primary/5"
					></div>
					<span
						class="relative z-10 block font-mono text-3xl font-bold text-cyber-accent-primary md:text-4xl"
						>{data.totalForks}</span
					>
					<span
						class="relative z-10 text-xs tracking-wider text-cyber-text-tertiary uppercase md:text-sm"
						>Forks</span
					>
				</div>
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<section class="my-20 fade-in-up-2">
			<SectionHeader title="// Deployed Projects" />

			<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
				<BigCard
					title="Warframe Planium Efficiency Caluclator"
					description="Calculate the most profitable use of standing in Warframe based on real-time market data. Helps players optimize their resource conversion for maximum platinum value."
					tags={['Go', 'Svelte', 'API']}
					url="https://wfm.tylerolson.dev/"
				/>
				<BigCard
					title="DevQuest"
					description="An interactive platform for developers to track their learning journey and achievements. Gamifies the programming learning experience."
					tags={['Go', 'Nuxt', 'Postgres']}
					url="https://devquest.tylerolson.dev/"
				/>
			</div>
		</section>

		<section class="my-20 fade-in-up-3">
			<SectionHeader title="// All Projects" />

			<div class="mb-8 flex flex-wrap gap-4">
				{#each data.uniqueLanguages as language}
					<button
						onclick={() => filterRepos(language)}
						class="cursor-pointer border border-cyber-border bg-cyber-bg-secondary px-4 py-2 font-mono text-sm tracking-wide text-cyber-text-secondary uppercase transition-all duration-300 hover:border-cyber-accent-primary hover:text-cyber-accent-primary"
						class:bg-cyber-accent-primary={selectedFilter === language}
						class:text-cyber-bg-primary={selectedFilter === language}
						class:border-cyber-accent-primary={selectedFilter === language}
						class:shadow-glow={selectedFilter === language}
					>
						{language}
					</button>
				{/each}
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredRepos as repo (repo.name)}
					<SmallCard {repo} />
				{/each}
			</div>
		</section>

		<footer
			class="mt-24 fade-in-up-4 border-t border-cyber-border py-12 text-center font-mono text-sm text-cyber-text-tertiary"
		>
			<div class="mb-6 flex flex-wrap justify-center gap-8">
				<a
					href="https://github.com/yourusername"
					target="_blank"
					rel="noopener noreferrer"
					class="text-cyber-text-secondary transition-colors duration-300 hover:text-cyber-accent-primary"
				>
					GitHub
				</a>
				<a
					href="https://www.linkedin.com/in/tylerolson-/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-cyber-text-secondary transition-colors duration-300 hover:text-cyber-accent-primary"
				>
					LinkedIn
				</a>
			</div>
		</footer>
	</div>
</div>
