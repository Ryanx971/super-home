export interface Device {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  enabled: boolean;
  controllableName: string;
}

export enum DeviceType {
  SHUTTER = 'io:RollerShutterGenericIOComponent',
  LIGHT = 'rts:LightRTSComponent',
  HEATING_INTERFACE = 'ovp:SomfyHeatingTemperatureInterfaceOVPComponent',
  HEATING_SENSOR = 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
}

