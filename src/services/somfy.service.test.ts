import axios from 'axios';
import * as mapping from '../utils/mappings/somfy.mapping';
import { getDevices } from './somfy.service';
import {
  devicesListResponse,
  devicesListMapped,
} from '../resources/test/somfy/somfy-devices-list-data';

jest.mock('axios');

describe('Somfy service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getDevices - should apply mapping', async () => {
    const devicesMappingSpy = jest.spyOn(mapping, 'deviceStateMapping');

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: devicesListResponse,
    });
    const result = await getDevices();
    expect(result).toEqual(devicesListMapped);
    expect(devicesMappingSpy).toHaveBeenCalledTimes(6);
  });
});

