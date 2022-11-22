import { SOMFY } from '../config/configuration';
import { devicesStateMapping } from '../utils/mappings/somfy.mapping';
import axios from './axios.service';

const DEFAULT_HEADERS = {
  Authorization: `Bearer ${SOMFY.api.token}`,
};

const getDevicesList = async () => {
  return axios
    .get(`${SOMFY.api.baseUrl}/setup/devices`, { headers: DEFAULT_HEADERS })
    .then(({ data }) => devicesStateMapping(data));
};

const sendDeviceCommand = async (data: any) => {
  return axios
    .post(`${SOMFY.api.baseUrl}/exec/apply`, data, {
      // TODO: Handle when send command issue resolve https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode/issues/35
      headers: DEFAULT_HEADERS,
      // headers: {
      //   ...DEFAULT_HEADERS,
      // },
    })
    .then(({ data: response }) => response);
};

export { getDevicesList, sendDeviceCommand };

