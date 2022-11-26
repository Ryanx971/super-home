// import axios from 'axios';
import axios from 'axios';
import * as mapping from '../utils/mappings/govee.mapping';
import { getDevicesList, getDeviceState } from './govee.service';
import devicesListResponse from '../resources/test/govee/govee-devices-list-response';
import {
  deviceStateResponse,
  deviceStateMapped,
} from '../resources/test/govee/govee-device-state-data';

jest.mock('axios');

describe.only('Govee service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getDevicesList', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: devicesListResponse,
    });
    const result = await getDevicesList();
    expect(result).toEqual(devicesListResponse.data);
  });

  test('getDeviceState', async () => {
    const deviceMappingSpy = jest.spyOn(mapping, 'deviceStateMapping');

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: deviceStateResponse,
    });
    const result = await getDeviceState('device', 'model');
    expect(result).toEqual(deviceStateMapped);
    expect(deviceMappingSpy).toHaveBeenCalled();
  });
});

export {};

