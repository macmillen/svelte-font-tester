export const handleFetch = async ({ request }) => {
	request.headers.append("Access-Control-Allow-Origin", `*`);
	return fetch(request);
};
