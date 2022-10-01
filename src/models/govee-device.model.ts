// Device
export interface IDevicesResponse {
  code: number;
  message: string;
  data: {
    devices: [IDevice];
  };
}

export interface IDevice {
  model: string;
  device: string;
  deviceName: string;
  properties: IDeviceProperties;
  state?: {
    online: boolean;
    powerState: string;
    brightness: number;
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

// State
export interface IDeviceStateResponse {
  code: number;
  message: string;
  data: {
    model: string;
    device: string;
    properties: any;
  };
}

export enum EDeviceStateProperties {
  ONLINE = 'online',
  POWERSTATE = 'powerState',
  BRIGHTNESS = 'brightness',
  COLORTEM = 'colorTem',
}

