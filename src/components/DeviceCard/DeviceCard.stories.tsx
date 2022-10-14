import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DeviceCard from './DeviceCard';
import { GOVEE } from '../../config/configuration';

export default {
  title: 'Device Card',
  component: DeviceCard,
} as ComponentMeta<typeof DeviceCard>;

const Template: ComponentStory<typeof DeviceCard> = (args) => (
  <div style={{ width: 350 }}>
    <DeviceCard {...args} />
  </div>
);

// Default
export const Default = Template.bind({});
Default.args = {
  device: {
    device: 'mac-adress',
    model: 'H6159',
    deviceName: 'Device',
    controllable: true,
    retrievable: true,
    supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
    properties: {
      colorTem: {
        range: {
          min: 2000,
          max: 9000,
        },
      },
    },
  },
};
Default.parameters = {
  mockData: [
    {
      url: `${GOVEE.baseUrl}/devices/state?device=${Default.args.device?.device}&model=${Default.args.device?.model}`,
      method: 'GET',
      status: 200,
      response: {
        data: {
          device: 'mac-adress',
          model: 'H6159',
          properties: [
            {
              online: true,
            },
            {
              powerState: 'on',
            },
            {
              brightness: 85,
            },
            {
              colorTemInKelvin: 9000,
            },
            {
              colorTem: 9000,
            },
          ],
        },
      },
    },
    {
      url: `${GOVEE.baseUrl}/devices/control`,
      method: 'PUT',
      status: 200,
      response: {
        data: {
          device: 'mac-adress',
          model: 'H6159',
          deviceName: 'Device',
          controllable: true,
          retrievable: true,
          supportCmds: ['turn', 'brightness', 'color', 'colorTem'],
          properties: {
            colorTem: {
              range: {
                min: 2000,
                max: 9000,
              },
            },
          },
        },
      },
    },
  ],
};

