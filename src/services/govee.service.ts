import { deviceStateMapping } from '../utils/mappings/govee.mapping';
import { GOVEE } from '../config/configuration';
import axios from './axios.service';

axios.defaults.baseURL = GOVEE.baseUrl;
axios.defaults.headers.common[GOVEE.ApiKeyName] = GOVEE.ApiKeyValue;

const getDevicesList = async () => {
  return axios.get('/devices').then(({ data: response }) => response.data);
};

const getDeviceState = async (device: string, model: string) => {
  const config = {
    params: {
      device,
      model,
    },
  };
  return axios
    .get('/devices/state', config)
    .then(({ data: response }) => deviceStateMapping(response.data));
};

const sendDeviceControl = async (data: any) => {
  return axios
    .put('/devices/control', data)
    .then(({ data: response }) => response.data);
};

export { getDevicesList, getDeviceState, sendDeviceControl };

