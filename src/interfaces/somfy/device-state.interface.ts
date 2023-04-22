import { Device } from './device.interface';

export interface ShutterDeviceModel extends Device {
  states: ShutterDeviceState;
}

export interface LightDevice extends Device {
  states: {};
}

export interface HeatingDevice {
  interface: HeatingInterfaceDevice;
  sensor: HeatingSensorDevice;
}

export interface HeatingInterfaceDevice extends Device {
  states: HeatingInterfaceDeviceState;
}

export interface HeatingSensorDevice extends Device {
  states: HeatingSensorDeviceState;
}

export interface ShutterDeviceState {
  status: string;
  isMoving: boolean;
  closeTarget: number;
  memorized1Position: number;
  closeLevel: number;
  isOpen: boolean;
}

export interface HeatingInterfaceDeviceState {
  currentMode: string;
  activeMode: string;
  power: string;
  battery: string;
  temperatureByMode: {
    comfort: number;
    eco: number;
    secured: number;
  };
}

export interface HeatingSensorDeviceState {
  temperature: number;
}

