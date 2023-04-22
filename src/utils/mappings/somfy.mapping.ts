import {
  GetSomfyDeviceResponse,
  GetSomfyDeviceState,
} from '../../interfaces/rest/response.interface';
import {
  HeatingDevice,
  HeatingInterfaceDevice,
  HeatingSensorDevice,
  LightDevice,
  ShutterDeviceModel,
} from '../../interfaces/somfy/device-state.interface';
import { Device } from '../../interfaces/somfy/device.interface';

const deviceStateMapping = (
  device: GetSomfyDeviceResponse
):
  | Device
  | ShutterDeviceModel
  | LightDevice
  | HeatingInterfaceDevice
  | HeatingSensorDevice => {
  const { states } = device;
  if (states && states.length === 0) {
    return { ...device, states: {} };
  }
  return {
    ...device,
    states: {
      // ! Common
      status: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:StatusState'
      )?.value,
      // ! Shutter
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
      isOpen: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:OpenClosedState'
      )?.value,
      // ! Heating
      activeMode: states.find(
        (state: GetSomfyDeviceState) =>
          state.name === 'ovp:HeatingTemperatureInterfaceActiveModeState'
      )?.value,
      currentMode: states.find(
        (state: GetSomfyDeviceState) =>
          state.name === 'ovp:HeatingTemperatureInterfaceSetPointModeState'
      )?.value,
      temperature: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:TemperatureState'
      )?.value,
      power: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:OnOffState'
      )?.value,
      battery: states.find(
        (state: GetSomfyDeviceState) => state.name === 'core:BatteryState'
      )?.value,
      temperatureByMode: {
        comfort: states.find(
          (state: GetSomfyDeviceState) =>
            state.name === 'core:ComfortRoomTemperatureState'
        )?.value,
        eco: states.find(
          (state: GetSomfyDeviceState) =>
            state.name === 'core:EcoRoomTemperatureState'
        )?.value,
        secured: states.find(
          (state: GetSomfyDeviceState) =>
            state.name === 'core:SecuredPositionTemperatureState'
        )?.value,
      },
    },
  };
};

export { deviceStateMapping };

