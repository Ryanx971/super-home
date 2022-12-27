import axios from 'axios';
import { SOMFY } from '../config/configuration';
import { devicesStateMapping } from '../utils/mappings/somfy.mapping';

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
      headers: DEFAULT_HEADERS,
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

export { getDevicesList, sendDeviceCommand, eventsRegister };

