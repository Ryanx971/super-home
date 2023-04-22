import axios from 'axios';
import * as mapping from '../utils/mappings/govee.mapping';
import { getDeviceState } from './govee.service';
import {
  deviceState,
  deviceStateMapped,
} from '../test/resources/govee/device-state';
import { describe, expect, it, afterEach, vi } from 'vitest';

vi.mock('axios');

const mAxiosGet = vi.mocked(axios.get);

describe('Govee service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getDeviceState - should apply mapping', async () => {
    const deviceMappingSpy = vi.spyOn(mapping, 'deviceStateMapping');

    mAxiosGet.mockResolvedValue({
      data: deviceState,
    });
    const result = await getDeviceState('device', 'model');
    expect(result).toEqual(deviceStateMapped);
    expect(deviceMappingSpy).toHaveBeenCalled();
  });
});

