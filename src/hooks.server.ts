import { updateRepoList } from '$lib/server/fetchrepos';
import type { Handle } from '@sveltejs/kit';

const TWELVE_HOURS = 12 * 60 * 60 * 1000;

await updateRepoList();
const intervalId = setInterval(async () => {
	updateRepoList();
}, TWELVE_HOURS);

function cleanup() {
	clearInterval(intervalId);
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => {
			return type === 'font' || type === 'js' || type === 'css';
		}
	});
	return response;
};
