import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ToggleSwitch from './ToggleSwitch';

export default {
  title: 'Toggle Switch',
  component: ToggleSwitch,
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = (args) => (
  <ToggleSwitch {...args} />
);

export const Default = Template.bind({});

Default.args = {
  id: 'toggle-switch',
  checked: true,
  small: false,
  disabled: false,
};

