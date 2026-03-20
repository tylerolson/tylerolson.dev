<script lang="ts">
	interface Props {
		title: string;
	}
	let { title }: Props = $props();
</script>

<div>
	<h2 class="relative mb-4 font-mono font-bold text-ctp-subtext0">
		{title}
	</h2>
</div>
