import axios from 'axios';
import { GOVEE } from '../config/configuration';
import {
  Device,
  DeviceControlPayload,
  DeviceState,
} from '../interfaces/govee.interface';
import { deviceStateMapping } from '../utils/mappings/govee.mapping';

const DEFAULT_HEADERS = {
  [GOVEE.ApiKeyName]: GOVEE.ApiKeyValue,
};

const getDevices = async (): Promise<Device[]> => {
  return axios
    .get(`${GOVEE.baseUrl}/devices`, { headers: DEFAULT_HEADERS })
    .then(({ data: response }) => response.data.devices);
};

const getDeviceState = async (
  device: string,
  model: string
): Promise<DeviceState> => {
  const config = {
    params: {
      device,
      model,
    },
    headers: DEFAULT_HEADERS,
  };
  return axios
    .get(`${GOVEE.baseUrl}/devices/state`, config)
    .then(({ data: response }) => deviceStateMapping(response.data));
};

const sendDeviceControl = async (data: DeviceControlPayload) => {
  return axios
    .put(`${GOVEE.baseUrl}/devices/control`, data, { headers: DEFAULT_HEADERS })
    .then(({ data: response }) => response.data);
};

export { getDevices, getDeviceState, sendDeviceControl };

