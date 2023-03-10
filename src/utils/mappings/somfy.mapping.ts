import {
  GetSomfyDeviceResponse,
  GetSomfyDeviceState,
} from '../../interfaces/rest/response.interface';
import {
  LightDevice,
  ShutterDeviceModel,
} from '../../interfaces/somfy/device-state.interface';
import { Device } from '../../interfaces/somfy/device.interface';

const deviceStateMapping = (
  device: GetSomfyDeviceResponse
): Device | ShutterDeviceModel | LightDevice => {
  const { states } = device;
  if (states && states.length === 0) {
    return { ...device, states: {} };
  }
  return {
    ...device,
    states: {
      status: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:StatusState'
      )?.value,
      isMoving: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:MovingState'
      )?.value,
      closeTarget: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:TargetClosureState'
      )?.value,
      memorized1Position: states.find(
        (state: GetSomfyDeviceState) =>
          state.name === 'core:Memorized1PositionState'
      )?.value,
      closeLevel: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:ClosureState'
      )?.value,
      isOpen:
        states.find(
          (state: GetSomfyDeviceState) => state.name === 'core:OpenClosedState'
        )?.value === 'open' || false,
    },
  };
};

export { deviceStateMapping };

