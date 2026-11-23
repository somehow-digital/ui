import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import Heading from './heading.vue';

const meta = {
	title: 'Common/Heading',
	component: Heading,
	argTypes: {
		level: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6],
		},
		size: {
			control: 'select',
			options: [undefined, 1, 2, 3, 4, 5, 6],
		},
		default: { control: 'text' },
	},
	args: { default: 'Heading' },
	render: args => ({
		components: { Heading },
		setup: () => ({ args }),
		template: '<Heading v-bind="args">{{ args.default }}</Heading>',
	}),
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultHeading: Story = {
	play: async ({ canvasElement }) => {
		await expect(within(canvasElement).getByRole('heading', { level: 1, name: 'Heading' })).toBeVisible();
	},
};

export const SizedHeading: Story = {
	args: { level: 2, size: 5 },
	play: async ({ canvasElement }) => {
		await expect(within(canvasElement).getByRole('heading', { level: 2 })).toBeVisible();
	},
};
