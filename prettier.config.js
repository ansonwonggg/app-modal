/** @type {import("prettier").Config} */
const config = {
	trailingComma: 'es5',
	useTabs: true,
	tabWidth: 4,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	bracketSameLine: false,
	arrowParens: 'avoid',
	parser: 'babel-ts',
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['^(^react$|@react|react)', '<THIRD_PARTY_MODULES>'],
	importOrderSeparation: true,
};

export default config;
