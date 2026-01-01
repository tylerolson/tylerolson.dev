import { updateRepoList } from '$lib/server/fetchrepos';

const TWELVE_HOURS = 12 * 60 * 60 * 1000;

void updateRepoList();
const intervalId = setInterval(async () => {
	void updateRepoList();
}, TWELVE_HOURS);

function cleanup() {
	clearInterval(intervalId);
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
