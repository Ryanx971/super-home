// Get Devices
export interface IDevicesResponse {
  devices: [IDevice];
}

export interface IDevice {
  model: string;
  device: string;
  deviceName: string;
  properties: IDeviceProperties;
  state?: {
    online: boolean;
    powerState: string;
    brightness: number | number[];
    color: any;
  };
  controllable: boolean;
  retrievable: boolean;
  supportCmds: [ESupportCmds];
}

interface IDeviceProperties {
  colorTem: {
    range: {
      max: number;
      min: number;
    };
  };
}

enum ESupportCmds {
  TURN = 'turn',
  BRIGHTNESS = 'brightness',
  COLOR = 'color',
  COLOR_TEM = 'colorTem',
}

// Get state
export interface IDeviceStateResponse {
  model: string;
  device: string;
  properties: any;
}

export enum EDeviceStateProperties {
  ONLINE = 'online',
  POWERSTATE = 'powerState',
  BRIGHTNESS = 'brightness',
  COLORTEM = 'colorTem',
}

// Send device control
export interface IDeviceControlPayload {
  device: string;
  model: string;
  cmd: {
    name: string;
    value: any;
  };
}

