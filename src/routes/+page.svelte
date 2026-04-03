<script lang="ts">
	import type { PageProps } from './$types';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import BigCard from '$lib/components/BigCard.svelte';
	import SmallCard from '$lib/components/SmallCard.svelte';

	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { data }: PageProps = $props();

	let selectedFilter = $state('all');

	let filteredRepos = $derived(
		selectedFilter === 'all'
			? data.repos
			: data.repos.filter((repo) => repo.language === selectedFilter)
	);

	function filterRepos(language: string) {
		selectedFilter = selectedFilter === language ? 'all' : language;
	}
</script>

<svelte:head>
	<title>Tyler Olson</title>
</svelte:head>

<div>
	<header class="relative py-16 md:py-24">
		<div class="absolute top-4 right-4 transition-[right,top] md:top-6 md:right-8">
			<ThemeToggle />
		</div>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex fade-in-up flex-wrap items-start justify-between gap-12">
				<div class="min-w-75 flex-1">
					<div class="mb-2 font-mono text-lg text-ctp-green md:text-xl">
						$
						<span class="text-ctp-blue">whoami</span>
						<span class="animate-blink text-ctp-rosewater">&block;</span>
					</div>
					<br />
					<div class="relative inline-block">
						<h1
							class=" font-mono text-5xl leading-none font-extrabold tracking-tight text-ctp-lavender"
						>
							Tyler Olson
						</h1>
					</div>
				</div>
			</div>

			<div
				class="mt-8 flex fade-in-up-1 flex-wrap gap-2 font-mono text-xs transition-all md:text-sm"
			>
				{#snippet pill(label: string, pilldata: any, pillcolor: string)}
					<div class="inline-flex overflow-hidden rounded duration-300 hover:-translate-y-1">
						<span class="bg-ctp-surface0 px-2 py-1.5 text-ctp-subtext1">{label}</span>
						<span class="{pillcolor} px-2 py-1.5 font-semibold text-ctp-crust">
							{pilldata}
						</span>
					</div>
				{/snippet}
				{@render pill('repositories', data.repos.length, 'bg-ctp-flamingo')}
				{@render pill('languages', data.stats.uniqueLanguages.length, 'bg-ctp-blue')}
				{@render pill('stars', data.stats.totalStars, 'bg-ctp-peach')}
				{@render pill('forks', data.stats.totalForks, 'bg-ctp-green')}
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<section class="my-0 fade-in-up-2">
			<SectionHeader title="// About" />

			<p>
				I&apos;m a recent Computer Science &amp; Engineering graduate from the University of Nevada,
				Reno, with experience building backend systems and fullstack apps. I&apos;ve been
				programming since elementary school where I started creating Minecraft mods in Java and fell
				in love with the process of problem solving.
			</p>

			<br />

			<div class="mt-8 flex fade-in-up-1 flex-wrap gap-2 font-mono text-sm md:text-base">
				<a href="/resume" target="_blank" rel="noopener noreferrer">
					<Button variant="primary">View Resume</Button>
				</a>
				<a href="https://github.com/tylerolson" target="_blank" rel="noopener noreferrer">
					<Button variant="secondary">GitHub</Button>
				</a>
				<a
					href="https://www.linkedin.com/in/tylerolson-/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button variant="secondary">LinkedIn</Button>
				</a>
			</div>
		</section>

		<section class="my-20 fade-in-up-3">
			<SectionHeader title="// Deployed Projects" />

			<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
				<BigCard
					title="Warframe Platinum Efficiency Calculator"
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

		<section class="my-20 fade-in-up-4">
			<SectionHeader title="// All Projects" />

			<div class="mb-8 flex flex-wrap gap-4 text-sm">
				{#each data.stats.uniqueLanguages as language}
					<Button
						variant={selectedFilter === language ? 'primary' : 'secondary'}
						onclick={() => filterRepos(language)}
					>
						{language}
					</Button>
				{/each}
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredRepos as repo (repo.name)}
					<div in:fade animate:flip={{ duration: 200 }}>
						<SmallCard {repo} />
					</div>
				{/each}
			</div>
		</section>
	</div>

	<footer
		class="flex w-full fade-in-up-4 flex-wrap justify-center bg-ctp-mantle py-16 text-center font-mono text-sm"
	>
		<span class="text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-lavender">
			cached {data.cacheInfo.age}, refresh in {data.cacheInfo.nextRefresh}
		</span>
	</footer>
</div>
