export interface PostcodesApiResponse {
	result: {
		parliamentary_constituency: string;
	};
}

export interface MembersApiResponse {
	items: {
		value: {
			currentRepresentation: {
				member: {
					value: {
						nameFullTitle: string;
						thumbnailUrl: string
					};
				};
			};
		};
	}[];
}
