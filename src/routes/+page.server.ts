import type { PageServerLoad } from './$types';
import { getRepoList } from '$lib/server/fetchrepos';

export const load: PageServerLoad = async () => {
	return await getRepoList();
};
