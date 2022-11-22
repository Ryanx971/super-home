export interface DeviceRequestResponse {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  states: [DeviceStateItem];
  enabled: boolean;
  controllableName: string;
}

export interface DeviceStateItem {
  type: number;
  name: string;
  value: any;
}

export interface Device {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  states: DeviceState;
  enabled: boolean;
  controllableName: string;
}

export interface DeviceState {
  status: string;
  isMoving: boolean;
  closeTarget: number;
  memorized1Position: number;
  closeLevel: number;
  isOpen: boolean;
}

export enum DeviceType {
  SHUTTER = 'io:RollerShutterGenericIOComponent',
  LIGHT = 'rts:LightRTSComponent',
  HEATING = 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
}

