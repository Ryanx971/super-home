import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from '@mui/material';
import IconPopover from './IconPopover';

export default {
  title: 'Icon Popover',
  component: IconPopover,
} as ComponentMeta<typeof IconPopover>;

const Template: ComponentStory<typeof IconPopover> = (args) => (
  <IconPopover {...args} />
);

export const Default = Template.bind({});

Default.args = {
  anchorOriginVertical: 'bottom',
  anchorOriginHorizontal: 'center',
  transformOriginVertical: 'top',
  transformOriginHorizontal: 'center',
  children: <Typography>The content of the Popover.</Typography>,
};

