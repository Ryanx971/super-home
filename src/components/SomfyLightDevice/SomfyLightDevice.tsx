import {
  RefreshOutlined,
  ReportProblem,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useDeviceCommand } from '../../hooks/somfy.hooks';
import { Device } from '../../models/somfy-device.model';
import ToggleSwitch from '../ToggleSwitch';

import './SomfyLightDevice.scss';

interface Props {
  device: Device;
}

const SomfyLightDevice = ({ device }: Props) => {
  const queryClient = useQueryClient();
  // TODO: Handle when send command issue resolve https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode/issues/35
  const { isLoading, mutate: sendDeviceCommand } = useDeviceCommand();

  const handlePowerStateChange = (checked: boolean): void => {
    const newValue = checked ? 'on' : 'off';
    const payload: any = {
      label: `Set Power State ${newValue}`,
      actions: [
        {
          commands: [
            {
              name: newValue,
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };
    sendDeviceCommand(payload, {
      onSuccess: () => {
        queryClient.setQueryData(
          ['somfy-devices-list'],
          (currentDevices: any) => {
            // TODO: Handle when send command issue resolve https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode/issues/35
            // const currentDevice: Device = currentDevices.find(
            //   (deviceItem: Device) => deviceItem.deviceURL === device.deviceURL
            // );
            // if(currentDevice) {
            //   currentDevice.states.
            // }
            return currentDevices;
          }
        );
      },
    });
  };

  // TODO: Handle when send command issue resolve https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode/issues/35
  return (
    <Box
      className={
        'device-card '
        // (isDeviceFetching || isDeviceControlUpdateLoading ? 'bg-disabled ' : '')
        // (isDeviceFetching ? 'bg-disabled ' : '')
      }
    >
      {/* {(isDeviceRefetching || isDeviceControlUpdateLoading) && <Spinner />} */}
      {/* {isDeviceRefetching && <Spinner />} */}

      <Grid container className="header">
        <Grid item xs={3} className="left-content">
          <WbIncandescentOutlined className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={7} className="right-content">
          <Box className="icons-list">
            {/* Error */}
            {/* {isDeviceError && (
              <ReportProblem fontSize="small" className="color-error mr-05" />
            )} */}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              component="button"
              className="refresh-button mr-05"
              size="small"
              // onClick={() => refreshDevice({ throwOnError: true })}
            >
              <input hidden accept="image/*" type="file" />
              <RefreshOutlined fontSize="small" className="color-primary" />
            </IconButton>

            {/* Online button  */}
            {device.available && device.enabled ? (
              <WifiOutlined fontSize="small" className="color-primary mr-05" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray mr-05" />
            )}

            <ToggleSwitch
              id={device.label}
              // checked={deviceState?.properties?.powerState === 'on'}
              checked={false}
              disabled={!device.available || !device.enabled}
              onChange={handlePowerStateChange}
              small={true}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Description */}
      <Box className="content">
        <Typography variant="h6">{device.label}</Typography>
        <Typography variant="caption">{device.deviceURL}</Typography>
      </Box>
    </Box>
  );
};

export default SomfyLightDevice;

