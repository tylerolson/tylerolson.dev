<script lang="ts">
	import { onMount } from 'svelte';

	let isLight = $state(false);

	onMount(() => {
		isLight = document.documentElement.classList.contains('latte');
	});

	function toggle() {
		const html = document.documentElement;
		html.classList.add('theme-transition');
		isLight = html.classList.toggle('latte');
		html.classList.toggle('mocha');
		localStorage.setItem('theme', isLight ? 'light' : 'dark');
		setTimeout(() => html.classList.remove('theme-transition'), 200);
	}
</script>

<button
	onclick={toggle}
	class="rounded-lg p-2 text-ctp-subtext0 transition-all duration-200 hover:bg-ctp-surface0"
	aria-label="Toggle theme"
>
	{#if isLight}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" />
			<path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" />
			<path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" />
			<path d="M20 12h2" />
			<path d="m6.34 17.66-1.41 1.41" />
			<path d="m19.07 4.93-1.41 1.41" />
		</svg>
	{/if}
</button>
