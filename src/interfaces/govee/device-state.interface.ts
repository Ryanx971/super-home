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

export enum DeviceStateProperties {
  ONLINE = 'online',
  POWERSTATE = 'powerState',
  BRIGHTNESS = 'brightness',
  COLORTEM = 'colorTem',
}
