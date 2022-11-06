import axios from './axios.service';
import { SOMFY } from '../config/configuration';

axios.defaults.baseURL = SOMFY.api.baseUrl;
axios.defaults.headers.common = { Authorization: `Bearer ${SOMFY.api.token}` };

const getDevicesList = async () => {
  return axios
    .get('/setup/devices')
    .then(({ data: response }) => response.devices);
};

export { getDevicesList };

