import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import Badge from './badge.vue';

const meta = {
	title: 'Common/Badge',
	component: Badge,
	argTypes: { variant: { control: 'select', options: ['neutral', 'accent'] } },
	args: { default: 'Pro' },
	render: args => ({
		components: { Badge },
		setup: () => ({ args }),
		template: '<Badge v-bind="args">{{ args.default }}</Badge>',
	}),
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NeutralBadge: Story = {
	play: async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText('Pro')).toBeVisible();
	},
};

export const AccentBadge: Story = { args: { variant: 'accent' } };
