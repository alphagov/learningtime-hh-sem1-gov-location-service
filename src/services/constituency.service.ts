import { PostcodesApiResponse } from '../../types';
import { fetchData } from '../utils/fetch';

export async function getConstituency(postcode: string) {
  const postcodesJson: PostcodesApiResponse = await fetchData(`https://api.postcodes.io/postcodes/${postcode}`);
  const constituency = postcodesJson.result.parliamentary_constituency;
  return constituency;
}