import { useMutation, useQuery } from '@tanstack/react-query';
import { IDevice, IDeviceStateResponse } from '../models';
import {
  getDevicesList,
  getDeviceState,
  deviceControl,
} from '../services/govee.service';
import { CONSTANTS } from '../config/configuration';

const useDevicesList = () => {
  return useQuery(['govee-devices-list'], () => getDevicesList(), {
    staleTime: CONSTANTS.DEFAULT_STALETIME,
  });
};

const useDeviceState = (data: IDevice) => {
  return useQuery(
    ['govee-device-state', data.device],
    () => getDeviceState(data.device, data.model),
    {
      staleTime: CONSTANTS.DEFAULT_STALETIME,
      onSuccess: (stateData: IDeviceStateResponse) => {
        // update data found
        data.state = {
          online: stateData.data.properties[0].online === true,
          powerState: stateData.data.properties[1].powerState,
          brightness: stateData.data.properties[2].brightness,
          color: stateData.data.properties[3].colorTem,
        };
      },
    }
  );
};

const useDeviceControl = () => {
  return useMutation((data) => {
    return deviceControl(data);
  });
};

// const useDevicesState = (devices: [IDevice]) => {
//   const onDeviceStateSucess = ({ data }: IDeviceStateResponse) => {
//     const deviceFound = devices.find(
//       (device: IDevice) => device.device === data.device
//     );
//     if (deviceFound) {
//       // update data found
//       deviceFound.state = {
//         ...data.properties,
//       };
//     }
//   };

//   return useQueries({
//     queries:
//       devices?.map((item: IDevice) => {
//         return {
//           queryKey: ['govee-devices-state', item.device],
//           queryFn: () => getDeviceState(item.device, item.model),
//           enabled: !!devices,
//           staleTime: CONSTANTS.DEFAULT_STALETIME,
//           onSuccess: onDeviceStateSucess,
//         };
//       }) ?? [],
//   });
// };

export { useDevicesList, useDeviceState, useDeviceControl };

