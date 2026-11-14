import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, within } from 'storybook/test';
import Button from './button.vue';

const meta = {
	title: 'Common/Button',
	component: Button,
	args: { default: 'Button' },
	render: args => ({
		components: { Button },
		setup: () => ({ args }),
		template: '<Button v-bind="args">{{ args.default }}</Button>',
	}),
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
	play: async ({ canvasElement }) => {
		const button = within(canvasElement).getByRole('button', { name: 'Button' });
		await userEvent.click(button);
		await expect(button).toBeEnabled();
	},
};

export const LinkButton: Story = {
	args: { href: 'https://somehow.digital' },
	play: async ({ canvasElement }) => {
		await expect(within(canvasElement).getByRole('link', { name: 'Button' })).toHaveAttribute('href', 'https://somehow.digital');
	},
};
