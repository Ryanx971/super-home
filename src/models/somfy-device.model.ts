export interface Device {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  states: any;
  enabled: boolean;
  controllableName: string;
}

export enum DeviceType {
  SHUTTER = 'io:RollerShutterGenericIOComponent',
  LIGHT = 'rts:LightRTSComponent',
  HEATING = 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
}

