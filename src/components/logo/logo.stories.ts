import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, waitFor, within } from 'storybook/test';
import Logo from './logo.vue';

const meta = {
	title: 'Brand/Logo',
	component: Logo,
	args: { animated: false },
	render: args => ({
		components: { Logo },
		setup: () => ({ args }),
		template: '<Logo v-bind="args" style="font-size: 2.5rem" />',
	}),
} satisfies Meta<typeof Logo>;

export default meta;

export const DefaultLogo: StoryObj<typeof meta> = {};

export const AnimatedLogo: StoryObj<typeof meta> = {
	args: { animated: true },
	play: async ({ canvasElement }) => {
		// Only motion sets this inline style; the error fallback just drops the class.
		await waitFor(() => expect(within(canvasElement).getByRole('img', { name: 'somehow.digital' }).style.visibility).toBe('visible'));
	},
};
