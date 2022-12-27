import axios from 'axios';
import * as mapping from '../utils/mappings/govee.mapping';
import { getDeviceState } from './govee.service';
import {
  deviceStateResponse,
  deviceStateMapped,
} from '../resources/test/govee/govee-device-state-data';

jest.mock('axios');

describe('Govee service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getDeviceState - should apply mapping', async () => {
    const deviceMappingSpy = jest.spyOn(mapping, 'deviceStateMapping');

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: deviceStateResponse,
    });
    const result = await getDeviceState('device', 'model');
    expect(result).toEqual(deviceStateMapped);
    expect(deviceMappingSpy).toHaveBeenCalled();
  });
});

