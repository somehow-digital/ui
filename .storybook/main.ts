import type { StorybookConfig } from '@storybook/vue3-vite';
import type { InlineConfig } from 'vite';
import { mergeConfig } from 'vite';
import tools from 'vite-plugin-vue-devtools';

const config: StorybookConfig = {
	framework: '@storybook/vue3-vite',
	stories: ['../src/**/*.stories.ts'],
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-themes',
		'@storybook/addon-vitest',
	],
	core: {
		disableTelemetry: true,
	},
	async viteFinal(config: InlineConfig) {
		return mergeConfig(config, {
			plugins: [tools()],
		});
	},
};

export default config;
