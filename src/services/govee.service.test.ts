import axios from 'axios';
import * as mapping from '../utils/mappings/govee.mapping';
import { getDeviceState } from './govee.service';
import {
  deviceStateResponse,
  deviceStateMapped,
} from '../resources/test/govee/device-state';
import { describe, expect, test, afterEach, vi } from 'vitest';

vi.mock('axios');

const mAxiosGet = vi.mocked(axios.get);

describe('Govee service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('getDeviceState - should apply mapping', async () => {
    const deviceMappingSpy = vi.spyOn(mapping, 'deviceStateMapping');

    mAxiosGet.mockResolvedValue({
      data: deviceStateResponse,
    });
    const result = await getDeviceState('device', 'model');
    expect(result).toEqual(deviceStateMapped);
    expect(deviceMappingSpy).toHaveBeenCalled();
  });
});

