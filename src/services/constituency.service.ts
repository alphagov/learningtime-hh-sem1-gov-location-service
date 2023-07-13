import { PostcodesApiResponse } from '../../types';
import { fetchData } from '../utils/fetchData';

export async function getConstituency(postcode: string) {
	const baseURL = 'https://api.postcodes.io/postcodes/';
	const PostcodeEndpoint = `${baseURL}${postcode}`;
	try {
		const postcodesJson = await fetchData(
			PostcodeEndpoint
		) as PostcodesApiResponse;
		const constituency = postcodesJson.result.parliamentary_constituency;
		return constituency;
	} catch (error: any) {
		if (error.response && error.response.status === 404) {
			console.error(`Error: ${error}`);
			throw new Error('Postcode was not valid');
		} else {
			console.error(`Error: ${error}`);
		}
	}
}
