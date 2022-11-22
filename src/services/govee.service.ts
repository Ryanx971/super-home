import { AxiosRequestConfig } from 'axios';
import { GOVEE } from '../config/configuration';
import { deviceStateMapping } from '../utils/mappings/govee.mapping';
import axios from './axios.service';

const DEFAULT_HEADERS = {
  [GOVEE.ApiKeyName]: GOVEE.ApiKeyValue,
};

const getDevicesList = async () => {
  return axios
    .get(`${GOVEE.baseUrl}/devices`, { headers: DEFAULT_HEADERS })
    .then(({ data: response }) => response.data);
};

const getDeviceState = async (device: string, model: string) => {
  const config: AxiosRequestConfig<any> | undefined = {
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

const sendDeviceControl = async (data: any) => {
  return axios
    .put(`${GOVEE.baseUrl}/devices/control`, data, { headers: DEFAULT_HEADERS })
    .then(({ data: response }) => response.data);
};

export { getDevicesList, getDeviceState, sendDeviceControl };

