import {
	describe,
	expect,
	test,
	jest,
	afterEach,
	beforeEach,
} from '@jest/globals';
import { fetchData } from '../../src/utils/fetchData';
import { SpiedFunction } from 'jest-mock';

// Attach spy to global fetch function
const spyFetch = jest.spyOn(global, 'fetch');

// Attach spy to console.error
let consoleErrorMock: SpiedFunction;

describe('fetchData test suite', () => {
	beforeEach(() => {
		consoleErrorMock = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('Should return json given a query', async () => {
		// Mock fetch for this test, should return constituency json
		const mockJson = { foo: 'bar' };

		// Override default fetch behaviour so API call isn't actually made, instead return mockJson object when fetch is called
		spyFetch.mockImplementationOnce(() =>
			Promise.resolve({ json: () => Promise.resolve(mockJson) } as any)
		);

		const query = 'https://example.com/endpoint';
		const json = await fetchData(query);

		expect(json).toEqual(mockJson);

		expect(spyFetch).toHaveBeenCalledTimes(1);
		expect(spyFetch).toHaveBeenLastCalledWith(query);

		expect(consoleErrorMock).toBeCalledTimes(0);
	});

	test('Should log error if invalid query provided', async () => {
		spyFetch.mockRejectedValueOnce(new Error('Bad request!'));

		const invalidURL = 'https://invalid-url/no-endpoint';
		const json = await fetchData(invalidURL);

		expect(json).toBeUndefined();

		expect(spyFetch).toHaveBeenLastCalledWith(invalidURL);
		expect(spyFetch).toHaveBeenCalledTimes(1);

		expect(consoleErrorMock).toHaveBeenCalledTimes(1);
	});
});
