import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Click me',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Click me',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Click me',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Click me',
    variant: 'link',
  },
};

export const Icon: Story = {
  args: {
    children: '>',
    variant: 'outline',
    size: 'icon',
  },
};
