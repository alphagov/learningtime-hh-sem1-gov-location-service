import { PostcodesApiResponse } from '../../types';
import { fetchData } from '../utils/fetchData';

export async function getConstituency(postcode: string) {
	const baseURL = 'https://api.postcodes.io/postcodes/';
	const PostcodeEndpoint = `${baseURL}${postcode}`;
	try {
		const postcodesJson: PostcodesApiResponse = await fetchData(
			PostcodeEndpoint
		);
		const constituency = postcodesJson.result.parliamentary_constituency;
		return constituency;
	} catch (error) {
		console.error(`Error: ${error}`);
		return 'No constituency returned';
	}
}
