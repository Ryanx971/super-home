import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Device,
  DeviceControlPayload,
  DeviceState,
} from '../models/govee-device.model';
import {
  getDevices,
  getDeviceState,
  sendDeviceControl,
} from '../services/govee.service';
import { CONSTANTS } from '../config/configuration';
import { AxiosError, ResponseType } from 'axios';

const useDevices = () => {
  return useQuery<Device[], Error>(['govee-devices'], () => getDevices(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDeviceState = (data: Device) => {
  return useQuery<DeviceState, Error>(
    ['govee-device-state', data.device],
    () => getDeviceState(data.device, data.model),
    {
      staleTime: CONSTANTS.DEFAULT_STALETIME,
    }
  );
};

const useDeviceControlUpdate = () => {
  return useMutation<ResponseType, AxiosError, DeviceControlPayload>((data) => {
    return sendDeviceControl(data);
  });
};

export { useDevices, useDeviceState, useDeviceControlUpdate };

