import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import { slide } from '../../../.storybook/fixtures.ts';
import Image from './image.vue';

const meta = {
	title: 'Media/Image',
	component: Image,
	args: {
		...slide('Lettermint for Craft CMS', '#2f6f4f'),
		width: 1280,
		height: 800,
	},
	decorators: [() => ({ template: '<div style="width: min(40rem, 90vw)"><story /></div>' })],
} satisfies Meta<typeof Image>;

export default meta;

export const DefaultImage: StoryObj<typeof meta> = {
	play: async ({ canvasElement }) => {
		await expect(within(canvasElement).getByRole('img', { name: 'Lettermint for Craft CMS' })).toHaveAttribute('loading', 'lazy');
	},
};

export const SquareImage: StoryObj<typeof meta> = {
	args: { rounded: false },
};
