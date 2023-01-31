export interface DeviceRequestResponse {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  states: DeviceStateItem[];
  enabled: boolean;
  controllableName: string;
}

export interface DeviceStateItem {
  type: number;
  name: string;
  value: string | number | boolean;
}

export interface Device {
  deviceURL: string;
  available: boolean;
  type: number;
  label: string;
  enabled: boolean;
  controllableName: string;
}

export interface ShutterDeviceModel extends Device {
  states: DeviceShutterState;
}

export interface LightDevice extends Device {
  states: {};
}

export interface DeviceShutterState {
  status: string;
  isMoving: boolean;
  closeTarget: number;
  memorized1Position: number;
  closeLevel: number;
  isOpen: boolean;
}

export interface DeviceShutterState {
  status: string;
  isMoving: boolean;
  closeTarget: number;
  memorized1Position: number;
  closeLevel: number;
  isOpen: boolean;
}

export interface DeviceLightState {
  isOn: boolean;
}

export enum DeviceType {
  SHUTTER = 'io:RollerShutterGenericIOComponent',
  LIGHT = 'rts:LightRTSComponent',
  HEATING = 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
}

export interface DeviceControlPayload {
  label: string;
  actions: Action[];
}

interface Action {
  deviceURL: string;
  commands: Command[];
}

interface Command {
  name: string | null;
  parameters?: string[] | number[] | boolean[];
}

