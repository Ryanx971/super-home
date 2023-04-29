import type { Meta, StoryObj } from '@storybook/react';
import { devices } from '../../test/resources/govee/devices';
import { QueryClientDecorator } from '../../../.storybook/decorators/query-provider.decorator';

import GoveeLightDevice from './GoveeLightDevice';

const meta: Meta<typeof GoveeLightDevice> = {
  title: 'Govee/GoveeLightDevice',
  component: GoveeLightDevice,
  decorators: [QueryClientDecorator],
  argTypes: {
    //   message: {
    //     type: { name: 'string', required: true },
    //     description: 'The message to display',
    //   },
    device: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof GoveeLightDevice>;

export const GoveeLightDeviceComponent: Story = {
  name: 'Component',
  args: {
    device: devices[0],
  },
};

