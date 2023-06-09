import { MembersApiResponse } from '../../types';
import { fetchData } from '../utils/fetch';

export async function getElectedRepresentative(constituency: string) {
  const electedRepresentativeJson: MembersApiResponse = await fetchData(`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${constituency}&skip=0&take=20`);
  const electedRepresentativeName =
  electedRepresentativeJson.items[0].value.currentRepresentation.member
    .value.nameFullTitle;
  return electedRepresentativeName;
}