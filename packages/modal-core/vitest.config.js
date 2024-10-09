/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

const config = defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		reporters: [
			'default',
			[
				'jest-slow-test-reporter',
				{ numTests: 8, warnOnSlowerThan: 300, color: true },
			],
		],
		coverage: {
			enabled: true,
			include: ['**/src/**/*.{js,jsx,ts,tsx}'],
			exclude: [
				'**/node_modules/**',
				'**/src/__test__/utils/**',
				'**/src/**/constant.{ts,js}',
				'**/src/**/index.{ts,js}',
				'**/src/**/type.ts',
				'**/src/**/*.d.{ts,js}',
				'**/src/**/*.test.{ts,js,tsx,jsx}',
				'**/src/**/*.test-d.{ts,tsx}',
			],
			thresholds: {
				statements: 80,
				functions: 80,
				lines: 80,
				branches: 80,
			}
		},
		clearMocks: true,
		mockReset: true,
		restoreMocks: true,
		expect: {
			requireAssertions: true,
		},
		bail: 10,
		watch: false,
		typecheck: true,
	},
});

export default config;
