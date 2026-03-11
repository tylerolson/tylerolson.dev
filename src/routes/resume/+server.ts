export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/Tyler_Olson_Resume.pdf'
		}
	});
}
