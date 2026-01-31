<script lang="ts">
	let { children } = $props();

	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-grid"></div>
<div class="scanline"></div>
{@render children()}
