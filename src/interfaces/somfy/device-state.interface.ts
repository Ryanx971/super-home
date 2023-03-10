import { Device } from './device.interface';

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

export interface DeviceLightState {
  // ? why
  isOn: boolean;
}

