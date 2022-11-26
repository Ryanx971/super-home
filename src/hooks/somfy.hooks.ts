import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getDevicesList,
  sendDeviceCommand,
  eventsRegister,
} from '../services/somfy.service';
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

const useEventsRegister = () => {
  return useQuery(['somfy-events-register'], () => eventsRegister(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

export { useDevicesList, useDeviceCommand, useEventsRegister };

