import axios from 'axios';
import * as mapping from '../utils/mappings/somfy.mapping';
import { getDevices } from './somfy.service';
import { devices } from '../test/resources/somfy/devices';
import { describe, expect, it, afterEach, vi } from 'vitest';

vi.mock('axios');

const mAxiosGet = vi.mocked(axios.get);

describe('Somfy service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getDevices - should apply mapping', async () => {
    const devicesMappingSpy = vi.spyOn(mapping, 'deviceStateMapping');

    mAxiosGet.mockResolvedValue({
      data: devices,
    });
    await getDevices();
    expect(devicesMappingSpy).toHaveBeenCalledTimes(7);
  });
});

