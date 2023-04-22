import {
  HeatingInterfaceDevice,
  HeatingSensorDevice,
} from '../../../interfaces/somfy/device-state.interface';

export const interfaceData: HeatingInterfaceDevice = {
  deviceURL: 'ovp://2006-4441-1365/14036424#1',
  available: true,
  type: 1,
  states: {
    activeMode: 'manu',
    currentMode: 'eco',
    power: 'on',
    battery: 'normal',
    temperatureByMode: {
      comfort: 21,
      eco: 17,
      secured: 5,
    },
  },
  label: 'Chauffage',
  enabled: true,
  controllableName: 'ovp:SomfyHeatingTemperatureInterfaceOVPComponent',
};

export const sensorData: HeatingSensorDevice = {
  deviceURL: 'ovp://2006-4441-1365/14036424#2',
  available: true,
  type: 2,
  states: {
    temperature: 20.6,
  },
  label: 'Chauffage',
  enabled: true,
  controllableName: 'ovp:HeatingTemperatureInterfaceTemperatureSensor',
};

