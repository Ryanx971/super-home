import { AxiosRequestConfig } from 'axios';
import axios from './axios.service';
import { GOVEE } from '../config/configuration';

const defaultConfig: AxiosRequestConfig<any> = {
  headers: {
    [GOVEE.ApiKeyName]: GOVEE.ApiKeyValue,
  },
};

/**
 * Get Govee devices list
 *
 * @returns Promise<AxiosResponse<any, any>>
 */
const getDevicesList = async () => {
  return axios
    .get(`${GOVEE.baseUrl}/devices`, defaultConfig)
    .then(({ data }) => data);
};

/**
 * Get Govee device state
 *
 * @returns Promise<AxiosResponse<any, any>>
 */
const getDeviceState = async (device: string, model: string) => {
  const config = {
    ...defaultConfig,
    params: {
      device,
      model,
    },
  };
  return axios
    .get(`${GOVEE.baseUrl}/devices/state`, config)
    .then(({ data }) => data);
};

const deviceControl = (data: any) => {
  return axios
    .put(`${GOVEE.baseUrl}/devices/control`, data, defaultConfig)
    .then(({ data }) => data);
};

export { getDevicesList, getDeviceState, deviceControl };

