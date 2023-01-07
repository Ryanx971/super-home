import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SOMFY } from '../../config/configuration';
import SomfyLightDevice from './SomfyLightDevice';

export default {
  title: 'Somfy Light Device',
  component: SomfyLightDevice,
} as ComponentMeta<typeof SomfyLightDevice>;

const Template: ComponentStory<typeof SomfyLightDevice> = (args) => (
  <div style={{ width: 350 }}>
    <SomfyLightDevice {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  device: {
    deviceURL: 'Device URL',
    available: true,
    type: 1,
    states: {},
    label: 'Device name',
    enabled: true,
    controllableName: 'rts:LightRTSComponent',
  },
};
Default.parameters = {
  mockData: [
    {
      url: `${SOMFY.api.baseUrl}/setup/devices/${encodeURIComponent(
        'Device URL'
      )}`,
      method: 'GET',
      status: 200,
      response: {
        data: {
          deviceURL: 'Device URL',
          available: true,
          type: 1,
          states: [],
          label: 'Device name',
          enabled: true,
          controllableName: 'rts:LightRTSComponent',
        },
      },
    },
  ],
};

