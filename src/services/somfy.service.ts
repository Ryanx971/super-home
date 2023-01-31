import axios from 'axios';
import { SOMFY } from '../config/configuration';
import {
  Device,
  DeviceControlPayload,
  DeviceRequestResponse,
  DeviceType,
} from '../models/somfy-device.model';
import { deviceStateMapping } from '../utils/mappings/somfy.mapping';

const DEFAULT_HEADERS = {
  Authorization: `Bearer ${SOMFY.api.token}`,
};

const MANAGED_DEVICES: string[] = [
  DeviceType.SHUTTER,
  DeviceType.LIGHT,
  DeviceType.HEATING,
];

const getDevices = async (): Promise<Device[]> => {
  return axios
    .get(`${SOMFY.api.baseUrl}/setup/devices`, { headers: DEFAULT_HEADERS })
    .then(({ data }) => {
      const devices: [DeviceRequestResponse] = data;
      return devices
        .filter(({ controllableName }) => {
          // Filter by only managed devices
          return MANAGED_DEVICES.includes(controllableName);
        })
        .map((device: DeviceRequestResponse) => {
          return deviceStateMapping(device);
        })
        .sort((a, b) => {
          // Sort by controllable type
          if (
            a.controllableName.toLocaleLowerCase() <
            b.controllableName.toLocaleLowerCase()
          ) {
            return 1;
          }
          return -1;
        });
    });
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

export { getDevices, getDevice, sendCommand };

