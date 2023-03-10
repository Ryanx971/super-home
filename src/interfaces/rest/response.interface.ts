import { Device } from '../govee/device.interface';

// ! Govee
export interface GetGoveeDevicesResponse {
  devices: Device[];
}

export interface GetGoveeDeviceStateResponse {
  model: string;
  device: string;
  properties: any[];
}

// ! Somfy
export interface GetSomfyDeviceResponse {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  states: GetSomfyDeviceState[];
  enabled: boolean;
  controllableName: string;
}

export interface GetSomfyDeviceState {
  type: number;
  name: string;
  value: string | number | boolean;
}

