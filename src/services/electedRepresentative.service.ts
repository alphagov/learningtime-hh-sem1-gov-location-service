import { MembersApiResponse } from '../../types';
import { fetchData } from '../utils/fetchData';

export async function getElectedRepresentative(
	constituency: string | undefined
): Promise<{
	electedRepresentativeName: string,
	thumbnailUrl: string
} | void> {
	if (!constituency) {
		throw new Error('Postcode was not valid. Please submit a valid postcode');
	}
	try {
		const electedRepresentativeJson: MembersApiResponse = await fetchData(
			`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${constituency}&skip=0&take=20`
		);
		const electedRepresentativeName =
			electedRepresentativeJson.items[0].value.currentRepresentation.member
				.value.nameFullTitle;
		const thumbnailUrl = electedRepresentativeJson.items[0].value.currentRepresentation.member.value.thumbnailUrl
		return { electedRepresentativeName, thumbnailUrl}
	} catch (error) {
		console.error(`Error: ${error}`);
	}
}