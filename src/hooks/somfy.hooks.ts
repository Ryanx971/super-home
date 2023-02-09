import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDevices, getDevice, sendCommand } from '../services/somfy.service';
import { CONSTANTS } from '../config/configuration';
import { Device, DeviceControlPayload } from '../interfaces/somfy.interface';
import { AxiosError } from 'axios';

const useDevices = () => {
  return useQuery<Device[], Error>(['somfy-devices'], () => getDevices(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDevice = (deviceURL: string) => {
  const queryClient = useQueryClient();
  return useQuery<Device, Error>(
    ['somfy-device', deviceURL],
    () => getDevice(deviceURL),
    {
      staleTime: CONSTANTS.DEFAULT_STALETIME,
      // Disable this query from automatically running
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (device: Device) => {
        queryClient.setQueryData(
          ['somfy-devices'],
          (currentDevices: Device[] | undefined) => {
            if (currentDevices) {
              const index: number = currentDevices.findIndex(
                (deviceItem: Device) =>
                  deviceItem.deviceURL === device.deviceURL
              );
              if (index !== -1) {
                currentDevices[index] = device;
              }
            }
            return currentDevices;
          }
        );
      },
    }
  );
};

const useSendCommand = () => {
  return useMutation<ResponseType, AxiosError, DeviceControlPayload>((data) => {
    return sendCommand(data);
  });
};

export { useDevices, useDevice, useSendCommand };

