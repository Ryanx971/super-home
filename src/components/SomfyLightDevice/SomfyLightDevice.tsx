import {
  RefreshOutlined,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
  ReportProblem,
} from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useDevice, useSendCommand } from '../../hooks/somfy.hooks';
import { Device } from '../../models/somfy-device.model';
import Spinner from '../Spinner';

import './SomfyLightDevice.scss';

interface Props {
  device: Device;
}

const SomfyLightDevice = ({ device }: Props) => {
  const queryClient = useQueryClient();
  const {
    isLoading: isCommandLoading,
    isError: isCommandError,
    mutate: sendCommand,
  } = useSendCommand();
  const {
    isFetching: getDeviceFetching,
    isError: getDeviceIsError,
    refetch: getDeviceRefetch,
  } = useDevice(device.deviceURL);

  const handlePowerStateChange = (checked: boolean): void => {
    const newValue = checked ? 'on' : 'off';
    const payload: any = {
      label: `Set power state ${newValue} - ${device.label}`,
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
    sendCommand(payload, {
      onSuccess: () => {
        queryClient.setQueryData(['somfy-devices'], (currentDevices: any) => {
          // TODO: Handle when send command issue resolve https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode/issues/35
          // const currentDevice: Device = currentDevices.find(
          //   (deviceItem: Device) => deviceItem.deviceURL === device.deviceURL
          // );
          // if(currentDevice) {
          //   currentDevice.states.
          // }
          return currentDevices;
        });
      },
    });
  };

  return (
    <Box
      className={
        'device-card ' +
        (isCommandLoading || getDeviceFetching ? 'bg-disabled ' : '')
      }
    >
      {(isCommandLoading || getDeviceFetching) && <Spinner />}
      <Grid container className="header">
        <Grid item xs={3} className="left-content">
          <WbIncandescentOutlined className="color-primary" fontSize="large" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={7} className="right-content">
          <Box className="icons-list">
            {/* Error */}
            {(isCommandError || getDeviceIsError) && (
              <ReportProblem fontSize="small" className="color-error mr-05" />
            )}

            {/* Refresh button */}
            <IconButton
              color="primary"
              aria-label="refresh device data"
              component="button"
              className="refresh-button mr-05"
              size="small"
              onClick={() => getDeviceRefetch({ throwOnError: true })}
            >
              <RefreshOutlined fontSize="small" className="color-primary" />
            </IconButton>

            {/* Online button  */}
            {device.available && device.enabled ? (
              <WifiOutlined fontSize="small" className="color-primary mr-05" />
            ) : (
              <WifiOffOutlined fontSize="small" className="color-gray mr-05" />
            )}
          </Box>
        </Grid>
      </Grid>
      {/* Todo: A REVOIR COMPLETEMENT */}
      {device.available && device.enabled && (
        <Grid className="power-state-buttons" container>
          <Grid item xs={6} className="button-container">
            <Button
              size="medium"
              className="somfy-light-button"
              onClick={() => handlePowerStateChange(true)}
            >
              Turn ON
            </Button>
          </Grid>

          <Grid item xs={6} className="button-container">
            <Button
              size="medium"
              className="somfy-light-button"
              onClick={() => handlePowerStateChange(false)}
            >
              Turn OFF
            </Button>
          </Grid>
        </Grid>
      )}
      {/* Description */}
      <Box className="content">
        <Typography variant="h6">{device.label}</Typography>
        <Typography variant="caption">{device.deviceURL}</Typography>
      </Box>
    </Box>
  );
};

export default SomfyLightDevice;

