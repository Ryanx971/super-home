import { ComponentStory, ComponentMeta } from '@storybook/react';
import GoveeLightDevice from './GoveeLightDevice';
import { GOVEE } from '../../config/configuration';

export default {
  title: 'Govee Light Device',
  component: GoveeLightDevice,
} as ComponentMeta<typeof GoveeLightDevice>;

const Template: ComponentStory<typeof GoveeLightDevice> = (args) => (
  <div style={{ width: 350 }}>
    <GoveeLightDevice {...args} />
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

