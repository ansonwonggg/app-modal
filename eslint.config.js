import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHookPlugin from 'eslint-plugin-react-hooks';
import tseslintParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	{
		ignores: [
			'**/*.config.js',
			'**/*.config.cjs',
			'src/**/*.test.ts',
			'src/**/*.test.tsx',
			'src/__test__/**/*',
			'**/*.d.ts',
			'dist',
			'node_modules',
			'.husky',
			'public',
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	// JS Eslint
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: 'error',
		},
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			parser: tseslintParser, // this parser help to parse typescript code to javascript for eslint evaluation.
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			'react-refresh': reactRefreshPlugin,
			'react-hooks': reactHookPlugin,
		},
		rules: {
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'array-callback-return': [
				'error',
				{ checkForEach: false, allowVoid: true },
			],
			// Possible Problems
			'no-await-in-loop': 'error',
			'no-constant-binary-expression': 'error',
			'no-duplicate-imports': 'error',
			'no-promise-executor-return': 'warn',
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'warn',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-use-before-define': 'error',
			'require-atomic-updates': 'error',
			// Suggestions
			'block-scoped-var': 'error',
			camelcase: [
				'error',
				{
					properties: 'always',
					ignoreImports: true,
					ignoreGlobals: true,
				},
			],
			complexity: ['error', 15],
			'consistent-return': [
				'error',
				{ treatUndefinedAsUnspecified: true },
			],
			curly: ['error', 'multi-line'],
			'default-case': 'error',
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-notation': 'off',
			eqeqeq: ['error', 'always'],
			'func-name-matching': 'warn',
			'func-names': 'warn',
			'func-style': [
				'warn',
				'declaration',
				{ allowArrowFunctions: true },
			],
			'guard-for-in': 'warn',
			'id-denylist': ['error', 'callback'],
			'id-length': ['warn', { min: 2, max: 20, exceptions: ['e'] }], // force variable name to be at least 2 char.
			// 'id-match': ["error", "^[a-z]+([A-Z][a-z]+)*$"], // force variable name to be camelcase. But it will accidentally check React Type.
			'init-declarations': ['error', 'always'],
			'max-depth': ['error', 4],
			'max-lines': [
				'error',
				{ max: 350, skipBlankLines: true, skipComments: true },
			],
			'max-lines-per-function': [
				'error',
				{
					max: 200,
					skipBlankLines: true,
					skipComments: true,
					IIFEs: true,
				},
			], // for react, function component is often used. 200 lines per component is make sense under single responsiblilty rules.
			'max-nested-callbacks': ['error', 3],
			'max-params': ['error', 5],
			'multiline-comment-style': ['warn', 'starred-block'],
			'new-cap': ['error'],
			'no-alert': 'warn',
			'no-array-constructor': 'error',
			'no-caller': 'error',
			'no-console': 'error', // in frontend, console should be disallowed. console.warn and error is not allowed as well which should have enough error handling.
			'no-else-return': 'error', // to reduce else statement
			'no-empty-function': 'error',
			'no-eq-null': 'error',
			'no-eval': 'error',
			'no-extra-boolean-cast': [
				'error',
				{ enforceForLogicalOperands: true },
			],
			'no-global-assign': 'error',
			'no-implicit-coercion': [
				'error',
				{ disallowTemplateShorthand: true, allow: ['!!', '+'] },
			],
			'no-implied-eval': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			'no-magic-numbers': ['warn', { ignore: [0, 1] }],
			'no-multi-assign': 'error',
			'no-negated-condition': 'error',
			'no-nested-ternary': 'error',
			'no-new-func': 'error',
			'no-new-wrappers': 'error',
			'no-object-constructor': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': 'error',
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
			'no-proto': 'error',
			'no-return-assign': ['error', 'always'],
			'no-script-url': 'error',
			'no-sequences': 'error',
			'no-shadow': [
				'error',
				{
					builtinGlobals: true,
					hoist: 'all',
					ignoreOnInitialization: true,
				},
			],
			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			'no-undefined': 'error',
			'no-underscore-dangle': 'warn',
			'no-unneeded-ternary': 'error',
			'no-unused-expressions': [
				'error',
				{
					allowTernary: true,
					allowTaggedTemplates: true,
					enforceForJSX: true,
				},
			],
			'no-useless-call': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'object-shorthand': 'warn',
			'operator-assignment': 'warn',
			'prefer-const': 'error',
			'prefer-destructuring': 'warn',
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': [
				'error',
				{ allowEmptyReject: true },
			],
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			radix: ['error', 'as-needed'],
			'require-await': 'error',
			'require-unicode-regexp': 'error',
			'sort-keys': [
				'warn',
				'asc',
				{ natural: true, allowLineSeparatedGroups: true },
			],
			'sort-vars': 'warn',
			yoda: ['error', 'never'],
		},
	},
	// React Eslint
	{
		...reactRecommended,
		settings: {
			react: {
				version: 'detect',
			},
		},
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		ignores: [
			'**/*.config.js',
			'src/**/*.test.ts',
			'src/**/*.test.tsx',
			'**/*.d.ts',
			'dist',
			'node_modules',
			'.husky',
			'public',
		],
		rules: {
			...reactRecommended.rules,
			'react/button-has-type': 'error',
			'react/checked-requires-onchange-or-readonly': 'error',
			'react/function-component-definition': [
				'error',
				{ namedComponents: 'arrow-function' },
			],
			'react/hook-use-state': 'warn',
			'react/iframe-missing-sandbox': 'error',
			'react/jsx-boolean-value': [
				'error',
				'never',
				{ assumeUndefinedIsFalse: true },
			],
			'react/jsx-child-element-spacing': 'error',
			'react/jsx-curly-brace-presence': ['error', 'never'],
			'react/jsx-curly-newline': [
				'error',
				{ multiline: 'require', singleline: 'forbid' },
			],
			'react/jsx-curly-spacing': ['error', { when: 'always' }],
			'react/jsx-equals-spacing': ['error', 'always'],
			'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
			'react/jsx-first-prop-new-line': ['error', 'multiline'],
			'react/jsx-fragments': ['error', 'syntax'],
			'react/jsx-handler-names': 'warn',
			'react/jsx-indent-props': ['error', 'tab'],
			'react/jsx-indent': ['error', 'tab'],
			'react/jsx-key': [
				'error',
				{
					checkFragmentShorthand: true,
					checkKeyMustBeforeSpread: true,
					warnOnDuplicates: true,
				},
			],
			'react/jsx-max-depth': ['warn', { max: 7 }],
			'react/jsx-newline': [
				'error',
				{ prevent: false, allowMultilines: true },
			],
			'react/jsx-no-constructed-context-values': 'error',
			'react/jsx-no-leaked-render': 'error',
			'react/jsx-no-undef': 'error',
			'react/jsx-no-useless-fragment': 'error',
			'react/jsx-one-expression-per-line': 'error',
			'react/jsx-pascal-case': 'error',
			'react/jsx-props-no-multi-spaces': 'error',
			'react/jsx-sort-props': 'warn',
			'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
			'react/jsx-uses-react': 'off',
			'react/jsx-wrap-multilines': [
				'error',
				{
					declaration: 'parens-new-line',
					assignment: 'parens-new-line',
					return: 'parens-new-line',
					arrow: 'parens-new-line',
					condition: 'parens-new-line',
					logical: 'parens-new-line',
					prop: 'parens-new-line',
				},
			],
			'react/no-access-state-in-setstate': 'error',
			'react/no-array-index-key': 'error',
			'react/no-invalid-html-attribute': 'error',
			'react/no-namespace': 'error',
			'react/no-this-in-sfc': 'error',
			'react/no-unstable-nested-components': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': 'error',
			'react/style-prop-object': 'error',
			'react/void-dom-elements-no-children': 'error',
		},
	},
	// JSX A11y Eslint
	{
		plugins: {
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...jsxA11y.configs.recommended.rules,
			'jsx-a11y/prefer-tag-over-role': 'error',
		},
	},
	eslintPluginPrettierRecommended,
];
