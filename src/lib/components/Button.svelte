<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary';

	interface Props {
		variant: Variant;
		children?: Snippet;
	}

	let { variant, children, ...rest }: Props & HTMLButtonAttributes = $props();

	const styles = {
		primary:
			'bg-ctp-mauve text-ctp-crust border-ctp-mauve hover:bg-ctp-lavender hover:border-ctp-lavender hover:shadow-[0_4px_16px_rgba(203,166,247,0.3)]',
		secondary:
			'bg-transparent text-ctp-subtext1 border-ctp-surface1 hover:bg-ctp-surface0 hover:border-ctp-lavender hover:text-ctp-lavender'
	};
</script>

<button
	{...rest}
	class="inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-4 py-1.5 font-mono font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 {styles[
		variant
	]}"
>
	{@render children?.()}
</button>
