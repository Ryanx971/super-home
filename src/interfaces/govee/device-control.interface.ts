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
