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
      // headers: DEFAULT_HEADERS,
      headers: {
        ...DEFAULT_HEADERS,
        // 'Access-Control-Allow-Origin': '*',

        'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
      // transformRequest: (data, headers: any) => {
      //   delete headers.common['content-Type'];
      //   delete headers.post['content-Type'];
      //   // headers['content-Type'] = 'application/json';
      //   headers.post['Content-Type'] = 'application/json';

      //   return JSON.stringify(data);
      // },
    })
    .then(({ data: response }) => response);
};

const eventsRegister = async () => {
  return axios
    .post(
      `${SOMFY.api.baseUrl}/events/register`,
      {},
      {
        headers: DEFAULT_HEADERS,
      }
    )
    .then(({ data: response }) => response);
};

const eventsFetch = async () => {
  return axios
    .post(
      `${SOMFY.api.baseUrl}/events/register`,
      {},
      {
        headers: DEFAULT_HEADERS,
      }
    )
    .then(({ data: response }) => response);
};

export { getDevicesList, sendDeviceCommand, eventsRegister };

