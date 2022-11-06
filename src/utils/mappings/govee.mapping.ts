import { DeviceStateRequestResponse } from '../../models/govee-device.model';

const deviceStateMapping = (deviceState: DeviceStateRequestResponse) => {
  const { properties } = deviceState;
  return {
    ...deviceState,
    properties: {
      online: properties[0].online === true,
      powerState: properties[1].powerState,
      brightness: properties[2].brightness,
      color: properties[3]?.color,
    },
  };
};

export { deviceStateMapping };

