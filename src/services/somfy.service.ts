import axios from 'axios';
import { SOMFY } from '../config/configuration';
import { GetSomfyDeviceResponse } from '../interfaces/rest/response.interface';
import { DeviceControlPayload } from '../interfaces/somfy/device-control.interface';
import { Device, DeviceType } from '../interfaces/somfy/device.interface';
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
      const devices: GetSomfyDeviceResponse[] = data;
      return devices
        .filter(({ controllableName }) => {
          // Filter by only managed devices
          return MANAGED_DEVICES.includes(controllableName);
        })
        .map((device: GetSomfyDeviceResponse) => {
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

