<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<span>WIP</span>
<h1 class="text-2xl">Tyler Olson</h1>
<br />
<span>Current live projects:</span>
<div>
	<a href="https://wfm.tylerolson.dev">
		<span class="underline">Warframe Market Efficiency Calculator</span>
	</a>
	<br />
	<a href="https://devquest.tylerolson.dev">
		<span class="underline">DevQuest</span>
	</a>
</div>
<br />

<div class="overflow-x-scroll text-nowrap">
	<table class="border">
		<thead class="border-b">
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Language</th>
				<th>Created At</th>
				<th>Updated At</th>
				<th>Stars</th>
				<th>Forks</th>
				<th>Issues</th>
				<th>Size (kb)</th>
				<th>Archived</th>
			</tr>
		</thead>
		<tbody class="text-left">
			{#each data.repos as repo}
				<tr>
					<td>
						<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
							{repo.name}
						</a>
					</td>
					<td>{repo.description}</td>
					<td>{repo.language}</td>
					<td
						>{repo.created_at.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}</td
					>
					<td
						>{repo.updated_at.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}</td
					>
					<td>{repo.stargazers_count}</td>
					<td>{repo.forks}</td>
					<td>{repo.open_issues_count}</td>
					<td>{repo.size}</td>
					<td>{repo.archived ? 'Yes' : 'No'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	th {
		@apply px-2 py-2;
	}

	td {
		@apply px-2 py-2;
	}

	tr {
		@apply border-b odd:bg-white even:bg-gray-100;
	}
</style>
