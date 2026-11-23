import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { slide } from '../../../.storybook/fixtures.ts';
import Image from '../image/image.vue';
import Gallery from './gallery.vue';

const slides = [
	slide('Lettermint for Craft CMS', '#2f6f4f'),
	slide('Settings', '#3b5b8c'),
	slide('Utility', '#8c3b5b'),
];

const meta = {
	title: 'Media/Gallery',
	component: Gallery,
	decorators: [
		() => ({ template: '<div style="width: min(40rem, 90vw)"><story /></div>' }),
	],
	render: args => ({
		components: { Gallery, Image },
		setup: () => ({ args, slides }),
		template: '<Gallery v-bind="args"><Image v-for="slide in slides" :key="slide.src" v-bind="slide" :width="1280" :height="800" /></Gallery>',
	}),
} satisfies Meta<typeof Gallery>;

export default meta;

export const DefaultGallery: StoryObj<typeof meta> = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const second = await canvas.findByRole('button', { name: 'Show Settings' });
		await expect(canvas.getByRole('button', { name: 'Show Lettermint for Craft CMS' })).toHaveAttribute('aria-current', 'true');
		await userEvent.click(second);
		await waitFor(() => expect(second).toHaveAttribute('aria-current', 'true'));
	},
};
