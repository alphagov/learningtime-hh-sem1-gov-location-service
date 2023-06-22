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
import { getConstituency } from '../../src/services/constituency.service';
import { mockConstituencyJson } from '../mocks/constituencyJson';

const spyFetchData = jest.spyOn(fetchDataModule, 'fetchData');
let consoleErrorMock: SpiedFunction;

describe('getConstituency test suite', () => {
	beforeEach(() => {
		consoleErrorMock = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('Should return constituency for valid postcodes.io fetch call', async () => {
		// Mock fetchData for this test, should return constituency json
		spyFetchData.mockResolvedValueOnce(mockConstituencyJson);

		const validPostcode = 'NP22 5JS';
		const response = await getConstituency(validPostcode);
		const constituency = mockConstituencyJson.result.parliamentary_constituency;

		expect(response).toBe(constituency);
		expect(spyFetchData).toHaveBeenCalledTimes(1);

		expect(consoleErrorMock).toBeCalledTimes(0);
	});

	test('Should error if invalid postcode provided', async () => {
		spyFetchData.mockRejectedValueOnce(new Error('Bad postcode!'));

		const badPostcode = 'ZYXB 453';
		const response = await getConstituency(badPostcode);

		expect(response).toBeUndefined();
		expect(spyFetchData).toHaveBeenCalledTimes(1);

		expect(consoleErrorMock).toBeCalledTimes(1);
	});
});
