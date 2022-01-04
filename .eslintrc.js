module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		commonjs: true,
	},
	extends: [
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'import'],
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: 'res|next|^err',
			},
		],
		'react/jsx-filename-extension': 'off',
		'react/jsx-indent': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'import/extensions': 'off',
	},
};
