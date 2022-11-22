import { useMutation, useQuery } from '@tanstack/react-query';
import { getDevicesList, sendDeviceCommand } from '../services/somfy.service';
import { CONSTANTS } from '../config/configuration';

const useDevicesList = () => {
  return useQuery(['somfy-devices-list'], () => getDevicesList(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDeviceCommand = () => {
  return useMutation((data) => {
    return sendDeviceCommand(data);
  });
};

export { useDevicesList, useDeviceCommand };

