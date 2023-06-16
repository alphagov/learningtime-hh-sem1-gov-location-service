export async function fetchData(query: string) {
	try {
		const response = await fetch(query);
		const json: any = await response.json();
		return json;
	} catch (error: any) {
		console.error(`Error: ${error}`);
	}
}

// json can be returned in various shapes, need to validate response for it to be more type-safe
