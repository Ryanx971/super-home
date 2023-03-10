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

