import {
  DeviceRequestResponse,
  DeviceStateItem,
  LightDevice,
  ShutterDeviceModel,
} from '../../models/somfy-device.model';

const deviceStateMapping = (
  device: DeviceRequestResponse
): ShutterDeviceModel | LightDevice => {
  const { states } = device;
  if (states && states.length === 0) {
    return { ...device, states: {} };
  }
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
};

export { deviceStateMapping };

