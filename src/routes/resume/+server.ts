import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function GET() {
	const file = await readFile(resolve('static/Tyler_Olson_Resume.pdf'));

	return new Response(file, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Tyler_Olson_Resume.pdf"'
		}
	});
}
