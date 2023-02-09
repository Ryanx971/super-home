import axios from 'axios';
import * as mapping from '../utils/mappings/somfy.mapping';
import { getDevices } from './somfy.service';
import {
  devicesListResponse,
  devicesListMapped,
} from '../resources/test/somfy/devices-list';
import { describe, expect, test, afterEach, vi } from 'vitest';

vi.mock('axios');

const mAxiosGet = vi.mocked(axios.get);

describe('Somfy service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('getDevices - should apply mapping', async () => {
    const devicesMappingSpy = vi.spyOn(mapping, 'deviceStateMapping');

    mAxiosGet.mockResolvedValue({
      data: devicesListResponse,
    });
    const result = await getDevices();
    expect(result).toEqual(devicesListMapped);
    expect(devicesMappingSpy).toHaveBeenCalledTimes(6);
  });
});

