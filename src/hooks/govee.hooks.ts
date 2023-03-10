import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getDevices,
  getDeviceState,
  sendDeviceControl,
} from '../services/govee.service';
import { CONSTANTS } from '../config/configuration';
import { AxiosError, ResponseType } from 'axios';
import { Device } from '../interfaces/govee/device.interface';
import { DeviceState } from '../interfaces/govee/device-state.interface';
import { DeviceControlPayload } from '../interfaces/govee/device-control.interface';

const useDevices = () => {
  return useQuery<Device[], AxiosError>(['govee-devices'], () => getDevices(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDeviceState = (data: Device) => {
  return useQuery<DeviceState, AxiosError>(
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

