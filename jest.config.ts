import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
	coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
	preset: 'ts-jest',
	testMatch: ['<rootDir>/**/*.test.ts'],
	testEnvironment: 'node',
	verbose: true,
};

export default config;
