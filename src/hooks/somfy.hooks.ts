import { useQuery } from '@tanstack/react-query';
import { getDevicesList } from '../services/somfy.service';
import { CONSTANTS } from '../config/configuration';

const useDevicesList = () => {
  return useQuery(['somfy-devices-list'], () => getDevicesList(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

export { useDevicesList };
