import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AlertActions from './AlertActions';
import { Button } from '@mui/material';

export default {
  title: 'Alert Actions',
  component: AlertActions,
} as ComponentMeta<typeof AlertActions>;

const Template: ComponentStory<typeof AlertActions> = (args) => (
  <AlertActions {...args} />
);

export const Default = Template.bind({});

Default.args = {
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla orci, elementum eget mauris sodales, lobortis pellentesque velit. Duis ac erat eget tortor molestie consectetur in interdum metus',
};

export const WithChildren = Template.bind({});

WithChildren.args = {
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla orci, elementum eget mauris sodales, lobortis pellentesque velit. Duis ac erat eget tortor molestie consectetur in interdum metus',
  children: (
    <div>
      <Button color="inherit" size="small">
        Button 1
      </Button>
      <Button color="inherit" size="small">
        Button 2
      </Button>
      <p>
        <strong>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla
          orci, elementum eget mauris sodales, lobortis pellentesque velit.
        </strong>
      </p>
    </div>
  ),
};

