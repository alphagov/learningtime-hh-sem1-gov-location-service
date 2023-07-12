export async function fetchData(query: string) {
	try {
		const response = await fetch(query);
		const json: unknown = await response.json();
		return json;
	} catch (error: unknown) {
		console.error(`Error: ${error}`);
	}
}

// json can be returned in various shapes, need to validate response for it to be more type-safe
