import {
  Device,
  DeviceRequestResponse,
  DeviceStateItem,
  DeviceType,
} from '../../models/somfy-device.model';

const managedDevices: string[] = [
  DeviceType.SHUTTER,
  DeviceType.LIGHT,
  DeviceType.HEATING,
];

const devicesStateMapping = (
  devices: [DeviceRequestResponse]
): Device[] | undefined => {
  return devices
    .filter(({ controllableName }) => {
      // Filter by only managed devices
      return managedDevices.includes(controllableName);
    })
    .map((device: DeviceRequestResponse) => {
      const { states } = device;
      return {
        ...device,
        states: {
          status: states.find(
            (state: DeviceStateItem) => state.name === 'core:StatusState'
          )?.value,
          isMoving: states.find(
            (state: DeviceStateItem) => state.name === 'core:MovingState'
          )?.value,
          closeTarget: states.find(
            (state: DeviceStateItem) => state.name === 'core:TargetClosureState'
          )?.value,
          memorized1Position: states.find(
            (state: DeviceStateItem) =>
              state.name === 'core:Memorized1PositionState'
          )?.value,
          closeLevel: states.find(
            (state: DeviceStateItem) => state.name === 'core:ClosureState'
          )?.value,
          isOpen:
            states.find(
              (state: DeviceStateItem) => state.name === 'core:OpenClosedState'
            )?.value === 'open' || false,
        },
      };
    })
    .sort((a, b) => {
      // sort by controllable type
      if (
        a.controllableName.toLocaleLowerCase() <
        b.controllableName.toLocaleLowerCase()
      ) {
        return 1;
      }
      return -1;
    });
};

export { devicesStateMapping };

