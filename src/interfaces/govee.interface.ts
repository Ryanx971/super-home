// Get Devices
export interface DevicesRequestResponse {
  devices: Device[];
}

export interface Device {
  model: string;
  device: string;
  deviceName: string;
  properties: DeviceProperties;
  controllable: boolean;
  retrievable: boolean;
  supportCmds: string[];
}

interface DeviceProperties {
  colorTem: {
    range: {
      max: number;
      min: number;
    };
  };
}

export interface DeviceState {
  model: string;
  device: string;
  properties: {
    online: boolean;
    powerState: string;
    brightness: number | number[];
    color: {
      b: number;
      g: number;
      r: number;
    };
  };
}

// Get state
export interface DeviceStateRequestResponse {
  model: string;
  device: string;
  properties: any[];
}

export enum DeviceStateProperties {
  ONLINE = 'online',
  POWERSTATE = 'powerState',
  BRIGHTNESS = 'brightness',
  COLORTEM = 'colorTem',
}

// Send device control
export interface DeviceControlPayload {
  device: string;
  model: string;
  cmd: {
    name: string;
    value: string | number | number[] | boolean | Color;
  };
}

interface Color {
  r: number;
  g: number;
  b: number;
}

