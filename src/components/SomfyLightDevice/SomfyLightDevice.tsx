import {
  RefreshOutlined,
  WbIncandescentOutlined,
  WifiOffOutlined,
  WifiOutlined,
  ReportProblem,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useDevice, useSendCommand } from '../../hooks/somfy.hooks';
import {
  DeviceControlPayload,
  LightDevice,
} from '../../models/somfy-device.model';
import Spinner from '../Spinner';

import './SomfyLightDevice.scss';

interface Props {
  device: LightDevice;
}

const SomfyLightDevice = ({ device }: Props) => {
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

  const handlePowerStateChange = (
    event: React.MouseEvent<HTMLElement>,
    newPowerState: string | null
  ): void => {
    const payload: DeviceControlPayload = {
      label: `Set power state ${newPowerState} - ${device.label}`,
      actions: [
        {
          commands: [
            {
              name: newPowerState,
            },
          ],
          deviceURL: device.deviceURL,
        },
      ],
    };
    sendCommand(payload);
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
          <ToggleButtonGroup
            exclusive
            size="large"
            className="toggle-group"
            aria-label="change light power state"
            onChange={handlePowerStateChange}
          >
            <ToggleButton
              className="somfy-light-button-on"
              value="on"
              aria-label="turn on"
            >
              ON
            </ToggleButton>
            <ToggleButton
              className="somfy-light-button-off"
              value="off"
              aria-label="turn off"
            >
              OFF
            </ToggleButton>
          </ToggleButtonGroup>
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

