import { useMutation, useQuery } from '@tanstack/react-query';
import { Device, DeviceControlPayload } from '../models/govee-device.model';
import {
  getDevices,
  getDeviceState,
  sendDeviceControl,
} from '../services/govee.service';
import { CONSTANTS } from '../config/configuration';

const useDevices = () => {
  return useQuery(['govee-devices'], () => getDevices(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDeviceState = (data: Device) => {
  return useQuery(
    ['govee-device-state', data.device],
    () => getDeviceState(data.device, data.model),
    {
      staleTime: CONSTANTS.DEFAULT_STALETIME,
    }
  );
};

const useDeviceControlUpdate = () => {
  return useMutation<any, any, DeviceControlPayload>((data) => {
    return sendDeviceControl(data);
  });
};

export { useDevices, useDeviceState, useDeviceControlUpdate };

