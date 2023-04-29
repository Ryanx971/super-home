import type { Meta, StoryObj } from '@storybook/react';
import AlertActions from './AlertActions';
import { Button } from '@mui/material';

const meta: Meta<typeof AlertActions> = {
  title: 'Common/AlertActions',
  component: AlertActions,
  argTypes: {
    message: {
      type: { name: 'string', required: true },
      description: 'The message to display',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AlertActions>;

export const AlertActionsComponent: Story = {
  name: 'Component',
  args: {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut elit eget mauris rhoncus pharetra non elementum nibh. Suspendisse potenti. Duis venenatis, sapien nec faucibus venenatis, tortor urna vehicula neque, ac maximus nibh mauris at lectus.',
    children: (
      <Button color="inherit" size="small" sx={{ width: 'auto', padding: 1 }}>
        Action !
      </Button>
    ),
  },
};

