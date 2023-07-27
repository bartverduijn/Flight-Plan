/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const plugin = require('tailwindcss/plugin');

module.exports = {
	mode: 'jit',
	content: ['./app/**/*.{ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('aria-disabled', '&[aria-disabled="true"]');
		}),
	],
};
