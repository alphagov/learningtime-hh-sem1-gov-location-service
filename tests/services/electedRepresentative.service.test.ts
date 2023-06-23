import {
	describe,
	expect,
	test,
	jest,
	afterEach,
	beforeEach,
} from '@jest/globals';
import * as fetchDataModule from '../../src/utils/fetchData';
import { SpiedFunction } from 'jest-mock';
import { getElectedRepresentative } from '../../src/services/electedRepresentative.service';
import { mockElectedRepJson } from '../mocks/electedRepJson';

const spyFetchData = jest.spyOn(fetchDataModule, 'fetchData');
let consoleErrorMock: SpiedFunction;

describe('getElectedRepresentative test suite', () => {
	beforeEach(() => {
		consoleErrorMock = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('Should return MP full name and title for valid members-api fetch call', async () => {
		// Mock fetchData for this test, should return electedRep json
		spyFetchData.mockResolvedValueOnce(mockElectedRepJson);

		const validConstituency = 'Lambeth';
		const response = await getElectedRepresentative(validConstituency);
		const electedRepresentativeName =
			mockElectedRepJson.items[0].value.currentRepresentation.member.value
				.nameFullTitle;

		expect(response).toBe(electedRepresentativeName);

		expect(spyFetchData).toHaveBeenCalledTimes(1);

		expect(consoleErrorMock).toBeCalledTimes(0);
	});

	test('Should error if invalid constituency provided', async () => {
		spyFetchData.mockRejectedValueOnce(new Error('Bad constituency!'));

		const invalidConstituency = 'France';
		const response = await getElectedRepresentative(invalidConstituency);

		expect(response).toBeUndefined();

		expect(spyFetchData).toHaveBeenCalledTimes(1);

		expect(consoleErrorMock).toBeCalledTimes(1);
	});
});
