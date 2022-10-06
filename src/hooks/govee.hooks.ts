import { useMutation, useQuery } from '@tanstack/react-query';
import { IDevice, IDeviceStateResponse } from '../models';
import {
  getDevicesList,
  getDeviceState,
  sendDeviceControl,
} from '../services/govee.service';
import { CONSTANTS } from '../config/configuration';

const useDevicesList = () => {
  return useQuery(['govee-devices-list'], () => getDevicesList(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
    refetchInterval: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDeviceState = (data: IDevice) => {
  return useQuery(
    ['govee-device-state', data.device],
    () => getDeviceState(data.device, data.model),
    {
      staleTime: CONSTANTS.DEFAULT_STALETIME,
      onSuccess: ({ properties }: IDeviceStateResponse) => {
        // update data found
        data.state = {
          online: properties[0].online === true,
          powerState: properties[1].powerState,
          brightness: properties[2].brightness,
          color: properties[3].colorTem,
        };
      },
    }
  );
};

const useDeviceControlUpdate = () => {
  return useMutation((data) => {
    return sendDeviceControl(data);
  });
};

export { useDevicesList, useDeviceState, useDeviceControlUpdate };

