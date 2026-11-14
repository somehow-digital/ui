import type { Preview } from '@storybook/vue3-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import '@fontsource-variable/gabarito';
import 'virtual:uno.css';
import './preview.css';

const preview: Preview = {
	tags: ['autodocs'],
	parameters: {
		docs: {
			codePanel: true,
		},
		backgrounds: {
			disable: true,
		},
		layout: 'centered',
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
	],
};

export default preview;
