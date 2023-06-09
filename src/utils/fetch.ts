export async function fetchData(query: string) {
  const response = await fetch(query);
  const json: any = await response.json(); 
  return json;
}

// json can be returned in various shapes, need to validate response it to be more type-safe