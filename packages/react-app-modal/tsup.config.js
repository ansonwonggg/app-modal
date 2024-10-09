import { defineConfig } from 'tsup';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

export default defineConfig({
	entry: [
		'src/**/*.ts',
		'src/**/*.js',
		'src/**/*.tsx',
		'src/**/*.jsx',
		'!src/__test__/**',
		'!src/**/*.test.*',
	],
	format: ['cjs', 'esm'],
	outDir: 'dist',
	dts: true,
	clean: true,
	esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
});
