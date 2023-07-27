module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		commonjs: true,
	},
	extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
	rules: {
		'no-nested-ternary': ['off'],
		'no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: 'res|next|^err',
			},
		],
		'import/prefer-default-export': ['off'],
		'import/extensions': ['off'],
		'react/require-default-props': ['off'],
		'react/prop-types': ['off'],
		'react/jsx-props-no-spreading': ['off'],
		'react/react-in-jsx-scope': ['off'],
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				labelComponents: [],
				controlComponents: ['TextField'],
			},
		],
	},
};
