import type { PageServerLoad } from './$types';
import { getRepoList } from '$lib/server/fetchrepos';

export const load: PageServerLoad = async ({ params }) => {
	return {
		repos: await getRepoList()
	};
};
