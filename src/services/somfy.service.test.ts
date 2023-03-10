import axios from 'axios';
import * as mapping from '../utils/mappings/somfy.mapping';
import { getDevices } from './somfy.service';
import { devices, mappedDevices } from '../test/resources/somfy/devices';
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
      data: devices,
    });
    const result = await getDevices();
    expect(result).toEqual(mappedDevices);
    expect(devicesMappingSpy).toHaveBeenCalledTimes(6);
  });
});

