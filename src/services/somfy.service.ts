import axios from 'axios';
import { SOMFY } from '../config/configuration';
import { heatingSettingsForm } from '../interfaces/form';
import {
  DevicesList,
  GetSomfyDeviceResponse,
} from '../interfaces/rest/response.interface';
import { DeviceControlPayload } from '../interfaces/somfy/device-control.interface';
import {
  HeatingInterfaceDevice,
  HeatingSensorDevice,
  LightDevice,
  ShutterDeviceModel,
} from '../interfaces/somfy/device-state.interface';
import { Device, DeviceType } from '../interfaces/somfy/device.interface';
import { deviceStateMapping } from '../utils/mappings/somfy.mapping';

const DEFAULT_HEADERS = {
  Authorization: `Bearer ${SOMFY.api.token}`,
};

const MANAGED_DEVICES: string[] = [
  DeviceType.SHUTTER,
  DeviceType.LIGHT,
  DeviceType.HEATING_INTERFACE,
  DeviceType.HEATING_SENSOR,
];

// Request
const getDevices = async (): Promise<DevicesList> => {
  const devices = await axios
    .get(`${SOMFY.api.baseUrl}/setup/devices`, { headers: DEFAULT_HEADERS })
    .then(({ data }) => {
      const devicesResponse: GetSomfyDeviceResponse[] = data;
      return devicesResponse
        .filter(({ controllableName }) => {
          return MANAGED_DEVICES.includes(controllableName);
        })
        .map((device: GetSomfyDeviceResponse) => {
          return deviceStateMapping(device);
        });
    });
  return {
    shutters: devices.filter(
      (device: Device) => device.controllableName === DeviceType.SHUTTER
    ) as ShutterDeviceModel[],
    lights: devices.filter(
      (device: Device) => device.controllableName === DeviceType.LIGHT
    ) as LightDevice[],
    heating: {
      interface:
        (devices.filter(
          (device: Device) =>
            device.controllableName === DeviceType.HEATING_INTERFACE
        )[0] as HeatingInterfaceDevice) || undefined,
      sensor:
        (devices.filter(
          (device: Device) =>
            device.controllableName === DeviceType.HEATING_SENSOR
        )[0] as HeatingSensorDevice) || undefined,
    },
  };
};

const getDevice = async (deviceURL: string): Promise<Device> => {
  return axios
    .get(
      `${SOMFY.api.baseUrl}/setup/devices/${encodeURIComponent(deviceURL)}`,
      {
        headers: DEFAULT_HEADERS,
      }
    )
    .then(({ data }) => deviceStateMapping(data));
};

const sendCommand = async (data: DeviceControlPayload) => {
  return axios
    .post(`${SOMFY.api.baseUrl}/exec/apply`, data, {
      headers: DEFAULT_HEADERS,
    })
    .then(({ data: response }) => response);
};

// Utils
const generateTargetTemperatureModePayload = (
  interfaceData: HeatingInterfaceDevice,
  form: heatingSettingsForm
): DeviceControlPayload => {
  const payload: DeviceControlPayload = {
    label: 'Update target temperature for modes',
    actions: [],
  };

  if (interfaceData.states.temperatureByMode.comfort !== form.comfort) {
    payload.actions.push({
      commands: [
        {
          name: 'setComfortTemperature',
          parameters: [form.comfort],
        },
      ],
      deviceURL: interfaceData.deviceURL,
    });
  }

  if (interfaceData.states.temperatureByMode.eco !== form.economy) {
    payload.actions.push({
      commands: [
        {
          name: 'setEcoTemperature',
          parameters: [form.economy],
        },
      ],
      deviceURL: interfaceData.deviceURL,
    });
  }

  if (interfaceData.states.temperatureByMode.secured !== form.secured) {
    payload.actions.push({
      commands: [
        {
          name: 'setSecuredPositionTemperature',
          parameters: [form.secured],
        },
      ],
      deviceURL: interfaceData.deviceURL,
    });
  }

  return payload;
};

export {
  getDevices,
  getDevice,
  sendCommand,
  generateTargetTemperatureModePayload,
};

